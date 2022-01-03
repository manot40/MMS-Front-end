
import { HTMLAttributes } from "react";
import { useTheme } from "next-themes";
import Head from "next/head";
import { FC } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const BaseLayout: FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen font-sans transition-all">
      <Head>
        <meta name="theme-color" content={theme === "dark" ? "#000000" : "#FFFFFF"} />
      </Head>
      {children}
    </div>
  );
};
