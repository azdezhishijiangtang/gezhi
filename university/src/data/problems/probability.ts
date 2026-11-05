import type { Problem } from '@/types';

export const probabilityProblems: Problem[] = [

  {
    id: 'p-bayes-1',
    courseId: 'probability',
    topicId: 'bayes',
    title: '医学检测中的贝叶斯推断',
    difficulty: 2,
    question:
      '某疾病在人群中的患病率为 $0.5\\%$。一种检测方法：真正患病者检测为阳性的概率为 $99\\%$（灵敏度），未患病者检测为阳性的概率为 $2\\%$（假阳性率）。若某人检测结果为阳性，他真正患病的概率是多少？',
    hints: [
      '设事件：$B_1$ = 患病，$B_2$ = 未患病，$A$ = 检测阳性。',
      '已知先验概率 $P(B_1) = 0.005$，似然 $P(A \\mid B_1) = 0.99$、$P(A \\mid B_2) = 0.02$。',
      '求后验概率 $P(B_1 \\mid A)$，用贝叶斯公式，分母是全概率。',
    ],
    solution: [
      {
        title: '设定事件',
        detail: '$B_1$：患病，$B_2$：未患病，$A$：检测阳性。$B_1, B_2$ 构成样本空间的划分：$$P(B_1) = 0.005, \\quad P(B_2) = 0.995$$$$P(A \\mid B_1) = 0.99, \\quad P(A \\mid B_2) = 0.02$$',
      },
      {
        title: '全概率：阳性总概率',
        detail: '$$P(A) = P(B_1)P(A \\mid B_1) + P(B_2)P(A \\mid B_2)$$$$= 0.005 \\times 0.99 + 0.995 \\times 0.02 = 0.00495 + 0.0199 = 0.02485$$',
      },
      {
        title: '贝叶斯公式求后验',
        detail: '$$P(B_1 \\mid A) = \\frac{P(B_1)P(A \\mid B_1)}{P(A)} = \\frac{0.00495}{0.02485} \\approx 0.1992$$',
      },
      {
        title: '结果解读',
        detail: '尽管检测"很准"（灵敏度 99%），但由于**基础发病率极低**（0.5%），阳性结果中真正患病的只有约 $19.9\\%$——大部分阳性来自庞大的健康人群中的假阳性。这正是基础概率谬误的经典例子。',
      },
    ],
    answer: '约 $19.9\\%$',
    tags: ['贝叶斯公式', '全概率', '医学检测'],
  },

  {
    id: 'p-dist-1',
    courseId: 'probability',
    topicId: 'distributions',
    title: '正态分布的概率计算',
    difficulty: 2,
    question:
      '设某科统考成绩 $X \\sim N(72, \\sigma^2)$，已知 $P(X \\le 60) = 0.1$。求 $P(60 \\le X \\le 84)$ 与分数超过 84 分的人数比例。',
    hints: [
      '正态分布先标准化：$Z = \\frac{X - \\mu}{\\sigma} \\sim N(0,1)$。',
      '由 $P(X \\le 60) = 0.1$ 反查标准正态分位数 $z_{0.1} \\approx -1.282$。',
      '由此解出 $\\sigma$，再计算目标区间的概率。',
    ],
    solution: [
      {
        title: '标准化与已知条件',
        detail: '$Z = \\frac{X - 72}{\\sigma} \\sim N(0,1)$。$$P(X \\le 60) = P\\!\\left(Z \\le \\frac{60-72}{\\sigma}\\right) = \\Phi\\!\\left(\\frac{-12}{\\sigma}\\right) = 0.1$$查表得 $\\Phi(-1.282) \\approx 0.1$，故$$\\frac{-12}{\\sigma} = -1.282 \\Rightarrow \\sigma \\approx 9.36$$',
      },
      {
        title: '计算 P(60 ≤ X ≤ 84)',
        detail: '$$P(60 \\le X \\le 84) = \\Phi\\!\\left(\\frac{84-72}{9.36}\\right) - \\Phi\\!\\left(\\frac{60-72}{9.36}\\right) = \\Phi(1.282) - \\Phi(-1.282)$$$$= (1 - 0.1) - 0.1 = 0.8$$',
      },
      {
        title: '超过 84 分的比例',
        detail: '$$P(X > 84) = 1 - \\Phi(1.282) = 1 - 0.9 = 0.1$$即约 $10\\%$ 的学生超过 84 分。事实上 $84 = 72 + 12$ 与 $60 = 72 - 12$ 关于均值对称，两侧尾部概率各为 $0.1$。',
      },
    ],
    answer: '$P(60 \\le X \\le 84) = 0.8$；超过 84 分的比例约为 $10\\%$',
    tags: ['正态分布', '标准化', '分位数'],
  },
];
