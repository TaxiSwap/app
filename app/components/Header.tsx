'use client';
import React from 'react';

const Header = () => {
  const handleConnectWallet = () => {
    // Logic to connect wallet
    console.log('Connect wallet');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          Cross-Chain Transfer Protocol
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
