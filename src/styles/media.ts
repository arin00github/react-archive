import { css, type CSSObject, type Interpolation } from "styled-components";

export type Breakpoints = "small" | "medium" | "large";

const createMediaQuery = (query: string) => {
  return (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: Interpolation<object>[]
  ) => {
    if (Array.isArray(first)) {
      return css`
        ${query} {
          ${css(first, ...interpolations)}
        }
      `;
    } else {
      return css`
        ${query} {
          ${css(first)}
        }
      `;
    }
  };
};

export const media = {
  small: createMediaQuery("@media (max-width: 639px)"),
  medium: createMediaQuery("@media (max-width: 1047px)"),
  large: createMediaQuery("@media (min-width: 1048px)"),
};

export default media;
