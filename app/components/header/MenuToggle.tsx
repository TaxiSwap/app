import React from "react";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";

interface MenuToggleProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className="md:hidden p-2 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
      aria-controls="mobile-menu"
      aria-expanded={isMenuOpen}
      aria-label="Toggle menu"
    >
      {isMenuOpen ? (
        // 'X' Icon for when the menu is open 
        <MdClose className="text-3xl font-bold" />
      ) : (
        // 'Hamburger' icon for when the menu is closed
        <MdMenu className="text-3xl font-bold" />
      )}
    </button>
  );
};

export default MenuToggle;
