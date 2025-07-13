import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHome from './AdminHome';
import UploadLecture from './UploadLecture';
import AllLectures from './AllLectures';
import CreateCourse from './CreateCourse';
import ManageCourses from './ManageCourses';
import Analytics from './Analytics';
import Settings from './Settings';
import LectureDetail from './LectureDetail';

const AdminDashboard = ({ isSidebarOpen, onSidebarToggle }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleViewLectureDetail = (lectureId) => {
    setSelectedLectureId(lectureId);
    setCurrentView('lecture-detail');
  };

  const handleCreateCourse = () => {
    setCurrentView('create-course');
  };

  const handleEditCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentView('create-course'); // Reuse create course component for editing
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminHome />;
      case 'upload':
        return <UploadLecture />;
      case 'lectures':
        return <AllLectures onViewDetail={handleViewLectureDetail} />;
      case 'create-course':
        return <CreateCourse />;
      case 'manage-courses':
        return <ManageCourses onCreateCourse={handleCreateCourse} onEditCourse={handleEditCourse} />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'lecture-detail':
        return <LectureDetail lectureId={selectedLectureId} onBack={() => setCurrentView('lectures')} />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <>
      {/* Sidebar - Fixed */}
      <AdminSidebar 
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

export default AdminDashboard;