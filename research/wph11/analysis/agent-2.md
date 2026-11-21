# WPH11 Topic 2 analysis — agent 2 (2021-Jan → 2022-Jun)

Sessions: 2021-Jan (WPH11_01_2101), 2021-Jun (WPH11_01_2106), 2021-Oct (WPH11_01_2110), 2022-Jan (WPH11_01_2201), 2022-Jun (WPH11_01_2206).

Note on verbatim quotes: the pdftotext -layout extraction renders bold/italic glyphs as doubled characters (e.g. `∆𝐹𝐹 = 𝑘𝑘∆𝑥𝑥` for ΔF = kΔx, `𝜌𝜌` for ρ) and occasionally glues words together (`storedenergy`). In the quotes below I normalise only those glyph artifacts to single characters; all other wording, "(1)" markers, "Or", "allow", "ecf", "[...]" notes are copied exactly as printed in the MS txt files.

Note on question numbering: the numbering below is taken directly from the QP txt files. The central keyword hints used a shifted numbering for several sessions (e.g. hints "2021-Jan Q4/Q6/Q15/Q16/Q17" correspond to actual Q5/Q7/Q15/Q16/Q18; hints "2021-Oct Q11/Q13/Q14/Q16" correspond to actual Q14/Q14(c)/Q17 etc.); all were re-verified against the papers.

---

## 2021-Jan

### Q5 (1 mark) — MCQ
- Scenario: A student is investigating a material in the form of a wire.
- Asked: Which property of the wire will change if a longer wire is used? (A breaking stress, B density, C stiffness, D Young modulus)
- MS verbatim:
  > 5          C is the correct answer                                                                   (1)
  > A is incorrect because breaking stress is material property independent of dimensions
  > B is incorrect because density is material property independent of dimensions
  > D is incorrect because Young modulus is material property independent of dimensions
- Guidance notes: answer C (stiffness k = F/Δx depends on length); the distractor reasoning repeats the phrase "material property independent of dimensions" for A/B/D.

### Q7 (1 mark) — MCQ
- Scenario: A student determines the terminal velocity of a ball bearing as it falls through oil. He releases the ball bearing at point V and measures the time taken to fall a measured distance (points V, W, X, Y, Z marked on the tube).
- Asked: Which two points should he use for the measured distance? (A V and Y, B W and Y, C X and Y, D W and Z)
- MS verbatim:
  > 7          C is the correct answer                                                                   (1)
  > A is incorrect because the ball bearing is not in the oil at V
  > B is incorrect because the ball bearing has not reached terminal velocity at W
  > D is incorrect because the ball bearing has not reached terminal velocity at W
- Guidance notes: answer C — distance must be measured between two points after terminal velocity is reached (Core Practical 2 style).

### Q8 (1 mark) — MCQ — BORDERLINE
- Scenario: "Which of the following is a vector quantity? A density, B kinetic energy, C momentum, D viscosity"
- Asked: identify the vector quantity.
- Reason for BORDERLINE: centres on vector/scalar classification (general skills), but density and viscosity are the tested distractors, so it touches Materials vocabulary.
- MS verbatim:
  > 8          C is the correct answer                                                                   (1)
  > A is incorrect because density is not a vector
  > B is incorrect because kinetic energy is not a vector
  > D is incorrect because viscosity is not a vector
- Guidance notes: answer C (momentum).

### Q14(a)(i) (4-mark part of an 11-mark question) — BORDERLINE (density used inside a momentum/fireboat question)
- Scenario: Fireboat pump projects seawater at high speed out of a pipe; mass of seawater pumped each second is 300 kg, pipe diameter 10.0 cm, density of seawater = 1030 kg m−3.
- Asked (a)(i): "Show that the speed at which the seawater is projected from the pipe is about 37 m s−1." (Rest of Q14 — momentum rate, Newton 3, forces on boat — is Topic 1.)
- MS verbatim:
  > 14(a)(i)                        m                                                                  (1)
  >                 •   Use of ρ =                                                                       (1)
  >                                   V
  >                 •   Use of A = πr 2
  >                 •   Use of volume in 1 second = cross section area × speed                            (1)
  >                 •   Speed = 37.1 (m s−1)                                                              (1)    4
  > Example of calculation
  > V/t = 300 kg s −1 / 1030 kg m−3 = 0.291 m3 s−1
  > A = π × 0.052 = 7.85 × 10-3 m2
  > Speed = 0.291 m3 s−1/ 7.85 × 10-3 m2 = 37.1 m s−1
- Guidance notes: chain of "Use of" marks; density → volume flow rate → pipe cross-section → speed. Downstream parts carry "(ecf from (a)(i))" (e.g. 14(a)(ii) "Rate of change of momentum = 1.1 × 104 kg m s−2 (ecf from (a)(i))").

### Q15 (6 marks) — starred (bungee jump, elastic cord) — BORDERLINE (included but flagged)
- Scenario: Bungee jumper falls attached to an elastic cord; fall divided into Stage 1 (free fall until cord starts to stretch), Stage 2 (cord stretching until acceleration decreases to zero), Stage 3 (cord continues to stretch until momentarily at rest).
- Asked: "Explain, in terms of work done, how the kinetic energy of the bungee jumper changes during the three stages of the fall." (6)
- Reason for BORDERLINE: the question is answered purely with work-energy reasoning; no kΔx calculation or spring-stiffness reasoning appears, so under the strict boundary rule it would be excluded — but the cord/strain-energy concept is in scope, so it is flagged for the user to decide.
- MS verbatim (indicative content):
  > •       In stage 1 the kinetic energy of the jumper is increasing
  > •       Because work is done by gravitational force
  > •       In stage 2 the kinetic energy of the jumper is increasing but at a decreasing rate
  > •       Because work is done on the cord (as the cord stretches) (as well as increasing k.e.)
  > •       In stage 3 the kinetic energy of the jumper is decreasing
  > •       Because work is done on the cord at a greater rate than the gravitational force does
  >         work on the jumper
  >         Or
  >         He comes to rest because the total work done by gravitational forces is equal to
  >         work done stretching the bungee
- Guidance notes: marked with an asterisk ("This question assesses a student's ability to show a coherent and logically structured answer with linkages and fully-sustained reasoning"); IC points table: "6 or more = IC 4, Max linkage 2, Max final 6"; "Answer shows a coherent and logical structure with linkages and fully sustained lines of reasoning demonstrated throughout. (2)".

### Q16 (15 marks) — structured (titanium alloy stress-strain)
- Scenario: "A steadily increasing tensile force was applied to a sample of a titanium alloy. The sample had an original length of 40.0 cm and diameter of 5.05 mm." Graph of stress (MPa, 0–1400) against strain (0–0.05) with breaking point B at about (0.05, 1280 MPa).
- Asked: (a) "State a suitable measuring instrument to measure the diameter of the sample." (1); (b)(i) "Determine the Young modulus of the sample." (3); (b)(ii) "The sample broke at point B. Determine the force required to break the sample." (4); (b)(iii) "Show that the area under this graph represents the work done per unit volume in stretching the sample." (3); (b)(iv) "The area under any stress-strain graph represents the work done per unit volume. Estimate the amount of work required to break the titanium alloy sample." (4)
- MS verbatim:
  > 16(a)            •   Micrometer (screw gauge) Or digital (not Vernier) calliper(s)             (1)    1
  > 16(b)(i)
  >                  •   Attempt to calculate gradient
  >                                                                                                 (1)
  >                  •   Use of linear section, or tangent at origin, with use of large triangle   (1)
  >                  •   E = 1.2 ± 0.05 × 1011 Pa                                                  (1)    3
  > Example of calculation
  > Extending straight section to 1%
  > 120 × 106 Pa ÷ 0.01 = 1.2 × 1011 Pa
  > 16(b)(ii)
  >                  •   Breaking stress read from graph
  >                                                                                                 (1)
  >                  •   Use of A = πr 2
  >                                                                                                 (1)
  >                  •   Use of σ = F/A
  >                                                                                  (1)
  >                  •   F = 2.6 × 104 N                                                           (1)    4
  > Example of calculation
  > Area = π × (2.525 × 10−3)2 = 2.00 × 10−5 m2
  > Force = 1 280 × 106 × 2 ×10– 5 = 2.56 × 104 N
  > 16(b)(iii)                                                                                     (1)
  >                  •   Use of area under graph = ½σε
  >                  •   Substitution of F = σA and Δx = εx                                        (1)
  >                                                                                                 (1)    3
  >                  •   Substitution of Ax = V and ΔW = ½ FΔx
  > Example of calculation
  > Area = ½σε
  > = ½ (F / A)( Δx / x )
  > = ½ F Δx / (A x)
  > = ΔW / V
  > 16(b)(iv)
  >                  •   Calculation of area under graph by a valid method.
  >                                                                                                 (1)
  >                  •   Area in range 60 to 64 (MJ m−3)                                           (1)
  >                  •   Calculation of volume of sample                                           (1)
  >                  •   Energy = 500±20 J                                                         (1)    4
  > Example of calculation
  > One large square = 200 × 106 × 0.01 = 2 × 106 J m–3
  > 31 large squares
  > Volume of sample = 0.40 m × 2.0 × 10−5 m2 = 8.0 × 10−6 m3
  > Work = 31 × 8 × 10–6 m3× 2 × 106 J m−3= 4.96 × 102 J
