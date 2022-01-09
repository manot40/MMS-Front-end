import usePagination from "libs/hooks/usePagination";
import { useAuth } from "libs/context/AuthContext";
import { Pagination, Table } from "components";
import { NextPage } from "next/types";
import { Dashboard } from "layout";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import { ResOK, Transaction } from "type";
import dayjs from "dayjs";

const Transaction: NextPage = () => {
  const [page, setPage] = useState(1);
  const { fetcher } = useAuth();

  const { data: trx } = useSWR<ResOK<Transaction[]>>(
    `/transaction?page=${page}&limit=${10}&sort=txDate&sortby=desc`,
    fetcher
  );

  const tableData = trx?.data.map((item) => ({
    Kode: item.txId,
    Tanggal: dayjs(item.txDate).format("DD MMM YYYY"),
    Gudang: item.warehouse.name,
    Tipe: item.type.toUpperCase(),
  }));
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
      className="flex flex-col"
      HeaderContent={
        <Link passHref href="/transaction/new">
          <a className="btn">Transaksi Baru</a>
        </Link>
      }
    >
      <h1 className="py-4 px-2 mt-2 text-2xl font-semibold">
        Daftar Transaksi
      </h1>
      <Table data={tableData || [{ "": "Loading..." }]} />
      <Pagination
        page={currentPage}
        pages={pages}
        totalPages={trx?.totalPages || 1}
        onPageChange={handleChangePage}
        className="py-4 mb-8 self-center"
      />
    </Dashboard>
  );
};

export default Transaction;
