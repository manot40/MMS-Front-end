import { NextPage } from "next/types";

import { Dashboard } from "layout";
import Link from "next/link";

const Transaction: NextPage = () => {
  
  return (
    <Dashboard
      HeaderContent={
        <Link passHref href="/transaction/new">
          <a className="btn">Transaksi Baru</a>
        </Link>
      }
    />
  );
};

export default Transaction;
