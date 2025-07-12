import React, { useState } from 'react';
import { Upload, X, Plus, Save, Eye, Video, FileText, Image, Link } from 'lucide-react';

const CreateCourse: React.FC = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: '',
    language: 'English',
    price: '',
    originalPrice: '',
    duration: '',
    prerequisites: [''],
    learningOutcomes: [''],
    tags: '',
    status: 'draft'
  });

  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [courseVideo, setCourseVideo] = useState<File | null>(null);
  const [curriculum, setCurriculum] = useState([
    {
      id: 1,
      title: '',
      description: '',
      lectures: [
        {
          id: 1,
          title: '',
          type: 'video',
          duration: '',
          content: null as File | null,
          description: '',
          resources: [] as File[]
        }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState<'basic' | 'curriculum' | 'pricing' | 'preview'>('basic');
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Engineering', 'Business', 'Arts', 'Languages', 'Medicine'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: 'prerequisites' | 'learningOutcomes', index: number, value: string) => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'prerequisites' | 'learningOutcomes') => {
    setCourseData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field: 'prerequisites' | 'learningOutcomes', index: number) => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addSection = () => {
    setCurriculum(prev => [
      ...prev,
      {
        id: Date.now(),
        title: '',
        description: '',
        lectures: [
          {
            id: Date.now(),
            title: '',
            type: 'video',
            duration: '',
            content: null,
            description: '',
            resources: []
          }
        ]
      }
    ]);
  };

  const addLecture = (sectionIndex: number) => {
    setCurriculum(prev => prev.map((section, index) => 
      index === sectionIndex 
        ? {
            ...section,
            lectures: [
              ...section.lectures,
              {
                id: Date.now(),
                title: '',
                type: 'video',
                duration: '',
                content: null,
                description: '',
                resources: []
              }
            ]
          }
        : section
    ));
  };

  const updateSection = (sectionIndex: number, field: string, value: string) => {
    setCurriculum(prev => prev.map((section, index) => 
      index === sectionIndex ? { ...section, [field]: value } : section
    ));
  };

  const updateLecture = (sectionIndex: number, lectureIndex: number, field: string, value: any) => {
    setCurriculum(prev => prev.map((section, sIndex) => 
      sIndex === sectionIndex 
        ? {
            ...section,
            lectures: section.lectures.map((lecture, lIndex) => 
              lIndex === lectureIndex ? { ...lecture, [field]: value } : lecture
            )
          }
        : section
    ));
  };

  const handleFileUpload = (file: File, type: 'image' | 'video') => {
    if (type === 'image') {
      setCourseImage(file);
    } else {
      setCourseVideo(file);
    }
  };

  const handleSaveDraft = () => {
    setIsUploading(true);
    // Simulate save
    setTimeout(() => {
      setIsUploading(false);
      alert('Course saved as draft!');
    }, 1000);
  };

  const handlePublishCourse = () => {
    setIsUploading(true);
    // Simulate publish
    setTimeout(() => {
      setIsUploading(false);
      alert('Course published successfully!');
    }, 2000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
        <p className="text-gray-600">Build and publish your course with comprehensive content management.</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { id: 'basic', label: 'Basic Info', icon: FileText },
              { id: 'curriculum', label: 'Curriculum', icon: Video },
              { id: 'pricing', label: 'Pricing', icon: Plus },
              { id: 'preview', label: 'Preview', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Course Details */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      value={courseData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Complete Python Programming Course"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Subtitle
                    </label>
                    <input
                      type="text"
                      value={courseData.subtitle}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief description of what students will learn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Description *
                    </label>
                    <textarea
                      value={courseData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Detailed description of the course content, objectives, and target audience..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={courseData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty Level *
                      </label>
                      <select
                        value={courseData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select Level</option>
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={courseData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="python, programming, web development, beginner"
                    />
                  </div>
                </div>

                {/* Media Upload */}
                <div className="space-y-6">
                  {/* Course Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Thumbnail *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors">
                      {courseImage ? (
                        <div className="space-y-4">
                          <img
                            src={URL.createObjectURL(courseImage)}
                            alt="Course thumbnail"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => setCourseImage(null)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Upload course thumbnail</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'image')}
                            className="hidden"
                            id="course-image"
                          />
                          <label
                            htmlFor="course-image"
                            className="bg-primary-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
                          >
                            Choose Image
                          </label>
                          <p className="text-xs text-gray-500 mt-2">Recommended: 1280x720px, JPG/PNG</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Course Preview Video */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Preview Video
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors">
                      {courseVideo ? (
                        <div className="space-y-4">
                          <video
                            src={URL.createObjectURL(courseVideo)}
                            className="w-full h-48 object-cover rounded-lg"
                            controls
                          />
                          <button
                            onClick={() => setCourseVideo(null)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove Video
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Upload preview video</p>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'video')}
                            className="hidden"
                            id="course-video"
                          />
                          <label
                            htmlFor="course-video"
                            className="bg-primary-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
                          >
                            Choose Video
                          </label>
                          <p className="text-xs text-gray-500 mt-2">Max 100MB, MP4 format recommended</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prerequisites
                </label>
                <div className="space-y-2">
                  {courseData.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={prereq}
                        onChange={(e) => handleArrayFieldChange('prerequisites', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., Basic understanding of programming concepts"
                      />
                      {courseData.prerequisites.length > 1 && (
                        <button
                          onClick={() => removeArrayField('prerequisites', index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayField('prerequisites')}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Prerequisite</span>
                  </button>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Outcomes *
                </label>
                <div className="space-y-2">
                  {courseData.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={outcome}
                        onChange={(e) => handleArrayFieldChange('learningOutcomes', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., Build web applications using Python and Django"
                      />
                      {courseData.learningOutcomes.length > 1 && (
                        <button
                          onClick={() => removeArrayField('learningOutcomes', index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayField('learningOutcomes')}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Learning Outcome</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Course Curriculum</h2>
                <button
                  onClick={addSection}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Section</span>
                </button>
              </div>

              {curriculum.map((section, sectionIndex) => (
                <div key={section.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="mb-4">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-semibold"
                      placeholder="Section Title (e.g., Introduction to Python)"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      value={section.description}
                      onChange={(e) => updateSection(sectionIndex, 'description', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      rows={2}
                      placeholder="Section description..."
                    />
                  </div>

                  <div className="space-y-4">
                    {section.lectures.map((lecture, lectureIndex) => (
                      <div key={lecture.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <input
                            type="text"
                            value={lecture.title}
                            onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'title', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Lecture title"
                          />
                          <input
                            type="text"
                            value={lecture.duration}
                            onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'duration', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Duration (e.g., 15 min)"
                          />
                        </div>
                        <textarea
                          value={lecture.description}
                          onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none mb-3"
                          rows={2}
                          placeholder="Lecture description..."
                        />
                        <div className="flex items-center space-x-4">
                          <select
                            value={lecture.type}
                            onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'type', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="video">Video</option>
                            <option value="text">Text</option>
                            <option value="quiz">Quiz</option>
                            <option value="assignment">Assignment</option>
                          </select>
                          <input
                            type="file"
                            accept={lecture.type === 'video' ? 'video/*' : '*'}
                            onChange={(e) => e.target.files?.[0] && updateLecture(sectionIndex, lectureIndex, 'content', e.target.files[0])}
                            className="hidden"
                            id={`lecture-${section.id}-${lecture.id}`}
                          />
                          <label
                            htmlFor={`lecture-${section.id}-${lecture.id}`}
                            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors text-sm"
                          >
                            Upload Content
                          </label>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => addLecture(sectionIndex)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Lecture</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Course Pricing</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Price ($) *
                  </label>
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    value={courseData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="149"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty if no discount</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Duration
                </label>
                <input
                  type="text"
                  value={courseData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 40 hours, 6 weeks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Status
                </label>
                <select
                  value={courseData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Course Preview</h2>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    {courseImage && (
                      <img
                        src={URL.createObjectURL(courseImage)}
                        alt="Course preview"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{courseData.title || 'Course Title'}</h3>
                    <p className="text-gray-600 mb-4">{courseData.subtitle || 'Course subtitle will appear here'}</p>
                    <p className="text-gray-700">{courseData.description || 'Course description will appear here'}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ${courseData.price || '0'}
                      {courseData.originalPrice && (
                        <span className="text-lg text-gray-500 line-through ml-2">
                          ${courseData.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Category: {courseData.category || 'Not specified'}</div>
                      <div>Level: {courseData.level || 'Not specified'}</div>
                      <div>Duration: {courseData.duration || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSaveDraft}
          disabled={isUploading}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {isUploading ? 'Saving...' : 'Save Draft'}
        </button>
        <button
          onClick={handlePublishCourse}
          disabled={isUploading}
          className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>{isUploading ? 'Publishing...' : 'Publish Course'}</span>
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;