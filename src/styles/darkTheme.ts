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
      background: "#121212",
      text: "#ffffff",
      text100: "#606060",
      tableBorder: "#444444",
      primary: "#0373fc",
      secondary: "#0040ad",
      btnText: "#ebebeb",
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
