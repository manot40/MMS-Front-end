import React, { FC } from "react";
import clsx from "clsx";
import Props from "./props";

export const Container: FC<Props>= ({className, children}) => {
  return (
    <div className={clsx("px-4 mx-auto max-w-screen-lg", className)}>
      {children}
    </div>
  )
}