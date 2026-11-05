import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'nuclear-particle-physics-p1': {
    title: '$^{56}\\text{Fe}$: Nuclear Radius, Density and Binding Energy',
    question: 'The atomic mass of $^{56}\\text{Fe}$ is $M = 55.9349\\,\\text{u}$, with $Z = 26$, $N = 30$. Take $r_0 = 1.2\\,\\text{fm}$, $1\\,\\text{u} = 931.5\\,\\text{MeV}/c^2 = 1.6605\\times 10^{-27}\\,\\text{kg}$, $M(^{1}\\text{H}) = 1.007825\\,\\text{u}$, $m_n = 1.008665\\,\\text{u}$. Find: (1) the nuclear radius $R$ and the nuclear matter density $\\rho$; (2) the mass defect, the binding energy $B$ and the binding energy per nucleon $B/A$; (3) how much energy per nucleon on average is required to break $^{56}\\text{Fe}$ completely into free nucleons? Compare with $^{4}\\text{He}$ ($B = 28.3\\,\\text{MeV}$) and state which nucleus is more tightly bound.',
    hints: [
      'For the nuclear radius use $R = r_0 A^{1/3}$ and for the density use $\\rho = M/(\\frac43\\pi R^3)$; note that $1\\,\\text{fm} = 10^{-15}\\,\\text{m}$.',
      'When atomic masses are used the electron masses cancel at both ends, so simply substitute $B = [Z M(^{1}\\text{H}) + N m_n - M_{\\text{atom}}]c^2$; there is no need to subtract electron masses again.',
      'The binding energy per nucleon $B/A$ is the criterion for how tightly a nucleus is bound; a large total binding energy does not mean that each nucleon is more tightly bound.',
    ],
    solution: [
      {
        title: 'Nuclear radius and nuclear density',
        detail: 'From $R = r_0 A^{1/3}$, first compute $56^{1/3} \\approx 3.826$:\\n$$R = 1.2\\times 3.826\\,\\text{fm} \\approx 4.59\\,\\text{fm} = 4.59\\times 10^{-15}\\,\\text{m}$$\\nThe mass is $M = 56\\times 1.6605\\times 10^{-27}\\,\\text{kg} = 9.30\\times 10^{-26}\\,\\text{kg}$, so the volume is\\n$$V = \\frac43\\pi R^3 = \\frac43\\pi (4.59\\times 10^{-15})^3 \\approx 4.05\\times 10^{-43}\\,\\text{m}^3$$\\n$$\\rho = \\frac{9.30\\times 10^{-26}}{4.05\\times 10^{-43}} \\approx 2.3\\times 10^{17}\\,\\text{kg/m}^3$$\\nThis exceeds the density of water by about $10^{14}$ times and is independent of $A$ (one checks that $\\rho = 3m_u/(4\\pi r_0^3)$ contains no $A$).',
      },
      {
        title: 'Mass defect and binding energy',
        detail: 'Computing with atomic masses (the electron masses cancel automatically):\\n$$Z M(^{1}\\text{H}) = 26\\times 1.007825 = 26.20345\\,\\text{u}$$\\n$$N m_n = 30\\times 1.008665 = 30.25995\\,\\text{u}$$\\n$$\\Delta m = 26.20345 + 30.25995 - 55.9349 = 0.52850\\,\\text{u}$$\\n$$B = \\Delta m\\,c^2 = 0.52850\\times 931.5 \\approx 492.3\\,\\text{MeV}$$\\nThe binding energy per nucleon is\\n$$\\frac{B}{A} = \\frac{492.3}{56} \\approx 8.79\\,\\text{MeV/nucleon}$$\\nwhich agrees exactly with the measured value $8.79\\,\\text{MeV}$, placing it near the peak of the binding-energy-per-nucleon curve.',
      },
      {
        title: 'Energy needed to dismantle the nucleus, and the comparison',
        detail: 'To break $^{56}\\text{Fe}$ apart completely, each nucleon requires on average\\n$$\\varepsilon = \\frac{B}{A} \\approx 8.79\\,\\text{MeV}$$\\nwhereas for $^{4}\\text{He}$\\n$$\\frac{B}{A} = \\frac{28.3}{4} \\approx 7.07\\,\\text{MeV/nucleon}$$\\nHence every nucleon in $^{56}\\text{Fe}$ is more tightly bound (by about $24\\%$), even though the total binding energy of $^{4}\\text{He}$ is much smaller in absolute terms. This is exactly why the binding-energy-per-nucleon curve peaks near $A\\approx 56$, and why both fusion of light nuclei and fission of heavy nuclei release energy.',
      },
    ],
    answer: '$R \\approx 4.59\\,\\text{fm}$, $\\rho \\approx 2.3\\times 10^{17}\\,\\text{kg/m}^3$; $\\Delta m \\approx 0.5285\\,\\text{u}$, $B \\approx 492.3\\,\\text{MeV}$, $B/A \\approx 8.79\\,\\text{MeV}$; dismantling $^{56}\\text{Fe}$ costs about $8.79\\,\\text{MeV}$ per nucleon on average, tighter than the $7.07\\,\\text{MeV}$ of $^{4}\\text{He}$.',
    tags: ['Nuclear radius', 'Mass defect', 'Binding energy per nucleon'],
  },
  'nuclear-particle-physics-p2': {
    title: 'Binding Energy from the Weizsäcker Semi-Empirical Mass Formula',
    question: 'The Weizsäcker formula is $B = a_v A - a_s A^{2/3} - a_c\\dfrac{Z(Z-1)}{A^{1/3}} - a_a\\dfrac{(A-2Z)^2}{A} + \\delta$, with $a_v = 15.75$, $a_s = 17.8$, $a_c = 0.711$, $a_a = 23.7$ (all in MeV) and the pairing term $\\delta = +34A^{-3/4}$ (even-even nuclei). Find: (1) the binding energy and binding energy per nucleon of $^{56}\\text{Fe}$ ($Z = 26$), compared with the experimental value $492.3\\,\\text{MeV}$; (2) the binding energy and binding energy per nucleon of $^{238}\\text{U}$ ($Z = 92$); (3) extremise the formula with respect to $Z$ to derive the $\\beta$-stability line $Z \\approx \\dfrac{A}{2 + 0.015A^{2/3}}$, and find the most stable $Z$ for $A = 56$.',
    hints: [
      'Compute $A^{1/3}$ and $A^{2/3}$ first: for $^{56}\\text{Fe}$ they are $3.826$ and $14.64$; for $^{238}\\text{U}$ they are $6.199$ and $38.43$.',
      'Evaluate the five terms one by one and then sum them; note that the surface, Coulomb and asymmetry terms are all negative while the pairing term of an even-even nucleus is positive.',
      'Differentiate with respect to $Z$ treating $A$ as constant: $\\dfrac{\\partial B}{\\partial Z} = -a_c\\dfrac{2Z-1}{A^{1/3}} + 4a_a\\dfrac{A-2Z}{A} = 0$; neglecting the $1$ then yields $Z$.',
    ],
    solution: [
      {
        title: 'Individual contributions for $^{56}\\text{Fe}$',
        detail: '$^{56}\\text{Fe}$ is an even-even nucleus with $A^{1/3} = 3.826$ and $A^{2/3} = 14.64$:\\n$$a_v A = 15.75\\times 56 = 882.0$$\\n$$a_s A^{2/3} = 17.8\\times 14.64 = 260.6$$\\n$$a_c\\frac{Z(Z-1)}{A^{1/3}} = 0.711\\times\\frac{26\\times 25}{3.826} = 0.711\\times 169.9 = 120.8$$\\n$$a_a\\frac{(A-2Z)^2}{A} = 23.7\\times\\frac{4^2}{56} = 23.7\\times 0.286 = 6.8$$\\n$$\\delta = +34\\times 56^{-3/4} = +1.7$$\\n$$B = 882.0 - 260.6 - 120.8 - 6.8 + 1.7 \\approx 495.5\\,\\text{MeV}$$\\nThe binding energy per nucleon is $495.5/56 \\approx 8.85\\,\\text{MeV}$; compared with the experimental $492.3\\,\\text{MeV}$ ($8.79\\,\\text{MeV}$) the error is about $0.7\\%$.',
      },
      {
        title: 'Individual contributions for $^{238}\\text{U}$',
        detail: 'Also an even-even nucleus, with $A^{1/3} = 6.199$ and $A^{2/3} = 38.43$:\\n$$a_v A = 15.75\\times 238 = 3748.5$$\\n$$a_s A^{2/3} = 17.8\\times 38.43 = 684.1$$\\n$$a_c\\frac{Z(Z-1)}{A^{1/3}} = 0.711\\times\\frac{92\\times 91}{6.199} = 0.711\\times 1350.5 = 960.2$$\\n$$a_a\\frac{(A-2Z)^2}{A} = 23.7\\times\\frac{54^2}{238} = 23.7\\times 12.25 = 290.4$$\\n$$\\delta = +34\\times 238^{-3/4} = +0.6$$\\n$$B = 3748.5 - 684.1 - 960.2 - 290.4 + 0.6 \\approx 1814\\,\\text{MeV}$$\\nThe binding energy per nucleon is $1814/238 \\approx 7.62\\,\\text{MeV}$ (experimental value $7.57\\,\\text{MeV}$). The Coulomb and asymmetry terms together amount to about $1250\\,\\text{MeV}$, cancelling almost a third of the volume energy; this is the origin of the instability of heavy nuclei.',
      },
      {
        title: 'Derivation and value of the beta-stability line',
        detail: 'Extremise at fixed $A$ with respect to $Z$:\\n$$\\frac{\\partial B}{\\partial Z} = -a_c\\frac{2Z-1}{A^{1/3}} + 4a_a\\frac{A-2Z}{A} = 0$$\\nNeglecting the $-1$ in $2Z$ and rearranging,\\n$$4a_a(A - 2Z) = 2a_c Z A^{2/3}\\ \\Rightarrow\\ 4a_a A = Z\\left(8a_a + 2a_c A^{2/3}\\right)$$\\n$$Z \\approx \\frac{A}{2 + \\dfrac{a_c}{2a_a}A^{2/3}} = \\frac{A}{2 + 0.015A^{2/3}}$$\\nSubstituting $A = 56$ and $A^{2/3} = 14.64$:\\n$$Z \\approx \\frac{56}{2 + 0.015\\times 14.64} = \\frac{56}{2.220} \\approx 25.2$$\\nThis is close to $Z = 26$ of the stable nuclide $^{56}\\text{Fe}$. The formula also shows that as $A$ grows the denominator grows, so $Z/A$ falls further below $1/2$: heavy nuclei must dilute the Coulomb repulsion with more neutrons, and the stability line bends towards neutron excess.',
      },
    ],
    answer: '$^{56}\\text{Fe}$: $B \\approx 495.5\\,\\text{MeV}$ ($B/A \\approx 8.85\\,\\text{MeV}$), about $0.7\\%$ away from the experimental $492.3\\,\\text{MeV}$; $^{238}\\text{U}$: $B \\approx 1814\\,\\text{MeV}$, $B/A \\approx 7.62\\,\\text{MeV}$; the $\\beta$-stability line is $Z \\approx A/(2 + 0.015A^{2/3})$, giving $Z \\approx 25.2$ for $A = 56$ (experiment: $26$).',
    tags: ['Liquid drop model', 'Semi-empirical mass formula', 'Beta stability line'],
  },
  'nuclear-particle-physics-p3': {
    title: 'Alpha Decay Energy and Half-Life Estimate for $^{238}\\text{U}$',
    question: '$^{238}\\text{U}$ decays by alpha emission into $^{234}\\text{Th}$. Take the atomic masses $M(^{238}\\text{U}) = 238.0508\\,\\text{u}$, $M(^{234}\\text{Th}) = 234.0436\\,\\text{u}$, $M(^{4}\\text{He}) = 4.0026\\,\\text{u}$ and $1\\,\\text{u} = 931.5\\,\\text{MeV}/c^2$. (1) Find the decay energy $Q_\\alpha$ and the alpha-particle kinetic energy $E_\\alpha$. (2) Estimate the half-life with Gamow tunnelling: take the daughter charge $Z_D = 90$, $R = 1.2(A_D^{1/3} + 4^{1/3})\\,\\text{fm}$, $\\dfrac{e^2}{4\\pi\\varepsilon_0} = 1.44\\,\\text{MeV}\\cdot\\text{fm}$, $\\hbar c = 197.3\\,\\text{MeV}\\cdot\\text{fm}$, $m_\\alpha c^2 = 3727\\,\\text{MeV}$, and use $2G = \\dfrac{2}{\\hbar c}\\sqrt{2m_\\alpha c^2 E}\\;b\\left[\\arccos\\sqrt{\\xi} - \\sqrt{\\xi(1-\\xi)}\\right]$ with $b = \\dfrac{2Z_D e^2}{4\\pi\\varepsilon_0 E}$ and $\\xi = R/b$. (3) Compare with the measured half-life $4.47\\times 10^9\\,\\text{a}$ and explain why the half-life is extremely sensitive to $E_\\alpha$.',
    hints: [
      'Alpha decay is a two-body decay, so the kinetic energy is shared inversely with mass: $E_\\alpha = Q(A-4)/A$, and the recoil energy of the daughter is only $4Q/A$.',
      'The barrier is the Coulomb potential between the alpha particle (charge $2e$) and the daughter nucleus (charge $Z_D e$), $V(r) = 2Z_D e^2/(4\\pi\\varepsilon_0 r)$; hence the factor $2$ in $b$, which must not be forgotten.',
      'The penetration probability is $P \\approx e^{-2G}$ and the impact frequency is $\\nu \\approx v/(2R)$ with $v = c\\sqrt{2E/(m_\\alpha c^2)}$; thus $\\lambda = \\nu P$ and $T_{1/2} = \\ln 2/\\lambda$.',
    ],
    solution: [
      {
        title: 'Decay energy and alpha kinetic energy',
        detail: '$$Q_\\alpha = \\left[238.0508 - 234.0436 - 4.0026\\right]\\times 931.5 = 0.0046\\times 931.5 \\approx 4.28\\,\\text{MeV}$$\\nBy momentum conservation the kinetic energy is shared inversely with mass:\\n$$E_\\alpha = Q_\\alpha\\frac{A-4}{A} = 4.28\\times\\frac{234}{238} \\approx 4.21\\,\\text{MeV}$$\\n$$E_{\\text{Th}} = Q_\\alpha\\frac{4}{A} = 4.28\\times\\frac{4}{238} \\approx 0.072\\,\\text{MeV}$$\\nExperimentally $^{238}\\text{U}$ indeed emits monoenergetic alpha particles of about $4.20\\,\\text{MeV}$; the discrete energy is the signature of a two-body decay.',
      },
      {
        title: 'Gamow factor and penetration probability',
        detail: 'Fix the geometric parameters first: $234^{1/3} \\approx 6.16$ and $4^{1/3} \\approx 1.59$, hence\\n$$R = 1.2\\times(6.16 + 1.59) \\approx 9.3\\,\\text{fm}$$\\n$$b = \\frac{2Z_D e^2}{4\\pi\\varepsilon_0 E} = \\frac{2\\times 90\\times 1.44}{4.21} \\approx 61.6\\,\\text{fm}$$\\n$$\\xi = \\frac{R}{b} = \\frac{9.3}{61.6} \\approx 0.151$$\\nThe bracket factor is\\n$$\\arccos\\sqrt{0.151} - \\sqrt{0.151\\times 0.849} = \\arccos(0.389) - 0.358 \\approx 1.172 - 0.358 = 0.814$$\\nWith the prefactor $\\sqrt{2m_\\alpha c^2 E} = \\sqrt{2\\times 3727\\times 4.21} \\approx 177\\,\\text{MeV}$:\\n$$2G = \\frac{2\\times 177\\times 61.6}{197.3}\\times 0.814 \\approx 110.6\\times 0.814 \\approx 90.0$$\\n$$P \\approx e^{-2G} = e^{-90.0} \\approx 8\\times 10^{-40}$$',
      },
      {
        title: 'Half-life estimate and discussion',
        detail: 'Alpha-particle speed:\\n$$v = c\\sqrt{\\frac{2E}{m_\\alpha c^2}} = c\\sqrt{\\frac{2\\times 4.21}{3727}} \\approx 0.0475\\,c \\approx 1.4\\times 10^7\\,\\text{m/s}$$\\nImpact frequency:\\n$$\\nu \\approx \\frac{v}{2R} = \\frac{1.4\\times 10^7}{1.86\\times 10^{-14}} \\approx 7.7\\times 10^{20}\\,\\text{s}^{-1}$$\\n$$\\lambda = \\nu P \\approx 7.7\\times 10^{20}\\times 8\\times 10^{-40} \\approx 6\\times 10^{-19}\\,\\text{s}^{-1}$$\\n$$T_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{6\\times 10^{-19}} \\approx 1.2\\times 10^{18}\\,\\text{s} \\approx 3.5\\times 10^{10}\\,\\text{a}$$\\nThe measured value is $4.47\\times 10^9\\,\\text{a}$, so the estimate is high by less than one order of magnitude. Given that the shape of the barrier interior and the alpha preformation factor are only crudely modelled, this is a success against a background in which half-lives span more than twenty orders of magnitude.\\n\\nSensitivity: $T_{1/2} \\propto e^{2G}$ while $2G \\propto 1/\\sqrt{E}$, so a change of a few per cent in $E_\\alpha$ changes the half-life by a factor of several; raising $E_\\alpha$ from $4\\,\\text{MeV}$ to $9\\,\\text{MeV}$ shortens the half-life by more than twenty orders of magnitude. This is the origin of the Geiger–Nuttall law.',
      },
    ],
    answer: '$Q_\\alpha \\approx 4.28\\,\\text{MeV}$, $E_\\alpha \\approx 4.21\\,\\text{MeV}$ (daughter recoil $0.072\\,\\text{MeV}$); $2G \\approx 90$, $P \\approx 8\\times 10^{-40}$, estimated $T_{1/2} \\sim 10^{10}\\,\\text{a}$, the same order as the measured $4.47\\times 10^9\\,\\text{a}$; since $T_{1/2} \\propto e^{2G}$ with $2G \\propto 1/\\sqrt{E_\\alpha}$, the half-life is extremely sensitive to the alpha energy.',
    tags: ['Alpha decay', 'Coulomb barrier', 'Quantum tunnelling'],
  },
  'nuclear-particle-physics-p4': {
    title: 'Energy Release and Fuel Consumption in $^{235}\\text{U}$ Fission',
    question: 'A typical thermal-neutron-induced fission channel is $n + ^{235}\\text{U} \\to\\, ^{141}\\text{Ba} + ^{92}\\text{Kr} + 3n$. Take the atomic masses $m_n = 1.008665\\,\\text{u}$, $^{235}\\text{U} = 235.0439\\,\\text{u}$, $^{141}\\text{Ba} = 140.9144\\,\\text{u}$, $^{92}\\text{Kr} = 91.9262\\,\\text{u}$, with $1\\,\\text{u} = 931.5\\,\\text{MeV}/c^2$ and $1\\,\\text{MeV} = 1.602\\times 10^{-13}\\,\\text{J}$. (1) Find the energy $Q$ released in this channel. (2) Including the subsequent decays of the fission fragments, each fission releases about $200\\,\\text{MeV}$ in total; find the energy released by complete fission of $1\\,\\text{g}$ of $^{235}\\text{U}$ and convert it into the equivalent mass of standard coal ($2.93\\times 10^7\\,\\text{J/kg}$). (3) How much $^{235}\\text{U}$ does a $1\\,\\text{GW}$ nuclear power station (electrical output, efficiency $33\\%$) consume per day?',
    hints: [
      'With atomic masses the electron counts cancel automatically: there are $92$ electrons on the left (uranium) and $56 + 36 = 92$ on the right, so the balance is exact.',
      'The number of nuclei in $1\\,\\text{g}$ is $N = (1/235)\\times 6.022\\times 10^{23}$, and the total energy is $E = N\\times 200\\,\\text{MeV}$ (converted to joules).',
      'An electrical output of $1\\,\\text{GW}$ corresponds to a thermal power of $1\\,\\text{GW}/0.33 \\approx 3\\,\\text{GW}$; multiply by the number of seconds in a day and divide by the energy released per gram.',
    ],
    solution: [
      {
        title: 'Q value of the fission channel',
        detail: 'Total initial mass:\\n$$m_i = 235.0439 + 1.008665 = 236.052565\\,\\text{u}$$\\nTotal final mass:\\n$$m_f = 140.9144 + 91.9262 + 3\\times 1.008665 = 235.866595\\,\\text{u}$$\\n$$\\Delta m = 236.052565 - 235.866595 = 0.185970\\,\\text{u}$$\\n$$Q = 0.185970\\times 931.5 \\approx 173.2\\,\\text{MeV}$$\\nThis is the prompt energy release (about $168\\,\\text{MeV}$ in fragment kinetic energy and $12\\,\\text{MeV}$ in prompt neutrons and gammas); the fragments then emit about $20\\,\\text{MeV}$ more through a chain of beta decays, giving roughly $200\\,\\text{MeV}$ in total.',
      },
      {
        title: 'Energy of 1 g of uranium and coal equivalent',
        detail: 'Number of nuclei in $1\\,\\text{g}$ of $^{235}\\text{U}$:\\n$$N = \\frac{1}{235}\\times 6.022\\times 10^{23} \\approx 2.56\\times 10^{21}$$\\nEach fission releases $200\\,\\text{MeV} = 200\\times 1.602\\times 10^{-13}\\,\\text{J} = 3.20\\times 10^{-11}\\,\\text{J}$, hence\\n$$E = 2.56\\times 10^{21}\\times 3.20\\times 10^{-11} \\approx 8.2\\times 10^{10}\\,\\text{J}$$\\nIn standard coal:\\n$$m = \\frac{8.2\\times 10^{10}}{2.93\\times 10^7} \\approx 2.8\\times 10^3\\,\\text{kg} \\approx 2.8\\,\\text{t}$$\\nSo one gram of uranium is worth nearly three tonnes of coal, an energy density some six orders of magnitude higher.',
      },
      {
        title: 'Fuel consumption of a power station',
        detail: 'With an electrical output of $1\\,\\text{GW}$ and an efficiency of $33\\%$, the required thermal power is\\n$$P_{\\text{th}} = \\frac{1\\,\\text{GW}}{0.33} \\approx 3.03\\,\\text{GW}$$\\nThe heat needed per day:\\n$$E_{\\text{day}} = 3.03\\times 10^9\\times 8.64\\times 10^4 \\approx 2.62\\times 10^{14}\\,\\text{J}$$\\nSince each gram of $^{235}\\text{U}$ releases $8.2\\times 10^{10}\\,\\text{J}$, the daily consumption is\\n$$m = \\frac{2.62\\times 10^{14}}{8.2\\times 10^{10}} \\approx 3.2\\times 10^3\\,\\text{g} \\approx 3.2\\,\\text{kg}$$\\nThe amount of $^{235}\\text{U}$ actually fissioned is about $3.2\\,\\text{kg}$; with low-enriched fuel and limited burn-up the real fuel inventory is far larger. For comparison, a coal-fired plant of the same power burns about $9000\\,\\text{t}$ of coal per day — the most direct illustration of the energy density of nuclear fuel.',
      },
    ],
    answer: '$Q \\approx 173\\,\\text{MeV}$ (about $200\\,\\text{MeV}$ in total including fragment decays); complete fission of $1\\,\\text{g}$ of $^{235}\\text{U}$ releases about $8.2\\times 10^{10}\\,\\text{J}$, equivalent to roughly $2.8\\,\\text{t}$ of standard coal; a $1\\,\\text{GW}$ station (efficiency $33\\%$) fissions about $3.2\\,\\text{kg}$ of $^{235}\\text{U}$ per day.',
    tags: ['Nuclear fission', 'Mass defect', 'Energy density'],
  },
  'nuclear-particle-physics-p5': {
    title: 'Q Value and Threshold Energy of $^{14}\\text{N}(\\alpha,p)^{17}\\text{O}$',
    question: 'The first artificial nuclear transformation, achieved by Rutherford in 1919, was $^{14}\\text{N} + \\alpha \\to\\, ^{17}\\text{O} + p$. Take the atomic masses $^{14}\\text{N} = 14.003074\\,\\text{u}$, $^{4}\\text{He} = 4.002603\\,\\text{u}$, $^{17}\\text{O} = 16.999132\\,\\text{u}$, $^{1}\\text{H} = 1.007825\\,\\text{u}$, and $1\\,\\text{u} = 931.5\\,\\text{MeV}/c^2$. (1) Find the reaction energy $Q$ and decide whether the reaction releases or absorbs energy. (2) Find the threshold energy $E_{\\text{th}}$ in the laboratory frame (nitrogen target at rest) and explain why it exceeds $|Q|$. (3) Check the result with the exact relativistic formula $E_{\\text{th}} = \\dfrac{[(m_b + M_B)^2 - (m_a + M_A)^2]c^2}{2M_A}$, and explain why the non-relativistic approximation is good enough here.',
    hints: [
      '$Q = (m_a + M_A - m_b - M_B)c^2$; with atomic masses the electron counts are $7 + 2 = 9$ on each side and $8 + 1 = 9$ on the other, so they balance automatically.',
      'The laboratory threshold is not $|Q|$: the final state as a whole must still carry the centre-of-mass momentum, and that kinetic energy cannot pay for the reaction, hence $E_{\\text{th}} = -Q(1 + m_a/M_A)$.',
      'In the exact relativistic formula all masses may be expressed in energy units (or uniformly in u, converting $c^2$ once); square $(m_b + M_B)$ and $(m_a + M_A)$ separately and subtract.',
    ],
    solution: [
      {
        title: 'Computing the reaction energy Q',
        detail: 'Initial state:\\n$$m_a + M_A = 4.002603 + 14.003074 = 18.005677\\,\\text{u}$$\\nFinal state:\\n$$m_b + M_B = 16.999132 + 1.007825 = 18.006957\\,\\text{u}$$\\n$$Q = (18.005677 - 18.006957)\\times 931.5 = -0.001280\\times 931.5 \\approx -1.19\\,\\text{MeV}$$\\nSince $Q < 0$ this is an endothermic reaction: it can occur only if the incoming alpha particle supplies the energy.',
      },
      {
        title: 'Laboratory threshold energy',
        detail: 'The momentum brought in by the projectile cannot simply disappear: the final state must keep the same centre-of-mass motion, and that kinetic energy is a toll that has to be paid. Hence the threshold exceeds $|Q|$:\\n$$E_{\\text{th}} = -Q\\left(1 + \\frac{m_a}{M_A}\\right) = 1.19\\times\\left(1 + \\frac{4}{14}\\right) = 1.19\\times 1.286 \\approx 1.53\\,\\text{MeV}$$\\nThe excess $1.53 - 1.19 = 0.34\\,\\text{MeV}$ is precisely the centre-of-mass kinetic energy of the final state. The natural alpha sources available to Rutherford had energies of about $5\\sim 7.7\\,\\text{MeV}$, well above threshold, which is why the reaction could be observed.',
      },
      {
        title: 'Check with the exact relativistic formula',
        detail: 'Expressing all masses in u, the conversion factor is $931.5\\,\\text{MeV/u}$. Compute the difference of squares first:\\n$$(m_b + M_B)^2 - (m_a + M_A)^2 = (18.006957 - 18.005677)(18.006957 + 18.005677)$$\\n$$= 0.001280\\times 36.012634 \\approx 0.046096\\,\\text{u}^2$$\\nSubstituting,\\n$$E_{\\text{th}} = \\frac{0.046096\\,\\text{u}^2\\times (931.5\\,\\text{MeV/u})^2}{2\\times 14.003074\\,\\text{u}\\times 931.5\\,\\text{MeV/u}} = \\frac{0.046096\\times 931.5}{2\\times 14.003074} \\approx \\frac{42.94}{28.006} \\approx 1.533\\,\\text{MeV}$$\\nThis differs from the approximate $1.534\\,\\text{MeV}$ by less than one part in a thousand. The reason is that both $Q$ and the kinetic energies ($\\sim 1.5\\,\\text{MeV}$) are far below the rest energy of a nucleon ($\\sim 4\\,\\text{GeV}$), so relativistic corrections are of order $E/(mc^2) \\sim 4\\times 10^{-4}$ and entirely negligible. Only when the projectile energy approaches its rest energy is the exact formula indispensable.',
      },
    ],
    answer: '$Q \\approx -1.19\\,\\text{MeV}$, an endothermic reaction; laboratory threshold $E_{\\text{th}} \\approx 1.53\\,\\text{MeV}$ (about $0.34\\,\\text{MeV}$ above $|Q|$, the centre-of-mass kinetic energy); the exact relativistic formula gives $1.533\\,\\text{MeV}$, agreeing with the non-relativistic approximation to one part in a thousand.',
    tags: ['Reaction Q value', 'Threshold energy', 'Relativistic kinematics'],
  },
  'nuclear-particle-physics-p6': {
    title: 'Conservation-Law Tests for Particle Reactions and the Neutrino Threshold',
    question: '(1) Use conservation laws to decide whether the following processes can occur, giving reasons: (a) $\\bar{\\nu}_e + p \\to n + e^+$; (b) $p \\to n + e^+ + \\nu_e$ (free proton); (c) $\\pi^0 \\to \\gamma$ (single photon). (2) Find the threshold energy of $\\bar{\\nu}_e + p \\to n + e^+$, taking $m_p c^2 = 938.272\\,\\text{MeV}$, $m_n c^2 = 939.565\\,\\text{MeV}$, $m_e c^2 = 0.511\\,\\text{MeV}$. (3) $\\pi^+ \\to \\mu^+ + \\nu_\\mu$ is a two-body decay; taking $m_\\pi = 139.57\\,\\text{MeV}$ and $m_\\mu = 105.66\\,\\text{MeV}$, find the kinetic energy and momentum of the muon, state the quark content of $\\pi^+$, and say which interaction dominates this decay.',
    hints: [
      'Check the additive quantum numbers one by one: charge $Q$, baryon number $B$ and lepton number $L_e$ (the antineutrino has $L_e = -1$ and the positron has $L_e = -1$), then check the energy condition $Q_{\\text{reaction}} > 0$.',
      'The threshold follows from the relativistic invariant: $s \\ge (m_n + m_e)^2c^4$, with $s = m_p^2c^4 + 2m_p c^2 E_\\nu$ in the laboratory frame (proton at rest); solving gives $E_{\\nu,\\text{th}} = \\dfrac{(m_n + m_e)^2 - m_p^2}{2m_p}c^2$.',
      'In a two-body decay $E_\\mu = \\dfrac{m_\\pi^2 + m_\\mu^2 - m_\\nu^2}{2m_\\pi}c^2$ and $p_\\mu c = \\sqrt{E_\\mu^2 - m_\\mu^2c^4}$; with $\\pi^+ = u\\bar{d}$, a change of quark flavour can only proceed through the weak interaction.',
    ],
    solution: [
      {
        title: 'Conservation-law verdicts for the three processes',
        detail: '(a) $\\bar{\\nu}_e + p \\to n + e^+$: charge $0 + 1 = 1$ on the left and $0 + 1 = 1$ on the right ✓; baryon number $1$ on the left and $1$ on the right ✓; lepton number $L_e = -1$ on the left and $L_e = -1$ for the $e^+$ on the right ✓. Energetically the final state is heavier by $(m_n + m_e - m_p)c^2 = 1.804\\,\\text{MeV}$, so the process occurs as soon as the antineutrino exceeds the threshold. This is the basic reaction for reactor neutrino detection.\\n\\n(b) $p \\to n + e^+ + \\nu_e$ (free proton): charge $1 \\to 0 + 1 + 0 = 1$ ✓, baryon number $1 \\to 1$ ✓, lepton number $0 \\to (-1) + (+1) = 0$ ✓, but energetically $m_p c^2 = 938.272\\,\\text{MeV} < (m_n + m_e)c^2 = 940.076\\,\\text{MeV}$, violating energy conservation, so the decay is forbidden. The free proton is stable (the experimental lower bound on its lifetime is $> 10^{34}\\,\\text{a}$); a bound proton inside a nucleus can undergo a similar transformation because the nuclear binding energy changes the energy balance.\\n\\n(c) $\\pi^0 \\to \\gamma$: charge, baryon number and lepton number are all conserved, but in the pion rest frame the initial momentum is zero while a single photon must carry momentum $E_\\gamma/c$, so momentum conservation cannot be satisfied; angular momentum and $C$ parity also forbid it. The single-photon decay is therefore forbidden, and $\\pi^0 \\to \\gamma\\gamma$ dominates instead (branching ratio about $98.8\\%$).',
      },
      {
        title: 'Threshold energy of the antineutrino reaction',
        detail: 'In the laboratory frame the proton is at rest, so $s = (p_\\nu + p_p)^2 = m_p^2 c^4 + 2m_p c^2 E_\\nu$ (the neutrino mass is neglected). At threshold the two final particles are at rest relative to each other in the centre-of-mass frame, that is $s = (m_n + m_e)^2c^4$:\\n$$E_{\\nu,\\text{th}} = \\frac{(m_n + m_e)^2 - m_p^2}{2m_p}c^2$$\\n$$(m_n + m_e)c^2 = 939.565 + 0.511 = 940.076\\,\\text{MeV}$$\\n$$E_{\\nu,\\text{th}} = \\frac{940.076^2 - 938.272^2}{2\\times 938.272} = \\frac{883743 - 880355}{1876.5} \\approx \\frac{3388}{1876.5} \\approx 1.806\\,\\text{MeV}$$\\nReactor antineutrinos have typical energies of a few MeV, above this threshold, so they can be detected; the experiment also exploits the coincidence of a prompt positron signal and a delayed neutron-capture signal to suppress background — the very method by which Reines and Cowan first detected the neutrino in 1956.',
      },
      {
        title: 'Energy sharing in pion decay and the interaction involved',
        detail: 'In the pion rest frame (with $m_\\nu \\approx 0$):\\n$$E_\\mu = \\frac{m_\\pi^2 + m_\\mu^2}{2m_\\pi}c^2 = \\frac{139.57^2 + 105.66^2}{2\\times 139.57} = \\frac{19480 + 11164}{279.14} \\approx 109.8\\,\\text{MeV}$$\\n$$T_\\mu = E_\\mu - m_\\mu c^2 = 109.8 - 105.66 \\approx 4.14\\,\\text{MeV}$$\\n$$p_\\mu c = \\sqrt{E_\\mu^2 - m_\\mu^2 c^4} = \\sqrt{109.8^2 - 105.66^2} \\approx \\sqrt{12056 - 11164} \\approx 29.8\\,\\text{MeV}$$\\nThe muon energy is single-valued, the hallmark of a two-body decay.\\n\\nQuark content: $\\pi^+ = u\\bar{d}$; in the decay the $u$ and $\\bar{d}$ annihilate into a $W^+$, which then produces $\\mu^+ \\nu_\\mu$. Because the quark flavour changes ($u\\bar{d} \\to \\mu^+\\nu_\\mu$, with net strangeness $0$ but involving the weak charge), the process can only be mediated by the weak interaction; consequently the pion lifetime is as long as $2.6\\times 10^{-8}\\,\\text{s}$, far longer than the typical strong-decay time scale of $10^{-23}\\,\\text{s}$.',
      },
    ],
    answer: '(a) Allowed (all quantum numbers are conserved; requires $E_{\\bar{\\nu}} > 1.806\\,\\text{MeV}$); (b) forbidden ($m_p < m_n + m_e$, violating energy conservation); (c) forbidden (momentum conservation and angular momentum forbid it; the actual decay is $\\pi^0 \\to \\gamma\\gamma$). The antineutrino threshold is $E_{\\nu,\\text{th}} \\approx 1.806\\,\\text{MeV}$; for $\\pi^+ = u\\bar{d}$ the decay gives $T_\\mu \\approx 4.14\\,\\text{MeV}$ and $p_\\mu \\approx 29.8\\,\\text{MeV}/c$, dominated by the weak interaction.',
    tags: ['Conservation laws', 'Neutrino detection', 'Pion decay', 'Quark content'],
  },
};

export default map;
