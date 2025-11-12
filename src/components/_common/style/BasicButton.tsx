import styled from "styled-components";

export const BasicButton = styled.button`
  background-color: ${({ theme }) => theme.custom.color.background};
  border: 1px solid #fff;
  border-color: ${({ theme }) => theme.custom.color.btnBorder};

  &:hover {
    background-color: ${({ theme }) => theme.custom.color.primary};
    cursor: pointer;
  }
`;
