import React, { useState } from 'react';
import { ArrowLeft, Play, Clock, Users, Eye, Download, Share2, Edit, Trash2 } from 'lucide-react';

const LectureDetail = ({ lectureId, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock lecture data
  const lecture = {
    id: lectureId,
    title: 'Introduction to Quantum Mechanics',
    course: 'Physics 101',
    subject: 'Quantum Physics',
    description: 'This lecture covers the fundamental principles of quantum mechanics, including wave-particle duality, the uncertainty principle, and basic quantum states.',
    instructor: 'Dr. Sarah Johnson',
    duration: '2h 30m',
    highlights: '8m 45s',
    uploadDate: '2024-01-15',
    status: 'completed',
    originalVideoUrl: 'https://example.com/video.mp4',
    highlightsVideoUrl: 'https://example.com/highlights.mp4',
    tags: ['quantum', 'physics', 'mechanics', 'wave-particle'],
    topics: [
      'Wave-particle duality',
      'Heisenberg uncertainty principle',
      'Quantum superposition',
      'Schrödinger equation basics',
      'Quantum tunneling'
    ],
    analytics: {
      totalViews: 1250,
      uniqueStudents: 234,
      completionRate: 87,
      averageWatchTime: '6m 32s',
      engagement: 92
    },
    processingLogs: [
      { timestamp: '2024-01-15 10:00:00', event: 'Upload started', status: 'info' },
      { timestamp: '2024-01-15 10:02:15', event: 'Video validation completed', status: 'success' },
      { timestamp: '2024-01-15 10:02:30', event: 'AI processing initiated', status: 'info' },
      { timestamp: '2024-01-15 10:06:45', event: 'Transcript generation completed', status: 'success' },
      { timestamp: '2024-01-15 10:08:20', event: 'Key moments identified', status: 'success' },
      { timestamp: '2024-01-15 10:10:15', event: 'Highlights video generated', status: 'success' },
      { timestamp: '2024-01-15 10:10:30', event: 'Processing completed successfully', status: 'success' }
    ]
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

  const getLogStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lecture.title}</h1>
            <p className="text-gray-600">{lecture.course} • {lecture.instructor}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={getStatusBadge(lecture.status)}>{lecture.status}</span>
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Edit className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'logs'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Processing Logs
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Players */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Original Lecture</h2>
              <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                  <p className="text-lg font-semibold">Duration: {lecture.duration}</p>
                  <button className="mt-4 bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Play Original
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">AI-Generated Highlights</h2>
              <div className="aspect-video bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Duration: {lecture.highlights}</p>
                  <button className="mt-4 bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Play Highlights
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lecture Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Lecture Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Subject</span>
                  <p className="font-semibold text-gray-900">{lecture.subject}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Upload Date</span>
                  <p className="font-semibold text-gray-900">{new Date(lecture.uploadDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Description</span>
                  <p className="text-gray-700 text-sm">{lecture.description}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Key Topics</h3>
              <div className="space-y-2">
                {lecture.topics.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {lecture.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{lecture.analytics.totalViews}</h3>
            <p className="text-gray-600 text-sm">Total Views</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{lecture.analytics.uniqueStudents}</h3>
            <p className="text-gray-600 text-sm">Unique Students</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{lecture.analytics.completionRate}%</h3>
            <p className="text-gray-600 text-sm">Completion Rate</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-400 rounded-xl flex items-center justify-center">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{lecture.analytics.engagement}%</h3>
            <p className="text-gray-600 text-sm">Engagement</p>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Processing Logs</h2>
          <div className="space-y-4">
            {lecture.processingLogs.map((log, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    log.status === 'success' ? 'bg-green-500' :
                    log.status === 'error' ? 'bg-red-500' :
                    log.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{log.event}</p>
                  <p className="text-sm text-gray-500">{log.timestamp}</p>
                </div>
                <div className={`text-sm font-medium ${getLogStatusColor(log.status)}`}>
                  {log.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureDetail;