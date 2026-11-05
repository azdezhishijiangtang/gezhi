import type { Problem } from '@/types';

export const odeProblems: Problem[] = [
  {
    id: 'p-ode-1',
    courseId: 'ode',
    topicId: 'first-order-ode',
    title: '一阶线性方程求通解',
    difficulty: 1,
    question:
      '求微分方程 $xy\' + y = x^2$ 的通解。',
    hints: [
      '先化成标准形式 $y\' + P(x)y = Q(x)$，识别为一阶线性方程。',
      '用常数变易公式：先解齐次，再把常数换成函数。',
    ],
    solution: [
      {
        title: '标准化',
        detail: '两边除以 $x$（$x \\ne 0$）：$y\' + \\dfrac{1}{x}y = x$。',
      },
      {
        title: '解齐次',
        detail:
          '$y\' + \\dfrac{y}{x} = 0$ 给出 $y = \\dfrac{C}{x}$。',
      },
      {
        title: '常数变易',
        detail:
          '设 $y = \\dfrac{C(x)}{x}$，代入原方程：$$\\frac{C\'(x)}{x} - \\frac{C(x)}{x^2} + \\frac{C(x)}{x^2} = x \\ \\Longrightarrow\\ C\'(x) = x^2$$故 $C(x) = \\dfrac{x^3}{3} + C$。',
      },
    ],
    answer: '通解 $y = \\dfrac{x^2}{3} + \\dfrac{C}{x}$。',
    tags: ['一阶线性', '常数变易', '通解'],
  },
  {
    id: 'p-ode-2',
    courseId: 'ode',
    topicId: 'higher-linear-ode',
    title: '常系数非齐次方程求特解',
    difficulty: 2,
    question:
      '求 $y\'\' - 3y\' + 2y = e^{2x}$ 的通解。',
    hints: [
      '特征方程 $\\lambda^2 - 3\\lambda + 2 = 0$ 的根决定齐次通解。',
      '自由项 $e^{2x}$ 的指数 2 恰好是特征单根，特解要乘一个 $x$。',
    ],
    solution: [
      {
        title: '齐次通解',
        detail:
          '特征方程 $(\\lambda - 1)(\\lambda - 2) = 0$，根 $1, 2$ 均为单根，齐次通解 $Y = C_1 e^{x} + C_2 e^{2x}$。',
      },
      {
        title: '设特解',
        detail:
          '$\\lambda = 2$ 是单特征根，取 $k = 1$，设 $y^* = a x e^{2x}$。',
      },
      {
        title: '定系数',
        detail:
          '代入方程：$(y^*)\' = a(1+2x)e^{2x}$，$(y^*)\'\' = a(4+4x)e^{2x}$。左边 $= e^{2x}\\big[a(4+4x) - 3a(1+2x) + 2ax\\big] = a e^{2x}$。故 $a = 1$，$y^* = x e^{2x}$。',
      },
    ],
    answer: '通解 $y = C_1 e^{x} + C_2 e^{2x} + x e^{2x}$。',
    tags: ['特征方程', '待定系数', '重根乘 x'],
  },
  {
    id: 'p-ode-3',
    courseId: 'ode',
    topicId: 'ode-systems',
    title: '线性方程组的平衡点分类',
    difficulty: 3,
    question:
      '分析系统 $\\begin{cases} x\' = x - y \\\\ y\' = x + y \\end{cases}$ 的平衡点及其类型。',
    hints: [
      '平衡点即两方程右端同时为零的点。',
      '算雅可比矩阵的特征值，按实部符号与虚实分类。',
    ],
    solution: [
      {
        title: '求平衡点',
        detail: '解 $x - y = 0,\\ x + y = 0$ 得唯一平衡点 $(0,0)$。',
      },
      {
        title: '雅可比与特征值',
        detail:
          '系统已是线性的，雅可比就是系数矩阵 $A = \\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$。特征方程 $(\\lambda-1)^2 + 1 = 0$，特征值 $\\lambda = 1 \\pm i$。',
      },
      {
        title: '分类',
        detail:
          '实部 $1 > 0$ 的一对共轭复根 ⇒ 不稳定螺旋点（焦点）。轨线螺旋式远离原点。若把符号反过来（$-x$ 型），则得到稳定螺旋，是阻尼振荡的相图。',
      },
    ],
    answer: '唯一平衡点 $(0,0)$，特征值 $1 \\pm i$，为不稳定螺旋点。',
    tags: ['相平面', '雅可比', '螺旋点'],
  },
];
