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
          className={clsx({
            active: page === 1,
          })}
        >
          {1}
        </button>
      )}

      {totalPages > 5 && page >= 4 && page - 1 > 0 && (
        <button className="disabled">...</button>
      )}
      {pages.map((pageNum) => (
        <button
          onClick={() => onPageChange(pageNum)}
          key={`key_${pageNum}`}
          className={clsx({
            active: pageNum === page,
          })}
        >
          {pageNum}
        </button>
      ))}

      {totalPages > 5 && page + 2 < totalPages && (
        <button className="disabled">...</button>
      )}

      {totalPages > 5 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={clsx({
            active: page === totalPages,
          })}
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};
