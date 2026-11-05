import type { Problem } from '@/types';

export const functional_analysisProblems: Problem[] = [
  {
    id: 'p-fa-1',
    courseId: 'functional-analysis',
    topicId: 'banach-spaces',
    title: '用压缩映射原理求迭代极限',
    difficulty: 2,
    question:
      '设 $T: [0,1] \\to [0,1]$，$T(x) = \\dfrac{x}{3} + \\dfrac{1}{x+2}$。证明 $T$ 是压缩映射并求其不动点（近似即可）。',
    hints: [
      '检验 $|T(x) - T(y)| \\le q|x-y|$：对两项分别估计。',
      '$\\frac{x}{3}$ 项的 Lipschitz 常数是 $\\frac{1}{3}$；第二项用中值定理估计最大导数。',
    ],
    solution: [
      {
        title: '压缩性检验',
        detail:
          '$$|T(x)-T(y)| \\le \\frac{|x-y|}{3} + \\left|\\frac{1}{x+2} - \\frac{1}{y+2}\\right| = \\frac{|x-y|}{3} + \\frac{|x-y|}{(x+2)(y+2)}$$第二项分母 $\\ge 4$，故 $|T(x)-T(y)| \\le \\left(\\frac{1}{3} + \\frac{1}{4}\\right)|x-y| = \\frac{7}{12}|x-y| < |x-y|$。$T$ 是压缩（$q = 7/12$）。',
      },
      {
        title: '自映射',
        detail:
          '$T(x) \\ge 0$ 显然；$T(x) \\le \\frac{1}{3} + \\frac{1}{2} = \\frac{5}{6} \\le 1$。故 $T$ 映 $[0,1]$ 入自身。',
      },
      {
        title: '不动点',
        detail:
          '解方程 $x = \\frac{x}{3} + \\frac{1}{x+2}$：移项得 $\\frac{2x}{3} = \\frac{1}{x+2}$，即 $2x^2 + 4x - 3 = 0$，正根 $x^* = \\frac{-2 + \\sqrt{10}}{2} \\approx 0.581$。由巴拿赫不动点定理这是唯一不动点。',
      },
    ],
    answer: '$T$ 是压缩映射（$q = \\frac{7}{12}$），唯一不动点 $x^* = \\dfrac{-2+\\sqrt{10}}{2} \\approx 0.581$。',
    tags: ['压缩映射', '不动点', '巴拿赫定理'],
  },
  {
    id: 'p-fa-2',
    courseId: 'functional-analysis',
    topicId: 'hilbert-spaces',
    title: '最佳逼近与正交投影',
    difficulty: 2,
    question:
      '在 $L^2[-1,1]$ 中，用一次多项式最佳逼近 $f(x) = x^2$（最小化 $\\int_{-1}^1 (p(x) - x^2)^2 dx$）。',
    hints: [
      '一次多项式空间由 $\\{1, x\\}$ 张成。最佳逼近 = 在这组基上的正交投影。',
      '基 $\\{1, x\\}$ 在 $[-1,1]$ 上恰好正交，投影系数是内积比值。',
    ],
    solution: [
      {
        title: '算投影',
        detail:
          '$\\langle x^2, 1 \\rangle = \\int_{-1}^1 x^2\\,dx = \\frac{2}{3}$，$\\|1\\|^2 = 2$，故常数项系数 $\\frac{1}{3}$。$\\langle x^2, x \\rangle = \\int_{-1}^1 x^3\\,dx = 0$（奇函数），一次项系数 0。',
      },
      {
        title: '最佳逼近',
        detail: '$p(x) = \\dfrac{1}{3}$（偶函数被偶函数最佳逼近，合理）。',
      },
      {
        title: '验证正交性',
        detail:
          '误差 $x^2 - \\frac{1}{3}$ 与 $1$ 和 $x$ 的内积都为 0——正是投影定理"误差 ⟂ 逼近空间"的体现。误差平方 $= \\int (x^2 - \\frac{1}{3})^2 = \\frac{4}{45}$。',
      },
    ],
    answer: '最佳一次逼近为 $p(x) = \\dfrac{1}{3}$，均方误差 $\\frac{4}{45}$。',
    tags: ['正交投影', '最佳逼近', 'L2'],
  },
  {
    id: 'p-fa-3',
    courseId: 'functional-analysis',
    topicId: 'operators',
    title: '求移位算子的范数与谱',
    difficulty: 3,
    question:
      '在 $\\ell^2$ 上定义**左移位算子** $S(x_1, x_2, \\dots) = (x_2, x_3, \\dots)$。求 $\\|S\\|$ 与谱 $\\sigma(S)$。',
    hints: [
      '算子范数：$\\|S\\| = \\sup_{\\|x\\|=1} \\|Sx\\|$。',
      '谱：$\\lambda I - S$ 何时不可逆？试解 $Sx = \\lambda x$ 与逆算子的构造。',
    ],
    solution: [
      {
        title: '范数',
        detail:
          '$\\|Sx\\|_2^2 = \\sum_{n=2}^\\infty |x_n|^2 \\le \\sum_{n=1}^\\infty |x_n|^2 = \\|x\\|_2^2$，故 $\\|S\\| \\le 1$。取 $x = e_2 = (0,1,0,\\dots)$，$\\|Se_2\\| = \\|e_1\\| = 1$，故 $\\|S\\| = 1$。',
      },
      {
        title: '特征值',
        detail:
          '$Sx = \\lambda x$ 给出 $x_{n+1} = \\lambda x_n$，即 $x_n = \\lambda^{n-1}x_1$。若 $\\lambda \\ne 0$，只有 $x_1 = 0$（否则不在 $\\ell^2$），故 $S$ **无特征值**——与有限维矩阵截然不同！',
      },
      {
        title: '谱',
        detail:
          '当 $|\\lambda| > 1$ 时 $\\lambda I - S$ 可逆（逆由 Neumann 级数给出）；当 $|\\lambda| < 1$ 时，取 $x = (1, \\lambda, \\lambda^2, \\dots)$ 可知值域稠密但 $\\lambda I - S$ 不满射，不可逆。故 $\\sigma(S) = \\{\\lambda : |\\lambda| \\le 1\\}$——整个闭单位圆盘，纯连续谱。',
      },
    ],
    answer: '$\\|S\\| = 1$；谱为闭单位圆盘 $\\{|\\lambda| \\le 1\\}$，无特征值（纯连续谱）。',
    tags: ['移位算子', '算子谱', '连续谱'],
  },
];
