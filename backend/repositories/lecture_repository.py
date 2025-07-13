from models.lecture_model import Lecture


class LectureRepository:
    @staticmethod
    def create(**kwargs) -> Lecture:
        lecture = Lecture(**kwargs)
        lecture.save()
        return lecture
