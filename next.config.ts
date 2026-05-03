import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "innovationbrindes.com.br",
      },
      {
        protocol: "https",
        hostname: "apihomolog.innovationbrindes.com.br",
      },
      {
        protocol: "https",
        hostname: "imgprodutos.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
