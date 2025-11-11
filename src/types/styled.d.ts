import "styled-components";
import { Theme as MuiTheme } from "@mui/material/styles";

declare module "styled-components" {
  export interface DefaultTheme extends MuiTheme {
    custom: {
      color: {
        background: string;
        text: string;
        text100: string;
        text200: string;
        text300: string;
        btnText: string;
        btnBorder: string;
        listBorder: string;
        tableBorder: string;
        navShadow: string;
        primary: string;
        secondary: string;
        alpha100: string;
        alpha200: string;
        alpha300: string;
      };
    };
  }
}
