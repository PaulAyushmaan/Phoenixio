from mongoengine import Document, StringField, DateTimeField, ReferenceField
from datetime import datetime
# Local application imports
from dependencies.configuration import AppConfiguration
from models.course_model import CourseModel


class Lecture(Document):
    video_title = StringField(required=True)
    course = ReferenceField(CourseModel, required=True)
    subject = StringField()
    description = StringField()
    video_url = StringField(required=True)
    ppt_url = StringField(required=True)
    highlight_url = StringField()
    status = StringField(default="processing")  # processing, done, failed
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "lectures",
            "indexes": ["video_title", "course", "subject"],
            "db_alias":  AppConfiguration.MAIN_DB
            }
