import cloudinary
import cloudinary.uploader
from repositories.lecture_repository import LectureRepository
from dependencies.configuration import AppConfiguration

cloudinary.config(
    cloud_name=AppConfiguration.CLOUDINARY_CLOUD_NAME,
    api_key=AppConfiguration.CLOUDINARY_API_KEY,
    api_secret=AppConfiguration.CLOUDINARY_API_SECRET,
    secure=True,
)


class LectureService:
    @staticmethod
    def upload_video(file_obj, upload_lecture, ppt_file, course):
        # Upload to Cloudinary
        print(file_obj)  # Should be a file-like object
        print(file_obj.read(10))  # Should print some bytes, not empty
        file_obj.seek(0)  # Reset pointer after reading
        result = cloudinary.uploader.upload_large(
            file=file_obj,
            resource_type="video",
            chunk_size=6 * 1024 * 1024,
            folder="lectures",
            public_id=upload_lecture.lecture_title.replace(" ", "_")
        )

        video_url = result["secure_url"]

        ppt_file.file.seek(0)
        ppt_result = cloudinary.uploader.upload(
            file=ppt_file.file,
            resource_type="raw",
            folder="slides",
            public_id=upload_lecture.lecture_title.replace(
                " ", "_") + "_slides",
            filename=ppt_file.filename
        )
        ppt_url = ppt_result["secure_url"]

        # Save to DB
        lecture = LectureRepository.create(
            video_title=upload_lecture.lecture_title,
            course=course,
            subject=upload_lecture.subject,
            description=upload_lecture.description,
            video_url=video_url,
            ppt_url=ppt_url,
            status="processing"
        )

        return lecture
