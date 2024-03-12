import React, { useEffect, useState } from "react";

interface SelectChainProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  networks: Record<string, string>; // <chainId, networkName>
  errorMessage?: string; // Optional error message
  onErrorClick?: () => void; // Optional error click handler
}

const SelectChain: React.FC<SelectChainProps> = ({
  label,
  value,
  onChange,
  networks,
  errorMessage,
  onErrorClick,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  return (
    <div className="flex-grow">
      <div className="flex items-center space-x-2 mb-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}{" "}
        </label>
        {errorMessage && value && (
          <div className="text-red-500 italic text-xs mt-2 ">
            Warning:
            {onErrorClick && (
              <button
                className="ml-2 text-blue-500 text-xs"
                onClick={(event) => {
                  event.preventDefault();
                  onErrorClick();
                }}
              >
                {errorMessage}
              </button>
            )}
          </div>
        )}
      </div>
      <select
        value={value || ""}
        onChange={onChange}
        className={`mt-1 block w-full px-4 py-2 text-base font-normal bg-gray-200 border ${
          isHighlighted ? "border-green-500" : "border-gray-300"
        } rounded focus:outline-none focus:border-blue-500 transition duration-300`}
      >
        <option value="" disabled={!!value}>
          Select a network...
        </option>
        {Object.entries(networks).map(([chainId, networkName]) => (
          <option key={chainId} value={chainId}>
            {networkName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectChain;
