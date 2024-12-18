import { useReducer, ChangeEvent } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Pill from "../../components/Pill/Pill";
import { findConflicts } from "../../utilities/findConflicts";
import { options } from "../../constants/versionOptions";
import type { IntervalValue, Option, Version } from "../../types";
import { uiTexts } from "../../constants/uiTexts";
import { versionPattern } from "../../constants/versionPattern";
import { isTestVersion } from "../../utilities/checkVersionType";
import { initialIntervalValues, SELECTED_OPTION_ID_INTERVALS_OPERATORS } from "../../constants/optionIntervals";

type State = {
  selectedOption: Option | null;
  selectedVersion: Version | null;
  openVersionForm: boolean;
  editMode: boolean;
  addedVersions: Version[];
  versionValue: string;
  intervalValues: IntervalValue;
  error: string;
  conflictedTestVersions: Version[];
  conflictedProductionVersions: Version[];
};

type Action =
  | { type: "SET_OPTION"; payload: Option | null }
  | { type: "SET_VERSION"; payload: Version | null }
  | { type: "SET_OPEN_FORM"; payload: boolean }
  | { type: "SET_EDIT_MODE"; payload: boolean }
  | { type: "SET_ADDED_VERSIONS"; payload: Version[] }
  | { type: "SET_VERSION_VALUE"; payload: string }
  | { type: "SET_INTERVAL_VALUES"; payload: Partial<IntervalValue> }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_CONFLICTS"; payload: { test: Version[]; production: Version[] } }
  | { type: "RESET_FORM" };

const initialState: State = {
  selectedOption: null,
  selectedVersion: null,
  openVersionForm: false,
  editMode: false,
  addedVersions: [],
  versionValue: "",
  intervalValues: initialIntervalValues,
  error: "",
  conflictedTestVersions: [],
  conflictedProductionVersions: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_OPTION":
      return { ...state, selectedOption: action.payload };
    case "SET_VERSION":
      return { ...state, selectedVersion: action.payload };
    case "SET_OPEN_FORM":
      return { ...state, openVersionForm: action.payload };
    case "SET_EDIT_MODE":
      return { ...state, editMode: action.payload };
    case "SET_ADDED_VERSIONS":
      return { ...state, addedVersions: action.payload };
    case "SET_VERSION_VALUE":
      return { ...state, versionValue: action.payload };
    case "SET_INTERVAL_VALUES":
      return {
        ...state,
        intervalValues: { ...state.intervalValues, ...action.payload },
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_CONFLICTS":
      return {
        ...state,
        conflictedTestVersions: action.payload.test,
        conflictedProductionVersions: action.payload.production,
      };
    case "RESET_FORM":
      return {
        ...state,
        selectedOption: null,
        selectedVersion: null,
        editMode: false,
        versionValue: "",
        intervalValues: initialIntervalValues,
        error: "",
      };
    default:
      return state;
  }
}

