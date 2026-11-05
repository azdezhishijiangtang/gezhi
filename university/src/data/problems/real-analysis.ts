import type { Problem } from '@/types';

export const real_analysisProblems: Problem[] = [
  {
    id: 'p-ra-1',
    courseId: 'real-analysis',
    topicId: 'lebesgue-measure',
    title: '证明可数集的勒贝格测度为零',
    difficulty: 2,
    question: '证明：$\\mathbb{Q} \\cap [0,1]$ 的勒贝格测度为 0。',
    hints: [
      '单点集测度为 0（用一个任意小的区间盖住它）。',
      '可数集是可数个单点的并，用测度的可数次可加性。',
    ],
    solution: [
      {
        title: '单点测度',
        detail:
          '任给 $\\varepsilon > 0$，单点 $\\{x\\}$ 被区间 $\\left(x - \\tfrac{\\varepsilon}{2^{n+1}},\\ x + \\tfrac{\\varepsilon}{2^{n+1}}\\right)$ 覆盖，长度可任意小，故 $m(\\{x\\}) = 0$。',
      },
      {
        title: '可数并',
        detail:
          '设 $E = \\{x_1, x_2, \\dots\\}$。用长度为 $\\varepsilon/2^n$ 的区间覆盖 $x_n$，则 $m(E) \\le \\sum_n \\frac{\\varepsilon}{2^n} = \\varepsilon$。',
      },
      {
        title: '结论',
        detail:
          '$\\varepsilon$ 任意小，故 $m(E) = 0$。于是 $m(\\mathbb{Q} \\cap [0,1]) = 0$——尽管有理数在 $[0,1]$ 中稠密，"个数无穷多"却"测度为零"。',
      },
    ],
    answer: '$m(\\mathbb{Q} \\cap [0,1]) = 0$（可数集零测度，尽管稠密）。',
    tags: ['勒贝格测度', '可数集', '次可加性'],
  },
  {
    id: 'p-ra-2',
    courseId: 'real-analysis',
    topicId: 'lebesgue-integral',
    title: '用控制收敛定理交换极限与积分',
    difficulty: 3,
    question:
      '计算 $\\displaystyle\\lim_{n \\to \\infty} \\int_0^1 \\frac{n x}{1 + n^2 x^2}\\,dx$。',
    hints: [
      '先看逐点极限：固定 $x > 0$，被积函数趋于多少？',
      '找控制函数 $g(x)$：对所有 $n$，被积函数都不超过某个可积函数。',
    ],
    solution: [
      {
        title: '逐点极限',
        detail:
          '$\\dfrac{nx}{1+n^2x^2} = \\dfrac{x/n}{1/n^2 + x^2}$。对 $x > 0$，趋于 $0$；$x = 0$ 时为 0。逐点极限处处为 0。',
      },
      {
        title: '找控制函数',
        detail:
          '由 AM-GM：$1 + n^2x^2 \\ge 2nx$，故 $\\dfrac{nx}{1+n^2x^2} \\le \\dfrac{1}{2}$。取 $g(x) \\equiv \\dfrac{1}{2}$，可积。',
      },
      {
        title: 'DCT',
        detail:
          '控制收敛定理给出极限 $= \\int_0^1 0\\,dx = 0$。（直接算也可验证：换元后积分 $= \\arctan n \\to \\pi/2$……注意这里直接算是 $\\dfrac{\\ln(1+n^2)}{2n} \\to 0$，一致。）',
      },
    ],
    answer: '极限为 $0$。',
    tags: ['控制收敛', '极限交换', 'DCT'],
  },
  {
    id: 'p-ra-3',
    courseId: 'real-analysis',
    topicId: 'lp-spaces',
    title: '验证 L² 中的三角不等式',
    difficulty: 2,
    question:
      '设 $f, g \\in L^2([0,1])$。证明 $\\|f + g\\|_2 \\le \\|f\\|_2 + \\|g\\|_2$（闵可夫斯基不等式）。',
    hints: [
      '展开 $\\|f+g\\|_2^2 = \\int (f+g)^2$，用内积记号写。',
      '对交叉项用柯西–施瓦茨不等式。',
    ],
    solution: [
      {
        title: '展开',
        detail:
          '$\\|f+g\\|_2^2 = \\int (f+g)^2 = \\|f\\|_2^2 + 2\\langle f,g\\rangle + \\|g\\|_2^2$。',
      },
      {
        title: '柯西–施瓦茨',
        detail:
          '$\\langle f,g\\rangle \\le |\\langle f,g\\rangle| \\le \\|f\\|_2\\,\\|g\\|_2$。',
      },
      {
        title: '完成平方',
        detail:
          '于是 $\\|f+g\\|_2^2 \\le \\|f\\|_2^2 + 2\\|f\\|_2\\|g\\|_2 + \\|g\\|_2^2 = \\big(\\|f\\|_2 + \\|g\\|_2\\big)^2$，开方即得。',
      },
    ],
    answer: '$\\|f+g\\|_2 \\le \\|f\\|_2 + \\|g\\|_2$（三角不等式成立，$L^2$ 是赋范空间）。',
    tags: ['L2 空间', '闵可夫斯基', '柯西-施瓦茨'],
  },
];
