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

  contracts: {
       // Ethereum Mainnet
       "1" :{
        TOKEN_MESSENGER_CONTRACT_ADDRESS: "0xbd3fa81b58ba92a82136038b25adec7066af3155",
        USDC_CONTRACT_ADDRESS: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0x0a992d191deec32afe36203ad87d7d289a738f81",
        DOMAIN: 0
      },
      // Avalanche C-Chain
      "43114": {
        TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x6b25532e1060ce10cc3b0a99e5683b91bfde6982",
        USDC_CONTRACT_ADDRESS: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0x8186359af5f57fbb40c6b14a588d2a59c0c29880",
        DOMAIN: 1
      },
      // OP Mainnet
      "10": {
        TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x2B4069517957735bE00ceE0fadAE88a26365528f",
        USDC_CONTRACT_ADDRESS: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
        MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0x4d41f22c5a0e5c74090899e5a8fb597a8842b3e8",
        DOMAIN: 2
      },
      // Arbitrum One
      "42161": {
        TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x19330d10D9Cc8751218eaf51E8885D058642E08A",
        USDC_CONTRACT_ADDRESS: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0xC30362313FBBA5cf9163F0bb16a0e01f01A896ca",
        DOMAIN: 3
      }, 
      // Base Mainnet
      "8453": {
        TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x1682Ae6375C4E4A97e4B583BC394c861A46D8962",
        USDC_CONTRACT_ADDRESS: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0xAD09780d193884d503182aD4588450C416D6F9D4",
        DOMAIN: 6
      },
      // Polygon
      "137": {
        TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x9daF8c91AEFAE50b9c0E69629D3F6Ca40cA3B3FE",
        USDC_CONTRACT_ADDRESS: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
        MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0xF3be9355363857F3e001be68856A2f96b4C39Ba9",
        DOMAIN: 7
      }
  },
  UNSUPPORTED_NETWORK: "UNSUPPORTED_NETWORK",
  ATTESTATION_URL: "https://iris-api.circle.com"
};
