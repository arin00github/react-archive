"use client";

import styled from "styled-components";

const Container = styled.div`
  width: "100%";
  height: 100vh;
  background-color: ${(props) => props.theme.bg};

  display: flex;
  justify-content: center;
  align-items: center;

  .centerBox {
    width: 300px;
  }
`;

const ArhiveContainer = () => {
  return (
    <Container>
      <div className="centerBox">Archive page</div>
    </Container>
  );
};

export default ArhiveContainer;
