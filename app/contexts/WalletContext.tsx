'use client'
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { getConfig } from "../config/configLoader";

declare let window: any;

interface WalletContextType {
  account: string | null;
  networkName: string;
  networkChainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  error: Error | null;
  connectWallet: () => Promise<void>;
  switchNetwork: (chainId: string ) => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [networkType, setNetworkType] = useState("mainnet");
  const config = getConfig(networkType as 'mainnet' | 'testnet');
  const [account, setAccount] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string>(config.UNSUPPORTED_NETWORK);
  const [networkChainId, setNetworkChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // Safely access localStorage only after the component has mounted
    const storedNetworkType = localStorage.getItem('networkType') === "testnet" ? "testnet" : "mainnet";
    setNetworkType(storedNetworkType);
  }, []);

  const disconnectWallet = () => {
    setAccount(null);
    setNetworkName("Unsupported Network");
    setNetworkChainId(null);
    setProvider(null);
    setSigner(null);
    setError(null);
  };
  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        setAccount(accounts[0]);
        const networkConfigName = config.networks[network.chainId.toString()];
        setNetworkName(networkConfigName || config.UNSUPPORTED_NETWORK);
        setNetworkChainId(network.chainId);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Ethereum object not found, install MetaMask or other browser wallet.");
    }
  }, [config.UNSUPPORTED_NETWORK, config.networks]);

  const checkNetwork = useCallback(async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const networkConfigName = config.networks[network.chainId.toString()];
      setNetworkName(networkConfigName || config.UNSUPPORTED_NETWORK);
      setNetworkChainId(network.chainId);
    }
  }, [config.UNSUPPORTED_NETWORK, config.networks]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (_: any) => checkNetwork());
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", checkNetwork);
        window.ethereum.removeListener("accountsChanged", checkNetwork);
      }
    };
  }, [checkNetwork]);

  const checkIfWalletIsConnected = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const network = await provider.getNetwork();
          const networkConfigName = config.networks[network.chainId.toString()];
          setNetworkName(networkConfigName || config.UNSUPPORTED_NETWORK);
          setNetworkChainId(network.chainId);
        } else {
          setAccount(null);
          setNetworkName(config.UNSUPPORTED_NETWORK);
        }
      } catch (error) {
        console.error("Error checking for wallet connection:", error);
      }
    }
  }, [config.UNSUPPORTED_NETWORK, config.networks]);

  useEffect(() => {
    checkIfWalletIsConnected();

    if (window.ethereum) {
      window.ethereum.on("chainChanged", (_: any) => checkNetwork());
      window.ethereum.on("accountsChanged", checkIfWalletIsConnected);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", checkNetwork);
        window.ethereum.removeListener("accountsChanged", checkIfWalletIsConnected);
      }
    };
  }, [checkIfWalletIsConnected, checkNetwork]);


  const switchNetwork = useCallback(
    async (chainId: string) => {
      try {
        // Ensure the chainId is in the correct hexadecimal format
        const formattedChainId = ethers.utils.hexValue(Number(chainId));

        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: formattedChainId }],
        });
        checkNetwork(); // Refresh the network state
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            // Ensure to provide the correctly formatted chainId for addition
            const networkParams = config.network_params[chainId];

            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [networkParams],
            });
            checkNetwork(); // Refresh the network state after adding the new network
          } catch (addError) {
            console.error("Error adding new network:", addError);
          }
        } else {
          console.error("Error switching networks:", error);
        }
      }
    },
    [checkNetwork, config.network_params]
  );

 
  return (
    <WalletContext.Provider
      value={{
        account,
        networkName,
        networkChainId,
        provider,
        signer,
        error,
        connectWallet,
        switchNetwork,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

