import type { Problem } from '@/types';

export const relativityProblems: Problem[] = [
  // ─────────────────────── 时间膨胀与 μ 子 ───────────────────────
  {
    id: 'relativity-p1',
    courseId: 'relativity',
    topicId: 'relativistic-kinematics',
    title: '宇宙线 μ 子为何能到达地面',
    difficulty: 1,
    question: 'μ 子的固有平均寿命为 $\\tau_0 = 2.2\\ \\mu\\text{s}$，它由宇宙线在距地面约 $h = 6\\ \\text{km}$ 的高空产生，并以 $v = 0.995c$ 竖直向下运动。求：(1) 洛伦兹因子 $\\gamma$；(2) 若不考虑相对论效应，μ 子一生能飞多远、能有多少比例抵达地面；(3) 计及时间膨胀后能飞多远、到达比例变为多少。',
    hints: [
      '洛伦兹因子 $\\gamma = 1/\\sqrt{1-v^2/c^2}$，先算 $1 - v^2/c^2$ 再开方。',
      '不考虑相对论时飞行距离为 $v\\tau_0$；存活比例按指数衰减 $e^{-t/\\tau}$ 估算。',
      '实验室系中寿命延长为 $\\gamma\\tau_0$，再重算飞行距离与存活比例。',
    ],
    solution: [
      {
        title: '计算洛伦兹因子',
        detail: '$1 - v^2/c^2 = 1 - 0.995^2 = 0.009975$，开方得 $\\sqrt{0.009975} \\approx 0.0999$，故 $\\gamma = 1/0.0999 \\approx 10.0$。速度已达光速的 $99.5\\%$，时间膨胀效应约 $10$ 倍。',
      },
      {
        title: '不考虑相对论效应',
        detail: 'μ 子一生能飞 $v\\tau_0 \\approx 0.995 \\times 3\\times10^8 \\times 2.2\\times10^{-6} \\approx 6.6\\times10^2\\ \\text{m} = 660\\ \\text{m}$，远小于 $6\\ \\text{km}$。飞行 $6\\ \\text{km}$ 需经约 $6000/660 \\approx 9$ 个平均寿命，存活比例仅 $e^{-9} \\approx 1\\times10^{-4}$，几乎不可能抵达地面。',
      },
      {
        title: '计及时间膨胀',
        detail: '实验室系中寿命延长为 $\\tau = \\gamma\\tau_0 \\approx 10 \\times 2.2\\ \\mu\\text{s} = 22\\ \\mu\\text{s}$，能飞 $v\\tau \\approx 0.995\\times3\\times10^8\\times22\\times10^{-6} \\approx 6.6\\ \\text{km}$，恰好与产生高度同量级。飞行时间与平均寿命之比约 $1$，存活比例约 $e^{-1} \\approx 37\\%$。因此地面上能探测到大量 μ 子，与实验一致。（在 μ 子自身参考系中也可用长度收缩解释：大气厚度缩为 $6/\\gamma \\approx 0.6\\ \\text{km}$，结论相同。）',
      },
    ],
    answer: '$\\gamma \\approx 10$；不考虑相对论时只能飞约 $660\\ \\text{m}$，到达比例 $e^{-9}\\approx10^{-4}$；计及时间膨胀后能飞约 $6.6\\ \\text{km}$，约 $37\\%$ 的 μ 子可抵达地面。',
    tags: ['时间膨胀', '固有时', '洛伦兹因子'],
  },

  // ─────────────────────── 长度收缩与飞船 ───────────────────────
  {
    id: 'relativity-p2',
    courseId: 'relativity',
    topicId: 'relativistic-kinematics',
    title: '飞船长度收缩与穿越空间站的时间',
    difficulty: 1,
    question: '一艘飞船的固有长度为 $L_0 = 100\\ \\text{m}$，以 $v = 0.6c$ 匀速掠过一座宽度可忽略的空间站。(1) 求地面（空间站）参考系中测得的飞船长度；(2) 求空间站记录的飞船穿过空间站所用时间 $\\Delta t$；(3) 求飞船参考系中测得的穿过时间 $\\Delta t^{\\prime}$，并用时间膨胀关系验证两结果一致。',
    hints: [
      '$v = 0.6c$ 时 $\\gamma = 1/\\sqrt{1-0.6^2} = 1.25$。',
      '长度收缩只发生在运动方向：$L = L_0/\\gamma$。',
      '"船头过站"与"船尾过站"两个事件在空间站系发生于同一地点，空间站的钟记录的才是固有时。',
    ],
    solution: [
      {
        title: '地面系测飞船长度',
        detail: '$\\gamma = 1/\\sqrt{1-0.36} = 1/0.8 = 1.25$。飞船沿运动方向收缩：$L = L_0/\\gamma = 100/1.25 = 80\\ \\text{m}$，横向尺寸不变。',
      },
      {
        title: '空间站记录的穿越时间',
        detail: '在地面系中飞船长 $80\\ \\text{m}$，以 $0.6c$ 掠过，穿越时间为 $\\Delta t = L/v = 80/(0.6\\times3\\times10^8) \\approx 4.4\\times10^{-7}\\ \\text{s} \\approx 0.44\\ \\mu\\text{s}$。',
      },
      {
        title: '飞船系验证',
        detail: '在飞船系中飞船静长为 $100\\ \\text{m}$，空间站以 $0.6c$ 掠过，穿越时间 $\\Delta t^{\\prime} = 100/(0.6\\times3\\times10^8) \\approx 5.6\\times10^{-7}\\ \\text{s} \\approx 0.56\\ \\mu\\text{s}$。验证：两事件（船头过站、船尾过站）在空间站系同地发生，$\\Delta t$ 是固有时；飞船系测得的应为 $\\Delta t^{\\prime} = \\gamma\\Delta t = 1.25\\times0.44 \\approx 0.56\\ \\mu\\text{s}$，与直接计算一致——长度收缩与时间膨胀是同一时空结构的两个侧面。',
      },
    ],
    answer: '地面测船长 $80\\ \\text{m}$；空间站记录 $\\Delta t \\approx 0.44\\ \\mu\\text{s}$；飞船系测得 $\\Delta t^{\\prime} \\approx 0.56\\ \\mu\\text{s} = \\gamma\\Delta t$，两者满足时间膨胀关系。',
    tags: ['长度收缩', '时间膨胀', '固有时'],
  },

  // ─────────────────────── 速度合成不超光速 ───────────────────────
  {
    id: 'relativity-p3',
    courseId: 'relativity',
    topicId: 'lorentz-transform',
    title: '相对论速度合成：探测器与激光都不超光速',
    difficulty: 2,
    question: '一艘飞船相对地球以 $v = 0.8c$ 沿 $x$ 轴正方向飞行。(1) 飞船沿飞行方向向前发射一枚相对飞船速度为 $u_x^{\\prime} = 0.6c$ 的探测器，求地面测得探测器的速度；(2) 若飞船向前发射一束激光，地面测得的光速是多少？(3) 证明：只要 $|u_x^{\\prime}|<c$、$|v|<c$，用相对论速度变换合成的速度必然小于 $c$。',
    hints: [
      '速度变换 $u_x = \\dfrac{u_x^{\\prime}+v}{1+u_x^{\\prime}v/c^2}$（把 $S^{\\prime}$ 系速度换到 $S$ 系）。',
      '把 $u_x^{\\prime}=c$ 直接代入公式，看分母起了什么作用。',
      '考察函数 $f(u^{\\prime}) = \\dfrac{u^{\\prime}+v}{1+u^{\\prime}v/c^2}$ 与 $c$ 的差并因式分解分子。',
    ],
    solution: [
      {
        title: '探测器速度',
        detail: '代入 $u_x = \\dfrac{u_x^{\\prime}+v}{1+u_x^{\\prime}v/c^2} = \\dfrac{0.6c+0.8c}{1+0.6\\times0.8} = \\dfrac{1.4c}{1.48} \\approx 0.946c$。若按伽利略叠加应得 $1.4c$，相对论修正使其降至 $0.946c$，仍小于 $c$。',
      },
      {
        title: '激光的速度',
        detail: '代入 $u_x^{\\prime}=c$：$u_x = \\dfrac{c+0.8c}{1+0.8\\times1} = \\dfrac{1.8c}{1.8} = c$。光速在速度变换下严格不变，这正是光速不变原理的体现；伽利略叠加在此会错给出 $1.8c$。',
      },
      {
        title: '一般证明',
        detail: '计算 $c - u_x = c - \\dfrac{u^{\\prime}+v}{1+u^{\\prime}v/c^2} = \\dfrac{c(1+u^{\\prime}v/c^2) - u^{\\prime} - v}{1+u^{\\prime}v/c^2} = \\dfrac{c\\left(1 - \\dfrac{v}{c}\\right)\\left(1 - \\dfrac{u^{\\prime}}{c}\\right)}{1+u^{\\prime}v/c^2}$。当 $|v|<c$、$|u^{\\prime}|<c$ 时分子为正，且分母 $1+u^{\\prime}v/c^2 > 1 - |u^{\\prime}v|/c^2 > 0$，故 $u_x < c$。合成速度永不超光速，分母正是"刹车"因子。',
      },
    ],
    answer: '探测器速度 $u_x \\approx 0.946c$；激光仍为 $c$；由 $c - u_x = \\dfrac{c(1-v/c)(1-u^{\\prime}/c)}{1+u^{\\prime}v/c^2} > 0$ 知合成速度恒小于 $c$。',
    tags: ['速度变换', '光速不变', '洛伦兹变换'],
  },

  // ─────────────────────── 双生子佯谬 ───────────────────────
  {
    id: 'relativity-p4',
    courseId: 'relativity',
    topicId: 'spacetime-geometry',
    title: '双生子佯谬：星际旅行者的年龄差',
    difficulty: 3,
    question: '弟弟留在地球，哥哥乘飞船以 $v = 0.8c$ 匀速飞往距地球 $L_0 = 6$ 光年的星球，到达后立即调头（调头时间可忽略）以同样速率返回，兄弟重逢。(1) 求地球系中单程飞行时间与往返总时间；(2) 分别用时间膨胀公式和间隔不变量 $\\Delta s^2 = c^2\\Delta t^2 - \\Delta x^2$ 计算哥哥经历的固有时；(3) 求重逢时两人年龄之差，并说明为何两人处境不对称、佯谬何以消解。',
    hints: [
      '地球系中单程时间 $\\Delta t = L_0/v$，注意 1 光年是光走一年的距离。',
      '固有时 $\\Delta\\tau = \\Delta t\\sqrt{1-v^2/c^2}$；也可由 $\\Delta s^2/c^2$ 直接求。',
      '调头使哥哥从"离开地球系"切换到"迎向地球系"，这不是惯性过程；世界线弯折的一方固有时更短。',
    ],
    solution: [
      {
        title: '地球系中的飞行时间',
        detail: '$v = 0.8c$ 时 $\\gamma = 1/\\sqrt{1-0.64} = 1/0.6 = 5/3$。地球系中单程 $\\Delta t = 6\\ \\text{光年} / (0.8c) = 7.5$ 年，往返共 $15$ 年。弟弟的年龄因此增长了 $15$ 岁。',
      },
      {
        title: '哥哥的固有时（两种算法）',
        detail: '方法一（时间膨胀）：单程固有时 $\\Delta\\tau = \\Delta t/\\gamma = 7.5\\times0.6 = 4.5$ 年，往返共 $9$ 年。方法二（间隔不变量）：单程两事件为"出发"与"到星"，$\\Delta x = 6$ 光年、$\\Delta t = 7.5$ 年，$\\Delta s^2 = c^2(7.5^2 - 6^2) = c^2\\times20.25\\ \\text{年}^2$，故固有时 $\\Delta s/c = 4.5$ 年，往返 $9$ 年。两法一致。',
      },
      {
        title: '年龄差与佯谬的消解',
        detail: '重逢时哥哥 $9$ 岁（经历），弟弟 $15$ 岁（经历），哥哥年轻 $6$ 岁。佯谬的表面矛盾在于"运动是相对的，似乎双方都该觉得对方年轻"。但两人处境并不对称：弟弟的世界线是惯性直线，哥哥的世界线在星球处发生弯折（非惯性过程）。由类时运动"直线世界线固有时最长"可知，绕弯的哥哥固有时必然更短，结论唯一，无矛盾可言。',
      },
    ],
    answer: '地球系往返 $15$ 年；哥哥固有时 $9$ 年；重逢时哥哥比弟弟年轻 $6$ 岁。不对称源于哥哥的调头（非惯性弯折），直线世界线的弟弟固有时最长。',
    tags: ['双生子佯谬', '固有时', '间隔不变量'],
  },

  // ─────────────────────── 质能关系与核反应 ───────────────────────
  {
    id: 'relativity-p5',
    courseId: 'relativity',
    topicId: 'relativistic-dynamics',
    title: '氘氚聚变释放的能量及其分配',
    difficulty: 2,
    question: '聚变反应 $^{2}\\text{H} + \\,^{3}\\text{H} \\rightarrow \\,^{4}\\text{He} + n$ 中各粒子的静止质量为：$m_{\\text{D}} = 2.01410\\ \\text{u}$，$m_{\\text{T}} = 3.01605\\ \\text{u}$，$m_{\\text{He}} = 4.00260\\ \\text{u}$，$m_n = 1.00867\\ \\text{u}$，且 $1\\ \\text{u} = 1.6605\\times10^{-27}\\ \\text{kg}$，$1\\ \\text{u}c^2 = 931.5\\ \\text{MeV}$。求：(1) 该反应的质量亏损与释放能量 $Q$（用 MeV 与焦耳表示）；(2) 设反应初始近似静止，用动量守恒求中子与氦核的动能分配。',
    hints: [
      '质量亏损 $\\Delta m = (m_{\\text{D}} + m_{\\text{T}}) - (m_{\\text{He}} + m_n)$。',
      '$Q = \\Delta m\\,c^2$，可直接用 $1\\ \\text{u}c^2 = 931.5\\ \\text{MeV}$ 换算。',
      '初始总动量为零，末态两粒子动量等大反向，动能与质量成反比。',
    ],
    solution: [
      {
        title: '质量亏损',
        detail: '反应前总质量 $m_{\\text{D}} + m_{\\text{T}} = 2.01410 + 3.01605 = 5.03015\\ \\text{u}$；反应后 $m_{\\text{He}} + m_n = 4.00260 + 1.00867 = 5.01127\\ \\text{u}$。质量亏损 $\\Delta m = 5.03015 - 5.01127 = 0.01888\\ \\text{u}$，约占反应质量的 $0.38\\%$。',
      },
      {
        title: '释放能量',
        detail: '$Q = \\Delta m\\,c^2 = 0.01888 \\times 931.5\\ \\text{MeV} \\approx 17.6\\ \\text{MeV}$。换算为焦耳：$Q = \\Delta m \\times 1.6605\\times10^{-27}\\ \\text{kg} \\times (3\\times10^8\\ \\text{m/s})^2 \\approx 0.01888\\times1.4924\\times10^{-10}\\ \\text{J} \\approx 2.82\\times10^{-12}\\ \\text{J}$。',
      },
      {
        title: '动能分配',
        detail: '初始总动量为零，末态中子与氦核动量等大反向：$p_n = p_{\\text{He}}$。由 $E_k = p^2/2m$（粒子能量为 MeV 量级、可用非相对论近似处理分配比例）得 $E_n/E_{\\text{He}} = m_{\\text{He}}/m_n \\approx 4/1$。故 $E_n \\approx \\dfrac{4}{5}\\times17.6 \\approx 14.1\\ \\text{MeV}$，$E_{\\text{He}} \\approx 3.5\\ \\text{MeV}$。这正是 D-T 聚变作为中子源的特点：大部分能量由中子带走。',
      },
    ],
    answer: '质量亏损 $\\Delta m = 0.01888\\ \\text{u}$；释放 $Q \\approx 17.6\\ \\text{MeV} \\approx 2.82\\times10^{-12}\\ \\text{J}$；中子分得约 $14.1\\ \\text{MeV}$，氦核约 $3.5\\ \\text{MeV}$。',
    tags: ['质能关系', '质量亏损', '动量守恒'],
  },

  // ─────────────────────── 四维动量守恒 ───────────────────────
  {
    id: 'relativity-p6',
    courseId: 'relativity',
    topicId: 'four-vectors',
    title: '不变质量比较：对撞机与固定靶的效率',
    difficulty: 3,
    question: '粒子物理中碰撞的"可用能量"由总四维动量的不变质量 $\\sqrt{s}$ 描述，其中 $s = (P_1 + P_2)^{\\mu}(P_{1\\mu} + P_{2\\mu})$。设电子静能 $m_ec^2 = 0.511\\ \\text{MeV}$。(1) 对撞机中两束电子各以总能量 $E = 5\\ \\text{GeV}$ 对头相撞，求 $\\sqrt{s}$；(2) 若改用固定靶：一束总能量为 $20\\ \\text{GeV}$ 的电子撞击静止电子，求 $\\sqrt{s}$；(3) 比较两种方式的效率并说明对撞机的优势。',
    hints: [
      '在高能物理中取 $c=1$，四维动量 $P^{\\mu} = (E, \\mathbf{p})$，模方 $P^{\\mu}P_{\\mu} = E^2 - p^2 = m^2$。',
      '对头相撞时两束动量等大反向，$\\mathbf{p}_1 + \\mathbf{p}_2 = 0$。',
      '固定靶情形用 $s = m_1^2 + m_2^2 + 2(E_1E_2 - \\mathbf{p}_1\\cdot\\mathbf{p}_2)$，其中 $\\mathbf{p}_2 = 0$。',
    ],
    solution: [
      {
        title: '对撞机情形',
        detail: '两束对头相撞，$E_1 = E_2 = 5\\ \\text{GeV}$，动量等大反向，$\\mathbf{p}_1 + \\mathbf{p}_2 = 0$。故 $s = (E_1+E_2)^2 - |\\mathbf{p}_1+\\mathbf{p}_2|^2 = (10\\ \\text{GeV})^2$，$\\sqrt{s} = 10\\ \\text{GeV}$。全部束流能量都转化为碰撞可用能量。',
      },
      {
        title: '固定靶情形',
        detail: '靶电子静止：$E_2 = m_ec^2 = 0.000511\\ \\text{GeV}$，$\\mathbf{p}_2 = 0$。由不变量公式 $s = m_e^2c^4 + m_e^2c^4 + 2E_1E_2/c^2$（以能量平方为单位），即 $s = 2m^2 + 2E_1E_2 \\approx 2\\times(0.000511)^2 + 2\\times20\\times0.000511 \\approx 0.02044\\ \\text{GeV}^2$。故 $\\sqrt{s} \\approx 0.143\\ \\text{GeV}$。',
      },
      {
        title: '效率比较',
        detail: '对撞机用 $2\\times5 = 10\\ \\text{GeV}$ 的束流功率获得 $\\sqrt{s} = 10\\ \\text{GeV}$；固定靶用 $20\\ \\text{GeV}$ 却只得 $0.143\\ \\text{GeV}$，两者之比约 $70$ 倍。原因是固定靶情形下大量能量消耗在维持碰后系统整体运动（质心运动）上，由 $\\sqrt{s} \\approx \\sqrt{2mE_1}$ 可知可用能量只随束流能量的平方根缓慢增长。这正是高能对撞机（如 LEP、LHC）取代固定靶加速器的根本原因。',
      },
    ],
    answer: '对撞机 $\\sqrt{s} = 10\\ \\text{GeV}$；固定靶 $\\sqrt{s} \\approx 0.143\\ \\text{GeV}$；同样量级束流下对撞机的可用能量高约 $70$ 倍。',
    tags: ['四维动量', '不变质量', '对撞机'],
  },

  // ─────────────────────── 同时性的相对性 ───────────────────────
  {
    id: 'relativity-p7',
    courseId: 'relativity',
    topicId: 'postulates',
    title: '列车与月台：闪电事件的同时性是相对的',
    difficulty: 1,
    question: '一列高速列车以 $v = 0.6c$ 沿 $x$ 方向匀速通过月台。月台参考系 $S$ 中，两道闪电在 $t = 0$ 时刻同时击中车尾（$x_1 = 0$）与车头（$x_2 = 240\\ \\text{m}$），这两点正是该时刻列车两端在 $S$ 系中的位置。求：(1) 两事件在 $S$ 系中的 $\\Delta x$、$\\Delta t$ 与时空间隔 $\\Delta s^2$，并判断间隔类型；(2) 用洛伦兹变换求列车参考系 $S^{\\prime}$ 中两事件的 $\\Delta t^{\\prime}$ 与 $\\Delta x^{\\prime}$，指出哪一道闪电先发生；(3) 若要求在列车系 $S^{\\prime}$ 中两道闪电同时发生，则 $S$ 系中两次击中的时间差 $\\Delta t$ 应为多少？（以下均取 $\\Delta X = X_2 - X_1$，$c = 3.0\\times10^8\\ \\text{m/s}$。）',
    hints: [
      '先算 $\\gamma = 1/\\sqrt{1 - 0.6^2} = 1.25$，再用洛伦兹变换 $\\Delta t^{\\prime} = \\gamma(\\Delta t - v\\Delta x/c^2)$、$\\Delta x^{\\prime} = \\gamma(\\Delta x - v\\Delta t)$。',
      '时空间隔 $\\Delta s^2 = c^2\\Delta t^2 - \\Delta x^2$ 是不变量；$\\Delta s^2 < 0$ 为类空间隔，其时序在不同惯性系中可以颠倒。',
      '要求 $S^{\\prime}$ 系中同时，即令 $\\Delta t^{\\prime} = 0$ 反解 $S$ 系所需的 $\\Delta t$。',
    ],
    solution: [
      {
        title: '月台系中的间隔与类型',
        detail: '$\\Delta x = x_2 - x_1 = 240\\ \\text{m}$，$\\Delta t = 0$。时空间隔\\n$$\\Delta s^2 = c^2\\Delta t^2 - \\Delta x^2 = 0 - (240)^2 = -5.76\\times10^4\\ \\text{m}^2 < 0$$\\n$\\Delta s^2 < 0$ 表明两事件为**类空间隔**：它们相距太远、时间太近，连光都来不及从一个传到另一个，因此不存在因果联系，其先后顺序可以随参考系而改变。这正是"同时性是相对的"成立的前提——有因果联系的类时间隔事件，时序在任何惯性系中都保持一致。',
      },
      {
        title: '列车系中的时间差与空间间隔',
        detail: '$\\gamma = 1/\\sqrt{1 - 0.36} = 1/0.8 = 1.25$，$v\\Delta x/c^2 = \\dfrac{0.6\\times3.0\\times10^8\\times240}{(3.0\\times10^8)^2} = \\dfrac{4.32\\times10^{10}}{9.0\\times10^{16}} = 4.8\\times10^{-7}\\ \\text{s}$。\\n$$\\Delta t^{\\prime} = \\gamma\\left(\\Delta t - \\frac{v\\Delta x}{c^2}\\right) = 1.25\\times(0 - 4.8\\times10^{-7}) = -6.0\\times10^{-7}\\ \\text{s}$$\\n$$\\Delta x^{\\prime} = \\gamma(\\Delta x - v\\Delta t) = 1.25\\times240 = 300\\ \\text{m}$$\\n$\\Delta t^{\\prime} < 0$ 说明在列车系中**车头那道闪电先发生**，比车尾早 $0.60\\ \\mu\\text{s}$。而 $\\Delta x^{\\prime} = 300\\ \\text{m}$ 恰是列车的静止长度——与"动尺缩短"（$S$ 系中列车长 $300/\\gamma = 240\\ \\text{m}$）完全自洽，两条结果互为印证。',
      },
      {
        title: '要求列车系同时发生的条件与不变量校验',
        detail: '令 $\\Delta t^{\\prime} = \\gamma(\\Delta t - v\\Delta x/c^2) = 0$，得 $\\Delta t = v\\Delta x/c^2 = 4.8\\times10^{-7}\\ \\text{s}$。即月台系中必须先击中车尾、过 $0.48\\ \\mu\\text{s}$ 再击中车头，列车系中两事件才同时。这与上一问互为逆命题：同一个物理事实在不同参考系中呈现为"车头先、同时、车尾先"三种说法，三者都对。\\n不变量校验（取 $\\Delta t = 0$ 的原始情形）：\\n$$c^2(\\Delta t^{\\prime})^2 - (\\Delta x^{\\prime})^2 = 9.0\\times10^{16}\\times(6.0\\times10^{-7})^2 - (300)^2 = 3.24\\times10^4 - 9.0\\times10^4 = -5.76\\times10^4\\ \\text{m}^2$$\\n与 $S$ 系中的 $\\Delta s^2$ 完全相同，计算无误。',
      },
    ],
    answer: '$S$ 系：$\\Delta x = 240\\ \\text{m}$、$\\Delta t = 0$，$\\Delta s^2 = -5.76\\times10^4\\ \\text{m}^2 < 0$ 为类空间隔；$S^{\\prime}$ 系：$\\Delta t^{\\prime} = -6.0\\times10^{-7}\\ \\text{s}$（车头闪电早 $0.60\\ \\mu\\text{s}$）、$\\Delta x^{\\prime} = 300\\ \\text{m}$；要使 $S^{\\prime}$ 系中同时，须在 $S$ 系中令车尾闪电提前 $\\Delta t = v\\Delta x/c^2 = 4.8\\times10^{-7}\\ \\text{s}$。',
    tags: ['同时性的相对性', '洛伦兹变换', '时空间隔'],
  },

  // ─────────────────────── 电磁场的洛伦兹变换 ───────────────────────
  {
    id: 'relativity-p8',
    courseId: 'relativity',
    topicId: 'em-relativity',
    title: '电场与磁场的洛伦兹变换及电磁场不变量',
    difficulty: 3,
    question: '实验室系 $S$ 中存在沿 $y$ 方向的均匀电场 $E_y = 3.0\\times10^6\\ \\text{V/m}$，无磁场。惯性系 $S^{\\prime}$ 以 $v = 0.6c$ 沿 $x$ 方向相对 $S$ 运动（$\\beta = 0.6$，$\\gamma = 1.25$，$c = 3.0\\times10^8\\ \\text{m/s}$）。求：(1) 用场变换公式求 $S^{\\prime}$ 系中的 $\\vec{E}^{\\prime}$ 与 $\\vec{B}^{\\prime}$，并写出低速极限下的矢量形式；(2) 用电磁场不变量 $\\vec{E}\\cdot\\vec{B}$ 与 $E^2 - c^2B^2$ 检验结果；(3) 若 $S$ 系中另加沿 $z$ 方向的磁场 $B_z = 1.0\\times10^{-2}\\ \\text{T}$（此时 $E = cB$），重求 $E^{\\prime}_y$ 与 $B^{\\prime}_z$，并说明场振幅变化与光的多普勒效应的关系。',
    hints: [
      '沿 $x$ 方向 boost 的场变换为 $E^{\\prime}_x = E_x$，$E^{\\prime}_y = \\gamma(E_y - vB_z)$，$B^{\\prime}_x = B_x$，$B^{\\prime}_z = \\gamma(B_z - vE_y/c^2)$。',
      '两个电磁场不变量 $\\vec{E}\\cdot\\vec{B}$ 与 $E^2 - c^2B^2$ 在任何惯性系中取值相同。',
      '平面电磁波满足 $\\vec{E}\\perp\\vec{B}$ 且 $E = cB$；其振幅变换因子 $\\gamma(1-\\beta) = \\sqrt{(1-\\beta)/(1+\\beta)}$ 正是纵向多普勒因子。',
    ],
    solution: [
      {
        title: '纯电场在运动参考系中产生磁场',
        detail: '取 $S$ 系中 $\\vec{E} = (0,\\,3.0\\times10^6,\\,0)\\ \\text{V/m}$、$\\vec{B} = \\mathbf{0}$。代入场变换公式：\\n$$E^{\\prime}_y = \\gamma(E_y - vB_z) = 1.25\\times(3.0\\times10^6 - 0) = 3.75\\times10^6\\ \\text{V/m}$$\\n$$B^{\\prime}_z = \\gamma\\left(B_z - \\frac{vE_y}{c^2}\\right) = 1.25\\times\\left(0 - \\frac{0.6\\times3.0\\times10^8\\times3.0\\times10^6}{(3.0\\times10^8)^2}\\right) = 1.25\\times(-6.0\\times10^{-3}) = -7.5\\times10^{-3}\\ \\text{T}$$\\n其余分量 $E^{\\prime}_x = E^{\\prime}_z = 0$、$B^{\\prime}_x = B^{\\prime}_y = 0$。矢量形式为\\n$$\\vec{B}^{\\prime} = -\\gamma\\frac{\\vec{v}\\times\\vec{E}}{c^2}$$\\n低速（$\\gamma\\approx1$）下即运动点电荷的磁场公式 $\\vec{B} = \\vec{v}\\times\\vec{E}/c^2$（符号取决于参考系的相对运动方向）。可见"纯电场"不是绝对概念：在另一个惯性系中它必然伴随磁场——磁场是电场的相对论效应。',
      },
      {
        title: '用电磁场不变量检验',
        detail: '$S$ 系：$\\vec{E}\\cdot\\vec{B} = 0$；$E^2 - c^2B^2 = (3.0\\times10^6)^2 - 0 = 9.0\\times10^{12}\\ (\\text{V/m})^2$。\\n$S^{\\prime}$ 系：$\\vec{E}^{\\prime}\\cdot\\vec{B}^{\\prime} = 0$（$\\vec{E}^{\\prime}$ 沿 $y$、$\\vec{B}^{\\prime}$ 沿 $z$，仍正交）；\\n$$E^{\\prime 2} - c^2B^{\\prime 2} = (3.75\\times10^6)^2 - 9.0\\times10^{16}\\times(7.5\\times10^{-3})^2 = 1.406\\times10^{13} - 5.063\\times10^{12} = 9.0\\times10^{12}\\ (\\text{V/m})^2$$\\n两不变量在两系中数值完全相同，计算无误。附带结论：由于 $\\vec{E}\\cdot\\vec{B} = 0$ 而 $E^2 - c^2B^2 \\ne 0$，不可能找到某个参考系使磁场（或电场）完全消失——只有平面波（$E = cB$、$\\vec{E}\\perp\\vec{B}$）这类零不变量场才在所有参考系中保持 $E = cB$。',
      },
      {
        title: '平面电磁波情形与多普勒因子',
        detail: '加入 $B_z = 1.0\\times10^{-2}\\ \\text{T}$ 后 $cB = 3.0\\times10^8\\times1.0\\times10^{-2} = 3.0\\times10^6\\ \\text{V/m} = E$，且 $\\vec{E}\\perp\\vec{B}$，这是沿 $+x$ 传播的平面电磁波。\\n$$E^{\\prime}_y = \\gamma(E_y - vB_z) = 1.25\\times(3.0\\times10^6 - 1.8\\times10^8\\times1.0\\times10^{-2}) = 1.25\\times1.2\\times10^6 = 1.5\\times10^6\\ \\text{V/m}$$\\n$$B^{\\prime}_z = \\gamma\\left(B_z - \\frac{vE_y}{c^2}\\right) = 1.25\\times(1.0\\times10^{-2} - 6.0\\times10^{-3}) = 5.0\\times10^{-3}\\ \\text{T}$$\\n检验：$cB^{\\prime} = 3.0\\times10^8\\times5.0\\times10^{-3} = 1.5\\times10^6\\ \\text{V/m} = E^{\\prime}$，即变换后仍满足 $E^{\\prime} = cB^{\\prime}$，两个不变量仍同为零。振幅比为\\n$$\\frac{E^{\\prime}}{E} = \\frac{1.5\\times10^6}{3.0\\times10^6} = 0.5 = \\gamma(1-\\beta) = \\sqrt{\\frac{1-\\beta}{1+\\beta}} = \\sqrt{\\frac{0.4}{1.6}}$$\\n这正是纵向多普勒因子：观察者沿波的传播方向运动，观测到的频率与场振幅都按该因子缩小（红移）。平面电磁波变换后仍是平面电磁波、传播方向不变、速度仍为 $c$——光速不变原理在场的语言中的直接体现，也是麦克斯韦方程组天然协变的最好注脚。',
      },
    ],
    answer: '$\\vec{E}^{\\prime} = (0,\\,3.75\\times10^6,\\,0)\\ \\text{V/m}$，$\\vec{B}^{\\prime} = (0,\\,0,\\,-7.5\\times10^{-3})\\ \\text{T}$，即 $\\vec{B}^{\\prime} = -\\gamma(\\vec{v}\\times\\vec{E})/c^2$；不变量 $\\vec{E}\\cdot\\vec{B} = 0$、$E^2 - c^2B^2 = 9.0\\times10^{12}\\ (\\text{V/m})^2$ 在两系中相同；加磁场后 $E^{\\prime}_y = 1.5\\times10^6\\ \\text{V/m}$、$B^{\\prime}_z = 5.0\\times10^{-3}\\ \\text{T}$，仍满足 $E^{\\prime} = cB^{\\prime}$，场振幅按多普勒因子 $0.5$ 缩放。',
    tags: ['电磁场张量', '场的洛伦兹变换', '电磁场不变量', '多普勒效应'],
  },
];
