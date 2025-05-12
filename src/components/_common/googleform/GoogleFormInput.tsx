// GoogleFormInput.tsx
import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem 0;
`;

export const StyledInput = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 1rem 0.75rem;
  box-sizing: border-box;
  border: none;
  background-color: ${({ theme }) => theme.color.background};
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.color.primary};
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // label: string;
  uisize?: string;
}

export const GoogleFormInput: React.FC<Props> = ({ uisize, ...props }) => {
  // const [focused, setFocused] = useState(false);

  return (
    <InputWrapper>
      <StyledInput {...props} />
    </InputWrapper>
  );
};
