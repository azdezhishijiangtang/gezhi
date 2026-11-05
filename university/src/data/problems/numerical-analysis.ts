import type { Problem } from '@/types';

export const numerical_analysisProblems: Problem[] = [
  {
    id: 'p-na-1',
    courseId: 'numerical-analysis',
    topicId: 'interpolation',
    title: '拉格朗日插值构造多项式',
    difficulty: 1,
    question:
      '已知 $f(-1) = 1$、$f(0) = 0$、$f(1) = 1$。构造过这三点的二次插值多项式。',
    hints: [
      '三个节点 ⇒ 唯一二次多项式。用拉格朗日基函数逐个"开关"。',
      '由对称性猜一猜：答案应该很简单。',
    ],
    solution: [
      {
        title: '基函数',
        detail:
          '节点 $-1, 0, 1$：$$\\ell_0 = \\frac{x(x-1)}{(-1)(-2)} = \\frac{x(x-1)}{2}, \\quad \\ell_1 = \\frac{(x+1)(x-1)}{-1} = 1 - x^2, \\quad \\ell_2 = \\frac{(x+1)x}{2}$$',
      },
      {
        title: '组合',
        detail:
          '$L_2(x) = 1 \\cdot \\ell_0 + 0 \\cdot \\ell_1 + 1 \\cdot \\ell_2 = \\frac{x(x-1)}{2} + \\frac{x(x+1)}{2} = x^2$。',
      },
      {
        title: '验证',
        detail: '$L_2(-1) = 1$，$L_2(0) = 0$，$L_2(1) = 1$——正是抛物线 $y = x^2$，对称性吻合。',
      },
    ],
    answer: '$L_2(x) = x^2$。',
    tags: ['拉格朗日插值', '二次多项式', '基函数'],
  },
  {
    id: 'p-na-2',
    courseId: 'numerical-analysis',
    topicId: 'numerical-integration',
    title: '辛普森公式近似积分',
    difficulty: 1,
    question: '用辛普森公式近似计算 $\\displaystyle\\int_0^1 e^{-x^2}\\,dx$（取中点 $x = 0.5$）。',
    hints: [
      '辛普森公式：$\\frac{b-a}{6}\\left[f(a) + 4f(\\frac{a+b}{2}) + f(b)\\right]$。',
      '需要三个点的函数值，用计算器算 $e^{-0.25} \\approx 0.7788$。',
    ],
    solution: [
      {
        title: '三点值',
        detail: '$f(0) = 1$，$f(0.5) = e^{-0.25} \\approx 0.77880$，$f(1) = e^{-1} \\approx 0.36788$。',
      },
      {
        title: '代入',
        detail:
          '$$S = \\frac{1}{6}\\left(1 + 4 \\times 0.77880 + 0.36788\\right) = \\frac{4.48308}{6} \\approx 0.74718$$',
      },
      {
        title: '对比',
        detail:
          '真值 $\\approx 0.74682$（高斯误差函数相关）。单段辛普森仅用 3 个点就达到 4 位精度——抛物线逼近的威力。细分区间可进一步提高。',
      },
    ],
    answer: '$S \\approx 0.74718$（真值约 $0.74682$）。',
    tags: ['辛普森', '数值积分', '误差函数'],
  },
  {
    id: 'p-na-3',
    courseId: 'numerical-analysis',
    topicId: 'numerical-linear',
    title: '条件数与解的敏感性',
    difficulty: 2,
    question:
      '设 $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$。估算解 $Ax = b$ 时右端扰动的最大放大倍数（即 $\\kappa_\\infty(A)$）。',
    hints: [
      '$\\kappa_\\infty(A) = \\|A\\|_\\infty\\,\\|A^{-1}\\|_\\infty$，其中 $\\infty$-范数是最大行和。',
      '先算 $A^{-1}$。',
    ],
    solution: [
      {
        title: '行和范数',
        detail: '$\\|A\\|_\\infty = \\max(1+2,\\ 3+4) = 7$。',
      },
      {
        title: '逆矩阵',
        detail: '$\\det A = -2$，$A^{-1} = \\frac{1}{-2}\\begin{pmatrix} 4 & -2 \\\\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} -2 & 1 \\\\ 1.5 & -0.5 \\end{pmatrix}$。',
      },
      {
        title: '条件数',
        detail: '$\\|A^{-1}\\|_\\infty = \\max(|-2|+1,\\ 1.5+0.5) = 3$。故 $\\kappa_\\infty(A) = 7 \\times 3 = 21$。条件数温和，方程组良态，数值求解可靠。',
      },
    ],
    answer: '$\\kappa_\\infty(A) = 21$，良态矩阵。',
    tags: ['条件数', '矩阵范数', '病态'],
  },
];
