import React, { useEffect, useRef } from 'react';

interface FinalOutputProps {
  output: number;
  onRadioCoordsChange: (coords: DOMRect) => void;
}

const FinalOutput: React.FC<FinalOutputProps> = ({ output, onRadioCoordsChange }) => {
  const radioRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (radioRef.current) {
      onRadioCoordsChange(radioRef.current.getBoundingClientRect());
    }
  }, [onRadioCoordsChange]);

  return (
    <div
      className="flex items-center bg-white"
      style={{
        width: '115px',
        height: '50px',
        marginTop: '200px',
        borderRadius: '15px',
        border: '2px solid #2DD179',
      }}
    >
      <input
        type="radio"
        checked
        ref={radioRef}
        className="ml-2"
      />
      <div
        className="ml-2"
        style={{
          width: '1px',
          height: '50px',
          backgroundColor: '#2DD179',
        }}
      />
      <input
        type="number"
        data-testid="final-output"
        value={output}
        className="p-1 text-center"
        disabled
        style={{
          borderRadius: '5px',
          width: '5rem',
          fontSize: '18px',
          fontWeight: '700',
        }}
      />
    </div>
  );
};

export default FinalOutput;
