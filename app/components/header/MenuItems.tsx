import React from "react";
import NetworkToggle from "./NetworkToggle";
import NetworkButton from "./NetworkButton";
import WalletButton from "./WalletButton";
import useEnvFlags from "@/app/hooks/useEnvFlags";

// Define an interface for the component's props
interface MenuItemsProps {
  isMenuOpen: boolean; // Indicates whether the mobile menu is open or closed
  displayMode: "mobile" | "desktop"; // Restricts the display mode to either 'mobile' or 'desktop'
}

const MenuItems: React.FC<MenuItemsProps> = ({ isMenuOpen, displayMode }) => {
  // Define class names based on display mode for responsive design
  const containerClassNames =
    displayMode === "mobile"
      ? `absolute bg-header-yellow shadow-8 border-2 border-gray-200 rounded-lg p-4 right-0 mt-2 w-auto md:hidden z-40 ${
          isMenuOpen ? "flex" : "hidden"
        } flex-col items-end space-y-3`
      : "hidden md:flex items-center space-x-3";
  const { isTestnet, isLoading } = useEnvFlags();

  return (
    <div className={containerClassNames}>
      {isTestnet && !isLoading && <NetworkToggle />}
      <NetworkButton />
      <WalletButton />
    </div>
  );
};

export default MenuItems;
