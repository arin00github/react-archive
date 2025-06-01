import "styled-components";
import { Theme as MuiTheme } from "@mui/material/styles";

declare module "styled-components" {
  export interface DefaultTheme extends MuiTheme {
    custom: {
      color: {
        background: string;
        text: string;
        text100: string;
        tableBorder: string;
        primary: string;
        secondary: string;
        btnText: string;
      };
    };
  }
}
