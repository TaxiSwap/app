"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getConfig, NetworkConfig } from "../config/configLoader";
import { persist, createJSONStorage } from "zustand/middleware";

interface NetworkState {
  networkType: "mainnet" | "testnet";
  config: NetworkConfig;
  toggleNetworkType: () => void;
}

export const useNetworkStore = create<NetworkState>()(
  devtools(
    persist(
      (set, get) => ({
        networkType: "mainnet",
        config: getConfig("mainnet"),
        toggleNetworkType: () => {
          const newNetworkType =
            get().networkType === "mainnet" ? "testnet" : "mainnet";
          set({
            networkType: newNetworkType,
            config: getConfig(newNetworkType),
          });
          window.location.reload();
        }
      }),
      {
        name: "network-configuration-storage",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({ networkType: state.networkType }),
        onRehydrateStorage: () => (state, error) => {
          // This function runs after the store has been rehydrated from sessionStorage
          if (state) {
            // Check if rehydration occurred
            const currentNetworkType = state.networkType;
            state.config = getConfig(currentNetworkType); 
          }
        },
      }
    )
  )
);
