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
    width: 32px;
    height: 32px;
    line-height: 32px;
    margin-right: 10px;
    text-align: center;
    &:last-child {
        margin-right: 0px;
    }
    &:hover {
        background-color: ${({ theme }) => theme.main};
        color: "#fff";
    }
    &.active {
        background-color: ${({ theme }) => theme.main};
        color: "#fff";
    }
`;

export const PageButton = ({ handleClick, symbol, disabled, selected }: PageButtonProps) => {
    return (
        <StyledPageButton onClick={handleClick} disabled={disabled} className={selected ? "active" : ""}>
            {symbol}
        </StyledPageButton>
    );
};
