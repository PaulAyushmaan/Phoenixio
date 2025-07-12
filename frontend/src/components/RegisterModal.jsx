import React, { useState } from 'react';
import axios from 'axios';
import { X, Mail, Lock, User, Eye, EyeOff, Phone } from 'lucide-react';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onSuccessfulRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone_number: formData.phone_number,
      role: 'user',
      is_active: true
    };

    try {
      const response = await axios.post(
        'https://603a4dd0fcef.ngrok-free.app/dashboard/api/v1/auth/register',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Registration success:', response.data);
      onSuccessfulRegister();

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_number: ''
      });
    } catch (error) {
      if (error.response) {
        const msg = error.response.data.detail?.[0]?.msg || 'Registration failed.';
        setErrors({ api: msg });
      } else {
        setErrors({ api: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Phoenixio</h2>
          <p className="text-gray-600">Start your learning transformation today</p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="John"
                  disabled={isLoading}
                />
              </div>
              {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Doe"
                  disabled={isLoading}
                />
              </div>
              {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="john@example.com"
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="9876543210"
                disabled={isLoading}
              />
            </div>
            {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="password123"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="password123"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {errors.api && <p className="text-sm text-red-600 text-center">{errors.api}</p>}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="rounded text-primary-500 focus:ring-primary-500"
              required
              disabled={isLoading}
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-primary-500 hover:text-primary-600">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-500 hover:text-primary-600">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-primary-500 hover:text-primary-600 font-semibold"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
