import type { ResOK, Transaction, Pagination, ChangeType } from "type";

import fetcher from "libs/utils/axiosFetcher";
import useSWR from "swr";

export function useGetTransactions({
  page = "",
  limit = "",
  order = "desc",
  sort = "txDate",
}: Pagination<Transaction>) {
  const swr = useSWR<ResOK<Transaction[]>>(
    `/transaction?page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
    fetcher.get
  );
  return swr;
}

export async function usePostTransaction(
  transaction: Pick<
    ChangeType<Transaction, "warehouse", string>,
    "description" | "warehouse" | "txDate" | "type" | "items"
  >
) {
  return await fetcher.post("/transaction", transaction);
}
