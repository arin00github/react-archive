// fonts/inter.ts
import localFont from "next/font/local";

const Inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
      weight: "100 900", // Inter는 wght 축이 100~900
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-Inter", // CSS 변수명
});

export default Inter;
