import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The showcase landing lived at /portal before it was promoted to
     the homepage; every old link — bookmarks, the club's history,
     anything external — now redirects to /. Permanent, so crawlers
     fold the old address into the new one. */
  async redirects() {
    return [{ source: "/portal", destination: "/", permanent: true }];
  },
  /* Expose the exact source revision used by Vercel (or CI) so the
     footer can identify the deployed build. Local builds say "local". */
  env: {
    NEXT_PUBLIC_BUILD_VERSION:
      process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? "local",
  },
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

  /* The workspace preview proxies the site through *.space-z.ai hosts.
     Next's dev server warns (and in future versions will refuse) cross-
     origin /_next/* asset requests from hosts it doesn't know, so the
     preview family is whitelisted here. Dev-only; production is unaffected. */
  allowedDevOrigins: ["*.space-z.ai"],

  reactStrictMode: false,
};

export default nextConfig;
