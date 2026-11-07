import type { SpecSection } from "../notes-types";

/* ═══════════════════════════════════════════════════════════════
   Topic 10 revision note · Part 10E — infrared spectroscopy (spec 10.22)
   Text kept verbatim from the CHSE Grade 11 / Unit 2 / Topic 10
   class note (Mass spectra and IR, 2019, semester 2), pages 11–19 —
   this is the IR half the mass-spectra file (t10-c) was waiting for.
   Page furniture omitted. The teaching text
   carries no numeric example, so the section carries no worked
   example — the identification craft rides in the wow cards. Eight
   figures are redrawn: the three water vibrations, the generic
   transmittance frame, and the note's teaching spectra — butanone,
   ethanol, propanoic acid, propene, the alkyl-halide pair, and the
   amine N–H comparison. The handwritten margin notes (the C–H peak
   just under 3000) ride in as a margin-rule block. Highlighting is
   kept deliberately light: one mark per key term, short spans only.
   Source typos ("a range if infra-red frequencies", "The spectrum
   Is", "cm⁻²", "are shown below") are kept word for word, as
   elsewhere on the bench.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS_T10_D: SpecSection[] = [
  {
    spec: "10.22",
    statement:
      "be able to use infrared spectra, or data from infrared spectra, to deduce functional groups present in organic compounds, and predict infrared absorptions, given wavenumber data, due to familiar functional groups including: i C–H stretching absorptions in alkanes, alkenes and aldehydes ii C=C stretching absorption in alkenes iii O–H stretching absorptions in alcohols and carboxylic acids iv C=O stretching absorptions in aldehydes, ketones and carboxylic acids v C–X stretching absorption in halogenoalkanes vi N–H stretching absorption in amines",
    title: "Infrared spectroscopy — deducing functional groups",
    blocks: [
      { k: "h", text: "Introduction" },
      {
        k: "bullets",
        items: [
          "Molecules are able to convert energy from infra-red radiation into energy to vibrate their bonds (==stretching and bending==). Different bonds absorb different frequencies of infra-red radiation. An infra-red spectrum is obtained by passing a range if infra-red frequencies through a compound producing absorption peaks. The frequencies of the absorption peaks can be matched to those of known bonds to identify the structural features in an unknown molecule.",
          "Different covalent bonds have different strengths due to the masses of different atoms at either end of the bond.",
          "As a result, the bonds vibrate at different frequencies.",
          "The frequency of vibration can be found by detecting when the molecules absorb electro-magnetic radiation.",
          "Various types of vibration are possible. Examples include; STRETCHING and BENDING",
        ],
      },
      {
        k: "note",
        label: "What it is for",
        text: "Infra-red Spectroscopy is useful for identifying functional groups in a molecule.",
      },
      {
        k: "figure",
        kind: "ir-vibrations",
        caption:
          "The class note's water vibrations, redrawn: the two O–H bonds can stretch in step, stretch in opposition, or the whole molecule can bend — each movement absorbs its own frequency of infra-red radiation.",
      },

      { k: "h", text: "Axes" },
      {
        k: "bullets",
        items: [
          "The spectrum Is normally shown with the vertical axis labelled ==transmittance==, shown as percentage from 0 to 100%",
          "A value of 100% transmittance means that 100% of the radiation is transmitted and none is absorbed.",
          "The horizontal axis could be labelled either as frequency or wavelength, but a different unit is used: ==wavenumber==.",
        ],
      },
      {
        k: "figure",
        kind: "ir-axes",
        caption:
          "The class note's frame, redrawn: transmittance from 0 to 100% plotted against wavenumber falling from 4000 to 500 cm⁻¹ — each dip is characteristic of a vibration of a particular group.",
      },

      { k: "h", text: "Different ways of using Infrared Spectrum" },
      {
        k: "bullets",
        items: [
          "Predicting the absorptions in the spectrum of organic compound",
          "Deducing the functional group in a compound from a list of wavenumbers",
          "Deducing the structure of a compound from wavenumber and molecular formula",
          "The IR spectrum is plotted as absorption (or transmissions) against wavenumber in cm^−1^ (reciprocal of wavelength).",
        ],
      },
      {
        k: "table",
        caption: "Some important IR absorptions",
        head: ["Bond", "Functional group", "Wavenumber (cm^−1^)"],
        rows: [
          ["C–O", "Alcohols, esters", "1000 – 1300 (strong absorption)"],
          ["C=O", "Aldehydes, ketones, carboxylic acids", "1680 – 1750 (strong absorption)"],
          ["O–H", "Hydrogen bonded in carboxylic acids", "2500 – 3300 (strong and broad absorption)"],
          ["O–H", "Hydrogen bonded in alcohols", "3230 – 3550 (strong and broad absorption)"],
          ["N–H", "Amine", "3500-3300"],
          ["C=C", "Alkene", "1669-1645"],
          ["C–F", "Alkyl halides", "1400-1000"],
          ["C–Cl", "Alkyl halides", "800-600"],
          ["C–Br", "Alkyl halides", "600-500"],
          ["C–I", "Alkyl halides", "about 500"],
        ],
      },

      { k: "h", text: "Fingerprint Region" },
      {
        k: "p",
        text: "The 1500 cm^−1^ to 400 cm^−1^ in an IR spectrum is called the ==fingerprint region==. Each compound produces a unique IR fingerprint pattern which can be used to:",
      },
      {
        k: "bullets",
        items: [
          "Identify the compound by comparison of an unknown with the spectra of known compounds using data bases.",
          "Check the purity of a compound since any small impurity present will produce additional peaks.",
        ],
      },
      {
        k: "wow",
        text: "Below 1500 cm⁻¹ the dips stop being assignable and start being personal: the fingerprint region is a pattern no other compound shares. So the move flips — you no longer read individual peaks, you lay the whole spectrum against a known compound's, and any extra dips in it are impurities announcing themselves. Two compounds can wear the same functional groups; only their fingerprints tell them apart.",
      },

      { k: "h", text: "Interpreting infra-red spectrum" },
      {
        k: "p",
        text: "An infra-red spectrum is particularly useful for identifying the C=O and the O–H bonds in compounds.",
      },

      { k: "h", text: "Carbonyl compounds (aldehydes and ketones)" },
      { k: "p", text: "Eg: Butanone, CH~3~COCH~2~CH~3~" },
      { k: "bullets", items: ["C=O absorption: 1680 to 1750 cm^−1^"] },
      {
        k: "figure",
        kind: "ir-butanone",
        caption:
          "The class note's butanone spectrum, redrawn: the strong C=O absorption at 1740 cm⁻¹ is the deepest dip, with the C–H peak just under 3000 cm⁻¹ beside it.",
      },
      {
        k: "note",
        label: "Margin rule —",
        text: "the C–H peak sits @ 3000 cm^−1^ − 2850 cm^−1^ (alkanes 2850 – 3000 cm^−1^) — aldehydes carry a unique C–H of their own.",
      },

      { k: "h", text: "Alcohols" },
      { k: "p", text: "Eg: Ethanol, CH~3~CH~2~OH" },
      {
        k: "bullets",
        items: ["O–H absorption: 3230 to 3500 cm^−2^", "C–O absorption: 1000 to 1300 cm^−1^"],
      },
      {
        k: "figure",
        kind: "ir-ethanol",
        caption:
          "The class note's ethanol spectrum, redrawn: the broad O–H absorption at 3300 cm⁻¹ and the sharp C–O absorption at 1010 cm⁻¹, with the C–H dip just below 3000 cm⁻¹.",
      },

      { k: "h", text: "Carboxylic acids" },
      { k: "p", text: "Eg: Propanoic acid, CH~3~CH~2~COOH" },
      {
        k: "bullets",
        items: ["==Very broad== O–H absorption: 2500 to 3500 cm^−1^", "C=O absorption: 1680 to 1750 cm^−1^"],
      },
      {
        k: "figure",
        kind: "ir-propanoic",
        caption:
          "The class note's propanoic acid spectrum, redrawn: the O–H absorption spreads very broad between 2500 and 3500 cm⁻¹, the C=O absorption stands at 1680 cm⁻¹, and the C–O absorptions sit at 1200 and 1030 cm⁻¹.",
      },

      { k: "h", text: "Alkenes" },
      { k: "p", text: "Eg propene CH~3~CH=CH~2~" },
      {
        k: "bullets",
        items: ["C=C stretch from 1680-1640 cm^−1^", "=C–H stretch from 3100-3000 cm^−1^"],
      },
      {
        k: "figure",
        kind: "ir-propene",
        caption:
          "The class note's propene spectrum, redrawn: the =C–H stretch just above 3000 cm⁻¹ and the C=C stretch just below 1700 cm⁻¹, with the alkane C–H stretch (2850 – 3000 cm⁻¹) beside them.",
      },

      { k: "h", text: "Alkyl halides" },
      {
        k: "bullets",
        items: [
          "C–H wag (-CH~2~X) from 1300-1150 cm^−1^",
          "C–X stretches (general) from 850-515 cm^−1^",
          "C–Cl stretch 850-550 cm^−1^",
          "C–Br stretch 690-515 cm^−1^",
        ],
      },
      { k: "p", text: "The spectrum of 1-chloro-2-methylpropane are shown below." },
      {
        k: "figure",
        kind: "ir-halides",
        caption:
          "The class note's two alkyl-halide spectra, redrawn: 1-chloro-2-methylpropane carries its C–Cl stretches at 743 cm⁻¹, 1-bromopropane its C–Br stretch at 651 cm⁻¹, and both show the C–H wag that only terminal alkyl halides (–CH₂X) own.",
      },

      { k: "h", text: "Amine" },
      {
        k: "bullets",
        items: [
          "N–H stretch 3400-3250 cm^−1^",
          "1° amine: ==two bands== from 3400-3300 and 3330-3250 cm^−1^",
          "2° amine: ==one band== from 3350-3310 cm^−1^",
          "3° amine: ==no bands in this region==",
          "N–H bend (primary amines only) from 1650-1580 cm^−1^",
          "C–N stretch (aliphatic amines) from 1250–1020 cm^−1^",
          "N–H wag (primary and secondary amines only) from 910-665 cm^−1^",
        ],
      },
      {
        k: "figure",
        kind: "ir-amines",
        caption:
          "The class note's amine rule, redrawn on the N–H stretch region: a primary amine carries two bands, a secondary one band — and a tertiary amine, like the note's triethylamine spectrum, shows no N–H stretch at all.",
      },
      {
        k: "wow",
        text: "The O–H family is where spectra earn their marks: an alcohol's O–H is broad and strong around 3230–3550 cm⁻¹, the acid's spills wider still, 2500–3300 — and the acid pairs it with a C=O. So read the pair, not the peak: C=O with no O–H is an aldehyde or ketone; very broad O–H with a C=O is a carboxylic acid; broad O–H alone is an alcohol. Two dips, one structure family each — that is the whole game.",
      },
    ],
  },
];
