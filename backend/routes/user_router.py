# Standard library imports
from typing import Any

# Third-party library imports
from fastapi import APIRouter, Depends, status, security, HTTPException

# Local application imports
from dependencies.exceptions import UserNotFoundException
from dependencies.logger import logger

from dto.user_dto import (
    Token,
    TokenRefresh,
    User,
    UserCreate,
    UserUpdate,
    RefreshTokenRequest,
    PasswordResetRequest
)
from dto.common_dto import APISuccessResponse

from handlers.auth_handlers import AuthHandler

from models.user_model import User as UserModel

# Create a single router for all routes
auth_router = APIRouter(prefix="/dashboard/api/v1")

# Auth Routes


@auth_router.post("/auth/login", response_model=Token, tags=["Auth"])
def login(form_data: security.OAuth2PasswordRequestForm = Depends()) -> Token:
    """
    Authenticate a user and return an access token and refresh token.

    Args:
        form_data: OAuth2 password request form containing username and password.

    Returns:
        Token: Access token and refresh token.
    """
    access_token, refresh_token, first_name, last_name, role, expires_at = AuthHandler.login_user(
        form_data)
    logger.info(role)
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        first_name=first_name,
        last_name=last_name,
        role=role,
        expires_at=expires_at
    )


@auth_router.post("/auth/refresh", response_model=TokenRefresh, tags=["Auth"])
def refresh_token(token_data: RefreshTokenRequest) -> TokenRefresh:
    """
    Refresh an access token using a valid refresh token.

    Args:
        token_data: Refresh token request containing the refresh token.

    Returns:
        TokenRefresh: New access token and refresh token.
    """
    return AuthHandler.refresh_user_token(token_data)


@auth_router.post("/auth/logout", tags=["Auth"])
def logout(
    token_data: RefreshTokenRequest,
    current_user: UserModel = Depends(AuthHandler.get_current_user)
):
    """
    Log out a user and invalidate all their sessions.

    Args:
        token_data: Refresh token request containing the refresh token.
        current_user: Authenticated user.

    Returns:
        JSONResponse: Success or error message.
    """
    return AuthHandler.logout_user(token_data, current_user)


@auth_router.post("/auth/register", response_model=User, status_code=status.HTTP_201_CREATED, tags=["Auth"])
def register(user_data: UserCreate) -> User:
    """
    Register a new user.

    Args:
        user_data: User creation request containing user details.

    Returns:
        User: Details of the newly registered user.
    """
    try:
        return AuthHandler.register_new_user(user_data)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.exception(f"Error registering new user: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to register new user: {str(e)}"
        )


# User Routes


@auth_router.get("/users/me", response_model=User, tags=["Fetch Users"])
def read_users_me(
    current_user: UserModel = Depends(AuthHandler.get_current_active_user)
) -> Any:
    """
    Get details of the currently authenticated user.

    Args:
        current_user: Authenticated user.

    Returns:
        User: Details of the currently authenticated user.
    """
    return AuthHandler.get_current_user_details(current_user)


@auth_router.put("/users/me", response_model=User, tags=["Fetch Users"])
def update_user_me(
    user_data: UserUpdate,
    current_user: UserModel = Depends(AuthHandler.get_current_active_user)
) -> Any:
    """
    Update details of the currently authenticated user.

    Args:
        user_data: User update request containing updated details.
        current_user: Authenticated user.

    Returns:
        User: Updated details of the currently authenticated user.
    """
    return AuthHandler.update_current_user(user_data, current_user)

# Dashboard Routes


@auth_router.get("/account/reset/link", response_model=APISuccessResponse, tags=["Auth"])
def get_password_reset(email: str) -> APISuccessResponse:
    """
    Get the password reset link for the user.

    Args:
        email: Email ID of the user.

    Returns:
        APISuccessResponse: Response containing success status and result
    """
    try:
        AuthHandler().get_password_reset_link(email)
        return APISuccessResponse(
            http_status_code=status.HTTP_200_OK,
            message="Successfully got password reset link",
            result={"message": "Password reset link sent to email"}
        )
    except UserNotFoundException:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    except Exception:
        logger.exception(
            f"Error getting password reset link for email {email}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get password reset link"
        )


@auth_router.post("/account/password/reset", response_model=APISuccessResponse, tags=["Auth"])
def reset_password(request: PasswordResetRequest) -> APISuccessResponse:
    """
    Reset the user's password.

    Args:
        request: Password reset request containing email and password

    Returns:
        APISuccessResponse: Response containing success status and result
    """
    result = AuthHandler().reset_password(request.email, request.password)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to reset password. Please try again."
        )
    return APISuccessResponse(
        http_status_code=status.HTTP_200_OK,
        message="Successfully reset password",
        result=result
    )
