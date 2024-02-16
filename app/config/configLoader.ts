"use client";
import { mainnetConfig } from "./config.mainnet";
import { testnetConfig } from "./config.testnet";

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
  contracts: {
    [key: string]: {
      TOKEN_MESSENGER_CONTRACT_ADDRESS: string;
      USDC_CONTRACT_ADDRESS: string;
      MESSAGE_TRANSMITTER_CONTRACT_ADDRESS: string;
      DOMAIN: number;
    };
  };
  UNSUPPORTED_NETWORK: string;
  ATTESTATION_URL: string;
}

export function getConfig(networkType: "mainnet" | "testnet"): NetworkConfig {
  return networkType === "mainnet" ? mainnetConfig : testnetConfig;
}
