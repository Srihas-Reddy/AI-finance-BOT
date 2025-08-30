
import React from 'react';
import { Message, AppState, Transaction } from '../types';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import LoadingIndicator from '../components/LoadingIndicator';
import SuggestionChips from '../components/SuggestionChips';

interface PageProps {
  messages: Message[];
  appState: AppState;
  error: string | null;
  onSendMessage: (text: string) => void;
  onSuggestionClick: (suggestion: string) => void;
  transactions: Transaction[];
}

const suggestions = [
  "Which month had the highest expenses?",
  "Show me my income trend over the last year.",
  "What's my average weekly spending?",
  "Compare my income vs. expenses for this year."
];

const AnalyticsPage: React.FC<PageProps> = (props) => {
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-1 overflow-y-auto">
        {props.messages.length === 0 ? (
          <SuggestionChips 
            title="Analytics Hub"
            subtitle="Ask me anything about your financial trends and spending habits."
            suggestions={suggestions}
            onSuggestionClick={props.onSuggestionClick}
          />
        ) : (
          <MessageList messages={props.messages} />
        )}
        {props.appState === AppState.Loading && <div className="p-4 md:p-6 lg:p-8"><LoadingIndicator /></div>}
      </div>
      <ChatInput onSendMessage={props.onSendMessage} appState={props.appState} error={props.error} />
    </div>
  );
};

export default AnalyticsPage;