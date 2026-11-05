import type { FormulaGroup } from '@/types';

const map: Record<string, Partial<FormulaGroup>> = {
  'quantum-mechanics-fg1': {
    name: 'Basic Framework',
    formulas: [
      { id: 'quantum-mechanics-f1', group: 'Evolution Equation', name: 'Time-Dependent Schrödinger Equation', latex: 'i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\vec{r}, t) = \\hat{H}\\Psi(\\vec{r}, t)', note: 'A linear homogeneous equation ⇒ the superposition principle holds' },
      { id: 'quantum-mechanics-f2', group: 'Evolution Equation', name: 'Time-Independent Schrödinger Equation', latex: '-\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V\\psi = E\\psi', note: 'Separate variables as Ψ = ψ e^{−iEt/ħ} when V has no explicit t dependence' },
      { id: 'quantum-mechanics-f3', group: 'Statistical Interpretation', name: 'Born Statistical Interpretation', latex: 'dP = |\\Psi(\\vec{r}, t)|^2\\, dV', note: '|Ψ|² is the probability density; normalisation ∫|Ψ|²dV = 1' },
      { id: 'quantum-mechanics-f4', group: 'Operators and Measurement', name: 'Eigenvalue Problem for Hermitian Operators', latex: '\\hat{A}^{\\dagger} = \\hat{A},\\quad \\hat{A}\\psi_n = \\lambda_n\\psi_n', note: 'The λₙ are real; eigenfunctions belonging to different eigenvalues are orthonormal and complete' },
      { id: 'quantum-mechanics-f5', group: 'Operators and Measurement', name: 'Fundamental Commutation Relation', latex: '[\\hat{x}, \\hat{p}_x] = i\\hbar', note: 'The heart of quantisation; the quantisation rule [q, p] = iħ' },
      { id: 'quantum-mechanics-f6', group: 'Operators and Measurement', name: 'Uncertainty Relation', latex: '\\Delta A\\, \\Delta B \\ge \\frac{1}{2}\\left|\\langle[\\hat{A}, \\hat{B}]\\rangle\\right|', note: 'Special case Δx·Δp ≥ ħ/2' },
    ],
  },
  'quantum-mechanics-fg2': {
    name: 'Canonical Models',
    formulas: [
      { id: 'quantum-mechanics-f7', group: 'Infinite Square Well', name: 'Well Energy Levels', latex: 'E_n = \\frac{n^2\\pi^2\\hbar^2}{2ma^2},\\quad n = 1, 2, 3, \\ldots', note: 'The ground state is the zero-point energy; E ∝ n², so the levels are not equally spaced' },
      { id: 'quantum-mechanics-f8', group: 'Infinite Square Well', name: 'Well Wavefunctions', latex: '\\psi_n(x) = \\sqrt{\\frac{2}{a}}\\sin\\frac{n\\pi x}{a},\\quad 0 < x < a', note: 'Standing waves with fixed ends; the n-th state has n−1 interior nodes' },
      { id: 'quantum-mechanics-f9', group: 'Harmonic Oscillator', name: 'Harmonic-Oscillator Energy Levels', latex: 'E_n = \\left(n + \\frac{1}{2}\\right)\\hbar\\omega,\\quad n = 0, 1, 2, \\ldots', note: 'Equally spaced by ħω; zero-point energy E₀ = ħω/2' },
      { id: 'quantum-mechanics-f10', group: 'Harmonic Oscillator', name: 'Ladder Operators and Hamiltonian', latex: 'H = \\hbar\\omega\\left(a^{\\dagger}a + \\frac{1}{2}\\right),\\quad [a, a^{\\dagger}] = 1', note: 'The eigenvalues of a†a are the non-negative integers n' },
      { id: 'quantum-mechanics-f11', group: 'Barrier Tunnelling', name: 'Transmission Coefficient of a Rectangular Barrier', latex: 'T \\approx e^{-2\\kappa a},\\quad \\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}', note: 'For E < V₀ and κa ≫ 1; the theoretical basis of α decay and the STM' },
      { id: 'quantum-mechanics-f12', group: 'Angular Momentum', name: 'Angular-Momentum Eigenvalue Spectrum', latex: '\\hat{L}^2 \\to l(l+1)\\hbar^2,\\quad \\hat{L}_z \\to m\\hbar', note: 'l = 0, 1, 2, …; m = −l, …, +l; ladder operators L±|l,m⟩ = ħ√((l∓m)(l±m+1))|l,m±1⟩' },
    ],
  },
  'quantum-mechanics-fg3': {
    name: 'Approximation Methods',
    formulas: [
      { id: 'quantum-mechanics-f13', group: 'Stationary Perturbation Theory', name: 'First-Order Energy Correction', latex: 'E_n^{(1)} = \\langle n^{(0)}|\\hat{H}^{\\prime}|n^{(0)}\\rangle', note: 'The average of the perturbation in the unperturbed state' },
      { id: 'quantum-mechanics-f14', group: 'Stationary Perturbation Theory', name: 'Second-Order Energy Correction', latex: 'E_n^{(2)} = \\sum_{m \\ne n} \\frac{\\left|\\langle m^{(0)}|\\hat{H}^{\\prime}|n^{(0)}\\rangle\\right|^2}{E_n^{(0)} - E_m^{(0)}}', note: 'The ground state always shifts down; levels repel each other' },
      { id: 'quantum-mechanics-f15', group: 'Stationary Perturbation Theory', name: 'Secular Equation for Degenerate Perturbation', latex: '\\det\\left(H^{\\prime}_{ij} - E^{(1)}\\delta_{ij}\\right) = 0', note: 'Diagonalise H′ inside the degenerate subspace' },
      { id: 'quantum-mechanics-f16', group: 'Time-Dependent Perturbation Theory', name: 'Transition Probability (First Order)', latex: 'P_{n \\to m}(t) = \\frac{1}{\\hbar^2}\\left|\\int_0^t H^{\\prime}_{mn}(t^{\\prime})\\, e^{i\\omega_{mn}t^{\\prime}}\\, dt^{\\prime}\\right|^2', note: 'ω_{mn} = (E_m − E_n)/ħ' },
      { id: 'quantum-mechanics-f17', group: 'Time-Dependent Perturbation Theory', name: 'Fermi’s Golden Rule', latex: 'w = \\frac{2\\pi}{\\hbar}\\left|V_{mn}\\right|^2\\rho(E_m)', note: 'Transition rate from a periodic perturbation into a continuum of final states; ρ is the density of final states' },
      { id: 'quantum-mechanics-f18', group: 'Variational Method', name: 'Variational Upper Bound', latex: 'E_0 \\le \\frac{\\langle\\psi|\\hat{H}|\\psi\\rangle}{\\langle\\psi|\\psi\\rangle}', note: 'Minimising over parameterised trial wavefunctions gives an upper bound on the ground-state energy' },
    ],
  },
};

export default map;