- Guidance notes: (b)(i) gradient must use the linear section or tangent at origin with a large triangle; (b)(iv) is an "estimate" — square counting accepted, range 60–64 MJ m−3, final energy range 500±20 J; (b)(iii) is a "show that" worth 3 marks (reverse working limited to 2 per general instructions).

### Q17 (8 marks) — structured (force meter / Hooke's law)
- Scenario: Force meter contains a spring; "The force meter allows force to be measured by means of Hooke's law." Force F applied at angle θ to a horizontal string attached to a mass m hanging over a stand; P is the reading on the force meter. Diagram: spring in force meter, string at angle θ to horizontal, mass m.
- Asked: (a) "When the force applied to stretch the spring is 15 N the extension of the spring is 8.0 cm. Show that the stiffness of the spring is about 2 N cm−1." (2); (b) "When m is equal to 0.55 kg, the value of P is 8.5 N. Calculate the value of θ, and the extension of the spring in the force meter." (6)
- MS verbatim:
  > 17(a)
  >                •   Use of ∆F = k∆x
  >                                                                                 (1)
  >                •   k = 1.9 (N cm−1)                                             (1)    2
  > Example of calculation:
  > k = 15 N ÷ 8 cm = 1.875 N cm−1
  > 17(b)
  >               •    Use of w = mg
  >                                                                                (1)
  >               •    Use of force triangle and Pythagoras to find F
  >                    Or F resolved into components                                (1)
  >               •    Use of trigonometry to find θ.                               (1)
  >                                 ∆F
  >               •    Use of ∆x =                                                 (1)
  >                                k
  >               •    Δx = 5.4 cm (ecf from (a), "show that" value gives 5.0 cm)   (1)
  >               •    θ = 32° (ecf from (a))                                       (1)    6
  > Example of calculation:
  > θ = tan−1(0.55 kg × 9.81 N kg−1 ÷ 8.5 N) = 32.4°
  > Δx = √((0.55 × 9.81)2 + 8.52) ÷ 1.88 = 5.37 cm
- Guidance notes: the tension in the string equals the spring force (magnitude of the vector sum), so Δx = F/k where F = √((mg)² + P²); ecf allowed from (a) for both θ and Δx; note the MS shows the reverse of the printed "show that" value giving 5.0 cm.

### Q18 (11 marks) — structured (polystyrene bead rising through oil: upthrust + Stokes)
- Scenario: "A spherical polystyrene bead is immersed in oil. The bead has diameter 4.00 × 10−3 m. The bead is released and moves upwards through the oil at a constant velocity." Free-body diagram given with only "upthrust" shown.
- Asked: (a) "Complete the free body force diagram below to show all the forces acting on the polystyrene bead." (2); (b) "Show that the upthrust the oil exerts on the bead is about 3.1 × 10−4 N. density of oil = 930 kg m−3" (3); (c)(i) "Stokes' law is only valid if the bead is moving sufficiently slowly through the oil. State the reason for this condition." (1); (c)(ii) "For Stokes' law to be valid the speed of the bead through the oil must be less than vR, where vR = 10 × viscosity of oil / (density of oil × diameter of the bead). Deduce whether Stokes' law can be applied to this bead. viscosity of oil = 4.90 × 10−2 Pa s; weight of polystyrene bead = 1.05 × 10−5 N" (5)
- MS verbatim:
  > 18(a)       • Weight Or W, downwards
  >                 •    Drag Or D, downwards                                                   (1)
  >                                                                                             (1)    2
  > 18(b)                           4
  >                 •   Use of V = πr 3                                                       (1)
  >                                 3
  >                                m
  >                 •   Use of ρ = and W = mg
  >                                V
  >                                                                                             (1)
  >                 •   Upthrust = 3.06 × 10−4 (N)
  >                                                                                             (1)    3
  > Example of calculation
  > Volume of bead = 4/3 × π × (2.00 × 10−3 m)3 = 3.35 × 10−8 m3
  > Weight of displaced fluid = 930 kg m−3 × 3.35 × 10-8 m3 × 9.81 N kg−1
  > = 3.06 × 10−4 N
  > 18(c)(i)
  >                 •   The flow must be laminar                                                (1)    1
  >                     Or There must be no turbulent flow
  > 18(c)(ii)       •   States D = U – W
  >                                                                                             (1)
  >                 •   Use of F = 6πηrv
  >                                                                                             (1)
  >                 •   v = 0.16 (m s−1)                                                        (1)
  >                 •   Calculate vR = 0.13 (m s−1)                                             (1)
  >                 •   Comparison of v with vR and correct conclusion (ecf from (b))           (1)    5
  >                     Alternative method of comparison of F(0.13) with D scores full marks.
  > Example of calculation
  > U − W =3.06 × 10−4 − 1.05 × 10−5 = 2.96 × 10−4 N
  > v = 2.96 × 10−4 N / (6π × 4.9 × 10−2 Pa s × 2.0 × 10−3 m) = 1.60 × 10-1 m s−1
  > vR = 10 × 4.9 × 10−2 Pa s / (930 kg m−3 × 4.0 × 10−3 m)= 1.32× 10−1 m s−1
- Guidance notes: bead moves UP so drag is drawn downwards (opposite to motion); upthrust = weight of displaced oil; the "deduce whether" mark requires an explicit comparison plus a conclusion, ecf from (b); alternative route (comparing the Stokes drag at vR with D) is credited in full.

### Excluded 2021-Jan questions (Topic 1 only)
- Q4 (falling ball bearing, s–t graph for gradient g) — mechanics, no fluid.
- Q14(b)(c) (momentum/Newton 3 on fireboat), Q1–Q3, Q6, Q9–Q13, Q18-free — mechanics.
- Q15 bungee is flagged BORDERLINE above.

---

## 2021-Jun

### Q2 (1 mark) — MCQ (density)
- Scenario: "A cylinder of aluminium has a weight of 35.0 N and a volume of 1.32 × 10−3 m3. Which of the following calculations gives the density of aluminium in kg m−3?"
- MS verbatim:
  > 2          C is the correct answer                                                                   (1)
  >            A is incorrect because it give units of m3 kg−1
  >            B is incorrect because it give units of m3 kg N−2
  >            D is incorrect because it give units of N2 kg−1 m−3
- Guidance notes: answer C = 35.0/(9.81 × 1.32 × 10−3); wrong options are eliminated by units analysis ("it give units of ..." is as printed).

### Q5 (1 mark) — MCQ (Young modulus, compression)
- Scenario: "A compressive force F is applied to an object made of a material with Young modulus E. The original length of the object in the direction of the force is x, and its cross-sectional area is A. Which expression gives the length of the object after the force is applied?"
- MS verbatim:
  > 5          D is the correct answer                                                                   (1)
  >            A is incorrect because the units are inconsistent
  >            B is incorrect because it gives a greater length, and F is a compressive force
  >            C is incorrect because the units are inconsistent
- Guidance notes: answer D = x − Fx/(AE); compression shortens; unit analysis used to reject A/C.

### Q9 (1 mark) — MCQ (stress-strain graph, point X)
- Scenario: Copper rod under tensile stress; graph of tensile stress against tensile strain with point X marked where the curve flattens after the initial rise.
- Asked: "What does point X represent? (A the fracture point of the rod, B the limit of proportionality for copper, C the maximum tensile stress in the rod, D the yield point of copper)"
- MS verbatim:
  > 9          D is the correct answer                                                                   (1)
  >            A is incorrect because the fracture point is at the extreme end of the graph
  >            B is incorrect because proportionality ends before point X is reached
  >            C is incorrect because point X is not the highest point reached by the graph
- Guidance notes: answer D (yield point).

