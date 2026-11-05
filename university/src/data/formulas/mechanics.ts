import type { FormulaGroup } from '@/types';

export const mechanicsFormulaGroups: FormulaGroup[] = [
  {
    id: 'mechanics-fg1',
    name: '质点运动学',
    courseId: 'mechanics',
    formulas: [
      { id: 'mechanics-f1', group: '运动学', name: '位矢', latex: '\\vec{r}(t) = x(t)\\vec{i} + y(t)\\vec{j} + z(t)\\vec{k}' },
      { id: 'mechanics-f2', group: '运动学', name: '速度', latex: '\\vec{v} = \\frac{d\\vec{r}}{dt} = \\dot{x}\\,\\vec{i} + \\dot{y}\\,\\vec{j} + \\dot{z}\\,\\vec{k}' },
      { id: 'mechanics-f3', group: '运动学', name: '加速度', latex: '\\vec{a} = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2}' },
      { id: 'mechanics-f4', group: '曲线运动', name: '抛体运动', latex: 'x = v_0\\cos\\theta\\, t,\\quad y = v_0\\sin\\theta\\, t - \\tfrac12 g t^2' },
      { id: 'mechanics-f5', group: '曲线运动', name: '切向与法向加速度', latex: 'a_t = \\frac{dv}{dt},\\quad a_n = \\frac{v^2}{R}' },
      { id: 'mechanics-f6', group: '相对运动', name: '伽利略速度变换', latex: '\\vec{v} = \\vec{v}^{\\prime} + \\vec{u},\\quad \\vec{a} = \\vec{a}^{\\prime}' },
    ],
  },
  {
    id: 'mechanics-fg2',
    name: '动力学·动量与能量',
    courseId: 'mechanics',
    formulas: [
      { id: 'mechanics-f7', group: '牛顿定律', name: '牛顿第二定律', latex: '\\vec{F} = m\\vec{a} = \\frac{d\\vec{p}}{dt},\\quad \\vec{p} = m\\vec{v}' },
      { id: 'mechanics-f8', group: '常见力', name: '胡克定律', latex: 'F = -kx' },
      { id: 'mechanics-f9', group: '动量', name: '冲量', latex: '\\vec{I} = \\int_{t_1}^{t_2} \\vec{F}\\,dt' },
      { id: 'mechanics-f10', group: '动量', name: '动量定理', latex: '\\vec{I} = \\Delta\\vec{p} = m\\vec{v}_2 - m\\vec{v}_1' },
      { id: 'mechanics-f11', group: '动量', name: '动量守恒', latex: '\\sum \\vec{F}_{\\text{外}} = 0 \\;\\Rightarrow\\; \\vec{P} = \\text{常矢量}' },
      { id: 'mechanics-f12', group: '能量', name: '动能定理', latex: 'W = \\Delta E_k = \\tfrac12 m v_2^2 - \\tfrac12 m v_1^2' },
    ],
  },
  {
    id: 'mechanics-fg3',
    name: '转动与振动',
    courseId: 'mechanics',
    formulas: [
      { id: 'mechanics-f13', group: '转动', name: '力矩', latex: '\\vec{M} = \\vec{r} \\times \\vec{F},\\quad |\\vec{M}| = rF\\sin\\theta' },
      { id: 'mechanics-f14', group: '转动', name: '角动量', latex: '\\vec{L} = \\vec{r} \\times m\\vec{v},\\quad \\vec{L} = I\\vec{\\omega}' },
      { id: 'mechanics-f15', group: '转动', name: '角动量定理', latex: '\\vec{M} = \\frac{d\\vec{L}}{dt}' },
      { id: 'mechanics-f16', group: '转动', name: '转动定律', latex: 'M = I\\alpha' },
      { id: 'mechanics-f17', group: '转动', name: '平行轴定理', latex: 'I = I_c + Md^2' },
      { id: 'mechanics-f18', group: '振动', name: '简谐振动方程', latex: '\\frac{d^2x}{dt^2} + \\omega^2 x = 0,\\quad x = A\\cos(\\omega t + \\varphi)' },
    ],
  },
];
