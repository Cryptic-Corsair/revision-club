'use client';

/* The club's flask mark — the same continuous silhouette the workspace
   pill nav wears (LogoMark in club-app.tsx) — re-dressed from the
   portal's own tokens: ink / liquid / glass flip with the night and
   daylight rooms, so the brand reads identically at both front doors. */
export function FlaskMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* A single, continuous flask silhouette: broad shoulders,
          narrow neck and a weighted rounded base. */}
      <path
        d="M18 6.5h12M20 6.5v13L10.8 36.2A4.1 4.1 0 0 0 14.4 42h19.2a4.1 4.1 0 0 0 3.6-5.8L28 19.5v-13"
        stroke="var(--flask-ink)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="var(--flask-glass)"
      />

      {/* The reaction line gives the liquid a deliberate, dynamic
          profile instead of a cartoon wave. */}
      <path
        d="M14.2 33.1c4.1-2.7 7.1-2.5 10.1-.6 3.2 2 5.7 1.8 9.5-.5l3.1 5.5a2.5 2.5 0 0 1-2.2 3.7H13.3a2.5 2.5 0 0 1-2.2-3.7l3.1-4.4Z"
        fill="var(--flask-liquid)"
      />
      <path
        d="M15.2 33.4c3.6-2.1 6.1-1.9 9-.2 2.8 1.7 5.4 1.7 8.7-.1"
        stroke="var(--flask-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity=".62"
      />

      {/* Three measured bubbles, balanced as a recognisable
          signature at small navigation sizes. */}
      <circle cx="21.5" cy="27.5" r="1.45" fill="var(--flask-ink)" opacity=".72" />
      <circle
        cx="27"
        cy="23.5"
        r="1.9"
        fill="var(--flask-liquid)"
        stroke="var(--flask-ink)"
        strokeWidth=".9"
      />
      <circle cx="32.5" cy="29" r="1.15" fill="var(--flask-ink)" opacity=".55" />

      {/* Small reaction spark — offset, not a floating mascot bubble. */}
      <path
        d="M37.2 8.2l1.15 3.05 3.05 1.15-3.05 1.15-1.15 3.05-1.15-3.05L33 12.4l3.05-1.15 1.15-3.05Z"
        fill="var(--flask-liquid)"
        stroke="var(--flask-ink)"
        strokeWidth=".8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
