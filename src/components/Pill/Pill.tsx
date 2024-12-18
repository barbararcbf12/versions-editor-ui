import clsx from "clsx";
import type { Version } from "../../types";
import { isTestVersion } from "../../utilities/checkVersionType";
import { SELECTED_OPTION_ID_INTERVALS_OPERATORS } from "../../constants/optionIntervals";

type PillProps = {
  version: Version;
  handleClick: (version: Version) => void;
  conflict?: boolean;
  className?: string;
}

const warningClasses = 'text-white bg-warning-main hover:bg-warning-dark';
const testClasses = 'text-neutral-main bg-surface-dark hover:bg-gray-400';
const productionClasses = 'text-white bg-neutral-dark hover:bg-neutral-main';

export const Pill = ({
 version,
 handleClick,
 conflict,
 className
}: PillProps) => {
  const isIntervalOperator = version.option?.id && SELECTED_OPTION_ID_INTERVALS_OPERATORS.includes(version.option?.id);
  const variantType = conflict === true ? 'warning' : isTestVersion(version) && !conflict ? 'test' : 'production';


  const resultantPillClasses = variantType === 'warning' ? warningClasses : variantType === "test" ? testClasses : productionClasses;

  //Alternative to previous code, for better readability
  let versionValueWithSymbol;

  if (version.option?.operator) {
    if (!isIntervalOperator) {
      versionValueWithSymbol = `${version.option.operator} ${version.value}`;
    } else {
      versionValueWithSymbol = `${version.option.operator.replace('x', version.value)}`;
    }
  } else {
    versionValueWithSymbol = version.value;
  }

  return (
    <button
      type="button"
      className={ clsx("text-base px-2 py-0.25 rounded-full cursor-pointer", resultantPillClasses, className) }
      onClick={() => handleClick(version)}
    >
      { versionValueWithSymbol }
    </button>
  )
}

export default Pill;
