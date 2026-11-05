import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'analytical-mechanics-p1': {
    title: 'Constraint Analysis, Degrees of Freedom and Generalized Coordinates of a Spherical Pendulum',
    question:
      'A light rigid rod of length $l$ is attached at one end $O$ to the ceiling by a smooth ball-and-socket joint and carries a small ball of mass $m$ at the other end (a spherical pendulum). Take $O$ as the origin of a Cartesian system with the $z$ axis pointing vertically upward. Find: (1) the constraint equation and the class of the constraint (holonomic or not, scleronomic or not, ideal or not); (2) the number of degrees of freedom $s$; (3) a set of generalized coordinates and the Cartesian coordinates of the ball in terms of them; (4) separately, for two particles of mass $m_1$, $m_2$ in a plane joined by a light rigid rod of length $l$, the number of degrees of freedom.',
    hints: [
      'The constraint is "the distance from the ball to the fixed point $O$ stays the same", namely $x^2+y^2+z^2=l^2$; to classify it, check whether it involves the time $t$ and whether it contains velocity components.',
      'Criterion for an ideal constraint: the total work done by the constraint forces in an arbitrary virtual displacement is zero. The rod force points along the rod, whereas the virtual displacements permitted by a rigid rod are perpendicular to it.',
      'Two particles in a plane have $6$ coordinates in total, and the rod length is the only independent constraint.',
    ],
    solution: [
      {
        title: 'Constraint equation and classification',
        detail:
          'The constraint is $x^2+y^2+z^2=l^2$. It contains only coordinates and no time (scleronomic), and no velocities; being a geometric equation it is holonomic. The constraint force comes from the ball joint and the rigid rod and points along the rod, while every virtual displacement allowed by the rod is perpendicular to it, so the virtual work of the constraint force vanishes, $\\vec{F}_N\\cdot\\delta\\vec{r} = 0$, and the constraint is ideal.',
      },
      {
        title: 'Counting degrees of freedom',
        detail:
          '$N = 1$ and the number of independent holonomic constraints is $k = 1$, hence $s = 3N - k = 3 - 1 = 2$.',
      },
      {
        title: 'Choice of generalized coordinates',
        detail:
          'Take the spherical angles $(\\theta, \\varphi)$: $\\theta$ is the angle between the rod and the $z$ axis and $\\varphi$ the azimuth. The Cartesian coordinates of the ball are $x = l\\sin\\theta\\cos\\varphi$, $y = l\\sin\\theta\\sin\\varphi$, $z = l\\cos\\theta$. At any instant the two parameters determine the position of the ball completely, as the number of degrees of freedom requires.',
      },
      {
        title: 'Degrees of freedom of the planar two-particle system',
        detail:
          '$N = 2$, so there are $6$ coordinates in total; the only independent holonomic constraint is $|(x_1-x_2)^2 + (y_1-y_2)^2|^{1/2} = l$, so $k = 1$. Hence $s = 6 - 1 = 5$; for example one may take $2$ coordinates for each particle plus the orientation angle $\\theta$ of the rod ($5$ independent parameters in all).',
      },
    ],
    answer:
      'Constraint $x^2+y^2+z^2=l^2$: holonomic, scleronomic and ideal; the number of degrees of freedom is $s=3-1=2$, with generalized coordinates $(\\theta,\\varphi)$ and $x=l\\sin\\theta\\cos\\varphi,\\ y=l\\sin\\theta\\sin\\varphi,\\ z=l\\cos\\theta$; for the planar two-particle rigid-rod system $s=6-1=5$.',
    tags: ['constraint', 'degrees of freedom', 'generalized coordinates', 'ideal constraint'],
  },

  'analytical-mechanics-p2': {
    title: 'Block on a Movable Wedge: Cyclic Coordinate and Conserved Quantity',
    question:
      'A right-angled wedge of mass $M$ rests on a smooth horizontal floor, and a block of mass $m$ is placed on its smooth inclined face of angle $\\alpha$. The system starts from rest: the block slides down the incline while the wedge recoils along the floor. Take the horizontal displacement $x$ of the wedge (positive to the right) and the distance $s$ slid down the incline by the block as generalized coordinates, so that the coordinates of the block relative to the ground are $x_b = x + s\\cos\\alpha$ and $y_b = h - s\\sin\\alpha$ ($h$ constant, $y$ positive upward). Find: (1) the Lagrangian $L$ of the system; (2) the two equations of motion; (3) the cyclic coordinate, the corresponding conserved quantity and its physical meaning; (4) $\\ddot{s}$ and $\\ddot{x}$ from the equations of motion.',
    hints: [
      'The velocity of the block must be taken relative to the ground: $\\dot{x}_b = \\dot{x} + \\dot{s}\\cos\\alpha$, $\\dot{y}_b = -\\dot{s}\\sin\\alpha$; when squaring, the cross term $2\\dot{x}\\dot{s}\\cos\\alpha$ must not be lost.',
      'The potential energy may be taken as $V = -mg s\\sin\\alpha$ (a constant offset does not change the equations).',
      'Check whether $\\partial L/\\partial x$ is zero: if it is, $x$ is a cyclic coordinate and $p_x = \\partial L/\\partial\\dot{x}$ is conserved — work out whether it is the total horizontal momentum of the system.',
    ],
    solution: [
      {
        title: 'Kinetic energy (watch the cross term)',
        detail:
          'The velocity components of the block are $\\dot{x}_b = \\dot{x} + \\dot{s}\\cos\\alpha$, $\\dot{y}_b = -\\dot{s}\\sin\\alpha$, so $v_b^2 = \\dot{x}^2 + 2\\dot{x}\\dot{s}\\cos\\alpha + \\dot{s}^2$. The kinetic energy is\\n$T = \\tfrac12 M\\dot{x}^2 + \\tfrac12 m(\\dot{x}^2 + 2\\dot{x}\\dot{s}\\cos\\alpha + \\dot{s}^2) = \\tfrac12(M+m)\\dot{x}^2 + m\\cos\\alpha\\,\\dot{x}\\dot{s} + \\tfrac12 m\\dot{s}^2$.',
      },
      {
        title: 'The Lagrangian',
        detail:
          '$V = mgy_b = mgh - mg s\\sin\\alpha$; dropping the constant $mgh$ gives $V = -mg s\\sin\\alpha$. Hence\\n$L = \\tfrac12(M+m)\\dot{x}^2 + m\\cos\\alpha\\,\\dot{x}\\dot{s} + \\tfrac12 m\\dot{s}^2 + mg s\\sin\\alpha$.',
      },
      {
        title: 'Cyclic coordinate and conserved quantity',
        detail:
          '$\\partial L/\\partial x = 0$, so $x$ is a cyclic coordinate and the conjugate momentum $p_x = \\dfrac{\\partial L}{\\partial\\dot{x}} = (M+m)\\dot{x} + m\\dot{s}\\cos\\alpha = $ const. It is exactly the total horizontal momentum of the system: $M\\dot{x} + m(\\dot{x} + \\dot{s}\\cos\\alpha)$. Since the system starts from rest the constant is zero, i.e. the recoil momentum of the wedge and the horizontal momentum of the block cancel at every instant.',
      },
      {
        title: 'Equations of motion and solution',
        detail:
          'For $x$: $(M+m)\\ddot{x} + m\\cos\\alpha\\,\\ddot{s} = 0$. For $s$: $m\\cos\\alpha\\,\\ddot{x} + m\\ddot{s} - mg\\sin\\alpha = 0$, i.e. $\\ddot{s} + \\cos\\alpha\\,\\ddot{x} = g\\sin\\alpha$. Eliminating $\\ddot{x}$ from the two equations: $\\ddot{s}\\left(1 - \\dfrac{m\\cos^2\\alpha}{M+m}\\right) = g\\sin\\alpha$, hence\\n$\\ddot{s} = \\dfrac{(M+m)g\\sin\\alpha}{M + m\\sin^2\\alpha}$, $\\ddot{x} = -\\dfrac{mg\\sin\\alpha\\cos\\alpha}{M + m\\sin^2\\alpha}$ (the minus sign means the wedge recoils to the left).',
      },
    ],
    answer:
      '$L = \\tfrac12(M+m)\\dot{x}^2 + m\\cos\\alpha\\,\\dot{x}\\dot{s} + \\tfrac12 m\\dot{s}^2 + mg s\\sin\\alpha$; $x$ is a cyclic coordinate and the conserved quantity $(M+m)\\dot{x} + m\\dot{s}\\cos\\alpha = 0$ is the total horizontal momentum; $\\ddot{s} = \\dfrac{(M+m)g\\sin\\alpha}{M+m\\sin^2\\alpha}$, $\\ddot{x} = -\\dfrac{mg\\sin\\alpha\\cos\\alpha}{M+m\\sin^2\\alpha}$.',
    tags: ['Lagrange equations', 'cyclic coordinate', 'momentum conservation', 'kinetic cross term'],
  },

  'analytical-mechanics-p3': {
    title: 'Deriving the Harmonic Oscillator Equation from Hamilton\'s Principle',
    question:
      'A particle of mass $m$ moves along the $x$ axis under a light spring of stiffness $k$; take the equilibrium position as the origin and the displacement $x$ as generalized coordinate. The action is $S = \\int_{t_1}^{t_2} L\\,dt$, and Hamilton\'s principle states that the true motion makes $\\delta S = 0$. Find: (1) the Lagrangian and the action; (2) taking an isochronous variation of the path and using the endpoint conditions $\\delta x(t_1) = \\delta x(t_2) = 0$ together with $\\delta\\dot{x} = \\frac{d}{dt}(\\delta x)$, reduce $\\delta S$ by integration by parts to an integral containing only $\\delta x$; (3) deduce the equation of motion from $\\delta S = 0$ for arbitrary $\\delta x$; (4) show that the equation agrees with the Lagrange equation of the second kind and give the angular frequency.',
    hints: [
      'The variation acts on the path, not on time: for an isochronous variation $\\delta\\dot{x} = \\frac{d}{dt}\\delta x$, i.e. variation and differentiation commute.',
      'Integration by parts: $\\int m\\dot{x}\\,\\frac{d}{dt}(\\delta x)\\,dt = [m\\dot{x}\\,\\delta x]_{t_1}^{t_2} - \\int m\\ddot{x}\\,\\delta x\\,dt$, and the boundary term vanishes by the fixed endpoints.',
      'Fundamental lemma of the calculus of variations: if $\\int f(t)\\,\\delta x\\,dt = 0$ for every $\\delta x(t)$, then $f(t) \\equiv 0$.',
    ],
    solution: [
      {
        title: 'Lagrangian and action',
        detail:
          '$T = \\tfrac12 m\\dot{x}^2$, $V = \\tfrac12 kx^2$, so $L = \\tfrac12 m\\dot{x}^2 - \\tfrac12 kx^2$ and the action is $S = \\displaystyle\\int_{t_1}^{t_2}\\left(\\tfrac12 m\\dot{x}^2 - \\tfrac12 kx^2\\right)dt$.',
      },
      {
        title: 'First variation',
        detail:
          '$\\delta S = \\displaystyle\\int_{t_1}^{t_2}\\left(m\\dot{x}\\,\\delta\\dot{x} - kx\\,\\delta x\\right)dt$. Substituting $\\delta\\dot{x} = \\frac{d}{dt}(\\delta x)$: $\\delta S = \\displaystyle\\int_{t_1}^{t_2} m\\dot{x}\\,\\frac{d}{dt}(\\delta x)\\,dt - \\int_{t_1}^{t_2} kx\\,\\delta x\\,dt$.',
      },
      {
        title: 'Integration by parts and removal of the boundary term',
        detail:
          'Integrating the first term by parts: $\\displaystyle\\int m\\dot{x}\\,\\frac{d}{dt}(\\delta x)\\,dt = \\big[m\\dot{x}\\,\\delta x\\big]_{t_1}^{t_2} - \\int m\\ddot{x}\\,\\delta x\\,dt$. The endpoint conditions $\\delta x(t_1) = \\delta x(t_2) = 0$ make the boundary term vanish, so $\\delta S = -\\displaystyle\\int_{t_1}^{t_2}\\left(m\\ddot{x} + kx\\right)\\delta x\\,dt$.',
      },
      {
        title: 'Equation of motion from arbitrariness',
        detail:
          'The true motion requires $\\delta S = 0$ for every $\\delta x(t)$ in the interval, so the fundamental lemma gives $m\\ddot{x} + kx = 0$. On the other hand $\\partial L/\\partial x = -kx$ and $\\partial L/\\partial\\dot{x} = m\\dot{x}$; substituting into the Lagrange equation of the second kind $\\frac{d}{dt}(m\\dot{x}) - (-kx) = 0$ gives exactly the same result. The angular frequency is $\\omega = \\sqrt{k/m}$.',
      },
    ],
    answer:
      'The equation of motion is $m\\ddot{x} + kx = 0$, i.e. $\\ddot{x} + \\omega^2 x = 0$ with $\\omega = \\sqrt{k/m}$; it agrees with the result of the Lagrange equation of the second kind.',
    tags: ['Hamilton\'s principle', 'calculus of variations', 'harmonic oscillator', 'integration by parts'],
  },

  'analytical-mechanics-p4': {
    title: 'Canonical Equations and Poisson Brackets for the Harmonic Oscillator',
    question:
      'A one-dimensional harmonic oscillator has mass $m$, stiffness $k$ and Lagrangian $L = \\tfrac12 m\\dot{x}^2 - \\tfrac12 kx^2$. Find: (1) the conjugate momentum $p$ and, by a Legendre transformation, the Hamiltonian $H(x, p)$ (be sure to express $\\dot{x}$ through $p$); (2) the canonical equations and the general solution $x(t)$; (3) using the Poisson bracket $\\{u, v\\} = \\frac{\\partial u}{\\partial x}\\frac{\\partial v}{\\partial p} - \\frac{\\partial u}{\\partial p}\\frac{\\partial v}{\\partial x}$, compute $\\{x, H\\}$ and $\\{p, H\\}$, check them against the canonical equations, and verify the fundamental bracket $\\{x, p\\} = 1$; (4) compute $\\frac{dH}{dt} = \\{H, H\\} + \\frac{\\partial H}{\\partial t}$ and explain energy conservation.',
    hints: [
      'The conjugate momentum is $p = \\partial L/\\partial\\dot{x} = m\\dot{x}$, so $\\dot{x} = p/m$; after the Legendre transformation $H = p\\dot{x} - L$, no $\\dot{x}$ may remain in $H$.',
      'First solve the coupled linear system $\\dot{p} = -kx$, $\\dot{x} = p/m$: differentiating $x$ twice gives $\\ddot{x} + \\omega^2 x = 0$.',
      'When computing Poisson brackets, substitute the definition and differentiate term by term; $\\{H, H\\}$ vanishes immediately by antisymmetry.',
    ],
    solution: [
      {
        title: 'Hamiltonian by Legendre transformation',
        detail:
          '$p = \\dfrac{\\partial L}{\\partial\\dot{x}} = m\\dot{x}$, so $\\dot{x} = p/m$. Hence\\n$H = p\\dot{x} - L = \\dfrac{p^2}{m} - \\left(\\dfrac{p^2}{2m} - \\tfrac12 kx^2\\right) = \\dfrac{p^2}{2m} + \\tfrac12 kx^2$.',
      },
      {
        title: 'Canonical equations and general solution',
        detail:
          '$\\dot{x} = \\dfrac{\\partial H}{\\partial p} = \\dfrac{p}{m}$, $\\dot{p} = -\\dfrac{\\partial H}{\\partial x} = -kx$. Eliminating $p$: $\\ddot{x} = \\dot{p}/m = -\\dfrac{k}{m}x$, i.e. $\\ddot{x} + \\omega^2 x = 0$ ($\\omega = \\sqrt{k/m}$). The general solution is $x = A\\sin(\\omega t + \\varphi_0)$, $p = mA\\omega\\cos(\\omega t + \\varphi_0)$.',
      },
      {
        title: 'Poisson-bracket check',
        detail:
          '$\\{x, H\\} = \\dfrac{\\partial x}{\\partial x}\\dfrac{\\partial H}{\\partial p} - \\dfrac{\\partial x}{\\partial p}\\dfrac{\\partial H}{\\partial x} = \\dfrac{p}{m} = \\dot{x}$; $\\{p, H\\} = \\dfrac{\\partial p}{\\partial x}\\dfrac{\\partial H}{\\partial p} - \\dfrac{\\partial p}{\\partial p}\\dfrac{\\partial H}{\\partial x} = -kx = \\dot{p}$. Both agree with the canonical equations. The fundamental bracket is $\\{x, p\\} = \\dfrac{\\partial x}{\\partial x}\\dfrac{\\partial p}{\\partial p} - 0 = 1$.',
      },
      {
        title: 'Energy conservation',
        detail:
          '$\\dfrac{dH}{dt} = \\{H, H\\} + \\dfrac{\\partial H}{\\partial t}$. By antisymmetry $\\{H, H\\} \\equiv 0$, and $H$ does not depend explicitly on time, so $\\partial H/\\partial t = 0$ and $dH/dt = 0$: the mechanical energy $E = H = \\dfrac{p^2}{2m} + \\tfrac12 kx^2$ is conserved (the phase orbit is the ellipse $p^2/2m + kx^2/2 = E$).',
      },
    ],
    answer:
      '$H = \\dfrac{p^2}{2m} + \\tfrac12 kx^2$; $\\dot{x} = p/m$, $\\dot{p} = -kx$, general solution $x = A\\sin(\\omega t + \\varphi_0)$ with $\\omega = \\sqrt{k/m}$; $\\{x, H\\} = \\dot{x}$, $\\{p, H\\} = \\dot{p}$, $\\{x, p\\} = 1$; $dH/dt = 0$, so energy is conserved.',
    tags: ['canonical equations', 'Legendre transformation', 'Poisson bracket', 'conserved quantity'],
  },

  'analytical-mechanics-p5': {
    title: 'Normal Frequencies and Normal Modes of Two Spring-Coupled Pendulums',
    question:
      'Two identical simple pendulums (length $l$, bob mass $m$) hang from the same horizontal support and are joined by a light spring of stiffness $k$ at a distance $d$ below the pivots, the natural length of the spring being exactly the horizontal separation of the pivots. The system performs small oscillations in a vertical plane; take the angles $\\theta_1$, $\\theta_2$ between the pendulums and the vertical as generalized coordinates. Find: (1) the quadratic forms of the kinetic and potential energies; (2) the small-oscillation equations, the secular equation and the two normal frequencies; (3) the normal modes corresponding to in-phase and anti-phase motion; (4) numerical values for $m = 0.50\\ \\text{kg}$, $l = 1.0\\ \\text{m}$, $d = 0.50\\ \\text{m}$, $k = 20\\ \\text{N/m}$, $g = 9.8\\ \\text{m/s}^2$.',
    hints: [
      'The speed of each bob is $l\\dot{\\theta}_i$; the horizontal displacement of each spring attachment point is about $d\\theta_i$, so the extension of the spring is their difference $d(\\theta_2 - \\theta_1)$.',
      'The gravitational potential energy contributes $mg\\cdot\\frac{l\\theta^2}{2}$ per pendulum (small-angle approximation $1-\\cos\\theta \\approx \\theta^2/2$).',
      'First try "guessing the modes": set $\\theta_1 = \\theta_2$ (in phase) and $\\theta_1 = -\\theta_2$ (anti-phase) in the equations and read off the frequencies, then confirm in general with the secular equation $\\det(\\mathbf{K} - \\omega^2\\mathbf{M}) = 0$.',
    ],
    solution: [
      {
        title: 'Writing the quadratic forms',
        detail:
          'For small oscillations the bob speed is $v_i = l\\dot{\\theta}_i$, so $T = \\tfrac12 ml^2(\\dot{\\theta}_1^2 + \\dot{\\theta}_2^2)$. Potential energy: the gravitational part is $V_g = \\tfrac12 mgl(\\theta_1^2 + \\theta_2^2)$; the spring extension is $\\approx d(\\theta_2 - \\theta_1)$, so $V_s = \\tfrac12 k d^2(\\theta_1 - \\theta_2)^2$.',
      },
      {
        title: 'Equations of motion and secular equation',
        detail:
          'Substituting into the Lagrange equations: $ml^2\\ddot{\\theta}_1 + mgl\\theta_1 + kd^2(\\theta_1 - \\theta_2) = 0$, $ml^2\\ddot{\\theta}_2 + mgl\\theta_2 - kd^2(\\theta_1 - \\theta_2) = 0$. The mass matrix is $\\mathbf{M} = ml^2\\mathbf{I}$ and the stiffness matrix is $\\mathbf{K} = \\begin{pmatrix} mgl + kd^2 & -kd^2 \\\\ -kd^2 & mgl + kd^2 \\end{pmatrix}$. Setting $\\theta_i = A_i e^{i\\omega t}$, the secular equation is $\\det(\\mathbf{K} - \\omega^2\\mathbf{M}) = (mgl + kd^2 - ml^2\\omega^2)^2 - k^2d^4 = 0$.',
      },
      {
        title: 'Normal frequencies and normal modes',
        detail:
          'From $(mgl + kd^2 - ml^2\\omega^2) = \\pm kd^2$ two solutions follow: $\\omega_1^2 = g/l$ with $A_1 = A_2$ (in-phase mode: the spring is never deformed and the frequency equals that of a single pendulum); and $\\omega_2^2 = g/l + \\dfrac{2kd^2}{ml^2}$ with $A_1 = -A_2$ (anti-phase mode: the spring is repeatedly stretched and compressed, and the coupling pushes the frequency up).',
      },
      {
        title: 'Numerical values',
        detail:
          '$\\omega_1 = \\sqrt{9.8/1.0} \\approx 3.13\\ \\text{rad/s}$; $\\omega_2^2 = 9.8 + \\dfrac{2\\times 20\\times 0.50^2}{0.50\\times 1.0} = 9.8 + 20 = 29.8\\ \\text{s}^{-2}$, so $\\omega_2 \\approx 5.46\\ \\text{rad/s}$. The ratio of the anti-phase to the in-phase frequency is about $1.74$, and the splitting grows with stronger coupling (larger $k$ and $d$).',
      },
    ],
    answer:
      '$\\omega_1 = \\sqrt{g/l} \\approx 3.13\\ \\text{rad/s}$ (in-phase mode $\\theta_1 = \\theta_2$) and $\\omega_2 = \\sqrt{g/l + 2kd^2/(ml^2)} \\approx 5.46\\ \\text{rad/s}$ (anti-phase mode $\\theta_1 = -\\theta_2$).',
    tags: ['small oscillations', 'normal frequencies', 'coupled pendulums', 'secular equation'],
  },

  'analytical-mechanics-p6': {
    title: 'Steady Precession Rate of a Symmetric Heavy Top',
    question:
      'A symmetric top ($I_1 = I_2 = 5.0\\times 10^{-4}\\ \\text{kg·m}^2$, $I_3 = 1.0\\times 10^{-4}\\ \\text{kg·m}^2$) spins rapidly about its symmetry axis with angular velocity $\\omega_3 = 200\\ \\text{rad/s}$; one point is fixed at the pivot $O$, the centre of mass lies at $l = 0.05\\ \\text{m}$ from $O$, the mass is $m = 0.20\\ \\text{kg}$ and $g = 9.8\\ \\text{m/s}^2$. The Lagrangian of the top is $L = \\tfrac12 I_1(\\dot{\\theta}^2 + \\dot{\\varphi}^2\\sin^2\\theta) + \\tfrac12 I_3(\\dot{\\psi} + \\dot{\\varphi}\\cos\\theta)^2 - mgl\\cos\\theta$. Find: (1) the cyclic coordinates and the two conserved quantities $p_\\varphi$, $p_\\psi$; (2) prove that for constant nutation angle $\\theta$ (steady precession) the precession rate $\\Omega = \\dot{\\varphi}$ satisfies $I_1\\Omega^2\\cos\\theta - I_3\\omega_3\\Omega + mgl = 0$; (3) for a fast top derive the slow-precession approximation $\\Omega \\approx mgl/(I_3\\omega_3)$ and evaluate it numerically; (4) state the condition for real roots of the quadratic and the physical meaning of the two roots.',
    hints: [
      'Cyclic coordinates: check whether $\\partial L/\\partial\\varphi$ and $\\partial L/\\partial\\psi$ vanish; the conserved quantities are the corresponding generalized momenta, e.g. $p_\\psi = \\partial L/\\partial\\dot{\\psi} = I_3(\\dot{\\psi} + \\dot{\\varphi}\\cos\\theta) = I_3\\omega_3$.',
      'Steady precession means $\\dot{\\theta} = \\ddot{\\theta} = 0$: substitute into the $\\theta$ Lagrange equation $\\frac{d}{dt}(I_1\\dot{\\theta}) - \\frac{\\partial L}{\\partial\\theta} = 0$ and set $\\frac{\\partial L}{\\partial\\theta} = 0$ to obtain the equation for $\\Omega$.',
      'The slow-precession approximation requires $mgl \\ll I_3\\omega_3^2$; the discriminant $I_3^2\\omega_3^2 - 4I_1mgl\\cos\\theta \\ge 0$ decides whether steady precession exists.',
    ],
    solution: [
      {
        title: 'Cyclic coordinates and conserved quantities',
        detail:
          '$L$ does not contain $\\varphi$ or $\\psi$ explicitly, so both are cyclic. The conserved quantities are $p_\\varphi = \\dfrac{\\partial L}{\\partial\\dot{\\varphi}} = I_1\\dot{\\varphi}\\sin^2\\theta + I_3(\\dot{\\psi} + \\dot{\\varphi}\\cos\\theta)\\cos\\theta = I_1\\dot{\\varphi}\\sin^2\\theta + I_3\\omega_3\\cos\\theta$ (the angular momentum about the vertical axis) and $p_\\psi = \\dfrac{\\partial L}{\\partial\\dot{\\psi}} = I_3\\omega_3$ (the component of angular momentum along the symmetry axis).',
      },
      {
        title: 'Deriving the steady-precession condition',
        detail:
          'The $\\theta$ equation: $\\dfrac{d}{dt}(I_1\\dot{\\theta}) - \\dfrac{\\partial L}{\\partial\\theta} = 0$, where $\\dfrac{\\partial L}{\\partial\\theta} = I_1\\dot{\\varphi}^2\\sin\\theta\\cos\\theta - I_3(\\dot{\\psi} + \\dot{\\varphi}\\cos\\theta)\\dot{\\varphi}\\sin\\theta + mgl\\sin\\theta$. Steady precession $\\dot{\\theta} = \\ddot{\\theta} = 0$ requires $\\partial L/\\partial\\theta = 0$; dividing by $\\sin\\theta$ and setting $\\Omega = \\dot{\\varphi}$, $\\omega_3 = \\dot{\\psi} + \\Omega\\cos\\theta$ gives\\n$mgl = I_3\\omega_3\\Omega - I_1\\Omega^2\\cos\\theta$, i.e. $I_1\\Omega^2\\cos\\theta - I_3\\omega_3\\Omega + mgl = 0$.',
      },
      {
        title: 'Slow-precession approximation and numbers',
        detail:
          'A fast top satisfies $mgl \\ll I_3\\omega_3^2$; the $\\Omega^2$ term may then be dropped, giving $\\Omega \\approx \\dfrac{mgl}{I_3\\omega_3}$. Numerically: $mgl = 0.20\\times 9.8\\times 0.05 = 0.098\\ \\text{N·m}$ and $I_3\\omega_3 = 1.0\\times 10^{-4}\\times 200 = 0.020\\ \\text{kg·m}^2\\text{/s}$, so $\\Omega \\approx \\dfrac{0.098}{0.020} = 4.9\\ \\text{rad/s}$. Check of the approximation: $I_3\\omega_3^2 = 4\\ \\text{N·m} \\gg mgl = 0.098\\ \\text{N·m}$, so it is reliable.',
      },
      {
        title: 'Condition for real roots and the two roots',
        detail:
          'Steady precession exists when the discriminant $\\Delta = I_3^2\\omega_3^2 - 4I_1mgl\\cos\\theta \\ge 0$, with $\\Omega = \\dfrac{I_3\\omega_3 \\pm \\sqrt{I_3^2\\omega_3^2 - 4I_1mgl\\cos\\theta}}{2I_1\\cos\\theta}$. Here $I_3^2\\omega_3^2 = 4.0\\times 10^{-4} > 4I_1mgl = 1.96\\times 10^{-4}$, so at ordinary tilts both roots exist: the slow root (about $4.9\\ \\text{rad/s}$) is the leisurely precession seen in everyday life, while the fast root (of the same order as $\\omega_3$) is a rapid precession superposed on the slow one and shows up only when the initial conditions are carefully arranged. If the discriminant condition fails, the top does not precess steadily but exhibits pronounced nutation.',
      },
    ],
    answer:
      'The cyclic coordinates are $\\varphi$ and $\\psi$, with conserved quantities $p_\\varphi = I_1\\dot{\\varphi}\\sin^2\\theta + I_3\\omega_3\\cos\\theta$ and $p_\\psi = I_3\\omega_3$; steady precession satisfies $I_1\\Omega^2\\cos\\theta - I_3\\omega_3\\Omega + mgl = 0$; the slow precession is $\\Omega \\approx mgl/(I_3\\omega_3) = 4.9\\ \\text{rad/s}$; when $I_3^2\\omega_3^2 \\ge 4I_1mgl\\cos\\theta$ there are two roots (slow and fast precession).',
    tags: ['symmetric top', 'precession', 'Euler angles', 'cyclic coordinate'],
  },
};

export default map;
