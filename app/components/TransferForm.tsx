"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useWallet } from "../contexts/WalletContext";
import { useNetworkConfigContext } from "../contexts/NetworkConfigContext";
import { SlArrowRight } from "react-icons/sl";
import { approveTokenTransfer } from "../blockchain/actions";
import { Signer, utils } from "ethers";
import { useMessage } from "../contexts/MessageContext";

const TransferForm = () => {
  const { account, switchNetwork, networkChainId, signer } = useWallet();
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

  useEffect(() => {
    setDestinationAddress("");
    setSourceChain(
      networkChainId?.toString() || Object.keys(config.networks)[0]
    );
  }, [account, networkChainId, config.networks]);

  const handleSourceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedChainId = e.target.value;
    if (selectedChainId !== sourceChain) {
      switchNetwork(selectedChainId);
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
    setAmount(Number(e.target.value));
  };

  const handleCopyAddress = () => {
    setDestinationAddress(account as string);
  };

  const handleAddMax = () => {
    // Implement functionality to add max amount
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (networkChainId !== null) {
      const chainIdKey = String(networkChainId);
      const usdcAddress = config.contracts[chainIdKey]?.USDC_CONTRACT_ADDRESS;

      if (usdcAddress) {
        try {
          const approvalTx = await approveTokenTransfer(
            usdcAddress,
            config.contracts[sourceChain]?.TOKEN_MESSENGER_CONTRACT_ADDRESS,
            utils.parseUnits(amount.toString(), 6),
            signer as Signer
          );
          showMessage("Approval Succeed: " + approvalTx, "success");
        } catch (error: unknown) {
          if (error instanceof Error) showMessage(error.message, "error");
          else showMessage("Unknown approval error", "error");
        }
      } else {
        console.error(
          "USDC contract address not found for the given networkChainId:",
          networkChainId
        );
      }
    } else {
      console.error("Network chain ID is null.");
    }
  };

  return (
    <div className="transfer-form bg-white p-8 rounded-lg text-gray-800 max-w-2xl mx-auto my-10 shadow">
      <h2 className="text-3xl font-bold mb-4">Transfer USDC across chains</h2>
      <p className="mb-8 text-gray-600">
        Circle&apos;s Cross-Chain Transfer Protocol enables USDC to be sent
        across blockchains without the need to be converted into an asset. All
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
