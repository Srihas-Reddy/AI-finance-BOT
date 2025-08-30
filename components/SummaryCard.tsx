import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, icon, color }) => {
  return (
    <div className="bg-base-100 dark:bg-dark-card rounded-xl shadow-lg p-6 flex items-center space-x-6">
      <div className={`rounded-full p-4 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{title}</p>
        <p className="text-2xl font-bold text-base-content dark:text-dark-text-primary mt-1">
          ₹{amount.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
