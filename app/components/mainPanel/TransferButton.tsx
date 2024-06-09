import React from 'react';

interface TransferButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const TransferButton: React.FC<TransferButtonProps> = ({ onClick, disabled }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-yellow-400 text-blackish rounded-full p-3 shadow-md w-full max-w-md text-xl font-bold flex items-center justify-center ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'
        }`}
      >
        <span className="mr-2">Transfer Ride!</span>
      </button>
    </div>
  );
};

export default TransferButton;
