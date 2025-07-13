import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle, MoreHorizontal } from 'lucide-react';

const AllLectures = ({ onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  const lectures = [
    {
      id: '1',
      title: 'Introduction to Quantum Mechanics',
      course: 'Physics 101',
      status: 'completed',
      dateUploaded: '2024-01-15',
      duration: '2h 30m',
      highlights: '8 min',
      students: 234,
      views: 1250
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      course: 'Chemistry 201',
      status: 'processing',
      dateUploaded: '2024-01-14',
      duration: '1h 45m',
      highlights: 'Processing...',
      students: 189,
      views: 892
    },
    {
      id: '3',
      title: 'Advanced Calculus Integration',
      course: 'Mathematics 301',
      status: 'completed',
      dateUploaded: '2024-01-13',
      duration: '3h 15m',
      highlights: '12 min',
      students: 156,
      views: 2100
    },
    {
      id: '4',
      title: 'Data Structures and Algorithms',
      course: 'Computer Science 202',
      status: 'failed',
      dateUploaded: '2024-01-12',
      duration: '2h 45m',
      highlights: 'Failed',
      students: 298,
      views: 0
    },
    {
      id: '5',
      title: 'Cell Biology Fundamentals',
      course: 'Biology 150',
      status: 'completed',
      dateUploaded: '2024-01-11',
      duration: '2h 10m',
      highlights: '9 min',
      students: 167,
      views: 1456
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

  const filteredLectures = lectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lecture.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || lecture.course === courseFilter;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Lectures</h1>
        <p className="text-gray-600">Manage and monitor all uploaded lectures and their processing status.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search lectures..."
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
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
            
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Courses</option>
              <option value="Physics 101">Physics 101</option>
              <option value="Chemistry 201">Chemistry 201</option>
              <option value="Mathematics 301">Mathematics 301</option>
              <option value="Computer Science 202">Computer Science 202</option>
              <option value="Biology 150">Biology 150</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lectures Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lecture
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLectures.map((lecture) => (
                <tr key={lecture.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lecture.title}</div>
                      <div className="text-sm text-gray-500">{lecture.course}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(lecture.status)}
                      <span className={getStatusBadge(lecture.status)}>
                        {lecture.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lecture.duration}</div>
                    <div className="text-sm text-gray-500">→ {lecture.highlights}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {lecture.students}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {lecture.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(lecture.dateUploaded).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onViewDetail(lecture.id)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
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

        {filteredLectures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">No lectures found</div>
            <div className="text-sm text-gray-400">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLectures;