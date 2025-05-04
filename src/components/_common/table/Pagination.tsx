import React from "react";

import { PageButton } from "./PageButton";
import styled from "styled-components";

const PaginationWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface IPagination {
  onClickIndex: (pageNumber: number) => void;
  currentIndex: number;
  indexArray: number[];
  totalDataLength: number;
  perPageCount?: number;
}
export const Pagination = ({
  totalDataLength,
  indexArray,

  currentIndex,
  onClickIndex,
}: IPagination) => {
  const originalTotalLength = Math.ceil(totalDataLength / 10);

  return (
    <PaginationWrap>
      {totalDataLength && (
        <div className="pagination">
          <PageButton
            handleClick={() => onClickIndex(1)}
            disabled={currentIndex === 1}
            symbol={"<"}
          />
          <PageButton
            handleClick={() => onClickIndex(currentIndex - 1)}
            disabled={currentIndex === 1}
            symbol={"<"}
          />
          {indexArray[0] !== 0 && <>...</>}
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
          {indexArray[4] !== originalTotalLength - 1 && <>...</>}

          <PageButton
            handleClick={() => onClickIndex(currentIndex + 1)}
            disabled={currentIndex >= originalTotalLength}
            symbol={">"}
          />
          <PageButton
            handleClick={() => onClickIndex(originalTotalLength)}
            disabled={currentIndex === originalTotalLength}
            symbol={">"}
          />
        </div>
      )}
    </PaginationWrap>
  );
};

const PaginationSet = { Pagination };

export default PaginationSet;
