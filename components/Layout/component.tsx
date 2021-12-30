import { FC } from "react";
import Props from "./props";

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen font-sans bg-neutral-100 dark:bg-neutral-900 transition-colors">
      {children}
    </div>
  );
};
