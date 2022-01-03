/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { Input } from "components";
import { Chevron } from "./Chevron";
import { filterArray, prettyString } from "libs/utils";
import { FC, useCallback, useState, useEffect, memo } from "react";

type Option = { [key: string]: string };

interface Props {
  labelHtml?: string;
  placeholder: string;
  idKey?: string;
  labelKey?: string;
  multiple?: boolean;
  variant?: "default" | "outline" | "flat";
  colorScheme?: "primary" | "danger" | "warning" | "success" | "info";
  className?: string;
  options: Option[];
  value?: string | string[];
  searchable?: boolean;
  required?: boolean;
  onChange?: (value: string | string[]) => void;
}

const Component: FC<Props> = ({
  labelHtml = "",
  placeholder = "Pilih item",
  idKey = "id",
  labelKey = "label",
  multiple = false,
  variant = "default",
  colorScheme = "primary",
  className,
  options,
  value,
  searchable,
  required,
  onChange
}) => {
  const [chosen, setChosen] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const def = required && options[0] ? [options[0]] : [];
    if (!Array.isArray(value)) {
      const target = options.find((option) => option[idKey] === value);
      setChosen(target ? [target] : def);
    } else {
      setChosen(value ? options.filter((option) => value.includes(option[idKey])) : def);
    }
  }, [value])

  useEffect(() => {
    if (onChange) {
      const toObj: string[] = chosen.map((value) => value[idKey].toString());
      multiple ? onChange(toObj) : onChange(toObj[0]);
    }
  }, [chosen]);

  const onClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onBlur = useCallback(() => {
    !isFocus && setIsOpen(false);
  }, [isFocus]);

  const onOptionClick = useCallback(
    (e) => {
      const { id, label } = e.currentTarget.dataset;
      const obj = { [idKey]: id, [labelKey]: label }
      if (!multiple) {
        setChosen([obj]);
        setIsOpen(false);
        setIsFocus(false);
      } else {
        console.log("Multiple");
      }
    },
    [multiple]
  );

  const renderChosen = () => {
    if (chosen[0]) {
      const result = multiple
        ? chosen.map((val, i) => <div key={i.toString()} className="badge">{val[labelKey]}</div>)
        : chosen[0][labelKey];
      return <div className="text-xs">{result}</div>;
    }
    return <div className="text-xs text-neutral-400">{placeholder}</div>;
  };

  const renderOptions = useCallback(() => {
    const list = searchable
      ? [...filterArray(options, labelKey, search)]
      : [...options];

    if (!list.length)
      return <div className="option disabled">Tidak ada data</div>;
    return list.map((option, idx) => {
      return (
        <div
          key={option[idKey] || idx}
          data-id={option[idKey]}
          data-label={option[labelKey]}
          onClick={onOptionClick}
          className={clsx(
            "option",
            chosen.find((val) => val[labelKey] === option[labelKey]) && "selected"
          )}
        >
          {prettyString(option[labelKey])}
        </div>
      );
    });
  }, [search, chosen]);

  return (
    <div className={clsx("form-group min-w-content", className)}>
      {isOpen && (
        <div className="select-wrapper">
          <div className="dark:bg-black bg-neutral-800 opacity-80 w-full h-full" />
          <h1>{placeholder}</h1>
          <div
            className="md:hidden cursor-pointer fixed text-white text-2xl font-semibold top-[16vw] right-[5.5vw] mt-0.5"
            onClick={() => (setIsFocus(false), setIsOpen(false))}
          >
            {/** @ts-ignore */}
            <ion-icon
              name="close"
              size="large"
            />
          </div>
        </div>
      )}
      <label className="text-xs ml-1 mb-2">{labelHtml}</label>
      <div className="flex relative items-center">
        <div
          onClick={onClick}
          onBlur={onBlur}
          tabIndex={0}
          className="select w-full"
        >
          {renderChosen()}
          <span className={clsx(isOpen ? "rotate-180" : "transform-none")}>
            <Chevron />
          </span>
        </div>
        <div
          className={clsx("options", !isOpen && "-translate-y-2 invisible")}
          onMouseEnter={() => setIsFocus(true)}
          onMouseLeave={() => setIsFocus(false)}
        >
          {options.length && searchable ? (
            <Input
              // @ts-ignore
              onChange={setSearch}
              onBlur={onBlur}
              label=""
              value={search}
              placeholder="Cari entri"
              parentClass="border-b border-neutral-300 dark:border-neutral-700"
              className={clsx(
                "rounded-none border-none bg-transparent",
                !isOpen && "transition-none"
              )}
            />
          ) : null}
          {renderOptions()}
        </div>
      </div>
    </div>
  );
};

export const Select = memo(Component);
