import type { Problem } from '@/types';

export const electromagnetismProblems: Problem[] = [
  // ─────────────────────── 第一章 库仑定律与电场强度 ───────────────────────
  {
    id: 'electromagnetism-p1',
    courseId: 'electromagnetism',
    topicId: 'electrostatics',
    title: '两等量异号电荷中垂线上场强的叠加',
    difficulty: 1,
    question: '电荷量均为 $Q=2.0\\times10^{-8}\\ \\text{C}$ 的一对异号点电荷相距 $d=4.0\\ \\text{cm}$，构成电偶极子。求其中垂线上距中心 $r=3.0\\ \\text{cm}$ 处 $P$ 点的电场强度大小与方向。真空介电常数取 $\\varepsilon_0=8.85\\times10^{-12}\\ \\text{C}^2/(\\text{N}\\cdot\\text{m}^2)$。',
    hints: [
      '分别计算两个电荷在 $P$ 点产生的电场强度，注意正负电荷方向不同。',
      '由对称性，两电场沿连线方向的分量相互抵消，垂直分量叠加。',
      '当 $r\\gg d$ 时结果应退化为偶极子中垂场公式 $E=\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p}{r^3}$。',
    ],
    solution: [
      {
        title: '几何关系',
        detail: '中点 $O$ 到每个电荷的距离为 $a=d/2=0.020\\ \\text{m}$；$P$ 到每个电荷的距离 $R=\\sqrt{r^2+a^2}=\\sqrt{0.03^2+0.02^2}=\\sqrt{0.0013}\\approx 0.03606\\ \\text{m}$。',
      },
      {
        title: '单个电荷的场强大小',
        detail: '$E_0=\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{R^2}= (8.99\\times10^9)\\dfrac{2.0\\times10^{-8}}{0.0013}\\approx 1.383\\times10^5\\ \\text{N/C}$。',
      },
      {
        title: '分量叠加',
        detail: '电场与中垂线夹角 $\\theta$ 满足 $\\cos\\theta = a/R = 0.02/0.03606\\approx 0.555$。沿连线方向分量相消，垂直分量加倍：$E=2E_0\\cos\\theta \\approx 2\\times1.383\\times10^5\\times0.555 \\approx 1.535\\times10^5\\ \\text{N/C}$。',
      },
      {
        title: '方向与验证',
        detail: '方向沿中垂线由正电荷指向负电荷的投影方向（即背离正电荷一侧、指向负电荷一侧）。用偶极子公式 $E=\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Qd}{(r^2+d^2/4)^{3/2}}$ 算得同样约为 $1.54\\times10^5\\ \\text{N/C}$，一致。',
      },
    ],
    answer: '$E \\approx 1.54\\times10^5\\ \\text{N/C}$，方向沿中垂线、由正电荷一侧指向负电荷一侧。',
    tags: ['电场叠加', '电偶极子', '库仑定律'],
  },

  // ─────────────────────── 第二章 高斯定理 ───────────────────────
  {
    id: 'electromagnetism-p2',
    courseId: 'electromagnetism',
    topicId: 'gauss-law',
    title: '均匀带电球体的电场分布',
    difficulty: 2,
    question: '半径为 $R=0.10\\ \\text{m}$、总电荷 $Q=1.0\\times10^{-8}\\ \\text{C}$ 的均匀带电球体（电荷体密度 $\\rho$ 恒定）。求：(1) 球内距中心 $r_1=R/2$ 处的电场强度；(2) 球外距中心 $r_2=2R$ 处的电场强度。取 $\\dfrac{1}{4\\pi\\varepsilon_0}=8.99\\times10^9\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$。',
    hints: [
      '利用球对称性，取同心球面为高斯面，由高斯定理 $\\oiint \\vec E\\cdot d\\vec S=Q_{\\text{内}}/\\varepsilon_0$ 求场。',
      '球内高斯面所包围电荷按体积比 $r^3/R^3$ 计算。',
      '球外情形等效于点电荷，内部总电荷全部集中在球心。',
    ],
    solution: [
      {
        title: '球内场（高斯定理）',
        detail: '取半径 $r_1=R/2$ 的同心球面，面内电荷 $Q_{\\text{内}}=Q\\cdot (r_1^3/R^3)=Q/8=1.25\\times10^{-9}\\ \\text{C}$。由 $E\\cdot 4\\pi r_1^2 = Q_{\\text{内}}/\\varepsilon_0$ 得 $E_1 = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{R^3}r_1 = (8.99\\times10^9)\\dfrac{1.0\\times10^{-8}}{0.10^3}\\times0.05 \\approx 4.50\\times10^3\\ \\text{N/C}$。',
      },
      {
        title: '球外场',
        detail: '取半径 $r_2=2R=0.20\\ \\text{m}$ 的球面，包围全部电荷 $Q$，故 $E_2 = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{r_2^2} = (8.99\\times10^9)\\dfrac{1.0\\times10^{-8}}{0.20^2} \\approx 2.25\\times10^3\\ \\text{N/C}$。',
      },
      {
        title: '方向',
        detail: '球对称且总电荷为正，场强沿径向向外。球内场随 $r$ 线性增大、球外随 $1/r^2$ 衰减，在 $r=R$ 处连续衔接（内部公式代 $r=R$ 得 $8.99\\times10^3$，外部公式同点亦为 $8.99\\times10^3\\ \\text{N/C}$）。',
      },
    ],
    answer: '球内 $r_1=R/2$ 处 $E_1\\approx 4.50\\times10^3\\ \\text{N/C}$（向外）；球外 $r_2=2R$ 处 $E_2\\approx 2.25\\times10^3\\ \\text{N/C}$（向外）。',
    tags: ['高斯定理', '球对称', '电通量'],
  },

  // ─────────────────────── 第三章 电势 ───────────────────────
  {
    id: 'electromagnetism-p3',
    courseId: 'electromagnetism',
    topicId: 'potential',
    title: '均匀带电圆环轴线上的电势与场强',
    difficulty: 2,
    question: '半径为 $R=0.20\\ \\text{m}$、总电荷 $Q=5.0\\times10^{-9}\\ \\text{C}$ 的均匀带电圆环，求其轴线上距圆心 $x=0.15\\ \\text{m}$ 处 $P$ 点的电势 $\\varphi$，并由此用 $\\vec E=-\\nabla\\varphi$ 求该点场强大小。取 $\\dfrac{1}{4\\pi\\varepsilon_0}=8.99\\times10^9\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$。',
    hints: [
      '圆环上各电荷元到轴线上 $P$ 点的距离都相等，电势可直接标量叠加。',
      '电势公式 $\\varphi = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{\\sqrt{R^2+x^2}}$。',
      '轴线上 $\\vec E$ 沿轴向，大小 $E=-d\\varphi/dx$（对 $x$ 求导）。',
    ],
    solution: [
      {
        title: '计算距离',
        detail: '轴线上 $P$ 到环上任一电荷元距离 $r=\\sqrt{R^2+x^2}=\\sqrt{0.20^2+0.15^2}=\\sqrt{0.0625}=0.25\\ \\text{m}$。',
      },
      {
        title: '电势叠加',
        detail: '各元电荷贡献同号同距，直接相加：$\\varphi = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{r} = (8.99\\times10^9)\\dfrac{5.0\\times10^{-9}}{0.25} = 179.8\\ \\text{V}$。',
      },
      {
        title: '由势求场',
        detail: '$\\varphi(x)=\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{\\sqrt{R^2+x^2}}$，求导得 $E_x = -\\dfrac{d\\varphi}{dx} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Qx}{(R^2+x^2)^{3/2}}$。代入 $x=0.15$：$\\varphi\' = (8.99\\times10^9)\\dfrac{5.0\\times10^{-9}\\times0.15}{(0.0625)^{3/2}} = (44.95)\\dfrac{0.15}{0.015625} = 431.5\\ \\text{N/C}$。',
      },
    ],
    answer: '$\\varphi \\approx 180\\ \\text{V}$；场强大小 $E\\approx 4.32\\times10^2\\ \\text{N/C}$，方向沿轴线背离圆环（因 $Q>0$）。',
    tags: ['电势叠加', '梯度求场', '电势'],
  },

  // ─────────────────────── 第四章 导体与电容器 ───────────────────────
  {
    id: 'electromagnetism-p4',
    courseId: 'electromagnetism',
    topicId: 'conductors-capacitors',
    title: '插入电介质后平行板电容器的变化',
    difficulty: 2,
    question: '平行板电容器极板面积 $S=0.02\\ \\text{m}^2$、间距 $d=2.0\\ \\text{mm}$，先接在 $U=100\\ \\text{V}$ 电源上充满电后断开电源，再在其间插入厚度等于板距、相对介电常数 $\\varepsilon_r=4$ 的均匀电介质板。求：(1) 插入后极板间电场强度 $E\'$；(2) 插入前后电容器储能的变化量 $\\Delta W$。取 $\\varepsilon_0=8.85\\times10^{-12}\\ \\text{F/m}$。',
    hints: [
      '断开电源后极板电荷量 $Q$ 不变，这是判断量值变化的前提。',
      '插入介质使电容变为 $C\'=\\varepsilon_r C$，电压与场强按 $Q$ 不变同比例下降。',
      '储能 $W=Q^2/(2C)$，电容变大则储能变小。',
    ],
    solution: [
      {
        title: '初始状态',
        detail: '初始电容 $C=\\dfrac{\\varepsilon_0 S}{d}=\\dfrac{8.85\\times10^{-12}\\times0.02}{2.0\\times10^{-3}}=8.85\\times10^{-11}\\ \\text{F}=88.5\\ \\text{pF}$。初始电荷 $Q=CU=8.85\\times10^{-11}\\times100=8.85\\times10^{-9}\\ \\text{C}$。初始场强 $E=U/d=100/0.002=5.0\\times10^4\\ \\text{V/m}$。',
      },
      {
        title: '插入介质后（Q 不变）',
        detail: '新电容 $C\'=\\varepsilon_r C=4C$。因 $Q$ 不变，新电压 $U\'=Q/C\'=U/4=25\\ \\text{V}$，新场强 $E\'=U\'/d=E/4=1.25\\times10^4\\ \\text{V/m}$。',
      },
      {
        title: '储能变化',
        detail: '初始储能 $W=\\dfrac12 CU^2=\\dfrac12\\times8.85\\times10^{-11}\\times10^4=4.425\\times10^{-7}\\ \\text{J}$。末态 $W\'=Q^2/(2C\')=W/4=1.106\\times10^{-7}\\ \\text{J}$。变化量 $\\Delta W = W\'-W = -3.32\\times10^{-7}\\ \\text{J}$（储能减少，差额转为介质极化能）。',
      },
    ],
    answer: '插入后 $E\'=1.25\\times10^4\\ \\text{V/m}$；储能减少 $\\Delta W=-3.32\\times10^{-7}\\ \\text{J}$。',
    tags: ['电容器', '电介质', '介电常数'],
  },

  // ─────────────────────── 第五章 稳恒电流 ───────────────────────
  {
    id: 'electromagnetism-p5',
    courseId: 'electromagnetism',
    topicId: 'steady-current',
    title: '含源混联电路的基尔霍夫求解',
    difficulty: 3,
    question: '电路如述：电动势 $\\mathscr E_1=12\\ \\text{V}$（内阻 $r_1=1\\ \\Omega$）与 $\\mathscr E_2=6\\ \\text{V}$（内阻 $r_2=0.5\\ \\Omega$）的两电源，连同外电阻 $R_1=4\\ \\Omega$、$R_2=6\\ \\Omega$ 构成单回路，且 $\\mathscr E_1,\\mathscr E_2$ 同向串联助力。求：(1) 回路电流 $I$；(2) 电阻 $R_1$ 两端电压 $U_1$；(3) 电源 $\\mathscr E_1$ 的端电压 $U_{\\text{端}1}$。',
    hints: [
      '先按绕行方向列回路电压方程（KVL）：各电动势代数和等于各电阻压降代数和。',
      '同向串联电源电动势相加，内阻与外阻全部串联求和。',
      '端电压 $U_{\\text{端}}=\\mathscr E-Ir$（放电时）。',
    ],
    solution: [
      {
        title: '列 KVL 方程',
        detail: '沿回路取电流方向为正，电动势同向相加，总电阻为串联：$R_{\\text{总}}=r_1+r_2+R_1+R_2=1+0.5+4+6=11.5\\ \\Omega$。总电动势 $\\mathscr E_{\\text{总}}=12+6=18\\ \\text{V}$。故 $I=\\dfrac{\\mathscr E_{\\text{总}}}{R_{\\text{总}}}=\\dfrac{18}{11.5}\\approx 1.565\\ \\text{A}$。',
      },
      {
        title: '求 $U_1$',
        detail: '$R_1$ 两端电压 $U_1=I R_1 = 1.565\\times4 \\approx 6.26\\ \\text{V}$。',
      },
      {
        title: '求 $\\mathscr E_1$ 端电压',
        detail: '放电状态下端电压 $U_{\\text{端}1}=\\mathscr E_1 - I r_1 = 12 - 1.565\\times1 = 10.435\\ \\text{V}$。可用 $U_{\\text{端}1}=IR_1+IR_2+U_{\\text{端}2}$ 等回路关系交叉验证。',
      },
    ],
    answer: '$I\\approx 1.57\\ \\text{A}$；$U_1\\approx 6.26\\ \\text{V}$；$U_{\\text{端}1}\\approx 10.4\\ \\text{V}$。',
    tags: ['基尔霍夫定律', '含源电路', '欧姆定律'],
  },

  // ─────────────────────── 第六章 恒定磁场 ───────────────────────
  {
    id: 'electromagnetism-p6',
    courseId: 'electromagnetism',
    topicId: 'magnetic-field',
    title: '长直导线与线圈组合中的磁场与洛伦兹力',
    difficulty: 3,
    question: '一根无限长直导线通有电流 $I_1=10\\ \\text{A}$（沿 $z$ 轴），在其旁距导线 $a=0.05\\ \\text{m}$ 处放置一个半径为 $R=0.03\\ \\text{m}$ 的圆环，圆环平面与导线垂直、圆心在导线一侧。圆环通电流 $I_2=2\\ \\text{A}$。求：(1) 圆心处由长直导线产生的磁感应强度 $B$；(2) 若一质子以速率 $v=10^5\\ \\text{m/s}$ 沿圆环径向向外运动，在圆心处受洛伦兹力大小。取 $\\mu_0=4\\pi\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$，$e=1.6\\times10^{-19}\\ \\text{C}$。',
    hints: [
      '无限长直导线磁场 $B=\\mu_0 I/(2\\pi r)$，方向由右手定则判定。',
      '圆心到直导线距离即 $a$，直接代入。',
      '洛伦兹力 $F=qvB\\sin\\theta$，注意速度与磁场的夹角。',
    ],
    solution: [
      {
        title: '直导线在圆心处的磁场',
        detail: '$B=\\dfrac{\\mu_0 I_1}{2\\pi a}=\\dfrac{4\\pi\\times10^{-7}\\times10}{2\\pi\\times0.05}= \\dfrac{4\\times10^{-6}}{0.10}=4.0\\times10^{-5}\\ \\text{T}$。方向垂直于圆环平面（由右手定则：导线电流向上时，圆心在导线右侧，磁场垂直纸面向里）。',
      },
      {
        title: '质子受力分析',
        detail: '质子沿圆环径向（在圆环平面内）向外运动，速度 $\\vec v$ 在圆环平面内；而 $\\vec B$ 垂直圆环平面，故 $\\vec v\\perp\\vec B$，$\\sin\\theta=1$。',
      },
      {
        title: '洛伦兹力大小',
        detail: '$F=e v B = 1.6\\times10^{-19}\\times10^5\\times4.0\\times10^{-5} = 6.4\\times10^{-19}\\ \\text{N}$。方向由 $\\vec v\\times\\vec B$（右手定则）确定，在圆环平面内垂直于速度。',
      },
    ],
    answer: '圆心处 $B=4.0\\times10^{-5}\\ \\text{T}$（垂直圆环平面）；质子受洛伦兹力 $F=6.4\\times10^{-19}\\ \\text{N}$。',
    tags: ['安培环路定理', '洛伦兹力', '毕奥-萨伐尔'],
  },

  // ─────────────────────── 第七章 电磁感应 ───────────────────────
  {
    id: 'electromagnetism-p7',
    courseId: 'electromagnetism',
    topicId: 'induction',
    title: '导体棒切割磁感线的电动势、外力功率与焦耳热',
    difficulty: 2,
    question: '两根水平平行金属导轨相距 $L=0.40\\ \\text{m}$，导轨左端用电阻 $R=2.5\\ \\Omega$ 连接，右端搁有一根可无摩擦滑动的导体棒（自身电阻忽略），整个区域存在垂直纸面向外的匀强磁场 $B=0.50\\ \\text{T}$。现用外力使导体棒以 $v=2.5\\ \\text{m/s}$ 的速度匀速向右滑动。求：(1) 回路中的感应电动势 $\\mathscr E$ 与电流 $I$ 的大小，并用楞次定律判断导体棒中的电流方向；(2) 为维持匀速所需施加的水平外力及其功率；(3) 在 $t=4.0\\ \\text{s}$ 内回路上产生的焦耳热 $Q$，并验证机械功率与焦耳热功率相等。',
    hints: [
      '导体棒向右滑动使回路面积增大，穿过回路的向外的磁通随之增加，由楞次定律，感应电流激发的磁场应指向纸内。',
      '动生电动势可直接用 $\\mathscr E = \\dfrac{d\\Phi}{dt}=BLv$，电流由闭合电路欧姆定律 $I=\\mathscr E/R$ 给出。',
      '匀速时外力与安培力平衡：$F_{\\text{外}}=BIL$；其功率 $P=F_{\\text{外}}v$ 应与 $I^2R$ 完全一致。',
    ],
    solution: [
      {
        title: '磁通变化率与感应电动势',
        detail: '设 $\\Delta t$ 内导体棒向右移动 $\\Delta x=v\\Delta t$，回路面积增加 $\\Delta S=L\\cdot v\\Delta t$，穿过回路的磁通增量 $\\Delta\\Phi=B\\Delta S=BLv\\Delta t$。由法拉第定律\\n\\n$$\\mathscr E=\\left|\\frac{d\\Phi}{dt}\\right|=BLv=0.50\\times0.40\\times2.5=0.50\\ \\text{V}$$\\n\\n等价地，也可直接用动生电动势公式 $\\mathscr E=\\int(\\vec v\\times\\vec B)\\cdot d\\vec l = BLv$，两者结果相同。回路电流\\n\\n$$I=\\frac{\\mathscr E}{R}=\\frac{0.50}{2.5}=0.20\\ \\text{A}$$',
      },
      {
        title: '电流方向（楞次定律）',
        detail: '棒向右运动时回路面积增大，穿过回路的"向外的磁通"在增加。按楞次定律，感应电流产生的磁场必须反抗这一增加，故感应磁场应垂直纸面向里。由右手螺旋定则，回路中的电流方向为顺时针（俯视），即在导体棒中电流自上而下（从上导轨流向下导轨）。导体棒中的动生电动势可用 $\\vec v\\times\\vec B$ 的作用方向验证：$\\vec v$ 向右、$\\vec B$ 向外，$\\vec v\\times\\vec B$ 恰沿棒由上指向下，与上述结论一致。',
      },
      {
        title: '维持匀速所需的外力与功率',
        detail: '通有电流的导体棒在磁场中受安培力，因棒与磁场垂直，大小为\\n\\n$$F_B=BIL=0.50\\times0.20\\times0.40=0.040\\ \\text{N}$$\\n\\n由左手定则（或由楞次定律"阻碍相对运动"），该力方向水平向左，与运动方向相反。要维持匀速，外力须与之等大反向：\\n\\n$$F_{\\text{外}}=0.040\\ \\text{N}\\ (\\text{方向向右})$$\\n\\n外力做功的功率\\n\\n$$P_{\\text{外}}=F_{\\text{外}}v=0.040\\times2.5=0.10\\ \\text{W}$$',
      },
      {
        title: '焦耳热与能量守恒校验',
        detail: '回路的焦耳热功率\\n\\n$$P_R=I^2R=(0.20)^2\\times2.5=0.10\\ \\text{W}$$\\n\\n亦可用 $P_R=\\mathscr E^2/R=(0.50)^2/2.5=0.10\\ \\text{W}$ 核对。可见 $P_{\\text{外}}=P_R=0.10\\ \\text{W}$，外力做的机械功全部转化为焦耳热，能量守恒成立。在 $t=4.0\\ \\text{s}$ 内\\n\\n$$Q=P_R\\,t=0.10\\times4.0=0.40\\ \\text{J}$$\\n\\n同时该时段内棒扫过的距离 $x=vt=10\\ \\text{m}$，外力做功 $F_{\\text{外}}x=0.040\\times10=0.40\\ \\text{J}$，与焦耳热相等，再次印证结果正确。',
      },
    ],
    answer: '(1) $\\mathscr E=0.50\\ \\text{V}$，$I=0.20\\ \\text{A}$，导体棒中电流自上而下（回路为顺时针方向）；(2) 水平外力 $F_{\\text{外}}=4.0\\times10^{-2}\\ \\text{N}$（向右），功率 $P_{\\text{外}}=0.10\\ \\text{W}$；(3) $4.0\\ \\text{s}$ 内焦耳热 $Q=0.40\\ \\text{J}$，且 $P_{\\text{外}}=P_R=0.10\\ \\text{W}$，机械能全部转化为焦耳热。',
    tags: ['法拉第定律', '动生电动势', '楞次定律', '能量守恒'],
  },
];
