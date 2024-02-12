// constants.ts
export const SUPPORTED_NETWORKS: { [key: string]: string } = {
    // Mainnets
    '1': 'Ethereum',
    '10': 'OP Mainnet',
    '56': 'Binance Smart Chain',
    '137': 'Polygon PoS',
    '43114': 'Avalanche',
    '42161': 'Arbitrum',
    // Add chain IDs for Base and Noble 
    // Testnets
    '5': 'Goerli (Ethereum Testnet)',
    '80001': 'Mumbai (Polygon Testnet)',
    '43113': 'Fuji (Avalanche Testnet)',
    '421611': 'Arbitrum Rinkeby (Arbitrum Testnet)',
    // Add testnet IDs for OP Mainnet, Base, and Noble 
  };
  
  export const NETWORK_PARAMS: { [key: string]: any } = {
    // Example configuration for Ethereum Mainnet
    '1': {
      chainId: '0x1',
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://ethereum.publicnode.com'],
      blockExplorerUrls: ['https://etherscan.io'],
    },
    // Configure other networks similarly
    // Make sure to fill in the actual values for `rpcUrls` and `blockExplorerUrls`
    // This is an example, and you'll need to add configurations for each network you intend to support
  };
  
  export const UNSUPPORTED_NETWORK = 'Unsupported Network';
  