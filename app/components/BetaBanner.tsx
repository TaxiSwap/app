import React from 'react';

const BetaBanner: React.FC = () => {
  return (
    <div className="bg-blue-100 text-blue-800 text-center py-1 px-4">
      <p className="text-sm font-medium">
        🚧 This is a Beta version. Expect the unexpected! 🚧
      </p>
    </div>
  );
};

export default BetaBanner;
