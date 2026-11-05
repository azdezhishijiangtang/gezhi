import type { FormulaEntry, FormulaGroup } from '@/types';

type FormulaPatch = Partial<FormulaEntry> & { id: string };
type GroupPatch = Omit<Partial<FormulaGroup>, 'formulas'> & { formulas?: FormulaPatch[] };

const map: Record<string, GroupPatch> = {
  'electromagnetism-fg1': {
    name: 'Fundamentals of Electrostatics',
    formulas: [
      {
        id: 'electromagnetism-f1',
        group: "Coulomb's Law",
        name: "Coulomb's Law",
        note: 'Vacuum permittivity $\\varepsilon_0=8.854\\times10^{-12}\\ \\text{C}^2/(\\text{N}\\cdot\\text{m}^2)$',
      },
      {
        id: 'electromagnetism-f2',
        group: 'Electric Field',
        name: 'Field of a Point Charge',
        note: 'Field units are $\\text{N/C}$ or $\\text{V/m}$',
      },
      {
        id: 'electromagnetism-f3',
        group: "Gauss's Theorem",
        name: "Gauss's Theorem",
        note: 'The electrostatic field is a sourced field',
      },
      {
        id: 'electromagnetism-f4',
        group: 'Electric Potential',
        name: 'Potential of a Point Charge',
        note: 'With zero potential taken at infinity; the unit is the volt $\\text{V}$',
      },
      {
        id: 'electromagnetism-f5',
        group: 'Field and Potential',
        name: 'Field Strength and Potential Gradient',
        note: 'The field points in the direction of fastest decrease of the potential',
      },
      {
        id: 'electromagnetism-f6',
        group: 'Electric Dipole',
        name: 'Dipole Potential and Field',
        note: 'Dipole moment $\\vec p=q\\vec l$; the far field falls off as $1/r^3$',
      },
    ],
  },
  'electromagnetism-fg2': {
    name: 'Conductors, Capacitance and Circuits',
    formulas: [
      {
        id: 'electromagnetism-f7',
        group: 'Capacitance',
        name: 'Parallel-Plate Capacitor',
        note: 'After a dielectric is inserted $C=\\varepsilon_r C_0$',
      },
      {
        id: 'electromagnetism-f8',
        group: 'Capacitor Combinations',
        name: 'Series and Parallel Equivalent Capacitance',
      },
      {
        id: 'electromagnetism-f9',
        group: 'Electrostatic Equilibrium',
        name: 'Field at a Conductor Surface',
        note: 'Inside the conductor $E=0$ and the whole conductor is at the same potential',
      },
      {
        id: 'electromagnetism-f10',
        group: "Ohm's Law",
        name: 'Differential and Macroscopic Forms',
        note: '$\\sigma$ is the conductivity and $R=\\rho l/S$',
      },
      {
        id: 'electromagnetism-f11',
        group: "Kirchhoff's Laws",
        name: 'Junction and Loop Laws',
      },
      {
        id: 'electromagnetism-f12',
        group: 'Stored Energy',
        name: 'Energy Stored in a Capacitor',
        note: 'With internal resistance the terminal voltage is $U=\\mathscr E-Ir$',
      },
    ],
  },
  'electromagnetism-fg3': {
    name: 'Magnetic Fields and Electromagnetic Induction',
    formulas: [
      {
        id: 'electromagnetism-f13',
        group: 'Magnetic Field',
        name: 'Biot–Savart Law',
        note: 'Vacuum permeability $\\mu_0=4\\pi\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$',
      },
      {
        id: 'electromagnetism-f14',
        group: 'Magnetic Field',
        name: "Ampère's Circuital Law",
        note: 'The magnetic field is source-free but has circulation',
      },
      {
        id: 'electromagnetism-f15',
        group: 'Magnetic Field',
        name: 'Field of a Long Straight Wire',
        note: 'Direction given by the right-hand rule',
      },
      {
        id: 'electromagnetism-f16',
        group: 'Lorentz Force',
        name: 'Lorentz Force',
        note: 'The magnetic force alone does no work and only changes the direction of motion',
      },
      {
        id: 'electromagnetism-f17',
        group: 'Electromagnetic Induction',
        name: "Faraday's Law",
        note: "The minus sign is Lenz's law (opposing the change in magnetic flux)",
      },
      {
        id: 'electromagnetism-f18',
        group: 'Electromagnetic Induction',
        name: 'Self-Inductance and Magnetic Energy',
        note: 'Magnetic energy density $w_m=B^2/(2\\mu_0)$',
      },
    ],
  },
};

export default map;
