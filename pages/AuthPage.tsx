
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { User } from '../types';

interface AuthPageProps {
  onLogin: (email: string, pass: string) => { success: boolean, error?: string };
  onSignup: (fullName: string, email: string, pass: string) => { success: boolean, error?: string };
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="bg-base-200 dark:bg-dark-bg text-base-content dark:text-dark-text-primary flex flex-col justify-center items-center h-screen p-4">
      <div className="flex items-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 5.293z" clipRule="evenodd" />
        </svg>
        <h1 className="text-3xl font-bold ml-3 tracking-wider">FinGenie</h1>
      </div>

      <div className="w-full max-w-md bg-base-100 dark:bg-dark-card rounded-2xl shadow-2xl p-8">
        {isLoginView ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <SignupForm onSignup={onSignup} />
        )}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-dark-text-secondary">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="font-medium text-brand-primary hover:text-teal-500 ml-1"
          >
            {isLoginView ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
       <div className="mt-8 text-center text-xs text-gray-500 dark:text-dark-text-secondary">
          <p>This is a simulated login for demonstration purposes.</p>
          <p>Data is stored in your browser's local storage and is not sent to a server.</p>
        </div>
    </div>
  );
};

export default AuthPage;
