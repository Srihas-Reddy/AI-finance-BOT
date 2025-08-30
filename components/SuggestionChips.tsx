import React from 'react';

interface SuggestionChipsProps {
  title: string;
  subtitle: string;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ title, subtitle, suggestions, onSuggestionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-base-content dark:text-dark-text-primary">{title}</h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-dark-text-secondary">
          {subtitle}
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => onSuggestionClick(s)} 
              className="bg-base-100 dark:bg-dark-card border border-base-300 dark:border-dark-border p-4 rounded-lg text-left hover:bg-base-200 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={`Ask: ${s}`}
            >
                <p className="font-medium text-base-content dark:text-dark-text-primary">{s}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionChips;