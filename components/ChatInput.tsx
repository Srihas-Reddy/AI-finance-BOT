import React, { useState } from 'react';
import { AppState } from '../types';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  appState: AppState;
  error: string | null;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, appState, error }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && appState !== AppState.Loading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 pt-2">
      {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex items-center bg-base-100 dark:bg-dark-card border border-base-300 dark:border-dark-border rounded-full p-2 shadow-lg">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask FinGenie anything..."
          className="flex-1 bg-transparent text-base-content dark:text-dark-text-primary placeholder-gray-400 dark:placeholder-dark-text-secondary border-none focus:ring-0 px-4 py-2"
          disabled={appState === AppState.Loading}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || appState === AppState.Loading}
          className="bg-brand-primary text-white rounded-full p-3 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 dark:focus:ring-offset-dark-card focus:ring-brand-primary disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;