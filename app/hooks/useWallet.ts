import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  SUPPORTED_NETWORKS,
  UNSUPPORTED_NETWORK,
  NETWORK_PARAMS,
} from "../constants";

declare let window: any;

const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string>(UNSUPPORTED_NETWORK);
  const [networkChainId, setNetworkChainId] = useState<number | null>(null);
  
  const disconnect = () => {
    setAccount(null);
  };
  const connect = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        setAccount(accounts[0]);
        setNetworkName(
          SUPPORTED_NETWORKS[network.chainId.toString()] || UNSUPPORTED_NETWORK
        );
        setNetworkChainId(network.chainId);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.log("Ethereum object not found, install MetaMask.");
    }
  }, []);

  const checkNetwork = useCallback(async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      setNetworkName(
        SUPPORTED_NETWORKS[network.chainId.toString()] || UNSUPPORTED_NETWORK
      );
      setNetworkChainId(network.chainId);
    }
  }, []);

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
        // This method only checks for access and does not prompt a connection request
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const network = await provider.getNetwork();
          setNetworkName(
            SUPPORTED_NETWORKS[network.chainId.toString()] || UNSUPPORTED_NETWORK
          );
          setNetworkChainId(network.chainId);
        } else {
          // Handle the case where no accounts are connected
          setAccount(null);
          setNetworkName(UNSUPPORTED_NETWORK);
        }
      } catch (error) {
        console.error("Error checking for wallet connection:", error);
      }
    }
  }, []);

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
            const networkParams = {
              ...NETWORK_PARAMS[chainId],
              chainId: ethers.utils.hexValue(Number(chainId)),
            };

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
    [checkNetwork]
  );

 
  return { account, connect, networkName, disconnect, switchNetwork, networkChainId };
};

export default useWallet;
