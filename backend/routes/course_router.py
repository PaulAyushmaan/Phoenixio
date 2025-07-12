# Standard library imports
from typing import Any

# Third-party library imports
from fastapi import APIRouter, Depends, status, security, HTTPException

# Local application imports
from dependencies.exceptions import UserNotFoundException
from dependencies.logger import logger
from dto.course_dto import CourseDTO
from dto.common_dto import APISuccessResponse
from handlers.course_handler import CourseHandler
from models.user_model import User as UserModel
from handlers.auth_handlers import AuthHandler
# Create a single router for all routes
course_router = APIRouter(prefix="/dashboard/api/v1/courses")

# Course Routes


@course_router.post("/course_create", response_model=APISuccessResponse, tags=["Courses"])
def create_course(course_data: CourseDTO,
                  admin_user: UserModel = Depends(
                      AuthHandler.get_current_admin_user)
                  ) -> APISuccessResponse:
    """
    Create a new course.

    Args:
        course_data: Data transfer object containing course details.

    Returns:
        APISuccessResponse: Response indicating success.
    """
    try:
        CourseHandler.create_course(course_data, str(admin_user.id))
        return APISuccessResponse(
            http_status_code=status.HTTP_201_CREATED,
            message="Course created successfully",
            result=course_data.model_dump())
    except Exception as e:
        logger.error(f"Error creating course: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create course")


@course_router.get("/course_list", response_model=APISuccessResponse, tags=["Courses"])
def get_course_list(user: UserModel = Depends(
        AuthHandler.get_current_active_user)) -> APISuccessResponse:
    """ Get a list of all courses.

    Returns:
        APISuccessResponse: Response containing success status and result.
    """
    try:
        result = CourseHandler.get_all_courses(str(user.id))
        return APISuccessResponse(http_status_code=status.HTTP_200_OK, message="Successfully fetched course list", result=result)
    except Exception as e:
        logger.error(f"Error getting course list: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to get course list")
