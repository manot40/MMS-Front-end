import { Container, Navigation } from "components";
import { useState, useEffect } from "react"
import { NextPage } from "next/types";

const Home: NextPage = () => {
  return (
    <>
      <Navigation />
      <div className="bg-white dark:bg-black border-b border-neutral-300 dark:border-neutral-600">
        <Container>
          <div className="flex items-center justify-between w-auto py-12">
            <h1 className="text-3xl font-semibold">Input Transaksi</h1>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
