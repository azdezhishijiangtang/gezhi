import type { Problem } from '@/types';

export const electrodynamicsProblems: Problem[] = [
  // ─────────────────────── 例题一：第二章 镜像法 ───────────────────────
  {
    id: 'electrodynamics-p1',
    courseId: 'electrodynamics',
    topicId: 'electrostatics-boundary',
    title: '接地导体球外点电荷的镜像法求解',
    difficulty: 2,
    question: '半径 $a = 0.10\\ \\text{m}$ 的接地导体球外有一点电荷 $q = 3.0\\times10^{-8}\\ \\text{C}$，距球心 $d = 0.30\\ \\text{m}$。求：(1) 镜像电荷的电量与位置；(2) 球与电荷连线上距球心 $r = 0.20\\ \\text{m}$ 处（球面与电荷之间）的电势；(3) 点电荷所受导体球的作用力大小。取 $\\dfrac{1}{4\\pi\\varepsilon_0} = 8.99\\times10^9\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$。',
    hints: [
      '接地导体球面的边界条件是球面上处处 $\\varphi = 0$，镜像电荷必须放在球内。',
      '球面镜像公式：$q\' = -\\dfrac{a}{d}q$，镜像电荷距球心 $b = \\dfrac{a^2}{d}$。',
      '区域内的电势是真实电荷与镜像电荷的库仑势叠加；力可用镜像电荷对 $q$ 的库仑力计算。',
    ],
    solution: [
      {
        title: '确定镜像电荷',
        detail: '由球面镜像公式，$q\' = -\\dfrac{a}{d}q = -\\dfrac{0.10}{0.30}\\times3.0\\times10^{-8} = -1.0\\times10^{-8}\\ \\text{C}$；位置距球心 $b = \\dfrac{a^2}{d} = \\dfrac{0.01}{0.30} \\approx 0.0333\\ \\text{m}$，位于球心与 $q$ 的连线上、球内。验证：对球面上任一点，到 $q$ 与 $q\'$ 的距离之比恒为 $d/a = 3$，故球面上 $\\dfrac{q}{R} + \\dfrac{q\'}{R/3} = 0$，即 $\\varphi = 0$，边界条件满足。球面上总感应电荷等于镜像电荷 $-1.0\\times10^{-8}\\ \\text{C}$。',
      },
      {
        title: '叠加求电势',
        detail: '场点距真实电荷 $d - r = 0.10\\ \\text{m}$，距镜像电荷 $r - b = 0.20 - 0.0333 \\approx 0.1667\\ \\text{m}$。叠加：$\\varphi = \\dfrac{1}{4\\pi\\varepsilon_0}\\left(\\dfrac{q}{d-r} + \\dfrac{q\'}{r-b}\\right) = 8.99\\times10^9\\times\\left(\\dfrac{3.0\\times10^{-8}}{0.10} - \\dfrac{1.0\\times10^{-8}}{0.1667}\\right) = 8.99\\times10^9\\times(3.00\\times10^{-7} - 6.00\\times10^{-8})\\ \\text{V}$，即 $\\varphi \\approx 2.16\\times10^3\\ \\text{V}$。',
      },
      {
        title: '由镜像电荷求作用力',
        detail: '区域内唯一性定理保证：镜像电荷对 $q$ 的库仑力就是导体球感应电荷对 $q$ 的真实作用力。$F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{|q q\'|}{(d-b)^2} = 8.99\\times10^9\\times\\dfrac{3.0\\times10^{-16}}{(0.30 - 0.0333)^2} = \\dfrac{8.99\\times10^9\\times3.0\\times10^{-16}}{0.0711} \\approx 3.8\\times10^{-5}\\ \\text{N}$，方向指向球心（引力）。',
      },
    ],
    answer: '镜像电荷 $q\' = -1.0\\times10^{-8}\\ \\text{C}$，距球心 $0.033\\ \\text{m}$；$r = 0.20\\ \\text{m}$ 处电势约 $2.16\\times10^3\\ \\text{V}$；点电荷受力约 $3.8\\times10^{-5}\\ \\text{N}$，方向指向球心。',
    tags: ['镜像法', '唯一性定理', '静电边值问题'],
  },

  // ─────────────────────── 例题二：第四章 矩形波导 ───────────────────────
  {
    id: 'electrodynamics-p2',
    courseId: 'electrodynamics',
    topicId: 'em-waves',
    title: '矩形波导的截止频率与波导波长',
    difficulty: 2,
    question: '矩形波导截面宽 $a = 7.2\\ \\text{cm}$、高 $b = 3.4\\ \\text{cm}$，内为真空。(1) 求 TE$_{10}$、TE$_{20}$、TE$_{01}$ 模的截止频率；(2) 若工作频率 $f = 3.0\\ \\text{GHz}$，哪些模式可以传播？(3) 对 TE$_{10}$ 模求波导波长 $\\lambda_g$。取 $c = 3.0\\times10^8\\ \\text{m/s}$。',
    hints: [
      '矩形波导截止频率 $f_{c,mn} = \\dfrac{c}{2}\\sqrt{\\left(\\dfrac{m}{a}\\right)^2 + \\left(\\dfrac{n}{b}\\right)^2}$。',
      '只有 $f > f_{c,mn}$ 的模式才能传播，低于截止频率的场沿轴向指数衰减。',
      '波导波长 $\\lambda_g = \\dfrac{\\lambda_0}{\\sqrt{1 - (\\lambda_0/\\lambda_c)^2}}$，其中 $\\lambda_0 = c/f$，$\\lambda_c = c/f_c$。',
    ],
    solution: [
      {
        title: '计算各模式截止频率',
        detail: 'TE$_{10}$：$f_c = \\dfrac{c}{2a} = \\dfrac{3.0\\times10^8}{2\\times0.072} \\approx 2.08\\ \\text{GHz}$。TE$_{20}$：$f_c = \\dfrac{c}{a} \\approx 4.17\\ \\text{GHz}$。TE$_{01}$：$f_c = \\dfrac{c}{2b} = \\dfrac{3.0\\times10^8}{0.068} \\approx 4.41\\ \\text{GHz}$。',
      },
      {
        title: '判断传播模式',
        detail: '工作频率 $f = 3.0\\ \\text{GHz}$。比较：$3.0 > 2.08$（TE$_{10}$ 传播）；$3.0 < 4.17$（TE$_{20}$ 截止）；$3.0 < 4.41$（TE$_{01}$ 截止）。故只有主模 TE$_{10}$ 能传播，波导工作在单模状态——这正是工程上选取尺寸使频带落在 TE$_{10}$ 与次高模截止频率之间的原因。',
      },
      {
        title: '计算波导波长',
        detail: '自由空间波长 $\\lambda_0 = c/f = \\dfrac{3.0\\times10^8}{3.0\\times10^9} = 0.10\\ \\text{m} = 10\\ \\text{cm}$；TE$_{10}$ 的截止波长 $\\lambda_c = 2a = 14.4\\ \\text{cm}$。$\\lambda_g = \\dfrac{10}{\\sqrt{1 - (10/14.4)^2}} = \\dfrac{10}{\\sqrt{1 - 0.482}} = \\dfrac{10}{0.720} \\approx 13.9\\ \\text{cm}$。波导内相速 $v_p = f\\lambda_g \\approx 4.2\\times10^8\\ \\text{m/s} > c$，群速 $v_g = c^2/v_p \\approx 2.2\\times10^8\\ \\text{m/s} < c$，二者乘积为 $c^2$。',
      },
    ],
    answer: '截止频率：TE$_{10}$ 约 $2.08\\ \\text{GHz}$、TE$_{20}$ 约 $4.17\\ \\text{GHz}$、TE$_{01}$ 约 $4.41\\ \\text{GHz}$；$f = 3.0\\ \\text{GHz}$ 时只有 TE$_{10}$ 传播；TE$_{10}$ 波导波长 $\\lambda_g \\approx 13.9\\ \\text{cm}$。',
    tags: ['波导', '截止频率', '色散'],
  },

  // ─────────────────────── 例题三：第四章 菲涅耳公式 ───────────────────────
  {
    id: 'electrodynamics-p3',
    courseId: 'electrodynamics',
    topicId: 'em-waves',
    title: '平面波在介质界面上的反射与布儒斯特角',
    difficulty: 3,
    question: '一束自然光从空气（$n_1 = 1.0$）射向玻璃（$n_2 = 1.5$），入射角 $\\theta_i = 45^\\circ$。(1) 用菲涅耳公式求 $s$、$p$ 两个分量的振幅反射系数与能量反射率；(2) 估算自然光的总能量反射率；(3) 求布儒斯特角 $\\theta_B$，并说明此时反射光的偏振状态。',
    hints: [
      '先用斯涅尔定律 $n_1\\sin\\theta_i = n_2\\sin\\theta_t$ 求折射角。',
      '菲涅耳公式：$r_s = \\dfrac{n_1\\cos\\theta_i - n_2\\cos\\theta_t}{n_1\\cos\\theta_i + n_2\\cos\\theta_t}$，$r_p = \\dfrac{n_2\\cos\\theta_i - n_1\\cos\\theta_t}{n_2\\cos\\theta_i + n_1\\cos\\theta_t}$；能量反射率 $R = |r|^2$。',
      '布儒斯特角满足 $\\tan\\theta_B = n_2/n_1$，此时 $p$ 分量反射为零。',
    ],
    solution: [
      {
        title: '求折射角',
        detail: '$\\sin\\theta_t = \\dfrac{n_1}{n_2}\\sin\\theta_i = \\dfrac{\\sin 45^\\circ}{1.5} = \\dfrac{0.7071}{1.5} = 0.4714$，故 $\\theta_t \\approx 28.1^\\circ$，$\\cos\\theta_t \\approx 0.882$，$\\cos\\theta_i \\approx 0.707$。',
      },
      {
        title: '代入菲涅耳公式',
        detail: '$s$ 分量：$r_s = \\dfrac{1.0\\times0.707 - 1.5\\times0.882}{1.0\\times0.707 + 1.5\\times0.882} = \\dfrac{0.707 - 1.323}{0.707 + 1.323} = \\dfrac{-0.616}{2.030} \\approx -0.303$，负号表示反射时电场反相（半波损失），$R_s = |r_s|^2 \\approx 0.092$。$p$ 分量：$r_p = \\dfrac{1.5\\times0.707 - 1.0\\times0.882}{1.5\\times0.707 + 1.0\\times0.882} = \\dfrac{1.061 - 0.882}{1.061 + 0.882} = \\dfrac{0.179}{1.943} \\approx 0.092$，$R_p \\approx 0.0085$。',
      },
      {
        title: '自然光总反射率与布儒斯特角',
        detail: '自然光两正交分量能量各半，$R = \\dfrac{R_s + R_p}{2} = \\dfrac{0.092 + 0.0085}{2} \\approx 0.050$，即约 $5\\%$ 的能量被反射。布儒斯特角：$\\tan\\theta_B = \\dfrac{n_2}{n_1} = 1.5$，$\\theta_B = \\arctan 1.5 \\approx 56.3^\\circ$。此时反射线与折射线垂直（$\\theta_B + \\theta_t = 90^\\circ$），$r_p = 0$，反射光为纯 $s$ 偏振（电场垂直于入射面）的线偏振光。',
      },
    ],
    answer: '$r_s \\approx -0.303$（$R_s \\approx 9.2\\%$），$r_p \\approx 0.092$（$R_p \\approx 0.85\\%$）；自然光总反射率约 $5\\%$；布儒斯特角 $\\theta_B \\approx 56.3^\\circ$，此时反射光为纯 $s$ 偏振线偏振光。',
    tags: ['菲涅耳公式', '布儒斯特角', '偏振', '反射折射'],
  },

  // ─────────────────────── 例题四：第五章 偶极辐射 ───────────────────────
  {
    id: 'electrodynamics-p4',
    courseId: 'electrodynamics',
    topicId: 'radiation',
    title: '短天线的辐射功率与辐射电阻',
    difficulty: 2,
    question: '一根短天线可视为电偶极子模型：长度 $l = 1.0\\ \\text{m}$，馈入电流 $I(t) = I_0\\cos\\omega t$，其中 $I_0 = 10\\ \\text{A}$、频率 $f = 1.0\\ \\text{MHz}$。求：(1) 天线的等效电偶极矩振幅 $p_0$；(2) 平均辐射功率 $P$；(3) 辐射电阻 $R_r = 2P/I_0^2$，并与公式 $R_r = 80\\pi^2(l/\\lambda)^2$ 比较。取 $c = 3.0\\times10^8\\ \\text{m/s}$，$\\varepsilon_0 = 8.85\\times10^{-12}\\ \\text{F/m}$。',
    hints: [
      '电流是电荷的流动，等效偶极矩满足 $I_0 l = \\omega p_0$，即 $p_0 = I_0 l/\\omega$。',
      '偶极辐射平均功率 $P = \\dfrac{\\omega^4 p_0^2}{12\\pi\\varepsilon_0 c^3}$。',
      '辐射电阻把辐射功率折算为等效电阻，$R_r = 2P/I_0^2$；$\\lambda = c/f$。',
    ],
    solution: [
      {
        title: '求等效偶极矩',
        detail: '角频率 $\\omega = 2\\pi f = 2\\pi\\times10^6 \\approx 6.28\\times10^6\\ \\text{rad/s}$。由 $I_0 l = \\omega p_0$ 得 $p_0 = \\dfrac{I_0 l}{\\omega} = \\dfrac{10\\times1.0}{6.28\\times10^6} \\approx 1.59\\times10^{-6}\\ \\text{C}\\cdot\\text{m}$。',
      },
      {
        title: '计算辐射功率',
        detail: '$P = \\dfrac{\\omega^4 p_0^2}{12\\pi\\varepsilon_0 c^3}$。$\\omega^4 = (6.28\\times10^6)^4 \\approx 1.55\\times10^{27}\\ \\text{s}^{-4}$；$p_0^2 = 2.54\\times10^{-12}$；$\\varepsilon_0 c^3 = 8.85\\times10^{-12}\\times2.7\\times10^{25} \\approx 2.39\\times10^{14}$。$P = \\dfrac{1.55\\times10^{27}\\times2.54\\times10^{-12}}{12\\pi\\times2.39\\times10^{14}} = \\dfrac{3.95\\times10^{15}}{9.0\\times10^{15}} \\approx 0.44\\ \\text{W}$。',
      },
      {
        title: '求辐射电阻并交叉验证',
        detail: '$R_r = \\dfrac{2P}{I_0^2} = \\dfrac{2\\times0.44}{100} \\approx 8.8\\times10^{-3}\\ \\Omega$。用工程公式验证：$\\lambda = c/f = 300\\ \\text{m}$，$R_r = 80\\pi^2(l/\\lambda)^2 = 80\\times9.87\\times(1/300)^2 \\approx 789.6/9.0\\times10^4 \\approx 8.8\\times10^{-3}\\ \\Omega$，两法一致。辐射电阻极小，说明短天线（$l\\ll\\lambda$）辐射效率很低。',
      },
    ],
    answer: '等效偶极矩 $p_0 \\approx 1.6\\times10^{-6}\\ \\text{C}\\cdot\\text{m}$；平均辐射功率 $P \\approx 0.44\\ \\text{W}$；辐射电阻 $R_r \\approx 8.8\\times10^{-3}\\ \\Omega$，与 $80\\pi^2(l/\\lambda)^2$ 公式一致。',
    tags: ['偶极辐射', '辐射功率', '天线'],
  },

  // ─────────────────────── 例题五：第六章 电磁场张量变换 ───────────────────────
  {
    id: 'electrodynamics-p5',
    courseId: 'electrodynamics',
    topicId: 'relativity-em',
    title: '纯磁场参考系变换中的电场与磁场',
    difficulty: 3,
    question: '实验室系 $S$ 中存在匀强磁场 $\\vec B = B_0\\hat z$（$B_0 = 0.10\\ \\text{T}$）、$\\vec E = 0$。另一惯性系 $S\'$ 以速度 $\\vec v = 0.6c\\,\\hat x$ 相对 $S$ 运动。(1) 求 $S\'$ 系中的电场 $\\vec E\'$ 与磁场 $\\vec B\'$；(2) 用洛伦兹不变量验证结果的协变性；(3) 说明一个在 $S\'$ 系中静止的带电粒子将如何运动。',
    hints: [
      '场变换：平行于 $\\vec v$ 的分量不变；垂直分量 $\\vec E\'_\\perp = \\gamma(\\vec E_\\perp + \\vec v\\times\\vec B)$，$\\vec B\'_\\perp = \\gamma(\\vec B_\\perp - \\vec v\\times\\vec E/c^2)$。',
      '注意 $\\vec v\\times\\vec B = v\\hat x\\times B_0\\hat z = -vB_0\\hat y$。',
      '不变量 $\\vec E\\cdot\\vec B$ 与 $E^2 - c^2B^2$ 在两个参考系中必须相等。',
    ],
    solution: [
      {
        title: '计算场变换',
        detail: '$\\gamma = \\dfrac{1}{\\sqrt{1 - 0.6^2}} = 1.25$。原场全部垂直于 $\\vec v$（$\\vec B$ 沿 $z$，与 $\\hat x$ 垂直；$\\vec E = 0$）。平行分量为零；垂直分量：$\\vec E\' = \\gamma(0 + \\vec v\\times\\vec B) = 1.25\\times(0.6c\\,\\hat x\\times0.10\\hat z) = -1.25\\times0.6\\times3.0\\times10^8\\times0.10\\,\\hat y$，即 $\\vec E\' = -2.25\\times10^7\\ \\text{V/m}\\ \\hat y$；$\\vec B\' = \\gamma(\\vec B - \\vec v\\times\\vec E/c^2) = 1.25\\times0.10\\hat z = 0.125\\ \\text{T}\\ \\hat z$。',
      },
      {
        title: '用不变量验证',
        detail: '$S$ 系：$\\vec E\\cdot\\vec B = 0$，$E^2 - c^2B^2 = 0 - (3.0\\times10^8)^2\\times0.01 = -9.0\\times10^{14}\\ \\text{V}^2/\\text{m}^2$。$S\'$ 系：$\\vec E\'\\cdot\\vec B\' = 0$（$\\hat y$ 与 $\\hat z$ 正交）；$E\'^2 - c^2B\'^2 = (2.25\\times10^7)^2 - (3.0\\times10^8)^2\\times0.125^2 = 5.06\\times10^{14} - 1.41\\times10^{15} = -9.0\\times10^{14}$。两个不变量逐系相等，变换自洽。',
      },
      {
        title: '粒子运动分析',
        detail: '在 $S\'$ 系中静止的带电粒子只受电场力 $\\vec F\' = q\\vec E\'$，将沿 $-\\hat y$（正电荷）方向做匀加速运动。回到 $S$ 系看，同一运动由磁洛伦兹力描述：粒子起初静止，磁力为零，但获得速度后 $q\\vec v\\times\\vec B$ 开始作用——两系描述通过洛伦兹变换完全等价，这正是电磁场统一为张量 $F^{\\mu\\nu}$ 的物理意义。',
      },
    ],
    answer: '$\\vec E\' = -2.25\\times10^7\\ \\text{V/m}\\ \\hat y$，$\\vec B\' = 0.125\\ \\text{T}\\ \\hat z$；不变量 $\\vec E\\cdot\\vec B = 0$ 与 $E^2 - c^2B^2 = -9.0\\times10^{14}\\ \\text{V}^2/\\text{m}^2$ 在两系一致；$S\'$ 系中静止的正电荷沿 $-\\hat y$ 方向被电场加速。',
    tags: ['电磁场张量', '场变换', '洛伦兹不变量', '相对论'],
  },

  // ─────────────────────── 例题六：第一章 位移电流 ───────────────────────
  {
    id: 'electrodynamics-p6',
    courseId: 'electrodynamics',
    topicId: 'maxwell-unified',
    title: '充电电容器极板间的位移电流与磁场',
    difficulty: 1,
    question: '真空中平行板电容器极板为圆形，半径 $R = 5.0\\ \\text{cm}$，以恒定电流 $I = 1.0\\ \\text{A}$ 充电（电荷均匀分布于极板）。求：(1) 两极板间位移电流密度的大小；(2) 极板间电场强度的时间变化率 $\\partial E/\\partial t$；(3) 极板间距轴心 $r = 2.5\\ \\text{cm}$ 与 $r = 7.5\\ \\text{cm}$ 处的磁感应强度。取 $\\mu_0 = 4\\pi\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$，$\\varepsilon_0 = 8.85\\times10^{-12}\\ \\text{F/m}$。',
    hints: [
      '位移电流密度 $j_D = \\partial D/\\partial t$；极板间电位移 $D = \\sigma = It/(\\pi R^2)$ 均匀分布。',
      '对全电流（传导电流 + 位移电流）应用安培环路定理 $\\oint\\vec H\\cdot d\\vec l = I_{全}$。',
      '极板间以 $r = R$ 为界：位移电流均匀分布在半径 $R$ 的圆截面内，与均匀圆柱电流的磁场计算完全类似。',
    ],
    solution: [
      {
        title: '位移电流密度与电场变化率',
        detail: '极板电荷 $Q = It$，电荷面密度 $\\sigma = \\dfrac{It}{\\pi R^2}$，$D = \\sigma$。位移电流密度 $j_D = \\dfrac{\\partial D}{\\partial t} = \\dfrac{I}{\\pi R^2} = \\dfrac{1.0}{\\pi\\times0.05^2} \\approx 1.27\\times10^2\\ \\text{A/m}^2$，其总面积分 $j_D\\pi R^2 = I$，与引线传导电流相等——全电流连续。由 $D = \\varepsilon_0 E$，$\\dfrac{\\partial E}{\\partial t} = \\dfrac{j_D}{\\varepsilon_0} = \\dfrac{127}{8.85\\times10^{-12}} \\approx 1.4\\times10^{13}\\ \\text{V/(m}\\cdot\\text{s)}$。',
      },
      {
        title: '极板内磁场（r < R）',
        detail: '取半径 $r = 0.025\\ \\text{m}$ 的同心圆环路，包围的位移电流 $I\' = j_D\\pi r^2 = I\\dfrac{r^2}{R^2} = 1.0\\times\\dfrac{0.025^2}{0.05^2} = 0.25\\ \\text{A}$。由对称性 $B\\cdot2\\pi r = \\mu_0 I\'$，得 $B = \\dfrac{\\mu_0 I r}{2\\pi R^2} = 2\\times10^{-7}\\times\\dfrac{1.0\\times0.025}{0.0025} = 2.0\\times10^{-6}\\ \\text{T}$。',
      },
      {
        title: '极板外磁场（r > R）',
        detail: '取半径 $r = 0.075\\ \\text{m}$ 的环路，包围全部位移电流 $I$，$B = \\dfrac{\\mu_0 I}{2\\pi r} = \\dfrac{2\\times10^{-7}\\times1.0}{0.075} \\approx 2.7\\times10^{-6}\\ \\text{T}$。磁感应线是环绕对称轴的同心圆，与引线周围的磁场平滑衔接，正是位移电流把"断开"的传导电流接续为闭合的全电流。',
      },
    ],
    answer: '$j_D \\approx 1.27\\times10^2\\ \\text{A/m}^2$；$\\partial E/\\partial t \\approx 1.4\\times10^{13}\\ \\text{V/(m}\\cdot\\text{s)}$；$r = 2.5\\ \\text{cm}$ 处 $B = 2.0\\times10^{-6}\\ \\text{T}$，$r = 7.5\\ \\text{cm}$ 处 $B \\approx 2.7\\times10^{-6}\\ \\text{T}$，方向均为环绕轴线的同心圆。',
    tags: ['位移电流', '安培-麦克斯韦定律', '麦克斯韦方程组'],
  },
];
