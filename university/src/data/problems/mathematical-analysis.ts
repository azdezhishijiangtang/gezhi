import type { Problem } from '@/types';

export const mathematical_analysisProblems: Problem[] = [
  {
    id: 'p-ma-1',
    courseId: 'mathematical-analysis',
    topicId: 'real-numbers',
    title: '用闭区间套定理证明不动点存在',
    difficulty: 2,
    question:
      '设 $f:[0,1] \\to [0,1]$ 连续。证明：存在 $\\xi \\in [0,1]$ 使得 $f(\\xi) = \\xi$（不动点）。',
    hints: [
      '把区间对折，看哪一半的两个端点上 $g(x) = f(x) - x$ 异号。',
      '不断对折得到闭区间套，用闭区间套定理得到交点。',
    ],
    solution: [
      {
        title: '构造函数',
        detail:
          '令 $g(x) = f(x) - x$。则 $g(0) = f(0) \\ge 0$，$g(1) = f(1) - 1 \\le 0$。',
      },
      {
        title: '二分构造区间套',
        detail:
          '取 $[a_0,b_0] = [0,1]$。若 $g\\!\\left(\\frac{a_n+b_n}{2}\\right) = 0$ 已得不动点；否则 $g$ 在中点两侧异号，取异号的半区间为 $[a_{n+1}, b_{n+1}]$。则 $[a_{n+1},b_{n+1}] \\subset [a_n,b_n]$ 且 $b_n - a_n = 2^{-n} \\to 0$。',
      },
      {
        title: '闭区间套定理',
        detail:
          '存在唯一 $\\xi$ 属于所有 $[a_n,b_n]$。由 $g(a_n) \\ge 0 \\ge g(b_n)$ 与 $g$ 连续，令 $n \\to \\infty$ 得 $g(\\xi) = 0$，即 $f(\\xi) = \\xi$。',
      },
    ],
    answer: '存在 $\\xi \\in [0,1]$ 使 $f(\\xi) = \\xi$（一维布劳威尔不动点定理的特例）。',
    tags: ['确界原理', '闭区间套', '连续函数'],
  },
  {
    id: 'p-ma-2',
    courseId: 'mathematical-analysis',
    topicId: 'uniform-convergence',
    title: '判断函数项级数的一致收敛性',
    difficulty: 2,
    question:
      '判别 $\\displaystyle\\sum_{n=1}^{\\infty} \\frac{\\sin nx}{n^2}$ 在 $\\mathbb{R}$ 上是否一致收敛，并说明能否逐项积分。',
    hints: [
      '尝试 Weierstrass M 判别法：找各项的绝对值上界。',
      '若一致收敛，回忆一致收敛级数的逐项积分定理。',
    ],
    solution: [
      {
        title: 'M 判别法',
        detail:
          '对任意 $x \\in \\mathbb{R}$，$\\left|\\dfrac{\\sin nx}{n^2}\\right| \\le \\dfrac{1}{n^2}$。取 $a_n = \\dfrac{1}{n^2}$，而 $\\sum \\frac{1}{n^2}$ 收敛。',
      },
      {
        title: '结论',
        detail:
          '由 Weierstrass M 判别法，原级数在 $\\mathbb{R}$ 上一致收敛。和函数在任意有限区间上连续。',
      },
      {
        title: '逐项积分',
        detail:
          '一致收敛 ⇒ 在任意有限区间 $[a,b]$ 上可逐项积分，且积分得到的级数仍一致收敛。注意在无穷区间（如 $\\mathbb{R}$）上逐项积分需要额外的一致可控性，不能直接套用。',
      },
    ],
    answer: '一致收敛（M 判别法，控制级数 $\\sum 1/n^2$）；有限区间上可逐项积分。',
    tags: ['一致收敛', 'M 判别法', '逐项积分'],
  },
  {
    id: 'p-ma-3',
    courseId: 'mathematical-analysis',
    topicId: 'parameter-integrals',
    title: '参变量法计算经典积分',
    difficulty: 3,
    question:
      '利用含参变量积分计算 $\\displaystyle\\int_0^{\\infty} \\frac{\\sin x}{x}\\,dx$。',
    hints: [
      '直接积不出来。引入参数 $t$ 与"收敛因子" $e^{-tx}$，把答案变成一个函数 $F(t)$。',
      '对 $F(t)$ 求导，交换求导与积分顺序。',
      '用 $F(\\infty) = 0$ 与 $F(0)$ 为目标值来定常数。',
    ],
    solution: [
      {
        title: '引入参变量',
        detail:
          '设 $F(t) = \\displaystyle\\int_0^{\\infty} e^{-tx}\\,\\frac{\\sin x}{x}\\,dx$（$t \\ge 0$）。则所求为 $F(0)$，且 $F(\\infty) = 0$。',
      },
      {
        title: '积分号下求导',
        detail:
          '$e^{-tx}\\frac{\\sin x}{x}$ 与它对 $t$ 的偏导 $-e^{-tx}\\sin x$ 都连续且绝对可积控制成立，故$$F\'(t) = -\\int_0^{\\infty} e^{-tx}\\sin x\\,dx = -\\frac{1}{1+t^2}$$（用 $\\sin x = \\operatorname{Im} e^{ix}$ 或两次分部积分）。',
      },
      {
        title: '积分定常数',
        detail:
          '$F(t) = -\\arctan t + C$。由 $F(\\infty) = 0$ 得 $C = \\dfrac{\\pi}{2}$，于是 $F(0) = \\dfrac{\\pi}{2}$。',
      },
    ],
    answer: '$\\displaystyle\\int_0^{\\infty} \\frac{\\sin x}{x}\\,dx = \\frac{\\pi}{2}$（狄利克雷积分）。',
    tags: ['含参变量积分', '积分号下求导', '狄利克雷积分'],
  },
];
