import type { FormulaEntry, FormulaGroup } from '@/types';

type FormulaPatch = Partial<FormulaEntry> & { id: string };
type GroupPatch = Omit<Partial<FormulaGroup>, 'formulas'> & { formulas?: FormulaPatch[] };

const map: Record<string, GroupPatch> = {
  'mathematical-physics-fg1': {
    name: 'Complex Functions and Contour Integration',
    formulas: [
      {
        id: 'mathematical-physics-f1',
        group: 'Analyticity',
        name: 'Cauchy–Riemann Conditions',
        note: 'f = u + iv is analytic ⟺ u and v are differentiable and satisfy the C-R conditions; f\\prime = u_x + i v_x',
      },
      {
        id: 'mathematical-physics-f2',
        group: 'Analyticity',
        name: 'Laplace Equation (Harmonicity)',
        note: 'The real and imaginary parts of an analytic function are both harmonic and conjugate to each other',
      },
      {
        id: 'mathematical-physics-f3',
        group: 'Contour Integration',
        name: 'Cauchy Integral Formula and Derivative Formula',
        note: 'The function value and all its derivatives at an interior point are completely fixed by the boundary values',
      },
      {
        id: 'mathematical-physics-f4',
        group: 'Contour Integration',
        name: 'Residue Theorem',
        note: 'C encloses finitely many isolated singularities; the residue is the coefficient of (z−z_k)^{−1} in the Laurent expansion',
      },
      {
        id: 'mathematical-physics-f5',
        group: 'Computing Residues',
        name: 'Residue Formulas for Poles',
        note: 'If f = P/Q and Q has a simple zero, the residue at the simple pole is P(z_0)/Q\\prime(z_0)',
      },
      {
        id: 'mathematical-physics-f6',
        group: 'Applications to Real Integrals',
        name: 'Real Integrals over an Infinite Interval',
        note: "R is rational with the denominator at least two degrees higher than the numerator; for trigonometric integrals use e^{imz} together with Jordan's lemma",
      },
      {
        id: 'mathematical-physics-f7',
        group: 'Series Expansions',
        name: 'Laurent Expansion',
        note: 'Valid whenever f is analytic in the annulus r < |z − z_0| < R; the number of negative powers determines the type of singularity',
      },
    ],
  },
  'mathematical-physics-fg2': {
    name: 'Fourier Analysis and Boundary-Value Problems',
    formulas: [
      {
        id: 'mathematical-physics-f8',
        group: 'Fourier Series',
        name: 'Trigonometric Series and Coefficient Formulas',
        note: 'Piecewise smoothness suffices; at a discontinuity the series converges to the average of the one-sided limits',
      },
      {
        id: 'mathematical-physics-f9',
        group: 'Fourier Transform',
        name: 'Fourier Transform Pair',
        note: 'Derivative property F[f\\prime] = i\\omega F; convolution theorem F[f*g] = F G',
      },
      {
        id: 'mathematical-physics-f10',
        group: 'Delta Function',
        name: 'Sifting Property',
        note: 'F[δ] = 1; the standard mathematical representation of a point source or unit impulse',
      },
      {
        id: 'mathematical-physics-f11',
        group: 'Wave Equation',
        name: "d'Alembert's Formula",
        note: 'Free vibration of an unbounded string; the solution is a left-moving plus a right-moving wave, with domain of dependence [x−at, x+at]',
      },
      {
        id: 'mathematical-physics-f12',
        group: 'Heat Equation',
        name: 'Solution of the Initial-Value Problem (heat-kernel convolution)',
        note: 'The Gaussian heat kernel widens as √t; for t > 0 the solution is infinitely smooth',
      },
      {
        id: 'mathematical-physics-f13',
        group: 'Separation of Variables',
        name: 'Eigenvalue Problem and Orthogonal Expansion',
        note: 'Eigenfunctions are orthogonal: ∫ X_m X_n dx = (l/2) δ_{mn}; completeness guarantees that the expansion is valid',
      },
    ],
  },
  'mathematical-physics-fg3': {
    name: 'Special Functions',
    formulas: [
      {
        id: 'mathematical-physics-f14',
        group: 'Legendre Polynomials',
        name: 'Legendre Equation and Rodrigues Formula',
        note: 'l = 0, 1, 2, …; the boundedness condition selects the polynomial solutions, with P_l(1) = 1',
      },
      {
        id: 'mathematical-physics-f15',
        group: 'Legendre Polynomials',
        name: 'Generating Function',
        note: 'The mathematical core of the multipole expansion; setting x = cosθ gives the expansion of the on-axis point-charge potential',
      },
      {
        id: 'mathematical-physics-f16',
        group: 'Legendre Polynomials',
        name: 'Recurrence Relation and Orthogonality',
        note: 'Squared norm N_l² = 2/(2l+1); the recurrence is used to fix coefficients in low-order expansions',
      },
      {
        id: 'mathematical-physics-f17',
        group: 'Spherical Harmonics',
        name: 'Spherical Harmonics and Orthonormality',
        note: 'l = 0, 1, …; m = −l, …, +l; a complete orthonormal system on the unit sphere',
      },
      {
        id: 'mathematical-physics-f18',
        group: 'Bessel Functions',
        name: 'Bessel Equation and Series Solution',
        note: 'Keep only J_ν when the region contains the cylinder axis (Y_ν diverges at the origin)',
      },
      {
        id: 'mathematical-physics-f19',
        group: 'Bessel Functions',
        name: 'Fourier–Bessel Expansion and Eigenvalues from Zeros',
        note: 'Weight x; μ_m^{(n)} is the m-th positive zero of J_n; the squared norm is (x_0²/2) J_{n+1}²(μ_m^{(n)})',
      },
    ],
  },
};

export default map;
