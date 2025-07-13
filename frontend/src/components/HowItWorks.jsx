import React from 'react';
import { Upload, Bot, Clock, TrendingUp, Zap, BookOpen } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Lecture",
      description: "Upload your recorded lecture videos to our secure platform. Support for all major video formats and learning management systems.",
      color: "from-primary-500 to-secondary-300"
    },
    {
      icon: Bot,
      title: "AI Processes Automatically",
      description: "Our advanced AI analyzes the complete lecture, identifying key concepts, important explanations, and critical learning moments.",
      color: "from-secondary-300 to-accent-500"
    },
    {
      icon: Zap,
      title: "Highlights Generated",
      description: "Within minutes, receive condensed highlights that capture 95% of the essential content in just 10-15% of the original time.",
      color: "from-accent-500 to-primary-600"
    },
    {
      icon: TrendingUp,
      title: "Learn & Catch Up",
      description: "Use highlights for quick catch-up when you miss classes, efficient revision before exams, or rapid concept reinforcement.",
      color: "from-primary-600 to-secondary-400"
    }
  ];

  const useCases = [
    {
      icon: Clock,
      title: "Missed Lectures",
      description: "Catch up on missed classes in minutes instead of hours",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: BookOpen,
      title: "Exam Revision",
      description: "Quick review of entire courses before important exams",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Zap,
      title: "Concept Reinforcement",
      description: "Strengthen understanding of complex topics efficiently",
      color: "from-purple-500 to-pink-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              Phoenixio
            </span>{' '}
            Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Automated AI-powered lecture processing that transforms your learning experience
          </p>
        </div>

        {/* Main Process */}
        <div className="relative mb-20">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-300 via-accent-500 to-primary-600 transform -translate-y-1/2 rounded-full"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border-2 border-gray-100 hover:border-primary-200">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-white rounded-full border-4 border-primary-500 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-500">{index + 1}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Perfect For</h3>
            <p className="text-lg text-gray-600">Multiple scenarios where Phoenixio saves your academic life</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${useCase.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <useCase.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h4>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Learning?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students who never fall behind with automated lecture highlights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Your Free Trial
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;