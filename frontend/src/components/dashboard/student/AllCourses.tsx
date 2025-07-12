import React, { useState } from 'react';
import { Search, Filter, Star, Users, Clock, Play, BookOpen, Award, ChevronRight } from 'lucide-react';

interface AllCoursesProps {
  onViewCourse: (courseId: string) => void;
  onEnrollCourse: (courseId: string) => void;
}

const AllCourses: React.FC<AllCoursesProps> = ({ onViewCourse, onEnrollCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const courses = [
    {
      id: 'advanced-physics',
      title: 'Advanced Quantum Physics',
      instructor: 'Dr. Sarah Johnson',
      category: 'Physics',
      level: 'Advanced',
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      students: 2847,
      duration: '48 hours',
      lectures: 32,
      thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master quantum mechanics with comprehensive coverage of wave functions, operators, and modern applications.',
      features: ['32 HD Video Lectures', 'Interactive Simulations', 'Problem Sets', 'Certificate of Completion'],
      enrolled: false,
      bestseller: true
    },
    {
      id: 'organic-chemistry',
      title: 'Organic Chemistry Mastery',
      instructor: 'Prof. Michael Chen',
      category: 'Chemistry',
      level: 'Intermediate',
      price: 249,
      originalPrice: 349,
      rating: 4.8,
      students: 1923,
      duration: '36 hours',
      lectures: 28,
      thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete guide to organic chemistry reactions, mechanisms, and synthesis strategies.',
      features: ['28 Video Lectures', '3D Molecular Models', 'Practice Problems', 'Lab Simulations'],
      enrolled: false,
      bestseller: false
    },
    {
      id: 'calculus-complete',
      title: 'Complete Calculus Course',
      instructor: 'Dr. Emily Rodriguez',
      category: 'Mathematics',
      level: 'Beginner',
      price: 199,
      originalPrice: 299,
      rating: 4.7,
      students: 3456,
      duration: '42 hours',
      lectures: 35,
      thumbnail: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'From limits to multivariable calculus - everything you need to master calculus.',
      features: ['35 Comprehensive Lectures', 'Step-by-step Solutions', 'Graphing Tools', 'Practice Exams'],
      enrolled: true,
      bestseller: false
    },
    {
      id: 'data-structures',
      title: 'Data Structures & Algorithms',
      instructor: 'Prof. David Kim',
      category: 'Computer Science',
      level: 'Intermediate',
      price: 279,
      originalPrice: 379,
      rating: 4.9,
      students: 4521,
      duration: '52 hours',
      lectures: 40,
      thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master essential data structures and algorithms for coding interviews and software development.',
      features: ['40 Coding Lectures', 'Interactive Coding', 'Interview Prep', 'Project Portfolio'],
      enrolled: false,
      bestseller: true
    },
    {
      id: 'cell-biology',
      title: 'Cell Biology Fundamentals',
      instructor: 'Dr. Lisa Wang',
      category: 'Biology',
      level: 'Beginner',
      price: 229,
      originalPrice: 329,
      rating: 4.6,
      students: 1876,
      duration: '38 hours',
      lectures: 30,
      thumbnail: 'https://images.pexels.com/photos/8326569/pexels-photo-8326569.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Explore the fascinating world of cells, from basic structure to complex cellular processes.',
      features: ['30 Visual Lectures', 'Microscopy Videos', 'Cell Animations', 'Lab Exercises'],
      enrolled: false,
      bestseller: false
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Alex Thompson',
      category: 'Computer Science',
      level: 'Advanced',
      price: 349,
      originalPrice: 449,
      rating: 4.8,
      students: 2134,
      duration: '56 hours',
      lectures: 45,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Comprehensive introduction to machine learning algorithms, neural networks, and AI applications.',
      features: ['45 Expert Lectures', 'Python Projects', 'Real Datasets', 'Industry Case Studies'],
      enrolled: false,
      bestseller: true
    }
  ];

  const categories = ['all', 'Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'Biology'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.students - a.students;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return 0; // Would sort by creation date in real app
      default:
        return 0;
    }
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h1>
        <p className="text-gray-600">Discover and enroll in courses to advance your learning journey.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {levels.map(level => (
              <option key={level} value={level}>
                {level === 'all' ? 'All Levels' : level}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Course Thumbnail */}
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {course.bestseller && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                    BESTSELLER
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

              {/* Enrolled Badge */}
              {course.enrolled && (
                <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ENROLLED
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">{course.title}</h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>
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
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {course.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {course.features.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{course.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => onViewCourse(course.id)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>View Details</span>
                </button>
                
                {course.enrolled ? (
                  <button
                    onClick={() => onViewCourse(course.id)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Continue Learning</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onEnrollCourse(course.id)}
                    className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Award className="h-5 w-5" />
                    <span>Enroll Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default AllCourses;