import React from 'react';
import { Home, Upload, BookOpen, BarChart3, Settings, Flame } from 'lucide-react';
import { AdminView } from './AdminDashboard';

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, onViewChange, isOpen, onToggle }) => {
  const menuItems = [
    { id: 'dashboard' as AdminView, label: 'Dashboard', icon: Home },
    { id: 'upload' as AdminView, label: 'Upload Lecture', icon: Upload },
    { id: 'lectures' as AdminView, label: 'All Lectures', icon: BookOpen },
    { id: 'analytics' as AdminView, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as AdminView, label: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (view: AdminView) => {
    onViewChange(view);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      lg:block h-full
    `}>
      {/* Header */}
      <div className="p-6 border-b flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">Manage your platform</p>
          </div>
        </div>
      </div>

      {/* Navigation - Takes remaining space */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentView === item.id
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Quick Stats - Fixed at bottom */}
      <div className="p-6 border-t flex-shrink-0 mt-auto">
        <div className="bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-bold text-gray-900">Quick Stats</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-gray-600">Active Lectures</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-bold text-gray-900">1,247</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-gray-600">Processing</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-yellow-600">23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;