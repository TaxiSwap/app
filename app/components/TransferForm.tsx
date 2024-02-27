"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useWallet } from "../contexts/WalletContext";
import { useNetworkConfigContext } from "../contexts/NetworkConfigContext";
import { getTokenBalance, getTipAmount } from "../blockchain/utils";
import { approveTokenTransfer, depositForBurn } from "../blockchain/actions";
import { Signer, ethers } from "ethers";
import { useMessage } from "../contexts/MessageContext";
import { StatusModal } from "./StatusModal";
import { useTransaction } from "../contexts/TransactionContext";
import SwapButton from "./SwapButton";
import { Provider } from "ethers";

const TransferForm = () => {
  const { account, switchNetwork, networkChainId, signer, provider } =
    useWallet();
  const { config } = useNetworkConfigContext();
  const { showMessage } = useMessage();

  const [sourceChain, setSourceChain] = useState<string>(
    Object.keys(config.networks)[0]
  );
  const [destinationChain, setDestinationChain] = useState<string>(
    Object.keys(config.networks)[0]
  );
  const [destinationAddress, setDestinationAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { steps, dispatch } = useTransaction();

  const [modalError, setModalError] = useState<string | undefined>();

  // state to track if all steps are completed or an error occurred
  const [canClose, setCanClose] = useState(false);
  const [transferCompleted, setTransferCompleted] = useState(false);

  const [userBalance, setUserBalance] = useState(0);

  const [isSourceNetworkAsWallet, setIsSourceNetworkAsWallet] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);

  useEffect(() => {
    const fetchTipAmount = async () => {
      const tipAmount = await getTipAmount(
        config.contracts[sourceChain]?.WHITEBRIDGE_CONTRACT_ADDRESS,
        config.contracts[destinationChain]?.DOMAIN,
        provider as Provider
      );
      console.log("tipAmount: ", tipAmount)
      setTipAmount(tipAmount || 0);
    };
    fetchTipAmount();
  }, [config.contracts, destinationChain, provider, sourceChain]);

  // Validations
  useEffect(() => {
    // Check if the source chain matches the wallet's network
    const isMismatch = networkChainId?.toString() !== sourceChain;
    if (account) {
      setIsSourceNetworkAsWallet(isMismatch);
      setIsAddressValid(
        !!destinationAddress &&
          destinationAddress !== "0x0000000000000000000000000000000000000000" &&
          ethers.isAddress(destinationAddress)
      );

      setIsAmountValid(amount <= userBalance && amount > tipAmount);
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
      <h2 className="text-3xl font-bold mb-4">Transfer USDC across chains</h2>
      <p className="mb-8 text-gray-600">
        Our USDC bridge simplifies cross-network transactions, offering a
        cost-effective and straightforward solution for transferring your
        digital currency. Designed for ease and efficiency, it ensures seamless
        and affordable transfers across chains, making it the go-to choice for
        managing your USDC assets.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-end mb-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700">
              From{" "}
            </label>
            {isSourceNetworkAsWallet && (
              <div className="text-red-500 text-xs mt-2">
                Warning:
                <button
                  className="ml-2 text-blue-500 text-xs"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNetworkSwitch();
                  }}
                >
                  Switch Wallet Network
                </button>
              </div>
            )}
            <select
              value={sourceChain}
              onChange={handleSourceChange}
              className="mt-1 block w-full px-4 py-2 text-base font-normal bg-gray-200 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              {Object.entries(config.networks).map(([chainId, networkName]) => (
                <option key={chainId} value={chainId}>
                  {networkName}
                </option>
              ))}
            </select>
          </div>
          <SwapButton onSwap={handleSwapChains} />
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700">
              To
            </label>
            <select
              value={destinationChain}
              onChange={handleDestinationChange}
              className="mt-1 block w-full px-4 py-2 text-base font-normal bg-gray-200 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              {Object.entries(config.networks).map(([chainId, networkName]) => (
                <option key={chainId} value={chainId}>
                  {networkName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="block">
          <span className="text-gray-700">Destination Address </span>
          {!isAddressValid && (
            <span className="text-red-500 text-xs">
              Please enter a valid address.
            </span>
          )}
          <div className="mt-1 relative">
            <input
              type="text"
              value={destinationAddress}
              onChange={handleAddressChange}
              placeholder="0x..."
              className="form-input w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleCopyAddress}
              className="absolute right-2 top-2 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1"
            >
              COPY FROM WALLET
            </button>
          </div>
        </label>

        <label className="block">
          <span className="text-gray-700">Amount </span>
          {!isAmountValid && (
            <span className="text-red-500 text-xs">Wrong amount</span>
          )}
          <div className="mt-1 relative">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="form-input w-full py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-500 text-sm">
                Balance: {isSourceNetworkAsWallet ? '?' : userBalance} USDC
              </span>
              <button
                type="button"
                onClick={handleAddMax}
                className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1"
              >
                ADD MAX
              </button>
            </div>
          </div>
        </label>

        <button className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none shadow transition duration-300">
          NEXT
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
