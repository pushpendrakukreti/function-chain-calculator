import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

const mockFunctions = [
    { cardNum: '1', equation: 'x + 1', text: 'Add 1', selectedDropdownValue: 'option1' },
    { cardNum: '2', equation: 'x * 2', text: 'Multiply by 2', selectedDropdownValue: 'option2' },
    { cardNum: '3', equation: 'x - 3', text: 'Subtract 3', selectedDropdownValue: 'option3' },
    { cardNum: '4', equation: 'x / 2', text: 'Divide by 2', selectedDropdownValue: 'option4' },
    { cardNum: '5', equation: 'x ** 2', text: 'Square', selectedDropdownValue: 'option5' },
];

describe('FunctionChain Component', () => {
    test('renders InputCard and FinalOutput components', () => {
        expect(screen.getByText(/Add 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Multiply by 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Subtract 3/i)).toBeInTheDocument();
        expect(screen.getByText(/Divide by 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Square/i)).toBeInTheDocument();
    });

    test('calculates final output when input changes', () => {
        const inputElement = screen.getByRole('spinbutton');
        fireEvent.change(inputElement, { target: { value: '5' } });

        const outputElement = screen.getByText(/Final Output/i);
        
        expect(outputElement).toHaveTextContent('Expected Output');
    });

    test('handles function equation changes correctly', () => {
        const functionCardInputs = screen.getAllByRole('textbox');
        
        fireEvent.change(functionCardInputs[0], { target: { value: 'x - 1' } });

        const outputElement = screen.getByText(/Final Output/i);
        expect(outputElement).toHaveTextContent('Updated Expected Output');
    });
});
