import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Token } from "@/app/config/configLoader";

interface TokenDropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  tokens: Token[];
}

const TokenDropdown: React.FC<TokenDropdownProps> = ({ value, onChange, tokens }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (tokenSymbol: string) => {
    const event = {
      target: { value: tokenSymbol },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const selectedToken = tokens.find(token => token.symbol === value);

  return (
    <div className="relative inline-block w-fit text-blackish bg-pale" ref={dropdownRef}>
      <div
        className="flex items-center bg-transparent p-2 rounded-lg cursor-pointer w-fit"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedToken ? (
          <>
            <Image src={selectedToken.icon} alt={selectedToken.name} width={16} height={16} className="mr-2" />
            <span className="font-bold">{selectedToken.symbol}</span>
          </>
        ) : (
          <span className="text-gray-500 text-lg">Token</span>
        )}
        <button className="ml-2">▼</button>
      </div>
      {isOpen && (
        <ul className="absolute bg-white border rounded-lg shadow-lg mt-2 z-10 max-h-60 overflow-y-auto w-full">
          {tokens.map(token => (
            <li
              key={token.symbol}
              className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(token.symbol)}
            >
              <Image src={token.icon} alt={token.name} width={16} height={16} className="mr-2" />
              {token.symbol}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenDropdown;
