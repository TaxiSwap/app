import { NetworkConfig } from "./configLoader";

export const testnetConfig: NetworkConfig = {
  networks: {
    "11155111": "Sepolia (Ethereum Testnet)",
    "43113": "Fuji (Avalanche Testnet)",
    "11155420": "OP Sepolia (OP Testnet)",
    "421614": "Arbitrum Sepolia (Arbitrum Testnet)",
    "84532": "Base Sepolia (Base Testnet)",
    "80001": "Mumbai (Polygon Testnet)"
  },
  network_params: {
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
  },
  UNSUPPORTED_NETWORK: "UNSUPPORTED_NETWORK",
};
