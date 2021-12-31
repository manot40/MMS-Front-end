import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { useHeaderVisible } from "libs/hooks/useHeaderVisible";
import { Container } from "components";

export const Navigation: FC = () => {
  const [mounted, setMounted] = useState(false);

  const { pathname } = useRouter();
  const visible = useHeaderVisible();

  useEffect(() => setMounted(true), []);

  return (
    <header
      className={clsx(
        "relative z-20 w-full border-b border-neutral-400 dark:border-neutral-600",
        visible ? "top-0" : "-top-24"
      )}
    >
      <div className="absolute flex -z-10 w-screen h-full opacity-80 bg-white dark:bg-black" />
      <Container className="flex items-center justify-between w-auto py-5">
        <Link passHref href="/">
          <div className="inline-flex text-xl">
            <h1 className="tracking-wide font-extrabold select-none">MMS</h1>
            &nbsp;
            <p className="tracking-wider select-none">APP</p>
          </div>
        </Link>
        <div className="hidden md:flex text-neutral-800 dark:text-neutral-500">
          <Link href="#">
            <a className="text-sm mr-4 self-center">Kevin Sandiho</a>
          </Link>
          <Image src="https://github.com/manot40.png" alt="Yeah" width={30} height={30} className="rounded-full"/>
        </div>
      </Container>
      <Container className="flex items-center w-auto py-4 text-neutral-800 dark:text-neutral-500">
        <div className="flex items-center">
          <div className="submenu-bar">
            <Link href="/">
              <a className={pathname === "/" ? "active" : ""}>Dasbor</a>
            </Link>
            <Link href="/warehouse">
              <a className={pathname === "/warehouse" ? "active" : ""}>Gudang</a>
            </Link>
            <Link href="/product">
              <a className={pathname === "/product" ? "active" : ""}>Produk</a>
            </Link>
            <Link href="/transaction">
              <a className={pathname === "/transaction" ? "active" : ""}>Transaksi</a>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
