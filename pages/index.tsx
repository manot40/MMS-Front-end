// import { useState, useEffect } from "react";
import { NextPage } from "next/types";
import { Dashboard } from "layout";
import Link from "next/link";

const Warehouse: NextPage = () => {
  return (
    <Dashboard>
      <Link passHref href="/transaction/new">
        <div className="flex mt-8 cursor-pointer">
          <a className="btn mx-auto">Transaksi Baru</a>
        </div>
      </Link>
    </Dashboard>
  );
};

export default Warehouse;
