// components/NetworkButton.tsx
import React, { useState } from 'react';
import useWallet from '../hooks/useWallet';
import { SUPPORTED_NETWORKS, UNSUPPORTED_NETWORK } from '../constants';

const NetworkButton = () => {
  const { networkName, switchNetwork } = useWallet();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSwitch = (chainId: string) => {
    switchNetwork(chainId);
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`px-4 py-2 rounded-full text-sm font-medium shadow-md border transition-colors duration-300 ${
          networkName === UNSUPPORTED_NETWORK
            ? 'bg-red-500 hover:bg-red-700'
            : 'bg-blue-600 text-white hover:bg-blue-700 border-blue-800'
        }`}
      >
        {networkName}
      </button>
      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Object.entries(SUPPORTED_NETWORKS).map(([chainId, name]) => (
              <a
                key={chainId}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleSwitch(chainId);
                }}
                role="menuitem"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkButton;
