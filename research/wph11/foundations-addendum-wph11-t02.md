# WPH11 Unit 1 — Topic 2 (Materials)

## Foundations addendum — teach the ropes before the scenarios — DRAFT 1 for review

**What this file is (read this first — this part is not notes content).** The approved Topic 2 draft opens each topic area with a handful of compressed bullets and then goes straight into scenario build-ups. Working through it with the owner exposed the gap: the scenarios assume the ropes are already known, and the ropes were never taught. Two examples of what the owner got stuck on: the interplay between the density of the fluid, the density of the object and the submerged volume ("a change in either affects each other" — how exactly?), and the fact that mark schemes phrase the outcome as "floats higher" or "needs to displace a smaller volume" rather than the vague "it sinks". This addendum supplies that missing layer: a general foundations section covering everything about density, where upthrust comes from, the floating balance, a systematic map of what changes what, and the exact wordings mark schemes accept. Scenarios stay after it, unchanged in position, and become easier to follow.

**Where it slots.** These sections replace the current `## Density` bullet list in the approved draft and sit **before** `## Upthrust and flotation`. The calculation bullets from the old Density section (sphere and cylinder volumes, unit conversions, the Q = Av flow bullet) are carried over at the end of the new Density section so nothing is lost. All existing scenario build-ups stay where they are, after the foundations.

**Evidence trail.** Every accepted wording quoted below is printed mark scheme or Principal Examiner's report wording, located in the tracked corpus: the hydrometer question (digest-C.md lines 69–72), the upthrust definition (digest-B.md lines 91 and 246), the submarine question (digest-C.md line 164), the sinking spheres in colder deeper water (digest-A.md line 61), the weather balloon (digest-B.md lines 91–95), the Cartesian diver (digest-B.md lines 161–162). As with the approved draft, session tags stay out of the notes content and live in this trail.

---

## Density — the full picture

Specification point: be able to use the equation density $\rho = \frac{m}{V}$

- **$\rho = \frac{m}{V}$** — The density of a material = the mass of a sample of the material ÷ the volume of that sample.
- Read the equation as a sentence: density asks how much mass is packed into each cubic metre of the material. A dense material packs a lot of mass into a small space.
- The unit of density = $\text{kg m}^{-3}$; $1\ \text{g cm}^{-3} = 1000\ \text{kg m}^{-3}$.
- Reference values to memorise (in $\text{kg m}^{-3}$): air ≈ 1.2, ice ≈ 920, water ≈ 1000 (printed values in questions are usually 997 to 1000), sea water ≈ 1025, steel ≈ 7800, lead ≈ 11 300.
- Sense-check every calculated density against these values. A "density of water" of 0.001 kg m⁻³ or 100 000 kg m⁻³ is a power-of-ten slip, not physics; unit and power-of-ten slips are named as a recurring error in the examiner reports.
- Density is a property of the **material**: it does not change when the size or the shape of the sample changes. A half-length wire has the same density as the full-length wire.
- Contrast (learn this pair, it is examined): density belongs to the material; stiffness belongs to the object, so stiffness changes when the dimensions change.
- The density of an **object** can differ from the density of the material it is made of: the density of the object = its total mass ÷ its total volume, and the total volume includes any air inside it.
- **Average density** $\rho_{\text{avg}} = \frac{m_{\text{total}}}{V_{\text{total}}}$ — for a hollow or composite object, the density to use in any floating argument = the average density. A ship is made of steel (ρ ≈ 7800 kg m⁻³) and still floats, because the air inside the hull pulls the average density below the density of water.
- Every floating argument in this topic compares two densities: the density of the object (its average density if it is hollow) and the density of the fluid.
- Measuring the density of a regular solid: measure the mass with a balance; measure the dimensions (the diameter of a sphere with a calliper), then compute the volume from the dimensions.
- Measuring the density of a liquid: measure the mass of a measured volume, then $\rho = \frac{m}{V}$; the volume of a liquid is read from a measuring cylinder.
- <span style="color:#b91c1c">Not accepted:</span> reading the calliper as if it measured the radius. The calliper measures a diameter; halve it yourself ($r = \frac{d}{2}$). The examiner report calls this "a common misconception".
- Volume formulas (carried over from the approved draft): the volume of a sphere = $\frac{4}{3}\pi r^3$; the volume of a cylinder = π × the radius squared × the length ($V = \pi r^2 l$); the volume of a rectangular block = length × width × height.
- Conversions (carried over): convert cm³ to m³ by dividing by 1 000 000; convert mm to m by dividing by 1 000.
- If the question gives the weight $W$ of the sample, find the mass first: $m = \frac{W}{g}$.

