"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { SUPPORTED_NETWORKS, NETWORK_PARAMS } from "../constants"; // adjust the import path as needed
import useWallet from "../hooks/useWallet";

const TransferForm = () => {
  const [sourceChain, setSourceChain] = useState<string>(
    Object.keys(SUPPORTED_NETWORKS)[0]
  );
  const [destinationChain, setDestinationChain] = useState<string>(
    Object.keys(SUPPORTED_NETWORKS)[1]
  );
  const [destinationAddress, setDestinationAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { account, networkName, switchNetwork, networkChainId } = useWallet();

  useEffect(() => {
    setDestinationAddress('');
    setSourceChain(networkChainId?.toString() || "1");
  }, [account, networkChainId]);
  
   
  
  const handleSourceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    
    const selectedChainId = e.target.value;
    if (selectedChainId !== sourceChain && NETWORK_PARAMS[selectedChainId]) {
        const { chainId } = NETWORK_PARAMS[selectedChainId];
        switchNetwork(chainId); 
      }
      setSourceChain(e.target.value);
  };

  const handleDestinationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDestinationChain(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinationAddress(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCopyAddress = () => {
    setDestinationAddress(account as string);
};

  const handleAddMax = () => {
    // Implement functionality to add max amount
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement submit functionality
  };

  return (
    <div className="transfer-form bg-dark-blue p-8 rounded-lg text-white max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-4">Transfer USDC across chains</h2>
      <p className="mb-8">
        Circle&apos;s Cross-Chain Transfer Protocol enables USDC to be sent
        across blockchains without the need to be converted into a asset. All
        transfers are permissionless and executed on-chain.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            value={sourceChain}
            onChange={handleSourceChange}
            className="form-select bg-gray-800 text-white p-2 rounded-md"
          >
            {Object.entries(SUPPORTED_NETWORKS).map(
              ([chainId, networkName]) => (
                <option key={chainId} value={chainId}>
                  {networkName}
                </option>
              )
            )}
          </select>

          <select
            value={destinationChain}
            onChange={handleDestinationChange}
            className="form-select bg-gray-800 text-white p-2 rounded-md"
          >
            {Object.entries(SUPPORTED_NETWORKS).map(
              ([chainId, networkName]) => (
                <option key={chainId} value={chainId}>
                  {networkName}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={destinationAddress}
            onChange={handleAddressChange}
            placeholder="Destination Address"
            className="form-input w-full bg-gray-800 text-white p-2 rounded-md"
          />
          <button
            type="button"
            onClick={handleCopyAddress}
            className="copy-address-button text-sm bg-gray-700 p-2 mt-2 rounded-md"
          >
            COPY FROM WALLET
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Amount"
            className="form-input bg-gray-800 text-white p-2 rounded-md"
          />
          <button
            type="button"
            onClick={handleAddMax}
            className="add-max-button text-sm bg-gray-700 p-2 rounded-md"
          >
            ADD MAX
          </button>
        </div>

        <button className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300">
          NEXT
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
