"use client";
import { create } from "zustand";
import { ethers } from "ethers";
import { useNetworkStore } from "@/app/store/useNetworkConfig";

declare let window: any;

interface WalletState {
  account: string | null;
  networkName: string;
  networkChainId: number | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  error: Error | null;
  connectWallet: () => Promise<void>;
  switchNetwork: (chainId: string) => Promise<void>;
  disconnectWallet: () => void;
}

export const useWalletStore = create<WalletState>((set, get) => {
  const { config } = useNetworkStore.getState();

  const subscribeToWalletEvents = (provider: ethers.BrowserProvider) => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        // Handle accounts changed
        await get().connectWallet();
      });

      window.ethereum.on('chainChanged', async (_chainId: string) => {
        // Handle network change
        await get().connectWallet();
      });
    }
  };


  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum)  {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum, "any");
        const accounts = await provider.send("eth_requestAccounts", []);
        subscribeToWalletEvents(provider);
        const network = await provider.getNetwork();
        const signer = await provider.getSigner();
        const networkChainId = Number(network.chainId);
        const networkConfigName =
          config.networks[network.chainId.toString()] ||
          config.UNSUPPORTED_NETWORK;
        set({
          provider: provider,
          signer: signer,
          account: accounts[0],
          networkName: networkConfigName,
          networkChainId: networkChainId,
        });
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert(
        "Ethereum object not found, install MetaMask or other browser wallet."
      );
    }
  };

  const switchNetwork = async (chainId: string) => {
    try {
      // Ensure the chainId is in the correct hexadecimal format
      const formattedChainId = ethers.toQuantity(Number(chainId));
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: formattedChainId }],
      });
      connectWallet;
    } catch (error: any) {
      // if network not exists on wallet
      if (error.code === 4902) {
        try {
          const networkParams = config.network_params[chainId];
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkParams],
          });
          connectWallet;
        } catch (addError) {
          console.error("Error adding new network:", addError);
        }
      } else {
        console.error("Error switching networks:", error);
      }
    }
  };

  const disconnectWallet = () => {
    // Clears the wallet-related state
    set({
      account: null,
      networkName: config.UNSUPPORTED_NETWORK,
      networkChainId: null,
      provider: null,
      signer: null,
      error: null,
    });
  };

  return {
    account: null,
    networkName: config.UNSUPPORTED_NETWORK,
    networkChainId: null,
    provider: null,
    signer: null,
    error: null,
    connectWallet,
    switchNetwork,
    disconnectWallet,
  };
});
