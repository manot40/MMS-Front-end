import React, { FC, HTMLAttributes } from "react";
import clsx from "clsx";

type Props = HTMLAttributes<HTMLDivElement>;

export const Container: FC<Props>= ({className, children}) => {
  return (
    <div className={clsx("px-4 mx-auto max-w-screen-lg", className)}>
      {children}
    </div>
  )
}