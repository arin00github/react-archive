import React, { ReactNode } from "react";

import styled from "styled-components";

type PageButtonProps = {
  symbol: ReactNode;
  disabled: boolean;
  handleClick: () => void;
  selected?: boolean;
};

export const StyledPageButton = styled.button`
  outline: none;
  border: none;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  margin-right: 0.625rem;
  padding: 0;
  text-align: center;
  background-color: transparent;
  border-color: ${({ theme }) => theme.custom.color.tableBorder};
  &:last-child {
    margin-right: 0px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.custom.color.primary};
    color: ${({ theme }) => theme.custom.color.btnText};
  }
  &.active {
    background-color: ${({ theme }) => theme.custom.color.primary};
    color: ${({ theme }) => theme.custom.color.btnText};
  }
`;

export const PageButton = ({
  handleClick,
  symbol,
  disabled,
  selected,
}: PageButtonProps) => {
  return (
    <StyledPageButton
      onClick={handleClick}
      disabled={disabled}
      className={selected ? "active" : ""}
    >
      {symbol}
    </StyledPageButton>
  );
};
