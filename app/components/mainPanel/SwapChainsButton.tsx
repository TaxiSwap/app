import React, { useState } from 'react';
import { MdArrowDownward, MdSwapVert } from 'react-icons/md';

interface SwapChainsButtonProps {
  handleSwapChains: () => void;
}

const SwapChainsButton: React.FC<SwapChainsButtonProps> = ({ handleSwapChains }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex justify-center my-2">
      <button
        onClick={handleSwapChains}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-yellow-400 text-blackish rounded-full p-3 shadow-md border-4 border-blackish absolute top-1/2 transform -translate-y-1/2 z-10"
      >
        {isHovered ? (
          <MdSwapVert className="w-8 h-8 font-bold" />
        ) : (
          <MdArrowDownward className="w-8 h-8 font-bold" />
        )}
      </button>
    </div>
  );
};

export default SwapChainsButton;