### Q13 (9 marks) — structured (submarine upthrust / flotation)
- Scenario: Submarine below the surface of the sea; volume 5.83 × 103 m3; density of seawater 1.03 × 103 kg m−3.
- Asked: (a)(i) "Calculate the upthrust exerted on the submarine by the seawater." (2); (a)(ii) "Explain why the mass of the submarine must be 6.0 × 106 kg." (2); (b)(i) "The submarine now moves into a region of the sea where the water is less salty, and the density of the water reduces to 1.01 × 103 kg m−3. Explain what would happen to the submarine as it moves into this region of lower density seawater." (3); (b)(ii) "The submarine alters its weight by pumping water in or out of its internal tanks. Determine the mass of water that the submarine should pump, in or out of its tanks, to maintain its depth below the surface of the sea." (2)
- MS verbatim:
  > 13(a)(i)
  >             Use of ρ=m / V (and U = mg)                                                   (1)
  >             U = 5.9 × 107 N                                                               (1)      2
  > Example of calculation
  > U = ρ g V = 1.03 × 103 kg m-3× 9.81 N kg-1× 5.83 × 103 m3 = 5.89× 107 N
  > 13(a)(ii)
  >             Weight of submarine is equal to the upthrust.                                 (1)
  >             Refers to W = m g to justify a mass of 6.00 × 106 kg
  >             Or
  >             Refers to mass calculated in (a)(i) to justify a mass of 6.00 × 106 kg        (1)      2
  > 13(b)(i)
  >             The upthrust (of the water on the submarine) is less than the weight of the   (1)
  >             submarine
  >             A resultant force acts (downwards) on the submarine                           (1)
  >             So the submarine will (begin to) sink (dependent on MP1)                      (1)      3
  > 13(b)(ii)
  >             Use of ρ = m/V and W = mg to calculate new upthrust                           (1)
  >             Mass of water = 1 × 105 kg (pumped out) (allow ecf from (a)(i))               (1)      2
- Guidance notes: flotation logic chain U < W → resultant force → sink, with MP3 explicitly "(dependent on MP1)"; ecf from (a)(i) into (b)(ii); answer "pumped out".

### Q17 (12 marks) — structured (pulley system with nylon rope: stiffness, extension, strain energy)
- Scenario: Pulley system lifts a 5.00 kN load through 1.50 m; one fixed pulley and one moving pulley connected by a nylon rope. "The properties of the nylon rope are: Young modulus of nylon 2.70 GPa; overall length of rope before adding the load 6.00 m; area of cross-section 3.00 × 10−4 m2." Weight of pulleys/rope ignored, no friction.
- Asked: (a) "The greater the length of a rope, the smaller the stiffness of the rope. Explain why." (2); (b)(i) "Show that the stiffness k of the nylon rope is about 1.4 × 105 N m−1." (3); (b)(ii) "The pulley system lifts the 5.00 kN weight at a steady rate. Determine the extension of the rope while the lift is taking place." (3); (b)(iii) "Calculate the work done in stretching the rope." (2); (c) "Assess whether the stretching of the rope has a significant effect on the efficiency of the pulley system." (2)
- MS verbatim:
  > 17(a)
  >              The greater the length of the rope, the greater the extension for a given force   (1)
  >              Stiffness k = F / Δx so stiffness decreases (if extension increases).             (1)          2
  > 17(b)(i)
  >              Use of E =
  >                            𝜎         𝐹
  >                               and 𝜎 = and 𝜖 =
  >                                                 ∆x                                            (1)
  >                            𝜀         𝐴        𝑥
  >              Use of 𝐹 = 𝑘∆𝑥
  >                                                                                               (1)
  >              k = 1.35 × 105 (N m–1)                                                                         3
  > Example of calculation
  > 2.70 × 109 N m−2 = F × 6.00 m ÷ (3.00 × 10−4 m2 × ΔL)
  > F = (2.70 × 109 N m−2 × 3.00 × 10−4 m2 ÷ 6.00 m) × ΔL = k Δx
  > k = F/ΔL = 2.70 × 109 N m−2 × 3.00 × 10−4 m2 / 6.00 m = 1.35 × 105 N m-1
  > 17(b)(ii)
  >              Correct use of factor of 2 to calculate F or Δx                                   (1)
  >              Use of ∆F = k∆x                                                                   (1)
  >              1.85 × 10−2 (m) (allow ecf from (i))                                              (1)          3
  > Example of calculation
  > F = 5 000 N/ 2 = 2 500 N
  > ∆x = F/k = 2 500 N / 1.35 × 105 N m-1 = 1.85 × 10−2 m
  > 17(b)(iii)
  >              Use of ΔEel = ½ FΔx                                                               (1)
  >              ΔEel = 23.1 J (allow ecf from (ii))                                               (1)          2
  > Example of calculation
  > ΔEel = 0.5 2 500 N 1.85 10–2 m = 23.13 J
  > 17(c)
  >              Use of W = FΔs (to find the work done in lifting the load)                        (1)
  >              Compares 7 500 J with their calculated value in b(iii) and draws suitable         (1)          2
  >              conclusion
  > Example of calculation
  > Work done by pulley system = 5 × 103 N × 1.5 m = 7 500 J
  > 23(.1) (J) << 7 500 (J) ⸫ not significant
- Guidance notes: k derived from E via k = EA/L; factor of 2 mark for the moving pulley; strain-energy formula quoted as "Use of ΔEel = ½ FΔx"; (c) is an "assess" question — comparison + conclusion mark.

### Q18 (15 marks) — structured (falling-sphere viscosity experiment with v–d² graph)
- Scenario: Student measures terminal velocities v of glass spheres of diameter d falling through a liquid and plots v against d².
- Asked: (a) "Explain what is meant by terminal velocity." (2); (b) "A glass sphere of diameter 35 mm is travelling through the fluid at terminal velocity. Show that the drag force on this sphere is about 0.2 N. density of glass ρg = 2.52 × 103 kg m−3, density of liquid ρs = 1.43 × 103 kg m−3" (5); (c)(i) "The student reads in a textbook that if Stokes' law is obeyed v = kd², where k is a constant. Deduce from the graph whether the flow of liquid around the spheres was laminar." (3); (c)(ii) "Determine a value for k using the student's graph." (3); (c)(iii) "The constant k is given by k = (ρg − ρs)g/(18η), where η is the viscosity of the liquid. Determine a value for η." (2)
- MS verbatim:
  > 18(a)
  >              The constant maximum velocity reached by an object falling (through a fluid)   (1)
  >              When the resultant force equals zero
  >              Or when the drag plus the upthrust equals the weight                           (1)          2
  > 18(b)
  >              Use of V = 4π r3 / 3                                                           (1)
  >              Use of upthrust U = weight of fluid displaced W                                (1)
  >              Use of ρ=m / V and WS = mg                                                     (1)
  >              Use of D = W – U                                                               (1)
  >                                                                                             (1)          5
  >              D = 0.24 (N)
  > Example of calculation
  > V = 4/3 π × (0.0175 m)3 = 2.24 ×10−5 m3
  > U = 2.24 ×10−5 m3 × 1.43 × 103 kg m−3 × 9.81 N kg−1 = 0.314 N
  > W = 2.24 ×10−5 m3 × 2.52 × 103 kg m−3 × 9.81 N kg−1 = 0.554 N
  > D = 0.554 N − 0.314 N = 0.240 N
  > 18(c)(i)
  >              All data points are close to the straight line through origin
  >              Or
  >              Best fit straight line goes through origin                                     (1)
  >              This consistent with Stokes' Law.                                              (1)
  >              Stokes' Law implies laminar flow (for the spheres).                            (1)          3
  > 18(c)(ii)
  >              Determines gradient of graph                                                   (1)
  >              Uses large triangle.                                                           (1)
  >              k = 5.8 to 6.2 m-1s-1                                                          (1)          3
  > 18(c)(iii)                 (ρg −ρs )g
  >              Use of k =                                                                     (1)
  >                                 18η
  >              η = 99 Pa s (allow ecf from (c)(ii))                                           (1)          2
  > Example of calculation
  > η = (ρg − ρs ) g / 18k = (2.52 − 1.43)×103 kg m−3 ×9.81N kg −1 / (18 ×6 m−1 s−1) = 99.0 Pa s
- Guidance notes: terminal velocity definition needs both "constant maximum velocity" and zero resultant force (drag + upthrust = weight wording accepted); laminar deduction is a 3-step chain (straight line through origin → consistent with Stokes → Stokes implies laminar); gradient value given as a range.

### Excluded 2021-Jun questions (Topic 1 only)
- Q1 (scalar MCQ — "terminal velocity" appears only as a distractor), Q3–Q4, Q6–Q8, Q10–Q12, Q14 (projectile), Q15 (spacecraft seat, starred), Q16 (dragster moments).

---

## 2021-Oct

