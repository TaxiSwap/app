import React from 'react';

export interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    steps: Array<{
      name: string;
      status: 'pending' | 'completed' | 'working' | 'error';
      requiresWalletInteraction?: boolean;
    }>;
    errorMessage?: string;
  }
  
 export const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, title, steps, errorMessage }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
          <div className="text-lg font-semibold">{title}</div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <ul className="my-4">
            {steps.map((step, index) => (
              <li key={index} className="flex items-center my-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step.status === 'completed' ? 'bg-green-500' : step.status === 'error' ? 'bg-red-500' : 'bg-gray-300'}`}>
                  {step.status === 'completed' ? '✓' : step.status === 'error' ? '✕' : index + 1}
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium">{step.name}</div>
                  {step.status === 'working' && <span className="text-xs text-gray-500">Working... <span className="loader"></span></span>}
                  {step.status === 'working' && step.requiresWalletInteraction && <span className="text-xs text-blue-500">Check your wallet</span>}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ease-in-out duration-150">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  