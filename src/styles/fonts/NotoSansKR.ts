import localFont from "next/font/local";

const NotoSansKR = localFont({
  src: [
    {
      path: "../../public/fonts/Noto_Sans_KR/NotoSansKR-VariableFont_wght.ttf",
      weight: "100 900", //
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-NotoSansKR", // CSS 변수명
});

export default NotoSansKR;