### Q3 (1 mark) — MCQ (spring combinations, elastic strain energy)
- Scenario: Two different springs S1 and S2 suspended from a fixed support; mass m on S1 gives extension x, mass 2m on S2 gives extension x/3. Elastic strain energy in S1 is E.
- Asked: "Which of the following is the elastic strain energy in spring S2? (A 6E, B 3E/2, C 2E/3, D E/6)"
- MS verbatim:
  > 3          C is the correct answer                                                     1
  >            A is incorrect because reducing the extension reduces the storedenergy
  >            B is incorrect because reducing the extension reduces the storedenergy and increasing the force increases the stored energy
  >            D isincorrect because increasing the force increases the stored energy
- Guidance notes: answer C (E ∝ FΔx; F doubles, Δx thirds → 2E/3). (The words "storedenergy"/"isincorrect" are glued in the extraction.)

### Q9 (1 mark) — MCQ (conditions for Stokes' law)
- Scenario: Student measured terminal velocities of objects falling through a liquid and used Stokes' Law to calculate viscosity.
- Asked: "For which of the following conditions does Stokes' Law apply? (A spherical objects and laminar flow, B spherical objects and low viscosity, C cylindrical objects and laminar flow, D cylindrical objects and low viscosity)"
- MS verbatim:
  > 9    A is the correct answer                                                   1
  >      B is incorrect because low viscosity is not a condition
  >      C is incorrect because cylindrical object is not a condition
  >      D is incorrect because neither cylindrical object nor low viscosity are conditions
- Guidance notes: answer A.

### Q14 (9 marks) — structured (Young modulus of a wire from weight-extension graph; Core Practical 3 style)
- Scenario: "A student carried out an experiment to determine the Young modulus of a sample of stainless steel in the form of a wire. The student added weights to the wire and measured the corresponding extensions. The wire had an unstretched length of 2.6 m. The diameter of the wire was 5.6 × 10–4 m. The student plotted a graph of weight against extension. The graph showed that the limit of proportionality was not exceeded."
- Asked: (a) "State what is meant by the limit of proportionality." (1); (b)(i) "Determine the gradient of the graph." (2); (b)(ii) "Determine the Young modulus of stainless steel using your value for the gradient." (3); (c) "The breaking stress for this stainless steel is known to be 480 MPa. Deduce whether it is safe for the student to increase the weight to 100.0 N." (3)
- MS verbatim:
  > 14(a)       Maximum value of weight/force for which weight/force is proportional
  >             to extension
  >             Or
  >             Point beyond which Hooke's Law no longer applies
  >             Or
  >             Point beyond which graph line ceases to be straight
  >             Or                                                                               1
  >             Point beyond which weight/force is no longer proportional to extension   (1)
  > 14(b)(i)    Use of large triangle to determine gradient                              (1)
  >             Gradient = 18 500 (N m−1) (sf range 18 - 19, no ue)                      (1)     2
  >             Example of calculation
  >             gradient = 37 N ÷ (2 × 10−3 m) = 18 500 (N m−1)
  > 14(b)(ii)   Rearranges E = stress / strain to get E = gradient × x/A
  >             Or Rearranges E = stress / strain to get gradient = EA/x                 (1)     3
  >             Use of A = π r2
  >                                                                                      (1)
  >             Young modulus = 2 × 1011 Pa
  >                                                                                      (1)
  >             (allow ecf from (b)(i))
  >             Example of calculation
  >             A = π × (2.8× 10−4)2 = 2.46 × 10−7 m2
  >             E = 1.85 × 104 N m−1 × 2.6 m ÷ 2.46 × 10−7 m2 = 1.95 × 1011 Pa
  > 14(c)       Use of σ = F/A
  >                                                                                      (1)
  >             Determines maximum safe load
  >             Or
  >             Determines maximum stress
  >             Or
  >             Determines minimum cross section                                         (1)
  >             Valid conclusion by comparison with student's calculation                (1)     3
  >             Example of calculation
  >             σmax = Wmax/A
  >             4.80×108 Pa = Wmax / 2.46 × 10−7m2
  >             Wmax = 480 × 106 Pa × 2.46 × 10−7 m2 = 118 N > 100 N so yes
- Guidance notes: gradient mark carries "(sf range 18 - 19, no ue)" — sig-fig range stated and no unit error applied; "deduce whether safe" needs σ = F/A plus explicit comparison/conclusion; "Or" alternatives listed for the second mark of (c).

### Q17 (11 marks) — structured (water droplet falling through oil: laminar, upthrust, terminal velocity)
- Scenario: "Water is dropped into a container of oil. The water forms small spherical droplets that move slowly downwards."
- Asked: (a)(i) "A droplet moves downwards at a constant speed. The flow of oil around the droplet is laminar. State what is meant by laminar flow." (1); (a)(ii) "State the condition necessary for the speed of the droplet to be constant." (1); (b)(i) "A spherical droplet has a volume of 3.35 × 10–8 m3. Calculate the weight of the droplet. density of water = 1.00 × 103 kg m–3" (3); (b)(ii) "Show that the upthrust on the water droplet when it's completely submerged in oil is about 3 × 10–4 N. density of oil = 0.94 × 103 kg m–3" (2); (b)(iii) "Calculate the terminal velocity of this water droplet in the oil. viscosity of oil = 0.11 Pa s" (4)
- MS verbatim:
  > 17(a)(i)    The layers of fluid flow past each other without mixing
  >             Or
  >             Velocity at a fixed point (relative to the drop) remains constant        (1)     1
  > 17(a)(ii)   Resultant force is zero
  >             Or
  >             Sum of the vertical forces is zero                                       (1)     1
  >             (Accept W − U = D or W = U + D with terms defined)
  > 17(b)(i)    Use of ρ = m/V                                                          (1)
  >             Use of W = mg                                                           (1)
  >             Weight = 3.3 × 10−4 N                                                   (1)     3
  >             Example of calculation
  >             1.00 × 103 kg m−3 = m ÷ 3.35 × 10−8 m3
  >             m = 1.00 × 103 kg m−3 × 3.35 × 10−8 m3 = 3.35 × 10−5 kg
  >             W = m g = 3.35 × 10−5 m3 × 9.81 N kg−1 = 3.29 × 10−4 N
  > 17(b)(ii)   Use of upthrust = weight of fluid displaced                              (1)
  >             Upthrust = 3.1 × 10−4 (N)                                                (1)     2
  >             Example of calculation
  >             0.94 × 103 kg m−3 = m ÷ 3.35 × 10−8 m3
  >             m = 0.94 × 103 kg m−3 × 3.35 × 10−8 m3 = 3.15 × 10−5 kg
  >             U = m g = 3.15 × 10−5 m3 × 9.81 N kg−1 = 3.09 × 10−4 N
  > 17(b)(iii)  Uses upthrust and weight to determine the viscous force F                (1)
  >             Use of V = 4/3 π r3 to determine r                                       (1)
  >             Use of F = 6πηrv                                                         (1)
  >             v = 4.8 × 10−3 m s−1 (ecf from (b)(i) and (b)(ii))                       (1)
  >                                                                                              4
  >             Example of calculation
  >             W = U + 6πηrv → W − U = 6πηrv
  >             W − U = (3.29 − 3.09) × 10−4 N = 2.0 × 10−5 N
  >             r = 3√(¾ × 3.35 × 10−8 m3 ÷ π) = 2.0 × 10−3 m
  >             2.0 × 10−5 N = 6π × 0.11 Pa s × 2.0 × 10−3 m × v
  >             v = 2.0 × 10−5 N ÷ (6π × 0.11 Pa s × 2.0 × 10−3 m) = 4.82 × 10−3 m s−1
- Guidance notes: laminar definition has two accepted forms; constant-speed condition accepts the equation "W − U = D or W = U + D with terms defined"; terminal-velocity calculation chains W = U + 6πηrv with ecf from both earlier parts.

### Excluded 2021-Oct questions (Topic 1 only)
- Q1 (motion graphs), Q2 (N3 star/planet), Q5 (beam equilibrium), Q6 (triangle of forces), Q7 (ball bearing 50 cm in 0.32 s — suvat only, no fluid), Q8 (GPE), Q10 (rocket forces), Q11 (toy car slope), Q12 (momentum), Q13 (sledge), Q16 (projectile), Q18 (block on ramp), Q19 (parasol moments).
- Q15 (6 marks, starred: spring-loaded toy car — "Explain why the floor exerts a forward force on the car and how this force affects the motion of the car as the spring returns to its original state") — EXCLUDED per boundary rule: no kΔx/stiffness reasoning is required; the MS indicative content is "1. There is a (backward) force/friction on floor from wheels/car; 2. Newton's Third Law implies forward/opposite force from floor; 3. Compression/deformation of spring reduces (as car moves forward); 4. (Resultant) force is proportional to compression/deformation of spring Or Reference to Hooke's law.; 5. Acceleration is proportional to resultant force Or Reference to F = ma; 6. Acceleration reduces (as distance travelled increases) Or Acceleration is zero once spring has returned to original state. Accept "resultant force" for "acceleration" in IC6". Noted here because IC4 does mention Hooke's law, in case the user wants it as a semi-Materials link.

