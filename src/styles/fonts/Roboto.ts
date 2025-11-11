// fonts/inter.ts
import localFont from "next/font/local";

const Roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto/Roboto-VariableFont_wdth,wght.ttf",
      weight: "100 900", // Inter는 wght 축이 100~900
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto/Roboto-Italic-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-Roboto", // CSS 변수명
});

export default Roboto;
