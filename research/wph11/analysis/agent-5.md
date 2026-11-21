# WPH11 Topic 2 analysis — agent 5 (2025-Oct-01A → 2026-Jun-01A)

Note on quoting: quotes are verbatim from the pdftotext files. Doubled letters in symbols (𝑈𝑈, 𝐷𝐷, 𝜂𝜂, 𝑘𝑘) are pdftotext artifacts of italic math fonts in the original MS; "(1)" markers are as printed. Q numbers are the printed numbers in the question papers.

## 2025-Oct-01A (P87440A)

Materials questions found: Q2, Q7 (MCQs), Q13, Q14, Q15, Q19 (+ Q16(a) BORDERLINE). Central scan flags were misaligned: its Q1 (vector MCQ), Q6 (projectile MCQ), Q12 (moving walkway), Q18 (mallet collision) are pure Topic 1 — dropped; it missed Q2, Q7, Q15, Q19.

### Q2 (1 mark) — MCQ
- Scenario: Cylinder of weight 1.5 N on a vertical spring, compresses 3.0 cm; find spring constant.
- Asked: Which is k?
- MS verbatim:
  > 2           The only correct answer is D (50 N m-1)                                               1
  > ∆𝐹𝐹    1.5 N
  > A is not correct because 𝑘𝑘 =    =         = 50 N m−1
  > ∆𝑥𝑥   0.030 m
  > (identical working printed for B and C distractors)
- Guidance notes: all wrong options explained with the same k = ΔF/Δx calculation showing they all give 50 N m⁻¹ (distractors test unit/decimal handling).

### Q7 (1 mark) — MCQ
- Scenario: Curved force-extension graph for a wire; force F1 gives extension e1. Work done W to extend.
- Asked: Which describes W?
- MS verbatim:
  > 7    The only correct answer is B (𝑊𝑊 > 0.5𝐹𝐹1 𝑒𝑒1 )                                       1
  > A is not correct because the area under the graph is greater than the area of a triangle drawn from the origin to the end of the line
  > C is not correct because work done is a force multiplied by a distance, not divided by a distance
  > D is not correct because work done is a force multiplied by a distance, not divided by a distance
- Guidance notes: area-under-graph reasoning; W = area > triangle ½F1e1 for a convex (stiffening then… actually concave-up) curve.

### Q13 (6 marks) — Stokes' law
- Scenario: Sphere falls through water at constant speed 0.50 m s⁻¹. Given: diameter 6.0×10⁻³ m, mass 9.1×10⁻⁴ kg, upthrust 1.1×10⁻³ N, viscosity of water 8.9×10⁻⁴ Pa s.
- Asked: (a) State one other condition for Stokes' law (1). (b) Assess whether Stokes' law can be applied, with calculations (5).
- MS verbatim:
  > 13(a)
  >            Low speed                                                            Ignore small sphere
  >            Or laminar flow
  >            Or an absence of turbulent flow                                (1)                                                                   1
  > 13(b)                                                                           Example calculation
  >            Use of W = mg                                                  (1)   𝑊𝑊 = 9.1 × 10−4 kg × 9.81 N kg −1 = 8.93 × 10−3 N
  >            Use of 𝑈𝑈 + 𝐷𝐷 = 𝑊𝑊                                            (1)   Drag = 8.93 × 10−3 N − 1.1 × 10−3 N = 7.83 × 10−3 N
  >            Use of F = 6πηrv                                                     6.0 × 10−3 m
  >                                                                                𝐹𝐹 = 6𝜋𝜋 × 8.9 × 10−4 Pa s ×                 × 0.50 m s −1
  >                                                                          (1)                                         2
  >           F = (−) 2.5 × 10−5 N
  >                                                                                𝐹𝐹 = 2.52 × 10−5 N
  >            Comparison of calculated value of drag with calculated value
  >            for F and corresponding conclusion                             (1)   7.83 × 10−3 N ≠ 2.52 × 10−5 N, so no.                           5
- Guidance notes: "Ignore small sphere" (sphere size already given as a condition); drag from U + D = W; Stokes force computed with r = d/2; conclusion by comparing the two very different values → "no".

### Q14 (6 marks) — starred, terminal velocity in fluid
- Scenario: Motion sensor + data logger plots v–t for a small sphere falling through a vacuum and through oil.
- Asked: Explain the differences between the shapes of the graphs.
- MS verbatim (indicative content; 6 IC points, IC max 4, linkage max 2, final max 6):
  > *14      This question assesses a student's ability to show a coherent and logically structured answer with linkages and fully-sustained reasoning.
  > IC1 Gradient of graph is equal to acceleration
  > IC2 In vacuum, drag = 0 (and upthrust = 0)
  >     Or In vacuum, resultant force = weight
  >     Or In vacuum, resultant force is constant
  >     Or In vacuum the only force acting is weight
  > IC3 so in vacuum acceleration/gradient is constant
  > IC4 In oil, as speed increases, drag force increases
  > IC5 Until in oil resultant force becomes zero
  >     Or until weight = drag (+ upthrust)
  >     Or until weight – drag (– upthrust) = 0
  > IC6 so in oil acceleration/gradient decreases to zero
  >     Or so in oil acceleration/gradient decreases until terminal/constant velocity is reached
- Guidance notes: standard *-question grid (6 IC → 4 marks; 5 IC → 3; 4 IC → 3 with 1 linkage; etc.), plus 2 marks for structure/line of reasoning.

### Q15 (9 marks) — Core Practical 3 (Young modulus of a wire)
- Scenario: Copper wire, mass m added, extension Δx measured, repeated for increasing masses.
- Asked: (a) Meaning of Young modulus (1). (b)(i) Cross-sectional area from four diameter readings 0.230/0.235/0.230/0.240 mm (3). (b)(ii) Gradient of m–Δx graph = 195 kg m⁻¹; length 3.50 m; determine E (3). (b)(iii) Repeat with 2.00 m length: how do gradient and E differ (2).
- MS verbatim:
  > 15(a)
  >              the stiffness of the material / metal / copper
  >                                       Stress
  >              Or (Young modulus =) Strain in the linear region
  >                                       𝐹𝐹𝐹𝐹
  >              Or (Young modulus =) 𝐴𝐴∆𝑥𝑥 in the linear region with all terms   (1)
  >              defined                                                                                                                                1
  > 15(b)(i)                                                                            Example calculation
  >              Calculates mean diameter                                         (1)
  >              Calculates cross sectional area                                  (1)     Mean diameter = 0.234 × 10−3 m
  >              A = 4.3 × 10−8 m2 ( = 4.3 × 10−2 mm2)
  >                                                                                    𝐴𝐴 = 𝜋𝜋(0.234 × 10−3 𝑚𝑚)2/4 = 4.30 × 10−8 m2
  > 15(b)(ii)                                                                           Example calculation
  >              Use of W = mg                                                    (1)
  >              Use of 𝜎𝜎 = 𝐹𝐹/𝐴𝐴 and Use of 𝜀𝜀 = 𝑥𝑥/length and use of 𝐸𝐸 = 𝜎𝜎/𝜀𝜀        𝐹𝐹/∆𝑥𝑥 = 195 kg m−1 × 9.81 N kg −1 = 1913 N m−1
  >              Or
  >              Calculates gradient × area                                       (1)   𝐸𝐸 = 1913 N m−1 × 3.50 m / 4.30 × 10−8 m2 = 1.557 × 1011 Pa
  >              Young modulus = 1.6 × 1011 Pa (ecf from (b)(i))                                                                                        3
  > 15(b)(iii)   The gradient will be greater (for the shorter wire)
  >                                                                              (1)
  >              The Young modulus is the same
  >                                                                              (1)                                                                   2
- Guidance notes: gradient × length / area route accepted; "ecf from (b)(i)" on E; E is a material property — same for both lengths.

