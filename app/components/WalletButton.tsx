import React, { useState } from 'react';
import useWallet from '../hooks/useWallet';

const WalletButton = () => {
    const { connect, disconnect, account } = useWallet();
    const [showDropdown, setShowDropdown] = useState(false);
  
    const toggleDropdown = () => setShowDropdown(!showDropdown);
  
    const formattedAccount = account
      ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
      : '';
  
    return (
      <div className="relative">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          onClick={account ? toggleDropdown : connect}
        >
          {account ? formattedAccount : 'Connect Wallet'}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a
              href="#"
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                disconnect();
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