'use client'
import React, { useEffect, useState } from 'react';
import { useWalletStore } from '@/app/store/useWalletStore';
import { useNetworkStore } from "@/app/store/useNetworkConfig";

const NetworkButton = () => {
  const { networkName, switchNetwork, account, networkChainId } = useWalletStore();
  const { config } = useNetworkStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSwitch = (chainId: string) => {
    switchNetwork(chainId);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (!account) {
      setDropdownOpen(false);
    }
  }, [account]);

  // Determine if the current network is supported or not
  const isSupportedNetwork = config && Object.keys(config.networks).includes(networkChainId?.toString() || "");

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => account && setDropdownOpen(!dropdownOpen)}
        className={`px-4 py-2 rounded-md text-sm font-medium shadow-md transition-colors duration-300 
          ${
            account ? 'border' : ''
          }
          ${
          !isSupportedNetwork ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-blackish hover:bg-gray-700 text-header-yellow'
        }`}
        disabled={!account}
      >
        {account ? (isSupportedNetwork ? networkName : "Wrong Network") : 'No Wallet Connected'}
      </button>
      {dropdownOpen && config && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Object.entries(config.networks).map(([chainId, name]) => (
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
