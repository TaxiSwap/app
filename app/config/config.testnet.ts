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
  contracts: {
    // Sepolia
    "11155111" :{
      TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
      USDC_CONTRACT_ADDRESS: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
      WHITEBRIDGE_CONTRACT_ADDRESS: "",
      DOMAIN: 0
    },
    // Avalanche Fuji
    "43113": {
      TOKEN_MESSENGER_CONTRACT_ADDRESS: "0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0",
      USDC_CONTRACT_ADDRESS: "0x5425890298aed601595a70ab815c96711a31bc65",
      MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
      WHITEBRIDGE_CONTRACT_ADDRESS: "",
      DOMAIN: 1
    },
    // OP Sepolia
    "11155420": {
      TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
      USDC_CONTRACT_ADDRESS: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
      MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
      WHITEBRIDGE_CONTRACT_ADDRESS: "",
      DOMAIN: 2
    },
    // Arbitrum Sepolia
    "421614": {
      TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
      USDC_CONTRACT_ADDRESS: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
      MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0xaCF1ceeF35caAc005e15888dDb8A3515C41B4872",
      WHITEBRIDGE_CONTRACT_ADDRESS: "",
      DOMAIN: 3
    }, 
    // Base Sepolia
    "84532": {
      TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
      USDC_CONTRACT_ADDRESS: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
      WHITEBRIDGE_CONTRACT_ADDRESS: "",
      DOMAIN: 6
    },
    // Mumbai Polygon
    "80001": {
      TOKEN_MESSENGER_CONTRACT_ADDRESS: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
      WHITEBRIDGE_CONTRACT_ADDRESS: "0x3A850eF482E77A1A3be32449796c33468992b71E",
      USDC_CONTRACT_ADDRESS: "0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97",
      MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: "0xe09A679F56207EF33F5b9d8fb4499Ec00792eA73",
      DOMAIN: 7
    }

  },
  UNSUPPORTED_NETWORK: "UNSUPPORTED_NETWORK",
  ATTESTATION_URL: "https://iris-api-sandbox.circle.com"
};
