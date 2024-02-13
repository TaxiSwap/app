// constants.ts
export const SUPPORTED_NETWORKS: { [key: string]: string } = {
  // Mainnets
  "1": "Ethereum",
  "43114": "Avalanche",
  "10": "OP Mainnet",
  "42161": "Arbitrum",
  "8453": "Base",
  "137": "Polygon",

  // Testnets
  "11155111": "Sepolia (Ethereum Testnet)",
  "43113": "Fuji (Avalanche Testnet)",
  "11155420": "OP Sepolia (OP Testnet)",
  "421614": "Arbitrum Sepolia (Arbitrum Testnet)",
  "84532": "Base Sepolia (Base Testnet)",
  "80001": "Mumbai (Polygon Testnet)"
};

export const NETWORK_PARAMS: { [key: string]: any } = {
  // Example configuration for Ethereum Mainnet
  "1": {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ethereum.publicnode.com"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  "43114": {
    chainId: "0xa86a",
    chainName: "Avalanche C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://avalanche-c-chain.publicnode.com"],
    blockExplorerUrls: ["https://snowtrace.io"],
  },
  "10": {
    chainId: "0xa",
    chainName: "OP Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
  },
  "42161": {
    chainId: "0xa4b1",
    chainName: "Arbitrum One",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arbitrum-one.publicnode.com"],
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  "8453": {
    chainId: "0x2105",
    chainName: "Base",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://basescan.org"],
  },
  "137": {
    chainId: "0x89",
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-bor.publicnode.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  // Testnets
  "11155111" :{
    chainId: "0xaa36a7",
    chainName: "Sepolia Testnet",
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ethereum-sepolia.publicnode.com"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  "43113": {
    chainId: "0xa86a",
    chainName: "Avalanche Fuji Testnet",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://avalanche-fuji-c-chain.publicnode.com"],
    blockExplorerUrls: ["https://testnet.snowtrace.io"],
  },
  "11155420": {
    chainId: "0xaa37dc",
    chainName: "OP Sepolia Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.optimism.io"],
    blockExplorerUrls: ["https://optimism-sepolia.blockscout.com"],
  },
  "421614":{
    chainId: "0x66eee",
    chainName: "Arbitrum Sepolia Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://sepolia-explorer.arbitrum.io"],
  },
  "84532":{
    chainId: "0x14a34",
    chainName: "Base Sepolia Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://base-sepolia.blockscout.com"],
  },
  "80001":{
    chainId: "0x13881",
    chainName: "Mumbai Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-mumbai-bor.publicnode.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
};

export const UNSUPPORTED_NETWORK = "Unsupported Network";
