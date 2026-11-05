import type { Problem } from '@/types';

export const atomic_physicsProblems: Problem[] = [
  // ─────────────────────── 卢瑟福散射参数 ───────────────────────
  {
    id: 'atomic-physics-p1',
    courseId: 'atomic-physics',
    topicId: 'early-models',
    title: 'α 粒子散射的最近距离与瞄准距离',
    difficulty: 2,
    question: '动能为 $E_k = 5.0\\ \\text{MeV}$ 的 α 粒子射向金箔（金核 $Z = 79$）。库仑斥力下散射角 $\\theta$ 与瞄准距离 $b$ 满足 $b = \\dfrac{Ze^2}{4\\pi\\varepsilon_0 \\cdot 2E_k}\\cot\\dfrac{\\theta}{2}$。取 $\\dfrac{e^2}{4\\pi\\varepsilon_0} = 1.44\\ \\text{MeV}\\cdot\\text{fm}$。求：(1) 对心入射（$b = 0$）时 α 粒子能到达的最近距离 $r_{\\min}$；(2) 散射角 $\\theta = 60^\\circ$ 对应的瞄准距离 $b$；(3) 由结果说明原子核尺度的量级。',
    hints: [
      '对心入射时 α 粒子沿径向直冲原子核，动能全部转化为库仑电势能：$E_k = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{r_{\\min}}$，注意 α 粒子电荷为 $2e$。',
      '斜入射时直接代入散射公式，只需算出 $\\cot 30^\\circ = \\sqrt{3}$。',
      '把结果与原子尺度 $10^{-10}\\ \\text{m}$ 对比，判断核的尺寸量级。',
    ],
    solution: [
      {
        title: '对心入射的最近距离',
        detail: '$b = 0$ 时粒子正对核射去，到最近距离 $r_{\\min}$ 处瞬时静止，动能全部转为电势能\\n$$E_k = \\frac{1}{4\\pi\\varepsilon_0}\\frac{(2e)(Ze)}{r_{\\min}} \\quad\\Rightarrow\\quad r_{\\min} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2Ze^2}{E_k}$$\\n代入数值：$r_{\\min} = \\dfrac{2 \\times 79 \\times 1.44\\ \\text{MeV}\\cdot\\text{fm}}{5.0\\ \\text{MeV}} = \\dfrac{227.5}{5.0}\\ \\text{fm} \\approx 45.5\\ \\text{fm} = 4.55\\times 10^{-14}\\ \\text{m}$。',
      },
      {
        title: '散射角 60° 对应的瞄准距离',
        detail: '由散射公式，$\\theta = 60^\\circ$ 时 $\\cot(\\theta/2) = \\cot 30^\\circ = \\sqrt{3} \\approx 1.732$：\\n$$b = \\frac{Ze^2}{4\\pi\\varepsilon_0 \\cdot 2E_k}\\cot\\frac{\\theta}{2} = \\frac{79 \\times 1.44}{2 \\times 5.0} \\times 1.732\\ \\text{fm} = 11.38 \\times 1.732\\ \\text{fm} \\approx 19.7\\ \\text{fm} = 1.97\\times 10^{-14}\\ \\text{m}$$',
      },
      {
        title: '核尺度量级讨论',
        detail: '$60^\\circ$ 的显著偏转只要求瞄准距离小到约 $20\\ \\text{fm}$，而原子半径约 $10^5\\ \\text{fm}$（$10^{-10}\\ \\text{m}$ 量级）。偏转发生在比原子小四五个数量级的区域内，说明全部正电荷几乎集中在一个 $10^{-15}\\sim 10^{-14}\\ \\text{m}$ 的微小核中——这正是卢瑟福核式模型的实验依据。',
      },
    ],
    answer: '$r_{\\min} \\approx 45.5\\ \\text{fm} = 4.55\\times 10^{-14}\\ \\text{m}$；$b(60^\\circ) \\approx 19.7\\ \\text{fm} = 1.97\\times 10^{-14}\\ \\text{m}$；大角度偏转仅发生在 $10^{-14}\\ \\text{m}$ 量级的近核区域，原子核远小于原子（约 $10^{-15}\\sim 10^{-14}\\ \\text{m}$）。',
    tags: ['卢瑟福散射', '瞄准距离', '核式模型'],
  },

  // ─────────────────────── 玻尔能级跃迁 ───────────────────────
  {
    id: 'atomic-physics-p2',
    courseId: 'atomic-physics',
    topicId: 'bohr-model',
    title: '氢原子能级跃迁与 Hα 谱线波长',
    difficulty: 1,
    question: '氢原子能级为 $E_n = -\\dfrac{13.6\\ \\text{eV}}{n^2}$。求：(1) $n = 2$ 与 $n = 3$ 能级的能量；(2) 电子从 $n = 3$ 跃迁到 $n = 2$ 时发射光子的能量与波长（即巴尔末系 $H_\\alpha$ 线，取 $hc = 1240\\ \\text{eV}\\cdot\\text{nm}$）；(3) 基态氢原子的电离能。',
    hints: [
      '把 $n = 2, 3$ 直接代入能级公式，注意能量为负值。',
      '玻尔频率条件 $h\\nu = E_{n_2} - E_{n_1}$ 给出光子能量，再用 $\\lambda = hc/\\Delta E$ 求波长。',
      '电离对应电子从 $n = 1$ 到 $n \\to \\infty$（$E_\\infty = 0$）。',
    ],
    solution: [
      {
        title: '计算能级能量',
        detail: '$$E_2 = -\\frac{13.6}{2^2} = -3.40\\ \\text{eV},\\qquad E_3 = -\\frac{13.6}{3^2} \\approx -1.51\\ \\text{eV}$$',
      },
      {
        title: '跃迁光子能量与波长',
        detail: '由玻尔频率条件，发射光子能量\\n$$\\Delta E = E_3 - E_2 = -1.51 - (-3.40) = 1.89\\ \\text{eV}$$\\n对应波长\\n$$\\lambda = \\frac{hc}{\\Delta E} = \\frac{1240\\ \\text{eV}\\cdot\\text{nm}}{1.89\\ \\text{eV}} \\approx 656\\ \\text{nm}$$\\n落在可见光红端，正是巴尔末系的 $H_\\alpha$ 线。',
      },
      {
        title: '基态电离能',
        detail: '电离是把电子从基态 $E_1 = -13.6\\ \\text{eV}$ 移到 $E_\\infty = 0$ 所需的最小能量：\\n$$E_{\\text{电离}} = 0 - E_1 = 13.6\\ \\text{eV}$$\\n与实验测得的氢电离能一致，是玻尔模型的重要验证。',
      },
    ],
    answer: '$E_2 = -3.40\\ \\text{eV}$，$E_3 \\approx -1.51\\ \\text{eV}$；$H_\\alpha$ 光子能量 $\\Delta E \\approx 1.89\\ \\text{eV}$，波长 $\\lambda \\approx 656\\ \\text{nm}$；基态电离能 $13.6\\ \\text{eV}$。',
    tags: ['玻尔模型', '能级跃迁', '氢光谱'],
  },

  // ─────────────────────── 里德伯公式 ───────────────────────
  {
    id: 'atomic-physics-p3',
    courseId: 'atomic-physics',
    topicId: 'hydrogen-spectrum',
    title: '里德伯公式计算 Hβ 线与巴尔末系极限',
    difficulty: 2,
    question: '取氢的里德伯常量 $R_H = 1.097\\times 10^7\\ \\text{m}^{-1}$。用里德伯公式 $\\dfrac{1}{\\lambda} = R_H\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)$ 求：(1) 巴尔末系第二条谱线 $H_\\beta$（$n_i = 4 \\to n_f = 2$）的波长；(2) 巴尔末系的线系极限波长 $\\lambda_{\\lim}$；(3) 极限处对应的光子能量，并说明其物理意义（取 $hc = 1240\\ \\text{eV}\\cdot\\text{nm}$）。',
    hints: [
      '$H_\\beta$ 对应 $n_i = 4$、$n_f = 2$，先通分 $\\dfrac{1}{4} - \\dfrac{1}{16} = \\dfrac{3}{16}$。',
      '线系极限取 $n_i \\to \\infty$，第二项趋于零。',
      '极限光子能量即把电子从 $n_f = 2$ 电离所需的最小能量。',
    ],
    solution: [
      {
        title: 'Hβ 线波长',
        detail: '$$\\frac{1}{\\lambda} = R_H\\left(\\frac{1}{2^2} - \\frac{1}{4^2}\\right) = R_H\\left(\\frac{1}{4} - \\frac{1}{16}\\right) = \\frac{3R_H}{16} = \\frac{3 \\times 1.097\\times 10^7}{16} \\approx 2.057\\times 10^6\\ \\text{m}^{-1}$$\\n$$\\lambda = \\frac{1}{2.057\\times 10^6} \\approx 4.862\\times 10^{-7}\\ \\text{m} = 486.2\\ \\text{nm}$$\\n为可见光区的青色谱线。',
      },
      {
        title: '巴尔末系线系极限',
        detail: '令 $n_i \\to \\infty$：\\n$$\\frac{1}{\\lambda_{\\lim}} = \\frac{R_H}{n_f^2} = \\frac{R_H}{4} \\quad\\Rightarrow\\quad \\lambda_{\\lim} = \\frac{4}{R_H} = \\frac{4}{1.097\\times 10^7} \\approx 3.646\\times 10^{-7}\\ \\text{m} = 364.6\\ \\text{nm}$$\\n谱线随 $n_i$ 增大向此极限密集靠拢。',
      },
      {
        title: '极限光子能量的物理意义',
        detail: '$$\\Delta E_{\\lim} = \\frac{hc}{\\lambda_{\\lim}} = \\frac{1240\\ \\text{eV}\\cdot\\text{nm}}{364.6\\ \\text{nm}} \\approx 3.40\\ \\text{eV}$$\\n恰等于 $|E_2| = 13.6/4\\ \\text{eV}$。它对应电子从电离连续区（$E = 0$）直接落到 $n = 2$ 能级释放的能量，也就是处于 $n = 2$ 的氢原子的电离能；极限之外不再是分立谱线，而是连续谱。',
      },
    ],
    answer: '$H_\\beta$ 波长 $\\lambda \\approx 486.2\\ \\text{nm}$；巴尔末系极限 $\\lambda_{\\lim} \\approx 364.6\\ \\text{nm}$；极限光子能量 $\\approx 3.40\\ \\text{eV}$，即 $n = 2$ 能级的电离能。',
    tags: ['里德伯公式', '巴尔末系', '线系极限'],
  },

  // ─────────────────────── X 射线莫塞莱定律 ───────────────────────
  {
    id: 'atomic-physics-p4',
    courseId: 'atomic-physics',
    topicId: 'xray',
    title: 'X 射线短波极限、铜的 Kα 线与标识谱阈值',
    difficulty: 3,
    question: '某 X 射线管以 $V = 40\\ \\text{kV}$ 电压加速电子轰击铜靶（$Z = 29$）。取 $\\dfrac{hc}{e} = 1.24\\ \\text{nm}\\cdot\\text{kV}$、$R_\\infty hc = 13.6\\ \\text{eV}$。(1) 求连续谱的短波极限 $\\lambda_{\\min}$；(2) 用类氢近似 $h\\nu_{K_\\alpha} \\approx \\dfrac{3}{4}R_\\infty hc\\,(Z-1)^2$ 求铜 $K_\\alpha$ 特征线的光子能量与波长；(3) 用同一类氢近似估算铜 K 层电子的结合能 $E_K \\approx 13.6(Z-1)^2\\ \\text{eV}$，说明为什么管电压必须超过某个阈值才能出现标识谱，并比较 $E_K$ 与 $K_\\alpha$ 光子能量的大小。',
    hints: [
      '短波极限对应电子动能 $eV$ 一次性全部转化为一个光子：$eV = hc/\\lambda_{\\min}$，与靶材料无关。',
      '莫塞莱定律的类氢近似把 L→K 跃迁看成有效核电荷 $(Z-1)e$ 的类氢离子中 $n = 2 \\to n = 1$ 的跃迁，能级差 $\\propto (Z-1)^2\\left(1 - \\dfrac{1}{4}\\right)$。',
      '标识谱的出现要求先用电场把 K 层电子打出去形成空位，即 $eV \\ge E_K$；把电子打到连续区比打到 L 层需要更多能量。',
    ],
    solution: [
      {
        title: '连续谱短波极限（杜安–亨特定律）',
        detail: '单个电子最多把全部动能 $eV$ 变成一个光子：\\n$$eV = \\frac{hc}{\\lambda_{\\min}} \\quad\\Rightarrow\\quad \\lambda_{\\min} = \\frac{hc}{eV} = \\frac{1.24\\ \\text{nm}\\cdot\\text{kV}}{40\\ \\text{kV}} = 0.031\\ \\text{nm} = 3.1\\times 10^{-11}\\ \\text{m}$$\\n$\\lambda_{\\min}$ 只由管电压决定，与靶无关。',
      },
      {
        title: '铜 Kα 线的能量与波长（莫塞莱定律）',
        detail: '有效核电荷 $Z_{\\text{eff}} = Z - 1 = 28$：\\n$$h\\nu_{K_\\alpha} \\approx \\frac{3}{4} \\times 13.6\\ \\text{eV} \\times 28^2 = \\frac{3}{4} \\times 13.6 \\times 784\\ \\text{eV} \\approx 8.0\\ \\text{keV}$$\\n对应波长\\n$$\\lambda = \\frac{hc}{h\\nu} = \\frac{1240\\ \\text{eV}\\cdot\\text{nm}}{8.0\\times 10^3\\ \\text{eV}} \\approx 0.155\\ \\text{nm}$$\\n与铜 $K_\\alpha$ 线实测值 $0.154\\ \\text{nm}$ 高度吻合，体现了莫塞莱定律 $\\sqrt{\\nu} \\propto (Z-1)$ 的定量成功。',
      },
      {
        title: 'K 层结合能与标识谱阈值',
        detail: '把 K 层电子电离到连续区，类氢近似下\\n$$E_K \\approx 13.6\\,(Z-1)^2\\ \\text{eV} = 13.6 \\times 784\\ \\text{eV} \\approx 10.7\\ \\text{keV}$$\\n因此只有当 $eV \\ge E_K$，即 $V \\gtrsim 10.7\\ \\text{kV}$ 时，电子才能击出 K 层电子形成空位，标识谱才开始出现；本题 $40\\ \\text{kV}$ 远超阈值。比较可见 $E_K \\approx 10.7\\ \\text{keV} > h\\nu_{K_\\alpha} \\approx 8.0\\ \\text{keV}$，因为电离的终态是自由态（$E = 0$），而 $K_\\alpha$ 跃迁的终态是仍被束缚的 L 层（$n = 2$），两者能量之差正是 L 层结合能。',
      },
    ],
    answer: '$\\lambda_{\\min} = 0.031\\ \\text{nm}$；铜 $K_\\alpha$：$h\\nu \\approx 8.0\\ \\text{keV}$，$\\lambda \\approx 0.155\\ \\text{nm}$；$E_K \\approx 10.7\\ \\text{keV}$，阈值电压约 $10.7\\ \\text{kV}$，且 $E_K > h\\nu_{K_\\alpha}$（电离终态为连续区，跃迁终态为 L 层）。',
    tags: ['X射线', '莫塞莱定律', '短波极限', '标识谱'],
  },

  // ─────────────────────── 放射性半衰期 ───────────────────────
  {
    id: 'atomic-physics-p5',
    courseId: 'atomic-physics',
    topicId: 'radioactivity',
    title: '碘-131 的衰变常数、活度与平均寿命',
    difficulty: 1,
    question: '医用放射性核素 $^{131}\\text{I}$ 的半衰期为 $T_{1/2} = 8.0$ 天。某样品初始活度 $A_0 = 3.2\\times 10^8\\ \\text{Bq}$。求：(1) 衰变常数 $\\lambda$（分别以 $\\text{天}^{-1}$ 和 $\\text{s}^{-1}$ 表示）；(2) 经过 32 天后样品的活度 $A$ 与剩余核数比 $N/N_0$；(3) 平均寿命 $\\tau$。',
    hints: [
      '衰变常数与半衰期的关系为 $\\lambda = \\ln 2 / T_{1/2} = 0.693/T_{1/2}$。',
      '32 天恰为 4 个半衰期，可用 $N/N_0 = (1/2)^4$ 直接得到分数，活度按同一指数律衰减 $A = A_0 e^{-\\lambda t}$。',
      '平均寿命 $\\tau = 1/\\lambda = T_{1/2}/\\ln 2$。',
    ],
    solution: [
      {
        title: '求衰变常数',
        detail: '$$\\lambda = \\frac{\\ln 2}{T_{1/2}} = \\frac{0.693}{8.0\\ \\text{天}} \\approx 0.0866\\ \\text{天}^{-1}$$\\n换算为秒：$T_{1/2} = 8.0 \\times 86400\\ \\text{s} = 6.912\\times 10^5\\ \\text{s}$，\\n$$\\lambda = \\frac{0.693}{6.912\\times 10^5\\ \\text{s}} \\approx 1.0\\times 10^{-6}\\ \\text{s}^{-1}$$',
      },
      {
        title: '32 天后的活度与剩余比',
        detail: '$t = 32$ 天 $= 4\\,T_{1/2}$，由指数衰减律\\n$$\\frac{N}{N_0} = \\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16} = 6.25\\%$$\\n活度与核数成正比，按同一比例衰减：\\n$$A = \\frac{A_0}{16} = \\frac{3.2\\times 10^8}{16}\\ \\text{Bq} = 2.0\\times 10^7\\ \\text{Bq}$$',
      },
      {
        title: '平均寿命',
        detail: '$$\\tau = \\frac{1}{\\lambda} = \\frac{T_{1/2}}{\\ln 2} = \\frac{8.0}{0.693}\\ \\text{天} \\approx 11.5\\ \\text{天}$$\\n平均寿命大于半衰期，因为指数分布的长尾使平均值被少数长寿核拉高。',
      },
    ],
    answer: '$\\lambda \\approx 0.0866\\ \\text{天}^{-1} = 1.0\\times 10^{-6}\\ \\text{s}^{-1}$；32 天后 $N/N_0 = 1/16 = 6.25\\%$，$A = 2.0\\times 10^7\\ \\text{Bq}$；平均寿命 $\\tau \\approx 11.5$ 天。',
    tags: ['放射性衰变', '半衰期', '活度'],
  },

  // ─────────────────────── 自旋与碱金属双线 ───────────────────────
  {
    id: 'atomic-physics-p6',
    courseId: 'atomic-physics',
    topicId: 'electron-spin',
    title: '钠黄光 D 双线的裂距与朗德 g 因子',
    difficulty: 3,
    question: '钠原子价电子处于 $3p$ 态（$l = 1$，$s = 1/2$），自旋–轨道耦合使能级按总角动量量子数 $j$ 分裂为 $3p_{1/2}$ 与 $3p_{3/2}$，跃迁到 $3s_{1/2}$ 产生著名的 D 双线：$D_1\\ (\\lambda_1 = 589.6\\ \\text{nm})$、$D_2\\ (\\lambda_2 = 589.0\\ \\text{nm})$。取 $hc = 1240\\ \\text{eV}\\cdot\\text{nm}$。求：(1) $3p$ 态 $j$ 的可能取值及对应总角动量大小 $|\\vec{J}|$；(2) D 双线的能量差 $\\Delta E$（利用 $\\Delta E \\approx \\dfrac{hc\\,\\Delta\\lambda}{\\lambda^2}$）；(3) $3p_{3/2}$ 与 $3p_{1/2}$ 能级的朗德 g 因子 $g_J = 1 + \\dfrac{J(J+1) + S(S+1) - L(L+1)}{2J(J+1)}$，并写出塞曼分裂公式。',
    hints: [
      '总角动量 $\\vec{J} = \\vec{L} + \\vec{S}$，对 $l = 1$、$s = 1/2$ 有 $j = l \\pm 1/2$；大小用 $|\\vec{J}| = \\sqrt{j(j+1)}\\,\\hbar$。',
      '双线波长差很小，可对 $E = hc/\\lambda$ 微分：$|\\Delta E| = hc\\,\\Delta\\lambda/\\lambda^2$，$\\lambda$ 取平均值 $589.3\\ \\text{nm}$。',
      '计算 $g_J$ 时注意 $L(L+1) = 1\\times 2 = 2$、$S(S+1) = 3/4$，分别代入 $J(J+1) = 15/4$（$j = 3/2$）与 $J(J+1) = 3/4$（$j = 1/2$）。',
    ],
    solution: [
      {
        title: '总角动量的可能取值',
        detail: '对 $l = 1$、$s = 1/2$，$j = l \\pm 1/2 = 3/2$ 或 $1/2$：\\n$$j = \\frac{3}{2}:\\quad |\\vec{J}| = \\sqrt{\\frac{3}{2}\\times\\frac{5}{2}}\\,\\hbar = \\frac{\\sqrt{15}}{2}\\,\\hbar \\approx 1.94\\,\\hbar$$\\n$$j = \\frac{1}{2}:\\quad |\\vec{J}| = \\sqrt{\\frac{1}{2}\\times\\frac{3}{2}}\\,\\hbar = \\frac{\\sqrt{3}}{2}\\,\\hbar \\approx 0.87\\,\\hbar$$\\n自旋–轨道耦合 $H_{so} \\propto \\vec{L}\\cdot\\vec{S}$ 使 $j = 3/2$ 与 $j = 1/2$ 两个能级劈裂，$3s$ 态（$l = 0$，$j = 1/2$）无分裂。',
      },
      {
        title: 'D 双线能量差',
        detail: '取 $\\lambda \\approx 589.3\\ \\text{nm}$，$\\Delta\\lambda = 589.6 - 589.0 = 0.6\\ \\text{nm}$：\\n$$\\Delta E \\approx \\frac{hc\\,\\Delta\\lambda}{\\lambda^2} = \\frac{1240\\ \\text{eV}\\cdot\\text{nm} \\times 0.6\\ \\text{nm}}{(589.3\\ \\text{nm})^2} = \\frac{744}{3.47\\times 10^5}\\ \\text{eV} \\approx 2.1\\times 10^{-3}\\ \\text{eV} = 2.1\\ \\text{meV}$$\\n即 D 双线由仅约 $2\\ \\text{meV}$ 的精细结构劈裂产生，波长差约 $0.6\\ \\text{nm}$。',
      },
      {
        title: '朗德 g 因子与塞曼分裂',
        detail: '对 $3p_{3/2}$（$L = 1, S = 1/2, J = 3/2$）：\\n$$g_J = 1 + \\frac{\\frac{15}{4} + \\frac{3}{4} - 2}{2 \\times \\frac{15}{4}} = 1 + \\frac{1}{3} = \\frac{4}{3}$$\\n对 $3p_{1/2}$（$J = 1/2$）：\\n$$g_J = 1 + \\frac{\\frac{3}{4} + \\frac{3}{4} - 2}{2 \\times \\frac{3}{4}} = 1 - \\frac{1}{3} = \\frac{2}{3}$$\\n塞曼效应中能级附加能量为 $\\Delta E = g_J\\mu_B B m_J$（$m_J = -J, \\dots, J$）。两个能级 $g_J$ 不同，导致磁场中 D 双线的分裂图案各不相同，这正是"反常塞曼效应"的典型表现，也只有引入电子自旋后才能解释。',
      },
    ],
    answer: '$j = 3/2$：$|\\vec{J}| = \\dfrac{\\sqrt{15}}{2}\\hbar$；$j = 1/2$：$|\\vec{J}| = \\dfrac{\\sqrt{3}}{2}\\hbar$；D 双线能量差 $\\Delta E \\approx 2.1\\ \\text{meV}$；$g(3p_{3/2}) = 4/3$，$g(3p_{1/2}) = 2/3$，塞曼分裂 $\\Delta E = g_J\\mu_B B m_J$。',
    tags: ['电子自旋', '自旋–轨道耦合', '碱金属双线', '朗德 g 因子'],
  },
];
