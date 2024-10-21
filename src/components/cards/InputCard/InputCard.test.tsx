import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputCard from './InputCard';

describe('InputCard Component', () => {
  const mockOnInputChange = jest.fn();
  const mockOnRadioCoordsChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<InputCard x={5} onInputChange={mockOnInputChange} onRadioCoordsChange={mockOnRadioCoordsChange} />);
  });

  test('calls onInputChange with correct value when input changes', () => {
    render(<InputCard x={5} onInputChange={mockOnInputChange} onRadioCoordsChange={mockOnRadioCoordsChange} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '10' } });

    expect(mockOnInputChange).toHaveBeenCalledWith(10);
  });

  test('does not call onInputChange if input is not a number', () => {
    render(<InputCard x={5} onInputChange={mockOnInputChange} onRadioCoordsChange={mockOnRadioCoordsChange} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 'invalid' } });

    expect(mockOnInputChange).not.toHaveBeenCalled();
  });

  test('calls onRadioCoordsChange with correct coordinates', () => {
    render(<InputCard x={5} onInputChange={mockOnInputChange} onRadioCoordsChange={mockOnRadioCoordsChange} />);

    expect(mockOnRadioCoordsChange).toHaveBeenCalled();
  });
});
