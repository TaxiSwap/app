"use client";
import React from "react";
import FromSelector from "./FromSelectorPanel";
import { useTransferFormStore } from "@/app/store/useTransferFormStore";
import { useNetworkStore } from "@/app/store/useNetworkConfig";
import { useTransferFormLogic } from "@/app/hooks/useTransferFormLogic";
import ToSelectorPanel from "./ToSelectorPanel";
import TransactionSummary from "./TransactionSummary";
import TransferButton from "./TransferButton";
import { TransferModal } from "../transferForm/TransferModal";
import { useTransferModalStore } from "@/app/store/useTransferModalStore";
import SwapChainsButton from "./SwapChainsButton";

const MainPanel: React.FC = () => {
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
  const {
    userBalance,
    tipAmount,
    isSourceNetworkAsWallet,
    isAmountValid,
    isDestinationAddressValid,
    isTransferValid,
    isDestinationChainValid,
    estimatedUserGasCostInEther,
    userGasSymbol,
    handleSourceChange,
    handleSwapChains,
    handleDestinationChange,
    handleDestinationAddressChange,
    handleCopyAddress,
    handleAmountChange,
    handleAddMax,
    handleAddHalf,
    handleNetworkSwitch,
    handleSubmit,
  } = useTransferFormLogic();
  const {
    steps,
    isModalOpen,
    modalError,
    modalCanClose,
    setIsModalOpen,
    isTransferCompleted,
  } = useTransferModalStore();

  return (
    <div className="flex justify-center items-center min-h-screen-80">
      <TransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Transfer Progress"
        steps={steps}
        errorMessage={modalError}
        canClose={modalCanClose}
        transferCompleted={isTransferCompleted}
      />
      <div className="bg-blackish p-8 shadow-custom rounded-36 text-white max-w-lg min-w-screen w-full relative">
        <FromSelector
          value={sourceChain}
          onChange={(e) => handleSourceChange(e)}
          networks={config.network_params}
          errorMessage={
            !isSourceNetworkAsWallet ? "Switch Wallet Network" : undefined
          }
          onErrorClick={handleNetworkSwitch}
          userBalance={userBalance}
          onMaxClick={handleAddMax}
          onHalfClick={handleAddHalf}
          amount={amount}
          handleAmountChange={handleAmountChange}
        />
        <SwapChainsButton handleSwapChains={handleSwapChains} />
        <ToSelectorPanel
          value={destinationChain}
          destinationAddress={destinationAddress}
          onChange={(e) => handleDestinationChange(e)}
          networks={config.network_params}
          errorMessage={
            !isDestinationChainValid ? "Destination cannot be same as source" : undefined
          }
          onErrorClick={() => {}}
          handleCopyAddress={handleCopyAddress}
          onAddressChange={handleDestinationAddressChange}
          isValid={isDestinationAddressValid}
        />
        <TransactionSummary
          gasCost={isSourceNetworkAsWallet ? estimatedUserGasCostInEther : null}
          gasUnit={userGasSymbol}
          tipAmount={tipAmount}
          tipUnit={"USDC"}
          finalAmount={tipAmount && isAmountValid ? amount - tipAmount : null}
          finalAmountUnit={"USDC"}
        />
        <TransferButton onClick={handleSubmit} disabled={!isTransferValid} />
      </div>
    </div>
  );
};

export default MainPanel;
