import { useState, useEffect } from 'react';

const useEnvFlags = () => {
  const [isTestnet, setIsTestnet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await fetch('/api/env');
        const data = await response.json();
        setIsTestnet(data.TESTNET === 'true');
      } catch (error) {
        console.error('Failed to fetch admin flag:', error);
        setIsTestnet(false); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchFlags();
  }, []);

  return { isTestnet, isLoading };
};

export default useEnvFlags;