## Fluids and upthrust — where the force comes from

Specification point: understand how to use the relationship upthrust = weight of fluid displaced

- A fluid = a liquid or a gas. Fluids exert forces on any object placed in them.
- **Upthrust** is an upward force that a fluid exerts on an object placed in the fluid.
- Why the force points upward: the fluid presses on every surface of the object, and the press is larger on the deeper surfaces. The bottom of the object is pushed up harder than the top is pushed down, so the net push from the fluid is upward. This pressure picture fixes the direction; the equation that mark schemes reward comes from displacement, in the next bullets.
- **$U = W_{\text{fluid displaced}}$** — The upthrust on an object = the weight of the fluid the object displaces.
- **Displacement** means the fluid that had to move out of the way because the object now occupies that space. The word is compulsory in definitions and explanations; see the phrasing section.
- **$U = \rho_{\text{fluid}} \times V_{\text{disp}} \times g$** — The weight of the displaced fluid = the density of the fluid × the displaced volume × g.
- Ownership of the variables (this is the key to the whole topic): the upthrust depends on the **fluid** (its density) and on **how much of the object is in the fluid** (the submerged volume). The density of the object appears nowhere in the upthrust equation.
- The displaced volume = the submerged volume ($V_{\text{disp}} = V_{\text{sub}}$). For a fully submerged object, the displaced volume = the whole volume of the object ($V_{\text{disp}} = V_{\text{object}}$).
- The upthrust is set by the **weight** of displaced fluid, not its mass: compute the displaced mass first ($m_{\text{disp}} = \rho_{\text{fluid}} \times V_{\text{sub}}$), then multiply by g.
- The apparent weight of an object under water = the weight of the object − the upthrust on it ($W_{\text{app}} = W - U$).
- <span style="color:#b91c1c">Not accepted:</span> "replacement" written for "displacement"; the examiner report states alternatives "were not sufficient".
- <span style="color:#b91c1c">Not accepted:</span> a definition of upthrust with no mention of displacement. The printed definition is "an upwards force caused by the displacement of fluid (by an object)", and the examiner report records that only a small proportion of candidates could state what is meant by upthrust.

## The floating balance

- A floating object is in equilibrium, so the resultant force on it = zero.
- **$U = W$** — For a floating object, the upthrust on it = the weight of the object.
- **$W_{\text{fluid displaced}} = W_{\text{object}}$** — A floating object displaces a weight of fluid equal to its own weight. This is the sentence to memorise: a floating object displaces its own weight of fluid.
- Where the fraction rule comes from (follow the three steps):
  1. Write both sides: $U = \rho_{\text{fluid}} \times V_{\text{sub}} \times g$ and $W = \rho_{\text{object}} \times V_{\text{object}} \times g$.
  2. Floating makes them equal, and g cancels: $\rho_{\text{fluid}} \times V_{\text{sub}} = \rho_{\text{object}} \times V_{\text{object}}$.
  3. **$\frac{V_{\text{sub}}}{V_{\text{object}}} = \frac{\rho_{\text{object}}}{\rho_{\text{fluid}}}$** — The fraction of a floating object that is submerged = the density of the object ÷ the density of the fluid.
- Worked fraction: ice (ρ ≈ 920 kg m⁻³) floating in sea water (ρ ≈ 1025 kg m⁻³) gives $\frac{V_{\text{sub}}}{V_{\text{object}}} = \frac{920}{1025} = 0.90$, so about 90% of the ice sits below the surface.
- Read the fraction rule as three cases:
  - ρ_object < ρ_fluid: the fraction is below 1, so the object floats with part of it above the surface.
  - ρ_object = ρ_fluid: the fraction is exactly 1, so the object floats fully submerged, hanging at any depth like a fish holding still.
  - ρ_object > ρ_fluid: the fraction is above 1, which no real submersion can satisfy, so the object cannot float. It sinks until it rests on the bottom.
- The cliff edge in words: floating stays possible only while the object's density is below the fluid's density. If the fluid's density falls below the object's density, even complete submersion gives an upthrust smaller than the weight, and the object sinks.
- Precision rule (learn the difference, examiners cannot tell them apart): when the object still floats and sits deeper, write "the object floats lower in the water" or "the submerged depth increases". Keep the word "sinks" for the case where floating fails and the object drops to the bottom.

