import React, { useState } from 'react';
import { ArrowLeft, Star, Users, Clock, Play, CheckCircle, Award, CreditCard, Shield, Globe } from 'lucide-react';

interface CourseEnrollmentProps {
  courseId: string | null;
  onBack: () => void;
  onEnroll: () => void;
}

const CourseEnrollment: React.FC<CourseEnrollmentProps> = ({ courseId, onBack, onEnroll }) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('premium');

  // Mock course data - in real app, fetch by courseId
  const course = {
    id: courseId,
    title: 'Advanced Quantum Physics',
    instructor: 'Dr. Sarah Johnson',
    instructorBio: 'Professor of Physics at Stanford University with 15+ years of research experience in quantum mechanics.',
    instructorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    category: 'Physics',
    level: 'Advanced',
    rating: 4.9,
    reviews: 847,
    students: 2847,
    duration: '48 hours',
    lectures: 32,
    thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Master quantum mechanics with comprehensive coverage of wave functions, operators, and modern applications. This course provides a deep understanding of quantum physics principles and their real-world applications.',
    longDescription: 'This comprehensive course takes you through the fascinating world of quantum physics, from basic principles to advanced applications. You\'ll explore wave-particle duality, quantum superposition, entanglement, and the mathematical frameworks that describe quantum systems. Perfect for physics students, researchers, and anyone curious about the quantum world.',
    features: [
      '32 HD Video Lectures',
      'Interactive Quantum Simulations',
      'Downloadable Problem Sets',
      'Certificate of Completion',
      'Lifetime Access',
      'Mobile & Desktop Access',
      'Discussion Forums',
      'Expert Q&A Sessions'
    ],
    curriculum: [
      {
        module: 'Introduction to Quantum Mechanics',
        lectures: 6,
        duration: '8 hours',
        topics: ['Historical Background', 'Wave-Particle Duality', 'Uncertainty Principle']
      },
      {
        module: 'Mathematical Foundations',
        lectures: 8,
        duration: '12 hours',
        topics: ['Complex Numbers', 'Linear Algebra', 'Differential Equations']
      },
      {
        module: 'Quantum States and Operators',
        lectures: 10,
        duration: '15 hours',
        topics: ['State Vectors', 'Operators', 'Eigenvalues and Eigenvectors']
      },
      {
        module: 'Applications and Modern Physics',
        lectures: 8,
        duration: '13 hours',
        topics: ['Quantum Computing', 'Quantum Cryptography', 'Future Directions']
      }
    ],
    pricing: {
      basic: {
        price: 199,
        originalPrice: 299,
        features: [
          'Access to all video lectures',
          'Downloadable resources',
          'Basic certificate',
          '6 months access'
        ]
      },
      premium: {
        price: 299,
        originalPrice: 399,
        features: [
          'Everything in Basic',
          'Interactive simulations',
          'Live Q&A sessions',
          'Premium certificate',
          'Lifetime access',
          'Priority support'
        ]
      }
    },
    testimonials: [
      {
        name: 'Alex Chen',
        role: 'Physics Graduate Student',
        rating: 5,
        text: 'This course completely transformed my understanding of quantum mechanics. Dr. Johnson\'s explanations are crystal clear!'
      },
      {
        name: 'Maria Rodriguez',
        role: 'Research Scientist',
        rating: 5,
        text: 'The interactive simulations made complex concepts so much easier to grasp. Highly recommended!'
      }
    ]
  };

  const handleEnrollment = () => {
    // In real app, process payment and enrollment
    onEnroll();
  };

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600">by {course.instructor}</p>
        </div>
      </div>

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
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Course Description */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{course.description}</p>
            <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
          </div>

          {/* What You'll Learn */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {course.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
            <div className="space-y-4">
              {course.curriculum.map((module, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{module.module}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{module.lectures} lectures</span>
                      <span>{module.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructor</h2>
            <div className="flex items-start space-x-4">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{course.instructor}</h3>
                <p className="text-gray-600 mt-2">{course.instructorBio}</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
            <div className="space-y-6">
              {course.testimonials.map((testimonial, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{testimonial.name}</span>
                    <span className="text-gray-500">• {testimonial.role}</span>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Enrollment */}
        <div className="space-y-6">
          {/* Pricing Plans */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Your Plan</h3>
            
            <div className="space-y-4 mb-6">
              {/* Premium Plan */}
              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedPlan === 'premium'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan('premium')}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={selectedPlan === 'premium'}
                      onChange={() => setSelectedPlan('premium')}
                      className="text-primary-500"
                    />
                    <span className="font-semibold text-gray-900">Premium</span>
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-2 py-1 rounded text-xs font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${course.pricing.premium.price}</div>
                    <div className="text-sm text-gray-500 line-through">${course.pricing.premium.originalPrice}</div>
                  </div>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  {course.pricing.premium.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Basic Plan */}
              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedPlan === 'basic'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan('basic')}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={selectedPlan === 'basic'}
                      onChange={() => setSelectedPlan('basic')}
                      className="text-primary-500"
                    />
                    <span className="font-semibold text-gray-900">Basic</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${course.pricing.basic.price}</div>
                    <div className="text-sm text-gray-500 line-through">${course.pricing.basic.originalPrice}</div>
                  </div>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  {course.pricing.basic.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enroll Button */}
            <button
              onClick={handleEnrollment}
              className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 rounded-xl font-bold text-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <CreditCard className="h-6 w-6" />
              <span>Enroll Now</span>
            </button>

            {/* Security Features */}
            <div className="mt-6 space-y-3 text-sm text-gray-600">
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
            <h3 className="text-lg font-bold text-gray-900 mb-4">Course Stats</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollment;