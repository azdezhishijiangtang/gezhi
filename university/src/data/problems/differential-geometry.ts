import type { Problem } from '@/types';

export const differential_geometryProblems: Problem[] = [
  {
    id: 'p-dg-1',
    courseId: 'differential-geometry',
    topicId: 'curve-theory',
    title: '计算圆柱螺旋线的曲率与挠率',
    difficulty: 2,
    question:
      '计算螺旋线 $\\vec{r}(t) = (a\\cos t,\\ a\\sin t,\\ bt)$（$a, b > 0$）的曲率与挠率。',
    hints: [
      '先转成弧长参数，或直接用一般参数公式 $\\kappa = \\frac{|\\vec{r}\' \\times \\vec{r}\'\'|}{|\\vec{r}\'|^3}$。',
      '挠率 $\\tau = \\frac{(\\vec{r}\',\\vec{r}\'\',\\vec{r}\'\'\')}{|\\vec{r}\' \\times \\vec{r}\'\'|^2}$。',
    ],
    solution: [
      {
        title: '速度与加速度',
        detail:
          '$\\vec{r}\' = (-a\\sin t,\\ a\\cos t,\\ b)$，$|\\vec{r}\'| = \\sqrt{a^2+b^2}$（常数，速匀！）。$\\vec{r}\'\' = (-a\\cos t,\\ -a\\sin t,\\ 0)$。',
      },
      {
        title: '曲率',
        detail:
          '$\\vec{r}\' \\times \\vec{r}\'\' = (ab\\sin t,\\ -ab\\cos t,\\ a^2)$，模 $a\\sqrt{a^2+b^2}$。$$\\kappa = \\frac{a\\sqrt{a^2+b^2}}{(a^2+b^2)^{3/2}} = \\frac{a}{a^2+b^2}$$',
      },
      {
        title: '挠率',
        detail:
          '$\\vec{r}\'\'\' = (a\\sin t,\\ -a\\cos t,\\ 0)$。混合积 $(\\vec{r}\',\\vec{r}\'\',\\vec{r}\'\'\') = ab^2$。$$\\tau = \\frac{ab^2}{a^2(a^2+b^2)} = \\frac{b}{a^2+b^2}$$',
      },
    ],
    answer: '$\\kappa = \\dfrac{a}{a^2+b^2}$，$\\tau = \\dfrac{b}{a^2+b^2}$——都是常数，等曲率等挠率曲线正是螺旋线。',
    tags: ['曲率', '挠率', '螺旋线'],
  },
  {
    id: 'p-dg-2',
    courseId: 'differential-geometry',
    topicId: 'surface-theory',
    title: '计算球面的两个基本形式',
    difficulty: 2,
    question:
      '对球面 $\\vec{r}(\\theta, \\varphi) = (R\\sin\\theta\\cos\\varphi,\\ R\\sin\\theta\\sin\\varphi,\\ R\\cos\\theta)$，计算第一、第二基本形式与高斯曲率。',
    hints: [
      '先算 $\\vec{r}_\\theta, \\vec{r}_\\varphi$ 与单位法向量。',
      '球面法向量就是径向单位向量，二阶导与法向量点乘容易算。',
    ],
    solution: [
      {
        title: '第一基本形式',
        detail:
          '$\\vec{r}_\\theta = (R\\cos\\theta\\cos\\varphi,\\ R\\cos\\theta\\sin\\varphi,\\ -R\\sin\\theta)$，$|\\vec{r}_\\theta| = R$；$\\vec{r}_\\varphi = (-R\\sin\\theta\\sin\\varphi,\\ R\\sin\\theta\\cos\\varphi,\\ 0)$，$|\\vec{r}_\\varphi| = R\\sin\\theta$；且 $\\vec{r}_\\theta \\cdot \\vec{r}_\\varphi = 0$。故$$\\mathrm{I} = R^2\\,d\\theta^2 + R^2\\sin^2\\theta\\,d\\varphi^2$$',
      },
      {
        title: '第二基本形式',
        detail:
          '法向量 $\\vec{n} = \\vec{r}/R$（径向）。$\\vec{r}_{\\theta\\theta} = -\\vec{r}$，故 $L = \\vec{r}_{\\theta\\theta}\\cdot\\vec{n} = -R$；$M = 0$；$N = \\vec{r}_{\\varphi\\varphi}\\cdot\\vec{n} = -R\\sin^2\\theta$。$$\\mathrm{II} = -R\\,d\\theta^2 - R\\sin^2\\theta\\,d\\varphi^2$$',
      },
      {
        title: '高斯曲率',
        detail:
          '$$K = \\frac{LN - M^2}{EG - F^2} = \\frac{R^2\\sin^2\\theta}{R^4\\sin^2\\theta} = \\frac{1}{R^2}$$半径 $R$ 的球面高斯曲率恒为 $\\frac{1}{R^2}$——球面各向同性弯曲，处处一样。',
      },
    ],
    answer: '$\\mathrm{I} = R^2 d\\theta^2 + R^2\\sin^2\\theta\\,d\\varphi^2$；$\\mathrm{II} = -R\\,d\\theta^2 - R\\sin^2\\theta\\,d\\varphi^2$；$K = \\frac{1}{R^2}$。',
    tags: ['第一基本形式', '第二基本形式', '高斯曲率'],
  },
  {
    id: 'p-dg-3',
    courseId: 'differential-geometry',
    topicId: 'intrinsic-geometry',
    title: '球面上的高斯–博内定理',
    difficulty: 2,
    question:
      '用高斯–博内定理说明：球面上"大圆三角形"（三条边都是大圆弧）的内角和与 $\\pi$ 的差由什么决定。',
    hints: [
      '球面高斯曲率 $K = 1/R^2$。',
      '局部高斯–博内：$\\iint K\\,dA = (\\alpha+\\beta+\\gamma) - \\pi$，左边就是面积 $\\cdot K$。',
    ],
    solution: [
      {
        title: '套用定理',
        detail:
          '球面 $K = \\frac{1}{R^2}$ 为常数，故 $\\displaystyle\\iint_D K\\,dA = \\frac{\\text{面积}(D)}{R^2}$。于是$$\\frac{\\text{面积}(D)}{R^2} = \\alpha + \\beta + \\gamma - \\pi$$',
      },
      {
        title: '解读',
        detail:
          '内角和超出 $\\pi$ 的部分（称**球面余量**）正比于三角形面积：$\\alpha+\\beta+\\gamma-\\pi = \\dfrac{\\text{面积}}{R^2}$。北纬圈上三条经线夹出的三角形（赤道 + 两条经线）内角和可达 $\\frac{3\\pi}{2}$。',
      },
      {
        title: '整体验证',
        detail:
          '把整个球面用 4 个"八分之一球面三角形"（内角和 $\\frac{3\\pi}{2}$）铺满：总"角超" $= 4 \\times \\frac{\\pi}{2} = 2\\pi$；而 $\\iint K\\,dA = \\frac{4\\pi R^2}{R^2} = 4\\pi = 2\\pi\\,\\chi(S^2) = 2\\pi \\cdot 2$。完美吻合。',
      },
    ],
    answer: '内角和 $- \\pi = \\dfrac{\\text{三角形面积}}{R^2}$；整体上 $\\iint K\\,dA = 4\\pi = 2\\pi\\chi(S^2)$。',
    tags: ['高斯-博内', '球面几何', '内蕴曲率'],
  },
];
