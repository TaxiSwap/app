import Link from "next/link";
import React from "react";
import { BsTaxiFront } from "react-icons/bs";

const Brand: React.FC = () => {
  return (
    <div className="flex items-center text-blackish text-2xl font-bold">
      <BsTaxiFront className="text-4xl" />
      <div
        className="p-2 max-w-sm mx-auto flex justify-center items-center "
      >
        <Link href="/">
          <span className="font-extrabold text-[28px] leading-[35px] tracking-normal text-left text-blackish">
            TaxiSwap.xyz
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Brand;
