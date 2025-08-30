
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, pass: string) => { success: boolean, error?: string };
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const result = onLogin(email, password);
    if (!result.success) {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-6">Welcome Back!</h2>
      {error && <div className="bg-red-100 dark:bg-red-900/40 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="password_login" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Password</label>
          <input
            type="password"
            id="password_login"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            required
          />
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 dark:border-gray-600 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <div className="text-sm">
                <a href="#" className="font-medium text-brand-primary hover:text-teal-500">Forgot your password?</a>
            </div>
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
