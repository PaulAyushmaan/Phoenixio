# Phoenixio - Automated Recap Video Generator for Smarter Learning

Phoenixio is an AI-powered educational platform that transforms lengthy lecture videos into concise, digestible highlights. It helps students catch up on missed lectures, efficiently review course material, and reinforce complex concepts in a fraction of the time.

## ❗ The Problem

Online learning platforms like PhysicsWallah, Unacademy, and others often deliver **2+ hour-long live classes** daily. But:

- 🧠 **Over 80% of students fall behind** due to illness, burnout, or lack of time.
- ⏳ Watching backlogged videos is mentally exhausting.
- 📉 Students lose track, stop revising, or eventually **drop out**.

## ✅ Our Solution

Phoenixio lets students:

- **Catch up in minutes** with auto-generated video highlights from missed lectures.
- **Revise faster** using only the essential parts of the class — problem solving, concepts, and teaching moments.
- **Stay consistent**, with personalized learning plans and highlight tracking.
  > It's not just a text summary. It's the actual video. Trimmed. Enhanced. Smart.

> 🎓 **Important Note**: Phoenixio is **not a replacement** for the original full-length lecture.  
> We deeply value the time, effort, and expertise educators invest in creating their content.  
> Our tool is designed to **support students**, not replace teaching — enabling them to stay on track without falling behind.

## 🔥 Project Overview

Phoenixio uses advanced AI to analyze lecture videos, identify key concepts, and generate highlights that capture essential content in just 10-15% of the original time. The platform is designed to help students stay ahead of their academic journey with minimal effort.

**Demo:** [Watch Demo Video](https://youtu.be/GYm5DH8XUAI?si=YAJ3ijdpguO0fXBT)

**Live Site:** [Phoenixio Live](https://phoenixio-ayushmaan-paus-projects.vercel.app/)

## 🚀 Key Features

| Feature                       | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| 🎥 **AI-Powered Highlights**  | Cuts down long lectures into short, topic-wise video segments automatically |
| 🧠 **Topic Segmentation**     | Identifies distinct sections using NLP, audio, and slide analysis           |
| ⚡ **Fast Processing**        | Get highlights in minutes with asynchronous ML pipelines                    |
| 🧾 **Smart Chitchat Removal** | Filters irrelevant banter, Q&A, and filler content                          |
| 📚 **PDF/PPT Support**        | Attach or extract slides for better comprehension                           |
| 📈 **Catch-Up Tracking**      | Visual dashboards showing student progress and missed content               |
| 🔐 **Private Video Delivery** | Signed URLs ensure only enrolled students can access content                |
| 🤝 **Collaborative Sharing**  | Students can share highlights with peers (if allowed by admin)              |

---

## 📊 Who It's For

- 🎓 Students missing live classes or struggling with revision
- 🧑‍🏫 Educators looking to improve content engagement and retention
- 🏢 EdTech platforms needing plug-and-play AI summarization

## 🏗️ Project Structure

The project is organized into four main components:

### 1. Frontend

A React-based web application built with Vite, Tailwind CSS, and Lucide React icons.

- **Tech Stack**: React, Vite, Tailwind CSS, Axios
- **Key Features**: User authentication, course browsing, lecture viewing, admin dashboard

### 2. Backend

A FastAPI-based RESTful API service that handles user authentication, course management, and lecture processing.

- **Tech Stack**: FastAPI, MongoDB (via MongoEngine), JWT authentication
- **Key Features**: User management, course CRUD operations, lecture upload and processing

### 3. ML (Machine Learning)

The AI engine that processes lecture videos, transcribes audio, segments topics, and generates highlights.

- **Tech Stack**: PyTorch, Transformers, OpenAI, MoviePy
- **Key Components**: Audio transcription, topic segmentation, LLM-based summarization

### 4. Celery Worker

A distributed task queue system that manages asynchronous processing of lecture videos.

- **Tech Stack**: Celery, Redis
- **Key Features**: Task queuing, worker management, job monitoring

### Repository Structure

```
├── ML/
│   ├── .gitignore
│   ├── LLMCaller/
│   │   ├── llm_call.py
│   │   └── prompt.py
│   ├── TopicSegmentation/
│   │   ├── __init__.py
│   │   └── topic_segmentation.py
│   ├── Transcription/
│   │   ├── __init__.py
│   │   ├── audio_splitter.py
│   │   ├── audio_transcriber.py
│   │   └── transcript_merger.py
│   ├── __init__.py
│   ├── config.py
│   ├── main.py
│   ├── pipeline.py
│   ├── processor/
│   │   └── processing.py
│   ├── requirements.txt
│   └── utility.py
├── backend/
│   ├── .flake8
│   ├── .gitignore
│   ├── dependencies/
│   │   ├── __init__.py
│   │   ├── configuration.py
│   │   ├── constants.py
│   │   ├── exceptions.py
│   │   ├── logger.py
│   │   ├── middleware_log.py
│   │   └── password_utils.py
│   ├── dto/
│   │   ├── __init__.py
│   │   ├── common_dto.py
│   │   ├── course_dto.py
│   │   ├── lecture_upload_dto.py
│   │   └── user_dto.py
│   ├── handlers/
│   │   ├── __init__.py
│   │   ├── auth_handlers.py
│   │   ├── course_handler.py
│   │   └── lecture_handler.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── course_model.py
│   │   ├── lecture_model.py
│   │   └── user_model.py
│   ├── repositories/
│   │   ├── __init__.py
│   │   ├── lecture_repository.py
│   │   └── user_repository.py
│   ├── requirements.txt
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── course_router.py
│   │   ├── lecture_router.py
│   │   └── user_router.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── cloudinary_service.py
│   │   └── email_service.py
│   └── templates/
│       └── emails/
├── celery_worker/
│   ├── .env
│   ├── celery-venv/
│   └── celery_app.py
├── frontend/
│   ├── .bolt/
│   │   ├── config.json
│   │   └── prompt
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── config.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── main.tsx
│   ├── tailwind.config.js
│   └── vite.config.ts
└── readme.md
```

## 🛠️ Setup and Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB
- Redis

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

### ML Setup

```bash
# Navigate to ML directory
cd ML

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the ML pipeline
python main.py
```

### Celery Worker Setup

```bash
# Navigate to celery_worker directory
cd celery_worker

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install celery redis

# Run the worker
celery -A celery_app worker -l info -Q meta,ml
```

## 📝 Usage

1. Register for an account or log in
2. Browse available courses or upload your own lecture videos
3. View AI-generated highlights of lectures
4. Track your learning progress
5. Share highlights with classmates

## 📄 License

Copyright (c) 2025 Phoenixio

This project is licensed under the Phoenixio Proprietary License - see the [LICENSE](LICENSE) file for details.

**Proprietary License** - A restrictive license that reserves all rights and keeps the software proprietary and confidential.

## 🚀 Tagline

> “**Catch Up Without Falling Behind.**”  
> AI-generated video highlights from real classes — not animations, not fake avatars.

**Phoenixio — Rise, Learn, Succeed.**
