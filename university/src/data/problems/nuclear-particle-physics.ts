import type { Problem } from '@/types';

export const nuclear_particle_physicsProblems: Problem[] = [
  // ─────────────────────── 核半径、质量亏损与结合能 ───────────────────────
  {
    id: 'nuclear-particle-physics-p1',
    courseId: 'nuclear-particle-physics',
    topicId: 'nuclear-properties',
    title: '$^{56}\\text{Fe}$ 的核半径、密度与结合能',
    difficulty: 1,
    question: '已知 $^{56}\\text{Fe}$ 的原子质量 $M = 55.9349\\,\\text{u}$，$Z = 26$、$N = 30$。取 $r_0 = 1.2\\,\\text{fm}$，$1\\,\\text{u} = 931.5\\,\\text{MeV}/c^2 = 1.6605\\times 10^{-27}\\,\\text{kg}$，$M(^{1}\\text{H}) = 1.007825\\,\\text{u}$，$m_n = 1.008665\\,\\text{u}$。求：(1) 核半径 $R$ 与核物质密度 $\\rho$；(2) 质量亏损与结合能 $B$、比结合能 $B/A$；(3) 把 $^{56}\\text{Fe}$ 完全拆成自由核子，平均每个核子需要多少能量？与 $^{4}\\text{He}$（$B = 28.3\\,\\text{MeV}$）比较，说明哪一个束缚得更紧。',
    hints: [
      '核半径用 $R = r_0 A^{1/3}$，密度用 $\\rho = M/(\\frac43\\pi R^3)$，注意 $1\\,\\text{fm} = 10^{-15}\\,\\text{m}$。',
      '用手头的原子质量时，电子质量在两端自动抵消，直接代 $B = [Z M(^{1}\\text{H}) + N m_n - M_{\\text{atom}}]c^2$ 即可，不必再扣电子质量。',
      '比结合能 $B/A$ 才是"束缚得紧不紧"的判据，总结合能大不代表每个核子束缚得更牢。',
    ],
    solution: [
      {
        title: '核半径与核密度',
        detail: '由 $R = r_0 A^{1/3}$，先算 $56^{1/3} \\approx 3.826$：\\n$$R = 1.2\\times 3.826\\,\\text{fm} \\approx 4.59\\,\\text{fm} = 4.59\\times 10^{-15}\\,\\text{m}$$\\n质量为 $M = 56\\times 1.6605\\times 10^{-27}\\,\\text{kg} = 9.30\\times 10^{-26}\\,\\text{kg}$，体积\\n$$V = \\frac43\\pi R^3 = \\frac43\\pi (4.59\\times 10^{-15})^3 \\approx 4.05\\times 10^{-43}\\,\\text{m}^3$$\\n$$\\rho = \\frac{9.30\\times 10^{-26}}{4.05\\times 10^{-43}} \\approx 2.3\\times 10^{17}\\,\\text{kg/m}^3$$\\n这比水的密度高出约 $10^{14}$ 倍，且与 $A$ 无关（可验证 $\\rho = 3m_u/(4\\pi r_0^3)$ 中不含 $A$）。',
      },
      {
        title: '质量亏损与结合能',
        detail: '用原子质量计算（电子质量自动抵消）：\\n$$Z M(^{1}\\text{H}) = 26\\times 1.007825 = 26.20345\\,\\text{u}$$\\n$$N m_n = 30\\times 1.008665 = 30.25995\\,\\text{u}$$\\n$$\\Delta m = 26.20345 + 30.25995 - 55.9349 = 0.52850\\,\\text{u}$$\\n$$B = \\Delta m\\,c^2 = 0.52850\\times 931.5 \\approx 492.3\\,\\text{MeV}$$\\n比结合能\\n$$\\frac{B}{A} = \\frac{492.3}{56} \\approx 8.79\\,\\text{MeV/核子}$$\\n与实验值 $8.79\\,\\text{MeV}$ 完全一致，正处于比结合能曲线的峰顶附近。',
      },
      {
        title: '拆散核子所需能量与比较',
        detail: '把 $^{56}\\text{Fe}$ 完全拆开，平均每个核子需要\\n$$\\varepsilon = \\frac{B}{A} \\approx 8.79\\,\\text{MeV}$$\\n而 $^{4}\\text{He}$ 的比结合能为\\n$$\\frac{B}{A} = \\frac{28.3}{4} \\approx 7.07\\,\\text{MeV/核子}$$\\n可见 $^{56}\\text{Fe}$ 每个核子束缚得更紧（约高出 $24\\%$），尽管 $^{4}\\text{He}$ 的总结合能绝对值小得多。这正是比结合能曲线在 $A\\approx 56$ 附近达到极大、并由此决定"轻核聚变、重核裂变"都放能的原因。',
      },
    ],
    answer: '$R \\approx 4.59\\,\\text{fm}$，$\\rho \\approx 2.3\\times 10^{17}\\,\\text{kg/m}^3$；$\\Delta m \\approx 0.5285\\,\\text{u}$，$B \\approx 492.3\\,\\text{MeV}$，$B/A \\approx 8.79\\,\\text{MeV}$；拆散 $^{56}\\text{Fe}$ 平均每核子需约 $8.79\\,\\text{MeV}$，比 $^{4}\\text{He}$ 的 $7.07\\,\\text{MeV}$ 更紧束缚。',
    tags: ['核半径', '质量亏损', '比结合能'],
  },

  // ─────────────────────── 半经验质量公式 ───────────────────────
  {
    id: 'nuclear-particle-physics-p2',
    courseId: 'nuclear-particle-physics',
    topicId: 'nuclear-models',
    title: '韦扎克半经验质量公式计算结合能',
    difficulty: 2,
    question: '韦扎克公式为 $B = a_v A - a_s A^{2/3} - a_c\\dfrac{Z(Z-1)}{A^{1/3}} - a_a\\dfrac{(A-2Z)^2}{A} + \\delta$，取 $a_v = 15.75$、$a_s = 17.8$、$a_c = 0.711$、$a_a = 23.7$（单位 MeV），对能项 $\\delta = +34A^{-3/4}$（偶偶核）。求：(1) $^{56}\\text{Fe}$（$Z = 26$）的结合能与比结合能，与实验值 $492.3\\,\\text{MeV}$ 比较；(2) $^{238}\\text{U}$（$Z = 92$）的结合能与比结合能；(3) 由公式对 $Z$ 求极值导出 $\\beta$ 稳定线 $Z \\approx \\dfrac{A}{2 + 0.015A^{2/3}}$，并求 $A = 56$ 时最稳定的 $Z$。',
    hints: [
      '先算 $A^{1/3}$ 与 $A^{2/3}$：$^{56}\\text{Fe}$ 为 $3.826$ 与 $14.64$，$^{238}\\text{U}$ 为 $6.199$ 与 $38.43$。',
      '五项逐项算出后再求和，注意表面能、库仑能、不对称能都是减项，偶偶核的对能项是加项。',
      '对 $Z$ 求导时把 $A$ 当作常数：$\\dfrac{\\partial B}{\\partial Z} = -a_c\\dfrac{2Z-1}{A^{1/3}} + 4a_a\\dfrac{A-2Z}{A} = 0$，忽略 $1$ 即可解出 $Z$。',
    ],
    solution: [
      {
        title: '$^{56}\\text{Fe}$ 的各项贡献',
        detail: '$^{56}\\text{Fe}$ 为偶偶核，$A^{1/3} = 3.826$、$A^{2/3} = 14.64$：\\n$$a_v A = 15.75\\times 56 = 882.0$$\\n$$a_s A^{2/3} = 17.8\\times 14.64 = 260.6$$\\n$$a_c\\frac{Z(Z-1)}{A^{1/3}} = 0.711\\times\\frac{26\\times 25}{3.826} = 0.711\\times 169.9 = 120.8$$\\n$$a_a\\frac{(A-2Z)^2}{A} = 23.7\\times\\frac{4^2}{56} = 23.7\\times 0.286 = 6.8$$\\n$$\\delta = +34\\times 56^{-3/4} = +1.7$$\\n$$B = 882.0 - 260.6 - 120.8 - 6.8 + 1.7 \\approx 495.5\\,\\text{MeV}$$\\n比结合能 $495.5/56 \\approx 8.85\\,\\text{MeV}$，与实验值 $492.3\\,\\text{MeV}$（$8.79\\,\\text{MeV}$）相比误差约 $0.7\\%$。',
      },
      {
        title: '$^{238}\\text{U}$ 的各项贡献',
        detail: '同样为偶偶核，$A^{1/3} = 6.199$、$A^{2/3} = 38.43$：\\n$$a_v A = 15.75\\times 238 = 3748.5$$\\n$$a_s A^{2/3} = 17.8\\times 38.43 = 684.1$$\\n$$a_c\\frac{Z(Z-1)}{A^{1/3}} = 0.711\\times\\frac{92\\times 91}{6.199} = 0.711\\times 1350.5 = 960.2$$\\n$$a_a\\frac{(A-2Z)^2}{A} = 23.7\\times\\frac{54^2}{238} = 23.7\\times 12.25 = 290.4$$\\n$$\\delta = +34\\times 238^{-3/4} = +0.6$$\\n$$B = 3748.5 - 684.1 - 960.2 - 290.4 + 0.6 \\approx 1814\\,\\text{MeV}$$\\n比结合能 $1814/238 \\approx 7.62\\,\\text{MeV}$（实验值 $7.57\\,\\text{MeV}$）。可见库仑项与不对称项合计约 $1250\\,\\text{MeV}$，几乎抵消了三分之一的体积能，这是重核不稳定的根源。',
      },
      {
        title: 'β 稳定线的推导与数值',
        detail: '固定 $A$ 对 $Z$ 求极值：\\n$$\\frac{\\partial B}{\\partial Z} = -a_c\\frac{2Z-1}{A^{1/3}} + 4a_a\\frac{A-2Z}{A} = 0$$\\n忽略 $2Z$ 中的 $-1$，整理得\\n$$4a_a(A - 2Z) = 2a_c Z A^{2/3}\\ \\Rightarrow\\ 4a_a A = Z\\left(8a_a + 2a_c A^{2/3}\\right)$$\\n$$Z \\approx \\frac{A}{2 + \\dfrac{a_c}{2a_a}A^{2/3}} = \\frac{A}{2 + 0.015A^{2/3}}$$\\n代入 $A = 56$、$A^{2/3} = 14.64$：\\n$$Z \\approx \\frac{56}{2 + 0.015\\times 14.64} = \\frac{56}{2.220} \\approx 25.2$$\\n与稳定核素 $^{56}\\text{Fe}$ 的 $Z = 26$ 接近。公式还显示：随 $A$ 增大，分母变大，$Z/A$ 越来越小于 $1/2$，即重核必须靠更多中子稀释库仑斥力，稳定线偏向中子过剩一侧。',
      },
    ],
    answer: '$^{56}\\text{Fe}$：$B \\approx 495.5\\,\\text{MeV}$（$B/A \\approx 8.85\\,\\text{MeV}$），与实验 $492.3\\,\\text{MeV}$ 相差约 $0.7\\%$；$^{238}\\text{U}$：$B \\approx 1814\\,\\text{MeV}$，$B/A \\approx 7.62\\,\\text{MeV}$；$\\beta$ 稳定线 $Z \\approx A/(2 + 0.015A^{2/3})$，$A = 56$ 时 $Z \\approx 25.2$（实验为 $26$）。',
    tags: ['液滴模型', '半经验质量公式', 'β稳定线'],
  },

  // ─────────────────────── α 衰变能与隧穿半衰期 ───────────────────────
  {
    id: 'nuclear-particle-physics-p3',
    courseId: 'nuclear-particle-physics',
    topicId: 'nuclear-decay',
    title: '$^{238}\\text{U}$ 的 α 衰变能与半衰期估算',
    difficulty: 3,
    question: '$^{238}\\text{U}$ 经 α 衰变变为 $^{234}\\text{Th}$。取原子质量 $M(^{238}\\text{U}) = 238.0508\\,\\text{u}$、$M(^{234}\\text{Th}) = 234.0436\\,\\text{u}$、$M(^{4}\\text{He}) = 4.0026\\,\\text{u}$，$1\\,\\text{u} = 931.5\\,\\text{MeV}/c^2$。(1) 求衰变能 $Q_\\alpha$ 与 α 粒子动能 $E_\\alpha$；(2) 用 Gamow 隧穿估算半衰期：取子核电荷 $Z_D = 90$，$R = 1.2(A_D^{1/3} + 4^{1/3})\\,\\text{fm}$，$\\dfrac{e^2}{4\\pi\\varepsilon_0} = 1.44\\,\\text{MeV}\\cdot\\text{fm}$，$\\hbar c = 197.3\\,\\text{MeV}\\cdot\\text{fm}$，$m_\\alpha c^2 = 3727\\,\\text{MeV}$，并用 $2G = \\dfrac{2}{\\hbar c}\\sqrt{2m_\\alpha c^2 E}\\;b\\left[\\arccos\\sqrt{\\xi} - \\sqrt{\\xi(1-\\xi)}\\right]$，其中 $b = \\dfrac{2Z_D e^2}{4\\pi\\varepsilon_0 E}$、$\\xi = R/b$；(3) 与实验半衰期 $4.47\\times 10^9\\,\\text{a}$ 比较，说明为什么半衰期对 $E_\\alpha$ 极其敏感。',
    hints: [
      'α 衰变是二体衰变，动能按质量反比分配：$E_\\alpha = Q(A-4)/A$，子核反冲动能只有 $4Q/A$。',
      '势垒是 α（电荷 $2e$）与子核（电荷 $Z_D e$）之间的库仑势 $V(r) = 2Z_D e^2/(4\\pi\\varepsilon_0 r)$，因此 $b$ 中带因子 $2$，别忘了。',
      '穿透概率 $P \\approx e^{-2G}$，撞击频率 $\\nu \\approx v/(2R)$，$v = c\\sqrt{2E/(m_\\alpha c^2)}$，于是 $\\lambda = \\nu P$、$T_{1/2} = \\ln 2/\\lambda$。',
    ],
    solution: [
      {
        title: '衰变能与 α 动能',
        detail: '$$Q_\\alpha = \\left[238.0508 - 234.0436 - 4.0026\\right]\\times 931.5 = 0.0046\\times 931.5 \\approx 4.28\\,\\text{MeV}$$\\n动量守恒下动能按质量反比分配：\\n$$E_\\alpha = Q_\\alpha\\frac{A-4}{A} = 4.28\\times\\frac{234}{238} \\approx 4.21\\,\\text{MeV}$$\\n$$E_{\\text{Th}} = Q_\\alpha\\frac{4}{A} = 4.28\\times\\frac{4}{238} \\approx 0.072\\,\\text{MeV}$$\\n实验上 $^{238}\\text{U}$ 放出的正是能量约 $4.20\\,\\text{MeV}$ 的单能 α 粒子，能量分立是二体衰变的特征。',
      },
      {
        title: 'Gamow 因子与穿透概率',
        detail: '先定几何参数：$234^{1/3} \\approx 6.16$、$4^{1/3} \\approx 1.59$，故\\n$$R = 1.2\\times(6.16 + 1.59) \\approx 9.3\\,\\text{fm}$$\\n$$b = \\frac{2Z_D e^2}{4\\pi\\varepsilon_0 E} = \\frac{2\\times 90\\times 1.44}{4.21} \\approx 61.6\\,\\text{fm}$$\\n$$\\xi = \\frac{R}{b} = \\frac{9.3}{61.6} \\approx 0.151$$\\n括号因子：\\n$$\\arccos\\sqrt{0.151} - \\sqrt{0.151\\times 0.849} = \\arccos(0.389) - 0.358 \\approx 1.172 - 0.358 = 0.814$$\\n再算前置因子 $\\sqrt{2m_\\alpha c^2 E} = \\sqrt{2\\times 3727\\times 4.21} \\approx 177\\,\\text{MeV}$：\\n$$2G = \\frac{2\\times 177\\times 61.6}{197.3}\\times 0.814 \\approx 110.6\\times 0.814 \\approx 90.0$$\\n$$P \\approx e^{-2G} = e^{-90.0} \\approx 8\\times 10^{-40}$$',
      },
      {
        title: '半衰期估算与讨论',
        detail: 'α 粒子速度：\\n$$v = c\\sqrt{\\frac{2E}{m_\\alpha c^2}} = c\\sqrt{\\frac{2\\times 4.21}{3727}} \\approx 0.0475\\,c \\approx 1.4\\times 10^7\\,\\text{m/s}$$\\n撞击频率：\\n$$\\nu \\approx \\frac{v}{2R} = \\frac{1.4\\times 10^7}{1.86\\times 10^{-14}} \\approx 7.7\\times 10^{20}\\,\\text{s}^{-1}$$\\n$$\\lambda = \\nu P \\approx 7.7\\times 10^{20}\\times 8\\times 10^{-40} \\approx 6\\times 10^{-19}\\,\\text{s}^{-1}$$\\n$$T_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{6\\times 10^{-19}} \\approx 1.2\\times 10^{18}\\,\\text{s} \\approx 3.5\\times 10^{10}\\,\\text{a}$$\\n实验值为 $4.47\\times 10^9\\,\\text{a}$，估算值偏大不到一个数量级。考虑到势垒内区形状、α 预形成因子等都只作了粗略近似，在半衰期跨越二十多个数量级的背景下已属成功。\\n\\n敏感性说明：$T_{1/2} \\propto e^{2G}$ 而 $2G \\propto 1/\\sqrt{E}$，因此 $E_\\alpha$ 只改变百分之几，就可让半衰期改变数倍；$E_\\alpha$ 从 $4\\,\\text{MeV}$ 升到 $9\\,\\text{MeV}$，半衰期可缩短二十多个数量级，这就是盖革–努塔尔律的由来。',
      },
    ],
    answer: '$Q_\\alpha \\approx 4.28\\,\\text{MeV}$，$E_\\alpha \\approx 4.21\\,\\text{MeV}$（子核反冲 $0.072\\,\\text{MeV}$）；$2G \\approx 90$，$P \\approx 8\\times 10^{-40}$，估算 $T_{1/2} \\sim 10^{10}\\,\\text{a}$，与实测 $4.47\\times 10^9\\,\\text{a}$ 同量级；因 $T_{1/2} \\propto e^{2G}$ 且 $2G \\propto 1/\\sqrt{E_\\alpha}$，半衰期对 α 能量极其敏感。',
    tags: ['α衰变', '库仑势垒', '量子隧穿'],
  },

  // ─────────────────────── 裂变能量释放 ───────────────────────
  {
    id: 'nuclear-particle-physics-p4',
    courseId: 'nuclear-particle-physics',
    topicId: 'nuclear-reactions',
    title: '$^{235}\\text{U}$ 裂变的能量释放与燃料消耗',
    difficulty: 2,
    question: '热中子诱发裂变的一条典型通道为 $n + ^{235}\\text{U} \\to\\, ^{141}\\text{Ba} + ^{92}\\text{Kr} + 3n$。取原子质量 $m_n = 1.008665\\,\\text{u}$、$^{235}\\text{U} = 235.0439\\,\\text{u}$、$^{141}\\text{Ba} = 140.9144\\,\\text{u}$、$^{92}\\text{Kr} = 91.9262\\,\\text{u}$，$1\\,\\text{u} = 931.5\\,\\text{MeV}/c^2$，$1\\,\\text{MeV} = 1.602\\times 10^{-13}\\,\\text{J}$。(1) 求该通道释放的能量 $Q$；(2) 若计及裂变碎片的后续衰变，每次裂变总释能约 $200\\,\\text{MeV}$，求 $1\\,\\text{g}$ $^{235}\\text{U}$ 完全裂变释放的能量，并换算成标准煤（$2.93\\times 10^7\\,\\text{J/kg}$）的质量；(3) 一座电功率 $1\\,\\text{GW}$ 的核电站（取发电效率 $33\\%$）每天消耗多少 $^{235}\\text{U}$？',
    hints: [
      '用原子质量计算时电子数在两端自动抵消：左侧 $92$ 个电子（铀），右侧 $56 + 36 = 92$ 个，正好配平。',
      '$1\\,\\text{g}$ 的核数为 $N = (1/235)\\times 6.022\\times 10^{23}$，总能量 $E = N\\times 200\\,\\text{MeV}$（注意换成焦耳）。',
      '电功率 $1\\,\\text{GW}$ 对应的热功率为 $1\\,\\text{GW}/0.33 \\approx 3\\,\\text{GW}$，再乘以一天的秒数，最后除以每克释放的能量。',
    ],
    solution: [
      {
        title: '裂变通道的 Q 值',
        detail: '初态总质量：\\n$$m_i = 235.0439 + 1.008665 = 236.052565\\,\\text{u}$$\\n末态总质量：\\n$$m_f = 140.9144 + 91.9262 + 3\\times 1.008665 = 235.866595\\,\\text{u}$$\\n$$\\Delta m = 236.052565 - 235.866595 = 0.185970\\,\\text{u}$$\\n$$Q = 0.185970\\times 931.5 \\approx 173.2\\,\\text{MeV}$$\\n这就是瞬发释放的能量（碎片动能约 $168\\,\\text{MeV}$、瞬发中子与 γ 约 $12\\,\\text{MeV}$）；碎片随后经一系列 β 衰变再放出约 $20\\,\\text{MeV}$，故总释能约 $200\\,\\text{MeV}$。',
      },
      {
        title: '1 g 铀的能量与煤当量',
        detail: '$1\\,\\text{g}$ $^{235}\\text{U}$ 的核数：\\n$$N = \\frac{1}{235}\\times 6.022\\times 10^{23} \\approx 2.56\\times 10^{21}$$\\n每次裂变释放 $200\\,\\text{MeV} = 200\\times 1.602\\times 10^{-13}\\,\\text{J} = 3.20\\times 10^{-11}\\,\\text{J}$，故\\n$$E = 2.56\\times 10^{21}\\times 3.20\\times 10^{-11} \\approx 8.2\\times 10^{10}\\,\\text{J}$$\\n折合标准煤：\\n$$m = \\frac{8.2\\times 10^{10}}{2.93\\times 10^7} \\approx 2.8\\times 10^3\\,\\text{kg} \\approx 2.8\\,\\text{t}$$\\n即一克铀相当于近三吨煤，能量密度高出约六个数量级。',
      },
      {
        title: '核电站的燃料消耗',
        detail: '输出电功率 $1\\,\\text{GW}$、效率 $33\\%$，所需热功率\\n$$P_{\\text{th}} = \\frac{1\\,\\text{GW}}{0.33} \\approx 3.03\\,\\text{GW}$$\\n一天需要的热量：\\n$$E_{\\text{day}} = 3.03\\times 10^9\\times 8.64\\times 10^4 \\approx 2.62\\times 10^{14}\\,\\text{J}$$\\n每克 $^{235}\\text{U}$ 释放 $8.2\\times 10^{10}\\,\\text{J}$，故每天消耗\\n$$m = \\frac{2.62\\times 10^{14}}{8.2\\times 10^{10}} \\approx 3.2\\times 10^3\\,\\text{g} \\approx 3.2\\,\\text{kg}$$\\n其中真正裂变的 $^{235}\\text{U}$ 约 $3.2\\,\\text{kg}$；若燃料为低富集铀且燃耗有限，实际装料量要大得多。作为对照，同等功率的燃煤电厂每天要烧掉约 $9000\\,\\text{t}$ 煤，这就是核能能量密度最直观的体现。',
      },
    ],
    answer: '$Q \\approx 173\\,\\text{MeV}$（含碎片衰变总释能约 $200\\,\\text{MeV}$）；$1\\,\\text{g}$ $^{235}\\text{U}$ 完全裂变释放约 $8.2\\times 10^{10}\\,\\text{J}$，相当于约 $2.8\\,\\text{t}$ 标准煤；$1\\,\\text{GW}$（效率 $33\\%$）的核电站每天裂变约 $3.2\\,\\text{kg}$ $^{235}\\text{U}$。',
    tags: ['核裂变', '质量亏损', '能量密度'],
  },

  // ─────────────────────── 反应 Q 值与阈能 ───────────────────────
  {
    id: 'nuclear-particle-physics-p5',
    courseId: 'nuclear-particle-physics',
    topicId: 'nuclear-reactions',
    title: '$^{14}\\text{N}(\\alpha,p)^{17}\\text{O}$ 的 Q 值与阈能',
    difficulty: 3,
    question: '卢瑟福 1919 年实现的第一个人工核转变为 $^{14}\\text{N} + \\alpha \\to\\, ^{17}\\text{O} + p$。取原子质量 $^{14}\\text{N} = 14.003074\\,\\text{u}$、$^{4}\\text{He} = 4.002603\\,\\text{u}$、$^{17}\\text{O} = 16.999132\\,\\text{u}$、$^{1}\\text{H} = 1.007825\\,\\text{u}$，$1\\,\\text{u} = 931.5\\,\\text{MeV}/c^2$。(1) 求反应能 $Q$ 并判断是放能还是吸能反应；(2) 求实验室系（氮靶静止）下该反应的阈能 $E_{\\text{th}}$，并说明为什么它大于 $|Q|$；(3) 用相对论精确式 $E_{\\text{th}} = \\dfrac{[(m_b + M_B)^2 - (m_a + M_A)^2]c^2}{2M_A}$ 复核结果，并说明非相对论近似为何在这里足够好。',
    hints: [
      '$Q = (m_a + M_A - m_b - M_B)c^2$，用原子质量时电子数两端各为 $7 + 2 = 9$ 与 $8 + 1 = 9$，自动配平。',
      '实验室系阈能不是 $|Q|$：末态整体还要带着质心动量运动，这部分动能无法用于支付反应能，故 $E_{\\text{th}} = -Q(1 + m_a/M_A)$。',
      '相对论精确式中的质量都用能量单位（或统一用 u，$c^2$ 换算一次即可），把 $(m_b + M_B)$ 与 $(m_a + M_A)$ 分别平方再相减。',
    ],
    solution: [
      {
        title: '反应能 Q 的计算',
        detail: '初态：\\n$$m_a + M_A = 4.002603 + 14.003074 = 18.005677\\,\\text{u}$$\\n末态：\\n$$m_b + M_B = 16.999132 + 1.007825 = 18.006957\\,\\text{u}$$\\n$$Q = (18.005677 - 18.006957)\\times 931.5 = -0.001280\\times 931.5 \\approx -1.19\\,\\text{MeV}$$\\n$Q < 0$，这是一个吸能反应，必须由入射 α 粒子提供能量才能发生。',
      },
      {
        title: '实验室系阈能',
        detail: '入射粒子带进来的动量无法凭空消失，末态整体必须保持同样的质心运动，这部分动能是"必须支付的过路费"，因此阈能大于 $|Q|$：\\n$$E_{\\text{th}} = -Q\\left(1 + \\frac{m_a}{M_A}\\right) = 1.19\\times\\left(1 + \\frac{4}{14}\\right) = 1.19\\times 1.286 \\approx 1.53\\,\\text{MeV}$$\\n多出的 $1.53 - 1.19 = 0.34\\,\\text{MeV}$ 正是末态质心运动的动能。卢瑟福当年使用的天然 α 源能量约 $5\\sim 7.7\\,\\text{MeV}$，远高于阈能，因此该反应能够被观察到。',
      },
      {
        title: '相对论精确式的复核',
        detail: '把质量统一用 u 表示，能量换算因子为 $931.5\\,\\text{MeV/u}$。先算平方差：\\n$$(m_b + M_B)^2 - (m_a + M_A)^2 = (18.006957 - 18.005677)(18.006957 + 18.005677)$$\\n$$= 0.001280\\times 36.012634 \\approx 0.046096\\,\\text{u}^2$$\\n代入\\n$$E_{\\text{th}} = \\frac{0.046096\\,\\text{u}^2\\times (931.5\\,\\text{MeV/u})^2}{2\\times 14.003074\\,\\text{u}\\times 931.5\\,\\text{MeV/u}} = \\frac{0.046096\\times 931.5}{2\\times 14.003074} \\approx \\frac{42.94}{28.006} \\approx 1.533\\,\\text{MeV}$$\\n与近似式的 $1.534\\,\\text{MeV}$ 相差不到千分之一。原因是这里的 $Q$ 与动能（$\\sim 1.5\\,\\text{MeV}$）都远小于核子的静止能量（$\\sim 4\\,\\text{GeV}$），相对论修正的量级为 $E/(mc^2) \\sim 4\\times 10^{-4}$，完全可以忽略。只有当入射粒子能量接近其静止能量时，才必须使用精确式。',
      },
    ],
    answer: '$Q \\approx -1.19\\,\\text{MeV}$，为吸能反应；实验室系阈能 $E_{\\text{th}} \\approx 1.53\\,\\text{MeV}$（比 $|Q|$ 多出约 $0.34\\,\\text{MeV}$ 的质心运动动能）；相对论精确式给出 $1.533\\,\\text{MeV}$，与非相对论近似一致到千分之一。',
    tags: ['反应能Q值', '阈能', '相对论运动学'],
  },

  // ─────────────────────── 粒子反应守恒律 ───────────────────────
  {
    id: 'nuclear-particle-physics-p6',
    courseId: 'nuclear-particle-physics',
    topicId: 'particle-intro',
    title: '粒子反应的守恒律判断与中微子阈能',
    difficulty: 2,
    question: '(1) 用守恒律判断下列过程能否发生，并说明理由：① $\\bar{\\nu}_e + p \\to n + e^+$；② $p \\to n + e^+ + \\nu_e$（自由质子）；③ $\\pi^0 \\to \\gamma$（单光子）。(2) 求反应 $\\bar{\\nu}_e + p \\to n + e^+$ 的阈能，取 $m_p c^2 = 938.272\\,\\text{MeV}$、$m_n c^2 = 939.565\\,\\text{MeV}$、$m_e c^2 = 0.511\\,\\text{MeV}$。(3) $\\pi^+ \\to \\mu^+ + \\nu_\\mu$ 是二体衰变，取 $m_\\pi = 139.57\\,\\text{MeV}$、$m_\\mu = 105.66\\,\\text{MeV}$，求 μ 子的动能与动量，并写出 $\\pi^+$ 的夸克组成、说明该衰变由哪种相互作用主导。',
    hints: [
      '逐个检查加性量子数：电荷 $Q$、重子数 $B$、轻子数 $L_e$（反中微子 $L_e = -1$、正电子 $L_e = -1$），再看能量条件 $Q_{\\text{反应}} > 0$。',
      '阈能来自相对论不变量：$s \\ge (m_n + m_e)^2c^4$，实验室系（质子静止）$s = m_p^2c^4 + 2m_p c^2 E_\\nu$，解出 $E_{\\nu,\\text{th}} = \\dfrac{(m_n + m_e)^2 - m_p^2}{2m_p}c^2$。',
      '二体衰变中 $E_\\mu = \\dfrac{m_\\pi^2 + m_\\mu^2 - m_\\nu^2}{2m_\\pi}c^2$，$p_\\mu c = \\sqrt{E_\\mu^2 - m_\\mu^2c^4}$；$\\pi^+ = u\\bar{d}$，味改变只能靠弱作用。',
    ],
    solution: [
      {
        title: '三个过程的守恒律判断',
        detail: '① $\\bar{\\nu}_e + p \\to n + e^+$：电荷左 $0 + 1 = 1$、右 $0 + 1 = 1$ ✓；重子数左 $1$、右 $1$ ✓；轻子数左 $L_e = -1$、右 $e^+$ 的 $L_e = -1$ ✓。能量上末态比初态重 $(m_n + m_e - m_p)c^2 = 1.804\\,\\text{MeV}$，只要反中微子能量超过阈能即可发生。这是反应堆中微子探测的基本反应。\\n\\n② $p \\to n + e^+ + \\nu_e$（自由质子）：电荷 $1 \\to 0 + 1 + 0 = 1$ ✓，重子数 $1 \\to 1$ ✓，轻子数 $0 \\to (-1) + (+1) = 0$ ✓，但能量上 $m_p c^2 = 938.272\\,\\text{MeV} < (m_n + m_e)c^2 = 940.076\\,\\text{MeV}$，违反能量守恒，故禁戒。自由质子是稳定的（实验寿命下限 $> 10^{34}\\,\\text{a}$）；但束缚在核内的质子可以发生类似转变，因为核结合能改变了能量账目。\\n\\n③ $\\pi^0 \\to \\gamma$：电荷、重子数、轻子数都守恒，但在 π 静止系中初态动量为零，单个光子却必然携带 $E_\\gamma/c$ 的动量，动量守恒无法满足；同时角动量与 $C$ 宇称也不允许。故单光子衰变禁戒，实际以 $\\pi^0 \\to \\gamma\\gamma$ 为主（分支比约 $98.8\\%$）。',
      },
      {
        title: '反中微子反应的阈能',
        detail: '实验室系中质子静止，$s = (p_\\nu + p_p)^2 = m_p^2 c^4 + 2m_p c^2 E_\\nu$（中微子质量忽略）。阈值条件为末态两粒子在质心系中相对静止，即 $s = (m_n + m_e)^2c^4$：\\n$$E_{\\nu,\\text{th}} = \\frac{(m_n + m_e)^2 - m_p^2}{2m_p}c^2$$\\n$$(m_n + m_e)c^2 = 939.565 + 0.511 = 940.076\\,\\text{MeV}$$\\n$$E_{\\nu,\\text{th}} = \\frac{940.076^2 - 938.272^2}{2\\times 938.272} = \\frac{883743 - 880355}{1876.5} \\approx \\frac{3388}{1876.5} \\approx 1.806\\,\\text{MeV}$$\\n反应堆反中微子的典型能量为几 MeV，高于此阈能，因此可以被探测；实验中还利用"正电子瞬时信号 + 中子俘获延迟信号"的符合来压低本底，这正是 1956 年 Reines–Cowan 首次探测到中微子的方法。',
      },
      {
        title: 'π 介子衰变的能量分配与相互作用类型',
        detail: '在 π 静止系中（$m_\\nu \\approx 0$）：\\n$$E_\\mu = \\frac{m_\\pi^2 + m_\\mu^2}{2m_\\pi}c^2 = \\frac{139.57^2 + 105.66^2}{2\\times 139.57} = \\frac{19480 + 11164}{279.14} \\approx 109.8\\,\\text{MeV}$$\\n$$T_\\mu = E_\\mu - m_\\mu c^2 = 109.8 - 105.66 \\approx 4.14\\,\\text{MeV}$$\\n$$p_\\mu c = \\sqrt{E_\\mu^2 - m_\\mu^2 c^4} = \\sqrt{109.8^2 - 105.66^2} \\approx \\sqrt{12056 - 11164} \\approx 29.8\\,\\text{MeV}$$\\nμ 子能量单值，是二体衰变的特征。\\n\\n夸克组成：$\\pi^+ = u\\bar{d}$，衰变中 $u$ 与 $\\bar{d}$ 湮灭为 $W^+$，再产生 $\\mu^+ \\nu_\\mu$。由于夸克的味发生了改变（$u\\bar{d} \\to \\mu^+\\nu_\\mu$，净奇异数为 $0$ 但涉及弱荷），该过程只能由弱相互作用主导，因此 π 介子的寿命长达 $2.6\\times 10^{-8}\\,\\text{s}$，远长于典型的强衰变时间尺度 $10^{-23}\\,\\text{s}$。',
      },
    ],
    answer: '① 允许（各量子数守恒，需 $E_{\\bar{\\nu}} > 1.806\\,\\text{MeV}$）；② 禁戒（$m_p < m_n + m_e$，违反能量守恒）；③ 禁戒（动量守恒与角动量不允许，实际为 $\\pi^0 \\to \\gamma\\gamma$）。反中微子反应阈能 $E_{\\nu,\\text{th}} \\approx 1.806\\,\\text{MeV}$；$\\pi^+ = u\\bar{d}$ 衰变给出 $T_\\mu \\approx 4.14\\,\\text{MeV}$、$p_\\mu \\approx 29.8\\,\\text{MeV}/c$，由弱相互作用主导。',
    tags: ['守恒律', '中微子探测', 'π介子衰变', '夸克组成'],
  },
];
