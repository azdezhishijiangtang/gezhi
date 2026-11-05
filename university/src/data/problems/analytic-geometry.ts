import type { Problem } from '@/types';

export const analytic_geometryProblems: Problem[] = [
  {
    id: 'p-ag-1',
    courseId: 'analytic-geometry',
    topicId: 'vector-algebra',
    title: '混合积求四面体体积',
    difficulty: 1,
    question:
      '已知三点 $A(1,0,0)$、$B(0,2,0)$、$C(0,0,3)$ 与原点 $O$。求四面体 $OABC$ 的体积。',
    hints: [
      '四面体体积 = 以同一顶点出发三棱为边的平行六面体体积的六分之一。',
      '平行六面体体积 = 三棱向量的混合积绝对值。',
    ],
    solution: [
      {
        title: '写三棱向量',
        detail: '$\\vec{OA} = (1,0,0)$，$\\vec{OB} = (0,2,0)$，$\\vec{OC} = (0,0,3)$。',
      },
      {
        title: '算混合积',
        detail:
          '$(\\vec{OA},\\vec{OB},\\vec{OC}) = \\begin{vmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{vmatrix} = 6$。',
      },
      {
        title: '得出结论',
        detail: '$V = \\dfrac{1}{6}\\big|(\\vec{OA},\\vec{OB},\\vec{OC})\\big| = \\dfrac{6}{6} = 1$。',
      },
    ],
    answer: '体积为 $1$。',
    tags: ['混合积', '四面体', '体积'],
  },
  {
    id: 'p-ag-2',
    courseId: 'analytic-geometry',
    topicId: 'plane-line',
    title: '平面束求过直线的平面',
    difficulty: 2,
    question:
      '求过直线 $L: \\dfrac{x-1}{2} = \\dfrac{y+1}{-1} = \\dfrac{z}{1}$ 且与平面 $\\pi: x + y + z = 0$ 垂直的平面方程。',
    hints: [
      '过直线 $L$ 的平面组成"平面束"，用两个含 $L$ 的平面的线性组合表示。',
      '垂直条件：两个平面的法向量点积为零。',
    ],
    solution: [
      {
        title: '构造平面束',
        detail:
          '直线 $L$ 可写为两平面之交：$\\begin{cases} x + 2y + 1 = 0 \\\\ y + z - 1 = 0 \\end{cases}$（由对称式拆出）。平面束：$$x + 2y + 1 + \\lambda(y + z - 1) = 0$$',
      },
      {
        title: '写法向量',
        detail:
          '束平面法向量 $\\vec{n} = (1,\\ 2+\\lambda,\\ \\lambda)$；$\\pi$ 的法向量 $\\vec{n_0} = (1,1,1)$。',
      },
      {
        title: '垂直条件',
        detail:
          '$\\vec{n} \\cdot \\vec{n_0} = 1 + (2+\\lambda) + \\lambda = 0$，解得 $\\lambda = -\\dfrac{3}{2}$。代回：$$x + \\tfrac{1}{2}y - \\tfrac{3}{2}z + \\tfrac{5}{2} = 0, \\quad \\text{即 } 2x + y - 3z + 5 = 0$$',
      },
    ],
    answer: '平面方程为 $2x + y - 3z + 5 = 0$。',
    tags: ['平面束', '法向量', '垂直'],
  },
  {
    id: 'p-ag-3',
    courseId: 'analytic-geometry',
    topicId: 'quadric-surfaces',
    title: '截痕法识别二次曲面',
    difficulty: 1,
    question:
      '用截痕法说明曲面 $\\dfrac{x^2}{4} + \\dfrac{y^2}{9} - \\dfrac{z^2}{16} = 1$ 的类型与形状。',
    hints: [
      '分别用水平面 $z = z_0$ 与竖直面 $x = 0$ 去截，看交线。',
      '对照五种标准二次曲面的截痕特征。',
    ],
    solution: [
      {
        title: '水平截痕',
        detail:
          '用 $z = z_0$ 截：$\\dfrac{x^2}{4} + \\dfrac{y^2}{9} = 1 + \\dfrac{z_0^2}{16}$。右边恒为正，交线是椭圆，且 $|z_0|$ 越大椭圆越大。',
      },
      {
        title: '竖直截痕',
        detail:
          '用 $x = 0$ 截：$\\dfrac{y^2}{9} - \\dfrac{z^2}{16} = 1$，是 $yz$ 平面上的双曲线。',
      },
      {
        title: '判定',
        detail:
          '两项正一项负且等于正数，符合单叶双曲面标准形 $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}-\\dfrac{z^2}{c^2}=1$。外形如冷却塔，是直纹面。',
      },
    ],
    answer: '单叶双曲面（冷却塔形，$a=2,\\ b=3,\\ c=4$）。',
    tags: ['二次曲面', '截痕法', '单叶双曲面'],
  },
];
