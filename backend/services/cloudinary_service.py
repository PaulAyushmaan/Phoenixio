import cloudinary
import cloudinary.uploader
from repositories.lecture_repo import LectureRepository
from dependencies.configuration import AppConfiguration

cloudinary.config(
    cloud_name=AppConfiguration.CLOUDINARY_CLOUD_NAME,
    api_key=AppConfiguration.CLOUDINARY_API_KEY,
    api_secret=AppConfiguration.CLOUDINARY_API_SECRET,
    secure=True,
)


class LectureService:
    @staticmethod
    def upload_video(file_obj, uploadLecture):
        # Upload to Cloudinary
        result = cloudinary.uploader.upload_large(
            file=file_obj,
            resource_type="video",
            chunk_size=6 * 1024 * 1024,
            folder="lectures",
            public_id=uploadLecture.title.replace(" ", "_")
        )

        video_url = result["secure_url"]

        # Save to DB
        lecture = LectureRepository.create(
            title=uploadLecture.title,
            course=uploadLecture.course,
            subject=uploadLecture.subject,
            tags=uploadLecture.tags,
            description=uploadLecture.description,
            original_url=video_url,
            status="processing"
        )

        return lecture
