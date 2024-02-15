'use client'
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { NetworkConfig } from '../types/NetworkConfig';

interface NetworkConfigContextType {
  networkType: 'mainnet' | 'testnet';
  toggleNetworkType: () => void;
}

const defaultValue: NetworkConfigContextType = {
  networkType: 'mainnet', // Default value
  toggleNetworkType: () => {}, // Placeholder function
};

const NetworkConfigContext = createContext<NetworkConfigContextType>(defaultValue);

export const NetworkConfigProvider = ({ children }: { children: ReactNode }) => {
  const [networkType, setNetworkType] = useState<'mainnet' | 'testnet'>('mainnet');

  useEffect(() => {
    const storedNetworkType = localStorage.getItem('networkType') || 'mainnet';
    setNetworkType(storedNetworkType as 'mainnet' | 'testnet');
  }, []);

  const toggleNetworkType = () => {
    const newNetworkType = networkType === 'mainnet' ? 'testnet' : 'mainnet';
    setNetworkType(newNetworkType);
    localStorage.setItem('networkType', newNetworkType);
    window.location.reload();
  };

  return (
    <NetworkConfigContext.Provider value={{ networkType, toggleNetworkType }}>
      {children}
    </NetworkConfigContext.Provider>
  );
};

export const useNetworkConfigContext = () => useContext(NetworkConfigContext);