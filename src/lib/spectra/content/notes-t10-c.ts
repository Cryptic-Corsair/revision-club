import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 10 revision note · mass spectra (spec 10.21)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 10D
   class note (Mass spectra and IR, 2019, semester 2); page
   furniture omitted. The IR half (10.22) is listed on the same
   checklist but its class-note pages have not arrived yet, so it
   is not stubbed here — it joins as its own section later.
   The class note carries one numeric example in the teaching text —
   the benzoic-acid M+1 height — and the note keeps exactly that
   one worked example. Five spectra figures are redrawn: butane,
   propanal, the carbon-isotope trio, and the schematic bromine
   and chlorine M/M+2/M+4 patterns; the ethane fragmentation map
   is redrawn as a sixth. The margin rule for the M+1 height
   rides in as a note block. Highlighting is kept deliberately
   light: one mark per key term, short spans only.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T10_C: SpecSection[] = [
  {
    spec: "10.21",
    statement:
      "be able to interpret data from mass spectra to suggest possible structures of simple organic compounds using the m/z of the molecular ion and fragmentation patterns",
    title: "Mass spectra — the molecular ion and its fragments",
    blocks: [
      { k: "h", text: "Introduction" },
      { k: "p", text: "Mass spectrometry is used to:" },
      {
        k: "bullets",
        items: [
          "Determine the ==relative molecular mass== of an organic molecule.",
          "Deduce the structure of an organic unknown compound using ==fragmentation pattern== observed in a mass spectrum.",
        ],
      },

      { k: "h", text: "Molecular ion and molecular ion peak" },
      {
        k: "bullets",
        items: [
          "In the mass spectrometer, the molecules are ionized by bombardment with a ==beam of high energy electrons==.",
        ],
      },
      {
        k: "eq",
        eq: "M + e^−^  →  M^•+^  +  2e^−^",
        note: "M^•+^ — the molecular ion",
      },
      {
        k: "bullets",
        items: [
          "The radical cation, M^•+^, ion is called the ==molecular ion== which is formed by the loss of one electron from the molecule. In the mass spectrum, the peak with the highest m/e value is often due to the molecular ion.",
          "Hence, ==m/z value of the molecular ion (M^•+^)== = molecular mass of the organic molecule.",
          "Molecular ion peak is the ==peak furthest to the right== of the spectrum. This is the peak with the greatest mass to charge ratio (m/z).",
        ],
      },
      {
        k: "figure",
        kind: "ms-butane",
        caption:
          "The class note's spectrum for butane, redrawn: fragment peaks at 29 (CH₃CH₂⁺) and 43 (CH₃CH₂CH₂⁺), and the molecular ion C₄H₁₀⁺ furthest right at 58 — the peak with the greatest mass-to-charge ratio.",
      },
      {
        k: "eq",
        eq: "C~4~H~10~ + e^−^  →  C~4~H~10~^•+^  +  2e^−^",
        note: "the same ionisation, written for butane — C~4~H~10~^•+^ is the molecular ion peak",
      },

      { k: "h", text: "Fragmentation" },
      {
        k: "p",
        text: "The impact of the steam of high energy electrons can also break the molecule or the radical cation into fragments.",
      },
      {
        k: "figure",
        kind: "ms-ethane-frags",
        caption:
          "The class note's fragmentation map for ethane, redrawn: the electron beam first forms the molecular ion (m/z = 30); a broken C–C bond leaves the charge on one side — CH₃CH₂⁺ at m/z = 29 with H• set free, and one step further CH₃⁺ at m/z = 15 with a neutral •CH₃ fragment that the spectrometer never sees.",
      },
      {
        k: "bullets",
        items: [
          "During the bombardment, some energy is transferred to the molecular ion which is sufficient to break some of the covalent bonds in it.",
          "This process is known as ==fragmentation==. When the molecular ion fragments into smaller pieces, one of the fragments carries the positive charge while the other is neutral (carries no net charge).",
          "These smaller pieces may in turn undergo fragmentation and produce even smaller pieces.",
          "**Only the fragments with the positive charge are detected by the spectrometer.**",
        ],
      },
      {
        k: "eq",
        eq: "M^•+^  →  X^+^  +  Y^•^        X^+^  →  A^+^  +  B",
        note: "the neutral piece Y^•^ carries no charge — it is never detected",
      },
      {
        k: "bullets",
        items: [
          "The mass spectra of compounds are usually recorded as line diagrams of relative abundance plotted against mass charge (m/e) ratio, on which only the major peaks are shown. The abundance of each fragment ion is represented as a percentage of the most abundant fragment, the signal of which is called the ==base peak==. By convention, the base peak has a relative abundance of 100%.",
        ],
      },
      {
        k: "figure",
        kind: "ms-propanal",
        caption:
          "The class note's spectrum for propanal, redrawn: the base peak at 29 ([CHO]⁺) is the most abundant fragment, set at 100%; the molecular ion [CH₃CH₂CHO]⁺ stands at 58, furthest right.",
      },
      {
        k: "p",
        text: "The mass spectra of compounds are as unique as ==fingerprints==. It is very unlikely that two different compounds will fragment in exactly the same way. Mass spectrometry of organic compounds is thus useful for identifying:",
      },
      { k: "bullets", items: ["The relative molecular mass", "Parts of the structural form."] },
      {
        k: "wow",
        text: "Read a spectrum from the right edge inwards: the rightmost major peak is the molecular ion, and its m/z is the relative molecular mass of the whole molecule — free. Every peak to its left is a piece the electron beam knocked off, and because only charged pieces survive the machine, each one tells you which half kept the charge. The tallest of them all is the base peak, pinned at 100% so every other height is measured against it.",
      },

      { k: "h", text: "Isotopic peaks in the mass spectrum" },
      { k: "h", text: "Carbon" },
      {
        k: "bullets",
        items: [
          "Abundance of ==carbon-13== isotope is about 1% of naturally occurring carbon-12. Molecular peak due to carbon-12 is known as ==M peak== and carbon-13 is known as ==M+1 peak==.",
          "If there is 'n' number of carbon atoms in the molecule than M+1 peak, is n% of the height of the M peak.",
          "If there is 1 carbon atom in the molecule then M+1 peak is 1% of the height of the M peak. If there are 10 carbon atoms in the molecule than M+1 peak is 10% of the height of the M peak.",
        ],
      },
      {
        k: "note",
        label: "Margin rule —",
        text: "height of M+1 = (no. of C atoms / 100) × height of M peak.",
      },
      {
        k: "worked",
        title: "Worked example · the M+1 height",
        question:
          "The relative height of the M peak for benzoic acid (contains 7 carbon atoms) is 85%. Find the height of its M+1 peak.",
        steps: [
          "7 carbon atoms → the M+1 peak is 7% of the height of the M peak.",
          "height of M+1 = (7 / 100) × height of M peak = (7 / 100) × 85",
          "= 5.95",
        ],
        answer: "M+1 is 7% of 85 = 5.95",
      },
      {
        k: "figure",
        kind: "ms-iso-c",
        caption:
          "The class note's three spectra, redrawn: with one carbon (CH₄) the M+1 stub is 1% of M, with two (C₂H₆) it doubles, and with ten (C₁₀H₂₂) it climbs to 10% — the M+1 height counts the carbon atoms.",
      },

      { k: "h", text: "Bromine" },
      {
        k: "bullets",
        items: [
          "Bromine has two isotopes, ^79^Br and ^81^Br. These isotopes exist in equal quantities.",
          "Mass spectrum of a compound containing one Br atom will have two molecular ion peaks, M and M+2 (intensity ratio ==1:1==) whose m/z values differ by two. Molecular ion peak due to ^79^Br is known as M peak and that due to ^81^Br as M+2 peak.",
          "Mass spectrum of a compound containing two Br atoms will have three molecular ion peaks, M, M+2 and M+4 in the intensity ratio 1:2:1. M due to two ^79^Br atoms, M+2 is due to one ^79^Br and one ^81^Br atom, and M+4 is due to two ^81^Br atoms.",
        ],
      },
      {
        k: "figure",
        kind: "ms-iso-br",
        caption:
          "The class note's two bromine patterns, redrawn: with one bromine the M and M+2 peaks stand equal (1:1); with two, the mixed 79/81 molecular ion is twice as likely as either pure combination, lifting the middle peak to 1:2:1.",
      },

      { k: "h", text: "Chlorine" },
      {
        k: "bullets",
        items: [
          "Chlorine has two isotopes ^35^Cl and ^37^Cl in the ratio 3:1.",
          "Mass spectrum of a compound containing one chlorine atom will have two molecular ion peaks M and M+2 (intensity ratio ==3:1==) whose m/z values differ by two. Molecular ion peak due to ^35^Cl is known as M peak and ^37^Cl is known as M+2 peak.",
          "Mass spectrum of a compound containing two chlorine atoms will have three molecular ion peaks, M, M+2 and M+4 in the intensity ratio 9:6:1. M peak is due to two ^35^Cl atoms, M+2 is due to one ^35^Cl and one ^37^Cl atom and M+4 is due to two ^37^Cl atoms.",
        ],
      },
      {
        k: "figure",
        kind: "ms-iso-cl",
        caption:
          "The class note's two chlorine patterns, redrawn: one chlorine splits M and M+2 in a 3:1 doublet; two chlorines stack the combinations into a 9:6:1 triplet two mass units apart.",
      },
      {
        k: "wow",
        text: "The isotope pattern is the free bonus clue in every spectrum: a doublet two mass units apart with equal legs is one bromine, a 3:1 doublet is one chlorine — and while you are there, the M+1 stub quietly counts your carbon atoms at 1% each. Three heights, read before you have assigned a single fragment, already narrow the formula.",
      },
    ],
  },
];
