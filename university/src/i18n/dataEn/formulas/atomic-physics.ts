import type { FormulaEntry, FormulaGroup } from '@/types';

type FormulaPatch = Partial<FormulaEntry> & { id: string };
type GroupPatch = Omit<Partial<FormulaGroup>, 'formulas'> & { formulas?: FormulaPatch[] };

const map: Record<string, GroupPatch> = {
  'atomic-physics-fg1': {
    name: 'Bohr Model and the Hydrogen Spectrum',
    formulas: [
      {
        id: 'atomic-physics-f1',
        group: 'Bohr Model',
        name: 'Quantization of Angular Momentum',
        note: 'The central postulate of the Bohr model, i.e. the selection rule for stationary orbits',
      },
      {
        id: 'atomic-physics-f2',
        group: 'Bohr Model',
        name: 'Bohr Radius',
        note: 'Radius of the first Bohr orbit; for the $n$-th orbit $r_n = a_0 n^2$',
      },
      {
        id: 'atomic-physics-f3',
        group: 'Bohr Model',
        name: 'Hydrogen Energy Levels',
        note: 'For hydrogen-like ions this generalizes to $E_n = -13.6 Z^2/n^2\\ \\text{eV}$',
      },
      {
        id: 'atomic-physics-f4',
        group: 'Bohr Model',
        name: 'Bohr Frequency Condition',
        note: 'The frequency of a spectral line is set by the energy-level difference',
      },
      {
        id: 'atomic-physics-f5',
        group: 'Hydrogen Spectrum',
        name: 'Rydberg Formula',
        note: 'Balmer series $n_f = 2$ (visible), Lyman series $n_f = 1$ (ultraviolet)',
      },
      {
        id: 'atomic-physics-f6',
        group: 'Hydrogen Spectrum',
        name: 'Series Limit',
        note: '$n_i \\to \\infty$, corresponding to the minimum energy needed to ionize from that level',
      },
    ],
  },
  'atomic-physics-fg2': {
    name: 'X-Rays and Radioactive Decay',
    formulas: [
      {
        id: 'atomic-physics-f7',
        group: 'X-Rays',
        name: 'Short-Wavelength Limit (Duane–Hunt Law)',
        note: 'Fixed by the tube voltage alone, independent of the target material',
      },
      {
        id: 'atomic-physics-f8',
        group: 'X-Rays',
        name: "Moseley's Law",
        note: 'The square root of the characteristic frequency is nearly linear in the atomic number, allowing elements to be identified',
      },
      {
        id: 'atomic-physics-f9',
        group: 'X-Rays',
        name: 'Kα Line Energy (hydrogen-like approximation)',
        note: 'L→K transition with effective nuclear charge $(Z-1)e$',
      },
      {
        id: 'atomic-physics-f10',
        group: 'X-Rays',
        name: "Bragg's Law of Diffraction",
        note: 'The basis for measuring wavelengths or lattice spacings by crystal diffraction',
      },
      {
        id: 'atomic-physics-f11',
        group: 'Radioactivity',
        name: 'Decay Law',
        note: 'A constant decay probability per unit time gives an exponential law in the statistical sense',
      },
      {
        id: 'atomic-physics-f12',
        group: 'Radioactivity',
        name: 'Half-Life and Activity',
        note: 'Mean lifetime $\\tau = 1/\\lambda = T_{1/2}/\\ln 2$; activity is measured in Bq',
      },
    ],
  },
  'atomic-physics-fg3': {
    name: 'Spin and Fine Structure',
    formulas: [
      {
        id: 'atomic-physics-f13',
        group: 'Electron Spin',
        name: 'Spin Angular Momentum',
        note: 'An intrinsic degree of freedom with projection $S_z = m_s\\hbar = \\pm\\hbar/2$',
      },
      {
        id: 'atomic-physics-f14',
        group: 'Electron Spin',
        name: 'Bohr Magneton and Spin Magnetic Moment',
        note: 'The spin g-factor is about twice the orbital value ($g_L = 1$)',
      },
      {
        id: 'atomic-physics-f15',
        group: 'Angular Momentum Coupling',
        name: 'Total Angular Momentum',
        note: 'Under spin–orbit coupling $\\vec{J}$ is a conserved quantity',
      },
      {
        id: 'atomic-physics-f16',
        group: 'Fine Structure',
        name: 'Landé g-Factor',
        note: 'Determines the spacing of the Zeeman splitting $\\Delta E = g_J\\mu_B B m_J$',
      },
      {
        id: 'atomic-physics-f17',
        group: 'Fine Structure',
        name: 'Fine-Structure Splitting',
        note: 'The splitting is far smaller than the principal level spacing, e.g. about 2.1 meV for the sodium D lines',
      },
      {
        id: 'atomic-physics-f18',
        group: 'Fine Structure',
        name: 'Doublet Splitting and Wavelength Difference in Alkali Metals',
        note: 'The level splitting is inferred from the doublet wavelength difference, e.g. sodium $D_1$ 589.6 nm and $D_2$ 589.0 nm',
      },
    ],
  },
};

export default map;
