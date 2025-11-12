import { createTheme } from "@mui/material";
import media from "./media";

const baseTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const darkTheme = {
  ...baseTheme,
  custom: {
    color: {
      background: "rgb(36, 36, 36)",
      text: "#ffffff",
      text100: "rgb(87, 87, 87)",
      text200: "rgb(112, 112, 112)",
      text300: "rgb(182, 182, 182)",
      btnText: "#ebebeb",
      tableBorder: "rgb(61, 61, 61)",
      listBorder: "rgb(61, 61, 61)",
      btnBorder: "rgb(128, 128, 128)",
      navShadow: "rgba(99, 99, 99, 0.4)",
      primary: "#0373fc",
      secondary: "#0040ad",
      alpha100: "rgba(207, 207, 207, 0.1)",
      alpha200: "rgba(0,0,0,0.1)",
      alpha300: "rgba(0,0,0,0.1)",
    },
    media: {
      small: media.small,
      medium: media.medium,
      large: media.large,
    },
  },
};

export default darkTheme;

export type AppTheme = typeof darkTheme;
