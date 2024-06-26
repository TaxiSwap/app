import React, { useState } from "react";
import { useWalletStore } from "@/app/store/useWalletStore";
import { IoMdWallet } from "react-icons/io";

const WalletButton = () => {
  const { connectWallet, disconnectWallet, account } = useWalletStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const formattedAccount = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : "";

  return (
    <div className="relative">
      <button
        className="bg-blackish hover:bg-gray-700 text-header-yellow font-bold py-2 px-4 rounded-lg shadow-lg flex items-center justify-center"
        onClick={account ? toggleDropdown : connectWallet}
      >
        <IoMdWallet className="mr-2" />{" "}
        {account ? formattedAccount : "Connect Wallet"}
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          <a
            href="#"
            className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-500 hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              disconnectWallet();
              setShowDropdown(false);
            }}
          >
            Disconnect
          </a>
        </div>
      )}
    </div>
  );
};

export default WalletButton;
