import { Field, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ReactComponent as Chevron } from '../../assets/icons/chevron.svg';
import type { Option } from "../../types";
import clsx from "clsx";

type SelectFieldProps = {
  error?: boolean;
  label?: string;
  placeholder?: string;
  options: Option[];
  selectedOption: Option | null;
  onChangeSelection: (option: Option | null) => void;
}

export const Select = ({
  error,
  label,
  placeholder,
  options,
  selectedOption,
  onChangeSelection
}: SelectFieldProps) => {
  return (
    <Field className="peer flex flex-col relative">
      <Listbox value={ selectedOption } onChange={ onChangeSelection }>
        {({ open  }) => (
          <span data-testid="select-element">
            <ListboxButton
              className={ clsx("peer group select-field px-3 min-w-72 flex justify-between h-8", error ? "error" : "" ) }
              aria-label={ selectedOption?.name || "Dropdown toggle" }
            >
              { selectedOption ? selectedOption.name : <span className={ clsx(selectedOption ? "-mt-1" : "-mt-1", "text-neutral-subtle") }>{ placeholder }</span> }
              <span className={ clsx("flex items-center -m-1.5", {"rotate-180": open}) }>
                <Chevron aria-hidden="true" data-testid="chevron-icon"/>
              </span>
            </ListboxButton>
            <ListboxOptions
              anchor="bottom start"
              className="bg-white rounded-sm shadow min-w-80 border border-border-main py-2"
            >
              { options.map((option) => (
                <ListboxOption
                  key={ option.id }
                  value={ option }
                  className="cursor-pointer data-[focus]:bg-surface-dark data-[focus]:text-neutral-main data-[selected]:text-white data-[selected]:bg-neutral-dark bg-white px-6 py-3 w-full"
                >
                  { option.name }
                </ListboxOption>
              )) }
            </ListboxOptions>
            {selectedOption ? (
              <span
                className="px-3 text-11 text-neutral-light peer-focus:inline-flex peer-focus:absolute peer-focus:top-0 inline-flex absolute top-0"
              >
                { label }
              </span>
            ) : null}
          </span>
        ) }
      </Listbox>
    </Field>
  )
}
export default Select;