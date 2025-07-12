# Standard library imports
from datetime import datetime

# Third-party library imports
from mongoengine import (
    Document,
    StringField,
    BooleanField,
    EmailField,
    DateTimeField,
)

# Local application imports
from dependencies.constants import IST
from dependencies.configuration import AppConfiguration


class User(Document):
    email = EmailField(required=True, unique=True)
    phone_number = StringField()
    hashed_password = StringField(required=True)
    first_name = StringField()
    last_name = StringField()
    role = StringField(default="user", choices=["user", "admin"])
    is_active = BooleanField(default=True)
    created_at = DateTimeField(default=lambda: datetime.now(IST))
    updated_at = DateTimeField(default=lambda: datetime.now(IST))

    meta = {
        'collection': 'users',
        'indexes': [
            'email',
            'phone_number'
        ],
        "db_alias": AppConfiguration.MAIN_DB
    }

    def save(self, *args, **kwargs):
        self.updated_at = datetime.now(IST)
        return super(User, self).save(*args, **kwargs)


class RefreshToken(Document):
    user_id = StringField(required=True)
    token = StringField(required=True, unique=True)
    expires_at = DateTimeField(required=True)
    created_at = DateTimeField(default=lambda: datetime.now(IST))

    meta = {
        'collection': 'refresh_tokens',
        'indexes': [
            'token',
            'user_id',
            'expires_at'
        ],
        "db_alias": AppConfiguration.MAIN_DB
    }
