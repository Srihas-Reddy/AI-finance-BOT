import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-base-200 dark:bg-dark-card text-base-content dark:text-dark-text-primary self-start rounded-bl-none max-w-xl lg:max-w-2xl rounded-2xl p-4 shadow-md flex items-center space-x-2">
        <div className="w-2 h-2 bg-gray-500 dark:bg-dark-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-gray-500 dark:bg-dark-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-500 dark:bg-dark-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;