import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinalOutput from './FinalOutput';

describe('FinalOutput Component', () => {
  const mockOnRadioCoordsChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with the given output value', () => {
    render(<FinalOutput output={10} onRadioCoordsChange={mockOnRadioCoordsChange} />);

    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeChecked();
  });

  test('calls onRadioCoordsChange with the correct coordinates', () => {
    render(<FinalOutput output={10} onRadioCoordsChange={mockOnRadioCoordsChange} />);

    expect(mockOnRadioCoordsChange).toHaveBeenCalled();
  });

  test('input is disabled', () => {
    render(<FinalOutput output={10} onRadioCoordsChange={mockOnRadioCoordsChange} />);

    const input = screen.getByTestId('final-output');
    expect(input).toBeDisabled();
  });
});
