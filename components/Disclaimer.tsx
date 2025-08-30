import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <footer className="bg-base-100 dark:bg-dark-card p-3 text-center border-t border-base-300 dark:border-dark-border shadow-inner">
      <p className="text-xs text-gray-500 dark:text-dark-text-secondary">
        FinGenie is an AI-powered educational tool. The information provided is not financial advice.
        Always consult with a qualified professional before making financial decisions.
      </p>
    </footer>
  );
};

export default Disclaimer;