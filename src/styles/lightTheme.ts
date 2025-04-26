import { DefaultTheme } from "styled-components";
import media from "./media";

const lightTheme: DefaultTheme = {
  bg: "#fff",
  fontColor: "#000000",
  borderColor: "#505051",
  borderColor2: "#929292",
  borderColor3: "#adadad",
  hoverColor: "#bcbcbc",
  blue1: "#0373fc",
  blue2: "#0040ad",
  color: {
    background: "#ffffff",
    text: "#000000",
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
};

export default lightTheme;
