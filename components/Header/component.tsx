import { Container } from "components";
import { useRouter } from "next/router";
import { FC } from "react";

export const Header: FC = () => {
  const { pathname } = useRouter();

  const route = () => {
    switch(pathname) {
      case "/transaction":
        return "Transaksi"
      case "/warehouse":
        return "Gudang"
      case "/product":
        return "Produk"
    }
  }

  return (
    pathname !== "/" ? (
      <div className="bg-white dark:bg-black border-b border-neutral-300 dark:border-neutral-600">
        <Container>
          <div className="block md:flex items-center justify-between w-auto py-12">
            <h1 className="text-3xl font-semibold">Dasbor {route()}</h1>
            <div className="mt-4 md:mt-0">
              <button className="btn">
                Tambah Baru
              </button>
            </div>
          </div>
        </Container>
      </div>
    ) : (
      <div />
    )
  );
};
