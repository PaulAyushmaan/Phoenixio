import React, { useState, useEffect } from 'react';
import AdminDashboard from './admin/AdminDashboard';
import StudentDashboard from './student/StudentDashboard';
import { User, Shield, LogOut, Home, Menu } from 'lucide-react';

interface DashboardAppProps {
  onLogout?: () => void;
  defaultUserType?: 'admin' | 'student';
  currentRoute: string;
  navigateTo: (path: string) => void;
}

const DashboardApp: React.FC<DashboardAppProps> = ({ 
  onLogout, 
  defaultUserType = 'student',
  currentRoute,
  navigateTo
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Determine user type based on current route
  const getUserTypeFromRoute = () => {
    if (currentRoute.startsWith('/admin')) return 'admin';
    if (currentRoute.startsWith('/student')) return 'student';
    return defaultUserType;
  };

  const [userType, setUserType] = useState<'admin' | 'student'>(getUserTypeFromRoute());

  // Update user type when route changes
  useEffect(() => {
    const newUserType = getUserTypeFromRoute();
    setUserType(newUserType);
  }, [currentRoute]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [currentRoute]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleUserTypeChange = (type: 'admin' | 'student') => {
    setUserType(type);
    navigateTo(`/${type}`);
    setIsSidebarOpen(false);
  };

  const handleHomeClick = () => {
    navigateTo('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Dashboard Header - Fixed */}
      <div className="bg-white shadow-sm border-b flex-shrink-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button - positioned next to title */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <button 
                onClick={handleHomeClick}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block">Phoenixio Dashboard</span>
                <span className="text-lg font-bold text-gray-900 sm:hidden">Phoenixio</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Quick Access Buttons */}
              <button
                onClick={() => navigateTo('/dashboard')}
                className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </button>

              <button
                onClick={() => handleUserTypeChange('student')}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all ${
                  userType === 'student'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Student</span>
              </button>
              
              <button
                onClick={() => handleUserTypeChange('admin')}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all ${
                  userType === 'admin'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Dashboard Content - Flex container for sidebar and main content */}
      <div className="flex flex-1 overflow-hidden">
        {userType === 'admin' ? (
          <AdminDashboard 
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={toggleSidebar}
          />
        ) : (
          <StudentDashboard 
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardApp;