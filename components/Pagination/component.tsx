import { HTMLAttributes, FC } from "react";
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  page: number;
  pages: number[];
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = (props) => {
  const { page, pages, totalPages, onPageChange, className } = props;
  return (
    <div className={"pagination " + className}>
      {totalPages > 5 && (
        <button
          onClick={() => onPageChange(1)}
          className={clsx("pagination-button", {
            active: page === 1,
          })}
        >
          {1}
        </button>
      )}

      {totalPages > 5 && page >= 4 && page - 1 > 0 && (
        <button className="">...</button>
      )}
      {pages.map((page) => (
        <button
          onClick={() => onPageChange(page)}
          key={`key_${page}`}
          className=""
        >
          {page}
        </button>
      ))}

      {totalPages > 5 && page + 2 < totalPages && (
        <button className="">...</button>
      )}

      {totalPages > 5 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={clsx("pagination-button", {
            active: page === totalPages,
          })}
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};
