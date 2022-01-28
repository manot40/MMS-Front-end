import { FC, memo, useCallback, useEffect, useState } from "react";
import { useWindowSize } from "libs/hooks/useWindowSize";
import { useAuth } from "libs/context/AuthContext";
import { prettyString } from "libs/utils";
import { useRouter } from "next/router";
import { Container } from "components";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import profile from 'public/images/defaultProfile.jpg';

const Component: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  const { pathname } = useRouter();
  const { width } = useWindowSize();
  const { user, logout } = useAuth();
  const avatar = user?.avatar || "default.jpg";
  console.log(avatar);
  const optionClass = "px-4 py-4 md:py-3 select-none text-sm cursor-pointer border-b dark:border-neutral-800 hover:bg-neutral-200 hover:dark:bg-neutral-700 hover:dark:text-white hover:text-black";

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return (
    <header className="sticky z-20 w-full border-b backdrop-blur border-neutral-300 dark:border-neutral-600 -top-[3.9rem] md:-top-15">
      <div className="absolute flex -z-10 w-full h-full opacity-80 bg-white dark:bg-black" />
      <Container className="flex items-center justify-between w-auto py-4">
        <Link passHref href="/">
          <div className="inline-flex text-xl">
            <h1 className="tracking-wide font-extrabold select-none">MMS</h1>
            &nbsp;
            <p className="tracking-wider select-none">APP</p>
          </div>
        </Link>
      </Container>
      <Container
        className={clsx(
          "flex relative justify-between items-center space-x-4 w-auto text-neutral-600 dark:text-neutral-400",
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
        <div
          className="relative flex transition-all duration-300 text-neutral-600 dark:text-neutral-400"
          onClick={() => {}}
        >
          <span className="block px-2 self-center w-6 h-6 text-sm cursor-pointer">
            <Image
              src={`${process.env.NEXT_PUBLIC_OBJECT_STORAGE_URL}/images/user/` + avatar}
              alt="profile"
              layout="fill"
              className="rounded-full"
              onClick={() => setIsMenu(!isMenu)}
            />
          </span>
          {isMenu && (
            <div onClick={() => setIsMenu(false)} className="fixed md:hidden top-0 left-0 w-screen h-screen z-20">
              <div className="dark:bg-black bg-neutral-800 opacity-90 w-full h-full" />
            </div>
          )}
          <div className={clsx(
            "fixed top-[50vw] left-1/2 -translate-x-1/2 w-[80vw] md:translate-x-0 md:absolute md:top-10 md:right-0 md:left-auto md:w-56 bg-white dark:bg-black border border-neutral-400 dark:border-neutral-700 rounded-lg z-[9999] transition-all duration-300",
            !isMenu ? "-translate-y-3 invisible opacity-0" : "translate-y-0 visible opacity-100"
          )}>
            <div className="flex px-4 py-4 md:py-3 select-none text-sm border-b dark:border-neutral-800 hover:text-current">
              <span className="self-center mt-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_OBJECT_STORAGE_URL}/images/user/` + avatar}
                  alt="Yeah"
                  width={36}
                  height={36}
                  className="rounded-full hidden"
                />
              </span>
              <div className="flex-1 ml-3 text-xs space-y-1">
                <p className="font-semibold text-black dark:text-white text-sm">{user?.name}</p>
                <p>{prettyString(user?.role || "")} - {prettyString(user?.affiliation || "")}</p>
              </div>
            </div>
            <div className={optionClass + " "}>
              <div
                className="flex space-x-4 hover:text-black dark:hover:text-white"
                onClick={toggleTheme}
              >
                {mounted && (
                  // @ts-ignore
                  <ion-icon
                    name={theme !== "dark" ? "sunny" : "moon"}
                    style={{ fontSize: "18px" }}
                  />
                )}
                <p>Tema</p>
              </div>
            </div>
            <div className={optionClass + " "}>
              <div className="flex space-x-4 hover:text-black dark:hover:text-white">
                {/* @ts-ignore */}
                <ion-icon name="settings-outline" style={{ fontSize: "18px" }}/>
                <p>Pengaturan</p>
              </div>
            </div>
            <div className={optionClass + " text-danger font-semibold"} onClick={logout}>
              <div className="flex space-x-4">
                {/* @ts-ignore */}
                <ion-icon name="log-out-outline" style={{ fontSize: "18px" }}/>
                <p>Keluar</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export const Navigation = memo(Component);
