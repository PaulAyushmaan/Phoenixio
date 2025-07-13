import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus, Users, Star, DollarSign, Clock } from 'lucide-react';

interface ManageCoursesProps {
  onCreateCourse: () => void;
  onEditCourse: (courseId: string) => void;
}

const ManageCourses: React.FC<ManageCoursesProps> = ({ onCreateCourse, onEditCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const courses = [
    {
      id: '1',
      title: 'Advanced Quantum Physics',
      instructor: 'Dr. Sarah Johnson',
      category: 'Physics',
      status: 'published',
      students: 2847,
      rating: 4.9,
      reviews: 847,
      price: 299,
      revenue: 850653,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300',
      lectures: 32,
      duration: '48 hours'
    },
    {
      id: '2',
      title: 'Complete Python Programming',
      instructor: 'Prof. Michael Chen',
      category: 'Computer Science',
      status: 'published',
      students: 4521,
      rating: 4.8,
      reviews: 1203,
      price: 199,
      revenue: 899679,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300',
      lectures: 45,
      duration: '56 hours'
    },
    {
      id: '3',
      title: 'Organic Chemistry Mastery',
      instructor: 'Dr. Emily Rodriguez',
      category: 'Chemistry',
      status: 'draft',
      students: 0,
      rating: 0,
      reviews: 0,
      price: 249,
      revenue: 0,
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22',
      thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300',
      lectures: 28,
      duration: '36 hours'
    },
    {
      id: '4',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Alex Thompson',
      category: 'Computer Science',
      status: 'published',
      students: 3456,
      rating: 4.7,
      reviews: 892,
      price: 349,
      revenue: 1206144,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-16',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
      lectures: 40,
      duration: '52 hours'
    },
    {
      id: '5',
      title: 'Cell Biology Fundamentals',
      instructor: 'Dr. Lisa Wang',
      category: 'Biology',
      status: 'archived',
      students: 1876,
      rating: 4.6,
      reviews: 456,
      price: 229,
      revenue: 429604,
      createdAt: '2023-12-20',
      updatedAt: '2024-01-10',
      thumbnail: 'https://images.pexels.com/photos/8326569/pexels-photo-8326569.jpeg?auto=compress&cs=tinysrgb&w=300',
      lectures: 30,
      duration: '38 hours'
    }
  ];

  const categories = ['all', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'Mathematics'];
  const statuses = ['all', 'published', 'draft', 'archived'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'published':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'draft':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'archived':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const totalRevenue = courses.reduce((sum, course) => sum + course.revenue, 0);
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const publishedCourses = courses.filter(course => course.status === 'published').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Courses</h1>
            <p className="text-gray-600">Create, edit, and manage all your courses from one place.</p>
          </div>
          <button
            onClick={onCreateCourse}
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Course</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{courses.length}</h3>
            <p className="text-gray-600 text-sm">Total Courses</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalStudents.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm">Total Students</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">${totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm">Total Revenue</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-400 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{publishedCourses}</h3>
            <p className="text-gray-600 text-sm">Published</p>
          </div>
        </div>
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
          
          <div className="flex space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            
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
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.instructor}</div>
                        <div className="text-xs text-gray-400">
                          {course.lectures} lectures • {course.duration}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(course.status)}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {course.students.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-900">{course.rating}</span>
                      <span className="text-xs text-gray-500">({course.reviews})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${course.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        title="View Course"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEditCourse(course.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Course"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">No courses found</div>
            <div className="text-sm text-gray-400">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;