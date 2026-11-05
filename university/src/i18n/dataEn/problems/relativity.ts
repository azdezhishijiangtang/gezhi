import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'relativity-p1': {
    title: 'Why cosmic-ray muons reach the ground',
    question:
      'The proper mean lifetime of a muon is $\\tau_0 = 2.2\\ \\mu\\text{s}$. It is produced by cosmic rays at an altitude of about $h = 6\\ \\text{km}$ and travels vertically downwards at $v = 0.995c$. Find: (1) the Lorentz factor $\\gamma$; (2) without relativistic effects, how far a muon travels in its lifetime and what fraction reaches the ground; (3) with time dilation taken into account, how far it travels and what the arrival fraction becomes.',
    hints: [
      'The Lorentz factor is $\\gamma = 1/\\sqrt{1-v^2/c^2}$; first compute $1 - v^2/c^2$ and then take the square root.',
      'Without relativity the flight distance is $v\\tau_0$; the survival fraction is estimated from exponential decay $e^{-t/\\tau}$.',
      'In the laboratory frame the lifetime is stretched to $\\gamma\\tau_0$; recompute the distance and the survival fraction from that.',
    ],
    solution: [
      {
        title: 'Computing the Lorentz factor',
        detail: '$1 - v^2/c^2 = 1 - 0.995^2 = 0.009975$, whose square root is $\\sqrt{0.009975} \\approx 0.0999$, so $\\gamma = 1/0.0999 \\approx 10.0$. The speed is already $99.5\\%$ of light, and time dilation amounts to about a factor of $10$.',
      },
      {
        title: 'Without relativistic effects',
        detail: 'A muon would travel $v\\tau_0 \\approx 0.995 \\times 3\\times10^8 \\times 2.2\\times10^{-6} \\approx 6.6\\times10^2\\ \\text{m} = 660\\ \\text{m}$, far less than $6\\ \\text{km}$. Flying $6\\ \\text{km}$ takes about $6000/660 \\approx 9$ mean lifetimes, leaving a survival fraction of only $e^{-9} \\approx 1\\times10^{-4}$—reaching the ground would be practically impossible.',
      },
      {
        title: 'With time dilation',
        detail: 'In the laboratory frame the lifetime is stretched to $\\tau = \\gamma\\tau_0 \\approx 10 \\times 2.2\\ \\mu\\text{s} = 22\\ \\mu\\text{s}$, allowing a flight of $v\\tau \\approx 0.995\\times3\\times10^8\\times22\\times10^{-6} \\approx 6.6\\ \\text{km}$, exactly of the same order as the production altitude. The ratio of flight time to mean lifetime is about $1$, so the survival fraction is about $e^{-1} \\approx 37\\%$. Hence a large number of muons can be detected at ground level, in agreement with experiment. (In the muon rest frame the same conclusion follows from length contraction: the atmosphere is contracted to $6/\\gamma \\approx 0.6\\ \\text{km}$.)',
      },
    ],
    answer: '$\\gamma \\approx 10$; without relativity a muon would travel only about $660\\ \\text{m}$ with an arrival fraction $e^{-9}\\approx10^{-4}$; with time dilation it travels about $6.6\\ \\text{km}$ and roughly $37\\%$ of muons reach the ground.',
    tags: ['Time dilation', 'Proper time', 'Lorentz factor'],
  },
  'relativity-p2': {
    title: 'Length contraction of a spaceship and its crossing time',
    question:
      'A spaceship of proper length $L_0 = 100\\ \\text{m}$ coasts at $v = 0.6c$ past a space station of negligible width. (1) Find the length of the ship measured in the ground (station) frame; (2) find the time $\\Delta t$ recorded by the station for the ship to pass; (3) find the crossing time $\\Delta t^{\\prime}$ measured in the ship frame and verify that the two results agree via time dilation.',
    hints: [
      'For $v = 0.6c$, $\\gamma = 1/\\sqrt{1-0.6^2} = 1.25$.',
      'Length contraction occurs only along the direction of motion: $L = L_0/\\gamma$.',
      'The events "nose passes the station" and "tail passes the station" occur at the same place in the station frame, so the station clock records the proper time.',
    ],
    solution: [
      {
        title: 'Ship length in the ground frame',
        detail: '$\\gamma = 1/\\sqrt{1-0.36} = 1/0.8 = 1.25$. The ship contracts along its direction of motion: $L = L_0/\\gamma = 100/1.25 = 80\\ \\text{m}$, while transverse dimensions are unchanged.',
      },
      {
        title: 'Crossing time recorded by the station',
        detail: 'In the ground frame the ship is $80\\ \\text{m}$ long and sweeps past at $0.6c$, so the crossing time is $\\Delta t = L/v = 80/(0.6\\times3\\times10^8) \\approx 4.4\\times10^{-7}\\ \\text{s} \\approx 0.44\\ \\mu\\text{s}$.',
      },
      {
        title: 'Check in the ship frame',
        detail: 'In the ship frame the ship has its rest length $100\\ \\text{m}$ and the station sweeps past at $0.6c$, so the crossing time is $\\Delta t^{\\prime} = 100/(0.6\\times3\\times10^8) \\approx 5.6\\times10^{-7}\\ \\text{s} \\approx 0.56\\ \\mu\\text{s}$. Verification: the two events (nose passing, tail passing) occur at the same place in the station frame, so $\\Delta t$ is the proper time; the ship frame should measure $\\Delta t^{\\prime} = \\gamma\\Delta t = 1.25\\times0.44 \\approx 0.56\\ \\mu\\text{s}$, in agreement with the direct computation—length contraction and time dilation are two faces of the same spacetime structure.',
      },
    ],
    answer: 'The ground frame measures a ship length of $80\\ \\text{m}$; the station records $\\Delta t \\approx 0.44\\ \\mu\\text{s}$; the ship frame measures $\\Delta t^{\\prime} \\approx 0.56\\ \\mu\\text{s} = \\gamma\\Delta t$, so the two satisfy the time-dilation relation.',
    tags: ['Length contraction', 'Time dilation', 'Proper time'],
  },
  'relativity-p3': {
    title: 'Relativistic velocity addition: neither probe nor laser exceeds light speed',
    question:
      'A spaceship flies along the positive $x$ axis at $v = 0.8c$ relative to the Earth. (1) The ship fires a probe forward along its direction of flight with speed $u_x^{\\prime} = 0.6c$ relative to the ship; find the probe speed measured on the ground; (2) if the ship fires a laser beam forward, what is the speed of light measured on the ground? (3) Prove that whenever $|u_x^{\\prime}|<c$ and $|v|<c$, the speed obtained by relativistic velocity addition is necessarily less than $c$.',
    hints: [
      'The velocity transformation is $u_x = \\dfrac{u_x^{\\prime}+v}{1+u_x^{\\prime}v/c^2}$ (converting a velocity in $S^{\\prime}$ to $S$).',
      'Substitute $u_x^{\\prime}=c$ directly into the formula and see what the denominator does.',
      'Study the difference between $f(u^{\\prime}) = \\dfrac{u^{\\prime}+v}{1+u^{\\prime}v/c^2}$ and $c$, and factor the numerator.',
    ],
    solution: [
      {
        title: 'Probe velocity',
        detail: 'Substituting: $u_x = \\dfrac{u_x^{\\prime}+v}{1+u_x^{\\prime}v/c^2} = \\dfrac{0.6c+0.8c}{1+0.6\\times0.8} = \\dfrac{1.4c}{1.48} \\approx 0.946c$. Galilean addition would give $1.4c$, but the relativistic correction brings it down to $0.946c$, still below $c$.',
      },
      {
        title: 'Speed of the laser',
        detail: 'Substituting $u_x^{\\prime}=c$: $u_x = \\dfrac{c+0.8c}{1+0.8\\times1} = \\dfrac{1.8c}{1.8} = c$. The speed of light is strictly invariant under velocity transformation—exactly the principle of the constancy of light speed; Galilean addition would wrongly give $1.8c$.',
      },
      {
        title: 'General proof',
        detail: 'Compute $c - u_x = c - \\dfrac{u^{\\prime}+v}{1+u^{\\prime}v/c^2} = \\dfrac{c(1+u^{\\prime}v/c^2) - u^{\\prime} - v}{1+u^{\\prime}v/c^2} = \\dfrac{c\\left(1 - \\dfrac{v}{c}\\right)\\left(1 - \\dfrac{u^{\\prime}}{c}\\right)}{1+u^{\\prime}v/c^2}$. When $|v|<c$ and $|u^{\\prime}|<c$ the numerator is positive, and the denominator $1+u^{\\prime}v/c^2 > 1 - |u^{\\prime}v|/c^2 > 0$, hence $u_x < c$. The combined speed never exceeds that of light; the denominator is precisely the "braking" factor.',
      },
    ],
    answer: 'The probe speed is $u_x \\approx 0.946c$; the laser still travels at $c$; since $c - u_x = \\dfrac{c(1-v/c)(1-u^{\\prime}/c)}{1+u^{\\prime}v/c^2} > 0$, the combined speed is always less than $c$.',
    tags: ['Velocity transformation', 'Constancy of light speed', 'Lorentz transformation'],
  },
  'relativity-p4': {
    title: 'The twin paradox: the age gap of an interstellar traveller',
    question:
      'The younger brother stays on Earth while the elder flies at $v = 0.8c$ to a star $L_0 = 6$ light-years away, immediately turns around (turnaround time negligible) and returns at the same speed, and the brothers reunite. (1) Find the one-way flight time and the total round-trip time in the Earth frame; (2) compute the proper time experienced by the traveller using both the time-dilation formula and the interval invariant $\\Delta s^2 = c^2\\Delta t^2 - \\Delta x^2$; (3) find the age difference at reunion and explain why the two situations are not symmetric, i.e. how the paradox is resolved.',
    hints: [
      'In the Earth frame the one-way time is $\\Delta t = L_0/v$; note that 1 light-year is the distance light travels in one year.',
      'Proper time $\\Delta\\tau = \\Delta t\\sqrt{1-v^2/c^2}$; it can also be obtained directly from $\\Delta s^2/c^2$.',
      'The turnaround switches the traveller from "leaving the Earth frame" to "approaching the Earth frame"; this is not an inertial process. The one whose worldline bends has the shorter proper time.',
    ],
    solution: [
      {
        title: 'Flight time in the Earth frame',
        detail: 'For $v = 0.8c$, $\\gamma = 1/\\sqrt{1-0.64} = 1/0.6 = 5/3$. One way in the Earth frame $\\Delta t = 6\\ \\text{light-years} / (0.8c) = 7.5$ years, so $15$ years for the round trip. The younger brother therefore ages $15$ years.',
      },
      {
        title: 'The traveller\'s proper time (two methods)',
        detail: 'Method 1 (time dilation): one-way proper time $\\Delta\\tau = \\Delta t/\\gamma = 7.5\\times0.6 = 4.5$ years, hence $9$ years for the round trip. Method 2 (interval invariant): the two events of one leg are "departure" and "arrival at the star", with $\\Delta x = 6$ light-years and $\\Delta t = 7.5$ years, so $\\Delta s^2 = c^2(7.5^2 - 6^2) = c^2\\times20.25\\ \\text{yr}^2$, giving proper time $\\Delta s/c = 4.5$ years, or $9$ years round trip. The two methods agree.',
      },
      {
        title: 'Age difference and resolution of the paradox',
        detail: 'At reunion the traveller has experienced $9$ years and the stay-at-home brother $15$, so the traveller is $6$ years younger. The apparent contradiction of the paradox is that "motion is relative, so each should find the other younger". But the two are not in symmetric situations: the stay-at-home worldline is a straight inertial line, while the traveller\'s worldline bends at the star (a non-inertial process). Since for timelike motion "the straight worldline has the longest proper time", the bent worldline necessarily has the shorter proper time; the conclusion is unique and there is no contradiction.',
      },
    ],
    answer: 'The round trip takes $15$ years in the Earth frame; the traveller\'s proper time is $9$ years; at reunion the traveller is $6$ years younger than his brother. The asymmetry comes from the turnaround (a non-inertial bend): the straight worldline of the stay-at-home brother has the longest proper time.',
    tags: ['Twin paradox', 'Proper time', 'Interval invariant'],
  },
  'relativity-p5': {
    title: 'Energy released by deuterium–tritium fusion and its distribution',
    question:
      'In the fusion reaction $^{2}\\text{H} + \\,^{3}\\text{H} \\rightarrow \\,^{4}\\text{He} + n$ the rest masses are $m_{\\text{D}} = 2.01410\\ \\text{u}$, $m_{\\text{T}} = 3.01605\\ \\text{u}$, $m_{\\text{He}} = 4.00260\\ \\text{u}$, $m_n = 1.00867\\ \\text{u}$, with $1\\ \\text{u} = 1.6605\\times10^{-27}\\ \\text{kg}$ and $1\\ \\text{u}c^2 = 931.5\\ \\text{MeV}$. Find: (1) the mass defect of the reaction and the energy released $Q$ (in MeV and in joules); (2) assuming the reactants start essentially at rest, use momentum conservation to find how the kinetic energy is shared between the neutron and the helium nucleus.',
    hints: [
      'Mass defect $\\Delta m = (m_{\\text{D}} + m_{\\text{T}}) - (m_{\\text{He}} + m_n)$.',
      '$Q = \\Delta m\\,c^2$, which converts directly with $1\\ \\text{u}c^2 = 931.5\\ \\text{MeV}$.',
      'The initial total momentum is zero, so in the final state the two particles have equal and opposite momenta, and kinetic energy is inversely proportional to mass.',
    ],
    solution: [
      {
        title: 'Mass defect',
        detail: 'Total mass before: $m_{\\text{D}} + m_{\\text{T}} = 2.01410 + 3.01605 = 5.03015\\ \\text{u}$; after: $m_{\\text{He}} + m_n = 4.00260 + 1.00867 = 5.01127\\ \\text{u}$. The mass defect is $\\Delta m = 5.03015 - 5.01127 = 0.01888\\ \\text{u}$, about $0.38\\%$ of the reacting mass.',
      },
      {
        title: 'Energy released',
        detail: '$Q = \\Delta m\\,c^2 = 0.01888 \\times 931.5\\ \\text{MeV} \\approx 17.6\\ \\text{MeV}$. In joules: $Q = \\Delta m \\times 1.6605\\times10^{-27}\\ \\text{kg} \\times (3\\times10^8\\ \\text{m/s})^2 \\approx 0.01888\\times1.4924\\times10^{-10}\\ \\text{J} \\approx 2.82\\times10^{-12}\\ \\text{J}$.',
      },
      {
        title: 'Kinetic-energy sharing',
        detail: 'The initial total momentum is zero, so the neutron and helium nucleus emerge with equal and opposite momenta: $p_n = p_{\\text{He}}$. From $E_k = p^2/2m$ (the particle energies are of order MeV, so the non-relativistic approximation suffices for the sharing ratio) we get $E_n/E_{\\text{He}} = m_{\\text{He}}/m_n \\approx 4/1$. Hence $E_n \\approx \\dfrac{4}{5}\\times17.6 \\approx 14.1\\ \\text{MeV}$ and $E_{\\text{He}} \\approx 3.5\\ \\text{MeV}$. This is exactly what makes D–T fusion useful as a neutron source: most of the energy is carried away by the neutron.',
      },
    ],
    answer: 'Mass defect $\\Delta m = 0.01888\\ \\text{u}$; energy released $Q \\approx 17.6\\ \\text{MeV} \\approx 2.82\\times10^{-12}\\ \\text{J}$; the neutron takes about $14.1\\ \\text{MeV}$ and the helium nucleus about $3.5\\ \\text{MeV}$.',
    tags: ['Mass–energy relation', 'Mass defect', 'Momentum conservation'],
  },
  'relativity-p6': {
    title: 'Comparing invariant masses: collider versus fixed-target efficiency',
    question:
      'In particle physics the "available energy" of a collision is described by the invariant mass $\\sqrt{s}$ of the total four-momentum, where $s = (P_1 + P_2)^{\\mu}(P_{1\\mu} + P_{2\\mu})$. Take the electron rest energy $m_ec^2 = 0.511\\ \\text{MeV}$. (1) In a collider two electron beams of total energy $E = 5\\ \\text{GeV}$ each collide head-on; find $\\sqrt{s}$; (2) for a fixed target: an electron beam of total energy $20\\ \\text{GeV}$ strikes a stationary electron; find $\\sqrt{s}$; (3) compare the efficiencies of the two schemes and explain the advantage of colliders.',
    hints: [
      'In high-energy physics take $c=1$; the four-momentum is $P^{\\mu} = (E, \\mathbf{p})$ with norm $P^{\\mu}P_{\\mu} = E^2 - p^2 = m^2$.',
      'For head-on collisions the two momenta are equal and opposite, $\\mathbf{p}_1 + \\mathbf{p}_2 = 0$.',
      'For the fixed-target case use $s = m_1^2 + m_2^2 + 2(E_1E_2 - \\mathbf{p}_1\\cdot\\mathbf{p}_2)$ with $\\mathbf{p}_2 = 0$.',
    ],
    solution: [
      {
        title: 'Collider case',
        detail: 'For head-on beams, $E_1 = E_2 = 5\\ \\text{GeV}$ and the momenta are equal and opposite, $\\mathbf{p}_1 + \\mathbf{p}_2 = 0$. Hence $s = (E_1+E_2)^2 - |\\mathbf{p}_1+\\mathbf{p}_2|^2 = (10\\ \\text{GeV})^2$ and $\\sqrt{s} = 10\\ \\text{GeV}$. All the beam energy is converted into available collision energy.',
      },
      {
        title: 'Fixed-target case',
        detail: 'The target electron is at rest: $E_2 = m_ec^2 = 0.000511\\ \\text{GeV}$, $\\mathbf{p}_2 = 0$. From the invariant formula $s = m_e^2c^4 + m_e^2c^4 + 2E_1E_2/c^2$ (in units of energy squared), i.e. $s = 2m^2 + 2E_1E_2 \\approx 2\\times(0.000511)^2 + 2\\times20\\times0.000511 \\approx 0.02044\\ \\text{GeV}^2$. Hence $\\sqrt{s} \\approx 0.143\\ \\text{GeV}$.',
      },
      {
        title: 'Comparing efficiencies',
        detail: 'The collider uses $2\\times5 = 10\\ \\text{GeV}$ of beam energy to obtain $\\sqrt{s} = 10\\ \\text{GeV}$, whereas the fixed-target setup uses $20\\ \\text{GeV}$ but obtains only $0.143\\ \\text{GeV}$—a ratio of about $70$. The reason is that in the fixed-target case most of the energy goes into the overall (centre-of-mass) motion of the post-collision system; from $\\sqrt{s} \\approx \\sqrt{2mE_1}$ the available energy grows only as the square root of the beam energy. This is the fundamental reason why high-energy colliders (such as LEP and LHC) replaced fixed-target accelerators.',
      },
    ],
    answer: 'Collider $\\sqrt{s} = 10\\ \\text{GeV}$; fixed target $\\sqrt{s} \\approx 0.143\\ \\text{GeV}$; for beams of comparable magnitude the collider gives about $70$ times more available energy.',
    tags: ['Four-momentum', 'Invariant mass', 'Colliders'],
  },
  'relativity-p7': {
    title: 'Train and platform: the relativity of simultaneity for lightning strikes',
    question:
      'A high-speed train passes a platform at constant $v = 0.6c$ along $x$. In the platform frame $S$, two lightning bolts strike simultaneously at $t = 0$ the rear ($x_1 = 0$) and the front ($x_2 = 240\\ \\text{m}$), which at that instant are the two ends of the train in $S$. Find: (1) $\\Delta x$, $\\Delta t$ and the spacetime interval $\\Delta s^2$ of the two events in $S$, and classify the interval; (2) use the Lorentz transformation to find $\\Delta t^{\\prime}$ and $\\Delta x^{\\prime}$ in the train frame $S^{\\prime}$, and state which bolt strikes first; (3) if the two bolts were to strike simultaneously in the train frame $S^{\\prime}$, what time difference $\\Delta t$ between the strikes would be required in $S$? (Throughout take $\\Delta X = X_2 - X_1$ and $c = 3.0\\times10^8\\ \\text{m/s}$.)',
    hints: [
      'First compute $\\gamma = 1/\\sqrt{1 - 0.6^2} = 1.25$, then use the Lorentz transformation $\\Delta t^{\\prime} = \\gamma(\\Delta t - v\\Delta x/c^2)$ and $\\Delta x^{\\prime} = \\gamma(\\Delta x - v\\Delta t)$.',
      'The interval $\\Delta s^2 = c^2\\Delta t^2 - \\Delta x^2$ is invariant; $\\Delta s^2 < 0$ means a spacelike interval, whose time order can be reversed in different inertial frames.',
      'Requiring simultaneity in $S^{\\prime}$ means setting $\\Delta t^{\\prime} = 0$ and solving for the $\\Delta t$ needed in $S$.',
    ],
    solution: [
      {
        title: 'Interval and its type in the platform frame',
        detail: '$\\Delta x = x_2 - x_1 = 240\\ \\text{m}$, $\\Delta t = 0$. The interval\\n$$\\Delta s^2 = c^2\\Delta t^2 - \\Delta x^2 = 0 - (240)^2 = -5.76\\times10^4\\ \\text{m}^2 < 0$$\\n$\\Delta s^2 < 0$ shows that the events are **spacelike separated**: they are too far apart and too close in time for even light to travel from one to the other, so there is no causal connection and their order can change with the reference frame. This is precisely the premise for "simultaneity is relative"—for causally connected timelike-separated events the time order is the same in every inertial frame.',
      },
      {
        title: 'Time difference and spatial separation in the train frame',
        detail: '$\\gamma = 1/\\sqrt{1 - 0.36} = 1/0.8 = 1.25$, and $v\\Delta x/c^2 = \\dfrac{0.6\\times3.0\\times10^8\\times240}{(3.0\\times10^8)^2} = \\dfrac{4.32\\times10^{10}}{9.0\\times10^{16}} = 4.8\\times10^{-7}\\ \\text{s}$.\\n$$\\Delta t^{\\prime} = \\gamma\\left(\\Delta t - \\frac{v\\Delta x}{c^2}\\right) = 1.25\\times(0 - 4.8\\times10^{-7}) = -6.0\\times10^{-7}\\ \\text{s}$$\\n$$\\Delta x^{\\prime} = \\gamma(\\Delta x - v\\Delta t) = 1.25\\times240 = 300\\ \\text{m}$$\\n$\\Delta t^{\\prime} < 0$ means that in the train frame **the bolt at the front strikes first**, $0.60\\ \\mu\\text{s}$ before the one at the rear. And $\\Delta x^{\\prime} = 300\\ \\text{m}$ is exactly the rest length of the train—fully consistent with "moving rods contract" (the train is $300/\\gamma = 240\\ \\text{m}$ long in $S$), so the two results corroborate each other.',
      },
      {
        title: 'Condition for simultaneity in the train frame and invariant check',
        detail: 'Setting $\\Delta t^{\\prime} = \\gamma(\\Delta t - v\\Delta x/c^2) = 0$ gives $\\Delta t = v\\Delta x/c^2 = 4.8\\times10^{-7}\\ \\text{s}$. That is, in the platform frame the rear must be struck first and the front $0.48\\ \\mu\\text{s}$ later, for the two events to be simultaneous in the train frame. This is the converse of the previous part: the same physical fact appears in different frames as "front first", "simultaneous", or "rear first"—and all three are correct.\\nInvariant check (using the original case $\\Delta t = 0$):\\n$$c^2(\\Delta t^{\\prime})^2 - (\\Delta x^{\\prime})^2 = 9.0\\times10^{16}\\times(6.0\\times10^{-7})^2 - (300)^2 = 3.24\\times10^4 - 9.0\\times10^4 = -5.76\\times10^4\\ \\text{m}^2$$\\nwhich is exactly the same as $\\Delta s^2$ in $S$, confirming the computation.',
      },
    ],
    answer: 'In $S$: $\\Delta x = 240\\ \\text{m}$, $\\Delta t = 0$, and $\\Delta s^2 = -5.76\\times10^4\\ \\text{m}^2 < 0$ is a spacelike interval; in $S^{\\prime}$: $\\Delta t^{\\prime} = -6.0\\times10^{-7}\\ \\text{s}$ (the front bolt is $0.60\\ \\mu\\text{s}$ earlier) and $\\Delta x^{\\prime} = 300\\ \\text{m}$; for simultaneity in $S^{\\prime}$ the rear bolt must precede the front one in $S$ by $\\Delta t = v\\Delta x/c^2 = 4.8\\times10^{-7}\\ \\text{s}$.',
    tags: ['Relativity of simultaneity', 'Lorentz transformation', 'Spacetime interval'],
  },
  'relativity-p8': {
    title: 'Lorentz transformation of electric and magnetic fields and the field invariants',
    question:
      'In the laboratory frame $S$ there is a uniform electric field along $y$ with $E_y = 3.0\\times10^6\\ \\text{V/m}$ and no magnetic field. An inertial frame $S^{\\prime}$ moves at $v = 0.6c$ along $x$ relative to $S$ ($\\beta = 0.6$, $\\gamma = 1.25$, $c = 3.0\\times10^8\\ \\text{m/s}$). Find: (1) $\\vec{E}^{\\prime}$ and $\\vec{B}^{\\prime}$ in $S^{\\prime}$ using the field transformation formulas, and write the vector form in the low-speed limit; (2) check the result with the electromagnetic invariants $\\vec{E}\\cdot\\vec{B}$ and $E^2 - c^2B^2$; (3) if a magnetic field $B_z = 1.0\\times10^{-2}\\ \\text{T}$ along $z$ is also present in $S$ (so that $E = cB$), recompute $E^{\\prime}_y$ and $B^{\\prime}_z$ and explain how the change in field amplitude relates to the Doppler effect for light.',
    hints: [
      'For a boost along $x$ the field transformations are $E^{\\prime}_x = E_x$, $E^{\\prime}_y = \\gamma(E_y - vB_z)$, $B^{\\prime}_x = B_x$, $B^{\\prime}_z = \\gamma(B_z - vE_y/c^2)$.',
      'The two electromagnetic invariants $\\vec{E}\\cdot\\vec{B}$ and $E^2 - c^2B^2$ take the same values in every inertial frame.',
      'A plane electromagnetic wave satisfies $\\vec{E}\\perp\\vec{B}$ and $E = cB$; its amplitude scales by $\\gamma(1-\\beta) = \\sqrt{(1-\\beta)/(1+\\beta)}$, which is exactly the longitudinal Doppler factor.',
    ],
    solution: [
      {
        title: 'A pure electric field produces a magnetic field in a moving frame',
        detail: 'In $S$, $\\vec{E} = (0,\\,3.0\\times10^6,\\,0)\\ \\text{V/m}$ and $\\vec{B} = \\mathbf{0}$. Substituting into the field transformations:\\n$$E^{\\prime}_y = \\gamma(E_y - vB_z) = 1.25\\times(3.0\\times10^6 - 0) = 3.75\\times10^6\\ \\text{V/m}$$\\n$$B^{\\prime}_z = \\gamma\\left(B_z - \\frac{vE_y}{c^2}\\right) = 1.25\\times\\left(0 - \\frac{0.6\\times3.0\\times10^8\\times3.0\\times10^6}{(3.0\\times10^8)^2}\\right) = 1.25\\times(-6.0\\times10^{-3}) = -7.5\\times10^{-3}\\ \\text{T}$$\\nAll remaining components vanish: $E^{\\prime}_x = E^{\\prime}_z = 0$, $B^{\\prime}_x = B^{\\prime}_y = 0$. In vector form\\n$$\\vec{B}^{\\prime} = -\\gamma\\frac{\\vec{v}\\times\\vec{E}}{c^2}$$\\nAt low speed ($\\gamma\\approx1$) this is the magnetic field of a moving point charge, $\\vec{B} = \\vec{v}\\times\\vec{E}/c^2$ (the sign depends on the relative motion of the frames). So a "pure electric field" is not an absolute notion: in another inertial frame it is necessarily accompanied by a magnetic field—magnetism is a relativistic effect of electricity.',
      },
      {
        title: 'Checking with the electromagnetic invariants',
        detail: 'In $S$: $\\vec{E}\\cdot\\vec{B} = 0$ and $E^2 - c^2B^2 = (3.0\\times10^6)^2 - 0 = 9.0\\times10^{12}\\ (\\text{V/m})^2$.\\nIn $S^{\\prime}$: $\\vec{E}^{\\prime}\\cdot\\vec{B}^{\\prime} = 0$ ($\\vec{E}^{\\prime}$ along $y$ and $\\vec{B}^{\\prime}$ along $z$, still orthogonal);\\n$$E^{\\prime 2} - c^2B^{\\prime 2} = (3.75\\times10^6)^2 - 9.0\\times10^{16}\\times(7.5\\times10^{-3})^2 = 1.406\\times10^{13} - 5.063\\times10^{12} = 9.0\\times10^{12}\\ (\\text{V/m})^2$$\\nBoth invariants have identical values in the two frames, confirming the computation. A corollary: since $\\vec{E}\\cdot\\vec{B} = 0$ but $E^2 - c^2B^2 \\ne 0$, no reference frame exists in which the magnetic (or electric) field vanishes completely—only null-field configurations such as a plane wave ($E = cB$, $\\vec{E}\\perp\\vec{B}$) keep $E = cB$ in all frames.',
      },
      {
        title: 'Plane-wave case and the Doppler factor',
        detail: 'Adding $B_z = 1.0\\times10^{-2}\\ \\text{T}$ gives $cB = 3.0\\times10^8\\times1.0\\times10^{-2} = 3.0\\times10^6\\ \\text{V/m} = E$ with $\\vec{E}\\perp\\vec{B}$: this is a plane electromagnetic wave propagating along $+x$.\\n$$E^{\\prime}_y = \\gamma(E_y - vB_z) = 1.25\\times(3.0\\times10^6 - 1.8\\times10^8\\times1.0\\times10^{-2}) = 1.25\\times1.2\\times10^6 = 1.5\\times10^6\\ \\text{V/m}$$\\n$$B^{\\prime}_z = \\gamma\\left(B_z - \\frac{vE_y}{c^2}\\right) = 1.25\\times(1.0\\times10^{-2} - 6.0\\times10^{-3}) = 5.0\\times10^{-3}\\ \\text{T}$$\\nCheck: $cB^{\\prime} = 3.0\\times10^8\\times5.0\\times10^{-3} = 1.5\\times10^6\\ \\text{V/m} = E^{\\prime}$, i.e. $E^{\\prime} = cB^{\\prime}$ still holds after the transformation and both invariants remain zero. The amplitude ratio is\\n$$\\frac{E^{\\prime}}{E} = \\frac{1.5\\times10^6}{3.0\\times10^6} = 0.5 = \\gamma(1-\\beta) = \\sqrt{\\frac{1-\\beta}{1+\\beta}} = \\sqrt{\\frac{0.4}{1.6}}$$\\nwhich is exactly the longitudinal Doppler factor: an observer moving along the direction of propagation sees both the frequency and the field amplitude reduced by this factor (a redshift). The transformed wave is still a plane electromagnetic wave, propagating in the same direction, with the same speed $c$—a direct expression of the constancy of light speed in the language of fields, and the best illustration that Maxwell\'s equations are naturally covariant.',
      },
    ],
    answer: '$\\vec{E}^{\\prime} = (0,\\,3.75\\times10^6,\\,0)\\ \\text{V/m}$, $\\vec{B}^{\\prime} = (0,\\,0,\\,-7.5\\times10^{-3})\\ \\text{T}$, i.e. $\\vec{B}^{\\prime} = -\\gamma(\\vec{v}\\times\\vec{E})/c^2$; the invariants $\\vec{E}\\cdot\\vec{B} = 0$ and $E^2 - c^2B^2 = 9.0\\times10^{12}\\ (\\text{V/m})^2$ are the same in both frames; with the added magnetic field, $E^{\\prime}_y = 1.5\\times10^6\\ \\text{V/m}$ and $B^{\\prime}_z = 5.0\\times10^{-3}\\ \\text{T}$, still satisfying $E^{\\prime} = cB^{\\prime}$, with the field amplitude scaled by the Doppler factor $0.5$.',
    tags: ['Electromagnetic field tensor', 'Lorentz transformation of fields', 'Electromagnetic invariants', 'Doppler effect'],
  },
};

export default map;
