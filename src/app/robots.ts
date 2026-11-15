import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Replaces the old static public/robots.txt so the Sitemap line can
   read SITE_URL (the one source of the site's address) at build time.

   Policy unchanged: every crawler may crawl everything. The indexing
   discipline lives on the pages themselves — / is the canonical
   indexed homepage, /club carries a meta noindex (its rooms render
   client-side from localStorage), and the front-door middleware
   (src/middleware.ts) never redirects crawler user-agents, so a bot
   with a persistent cookie jar is never walked into the noindex
   route. A robots.txt block on /club would only hide the meta
   noindex from Google — it must stay crawlable to be obeyed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