## The variable map — what changes what

- Every flotation question follows the same skeleton. First fix the balance that must hold (floating: U = W; steady lift: T + U = W; sinking at terminal velocity: W = U + D). Then identify the one quantity that changed. Then find which variable must compensate — and for a floating object the compensating variable is always the submerged volume.
- The ownership rules that make the map work:
  - The weight depends on the object only: $W = \rho_{\text{object}} \times V_{\text{object}} \times g$. Changing the fluid cannot change the weight.
  - The upthrust depends on the fluid and on the submerged volume: $U = \rho_{\text{fluid}} \times V_{\text{sub}} \times g$. Changing the object's material cannot directly change the upthrust.
  - The submerged volume V_sub is the only variable both sides share, so it is always the one that adjusts.

**The fluid gets denser, the object still floats** (the hydrometer question)

1. The object still floats, so the balance still holds: the upthrust on it = its weight (U = W).
2. The weight of the object has not changed, so the upthrust must stay the same size as before.
3. The fluid density ρ_fluid has increased, so the submerged volume V_sub must decrease ($U = \rho_{\text{fluid}} \times V_{\text{sub}} \times g$).
4. The object rises in the water until the balance holds again.
- The mark scheme prints: "The upthrust equals the weight of the hydrometer"; "(So) a smaller volume of seawater needs to be displaced (because seawater has a greater density)".

**The fluid gets less dense, the object still floats**

1. The balance still holds: U = W, with the weight unchanged, so the upthrust is unchanged.
2. The fluid density ρ_fluid has decreased, so the submerged volume V_sub must increase.
3. The object floats lower in the water, displacing a larger volume.
4. Floating stays possible only while ρ_object < ρ_fluid; below that, the object sinks (see the cliff edge).
- Worked numbers: an object of density 700 kg m⁻³ in water of density 1000 kg m⁻³ has 0.70 of its volume submerged. If the water density falls to 900 kg m⁻³, the fraction rises to $\frac{700}{900} = 0.78$: it rides visibly lower but still floats, because 700 < 900.

**The object gets less dense (same volume)** (the unloaded ship)

1. The weight decreases: $W = \rho_{\text{object}} \times V_{\text{object}} \times g$, with ρ_object smaller and V_object unchanged.
2. The object still floats, so the upthrust must equal the new, smaller weight.
3. The fluid density is unchanged, so the submerged volume V_sub must decrease.
4. The object rises in the water and displaces less water than before.

**The object is lifted out of the water** (the crane and the submarine)

1. The submarine is lifted at a steady speed, so the forces on it balance at every moment: the tension + the upthrust = the weight (T + U = W).
2. **$T = W - U$** — While the submarine is fully underwater, the tension in the cable = the weight of the submarine − the upthrust on it.
3. As the submarine emerges, the submerged volume decreases, so the upthrust decreases.
4. The weight does not change.
5. So the tension increases continuously while the submarine leaves the water.
6. Once the submarine is fully clear: V_sub = 0, so U = 0, and **$T = W$** — the cable carries the full weight.
- The mark scheme prints (indicative content): "tension = weight − upthrust"; "As the submarine leaves the water, the volume / mass / weight of water displaced decreases"; "the upthrust on the submarine decreases"; "the tension in the cable increases"; "When the submarine is out of the water the tension in the cable is equal (in magnitude) to the weight of the submarine".
- Examiner report warning: the least well described idea was the decreasing displaced water **as the submarine emerges**. Answers that described only the fully-underwater stage and the fully-out stage, but not the transition between them, lost the middle marks.

**The object sinks through colder, deeper water** (terminal velocity)

1. Sinking at terminal velocity: the resultant force = zero, so the weight = the upthrust + the drag (W = U + D).
2. The deeper water is colder and denser, so the upthrust increases.
3. The deeper water is also more viscous, so the drag at the same speed increases.
4. The weight remains constant (the mark scheme explicitly rejects "mass" written for the weight).
5. The balance W = U + D can now be met at a smaller speed, so the terminal velocity decreases as the object sinks deeper.

**The fluid gets less dense as the object rises** (the weather balloon)

1. At release, the upthrust is greater than the weight, so the balloon accelerates upwards.
2. The density of air decreases with height, so as the balloon rises the upthrust decreases ($U = \rho_{\text{air}} \times V \times g$).
3. When the upthrust falls below the weight, the resultant force acts downwards and the balloon decelerates to rest at its maximum height.
- Examiner report warning: candidates confused decreasing acceleration with decreasing velocity. While the upthrust still exceeds the weight, the balloon still speeds up, just more and more slowly.

