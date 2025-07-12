from typing import Any, Optional, Union, Tuple, Dict
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
        except Exception as e:
            logger.error(f"Error creating course: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create course")

    @staticmethod
    def get_all_courses(user_id: str) -> Union[Dict[str, Any], None]:
        try:
            courses = CourseModel.objects(admin_id=user_id)
            if not courses:
                return {"message": "No courses found"}
            return {"courses": [course.to_mongo().to_dict() for course in courses]}
        except Exception as e:
            logger.error(f"Error fetching courses: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch courses")
