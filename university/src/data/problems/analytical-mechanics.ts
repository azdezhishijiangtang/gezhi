import type { Problem } from '@/types';

export const analytical_mechanicsProblems: Problem[] = [
  // ─────────────────────── 约束与广义坐标 ───────────────────────
  {
    id: 'analytical-mechanics-p1',
    courseId: 'analytical-mechanics',
    topicId: 'constraints-gc',
    title: '球面摆的约束分析、自由度与广义坐标',
    difficulty: 1,
    question: '长为 $l$ 的轻质刚性杆一端 $O$ 通过光滑球铰固定于天花板，另一端连接质量 $m$ 的小球（即球面摆）。以 $O$ 为原点建立直角坐标系，竖直向上为 $z$ 轴。求：(1) 写出约束方程，并判断它属于哪一类约束（完整与否、稳定与否，是否理想约束）；(2) 求系统的自由度 $s$；(3) 选一组广义坐标，并用它们表示小球的直角坐标；(4) 另考虑：平面内两个质点 $m_1$、$m_2$ 由长为 $l$ 的轻刚性杆连接，求该系统的自由度。',
    hints: [
      '约束是"小球到定点 $O$ 的距离不变"，写成 $x^2+y^2+z^2=l^2$；判断类型时看它含不含时间 $t$、含不含速度分量。',
      '理想约束的判据：约束反力在任意虚位移上做功之和为零。杆的约束力沿杆方向，而刚性杆允许的虚位移垂直于杆。',
      '平面双质点共有 $6$ 个坐标，独立约束只有杆长这一条。',
    ],
    solution: [
      {
        title: '约束方程与类型判定',
        detail: '约束为 $x^2+y^2+z^2=l^2$。它只含坐标、不含时间（稳定约束），也不含速度，且是几何方程，故为完整约束。约束力由球铰与刚性杆提供，方向沿杆；而杆所允许的虚位移均垂直于杆，故约束力虚功 $\\vec{F}_N\\cdot\\delta\\vec{r} = 0$，属理想约束。',
      },
      {
        title: '自由度计数',
        detail: '$N = 1$，独立完整约束数 $k = 1$，故 $s = 3N - k = 3 - 1 = 2$。',
      },
      {
        title: '广义坐标的选取',
        detail: '取球坐标角 $(\\theta, \\varphi)$：$\\theta$ 为杆与 $z$ 轴夹角，$\\varphi$ 为方位角。小球的直角坐标 $x = l\\sin\\theta\\cos\\varphi$，$y = l\\sin\\theta\\sin\\varphi$，$z = l\\cos\\theta$。任意时刻两个参数即可完全确定小球位置，与自由度一致。',
      },
      {
        title: '平面双质点系统的自由度',
        detail: '$N = 2$，坐标共 $6$ 个；唯一独立完整约束为 $|(x_1-x_2)^2 + (y_1-y_2)^2|^{1/2} = l$，即 $k = 1$。故 $s = 6 - 1 = 5$，例如可取两质点各 $2$ 个坐标再加杆的方位角 $\\theta$（共 $5$ 个独立参数）。',
      },
    ],
    answer: '约束 $x^2+y^2+z^2=l^2$：完整、稳定、理想约束；自由度 $s=3-1=2$，广义坐标可取 $(\\theta,\\varphi)$，$x=l\\sin\\theta\\cos\\varphi,\\ y=l\\sin\\theta\\sin\\varphi,\\ z=l\\cos\\theta$；平面双质点刚性杆系统 $s=6-1=5$。',
    tags: ['约束', '自由度', '广义坐标', '理想约束'],
  },

  // ─────────────────────── 拉格朗日方程 ───────────────────────
  {
    id: 'analytical-mechanics-p2',
    courseId: 'analytical-mechanics',
    topicId: 'lagrange-eq',
    title: '可动楔块上的滑块：循环坐标与守恒量',
    difficulty: 2,
    question: '质量为 $M$ 的直角楔块置于光滑水平地面上，倾角为 $\\alpha$ 的光滑斜面上放一质量 $m$ 的滑块，系统从静止开始运动，滑块沿斜面下滑时楔块沿地面后退。取楔块的水平位移 $x$（向右为正）与滑块沿斜面下滑的距离 $s$ 为广义坐标，滑块相对地面的坐标为 $x_b = x + s\\cos\\alpha$、$y_b = h - s\\sin\\alpha$（$h$ 为常量，竖直向上为 $y$ 正方向）。求：(1) 系统的拉格朗日量 $L$；(2) 两个运动方程；(3) 指出循环坐标，写出对应守恒量并说明其物理意义；(4) 由运动方程解出 $\\ddot{s}$ 与 $\\ddot{x}$。',
    hints: [
      '滑块速度要对地面求：$\\dot{x}_b = \\dot{x} + \\dot{s}\\cos\\alpha$，$\\dot{y}_b = -\\dot{s}\\sin\\alpha$；平方展开时交叉项 $2\\dot{x}\\dot{s}\\cos\\alpha$ 千万不能丢。',
      '势能可取 $V = -mg s\\sin\\alpha$（相差常数不影响方程）。',
      '看 $\\partial L/\\partial x$ 是否为零：若为零则 $x$ 是循环坐标，$p_x = \\partial L/\\partial\\dot{x}$ 守恒——算一算它是不是系统的水平总动量。',
    ],
    solution: [
      {
        title: '写出动能（注意交叉项）',
        detail: '滑块速度分量 $\\dot{x}_b = \\dot{x} + \\dot{s}\\cos\\alpha$，$\\dot{y}_b = -\\dot{s}\\sin\\alpha$，故 $v_b^2 = \\dot{x}^2 + 2\\dot{x}\\dot{s}\\cos\\alpha + \\dot{s}^2$。系统动能\\n$T = \\tfrac12 M\\dot{x}^2 + \\tfrac12 m(\\dot{x}^2 + 2\\dot{x}\\dot{s}\\cos\\alpha + \\dot{s}^2) = \\tfrac12(M+m)\\dot{x}^2 + m\\cos\\alpha\\,\\dot{x}\\dot{s} + \\tfrac12 m\\dot{s}^2$。',
      },
      {
        title: '写出拉格朗日量',
        detail: '$V = mgy_b = mgh - mg s\\sin\\alpha$，舍去常数 $mgh$ 得 $V = -mg s\\sin\\alpha$。于是\\n$L = \\tfrac12(M+m)\\dot{x}^2 + m\\cos\\alpha\\,\\dot{x}\\dot{s} + \\tfrac12 m\\dot{s}^2 + mg s\\sin\\alpha$。',
      },
      {
        title: '识别循环坐标与守恒量',
        detail: '$\\partial L/\\partial x = 0$，$x$ 为循环坐标，对应广义动量 $p_x = \\dfrac{\\partial L}{\\partial\\dot{x}} = (M+m)\\dot{x} + m\\dot{s}\\cos\\alpha = $ 常量。它恰是系统的水平总动量：$M\\dot{x} + m(\\dot{x} + \\dot{s}\\cos\\alpha)$。因初始静止，常量为零，即楔块后退动量与滑块水平动量随时抵消。',
      },
      {
        title: '运动方程及求解',
        detail: '对 $x$：$(M+m)\\ddot{x} + m\\cos\\alpha\\,\\ddot{s} = 0$。对 $s$：$m\\cos\\alpha\\,\\ddot{x} + m\\ddot{s} - mg\\sin\\alpha = 0$，即 $\\ddot{s} + \\cos\\alpha\\,\\ddot{x} = g\\sin\\alpha$。两式联立消去 $\\ddot{x}$：$\\ddot{s}\\left(1 - \\dfrac{m\\cos^2\\alpha}{M+m}\\right) = g\\sin\\alpha$，故\\n$\\ddot{s} = \\dfrac{(M+m)g\\sin\\alpha}{M + m\\sin^2\\alpha}$，$\\ddot{x} = -\\dfrac{mg\\sin\\alpha\\cos\\alpha}{M + m\\sin^2\\alpha}$（负号表示楔块向左后退）。',
      },
    ],
    answer: '$L = \\tfrac12(M+m)\\dot{x}^2 + m\\cos\\alpha\\,\\dot{x}\\dot{s} + \\tfrac12 m\\dot{s}^2 + mg s\\sin\\alpha$；$x$ 为循环坐标，守恒量 $(M+m)\\dot{x} + m\\dot{s}\\cos\\alpha = 0$ 即水平总动量；$\\ddot{s} = \\dfrac{(M+m)g\\sin\\alpha}{M+m\\sin^2\\alpha}$，$\\ddot{x} = -\\dfrac{mg\\sin\\alpha\\cos\\alpha}{M+m\\sin^2\\alpha}$。',
    tags: ['拉格朗日方程', '循环坐标', '动量守恒', '动能交叉项'],
  },

  // ─────────────────────── 变分原理 ───────────────────────
  {
    id: 'analytical-mechanics-p3',
    courseId: 'analytical-mechanics',
    topicId: 'variational-principle',
    title: '用哈密顿原理导出谐振子的运动方程',
    difficulty: 2,
    question: '质量为 $m$ 的质点在刚度为 $k$ 的轻弹簧作用下沿 $x$ 轴运动，取平衡位置为原点、位移 $x$ 为广义坐标。已知作用量 $S = \\int_{t_1}^{t_2} L\\,dt$，哈密顿原理断言真实运动使 $\\delta S = 0$。求：(1) 写出拉格朗日量与作用量；(2) 对路径作等时变分，利用端点条件 $\\delta x(t_1) = \\delta x(t_2) = 0$ 与关系 $\\delta\\dot{x} = \\frac{d}{dt}(\\delta x)$，通过分部积分把 $\\delta S$ 化为只含 $\\delta x$ 的积分；(3) 由 $\\delta S = 0$ 对任意 $\\delta x$ 成立，导出运动方程；(4) 说明所得方程与第二类拉格朗日方程一致，并给出振动角频率。',
    hints: [
      '变分只作用于路径、不作用于时间：等时变分满足 $\\delta\\dot{x} = \\frac{d}{dt}\\delta x$，即变分与求导可交换。',
      '分部积分：$\\int m\\dot{x}\\,\\frac{d}{dt}(\\delta x)\\,dt = [m\\dot{x}\\,\\delta x]_{t_1}^{t_2} - \\int m\\ddot{x}\\,\\delta x\\,dt$，边界项由固定端点条件消去。',
      '变分法基本引理：$\\int f(t)\\,\\delta x\\,dt = 0$ 对任意 $\\delta x(t)$ 成立，则 $f(t) \\equiv 0$。',
    ],
    solution: [
      {
        title: '写出拉格朗日量与作用量',
        detail: '$T = \\tfrac12 m\\dot{x}^2$，$V = \\tfrac12 kx^2$，故 $L = \\tfrac12 m\\dot{x}^2 - \\tfrac12 kx^2$，作用量 $S = \\displaystyle\\int_{t_1}^{t_2}\\left(\\tfrac12 m\\dot{x}^2 - \\tfrac12 kx^2\\right)dt$。',
      },
      {
        title: '取一阶变分',
        detail: '$\\delta S = \\displaystyle\\int_{t_1}^{t_2}\\left(m\\dot{x}\\,\\delta\\dot{x} - kx\\,\\delta x\\right)dt$。代入 $\\delta\\dot{x} = \\frac{d}{dt}(\\delta x)$：$\\delta S = \\displaystyle\\int_{t_1}^{t_2} m\\dot{x}\\,\\frac{d}{dt}(\\delta x)\\,dt - \\int_{t_1}^{t_2} kx\\,\\delta x\\,dt$。',
      },
      {
        title: '分部积分并消去边界项',
        detail: '第一项分部积分：$\\displaystyle\\int m\\dot{x}\\,\\frac{d}{dt}(\\delta x)\\,dt = \\big[m\\dot{x}\\,\\delta x\\big]_{t_1}^{t_2} - \\int m\\ddot{x}\\,\\delta x\\,dt$。由端点条件 $\\delta x(t_1) = \\delta x(t_2) = 0$，边界项为零，于是 $\\delta S = -\\displaystyle\\int_{t_1}^{t_2}\\left(m\\ddot{x} + kx\\right)\\delta x\\,dt$。',
      },
      {
        title: '由任意性得运动方程',
        detail: '真实运动要求 $\\delta S = 0$ 对区间内任意 $\\delta x(t)$ 成立，由变分法基本引理得 $m\\ddot{x} + kx = 0$。另一方面，$\\partial L/\\partial x = -kx$、$\\partial L/\\partial\\dot{x} = m\\dot{x}$，代入第二类拉格朗日方程 $\\frac{d}{dt}(m\\dot{x}) - (-kx) = 0$，结果完全一致。振动角频率 $\\omega = \\sqrt{k/m}$。',
      },
    ],
    answer: '运动方程 $m\\ddot{x} + kx = 0$，即 $\\ddot{x} + \\omega^2 x = 0$，$\\omega = \\sqrt{k/m}$；与第二类拉格朗日方程给出的结果一致。',
    tags: ['哈密顿原理', '变分法', '谐振子', '分部积分'],
  },

  // ─────────────────────── 哈密顿力学 / 泊松括号 ───────────────────────
  {
    id: 'analytical-mechanics-p4',
    courseId: 'analytical-mechanics',
    topicId: 'hamilton-eq',
    title: '谐振子的哈密顿正则方程与泊松括号验证',
    difficulty: 2,
    question: '一维谐振子质量为 $m$、刚度为 $k$，拉格朗日量 $L = \\tfrac12 m\\dot{x}^2 - \\tfrac12 kx^2$。求：(1) 求广义动量 $p$，作勒让德变换求哈密顿函数 $H(x, p)$（务必把 $\\dot{x}$ 用 $p$ 表示）；(2) 写出正则方程并求通解 $x(t)$；(3) 用泊松括号 $\\{u, v\\} = \\frac{\\partial u}{\\partial x}\\frac{\\partial v}{\\partial p} - \\frac{\\partial u}{\\partial p}\\frac{\\partial v}{\\partial x}$ 计算 $\\{x, H\\}$、$\\{p, H\\}$，验证与正则方程一致，并验证基本括号 $\\{x, p\\} = 1$；(4) 计算 $\\frac{dH}{dt} = \\{H, H\\} + \\frac{\\partial H}{\\partial t}$，说明能量守恒。',
    hints: [
      '广义动量 $p = \\partial L/\\partial\\dot{x} = m\\dot{x}$，故 $\\dot{x} = p/m$；勒让德变换 $H = p\\dot{x} - L$ 完成后 $H$ 中不应再出现 $\\dot{x}$。',
      '先解 $\\dot{p} = -kx$、$\\dot{x} = p/m$ 的耦合线性方程组：对 $x$ 求两次导即得 $\\ddot{x} + \\omega^2 x = 0$。',
      '计算泊松括号时代入定义逐项求偏导；$\\{H, H\\}$ 由反对称性直接为零。',
    ],
    solution: [
      {
        title: '勒让德变换求哈密顿函数',
        detail: '$p = \\dfrac{\\partial L}{\\partial\\dot{x}} = m\\dot{x}$，反解 $\\dot{x} = p/m$。于是\\n$H = p\\dot{x} - L = \\dfrac{p^2}{m} - \\left(\\dfrac{p^2}{2m} - \\tfrac12 kx^2\\right) = \\dfrac{p^2}{2m} + \\tfrac12 kx^2$。',
      },
      {
        title: '正则方程与通解',
        detail: '$\\dot{x} = \\dfrac{\\partial H}{\\partial p} = \\dfrac{p}{m}$，$\\dot{p} = -\\dfrac{\\partial H}{\\partial x} = -kx$。消去 $p$：$\\ddot{x} = \\dot{p}/m = -\\dfrac{k}{m}x$，即 $\\ddot{x} + \\omega^2 x = 0$（$\\omega = \\sqrt{k/m}$）。通解 $x = A\\sin(\\omega t + \\varphi_0)$，$p = mA\\omega\\cos(\\omega t + \\varphi_0)$。',
      },
      {
        title: '泊松括号验证',
        detail: '$\\{x, H\\} = \\dfrac{\\partial x}{\\partial x}\\dfrac{\\partial H}{\\partial p} - \\dfrac{\\partial x}{\\partial p}\\dfrac{\\partial H}{\\partial x} = \\dfrac{p}{m} = \\dot{x}$；$\\{p, H\\} = \\dfrac{\\partial p}{\\partial x}\\dfrac{\\partial H}{\\partial p} - \\dfrac{\\partial p}{\\partial p}\\dfrac{\\partial H}{\\partial x} = -kx = \\dot{p}$。均与正则方程一致。基本括号 $\\{x, p\\} = \\dfrac{\\partial x}{\\partial x}\\dfrac{\\partial p}{\\partial p} - 0 = 1$。',
      },
      {
        title: '能量守恒',
        detail: '$\\dfrac{dH}{dt} = \\{H, H\\} + \\dfrac{\\partial H}{\\partial t}$。由反对称性 $\\{H, H\\} \\equiv 0$，且 $H$ 不显含时间，$\\partial H/\\partial t = 0$，故 $dH/dt = 0$，机械能 $E = H = \\dfrac{p^2}{2m} + \\tfrac12 kx^2$ 守恒（相轨道为椭圆 $p^2/2m + kx^2/2 = E$）。',
      },
    ],
    answer: '$H = \\dfrac{p^2}{2m} + \\tfrac12 kx^2$；$\\dot{x} = p/m$，$\\dot{p} = -kx$，通解 $x = A\\sin(\\omega t + \\varphi_0)$（$\\omega = \\sqrt{k/m}$）；$\\{x, H\\} = \\dot{x}$，$\\{p, H\\} = \\dot{p}$，$\\{x, p\\} = 1$；$dH/dt = 0$，能量守恒。',
    tags: ['哈密顿正则方程', '勒让德变换', '泊松括号', '守恒量'],
  },

  // ─────────────────────── 微振动 ───────────────────────
  {
    id: 'analytical-mechanics-p5',
    courseId: 'analytical-mechanics',
    topicId: 'small-oscillations',
    title: '弹簧耦合双摆的简正频率与简正模',
    difficulty: 3,
    question: '两个相同的单摆（摆长 $l$、摆球质量 $m$）悬挂在同一水平支架上，在距悬点 $d$ 处由刚度为 $k$ 的轻弹簧水平相连，弹簧自然长度恰等于两悬点的水平间距。系统在竖直平面内做小振动，取两摆与竖直方向夹角 $\\theta_1$、$\\theta_2$ 为广义坐标。求：(1) 写出系统动能与势能的二次型；(2) 建立微振动方程组，写出久期方程并求两个简正频率；(3) 指出与同相、反相振动对应的简正模；(4) 代入 $m = 0.50\\ \\text{kg}$、$l = 1.0\\ \\text{m}$、$d = 0.50\\ \\text{m}$、$k = 20\\ \\text{N/m}$、$g = 9.8\\ \\text{m/s}^2$ 求数值。',
    hints: [
      '摆球速度大小为 $l\\dot{\\theta}_i$；弹簧两端连接点的水平位移约为 $d\\theta_i$，弹簧伸长量为二者之差 $d(\\theta_2 - \\theta_1)$。',
      '重力势能对每摆贡献 $mg\\cdot\\frac{l\\theta^2}{2}$（小角度近似 $1-\\cos\\theta \\approx \\theta^2/2$）。',
      '先用"猜模"法：设 $\\theta_1 = \\theta_2$（同相）与 $\\theta_1 = -\\theta_2$（反相）代入方程直接读出频率，再用久期方程 $\\det(\\mathbf{K} - \\omega^2\\mathbf{M}) = 0$ 一般化验证。',
    ],
    solution: [
      {
        title: '写出二次型',
        detail: '小振动下摆球速率 $v_i = l\\dot{\\theta}_i$，$T = \\tfrac12 ml^2(\\dot{\\theta}_1^2 + \\dot{\\theta}_2^2)$。势能：重力部分 $V_g = \\tfrac12 mgl(\\theta_1^2 + \\theta_2^2)$；弹簧伸长量 $\\approx d(\\theta_2 - \\theta_1)$，$V_s = \\tfrac12 k d^2(\\theta_1 - \\theta_2)^2$。',
      },
      {
        title: '建立方程与久期方程',
        detail: '代入拉格朗日方程：$ml^2\\ddot{\\theta}_1 + mgl\\theta_1 + kd^2(\\theta_1 - \\theta_2) = 0$，$ml^2\\ddot{\\theta}_2 + mgl\\theta_2 - kd^2(\\theta_1 - \\theta_2) = 0$。质量矩阵 $\\mathbf{M} = ml^2\\mathbf{I}$，刚度矩阵 $\\mathbf{K} = \\begin{pmatrix} mgl + kd^2 & -kd^2 \\\\ -kd^2 & mgl + kd^2 \\end{pmatrix}$。设 $\\theta_i = A_i e^{i\\omega t}$，久期方程 $\\det(\\mathbf{K} - \\omega^2\\mathbf{M}) = (mgl + kd^2 - ml^2\\omega^2)^2 - k^2d^4 = 0$。',
      },
      {
        title: '解出简正频率与简正模',
        detail: '由 $(mgl + kd^2 - ml^2\\omega^2) = \\pm kd^2$ 得两组解：$\\omega_1^2 = g/l$，对应 $A_1 = A_2$（同相模：弹簧全程不形变，与单个摆同频）；$\\omega_2^2 = g/l + \\dfrac{2kd^2}{ml^2}$，对应 $A_1 = -A_2$（反相模：弹簧被反复拉伸压缩，频率被耦合抬高）。',
      },
      {
        title: '数值代入',
        detail: '$\\omega_1 = \\sqrt{9.8/1.0} \\approx 3.13\\ \\text{rad/s}$；$\\omega_2^2 = 9.8 + \\dfrac{2\\times 20\\times 0.50^2}{0.50\\times 1.0} = 9.8 + 20 = 29.8\\ \\text{s}^{-2}$，$\\omega_2 \\approx 5.46\\ \\text{rad/s}$。反相模与同相模频率之比约 $1.74$，耦合越强（$k$、$d$ 越大）劈裂越大。',
      },
    ],
    answer: '$\\omega_1 = \\sqrt{g/l} \\approx 3.13\\ \\text{rad/s}$（同相模 $\\theta_1 = \\theta_2$），$\\omega_2 = \\sqrt{g/l + 2kd^2/(ml^2)} \\approx 5.46\\ \\text{rad/s}$（反相模 $\\theta_1 = -\\theta_2$）。',
    tags: ['微振动', '简正频率', '耦合摆', '久期方程'],
  },

  // ─────────────────────── 刚体与陀螺 ───────────────────────
  {
    id: 'analytical-mechanics-p6',
    courseId: 'analytical-mechanics',
    topicId: 'rigid-body-top',
    title: '对称重陀螺的稳态进动角速度',
    difficulty: 3,
    question: '对称陀螺（$I_1 = I_2 = 5.0\\times 10^{-4}\\ \\text{kg·m}^2$，$I_3 = 1.0\\times 10^{-4}\\ \\text{kg·m}^2$）绕对称轴以角速度 $\\omega_3 = 200\\ \\text{rad/s}$ 高速自转，一点固定于支点 $O$，质心距 $O$ 为 $l = 0.05\\ \\text{m}$，质量 $m = 0.20\\ \\text{kg}$，$g = 9.8\\ \\text{m/s}^2$。已知陀螺的拉格朗日函数为 $L = \\tfrac12 I_1(\\dot{\\theta}^2 + \\dot{\\varphi}^2\\sin^2\\theta) + \\tfrac12 I_3(\\dot{\\psi} + \\dot{\\varphi}\\cos\\theta)^2 - mgl\\cos\\theta$。求：(1) 由 $L$ 指出循环坐标并写出两个守恒量 $p_\\varphi$、$p_\\psi$；(2) 证明当章动角 $\\theta$ 保持不变（稳态进动）时，进动角速度 $\\Omega = \\dot{\\varphi}$ 满足 $I_1\\Omega^2\\cos\\theta - I_3\\omega_3\\Omega + mgl = 0$；(3) 对快速陀螺求慢进动近似 $\\Omega \\approx mgl/(I_3\\omega_3)$ 并代入数值；(4) 说明二次方程存在实根的条件及两个根的物理意义。',
    hints: [
      '循环坐标：看 $\\partial L/\\partial\\varphi$ 与 $\\partial L/\\partial\\psi$ 是否为零；守恒量即相应广义动量 $p_\\psi = \\partial L/\\partial\\dot{\\psi} = I_3(\\dot{\\psi} + \\dot{\\varphi}\\cos\\theta) = I_3\\omega_3$。',
      '稳态进动即 $\\dot{\\theta} = \\ddot{\\theta} = 0$：代入 $\\theta$ 的拉格朗日方程 $\\frac{d}{dt}(I_1\\dot{\\theta}) - \\frac{\\partial L}{\\partial\\theta} = 0$，令 $\\frac{\\partial L}{\\partial\\theta} = 0$ 即得关于 $\\Omega$ 的方程。',
      '慢进动近似要求 $mgl \\ll I_3\\omega_3^2$；二次方程判别式 $I_3^2\\omega_3^2 - 4I_1mgl\\cos\\theta \\ge 0$ 决定稳态进动是否存在。',
    ],
    solution: [
      {
        title: '循环坐标与守恒量',
        detail: '$L$ 中不显含 $\\varphi$ 与 $\\psi$，二者均为循环坐标。守恒量：$p_\\varphi = \\dfrac{\\partial L}{\\partial\\dot{\\varphi}} = I_1\\dot{\\varphi}\\sin^2\\theta + I_3(\\dot{\\psi} + \\dot{\\varphi}\\cos\\theta)\\cos\\theta = I_1\\dot{\\varphi}\\sin^2\\theta + I_3\\omega_3\\cos\\theta$（对竖直轴的角动量）；$p_\\psi = \\dfrac{\\partial L}{\\partial\\dot{\\psi}} = I_3\\omega_3$（沿对称轴的角动量分量）。',
      },
      {
        title: '稳态进动条件的推导',
        detail: '$\\theta$ 方程：$\\dfrac{d}{dt}(I_1\\dot{\\theta}) - \\dfrac{\\partial L}{\\partial\\theta} = 0$，其中 $\\dfrac{\\partial L}{\\partial\\theta} = I_1\\dot{\\varphi}^2\\sin\\theta\\cos\\theta - I_3(\\dot{\\psi} + \\dot{\\varphi}\\cos\\theta)\\dot{\\varphi}\\sin\\theta + mgl\\sin\\theta$。稳态进动 $\\dot{\\theta} = \\ddot{\\theta} = 0$ 要求 $\\partial L/\\partial\\theta = 0$，除以 $\\sin\\theta$ 并令 $\\Omega = \\dot{\\varphi}$、$\\omega_3 = \\dot{\\psi} + \\Omega\\cos\\theta$：\\n$mgl = I_3\\omega_3\\Omega - I_1\\Omega^2\\cos\\theta$，即 $I_1\\Omega^2\\cos\\theta - I_3\\omega_3\\Omega + mgl = 0$。',
      },
      {
        title: '慢进动近似与数值',
        detail: '快速陀螺满足 $mgl \\ll I_3\\omega_3^2$，此时 $\\Omega^2$ 项可略，得 $\\Omega \\approx \\dfrac{mgl}{I_3\\omega_3}$。数值：$mgl = 0.20\\times 9.8\\times 0.05 = 0.098\\ \\text{N·m}$，$I_3\\omega_3 = 1.0\\times 10^{-4}\\times 200 = 0.020\\ \\text{kg·m}^2\\text{/s}$，故 $\\Omega \\approx \\dfrac{0.098}{0.020} = 4.9\\ \\text{rad/s}$。近似性检验：$I_3\\omega_3^2 = 4\\ \\text{N·m} \\gg mgl = 0.098\\ \\text{N·m}$，近似可靠。',
      },
      {
        title: '实根条件与两个根',
        detail: '判别式 $\\Delta = I_3^2\\omega_3^2 - 4I_1mgl\\cos\\theta \\ge 0$ 时存在稳态进动：$\\Omega = \\dfrac{I_3\\omega_3 \\pm \\sqrt{I_3^2\\omega_3^2 - 4I_1mgl\\cos\\theta}}{2I_1\\cos\\theta}$。本题 $I_3^2\\omega_3^2 = 4.0\\times 10^{-4} > 4I_1mgl = 1.96\\times 10^{-4}$，常见倾角下两根均存在：慢根（约 $4.9\\ \\text{rad/s}$）是日常观察到的缓慢进动；快根（与 $\\omega_3$ 同量级）是叠加在慢进动上的快速进动，仅当精心设置初始条件时才显现。若不满足判别式，陀螺不做稳态进动而呈现明显章动。',
      },
    ],
    answer: '循环坐标 $\\varphi$、$\\psi$，守恒量 $p_\\varphi = I_1\\dot{\\varphi}\\sin^2\\theta + I_3\\omega_3\\cos\\theta$、$p_\\psi = I_3\\omega_3$；稳态进动满足 $I_1\\Omega^2\\cos\\theta - I_3\\omega_3\\Omega + mgl = 0$；慢进动 $\\Omega \\approx mgl/(I_3\\omega_3) = 4.9\\ \\text{rad/s}$；判别式 $I_3^2\\omega_3^2 \\ge 4I_1mgl\\cos\\theta$ 时有两根（慢进动与快进动）。',
    tags: ['对称陀螺', '进动', '欧拉角', '循环坐标'],
  },
];
