"use client";
import React, { useState } from "react";
import Brand from "./Brand";
import MenuItems from "./MenuItems";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white p-5 shadow">
      <div className="container mx-auto flex items-center justify-between relative">
        <Brand />
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
        <MenuItems isMenuOpen={isMenuOpen} displayMode="desktop" />
      </div>
      {/* Dropdown Menu, visible on small screens when isMenuOpen is true */}
      <MenuItems isMenuOpen={isMenuOpen} displayMode="mobile" />
    </header>
  );
};

export default Header;
