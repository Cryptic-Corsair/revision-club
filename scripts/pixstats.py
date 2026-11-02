#!/usr/bin/env python3
"""Pixel-stats for screenshots: mean luminance + contrast of text areas."""
from PIL import Image
import sys

def stats(path):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    px = im.load()
    # sample center region (main content, below navbar)
    x0, y0, x1, y1 = int(w*0.1), int(h*0.15), int(w*0.9), int(h*0.9)
    minl, maxl = 255, 0
    import statistics
    lums = []
    for y in range(y0, y1, 4):
        for x in range(x0, x1, 4):
            r, g, b = px[x, y]
            l = 0.2126*r + 0.7152*g + 0.0722*b
            lums.append(l)
            minl = min(minl, l); maxl = max(maxl, l)
    mean = statistics.mean(lums)
    dark = sum(1 for l in lums if l < 100) / len(lums)
    mid = sum(1 for l in lums if 100 <= l < 200) / len(lums)
    print(f"{path.split('/')[-1]:42s} mean={mean:5.1f} min={minl:5.1f} max={maxl:5.1f} "
          f"dark%={dark*100:4.1f} mid%={mid*100:4.1f}")

for p in sys.argv[1:]:
    stats(p)
