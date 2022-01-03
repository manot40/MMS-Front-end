import { FC, memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Container } from "components";
import { useWindowSize } from "libs/hooks/useWindowSize";

const Component: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { pathname } = useRouter();
  const { width } = useWindowSize();

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return (
    <header className="sticky z-20 w-full border-b backdrop-blur-md border-neutral-300 dark:border-neutral-600 -top-[4.35rem] md:-top-20">
      <div className="absolute flex -z-10 w-full h-full opacity-80 bg-white dark:bg-black" />
      <Container className="flex items-center justify-between w-auto py-4">
        <Link passHref href="/">
          <div className="inline-flex text-xl">
            <h1 className="tracking-wide font-extrabold select-none">MMS</h1>
            &nbsp;
            <p className="tracking-wider select-none">APP</p>
          </div>
        </Link>
        <div className="hidden md:flex px-4 py-2 cursor-pointer transition-colors duration-300 hover:text-black hover:dark:text-white text-neutral-600 dark:text-neutral-400">
          <span className="mr-4 self-center text-sm">John Doe</span>
          <Image
            src="https://github.com/manot40.png"
            alt="Yeah"
            width={28}
            height={28}
            className="rounded-full"
          />
        </div>
        <div className="md:hidden cursor-pointer hover:text-black dark:hover:text-white">
          {/** @ts-ignore */}
          <ion-icon name="menu" size="large" />
        </div>
      </Container>
      <Container
        className={clsx(
          "flex items-center justify-between w-auto py-2 text-neutral-600 dark:text-neutral-400",
          width < 480 && "overflow-x-auto"
        )}
      >
        <div className="flex items-center">
          <div className="submenu text-sm block md:flex space-x-4">
            <Link href="/">
              <a className={pathname === "/" ? "active" : ""}>Ringkasan</a>
            </Link>
            <Link href="/warehouse">
              <a className={pathname.match("warehouse") ? "active" : ""}>
                Gudang
              </a>
            </Link>
            <Link href="/product">
              <a className={pathname.match("product") ? "active" : ""}>
                Produk
              </a>
            </Link>
            <Link href="/transaction">
              <a className={pathname.match("transaction") ? "active" : ""}>
                Transaksi
              </a>
            </Link>
          </div>
        </div>
        <div
          className="flex space-x-2 cursor-pointer transition-colors duration-300 hover:text-black dark:hover:text-white"
          onClick={toggleTheme}
        >
          <span className="text-sm self-center hidden md:block">
            Tema {theme === "light" ? "Terang" : "Gelap"}
          </span>
          <div className="w-8 h-8 py-1.5 mx-1 rounded sm:ml-4">
            {mounted && (
              // @ts-ignore
              <ion-icon
                name={theme === "light" ? "sunny" : "moon"}
                style={{ fontSize: "21px" }}
              />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export const Navigation = memo(Component);
