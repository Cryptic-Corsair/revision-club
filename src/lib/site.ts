/* One address for the deployed site — the canonical URLs, the
   sitemap, robots.txt and the JSON-LD all read this constant, so the
   site's identity lives in exactly one place.

   Resolution order: NEXT_PUBLIC_SITE_URL wins (preview deploys, a
   future custom domain); then Vercel's auto-injected production host
   (VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL are bare hostnames —
   scheme added here); the fallback is the production URL the repo
   itself records (the GitHub repository's homepage field). */

const raw = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  "https://ial-chem.vercel.app"
).trim();

const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

export const SITE_URL = withScheme.replace(/\/+$/, "");
