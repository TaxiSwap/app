import React, { useState } from "react";
import { IconContext } from "react-icons";
import { SlArrowRight, SlRefresh } from "react-icons/sl";

interface SwapButtonProps {
  onSwap: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onSwap }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSwap(event);
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="bg-transparent border-none cursor-pointer p-0 m-1"
    >
      <IconContext.Provider value={{ size: "35px" }}>
        {isHovered ? <SlRefresh /> : <SlArrowRight />}
      </IconContext.Provider>
    </button>
  );
};

export default SwapButton;
