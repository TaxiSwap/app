"use client";
import React, { useState } from "react";
import { useNetworkStore } from "@/app/store/useNetworkConfig";
import { TransferModal } from "../TransferModal";
import { useTransferModalStore } from "@/app/store/useTransferModalStore";
import SwapButton from "../SwapButton";
import { useTransferFormStore } from "@/app/store/useTransferFormStore";
import SelectChain from "./SelectChain";
import AddressInput from "./AddressInput";
import AmountInput from "./AmountInput";
import TransferHeader from "./TransferHeader";
import { useTransferFormLogic } from "@/app/hooks/useTransferFormLogic";

const TransferForm = () => {
  const { config } = useNetworkStore();
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

  const { steps, isModalOpen, modalError, modalCanClose, setIsModalOpen, isTransferCompleted } =
    useTransferModalStore();

  const {
    userBalance,
    tipAmount,
    isSourceNetworkAsWallet,
    isAmountValid,
    isDestinationAddressValid,
    isTransferValid,
    isDestinationChainValid,
    handleSourceChange,
    handleSwapChains,
    handleDestinationChange,
    handleDestinationAddressChange,
    handleCopyAddress,
    handleAmountChange,
    handleAddMax,
    handleNetworkSwitch,
    handleSubmit,
  } = useTransferFormLogic();

  return (
    <div className="transfer-form bg-white p-8 rounded-lg text-gray-800 max-w-2xl mx-auto my-10 shadow">
      <TransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Transfer Progress"
        steps={steps}
        errorMessage={modalError}
        canClose={modalCanClose}
        transferCompleted={isTransferCompleted}
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
            errorMessage={
              !isDestinationChainValid
                ? "Destination cannot be Source"
                : undefined
            }
            onErrorClick={() => {}}
          />
        </div>
        <AddressInput
          value={destinationAddress}
          onChange={handleDestinationAddressChange}
          isValid={isDestinationAddressValid}
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
                !isTransferValid
                  ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          disabled={!isTransferValid}
        >
          NEXT
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
