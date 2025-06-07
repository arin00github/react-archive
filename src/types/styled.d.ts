import "styled-components";
import { Theme as MuiTheme } from "@mui/material/styles";

declare module "styled-components" {
  export interface DefaultTheme extends MuiTheme {
    custom: {
      color: {
        background: string;
        text: string;
        text100: string;
        btnText: string;
        tableBorder: string;
        primary: string;
        secondary: string;
        alpha100: string;
        alpha200: string;
        alpha300: string;
      };
    };
  }
}
