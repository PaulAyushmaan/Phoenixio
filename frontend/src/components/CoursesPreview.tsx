import React from 'react';
import { Star, Users, Clock, Play, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';

interface CoursesPreviewProps {
  onBrowseCourses: () => void;
}

const CoursesPreview: React.FC<CoursesPreviewProps> = ({ onBrowseCourses }) => {
  const featuredCourses = [
    {
      id: 'quantum-physics',
      title: 'Advanced Quantum Physics',
      instructor: 'Dr. Sarah Johnson',
      university: 'Stanford University',
      category: 'Physics',
      level: 'Advanced',
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      students: 2847,
      lectures: 32,
      duration: '48 hours',
      highlights: '6-8 min per lecture',
      thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master quantum mechanics with comprehensive coverage of wave functions, operators, and modern applications.',
      tags: ['Quantum Mechanics', 'Wave Functions', 'Schrödinger Equation'],
      bestseller: true,
      trending: false
    },
    {
      id: 'organic-chemistry',
      title: 'Organic Chemistry Mastery',
      instructor: 'Prof. Michael Chen',
      university: 'MIT',
      category: 'Chemistry',
      level: 'Intermediate',
      price: 249,
      originalPrice: 349,
      rating: 4.8,
      students: 1923,
      lectures: 28,
      duration: '36 hours',
      highlights: '5-7 min per lecture',
      thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete guide to organic chemistry reactions, mechanisms, and synthesis strategies.',
      tags: ['Reaction Mechanisms', 'Synthesis', 'Stereochemistry'],
      bestseller: false,
      trending: true
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Alex Thompson',
      university: 'UC Berkeley',
      category: 'Computer Science',
      level: 'Intermediate',
      price: 349,
      originalPrice: 449,
      rating: 4.9,
      students: 3456,
      lectures: 40,
      duration: '52 hours',
      highlights: '8-10 min per lecture',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Comprehensive introduction to ML algorithms, neural networks, and AI applications.',
      tags: ['Neural Networks', 'Deep Learning', 'Python'],
      bestseller: true,
      trending: true
    },
    {
      id: 'calculus',
      title: 'Complete Calculus Course',
      instructor: 'Dr. Emily Rodriguez',
      university: 'Harvard University',
      category: 'Mathematics',
      level: 'Beginner',
      price: 199,
      originalPrice: 299,
      rating: 4.7,
      students: 4521,
      lectures: 35,
      duration: '42 hours',
      highlights: '6-8 min per lecture',
      thumbnail: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'From limits to multivariable calculus - everything you need to master calculus.',
      tags: ['Derivatives', 'Integrals', 'Multivariable'],
      bestseller: false,
      trending: false
    }
  ];

  const stats = [
    {
      value: '500+',
      label: 'Expert Courses',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      value: '50K+',
      label: 'Students Learning',
      icon: Users,
      color: 'from-green-500 to-emerald-400'
    },
    {
      value: '95%',
      label: 'Time Saved',
      icon: Clock,
      color: 'from-purple-500 to-pink-400'
    },
    {
      value: '4.9/5',
      label: 'Average Rating',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-400'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              Course Library
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover world-class courses with AI-generated highlights that help you learn faster and more efficiently
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Courses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={onBrowseCourses}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {course.bestseller && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                      BESTSELLER
                    </span>
                  )}
                  {course.trending && (
                    <span className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                      TRENDING
                    </span>
                  )}
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    {course.level}
                  </span>
                </div>

                {/* Price */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-white font-bold">${course.price}</div>
                  {course.originalPrice > course.price && (
                    <div className="text-gray-300 text-sm line-through">${course.originalPrice}</div>
                  )}
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
                <p className="text-gray-500 text-xs mb-3">{course.university}</p>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{course.description}</p>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights Info */}
                <div className="bg-primary-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-800">AI Highlights</span>
                  </div>
                  <p className="text-xs text-primary-700">{course.highlights} • {course.lectures} lectures</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{course.tags.length - 2}</span>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>View Course</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="text-center">
          <button
            onClick={onBrowseCourses}
            className="group bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3 mx-auto"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-600 mt-4">
            Discover 500+ courses across all major subjects with AI-powered highlights
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;