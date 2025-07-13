import React, { useState } from 'react';
import { ArrowLeft, Star, Users, Clock, Play, CheckCircle, Award, CreditCard, Shield, Globe, BookOpen } from 'lucide-react';

interface PublicCourseDetailProps {
  courseId: string | null;
  onBack: () => void;
  onEnroll: (courseId: string) => void;
  onLogin: () => void;
}

const PublicCourseDetail: React.FC<PublicCourseDetailProps> = ({ courseId, onBack, onEnroll, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');

  // Mock course data - in real app, fetch by courseId
  const course = {
    id: courseId,
    title: 'Advanced Quantum Physics',
    instructor: 'Dr. Sarah Johnson',
    instructorBio: 'Professor of Physics at Stanford University with 15+ years of research experience in quantum mechanics and theoretical physics. Published over 100 research papers and recipient of the Nobel Prize in Physics.',
    instructorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    instructorCourses: 5,
    instructorStudents: 12500,
    instructorRating: 4.9,
    university: 'Stanford University',
    category: 'Physics',
    level: 'Advanced',
    rating: 4.9,
    reviews: 847,
    students: 2847,
    duration: '48 hours',
    lectures: 32,
    language: 'English',
    lastUpdated: '2024-01-15',
    thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Master quantum mechanics with comprehensive coverage of wave functions, operators, and modern applications. This course provides a deep understanding of quantum physics principles and their real-world applications.',
    longDescription: 'This comprehensive course takes you through the fascinating world of quantum physics, from basic principles to advanced applications. You\'ll explore wave-particle duality, quantum superposition, entanglement, and the mathematical frameworks that describe quantum systems. Perfect for physics students, researchers, and anyone curious about the quantum world.',
    price: 299,
    originalPrice: 399,
    features: [
      '32 HD Video Lectures',
      'AI-Generated Highlights (6-8 min per lecture)',
      'Interactive Quantum Simulations',
      'Downloadable Problem Sets',
      'Certificate of Completion',
      'Lifetime Access',
      'Mobile & Desktop Access',
      'Discussion Forums',
      'Expert Q&A Sessions',
      '24/7 Student Support'
    ],
    learningOutcomes: [
      'Understand fundamental quantum mechanics principles',
      'Master wave function mathematics and operators',
      'Apply quantum mechanics to real-world problems',
      'Analyze quantum systems and their behavior',
      'Explore modern quantum applications and technologies'
    ],
    prerequisites: [
      'Advanced calculus and linear algebra',
      'Basic understanding of classical physics',
      'Familiarity with differential equations'
    ],
    curriculum: [
      {
        module: 'Introduction to Quantum Mechanics',
        lectures: 6,
        duration: '8 hours',
        topics: ['Historical Background', 'Wave-Particle Duality', 'Uncertainty Principle', 'Quantum States']
      },
      {
        module: 'Mathematical Foundations',
        lectures: 8,
        duration: '12 hours',
        topics: ['Complex Numbers', 'Linear Algebra', 'Differential Equations', 'Operators']
      },
      {
        module: 'Quantum States and Operators',
        lectures: 10,
        duration: '15 hours',
        topics: ['State Vectors', 'Hermitian Operators', 'Eigenvalues', 'Measurement Theory']
      },
      {
        module: 'Applications and Modern Physics',
        lectures: 8,
        duration: '13 hours',
        topics: ['Quantum Computing', 'Quantum Cryptography', 'Quantum Tunneling', 'Future Directions']
      }
    ],
    reviewsList: [
      {
        id: 1,
        name: 'Alex Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '2024-01-10',
        text: 'This course completely transformed my understanding of quantum mechanics. Dr. Johnson\'s explanations are crystal clear, and the AI highlights helped me review key concepts quickly before exams!'
      },
      {
        id: 2,
        name: 'Maria Rodriguez',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '2024-01-08',
        text: 'The interactive simulations made complex concepts so much easier to grasp. The AI-generated highlights are a game-changer for busy students like me.'
      },
      {
        id: 3,
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '2024-01-05',
        text: 'Best quantum physics course I\'ve ever taken. The problem sets are challenging but fair, and the certificate looks great on my resume!'
      }
    ]
  };

  const handleEnrollClick = () => {
    onEnroll(course.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600">by {course.instructor} • {course.university}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Preview */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                      <span className="text-sm">({course.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-5 w-5" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold">
                      {course.level}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold">
                      {course.duration}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold">
                      {course.lectures} lectures
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'curriculum', label: 'Curriculum' },
                    { id: 'instructor', label: 'Instructor' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-primary-600 border-b-2 border-primary-500'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
                      <p className="text-gray-700 leading-relaxed mb-4">{course.description}</p>
                      <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.learningOutcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Prerequisites</h3>
                      <ul className="space-y-2">
                        {course.prerequisites.map((prereq, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="text-gray-700">{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
                    <div className="space-y-4">
                      {course.curriculum.map((module, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{module.module}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{module.lectures} lectures</span>
                              <span>{module.duration}</span>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-2">
                            {module.topics.map((topic, topicIndex) => (
                              <div key={topicIndex} className="flex items-center space-x-2">
                                <Play className="h-4 w-4 text-primary-500" />
                                <span className="text-gray-700 text-sm">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Instructor Tab */}
                {activeTab === 'instructor' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Your Instructor</h2>
                    <div className="flex items-start space-x-6">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">{course.instructor}</h3>
                        <p className="text-gray-600 mb-4">{course.instructorBio}</p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-primary-600">{course.instructorRating}</div>
                            <div className="text-sm text-gray-600">Instructor Rating</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary-600">{course.instructorStudents.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">Students</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary-600">{course.instructorCourses}</div>
                            <div className="text-sm text-gray-600">Courses</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-600">({course.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {course.reviewsList.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-semibold text-gray-900">{review.name}</span>
                                <div className="flex space-x-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                              </div>
                              <p className="text-gray-700">{review.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Enrollment */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${course.price}
                  {course.originalPrice > course.price && (
                    <span className="text-xl text-gray-500 line-through ml-2">${course.originalPrice}</span>
                  )}
                </div>
                <div className="text-green-600 font-semibold">
                  Save ${course.originalPrice - course.price}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Enroll Button */}
              <button
                onClick={handleEnrollClick}
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 rounded-xl font-bold text-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 mb-4"
              >
                <CreditCard className="h-6 w-6" />
                <span>Enroll Now</span>
              </button>

              {/* Login Prompt */}
              <div className="text-center text-sm text-gray-600 mb-4">
                Don't have an account?{' '}
                <button
                  onClick={onLogin}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Sign up here
                </button>
              </div>

              {/* Security Features */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>Access on all devices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Course Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Students Enrolled</span>
                  <span className="font-semibold text-gray-900">{course.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lectures</span>
                  <span className="font-semibold text-gray-900">{course.lectures}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Duration</span>
                  <span className="font-semibold text-gray-900">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skill Level</span>
                  <span className="font-semibold text-gray-900">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-semibold text-gray-900">{course.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-semibold text-gray-900">{new Date(course.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCourseDetail;