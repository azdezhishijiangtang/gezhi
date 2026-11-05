import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'quantum-mechanics-p1': {
    title: 'Energy levels and transitions of an electron in an infinite square well',
    question:
      'An electron is confined in a one-dimensional infinite square well of width $a = 1\\ \\text{nm}$ (potential zero inside, infinite outside). Given the electron mass $m = 9.11\\times10^{-31}\\ \\text{kg}$, $\\hbar = 1.055\\times10^{-34}\\ \\text{J}\\cdot\\text{ s}$, $1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}$. Find: (1) the general expressions for the stationary energies and wave functions; (2) the ground-state energy $E_1$ (in eV); (3) the wavelength of the photon emitted when the electron drops from $n = 2$ to $n = 1$; (4) the probability of finding the electron in $0 < x < a/4$ in the ground state.',
    hints: [
      'Inside the well the wave function satisfies the free-particle Schrödinger equation, with general solution $\\psi = A\\sin kx + B\\cos kx$; the boundary conditions $\\psi(0) = \\psi(a) = 0$ give the quantisation condition $k = n\\pi/a$.',
      'The levels are $E_n = n^2\\pi^2\\hbar^2/(2ma^2)$; the photon wavelength follows from $hc/\\lambda = E_2 - E_1$, using $hc = 1240\\ \\text{eV}\\cdot\\text{ nm}$.',
      'Probability = $\\int_0^{a/4} |\\psi_1|^2 dx$; integrate using $\\sin^2 u = \\frac{1 - \\cos 2u}{2}$.',
    ],
    solution: [
      {
        title: 'Solving inside the well and quantisation',
        detail: 'Inside the well $-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} = E\\psi$, with general solution $\\psi = A\\sin kx + B\\cos kx$ and $k = \\sqrt{2mE}/\\hbar$. The condition $\\psi(0) = 0$ requires $B = 0$; $\\psi(a) = 0$ requires $\\sin ka = 0$, i.e. $k = n\\pi/a$ ($n = 1, 2, \\ldots$).',
      },
      {
        title: 'Energy levels and wave functions',
        detail: '$E_n = \\dfrac{n^2\\pi^2\\hbar^2}{2ma^2}$, $\\psi_n(x) = \\sqrt{2/a}\\,\\sin\\dfrac{n\\pi x}{a}$. Substituting numbers: $E_1 = \\dfrac{\\pi^2 \\times (1.055\\times10^{-34})^2}{2 \\times 9.11\\times10^{-31} \\times (10^{-9})^2} \\approx 6.03\\times10^{-20}\\ \\text{J} \\approx 0.376\\ \\text{eV}$.',
      },
      {
        title: 'Wavelength of the transition photon',
        detail: '$\\Delta E = E_2 - E_1 = 4E_1 - E_1 = 3E_1 \\approx 1.13\\ \\text{eV}$, so $\\lambda = \\dfrac{hc}{\\Delta E} = \\dfrac{1240}{1.13} \\approx 1.1\\times10^3\\ \\text{nm}$ (near infrared).',
      },
      {
        title: 'Ground-state position probability',
        detail: '$P = \\dfrac{2}{a}\\int_0^{a/4}\\sin^2\\dfrac{\\pi x}{a}dx$. Let $u = \\pi x/a$: $P = \\dfrac{2}{\\pi}\\int_0^{\\pi/4}\\sin^2 u\\, du = \\dfrac{2}{\\pi}\\left[\\dfrac{u}{2} - \\dfrac{\\sin 2u}{4}\\right]_0^{\\pi/4} = \\dfrac{2}{\\pi}\\left(\\dfrac{\\pi}{8} - \\dfrac{1}{4}\\right) = \\dfrac{1}{4} - \\dfrac{1}{2\\pi} \\approx 0.091$.',
      },
    ],
    answer: '$E_n = n^2\\pi^2\\hbar^2/(2ma^2)$, $E_1 \\approx 0.376\\ \\text{eV}$; transition photon $\\lambda \\approx 1.1\\times10^3\\ \\text{nm}$; $P(0 < x < a/4) = \\dfrac{1}{4} - \\dfrac{1}{2\\pi} \\approx 9.1\\%$',
    tags: ['Infinite square well', 'Stationary Schrödinger equation', 'Quantum transitions'],
  },
  'quantum-mechanics-p2': {
    title: 'Verifying the harmonic-oscillator ground state and zero-point energy',
    question:
      'The ground-state wave function of the one-dimensional harmonic oscillator $V(x) = \\frac{1}{2}m\\omega^2x^2$ may be written $\\psi_0(x) = A\\, e^{-\\alpha x^2/2}$ with $\\alpha = m\\omega/\\hbar$. (1) Determine the constant $A$ from normalisation; (2) substitute $\\psi_0$ into the stationary Schrödinger equation and prove that the ground-state energy is $E_0 = \\frac{1}{2}\\hbar\\omega$; (3) compute $\\Delta x$ and $\\Delta p$, verify that $\\Delta x\\,\\Delta p = \\hbar/2$, and explain why the zero-point energy cannot vanish.',
    hints: [
      'Normalisation needs the Gaussian integral $\\int_{-\\infty}^{+\\infty} e^{-\\beta x^2}dx = \\sqrt{\\pi/\\beta}$.',
      'The second derivative of $\\psi_0$ satisfies $\\psi_0^{\\prime\\prime} = (\\alpha^2x^2 - \\alpha)\\psi_0$; after substitution compare the $x^2$ and constant terms separately.',
      '$\\langle x^2\\rangle = \\frac{1}{2\\alpha}$; $\\langle p^2\\rangle$ follows from the virial theorem for the oscillator, $\\langle T\\rangle = \\langle V\\rangle = E_0/2$.',
    ],
    solution: [
      {
        title: 'Normalisation',
        detail: '$1 = A^2\\int_{-\\infty}^{+\\infty} e^{-\\alpha x^2}dx = A^2\\sqrt{\\pi/\\alpha}$, so $A = \\left(\\dfrac{\\alpha}{\\pi}\\right)^{1/4} = \\left(\\dfrac{m\\omega}{\\pi\\hbar}\\right)^{1/4}$.',
      },
      {
        title: 'Substituting into the stationary Schrödinger equation',
        detail: 'Since $\\psi_0^{\\prime\\prime} = (\\alpha^2x^2 - \\alpha)\\psi_0$, the left-hand side is $-\\dfrac{\\hbar^2}{2m}(\\alpha^2x^2 - \\alpha)\\psi_0 + \\dfrac{1}{2}m\\omega^2x^2\\psi_0$. The coefficient of $x^2$ is $-\\dfrac{\\hbar^2\\alpha^2}{2m} + \\dfrac{m\\omega^2}{2}$, which vanishes upon inserting $\\alpha = m\\omega/\\hbar$; the constant term is $\\dfrac{\\hbar^2\\alpha}{2m} = \\dfrac{\\hbar\\omega}{2}$. Hence $\\psi_0$ is an eigenstate with $E_0 = \\dfrac{1}{2}\\hbar\\omega$.',
      },
      {
        title: 'Uncertainty product',
        detail: '$|\\psi_0|^2 \\propto e^{-\\alpha x^2}$ is an even Gaussian: $\\langle x\\rangle = 0$, $\\langle x^2\\rangle = \\dfrac{1}{2\\alpha} = \\dfrac{\\hbar}{2m\\omega}$, so $\\Delta x = \\sqrt{\\hbar/(2m\\omega)}$. From the virial theorem $\\langle T\\rangle = \\langle V\\rangle = E_0/2$ we get $\\langle p^2\\rangle/2m = \\hbar\\omega/4$, so $\\Delta p = \\sqrt{m\\hbar\\omega/2}$. Thus $\\Delta x\\,\\Delta p = \\sqrt{\\dfrac{\\hbar}{2m\\omega}}\\cdot\\sqrt{\\dfrac{m\\hbar\\omega}{2}} = \\dfrac{\\hbar}{2}$: the inequality is saturated, so this is a minimum-uncertainty state.',
      },
      {
        title: 'Physics of the zero-point energy',
        detail: 'If $E_0 = 0$, the particle would sit at rest at $x = 0$, requiring $\\Delta x = \\Delta p = 0$ and violating the uncertainty relation. The zero-point energy $\\dfrac{1}{2}\\hbar\\omega$ is precisely the quantum effect that "tighter confinement means larger fluctuations" (for instance, liquid helium does not solidify at low temperature).',
      },
    ],
    answer: '$A = (m\\omega/\\pi\\hbar)^{1/4}$; $E_0 = \\hbar\\omega/2$; $\\Delta x\\,\\Delta p = \\hbar/2$ (minimum-uncertainty state)',
    tags: ['Harmonic oscillator', 'Zero-point energy', 'Uncertainty relation'],
  },
  'quantum-mechanics-p3': {
    title: 'Solving the oscillator spectrum with ladder-operator algebra',
    question:
      'Define the operator $a = \\sqrt{\\dfrac{m\\omega}{2\\hbar}}\\,x + \\dfrac{i}{\\sqrt{2m\\hbar\\omega}}\\,p$ and its Hermitian conjugate $a^{\\dagger}$. (1) Using $[x, p] = i\\hbar$, prove that $[a, a^{\\dagger}] = 1$; (2) prove that the Hamiltonian can be written $H = \\hbar\\omega\\left(a^{\\dagger}a + \\dfrac{1}{2}\\right)$; (3) let $N = a^{\\dagger}a$ (the number operator) and prove that its eigenvalues $n$ can only be non-negative integers, whence $E_n = \\hbar\\omega\\left(n + \\dfrac{1}{2}\\right)$.',
    hints: [
      'Treat $a$, $a^{\\dagger}$ as linear combinations of $x$, $p$ and expand $[a, a^{\\dagger}]$ term by term; note that $x$ and $p$ commute with themselves.',
      '$[H, a] = -\\hbar\\omega\\, a$ shows that $a|\\psi\\rangle$ is still an energy eigenstate with energy lowered by $\\hbar\\omega$; $a^{\\dagger}$ raises it.',
      '$\\langle\\psi|N|\\psi\\rangle = \\|a|\\psi\\rangle\\|^2 \\ge 0$ forces the eigenvalues to be non-negative; the lowering chain must terminate at $a|0\\rangle = 0$, and the raising chain from $a^{\\dagger}$ generates all non-negative integers.',
    ],
    solution: [
      {
        title: 'Computing the commutator',
        detail: 'Write $a = \\beta x + i\\gamma p$, $a^{\\dagger} = \\beta x - i\\gamma p$ with $\\beta = \\sqrt{m\\omega/2\\hbar}$, $\\gamma = 1/\\sqrt{2m\\hbar\\omega}$. Expanding: $[a, a^{\\dagger}] = -i\\beta\\gamma[x, p] + i\\gamma\\beta[p, x] = -i\\beta\\gamma(i\\hbar) + i\\gamma\\beta(-i\\hbar) = 2\\beta\\gamma\\hbar$. Inserting $\\beta\\gamma = \\sqrt{\\dfrac{m\\omega}{2\\hbar}\\cdot\\dfrac{1}{2m\\hbar\\omega}} = \\dfrac{1}{2\\hbar}$ gives $[a, a^{\\dagger}] = 1$.',
      },
      {
        title: 'Rewriting the Hamiltonian',
        detail: '$aa^{\\dagger} = (\\beta x + i\\gamma p)(\\beta x - i\\gamma p) = \\beta^2x^2 + \\gamma^2p^2 + i\\gamma\\beta[p, x] = \\dfrac{p^2}{2m\\hbar\\omega} + \\dfrac{m\\omega x^2}{2\\hbar} + \\dfrac{1}{2} = \\dfrac{H}{\\hbar\\omega} + \\dfrac{1}{2}$. From $a^{\\dagger}a = aa^{\\dagger} - 1$ we get $\\dfrac{H}{\\hbar\\omega} = a^{\\dagger}a + \\dfrac{1}{2}$, i.e. $H = \\hbar\\omega\\left(N + \\dfrac{1}{2}\\right)$.',
      },
      {
        title: 'Deriving the spectrum',
        detail: 'From $[H, a] = -\\hbar\\omega\\, a$ and $[H, a^{\\dagger}] = \\hbar\\omega\\, a^{\\dagger}$: if $N|n\\rangle = n|n\\rangle$, then $N(a|n\\rangle) = (n - 1)(a|n\\rangle)$ and $N(a^{\\dagger}|n\\rangle) = (n + 1)(a^{\\dagger}|n\\rangle)$. Also $\\langle\\psi|N|\\psi\\rangle = \\|a|\\psi\\rangle\\|^2 \\ge 0$ forces $n \\ge 0$, so the lowering chain must terminate: there is a $|0\\rangle$ with $a|0\\rangle = 0$ and $n = 0$; the raising chain generated by repeated action of $a^{\\dagger}$ gives $n = 0, 1, 2, \\ldots$. Hence $E_n = \\hbar\\omega\\left(n + \\dfrac{1}{2}\\right)$ with $n$ a non-negative integer.',
      },
    ],
    answer: '$[a, a^{\\dagger}] = 1$; $H = \\hbar\\omega(a^{\\dagger}a + \\frac{1}{2})$; $E_n = \\hbar\\omega(n + \\frac{1}{2})$, $n = 0, 1, 2, \\ldots$',
    tags: ['Ladder operators', 'Algebraic method', 'Commutation relations'],
  },
  'quantum-mechanics-p4': {
    title: 'The l = 1 angular-momentum state and measuring Lx',
    question:
      'A particle with orbital angular-momentum quantum number $l = 1$ is in the joint eigenstate $|1, 0\\rangle$ of $\\hat{L}^2$ and $\\hat{L}_z$ (eigenvalue of $\\hat{L}_z$ equal to 0). Given the ladder-operator rule $\\hat{L}_{\\pm}|l, m\\rangle = \\hbar\\sqrt{(l \\mp m)(l \\pm m + 1)}\\, |l, m \\pm 1\\rangle$ and $\\hat{L}_x = \\dfrac{1}{2}(\\hat{L}_+ + \\hat{L}_-)$. (1) Write the matrix of $\\hat{L}_x$ in the basis $\\{|1,1\\rangle, |1,0\\rangle, |1,-1\\rangle\\}$; (2) find the eigenvalues and normalised eigenstates of $\\hat{L}_x$; (3) for a system in $|1, 0\\rangle$, what are the possible outcomes of measuring $\\hat{L}_x$ and their probabilities? What are $\\langle \\hat{L}_x \\rangle$ and $\\langle \\hat{L}_x^2 \\rangle$?',
    hints: [
      'The matrix element $\\langle 1, m^{\\prime}|\\hat{L}_x|1, m\\rangle$ is non-zero only for $m^{\\prime} = m \\pm 1$; compute them one by one with the ladder formula.',
      '$\\hat{L}_x$ and $\\hat{L}_z$ are on an equal footing, so its eigenvalues should be isomorphic to $m\\hbar$: $\\hbar, 0, -\\hbar$.',
      'The measurement probability is the squared modulus of the expansion coefficient of the initial state in the $\\hat{L}_x$ eigenstates.',
    ],
    solution: [
      {
        title: 'Writing the Lx matrix',
        detail: 'From the ladder formula: $\\hat{L}_+|1,0\\rangle = \\hbar\\sqrt{2}\\,|1,1\\rangle$, $\\hat{L}_-|1,1\\rangle = \\hbar\\sqrt{2}\\,|1,0\\rangle$, $\\hat{L}_+|1,-1\\rangle = \\hbar\\sqrt{2}\\,|1,0\\rangle$, $\\hat{L}_-|1,0\\rangle = \\hbar\\sqrt{2}\\,|1,-1\\rangle$. Taking $\\hat{L}_x = (\\hat{L}_+ + \\hat{L}_-)/2$ gives $\\hat{L}_x = \\dfrac{\\hbar}{\\sqrt{2}}\\begin{pmatrix} 0 & 1 & 0\\\\ 1 & 0 & 1\\\\ 0 & 1 & 0 \\end{pmatrix}$ (basis ordered as $|1,1\\rangle, |1,0\\rangle, |1,-1\\rangle$).',
      },
      {
        title: 'Eigenvalues and eigenstates',
        detail: 'The dimensionless matrix $\\begin{pmatrix} 0 & 1 & 0\\\\ 1 & 0 & 1\\\\ 0 & 1 & 0 \\end{pmatrix}$ has eigenvalues $\\sqrt{2}, 0, -\\sqrt{2}$, so $\\hat{L}_x$ has eigenvalues $\\hbar, 0, -\\hbar$. Normalised eigenstates: eigenvalue $\\hbar$ corresponds to $\\dfrac{1}{2}|1,1\\rangle + \\dfrac{1}{\\sqrt{2}}|1,0\\rangle + \\dfrac{1}{2}|1,-1\\rangle$; eigenvalue $0$ to $\\dfrac{1}{\\sqrt{2}}\\left(|1,1\\rangle - |1,-1\\rangle\\right)$; eigenvalue $-\\hbar$ to $\\dfrac{1}{2}|1,1\\rangle - \\dfrac{1}{\\sqrt{2}}|1,0\\rangle + \\dfrac{1}{2}|1,-1\\rangle$.',
      },
      {
        title: 'Measurement probabilities and expectation values',
        detail: 'Expanding $|1,0\\rangle$ in the three $\\hat{L}_x$ eigenstates, the coefficients are $1/\\sqrt{2}$, $0$, $-1/\\sqrt{2}$, so the probability of obtaining $\\hbar$ is $1/2$, of obtaining $0$ is $0$, and of obtaining $-\\hbar$ is $1/2$. $\\langle\\hat{L}_x\\rangle = \\dfrac{1}{2}\\hbar - \\dfrac{1}{2}\\hbar = 0$; $\\langle\\hat{L}_x^2\\rangle = \\dfrac{1}{2}\\hbar^2 = \\dfrac{1}{2}\\left[l(l+1) - m^2\\right]\\hbar^2$ ($l = 1, m = 0$), consistent with the picture that "$\\hat{L}^2$ is shared equally between the two transverse components".',
      },
    ],
    answer: '$\\hat{L}_x = \\dfrac{\\hbar}{\\sqrt{2}}\\begin{pmatrix} 0 & 1 & 0\\\\ 1 & 0 & 1\\\\ 0 & 1 & 0 \\end{pmatrix}$; eigenvalues $\\hbar, 0, -\\hbar$; for $|1,0\\rangle$ the probability of measuring $\\pm\\hbar$ is $1/2$ each (probability of 0 is 0); $\\langle\\hat{L}_x\\rangle = 0$, $\\langle\\hat{L}_x^2\\rangle = \\hbar^2/2$',
    tags: ['Angular momentum', 'Ladder operators', 'Measurement probabilities'],
  },
  'quantum-mechanics-p5': {
    title: 'First-order energy shift of an infinite well under a λx² perturbation',
    question:
      'A particle moves in a one-dimensional infinite square well ($0 < x < a$) with unperturbed levels $E_n^{(0)} = \\dfrac{n^2\\pi^2\\hbar^2}{2ma^2}$ and wave functions $\\psi_n(x) = \\sqrt{2/a}\\,\\sin\\dfrac{n\\pi x}{a}$. A perturbation $H^{\\prime} = \\lambda x^2$ is now added ($\\lambda > 0$ small). (1) Write the first-order energy-correction formula and compute $\\langle x^2 \\rangle_n$; (2) find the first-order corrections to the ground state and the first excited state; (3) discuss: what value does the correction tend to as $n \\to \\infty$? Why is the correction for $n = 2$ larger than for $n = 1$?',
    hints: [
      '$E_n^{(1)} = \\langle\\psi_n|H^{\\prime}|\\psi_n\\rangle = \\dfrac{2\\lambda}{a}\\int_0^a x^2\\sin^2\\dfrac{n\\pi x}{a}\\, dx$.',
      'Use $\\sin^2\\theta = \\dfrac{1 - \\cos 2\\theta}{2}$ to split into two terms; one of them is $\\int_0^a x^2\\cos\\dfrac{2n\\pi x}{a}dx = \\dfrac{a^3}{2n^2\\pi^2}$ (integrate by parts twice).',
      'As $n \\to \\infty$ the wave function oscillates rapidly and the probability distribution tends to the classical uniform distribution $\\rho = 1/a$, corresponding to $\\langle x^2\\rangle \\to a^2/3$.',
    ],
    solution: [
      {
        title: 'First-order correction formula',
        detail: 'Non-degenerate stationary perturbation theory gives $E_n^{(1)} = \\langle n^{(0)}|H^{\\prime}|n^{(0)}\\rangle = \\dfrac{2\\lambda}{a}\\displaystyle\\int_0^a x^2\\sin^2\\dfrac{n\\pi x}{a}\\, dx$.',
      },
      {
        title: 'Evaluating the integral',
        detail: 'Using $\\sin^2\\dfrac{n\\pi x}{a} = \\dfrac{1}{2}\\left(1 - \\cos\\dfrac{2n\\pi x}{a}\\right)$: $\\int_0^a x^2 dx = a^3/3$; setting $k = 2n\\pi/a$ and integrating by parts twice gives $\\int_0^a x^2\\cos(kx)dx = \\left[\\dfrac{x^2\\sin kx}{k} + \\dfrac{2x\\cos kx}{k^2} - \\dfrac{2\\sin kx}{k^3}\\right]_0^a = \\dfrac{2a}{k^2} = \\dfrac{a^3}{2n^2\\pi^2}$ (since $\\sin 2n\\pi = 0$, $\\cos 2n\\pi = 1$). Hence $\\langle x^2\\rangle_n = \\dfrac{2}{a}\\cdot\\dfrac{1}{2}\\left(\\dfrac{a^3}{3} - \\dfrac{a^3}{2n^2\\pi^2}\\right) = a^2\\left(\\dfrac{1}{3} - \\dfrac{1}{2n^2\\pi^2}\\right)$.',
      },
      {
        title: 'Substitution and discussion',
        detail: '$E_1^{(1)} = \\lambda a^2\\left(\\dfrac{1}{3} - \\dfrac{1}{2\\pi^2}\\right) \\approx 0.283\\,\\lambda a^2$; $E_2^{(1)} = \\lambda a^2\\left(\\dfrac{1}{3} - \\dfrac{1}{8\\pi^2}\\right) \\approx 0.321\\,\\lambda a^2$. As $n \\to \\infty$, $\\langle x^2\\rangle_n \\to a^2/3$, exactly the classical uniform-distribution result (correspondence principle). The larger $n$, the more spread out the particle distribution and the closer it lies to the well walls, so $\\langle x^2\\rangle$ is larger; hence the correction for $n = 2$ exceeds that for $n = 1$.',
      },
    ],
    answer: '$\\langle x^2\\rangle_n = a^2\\left(\\dfrac{1}{3} - \\dfrac{1}{2n^2\\pi^2}\\right)$; $E_1^{(1)} \\approx 0.283\\,\\lambda a^2$, $E_2^{(1)} \\approx 0.321\\,\\lambda a^2$; the limit as $n \\to \\infty$ is $\\lambda a^2/3$',
    tags: ['Perturbation theory', 'Infinite square well', 'First-order correction'],
  },
  'quantum-mechanics-p6': {
    title: 'Constructing the states of two identical particles in an infinite well',
    question:
      'Two identical, non-interacting particles of mass $m$ are placed in a one-dimensional infinite square well of width $a$, with single-particle levels $E_n = n^2 E_1$ where $E_1 = \\dfrac{\\pi^2\\hbar^2}{2ma^2}$. (1) Give the ground-state energy and normalised wave function for a system of spin-0 bosons; (2) for two spin-$1/2$ fermions (spin $\\uparrow, \\downarrow$), find the ground-state energy, write the full wave function (including the spin part), and explain how the Pauli exclusion principle manifests itself; (3) find the energy and degeneracy of the first excited state of this fermion system.',
    hints: [
      'Wave functions of identical particles must be symmetric (bosons) or antisymmetric (fermions) under exchange: $\\psi_{\\pm} = \\dfrac{1}{\\sqrt{2}}\\left[\\psi_a(1)\\psi_b(2) \\pm \\psi_a(2)\\psi_b(1)\\right]$.',
      'The total fermion wave function (space × spin) must be antisymmetric: a symmetric spatial part pairs with the spin singlet, an antisymmetric one with the spin triplet.',
      'The first excited state corresponds to the two particles occupying $n = 1$ and $n = 2$; both symmetry combinations of space and spin must be counted.',
    ],
    solution: [
      {
        title: 'Boson ground state',
        detail: 'Total energy $E = (n_1^2 + n_2^2)E_1$. Spin-0 bosons require a symmetric spatial wave function: in the ground state both particles occupy $n = 1$, $E = 2E_1$, and the wave function is $\\Psi_0(x_1, x_2) = \\psi_1(x_1)\\psi_1(x_2) = \\dfrac{2}{a}\\sin\\dfrac{\\pi x_1}{a}\\sin\\dfrac{\\pi x_2}{a}$ (already symmetric, no further combination needed).',
      },
      {
        title: 'Fermion ground state',
        detail: 'Two fermions may both sit in $n = 1$, but the spin part must then be antisymmetric (singlet) $\\chi_{0,0} = \\dfrac{1}{\\sqrt{2}}\\left(\\uparrow_1\\downarrow_2 - \\downarrow_1\\uparrow_2\\right)$ with a symmetric spatial part. $E = 2E_1$, non-degenerate. The full wave function is $\\Psi = \\psi_1(x_1)\\psi_1(x_2)\\,\\chi_{0,0}$, which changes sign when all coordinates (position and spin) of the two particles are exchanged. If the two fermions had the same spin orientation (say both $\\uparrow$), the spatial part would be forced to be antisymmetric too, contradicting "both in $n=1$"—this is exactly the Pauli exclusion principle, "two fermions cannot occupy the same single-particle state".',
      },
      {
        title: 'First excited state and degeneracy',
        detail: 'The occupation is $(n_1, n_2) = (1, 2)$, $E = (1 + 4)E_1 = 5E_1$. Allowed combinations: the antisymmetric spatial part $\\psi_- = \\dfrac{1}{\\sqrt{2}}\\left[\\psi_1(1)\\psi_2(2) - \\psi_2(1)\\psi_1(2)\\right]$ with the symmetric spin triplet (3 states), and the symmetric spatial part $\\psi_+ = \\dfrac{1}{\\sqrt{2}}\\left[\\psi_1(1)\\psi_2(2) + \\psi_2(1)\\psi_1(2)\\right]$ with the spin singlet (1 state), giving $3 + 1 = 4$-fold degeneracy.',
      },
    ],
    answer: 'Boson ground state $E = 2E_1$; spin-1/2 fermion ground state $E = 2E_1$ (symmetric space × spin singlet, non-degenerate); first excited state $E = 5E_1$ with degeneracy 4',
    tags: ['Identical particles', 'Pauli exclusion', 'Symmetrisation'],
  },
};

export default map;
