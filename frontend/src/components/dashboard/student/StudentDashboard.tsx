import React, { useState } from 'react';
import StudentSidebar from './StudentSidebar';
import StudentHome from './StudentHome';
import MyCourses from './MyCourses';
import StudentProfile from './StudentProfile';
import StudentSettings from './StudentSettings';
import CourseDetail from './CourseDetail';
import LectureViewer from './LectureViewer';

export type StudentView = 'dashboard' | 'courses' | 'profile' | 'settings' | 'course-detail' | 'lecture-viewer';

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

  const handleViewLecture = (lectureId: string) => {
    setSelectedLectureId(lectureId);
    setCurrentView('lecture-viewer');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <StudentHome onViewCourse={handleViewCourse} />;
      case 'courses':
        return <MyCourses onViewCourse={handleViewCourse} />;
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