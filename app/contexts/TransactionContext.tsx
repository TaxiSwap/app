'use client'
import React, { createContext, useContext, useState, useReducer, useCallback } from 'react';

export interface Step {
  name: string;
  status: 'pending' | 'completed' | 'working' | 'error';
  requiresWalletInteraction?: boolean;
}

type Action =
  | { type: 'SET_STEPS'; payload: Step[] }
  | { type: 'UPDATE_STEP_STATUS'; stepIndex: number; status: Step['status'] }
  | { type: 'RESET_STEPS' };

interface TransactionContextType {
  steps: Step[];
  dispatch: React.Dispatch<Action>;
}

const initialSteps: Step[] = [
  { name: "Approve Tokens", status: "pending", requiresWalletInteraction: true },
  { name: "Deposit Tokens", status: "pending", requiresWalletInteraction: true },
  { name: "Wait for transfer. This might take a while", status: "pending" },
];

function reducer(state: Step[], action: Action): Step[] {
  switch (action.type) {
    case 'SET_STEPS':
      return action.payload;
    case 'UPDATE_STEP_STATUS':
      return state.map((step, index) =>
        index === action.stepIndex ? { ...step, status: action.status } : step
      );
    case 'RESET_STEPS':
      return state.map((step) => ({ ...step, status: 'pending' }));
    default:
      return state;
  }
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [steps, dispatch] = useReducer(reducer, initialSteps);


  return (
    <TransactionContext.Provider value={{ steps, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};
