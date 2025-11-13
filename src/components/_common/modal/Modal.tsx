import { ReactNode } from "react";
import styled from "styled-components";

const StyledModal = styled.div<{ size: "sm" | "md" | "lg" }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 2100;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modalBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2200;
    border-radius: 0.725rem;
    background-color: ${({ theme }) => theme.custom.color.background};
    box-shadow: 0px 0px 12px ${({ theme }) => theme.custom.color.navShadow};

    width: ${(props) => {
      switch (props.size) {
        case "sm":
          return "320px";
        case "md":
          return "480px";
        case "lg":
          return "68%";
        default:
          return "480px";
      }
    }};
  }
`;

interface ModalProps {
  children: ReactNode;
  size: "sm" | "md" | "lg";
}

export const Modal = ({ children, size }: ModalProps) => {
  return (
    <StyledModal size={size}>
      <div className="overlay"></div>
      <div className="modalBox">{children}</div>
    </StyledModal>
  );
};
