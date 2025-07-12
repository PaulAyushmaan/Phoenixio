import React from 'react';
import { Clock, Brain, Target, Zap, Users, Trophy } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: "Catch up in minutes",
      description: "Transform hours of content into digestible highlights that capture all the essential concepts.",
      iconGradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: Brain,
      title: "AI-powered insights",
      description: "Our smart algorithm identifies the most important moments and key learning objectives.",
      iconGradient: "from-purple-500 to-pink-400"
    },
    {
      icon: Target,
      title: "Stay ahead of your class",
      description: "Never fall behind again with personalized catch-up plans tailored to your learning pace.",
      iconGradient: "from-green-500 to-emerald-400"
    },
    {
      icon: Zap,
      title: "Instant processing",
      description: "Upload your lecture and get highlights in seconds, not hours. Learning at the speed of light.",
      iconGradient: "from-yellow-500 to-orange-400"
    },
    {
      icon: Users,
      title: "Collaborative learning",
      description: "Share highlights with classmates and learn together with our social study features.",
      iconGradient: "from-indigo-500 to-blue-400"
    },
    {
      icon: Trophy,
      title: "Track your progress",
      description: "Monitor your learning journey with detailed analytics and achievement milestones.",
      iconGradient: "from-amber-500 to-yellow-400"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Students{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              Love
            </span>{' '}
            Phoenixio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful features that make catching up effortless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.iconGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-500 mb-2">95%</div>
                <div className="text-gray-600">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary-300 mb-2">10K+</div>
                <div className="text-gray-600">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-500 mb-2">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;