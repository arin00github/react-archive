import React from "react";

import { PageButton } from "./PageButton";

interface IPagination {
  goToFront: (pageNumber: number) => void;
  goToBack: (pageNumber: number) => void;
  goToNext: (pageNumber: number) => void;
  goToPrev: (pageNumber: number) => void;
  onClickIndex: (pageNumber: number) => void;
  currentIndex: number;
  indexArray: number[];
  totalDataLength: number;
  perPageCount?: number;
}
export const Pagination = ({
  totalDataLength,
  indexArray,
  goToFront,
  goToBack,
  goToNext,
  goToPrev,
  currentIndex,
  onClickIndex,
}: IPagination) => {
  const originalTotalLength = Math.ceil(totalDataLength / 10);
  const newNumber = currentIndex - 1;
  const newNumber2 = currentIndex + 1;
  return (
    <div className="mt-6">
      {totalDataLength && (
        <div className="pagination">
          <PageButton
            handleClick={() => goToFront(1)}
            disabled={currentIndex === 1}
            symbol={"<"}
          />
          <PageButton
            handleClick={() => goToPrev(newNumber)}
            disabled={currentIndex === 1}
            symbol={"<"}
          />
          {indexArray.map((idx) => {
            return (
              <PageButton
                disabled={false}
                key={`pageItem_${idx}`}
                handleClick={() => onClickIndex(idx + 1)}
                symbol={idx + 1}
                selected={currentIndex === idx + 1}
              ></PageButton>
            );
          })}
          <PageButton
            handleClick={() => goToNext(newNumber2)}
            disabled={currentIndex >= originalTotalLength}
            symbol={">"}
          />
          <PageButton
            handleClick={() => goToBack(originalTotalLength)}
            disabled={currentIndex === originalTotalLength}
            symbol={">"}
          />
        </div>
      )}
    </div>
  );
};

const PaginationSet = { Pagination };

export default PaginationSet;
