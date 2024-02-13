'use client';
import React from 'react';
import useWallet from '../hooks/useWallet'
import WalletButton from './WalletButton';
import NetworkButton from './NetworkButton';

const Header = () => {
  const { connect, account } = useWallet();

  return (
<header className="bg-white p-5 shadow">
  <div className="container mx-auto flex items-center justify-between">
    <div className="text-gray-800 text-2xl font-bold">
      Dollar Bridge
    </div>
    <div className="flex items-center space-x-3">
      <NetworkButton />
      <WalletButton />
    </div>
  </div>
</header>
  );
};

export default Header;