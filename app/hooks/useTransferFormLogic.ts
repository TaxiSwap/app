import { ChangeEvent, useEffect, useState } from "react";
import { useWalletStore } from "@/app/store/useWalletStore";
import { useNetworkStore } from "@/app/store/useNetworkConfig";
import { useTransferFormStore } from "../store/useTransferFormStore";
import { getTokenBalance, getTipAmount } from "@/app/blockchain/utils";
import { Provider, Signer, ethers } from "ethers";
import { useTransferModalStore } from "@/app/store/useTransferModalStore";
import {
  approveTokenTransfer,
  callReceiveMessage,
  depositForBurn,
} from "@/app/blockchain/actions";

export const useTransferFormLogic = () => {
  const { account, switchNetwork, networkChainId, signer, provider } =
    useWalletStore();

  const {
    steps,
    isModalOpen,
    modalError,
    modalCanClose,
    setIsModalOpen,
    setModalError,
    setModalCanClose,
    setSteps,
    updateStepStatus,
    resetSteps,
    setIsTransferCompleted,
  } = useTransferModalStore();

  const {
    sourceChain,
    destinationChain,
    destinationAddress,
    amount,
    setAmount,
    setDestinationAddress,
    setDestinationChain,
    setSourceChain,
  } = useTransferFormStore();
  const { config } = useNetworkStore();

  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [userBalance, setUserBalance] = useState<number | null>(null);
  const [isDestinationAddressValid, setIsDestinationAddressValid] =
    useState<boolean>(false);
  const [isDestinationChainValid, setIsDestinationChainValid] =
    useState<boolean>(false);
  const [isAmountValid, setIsAmountValid] = useState<boolean>(false);
  const [isTransferValid, setIsTransferValid] = useState<boolean>(false);
  const [isSourceNetworkAsWallet, setIsSourceNetworkAsWallet] =
    useState<boolean>(false);

  useEffect(() => {
    if (!provider || !config) return;

    const fetchTipAmount = async () => {
      if (!sourceChain || !destinationChain || !provider) return;
      try {
        const tipAmount = await getTipAmount(
          config.contracts[sourceChain]?.TAXISWAP_CONTRACT_ADDRESS,
          config.contracts[destinationChain]?.DOMAIN,
          provider as Provider
        );
        console.log("Tip: ", tipAmount);
        setTipAmount(tipAmount || null);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserBalance = async () => {
      try {
        const balance = await getTokenBalance(
          account as string,
          config.contracts[sourceChain]?.USDC_CONTRACT_ADDRESS,
          provider as Provider
        );
        setUserBalance(balance);
      } catch (error) {
        console.error("Failed to fetch token balance:", error);
        setUserBalance(null);
      }
    };

    const validateDestinationAddress = () => {
      setIsDestinationAddressValid(
        !!destinationAddress &&
          destinationAddress !== "0x0000000000000000000000000000000000000000" &&
          ethers.isAddress(destinationAddress)
      );
    };

    const validateDestinationChain = () => {
      setIsDestinationChainValid(sourceChain != destinationChain);
    };

    const validateAmount = () => {
      if (userBalance && tipAmount)
        setIsAmountValid(amount <= userBalance && amount > tipAmount);
      else setIsAmountValid(false);
    };

    const validateSourceChainAsWallet = () => {
      setIsSourceNetworkAsWallet(networkChainId?.toString() === sourceChain);
    };

    const validateTransfer = () => {
      setIsTransferValid(
        isDestinationAddressValid &&
          isAmountValid &&
          isSourceNetworkAsWallet &&
          isDestinationChainValid
      );
    };

    fetchTipAmount();
    fetchUserBalance();
    validateDestinationAddress();
    validateDestinationChain();
    validateAmount();
    validateSourceChainAsWallet();
    validateTransfer();
  }, [
    account,
    amount,
    config,
    destinationAddress,
    destinationChain,
    isAmountValid,
    isDestinationAddressValid,
    isDestinationChainValid,
    isSourceNetworkAsWallet,
    networkChainId,
    provider,
    sourceChain,
    tipAmount,
    userBalance,
  ]);

  const handleSourceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSourceChain(e.target.value);
  };

  const handleDestinationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDestinationChain(e.target.value);
  };

  const handleSwapChains = () => {
    const source = sourceChain;
    const destination = destinationChain;
    setDestinationChain(source);
    setSourceChain(destination);
  };

  const handleDestinationAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinationAddress(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleCopyAddress = () => {
    setDestinationAddress(account as string);
  };

  const handleAddMax = () => {
    setAmount(userBalance || 0);
  };

  const handleNetworkSwitch = async () => {
    try {
      await switchNetwork(sourceChain);
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  };

  const openModalWithResetState = () => {
    resetSteps(); // Reset step statuses
    setModalError(null); // Clear any previous error messages
    setModalCanClose(false);
    setIsTransferCompleted(false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openModalWithResetState();
    let currentStep = 0; // To track the current step

    try {
      if (networkChainId === null) throw new Error("Network chain ID is null.");

      const chainIdKey = String(networkChainId);
      const usdcAddress = config.contracts[chainIdKey]?.USDC_CONTRACT_ADDRESS;
      if (!usdcAddress)
        throw new Error(
          `USDC contract address not found for the given networkChainId: ${networkChainId}`
        );

      // Step 1: Approve token transfer (Sign with wallet)
      updateStepStatus(currentStep, "working");
      const approvalTx = await approveTokenTransfer(
        usdcAddress,
        config.contracts[sourceChain]?.TAXISWAP_CONTRACT_ADDRESS,
        ethers.parseUnits(amount.toString(), 6),
        signer as Signer
      );
      // showMessage("Approval Succeeded: " + approvalTx, "success");
      updateStepStatus(currentStep++, "completed");

      // Step 2: Deposit token to contract (Sign with wallet)
      updateStepStatus(currentStep, "working");
      const depositTx = await depositForBurn(
        config.contracts[sourceChain]?.TAXISWAP_CONTRACT_ADDRESS,
        ethers.parseUnits(amount.toString(), 6),
        config.contracts[destinationChain]?.DOMAIN,
        destinationAddress,
        usdcAddress,
        signer as Signer
      );
      // showMessage("Deposit succeeded: " + depositTx, "success");
      updateStepStatus(currentStep++, "completed");

      updateStepStatus(currentStep, "working");

      try {
        const response = await fetch("/api/blockchain/receiveMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            depositTx,
            sourceChain,
            destinationChain,
          }),
          cache: "no-store",
        });
        const data = await response.json();

        if (response.ok) {
          // showMessage("Message receive succeeded: " + data.hash, "success");
          setIsTransferCompleted(true);
          setModalCanClose(true);
        } else {
          throw new Error(data.error || "Unknown Error");
        }
        updateStepStatus(currentStep, "completed");
      } catch (error: unknown) {
        if (error instanceof Error) throw new Error(error.message);
        throw Error("Unexpected Error on receive!");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      // showMessage(message, "error");
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setModalError(errorMessage);
      setModalCanClose(true);
      updateStepStatus(currentStep, "error");
    }
  };

  return {
    userBalance,
    tipAmount,
    isSourceNetworkAsWallet,
    isDestinationAddressValid,
    isDestinationChainValid,
    isAmountValid,
    isTransferValid,
    handleSourceChange,
    handleSwapChains,
    handleDestinationChange,
    handleDestinationAddressChange,
    handleCopyAddress,
    handleAmountChange,
    handleAddMax,
    handleNetworkSwitch,
    handleSubmit,
  };
};
