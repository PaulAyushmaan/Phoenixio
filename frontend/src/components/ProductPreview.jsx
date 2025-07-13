import React from 'react';
import { Play, Clock, Users, TrendingUp } from 'lucide-react';

const ProductPreview = () => {
  const sampleLectures = [
    {
      id: 1,
      title: "Calculus III - Vector Fields",
      subject: "Mathematics",
      originalDuration: "2h 45min",
      highlightDuration: "12min",
      thumbnail: "https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Gradient vectors", "Divergence theorem", "Stokes' theorem"],
      students: 1234,
      rating: 4.8
    },
    {
      id: 2,
      title: "Organic Chemistry - Reaction Mechanisms",
      subject: "Chemistry",
      originalDuration: "3h 15min",
      highlightDuration: "15min",
      thumbnail: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["SN1 vs SN2 reactions", "Carbocation stability", "Stereochemistry"],
      students: 892,
      rating: 4.9
    },
    {
      id: 3,
      title: "Data Structures - Binary Trees",
      subject: "Computer Science",
      originalDuration: "2h 30min",
      highlightDuration: "10min",
      thumbnail: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Tree traversal algorithms", "Balancing techniques", "Time complexity"],
      students: 2156,
      rating: 4.7
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See Phoenixio in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how students are turning hours of missed lectures into minutes of focused learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleLectures.map((lecture, index) => (
            <div
              key={lecture.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={lecture.thumbnail}
                  alt={lecture.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-semibold text-gray-900">{lecture.subject}</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-semibold text-white flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {lecture.originalDuration} → {lecture.highlightDuration}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {lecture.title}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{lecture.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{lecture.rating}/5.0</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Key Highlights:</p>
                    <ul className="space-y-1">
                      {lecture.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 flex-shrink-0"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Highlights</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-primary-300 shadow-lg">
            Browse All Lectures
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;