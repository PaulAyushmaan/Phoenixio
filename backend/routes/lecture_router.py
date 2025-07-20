from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from dto.lecture_upload_dto import VideoUploadDTO, LectureOut
from services.cloudflare_services import CloudflareLectureService
from handlers.auth_handlers import AuthHandler
from models.user_model import User as UserModel
from models.course_model import CourseModel

lecture_router = APIRouter(
    prefix="/dashboard/api/v1/lectures", tags=["lectures"])


@lecture_router.post("/upload", response_model=LectureOut)
async def upload_lecture(
    upload_lecture: VideoUploadDTO = Depends(),
    file: UploadFile = File(...),
    ppt_file: UploadFile = File(...),
    admin_user: UserModel = Depends(
        AuthHandler.get_current_admin_user)
) -> LectureOut:

    course = CourseModel.objects(
        course_title=upload_lecture.course_name).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    lecture = CloudflareLectureService.upload_video(
        file.file, upload_lecture, ppt_file, course)
    print(lecture)
    return LectureOut(
        title=lecture.video_title,
        course=lecture.course.course_title if lecture.course else "",
        subject=lecture.subject,
        video_url=lecture.video_url,
        ppt_url=lecture.ppt_url,
        status=lecture.status
    )
