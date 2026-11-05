import type { Problem } from '@/types';

export const calculusProblems: Problem[] = [

  {
    id: 'p-limit-1',
    courseId: 'calculus',
    topicId: 'limits',
    title: '利用第一重要极限求极限',
    difficulty: 1,
    question: '求极限 $\\displaystyle \\lim_{x \\to 0} \\frac{\\sin 5x}{3x}$。',
    hints: [
      '观察到 $x \\to 0$ 时分子分母都趋于 0，属于 $\\frac{0}{0}$ 型。',
      '目标是凑出标准形 $\\frac{\\sin u}{u}$，其中 $u \\to 0$。',
      '把分子分母同乘一个常数，使分母恰好等于 $\\sin$ 的"角度" $5x$。',
    ],
    solution: [
      {
        title: '判断类型',
        detail: '当 $x \\to 0$ 时，$\\sin 5x \\to 0$，$3x \\to 0$，故为 $\\frac{0}{0}$ 型，考虑第一重要极限 $\\lim_{u \\to 0}\\frac{\\sin u}{u} = 1$。',
      },
      {
        title: '凑标准形',
        detail: '将分子分母同除以 $5$：$$\\frac{\\sin 5x}{3x} = \\frac{\\sin 5x}{5x} \\cdot \\frac{5}{3}$$',
      },
      {
        title: '利用重要极限',
        detail: '令 $u = 5x$，则 $x \\to 0$ 时 $u \\to 0$，于是$$\\lim_{x \\to 0} \\frac{\\sin 5x}{5x} = \\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$$',
      },
      {
        title: '得出结论',
        detail: '$$\\lim_{x \\to 0} \\frac{\\sin 5x}{3x} = \\frac{5}{3} \\cdot 1 = \\frac{5}{3}$$',
      },
    ],
    answer: '$\\dfrac{5}{3}$',
    tags: ['重要极限', '0/0 型'],
  },

  {
    id: 'p-limit-2',
    courseId: 'calculus',
    topicId: 'limits',
    title: '等价无穷小替换求极限',
    difficulty: 2,
    question:
      '求极限 $\\displaystyle \\lim_{x \\to 0} \\frac{e^{2x} - 1}{\\ln(1 + 3x)}$。',
    hints: [
      '分子分母都是趋于 0 的"整体因子"，且以乘积/商的形式出现。',
      '回忆 $x \\to 0$ 时 $e^x - 1 \\sim x$ 与 $\\ln(1+x) \\sim x$。',
      '等价无穷小可以直接替换 $e^{2x}-1$ 中的 $2x$ 整体与 $\\ln(1+3x)$ 中的 $3x$ 整体。',
    ],
    solution: [
      {
        title: '分析结构',
        detail: '当 $x \\to 0$ 时，$e^{2x} - 1 \\sim 2x$，$\\ln(1+3x) \\sim 3x$。二者均为**乘除因子**，满足等价无穷小替换条件。',
      },
      {
        title: '替换计算',
        detail: '$$\\lim_{x \\to 0} \\frac{e^{2x} - 1}{\\ln(1+3x)} = \\lim_{x \\to 0} \\frac{2x}{3x} = \\frac{2}{3}$$',
      },
      {
        title: '验证（泰勒观点）',
        detail: '更精细地看：$e^{2x} - 1 = 2x + 2x^2 + o(x^2)$，$\\ln(1+3x) = 3x - \\frac{9}{2}x^2 + o(x^2)$，一阶项之比为 $\\frac{2}{3}$，结论一致。',
      },
    ],
    answer: '$\\dfrac{2}{3}$',
    tags: ['等价无穷小', '0/0 型'],
  },

  {
    id: 'p-taylor-1',
    courseId: 'calculus',
    topicId: 'taylor',
    title: '用泰勒展开求极限',
    difficulty: 2,
    question:
      '求极限 $\\displaystyle \\lim_{x \\to 0} \\frac{\\cos x - 1 + \\frac{x^2}{2}}{x^4}$。',
    hints: [
      '直接代入得 $\\frac{0}{0}$，洛必达要导三次，较繁琐。',
      '把 $\\cos x$ 在 $x=0$ 处泰勒展开，看与 $-1 + \\frac{x^2}{2}$ 相消到哪一阶。',
      '展开到 $x^4$ 项即可。',
    ],
    solution: [
      {
        title: '写出麦克劳林展开',
        detail: '$$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} + o(x^4) = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} + o(x^4)$$',
      },
      {
        title: '代入并相消',
        detail: '$$\\cos x - 1 + \\frac{x^2}{2} = \\frac{x^4}{24} + o(x^4)$$低阶项 $-\\frac{x^2}{2}$ 与 $+\\frac{x^2}{2}$ 恰好抵消。',
      },
      {
        title: '求极限',
        detail: '$$\\lim_{x \\to 0} \\frac{\\frac{x^4}{24} + o(x^4)}{x^4} = \\frac{1}{24}$$',
      },
    ],
    answer: '$\\dfrac{1}{24}$',
    tags: ['泰勒展开', '麦克劳林', '0/0 型'],
  },

  {
    id: 'p-integral-1',
    courseId: 'calculus',
    topicId: 'integrals',
    title: '对称区间上的定积分',
    difficulty: 2,
    question:
      '计算 $\\displaystyle \\int_{-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}} \\frac{x \\sin x}{1 + \\cos^2 x}\\,dx$。',
    hints: [
      '积分区间关于原点对称，先判断被积函数的奇偶性。',
      '分子是 $x \\cdot \\sin x$，分母含 $\\cos x$。',
      '若为偶函数，则原积分等于 $2\\int_0^{\\frac{\\pi}{2}} \\frac{x\\sin x}{1+\\cos^2 x}\\,dx$。',
    ],
    solution: [
      {
        title: '判断奇偶性',
        detail: '记 $f(x) = \\dfrac{x\\sin x}{1 + \\cos^2 x}$，则$$f(-x) = \\frac{(-x)\\sin(-x)}{1 + \\cos^2(-x)} = \\frac{(-x)(-\\sin x)}{1 + \\cos^2 x} = f(x)$$故 $f$ 为**偶函数**。',
      },
      {
        title: '利用对称性化简',
        detail: '$$\\int_{-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}} f(x)\\,dx = 2\\int_0^{\\frac{\\pi}{2}} \\frac{x \\sin x}{1 + \\cos^2 x}\\,dx$$',
      },
      {
        title: '换元与分部积分',
        detail: '令 $u = \\cos x$，则 $du = -\\sin x\\,dx$，且 $x = \\arccos u$：$$2\\int_1^{0} \\frac{\\arccos u}{1+u^2}(-du) = 2\\int_0^1 \\frac{\\arccos u}{1+u^2}\\,du$$对 $\\arccos u$ 分部积分，注意 $\\frac{d}{du}\\arctan u = \\frac{1}{1+u^2}$：$$= 2\\Big[\\arctan u \\cdot \\arccos u\\Big]_0^1 - 2\\int_0^1 \\arctan u \\cdot \\frac{-1}{\\sqrt{1-u^2}}\\,du$$',
      },
      {
        title: '第二项的计算',
        detail: '$$2\\int_0^1 \\frac{\\arctan u}{\\sqrt{1-u^2}}\\,du$$再令 $u = \\cos\\theta$（即回到 $\\theta = \\arccos u$，$\\theta$ 从 $\\frac{\\pi}{2}$ 到 $0$）：$$= 2\\int_{\\frac{\\pi}{2}}^{0} \\frac{\\arctan(\\cos\\theta)}{\\sin\\theta}(-\\sin\\theta)\\,d\\theta = 2\\int_0^{\\frac{\\pi}{2}} \\arctan(\\cos\\theta)\\,d\\theta$$由于在 $\\big[0, \\frac{\\pi}{2}\\big]$ 上 $\\arctan(\\cos\\theta) + \\arctan(\\sin\\theta) = \\frac{\\pi}{2}$（两角正切乘积为 $1$），且由对称性 $\\int_0^{\\frac{\\pi}{2}} \\arctan(\\sin\\theta)\\,d\\theta = \\int_0^{\\frac{\\pi}{2}} \\arctan(\\cos\\theta)\\,d\\theta$，故该积分为 $\\frac{\\pi}{2}\\cdot\\frac{\\pi}{4} = \\frac{\\pi^2}{8}$，即 $2 \\times \\frac{\\pi^2}{8} = \\frac{\\pi^2}{4}$ 的一半……直接对称性可得$$\\int_0^{\\frac{\\pi}{2}} \\arctan(\\cos\\theta)\\,d\\theta = \\frac{\\pi^2}{8}$$故原式 $= 0 + 2 \\cdot \\frac{\\pi^2}{8} = \\frac{\\pi^2}{4}$。',
      },
    ],
    answer: '$\\dfrac{\\pi^2}{4}$',
    tags: ['定积分', '奇偶性', '分部积分'],
  },
];
