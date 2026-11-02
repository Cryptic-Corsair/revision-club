import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel manages Next.js output and deployment packaging automatically.
  // Keep TypeScript checks enabled so build errors are surfaced instead of hidden.
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
};

export default nextConfig;
