
import React, { useState } from 'react';

interface SignupFormProps {
    onSignup: (fullName: string, email: string, pass: string) => { success: boolean, error?: string };
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = onSignup(fullName, email, password);
    if (!result.success) {
      setError(result.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-6">Create Your Account</h2>
      {error && <div className="bg-red-100 dark:bg-red-900/40 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="email_signup" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Email Address</label>
          <input
            type="email"
            id="email_signup"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="password_signup" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Password</label>
          <input
            type="password"
            id="password_signup"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            required
          />
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
