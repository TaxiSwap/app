"use client";
import React, { useState } from "react";
import FromSelector from "./FromSelectorPanel";
import { useTransferFormStore } from "@/app/store/useTransferFormStore";
import { useNetworkStore } from "@/app/store/useNetworkConfig";
import { useTransferFormLogic } from "@/app/hooks/useTransferFormLogic";
// import ToSelector from './ToSelector';
// import AmountInput from './AmountInput';
// import AddressInput from './AddressInput';
// import CostEstimation from './CostEstimation';
// import ConnectWalletButton from './ConnectWalletButton';

const MainPanel: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [gasCost, setGasCost] = useState<number>(0.69);
  const [taxiFee, setTaxiFee] = useState<number>(0.12);
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
    handleNetworkSwitch,
    handleSubmit,
  } = useTransferFormLogic();
  
  const finalReceivedAmount = amount - gasCost - taxiFee;

  return (
    <div className="flex justify-center items-center min-h-screen-80">
      <div className="bg-blackish p-8 shadow-custom rounded-36 text-white max-w-lg min-w-screen w-full">
        <FromSelector
          value={sourceChain}
          onChange={(e) => handleSourceChange(e)}
          networks={config.network_params}
          errorMessage={
            !isSourceNetworkAsWallet ? "Switch Wallet Network" : undefined
          }
          onErrorClick={handleNetworkSwitch}
          userBalance={userBalance}
        />
        {/* <AmountInput amount={amount} setAmount={setAmount} />
        <ToSelector />
        <AddressInput address={address} setAddress={setAddress} />
        <CostEstimation gasCost={gasCost} taxiFee={taxiFee} finalReceivedAmount={finalReceivedAmount} />
        <ConnectWalletButton /> */}
      </div>
    </div>
  );
};

export default MainPanel;
