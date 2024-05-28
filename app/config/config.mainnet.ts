import { NetworkConfig } from "./configLoader";

export const mainnetConfig: NetworkConfig = {
  networks: {
    // "1": "Ethereum",
    "43114": "Avalanche",
    "10": "Optimism",
    "42161": "Arbitrum",
    "8453": "Base",
    "137": "Polygon",
  },
  network_params: {
    // "1": {
    //   chainId: "0x1",
    //   chainName: "Ethereum",
    //   nativeCurrency: {
    //     name: "Ether",
    //     symbol: "ETH",
    //     decimals: 18,
    //   },
    //   rpcUrls: ["https://ethereum.publicnode.com"],
    //   blockExplorerUrls: ["https://etherscan.io"],
    //   icon: "/icons/ethereum-logo.png",
    //   tokens: [
    //     {
    //       name: "USD Coin",
    //       symbol: "USDC",
    //       address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    //       icon: "/icons/usdc-logo.png",
    //     },
    //     {
    //       name: "Ether",
    //       symbol: "ETH",
    //       address: null, // Native token
    //       icon: "/icons/ethereum-logo.png",
    //     },
    //   ],
    // },
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
      icon: "/icons/avalanche-logo.png",
      tokens: [
        {
          name: "USD Coin",
          symbol: "USDC",
          address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
          icon: "/icons/usdc-logo.png",
        },
      ],
    },
    "10": {
      chainId: "0xa",
      chainName: "Optimism",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io"],
      icon: "/icons/optimism-logo.png",
      tokens: [
        {
          name: "USD Coin",
          symbol: "USDC",
          address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
          icon: "/icons/usdc-logo.png",
        },
      ],
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
      icon: "/icons/arbitrum-logo.png",
      tokens: [
        {
          name: "USD Coin",
          symbol: "USDC",
          address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
          icon: "/icons/usdc-logo.png",
        },
      ],
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
      icon: "/icons/base-logo.png",
      tokens: [
        {
          name: "USD Coin",
          symbol: "USDC",
          address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
          icon: "/icons/usdc-logo.png",
        },
      ],
    },
    "137": {
      chainId: "0x89",
      chainName: "Polygon",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-bor.publicnode.com"],
      blockExplorerUrls: ["https://polygonscan.com"],
      icon: "/icons/polygon-logo.png",
      tokens: [
        {
          name: "USD Coin",
          symbol: "USDC",
          address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
          icon: "/icons/usdc-logo.png",
        },
      ],
    },
  },

  UNSUPPORTED_NETWORK: "UNSUPPORTED_NETWORK",
};
