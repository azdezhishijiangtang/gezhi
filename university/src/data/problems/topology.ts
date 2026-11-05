import type { Problem } from '@/types';

export const topologyProblems: Problem[] = [
  {
    id: 'p-top-1',
    courseId: 'topology',
    topicId: 'topological-spaces',
    title: '验证拓扑与商空间',
    difficulty: 2,
    question:
      '把正方形 $[0,1] \\times [0,1]$ 的对边按"定向相反"粘合（上下边反向、左右边同向）。说明得到什么曲面，并求其欧拉示性数。',
    hints: [
      '画一个单元格腔分解：1 个顶点、几条棱、几个面？',
      '定向相反的粘合是莫比乌斯带的标志；再配合另一组对边的粘合方式判断整体。',
    ],
    solution: [
      {
        title: '分析粘合',
        detail:
          '上下边反向粘合 ⇒ 莫比乌斯带。左右边再同向粘合两个莫比乌斯带的边界，得到**克莱因瓶**。',
      },
      {
        title: '胞腔分解',
        detail:
          '取一个 2-胞腔（正方形内部）、两条 1-胞腔（两组对边各算一条）、一个 0-胞腔（四角在反向粘合下重合）。',
      },
      {
        title: '欧拉示性数',
        detail:
          '$\\chi = V - E + F = 1 - 2 + 1 = 0$。与环面相同——但克莱因瓶不可定向，环面可定向。$\\chi = 0$ 只说明"洞的某种计数"相同。',
      },
    ],
    answer: '得到克莱因瓶，$\\chi = 0$（与环面同，但不可定向）。',
    tags: ['商空间', '克莱因瓶', '欧拉示性数'],
  },
  {
    id: 'p-top-2',
    courseId: 'topology',
    topicId: 'compact-connected',
    title: '紧致性的开覆盖验证',
    difficulty: 2,
    question:
      '用开覆盖定义证明：$[0,1]$ 是紧致的（提示：考虑 $S = \\{x : [0,x] \\text{ 被有限子覆盖}\\}$）。',
    hints: [
      '紧致 = 任意开覆盖有有限子覆盖。用确界原理处理"被有限覆盖的前缀区间"集合。',
      '关键是证明 $\\sup S = 1$：用覆盖 $\\sup S$ 的那个开集把端点再往前推。',
    ],
    solution: [
      {
        title: '构造集合',
        detail:
          '设 $\\{U_\\alpha\\}$ 是 $[0,1]$ 的任一开覆盖。令 $S = \\{x \\in [0,1] : [0,x] \\text{ 有有限子覆盖}\\}$。$0 \\in S$（$0$ 落在某 $U_\\alpha$ 中，含一个小区间），故 $S$ 非空有上界。',
      },
      {
        title: '取上确界',
        detail:
          '设 $s = \\sup S$。$s$ 落在某 $U_{\\alpha_0}$ 中，该开集含区间 $(s - \\delta, s + \\delta) \\cap [0,1]$。取 $x_0 \\in S$ 且 $x_0 > s - \\delta$（上确界性质），则 $[0, s+\\delta)$ 被有限子覆盖，故 $s + \\delta/2 \\in S$，与 $s$ 为上界矛盾，除非 $s \\ge 1$。',
      },
      {
        title: '结论',
        detail:
          '$s \\ge 1$，即 $[0,1]$ 本身有有限子覆盖。任取覆盖皆行，故 $[0,1]$ 紧致。',
      },
    ],
    answer: '$[0,1]$ 紧致（任一开覆盖均有有限子覆盖）。',
    tags: ['紧致', '开覆盖', '确界原理'],
  },
  {
    id: 'p-top-3',
    courseId: 'topology',
    topicId: 'fundamental-group',
    title: '用 van Kampen 算八字形的基本群',
    difficulty: 3,
    question: '计算八字形空间 $S^1 \\vee S^1$（两个圆在一点粘合）的基本群。',
    hints: [
      '取两个开集各覆盖一个圆（并含粘合点的邻域），交是粘合点的收缩邻域。',
      'van Kampen：交单连通时，基本群是两群的自由积。',
    ],
    solution: [
      {
        title: '选覆盖',
        detail:
          '取 $U$ = 第一个圆稍微"胖"一点的开邻域，$V$ = 第二个圆的。$U \\cap V$ 是粘合点的小开邻域，可收缩。',
      },
      {
        title: '各块基本群',
        detail: '$\\pi_1(U) \\cong \\pi_1(V) \\cong \\mathbb{Z}$（各由绕本圆的圈生成，记 $a, b$）。',
      },
      {
        title: 'van Kampen',
        detail:
          '交单连通，融合积退化为自由积：$$\\pi_1(S^1 \\vee S^1) \\cong \\mathbb{Z} * \\mathbb{Z}$$由 $a, b$ 生成的自由群——**非交换**（$ab \\ne ba$：先绕左圆再绕右圆 ≠ 先右后左）。这正是"8 字形"名字的来源。',
      },
    ],
    answer: '$\\pi_1(S^1 \\vee S^1) \\cong \\mathbb{Z} * \\mathbb{Z}$（二生成元自由群）。',
    tags: ['基本群', 'van Kampen', '自由积'],
  },
];
