import { useState } from "react";

interface Props {
  currentPage?: number;
  totalPages: number;
}

const usePagination = ({ currentPage, totalPages }: Props) => {
  const [pageState, setPage] = useState(currentPage || 1);

  const changePage = (page: number) => {
    page !== pageState && setPage(page);
  };

  const pages = () => {
    if (totalPages && pageState > totalPages) return [];
    if (totalPages <= 5) {
      let x = [];
      for (let i = 0; i < totalPages; i++) {
        x.push(i + 1);
      }
      return x;
    } else {
      return pageState > 3
        ? pageState + 1 < totalPages
          ? [pageState - 1, pageState, pageState + 1]
          : [totalPages - 3, totalPages - 2, totalPages - 1]
        : [2, 3, 4];
    }
  };

  return {
    currentPage: pageState,
    pages: pages(),
    changePage,
  };
};

export default usePagination;
