import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-limit-1': {
    title: 'A Limit via the First Important Limit',
    question: 'Evaluate the limit $\\displaystyle \\lim_{x \\to 0} \\frac{\\sin 5x}{3x}$.',
    hints: [
      'Note that as $x \\to 0$ both numerator and denominator tend to 0, so this is of type $\\frac{0}{0}$.',
      'The aim is to produce the standard form $\\frac{\\sin u}{u}$ with $u \\to 0$.',
      'Multiply numerator and denominator by the same constant so that the denominator equals the "angle" $5x$ inside the sine.',
    ],
    solution: [
      {
        title: 'Identify the type',
        detail:
          'As $x \\to 0$, $\\sin 5x \\to 0$ and $3x \\to 0$, so the limit is of type $\\frac{0}{0}$; use the first important limit $\\lim_{u \\to 0}\\frac{\\sin u}{u} = 1$.',
      },
      {
        title: 'Produce the standard form',
        detail:
          'Divide numerator and denominator by $5$: $$\\frac{\\sin 5x}{3x} = \\frac{\\sin 5x}{5x} \\cdot \\frac{5}{3}$$',
      },
      {
        title: 'Apply the important limit',
        detail:
          'Let $u = 5x$; then $u \\to 0$ as $x \\to 0$, so $$\\lim_{x \\to 0} \\frac{\\sin 5x}{5x} = \\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$$',
      },
      {
        title: 'Conclusion',
        detail:
          '$$\\lim_{x \\to 0} \\frac{\\sin 5x}{3x} = \\frac{5}{3} \\cdot 1 = \\frac{5}{3}$$',
      },
    ],
    answer: '$\\dfrac{5}{3}$',
    tags: ['important limit', '0/0 form'],
  },

  'p-limit-2': {
    title: 'A Limit by Replacing with Equivalent Infinitesimals',
    question:
      'Evaluate the limit $\\displaystyle \\lim_{x \\to 0} \\frac{e^{2x} - 1}{\\ln(1 + 3x)}$.',
    hints: [
      'Both numerator and denominator are whole factors tending to 0, and they appear in a quotient.',
      'Recall that as $x \\to 0$, $e^x - 1 \\sim x$ and $\\ln(1+x) \\sim x$.',
      'The equivalent infinitesimals may replace the whole $2x$ in $e^{2x}-1$ and the whole $3x$ in $\\ln(1+3x)$.',
    ],
    solution: [
      {
        title: 'Analyse the structure',
        detail:
          'As $x \\to 0$, $e^{2x} - 1 \\sim 2x$ and $\\ln(1+3x) \\sim 3x$. Both are **multiplicative factors**, so the substitution of equivalent infinitesimals is legitimate.',
      },
      {
        title: 'Substitute and compute',
        detail:
          '$$\\lim_{x \\to 0} \\frac{e^{2x} - 1}{\\ln(1+3x)} = \\lim_{x \\to 0} \\frac{2x}{3x} = \\frac{2}{3}$$',
      },
      {
        title: 'Check (Taylor viewpoint)',
        detail:
          'More precisely: $e^{2x} - 1 = 2x + 2x^2 + o(x^2)$ and $\\ln(1+3x) = 3x - \\frac{9}{2}x^2 + o(x^2)$; the ratio of the first-order terms is $\\frac{2}{3}$, in agreement with the result.',
      },
    ],
    answer: '$\\dfrac{2}{3}$',
    tags: ['equivalent infinitesimals', '0/0 form'],
  },

  'p-taylor-1': {
    title: 'A Limit by Taylor Expansion',
    question:
      'Evaluate the limit $\\displaystyle \\lim_{x \\to 0} \\frac{\\cos x - 1 + \\frac{x^2}{2}}{x^4}$.',
    hints: [
      'Direct substitution gives $\\frac{0}{0}$; l\'Hôpital would require three derivatives, which is tedious.',
      'Expand $\\cos x$ about $x=0$ and see at which order it cancels against $-1 + \\frac{x^2}{2}$.',
      'Expanding up to the $x^4$ term is enough.',
    ],
    solution: [
      {
        title: 'Write the Maclaurin expansion',
        detail:
          '$$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} + o(x^4) = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} + o(x^4)$$',
      },
      {
        title: 'Substitute and cancel',
        detail:
          '$$\\cos x - 1 + \\frac{x^2}{2} = \\frac{x^4}{24} + o(x^4)$$ The lower-order terms $-\\frac{x^2}{2}$ and $+\\frac{x^2}{2}$ cancel exactly.',
      },
      {
        title: 'Take the limit',
        detail:
          '$$\\lim_{x \\to 0} \\frac{\\frac{x^4}{24} + o(x^4)}{x^4} = \\frac{1}{24}$$',
      },
    ],
    answer: '$\\dfrac{1}{24}$',
    tags: ['Taylor expansion', 'Maclaurin', '0/0 form'],
  },

  'p-integral-1': {
    title: 'A Definite Integral over a Symmetric Interval',
    question:
      'Compute $\\displaystyle \\int_{-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}} \\frac{x \\sin x}{1 + \\cos^2 x}\\,dx$.',
    hints: [
      'The interval of integration is symmetric about the origin, so first determine the parity of the integrand.',
      'The numerator is $x \\cdot \\sin x$ and the denominator contains $\\cos x$.',
      'If the integrand is even, the integral equals $2\\int_0^{\\frac{\\pi}{2}} \\frac{x\\sin x}{1+\\cos^2 x}\\,dx$.',
    ],
    solution: [
      {
        title: 'Determine the parity',
        detail:
          'Let $f(x) = \\dfrac{x\\sin x}{1 + \\cos^2 x}$; then $$f(-x) = \\frac{(-x)\\sin(-x)}{1 + \\cos^2(-x)} = \\frac{(-x)(-\\sin x)}{1 + \\cos^2 x} = f(x)$$ so $f$ is an **even function**.',
      },
      {
        title: 'Simplify using the symmetry',
        detail:
          '$$\\int_{-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}} f(x)\\,dx = 2\\int_0^{\\frac{\\pi}{2}} \\frac{x \\sin x}{1 + \\cos^2 x}\\,dx$$',
      },
      {
        title: 'Substitution and integration by parts',
        detail:
          'Let $u = \\cos x$; then $du = -\\sin x\\,dx$ and $x = \\arccos u$: $$2\\int_1^{0} \\frac{\\arccos u}{1+u^2}(-du) = 2\\int_0^1 \\frac{\\arccos u}{1+u^2}\\,du$$ Integrate $\\arccos u$ by parts, noting that $\\frac{d}{du}\\arctan u = \\frac{1}{1+u^2}$: $$= 2\\Big[\\arctan u \\cdot \\arccos u\\Big]_0^1 - 2\\int_0^1 \\arctan u \\cdot \\frac{-1}{\\sqrt{1-u^2}}\\,du$$',
      },
      {
        title: 'Evaluating the second term',
        detail:
          '$$2\\int_0^1 \\frac{\\arctan u}{\\sqrt{1-u^2}}\\,du$$ Now set $u = \\cos\\theta$ (which just returns to $\\theta = \\arccos u$, with $\\theta$ running from $\\frac{\\pi}{2}$ to $0$): $$= 2\\int_{\\frac{\\pi}{2}}^{0} \\frac{\\arctan(\\cos\\theta)}{\\sin\\theta}(-\\sin\\theta)\\,d\\theta = 2\\int_0^{\\frac{\\pi}{2}} \\arctan(\\cos\\theta)\\,d\\theta$$ On $\\big[0, \\frac{\\pi}{2}\\big]$ we have $\\arctan(\\cos\\theta) + \\arctan(\\sin\\theta) = \\frac{\\pi}{2}$ (the product of the two tangents is $1$), and by symmetry $\\int_0^{\\frac{\\pi}{2}} \\arctan(\\sin\\theta)\\,d\\theta = \\int_0^{\\frac{\\pi}{2}} \\arctan(\\cos\\theta)\\,d\\theta$, so this integral equals $\\frac{\\pi}{2}\\cdot\\frac{\\pi}{4} = \\frac{\\pi^2}{8}$, i.e. half of $2 \\times \\frac{\\pi^2}{8} = \\frac{\\pi^2}{4}$... by symmetry directly we get $$\\int_0^{\\frac{\\pi}{2}} \\arctan(\\cos\\theta)\\,d\\theta = \\frac{\\pi^2}{8}$$ Thus the original integral $= 0 + 2 \\cdot \\frac{\\pi^2}{8} = \\frac{\\pi^2}{4}$.',
      },
    ],
    answer: '$\\dfrac{\\pi^2}{4}$',
    tags: ['definite integral', 'parity', 'integration by parts'],
  },
};

export default map;
