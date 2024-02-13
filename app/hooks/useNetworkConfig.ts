import { useState, useEffect } from 'react';
import { getConfig } from '../config/configLoader';

export function useNetworkConfig() {
  const [networkType, setNetworkType] = useState<'mainnet' | 'testnet'>('mainnet');

  useEffect(() => {
    // Directly attempt to retrieve the network type from localStorage,
    // defaulting to 'mainnet' if not found.
    const storedNetworkType = localStorage.getItem('networkType') || 'mainnet';
  
    // Ensure the retrieved value is one of the expected types to satisfy TypeScript's type checking.
    // This also implicitly sets 'mainnet' if the value was null or any other unexpected string.
    setNetworkType(storedNetworkType === 'testnet' ? 'testnet' : 'mainnet');
  
    // If there was no stored value, explicitly set it in localStorage for future.
    if (!localStorage.getItem('networkType')) {
      localStorage.setItem('networkType', 'mainnet');
    }
  }, []);

  const config = getConfig(networkType);

  const toggleNetworkType = () => {
    const newNetworkType = networkType === 'mainnet' ? 'testnet' : 'mainnet';
    setNetworkType(newNetworkType);
    localStorage.setItem('networkType', newNetworkType);
    window.location.reload();
  };

  return { config, toggleNetworkType };
}
