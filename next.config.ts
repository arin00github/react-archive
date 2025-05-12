import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
};

export default nextConfig;
