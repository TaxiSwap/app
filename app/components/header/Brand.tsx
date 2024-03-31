import Link from "next/link";
import React from "react";
import { BsTaxiFront } from "react-icons/bs";

const Brand: React.FC = () => {
  return (
    <div className="flex items-center text-gray-800 text-2xl font-bold">
      <BsTaxiFront className="mr-2 text-4xl" />
      <div
        className="bg-gray-50 p-4 max-w-sm mx-auto rounded-lg shadow-md flex justify-center items-center space-x-2"
        style={{ border: "1px solid #999" }}
      >
        <Link href="/">
          <span className="text-2xl font-semibold tracking-widest text-gray-800">
            TAXISWAP.xyz
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Brand;
