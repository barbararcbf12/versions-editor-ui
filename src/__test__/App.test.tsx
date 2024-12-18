import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App/App';

test('Renders Header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Versions Editor Feature/i);
  expect(headerElement).toBeInTheDocument();
});
