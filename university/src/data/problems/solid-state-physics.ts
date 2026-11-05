import type { Problem } from '@/types';

export const solid_state_physicsProblems: Problem[] = [
  // ─────────────────────── fcc 结构几何参量 ───────────────────────
  {
    id: 'solid-state-physics-p1',
    courseId: 'solid-state-physics',
    topicId: 'crystal-structure',
    title: 'fcc 结构的原子数、配位数与致密度',
    difficulty: 1,
    question: '铜晶体具有面心立方（fcc）结构，晶胞边长 $a = 0.361\\ \\text{nm}$。求：(1) 一个晶胞内的原子数 $n$ 与配位数；(2) 原子刚球半径 $r$ 与 $a$ 的关系及 $r$ 的数值；(3) fcc 结构的致密度 $\\eta$（原子体积占晶胞体积之比）。',
    hints: [
      'fcc 晶胞中原子位于 8 个顶角与 6 个面心，顶角原子由 8 个晶胞共享、面心原子由 2 个共享。',
      'fcc 中最近邻沿面对角线方向，面对角线长度 $\\sqrt{2}a$ 上恰好排 4 个原子半径。',
      '致密度 $\\eta = n \\times \\dfrac{4}{3}\\pi r^3 / a^3$，把 $r$ 用 $a$ 表示后化简。',
    ],
    solution: [
      {
        title: '晶胞内原子数与配位数',
        detail: '顶角贡献 $8 \\times \\dfrac{1}{8} = 1$ 个，面心贡献 $6 \\times \\dfrac{1}{2} = 3$ 个，合计\\n$$n = 1 + 3 = 4$$\\n每个原子与 12 个最近邻相切（同面 4 个 + 邻面 8 个），配位数为 12，这正是立方密堆积的标志。',
      },
      {
        title: '原子半径',
        detail: '最近邻沿面对角线：$\\sqrt{2}a = 4r$，故\\n$$r = \\frac{\\sqrt{2}}{4}a = \\frac{1.414 \\times 0.361}{4}\\ \\text{nm} \\approx 0.128\\ \\text{nm}$$',
      },
      {
        title: '致密度计算',
        detail: '$$\\eta = \\frac{n \\cdot \\frac{4}{3}\\pi r^3}{a^3} = \\frac{4 \\times \\frac{4}{3}\\pi \\left(\\frac{\\sqrt{2}}{4}a\\right)^3}{a^3} = \\frac{16\\pi}{3} \\cdot \\frac{2\\sqrt{2}}{64} = \\frac{\\sqrt{2}\\,\\pi}{6} \\approx 0.74$$\\n即 74% 的空间被原子占据，是刚球堆积的理论极限（hcp 同为 0.74）。',
      },
    ],
    answer: '$n = 4$，配位数 12；$r = \\sqrt{2}a/4 \\approx 0.128\\ \\text{nm}$；致密度 $\\eta = \\sqrt{2}\\pi/6 \\approx 0.74$。',
    tags: ['晶格结构', '面心立方', '致密度'],
  },

  // ─────────────────────── 布拉格衍射 ───────────────────────
  {
    id: 'solid-state-physics-p2',
    courseId: 'solid-state-physics',
    topicId: 'reciprocal-diffraction',
    title: '立方晶体的布拉格衍射角与结构判别',
    difficulty: 2,
    question: '用波长 $\\lambda = 0.1542\\ \\text{nm}$ 的铜 $K_\\alpha$ 线照射某立方晶系晶体（$a = 0.361\\ \\text{nm}$）。求：(1) $(110)$ 面的一级与二级布拉格衍射角 $\\theta_1$、$\\theta_2$；(2) 若实验发现 $(100)$、$(110)$、$(210)$ 等峰全部消失而 $(111)$、$(200)$、$(220)$ 出现，判断该晶体属于 bcc 还是 fcc，并说明理由。',
    hints: [
      '立方晶系晶面间距 $d_{hkl} = a/\\sqrt{h^2+k^2+l^2}$，先求 $d_{110}$。',
      '布拉格方程 $2d\\sin\\theta = n\\lambda$，二级衍射即 $n = 2$。',
      'bcc 消光条件为 $h+k+l$ 为奇数，fcc 消光条件为 $h,k,l$ 奇偶混杂，用结构因子 $F = \\sum_j f_j e^{2\\pi i(hx_j+ky_j+lz_j)}$ 验证。',
    ],
    solution: [
      {
        title: '求 (110) 面间距',
        detail: '$$d_{110} = \\frac{a}{\\sqrt{1^2 + 1^2}} = \\frac{0.361}{\\sqrt{2}} \\approx 0.2553\\ \\text{nm}$$',
      },
      {
        title: '一级与二级衍射角',
        detail: '一级（$n = 1$）：\\n$$\\sin\\theta_1 = \\frac{\\lambda}{2d} = \\frac{0.1542}{2 \\times 0.2553} \\approx 0.302 \\quad\\Rightarrow\\quad \\theta_1 \\approx 17.6^\\circ$$\\n二级（$n = 2$）：\\n$$\\sin\\theta_2 = \\frac{2\\lambda}{2d} = 0.604 \\quad\\Rightarrow\\quad \\theta_2 \\approx 37.2^\\circ$$',
      },
      {
        title: '由消光规律判别结构',
        detail: '消失的峰 $(100),(110),(210)$ 均满足 $h+k+l$ 为偶数或奇偶混杂？逐一检验：$1+0+0=1$（奇）、$1+1+0=2$（偶）、$2+1+0=3$（奇）——消失峰中奇偶都有。再看出现的峰 $(111),(200),(220)$：$h,k,l$ 全奇或全偶。这正是 fcc 的衍射规律：$F = f[1 + e^{\\pi i(h+k)} + e^{\\pi i(h+l)} + e^{\\pi i(k+l)}]$，当 $h,k,l$ 奇偶混杂时 $F = 0$，发生消光；若为 bcc，则 $h+k+l$ 为偶数的 $(110),(200),(220)$ 应当出现，与实验矛盾。故该晶体为 fcc 结构（$a = 0.361\\ \\text{nm}$ 正是铜的晶格常量）。',
      },
    ],
    answer: '$\\theta_1 \\approx 17.6^\\circ$，$\\theta_2 \\approx 37.2^\\circ$；奇偶混杂指数的峰全部消失、全奇全偶峰出现，为 fcc 结构的特征消光规律。',
    tags: ['布拉格方程', '晶面间距', '结构因子'],
  },

  // ─────────────────────── 一维双原子链色散关系 ───────────────────────
  {
    id: 'solid-state-physics-p3',
    courseId: 'solid-state-physics',
    topicId: 'lattice-vibrations',
    title: '一维双原子链的色散关系与声学支、光学支',
    difficulty: 3,
    question: '一维原子链由质量 $M$ 与 $m$（$M > m$）的原子交替排列而成，相邻原子间距为 $a$（原胞长度 $2a$），最近邻弹性系数为 $\\beta$。(1) 建立运动方程并导出色散关系 $\\omega^2_\\pm(k)$；(2) 求 $k \\to 0$ 时两支的频率并说明声学支与光学支的物理含义；(3) 求布里渊区边界 $k = \\pi/2a$ 处两支频率，说明频率禁隙的存在。',
    hints: [
      '设两类原子位移分别为 $\\mu_n$ 与 $v_n$，写出各自的牛顿方程，代入 $\\mu_n = A e^{i(2nk a - \\omega t)}$、$v_n = B e^{i(2nk a - \\omega t)}$（以第 $n$ 个原胞中质量 $M$ 的原子为参考）。',
      '得到关于 $A$、$B$ 的线性齐次方程组，非零解条件是系数行列式为零。',
      '分别取 $k \\to 0$ 与 $k = \\pi/2a$ 的极限，注意 $\\cos(2ka)$ 在两处的取值。',
    ],
    solution: [
      {
        title: '建立运动方程并导出色散关系',
        detail: '质量 $M$ 的原子受两侧 $m$ 原子作用：\\n$$M\\ddot{\\mu}_n = \\beta(v_n + v_{n-1} - 2\\mu_n)$$\\n质量 $m$ 的原子：\\n$$m\\ddot{v}_n = \\beta(\\mu_n + \\mu_{n+1} - 2v_n)$$\\n代入试解 $\\mu_n = Ae^{i(2nka - \\omega t)}$，$v_n = Be^{i(2nka - \\omega t)}$：\\n$$(2\\beta - M\\omega^2)A - \\beta(1 + e^{-2ika})B = 0$$\\n$$-\\beta(1 + e^{2ika})A + (2\\beta - m\\omega^2)B = 0$$\\n非零解要求行列式为零：\\n$$(2\\beta - M\\omega^2)(2\\beta - m\\omega^2) - \\beta^2|1 + e^{2ika}|^2 = 0$$\\n利用 $|1 + e^{2ika}|^2 = 4\\cos^2 ka$，解得\\n$$\\omega^2_\\pm = \\frac{\\beta(M+m)}{Mm} \\pm \\frac{\\beta}{Mm}\\sqrt{M^2 + m^2 + 2Mm\\cos(2ka)}$$',
      },
      {
        title: '长波极限与两支的物理含义',
        detail: '$k \\to 0$ 时 $\\cos(2ka) \\to 1$，根式趋于 $M + m$：\\n$$\\omega^2_- \\to 0\\ (\\text{声学支}), \\qquad \\omega^2_+ \\to \\frac{2\\beta(M+m)}{Mm} = 2\\beta\\left(\\frac{1}{m} + \\frac{1}{M}\\right)\\ (\\text{光学支})$$\\n声学支中 $A \\approx B$，同一原胞内两种原子同相振动、原胞质心整体运动，长波下就是弹性波；光学支中 $mA + MB = 0$，两种原子反相振动、质心不动，离子晶体中产生振荡电偶极矩而可与红外光耦合，故名光学支。',
      },
      {
        title: '布里渊区边界与频率禁隙',
        detail: '$k = \\pi/2a$ 时 $\\cos(2ka) = \\cos\\pi = -1$，根式趋于 $|M - m| = M - m$：\\n$$\\omega^2_+ = \\frac{\\beta[(M+m) + (M-m)]}{Mm} = \\frac{2\\beta}{m}, \\qquad \\omega^2_- = \\frac{\\beta[(M+m) - (M-m)]}{Mm} = \\frac{2\\beta}{M}$$\\n轻原子单独振动给出高频光学支、重原子单独振动给出低频声学支。两支之间夹着宽度为 $\\sqrt{2\\beta/m} - \\sqrt{2\\beta/M} > 0$ 的频率禁隙：在此频段内 $\\omega^2$ 无实数 $k$ 解，格波不能传播，入射波将被布拉格反射——这与电子能带中的禁带完全类似。',
      },
    ],
    answer: '$\\omega^2_\\pm = \\dfrac{\\beta(M+m)}{Mm} \\pm \\dfrac{\\beta}{Mm}\\sqrt{M^2 + m^2 + 2Mm\\cos(2ka)}$；$k \\to 0$ 时声学支 $\\omega_- \\to 0$（原胞同相整体振动）、光学支 $\\omega_+ \\to \\sqrt{2\\beta(1/m + 1/M)}$（反相振动）；区边界 $\\omega_+ = \\sqrt{2\\beta/m}$、$\\omega_- = \\sqrt{2\\beta/M}$，两支之间存在频率禁隙。',
    tags: ['晶格振动', '色散关系', '声学支', '光学支'],
  },

  // ─────────────────────── 金属费米参数 ───────────────────────
  {
    id: 'solid-state-physics-p4',
    courseId: 'solid-state-physics',
    topicId: 'free-electron',
    title: '铜的费米能、费米速度与电子热容',
    difficulty: 2,
    question: '把铜的价电子视为自由电子气。已知铜的密度 $\\rho = 8.96\\ \\text{g/cm}^3$、摩尔质量 $M = 63.5\\ \\text{g/mol}$、每个原子贡献 1 个传导电子，取 $\\hbar^2/2m = 3.81\\ \\text{eV}\\cdot\\text{Å}^2$，$k_B = 8.617\\times10^{-5}\\ \\text{eV/K}$。求：(1) 电子数密度 $n$；(2) 费米波矢 $k_F$、费米能 $E_F$ 与费米温度 $T_F$；(3) 费米速度 $v_F$；(4) 说明室温下电子热容远小于晶格热容的原因并写出 $C_V$ 的表达式。',
    hints: [
      '$n = \\rho N_A / M$，注意单位换算成 $\\text{m}^{-3}$。',
      '$k_F = (3\\pi^2 n)^{1/3}$，$E_F = \\hbar^2 k_F^2 / 2m$。',
      '泡利原理决定了只有费米面附近约 $k_BT$ 能壳内的电子能被热激发。',
    ],
    solution: [
      {
        title: '电子数密度',
        detail: '$$n = \\frac{\\rho N_A}{M} = \\frac{8.96\\ \\text{g/cm}^3 \\times 6.022\\times10^{23}\\ \\text{mol}^{-1}}{63.5\\ \\text{g/mol}} \\approx 8.5\\times10^{22}\\ \\text{cm}^{-3} = 8.5\\times10^{28}\\ \\text{m}^{-3}$$',
      },
      {
        title: '费米波矢、费米能与费米温度',
        detail: '$$k_F = (3\\pi^2 n)^{1/3} = (3 \\times 9.87 \\times 8.5\\times10^{28})^{1/3} \\approx (2.52\\times10^{30})^{1/3} \\approx 1.36\\times10^{10}\\ \\text{m}^{-1}$$\\n$$E_F = \\frac{\\hbar^2 k_F^2}{2m} = 3.81\\ \\text{eV}\\cdot\\text{Å}^2 \\times (1.36\\times10^{10}\\ \\text{m}^{-1})^2 = 3.81 \\times 1.85\\ \\text{eV} \\approx 7.0\\ \\text{eV}$$\\n（$k_F^2 = 1.85\\times10^{20}\\ \\text{m}^{-2} = 1.85\\ \\text{Å}^{-2}$。）\\n$$T_F = \\frac{E_F}{k_B} = \\frac{7.0}{8.617\\times10^{-5}} \\approx 8.1\\times10^4\\ \\text{K}$$',
      },
      {
        title: '费米速度',
        detail: '$$v_F = \\frac{\\hbar k_F}{m} = \\frac{1.055\\times10^{-34} \\times 1.36\\times10^{10}}{9.11\\times10^{-31}} \\approx 1.57\\times10^6\\ \\text{m/s}$$\\n约为声速的 4.5 倍，非相对论处理合理。',
      },
      {
        title: '电子热容',
        detail: '室温 $T \\approx 300\\ \\text{K}$ 时 $T/T_F \\approx 0.004$，费米海中绝大多数电子周围的态已被占满，泡利原理使其无法吸收 $k_BT$ 量级的能量；只有费米面附近薄壳（比例约 $T/T_F$）内的电子参与热激发。因此\\n$$C_V = \\frac{\\pi^2}{2}Nk_B\\frac{T}{T_F} = \\frac{\\pi^2 N k_B^2}{2E_F}\\,T \\equiv \\gamma T$$\\n室温下铜电子热容约 $0.2\\ \\text{J/(mol·K)}$，不足晶格热容 $3R \\approx 24.9\\ \\text{J/(mol·K)}$ 的百分之一。',
      },
    ],
    answer: '$n \\approx 8.5\\times10^{28}\\ \\text{m}^{-3}$；$k_F \\approx 1.36\\times10^{10}\\ \\text{m}^{-1}$，$E_F \\approx 7.0\\ \\text{eV}$，$T_F \\approx 8.1\\times10^4\\ \\text{K}$；$v_F \\approx 1.57\\times10^6\\ \\text{m/s}$；$C_V = \\gamma T$，$\\gamma = \\pi^2 Nk_B^2/2E_F$，室温下仅为经典值的约 $T/T_F \\approx 0.4\\%$。',
    tags: ['自由电子气', '费米能', '电子热容'],
  },

  // ─────────────────────── 霍尔效应与载流子 ───────────────────────
  {
    id: 'solid-state-physics-p5',
    courseId: 'solid-state-physics',
    topicId: 'semiconductors',
    title: 'n 型硅霍尔系数与霍尔电压的计算',
    difficulty: 2,
    question: '某 n 型硅样品掺磷浓度 $N_d = 1.0\\times10^{21}\\ \\text{m}^{-3}$（室温杂质全电离），制成厚 $d = 0.5\\ \\text{mm}$ 的薄片，沿 $x$ 向通电流 $I = 10\\ \\text{mA}$，垂直于薄片加磁场 $B = 0.5\\ \\text{T}$。取 $e = 1.602\\times10^{-19}\\ \\text{C}$。求：(1) 霍尔系数 $R_H$ 及其符号；(2) 霍尔电压 $U_H$ 的大小；(3) 若改用同样浓度的 p 型样品，$U_H$ 有何变化？由此说明霍尔效应为何能判定载流子类型。',
    hints: [
      '杂质全电离时 $n \\approx N_d$，霍尔系数 $R_H = -1/(ne)$。',
      '$U_H = R_H I B / d$，注意统一为国际单位制。',
      '空穴浓度 $p \\approx N_a$ 时 $R_H = +1/(pe)$，符号相反。',
    ],
    solution: [
      {
        title: '霍尔系数',
        detail: '室温下磷施主能级（约 $0.045\\ \\text{eV}$）全电离，$n \\approx N_d = 1.0\\times10^{21}\\ \\text{m}^{-3}$：\\n$$R_H = -\\frac{1}{ne} = -\\frac{1}{1.0\\times10^{21} \\times 1.602\\times10^{-19}} \\approx -6.24\\times10^{-3}\\ \\text{m}^3/\\text{C}$$\\n负号表示载流子为电子。',
      },
      {
        title: '霍尔电压',
        detail: '$$U_H = \\frac{R_H I B}{d} = \\frac{6.24\\times10^{-3} \\times 10\\times10^{-3} \\times 0.5}{0.5\\times10^{-3}}\\ \\text{V} \\approx 6.2\\times10^{-2}\\ \\text{V} = 62\\ \\text{mV}$$\\n（取绝对值；极性由载流子符号决定。）这样的毫伏级电压用普通电压表即可测量，实验上十分友好。',
      },
      {
        title: 'p 型样品与载流子类型的判定',
        detail: 'p 型样品中 $p \\approx N_a$，$R_H = +1/(pe) \\approx +6.24\\times10^{-3}\\ \\text{m}^3/\\text{C}$，霍尔电压大小相同、极性相反。实验中只要测出 $U_H$ 的符号，即可唯一确定多数载流子是电子还是空穴；由 $|U_H|$ 还可进一步给出浓度 $n = IB/(eU_H d)$，配合电导率测量可得迁移率 $\\mu = |R_H|\\sigma$。一次测量同时得到载流子符号、浓度与迁移率，这正是霍尔效应成为半导体标准诊断手段的原因。',
      },
    ],
    answer: '$R_H \\approx -6.24\\times10^{-3}\\ \\text{m}^3/\\text{C}$（负号，电子导电）；$U_H \\approx 62\\ \\text{mV}$；p 型样品电压大小不变、极性相反——霍尔电压的符号直接判定载流子类型，大小给出浓度。',
    tags: ['霍尔效应', '载流子浓度', 'n 型半导体'],
  },

  // ─────────────────────── 顺磁居里定律 ───────────────────────
  {
    id: 'solid-state-physics-p6',
    courseId: 'solid-state-physics',
    topicId: 'magnetism-superconductivity',
    title: '顺磁盐的居里定律与居里-外斯修正',
    difficulty: 3,
    question: '某顺磁盐每立方米含 $N = 1.0\\times10^{28}$ 个磁矩为 $\\mu = \\mu_B$（$\\mu_B = 9.274\\times10^{-24}\\ \\text{J/T}$）的离子。求：(1) 居里常数 $C$ 与室温（$300\\ \\text{K}$）磁化率 $\\chi$；(2) $T = 4.2\\ \\text{K}$ 时的 $\\chi$ 以及 $B = 1\\ \\text{T}$ 磁场下的磁化强度 $M$（取 $H \\approx B/\\mu_0$，$\\mu_0 = 4\\pi\\times10^{-7}\\ \\text{H/m}$，$k_B = 1.381\\times10^{-23}\\ \\text{J/K}$），并检验居里定律的适用条件 $\\mu B \\ll k_BT$ 是否满足；(3) 若材料在 $T_C = 100\\ \\text{K}$ 以下转变为铁磁体，写出 $T > T_C$ 时磁化率应改用的公式并说明交换作用与 $T_C$ 的关系。',
    hints: [
      '居里定律 $\\chi = C/T$，$C = \\mu_0 N\\mu^2/3k_B$。',
      '$M = \\chi H$，$H = B/\\mu_0$；比较 $\\mu B$ 与 $k_BT$ 判断磁矩是否远未饱和。',
      '居里-外斯定律 $\\chi = C/(T - T_C)$，$k_BT_C$ 度量交换作用强度。',
    ],
    solution: [
      {
        title: '居里常数与室温磁化率',
        detail: '$$C = \\frac{\\mu_0 N\\mu^2}{3k_B} = \\frac{4\\pi\\times10^{-7} \\times 1.0\\times10^{28} \\times (9.274\\times10^{-24})^2}{3 \\times 1.381\\times10^{-23}}$$\\n分子 $= 1.2566\\times10^{-6} \\times 8.60\\times10^{-47} = 1.081\\times10^{-52}$，故\\n$$C \\approx \\frac{1.081\\times10^{-52}}{4.143\\times10^{-23}} \\approx 2.6\\times10^{-2}\\ \\text{K}$$\\n$$\\chi(300\\ \\text{K}) = \\frac{C}{T} = \\frac{0.026}{300} \\approx 8.7\\times10^{-5}$$\\n顺磁磁化率微小且与温度成反比，与实验一致。',
      },
      {
        title: '低温磁化率与磁化强度',
        detail: '$$\\chi(4.2\\ \\text{K}) = \\frac{0.026}{4.2} \\approx 6.2\\times10^{-3}$$\\n$$M = \\chi H = \\chi\\frac{B}{\\mu_0} = 6.2\\times10^{-3} \\times \\frac{1}{4\\pi\\times10^{-7}} \\approx 4.9\\times10^{3}\\ \\text{A/m}$$\\n适用条件检验：$\\mu B = 9.274\\times10^{-24}\\ \\text{J/T} \\times 1\\ \\text{T} = 9.27\\times10^{-24}\\ \\text{J}$，而 $k_BT = 1.381\\times10^{-23} \\times 4.2 \\approx 5.8\\times10^{-23}\\ \\text{J}$，比值 $\\mu B/k_BT \\approx 0.16 \\ll 1$，磁矩远未饱和，居里定律适用（若低温强场下比值趋近 1，则需用完整的朗之万函数 $L(x) = \\coth x - 1/x$）。',
      },
      {
        title: '居里-外斯定律与交换作用',
        detail: '$T < T_C$ 时材料自发磁化，$T > T_C$ 后磁序虽已瓦解但交换作用仍使自旋关联增强，磁化率改用居里-外斯定律：\\n$$\\chi = \\frac{C}{T - T_C}$$\\n接近 $T_C$ 时 $\\chi$ 发散，反映磁相变（二级相变）的临界行为。平均场理论给出 $k_BT_C \\approx \\dfrac{2JzS(S+1)}{3k_B}$ 量级（$J$ 为交换积分、$z$ 为近邻数），即 $T_C$ 直接度量交换作用强度——铁的 $T_C \\approx 1043\\ \\text{K}$ 对应交换能约 $0.1\\ \\text{eV}$，远大于磁偶极相互作用（约 $10^{-4}\\ \\text{eV}$），说明铁磁性本质上是量子交换效应。',
      },
    ],
    answer: '$C \\approx 0.026\\ \\text{K}$；$\\chi(300\\ \\text{K}) \\approx 8.7\\times10^{-5}$；$\\chi(4.2\\ \\text{K}) \\approx 6.2\\times10^{-3}$，$M \\approx 4.9\\times10^{3}\\ \\text{A/m}$，且 $\\mu B/k_BT \\approx 0.16 \\ll 1$ 居里定律成立；$T > T_C$ 时用 $\\chi = C/(T - T_C)$，$T_C$ 由交换作用强度决定。',
    tags: ['顺磁性', '居里定律', '交换作用', '居里温度'],
  },

  // ─────────────────────── 近自由电子与紧束缚 ───────────────────────
  {
    id: 'solid-state-physics-p7',
    courseId: 'solid-state-physics',
    topicId: 'band-theory',
    title: '近自由电子的禁带宽度与紧束缚能带的带宽、有效质量',
    difficulty: 3,
    question: '一维晶体晶格常数 $a = 0.5\\ \\text{nm}$，周期势可写成 $V(x) = 2V_1\\cos(2\\pi x/a)$，取 $V_1 = 0.75\\ \\text{eV}$。(1) 用近自由电子近似求第一布里渊区边界 $k = \\pi/a$ 处自由电子的动能、打开的第一禁带宽度 $E_g$ 以及上下两支的能量；(2) 若改用紧束缚近似描述同一晶体的三维简立方 $s$ 带，$E(\\vec{k}) = E_0 - 2J(\\cos k_xa + \\cos k_ya + \\cos k_za)$，取最近邻交叠积分 $J = 0.40\\ \\text{eV}$，求带宽 $W$ 与带底有效质量 $m^*$；(3) 若每原胞贡献 2 个电子，判断该晶体是导体还是半导体，并说明两种极限近似各自的适用对象。',
    hints: [
      '近自由电子近似中，布里渊区边界 $k = G/2$ 处的两个简并平面波被周期势的傅里叶分量 $V_G$ 劈裂，本例中 $V_G = V_1$，禁带 $E_g = 2|V_G|$。',
      '紧束缚简立方 $s$ 带带宽 $W = 12|J|$；带底附近把 $\\cos k_ia \\approx 1 - k_i^2a^2/2$ 展开，再与 $\\hbar^2k^2/2m^*$ 对比即得 $m^* = \\hbar^2/(2Ja^2)$。',
      '一条能带可容纳 $2N$ 个电子（$N$ 个 $k$ 值 $\\times$ 自旋 2）；满带不导电，禁带约 1 eV 量级者为半导体。',
    ],
    solution: [
      {
        title: '区边界动能与禁带宽度',
        detail: '倒格矢 $G = 2\\pi/a = 2\\pi/(5.0\\times10^{-10}) = 1.257\\times10^{10}\\ \\text{m}^{-1}$，区边界 $k = G/2 = \\pi/a = 6.28\\times10^9\\ \\text{m}^{-1}$。该处自由电子动能\\n$$E_0 = \\frac{\\hbar^2}{2m}\\left(\\frac{\\pi}{a}\\right)^2 = \\frac{(1.055\\times10^{-34})^2(6.28\\times10^9)^2}{2\\times9.11\\times10^{-31}} = 2.41\\times10^{-19}\\ \\text{J} = 1.51\\ \\text{eV}$$\\n周期势的傅里叶分量 $V_G = V_1 = 0.75\\ \\text{eV}$ 把简并态劈裂为 $E_\\pm = E_0 \\pm |V_G|$，故\\n$$E_g = 2|V_1| = 1.5\\ \\text{eV}$$\\n$$E_- = 1.51 - 0.75 = 0.76\\ \\text{eV}, \\qquad E_+ = 1.51 + 0.75 = 2.26\\ \\text{eV}$$\\n注意禁带宽度与自由电子动能同量级：周期势虽"弱"，但在简并点上是共振作用，其效果绝不是小修正。',
      },
      {
        title: '紧束缚带宽与带底有效质量',
        detail: '带宽\\n$$W = 12|J| = 12\\times0.40 = 4.8\\ \\text{eV}$$\\n带底位于 $\\vec{k} = 0$。在此附近把 $\\cos k_ia \\approx 1 - k_i^2a^2/2$ 代入：\\n$$E \\approx E_0 - 2J\\left(3 - \\frac{a^2}{2}(k_x^2 + k_y^2 + k_z^2)\\right) = E_0 - 6J + Ja^2k^2$$\\n与自由粒子形式 $E = E_{\\text{底}} + \\hbar^2k^2/2m^*$ 对比，得 $\\hbar^2/2m^* = Ja^2$，即\\n$$m^* = \\frac{\\hbar^2}{2Ja^2} = \\frac{(1.055\\times10^{-34})^2}{2\\times0.40\\times1.602\\times10^{-19}\\times(5.0\\times10^{-10})^2} = 3.47\\times10^{-31}\\ \\text{kg} \\approx 0.38m$$\\n顺便校验带宽与有效质量的相容性：$W = 6\\hbar^2/(m^*a^2) = 6\\times1.113\\times10^{-68}/(3.47\\times10^{-31}\\times2.5\\times10^{-19}) = 4.8\\ \\text{eV}$，与直接结果一致。',
      },
      {
        title: '导电性判别与两种近似的适用对象',
        detail: '一条能带有 $N$ 个 $k$ 值、每个 $k$ 态容纳 2 个自旋，共 $2N$ 个态。每原胞 2 个电子恰有 $2N$ 个电子，恰好填满该能带——满带中电子速度正负对称抵消，不导电。加上禁带 $E_g = 1.5\\ \\text{eV}$ 属半导体量级，故该晶体为半导体。\\n两种极限近似的适用对象：近自由电子图像适合周期势浅、外层电子巡游的金属（如碱金属），其能带宽、有效质量接近自由电子质量；紧束缚图像适合轨道局域、交叠积分小的窄带体系（过渡金属 d 带、绝缘体与半导体的价带），交叠越弱则 $J$ 越小、带越窄、有效质量越大。真实材料的能带位于两极之间，理解两个极限才能读懂任何一张能带图。',
      },
    ],
    answer: '$E_0 \\approx 1.51\\ \\text{eV}$，$E_g = 2|V_1| = 1.5\\ \\text{eV}$（$E_- \\approx 0.76\\ \\text{eV}$、$E_+ \\approx 2.26\\ \\text{eV}$）；$W = 12|J| = 4.8\\ \\text{eV}$，$m^* = \\hbar^2/(2Ja^2) \\approx 3.47\\times10^{-31}\\ \\text{kg} \\approx 0.38m$；每原胞 2 个电子恰好填满该带，晶体为禁带 1.5 eV 的半导体。',
    tags: ['近自由电子近似', '紧束缚近似', '能带', '有效质量'],
  },
];
