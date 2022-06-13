import type { ResOK, Pagination, Item } from "type";

import fetcher from "libs/utils/axiosFetcher";
import useSWR from "swr";

export function useGetItems({
  page = "",
  limit = "",
  order = "desc",
  sort = "name",
}: Pagination<Item>) {
  const swr = useSWR<ResOK<Item[]>>(
    `/item?page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
    fetcher.get
  );
  return swr;
}

export function useAllItems(warehouse = "") {
  const swr = useSWR<ResOK<Item[]>>(`/item?warehouse=${warehouse}`, fetcher.get);
  return swr;
}
