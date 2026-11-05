import type { FormulaGroup } from '@/types';

export const computational_physicsFormulaGroups: FormulaGroup[] = [
  {
    id: 'computational-physics-fg1',
    name: '误差分析与方程求根',
    courseId: 'computational-physics',
    formulas: [
      {
        id: 'computational-physics-f1',
        group: '误差度量',
        name: '绝对误差、相对误差与有效数字',
        latex:
          'e(x) = x - x^*, \\qquad e_r(x) = \\frac{x - x^*}{x^*}, \\qquad \\varepsilon_r \\le \\frac{1}{2a_1}\\times 10^{1-n}',
        note: 'x = ±0.a_1a_2…a_n × 10^m 且具有 n 位有效数字时成立；a_1 为首位有效数字',
      },
      {
        id: 'computational-physics-f2',
        group: '误差度量',
        name: '浮点运算模型与机器精度',
        latex:
          '\\mathrm{fl}(x\\ \\mathrm{op}\\ y) = (x\\ \\mathrm{op}\\ y)(1+\\delta), \\quad |\\delta| \\le u, \\quad u = 2^{-53} \\approx 1.11\\times 10^{-16}',
        note: 'IEEE 754 双精度；n 步运算最坏累积为 (1+u)^n ≈ 1 + nu',
      },
      {
        id: 'computational-physics-f3',
        group: '误差度量',
        name: '总误差与最优步长',
        latex:
          'E(h) = C_1 h^p + \\frac{C_2 u}{h}, \\qquad h_{\\mathrm{opt}} = \\left(\\frac{C_2 u}{p C_1}\\right)^{\\frac{1}{p+1}}',
        note: '截断误差随 h 减小而减小、舍入误差随 h 减小而增大；盲目减小步长反而变差',
      },
      {
        id: 'computational-physics-f4',
        group: '条件数',
        name: '相对条件数与前向误差',
        latex:
          '\\kappa_f(x) = \\left|\\frac{x f^{\\prime}(x)}{f(x)}\\right|, \\qquad \\text{前向误差} \\lesssim \\kappa_f(x) \\times \\text{后向误差}',
        note: '条件数是问题的属性；κ ≫ 1 为病态，如 ln x 在 x → 1 时 κ = 1/|ln x| → ∞',
      },
      {
        id: 'computational-physics-f5',
        group: '求根迭代',
        name: '二分法误差界与所需步数',
        latex:
          '|x_k - x^*| \\le \\frac{b-a}{2^{k+1}}, \\qquad N \\ge \\left\\lceil \\log_2 \\frac{b-a}{2\\varepsilon} \\right\\rceil',
        note: '只要 f(a)f(b) < 0 且 f 连续即收敛；每步固定得到 1 比特信息（约 0.301 个十进制位）',
      },
      {
        id: 'computational-physics-f6',
        group: '求根迭代',
        name: '牛顿迭代与二次收敛',
        latex:
          'x_{k+1} = x_k - \\frac{f(x_k)}{f^{\\prime}(x_k)}, \\qquad |e_{k+1}| \\approx \\left|\\frac{f^{\\prime\\prime}(x^*)}{2f^{\\prime}(x^*)}\\right| |e_k|^2',
        note: '单根处二次收敛（有效位数翻倍）；m 重根退化为线性收敛比 1 − 1/m，需改用 x_{k+1} = x_k − m f/f′',
      },
    ],
  },
  {
    id: 'computational-physics-fg2',
    name: '数值积分与常微分方程',
    courseId: 'computational-physics',
    formulas: [
      {
        id: 'computational-physics-f7',
        group: '数值积分',
        name: '复合梯形公式与误差',
        latex:
          'T_n = \\frac{h}{2}\\left(f_0 + 2\\sum_{k=1}^{n-1} f_k + f_n\\right), \\qquad E_{T_n} = -\\frac{b-a}{12}h^2 f^{\\prime\\prime}(\\xi) = O(h^2)',
        note: '代数精度 1；h = (b−a)/n；整体误差比单段误差低一阶',
      },
      {
        id: 'computational-physics-f8',
        group: '数值积分',
        name: '复合辛普森公式与误差',
        latex:
          'S_n = \\frac{h}{3}\\left(f_0 + 4\\sum_{k\\ \\mathrm{奇}} f_k + 2\\sum_{k\\ \\mathrm{偶}} f_k + f_n\\right), \\qquad E_{S_n} = -\\frac{b-a}{180}h^4 f^{(4)}(\\xi) = O(h^4)',
        note: '代数精度 3（偶阶牛顿–科茨因对称性多得一次）；要求子区间数 n 为偶数',
      },
      {
        id: 'computational-physics-f9',
        group: '数值积分',
        name: '龙贝格递推（理查森外推）',
        latex:
          'R_{k,0} = T(h/2^k), \\qquad R_{k,j} = R_{k,j-1} + \\frac{R_{k,j-1} - R_{k-1,j-1}}{4^j - 1}',
        note: '每列提升两阶精度；(4T(h/2) − T(h))/3 恰为复合辛普森值，反复外推即龙贝格算法',
      },
      {
        id: 'computational-physics-f10',
        group: '数值微分',
        name: '中心差分与最优步长',
        latex:
          'f^{\\prime}(x) \\approx \\frac{f(x+h) - f(x-h)}{2h}, \\qquad E(h) \\approx \\frac{h^2}{6}|f^{\\prime\\prime\\prime}| + \\frac{u|f|}{h}, \\quad h_{\\mathrm{opt}} \\sim u^{1/3}',
        note: '截断误差 O(h²) 而舍入误差 O(u/h)；双精度下 h_opt ≈ 6.7×10⁻⁶，最好精度仅约 10⁻¹⁰',
      },
      {
        id: 'computational-physics-f11',
        group: '常微分方程',
        name: '欧拉法与稳定条件',
        latex:
          'y_{n+1} = y_n + h f(t_n, y_n), \\qquad G(z) = 1 + z,\\ z = h\\lambda, \\qquad h \\le \\frac{2}{|\\lambda|}\\ (\\lambda < 0)',
        note: '隐式欧拉 G = (1 − hλ)^{-1} 为 A-稳定；梯形法 G = (1 + z/2)/(1 − z/2) 亦 A-稳定但不 L-稳定',
      },
      {
        id: 'computational-physics-f12',
        group: '常微分方程',
        name: '四阶龙格–库塔格式（RK4）',
        latex:
          'k_1 = f(t_n, y_n),\\ k_2 = f\\!\\left(t_n+\\tfrac h2, y_n+\\tfrac h2 k_1\\right),\\ k_3 = f\\!\\left(t_n+\\tfrac h2, y_n+\\tfrac h2 k_2\\right),\\ k_4 = f(t_n+h, y_n+h k_3) \\\\ y_{n+1} = y_n + \\frac h6 (k_1 + 2k_2 + 2k_3 + k_4)',
        note: '权重 1:2:2:1；局部截断误差 O(h⁵)、整体 O(h⁴)；实轴稳定区间约 [−2.785, 0]',
      },
    ],
  },
  {
    id: 'computational-physics-fg3',
    name: '有限差分、蒙特卡罗与本征值',
    courseId: 'computational-physics',
    formulas: [
      {
        id: 'computational-physics-f13',
        group: '有限差分',
        name: '二阶导数差分与 FTCS 格式',
        latex:
          '\\frac{\\partial^2 u}{\\partial x^2} \\approx \\frac{u_{j+1}^n - 2u_j^n + u_{j-1}^n}{\\Delta x^2}, \\qquad u_j^{n+1} = u_j^n + r\\left(u_{j+1}^n - 2u_j^n + u_{j-1}^n\\right)',
        note: 'r = αΔt/Δx²；截断误差 O(Δt) + O(Δx²)，即时间一阶、空间二阶',
      },
      {
        id: 'computational-physics-f14',
        group: '稳定性',
        name: 'CFL 稳定性条件',
        latex:
          'r = \\frac{\\alpha \\Delta t}{\\Delta x^2} \\le \\frac12\\ (\\text{抛物型}), \\qquad \\nu = \\frac{c\\Delta t}{\\Delta x} \\le 1\\ (\\text{双曲型})',
        note: '几何含义：数值依赖域必须包含物理依赖域；抛物型 Δt = O(Δx²)，双曲型 Δt = O(Δx)',
      },
      {
        id: 'computational-physics-f15',
        group: '稳定性',
        name: 'von Neumann 放大因子与谱半径',
        latex:
          '\\xi(k) = 1 - 4r\\sin^2\\frac{k\\Delta x}{2}, \\qquad \\rho(G) = \\max_k |\\xi(k)| \\le 1',
        note: 'u^{n+1} = G u^n；Lax 等价定理：相容 + 稳定 ⇔ 收敛；最危险的是锯齿模态 sin² = 1',
      },
      {
        id: 'computational-physics-f16',
        group: '蒙特卡罗',
        name: '蒙特卡罗积分估计量与标准误',
        latex:
          '\\hat I_N = (b-a)\\cdot\\frac1N\\sum_{i=1}^N f(x_i), \\qquad \\sigma_{\\hat I} = \\frac{(b-a)\\sigma_f}{\\sqrt N}',
        note: '无偏但收敛仅 N^{−1/2}；误差与维度无关，d 维复合求积为 O(N^{−4/d})，高维时蒙特卡罗胜出',
      },
      {
        id: 'computational-physics-f17',
        group: '蒙特卡罗',
        name: 'Metropolis 接受概率与细致平衡',
        latex:
          'P_{\\mathrm{acc}} = \\min\\left(1,\\ e^{-\\beta \\Delta E}\\right), \\qquad \\pi(\\Gamma)P(\\Gamma \\to \\Gamma^{\\prime}) = \\pi(\\Gamma^{\\prime})P(\\Gamma^{\\prime} \\to \\Gamma)',
        note: '稳态分布为玻尔兹曼分布 π ∝ e^{−βE}；需丢弃热化样本并按自相关时间修正误差',
      },
      {
        id: 'computational-physics-f18',
        group: '本征值',
        name: '幂法迭代与 Rayleigh 商',
        latex:
          'x_k = \\frac{A x_{k-1}}{\\|A x_{k-1}\\|}, \\qquad \\lambda_1 \\approx \\frac{x^{\\mathsf{T}} A x}{x^{\\mathsf{T}} x}, \\qquad \\text{收敛比} = \\left|\\frac{\\lambda_2}{\\lambda_1}\\right|',
        note: '求按模最大本征值；Rayleigh 商把向量误差平方级地压低；(A − μI)^{−1} 的带位移反幂法可精修已知近似本征值',
      },
    ],
  },
];
