import React, { useState } from 'react';
import StudentSidebar from './StudentSidebar';
import StudentHome from './StudentHome';
import MyCourses from './MyCourses';
import AllCourses from './AllCourses';
import StudentProfile from './StudentProfile';
import StudentSettings from './StudentSettings';
import CourseDetail from './CourseDetail';
import CourseEnrollment from './CourseEnrollment';
import LectureViewer from './LectureViewer';

export type StudentView = 'dashboard' | 'courses' | 'all-courses' | 'profile' | 'settings' | 'course-detail' | 'course-enrollment' | 'lecture-viewer';

interface StudentDashboardProps {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ isSidebarOpen, onSidebarToggle }) => {
  const [currentView, setCurrentView] = useState<StudentView>('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null);

  const handleViewCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-detail');
  };

  const handleEnrollCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-enrollment');
  };

  const handleViewLecture = (lectureId: string) => {
    setSelectedLectureId(lectureId);
    setCurrentView('lecture-viewer');
  };

  const handleSuccessfulEnrollment = () => {
    // After successful enrollment, redirect to course detail
    setCurrentView('course-detail');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <StudentHome onViewCourse={handleViewCourse} />;
      case 'courses':
        return <MyCourses onViewCourse={handleViewCourse} />;
      case 'all-courses':
        return <AllCourses onViewCourse={handleViewCourse} onEnrollCourse={handleEnrollCourse} />;
      case 'profile':
        return <StudentProfile />;
      case 'settings':
        return <StudentSettings />;
      case 'course-detail':
        return (
          <CourseDetail
            courseId={selectedCourseId}
            onBack={() => setCurrentView('courses')}
            onViewLecture={handleViewLecture}
          />
        );
      case 'course-enrollment':
        return (
          <CourseEnrollment
            courseId={selectedCourseId}
            onBack={() => setCurrentView('all-courses')}
            onEnroll={handleSuccessfulEnrollment}
          />
        );
      case 'lecture-viewer':
        return (
          <LectureViewer
            lectureId={selectedLectureId}
            onBack={() => setCurrentView('course-detail')}
          />
        );
      default:
        return <StudentHome onViewCourse={handleViewCourse} />;
    }
  };

  return (
    <>
      {/* Sidebar - Fixed */}
      <StudentSidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isOpen={isSidebarOpen}
        onToggle={onSidebarToggle}
      />
      
      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {renderContent()}
      </main>
    </>
  );
};

export default StudentDashboard;