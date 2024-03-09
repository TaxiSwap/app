import React from "react";

interface AddressInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  handleCopyAddress: () => void;
  errorMessage?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  isValid,
  errorMessage,
  handleCopyAddress,
}) => {
  return (
    <div>
      <label className="block text-gray-700">Destination Address</label>
      {!isValid && (
        <p className="text-red-500 text-xs mt-2">
          {errorMessage || "Please enter a valid address."}
        </p>
      )}
      <div className="mt-1 relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="0x..."
          className={`form-input w-full px-4 py-2 bg-gray-200 border ${
            isValid ? "border-gray-300" : "border-red-500"
          } rounded-md focus:outline-none focus:border-blue-500`}
        />
        <button
          type="button"
          onClick={handleCopyAddress}
          className="absolute right-2 top-2 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1"
        >
          COPY FROM WALLET
        </button>
      </div>
    </div>
  );
};

export default AddressInput;
