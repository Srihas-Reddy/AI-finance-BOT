import React from 'react';
import { BudgetItem } from '../types';

interface BudgetTableResponse {
  summary: string;
  data: BudgetItem[];
}

interface BudgetTableProps {
  response: BudgetTableResponse;
}

const BudgetTable: React.FC<BudgetTableProps> = ({ response }) => {
  const { summary, data } = response;

  const total = data.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div>
      <p className="mb-4 whitespace-pre-wrap">{summary}</p>
      <div className="overflow-x-auto rounded-lg border border-base-300 dark:border-dark-border">
        <table className="min-w-full divide-y divide-base-300 dark:divide-dark-border bg-base-100 dark:bg-dark-card">
          <thead className="bg-base-200 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300 dark:divide-dark-border">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content dark:text-dark-text-primary">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content dark:text-dark-text-primary">₹{item.amount.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary">{item.details}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-base-200 dark:bg-gray-800">
            <tr>
              <td className="px-6 py-3 text-left text-sm font-bold text-base-content dark:text-dark-text-primary">Total</td>
              <td className="px-6 py-3 text-left text-sm font-bold text-base-content dark:text-dark-text-primary">₹{total.toLocaleString('en-IN')}</td>
              <td className="px-6 py-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BudgetTable;