### Q16 (9 marks) — fireboat — BORDERLINE (only part (a) uses density)
- Scenario: Pump projects 300 kg of seawater per second from a pipe of radius 5.0 cm; ρ(seawater) = 1030 kg m⁻³. Parts (b)(c) are Newton's-3rd-law / drag mechanics (Topic 1) — excluded from notes.
- Asked (a): Show that the speed of projection is about 37 m s⁻¹ (4).
- MS verbatim (a) only:
  > 16(a)                                                                            Example calculation
  >                       𝑚𝑚
  >            Use of 𝜌𝜌 =                                                     (1)
  >                       𝑉𝑉
  >                                                                                          300 kg
  >                                                                           (1)   𝑉𝑉 =               = 0.291 m3
  >           Calculates cross sectional area of pipe                              1030 kg m−3
  >           Use of volume in 1 second = cross section area × speed          (1)   𝐴𝐴 = 𝜋𝜋 × (0.050 m)2 = 7.85 × 10−3 m2
  >           Speed = 37.1 (m s−1) (to at least 3 significant figures)        (1)                        0.291 m3 s−1                                   4
  >                                                                                              𝑣𝑣 =                  = 37.10 m s −1
  >                                                                                                     7.85 × 10−3 m2
- Guidance notes: BORDERLINE — included because part (a) is a ρ = m/V mass-flow-rate calculation (density scope), but the question centres on momentum/N3, so treat (a) only as a density application example.

### Q19 (12 marks) — upthrust / flotation on a balance
- Scenario: Sphere suspended by thread in water on a balance reading 0.465 kg (was 0.315 kg in air). Density of water 1000 kg m⁻³, density of sphere 2000 kg m⁻³. Then oil (lower density) replaces water.
- Asked: (a) Free-body force diagram (3). (b)(i) Explain increase in balance reading with Newton's third law (3). (b)(ii) Determine mass of sphere (4). (b)(iii) Explain change in reading in oil (2).
- MS verbatim:
  > 19(a)
  >             Upwards arrow labelled upthrust / U and Upwards arrow labelled         (1)   Arrows must start from dot
  >             tension / T / F / 𝐹𝐹thread
  >             Downwards arrow labelled Weight / W / mg                               (1)
  >             Length of downwards arrow ≈ total length of upwards arrows
  >             (dependent on MP1 or MP2)                                              (1)                                                                      3
  > 19(b)(i)
  >             The water exerts an upwards force on the sphere                        (1)
  >             Or the water exerts an upthrust on the sphere
  >             by Newton's third law the sphere exerts a downward/opposite force      (1)
  >             on water (dependent on MP1)
  >             (so) the force on the balance increases (and the reading increases)    (1)                                                                      3
  > 19(b)(ii)                                                                                (credit correct equivalent physics due to the density of the
  >             mass of displaced water = 0.150 kg                                     (1)   sphere being double the density of the water leading to the
  >                                                                                         answer of 0.30 kg if correct reasoning shown)
  >                           𝑚𝑚
  >             Use of 𝜌𝜌 =      with 𝜌𝜌 = 1000 kg m-3 to determine volume of sphere   (1)
  >                           𝑉𝑉
  >                           𝑚𝑚
  >             Use of 𝜌𝜌 =      with 𝜌𝜌 = 2000 kg m-3 to determine mass of sphere     (1)
  >                           𝑉𝑉
  >                                                                                   (1)                                                                  4
  >             Mass of sphere = 0.30 kg                                                     Example calculation: Mass of displaced water = 0.465 kg − 0.315 kg = 0.150 kg; Volume = 1.50 × 10−4 m3; Mass = 0.300 kg
  > 19(b)(iii)   Upthrust will be less
  >              Or weight of displaced oil will be less
  >              Or downwards force of sphere on liquid will be less                (1)
  >              (So) final reading will be less (than 465 g)
  >              Or (So) the increase/change in reading will be less (than 150 g)   (1)   MP2 dependent on MP1                                       2
- Guidance notes: displaced-water mass from balance difference; "credit correct equivalent physics" shortcut (sphere twice as dense → 0.30 kg); MP2 dependent on MP1 in (b)(iii); arrows must start from dot.

## 2026-Jan (P79143A)

Materials questions found: Q8, Q9 (MCQs), Q15, Q16, Q19. Central flags were partially misaligned: Q7 (parachute N3 — Topic 1, excluded), Q14 (bracket moments — Topic 1, excluded), Q18 (satellite projectile — Topic 1, excluded); the toaster springs question is printed as Q19, not Q18. Q10 (spring + two masses, string breaks) uses a spring but centres on N2/equilibrium with no kΔx reasoning — excluded per boundary rules.

### Q8 (1 mark) — MCQ
- Scenario: Same tensile force on two wires of same material; second wire extends Δx/2.
- Asked: Which length and cross-sectional area could the second wire have?
- MS verbatim:
  > 8    The only correct answer is B (Length = x; Cross-sectional area = 2A)                  1
  >      A is not correct because this would give an extension of 2∆𝑥𝑥
  >      B is not correct because this would give an extension of 4∆𝑥𝑥
  >      D is not correct because this would give an extension of ∆𝑥𝑥
- Guidance notes: k = EA/x proportional reasoning; note MS prints "B is not correct because this would give an extension of 4∆𝑥𝑥" — this line actually justifies C (2x, 0.5A); a quirk of the printed distractor notes.

### Q9 (1 mark) — MCQ
- Scenario: Force-extension graph for a spring (linear to 8 mm, force axis to 400 N). 50 N applied, then an additional 300 N.
- Asked: Which expression gives the change in elastic strain energy when the additional force is applied?
- MS verbatim:
  > 9    The only correct answer is C �
  >                                        (300 + 50 + 50) × 6 × 10−3
  >                                                                     �                      1
  >                                                    2
  >      A is not correct because this would be the change in elastic energy if the initial force applied was 0 N
  >      B is not correct because the final force on the spring is (300 + 50) N so this does not take account that the initial force on the spring was 50 N
  >      D is not correct because this would be the total elastic energy of the spring
- Guidance notes: change in area under graph = trapezium = mean force (50+350)/2 × extension; extension read as 6 × 10⁻³ m.

### Q15 (10 marks) — Stokes' law / viscosity in a spray-paint can
- Scenario: Can of paint + solvent + ball bearing. (b) Bearing moves 5.6 cm in 1.3 s at constant velocity; radius 0.90 mm; viscosity 0.15 Pa s. (c) Mixture: viscosity different; bearing falls at terminal velocity; mass of bearing 2.4×10⁻⁵ kg; density of mixture 1.5×10³ kg m⁻³; radius 0.90 mm.
- Asked: (a) State the conditions for Stokes' law to apply (2). (b) Calculate viscous drag (3). (c) Calculate viscous drag due to mixture at terminal velocity (5).
- MS verbatim:
  > 15(a)      Small, spherical object
  >            Or Spherical object with low speed                      (1)
  >            Laminar flow                                            (1)   Allow an absence of turbulent flow                              2
  > 15(b)      Use of 𝑠𝑠 = 𝑢𝑢𝑢𝑢 + 1/2𝑎𝑎𝑡𝑡 2 with a = 0                 (1)   Example of calculation
  >            Use of 𝐹𝐹 = 6π𝜂𝜂𝜂𝜂𝜂𝜂                                    (1)          0.056 m
  >                                                                         𝑢𝑢 =           = 0.043 m s −1
  >                                                                                  1.3 s
  >            F = 1.1 × 10−4 N                                        (1)                                                                   3
  >                                                                         𝐹𝐹 = 6 × π × 0.15 Pa s × 0.90 × 10−3 m × 0.043 m s−1
  >                                                                         𝐹𝐹 = 1.09 × 10−4 N
  > 15(c)      Calculates volume of ball bearing                       (1)   Example of calculation
  >                         𝑚𝑚                                                     4
  >            Use of 𝜌𝜌 =      to determine mass of displaced paint   (1)   𝑉𝑉 =     × π × (0.90 × 10−3 m)3 = 3.05 × 10−9 m3
  >                         𝑉𝑉                                              3
  >            Use of 𝑊𝑊 = 𝑚𝑚𝑚𝑚                                        (1)
  >                                                                         𝑚𝑚 = 1.5 × 103 kg m−3 × 3.05 × 10−9 m3 = 4.58 × 10−6 kg
  >                                                                   (1)
  >            Use of ΣF = 0 (so viscous drag = weight – upthrust)
  >                                                                         Upthrust = weight of displaced paint
  >                                                                   (1)            = 4.58 × 10−6 kg × 9.81 N kg −1 = 4.49 × 10−5 N        5
  >            Viscous drag = 1.9 ×10−4 N
  >                                                                         Weight of ball bearing = 2.4 × 10−5 N × 9.81 N kg −1
  >                                                                                                = 2.35 × 10−4 N
  >                                                                         Viscous drag = 2.35 × 10−4 N − 4.49 × 10−5 N = 1.91 × 10−4 N
