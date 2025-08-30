
import React, { useState } from 'react';
import { Message, AppState, Goal } from '../types';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import LoadingIndicator from '../components/LoadingIndicator';
import SuggestionChips from '../components/SuggestionChips';
import GoalCard from '../components/GoalCard';
import AddGoalModal from '../components/AddGoalModal';

interface PageProps {
  messages: Message[];
  appState: AppState;
  error: string | null;
  onSendMessage: (text: string) => void;
  onSuggestionClick: (suggestion: string) => void;
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onDeleteGoal: (id: string) => void;
}

const suggestions = [
  "How can I reach my 'Dream Vacation' goal faster?",
  "How much to invest monthly for ₹1 Crore in 20 years at 8% return?",
  "Am I on track for my emergency fund?",
  "Suggest a strategy to reach my retirement goal 3 years sooner."
];

const GoalsPage: React.FC<PageProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 h-full">
        {/* Left Column: Goals List */}
        <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Goals</h2>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Goal
                </button>
            </div>
            {props.goals.length > 0 ? (
                <div className="space-y-6">
                    {props.goals.map(goal => (
                        <GoalCard key={goal.id} goal={goal} onDelete={props.onDeleteGoal} />
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center bg-base-100 dark:bg-dark-card rounded-lg p-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    <h3 className="text-xl font-semibold">No goals yet</h3>
                    <p className="text-gray-500 dark:text-dark-text-secondary mt-1">Click "Add Goal" to get started.</p>
                </div>
            )}
        </div>

        {/* Right Column: Chat Section */}
        <div className="w-full lg:w-2/5 xl:w-1/3 flex flex-col bg-base-100 dark:bg-dark-card border-l border-base-300 dark:border-dark-border">
          <div className="flex-1 flex flex-col overflow-y-auto">
            {props.messages.length === 0 ? (
              <SuggestionChips 
                title="Goals Assistant"
                subtitle="Set, track, and forecast your financial goals."
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
      </div>
      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={props.onAddGoal}
      />
    </>
  );
};

export default GoalsPage;
