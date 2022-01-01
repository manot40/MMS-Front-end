import { HTMLAttributes } from "react";
import { FC } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen font-sans transition-all">
      {children}
    </div>
  );
};
