import type { Problem } from '@/types';

export const combinatoricsProblems: Problem[] = [
  {
    id: 'p-comb-1',
    courseId: 'combinatorics',
    topicId: 'generating-functions',
    title: '生成函数求斐波那契闭式',
    difficulty: 3,
    question:
      '斐波那契数列 $F_0 = 0,\\ F_1 = 1,\\ F_n = F_{n-1}+F_{n-2}$。用生成函数求出 $F_n$ 的显式公式。',
    hints: [
      '设 $F(x) = \\sum F_n x^n$，利用递推把方程写出来。',
      '解出有理函数后部分分式分解，分母有一次因子 $(1-\\varphi x)$ 与 $(1-\\hat\\varphi x)$。',
    ],
    solution: [
      {
        title: '列方程',
        detail:
          '$$F(x) = \\sum_{n \\ge 0} F_n x^n = x + \\sum_{n \\ge 2}(F_{n-1}+F_{n-2})x^n = x + xF(x) + x^2F(x)$$故 $F(x) = \\dfrac{x}{1 - x - x^2}$。',
      },
      {
        title: '部分分式',
        detail:
          '$1 - x - x^2 = -(x - \\varphi)(x - \\hat{\\varphi})$，其中 $\\varphi = \\frac{1+\\sqrt5}{2}$，$\\hat\\varphi = \\frac{1-\\sqrt5}{2} = -1/\\varphi$。于是$$F(x) = \\frac{1}{\\sqrt5}\\left(\\frac{1}{1-\\varphi x} - \\frac{1}{1-\\hat\\varphi x}\\right)$$',
      },
      {
        title: '读系数',
        detail:
          '$\\frac{1}{1-ax} = \\sum a^n x^n$，故$$F_n = \\frac{\\varphi^n - \\hat\\varphi^n}{\\sqrt{5}}$$即比内公式。',
      },
    ],
    answer: '$F_n = \\dfrac{\\varphi^n - \\hat{\\varphi}^n}{\\sqrt{5}}$（$\\varphi = \\frac{1+\\sqrt5}{2}$，$\\hat\\varphi = \\frac{1-\\sqrt5}{2}$）。',
    tags: ['生成函数', '斐波那契', '比内公式'],
  },
  {
    id: 'p-comb-2',
    courseId: 'combinatorics',
    topicId: 'inclusion-exclusion',
    title: '容斥原理求错排数',
    difficulty: 2,
    question: '5 封信装入 5 个信封，求全部装错的方案数。',
    hints: [
      '全集 $5!$，减去"至少一封装对"——这正是容斥的舞台。',
      '$A_i$ = 第 $i$ 封装对；$k$ 个指定封装对时其余随便：$(5-k)!$。',
    ],
    solution: [
      {
        title: '列容斥',
        detail:
          '$$D_5 = 5! - \\binom{5}{1}4! + \\binom{5}{2}3! - \\binom{5}{3}2! + \\binom{5}{4}1! - \\binom{5}{5}0!$$',
      },
      {
        title: '计算',
        detail:
          '$D_5 = 120 - 5 \\times 24 + 10 \\times 6 - 10 \\times 2 + 5 \\times 1 - 1 = 120 - 120 + 60 - 20 + 5 - 1 = 44$。',
      },
      {
        title: '概率视角',
        detail: '全错概率 $D_5/5! = \\frac{44}{120} \\approx 0.367$，接近 $1/e \\approx 0.368$——$n$ 大时收敛到 $1/e$。',
      },
    ],
    answer: '$D_5 = 44$ 种（概率约 $0.367$）。',
    tags: ['容斥', '错排', '组合计数'],
  },
  {
    id: 'p-comb-3',
    courseId: 'combinatorics',
    topicId: 'polya',
    title: 'Burnside 引理数项链',
    difficulty: 3,
    question:
      '用 3 颗红珠、3 颗蓝珠穿成项链（可旋转，翻转视为不同）。有多少种本质不同的穿法？',
    hints: [
      '旋转群 $C_6$ 作用在 6 个珠位上；Burnside：轨道数 = 平均不动数。',
      '分别数恒等、旋转 1~5 位各自固定的着色数（注意配色计数必须 3 红 3 蓝）。',
    ],
    solution: [
      {
        title: '分类数不动着色',
        detail:
          '旋转 $k$ 位把 6 个珠位分成 $\\gcd(6,k)$ 个循环，每循环内同色方为不动：\\n\\n- $k = 0$（恒等）：$\\binom{6}{3} = 20$ 种；\\n- $k = 1, 5$：单个 6-循环，须全同色，不可能，0 种；\\n- $k = 2, 4$：两个 3-循环，一循环全红一全蓝，各 2 种；\\n- $k = 3$：三个 2-循环，每对同色 ⇒ 红珠数必为偶数，不可能，0 种。',
      },
      {
        title: 'Burnside 引理',
        detail:
          '轨道数（本质不同穿法）$= \\dfrac{1}{|C_6|}\\sum_{g} |\\operatorname{Fix}(g)| = \\dfrac{20 + 0 + 2 + 0 + 2 + 0}{6} = \\dfrac{24}{6} = 4$。',
      },
      {
        title: '结果',
        detail:
          '共 4 种：RRRBBB、RRBRBB、RRBBRB、RBRBRB（旋转等价意义下）。',
      },
    ],
    answer: '共 $4$ 种本质不同的项链（Burnside 引理）。',
    tags: ['Burnside', '群作用', '项链计数'],
  },
];
