import { render, screen, fireEvent } from '@testing-library/react';
import Button from "../Button";

describe('Button Component', () => {

  it('renders a button with default styles and no icon', () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click Me');
    expect(button).toHaveClass('h-8 bg-white rounded-xs align-middle');
    expect(screen.queryByTestId('check-icon')).toBeNull();
    expect(screen.queryByTestId('close-icon')).toBeNull();
  });

  it('renders a button with save variant and check icon', () => {
    render(<Button variant="save">Save</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Save');
    expect(button).toHaveClass('w-8 p-1 text-brand-main border border-brand-subtle hover:bg-brand-subtle');
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('renders a button with delete variant and close icon', () => {
    render(<Button variant="delete">Delete</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Delete');
    expect(button).toHaveClass('w-8 p-1 text-error-main border border-border-error hover:bg-error-subtle hover:border-error-light');
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked and not disabled', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders the button with correct classes when disabled', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-fit pt-1 px-2 bg-surface-dark text-neutral-light border border-border-light');
  });

});
