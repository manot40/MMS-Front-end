import { useState, useEffect } from "react";
import { NextPage } from "next/types";

import { Dashboard } from "layout";
import Link from "next/link";
import { Button } from "components";
import { useAuth } from "libs/context/AuthContext";

const Transaction: NextPage = () => {
  const { fetcher } = useAuth();
  fetcher(`/warehouse`, {}).then((data) => console.log(data));
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
