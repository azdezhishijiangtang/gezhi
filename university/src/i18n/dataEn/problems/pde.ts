import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-pde-1': {
    title: 'Uniqueness for the Heat Equation via the Energy Method',
    question:
      'Let $u$ satisfy $u_t = u_{xx}$ ($0 < x < L$, $t > 0$), $u(0,t) = u(L,t) = 0$, $u(x,0) = 0$. Prove that $u \\equiv 0$.',
    hints: [
      'The standard uniqueness recipe: let $w$ be the difference of two solutions, show that $w$ satisfies the homogeneous equation with homogeneous conditions, then prove $w = 0$.',
      'Construct the energy $E(t) = \\int_0^L w^2\\,dx$ and look at its time derivative.',
    ],
    solution: [
      {
        title: 'Setting up the difference',
        detail:
          'Let $u_1, u_2$ be two solutions and $w = u_1 - u_2$. Then $w_t = w_{xx}$ with homogeneous boundary conditions $w(0,t)=w(L,t)=0$ and homogeneous initial data $w(x,0)=0$.',
      },
      {
        title: 'Energy method',
        detail:
          'Define $E(t) = \\int_0^L w^2\\,dx$. Then$$E\'(t) = 2\\int_0^L w w_t\\,dx = 2\\int_0^L w w_{xx}\\,dx = 2\\big[ww_x\\big]_0^L - 2\\int_0^L w_x^2\\,dx \\le 0$$ the boundary term vanishes because $w=0$.',
      },
      {
        title: 'Conclusion',
        detail:
          '$E(t)$ is non-increasing while $E(t) \\ge 0$, and $E(0) = 0$, hence $E(t) \\equiv 0$, that is $w \\equiv 0$. The two solutions coincide, so the solution is unique.',
      },
    ],
    answer: '$u \\equiv 0$ (the heat equation has a unique solution under homogeneous conditions).',
    tags: ['Uniqueness', 'Energy method', 'Heat equation'],
  },
  'p-pde-2': {
    title: 'Solving a Heat Conduction Problem by Separation of Variables',
    question:
      'Solve the boundary value problem: $u_t = u_{xx}$ ($0<x<\\pi$), $u(0,t)=u(\\pi,t)=0$, $u(x,0) = \\sin x$.',
    hints: [
      'Set $u = X(x)T(t)$; substitution separates out $X\'\' + \\lambda X = 0$.',
      'The boundary conditions select the eigenvalues $\\lambda = n^2$ and eigenfunctions $\\sin nx$.',
      'The initial data is exactly a single eigenfunction — the answer will be very simple.',
    ],
    solution: [
      {
        title: 'Separation of variables',
        detail:
          'Set $u = XT$; substitution gives $\\dfrac{T\'}{T} = \\dfrac{X\'\'}{X} = -\\lambda$. The spatial part $X\'\' + \\lambda X = 0$ with $X(0)=X(\\pi)=0$ yields $\\lambda_n = n^2$ and $X_n = \\sin nx$.',
      },
      {
        title: 'Time part',
        detail: '$T\' = -n^2 T$ gives $T_n = e^{-n^2 t}$. The general solution is $u = \\sum_{n=1}^{\\infty} b_n e^{-n^2 t}\\sin nx$.',
      },
      {
        title: 'Determining the coefficients',
        detail:
          'The initial condition $\\sin x = \\sum b_n \\sin nx$ gives directly $b_1 = 1$ and all others zero.',
      },
    ],
    answer: '$u(x,t) = e^{-t}\\sin x$ — the hot region decays exponentially in time, exactly the intuitive picture of heat diffusion.',
    tags: ['Separation of variables', 'Eigenvalues', 'Heat conduction'],
  },
  'p-pde-3': {
    title: 'Solving a Two-Point Boundary Value Problem with Green Function',
    question: 'Solve $-u\'\' = 1$ ($0 < x < 1$), $u(0) = u(1) = 0$.',
    hints: [
      'In one dimension the Green function is a piecewise linear "beam deflection", continuous at the joint, with a jump in its derivative.',
      'The solution is the integral of the Green function times the source (here the constant 1); integrate it directly.',
    ],
    solution: [
      {
        title: 'Green function',
        detail:
          'On the interval $[0,1]$: $$G(x,\\xi) = \\begin{cases} x(1-\\xi), & x \\le \\xi \\\\ \\xi(1-x), & x \\ge \\xi \\end{cases}$$',
      },
      {
        title: 'Integration',
        detail:
          '$$u(x) = \\int_0^1 G(x,\\xi)\\cdot 1\\,d\\xi = (1-x)\\int_0^x \\xi\\,d\\xi + x\\int_x^1 (1-\\xi)\\,d\\xi = \\frac{x(1-x)}{2}$$',
      },
      {
        title: 'Verification',
        detail:
          '$u\'\' = -1$ (the equation is satisfied) and $u(0)=u(1)=0$ (the boundary conditions hold). This is precisely the deflection curve of a simply supported beam under a uniformly distributed unit load.',
      },
    ],
    answer: '$u(x) = \\dfrac{x(1-x)}{2}$ (a parabola).',
    tags: ['Green function', 'Dirichlet problem', 'Boundary value problem'],
  },
};

export default map;