- Guidance notes: at terminal velocity ΣF = 0 so drag = weight − upthrust; upthrust via displaced-mixture mass; "Allow an absence of turbulent flow".

### Q16 (8 marks) — Young modulus of tennis string
- Scenario: String clamped over bench pulley with marker; measure original length x, add tension, measure new length.
- Asked: (a) Why suspend a small mass before measuring x (1). (b) How to decrease percentage uncertainty in x (3). (c) Deduce material from E (gut 6.0, nylon 5.0, polyester 0.92 GPa), A = 1.2×10⁻⁶ m², x = 1.6 m, ΔF = 15 N, Δx = 4.2 mm (4).
- MS verbatim:
  > 16(a)      Adding the mass causes the string to be straight / taut   (1)   Allow so the string is under tension                                      1
  > 16(b)      Increase x                                                      Allow use a longer length of string (between the clamp and the marker)
  >            Or Position the marker further from the clamp             (1)
  >            (absolute) uncertainty will remain the same               (1)
  >            (and) percentage uncertainty is calculated by dividing
  >            uncertainty by x / length                                 (1)
  >            OR
  >            Position metre rule adjacent to string
  >            Or Use a set square between metre rule and string         (1)
  >            Or View perpendicular to the string / ruler
  >                                                                     (1)
  >            To reduce parallax error (dependent on MP1)
  >                                                                     (1)   Ignore decreases percentage uncertainty
  >            Which decreases (absolute) uncertainty (dependent on                                                                                      3
  >            MP1)
  > 16(c)                  𝐹𝐹
  >            Use of 𝜎𝜎 = 𝐴𝐴                                            (1)   Example of calculation
  >                         ∆𝑥𝑥                                         (1)               15 N
  >            Use of 𝜀𝜀 =                                                     𝜎𝜎 =                 = 12.5 × 106 Pa
  >                          𝑥𝑥                                                      1.2 × 10−6 m2
  >                         𝜎𝜎
  >            Use of 𝐸𝐸 =                                               (1)          4.2 × 10−3
  >                         𝜀𝜀                                                𝜀𝜀 =              = 2.63 × 10−3
  >                                                                                      1.6
  >            E = 4.8 (GPa) ≈ 5.0 (GPa) so the string is nylon          (1)                                                                             4
  >                                                                                           6
  >            Or E = 4.8 (GPa) which is closest to the value for                     12.5 × 10 Pa
  >                                                                           𝐸𝐸 =                = 4.75 × 109 Pa
  >           nylon                                                                   2.63 × 10−3
  >                                                                           4.75 × 109 Pa ≈ 5.0 GPa so the string is nylon
- Guidance notes: two alternative routes for (b) (longer x vs parallax reduction, with dependent marks); "Ignore decreases percentage uncertainty" (that restatement scores nothing).

### Q19 (12 marks) — toaster springs (elastic strain energy, springs in combination)
- Scenario: Platform on four identical corner springs; person pushes down (stretching springs) and hook holds; bread weight 0.52 N lowers platform 2.1 cm; hook adds 1.2 N downwards; springs return to unstretched length launching bread.
- Asked: (a) Compare elastic strain energy stored with work done by person (3). (b)(i) Show stiffness of each spring ≈ 6 N m⁻¹ (3). (b)(ii) Speed of bread when springs reach unstretched length (6).
- MS verbatim:
  > 19(a)      There is some energy stored in the spring when the
  >           bread is in the toaster
  >           Or Some work is done by gravity                               (1)
  >           Total work done (to stretch the spring) is work done by
  >           gravity plus work done by force of the person                 (1)
  >           So the (total elastic strain) energy stored is greater than
  >           the work done (by the person)                                 (1)   (dependent on MP1 or MP2)                   3
  > 19(b)(i)    Determines the force on each spring                     (1)   Example of calculation
  >            Use of ∆𝐹𝐹 = 𝑘𝑘∆𝑥𝑥                                      (1)   Force on each spring = 0.52 N / 4 = 0.13 N
  >            𝑘𝑘 = 6.2 (N m−1 ) (to at least 2 significant figures)   (1)         0.13 N                                               3
  >                                                                          𝑘𝑘 =         = 6.19 N m−1
  >                                                                               0.021 m
  > 19(b)(ii)   Use of ∆𝐹𝐹 = 𝑘𝑘∆𝑥𝑥                                      (1)   Example of calculation
  >                            1
  >            Use of ∆𝐸𝐸el = 𝐹𝐹∆𝑥𝑥                                                1.2 N + 0.52 N
  >                            2                                       (1)        𝑥𝑥 = �            � = 0.0695 m
  >                                                                                       4       6.19 N m−1
  >            Use of ∆𝐸𝐸grav = 𝑚𝑚𝑚𝑚∆ℎ with 𝑚𝑚𝑚𝑚 = 0.52 N              (1)
  >                                                                          𝐸𝐸elastic = 0.5 × (1.2 N + 0.52 N) × 0.0695 m = 0.0598 J
  >            Applies conservation of energy
  >                                                                    (1)   ∆𝐸𝐸grav = 0.52 N × 0.0695 m = 0.0361 J
  >                        1
  >            Use of 𝐸𝐸k = 𝑚𝑚𝑣𝑣 2 and use of 𝑊𝑊 = 𝑚𝑚𝑚𝑚
  >                        2
  >                                                                          ∆𝐸𝐸k = 0.0598 J − 0.0361 J = 0.0237 J
  >                          −1
  >                                                                    (1)
  >            𝑣𝑣 = 0.95 m s (ecf from (b)(i)) (show that value
  >            gives 𝑣𝑣 = 0.96 m s−1)                                                  0.52 N
  >                                                                          𝑚𝑚 =                = 0.0530 kg
  >                                                                                 9.81 N kg −1
  >                                                                    (1)                                                              6
  >                                                                          𝑣𝑣 = �2 × 0.0237 J / 0.0530 kg = 0.946 m s−1
- Guidance notes: ΔEel = ½FΔx with F = hook force + bread weight (initial spring tension); ecf chain from (b)(i); "show that value gives 0.96".

## 2026-Jan-01A (P87631A)

Materials questions found: Q3, Q5, Q7, Q8, Q9 (MCQs), Q12, Q14, Q15, Q19. Central flags Q2/Q6/Q7/Q8 were off-by-one against the printed numbers; Q11 (trolley track) and Q13 (coat hook moments) are Topic 1 — excluded; it missed Q3, Q5, Q9, Q12, Q19.

### Q3 (1 mark) — MCQ
- Scenario: Tensile stress-strain graph for copper rod; point X on the curve (after the steep linear section).
- Asked: What does point X represent?
- MS verbatim:
  > 3          The only correct answer is D (the yield point of copper)                         1
  >            A is incorrect because the fracture point is at the extreme end of the graph
  >            B is incorrect because proportionality ends before point X is reached
  >            C is incorrect because point X is not the highest point reached by the graph
- Guidance notes: distinguishes yield point vs limit of proportionality vs fracture/UTS positions on a stress-strain curve.