export default function VersionsEditor() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isIntervalOperator = state.selectedOption && SELECTED_OPTION_ID_INTERVALS_OPERATORS.includes(state.selectedOption.id);

  const resetForm = (isDuplicated = false) => {
    dispatch({ type: "RESET_FORM" });
    if (!isDuplicated) {
      dispatch({ type: "SET_OPEN_FORM", payload: false });
    }
  };

  const checkForConflicts = (versions: Version[]) => {
    const productionVersions: Version[] = [];
    const testVersions = versions.filter((version) => {
      if (isTestVersion(version)) {
        productionVersions.push(version);
        return false;
      }
      return true;
    });

    dispatch({
      type: "SET_CONFLICTS",
      payload: {
        test: findConflicts(testVersions),
        production: findConflicts(productionVersions),
      },
    });
  };

  const handleVersionInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch({ type: "SET_ERROR", payload: "" });

    if (!isIntervalOperator) {
      dispatch({ type: "SET_VERSION_VALUE", payload: value });
    } else {
      dispatch({
        type: "SET_INTERVAL_VALUES",
        payload: name === "start-interval-value" ? { start: value } : { end: value },
      });
    }
  };

  const isValidInput = versionPattern.test(state.versionValue) || (versionPattern.test(state.intervalValues.start) && versionPattern.test(state.intervalValues.end));

  const editOrAddNewVersion = () => {
    const newVersion = !isIntervalOperator && state.selectedOption
      ? { option: state.selectedOption, value: state.versionValue }
      : {
        option: state.selectedOption,
        value: `${state.intervalValues.start} - ${state.intervalValues.end}`,
      };

    const isDuplicate = state.addedVersions.some(
      (version) =>
        version.value === newVersion.value &&
        version.option?.id === newVersion?.option?.id
    );

    if (isDuplicate) {
      dispatch({ type: "SET_ERROR", payload: uiTexts.errorMessages.duplicatedVersion });
      return;
    }

    if (!state.selectedOption) {
      dispatch({ type: "SET_ERROR", payload: uiTexts.errorMessages.noSelectedOption });
      return;
    }

    if(!isValidInput) {
      dispatch({ type: "SET_ERROR", payload: uiTexts.errorMessages.invalidVersionFormat });
      return;
    }

    if (state.editMode) {
      const updatedVersions = state.addedVersions.map((version) =>
        version.value === state.selectedVersion?.value &&
        version.option?.id === state.selectedVersion?.option?.id
          ? newVersion
          : version
      );
      checkForConflicts(updatedVersions);
      dispatch({type: "SET_ADDED_VERSIONS", payload: updatedVersions});
    } else {
      const newVersions = [ ...state.addedVersions, newVersion ];
      checkForConflicts(newVersions);
      dispatch({type: "SET_ADDED_VERSIONS", payload: newVersions});
    }
      resetForm();
  };

  const handleEditVersion = (version: Version) => {
    dispatch({ type: "SET_OPEN_FORM", payload: true });
    dispatch({ type: "SET_OPTION", payload: version.option });
    dispatch({ type: "SET_VERSION", payload: version });
    dispatch({ type: "SET_EDIT_MODE", payload: true });

    if (SELECTED_OPTION_ID_INTERVALS_OPERATORS.includes(version.option?.id || -1)) {
      const [start, end] = version.value.split(" - ");
      dispatch({ type: "SET_INTERVAL_VALUES", payload: { start, end } });
    } else {
      dispatch({ type: "SET_VERSION_VALUE", payload: version.value });
    }
  };

  const deleteVersion = () => {
    const filteredVersions = state.addedVersions.filter(
      (v) =>
        v.value !== state.selectedVersion?.value ||
        v.option?.id !== state.selectedVersion?.option?.id
    );
    checkForConflicts(filteredVersions);
    dispatch({ type: "SET_ADDED_VERSIONS", payload: filteredVersions });
    resetForm();
  };

  const startNewVersion = () => {
    dispatch({ type: "SET_OPEN_FORM", payload: !state.openVersionForm })
    dispatch({ type: "SET_EDIT_MODE", payload: false });
  }

  const setOption = (option: Option | null) => {
    dispatch({ type: "SET_OPTION", payload: option });
    dispatch({ type: "SET_ERROR", payload: "" });
  }

  return (
    <div className="bg-white p-6 rounded-sm w-full flex flex-col gap-y-5">
      {/* Header */}
      <header className="flex justify-between">
        <h2 className="style-h5 text-neutral-main">Versions</h2>
        <Button
          data-testid="add-version"
          onClick={startNewVersion}
        >
          {!state.openVersionForm
            ? uiTexts.buttonLabels.addVersion
            : uiTexts.buttonLabels.cancelVersion}
        </Button>
      </header>

      {/* Added Versions */}
      {state.addedVersions.length > 0 && (
        <div className="inline-block gap-x-2">
          {state.addedVersions.map((version, index) => version ? (
            <Pill
              key={`version-${index}`}
              data-testid={`version-${index}`}
              className={"mr-1.5 mb-1.5"}
              version={version}
              handleClick={handleEditVersion}
              conflict={
                state.conflictedTestVersions.includes(version) ||
                state.conflictedProductionVersions.includes(version)
              }
            />
          ) : null )}
        </div>
      )}

      {/* Version Form */}
      {state.openVersionForm && (
        <div className="flex justify-between w-full flex-col md:flex-row relative mt-10 md:mt-0">
          <div className="flex w-full space-y-3 md:space-y-0 space-x-3 h-10 justify-center items-center flex-col md:flex-row">
            <div className="flex space-y-3 md:space-y-0 md:space-x-3 w-full flex-col md:flex-row">
              <Select
                data-testid="select-options"
                error={state.error === uiTexts.errorMessages.noSelectedOption}
                placeholder={uiTexts.placeHolders.selectOptions}
                label="Operator"
                selectedOption={state.selectedOption}
                options={options}
                onChangeSelection={setOption}
              />
              {!isIntervalOperator ? (
                <Input
                  name="version-value"
                  error={state.error === uiTexts.errorMessages.invalidVersionFormat || state.error === uiTexts.errorMessages.duplicatedVersion}
                  placeholder={uiTexts.placeHolders.version}
                  value={state.versionValue}
                  onChange={handleVersionInput}
                />
              ) : (
                <>
                  <Input
                    name="start-interval-value"
                    placeholder={uiTexts.placeHolders.minVersion}
                    variant="startInterval"
                    error={state.error === uiTexts.errorMessages.invalidVersionFormat || state.error === uiTexts.errorMessages.duplicatedVersion}
                    value={state.intervalValues.start}
                    onChange={handleVersionInput}
                    intervalOperators={state.selectedOption?.operator?.split("x")}
                  />
                  <Input
                    name="end-interval-value"
                    placeholder={uiTexts.placeHolders.maxVersion}
                    variant="endInterval"
                    error={state.error === uiTexts.errorMessages.invalidVersionFormat || state.error === uiTexts.errorMessages.duplicatedVersion}
                    value={state.intervalValues.end}
                    onChange={handleVersionInput}
                    intervalOperators={state.selectedOption?.operator?.split("x")}
                  />
                </>
              )}
            </div>
            <div className="flex space-x-3 space-y-0 items-center">
              <Button
                data-testid="save-version"
                aria-label={uiTexts.buttonLabels.saveVersion}
                variant="save"
                onClick={editOrAddNewVersion}
              />
              <Button
                data-testid="delete-version"
                aria-label={uiTexts.buttonLabels.deleteVersion}
                variant="delete"
                onClick={deleteVersion}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-10 md:mt-0">
        {state.error && <p className="body-3 text-error-main">{state.error}</p>}
        {!state.addedVersions.length && !state.openVersionForm && (
          <p className="body-3 text-neutral-subtle">{uiTexts.messages.noVersions}</p>
        )}
        {!!state.addedVersions.length && (
          <p className="body-3 text-neutral-subtle">{uiTexts.messages.editVersion}</p>
        )}
      </footer>
    </div>
  );
}
