"use client";
import { mainnetConfig } from "./config.mainnet";
import { testnetConfig } from "./config.testnet";

export interface Token {
  name: string;
  symbol: string;
  address: string | null; // Use null for native tokens
  icon: string;
}

export interface NetworkParam {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  icon: string;
  tokens: Token[];
}

export interface NetworkConfig {
  networks: {
    [chainId: string]: string;
  };
  network_params: {
    [chainId: string]: NetworkParam;
  };
  UNSUPPORTED_NETWORK: string;
}

export function getConfig(networkType: "mainnet" | "testnet"): NetworkConfig {
  return networkType === "mainnet" ? mainnetConfig : testnetConfig;
}
