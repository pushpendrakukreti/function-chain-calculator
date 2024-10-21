import React, { useEffect, useRef } from 'react';

interface InputCardProps {
  x: number;
  onInputChange: (val: number) => void;
  onRadioCoordsChange: (coords: DOMRect) => void;
}

const InputCard: React.FC<InputCardProps> = ({ x, onInputChange, onRadioCoordsChange }) => {
  const radioRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (radioRef.current) {
      onRadioCoordsChange(radioRef.current.getBoundingClientRect());
    }
  }, [onRadioCoordsChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onInputChange(value);
    }
  };

  return (
    <div
      className="flex items-center bg-white"
      style={{
        width: '115px',
        height: '50px',
        marginTop: '200px',
        marginLeft: '140px',
        borderRadius: '15px',
        border: '2px solid #FFC267',
      }}
    >
      <input
        type="number"
        value={x}
        onChange={handleChange}
        className="p-1 text-center"
        style={{
          borderRadius: '5px',
          width: '5rem',
          fontSize: '18px',
          fontWeight: '700',
        }}
      />
      <div style={{ width: '1px', height: '50px', backgroundColor: '#FFC267' }} />
      <input
      role='radio'
        type="radio"
        checked
        ref={radioRef}
        className="ml-2"
      />
    </div>
  );
};

export default InputCard;
