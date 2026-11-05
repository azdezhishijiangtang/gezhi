import type { FormulaGroup } from '@/types';

const map: Record<string, Partial<FormulaGroup>> = {
  'nuclear-particle-physics-fg1': {
    name: 'Basic Properties of the Atomic Nucleus',
    formulas: [
      {
        id: 'nuclear-particle-physics-f1',
        group: 'Nuclear Size',
        name: 'Nuclear Radius and Density',
        latex: 'R = r_0 A^{1/3},\\quad r_0 \\approx 1.2\\ \\text{fm},\\qquad \\rho = \\frac{3m_u}{4\\pi r_0^3} \\approx 2.3\\times 10^{17}\\ \\text{kg/m}^3',
        note: 'Direct consequence of nuclear-force saturation: the density is independent of $A$; $1\\ \\text{fm} = 10^{-15}\\ \\text{m}$',
      },
      {
        id: 'nuclear-particle-physics-f2',
        group: 'Mass and Energy',
        name: 'Atomic Mass Unit and Mass Defect',
        latex: '1\\ \\text{u} = \\frac{1}{12}m(^{12}\\text{C}) = 1.6605\\times 10^{-27}\\ \\text{kg} = 931.5\\ \\text{MeV}/c^2',
        note: '$\\Delta m = Zm_p + Nm_n - M_{\\text{nuc}}$; when atomic masses are used the electron masses cancel automatically',
      },
      {
        id: 'nuclear-particle-physics-f3',
        group: 'Mass and Energy',
        name: 'Binding Energy and Binding Energy per Nucleon',
        latex: 'B = \\left[Z\\,M(^{1}\\text{H}) + N\\,m_n - M_{\\text{atom}}(A,Z)\\right]c^2,\\qquad \\varepsilon = \\frac{B}{A}',
        note: 'The binding energy per nucleon peaks near $8.8\\ \\text{MeV}$ ($A \\approx 56$); for $^{238}\\text{U}$ it is about $7.6\\ \\text{MeV}$',
      },
      {
        id: 'nuclear-particle-physics-f4',
        group: 'Mass Formula',
        name: 'Weizsäcker Semi-Empirical Mass Formula',
        latex: 'B = a_v A - a_s A^{2/3} - a_c\\frac{Z(Z-1)}{A^{1/3}} - a_a\\frac{(A-2Z)^2}{A} + \\delta',
        note: 'Common coefficients (MeV): $a_v = 15.75$, $a_s = 17.8$, $a_c = 0.711$, $a_a = 23.7$, $\\delta = \\pm 34A^{-3/4}$',
      },
      {
        id: 'nuclear-particle-physics-f5',
        group: 'Mass Formula',
        name: 'β-Stability Line',
        latex: 'Z_{\\text{稳定}} \\approx \\frac{A}{2 + \\dfrac{a_c}{2a_a}A^{2/3}} \\approx \\frac{A}{2 + 0.015\\,A^{2/3}}',
        note: 'Obtained by extremising the mass formula with respect to $Z$; for heavy nuclei $Z/A < 1/2$, favouring a neutron excess',
      },
      {
        id: 'nuclear-particle-physics-f6',
        group: 'Coulomb Barrier',
        name: 'Coulomb Barrier for Charged Particles',
        latex: 'E_C = \\frac{Z_1 Z_2 e^2}{4\\pi\\varepsilon_0 R},\\quad R \\approx r_0\\left(A_1^{1/3} + A_2^{1/3}\\right),\\quad \\frac{e^2}{4\\pi\\varepsilon_0} \\approx 1.44\\ \\text{MeV}\\cdot\\text{fm}',
        note: 'About $0.44\\ \\text{MeV}$ for the D–T reaction; fusion proceeds through tunnelling and the Gamow peak',
      },
    ],
  },
  'nuclear-particle-physics-fg2': {
    name: 'Decay, Reactions and Nuclear Energy',
    formulas: [
      {
        id: 'nuclear-particle-physics-f7',
        group: 'Decay Law',
        name: 'Exponential Decay Law and Half-Life',
        latex: 'N(t) = N_0 e^{-\\lambda t},\\qquad T_{1/2} = \\frac{\\ln 2}{\\lambda},\\qquad \\tau = \\frac{1}{\\lambda}',
        note: 'The decay probability per unit time is constant; $\\tau = T_{1/2}/\\ln 2$',
      },
      {
        id: 'nuclear-particle-physics-f8',
        group: 'Decay Law',
        name: 'Activity and Chain Equilibrium',
        latex: 'A = \\lambda N,\\quad 1\\ \\text{Ci} = 3.7\\times 10^{10}\\ \\text{Bq};\\qquad \\frac{A_2}{A_1} = \\frac{\\lambda_2}{\\lambda_2 - \\lambda_1}\\ (\\lambda_1 < \\lambda_2)',
        note: 'In secular equilibrium $A_2 \\approx A_1$; transient equilibrium is exploited in medical isotope generators',
      },
      {
        id: 'nuclear-particle-physics-f9',
        group: 'Decay Energy',
        name: 'α-Decay Energy and Kinetic Energy Sharing',
        latex: 'Q_\\alpha = \\left[M(P) - M(D) - M(^{4}\\text{He})\\right]c^2,\\qquad E_\\alpha = Q_\\alpha\\frac{A-4}{A}',
        note: 'In two-body decay the kinetic energy is shared in inverse proportion to mass; e.g. $^{238}\\text{U}$: $Q \\approx 4.27\\ \\text{MeV}$, $E_\\alpha \\approx 4.2\\ \\text{MeV}$',
      },
      {
        id: 'nuclear-particle-physics-f10',
        group: 'Decay Energy',
        name: 'Q-Value Conditions for β Decay',
        latex: 'Q_{\\beta^-} = \\left[M(A,Z) - M(A,Z+1)\\right]c^2,\\quad Q_{\\beta^+} = \\left[M(A,Z) - M(A,Z-1) - 2m_e\\right]c^2',
        note: 'Electron capture gives $Q_{\\text{EC}} = [M(A,Z) - M(A,Z-1)]c^2$, larger than $Q_{\\beta^+}$ by $2m_ec^2 = 1.022\\ \\text{MeV}$',
      },
      {
        id: 'nuclear-particle-physics-f11',
        group: 'Nuclear Reactions',
        name: 'Reaction Energy Q and Threshold Energy',
        latex: 'Q = \\left[(m_a + M_A) - (m_b + M_B)\\right]c^2,\\qquad E_{\\text{th}} = -Q\\left(1 + \\frac{m_a}{M_A}\\right)',
        note: 'Exact relativistic form $E_{\\text{th}} = \\dfrac{[(m_b+M_B)^2 - (m_a+M_A)^2]c^2}{2M_A}$; for $Q>0$ there is no threshold',
      },
      {
        id: 'nuclear-particle-physics-f12',
        group: 'Nuclear Reactions',
        name: 'Reaction Cross Section and Fission Energy',
        latex: 'R = \\Phi\\,N\\,\\sigma,\\quad 1\\ \\text{b} = 10^{-28}\\ \\text{m}^2;\\qquad E_{\\text{裂变}} \\approx 200\\ \\text{MeV},\\quad k_{\\text{eff}} = \\eta\\,\\varepsilon\\,p\\,f',
        note: 'A delayed-neutron fraction $\\beta \\approx 0.0065$ makes the chain reaction controllable; $k_{\\text{eff}} = 1$ is critical',
      },
    ],
  },
  'nuclear-particle-physics-fg3': {
    name: 'Particle Physics and Experimental Methods',
    formulas: [
      {
        id: 'nuclear-particle-physics-f13',
        group: 'Wave–Particle Duality',
        name: 'de Broglie Wavelength',
        latex: '\\lambda = \\frac{h}{p} = \\frac{\\hbar c}{\\beta\\gamma\\,mc^2},\\qquad \\hbar c \\approx 197.3\\ \\text{MeV}\\cdot\\text{fm}',
        note: 'Shorter wavelengths probe smaller scales, so only high-energy probes can resolve structure inside nucleons',
      },
      {
        id: 'nuclear-particle-physics-f14',
        group: 'Wave–Particle Duality',
        name: 'Compton Scattering Wavelength Shift',
        latex: '\\Delta\\lambda = \\lambda\' - \\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta),\\qquad \\lambda_C = \\frac{h}{m_e c} \\approx 2.43\\ \\text{pm}',
        note: 'Elastic scattering of a photon off a free electron — direct evidence that photons carry momentum',
      },
      {
        id: 'nuclear-particle-physics-f15',
        group: 'Hadron Classification',
        name: 'Gell-Mann–Nishijima Relation (Eightfold Way)',
        latex: 'Q = I_3 + \\frac{Y}{2},\\qquad Y = B + S',
        note: 'Plotting states against $I_3$ and $Y$ yields the meson octet, the baryon octet and the decuplet',
      },
      {
        id: 'nuclear-particle-physics-f16',
        group: 'Conservation Laws',
        name: 'Conservation of Additive Quantum Numbers',
        latex: '\\sum Q,\\ \\sum B,\\ \\sum L_e = \\text{const};\\qquad \\sum S,\\ \\sum C,\\ \\sum B\' \\ \\text{仅强、电磁过程守恒}',
        note: 'Weak interactions can change flavour (strangeness etc.); judge a reaction by quantum numbers first, then by energy conditions',
      },
      {
        id: 'nuclear-particle-physics-f17',
        group: 'Relativistic Kinematics',
        name: 'Mass–Energy Relation and Threshold Applications',
        latex: 'E^2 = (pc)^2 + (mc^2)^2,\\qquad E_{\\text{th}} = \\frac{(m_n + m_e)^2 - m_p^2}{2m_p}c^2 \\approx 1.806\\ \\text{MeV}',
        note: 'The second expression is the threshold energy of $\\bar{\\nu}_e + p \\to n + e^+$, the basis of reactor neutrino detection',
      },
      {
        id: 'nuclear-particle-physics-f18',
        group: 'Experimental Methods',
        name: 'Magnetic Spectrometer Momentum and Cherenkov Angle',
        latex: 'p_\\perp\\,[\\text{GeV}/c] = 0.3\\,B\\,[\\text{T}]\\,R\\,[\\text{m}],\\qquad \\cos\\theta = \\frac{1}{n\\beta}\\ \\left(\\beta > \\frac{1}{n}\\right)',
        note: 'The first measures momentum and the second velocity; together they fix the mass and identify π/K/p',
      },
    ],
  },
};

export default map;
