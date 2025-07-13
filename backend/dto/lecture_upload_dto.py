from typing import Optional
from pydantic import BaseModel, Field


class VideoUploadDTO(BaseModel):
    """
    Data Transfer Object for video upload.
    """
    lecture_title: str = Field(..., description="Title of the video",
                               min_length=1, max_length=255)
    course_name: str = Field(...,
                             description="Course associated with the video")
    description: Optional[str] = Field(
        None, description="Description of the video", max_length=1000)
    subject: Optional[str] = Field(
        None, description="Subject associated with the video")


class LectureOut(BaseModel):
    title: str
    course: str
    subject: str | None
    video_url: str
    ppt_url: str
    status: str
