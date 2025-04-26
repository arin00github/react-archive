import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bg: string;
    fontColor: string;
    borderColor: string;
    borderColor2: string;
    borderColor3: string;
    blue1: string;
    blue2: string;
    color: {
      background: string;
      text: string;
      tableBorder: string;
      primary: string;
      secondary: string;
      btnText: string;
    };
  }
}
