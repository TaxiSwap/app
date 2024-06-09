import React from "react";
import { NetworkParam } from "@/app/config/configLoader";
import ChainDropdown from "./ChainDropdown";

interface SelectChainProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  networks: Record<string, NetworkParam>;
  errorMessage?: string;
  onErrorClick?: () => void;
  handleCopyAddress: () => void;
  onAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  destinationAddress?: string;
  isValid: boolean;
}

const ToSelectorPanel: React.FC<SelectChainProps> = ({
  value,
  onChange,
  networks,
  errorMessage,
  onErrorClick,
  handleCopyAddress,
  onAddressChange,
  destinationAddress,
  isValid,
}) => {
  const showError = !isValid && destinationAddress !== "";

  return (
    <div className="bg-pale p-4 rounded-20 shadow-custom">
      <div className="mb-4 relative">
        <div className="flex items-center pt-6">
          <label className="text-sm text-blackish font-bold mr-2">TO: </label>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/4 top-0 flex items-center p-2 rounded-lg text-blackish w-full z-5">
          <ChainDropdown
            value={value}
            onChange={onChange}
            networkParams={networks}
          />
        </div>
        {errorMessage && value && (
          <div className="text-red-500 italic text-xs mt-4 ">
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
      <div className="flex items-center p-2 rounded-lg shadow mb-4 bg-blackish text-pale">
        <input
          type="text"
          value={destinationAddress}
          onChange={onAddressChange}
          placeholder="Enter destination address"
          className="w-full p-2 rounded-lg text-pale bg-blackish border-none outline-none"
        />
        <button
          className="ml-2 px-4 py-2 rounded-lg bg-yellow-400 text-blackish font-bold whitespace-nowrap"
          onClick={handleCopyAddress}
        >
          My Wallet
        </button>
      </div>

      {showError && (
        <div className="text-red-500 text-xs mt-2">
          Please enter a valid address.
        </div>
      )}
    </div>
  );
};

export default ToSelectorPanel;
