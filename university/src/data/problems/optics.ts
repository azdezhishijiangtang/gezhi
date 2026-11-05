import type { Problem } from '@/types';

export const opticsProblems: Problem[] = [
  // ─────────────────────── 几何光学 ───────────────────────
  {
    id: 'optics-p1',
    courseId: 'optics',
    topicId: 'geometric-optics',
    title: '薄凸透镜的成像位置与放大率',
    difficulty: 1,
    question: '一薄凸透镜焦距 $f = 10\\ \\text{cm}$，将一高度为 $h = 2\\ \\text{cm}$ 的物垂直于主光轴放在镜前 $s = 15\\ \\text{cm}$ 处。求：(1) 像距 $s^{\\prime}$；(2) 横向放大率 $m$ 与像高 $h^{\\prime}$；(3) 判断像的虚实、正倒。',
    hints: [
      '使用薄透镜成像公式 $\\dfrac{1}{s} + \\dfrac{1}{s^{\\prime}} = \\dfrac{1}{f}$，注意物距 $s>0$、焦距 $f>0$。',
      '横向放大率 $m = -\\dfrac{s^{\\prime}}{s}$，负号代表倒立。',
      '像距为正表示实像（可在屏上接收），为负表示虚像。',
    ],
    solution: [
      {
        title: '代入成像公式求像距',
        detail: '由 $\\dfrac{1}{s^{\\prime}} = \\dfrac{1}{f} - \\dfrac{1}{s} = \\dfrac{1}{10} - \\dfrac{1}{15} = \\dfrac{3-2}{30} = \\dfrac{1}{30}$，得 $s^{\\prime} = 30\\ \\text{cm}$。像距为正，为实像。',
      },
      {
        title: '求横向放大率与像高',
        detail: '$m = -\\dfrac{s^{\\prime}}{s} = -\\dfrac{30}{15} = -2$。故像高 $h^{\\prime} = m h = -2 \\times 2 = -4\\ \\text{cm}$。绝对值大于物高，为放大像。',
      },
      {
        title: '判断像的性质',
        detail: '$s^{\\prime}>0$ 说明像与物分居透镜两侧，是实像；放大率 $m<0$ 说明像相对于物倒立。结论：倒立、放大的实像，位于透镜另一侧 $30\\ \\text{cm}$ 处。',
      },
    ],
    answer: '$s^{\\prime} = 30\\ \\text{cm}$；放大率 $m = -2$，像高 $h^{\\prime} = -4\\ \\text{cm}$；倒立、放大的实像。',
    tags: ['薄透镜', '成像公式', '横向放大率'],
  },

  // ─────────────────────── 光的波动性 ───────────────────────
  {
    id: 'optics-p2',
    courseId: 'optics',
    topicId: 'wave-optics-intro',
    title: '由惠更斯原理求波从空气进入水中的折射角',
    difficulty: 2,
    question: '平面波从空气以入射角 $\\theta_1 = 30^{\\circ}$ 射向空气—水界面。已知空气中波速 $v_1 = 3.0\\times10^8\\ \\text{m/s}$，水中波速 $v_2 = 2.25\\times10^8\\ \\text{m/s}$，频率不变。分别用（1）惠更斯子波作图法、（2）波速关系推导折射角 $\\theta_2$ 与折射定律。',
    hints: [
      '频率 $f$ 在界面两侧不变，波速变化导致波长改变：$\\lambda = v/f$。',
      '惠更斯原理：界面上各点作为子波源，经过相同时间 $\\Delta t$ 后包络面即新波前。',
      '由几何关系 $v_1\\Delta t /\\sin\\theta_1 = v_2\\Delta t /\\sin\\theta_2$ 可得 $\\sin\\theta_1/\\sin\\theta_2 = v_1/v_2 = n_2/n_1$。',
    ],
    solution: [
      {
        title: '波长关系',
        detail: '频率不变，$\\lambda_1 = v_1/f$、$\\lambda_2 = v_2/f$，故 $\\lambda_2/\\lambda_1 = v_2/v_1 = 2.25/3.0 = 0.75$。波进入水中波长变短。',
      },
      {
        title: '惠更斯作图的几何关系',
        detail: '设波前越过界面所用时间为 $\\Delta t$。在空气中跨越斜边长度 $v_1\\Delta t$，对应入射角满足 $\\sin\\theta_1 = v_1\\Delta t / AB$；在水中 $\\sin\\theta_2 = v_2\\Delta t / AB$。两式相除得 $\\dfrac{\\sin\\theta_1}{\\sin\\theta_2} = \\dfrac{v_1}{v_2}$。',
      },
      {
        title: '代入数值并得折射定律',
        detail: '$\\dfrac{\\sin\\theta_2}{\\sin\\theta_1} = \\dfrac{v_2}{v_1} = 0.75$，故 $\\sin\\theta_2 = 0.75\\sin30^{\\circ} = 0.375$，$\\theta_2 \\approx 22.0^{\\circ}$。又因 $n = c/v$，上式即 $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$，即斯涅尔折射定律。',
      },
    ],
    answer: '折射角 $\\theta_2 \\approx 22.0^{\\circ}$，并由惠更斯原理导出 $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$。',
    tags: ['惠更斯原理', '折射定律', '波速与波长'],
  },

  // ─────────────────────── 光的干涉 ───────────────────────
  {
    id: 'optics-p3',
    courseId: 'optics',
    topicId: 'interference',
    title: '杨氏双缝的条纹位置与间距',
    difficulty: 2,
    question: '在杨氏双缝实验中，双缝间距 $d = 0.20\\ \\text{mm}$，缝到屏的距离 $D = 1.0\\ \\text{m}$，入射光波长 $\\lambda = 589\\ \\text{nm}$（钠黄光）。求：(1) 第 $3$ 级明纹到中央明纹的距离 $x_3$；(2) 相邻明纹的间距 $\\Delta x$。',
    hints: [
      '近轴条件下屏上位置 $x_k \\approx k\\lambda D/d$（明纹条件 $d\\sin\\theta = k\\lambda$）。',
      '相邻明纹间距与级次 $k$ 无关：$\\Delta x = \\lambda D/d$。',
      '注意统一单位：$1\\ \\text{mm} = 10^{-3}\\ \\text{m}$，$1\\ \\text{nm} = 10^{-9}\\ \\text{m}$。',
    ],
    solution: [
      {
        title: '第 3 级明纹位置',
        detail: '明纹条件 $x_k = k\\lambda D/d$。代入 $k=3$：$\\lambda D/d = 589\\times10^{-9}\\times1.0 / (0.20\\times10^{-3}) = 2.945\\times10^{-3}\\ \\text{m}$。故 $x_3 = 3 \\times 2.945\\ \\text{mm} \\approx 8.84\\ \\text{mm}$。',
      },
      {
        title: '条纹间距',
        detail: '相邻明纹间距 $\\Delta x = \\lambda D/d = 2.945\\times10^{-3}\\ \\text{m} \\approx 2.95\\ \\text{mm}$，与级次无关，条纹等间距分布。',
      },
      {
        title: '物理意义说明',
        detail: '间距正比于波长 $\\lambda$ 与 $D$、反比于 $d$。若改用白光，中央为白色明纹，两侧因 $\\Delta x$ 随 $\\lambda$ 而异出现彩色光谱，这正是干涉分光的基础。',
      },
    ],
    answer: '$x_3 \\approx 8.84\\ \\text{mm}$；相邻明纹间距 $\\Delta x \\approx 2.95\\ \\text{mm}$。',
    tags: ['杨氏双缝', '光程差', '干涉条纹'],
  },

  // ─────────────────────── 光的衍射 ───────────────────────
  {
    id: 'optics-p4',
    courseId: 'optics',
    topicId: 'diffraction',
    title: '光栅的可见衍射级次与一级衍射角',
    difficulty: 2,
    question: '一块平面透射光栅，每毫米刻线 $500$ 条，用波长 $\\lambda = 589.3\\ \\text{nm}$ 的单色平行光垂直入射。求：(1) 光栅常数 $d$；(2) 理论上可观察到的最高衍射级次 $k_{\\max}$；(3) 第 $1$ 级主极大的衍射角 $\\theta_1$。',
    hints: [
      '光栅常数 $d = 1/(500\\ \\text{条/mm}) = 2.0\\ \\mu\\text{m}$。',
      '光栅方程 $d\\sin\\theta = k\\lambda$，要求 $|\\sin\\theta|\\le 1$，故 $|k| \\le d/\\lambda$。',
      '衍射角 $\\theta_1 = \\arcsin(\\lambda/d)$。',
    ],
    solution: [
      {
        title: '光栅常数',
        detail: '每毫米 $500$ 条，故 $d = 1/(500\\ \\text{mm}^{-1}) = 2.0\\times10^{-3}\\ \\text{mm} = 2.0\\ \\mu\\text{m} = 2.0\\times10^{-6}\\ \\text{m}$。',
      },
      {
        title: '最高可见级次',
        detail: '由 $|k| \\le d/\\lambda = 2.0\\times10^{-6} / (589.3\\times10^{-9}) \\approx 3.39$。因 $k$ 取整数，最大 $|k| = 3$。考虑两侧与中央，共可见 $2\\times3 + 1 = 7$ 条主极大（级次 $0,\\pm1,\\pm2,\\pm3$）。',
      },
      {
        title: '一级衍射角',
        detail: '$\\sin\\theta_1 = \\lambda/d = 589.3\\times10^{-9}/(2.0\\times10^{-6}) = 0.29465$，故 $\\theta_1 = \\arcsin(0.29465) \\approx 17.1^{\\circ}$。',
      },
    ],
    answer: '$d = 2.0\\ \\mu\\text{m}$；最高可见级次 $k_{\\max}=3$（共 7 条主极大）；$\\theta_1 \\approx 17.1^{\\circ}$。',
    tags: ['光栅方程', '衍射级次', '分光'],
  },

  // ─────────────────────── 光的偏振 ───────────────────────
  {
    id: 'optics-p5',
    courseId: 'optics',
    topicId: 'polarization',
    title: '马吕斯定律与布儒斯特角',
    difficulty: 1,
    question: '自然光强为 $I_0$，先后通过两块理想偏振片 $P_1$、$P_2$，二者透振方向夹角为 $\\theta = 60^{\\circ}$。(1) 求最终出射光强；(2) 若光从空气射向玻璃（$n = 1.50$），求布儒斯特角 $\\theta_B$，并说明此时反射光偏振态。',
    hints: [
      '自然光通过首片偏振片后强度减半：$I_1 = I_0/2$，且变为线偏振。',
      '马吕斯定律 $I_2 = I_1\\cos^2\\theta$。',
      '布儒斯特角满足 $\\tan\\theta_B = n_2/n_1$；此时反射光为完全线偏振（振动垂直入射面）。',
    ],
    solution: [
      {
        title: '马吕斯定律求透射光强',
        detail: '经 $P_1$：$I_1 = I_0/2$。经 $P_2$：$I_2 = I_1\\cos^2 60^{\\circ} = (I_0/2)\\times(1/2)^2 = I_0/8 = 0.125\\,I_0$。',
      },
      {
        title: '布儒斯特角',
        detail: '$\\tan\\theta_B = n = 1.50$，得 $\\theta_B = \\arctan 1.50 \\approx 56.3^{\\circ}$。',
      },
      {
        title: '反射光偏振态',
        detail: '在布儒斯特角入射时，反射光为完全线偏振光，其电矢量振动方向垂直于入射面（即平行于界面）；折射光为部分偏振光。此时反射光与折射光互相垂直。',
      },
    ],
    answer: '出射光强 $I_2 = I_0/8$；布儒斯特角 $\\theta_B \\approx 56.3^{\\circ}$，反射光为垂直入射面的完全线偏振光。',
    tags: ['马吕斯定律', '布儒斯特角', '线偏振'],
  },

  // ─────────────────────── 光的相干性 ───────────────────────
  {
    id: 'optics-p6',
    courseId: 'optics',
    topicId: 'coherence',
    title: '光源单色性对相干长度的限制',
    difficulty: 3,
    question: '某光源中心波长 $\\lambda_0 = 600\\ \\text{nm}$，谱线半高宽对应的波长展宽 $\\Delta\\lambda = 0.06\\ \\text{nm}$。求：(1) 相干长度 $L_c$ 与相干时间 $\\tau_c$；(2) 在该光源下，迈克耳孙干涉仪中两臂光程差最大可达多少仍能看到清晰干涉条纹？',
    hints: [
      '相干长度近似 $L_c \\approx \\lambda_0^2/\\Delta\\lambda$，相干时间 $\\tau_c = L_c/c$。',
      '只有光程差小于相干长度时，两束光才足以相干。',
      '注意 $\\Delta\\lambda \\ll \\lambda_0$，可用微分近似 $\\Delta\\nu/\\nu \\approx \\Delta\\lambda/\\lambda$。',
    ],
    solution: [
      {
        title: '计算相干长度',
        detail: '$L_c = \\lambda_0^2/\\Delta\\lambda = (600\\times10^{-9})^2 / (0.06\\times10^{-9}) = 3.6\\times10^{-13} / 6\\times10^{-11} = 6.0\\times10^{-3}\\ \\text{m} = 6.0\\ \\text{mm}$。',
      },
      {
        title: '计算相干时间',
        detail: '$\\tau_c = L_c/c = 6.0\\times10^{-3} / (3.0\\times10^8) = 2.0\\times10^{-11}\\ \\text{s} = 20\\ \\text{ps}$。也可由 $\\tau_c \\approx 1/\\Delta\\nu$ 验证：$\\Delta\\nu = c\\,\\Delta\\lambda/\\lambda_0^2$ 给出相同结果。',
      },
      {
        title: '最大可观察光程差',
        detail: '干涉可见的条件是两臂光程差 $\\Delta L \\lesssim L_c$。故最大光程差约为 $6.0\\ \\text{mm}$。超过此值，因不同波长条纹相互错开而衬比度降为零，干涉消失。',
      },
    ],
    answer: '相干长度 $L_c = 6.0\\ \\text{mm}$，相干时间 $\\tau_c = 20\\ \\text{ps}$；最大可观察光程差约 $6.0\\ \\text{mm}$。',
    tags: ['相干长度', '时间相干性', '单色性'],
  },
];
