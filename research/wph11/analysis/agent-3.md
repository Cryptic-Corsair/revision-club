# WPH11 Topic 2 analysis — agent 3 (2022-Oct → 2024-Jan)

Method note: for each session, Materials content in the QP was located by keyword grep (densit|upthrust|displac|viscos|stokes|laminar|turbulent|terminal|spring|stiffness|hooke|stress|strain|young|ductile|brittle|yield|elastic|plastic|deform|extension|compression), the whole of Section A MCQs 1–10 was read to catch keyword misses, and the ENTIRE MS file was read line by line. MS lines below are verbatim from the pdftotext -layout output, including "(1)" markers, [square-bracket examiner notes] and example calculations.

Hint verification (central keyword scan vs direct reading): the hint question numbers are systematically offset/wrong. 2022-Oct hints matched only Q5; 2023-Jan matched Q3, Q14; 2023-Jun matched Q3, Q9, Q16; 2023-Oct matched Q16, Q17; 2024-Jan matched Q8, Q9. Dropped hints (mechanics-only, verified in QP): 2022-Oct Q2, Q4, Q7, Q10 (mechanics MCQs), Q11 (boat: resultant force/acceleration/power, drag named but no Stokes/viscosity/upthrust reasoning); 2023-Jan Q2, Q5, Q8 (mechanics MCQs), Q11 (projectile), Q13 (equilibrium/CoG), Q17 (High Striker energy); 2023-Jun Q2, Q8 (mechanics MCQs), Q15 (machine velocity), Q19 (crane moments); 2023-Oct Q2, Q7 (mechanics MCQs), Q15 (ladder moments); 2024-Jan Q2, Q6, Q10 (mechanics MCQs), Q12 (projectile), Q14 (slide energy), Q16 (skittle collision). Added by direct reading: 2022-Oct Q3, Q6, Q8, Q12, Q14, Q17; 2023-Jan Q4, Q6, Q9, Q12, Q15(b)(ii), Q18; 2023-Jun Q4, Q10, Q17, Q20; 2023-Oct Q3, Q18; 2024-Jan Q1, Q3, Q7, Q11, Q13, Q15, Q17.

## 2022-Oct

### Q3 (1 mark) — MCQ
- Scenario: objects moving in a fluid.
- Asked: Which best describes the situations in which Stokes' Law applies?
- MS verbatim:
  > 3        C is the correct answer                                                              1
  >          A is incorrect because Stokes' law does not apply to all spheres
  >          B is incorrect because Stokes' law does not apply to all spheres and applies at
  >          all viscosities
  >          D is incorrect because Stokes' law applies at all viscosities
- Guidance notes: distractor analysis shows Stokes applies to small spheres at low speed; viscosity value itself is not the criterion.

### Q5 (1 mark) — MCQ
- Scenario: sample in form of a wire with a large value of the Young modulus.
- Asked: which statement best describes the material?
- MS verbatim:
  > 5        C is the correct answer                                                              1
  >          A is incorrect because Young modulus is not the breaking stress of a material
  >          B is incorrect because Young modulus is not the density of a material.
  >          D is incorrect because Young modulus is not the elastic limit of a material
- Guidance notes: E is defined as ratio of tensile stress to tensile strain; do not confuse with breaking stress, density or elastic limit.

### Q6 (1 mark) — MCQ
- Scenario: rubber band stretched by increasing force then unloaded; returns to original length. Force-extension graph with loop; areas P (between loading curve and axis up to max F), Q (between loading and unloading curves), R (below unloading curve).
- Asked: which area gives the work done in stretching the rubber band up to its maximum extension?
- MS verbatim:
  > 6          B is the correct answer                                                            1
  >            A is incorrect because P is spurious and R is not included
  >            C is incorrect because Q is not included
  >            D is incorrect because R is not included
- Guidance notes: work done stretching = area under loading curve = P + Q; the loop area Q alone is the energy dissipated (hysteresis).

### Q8 (1 mark) — MCQ
- Scenario: one spring stores elastic energy E when stretched by force F; three identical springs in parallel stretched by total force 2F.
- Asked: elastic energy stored in the parallel system?
- MS verbatim:
  > 8          C is the correct answer                                                            1
  >            A is incorrect because the extension is wrong and the force has been neglected
  >            B is incorrect because the force has been neglected, or the extension is wrong
  >            D is incorrect because the extension has been neglected
- Guidance notes: parallel springs share force (each F → each extension x) so 3 × ½Fx = (4/3)E... (printed answer C = 4E/3): each spring takes F/… — key reasoning: same force per spring as original, so per-spring energy E, total 3E when force 2F shared? Use MS wording as printed; distractor notes name the two errors: wrong extension, neglected force.

### Q12 (7 marks) — Young modulus of constantan wire (Core Practical 3 style)
- Scenario: constantan wire, cross-sectional area A = 3.97 × 10⁻⁷ m², unstretched length x = 4.00 m. (a) breaking stress of constantan ≈ 420 MPa; deduce whether wire could support 150 N. (b) force-extension graph plotted; (b)(i) show stiffness ≈ 1.3 × 10⁴ N m⁻¹; (b)(ii) given k = EA/x, determine E.
- Asked: (a) "Deduce whether the wire could support a weight of 150 N." (3); (b)(i) "Show that the stiffness of the wire is about 1.3 × 104 N m–1." (2); (b)(ii) "Determine a value for the Young modulus of constantan using the student's data." (2)
- MS verbatim:
  > 12(a)    Use of σ = F / A                                                                     (1)
  >
  >            σ = 3.8 × 108 Pa [accept N m−2]
  >            Or
  >            Fb = 170 N
  >            Or
  >            Amin = 3.6 × 10−7 m2                                                              (1)
  >
  >            Valid comparison in consistent units and conclusion                               (1)    3
  >
  >            Example of calculation
  >            σ = 150 N ÷ 3.97 × 10−7 m2 = 3.78 × 108 Pa
  >            3.78 < 4.20 ⸫ will not break
  >
  > 12(b)(i)    Determine gradient of straight line section [straight line ends at 5 mm]          (1)
  >            [Δx ≥ 3 mm for gradient][Allow use of tangent at origin]                          (1)    2
  >            k = 1.30 × 104 (N m−1) [acceptable range to be determined at pre-stand]
  >            [1.27 to 1.33][need to see third s.f.]
  >
  >            Example of calculation
  >            gradient = 60 / 4.6 = 13.0
  >            gradient = k / N mm−1
  >            k = 13.0 N mm−1 = 1.30 × 104 N m−1
  >
  > 12(b)(ii)   Use of k = EA/ x                                                                  (1)
  >            E = 1.3 × 1011 Pa [or N m−2](ecf from (b)(i))[their (b)(i) × 1.01 × 107 + unit]   (1)    2
  >
  >            Example of calculation
  >            E=kx/A
  >            E = 1.3 × 104 N m−1 × 4.00 ÷ 3.97 × 10−7 m2
  >            E = 1.3 × 1011 Pa
- Guidance notes: "deduce whether" needs a valid comparison in consistent units + conclusion; unit tolerance σ [accept N m⁻²]; ecf from (b)(i) into (b)(ii); graph gradient requires Δx ≥ 3 mm and third s.f.; mm→m conversion shown explicitly in example.

