import type { Problem } from '@/types';

export const discrete_mathProblems: Problem[] = [

  {
    id: 'p-logic-1',
    courseId: 'discrete-math',
    topicId: 'logic',
    title: '用推理定律证明论证有效性',
    difficulty: 2,
    question:
      '符号化下面的日常论证并证明其有效："如果下雨，球赛就取消；球赛没有取消；所以没有下雨。"要求写出依据的推理定律，并用重言式验证。',
    hints: [
      '设 $p$：下雨，$q$：球赛取消。两个前提分别是 $p \\to q$ 与 $\\neg q$，结论是 $\\neg p$。',
      '前提中的 $p \\to q$ 等价于它的逆否命题 $\\neg q \\to \\neg p$。',
      '对 $\\neg q \\to \\neg p$ 与 $\\neg q$ 使用假言推理即得结论。',
    ],
    solution: [
      {
        title: '符号化',
        detail: '$p$：下雨，$q$：球赛取消。论证形式为$$p \\to q,\\ \\neg q \\ \\vdash\\ \\neg p$$',
      },
      {
        title: '化为逆否形式',
        detail: '由蕴含等价 $p \\to q = \\neg p \\vee q$，而 $\\neg q \\to \\neg p = \\neg\\neg q \\vee \\neg p = q \\vee \\neg p$，两者相同，故$$p \\to q \\iff \\neg q \\to \\neg p$$',
      },
      {
        title: '假言推理得结论',
        detail: '前提 $\\neg q$ 与 $\\neg q \\to \\neg p$ 构成假言推理（$(a \\to b) \\wedge a \\Rightarrow b$，令 $a=\\neg q$，$b=\\neg p$）：$$(\\neg q \\to \\neg p) \\wedge \\neg q \\Rightarrow \\neg p$$这正是**拒取式**（modus tollens）。',
      },
      {
        title: '重言式验证',
        detail: '论证有效 $\\iff$ 前提合取蕴含结论是重言式：$$\\big((p \\to q) \\wedge \\neg q\\big) \\to \\neg p$$展开 $p \\to q = \\neg p \\vee q$，则前提部分 $(\\neg p \\vee q) \\wedge \\neg q = (\\neg p \\wedge \\neg q) \\vee (q \\wedge \\neg q) = \\neg p \\wedge \\neg q$，于是$$(\\neg p \\wedge \\neg q) \\to \\neg p = \\neg(\\neg p \\wedge \\neg q) \\vee \\neg p = (p \\vee \\neg q) \\vee \\neg p \\equiv \\top$$故论证有效。',
      },
    ],
    answer: '论证有效，依据拒取式；对应重言式 $\\big((p \\to q) \\wedge \\neg q\\big) \\to \\neg p$',
    tags: ['命题逻辑', '推理定律', '拒取式'],
  },

  {
    id: 'p-logic-2',
    courseId: 'discrete-math',
    topicId: 'logic',
    title: '求主析取范式与成真赋值数',
    difficulty: 2,
    question:
      '求命题公式 $(p \\to q) \\wedge (q \\to r)$ 的主析取范式，并指出它的成真赋值共有多少个。',
    hints: [
      '先用蕴含等价消去箭头：$p \\to q = \\neg p \\vee q$，$q \\to r = \\neg q \\vee r$。',
      '把两个析取式的合取用分配律展开，消去矛盾合取项。',
      '对每个合取项缺的变元用 $x \\vee \\neg x$ 补全成极小项，再合并重复项。',
    ],
    solution: [
      {
        title: '消去蕴含',
        detail: '$$(p \\to q) \\wedge (q \\to r) = (\\neg p \\vee q) \\wedge (\\neg q \\vee r)$$',
      },
      {
        title: '分配律展开',
        detail: '$$(\\neg p \\vee q) \\wedge (\\neg q \\vee r) = (\\neg p \\wedge \\neg q) \\vee (\\neg p \\wedge r) \\vee (q \\wedge \\neg q) \\vee (q \\wedge r)$$其中 $q \\wedge \\neg q$ 为矛盾式，删去：$$= (\\neg p \\wedge \\neg q) \\vee (\\neg p \\wedge r) \\vee (q \\wedge r)$$',
      },
      {
        title: '补全极小项',
        detail: '每个合取项补上所缺变元的 $x \\vee \\neg x$：$$\\begin{aligned}&\\neg p \\wedge \\neg q = (\\neg p \\wedge \\neg q \\wedge r) \\vee (\\neg p \\wedge \\neg q \\wedge \\neg r)\\\\&\\neg p \\wedge r = (\\neg p \\wedge q \\wedge r) \\vee (\\neg p \\wedge \\neg q \\wedge r)\\\\&q \\wedge r = (p \\wedge q \\wedge r) \\vee (\\neg p \\wedge q \\wedge r)\\end{aligned}$$',
      },
      {
        title: '合并同类项',
        detail: '去掉重复的极小项 $\\neg p \\wedge \\neg q \\wedge r$，得主析取范式：$$(\\neg p \\wedge \\neg q \\wedge \\neg r) \\vee (\\neg p \\wedge \\neg q \\wedge r) \\vee (\\neg p \\wedge q \\wedge r) \\vee (p \\wedge q \\wedge r)$$共 $4$ 个极小项。',
      },
      {
        title: '结果解读',
        detail: '公式 $(p \\to q) \\wedge (q \\to r)$ 刻画"传递性" $p \\Rightarrow q \\Rightarrow r$。按真值 $1 > 0$ 排序，成真赋值为 $(0,0,0),(0,0,1),(0,1,1),(1,1,1)$，恰 $4$ 个；也可直接数：$r$ 任取，$q \\le r$ 且 $p \\le q$，共 $4$ 种。',
      },
    ],
    answer: 'PDNF 含 4 个极小项；成真赋值共 4 个',
    tags: ['主析取范式', '等值演算', '真值表'],
  },

  {
    id: 'p-graphs-1',
    courseId: 'discrete-math',
    topicId: 'graphs',
    title: '握手定理与"几笔画完"问题',
    difficulty: 3,
    question:
      '证明：（1）任意图中奇度顶点的个数必为偶数；（2）若连通图恰有 $2k$ 个奇度顶点，则它的全部边可以分解为 $k$ 条边不重的迹——即最少用 $k$ 笔就能画完所有边。',
    hints: [
      '对（1）用握手定理 $\\sum_v d(v) = 2|E|$，把顶点按度的奇偶分组。',
      '对（2）先在奇度顶点之间添加 $k$ 条新边，使所有顶点度数为偶。',
      '新图是连通欧拉图，存在欧拉回路；删去添加的 $k$ 条边后，回路被切成至多 $k$ 段。',
    ],
    solution: [
      {
        title: '（1）握手定理',
        detail: '$$\\sum_{v} d(v) = 2|E|$$右边是偶数。把所有顶点按度数的奇偶分组：$$\\sum_{\\text{偶度}} d(v) + \\sum_{\\text{奇度}} d(v) = \\text{偶数}$$偶度顶点的度数和显然是偶数，故奇度顶点的度数和也必须是偶数。奇数个奇数相加得奇数，偶数个奇数相加才得偶数，所以**奇度顶点必为偶数个**。',
      },
      {
        title: '（2）构造欧拉图',
        detail: '设 $G$ 连通，奇度顶点 $u_1, u_2, \\dots, u_{2k}$。把它们两两配对，在每对之间**添加一条新边**（允许经过多重边），得图 $G\'$。此时每个奇度顶点度加 $1$ 变偶，偶度顶点不变，$G\'$ 中所有顶点度数为偶。',
      },
      {
        title: '欧拉回路',
        detail: '$G\'$ 仍连通且全偶度，由欧拉定理存在欧拉回路 $C$——一条经过每条边恰好一次的闭合路径。',
      },
      {
        title: '删去新边，分解为 k 段',
        detail: '从 $C$ 中删去那 $k$ 条添加边：每删一条，回路断成两段或从闭合变为开放，最多新增一段。因此 $C$ 剩下的 $G$ 的边被分成**至多 $k$ 段**边不重的迹。故 $k$ 笔足够画完。',
      },
      {
        title: '最少性',
        detail: '反过来，一笔（一条迹）至多"消化"两个奇度端点（内部点进出成对，度偶），所以 $2k$ 个奇度顶点至少需要 $\\frac{2k}{2} = k$ 笔。综上，最少笔数恰为 $k$。',
      },
    ],
    answer: '（1）奇度顶点个数为偶数；（2）恰需 $k$ 笔，即最少笔画数 = 奇度顶点数 $\\div$ 2',
    tags: ['握手定理', '欧拉回路', '图论'],
  },
];
