"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useWallet } from "../contexts/WalletContext";
import { useNetworkConfigContext } from "../contexts/NetworkConfigContext";
import { SlArrowRight } from "react-icons/sl";
import {
  approveTokenTransfer,
  depositForBurn,
  callReceiveMessage,
} from "../blockchain/actions";
import { Signer, ethers, utils } from "ethers";
import { useMessage } from "../contexts/MessageContext";
import {
  getMessageHashFromTransaction,
  pollAttestationStatus,
} from "../blockchain/utils";
import { StatusModal, StatusModalProps } from "./StatusModal";

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
  const [stepStatuses, setStepStatuses] = useState<StatusModalProps['steps']>([
    {
      name: "Approve Token Transfer",
      status: "pending",
      requiresWalletInteraction: true,
    },
    {
      name: "Deposit Token",
      status: "pending",
      requiresWalletInteraction: true,
    },
    {
      name: "Get Message Hash",
      status: "pending",
      requiresWalletInteraction: false,
    },
    {
      name: "Wait for Attestation",
      status: "pending",
      requiresWalletInteraction: false,
    },
    {
      name: "Switch Network",
      status: "pending",
      requiresWalletInteraction: true,
    },
    {
      name: "Receive Tokens",
      status: "pending",
      requiresWalletInteraction: true,
    },
  ]);

  const [modalError, setModalError] = useState<string | undefined>();

  useEffect(() => {
    setDestinationAddress("");
    setSourceChain(
      networkChainId?.toString() || Object.keys(config.networks)[0]
    );
    const initialDestinationChain =
      networkChainId?.toString() || Object.keys(config.networks)[0];
    setDestinationChain(initialDestinationChain);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, config.networks]);

  const handleSourceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSourceChain(e.target.value);
  };

  const handleDestinationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDestinationChain(e.target.value);
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
    // Implement functionality to add max amount
  };

  const openModalWithResetState = () => {
    // Reset step statuses
    setStepStatuses(
      stepStatuses.map((step) => ({ ...step, status: "pending" }))
    );
    setModalError(undefined); // Clear any previous error messages
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openModalWithResetState();
    let currentStep = 0; // To track the current step

    const updateStepStatus = (
      stepIndex: number,
      status: "pending" | "completed" | "working" | "error"
    ) => {
      setStepStatuses((prevStatuses) =>
        prevStatuses.map((step, index) =>
          index === stepIndex ? { ...step, status } : step
        )
      );
    };

    try {
      if (networkChainId === null) throw new Error("Network chain ID is null.");

      const chainIdKey = String(networkChainId);
      const usdcAddress = config.contracts[chainIdKey]?.USDC_CONTRACT_ADDRESS;
      if (!usdcAddress)
        throw new Error(
          `USDC contract address not found for the given networkChainId: ${networkChainId}`
        );

      // Step 1: Approve token transfer (Sign with wallet)
      updateStepStatus(currentStep, "working"); // Update status to working
      const approvalTx = await approveTokenTransfer(
        usdcAddress,
        config.contracts[sourceChain]?.TOKEN_MESSENGER_CONTRACT_ADDRESS,
        utils.parseUnits(amount.toString(), 6),
        signer as Signer
      );
      showMessage("Approval Succeeded: " + approvalTx, "success");
      updateStepStatus(currentStep++, "completed"); // Update status to completed and move to next step

      // Step 2: Deposit token to contract (Sign with wallet)
      updateStepStatus(currentStep, "working");
      const depositTx = await depositForBurn(
        config.contracts[sourceChain]?.TOKEN_MESSENGER_CONTRACT_ADDRESS,
        utils.parseUnits(amount.toString(), 6),
        config.contracts[destinationChain]?.DOMAIN,
        destinationAddress,
        usdcAddress,
        signer as Signer
      );
      showMessage("Deposit succeeded: " + depositTx, "success");
      updateStepStatus(currentStep++, "completed");

      // Step 3: Get Message Hash
      updateStepStatus(currentStep, "working");
      const { messageHash, messageBytes } = await getMessageHashFromTransaction(
        depositTx,
        provider as ethers.providers.Provider
      );
      showMessage("Message Hash succeeded: " + messageHash, "success");
      updateStepStatus(currentStep++, "completed");

      // Step 4: Wait for attestation
      updateStepStatus(currentStep, "working");
      const attestationResponse = await pollAttestationStatus(
        config.ATTESTATION_URL,
        messageHash
      );
      updateStepStatus(currentStep++, "completed");

      // Step 5: Switch Network (Approve with wallet)
      updateStepStatus(currentStep, "working");
      await switchNetwork(destinationChain);
      updateStepStatus(currentStep++, "completed");

      // Step 6: Receive tokens
      updateStepStatus(currentStep, "working");
      if (attestationResponse.attestation === undefined)
        throw new Error("Attestation is undefined");

      const receiveMessage = await callReceiveMessage(
        config.contracts[destinationChain]
          ?.MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
        messageBytes,
        attestationResponse.attestation,
        provider as ethers.providers.Provider,
        signer as Signer
      );
      showMessage("Message receive succeeded: " + receiveMessage, "success");
      updateStepStatus(currentStep, "completed");

      // Optionally, close the modal after a delay or based on user interaction
      // setTimeout(() => setIsModalOpen(false), 2000); // Close modal after 2 seconds
    } catch (error: unknown) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Unknown error";
      showMessage(message, "error");
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setModalError(errorMessage); // Set the error message state to be displayed in the modal
      updateStepStatus(currentStep, "error");
    }
  };

  return (
    <div className="transfer-form bg-white p-8 rounded-lg text-gray-800 max-w-2xl mx-auto my-10 shadow">
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Transfer Progress"
        steps={stepStatuses}
        errorMessage={modalError}
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
              From
            </label>
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
          <SlArrowRight className="mx-4 text-4xl text-gray-600" />
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
          <span className="text-gray-700">Destination Address</span>
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
          <span className="text-gray-700">Amount</span>
          <div className="mt-1 flex space-x-2">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="form-input flex-1 px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddMax}
              className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2"
            >
              ADD MAX
            </button>
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
