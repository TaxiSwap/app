import React from 'react';

const BetaBanner: React.FC = () => {
  return (
    <div className="bg-blackish text-header-yellow text-center py-1 px-4">
      <p className="text-sm font-medium">
        🚧 This is a Beta version. Expect the unexpected! 🚧
      </p>
    </div>
  );
};

export default BetaBanner;
