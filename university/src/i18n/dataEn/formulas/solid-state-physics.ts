import type { FormulaGroup } from '@/types';

const map: Record<string, Partial<FormulaGroup>> = {
  'solid-state-physics-fg1': {
    name: 'Crystallography and the Reciprocal Lattice',
    formulas: [
      {
        id: 'solid-state-physics-f1',
        group: 'Crystallography',
        name: 'Interplanar Spacing in the Cubic System',
        latex: 'd_{hkl} = \\frac{a}{\\sqrt{h^2 + k^2 + l^2}}',
        note: '$(hkl)$ are Miller indices; other crystal systems require correction',
      },
      {
        id: 'solid-state-physics-f2',
        group: 'Crystallography',
        name: 'Packing Fraction (fcc / hcp)',
        latex: '\\eta = \\frac{n \\cdot \\frac{4}{3}\\pi r^3}{a^3},\\qquad \\eta_{fcc} = \\frac{\\sqrt{2}\\pi}{6} \\approx 0.74',
        note: 'sc gives 0.52 and bcc 0.68; the close-packing limit is 0.74',
      },
      {
        id: 'solid-state-physics-f3',
        group: 'Reciprocal Lattice',
        name: 'Reciprocal Lattice Basis Vectors',
        latex: '\\vec{b}_1 = 2\\pi\\frac{\\vec{a}_2\\times\\vec{a}_3}{\\Omega},\\quad \\vec{b}_2 = 2\\pi\\frac{\\vec{a}_3\\times\\vec{a}_1}{\\Omega},\\quad \\vec{b}_3 = 2\\pi\\frac{\\vec{a}_1\\times\\vec{a}_2}{\\Omega}',
        note: '$\\Omega = \\vec{a}_1\\cdot(\\vec{a}_2\\times\\vec{a}_3)$ is the primitive-cell volume, so that $\\vec{a}_i\\cdot\\vec{b}_j = 2\\pi\\delta_{ij}$',
      },
      {
        id: 'solid-state-physics-f4',
        group: 'Reciprocal Lattice',
        name: 'Reciprocal Lattice Vector and Crystal Planes',
        latex: '|\\vec{G}_{hkl}| = \\frac{2\\pi}{d_{hkl}}',
        note: '$\\vec{G}_{hkl} = h\\vec{b}_1 + k\\vec{b}_2 + l\\vec{b}_3$ is normal to the family of $(hkl)$ planes',
      },
      {
        id: 'solid-state-physics-f5',
        group: 'Diffraction',
        name: 'Bragg Equation',
        latex: '2d\\sin\\theta = n\\lambda',
        note: 'Equivalent to the Laue condition $\\vec{k} - \\vec{k}_0 = \\vec{G}$',
      },
      {
        id: 'solid-state-physics-f6',
        group: 'Diffraction',
        name: 'Structure Factor',
        latex: 'F_{hkl} = \\sum_j f_j\\, e^{2\\pi i(hx_j + ky_j + lz_j)}',
        note: '$I \\propto |F|^2$; bcc reflections vanish when $h+k+l$ is odd, fcc ones when $h,k,l$ mix even and odd values',
      },
    ],
  },
  'solid-state-physics-fg2': {
    name: 'Lattice Vibrations and Thermal Properties',
    formulas: [
      {
        id: 'solid-state-physics-f7',
        group: 'Lattice Vibrations',
        name: 'Dispersion Relation of a 1D Monatomic Chain',
        latex: '\\omega(k) = 2\\sqrt{\\frac{K}{m}}\\,\\left|\\sin\\frac{ka}{2}\\right|',
        note: 'In the long-wavelength limit $\\omega \\approx a\\sqrt{K/m}\\,|k|$; the group velocity vanishes at the Brillouin-zone boundary',
      },
      {
        id: 'solid-state-physics-f8',
        group: 'Lattice Vibrations',
        name: 'Dispersion Relation of a 1D Diatomic Chain',
        latex: '\\omega^2_{\\pm} = \\frac{\\beta(M+m)}{Mm} \\pm \\frac{\\beta}{Mm}\\sqrt{M^2 + m^2 + 2Mm\\cos(2ka)}',
        note: 'The $+$ branch is optical (long-wavelength limit $\\omega_+ \\to \\sqrt{2\\beta(1/m + 1/M)}$); the $-$ branch is acoustic ($\\omega_- \\to 0$)',
      },
      {
        id: 'solid-state-physics-f9',
        group: 'Phonons',
        name: 'Phonon Energy and Mean Phonon Number',
        latex: '\\varepsilon_n = \\hbar\\omega\\left(n + \\frac{1}{2}\\right),\\qquad \\bar{n} = \\frac{1}{e^{\\hbar\\omega/k_BT} - 1}',
        note: 'The zero-point energy $\\hbar\\omega/2$ is not negligible; phonons are bosons and their number is not conserved',
      },
      {
        id: 'solid-state-physics-f10',
        group: 'Heat Capacity',
        name: 'Einstein Heat Capacity',
        latex: 'C_V = 3Nk_B\\left(\\frac{\\theta_E}{T}\\right)^2 \\frac{e^{\\theta_E/T}}{\\left(e^{\\theta_E/T} - 1\\right)^2}',
        note: '$\\theta_E = \\hbar\\omega_E/k_B$; at high temperature it reduces to the Dulong–Petit law $3Nk_B$',
      },
      {
        id: 'solid-state-physics-f11',
        group: 'Heat Capacity',
        name: 'Debye Heat Capacity and the T³ Law',
        latex: 'C_V = 9Nk_B\\left(\\frac{T}{\\theta_D}\\right)^3 \\int_0^{\\theta_D/T} \\frac{x^4 e^x}{(e^x - 1)^2}\\,dx \\;\\xrightarrow{T \\ll \\theta_D}\\; \\frac{12\\pi^4}{5} Nk_B \\left(\\frac{T}{\\theta_D}\\right)^3',
        note: '$\\theta_D = \\hbar\\omega_D/k_B$; a higher Debye temperature means a smaller low-temperature heat capacity',
      },
    ],
  },
  'solid-state-physics-fg3': {
    name: 'Electron Theory and Energy Bands',
    formulas: [
      {
        id: 'solid-state-physics-f12',
        group: 'Free Electron Gas',
        name: 'Fermi Energy and Fermi Velocity',
        latex: 'E_F = \\frac{\\hbar^2}{2m}\\left(3\\pi^2 n\\right)^{2/3},\\qquad v_F = \\frac{\\hbar k_F}{m},\\quad k_F = (3\\pi^2 n)^{1/3}',
        note: 'For copper $E_F \\approx 7\\ \\text{eV}$ and $v_F \\approx 1.57\\times10^6\\ \\text{m/s}$',
      },
      {
        id: 'solid-state-physics-f13',
        group: 'Free Electron Gas',
        name: 'Electronic Heat Capacity',
        latex: 'C_V = \\frac{\\pi^2 N k_B^2}{2E_F}\\,T \\equiv \\gamma T',
        note: 'Only of order $T/T_F$ compared with the classical equipartition prediction; for metals at low temperature $C_V = \\gamma T + AT^3$',
      },
      {
        id: 'solid-state-physics-f14',
        group: 'Band Theory',
        name: 'Bloch’s Theorem',
        latex: '\\psi_k(\\vec{r}) = e^{i\\vec{k}\\cdot\\vec{r}}\\, u_k(\\vec{r}),\\qquad u_k(\\vec{r} + \\vec{R}) = u_k(\\vec{r})',
        note: 'In a periodic potential the electron wavefunction is a plane wave times a periodic modulation',
      },
      {
        id: 'solid-state-physics-f15',
        group: 'Band Theory',
        name: 'Band Gap in the Nearly-Free-Electron Approximation',
        latex: 'E_g = 2|V_G|',
        note: 'Bragg reflection at the Brillouin-zone boundary opens the gap; $V_G$ is a Fourier component of the periodic potential',
      },
      {
        id: 'solid-state-physics-f16',
        group: 'Band Theory',
        name: 'Tight-Binding Approximation (s Band, Simple Cubic)',
        latex: 'E(\\vec{k}) = E_0 - 2J\\left(\\cos k_xa + \\cos k_ya + \\cos k_za\\right)',
        note: 'Bandwidth $W = 12|J|$; stronger overlap of atomic orbitals gives a wider band',
      },
      {
        id: 'solid-state-physics-f17',
        group: 'Transport',
        name: 'Hall Coefficient',
        latex: 'R_H = -\\frac{1}{ne}\\ (\\text{电子}),\\qquad R_H = \\frac{1}{pe}\\ (\\text{空穴}),\\qquad U_H = \\frac{R_H I B}{d}',
        note: 'The sign identifies the carrier type and the magnitude gives the concentration; combined with the conductivity it yields the mobility $\\mu = |R_H|\\sigma$',
      },
    ],
  },
};

export default map;
