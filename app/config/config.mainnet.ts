export const mainnetConfig = {
  networks: {
    "1": "Ethereum",
    "43114": "Avalanche",
    "10": "OP Mainnet",
    "42161": "Arbitrum",
    "8453": "Base",
    "137": "Polygon",
  },
  network_params: {
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
  },

  contracts: {},
  UNSUPPORTED_NETWORK: "UNSUPPORTED_NETWORK"
};
