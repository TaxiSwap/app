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
  contracts: {};
  UNSUPPORTED_NETWORK: string;
}

export function getConfig(networkType: "mainnet" | "testnet"): NetworkConfig {
  return networkType === "mainnet" ? mainnetConfig : testnetConfig;
}
