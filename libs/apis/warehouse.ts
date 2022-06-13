import type { ResOK, Pagination } from "type";

import fetcher from "libs/utils/axiosFetcher";
import useSWR from "swr";

export function useGetWarehouses({
  page = "",
  limit = "",
  order = "desc",
  sort = "createdAt",
}: Pagination<{ [key: string]: any }>) {
  const swr = useSWR<ResOK<any>>(
    `/warehouse?page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
    fetcher.get
  );
  console.log(swr);
  return swr;
}
