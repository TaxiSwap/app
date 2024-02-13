"use client";
import { mainnetConfig } from "./config.mainnet";
import { testnetConfig } from "./config.testnet";
import { NetworkConfig } from "../types/NetworkConfig";

export function getConfig(networkType: "mainnet" | "testnet"): NetworkConfig {
  return networkType === "mainnet" ? mainnetConfig : testnetConfig;
}
