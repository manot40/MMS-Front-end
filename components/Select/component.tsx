/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { Input } from "components";
import { filterArray, prettyString } from "libs/utils";
import { FC, useCallback, useState, useEffect, memo } from "react";
import { Chevron } from "./Chevron";

type POJO = {[key: string]: any};

interface Props {
  label?: string;
  placeholder: string;
  options: POJO[];
  value?: string | string[];
  id?: string | number;
  multiple?: boolean;
  searchable?: boolean;
  required?: boolean;
  onChange?: (value: POJO | POJO[]) => void;
  parentClass?: string;
  className?: string;
}

const Component: FC<Props> = ({
  label = "",
  placeholder = "Pilih item",
  options,
  value,
  id = "id",
  multiple,
  searchable,
  required,
  onChange,
  parentClass,
  className,
}) => {
  function getValue(): POJO[] {
    if (typeof value === "string") {
      const target = options.find((option) => option[id] === value)
      return target ? [target] : [];
    }
    return value ? options.filter((option) => value.includes(option[id])) : [];
  }
  const [values, setValues] = useState<POJO[]>(getValue());
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (onChange) {
      const toObj = values.map((value) => ({ ...value }));
      multiple ? onChange(toObj) : onChange(toObj[0]);
    }
  }, [values])

  const onClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onBlur = useCallback(() => {
    !isFocus && setIsOpen(false);
  }, [isFocus]);

  const onOptionClick = useCallback((e) => {
    const obj = e.currentTarget.dataset;
    if (!multiple) {
      setValues([obj]);
      setIsOpen(false);
      setIsFocus(false);
    } else {
      console.log("Multiple");
    }
  }, [multiple]);

  const renderValues = () => {
    if (values[0] && values[0][id]) {
      return <div className="text-xs">{prettyString(values[0].value)}</div>;
    }
    return <div className="text-xs text-neutral-400">{placeholder}</div>;
  };

  const renderOptions = useCallback(() => {
    const list = searchable
      ? [...filterArray(options, "value", search)]
      : [...options];

    if (!list.length)
      return <div className="option disabled">Tidak ada data</div>;
    return list.map((opt, idx) => {
      return (
        <div
          key={opt[id] || idx}
          data-value={opt.value}
          data-id={opt[id]}
          onClick={onOptionClick}
          className={clsx(
            "option",
            values.find(val => val.value === opt.value) && "selected")
          }
        >
          {prettyString(opt.value)}
        </div>
      );
    });
  }, [search, values]);

  return (
    <div className={"form-group min-w-content " + parentClass}>
      {isOpen && (
        <div className="select-wrapper">
          <div className="dark:bg-black bg-neutral-800 opacity-80 w-full h-full" />
          <h1>{placeholder}</h1>
        </div>
      )}
      <label className="text-xs ml-1 mb-2">{label}</label>
      <div className="flex md:relative items-center">
        <div
          onClick={onClick}
          onBlur={onBlur}
          tabIndex={0}
          className={"select " + className}
        >
          {renderValues()}
          <span className="inline-flex absolute text-neutral-500 right-2 top-3 bg-white dark:bg-black">
            {!isOpen && <Chevron />}
          </span>
        </div>
        <div
          className={clsx("options", !isOpen && "-translate-y-2 invisible")}
          onMouseEnter={() => setIsFocus(true)}
          onMouseLeave={() => setIsFocus(false)}
        >
          {(options.length && searchable) ? (
            <Input
              // @ts-ignore
              onChange={setSearch}
              label=""
              value={search}
              placeholder="Cari entri"
              parentClass="border-b border-neutral-300 dark:border-neutral-800"
              className={clsx("rounded-none bg-transparent", !isOpen && "transition-none")}
            />
          ) : null}
          {renderOptions()}
        </div>
      </div>
    </div>
  );
};

export const Select = memo(Component);