### Q5 (1 mark) — MCQ
- Scenario: Aluminium cylinder, weight 35.0 N, volume 1.32×10⁻³ m³.
- Asked: Which calculation gives density in kg m⁻³?
- MS verbatim:
  > 5                                                35.0
  >           The only correct answer is C �9.81×1.32×10−3 �                                   1
  >           A is incorrect because it gives units of m3 kg−1
  >           B is incorrect because it gives units of m3 kg N−2
  >           D is incorrect because it gives units of N2 kg−1 m−3
- Guidance notes: weight→mass via g then ρ = m/V; distractor analysis done by units.

### Q7 (1 mark) — MCQ
- Scenario: Sphere falls through a viscous liquid while accelerating downwards.
- Asked: Which row describes upthrust and viscous drag?
- MS verbatim:
  > 7   The only correct answer is B (Upthrust constant and viscous drag increasing)           1
  >     A is incorrect because the upthrust is constant
  >     C is incorrect because the upthrust is constant and the viscous drag is
  >     increasing
  >     D is incorrect because the viscous drag is increasing
- Guidance notes: upthrust constant (same displaced volume), drag ∝ v so increases with speed.

### Q8 (1 mark) — MCQ
- Scenario: Arrangements P and Q of identical springs, same tensile force F (P = two springs in series carrying F; Q = two springs in parallel sharing F). One spring with force F stores E.
- Asked: Total elastic strain energy for each arrangement?
- MS verbatim:
  > 8   The only correct answer is D (P: 2E; Q: ½ E)                                           1
  >     A is incorrect because springs in series increase the extension and springs in
  >     parallel decrease the extension for the same force
  >     B is incorrect because springs in series increase the extension for the same force
  >     C is incorrect because springs in parallel decrease the extension for the same force
- Guidance notes: series → each spring takes F → 2E total; parallel → each spring takes F/2 → ½E each... (MS answer D: P: 2E, Q: ½E).

### Q9 (1 mark) — MCQ
- Scenario: Rubber band stretched by increasing force, then unloaded back to original length; force-extension graph with areas P, Q, R (loading above, unloading below).
- Asked: Work done stretching to maximum extension?
- MS verbatim:
  > 9    The only correct answer is B (𝑄𝑄 + 𝑅𝑅)                                  1
  >      A is incorrect because P is spurious and R is not included
  >      C is incorrect because Q is not included
  >      D is incorrect because R is not included
- Guidance notes: work done loading = whole area under loading curve (Q + R in the printed figure).

### Q12 (7 marks) — Young modulus of constantan wire (with stiffness)
- Scenario: Constantan wire, A = 3.97×10⁻⁷ m², x = 4.00 m; breaking stress ≈ 420 MPa; F–Δx graph given (linear then curving).
- Asked: (a) Deduce whether wire could support 150 N (3). (b)(i) Show stiffness ≈ 1.3×10⁴ N m⁻¹ (2). (b)(ii) Given k = EA/x, determine E (2).
- MS verbatim:
  > 12(a)      Use of 𝜎𝜎 =
  >                       𝐹𝐹                                      (1) Example of calculation
  >                      𝐴𝐴
  >                                                                                   150 N
  >           𝜎𝜎 = 378 MPa                                                                      = 378 MPa
  >                                                                        (1)   3.97 × 10−7 m2
  >           Comparison of calculated stress with 420 (MPa) and                 378 MPa < 420 MPa so yes, it can support the weight
  >                                                                        (1)                                                          3
  >           consistent conclusion
  >           For MP2 and 3
  >           F =167 N;
  >           Comparison of calculated force with 150 (N) and consistent
  >           conclusion
  >           Or
  >           𝐴𝐴 = 3.57 × 10−7 m2 ;
  >           Comparison of calculated area with 3.97 × 10−7 (m2 ) and
  >           consistent conclusion
  > 12(b)(i)    Determines gradient of straight line section with an extension of
  >             ≤ 5.0 mm and force ≤ 64 N
  >             Or Use of ∆𝐹𝐹 = 𝑘𝑘∆𝑥𝑥 with an extension of ≤ 5 mm                   (1)   allow a tolerance of ± half a small square
  >                                                                                                                                           2
  >             k = 1.30 × 104 (N m−1) to at least 3 significant figures            (1)   allow a value consistent with their valid readings
  >                                                                                       MP2 dependent on MP1
  >                                                                                       Example of calculation: 𝑘𝑘 = 60 N / 4.6 × 10−3 m = 1.304 × 104 N m−1
  > 12(b)(ii)               𝐸𝐸𝐸𝐸
  >             Use of 𝑘𝑘 = 𝑥𝑥                                        (1)                 Example of calculation
  >                                                                                (1)          1.3 × 104 N m−1 × 4.00 m                      2
  >             E = 1.3 × 1011 Pa (ecf from (b)(i))                                       𝐸𝐸 =
  >                                                                                                  3.97 × 10−7 m2
  >                                                                                      E = 1.31 × 1011 Pa
- Guidance notes: three equivalent routes for (a) (max stress, max force, min area); gradient must use the straight section only (extension ≤ 5.0 mm, force ≤ 64 N); MP2 dependent on MP1; ecf into E.

### Q14 (7 marks) — sphere moving horizontally through a viscous liquid (Stokes)
- Scenario: Constant horizontal driving force 2.3×10⁻⁵ N on sphere; diameter 4.5×10⁻³ m; viscosity 7.1×10⁻² Pa s.
- Asked: (a) State conditions for Stokes' law validity (2). (b)(i) At speed 5.2×10⁻³ m s⁻¹, calculate resultant horizontal force (3). (b)(ii) Calculate maximum horizontal speed (2).
- MS verbatim:
  > 14(a)      Small, spherical object
  >            Or Spherical object with low speed                 (1)
  >            Laminar flow                                           (1) Allow an absence of turbulent flow                                          2
  > 14(b)(i)   Use of F = 6π η r v with 𝑟𝑟 =
  >                                         𝑑𝑑                       (1)
  >                                         2
  >                                                                  (1)
  >           Calculates Σ𝐹𝐹
  >                                                                  (1)                                                                             3
  >           Resultant force = 7 × 10−6 N
  >                                                                        Example of calculation: 𝐹𝐹drag = 6 × 𝜋𝜋 × 7.1 × 10−2 Pa s × 4.5 × 10−3 m/2 × 5.2 × 10−3 m s −1 = 1.57 × 10−5 N
  >                                                                        Σ𝐹𝐹 = 2.3 × 10−5 N − 1.57 × 10−5 N = 7.3 × 10−6 N
  > 14(b)(ii)   Use of F = 6π η r v with F = 2.3 × 10−5 N           (1) May use diameter instead of radius in this question part and
  >                                                                         still score MP1
  >            v = 7.6 × 10−3 m s−1                                   (1)                                                                    2
  >                                                                         2.30 × 10−5 N = 6 × 𝜋𝜋 × 7.10 × 10−2 Pa s × 2.25 × 10−3 m × 𝑣𝑣
- Guidance notes: max speed when drag = driving force; unusual allowance "May use diameter instead of radius … and still score MP1".

### Q15 (6 marks) — starred, Galilean thermometer (flotation/density)
- Scenario: Sealed glass bulbs with metal discs of different mass in a liquid; as temperature rises the liquid's density decreases; bulb sinks when temperature exceeds a certain value.
- Asked: Explain why a particular bulb floats until the temperature exceeds a certain value.
- MS verbatim (indicative content):
  > *15   This question assesses a student's ability to show a coherent and logically structured answer with linkages and fully-sustained reasoning.
  > IC1 Upthrust equals weight of liquid displaced.
  > IC2 When upthrust ≥ weight of bulb / disc, bulb floats
  > IC3 As temperature increases, upthrust decreases (because density of liquid decreases)
  >     Or As temperature increases, weight of liquid displaced decreases (because density of liquid decreases)
  > IC4 Until weight of a bulb / disc > upthrust
  > IC5 So there is a resultant force downwards on the bulb
  > IC6 So the bulb accelerates downwards
