import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The sandbox deploy pipeline (.zscripts/build.sh, untracked) packages
     .next/standalone into its container image. Vercel ignores this key and
     builds the app its own way, so it is safe to leave in for both. */
  output: "standalone",

  /* The source is expected to type-check clean — the build fails loudly
     on errors instead of shipping them. */
  typescript: {
    ignoreBuildErrors: false,
  },

  /* No X-Powered-By header. */
  poweredByHeader: false,

  reactStrictMode: false,
};

export default nextConfig;
