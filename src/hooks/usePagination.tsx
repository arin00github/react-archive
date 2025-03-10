import { useCallback, useEffect, useState } from "react";

interface UsePaginationProps {
  totalDataCount?: number;
  currentIndex?: number;
}

export default function usePagination(props: UsePaginationProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const [pageIndexArray, setPageIndexArray] = useState<number[] | undefined>(
    undefined
  );

  const createPagination = (totalData: number, perPageCount?: number) => {
    const count = perPageCount || 10;
    const arrayLength = Math.ceil(totalData / count);
    const newIndexBox: number[] = [];
    for (let i = 0; i < arrayLength; i++) {
      newIndexBox.push(i);
    }
    return newIndexBox;
  };

  const displayPagination = (totalPagesLength: number[], pageIndex: number) => {
    const lastNumber = totalPagesLength.length;
    let newArray;

    if (pageIndex > 0 && pageIndex <= 3) {
      newArray = totalPagesLength.slice(0, 5);
    } else if (pageIndex > 3 && pageIndex < lastNumber - 2) {
      newArray = totalPagesLength.slice(pageIndex - 3, pageIndex + 2);
    } else if (pageIndex >= lastNumber - 2) {
      if (totalPagesLength.length >= 5) {
        newArray = totalPagesLength.slice(lastNumber - 5, lastNumber);
      } else {
        newArray = totalPagesLength.slice(0, 5);
      }
    }
    return newArray;
  };

  const updatePagination = useCallback(
    (totalDataCount: number, pageIndex: number) => {
      const newPagination = createPagination(totalDataCount);
      const arrangedArray = displayPagination(newPagination, pageIndex);
      setCurrentIndex(pageIndex);
      setPageIndexArray(arrangedArray);
    },
    []
  );

  const updateCurrentIndex = useCallback((currentIndex: number) => {
    setCurrentIndex(currentIndex);
  }, []);

  useEffect(() => {
    console.log("useEffect usePagination");
    if (
      typeof props.totalDataCount === "number" &&
      typeof props.currentIndex === "number"
    ) {
      updatePagination(props.totalDataCount, props.currentIndex);
    }
  }, [props.totalDataCount, props.currentIndex, updatePagination]);

  return { currentIndex, pageIndexArray, updatePagination, updateCurrentIndex };
}
