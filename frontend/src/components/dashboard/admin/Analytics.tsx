import React from 'react';
import { TrendingUp, Users, Clock, Play, BarChart3, PieChart } from 'lucide-react';

const Analytics: React.FC = () => {
  const metrics = [
    {
      title: 'Total Watch Time',
      value: '12,450 hrs',
      change: '+18%',
      icon: Clock,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Active Students',
      value: '8,934',
      change: '+23%',
      icon: Users,
      color: 'from-green-500 to-emerald-400'
    },
    {
      title: 'Completion Rate',
      value: '87.5%',
      change: '+5%',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-400'
    },
    {
      title: 'Avg. Engagement',
      value: '92%',
      change: '+12%',
      icon: Play,
      color: 'from-orange-500 to-red-400'
    }
  ];

  const topCourses = [
    { name: 'Computer Science 202', students: 1234, completion: 94 },
    { name: 'Mathematics 301', students: 987, completion: 89 },
    { name: 'Physics 101', students: 856, completion: 91 },
    { name: 'Chemistry 201', students: 743, completion: 87 },
    { name: 'Biology 150', students: 692, completion: 85 }
  ];

  const weeklyData = [
    { day: 'Mon', views: 1200, highlights: 890 },
    { day: 'Tue', views: 1450, highlights: 1020 },
    { day: 'Wed', views: 1680, highlights: 1180 },
    { day: 'Thu', views: 1890, highlights: 1340 },
    { day: 'Fri', views: 2100, highlights: 1560 },
    { day: 'Sat', views: 1650, highlights: 1200 },
    { day: 'Sun', views: 1320, highlights: 950 }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
        <p className="text-gray-600">Track platform performance and student engagement metrics.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">{metric.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm">{metric.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Weekly Activity</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-gray-600">Video Views</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                <span className="text-gray-600">Highlights</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col space-y-1">
                  <div
                    className="bg-primary-500 rounded-t"
                    style={{ height: `${(data.views / 2500) * 200}px` }}
                  ></div>
                  <div
                    className="bg-accent-500 rounded-b"
                    style={{ height: `${(data.highlights / 2500) * 200}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Courses</h2>
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{course.name}</h3>
                    <span className="text-xs text-gray-500">{course.completion}%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{course.students} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                      style={{ width: `${course.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Processing Efficiency</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Processing Time</span>
              <span className="font-semibold text-gray-900">4.2 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-semibold text-green-600">98.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Queue Length</span>
              <span className="font-semibold text-gray-900">23 lectures</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Capacity</span>
              <span className="font-semibold text-gray-900">500 lectures</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Student Engagement</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Active Users</span>
              <span className="font-semibold text-gray-900">2,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Session Duration</span>
              <span className="font-semibold text-gray-900">24 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Highlight Completion</span>
              <span className="font-semibold text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Return Rate</span>
              <span className="font-semibold text-gray-900">87.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;