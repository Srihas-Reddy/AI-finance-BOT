
import React from 'react';
import { Message, AppState } from '../types';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import LoadingIndicator from '../components/LoadingIndicator';
import SuggestionChips from '../components/SuggestionChips';
import MarketSummary from '../components/MarketSummary';

interface PageProps {
  messages: Message[];
  appState: AppState;
  error: string | null;
  onSendMessage: (text: string) => void;
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  "Compare TSLA, AAPL, and NVDA stocks this week.",
  "Explain what an ETF is like I'm a beginner.",
  "What are the market drivers for the tech sector?",
  "Show me portfolio diversification insights for a high-risk profile."
];

const InvestPage: React.FC<PageProps> = (props) => {
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-1 overflow-y-auto">
        {props.messages.length === 0 ? (
          <div className="p-4 md:p-6 lg:p-8">
            <MarketSummary />
            <div className="mt-8">
                <SuggestionChips 
                    title="Investment Hub"
                    subtitle="Get market data, compare assets, and explore portfolio strategies."
                    suggestions={suggestions}
                    onSuggestionClick={props.onSuggestionClick}
                />
            </div>
          </div>
        ) : (
          <MessageList messages={props.messages} />
        )}
        {props.appState === AppState.Loading && <div className="p-4 md:p-6 lg:p-8"><LoadingIndicator /></div>}
      </div>
      <ChatInput onSendMessage={props.onSendMessage} appState={props.appState} error={props.error} />
    </div>
  );
};

export default InvestPage;
