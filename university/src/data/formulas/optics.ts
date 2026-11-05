import type { FormulaGroup } from '@/types';

export const opticsFormulaGroups: FormulaGroup[] = [
  // ─────────────────────── 几何光学与成像 ───────────────────────
  {
    id: 'optics-fg1',
    name: '几何光学与成像',
    courseId: 'optics',
    formulas: [
      { id: 'optics-f1', group: '基本定律', name: '反射定律', latex: '\\theta_i = \\theta_r' },
      { id: 'optics-f2', group: '基本定律', name: '折射定律（斯涅尔）', latex: 'n_1\\sin\\theta_1 = n_2\\sin\\theta_2' },
      { id: 'optics-f3', group: '费马原理', name: '光程取驻值', latex: '\\delta\\int_{A}^{B} n\\,ds = 0' },
      { id: 'optics-f4', group: '球面折射', name: '单球面近轴成像', latex: '\\frac{n_1}{s} + \\frac{n_2}{s^{\\prime}} = \\frac{n_2 - n_1}{R}' },
      { id: 'optics-f5', group: '薄透镜', name: '薄透镜成像公式', latex: '\\frac{1}{s} + \\frac{1}{s^{\\prime}} = \\frac{1}{f}' },
      { id: 'optics-f6', group: '薄透镜', name: '透镜制造者公式', latex: '\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)' },
    ],
  },
  // ─────────────────────── 干涉与衍射 ───────────────────────
  {
    id: 'optics-fg2',
    name: '干涉与衍射',
    courseId: 'optics',
    formulas: [
      { id: 'optics-f7', group: '光程', name: '光程与相位差', latex: '\\Delta = n\\,d,\\quad \\delta = \\frac{2\\pi}{\\lambda}\\,\\Delta' },
      { id: 'optics-f8', group: '双光束干涉', name: '杨氏双缝明纹位置', latex: 'x_k = k\\,\\frac{\\lambda D}{d}\\quad (k = 0,\\pm1,\\pm2,\\ldots)' },
      { id: 'optics-f9', group: '薄膜干涉', name: '垂直入射光程差', latex: '\\Delta = 2 n e + \\frac{\\lambda}{2}' },
      { id: 'optics-f10', group: '等厚干涉', name: '牛顿环半径', latex: 'r_k = \\sqrt{k\\lambda R}\\quad (k = 0,1,2,\\ldots)' },
      { id: 'optics-f11', group: '夫琅禾费衍射', name: '单缝衍射暗纹', latex: 'a\\sin\\theta = k\\lambda\\quad (k = \\pm1,\\pm2,\\ldots)' },
      { id: 'optics-f12', group: '光栅', name: '光栅方程', latex: 'd\\sin\\theta = k\\lambda\\quad (k = 0,\\pm1,\\pm2,\\ldots)' },
    ],
  },
  // ─────────────────────── 偏振、相干与现代光学 ───────────────────────
  {
    id: 'optics-fg3',
    name: '偏振、相干与现代光学',
    courseId: 'optics',
    formulas: [
      { id: 'optics-f13', group: '偏振', name: '马吕斯定律', latex: 'I = I_0\\cos^2\\theta' },
      { id: 'optics-f14', group: '偏振', name: '布儒斯特角', latex: '\\tan\\theta_B = \\frac{n_2}{n_1}' },
      { id: 'optics-f15', group: '双折射', name: '双折射率差', latex: '\\Delta n = n_e - n_o' },
      { id: 'optics-f16', group: '相干性', name: '相干长度', latex: 'L_c = c\\,\\tau_c = \\frac{\\lambda^2}{\\Delta\\lambda}' },
      { id: 'optics-f17', group: '相干性', name: '相干时间', latex: '\\tau_c \\approx \\frac{1}{\\Delta\\nu}' },
      { id: 'optics-f18', group: '激光', name: '谐振腔纵模', latex: '\\nu_q = q\\,\\frac{c}{2L}' },
    ],
  },
];
