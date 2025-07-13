import React from 'react';
import { Home, BookOpen, ShoppingBag, User, Settings, Flame, Trophy } from 'lucide-react';

const StudentSidebar = ({ currentView, onViewChange, isOpen, onToggle }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'all-courses', label: 'Browse Courses', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (view) => {
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
            <h2 className="text-lg font-bold text-gray-900">Student Portal</h2>
            <p className="text-sm text-gray-500">Welcome back, Alex!</p>
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

      {/* Weekly Progress - Fixed at bottom */}
      <div className="p-6 border-t flex-shrink-0 mt-auto">
        <div className="bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-bold text-gray-900">This Week</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Lectures Watched</span>
                <span className="font-bold text-gray-900">12/15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2.5 rounded-full transition-all duration-300" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Study Streak</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-primary-600">7</span>
                <span className="text-sm text-gray-600">days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;