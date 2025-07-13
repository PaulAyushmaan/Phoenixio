import API_BASE_URL from '../../../config';
import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileVideo, X, CheckCircle } from 'lucide-react';

const UploadLecture = () => {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    subject: '',
    tags: '',
    description: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [pptFile, setPptFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileSelect = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'video') {
        setVideoFile(e.target.files[0]);
      } else if (type === 'ppt') {
        setPptFile(e.target.files[0]);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const uploadLecture = async () => {
    setIsUploading(true);
    setUploadError('');
    try {
      // Build query parameters from metadata
      const params = new URLSearchParams();
      params.append('lecture_title', formData.title);
      params.append('course_name', formData.course);
      if (formData.subject) params.append('subject', formData.subject);
      if (formData.description) params.append('description', formData.description);

      // Only files in FormData
      const data = new FormData();
      data.append('file', videoFile);
      data.append('ppt_file', pptFile);

      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        `${API_BASE_URL}/dashboard/api/v1/lectures/upload?${params.toString()}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token ? `Bearer ${token}` : '',
            'accept': 'application/json',
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          }
        }
      );

      setIsUploading(false);
      setUploadComplete(true);
      console.log('Upload success:', response.data);
    } catch (error) {
      setIsUploading(false);
      setUploadError(error?.response?.data?.detail || 'Upload failed. Please try again.');
      console.error('Upload error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoFile && pptFile && formData.title && formData.course) {
      uploadLecture();
    } else {
      setUploadError('Please fill all required fields and upload both files.');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', course: '', subject: '', tags: '', description: '' });
    setVideoFile(null);
    setPptFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
    setUploadError('');
  };

  if (uploadComplete) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Successful! 🎉</h2>
            <p className="text-gray-600 mb-6">
              Your lecture "{formData.title}" has been uploaded successfully.
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={resetForm}
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200"
              >
                Upload Another
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                View All Lectures
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload New Lecture</h1>
        <p className="text-gray-600">Upload a video and PPT for your lecture.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Video File *</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? 'border-primary-500 bg-primary-50'
                  : videoFile
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileSelect(e, 'video')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {videoFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <FileVideo className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{videoFile.name}</p>
                  <button
                    type="button"
                    onClick={() => setVideoFile(null)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-gray-500">Drop your video file here or click to browse</p>
                  <p className="text-sm text-gray-400">MP4, MOV, AVI up to 2GB</p>
                </div>
              )}
            </div>
          </div>

          {/* PPT Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">PPT File *</label>
            <input
              type="file"
              accept=".ppt,.pptx,.pdf"
              onChange={(e) => handleFileSelect(e, 'ppt')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
            {pptFile && (
              <div className="mt-2 text-sm text-green-700 font-medium">
                {pptFile.name} ({(pptFile.size / (1024 * 1024)).toFixed(2)} MB)
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lecture Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="e.g., Introduction to Algorithms"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Name *</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="e.g., Computer Science 202"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
              rows="3"
              placeholder="Brief description of the lecture"
            />
          </div>
        </div>

        {uploadError && <div className="text-red-600 text-sm mt-2">{uploadError}</div>}

        {/* Progress Bar */}
        {isUploading && (
          <div className="mt-4">
            <div className="text-sm text-gray-700 mb-1">Uploading: {uploadProgress}%</div>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-primary-500 rounded"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!videoFile || !pptFile || isUploading}
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Lecture'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadLecture;