import type { FormulaGroup } from '@/types';

export const quantum_mechanicsFormulaGroups: FormulaGroup[] = [
  {
    id: 'quantum-mechanics-fg1',
    name: '基本框架',
    courseId: 'quantum-mechanics',
    formulas: [
      { id: 'quantum-mechanics-f1', group: '演化方程', name: '含时薛定谔方程', latex: 'i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\vec{r}, t) = \\hat{H}\\Psi(\\vec{r}, t)', note: '线性齐次方程 ⇒ 态叠加原理成立' },
      { id: 'quantum-mechanics-f2', group: '演化方程', name: '定态薛定谔方程', latex: '-\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V\\psi = E\\psi', note: 'V 不显含 t 时分离变量 Ψ = ψ e^{−iEt/ħ}' },
      { id: 'quantum-mechanics-f3', group: '统计诠释', name: '玻恩统计诠释', latex: 'dP = |\\Psi(\\vec{r}, t)|^2\\, dV', note: '|Ψ|² 为概率密度；归一化 ∫|Ψ|²dV = 1' },
      { id: 'quantum-mechanics-f4', group: '算符与测量', name: '厄米算符本征值问题', latex: '\\hat{A}^{\\dagger} = \\hat{A},\\quad \\hat{A}\\psi_n = \\lambda_n\\psi_n', note: 'λₙ 为实数；不同本征值的本征函数正交归一且完备' },
      { id: 'quantum-mechanics-f5', group: '算符与测量', name: '基本对易关系', latex: '[\\hat{x}, \\hat{p}_x] = i\\hbar', note: '量子化的核心；量子化规则 [q, p] = iħ' },
      { id: 'quantum-mechanics-f6', group: '算符与测量', name: '不确定关系', latex: '\\Delta A\\, \\Delta B \\ge \\frac{1}{2}\\left|\\langle[\\hat{A}, \\hat{B}]\\rangle\\right|', note: '特例 Δx·Δp ≥ ħ/2' },
    ],
  },
  {
    id: 'quantum-mechanics-fg2',
    name: '典型模型',
    courseId: 'quantum-mechanics',
    formulas: [
      { id: 'quantum-mechanics-f7', group: '无限深势阱', name: '势阱能级', latex: 'E_n = \\frac{n^2\\pi^2\\hbar^2}{2ma^2},\\quad n = 1, 2, 3, \\ldots', note: '基态即零点能，E ∝ n² 非等间距' },
      { id: 'quantum-mechanics-f8', group: '无限深势阱', name: '势阱波函数', latex: '\\psi_n(x) = \\sqrt{\\frac{2}{a}}\\sin\\frac{n\\pi x}{a},\\quad 0 < x < a', note: '两端固定的驻波；第 n 个态有 n−1 个内部节点' },
      { id: 'quantum-mechanics-f9', group: '谐振子', name: '谐振子能级', latex: 'E_n = \\left(n + \\frac{1}{2}\\right)\\hbar\\omega,\\quad n = 0, 1, 2, \\ldots', note: '等间距 ħω；零点能 E₀ = ħω/2' },
      { id: 'quantum-mechanics-f10', group: '谐振子', name: '升降算符与哈密顿量', latex: 'H = \\hbar\\omega\\left(a^{\\dagger}a + \\frac{1}{2}\\right),\\quad [a, a^{\\dagger}] = 1', note: 'a†a 的本征值为非负整数 n' },
      { id: 'quantum-mechanics-f11', group: '势垒隧穿', name: '方势垒透射系数', latex: 'T \\approx e^{-2\\kappa a},\\quad \\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}', note: 'E < V₀ 且 κa ≫ 1；α 衰变与 STM 的理论基础' },
      { id: 'quantum-mechanics-f12', group: '角动量', name: '角动量本征值谱', latex: '\\hat{L}^2 \\to l(l+1)\\hbar^2,\\quad \\hat{L}_z \\to m\\hbar', note: 'l = 0, 1, 2, …；m = −l, …, +l；升降算符 L±|l,m⟩ = ħ√((l∓m)(l±m+1))|l,m±1⟩' },
    ],
  },
  {
    id: 'quantum-mechanics-fg3',
    name: '近似方法',
    courseId: 'quantum-mechanics',
    formulas: [
      { id: 'quantum-mechanics-f13', group: '定态微扰', name: '一阶能量修正', latex: 'E_n^{(1)} = \\langle n^{(0)}|\\hat{H}^{\\prime}|n^{(0)}\\rangle', note: '微扰在未扰态上的平均值' },
      { id: 'quantum-mechanics-f14', group: '定态微扰', name: '二阶能量修正', latex: 'E_n^{(2)} = \\sum_{m \\ne n} \\frac{\\left|\\langle m^{(0)}|\\hat{H}^{\\prime}|n^{(0)}\\rangle\\right|^2}{E_n^{(0)} - E_m^{(0)}}', note: '基态必下移；能级彼此排斥' },
      { id: 'quantum-mechanics-f15', group: '定态微扰', name: '简并微扰久期方程', latex: '\\det\\left(H^{\\prime}_{ij} - E^{(1)}\\delta_{ij}\\right) = 0', note: '在简并子空间内将 H′ 对角化' },
      { id: 'quantum-mechanics-f16', group: '含时微扰', name: '跃迁概率（一阶）', latex: 'P_{n \\to m}(t) = \\frac{1}{\\hbar^2}\\left|\\int_0^t H^{\\prime}_{mn}(t^{\\prime})\\, e^{i\\omega_{mn}t^{\\prime}}\\, dt^{\\prime}\\right|^2', note: 'ω_{mn} = (E_m − E_n)/ħ' },
      { id: 'quantum-mechanics-f17', group: '含时微扰', name: '费米黄金规则', latex: 'w = \\frac{2\\pi}{\\hbar}\\left|V_{mn}\\right|^2\\rho(E_m)', note: '周期微扰到连续末态的跃迁速率；ρ 为末态密度' },
      { id: 'quantum-mechanics-f18', group: '变分法', name: '变分上界', latex: 'E_0 \\le \\frac{\\langle\\psi|\\hat{H}|\\psi\\rangle}{\\langle\\psi|\\psi\\rangle}', note: '对含参试探波函数取极小，得基态能量上界' },
    ],
  },
];
