
import React from 'react';
import { Goal } from '../types';

interface GoalCardProps {
  goal: Goal;
  onDelete: (id: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onDelete }) => {
  const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

  const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      });
  }
  
  return (
    <div className="bg-base-100 dark:bg-dark-card rounded-xl shadow-lg p-6 border border-base-300 dark:border-dark-border">
      <div className="flex justify-between items-start">
        <div>
            <h3 className="text-xl font-bold">{goal.name}</h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
                Target Date: {formatDate(goal.targetDate)}
            </p>
        </div>
        <button
          onClick={() => onDelete(goal.id)}
          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          aria-label={`Delete goal ${goal.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-semibold text-brand-primary">
                {progress.toFixed(1)}% Complete
            </span>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                <span className="font-bold text-base-content dark:text-dark-text-primary">₹{goal.currentAmount.toLocaleString('en-IN')}</span> / ₹{goal.targetAmount.toLocaleString('en-IN')}
            </p>
        </div>
        <div className="w-full bg-base-200 dark:bg-dark-border rounded-full h-3">
          <div
            className="bg-brand-primary h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
