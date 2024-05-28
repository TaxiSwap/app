import React from "react";
import TransferForm from "./transferForm/TransferForm";
import LeftPanel from "./LeftPanel";
import MainPanel from "./mainPanel/MainPanel";

const DualPanel: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen-80 lg:px-2">
      {/* Left panel, hidden on smaller screens */}
      <div className="hidden lg:block lg:w-5/12">
        <LeftPanel />
      </div>

      {/* Right panel, always visible */}
      <div className="w-full lg:w-5/12">
        <MainPanel />
      </div>
    </div>
  );
};

export default DualPanel;
