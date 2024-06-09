import React from 'react';

interface TransactionSummaryProps {
  gasCost: number | null;
  gasUnit: string | null;
  tipAmount: number | null;
  tipUnit: string;
  finalAmount: number | null;
  finalAmountUnit: string;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  gasCost,
  gasUnit,
  tipAmount,
  tipUnit,
  finalAmount,
  finalAmountUnit,
}) => {
  return (
    <div className="bg-blackish p-4 rounded-20 shadow-custom mt-4 text-white z-10">
      <div className="flex justify-between items-center mb-2">
        <span>Gas cost (estimation)</span>
        <span className="flex-1 mx-2 border-dashed border-b border-gray-500"></span>
        <span>{gasCost ? `${gasCost} ${gasUnit}` : 'N/A'}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span>Taxi fee</span>
        <span className="flex-1 mx-2 border-dashed border-b border-gray-500"></span>
        <span>{tipAmount ? `${tipAmount} ${tipUnit}` : 'N/A'}</span>
      </div>
      <div className="flex justify-between items-center font-bold text-header-yellow">
        <span>Final received Amount</span>
        <span className="flex-1 mx-2 border-dashed border-b border-header-yellow"></span>
        <span>{finalAmount ? `${finalAmount} ${finalAmountUnit}` : 'N/A'}</span>
      </div>
    </div>
  );
};

export default TransactionSummary;
