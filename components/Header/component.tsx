import clsx from "clsx";
import { Container } from "components";
import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  node?: string;
}

export const Header: FC<Props> = ({children, node}) => {
  const { pathname } = useRouter();

  const route = () => {
    switch(pathname) {
      case "/transaction":
        return "Dasbor Transaksi"
      case "/warehouse":
        return "Dasbor Gudang"
      case "/product":
        return "Dasbor Produk"
      default:
        return false
    }
  }

  return (
    (node || route()) ? (
      <div className="bg-white dark:bg-black border-b border-neutral-300 dark:border-neutral-600">
        <Container>
          <div className="block md:flex items-center justify-between w-auto py-12">
            <h1 className={clsx("text-3xl font-bold md:mb-0", children && "mb-4")}>{node || route()}</h1>
            {children}
          </div>
        </Container>
      </div>
    ) : (
      <div />
    )
  );
};
