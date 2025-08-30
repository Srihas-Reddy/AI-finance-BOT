
import React, { useState, useEffect } from 'react';
import { Goal } from '../types';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (goal: Omit<Goal, 'id'>) => void;
}

const defaultFormData = {
  name: '',
  targetAmount: '',
  currentAmount: '',
  targetDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
};

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (isOpen) {
      setFormData(defaultFormData);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount || !formData.currentAmount || !formData.targetDate) {
        alert("Please fill out all fields.");
        return;
    }
    onAdd({
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount),
        targetDate: formData.targetDate,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-base-100 dark:bg-dark-card rounded-xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Goal</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Goal Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" placeholder="e.g., New Car" />
          </div>
          <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Target Amount (₹)</label>
            <input type="number" name="targetAmount" id="targetAmount" value={formData.targetAmount} onChange={handleChange} required className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" placeholder="0.00" />
          </div>
          <div>
            <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Current Amount (₹)</label>
            <input type="number" name="currentAmount" id="currentAmount" value={formData.currentAmount} onChange={handleChange} required className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" placeholder="0.00" />
          </div>
          <div>
            <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Target Date</label>
            <input type="date" name="targetDate" id="targetDate" value={formData.targetDate} onChange={handleChange} required className="mt-1 block w-full bg-base-200 dark:bg-dark-bg border-base-300 dark:border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div className="flex justify-end pt-4 space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-base-200 dark:bg-dark-border text-base-content dark:text-dark-text-primary rounded-lg hover:bg-base-300 dark:hover:bg-gray-600 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">Add Goal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