- Guidance notes: same *-grid as Q14 2025-Oct-01A (6 IC / 4 IC-marks / linkage 2 / final 6).

### Q19 (10 marks) — nylon rope in a pulley system (stiffness, E, extension, strain energy)
- Scenario: Rope over fixed + moving pulley lifts 5.00 kN load; E(nylon) = 2.70 GPa, rope length 6.00 m, A = 3.00×10⁻⁴ m².
- Asked: (a) Explain why longer rope → smaller stiffness (2). (b)(i) Show k ≈ 1.4×10⁵ N m⁻¹ (3). (b)(ii) Extension during lift (3). (b)(iii) Work done stretching rope (2).
- MS verbatim:
  > 19(a)            𝐹𝐹
  >           𝑘𝑘 = ∆𝑥𝑥                                                                     (1)
  >           Extension is proportional to (original) length
  >           Or
  >           The greater the length of the rope, the greater the extension (for a given
  >           force)
  >                                                                                        (1)
  >           OR
  >                𝐸𝐸𝐸𝐸
  >           𝑘𝑘 =                                                                         (1)
  >                  𝑥𝑥
  >           The stiffness (constant) for the rope is inversely proportional to the length   (1)
  >           of the rope
  >                                                                                        2
  > 19(b)(i)     Use of 𝐸𝐸 =
  >                            𝜎𝜎         𝐹𝐹
  >                               and 𝜎𝜎 = and 𝜀𝜀 =
  >                                                 ∆𝑥𝑥                             (1)   Example of calculation
  >                            𝜀𝜀         𝐴𝐴        𝑥𝑥                                                         𝐹𝐹 × 6.00 m
  >                                                                                (1)   2.7 × 109 Pa =
  >             Use of 𝐹𝐹 = 𝑘𝑘∆𝑥𝑥                                                                       ∆𝑥𝑥 × 3.00 × 10−4 m2
  >                                                                                                2.7 × 109 Pa × 3.00 × 10−4 m2
  >                                                                                (1)   𝑘𝑘 =       =
  >             1.35 × 105 (N m−1) (to at least 3 significant figures)                          ∆𝑥𝑥               6.00 m
  >                                                                                𝑘𝑘 = 1.35 × 105 N m−1
  > 19(b)(ii)    Correct use of factor of 2 to calculate F                          (1)   Example of calculation
  >             Use of ∆𝐹𝐹 = 𝑘𝑘∆𝑥𝑥                                                              5000 N
  >                                𝜎𝜎     𝐹𝐹        ∆𝑥𝑥                            (1)   𝐹𝐹 =          = 2500 N
  >             Or Use of 𝐸𝐸 = 𝜎𝜎/𝜀𝜀 and 𝜎𝜎 = 𝐹𝐹/𝐴𝐴 and 𝜀𝜀 = ∆𝑥𝑥/𝑥𝑥                                   2
  >                                                                                                2 500 N
  >             1.85 × 10−2 (m) (ecf from b(i))                                          ∆𝑥𝑥 =                    = 1.85 × 10−2 m
  >             ('show that' value gives 1.79 × 10−2 (m))                                (1)           1.35 × 105 N m-1                     3
  > 19(b)(iii)                  1
  >             Use of ∆𝐸𝐸el = 2 𝐹𝐹∆𝑥𝑥                                             (1)   Example of calculation
  >                                                                                (1)            1
  >                                                                                      ∆𝐸𝐸el = × 2500 N × 0.0185 m = 23.1 J         2
  >             W = 23 J (ecf from 19(b)(ii) and 19(b)(i))                                        2
  >             ('show that' value gives 22.3 J)
- Guidance notes: moving pulley → rope tension = load/2 (the "factor of 2"); ecf chains across (b)(i)→(ii)→(iii); reverse-working note in MS preamble: show-that worth 3 marks → only 2 for reverse working.

## 2026-Jun (P79335RA)

Materials questions found: Q1, Q3, Q9 (MCQs), Q12, Q17, Q19 (+ Q18(b) BORDERLINE). Central flags Q2, Q8, Q11, Q16 are Topic 1 (circular motion KE, helicopter resultant, jet-ski KE, beam moments) — excluded; central Q17(7m) is correct (bubble); it missed Q1, Q3, Q9, Q12, Q19.

This paper's MS carries a "Mark scheme notes" preamble (see conventions section below).

### Q1 (1 mark) — MCQ
- Scenario/Asked: SI unit for Young modulus.
- MS verbatim:
  > 1          The only correct answer is C (N m−2)                                                     1
  >            A is not correct because this is the unit of density
  >            B is not correct because this is the unit of spring stiffness constant
  >            D is not correct because this is the unit of viscosity
- Guidance notes: distractors are the units of ρ, k and η — nice "unit family" revision list.

### Q3 (1 mark) — MCQ
- Scenario: Force F applied to a wire (beyond linear region per graph); F removed.
- Asked: What could explain what happens?
- MS verbatim:
  > 3          The only correct answer is B (The wire will not return to its original length            1
  >             because it has gone beyond its elastic limit.)
  >            A is not correct because an elastically deformed wire would return to its original
  >            length when the force is removed.
  >            C is not correct because the wire will not return to its original length
  >            D is not correct because the wire will not return to its original length
- Guidance notes: elastic limit is the criterion for permanent set; plastic deformation ⇒ no return.

### Q9 (1 mark) — MCQ
- Scenario: Wire length l, diameter d, density ρ, mass m.
- Asked: Which expression gives d?
- MS verbatim:
  > 9                                            4𝑚𝑚                                          1
  >      The only correct answer is A �𝑑𝑑 = �             �
  >                                             𝜋𝜋𝜋𝜋𝜋𝜋
  >      B is not correct because this would give the radius of the wire
  >      C is not correct because this would not give the diameter of the wire
  >      D is not correct because this would not give the diameter of the wire
- Guidance notes: combines ρ = m/V with V = πr²l; distractors give r or wrong power.

### Q12 (3 marks) — elastic strain energy of a spring
- Scenario: Force 3.8 N, stiffness 25 N m⁻¹.
- Asked: Calculate elastic strain energy stored.
- MS verbatim:
  > 12         Use of 𝐹𝐹 = 𝑘𝑘∆𝑥𝑥                (1) Example calculation
  >                           1
  >            Use of 𝐸𝐸el = 𝐹𝐹∆𝑥𝑥              (1)             3.8 N
  >                           2                      ∆𝑥𝑥 =            = 0.152 m
  >                                                          25 N m−1
  >                                                                                                 3
  >            𝐸𝐸el = 0.29 J                    (1)           1
  >                                                  𝐸𝐸el = × 3.8 N × 0.152 m = 0.289 J
  >                                                          2
- Guidance notes: two-step (kΔx first, then ½FΔx); unit on k given in question so no unit penalty issue.

### Q17 (7 marks) — starred, gas bubble rising in a pond (Stokes + upthrust)
- Scenario: Bubble of gas rises through water; Stokes' law applies; as it rises its volume increases, mass of gas constant.
- Asked: (a) Give one other condition for Stokes' law (1). (b) Explain what happens to speed as volume increases, with each force (6).
- MS verbatim:
  > 17(a)      Laminar flow
  >            Or The absence of turbulent flow                                          (1)                                                                   1
  > *17(b)     ... Indicative content:
  >            IC1 The forces acting are weight, upthrust and (viscous) drag
  >            IC2   Weight (of bubble) remains constant
  >            IC3   Upthrust increases because volume / weight of displaced water increases
  >            IC4   (At the same speed) drag increases because radius/volume of bubble increases
  >            IC5   (At the same speed, for the same increase in volume) upthrust increases more than drag
  >                  Or (At the same speed) drag is proportional to radius of bubble and upthrust is proportional to radius cubed
  >            IC6   (So) There is a resultant force (upwards) and speed/velocity of bubble increases Or There is a resultant force (upwards) and the bubble accelerates
