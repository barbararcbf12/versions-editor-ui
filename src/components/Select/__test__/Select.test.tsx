import { render, screen, fireEvent } from "@testing-library/react";
import type { Option } from "../../../types";
import Select from "../../../components/Select/Select";

describe("Select Component", () => {
  const mockOptions: Option[] = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2", operator: ">" },
    { id: 3, name: "Option 3", mathOperator: "<" },
  ];

  const mockOnChangeSelection = jest.fn();

  it("renders the component with the label and selected option", () => {
    render(
      <Select
        label="Test Label"
        options={mockOptions}
        selectedOption={mockOptions[0]}
        onChangeSelection={mockOnChangeSelection}
      />
    );

    // Check that the label is rendered
    expect(screen.getByText("Test Label")).toBeInTheDocument();

    // Check that the selected option is displayed in the button
    expect(screen.getByRole("button", { name: /Option 1/i })).toBeInTheDocument();
  });

  it("opens the dropdown when the button is clicked", () => {
    render(
      <Select
        label="Test Label"
        options={mockOptions}
        selectedOption={mockOptions[0]}
        onChangeSelection={mockOnChangeSelection}
      />
    );

    // Dropdown should not be visible initially
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Click the button to open the dropdown
    fireEvent.click(screen.getByRole("button", { name: /Option 1/i }));

    // Verify that the dropdown is now visible
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(mockOptions.length);

    // Verify that all options are rendered
    mockOptions.forEach((option, index) => {
      expect(options[index]).toHaveTextContent(option.name); // Match each option's text
    });
  });

  it("closes the dropdown when an option is selected", () => {
    render(
      <Select
        label="Test Label"
        options={mockOptions}
        selectedOption={mockOptions[0]}
        onChangeSelection={mockOnChangeSelection}
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByRole("button", { name: /Option 1/i }));

    // Click an option
    fireEvent.click(screen.getByText("Option 2"));

    // Verify that the dropdown is closed
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Verify that the onChangeSelection function is called with the selected option
    expect(mockOnChangeSelection).toHaveBeenCalledWith(mockOptions[1]);
  });

  it("displays the updated selected option when a new option is selected", () => {
    const { rerender } = render(
      <Select
        label="Test Label"
        options={mockOptions}
        selectedOption={mockOptions[0]}
        onChangeSelection={mockOnChangeSelection}
      />
    );

    // Open the dropdown and select an option
    fireEvent.click(screen.getByRole("button", { name: /Option 1/i }));
    fireEvent.click(screen.getByText("Option 3"));

    // Verify that the onChangeSelection function is called with the selected option
    expect(mockOnChangeSelection).toHaveBeenCalledWith(mockOptions[2]);

    // Rerender the component with the updated selectedOption prop
    rerender(
      <Select
        label="Test Label"
        options={mockOptions}
        selectedOption={mockOptions[2]}
        onChangeSelection={mockOnChangeSelection}
      />
    );

    // Verify that the updated selected option is displayed
    expect(screen.getByRole("button", { name: /Option 3/i })).toBeInTheDocument();
  });

  it("handles an empty options array gracefully", () => {
    render(
      <Select
        label="Empty Options Test"
        options={[]}
        selectedOption={{ id: 0, name: "" }}
        onChangeSelection={mockOnChangeSelection}
      />
    );

    // Verify that the dropdown button still renders
    expect(screen.getByLabelText("Dropdown toggle")).toBeInTheDocument();

    // Open the dropdown
    fireEvent.click(screen.getByRole("button"));

    // Verify that no options are displayed
    expect(screen.queryByRole("listbox")).toBeInTheDocument();
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  it("displays the chevron icon correctly and rotates when open", () => {
    render(
      <Select
        label="Chevron Test"
        options={mockOptions}
        selectedOption={mockOptions[0]}
        onChangeSelection={mockOnChangeSelection}
      />
    );

    const chevron = screen.getByTestId("chevron-icon");

    // Verify the chevron is present
    expect(chevron).toBeInTheDocument();

    // Open the dropdown
    fireEvent.click(screen.getByRole("button"));

    // Verify that the chevron rotates
    expect(chevron.parentElement).toHaveClass("rotate-180");

    // Close the dropdown
    fireEvent.click(screen.getByRole("button"));

    // Verify that the chevron returns to its original position
    expect(chevron.parentElement).not.toHaveClass("rotate-180");
  });
});
