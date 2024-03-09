import React from 'react';

interface AmountInputProps {
  value: number;
  balance: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  onMaxClick?: () => void; 
  errorMessage?: string; 
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  balance,
  onChange,
  isValid,
  onMaxClick,
  errorMessage,
}) => {
  return (
    <div>
      <label className="block text-gray-700">Amount</label>
      {!isValid && (
          <p className="text-red-500 text-xs">{errorMessage || 'Invalid amount.'}</p>
        )}
      <div className="relative mt-1">
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder="0.00"
          className={`w-full px-4 py-2 bg-gray-200 border ${isValid ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {onMaxClick && (
            <button
              type="button"
              onClick={onMaxClick}
              className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1"
            >
              Use Max
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className={`text-sm ${isValid ? 'text-gray-500' : 'text-red-500'}`}>
          Balance: {balance} USDC
        </span>

      </div>
    </div>
  );
};

export default AmountInput;
