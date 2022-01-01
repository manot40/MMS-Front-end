import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: string;
  label?: string;
  disabled?: boolean;
  parentClass?: string;
}

export const Input: FC<Props> = ({
  label,
  placeholder,
  type,
  disabled,
  parentClass,
  className,
  onChange,
}) => {
  return (
    <div className={"form-group " + parentClass}>
      {label && <label className={"text-xs ml-1 mb-2 " + (disabled && "text-neutral-500")}>{label}</label>}
      <input
        className={"input " + className}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};
