import clsx from "clsx";
import { Input } from "components";
import { FC, useCallback, useState } from "react";
import { Chevron } from "./Chevron";

type Option = {id?: string | number, value: string};

interface Props {
  options: Option[];
  multiple?: boolean;
  useSearch?: boolean;
  label: string;
  placeholder?: string;
  onChange?: (value: Option | Option[]) => void;
  parentClass?: string;
  className?: string;
}

export const Select: FC<Props> = ({
  options,
  multiple,
  useSearch,
  label,
  placeholder = "Pilih item",
  onChange,
  parentClass,
  className,
}) => {
  console.log("Render");
  const [values, setValues] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onOptionClick = useCallback((e) => {
    const { id, value } = e.currentTarget.dataset;
    if (!multiple) {
      setValues([{ id, value }]);
      setIsOpen(false);
      onChange && onChange({ id, value });
    } else {
      console.log("Multiple");
    }
  }, [multiple, onChange]);

  const onKeyDown = useCallback(() => {
    console.log("onKeyDown");
  }, []);

  const renderValues = () => {
    if (values.length === 0) {
      return <div className="text-xs">{placeholder}</div>;
    }
    return <div className="text-xs">{values[0].value}</div>;
  };

  const renderOptions = () => {
    if (!options.length)
      return <div className="option disabled">Tidak ada data</div>;
    return options.map((opt, idx) => {
      return (
        <div
          key={opt.id || idx}
          data-value={opt.value}
          data-id={opt.id}
          onClick={onOptionClick}
          className={clsx(
            "option",
            values.find(val => val.value === opt.value) && "selected")
          }
        >
          {opt.value}
        </div>
      );
    });
  }

  return (
    <div className={"form-group w-full " + parentClass}>
      <label className="text-xs ml-1 mb-2">{label}</label>
      <div className="flex relative items-center max-w-fit">
        <div
          onKeyDown={onKeyDown}
          onClick={onClick}
          tabIndex={0}
          className={"select " + className}
        >
          {renderValues()}
          <span className="inline-flex absolute text-neutral-500 right-2 top-3 bg-white dark:bg-black">
            {!isOpen && <Chevron />}
          </span>
        </div>
        <div className={clsx("options", !isOpen && "-translate-y-2 invisible")}>
          {(options.length && useSearch) ? (
            <Input
              placeholder="Cari entri..."
              parentClass="border-b border-neutral-300 dark:border-neutral-800"
              className="text-xs rounded-none"
            />
          ) : null}
          {renderOptions()}
        </div>
      </div>
    </div>
  );
};
