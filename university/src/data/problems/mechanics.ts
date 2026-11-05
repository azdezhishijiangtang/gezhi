import type { Problem } from '@/types';

export const mechanicsProblems: Problem[] = [
  // ─────────────────────── 质点运动学 ───────────────────────
  {
    id: 'mechanics-p1',
    courseId: 'mechanics',
    topicId: 'kinematics',
    title: '斜抛运动的射程与最大高度',
    difficulty: 1,
    question: '以初速度 $v_0 = 20\\ \\text{m/s}$、与水平夹角 $\\theta = 30^\\circ$ 将小球斜向上抛出，忽略空气阻力，取 $g = 10\\ \\text{m/s}^2$。求：(1) 飞行时间 $T$；(2) 水平射程 $R$；(3) 最大高度 $H$。',
    hints: [
      '将运动分解为水平匀速与竖直匀变速两个独立分量，二者通过共同的时间 $t$ 联系。',
      '竖直方向初速分量为 $v_0\\sin\\theta$，落地时 $y=0$ 可解出飞行时间 $T$。',
      '水平射程 $R = v_0\\cos\\theta \\cdot T$；最大高度由竖直分运动速度为零的时刻给出。',
    ],
    solution: [
      {
        title: '分解初速度',
        detail: '水平分量 $v_{0x} = v_0\\cos30^\\circ = 20 \\cdot \\frac{\\sqrt{3}}{2} = 10\\sqrt{3}\\ \\text{m/s}$；竖直分量 $v_{0y} = v_0\\sin30^\\circ = 20 \\cdot \\frac12 = 10\\ \\text{m/s}$。',
      },
      {
        title: '求飞行时间',
        detail: '竖直位移 $y = v_{0y}T - \\frac12 g T^2 = 0$，因 $T>0$ 得 $T = \\dfrac{2v_{0y}}{g} = \\dfrac{2 \\times 10}{10} = 2\\ \\text{s}$。',
      },
      {
        title: '求水平射程',
        detail: '$R = v_{0x} T = 10\\sqrt{3} \\times 2 = 20\\sqrt{3} \\approx 34.6\\ \\text{m}$。',
      },
      {
        title: '求最大高度',
        detail: '到达最高点时竖直速度为零，$H = \\dfrac{v_{0y}^2}{2g} = \\dfrac{10^2}{2 \\times 10} = 5\\ \\text{m}$。',
      },
    ],
    answer: '$T = 2\\ \\text{s},\\quad R = 20\\sqrt{3}\\ \\text{m}\\ (\\approx 34.6\\ \\text{m}),\\quad H = 5\\ \\text{m}$',
    tags: ['抛体运动', '运动分解', '运动学'],
  },

  // ─────────────────────── 牛顿运动定律 ───────────────────────
  {
    id: 'mechanics-p2',
    courseId: 'mechanics',
    topicId: 'newton-laws',
    title: '斜面上物块的下滑与减速上滑',
    difficulty: 2,
    question: '质量 $m = 2\\ \\text{kg}$ 的物块置于倾角 $\\alpha = 30^\\circ$ 的斜面上，与斜面间动摩擦因数 $\\mu = 0.2$，$g = 10\\ \\text{m/s}^2$。求：(1) 物块沿斜面下滑的加速度 $a$；(2) 若给物块一个沿斜面向上的初速度 $v_0 = 5\\ \\text{m/s}$，它能上滑的最大距离 $s$。',
    hints: [
      '沿斜面与垂直斜面方向分解重力，法向力 $N = mg\\cos\\alpha$。',
      '下滑时摩擦力向上，合力为 $mg\\sin\\alpha - f$，其中 $f = \\mu N$。',
      '上滑时摩擦力反向（向下），与重力分量共同阻碍运动，用 $v^2 = 2as$ 求距离。',
    ],
    solution: [
      {
        title: '受力分解',
        detail: '法向 $N = mg\\cos30^\\circ = 2 \\times 10 \\times \\frac{\\sqrt{3}}{2} = 10\\sqrt{3}\\ \\text{N}$；滑动摩擦力 $f = \\mu N = 0.2 \\times 10\\sqrt{3} = 2\\sqrt{3}\\ \\text{N}$。',
      },
      {
        title: '下滑加速度',
        detail: '沿斜面向下为正，合力 $F = mg\\sin30^\\circ - f = 2\\times10\\times\\frac12 - 2\\sqrt{3} = 10 - 2\\sqrt{3}$。故 $a = \\dfrac{F}{m} = \\dfrac{10 - 2\\sqrt{3}}{2} = 5 - \\sqrt{3} \\approx 3.27\\ \\text{m/s}^2$。',
      },
      {
        title: '上滑减速',
        detail: '上滑时摩擦力向下，与重力分量同向，减速度大小 $a^{\\prime} = \\dfrac{mg\\sin30^\\circ + f}{m} = \\dfrac{10 + 2\\sqrt{3}}{2} = 5 + \\sqrt{3} \\approx 6.73\\ \\text{m/s}^2$。',
      },
      {
        title: '最大上滑距离',
        detail: '末速度为零，$s = \\dfrac{v_0^2}{2a^{\\prime}} = \\dfrac{25}{2(5 + \\sqrt{3})} \\approx \\dfrac{25}{12.928} \\approx 1.93\\ \\text{m}$。',
      },
    ],
    answer: '下滑加速度 $a = 5 - \\sqrt{3}\\ \\text{m/s}^2\\ (\\approx 3.27)$；最大上滑距离 $s = \\dfrac{25}{2(5+\\sqrt{3})}\\ \\text{m}\\ (\\approx 1.93)$',
    tags: ['牛顿第二定律', '斜面', '摩擦力'],
  },

  // ─────────────────────── 动量与冲量 ───────────────────────
  {
    id: 'mechanics-p3',
    courseId: 'mechanics',
    topicId: 'momentum',
    title: '子弹打入木块的完全非弹性碰撞',
    difficulty: 2,
    question: '质量 $m = 0.01\\ \\text{kg}$ 的子弹以 $v = 400\\ \\text{m/s}$ 水平射入静止于光滑水平面的木块 $M = 1.99\\ \\text{kg}$，子弹留在木块中（完全非弹性碰撞）。求：(1) 碰后共同速度 $V$；(2) 碰撞中损失的机械能 $\\Delta E$。',
    hints: [
      '水平方向无外力，系统动量守恒。',
      '碰后共速 $V = \\dfrac{mv}{m+M}$。',
      '损失的动能等于碰前动能减去碰后动能，几乎全部转化为内能。',
    ],
    solution: [
      {
        title: '动量守恒求共速',
        detail: '碰前总动量 $p = mv = 0.01 \\times 400 = 4\\ \\text{kg}\\cdot\\text{ m/s}$；碰后总质量 $m+M = 2.00\\ \\text{kg}$。由 $mv = (m+M)V$ 得 $V = \\dfrac{4}{2.00} = 2\\ \\text{m/s}$。',
      },
      {
        title: '碰前动能',
        detail: '$E_{k1} = \\dfrac12 m v^2 = \\dfrac12 \\times 0.01 \\times 400^2 = 800\\ \\text{J}$。',
      },
      {
        title: '碰后动能',
        detail: '$E_{k2} = \\dfrac12 (m+M)V^2 = \\dfrac12 \\times 2.00 \\times 2^2 = 4\\ \\text{J}$。',
      },
      {
        title: '机械能损失',
        detail: '$\\Delta E = E_{k1} - E_{k2} = 800 - 4 = 796\\ \\text{J}$。可见绝大部分机械能转化为内能。',
      },
    ],
    answer: '$V = 2\\ \\text{m/s}$；损失机械能 $\\Delta E = 796\\ \\text{J}$',
    tags: ['动量守恒', '完全非弹性碰撞', '能量损失'],
  },

  // ─────────────────────── 功与能 ───────────────────────
  {
    id: 'mechanics-p4',
    courseId: 'mechanics',
    topicId: 'work-energy',
    title: '圆弧下滑经粗糙水平段压缩弹簧',
    difficulty: 3,
    question: '质量 $m = 1\\ \\text{kg}$ 的小物块从半径 $R = 0.8\\ \\text{m}$ 的 $\\frac14$ 光滑圆弧轨道顶端由静止滑下，进入水平段；水平段有摩擦（动摩擦因数 $\\mu = 0.2$），末端连接劲度系数 $k = 100\\ \\text{N/m}$ 的轻弹簧。物块最终在弹簧最大压缩处瞬时静止。求弹簧最大压缩量 $x$（$g = 10\\ \\text{m/s}^2$）。',
    hints: [
      '圆弧段光滑，到底部时由机械能守恒求速度或动能。',
      '水平段同时存在摩擦力做功与弹簧弹力做功。',
      '对"底部到最大压缩"用动能定理：初动能 = 摩擦耗散 + 弹簧弹性势能，得到关于 $x$ 的二次方程。',
    ],
    solution: [
      {
        title: '圆弧底端动能',
        detail: '光滑圆弧上机械能守恒：$mgR = \\dfrac12 m v^2$，故 $v^2 = 2gR = 2\\times10\\times0.8 = 16$，初动能 $E_k = \\dfrac12 m v^2 = \\dfrac12 \\times 1 \\times 16 = 8\\ \\text{J}$。',
      },
      {
        title: '水平段受力',
        detail: '摩擦力 $f = \\mu mg = 0.2 \\times 1 \\times 10 = 2\\ \\text{N}$，从底端到最大压缩位移为 $x$，摩擦做功 $W_f = -f x = -2x$。弹簧弹性势能 $E_p = \\dfrac12 k x^2 = 50 x^2$。',
      },
      {
        title: '动能定理列方程',
        detail: '末动能为零，对底部到最大压缩：$E_k + W_f = E_p$，即 $8 - 2x = 50 x^2$。整理得 $50x^2 + 2x - 8 = 0$。',
      },
      {
        title: '解二次方程',
        detail: '$x = \\dfrac{-2 + \\sqrt{2^2 + 4\\times50\\times8}}{2\\times50} = \\dfrac{-2 + \\sqrt{1604}}{100} \\approx \\dfrac{-2 + 40.05}{100} \\approx 0.3805\\ \\text{m}$。负根舍去。',
      },
    ],
    answer: '$x = \\dfrac{-2 + \\sqrt{1604}}{100}\\ \\text{m} \\approx 0.38\\ \\text{m}$',
    tags: ['动能定理', '机械能守恒', '弹簧', '摩擦做功'],
  },

  // ─────────────────────── 角动量 ───────────────────────
  {
    id: 'mechanics-p5',
    courseId: 'mechanics',
    topicId: 'angular-momentum',
    title: '收臂旋转的的角动量守恒',
    difficulty: 2,
    question: '一人站在可无摩擦自由转动的转盘上，初始张开双臂，系统转动惯量 $I_1 = 3\\ \\text{kg}\\cdot\\text{ m}^2$，角速度 $\\omega_1 = 2\\ \\text{rad/s}$。他将双臂收拢后系统转动惯量变为 $I_2 = 1\\ \\text{kg}\\cdot\\text{ m}^2$。求：(1) 收臂后的角速度 $\\omega_2$；(2) 系统转动动能的变化量。',
    hints: [
      '转轴竖直且系统不受外力矩，角动量守恒：$I_1\\omega_1 = I_2\\omega_2$。',
      '转动动能 $E_k = \\dfrac12 I\\omega^2$，代入守恒后的 $\\omega_2$ 计算。',
      '动能增加来自人收臂时肌肉所做的功。',
    ],
    solution: [
      {
        title: '角动量守恒',
        detail: '对竖直轴合外力矩为零，$I_1\\omega_1 = I_2\\omega_2$，故 $\\omega_2 = \\dfrac{I_1}{I_2}\\omega_1 = \\dfrac{3}{1} \\times 2 = 6\\ \\text{rad/s}$。',
      },
      {
        title: '初态转动动能',
        detail: '$E_{k1} = \\dfrac12 I_1 \\omega_1^2 = \\dfrac12 \\times 3 \\times 2^2 = 6\\ \\text{J}$。',
      },
      {
        title: '末态转动动能',
        detail: '$E_{k2} = \\dfrac12 I_2 \\omega_2^2 = \\dfrac12 \\times 1 \\times 6^2 = 18\\ \\text{J}$。',
      },
      {
        title: '动能变化',
        detail: '$\\Delta E_k = E_{k2} - E_{k1} = 18 - 6 = 12\\ \\text{J}$（由人收臂做功提供，总能量守恒）。',
      },
    ],
    answer: '$\\omega_2 = 6\\ \\text{rad/s}$；转动动能增加 $12\\ \\text{J}$',
    tags: ['角动量守恒', '转动惯量', '转动动能'],
  },

  // ─────────────────────── 简谐振动 ───────────────────────
  {
    id: 'mechanics-p6',
    courseId: 'mechanics',
    topicId: 'oscillations',
    title: '弹簧振子的周期与运动状态',
    difficulty: 1,
    question: '弹簧振子质量 $m = 0.1\\ \\text{kg}$，劲度系数 $k = 40\\ \\text{N/m}$，把振子从平衡位置拉离 $x_0 = 0.05\\ \\text{m}$ 后由静止释放。求：(1) 角频率 $\\omega$ 与周期 $T$；(2) 振幅 $A$ 与初相 $\\varphi$（取余弦形式）；(3) $t = \\pi/40\\ \\text{s}$ 时的位移与速度；(4) 最大速度 $v_{\\max}$。',
    hints: [
      '角频率 $\\omega = \\sqrt{k/m}$，周期 $T = 2\\pi/\\omega$。',
      '由静止释放于最大位移处，故振幅等于 $x_0$，初相 $\\varphi = 0$（余弦形式）。',
      '位移 $x = A\\cos(\\omega t)$，速度 $v = -A\\omega\\sin(\\omega t)$。',
    ],
    solution: [
      {
        title: '角频率与周期',
        detail: '$\\omega = \\sqrt{\\dfrac{k}{m}} = \\sqrt{\\dfrac{40}{0.1}} = \\sqrt{400} = 20\\ \\text{rad/s}$；$T = \\dfrac{2\\pi}{\\omega} = \\dfrac{2\\pi}{20} = \\dfrac{\\pi}{10} \\approx 0.314\\ \\text{s}$。',
      },
      {
        title: '振幅与初相',
        detail: '由静止在 $x_0 = 0.05\\ \\text{m}$ 处释放，故振幅 $A = 0.05\\ \\text{m}$，初相 $\\varphi = 0$，运动方程 $x = 0.05\\cos(20t)$。',
      },
      {
        title: '指定时刻的状态',
        detail: '$t = \\pi/40$ 时，$\\omega t = 20 \\times \\dfrac{\\pi}{40} = \\dfrac{\\pi}{2}$。位移 $x = 0.05\\cos(\\pi/2) = 0$；速度 $v = -0.05 \\times 20 \\times \\sin(\\pi/2) = -1\\ \\text{m/s}$。',
      },
      {
        title: '最大速度',
        detail: '$v_{\\max} = A\\omega = 0.05 \\times 20 = 1\\ \\text{m/s}$（出现在平衡位置）。',
      },
    ],
    answer: '$\\omega = 20\\ \\text{rad/s},\\ T = \\pi/10\\ \\text{s},\\ A = 0.05\\ \\text{m},\\ \\varphi = 0$；位移 $0$、速度 $-1\\ \\text{m/s}$；$v_{\\max} = 1\\ \\text{m/s}$',
    tags: ['简谐振动', '弹簧振子', '旋转矢量'],
  },
];