- Guidance notes: r vs r³ scaling (upthrust grows faster than Stokes drag) is the discriminating idea; *-question grid applies.

### Q18(b) (3 marks) — BORDERLINE — terminal velocity of a stone falling into the sea
- Scenario: (b) "A small stone falls vertically from the top of the cliff into the sea. The stone reaches terminal velocity before landing in the sea. Explain why the stone reaches terminal velocity." (Rest of Q18 is projectile mechanics — excluded.) Stem has no Stokes/fluid mention → Topic 1 by the boundary rule, but the MS explicitly brings in upthrust, so included as BORDERLINE.
- MS verbatim:
  > 18(b)        Drag increases with speed / velocity                                (1) Allow air resistance for drag throughout
  >             (At terminal velocity, upthrust plus)                                   Allow weight, (upthrust) and drag cause the stone to be in
  >             drag is equal (in size) to weight of ball                           (1) equilibrium
  >             (So) resultant force becomes zero (and the ball moves at terminal         Ignore forces become balanced
  >             velocity)                                                           (1)                                                              3
- Guidance notes: "Allow air resistance for drag throughout"; "Ignore forces become balanced" (too vague for the final mark).

### Q19 (10 marks) — fishing line (breaking stress, E, area under graph)
- Scenario: Uniform circular-cross-section fishing line; tension from student and fish.
- Asked: (a) How larger diameter affects break tension (3). (b) Extension at 17 N tension; length 36 m, radius 0.34 mm, E = 2.8 GPa (4). (c) What the area between force-extension graph and x-axis represents (3).
- MS verbatim:
  > 19(a)      There is a larger (cross-sectional) area                           (1)
  >            (each fishing line) has the same breaking stress                   (1)
  >            (So the line will break at) a larger tension / force               (1)   Dependent on MP1 or MP2                                     3
  > 19(b)      Calculates cross-sectional area                                    (1)   Example of calculation
  >            Use of 𝜎𝜎 =
  >                          𝐹𝐹                                                   (1)   𝐴𝐴 = 𝜋𝜋 × (0.34 × 10−3 m)2 = 3.63 × 10−7 m2
  >                          𝐴𝐴
  >                          𝜎𝜎                     ∆𝑥𝑥                                             17 N
  >            Use of 𝐸𝐸 =        and use of 𝜀𝜀 =                                 (1)   𝜎𝜎 =                  = 4.68 × 107 Pa
  >                          𝜀𝜀                     𝑥𝑥                                         3.63 × 10−7 m2
  >            Extension = 0.60 m                                                 (1)          4.68 × 107 Pa                                        4
  >                                                                                    𝜀𝜀 =                 = 1.67 × 10−2
  >                                                                                            2.8 × 109 Pa
  >                                                                                    ∆𝑥𝑥 = 1.67 × 10−2 × 36 m = 0.601 m
  > 19(c)      Represents the elastic strain energy stored in the fishing line    (1)   Allow elastic potential energy for elastic strain energy
  >            which is work done to stretch the fishing line                     (1)   Allow 𝑊𝑊 = 𝐹𝐹∆𝑠𝑠
  >                                                                                    Allow which is the work done on the fishing line
  >            (because) the area is the mean force multiplied by the extension   (1)                                        1
  >                                                                                    Allow (because) the area is equal to 𝐹𝐹 ∆𝑥𝑥                 3
  >                                                                                                                                             2
- Guidance notes: breaking stress (material property) constant for same material → tension scales with A; area under graph = elastic strain energy = work done to stretch.

## 2026-Jun-01A (P87903A)

Materials questions found: Q5, Q6, Q8, Q9 (MCQs), Q15, Q19. Central flags Q2 (unit of acceleration), Q4 (v–t resultant force), Q7 (wind resultant force) are Topic 1; Q11 (speed vs velocity) and Q14 (bouncing ball) are Topic 1 — excluded; it missed Q5, Q6, Q9, Q15, Q19.

### Q5 (1 mark) — MCQ (with Q6, shared graph)
- Scenario: Linear force-extension graph for a spring, 5 N at 4 m.
- Asked: Which gives stiffness?
- MS verbatim:
  > 5         The only correct answer is B (
  >                                            5N
  >                                                 )                                               1
  >                                            4m
  >           A is not correct because stiffness = force / extension
  >           C is not correct because stiffness = force / extension
  >           D is not correct because stiffness = force / extension
- Guidance notes: stiffness k = gradient = F/x, not ½Fx.

### Q6 (1 mark) — MCQ (same graph as Q5)
- Asked: Which gives energy stored with 5 N applied?
- MS verbatim:
  > 6         The only correct answer is D (0.5 × 5 N × 4 m)                                        1
  >           A is not correct because energy stored is the area under the graph
  >           B is not correct because energy stored is the area under the graph
  >           C is not correct because energy stored is the area under the graph
- Guidance notes: contrast with Q5 — energy = area = ½Fx; stiffness = F/x. Pair is a ready-made exam-technique point.

### Q8 (1 mark) — MCQ
- Scenario/Asked: Condition required for Stokes' law to apply to a falling object.
- MS verbatim:
  > 8         The only correct answer is D (The falling object should move with laminar flow)       1
  >           A is not correct because the object should be spherical
  >           B is not correct because Stokes' law would apply in any fluid
  >           C is not correct because the object should be moving slowly
- Guidance notes: "any fluid" (not only liquids) is examinable; speed must be low (laminar).

### Q9 (1 mark) — MCQ
- Scenario: Two springs each of stiffness k arranged side by side (parallel), same load.
- Asked: Stiffness of combined system?
- MS verbatim:
  > 9    The only correct answer is A (2k)                                               1
  >      B is not correct because springs in parallel are stiffer than by themselves
  >      C is not correct because springs in parallel are stiffer than by themselves
  >      D is not correct because the spring constants would add together not multiply
- Guidance notes: parallel springs add: k_total = k1 + k2 = 2k.

### Q15 (12 marks) — starred, stress-strain graphs of a biscuit bar and a toffee bar
- Scenario: Two stress-strain curves drawn on one axis (biscuit: rises to a peak then breaks; toffee: rises, gradient falls, stress falls after a maximum).
- Asked: (a) Compare and contrast the graphs (4). (b) Meaning of elastic deformation (1). (c)(i) How to measure extension for a range of masses with suitable equipment (3). (c)(ii) Determine Young modulus from force-extension graph; A = 1.27×10⁻⁴ m², initial length 15.5 cm (4).
- MS verbatim:
  > 15(a)    Any four from:
  >                •   Initial gradient is the same for both graphs                (1) Allow at low strain, stress is similar for both bars
  >                                                                                   Allow the Young modulus is similar
  >                •   As the strain increases, the gradient of both graphs        (1)
  >                    decreases
  >                •   As the strain increases the gradient of the toffee graph
  >                    decreases more than that of the biscuit graph
  >                    Or As the strain increases, For a given stress, the
  >                    strain of the toffee bar is greater                         (1)
  >                •   Both have the same/similar breaking stress                  (1) Allow ultimate tensile stress/strength for breaking stress
  >                •   Biscuit breaks at a lower strain than toffee bar            (1)
  >                •   Toffee stress decreases with strain after a certain point       Allow for the toffee bar, the gradient becomes negative after a certain
  >                    (but biscuit stress only increases with strain.)            (1) point / stress / strain
  >                •   Area under the toffee bar graph (at breaking point) is
  >                    greater than the area under the biscuit bar graph (at       (1)
  >                    breaking point)
  > 15(b)      Material returns to original shape/size/length when
  >            stress/force/tension removed                                        (1)                                                                            1
  > 15(c)(i)   Use a metre rule                                                    (1) Allow use vernier/digital callipers
  >            Or Use a vernier scale
  >                                                                                   Allow measure initial reading and reading with mass added
  >            measure initial length and extended length (with mass added)        (1) Do not accept measure the extension
  >                                                                                   Allow calculate the difference between the initial and extended
  >            subtract the original length from the extended length               (1) readings                                                                   3
  > 15(c)(ii)  Corresponding pair of values of force and extension from            Example of calculation
  >            graph                                                      (1)             4.0 N
  >                                                                             𝜎𝜎 =                 = 31 500 Pa
  >                          𝐹𝐹        ∆𝑥𝑥
  >            Use of 𝜎𝜎 = and 𝜀𝜃 =
  >                        𝐴𝐴           𝑥𝑥                                             0.10 m
  >            Or                                                               𝜀𝜀 =           = 0.645
  >            Calculates gradient                                                     0.155 m
  >                                                                       (1)
  >                          𝜎𝜎                                                        31 500 Pa
  >            Use of 𝐸𝐸 =                                                      𝐸𝐸 =             = 48 800 Pa
  >                          𝜀𝜀                                           (1)            0.645
  >            Young modulus = 4.9 × 104 Pa
  >            (allow answers in the range 4.7 × 104 Pa to 5.1 × 104 )    (1)                                      4
