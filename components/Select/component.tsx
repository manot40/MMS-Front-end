/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { Input } from "components";
import { Chevron } from "./Chevron";
import { filterArray, prettyString } from "libs/utils";
import { FC, useCallback, useState, useEffect, useRef, memo } from "react";

type Option = { [key: string]: string };

interface Props {
  labelHtml?: string;
  idKey?: string;
  labelKey?: string;
  placeholder: string;
  multiple?: boolean;
  variant?: "default" | "outline" | "flat";
  colorScheme?: "primary" | "danger" | "warning" | "success" | "info";
  className?: string;
  options: Option[];
  value?: string | string[];
  searchable?: boolean;
  required?: boolean;
  onChange?: (value: string | string[]) => void;
};

const SelectComponent: FC<Props> = ({
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
  onChange,
}) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const focusedOption = useRef<HTMLDivElement>(null);

  const [chosen, setChosen] = useState<Option[]>([]);
  const [focus, setFocus] = useState<Option>({});
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const def = required && options[0] ? [options[0]] : [];
    if (!Array.isArray(value)) {
      const target = options.find((option) => option[idKey] === value);
      setChosen(target ? [target] : def);
    } else {
      setChosen(
        value ? options.filter((option) => value.includes(option[idKey])) : def
      );
    }
  }, [value]);

  useEffect(() => {
    if (onChange) {
      const toObj: string[] = chosen.map((value) => value[idKey].toString());
      multiple ? onChange(toObj) : onChange(toObj[0]);
    }
  }, [chosen]);

  useEffect(() => {
    !isOpen && setSearch("");
  }, [isOpen]);

  const onClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onBlur = useCallback(() => {
    !isHover && setIsOpen(false);
  }, [isHover]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case " ":
        setIsOpen(!isOpen);
        break;
      case "Enter":
        setIsOpen(true);
        setIsHover(true);
        searchable && setTimeout(() => searchInput.current?.focus(), 300);
        break;
      case "Escape":
      case "Tab":
        focus[idKey] && e.preventDefault();
        setIsOpen(false);
        setIsHover(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        !isOpen && setIsOpen(true);
        setFocus((() => {
          const idx = options.findIndex((val) => val[idKey] === focus[idKey]);
          const next = idx === -1 ? 0 : idx + 1;
          return options[next];
        })());
        break;
      case "ArrowUp":
        e.preventDefault();
        !isOpen && setIsOpen(true);
        setFocus((() => {
          const idx = options.findIndex((val) => val[idKey] === focus[idKey]);
          const next = idx === -1 ? 0 : idx - 1;
          return options[next];
        })());
        break;
      default:
        break;
    }
  }, []);

  const onOptionClick = useCallback(
    (e) => {
      const { id, label } = e.currentTarget.dataset;
      const obj = { [idKey]: id, [labelKey]: label };
      if (!multiple) {
        setChosen([obj]);
        setIsOpen(false);
        setIsHover(false);
      } else {
        console.log("Multiple");
      }
    },
    [multiple]
  );

  const renderChosen = () => {
    if (chosen[0]) {
      const result = multiple
        ? chosen.map((val, i) => (
            <div key={i.toString()} className="badge">
              {val[labelKey]}
            </div>
          ))
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
          ref={focus[idKey] === option[idKey] ? focusedOption : undefined}
          key={option[idKey] || idx}
          data-id={option[idKey]}
          data-label={option[labelKey]}
          onClick={onOptionClick}
          className={clsx(
            "option",
            focus[idKey] === option[idKey] && "focused",
            chosen.find((val) => val[labelKey] === option[labelKey]) && "selected"
          )}
        >
          {prettyString(option[labelKey])}
        </div>
      );
    });
  }, [search, chosen]);

  return (
    <div className={clsx("form-group", className)} onKeyDown={onKeyDown}>
      {isOpen && (
        <div className="select-wrapper">
          <div className="dark:bg-black bg-neutral-800 opacity-60 w-full h-full" />
          <h1>{placeholder}</h1>
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
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {options.length && searchable ? (
            <Input
              // @ts-ignore
              onChange={setSearch}
              ref={searchInput}
              onFocus={() => {}}
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

export const Select = memo(SelectComponent);
