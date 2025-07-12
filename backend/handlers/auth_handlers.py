# Standard library imports
from datetime import datetime, timedelta
import secrets
import base64
from typing import Any, Optional, Union, Tuple, Dict
import random

# Third-party library imports
from fastapi import Depends, HTTPException, status, security
from jose import jwt, JWTError
from mongoengine.errors import DoesNotExist

# Local application imports
from dependencies.logger import logger
from dependencies.configuration import AppConfiguration
from dependencies.password_utils import PasswordUtils
from dependencies.exceptions import (
    CredentialsException,
    UserNotFoundException,
    UserAlreadyExistsException,
    INVALID_REFRESH_TOKEN_MSG
)
from dependencies.constants import IST

from dto.user_dto import (
    TokenPayload,
    UserCreate,
    UserUpdate,
    Token,
    TokenRefresh,
    User,
    RefreshTokenRequest
)

from repositories.user_repository import UserRepository


from models.user_model import User as UserModel, RefreshToken
from services.email_service import EmailService


class AuthHandler:
    oauth2_scheme = security.OAuth2PasswordBearer(
        tokenUrl="/dashboard/api/v1/auth/login")

    @staticmethod
    def get_current_user(token: str = Depends(oauth2_scheme)) -> UserModel:
        """
        Retrieve the current authenticated user from the JWT token.

        Args:
            token: JWT token provided in the request header.

        Returns:
            UserModel: The authenticated user.

        Raises:
            CredentialsException: If the token is invalid or expired.
            UserNotFoundException: If the user does not exist.
        """
        try:
            payload = jwt.decode(token, AppConfiguration.SECRET_KEY, algorithms=[
                                 AppConfiguration.ALGORITHM])
            token_data = TokenPayload(**payload)

            if token_data.sub is None or token_data.type != "access":
                raise CredentialsException()
        except JWTError:
            logger.exception("Error decoding token")
            raise CredentialsException()

        try:
            user = UserModel.objects.get(id=token_data.sub)
        except DoesNotExist:
            logger.exception("User not found")
            raise UserNotFoundException()

        return user

    @staticmethod
    def get_current_active_user(current_user: UserModel = Depends(get_current_user)) -> UserModel:
        """
        Retrieve the current authenticated user if they are active.

        Args:
            current_user: The authenticated user.

        Returns:
            UserModel: The active authenticated user.

        Raises:
            HTTPException: If the user is inactive.
        """
        if not current_user.is_active:
            logger.exception("Inactive user")
            raise HTTPException(status_code=400, detail="Inactive user")
        return current_user

    @staticmethod
    def get_current_admin_user(current_user: UserModel = Depends(get_current_active_user)) -> UserModel:
        """
        Retrieve the current authenticated user if they are an admin.

        Args:
            current_user: The authenticated user.

        Returns:
            UserModel: The admin user.

        Raises:
            HTTPException: If the user does not have admin privileges.
        """
        if current_user.role != "admin":
            logger.exception("Not enough permissions")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions"
            )
        return current_user

    @staticmethod
    def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        """
        Create a JWT access token.

        Args:
            subject: The subject of the token (usually the user ID).
            expires_delta: Optional expiration time delta.

        Returns:
            str: The encoded JWT access token.
        """
        expire = datetime.now(
            IST) + (expires_delta or timedelta(minutes=AppConfiguration.ACCESS_TOKEN_EXPIRE_MINUTES))
        to_encode = {"exp": expire, "sub": str(subject), "type": "access"}
        encoded_jwt = jwt.encode(
            to_encode, AppConfiguration.SECRET_KEY, algorithm=AppConfiguration.ALGORITHM)
        return encoded_jwt

    @staticmethod
    def create_refresh_token(user_id: str) -> Tuple[str, datetime]:
        """
        Create a JWT refresh token and store it in the database.

        Args:
            user_id: The ID of the user for whom the refresh token is created.

        Returns:
            Tuple[str, datetime]: The encoded JWT refresh token and its expiration time.
        """
        token_value = secrets.token_hex(32)
        expires_at = datetime.now(
            IST) + timedelta(days=AppConfiguration.REFRESH_TOKEN_EXPIRE_DAYS)

        refresh_token = RefreshToken(
            user_id=user_id, token=token_value, expires_at=expires_at)
        refresh_token.save()

        to_encode = {"exp": expires_at, "sub": str(
            user_id), "jti": token_value, "type": "refresh"}
        encoded_jwt = jwt.encode(
            to_encode, AppConfiguration.REFRESH_SECRET_KEY, algorithm=AppConfiguration.ALGORITHM)

        return encoded_jwt, expires_at

    @staticmethod
    def verify_refresh_token(token: str) -> Optional[str]:
        """
        Verify the validity of a refresh token.

        Args:
            token: The refresh token to verify.

        Returns:
            Optional[str]: The user ID if the token is valid, otherwise None.
        """
        try:
            payload = jwt.decode(token, AppConfiguration.REFRESH_SECRET_KEY, algorithms=[
                                 AppConfiguration.ALGORITHM])
            if payload.get("type") != "refresh":
                return None

            user_id = payload.get("sub")
            jti = payload.get("jti")
            if not user_id or not jti:
                return None

            stored_token = RefreshToken.objects(
                token=jti,
                user_id=user_id,
                expires_at__gt=datetime.now(IST)
            ).first()

            if not stored_token:
                return None

            return user_id
        except JWTError:
            logger.exception("Error decoding refresh token")
            return None

    @staticmethod
    def delete_refresh_token(token: str) -> bool:
        """
        Delete a refresh token from the database.

        Args:
            token: The refresh token to delete.

        Returns:
            bool: True if the token was deleted, False otherwise.
        """
        try:
            payload = jwt.decode(token, AppConfiguration.REFRESH_SECRET_KEY, algorithms=[
                                 AppConfiguration.ALGORITHM])
            jti = payload.get("jti")
            user_id = payload.get("sub")
            if not jti or not user_id:
                return False

            result = RefreshToken.objects(token=jti).delete()
            return result > 0
        except JWTError:
            logger.exception("Error decoding refresh token")
            return False

    @staticmethod
    def delete_all_user_tokens(user_id: str) -> bool:
        """
        Delete all refresh tokens for a specific user.

        Args:
            user_id: The ID of the user whose tokens should be deleted.

        Returns:
            bool: True if tokens were deleted, False otherwise.
        """
        result = RefreshToken.objects(
            user_id=user_id, expires_at__gt=datetime.now(IST)).delete()
        return result > 0

    @staticmethod
    def login_user(form_data: security.OAuth2PasswordRequestForm) -> Token:
        """
        Authenticate a user and return access and refresh tokens.

        Args:
            form_data: The login form data containing username and password.

        Returns:
            Token: The access and refresh tokens.

        Raises:
            HTTPException: If the credentials are invalid.
        """
        user = UserRepository.get_user_by_email(form_data.username)
        if not user or not PasswordUtils.verify_password(form_data.password, user.hashed_password):
            logger.error("Incorrect username or password")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user.is_active = True
        user.save()
        access_token_expires = timedelta(
            minutes=AppConfiguration.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = AuthHandler.create_access_token(
            subject=str(user.id), expires_delta=access_token_expires)
        refresh_token, _ = AuthHandler.create_refresh_token(
            user_id=str(user.id))
        first_name = user.first_name if user.first_name else ""
        last_name = user.last_name if user.last_name else ""
        role = user.role if user.role else "user"
        expires_at = datetime.now(IST) + access_token_expires
        logger.info(
            f"User with {user.email} {access_token} {refresh_token}"
            f"{first_name} {last_name} {expires_at} {role} logged in successfully")
        return access_token, refresh_token, first_name, last_name, role, expires_at

    @staticmethod
    def refresh_user_token(token_data: RefreshTokenRequest) -> TokenRefresh:
        """
        Refresh a user's access token using their refresh token.

        Args:
            token_data: The refresh token request data.

        Returns:
            TokenRefresh: The new access token.

        Raises:
            HTTPException: If the refresh token is invalid.
        """
        user_id = AuthHandler.verify_refresh_token(token_data.refresh_token)
        if not user_id:
            logger.exception(INVALID_REFRESH_TOKEN_MSG)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=INVALID_REFRESH_TOKEN_MSG,
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token_expires = timedelta(
            minutes=AppConfiguration.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = AuthHandler.create_access_token(
            subject=user_id, expires_delta=access_token_expires)

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_at": datetime.now(IST) + access_token_expires
        }

    @staticmethod
    def logout_user(token_data: RefreshTokenRequest, current_user: UserModel) -> Dict[str, str]:
        """
        Logout a user by invalidating their refresh token.

        Args:
            token_data: The refresh token request data.
            current_user: The current authenticated user.

        Returns:
            Dict[str, str]: A message indicating successful logout.
        """
        if token_data.refresh_token:
            AuthHandler.delete_refresh_token(token_data.refresh_token)
            AuthHandler.delete_all_user_tokens(str(current_user.id))
            return {"message": "Successfully logged out"}
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid refresh token"
        )

    @staticmethod
    def register_new_user(user_data: UserCreate) -> User:
        """
        Register a new user.

        Args:
            user_data: The user creation request containing user details.

        Returns:
            User: Details of the newly registered user.

        Raises:
            UserAlreadyExistsException: If a user with the same email already exists.
            HTTPException: If the username is already registered, email is not verified, or phone number is already
            registered.
        """

        # Check for existing email

        if UserRepository.get_user_by_email(user_data.email):
            logger.info("User with this email already exists")
            raise UserAlreadyExistsException()

        # Check for existing phone number
        if UserRepository.get_user_by_phone_number(user_data.phone_number):
            logger.error("Phone number already registered")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already registered",
            )

        user = UserRepository.create_user(user_data)
        return User(
            _id=str(user.id),
            email=user.email,
            phone_number=user.phone_number,
            is_active=user.is_active,
            role=user.role,
            first_name=user.first_name,
            last_name=user.last_name,
            created_at=user.created_at,
            updated_at=user.updated_at
        )

    @staticmethod
    def get_current_user_details(current_user: UserModel) -> User:
        """
        Get the current user's details.

        Args:
            current_user: The current authenticated user.

        Returns:
            User: The user's details.
        """
        return User(
            _id=str(current_user.id),
            email=current_user.email,
            phone_number=current_user.phone_number,
            is_active=current_user.is_active,
            role=current_user.role,
            first_name=current_user.first_name,
            last_name=current_user.last_name,
            created_at=current_user.created_at,
            updated_at=current_user.updated_at
        )

    @staticmethod
    def update_current_user(user_data: UserUpdate, current_user: UserModel) -> User:
        """
        Update the current user's details.

        Args:
            user_data: The user update data.
            current_user: The current authenticated user.

        Returns:
            User: The updated user.
        """
        updated_user = UserRepository.update_user(current_user, user_data)

        return User(
            _id=str(updated_user.id),
            email=updated_user.email,
            phone_number=updated_user.phone_number,
            is_active=updated_user.is_active,
            role=updated_user.role,
            first_name=updated_user.first_name,
            last_name=updated_user.last_name,
            created_at=updated_user.created_at,
            updated_at=updated_user.updated_at
        )

    @staticmethod
    def get_password_reset_link(email: str) -> str:
        """
        Generate a password reset link for a user.

        Args:
            email: The email address of the user.

        Returns:
            str: The password reset link.
        """
        # Check if user exists
        user = UserRepository.get_user_by_email(email)
        if not user:
            logger.error(f"User with email {email} not found")
            raise UserNotFoundException()

        logger.info(f"Generating password reset link for user {user.username}")

        proc_key = (
            f"{random.randint(1, 99)}|"
            f"{datetime.today().day}|"
            f"{str(user.id)}|"
            f"{str(user.email)}|"
            f"{random.randint(100, 999)}"
        )
        reset_url = (
            f"{AppConfiguration.FRONTEND_BASE_URL}/"
            "#/reset-password?"
            f"proc_key={base64.b64encode(proc_key.encode('utf-8')).decode('utf-8')}"
        )
        logger.info(f"Password reset link: {reset_url}")

        EmailService.send_password_reset_email(
            user.first_name, email, reset_url)

    @staticmethod
    def reset_password(email: str, password: str) -> bool:
        """
        Reset a user's password.

        Args:
            email: The email address of the user.
            password: The new password for the user.

        Returns:
            str: The message indicating the password reset was successful.
        """
        try:
            user = UserRepository.get_user_by_email(email)
            if not user:
                logger.error(f"User with email {email} not found")
                raise UserNotFoundException()

            user.hashed_password = PasswordUtils.get_password_hash(password)
            user.save()
            return True
        except Exception as e:
            logger.exception(
                f"Error resetting password for email {email}: {str(e)}")
            return False
