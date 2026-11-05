import type { Problem } from '@/types';

export const mathematical_physicsProblems: Problem[] = [
  // ─────────────────────── 第一章 解析与 C-R 条件 ───────────────────────
  {
    id: 'mathematical-physics-p1',
    courseId: 'mathematical-physics',
    topicId: 'mp-analytic-functions',
    title: '由 C-R 条件构造解析函数',
    difficulty: 1,
    question: '设 $u(x, y) = x^3 - 3xy^2$。(1) 证明 $u$ 是调和函数；(2) 求解析函数 $f(z) = u + iv$，使其虚部 $v$ 满足 $v(0, 0) = 0$；(3) 用复变量 $z$ 写出 $f$ 并验证导数公式 $f^{\\prime}(z) = u_x + i v_x$。',
    hints: [
      '调和性即验证 $u_{xx} + u_{yy} = 0$，直接求两个二阶偏导。',
      'C-R 条件给出 $v_y = u_x$、$v_x = -u_y$：先对 $y$ 积分 $v_y = u_x$，保留待定函数 $g(x)$，再用第二条方程定出 $g$。',
      '拼出 $f = u + iv$ 后把 $x = \\frac{z + \\bar z}{2}$、$y = \\frac{z - \\bar z}{2i}$ 代入，$\\bar z$ 项应全部消去。',
    ],
    solution: [
      {
        title: '验证调和性',
        detail: '$u_x = 3x^2 - 3y^2$，$u_y = -6xy$；再求一次导：$u_{xx} = 6x$，$u_{yy} = -6x$。于是 $u_{xx} + u_{yy} = 6x - 6x = 0$，$u$ 在全平面调和。',
      },
      {
        title: '用 C-R 条件求虚部',
        detail: '由 $v_y = u_x = 3x^2 - 3y^2$，把 $x$ 视为常数对 $y$ 积分：$v = 3x^2 y - y^3 + g(x)$。再由 $v_x = 6xy + g^{\\prime}(x)$ 应等于 $-u_y = 6xy$，得 $g^{\\prime}(x) = 0$，故 $g(x) = C$。由 $v(0, 0) = 0$ 得 $C = 0$，于是 $v = 3x^2 y - y^3$。',
      },
      {
        title: '拼合与复变量化',
        detail: '$f = (x^3 - 3xy^2) + i(3x^2 y - y^3)$。识别出这正是 $(x + iy)^3$ 的展开：$z^3 = x^3 + 3x^2(iy) + 3x(iy)^2 + (iy)^3 = (x^3 - 3xy^2) + i(3x^2 y - y^3)$。故 $f(z) = z^3$，在全平面解析（也可由代换 $x = \\frac{z + \\bar z}{2}$、$y = \\frac{z - \\bar z}{2i}$ 代入后验证 $\\bar z$ 项消去）。',
      },
      {
        title: '验证导数公式',
        detail: '$u_x + i v_x = (3x^2 - 3y^2) + i(6xy)$，而 $f^{\\prime}(z) = 3z^2 = 3(x + iy)^2 = 3(x^2 - y^2) + i\\,6xy$，两者一致，C-R 条件下的导数公式得到验证。',
      },
    ],
    answer: '$u$ 调和；$v = 3x^2 y - y^3$；$f(z) = z^3$；$f^{\\prime}(z) = 3z^2 = u_x + i v_x$',
    tags: ['C-R 条件', '调和函数', '解析函数构造'],
  },

  // ─────────────────────── 第二章 留数求实积分 ───────────────────────
  {
    id: 'mathematical-physics-p2',
    courseId: 'mathematical-physics',
    topicId: 'complex-integration',
    title: '用留数定理计算实积分',
    difficulty: 2,
    question: '计算反常积分 $\\displaystyle I = \\int_{-\\infty}^{+\\infty} \\frac{dx}{(1 + x^2)^2}$。',
    hints: [
      '补上半平面大半圆构成闭围道；被积函数 $f(z) = \\frac{1}{(1 + z^2)^2}$ 分母四次、分子零次，大圆弧上的积分用 ML 不等式估计趋于零。',
      '$z = \\pm i$ 是分母的二阶零点，故 $z = i$ 是二阶极点，只有它在围道内。',
      '二阶极点留数公式：$\\mathrm{Res} = \\lim_{z \\to z_0} \\frac{d}{dz} \\left[ (z - z_0)^2 f(z) \\right]$。',
    ],
    solution: [
      {
        title: '围道与收敛估计',
        detail: '取 $f(z) = \\frac{1}{(1 + z^2)^2}$，围道为 $[-R, R]$ 加上半圆 $C_R: z = R e^{i\\theta}$。在 $C_R$ 上 $|f(z)| \\le \\frac{1}{(R^2 - 1)^2}$，弧长为 $\\pi R$，故 $\\left| \\int_{C_R} f\\, dz \\right| \\le \\frac{\\pi R}{(R^2 - 1)^2} \\to 0$（当 $R \\to \\infty$）。于是 $I = 2\\pi i \\times$（上半平面极点的留数和）。',
      },
      {
        title: '求二阶极点的留数',
        detail: '上半平面内唯一奇点是 $z = i$（二阶极点）。$\\mathrm{Res} = \\lim_{z \\to i} \\frac{d}{dz} \\left[ (z - i)^2 \\frac{1}{(z^2 + 1)^2} \\right] = \\lim_{z \\to i} \\frac{d}{dz} \\frac{1}{(z + i)^2} = \\lim_{z \\to i} \\frac{-2}{(z + i)^3} = \\frac{-2}{(2i)^3} = \\frac{-2}{-8i} = \\frac{1}{4i}$。',
      },
      {
        title: '代入留数定理',
        detail: '$I = 2\\pi i \\cdot \\frac{1}{4i} = \\frac{\\pi}{2}$。顺带由偶函数对称性，$\\int_0^{\\infty} \\frac{dx}{(1 + x^2)^2} = \\frac{\\pi}{4}$。',
      },
    ],
    answer: '$\\displaystyle \\int_{-\\infty}^{+\\infty} \\frac{dx}{(1 + x^2)^2} = \\frac{\\pi}{2}$',
    tags: ['留数定理', '二阶极点', '围道积分'],
  },

  // ─────────────────────── 第三章 洛朗展开与奇点分类 ───────────────────────
  {
    id: 'mathematical-physics-p3',
    courseId: 'mathematical-physics',
    topicId: 'mp-power-series',
    title: '函数的洛朗展开与奇点分类',
    difficulty: 2,
    question: '设 $f(z) = \\frac{1}{(z - 1)(z - 2)}$。(1) 求 $f$ 在以 $z = 0$ 为中心的三个圆环 $|z| < 1$、$1 < |z| < 2$、$|z| > 2$ 内的洛朗展开；(2) 指出 $f$ 的全部孤立奇点及其类型，并求各点的留数。',
    hints: [
      '先部分分式：$f(z) = \\frac{1}{z - 2} - \\frac{1}{z - 1}$。',
      '几何级数两个方向：$\\frac{1}{1 - w} = \\sum_{n \\ge 0} w^n$（$|w| < 1$）；$\\frac{1}{w - 1} = \\sum_{n \\ge 1} w^{-n}$（$|w| > 1$）。按圆环决定每个分式用哪一侧。',
      '留数就是展开式中 $(z - z_0)^{-1}$ 项的系数，可与极限公式 $\\lim (z - z_0) f(z)$ 互相验证。',
    ],
    solution: [
      {
        title: '部分分式拆解',
        detail: '设 $\\frac{1}{(z-1)(z-2)} = \\frac{A}{z - 1} + \\frac{B}{z - 2}$。令 $z = 1$ 得 $A = -1$；令 $z = 2$ 得 $B = 1$。故 $f(z) = \\frac{1}{z - 2} - \\frac{1}{z - 1}$。',
      },
      {
        title: '区域 $|z| < 1$：泰勒展开',
        detail: '两项都按正幂展开：$\\frac{1}{z - 2} = -\\frac{1}{2} \\cdot \\frac{1}{1 - z/2} = -\\sum_{n=0}^{\\infty} \\frac{z^n}{2^{n+1}}$；$-\\frac{1}{z - 1} = -\\sum_{n=0}^{\\infty} z^n$。合并得 $f = -\\sum_{n=0}^{\\infty} \\left( 1 + \\frac{1}{2^{n+1}} \\right) z^n$，无负幂项，是泰勒级数。',
      },
      {
        title: '区域 $1 < |z| < 2$：混合展开',
        detail: '$\\frac{1}{z - 2} = -\\frac{1}{2} \\cdot \\frac{1}{1 - z/2} = -\\sum_{n=0}^{\\infty} \\frac{z^n}{2^{n+1}}$（$|z/2| < 1$ 成立）；$-\\frac{1}{z - 1} = -\\frac{1}{z} \\cdot \\frac{1}{1 - 1/z} = -\\sum_{n=1}^{\\infty} z^{-n}$（$|1/z| < 1$ 成立）。故 $f = -\\sum_{n=1}^{\\infty} z^{-n} - \\sum_{n=0}^{\\infty} \\frac{z^n}{2^{n+1}}$，正负幂并存。',
      },
      {
        title: '区域 $|z| > 2$：全负幂展开',
        detail: '$\\frac{1}{z - 2} = \\frac{1}{z} \\cdot \\frac{1}{1 - 2/z} = \\sum_{n=0}^{\\infty} \\frac{2^n}{z^{n+1}}$；$-\\frac{1}{z - 1} = -\\sum_{n=1}^{\\infty} z^{-n}$。合并（$n \\ge 1$ 的负幂系数为 $2^{n-1} - 1$）：$f = \\sum_{n=1}^{\\infty} \\left( 2^{n-1} - 1 \\right) z^{-n}$。',
      },
      {
        title: '奇点分类与留数',
        detail: '孤立奇点为 $z = 1$ 与 $z = 2$，分母各为一阶零点，故均为一阶极点。$\\mathrm{Res}\\big|_{z=1} = \\lim_{z \\to 1} (z - 1) f = \\frac{1}{1 - 2} = -1$；$\\mathrm{Res}\\big|_{z=2} = \\lim_{z \\to 2} (z - 2) f = \\frac{1}{2 - 1} = 1$。与展开式核对：$1 < |z| < 2$ 的展开中 $z^{-1}$ 系数为 $-1$（来自 $z = 1$ 的主要部分），$|z| > 2$ 的展开中 $z^{-1}$ 系数为 $2^0 - 1 = 0$，恰等于两点留数之和 $-1 + 1 = 0$（无穷远点为可去奇点，留数为 0）。',
      },
    ],
    answer: '$|z|<1$：$-\\sum \\left(1 + 2^{-(n+1)}\\right) z^n$；$1<|z|<2$：$-\\sum_{n\\ge1} z^{-n} - \\sum_{n\\ge0} 2^{-(n+1)} z^n$；$|z|>2$：$\\sum_{n\\ge1} (2^{n-1} - 1) z^{-n}$；$z = 1$ 与 $z = 2$ 均为一阶极点，留数分别为 $-1$ 与 $1$',
    tags: ['洛朗展开', '奇点分类', '部分分式'],
  },

  // ─────────────────────── 第四章 傅里叶变换解热传导 ───────────────────────
  {
    id: 'mathematical-physics-p4',
    courseId: 'mathematical-physics',
    topicId: 'fourier-analysis',
    title: '傅里叶变换求解热传导初值问题',
    difficulty: 2,
    question: '无限长细杆的热传导初值问题：$$u_t = a^2 u_{xx}, \\quad -\\infty < x < \\infty, \\ t > 0; \\qquad u(x, 0) = e^{-x^2}.$$ (1) 对 $x$ 作傅里叶变换，求 $\\hat u(\\omega, t)$；(2) 逆变换求 $u(x, t)$；(3) 说明解在 $t > 0$ 时的光滑性并解释物理含义。',
    hints: [
      '变换约定 $\\hat u(\\omega, t) = \\int u(x, t) e^{-i\\omega x} dx$，微分性质 $\\mathcal{F}[u_{xx}] = -\\omega^2 \\hat u$。',
      '高斯函数的变换还是高斯：$\\mathcal{F}[e^{-x^2}] = \\sqrt{\\pi}\\, e^{-\\omega^2/4}$。',
      '逆变换时把 $e^{-(1 + 4a^2 t)\\omega^2/4}$ 配成标准高斯形式 $\\sqrt{\\pi/\\beta}\\, e^{-\\omega^2/(4\\beta)}$ 的逆变换 $e^{-\\beta x^2}$。',
    ],
    solution: [
      {
        title: '变换化方程',
        detail: '对 $x$ 作傅里叶变换：$\\frac{\\partial \\hat u}{\\partial t} = -a^2 \\omega^2 \\hat u$，这是以 $\\omega$ 为参数的一阶常微分方程，初值为 $\\hat u(\\omega, 0) = \\mathcal{F}[e^{-x^2}] = \\sqrt{\\pi}\\, e^{-\\omega^2/4}$。',
      },
      {
        title: '解出频域解',
        detail: '$\\hat u(\\omega, t) = \\sqrt{\\pi}\\, e^{-\\omega^2/4} \\cdot e^{-a^2 \\omega^2 t} = \\sqrt{\\pi}\\, e^{-(1 + 4a^2 t)\\omega^2/4}$。每个空间频率成分都以各自的衰减率 $e^{-a^2 \\omega^2 t}$ 弛豫：频率越高（空间结构越细）衰减越快。',
      },
      {
        title: '逆变换回时域',
        detail: '利用 $\\mathcal{F}^{-1}\\left[ \\sqrt{\\pi/\\beta}\\, e^{-\\omega^2/(4\\beta)} \\right] = e^{-\\beta x^2}$，取 $\\beta = \\frac{1}{1 + 4a^2 t}$，注意 $\\sqrt{\\pi/\\beta} = \\sqrt{\\pi (1 + 4a^2 t)}$ 恰好把分子中的 $\\sqrt{\\pi}$ 缩放抵消。',
      },
      {
        title: '光滑性与物理解读',
        detail: '解为 $u(x, t) = \\frac{1}{\\sqrt{1 + 4a^2 t}} \\exp\\left( -\\frac{x^2}{1 + 4a^2 t} \\right)$。当 $t \\to 0^+$ 时恢复初值；$t > 0$ 时 $u$ 关于 $x$ 无穷光滑——高频成分被指数压平，这正是热传导"抹平细节"的耗散本质；峰值 $u(0, t) = (1 + 4a^2 t)^{-1/2}$ 衰减、脉冲宽度按 $\\sqrt{1 + 4a^2 t}$ 展宽，总热量 $\\int u\\, dx = \\sqrt{\\pi}$ 保持不变（能量守恒）。',
      },
    ],
    answer: '$\\hat u(\\omega, t) = \\sqrt{\\pi}\\, e^{-(1 + 4a^2 t)\\omega^2/4}$；$u(x, t) = \\dfrac{1}{\\sqrt{1 + 4a^2 t}} \\exp\\left( -\\dfrac{x^2}{1 + 4a^2 t} \\right)$',
    tags: ['傅里叶变换', '热传导方程', '高斯核'],
  },

  // ─────────────────────── 第六章 矩形域拉普拉斯方程 ───────────────────────
  {
    id: 'mathematical-physics-p5',
    courseId: 'mathematical-physics',
    topicId: 'separation-variables',
    title: '矩形域拉普拉斯方程的分离变量',
    difficulty: 3,
    question: '在矩形域 $0 < x < a$，$0 < y < b$ 上求拉普拉斯方程的解：$$u_{xx} + u_{yy} = 0$$ 边界条件为 $u(0, y) = 0$，$u(x, 0) = 0$，$u(x, b) = 0$，$u(a, y) = u_0$（常数）。(1) 分离变量并解出本征值问题；(2) 写出满足三条齐次边条件的一般叠加解；(3) 用第四条边条件定出全部系数，并计算 $u$ 在矩形中心 $\\left( \\frac{a}{2}, \\frac{b}{2} \\right)$ 的值（写出级数形式即可）。',
    hints: [
      '齐次方向选 $y$：设 $u = X(x) Y(y)$，$Y$ 满足 $Y^{\\prime\\prime} + \\lambda Y = 0$，$Y(0) = Y(b) = 0$。',
      '与热传导问题完全同型：$Y_n = \\sin \\frac{n\\pi y}{b}$，$\\lambda_n = \\left( \\frac{n\\pi}{b} \\right)^2$；$X$ 方程 $X^{\\prime\\prime} - \\lambda_n X = 0$ 的解用双曲函数写最方便，且 $X(0) = 0$ 剔除 $\\cosh$。',
      '常数 $u_0$ 在 $(0, b)$ 上的傅里叶正弦展开只有奇数 $n$：$u_0 = \\sum_{n \\ \\text{奇}} \\frac{4 u_0}{n \\pi} \\sin \\frac{n\\pi y}{b}$。',
    ],
    solution: [
      {
        title: '分离变量与本征值问题',
        detail: '代入 $u = X(x) Y(y)$：$\\frac{X^{\\prime\\prime}}{X} = -\\frac{Y^{\\prime\\prime}}{Y} = \\lambda$。$y$ 方向取本征值问题 $Y^{\\prime\\prime} + \\lambda Y = 0$，$Y(0) = Y(b) = 0$。与弦振动情形相同：$\\lambda < 0$ 与 $\\lambda = 0$ 只给零解；$\\lambda > 0$ 时 $Y = A \\cos \\sqrt{\\lambda} y + B \\sin \\sqrt{\\lambda} y$，由 $Y(0) = 0$ 得 $A = 0$，由 $Y(b) = 0$ 得 $\\sqrt{\\lambda} b = n\\pi$。故 $\\lambda_n = \\left( \\frac{n\\pi}{b} \\right)^2$，$Y_n = \\sin \\frac{n\\pi y}{b}$，$n = 1, 2, \\ldots$。',
      },
      {
        title: '解 $x$ 方向方程并叠加',
        detail: '$X^{\\prime\\prime} - \\lambda_n X = 0$，通解 $X_n = C_n \\cosh \\frac{n\\pi x}{b} + D_n \\sinh \\frac{n\\pi x}{b}$。条件 $u(0, y) = 0$ 即 $X_n(0) = 0$，而 $\\cosh(0) = 1 \\ne 0$，故 $C_n = 0$。叠加得 $u(x, y) = \\sum_{n=1}^{\\infty} D_n \\sinh \\frac{n\\pi x}{b} \\sin \\frac{n\\pi y}{b}$，同时满足全部三条齐次边界条件。',
      },
      {
        title: '定系数',
        detail: '令 $x = a$：$u_0 = \\sum_{n=1}^{\\infty} D_n \\sinh \\frac{n\\pi a}{b} \\sin \\frac{n\\pi y}{b}$。右端是常数 $u_0$ 的傅里叶正弦展开，系数为 $\\frac{2}{b} \\int_0^b u_0 \\sin \\frac{n\\pi y}{b} dy = \\frac{2 u_0}{n \\pi} \\left[ 1 - (-1)^n \\right]$（$n$ 偶为零，$n$ 奇为 $\\frac{4 u_0}{n \\pi}$）。故 $D_n = \\frac{4 u_0}{n \\pi \\sinh(n\\pi a/b)}$（$n$ 奇），偶数项为零。',
      },
      {
        title: '矩形中心的值',
        detail: '在 $\\left( \\frac{a}{2}, \\frac{b}{2} \\right)$：$\\sin \\frac{n\\pi}{2}$ 对奇数 $n$ 交替取 $\\pm 1$，$\\sinh \\frac{n\\pi a}{2b}$ 出现在分母。$u\\left( \\frac{a}{2}, \\frac{b}{2} \\right) = \\sum_{n \\ \\text{奇}} \\frac{4 u_0}{n \\pi} \\cdot \\frac{\\sin(n\\pi/2) \\, \\sinh(n\\pi/2b)}{\\sinh(n\\pi a/b)}$。级数被 $\\sinh$ 比值快速压低，取首项已有很好的近似；特别当 $a \\gg b$ 时中心值趋于 $\\frac{4 u_0}{\\pi} \\cdot \\frac{\\sinh(\\pi/2b)}{\\sinh(\\pi a/b)} \\approx 0$——远离热源的窄长矩形内部接近"冷"端，符合稳态传热的直觉。解的唯一性由极值原理保证：两组解之差在全部边界上为零，内部只能恒为零。',
      },
    ],
    answer: '$u(x, y) = \\displaystyle\\sum_{n \\ \\text{奇}} \\frac{4 u_0}{n \\pi \\sinh(n\\pi a/b)} \\sinh \\frac{n\\pi x}{b} \\sin \\frac{n\\pi y}{b}$；中心值为 $\\displaystyle\\sum_{n \\ \\text{奇}} \\frac{4 u_0}{n \\pi} \\frac{\\sin(n\\pi/2)\\,\\sinh(n\\pi/2b)}{\\sinh(n\\pi a/b)}$',
    tags: ['分离变量法', '拉普拉斯方程', '狄利克雷问题'],
  },

  // ─────────────────────── 第七章 勒让德展开球面边值 ───────────────────────
  {
    id: 'mathematical-physics-p6',
    courseId: 'mathematical-physics',
    topicId: 'special-functions',
    title: '勒让德多项式展开求解球面边值问题',
    difficulty: 3,
    question: '半径为 $a$ 的球面（$r = a$）上给定轴对称电势分布 $u(a, \\theta) = u_0 \\cos^2 \\theta$，求球内($r < a$)静电势 $u(r, \\theta)$（轴对称、在原点有限）。(1) 写出球内拉普拉斯方程轴对称解的一般形式；(2) 把边值按勒让德多项式展开；(3) 求出 $u(r, \\theta)$，并计算球心处的电势与 $r = a/2$、$\\theta = 0$ 处的电势。',
    hints: [
      '球内轴对称无奇点解：$u = \\sum_{l=0}^{\\infty} A_l r^l P_l(\\cos\\theta)$；$r^{-l-1}$ 项在原点发散必须剔除。',
      '$\\cos^2\\theta = \\frac{1 + \\cos 2\\theta}{2}$，再用 $P_0 = 1$、$P_2 = \\frac{3\\cos^2\\theta - 1}{2}$ 反解出 $\\cos^2\\theta = \\frac{1}{3} P_0 + \\frac{2}{3} P_2(\\cos\\theta)$。',
      '定系数用正交关系 $\\int_{-1}^{1} P_l P_m\\, dx = \\frac{2}{2l + 1} \\delta_{lm}$，或者直接比较系数（边值是有限个 $P_l$ 的组合时最省力）。',
    ],
    solution: [
      {
        title: '一般解形式',
        detail: '轴对称拉普拉斯方程在球坐标下分离变量，径向解为 $r^l$ 与 $r^{-l-1}$，角向为 $P_l(\\cos\\theta)$。球内要求在 $r = 0$ 有限，剔除 $r^{-l-1}$：$u(r, \\theta) = \\sum_{l=0}^{\\infty} A_l r^l P_l(\\cos\\theta)$。',
      },
      {
        title: '边值的勒让德展开',
        detail: '由 $P_2(x) = \\frac{3x^2 - 1}{2}$ 解出 $x^2 = \\frac{2 P_2(x) + 1}{3}$。代入 $x = \\cos\\theta$：$u_0 \\cos^2 \\theta = u_0 \\left[ \\frac{1}{3} P_0(\\cos\\theta) + \\frac{2}{3} P_2(\\cos\\theta) \\right]$，只有 $l = 0$ 与 $l = 2$ 两个成分。',
      },
      {
        title: '定系数写出解',
        detail: '令 $r = a$ 并比较 $P_l$ 系数：$A_0 = \\frac{u_0}{3}$，$A_2 a^2 = \\frac{2 u_0}{3}$，其余 $A_l = 0$。故 $u(r, \\theta) = \\frac{u_0}{3} + \\frac{2 u_0}{3} \\frac{r^2}{a^2} P_2(\\cos\\theta) = \\frac{u_0}{3} \\left[ 1 + \\frac{2 r^2}{a^2} \\cdot \\frac{3 \\cos^2 \\theta - 1}{2} \\right]$。',
      },
      {
        title: '特定点的值',
        detail: '球心 $r = 0$：$u = \\frac{u_0}{3}$——恰为边值 $u_0 \\cos^2\\theta$ 在球面上的平均值 $\\frac{1}{4\\pi} \\int u_0 \\cos^2\\theta\\, d\\Omega = \\frac{u_0}{3}$，是调和函数平均值性质的具体体现。$r = \\frac{a}{2}$、$\\theta = 0$（$P_2(1) = 1$）：$u = \\frac{u_0}{3} \\left( 1 + \\frac{2 \\cdot a^2/4}{a^2} \\right) = \\frac{u_0}{3} \\cdot \\frac{3}{2} = \\frac{u_0}{2}$。',
      },
    ],
    answer: '$u(r, \\theta) = \\dfrac{u_0}{3} + \\dfrac{2 u_0}{3} \\left( \\dfrac{r}{a} \\right)^2 P_2(\\cos\\theta)$；球心电势 $\\dfrac{u_0}{3}$；$r = a/2$、$\\theta = 0$ 处 $\\dfrac{u_0}{2}$',
    tags: ['勒让德多项式', '球面边值问题', '平均值性质'],
  },
];
