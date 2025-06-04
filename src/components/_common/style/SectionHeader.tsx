"use client";

import { ChildrenWrapper } from "@/interfaces/common";
import styled from "styled-components";

const StyledSectionHeader = styled.div`
  width: 100%;
  // margin-bottom: 1.5rem;
  margin-top: 3rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.custom.color.text};
`;

const SectionHeader = (props: ChildrenWrapper) => {
  return <StyledSectionHeader>{props.children}</StyledSectionHeader>;
};

export default SectionHeader;
