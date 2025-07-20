import boto3
from botocore.client import Config
from repositories.lecture_repository import LectureRepository
from dependencies.configuration import AppConfiguration
import uuid
import logging

logger = logging.getLogger("cloudflare_services")
logger.setLevel(logging.INFO)


class CloudflareLectureService:
    @staticmethod
    def upload_video(file_obj, upload_lecture, ppt_file, course):
        # Setup Cloudflare R2 client
        logger.info("Initializing Cloudflare R2 client.")
        s3 = boto3.client(
            's3',
            endpoint_url=AppConfiguration.CLOUDFLARE_R2_ENDPOINT,
            aws_access_key_id=AppConfiguration.CLOUDFLARE_R2_ACCESS_KEY_ID,
            aws_secret_access_key=AppConfiguration.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
            config=Config(signature_version='s3v4'),
            region_name='auto'
        )

        # Generate unique keys
        video_key = f"lectures/{uuid.uuid4()}_{upload_lecture.lecture_title.replace(' ', '_')}.mp4"
        ppt_key = f"slides/{uuid.uuid4()}_{upload_lecture.lecture_title.replace(' ', '_')}_slides.pptx"

        # Upload video
        try:
            logger.info(
                f"Uploading video to R2: bucket={AppConfiguration.CLOUDFLARE_R2_BUCKET}, key={video_key}")
            file_obj.seek(0)
            s3.upload_fileobj(
                file_obj, AppConfiguration.CLOUDFLARE_R2_BUCKET, video_key)
            video_url = f"{AppConfiguration.CLOUDFLARE_R2_PUBLIC_URL}/{video_key}"
            logger.info(f"Video uploaded successfully: {video_url}")
        except Exception as e:
            logger.error(f"Error uploading video to R2: {e}")
            raise

        # Upload ppt
        try:
            logger.info(
                f"Uploading PPT to R2: bucket={AppConfiguration.CLOUDFLARE_R2_BUCKET}, key={ppt_key}")
            ppt_file.file.seek(0)
            s3.upload_fileobj(
                ppt_file.file, AppConfiguration.CLOUDFLARE_R2_BUCKET, ppt_key)
            ppt_url = f"{AppConfiguration.CLOUDFLARE_R2_PUBLIC_URL}/{ppt_key}"
            logger.info(f"PPT uploaded successfully: {ppt_url}")
        except Exception as e:
            logger.error(f"Error uploading PPT to R2: {e}")
            raise

        # Save to DB
        logger.info("Saving lecture to database.")
        lecture = LectureRepository.create(
            video_title=upload_lecture.lecture_title,
            course=course,
            subject=upload_lecture.subject,
            description=upload_lecture.description,
            video_url=video_url,
            ppt_url=ppt_url,
            status="processing"
        )
        logger.info(f"Lecture saved: {lecture}")

        return lecture
