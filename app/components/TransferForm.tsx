"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { SUPPORTED_NETWORKS, NETWORK_PARAMS } from "../constants"; // adjust the import path as needed
import useWallet from "../hooks/useWallet";
import { SlArrowRight } from "react-icons/sl";

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
    setDestinationAddress("");
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
    <div className="transfer-form bg-white p-8 rounded-lg text-gray-800 max-w-2xl mx-auto my-10 shadow">
      <h2 className="text-3xl font-bold mb-4">Transfer USDC across chains</h2>
      <p className="mb-8 text-gray-600">
        Circle&apos;s Cross-Chain Transfer Protocol enables USDC to be sent across
        blockchains without the need to be converted into an asset. All
        transfers are permissionless and executed on-chain.
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
              {Object.entries(SUPPORTED_NETWORKS).map(
                ([chainId, networkName]) => (
                  <option key={chainId} value={chainId}>
                    {networkName}
                  </option>
                )
              )}
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
              {Object.entries(SUPPORTED_NETWORKS).map(
                ([chainId, networkName]) => (
                  <option key={chainId} value={chainId}>
                    {networkName}
                  </option>
                )
              )}
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
              type="text"
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