- Guidance notes: "Any four from" list for (a); "Allow ultimate tensile stress/strength for breaking stress"; (c)(i) "Do not accept measure the extension"; (c)(ii) accepted range given for E.

### Q19 (8 marks) — iceberg flotation (upthrust/density)
- Scenario: Iceberg floats in seawater; claim: 70% of its mass below the surface; ρ(ice) = 917 kg m⁻³, ρ(seawater) = 1025 kg m⁻³. (b) Seawater density decreases slightly; iceberg does not melt.
- Asked: (a) Deduce whether the claim is correct (5). (b) Explain what happens to the submerged volume (3).
- MS verbatim:
  > 19a        Use of Σ𝐹𝐹 = 0 (i.e. upthrust = weight of iceberg)                      (1) Example of calculation
  >                         𝑚𝑚
  >            Use of 𝜌𝜌 =                                                             (1) (At equilibrium,) upthrust = weight of iceberg
  >                         𝑉𝑉
  >            Use of W = mg                                                           (1) weight of displaced seawater = weight of iceberg
  >            Volume of water displaced is 0.89 × volume of iceberg                   (1) 𝜌𝜌seawater × 𝑉𝑉displaed × 𝑔𝑔 = 𝜌𝜌ice × 𝑉𝑉ice × 𝑔𝑔
  >            Comparison of calculated value with 70% and consistent conclusion       (1)   𝑉𝑉displaed       𝜌𝜌ice   917 kg m−3                5
  >                                                                                                    =           =            = 0.89
  >                                                                                            𝑉𝑉ice     𝜌𝜌seawater 1025 kg m−3
  >                                                                                         89 % ≠ 70% so not true
  > 19b        Weight of iceberg is constant                                                 Allow weight is constant
  >            Or                                                                            Ignore mass (of iceberg) is constant
  >            Weight of seawater displaced is constant
  >            Or
  >            Upthrust is constant                                                    (1)
  >            Weight of iceberg = weight of seawater displaced
  >            Or
  >            Upthrust = weight of seawater displaced
  >            Or
  >            Upthrust ∝ volume of seawater displaced                                 (1)
  >            There is an increase in the volume (of the iceberg under the surface,         Allow the volume of liquid displaced increases
  >            because density of seawater decreases) (Dependent on MP2)               (1)                                                      3
- Guidance notes: fraction submerged = ρ(ice)/ρ(fluid); final mark dependent on MP2; "Ignore mass (of iceberg) is constant".

## Cross-session observations (2025-Oct-01A → 2026-Jun-01A)

### Recurring set-ups (scenario bank)
- Stokes' law conditions, asked 4/5 sessions: 2025-Oct-01A Q13(a) "State one other condition" (1); 2026-Jan Q15(a) "State the conditions" (2); 2026-Jan-01A Q14(a) "State the conditions" (2); 2026-Jun Q17(a) "Give one other condition" (1); plus MCQs 2026-Jun-01A Q8 and (implicitly) the accept-list everywhere. Expected answer is always: small/spherical object, low speed, laminar flow.
- Stokes' law calculation: 2025-Oct-01A Q13(b) (assess validity by comparing W−U with 6πηrv), 2026-Jan Q15(b) (drag from constant velocity), 2026-Jan-01A Q14(b) (resultant force = driving force − drag; then max speed when drag = driving force). Always uses r = d/2 when a diameter is given.
- Terminal velocity in a fluid: 2025-Oct-01A Q14 (v–t graphs vacuum vs oil, *-question), 2026-Jan Q15(c) (drag = weight − upthrust at terminal velocity), 2026-Jun Q17(b) (bubble, upthrust r³ vs drag r, *-question). Terminal velocity in AIR appears once (2026-Jun Q18(b), borderline) with the same "drag rises until resultant force zero" logic and MS even allows upthrust.
- Upthrust/flotation with densities: 2025-Oct-01A Q19 (sphere on balance, displaced water), 2026-Jan Q15(c) (displaced paint), 2026-Jan-01A Q15 (Galilean thermometer, *-question), 2026-Jun-01A Q19 (iceberg, fraction submerged = ρice/ρfluid). Core relation quoted in MS: "Upthrust equals weight of liquid displaced" / "weight of displaced seawater = weight of iceberg".
- Density ρ = m/V applications: MCQs 2026-Jan-01A Q5 (via weight), 2026-Jun Q9 (wire diameter), and inside 2025-Oct-01A Q16(a) (mass flow of seawater — borderline) and 2026-Jan Q15(c) / 2025-Oct-01A Q19(b)(ii).
- Hooke's law / stiffness: MCQs 2025-Oct-01A Q2, 2026-Jun-01A Q5, Q9 (parallel 2k); calculations 2026-Jan Q19(b)(i) (4 springs share load → force per spring = W/4), 2026-Jun Q12 (kΔx then ½FΔx), 2026-Jan-01A Q12(b)(i) (gradient of linear section only).
- Springs in series/parallel strain energy: 2026-Jan-01A Q8 MCQ (series 2E, parallel ½E for the same end-to-end force... as printed: "P: 2E; Q: ½ E").
- Young modulus calculations, 5 instances: 2025-Oct-01A Q15 (gradient of m–Δx × g × L/A), 2026-Jan-01A Q12 (via k = EA/x), 2026-Jan Q16(c) (σ/ε, deduce material), 2026-Jun Q19(b) (σ/ε with πr²), 2026-Jun-01A Q15(c)(ii) (σ/ε from graph pairs). Standard MS chain verbatim: "Use of 𝜎𝜎 = 𝐹𝐹/𝐴𝐴" … "Use of 𝜀𝜀 = ∆𝑥𝑥/𝑥𝑥" … "Use of 𝐸𝐸 = 𝜎𝜎/𝜀𝜀".
- Stress-strain graph interpretation: 2026-Jan-01A Q3 MCQ (yield point), 2026-Jun Q3 MCQ (elastic limit), 2026-Jun-01A Q15(a) compare/contrast (initial gradient = E, breaking stress/UTS, area = energy).
- Elastic strain energy / area under F–x graph: 2025-Oct-01A Q7 MCQ, 2026-Jan Q9 MCQ (change when additional force applied — trapezium), 2026-Jun Q12, 2026-Jun Q19(c) ("Represents the elastic strain energy stored … which is work done to stretch … the area is the mean force multiplied by the extension"), 2026-Jun-01A Q19(b)(iii) (∆Eel = ½F∆x), 2026-Jan Q19(a) (energy stored > work done by person because gravity also does work).
- Core Practical 2 (falling-ball): no full CP2 write-up appeared; Stokes' condition/calculation questions above are the CP2-adjacent set (2026-Jan Q15 uses a ball bearing in paint, the classic CP2 fluid).
- Core Practical 3 (Young modulus wire): 2025-Oct-01A Q15 is a direct CP3-style item; 2026-Jan Q16(b) tests CP3 practical detail (taut string before measuring x; percentage uncertainty reduction); 2026-Jan-01A Q12 gives k = EA/x explicitly, so candidates must connect stiffness to E.

