import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductPreview from './components/ProductPreview';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import DashboardApp from './components/dashboard/DashboardApp';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');

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
    handleCloseModals();
    navigateTo('/dashboard');
  };

  const handleSuccessfulRegister = () => {
    handleCloseModals();
    navigateTo('/dashboard');
  };

  const handleLogout = () => {
    navigateTo('/');
  };

  // Route matching
  const isDashboardRoute = () => {
    return currentRoute.startsWith('/dashboard') || 
           currentRoute.startsWith('/admin') || 
           currentRoute.startsWith('/student');
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

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      <Navigation
        onLogin={handleLogin}
        onRegister={handleRegister}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navigateTo={navigateTo}
      />
      
      <Hero onLogin={handleLogin} onRegister={handleRegister} />
      <ProductPreview />
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

  return <LandingPage />;
}

export default App;