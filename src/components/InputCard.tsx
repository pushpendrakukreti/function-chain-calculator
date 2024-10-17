import React from 'react';

interface InputCardProps {
  x: number;
  onInputChange: (val: number) => void;
}

const InputCard: React.FC<InputCardProps> = ({ x, onInputChange }) => {
  return (
    <div className="flex items-center bg-white" style={{ width: "115px", height: "50px", marginTop: "200px", marginLeft: "140px", borderRadius: "15px", border: "2px solid #FFC267" }}>
      <input
        type="number"
        value={x}
        onChange={(e) => onInputChange(parseFloat(e.target.value))}
        className="p-1 text-center"
        style={{ borderRadius: "5px", width: "5rem", fontSize: "18px", fontWeight: "700" }}
      />
      <span style={{ width: "1px", height: "50px", backgroundColor: "#FFC267" }}></span>
      <input type="radio" checked className="ml-2" />
    </div>
  );
};

export default InputCard;
