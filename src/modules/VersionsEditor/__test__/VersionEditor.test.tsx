import { render, screen, fireEvent } from "@testing-library/react";
import VersionsEditor from "../VersionsEditor";
import { uiTexts } from "../../../constants/uiTexts";

jest.mock("../../../components/Select/Select", () => ({
  __esModule: true,  // This ensures the module is correctly mocked
  default: ({ options, selectedOption, onChangeSelection, ...props }: any) => {
    return(
      <div data-testid="select-element">
        <button onClick={ () => onChangeSelection(options[0]) }>
          { selectedOption ? selectedOption.name : "Operator" }
        </button>
        <ul>
          { options.map((option: any) => (
            <li key={ option.id } onClick={ () => onChangeSelection(option) }>
              { option.name }
            </li>
          )) }
        </ul>
      </div>
    )
  },
}));

describe("VersionsEditor Component", () => {
  it("renders the component with no versions initially", () => {
    render(<VersionsEditor />);
    expect(screen.getByText(uiTexts.messages.noVersions)).toBeInTheDocument();
    expect(screen.getByTestId("add-version")).toBeInTheDocument();
  });

  it("opens the form when 'Add Version' button is clicked", () => {
    render(<VersionsEditor />);
    fireEvent.click(screen.getByTestId("add-version"));
    const select = screen.getByTestId("select-element");
    expect(select).toBeInTheDocument();
  });

  it("closes the form when 'Cancel' button is clicked", () => {
    render(<VersionsEditor />);
    fireEvent.click(screen.getByTestId("add-version")); // Open form
    fireEvent.click(screen.getByTestId("add-version")); // Cancel form
    expect(screen.queryByPlaceholderText(uiTexts.placeHolders.selectOptions)).not.toBeInTheDocument();
  });

  it("shows an error when trying to save a version without selecting an option", () => {
    render(<VersionsEditor />);
    fireEvent.click(screen.getByTestId("add-version"));
    fireEvent.click(screen.getByTestId("save-version"));
    expect(screen.getByText(uiTexts.errorMessages.noSelectedOption)).toBeInTheDocument();
  });

  it("adds a version successfully when all fields are valid", () => {
    render(<VersionsEditor />);
    fireEvent.click(screen.getByTestId("add-version"));
    const select = screen.getByTestId("select-element");
    fireEvent.click(select);
    const equalToOption = screen.getByText("equal =");
    fireEvent.click(equalToOption);
    const input = screen.getByPlaceholderText(uiTexts.placeHolders.version);
    fireEvent.change(input, { target: { value: "1.0.0" } }); // Input a valid version
    fireEvent.click(screen.getByTestId("save-version"));

    expect(screen.getByText("1.0.0")).toBeInTheDocument();
    expect(screen.queryByText(uiTexts.messages.noVersions)).not.toBeInTheDocument();
  });

  it("edits a version and saves changes", () => {
    render(<VersionsEditor />);
    // Add an initial version
    fireEvent.click(screen.getByTestId("add-version"));
    const select = screen.getByTestId("select-element");
    fireEvent.click(select);
    const equalToOption = screen.getByText("equal =");
    fireEvent.click(equalToOption);
    fireEvent.change(screen.getByPlaceholderText(uiTexts.placeHolders.version), { target: { value: "1.0.0" } });
    fireEvent.click(screen.getByTestId("save-version"));

    // Edit the version
    fireEvent.click(screen.getByText("1.0.0"));
    const input = screen.getByPlaceholderText(uiTexts.placeHolders.version);
    fireEvent.change(input, { target: { value: "2.0.0" } });
    fireEvent.click(screen.getByTestId("save-version"));

    expect(screen.getByText("2.0.0")).toBeInTheDocument();
    expect(screen.queryByText("1.0.0")).not.toBeInTheDocument();
  });

  it("deletes a version", () => {
    render(<VersionsEditor />);

    // Add a version
    fireEvent.click(screen.getByTestId("add-version"));
    const select = screen.getByTestId("select-element");
    fireEvent.click(select);
    const equalToOption = screen.getByText("equal =");
    fireEvent.click(equalToOption);
    fireEvent.change(screen.getByPlaceholderText(uiTexts.placeHolders.version), { target: { value: "1.0.0" } });
    fireEvent.click(screen.getByTestId("save-version"));

    // Proceed with the rest of the test
    const version = screen.getByText("1.0.0");

    fireEvent.click(version);
    fireEvent.click(screen.getByTestId("delete-version"));

    expect(version).not.toBeInTheDocument();
    expect(screen.getByText(uiTexts.messages.noVersions)).toBeInTheDocument();
  });
});
