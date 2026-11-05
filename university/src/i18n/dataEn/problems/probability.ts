import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-bayes-1': {
    title: 'Bayesian Inference in a Medical Test',
    question:
      'The prevalence of a disease in the population is $0.5\\%$. A test detects the disease in a truly diseased person with probability $99\\%$ (sensitivity), while a healthy person tests positive with probability $2\\%$ (false positive rate). If a person tests positive, what is the probability that he really has the disease?',
    hints: [
      'Define the events: $B_1$ = diseased, $B_2$ = healthy, $A$ = positive test.',
      'Given the prior $P(B_1) = 0.005$ and the likelihoods $P(A \\mid B_1) = 0.99$, $P(A \\mid B_2) = 0.02$.',
      'You want the posterior $P(B_1 \\mid A)$ from Bayes formula, with the law of total probability in the denominator.',
    ],
    solution: [
      {
        title: 'Defining the events',
        detail: '$B_1$: diseased, $B_2$: healthy, $A$: positive test. $B_1, B_2$ form a partition of the sample space:$$P(B_1) = 0.005, \\quad P(B_2) = 0.995$$$$P(A \\mid B_1) = 0.99, \\quad P(A \\mid B_2) = 0.02$$',
      },
      {
        title: 'Total probability: probability of a positive test',
        detail: '$$P(A) = P(B_1)P(A \\mid B_1) + P(B_2)P(A \\mid B_2)$$$$= 0.005 \\times 0.99 + 0.995 \\times 0.02 = 0.00495 + 0.0199 = 0.02485$$',
      },
      {
        title: 'Posterior via Bayes formula',
        detail: '$$P(B_1 \\mid A) = \\frac{P(B_1)P(A \\mid B_1)}{P(A)} = \\frac{0.00495}{0.02485} \\approx 0.1992$$',
      },
      {
        title: 'Interpreting the result',
        detail: 'Although the test is "very accurate" (sensitivity 99%), the **base rate is extremely low** (0.5%), so only about $19.9\\%$ of positive results come from truly diseased people — most positives are false positives drawn from the large healthy population. This is the classic illustration of the base rate fallacy.',
      },
    ],
    answer: 'About $19.9\\%$',
    tags: ['Bayes formula', 'Total probability', 'Medical testing'],
  },
  'p-dist-1': {
    title: 'Probability Computations for a Normal Distribution',
    question:
      'The scores of a subject examination follow $X \\sim N(72, \\sigma^2)$, and it is known that $P(X \\le 60) = 0.1$. Find $P(60 \\le X \\le 84)$ and the fraction of students scoring above 84.',
    hints: [
      'Standardise the normal variable first: $Z = \\frac{X - \\mu}{\\sigma} \\sim N(0,1)$.',
      'From $P(X \\le 60) = 0.1$ look up the standard normal quantile $z_{0.1} \\approx -1.282$.',
      'Solve for $\\sigma$ from this, then compute the probability of the target interval.',
    ],
    solution: [
      {
        title: 'Standardisation and the given condition',
        detail: '$Z = \\frac{X - 72}{\\sigma} \\sim N(0,1)$.$$P(X \\le 60) = P\\!\\left(Z \\le \\frac{60-72}{\\sigma}\\right) = \\Phi\\!\\left(\\frac{-12}{\\sigma}\\right) = 0.1$$ From the table $\\Phi(-1.282) \\approx 0.1$, hence$$\\frac{-12}{\\sigma} = -1.282 \\Rightarrow \\sigma \\approx 9.36$$',
      },
      {
        title: 'Computing P(60 ≤ X ≤ 84)',
        detail: '$$P(60 \\le X \\le 84) = \\Phi\\!\\left(\\frac{84-72}{9.36}\\right) - \\Phi\\!\\left(\\frac{60-72}{9.36}\\right) = \\Phi(1.282) - \\Phi(-1.282)$$$$= (1 - 0.1) - 0.1 = 0.8$$',
      },
      {
        title: 'Fraction above 84',
        detail: '$$P(X > 84) = 1 - \\Phi(1.282) = 1 - 0.9 = 0.1$$ that is, about $10\\%$ of the students score above 84. Indeed $84 = 72 + 12$ and $60 = 72 - 12$ are symmetric about the mean, so each tail carries probability $0.1$.',
      },
    ],
    answer: '$P(60 \\le X \\le 84) = 0.8$; the fraction scoring above 84 is about $10\\%$.',
    tags: ['Normal distribution', 'Standardisation', 'Quantile'],
  },
};

export default map;
