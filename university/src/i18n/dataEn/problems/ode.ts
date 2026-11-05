import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-ode-1': {
    title: 'General Solution of a First-Order Linear Equation',
    question: 'Find the general solution of the differential equation $xy\' + y = x^2$.',
    hints: [
      'First put it in standard form $y\' + P(x)y = Q(x)$ and recognise a first-order linear equation.',
      'Use variation of constants: solve the homogeneous equation first, then replace the constant by a function.',
    ],
    solution: [
      {
        title: 'Standardisation',
        detail: 'Divide both sides by $x$ ($x \\ne 0$): $y\' + \\dfrac{1}{x}y = x$.',
      },
      {
        title: 'Solving the homogeneous equation',
        detail: '$y\' + \\dfrac{y}{x} = 0$ gives $y = \\dfrac{C}{x}$.',
      },
      {
        title: 'Variation of constants',
        detail:
          'Set $y = \\dfrac{C(x)}{x}$ and substitute into the original equation: $$\\frac{C\'(x)}{x} - \\frac{C(x)}{x^2} + \\frac{C(x)}{x^2} = x \\ \\Longrightarrow\\ C\'(x) = x^2$$ hence $C(x) = \\dfrac{x^3}{3} + C$.',
      },
    ],
    answer: 'General solution $y = \\dfrac{x^2}{3} + \\dfrac{C}{x}$.',
    tags: ['First-order linear', 'Variation of constants', 'General solution'],
  },
  'p-ode-2': {
    title: 'Particular Solution of a Constant-Coefficient Non-Homogeneous Equation',
    question: 'Find the general solution of $y\'\' - 3y\' + 2y = e^{2x}$.',
    hints: [
      'The roots of the characteristic equation $\\lambda^2 - 3\\lambda + 2 = 0$ determine the homogeneous solution.',
      'The exponent 2 in the forcing term $e^{2x}$ is exactly a simple characteristic root, so the particular solution must be multiplied by $x$.',
    ],
    solution: [
      {
        title: 'Homogeneous solution',
        detail:
          'Characteristic equation $(\\lambda - 1)(\\lambda - 2) = 0$; the roots $1, 2$ are both simple, so the homogeneous solution is $Y = C_1 e^{x} + C_2 e^{2x}$.',
      },
      {
        title: 'Ansatz for the particular solution',
        detail:
          '$\\lambda = 2$ is a simple characteristic root, so take $k = 1$ and set $y^* = a x e^{2x}$.',
      },
      {
        title: 'Determining the coefficient',
        detail:
          'Substituting into the equation: $(y^*)\' = a(1+2x)e^{2x}$, $(y^*)\'\' = a(4+4x)e^{2x}$. The left side $= e^{2x}\\big[a(4+4x) - 3a(1+2x) + 2ax\\big] = a e^{2x}$. Hence $a = 1$ and $y^* = x e^{2x}$.',
      },
    ],
    answer: 'General solution $y = C_1 e^{x} + C_2 e^{2x} + x e^{2x}$.',
    tags: ['Characteristic equation', 'Undetermined coefficients', 'Root multiplicity factor x'],
  },
  'p-ode-3': {
    title: 'Classifying the Equilibrium Point of a Linear System',
    question:
      'Analyse the equilibrium point of the system $\\begin{cases} x\' = x - y \\\\ y\' = x + y \\end{cases}$ and determine its type.',
    hints: [
      'The equilibrium point is where both right-hand sides vanish simultaneously.',
      'Compute the eigenvalues of the Jacobian matrix and classify them by the sign of the real part and by whether they are real or complex.',
    ],
    solution: [
      {
        title: 'Finding the equilibrium point',
        detail: 'Solving $x - y = 0,\\ x + y = 0$ gives the unique equilibrium point $(0,0)$.',
      },
      {
        title: 'Jacobian and eigenvalues',
        detail:
          'The system is already linear, so the Jacobian is the coefficient matrix $A = \\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$. The characteristic equation $(\\lambda-1)^2 + 1 = 0$ gives the eigenvalues $\\lambda = 1 \\pm i$.',
      },
      {
        title: 'Classification',
        detail:
          'A pair of complex conjugate roots with real part $1 > 0$ ⇒ an unstable spiral point (focus). Trajectories spiral away from the origin. Reversing the signs (the $-x$ type) would give a stable spiral, the phase portrait of a damped oscillation.',
      },
    ],
    answer: 'Unique equilibrium point $(0,0)$ with eigenvalues $1 \\pm i$, an unstable spiral point.',
    tags: ['Phase plane', 'Jacobian', 'Spiral point'],
  },
};

export default map;
