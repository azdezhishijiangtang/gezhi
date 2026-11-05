import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-det-1': {
    title: 'Evaluating a Determinant',
    question:
      'Compute the determinant $D = \\begin{vmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 3 & 4 & 1 \\\\ 3 & 4 & 1 & 2 \\\\ 4 & 1 & 2 & 3 \\end{vmatrix}$.',
    hints: [
      'This is a $4 \\times 4$ determinant; expanding directly gives $4! = 24$ terms, which is far too tedious.',
      'Look at the row sums: the four entries in every row add up to 10.',
      'Add columns 2, 3, 4 to column 1, then factor out the common factor.',
    ],
    solution: [
      {
        title: 'Observing the structure',
        detail: 'The sum of the entries in each row is $1+2+3+4 = 10$. Add columns 2, 3, 4 to column 1 (the determinant is unchanged): $$D = \\begin{vmatrix} 10 & 2 & 3 & 4 \\\\ 10 & 3 & 4 & 1 \\\\ 10 & 4 & 1 & 2 \\\\ 10 & 1 & 2 & 3 \\end{vmatrix}$$',
      },
      {
        title: 'Factoring out and simplifying',
        detail: 'Factor $10$ out of column 1, then add $-1$ times row 1 to each of the other rows: $$D = 10\\begin{vmatrix} 1 & 2 & 3 & 4 \\\\ 0 & 1 & 1 & -3 \\\\ 0 & 2 & -2 & -2 \\\\ 0 & -1 & -1 & -1 \\end{vmatrix}$$',
      },
      {
        title: 'Expanding along the first column',
        detail: '$$D = 10 \\cdot (-1)^{1+1} \\cdot \\begin{vmatrix} 1 & 1 & -3 \\\\ 2 & -2 & -2 \\\\ -1 & -1 & -1 \\end{vmatrix}$$To evaluate the $3 \\times 3$ determinant: factor $-1$ out of row 3, swapping rows 1 and 2 flips the sign… or just expand directly: $$\\begin{vmatrix} 1 & 1 & -3 \\\\ 2 & -2 & -2 \\\\ -1 & -1 & -1 \\end{vmatrix} = 1\\big((-2)(-1) - (-2)(-1)\\big) - 1\\big(2(-1) - (-2)(-1)\\big) + (-3)\\big(2(-1) - (-2)(-1)\\big)$$',
      },
      {
        title: 'Obtaining the result',
        detail: 'The three brackets equal $2 - 2 = 0$, $-2 - 2 = -4$, and $-2 - 2 = -4$ respectively: $$\\text{Original expression} = 1 \\cdot 0 - 1 \\cdot (-4) + (-3)(-4) = 0 + 4 + 12 = 16$$Hence $D = 10 \\times 16 = 160$.',
      },
    ],
    answer: '$160$',
    tags: ['Determinant', 'Row/column addition', 'Column expansion'],
  },

  'p-eigen-1': {
    title: 'Eigenvalues and Eigenvectors of a Real Symmetric Matrix',
    question:
      'Let $A = \\begin{pmatrix} 4 & 2 \\\\ 2 & 4 \\end{pmatrix}$. Find all eigenvalues of $A$ together with their eigenvectors, and determine whether $A$ is diagonalizable.',
    hints: [
      'First solve the characteristic equation $|\\lambda E - A| = 0$.',
      'This is a real symmetric matrix, so its eigenvalues are real and it is orthogonally diagonalizable.',
      'For each eigenvalue solve $(\\lambda E - A)x = 0$.',
    ],
    solution: [
      {
        title: 'Finding the characteristic polynomial',
        detail: '$$|\\lambda E - A| = \\begin{vmatrix} \\lambda - 4 & -2 \\\\ -2 & \\lambda - 4 \\end{vmatrix} = (\\lambda - 4)^2 - 4 = \\lambda^2 - 8\\lambda + 12$$',
      },
      {
        title: 'Solving the characteristic equation',
        detail: '$\\lambda^2 - 8\\lambda + 12 = (\\lambda - 2)(\\lambda - 6) = 0$ gives the eigenvalues$$\\lambda_1 = 2, \\qquad \\lambda_2 = 6$$(they are distinct, so $A$ is necessarily diagonalizable). Check: $\\lambda_1 + \\lambda_2 = 8 = \\operatorname{tr}(A)$ and $\\lambda_1\\lambda_2 = 12 = \\det(A)$.',
      },
      {
        title: 'Eigenvectors for λ₁ = 2',
        detail: 'Solve $(2E - A)x = 0$: $$\\begin{pmatrix} -2 & -2 \\\\ -2 & -2 \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = 0 \\Rightarrow x_1 + x_2 = 0$$A fundamental system of solutions is $\\xi_1 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$, so all eigenvectors are $k_1\\xi_1\\ (k_1 \\ne 0)$.',
      },
      {
        title: 'Eigenvectors for λ₂ = 6',
        detail: 'Solve $(6E - A)x = 0$: $$\\begin{pmatrix} 2 & -2 \\\\ -2 & 2 \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = 0 \\Rightarrow x_1 - x_2 = 0$$A fundamental system of solutions is $\\xi_2 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$, so all eigenvectors are $k_2\\xi_2\\ (k_2 \\ne 0)$.',
      },
      {
        title: 'Orthogonality and diagonalization',
        detail: '$\\xi_1^\\mathsf{T}\\xi_2 = 1 \\cdot 1 + (-1)\\cdot 1 = 0$, so the two are orthogonal. After normalization we obtain the orthogonal matrix$$P = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ -1 & 1 \\end{pmatrix}, \\qquad P^{-1}AP = P^\\mathsf{T}AP = \\begin{pmatrix} 2 & 0 \\\\ 0 & 6 \\end{pmatrix}$$',
      },
    ],
    answer: 'Eigenvalues $\\lambda_1 = 2$ (eigenvectors $k\\binom{1}{-1}$) and $\\lambda_2 = 6$ (eigenvectors $k\\binom{1}{1}$); being real symmetric, $A$ is orthogonally diagonalizable.',
    tags: ['Eigenvalues', 'Eigenvectors', 'Orthogonal diagonalization'],
  },
};

export default map;
