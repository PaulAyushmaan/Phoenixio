# Standard library imports
from typing import Optional

# Third-party library imports
from mongoengine.errors import DoesNotExist

# Local application imports
from dependencies.password_utils import PasswordUtils

from dto.user_dto import UserCreate, UserUpdate

from models.user_model import User as UserModel


class UserRepository:
    """Repository for user-related database operations."""

    @staticmethod
    def get_user_by_phone_number(phone_number: str) -> Optional[UserModel]:
        """
        Get a user by phone number.

        Args:
            phone_number: The phone number to search for

        Returns:
            UserModel or None: The user if found, None otherwise
        """
        try:
            return UserModel.objects.get(phone_number=phone_number)
        except DoesNotExist:
            return None

    @staticmethod
    def get_user_by_email(email: str) -> Optional[UserModel]:
        """
        Get a user by email.

        Args:
            email: The email to search for

        Returns:
            UserModel or None: The user if found, None otherwise
        """
        try:
            return UserModel.objects.get(email=email)
        except DoesNotExist:
            return None

    @staticmethod
    def get_user_by_id(user_id: str) -> Optional[UserModel]:
        """
        Get a user by ID.

        Args:
            user_id: The user ID to search for

        Returns:
            UserModel or None: The user if found, None otherwise
        """
        try:
            return UserModel.objects.get(id=user_id)
        except DoesNotExist:
            return None

    @staticmethod
    def create_user(user_data: UserCreate) -> UserModel:
        """
        Create a new user.

        Args:
            user_data: The user data to create a new user

        Returns:
            UserModel: The newly created user
        """
        user = UserModel(
            email=user_data.email,
            phone_number=user_data.phone_number,
            hashed_password=PasswordUtils.get_password_hash(
                user_data.password),
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            role=user_data.role if hasattr(user_data, 'role') else "user",
        )
        user.save()
        return user

    @staticmethod
    def update_user(user: UserModel, user_data: UserUpdate) -> UserModel:
        """
        Update an existing user.

        Args:
            user: The user to update
            user_data: The user data to update

        Returns:
            UserModel: The updated user
        """
        if user_data.email is not None:
            user.email = user_data.email
        if user_data.phone_number is not None:
            user.phone_number = user_data.phone_number
        if user_data.first_name is not None:
            user.first_name = user_data.first_name
        if user_data.last_name is not None:
            user.last_name = user_data.last_name
        if user_data.password is not None:
            user.hashed_password = PasswordUtils.get_password_hash(
                user_data.password)
        user.save()
        return user

    @staticmethod
    def get_all_users(skip: int = 0, limit: int = 100) -> list[UserModel]:
        """
        Get all users with pagination.

        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return

        Returns:
            List[UserModel]: List of users
        """
        return UserModel.objects.skip(skip).limit(limit)

    @staticmethod
    def delete_user(user_id: str) -> bool:
        """
        Delete a user by ID.

        Args:
            user_id: The user ID to delete

        Returns:
            bool: True if deleted, False otherwise
        """
        try:
            user = UserModel.objects.get(id=user_id)
            user.delete()
            return True
        except DoesNotExist:
            return False
