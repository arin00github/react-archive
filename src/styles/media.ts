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
  small: createMediaQuery("@media (max-width: 480px)"),
  medium: createMediaQuery("@media (max-width: 768px)"),
  large: createMediaQuery("@media (max-width: 1024px)"),
};

export default media;
