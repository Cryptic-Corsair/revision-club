"""Verify every equation planned for the Topic 4 revision note."""

from collections import Counter

def atoms(side: str) -> Counter:
    """Parse 'CH4 + 2O2' -> Counter of element totals."""
    total: Counter = Counter()
    for term in side.split("+"):
        term = term.strip()
        # leading coefficient
        num = ""
        while term and term[0].isdigit():
            num += term[0]
            term = term[1:]
        n = int(num) if num else 1
        for el, cnt in parse(term).items():
            total[el] += n * cnt
    return total

def parse(formula: str) -> Counter:
    c: Counter = Counter()
    i = 0
    while i < len(formula):
        if formula[i] in "•":  # radical dot
            i += 1
            continue
        if not formula[i].isupper():
            i += 1
            continue
        el = formula[i]
        i += 1
        while i < len(formula) and formula[i].islower():
            el += formula[i]
            i += 1
        num = ""
        while i < len(formula) and formula[i].isdigit():
            num += formula[i]
            i += 1
        c[el] += int(num) if num else 1
    return c

def check(label: str, lhs: str, rhs: str) -> None:
    l, r = atoms(lhs), atoms(rhs)
    ok = l == r
    print(f"{'OK ' if ok else 'BAD'} {label}: {lhs} -> {rhs}" + ("" if ok else f"   L={dict(l)} R={dict(r)}"))

# 4.6 reaction types
check("addition", "C2H4 + Br2", "CH2BrCH2Br")
check("substitution", "CH4 + Cl2", "CH3Cl + HCl")
check("combustion propane complete", "C3H8 + 5O2", "3CO2 + 4H2O")
check("combustion propane incomplete", "C3H8 + 7/2O2", "3CO + 4H2O")

# 4.13 / 4.17 combustion exercise
check("methane complete", "CH4 + 2O2", "CO2 + 2H2O")
check("methane incomplete", "CH4 + 3/2O2", "CO + 2H2O")
check("butane complete", "2C4H10 + 13O2", "8CO2 + 10H2O")
check("hexane complete", "2C6H14 + 19O2", "12CO2 + 14H2O")
check("decane complete", "C10H22 + 31/2O2", "10CO2 + 11H2O")
check("propane incomplete", "C3H8 + 7/2O2", "3CO + 4H2O")
check("heptane incomplete", "C7H16 + 15/2O2", "7CO + 8H2O")
check("octane incomplete", "2C8H18 + 17O2", "16CO + 18H2O")

# 4.13 pollutant chemistry
check("sulfur burn", "S + O2", "SO2")
check("SO2 oxidise", "2SO2 + O2", "2SO3")
check("SO2 to acid", "SO2 + H2O", "H2SO3")
check("SO3 to acid", "SO3 + H2O", "H2SO4")
check("NO form", "N2 + O2", "2NO")
check("NO2 form", "2NO + O2", "2NO2")
check("NO2 to acids", "2NO2 + H2O", "HNO2 + HNO3")

# 4.12 cracking
check("crack decane", "C10H22", "C8H18 + C2H4")
check("alkane to alkene + H2", "C4H10", "C4H8 + H2")

# 4.18 chlorination ladder
check("chlor 1", "CH4 + Cl2", "CH3Cl + HCl")
check("chlor 2", "CH3Cl + Cl2", "CH2Cl2 + HCl")
check("chlor 3", "CH2Cl2 + Cl2", "CHCl3 + HCl")
check("chlor 4", "CHCl3 + Cl2", "CCl4 + HCl")

# 4.18 propagation pairs sum to overall
check("ICl overall (HI route)", "C2H6 + ICl", "C2H5I + HI")
check("ICl overall (HCl route)", "C2H6 + ICl", "C2H5I + HCl")

# isomer counts sanity: C5H12 3 isomers, C6H14 5
print("\nC5H12 isomers: pentane / 2-methylbutane / 2,2-dimethylpropane -> 3")
print("C6H14 isomers: hexane / 2-methylpentane / 3-methylpentane / 2,2-dimethylbutane / 2,3-dimethylbutane -> 5")
