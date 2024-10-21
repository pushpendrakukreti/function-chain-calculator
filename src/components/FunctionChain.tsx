import React, { useState, useEffect } from 'react';
import InputCard from './InputCard';
import FunctionCard from './FunctionCard';
import FinalOutput from './FinalOutput';

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

    const [inputRadioCoords, setInputRadioCoords] = useState<DOMRect | null>(null);
    const [functionRadioCoords, setFunctionRadioCoords] = useState<Array<DOMRect | null>>(Array(5).fill(null));
    const [functionOutputRadioCoords, setFunctionOutputRadioCoords] = useState<Array<DOMRect | null>>(Array(5).fill(null));
    const [finalOutputRadioCoords, setFinalOutputRadioCoords] = useState<DOMRect | null>(null);


    const performCalculations = (initialX: number) => {
        let currentValue = initialX;
        const calculationOrder = [0, 1, 3, 4, 2];
        calculationOrder.forEach(index => {
            currentValue = calculateOutput(updatedFunctions[index], currentValue);
        });

        setFinalOutput(currentValue);
    };

    const calculateOutput = (functionData: { equation: string }, inputValue: number): number => {
        const replacedEquation = functionData.equation.replace(/x/g, inputValue.toString());

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
        const updatedFunctionsCopy = [...updatedFunctions];
        updatedFunctionsCopy[index].equation = newEquation;
        setUpdatedFunctions(updatedFunctionsCopy);
        performCalculations(x);
    };

    useEffect(() => {
        performCalculations(x);
    }, [x]);

    const calculateMidpoint = (coord: DOMRect | null) => {
        return coord ? { x: coord.x + coord.width / 2, y: coord.y + coord.height / 2 } : null;
    };

    const renderBezierCurve = (x1: number, y1: number, x2: number, y2: number, type: 'U' | 'snake') => {
        let cpX, cpY;
        if (type === 'U') {
            cpX = (x1 + x2) / 2;
            cpY = Math.min(y1, y2) + 50;
        } else if (type === 'snake') {
            cpX = (x1 + x2) / 2;
            cpY = Math.min(y1, y2) - 25;
        }

        return type === 'snake' ?
            `M ${x1} ${y1} C ${cpX} ${cpY}, ${cpX} ${y2 + 50}, ${x2} ${y2}` :
            `M ${x1} ${y1} C ${cpX} ${cpY}, ${cpX} ${y2 + 50}, ${x2} ${y2}`;
    };

    const renderBezierCurveLast = (x1: number, y1: number, x2: number, y2: number) => {
        let cpX, cpY;
        cpX = (x1 + x2) / 1.9;
        cpY = Math.min(y1, y2) + 280;

        return `M ${x1} ${y1} C ${cpX} ${cpY}, ${cpX} ${y2 + 50}, ${x2} ${y2}`;
    };

    const renderSVGLines = () => {
        const inputCoords = calculateMidpoint(inputRadioCoords);
        const functionCoords = functionRadioCoords.map(coord => calculateMidpoint(coord));
        const functionOutputCoords = functionOutputRadioCoords.map(coord => calculateMidpoint(coord));
        const finalOutputCoords = calculateMidpoint(finalOutputRadioCoords);

        const lines = [];

        if (inputCoords && functionCoords[0]) {
            lines.push(
                <line
                    key="input-to-func1"
                    x1={inputCoords.x}
                    y1={inputCoords.y}
                    x2={functionCoords[0]?.x}
                    y2={functionCoords[0]?.y}
                    stroke="#0066FF"
                    strokeOpacity="0.3"
                    strokeWidth="7"
                    strokeLinecap="round"
                />
            );
        }

        if (functionOutputCoords[0] && functionCoords[1]) {
            lines.push(
                <path
                    key="func1-to-func2"
                    d={renderBezierCurve(functionOutputCoords[0]!.x, functionOutputCoords[0]!.y, functionCoords[1]!.x, functionCoords[1]!.y, 'U')}
                    stroke="#0066FF"
                    strokeOpacity="0.3"
                    strokeWidth="7"
                    fill="transparent"
                />
            );
        }

        if (functionOutputCoords[1] && functionCoords[3]) {
            lines.push(
                <path
                    key="func2-to-func4"
                    d={renderBezierCurve(functionOutputCoords[1]!.x, functionOutputCoords[1]!.y, functionCoords[3]!.x, functionCoords[3]!.y, 'snake')}
                    stroke="#0066FF"
                    strokeOpacity="0.3"
                    strokeWidth="7"
                    fill="transparent"
                />
            );
        }

        if (functionOutputCoords[3] && functionCoords[4]) {
            lines.push(
                <path
                    key="func4-to-func5"
                    d={renderBezierCurve(functionOutputCoords[3]!.x, functionOutputCoords[3]!.y, functionCoords[4]!.x, functionCoords[4]!.y, 'U')}
                    stroke="#0066FF"
                    strokeOpacity="0.3"
                    strokeWidth="7"
                    fill="transparent"
                />
            );
        }

        if (functionOutputCoords[4] && functionCoords[2]) {
            lines.push(
                <path
                    key="func5-to-func3"
                    d={renderBezierCurveLast(functionOutputCoords[4]!.x, functionOutputCoords[4]!.y, functionCoords[2]!.x, functionCoords[2]!.y)}
                    stroke="#0066FF"
                    strokeOpacity="0.3"
                    strokeWidth="7"
                    fill="transparent"
                />
            );
        }

        if (functionOutputCoords[2] && finalOutputCoords) {
            lines.push(
                <line
                    key="func3-to-finalOutput"
                    x1={functionOutputCoords[2]!.x}
                    y1={functionOutputCoords[2]!.y}
                    x2={finalOutputCoords.x}
                    y2={finalOutputCoords.y}
                    stroke="#0066FF"
                    strokeOpacity="0.3"
                    strokeWidth="7"
                    strokeLinecap="round"
                />
            );
        }

        return lines;
    };

    const updateCoordinates = (prevCoords: Array<DOMRect | null>, index: number, newCoords: DOMRect | null) => {
        const updatedCoords = [...prevCoords];
        updatedCoords[index] = newCoords;
        return updatedCoords;
    };

    const renderFunctionCards = (startIndex: number, endIndex: number) => {
        return updatedFunctions.slice(startIndex, endIndex).map((func, index) => (
            <FunctionCard
                key={func.cardNum}
                cardNum={func.cardNum}
                text={func.text}
                selectedDropdownValue={func.selectedDropdownValue}
                onEquationChange={(newEquation) => handleFunctionChange(index + startIndex, newEquation)}
                onRadioCoordsChange={(coords) => setFunctionRadioCoords(prev => updateCoordinates(prev, index + startIndex, coords))}
                onOutputRadioCoordsChange={(coords) => setFunctionOutputRadioCoords(prev => updateCoordinates(prev, index + startIndex, coords))}
            />
        ));
    };

    return (
        <>
            <svg
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    pointerEvents: 'none',
                    zIndex: 1000,
                    width: '100vw',
                    height: '100vh',
                }}
            >
                {renderSVGLines()}
            </svg>

            <div className="container mx-auto p-6 flex flex-col items-center" style={{ position: "absolute", maxWidth: "100vw" }}>
                <div className="col-span-1" style={{ left: -20, position: "absolute", top: -13, zIndex: 1 }}>
                    <InputCard x={x} onInputChange={handleInputChange} onRadioCoordsChange={setInputRadioCoords} />
                </div>
                <div className="col-span-1" style={{ right: 120, position: "absolute", top: -13, zIndex: 1 }}>
                    <FinalOutput output={finalOutput} onRadioCoordsChange={setFinalOutputRadioCoords} />
                </div>
            </div>

            <div className="container mx-auto p-6 flex flex-col items-center" style={{ position: "relative", zIndex: 0 }}>
                <div className='grid grid-cols-3 gap-8 items-end'>
                    {renderFunctionCards(0, 3)}
                </div>
                <div className='grid grid-cols-2 gap-8 mt-20'>
                    {renderFunctionCards(3, updatedFunctions.length)}
                </div>
            </div>
        </>
    );
};

export default FunctionChain;
