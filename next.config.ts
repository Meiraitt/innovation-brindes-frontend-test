import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "innovationbrindes.com.br",
      },
      {
        protocol: "https",
        hostname: "apihomolog.innovationbrindes.com.br",
      },
    ],
  },
};

export default nextConfig;
