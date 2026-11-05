import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-fa-1': {
    title: 'Finding an Iterative Limit via the Contraction Mapping Principle',
    question:
      'Let $T: [0,1] \\to [0,1]$ with $T(x) = \\dfrac{x}{3} + \\dfrac{1}{x+2}$. Prove that $T$ is a contraction mapping and find its fixed point (an approximation will do).',
    hints: [
      'Verify $|T(x) - T(y)| \\le q|x-y|$: estimate the two terms separately.',
      'The Lipschitz constant of the $\\frac{x}{3}$ term is $\\frac{1}{3}$; for the second term, use the mean value theorem to bound its maximum derivative.',
    ],
    solution: [
      {
        title: 'Checking contractivity',
        detail:
          '$$|T(x)-T(y)| \\le \\frac{|x-y|}{3} + \\left|\\frac{1}{x+2} - \\frac{1}{y+2}\\right| = \\frac{|x-y|}{3} + \\frac{|x-y|}{(x+2)(y+2)}$$The denominator of the second term is $\\ge 4$, hence $|T(x)-T(y)| \\le \\left(\\frac{1}{3} + \\frac{1}{4}\\right)|x-y| = \\frac{7}{12}|x-y| < |x-y|$. So $T$ is a contraction ($q = 7/12$).',
      },
      {
        title: 'Self-mapping',
        detail:
          '$T(x) \\ge 0$ is obvious; $T(x) \\le \\frac{1}{3} + \\frac{1}{2} = \\frac{5}{6} \\le 1$. Hence $T$ maps $[0,1]$ into itself.',
      },
      {
        title: 'Fixed point',
        detail:
          'Solve $x = \\frac{x}{3} + \\frac{1}{x+2}$: rearranging gives $\\frac{2x}{3} = \\frac{1}{x+2}$, i.e. $2x^2 + 4x - 3 = 0$, with positive root $x^* = \\frac{-2 + \\sqrt{10}}{2} \\approx 0.581$. By the Banach fixed point theorem this is the unique fixed point.',
      },
    ],
    answer: '$T$ is a contraction mapping ($q = \\frac{7}{12}$), with unique fixed point $x^* = \\dfrac{-2+\\sqrt{10}}{2} \\approx 0.581$.',
    tags: ['Contraction mapping', 'Fixed point', 'Banach theorem'],
  },
  'p-fa-2': {
    title: 'Best Approximation and Orthogonal Projection',
    question:
      'In $L^2[-1,1]$, find the best approximation of $f(x) = x^2$ by a polynomial of degree one (minimizing $\\int_{-1}^1 (p(x) - x^2)^2 dx$).',
    hints: [
      'The space of linear polynomials is spanned by $\\{1, x\\}$. The best approximation is the orthogonal projection onto this basis.',
      'The basis $\\{1, x\\}$ is already orthogonal on $[-1,1]$, so the projection coefficients are ratios of inner products.',
    ],
    solution: [
      {
        title: 'Computing the projection',
        detail:
          '$\\langle x^2, 1 \\rangle = \\int_{-1}^1 x^2\\,dx = \\frac{2}{3}$ and $\\|1\\|^2 = 2$, so the constant coefficient is $\\frac{1}{3}$. Also $\\langle x^2, x \\rangle = \\int_{-1}^1 x^3\\,dx = 0$ (odd function), so the linear coefficient is 0.',
      },
      {
        title: 'Best approximation',
        detail: '$p(x) = \\dfrac{1}{3}$ (an even function is best approximated by an even function, as expected).',
      },
      {
        title: 'Checking orthogonality',
        detail:
          'The error $x^2 - \\frac{1}{3}$ has zero inner product with both $1$ and $x$ — precisely the projection theorem statement "the error is ⟂ to the approximation space". The squared error is $= \\int (x^2 - \\frac{1}{3})^2 = \\frac{4}{45}$.',
      },
    ],
    answer: 'The best linear approximation is $p(x) = \\dfrac{1}{3}$, with mean square error $\\frac{4}{45}$.',
    tags: ['Orthogonal projection', 'Best approximation', 'L2'],
  },
  'p-fa-3': {
    title: 'Norm and Spectrum of the Shift Operator',
    question:
      'On $\\ell^2$ define the **left shift operator** $S(x_1, x_2, \\dots) = (x_2, x_3, \\dots)$. Find $\\|S\\|$ and the spectrum $\\sigma(S)$.',
    hints: [
      'Operator norm: $\\|S\\| = \\sup_{\\|x\\|=1} \\|Sx\\|$.',
      'Spectrum: when is $\\lambda I - S$ not invertible? Try solving $Sx = \\lambda x$ and constructing the inverse operator.',
    ],
    solution: [
      {
        title: 'Norm',
        detail:
          '$\\|Sx\\|_2^2 = \\sum_{n=2}^\\infty |x_n|^2 \\le \\sum_{n=1}^\\infty |x_n|^2 = \\|x\\|_2^2$, so $\\|S\\| \\le 1$. Taking $x = e_2 = (0,1,0,\\dots)$ gives $\\|Se_2\\| = \\|e_1\\| = 1$, hence $\\|S\\| = 1$.',
      },
      {
        title: 'Eigenvalues',
        detail:
          '$Sx = \\lambda x$ gives $x_{n+1} = \\lambda x_n$, i.e. $x_n = \\lambda^{n-1}x_1$. If $\\lambda \\ne 0$ then we must have $x_1 = 0$ (otherwise the sequence is not in $\\ell^2$), so $S$ has **no eigenvalues** — completely unlike a finite-dimensional matrix!',
      },
      {
        title: 'Spectrum',
        detail:
          'When $|\\lambda| > 1$ the operator $\\lambda I - S$ is invertible (the inverse is given by a Neumann series); when $|\\lambda| < 1$, taking $x = (1, \\lambda, \\lambda^2, \\dots)$ shows that the range is dense but $\\lambda I - S$ is not surjective, hence not invertible. Therefore $\\sigma(S) = \\{\\lambda : |\\lambda| \\le 1\\}$ — the whole closed unit disk, and the spectrum is purely continuous.',
      },
    ],
    answer: '$\\|S\\| = 1$; the spectrum is the closed unit disk $\\{|\\lambda| \\le 1\\}$, with no eigenvalues (purely continuous spectrum).',
    tags: ['Shift operator', 'Operator spectrum', 'Continuous spectrum'],
  },
};

export default map;
