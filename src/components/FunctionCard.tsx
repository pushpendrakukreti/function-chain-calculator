import React, { useState } from 'react';

interface FunctionCardProps {
  cardNum: string;
  text: string;
  selectedDropdownValue: string;
  onEquationChange: (newEquation: string) => void;
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  cardNum,
  text,
  selectedDropdownValue,
  onEquationChange,
}) => {
  const [equation, setEquation] = useState(text);

  const validateEquation = (input: string) => {
    const cleanedInput = input.replace(/\s+/g, '');
    const validRegex = /^[0-9x\+\-\*/\^()]*$/;
    return validRegex.test(cleanedInput);
  };

  const handleEquationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEquation = e.target.value;
    const startsAndEndsWithValidChars = /^[a-z0-9].*[a-z0-9]$/i;

    if (startsAndEndsWithValidChars.test(newEquation) && validateEquation(newEquation)) {
      setEquation(newEquation);
      onEquationChange(newEquation);
    } else {
      setEquation(newEquation);
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow shadow-gray-400 pt-4 pl-4">
      <span className="inline-flex items-center">
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.36364 4.36365C0.613636 4.36365 0 4.97728 0 5.72728C0 6.47728 0.613636 7.09092 1.36364 7.09092C2.11364 7.09092 2.72727 6.47728 2.72727 5.72728C2.72727 4.97728 2.11364 4.36365 1.36364 4.36365Z"
            fill="#CDCDCD"
          />
          <path
            d="M10.6364 4.36365C9.88636 4.36365 9.27273 4.97728 9.27273 5.72728C9.27273 6.47728 9.88636 7.09092 10.6364 7.09092C11.3864 7.09092 12 6.47728 12 5.72728C12 4.97728 11.3864 4.36365 10.6364 4.36365Z"
            fill="#CDCDCD"
          />
          <path
            d="M4.63636 5.72728C4.63636 4.97728 5.25 4.36365 6 4.36365C6.75 4.36365 7.36364 4.97728 7.36364 5.72728C7.36364 6.47728 6.75 7.09092 6 7.09092C5.25 7.09092 4.63636 6.47728 4.63636 5.72728Z"
            fill="#CDCDCD"
          />
          <path
            d="M1.36364 0C0.613636 0 0 0.613636 0 1.36364C0 2.11364 0.613636 2.72727 1.36364 2.72727C2.11364 2.72727 2.72727 2.11364 2.72727 1.36364C2.72727 0.613636 2.11364 0 1.36364 0Z"
            fill="#CDCDCD"
          />
          <path
            d="M10.6364 0C9.88636 0 9.27273 0.613636 9.27273 1.36364C9.27273 2.11364 9.88636 2.72727 10.6364 2.72727C11.3864 2.72727 12 2.11364 12 1.36364C12 0.613636 11.3864 0 10.6364 0Z"
            fill="#CDCDCD"
          />
          <path
            d="M4.63636 1.36364C4.63636 0.613636 5.25 0 6 0C6.75 0 7.36364 0.613636 7.36364 1.36364C7.36364 2.11364 6.75 2.72727 6 2.72727C5.25 2.72727 4.63636 2.11364 4.63636 1.36364Z"
            fill="#CDCDCD"
          />
        </svg>
        <label className="font-bold text-gray-400 ml-2">{`Function: ${cardNum}`}</label>
      </span>

      <div className="p-5 pl-0 equation">
        <label className="block font-semibold text-gray-600 mb-2">Equation</label>
        <input
          type="text"
          value={equation}
          onChange={handleEquationChange}
          className="w-full px-4 py-2 border rounded-md bg-white text-gray-600"
        />
      </div>

      <div className="p-5 pl-0 py-3.5 nextFunction">
        <label className="block font-semibold text-gray-600 mb-2">Next function</label>
        <select
          value={selectedDropdownValue}
          disabled
          className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
        >
          <option value={selectedDropdownValue}>{selectedDropdownValue}</option>
        </select>
      </div>

      <div className="p-5 pl-0 inputOutput flex justify-between">
        <div className="flex items-center">
          <input
            type="radio"
            id="input-radio"
            name={`radioIn-${cardNum}`}
            value="input"
            className="mr-2"
            checked
          />
          <label htmlFor="input-radio" className="text-gray-600">
            Input
          </label>
        </div>

        <div className="flex items-center">
          <label htmlFor="output-radio" className="text-gray-600">
            Output
          </label>
          <input
            type="radio"
            id="output-radio"
            name={`radioOut-${cardNum}`}
            value="output"
            className="ml-2"
            checked
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;