- The map in one list, in words: a denser fluid lifts a floating object higher; a less dense fluid lets it ride lower; a less dense object rises and displaces less; a denser object rides lower and, past the cliff edge, sinks; an object emerging from a fluid loses upthrust, so any cable holding it takes over the share smoothly; an object sinking through denser, more viscous fluid sinks more slowly.

## How mark schemes want flotation worded

- Name the owner of every force and weight: "the upthrust **on the hydrometer**", "the weight **of the displaced water**", "the weight **of the object**". The examiner report records that many candidates wrote "weight" without specifying whether they meant the weight of the object, of the displaced pure water or of the displaced sea water, and lost the mark.
- Use the word "displace"/"displaced" in every flotation explanation. The mark scheme wording is built on displacement, and the printed examiner report states that alternatives such as "replacement" were not sufficient.
- The accepted explanation skeleton for "why does it float higher in the denser liquid" (two marks): first the balance ("the upthrust equals the weight of the hydrometer" or "the weight of displaced water equals the weight of the hydrometer"), then the compensation ("a smaller volume of seawater needs to be displaced because seawater has a greater density").
- The accepted definition of upthrust, word for word: "an upwards force caused by the displacement of fluid (by an object)", or "(a force equal and opposite to) the weight of fluid displaced (by an object)".
- Free-body diagram of a floating object: one upward arrow labelled upthrust (or U), one downward arrow labelled weight (or W or mg), both starting from the same point, drawn the same length.
- <span style="color:#b91c1c">Not accepted:</span> a third arrow (for example drag) on the free-body diagram of a floating object; the examiner report states this "prevented any marks from being scored".
- <span style="color:#b91c1c">Not accepted:</span> "G" as the label on the weight arrow; it is not an acceptable abbreviation for weight.
- <span style="color:#b91c1c">Not accepted:</span> "mass" written where the mark scheme wants "weight".
- Every full-mark flotation explanation keeps the balance visible: candidates who jump straight to "so it floats higher" without the upthrust-equals-weight step lose the middle marks.

## Integration notes for the next chat (not notes content)

1. **Slotting:** the four content sections above (`## Density — the full picture` through `## How mark schemes want flotation worded`) form the opening of Topic 2. They replace the current `## Density` section and sit before `## Upthrust and flotation`. The old Density section's calculation bullets are carried inside the new section (marked "carried over"), so nothing from the approved draft is lost.
2. **Scenarios after foundations:** every existing scenario build-up (object lowered onto a balance, Cartesian diver, submarine, iceberg, hydrometer) stays after the foundations. With the variable map in place, some scenario bullets can shrink to their scenario-specific step only, because the general chain is now taught once. Keep each scenario self-contained enough to read on its own, though: repeat the balance condition in one line rather than referencing "see above".
3. **Register contract compliance:** formulas in KaTeX between dollar signs; =, ×, <, > symbols inside sentences; no arrows anywhere; one mark-worthy point per bullet; named equations bold and stated first, unpacked after; Not-accepted rejections in the red span format; no past-paper session tags inside the notes content (the evidence trail lives in this file's header and in the digests).
4. **Site port mapping (when this becomes content files):** named equations map to eq bands with their unpacking sentence in the italic note; the "ownership of the variables" and "skeleton" bullets map to note blocks; each Not-accepted span maps to a note block with label "Not accepted"; the numbered chains map to bullets under scenario h-groups, one step per bullet; reference values could form a small table block.
5. **Grounding for every quoted wording:** hydrometer question = digest-C.md lines 69–72; upthrust definition and "displacement required" = digest-B.md lines 91 and 246; submarine indicative content and ER warning = digest-C.md line 164; colder deeper water chain and "[do not accept 'mass']" = digest-A.md line 61; weather balloon indicative content and the acceleration/velocity confusion = digest-B.md lines 91–95; free-body diagram rules and the "G" rejection = digest-C.md lines 70–71 and digest-B.md line 174.
6. **Numbers verified by computation:** $\frac{700}{900} = 0.78$, $\frac{700}{1000} = 0.70$, $\frac{920}{1025} = 0.90$.
7. **Owner's stated gaps that this addendum answers** (keep these covered when editing): the interplay between fluid density, object density and submerged volume; the fact that "the mark scheme has a way of saying it" for floating outcomes; and the teaching-before-scenarios order.
