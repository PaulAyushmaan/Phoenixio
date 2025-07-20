import React from 'react';
import { Play, Clock, BookOpen, TrendingUp, Calendar, Star, ChevronRight, ShoppingBag } from 'lucide-react';

interface StudentHomeProps {
  onViewCourse: (courseId: string) => void;
}

const StudentHome: React.FC<StudentHomeProps> = ({ onViewCourse }) => {
  const stats = [
    {
      title: 'Lectures Watched',
      value: '47',
      change: '+8 this week',
      icon: Play,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Time Saved',
      value: '23.5 hrs',
      change: '+4.2 hrs this week',
      icon: Clock,
      color: 'from-green-500 to-emerald-400'
    },
    {
      title: 'Courses Active',
      value: '5',
      change: '2 new this semester',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-400'
    },
    {
      title: 'Progress Score',
      value: '87%',
      change: '+12% this month',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-400'
    }
  ];

  const recentLectures = [
    {
      id: '1',
      title: 'English for Compititive Exams',
      course: 'English 101',
      duration: '8m 45s',
      progress: 100,
      thumbnail: 'https://images.pexels.com/photos/8500618/pexels-photo-8500618.jpeg?auto=compress&cs=tinysrgb&w=300',
      completedAt: '2 hours ago'
    },
    // {
    //   id: '2',
    //   title: 'Organic Chemistry Reactions',
    //   course: 'Chemistry 201',
    //   duration: '12m 30s',
    //   progress: 65,
    //   thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300',
    //   completedAt: 'In progress'
    // },
    // {
    //   id: '3',
    //   title: 'Data Structures Overview',
    //   course: 'Computer Science 202',
    //   duration: '15m 20s',
    //   progress: 0,
    //   thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300',
    //   completedAt: 'Not started'
    // }
  ];

  const upcomingDeadlines = [
    {
      title: 'Physics 101 - Midterm Exam',
      date: '2024-01-20',
      type: 'exam',
      priority: 'high'
    },
    {
      title: 'Chemistry 201 - Lab Report',
      date: '2024-01-22',
      type: 'assignment',
      priority: 'medium'
    },
    {
      title: 'Math 301 - Problem Set 5',
      date: '2024-01-25',
      type: 'assignment',
      priority: 'low'
    }
  ];

  const featuredCourses = [
    {
      id: 'machine-learning',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Alex Thompson',
      price: 349,
      originalPrice: 449,
      rating: 4.8,
      students: 2134,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
      bestseller: true
    },
    {
      id: 'advanced-physics',
      title: 'Advanced Quantum Physics',
      instructor: 'Dr. Sarah Johnson',
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      students: 2847,
      thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300',
      bestseller: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const user_name=localStorage.getItem('user_name') || 'Alex';
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back, {user_name}!</h1>
        <p className="text-gray-600">Great job catching up! Keep up the momentum and stay ahead of your studies.</p>
      </div>

      {/* Stats Grid */}
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
            <p className="text-xs text-green-600 font-medium">{stat.change}</p>
          </div>
        ))}
      </div> */}

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Lectures */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Continue Learning</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1">
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {recentLectures.map((lecture) => (
                <div key={lecture.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => onViewCourse(lecture.courseId)}>
                  <div className="relative flex-shrink-0">
                    <img
                      src={lecture.thumbnail}
                      alt={lecture.title}
                      className="w-12 h-9 sm:w-16 sm:h-12 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <Play className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{lecture.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{lecture.course} • {lecture.duration}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-1.5 sm:h-2 rounded-full"
                          style={{ width: `${lecture.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{lecture.progress}%</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500">{lecture.completedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Courses */}
          {/* <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Featured Courses</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1">
                <span>Browse All</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => onViewCourse(course.id)}
                >
                  <div className="relative mb-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {course.bestseller && (
                      <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded text-xs font-bold">
                        BESTSELLER
                      </span>
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-white text-sm font-bold">${course.price}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          {/* <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-bold text-gray-900">Upcoming Deadlines</h2>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{deadline.title}</h3>
                    <p className="text-xs text-gray-500">{new Date(deadline.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${getPriorityColor(deadline.priority)}`}>
                    {deadline.priority}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Quick Actions */}
          {/* <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => onViewCourse('physics-101')}
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>My Courses</span>
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Browse Courses</span>
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Resume Last Video</span>
              </button>
            </div>
          </div> */}

          {/* Achievement */}
          {/* <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-4 sm:p-6 text-white">
            <div className="flex items-center space-x-3 mb-3">
              <Star className="h-6 w-6" />
              <h3 className="text-lg font-bold">Achievement Unlocked!</h3>
            </div>
            <p className="text-primary-100 mb-4">You've completed 50 lecture highlights this month!</p>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-sm font-semibold">Study Streak Master</p>
              <p className="text-xs text-primary-100">Keep up the great work!</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;