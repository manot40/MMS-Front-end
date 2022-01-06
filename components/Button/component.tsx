import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  disabled?: boolean;
  variant?: Variant
  colorScheme?: ColorScheme;
}

export const Component: FC<Props> = ({
  children,
  isLoading,
  disabled,
  variant = "default",
  colorScheme = "primary",
  onClick,
  className,
}) => {
  return (
    <button
      className={clsx(
        "btn",
        { loading: isLoading },
        variant === "default" && variant,
        colorScheme,
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {!isLoading && children}
    </button>
  );
};

export const Button = memo(Component);
