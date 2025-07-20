import React, { useState } from 'react';
import { Search, Filter, BookOpen, Users, Clock, Play, Star } from 'lucide-react';

interface MyCoursesProps {
  onViewCourse: (courseId: string) => void;
}

const MyCourses: React.FC<MyCoursesProps> = ({ onViewCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const courses = [
    {
      id: 'english-101',
      title: 'English for Competitive Exams',
      instructor: 'Subhangan Basu',
      progress: 87,
      totalLectures: 24,
      completedLectures: 21,
      nextLecture: 'Advanced Grammar',
      thumbnail: 'https://images.pexels.com/photos/8500618/pexels-photo-8500618.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      students: 234,
      status: 'active'
    },
    // {
    //   id: 'chemistry-201',
    //   title: 'Organic Chemistry',
    //   instructor: 'Prof. Michael Chen',
    //   progress: 65,
    //   totalLectures: 18,
    //   completedLectures: 12,
    //   nextLecture: 'Reaction Mechanisms',
    //   thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    //   rating: 4.6,
    //   students: 189,
    //   status: 'active'
    // },
    // {
    //   id: 'math-301',
    //   title: 'Advanced Calculus',
    //   instructor: 'Dr. Emily Rodriguez',
    //   progress: 92,
    //   totalLectures: 20,
    //   completedLectures: 18,
    //   nextLecture: 'Integration Techniques',
    //   thumbnail: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400',
    //   rating: 4.9,
    //   students: 156,
    //   status: 'active'
    // },
    // {
    //   id: 'cs-202',
    //   title: 'Data Structures & Algorithms',
    //   instructor: 'Prof. David Kim',
    //   progress: 100,
    //   totalLectures: 16,
    //   completedLectures: 16,
    //   nextLecture: 'Course Completed',
    //   thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400',
    //   rating: 4.7,
    //   students: 298,
    //   status: 'completed'
    // },
    // {
    //   id: 'biology-150',
    //   title: 'Cell Biology Fundamentals',
    //   instructor: 'Dr. Lisa Wang',
    //   progress: 23,
    //   totalLectures: 22,
    //   completedLectures: 5,
    //   nextLecture: 'Cellular Respiration',
    //   thumbnail: 'https://images.pexels.com/photos/8326569/pexels-photo-8326569.jpeg?auto=compress&cs=tinysrgb&w=400',
    //   rating: 4.5,
    //   students: 167,
    //   status: 'active'
    // }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'active':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">Track your progress and continue learning across all your enrolled courses.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Courses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => onViewCourse(course.id)}
          >
            {/* Course Thumbnail */}
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className={getStatusBadge(course.status)}>
                  {course.status}
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-semibold">
                    {course.completedLectures}/{course.totalLectures} lectures
                  </span>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{course.instructor}</p>
              
              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Next Lecture */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">
                  {course.status === 'completed' ? 'Status' : 'Next Lecture'}
                </p>
                <p className="font-semibold text-gray-900 text-sm">{course.nextLecture}</p>
              </div>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.totalLectures} lectures</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 flex items-center justify-center space-x-2">
                {course.status === 'completed' ? (
                  <>
                    <BookOpen className="h-5 w-5" />
                    <span>Review Course</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Continue Learning</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or browse available courses.</p>
          <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;