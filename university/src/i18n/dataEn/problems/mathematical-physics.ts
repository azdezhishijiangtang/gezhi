import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  // ─────────────────────── Chapter 1 Analyticity and the C-R Conditions ───────────────────────
  'mathematical-physics-p1': {
    title: 'Constructing an Analytic Function from the C-R Conditions',
    question: 'Let $u(x, y) = x^3 - 3xy^2$. (1) Prove that $u$ is harmonic; (2) find an analytic function $f(z) = u + iv$ whose imaginary part $v$ satisfies $v(0, 0) = 0$; (3) express $f$ in the complex variable $z$ and verify the derivative formula $f^{\\prime}(z) = u_x + i v_x$.',
    hints: [
      'Harmonicity means verifying $u_{xx} + u_{yy} = 0$; just compute the two second-order partial derivatives.',
      'The C-R conditions give $v_y = u_x$ and $v_x = -u_y$: first integrate $v_y = u_x$ with respect to $y$, keeping an undetermined function $g(x)$, then use the second equation to determine $g$.',
      'After assembling $f = u + iv$, substitute $x = \\frac{z + \\bar z}{2}$ and $y = \\frac{z - \\bar z}{2i}$; all $\\bar z$ terms should cancel.',
    ],
    solution: [
      {
        title: 'Verifying harmonicity',
        detail: '$u_x = 3x^2 - 3y^2$, $u_y = -6xy$; differentiating once more: $u_{xx} = 6x$, $u_{yy} = -6x$. Hence $u_{xx} + u_{yy} = 6x - 6x = 0$, so $u$ is harmonic in the whole plane.',
      },
      {
        title: 'Finding the imaginary part from the C-R conditions',
        detail: 'From $v_y = u_x = 3x^2 - 3y^2$, treating $x$ as constant and integrating in $y$ gives $v = 3x^2 y - y^3 + g(x)$. Then $v_x = 6xy + g^{\\prime}(x)$ must equal $-u_y = 6xy$, so $g^{\\prime}(x) = 0$ and $g(x) = C$. The condition $v(0, 0) = 0$ gives $C = 0$, hence $v = 3x^2 y - y^3$.',
      },
      {
        title: 'Assembling and passing to the complex variable',
        detail: '$f = (x^3 - 3xy^2) + i(3x^2 y - y^3)$. Recognize that this is the expansion of $(x + iy)^3$: $z^3 = x^3 + 3x^2(iy) + 3x(iy)^2 + (iy)^3 = (x^3 - 3xy^2) + i(3x^2 y - y^3)$. Hence $f(z) = z^3$, analytic in the whole plane (one may also substitute $x = \\frac{z + \\bar z}{2}$, $y = \\frac{z - \\bar z}{2i}$ and check that the $\\bar z$ terms cancel).',
      },
      {
        title: 'Verifying the derivative formula',
        detail: '$u_x + i v_x = (3x^2 - 3y^2) + i(6xy)$, while $f^{\\prime}(z) = 3z^2 = 3(x + iy)^2 = 3(x^2 - y^2) + i\\,6xy$; the two agree, confirming the derivative formula under the C-R conditions.',
      },
    ],
    answer: '$u$ is harmonic; $v = 3x^2 y - y^3$; $f(z) = z^3$; $f^{\\prime}(z) = 3z^2 = u_x + i v_x$',
    tags: ['C-R conditions', 'Harmonic functions', 'Constructing analytic functions'],
  },

  // ─────────────────────── Chapter 2 Real Integrals via Residues ───────────────────────
  'mathematical-physics-p2': {
    title: 'Evaluating a Real Integral with the Residue Theorem',
    question: 'Compute the improper integral $\\displaystyle I = \\int_{-\\infty}^{+\\infty} \\frac{dx}{(1 + x^2)^2}$.',
    hints: [
      'Close the contour with a large semicircle in the upper half-plane; the integrand $f(z) = \\frac{1}{(1 + z^2)^2}$ has a quartic denominator and a constant numerator, so the integral over the large arc tends to zero by the ML inequality.',
      '$z = \\pm i$ are double zeros of the denominator, so $z = i$ is a pole of order two, and only it lies inside the contour.',
      'Residue formula for a double pole: $\\mathrm{Res} = \\lim_{z \\to z_0} \\frac{d}{dz} \\left[ (z - z_0)^2 f(z) \\right]$.',
    ],
    solution: [
      {
        title: 'Contour and convergence estimate',
        detail: 'Take $f(z) = \\frac{1}{(1 + z^2)^2}$ and the contour consisting of $[-R, R]$ together with the semicircle $C_R: z = R e^{i\\theta}$. On $C_R$ we have $|f(z)| \\le \\frac{1}{(R^2 - 1)^2}$ and the arc length is $\\pi R$, so $\\left| \\int_{C_R} f\\, dz \\right| \\le \\frac{\\pi R}{(R^2 - 1)^2} \\to 0$ (as $R \\to \\infty$). Hence $I = 2\\pi i \\times$ (sum of residues of the poles in the upper half-plane).',
      },
      {
        title: 'Residue at the double pole',
        detail: 'The only singularity in the upper half-plane is $z = i$ (a double pole). $\\mathrm{Res} = \\lim_{z \\to i} \\frac{d}{dz} \\left[ (z - i)^2 \\frac{1}{(z^2 + 1)^2} \\right] = \\lim_{z \\to i} \\frac{d}{dz} \\frac{1}{(z + i)^2} = \\lim_{z \\to i} \\frac{-2}{(z + i)^3} = \\frac{-2}{(2i)^3} = \\frac{-2}{-8i} = \\frac{1}{4i}$.',
      },
      {
        title: 'Applying the residue theorem',
        detail: '$I = 2\\pi i \\cdot \\frac{1}{4i} = \\frac{\\pi}{2}$. Incidentally, by the symmetry of the even integrand, $\\int_0^{\\infty} \\frac{dx}{(1 + x^2)^2} = \\frac{\\pi}{4}$.',
      },
    ],
    answer: '$\\displaystyle \\int_{-\\infty}^{+\\infty} \\frac{dx}{(1 + x^2)^2} = \\frac{\\pi}{2}$',
    tags: ['Residue theorem', 'Double pole', 'Contour integration'],
  },

  // ─────────────────────── Chapter 3 Laurent Expansions and Classification of Singularities ───────────────────────
  'mathematical-physics-p3': {
    title: 'Laurent Expansions of a Function and Classification of Its Singularities',
    question: 'Let $f(z) = \\frac{1}{(z - 1)(z - 2)}$. (1) Find the Laurent expansion of $f$ in each of the three annuli centred at $z = 0$: $|z| < 1$, $1 < |z| < 2$, $|z| > 2$; (2) list all isolated singularities of $f$ together with their types, and compute the residue at each.',
    hints: [
      'Start with partial fractions: $f(z) = \\frac{1}{z - 2} - \\frac{1}{z - 1}$.',
      'Geometric series run in two directions: $\\frac{1}{1 - w} = \\sum_{n \\ge 0} w^n$ ($|w| < 1$); $\\frac{1}{w - 1} = \\sum_{n \\ge 1} w^{-n}$ ($|w| > 1$). The annulus decides which side each term uses.',
      'The residue is the coefficient of $(z - z_0)^{-1}$ in the expansion, and it can be cross-checked with the limit formula $\\lim (z - z_0) f(z)$.',
    ],
    solution: [
      {
        title: 'Partial fraction decomposition',
        detail: 'Write $\\frac{1}{(z-1)(z-2)} = \\frac{A}{z - 1} + \\frac{B}{z - 2}$. Setting $z = 1$ gives $A = -1$; setting $z = 2$ gives $B = 1$. Hence $f(z) = \\frac{1}{z - 2} - \\frac{1}{z - 1}$.',
      },
      {
        title: 'Region $|z| < 1$: Taylor expansion',
        detail: 'Expand both terms in positive powers: $\\frac{1}{z - 2} = -\\frac{1}{2} \\cdot \\frac{1}{1 - z/2} = -\\sum_{n=0}^{\\infty} \\frac{z^n}{2^{n+1}}$; $-\\frac{1}{z - 1} = -\\sum_{n=0}^{\\infty} z^n$. Combining, $f = -\\sum_{n=0}^{\\infty} \\left( 1 + \\frac{1}{2^{n+1}} \\right) z^n$; there are no negative powers, so this is a Taylor series.',
      },
      {
        title: 'Region $1 < |z| < 2$: mixed expansion',
        detail: '$\\frac{1}{z - 2} = -\\frac{1}{2} \\cdot \\frac{1}{1 - z/2} = -\\sum_{n=0}^{\\infty} \\frac{z^n}{2^{n+1}}$ (valid since $|z/2| < 1$); $-\\frac{1}{z - 1} = -\\frac{1}{z} \\cdot \\frac{1}{1 - 1/z} = -\\sum_{n=1}^{\\infty} z^{-n}$ (valid since $|1/z| < 1$). Hence $f = -\\sum_{n=1}^{\\infty} z^{-n} - \\sum_{n=0}^{\\infty} \\frac{z^n}{2^{n+1}}$, with both positive and negative powers present.',
      },
      {
        title: 'Region $|z| > 2$: purely negative powers',
        detail: '$\\frac{1}{z - 2} = \\frac{1}{z} \\cdot \\frac{1}{1 - 2/z} = \\sum_{n=0}^{\\infty} \\frac{2^n}{z^{n+1}}$; $-\\frac{1}{z - 1} = -\\sum_{n=1}^{\\infty} z^{-n}$. Combining (the coefficient of the negative power for $n \\ge 1$ is $2^{n-1} - 1$): $f = \\sum_{n=1}^{\\infty} \\left( 2^{n-1} - 1 \\right) z^{-n}$.',
      },
      {
        title: 'Classification of singularities and residues',
        detail: 'The isolated singularities are $z = 1$ and $z = 2$; the denominator has a simple zero at each, so both are simple poles. $\\mathrm{Res}\\big|_{z=1} = \\lim_{z \\to 1} (z - 1) f = \\frac{1}{1 - 2} = -1$; $\\mathrm{Res}\\big|_{z=2} = \\lim_{z \\to 2} (z - 2) f = \\frac{1}{2 - 1} = 1$. Checking against the expansions: in the annulus $1 < |z| < 2$ the coefficient of $z^{-1}$ is $-1$ (coming from the principal part at $z = 1$), while in $|z| > 2$ the coefficient of $z^{-1}$ is $2^0 - 1 = 0$, which equals exactly the sum of the two residues $-1 + 1 = 0$ (the point at infinity is a removable singularity with residue 0).',
      },
    ],
    answer: '$|z|<1$: $-\\sum \\left(1 + 2^{-(n+1)}\\right) z^n$; $1<|z|<2$: $-\\sum_{n\\ge1} z^{-n} - \\sum_{n\\ge0} 2^{-(n+1)} z^n$; $|z|>2$: $\\sum_{n\\ge1} (2^{n-1} - 1) z^{-n}$; $z = 1$ and $z = 2$ are both simple poles, with residues $-1$ and $1$ respectively',
    tags: ['Laurent expansion', 'Classification of singularities', 'Partial fractions'],
  },

  // ─────────────────────── Chapter 4 Solving the Heat Equation by Fourier Transform ───────────────────────
  'mathematical-physics-p4': {
    title: 'Solving an Initial Value Problem for Heat Conduction by Fourier Transform',
    question: 'Initial value problem for heat conduction in an infinite thin rod: $$u_t = a^2 u_{xx}, \\quad -\\infty < x < \\infty, \\ t > 0; \\qquad u(x, 0) = e^{-x^2}.$$ (1) Take the Fourier transform in $x$ and find $\\hat u(\\omega, t)$; (2) invert the transform to obtain $u(x, t)$; (3) discuss the smoothness of the solution for $t > 0$ and explain its physical meaning.',
    hints: [
      'Transform convention $\\hat u(\\omega, t) = \\int u(x, t) e^{-i\\omega x} dx$, with the differentiation property $\\mathcal{F}[u_{xx}] = -\\omega^2 \\hat u$.',
      'The transform of a Gaussian is again a Gaussian: $\\mathcal{F}[e^{-x^2}] = \\sqrt{\\pi}\\, e^{-\\omega^2/4}$.',
      'When inverting, complete $e^{-(1 + 4a^2 t)\\omega^2/4}$ into the standard Gaussian form $\\sqrt{\\pi/\\beta}\\, e^{-\\omega^2/(4\\beta)}$, whose inverse transform is $e^{-\\beta x^2}$.',
    ],
    solution: [
      {
        title: 'Transforming the equation',
        detail: 'Taking the Fourier transform in $x$: $\\frac{\\partial \\hat u}{\\partial t} = -a^2 \\omega^2 \\hat u$, a first-order ODE with $\\omega$ as a parameter, subject to the initial condition $\\hat u(\\omega, 0) = \\mathcal{F}[e^{-x^2}] = \\sqrt{\\pi}\\, e^{-\\omega^2/4}$.',
      },
      {
        title: 'Solving in the frequency domain',
        detail: '$\\hat u(\\omega, t) = \\sqrt{\\pi}\\, e^{-\\omega^2/4} \\cdot e^{-a^2 \\omega^2 t} = \\sqrt{\\pi}\\, e^{-(1 + 4a^2 t)\\omega^2/4}$. Each spatial frequency component relaxes at its own rate $e^{-a^2 \\omega^2 t}$: the higher the frequency (the finer the spatial structure), the faster the decay.',
      },
      {
        title: 'Inverting back to the time domain',
        detail: 'Using $\\mathcal{F}^{-1}\\left[ \\sqrt{\\pi/\\beta}\\, e^{-\\omega^2/(4\\beta)} \\right] = e^{-\\beta x^2}$ with $\\beta = \\frac{1}{1 + 4a^2 t}$, note that $\\sqrt{\\pi/\\beta} = \\sqrt{\\pi (1 + 4a^2 t)}$ exactly cancels the scaling by the $\\sqrt{\\pi}$ in the numerator.',
      },
      {
        title: 'Smoothness and physical interpretation',
        detail: 'The solution is $u(x, t) = \\frac{1}{\\sqrt{1 + 4a^2 t}} \\exp\\left( -\\frac{x^2}{1 + 4a^2 t} \\right)$. As $t \\to 0^+$ the initial data are recovered; for $t > 0$ the function $u$ is infinitely smooth in $x$ — the high-frequency components are exponentially flattened, which is exactly the dissipative nature of heat conduction that "smears out fine detail". The peak $u(0, t) = (1 + 4a^2 t)^{-1/2}$ decays and the pulse width broadens as $\\sqrt{1 + 4a^2 t}$, while the total heat $\\int u\\, dx = \\sqrt{\\pi}$ stays constant (energy conservation).',
      },
    ],
    answer: '$\\hat u(\\omega, t) = \\sqrt{\\pi}\\, e^{-(1 + 4a^2 t)\\omega^2/4}$; $u(x, t) = \\dfrac{1}{\\sqrt{1 + 4a^2 t}} \\exp\\left( -\\dfrac{x^2}{1 + 4a^2 t} \\right)$',
    tags: ['Fourier transform', 'Heat equation', 'Gaussian kernel'],
  },

  // ─────────────────────── Chapter 6 Laplace Equation on a Rectangle ───────────────────────
  'mathematical-physics-p5': {
    title: 'Separation of Variables for the Laplace Equation on a Rectangle',
    question: 'Solve the Laplace equation on the rectangle $0 < x < a$, $0 < y < b$: $$u_{xx} + u_{yy} = 0$$ subject to $u(0, y) = 0$, $u(x, 0) = 0$, $u(x, b) = 0$, and $u(a, y) = u_0$ (a constant). (1) Separate variables and solve the eigenvalue problem; (2) write the general superposed solution satisfying the three homogeneous boundary conditions; (3) use the fourth boundary condition to determine all coefficients, and compute $u$ at the centre of the rectangle $\\left( \\frac{a}{2}, \\frac{b}{2} \\right)$ (a series form is enough).',
    hints: [
      'Choose $y$ as the homogeneous direction: set $u = X(x) Y(y)$, where $Y$ satisfies $Y^{\\prime\\prime} + \\lambda Y = 0$ with $Y(0) = Y(b) = 0$.',
      'This is exactly the same type as the heat conduction problem: $Y_n = \\sin \\frac{n\\pi y}{b}$, $\\lambda_n = \\left( \\frac{n\\pi}{b} \\right)^2$; the $X$ equation $X^{\\prime\\prime} - \\lambda_n X = 0$ is most conveniently written with hyperbolic functions, and $X(0) = 0$ rules out $\\cosh$.',
      'The Fourier sine expansion of the constant $u_0$ on $(0, b)$ contains only odd $n$: $u_0 = \\sum_{n \\ \\text{odd}} \\frac{4 u_0}{n \\pi} \\sin \\frac{n\\pi y}{b}$.',
    ],
    solution: [
      {
        title: 'Separation of variables and the eigenvalue problem',
        detail: 'Substituting $u = X(x) Y(y)$ gives $\\frac{X^{\\prime\\prime}}{X} = -\\frac{Y^{\\prime\\prime}}{Y} = \\lambda$. In the $y$ direction take the eigenvalue problem $Y^{\\prime\\prime} + \\lambda Y = 0$ with $Y(0) = Y(b) = 0$. As in the vibrating string case, $\\lambda < 0$ and $\\lambda = 0$ yield only the zero solution; for $\\lambda > 0$, $Y = A \\cos \\sqrt{\\lambda} y + B \\sin \\sqrt{\\lambda} y$, and $Y(0) = 0$ gives $A = 0$ while $Y(b) = 0$ gives $\\sqrt{\\lambda} b = n\\pi$. Hence $\\lambda_n = \\left( \\frac{n\\pi}{b} \\right)^2$ and $Y_n = \\sin \\frac{n\\pi y}{b}$, $n = 1, 2, \\ldots$.',
      },
      {
        title: 'Solving the $x$ equation and superposing',
        detail: '$X^{\\prime\\prime} - \\lambda_n X = 0$ has the general solution $X_n = C_n \\cosh \\frac{n\\pi x}{b} + D_n \\sinh \\frac{n\\pi x}{b}$. The condition $u(0, y) = 0$ means $X_n(0) = 0$, and since $\\cosh(0) = 1 \\ne 0$ we get $C_n = 0$. Superposing gives $u(x, y) = \\sum_{n=1}^{\\infty} D_n \\sinh \\frac{n\\pi x}{b} \\sin \\frac{n\\pi y}{b}$, which satisfies all three homogeneous boundary conditions simultaneously.',
      },
      {
        title: 'Determining the coefficients',
        detail: 'Setting $x = a$: $u_0 = \\sum_{n=1}^{\\infty} D_n \\sinh \\frac{n\\pi a}{b} \\sin \\frac{n\\pi y}{b}$. The right-hand side is the Fourier sine expansion of the constant $u_0$, with coefficients $\\frac{2}{b} \\int_0^b u_0 \\sin \\frac{n\\pi y}{b} dy = \\frac{2 u_0}{n \\pi} \\left[ 1 - (-1)^n \\right]$ (zero for even $n$, $\\frac{4 u_0}{n \\pi}$ for odd $n$). Hence $D_n = \\frac{4 u_0}{n \\pi \\sinh(n\\pi a/b)}$ for odd $n$, and the even terms vanish.',
      },
      {
        title: 'Value at the centre of the rectangle',
        detail: 'At $\\left( \\frac{a}{2}, \\frac{b}{2} \\right)$: $\\sin \\frac{n\\pi}{2}$ alternates between $\\pm 1$ for odd $n$, and $\\sinh \\frac{n\\pi a}{2b}$ appears in the denominator. $u\\left( \\frac{a}{2}, \\frac{b}{2} \\right) = \\sum_{n \\ \\text{odd}} \\frac{4 u_0}{n \\pi} \\cdot \\frac{\\sin(n\\pi/2) \\, \\sinh(n\\pi/2b)}{\\sinh(n\\pi a/b)}$. The series is suppressed very rapidly by the ratio of sinh terms, so the first term already gives a good approximation; in particular, when $a \\gg b$ the central value tends to $\\frac{4 u_0}{\\pi} \\cdot \\frac{\\sinh(\\pi/2b)}{\\sinh(\\pi a/b)} \\approx 0$ — deep inside a long narrow rectangle far from the heat source the potential is close to the "cold" end, in agreement with steady-state intuition. Uniqueness of the solution is guaranteed by the maximum principle: the difference of two solutions vanishes on the whole boundary, hence must vanish identically in the interior.',
      },
    ],
    answer: '$u(x, y) = \\displaystyle\\sum_{n \\ \\text{odd}} \\frac{4 u_0}{n \\pi \\sinh(n\\pi a/b)} \\sinh \\frac{n\\pi x}{b} \\sin \\frac{n\\pi y}{b}$; the central value is $\\displaystyle\\sum_{n \\ \\text{odd}} \\frac{4 u_0}{n \\pi} \\frac{\\sin(n\\pi/2)\\,\\sinh(n\\pi/2b)}{\\sinh(n\\pi a/b)}$',
    tags: ['Separation of variables', 'Laplace equation', 'Dirichlet problem'],
  },

  // ─────────────────────── Chapter 7 Legendre Expansion for a Spherical Boundary Value Problem ───────────────────────
  'mathematical-physics-p6': {
    title: 'Solving a Spherical Boundary Value Problem by Legendre Expansion',
    question: 'On a sphere of radius $a$ ($r = a$) the axisymmetric potential distribution $u(a, \\theta) = u_0 \\cos^2 \\theta$ is prescribed. Find the electrostatic potential $u(r, \\theta)$ inside the sphere ($r < a$), axisymmetric and finite at the origin. (1) Write the general axisymmetric solution of Laplace\'s equation inside the sphere; (2) expand the boundary value in Legendre polynomials; (3) determine $u(r, \\theta)$ and compute the potential at the centre and at $r = a/2$, $\\theta = 0$.',
    hints: [
      'Axisymmetric solution inside the sphere with no singularity: $u = \\sum_{l=0}^{\\infty} A_l r^l P_l(\\cos\\theta)$; the $r^{-l-1}$ terms diverge at the origin and must be discarded.',
      '$\\cos^2\\theta = \\frac{1 + \\cos 2\\theta}{2}$; then use $P_0 = 1$ and $P_2 = \\frac{3\\cos^2\\theta - 1}{2}$ to invert and get $\\cos^2\\theta = \\frac{1}{3} P_0 + \\frac{2}{3} P_2(\\cos\\theta)$.',
      'Determine coefficients with the orthogonality relation $\\int_{-1}^{1} P_l P_m\\, dx = \\frac{2}{2l + 1} \\delta_{lm}$, or simply compare coefficients (least work when the boundary value is a finite combination of the $P_l$).',
    ],
    solution: [
      {
        title: 'General form of the solution',
        detail: 'Separating variables in the axisymmetric Laplace equation in spherical coordinates gives radial solutions $r^l$ and $r^{-l-1}$ and angular solutions $P_l(\\cos\\theta)$. Finiteness at $r = 0$ requires discarding $r^{-l-1}$: $u(r, \\theta) = \\sum_{l=0}^{\\infty} A_l r^l P_l(\\cos\\theta)$.',
      },
      {
        title: 'Legendre expansion of the boundary value',
        detail: 'From $P_2(x) = \\frac{3x^2 - 1}{2}$ we solve for $x^2 = \\frac{2 P_2(x) + 1}{3}$. Substituting $x = \\cos\\theta$: $u_0 \\cos^2 \\theta = u_0 \\left[ \\frac{1}{3} P_0(\\cos\\theta) + \\frac{2}{3} P_2(\\cos\\theta) \\right]$, so only the $l = 0$ and $l = 2$ components are present.',
      },
      {
        title: 'Determining coefficients and writing the solution',
        detail: 'Setting $r = a$ and comparing the $P_l$ coefficients: $A_0 = \\frac{u_0}{3}$, $A_2 a^2 = \\frac{2 u_0}{3}$, and all other $A_l = 0$. Hence $u(r, \\theta) = \\frac{u_0}{3} + \\frac{2 u_0}{3} \\frac{r^2}{a^2} P_2(\\cos\\theta) = \\frac{u_0}{3} \\left[ 1 + \\frac{2 r^2}{a^2} \\cdot \\frac{3 \\cos^2 \\theta - 1}{2} \\right]$.',
      },
      {
        title: 'Values at specific points',
        detail: 'At the centre $r = 0$: $u = \\frac{u_0}{3}$ — exactly the average of the boundary value $u_0 \\cos^2\\theta$ over the sphere, $\\frac{1}{4\\pi} \\int u_0 \\cos^2\\theta\\, d\\Omega = \\frac{u_0}{3}$, a concrete instance of the mean value property of harmonic functions. At $r = \\frac{a}{2}$, $\\theta = 0$ (where $P_2(1) = 1$): $u = \\frac{u_0}{3} \\left( 1 + \\frac{2 \\cdot a^2/4}{a^2} \\right) = \\frac{u_0}{3} \\cdot \\frac{3}{2} = \\frac{u_0}{2}$.',
      },
    ],
    answer: '$u(r, \\theta) = \\dfrac{u_0}{3} + \\dfrac{2 u_0}{3} \\left( \\dfrac{r}{a} \\right)^2 P_2(\\cos\\theta)$; potential at the centre $\\dfrac{u_0}{3}$; at $r = a/2$, $\\theta = 0$ it is $\\dfrac{u_0}{2}$',
    tags: ['Legendre polynomials', 'Spherical boundary value problem', 'Mean value property'],
  },
};

export default map;
