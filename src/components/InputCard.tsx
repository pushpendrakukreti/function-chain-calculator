import React from 'react';

interface InputCardProps {
  x: number;
  onInputChange: (val: number) => void;
}

const InputCard: React.FC<InputCardProps> = ({ x, onInputChange }) => {
  return (
    <div className="bg-blue-100 p-4 rounded shadow-md mb-4">
      <input
        type="number"
        value={x}
        onChange={(e) => onInputChange(parseFloat(e.target.value))}
        className="w-full border p-2 mb-2"
      />
      <p>Input (x): {x}</p>
    </div>
  );
};

export default InputCard;
