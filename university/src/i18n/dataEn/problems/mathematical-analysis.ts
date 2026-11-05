import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-ma-1': {
    title: 'Proving Existence of a Fixed Point via the Nested Interval Theorem',
    question:
      'Let $f:[0,1] \\to [0,1]$ be continuous. Prove that there exists $\\xi \\in [0,1]$ with $f(\\xi) = \\xi$ (a fixed point).',
    hints: [
      'Bisect the interval and see on which half the function $g(x) = f(x) - x$ changes sign at the two endpoints.',
      'Bisecting repeatedly produces a nested sequence of closed intervals; the nested interval theorem then gives the intersection point.',
    ],
    solution: [
      {
        title: 'Constructing the auxiliary function',
        detail:
          'Let $g(x) = f(x) - x$. Then $g(0) = f(0) \\ge 0$ and $g(1) = f(1) - 1 \\le 0$.',
      },
      {
        title: 'Bisection and the nested intervals',
        detail:
          'Take $[a_0,b_0] = [0,1]$. If $g\\!\\left(\\frac{a_n+b_n}{2}\\right) = 0$ we already have a fixed point; otherwise $g$ has opposite signs on the two sides of the midpoint, and we take the half-interval on which the sign changes as $[a_{n+1}, b_{n+1}]$. Then $[a_{n+1},b_{n+1}] \\subset [a_n,b_n]$ and $b_n - a_n = 2^{-n} \\to 0$.',
      },
      {
        title: 'Applying the nested interval theorem',
        detail:
          'There is a unique $\\xi$ belonging to every $[a_n,b_n]$. From $g(a_n) \\ge 0 \\ge g(b_n)$ and the continuity of $g$, letting $n \\to \\infty$ gives $g(\\xi) = 0$, i.e. $f(\\xi) = \\xi$.',
      },
    ],
    answer: 'There exists $\\xi \\in [0,1]$ with $f(\\xi) = \\xi$ (a special case of the one-dimensional Brouwer fixed point theorem).',
    tags: ['Supremum principle', 'Nested intervals', 'Continuous functions'],
  },
  'p-ma-2': {
    title: 'Testing a Series of Functions for Uniform Convergence',
    question:
      'Determine whether $\\displaystyle\\sum_{n=1}^{\\infty} \\frac{\\sin nx}{n^2}$ converges uniformly on $\\mathbb{R}$, and explain whether term-by-term integration is allowed.',
    hints: [
      'Try the Weierstrass M-test: find an upper bound for the absolute value of each term.',
      'If the convergence is uniform, recall the theorem on term-by-term integration of uniformly convergent series.',
    ],
    solution: [
      {
        title: 'The M-test',
        detail:
          'For any $x \\in \\mathbb{R}$, $\\left|\\dfrac{\\sin nx}{n^2}\\right| \\le \\dfrac{1}{n^2}$. Take $a_n = \\dfrac{1}{n^2}$; the series $\\sum \\frac{1}{n^2}$ converges.',
      },
      {
        title: 'Conclusion',
        detail:
          'By the Weierstrass M-test the original series converges uniformly on $\\mathbb{R}$. Its sum function is continuous on every finite interval.',
      },
      {
        title: 'Term-by-term integration',
        detail:
          'Uniform convergence ⇒ the series may be integrated term by term on any finite interval $[a,b]$, and the resulting integrated series still converges uniformly. Note that integrating term by term over an infinite interval (such as $\\mathbb{R}$) requires additional uniform control and cannot be applied directly.',
      },
    ],
    answer: 'It converges uniformly (M-test, dominating series $\\sum 1/n^2$); term-by-term integration is valid on finite intervals.',
    tags: ['Uniform convergence', 'M-test', 'Term-by-term integration'],
  },
  'p-ma-3': {
    title: 'Evaluating a Classical Integral by Differentiation with Respect to a Parameter',
    question:
      'Use an integral depending on a parameter to compute $\\displaystyle\\int_0^{\\infty} \\frac{\\sin x}{x}\\,dx$.',
    hints: [
      'It cannot be integrated directly. Introduce a parameter $t$ together with the "convergence factor" $e^{-tx}$, turning the answer into a function $F(t)$.',
      'Differentiate $F(t)$ and interchange differentiation with integration.',
      'Determine the constant from $F(\\infty) = 0$, with $F(0)$ as the target value.',
    ],
    solution: [
      {
        title: 'Introducing the parameter',
        detail:
          'Set $F(t) = \\displaystyle\\int_0^{\\infty} e^{-tx}\\,\\frac{\\sin x}{x}\\,dx$ ($t \\ge 0$). The required integral is $F(0)$, and $F(\\infty) = 0$.',
      },
      {
        title: 'Differentiating under the integral sign',
        detail:
          'Both $e^{-tx}\\frac{\\sin x}{x}$ and its partial derivative in $t$, namely $-e^{-tx}\\sin x$, are continuous and the dominated convergence condition holds, so$$F\'(t) = -\\int_0^{\\infty} e^{-tx}\\sin x\\,dx = -\\frac{1}{1+t^2}$$(using $\\sin x = \\operatorname{Im} e^{ix}$ or two integrations by parts).',
      },
      {
        title: 'Integrating to fix the constant',
        detail:
          '$F(t) = -\\arctan t + C$. From $F(\\infty) = 0$ we get $C = \\dfrac{\\pi}{2}$, hence $F(0) = \\dfrac{\\pi}{2}$.',
      },
    ],
    answer: '$\\displaystyle\\int_0^{\\infty} \\frac{\\sin x}{x}\\,dx = \\frac{\\pi}{2}$ (the Dirichlet integral).',
    tags: ['Parameter-dependent integral', 'Differentiation under the integral sign', 'Dirichlet integral'],
  },
};

export default map;
