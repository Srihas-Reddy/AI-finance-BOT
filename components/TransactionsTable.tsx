import React from 'react';
import { Transaction } from '../types';

interface TransactionsTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-base-300 dark:border-dark-border bg-base-100 dark:bg-dark-card shadow-md">
      <table className="min-w-full divide-y divide-base-300 dark:divide-dark-border">
        <thead className="bg-base-200 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Title</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Amount</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Date</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Delete</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-300 dark:divide-dark-border">
          {transactions.length > 0 ? transactions.map((t) => (
            <tr key={t.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content dark:text-dark-text-primary">{t.title}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary">{t.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary">{t.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                    onClick={() => onDelete(t.id)} 
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    aria-label={`Delete transaction ${t.title}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          )) : (
            <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500 dark:text-dark-text-secondary">
                    No transactions found.
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;