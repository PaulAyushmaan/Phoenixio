from mongoengine import Document, StringField, DateTimeField
from datetime import datetime
# Local application imports
from dependencies.configuration import AppConfiguration


class CourseModel(Document):
    course_title = StringField(required=True, unique=True)
    course_subtitle = StringField(required=True, unique=True)
    description = StringField()
    subject = StringField()
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)
    admin_id = StringField(required=True)

    meta = {"collection": "courses",
            "indexes": ["course_title", "subject"],
            "db_alias":  AppConfiguration.MAIN_DB
            }