### Exact recurring MS wordings (seen more than once)
- "Laminar flow" with "Allow an absence of turbulent flow" — 2026-Jan Q15(a), 2026-Jan-01A Q14(a), 2026-Jun Q17(a).
- "Small, spherical object / Or Spherical object with low speed" — 2026-Jan Q15(a), 2026-Jan-01A Q14(a).
- "Use of F = 6πηrv" (printed variously as "Use of 𝐹𝐹 = 6π𝜂𝜂𝜂𝜂𝜂𝜂") — 2025-Oct-01A Q13(b), 2026-Jan Q15(b), 2026-Jan-01A Q14(b)(i)/(ii).
- "Use of 𝜎𝜎 = 𝐹𝐹/𝐴𝐴" and "Use of 𝜀𝜀 = ∆𝑥𝑥/𝑥𝑥" and "Use of 𝐸𝐸 = 𝜎𝜎/𝜀𝜀" — 2025-Oct-01A Q15(b)(ii), 2026-Jan Q16(c), 2026-Jan-01A Q19(b)(i), 2026-Jun Q19(b), 2026-Jun-01A Q15(c)(ii).
- "Use of ∆𝐹𝐹 = 𝑘𝑘∆𝑥𝑥" — 2026-Jan Q19(b)(i)(ii), 2026-Jun Q12, 2026-Jan-01A Q12(b)(i)(ii), 2026-Jan-01A Q19(b)(ii).
- "Use of ∆𝐸𝐸el = ½ 𝐹𝐹∆𝑥𝑥" (i.e. ΔEel = ½FΔx) — 2026-Jan Q19(b)(ii), 2026-Jun Q12, 2026-Jun-01A Q19(b)(iii).
- "Use of 𝜌𝜌 = 𝑚𝑚/𝑉𝑉" — 2025-Oct-01A Q16(a) and Q19(b)(ii), 2026-Jan Q15(c), 2026-Jan-01A Q5 (implicitly), 2026-Jun-01A Q19(a).
- "Comparison of calculated value with … and consistent conclusion" — the standard final mark of every "assess/deduce" item: 2025-Oct-01A Q13(b), 2026-Jan-01A Q12(a), 2026-Jun-01A Q19(a), 2026-Jun Q13(b) (mechanics but same formula).
- "(dependent on MP1)" / "MP2 dependent on MP1" / "Dependent on MP1 or MP2" — appears in 2025-Oct-01A Q19(a)(b)(iii), 2026-Jan Q19(a), 2026-Jan-01A Q12(b)(i), 2026-Jun Q19(a), 2026-Jun-01A Q19(b).
- "(ecf from …)" — e.g. "(ecf from (b)(i))" 2025-Oct-01A Q15(b)(ii), "(ecf from 19(b)(ii) and 19(b)(i))" 2026-Jan-01A Q19(b)(iii), "(ecf from (a)(i))" several.
- "(to at least N significant figures)" attached to show-that final answers — 2025-Oct-01A Q16(a) (3 s.f.), 2026-Jan-01A Q12(b)(i) (3 s.f.), Q19(b)(i) (3 s.f.), 2026-Jun Q18(a)(i) (3 s.f.), 2026-Jan Q19(b)(i) (2 s.f. for k).
- "(show that value gives X)" — printed next to final answers when ecf used the candidate's own value: 2026-Jan Q19(b)(ii), 2026-Jan-01A Q19(b)(ii)/(iii), 2026-Jun-01A Q16(a) (mechanics).
- "Allow ultimate tensile stress/strength for breaking stress" — 2026-Jun-01A Q15(a).

### Mark-scheme conventions observed (2025-Oct-01A → 2026-Jun-01A)
- Format: rows per question part with columns "Question Number | Answer | Additional Guidance | Mark"; each mark point ends "(1)". Section A MCQs get "The only correct answer is X (...)" plus one reason line per wrong option.
- MCQ distractor phrasing changed between papers: 2025-Oct-01A / 2026-Jan / 2026-Jun / 2026-Jun-01A use "… is not correct because …"; 2026-Jan-01A uses "… is incorrect because …". Same meaning.
- "Use of [equation]" marks the substitution mark; a separate "(1)" for the answer; "Calculates/Calculates gradient/Determines" marks reading or computing.
- Dependent marks are explicit: "MP2 dependent on MP1", "(dependent on MP1 or MP2)", "(Dependent on MP2)". Conclusions in assess/deduce questions are typically the dependent mark.
- Alternative answers separated by "Or"; full alternative methods by "OR" blocks (e.g. two routes in 2026-Jan-01A Q19(a), 2026-Jun Q14(a) mechanics).
- "Allow" gives acceptable alternatives ("Allow so the string is under tension", "Allow use vernier/digital callipers", "Allow air resistance for drag throughout", "Allow weight is constant"); "Do not accept" marks hard exclusions ("Do not accept measure the extension", 2026-Jun Q18(a)(iii) "Do not accept a line that curves back towards the cliff"); "Ignore" marks tolerated noise ("Ignore small sphere", "Ignore forces become balanced", "Ignore decreases percentage uncertainty", "Ignore mass (of iceberg) is constant").
- ecf chains both within a question and across parts: "(ecf from (b)(i))", "(ecf from 19(b)(ii) and 19(b)(i))"; also "(allow answers in the range …)" for graph-read values (2026-Jun-01A Q15(c)(ii): "allow answers in the range 4.7 × 104 Pa to 5.1 × 104").
- Show-that rules: final value "to at least N significant figures"; reverse working capped ("If a 'show that' question is worth 2 marks, then both marks will be available for a reverse working. If the question is worth 3 marks then only 2 marks will be available." — printed in the 2026-Jun / 2026-Jun-01A "Mark scheme notes").
- Units: "A separate mark is not usually given for a unit but a missing or incorrect unit will normally mean that the final calculation mark will not be awarded"; no unit error where units given in the question. g = 10 penalised once: "The use of g = 10 m s−2 or 10 N kg−1 instead of 9.81 m s−2 or 9.81 N kg−1 will be penalised by one mark (but not more than once per clip). Accept 9.8 m s−2 or 9.8 N kg−1" (2026-Jun and 2026-Jun-01A MS notes; 2026-Jan/2026-Jan-01A MS lack the printed notes but use g = 9.81 in examples).
- Starred (*6-mark) questions: 6 IC points, IC marks capped (6 IC → 4 marks … 2 IC → 2), a "linkage" mark cap (2), and a structure/reasoning award (2/1/0): identical grid printed in 2025-Oct-01A Q14, 2026-Jan Q17(b) (mechanics), 2026-Jan-01A Q15, 2026-Jun Q17(b), 2026-Jun-01A Q16(b) (mechanics). Materials *-questions in this window are always multi-force explanations (vacuum vs oil; Galilean thermometer; rising bubble).
- Anomaly noted: 2025-Oct-01A MS footer prints "TOTAL FOR PAPER = 120 MARKS" while the QP prints 80 — a typo in that MS document; totals elsewhere match the QP.
- Note on central-scan reliability: for all five sessions the central keyword scan's question numbers/mark tallies were partially misaligned with the printed papers (off-by-one on 2026-Jan-01A MCQs; several false positives on Topic-1 questions: 2025-Oct-01A Q1/Q6/Q12/Q18, 2026-Jan Q7/Q14/Q18, 2026-Jan-01A Q11/Q13, 2026-Jun Q2/Q8/Q11/Q16, 2026-Jun-01A Q2/Q4/Q7/Q11/Q14) and missed these real Materials items: 2025-Oct-01A Q2/Q7/Q15/Q19, 2026-Jan Q8/Q9/Q16/Q19, 2026-Jan-01A Q3/Q5/Q9/Q12/Q19, 2026-Jun Q1/Q3/Q9/Q12/Q19, 2026-Jun-01A Q5/Q6/Q9/Q15/Q19. Future scans should trust printed question numbers and "(Total for Question N = X marks)" boundaries.