### Q14 (10 marks) — helium balloon: upthrust and subsequent motion
- Scenario: child holds helium balloon by string; helium less dense than air; mass of balloon and string = 9.20 × 10⁻³ kg, volume = 5.00 × 10⁻² m³, density of air = 1.20 kg m⁻³. (a) resultant force immediately after release (4). (b)* Explain how the forces affect motion as it rises (6, starred).
- Asked: (a) "Calculate the resultant force on the balloon immediately after it is released."; (b) "Explain how the forces acting on the balloon affect its motion as it moves upwards from the moment it is released."
- MS verbatim:
  > 14(a)    Use of upthrust = weight of fluid displaced                                     (1)
  >         Use of ρ = m / V [accept use to calculate density of balloon, 0.184 (kg m−3)]   (1)
  >         [Correct use of ρairgV to find resultant can score MP1 and MP2]                 (1)
  >         Use of W = mg                                                                   (1)    4
  >         Resultant force = 0.5 N
  >
  >           Example of calculation
  >           Upthrust U = 0.05 m3 × 1.20 kg m−3 × 9.81N kg−1 = 0.589 N
  >           Weight W = 9.20 × 10−3 kg × 9.81N kg−1 = 0.090 N
  >           Resultant force = U − W = 0.589 N − 0.090 N = 0.498 N
  >
  > 14(b)*   This question assesses a student's ability to show a coherent and logically structured
  >         answer with linkages and fully-sustained reasoning.
  >         Marks are awarded for indicative content and for how the answer is structured and
  >         shows lines of reasoning.
  >         The following table shows how the marks should be awarded for indicative content and
  >         lines of reasoning.
  >           IC points       IC mark      Max linkage          Max final
  >                                   mark available         mark
  >                 6             4             2                  6
  >                 5             3             2                  5
  >                 4             3             1                  4
  >                 3             2             1                  3
  >                 2             2             0                  2
  >                 1             1             0                  1
  >                 0             0             0                  0
  >          Answer shows a coherent and logical structure with linkages and               2
  >          fully sustained lines of reasoning demonstrated throughout.
  >          Answer is partially structured with some linkages and lines of                  1
  >          reasoning
  >          Answer has no linkages between points and is unstructured                       0
  >         Indicative content:
  >
  >
  >         [Allow "net force" as synonym for "resultant force", accept U, W for upthrust and
  >         weight]
  >
  >             •       Initially there is a resultant upward force
  >                     Or
  >                     Upthrust is greater than weight and initially there is no air resistance [accept
  >                     "drag"]
  >             •       Balloon accelerates (upwards)
  >                     Or
  >                     Balloon moves (up) with increasing velocity/speed
  >             •       (Downward) air resistance force, (initially zero) increases as velocity/speed
  >                     increases. (U and W are constant.)
  >             •       Resultant (upward) force decreases so acceleration decreases                       6
  >             •       (Eventually) resultant force is zero
  >                     Or
  >                     (Eventually) upthrust = weight + drag
  >                     Or
  >                     (Eventually) the forces (on the balloon) are balanced
  >             •       Balloon moves continues to move (upwards) at constant velocity
  >                     Or
  >                     balloon moves (upwards) with terminal velocity/speed
- Guidance notes: upthrust keyword answer is "weight of fluid displaced"; ρairgV route can score MP1 and MP2; starred question uses 6-IC/4-mark/2-linkage table; "net force" allowed as synonym; accept U, W symbols; accept "drag" for air resistance.

