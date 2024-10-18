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
    const [x, setX] = useState<number>(2);
    const [finalOutput, setFinalOutput] = useState<number>(0);
    const [updatedFunctions, setUpdatedFunctions] = useState(functions);

    const performCalculations = (initialX: number) => {
        let currentValue = initialX;

        currentValue = calculateOutput(updatedFunctions[0], currentValue);
        currentValue = calculateOutput(updatedFunctions[1], currentValue);
        currentValue = calculateOutput(updatedFunctions[3], currentValue);
        currentValue = calculateOutput(updatedFunctions[4], currentValue);
        currentValue = calculateOutput(updatedFunctions[2], currentValue);

        setFinalOutput(currentValue);
    };

    const calculateOutput = (functionData: { equation: string }, inputValue: number): number => {
        const equation = functionData.equation;
        const replacedEquation = equation.replace(/x/g, inputValue.toString());

        try {
            return eval(replacedEquation);
        } catch (error) {
            console.error("Error evaluating equation:", error);
            return 0;
        }
    };

    const handleInputChange = (newValue: number) => {
        setX(newValue);
        performCalculations(newValue);
    };

    const handleFunctionChange = (index: number, newEquation: string) => {
        debugger;
        const updatedFunctionsCopy = [...updatedFunctions];
        updatedFunctionsCopy[index].equation = newEquation;
        setUpdatedFunctions(updatedFunctionsCopy);
        console.log("up func(): ", updatedFunctions);
        console.log("slice(0, 3): ", updatedFunctions.slice(0, 3));
        console.log("slice(3): ", updatedFunctions.slice(3));
        performCalculations(x);
    };

    useEffect(() => {
        performCalculations(x);
    }, [x]);

    return (
        <>
            <div className="container mx-auto p-6 flex flex-col items-center" style={{ position: "absolute", maxWidth: "100vw" }}>
                <div className="col-span-1" style={{ left: -20, position: "absolute", top: -13, zIndex: 1 }}>
                    <InputCard x={x} onInputChange={handleInputChange} />
                </div>
                <div className="col-span-1" style={{ right: 120, position: "absolute", top: -13, zIndex: 1 }}>
                    <FinalOutput output={finalOutput} />
                </div>
            </div>

            <div className="container mx-auto p-6 flex flex-col items-center" style={{ position: "relative", zIndex: 0 }}>
                <div className='grid grid-cols-3 gap-8 items-end'>
                    {updatedFunctions.slice(0, 3).map((func, index) => (
                        <FunctionCard
                            key={func.cardNum}
                            cardNum={func.cardNum}
                            text={func.equation}
                            selectedDropdownValue={func.selectedDropdownValue}
                            onEquationChange={(newEquation) => handleFunctionChange(index, newEquation)}
                        />
                    ))}
                </div>
                <div className='grid grid-cols-2 gap-8 mt-20'>
                    {updatedFunctions.slice(3).map((func, index) => (
                        <FunctionCard
                            key={func.cardNum}
                            cardNum={func.cardNum}
                            text={func.equation}
                            selectedDropdownValue={func.selectedDropdownValue}
                            onEquationChange={(newEquation) => handleFunctionChange(index + 3, newEquation)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FunctionChain;
