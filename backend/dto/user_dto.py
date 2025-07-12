# Standard library imports
from typing import Optional
from datetime import datetime

# Standard library imports
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    """Base user model with common fields."""
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    is_active: Optional[bool] = True
    role: Optional[str] = "user"
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserCreate(UserBase):
    """DTO for user creation."""
    email: EmailStr
    password: str
    phone_number: str = Field(..., description="User's phone number",
                              min_length=10, max_length=15)
    first_name: str
    last_name: str


class UserUpdate(UserBase):
    """DTO for user updates."""
    password: Optional[str] = None


class User(UserBase):
    """DTO for user responses."""
    id: Optional[str] = Field(alias="_id")
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    """DTO for authentication tokens."""
    access_token: str
    refresh_token: str
    token_type: str
    first_name: str
    last_name: str
    expires_at: datetime


class TokenRefresh(BaseModel):
    """DTO for token refresh response."""
    access_token: str
    token_type: str
    expires_at: datetime


class TokenPayload(BaseModel):
    """DTO for JWT token payload."""
    sub: Optional[str] = None
    type: Optional[str] = None
    jti: Optional[str] = None


class RefreshTokenRequest(BaseModel):
    """DTO for refresh token requests."""
    refresh_token: str


class PasswordResetRequest(BaseModel):
    email: str = Field(..., description="Email to reset password")
    password: str = Field(..., description="New password to set")
