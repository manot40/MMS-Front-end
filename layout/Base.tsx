
import AuthProvider from 'libs/context/AuthContext'
import { HTMLAttributes } from "react";
import { useTheme } from "next-themes";
import Head from "next/head";
import { FC } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const BaseLayout: FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen font-sans text-neutral-900 dark:text-neutral-200 transition-all">
      <Head>
        <meta name="theme-color" content={theme === "dark" ? "#000000" : "#FFFFFF"} />
      </Head>
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  );
};
