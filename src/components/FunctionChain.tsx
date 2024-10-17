import React, { useState } from 'react';
import InputCard from './InputCard';
import FunctionCard from './FunctionCard';
import FinalOutput from './FinalOutput';

const FunctionChain: React.FC = () => {
    const [x, setX] = useState<number>(2);
    const [output1, setOutput1] = useState<number>(0);
    const [output2, setOutput2] = useState<number>(0);
    const [output3, setOutput3] = useState<number>(0);
    const [output4, setOutput4] = useState<number>(0);
    const [output5, setOutput5] = useState<number>(0);

    return (
        <div className="container mx-auto p-6">
            {/* Input Card */}
            <InputCard x={x} onInputChange={setX} />

            {/* Function Cards */}
            <FunctionCard
                equation="x ** 2"
                input={x}
                onOutputChange={setOutput1}
                text="x^2"
            />

            <FunctionCard
                equation="2 * x + 4"
                input={output1}
                onOutputChange={setOutput2}
                text="2x+4"
            />

            <FunctionCard
                equation="x - 2"
                input={output2}
                onOutputChange={setOutput3}
                text="x-2"
            />

            <FunctionCard
                equation="x / 2"
                input={output3}
                onOutputChange={setOutput4}
                text="x/2"
            />

            <FunctionCard
                equation="x ** 2 + 20"
                input={output4}
                onOutputChange={setOutput5}
                text="x^2+20"
            />

            {/* Final Output */}
            <FinalOutput output={output5} />
        </div>
    );
};

export default FunctionChain;
