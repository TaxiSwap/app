import React from 'react';

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
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isMenuOpen ? (
          // Icon for when the menu is open (e.g., an 'X' icon)
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          // Hamburger icon for when the menu is closed
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        )}
      </svg>
    </button>
  );
};

export default MenuToggle;
