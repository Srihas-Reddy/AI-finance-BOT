
import React from 'react';

export type Page = 'Dashboard' | 'Invest' | 'Analytics' | 'Goals';

export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string; // Should only exist in mock DB, not in app state
}

export interface Message {
  role: 'user' | 'bot';
  content: string | React.ReactNode;
  sources?: GroundingSource[];
}

export interface StockDataPoint {
  date: string;
  [key: string]: number | string;
}

export interface BudgetItem {
  category: string;
  amount: number;
  details: string;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // YYYY-MM-DD
}

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string; // YYYY-MM-DD
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface AnalyticsDataPoint {
    date: string;
    income: number;
    expense: number;
}

export interface CategorySpending {
    name: string;
    value: number;
}


export interface GroundingSource {
    web?: {
        // FIX: Made uri and title optional to match the Gemini API's GroundingChunk type.
        uri?: string;
        title?: string;
    }
}

export enum AppState {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
}
