from typing import Optional
from pydantic import BaseModel, Field


class CourseDTO(BaseModel):
    """
    Data Transfer Object for course details.
    """
    course_title: str = Field(..., description="Title of the course",
                              min_length=1, max_length=255)
    course_subtitle: str = Field(..., description="Subtitle of the course",
                                 min_length=1, max_length=255)
    description: Optional[str] = Field(
        None, description="Description of the course", max_length=1000)
    subject: Optional[str] = Field(
        None, description="Subject associated with the course")
