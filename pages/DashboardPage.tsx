
import React, { useState } from 'react';
import { Message, AppState, Transaction } from '../types';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import LoadingIndicator from '../components/LoadingIndicator';
import SuggestionChips from '../components/SuggestionChips';
import SummaryCard from '../components/SummaryCard';
import TransactionsTable from '../components/TransactionsTable';
import AddTransactionModal from '../components/AddTransactionModal';

interface PageProps {
  messages: Message[];
  appState: AppState;
  error: string | null;
  onSendMessage: (text: string) => void;
  onSuggestionClick: (suggestion: string) => void;
  income: number;
  expenses: number;
  balance: number;
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
}

const suggestions = [
  "What's my current balance?",
  "How much did I spend on food this month?",
  "Summarize my spending for this month.",
  "Are there any unusual transactions recently?",
];

const DashboardPage: React.FC<PageProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 h-full">
        {/* Left Column: Financial Info */}
        <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Financial Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard 
              title="Total Income"
              amount={props.income}
              color="bg-emerald-100 dark:bg-emerald-900/50"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
            />
            <SummaryCard 
              title="Total Expenses"
              amount={props.expenses}
              color="bg-rose-100 dark:bg-rose-900/50"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>}
            />
            <SummaryCard 
              title="Current Balance"
              amount={props.balance}
              color="bg-sky-100 dark:bg-sky-900/50"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>}
            />
          </div>

          {/* Transactions Section */}
          <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Transactions</h2>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Transaction
                </button>
              </div>
              <TransactionsTable transactions={props.transactions} onDelete={props.onDeleteTransaction} />
          </div>
        </div>

        {/* Right Column: Chat Section */}
        <div className="w-full lg:w-2/5 xl:w-1/3 flex flex-col bg-base-100 dark:bg-dark-card border-l border-base-300 dark:border-dark-border">
          <div className="flex-1 flex flex-col overflow-y-auto">
            {props.messages.length === 0 ? (
              <SuggestionChips 
                title="Dashboard Chat"
                subtitle="Ask me about your financial summary based on the data shown."
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
      <AddTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={props.onAddTransaction}
      />
    </>
  );
};

export default DashboardPage;