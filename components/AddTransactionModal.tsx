import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

const defaultFormData = {
  title: '',
  amount: '',
  category: '',
  type: 'expense' as TransactionType,
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
};

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setFormData(defaultFormData);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
        alert("Please fill out all fields.");
        return;
    }
    onAdd({
        ...formData,
        amount: parseFloat(formData.amount),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-base-100 dark:bg-dark-card rounded-xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Amount (₹)</label>
            <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" placeholder="0.00" />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Type</label>
            <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Category</label>
            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" placeholder="e.g., Food, Salary" />
          </div>
           <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Date</label>
            <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div className="flex justify-end pt-4 space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-base-200 dark:bg-dark-border text-base-content dark:text-dark-text-primary rounded-lg hover:bg-base-300 dark:hover:bg-gray-600 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;