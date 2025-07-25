import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductPreview from './components/ProductPreview';
import CoursesPreview from './components/CoursesPreview';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import DashboardApp from './components/dashboard/DashboardApp';
import PublicCourseBrowser from './components/PublicCourseBrowser';
import PublicCourseDetail from './components/PublicCourseDetail';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hash routing logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      setCurrentRoute(hash);
    };

    // Set initial route
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Navigation helpers
  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const handleBrowseCourses = () => {
    navigateTo('/courses');
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleRegister = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleCloseModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    handleCloseModals();
    navigateTo('/dashboard');
  };

  const handleSuccessfulRegister = () => {
    setIsLoggedIn(true);
    handleCloseModals();
    navigateTo('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('/');
  };

  const handleViewCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    navigateTo(`/course/${courseId}`);
  };

  const handleEnrollCourse = (courseId: string) => {
    if (!isLoggedIn) {
      // Store the course they want to enroll in
      setSelectedCourseId(courseId);
      handleLogin();
    } else {
      // Redirect to dashboard with enrollment
      navigateTo('/dashboard');
    }
  };

  // Route matching
  const isDashboardRoute = () => {
    return isLoggedIn && (currentRoute.startsWith('/dashboard') || 
           currentRoute.startsWith('/admin') || 
           currentRoute.startsWith('/student'));
  };

  const isCourseBrowserRoute = () => {
    return currentRoute === '/courses';
  };

  const isCourseDetailRoute = () => {
    return currentRoute.startsWith('/course/');
  };

  const getUserType = () => {
    if (currentRoute.startsWith('/admin')) return 'admin';
    if (currentRoute.startsWith('/student')) return 'student';
    return 'student'; // default
  };

  // Show modals based on route
  useEffect(() => {
    if (currentRoute === '/login') {
      setIsLoginModalOpen(true);
    } else if (currentRoute === '/register') {
      setIsRegisterModalOpen(true);
    } else {
      setIsLoginModalOpen(false);
      setIsRegisterModalOpen(false);
    }
  }, [currentRoute]);

  // Handle successful login when trying to enroll
  useEffect(() => {
    if (isLoggedIn && selectedCourseId && (isLoginModalOpen || isRegisterModalOpen)) {
      handleCloseModals();
      navigateTo('/dashboard');
    }
  }, [isLoggedIn, selectedCourseId, isLoginModalOpen, isRegisterModalOpen]);

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      <Navigation
        onLogin={handleLogin}
        onRegister={handleRegister}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navigateTo={navigateTo}
        onBrowseCourses={handleBrowseCourses}
      />
      
      <Hero onLogin={handleLogin} onRegister={handleRegister} />
      <ProductPreview />
      <CoursesPreview onBrowseCourses={handleBrowseCourses} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModals}
        onSwitchToRegister={handleRegister}
        onSuccessfulLogin={handleSuccessfulLogin}
      />
      
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseModals}
        onSwitchToLogin={handleLogin}
        onSuccessfulRegister={handleSuccessfulRegister}
      />
    </div>
  );

  // Course Browser Page
  const CourseBrowserPage = () => (
    <div className="min-h-screen bg-white">
      <Navigation
        onLogin={handleLogin}
        onRegister={handleRegister}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navigateTo={navigateTo}
        onBrowseCourses={handleBrowseCourses}
      />
      
      <PublicCourseBrowser
        onViewCourse={handleViewCourse}
        onLogin={handleLogin}
      />
      
      <Footer />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModals}
        onSwitchToRegister={handleRegister}
        onSuccessfulLogin={handleSuccessfulLogin}
      />
      
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseModals}
        onSwitchToLogin={handleLogin}
        onSuccessfulRegister={handleSuccessfulRegister}
      />
    </div>
  );

  // Course Detail Page
  const CourseDetailPage = () => (
    <div className="min-h-screen bg-white">
      <Navigation
        onLogin={handleLogin}
        onRegister={handleRegister}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navigateTo={navigateTo}
        onBrowseCourses={handleBrowseCourses}
      />
      
      <PublicCourseDetail
        courseId={selectedCourseId}
        onBack={() => navigateTo('/courses')}
        onEnroll={handleEnrollCourse}
        onLogin={handleLogin}
      />
      
      <Footer />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModals}
        onSwitchToRegister={handleRegister}
        onSuccessfulLogin={handleSuccessfulLogin}
      />
      
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseModals}
        onSwitchToLogin={handleLogin}
        onSuccessfulRegister={handleSuccessfulRegister}
      />
    </div>
  );

  // Extract course ID from route
  useEffect(() => {
    if (currentRoute.startsWith('/course/')) {
      const courseId = currentRoute.split('/course/')[1];
      setSelectedCourseId(courseId);
    }
  }, [currentRoute]);

  // Render based on current route
  if (isDashboardRoute()) {
    return (
      <DashboardApp 
        onLogout={handleLogout}
        defaultUserType={getUserType()}
        currentRoute={currentRoute}
        navigateTo={navigateTo}
      />
    );
  }

  if (isCourseBrowserRoute()) {
    return <CourseBrowserPage />;
  }

  if (isCourseDetailRoute()) {
    return <CourseDetailPage />;
  }

  return <LandingPage />;
}

export default App;