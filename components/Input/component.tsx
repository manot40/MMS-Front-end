import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: string;
  label: string;
  value?: string | number;
  disabled?: boolean;
  parentClass?: string;
  onChange?: (e: any) => void;
}

export const Input: FC<Props> = ({
  label,
  placeholder,
  type,
  disabled,
  value,
  parentClass,
  className,
  onChange,
}) => {
  return (
    <div className={"form-group max-w-content " + parentClass}>
      {label && <label className={"text-xs ml-1 mb-2 " + (disabled && "text-neutral-500")}>{label}</label>}
      <input
        className={"input " + className}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange && onChange(e.currentTarget.value)}
      />
    </div>
  );
};
