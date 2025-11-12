import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "react-archive";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // << 핵심: 정적 export
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: { unoptimized: true }, // next/image 정적 내보내기
  trailingSlash: true, // GitHub Pages에서 정적 라우팅 편해짐

  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@mui/styled-engine": "@mui/styled-engine-sc",
    };
    return config;
  },
  eslint: { ignoreDuringBuilds: true }, // ESLint 스킵
  // typescript: { ignoreBuildErrors: true }, // 타입체크 스킵 (임시)
};

export default nextConfig;
