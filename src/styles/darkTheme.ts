import { DefaultTheme } from "styled-components";
import media from "./media";

const darkTheme: DefaultTheme = {
  bg: "#000000",
  fontColor: "#ffffff",
  borderColor: "#ebebeb",
  borderColor2: "#b1b1b1",
  borderColor3: "#8d8d8d",
  hoverColor: "#4b4b4b",
  blue1: "#0373fc",
  blue2: "#0040ad",
  color: {
    background: "#121212",
    text: "#ffffff",
    tableBorder: "#444444",
    primary: "#0373fc",
    secondary: "#0040ad",
    btnText: "#ebebeb",
  },
  media: {
    small: media.small,
    medium: media.medium,
    large: media.large,
  },
};

export default darkTheme;
