import React from 'react';
import { Upload, Bot, Play, TrendingUp } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Lecture",
      description: "Simply drag and drop your recorded lecture video or paste a link from your learning platform.",
      color: "from-primary-500 to-secondary-300"
    },
    {
      icon: Bot,
      title: "AI Generates Highlights",
      description: "Our advanced AI analyzes your lecture and identifies the most important concepts and key moments.",
      color: "from-secondary-300 to-accent-500"
    },
    {
      icon: Play,
      title: "Watch & Learn",
      description: "Review your personalized highlights in minutes instead of hours. Focus on what matters most.",
      color: "from-primary-500 to-accent-500"
    },
    {
      icon: TrendingUp,
      title: "Stay Ahead",
      description: "Track your progress, share with classmates, and never fall behind in your studies again.",
      color: "from-accent-500 to-primary-600"
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
            Four simple steps to transform your learning experience and rise above your backlog
          </p>
        </div>

        <div className="relative">
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

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Learning?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students who have already revolutionized their study habits with Phoenixio
            </p>
            <button className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;