### Q17 (9 marks) — foram sinking in seawater: Stokes' law and terminal velocity
- Scenario: foraminifera sink slowly through seawater; laminar flow. (a)(i) spherical foram, mass 1.15 × 10⁻⁸ kg, sinking at terminal velocity, upthrust 4.37 × 10⁻⁸ N; show viscous drag ≈ 7 × 10⁻⁸ N (3). (a)(ii) diameter 9.2 × 10⁻⁴ m, viscosity of seawater 1.41 × 10⁻³ Pa s; calculate terminal velocity (2). (b) water temperature falls with depth; discuss how terminal velocities change (4).
- MS verbatim:
  > 17(a)(i) Use of W = m g                                                                         (1)
  >         Use of Newton first law                                                                (1)
  >         6.9 × 10−8 (N)                                                                         (1)    3
  >
  >            Example of calculation
  >            W = 1.15 × 10−8 kg × 9.81 N kg−1 = 1.13 × 10−7 N
  >            D = W − U = 1.13 × 10−7 N − 4.37 × 10−8 N = 6.91 × 10−8 N
  >
  > 17(a)(ii)   Use of F = 6 π η r v [allow diameter for radius]                                    (1)
  >            Terminal velocity = 5.7 × 10−3 m s−1 (ecf from (a)(i))                              (1)    2
  >            ["show that" value gives 5.73 × 10−3 m s−1]
  >
  >            Example of calculation
  >            D = 6π × 1.41 × 10−3 Pa s × 4.6 × 10−4 m × v = 6.91 × 10−8 N
  >            v = 6.91 × 10−8 N ÷ (6π × 1.41 × 10−3 Pa s × 4.6 × 10−4 m)
  >                    = 5.65 × 10−3 m s−1
  >
  > 17(b)       Viscosity increases (with lower temperature) so drag force increases (for given     (1)
  >            velocity)
  >            OR
  >            Viscosity increases (with lower temperature) so (terminal) velocity slower for             4
  >            given drag force [allow reference to F = 6πη ρ v]
  >
  >            Density increases (with increasing depth) so upthrust increases [ignore "upthrust   (1)
  >            is constant"]
  >            Weight remains constant [do not accept "mass"]                                      (1)
  >            Terminal velocity reduces (with increasing depth) (dependent on MP1 or MP2)         (1)
  >            [accept "constant" velocity]
- Guidance notes: drag at terminal velocity = W − U via Newton's first law; Stokes substitution may use diameter ("allow diameter for radius"); ecf from (a)(i); MP order: viscosity/drag OR viscosity/velocity; then density/upthrust, weight constant (do NOT accept "mass"), final terminal-velocity conclusion DEPENDENT on MP1 or MP2; "constant velocity" accepted; note MS typo "F = 6πη ρ v" printed as allowed reference.

Excluded (Topic 1 mechanics, verified): Q1, Q2, Q4, Q7, Q9, Q10 (MCQs), Q11 (boat F=ma, P=Fv), Q13 (wheelbarrow moments), Q15 (projectile), Q16 (momentum collision), Q18 (N3 pair forces), Q19 (cyclist work/energy).

## 2023-Jan

### Q3 (1 mark) — MCQ
- Scenario: object of mass m on top of a spring; spring compressed further by Δx by vertical force F; force removed, spring returns to original length; object has speed v when Δx = 0.
- Asked: which equation describes the energy transfer as the spring returns to its original length? Options compare FΔx with ½mv² ± mgΔx.
- MS verbatim:
  > 3          The correct answer is B                                                            1
  >
  >            A is not the correct answer because gpe should be added not subtracted on
  >            the right hand side
  >            C is not the correct answer because the total elastic energy is not FΔx and gpe
  >            should be added not subtracted on the right hand side
  >            D is not the correct answer because the total elastic energy is not FΔx
- Guidance notes: elastic energy released as spring extends by Δx is ½FΔx (not FΔx); gain in KE plus gain in gpe: ½FΔx = ½mv² + mgΔx.

### Q4 (1 mark) — MCQ — BORDERLINE (included)
- Scenario: student times a steel ball bearing falling a measured distance in air to determine g.
- Asked: which condition is needed for an accurate value of g?
- MS verbatim:
  > 4          The correct answer is D                                                            1
  >
  >            A is not the correct answer because the drop speed would be too slow if the
  >            flow were laminar
  >            B is not the correct answer because the ball bearing should not be moving at
  >            terminal velocity at all
  >            C is not the correct answer because to calculate g you must know the initial
  >            velocity and the student isn't measuring that
- Guidance notes: BORDERLINE — question centres on measuring g (Topic 1) but the credited answer tests "Air resistance and upthrust should both be negligible", i.e. fluid-force awareness; useful for Topic 2 revision of when drag/upthrust can be ignored.

### Q6 (1 mark) — MCQ
- Scenario: soap bubble blown by the wind; free-body diagram shows wind force P, weight W and upthrust U.
- Asked: which vector diagram shows the resultant force F on the bubble?
- MS verbatim:
  > 6          The correct answer is B                                                            1
  >
  >            A is not the correct answer because the diagram gives the force required for
  >            balance
  >            C is not the correct answer because the diagram gives (W – U) − P
  >            D is not the correct answer because the diagram gives P − (W – U)
- Guidance notes: resultant = vector sum P + (W − U); distractor diagrams correspond to balancing force and sign errors.

### Q9 (1 mark) — MCQ
- Scenario: experiment to determine the Young modulus of copper; known masses added to wire, extensions measured.
- Asked: which OTHER quantities should be measured directly?
- MS verbatim:
  >     9          The correct answer is B                                                                1
  >
  >                A is not the correct answer because the mass is not needed
  >                C is not the correct answer because radius cannot be directly measured and
  >                the mass is not needed
  >                D is not the correct answer because radius cannot be directly measured
- Guidance notes: need diameter (not radius — "radius cannot be directly measured") and original length; mass of wire not needed. Core Practical 3 recall.

### Q12 (6 marks) — falling-ball viscometer
- Scenario: viscosity determined by falling-ball method; at terminal velocity drag force = weight of ball − upthrust; density of liquid known; balance and digital calliper used. (a) describe how to calculate drag force (4); (b) laminar flow; terminal velocity 5.4 × 10⁻⁴ m s⁻¹, radius 0.50 × 10⁻² m, drag force 1.1 × 10⁻² N; calculate viscosity (2).
- MS verbatim:
  > 12(a)
  >             (Use balance to measure) mass and multiply
  >             mass by g to determine weight
  >             Or
  >             Use the balance set to read newtons to determine weight (of ball)                    (1)
  >
  >             Measure the diameter (of the ball) (with the calliper) to determine volume           (1)
  >
  >             Identify upthrust with weight of fluid displaced                                     (1)
  >
  >             Calculate the weight of fluid displaced by multiplying the volume of the ball by
  >             the density of the liquid and g                                                      (1)       4
  >
  > 12(b)       Use of F = 6π ηrv                                                                    (1)
  >             η = 2.2 × 102 Pa s                                                                   (1)       2
  >
  >             Example of calculation
  >             1.1 × 10−2 N = 6π × η × 0.50 × 10−2 m × 5.4 × 10−4 m s−1
  >             η = 1.1 × 10−2 N ÷ (6π × 2.7 × 10−6 m2 s−1) = 216 Pa s
- Guidance notes: upthrust must be identified as "weight of fluid displaced" for its own mark; diameter measured, volume then ρVg; unit of η is Pa s.

### Q14 (7 marks) — compressive stress-strain of a cylindrical rod
- Scenario: metal part in the form of a cylindrical rod, designed to behave elastically under compression. (a) state what is meant by elastic deformation (1); (b) compressive stress-strain graph given (stress axis /10⁸ Pa, strain axis /10⁻³); (b)(i) show Young modulus ≈ 2 × 10¹¹ Pa (2); (b)(ii) part must not compress more than 0.60 mm under 9.5 × 10⁵ N; length 0.84 m, cross-sectional area 4.8 × 10⁻³ m²; deduce whether metal suitable (4).
- MS verbatim:
  > 14(a)       Material returns to original shape/size when stress/force/tension removed     (1)    1
  >
  > 14(b)(i)    Determines gradient using > half drawn line                                   (1)
  >             E = 2.1 × 1011 (Pa)                                                           (1)    2
  >
  >             Example of calculation
  >             Gradient = 4.2 ÷ 2.0 = 2.1
  >             E = 2.1 × (100 MPa ÷ 0.1%) = 2.1 × 1011 Pa
  >
  > 14(b)(ii)   Use of σ = F / A                                                              (1)
  >
  >             Use of E = σ / ε Or Use of graph
  >             And
  >             Use of ε = Δx / x                                                             (1)
  >
  >             Δx = 0.79 mm (allow ecf from (b)(i))
  >             Or
  >             Ereq = 2.8 × 1011 Pa                                                          (1)
  >
  >             Valid comparison in consistent units and conclusion (allow ecf from (b)(i))   (1)    4
  >
  >             Example of calculation
  >             σ = 9.5 × 105 N ÷ 4.80 × 10−3 m2 = 1.98 × 108 Pa
  >             ε = σ ÷ E = 1.98 × 108 Pa ÷ 2.10 × 1011 Pa = 9.42 × 10−4
  >             Δx = 0.84 m × 9.42 × 10−4
  >                     = 7.91 × 10−4 m = 0.79 mm > 0.6 mm ⸫ no
- Guidance notes: elastic deformation definition requires "returns to original shape/size when stress/force/tension removed"; gradient method needs "> half drawn line"; alternative route compares required E with graph E; "deduce" = comparison in consistent units + conclusion, ecf allowed.

### Q15 (14 marks) — trampoline: only (b)(ii) is Topic 2 — BORDERLINE partial inclusion
- Scenario: gymnast on trampoline; (a) maximum upward force (mechanics); (b)(i) tension from vertical component 68 N at 14° (mechanics trig); (b)(ii) extension 4.6 × 10⁻² m, calculate stiffness (2); (c)* forces on gymnast during contact (mechanics).
- Asked: (b)(ii) "Calculate the stiffness of the spring."
- MS verbatim (Materials part):
  > 15(b)(ii)   Use of F = k Δx                                                               (1)
  >             k = 6.1 × 103 N m−1 (allow ecf from (b)(i))                                   (1)     2
  >
  >             Example of calculation
  >             F = 2.81 ×102 N = k × 4.6 × 10−2 m
  >             k = 2.81 ×102 N ÷ 4.60 × 10−2 m = 6.11 × 103 N m−1
- Guidance notes: ecf chain from (b)(i) tension value; Hooke's law mark is for "Use of F = k Δx". Parts (a), (b)(i), (c) are Topic 1 and excluded from Topic 2 notes.

### Q18 (12 marks) — object fallen to seabed; upthrust, turbulent drag, Stokes limitations
- Scenario: object of mass 35 kg fell from a boat to the seabed; volume 1.60 × 10⁻² m³, density of seawater 1.03 × 10³ kg m⁻³. (a)(i) show drag at terminal velocity ≈ 200 N (5); (a)(ii) D = kv² with k = 2.2 N s² m⁻²; determine terminal velocity (2); (a)(iii) two reasons why Stokes' law could not be used (2); (b) diver's lift bag fills with compressed air, accelerates upwards to a maximum velocity; explain (3).
- MS verbatim:
  > 18(a)(i) Use of ρ = m / V                                                      (1)
  >         Identifies upthrust is equal to weight of fluid displaced             (1)
  >         Use of W = m g                                                        (1)
  >         Use of D = W – U                                                      (1)
  >         1.8 × 102 (N)                                                         (1)    5
  >
  >             Example of calculation
  >             m = 1030 kg m−3 × 1.60 × 10−2 m3 = 16.5 kg
  >             U = 16.5 kg × 9.81 N kg−1 = 162 N
  >             W = 35 kg × 9.81 N kg−1 = 343 N
  >             D = W – U = 343 N – 162 N = 181 N
  >
  > 18(a)(ii)    Use of D = k v2                                                   (1)
  >             v = 9.1 m s−1 (allow ecf from (a)(i))                             (1)    2
  >
  >             Example of calculation
  >             D = 181 N = 2.2 N s2 m−2 × v2
  >             v = √(181 N ÷ 2.2 N s2 m−2) = 9.1 m s−1
  >
  > 18(a)(iii)   Object might not be spherical                                     (1)
  >
  >             Flow might not be laminar                                         (1)    2
  >
  > 18(b)        Drag force increases as velocity increases                        (1)
  >             Until drag force plus weight equals upthrust                      (1)
  >             (Resultant force is then zero) so the object stops accelerating   (1)    3
- Guidance notes: MP2 of (a)(i) is the flotation statement "upthrust is equal to weight of fluid displaced"; Stokes' law failure reasons = not spherical + not laminar (i.e. turbulent); rising-object explanation mirrors the sinking one with upthrust > weight + drag.

Excluded (Topic 1 mechanics, verified): Q1, Q2, Q5, Q7, Q8, Q10 (MCQs), Q11 (projectile), Q13 (equilibrium/centre of gravity), Q15(a), Q15(b)(i), Q15(c)*, Q16 (rocket/spacecraft), Q17 (High Striker).

## 2023-Jun

### Q3 (1 mark) — MCQ
- Scenario: force applied to a copper wire; table of length (x or 2x) and diameter (D or 2D).
- Asked: which row gives the greatest extension?
- MS verbatim:
  > 3           C is the correct answer                                                      1
  >             A is incorrect because shorter wire gives less extension
  >             B is incorrect because shorter and thicker wire gives less extension
  >             D is incorrect because thicker wire gives less extension
- Guidance notes: Δx = FL/EA reasoning — longer and thinner gives most extension.

### Q4 (1 mark) — MCQ
- Scenario: linear force-extension graph for a spring (2.5 N at 0.30 m).
- Asked: work done, in joules, to extend the spring by 0.30 m from its original length.
- MS verbatim:
  > 4           B is the correct answer                                                      1
  >             A is incorrect because area under graph is not a rectangle
  >             B is incorrect because work done is not the gradient of the graph
  >             C is incorrect because work done is not the gradient−1 of the graph
- Guidance notes: work done = area under F-x graph = ½FΔx = 0.5 × 0.30 × 2.5. (MS mislabels the explanation lines; the credited option is B, the triangle area.)

### Q9 (1 mark) — MCQ
- Scenario: ball bearing falls at terminal velocity through a liquid; temperature of the liquid increases and terminal velocity becomes greater.
- Asked: which row shows how viscous drag on the ball bearing and viscosity of the liquid change?
- MS verbatim:
  > 9           B is the correct answer                                                      1
  >             A is incorrect because viscosity decreases
  >             C is incorrect because viscosity decreases
  >             D is incorrect because weight of the ball bearing is constant
- Guidance notes: at terminal velocity drag is constant (= weight − upthrust); viscosity of a liquid decreases as temperature increases.

### Q10 (1 mark) — MCQ
- Scenario: two identical springs in series, force 45.0 N, total extension 15 mm.
- Asked: stiffness of EACH spring in N mm⁻¹.
- MS verbatim:
  > 10          D is the correct answer                                                      1
  >             A is incorrect because it would give a result in mm N−1
  >             B is incorrect because two such springs in series would give an extension
  >             of 60 mm for a tension of 45 N, not 15 mm
  >             C is incorrect because it would give a result in mm N−1
- Guidance notes: series springs each extend 7.5 mm under 45 N → k = 45/(2×15) N mm⁻¹; check units (N mm⁻¹ vs mm N⁻¹) is an explicit distractor criterion.

### Q16 (7 marks) — air bubble rising in water: Stokes condition, upthrust, deduce
- Scenario: small, spherical air bubble moves upwards in a glass of water; drag can be calculated using Stokes' law. (a) state the condition needed for Stokes' law to apply (1); (b) bubble moves upwards at constant velocity, volume 5.3 × 10⁻¹¹ m³; (b)(i) show upthrust ≈ 5 × 10⁻⁷ N, density of water = 998 kg m⁻³ (2); (b)(ii) constant velocity 0.035 m s⁻¹; deduce whether Stokes' law applies; ignore weight of bubble; viscosity of water 9.5 × 10⁻⁴ Pa s (4).
- MS verbatim:
  > 16(a)
  >             Flow (around sphere must be) laminar
  >             Or
  >             Flow (around sphere is) not turbulent                                         (1)    1
  >
  > 16(b)(i)
  >             Use of upthrust = weight of displaced fluid                                   (1)
  >
  >             U = 5.2 × 10−7 (N)                                                            (1)    2
  >
  >             Example calculation
  >             U = 5.3 × 10−11 m3 × 998 kg m−3 × 9.81 N kg−1
  >             = 5.19 × 10−7 N
  >
  > 16(b)(ii)
  >                         4
  >             Use of V = 3πr3                                                               (1)
  >
  >             Use of F = 6πηrv                                                              (1)
  >
  >             F = 1.5 × 10−7 N
  >             Or
  >             Required v = 0.12 m s−1
  >             Or
  >             Required V = 2.4 × 10−9 m3
  >             Or
  >             Required r = 8.3 × 10−4 m and r = 2.3 × 10−4 m
  >             Or
  >             Required η = 3.4 × 10−3 Pa s                                                  (1)
  >
  >             Valid conclusion by comparison of relevant student values (ecf from (b)(i))   (1)    4
  >
  >             Example calculation
  >                             4
  >             5.3 × 10−11 m3 = 3πr3
  >                3   3×5.3 × 10−11 m3
  >             r= √          4π
  >                                     = 2.33 × 10−4 m
  >             If Stokes' law applies, F = U
  >             F = 6π × 9.5 × 10−4 Pa s × 2.33 × 10−4 m × 3.50 × 10−2 m s−1
  >                     = 1.46 × 10−7 N ≠ 5.19 × 10−7 N
  >             ⸫ Stokes' law does not apply
- Guidance notes: Stokes condition answer credited as laminar or not turbulent; many alternative comparison routes each earn the third mark; "deduce" needs valid conclusion by comparison, ecf from (b)(i).

### Q17 (8 marks) — floating buoy — MIXED (only (a)(ii) is Topic 2)
- Scenario: buoy held stationary by chain at 33° to vertical; water flow causes horizontal force 260 N. (a)(i) show F ≈ 500 N (2, mechanics trig); (a)(ii) buoy floats due to upthrust; weight of water displaced = 2.9 kN; determine weight of buoy (3); (b) explain how F and θ change when horizontal force increases (3, mechanics).
- MS verbatim (Materials part):
  > 17(a)(ii)
  >             Resolves vertical component of F                                              (1)
  >
  >             Equates vertical forces                                                       (1)
  >
  >             Weight of buoy = 2500 N (ecf from (a)(i))                                     (1)    3
  >
  >             Example calculation
  >             477 N cos 33° = 400 N
  >             400 N + Weight of buoy = 2.9 × 103 N
  >             Weight of buoy = 2900 N − 400 N = 2500 N
- Guidance notes: flotation fact used implicitly: upthrust (2.9 kN, weight of displaced water) balances weight + vertical chain component; "weight of water displaced" given so no separate upthrust-definition mark. Parts (a)(i) and (b) are force-component mechanics; (b) MS wording notes "upthrust and weight are constant" as the reason the vertical component does not change.

### Q20 (14 marks) — actor on cable: yield point, stress, work to break — MIXED
- Scenario: actor in harness connected to cable. (a) state what is meant by the yield point (1); (b)(i) explain why forces cause upward acceleration (2, mechanics); (b)(ii) show tension ≈ 920 N (3, mechanics); (b)(iii) stress must be < 15% of yield point stress (2.5 × 10⁸ Pa); diameter 7.6 × 10⁻³ m; deduce whether safe (4); (c) replacement cable: lower Young modulus, same length, greater diameter, same breaking stress; explain how work done to break differs; both obey Hooke's law up to breaking point (4).
- MS verbatim:
  > 20(a)
  >             Stress (or strain) value at/beyond which a material/object undergoes a
  >             sudden or large plastic deformation                                      (1)    1
  >
  > 20(b)(iii)
  >             Use of A = π r2                                                                 (1)
  >
  >             Use of σ = F ÷ A (ecf from (b)(ii))                                             (1)
  >
  >             Allowed stress (15% yield stress of steel) = 3.8 × 107 Pa
  >             and σ = 2.0 × 107 Pa
  >             Or
  >             (15%)−1 of cable stress = 1.3 × 108 Pa
  >             Or
  >             Max safe tension = 1.7 × 103 N
  >             Or
  >             Min safe diameter = 5.6 × 10−3 m
  >             Or
  >             Percentage of yield stress = 8%
  >             Or
  >             Max safe acceleration = 12.3 m s−2                                              (1)
  >
  >             Valid conclusion by comparison of relevant student values                       (1)    4
  >
  >             Example calculation
  >                                      2
  >                 𝜋𝑑 2    𝜋×(7.6×10−3 m)
  >             A=       =                 = 4.54 × 10−5 m2
  >                  4              4
  >                      917 N
  >             𝜎 = 4.54×10−5 m2 = 2.02 × 107 Pa (show that value gives 2.03 × 107 Pa)
  >                               8               7
  >             0.15 × 2.5 × 10 Pa = 3.75 × 10 Pa
  >             2.03 × 107 Pa < 3.75 × 107 Pa so it is safe.
  >
  > 20(c)
  >             New cable has a greater cross sectional area, (but same breaking stress) so
  >             a greater force is required                                                      (1)
  >
  >             Because new cable has smaller Young modulus, there is a greater strain for
  >             the same stress                                                                  (1)
  >
  >             So (at breaking stress) there will be a greater extension (because cables are
  >             the same length) [dependent on MP2]
  >             Or
  >             Smaller Young modulus implies greater extension (at breaking stress,
  >             because cables are the same length) [independent mark]                           (1)
  >
  >             (And as) force and extension both increase, work done to break the new
  >             cable is greater than that for the original cable [independent mark]             (1)   4
- Guidance notes: yield point = "sudden or large plastic deformation" wording; many alternative comparison quantities each score the penultimate mark in (b)(iii); in (c) MP3 is marked [dependent on MP2] in one route OR [independent mark] in the other; final comparison mark [independent mark]. Parts (b)(i), (b)(ii) are Topic 1.

Excluded (Topic 1 mechanics, verified): Q1, Q2, Q5, Q6, Q7, Q8 (MCQs), Q11 (falling machine), Q12 (diver displacement-time), Q13 (plane momentum), Q14 (projectile), Q15 (ball-machine momentum), Q18* (balloon car N3/N2), Q19 (crane moments).

## 2023-Oct

### Q3 (1 mark) — MCQ
- Scenario: description of the elastic limit of a material.
- Asked: which statement could describe the elastic limit?
- MS verbatim:
  > 3          B is the correct answer                                                        1
  >
  >            A is incorrect because Hooke's law is when force ∝ extension
  >            C is incorrect because the elastic limit relates to what happens when the
  >            deforming force is removed
  >            D is incorrect because this is the breaking stress
- Guidance notes: elastic limit = stress above which material is deformed when the stress is removed (does not return to original); "sudden increase in extension" is the yield point, not the elastic limit.

### Q8 (1 mark) — MCQ
- Scenario: tensile force on metal wire of length x, diameter d gives extension Δx; same force on second wire of same material gives 2Δx.
- Asked: which length/diameter row could be the second wire?
- MS verbatim:
  > 8          A is the correct answer                                                        1
  >
  >            B is incorrect because stress ∝ strain or 𝐹/𝐴 ∝ ∆𝑥/𝑥 or ∆𝑥 ∝ 𝑥/𝑑 2 if 2∆𝑥
  >            then 0.5x / (0.5 d)2 = 2 (x/d2)
  >            C is incorrect because stress ∝ strain or 𝐹/𝐴 ∝ ∆𝑥/𝑥 or ∆𝑥 ∝ 𝑥/𝑑 2 if 2∆𝑥
  >            then 0.5x / (0.5 d)2 = 2 (x/d2)
  >            D is incorrect because stress ∝ strain or 𝐹/𝐴 ∝ ∆𝑥/𝑥 or ∆𝑥 ∝ 𝑥/𝑑2 if 2∆𝑥
  >            then 0.5x / (0.5 d)2 = 2 (x/d2)
- Guidance notes: Δx ∝ x/d² for same material and same force (0.5x with 0.5d gives 2Δx).

### Q16 (11 marks) — electromagnet on steel cable: Young modulus and elastic strain energy — MIXED
- Scenario: electromagnet holds steel object; suspended from support by steel cable. (a) two reasons weight and magnetic force are not an N3 pair (2, mechanics); (b)(i) strain 3.0 × 10⁻⁴; area 5.1 × 10⁻⁴ m², unstretched length 3.8 m, stiffness 2.8 × 10⁷ N m⁻¹; calculate Young modulus (4); (b)(ii) force-extension graph shown (initial force = total weight of electromagnet and object); when electromagnet switched off object falls; student states "the change in elastic strain energy stored in the cable will be transferred to the gravitational potential energy of the electromagnet"; discuss, adding to the graph (5).
- MS verbatim:
  > 16(b)(i)                 Δ𝑥                                                                     (1)
  >             Use of ε =
  >                         𝑥
  >
  >                                      𝐹                                                          (1)
  >             Use of F = kΔx and σ = 𝐴
  >
  >                         𝜎                           𝑘𝑥                                         (1)
  >             Use of E = 𝜀 [allow a method using E = 𝐴 for 3 marks]
  >
  >                                                                                                (1)    4
  >             E = 2.1 × 1011 Pa
  >
  >             Example calculation
  >             Δx = 3 × 10−4 × 3.8 m = 1.14 × 10−3 m
  >             F = 2.8 × 107 N m−1 × 1.14 × 10−3 m = 3.19 × 104 N
  >                 3.19×104 N
  >             σ = 5.1×10−4 m2 = 6.26 × 107 Pa
  >                6.26×107 Pa
  >             E = 3.0×10−4 = 2.09 × 1011 Pa
  >
  > 16(b)(ii)   Area under graph = elastic strain energy (can be indicated on graph)                (1)
  >
  >             Weight of electromagnet is still exerted on cable after object falls (can be
  >             indicated on graph)                                                                 (1)
  >
  >             So change in elastic strain energy = area under graph between total weight
  >             (of electromagnet and steel object) and weight of electromagnet (can be
  >                                                                            1                   (1)
  >             shown on graph or given as an algebraic equivalent using 𝐸𝑒𝑙 = 2 𝐹∆𝑥 )
  >
  >             And change in gravitational potential energy of electromagnet is weight of
  >             electromagnet × change in extension (can be indicated on graph)                     (1)
  >
  >             So the change in elastic strain energy stored > change in gravitational
  >             potential energy of the electromagnet                                               (1)    5
  >
  >             Example of graph
  >                  total weight of
  >                   electromagnet                                      Area of small triangle
  >                 and steel object                                     plus rectangle = change
  >                                                                     in elastic strain energy
  >                       weight of
  >                  electromagnet
  >                                                                      Area of rectangle
  >                                                                      represents change
  >                                                                      in GPE
- Guidance notes: E = kx/A route allowed for 3 marks (one fewer); graph annotation explicitly permitted ("can be indicated on graph"); algebraic ½FΔx equivalence accepted; conclusion is an inequality comparing strain-energy change with GPE change. Part (a) is Topic 1.

### Q17 (14 marks) — weather balloon: upthrust with varying air density
- Scenario: weather balloon carries equipment; upthrust acts; released and accelerates upwards. (a) state what is meant by upthrust (1); (b)(i) initial upward acceleration 4.80 m s⁻²; volume 1.63 m³; density of air at ground level 1.23 kg m⁻³; show weight ≈ 13 N (3); (b)(ii) graph of air density against height (0.80 → 0 kg m⁻³ over 0–40 km); balloon bursts if volume exceeds 50 m³; deduce whether balloon could support equipment at 25 km without bursting (4); (c)* strong-material balloon rises, stops expanding, continues to maximum height; explain how and why velocity changes from release to maximum height; ignore viscous drag (6, starred).
- MS verbatim:
  > 17(a)    An upwards force caused by the displacement of fluid (by an object)
  >         Or
  >         (a force equal and opposite to) the weight of fluid displaced (by an object )
  >                                                                                         (1)    1
  >                       𝑚
  > 17(b)(i)    Use of 𝜌 = 𝑉 and 𝑊 = 𝑚𝑔 to calculate upthrust                                (1)
  >
  >            Use of ΣF = ma                                                               (1)
  >
  >            W = 13.2 (N)                                                                 (1)    3
  >
  >            Example calculation
  >            𝑈 = 1.63 m3 × 1.23 kg m−3 × 9.81 N kg −1 = 19.67 N
  >            Σ𝐹 = 19.67 N − m × 9.81 = m × 4.80 m s−2
  >                          19.7 N
  >            𝑚=                             = 1.346 kg
  >                4.80 N kg −1 + 9.81 m s −2
  >            𝑊 = 1.346 kg × 9.81 N kg −1 = 13.20 N
  >
  > 17(b)(ii)   Density at 25 km = 0.05 kg m−3 (range 0.040 – 0.050 kg m-3)                  (1)
  >
  >            Use of W = mg and ρ = m / V                                                  (1)
  >
  >            Volume required at 25 km = 27 m3 (range 26 m3 to 34 m3) [show that value
  >            gives 26.5 m3] [allow ecf from b(i)]
  >            Or
  >            Upthrust from a balloon of volume 50 m3 at 25 km = 25 N (range 19.6 to
  >            25.0 N)                                                                      (1)
  >
  >            Valid conclusion from comparison of their calculated volume with 50 m3
  >            Or
  >            Valid conclusion from comparison of their calculated upthrust with weight
  >            of balloon                                                                   (1)    4
  >
  >            Example calculation
  >            Upthrust required = 13.2 N = 0.05 kg m−3 × 9.81 N kg−1 × V
  >            V = 13.2 N ÷ 0.491 N m−3 = 26.9 m3
  >            26.9 m3 < 50 m3 so yes
  >
  > *17(c)   [standard IC table: 6 IC points, IC mark 4, max linkage 2, max final 6]
  >         Indicative content:
  >
  >         IC1 (When the balloon is released) upthrust greater than weight
  >
  >         IC2 the resultant force is upward
  >
  >         IC3 Velocity of balloon increases
  >             Or balloon accelerates (upwards)
  >
  >         IC4 (after balloon is at maximum volume) Upthrust decreases as height
  >             increases (because density of surrounding air decreases)
  >
  >         IC5 Until upthrust is less than weight so there is a resultant force
  >             downwards
  >
  >         IC6 Velocity of balloon then decreases to zero                                             6
  >             Or balloon then decelerates to rest.
  >
  >         [Ignore references to viscous drag.]
- Guidance notes: upthrust definition accepts "upwards force caused by displacement of fluid" OR "weight of fluid displaced"; reading ranges printed for graph values; ecf chain allowed; starred (c) uses the 6-IC table; note "[Ignore references to viscous drag.]" — drag discussion neither required nor penalised here.

### Q18 (13 marks) — data-logger falling ball: Stokes conditions, viscosity from graph, temperature
- Scenario: data logger records motion of ball-bearing falling through liquid; displacement-time graph given (curved rising to straight line). (a) state conditions for Stokes' law (2); (b)(i) explain shape of graph (3); (b)(ii) diameter 1.6 mm; difference between upthrust and weight is 1.45 × 10⁻⁴ N; calculate viscosity assuming Stokes' law applies (4); (b)(iii) liquid heated; ball took less time to fall; explain why; density of liquid constant (4).
- MS verbatim:
  > 18(a)    Small spherical object
  >         Or
  >         Spherical object moving at low speed                                               (1)
  >
  >             Laminar flow [allow non-turbulent flow]                                        (1)    2
  >
  > 18(b)(i)     Max 3
  >
  >             Initially the velocity is zero so gradient is zero                             (1)
  >
  >             As velocity increases the gradient changes                                     (1)
  >
  >             As velocity increases, drag increases                                          (1)
  >
  >             Until terminal / constant velocity when the gradient becomes constant.         (1)    3
  >
  >             [If no other mark scored, allow 1 mark for velocity increases until terminal
  >             velocity is reached.]
  >
  > 18(b)(ii)    Determines radius of ball bearing                                              (1)
  >
  >             Determines gradient                                                            (1)
  >                                                                                                   4
  >             Use of F = 6πηrv                                                               (1)
  >
  >             η = 0.046 (Pa s) [allow a range from 0.044 (Pa s) to 0.048 (Pa s)]             (1)
  >
  >             Example calculation
  >                      1.6×10−3 m
  >             Radius =             = 8 × 10−4 m
  >                           2
  >                           11.5
  >             Gradient = 1.15−0.60 = 20.9
  >                            −1
  >             𝑣 = 0.209 m s
  >                          1.45 × 10−4 N
  >             𝜂=                                     = 0.0460 Pa s
  >                 6𝜋 × 8 × 10−4 m × 0.209 m s−1
  > 18(b)(iii)   At higher temperature the viscosity will be less                               (1)
  >
  >             F = 6πηrv and r is constant                                                    (1)
  >
  >             Drag force is less (at a given speed)
  >             Or
  >             Drag force (at terminal velocity) is unchanged                                 (1)
  >
  >             Terminal velocity is greater (and ball-bearing takes less time to fall)        (1)    4
- Guidance notes: conditions = small/spherical + low speed, and laminar flow [allow non-turbulent]; drag-vs-upthrust difference given, so η found from gradient of terminal (force, velocity) graph with printed acceptable range; heating answer credits "drag force (at terminal velocity) is unchanged" route as well as "drag less at given speed" route.

Excluded (Topic 1 mechanics, verified): Q1, Q2, Q4, Q5, Q6, Q7, Q9, Q10 (MCQs), Q11 (rocket), Q12 (momentum), Q13 (projectile), Q14 (exercise machine power), Q15 (ladder moments).

## 2024-Jan

### Q1 (1 mark) — MCQ
- Scenario: SI unit for stress.
- MS verbatim:
  > 1          D is the correct answer                                                                1
  >
  >            A is not correct because this is the unit for mass divided by area
  >            B is not correct because this is the unit for area divided by mass
  >            C is not correct because this is equivalent to 1 Pa−1
- Guidance notes: stress unit = N m⁻² (= Pa).

### Q3 (1 mark) — MCQ
- Scenario: spring stretched by 3.0 N; elastic strain energy stored 0.04 J.
- Asked: which expression gives the extension in m?
- MS verbatim:
  > 3          A is the correct answer                                                                1
  >
  >            B is not correct because the answer should not be square rooted
  >            C is not correct because the answer is inverted and should not be square rooted
  >            D is not correct because the answer is inverted
- Guidance notes: ΔEel = ½FΔx → Δx = 2 × 0.04 / 3.0; no square root.

### Q7 (1 mark) — MCQ
- Scenario: graph of APPLIED FORCE (y-axis) against LENGTH OF SPRING (x-axis).
- Asked: which gives the stiffness of the spring?
- MS verbatim:
  > 7          C is the correct answer                                                                1
  >
  >            A is not correct because this would give the work done to stretch the spring
  >            B is not correct because an area on this graph would represent an energy
  >                                                                   1
  >            D is not correct because it would give an answer of
  >                                                                𝑘
- Guidance notes: stiffness = gradient of a force–length graph; note the axes — if the graph were length against force the answer would be 1/gradient (common trap, cf. Q12 2022-Oct(b)(i) style).

### Q8 (1 mark) — MCQ
- Scenario: solid cube of weight W made from material with density ρ.
- Asked: expression for the length of each side of the cube.
- MS verbatim:
  > 8          D is the correct answer                                                                1
  >
  >            A is not correct because the answer is inverted and should not be cubed
  >            B is not correct because the answer is inverted
  >            C is not correct because the answer should not be cubed
- Guidance notes: W = mg = ρVg = ρL³g → L = cuberoot(W/(ρg)).

### Q9 (1 mark) — MCQ
- Scenario: two wires P and Q of different metals stretched until they break; stress-strain graphs shown (P ends at lower stress and lower strain than Q; P has steeper initial gradient).
- Asked: which statement is correct?
- MS verbatim:
  > 9          C is the correct answer                                                                 1
  >
  >            A is not correct because P has a smaller breaking stress than Q
  >            B is not correct because P has a smaller breaking strain than Q
  >            D is not correct because graph P has an initial gradient greater than graph Q
- Guidance notes: read breaking stress = stress at break; breaking strain = strain at break; E = initial gradient of stress-strain graph.

### Q11 (4 marks) — rubber band loading/unloading: hysteresis
- Scenario: force F applied to rubber band, extension Δx measured as F increased then decreased; F-Δx loop graph printed (1 cm² ≡ 0.5 N × 0.005 m).
- Asked: (a) "State how the graph shows that the rubber band deformed elastically." (1); (b) work done increasing F > work done by rubber band decreasing; difference because heating occurred; "Determine the energy that caused heating as F was increased and then decreased to zero." (3)
- MS verbatim:
  > 11(a)      When the force was removed the rubber band returned to its original length.
  >           Or
  >           When the force was removed the extension was 0.
  >           Or
  >           The decreasing force line returns to the origin.                                 (1)    1
  >
  > 11(b)      Indication that Eel = area under force-extension graph.                          (1)
  >
  >            Uses area between graph lines to determine energy.                               (1)
  >
  >            Energy = 0.048 J (allow a range from 0.0425 J to 0.053 J)                        (1)    3
  >
  >            Example of calculation
  >            1 cm2 on graph ≡ 0.5 N × 0.005 m = 0.0025 J
  >
  >            Area between graphs ≈ 19 cm2
  >
  >            Energy that caused heating = 19 cm2 × 0.0025 J cm−2 = 0.0475 J
- Guidance notes: elastic deformation read off the LOOP (unloading line returns to origin); energy dissipated = area between loading and unloading lines (loop area); counting-squares method with graph-scale conversion.

### Q13 (3 marks) — cartesian diver: upthrust and weight
- Scenario: cartesian diver (tube with trapped air) inside sealed bottle of water; squeezing the bottle forces more water into the tube and the volume of trapped air decreases.
- Asked: "Explain why the cartesian diver accelerates downwards."
- MS verbatim:
  > 13         (As the volume of the air bubble decreases) the upthrust (of the bubble)
  >           decreases
  >           Or
  >           (As water enters the diver) the weight (of the tube, air bubble and water
  >           inside) increases.                                                          (1)
  >
  >           (So) weight is greater than upthrust.                                       (1)
  >
  >           (So) there is a resultant force downwards.                                  (1)    3
  >
  >           If no other mark scored, allow one mark for the density of the diver
  >           becomes greater than the density of water.
- Guidance notes: either upthrust-decreases route or weight-increases route earns MP1; density argument only credited as a fallback (1 mark max).

### Q15 (10 marks) — falling-ball viscosity with glycerol deduce — Core Practical 2
- Scenario: small ball-bearings falling through a liquid to determine viscosity. (a) state conditions needed for Stokes' law to apply to this investigation (2); (b)(i) complete the free-body force diagram for a ball-bearing at terminal velocity (drag force arrow given) (2); (b)(ii) terminal velocity 0.0824 m s⁻¹; density of glycerol 1.26 × 10³ kg m⁻³; radius of ball-bearing 2.30 mm; weight of ball-bearing 4.00 × 10⁻³ N; viscosity of glycerol at room temperature 0.934 Pa s; deduce whether the liquid was glycerol (6).
- MS verbatim:
  > 15(a)       Moving at low speed                                                           (1)
  >
  >             Laminar flow
  >             Or Flow not turbulent                                                         (1)    2
  > 15(b)(i)    Upwards arrow labelled upthrust or U, and downward arrow labelled weight
  >             or W or mg. Both arrows start from dot.
  >                                                                                           (1)
  >             Length of weight arrow ≈ length of drag arrow + length of upthrust arrow
  >
  >             Example diagrams
  >                                                       Upthrust
  >             Drag force                  Drag force                                        (1)    2
  >
  >                              Upthrust
  >
  >
  >                          Weight
  >                                                       Weight
  >
  >
  > 15(b)(ii)   Calculates volume of sphere                                                   (1)
  >                         𝑚
  >             Use of 𝜌 = 𝑉                                                                  (1)
  >
  >             Use of 𝑊 = 𝑚𝑔                                                                 (1)
  >
  >             Use of weight = upthrust + viscous drag                                       (1)
  >
  >                                                                                           (1)
  >             Use of viscous drag= 6π𝜂𝑟𝑣
  >
  >             𝜂 is 0.94 (Pa s) ≈ 0.93 (Pa s) valid conclusion based on comparison of 0.94
  >                                                                                          (1)    6
  >             with value supplied in question.
  >
  >             Example of calculation
  >                 4
  >             𝑉 = × π × (2.3 × 10−3 m)3 = 5.10 × 10−8 m3
  >                 3
  >
  >             𝑚 = 1.26 × 103 kg m−3 × 5.10 × 10−8 m3 = 6.43 × 10−5 kg
  >
  >             Weight of liquid displaced = 6.43 × 10−5 kg × 9.81 N kg −1
  >                            = 6.31 × 10−4 N
  >
  >             viscous drag = 6.31 × 10−4 N − 4.00 × 10−3 N = 3.37 × 10−3 N
  >
  >                             3.37 × 10−3 N
  >             𝜂=                                      = 0.943 Pa s
  >                  6 π × 2.3 × 10−3 m × 0.0824 m s −1
- Guidance notes: force diagram marks are printed (arrows from dot, correct labels, arrow-length relationship W = drag + upthrust); deduce chain: V = (4/3)πr³ → m = ρV → weight of displaced liquid = upthrust → drag = upthrust − weight... (note: printed example computes drag = weight − upthrust sign convention from W = upthrust + drag) → η = drag/(6πrv) → compare with 0.934 Pa s.

### Q17 (11 marks) — Young modulus of a wire (Core Practical 3) — technique + deduce
- Scenario: vernier-scale Young modulus experiment with reference wire; 100 g mass hanger; force-extension graph plotted. (a) micrometer: describe how to check the wire is uniform and has circular cross-section (2); (b)(i) explain one other safety precaution (2); (b)(ii) explain why vernier scale rather than metre rule (2); (c) graph Δx/mm against F/N; Young modulus table (Aluminium 68 GPa, Brass 106 GPa, Steel 200 GPa); original length 1.80 m, diameter 0.17 mm; deduce which material (5).
- MS verbatim:
  > 17(a)       Measure (diameter) at several positions along the wire                        (1)
  >
  >             Measure (diameter) at several orientations
  >                                                                                           (1)    2
  >
  > 17(b)(i)    (Safety) goggles should be worn                                               (1)
  >
  >             (Because) the wire could break.                                               (1)    2
  >
  > 17(b)(ii)   The vernier scale has a better resolution
  >             Or
  >             The vernier scale has a resolution of 0.1 mm                                  (1)
  >
  >             There is a smaller (percentage) uncertainty (when using the vernier scale).   (1)    2
  >
  > 17(c)       EITHER
  >
  >             Use of 𝐴 = 𝜋𝑟 2                                                               (1)
  >
  >             Use of ∆𝜎 =
  >                            ∆𝐹
  >                               with initial force greater than 0 N                         (1)
  >                           𝐴
  >
  >                           ∆𝑥                                                             (1)
  >             Use of ∆𝜀 = 𝑥
  >
  >             Use of 𝐸 = ∆𝜀
  >                           ∆𝜎                                                             (1)
  >
  >             E = 107 (GPa) ≈ 106 (GPa) so material is brass                                (1)
  >             OR
  >
  >             Use of 𝐴 = 𝜋𝑟 2                                                               (1)
  >             Determines gradient of graph                                                  (1)
  >                        𝑥
  >             Calculates 𝐴                                                                  (1)
  >
  >             Use of 𝐸 = ∆𝜀
  >                           ∆𝜎                                                             (1)
  >
  >                                                                                          (1)    5
  >             E = 107 (GPa) ≈ 106 (GPa) so material is brass
  >
  >             Example of calculation
  >                                      2
  >                       0.17 × 10−3 m
  >             𝐴 = π×(                 ) = 2.27 × 10−8 m2
  >                             2
  >                       14 N
  >             ∆𝜎 =                  = 6.17 × 108 Pa
  >                  2.27 × 10−8 m2
  >                  0.0104 m
  >             ∆𝜀 =            = 5.78 × 10−3
  >                   1.80 m
  >
  >                 6.17 × 108 Pa
  >             𝐸=                 = 1.07 × 1011 Pa
  >                 5.78 × 10−3
  >
  >             107 GPa ≈ 106 GPa so material is brass.
- Guidance notes: uniformity = several positions along wire; circularity = several orientations; safety precaution must have a REASON (goggles because wire could break); vernier justification = resolution 0.1 mm → smaller percentage uncertainty; E computed from Δσ/Δε (with initial force greater than 0 N) OR from gradient × x/A; conclusion compares to the table.

Excluded (Topic 1 mechanics, verified): Q2, Q4, Q5, Q6, Q10 (MCQs), Q12 (projectile), Q14 (child on slide), Q16 (skittle collision), Q18 (door hinges moments).

## Cross-session observations (2022-Oct → 2024-Jan)

### Recurring set-ups (scenario templates)
- Falling sphere in a liquid (Core Practical 2 family): 2022-Oct Q17 (forams in seawater), 2023-Jan Q12 (falling-ball viscometer), 2023-Oct Q18 (data-logger ball-bearing), 2024-Jan Q15 (glycerol deduce). Every session in this window has one. Variants: calculate η from terminal velocity; calculate v from η; explain graph shape; temperature effect on η and terminal velocity; "deduce whether the liquid was X".
- Rising object in a liquid: 2023-Jun Q16 (air bubble, deduce whether Stokes applies), 2024-Jan Q13 (cartesian diver), 2023-Jan Q18(b) (lift bag rising to maximum velocity).
- Upthrust in AIR with a balloon: 2022-Oct Q14 (helium balloon release), 2023-Oct Q17 (weather balloon, density of air decreasing with height). Both have a 6-mark starred "explain the motion" part.
- Flotation: 2023-Jun Q17 (buoy, weight of water displaced given), plus flotation statements inside falling/rising questions ("upthrust is equal to weight of fluid displaced" as a credited MS line in 2023-Jan Q18(a)(i)).
- Young modulus of a wire (Core Practical 3 family): 2022-Oct Q12 (constantan, k = EA/x route), 2023-Oct Q16(b)(i) (from strain + stiffness), 2024-Jan Q17 (vernier experiment, deduce material from table). MCQ versions: 2023-Jan Q9 (measure diameter + original length), 2023-Jun Q3 (longer/thinner wire extends more), 2023-Oct Q8 (Δx ∝ x/d²).
- Force-extension graphs: 2022-Oct Q6 (rubber-band loop areas MCQ), 2023-Jun Q4 (area = work done MCQ), 2022-Oct Q12(b)(i) (gradient = stiffness, mm conversion), 2024-Jan Q11 (hysteresis loop, energy = area between lines), 2023-Oct Q16(b)(ii) (strain-energy change on unloading with graph annotation).
- Stress-strain: 2023-Jan Q14 (compressive, show E from gradient + deduce suitability), 2024-Jan Q9 (breaking stress/strain/yield stress/gradient MCQ), 2023-Jun Q20(b)(iii) (stress vs % of yield point stress).
- Spring combinations / stiffness: 2023-Jun Q10 (series MCQ), 2022-Oct Q8 (parallel MCQ), 2023-Jan Q3 (energy on release MCQ), 2024-Jan Q3 (Δx from ΔEel MCQ), 2024-Jan Q7 (stiffness from force-length graph MCQ), 2023-Jan Q15(b)(ii) (trampoline spring stiffness).
- Definitions asked as 1-markers: elastic deformation (2023-Jan Q14(a)), yield point (2023-Jun Q20(a)), upthrust (2023-Oct Q17(a)), Stokes conditions (2023-Oct Q18(a), 2023-Jun Q16(a), 2024-Jan Q15(a)).

### Exact recurring mark-scheme wordings (seen more than once)
- "Use of upthrust = weight of fluid displaced" / "upthrust is equal to weight of fluid displaced" / "weight of displaced fluid" (2022-Oct 14(a), 2023-Jan 12(a), 2023-Jan 18(a)(i), 2023-Jun 16(b)(i)).
- Upthrust definition credit variants: "An upwards force caused by the displacement of fluid (by an object)" OR "(a force equal and opposite to) the weight of fluid displaced (by an object)" (2023-Oct 17(a)).
- Stokes conditions pair: laminar side — "Laminar flow / Or Flow not turbulent" (2023-Jun 16(a), 2023-Oct 18(a), 2024-Jan 15(a)); object side — "Small spherical object / Or Spherical object moving at low speed" (2023-Oct 18(a)); MCQ distractor analysis "Stokes' law does not apply to all spheres" (2022-Oct Q3).
- "Use of F = 6πηrv" appears in every calculated-viscosity or calculated-velocity item (2022-Oct 17(a)(ii), 2023-Jan 12(b), 2023-Jun 16(b)(ii), 2023-Oct 18(b)(ii), 2024-Jan 15(b)(ii)); bracket note "[allow diameter for radius]" (2022-Oct 17(a)(ii)).
- Terminal-velocity force balance: "drag force = weight of ball – upthrust" (2023-Jan Q12 stem) / "Use of D = W – U" (2023-Jan 18(a)(i)) / "weight = upthrust + viscous drag" (2024-Jan 15(b)(ii)).
- Temperature-viscosity: "Viscosity increases (with lower temperature)" (2022-Oct 17(b)) and "At higher temperature the viscosity will be less" (2023-Oct 18(b)(iii)) — inverse statements credited in opposite directions; MCQ "viscosity decreases" (2023-Jun Q9).
- "drag force increases as velocity increases ... stops accelerating" explanation: 2023-Jan 18(b) "Until drag force plus weight equals upthrust / (Resultant force is then zero) so the object stops accelerating"; 2022-Oct 14(b)* "(Eventually) upthrust = weight + drag ... (Eventually) the forces (on the balloon) are balanced ... terminal velocity/speed"; 2023-Oct 17(c) IC6 "Velocity of balloon then decreases to zero".
- "Valid comparison in consistent units and conclusion" (2022-Oct 12(a), 2023-Jan 14(b)(ii)) and "Valid conclusion by comparison of relevant student values" (2023-Jun 16(b)(ii), 20(b)(iii); 2023-Oct 17(b)(ii)) — the standard deduce-whether 3-part pattern: use of formula(s) → computed comparison value → conclusion.
- "Material returns to original shape/size when stress/force/tension removed" (2023-Jan 14(a); same idea credited in 2024-Jan 11(a) as "returned to its original length / decreasing force line returns to the origin").
- "Area under graph = elastic strain energy" (2023-Oct 16(b)(ii); 2024-Jan 11(b) "Eel = area under force-extension graph"; MCQ 2023-Jun Q4 area triangle).

### Mark-scheme conventions observed
- MP numbering with (1) per mark; totals at the row end e.g. "(1)    3".
- Square brackets = examiner notes: [accept ...], [allow ...], [do not accept ...], [ignore ...]. Seen: "[allow diameter for radius]", "[do not accept "mass"]" (2022-Oct 17(b) weight statement), "[ignore "upthrust is constant"]", "[Ignore references to viscous drag.]" (2023-Oct 17(c)), "[accept "constant" velocity]", "[allow non-turbulent flow]".
- Dependent marks printed in the MS: "(dependent on MP1 or MP2)" (2022-Oct 17(b) terminal-velocity conclusion), "[dependent on MP2]" and "[independent mark]" (2023-Jun 20(c)), "(dependent on MP3)" (2023-Jan 16 direction of velocity), "Max 3" caps with fallback "If no other mark scored, allow 1 mark for..." (2023-Oct 18(b)(i)).
- ecf is pervasive inside Materials calculations: "(ecf from (a)(i))" (2022-Oct 17(a)(ii)), "(allow ecf from (b)(i))" (2023-Jan 15(b)(ii), 14(b)(ii)), "(ecf from (b)(ii))" (2023-Jun 20(b)(iii)), "[allow ecf from b(i)]" (2023-Oct 17(b)(ii)).
- Deduce-whether questions always award a separate mark for EACH valid alternative comparison route ("Or" lists of 5-6 acceptable quantities, e.g. 2023-Jun 16(b)(ii), 20(b)(iii); 2023-Oct 17(b)(ii)).
- Units: Pa vs N m⁻² interchangeable for stress/Young modulus ("[accept N m−2]", "[or N m−2]"); viscosity unit Pa s; k in N m⁻¹ with mm→m conversion shown in example calculations (2022-Oct 12(b)(i) "k = 13.0 N mm−1 = 1.30 × 104 N m−1").
- "show that" answers need one more s.f. and a printed reverse-check line: "["show that" value gives 5.73 × 10−3 m s−1]" (2022-Oct 17(a)(ii)), "(show that value gives 2.03 × 107 Pa)" (2023-Jun 20(b)(iii)), "[show that value gives 26.5 m3]" (2023-Oct 17(b)(ii)).
- Graph-value tolerances printed as ranges: "η = 0.046 (Pa s) [allow a range from 0.044 (Pa s) to 0.048 (Pa s)]" (2023-Oct 18(b)(ii)); "Density at 25 km = 0.05 kg m−3 (range 0.040 – 0.050 kg m-3)" (2023-Oct 17(b)(ii)); "Energy = 0.048 J (allow a range from 0.0425 J to 0.053 J)" (2024-Jan 11(b)); "T = 70 N (allow range of 65 to 75 N)" (2023-Oct 14(a)).
- Starred (extended-writing) Materials questions use the fixed 6-IC table (IC points 6→IC mark 4→max linkage 2→max final 6): 2022-Oct 14(b)*, 2023-Oct 17(c)*. Materials IC content chains: upthrust vs weight → acceleration → resistive/upthrust change → resultant decreases → balance → constant/maximum velocity (or deceleration to rest).
- MCQ rows always give the credited letter plus one-line "is incorrect because ..." physics reason per distractor — usable directly as misconception lists (e.g. "Young modulus is not the breaking stress of a material", "radius cannot be directly measured", "work done is not the gradient of the graph").
- "allow" notes for alternative physics routes: "[allow use of tangent at origin]" (2022-Oct 12(b)(i)), "[allow a method using E = kx/A for 3 marks]" (2023-Oct 16(b)(i)), "allow one mark for the density of the diver becomes greater than the density of water" (2024-Jan Q13 fallback), "[Correct use of ρairgV to find resultant can score MP1 and MP2]" (2022-Oct 14(a)).
- Formula list printed on the data page each session: Density ρ=..., Stokes' law F = 6πηrv, Hooke's law ΔF = kΔx, Elastic strain energy ΔEel = ½FΔx, Young modulus E = ..., Stress σ = F/A, Strain ε = Δx/x — so MS "Use of ..." marks correspond to these listed equations.
- Mixed Topic1/Topic2 questions are common in Section B (trampoline Q15 2023-Jan, buoy Q17 2023-Jun, actor cable Q20 2023-Jun, electromagnet Q16 2023-Oct): Materials parts are self-contained with their own ecf chains, so they can be revised in isolation; mechanics parts (tension, components, moments) are usually the first half of the mark tariff.

