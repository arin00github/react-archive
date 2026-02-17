"use client";

import styled from "styled-components";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.custom.color.background};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .boxWrapper {
    min-width: 50rem;
    text-align: center;

    .title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: ${({ theme }) => theme.custom.color.text300};
    }

    .desc {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.custom.color.text100};
    }
  }
`;

const NotFound = () => {
  const router = useRouter();

  const clickLinkBtn = () => {
    router.push("/overview");
  };

  return (
    <StyledContainer>
      <div className="boxWrapper">
        <div className="title">Not Found</div>
        <p className="desc">
          We couldn&apost find what you were looking for...
        </p>
        <Button onClick={clickLinkBtn}>Go Home</Button>
      </div>
    </StyledContainer>
  );
};

export default NotFound;
