import clsx from "clsx";
import { forwardRef, HTMLAttributes, LegacyRef, memo } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: string;
  label: string;
  value?: string | number;
  disabled?: boolean;
  variant?: "default" | "outline" | "flat";
  colorScheme?: "primary" | "danger" | "warning" | "success" | "info";
  custom?: string;
  onChange?: (e: any) => void;
}

const InputComponent = (props: Props, ref: LegacyRef<HTMLInputElement>) => {
  const {
    label,
    placeholder,
    type,
    disabled,
    value,
    variant = "default",
    colorScheme = "primary",
    custom,
    className,
    onChange,
  } = props;
  return (
    <div className={"form-group " + className}>
      {label && (
        <label className={"text-xs ml-1 mb-2 " + (disabled && "text-neutral-500")}>
          {label}
        </label>
      )}
      <input
        {...props}
        ref={ref}
        className={clsx("input", custom)}
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
