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
      tableBorder: "#dadada",
      primary: "#0373fc",
      secondary: "#0040ad",
      btnText: "#505051",
    },
    media: {
      small: media.small,
      medium: media.medium,
      large: media.large,
    },
  },
};

export default lightTheme;
