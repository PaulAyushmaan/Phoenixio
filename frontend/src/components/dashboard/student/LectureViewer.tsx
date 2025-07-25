import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface LectureViewerProps {
  lectureId: string | null;
  onBack: () => void;
}

const LectureViewer: React.FC<LectureViewerProps> = ({ lectureId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'highlights' | 'full'>('highlights');
  const [isCompleted, setIsCompleted] = useState(false);
  
  const lecture = {
    title: 'English for Competitive Exams',
    course: 'English 101',
    instructor: 'Subhangan Basu',
    description: 'Overview of nouns and verbs, their roles in sentences, and how to identify them in various contexts.',
    highlightsUrl: 'https://player.cloudinary.com/embed/?cloud_name=dtcnt1i4q&public_id=eng_01_1_iopjbc&profile=cld-default&muted=false&audio=true',
    fullUrl: 'https://pub-d912cb6cddf14414bd1bf9596d0b2a6d.r2.dev/eng_01_highlight_video.mp4',
    highlightsDuration: '56:23',
    fullDuration: '30:51',
    keyTopics: [
      { title: 'Nouns Fundamentals and Classification', timestamp: '0:45' },
      { title: 'Material and Abstract Nouns Overview', timestamp: '3:00' },
      { title: 'Collective Nouns and Their Properties', timestamp: '5:20' },
      { title: 'Noun-Verb Agreement and Context', timestamp: '7:00' },
      { title: 'Pronouns and Collective Nouns Interaction', timestamp: '10:00' },
      { title: 'Noun Types and Their Characteristics', timestamp: '12:00' }
    ],
    notes: [
      { timestamp: '0:45', content: "Nouns Fundamentals and Classification" },
      { timestamp: '3:00', content: "Material and Abstract Nouns Overview" },
      { timestamp: '5:20', content: "Collective Nouns and Their Properties" },
      { timestamp: '7:00', content: "Noun-Verb Agreement and Context" },
      { timestamp: '10:00', content: "Pronouns and Collective Nouns Interaction" },
      { timestamp: '12:00', content: "Noun Types and Their Characteristics" }
    ]
  };

  const currentVideoUrl = activeTab === 'highlights' ? lecture.highlightsUrl : lecture.fullUrl;
  const currentDuration = activeTab === 'highlights' ? lecture.highlightsDuration : lecture.fullDuration;

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
        
        {!isCompleted && (
          <button
            onClick={() => setIsCompleted(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200"
          >
            <CheckCircle className="h-5 w-5" />
            <span>Mark Complete</span>
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Video Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('highlights')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'highlights'
                      ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Full Lecture ({lecture.highlightsDuration})
                </button>
                <button
                  onClick={() => setActiveTab('full')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'full'
                      ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Highlights Video ({lecture.fullDuration})
                </button>
              </nav>
            </div>

            {/* Video Player */}
            <div className="aspect-video">
              {activeTab === 'highlights' ? (
                <iframe
                  src={lecture.highlightsUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Lecture Video Player"
                ></iframe>
              ) : (
                <video
                  src={lecture.fullUrl}
                  className="w-full h-full object-cover"
                  controls
                  title="Lecture Video Player"
                />
              )}
            </div>
          </div>

          {/* Lecture Description */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About This Lecture</h2>
            <p className="text-gray-700 leading-relaxed">{lecture.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Topics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Key Topics</h3>
            <div className="space-y-3">
              {lecture.keyTopics.map((topic, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{topic.title}</span>
                    {/* <span className="text-sm text-gray-500">{topic.timestamp}</span> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Lecture Notes</h3>
            <div className="space-y-4">
              {lecture.notes.map((note, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm text-gray-500">{note.timestamp}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{note.content}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Completion Status */}
          {isCompleted && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle className="h-6 w-6" />
                <h3 className="text-lg font-bold">Completed!</h3>
              </div>
              <p className="text-green-100">Great job! You've completed this lecture.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LectureViewer;