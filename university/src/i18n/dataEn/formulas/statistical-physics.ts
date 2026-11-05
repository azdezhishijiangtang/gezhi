import type { FormulaGroup } from '@/types';

const map: Record<string, Partial<FormulaGroup>> = {
  'statistical-physics-fg1': {
    name: 'The Three Statistical Distributions',
    formulas: [
      {
        id: 'statistical-physics-f1',
        group: 'Microscopic Counting',
        name: 'Boltzmann Entropy Formula',
        latex: 'S = k\\ln\\Omega',
        note: '$\\Omega$ is the number of microstates belonging to a macrostate; under the postulate of equal a priori probabilities the probability of a macrostate is proportional to $\\Omega$, so equilibrium is the distribution with the largest $\\Omega$.',
      },
      {
        id: 'statistical-physics-f2',
        group: 'Classical Distribution',
        name: 'Boltzmann Distribution (Most Probable)',
        latex: 'a_l = \\omega_l e^{-\\alpha-\\beta\\varepsilon_l} = \\frac{N}{Z}\\,\\omega_l e^{-\\varepsilon_l/kT}',
        note: '$\\alpha = -\\mu/kT$, $\\beta = 1/kT$; the most probable distribution for distinguishable particles with unrestricted level occupancy.',
      },
      {
        id: 'statistical-physics-f3',
        group: 'Partition Function',
        name: 'Single-Particle Partition Function',
        latex: 'Z = \\sum_l \\omega_l\\, e^{-\\beta\\varepsilon_l}',
        note: 'Sum over all levels (multiplying by the degeneracy) or over all microstates (without it); every thermodynamic quantity is a derivative of $\\ln Z$.',
      },
      {
        id: 'statistical-physics-f4',
        group: 'Quantum Distributions',
        name: 'Bose–Einstein Distribution',
        latex: '\\bar a_l = \\frac{\\omega_l}{e^{(\\varepsilon_l - \\mu)/kT} - 1}',
        note: 'Identical bosons (integer spin) may occupy the same single-particle state in unlimited numbers; $\\mu$ cannot exceed the lowest level, and for a photon gas $\\mu = 0$.',
      },
      {
        id: 'statistical-physics-f5',
        group: 'Quantum Distributions',
        name: 'Fermi–Dirac Distribution',
        latex: '\\bar a_l = \\frac{\\omega_l}{e^{(\\varepsilon_l - \\mu)/kT} + 1}',
        note: 'Identical fermions (half-integer spin); the Pauli principle allows at most one particle per state. In the high-temperature, low-density limit (mean occupancy per state much less than 1) both this and the B-E distribution reduce to the Boltzmann distribution.',
      },
      {
        id: 'statistical-physics-f6',
        group: 'Grand Canonical Ensemble',
        name: 'Grand Partition Function and Mean Particle Number',
        latex: '\\Xi = \\sum_N \\sum_s e^{-\\beta(E_s - \\mu N)} = \\sum_N z^N Z_N,\\qquad \\bar N = kT\\,\\frac{\\partial\\ln\\Xi}{\\partial\\mu} = z\\,\\frac{\\partial\\ln\\Xi}{\\partial z}',
        note: '$z = e^{\\beta\\mu}$ is the fugacity and $Z_N$ the canonical partition function of $N$ particles; quantum-statistical calculations usually start from $\\ln\\Xi$.',
      },
    ],
  },
  'statistical-physics-fg2': {
    name: 'Statistical Expressions for Thermodynamic Quantities',
    formulas: [
      {
        id: 'statistical-physics-f7',
        group: 'Internal Energy',
        name: 'Internal Energy and the Partition Function',
        latex: 'U = -\\frac{\\partial\\ln Z}{\\partial\\beta} = -kT^2\\,\\frac{\\partial\\ln Z}{\\partial T}',
        note: 'In the canonical ensemble $Z$ is the partition function of the system; for $N$ independent particles $U = -N\\,\\partial\\ln Z/\\partial\\beta$ with $Z$ the single-particle partition function.',
      },
      {
        id: 'statistical-physics-f8',
        group: 'Free Energy',
        name: 'Helmholtz Free Energy',
        latex: 'F = -kT\\ln Z',
        note: 'The central formula of the canonical ensemble: $\\ln Z$ collects all statistical information and multiplication by $-kT$ converts it into a thermodynamic potential; the equilibrium criterion at constant $T$ and $V$ is that $F$ be minimal.',
      },
      {
        id: 'statistical-physics-f9',
        group: 'Entropy',
        name: 'Statistical Expression for Entropy',
        latex: 'S = -\\left(\\frac{\\partial F}{\\partial T}\\right)_V = k\\ln Z + \\frac{U}{T} = k\\ln Z + kT\\,\\frac{\\partial\\ln Z}{\\partial T}',
        note: 'Two equivalent forms: differentiate the free energy, or use $k\\ln Z + U/T$; both agree with $S = k\\ln\\Omega$ for the most probable distribution.',
      },
      {
        id: 'statistical-physics-f10',
        group: 'Generalised Forces',
        name: 'Pressure (Equation of State)',
        latex: 'p = kT\\,\\frac{\\partial\\ln Z}{\\partial V} = -\\left(\\frac{\\partial F}{\\partial V}\\right)_T',
        note: 'Arises from the volume dependence of the energy levels; for an ideal gas $Z \\propto V$ immediately returns $pV = NkT$.',
      },
      {
        id: 'statistical-physics-f11',
        group: 'Chemical Potential',
        name: 'Chemical Potential',
        latex: '\\mu = \\left(\\frac{\\partial F}{\\partial N}\\right)_{T,V},\\qquad \\mu = kT\\ln\\left(n\\lambda_T^3\\right)\\ \\text{（经典理想气体）}',
        note: '$\\lambda_T = h/\\sqrt{2\\pi mkT}$ is the thermal de Broglie wavelength; equality of chemical potentials is the condition for diffusive (particle-exchange) equilibrium.',
      },
      {
        id: 'statistical-physics-f12',
        group: 'Fluctuations',
        name: 'Particle-Number and Energy Fluctuations',
        latex: '\\overline{(\\Delta N)^2} = kT\\left(\\frac{\\partial\\bar N}{\\partial\\mu}\\right)_{T,V},\\qquad \\overline{(\\Delta E)^2} = kT^2 C_V',
        note: 'Particle-number fluctuations in the grand canonical ensemble and energy fluctuations in the canonical ensemble; for macroscopic systems the relative fluctuation is about $1/\\sqrt{N}$ and hence negligible.',
      },
    ],
  },
  'statistical-physics-fg3': {
    name: 'Quantum Gases and Black-Body Radiation',
    formulas: [
      {
        id: 'statistical-physics-f13',
        group: 'Fermi Gas',
        name: 'Fermi Energy and Fermi Temperature',
        latex: 'E_F = \\frac{\\hbar^2}{2m}\\left(3\\pi^2 n\\right)^{2/3},\\qquad T_F = \\frac{E_F}{k}',
        note: '$n$ is the electron number density (including the spin degeneracy $g=2$); for metals $T_F \\sim 10^4$–$10^5\\ \\text{K}$, so the electron gas is strongly degenerate at room temperature; the mean energy at zero temperature is $\\bar E = 3E_F/5$.',
      },
      {
        id: 'statistical-physics-f14',
        group: 'Fermi Gas',
        name: 'Electronic Heat Capacity',
        latex: 'C_V^{(e)} = \\frac{\\pi^2}{2}\\,Nk\\,\\frac{T}{T_F}',
        note: 'Linear in temperature; only the fraction $\\sim kT/E_F$ of electrons near the Fermi surface is thermally excited, which at room temperature amounts to about one percent of the lattice heat capacity $3Nk$.',
      },
      {
        id: 'statistical-physics-f15',
        group: 'Photon Gas',
        name: 'Planck Black-Body Radiation Law',
        latex: 'u(\\omega, T)\\,d\\omega = \\frac{\\hbar\\omega^3}{\\pi^2 c^3}\\,\\frac{d\\omega}{e^{\\hbar\\omega/kT} - 1}',
        note: 'Photon gas with $\\mu = 0$; the mode density is $V\\omega^2d\\omega/\\pi^2c^3$ (counting two polarisations). At low frequency it reduces to the Rayleigh–Jeans law and at high frequency to Wien’s law.',
      },
      {
        id: 'statistical-physics-f16',
        group: 'Photon Gas',
        name: 'Stefan–Boltzmann Law',
        latex: 'M = \\sigma T^4,\\qquad \\sigma = \\frac{2\\pi^5 k^4}{15 h^3 c^2} = 5.67\\times10^{-8}\\ \\text{W/(m}^2\\text{K}^4)',
        note: 'Follows from $u = aT^4$ with $a = \\pi^2k^4/15\\hbar^3c^3$ and $M = cu/4$; the photon-gas equation of state is $p = u/3$.',
      },
      {
        id: 'statistical-physics-f17',
        group: 'Bose Condensation',
        name: 'Critical Temperature of Bose–Einstein Condensation',
        latex: 'T_c = \\frac{2\\pi\\hbar^2}{mk}\\left[\\frac{n}{\\zeta(3/2)}\\right]^{2/3} \\approx \\frac{3.31\\,\\hbar^2 n^{2/3}}{mk}',
        note: '$\\zeta(3/2) \\approx 2.612$; for $T < T_c$ the ground-state fraction is $N_0/N = 1 - (T/T_c)^{3/2}$ and the chemical potential is pinned at the ground-state energy.',
      },
      {
        id: 'statistical-physics-f18',
        group: 'Degeneracy Criterion',
        name: 'Degeneracy Parameter and Thermal Wavelength',
        latex: '\\lambda_T = \\frac{h}{\\sqrt{2\\pi mkT}},\\qquad n\\lambda_T^3 \\ll 1\\ \\text{（经典极限）}',
        note: 'Quantum statistics is required once $n\\lambda_T^3 \\gtrsim 1$: the metallic electron gas is strongly degenerate, whereas ordinary gases and semiconductor carriers are usually non-degenerate.',
      },
    ],
  },
};

export default map;
