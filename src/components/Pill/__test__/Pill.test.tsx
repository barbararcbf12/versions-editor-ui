import { render, screen, fireEvent } from "@testing-library/react";
import Pill from "../Pill";
import type { Version } from "../../../types";
import { options } from "../../../constants/versionOptions";

describe("Pill Component", () => {
  const mockHandleClick = jest.fn();

  const mockVersion: Version = {
    value: "1.2.3",
    option: options.find(option => option.id === 1)!,
  };

  const intervalVersion: Version = {
    value: "1.0.0 - 2.0.0",
    option: options.find(option => option.id === 7)!,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the pill correctly for a standard version", () => {
    render(<Pill version={mockVersion} handleClick={mockHandleClick} />);

    // Verify the pill displays the formatted version value
    expect(screen.getByText("1.2.3")).toBeInTheDocument();

    // Verify the button is rendered with the correct class
    expect(screen.getByRole("button")).toHaveClass("bg-neutral-dark");
  });

  it("renders the pill correctly for an interval operator", () => {
    render(<Pill version={intervalVersion} handleClick={mockHandleClick} />);

    // Verify the pill displays the interval version value
    expect(screen.getByText("]1.0.0 - 2.0.0[")).toBeInTheDocument();

    // Verify the button is rendered with the correct class
    expect(screen.getByRole("button")).toHaveClass("bg-neutral-dark");
  });

  it("applies the warning style when there is a conflict", () => {
    render(<Pill version={mockVersion} handleClick={mockHandleClick} conflict={true} />);

    // Verify the pill is styled for conflicts
    expect(screen.getByRole("button")).toHaveClass("bg-warning-main");
  });

  it("applies the production style when it is a production version without conflict", () => {
    const productionVersion: Version = {
      value: "999.1.0",
      option: options.find(option => option.id === 2)!
    };

    render(<Pill version={productionVersion} handleClick={mockHandleClick} />);

    // Verify the pill is styled for production versions
    expect(screen.getByRole("button")).toHaveClass("bg-surface-dark");
  });

  it("handles click events correctly", () => {
    render(<Pill version={mockVersion} handleClick={mockHandleClick} />);

    // Trigger a click on the pill
    fireEvent.click(screen.getByRole("button"));

    // Verify the click handler is called with the correct version
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    expect(mockHandleClick).toHaveBeenCalledWith(mockVersion);
  });
});
