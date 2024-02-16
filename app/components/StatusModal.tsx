import React from 'react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  steps: Array<{
    name: string;
    status: 'pending' | 'completed' | 'working';
  }>;
}

const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, title, steps }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <div className="text-lg font-semibold">{title}</div>
        <ul className="my-4">
          {steps.map((step, index) => (
            <li key={index} className="flex items-center my-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}>
                {step.status === 'completed' ? '✓' : index + 1}
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium">{step.name}</div>
                {step.status === 'working' && <div className="text-xs text-gray-500">Working...</div>}
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

export default StatusModal;
