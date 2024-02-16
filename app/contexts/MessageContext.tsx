'use client'
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface MessageContextType {
  message: string;
  type: 'success' | 'error' | '';
  showMessage: (message: string, type: 'success' | 'error') => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | ''>('');

  const showMessage = useCallback((message: string, type: 'success' | 'error') => {
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setMessage('');
      setType('');
    }, 15000); // Hide message after 15 seconds
  }, []);

  return (
    <MessageContext.Provider value={{ message, type, showMessage }}>
      {children}
      {message && (
        <div className={`fixed top-5 right-5 w-64 p-4 border rounded-lg shadow-lg z-50 transition-opacity duration-500 ease-in-out ${type === 'success' ? 'bg-green-500/90' : 'bg-red-500/90'} text-white break-words`}>
          {message}
        </div>
      )}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};
