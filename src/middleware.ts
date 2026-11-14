import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* The front door opens once. The showcase homepage is the first-visit
   experience; from the second visit on, the desk at /club is the main
   page — typing the domain or following an old bookmark to / drops a
   returning visitor straight into the workspace. The visit is marked
   with a year-long cookie set server-side while the homepage is being
   served, so there is no flash of the landing page before a redirect
   and the visitor's own progress keys (localStorage) are untouched.

   Two deliberate exceptions keep the door reachable and the site
   indexed:
   - /?front always serves the landing page — the club footer's
     "Showcase home" pill points here, so a returning visitor who
     explicitly asks for the front door still gets it.
   - crawler user-agents are never redirected: / is the canonical,
     indexed homepage, and /club is deliberately noindex — a bot with
     a persistent cookie jar must not be walked off the front door
     into a page search engines are told to ignore. */

const FRONT_DOOR_COOKIE = "ial_front_door_seen";
const ONE_YEAR = 60 * 60 * 24 * 365;

const CRAWLER_RE =
  /bot|crawl|spider|slurp|bingpreview|lighthouse|headlesschrome/i;

export function middleware(request: NextRequest): NextResponse {
  const seen = request.cookies.has(FRONT_DOOR_COOKIE);
  const wantsFrontDoor = request.nextUrl.searchParams.has("front");

  if (seen && !wantsFrontDoor && !CRAWLER_RE.test(request.headers.get("user-agent") ?? "")) {
    /* temporary redirect: the rule is a behaviour, not a permanent
       address change — old bookmarks to / must keep working if the
       front-door policy is ever relaxed */
    return NextResponse.redirect(new URL("/club", request.url), 307);
  }

  const response = NextResponse.next();
  if (!seen) {
    response.cookies.set(FRONT_DOOR_COOKIE, "1", {
      path: "/",
      maxAge: ONE_YEAR,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  /* the front door only — every other route is untouched */
  matcher: "/",
};
