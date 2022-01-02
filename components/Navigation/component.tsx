import { FC, memo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { useHeaderVisible } from "libs/hooks/useHeaderVisible";
import { Container } from "components";
import { useWindowSize } from "libs/hooks/useWindowSize";

const Component: FC = () => {
  const { pathname } = useRouter();
  const { width } = useWindowSize();
  const visible = useHeaderVisible();

  return (
    <header
      className={clsx(
        "header-wrapper",
        visible ? "-top-16 md:-top-20" : "-top-16 md:-top-20"
      )}
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
      <Container className={clsx("flex items-center w-auto py-4", width < 480 && "overflow-x-auto")}>
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