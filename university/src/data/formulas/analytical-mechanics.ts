import type { FormulaGroup } from '@/types';

export const analytical_mechanicsFormulaGroups: FormulaGroup[] = [
  {
    id: 'analytical-mechanics-fg1',
    name: '拉格朗日力学',
    courseId: 'analytical-mechanics',
    formulas: [
      { id: 'analytical-mechanics-f1', group: '约束与自由度', name: '自由度', latex: 's = 3N - k', note: 'N 为质点数，k 为独立完整约束数；完整系中广义坐标个数等于 s' },
      { id: 'analytical-mechanics-f2', group: '广义坐标', name: '广义力', latex: 'Q_\\alpha = \\sum_i \\vec{F}_i \\cdot \\frac{\\partial \\vec{r}_i}{\\partial q_\\alpha}', note: '主动力有势时 Q_α = −∂V/∂q_α' },
      { id: 'analytical-mechanics-f3', group: '拉格朗日方程', name: '第二类拉格朗日方程', latex: '\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}_\\alpha} - \\frac{\\partial L}{\\partial q_\\alpha} = 0', note: '保守完整系；L = T − V' },
      { id: 'analytical-mechanics-f4', group: '拉格朗日方程', name: '一般形式（含广义力）', latex: '\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}_\\alpha} - \\frac{\\partial L}{\\partial q_\\alpha} = Q_\\alpha', note: '非保守广义力（摩擦、驱动）时使用' },
      { id: 'analytical-mechanics-f5', group: '守恒量', name: '循环坐标与广义动量守恒', latex: '\\frac{\\partial L}{\\partial q_\\alpha} = 0 \\;\\Rightarrow\\; p_\\alpha = \\frac{\\partial L}{\\partial \\dot{q}_\\alpha} = \\text{常量}', note: '对称性对应守恒量的最简情形' },
      { id: 'analytical-mechanics-f6', group: '守恒量', name: '能量积分', latex: 'h = \\sum_\\alpha \\dot{q}_\\alpha \\frac{\\partial L}{\\partial \\dot{q}_\\alpha} - L = \\text{常量}', note: 'L 不显含 t 时成立；稳定约束下 h = T + V' },
    ],
  },
  {
    id: 'analytical-mechanics-fg2',
    name: '哈密顿力学',
    courseId: 'analytical-mechanics',
    formulas: [
      { id: 'analytical-mechanics-f7', group: '勒让德变换', name: '哈密顿函数', latex: 'H(q, p, t) = \\sum_\\alpha p_\\alpha \\dot{q}_\\alpha - L,\\quad p_\\alpha = \\frac{\\partial L}{\\partial \\dot{q}_\\alpha}', note: '须把 q̇ 全部用 p 反解替换；Hessian 非退化是前提' },
      { id: 'analytical-mechanics-f8', group: '正则方程', name: '哈密顿正则方程', latex: '\\dot{q}_\\alpha = \\frac{\\partial H}{\\partial p_\\alpha},\\quad \\dot{p}_\\alpha = -\\frac{\\partial H}{\\partial q_\\alpha}', note: '2s 个一阶方程；q 与 p 地位对等' },
      { id: 'analytical-mechanics-f9', group: '泊松括号', name: '泊松括号定义', latex: '[u, v] = \\sum_\\alpha \\left( \\frac{\\partial u}{\\partial q_\\alpha} \\frac{\\partial v}{\\partial p_\\alpha} - \\frac{\\partial u}{\\partial p_\\alpha} \\frac{\\partial v}{\\partial q_\\alpha} \\right)', note: '基本括号 [q_α, p_β] = δ_αβ' },
      { id: 'analytical-mechanics-f10', group: '泊松括号', name: '运动方程的括号形式', latex: '\\frac{du}{dt} = [u, H] + \\frac{\\partial u}{\\partial t}', note: 'u 不显含 t 且 [u, H] = 0 即守恒' },
      { id: 'analytical-mechanics-f11', group: '正则变换', name: '正则变换判据', latex: '[Q_j, P_k] = \\delta_{jk},\\quad [Q_j, Q_k] = [P_j, P_k] = 0', note: '保持正则方程形式不变；由生成函数 F₂(q, P, t) 生成' },
      { id: 'analytical-mechanics-f12', group: '哈密顿-雅可比', name: '哈密顿-雅可比方程', latex: '\\frac{\\partial S}{\\partial t} + H\\left( q, \\frac{\\partial S}{\\partial q}, t \\right) = 0', note: '定常系统 S = W(q; α) − Et；完全积分含 s 个独立常数' },
    ],
  },
  {
    id: 'analytical-mechanics-fg3',
    name: '微振动与刚体',
    courseId: 'analytical-mechanics',
    formulas: [
      { id: 'analytical-mechanics-f13', group: '微振动', name: '久期方程（简正频率）', latex: '\\det\\left( k_{\\alpha\\beta} - \\omega^2 m_{\\alpha\\beta} \\right) = 0', note: 'T、V 取二次型，M、K 为对称矩阵；V 正定时 ω² > 0' },
      { id: 'analytical-mechanics-f14', group: '微振动', name: '弹簧耦合双摆的简正频率', latex: '\\omega_1^2 = \\frac{g}{l},\\quad \\omega_2^2 = \\frac{g}{l} + \\frac{2kd^2}{ml^2}', note: '同相模弹簧不形变，反相模频率被耦合抬高' },
      { id: 'analytical-mechanics-f15', group: '刚体运动学', name: '欧拉角与角速度分量', latex: '\\omega_3 = \\dot{\\psi} + \\dot{\\varphi}\\cos\\theta', note: '进动 φ̇、章动 θ̇、自转 ψ̇；ω₁、ω₂ 分量见专题正文' },
      { id: 'analytical-mechanics-f16', group: '刚体动力学', name: '欧拉动力学方程', latex: 'I_1 \\dot{\\omega}_1 - (I_2 - I_3)\\,\\omega_2 \\omega_3 = M_1', note: '另两式指标轮换；只在本体主轴系中成立' },
      { id: 'analytical-mechanics-f17', group: '刚体动力学', name: '对称重陀螺的拉格朗日函数', latex: 'L = \\tfrac{1}{2} I_1 \\left( \\dot{\\theta}^2 + \\dot{\\varphi}^2 \\sin^2 \\theta \\right) + \\tfrac{1}{2} I_3 \\left( \\dot{\\psi} + \\dot{\\varphi} \\cos \\theta \\right)^2 - mgl \\cos \\theta', note: 'φ、ψ 为循环坐标，p_φ 与 p_ψ 守恒' },
      { id: 'analytical-mechanics-f18', group: '刚体动力学', name: '快速陀螺的进动角速度', latex: '\\Omega \\approx \\frac{mgl}{I_3 \\omega_3}', note: '慢进动近似（mgl ≪ I₃ω₃²）；稳态进动满足 I₁Ω²cosθ − I₃ω₃Ω + mgl = 0' },
    ],
  },
];
