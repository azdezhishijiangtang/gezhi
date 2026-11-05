import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-ra-1': {
    title: 'Prove that a countable set has Lebesgue measure zero',
    question: 'Prove that the Lebesgue measure of $\\mathbb{Q} \\cap [0,1]$ is 0.',
    hints: [
      'A singleton has measure 0 (cover it by an arbitrarily small interval).',
      'A countable set is a countable union of singletons; use countable subadditivity of measure.',
    ],
    solution: [
      {
        title: 'Measure of a singleton',
        detail:
          'Given any $\\varepsilon > 0$, the single point $\\{x\\}$ is covered by the interval $\\left(x - \\tfrac{\\varepsilon}{2^{n+1}},\\ x + \\tfrac{\\varepsilon}{2^{n+1}}\\right)$, whose length can be arbitrarily small, hence $m(\\{x\\}) = 0$.',
      },
      {
        title: 'Countable union',
        detail:
          'Let $E = \\{x_1, x_2, \\dots\\}$. Cover $x_n$ by an interval of length $\\varepsilon/2^n$; then $m(E) \\le \\sum_n \\frac{\\varepsilon}{2^n} = \\varepsilon$.',
      },
      {
        title: 'Conclusion',
        detail:
          'Since $\\varepsilon$ is arbitrary, $m(E) = 0$. Hence $m(\\mathbb{Q} \\cap [0,1]) = 0$—even though the rationals are dense in $[0,1]$: "infinitely many points" yet "measure zero".',
      },
    ],
    answer: '$m(\\mathbb{Q} \\cap [0,1]) = 0$ (a countable set has measure zero, even though it is dense).',
    tags: ['Lebesgue measure', 'Countable sets', 'Subadditivity'],
  },
  'p-ra-2': {
    title: 'Interchanging limit and integral via dominated convergence',
    question:
      'Compute $\\displaystyle\\lim_{n \\to \\infty} \\int_0^1 \\frac{n x}{1 + n^2 x^2}\\,dx$.',
    hints: [
      'First find the pointwise limit: for fixed $x > 0$, what does the integrand tend to?',
      'Find a dominating function $g(x)$: for every $n$, the integrand is bounded by some integrable function.',
    ],
    solution: [
      {
        title: 'Pointwise limit',
        detail:
          '$\\dfrac{nx}{1+n^2x^2} = \\dfrac{x/n}{1/n^2 + x^2}$. For $x > 0$ this tends to $0$; at $x = 0$ it equals 0. The pointwise limit is 0 everywhere.',
      },
      {
        title: 'Finding a dominating function',
        detail:
          'By AM-GM, $1 + n^2x^2 \\ge 2nx$, so $\\dfrac{nx}{1+n^2x^2} \\le \\dfrac{1}{2}$. Take $g(x) \\equiv \\dfrac{1}{2}$, which is integrable.',
      },
      {
        title: 'DCT',
        detail:
          'The dominated convergence theorem gives the limit $= \\int_0^1 0\\,dx = 0$. (A direct computation also verifies it: after substitution the integral $= \\arctan n \\to \\pi/2$……note that the direct computation here gives $\\dfrac{\\ln(1+n^2)}{2n} \\to 0$—consistent.)',
      },
    ],
    answer: 'The limit is $0$.',
    tags: ['Dominated convergence', 'Interchange of limits', 'DCT'],
  },
  'p-ra-3': {
    title: 'Verify the triangle inequality in L²',
    question:
      'Let $f, g \\in L^2([0,1])$. Prove that $\\|f + g\\|_2 \\le \\|f\\|_2 + \\|g\\|_2$ (Minkowski\'s inequality).',
    hints: [
      'Expand $\\|f+g\\|_2^2 = \\int (f+g)^2$ and write it with inner-product notation.',
      'Apply the Cauchy–Schwarz inequality to the cross term.',
    ],
    solution: [
      {
        title: 'Expand',
        detail:
          '$\\|f+g\\|_2^2 = \\int (f+g)^2 = \\|f\\|_2^2 + 2\\langle f,g\\rangle + \\|g\\|_2^2$.',
      },
      {
        title: 'Cauchy–Schwarz',
        detail:
          '$\\langle f,g\\rangle \\le |\\langle f,g\\rangle| \\le \\|f\\|_2\\,\\|g\\|_2$.',
      },
      {
        title: 'Complete the square',
        detail:
          'Hence $\\|f+g\\|_2^2 \\le \\|f\\|_2^2 + 2\\|f\\|_2\\|g\\|_2 + \\|g\\|_2^2 = \\big(\\|f\\|_2 + \\|g\\|_2\\big)^2$, and taking square roots gives the result.',
      },
    ],
    answer: '$\\|f+g\\|_2 \\le \\|f\\|_2 + \\|g\\|_2$ (the triangle inequality holds, so $L^2$ is a normed space).',
    tags: ['L2 space', 'Minkowski', 'Cauchy-Schwarz'],
  },
};

export default map;
