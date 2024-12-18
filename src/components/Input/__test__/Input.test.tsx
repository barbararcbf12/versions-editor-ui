import { render, screen, fireEvent } from '@testing-library/react';
import Input from "../Input";

describe('Input Component', () => {

  it('renders the input with a placeholder', () => {
    render(<Input placeholder="Enter text" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('renders the input with a label', () => {
    render(<Input value="1.1.1" placeholder="Enter text" onChange={() => {}} />);

    const label = screen.getByText('Version');
    expect(label).toBeInTheDocument();
  });

  it('applies error class when error prop is true', () => {
    render(<Input error placeholder="Enter text" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('error');
  });

  it('does not apply error class when error prop is false', () => {
    render(<Input placeholder="Enter text" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).not.toHaveClass('error');
  });

  it('renders the input with startInterval variant and displays the first interval operator', () => {
    render(
      <Input
        variant="startInterval"
        intervalOperators={['>=', '<=']}
        placeholder="Enter text"
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();

    // Check if the first interval operator ('>=') is rendered
    const intervalOperator = screen.getByText('>=');
    expect(intervalOperator).toBeInTheDocument();
  });

  it('renders the input with endInterval variant and displays the second interval operator', () => {
    render(
      <Input
        variant="endInterval"
        intervalOperators={['>=', '<=']}
        placeholder="Enter text"
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();

    // Check if the second interval operator ('<=') is rendered
    const intervalOperator = screen.getByText('<=');
    expect(intervalOperator).toBeInTheDocument();
  });

  it('does not render interval operators if variant is "default" or intervalOperators is empty', () => {
    // Test default variant
    render(<Input variant="default" placeholder="Enter text" onChange={() => {}} />);
    expect(screen.queryByText('>=')).toBeNull();
    expect(screen.queryByText('<=')).toBeNull();

    // Test empty intervalOperators array
    render(
      <Input
        variant="startInterval"
        intervalOperators={[]}
        placeholder="Enter text"
        onChange={() => {}}
      />
    );
    expect(screen.queryByText('>=')).toBeNull();
  });

  it('fires onChange event when typing in the input field', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Enter text" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows the version label when input is focused', () => {
    render(<Input placeholder="Enter text" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.focus(input);

    const versionLabel = screen.getByText('Version');
    expect(versionLabel).toBeInTheDocument();
  });

  it('does not show the version label when input is not focused', () => {
    render(<Input placeholder="Enter text" onChange={() => {}} />);

    const versionLabel = screen.queryByText('Version');
    expect(versionLabel).toBeInTheDocument();
    expect(versionLabel).toHaveClass('hidden');
  });

});
