import React from "react";
import { FaGithub, FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FooterLink from "./FooterLink";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white p-5 shadow-t mt-14">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        <p className="text-sm text-gray-600 mb-4 sm:mb-0">
         <> © {new Date().getFullYear()} Taxiswap.xyz . All rights reserved.</>
        </p>
        <div className="flex justify-center sm:justify-between flex-wrap space-x-4">
          <FooterLink href="" label="GitHub" icon={FaGithub} />
          <FooterLink href="" label="Discord" icon={FaDiscord} />
          <FooterLink href="" label="Telegram" icon={FaTelegramPlane} />
          <FooterLink href="" label="Twitter/X" icon={FaXTwitter} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
