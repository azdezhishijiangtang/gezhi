import type { Problem } from '@/types';

export const astrophysicsProblems: Problem[] = [
  // ─────────────────────── 开普勒第三定律求木星质量 ───────────────────────
  {
    id: 'astrophysics-p1',
    courseId: 'astrophysics',
    topicId: 'celestial-mechanics',
    title: '由木卫一轨道测定木星质量',
    difficulty: 2,
    question: '木卫一（Io）绕木星运动的轨道可近似为圆轨道，轨道半径 $a = 4.22\\times 10^{5}\\ \\text{km}$，公转周期 $T = 1.769\\ \\text{d}$。取 $G = 6.674\\times 10^{-11}\\ \\text{N}\\cdot\\text{m}^2\\cdot\\text{kg}^{-2}$，木卫一质量 $m = 8.93\\times 10^{22}\\ \\text{kg}$。求：(1) 木星的质量 $M_J$；(2) 木卫一的轨道速度 $v$；(3) 说明为什么求木星质量时可以放心地忽略木卫一的质量。',
    hints: [
      '圆轨道上引力提供向心力：$\\dfrac{GMm}{a^2} = m\\dfrac{4\\pi^2 a}{T^2}$，整理即得 $M + m = \\dfrac{4\\pi^2 a^3}{GT^2}$。',
      '先把单位换成国际单位：$a = 4.22\\times 10^{8}\\ \\text{m}$，$T = 1.769\\times 86400\\ \\text{s} \\approx 1.528\\times 10^{5}\\ \\text{s}$。',
      '轨道速度由 $v = 2\\pi a/T$ 给出；忽略卫星质量的条件是 $m \\ll M$，直接算比值即可。',
    ],
    solution: [
      {
        title: '由开普勒第三定律求木星质量',
        detail: '对圆轨道，引力全部用于提供向心力：\\n$$\\frac{GMm}{a^2} = m\\omega^2 a = m\\frac{4\\pi^2 a}{T^2}$$\\n消去卫星质量 $m$，得到牛顿修正的开普勒第三定律\\n$$M + m = \\frac{4\\pi^2 a^3}{GT^2}$$\\n代入 $a = 4.22\\times 10^{8}\\ \\text{m}$、$T = 1.769\\times 86400\\ \\text{s} = 1.528\\times 10^{5}\\ \\text{s}$：\\n$$M + m = \\frac{4\\pi^2(4.22\\times 10^{8})^3}{6.674\\times 10^{-11}\\times (1.528\\times 10^{5})^2} = \\frac{39.48\\times 7.52\\times 10^{25}}{1.559} \\approx 1.90\\times 10^{27}\\ \\text{kg}$$\\n故 $M_J \\approx 1.90\\times 10^{27}\\ \\text{kg}$，与公认值 $1.898\\times 10^{27}\\ \\text{kg}$ 相符。',
      },
      {
        title: '木卫一的轨道速度',
        detail: '圆轨道速度由周长除以周期得到：\\n$$v = \\frac{2\\pi a}{T} = \\frac{2\\pi\\times 4.22\\times 10^{8}}{1.528\\times 10^{5}} \\approx 1.74\\times 10^{4}\\ \\text{m/s} = 17.4\\ \\text{km/s}$$\\n也可由 $v = \\sqrt{GM_J/a}$ 校验：$\\sqrt{6.674\\times 10^{-11}\\times 1.90\\times 10^{27}/(4.22\\times 10^{8})} = \\sqrt{3.005\\times 10^{8}} \\approx 1.73\\times 10^{4}\\ \\text{m/s}$，两法一致。',
      },
      {
        title: '为什么可以忽略卫星质量',
        detail: '开普勒第三定律给出的是两体质量之和。木卫一与木星的质量比为\\n$$\\frac{m}{M_J} = \\frac{8.93\\times 10^{22}}{1.90\\times 10^{27}} \\approx 4.7\\times 10^{-5}$$\\n即卫星质量只占木星质量的约二十万分之一，远小于观测与轨道近似（圆轨道、忽略其他卫星扰动）带来的误差。因此 $M + m \\approx M_J$ 是极好的近似。同样的道理，用地球轨道求太阳质量时，地球质量（约 $3\\times 10^{-6}M_\\odot$）也完全可以忽略；但若处理的是两颗质量相当的双星，就必须保留 $m_1 + m_2$ 并另想办法分离出各自的质量。',
      },
    ],
    answer: '$M_J \\approx 1.90\\times 10^{27}\\ \\text{kg}$（约为地球质量的 318 倍）；$v \\approx 17.4\\ \\text{km/s}$；因 $m/M_J \\approx 4.7\\times 10^{-5}$，木卫一质量对 $m_1+m_2$ 的贡献远小于测量误差，可忽略。',
    tags: ['开普勒第三定律', '二体问题', '天体质量测定'],
  },

  // ─────────────────────── 星等与距离模数 ───────────────────────
  {
    id: 'astrophysics-p2',
    courseId: 'astrophysics',
    topicId: 'stellar-observation',
    title: '天狼星的绝对星等与光度',
    difficulty: 1,
    question: '天狼星 A 的视星等 $m_V = -1.46$，三角视差 $\\pi = 0.379$ 角秒（视差 1 角秒对应距离 1 pc，故 $d = 1/\\pi\\ \\text{pc}$）。取太阳的绝对星等 $M_{V,\\odot} = 4.83$。求：(1) 天狼星 A 的距离（pc）与距离模数；(2) 它的绝对星等 $M_V$；(3) 若把它移到 10 pc 处，视星等变为多少？它的光度是太阳的多少倍？',
    hints: [
      '视差与距离互为倒数：$d = 1/\\pi = 1/0.379\\ \\text{pc} \\approx 2.64\\ \\text{pc}$。',
      '距离模数 $m - M = 5\\log_{10}\\dfrac{d}{10\\ \\text{pc}}$，注意这里 $d < 10\\ \\text{pc}$，故距离模数为负。',
      '光度比由星等差给出：$M_{\\text{天狼}} - M_\\odot = -2.5\\log_{10}(L/L_\\odot)$，注意负号与大小关系。',
    ],
    solution: [
      {
        title: '距离与距离模数',
        detail: '由视差定义，$d = 1/\\pi = 1/0.379 \\approx 2.64\\ \\text{pc}$（约 8.6 光年）。距离模数为\\n$$m - M = 5\\log_{10}\\frac{d}{10\\ \\text{pc}} = 5\\log_{10}\\frac{2.64}{10} = 5\\log_{10}0.264 \\approx 5\\times(-0.579) \\approx -2.89$$\\n距离为负的模数说明天狼星比 10 pc 近，看起来比"放到 10 pc 处"更亮，完全合理。',
      },
      {
        title: '绝对星等',
        detail: '由距离模数反解\\n$$M_V = m_V - 5\\log_{10}\\frac{d}{10\\ \\text{pc}} = -1.46 - (-2.89) \\approx 1.43$$\\n即天狼星 A 的绝对星等约为 $1.43$ 等，仍比太阳（$4.83$ 等）亮得多——它是全天最亮的恒星，靠的是既近又亮。',
      },
      {
        title: '移到 10 pc 处的视星等与光度比',
        detail: '绝对星等的定义就是"置于 10 pc 处的视星等"，因此移到 10 pc 后天狼星的视星等即为 $m = M_V \\approx 1.43$ 等（比现在的 $-1.46$ 暗了约 2.9 等，仍为肉眼可见）。\\n光度比由星等差给出：\\n$$M_{\\text{天狼}} - M_\\odot = -2.5\\log_{10}\\frac{L}{L_\\odot}$$\\n$$1.43 - 4.83 = -3.40 = -2.5\\log_{10}\\frac{L}{L_\\odot}$$\\n$$\\log_{10}\\frac{L}{L_\\odot} = 1.36\\quad\\Rightarrow\\quad \\frac{L}{L_\\odot} = 10^{1.36} \\approx 23$$\\n即天狼星 A 的光度约为太阳的 23 倍（实际观测约 25 倍，差别来自 $V$ 波段单色星等与全波段的改正），它是一颗 A1V 型主序星。',
      },
    ],
    answer: '$d \\approx 2.64\\ \\text{pc}$，距离模数 $m-M \\approx -2.89$；$M_V \\approx 1.43$；移到 10 pc 处视星等为 $1.43$ 等，光度约为太阳的 $23$ 倍。',
    tags: ['视星等', '绝对星等', '距离模数'],
  },

  // ─────────────────────── 主序星寿命估算 ───────────────────────
  {
    id: 'astrophysics-p3',
    courseId: 'astrophysics',
    topicId: 'stellar-structure',
    title: '10 倍太阳质量主序星的光度与寿命',
    difficulty: 2,
    question: '主序星的光度与质量满足经验关系 $L/L_\\odot \\approx (M/M_\\odot)^{3.5}$。氢聚变为氦时约有 $0.7\\%$ 的静质量转化为能量，而恒星中大约只有 $10\\%$ 的质量（核心区）参与氢燃烧。取 $M_\\odot = 1.989\\times 10^{30}\\ \\text{kg}$、$L_\\odot = 3.83\\times 10^{26}\\ \\text{W}$、$c = 3.00\\times 10^{8}\\ \\text{m/s}$。对一颗 $M = 10M_\\odot$ 的主序星求：(1) 它的光度（以 $L_\\odot$ 与瓦特表示）；(2) 可用的核能储备与主序寿命 $t_{MS}$；(3) 用标度关系 $t_{MS} \\propto M/L$ 检验结果，并估算一颗 $0.5M_\\odot$ 恒星的寿命。',
    hints: [
      '先由质光关系算光度：$10^{3.5} \\approx 3.16\\times 10^{3}$。',
      '核能储备 $E = 0.007\\times 0.1\\,Mc^2$，寿命 $t_{MS} = E/L$，最后把秒换算成年（$1\\ \\text{yr} \\approx 3.156\\times 10^{7}\\ \\text{s}$）。',
      '由 $t \\propto M/L \\propto M/M^{3.5} = M^{-2.5}$，以太阳的 $10^{10}\\ \\text{yr}$ 为基准直接缩放即可。',
    ],
    solution: [
      {
        title: '光度',
        detail: '由质光关系\\n$$\\frac{L}{L_\\odot} = \\left(\\frac{M}{M_\\odot}\\right)^{3.5} = 10^{3.5} \\approx 3.16\\times 10^{3}$$\\n即光度约为太阳的 3160 倍。换成国际单位\\n$$L = 3.16\\times 10^{3}\\times 3.83\\times 10^{26} \\approx 1.21\\times 10^{30}\\ \\text{W}$$\\n质量增大 10 倍，光度却增大 3000 多倍——这正是大质量恒星寿命极短的原因。',
      },
      {
        title: '核能储备与主序寿命',
        detail: '恒星质量 $M = 10\\times 1.989\\times 10^{30} = 1.989\\times 10^{31}\\ \\text{kg}$。参与氢燃烧的只有约 $10\\%$，聚变效率为 $0.7\\%$，故可用核能为\\n$$E = 0.007\\times 0.1\\times Mc^2 = 7\\times 10^{-4}\\times 1.989\\times 10^{31}\\times (3.00\\times 10^{8})^2 \\approx 1.25\\times 10^{45}\\ \\text{J}$$\\n主序寿命\\n$$t_{MS} = \\frac{E}{L} = \\frac{1.25\\times 10^{45}}{1.21\\times 10^{30}} \\approx 1.03\\times 10^{15}\\ \\text{s} \\approx \\frac{1.03\\times 10^{15}}{3.156\\times 10^{7}} \\approx 3.3\\times 10^{7}\\ \\text{yr}$$\\n即约 3300 万年，仅为太阳主序寿命的三百分之一。',
      },
      {
        title: '标度关系检验与低质量星',
        detail: '由 $t_{MS}\\propto M/L$ 与 $L \\propto M^{3.5}$ 得\\n$$t_{MS} \\propto M^{-2.5}\\quad\\Rightarrow\\quad t_{MS} \\approx 10^{10}\\ \\text{yr}\\left(\\frac{M}{M_\\odot}\\right)^{-2.5}$$\\n对 $10M_\\odot$：$10^{10}\\times 10^{-2.5} = 10^{10}\\times 3.16\\times 10^{-3} \\approx 3.2\\times 10^{7}\\ \\text{yr}$，与逐步计算的结果一致。\\n对 $0.5M_\\odot$：$10^{10}\\times (0.5)^{-2.5} = 10^{10}\\times 2^{2.5} \\approx 10^{10}\\times 5.66 \\approx 5.7\\times 10^{10}\\ \\text{yr}$，即约 570 亿年，远超当前宇宙年龄（138 亿年）。因此所有曾经诞生的、质量小于约 $0.8M_\\odot$ 的恒星今天仍在主序上，我们不可能看到它们的死亡。这也解释了为什么赫罗图主序下段密集着大量暗红的低质量星。',
      },
    ],
    answer: '$L \\approx 3.16\\times 10^{3}L_\\odot \\approx 1.21\\times 10^{30}\\ \\text{W}$；$E \\approx 1.25\\times 10^{45}\\ \\text{J}$，$t_{MS} \\approx 3.3\\times 10^{7}\\ \\text{yr}$；标度检验 $t\\propto M^{-2.5}$ 给出 $3.2\\times 10^{7}\\ \\text{yr}$，$0.5M_\\odot$ 恒星寿命约 $5.7\\times 10^{10}\\ \\text{yr}$。',
    tags: ['主序寿命', '质光关系', '核燃烧'],
  },

  // ─────────────────────── 金斯质量估算 ───────────────────────
  {
    id: 'astrophysics-p4',
    courseId: 'astrophysics',
    topicId: 'interstellar-medium',
    title: '分子云核的金斯质量与坍缩时标',
    difficulty: 3,
    question: '一团分子云的温度 $T = 10\\ \\text{K}$，数密度 $n = 10^{3}\\ \\text{cm}^{-3}$，成分为分子氢（平均分子质量 $\\mu = 2.33$，取等温声速 $c_s = \\sqrt{kT/(\\mu m_H)}$）。取 $m_H = 1.673\\times 10^{-27}\\ \\text{kg}$、$k = 1.381\\times 10^{-23}\\ \\text{J/K}$、$G = 6.674\\times 10^{-11}$、$M_\\odot = 1.989\\times 10^{30}\\ \\text{kg}$。求：(1) 质量密度 $\\rho$ 与声速 $c_s$；(2) 金斯波长 $\\lambda_J = c_s\\sqrt{\\pi/(G\\rho)}$ 与金斯质量 $M_J = \\frac{\\pi}{6}\\rho\\lambda_J^3$（用 $M_\\odot$ 表示）；(3) 自由落体时标 $t_{ff} = \\sqrt{3\\pi/(32G\\rho)}$，并说明结果的物理意义。',
    hints: [
      '先把数密度换成国际单位：$n = 10^{3}\\ \\text{cm}^{-3} = 10^{9}\\ \\text{m}^{-3}$，再用 $\\rho = n\\mu m_H$。',
      '声速注意用等温形式（$\\gamma = 1$）：$c_s = \\sqrt{kT/(\\mu m_H)}$，量级应为 $0.2\\ \\text{km/s}$ 左右。',
      '金斯质量也可直接用 $M_J = \\dfrac{\\pi^{5/2}}{6}\\dfrac{c_s^3}{G^{3/2}\\rho^{1/2}}$ 计算，两式等价，可作验算。',
    ],
    solution: [
      {
        title: '质量密度与声速',
        detail: '数密度 $n = 10^{3}\\ \\text{cm}^{-3} = 10^{9}\\ \\text{m}^{-3}$，故\\n$$\\rho = n\\mu m_H = 10^{9}\\times 2.33\\times 1.673\\times 10^{-27} \\approx 3.90\\times 10^{-18}\\ \\text{kg/m}^3$$\\n（约为 $3.9\\times 10^{-21}\\ \\text{g/cm}^3$，比地球上最好的真空还要稀薄得多）。\\n等温声速：\\n$$c_s = \\sqrt{\\frac{kT}{\\mu m_H}} = \\sqrt{\\frac{1.381\\times 10^{-23}\\times 10}{2.33\\times 1.673\\times 10^{-27}}} = \\sqrt{3.54\\times 10^{4}} \\approx 1.88\\times 10^{2}\\ \\text{m/s} = 0.19\\ \\text{km/s}$$',
      },
      {
        title: '金斯波长与金斯质量',
        detail: '先算金斯波长：\\n$$G\\rho = 6.674\\times 10^{-11}\\times 3.90\\times 10^{-18} \\approx 2.60\\times 10^{-28}\\ \\text{s}^{-2}$$\\n$$\\lambda_J = c_s\\sqrt{\\frac{\\pi}{G\\rho}} = 188\\times\\sqrt{\\frac{3.14}{2.60\\times 10^{-28}}} = 188\\times 1.10\\times 10^{14} \\approx 2.07\\times 10^{16}\\ \\text{m} \\approx 0.67\\ \\text{pc}$$\\n再由 $M_J = \\frac{\\pi}{6}\\rho\\lambda_J^3$：\\n$$M_J = \\frac{\\pi}{6}\\times 3.90\\times 10^{-18}\\times (2.07\\times 10^{16})^3 \\approx 0.524\\times 3.90\\times 10^{-18}\\times 8.87\\times 10^{48} \\approx 1.81\\times 10^{31}\\ \\text{kg}$$\\n$$\\frac{M_J}{M_\\odot} = \\frac{1.81\\times 10^{31}}{1.989\\times 10^{30}} \\approx 9.1$$\\n用等价式 $M_J = \\frac{\\pi^{5/2}}{6}\\frac{c_s^3}{G^{3/2}\\rho^{1/2}} \\approx 2.92\\times\\frac{(188)^3}{(6.674\\times 10^{-11})^{3/2}(3.90\\times 10^{-18})^{1/2}}$ 验算，结果同为约 $1.8\\times 10^{31}\\ \\text{kg}$，即约 $9M_\\odot$。',
      },
      {
        title: '自由落体时标与物理意义',
        detail: '$$t_{ff} = \\sqrt{\\frac{3\\pi}{32G\\rho}} = \\sqrt{\\frac{9.42}{32\\times 2.60\\times 10^{-28}}} = \\sqrt{1.13\\times 10^{27}} \\approx 3.36\\times 10^{13}\\ \\text{s} \\approx 1.1\\times 10^{6}\\ \\text{yr}$$\\n物理意义：在 $T = 10\\ \\text{K}$、$n = 10^{3}\\ \\text{cm}^{-3}$ 的典型分子云核中，尺度大于约 $0.67\\ \\text{pc}$、质量大于约 $9M_\\odot$ 的扰动无法被热压强支撑，会在约一百万年内自行塌缩——这与观测到的分子云核尺度（$0.1\\sim 1\\ \\text{pc}$）和恒星形成时标（百万年量级）高度一致，说明金斯判据抓住了主要物理。还要注意到 $M_J \\propto \\rho^{-1/2}$：随着坍缩进行密度升高，金斯质量不断下降，云块会**分级碎裂**成越来越小的碎块，最终形成恒星团而不是一颗巨型恒星。',
      },
    ],
    answer: '$\\rho \\approx 3.90\\times 10^{-18}\\ \\text{kg/m}^3$，$c_s \\approx 188\\ \\text{m/s}$；$\\lambda_J \\approx 2.07\\times 10^{16}\\ \\text{m} \\approx 0.67\\ \\text{pc}$，$M_J \\approx 1.81\\times 10^{31}\\ \\text{kg} \\approx 9.1M_\\odot$；$t_{ff} \\approx 1.1\\times 10^{6}\\ \\text{yr}$。',
    tags: ['金斯判据', '分子云', '自由落体时标'],
  },

  // ─────────────────────── 史瓦西半径计算 ───────────────────────
  {
    id: 'astrophysics-p5',
    courseId: 'astrophysics',
    topicId: 'compact-objects',
    title: '黑洞的史瓦西半径与角直径',
    difficulty: 2,
    question: '史瓦西半径为 $R_s = \\dfrac{2GM}{c^2} \\approx 2.95\\ \\text{km}\\,(M/M_\\odot)$。取 $M_\\odot = 1.989\\times 10^{30}\\ \\text{kg}$、$G = 6.674\\times 10^{-11}$、$c = 3.00\\times 10^{8}\\ \\text{m/s}$、$1\\ \\text{pc} = 3.086\\times 10^{16}\\ \\text{m}$、$M_\\oplus = 5.97\\times 10^{24}\\ \\text{kg}$。求：(1) 质量为 $10M_\\odot$ 的恒星级黑洞的 $R_s$；(2) 银河系中心黑洞 Sgr A*（$M = 4.3\\times 10^{6}M_\\odot$，距离 $d = 8\\ \\text{kpc}$）的 $R_s$ 及其视界角直径（以微角秒 $\\mu\\text{as}$ 为单位，$1\\ \\text{rad} = 206265\\ \\text{arcsec}$）；(3) 若把地球压缩成黑洞，$R_s$ 多大？',
    hints: [
      '直接用比例式 $R_s = 2.95\\ \\text{km}\\,(M/M_\\odot)$ 最快，也可由 $2GM/c^2$ 逐步验算。',
      '角直径 $\\theta = 2R_s/d$，结果用弧度表示后再乘 $206265\\times 10^{6}$ 换算成微角秒。',
      '地球的情形直接代 $M_\\oplus$，注意结果应在毫米量级——这正说明把日常物体变成黑洞需要压缩到何等程度。',
    ],
    solution: [
      {
        title: '恒星级黑洞',
        detail: '代入 $M = 10M_\\odot$：\\n$$R_s = 2.95\\ \\text{km}\\times 10 = 29.5\\ \\text{km}$$\\n逐步验算：$R_s = \\dfrac{2\\times 6.674\\times 10^{-11}\\times 10\\times 1.989\\times 10^{30}}{(3.00\\times 10^{8})^2} = \\dfrac{2.655\\times 10^{21}}{9.00\\times 10^{16}} \\approx 2.95\\times 10^{4}\\ \\text{m} = 29.5\\ \\text{km}$。\\n即一个质量为太阳十倍的黑洞，其事件视界直径不到 60 km，比一座城市还小。',
      },
      {
        title: 'Sgr A* 的半径与角直径',
        detail: '质量为 $4.3\\times 10^{6}M_\\odot$：\\n$$R_s = 2.95\\ \\text{km}\\times 4.3\\times 10^{6} \\approx 1.27\\times 10^{7}\\ \\text{km}$$\\n约合 $0.085\\ \\text{AU}$，即太阳到地球距离的十二分之一。距离为\\n$$d = 8\\ \\text{kpc} = 8\\times 10^{3}\\times 3.086\\times 10^{16}\\ \\text{m} \\approx 2.47\\times 10^{20}\\ \\text{m}$$\\n角直径（视界直径对应的张角）\\n$$\\theta = \\frac{2R_s}{d} = \\frac{2\\times 1.27\\times 10^{10}\\ \\text{m}}{2.47\\times 10^{20}\\ \\text{m}} \\approx 1.03\\times 10^{-10}\\ \\text{rad}$$\\n$$\\theta = 1.03\\times 10^{-10}\\times 206265\\ \\text{arcsec} \\approx 2.1\\times 10^{-5}\\ \\text{arcsec} \\approx 21\\ \\mu\\text{as}$$\\n事件视界望远镜 2022 年公布的 Sgr A* "阴影"直径约 $52\\ \\mu\\text{as}$，约为视界角直径的 2.5 倍——差别来自强引力透镜对光线的偏折（理论预言阴影直径约为 $2.6\\times 2R_s$），理论与观测高度一致。',
      },
      {
        title: '地球质量黑洞',
        detail: '$$R_s = \\frac{2\\times 6.674\\times 10^{-11}\\times 5.97\\times 10^{24}}{(3.00\\times 10^{8})^2} = \\frac{7.97\\times 10^{14}}{9.00\\times 10^{16}} \\approx 8.9\\times 10^{-3}\\ \\text{m} = 8.9\\ \\text{mm}$$\\n即地球若被压缩到一颗豌豆大小（半径约 9 毫米），就会成为一个黑洞。这说明黑洞并非"质量巨大"的代名词，而是"质量被压缩到其自身史瓦西半径之内"的状态；任何质量的天体在原则上都有对应的史瓦西半径，区别只在于是否真的能把它压到那么小。',
      },
    ],
    answer: '$10M_\\odot$ 黑洞 $R_s \\approx 29.5\\ \\text{km}$；Sgr A* $R_s \\approx 1.27\\times 10^{7}\\ \\text{km}\\ (\\approx 0.085\\ \\text{AU})$，角直径约 $21\\ \\mu\\text{as}$；地球质量黑洞 $R_s \\approx 8.9\\ \\text{mm}$。',
    tags: ['史瓦西半径', '黑洞', '事件视界'],
  },

  // ─────────────────────── 哈勃定律求距离 ───────────────────────
  {
    id: 'astrophysics-p6',
    courseId: 'astrophysics',
    topicId: 'cosmology',
    title: '哈勃定律：由红移求星系距离',
    difficulty: 1,
    question: '取哈勃常量 $H_0 = 70\\ \\text{km}\\cdot\\text{s}^{-1}\\cdot\\text{Mpc}^{-1}$，$c = 3.00\\times 10^{5}\\ \\text{km/s}$，$1\\ \\text{Mpc} = 3.086\\times 10^{19}\\ \\text{km}$。某星系光谱中 H$\\alpha$ 线（静止波长 $\\lambda_0 = 656.3\\ \\text{nm}$）被观测到位于 $\\lambda = 671.7\\ \\text{nm}$。求：(1) 红移 $z$ 与退行速度 $v$（用 $v = cz$），进而求距离 $d$（Mpc）；(2) 若另一个星系距离为 $100\\ \\text{Mpc}$，它的退行速度与红移各是多少；(3) 计算哈勃时间 $1/H_0$，并与宇宙年龄 $138$ 亿年比较，说明二者接近的原因。',
    hints: [
      '红移定义 $z = (\\lambda - \\lambda_0)/\\lambda_0$，小红移下 $v \\approx cz$，再由 $d = v/H_0$ 得距离。',
      '注意单位一致：$v$ 用 km/s，$H_0$ 用 $\\text{km}\\cdot\\text{s}^{-1}\\cdot\\text{Mpc}^{-1}$，商直接给出 Mpc。',
      '哈勃时间 $1/H_0$ 要先把 1 Mpc 换成 km，再除以 70 km/s，最后换算成年。',
    ],
    solution: [
      {
        title: '红移、退行速度与距离',
        detail: '红移\\n$$z = \\frac{\\lambda - \\lambda_0}{\\lambda_0} = \\frac{671.7 - 656.3}{656.3} = \\frac{15.4}{656.3} \\approx 0.0235$$\\n退行速度（$z \\ll 1$，多普勒近似成立）\\n$$v \\approx cz = 3.00\\times 10^{5}\\ \\text{km/s}\\times 0.0235 \\approx 7.04\\times 10^{3}\\ \\text{km/s}$$\\n由哈勃定律 $v = H_0 d$：\\n$$d = \\frac{v}{H_0} = \\frac{7.04\\times 10^{3}}{70}\\ \\text{Mpc} \\approx 101\\ \\text{Mpc}\\ (\\approx 3.3\\times 10^{8}\\ \\text{光年})$$\\n即这颗星系的光在旅途中走了约 3.3 亿年。',
      },
      {
        title: '100 Mpc 处的退行速度与红移',
        detail: '$$v = H_0 d = 70\\times 100 = 7.0\\times 10^{3}\\ \\text{km/s}$$\\n$$z \\approx \\frac{v}{c} = \\frac{7.0\\times 10^{3}}{3.00\\times 10^{5}} \\approx 0.023$$\\n两个星系的红移都在 $0.02$ 量级。这个数值提醒我们：在 $z \\gtrsim 0.1$ 时，线性近似不再可靠，必须使用包含 $\\Omega_m$、$\\Omega_\\Lambda$ 的完整红移—距离关系（对 $H(a)$ 作积分）。',
      },
      {
        title: '哈勃时间与宇宙年龄',
        detail: '$$\\frac{1}{H_0} = \\frac{1\\ \\text{Mpc}}{70\\ \\text{km/s}} = \\frac{3.086\\times 10^{19}\\ \\text{km}}{70\\ \\text{km/s}} \\approx 4.41\\times 10^{17}\\ \\text{s} \\approx \\frac{4.41\\times 10^{17}}{3.156\\times 10^{7}} \\approx 1.40\\times 10^{10}\\ \\text{yr}$$\\n即约 140 亿年，与精确测定的宇宙年龄 138 亿年只差约 $1.5\\%$。这并非偶然：哈勃时间的含义是"若宇宙一直以今天的速率匀速膨胀，回溯到尺度因子为零所需的时间"。在纯物质主导的爱因斯坦—德西特模型中，膨胀被减速，真实年龄只有 $\\frac{2}{3}\\frac{1}{H_0} \\approx 93$ 亿年，甚至比最老的恒星还年轻（这正是当年的"年龄危机"）；而今天的宇宙大约一半时间是物质主导（减速）、近几十亿年被暗能量主导（加速），两种效应恰好相互补偿，使真实年龄非常接近 $1/H_0$。因此这个巧合本身也是 ΛCDM 参数组合的一项一致性检验。',
      },
    ],
    answer: '$z \\approx 0.0235$，$v \\approx 7.04\\times 10^{3}\\ \\text{km/s}$，$d \\approx 101\\ \\text{Mpc}$；$100\\ \\text{Mpc}$ 处 $v = 7.0\\times 10^{3}\\ \\text{km/s}$、$z \\approx 0.023$；$1/H_0 \\approx 1.40\\times 10^{10}\\ \\text{yr}$（约 140 亿年），与宇宙年龄 138 亿年接近。',
    tags: ['哈勃定律', '宇宙学红移', '哈勃时间'],
  },
];
