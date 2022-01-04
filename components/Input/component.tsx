import { forwardRef, HTMLAttributes, LegacyRef, memo } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: string;
  label: string;
  value?: string | number;
  disabled?: boolean;
  parentClass?: string;
  variant?: "default" | "outline" | "flat";
  colorScheme?: "primary" | "danger" | "warning" | "success" | "info";
  onChange?: (e: any) => void;
}

const InputComponent = (props: Props, ref: LegacyRef<HTMLInputElement>) => {
  const {
    label,
    placeholder,
    type,
    disabled,
    value,
    parentClass,
    variant = "default",
    colorScheme = "primary",
    className,
    onChange,
  } = props;
  return (
    <div className={"form-group max-w-content " + parentClass}>
      {label && (
        <label className={"text-xs ml-1 mb-2 " + (disabled && "text-neutral-500")}>
          {label}
        </label>
      )}
      <input
        {...props}
        ref={ref}
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

export const Input = memo(forwardRef<HTMLInputElement, Props>(InputComponent));
