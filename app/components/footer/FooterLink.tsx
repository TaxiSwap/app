import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons'; 

interface FooterLinkProps {
  href: string;
  label: string;
  icon: IconType; 
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label, icon: Icon }) => {
  return (
    <Link href={href} passHref> 
      <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
        <Icon size={20} />
        <span>{label}</span>
      </div>
    </Link>
  );
};

export default FooterLink;
