from mongoengine import Document, StringField, ListField, DateTimeField
from datetime import datetime
# Local application imports
from dependencies.configuration import AppConfiguration


class Lecture(Document):
    title = StringField(required=True)
    course = StringField(required=True)
    subject = StringField()
    tags = ListField(StringField())
    description = StringField()
    original_url = StringField(required=True)
    highlight_url = StringField()
    status = StringField(default="processing")  # processing, done, failed
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "lectures",
            "indexes": ["title", "course", "subject"],
            "db_alias":  AppConfiguration.MAIN_DB
            }
