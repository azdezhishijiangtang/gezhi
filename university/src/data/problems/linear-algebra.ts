import type { Problem } from '@/types';

export const linear_algebraProblems: Problem[] = [

  {
    id: 'p-det-1',
    courseId: 'linear-algebra',
    topicId: 'determinants',
    title: '行列式的计算',
    difficulty: 2,
    question:
      '计算行列式 $D = \\begin{vmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 3 & 4 & 1 \\\\ 3 & 4 & 1 & 2 \\\\ 4 & 1 & 2 & 3 \\end{vmatrix}$。',
    hints: [
      '这是一个 4 阶行列式，直接展开有 $4! = 24$ 项，太繁琐。',
      '观察各行元素之和：每行四个数之和都是 10。',
      '把第 2、3、4 列都加到第 1 列，然后提取公因子。',
    ],
    solution: [
      {
        title: '观察结构',
        detail: '每行元素之和均为 $1+2+3+4 = 10$。将第 2、3、4 列全部加到第 1 列（行列式不变）：$$D = \\begin{vmatrix} 10 & 2 & 3 & 4 \\\\ 10 & 3 & 4 & 1 \\\\ 10 & 4 & 1 & 2 \\\\ 10 & 1 & 2 & 3 \\end{vmatrix}$$',
      },
      {
        title: '提取公因子并化简',
        detail: '第 1 列提出公因子 $10$，再把第 1 行的 $-1$ 倍分别加到其余各行：$$D = 10\\begin{vmatrix} 1 & 2 & 3 & 4 \\\\ 0 & 1 & 1 & -3 \\\\ 0 & 2 & -2 & -2 \\\\ 0 & -1 & -1 & -1 \\end{vmatrix}$$',
      },
      {
        title: '按第一列展开',
        detail: '$$D = 10 \\cdot (-1)^{1+1} \\cdot \\begin{vmatrix} 1 & 1 & -3 \\\\ 2 & -2 & -2 \\\\ -1 & -1 & -1 \\end{vmatrix}$$计算 3 阶行列式：第 3 行提出 $-1$，第 1、2 行互换变号……直接展开：$$\\begin{vmatrix} 1 & 1 & -3 \\\\ 2 & -2 & -2 \\\\ -1 & -1 & -1 \\end{vmatrix} = 1\\big((-2)(-1) - (-2)(-1)\\big) - 1\\big(2(-1) - (-2)(-1)\\big) + (-3)\\big(2(-1) - (-2)(-1)\\big)$$',
      },
      {
        title: '求出结果',
        detail: '三个括号内分别为 $2 - 2 = 0$、$-2 - 2 = -4$、$-2 - 2 = -4$：$$\\text{原式} = 1 \\cdot 0 - 1 \\cdot (-4) + (-3)(-4) = 0 + 4 + 12 = 16$$故 $D = 10 \\times 16 = 160$。',
      },
    ],
    answer: '$160$',
    tags: ['行列式', '倍加变换', '按列展开'],
  },

  {
    id: 'p-eigen-1',
    courseId: 'linear-algebra',
    topicId: 'eigen',
    title: '求实对称矩阵的特征值与特征向量',
    difficulty: 2,
    question:
      '设 $A = \\begin{pmatrix} 4 & 2 \\\\ 2 & 4 \\end{pmatrix}$，求 $A$ 的全部特征值与对应的特征向量，并判断 $A$ 是否可对角化。',
    hints: [
      '先解特征方程 $|\\lambda E - A| = 0$。',
      '这是实对称矩阵，特征值必为实数，且必可正交对角化。',
      '对每个特征值解 $(\\lambda E - A)x = 0$。',
    ],
    solution: [
      {
        title: '求特征多项式',
        detail: '$$|\\lambda E - A| = \\begin{vmatrix} \\lambda - 4 & -2 \\\\ -2 & \\lambda - 4 \\end{vmatrix} = (\\lambda - 4)^2 - 4 = \\lambda^2 - 8\\lambda + 12$$',
      },
      {
        title: '解特征方程',
        detail: '$\\lambda^2 - 8\\lambda + 12 = (\\lambda - 2)(\\lambda - 6) = 0$，得特征值$$\\lambda_1 = 2, \\qquad \\lambda_2 = 6$$（互不相同，故必可对角化）。验证：$\\lambda_1 + \\lambda_2 = 8 = \\operatorname{tr}(A)$，$\\lambda_1\\lambda_2 = 12 = \\det(A)$。',
      },
      {
        title: '求 λ₁ = 2 的特征向量',
        detail: '解 $(2E - A)x = 0$：$$\\begin{pmatrix} -2 & -2 \\\\ -2 & -2 \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = 0 \\Rightarrow x_1 + x_2 = 0$$基础解系：$\\xi_1 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$，全部特征向量为 $k_1\\xi_1\\ (k_1 \\ne 0)$。',
      },
      {
        title: '求 λ₂ = 6 的特征向量',
        detail: '解 $(6E - A)x = 0$：$$\\begin{pmatrix} 2 & -2 \\\\ -2 & 2 \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = 0 \\Rightarrow x_1 - x_2 = 0$$基础解系：$\\xi_2 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$，全部特征向量为 $k_2\\xi_2\\ (k_2 \\ne 0)$。',
      },
      {
        title: '正交性与对角化',
        detail: '$\\xi_1^\\mathsf{T}\\xi_2 = 1 \\cdot 1 + (-1)\\cdot 1 = 0$，两者正交。单位化后得正交矩阵$$P = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ -1 & 1 \\end{pmatrix}, \\qquad P^{-1}AP = P^\\mathsf{T}AP = \\begin{pmatrix} 2 & 0 \\\\ 0 & 6 \\end{pmatrix}$$',
      },
    ],
    answer: '特征值 $\\lambda_1 = 2$（特征向量 $k\\binom{1}{-1}$）、$\\lambda_2 = 6$（特征向量 $k\\binom{1}{1}$）；实对称矩阵，可正交对角化。',
    tags: ['特征值', '特征向量', '正交对角化'],
  },
];
