import React from 'react';

interface FinalOutputProps {
  output: number;
}

const FinalOutput: React.FC<FinalOutputProps> = ({ output }) => {
  return (
    <div className="bg-green-100 p-4 rounded shadow-md mb-4">
      <h2>Final Output (y): {output}</h2>
    </div>
  );
};

export default FinalOutput;
