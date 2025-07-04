import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHome from './AdminHome';
import UploadLecture from './UploadLecture';
import AllLectures from './AllLectures';
import Analytics from './Analytics';
import Settings from './Settings';
import LectureDetail from './LectureDetail';

export type AdminView = 'dashboard' | 'upload' | 'lectures' | 'analytics' | 'settings' | 'lecture-detail';

interface AdminDashboardProps {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isSidebarOpen, onSidebarToggle }) => {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null);

  const handleViewLectureDetail = (lectureId: string) => {
    setSelectedLectureId(lectureId);
    setCurrentView('lecture-detail');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminHome />;
      case 'upload':
        return <UploadLecture />;
      case 'lectures':
        return <AllLectures onViewDetail={handleViewLectureDetail} />;
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