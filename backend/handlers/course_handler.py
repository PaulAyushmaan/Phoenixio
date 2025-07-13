from typing import Any, Union, Dict
from mongoengine.errors import NotUniqueError
from fastapi import HTTPException, status
from dto.course_dto import CourseDTO
from models.course_model import CourseModel
from dependencies.logger import logger


class CourseHandler:
    @staticmethod
    def create_course(course_data: CourseDTO, admin_user_id: str) -> None:
        try:
            course = CourseModel(
                admin_id=admin_user_id,
                **course_data.model_dump())
            course.save()
        except NotUniqueError as e:
            logger.error(f"Duplicate course entry: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Course with this title or subtitle already exists."
            )
        except Exception as e:
            logger.error(f"Error creating course: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create course")

    @staticmethod
    def get_all_courses() -> Union[Dict[str, Any], None]:
        try:
            courses = CourseModel.objects()
            if not courses:
                return {"message": "No courses found"}

            def serialize_course(course):
                data = course.to_mongo().to_dict()
                # Convert ObjectId to string
                data["_id"] = str(data["_id"])
                return data
            return {"courses": [serialize_course(course) for course in courses]}
        except Exception as e:
            logger.error(f"Error fetching courses: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch courses")
