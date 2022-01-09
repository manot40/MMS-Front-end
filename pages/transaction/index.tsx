import usePagination from "libs/hooks/usePagination";
import { useAuth } from "libs/context/AuthContext";
import { Pagination } from "components";
import { NextPage } from "next/types";
import { Dashboard } from "layout";
import Link from "next/link";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Item, ResOK } from "type";

const Transaction: NextPage = () => {
  const [page, setPage] = useState(1);
  const { fetcher } = useAuth();

  const { data: trx } = useSWR<ResOK<Item[]>>(
    `/transaction?page=${page}&limit=${10}&sort=${"txDate"}&sortBy=${"desc"}`,
    fetcher
  );

  console.log(trx);

  const { currentPage, pages, changePage } = usePagination({
    totalPages: trx?.totalPages || 1,
  });

  function handleChangePage(page: number) {
    setPage(page);
    changePage(page);
  }

  return (
    <Dashboard
      HeaderContent={
        <Link passHref href="/transaction/new">
          <a className="btn">Transaksi Baru</a>
        </Link>
      }
    >
      <Pagination
        page={currentPage}
        pages={pages}
        totalPages={trx?.totalPages || 1}
        onPageChange={handleChangePage}
      />
    </Dashboard>
  );
};

export default Transaction;
