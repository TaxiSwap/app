'use client'
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getConfig, NetworkConfig } from '../config/configLoader';

interface NetworkConfigContextType {
  networkType: 'mainnet' | 'testnet';
  config: NetworkConfig;
  toggleNetworkType: () => void;
}
const NetworkConfigContext = createContext<NetworkConfigContextType | undefined>(undefined);


export const NetworkConfigProvider = ({ children }: { children: ReactNode }) => {
  const [networkType, setNetworkType] = useState<'mainnet' | 'testnet'>('mainnet');

  useEffect(() => {
    const storedNetworkType = localStorage.getItem('networkType') || 'mainnet';
    setNetworkType(storedNetworkType as 'mainnet' | 'testnet');
  }, []);

  const config = getConfig(networkType);

  const toggleNetworkType = () => {
    const newNetworkType = networkType === 'mainnet' ? 'testnet' : 'mainnet';
    setNetworkType(newNetworkType);
    localStorage.setItem('networkType', newNetworkType);
    window.location.reload();
  };

  return (
    <NetworkConfigContext.Provider value={{ networkType, config, toggleNetworkType }}>
      {children}
    </NetworkConfigContext.Provider>
  );
};

export const useNetworkConfigContext = (): NetworkConfigContextType => {
  const context = useContext(NetworkConfigContext);
  if (context === undefined) {
    throw new Error('useNetworkConfigContext must be used within a NetworkConfigProvider');
  }
  return context;
};