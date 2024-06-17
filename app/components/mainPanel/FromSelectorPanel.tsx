import React, { useEffect, useState } from "react";
import { NetworkParam } from "@/app/config/configLoader";
import ChainDropdown from "./ChainDropdown";
import TokenDropdown from "./TokenDropdown";

interface SelectChainProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  networks: Record<string, NetworkParam>;
  errorMessage?: string;
  onErrorClick?: () => void;
  userBalance?: number | null;
  amount: number | null;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxClick?: () => void; 
  onHalfClick?: () => void; 
}

const FromSelectorPanel: React.FC<SelectChainProps> = ({
  value,
  onChange,
  networks,
  errorMessage,
  onErrorClick,
  userBalance,
  amount,
  handleAmountChange,
  onMaxClick,
  onHalfClick
  
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("");

  useEffect(() => {
    if (value && networks[value]) {
      setSelectedToken(networks[value].tokens[0].symbol);
    }
  }, [value, networks]);

  const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedToken(event.target.value);
  };

  const isOverBalance = userBalance !== null && userBalance !== undefined && parseFloat(inputValue) > userBalance;

  return (
    <div className="bg-pale p-4 rounded-20 shadow-custom">
      <div className="mb-4 relative">
        <div className="flex items-center pt-6">
          <label className="text-sm text-blackish font-bold mr-2">FROM:</label>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/4 top-0 flex items-center p-2 rounded-lg text-blackish w-full z-20">
          <ChainDropdown value={value} onChange={onChange} networkParams={networks} />
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
      <div className="flex items-center p-2 rounded-lg shadow mb-4">
        <input
          type="number"
          value={amount || undefined}
          onChange={handleAmountChange}
          className={`w-full p-2 rounded-lg font-bold text-xl bg-pale ${
            isOverBalance ? 'border-red-500 text-red-500' : 'text-blackish'
          }`}
        />
        <div className="flex space-x-2 mx-2 text-xs text-brownish">
          <button
            className="px-2 py-1 border-2 border-brownish rounded-lg"
            onClick={onHalfClick}
          >
            Half
          </button>
          <button
            className="px-2 py-1 border-2 border-brownish rounded-lg"
            onClick={onMaxClick}
          >
            MAX
          </button>
        </div>
        <div className="flex items-center space-x-2 z-10">
        <TokenDropdown value={selectedToken} onChange={handleTokenChange} tokens={networks[value]?.tokens || []} />
        </div>
      </div>
      {userBalance !== null && (
        <span className="m-0 p-0 text-blackish">available: ${userBalance}</span>
      )}
      

    </div>
  );
};

export default FromSelectorPanel;
