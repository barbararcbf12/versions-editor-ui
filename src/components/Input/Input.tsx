import { ComponentPropsWithRef } from "react";
import clsx from "clsx";

type InputFieldProps = ComponentPropsWithRef<'input'> & {
  error?: boolean;
  variant?: 'default' | 'startInterval' | 'endInterval';
  intervalOperators?: string[];
}

export const Input = ({
  error,
  placeholder,
  variant='default',
  onChange,
  intervalOperators,
  ...rest
 }: InputFieldProps) => {
  return (
    <label className="group flex flex-col relative w-full">
      <input
        type="text"
        className={ clsx( "peer px-3 input-field w-full h-8", error ? "error" : "" ) }
        placeholder={ placeholder }
        onChange={ (e) => onChange && onChange(e) }
        { ...rest }
      />
      {variant !== 'default' && intervalOperators?.length ? (
        <span
          className={ clsx("px-1 absolute top-0 w-fit text-22 text-neutral-light",
            variant === 'endInterval' ? "left-[172px]" : "left-0",
          ) }
        >
          { variant === 'startInterval' ? intervalOperators[0] : intervalOperators[1] }
        </span>
      ) : null }
      <span
        className={ clsx("px-3 text-11 text-neutral-light hidden peer-focus:inline-flex peer-focus:absolute peer-focus:top-0") }>Version</span>
    </label>
  )
}

export default Input;
