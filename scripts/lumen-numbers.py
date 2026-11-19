"""Verify every number that will appear on the /lumen page (Accuracy rule:
no arithmetic in the head). Sources: the worked example is designed here;
stats come from the registry (checked against GLOBAL_METRICS values)."""

# ---- worked example: NaOH titrated with HCl ----
c_naoh = 0.100          # mol dm^-3
v_naoh_cm3 = 25.0       # cm^3
titre_cm3 = 20.0        # cm^3 of HCl

n_naoh = c_naoh * v_naoh_cm3 / 1000.0          # mol
n_hcl = n_naoh * 1.0                            # HCl + NaOH -> NaCl + H2O, 1:1
v_hcl_dm3 = titre_cm3 / 1000.0
c_hcl = n_hcl / v_hcl_dm3
print(f"n(NaOH) = {c_naoh} x {v_naoh_cm3/1000:.4f} dm3 = {n_naoh:.3e} mol")
print(f"n(HCl)  = {n_hcl:.3e} mol (1:1)")
print(f"c(HCl)  = {n_hcl:.3e} / {v_hcl_dm3:.4f} dm3 = {c_hcl:.4f} mol dm^-3")

# ---- registry stats (mirror of GLOBAL_METRICS in portal/data/ialData.ts) ----
units = 6
topics = 33
total_minutes = 756
worked_examples = 30
hours = round(total_minutes / 60)
print(f"\nunits={units} topics={topics} minutes={total_minutes} -> ~{hours} h, "
      f"worked examples={worked_examples}")

# per-unit minutes from IAL_UNITS (for tile facts: duration & marks are from
# units.ts paper objects; minutes for the marquee note if used)
per_unit_minutes = {"WCH11": 120, "WCH12": 130, "WCH13": 182,
                    "WCH14": 142, "WCH15": 122, "WCH16": 60}
assert sum(per_unit_minutes.values()) == total_minutes, "minutes do not add up"
print("per-unit minutes sum check:", sum(per_unit_minutes.values()), "==", total_minutes)

# ---- flame test colours (standard Edexcel IAL WCH13 qualitative analysis) ----
flames = [("Li", "crimson"), ("Na", "golden"), ("K", "lilac"),
          ("Ca", "brick red"), ("Cu", "blue-green"), ("Ba", "pale green")]
print("\nflame row:", ", ".join(f"{e} {c}" for e, c in flames))
