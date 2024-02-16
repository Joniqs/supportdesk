import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('BackButton', () => {
  it('renders without crashing', () => {
    render(<BackButton />);
  });

  it('renders the button with correct class names', () => {
    const { getByRole } = render(<BackButton />);
    const button = getByRole('button');
    expect(button).toHaveClass('btn', 'btn-reverse', 'btn-back');
  });

  it('triggers navigate function with correct parameter when clicked', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByText } = render(<BackButton />);
    const button = getByText('Back');
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
