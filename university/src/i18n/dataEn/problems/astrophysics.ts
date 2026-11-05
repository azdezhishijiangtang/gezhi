import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'astrophysics-p1': {
    title: 'Determining the Mass of Jupiter from the Orbit of Io',
    question:
      'The orbit of Io around Jupiter may be approximated as a circle of radius $a = 4.22\\times 10^{5}\\ \\text{km}$ with an orbital period $T = 1.769\\ \\text{d}$. Take $G = 6.674\\times 10^{-11}\\ \\text{N}\\cdot\\text{m}^2\\cdot\\text{kg}^{-2}$ and the mass of Io $m = 8.93\\times 10^{22}\\ \\text{kg}$. Find: (1) the mass of Jupiter $M_J$; (2) the orbital speed $v$ of Io; (3) explain why the mass of Io can safely be neglected when finding the mass of Jupiter.',
    hints: [
      'On a circular orbit gravity supplies the centripetal force: $\\dfrac{GMm}{a^2} = m\\dfrac{4\\pi^2 a}{T^2}$, which rearranges to $M + m = \\dfrac{4\\pi^2 a^3}{GT^2}$.',
      'First convert to SI units: $a = 4.22\\times 10^{8}\\ \\text{m}$, $T = 1.769\\times 86400\\ \\text{s} \\approx 1.528\\times 10^{5}\\ \\text{s}$.',
      'The orbital speed follows from $v = 2\\pi a/T$; neglecting the satellite mass requires $m \\ll M$, so simply compute the ratio.',
    ],
    solution: [
      {
        title: 'Mass of Jupiter from Kepler\u2019s third law',
        detail:
          'For a circular orbit all the gravity goes into the centripetal force:\\n$$\\frac{GMm}{a^2} = m\\omega^2 a = m\\frac{4\\pi^2 a}{T^2}$$\\nCancelling the satellite mass $m$ gives Newton\u2019s corrected form of Kepler\u2019s third law\\n$$M + m = \\frac{4\\pi^2 a^3}{GT^2}$$\\nSubstituting $a = 4.22\\times 10^{8}\\ \\text{m}$ and $T = 1.769\\times 86400\\ \\text{s} = 1.528\\times 10^{5}\\ \\text{s}$:\\n$$M + m = \\frac{4\\pi^2(4.22\\times 10^{8})^3}{6.674\\times 10^{-11}\\times (1.528\\times 10^{5})^2} = \\frac{39.48\\times 7.52\\times 10^{25}}{1.559} \\approx 1.90\\times 10^{27}\\ \\text{kg}$$\\nso $M_J \\approx 1.90\\times 10^{27}\\ \\text{kg}$, in agreement with the accepted value $1.898\\times 10^{27}\\ \\text{kg}$.',
      },
      {
        title: 'Orbital speed of Io',
        detail:
          'For a circular orbit the speed is the circumference divided by the period:\\n$$v = \\frac{2\\pi a}{T} = \\frac{2\\pi\\times 4.22\\times 10^{8}}{1.528\\times 10^{5}} \\approx 1.74\\times 10^{4}\\ \\text{m/s} = 17.4\\ \\text{km/s}$$\\nIt can be checked with $v = \\sqrt{GM_J/a}$: $\\sqrt{6.674\\times 10^{-11}\\times 1.90\\times 10^{27}/(4.22\\times 10^{8})} = \\sqrt{3.005\\times 10^{8}} \\approx 1.73\\times 10^{4}\\ \\text{m/s}$, in agreement with the first method.',
      },
      {
        title: 'Why the satellite mass may be neglected',
        detail:
          'Kepler\u2019s third law yields the sum of the two masses. The mass ratio of Io to Jupiter is\\n$$\\frac{m}{M_J} = \\frac{8.93\\times 10^{22}}{1.90\\times 10^{27}} \\approx 4.7\\times 10^{-5}$$\\ni.e. the satellite contributes only about one part in two hundred thousand of Jupiter\u2019s mass, far below the errors introduced by observation and by the orbital approximations (circular orbit, neglect of the other satellites). Hence $M + m \\approx M_J$ is an excellent approximation. For the same reason the mass of the Earth (about $3\\times 10^{-6}M_\\odot$) is entirely negligible when the mass of the Sun is found from the Earth\u2019s orbit; but for a binary of two comparable masses one must keep $m_1 + m_2$ and find another way to separate the individual masses.',
      },
    ],
    answer:
      '$M_J \\approx 1.90\\times 10^{27}\\ \\text{kg}$ (about 318 Earth masses); $v \\approx 17.4\\ \\text{km/s}$; since $m/M_J \\approx 4.7\\times 10^{-5}$, the contribution of Io to $m_1+m_2$ is far smaller than the measurement error and can be neglected.',
    tags: ['Kepler\u2019s third law', 'two-body problem', 'determination of astronomical masses'],
  },

  'astrophysics-p2': {
    title: 'Absolute Magnitude and Luminosity of Sirius',
    question:
      'Sirius A has apparent magnitude $m_V = -1.46$ and trigonometric parallax $\\pi = 0.379$ arcsec (a parallax of 1 arcsec corresponds to a distance of 1 pc, so $d = 1/\\pi\\ \\text{pc}$). Take the absolute magnitude of the Sun as $M_{V,\\odot} = 4.83$. Find: (1) the distance of Sirius A (in pc) and its distance modulus; (2) its absolute magnitude $M_V$; (3) the apparent magnitude it would have if moved to 10 pc, and how many times the luminosity of the Sun it has.',
    hints: [
      'Parallax and distance are reciprocals: $d = 1/\\pi = 1/0.379\\ \\text{pc} \\approx 2.64\\ \\text{pc}$.',
      'The distance modulus is $m - M = 5\\log_{10}\\dfrac{d}{10\\ \\text{pc}}$; note that here $d < 10\\ \\text{pc}$, so the distance modulus is negative.',
      'The luminosity ratio follows from the magnitude difference: $M_{\\text{Sirius}} - M_\\odot = -2.5\\log_{10}(L/L_\\odot)$; mind the sign and the direction of the inequality.',
    ],
    solution: [
      {
        title: 'Distance and distance modulus',
        detail:
          'By the definition of parallax, $d = 1/\\pi = 1/0.379 \\approx 2.64\\ \\text{pc}$ (about 8.6 light-years). The distance modulus is\\n$$m - M = 5\\log_{10}\\frac{d}{10\\ \\text{pc}} = 5\\log_{10}\\frac{2.64}{10} = 5\\log_{10}0.264 \\approx 5\\times(-0.579) \\approx -2.89$$\\nA negative modulus means Sirius is closer than 10 pc and therefore looks brighter than it would at 10 pc, which is entirely reasonable.',
      },
      {
        title: 'Absolute magnitude',
        detail:
          'Solving the distance modulus for $M$:\\n$$M_V = m_V - 5\\log_{10}\\frac{d}{10\\ \\text{pc}} = -1.46 - (-2.89) \\approx 1.43$$\\nso the absolute magnitude of Sirius A is about $1.43$, still far brighter than the Sun ($4.83$) — it is the brightest star in the whole sky because it is both close and intrinsically bright.',
      },
      {
        title: 'Apparent magnitude at 10 pc and the luminosity ratio',
        detail:
          'The absolute magnitude is by definition the apparent magnitude at 10 pc, so at 10 pc Sirius would have $m = M_V \\approx 1.43$ (about 2.9 magnitudes fainter than the present $-1.46$, still visible to the naked eye).\\nThe luminosity ratio follows from the magnitude difference:\\n$$M_{\\text{Sirius}} - M_\\odot = -2.5\\log_{10}\\frac{L}{L_\\odot}$$\\n$$1.43 - 4.83 = -3.40 = -2.5\\log_{10}\\frac{L}{L_\\odot}$$\\n$$\\log_{10}\\frac{L}{L_\\odot} = 1.36\\quad\\Rightarrow\\quad \\frac{L}{L_\\odot} = 10^{1.36} \\approx 23$$\\nso the luminosity of Sirius A is about 23 times that of the Sun (the observed value is about 25; the difference comes from the bolometric correction to the monochromatic $V$-band magnitude). It is an A1V main-sequence star.',
      },
    ],
    answer:
      '$d \\approx 2.64\\ \\text{pc}$ with distance modulus $m-M \\approx -2.89$; $M_V \\approx 1.43$; at 10 pc the apparent magnitude would be $1.43$, and the luminosity is about $23$ times that of the Sun.',
    tags: ['apparent magnitude', 'absolute magnitude', 'distance modulus'],
  },

  'astrophysics-p3': {
    title: 'Luminosity and Lifetime of a 10 Solar-Mass Main-Sequence Star',
    question:
      'The luminosity of a main-sequence star follows the empirical mass-luminosity relation $L/L_\\odot \\approx (M/M_\\odot)^{3.5}$. About $0.7\\%$ of the rest mass is converted into energy when hydrogen fuses into helium, and only about $10\\%$ of the stellar mass (the core) takes part in hydrogen burning. Take $M_\\odot = 1.989\\times 10^{30}\\ \\text{kg}$, $L_\\odot = 3.83\\times 10^{26}\\ \\text{W}$ and $c = 3.00\\times 10^{8}\\ \\text{m/s}$. For a main-sequence star of $M = 10M_\\odot$ find: (1) its luminosity (in $L_\\odot$ and in watts); (2) the available nuclear energy reserve and the main-sequence lifetime $t_{MS}$; (3) check the result with the scaling $t_{MS} \\propto M/L$ and estimate the lifetime of a $0.5M_\\odot$ star.',
    hints: [
      'First get the luminosity from the mass-luminosity relation: $10^{3.5} \\approx 3.16\\times 10^{3}$.',
      'The nuclear reserve is $E = 0.007\\times 0.1\\,Mc^2$ and the lifetime is $t_{MS} = E/L$; finally convert seconds to years ($1\\ \\text{yr} \\approx 3.156\\times 10^{7}\\ \\text{s}$).',
      'Since $t \\propto M/L \\propto M/M^{3.5} = M^{-2.5}$, simply rescale from the Sun\u2019s $10^{10}\\ \\text{yr}$.',
    ],
    solution: [
      {
        title: 'Luminosity',
        detail:
          'From the mass-luminosity relation\\n$$\\frac{L}{L_\\odot} = \\left(\\frac{M}{M_\\odot}\\right)^{3.5} = 10^{3.5} \\approx 3.16\\times 10^{3}$$\\nso the luminosity is about 3160 solar luminosities. In SI units\\n$$L = 3.16\\times 10^{3}\\times 3.83\\times 10^{26} \\approx 1.21\\times 10^{30}\\ \\text{W}$$\\nA tenfold increase in mass raises the luminosity by more than a factor of 3000 — precisely why massive stars live such short lives.',
      },
      {
        title: 'Nuclear reserve and main-sequence lifetime',
        detail:
          'The stellar mass is $M = 10\\times 1.989\\times 10^{30} = 1.989\\times 10^{31}\\ \\text{kg}$. Only about $10\\%$ takes part in hydrogen burning and the fusion efficiency is $0.7\\%$, so the usable nuclear energy is\\n$$E = 0.007\\times 0.1\\times Mc^2 = 7\\times 10^{-4}\\times 1.989\\times 10^{31}\\times (3.00\\times 10^{8})^2 \\approx 1.25\\times 10^{45}\\ \\text{J}$$\\nThe main-sequence lifetime is\\n$$t_{MS} = \\frac{E}{L} = \\frac{1.25\\times 10^{45}}{1.21\\times 10^{30}} \\approx 1.03\\times 10^{15}\\ \\text{s} \\approx \\frac{1.03\\times 10^{15}}{3.156\\times 10^{7}} \\approx 3.3\\times 10^{7}\\ \\text{yr}$$\\nthat is about 33 million years, only one three-hundredth of the main-sequence lifetime of the Sun.',
      },
      {
        title: 'Checking the scaling and a low-mass star',
        detail:
          'From $t_{MS}\\propto M/L$ and $L \\propto M^{3.5}$ we get\\n$$t_{MS} \\propto M^{-2.5}\\quad\\Rightarrow\\quad t_{MS} \\approx 10^{10}\\ \\text{yr}\\left(\\frac{M}{M_\\odot}\\right)^{-2.5}$$\\nFor $10M_\\odot$: $10^{10}\\times 10^{-2.5} = 10^{10}\\times 3.16\\times 10^{-3} \\approx 3.2\\times 10^{7}\\ \\text{yr}$, consistent with the step-by-step calculation.\\nFor $0.5M_\\odot$: $10^{10}\\times (0.5)^{-2.5} = 10^{10}\\times 2^{2.5} \\approx 10^{10}\\times 5.66 \\approx 5.7\\times 10^{10}\\ \\text{yr}$, i.e. about 57 billion years, far exceeding the present age of the Universe (13.8 billion years). Hence every star of mass below about $0.8M_\\odot$ ever born is still on the main sequence today, and we can never observe its death. This also explains why the lower main sequence of the Hertzsprung-Russell diagram is densely populated with faint red low-mass stars.',
      },
    ],
    answer:
      '$L \\approx 3.16\\times 10^{3}L_\\odot \\approx 1.21\\times 10^{30}\\ \\text{W}$; $E \\approx 1.25\\times 10^{45}\\ \\text{J}$ and $t_{MS} \\approx 3.3\\times 10^{7}\\ \\text{yr}$; the scaling check $t\\propto M^{-2.5}$ gives $3.2\\times 10^{7}\\ \\text{yr}$, and a $0.5M_\\odot$ star lives about $5.7\\times 10^{10}\\ \\text{yr}$.',
    tags: ['main-sequence lifetime', 'mass-luminosity relation', 'nuclear burning'],
  },

  'astrophysics-p4': {
    title: 'Jeans Mass and Collapse Time of a Molecular Cloud Core',
    question:
      'A molecular cloud has temperature $T = 10\\ \\text{K}$ and number density $n = 10^{3}\\ \\text{cm}^{-3}$, and consists of molecular hydrogen (mean molecular weight $\\mu = 2.33$; take the isothermal sound speed $c_s = \\sqrt{kT/(\\mu m_H)}$). Take $m_H = 1.673\\times 10^{-27}\\ \\text{kg}$, $k = 1.381\\times 10^{-23}\\ \\text{J/K}$, $G = 6.674\\times 10^{-11}$ and $M_\\odot = 1.989\\times 10^{30}\\ \\text{kg}$. Find: (1) the mass density $\\rho$ and the sound speed $c_s$; (2) the Jeans length $\\lambda_J = c_s\\sqrt{\\pi/(G\\rho)}$ and the Jeans mass $M_J = \\frac{\\pi}{6}\\rho\\lambda_J^3$ (in units of $M_\\odot$); (3) the free-fall time $t_{ff} = \\sqrt{3\\pi/(32G\\rho)}$, and explain the physical meaning of the results.',
    hints: [
      'First convert the number density to SI units: $n = 10^{3}\\ \\text{cm}^{-3} = 10^{9}\\ \\text{m}^{-3}$, then use $\\rho = n\\mu m_H$.',
      'Use the isothermal form for the sound speed ($\\gamma = 1$): $c_s = \\sqrt{kT/(\\mu m_H)}$, which should come out around $0.2\\ \\text{km/s}$.',
      'The Jeans mass can also be computed directly from $M_J = \\dfrac{\\pi^{5/2}}{6}\\dfrac{c_s^3}{G^{3/2}\\rho^{1/2}}$; the two expressions are equivalent and may be used as a cross-check.',
    ],
    solution: [
      {
        title: 'Mass density and sound speed',
        detail:
          'The number density is $n = 10^{3}\\ \\text{cm}^{-3} = 10^{9}\\ \\text{m}^{-3}$, so\\n$$\\rho = n\\mu m_H = 10^{9}\\times 2.33\\times 1.673\\times 10^{-27} \\approx 3.90\\times 10^{-18}\\ \\text{kg/m}^3$$\\n(about $3.9\\times 10^{-21}\\ \\text{g/cm}^3$, far more rarefied than the best vacuum on Earth).\\nThe isothermal sound speed is\\n$$c_s = \\sqrt{\\frac{kT}{\\mu m_H}} = \\sqrt{\\frac{1.381\\times 10^{-23}\\times 10}{2.33\\times 1.673\\times 10^{-27}}} = \\sqrt{3.54\\times 10^{4}} \\approx 1.88\\times 10^{2}\\ \\text{m/s} = 0.19\\ \\text{km/s}$$',
      },
      {
        title: 'Jeans length and Jeans mass',
        detail:
          'First the Jeans length:\\n$$G\\rho = 6.674\\times 10^{-11}\\times 3.90\\times 10^{-18} \\approx 2.60\\times 10^{-28}\\ \\text{s}^{-2}$$\\n$$\\lambda_J = c_s\\sqrt{\\frac{\\pi}{G\\rho}} = 188\\times\\sqrt{\\frac{3.14}{2.60\\times 10^{-28}}} = 188\\times 1.10\\times 10^{14} \\approx 2.07\\times 10^{16}\\ \\text{m} \\approx 0.67\\ \\text{pc}$$\\nThen from $M_J = \\frac{\\pi}{6}\\rho\\lambda_J^3$:\\n$$M_J = \\frac{\\pi}{6}\\times 3.90\\times 10^{-18}\\times (2.07\\times 10^{16})^3 \\approx 0.524\\times 3.90\\times 10^{-18}\\times 8.87\\times 10^{48} \\approx 1.81\\times 10^{31}\\ \\text{kg}$$\\n$$\\frac{M_J}{M_\\odot} = \\frac{1.81\\times 10^{31}}{1.989\\times 10^{30}} \\approx 9.1$$\\nThe equivalent form $M_J = \\frac{\\pi^{5/2}}{6}\\frac{c_s^3}{G^{3/2}\\rho^{1/2}} \\approx 2.92\\times\\frac{(188)^3}{(6.674\\times 10^{-11})^{3/2}(3.90\\times 10^{-18})^{1/2}}$ gives the same $\\approx 1.8\\times 10^{31}\\ \\text{kg}$, i.e. about $9M_\\odot$.',
      },
      {
        title: 'Free-fall time and its physical meaning',
        detail:
          '$$t_{ff} = \\sqrt{\\frac{3\\pi}{32G\\rho}} = \\sqrt{\\frac{9.42}{32\\times 2.60\\times 10^{-28}}} = \\sqrt{1.13\\times 10^{27}} \\approx 3.36\\times 10^{13}\\ \\text{s} \\approx 1.1\\times 10^{6}\\ \\text{yr}$$\\nPhysical meaning: in a typical cloud core with $T = 10\\ \\text{K}$ and $n = 10^{3}\\ \\text{cm}^{-3}$, a perturbation larger than about $0.67\\ \\text{pc}$ and heavier than about $9M_\\odot$ cannot be supported by thermal pressure and collapses on its own within about a million years — in good agreement with the observed sizes of cloud cores ($0.1\\sim 1\\ \\text{pc}$) and with star-formation timescales (of order a million years), which shows that the Jeans criterion captures the essential physics. Note also that $M_J \\propto \\rho^{-1/2}$: as the collapse proceeds the density rises, the Jeans mass falls, and the cloud **fragments hierarchically** into ever smaller pieces, ending up as a star cluster rather than one giant star.',
      },
    ],
    answer:
      '$\\rho \\approx 3.90\\times 10^{-18}\\ \\text{kg/m}^3$ and $c_s \\approx 188\\ \\text{m/s}$; $\\lambda_J \\approx 2.07\\times 10^{16}\\ \\text{m} \\approx 0.67\\ \\text{pc}$ and $M_J \\approx 1.81\\times 10^{31}\\ \\text{kg} \\approx 9.1M_\\odot$; $t_{ff} \\approx 1.1\\times 10^{6}\\ \\text{yr}$.',
    tags: ['Jeans criterion', 'molecular cloud', 'free-fall time'],
  },

  'astrophysics-p5': {
    title: 'Schwarzschild Radius and Angular Diameter of a Black Hole',
    question:
      'The Schwarzschild radius is $R_s = \\dfrac{2GM}{c^2} \\approx 2.95\\ \\text{km}\\,(M/M_\\odot)$. Take $M_\\odot = 1.989\\times 10^{30}\\ \\text{kg}$, $G = 6.674\\times 10^{-11}$, $c = 3.00\\times 10^{8}\\ \\text{m/s}$, $1\\ \\text{pc} = 3.086\\times 10^{16}\\ \\text{m}$ and $M_\\oplus = 5.97\\times 10^{24}\\ \\text{kg}$. Find: (1) $R_s$ for a stellar-mass black hole of $10M_\\odot$; (2) $R_s$ of the Galactic Centre black hole Sgr A* ($M = 4.3\\times 10^{6}M_\\odot$, distance $d = 8\\ \\text{kpc}$) and its angular diameter of the event horizon (in microarcseconds, $1\\ \\text{rad} = 206265\\ \\text{arcsec}$); (3) if the Earth were compressed into a black hole, how large would $R_s$ be?',
    hints: [
      'The proportion $R_s = 2.95\\ \\text{km}\\,(M/M_\\odot)$ is fastest, and $2GM/c^2$ may be used to check it step by step.',
      'The angular diameter is $\\theta = 2R_s/d$; express the result in radians and then multiply by $206265\\times 10^{6}$ to convert to microarcseconds.',
      'For the Earth substitute $M_\\oplus$ directly; the result should be at the millimetre scale, which shows how far an everyday object must be compressed to become a black hole.',
    ],
    solution: [
      {
        title: 'Stellar-mass black hole',
        detail:
          'Substituting $M = 10M_\\odot$:\\n$$R_s = 2.95\\ \\text{km}\\times 10 = 29.5\\ \\text{km}$$\\nStep by step: $R_s = \\dfrac{2\\times 6.674\\times 10^{-11}\\times 10\\times 1.989\\times 10^{30}}{(3.00\\times 10^{8})^2} = \\dfrac{2.655\\times 10^{21}}{9.00\\times 10^{16}} \\approx 2.95\\times 10^{4}\\ \\text{m} = 29.5\\ \\text{km}$.\\nSo a black hole ten times the mass of the Sun has an event horizon less than 60 km across, smaller than a city.',
      },
      {
        title: 'Radius and angular diameter of Sgr A*',
        detail:
          'For a mass of $4.3\\times 10^{6}M_\\odot$:\\n$$R_s = 2.95\\ \\text{km}\\times 4.3\\times 10^{6} \\approx 1.27\\times 10^{7}\\ \\text{km}$$\\nabout $0.085\\ \\text{AU}$, one twelfth of the distance from the Sun to the Earth. The distance is\\n$$d = 8\\ \\text{kpc} = 8\\times 10^{3}\\times 3.086\\times 10^{16}\\ \\text{m} \\approx 2.47\\times 10^{20}\\ \\text{m}$$\\nThe angular diameter (the angle subtended by the horizon diameter) is\\n$$\\theta = \\frac{2R_s}{d} = \\frac{2\\times 1.27\\times 10^{10}\\ \\text{m}}{2.47\\times 10^{20}\\ \\text{m}} \\approx 1.03\\times 10^{-10}\\ \\text{rad}$$\\n$$\\theta = 1.03\\times 10^{-10}\\times 206265\\ \\text{arcsec} \\approx 2.1\\times 10^{-5}\\ \\text{arcsec} \\approx 21\\ \\mu\\text{as}$$\\nThe "shadow" of Sgr A* announced by the Event Horizon Telescope in 2022 has a diameter of about $52\\ \\mu\\text{as}$, roughly 2.5 times the angular diameter of the horizon — the difference comes from the bending of light by strong gravitational lensing (theory predicts a shadow about $2.6\\times 2R_s$ across), so theory and observation agree closely.',
      },
      {
        title: 'Earth-mass black hole',
        detail:
          '$$R_s = \\frac{2\\times 6.674\\times 10^{-11}\\times 5.97\\times 10^{24}}{(3.00\\times 10^{8})^2} = \\frac{7.97\\times 10^{14}}{9.00\\times 10^{16}} \\approx 8.9\\times 10^{-3}\\ \\text{m} = 8.9\\ \\text{mm}$$\\nSo if the Earth were compressed to the size of a pea (radius about 9 mm) it would become a black hole. This shows that a black hole is not synonymous with "enormous mass" but with "mass compressed inside its own Schwarzschild radius"; any mass has a corresponding Schwarzschild radius in principle, and the only question is whether it can actually be compressed that far.',
      },
    ],
    answer:
      'For a $10M_\\odot$ black hole $R_s \\approx 29.5\\ \\text{km}$; for Sgr A* $R_s \\approx 1.27\\times 10^{7}\\ \\text{km}\\ (\\approx 0.085\\ \\text{AU})$ with an angular diameter of about $21\\ \\mu\\text{as}$; for an Earth-mass black hole $R_s \\approx 8.9\\ \\text{mm}$.',
    tags: ['Schwarzschild radius', 'black hole', 'event horizon'],
  },

  'astrophysics-p6': {
    title: 'Hubble\u2019s Law: Distance of a Galaxy from Its Redshift',
    question:
      'Take the Hubble constant $H_0 = 70\\ \\text{km}\\cdot\\text{s}^{-1}\\cdot\\text{Mpc}^{-1}$, $c = 3.00\\times 10^{5}\\ \\text{km/s}$ and $1\\ \\text{Mpc} = 3.086\\times 10^{19}\\ \\text{km}$. In the spectrum of a galaxy the H$\\alpha$ line (rest wavelength $\\lambda_0 = 656.3\\ \\text{nm}$) is observed at $\\lambda = 671.7\\ \\text{nm}$. Find: (1) the redshift $z$ and the recession velocity $v$ (using $v = cz$), and hence the distance $d$ (in Mpc); (2) for another galaxy at $100\\ \\text{Mpc}$, its recession velocity and redshift; (3) the Hubble time $1/H_0$, compared with the age of the Universe, 13.8 billion years, and why the two are close.',
    hints: [
      'The redshift is defined by $z = (\\lambda - \\lambda_0)/\\lambda_0$; for small redshifts $v \\approx cz$, and then $d = v/H_0$ gives the distance.',
      'Keep the units consistent: $v$ in km/s and $H_0$ in $\\text{km}\\cdot\\text{s}^{-1}\\cdot\\text{Mpc}^{-1}$, so the quotient comes out directly in Mpc.',
      'For the Hubble time $1/H_0$, first convert 1 Mpc to km, divide by 70 km/s, and finally convert to years.',
    ],
    solution: [
      {
        title: 'Redshift, recession velocity and distance',
        detail:
          'The redshift is\\n$$z = \\frac{\\lambda - \\lambda_0}{\\lambda_0} = \\frac{671.7 - 656.3}{656.3} = \\frac{15.4}{656.3} \\approx 0.0235$$\\nThe recession velocity ($z \\ll 1$, so the Doppler approximation holds) is\\n$$v \\approx cz = 3.00\\times 10^{5}\\ \\text{km/s}\\times 0.0235 \\approx 7.04\\times 10^{3}\\ \\text{km/s}$$\\nFrom Hubble\u2019s law $v = H_0 d$:\\n$$d = \\frac{v}{H_0} = \\frac{7.04\\times 10^{3}}{70}\\ \\text{Mpc} \\approx 101\\ \\text{Mpc}\\ (\\approx 3.3\\times 10^{8}\\ \\text{light-years})$$\\nso the light from this galaxy has travelled for about 330 million years.',
      },
      {
        title: 'Recession velocity and redshift at 100 Mpc',
        detail:
          '$$v = H_0 d = 70\\times 100 = 7.0\\times 10^{3}\\ \\text{km/s}$$\\n$$z \\approx \\frac{v}{c} = \\frac{7.0\\times 10^{3}}{3.00\\times 10^{5}} \\approx 0.023$$\\nBoth redshifts are of order $0.02$. This reminds us that for $z \\gtrsim 0.1$ the linear approximation is no longer reliable and one must use the full redshift-distance relation including $\\Omega_m$ and $\\Omega_\\Lambda$ (an integral over $H(a)$).',
      },
      {
        title: 'Hubble time and the age of the Universe',
        detail:
          '$$\\frac{1}{H_0} = \\frac{1\\ \\text{Mpc}}{70\\ \\text{km/s}} = \\frac{3.086\\times 10^{19}\\ \\text{km}}{70\\ \\text{km/s}} \\approx 4.41\\times 10^{17}\\ \\text{s} \\approx \\frac{4.41\\times 10^{17}}{3.156\\times 10^{7}} \\approx 1.40\\times 10^{10}\\ \\text{yr}$$\\nthat is about 14 billion years, differing by only about $1.5\\%$ from the precisely determined age of 13.8 billion years. This is no accident: the Hubble time is the time needed, if the Universe expanded forever at today\u2019s rate, to run back to a scale factor of zero. In the purely matter-dominated Einstein-de Sitter model the expansion decelerates and the true age is only $\\frac{2}{3}\\frac{1}{H_0} \\approx 9.3$ billion years, younger even than the oldest stars (this was the "age crisis" of the past); in today\u2019s Universe about half the time was matter-dominated (decelerating) and the last few billion years are dominated by dark energy (accelerating), and the two effects happen to compensate each other, leaving the true age very close to $1/H_0$. This coincidence is therefore itself a consistency check on the combination of ΛCDM parameters.',
      },
    ],
    answer:
      '$z \\approx 0.0235$, $v \\approx 7.04\\times 10^{3}\\ \\text{km/s}$ and $d \\approx 101\\ \\text{Mpc}$; at $100\\ \\text{Mpc}$, $v = 7.0\\times 10^{3}\\ \\text{km/s}$ and $z \\approx 0.023$; $1/H_0 \\approx 1.40\\times 10^{10}\\ \\text{yr}$ (about 14 billion years), close to the age of 13.8 billion years.',
    tags: ['Hubble\u2019s law', 'cosmological redshift', 'Hubble time'],
  },
};

export default map;
