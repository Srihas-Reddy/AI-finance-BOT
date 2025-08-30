
import React, { useState, useEffect, useMemo } from 'react';
import { Chat as GeminiChat } from '@google/genai';
import { Message, AppState, Page, Transaction, Goal, User } from './types';
import { startChatSession, sendMessageToAI } from './services/geminiService';
import Disclaimer from './components/Disclaimer';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import InvestPage from './pages/InvestPage';
import AnalyticsPage from './pages/AnalyticsPage';
import GoalsPage from './pages/GoalsPage';

// Mock data for transactions
const initialTransactions: Transaction[] = [
  { id: '1', title: 'Monthly Salary', amount: 75000, type: 'income', category: 'Salary', date: '2023-10-01' },
  { id: '2', title: 'Rent', amount: 15000, type: 'expense', category: 'Housing', date: '2023-10-05' },
  { id: '3', title: 'Groceries', amount: 8000, type: 'expense', category: 'Food', date: '2023-10-07' },
  { id: '4', title: 'Freelance Project', amount: 12000, type: 'income', category: 'Freelance', date: '2023-10-10' },
  { id: '5', title: 'Internet Bill', amount: 1000, type: 'expense', category: 'Bills', date: '2023-10-12' },
  { id: '6', title: 'Dining Out', amount: 2500, type: 'expense', category: 'Entertainment', date: '2023-10-15' },
];

// Mock data for goals
const initialGoals: Goal[] = [
    { id: 'g1', name: 'Dream Vacation', targetAmount: 150000, currentAmount: 65000, targetDate: '2024-12-31' },
    { id: 'g2', name: 'New Laptop', targetAmount: 120000, currentAmount: 110000, targetDate: '2024-06-30' },
    { id: 'g3', name: 'Emergency Fund', targetAmount: 500000, currentAmount: 250000, targetDate: '2025-12-31' },
];

interface MainAppProps {
  currentUser: User;
  onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ currentUser, onLogout }) => {
  const [chat, setChat] = useState<GeminiChat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [appState, setAppState] = useState<AppState>(AppState.Idle);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'dark');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const financialSummary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, [transactions]);

  useEffect(() => {
    try {
      const chatSession = startChatSession();
      setChat(chatSession);
    } catch (e) {
      console.error(e);
      setError("Failed to initialize the AI service. Please check your API key.");
      setAppState(AppState.Error);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSendMessage = async (text: string) => {
    if (!chat || appState === AppState.Loading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setAppState(AppState.Loading);
    setError(null);

    try {
      // Pass contextual data to the AI service
      const contextTransactions = (currentPage === 'Dashboard' || currentPage === 'Analytics') ? transactions : [];
      const contextGoals = (currentPage === 'Goals') ? goals : [];

      const { botResponse, sources } = await sendMessageToAI(chat, text, currentPage, contextTransactions, contextGoals);
      
      const botMessage: Message = { 
        role: 'bot', 
        content: botResponse, 
        sources: sources 
      };
      setMessages(prev => [...prev, botMessage]);
      setAppState(AppState.Idle);
    } catch (e: any) {
      console.error(e);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setError(errorMessage);
      const botErrorMessage: Message = { role: 'bot', content: errorMessage };
      setMessages(prev => [...prev, botErrorMessage]);
      setAppState(AppState.Error);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };
  
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setMessages([]); // Clear chat history when changing pages
    setError(null);
    setAppState(AppState.Idle);
  }
  
  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().toISOString(), // simple unique id
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  const handleAddGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
        ...goal,
        id: new Date().toISOString(),
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };


  const renderPage = () => {
    const pageProps = { messages, appState, error, onSendMessage: handleSendMessage, onSuggestionClick: handleSuggestionClick };
    switch (currentPage) {
      case 'Dashboard':
        return <DashboardPage 
                  {...pageProps} 
                  {...financialSummary} 
                  transactions={transactions} 
                  onAddTransaction={handleAddTransaction} 
                  onDeleteTransaction={handleDeleteTransaction}
               />;
      case 'Invest':
        return <InvestPage {...pageProps} />;
      case 'Analytics':
        return <AnalyticsPage {...pageProps} transactions={transactions} />;
      case 'Goals':
        return <GoalsPage 
                    {...pageProps}
                    goals={goals}
                    onAddGoal={handleAddGoal}
                    onDeleteGoal={handleDeleteGoal}
                />;
      default:
        return <DashboardPage 
                  {...pageProps} 
                  {...financialSummary} 
                  transactions={transactions} 
                  onAddTransaction={handleAddTransaction} 
                  onDeleteTransaction={handleDeleteTransaction}
               />;
    }
  }

  return (
    <div className="bg-base-200 dark:bg-dark-bg text-base-content dark:text-dark-text-primary flex h-screen font-sans">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b border-base-300 dark:border-dark-border shadow-md bg-base-100 dark:bg-dark-card">
          <h1 className="text-xl font-bold ml-3 tracking-wider">{currentPage}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium hidden sm:inline">Welcome, {currentUser.fullName.split(' ')[0]}</span>
            <button onClick={handleThemeToggle} className="p-2 rounded-full hover:bg-base-200 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle theme">
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button onClick={onLogout} className="p-2 rounded-full hover:bg-base-200 dark:hover:bg-gray-700 transition-colors" aria-label="Logout">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto flex flex-col">
          {renderPage()}
        </main>
        
        <Disclaimer />
      </div>
    </div>
  );
};

export default MainApp;
