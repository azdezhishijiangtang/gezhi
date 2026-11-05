import type { FormulaGroup } from '@/types';

export const electromagnetismFormulaGroups: FormulaGroup[] = [
  {
    id: 'electromagnetism-fg1',
    name: '静电学基础',
    courseId: 'electromagnetism',
    formulas: [
      { id: 'electromagnetism-f1', group: '库仑定律', name: '库仑定律', latex: '\\vec F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}\\,\\hat r', note: '真空介电常数 $\\varepsilon_0=8.854\\times10^{-12}\\ \\text{C}^2/(\\text{N}\\cdot\\text{m}^2)$' },
      { id: 'electromagnetism-f2', group: '电场强度', name: '点电荷电场', latex: '\\vec E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2}\\,\\hat r', note: '场强单位 $\\text{N/C}$ 或 $\\text{V/m}$' },
      { id: 'electromagnetism-f3', group: '高斯定理', name: '高斯定理', latex: '\\oiint_S \\vec E\\cdot d\\vec S = \\frac{Q_{\\text{内}}}{\\varepsilon_0}', note: '静电场是有源场' },
      { id: 'electromagnetism-f4', group: '电势', name: '点电荷电势', latex: '\\varphi = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}', note: '取无穷远为零势点，单位伏特 $\\text{V}$' },
      { id: 'electromagnetism-f5', group: '场势关系', name: '场强与电势梯度', latex: '\\vec E = -\\nabla\\varphi', note: '场强指向电势降低最快的方向' },
      { id: 'electromagnetism-f6', group: '电偶极子', name: '偶极子电势与场', latex: '\\varphi = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\vec p\\cdot\\hat r}{r^2},\\quad \\vec E_{\\text{远}} \\propto \\frac{1}{r^3}', note: '偶极矩 $\\vec p=q\\vec l$，远场按 $1/r^3$ 衰减' },
    ],
  },
  {
    id: 'electromagnetism-fg2',
    name: '导体·电容·电路',
    courseId: 'electromagnetism',
    formulas: [
      { id: 'electromagnetism-f7', group: '电容', name: '平行板电容', latex: 'C = \\frac{\\varepsilon_0 S}{d}', note: '插入介质后 $C=\\varepsilon_r C_0$' },
      { id: 'electromagnetism-f8', group: '电容组合', name: '串并联等效', latex: 'C_{\\text{并}} = \\sum C_i,\\quad \\frac{1}{C_{\\text{串}}} = \\sum\\frac{1}{C_i}' },
      { id: 'electromagnetism-f9', group: '静电平衡', name: '导体表面场强', latex: 'E_{\\text{表面}} = \\frac{\\sigma}{\\varepsilon_0}', note: '导体内部 $E=0$，整体等势' },
      { id: 'electromagnetism-f10', group: '欧姆定律', name: '微分与宏观形式', latex: '\\vec j = \\sigma\\vec E,\\quad U = IR', note: '$\\sigma$ 为电导率，$R=\\rho l/S$' },
      { id: 'electromagnetism-f11', group: '基尔霍夫', name: '节点与回路定律', latex: '\\sum I_{\\text{入}} = \\sum I_{\\text{出}},\\quad \\sum U = 0' },
      { id: 'electromagnetism-f12', group: '储能', name: '电容器储能', latex: 'W = \\frac{1}{2}CU^2 = \\frac{Q^2}{2C}', note: '电源内阻使端电压 $U=\\mathscr E-Ir$' },
    ],
  },
  {
    id: 'electromagnetism-fg3',
    name: '磁场与电磁感应',
    courseId: 'electromagnetism',
    formulas: [
      { id: 'electromagnetism-f13', group: '磁场', name: '毕奥-萨伐尔定律', latex: 'd\\vec B = \\frac{\\mu_0}{4\\pi}\\frac{I\\,d\\vec l\\times\\hat r}{r^2}', note: '真空磁导率 $\\mu_0=4\\pi\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$' },
      { id: 'electromagnetism-f14', group: '磁场', name: '安培环路定理', latex: '\\oint_L \\vec B\\cdot d\\vec l = \\mu_0 I_{\\text{内}}', note: '磁场是无源有旋场' },
      { id: 'electromagnetism-f15', group: '磁场', name: '长直导线磁场', latex: 'B = \\frac{\\mu_0 I}{2\\pi r}', note: '方向由右手定则判定' },
      { id: 'electromagnetism-f16', group: '洛伦兹力', name: '洛伦兹力', latex: '\\vec F = q(\\vec E + \\vec v\\times\\vec B)', note: '纯磁场力不做功，只改变方向' },
      { id: 'electromagnetism-f17', group: '电磁感应', name: '法拉第定律', latex: '\\mathscr E = -\\frac{d\\Phi_B}{dt}', note: '负号即楞次定律（阻碍磁通变化）' },
      { id: 'electromagnetism-f18', group: '电磁感应', name: '自感与磁能', latex: '\\mathscr E_L = -L\\frac{dI}{dt},\\quad W_m = \\frac{1}{2}LI^2 = \\int\\frac{B^2}{2\\mu_0}\\,dV', note: '磁场能量密度 $w_m=B^2/(2\\mu_0)$' },
    ],
  },
];
