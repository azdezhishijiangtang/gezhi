import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-sp-1': {
    title: 'Find the stationary distribution of a Markov chain',
    question:
      'Suppose the daily transition matrix of sunny/rainy weather in some place is $P = \\begin{pmatrix} 0.8 & 0.2 \\\\ 0.4 & 0.6 \\end{pmatrix}$ (1 = sunny, 2 = rainy). Find the long-run fraction of sunny days.',
    hints: [
      'The stationary distribution $\\pi$ satisfies $\\pi P = \\pi$ and $\\pi_1 + \\pi_2 = 1$.',
      'A finite irreducible chain has a unique stationary distribution.',
    ],
    solution: [
      {
        title: 'Write the equations',
        detail:
          '$\\pi_1 = 0.8\\pi_1 + 0.4\\pi_2$, i.e. $0.2\\pi_1 = 0.4\\pi_2$, hence $\\pi_1 = 2\\pi_2$.',
      },
      {
        title: 'Normalise',
        detail: '$\\pi_1 + \\pi_2 = 1$ together with $\\pi_1 = 2\\pi_2$ gives $\\pi_1 = \\frac{2}{3}$, $\\pi_2 = \\frac{1}{3}$.',
      },
      {
        title: 'Conclusion',
        detail:
          'The long-run fraction of sunny days is $\\frac{2}{3}$. This is independent of whether it rains today (ergodicity)—a Markov chain "forgets" its initial state.',
      },
    ],
    answer: 'The long-run fraction of sunny days is $\\pi_1 = \\frac{2}{3}$.',
    tags: ['Stationary distribution', 'Transition matrix', 'Ergodicity'],
  },
  'p-sp-2': {
    title: 'Probability computations for a Poisson process',
    question:
      'Cars arrive at an intersection according to a Poisson process with intensity $\\lambda = 6$ cars per minute. Find the probability that exactly 10 cars arrive in the next 2 minutes, and the mean waiting time until the next car.',
    hints: [
      'The probability of $k$ arrivals in a time interval $t$ is Poisson: $\\frac{(\\lambda t)^k e^{-\\lambda t}}{k!}$.',
      'Interarrival times are exponential $E(\\lambda)$ with mean $1/\\lambda$.',
    ],
    solution: [
      {
        title: 'Counting probability',
        detail:
          '$t = 2$, $\\lambda t = 12$. $$P(N(2) = 10) = \\frac{12^{10} e^{-12}}{10!} \\approx 0.105$$',
      },
      {
        title: 'Waiting time',
        detail: 'The wait for the next car is $T \\sim E(6)$, so $E[T] = \\frac{1}{6}$ minute $= 10$ seconds.',
      },
      {
        title: 'Memorylessness',
        detail:
          'If you have already waited 30 seconds with no car, the expected remaining wait is still 10 seconds—the "counter-intuitive" feature of the Poisson process, arising from the memorylessness of the exponential distribution.',
      },
    ],
    answer: '$P(N(2)=10) = \\frac{12^{10}e^{-12}}{10!} \\approx 0.105$; the mean wait is $10$ seconds.',
    tags: ['Poisson process', 'Exponential distribution', 'Memorylessness'],
  },
  'p-sp-3': {
    title: 'Computing the expected stopping time via the martingale property',
    question:
      'Let $\\{B_t\\}$ be a standard Brownian motion and $\\tau$ the first hitting time of $\\{-1, +1\\}$. Verify that $E[B_\\tau] = 0$ and explain it using optional stopping.',
    hints: [
      'Brownian motion is itself a martingale; does the stopping time $\\tau$ satisfy the conditions of the optional stopping theorem (bounded? uniformly integrable?)?',
      '$\\tau$ is almost surely finite and $E[\\tau] = 1$ (this can be shown with the quadratic martingale $B_t^2 - t$).',
    ],
    solution: [
      {
        title: 'Stopping time and boundedness',
        detail:
          '$\\tau$ is a stopping time (whether it has been hit depends only on the past). $\\tau$ is not bounded, but $E[\\tau] < \\infty$, so the bounded-second-moment version of the optional stopping theorem applies.',
      },
      {
        title: 'Optional stopping',
        detail:
          'This gives $E[B_\\tau] = E[B_0] = 0$. On the other hand $B_\\tau = \\pm 1$ (by symmetry $P(B_\\tau = 1) = P(B_\\tau = -1) = \\frac{1}{2}$), and directly $E[B_\\tau] = 1 \\cdot \\frac{1}{2} + (-1) \\cdot \\frac{1}{2} = 0$—consistent.',
      },
      {
        title: 'Expected stopping time',
        detail:
          'Apply optional stopping to the martingale $M_t = B_t^2 - t$ (with $E[M_\\tau] = 0$): $E[B_\\tau^2] - E[\\tau] = 0$, i.e. $1 - E[\\tau] = 0$, hence $E[\\tau] = 1$ second. A gambler wandering between $\\pm 1$ reaches a decision in 1 time unit on average.',
      },
    ],
    answer: '$E[B_\\tau] = 0$ (the expectation of a martingale is conserved); and $E[\\tau] = 1$ (obtained from the martingale $B_t^2 - t$).',
    tags: ['Martingale', 'Optional stopping', 'Brownian motion'],
  },
};

export default map;
