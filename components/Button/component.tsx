import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, useState } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  children,
  isLoading,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      className={clsx("btn", className, isLoading && "loading")}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {!isLoading && children}
    </button>
  );
};
