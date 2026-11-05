import type { FormulaEntry, FormulaGroup } from '@/types';

type FormulaPatch = Partial<FormulaEntry> & { id: string };
type GroupPatch = Omit<Partial<FormulaGroup>, 'formulas'> & { formulas?: FormulaPatch[] };

const map: Record<string, GroupPatch> = {
  'computational-physics-fg1': {
    name: 'Error Analysis and Root Finding',
    formulas: [
      {
        id: 'computational-physics-f1',
        group: 'Error Measures',
        name: 'Absolute Error, Relative Error and Significant Digits',
        note: 'Valid when x = ±0.a_1a_2…a_n × 10^m carries n significant digits; a_1 is the leading significant digit',
      },
      {
        id: 'computational-physics-f2',
        group: 'Error Measures',
        name: 'Floating-Point Model and Machine Precision',
        note: 'IEEE 754 double precision; the worst-case accumulation over n operations is (1+u)^n ≈ 1 + nu',
      },
      {
        id: 'computational-physics-f3',
        group: 'Error Measures',
        name: 'Total Error and Optimal Step Size',
        note: 'Truncation error falls with h while rounding error grows as h shrinks; blindly reducing the step size makes the result worse',
      },
      {
        id: 'computational-physics-f4',
        group: 'Condition Number',
        name: 'Relative Condition Number and Forward Error',
        note: 'The condition number is a property of the problem; κ ≫ 1 means ill-conditioned, e.g. ln x has κ = 1/|ln x| → ∞ as x → 1',
      },
      {
        id: 'computational-physics-f5',
        group: 'Iterative Root Finding',
        name: 'Bisection Error Bound and Required Number of Steps',
        note: 'Converges whenever f(a)f(b) < 0 and f is continuous; each step delivers exactly one bit (about 0.301 decimal digits)',
      },
      {
        id: 'computational-physics-f6',
        group: 'Iterative Root Finding',
        name: 'Newton Iteration and Quadratic Convergence',
        note: 'Quadratic convergence at a simple root (the number of correct digits doubles); at a root of multiplicity m it degrades to linear convergence with ratio 1 − 1/m, requiring x_{k+1} = x_k − m f/f′',
      },
    ],
  },
  'computational-physics-fg2': {
    name: 'Numerical Integration and Ordinary Differential Equations',
    formulas: [
      {
        id: 'computational-physics-f7',
        group: 'Numerical Integration',
        name: 'Composite Trapezoidal Rule and Its Error',
        note: 'Algebraic accuracy 1; h = (b−a)/n; the global error is one order lower than the single-panel error',
      },
      {
        id: 'computational-physics-f8',
        group: 'Numerical Integration',
        name: 'Composite Simpson Rule and Its Error',
        note: 'Algebraic accuracy 3 (even-order Newton–Cotes gains one extra order from symmetry); the number of subintervals n must be even',
      },
      {
        id: 'computational-physics-f9',
        group: 'Numerical Integration',
        name: 'Romberg Recursion (Richardson Extrapolation)',
        note: 'Each column gains two orders of accuracy; (4T(h/2) − T(h))/3 is exactly the composite Simpson value, and repeated extrapolation gives the Romberg algorithm',
      },
      {
        id: 'computational-physics-f10',
        group: 'Numerical Differentiation',
        name: 'Central Difference and Optimal Step Size',
        note: 'Truncation error O(h²) but rounding error O(u/h); in double precision h_opt ≈ 6.7×10⁻⁶ and the best attainable accuracy is only about 10⁻¹⁰',
      },
      {
        id: 'computational-physics-f11',
        group: 'Ordinary Differential Equations',
        name: 'Euler Method and Stability Condition',
        note: 'Implicit Euler with G = (1 − hλ)^{-1} is A-stable; the trapezoidal rule G = (1 + z/2)/(1 − z/2) is also A-stable but not L-stable',
      },
      {
        id: 'computational-physics-f12',
        group: 'Ordinary Differential Equations',
        name: 'Fourth-Order Runge–Kutta Scheme (RK4)',
        note: 'Weights 1:2:2:1; local truncation error O(h⁵) and global error O(h⁴); the real-axis stability interval is about [−2.785, 0]',
      },
    ],
  },
  'computational-physics-fg3': {
    name: 'Finite Differences, Monte Carlo and Eigenvalues',
    formulas: [
      {
        id: 'computational-physics-f13',
        group: 'Finite Differences',
        name: 'Second-Derivative Difference and the FTCS Scheme',
        note: 'r = αΔt/Δx²; truncation error O(Δt) + O(Δx²), i.e. first order in time and second order in space',
      },
      {
        id: 'computational-physics-f14',
        group: 'Stability',
        name: 'CFL Stability Condition',
        note: 'Geometric meaning: the numerical domain of dependence must contain the physical one; Δt = O(Δx²) for parabolic and Δt = O(Δx) for hyperbolic problems',
      },
      {
        id: 'computational-physics-f15',
        group: 'Stability',
        name: 'von Neumann Amplification Factor and Spectral Radius',
        note: 'u^{n+1} = G u^n; the Lax equivalence theorem states consistency + stability ⇔ convergence; the most dangerous mode is the sawtooth with sin² = 1',
      },
      {
        id: 'computational-physics-f16',
        group: 'Monte Carlo',
        name: 'Monte Carlo Integral Estimator and Standard Error',
        note: 'Unbiased but converging only as N^{−1/2}; the error is independent of dimension, whereas d-dimensional composite quadrature is O(N^{−4/d}), so Monte Carlo wins in high dimensions',
      },
      {
        id: 'computational-physics-f17',
        group: 'Monte Carlo',
        name: 'Metropolis Acceptance Probability and Detailed Balance',
        note: 'The stationary distribution is the Boltzmann distribution π ∝ e^{−βE}; thermalization samples must be discarded and errors corrected for the autocorrelation time',
      },
      {
        id: 'computational-physics-f18',
        group: 'Eigenvalues',
        name: 'Power Iteration and the Rayleigh Quotient',
        note: 'Finds the eigenvalue of largest modulus; the Rayleigh quotient suppresses the vector error quadratically; shifted inverse iteration with (A − μI)^{−1} refines a known approximate eigenvalue',
      },
    ],
  },
};

export default map;
