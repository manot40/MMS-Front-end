import { FC, memo, useCallback, useEffect, useState } from "react";
import { useWindowSize } from "libs/hooks/useWindowSize";
import { useAuth } from "libs/context/AuthContext";
import { useRouter } from "next/router";
import { Container } from "components";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const Component: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const { pathname } = useRouter();
  const { width } = useWindowSize();
  const { user, logout } = useAuth();

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return (
    <header className="sticky z-20 w-full border-b backdrop-blur border-neutral-300 dark:border-neutral-600 -top-[4rem] md:-top-16">
      <div className="absolute flex -z-10 w-full h-full opacity-80 bg-white dark:bg-black" />
      <Container className="flex items-center justify-between w-auto py-4">
        <Link passHref href="/">
          <div className="inline-flex text-xl">
            <h1 className="tracking-wide font-extrabold select-none">MMS</h1>
            &nbsp;
            <p className="tracking-wider select-none">APP</p>
          </div>
        </Link>
        <div
          className="flex space-x-2 cursor-pointer transition-colors duration-300 hover:text-black dark:hover:text-white"
          onClick={toggleTheme}
        >
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
      <Container
        className={clsx(
          "flex relative justify-between items-center w-auto text-neutral-600 dark:text-neutral-400",
          width < 480 && "overflow-x-auto"
        )}
      >
        <div className="flex items-center py-3">
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
        <div className="md:hidden cursor-pointer sticky right-0 bg-transaprent hover:text-black dark:hover:text-white">
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-r from-transparent to-white dark:to-black" />
          {/** @ts-ignore */}
          <ion-icon class="bg-white dark:bg-black mt-1" name="menu" size="large" />
        </div>
        <div
          className="hidden md:flex px-4 py-2 cursor-pointer transition-colors duration-300 hover:text-black hover:dark:text-white text-neutral-600 dark:text-neutral-400"
          onClick={() => logout()}
        >
          <span className="mr-2 self-center text-sm">{user?.name}</span>
          <Image
            src="https://github.com/manot40.png"
            alt="Yeah"
            width={28}
            height={28}
            className="rounded-full"
          />
        </div>
      </Container>
    </header>
  );
};

export const Navigation = memo(Component);
