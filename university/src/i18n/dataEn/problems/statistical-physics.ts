import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'statistical-physics-p1': {
    title: 'Number of microstates and entropy of a two-dimensional spin lattice',
    question:
      'On a two-dimensional square lattice, $N = 20$ distinguishable spin moments are fixed, each of which can only be up or down (this problem is purely about counting, not energy). (1) Write the expression for the number of microstates $\\Omega(n)$ of the macrostate "exactly $n$ spins up"; (2) compute $\\Omega$ for $n = 10$; (3) find the total number of microstates of the system; (4) when $N$ grows to $10^{23}$, use Stirling\'s formula $\\ln N! \\approx N\\ln N - N$ to estimate the entropy $S$ of the half-filled distribution ($n = N/2$) in units of $k$. Given $\\binom{20}{10} = 184756$.',
    hints: [
      'Distinguishable particles occupying two states: the number of microstates is the number of ways to choose $n$ of the $N$ particles, $\\Omega(n) = \\dfrac{N!}{n!(N-n)!}$.',
      'Each spin has 2 independent choices, so the total number of microstates is $2^N$; this equals $\\sum_n \\Omega(n)$ (a binomial identity).',
      'At half filling $\\ln\\Omega = \\ln N! - 2\\ln(N/2)!$; after inserting Stirling\'s formula all the linear terms cancel and only $N\\ln 2$ remains.',
    ],
    solution: [
      {
        title: 'Writing down the counting formula',
        detail: 'The particles are distinguishable and each has only up/down; the macrostate "exactly $n$ up" does not specify which particles are up, so its number of microstates is the binomial coefficient $\\Omega(n) = \\dfrac{N!}{n!\\,(N-n)!}$. This is precisely Boltzmann counting $\\Omega = \\dfrac{N!}{\\prod_l a_l!}\\prod_l \\omega_l^{a_l}$ specialised to $\\omega_l = 1$ with two "levels".',
      },
      {
        title: 'Computing $\\Omega$ for the half-filled distribution',
        detail: '$\\Omega(10) = \\dfrac{20!}{10!\\,10!} = \\binom{20}{10} = 184756$. The all-aligned distributions have $\\Omega(0) = \\Omega(20) = 1$, more than five orders of magnitude smaller: the microstates realising the "well-mixed" macrostate are overwhelmingly dominant.',
      },
      {
        title: 'Total number of microstates',
        detail: 'Each spin independently takes 2 states, so the total is $2^{20} = 1048576$. Check: $\\sum_{n=0}^{20} \\binom{20}{n} = 2^{20}$, consistent with the binomial identity. If the system is isolated (energy fixed at some value), the equal-a-priori-probability principle assigns equal probability only among the $\\Omega(n)$ microstates of that energy.',
      },
      {
        title: 'Entropy of the half-filled distribution for large $N$',
        detail: '$\\ln\\Omega = \\ln N! - 2\\ln\\left(\\dfrac{N}{2}\\right)! \\approx N\\ln N - N - 2\\left(\\dfrac{N}{2}\\ln\\dfrac{N}{2} - \\dfrac{N}{2}\\right) = N\\ln N - N\\ln\\dfrac{N}{2} = N\\ln 2$. Hence $S = k\\ln\\Omega \\approx Nk\\ln 2 \\approx 0.693\\,Nk$. For $N = 10^{23}$, $S \\approx 6.9\\times10^{22}\\,k$.',
      },
      {
        title: 'Physical discussion',
        detail: 'That the entropy is proportional to $N$ (extensivity) is exactly a consequence of taking the logarithm: the number of microstates grows exponentially as $2^N$ while the entropy grows only linearly. The half-filled distribution is the most probable one; the larger $N$, the smaller the relative fluctuation away from half filling, $\\sim 1/\\sqrt{N}$, so macroscopically the system "always" stays near half filling—this is the statistical interpretation of equilibrium.',
      },
    ],
    answer: '$\\Omega(n) = \\dfrac{N!}{n!(N-n)!}$; $\\Omega(10) = 184756$; total number of microstates $2^{20} = 1048576$; for large $N$ the half-filled distribution has $S \\approx Nk\\ln 2 \\approx 0.693\\,Nk$',
    tags: ['Number of microstates', 'Boltzmann entropy', 'Stirling formula', 'Equal a priori probability'],
  },
  'statistical-physics-p2': {
    title: 'Partition function, internal energy and free energy of a 1D oscillator',
    question:
      'A one-dimensional quantum harmonic oscillator has levels $\\varepsilon_n = \\left(n + \\dfrac{1}{2}\\right)\\hbar\\omega$ ($n = 0, 1, 2, \\dots$), all non-degenerate; the system is in equilibrium at temperature $T$, and $\\beta = 1/kT$. Find: (1) the single-particle partition function $Z$; (2) the internal energy $U$; (3) $U$ in the high-temperature limit ($kT \\gg \\hbar\\omega$), and its connection with the equipartition theorem; (4) the free energy $F$ and entropy $S$.',
    hints: [
      '$Z = \\sum_n e^{-\\beta(n+1/2)\\hbar\\omega}$ is a geometric series with ratio $e^{-\\beta\\hbar\\omega}$, giving $Z = \\dfrac{e^{-\\beta\\hbar\\omega/2}}{1 - e^{-\\beta\\hbar\\omega}} = \\dfrac{1}{2\\sinh(\\beta\\hbar\\omega/2)}$.',
      'The internal energy follows from $U = -\\dfrac{\\partial \\ln Z}{\\partial \\beta}$ with $\\ln Z = -\\ln\\left(2\\sinh\\dfrac{\\beta\\hbar\\omega}{2}\\right)$.',
      'For the high-temperature limit expand $e^{\\beta\\hbar\\omega} \\approx 1 + \\beta\\hbar\\omega$; free energy $F = -kT\\ln Z$ and entropy $S = \\dfrac{U - F}{T}$.',
    ],
    solution: [
      {
        title: 'Partition function from the geometric series',
        detail: '$Z = \\sum_{n=0}^{\\infty} e^{-\\beta(n+1/2)\\hbar\\omega} = e^{-\\beta\\hbar\\omega/2}\\sum_{n=0}^{\\infty}\\left(e^{-\\beta\\hbar\\omega}\\right)^n = \\dfrac{e^{-\\beta\\hbar\\omega/2}}{1 - e^{-\\beta\\hbar\\omega}} = \\dfrac{1}{2\\sinh\\left(\\dfrac{\\beta\\hbar\\omega}{2}\\right)}$.',
      },
      {
        title: 'Internal energy',
        detail: '$\\ln Z = -\\ln 2 - \\ln\\sinh\\left(\\dfrac{\\beta\\hbar\\omega}{2}\\right)$, and differentiating gives $U = -\\dfrac{\\partial\\ln Z}{\\partial\\beta} = \\dfrac{\\hbar\\omega}{2}\\coth\\left(\\dfrac{\\beta\\hbar\\omega}{2}\\right) = \\dfrac{\\hbar\\omega}{2} + \\dfrac{\\hbar\\omega}{e^{\\beta\\hbar\\omega} - 1}$. The first term is the zero-point energy, the second the thermal excitation energy.',
      },
      {
        title: 'High-temperature limit and equipartition',
        detail: 'For $kT \\gg \\hbar\\omega$, $e^{\\beta\\hbar\\omega} - 1 \\approx \\beta\\hbar\\omega$, so $U \\approx \\dfrac{\\hbar\\omega}{2} + kT \\approx kT$. A one-dimensional oscillator has two quadratic degrees of freedom (coordinate and momentum), and equipartition gives $U = 2 \\times \\dfrac{1}{2}kT = kT$—the same result: the classical limit is automatically contained in the partition function.',
      },
      {
        title: 'Free energy and entropy',
        detail: '$F = -kT\\ln Z = \\dfrac{\\hbar\\omega}{2} + kT\\ln\\left(1 - e^{-\\beta\\hbar\\omega}\\right)$. Entropy $S = \\dfrac{U - F}{T} = k\\left[\\dfrac{\\beta\\hbar\\omega}{e^{\\beta\\hbar\\omega} - 1} - \\ln\\left(1 - e^{-\\beta\\hbar\\omega}\\right)\\right]$. In the low-temperature limit $S \\to 0$ (the system freezes into the ground state), while at high temperature $S \\approx k\\left[1 + \\ln\\left(kT/\\hbar\\omega\\right)\\right]$ grows logarithmically with temperature.',
      },
    ],
    answer: '$Z = \\dfrac{e^{-\\beta\\hbar\\omega/2}}{1 - e^{-\\beta\\hbar\\omega}}$; $U = \\dfrac{\\hbar\\omega}{2} + \\dfrac{\\hbar\\omega}{e^{\\hbar\\omega/kT} - 1}$; at high temperature $U \\to kT$ (equipartition); $F = \\dfrac{\\hbar\\omega}{2} + kT\\ln\\left(1 - e^{-\\hbar\\omega/kT}\\right)$, $S = k\\left[\\dfrac{\\hbar\\omega/kT}{e^{\\hbar\\omega/kT} - 1} - \\ln\\left(1 - e^{-\\hbar\\omega/kT}\\right)\\right]$',
    tags: ['Partition function', 'Internal energy', 'Free energy', 'Equipartition theorem'],
  },
  'statistical-physics-p3': {
    title: 'Partition function, internal energy and entropy of a two-level system',
    question:
      '$N$ distinguishable independent particles are in a canonical ensemble at temperature $T$, each with only two non-degenerate levels: $\\varepsilon_0 = 0$ and $\\varepsilon_1 = \\Delta$. Find: (1) the system partition function $Z_N$; (2) the number of excited particles $N_1$ and the internal energy $U$; (3) $U$ and $N_1$ in the limits $T \\to 0$ and $T \\to \\infty$; (4) the entropy $S(T)$, and explain the physical meaning of $S \\to Nk\\ln 2$ as $T \\to \\infty$.',
    hints: [
      'For independent particles the partition function is a power of the single-particle one: $Z_N = z^N$ with $z = 1 + e^{-\\beta\\Delta}$.',
      'The occupation probability of the excited state is $p_1 = \\dfrac{e^{-\\beta\\Delta}}{1 + e^{-\\beta\\Delta}} = \\dfrac{1}{e^{\\beta\\Delta} + 1}$, so $N_1 = Np_1$ and $U = N_1\\Delta$.',
      'Free energy $F = -kT\\ln Z_N$; the entropy follows from $S = \\dfrac{U - F}{T}$ and can be checked with $S = -Nk\\left(p_0\\ln p_0 + p_1\\ln p_1\\right)$.',
    ],
    solution: [
      {
        title: 'System partition function',
        detail: 'The single-particle partition function is $z = e^{-\\beta\\cdot 0} + e^{-\\beta\\Delta} = 1 + e^{-\\beta\\Delta}$; for $N$ independent distinguishable particles $Z_N = z^N = \\left(1 + e^{-\\beta\\Delta}\\right)^N$.',
      },
      {
        title: 'Number of excited particles and internal energy',
        detail: 'The probability of being in the excited state is $p_1 = \\dfrac{e^{-\\beta\\Delta}}{1 + e^{-\\beta\\Delta}} = \\dfrac{1}{e^{\\beta\\Delta} + 1}$, so $N_1 = \\dfrac{N}{e^{\\Delta/kT} + 1}$ and the internal energy is $U = N_1\\Delta = \\dfrac{N\\Delta}{e^{\\Delta/kT} + 1}$. The same result follows directly from $U = -\\partial\\ln Z_N/\\partial\\beta$.',
      },
      {
        title: 'The two limits',
        detail: '$T \\to 0$ ($\\beta\\Delta \\to \\infty$): $N_1 \\to 0$ and $U \\to 0$; all particles sink into the ground state. $T \\to \\infty$ ($\\beta\\Delta \\to 0$): $N_1 \\to N/2$ and $U \\to N\\Delta/2$; the two levels are equally populated and the internal energy saturates at the average of the excitation energies—further heating cannot raise the internal energy because the excited fraction cannot exceed $1/2$.',
      },
      {
        title: 'Entropy and discussion',
        detail: '$F = -NkT\\ln\\left(1 + e^{-\\beta\\Delta}\\right)$, so $S = \\dfrac{U - F}{T} = Nk\\left[\\ln\\left(1 + e^{-\\beta\\Delta}\\right) + \\dfrac{\\beta\\Delta}{e^{\\beta\\Delta} + 1}\\right]$. As $T \\to 0$, $S \\to 0$ (third law); as $T \\to \\infty$, $S \\to Nk\\ln 2$. The latter is because each particle is then completely randomly distributed between the two levels, contributing $\\ln 2$ of "missing information" (1 bit)—the intuitive content of maximum entropy under equal probabilities. Incidentally: if pumping makes the excited population exceed $N/2$ (population inversion), the distribution corresponds to a negative-temperature state with $\\beta < 0$, "hotter" than any positive temperature.',
      },
    ],
    answer: '$Z_N = \\left(1 + e^{-\\Delta/kT}\\right)^N$; $N_1 = \\dfrac{N}{e^{\\Delta/kT} + 1}$, $U = \\dfrac{N\\Delta}{e^{\\Delta/kT} + 1}$; as $T \\to 0$: $U \\to 0$, $N_1 \\to 0$, as $T \\to \\infty$: $U \\to N\\Delta/2$, $N_1 \\to N/2$; $S = Nk\\left[\\ln\\left(1 + e^{-\\Delta/kT}\\right) + \\dfrac{\\Delta/kT}{e^{\\Delta/kT} + 1}\\right] \\to Nk\\ln 2$ (high temperature)',
    tags: ['Two-level system', 'Canonical ensemble', 'Partition function', 'Negative temperature'],
  },
  'statistical-physics-p4': {
    title: 'Grand partition function and particle-number fluctuations of a classical ideal gas',
    question:
      'A monatomic classical ideal gas is in contact with a large particle reservoir at temperature $T$ and chemical potential $\\mu$, i.e. in the grand canonical ensemble. Its $N$-particle canonical partition function is $Z_N = \\dfrac{1}{N!}\\left(\\dfrac{V}{\\lambda_T^3}\\right)^N$, where $\\lambda_T = h/\\sqrt{2\\pi mkT}$ is the thermal de Broglie wavelength and $z = e^{\\beta\\mu}$ the fugacity. (1) Find the grand partition function $\\Xi$; (2) prove that the mean particle number is $\\bar N = zV/\\lambda_T^3$ and invert it to obtain $\\mu = kT\\ln\\left(n\\lambda_T^3\\right)$ ($n = \\bar N/V$); (3) using the fluctuation formula $\\overline{(\\Delta N)^2} = kT\\left(\\dfrac{\\partial \\bar N}{\\partial \\mu}\\right)_{T,V}$, prove that $\\overline{(\\Delta N)^2} = \\bar N$ and compute the relative fluctuation for 1 mol of gas; (4) explain why the particle number may be regarded as strictly constant in macroscopic experiments.',
    hints: [
      '$\\Xi = \\sum_{N=0}^{\\infty} z^N Z_N = \\sum_N \\dfrac{1}{N!}\\left(\\dfrac{zV}{\\lambda_T^3}\\right)^N$ is the Taylor expansion of an exponential.',
      '$\\bar N = z\\,\\dfrac{\\partial \\ln \\Xi}{\\partial z}$, and $\\partial z/\\partial\\mu = \\beta z$.',
      'The relative fluctuation is $\\sqrt{\\overline{(\\Delta N)^2}}\\,/\\bar N$; $N_A \\approx 6.02 \\times 10^{23}$ and $\\sqrt{6.02 \\times 10^{23}} \\approx 7.8 \\times 10^{11}$.',
    ],
    solution: [
      {
        title: 'Grand partition function',
        detail: '$\\Xi = \\sum_{N=0}^{\\infty} z^N Z_N = \\sum_{N=0}^{\\infty} \\dfrac{1}{N!}\\left(\\dfrac{zV}{\\lambda_T^3}\\right)^N = \\exp\\left(\\dfrac{zV}{\\lambda_T^3}\\right)$, so $\\ln\\Xi = \\dfrac{zV}{\\lambda_T^3}$. The exponential arises from the interplay of the $1/N!$ factor with the sum over $N$.',
      },
      {
        title: 'Mean particle number and chemical potential',
        detail: '$\\bar N = z\\,\\dfrac{\\partial\\ln\\Xi}{\\partial z} = z \\cdot \\dfrac{V}{\\lambda_T^3} = \\dfrac{zV}{\\lambda_T^3}$. Inverting gives $z = \\bar N\\lambda_T^3/V = n\\lambda_T^3$, and from $z = e^{\\beta\\mu}$ we get $\\mu = kT\\ln\\left(n\\lambda_T^3\\right)$. For a classical gas $n\\lambda_T^3 \\ll 1$, so $\\mu$ is large and negative, as expected.',
      },
      {
        title: 'Particle-number fluctuations',
        detail: 'First the derivative: $\\left(\\dfrac{\\partial\\bar N}{\\partial\\mu}\\right)_{T,V} = \\dfrac{V}{\\lambda_T^3}\\dfrac{\\partial z}{\\partial\\mu} = \\dfrac{V}{\\lambda_T^3}\\cdot\\beta z = \\dfrac{\\bar N}{kT}$. Inserting into the fluctuation formula gives $\\overline{(\\Delta N)^2} = kT \\cdot \\dfrac{\\bar N}{kT} = \\bar N$, i.e. Poisson-type number fluctuations. For 1 mol of gas: $\\sqrt{\\overline{(\\Delta N)^2}} = \\sqrt{6.02\\times10^{23}} \\approx 7.8\\times10^{11}$, a relative fluctuation of $\\approx 1.3\\times10^{-12}$.',
      },
      {
        title: 'Physical discussion',
        detail: 'The relative fluctuation $1/\\sqrt{\\bar N}$ comes from the random independent entry and exit of molecules (central limit theorem). For any macroscopic system this ratio is far too small to observe (of order $10^{-12}$), so the grand canonical and canonical ensembles give identical results in the thermodynamic limit; only mesoscopic systems (quantum dots, nanopores) or the vicinity of a critical point (where correlations amplify fluctuations) require the fluctuations to be taken seriously.',
      },
    ],
    answer: '$\\Xi = \\exp\\left(zV/\\lambda_T^3\\right)$; $\\bar N = zV/\\lambda_T^3$, $\\mu = kT\\ln(n\\lambda_T^3)$; $\\overline{(\\Delta N)^2} = \\bar N$, and the relative fluctuation for 1 mol of gas is $\\approx 1.3\\times10^{-12}$',
    tags: ['Grand canonical ensemble', 'Grand partition function', 'Particle-number fluctuations', 'Chemical potential'],
  },
  'statistical-physics-p5': {
    title: 'Deriving Stefan–Boltzmann from Planck\'s law and estimating the solar surface temperature',
    question:
      'The energy spectral density of black-body radiation (per unit volume and unit angular frequency) is given by Planck\'s law $u(\\omega, T)\\,d\\omega = \\dfrac{\\hbar\\omega^3}{\\pi^2 c^3} \\cdot \\dfrac{d\\omega}{e^{\\hbar\\omega/kT} - 1}$. Given $\\displaystyle\\int_0^{\\infty} \\dfrac{x^3\\,dx}{e^x - 1} = \\dfrac{\\pi^4}{15}$ and the constants $k = 1.381\\times10^{-23}\\ \\text{J/K}$, $h = 6.626\\times10^{-34}\\ \\text{J}\\cdot\\text{ s}$, $c = 3.00\\times10^8\\ \\text{m/s}$. (1) Integrate to prove that the total energy density is $u(T) = aT^4$ and give $a = \\pi^2 k^4/(15\\hbar^3 c^3)$; (2) using the relation between the surface exitance of a black body and the energy density, $M = \\dfrac{1}{4}cu$, derive the Stefan–Boltzmann law $M = \\sigma T^4$ and prove $\\sigma = \\dfrac{2\\pi^5 k^4}{15 h^3 c^2}$; (3) substitute numbers to compute $\\sigma$ and compare with the measured value $5.67\\times10^{-8}\\ \\text{W/(m}^2\\text{K}^4)$; (4) given that the solar surface exitance is about $6.3\\times10^7\\ \\text{W/m}^2$, estimate the solar surface temperature.',
    hints: [
      'Substitute $x = \\hbar\\omega/kT$; then $\\omega^3 d\\omega = (kT)^4 x^3 dx/\\hbar^4$ and the temperature factor comes outside the integral.',
      'The factor $c/4$ in $M = cu/4$: isotropic radiation streams out at the speed of light, and multiplying by the cosine projection over solid angle averages to $1/4$ for a half space; substituting $\\hbar = h/2\\pi$ into $\\sigma = ca/4$ yields $2\\pi^5 k^4/(15h^3c^2)$.',
      'For the numbers note $k^4 \\approx 3.64\\times10^{-92}$ and $h^3 \\approx 2.91\\times10^{-100}$; for part (4) simply invert $T = (M/\\sigma)^{1/4}$.',
    ],
    solution: [
      {
        title: 'Integrating to find the total energy density',
        detail: 'Substituting $x = \\hbar\\omega/kT$: $u(T) = \\dfrac{\\hbar}{\\pi^2c^3}\\displaystyle\\int_0^{\\infty} \\dfrac{\\omega^3\\,d\\omega}{e^{\\hbar\\omega/kT}-1} = \\dfrac{(kT)^4}{\\pi^2\\hbar^3c^3}\\displaystyle\\int_0^{\\infty}\\dfrac{x^3\\,dx}{e^x - 1} = \\dfrac{\\pi^2 k^4}{15\\hbar^3c^3}\\,T^4 \\equiv aT^4$. The fourth-power law follows from the three-dimensional massless mode density ($\\omega^2$) together with the Bose occupation.',
      },
      {
        title: 'Deriving the Stefan–Boltzmann law',
        detail: '$M = \\dfrac{c}{4}u = \\dfrac{c}{4}\\cdot\\dfrac{\\pi^2k^4}{15\\hbar^3c^3}T^4$. Substituting $\\hbar = h/2\\pi$ gives $a = \\dfrac{8\\pi^5k^4}{15h^3c^3}$, so $\\sigma = \\dfrac{ca}{4} = \\dfrac{2\\pi^5k^4}{15h^3c^2}$, i.e. $M = \\sigma T^4$.',
      },
      {
        title: 'Numerical check',
        detail: '$k^4 = (1.381\\times10^{-23})^4 \\approx 3.64\\times10^{-92}$; $h^3 = (6.626\\times10^{-34})^3 \\approx 2.91\\times10^{-100}$; $c^2 = 9.00\\times10^{16}$; $2\\pi^5 = 612$. The numerator is $= 612 \\times 3.64\\times10^{-92} \\approx 2.23\\times10^{-89}$; the denominator $= 15 \\times 2.91\\times10^{-100} \\times 9.00\\times10^{16} \\approx 3.93\\times10^{-82}$. Thus $\\sigma \\approx 5.67\\times10^{-8}\\ \\text{W/(m}^2\\text{K}^4)$, exactly the measured value—statistical mechanics derives from first principles a universal constant that can be measured with precision.',
      },
      {
        title: 'Estimating the solar surface temperature',
        detail: '$T = \\left(\\dfrac{M}{\\sigma}\\right)^{1/4} = \\left(\\dfrac{6.3\\times10^7}{5.67\\times10^{-8}}\\right)^{1/4} = \\left(1.11\\times10^{15}\\right)^{1/4}\\ \\text{K} \\approx 5.8\\times10^3\\ \\text{K}$. This agrees with the colour temperature of the solar spectrum (about $5770\\ \\text{K}$), showing that the solar surface radiates approximately as a black body. The same formula inverted can also estimate the radiative equilibrium temperature of the Earth.',
      },
    ],
    answer: '$a = \\pi^2k^4/(15\\hbar^3c^3)$, $u = aT^4$; $\\sigma = 2\\pi^5k^4/(15h^3c^2) \\approx 5.67\\times10^{-8}\\ \\text{W/(m}^2\\text{K}^4)$, in agreement with measurement; solar surface temperature $T \\approx 5.8\\times10^3\\ \\text{K}$',
    tags: ['Black-body radiation', 'Planck\'s law', 'Stefan–Boltzmann law', 'Photon gas'],
  },
  'statistical-physics-p6': {
    title: 'Fermi energy, Fermi temperature and electronic heat capacity of copper',
    question:
      'Copper is a monovalent metal with density $\\rho = 8.96\\times10^3\\ \\text{kg/m}^3$ and molar mass $M = 63.5\\times10^{-3}\\ \\text{kg/mol}$, each atom contributing one conduction electron. Constants: $N_A = 6.02\\times10^{23}\\ \\text{mol}^{-1}$, $m_e = 9.11\\times10^{-31}\\ \\text{kg}$, $\\hbar = 1.055\\times10^{-34}\\ \\text{J}\\cdot\\text{ s}$, $k = 1.381\\times10^{-23}\\ \\text{J/K}$, $1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}$. (1) Find the conduction-electron number density $n$; (2) find the Fermi energy at $T = 0$, $E_F = \\dfrac{\\hbar^2}{2m_e}(3\\pi^2 n)^{2/3}$ (in both J and eV) and the Fermi temperature $T_F$; (3) find the Fermi-surface electron speed $v_F = \\hbar(3\\pi^2 n)^{1/3}/m_e$; (4) at room temperature $T = 300\\ \\text{K}$, use $C_V^{(e)} = \\dfrac{\\pi^2}{2}Nk\\,\\dfrac{T}{T_F}$ to estimate the ratio of the electronic heat capacity to the lattice heat capacity $3Nk$ (Dulong–Petit law), and explain why at ordinary temperatures the electronic contribution to the heat capacity is practically negligible.',
    hints: [
      'Number density $n = \\rho N_A / M$ (one electron per atom for a monovalent metal); first compute $3\\pi^2 n$ and then take the $2/3$ power, with $\\hbar^2/2m_e \\approx 6.11\\times10^{-39}\\ \\text{J}\\cdot\\text{ m}^2$.',
      'Fermi temperature $T_F = E_F/k$; the Fermi velocity can also be checked with $v_F = \\sqrt{2E_F/m_e}$, which agrees with $\\hbar(3\\pi^2 n)^{1/3}/m_e$.',
      'The ratio is $\\dfrac{C_V^{(e)}}{3Nk} = \\dfrac{\\pi^2}{6}\\cdot\\dfrac{T}{T_F}$ (monovalent, $N$ the number of electrons).',
    ],
    solution: [
      {
        title: 'Electron number density',
        detail: '$n = \\dfrac{\\rho N_A}{M} = \\dfrac{8.96\\times10^3 \\times 6.02\\times10^{23}}{63.5\\times10^{-3}} \\approx \\dfrac{5.39\\times10^{27}}{0.0635} \\approx 8.5\\times10^{28}\\ \\text{m}^{-3}$.',
      },
      {
        title: 'Fermi energy and Fermi temperature',
        detail: '$3\\pi^2 n = 3 \\times 9.87 \\times 8.5\\times10^{28} \\approx 2.52\\times10^{30}\\ \\text{m}^{-3}$, whose $2/3$ power is $\\left(2.52\\times10^{30}\\right)^{2/3} \\approx 1.85\\times10^{20}\\ \\text{m}^{-2}$. $E_F = \\dfrac{\\hbar^2}{2m_e}\\times1.85\\times10^{20} = 6.11\\times10^{-39} \\times 1.85\\times10^{20} \\approx 1.13\\times10^{-18}\\ \\text{J} \\approx 7.0\\ \\text{eV}$. Fermi temperature $T_F = E_F/k = \\dfrac{1.13\\times10^{-18}}{1.381\\times10^{-23}} \\approx 8.2\\times10^4\\ \\text{K}$, far above room temperature: the electron gas in copper is strongly degenerate.',
      },
      {
        title: 'Fermi velocity',
        detail: '$v_F = \\dfrac{\\hbar(3\\pi^2n)^{1/3}}{m_e} = \\dfrac{1.055\\times10^{-34} \\times 1.36\\times10^{10}}{9.11\\times10^{-31}} \\approx 1.6\\times10^6\\ \\text{m/s}$ (also verifiable from $v_F = \\sqrt{2E_F/m_e}$). Even at zero temperature the electrons move at about a thousandth of the speed of light; this kinetic energy comes from the Pauli principle—it is quantum ground-state kinetic energy, not thermal motion.',
      },
      {
        title: 'Electronic heat-capacity fraction and discussion',
        detail: 'The ratio is $\\dfrac{C_V^{(e)}}{C_V^{(lattice)}} = \\dfrac{(\\pi^2/2)Nk\\,(T/T_F)}{3Nk} = \\dfrac{\\pi^2}{6}\\cdot\\dfrac{T}{T_F} = \\dfrac{4.93}{6}\\times\\dfrac{300}{8.2\\times10^4} \\approx 3.0\\times10^{-3}$, i.e. about $0.3\\%$ (with the precise coefficient near the Fermi surface this agrees with the experimental $0.5\\%$–$1\\%$). The reason: by the Pauli principle, electrons with energy below $E_F - kT$ have no empty states to move into and cannot absorb thermal energy; only the $\\sim kT/E_F \\approx 0.4\\%$ of electrons near the Fermi surface take part in thermal excitation, so the electronic heat capacity is about two orders of magnitude below the classical prediction $\\frac{3}{2}Nk$, and at room temperature lattice vibrations ($3Nk$) completely dominate.',
      },
    ],
    answer: '$n \\approx 8.5\\times10^{28}\\ \\text{m}^{-3}$; $E_F \\approx 1.13\\times10^{-18}\\ \\text{J} \\approx 7.0\\ \\text{eV}$, $T_F \\approx 8.2\\times10^4\\ \\text{K}$; $v_F \\approx 1.6\\times10^6\\ \\text{m/s}$; at room temperature $C_V^{(e)}/3Nk \\approx 3\\times10^{-3}$ because only a fraction $\\sim kT/E_F$ of electrons participate, so the electronic heat capacity is negligible',
    tags: ['Fermi energy', 'Fermi temperature', 'Electronic heat capacity', 'Free electron gas'],
  },
};

export default map;
