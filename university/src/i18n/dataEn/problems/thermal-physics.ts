import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'thermal-physics-p1': {
    title: 'Constant-volume gas thermometer reading and the three temperature scales',
    question:
      'A constant-volume gas thermometer is calibrated with the ideal-gas temperature scale in the low-pressure limit; the pressure of the thermometric gas at the triple point ($T_\\text{tr} = 273.16\\ \\text{K}$) is $p_\\text{tr} = 500\\ \\text{Pa}$. After reaching thermal equilibrium with a system under test, the pressure is $p = 683\\ \\text{Pa}$. Find: (1) the thermodynamic temperature $T$ of the system; (2) the corresponding Celsius temperature $t$; (3) the corresponding Fahrenheit temperature $t_\\text{F}$.',
    hints: [
      'The ideal-gas scale is defined by $T = 273.16\\ \\text{K} \\times \\dfrac{p}{p_\\text{tr}}$ (low-pressure limit); at constant volume pressure is proportional to temperature.',
      'The relation between Celsius and thermodynamic temperature is $T(\\text{K}) = t(\\,^\\circ\\text{C}) + 273.15$.',
      'The Fahrenheit conversion is $t_\\text{F}(\\,^\\circ\\text{F}) = \\dfrac{9}{5}t(\\,^\\circ\\text{C}) + 32$.',
    ],
    solution: [
      {
        title: 'Finding $T$ from the ideal-gas scale',
        detail: 'In the low-pressure limit a constant-volume gas thermometer gives $T = 273.16\\ \\text{K} \\times \\dfrac{p}{p_\\text{tr}} = 273.16 \\times \\dfrac{683}{500} = 273.16 \\times 1.366 \\approx 373.14\\ \\text{K}$.',
      },
      {
        title: 'Converting to Celsius',
        detail: 'From $T = t + 273.15$, $t = 373.14 - 273.15 = 99.99\\ ^\\circ\\text{C} \\approx 100\\ ^\\circ\\text{C}$, just about the steam point of water.',
      },
      {
        title: 'Converting to Fahrenheit',
        detail: '$t_\\text{F} = \\dfrac{9}{5}t + 32 = \\dfrac{9}{5} \\times 99.99 + 32 \\approx 179.98 + 32 = 211.98\\ ^\\circ\\text{F} \\approx 212\\ ^\\circ\\text{F}$.',
      },
    ],
    answer: '$T \\approx 373.14\\ \\text{K}$, $t \\approx 100\\ ^\\circ\\text{C}$, $t_\\text{F} \\approx 212\\ ^\\circ\\text{F}$',
    tags: ['Ideal-gas temperature scale', 'Temperature conversion', 'Triple point'],
  },
  'thermal-physics-p2': {
    title: 'RMS speed, mean translational kinetic energy and number density of nitrogen molecules',
    question:
      'A container holds nitrogen in equilibrium ($M = 28 \\times 10^{-3}\\ \\text{kg/mol}$) at temperature $T = 300\\ \\text{K}$ and pressure $p = 1.0 \\times 10^{5}\\ \\text{Pa}$. Given $R = 8.314\\ \\text{J/(mol}\\cdot\\text{ K)}$ and $k = 1.38 \\times 10^{-23}\\ \\text{J/K}$. Find: (1) the root-mean-square speed $v_\\text{rms}$ of the molecules; (2) the mean translational kinetic energy $\\overline{\\varepsilon_t}$; (3) the molecular number density $n$.',
    hints: [
      'The rms speed in macroscopic quantities is $v_\\text{rms} = \\sqrt{\\dfrac{3RT}{M}}$; remember to convert the molar mass to $\\text{kg/mol}$.',
      'The mean translational kinetic energy depends only on temperature: $\\overline{\\varepsilon_t} = \\dfrac{3}{2}kT$, independent of the gas species.',
      'The number density follows from the microscopic form of the ideal-gas law $p = nkT$: $n = \\dfrac{p}{kT}$.',
    ],
    solution: [
      {
        title: 'RMS speed',
        detail: '$v_\\text{rms} = \\sqrt{\\dfrac{3RT}{M}} = \\sqrt{\\dfrac{3 \\times 8.314 \\times 300}{28 \\times 10^{-3}}} = \\sqrt{\\dfrac{7482.6}{0.028}} \\approx \\sqrt{2.67 \\times 10^{5}} \\approx 517\\ \\text{m/s}$.',
      },
      {
        title: 'Mean translational kinetic energy',
        detail: '$\\overline{\\varepsilon_t} = \\dfrac{3}{2}kT = \\dfrac{3}{2} \\times 1.38 \\times 10^{-23} \\times 300 \\approx 6.21 \\times 10^{-21}\\ \\text{J}$. This value is determined by temperature alone and is the same for every gas molecule at $300\\ \\text{K}$.',
      },
      {
        title: 'Molecular number density',
        detail: 'From $p = nkT$, $n = \\dfrac{p}{kT} = \\dfrac{1.0 \\times 10^{5}}{1.38 \\times 10^{-23} \\times 300} \\approx \\dfrac{1.0 \\times 10^{5}}{4.14 \\times 10^{-21}} \\approx 2.4 \\times 10^{25}\\ \\text{m}^{-3}$.',
      },
      {
        title: 'Consistency check',
        detail: 'Using the pressure formula: $p = \\dfrac{2}{3}n\\overline{\\varepsilon_t} = \\dfrac{2}{3} \\times 2.4 \\times 10^{25} \\times 6.21 \\times 10^{-21} \\approx 1.0 \\times 10^{5}\\ \\text{Pa}$, in agreement with the given pressure, so the conversions among the three macroscopic/microscopic quantities are self-consistent.',
      },
    ],
    answer: '$v_\\text{rms} \\approx 517\\ \\text{m/s}$, $\\overline{\\varepsilon_t} \\approx 6.21 \\times 10^{-21}\\ \\text{J}$, $n \\approx 2.4 \\times 10^{25}\\ \\text{m}^{-3}$',
    tags: ['RMS speed', 'Mean translational kinetic energy', 'Pressure formula', 'Kinetic theory'],
  },
  'thermal-physics-p3': {
    title: 'Isobaric expansion versus isochoric heating of a monatomic ideal gas',
    question:
      '$1\\ \\text{mol}$ of a monatomic ideal gas (degrees of freedom $i = 3$) is initially at $T_1 = 300\\ \\text{K}$, with $R = 8.314\\ \\text{J/(mol}\\cdot\\text{ K)}$. (1) If the gas expands isobarically to $T_2 = 400\\ \\text{K}$, find the increase in internal energy $\\Delta U$, the work done by the gas $W$ and the heat absorbed $Q$; (2) if instead it is heated isochorically to the same temperature, how much heat is absorbed? Compare the two processes and explain.',
    hints: [
      'The internal energy of an ideal gas depends only on temperature: $\\Delta U = \\dfrac{i}{2}nR\\Delta T$, the same for both paths.',
      'In an isobaric process the work done by the gas is $W = nR\\Delta T$ (also obtainable from $W = p\\Delta V$ with the equation of state).',
      'The first law $\\Delta U = Q - W$ gives $Q = \\Delta U + W$; for constant volume $W = 0$.',
    ],
    solution: [
      {
        title: 'Increase in internal energy (the same for both processes)',
        detail: '$\\Delta U = \\dfrac{i}{2}nR\\Delta T = \\dfrac{3}{2} \\times 1 \\times 8.314 \\times (400 - 300) \\approx 1247\\ \\text{J}$. Internal energy is a state function determined only by the initial and final temperatures, independent of path.',
      },
      {
        title: 'Work and heat for the isobaric process',
        detail: 'Isobaric expansion does work $W = nR\\Delta T = 1 \\times 8.314 \\times 100 \\approx 831\\ \\text{J}$; by the first law $Q = \\Delta U + W = 1247 + 831 \\approx 2078\\ \\text{J}$ (also verified with $Q = C_p\\Delta T = \\dfrac{5}{2}nR\\Delta T$, giving the same result).',
      },
      {
        title: 'Heat for the isochoric process',
        detail: 'For constant volume $W = 0$, so $Q = \\Delta U \\approx 1247\\ \\text{J}$, i.e. $Q = C_V\\Delta T = \\dfrac{3}{2}nR\\Delta T$.',
      },
      {
        title: 'Comparison and discussion',
        detail: 'For the same temperature rise, the isobaric heat absorption ($2078\\ \\text{J}$) exceeds the isochoric one ($1247\\ \\text{J}$); the excess $831\\ \\text{J} = nR\\Delta T$ is exactly the work done during expansion. This explains $C_p > C_V$ (Mayer\'s relation $C_p - C_V = nR$): at constant pressure part of the absorbed heat must be spent on work.',
      },
    ],
    answer: 'Isobaric: $\\Delta U \\approx 1247\\ \\text{J}$, $W \\approx 831\\ \\text{J}$, $Q \\approx 2078\\ \\text{J}$; isochoric: $W = 0$, $Q = \\Delta U \\approx 1247\\ \\text{J}$',
    tags: ['First law of thermodynamics', 'Isobaric process', 'Isochoric process', 'Mayer\'s relation'],
  },
  'thermal-physics-p4': {
    title: 'Adiabatic compression of a monatomic ideal gas: final temperature, pressure and work',
    question:
      '$1\\ \\text{mol}$ of a monatomic ideal gas (heat-capacity ratio $\\gamma = 5/3$) has initial volume $V_1 = 4.0\\ \\text{L}$ and temperature $T_1 = 300\\ \\text{K}$, and is compressed quasi-statically and adiabatically to $V_2 = 1.0\\ \\text{L}$. $R = 8.314\\ \\text{J/(mol}\\cdot\\text{ K)}$. Find: (1) the final temperature $T_2$; (2) the initial pressure $p_1$ and final pressure $p_2$; (3) the work $W^{\\prime}$ done by the surroundings on the gas during the process.',
    hints: [
      'An adiabatic process obeys Poisson\'s equation $TV^{\\gamma-1} = $ constant, so $T_2 = T_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma-1}$.',
      'The initial pressure follows from the equation of state $p_1 = \\dfrac{nRT_1}{V_1}$; the final pressure from $p_2 = p_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma}$, checked with $p_2 V_2 = nRT_2$.',
      'For an adiabatic process $Q = 0$, so by the first law the work done by the system equals the decrease in internal energy: $W = -\\Delta U = -nC_V(T_2 - T_1)$, and the work done by the surroundings is $W^{\\prime} = -W$.',
    ],
    solution: [
      {
        title: 'Final temperature',
        detail: 'From $TV^{\\gamma-1} = $ constant ($\\gamma - 1 = 2/3$): $T_2 = T_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma-1} = 300 \\times \\left(\\dfrac{4.0}{1.0}\\right)^{2/3} = 300 \\times 4^{2/3} \\approx 300 \\times 2.520 \\approx 756\\ \\text{K}$. Adiabatic compression raises the temperature markedly.',
      },
      {
        title: 'Initial and final pressures',
        detail: 'Initial: $p_1 = \\dfrac{nRT_1}{V_1} = \\dfrac{1 \\times 8.314 \\times 300}{4.0 \\times 10^{-3}} \\approx 6.24 \\times 10^{5}\\ \\text{Pa}$. Final: $p_2 = p_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma} = 6.24 \\times 10^{5} \\times 4^{5/3} \\approx 6.24 \\times 10^{5} \\times 10.08 \\approx 6.29 \\times 10^{6}\\ \\text{Pa}$. Check: $p_2 = \\dfrac{nRT_2}{V_2} = \\dfrac{8.314 \\times 756}{1.0 \\times 10^{-3}} \\approx 6.29 \\times 10^{6}\\ \\text{Pa}$, consistent.',
      },
      {
        title: 'Work done by the surroundings',
        detail: 'With $Q = 0$ the first law gives $\\Delta U + W = 0$, i.e. $W = -nC_V(T_2 - T_1)$ with $C_V = \\dfrac{3}{2}R$. $W = -\\dfrac{3}{2} \\times 1 \\times 8.314 \\times (756 - 300) \\approx -5686\\ \\text{J}$. The system does negative work, so the surroundings do work $W^{\\prime} = -W \\approx 5.69 \\times 10^{3}\\ \\text{J}$ on the gas.',
      },
      {
        title: 'Physical discussion',
        detail: 'All the work done by the surroundings goes into the internal energy of the gas ($\\Delta U \\approx 5.69\\ \\text{kJ}$), manifesting macroscopically as a temperature rise from $300\\ \\text{K}$ to $756\\ \\text{K}$. An adiabat is steeper than an isotherm (the final pressure $6.29 \\times 10^{6}\\ \\text{Pa}$ is higher than the corresponding case $p_1/4^{\\gamma} \\times 4^{\\gamma}$ of isothermal compression), because compression simultaneously raises the temperature and thus raises the pressure twice over.',
      },
    ],
    answer: '$T_2 \\approx 756\\ \\text{K}$; $p_1 \\approx 6.24 \\times 10^{5}\\ \\text{Pa}$, $p_2 \\approx 6.29 \\times 10^{6}\\ \\text{Pa}$; the work done by the surroundings is $W^{\\prime} \\approx 5.69 \\times 10^{3}\\ \\text{J}$',
    tags: ['Adiabatic process', 'Poisson\'s equation', 'Heat-capacity ratio', 'Internal energy'],
  },
  'thermal-physics-p5': {
    title: 'Carnot efficiency, a supposedly violating engine, and a reversible refrigerator',
    question:
      'A reversible Carnot engine operates between a hot reservoir at $T_1 = 600\\ \\text{K}$ and a cold reservoir at $T_2 = 300\\ \\text{K}$, absorbing $Q_1 = 1200\\ \\text{J}$ from the hot reservoir per cycle. (1) Find the cycle efficiency, the net work output and the heat rejected to the cold reservoir; (2) someone claims that another engine working between the same two reservoirs absorbs $1200\\ \\text{J}$ per cycle and delivers $720\\ \\text{J}$ of work—is this possible? (3) Run the reversible machine backwards as a refrigerator between $T_2^{\\prime} = 270\\ \\text{K}$ and $T_1^{\\prime} = 300\\ \\text{K}$, extracting $Q_2 = 900\\ \\text{J}$ from the cold space; find the minimum work required.',
    hints: [
      'The Carnot efficiency depends only on the two reservoir temperatures: $\\eta_C = 1 - \\dfrac{T_2}{T_1}$; combine with $\\eta = W/Q_1$ and $W = Q_1 - Q_2$ to get the work and rejected heat.',
      'Carnot\'s theorem: no engine can exceed the reversible Carnot efficiency between the same temperatures, so just compare the claimed efficiency with $\\eta_C$.',
      'The coefficient of performance of a reversible refrigerator is $\\varepsilon = \\dfrac{T_2^{\\prime}}{T_1^{\\prime} - T_2^{\\prime}}$; the minimum work corresponds to the reversible limit $W_{\\min} = Q_2/\\varepsilon$.',
    ],
    solution: [
      {
        title: 'Carnot efficiency and energy balance',
        detail: '$\\eta_C = 1 - \\dfrac{T_2}{T_1} = 1 - \\dfrac{300}{600} = 0.5 = 50\\%$. Net work output $W = \\eta Q_1 = 0.5 \\times 1200 = 600\\ \\text{J}$; heat rejected to the cold reservoir $Q_2 = Q_1 - W = 1200 - 600 = 600\\ \\text{J}$.',
      },
      {
        title: 'Testing the claimed engine',
        detail: 'The claimed efficiency is $\\eta = \\dfrac{720}{1200} = 0.6 = 60\\% > \\eta_C = 50\\%$. By Carnot\'s theorem no engine between the same temperature limits may exceed the reversible Carnot efficiency; otherwise it could be combined with the reversed Carnot machine to make heat flow spontaneously from cold to hot, violating the second law. Hence such an engine cannot exist.',
      },
      {
        title: 'Minimum work for the refrigerator',
        detail: 'The reversible refrigerator has coefficient of performance $\\varepsilon = \\dfrac{T_2^{\\prime}}{T_1^{\\prime} - T_2^{\\prime}} = \\dfrac{270}{300 - 270} = 9$. The minimum work is the reversible limit: $W_{\\min} = \\dfrac{Q_2}{\\varepsilon} = \\dfrac{900}{9} = 100\\ \\text{J}$. A real refrigerator is irreversible and must consume more than $100\\ \\text{J}$.',
      },
      {
        title: 'Discussion',
        detail: 'An engine must reject heat to the cold reservoir (here half of the heat absorbed), an imperative of the second law; whereas the price of "moving" heat in a refrigerator can be far smaller than the amount moved ($100\\ \\text{J}$ to move $900\\ \\text{J}$), and a coefficient of performance greater than 1 does not violate energy conservation.',
      },
    ],
    answer: '(1) $\\eta_C = 50\\%$, $W = 600\\ \\text{J}$, $Q_2 = 600\\ \\text{J}$; (2) impossible, since $60\\% > \\eta_C = 50\\%$ violates Carnot\'s theorem; (3) $W_{\\min} = 100\\ \\text{J}$',
    tags: ['Carnot cycle', 'Engine efficiency', 'Carnot\'s theorem', 'Coefficient of performance'],
  },
  'thermal-physics-p6': {
    title: 'Entropy change in heat transfer across a finite temperature difference and in free expansion',
    question:
      '(1) Heat $Q = 1000\\ \\text{J}$ flows directly from a hot reservoir ($T_1 = 500\\ \\text{K}$) to a cold one ($T_2 = 300\\ \\text{K}$); find the entropy change of the total system formed by the two reservoirs and decide whether the process can occur spontaneously. (2) $2\\ \\text{mol}$ of an ideal gas expands freely into a vacuum, its volume growing from $V_1$ to $2V_1$ (adiabatic, no work done); find the entropy change of the gas and use the Clausius inequality to show that the process is irreversible. $R = 8.314\\ \\text{J/(mol}\\cdot\\text{ K)}$.',
    hints: [
      'Entropy is a state function: a reservoir at constant temperature gains or loses $\\pm Q/T$, and the total entropy change is the sum.',
      'Although free expansion is irreversible, both initial and final states are equilibrium states, so the entropy change may be computed along any reversible path (e.g. reversible isothermal expansion): $\\Delta S = nR\\ln(V_2/V_1)$.',
      'The Clausius inequality $\\Delta S \\ge \\int \\dfrac{\\delta Q}{T}$: for an isolated system $\\int \\dfrac{\\delta Q}{T} = 0$, so $\\Delta S > 0$ means the process is irreversible.',
    ],
    solution: [
      {
        title: 'Total entropy change of the heat transfer',
        detail: 'The hot reservoir loses heat: $\\Delta S_1 = -\\dfrac{Q}{T_1} = -\\dfrac{1000}{500} = -2.0\\ \\text{J/K}$; the cold reservoir gains heat: $\\Delta S_2 = \\dfrac{Q}{T_2} = \\dfrac{1000}{300} \\approx 3.33\\ \\text{J/K}$. The total entropy change is $\\Delta S = \\Delta S_1 + \\Delta S_2 \\approx -2.0 + 3.33 = 1.33\\ \\text{J/K} > 0$; the total system is isolated and its entropy increases, so the process occurs spontaneously (and is irreversible).',
      },
      {
        title: 'Entropy change in free expansion',
        detail: 'In free expansion $Q = 0$ and $W = 0$, hence $\\Delta U = 0$ and the final temperature of the ideal gas equals the initial one. With the temperature constant we may integrate along a reversible isothermal path: $\\Delta S = \\int \\dfrac{\\delta Q_\\text{rev}}{T} = nR\\ln\\dfrac{V_2}{V_1} = 2 \\times 8.314 \\times \\ln 2 \\approx 16.63 \\times 0.693 \\approx 11.5\\ \\text{J/K}$.',
      },
      {
        title: 'Irreversibility from the Clausius inequality',
        detail: 'Free expansion is adiabatic, so for the actual process $\\int \\dfrac{\\delta Q}{T} = 0$, while the entropy change is $\\Delta S \\approx 11.5\\ \\text{J/K} > 0$. By the Clausius inequality $\\Delta S \\ge \\int \\dfrac{\\delta Q}{T}$, the inequality is strict here, and the difference is the entropy produced—so the process is irreversible. Were the process reversible, we would have $\\Delta S = 0$ (isolated and adiabatic), contrary to fact.',
      },
      {
        title: 'Physical discussion',
        detail: 'Both irreversible processes increase the entropy of an isolated system: in heat transfer across a finite temperature difference the increase comes from the "degradation" of energy (loss of availability), while in free expansion it comes from the explosion in the number of microscopic states available to the molecules ($\\Omega$ grows, so $S = k\\ln\\Omega$ grows). Spontaneous processes run in the direction of increasing entropy—the quantitative statement of the second law.',
      },
    ],
    answer: '(1) $\\Delta S = -\\dfrac{1000}{500} + \\dfrac{1000}{300} \\approx 1.33\\ \\text{J/K} > 0$, so the process occurs spontaneously and is irreversible; (2) $\\Delta S = 2R\\ln 2 \\approx 11.5\\ \\text{J/K}$, and $\\Delta S > \\int \\dfrac{\\delta Q}{T} = 0$, so the process is irreversible',
    tags: ['Entropy change', 'Clausius inequality', 'Free expansion', 'Entropy increase'],
  },
  'thermal-physics-p7': {
    title: 'Detecting a claimed violating engine and the maximum work between two reservoirs',
    question:
      'An inventor claims to have built a cyclic engine that absorbs $Q_\\text{H} = 1200\\ \\text{J}$ per cycle from a hot reservoir ($T_\\text{H} = 900\\ \\text{K}$), rejects $Q_\\text{C} = 200\\ \\text{J}$ to a cold reservoir ($T_\\text{C} = 300\\ \\text{K}$) and delivers $W = 1000\\ \\text{J}$ of work. (1) Does the claim satisfy the first law? (2) Use two criteria from the second law to decide whether this engine can work; (3) if it cannot, what is the maximum work per cycle for the same heat absorption of $1200\\ \\text{J}$, and what is the minimum heat that must be rejected to the cold reservoir?',
    hints: [
      'First check the first law: after a full cycle $\\Delta U = 0$, so $W = Q_\\text{H} - Q_\\text{C}$ must hold; see whether the energy budget balances.',
      'Second-law criterion 1 (Carnot\'s theorem): for any engine between the same two reservoirs, $\\eta = \\dfrac{W}{Q_\\text{H}}$ cannot exceed the reversible Carnot efficiency $\\eta_\\text{C} = 1 - \\dfrac{T_\\text{C}}{T_\\text{H}}$.',
      'Criterion 2 (Clausius inequality in cyclic form): $\\oint \\dfrac{\\delta Q}{T} = \\dfrac{Q_\\text{H}}{T_\\text{H}} - \\dfrac{Q_\\text{C}}{T_\\text{C}} \\le 0$, with equality for a reversible cycle; from this the maximum work $W_{\\max} = \\eta_\\text{C} Q_\\text{H}$ and the minimum rejected heat follow.',
    ],
    solution: [
      {
        title: 'Checking the first law',
        detail: 'After a complete cycle the system returns to its initial state, so the net change of the state function $U$ is $\\Delta U = 0$. By the first law $\\Delta U = Q - W$, each cycle must satisfy $W = Q_\\text{H} - Q_\\text{C} = 1200 - 200 = 1000\\ \\text{J}$, exactly as claimed. So the device **does not violate the first law**—and that is precisely its deceptive feature: the energy budget is beyond reproach, and only the second law can expose its impossibility.',
      },
      {
        title: 'Criterion 1: comparison with the Carnot efficiency',
        detail: 'The reversible Carnot efficiency between these two reservoirs is $\\eta_\\text{C} = 1 - \\dfrac{T_\\text{C}}{T_\\text{H}} = 1 - \\dfrac{300}{900} = \\dfrac{2}{3} \\approx 66.7\\%$. The claimed efficiency is $\\eta = \\dfrac{W}{Q_\\text{H}} = \\dfrac{1000}{1200} \\approx 83.3\\%$. Since $\\eta > \\eta_\\text{C}$, Carnot\'s theorem is violated (efficiency between the same temperatures cannot exceed the reversible value), so the engine cannot exist: if it did, it could be combined with a reversed Carnot refrigerator to move heat from cold to hot for free.',
      },
      {
        title: 'Criterion 2: Clausius inequality in cyclic form',
        detail: 'Summing the heat exchanged at each point of the cycle divided by the local reservoir temperature: $\\oint \\dfrac{\\delta Q}{T} = \\dfrac{Q_\\text{H}}{T_\\text{H}} - \\dfrac{Q_\\text{C}}{T_\\text{C}} = \\dfrac{1200}{900} - \\dfrac{200}{300} = 1.333 - 0.667 \\approx 0.667\\ \\text{J/K} > 0$. A reversible cycle requires this to vanish and an irreversible cycle requires it to be strictly negative; it can never be positive, so the engine is again ruled out. The two criteria agree and corroborate each other.',
      },
      {
        title: 'Maximum work output and minimum rejected heat',
        detail: 'With $Q_\\text{H} = 1200\\ \\text{J}$ fixed, the upper bound on the work is set by the reversible case: $W_{\\max} = \\eta_\\text{C} Q_\\text{H} = \\dfrac{2}{3} \\times 1200 = 800\\ \\text{J}$. The heat then rejected to the cold reservoir is $Q_{\\text{C,min}} = Q_\\text{H} - W_{\\max} = 1200 - 800 = 400\\ \\text{J}$. Entropy balance check: $\\dfrac{Q_\\text{H}}{T_\\text{H}} = \\dfrac{1200}{900} \\approx 1.333\\ \\text{J/K}$ and $\\dfrac{Q_{\\text{C,min}}}{T_\\text{C}} = \\dfrac{400}{300} \\approx 1.333\\ \\text{J/K}$ are equal, confirming a reversible cycle with zero entropy change.',
      },
      {
        title: 'Discussion',
        detail: 'Compared with the claim, a genuinely feasible reversible engine must reject $200\\ \\text{J}$ more heat and deliver $200\\ \\text{J}$ less work each cycle. These $200\\ \\text{J}$ are the "emission tax" the second law levies on every heat engine, which no change of working substance or improvement of design can avoid. This also shows the value of the second law: it catches errors that the first law alone cannot.',
      },
    ],
    answer: 'The claim does not violate the first law ($W = 1200 - 200 = 1000\\ \\text{J}$ balances), but $\\eta \\approx 83.3\\% > \\eta_\\text{C} \\approx 66.7\\%$ and $\\oint \\dfrac{\\delta Q}{T} \\approx 0.667\\ \\text{J/K} > 0$, violating the second law, so it is impossible. For the same heat absorption the maximum work is $W_{\\max} = 800\\ \\text{J}$, with at least $Q_{\\text{C,min}} = 400\\ \\text{J}$ rejected.',
    tags: ['Second law of thermodynamics', 'Carnot\'s theorem', 'Clausius inequality', 'Engine efficiency'],
  },
};

export default map;
