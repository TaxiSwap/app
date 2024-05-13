"use client";
import React, { useState } from "react";
import Brand from "./Brand";
import MenuItems from "./MenuItems";
import MenuToggle from "./MenuToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-header-yellow h-20 p-5 shadow flex flex-col justify-center">
      <div className="container mx-auto flex items-center justify-between relative">
        <Brand />
        <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        {/* Items for larger screens */}
        <MenuItems isMenuOpen={isMenuOpen} displayMode="desktop" />
      </div>
      {/* Dropdown Menu, visible on small screens when isMenuOpen is true */}
      <div className={`flex justify-center ${isMenuOpen ? "block" : "hidden"}`}>
        <MenuItems isMenuOpen={isMenuOpen} displayMode="mobile" />
      </div>
    </header>
  );
};

export default Header;
