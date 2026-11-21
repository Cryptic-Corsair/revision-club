import type { Topic } from "../types";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · Mechanics and Materials
   Topics 1.3 (Mechanics) and 1.4 (Materials) of the Pearson
   Edexcel International Advanced Level Physics specification
   (2018, Issue 3) — statements 1–32, taught in two pages:
   Forces, motion and energy · Materials.
   ═══════════════════════════════════════════════════════════════ */

export const WPH11_TOPICS: Topic[] = [
  {
    id: "t01",
    no: "01",
    label: "Topic 1",
    title: "Forces, motion and energy",
    summary:
      "The whole of WPH11 mechanics — motion graphs and SUVAT, vectors and projectiles, Newton's laws and terminal velocity, momentum, moments, work, energy and power — statement by statement, with real past-paper questions worked in full.",
    minutes: 58,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "Unit 1 of IAL Physics is the scenario paper: every session wraps the same specification statements in a fresh context — a bungee jump, a crane, a submarine, a shot put, a bascule bridge. The physics never changes; the dressing does. This note teaches each statement from the ==official specification==, then shows exactly how WPH11/01 has examined it since 2019, quoting the ==mark schemes' own wording== and the ==Principal Examiner's reports==.",
      },
      {
        k: "def",
        term: "Resultant force",
        text: "The (vector) sum of all the forces acting on an object — the single force that would have the same effect as all the others acting together. Treat as a synonym of *net force* in your head, but write **resultant**: mark schemes credit the physics either way, examiners read it faster.",
      },
      {
        k: "def",
        term: "Terminal velocity",
        text: "The constant, maximum velocity reached when the drag force (plus upthrust, in a fluid) has grown until it balances the weight — the resultant force is zero, so by ==Newton's first law== the velocity stops changing.",
      },
      {
        k: "eq",
        title: "The four equations the paper prints for you",
        eq: "v = u + at        s = ut + ½at²        v² = u² + 2as        s = ½(u + v)t",
        note: "All four appear on the WPH11 data sheet. The marks are never for remembering them — they are for choosing the right one, converting units, and finishing with a comparison and a conclusion when the command word is *deduce*.",
      },
      {
        k: "ex",
        title: "Real question · WPH11 October 2023 Q11 — rocket launch",
        steps: [
          "A rocket of mass 5.0 × 10^6^ kg lifts off with engine thrust 7.3 × 10^7^ N. Calculate the initial acceleration. (3)",
          "W = mg = 5.0 × 10^6^ × 9.81 = 4.91 × 10^7^ N — the thrust is *not* the resultant force",
          "ΣF = thrust − weight = 7.3 × 10^7^ − 4.91 × 10^7^ = 2.39 × 10^7^ N",
          "a = ΣF/m = 2.39 × 10^7^ ÷ 5.0 × 10^6^",
        ],
        answer: "a = 4.8 m s^−2^ (2 s.f., unit attached)",
      },
      {
        k: "p",
        text: "The examiner's reports say the same things every single series: candidates lose the final mark of a *deduce* question by ==not writing the comparison==; they lose calculation marks to ==truncation instead of rounding==; they answer force questions ==with energy stories==; and they quote definitions almost right — *the weight acts at the centre of gravity* instead of *may be taken to act*. This page fixes the wording of every one of those.",
      },
      {
        k: "tips",
        items: [
          "A 3-mark explanation almost always needs **3 distinct points** — the June 2025 report says exactly this.",
          "“Show that X ≈ 300 N” means quote **at least one more significant figure** than 300 — 281 N or 296 N, never 300 exactly. Reverse working caps you at 2 of 3 marks.",
          "After a show-that, **use the given value** in later parts — ecf protects you, and the question expects it.",
          "g = 9.81 (or 9.8). Using 10 costs one mark per question. Missing units cost the final calculation mark.",
        ],
      },
      {
        k: "recap",
        items: [
          "SUVAT only when acceleration is constant — on a curved slide, switch to energy conservation.",
          "Projectiles: two columns, horizontal a = 0, vertical a = g, time is the bridge.",
          "ΣF = ma with the *resultant* force — draw the free-body diagram first.",
          "Momentum is conserved in a closed system; say “total”, say “system”, say the condition.",
          "Deduce questions end with a number, a comparison (<, >, =, ≈) and a sentence.",
        ],
      },
    ],
  },
  {
    id: "t02",
    no: "02",
    label: "Topic 2",
    title: "Materials — fluids, viscosity and elasticity",
    summary:
      "The second half of WPH11: density and upthrust, Stokes' law and the falling-ball viscometer, then Hooke's law, stress, strain and the Young modulus — every graph feature defined, both core practicals in full, and the real questions examiners keep asking.",
    minutes: 52,
    ao: ["AO1", "AO2", "AO3"],
    blocks: [
      {
        k: "p",
        text: "Materials is the half of Unit 1 where the marks are most predictable. Since 2019 almost every paper has carried a ==falling-ball viscosity question== and a ==Young modulus graph question==, and the mark schemes ask for the same sentences each time: ==upthrust equals the weight of fluid displaced==, ==small sphere at low speed with laminar flow==, ==the point where the weight may be taken to act==. Learn the wording once, bank the marks every series.",
      },
      {
        k: "def",
        term: "Upthrust",
        text: "An upward force on an object in a fluid, caused by the ==displacement== of the fluid — equal to the weight of the fluid displaced. A floating object floats because upthrust *equals* weight, not because it is less than it (the June 2024 report calls that the clearest misconception of the series).",
      },
      {
        k: "def",
        term: "Young modulus",
        text: "The ratio of tensile stress to tensile strain, E = σ/ε — a property of the *material* alone, and the ==gradient of the linear part== of its stress–strain graph. Twice the stiffness for the same shape; unchanged when the wire is doubled over or recast.",
      },
      {
        k: "eq",
        title: "The materials set on the data sheet",
        eq: "ρ = m/V        F = 6πηrv        ΔF = kΔx        ΔEel = ½FΔx        E = σ/ε",
        note: "Stokes' law is printed — but the *conditions* are not: small spherical object, low speed, laminar (non-turbulent) flow. Those two marks appear in nearly every paper.",
      },
      {
        k: "ex",
        title: "Real question · WPH11 January 2024 Q15(b)(ii) — is it glycerol?",
        steps: [
          "A ball-bearing of radius 2.30 mm falls through a liquid at terminal velocity 0.0824 m s^−1^. Its weight is 4.00 × 10^−3^ N; the liquid's density is 1.26 × 10^3^ kg m^−3^; glycerol's viscosity is 0.934 Pa s. Deduce whether the liquid is glycerol. (6)",
          "V = (4/3)πr³ = (4/3)π × (2.30 × 10^−3^)³ = 5.10 × 10^−8^ m³",
          "Upthrust = ρVg = 1.26 × 10^3^ × 5.10 × 10^−8^ × 9.81 = 6.31 × 10^−4^ N",
          "At terminal velocity: drag = weight − upthrust = 4.00 × 10^−3^ − 6.31 × 10^−4^ = 3.37 × 10^−3^ N",
          "F = 6πηrv → η = 3.37 × 10^−3^ ÷ (6π × 2.30 × 10^−3^ × 0.0824)",
        ],
        answer: "η = 0.94 Pa s ≈ 0.934 Pa s, so the liquid is glycerol (comparison + conclusion stated)",
      },
      {
        k: "p",
        text: "The recurring traps are written down by the examiners themselves: using the ==diameter as the radius== (June 2025: “questions to include data about the radius or diameter of a sphere” are routine), forgetting ==cm³ → m³ is ×10^−6^==, reading the 'v' in Stokes' law as a volume, and stopping at a value when the question says *deduce*. Every one of those is a mark you can simply refuse to lose.",
      },
      {
        k: "tips",
        items: [
          "Strain has **no unit** (a percentage is fine); stress is Pa = N m^−2^; viscosity is Pa s. Marks are lost for bare numbers.",
          "The area under a **force–extension** graph is energy in joules; the area under a **stress–strain** graph is energy *per unit volume* — proportional to it, the October 2024 report insists, not equal.",
          "Limit of proportionality (end of the straight line) ≠ elastic limit (last point of full recovery) ≠ yield point (sudden plastic flow). October 2023 put all three in one multiple-choice item.",
          "Gradient technique: use **more than half the drawn line**, and quote to one more significant figure than the question's value.",
        ],
      },
      {
        k: "recap",
        items: [
          "Terminal velocity in a fluid: weight = upthrust + drag, then solve with Stokes.",
          "“Does Stokes' law apply?” — calculate the drag it predicts, compare with the real drag, conclude.",
          "Hotter liquid → lower viscosity → faster terminal fall (liquids; gases are the opposite way round).",
          "Young modulus from a graph: gradient × (length ÷ area), or E = Fl/(AΔx) straight off the data.",
          "Deduce questions end with a number, a comparison and a sentence — always.",
        ],
      },
    ],
  },
];
