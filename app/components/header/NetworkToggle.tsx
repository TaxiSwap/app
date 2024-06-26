import React from "react";
import { useNetworkStore } from "@/app/store/useNetworkConfig";

const NetworkToggle = () => {
  const { networkType, toggleNetworkType } = useNetworkStore();
  // Determine if the switch should be in the "checked" position
  const isTestnet = networkType === "testnet";

  return (
    <div className="flex items-center p-2 gap-4">
      {/* Static Label for Mainnet */}
      <span
        className={`font-medium ${
          !isTestnet ? "text-blackish" : "text-gray-400"
        }`}
      >
        Mainnet
      </span>

      {/* Toggle Switch */}
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="sr-only"
            checked={isTestnet}
            onChange={toggleNetworkType}
          />
          <div
            className={`block w-10 h-6 rounded-full transition-colors duration-300 ${
              isTestnet ? "bg-gray-600" : "bg-blackish"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 bg-header-yellow w-4 h-4 rounded-full transition-transform duration-300 ${
              isTestnet ? "transform translate-x-4" : ""
            }`}
          ></div>
        </div>
      </label>

      {/* Static Label for Testnet */}
      <span
        className={`font-medium ${
          isTestnet ? "text-blackish" : "text-gray-400"
        }`}
      >
        Testnet
      </span>
    </div>
  );
};

export default NetworkToggle;