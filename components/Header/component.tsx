import { Container } from "components";
import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";

type Props = {
  node?: string,
  children?: any
};

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
    route() ? (
      <div className="bg-white dark:bg-black border-b border-neutral-300 dark:border-neutral-600">
        <Container>
          <div className="block md:flex items-center justify-between w-auto py-12">
            <h1 className="text-3xl font-semibold mb-4 md:mb-0">{node || route()}</h1>
            {children}
          </div>
        </Container>
      </div>
    ) : (
      <div />
    )
  );
};
