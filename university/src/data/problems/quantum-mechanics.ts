import type { Problem } from '@/types';

export const quantum_mechanicsProblems: Problem[] = [
  // ─────────────────────── 一维定态问题 ───────────────────────
  {
    id: 'quantum-mechanics-p1',
    courseId: 'quantum-mechanics',
    topicId: '1d-potentials',
    title: '无限深势阱中电子的能级与跃迁',
    difficulty: 1,
    question: '电子被束缚在宽度 $a = 1\\ \\text{nm}$ 的一维无限深势阱内（阱内势能为零，阱外势能无穷大）。已知电子质量 $m = 9.11\\times10^{-31}\\ \\text{kg}$，$\\hbar = 1.055\\times10^{-34}\\ \\text{J}\\cdot\\text{ s}$，$1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}$。求：(1) 定态能量与波函数的一般表达式；(2) 基态能量 $E_1$（用 eV 表示）；(3) 电子从 $n = 2$ 跃迁到 $n = 1$ 发出光子的波长；(4) 基态下电子出现在 $0 < x < a/4$ 区域内的概率。',
    hints: [
      '阱内波函数满足自由粒子薛定谔方程，通解为 $\\psi = A\\sin kx + B\\cos kx$；边界条件 $\\psi(0) = \\psi(a) = 0$ 给出量子化条件 $k = n\\pi/a$。',
      '能级 $E_n = n^2\\pi^2\\hbar^2/(2ma^2)$；光子波长由 $hc/\\lambda = E_2 - E_1$ 求出，可用 $hc = 1240\\ \\text{eV}\\cdot\\text{ nm}$。',
      '概率 = $\\int_0^{a/4} |\\psi_1|^2 dx$，利用 $\\sin^2 u = \\frac{1 - \\cos 2u}{2}$ 积分。',
    ],
    solution: [
      {
        title: '阱内求解与量子化',
        detail: '阱内 $-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} = E\\psi$，通解 $\\psi = A\\sin kx + B\\cos kx$，$k = \\sqrt{2mE}/\\hbar$。$\\psi(0) = 0$ 要求 $B = 0$；$\\psi(a) = 0$ 要求 $\\sin ka = 0$，即 $k = n\\pi/a$（$n = 1, 2, \\ldots$）。',
      },
      {
        title: '能级与波函数',
        detail: '$E_n = \\dfrac{n^2\\pi^2\\hbar^2}{2ma^2}$，$\\psi_n(x) = \\sqrt{2/a}\\,\\sin\\dfrac{n\\pi x}{a}$。代入数值：$E_1 = \\dfrac{\\pi^2 \\times (1.055\\times10^{-34})^2}{2 \\times 9.11\\times10^{-31} \\times (10^{-9})^2} \\approx 6.03\\times10^{-20}\\ \\text{J} \\approx 0.376\\ \\text{eV}$。',
      },
      {
        title: '跃迁光子波长',
        detail: '$\\Delta E = E_2 - E_1 = 4E_1 - E_1 = 3E_1 \\approx 1.13\\ \\text{eV}$，故 $\\lambda = \\dfrac{hc}{\\Delta E} = \\dfrac{1240}{1.13} \\approx 1.1\\times10^3\\ \\text{nm}$（近红外）。',
      },
      {
        title: '基态位置概率',
        detail: '$P = \\dfrac{2}{a}\\int_0^{a/4}\\sin^2\\dfrac{\\pi x}{a}dx$。令 $u = \\pi x/a$：$P = \\dfrac{2}{\\pi}\\int_0^{\\pi/4}\\sin^2 u\\, du = \\dfrac{2}{\\pi}\\left[\\dfrac{u}{2} - \\dfrac{\\sin 2u}{4}\\right]_0^{\\pi/4} = \\dfrac{2}{\\pi}\\left(\\dfrac{\\pi}{8} - \\dfrac{1}{4}\\right) = \\dfrac{1}{4} - \\dfrac{1}{2\\pi} \\approx 0.091$。',
      },
    ],
    answer: '$E_n = n^2\\pi^2\\hbar^2/(2ma^2)$，$E_1 \\approx 0.376\\ \\text{eV}$；跃迁光子 $\\lambda \\approx 1.1\\times10^3\\ \\text{nm}$；$P(0 < x < a/4) = \\dfrac{1}{4} - \\dfrac{1}{2\\pi} \\approx 9.1\\%$',
    tags: ['无限深势阱', '定态薛定谔方程', '量子跃迁'],
  },

  // ─────────────────────── 第一章 波函数与薛定谔方程 ───────────────────────
  {
    id: 'quantum-mechanics-p2',
    courseId: 'quantum-mechanics',
    topicId: 'wave-function',
    title: '谐振子基态的验证与零点能',
    difficulty: 2,
    question: '一维谐振子 $V(x) = \\frac{1}{2}m\\omega^2x^2$ 的基态波函数可写为 $\\psi_0(x) = A\\, e^{-\\alpha x^2/2}$，其中 $\\alpha = m\\omega/\\hbar$。(1) 由归一化条件确定常数 $A$；(2) 将 $\\psi_0$ 代入定态薛定谔方程，证明基态能量 $E_0 = \\frac{1}{2}\\hbar\\omega$；(3) 计算 $\\Delta x$ 与 $\\Delta p$，验证 $\\Delta x\\,\\Delta p = \\hbar/2$，并说明为什么零点能不可能为零。',
    hints: [
      '归一化需要高斯积分 $\\int_{-\\infty}^{+\\infty} e^{-\\beta x^2}dx = \\sqrt{\\pi/\\beta}$。',
      '$\\psi_0$ 的二阶导数满足 $\\psi_0^{\\prime\\prime} = (\\alpha^2x^2 - \\alpha)\\psi_0$；代入方程后按 $x^2$ 项与常数项分别比较。',
      '$\\langle x^2\\rangle = \\frac{1}{2\\alpha}$；$\\langle p^2\\rangle$ 可由谐振子维里定理 $\\langle T\\rangle = \\langle V\\rangle = E_0/2$ 得到。',
    ],
    solution: [
      {
        title: '归一化',
        detail: '$1 = A^2\\int_{-\\infty}^{+\\infty} e^{-\\alpha x^2}dx = A^2\\sqrt{\\pi/\\alpha}$，故 $A = \\left(\\dfrac{\\alpha}{\\pi}\\right)^{1/4} = \\left(\\dfrac{m\\omega}{\\pi\\hbar}\\right)^{1/4}$。',
      },
      {
        title: '代入定态薛定谔方程',
        detail: '由 $\\psi_0^{\\prime\\prime} = (\\alpha^2x^2 - \\alpha)\\psi_0$，方程左边为 $-\\dfrac{\\hbar^2}{2m}(\\alpha^2x^2 - \\alpha)\\psi_0 + \\dfrac{1}{2}m\\omega^2x^2\\psi_0$。其 $x^2$ 项系数为 $-\\dfrac{\\hbar^2\\alpha^2}{2m} + \\dfrac{m\\omega^2}{2}$，代入 $\\alpha = m\\omega/\\hbar$ 恰好为零；常数项为 $\\dfrac{\\hbar^2\\alpha}{2m} = \\dfrac{\\hbar\\omega}{2}$。故 $\\psi_0$ 是本征态，$E_0 = \\dfrac{1}{2}\\hbar\\omega$。',
      },
      {
        title: '不确定度乘积',
        detail: '$|\\psi_0|^2 \\propto e^{-\\alpha x^2}$ 是偶函数高斯分布：$\\langle x\\rangle = 0$，$\\langle x^2\\rangle = \\dfrac{1}{2\\alpha} = \\dfrac{\\hbar}{2m\\omega}$，故 $\\Delta x = \\sqrt{\\hbar/(2m\\omega)}$。由维里定理 $\\langle T\\rangle = \\langle V\\rangle = E_0/2$ 得 $\\langle p^2\\rangle/2m = \\hbar\\omega/4$，$\\Delta p = \\sqrt{m\\hbar\\omega/2}$。于是 $\\Delta x\\,\\Delta p = \\sqrt{\\dfrac{\\hbar}{2m\\omega}}\\cdot\\sqrt{\\dfrac{m\\hbar\\omega}{2}} = \\dfrac{\\hbar}{2}$，不等式取等号，是最小不确定态。',
      },
      {
        title: '零点能的物理',
        detail: '若 $E_0 = 0$，粒子将静止于 $x = 0$，要求 $\\Delta x = \\Delta p = 0$，违反不确定关系。零点能 $\\dfrac{1}{2}\\hbar\\omega$ 正是"约束越紧、涨落越大"的量子效应（例如液氦在低温下不凝固）。',
      },
    ],
    answer: '$A = (m\\omega/\\pi\\hbar)^{1/4}$；$E_0 = \\hbar\\omega/2$；$\\Delta x\\,\\Delta p = \\hbar/2$（最小不确定态）',
    tags: ['谐振子', '零点能', '不确定关系'],
  },

  // ─────────────────────── 第二章 算符与力学量 / 第四章 表象 ───────────────────────
  {
    id: 'quantum-mechanics-p3',
    courseId: 'quantum-mechanics',
    topicId: 'qm-operators',
    title: '用升降算符代数求解谐振子能级',
    difficulty: 3,
    question: '定义算符 $a = \\sqrt{\\dfrac{m\\omega}{2\\hbar}}\\,x + \\dfrac{i}{\\sqrt{2m\\hbar\\omega}}\\,p$ 及其厄米共轭 $a^{\\dagger}$。(1) 利用 $[x, p] = i\\hbar$ 证明 $[a, a^{\\dagger}] = 1$；(2) 证明哈密顿量可写成 $H = \\hbar\\omega\\left(a^{\\dagger}a + \\dfrac{1}{2}\\right)$；(3) 设 $N = a^{\\dagger}a$（粒子数算符），证明其本征值 $n$ 只能取非负整数，从而 $E_n = \\hbar\\omega\\left(n + \\dfrac{1}{2}\\right)$。',
    hints: [
      '把 $a$、$a^{\\dagger}$ 看成 $x$、$p$ 的线性组合，逐项展开 $[a, a^{\\dagger}]$；注意 $x$、$p$ 各自与自身对易。',
      '$[H, a] = -\\hbar\\omega\\, a$ 说明 $a|\\psi\\rangle$ 仍是能量本征态、能量降低 $\\hbar\\omega$；$a^{\\dagger}$ 则升高。',
      '$\\langle\\psi|N|\\psi\\rangle = \\|a|\\psi\\rangle\\|^2 \\ge 0$ 强制本征值非负；下降链必须终止于 $a|0\\rangle = 0$，上升链用 $a^{\\dagger}$ 生成全部非负整数。',
    ],
    solution: [
      {
        title: '计算对易关系',
        detail: '记 $a = \\beta x + i\\gamma p$、$a^{\\dagger} = \\beta x - i\\gamma p$，其中 $\\beta = \\sqrt{m\\omega/2\\hbar}$、$\\gamma = 1/\\sqrt{2m\\hbar\\omega}$。展开：$[a, a^{\\dagger}] = -i\\beta\\gamma[x, p] + i\\gamma\\beta[p, x] = -i\\beta\\gamma(i\\hbar) + i\\gamma\\beta(-i\\hbar) = 2\\beta\\gamma\\hbar$。代入 $\\beta\\gamma = \\sqrt{\\dfrac{m\\omega}{2\\hbar}\\cdot\\dfrac{1}{2m\\hbar\\omega}} = \\dfrac{1}{2\\hbar}$，得 $[a, a^{\\dagger}] = 1$。',
      },
      {
        title: '改写哈密顿量',
        detail: '$aa^{\\dagger} = (\\beta x + i\\gamma p)(\\beta x - i\\gamma p) = \\beta^2x^2 + \\gamma^2p^2 + i\\gamma\\beta[p, x] = \\dfrac{p^2}{2m\\hbar\\omega} + \\dfrac{m\\omega x^2}{2\\hbar} + \\dfrac{1}{2} = \\dfrac{H}{\\hbar\\omega} + \\dfrac{1}{2}$。由 $a^{\\dagger}a = aa^{\\dagger} - 1$ 得 $\\dfrac{H}{\\hbar\\omega} = a^{\\dagger}a + \\dfrac{1}{2}$，即 $H = \\hbar\\omega\\left(N + \\dfrac{1}{2}\\right)$。',
      },
      {
        title: '能谱推导',
        detail: '由 $[H, a] = -\\hbar\\omega\\, a$ 与 $[H, a^{\\dagger}] = \\hbar\\omega\\, a^{\\dagger}$：若 $N|n\\rangle = n|n\\rangle$，则 $N(a|n\\rangle) = (n - 1)(a|n\\rangle)$、$N(a^{\\dagger}|n\\rangle) = (n + 1)(a^{\\dagger}|n\\rangle)$。又 $\\langle\\psi|N|\\psi\\rangle = \\|a|\\psi\\rangle\\|^2 \\ge 0$ 强制 $n \\ge 0$，故下降链必须终止：存在 $|0\\rangle$ 使 $a|0\\rangle = 0$，其 $n = 0$；上升链由 $a^{\\dagger}$ 反复作用生成 $n = 0, 1, 2, \\ldots$。于是 $E_n = \\hbar\\omega\\left(n + \\dfrac{1}{2}\\right)$，$n$ 为非负整数。',
      },
    ],
    answer: '$[a, a^{\\dagger}] = 1$；$H = \\hbar\\omega(a^{\\dagger}a + \\frac{1}{2})$；$E_n = \\hbar\\omega(n + \\frac{1}{2})$，$n = 0, 1, 2, \\ldots$',
    tags: ['升降算符', '代数方法', '对易关系'],
  },

  // ─────────────────────── 第五章 角动量 ───────────────────────
  {
    id: 'quantum-mechanics-p4',
    courseId: 'quantum-mechanics',
    topicId: 'angular-momentum-qm',
    title: 'l = 1 角动量态与 Lx 的测量',
    difficulty: 2,
    question: '轨道角动量量子数 $l = 1$ 的粒子处于 $\\hat{L}^2$ 与 $\\hat{L}_z$ 的共同本征态 $|1, 0\\rangle$（$\\hat{L}_z$ 本征值为 0）。已知升降算符规则 $\\hat{L}_{\\pm}|l, m\\rangle = \\hbar\\sqrt{(l \\mp m)(l \\pm m + 1)}\\, |l, m \\pm 1\\rangle$，且 $\\hat{L}_x = \\dfrac{1}{2}(\\hat{L}_+ + \\hat{L}_-)$。(1) 在基 $\\{|1,1\\rangle, |1,0\\rangle, |1,-1\\rangle\\}$ 下写出 $\\hat{L}_x$ 的矩阵；(2) 求 $\\hat{L}_x$ 的本征值与归一化本征态；(3) 对处于 $|1, 0\\rangle$ 的体系测量 $\\hat{L}_x$，可能结果与相应概率是什么？$\\langle \\hat{L}_x \\rangle$ 与 $\\langle \\hat{L}_x^2 \\rangle$ 各是多少？',
    hints: [
      '矩阵元 $\\langle 1, m^{\\prime}|\\hat{L}_x|1, m\\rangle$ 只在 $m^{\\prime} = m \\pm 1$ 时非零，逐个用升降公式计算。',
      '$\\hat{L}_x$ 与 $\\hat{L}_z$ 地位对等，本征值应与 $m\\hbar$ 同构：$\\hbar, 0, -\\hbar$。',
      '测量概率 = 初态在 $\\hat{L}_x$ 本征态上展开系数的模方。',
    ],
    solution: [
      {
        title: '写出 Lx 矩阵',
        detail: '由升降公式：$\\hat{L}_+|1,0\\rangle = \\hbar\\sqrt{2}\\,|1,1\\rangle$，$\\hat{L}_-|1,1\\rangle = \\hbar\\sqrt{2}\\,|1,0\\rangle$，$\\hat{L}_+|1,-1\\rangle = \\hbar\\sqrt{2}\\,|1,0\\rangle$，$\\hat{L}_-|1,0\\rangle = \\hbar\\sqrt{2}\\,|1,-1\\rangle$。取 $\\hat{L}_x = (\\hat{L}_+ + \\hat{L}_-)/2$，得 $\\hat{L}_x = \\dfrac{\\hbar}{\\sqrt{2}}\\begin{pmatrix} 0 & 1 & 0\\\\ 1 & 0 & 1\\\\ 0 & 1 & 0 \\end{pmatrix}$（基按 $|1,1\\rangle, |1,0\\rangle, |1,-1\\rangle$ 排序）。',
      },
      {
        title: '求本征值与本征态',
        detail: '无量纲矩阵 $\\begin{pmatrix} 0 & 1 & 0\\\\ 1 & 0 & 1\\\\ 0 & 1 & 0 \\end{pmatrix}$ 的本征值为 $\\sqrt{2}, 0, -\\sqrt{2}$，故 $\\hat{L}_x$ 的本征值为 $\\hbar, 0, -\\hbar$。归一化本征态：本征值 $\\hbar$ 对应 $\\dfrac{1}{2}|1,1\\rangle + \\dfrac{1}{\\sqrt{2}}|1,0\\rangle + \\dfrac{1}{2}|1,-1\\rangle$；本征值 $0$ 对应 $\\dfrac{1}{\\sqrt{2}}\\left(|1,1\\rangle - |1,-1\\rangle\\right)$；本征值 $-\\hbar$ 对应 $\\dfrac{1}{2}|1,1\\rangle - \\dfrac{1}{\\sqrt{2}}|1,0\\rangle + \\dfrac{1}{2}|1,-1\\rangle$。',
      },
      {
        title: '测量概率与平均值',
        detail: '把 $|1,0\\rangle$ 在三个 $\\hat{L}_x$ 本征态上展开，系数分别为 $1/\\sqrt{2}$、$0$、$-1/\\sqrt{2}$，故测得 $\\hbar$ 的概率为 $1/2$、$0$ 的概率为 $0$、$-\\hbar$ 的概率为 $1/2$。$\\langle\\hat{L}_x\\rangle = \\dfrac{1}{2}\\hbar - \\dfrac{1}{2}\\hbar = 0$；$\\langle\\hat{L}_x^2\\rangle = \\dfrac{1}{2}\\hbar^2 = \\dfrac{1}{2}\\left[l(l+1) - m^2\\right]\\hbar^2$（$l = 1, m = 0$），与"$\\hat{L}^2$ 在横向两个分量间均分"的图像一致。',
      },
    ],
    answer: '$\\hat{L}_x = \\dfrac{\\hbar}{\\sqrt{2}}\\begin{pmatrix} 0 & 1 & 0\\\\ 1 & 0 & 1\\\\ 0 & 1 & 0 \\end{pmatrix}$；本征值 $\\hbar, 0, -\\hbar$；对 $|1,0\\rangle$ 测 $\\hat{L}_x$ 得 $\\pm\\hbar$ 的概率各 $1/2$（得 0 概率为 0）；$\\langle\\hat{L}_x\\rangle = 0$，$\\langle\\hat{L}_x^2\\rangle = \\hbar^2/2$',
    tags: ['角动量', '升降算符', '测量概率'],
  },

  // ─────────────────────── 第六章 微扰论与变分法 ───────────────────────
  {
    id: 'quantum-mechanics-p5',
    courseId: 'quantum-mechanics',
    topicId: 'perturbation',
    title: '无限深势阱受 λx² 微扰的一阶能移',
    difficulty: 2,
    question: '粒子在一维无限深势阱（$0 < x < a$）中运动，未微扰能级 $E_n^{(0)} = \\dfrac{n^2\\pi^2\\hbar^2}{2ma^2}$，波函数 $\\psi_n(x) = \\sqrt{2/a}\\,\\sin\\dfrac{n\\pi x}{a}$。现加入微扰 $H^{\\prime} = \\lambda x^2$（$\\lambda > 0$ 为小常数）。(1) 写出一阶能量修正公式，并计算 $\\langle x^2 \\rangle_n$；(2) 求基态与第一激发态的一阶能量修正；(3) 讨论：当 $n \\to \\infty$ 时修正趋于什么值？为什么 $n = 2$ 的修正比 $n = 1$ 大？',
    hints: [
      '$E_n^{(1)} = \\langle\\psi_n|H^{\\prime}|\\psi_n\\rangle = \\dfrac{2\\lambda}{a}\\int_0^a x^2\\sin^2\\dfrac{n\\pi x}{a}\\, dx$。',
      '用 $\\sin^2\\theta = \\dfrac{1 - \\cos 2\\theta}{2}$ 拆成两项；其中 $\\int_0^a x^2\\cos\\dfrac{2n\\pi x}{a}dx = \\dfrac{a^3}{2n^2\\pi^2}$（分部积分两次）。',
      '$n \\to \\infty$ 时波函数振荡剧烈，概率分布趋于经典均匀分布 $\\rho = 1/a$，对应 $\\langle x^2\\rangle \\to a^2/3$。',
    ],
    solution: [
      {
        title: '一阶修正公式',
        detail: '非简并定态微扰论给出 $E_n^{(1)} = \\langle n^{(0)}|H^{\\prime}|n^{(0)}\\rangle = \\dfrac{2\\lambda}{a}\\displaystyle\\int_0^a x^2\\sin^2\\dfrac{n\\pi x}{a}\\, dx$。',
      },
      {
        title: '积分计算',
        detail: '由 $\\sin^2\\dfrac{n\\pi x}{a} = \\dfrac{1}{2}\\left(1 - \\cos\\dfrac{2n\\pi x}{a}\\right)$：$\\int_0^a x^2 dx = a^3/3$；令 $k = 2n\\pi/a$，分部积分两次得 $\\int_0^a x^2\\cos(kx)dx = \\left[\\dfrac{x^2\\sin kx}{k} + \\dfrac{2x\\cos kx}{k^2} - \\dfrac{2\\sin kx}{k^3}\\right]_0^a = \\dfrac{2a}{k^2} = \\dfrac{a^3}{2n^2\\pi^2}$（因 $\\sin 2n\\pi = 0$、$\\cos 2n\\pi = 1$）。故 $\\langle x^2\\rangle_n = \\dfrac{2}{a}\\cdot\\dfrac{1}{2}\\left(\\dfrac{a^3}{3} - \\dfrac{a^3}{2n^2\\pi^2}\\right) = a^2\\left(\\dfrac{1}{3} - \\dfrac{1}{2n^2\\pi^2}\\right)$。',
      },
      {
        title: '代入与讨论',
        detail: '$E_1^{(1)} = \\lambda a^2\\left(\\dfrac{1}{3} - \\dfrac{1}{2\\pi^2}\\right) \\approx 0.283\\,\\lambda a^2$；$E_2^{(1)} = \\lambda a^2\\left(\\dfrac{1}{3} - \\dfrac{1}{8\\pi^2}\\right) \\approx 0.321\\,\\lambda a^2$。当 $n \\to \\infty$，$\\langle x^2\\rangle_n \\to a^2/3$，正是经典均匀分布的结果（对应原理）。$n$ 越大，粒子分布越摊开、越靠近阱壁，$\\langle x^2\\rangle$ 越大，故 $n = 2$ 的修正大于 $n = 1$。',
      },
    ],
    answer: '$\\langle x^2\\rangle_n = a^2\\left(\\dfrac{1}{3} - \\dfrac{1}{2n^2\\pi^2}\\right)$；$E_1^{(1)} \\approx 0.283\\,\\lambda a^2$，$E_2^{(1)} \\approx 0.321\\,\\lambda a^2$；$n \\to \\infty$ 时趋于 $\\lambda a^2/3$',
    tags: ['微扰论', '无限深势阱', '一阶修正'],
  },

  // ─────────────────────── 第七章 全同粒子 ───────────────────────
  {
    id: 'quantum-mechanics-p6',
    courseId: 'quantum-mechanics',
    topicId: 'identical-particles',
    title: '无限深势阱中两个全同粒子的态的构造',
    difficulty: 2,
    question: '两个质量均为 $m$、忽略相互作用的全同粒子置于宽度 $a$ 的一维无限深势阱中，单粒子能级 $E_n = n^2 E_1$，其中 $E_1 = \\dfrac{\\pi^2\\hbar^2}{2ma^2}$。(1) 给出自旋为 0 的玻色子体系的基态能量与归一化波函数；(2) 对两个自旋为 $1/2$ 的费米子（自旋可取 $\\uparrow, \\downarrow$），求体系基态能量，写出完整波函数（含自旋部分），并说明泡利不相容原理如何体现；(3) 求该费米子体系第一激发态的能量与简并度。',
    hints: [
      '全同粒子波函数必须对交换对称（玻色子）或反对称（费米子）：$\\psi_{\\pm} = \\dfrac{1}{\\sqrt{2}}\\left[\\psi_a(1)\\psi_b(2) \\pm \\psi_a(2)\\psi_b(1)\\right]$。',
      '费米子总波函数（空间×自旋）须反对称：空间对称配自旋单态，空间反对称配自旋三重态。',
      '第一激发态对应两粒子分别处于 $n = 1$ 与 $n = 2$；空间与自旋两种对称性组合都要计入。',
    ],
    solution: [
      {
        title: '玻色子基态',
        detail: '总能量 $E = (n_1^2 + n_2^2)E_1$。自旋 0 玻色子要求空间波函数对称：基态两粒子同占 $n = 1$，$E = 2E_1$，波函数 $\\Psi_0(x_1, x_2) = \\psi_1(x_1)\\psi_1(x_2) = \\dfrac{2}{a}\\sin\\dfrac{\\pi x_1}{a}\\sin\\dfrac{\\pi x_2}{a}$（本身已对称，无需再组合）。',
      },
      {
        title: '费米子基态',
        detail: '两费米子可同处 $n = 1$，但自旋部分必须反对称（单态）$\\chi_{0,0} = \\dfrac{1}{\\sqrt{2}}\\left(\\uparrow_1\\downarrow_2 - \\downarrow_1\\uparrow_2\\right)$，空间部分对称。$E = 2E_1$，非简并。完整波函数 $\\Psi = \\psi_1(x_1)\\psi_1(x_2)\\,\\chi_{0,0}$，交换两个粒子的全部坐标（位置与自旋）后整体变号。若两个费米子自旋取向相同（如都 $\\uparrow$），则空间部分也被迫反对称、与"同处 $n=1$"矛盾——这正是"两个费米子不能占据同一单粒子态"的泡利不相容原理。',
      },
      {
        title: '第一激发态与简并度',
        detail: '占据为 $(n_1, n_2) = (1, 2)$，$E = (1 + 4)E_1 = 5E_1$。允许的组合：空间反对称 $\\psi_- = \\dfrac{1}{\\sqrt{2}}\\left[\\psi_1(1)\\psi_2(2) - \\psi_2(1)\\psi_1(2)\\right]$ 配自旋对称三重态（3 个态），以及空间对称 $\\psi_+ = \\dfrac{1}{\\sqrt{2}}\\left[\\psi_1(1)\\psi_2(2) + \\psi_2(1)\\psi_1(2)\\right]$ 配自旋单态（1 个态），共 $3 + 1 = 4$ 重简并。',
      },
    ],
    answer: '玻色子基态 $E = 2E_1$；自旋 1/2 费米子基态 $E = 2E_1$（空间对称 × 自旋单态，非简并）；第一激发态 $E = 5E_1$，简并度 4',
    tags: ['全同粒子', '泡利不相容', '对称化'],
  },
];
