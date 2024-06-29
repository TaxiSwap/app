import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWalletStore } from "@/app/store/useWalletStore";
import TaxiSwapABI from "@/app/utils/blockchain/contracts/TaxiSwap.abi.json";
import { chainConfigs } from "@/app/config/ChainConfigMap";
import { MdClose } from "react-icons/md";

const ContractInterface: React.FC = () => {
  const { account, provider, signer } = useWalletStore();
  const { networkChainId } = useWalletStore();
  const [selectedChainId, setSelectedChainId] = useState("");

  const [defaultTipAmount, setDefaultTipAmount] = useState<string>("0");
  const [newTipAmount, setNewTipAmount] = useState<string>("");
  const [newOwner, setNewOwner] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [addressToModify, setAddressToModify] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [roles, setRoles] = useState<{ [key: string]: string }>({});
  const [isPausing, setIsPausing] = useState<boolean>(false);
  const [isContractPaused, setIsContractPaused] = useState<boolean | null>(
    null
  );
  const [withdrawToAddress, setWithdrawToAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  // Collect taxiswap contract addresses
  const predefinedAddresses: { [key: string]: string } = Object.entries(
    chainConfigs
  ).reduce<{ [key: string]: string }>((acc, [chainId, config]) => {
    if (config.taxiSwapContractAddress) {
      acc[chainId] = config.taxiSwapContractAddress;
    }
    return acc;
  }, {});

  useEffect(() => {
    const getContractInfo = async () => {
      if (provider && contractAddress) {
        const contract = new ethers.Contract(
          contractAddress,
          TaxiSwapABI,
          provider
        );
        const amount = await contract.defaultTipAmount();
        const paused = await contract.paused();
        const defaultAdminRole = await contract.DEFAULT_ADMIN_ROLE();
        const oracleRole = await contract.ORACLE_ROLE();
        setRoles({
          DEFAULT_ADMIN_ROLE: defaultAdminRole,
          ORACLE_ROLE: oracleRole,
        });
        setDefaultTipAmount(ethers.formatUnits(amount, 6));
        setIsContractPaused(paused);
      }
    };

    getContractInfo();
  }, [provider, contractAddress]);

  useEffect(() => {
    setSelectedChainId(networkChainId?.toString() || "");
  }, [networkChainId]);

  const handleSetDefaultTipAmount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || !account) return;
    const contractWithSigner = new ethers.Contract(
      contractAddress,
      TaxiSwapABI,
      signer
    );

    const tx = await contractWithSigner.setDefaultTipAmount(
      ethers.parseUnits(newTipAmount, 6)
    );
    await tx.wait();
    setNewTipAmount("");
  };

  const handleTransferOwnership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || !account) return;
    const contractWithSigner = new ethers.Contract(
      contractAddress,
      TaxiSwapABI,
      provider
    );

    const tx = await contractWithSigner.transferOwnership(newOwner);
    await tx.wait();
    setNewOwner("");
  };

  const handlePauseContract = async () => {
    if (!provider || !account || isContractPaused === true) return;
    setIsPausing(true);
    const contractWithSigner = new ethers.Contract(
      contractAddress,
      TaxiSwapABI,
      signer
    );
    try {
      const tx = await contractWithSigner.pause();
      await tx.wait();
      setIsContractPaused(true);
    } catch (error) {
      console.error("Error pausing the contract:", error);
    }
    setIsPausing(false);
  };

  const handleUnpauseContract = async () => {
    if (!provider || !account || isContractPaused === false) return;
    setIsPausing(true);
    const contractWithSigner = new ethers.Contract(
      contractAddress,
      TaxiSwapABI,
      signer
    );
    try {
      const tx = await contractWithSigner.unpause();
      await tx.wait();
      setIsContractPaused(false);
    } catch (error) {
      console.error("Error unpausing the contract:", error);
    }
    setIsPausing(false);
  };

  const selectPredefinedAddress = (address: string) => {
    setContractAddress(address);
  };

  const handleGrantRole = async () => {
    if (!provider || !contractAddress || !addressToModify || !selectedRole)
      return;
    const contractWithSigner = new ethers.Contract(
      contractAddress,
      TaxiSwapABI,
      signer
    );

    try {
      const tx = await contractWithSigner.grantRole(
        selectedRole,
        addressToModify
      );
      await tx.wait();
      alert(`Role granted successfully to ${addressToModify}`);
    } catch (error) {
      console.error("Error granting role:", error);
      alert("Error granting role. See console for details.");
    }
  };

  const handleRevokeRole = async () => {
    if (!provider || !contractAddress || !addressToModify || !selectedRole)
      return;
    const contractWithSigner = new ethers.Contract(
      contractAddress,
      TaxiSwapABI,
      signer
    );

    try {
      const tx = await contractWithSigner.revokeRole(
        selectedRole,
        addressToModify
      );
      await tx.wait();
      alert(`Role revoked successfully from ${addressToModify}`);
    } catch (error) {
      console.error("Error revoking role:", error);
      alert("Error revoking role. See console for details.");
    }
  };

  const handleWithdrawETH = async () => {
    if (!provider || !contractAddress) return;
    const contract = new ethers.Contract(contractAddress, TaxiSwapABI, signer);

    try {
      const tx = await contract.withdrawETH(withdrawToAddress, withdrawAmount);
      await tx.wait();
      alert("ETH withdrawn successfully.");
    } catch (error) {
      console.error("Error withdrawing ETH:", error);
      alert("Error withdrawing ETH. See console for details.");
    }
  };

  const handleWithdrawTips = async () => {
    if (!provider || !contractAddress) return;
    const contract = new ethers.Contract(contractAddress, TaxiSwapABI, signer);

    try {
      const tx = await contract.withdrawTips();
      await tx.wait();
      alert("Tips withdrawn successfully.");
    } catch (error) {
      console.error("Error withdrawing tips:", error);
      alert("Error withdrawing tips. See console for details.");
    }
  };

  const handleWithdrawTokens = async () => {
    if (!provider || !contractAddress) return;
    const contract = new ethers.Contract(contractAddress, TaxiSwapABI, signer);

    try {
      const tx = await contract.withdrawTokens(
        tokenAddress,
        withdrawToAddress,
        withdrawAmount
      );
      await tx.wait();
      alert("Tokens withdrawn successfully.");
    } catch (error) {
      console.error("Error withdrawing tokens:", error);
      alert("Error withdrawing tokens. See console for details.");
    }
  };

  return (
    <div className="mx-auto px-4 mt-8 py-8 max-w-xl bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Smart Contract Interaction
      </h1>

      <div>
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex space-x-2 mb-4">
            {Object.entries(predefinedAddresses).map(([chainId, address]) => (
              <button
                key={chainId}
                className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  chainId === selectedChainId
                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                onClick={() => selectPredefinedAddress(address)}
              >
                {chainId}
              </button>
            ))}
          </div>
          <label
            htmlFor="contractAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Contract Address:
          </label>
          <div className="relative mt-1 block w-full">
            <input
              type="text"
              id="contractAddress"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="px-3 py-2 w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {contractAddress && (
              <button
                type="button"
                onClick={() => setContractAddress("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <MdClose className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Default Tip Amount from Contract
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Default Tip Amount: {defaultTipAmount} USDC
          </p>
        </div>

        <form onSubmit={handleSetDefaultTipAmount} className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Set Default Tip Amount
          </h2>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              placeholder="New Tip Amount in ETH"
              value={newTipAmount}
              onChange={(e) => setNewTipAmount(e.target.value)}
              className="block w-full pl-3 pr-12 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      <div className="mt-4">
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Contract Control
          </h2>
          <p className="text-gray-600">
            Contract is currently {isContractPaused ? "Paused" : "Active"}.
          </p>
          <button
            className={`mr-2 px-4 py-2 text-sm font-medium rounded-md text-white ${
              isContractPaused
                ? "bg-green-500 hover:bg-green-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            onClick={handleUnpauseContract}
            disabled={isContractPaused === false || isPausing}
          >
            Unpause
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md text-white ${
              isContractPaused
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-700"
            }`}
            onClick={handlePauseContract}
            disabled={isContractPaused === true || isPausing}
          >
            Pause
          </button>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Access Roles Control
          </h2>
          <div>
            <label
              htmlFor="addressToModify"
              className="block text-sm font-medium text-gray-700"
            >
              Address to Modify:
            </label>
            <input
              type="text"
              id="addressToModify"
              value={addressToModify}
              onChange={(e) => setAddressToModify(e.target.value)}
              className="block w-full pl-3 pr-12 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter address"
            />

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a Role</option>
              {Object.entries(roles).map(([roleName, roleValue]) => (
                <option key={roleValue} value={roleValue}>
                  {roleName.replace("_", " ")}
                </option>
              ))}
            </select>

            <div className="mt-4">
              <button
                onClick={handleGrantRole}
                className="mr-2 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
              >
                Grant Role
              </button>
              <button
                onClick={handleRevokeRole}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
              >
                Revoke Role
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Withdraw</h2>
          <button
            onClick={handleWithdrawTips}
            className="ml-3 m-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Withdraw Tips
          </button>
          {/* UI elements for withdrawETH */}
          <input
            type="text"
            value={withdrawToAddress}
            onChange={(e) => setWithdrawToAddress(e.target.value)}
            placeholder="Withdraw to Address"
            className="block w-full pl-3 pr-12 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="block w-full pl-3 pr-12 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Amount to Withdraw (in wei)"
          />

          {/* UI elements for withdrawTokens */}
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Token Address"
            className="block w-full pl-3 pr-12 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          />
          {/* Use the same inputs for withdrawToAddress and withdrawAmount as for withdrawETH */}
          <button
            onClick={handleWithdrawETH}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Withdraw ETH
          </button>

          {/* UI element for withdrawTips */}

          <button
            onClick={handleWithdrawTokens}
            className="ml-3 mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Withdraw Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractInterface;
