import type { FormulaGroup } from '@/types';

const map: Record<string, Partial<FormulaGroup>> = {
  'thermal-physics-fg1': {
    name: 'Kinetic Theory of Gases',
    formulas: [
      {
        id: 'thermal-physics-f1',
        group: 'Equation of State',
        name: 'Ideal Gas Equation of State',
        latex: 'pV = nRT = NkT,\\qquad p = nkT',
        note: '$n$ is the amount of substance, $N$ the total number of molecules and $k = R/N_A$ the Boltzmann constant; valid only for equilibrium states.',
      },
      {
        id: 'thermal-physics-f2',
        group: 'Microscopic Origin of Pressure',
        name: 'Pressure Formula for an Ideal Gas',
        latex: 'p = \\frac{1}{3}nm\\overline{v^2} = \\frac{2}{3}n\\overline{\\varepsilon_k}',
        note: '$n$ is the molecular number density and $m$ the molecular mass; pressure comes from the statistical average of the momentum transferred to the walls in molecular collisions.',
      },
      {
        id: 'thermal-physics-f3',
        group: 'Microscopic Meaning of Temperature',
        name: 'Mean Translational Kinetic Energy and Temperature',
        latex: '\\overline{\\varepsilon_t} = \\frac{1}{2}m\\overline{v^2} = \\frac{3}{2}kT',
        note: 'Temperature measures the mean translational kinetic energy per molecule and is independent of the species of gas.',
      },
      {
        id: 'thermal-physics-f4',
        group: 'Characteristic Speeds',
        name: 'Root-Mean-Square Speed',
        latex: 'v_\\text{rms} = \\sqrt{\\overline{v^2}} = \\sqrt{\\frac{3kT}{m}} = \\sqrt{\\frac{3RT}{M}}',
        note: 'The three characteristic speeds satisfy $v_p < \\overline{v} < v_\\text{rms}$.',
      },
      {
        id: 'thermal-physics-f5',
        group: 'Statistical Distribution',
        name: 'Maxwell Speed Distribution',
        latex: 'f(v) = 4\\pi\\left(\\frac{m}{2\\pi kT}\\right)^{3/2} v^2\\, e^{-mv^2/(2kT)}',
        note: 'Equilibrium speed probability density; from it one obtains $v_p = \\sqrt{2kT/m}$ and $\\overline{v} = \\sqrt{8kT/(\\pi m)}$.',
      },
      {
        id: 'thermal-physics-f6',
        group: 'Common Constants',
        name: 'Gas Constant and Boltzmann Constant',
        latex: 'R = 8.314\\ \\text{J/(mol}\\cdot\\text{ K)},\\quad N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1},\\quad k = \\frac{R}{N_A} = 1.38 \\times 10^{-23}\\ \\text{J/K}',
        note: 'Whenever proportional relations are involved (equations of state, distribution functions and so on) the temperature must be on the Kelvin scale.',
      },
    ],
  },
  'thermal-physics-fg2': {
    name: 'First Law of Thermodynamics and Adiabatic Processes',
    formulas: [
      {
        id: 'thermal-physics-f7',
        group: 'First Law',
        name: 'First Law of Thermodynamics',
        latex: '\\Delta U = Q - W,\\qquad dU = \\delta Q - \\delta W',
        note: '$W$ is the work done by the system; internal energy is a state function, whereas $Q$ and $W$ are process quantities.',
      },
      {
        id: 'thermal-physics-f8',
        group: 'Work',
        name: 'Volume Work in a Quasi-Static Process',
        latex: 'W = \\int_{V_1}^{V_2} p\\,dV',
        note: 'Isobaric: $W = p\\Delta V$; isothermal ideal gas: $W = nRT\\ln(V_2/V_1)$; isochoric: $W = 0$.',
      },
      {
        id: 'thermal-physics-f9',
        group: 'Internal Energy and Heat Capacity',
        name: 'Internal Energy and Heat Capacity of an Ideal Gas',
        latex: 'U = \\frac{i}{2}nRT,\\qquad C_V = \\frac{i}{2}nR,\\qquad C_p = \\frac{i+2}{2}nR',
        note: 'Degrees of freedom: monatomic $i = 3$, rigid diatomic $i = 5$; the internal energy of an ideal gas depends only on temperature.',
      },
      {
        id: 'thermal-physics-f10',
        group: 'Relations between Heat Capacities',
        name: 'Mayer’s Relation',
        latex: 'C_p - C_V = nR,\\qquad \\gamma = \\frac{C_p}{C_V} = \\frac{i+2}{i}',
        note: 'Valid only for ideal gases; monatomic $\\gamma = 5/3$, rigid diatomic $\\gamma = 7/5$.',
      },
      {
        id: 'thermal-physics-f11',
        group: 'Adiabatic Process',
        name: 'Poisson Equations (Reversible Adiabatic)',
        latex: 'pV^{\\gamma} = \\text{常量},\\qquad TV^{\\gamma-1} = \\text{常量},\\qquad T^{\\gamma}p^{1-\\gamma} = \\text{常量}',
        note: 'Applies only to quasi-static reversible adiabatic processes; adiabatic expansion does work at the cost of cooling.',
      },
      {
        id: 'thermal-physics-f12',
        group: 'Adiabatic Work',
        name: 'Work in an Adiabatic Process',
        latex: 'W = -\\Delta U = -nC_V(T_2 - T_1)',
        note: 'Since $Q = 0$, the work is supplied entirely by the change in internal energy; adiabats are steeper than isotherms.',
      },
    ],
  },
  'thermal-physics-fg3': {
    name: 'Entropy and Thermodynamic Cycles',
    formulas: [
      {
        id: 'thermal-physics-f13',
        group: 'Entropy',
        name: 'Clausius Definition of Entropy',
        latex: 'dS = \\frac{\\delta Q_\\text{rev}}{T},\\qquad \\Delta S = \\int_A^B \\frac{\\delta Q_\\text{rev}}{T}',
        note: 'The integral must be taken along a reversible path; entropy is a state function and is independent of the path.',
      },
      {
        id: 'thermal-physics-f14',
        group: 'Second Law',
        name: 'Clausius Inequality and the Increase of Entropy',
        latex: '\\Delta S \\ge \\int \\frac{\\delta Q}{T},\\qquad \\Delta S_{\\text{孤立}} \\ge 0',
        note: 'Equality holds for reversible processes; in an isolated system the entropy of any spontaneous (irreversible) process must increase.',
      },
      {
        id: 'thermal-physics-f15',
        group: 'Microscopic Meaning of Entropy',
        name: 'Boltzmann Relation',
        latex: 'S = k\\ln\\Omega',
        note: '$\\Omega$ is the number of microstates belonging to the macrostate; entropy is a statistical measure of the disorder of the system.',
      },
      {
        id: 'thermal-physics-f16',
        group: 'Cycles',
        name: 'Heat-Engine Efficiency',
        latex: '\\eta = \\frac{W}{Q_1} = 1 - \\frac{Q_2}{Q_1}',
        note: '$Q_1$ is the heat absorbed from the hot reservoir and $Q_2$ the heat rejected to the cold reservoir; over one cycle $\\Delta U = 0$ and $W = Q_1 - Q_2$.',
      },
      {
        id: 'thermal-physics-f17',
        group: 'Cycles',
        name: 'Carnot Cycle Efficiency',
        latex: '\\eta_C = 1 - \\frac{T_2}{T_1}',
        note: 'Determined solely by the two reservoir temperatures and independent of the working substance; it is the upper limit for any heat engine between the same temperature limits.',
      },
      {
        id: 'thermal-physics-f18',
        group: 'Reverse Cycles',
        name: 'Coefficient of Performance of Refrigerators and Heat Pumps',
        latex: '\\varepsilon = \\frac{Q_2}{W} = \\frac{T_2}{T_1 - T_2},\\qquad \\varepsilon_h = \\frac{Q_1}{W} = \\varepsilon + 1',
        note: 'The reversible (reverse-Carnot) case; the coefficient of performance may exceed 1 without violating energy conservation.',
      },
    ],
  },
};

export default map;
