import type { Metadata } from "next";
import TwilightApp from "@/components/twilight/App";
import "@/components/twilight/twilight.css";

/* The twilight front door — an ALTERNATE landing page for IAL CHEM,
   dressed in the Shader-water-v2 UI type (deep twilight slate, one
   amber accent, shader-backed rooms). A sibling of the daylight
   showcase at /, not a replacement: it is its own leaf, theme tokens
   scoped under .twilight-root, persists nothing, and hands visitors
   into the workspace at /club through the same ?v= deep links.

   Deliberately kept out of the indexes: / is the canonical homepage
   and the sitemap lists only it — an alternate front door must not
   compete with it in search. The meta noindex below covers the route;
   a noindexed page still owes the crawlers a self-canonical (same
   contract as /club). */
export const metadata: Metadata = {
  /* absolute — the root layout's title template is for new leaf
     pages, not a front door's brand line. No openGraph here: a child
     openGraph replaces the layout's wholesale (Next merges top-level
     fields only), which would drop og:image/og:type. */
  title: { absolute: "IAL CHEM — the twilight showcase" },
  description:
    "An alternate front door for IAL CHEM: revision notes for every topic in the Pearson Edexcel International A Level Chemistry spec (WCH11–WCH16), rendered over live shader art. Progress and reading time stay in your browser.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/twilight" },
};

export default function TwilightPage() {
  return <TwilightApp />;
}
