'use client'
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Step {
  name: string;
  status: 'pending' | 'completed' | 'working' | 'error';
  requiresWalletInteraction?: boolean;
}

interface TransactionContextType {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  updateStepStatus: (stepIndex: number, status: Step['status']) => void;
  resetSteps: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [steps, setSteps] = useState<Step[]>([]);

  const updateStepStatus = useCallback((stepIndex: number, status: Step['status']) => {
    setSteps((currentSteps) =>
      currentSteps.map((step, index) =>
        index === stepIndex ? { ...step, status } : step
      )
    );
  }, []);

  const resetSteps = useCallback(() => {
    setSteps((currentSteps) =>
      currentSteps.map((step) => ({ ...step, status: 'pending' }))
    );
  }, []);

  return (
    <TransactionContext.Provider value={{ steps, setSteps, updateStepStatus, resetSteps }}>
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
