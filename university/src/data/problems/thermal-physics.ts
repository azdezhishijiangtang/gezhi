import type { Problem } from '@/types';

export const thermal_physicsProblems: Problem[] = [
  // ─────────────────────── 温标与理想气体温标 ───────────────────────
  {
    id: 'thermal-physics-p1',
    courseId: 'thermal-physics',
    topicId: 'temperature',
    title: '定容气体温度计的读数与三种温标换算',
    difficulty: 1,
    question: '某定容气体温度计以低压极限下的理想气体温标为标准，测温气体在三相点（$T_\\text{tr} = 273.16\\ \\text{K}$）时的压强为 $p_\\text{tr} = 500\\ \\text{Pa}$。在与某待测系统达到热平衡后，测得压强 $p = 683\\ \\text{Pa}$。求：(1) 待测系统的热力学温度 $T$；(2) 对应的摄氏温度 $t$；(3) 对应的华氏温度 $t_\\text{F}$。',
    hints: [
      '理想气体温标的定义是 $T = 273.16\\ \\text{K} \\times \\dfrac{p}{p_\\text{tr}}$（低压极限），定容下压强与温度成正比。',
      '摄氏温度与热力学温度的关系为 $T(\\text{K}) = t(\\,^\\circ\\text{C}) + 273.15$。',
      '华氏换算关系为 $t_\\text{F}(\\,^\\circ\\text{F}) = \\dfrac{9}{5}t(\\,^\\circ\\text{C}) + 32$。',
    ],
    solution: [
      {
        title: '用理想气体温标定义求 $T$',
        detail: '定容气体温度计在低压极限下有 $T = 273.16\\ \\text{K} \\times \\dfrac{p}{p_\\text{tr}} = 273.16 \\times \\dfrac{683}{500} = 273.16 \\times 1.366 \\approx 373.14\\ \\text{K}$。',
      },
      {
        title: '换算为摄氏温度',
        detail: '由 $T = t + 273.15$ 得 $t = 373.14 - 273.15 = 99.99\\ ^\\circ\\text{C} \\approx 100\\ ^\\circ\\text{C}$，恰好接近水的汽点。',
      },
      {
        title: '换算为华氏温度',
        detail: '$t_\\text{F} = \\dfrac{9}{5}t + 32 = \\dfrac{9}{5} \\times 99.99 + 32 \\approx 179.98 + 32 = 211.98\\ ^\\circ\\text{F} \\approx 212\\ ^\\circ\\text{F}$。',
      },
    ],
    answer: '$T \\approx 373.14\\ \\text{K}$，$t \\approx 100\\ ^\\circ\\text{C}$，$t_\\text{F} \\approx 212\\ ^\\circ\\text{F}$',
    tags: ['理想气体温标', '温标换算', '三相点'],
  },

  // ─────────────────────── 气体动理论 ───────────────────────
  {
    id: 'thermal-physics-p2',
    courseId: 'thermal-physics',
    topicId: 'molecular-kinetic',
    title: '氮气分子的方均根速率、平均平动动能与数密度',
    difficulty: 2,
    question: '一容器内装有处于平衡态的氮气（$M = 28 \\times 10^{-3}\\ \\text{kg/mol}$），温度 $T = 300\\ \\text{K}$，压强 $p = 1.0 \\times 10^{5}\\ \\text{Pa}$。已知 $R = 8.314\\ \\text{J/(mol}\\cdot\\text{ K)}$，$k = 1.38 \\times 10^{-23}\\ \\text{J/K}$。求：(1) 氮气分子的方均根速率 $v_\\text{rms}$；(2) 分子的平均平动动能 $\\overline{\\varepsilon_t}$；(3) 分子数密度 $n$。',
    hints: [
      '方均根速率用宏观量表示为 $v_\\text{rms} = \\sqrt{\\dfrac{3RT}{M}}$，注意摩尔质量要换算成 $\\text{kg/mol}$。',
      '平均平动动能只与温度有关：$\\overline{\\varepsilon_t} = \\dfrac{3}{2}kT$，与气体种类无关。',
      '数密度由理想气体状态方程的微观形式 $p = nkT$ 反推：$n = \\dfrac{p}{kT}$。',
    ],
    solution: [
      {
        title: '求方均根速率',
        detail: '$v_\\text{rms} = \\sqrt{\\dfrac{3RT}{M}} = \\sqrt{\\dfrac{3 \\times 8.314 \\times 300}{28 \\times 10^{-3}}} = \\sqrt{\\dfrac{7482.6}{0.028}} \\approx \\sqrt{2.67 \\times 10^{5}} \\approx 517\\ \\text{m/s}$。',
      },
      {
        title: '求平均平动动能',
        detail: '$\\overline{\\varepsilon_t} = \\dfrac{3}{2}kT = \\dfrac{3}{2} \\times 1.38 \\times 10^{-23} \\times 300 \\approx 6.21 \\times 10^{-21}\\ \\text{J}$。该值只由温度决定，$300\\ \\text{K}$ 下任何气体分子都相同。',
      },
      {
        title: '求分子数密度',
        detail: '由 $p = nkT$ 得 $n = \\dfrac{p}{kT} = \\dfrac{1.0 \\times 10^{5}}{1.38 \\times 10^{-23} \\times 300} \\approx \\dfrac{1.0 \\times 10^{5}}{4.14 \\times 10^{-21}} \\approx 2.4 \\times 10^{25}\\ \\text{m}^{-3}$。',
      },
      {
        title: '结果自洽性检验',
        detail: '用压强公式验证：$p = \\dfrac{2}{3}n\\overline{\\varepsilon_t} = \\dfrac{2}{3} \\times 2.4 \\times 10^{25} \\times 6.21 \\times 10^{-21} \\approx 1.0 \\times 10^{5}\\ \\text{Pa}$，与给定压强一致，说明三个宏观/微观量的换算自洽。',
      },
    ],
    answer: '$v_\\text{rms} \\approx 517\\ \\text{m/s}$，$\\overline{\\varepsilon_t} \\approx 6.21 \\times 10^{-21}\\ \\text{J}$，$n \\approx 2.4 \\times 10^{25}\\ \\text{m}^{-3}$',
    tags: ['方均根速率', '平均平动动能', '压强公式', '气体动理论'],
  },

  // ─────────────────────── 热力学第一定律：等值过程 ───────────────────────
  {
    id: 'thermal-physics-p3',
    courseId: 'thermal-physics',
    topicId: 'first-law',
    title: '单原子理想气体等压膨胀与等容升温的对比',
    difficulty: 2,
    question: '$1\\ \\text{mol}$ 单原子理想气体（自由度 $i = 3$）初态温度 $T_1 = 300\\ \\text{K}$，$R = 8.314\\ \\text{J/(mol}\\cdot\\text{ K)}$。(1) 若气体等压膨胀升温至 $T_2 = 400\\ \\text{K}$，求内能增量 $\\Delta U$、对外做功 $W$ 与吸收热量 $Q$；(2) 若改为等容升温至同一温度，吸收的热量又是多少？比较两种过程并说明原因。',
    hints: [
      '理想气体内能只是温度的函数：$\\Delta U = \\dfrac{i}{2}nR\\Delta T$，两条路径的 $\\Delta U$ 相同。',
      '等压过程对外做功 $W = nR\\Delta T$（也可由 $W = p\\Delta V$ 结合状态方程得到）。',
      '第一定律 $\\Delta U = Q - W$ 给出 $Q = \\Delta U + W$；等容时 $W = 0$。',
    ],
    solution: [
      {
        title: '求内能增量（两过程相同）',
        detail: '$\\Delta U = \\dfrac{i}{2}nR\\Delta T = \\dfrac{3}{2} \\times 1 \\times 8.314 \\times (400 - 300) \\approx 1247\\ \\text{J}$。内能是状态函数，只由初末温度决定，与路径无关。',
      },
      {
        title: '求等压过程的功与热',
        detail: '等压膨胀对外做功 $W = nR\\Delta T = 1 \\times 8.314 \\times 100 \\approx 831\\ \\text{J}$；由第一定律 $Q = \\Delta U + W = 1247 + 831 \\approx 2078\\ \\text{J}$（也可用 $Q = C_p\\Delta T = \\dfrac{5}{2}nR\\Delta T$ 验证，结果一致）。',
      },
      {
        title: '求等容过程的热量',
        detail: '等容过程 $W = 0$，故 $Q = \\Delta U \\approx 1247\\ \\text{J}$，即 $Q = C_V\\Delta T = \\dfrac{3}{2}nR\\Delta T$。',
      },
      {
        title: '比较与讨论',
        detail: '升到相同温度，等压吸热（$2078\\ \\text{J}$）大于等容吸热（$1247\\ \\text{J}$），多出的 $831\\ \\text{J} = nR\\Delta T$ 正是膨胀时对外做的功。这解释了 $C_p > C_V$（迈耶公式 $C_p - C_V = nR$）：定压下吸收的热量要分出一部分用于做功。',
      },
    ],
    answer: '等压：$\\Delta U \\approx 1247\\ \\text{J}$，$W \\approx 831\\ \\text{J}$，$Q \\approx 2078\\ \\text{J}$；等容：$W = 0$，$Q = \\Delta U \\approx 1247\\ \\text{J}$',
    tags: ['热力学第一定律', '等压过程', '等容过程', '迈耶公式'],
  },

  // ─────────────────────── 绝热过程 ───────────────────────
  {
    id: 'thermal-physics-p4',
    courseId: 'thermal-physics',
    topicId: 'heat-capacity',
    title: '单原子理想气体的绝热压缩：末态温度、压强与做功',
    difficulty: 3,
    question: '$1\\ \\text{mol}$ 单原子理想气体（比热比 $\\gamma = 5/3$）初态体积 $V_1 = 4.0\\ \\text{L}$、温度 $T_1 = 300\\ \\text{K}$，经准静态绝热过程被压缩至 $V_2 = 1.0\\ \\text{L}$。$R = 8.314\\ \\text{J/(mol}\\cdot\\text{ K)}$。求：(1) 末态温度 $T_2$；(2) 初态压强 $p_1$ 与末态压强 $p_2$；(3) 该过程中外界对气体做的功 $W^{\\prime}$。',
    hints: [
      '绝热过程满足泊松方程 $TV^{\\gamma-1} = $ 常量，故 $T_2 = T_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma-1}$。',
      '初态压强由状态方程 $p_1 = \\dfrac{nRT_1}{V_1}$ 求出；末态压强可用 $p_2 = p_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma}$，再用 $p_2 V_2 = nRT_2$ 验算。',
      '绝热过程 $Q = 0$，由第一定律，系统对外做功等于内能减少：$W = -\\Delta U = -nC_V(T_2 - T_1)$，外界对系统做功 $W^{\\prime} = -W$。',
    ],
    solution: [
      {
        title: '求末态温度',
        detail: '由 $TV^{\\gamma-1} = $ 常量（$\\gamma - 1 = 2/3$）：$T_2 = T_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma-1} = 300 \\times \\left(\\dfrac{4.0}{1.0}\\right)^{2/3} = 300 \\times 4^{2/3} \\approx 300 \\times 2.520 \\approx 756\\ \\text{K}$。绝热压缩使温度显著升高。',
      },
      {
        title: '求初、末态压强',
        detail: '初态：$p_1 = \\dfrac{nRT_1}{V_1} = \\dfrac{1 \\times 8.314 \\times 300}{4.0 \\times 10^{-3}} \\approx 6.24 \\times 10^{5}\\ \\text{Pa}$。末态：$p_2 = p_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma} = 6.24 \\times 10^{5} \\times 4^{5/3} \\approx 6.24 \\times 10^{5} \\times 10.08 \\approx 6.29 \\times 10^{6}\\ \\text{Pa}$。验算：$p_2 = \\dfrac{nRT_2}{V_2} = \\dfrac{8.314 \\times 756}{1.0 \\times 10^{-3}} \\approx 6.29 \\times 10^{6}\\ \\text{Pa}$，一致。',
      },
      {
        title: '求外界做的功',
        detail: '绝热 $Q = 0$，第一定律给 $\\Delta U + W = 0$，即 $W = -nC_V(T_2 - T_1)$，其中 $C_V = \\dfrac{3}{2}R$。$W = -\\dfrac{3}{2} \\times 1 \\times 8.314 \\times (756 - 300) \\approx -5686\\ \\text{J}$。系统对外做负功，故外界对气体做功 $W^{\\prime} = -W \\approx 5.69 \\times 10^{3}\\ \\text{J}$。',
      },
      {
        title: '物理讨论',
        detail: '外界做的功全部转化为气体内能（$\\Delta U \\approx 5.69\\ \\text{kJ}$），宏观表现为温度从 $300\\ \\text{K}$ 升到 $756\\ \\text{K}$。绝热线比等温线更陡（末压 $6.29 \\times 10^{6}\\ \\text{Pa}$ 高于等温压缩的 $p_1/4^{\\gamma} \\times 4^{\\gamma}$ 对应情形），因为压缩同时升温、双重推高压强。',
      },
    ],
    answer: '$T_2 \\approx 756\\ \\text{K}$；$p_1 \\approx 6.24 \\times 10^{5}\\ \\text{Pa}$，$p_2 \\approx 6.29 \\times 10^{6}\\ \\text{Pa}$；外界对气体做功 $W^{\\prime} \\approx 5.69 \\times 10^{3}\\ \\text{J}$',
    tags: ['绝热过程', '泊松方程', '比热比', '内能'],
  },

  // ─────────────────────── 卡诺循环 ───────────────────────
  {
    id: 'thermal-physics-p5',
    courseId: 'thermal-physics',
    topicId: 'cycles',
    title: '卡诺热机效率、判别违规热机与可逆制冷机',
    difficulty: 2,
    question: '一可逆卡诺热机工作在高温热源 $T_1 = 600\\ \\text{K}$ 与低温热源 $T_2 = 300\\ \\text{K}$ 之间，每循环从高温热源吸热 $Q_1 = 1200\\ \\text{J}$。(1) 求循环效率、对外做的净功与向低温热源放出的热量；(2) 有人声称另一热机也工作在这两热源之间，每循环吸热 $1200\\ \\text{J}$ 可做功 $720\\ \\text{J}$，试判断是否可能；(3) 将该可逆机逆转，作为制冷机工作在 $T_2^{\\prime} = 270\\ \\text{K}$ 与 $T_1^{\\prime} = 300\\ \\text{K}$ 之间，从冷库吸热 $Q_2 = 900\\ \\text{J}$，求最少耗功。',
    hints: [
      '卡诺效率只由两热源温度决定：$\\eta_C = 1 - \\dfrac{T_2}{T_1}$，再结合 $\\eta = W/Q_1$ 与 $W = Q_1 - Q_2$ 求功与放热。',
      '卡诺定理：同温限下任何热机效率都不能超过可逆卡诺效率，比较声称效率与 $\\eta_C$ 即可判断。',
      '可逆制冷机的制冷系数 $\\varepsilon = \\dfrac{T_2^{\\prime}}{T_1^{\\prime} - T_2^{\\prime}}$，最少耗功对应可逆极限 $W_{\\min} = Q_2/\\varepsilon$。',
    ],
    solution: [
      {
        title: '求卡诺效率与能量分配',
        detail: '$\\eta_C = 1 - \\dfrac{T_2}{T_1} = 1 - \\dfrac{300}{600} = 0.5 = 50\\%$。对外净功 $W = \\eta Q_1 = 0.5 \\times 1200 = 600\\ \\text{J}$；向低温热源放热 $Q_2 = Q_1 - W = 1200 - 600 = 600\\ \\text{J}$。',
      },
      {
        title: '判别声称的热机',
        detail: '声称效率 $\\eta = \\dfrac{720}{1200} = 0.6 = 60\\% > \\eta_C = 50\\%$。由卡诺定理，工作在同温限之间的任何热机效率不得超过可逆卡诺效率，否则可联合运转实现热量自动从低温流向高温，违反热力学第二定律。故该热机不可能存在。',
      },
      {
        title: '求制冷机的最少耗功',
        detail: '可逆制冷机制冷系数 $\\varepsilon = \\dfrac{T_2^{\\prime}}{T_1^{\\prime} - T_2^{\\prime}} = \\dfrac{270}{300 - 270} = 9$。最少耗功对应可逆情形：$W_{\\min} = \\dfrac{Q_2}{\\varepsilon} = \\dfrac{900}{9} = 100\\ \\text{J}$。实际制冷机不可逆，耗功必大于 $100\\ \\text{J}$。',
      },
      {
        title: '结果讨论',
        detail: '热机必须向低温热源排热（本例占吸热的一半），这是第二定律的强制要求；而制冷机"搬运"热量的代价可以远小于搬运量（$100\\ \\text{J}$ 搬 $900\\ \\text{J}$），制冷系数大于 1 不违反能量守恒。',
      },
    ],
    answer: '(1) $\\eta_C = 50\\%$，$W = 600\\ \\text{J}$，$Q_2 = 600\\ \\text{J}$；(2) 不可能，$60\\% > \\eta_C = 50\\%$ 违反卡诺定理；(3) $W_{\\min} = 100\\ \\text{J}$',
    tags: ['卡诺循环', '热机效率', '卡诺定理', '制冷系数'],
  },

  // ─────────────────────── 熵变与克劳修斯不等式 ───────────────────────
  {
    id: 'thermal-physics-p6',
    courseId: 'thermal-physics',
    topicId: 'entropy',
    title: '有限温差传热与气体自由膨胀的熵变',
    difficulty: 3,
    question: '(1) 将 $Q = 1000\\ \\text{J}$ 热量从高温热源（$T_1 = 500\\ \\text{K}$）直接传给低温热源（$T_2 = 300\\ \\text{K}$），求两热源构成的总系统的熵变，并判断过程能否自发进行；(2) $2\\ \\text{mol}$ 理想气体向真空自由膨胀，体积从 $V_1$ 增大到 $2V_1$（过程绝热且不做功），求气体的熵变，并用克劳修斯不等式说明该过程不可逆。$R = 8.314\\ \\text{J/(mol}\\cdot\\text{ K)}$。',
    hints: [
      '熵是状态函数：热源吸放热时温度不变，各自熵变为 $\\pm Q/T$，总熵变相加。',
      '自由膨胀虽不可逆，但初末态都是平衡态，熵变可沿任意可逆路径（如可逆等温膨胀）计算：$\\Delta S = nR\\ln(V_2/V_1)$。',
      '克劳修斯不等式 $\\Delta S \\ge \\int \\dfrac{\\delta Q}{T}$：对孤立系统 $\\int \\dfrac{\\delta Q}{T} = 0$，若 $\\Delta S > 0$ 则过程不可逆。',
    ],
    solution: [
      {
        title: '求传热的总熵变',
        detail: '高温热源放热 $\\Delta S_1 = -\\dfrac{Q}{T_1} = -\\dfrac{1000}{500} = -2.0\\ \\text{J/K}$；低温热源吸热 $\\Delta S_2 = \\dfrac{Q}{T_2} = \\dfrac{1000}{300} \\approx 3.33\\ \\text{J/K}$。总熵变 $\\Delta S = \\Delta S_1 + \\Delta S_2 \\approx -2.0 + 3.33 = 1.33\\ \\text{J/K} > 0$，总系统孤立且熵增，过程可自发进行（不可逆）。',
      },
      {
        title: '求自由膨胀的熵变',
        detail: '自由膨胀中 $Q = 0$、$W = 0$，故 $\\Delta U = 0$，理想气体末态温度与初态相同。温度不变，可沿可逆等温路径积分：$\\Delta S = \\int \\dfrac{\\delta Q_\\text{rev}}{T} = nR\\ln\\dfrac{V_2}{V_1} = 2 \\times 8.314 \\times \\ln 2 \\approx 16.63 \\times 0.693 \\approx 11.5\\ \\text{J/K}$。',
      },
      {
        title: '用克劳修斯不等式判断可逆性',
        detail: '自由膨胀是绝热的，实际过程 $\\int \\dfrac{\\delta Q}{T} = 0$，而熵变 $\\Delta S \\approx 11.5\\ \\text{J/K} > 0$。由克劳修斯不等式 $\\Delta S \\ge \\int \\dfrac{\\delta Q}{T}$，此处严格大于，差额即熵产生，说明过程不可逆。若过程可逆，应有 $\\Delta S = 0$（孤立绝热），与实际不符。',
      },
      {
        title: '物理讨论',
        detail: '两个不可逆过程都使孤立系统熵增：有限温差传热的熵增来自能量"降级"（可用性损失），自由膨胀的熵增来自分子占据的微观状态数暴增（$\\Omega$ 增大，$S = k\\ln\\Omega$ 增大）。自发过程沿熵增方向进行，这正是热力学第二定律的定量表述。',
      },
    ],
    answer: '(1) $\\Delta S = -\\dfrac{1000}{500} + \\dfrac{1000}{300} \\approx 1.33\\ \\text{J/K} > 0$，可自发进行且不可逆；(2) $\\Delta S = 2R\\ln 2 \\approx 11.5\\ \\text{J/K}$，$\\Delta S > \\int \\dfrac{\\delta Q}{T} = 0$，过程不可逆',
    tags: ['熵变', '克劳修斯不等式', '自由膨胀', '熵增原理'],
  },

  // ─────────────────────── 热力学第二定律：热机可行性判别 ───────────────────────
  {
    id: 'thermal-physics-p7',
    courseId: 'thermal-physics',
    topicId: 'second-law',
    title: '判别违规热机与两热源间的最大输出功',
    difficulty: 2,
    question: '某发明者声称制成一台循环工作的热机，每循环从高温热源（$T_\\text{H} = 900\\ \\text{K}$）吸热 $Q_\\text{H} = 1200\\ \\text{J}$，向低温热源（$T_\\text{C} = 300\\ \\text{K}$）放热 $Q_\\text{C} = 200\\ \\text{J}$，并对外做功 $W = 1000\\ \\text{J}$。(1) 该声称是否满足热力学第一定律？(2) 用热力学第二定律的两种判据判断这台热机能否实现；(3) 若不能实现，在同样从高温热源吸热 $1200\\ \\text{J}$ 的条件下，每循环最多能输出多少功？此时至少须向低温热源排放多少热量？',
    hints: [
      '先看第一定律：循环一周回到初态 $\\Delta U = 0$，故必须满足 $W = Q_\\text{H} - Q_\\text{C}$，检查这笔能量账是否平衡。',
      '第二定律判据一（卡诺定理）：工作在同一对热源间的任何热机，效率 $\\eta = \\dfrac{W}{Q_\\text{H}}$ 不得超过可逆卡诺效率 $\\eta_\\text{C} = 1 - \\dfrac{T_\\text{C}}{T_\\text{H}}$。',
      '判据二（循环形式的克劳修斯不等式）：$\\oint \\dfrac{\\delta Q}{T} = \\dfrac{Q_\\text{H}}{T_\\text{H}} - \\dfrac{Q_\\text{C}}{T_\\text{C}} \\le 0$，可逆时取等号；由此可反推最大功 $W_{\\max} = \\eta_\\text{C} Q_\\text{H}$ 与最少排热。',
    ],
    solution: [
      {
        title: '检验是否满足第一定律',
        detail: '循环过程结束后系统回到初态，状态函数内能的净变化 $\\Delta U = 0$。由热力学第一定律 $\\Delta U = Q - W$，对每个循环应有 $W = Q_\\text{H} - Q_\\text{C} = 1200 - 200 = 1000\\ \\text{J}$，与声称的做功完全相符。因此该装置**并不违反第一定律**——它的迷惑性正在于此：能量收支毫无疑点，必须改用第二定律来审查其可行性。',
      },
      {
        title: '判据一：与卡诺效率比较',
        detail: '该两热源之间的可逆卡诺效率为 $\\eta_\\text{C} = 1 - \\dfrac{T_\\text{C}}{T_\\text{H}} = 1 - \\dfrac{300}{900} = \\dfrac{2}{3} \\approx 66.7\\%$。声称效率为 $\\eta = \\dfrac{W}{Q_\\text{H}} = \\dfrac{1000}{1200} \\approx 83.3\\%$。由于 $\\eta > \\eta_\\text{C}$，违反卡诺定理（同温限下效率不得超过可逆机），故这台热机不可能实现：若它成立，就能与一台逆行的卡诺制冷机组合，实现热量无偿地从低温流向高温。',
      },
      {
        title: '判据二：循环形式的克劳修斯不等式',
        detail: '把循环中各处交换的热量除以当地热源温度再求和：$\\oint \\dfrac{\\delta Q}{T} = \\dfrac{Q_\\text{H}}{T_\\text{H}} - \\dfrac{Q_\\text{C}}{T_\\text{C}} = \\dfrac{1200}{900} - \\dfrac{200}{300} = 1.333 - 0.667 \\approx 0.667\\ \\text{J/K} > 0$。可逆循环要求该值为 $0$，不可逆循环要求严格小于 $0$，任何情况都不能为正，故同样判定不可能。两种判据结论一致，互相印证。',
      },
      {
        title: '求可能的最大输出功与最少排热',
        detail: '在 $Q_\\text{H} = 1200\\ \\text{J}$ 固定的条件下，输出功的上界由可逆情形给出：$W_{\\max} = \\eta_\\text{C} Q_\\text{H} = \\dfrac{2}{3} \\times 1200 = 800\\ \\text{J}$。此时排给低温热源的热量 $Q_{\\text{C,min}} = Q_\\text{H} - W_{\\max} = 1200 - 800 = 400\\ \\text{J}$。熵平衡校验：$\\dfrac{Q_\\text{H}}{T_\\text{H}} = \\dfrac{1200}{900} \\approx 1.333\\ \\text{J/K}$，$\\dfrac{Q_{\\text{C,min}}}{T_\\text{C}} = \\dfrac{400}{300} \\approx 1.333\\ \\text{J/K}$，两者相等，说明这是一个熵变为零的可逆循环。',
      },
      {
        title: '结果讨论',
        detail: '与声称相比，真正可行的可逆热机每循环要多排放 $200\\ \\text{J}$ 热量、少输出 $200\\ \\text{J}$ 功。这 $200\\ \\text{J}$ 就是第二定律向任何热机强制收取的“排放税”，无论更换何种工质、如何改良结构都无法免除。这也说明：单靠第一定律审查不出的错误，恰恰是热力学第二定律的价值所在。',
      },
    ],
    answer: '声称不违反第一定律（$W = 1200 - 200 = 1000\\ \\text{J}$ 能量平衡），但 $\\eta \\approx 83.3\\% > \\eta_\\text{C} \\approx 66.7\\%$，且 $\\oint \\dfrac{\\delta Q}{T} \\approx 0.667\\ \\text{J/K} > 0$，违反第二定律，故不可能实现。同样的吸热条件下可能的最大输出功为 $W_{\\max} = 800\\ \\text{J}$，此时至少须排放 $Q_{\\text{C,min}} = 400\\ \\text{J}$。',
    tags: ['热力学第二定律', '卡诺定理', '克劳修斯不等式', '热机效率'],
  },
];
