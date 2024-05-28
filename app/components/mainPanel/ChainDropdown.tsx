import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { NetworkParam } from "@/app/config/configLoader";

interface ChainDropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  networkParams: Record<string, NetworkParam>;
}

const ChainDropdown: React.FC<ChainDropdownProps> = ({ value, onChange, networkParams }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const handleSelect = (chainId: string) => {
      if (!chainId) return; // Ignore the default option
      const event = {
        target: { value: chainId },
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
  
    return (
      <div className="relative inline-block w-64" ref={dropdownRef}>
        <div
          className="flex items-center bg-transparent p-2 rounded-lg cursor-pointer w-fit"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? (
            <>
              <Image src={networkParams[value].icon} alt={networkParams[value].chainName} width={32} height={32} className="mr-2" />
              <span className="font-bold">{networkParams[value].chainName}</span>
            </>
          ) : (
            <span className="text-gray-500 text-lg">Select a network...</span>
          )}
          <button className="ml-2">▼</button>
        </div>
        {isOpen && (
          <ul className="absolute bg-white border rounded-lg shadow-lg mt-2 z-100 max-h-160 overflow-y-auto w-full">
            <li
              className="flex items-center p-2 text-gray-500 cursor-default"
            >
              Select a network...
            </li>
            {Object.entries(networkParams).map(([chainId, network]) => (
              <li
                key={chainId}
                className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(chainId)}
              >
                <Image src={network.icon} alt={network.chainName} width={16} height={16} className="mr-2" />
                {network.chainName}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default ChainDropdown;