import type { Problem } from '@/types';

export const pdeProblems: Problem[] = [
  {
    id: 'p-pde-1',
    courseId: 'pde',
    topicId: 'typical-pde',
    title: '用能量法证明热方程解的唯一性',
    difficulty: 2,
    question:
      '设 $u$ 满足 $u_t = u_{xx}$（$0 < x < L$，$t > 0$），$u(0,t) = u(L,t) = 0$，$u(x,0) = 0$。证明 $u \\equiv 0$。',
    hints: [
      '唯一性标准套路：设两个解之差 $w$，证明 $w$ 满足齐次方程与齐次条件，再证 $w = 0$。',
      '构造能量 $E(t) = \\int_0^L w^2\\,dx$，看它随时间的导数。',
    ],
    solution: [
      {
        title: '设差解',
        detail:
          '设 $u_1, u_2$ 两解，$w = u_1 - u_2$。则 $w_t = w_{xx}$，齐次边界 $w(0,t)=w(L,t)=0$，齐次初值 $w(x,0)=0$。',
      },
      {
        title: '能量法',
        detail:
          '定义 $E(t) = \\int_0^L w^2\\,dx$。则$$E\'(t) = 2\\int_0^L w w_t\\,dx = 2\\int_0^L w w_{xx}\\,dx = 2\\big[ww_x\\big]_0^L - 2\\int_0^L w_x^2\\,dx \\le 0$$边界项因 $w=0$ 消失。',
      },
      {
        title: '结论',
        detail:
          '$E(t)$ 递减但 $E(t) \\ge 0$，且 $E(0) = 0$，故 $E(t) \\equiv 0$，即 $w \\equiv 0$。两解相同，解唯一。',
      },
    ],
    answer: '$u \\equiv 0$（热方程在齐次条件下解唯一）。',
    tags: ['唯一性', '能量法', '热传导方程'],
  },
  {
    id: 'p-pde-2',
    courseId: 'pde',
    topicId: 'fourier-separation',
    title: '分离变量法解热传导问题',
    difficulty: 3,
    question:
      '解定解问题：$u_t = u_{xx}$（$0<x<\\pi$），$u(0,t)=u(\\pi,t)=0$，$u(x,0) = \\sin x$。',
    hints: [
      '设 $u = X(x)T(t)$，代入后分离出 $X\'\' + \\lambda X = 0$。',
      '边界条件筛出本征值 $\\lambda = n^2$ 与本征函数 $\\sin nx$。',
      '初始数据恰好是单个本征函数——答案会非常简洁。',
    ],
    solution: [
      {
        title: '分离变量',
        detail:
          '设 $u = XT$，代入得 $\\dfrac{T\'}{T} = \\dfrac{X\'\'}{X} = -\\lambda$。空间部分 $X\'\' + \\lambda X = 0$ 配 $X(0)=X(\\pi)=0$，得 $\\lambda_n = n^2$，$X_n = \\sin nx$。',
      },
      {
        title: '时间部分',
        detail: '$T\' = -n^2 T$ 给出 $T_n = e^{-n^2 t}$。一般解 $u = \\sum_{n=1}^{\\infty} b_n e^{-n^2 t}\\sin nx$。',
      },
      {
        title: '定系数',
        detail:
          '初值 $\\sin x = \\sum b_n \\sin nx$ 直接读出 $b_1 = 1$，其余为 0。',
      },
    ],
    answer: '$u(x,t) = e^{-t}\\sin x$——高温部分随时间指数衰减，正是热扩散的直观图像。',
    tags: ['分离变量', '本征值', '热传导'],
  },
  {
    id: 'p-pde-3',
    courseId: 'pde',
    topicId: 'green-functions',
    title: '用格林函数解两点边值问题',
    difficulty: 3,
    question:
      '解 $-u\'\' = 1$（$0 < x < 1$），$u(0) = u(1) = 0$。',
    hints: [
      '一维格林函数是分段线性的"梁变形"，在中点对接处连续、导数跳跃。',
      '解 = 格林函数 × 源（这里是常数 1）的积分，直接积出来。',
    ],
    solution: [
      {
        title: '格林函数',
        detail:
          '对区间 $[0,1]$：$$G(x,\\xi) = \\begin{cases} x(1-\\xi), & x \\le \\xi \\\\ \\xi(1-x), & x \\ge \\xi \\end{cases}$$',
      },
      {
        title: '积分',
        detail:
          '$$u(x) = \\int_0^1 G(x,\\xi)\\cdot 1\\,d\\xi = (1-x)\\int_0^x \\xi\\,d\\xi + x\\int_x^1 (1-\\xi)\\,d\\xi = \\frac{x(1-x)}{2}$$',
      },
      {
        title: '验证',
        detail:
          '$u\'\' = -1$（满足方程），$u(0)=u(1)=0$（满足边界）。正是"单位均布载荷下简支梁的挠曲线"。',
      },
    ],
    answer: '$u(x) = \\dfrac{x(1-x)}{2}$（抛物线）。',
    tags: ['格林函数', '狄利克雷问题', '边值问题'],
  },
];
