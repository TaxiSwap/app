import React from 'react';
import { useWalletStore } from "@/app/store/useWalletStore";
import { IoMdWallet } from "react-icons/io";

interface TransferButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const TransferButton: React.FC<TransferButtonProps> = ({ onClick, disabled }) => {
  const { connectWallet, account } = useWalletStore();

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={account ? onClick : connectWallet}
        disabled={account ? disabled : false}
        className={`bg-yellow-400 text-blackish rounded-full p-3 shadow-md w-full max-w-md text-xl font-bold flex items-center justify-center ${account && disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'
          }`}
      >
        {account ? (
          <span className="flex items-center">
            Transfer Ride!
          </span>
        ) : (
          <span className="flex items-center">
            <IoMdWallet className="mr-2" /> Connect Wallet
          </span>
        )}
      </button>
    </div>
  );
};

export default TransferButton;
