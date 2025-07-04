import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Pre-Med Student",
      university: "Stanford University",
      rating: 5,
      text: "I caught up on 2 weeks of biochemistry classes in a single evening! Phoenixio saved my semester.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Computer Science Major",
      university: "MIT",
      rating: 5,
      text: "The AI highlights are incredibly accurate. It's like having a personal tutor that never sleeps.",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Engineering Student",
      university: "UC Berkeley",
      rating: 5,
      text: "From failing to A's in one semester. Phoenixio literally changed my academic life forever.",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 4,
      name: "David Kim",
      role: "MBA Student",
      university: "Harvard Business School",
      rating: 5,
      text: "As a working professional, Phoenixio helps me stay on top of my studies without sacrificing my career.",
      avatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 5,
      name: "Maya Patel",
      role: "Medical Student",
      university: "Johns Hopkins",
      rating: 5,
      text: "The collaborative features helped our entire study group improve. We all passed our boards!",
      avatar: "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-secondary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who transformed their academic journey with Phoenixio
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentSlide].avatar}
                  alt={testimonials[currentSlide].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary-200"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <Quote className="h-8 w-8 text-primary-500 mr-2" />
                  <div className="flex space-x-1">
                    {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-700 font-medium mb-6 leading-relaxed">
                  "{testimonials[currentSlide].text}"
                </blockquote>
                
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {testimonials[currentSlide].name}
                  </div>
                  <div className="text-primary-600 font-semibold">
                    {testimonials[currentSlide].role}
                  </div>
                  <div className="text-gray-500">
                    {testimonials[currentSlide].university}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:bg-primary-50 group"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-primary-600" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:bg-primary-50 group"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-primary-600" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="text-4xl font-bold text-primary-500 mb-2">98%</div>
            <div className="text-gray-600">Student Satisfaction</div>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="text-4xl font-bold text-secondary-300 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="text-4xl font-bold text-accent-500 mb-2">10K+</div>
            <div className="text-gray-600">Success Stories</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;