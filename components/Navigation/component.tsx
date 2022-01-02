import { FC, memo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Container } from "components";

const Component: FC = () => {
  const { pathname } = useRouter();

  return (
    <header
      className="relative z-20 w-full border-b border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400"
    >
      <div className="absolute flex -z-10 w-screen h-full opacity-80 bg-white dark:bg-black" />
      <Container className="flex items-center justify-between w-auto py-4">
        <Link passHref href="/">
          <div className="inline-flex text-xl text-black dark:text-white">
            <h1 className="tracking-wide font-extrabold select-none">MMS</h1>
            &nbsp;
            <p className="tracking-wider select-none">APP</p>
          </div>
        </Link>
        <div className="group profile-field">
          <span className="mr-4 self-center">Kevin Sandiho</span>
          <Image src="https://github.com/manot40.png" alt="Yeah" width={30} height={30} className="rounded-full"/>
        </div>
      </Container>
      <Container className="sticky flex items-center w-auto py-4">
        <div className="flex items-center">
          <div className="submenu-bar">
            <Link href="/">
              <a className={pathname === "/" ? "active" : ""}>Ringkasan</a>
            </Link>
            <Link href="/warehouse">
              <a className={pathname.match('warehouse') ? "active" : ""}>Gudang</a>
            </Link>
            <Link href="/product">
              <a className={pathname.match('product') ? "active" : ""}>Produk</a>
            </Link>
            <Link href="/transaction">
              <a className={pathname.match('transaction') ? "active" : ""}>Transaksi</a>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export const Navigation = memo(Component);