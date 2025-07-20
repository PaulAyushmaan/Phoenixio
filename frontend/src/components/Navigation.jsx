import React from 'react';
import { Flame, Menu, X } from 'lucide-react';

import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Navigation = ({
  onLogin,
  onRegister,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  navigateTo,
  onBrowseCourses,
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const handleLoginClick = () => {
    navigateTo('/login');
    onLogin();
  };

  const handleRegisterClick = () => {
    navigateTo('/register');
    onRegister();
  };

  const handleLogoClick = () => {
    navigateTo('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center space-x-2">
            <Flame className="h-8 w-8 text-primary-500" />
            <span className="text-2xl font-bold text-gray-900">Phoenixio</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={onBrowseCourses}
              className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              Browse Courses
            </button>
            <a href="#features" className="text-gray-700 hover:text-primary-500 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-primary-500 transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary-500 transition-colors">
              Reviews
            </a>
            {isLoggedIn ? (
              <button
                onClick={() => navigateTo('/student')}
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full hover:from-primary-600 hover:to-accent-600 transition-all duration-200 transform hover:scale-105"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full hover:from-primary-600 hover:to-accent-600 transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={onBrowseCourses}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500 font-medium"
              >
                Browse Courses
              </button>
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-primary-500">
                Features
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-primary-500">
                How It Works
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-primary-500">
                Reviews
              </a>
              {isLoggedIn ? (
                <button
                  onClick={() => navigateTo('/student')}
                  className="block w-full mt-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full hover:from-primary-600 hover:to-accent-600 transition-all duration-200"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleRegisterClick}
                    className="block w-full mt-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full hover:from-primary-600 hover:to-accent-600 transition-all duration-200"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;