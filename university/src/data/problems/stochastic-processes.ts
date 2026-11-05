import type { Problem } from '@/types';

export const stochastic_processesProblems: Problem[] = [
  {
    id: 'p-sp-1',
    courseId: 'stochastic-processes',
    topicId: 'markov-chains',
    title: '求马尔可夫链的平稳分布',
    difficulty: 2,
    question:
      '设某地每天晴雨状态的转移矩阵为 $P = \\begin{pmatrix} 0.8 & 0.2 \\\\ 0.4 & 0.6 \\end{pmatrix}$（1=晴，2=雨）。求长期中晴天所占比例。',
    hints: [
      '平稳分布 $\\pi$ 满足 $\\pi P = \\pi$ 且 $\\pi_1 + \\pi_2 = 1$。',
      '有限不可约链的平稳分布唯一。',
    ],
    solution: [
      {
        title: '列方程',
        detail:
          '$\\pi_1 = 0.8\\pi_1 + 0.4\\pi_2$，即 $0.2\\pi_1 = 0.4\\pi_2$，故 $\\pi_1 = 2\\pi_2$。',
      },
      {
        title: '归一化',
        detail: '$\\pi_1 + \\pi_2 = 1$ 配合 $\\pi_1 = 2\\pi_2$ 得 $\\pi_1 = \\frac{2}{3}$，$\\pi_2 = \\frac{1}{3}$。',
      },
      {
        title: '结论',
        detail:
          '长期晴天比例 $\\frac{2}{3}$。这与今天是否下雨无关（遍历性）——马尔可夫链会"忘记"初始状态。',
      },
    ],
    answer: '长期晴天比例 $\\pi_1 = \\frac{2}{3}$。',
    tags: ['平稳分布', '转移矩阵', '遍历性'],
  },
  {
    id: 'p-sp-2',
    courseId: 'stochastic-processes',
    topicId: 'poisson-process',
    title: '泊松过程的概率计算',
    difficulty: 2,
    question:
      '某路口车流按强度 $\\lambda = 6$ 辆/分钟的泊松过程到达。求接下来 2 分钟内恰好来 10 辆车的概率，以及平均等待下一辆车的时间。',
    hints: [
      '时间段 $t$ 内到达 $k$ 辆的概率是泊松分布 $\\frac{(\\lambda t)^k e^{-\\lambda t}}{k!}$。',
      '间隔服从指数分布 $E(\\lambda)$，均值 $1/\\lambda$。',
    ],
    solution: [
      {
        title: '计数概率',
        detail:
          '$t = 2$，$\\lambda t = 12$。$$P(N(2) = 10) = \\frac{12^{10} e^{-12}}{10!} \\approx 0.105$$',
      },
      {
        title: '等待时间',
        detail: '下一辆车等待 $T \\sim E(6)$，$E[T] = \\frac{1}{6}$ 分钟 $= 10$ 秒。',
      },
      {
        title: '无记忆性',
        detail:
          '若已经等了 30 秒还没车，剩余等待的期望仍是 10 秒——泊松过程的"反直觉"特性，源于指数分布的无记忆性。',
      },
    ],
    answer: '$P(N(2)=10) = \\frac{12^{10}e^{-12}}{10!} \\approx 0.105$；平均等待 $10$ 秒。',
    tags: ['泊松过程', '指数分布', '无记忆性'],
  },
  {
    id: 'p-sp-3',
    courseId: 'stochastic-processes',
    topicId: 'brownian-martingale',
    title: '用鞅性质计算停时期望',
    difficulty: 3,
    question:
      '设 $\\{B_t\\}$ 是标准布朗运动，$\\tau$ 是首次击中 $\\{-1, +1\\}$ 的时刻。验证 $E[B_\\tau] = 0$ 并用可选停时解释。',
    hints: [
      '布朗运动本身是鞅；停时 $\\tau$ 是否满足可选停时定理的条件（有界？一致可积？）。',
      '$\\tau$ 几乎必然有限，且 $E[\\tau] = 1$（可用二次鞅 $B_t^2 - t$ 证明）。',
    ],
    solution: [
      {
        title: '停时与有界性',
        detail:
          '$\\tau$ 是停时（是否已击中只依赖过去）。$\\tau$ 不是有限停时，但 $E[\\tau] < \\infty$，可用可选停时定理的有界二阶矩版本。',
      },
      {
        title: '可选停时',
        detail:
          '由 $E[B_\\tau] = E[B_0] = 0$。另一方面 $B_\\tau = \\pm 1$（对称性 $P(B_\\tau = 1) = P(B_\\tau = -1) = \\frac{1}{2}$），直接验证 $E[B_\\tau] = 1 \\cdot \\frac{1}{2} + (-1) \\cdot \\frac{1}{2} = 0$，一致。',
      },
      {
        title: '停时期望',
        detail:
          '对鞅 $M_t = B_t^2 - t$（$E[M_\\tau] = 0$）应用可选停时：$E[B_\\tau^2] - E[\\tau] = 0$，即 $1 - E[\\tau] = 0$，故 $E[\\tau] = 1$ 秒。赌徒在 $\\pm 1$ 之间游走，平均 1 单位时间见分晓。',
      },
    ],
    answer: '$E[B_\\tau] = 0$（鞅的期望守恒）；且 $E[\\tau] = 1$（由 $B_t^2 - t$ 鞅得到）。',
    tags: ['鞅', '可选停时', '布朗运动'],
  },
];
