import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import { useHeaderVisible } from "libs/hooks/useHeaderVisible";
import { Container } from "components";
import Image from "next/image";

export const Navigation: FC = () => {
  const [mounted, setMounted] = useState(false);

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
        <div className="flex text-neutral-800 dark:text-neutral-500">
          <Link href="#">
            <a className="text-sm mr-4 self-center">Kevin Sandiho</a>
          </Link>
          <Image src="https://github.com/manot40.png" alt="Yeah" width={30} height={30} className="rounded-full"/>
        </div>
      </Container>
      <Container className="flex items-center w-auto py-4 text-neutral-800 dark:text-neutral-500">
        <div className="flex items-center">
          <div className="submenu-bar">
            <Link href="#about">
              <a className="active">About</a>
            </Link>
            <Link href="#skill">
              <a>Skill</a>
            </Link>
            <Link href="#experience">
              <a>Experience</a>
            </Link>
            <Link href="#project">
              <a>Project</a>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
