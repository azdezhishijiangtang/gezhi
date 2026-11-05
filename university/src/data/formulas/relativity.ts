import type { FormulaGroup } from '@/types';

export const relativityFormulaGroups: FormulaGroup[] = [
  // ─────────────────────── 变换与运动学 ───────────────────────
  {
    id: 'relativity-fg1',
    name: '洛伦兹变换与相对论运动学',
    courseId: 'relativity',
    formulas: [
      {
        id: 'relativity-f1',
        group: '洛伦兹变换',
        name: '洛伦兹变换（沿 x 方向）',
        latex: "x^{\\prime} = \\gamma(x - vt),\\quad t^{\\prime} = \\gamma\\left(t - \\frac{vx}{c^2}\\right),\\quad \\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}",
      },
      {
        id: 'relativity-f2',
        group: '速度变换',
        name: '相对论速度合成',
        latex: "u_x^{\\prime} = \\frac{u_x - v}{1 - u_x v/c^2},\\qquad u_y^{\\prime} = \\frac{u_y}{\\gamma\\left(1 - u_x v/c^2\\right)}",
      },
      {
        id: 'relativity-f3',
        group: '时间膨胀',
        name: '动钟变慢',
        latex: '\\Delta t = \\gamma\\,\\Delta\\tau',
        note: '\\Delta\\tau 为与运动物体相对静止的钟记录的固有时',
      },
      {
        id: 'relativity-f4',
        group: '长度收缩',
        name: '动尺缩短',
        latex: 'L = \\frac{L_0}{\\gamma}',
        note: '沿运动方向收缩，横向长度不变；L_0 为固有长度',
      },
      {
        id: 'relativity-f5',
        group: '多普勒效应',
        name: '相对论多普勒频移（退行）',
        latex: '\\nu = \\nu_0\\sqrt{\\frac{1 - \\beta}{1 + \\beta}},\\qquad \\beta = \\frac{v}{c}',
      },
      {
        id: 'relativity-f6',
        group: '同时性',
        name: '异地同时的相对性',
        latex: '\\Delta t^{\\prime} = \\gamma\\left(\\Delta t - \\frac{v\\,\\Delta x}{c^2}\\right)',
        note: '\\Delta t = 0 且 \\Delta x \\neq 0 时 \\Delta t^{\\prime} \\neq 0',
      },
    ],
  },
  // ─────────────────────── 时空与动力学 ───────────────────────
  {
    id: 'relativity-fg2',
    name: '时空几何与相对论动力学',
    courseId: 'relativity',
    formulas: [
      {
        id: 'relativity-f7',
        group: '时空间隔',
        name: '间隔不变量',
        latex: '\\Delta s^2 = c^2\\Delta t^2 - \\Delta x^2 - \\Delta y^2 - \\Delta z^2',
        note: '对一切惯性系相同；大于零为类时、等于零为类光、小于零为类空',
      },
      {
        id: 'relativity-f8',
        group: '动力学',
        name: '相对论动量与质速关系',
        latex: '\\mathbf{p} = \\gamma m_0\\,\\mathbf{v} = m\\,\\mathbf{v},\\qquad m = \\gamma m_0',
      },
      {
        id: 'relativity-f9',
        group: '动力学',
        name: '质能关系',
        latex: 'E = \\gamma m_0 c^2 = mc^2,\\qquad E_0 = m_0 c^2',
      },
      {
        id: 'relativity-f10',
        group: '动力学',
        name: '相对论动能',
        latex: 'E_k = (\\gamma - 1)m_0 c^2',
        note: '低速极限下退化为 \\frac{1}{2}m_0 v^2',
      },
      {
        id: 'relativity-f11',
        group: '动力学',
        name: '能量动量关系',
        latex: 'E^2 = p^2 c^2 + m_0^2 c^4',
        note: '对光子（m_0 = 0）给出 E = pc',
      },
      {
        id: 'relativity-f12',
        group: '动力学',
        name: '质量亏损与反应能',
        latex: 'Q = \\Delta m\\,c^2,\\qquad 1\\ \\text{u}\\,c^2 = 931.5\\ \\text{MeV}',
      },
    ],
  },
  // ─────────────────────── 四维形式与电磁场 ───────────────────────
  {
    id: 'relativity-fg3',
    name: '四维形式与电磁场',
    courseId: 'relativity',
    formulas: [
      {
        id: 'relativity-f13',
        group: '四维对象',
        name: '四维位矢与度规',
        latex: "X^{\\mu} = (ct,\\, x,\\, y,\\, z),\\qquad \\eta_{\\mu\\nu} = \\mathrm{diag}(1,\\,-1,\\,-1,\\,-1)",
      },
      {
        id: 'relativity-f14',
        group: '四维对象',
        name: '洛伦兹变换的矩阵形式',
        latex: "X^{\\prime\\mu} = \\Lambda^{\\mu}_{\\ \\nu}X^{\\nu},\\quad \\Lambda^{\\mu}_{\\ \\nu} = \\begin{pmatrix}\\gamma & -\\beta\\gamma\\\\ -\\beta\\gamma & \\gamma\\end{pmatrix}",
        note: '满足 \\Lambda^{\\mathrm{T}}\\eta\\Lambda = \\eta，保证间隔不变',
      },
      {
        id: 'relativity-f15',
        group: '四维对象',
        name: '四维速度与四维加速度',
        latex: "U^{\\mu} = \\gamma(c,\\,\\mathbf{v}),\\qquad U^{\\mu}U_{\\mu} = c^2,\\qquad A^{\\mu} = \\frac{\\mathrm{d}U^{\\mu}}{\\mathrm{d}\\tau},\\quad U^{\\mu}A_{\\mu} = 0",
      },
      {
        id: 'relativity-f16',
        group: '四维对象',
        name: '四维动量',
        latex: "P^{\\mu} = \\left(\\frac{E}{c},\\,\\mathbf{p}\\right) = m_0 U^{\\mu},\\qquad P^{\\mu}P_{\\mu} = m_0^2 c^2",
      },
      {
        id: 'relativity-f17',
        group: '电磁场',
        name: '电磁场变换公式',
        latex: "\\mathbf{E}^{\\prime}_{\\parallel} = \\mathbf{E}_{\\parallel},\\quad \\mathbf{E}^{\\prime}_{\\perp} = \\gamma(\\mathbf{E}_{\\perp} + \\mathbf{v}\\times\\mathbf{B});\\qquad \\mathbf{B}^{\\prime}_{\\perp} = \\gamma\\left(\\mathbf{B}_{\\perp} - \\frac{\\mathbf{v}\\times\\mathbf{E}}{c^2}\\right)",
      },
      {
        id: 'relativity-f18',
        group: '电磁场',
        name: '四维势与协变麦克斯韦方程',
        latex: "A^{\\mu} = \\left(\\frac{\\phi}{c},\\,\\mathbf{A}\\right),\\quad F^{\\mu\\nu} = \\partial^{\\mu}A^{\\nu} - \\partial^{\\nu}A^{\\mu},\\quad \\partial_{\\mu}F^{\\mu\\nu} = \\mu_0 J^{\\nu}",
      },
    ],
  },
];
