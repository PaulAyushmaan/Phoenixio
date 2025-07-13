import React from 'react';
import { Upload, Clock, Users, TrendingUp, Play, CheckCircle, AlertCircle } from 'lucide-react';

const AdminHome = () => {
  const stats = [
    {
      title: 'Total Lectures',
      value: '1,247',
      change: '+12%',
      icon: Upload,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Processing',
      value: '23',
      change: '-5%',
      icon: Clock,
      color: 'from-yellow-500 to-orange-400'
    },
    {
      title: 'Avg. Processing Time',
      value: '4.2 min',
      change: '-8%',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-400'
    },
    {
      title: 'Active Students',
      value: '8,934',
      change: '+23%',
      icon: Users,
      color: 'from-purple-500 to-pink-400'
    }
  ];

  const recentLectures = [
    {
      id: 1,
      title: 'Advanced Calculus - Integration Techniques',
      course: 'Mathematics 301',
      status: 'completed',
      uploadedAt: '2 hours ago',
      duration: '2h 15m'
    },
    {
      id: 2,
      title: 'Organic Chemistry - Reaction Mechanisms',
      course: 'Chemistry 201',
      status: 'processing',
      uploadedAt: '4 hours ago',
      duration: '1h 45m'
    },
    {
      id: 3,
      title: 'Data Structures and Algorithms',
      course: 'Computer Science 202',
      status: 'completed',
      uploadedAt: '6 hours ago',
      duration: '3h 20m'
    },
    {
      id: 4,
      title: 'Quantum Physics - Wave Functions',
      course: 'Physics 401',
      status: 'failed',
      uploadedAt: '8 hours ago',
      duration: '2h 30m'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'processing':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };
  const user_name=localStorage.getItem('user_name') || 'Alex';
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin {user_name}! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Lectures */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Lectures</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentLectures.map((lecture) => (
                <div key={lecture.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    {getStatusIcon(lecture.status)}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{lecture.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{lecture.course} • {lecture.duration}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className={getStatusBadge(lecture.status)}>
                      {lecture.status}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{lecture.uploadedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 flex items-center justify-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload New Lecture</span>
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Preview Highlights</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-4 sm:p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Processing Status</h3>
            <p className="text-primary-100 mb-4">Your lectures are processing smoothly!</p>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex justify-between text-sm mb-2">
                <span>Current Queue</span>
                <span>23 lectures</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2 w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;