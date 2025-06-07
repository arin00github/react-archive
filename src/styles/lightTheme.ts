import { createTheme } from "@mui/material";
import media from "./media";

const baseTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const lightTheme = {
  ...baseTheme,
  custom: {
    color: {
      background: "#fafafa",
      text: "#000000",
      text100: "#606060",
      btnText: "#505051",
      tableBorder: "#dadada",
      primary: "#0373fc",
      secondary: "#0040ad",
      alpha100: "rgba(125, 125, 125, 0.1)",
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

export default lightTheme;
