import React from "react";
import TransferForm from "./transferForm/TransferForm";
import LeftPanel from "./LeftPanel";

const DualPanel: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-8 lg:px-24">
      {/* Left panel, hidden on smaller screens */}
      <div className="hidden lg:block lg:w-1/2 ">
        <LeftPanel />
      </div>

      {/* Right panel, always visible */}
      <div className="w-full lg:w-1/2 p-4">
        <TransferForm />
      </div>
    </div>
  );
};

export default DualPanel;