---

## 2022-Jan

### Q6 (1 mark) — MCQ (terminal velocity vs mass, viscosity)
- Scenario: Graph of terminal velocity against mass for small spheres of equal diameter falling through a viscous liquid.
- Asked: "Which of the following describes the gradient of the graph for a liquid of greater viscosity? (A a greater gradient, B a smaller gradient, C a variable gradient, D the same gradient)"
- MS verbatim:
  > 6          B is the only correct answer                                                             1
  >            A is incorrect because a greater viscosity would reduce terminal velocity giving a
  >            lower gradient
  >            C is incorrect because because a greater viscosity would reduce terminal velocity
  >            giving a lower gradient
  >            D is incorrect because because a greater viscosity would reduce terminal velocity
  >            giving a lower gradient
- Guidance notes: answer B ("because because" duplication is as printed).

### Q8 (1 mark) — MCQ (breaking force vs diameter)
- Scenario: "A wire breaks when a tensile force T is applied. A second wire, made of the same material, has twice the diameter."
- Asked: force required to break the second wire? (A 4T, B 2T, C T/2, D T/4)
- MS verbatim:
  > 8          A is the only correct answer                                                             1
  >            B is incorrect because doubling the diameter gives four times the cross section,
  >            requiring four times the tension for the same stress.
  >            C is incorrect because increasing the diameter increases the cross section,
  >            requiring a greater tension for the same stress, not less
  >            D is incorrect because increasing the diameter increases the cross section,
  >            requiring a greater tension for the same stress, not less
- Guidance notes: answer A (same breaking stress → F ∝ A ∝ d²).

### Q13 (9 marks) — structured (Tyrolean traverse: strain and Young modulus of a rope)
- Scenario: Climber crossing a river on a rope suspended between banks; free-body diagram shows two tensions T at 76° to the horizontal (each side) and weight 650 N. Rope unstretched length 120 m; cross-sectional area 3.14 × 10−4 m2.
- Asked: (a) "Show that the tension T in the rope is about 1.3 × 103 N." (3) [mechanics part, included for ecf context]; (b)(i) "Determine the strain in the rope while it is supporting the weight of the climber. You may ignore the weight of the rope." (3); (b)(ii) "Determine the Young modulus of the rope material." (3)
- MS verbatim:
  > 13(a)                                                                     3
  >             Vertical component of tension = T cos 76°             (1)
  >             Use of 650 N = 2 × vertical component of tension      (1)
  >             T = 1.34 × 103 (N)                                    (1)
  >             Example of calculation
  >             650 N = 2 T cos 76°
  >             T = ½ × 650 N ÷ cos 76° = 1 343 N
  > 13(b)(i)                                                                  3
  >             Use of sin76° or cos 14° to find new length of cord   (1)
  >             Use of ε = Δx ÷ x                                     (1)
  >             ε = 0.03 or 3%                                        (1)
  >             Example of calculation
  >             (x + Δx) ÷ 2 = 60 m ÷ sin 76° = 61.8 m
  >             Δx = (61.8 × 2) m − 120.0 m = 3.7 m
  >             ε = 3.7 m ÷ 120 m = 0.031
  > 13(b)(ii)                                                                 3
  >             Use of σ = F ÷ A with F = tension from (a)            (1)
  >             Use of E = σ ÷ ε                                      (1)
  >             E = 1.4 × 108 Pa (ecf from (a) and (b)(i))            (1)
  >             Example of calculation
  >             σ = 1.34 × 103 N ÷ 3.14 × 10−4 m2 = 4.28 MPa
  >             E = 4.28× 106 Pa ÷ 0.031 = 1.38 × 108 Pa
- Guidance notes: Materials content is (b); strain needs stretched length by geometry (each half = 60/sin76°); E carries double ecf "(ecf from (a) and (b)(i))".

