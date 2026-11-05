import type { Problem } from '@/types';

export const mathematical_logicProblems: Problem[] = [
  {
    id: 'p-log-1',
    courseId: 'mathematical-logic',
    topicId: 'first-order-logic',
    title: '一阶逻辑中的可靠性验证',
    difficulty: 2,
    question:
      '验证假言推理规则"$\\varphi \\to \\psi,\\ \\varphi \\ \\vdash\\ \\psi$"是可靠的（保真）：即若前提在结构 $\\mathcal{M}$ 中为真，结论必为真。',
    hints: [
      '可靠性 = 每个推理规则从真前提只得到真结论。',
      '用语义定义直接验证蕴含的真值表。',
    ],
    solution: [
      {
        title: '语义前提',
        detail:
          '设在结构 $\\mathcal{M}$（及赋值）下 $\\mathcal{M} \\vDash \\varphi \\to \\psi$ 且 $\\mathcal{M} \\vDash \\varphi$。',
      },
      {
        title: '蕴含真值',
        detail:
          '$\\varphi \\to \\psi$ 为真且 $\\varphi$ 为真 ⇒ 由蕴含的语义（仅当前件真后件假时为假），$\\psi$ 必为真。',
      },
      {
        title: '结论',
        detail:
          '前提真 ⇒ 结论真，规则保真。把每条公理验证为有效式、每条规则验证为保真，再用归纳法即得**可靠性定理**：$\\Gamma \\vdash \\varphi \\Rightarrow \\Gamma \\vDash \\varphi$。',
      },
    ],
    answer: '假言推理保真；逐条验证公理与规则即得一阶逻辑的可靠性定理。',
    tags: ['可靠性', '假言推理', '语义'],
  },
  {
    id: 'p-log-2',
    courseId: 'mathematical-logic',
    topicId: 'incompleteness',
    title: '理解哥德尔句的自指结构',
    difficulty: 3,
    question:
      '解释哥德尔句 $G$"$G$ 在本系统中不可证"为何在系统内既不可证也不可驳（设系统相容）。',
    hints: [
      '分两种情形：系统证出了 $G$、系统证出了 $\\neg G$，分别导出矛盾。',
      '关键链条：$\\vdash G \\Rightarrow$（可靠性）$G$ 为真，但 $G$ 声称自己不可证。',
    ],
    solution: [
      {
        title: '情形一：系统证明 G',
        detail:
          '若 $T \\vdash G$，由可靠性（只证真）知 $G$ 为真。但 $G$ 的内容是"$G$ 不可证"——矛盾（除非 $T$ 不相容）。故 $T \\nvdash G$。',
      },
      {
        title: '情形二：系统证明 ¬G',
        detail:
          '若 $T \\vdash \\neg G$，即 $T$ 证明了"$G$ 可证"。但由情形一 $T \\nvdash G$，"$G$ 可证"是假陈述——相容系统不能证假（再用可靠性），矛盾。故 $T \\nvdash \\neg G$。',
      },
      {
        title: '结论',
        detail:
          '$G$ 在 $T$ 中不可判定。而从系统外部看，$G$ **为真**——存在真的但不可证的命题。第一不完备性定理成立。',
      },
    ],
    answer: '$G$ 在相容系统 $T$ 中既不可证也不可驳（第一不完备性定理）。',
    tags: ['哥德尔句', '不完备性', '自指'],
  },
  {
    id: 'p-log-3',
    courseId: 'mathematical-logic',
    topicId: 'computability',
    title: '用归约证明问题不可判定',
    difficulty: 3,
    question:
      '已知停机问题不可判定。证明"程序 $P$ 是否在空输入上输出 0"也不可判定。',
    hints: [
      '反证：假设该问题可判定，用它构造停机问题的判定器。',
      '把任意 $(P, x)$ 转化为一个新程序 $Q$：$Q$ 先模拟 $P$ 在 $x$ 上运行，停机后输出 0。',
    ],
    solution: [
      {
        title: '反设',
        detail:
          '假设存在判定器 $Z$：输入程序 $Q$，判定 $Q$ 在空输入上是否输出 0。',
      },
      {
        title: '构造归约',
        detail:
          '对任意 $(P, x)$，构造 $Q_{P,x}$：忽略自身输入，先模拟 $P(x)$；若 $P$ 停机则输出 0（否则自然不输出）。则 $P$ 在 $x$ 上停机 $\\iff$ $Q_{P,x}$ 输出 0。',
      },
      {
        title: '归约完成',
        detail:
          '于是"$P$ 在 $x$ 上是否停机"可由 $Z(Q_{P,x})$ 回答——停机问题可判定，矛盾。故该问题不可判定。',
      },
    ],
    answer: '该问题不可判定（由停机问题图灵归约得到）。',
    tags: ['停机问题', '归约', '不可判定'],
  },
];
