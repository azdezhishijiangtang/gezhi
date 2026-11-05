import type { FormulaEntry, FormulaGroup } from '@/types';

type FormulaPatch = Partial<FormulaEntry> & { id: string };
type GroupPatch = Omit<Partial<FormulaGroup>, 'formulas'> & { formulas?: FormulaPatch[] };

const map: Record<string, GroupPatch> = {
  'electrodynamics-fg1': {
    name: "Maxwell's Equations and Electromagnetic Energy",
    formulas: [
      {
        id: 'electrodynamics-f1',
        group: "Maxwell's Equations",
        name: 'Differential Form',
        note: 'The field equations in macroscopic media, valid point by point',
      },
      {
        id: 'electrodynamics-f2',
        group: "Maxwell's Equations",
        name: 'Integral Form',
        note: 'Valid for any closed surface and any closed loop',
      },
      {
        id: 'electrodynamics-f3',
        group: 'Displacement Current',
        name: 'Displacement Current Density',
        note: 'A changing electric field generates a magnetic field; the vacuum part is $\\varepsilon_0\\partial\\vec E/\\partial t$',
      },
      {
        id: 'electrodynamics-f4',
        group: 'Boundary Relations',
        name: 'Interface Matching Conditions',
        note: 'Normal jumps arise from free surface charge, tangential jumps from surface conduction current',
      },
      {
        id: 'electrodynamics-f5',
        group: 'Electromagnetic Energy',
        name: 'Energy Density',
        note: 'In a linear medium the electric and magnetic fields each contribute one half',
      },
      {
        id: 'electrodynamics-f6',
        group: 'Electromagnetic Energy',
        name: 'Poynting Vector and Energy-Flow Theorem',
        note: 'Energy flows through the field, and circuit energy is transported by the fields',
      },
    ],
  },
  'electrodynamics-fg2': {
    name: 'Waves and Boundary-Value Problems',
    formulas: [
      {
        id: 'electrodynamics-f7',
        group: 'Potential Equations',
        name: "Poisson's and Laplace's Equations",
        note: 'The basic equations of electrostatic boundary-value problems, solved together with the boundary relations',
      },
      {
        id: 'electrodynamics-f8',
        group: 'Uniqueness Theorem',
        name: 'Uniqueness Theorem (Green-Function Form)',
        note: 'With the charge in the region and the boundary conditions given, the solution is unique; this underlies the method of images and separation of variables',
      },
      {
        id: 'electrodynamics-f9',
        group: 'Method of Images',
        name: 'Image of a Charge in a Grounded Conducting Sphere',
        note: "The image charge $q'$ lies inside the sphere at distance $b$ from the centre; the plane case is the $d\\to\\infty$ limit",
      },
      {
        id: 'electrodynamics-f10',
        group: 'Electromagnetic Waves',
        name: 'Vacuum Wave Equation and Wave Speed',
        note: 'The plane wave $\\vec E = \\vec E_0 e^{i(\\vec k\\cdot\\vec r - \\omega t)}$ is transverse, with $E/H = \\sqrt{\\mu_0/\\varepsilon_0} \\approx 377\\ \\Omega$',
      },
      {
        id: 'electrodynamics-f11',
        group: 'Reflection and Refraction',
        name: 'Fresnel Equations',
        note: 'At the Brewster angle $\\tan\\theta_B = n_2/n_1$ one has $r_p = 0$; total internal reflection begins at $\\sin\\theta_c = n_2/n_1$',
      },
      {
        id: 'electrodynamics-f12',
        group: 'Waveguides',
        name: 'Cutoff Frequency of a Rectangular Waveguide',
        note: 'Dominant mode TE$_{10}$: $f_c = c/(2a)$; modes below the cutoff frequency cannot propagate',
      },
    ],
  },
  'electrodynamics-fg3': {
    name: 'Radiation and Relativity',
    formulas: [
      {
        id: 'electrodynamics-f13',
        group: 'Retarded Potentials',
        name: 'Retarded Potentials (Lorenz Gauge)',
        note: 'The potential at the field point at time $t$ is set by the source at the retarded time $t - R/c$',
      },
      {
        id: 'electrodynamics-f14',
        group: 'Dipole Radiation',
        name: 'Electric Dipole Radiation Field',
        note: 'The radiation field falls off as $1/r$ with angular distribution $\\propto\\sin^2\\theta$',
      },
      {
        id: 'electrodynamics-f15',
        group: 'Radiated Power',
        name: 'Total Dipole Radiated Power and the Larmor Formula',
        note: 'For harmonic oscillation $P = \\omega^4 p_0^2/(12\\pi\\varepsilon_0 c^3)$, so the radiated power grows as the fourth power of frequency',
      },
      {
        id: 'electrodynamics-f16',
        group: 'Four-Dimensional Form',
        name: 'Four-Current and Four-Potential',
        note: 'Covariant statement of charge conservation and the wave equation, in the Lorenz gauge $\\partial_\\mu A^\\mu = 0$',
      },
      {
        id: 'electrodynamics-f17',
        group: 'Field Tensor',
        name: 'Field Tensor and Covariant Field Equations',
        note: "Electric and magnetic fields are unified into an antisymmetric rank-2 tensor, $F'^{\\mu\\nu} = \\Lambda^\\mu_{\\ \\alpha}\\Lambda^\\nu_{\\ \\beta}F^{\\alpha\\beta}$",
      },
      {
        id: 'electrodynamics-f18',
        group: 'Lorentz Force',
        name: 'Covariant Equation of Motion',
        note: 'The invariants $\\vec E\\cdot\\vec B$ and $E^2 - c^2B^2$ are unchanged under Lorentz transformations',
      },
    ],
  },
};

export default map;
