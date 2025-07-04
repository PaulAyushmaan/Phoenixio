import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Volume2, Settings, Maximize, Clock, CheckCircle } from 'lucide-react';

interface LectureViewerProps {
  lectureId: string | null;
  onBack: () => void;
}

const LectureViewer: React.FC<LectureViewerProps> = ({ lectureId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'highlights' | 'full'>('highlights');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock lecture data
  const lecture = {
    id: lectureId,
    title: 'Introduction to Classical Mechanics',
    course: 'Physics 101',
    instructor: 'Dr. Sarah Johnson',
    description: 'Overview of Newton\'s laws and basic principles of motion',
    fullDuration: 2700, // 45 minutes in seconds
    highlightsDuration: 480, // 8 minutes in seconds
    keyTopics: [
      { title: 'Newton\'s First Law', timestamp: 45 },
      { title: 'Newton\'s Second Law', timestamp: 180 },
      { title: 'Newton\'s Third Law', timestamp: 320 },
      { title: 'Applications and Examples', timestamp: 420 }
    ],
    notes: [
      { timestamp: 45, content: 'Objects at rest stay at rest unless acted upon by a force' },
      { timestamp: 180, content: 'F = ma - Force equals mass times acceleration' },
      { timestamp: 320, content: 'For every action, there is an equal and opposite reaction' }
    ]
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  const currentDuration = activeTab === 'highlights' ? lecture.highlightsDuration : lecture.fullDuration;
  const progress = (currentTime / currentDuration) * 100;

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
            onClick={handleMarkComplete}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200"
          >
            <CheckCircle className="h-5 w-5" />
            <span>Mark Complete</span>
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-3">
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
                  AI Highlights ({formatTime(lecture.highlightsDuration)})
                </button>
                <button
                  onClick={() => setActiveTab('full')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'full'
                      ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Full Lecture ({formatTime(lecture.fullDuration)})
                </button>
              </nav>
            </div>

            {/* Video Player */}
            <div className="relative">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {isPlaying ? (
                      <Pause className="h-10 w-10" />
                    ) : (
                      <Play className="h-10 w-10 ml-1" />
                    )}
                  </div>
                  <p className="text-lg font-semibold mb-2">
                    {activeTab === 'highlights' ? 'AI-Generated Highlights' : 'Full Lecture'}
                  </p>
                  <p className="text-gray-300">
                    Duration: {formatTime(currentDuration)}
                  </p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/20 rounded-full h-1 cursor-pointer">
                    <div
                      className="bg-primary-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePlayPause}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 text-white" />
                      ) : (
                        <Play className="h-5 w-5 text-white ml-0.5" />
                      )}
                    </button>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-5 w-5 text-white" />
                      <div className="w-20 bg-white/20 rounded-full h-1">
                        <div className="bg-white h-1 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(currentDuration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Settings className="h-4 w-4 text-white" />
                    </button>
                    <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Maximize className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lecture Description */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
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
                <button
                  key={index}
                  onClick={() => setCurrentTime(topic.timestamp)}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{topic.title}</span>
                    <span className="text-sm text-gray-500">{formatTime(topic.timestamp)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Lecture Notes</h3>
            <div className="space-y-4">
              {lecture.notes.map((note, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{formatTime(note.timestamp)}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{note.content}</p>
                </div>
              ))}
            </div>
          </div>

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