### Q15 (10 marks) — structured (floating hollow brass cylinder; flotation and density)
- Scenario: "A hollow brass cylinder with closed ends is floating on the surface of water. The cylinder has a length of 4.0 cm and an external diameter of 2.1 cm. 63% of the volume of the cylinder is submerged. The cylinder contains negligible weight of air."
- Asked: (a) "Explain why the brass cylinder floats." (2); (b)(i) "The density of water is 1.0 × 103 kg m−3. Show that the mass of the cylinder is about 9 × 10−3 kg." (4); (b)(ii) "Deduce whether an identical hollow cylinder made of gold would also float. Assume that the volume of gold is the same as the volume of brass. density of gold = 19.3 × 103 kg m−3, density of brass = 8.7 × 103 kg m−3" (4)
- MS verbatim:
  > 15(a)
  >             There is an upthrust which is equal to the weight of water displaced                  (1)
  >             The upthrust is equal to the weight of the cylinder (when it's partially submerged)   (1)
  >             OR
  >             The (overall) density (of the cylinder) is less than the density of the water.        (1)
  >             The weight of water displaced is equal to the weight of the cylinder                  (1)
  >                                                                                                            2
  > 15(b)(i)
  >             Use of Volume = πr2l                                                                  (1)
  >             Use of 63% with their volume                                                          (1)
  >             Use of ρ = m / V                                                                      (1)
  >             m = 8.8 × 10−3 (kg)                                                                   (1)     4
  >             Example of calculation
  >             volume of cylinder= π × (1.05 cm)2 × 4 cm = 1.39 × 10−5 m3
  >             volume submerged = 0.63 × volume of cylinder
  >                     = 0.63 × 1.39 × 10−5 m3 = 8.76 × 10−6 m3
  >             mass of cylinder = mass of water displaced
  >                     = 1 000 kg m−3 × 8.76 × 10−6 m3 = 8.76 × 10−3 kg
  > 15(b)(ii)
  >             Use of ρ = m / V to calculate the volume of brass                                     (1)
  >             Use of ρ = m / V to calculate the mass of the same volume of gold (not volume of      (1)
  >             whole cylinder)
  >             Use of ρ = m / V to calculate the volume of water needed to float the cylinder
  >             Or
  >             Use of ρ = m / V to calculate the maximum mass/weight of water that could be
  >             displaced                                                                             (1)
  >             Correct conclusion from comparison of displaced volume of water required to
  >             float gold (1.9 × 10−5 m3) with volume of cylinder (1.4 × 10−5 m3)
  >             Or
  >             Correct conclusion from comparison of weight of gold cylinder
  >             (0.19 N) with max weight of water that could be
  >             displaced (0.14 N) (ecf from (b)(i))
  >             Or
  >             Correct conclusion from comparison of mass of gold cylinder
  >             (0.019 kg) with max mass/weight of water that could be
  >             displaced (0.014 kg) (ecf from (b)(i))                                                (1)
  >             Example of calculation
  >             volume of gold = volume of brass
  >                     = 8.73 × 10−3 kg ÷ 8.7 × 103 kg m−3 = 1.00 × 10−6 m3                                  4
  >             mass of gold = 1.00 × 10−6 m3 × 19.3 × 103 kg m−3 = 0.019 3 kg
  >             volume of water required = 0.019 3 kg ÷ (1.00 × 103 kg m−3) = 1.93 × 10−5 m3
  >             1.93 × 10−5 m3 > 1.39 × 10−5 m3 ⸫ sinks
- Guidance notes: (a) has an OR route (overall density less than water); the floating criterion is mass of water displaced = mass of cylinder using the SUBMERGED volume (63%); the conclusion mark offers three alternative comparisons (volume, weight, mass).

### Q16 (10 marks) — structured (pinball spring launcher — included because parts (b)–(d) require Hooke's-law/strain-energy reasoning)
- Scenario: Toy pinball machine; launcher compresses a spring by 5.0 cm; "The spring obeys Hooke's law." Ball (mass 12 g) launched horizontally at 8.0 cm s−1.
- Asked: (a) "Show that the kinetic energy of the ball just after launching is about 4 × 10−5 J." (2) [energy only]; (b) "Determine the force on the ball when the spring is released." (2); (c) "Determine the stiffness of the spring." (2); (d) "The spring returns to its original length L. Sketch a graph, on the axes below, to show how the velocity of the ball varies with the length of the spring." (4)
- MS verbatim:
  > 16(a)
  >            Use of Ek = ½ m v2                                              (1)
  >            Ek = 3.8 × 10−5 (J)                                             (1)     2
  >            Example of calculation
  >            Ek = 0.5 × 12 × 10−3 kg × (8.0 × 10−2 m s−1)2 = 3.84 × 10−5 J
  > 16(b)
  >            Use of ΔEel = ½ F Δx                                            (1)
  >            F = 1.5 × 10−3 N (allow ecf from (a))                           (1)
  >            Example of calculation                                                  2
  >            ΔEel = Ek = 3.84 × 10−5 J = 0.5 × F × 0.05 m
  >            F = 3.84 × 10−5 J ÷ 0.025 m = 1.54 × 10−3 N
  > 16(c)
  >            Use of F = k Δx                                                 (1)
  >            k = 0.03 N m−1 (allow ecf from (b))                             (1)     2
  >            Example of calculation
  >            1.54 × 10−3 N = k × 0.05 m
  >            k = 1.54 × 10−3 N ÷ 0.05 m = 0.031 N m−1
  > 16(d)
  >            Line has initially decreasing positive gradient
  >                                                                            (1)
  >            Line starts at v = 0 and a non-zero value of length
  >                                                                            (1)
  >            Line levels off to horizontal at length = L
  >                                                                            (1)
  >            Final velocity marked as 8.0 cm s−1
  >            Or                                                              (1)     4
  >            Original compressed length marked as "L − 5" in cm
- Guidance notes: (b) assumes all ΔEel transfers to Ek ("ΔEel = Ek") and uses ΔEel = ½FΔx with the mean force; (d) sketch marks are descriptive (shape, start point, level-off, endpoint label), showing the force falls to zero as the spring reaches L.

### Q17 (11 marks) — structured (sphere moving horizontally through a viscous liquid: Stokes' law)
- Scenario: "A small sphere is moving horizontally through a viscous liquid." Diameter 4.5 × 10−3 m; viscosity 7.1 × 10−2 Pa s; constant horizontal force 2.3 × 10−5 N.
- Asked: (a) "Stokes' law can be used to calculate the drag force on an object. State the conditions that must apply for Stokes' law to be valid." (2); (b)(i) "At one instant, the speed of the sphere is 5.2 × 10−3 m s−1. Calculate the resultant horizontal force on the sphere." (3); (b)(ii) "Calculate the maximum speed of the sphere in the horizontal direction." (2); (c) "A larger diameter sphere in the same liquid is acted upon by the same constant force as in (b). The liquid is at a lower temperature. Explain the effect these changes have on the maximum speed of this sphere." (4)
- MS verbatim:
  > 17(a)       Max 2
  >             Object must be a sphere                                                           (1)
  >             Low speed/velocity                                                                (1)
  >             Laminar flow                                                                      (1)     2
  > 17(b)(i)
  >             Use of F = 6π η r v                                                               (1)
  >             Subtraction of two forces                                                         (1)
  >             Resultant force = 7 × 10−6 N                                                      (1)     3
  >             Example of calculation
  >             drag force = 6π × 7.1 × 10−2 Pa s × 2.25 × 10−3 m × 5.2 × 10−3 m s−1
  >                        = 1.6 × 10−5 N
  >             Resultant force = 2.3 × 10−5 N − 1.6 × 10−5 N = 0.7 × 10−5 N
  > 17(b)(ii)
  >             Use of F = 6π η r v with F = 2.3 × 10−5 N                                         (1)
  >             v = 7.6 × 10−3 m s−1                                                              (1)     2
  >             Example of calculation
  >             2.30 × 10−5 N = 6π × 7.10 × 10−2 Pa s × 2.25 × 10−3 m × v
  >             v = 2.30 × 10−5 N ÷ (6π × 7.10 × 10−2 Pa s × 2.25 × 10−3 m) = 7.64 × 10−3 m s−1
  > 17(c)
  >             Larger diameter gives larger drag force (at given speed)                          (1)
  >             Or
  >             Larger diameter gives a lower speed (for the same constant force)
  >                                                                                               (1)
  >             Lower temperature so viscosity is greater
  >             Greater viscosity gives larger drag force (at given speed)
  >             Or
  >             Greater viscosity gives lower speed (for the same constant force)                 (1)
  >             Maximum speed will decrease (dependent on MP1 and MP3)                            (1)     4
- Guidance notes: (a) is a 3-point list with "Max 2" — any two of sphere / low speed / laminar flow; (c) final mark is explicitly dependent on MP1 and MP3; horizontal analogue of terminal velocity (max speed when driving force = drag).

### Excluded 2022-Jan questions (Topic 1 only)
- Q1–Q5 (motion/vector/suvat MCQs), Q7 (N3 trolley), Q9 (beam supports), Q10 (units), Q11 (asteroid momentum), Q12 (lift counterweight), Q14 (lift scales, starred), Q18 (motorcycle projectile).

---

## 2022-Jun

### Q2 (1 mark) — MCQ (upthrust and viscous drag on an accelerating sphere in a liquid)
- Scenario: "A sphere falls through a viscous liquid as shown. Which row of the table describes the upthrust and the viscous drag on the sphere as it accelerates downwards?"
- MS verbatim:
  > 2          The correct answer is B                                                         1
  >            A is incorrect because the upthrust is constant
  >            C is incorrect because the upthrust is constant and the viscous drag is
  >            increasing
  >            D is incorrect because the viscous drag is increasing
- Guidance notes: answer B — upthrust constant (constant volume displaced), viscous drag increasing with speed.

### Q4 (1 mark) — MCQ (Young modulus from a stress-strain graph)
- Scenario: Graph of tensile stress against tensile strain showing elastic limit and breaking point.
- Asked: "Which of the following gives the Young modulus of the material? (A the area under the line up to the breaking point, B the area under the line up to the elastic limit, C the gradient of the tangent to the line at the origin, D the stress divided by the strain at the breaking point)"
- MS verbatim:
  > 4          The correct answer is C                                                         1
  >            A is incorrect because area represents work done per unit volume
  >            B is incorrect because area represents work done per unit volume
  >            D is incorrect because the breaking point is outside the linear region
- Guidance notes: answer C; area = work done per unit volume (worth teaching alongside Q16 2021-Jan).

### Q7 (1 mark) — MCQ (spring arrangements P and Q, elastic strain energy)
- Scenario: Two arrangements of identical springs subjected to the same tensile force F (P: one spring; Q: two springs — as drawn, Q has springs sharing the force). "When one spring is subjected to a tensile force F, the elastic strain energy for the spring is E."
- Asked: total elastic strain energy for each arrangement (A ½E & 2E, B ½E & ½E, C 2E & 2E, D 2E & ½E)
- MS verbatim:
  > 7          The correct answer is D                                                           1
  >            A is incorrect because springs in series increase the extension and springs in
  >            parallel decrease the extension for the same force
  >            B is incorrect because springs in series increase the extension for the same
  >            force
  >            C is incorrect because springs in parallel decrease the extension for the same
  >            force
- Guidance notes: answer D; MS reasoning phrased via series/parallel extension behaviour for the same force.

### Q10 (1 mark) — MCQ (stiffness from two (force, length) states)
- Scenario: "When compressed by a force of 50 N, a spring had a length of 12.0 cm. When compressed by a force of 70 N, the same spring had a length of 7.1 cm. Which of the following expressions gives the stiffness k of the spring in N cm–1?"
- MS verbatim:
  > 10         The correct answer is B                                                           1
  >            A is incorrect because the spring constant is ΔF / Δx
  >            C is incorrect because the spring constant is ΔF / Δx
  >            D is incorrect because the spring constant is ΔF / Δx
- Guidance notes: answer B = (70 − 50)/(12.0 − 7.1); the MS's repeated justification "the spring constant is ΔF / Δx" stresses using the DIFFERENCE of force over the difference of length (not length itself).

### Q12 (5 marks) — structured (steel cable at its elastic limit: strain and stress)
- Scenario: "When an increasing force is applied to a steel cable it will eventually reach its elastic limit. The elastic limit of a steel cable was reached when a force of 13.4 × 106 N was applied. The extension of the cable was 0.126 m. length of cable = 6.00 m; cross-sectional area of cable = 9.60 × 10–3 m2."
- Asked: (a) "State what is meant by the elastic limit." (1); (b)(i) "Calculate the strain of the cable at its elastic limit." (2); (b)(ii) "Calculate the stress in the cable at its elastic limit." (2)
- MS verbatim:
  > 12(a)
  >             It's the force / stress beyond which the cable does not return to its original length
  >             when the force / stress is removed                                                      (1)    1
  > 12(b)(i)
  >             Use of ε = Δx/x                                                                         (1)
  >             ε = 0.021                                                                               (1)    2
  >             Example of calculation
  >             ε = 0.126 m ÷ 6 m = 0.021
  > 12(b)(ii)
  >             Use of σ = F/A                                                                          (1)
  >             σ = 1.4 × 109 Pa                                                                        (1)    2
  >             Example of calculation
  >             σ = 1.34 × 106 N ÷ 9.6 × 10−3 m2 = 1.40 × 109 Pa
- Guidance notes: elastic-limit definition must include "does not return to its original length" (permanent deformation).

### Q15 (6 marks) — starred (Galilean thermometer: flotation vs temperature)
- Scenario: "A Galilean thermometer consists of a closed glass cylinder containing a liquid. In the liquid there are several identical sealed glass bulbs... Attached to each bulb is a metal disc labelled with a temperature. Each disc has a different mass. As the temperature increases, the density of the liquid decreases. This can cause the bulbs to move within the liquid."
- Asked: "Explain why a particular bulb will float until the temperature of the liquid exceeds a certain value." (6)
- MS verbatim (indicative content):
  >            Upthrust on a bulb is equal to weight of liquid displaced.                         (1)
  >            When upthrust equals/exceeds weight of bulb / disc, bulb floats                    (1)
  >                                                                                               (1)
  >            Weight of a bulb / disc is constant
  >            As temperature increases the weight of displaced liquid decreases
  >                                                                                               (1)
  >            Or As temperature increases upthrust on bulb decreases                             (1)
  >            Until weight of a bulb / disc exceeds the upthrust
  >                                                                                               (1)    6
  >            There is a resultant force and bulb will sink
  > (Marked with the standard asterisk/IC-table preamble: "This question assesses a student's ability to show a coherent and logically structured answer with linkages and fully-sustained reasoning...")
- Guidance notes: same upthrust/weight-of-displaced-liquid chain as the submarine and brass cylinder questions, applied to changing liquid density.

### Q19 (14 marks) — structured (falling sphere viscometer: Stokes' law validity, temperature, blood)
- Scenario: "A falling sphere viscometer is a device used to determine the viscosity of a liquid. A sphere falls through a cylinder containing a liquid, and the terminal velocity of the sphere is measured." Aluminium sphere, diameter 7.00 × 10−3 m, in glycerol (density 1.26 × 103 kg m−3, viscosity 9.50 × 10−1 Pa s); terminal velocity 4.05 × 10−2 m s−1. Part (c): viscosity of blood 3 × 10−3 to 4 × 10−3 Pa s.
- Asked: (a) "State why the temperature of the liquid should not increase during the measurement." (1); (b)(i) "Show that the weight of the sphere is about 4.8 × 10–3 N. density of aluminium = 2.70 × 103 kg m–3" (4); (b)(ii) "Deduce whether Stokes' law applied to the falling sphere." (3); (b)(iii) "State one condition that must be met for Stokes' law to apply." (1); (c) "A scientist used the viscometer to measure the viscosity of blood... Explain why the scientist should use an aluminium sphere with a much smaller diameter than the sphere used with the glycerol. Do not include calculations in your answer." (5)
- MS verbatim:
  > 19(a)
  >                 The viscosity decreases (with temperature)                                   (1)    1
  > 19(b)(i)
  >                 Use of V = (4/3)π r3                                                         (1)
  >                 Use of ρ = m / V                                                             (1)
  >                 Use of W = m g                                                               (1)
  >                 W = 4.76 × 10−3 N                                                            (1)    4
  >                 Example of calculation
  >                 volume = (4/3)π × (3.5 × 10−3 m)3 = 1.80 ×10−7 m3
  >                 m = 1.80 ×10−7 m3 × 2.70 × 103 kg m−3 = 4.85×10−4 kg
  >                 W = 4.85×10−4 kg × 9.81 N kg−1 = 4.76 × 10−3 N
  > 19(b)(ii)
  >                 Use of F = 6π η r v                                                          (1)
  >                 Use of U = weight of fluid displaced                                         (1)
  >                 Comparison of F with W − U and conclusion consistent with student's values   (1)    3
  >                 Example of calculation
  >                 D = 6π × 0.95 Pa s × 0.003 5 m × 0.040 5 m = 2.54 × 10−3 N
  >                 U = 1.80 ×10−7 m3 × 1.26 × 103 kg m−3 × 9.81 N kg−1 = 2.22 × 10−3 N
  >                 W − U = 4.76 × 10−3 N − 2.22 × 10−3 N = 2.54 × 10−3 N
  >                 2.54 × 10−3 N = D ⸫ Stokes law obeyed
  > 19(b)(iii)
  >                 Low speed
  >                 Or
  >                 Laminar flow
  >                 Or
  >                 Small sphere                                                                 (1)    1
  >                 [Accept reference to wide cylinder]
  > 19(c)
  >                 Viscosity of blood is much lower                                             (1)
  >                 Drag will be lower for given velocity (proportional to diameter)             (1)
  >                 Reducing diameter gives less weight (proportional to cube of diameter)       (1)
  >                 Forces balance at lower speed
  >                 Or
  >                 Terminal velocity lower                                                      (1)
  >                 Laminar flow needs low speed                                                 (1)    5
  >                 Viscosity of blood much lower (1)
  >                 (For the original sphere) drag would be (much) lower at same velocity (1)
  >                 So terminal velocity would be (much) too large for Stokes' law (1)
  >                 Reducing r reduces W much more than D OR W proportional to r3 but D
  >                 proportional to r (1)
  >                 (With smaller sphere) forces will still balance at low speed (1)
- Guidance notes: (b)(ii) compares the Stokes drag at terminal velocity with W − U and needs a conclusion ("Stokes law obeyed"); (b)(iii) accepts wide cylinder as a validity condition; (c) is a no-calculation explanation whose alternative wording is given in full at the end of the MS.

### Excluded 2022-Jun questions (Topic 1 only)
- Q1 (power/time MCQ), Q3 (scalar MCQ), Q5 (g determination MCQ), Q6 (rocket acceleration MCQ), Q8 (v–t area MCQ), Q9 (work on slope MCQ), Q11 (disc held by magnetic base — N3/free-body), Q13 (coat hook moments), Q14 (regenerative braking — drag in AIR only, per boundary rule), Q16 (kite equilibrium), Q17 (bumper cars momentum), Q18 (golf projectile).

---

## Cross-session observations (2021-2022)

### Recurring question set-ups (scenarios)
1. Falling/rising sphere in a liquid with Stokes' law — the single most frequent Materials set-up (2021-Jan Q18 bead rising in oil; 2021-Jun Q18 glass spheres falling; 2021-Oct Q17 water droplet in oil; 2022-Jan Q17 sphere pushed horizontally; 2022-Jun Q19 falling-sphere viscometer; plus MCQs 2021-Oct Q9, 2022-Jan Q6, 2022-Jun Q2). Variants: (i) "Show that" upthrust/weight from ρ and V = 4πr³/3; (ii) "Deduce whether Stokes' law applied/is valid" by comparing drag with W − U (or v with vR); (iii) temperature effect on viscosity (2022-Jun Q19(a), 2022-Jan Q17(c)); (iv) viscosity from a v–d² graph gradient (2021-Jun Q18) — Core Practical 2 in disguise.
2. Upthrust/flotation without Stokes — submarine (2021-Jun Q13), floating brass vs gold cylinder (2022-Jan Q15), Galilean thermometer (2022-Jun Q15). All three use the same MS logic chain: upthrust = weight of fluid displaced; float when U = W (or overall density ≤ fluid density); sink when U < W → resultant force.
3. Young modulus of a wire/rope — 2021-Oct Q14 (weight-extension graph, gradient route), 2022-Jan Q13 (Tyrolean rope, strain then E = σ/ε), 2021-Jan Q16 (stress-strain graph, gradient route), 2021-Jun Q17 (rope stiffness k = EA/L). Core Practical 3 context ("student added weights to a wire and measured extensions") appears in 2021-Oct Q14.
4. Stress-strain graph interpretation — breaking force from breaking stress (2021-Jan Q16(b)(ii)), breaking-stress safety deduction (2021-Oct Q14(c)), yield point MCQ (2021-Jun Q9), gradient-of-tangent MCQ (2022-Jun Q4), work done per unit volume (2021-Jan Q16(b)(iii)(iv)).
5. Hooke's law / stiffness of a spring — force meter (2021-Jan Q17), pinball launcher (2022-Jan Q16), pulley rope (2021-Jun Q17), stiffness-from-two-states MCQ (2022-Jun Q10), spring-combination strain-energy MCQs (2021-Oct Q3, 2022-Jun Q7, 2021-Jan Q5 property-of-a-wire MCQ).
6. Spring-launched projectile (energy route) appears twice but is EXCLUDED both times under the boundary rule: 2021-Oct Q15 (toy car, N3/friction) and 2022-Jan Q16 is INCLUDED only because (b)–(d) demand ΔEel = ½FΔx and kΔx.

### Exact recurring mark-scheme wordings (seen more than once)
- "Use of ρ = m / V" (or "ρ=m / V") — 2021-Jan 14(a)(i)/18(b), 2021-Jun 13(a)(i)/13(b)(ii)/18(b), 2021-Oct 17(b)(i), 2022-Jan 15(b)(i)/15(b)(ii), 2022-Jun 19(b)(i).
- "Use of V = 4π r3 / 3" / "Use of V = 4/3 π r3 to determine r" / "Use of V = (4/3)π r3" — 2021-Jun 18(b), 2021-Oct 17(b)(iii), 2022-Jun 19(b)(i).
- "Use of upthrust U = weight of fluid displaced W" / "Use of upthrust = weight of fluid displaced" / "Use of U = weight of fluid displaced" — 2021-Jun 18(b), 2021-Oct 17(b)(ii), 2022-Jun 19(b)(ii).
- "Use of F = 6π η r v" — 2021-Jan 18(c)(ii), 2022-Jan 17(b)(i)/(b)(ii), 2022-Jun 19(b)(ii) (all printed with spaces around η).
- "Use of F = 6πηrv" (no spaces) — 2021-Jan 18(c)(ii), 2021-Oct 17(b)(iii).
- Stokes conditions list: "Object must be a sphere / Low speed/velocity / Laminar flow" with "Max 2" (2022-Jan 17(a)); "Low speed / Laminar flow / Small sphere [Accept reference to wide cylinder]" (2022-Jun 19(b)(iii)); "The flow must be laminar Or There must be no turbulent flow" (2021-Jan 18(c)(i)); MCQ answer "spherical objects and laminar flow" (2021-Oct Q9).
- Terminal velocity definition: "The constant maximum velocity reached by an object falling (through a fluid) (1) When the resultant force equals zero Or when the drag plus the upthrust equals the weight" (2021-Jun 18(a)); constant-speed condition "Resultant force is zero Or Sum of the vertical forces is zero (Accept W − U = D or W = U + D with terms defined)" (2021-Oct 17(a)(ii)).
- Laminar definition: "The layers of fluid flow past each other without mixing Or Velocity at a fixed point (relative to the drop) remains constant" (2021-Oct 17(a)(i)).
- Temperature-viscosity: "The viscosity decreases (with temperature)" (2022-Jun 19(a)); "Lower temperature so viscosity is greater" (2022-Jan 17(c)).
- "Use of ∆F = k∆x" — 2021-Jan 17(a), 2021-Jun 17(b)(ii), 2022-Jan 16(c); MCQ justification "the spring constant is ΔF / Δx" (2022-Jun Q10).
- "Use of ΔEel = ½ FΔx" — 2021-Jun 17(b)(iii), 2022-Jan 16(b).
- Young modulus routes: "Use of E = σ/ε and σ = F/A and ε = Δx/x" then "Use of F = k∆x" (2021-Jun 17(b)(i)); "Rearranges E = stress / strain to get E = gradient × x/A" (2021-Oct 14(b)(ii)); "Use of σ = F ÷ A with F = tension from (a)" + "Use of E = σ ÷ ε" (2022-Jan 13(b)(ii)); "Attempt to calculate gradient" + "Use of linear section, or tangent at origin, with use of large triangle" (2021-Jan 16(b)(i)).
- Definitions of key words (exact accepted phrasings):
  - limit of proportionality: "Maximum value of weight/force for which weight/force is proportional to extension Or Point beyond which Hooke's Law no longer applies Or Point beyond which graph line ceases to be straight Or Point beyond which weight/force is no longer proportional to extension" (2021-Oct 14(a)).
  - elastic limit: "It's the force / stress beyond which the cable does not return to its original length when the force / stress is removed" (2022-Jun 12(a)).
- Flotation: "There is an upthrust which is equal to the weight of water displaced" + "The upthrust is equal to the weight of the cylinder (when it's partially submerged) OR The (overall) density (of the cylinder) is less than the density of the water." (2022-Jan 15(a)); sinking chain "The upthrust (of the water on the submarine) is less than the weight of the submarine / A resultant force acts (downwards) on the submarine / So the submarine will (begin to) sink (dependent on MP1)" (2021-Jun 13(b)(i)).
- "Deduce whether ..." pattern always ends with a comparison + conclusion mark: "Comparison of v with vR and correct conclusion (ecf from (b))" (2021-Jan 18(c)(ii)); "Comparison of F with W − U and conclusion consistent with student's values" (2022-Jun 19(b)(ii)); "Valid conclusion by comparison with student's calculation" (2021-Oct 14(c)); "Compares 7 500 J with their calculated value in b(iii) and draws suitable conclusion" (2021-Jun 17(c)); "Correct conclusion from comparison of ..." with three OR alternatives (2022-Jan 15(b)(ii)).
- Instrument question: "Micrometer (screw gauge) Or digital (not Vernier) calliper(s)" (2021-Jan 16(a)) — Vernier explicitly rejected.
- Breaking stress: "Breaking stress read from graph / Use of A = πr 2 / Use of σ = F/A / F = 2.6 × 104 N" (2021-Jan 16(b)(ii)); MCQ "doubling the diameter gives four times the cross section, requiring four times the tension for the same stress" (2022-Jan Q8).

### Mark-scheme conventions observed
- Format: bullet mark points, each ending "(1)", with a part-total after the last point (e.g. "(1)    4") and "Total for question N = X" style rows. "Or" on its own line introduces an alternative accepted answer; square brackets are examiner notes, e.g. "[Accept reference to wide cylinder]", "[use template for angle]", "[no ue]".
- "Use of X" = a substitution mark (recall is implied by substitution); "Correct answer/value" or "X = number" = the answer mark. Calculation parts print an "Example of calculation" with a fully worked line.
- ecf: "allow ecf from (a)", "(ecf from (b)(i) and (b)(ii))", "(ecf from (a) and (b)(i))" — ecf flows forward within a question (upthrust → drag → conclusion; tension → stress → E; gradient → E; stiffness → extension → energy).
- Dependent marks: "So the submarine will (begin to) sink (dependent on MP1)" (2021-Jun 13(b)(i)); "Maximum speed will decrease (dependent on MP1 and MP3)" (2022-Jan 17(c)); "MP2 depends upon MP1" (2022-Jun 13(a), non-Materials).
- List questions with more creditable points than marks: "Max 2" header (2022-Jan 17(a) — sphere/low speed/laminar).
- Unit rules: final calculation mark lost for missing/wrong unit; "[no ue]" used on graph-gradient values ("Gradient = 18 500 (N m−1) (sf range 18 - 19, no ue)", 2021-Oct 14(b)(i)); unit-error penalty not applied more than once per question.
- Significant figures: penalised only in "show that" answers (too few sf fails to demonstrate validity); sig-fig ranges printed where relevant ("sf range 18 - 19"); g = 10 instead of 9.81 loses one mark, 9.8 accepted.
- "Show that" values: reverse working gets both marks for a 2-mark show-that, only 2 of 3 for a 3-mark one; final answer usually given "about X" and MS quotes the unrounded value (k = 1.875 → "about 2 N cm−1", W = 4.76 × 10−3 N).
- "Deduce/Assess whether" questions require a comparison sentence AND a decision; conclusion marks accept either verdict if consistent with the candidate's numbers ("conclusion consistent with student's values").
- Starred questions (QoWC): 2021-Jan Q15, 2021-Jun Q15, 2021-Oct Q15(a)*, 2022-Jan Q14*, 2022-Jun Q15*. Materials starred example: 2022-Jun Q15 (Galilean thermometer) — marked with the IC-points table (6+ IC points → 4 IC marks + 2 linkage marks = 6) and printed "Indicative content" bullets.
- MCQ format: "X is the correct answer" (2021 sessions) or "The correct answer is X" / "X is the only correct answer" (2022 sessions), each followed by one-line reasons why every other option is wrong — useful for teaching distractor logic.
- Graph-skill marks inside Materials: "Attempt to calculate gradient", "Use of large triangle", "Determines gradient of graph", "All data points are close to the straight line through origin".
