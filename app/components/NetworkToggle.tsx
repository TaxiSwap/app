import React from 'react';
import { useNetworkConfigContext } from '../context/NetworkConfigContext'; // Adjust the import path as needed

const NetworkToggle = () => {
  const { networkType, toggleNetworkType } = useNetworkConfigContext();
  
  // Determine if the switch should be in the "checked" position
  const isTestnet = networkType === 'testnet';

  return (
    <div className="flex items-center p-2 gap-4">
      {/* Static Label for Mainnet */}
      <span className={`font-medium ${!isTestnet ? 'text-blue-600' : 'text-gray-400'}`}>
        Mainnet
      </span>

      {/* Toggle Switch */}
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input 
            id="toggle" 
            type="checkbox" 
            className="sr-only" 
            checked={isTestnet} 
            onChange={toggleNetworkType} 
          />
          <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${isTestnet ? 'bg-gray-600' : 'bg-blue-600'}`}></div>
          <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${isTestnet ? 'transform translate-x-full' : ''}`}></div>
        </div>
      </label>

      {/* Static Label for Testnet */}
      <span className={`font-medium ${isTestnet ? 'text-blue-600' : 'text-gray-400'}`}>
        Testnet
      </span>
    </div>
  );
};

export default NetworkToggle;