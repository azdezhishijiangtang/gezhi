import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'solid-state-physics-p1': {
    title: 'Atoms per cell, coordination number and packing fraction of the fcc structure',
    question:
      'A copper crystal has the face-centred cubic (fcc) structure with lattice constant $a = 0.361\\ \\text{nm}$. Find: (1) the number of atoms per unit cell $n$ and the coordination number; (2) the relation between the hard-sphere radius $r$ and $a$, and the numerical value of $r$; (3) the packing fraction $\\eta$ of the fcc structure (ratio of atomic volume to cell volume).',
    hints: [
      'In an fcc cell the atoms sit at the 8 corners and 6 face centres; corner atoms are shared by 8 cells and face-centred atoms by 2.',
      'In fcc the nearest neighbours lie along the face diagonal, and exactly 4 atomic radii fit along the face diagonal of length $\\sqrt{2}a$.',
      'Packing fraction $\\eta = n \\times \\dfrac{4}{3}\\pi r^3 / a^3$; express $r$ in terms of $a$ and simplify.',
    ],
    solution: [
      {
        title: 'Atoms per cell and coordination number',
        detail: 'Corners contribute $8 \\times \\dfrac{1}{8} = 1$ and face centres $6 \\times \\dfrac{1}{2} = 3$, giving\\n$$n = 1 + 3 = 4$$\\nEach atom touches 12 nearest neighbours (4 in the same plane plus 8 in adjacent planes), so the coordination number is 12—the hallmark of cubic close packing.',
      },
      {
        title: 'Atomic radius',
        detail: 'Nearest neighbours along the face diagonal: $\\sqrt{2}a = 4r$, hence\\n$$r = \\frac{\\sqrt{2}}{4}a = \\frac{1.414 \\times 0.361}{4}\\ \\text{nm} \\approx 0.128\\ \\text{nm}$$',
      },
      {
        title: 'Packing fraction',
        detail: '$$\\eta = \\frac{n \\cdot \\frac{4}{3}\\pi r^3}{a^3} = \\frac{4 \\times \\frac{4}{3}\\pi \\left(\\frac{\\sqrt{2}}{4}a\\right)^3}{a^3} = \\frac{16\\pi}{3} \\cdot \\frac{2\\sqrt{2}}{64} = \\frac{\\sqrt{2}\\,\\pi}{6} \\approx 0.74$$\\nthat is, 74% of space is filled by atoms—the theoretical limit for hard-sphere packing (hcp also gives 0.74).',
      },
    ],
    answer: '$n = 4$ with coordination number 12; $r = \\sqrt{2}a/4 \\approx 0.128\\ \\text{nm}$; packing fraction $\\eta = \\sqrt{2}\\pi/6 \\approx 0.74$.',
    tags: ['Crystal structure', 'Face-centred cubic', 'Packing fraction'],
  },
  'solid-state-physics-p2': {
    title: 'Bragg diffraction angles of a cubic crystal and structure identification',
    question:
      'A cubic crystal ($a = 0.361\\ \\text{nm}$) is irradiated with Cu $K_\\alpha$ radiation of wavelength $\\lambda = 0.1542\\ \\text{nm}$. Find: (1) the first- and second-order Bragg angles $\\theta_1$, $\\theta_2$ for the $(110)$ planes; (2) if the $(100)$, $(110)$, $(210)$ peaks are all absent while $(111)$, $(200)$, $(220)$ appear, decide whether the crystal is bcc or fcc and justify the answer.',
    hints: [
      'For a cubic system the interplanar spacing is $d_{hkl} = a/\\sqrt{h^2+k^2+l^2}$; first find $d_{110}$.',
      'Bragg\'s law $2d\\sin\\theta = n\\lambda$; second order means $n = 2$.',
      'For bcc the extinction condition is $h+k+l$ odd; for fcc it is mixed parity of $h,k,l$; verify with the structure factor $F = \\sum_j f_j e^{2\\pi i(hx_j+ky_j+lz_j)}$.',
    ],
    solution: [
      {
        title: 'Spacing of the (110) planes',
        detail: '$$d_{110} = \\frac{a}{\\sqrt{1^2 + 1^2}} = \\frac{0.361}{\\sqrt{2}} \\approx 0.2553\\ \\text{nm}$$',
      },
      {
        title: 'First- and second-order angles',
        detail: 'First order ($n = 1$):\\n$$\\sin\\theta_1 = \\frac{\\lambda}{2d} = \\frac{0.1542}{2 \\times 0.2553} \\approx 0.302 \\quad\\Rightarrow\\quad \\theta_1 \\approx 17.6^\\circ$$\\nSecond order ($n = 2$):\\n$$\\sin\\theta_2 = \\frac{2\\lambda}{2d} = 0.604 \\quad\\Rightarrow\\quad \\theta_2 \\approx 37.2^\\circ$$',
      },
      {
        title: 'Identifying the structure from the extinction rules',
        detail: 'The missing peaks $(100),(110),(210)$: do they all have $h+k+l$ even, or mixed parity? Checking one by one: $1+0+0=1$ (odd), $1+1+0=2$ (even), $2+1+0=3$ (odd)—the missing peaks include both parities. The observed peaks $(111),(200),(220)$ have $h,k,l$ all odd or all even. This is exactly the fcc diffraction rule: $F = f[1 + e^{\\pi i(h+k)} + e^{\\pi i(h+l)} + e^{\\pi i(k+l)}]$, when $h,k,l$ have mixed parity $F = 0$ and the reflection is extinguished; for bcc, on the other hand, $(110),(200),(220)$ with $h+k+l$ even should appear, contradicting the experiment. Hence the crystal is fcc ($a = 0.361\\ \\text{nm}$ is precisely the lattice constant of copper).',
      },
    ],
    answer: '$\\theta_1 \\approx 17.6^\\circ$, $\\theta_2 \\approx 37.2^\\circ$; all peaks of mixed parity vanish while the all-odd and all-even peaks appear—the characteristic extinction rule of the fcc structure.',
    tags: ['Bragg\'s law', 'Interplanar spacing', 'Structure factor'],
  },
  'solid-state-physics-p3': {
    title: 'Dispersion relation of a one-dimensional diatomic chain: acoustic and optical branches',
    question:
      'A one-dimensional chain consists of alternating atoms of mass $M$ and $m$ ($M > m$) with nearest-neighbour spacing $a$ (unit-cell length $2a$) and nearest-neighbour force constant $\\beta$. (1) Set up the equations of motion and derive the dispersion relation $\\omega^2_\\pm(k)$; (2) find the frequencies of the two branches as $k \\to 0$ and explain the physical meaning of the acoustic and optical branches; (3) find the two frequencies at the Brillouin-zone boundary $k = \\pi/2a$ and explain the existence of the frequency gap.',
    hints: [
      'Let the displacements of the two kinds of atom be $\\mu_n$ and $v_n$, write Newton\'s equations for each and substitute $\\mu_n = A e^{i(2nk a - \\omega t)}$, $v_n = B e^{i(2nk a - \\omega t)}$ (taking the atom of mass $M$ in the $n$-th cell as reference).',
      'This gives a homogeneous linear system for $A$, $B$; the condition for non-trivial solutions is that the coefficient determinant vanishes.',
      'Take the limits $k \\to 0$ and $k = \\pi/2a$ separately, noting the values of $\\cos(2ka)$ at those points.',
    ],
    solution: [
      {
        title: 'Equations of motion and the dispersion relation',
        detail: 'An atom of mass $M$ is pulled by the $m$ atoms on both sides:\\n$$M\\ddot{\\mu}_n = \\beta(v_n + v_{n-1} - 2\\mu_n)$$\\nAn atom of mass $m$:\\n$$m\\ddot{v}_n = \\beta(\\mu_n + \\mu_{n+1} - 2v_n)$$\\nSubstituting the trial solutions $\\mu_n = Ae^{i(2nka - \\omega t)}$, $v_n = Be^{i(2nka - \\omega t)}$:\\n$$(2\\beta - M\\omega^2)A - \\beta(1 + e^{-2ika})B = 0$$\\n$$-\\beta(1 + e^{2ika})A + (2\\beta - m\\omega^2)B = 0$$\\nNon-trivial solutions require the determinant to vanish:\\n$$(2\\beta - M\\omega^2)(2\\beta - m\\omega^2) - \\beta^2|1 + e^{2ika}|^2 = 0$$\\nUsing $|1 + e^{2ika}|^2 = 4\\cos^2 ka$ gives\\n$$\\omega^2_\\pm = \\frac{\\beta(M+m)}{Mm} \\pm \\frac{\\beta}{Mm}\\sqrt{M^2 + m^2 + 2Mm\\cos(2ka)}$$',
      },
      {
        title: 'Long-wavelength limit and the physics of the two branches',
        detail: 'As $k \\to 0$, $\\cos(2ka) \\to 1$ and the square root tends to $M + m$:\\n$$\\omega^2_- \\to 0\\ (\\text{acoustic branch}), \\qquad \\omega^2_+ \\to \\frac{2\\beta(M+m)}{Mm} = 2\\beta\\left(\\frac{1}{m} + \\frac{1}{M}\\right)\\ (\\text{optical branch})$$\\nOn the acoustic branch $A \\approx B$: the two atoms in a cell vibrate in phase, the cell centre of mass moves as a whole, and at long wavelengths this is just an elastic wave. On the optical branch $mA + MB = 0$: the two atoms vibrate in antiphase with the centre of mass at rest, producing an oscillating electric dipole in ionic crystals that can couple to infrared light—hence the name.',
      },
      {
        title: 'Zone boundary and the frequency gap',
        detail: 'At $k = \\pi/2a$, $\\cos(2ka) = \\cos\\pi = -1$ and the square root tends to $|M - m| = M - m$:\\n$$\\omega^2_+ = \\frac{\\beta[(M+m) + (M-m)]}{Mm} = \\frac{2\\beta}{m}, \\qquad \\omega^2_- = \\frac{\\beta[(M+m) - (M-m)]}{Mm} = \\frac{2\\beta}{M}$$\\nThe light atoms vibrating alone give the high-frequency optical branch and the heavy atoms alone the low-frequency acoustic branch. Between the two branches lies a frequency gap of width $\\sqrt{2\\beta/m} - \\sqrt{2\\beta/M} > 0$: within this band $\\omega^2$ has no real solution for $k$, so lattice waves cannot propagate and an incident wave is Bragg reflected—entirely analogous to the band gap for electrons.',
      },
    ],
    answer: '$\\omega^2_\\pm = \\dfrac{\\beta(M+m)}{Mm} \\pm \\dfrac{\\beta}{Mm}\\sqrt{M^2 + m^2 + 2Mm\\cos(2ka)}$; as $k \\to 0$ the acoustic branch $\\omega_- \\to 0$ (whole-cell in-phase motion) and the optical branch $\\omega_+ \\to \\sqrt{2\\beta(1/m + 1/M)}$ (antiphase motion); at the zone boundary $\\omega_+ = \\sqrt{2\\beta/m}$, $\\omega_- = \\sqrt{2\\beta/M}$, with a frequency gap between the branches.',
    tags: ['Lattice vibrations', 'Dispersion relation', 'Acoustic branch', 'Optical branch'],
  },
  'solid-state-physics-p4': {
    title: 'Fermi energy, Fermi velocity and electronic heat capacity of copper',
    question:
      'Treat the valence electrons of copper as a free electron gas. Given the density $\\rho = 8.96\\ \\text{g/cm}^3$, molar mass $M = 63.5\\ \\text{g/mol}$, one conduction electron per atom, $\\hbar^2/2m = 3.81\\ \\text{eV}\\cdot\\text{Å}^2$ and $k_B = 8.617\\times10^{-5}\\ \\text{eV/K}$. Find: (1) the electron number density $n$; (2) the Fermi wave vector $k_F$, Fermi energy $E_F$ and Fermi temperature $T_F$; (3) the Fermi velocity $v_F$; (4) explain why the electronic heat capacity at room temperature is far smaller than that of the lattice, and write the expression for $C_V$.',
    hints: [
      '$n = \\rho N_A / M$; remember to convert units to $\\text{m}^{-3}$.',
      '$k_F = (3\\pi^2 n)^{1/3}$, $E_F = \\hbar^2 k_F^2 / 2m$.',
      'The Pauli principle allows only electrons within about $k_BT$ of the Fermi surface to be thermally excited.',
    ],
    solution: [
      {
        title: 'Electron number density',
        detail: '$$n = \\frac{\\rho N_A}{M} = \\frac{8.96\\ \\text{g/cm}^3 \\times 6.022\\times10^{23}\\ \\text{mol}^{-1}}{63.5\\ \\text{g/mol}} \\approx 8.5\\times10^{22}\\ \\text{cm}^{-3} = 8.5\\times10^{28}\\ \\text{m}^{-3}$$',
      },
      {
        title: 'Fermi wave vector, Fermi energy and Fermi temperature',
        detail: '$$k_F = (3\\pi^2 n)^{1/3} = (3 \\times 9.87 \\times 8.5\\times10^{28})^{1/3} \\approx (2.52\\times10^{30})^{1/3} \\approx 1.36\\times10^{10}\\ \\text{m}^{-1}$$\\n$$E_F = \\frac{\\hbar^2 k_F^2}{2m} = 3.81\\ \\text{eV}\\cdot\\text{Å}^2 \\times (1.36\\times10^{10}\\ \\text{m}^{-1})^2 = 3.81 \\times 1.85\\ \\text{eV} \\approx 7.0\\ \\text{eV}$$\\n($k_F^2 = 1.85\\times10^{20}\\ \\text{m}^{-2} = 1.85\\ \\text{Å}^{-2}$.)\\n$$T_F = \\frac{E_F}{k_B} = \\frac{7.0}{8.617\\times10^{-5}} \\approx 8.1\\times10^4\\ \\text{K}$$',
      },
      {
        title: 'Fermi velocity',
        detail: '$$v_F = \\frac{\\hbar k_F}{m} = \\frac{1.055\\times10^{-34} \\times 1.36\\times10^{10}}{9.11\\times10^{-31}} \\approx 1.57\\times10^6\\ \\text{m/s}$$\\nabout 4.5 times the speed of sound, so the non-relativistic treatment is justified.',
      },
      {
        title: 'Electronic heat capacity',
        detail: 'At room temperature $T \\approx 300\\ \\text{K}$, $T/T_F \\approx 0.004$: the states around almost all electrons in the Fermi sea are already filled, and the Pauli principle prevents them from absorbing energies of order $k_BT$; only electrons in a thin shell near the Fermi surface (a fraction of about $T/T_F$) take part in thermal excitation. Therefore\\n$$C_V = \\frac{\\pi^2}{2}Nk_B\\frac{T}{T_F} = \\frac{\\pi^2 N k_B^2}{2E_F}\\,T \\equiv \\gamma T$$\\nAt room temperature the electronic heat capacity of copper is about $0.2\\ \\text{J/(mol·K)}$, less than one percent of the lattice value $3R \\approx 24.9\\ \\text{J/(mol·K)}$.',
      },
    ],
    answer: '$n \\approx 8.5\\times10^{28}\\ \\text{m}^{-3}$; $k_F \\approx 1.36\\times10^{10}\\ \\text{m}^{-1}$, $E_F \\approx 7.0\\ \\text{eV}$, $T_F \\approx 8.1\\times10^4\\ \\text{K}$; $v_F \\approx 1.57\\times10^6\\ \\text{m/s}$; $C_V = \\gamma T$ with $\\gamma = \\pi^2 Nk_B^2/2E_F$, which at room temperature is only about $T/T_F \\approx 0.4\\%$ of the classical value.',
    tags: ['Free electron gas', 'Fermi energy', 'Electronic heat capacity'],
  },
  'solid-state-physics-p5': {
    title: 'Hall coefficient and Hall voltage of n-type silicon',
    question:
      'An n-type silicon sample is doped with phosphorus at $N_d = 1.0\\times10^{21}\\ \\text{m}^{-3}$ (fully ionised at room temperature) and cut into a slab of thickness $d = 0.5\\ \\text{mm}$. A current $I = 10\\ \\text{mA}$ flows along $x$ and a magnetic field $B = 0.5\\ \\text{T}$ is applied perpendicular to the slab. Take $e = 1.602\\times10^{-19}\\ \\text{C}$. Find: (1) the Hall coefficient $R_H$ and its sign; (2) the magnitude of the Hall voltage $U_H$; (3) how $U_H$ changes for a p-type sample of the same concentration, and hence explain why the Hall effect identifies the carrier type.',
    hints: [
      'With full ionisation $n \\approx N_d$, and the Hall coefficient is $R_H = -1/(ne)$.',
      '$U_H = R_H I B / d$; convert everything to SI units.',
      'For a hole concentration $p \\approx N_a$, $R_H = +1/(pe)$—the opposite sign.',
    ],
    solution: [
      {
        title: 'Hall coefficient',
        detail: 'At room temperature the phosphorus donor level (about $0.045\\ \\text{eV}$) is fully ionised, $n \\approx N_d = 1.0\\times10^{21}\\ \\text{m}^{-3}$:\\n$$R_H = -\\frac{1}{ne} = -\\frac{1}{1.0\\times10^{21} \\times 1.602\\times10^{-19}} \\approx -6.24\\times10^{-3}\\ \\text{m}^3/\\text{C}$$\\nThe minus sign indicates that the carriers are electrons.',
      },
      {
        title: 'Hall voltage',
        detail: '$$U_H = \\frac{R_H I B}{d} = \\frac{6.24\\times10^{-3} \\times 10\\times10^{-3} \\times 0.5}{0.5\\times10^{-3}}\\ \\text{V} \\approx 6.2\\times10^{-2}\\ \\text{V} = 62\\ \\text{mV}$$\\n(taking the absolute value; the polarity is set by the carrier sign). Such a millivolt-level voltage is easy to measure with an ordinary voltmeter, which makes the experiment very convenient.',
      },
      {
        title: 'p-type sample and identifying the carrier type',
        detail: 'In a p-type sample $p \\approx N_a$ and $R_H = +1/(pe) \\approx +6.24\\times10^{-3}\\ \\text{m}^3/\\text{C}$: the Hall voltage has the same magnitude but the opposite polarity. Measuring the sign of $U_H$ therefore determines uniquely whether the majority carriers are electrons or holes; from $|U_H|$ the concentration follows as $n = IB/(eU_H d)$, and combined with a conductivity measurement the mobility $\\mu = |R_H|\\sigma$. A single measurement yields the carrier sign, concentration and mobility—which is why the Hall effect is a standard diagnostic for semiconductors.',
      },
    ],
    answer: '$R_H \\approx -6.24\\times10^{-3}\\ \\text{m}^3/\\text{C}$ (negative, electron conduction); $U_H \\approx 62\\ \\text{mV}$; for a p-type sample the voltage has the same magnitude but opposite polarity—its sign directly identifies the carrier type and its magnitude gives the concentration.',
    tags: ['Hall effect', 'Carrier concentration', 'n-type semiconductor'],
  },
  'solid-state-physics-p6': {
    title: 'Curie law of a paramagnetic salt and the Curie–Weiss correction',
    question:
      'A paramagnetic salt contains $N = 1.0\\times10^{28}$ ions per cubic metre with magnetic moment $\\mu = \\mu_B$ ($\\mu_B = 9.274\\times10^{-24}\\ \\text{J/T}$). Find: (1) the Curie constant $C$ and the susceptibility $\\chi$ at room temperature ($300\\ \\text{K}$); (2) $\\chi$ at $T = 4.2\\ \\text{K}$ and the magnetisation $M$ in a field $B = 1\\ \\text{T}$ (take $H \\approx B/\\mu_0$, $\\mu_0 = 4\\pi\\times10^{-7}\\ \\text{H/m}$, $k_B = 1.381\\times10^{-23}\\ \\text{J/K}$), and check whether the validity condition $\\mu B \\ll k_BT$ of the Curie law holds; (3) if the material becomes ferromagnetic below $T_C = 100\\ \\text{K}$, write the formula that replaces the Curie law for $T > T_C$ and explain how the exchange interaction relates to $T_C$.',
    hints: [
      'Curie law $\\chi = C/T$ with $C = \\mu_0 N\\mu^2/3k_B$.',
      '$M = \\chi H$ with $H = B/\\mu_0$; compare $\\mu B$ with $k_BT$ to see whether the moments are far from saturation.',
      'Curie–Weiss law $\\chi = C/(T - T_C)$, where $k_BT_C$ measures the exchange-interaction strength.',
    ],
    solution: [
      {
        title: 'Curie constant and room-temperature susceptibility',
        detail: '$$C = \\frac{\\mu_0 N\\mu^2}{3k_B} = \\frac{4\\pi\\times10^{-7} \\times 1.0\\times10^{28} \\times (9.274\\times10^{-24})^2}{3 \\times 1.381\\times10^{-23}}$$\\nThe numerator is $= 1.2566\\times10^{-6} \\times 8.60\\times10^{-47} = 1.081\\times10^{-52}$, hence\\n$$C \\approx \\frac{1.081\\times10^{-52}}{4.143\\times10^{-23}} \\approx 2.6\\times10^{-2}\\ \\text{K}$$\\n$$\\chi(300\\ \\text{K}) = \\frac{C}{T} = \\frac{0.026}{300} \\approx 8.7\\times10^{-5}$$\\nThe paramagnetic susceptibility is tiny and inversely proportional to temperature, in agreement with experiment.',
      },
      {
        title: 'Low-temperature susceptibility and magnetisation',
        detail: '$$\\chi(4.2\\ \\text{K}) = \\frac{0.026}{4.2} \\approx 6.2\\times10^{-3}$$\\n$$M = \\chi H = \\chi\\frac{B}{\\mu_0} = 6.2\\times10^{-3} \\times \\frac{1}{4\\pi\\times10^{-7}} \\approx 4.9\\times10^{3}\\ \\text{A/m}$$\\nChecking the validity condition: $\\mu B = 9.274\\times10^{-24}\\ \\text{J/T} \\times 1\\ \\text{T} = 9.27\\times10^{-24}\\ \\text{J}$, while $k_BT = 1.381\\times10^{-23} \\times 4.2 \\approx 5.8\\times10^{-23}\\ \\text{J}$, so the ratio is $\\mu B/k_BT \\approx 0.16 \\ll 1$: the moments are far from saturation and the Curie law applies (if the ratio approached 1 at low temperature and high field, the full Langevin function $L(x) = \\coth x - 1/x$ would be needed).',
      },
      {
        title: 'Curie–Weiss law and the exchange interaction',
        detail: 'For $T < T_C$ the material is spontaneously magnetised; for $T > T_C$ the magnetic order has melted, but the exchange interaction still enhances spin correlations, so the susceptibility follows the Curie–Weiss law instead:\\n$$\\chi = \\frac{C}{T - T_C}$$\\nAs $T \\to T_C$, $\\chi$ diverges, reflecting the critical behaviour of the magnetic (second-order) phase transition. Mean-field theory gives $k_BT_C \\approx \\dfrac{2JzS(S+1)}{3k_B}$ in order of magnitude ($J$ the exchange integral, $z$ the number of nearest neighbours), so $T_C$ directly measures the exchange strength—the $T_C \\approx 1043\\ \\text{K}$ of iron corresponds to an exchange energy of about $0.1\\ \\text{eV}$, far larger than magnetic dipole interactions (about $10^{-4}\\ \\text{eV}$), showing that ferromagnetism is essentially a quantum exchange effect.',
      },
    ],
    answer: '$C \\approx 0.026\\ \\text{K}$; $\\chi(300\\ \\text{K}) \\approx 8.7\\times10^{-5}$; $\\chi(4.2\\ \\text{K}) \\approx 6.2\\times10^{-3}$ and $M \\approx 4.9\\times10^{3}\\ \\text{A/m}$, with $\\mu B/k_BT \\approx 0.16 \\ll 1$ so the Curie law holds; for $T > T_C$ use $\\chi = C/(T - T_C)$, with $T_C$ set by the exchange-interaction strength.',
    tags: ['Paramagnetism', 'Curie law', 'Exchange interaction', 'Curie temperature'],
  },
  'solid-state-physics-p7': {
    title: 'Nearly-free-electron gap and tight-binding bandwidth, effective mass',
    question:
      'A one-dimensional crystal has lattice constant $a = 0.5\\ \\text{nm}$ and periodic potential $V(x) = 2V_1\\cos(2\\pi x/a)$ with $V_1 = 0.75\\ \\text{eV}$. (1) Using the nearly-free-electron approximation, find the kinetic energy of a free electron at the first Brillouin-zone boundary $k = \\pi/a$, the first gap $E_g$ that opens, and the energies of the upper and lower branches; (2) for the same crystal described instead by a tight-binding three-dimensional simple-cubic $s$ band, $E(\\vec{k}) = E_0 - 2J(\\cos k_xa + \\cos k_ya + \\cos k_za)$, with nearest-neighbour overlap integral $J = 0.40\\ \\text{eV}$, find the bandwidth $W$ and the effective mass $m^*$ at the band bottom; (3) if each unit cell contributes 2 electrons, decide whether the crystal is a conductor or a semiconductor, and explain which systems each limiting approximation applies to.',
    hints: [
      'In the nearly-free-electron approximation the two degenerate plane waves at the zone boundary $k = G/2$ are split by the Fourier component $V_G$ of the periodic potential; here $V_G = V_1$ and the gap is $E_g = 2|V_G|$.',
      'For the tight-binding simple-cubic $s$ band the bandwidth is $W = 12|J|$; near the band bottom expand $\\cos k_ia \\approx 1 - k_i^2a^2/2$ and compare with $\\hbar^2k^2/2m^*$ to get $m^* = \\hbar^2/(2Ja^2)$.',
      'A band holds $2N$ electrons ($N$ values of $k$ $\\times$ spin 2); a full band does not conduct, and a gap of order 1 eV means a semiconductor.',
    ],
    solution: [
      {
        title: 'Kinetic energy at the zone boundary and the gap',
        detail: 'The reciprocal lattice vector is $G = 2\\pi/a = 2\\pi/(5.0\\times10^{-10}) = 1.257\\times10^{10}\\ \\text{m}^{-1}$, and the zone boundary is $k = G/2 = \\pi/a = 6.28\\times10^9\\ \\text{m}^{-1}$. There the free-electron kinetic energy is\\n$$E_0 = \\frac{\\hbar^2}{2m}\\left(\\frac{\\pi}{a}\\right)^2 = \\frac{(1.055\\times10^{-34})^2(6.28\\times10^9)^2}{2\\times9.11\\times10^{-31}} = 2.41\\times10^{-19}\\ \\text{J} = 1.51\\ \\text{eV}$$\\nThe Fourier component $V_G = V_1 = 0.75\\ \\text{eV}$ of the periodic potential splits the degenerate states into $E_\\pm = E_0 \\pm |V_G|$, so\\n$$E_g = 2|V_1| = 1.5\\ \\text{eV}$$\\n$$E_- = 1.51 - 0.75 = 0.76\\ \\text{eV}, \\qquad E_+ = 1.51 + 0.75 = 2.26\\ \\text{eV}$$\\nNote that the gap is of the same order as the free-electron kinetic energy: although the periodic potential is "weak", at a degeneracy point it acts resonantly, so its effect is far from a small correction.',
      },
      {
        title: 'Tight-binding bandwidth and effective mass at the band bottom',
        detail: 'Bandwidth\\n$$W = 12|J| = 12\\times0.40 = 4.8\\ \\text{eV}$$\\nThe band bottom is at $\\vec{k} = 0$. Expanding $\\cos k_ia \\approx 1 - k_i^2a^2/2$ near it:\\n$$E \\approx E_0 - 2J\\left(3 - \\frac{a^2}{2}(k_x^2 + k_y^2 + k_z^2)\\right) = E_0 - 6J + Ja^2k^2$$\\nComparing with the free-particle form $E = E_{\\text{bottom}} + \\hbar^2k^2/2m^*$ gives $\\hbar^2/2m^* = Ja^2$, i.e.\\n$$m^* = \\frac{\\hbar^2}{2Ja^2} = \\frac{(1.055\\times10^{-34})^2}{2\\times0.40\\times1.602\\times10^{-19}\\times(5.0\\times10^{-10})^2} = 3.47\\times10^{-31}\\ \\text{kg} \\approx 0.38m$$\\nAs a cross-check of consistency between bandwidth and effective mass: $W = 6\\hbar^2/(m^*a^2) = 6\\times1.113\\times10^{-68}/(3.47\\times10^{-31}\\times2.5\\times10^{-19}) = 4.8\\ \\text{eV}$, in agreement with the direct result.',
      },
      {
        title: 'Conductivity and the domain of each approximation',
        detail: 'A band has $N$ values of $k$, each holding 2 spins, i.e. $2N$ states. With 2 electrons per unit cell there are exactly $2N$ electrons, so the band is exactly filled—in a full band the positive and negative electron velocities cancel, so no current flows. Together with the gap $E_g = 1.5\\ \\text{eV}$, which is of semiconductor magnitude, the crystal is a semiconductor.\\nDomain of the two limiting approximations: the nearly-free-electron picture suits metals with a shallow periodic potential and itinerant outer electrons (such as the alkali metals), whose bands are wide and whose effective masses are close to the free-electron mass; the tight-binding picture suits narrow-band systems with localised orbitals and small overlap integrals (transition-metal d bands, valence bands of insulators and semiconductors)—the weaker the overlap, the smaller $J$, the narrower the band and the larger the effective mass. Real bands lie between the two extremes, and understanding both is what allows any band diagram to be read.',
      },
    ],
    answer: '$E_0 \\approx 1.51\\ \\text{eV}$, $E_g = 2|V_1| = 1.5\\ \\text{eV}$ ($E_- \\approx 0.76\\ \\text{eV}$, $E_+ \\approx 2.26\\ \\text{eV}$); $W = 12|J| = 4.8\\ \\text{eV}$, $m^* = \\hbar^2/(2Ja^2) \\approx 3.47\\times10^{-31}\\ \\text{kg} \\approx 0.38m$; with 2 electrons per unit cell the band is exactly filled and the crystal is a semiconductor with a 1.5 eV gap.',
    tags: ['Nearly-free-electron approximation', 'Tight-binding approximation', 'Band structure', 'Effective mass'],
  },
};

export default map;
