import React, { useState, useEffect } from 'react';

interface FunctionCardProps {
  equation: string;
  input: number;
  onOutputChange: (output: number) => void;
  text: string;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ equation, input, onOutputChange, text }) => {
  const [output, setOutput] = useState<number>(input);

  useEffect(() => {
    try {
      // Replace 'x' with the actual input value
      const result = eval(equation.replace('x', input.toString()));
      setOutput(result);
      onOutputChange(result);
    } catch (error) {
      console.error('Error calculating function:', error);
    }
  }, [equation, input]);

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
      <input
        type="text"
        value={text}
        className="w-full border p-2 mb-2"
        readOnly
      />
      <p>Output: {output}</p>
    </div>
  );
};

export default FunctionCard;
