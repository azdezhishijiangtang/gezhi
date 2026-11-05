import type { Problem } from '@/types';

export const statistical_physicsProblems: Problem[] = [
  // ─────────────────────── 微观状态数与玻尔兹曼熵 ───────────────────────
  {
    id: 'statistical-physics-p1',
    courseId: 'statistical-physics',
    topicId: 'stat-basics',
    title: '二维自旋格点系统的微观状态数与熵',
    difficulty: 2,
    question: '二维正方格点上固定 $N = 20$ 个可分辨的自旋磁矩，每个自旋只能取向上或向下两个状态（本题只讨论计数，不涉及能量）。(1) 写出"恰有 $n$ 个自旋向上"这一宏观态的微观状态数 $\\Omega(n)$ 的表达式；(2) 计算 $n = 10$ 时的 $\\Omega$；(3) 求系统的总微观态数；(4) 当 $N$ 增大到 $10^{23}$ 时，用斯特林公式 $\\ln N! \\approx N\\ln N - N$ 估算半满分布（$n = N/2$）的熵 $S$（以 $k$ 为单位）。已知 $\\binom{20}{10} = 184756$。',
    hints: [
      '可分辨粒子占据两个状态，微观状态数即从 $N$ 个粒子中选出 $n$ 个的组合数：$\\Omega(n) = \\dfrac{N!}{n!(N-n)!}$。',
      '每个自旋独立地有 2 种选择，总微观态数为 $2^N$；它与 $\\sum_n \\Omega(n)$ 相等（组合数求和恒等式）。',
      '半满时 $\\ln\\Omega = \\ln N! - 2\\ln(N/2)!$，代入斯特林公式后一次项全部抵消，只剩 $N\\ln 2$。',
    ],
    solution: [
      {
        title: '写出计数公式',
        detail: '粒子可分辨且每个只有向上/向下两个状态，"恰有 $n$ 个向上"的宏观态不指定是哪些粒子向上，故其微观状态数为组合数 $\\Omega(n) = \\dfrac{N!}{n!\\,(N-n)!}$。这正是玻尔兹曼计数 $\\Omega = \\dfrac{N!}{\\prod_l a_l!}\\prod_l \\omega_l^{a_l}$ 在 $\\omega_l = 1$、两个"能级"时的特例。',
      },
      {
        title: '计算半满分布的 $\\Omega$',
        detail: '$\\Omega(10) = \\dfrac{20!}{10!\\,10!} = \\binom{20}{10} = 184756$。而全同向分布 $\\Omega(0) = \\Omega(20) = 1$，相差五个数量级以上，可见"均匀混合"宏观态的微观实现方式占绝对优势。',
      },
      {
        title: '求总微观态数',
        detail: '每个自旋独立取 2 种状态，总微观态数 $= 2^{20} = 1048576$。验证：$\\sum_{n=0}^{20} \\binom{20}{n} = 2^{20}$，与组合数求和恒等式一致。若系统孤立（能量固定为某值），等概率原理只在该能量对应的 $\\Omega(n)$ 个微观态内均匀赋概。',
      },
      {
        title: '大 $N$ 半满分布的熵',
        detail: '$\\ln\\Omega = \\ln N! - 2\\ln\\left(\\dfrac{N}{2}\\right)! \\approx N\\ln N - N - 2\\left(\\dfrac{N}{2}\\ln\\dfrac{N}{2} - \\dfrac{N}{2}\\right) = N\\ln N - N\\ln\\dfrac{N}{2} = N\\ln 2$。于是 $S = k\\ln\\Omega \\approx Nk\\ln 2 \\approx 0.693\\,Nk$。对 $N = 10^{23}$，$S \\approx 6.9\\times10^{22}\\,k$。',
      },
      {
        title: '物理讨论',
        detail: '熵正比于 $N$（广延性）正是取对数的结果：微观态数按 $2^N$ 指数增长，熵只线性增长。半满分布是最概然分布，$N$ 越大偏离半满的相对涨落 $\\sim 1/\\sqrt{N}$ 越小，宏观上系统"永远"停留在半满附近——这就是平衡态的统计诠释。',
      },
    ],
    answer: '$\\Omega(n) = \\dfrac{N!}{n!(N-n)!}$；$\\Omega(10) = 184756$；总微观态数 $2^{20} = 1048576$；大 $N$ 半满分布 $S \\approx Nk\\ln 2 \\approx 0.693\\,Nk$',
    tags: ['微观状态数', '玻尔兹曼熵', '斯特林公式', '等概率原理'],
  },

  // ─────────────────────── 由配分函数求热力学量 ───────────────────────
  {
    id: 'statistical-physics-p2',
    courseId: 'statistical-physics',
    topicId: 'boltzmann-distribution',
    title: '一维谐振子的配分函数、内能与自由能',
    difficulty: 1,
    question: '一维量子谐振子的能级为 $\\varepsilon_n = \\left(n + \\dfrac{1}{2}\\right)\\hbar\\omega$（$n = 0, 1, 2, \\dots$），能级非简并，系统处于温度 $T$ 的平衡态，记 $\\beta = 1/kT$。求：(1) 单粒子配分函数 $Z$；(2) 内能 $U$；(3) 高温极限（$kT \\gg \\hbar\\omega$）下的 $U$，并说明其与能量均分定理的联系；(4) 自由能 $F$ 与熵 $S$。',
    hints: [
      '$Z = \\sum_n e^{-\\beta(n+1/2)\\hbar\\omega}$ 是公比为 $e^{-\\beta\\hbar\\omega}$ 的等比级数，可化为 $Z = \\dfrac{e^{-\\beta\\hbar\\omega/2}}{1 - e^{-\\beta\\hbar\\omega}} = \\dfrac{1}{2\\sinh(\\beta\\hbar\\omega/2)}$。',
      '内能由 $U = -\\dfrac{\\partial \\ln Z}{\\partial \\beta}$ 求出；$\\ln Z = -\\ln\\left(2\\sinh\\dfrac{\\beta\\hbar\\omega}{2}\\right)$。',
      '高温极限用展开 $e^{\\beta\\hbar\\omega} \\approx 1 + \\beta\\hbar\\omega$；自由能 $F = -kT\\ln Z$，熵 $S = \\dfrac{U - F}{T}$。',
    ],
    solution: [
      {
        title: '等比级数求配分函数',
        detail: '$Z = \\sum_{n=0}^{\\infty} e^{-\\beta(n+1/2)\\hbar\\omega} = e^{-\\beta\\hbar\\omega/2}\\sum_{n=0}^{\\infty}\\left(e^{-\\beta\\hbar\\omega}\\right)^n = \\dfrac{e^{-\\beta\\hbar\\omega/2}}{1 - e^{-\\beta\\hbar\\omega}} = \\dfrac{1}{2\\sinh\\left(\\dfrac{\\beta\\hbar\\omega}{2}\\right)}$。',
      },
      {
        title: '求内能',
        detail: '$\\ln Z = -\\ln 2 - \\ln\\sinh\\left(\\dfrac{\\beta\\hbar\\omega}{2}\\right)$，求导得 $U = -\\dfrac{\\partial\\ln Z}{\\partial\\beta} = \\dfrac{\\hbar\\omega}{2}\\coth\\left(\\dfrac{\\beta\\hbar\\omega}{2}\\right) = \\dfrac{\\hbar\\omega}{2} + \\dfrac{\\hbar\\omega}{e^{\\beta\\hbar\\omega} - 1}$。第一项是零点能，第二项是热激发能量。',
      },
      {
        title: '高温极限与能量均分',
        detail: '$kT \\gg \\hbar\\omega$ 时 $e^{\\beta\\hbar\\omega} - 1 \\approx \\beta\\hbar\\omega$，故 $U \\approx \\dfrac{\\hbar\\omega}{2} + kT \\approx kT$。一维谐振子有坐标与动量两个平方项自由度，能量均分定理给 $U = 2 \\times \\dfrac{1}{2}kT = kT$，两者一致——经典极限自动包含在配分函数之中。',
      },
      {
        title: '求自由能与熵',
        detail: '$F = -kT\\ln Z = \\dfrac{\\hbar\\omega}{2} + kT\\ln\\left(1 - e^{-\\beta\\hbar\\omega}\\right)$。熵 $S = \\dfrac{U - F}{T} = k\\left[\\dfrac{\\beta\\hbar\\omega}{e^{\\beta\\hbar\\omega} - 1} - \\ln\\left(1 - e^{-\\beta\\hbar\\omega}\\right)\\right]$。低温极限 $S \\to 0$（系统冻结在基态），高温极限 $S \\approx k\\left[1 + \\ln\\left(kT/\\hbar\\omega\\right)\\right]$ 随温度对数增长。',
      },
    ],
    answer: '$Z = \\dfrac{e^{-\\beta\\hbar\\omega/2}}{1 - e^{-\\beta\\hbar\\omega}}$；$U = \\dfrac{\\hbar\\omega}{2} + \\dfrac{\\hbar\\omega}{e^{\\hbar\\omega/kT} - 1}$；高温 $U \\to kT$（能量均分）；$F = \\dfrac{\\hbar\\omega}{2} + kT\\ln\\left(1 - e^{-\\hbar\\omega/kT}\\right)$，$S = k\\left[\\dfrac{\\hbar\\omega/kT}{e^{\\hbar\\omega/kT} - 1} - \\ln\\left(1 - e^{-\\hbar\\omega/kT}\\right)\\right]$',
    tags: ['配分函数', '内能', '自由能', '能量均分定理'],
  },

  // ─────────────────────── 二能级系统的正则系综计算 ───────────────────────
  {
    id: 'statistical-physics-p3',
    courseId: 'statistical-physics',
    topicId: 'canonical-ensemble',
    title: '二能级系统的配分函数、内能与熵',
    difficulty: 2,
    question: '$N$ 个可分辨的独立粒子处于温度 $T$ 的正则系综中，每个粒子只有两个非简并能级：$\\varepsilon_0 = 0$ 与 $\\varepsilon_1 = \\Delta$。求：(1) 系统配分函数 $Z_N$；(2) 处于激发态的粒子数 $N_1$ 与内能 $U$；(3) $T \\to 0$ 与 $T \\to \\infty$ 两个极限下的 $U$ 与 $N_1$；(4) 熵 $S(T)$，并说明 $T \\to \\infty$ 时 $S \\to Nk\\ln 2$ 的物理意义。',
    hints: [
      '独立粒子系统的配分函数是单粒子配分函数的幂：$Z_N = z^N$，其中 $z = 1 + e^{-\\beta\\Delta}$。',
      '激发态占据概率为 $p_1 = \\dfrac{e^{-\\beta\\Delta}}{1 + e^{-\\beta\\Delta}} = \\dfrac{1}{e^{\\beta\\Delta} + 1}$，$N_1 = Np_1$，$U = N_1\\Delta$。',
      '自由能 $F = -kT\\ln Z_N$，熵可用 $S = \\dfrac{U - F}{T}$ 计算，也可用 $S = -Nk\\left(p_0\\ln p_0 + p_1\\ln p_1\\right)$ 验证。',
    ],
    solution: [
      {
        title: '求系统配分函数',
        detail: '单粒子配分函数 $z = e^{-\\beta\\cdot 0} + e^{-\\beta\\Delta} = 1 + e^{-\\beta\\Delta}$；$N$ 个独立可分辨粒子的系统配分函数 $Z_N = z^N = \\left(1 + e^{-\\beta\\Delta}\\right)^N$。',
      },
      {
        title: '求激发粒子数与内能',
        detail: '粒子处于激发态的概率 $p_1 = \\dfrac{e^{-\\beta\\Delta}}{1 + e^{-\\beta\\Delta}} = \\dfrac{1}{e^{\\beta\\Delta} + 1}$，故 $N_1 = \\dfrac{N}{e^{\\Delta/kT} + 1}$，内能 $U = N_1\\Delta = \\dfrac{N\\Delta}{e^{\\Delta/kT} + 1}$。也可由 $U = -\\partial\\ln Z_N/\\partial\\beta$ 直接求导得到同一结果。',
      },
      {
        title: '分析两个极限',
        detail: '$T \\to 0$（$\\beta\\Delta \\to \\infty$）：$N_1 \\to 0$，$U \\to 0$，全部粒子沉在基态。$T \\to \\infty$（$\\beta\\Delta \\to 0$）：$N_1 \\to N/2$，$U \\to N\\Delta/2$，两能级等概率占据，内能饱和于激发能量的平均值——继续升温已无法再增加内能，因为占据比例不可能超过 $1/2$。',
      },
      {
        title: '求熵并讨论',
        detail: '$F = -NkT\\ln\\left(1 + e^{-\\beta\\Delta}\\right)$，故 $S = \\dfrac{U - F}{T} = Nk\\left[\\ln\\left(1 + e^{-\\beta\\Delta}\\right) + \\dfrac{\\beta\\Delta}{e^{\\beta\\Delta} + 1}\\right]$。$T \\to 0$ 时 $S \\to 0$（第三定律）；$T \\to \\infty$ 时 $S \\to Nk\\ln 2$。后者是因为此时每个粒子在两能级间完全随机分布，每个粒子贡献 $\\ln 2$ 的"缺失信息"（1 比特），这正是等概率最大熵的直观体现。顺带指出：若用泵浦使激发数超过 $N/2$（粒子数反转），分布对应 $\\beta < 0$ 的负温度状态，比任何正温度都"热"。',
      },
    ],
    answer: '$Z_N = \\left(1 + e^{-\\Delta/kT}\\right)^N$；$N_1 = \\dfrac{N}{e^{\\Delta/kT} + 1}$，$U = \\dfrac{N\\Delta}{e^{\\Delta/kT} + 1}$；$T \\to 0$：$U \\to 0$、$N_1 \\to 0$，$T \\to \\infty$：$U \\to N\\Delta/2$、$N_1 \\to N/2$；$S = Nk\\left[\\ln\\left(1 + e^{-\\Delta/kT}\\right) + \\dfrac{\\Delta/kT}{e^{\\Delta/kT} + 1}\\right] \\to Nk\\ln 2$（高温）',
    tags: ['二能级系统', '正则系综', '配分函数', '负温度'],
  },

  // ─────────────────────── 巨正则系综粒子数涨落 ───────────────────────
  {
    id: 'statistical-physics-p4',
    courseId: 'statistical-physics',
    topicId: 'grand-canonical',
    title: '经典理想气体的巨配分函数与粒子数涨落',
    difficulty: 3,
    question: '单原子经典理想气体与温度 $T$、化学势 $\\mu$ 的大粒子库接触，处于巨正则系综。已知其 $N$ 粒子正则配分函数为 $Z_N = \\dfrac{1}{N!}\\left(\\dfrac{V}{\\lambda_T^3}\\right)^N$，其中 $\\lambda_T = h/\\sqrt{2\\pi mkT}$ 为热德布罗意波长，易逸度 $z = e^{\\beta\\mu}$。(1) 求巨配分函数 $\\Xi$；(2) 证明平均粒子数 $\\bar N = zV/\\lambda_T^3$，并反解出化学势 $\\mu = kT\\ln\\left(n\\lambda_T^3\\right)$（$n = \\bar N/V$）；(3) 利用涨落公式 $\\overline{(\\Delta N)^2} = kT\\left(\\dfrac{\\partial \\bar N}{\\partial \\mu}\\right)_{T,V}$ 证明 $\\overline{(\\Delta N)^2} = \\bar N$，并计算 1 mol 气体的粒子数相对涨落；(4) 说明宏观实验中粒子数可视为严格恒定的原因。',
    hints: [
      '$\\Xi = \\sum_{N=0}^{\\infty} z^N Z_N = \\sum_N \\dfrac{1}{N!}\\left(\\dfrac{zV}{\\lambda_T^3}\\right)^N$，这是指数函数的泰勒展开。',
      '$\\bar N = z\\,\\dfrac{\\partial \\ln \\Xi}{\\partial z}$，而 $\\partial z/\\partial\\mu = \\beta z$。',
      '相对涨落定义为 $\\sqrt{\\overline{(\\Delta N)^2}}\\,/\\bar N$；$N_A \\approx 6.02 \\times 10^{23}$，$\\sqrt{6.02 \\times 10^{23}} \\approx 7.8 \\times 10^{11}$。',
    ],
    solution: [
      {
        title: '求巨配分函数',
        detail: '$\\Xi = \\sum_{N=0}^{\\infty} z^N Z_N = \\sum_{N=0}^{\\infty} \\dfrac{1}{N!}\\left(\\dfrac{zV}{\\lambda_T^3}\\right)^N = \\exp\\left(\\dfrac{zV}{\\lambda_T^3}\\right)$，故 $\\ln\\Xi = \\dfrac{zV}{\\lambda_T^3}$。指数函数的出现是 $1/N!$ 因子与对 $N$ 求和相互配合的结果。',
      },
      {
        title: '求平均粒子数与化学势',
        detail: '$\\bar N = z\\,\\dfrac{\\partial\\ln\\Xi}{\\partial z} = z \\cdot \\dfrac{V}{\\lambda_T^3} = \\dfrac{zV}{\\lambda_T^3}$。反解 $z = \\bar N\\lambda_T^3/V = n\\lambda_T^3$，由 $z = e^{\\beta\\mu}$ 得 $\\mu = kT\\ln\\left(n\\lambda_T^3\\right)$。经典气体 $n\\lambda_T^3 \\ll 1$，故 $\\mu$ 为大的负值，符合预期。',
      },
      {
        title: '求粒子数涨落',
        detail: '先算偏导：$\\left(\\dfrac{\\partial\\bar N}{\\partial\\mu}\\right)_{T,V} = \\dfrac{V}{\\lambda_T^3}\\dfrac{\\partial z}{\\partial\\mu} = \\dfrac{V}{\\lambda_T^3}\\cdot\\beta z = \\dfrac{\\bar N}{kT}$。代入涨落公式得 $\\overline{(\\Delta N)^2} = kT \\cdot \\dfrac{\\bar N}{kT} = \\bar N$，即粒子数服从泊松型涨落。1 mol 气体：$\\sqrt{\\overline{(\\Delta N)^2}} = \\sqrt{6.02\\times10^{23}} \\approx 7.8\\times10^{11}$，相对涨落 $\\approx 1.3\\times10^{-12}$。',
      },
      {
        title: '物理讨论',
        detail: '相对涨落 $1/\\sqrt{\\bar N}$ 来自分子独立进出容器的随机性（中心极限定理）。对任何宏观系统这一比值都小到不可观测（$10^{-12}$ 量级），因此巨正则系综与正则系综在热力学极限下给出完全相同的结果；只有介观系统（量子点、纳米孔）或临界点附近（涨落被相关性放大）粒子数涨落才需要认真对待。',
      },
    ],
    answer: '$\\Xi = \\exp\\left(zV/\\lambda_T^3\\right)$；$\\bar N = zV/\\lambda_T^3$，$\\mu = kT\\ln(n\\lambda_T^3)$；$\\overline{(\\Delta N)^2} = \\bar N$，1 mol 气体相对涨落 $\\approx 1.3\\times10^{-12}$',
    tags: ['巨正则系综', '巨配分函数', '粒子数涨落', '化学势'],
  },

  // ─────────────────────── 黑体辐射斯特藩-玻尔兹曼定律 ───────────────────────
  {
    id: 'statistical-physics-p5',
    courseId: 'statistical-physics',
    topicId: 'photon-bec',
    title: '由普朗克公式推导斯特藩-玻尔兹曼定律并估算太阳表面温度',
    difficulty: 3,
    question: '黑体辐射的能量谱密度（单位体积、单位角频率）为普朗克公式 $u(\\omega, T)\\,d\\omega = \\dfrac{\\hbar\\omega^3}{\\pi^2 c^3} \\cdot \\dfrac{d\\omega}{e^{\\hbar\\omega/kT} - 1}$。已知积分 $\\displaystyle\\int_0^{\\infty} \\dfrac{x^3\\,dx}{e^x - 1} = \\dfrac{\\pi^4}{15}$，基本常数 $k = 1.381\\times10^{-23}\\ \\text{J/K}$，$h = 6.626\\times10^{-34}\\ \\text{J}\\cdot\\text{ s}$，$c = 3.00\\times10^8\\ \\text{m/s}$。(1) 积分证明总能量密度 $u(T) = aT^4$，并给出 $a = \\pi^2 k^4/(15\\hbar^3 c^3)$；(2) 利用黑体表面辐射出射度与能量密度的关系 $M = \\dfrac{1}{4}cu$，推导斯特藩-玻尔兹曼定律 $M = \\sigma T^4$ 并证明 $\\sigma = \\dfrac{2\\pi^5 k^4}{15 h^3 c^2}$；(3) 代入数值计算 $\\sigma$ 并与实测值 $5.67\\times10^{-8}\\ \\text{W/(m}^2\\text{K}^4)$ 比较；(4) 已知太阳表面辐射出射度约 $6.3\\times10^7\\ \\text{W/m}^2$，估算太阳表面温度。',
    hints: [
      '换元 $x = \\hbar\\omega/kT$，则 $\\omega^3 d\\omega = (kT)^4 x^3 dx/\\hbar^4$，温度因子整体提出积分号外。',
      '$M = cu/4$ 中因子 $c/4$ 的来源：各向同性辐射以光速流出，乘以立体角投影的余弦因子（对半空间平均为 $1/4$）；把 $\\hbar = h/2\\pi$ 代入 $\\sigma = ca/4$ 即化成 $2\\pi^5 k^4/(15h^3c^2)$。',
      '数值计算注意 $k^4 \\approx 3.64\\times10^{-92}$，$h^3 \\approx 2.91\\times10^{-100}$；第 (4) 问直接反解 $T = (M/\\sigma)^{1/4}$。',
    ],
    solution: [
      {
        title: '积分求总能量密度',
        detail: '换元 $x = \\hbar\\omega/kT$：$u(T) = \\dfrac{\\hbar}{\\pi^2c^3}\\displaystyle\\int_0^{\\infty} \\dfrac{\\omega^3\\,d\\omega}{e^{\\hbar\\omega/kT}-1} = \\dfrac{(kT)^4}{\\pi^2\\hbar^3c^3}\\displaystyle\\int_0^{\\infty}\\dfrac{x^3\\,dx}{e^x - 1} = \\dfrac{\\pi^2 k^4}{15\\hbar^3c^3}\\,T^4 \\equiv aT^4$。温度的四次方律是三维无质量场模密度（$\\omega^2$）与玻色占据共同的结果。',
      },
      {
        title: '推导斯特藩-玻尔兹曼定律',
        detail: '$M = \\dfrac{c}{4}u = \\dfrac{c}{4}\\cdot\\dfrac{\\pi^2k^4}{15\\hbar^3c^3}T^4$。代入 $\\hbar = h/2\\pi$：$a = \\dfrac{8\\pi^5k^4}{15h^3c^3}$，故 $\\sigma = \\dfrac{ca}{4} = \\dfrac{2\\pi^5k^4}{15h^3c^2}$，即 $M = \\sigma T^4$。',
      },
      {
        title: '数值验证',
        detail: '$k^4 = (1.381\\times10^{-23})^4 \\approx 3.64\\times10^{-92}$；$h^3 = (6.626\\times10^{-34})^3 \\approx 2.91\\times10^{-100}$；$c^2 = 9.00\\times10^{16}$；$2\\pi^5 = 612$。分子 $= 612 \\times 3.64\\times10^{-92} \\approx 2.23\\times10^{-89}$；分母 $= 15 \\times 2.91\\times10^{-100} \\times 9.00\\times10^{16} \\approx 3.93\\times10^{-82}$。$\\sigma \\approx 5.67\\times10^{-8}\\ \\text{W/(m}^2\\text{K}^4)$，与实测值完全一致——统计物理从第一性原理算出了可精密测量的普适常数。',
      },
      {
        title: '估算太阳表面温度',
        detail: '$T = \\left(\\dfrac{M}{\\sigma}\\right)^{1/4} = \\left(\\dfrac{6.3\\times10^7}{5.67\\times10^{-8}}\\right)^{1/4} = \\left(1.11\\times10^{15}\\right)^{1/4}\\ \\text{K} \\approx 5.8\\times10^3\\ \\text{K}$。与太阳光谱色温（约 $5770\\ \\text{K}$）相符，说明太阳表面辐射近似黑体谱。同一公式反过来也可估算地球的辐射平衡温度。',
      },
    ],
    answer: '$a = \\pi^2k^4/(15\\hbar^3c^3)$，$u = aT^4$；$\\sigma = 2\\pi^5k^4/(15h^3c^2) \\approx 5.67\\times10^{-8}\\ \\text{W/(m}^2\\text{K}^4)$，与实测一致；太阳表面温度 $T \\approx 5.8\\times10^3\\ \\text{K}$',
    tags: ['黑体辐射', '普朗克公式', '斯特藩-玻尔兹曼定律', '光子气体'],
  },

  // ─────────────────────── 金属费米能与电子热容 ───────────────────────
  {
    id: 'statistical-physics-p6',
    courseId: 'statistical-physics',
    topicId: 'fermi-gas',
    title: '铜的费米能、费米温度与电子热容',
    difficulty: 3,
    question: '铜是一价金属，密度 $\\rho = 8.96\\times10^3\\ \\text{kg/m}^3$，摩尔质量 $M = 63.5\\times10^{-3}\\ \\text{kg/mol}$，每个原子贡献一个传导电子。基本常数：$N_A = 6.02\\times10^{23}\\ \\text{mol}^{-1}$，$m_e = 9.11\\times10^{-31}\\ \\text{kg}$，$\\hbar = 1.055\\times10^{-34}\\ \\text{J}\\cdot\\text{ s}$，$k = 1.381\\times10^{-23}\\ \\text{J/K}$，$1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}$。(1) 求传导电子数密度 $n$；(2) 求 $T = 0$ 时的费米能 $E_F = \\dfrac{\\hbar^2}{2m_e}(3\\pi^2 n)^{2/3}$（分别用 J 与 eV 表示）与费米温度 $T_F$；(3) 求费米面电子速率 $v_F = \\hbar(3\\pi^2 n)^{1/3}/m_e$；(4) 室温 $T = 300\\ \\text{K}$ 下，由电子热容公式 $C_V^{(e)} = \\dfrac{\\pi^2}{2}Nk\\,\\dfrac{T}{T_F}$ 估算电子热容与晶格热容 $3Nk$（杜隆-珀蒂定律）之比，并解释为什么常温下电子对热容的贡献几乎可以忽略。',
    hints: [
      '数密度 $n = \\rho N_A / M$（一价金属每个原子一个电子）；先算 $3\\pi^2 n$ 再取 $2/3$ 次方，$\\hbar^2/2m_e \\approx 6.11\\times10^{-39}\\ \\text{J}\\cdot\\text{ m}^2$。',
      '费米温度 $T_F = E_F/k$；费米速度也可用 $v_F = \\sqrt{2E_F/m_e}$ 验证，与 $\\hbar(3\\pi^2 n)^{1/3}/m_e$ 结果一致。',
      '比值 $\\dfrac{C_V^{(e)}}{3Nk} = \\dfrac{\\pi^2}{6}\\cdot\\dfrac{T}{T_F}$（一价，$N$ 为电子数）。',
    ],
    solution: [
      {
        title: '求电子数密度',
        detail: '$n = \\dfrac{\\rho N_A}{M} = \\dfrac{8.96\\times10^3 \\times 6.02\\times10^{23}}{63.5\\times10^{-3}} \\approx \\dfrac{5.39\\times10^{27}}{0.0635} \\approx 8.5\\times10^{28}\\ \\text{m}^{-3}$。',
      },
      {
        title: '求费米能与费米温度',
        detail: '$3\\pi^2 n = 3 \\times 9.87 \\times 8.5\\times10^{28} \\approx 2.52\\times10^{30}\\ \\text{m}^{-3}$，其 $2/3$ 次方为 $\\left(2.52\\times10^{30}\\right)^{2/3} \\approx 1.85\\times10^{20}\\ \\text{m}^{-2}$。$E_F = \\dfrac{\\hbar^2}{2m_e}\\times1.85\\times10^{20} = 6.11\\times10^{-39} \\times 1.85\\times10^{20} \\approx 1.13\\times10^{-18}\\ \\text{J} \\approx 7.0\\ \\text{eV}$。费米温度 $T_F = E_F/k = \\dfrac{1.13\\times10^{-18}}{1.381\\times10^{-23}} \\approx 8.2\\times10^4\\ \\text{K}$，远高于室温，铜的电子气深度简并。',
      },
      {
        title: '求费米速度',
        detail: '$v_F = \\dfrac{\\hbar(3\\pi^2n)^{1/3}}{m_e} = \\dfrac{1.055\\times10^{-34} \\times 1.36\\times10^{10}}{9.11\\times10^{-31}} \\approx 1.6\\times10^6\\ \\text{m/s}$（也可由 $v_F = \\sqrt{2E_F/m_e}$ 验证）。零温下电子仍以约千分之一光速运动，这份动能来自泡利原理，是量子基态动能而非热运动。',
      },
      {
        title: '求电子热容占比并讨论',
        detail: '比值 $\\dfrac{C_V^{(e)}}{C_V^{(lattice)}} = \\dfrac{(\\pi^2/2)Nk\\,(T/T_F)}{3Nk} = \\dfrac{\\pi^2}{6}\\cdot\\dfrac{T}{T_F} = \\dfrac{4.93}{6}\\times\\dfrac{300}{8.2\\times10^4} \\approx 3.0\\times10^{-3}$，即约 $0.3\\%$（计入费米面附近的精确系数后与实验约 $0.5\\%$–$1\\%$ 相符）。原因：泡利原理使能量低于 $E_F - kT$ 的电子周围没有空态可去，无法吸收热能；只有费米面附近 $\\sim kT/E_F \\approx 0.4\\%$ 的电子参与热激发，故电子热容比经典预言 $\\frac{3}{2}Nk$ 小约两个数量级，室温下晶格振动（$3Nk$）完全主导热容。',
      },
    ],
    answer: '$n \\approx 8.5\\times10^{28}\\ \\text{m}^{-3}$；$E_F \\approx 1.13\\times10^{-18}\\ \\text{J} \\approx 7.0\\ \\text{eV}$，$T_F \\approx 8.2\\times10^4\\ \\text{K}$；$v_F \\approx 1.6\\times10^6\\ \\text{m/s}$；室温下 $C_V^{(e)}/3Nk \\approx 3\\times10^{-3}$，因泡利原理只有 $\\sim kT/E_F$ 份额的电子参与热激发，电子热容可忽略',
    tags: ['费米能', '费米温度', '电子热容', '自由电子气'],
  },
];
