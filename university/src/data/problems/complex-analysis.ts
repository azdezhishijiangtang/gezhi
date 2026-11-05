import type { Problem } from '@/types';

export const complex_analysisProblems: Problem[] = [
  {
    id: 'p-ca-1',
    courseId: 'complex-analysis',
    topicId: 'analytic-functions',
    title: '用 C–R 方程判断解析性',
    difficulty: 2,
    question:
      '讨论 $f(z) = e^{z^2}$ 的解析性，并求 $f\'(z)$。',
    hints: [
      '把 $f$ 拆成实部虚部，验证 C–R 方程。',
      '或者直接用：解析函数的复合仍解析，$e^w$ 与 $z^2$ 都解析。',
    ],
    solution: [
      {
        title: '复合论证',
        detail:
          '$g(z) = z^2$ 是全平面解析的多项式，$h(w) = e^w$ 是全平面解析的整函数。复合函数 $h(g(z))$ 在 $\\mathbb{C}$ 上解析。',
      },
      {
        title: '求导',
        detail:
          '链式法则在复解析函数中同样成立：$f\'(z) = e^{z^2} \\cdot 2z = 2z\\,e^{z^2}$。',
      },
      {
        title: '验证（可选）',
        detail:
          '写 $z = x+iy$，$z^2 = (x^2-y^2) + 2ixy$，则 $u = e^{x^2-y^2}\\cos 2xy$，$v = e^{x^2-y^2}\\sin 2xy$。直接求四个偏导可验证 $u_x = v_y$、$u_y = -v_x$，与链式法则结果一致。',
      },
    ],
    answer: '$f(z) = e^{z^2}$ 在 $\\mathbb{C}$ 上解析，$f\'(z) = 2z e^{z^2}$。',
    tags: ['C-R 方程', '复合函数', '整函数'],
  },
  {
    id: 'p-ca-2',
    courseId: 'complex-analysis',
    topicId: 'cauchy-theory',
    title: '柯西积分公式求围道积分',
    difficulty: 2,
    question:
      '计算 $\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z-1}\\,dz$。',
    hints: [
      '被积函数在圆周内部哪里不解析？奇点在哪？',
      '把分子看作解析函数 $f(z) = e^z$，直接套柯西积分公式。',
    ],
    solution: [
      {
        title: '分析奇点',
        detail:
          '分母在 $z = 1$ 处为零，$z = 1$ 在圆周 $|z| = 2$ 内部；分子 $e^z$ 处处解析。',
      },
      {
        title: '套公式',
        detail:
          '柯西积分公式：$\\displaystyle\\oint_C \\frac{f(z)}{z - z_0}\\,dz = 2\\pi i\\, f(z_0)$。这里 $f(z) = e^z$，$z_0 = 1$。',
      },
      {
        title: '得结果',
        detail: '$\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z-1}\\,dz = 2\\pi i\\, e^{1} = 2\\pi e\\,i$。',
      },
    ],
    answer: '$2\\pi e\\,i$。',
    tags: ['柯西公式', '围道积分', '奇点'],
  },
  {
    id: 'p-ca-3',
    courseId: 'complex-analysis',
    topicId: 'residues',
    title: '留数定理计算实积分',
    difficulty: 3,
    question:
      '计算 $\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{dx}{(x^2+1)^2}$。',
    hints: [
      '把实积分看作大半圆围道积分的实部/直接项，上半平面内找极点。',
      '分母 $(z^2+1)^2 = (z-i)^2(z+i)^2$，上半平面只有 $z = i$，是二阶极点。',
      '二阶极点留数用"乘开求一次导"的公式。',
    ],
    solution: [
      {
        title: '围道与极点',
        detail:
          '取围道 = 实轴 $[-R,R]$ + 上半圆 $C_R$。当 $R \\to \\infty$ 圆弧上积分趋于 0（被积函数按 $R^{-4}$ 衰减）。内部唯一极点 $z = i$，阶数 2。',
      },
      {
        title: '算留数',
        detail:
          '$$\\operatorname{Res}(f, i) = \\lim_{z \\to i} \\frac{d}{dz}\\left[(z-i)^2 \\frac{1}{(z-i)^2(z+i)^2}\\right] = \\lim_{z \\to i} \\frac{d}{dz}(z+i)^{-2} = -2(z+i)^{-3}\\Big|_{z=i} = \\frac{1}{4i}$$',
      },
      {
        title: '留数定理',
        detail:
          '原积分 $= 2\\pi i \\cdot \\operatorname{Res}(f, i) = 2\\pi i \\cdot \\dfrac{1}{4i} = \\dfrac{\\pi}{2}$。',
      },
    ],
    answer: '$\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{dx}{(x^2+1)^2} = \\frac{\\pi}{2}$。',
    tags: ['留数', '二阶极点', '实积分'],
  },
];
