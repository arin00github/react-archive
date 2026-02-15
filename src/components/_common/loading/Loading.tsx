import styled from "styled-components";

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    width: 120px;
    aspect-ratio: 1;
    display: grid;
  }
  .loader::before,
  .loader::after {
    content: "";
    grid-area: 1/1;
    --c: no-repeat radial-gradient(farthest-side, #999999 92%, #0000);
    background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
      var(--c) 0 50%;
    background-size: 14px 14px;
    animation: l12 1s infinite;
  }
  .loader::before {
    margin: 4px;
    filter: hue-rotate(45deg);
    background-size: 10px 10px;
    animation-timing-function: linear;
  }

  @keyframes l12 {
    100% {
      transform: rotate(0.5turn);
    }
  }
`;

export const Loading = () => {
  return (
    <StyledLoading>
      <div className="loader"></div>
    </StyledLoading>
  );
};
