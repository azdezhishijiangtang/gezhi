import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'atomic-physics-p1': {
    title: 'Closest Approach and Impact Parameter in α-Particle Scattering',
    question:
      'An α particle of kinetic energy $E_k = 5.0\\ \\text{MeV}$ is fired at a gold foil (gold nucleus, $Z = 79$). Under the Coulomb repulsion the scattering angle $\\theta$ and the impact parameter $b$ are related by $b = \\dfrac{Ze^2}{4\\pi\\varepsilon_0 \\cdot 2E_k}\\cot\\dfrac{\\theta}{2}$. Take $\\dfrac{e^2}{4\\pi\\varepsilon_0} = 1.44\\ \\text{MeV}\\cdot\\text{fm}$. Find: (1) the distance of closest approach $r_{\\min}$ for a head-on collision ($b = 0$); (2) the impact parameter $b$ corresponding to a scattering angle $\\theta = 60^\\circ$; (3) what the results imply about the scale of the nucleus.',
    hints: [
      'For a head-on collision the α particle moves straight at the nucleus and its kinetic energy is converted entirely into Coulomb potential energy: $E_k = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{r_{\\min}}$; note that the α particle carries charge $2e$.',
      'For oblique incidence simply substitute into the scattering formula; the only thing to compute is $\\cot 30^\\circ = \\sqrt{3}$.',
      'Compare the result with the atomic scale $10^{-10}\\ \\text{m}$ to judge the order of magnitude of the nuclear size.',
    ],
    solution: [
      {
        title: 'Distance of closest approach for a head-on collision',
        detail:
          'For $b = 0$ the particle heads straight at the nucleus and comes momentarily to rest at $r_{\\min}$, all of its kinetic energy having become potential energy:\\n$$E_k = \\frac{1}{4\\pi\\varepsilon_0}\\frac{(2e)(Ze)}{r_{\\min}} \\quad\\Rightarrow\\quad r_{\\min} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2Ze^2}{E_k}$$\\nNumerically: $r_{\\min} = \\dfrac{2 \\times 79 \\times 1.44\\ \\text{MeV}\\cdot\\text{fm}}{5.0\\ \\text{MeV}} = \\dfrac{227.5}{5.0}\\ \\text{fm} \\approx 45.5\\ \\text{fm} = 4.55\\times 10^{-14}\\ \\text{m}$.',
      },
      {
        title: 'Impact parameter for a scattering angle of 60°',
        detail:
          'From the scattering formula, for $\\theta = 60^\\circ$ we have $\\cot(\\theta/2) = \\cot 30^\\circ = \\sqrt{3} \\approx 1.732$:\\n$$b = \\frac{Ze^2}{4\\pi\\varepsilon_0 \\cdot 2E_k}\\cot\\frac{\\theta}{2} = \\frac{79 \\times 1.44}{2 \\times 5.0} \\times 1.732\\ \\text{fm} = 11.38 \\times 1.732\\ \\text{fm} \\approx 19.7\\ \\text{fm} = 1.97\\times 10^{-14}\\ \\text{m}$$',
      },
      {
        title: 'Discussion of the nuclear scale',
        detail:
          'A deflection as large as $60^\\circ$ requires an impact parameter as small as about $20\\ \\text{fm}$, whereas the atomic radius is about $10^5\\ \\text{fm}$ (of order $10^{-10}\\ \\text{m}$). Since the deflection happens in a region four to five orders of magnitude smaller than the atom, essentially all the positive charge must be concentrated in a tiny nucleus of $10^{-15}\\sim 10^{-14}\\ \\text{m}$ — precisely the experimental basis of Rutherford\u2019s nuclear model.',
      },
    ],
    answer:
      '$r_{\\min} \\approx 45.5\\ \\text{fm} = 4.55\\times 10^{-14}\\ \\text{m}$; $b(60^\\circ) \\approx 19.7\\ \\text{fm} = 1.97\\times 10^{-14}\\ \\text{m}$; large-angle deflections occur only in the near-nucleus region of order $10^{-14}\\ \\text{m}$, and the nucleus is far smaller than the atom (about $10^{-15}\\sim 10^{-14}\\ \\text{m}$).',
    tags: ['Rutherford scattering', 'impact parameter', 'nuclear model'],
  },

  'atomic-physics-p2': {
    title: 'Hydrogen Energy-Level Transitions and the Wavelength of the Hα Line',
    question:
      'The energy levels of the hydrogen atom are $E_n = -\\dfrac{13.6\\ \\text{eV}}{n^2}$. Find: (1) the energies of the $n = 2$ and $n = 3$ levels; (2) the energy and wavelength of the photon emitted when the electron drops from $n = 3$ to $n = 2$ (the $H_\\alpha$ line of the Balmer series; take $hc = 1240\\ \\text{eV}\\cdot\\text{nm}$); (3) the ionisation energy of hydrogen in its ground state.',
    hints: [
      'Substitute $n = 2, 3$ directly into the level formula, keeping in mind that the energies are negative.',
      'The Bohr frequency condition $h\\nu = E_{n_2} - E_{n_1}$ gives the photon energy; then $\\lambda = hc/\\Delta E$ gives the wavelength.',
      'Ionisation corresponds to the electron going from $n = 1$ to $n \\to \\infty$ ($E_\\infty = 0$).',
    ],
    solution: [
      {
        title: 'Computing the level energies',
        detail:
          '$$E_2 = -\\frac{13.6}{2^2} = -3.40\\ \\text{eV},\\qquad E_3 = -\\frac{13.6}{3^2} \\approx -1.51\\ \\text{eV}$$',
      },
      {
        title: 'Energy and wavelength of the transition photon',
        detail:
          'By the Bohr frequency condition the emitted photon has energy\\n$$\\Delta E = E_3 - E_2 = -1.51 - (-3.40) = 1.89\\ \\text{eV}$$\\nwith wavelength\\n$$\\lambda = \\frac{hc}{\\Delta E} = \\frac{1240\\ \\text{eV}\\cdot\\text{nm}}{1.89\\ \\text{eV}} \\approx 656\\ \\text{nm}$$\\nwhich lies at the red end of the visible spectrum — the $H_\\alpha$ line of the Balmer series.',
      },
      {
        title: 'Ground-state ionisation energy',
        detail:
          'Ionisation means moving the electron from the ground state $E_1 = -13.6\\ \\text{eV}$ to $E_\\infty = 0$, so the minimum energy required is\\n$$E_{\\text{ion}} = 0 - E_1 = 13.6\\ \\text{eV}$$\\nin agreement with the measured ionisation energy of hydrogen, an important confirmation of the Bohr model.',
      },
    ],
    answer:
      '$E_2 = -3.40\\ \\text{eV}$ and $E_3 \\approx -1.51\\ \\text{eV}$; the $H_\\alpha$ photon has energy $\\Delta E \\approx 1.89\\ \\text{eV}$ and wavelength $\\lambda \\approx 656\\ \\text{nm}$; the ground-state ionisation energy is $13.6\\ \\text{eV}$.',
    tags: ['Bohr model', 'energy-level transition', 'hydrogen spectrum'],
  },

  'atomic-physics-p3': {
    title: 'The Hβ Line and the Balmer Limit from the Rydberg Formula',
    question:
      'Take the Rydberg constant for hydrogen $R_H = 1.097\\times 10^7\\ \\text{m}^{-1}$. Using the Rydberg formula $\\dfrac{1}{\\lambda} = R_H\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)$, find: (1) the wavelength of the second Balmer line $H_\\beta$ ($n_i = 4 \\to n_f = 2$); (2) the series limit wavelength $\\lambda_{\\lim}$ of the Balmer series; (3) the photon energy at the limit and its physical meaning (take $hc = 1240\\ \\text{eV}\\cdot\\text{nm}$).',
    hints: [
      '$H_\\beta$ corresponds to $n_i = 4$ and $n_f = 2$; first put over a common denominator, $\\dfrac{1}{4} - \\dfrac{1}{16} = \\dfrac{3}{16}$.',
      'The series limit is obtained by letting $n_i \\to \\infty$, so the second term tends to zero.',
      'The limiting photon energy is the minimum energy needed to ionise the electron from $n_f = 2$.',
    ],
    solution: [
      {
        title: 'Wavelength of the Hβ line',
        detail:
          '$$\\frac{1}{\\lambda} = R_H\\left(\\frac{1}{2^2} - \\frac{1}{4^2}\\right) = R_H\\left(\\frac{1}{4} - \\frac{1}{16}\\right) = \\frac{3R_H}{16} = \\frac{3 \\times 1.097\\times 10^7}{16} \\approx 2.057\\times 10^6\\ \\text{m}^{-1}$$\\n$$\\lambda = \\frac{1}{2.057\\times 10^6} \\approx 4.862\\times 10^{-7}\\ \\text{m} = 486.2\\ \\text{nm}$$\\na cyan line in the visible region.',
      },
      {
        title: 'Series limit of the Balmer series',
        detail:
          'Letting $n_i \\to \\infty$:\\n$$\\frac{1}{\\lambda_{\\lim}} = \\frac{R_H}{n_f^2} = \\frac{R_H}{4} \\quad\\Rightarrow\\quad \\lambda_{\\lim} = \\frac{4}{R_H} = \\frac{4}{1.097\\times 10^7} \\approx 3.646\\times 10^{-7}\\ \\text{m} = 364.6\\ \\text{nm}$$\\nAs $n_i$ increases the lines crowd together towards this limit.',
      },
      {
        title: 'Physical meaning of the limiting photon energy',
        detail:
          '$$\\Delta E_{\\lim} = \\frac{hc}{\\lambda_{\\lim}} = \\frac{1240\\ \\text{eV}\\cdot\\text{nm}}{364.6\\ \\text{nm}} \\approx 3.40\\ \\text{eV}$$\\nwhich is exactly $|E_2| = 13.6/4\\ \\text{eV}$. It corresponds to an electron falling from the ionisation continuum ($E = 0$) directly onto the $n = 2$ level, i.e. it is the ionisation energy of hydrogen in the $n = 2$ state; beyond the limit there are no longer discrete lines but a continuous spectrum.',
      },
    ],
    answer:
      'The $H_\\beta$ wavelength is $\\lambda \\approx 486.2\\ \\text{nm}$; the Balmer limit is $\\lambda_{\\lim} \\approx 364.6\\ \\text{nm}$; the limiting photon energy is $\\approx 3.40\\ \\text{eV}$, the ionisation energy of the $n = 2$ level.',
    tags: ['Rydberg formula', 'Balmer series', 'series limit'],
  },

  'atomic-physics-p4': {
    title: 'X-ray Short-Wavelength Limit, the Cu Kα Line and the Threshold for Characteristic Spectra',
    question:
      'An X-ray tube accelerates electrons through $V = 40\\ \\text{kV}$ onto a copper target ($Z = 29$). Take $\\dfrac{hc}{e} = 1.24\\ \\text{nm}\\cdot\\text{kV}$ and $R_\\infty hc = 13.6\\ \\text{eV}$. (1) Find the short-wavelength limit $\\lambda_{\\min}$ of the continuous spectrum. (2) Using the hydrogen-like approximation $h\\nu_{K_\\alpha} \\approx \\dfrac{3}{4}R_\\infty hc\\,(Z-1)^2$, find the photon energy and wavelength of the copper $K_\\alpha$ line. (3) Estimate the binding energy of a copper K-shell electron with the same approximation, $E_K \\approx 13.6(Z-1)^2\\ \\text{eV}$, explain why the tube voltage must exceed a threshold before characteristic lines appear, and compare $E_K$ with the $K_\\alpha$ photon energy.',
    hints: [
      'The short-wavelength limit corresponds to the electron converting all of its kinetic energy $eV$ into a single photon: $eV = hc/\\lambda_{\\min}$, independent of the target material.',
      'The hydrogen-like version of Moseley\u2019s law treats the L→K transition as an $n = 2 \\to n = 1$ transition in a hydrogen-like ion with effective nuclear charge $(Z-1)e$, so the level difference is $\\propto (Z-1)^2\\left(1 - \\dfrac{1}{4}\\right)$.',
      'Characteristic lines require a K-shell vacancy to be created first, i.e. $eV \\ge E_K$; ejecting an electron into the continuum costs more energy than exciting it to the L shell.',
    ],
    solution: [
      {
        title: 'Short-wavelength limit of the continuous spectrum (Duane-Hunt law)',
        detail:
          'At most a single electron can turn its whole kinetic energy $eV$ into one photon:\\n$$eV = \\frac{hc}{\\lambda_{\\min}} \\quad\\Rightarrow\\quad \\lambda_{\\min} = \\frac{hc}{eV} = \\frac{1.24\\ \\text{nm}\\cdot\\text{kV}}{40\\ \\text{kV}} = 0.031\\ \\text{nm} = 3.1\\times 10^{-11}\\ \\text{m}$$\\n$\\lambda_{\\min}$ depends only on the tube voltage, not on the target.',
      },
      {
        title: 'Energy and wavelength of the copper Kα line (Moseley\u2019s law)',
        detail:
          'With effective nuclear charge $Z_{\\text{eff}} = Z - 1 = 28$:\\n$$h\\nu_{K_\\alpha} \\approx \\frac{3}{4} \\times 13.6\\ \\text{eV} \\times 28^2 = \\frac{3}{4} \\times 13.6 \\times 784\\ \\text{eV} \\approx 8.0\\ \\text{keV}$$\\nwith wavelength\\n$$\\lambda = \\frac{hc}{h\\nu} = \\frac{1240\\ \\text{eV}\\cdot\\text{nm}}{8.0\\times 10^3\\ \\text{eV}} \\approx 0.155\\ \\text{nm}$$\\nThis agrees closely with the measured copper $K_\\alpha$ wavelength of $0.154\\ \\text{nm}$, illustrating the quantitative success of Moseley\u2019s law $\\sqrt{\\nu} \\propto (Z-1)$.',
      },
      {
        title: 'K-shell binding energy and the threshold for characteristic lines',
        detail:
          'Ionising a K-shell electron into the continuum, the hydrogen-like approximation gives\\n$$E_K \\approx 13.6\\,(Z-1)^2\\ \\text{eV} = 13.6 \\times 784\\ \\text{eV} \\approx 10.7\\ \\text{keV}$$\\nHence only when $eV \\ge E_K$, that is $V \\gtrsim 10.7\\ \\text{kV}$, can the electrons knock out K-shell electrons and create vacancies, and only then do characteristic lines appear; the $40\\ \\text{kV}$ of this problem is well above the threshold. Note that $E_K \\approx 10.7\\ \\text{keV} > h\\nu_{K_\\alpha} \\approx 8.0\\ \\text{keV}$, because ionisation ends in a free state ($E = 0$) whereas the $K_\\alpha$ transition ends in the still-bound L shell ($n = 2$); the difference between the two is exactly the L-shell binding energy.',
      },
    ],
    answer:
      '$\\lambda_{\\min} = 0.031\\ \\text{nm}$; for copper $K_\\alpha$, $h\\nu \\approx 8.0\\ \\text{keV}$ and $\\lambda \\approx 0.155\\ \\text{nm}$; $E_K \\approx 10.7\\ \\text{keV}$, so the threshold voltage is about $10.7\\ \\text{kV}$, and $E_K > h\\nu_{K_\\alpha}$ (the ionisation ends in the continuum, the transition ends in the L shell).',
    tags: ['X-rays', 'Moseley\u2019s law', 'short-wavelength limit', 'characteristic spectrum'],
  },

  'atomic-physics-p5': {
    title: 'Decay Constant, Activity and Mean Lifetime of Iodine-131',
    question:
      'The medical radionuclide $^{131}\\text{I}$ has a half-life of $T_{1/2} = 8.0$ days. A sample has an initial activity $A_0 = 3.2\\times 10^8\\ \\text{Bq}$. Find: (1) the decay constant $\\lambda$ (in $\\text{d}^{-1}$ and in $\\text{s}^{-1}$); (2) the activity $A$ and the surviving fraction $N/N_0$ after 32 days; (3) the mean lifetime $\\tau$.',
    hints: [
      'The decay constant is related to the half-life by $\\lambda = \\ln 2 / T_{1/2} = 0.693/T_{1/2}$.',
      '32 days is exactly 4 half-lives, so $N/N_0 = (1/2)^4$ can be read off directly; the activity decays by the same exponential law, $A = A_0 e^{-\\lambda t}$.',
      'The mean lifetime is $\\tau = 1/\\lambda = T_{1/2}/\\ln 2$.',
    ],
    solution: [
      {
        title: 'The decay constant',
        detail:
          '$$\\lambda = \\frac{\\ln 2}{T_{1/2}} = \\frac{0.693}{8.0\\ \\text{d}} \\approx 0.0866\\ \\text{d}^{-1}$$\\nConverting to seconds, $T_{1/2} = 8.0 \\times 86400\\ \\text{s} = 6.912\\times 10^5\\ \\text{s}$,\\n$$\\lambda = \\frac{0.693}{6.912\\times 10^5\\ \\text{s}} \\approx 1.0\\times 10^{-6}\\ \\text{s}^{-1}$$',
      },
      {
        title: 'Activity and surviving fraction after 32 days',
        detail:
          '$t = 32$ days $= 4\\,T_{1/2}$, so by the exponential decay law\\n$$\\frac{N}{N_0} = \\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16} = 6.25\\%$$\\nThe activity is proportional to the number of nuclei and decays by the same factor:\\n$$A = \\frac{A_0}{16} = \\frac{3.2\\times 10^8}{16}\\ \\text{Bq} = 2.0\\times 10^7\\ \\text{Bq}$$',
      },
      {
        title: 'Mean lifetime',
        detail:
          '$$\\tau = \\frac{1}{\\lambda} = \\frac{T_{1/2}}{\\ln 2} = \\frac{8.0}{0.693}\\ \\text{d} \\approx 11.5\\ \\text{d}$$\\nThe mean lifetime exceeds the half-life because the long tail of the exponential distribution pulls the average up, thanks to the few long-lived nuclei.',
      },
    ],
    answer:
      '$\\lambda \\approx 0.0866\\ \\text{d}^{-1} = 1.0\\times 10^{-6}\\ \\text{s}^{-1}$; after 32 days $N/N_0 = 1/16 = 6.25\\%$ and $A = 2.0\\times 10^7\\ \\text{Bq}$; the mean lifetime is $\\tau \\approx 11.5$ days.',
    tags: ['radioactive decay', 'half-life', 'activity'],
  },

  'atomic-physics-p6': {
    title: 'Splitting of the Sodium D Doublet and Landé g Factors',
    question:
      'The valence electron of a sodium atom is in the $3p$ state ($l = 1$, $s = 1/2$); spin-orbit coupling splits the level, according to the total angular momentum quantum number $j$, into $3p_{1/2}$ and $3p_{3/2}$, and transitions to $3s_{1/2}$ produce the famous D doublet: $D_1\\ (\\lambda_1 = 589.6\\ \\text{nm})$ and $D_2\\ (\\lambda_2 = 589.0\\ \\text{nm})$. Take $hc = 1240\\ \\text{eV}\\cdot\\text{nm}$. Find: (1) the possible values of $j$ for the $3p$ state and the corresponding magnitudes $|\\vec{J}|$; (2) the energy difference $\\Delta E$ of the D doublet (using $\\Delta E \\approx \\dfrac{hc\\,\\Delta\\lambda}{\\lambda^2}$); (3) the Landé g factors $g_J = 1 + \\dfrac{J(J+1) + S(S+1) - L(L+1)}{2J(J+1)}$ of the $3p_{3/2}$ and $3p_{1/2}$ levels, and the Zeeman splitting formula.',
    hints: [
      'The total angular momentum is $\\vec{J} = \\vec{L} + \\vec{S}$; for $l = 1$ and $s = 1/2$ we have $j = l \\pm 1/2$, with magnitude $|\\vec{J}| = \\sqrt{j(j+1)}\\,\\hbar$.',
      'The wavelength difference of the doublet is very small, so differentiate $E = hc/\\lambda$: $|\\Delta E| = hc\\,\\Delta\\lambda/\\lambda^2$, taking $\\lambda$ as the mean value $589.3\\ \\text{nm}$.',
      'When computing $g_J$ note that $L(L+1) = 1\\times 2 = 2$ and $S(S+1) = 3/4$, and substitute $J(J+1) = 15/4$ ($j = 3/2$) and $J(J+1) = 3/4$ ($j = 1/2$) respectively.',
    ],
    solution: [
      {
        title: 'Possible values of the total angular momentum',
        detail:
          'For $l = 1$ and $s = 1/2$, $j = l \\pm 1/2 = 3/2$ or $1/2$:\\n$$j = \\frac{3}{2}:\\quad |\\vec{J}| = \\sqrt{\\frac{3}{2}\\times\\frac{5}{2}}\\,\\hbar = \\frac{\\sqrt{15}}{2}\\,\\hbar \\approx 1.94\\,\\hbar$$\\n$$j = \\frac{1}{2}:\\quad |\\vec{J}| = \\sqrt{\\frac{1}{2}\\times\\frac{3}{2}}\\,\\hbar = \\frac{\\sqrt{3}}{2}\\,\\hbar \\approx 0.87\\,\\hbar$$\\nSpin-orbit coupling $H_{so} \\propto \\vec{L}\\cdot\\vec{S}$ splits the levels with $j = 3/2$ and $j = 1/2$, while the $3s$ state ($l = 0$, $j = 1/2$) is not split.',
      },
      {
        title: 'Energy difference of the D doublet',
        detail:
          'Take $\\lambda \\approx 589.3\\ \\text{nm}$ and $\\Delta\\lambda = 589.6 - 589.0 = 0.6\\ \\text{nm}$:\\n$$\\Delta E \\approx \\frac{hc\\,\\Delta\\lambda}{\\lambda^2} = \\frac{1240\\ \\text{eV}\\cdot\\text{nm} \\times 0.6\\ \\text{nm}}{(589.3\\ \\text{nm})^2} = \\frac{744}{3.47\\times 10^5}\\ \\text{eV} \\approx 2.1\\times 10^{-3}\\ \\text{eV} = 2.1\\ \\text{meV}$$\\nso the D doublet arises from a fine-structure splitting of only about $2\\ \\text{meV}$, corresponding to a wavelength difference of about $0.6\\ \\text{nm}$.',
      },
      {
        title: 'Landé g factors and Zeeman splitting',
        detail:
          'For $3p_{3/2}$ ($L = 1, S = 1/2, J = 3/2$):\\n$$g_J = 1 + \\frac{\\frac{15}{4} + \\frac{3}{4} - 2}{2 \\times \\frac{15}{4}} = 1 + \\frac{1}{3} = \\frac{4}{3}$$\\nFor $3p_{1/2}$ ($J = 1/2$):\\n$$g_J = 1 + \\frac{\\frac{3}{4} + \\frac{3}{4} - 2}{2 \\times \\frac{3}{4}} = 1 - \\frac{1}{3} = \\frac{2}{3}$$\\nIn the Zeeman effect the extra energy of a level is $\\Delta E = g_J\\mu_B B m_J$ ($m_J = -J, \\dots, J$). Because the two levels have different $g_J$, their splitting patterns in a magnetic field differ — the classic manifestation of the "anomalous Zeeman effect", which can only be explained once electron spin is introduced.',
      },
    ],
    answer:
      'For $j = 3/2$, $|\\vec{J}| = \\dfrac{\\sqrt{15}}{2}\\hbar$; for $j = 1/2$, $|\\vec{J}| = \\dfrac{\\sqrt{3}}{2}\\hbar$; the D doublet has $\\Delta E \\approx 2.1\\ \\text{meV}$; $g(3p_{3/2}) = 4/3$, $g(3p_{1/2}) = 2/3$, and the Zeeman splitting is $\\Delta E = g_J\\mu_B B m_J$.',
    tags: ['electron spin', 'spin-orbit coupling', 'alkali doublet', 'Landé g factor'],
  },
};

export default map;
