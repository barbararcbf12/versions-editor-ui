import { ComponentPropsWithoutRef } from "react";
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import clsx from "clsx";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'default' | 'save' | 'delete';
};

//Classes for the different variants and disabled state
const disabledClasses = 'w-fit pt-1 px-2 bg-surface-dark text-neutral-light border border-border-light';
const variantSaveClasses = 'w-8 p-1 text-brand-main border border-brand-subtle hover:bg-brand-subtle';
const variantDeleteClasses = 'w-8 p-1 text-error-main border border-border-error hover:bg-error-subtle hover:border-error-light';
const defaultClasses = 'w-fit pt-1 px-2 button-2 text-neutral-main border border-border-light hover:bg-surface-subtle hover:border-border-light';

function Button({
  children,
  variant = 'default',
  className,
  ...props
}: ButtonProps) {
  const hasIcon = variant === 'save' || variant === 'delete';
  const {disabled, onClick, ...buttonProps} = props as ButtonProps;

  const buttonClasses = clsx('h-8 bg-white rounded-xs align-middle',
    disabled
      ? disabledClasses
      : variant === 'save'
        ? variantSaveClasses
        : variant === 'delete'
          ? variantDeleteClasses
          : defaultClasses,

  )

  const inner = hasIcon ? (
    <span
      className="flex flex-row items-center justify-center gap-x-5"
    >
      {children}
      {hasIcon ?
        <span className="h-5 w-5" aria-hidden="true">
          { variant === 'save' ? <CheckIcon data-testid="check-icon"/> : <CloseIcon data-testid="close-icon"/> }
        </span>
      : null }
    </span>
  ) : (
    children
  );

  return (
    <button
      type="button"
      { ...buttonProps }
      aria-disabled={ disabled }
      onClick={ !disabled ? onClick : undefined}
      className={buttonClasses}
    >
      {inner}
    </button>
  );
}

export default Button;
