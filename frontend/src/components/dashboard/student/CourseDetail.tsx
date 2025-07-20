import React, { useState } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle, Lock, Star, Users, Calendar } from 'lucide-react';

interface CourseDetailProps {
  courseId: string | null;
  onBack: () => void;
  onViewLecture: (lectureId: string) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courseId, onBack, onViewLecture }) => {
  const [activeTab, setActiveTab] = useState<'lectures' | 'overview' | 'progress'>('lectures');

  // Mock course data
  const course = {
    id: courseId,
    title: 'English for Competitive Exams',
    instructor: 'Subhangan Basu',
    description: 'This course provides comprehensive preparation for various competitive exams focusing on English language skills, including grammar, vocabulary, comprehension, and writing.',
    thumbnail: 'https://images.pexels.com/photos/8500618/pexels-photo-8500618.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    students: 234,
    totalLectures:1,
    completedLectures: 1,
    progress: 100,
    duration: '1 hours',
    level: 'Beginner',
    prerequisites: ['Basic Mathematics', 'High School Physics'],
    learningOutcomes: [
      'Understand fundamental physics principles',
      'Apply mathematical concepts to physical problems',
      'Analyze motion and forces in various systems',
      'Comprehend energy and momentum conservation',
      'Explore electromagnetic phenomena'
    ]
  };

  const lectures = [
    {
      id: '1',
      title: 'Introduction to Nouns and Verbs',
      duration: '60 min',
      highlights: '30 min',
      completed: true,
      locked: false,
      description: 'Understanding the basics of nouns and verbs, their roles in sentences, and how to identify them in various contexts.'
    },
    // {
    //   id: '2',
    //   title: 'Kinematics and Motion',
    //   duration: '52 min',
    //   highlights: '9 min',
    //   completed: true,
    //   locked: false,
    //   description: 'Study of motion without considering forces'
    // },
    // {
    //   id: '3',
    //   title: 'Forces and Newton\'s Laws',
    //   duration: '48 min',
    //   highlights: '10 min',
    //   completed: true,
    //   locked: false,
    //   description: 'Deep dive into the three laws of motion'
    // },
    // {
    //   id: '4',
    //   title: 'Work, Energy, and Power',
    //   duration: '55 min',
    //   highlights: '12 min',
    //   completed: false,
    //   locked: false,
    //   description: 'Understanding energy transformations and work'
    // },
    // {
    //   id: '5',
    //   title: 'Momentum and Collisions',
    //   duration: '50 min',
    //   highlights: '11 min',
    //   completed: false,
    //   locked: false,
    //   description: 'Conservation of momentum in various collision types'
    // },
    // {
    //   id: '6',
    //   title: 'Rotational Motion',
    //   duration: '58 min',
    //   highlights: '13 min',
    //   completed: false,
    //   locked: true,
    //   description: 'Angular motion and rotational dynamics'
    // }
  ];

  const weeklyProgress = [
    { week: 'Week 1', completed: 4, total: 4 },
    { week: 'Week 2', completed: 4, total: 4 },
    { week: 'Week 3', completed: 4, total: 4 },
    { week: 'Week 4', completed: 4, total: 4 },
    { week: 'Week 5', completed: 3, total: 4 },
    { week: 'Week 6', completed: 2, total: 4 }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600">{course.instructor}</p>
        </div>
      </div>

      {/* Course Hero */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{course.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-5 w-5" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-sm font-semibold">
                  {course.completedLectures}/{course.totalLectures} lectures completed
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-sm font-semibold">{course.progress}% complete</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Course Progress</h2>
            <span className="text-primary-600 font-semibold">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('lectures')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'lectures'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Lectures
          </button>
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
            onClick={() => setActiveTab('progress')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'progress'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Progress
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'lectures' && (
        <div className="space-y-4">
          {lectures.map((lecture, index) => (
            <div
              key={lecture.id}
              className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 ${
                lecture.locked ? 'opacity-60' : 'hover:shadow-xl cursor-pointer'
              }`}
              onClick={() => !lecture.locked && onViewLecture(lecture.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {lecture.locked ? (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Lock className="h-6 w-6 text-gray-400" />
                    </div>
                  ) : lecture.completed ? (
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary-600" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {index + 1}. {lecture.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{lecture.duration} → {lecture.highlights}</span>
                      {lecture.completed && (
                        <span className="text-green-600 font-medium">Completed</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600">{lecture.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Course Description</h2>
              <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Outcomes</h2>
              <ul className="space-y-3">
                {course.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Course Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Level</span>
                  <p className="font-semibold text-gray-900">{course.level}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Duration</span>
                  <p className="font-semibold text-gray-900">{course.duration}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Total Lectures</span>
                  <p className="font-semibold text-gray-900">{course.totalLectures}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Prerequisites</h3>
              <ul className="space-y-2">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Progress</h2>
            <div className="space-y-4">
              {weeklyProgress.map((week, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{week.week}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                        style={{ width: `${(week.completed / week.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">
                      {week.completed}/{week.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Study Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Study Time</span>
                <span className="font-semibold text-gray-900">23.5 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Session</span>
                <span className="font-semibold text-gray-900">45 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-semibold text-green-600">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Study Streak</span>
                <span className="font-semibold text-primary-600">7 days</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;