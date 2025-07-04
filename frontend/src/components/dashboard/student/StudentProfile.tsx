import React, { useState } from 'react';
import { User, Mail, Calendar, MapPin, Trophy, Clock, BookOpen, Star, Edit } from 'lucide-react';

const StudentProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    bio: 'Physics major passionate about quantum mechanics and theoretical physics. Love learning through visual explanations and interactive content.',
    location: 'Stanford University, CA',
    joinDate: '2023-09-15',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200'
  });

  const stats = [
    {
      title: 'Lectures Completed',
      value: '127',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Study Hours',
      value: '89.5',
      icon: Clock,
      color: 'from-green-500 to-emerald-400'
    },
    {
      title: 'Courses Enrolled',
      value: '5',
      icon: Star,
      color: 'from-purple-500 to-pink-400'
    },
    {
      title: 'Achievements',
      value: '12',
      icon: Trophy,
      color: 'from-orange-500 to-red-400'
    }
  ];

  const achievements = [
    {
      title: 'Early Bird',
      description: 'Completed 10 lectures before 8 AM',
      icon: '🌅',
      earned: true,
      date: '2024-01-10'
    },
    {
      title: 'Speed Learner',
      description: 'Completed 5 lectures in one day',
      icon: '⚡',
      earned: true,
      date: '2024-01-08'
    },
    {
      title: 'Consistent Learner',
      description: 'Study streak of 7 days',
      icon: '🔥',
      earned: true,
      date: '2024-01-15'
    },
    {
      title: 'Knowledge Seeker',
      description: 'Complete 50 lectures',
      icon: '📚',
      earned: true,
      date: '2024-01-12'
    },
    {
      title: 'Perfect Score',
      description: 'Score 100% on 5 quizzes',
      icon: '🎯',
      earned: false,
      date: null
    },
    {
      title: 'Course Master',
      description: 'Complete an entire course',
      icon: '🏆',
      earned: false,
      date: null
    }
  ];

  const recentActivity = [
    {
      type: 'completed',
      title: 'Quantum Mechanics Fundamentals',
      course: 'Physics 101',
      time: '2 hours ago'
    },
    {
      type: 'started',
      title: 'Organic Chemistry Reactions',
      course: 'Chemistry 201',
      time: '1 day ago'
    },
    {
      type: 'achievement',
      title: 'Earned "Consistent Learner" badge',
      course: null,
      time: '2 days ago'
    },
    {
      type: 'completed',
      title: 'Data Structures Overview',
      course: 'Computer Science 202',
      time: '3 days ago'
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed':
        return '✅';
      case 'started':
        return '▶️';
      case 'achievement':
        return '🏆';
      default:
        return '📝';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information and track your learning progress.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary-200"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-primary-500 text-white py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-gray-600 mt-2">{profile.bio}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">
                      Joined {new Date(profile.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.earned
                      ? 'border-primary-200 bg-primary-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-primary-600 mt-1">
                          Earned on {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    {activity.course && (
                      <p className="text-sm text-gray-600">{activity.course}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;