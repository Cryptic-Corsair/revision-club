#!/usr/bin/env python3
"""Pistachio contrast suite — the measurement source of record.

oklab mixes replicated so every CSS color-mix can be checked against
a printed number. Sections:
· cards v5 — husk rooms speak light, light-pistachio rooms olive
· document v6 — kernel page + warm-white handout sheets, dark olive
  ink, plum accents (study-grade: dense text never sits on a
  coloured ground)

Usage: python3 scripts/pistachio-palette.py
"""

def srgb_to_lin(c):
    c /= 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def lin_to_srgb(c):
    c = 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055
    return round(max(0, min(1, c)) * 255)

def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def rgb_hex(r):
    return '#%02x%02x%02x' % r

def oklab_mix(ha, hb, ta):
    """color-mix(in oklab, a ta%, b) — a at share ta into b."""
    ra, ga, ba = hex_rgb(ha)
    rb, gb, bb = hex_rgb(hb)
    la = (srgb_to_lin(c) for c in (ra, ga, ba))
    lb = (srgb_to_lin(c) for c in (rb, gb, bb))

    def to_oklab(lin):
        r, g, b = lin
        l = 0.4122214708*r + 0.5363325363*g + 0.0514459929*b
        m = 0.2119034982*r + 0.6806995451*g + 0.1073969566*b
        s = 0.0883024619*r + 0.2817188376*g + 0.6299787005*b
        l_, m_, s_ = l**(1/3), m**(1/3), s**(1/3)
        return (0.2104542553*l_+0.7936177850*m_-0.0040720468*s_,
                1.9779984951*l_-2.4285922050*m_+0.4505937099*s_,
                0.0259040371*l_+0.7827717662*m_-0.8086757660*s_)

    A, B = to_oklab(la), to_oklab(lb)
    M = tuple(a*ta + b*(1-ta) for a, b in zip(A, B))
    l_ = M[0] + 0.3963377774*M[1] + 0.2158037573*M[2]
    m_ = M[0] - 0.1055613458*M[1] - 0.0638541728*M[2]
    s_ = M[0] - 0.0894841775*M[1] - 1.2914855480*M[2]
    L, Ms, S = l_**3, m_**3, s_**3
    r = +4.0767416621*L - 3.3077115913*Ms + 0.2309699292*S
    g = -1.2684380046*L + 2.6097574011*Ms - 0.3413193965*S
    b = -0.0041960863*L - 0.7034186147*Ms + 1.7076147010*S
    return rgb_hex((lin_to_srgb(r), lin_to_srgb(g), lin_to_srgb(b)))

def lum(h):
    r, g, b = (srgb_to_lin(c) for c in hex_rgb(h))
    return 0.2126*r + 0.7152*g + 0.0722*b

def cr(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)

# ————— the constants —————
PIST = '#a9b665'                                   # the bright kernel (page, chips, hairlines)
HUSK = '#4e5a28'                                   # the deep pistachio (cards' deep rooms)
MILK = '#f6f8e8'
CREAM = '#fffdf7'
LIGHT = oklab_mix(PIST, MILK, 0.40)                # light pistachio room #d6deb4
PLATE_L = oklab_mix(MILK, LIGHT, 0.25)             # light room's plate lift
SOFT = oklab_mix(HUSK, CREAM, 0.14)                # cards' dimmed cream tiers
FAINT = oklab_mix(HUSK, CREAM, 0.28)
OLIVE, OSOFT, OFAINT = '#262c10', '#3a4115', '#515925'
PLUM = '#3a2337'
LEMON, LEMINK = '#ffd43b', '#2b3114'
SHEET = '#fbfcf3'                                  # v6 warm-white handout
BAND = oklab_mix(PIST, SHEET, 0.16)                # v6 pale pistachio alternate
TINT = oklab_mix(PIST, SHEET, 0.16)                # v6 code-chip wash

print("light pistachio:", LIGHT, " band:", BAND, " tint:", TINT)
print("(css: kernel 40% into milk · milk 25% into LIGHT · kernel 16% into SHEET)")

SECTIONS = [
    ("cards · husk room speaks light", [
        ("milk body on husk room",          MILK,  HUSK,  6.5),
        ("soft cream on husk room",         SOFT,  HUSK,  4.5),
        ("faint cream on husk room",        FAINT, HUSK,  3.2),
        ("lemon numerals on husk room",     LEMON, HUSK,  4.5),
        ("lem-ink on lemon chips",          LEMINK,LEMON, 7.0),
    ]),
    ("cards · light room speaks olive", [
        ("olive body on light room",        OLIVE, LIGHT, 9.0),
        ("olive-soft on light room",        OSOFT, LIGHT, 5.5),
        ("olive-faint on light room",       OFAINT,LIGHT, 3.6),
        ("plum accent on light room",       PLUM,  LIGHT, 6.0),
        ("cream ink on plum chip",          CREAM, PLUM,  9.0),
        ("olive on deep-room plates",       OLIVE, LIGHT, 9.0),
        ("olive on light-room plates",      OLIVE, PLATE_L, 9.0),
    ]),
    ("document v6 · white handouts on the kernel desk", [
        ("olive body on white sheet",       OLIVE, SHEET, 10.0),
        ("olive-soft on white sheet",       OSOFT, SHEET, 7.0),
        ("olive-faint on white sheet",      OFAINT,SHEET, 4.5),
        ("plum numerals on white sheet",    PLUM,  SHEET, 10.0),
        ("olive body on pale band",         OLIVE, BAND,  9.0),
        ("olive-soft on pale band",         OSOFT, BAND,  6.0),
        ("plum numerals on pale band",      PLUM,  BAND,  9.0),
        ("olive on tint chips",             OLIVE, TINT,  7.0),
        ("olive rail text on kernel page",  OLIVE, PIST,  6.0),
        ("plum rail numerals on kernel",    PLUM,  PIST,  4.5),
        ("cream ink on plum selection",     CREAM, PLUM,  9.0),
        ("lemon-ink on lemon swipe",        LEMINK,LEMON, 7.0),
        ("white sheet vs kernel page",      SHEET, PIST,  1.6),
        ("band vs sheet step (decorative)", BAND,  SHEET, 1.05),
    ]),
    ("unchanged · home and chrome", [
        ("daylight ink on pale page",       '#35312b', '#e9eddb', 10.0),
        ("milk on plum footer",             MILK,  PLUM,  12.0),
    ]),
]

bad = 0
for title, rows in SECTIONS:
    print(f"\n— {title}")
    for name, a, b, t in rows:
        r = cr(a, b)
        ok = r >= t
        bad += not ok
        print(f"  {name:34s} {r:7.2f}  {t:4.1f}  {'OK' if ok else 'FAIL'}")
print("\nALL PASS" if not bad else f"\n{bad} FAILURES")
raise SystemExit(1 if bad else 0)
