import Image from "next/image";
import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="relative">
      {/* Main Background Image */}
      <Image
        src="/Taxiswap imageDesktop.png"
        alt="Main Background"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "75%", height: "auto" }}
        className="pt-8 pl-8"
      />

      {/* Text above the overlay image */}
      <div className="absolute top-0 left-0 p-4">
        <p className="text-blackish font-heavy text-64 leading-80">
          Your one stop
        </p>

        {/* Overlay Image */}
        <div className="absolute top-0 left-0 p-4">
          <Image
            src="/usdc bridge.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="USD Coin Bridge"
            className="w-20 h-20 mt-20" 
          />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
