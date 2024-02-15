'use client';
import React, { useState } from 'react';
import WalletButton from './WalletButton';
import NetworkButton from './NetworkButton';
import NetworkToggle from './NetworkToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white p-5 shadow">
      <div className="container mx-auto flex items-center justify-between relative"> {/* Ensure positioning context is set */}
        <div className="text-gray-800 text-2xl font-bold">
          Dollar Bridge
        </div>
        <div className="md:hidden">
          {/* Hamburger Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {/* Items for larger screens */}
        <div className="hidden md:flex items-center space-x-3">
          <NetworkToggle />
          <NetworkButton />
          <WalletButton />
        </div>
      </div>

      {/* Dropdown Menu, visible on small screens when isMenuOpen is true */}
      <div className={`absolute bg-white p-4 right-0 mt-2 w-auto md:hidden ${isMenuOpen ? 'flex' : 'hidden'} flex-col items-end space-y-3`}>
        <NetworkToggle />
        <NetworkButton />
        <WalletButton />
      </div>
    </header>
  );
};

export default Header;
