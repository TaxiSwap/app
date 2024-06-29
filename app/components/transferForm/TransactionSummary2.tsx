import React from "react";

interface TransactionSummaryProps {
  gasCost: number | null;
  gasUnit: string | null;
  tipAmount: number | null;
  tipUnit: string | null;
  finalAmount: number | null;
  finalAmountUnit: string | null;
}

const TransactionSummary2: React.FC<TransactionSummaryProps> = ({
  gasCost,
  gasUnit,
  tipAmount,
  tipUnit,
  finalAmount,
  finalAmountUnit
}) => {
  return (
    <div className="transaction-summary my-4 p-4 border border-gray-200 rounded-md">
      <div className="flex justify-between py-2 items-center">
        <span>Gas Cost (estimation): </span>
        <span>{gasCost !== null ? `${gasCost} ${gasUnit}` : "..."}</span>
      </div>
      <div className="flex justify-between py-2 items-center">
        <span>Bridge fee: </span>
        <span>{tipAmount !== null ? `${tipAmount} ${tipUnit}` : "..."}</span>
      </div>
      <div className="flex justify-between py-2 items-center font-semibold">
        <span>Final received Amount: </span>
        <span>{finalAmount !== null ? `${finalAmount} ${finalAmountUnit}` : "..."}</span>
      </div>
    </div>
  );
};

export default TransactionSummary2;
