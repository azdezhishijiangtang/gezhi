import type { Problem } from '@/types';

export const abstract_algebraProblems: Problem[] = [
  {
    id: 'p-aa-1',
    courseId: 'abstract-algebra',
    topicId: 'group-theory',
    title: '用拉格朗日定理判定群结构',
    difficulty: 2,
    question:
      '证明：阶为 6 的群要么是循环群 $\\mathbb{Z}_6$，要么同构于对称群 $S_3$。',
    hints: [
      '拉格朗日定理：元素的阶只能取 1, 2, 3, 6。',
      '若有 6 阶元素则为循环群；否则只有 1, 2, 3 阶元素，数一数各有几个。',
    ],
    solution: [
      {
        title: '分情况',
        detail:
          '设 $|G| = 6$。若存在 6 阶元素，$G$ 由它生成，$G \\cong \\mathbb{Z}_6$。',
      },
      {
        title: '无 6 阶元素',
        detail:
          '所有非单位元阶为 2 或 3。3 阶元素成对出现（$g$ 与 $g^2$），故恰有 2 个。其余 3 个非单位元阶为 2。',
      },
      {
        title: '构造同构',
        detail:
          '取 3 阶元 $a$ 与 2 阶元 $b$。$H = \\langle a \\rangle$ 是 3 阶正规子群（指数 2），商群 $G/H$ 二阶。$b$ 作用在 $H$ 上必反演自同构（$bab^{-1} = a^{-1}$，否则 $ab$ 阶为 6）。这正是 $S_3$ 的呈现 $\\langle a, b \\mid a^3 = b^2 = 1,\\ bab^{-1} = a^{-1} \\rangle$，故 $G \\cong S_3$。',
      },
    ],
    answer: '6 阶群只有两种：$\\mathbb{Z}_6$（交换）与 $S_3$（非交换）。',
    tags: ['拉格朗日', '群分类', 'S3'],
  },
  {
    id: 'p-aa-2',
    courseId: 'abstract-algebra',
    topicId: 'rings-fields',
    title: '中国剩余定理解同余方程组',
    difficulty: 2,
    question: '解同余方程组：$x \\equiv 2 \\pmod{3}$，$x \\equiv 3 \\pmod{5}$，$x \\equiv 2 \\pmod{7}$。',
    hints: [
      '模数两两互素，用中国剩余定理保证解唯一（模 105）。',
      '构造：找 $M_i$ 与逆元，或两两合并。',
    ],
    solution: [
      {
        title: '两两合并',
        detail:
          '由前两个：$x = 2 + 3k$，代入第二个：$2 + 3k \\equiv 3 \\pmod{5}$，即 $3k \\equiv 1$，$k \\equiv 2 \\pmod{5}$。故 $x \\equiv 8 \\pmod{15}$。',
      },
      {
        title: '再合并第三个',
        detail:
          '$x = 8 + 15m$，代入：$8 + 15m \\equiv 2 \\pmod{7}$。$8 \\equiv 1$，$15 \\equiv 1$，故 $1 + m \\equiv 2$，$m \\equiv 1 \\pmod{7}$。',
      },
      {
        title: '结论',
        detail: '$x = 8 + 15 \\cdot 1 = 23 \\pmod{105}$。验证：$23 = 7 \\cdot 3 + 2$，$23 = 4 \\cdot 5 + 3$，$23 = 3 \\cdot 7 + 2$，全部符合。',
      },
    ],
    answer: '$x \\equiv 23 \\pmod{105}$。',
    tags: ['中国剩余定理', '同余', '互素'],
  },
  {
    id: 'p-aa-3',
    courseId: 'abstract-algebra',
    topicId: 'galois',
    title: '求分裂域与伽罗瓦群',
    difficulty: 3,
    question: '求 $x^3 - 2$ 在 $\\mathbb{Q}$ 上的分裂域，并确定其伽罗瓦群。',
    hints: [
      '三个根：$\\sqrt[3]{2}$、$\\omega\\sqrt[3]{2}$、$\\omega^2\\sqrt[3]{2}$，其中 $\\omega = e^{2\\pi i/3}$。',
      '分裂域 = 加入全部根的最小的域。数一数 $\\mathbb{Q}$-自同构有几个、由什么决定。',
    ],
    solution: [
      {
        title: '分裂域',
        detail:
          '根为 $\\alpha, \\omega\\alpha, \\omega^2\\alpha$（$\\alpha = \\sqrt[3]{2}$）。分裂域 $L = \\mathbb{Q}(\\alpha, \\omega)$。',
      },
      {
        title: '扩张次数',
        detail:
          '$[\\mathbb{Q}(\\alpha):\\mathbb{Q}] = 3$（$x^3-2$ 不可约）；$\\omega$ 满足 $\\omega^2+\\omega+1=0$，$[\\mathbb{Q}(\\alpha,\\omega):\\mathbb{Q}(\\alpha)] = 2$。故 $[L:\\mathbb{Q}] = 6$。',
      },
      {
        title: '伽罗瓦群',
        detail:
          '$|\\operatorname{Gal}(L/\\mathbb{Q})| = [L:\\mathbb{Q}] = 6$。自同构由 $\\alpha$ 的像（3 种选择）与 $\\omega$ 的像（2 种：$\\omega$ 或 $\\omega^2$）决定，共 6 个。它非交换（置换 $\\omega$ 与 $\\alpha$ 的作用不可交换），故 $\\operatorname{Gal} \\cong S_3$。',
      },
    ],
    answer: '分裂域 $L = \\mathbb{Q}(\\sqrt[3]{2},\\ \\omega)$，$[L:\\mathbb{Q}] = 6$，伽罗瓦群 $\\cong S_3$。',
    tags: ['分裂域', '伽罗瓦群', 'S3'],
  },
];
