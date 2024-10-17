import React, { useEffect, useState } from 'react';
import FunctionCard from './FunctionCard';
import FinalOutput from './FinalOutput';
import InputCard from './InputCard';

interface FunctionChainProps {
    functions: {
        cardNum: string;
        equation: string;
        text: string;
        selectedDropdownValue: string;
    }[];
}

const FunctionChain: React.FC<FunctionChainProps> = ({ functions }) => {
    const [x, setX] = useState<number>(2);  // Initialize x with a default value
    const [finalOutput, setFinalOutput] = useState<number>(0);  // To hold the final output

    // Function to perform calculations based on cardNum and the current x value
    const performCalculations = (initialX: number) => {
        let currentValue = initialX;

        // Perform calculations based on the specified sequence: 1 -> 2 -> 4 -> 5 -> 3
        currentValue = calculateOutput(functions[0], currentValue); // Card 1
        currentValue = calculateOutput(functions[1], currentValue); // Card 2
        currentValue = calculateOutput(functions[3], currentValue); // Card 4
        currentValue = calculateOutput(functions[4], currentValue); // Card 5
        currentValue = calculateOutput(functions[2], currentValue); // Card 3

        setFinalOutput(currentValue);  // Set the final output after all calculations
    };

    // Function to perform the calculation based on the equation of the card
    const calculateOutput = (functionData: { equation: string }, inputValue: number): number => {
        const equation = functionData.equation;
        const replacedEquation = equation.replace(/x/g, inputValue.toString());

        try {
            return eval(replacedEquation);  // Unsafe, but just for demonstration
        } catch (error) {
            console.error("Error evaluating equation:", error);
            return 0;  // Handle error by returning 0 or other logic
        }
    };

    const handleInputChange = (newValue: number) => {
        setX(newValue);  // Update x with the new input value
        performCalculations(newValue);  // Perform calculations in sequence
    };

    useEffect(() => {
        performCalculations(x);
    }, [x]);

    return (
        <>
            <div className="container mx-auto p-6 flex flex-col items-center" style={{ position: "absolute", maxWidth: "100vw" }}>
                <div className="col-span-1" style={{ left: -20, position: "absolute", top: -13 }}>
                    <InputCard x={x} onInputChange={handleInputChange} />
                </div>
                <div className="col-span-1" style={{ right: 120, position: "absolute", top: -13 }}>
                    <FinalOutput output={finalOutput} />
                </div>
            </div>
            <div className="container mx-auto p-6 flex flex-col items-center">
                <div className='grid grid-cols-3 gap-8 items-end'>
                    <FunctionCard
                        cardNum={functions[0].cardNum}
                        text={functions[0].text}
                        selectedDropdownValue={functions[1].selectedDropdownValue}
                    />

                    <FunctionCard
                        cardNum={functions[1].cardNum}
                        text={functions[1].text}
                        selectedDropdownValue={functions[3].selectedDropdownValue}
                    />

                    <FunctionCard
                        cardNum={functions[2].cardNum}
                        text={functions[2].text}
                        selectedDropdownValue={functions[0].selectedDropdownValue}
                    />
                </div>
                <div className='grid grid-cols-2 gap-8 mt-20'>
                    <FunctionCard
                        cardNum={functions[3].cardNum}
                        text={functions[3].text}
                        selectedDropdownValue={functions[4].selectedDropdownValue}
                    />

                    <FunctionCard
                        cardNum={functions[4].cardNum}
                        text={functions[4].text}
                        selectedDropdownValue={functions[2].selectedDropdownValue}
                    />
                </div>
            </div>
        </>
    );
};

export default FunctionChain;
