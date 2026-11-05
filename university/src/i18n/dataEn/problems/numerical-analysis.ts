import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-na-1': {
    title: 'Lagrange Interpolation: Building the Polynomial',
    question:
      'Given $f(-1) = 1$, $f(0) = 0$, $f(1) = 1$, construct the quadratic interpolating polynomial through these three points.',
    hints: [
      'Three nodes ⇒ a unique quadratic polynomial. Use the Lagrange basis functions as switches, turning one on at a time.',
      'Guess from symmetry: the answer should be simple.',
    ],
    solution: [
      {
        title: 'Basis functions',
        detail:
          'For the nodes $-1, 0, 1$: $$\\ell_0 = \\frac{x(x-1)}{(-1)(-2)} = \\frac{x(x-1)}{2}, \\quad \\ell_1 = \\frac{(x+1)(x-1)}{-1} = 1 - x^2, \\quad \\ell_2 = \\frac{(x+1)x}{2}$$',
      },
      {
        title: 'Assembling the combination',
        detail:
          '$L_2(x) = 1 \\cdot \\ell_0 + 0 \\cdot \\ell_1 + 1 \\cdot \\ell_2 = \\frac{x(x-1)}{2} + \\frac{x(x+1)}{2} = x^2$.',
      },
      {
        title: 'Verification',
        detail: '$L_2(-1) = 1$, $L_2(0) = 0$, $L_2(1) = 1$ — exactly the parabola $y = x^2$, consistent with the symmetry.',
      },
    ],
    answer: '$L_2(x) = x^2$.',
    tags: ['Lagrange interpolation', 'Quadratic polynomial', 'Basis functions'],
  },
  'p-na-2': {
    title: 'Approximating an Integral with Simpson Rule',
    question: 'Use Simpson rule to approximate $\\displaystyle\\int_0^1 e^{-x^2}\\,dx$ (taking the midpoint $x = 0.5$).',
    hints: [
      'Simpson rule: $\\frac{b-a}{6}\\left[f(a) + 4f(\\frac{a+b}{2}) + f(b)\\right]$.',
      'Three function values are needed; compute $e^{-0.25} \\approx 0.7788$ with a calculator.',
    ],
    solution: [
      {
        title: 'Three sample values',
        detail: '$f(0) = 1$, $f(0.5) = e^{-0.25} \\approx 0.77880$, $f(1) = e^{-1} \\approx 0.36788$.',
      },
      {
        title: 'Substitution',
        detail:
          '$$S = \\frac{1}{6}\\left(1 + 4 \\times 0.77880 + 0.36788\\right) = \\frac{4.48308}{6} \\approx 0.74718$$',
      },
      {
        title: 'Comparison',
        detail:
          'The exact value is $\\approx 0.74682$ (related to the Gaussian error function). A single-panel Simpson rule reaches four-digit accuracy with only 3 points — the power of parabolic approximation. Subdividing the interval improves it further.',
      },
    ],
    answer: '$S \\approx 0.74718$ (exact value about $0.74682$).',
    tags: ['Simpson rule', 'Numerical integration', 'Error function'],
  },
  'p-na-3': {
    title: 'Condition Number and Sensitivity of the Solution',
    question:
      'Let $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$. Estimate the maximum amplification of a perturbation in the right-hand side when solving $Ax = b$ (that is, $\\kappa_\\infty(A)$).',
    hints: [
      '$\\kappa_\\infty(A) = \\|A\\|_\\infty\\,\\|A^{-1}\\|_\\infty$, where the $\\infty$-norm is the maximum row sum.',
      'Compute $A^{-1}$ first.',
    ],
    solution: [
      {
        title: 'Row-sum norm',
        detail: '$\\|A\\|_\\infty = \\max(1+2,\\ 3+4) = 7$.',
      },
      {
        title: 'Inverse matrix',
        detail: '$\\det A = -2$, $A^{-1} = \\frac{1}{-2}\\begin{pmatrix} 4 & -2 \\\\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} -2 & 1 \\\\ 1.5 & -0.5 \\end{pmatrix}$.',
      },
      {
        title: 'Condition number',
        detail: '$\\|A^{-1}\\|_\\infty = \\max(|-2|+1,\\ 1.5+0.5) = 3$. Hence $\\kappa_\\infty(A) = 7 \\times 3 = 21$. The condition number is modest, the system is well conditioned and numerical solution is reliable.',
      },
    ],
    answer: '$\\kappa_\\infty(A) = 21$, a well-conditioned matrix.',
    tags: ['Condition number', 'Matrix norm', 'Ill-conditioning'],
  },
};

export default map;
