"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useWallet } from "../../contexts/WalletContext";
import { useNetworkStore } from "@/app/store/useNetworkConfig";
import { getTokenBalance, getTipAmount } from "../../blockchain/utils";
import { approveTokenTransfer, depositForBurn } from "../../blockchain/actions";
import { Signer, ethers } from "ethers";
import { useMessage } from "../../contexts/MessageContext";
import { StatusModal } from "../StatusModal";
import { useTransaction } from "../../contexts/TransactionContext";
import SwapButton from "../SwapButton";
import { Provider } from "ethers";
import { useTransferFormStore } from "@/app/store/useTransferFormStore";
import SelectChain from "./SelectChain";
import AddressInput from "./AddressInput";
import AmountInput from "./AmountInput";
import TransferHeader from "./TransferHeader";

const TransferForm = () => {
  const { account, switchNetwork, networkChainId, signer, provider } =
    useWallet();
  const { config } = useNetworkStore();
  const {
    sourceChain,
    destinationChain,
    destinationAddress,
    amount,
    userBalance,
    isAddressValid,
    isAmountValid,
    setSourceChain,
    setDestinationChain,
    setDestinationAddress,
    setAmount,
    setUserBalance,
    setIsAddressValid,
    setIsAmountValid,
  } = useTransferFormStore();
  const { showMessage } = useMessage();

  useEffect(() => {
    setSourceChain(config.networks[0]);
    setDestinationChain(config.networks[1]);
    // This will update the sourceChain and destinationChain whenever the networkType changes
  }, [setSourceChain, setDestinationChain, config.networks]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { steps, dispatch } = useTransaction();

  const [modalError, setModalError] = useState<string | undefined>();

  // state to track if all steps are completed or an error occurred
  const [canClose, setCanClose] = useState(false);
  const [transferCompleted, setTransferCompleted] = useState(false);

  const [isSourceNetworkAsWallet, setIsSourceNetworkAsWallet] = useState(true);
  const [tipAmount, setTipAmount] = useState(0);
  const [enableTransfer, setEnableTransfer] = useState(false);

  useEffect(() => {
    const fetchTipAmount = async () => {
      const tipAmount = await getTipAmount(
        config.contracts[sourceChain]?.WHITEBRIDGE_CONTRACT_ADDRESS,
        config.contracts[destinationChain]?.DOMAIN,
        provider as Provider
      );
      console.log("tipAmount: ", tipAmount);
      setTipAmount(tipAmount || 0);
    };
    fetchTipAmount();
  }, [config.contracts, destinationChain, provider, sourceChain]);

  // Validations
  useEffect(() => {
    // Check if the source chain matches the wallet's network
    const isMismatch = networkChainId?.toString() !== sourceChain;
    if (account) {
      setIsSourceNetworkAsWallet(!isMismatch);
      setIsAddressValid(
        !!destinationAddress &&
          destinationAddress !== "0x0000000000000000000000000000000000000000" &&
          ethers.isAddress(destinationAddress)
      );

      setIsAmountValid(amount <= userBalance && amount > tipAmount);
      setEnableTransfer(
        isSourceNetworkAsWallet && isAddressValid && isAmountValid
      );
    }
  }, [
    sourceChain,
    networkChainId,
    account,
    destinationAddress,
    config.contracts,
    destinationChain,
    provider,
    amount,
    userBalance,
    tipAmount,
    isSourceNetworkAsWallet,
    isAddressValid,
    isAmountValid,
    setIsAddressValid,
    setIsAmountValid,
  ]);

  useEffect(() => {
    // Reset when modal is closed
    if (!isModalOpen) {
      setCanClose(false);
      setTransferCompleted(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    // Determine if all steps are completed or if there's an error
    const allStepsCompleted = steps.every(
      (step) => step.status === "completed"
    );
    setTransferCompleted(allStepsCompleted);
    const hasError = modalError !== undefined;
    setCanClose(allStepsCompleted || hasError);
  }, [steps, modalError]);

  useEffect(() => {
    setDestinationAddress("");
    setSourceChain(
      networkChainId?.toString() || Object.keys(config.networks)[0]
    );
    let initialDestinationChain =
      networkChainId?.toString() || Object.keys(config.networks)[1];
    if (initialDestinationChain === sourceChain) {
      initialDestinationChain =
        Object.keys(config.networks).find((key) => key !== sourceChain) || "";
    }
    setDestinationChain(initialDestinationChain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, config.networks]);

  useEffect(() => {
    if (networkChainId?.toString() !== sourceChain) return;
    const fetchBalance = async () => {
      try {
        const balance = await getTokenBalance(
          account as string,
          config.contracts[sourceChain]?.USDC_CONTRACT_ADDRESS,
          provider as Provider
        );
        setUserBalance(balance);
      } catch (error) {
        console.error("Failed to fetch token balance:", error);
        setUserBalance(0);
      }
    };
    if (!isSourceNetworkAsWallet) fetchBalance();
  }, [
    account,
    config.contracts,
    config.networks,
    provider,
    sourceChain,
    isModalOpen,
    isSourceNetworkAsWallet,
    networkChainId,
    setUserBalance,
  ]);

  const handleSourceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSourceChain = e.target.value;
    setSourceChain(newSourceChain);

    // Automatically update destination chain if it matches the new source chain
    if (destinationChain === newSourceChain) {
      const newDestinationChain = Object.keys(config.networks).find(
        (key) => key !== newSourceChain
      );
      setDestinationChain(newDestinationChain || "");
    }
  };

  const handleDestinationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDestinationChain = e.target.value;
    setDestinationChain(newDestinationChain);

    // Automatically update source chain if it matches the new destination chain
    if (sourceChain === newDestinationChain) {
      const newSourceChain = Object.keys(config.networks).find(
        (key) => key !== newDestinationChain
      );
      setSourceChain(newSourceChain || "");
    }
  };

  const handleSwapChains = () => {
    const source = sourceChain;
    const destination = destinationChain;
    setDestinationChain(source);
    setSourceChain(destination);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinationAddress(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleCopyAddress = () => {
    setDestinationAddress(account as string);
  };

  const handleAddMax = () => {
    setAmount(userBalance);
  };

  const handleNetworkSwitch = async () => {
    try {
      // Assuming `sourceChain` is your desired chain ID to switch to
      await switchNetwork(sourceChain);
      // Optionally, show a success message or perform some action after successfully switching networks
    } catch (error) {
      console.error("Failed to switch network:", error);
      // Handle or display the error appropriately
    }
  };

  const openModalWithResetState = () => {
    // Reset step statuses
    dispatch({ type: "RESET_STEPS" });
    setModalError(undefined); // Clear any previous error messages
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
      dispatch({
        type: "UPDATE_STEP_STATUS",
        stepIndex: currentStep,
        status: "working",
      });
      const approvalTx = await approveTokenTransfer(
        usdcAddress,
        config.contracts[sourceChain]?.WHITEBRIDGE_CONTRACT_ADDRESS,
        ethers.parseUnits(amount.toString(), 6),
        signer as Signer
      );
      showMessage("Approval Succeeded: " + approvalTx, "success");
      dispatch({
        type: "UPDATE_STEP_STATUS",
        stepIndex: currentStep++,
        status: "completed",
      });

      // Step 2: Deposit token to contract (Sign with wallet)
      dispatch({
        type: "UPDATE_STEP_STATUS",
        stepIndex: currentStep,
        status: "working",
      });
      const depositTx = await depositForBurn(
        config.contracts[sourceChain]?.WHITEBRIDGE_CONTRACT_ADDRESS,
        ethers.parseUnits(amount.toString(), 6),
        config.contracts[destinationChain]?.DOMAIN,
        destinationAddress,
        usdcAddress,
        signer as Signer
      );
      showMessage("Deposit succeeded: " + depositTx, "success");
      dispatch({
        type: "UPDATE_STEP_STATUS",
        stepIndex: currentStep++,
        status: "completed",
      });

      dispatch({
        type: "UPDATE_STEP_STATUS",
        stepIndex: currentStep,
        status: "working",
      });

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
        });
        const data = await response.json();

        if (response.ok) {
          showMessage("Message receive succeeded: " + data.hash, "success");
        } else {
          throw new Error(data.error || "Unknown Error");
        }
        dispatch({
          type: "UPDATE_STEP_STATUS",
          stepIndex: currentStep++,
          status: "completed",
        });
      } catch (error: unknown) {
        if (error instanceof Error) throw new Error(error.message);
        throw Error("Unexpected Error on receive!");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      showMessage(message, "error");
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setModalError(errorMessage);
      dispatch({
        type: "UPDATE_STEP_STATUS",
        stepIndex: currentStep,
        status: "error",
      });
    }
  };

  return (
    <div className="transfer-form bg-white p-8 rounded-lg text-gray-800 max-w-2xl mx-auto my-10 shadow">
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Transfer Progress"
        steps={steps}
        errorMessage={modalError}
        canClose={canClose}
        transferCompleted={transferCompleted}
      />
    <TransferHeader />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-end mb-4">
          <SelectChain
            key={"source"}
            label="From:"
            value={sourceChain}
            onChange={(e) => handleSourceChange(e)}
            networks={config.networks}
            errorMessage={
              !isSourceNetworkAsWallet ? "Switch Wallet Network" : undefined
            }
            onErrorClick={handleNetworkSwitch}
          />
          <SwapButton onSwap={handleSwapChains} />
          <SelectChain
            key={"destination"}
            label="To:"
            value={destinationChain}
            onChange={(e) => handleDestinationChange(e)}
            networks={config.networks}
          />
        </div>
        <AddressInput
          value={destinationAddress}
          onChange={handleAddressChange}
          isValid={isAddressValid}
          errorMessage="Please enter a valid address."
          handleCopyAddress={handleCopyAddress}
        />
        <AmountInput
          value={amount}
          balance={userBalance}
          onChange={handleAmountChange}
          isValid={isAmountValid}
          onMaxClick={handleAddMax} 
          errorMessage="Invalid amount." 
        />
        <button
          className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none shadow transition duration-300
              ${
                !enableTransfer
                  ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          disabled={!enableTransfer}
        >
          NEXT
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
