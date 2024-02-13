export interface NetworkConfig {
    networks: {
      [chainId: string]: string;
    };
    network_params: {
      [chainId: string]: {
        chainId: string;
        chainName: string;
        nativeCurrency: {
          name: string;
          symbol: string;
          decimals: number;
        };
        rpcUrls: string[];
        blockExplorerUrls: string[];
      };
    };
    contracts: {}; // Adjust this part based on your actual contracts structure
    UNSUPPORTED_NETWORK: string;
  }
  