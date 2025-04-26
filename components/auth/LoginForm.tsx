import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Button from '../common/Button';
import SocialLogin from './SocialLogin';
import useAuthStore from '../../store/authStore';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      
      // Check for redirect in query params
      const searchParams = new URLSearchParams(location.search);
      const redirect = searchParams.get('redirect');
      
      if (redirect === 'pending-booking') {
        navigate('/booking/confirmation');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // For demo purposes, provide quick login buttons
  const handleQuickLogin = async (role: string) => {
    let demoEmail = '';
    let demoPassword = 'password123'; // Not used in mock implementation
    
    switch (role) {
      case 'customer':
        demoEmail = 'john@example.com';
        break;
      case 'restaurant':
        demoEmail = 'manager@italianplace.com';
        break;
      case 'admin':
        demoEmail = 'admin@dinereserve.com';
        break;
    }
    
    try {
      await login(demoEmail, demoPassword);
      navigate('/');
    } catch (error) {
      console.error('Quick login error:', error);
    }
  };

  const handleSocialLoginSuccess = () => {
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect');
    
    if (redirect === 'pending-booking') {
      navigate('/booking/confirmation');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="glass-card p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>
      
      <SocialLogin onSuccess={handleSocialLoginSuccess} />
      
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-neutral-400 bg-neutral-900">Or continue with email</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your email"
              required
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your password"
              required
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-700 rounded bg-neutral-800"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-300">
              Remember me
            </label>
          </div>
          
          <a href="#" className="text-sm font-medium text-primary-400 hover:text-primary-300">
            Forgot password?
          </a>
        </div>
        
        {error && (
          <div className="text-sm text-error-400 bg-error-900/50 p-3 rounded-lg border border-error-700">
            {error}
          </div>
        )}
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          className="py-3"
        >
          Sign In
        </Button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-neutral-400 bg-neutral-900">Or use demo accounts</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin('customer')}
          >
            Customer
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin('restaurant')}
          >
            Restaurant
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin('admin')}
          >
            Admin
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-400">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-primary-400 hover:text-primary-300">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;