import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'temperature': {
    chapter: 'Chapter 1 Temperature and Equilibrium',
    title: 'Equilibrium States, Temperature Scales and the Zeroth Law',
    summary:
      'Temperature is a quantity that can be assigned because thermal equilibrium is transitive; the zeroth law guarantees the consistency of the concept of temperature and the possibility of measuring it.',
    keyPoints: [
      'A thermodynamic equilibrium state requires that the macroscopic properties not change with time and that there be no macroscopic flow',
      'Thermal equilibrium is transitive, and this is the cornerstone of the concept of "temperature"',
      'Zeroth law: if A and B are each in thermal equilibrium with C, then A and B are in thermal equilibrium with each other',
      'Empirical scales rely on a thermometric property varying monotonically with temperature; the ideal-gas scale is the standard',
      'Celsius, Fahrenheit and thermodynamic (Kelvin) scales are related by definite conversion formulas',
    ],
    content: String.raw`

Everyone has had the tactile experience of "cold" and "hot" since infancy: a piece of ice feels chilly, standing near a stove feels scorching. This subjective sensation is the starting point of our knowledge of thermal phenomena, but it has a fatal defect—it is far too unreliable. Dip your left hand in cold water and your right hand in hot water, then put both into lukewarm water: the two hands give completely opposite verdicts about "the same basin of water". This shows that sensation alone cannot give the degree of hotness an objective, comparable number. We need a "hotness ruler" that does not depend on the human body, is repeatable and is transferable—and that is the problem **temperature** solves.

Think further: when a cup of hot water is left open in a room, it slowly cools and finally becomes "as warm as" the room; after that, however long one waits, the degree of hotness of the two no longer changes. We call this "no longer changing after being left alone" state **thermal equilibrium**. Interestingly, if you separate hot and cold water with a well-insulated partition and then let them make indirect contact through a metal plate, the two sides again tend to agree. More subtly: even if two bodies of gas never touch directly, as long as each can reach thermal equilibrium with the same third object (a thermometer, say), they are in thermal equilibrium with each other. This seemingly trivial transitivity is precisely the fundamental premise that allows temperature to become a scientific concept.

In daily life we rely on thermometer readings to eliminate subjective bias. But why is a thermometer trustworthy? In essence it exploits the monotonic variation of some property of some substance (the volume of mercury, the resistance of a metal, the pressure of a gas) with hotness. This raises a deeper question: will different thermometers and different thermometric substances give mutually contradictory numbers? Without a universal principle guaranteeing their consistency, "temperature" would be no more than a pile of incompatible readings and could not be called science. The zeroth law of thermodynamics is precisely the axiom that provides this consistency.

## II. Rigorous Definitions

**Thermodynamic equilibrium state**: a system undisturbed by the outside whose macroscopic properties (pressure $p$, volume $V$, temperature, etc.) do not change with time and which has no macroscopic particle or energy flow inside is said to be in thermodynamic equilibrium. It includes mechanical equilibrium (no macroscopic motion), thermal equilibrium (uniform internal temperature), phase equilibrium and chemical equilibrium. Note that "equilibrium" does not require the molecules to be at rest; it means the macroscopic quantities do not change with time.

**Thermal contact and thermal equilibrium**: if two systems, after being put in contact through a diathermal wall, both have macroscopic properties that no longer change, they are said to be in thermal equilibrium.

**Zeroth law of thermodynamics**: if two systems are each in thermal equilibrium with a third system, they are also in thermal equilibrium with each other. In symbols: if $A \sim C$ and $B \sim C$, then $A \sim B$ ($\sim$ denotes thermal equilibrium). This law is logically prior to the first and second laws, yet is called "zeroth" because it was discovered later.

**Definition of temperature**: the zeroth law guarantees that one can assign to every equilibrium state a state function $T$ such that systems in thermal equilibrium with each other have the same $T$. This function is **temperature**. In other words, temperature is the number that labels the equivalence class of thermal equilibrium.

**Empirical temperature scale**: choose a thermometric substance and a thermometric property $X$ (the pressure of a constant-volume gas, the resistance of a platinum resistor) and stipulate that the temperature is proportional to $X$:

$$T(X) = a\,X + b$$

Two fixed points (such as the ice point and the steam point) determine the constants $a,b$, giving an empirical scale.

**Ideal-gas temperature scale**: fix the amount of substance $n$ and the volume $V$, use the pressure $p$ as the thermometric property, and define

$$T = \lim_{p_\text{tr}\to 0} \left(273.16\ \text{K}\right)\frac{p}{p_\text{tr}}$$

where $p_\text{tr}$ is the triple-point pressure. The scale so defined is independent of the kind of gas used and is the experimental basis of the thermodynamic (Kelvin) scale.

**Common conversions**:

$$T(\text{K}) = t(^\circ\text{C}) + 273.15,\qquad t(^\circ\text{F}) = \frac{9}{5}t(^\circ\text{C}) + 32$$

## III. Why We Understand It This Way

**Why is the zeroth law needed, rather than simply saying "equal temperature means thermal equilibrium"?** Because "temperature" is exactly the quantity we are trying to define. Before temperature is defined, "equal temperature" is meaningless. The zeroth law first establishes, through the operational relation "in thermal equilibrium with a third body", the equivalence classes of thermal equilibrium, and then defines temperature as the label of that class. It raises "degree of hotness" from a subjective sensation to an objective equivalence relation, and is the cornerstone of the whole edifice of thermodynamics.

**Why is the ideal-gas scale so special?** Ordinary empirical scales differ because of the thermometric substance: a mercury thermometer and an alcohol thermometer may disagree at intermediate marks. But experiment shows that as the gas pressure tends to zero, different gases give scales tending to the same limiting curve; this substance-independent limiting scale corresponds exactly to the thermodynamic scale and is therefore used as the standard. Its universality stems from the fact that the ideal gas equation $pV = nRT$ does not depend on the particular gas.

**Why must equilibrium emphasize "undisturbed by the outside"?** A resistance wire continuously heated by a current may have a stable temperature, but that is not an equilibrium state but a "steady state"—it is maintained by a constant input of energy from outside, and the temperature changes at once when the power is removed. An equilibrium state must be one the system can retain after being isolated; otherwise constant macroscopic quantities are only an appearance. Distinguishing equilibrium from steady state is the key to avoiding mistaking forced processes in open systems for equilibrium.

**Why must a thermometer reach thermal equilibrium with the object before being read?** A thermometer is itself a system; only when it and the measured system are in thermal equilibrium (i.e. at equal temperature) does it display the true temperature of the object. Reading hastily before equilibrium gives wrong results—this is the most direct practical corollary of the zeroth law.

## IV. Typical Calculations

**Example 1: Celsius–Kelvin conversion.** Normal human body temperature is about $37^\circ\text{C}$, i.e. $T = 37 + 273.15 = 310.15\ \text{K}$. The ice point of water is $0^\circ\text{C} = 273.15\ \text{K}$ and the steam point $100^\circ\text{C} = 373.15\ \text{K}$. The triple point is exactly $273.16\ \text{K}$, $0.01\ \text{K}$ above the ice point—this is precisely the subtle difference between the Celsius scale, which takes the ice point as approximately zero, and the thermodynamic scale, which takes the triple point as the standard.

**Example 2: constant-volume gas thermometer reading.** Suppose the thermometric gas has pressure $p_\text{tr}=1000\ \text{Pa}$ at the triple point and $p=1366\ \text{Pa}$ in some state, with the measurement already made in the low-pressure limit. Then

$$T = 273.16\ \text{K} \times \frac{1366}{1000} \approx 373.1\ \text{K}$$

which is close to the steam point of water, so this state is at about $100^\circ\text{C}$.

**Example 3: checking the Fahrenheit conversion.** Given $t(^\circ\text{F}) = \frac{9}{5}t(^\circ\text{C}) + 32$, set $t(^\circ\text{C}) = -40$; then $t(^\circ\text{F}) = \frac{9}{5}(-40)+32 = -72+32 = -40$, so $-40^\circ$ is where Celsius and Fahrenheit coincide.

**Example 4: moles from the ideal gas equation.** In some equilibrium state $p=2.0\times10^5\ \text{Pa}$, $V=24.6\ \text{L}=2.46\times10^{-2}\ \text{m}^3$ and $T=300\ \text{K}$, so

$$n = \frac{pV}{RT} = \frac{2.0\times10^5 \times 2.46\times10^{-2}}{8.314\times 300} \approx \frac{4920}{2494} \approx 1.97\ \text{mol}$$

Close to $2\ \text{mol}$, so the state contains about two moles of gas in equilibrium.

## V. Common Misconceptions

**Misconception 1: temperature measures "how much heat there is".** Temperature labels the degree of hotness; heat is energy in transit. The two concepts differ. A tiny amount of boiling water has a high temperature but limited total heat, while a large pool of warm water can transfer far more heat. A high temperature does not mean "contains a lot of heat".

**Misconception 2: thermal equilibrium means the temperature becomes some average.** Thermal equilibrium means the two systems have equal temperatures, but the common temperature after contact is not necessarily a simple arithmetic mean; it depends on the heat capacities. Only for equal masses of the same substance with no non-volume work is the equilibrium temperature close to the initial average.

**Misconception 3: equilibrium means the molecules are at rest.** Microscopically the molecules are still moving violently and randomly; equilibrium only means the macroscopic statistical averages do not change. Temperature itself is determined by the mean translational kinetic energy of the molecules; only at absolute zero would ideal-gas molecules stop translating (in reality the quantum zero-point energy remains).

**Misconception 4: taking a steady state for an equilibrium state.** As with the heated resistance wire above: it looks stable but is maintained by a continuous supply of energy from outside, and changes as soon as the source is removed; it is not a thermodynamic equilibrium state.

**Misconception 5: assuming all temperature scales must agree.** Empirical scales deviate from one another; only the ideal-gas scale (in the low-pressure limit) agrees strictly with the thermodynamic scale. Measuring the same temperature with thermometers using different liquids may differ by a few tenths of a degree, and one cannot simply equate them.

## VI. Extensions and Synthesis

The concept of temperature can be extended to more extreme and more microscopic regimes. At very low temperatures some substances exhibit negative temperature (the population of higher levels exceeds that of lower ones and entropy decreases with increasing energy); the temperature is then negative yet "hotter" than any positive temperature. This is an extension built on the Boltzmann distribution and does not violate the equivalence-class logic of the zeroth law. In statistical physics temperature is defined by the derivative of entropy with respect to internal energy:

$$\frac{1}{T} = \left(\frac{\partial S}{\partial U}\right)_{V,N}$$

This definition links the macroscopically measurable temperature with the number of microstates, showing that "hotness" is essentially how fast the disorder of the system changes with energy. In the statistical framework the zeroth law corresponds to "two systems in equilibrium have the same $\partial S/\partial U$", thus unifying the macroscopic empirical and microscopic statistical viewpoints. Understanding the three-stage leap of temperature from "sensation" to "state function" to "derivative of entropy" is one of the most important pieces of intellectual training in studying thermal physics.

## VII. Self-Test and Knowledge Map

To check whether you really understand temperature, ask yourself a few questions. Suppose two metal blocks look identical, one copper and one iron; can you tell which is hotter merely by touch? The answer is no: the sensation depends on how fast the material conducts heat, not on the temperature itself. Copper conducts far better than iron, so at the instant of contact it carries heat away from the skin rapidly and feels "colder", even though it may be at exactly the same temperature as the iron block. This shows that temperature measurement must rely on a stable reading after thermal equilibrium rather than on instantaneous subjective sensation, and that "hot and cold" is a differential effect of temperature rather than temperature itself.

Now consider the zero point of the scales. Celsius fixes the ice point at 0 and the steam point at 100, which looks natural, but the zero of the thermodynamic scale corresponds to the limit at which molecular translation stops—an absolute lower bound, so negative thermodynamic temperatures do not exist in the ordinary sense. This also explains why the Kelvin scale must be used in every proportional formula: the gas laws, the ideal gas equation, the Arrhenius rate law, equilibrium constants. Substituting $t=20^\circ\text{C}$ as the number 20 into $pV=nRT$ gives a completely wrong pressure and particle number. Forming the habit "whenever a ratio is involved, convert to kelvin first" is the first line of defence against elementary errors.

Temperature is also tied closely to precision measurement. Household thermometers use the thermal expansion of liquids, whereas platinum resistance thermometers, thermocouples and radiation pyrometers used in research exploit the variation with temperature of resistance, thermoelectric emf and blackbody radiation respectively; their calibration can ultimately be traced to the ideal-gas or thermodynamic scale. To understand temperature one must realize that it is a "comparable, transferable, measurable" label of an equivalence class of thermal equilibrium, not some mysterious substance flowing between bodies. It is the zeroth law that establishes the objectivity of this label, so that internal energy, entropy, free energy and all the other thermodynamic potentials can be built on a single, self-consistent reference.

Finally, note that temperature is not always positive. In lasers, nuclear magnetic resonance and similar systems, population inversion occurs, and the temperature defined through the Boltzmann distribution can be negative; such a system is "hotter" than any positive-temperature state, and heat flows spontaneously from the negative-temperature body to the positive-temperature one. Negative temperature does not violate the equivalence-class logic of the zeroth law; it merely broadens our imagination of "hot and cold". Only by regarding everyday positive temperatures as a special case of a more general concept can one appreciate the far-reaching power of the zeroth law as an axiom, and understand why modern thermodynamics defines temperature as the reciprocal of the derivative of entropy with respect to internal energy, thereby fully unifying macroscopic measurement with microscopic statistics.

`,
  },

  'molecular-kinetic': {
    chapter: 'Chapter 2 Kinetic Theory of Gases',
    title: 'A Microscopic Explanation of Pressure and Temperature',
    summary:
      'Treat a gas as a collection of a vast number of randomly moving molecules: pressure comes from the impulses of molecules hitting the walls, and temperature is proportional to the mean translational kinetic energy.',
    keyPoints: [
      'Ideal gas molecular model: point particles, no interaction (except collisions), perfectly elastic collisions',
      'Pressure formula $p = \\frac{1}{3}nm\\overline{v^2} = \\frac{2}{3}n\\overline{\\varepsilon_k}$',
      'Relation between temperature and mean translational kinetic energy $\\overline{\\varepsilon_t} = \\frac{3}{2}kT$',
      'Root-mean-square speed $v_\\text{rms}=\\sqrt{3kT/m}=\\sqrt{3RT/M}$',
      'The Maxwell speed distribution gives the probability density of molecular speeds',
    ],
    content: String.raw`

The inner wall of an inflated balloon is taut, and a tyre can be pumped with a lot of air and yet become hard—these are macroscopic manifestations of gas **pressure**. From everyday experience a gas looks like "a fluid that pushes on walls". But a gas consists of a large number of molecules far apart, with empty space most of the time between them—so where does the steady push felt by the wall come from? The answer comes from a simple picture: countless molecules keep hitting the wall like tiny billiard balls, each impact giving the wall a tiny impulse; the number of molecules is enormous and the impacts extremely frequent, so macroscopically this appears as a steady and uniform pressure. This idea—reducing macroscopic pressure to microscopic collisions—is the core of the kinetic theory of gases.

Likewise, we know intuitively that "the hotter the gas, the more active it is". Kinetic theory makes this precise: temperature is not some mysterious fluid but a measure of how violent the random motion of the molecules is. Heat a gas and the molecules strike harder and more often on average, so the pressure rises (at fixed volume). Explaining "hot and cold" as "violence of motion" unifies thermal physics with mechanics—thermal phenomena are essentially the statistical result of mechanical motion.

Ask further: if all molecules moved at the same speed, would the distribution be simple? In a real gas the speeds differ enormously, from very slow to very fast, but there is a stable probability distribution. This distribution is not arbitrary; it is determined by equipartition and the most probable principle. Understanding it answers questions such as "why is there always a certain fraction of molecules moving especially fast", and lays the foundation for diffusion, effusion and related phenomena.

## II. Rigorous Definitions

**Ideal gas molecular model**: (1) the size of the molecules is negligible and they are treated as point particles; (2) apart from the instant of collision there are no interaction forces between molecules or between molecules and the wall; (3) molecular collisions are perfectly elastic; (4) molecular motion obeys Newton's laws, and in equilibrium the distribution is isotropic.

**Line of derivation of the pressure formula**: consider a number density $n=N/V$ and molecular mass $m$. A single molecule with velocity $\vec{v}$ strikes a wall perpendicular to the $x$ axis; after the elastic collision its $x$ component reverses, the momentum change is $2mv_x$, and the impulse delivered to the wall per unit time is proportional to the collision frequency $v_x/(2L)$ and the area. Averaging over all molecules and using the symmetry of the three directions, $\overline{v_x^2}=\overline{v_y^2}=\overline{v_z^2}=\frac{1}{3}\overline{v^2}$, gives

$$p = \frac{1}{3}nm\overline{v^2} = \frac{2}{3}n\left(\frac{1}{2}m\overline{v^2}\right) = \frac{2}{3}n\overline{\varepsilon_k}$$

where $\overline{\varepsilon_k} = \frac{1}{2}m\overline{v^2}$ is the mean translational kinetic energy.

**Temperature and mean translational kinetic energy**: comparing the above with the ideal gas equation $p = nkT$ ($n=N/V$, $k=R/N_A$ the Boltzmann constant) gives

$$\overline{\varepsilon_t} = \frac{3}{2}kT$$

that is, the temperature is determined solely by the mean translational kinetic energy of the molecules and is independent of the kind of gas.

**Root-mean-square speed**:

$$v_\text{rms} = \sqrt{\overline{v^2}} = \sqrt{\frac{3kT}{m}} = \sqrt{\frac{3RT}{M}}$$

where $M$ is the molar mass.

**Maxwell speed distribution**: in equilibrium the probability density for speeds near $v$ is

$$f(v) = 4\pi\left(\frac{m}{2\pi kT}\right)^{3/2} v^2 e^{-mv^2/(2kT)}$$

from which follow the most probable speed $v_p = \sqrt{2kT/m}$ and the mean speed $\bar{v}=\sqrt{8kT/(\pi m)}$, both smaller than the root-mean-square speed.

## III. Why We Understand It This Way

**Why is the pressure proportional to $\overline{v^2}$ rather than to $v$?** Because the impulse delivered in a single collision is proportional to the molecular momentum $mv$, and the number of collisions per unit time is also proportional to $v$; the product gives a contribution proportional to $v^2$, and averaging yields $\overline{v^2}$. Pressure is therefore sensitive to "the mean of the squared speed", which is exactly why the root-mean-square speed appears.

**Why is temperature the mean translational kinetic energy rather than the speed?** The kinetic energy $\frac{1}{2}mv^2$ directly reflects the violence of motion, is a scalar and is convenient to average statistically; the speed distribution depends on the mass (light molecules move faster), yet at the same temperature light and heavy molecules have the same mean translational kinetic energy. Only by defining temperature through kinetic energy rather than speed can we express the experimental fact that "temperature is independent of the kind of substance".

**Why does the Maxwell distribution contain both a $v^2$ factor and an exponential decay?** The $v^2$ comes from the volume element of velocity space (the area of a spherical shell grows with $v$), suppressing the low-speed end; the exponential $e^{-mv^2/(2kT)}$ is the Boltzmann factor, making the high-speed end improbable because of its high energy. The balance of the two produces a peak in the middle (the most probable speed) and a bell-shaped distribution skewed to the right.

**Why does the ideal gas model fail at high pressure and low temperature?** At high pressure the molecular volume is not negligible, and at low temperature the intermolecular attraction is significant; both destroy the assumption of "non-interacting point particles", and the van der Waals or other real-gas equations must be used.

## IV. Typical Calculations

**Example 1: mean translational kinetic energy from temperature.** For an ideal gas at $T=300\ \text{K}$,

$$\overline{\varepsilon_t} = \frac{3}{2}kT = \frac{3}{2}\times 1.38\times10^{-23}\times 300 \approx 6.21\times10^{-21}\ \text{J}$$

The mean translational kinetic energy of a single molecule is small, but Avogadro's number of molecules collectively produce an observable pressure.

**Example 2: comparing root-mean-square speeds.** For nitrogen, $M=28\times10^{-3}\ \text{kg/mol}$, at $T=300\ \text{K}$:

$$v_\text{rms} = \sqrt{\frac{3RT}{M}} = \sqrt{\frac{3\times8.314\times300}{0.028}} \approx \sqrt{2.67\times10^5} \approx 517\ \text{m/s}$$

For hydrogen, $M=2\times10^{-3}$, it is about $1930\ \text{m/s}$, showing that light molecules move faster.

**Example 3: number density from pressure and temperature.** For $p=1.0\times10^5\ \text{Pa}$ and $T=300\ \text{K}$,

$$n = \frac{p}{kT} = \frac{1.0\times10^5}{1.38\times10^{-23}\times300} \approx 2.4\times10^{25}\ \text{m}^{-3}$$

about $2.4\times10^{25}$ molecules per cubic metre—an enormous number, which is exactly why statistical methods work.

**Example 4: most probable speed from the Maxwell distribution.** For oxygen, $M=32\times10^{-3}$, at $T=300\ \text{K}$:

$$v_p = \sqrt{\frac{2RT}{M}} = \sqrt{\frac{2\times8.314\times300}{0.032}} \approx 395\ \text{m/s}$$

slightly smaller than the root-mean-square speed at the same temperature, consistent with the ordering of the three characteristic speeds $v_p < \bar{v} < v_\text{rms}$.

## V. Common Misconceptions

**Misconception 1: gas pressure comes from mutual repulsion between molecules.** In fact the pressure of an ideal gas comes from the impulses of molecules hitting the wall, not from intermolecular repulsion; between collisions the molecules fly freely and exert almost no sustained force.

**Misconception 2: a high temperature means all molecules move faster.** Temperature determines only the mean translational kinetic energy; even at high temperature some molecules are very slow, and the distribution merely shifts to the right as a whole—not every molecule speeds up.

**Misconception 3: temperature is zero when the molecules are "at rest".** Classically $\overline{\varepsilon_t}=0$ at $T=0$, but quantum zero-point energy exists, and negative temperature (population inversion) in special systems is hotter than any positive temperature; simple extrapolation does not apply.

**Misconception 4: conflating the root-mean-square, mean and most probable speeds.** The three differ in value: $v_p$ is the smallest, $\bar{v}$ intermediate and $v_\text{rms}$ the largest, and they are used in different contexts (effusion involves quantities related to $v_p$, kinetic energy uses $v_\text{rms}$).

**Misconception 5: thinking $p=nkT$ applies only to ideal gases.** It is indeed the microscopic form of the ideal gas equation, but real gases approximate it at low pressure; treating it as universally exact at high pressure leads to errors.

## VI. Extensions and Synthesis

Kinetic theory bridges the microscopic and the macroscopic: the macroscopic quantities pressure and temperature are statistical averages of microscopic ones, while fluctuations (such as Brownian motion) reveal the deviation of that average at small scales. The equipartition theorem further states that each independent quadratic degree of freedom contributes $\frac{1}{2}kT$ of mean energy, so a monatomic gas has only 3 translational degrees of freedom and $C_V=\frac{3}{2}R$, while a diatomic gas has rotational degrees of freedom giving $C_V=\frac{5}{2}R$. But at low temperature the rotational and vibrational degrees of freedom "freeze out", showing that classical equipartition does not always hold and quantum statistics is needed. The Maxwell distribution also generalizes to a three-dimensional Gaussian in velocity space and yields the Boltzmann distribution $n\propto e^{-\varepsilon/kT}$, the starting point of all statistical physics. Understanding "the macroscopic is the statistical average of the microscopic" is the key leap from phenomena to theory in thermal physics.

## VII. Self-Test and Knowledge Map

The test of whether kinetic theory has really been mastered is whether one can reduce macroscopic quantities to microscopic statistics. For example, people often wonder: since molecules ceaselessly hit the wall, why does a balloon not tremble from an uneven impact at some instant? The answer is that the number of molecules is enormous (of order Avogadro's number) and the relative size of the fluctuation is only about $1/\sqrt{N}$, entirely negligible for a macroscopic body—this is the source of the reliability of statistical laws. Only when the system is as small as the nanoscale (say a colloidal particle struck by water molecules) does the fluctuation become visible as Brownian motion, and Brownian motion in turn became one of the earliest experimental proofs of the existence of molecules.

Consider another interesting question: the Earth's atmosphere is obviously subject to gravity, so why can $p=nkT$ still be used approximately? Strictly, gravity makes the pressure decrease with height, and an isothermal atmosphere satisfies $p(z)=p_0 e^{-mgz/kT}$ with a scale height $H=kT/mg$ of about 8 km; but over the height difference of a classroom the variation is negligible, so the atmosphere may be treated as uniform. This shows that the ideal gas model holds when "the scale is much smaller than the scale height", and outside that range gravity must be included—a reminder that every model has a range of validity and cannot be extrapolated blindly.

Kinetic theory also predicts diffusion and effusion directly. By Graham's law the effusion rate of a gas is inversely proportional to the square root of its molar mass, so light gases escape faster; this is the physical basis of the slow leakage of hydrogen balloons and of the industrial enrichment of uranium-235 by effusion of $UF_6$. Combining the pressure formula with the Maxwell distribution also yields the viscosity, thermal conductivity and self-diffusion coefficient, showing that transport phenomena are likewise rooted in molecular collisions. From the collision of a single molecule to the macroscopic pressure of a bottle of gas, and on to industrial separation and transport, kinetic theory provides a single consistent microscopic explanatory framework.

Further, kinetic theory reveals the deep connection between fluctuation and dissipation: how small deviations near equilibrium are averaged away, and how they appear as viscous and conductive dissipation out of equilibrium (the fluctuation–dissipation theorem). Mastering this derivation from microscopic collisions to macroscopic pressure is the key to entering statistical physics. It convinces us that heat is not a fluid but the statistical average of random motion; temperature is not a mysterious property but a measure of mean translational kinetic energy; pressure is not intermolecular repulsion but the flux of impulse from collisions with the wall. These three "not X but Y" statements are the deepest conceptual revolution that kinetic theory brought to physics.

## VIII. Further Thoughts

Kinetic theory has a corollary that is often overlooked: temperature is an intensive quantity describing "the mean kinetic energy per degree of freedom" and therefore independent of system size; pressure is also intensive but depends on the product of number density and temperature, $p=nkT$. This explains why the pressure falls while the temperature stays the same when a chamber is evacuated—there are fewer molecules, but the mean kinetic energy of each is unchanged. Distinguishing intensive quantities from extensive ones (such as internal energy $U$ and volume $V$) is the precondition for using kinetic theory formulas without error.

In addition, the van der Waals equation for real gases $(p+a/V_m^2)(V_m-b)=RT$ deviates markedly from the ideal gas at high pressure; the correction $a$ reflects intermolecular attraction and $b$ the molecular volume, a necessary step from the ideal model towards reality. It also confirms in reverse that the two core assumptions of the ideal gas model—no interaction, no size—are exactly the first to fail at high pressure.

`,
  },

  'first-law': {
    chapter: 'Chapter 3 The First Law of Thermodynamics',
    title: 'Internal Energy, Work and Heat',
    summary:
      'The first law is energy conservation expressed for thermal phenomena: the increase of internal energy equals the heat absorbed minus the work done by the system.',
    keyPoints: [
      'Mathematical form of the first law $\\Delta U = Q - W$ ($W$ is the work done by the system)',
      'Internal energy is a state function; work and heat are process quantities',
      'Work in a quasi-static process $W = \\int p\\,dV$',
      'Isochoric process $W=0$, isobaric $W=p\\Delta V$, isothermal ideal gas $W=nRT\\ln(V_2/V_1)$',
      'The internal energy of an ideal gas depends only on temperature, $U = \\frac{i}{2}nRT$',
    ],
    content: String.raw`

When you boil water the heat of the flame raises its temperature, and when you compress the air in a pump the air becomes warm—two apparently different processes that both change the state of a system. Joule's famous experiment, in which a paddle wheel stirred water and warmed it, tells us that mechanical work (stirring) and the raising of weights (gravitational work) can produce effects completely equivalent to heating. This suggests that heat and work are two different "currencies" of energy transfer, both of which can be deposited into a common "account" of the system—the **internal energy**. What the first law says is exactly this: the increase in that account equals the heat deposited minus the work withdrawn.

In everyday experience people used to say "heat is a substance (caloric)", as though heat were a fluid flowing in and out. The first law overturns this misunderstanding: heat is not something a system "contains" but energy transferred during a process; once the process is over, it makes no sense to ask "how much heat the system contains"—only "how much internal energy the system has" is well defined. Clarifying work, heat and internal energy is the first step in avoiding conceptual confusion in thermodynamics.

Consider another phenomenon: to take a gas from state A to state B, different paths (isobaric then isochoric, or isochoric then isobaric) may require different amounts of heat, yet the change of internal energy is the same. This shows that internal energy is like a "water level" determined only by the two ends, whereas heat and work are like "the distance travelled" and depend on the path. Grasping "which quantity is a state function and which is a process quantity" is the key to analysing every thermodynamic process.

## II. Rigorous Definitions

**Internal energy $U$**: the sum of the kinetic and potential energies of all microscopic particles inside the system. For an ideal gas there is no intermolecular potential energy, so the internal energy is just the kinetic energy of thermal motion and is a single-valued function of temperature:

$$U = \frac{i}{2}nRT$$

where $i$ is the number of degrees of freedom (monatomic $i=3$, rigid diatomic $i=5$).

**Work $W$**: energy transferred to the outside by macroscopic displacement. For a frictionless quasi-static process (each step approximately in equilibrium) the volume work is

$$W = \int_{V_1}^{V_2} p\,dV$$

On expansion $dV>0$ and $W>0$ (the system does work); on compression the opposite.

**Heat $Q$**: energy transferred microscopically because of a temperature difference. The convention is $Q>0$ when the system absorbs heat and $Q<0$ when it releases heat.

**First law of thermodynamics**: in any process, the increase of internal energy equals the heat absorbed from the outside minus the work done by the system:

$$\Delta U = Q - W$$

Equivalently $Q = \Delta U + W$ (the absorbed heat is used to increase the internal energy and to do work). For an infinitesimal process $dU = \delta Q - \delta W$; note that $\delta$ denotes a process quantity (not an exact differential).

**Several typical quasi-static processes** (ideal gas):
- Isochoric: $dV=0\Rightarrow W=0$, $Q = \Delta U = \frac{i}{2}nR\Delta T$;
- Isobaric: $W = p\Delta V = nR\Delta T$, $Q = \frac{i+2}{2}nR\Delta T$;
- Isothermal (ideal gas, $\Delta U=0$): $Q = W = nRT\ln\dfrac{V_2}{V_1} = nRT\ln\dfrac{p_1}{p_2}$.

## III. Why We Understand It This Way

**Why is internal energy a state function while heat is not?** The value of a state function is determined only by the current equilibrium state, not by how it was reached; the internal energy is uniquely fixed by $T,V$ (or $T,p$). Heat is "energy that flows during a process": just as the displacement from home to the office is fixed but the distance travelled may be long or short, heat and work are that variable "distance travelled".

**Why $Q-W$ rather than $Q+W$?** It is a matter of sign convention: this book takes $W$ as the work done by the system. Energy conservation requires "income (heat absorbed) minus outgo (work done) equals the increase in the deposit ($\Delta U$)", so $\Delta U = Q - W$. If work done on the system is taken as positive, the form becomes $\Delta U = Q + W'$; the two conventions are equivalent, and the key is to stay consistent throughout.

**Why is $\Delta U=0$ for an isothermal ideal gas?** Because the internal energy of an ideal gas depends only on temperature, and if the temperature does not change the internal energy does not either; all the heat absorbed is converted into work done. This is precisely the microscopic source of the work a heat engine performs.

**Why is the work of a quasi-static process written $\int p\,dV$?** Quasi-static means the process is infinitely slow and every instant is an equilibrium state, so the system pressure equals the external pressure everywhere and the system's own $p(V)$ relation can be used to compute the work. For a non-quasi-static process (such as free expansion) the interior is not uniform, this expression cannot be used, and the work is usually smaller or even zero.

## IV. Typical Calculations

**Example 1: heat and work in isobaric expansion.** $1\ \text{mol}$ of monatomic ideal gas is heated at constant pressure from $T_1=300\ \text{K}$ to $T_2=400\ \text{K}$ ($i=3$):

$$\Delta U = \frac{3}{2}nR\Delta T = \frac{3}{2}\times1\times8.314\times100 \approx 1247\ \text{J}$$

$$W = nR\Delta T = 8.314\times100 = 831\ \text{J}$$

$$Q = \Delta U + W = 1247 + 831 = 2078\ \text{J}$$

So in an isobaric process about $40\%$ of the energy goes into work done on the outside.

**Example 2: isochoric heating.** Same as above but at fixed volume: $W=0$, $Q=\Delta U=1247\ \text{J}$, all the heat goes into raising the internal energy, so isochoric heating "saves heat" compared with isobaric.

**Example 3: work in isothermal expansion.** $2\ \text{mol}$ of ideal gas at $T=400\ \text{K}$ expands isothermally from $V_1$ to $2V_1$:

$$W = nRT\ln\frac{V_2}{V_1} = 2\times8.314\times400\times\ln 2 \approx 6651\times0.693 \approx 4610\ \text{J}$$

Since $\Delta U=0$, the system absorbs $Q=W\approx 4610\ \text{J}$.

**Example 4: free expansion.** A gas expands freely into a vacuum: $W=0$ and the process is adiabatic so $Q=0$, hence $\Delta U=0$ and the temperature of an ideal gas is unchanged. This shows that with neither work nor heat transfer the internal energy is conserved—but the process is irreversible.

## V. Common Misconceptions

**Misconception 1: a system "contains heat".** Heat exists only in transfer and is a process quantity; an equilibrium system has internal energy but no stock attribute called "heat".

**Misconception 2: thinking $Q$ and $W$ are uniquely determined by the initial and final states.** They are process quantities; the same initial and final states may give different values along different paths. Only $\Delta U$ is uniquely determined by the states.

**Misconception 3: understanding work only as volume work.** There is also electrical work, surface work and so on; the $W$ in the first law is the total work done by the system, and the volume work $\int p\,dV$ is only the most common case.

**Misconception 4: thinking an isothermal process necessarily involves no energy change.** For an ideal gas at constant temperature $\Delta U=0$, but real molecules have potential energy, so the internal energy of a real gas can still change with volume at constant temperature (related to the Joule–Thomson effect).

**Misconception 5: sign confusion.** Different textbooks take opposite conventions for the sign of $W$; before substituting into formulas, be clear whether "$W$ is the work done by the system or work done on the system", otherwise the conclusion may differ by a minus sign.

## VI. Extensions and Synthesis

The first law also combines with cyclic processes: when a system returns to its initial state after a cycle, $\Delta U=0$, so over the whole cycle $Q_\text{net}=W_\text{net}$—the net heat absorbed equals the net work done. This is precisely the working principle of heat engines and refrigerators. Applied to open systems, the first law requires the addition of flow work, giving the steady-flow energy equation, the cornerstone of engineering thermodynamics. Moreover, the first law constrains only the quantity of energy, not the direction of processes—a cup of hot water spontaneously cools but never spontaneously heats up, and this is the dimension that the second law must supply. To understand the first law, always remember that it answers "where did the energy go", leaving "can the process happen" to later laws. Mastering the distinction between state functions and process quantities resolves almost half of the conceptual confusion in thermal physics.

## VII. Self-Test and Knowledge Map

A good way to check whether the first law has really been internalized is to examine everyday turns of phrase. Many people say "an object contains heat", a residue of the caloric theory; the accurate statement is "an object has internal energy", while "heat" appears only in transfer. Similarly, both "doing work" and "transferring heat" can change the internal energy, but the mechanisms differ: work acts through macroscopic displacement (ordered motion) and heat through microscopic collisions (disordered motion); they are equivalent in changing the internal energy, which is exactly the core conclusion of Joule's experiment.

Consider another common confusion: when an ideal gas is compressed isothermally, work is done on the system, so why does the temperature not rise? Because the internal energy of an ideal gas depends only on temperature, and an isothermal process requires the temperature to be constant, so the work done from outside must at the same time be expelled as heat ($Q=-W$) for the internal energy to stay fixed. A real gas changes its internal energy slightly on isothermal compression (the intermolecular potential energy changes), which is one difference between a van der Waals gas and an ideal gas, and a reminder that "internal energy depends only on temperature" is an approximation of the ideal model.

The engineering embodiment of the first law is the steady-flow energy equation. For open systems such as steam turbines and compressors one must include the enthalpy $H=U+pV$ carried by the flowing matter, so the first law reads $\dot Q - \dot W = \dot m \Delta h$, where $\dot m\Delta h$ is the energy transported by flow work. Energy audits in buildings and refrigeration, and the calculation of fuel heating values for engines, are all essentially applications of the first law. To master it, always distinguish "state quantities" from "process quantities": internal energy and enthalpy are state quantities, work and heat are process quantities; only with this clear can one write the energy balance correctly in ever-changing thermodynamic processes.

Further, applying the first law to a cyclic process gives $Q_\text{net}=W_\text{net}$, the energy basis of heat engines and refrigerators; applying it to open systems requires counting the enthalpy carried by matter, otherwise the key term of flow work is lost, and many engineering mistakes stem from confusing closed and open systems. In addition, the first law does not restrict the direction of processes—hot water cools spontaneously but does not spontaneously heat up; directionality is supplied by the second law. From a broader viewpoint, the first law and energy conservation are among the most robust pillars of nature; they have withstood the tests of relativity and quantum mechanics and are unquestionable starting points in every macroscopic thermal phenomenon. To grasp the full power of the first law one must be able both to compute "where the energy went" and to know clearly what it "does not answer"; this sense of boundaries is exactly the step from solving exercises to doing research.

## VIII. Supplementary Derivation: A Unified Formula for the Heat Capacity of a Polytropic Process

So far only the three special processes—isochoric, isobaric and isothermal—have been discussed. Real processes usually lie between them, and the most useful model is the **polytropic process**:

$$pV^m = \text{constant}$$

where $m$ is the polytropic index. For $m=0$, $m=1$ and $m=\gamma$ it degenerates respectively into the isobaric, isothermal and adiabatic processes. Below we derive its molar heat capacity in full, to see whether "the three processes can be captured by a single formula".

Eliminating $p$ from the equation of state $pV=nRT$ and $pV^m=$ constant gives

$$TV^{m-1} = \text{constant}$$

Taking logarithms and differentiating:

$$\frac{dT}{T} + (m-1)\frac{dV}{V} = 0 \quad\Rightarrow\quad \frac{V\,dT}{T\,dV} = -(m-1)$$

For any quasi-static infinitesimal process, combine the expression for work with the first law:

$$\delta Q = dU + p\,dV = nC_{V,m}dT + \frac{nRT}{V}dV$$

where $C_{V,m}$ is the molar heat capacity at constant volume. Dividing both sides by $n\,dT$ and defining the polytropic molar heat capacity $C_m = \dfrac{\delta Q}{n\,dT}$:

$$C_m = C_{V,m} + \frac{RT}{V}\cdot\frac{dV}{dT} = C_{V,m} + R\cdot\frac{T\,dV}{V\,dT} = C_{V,m} - \frac{R}{m-1}$$

where the last step uses the logarithmic differentiation above. This formula neatly captures the three classical processes:

- $m=0$ (isobaric): $C_m = C_{V,m} + R = C_{p,m}$, and Mayer's relation emerges naturally;
- $m=1$ (isothermal): the denominator vanishes and $C_m\to\infty$, meaning that heat is absorbed while the temperature stays constant—exactly the signature of the isothermal process;
- $m=\gamma$ (adiabatic): using $R = (\gamma-1)C_{V,m}$ gives $C_m = C_{V,m} - \dfrac{R}{\gamma-1} = 0$, i.e. zero heat absorbed.

One formula covers every case—this is the power of the first law as a universal law.

## IX. A Comprehensive Worked Example

**Problem: $2\ \text{mol}$ of rigid diatomic ideal gas ($C_{V,m}=\dfrac{5}{2}R$) is compressed from $T_1=300\ \text{K}$ along the polytropic process $pV^{1.2}=$ constant until its volume is half the initial value. Find the final temperature $T_2$, the change in internal energy $\Delta U$, the work $W$ done by the system and the heat $Q$ absorbed.**

**Step 1: final temperature.** From $TV^{m-1}=$ constant with $V_2 = V_1/2$ and $m-1=0.2$:

$$T_2 = T_1\left(\frac{V_1}{V_2}\right)^{m-1} = 300\times 2^{0.2} \approx 300\times 1.1487 \approx 344.6\ \text{K}$$

so the temperature rises by about $44.6\ \text{K}$.

**Step 2: change in internal energy.** The internal energy of an ideal gas depends only on temperature:

$$\Delta U = nC_{V,m}(T_2-T_1) = 2\times\frac{5}{2}\times 8.314\times 44.6 \approx 41.57\times 44.6 \approx 1854\ \text{J}$$

**Step 3: work.** Integrating $\int p\,dV$ for a polytropic process gives the general expression $W = \dfrac{nR\Delta T}{1-m}$:

$$W = \frac{2\times 8.314\times 44.6}{1-1.2} = \frac{741.6}{-0.2} \approx -3708\ \text{J}$$

The minus sign means that during the compression the outside did $3708\ \text{J}$ of work on the system.

**Step 4: heat.** By the first law:

$$Q = \Delta U + W = 1854 - 3708 \approx -1854\ \text{J}$$

The system is in fact **releasing heat**. Checking with the polytropic heat capacity: $C_m = C_{V,m} - \dfrac{R}{m-1} = \dfrac{5}{2}R - \dfrac{R}{0.2} = \dfrac{5}{2}R - 5R = -\dfrac{5}{2}R$, so $Q = nC_m\Delta T = 2\times\left(-\dfrac{5}{2}\times8.314\right)\times 44.6 \approx -1854\ \text{J}$; the two routes agree (the small difference is rounding).

**Discussion:** the counterintuitive point here is that the temperature rises while the system releases heat. The reason is that a polytropic index in $1<m<\gamma$ makes $C_m<0$, so the work done from outside not only covers the increase in internal energy but has a surplus that is expelled as heat. Remember this rule of thumb: for $1<m<\gamma$, compression raises the temperature while releasing heat; working inside $\gamma$ is more efficient than adiabatic operation but requires cooling.

## X. Pitfalls and Problem-Solving Conventions

**Pitfall 1: treating $pV^m=$ constant as adiabatic on sight.** Only for $m=\gamma$ is $Q=0$; a general polytropic process must be computed from $Q = nC_m\Delta T$ or the first law, otherwise the whole energy balance is wrong.

**Pitfall 2: using $C_m = C_{V,m} - \dfrac{R}{m-1}$ at $m=1$.** The expression diverges for the isothermal case, which must be treated separately with $\Delta U = 0$ and $Q = W = nRT\ln\dfrac{V_2}{V_1}$.

**Pitfall 3: the sign of work.** This book takes $W$ as the work done by the system, positive on expansion and negative on compression. Using $W = \dfrac{nR\Delta T}{1-m}$ gives a negative value automatically for compression; changing signs by hand only invites errors.

**Pitfall 4: mixing molar and total heat capacities.** A quantity with the subscript $m$ is per mole and must be multiplied by $n$ when combined with the amount of substance; if the total heat capacity $C$ of the system is given, use $\Delta U = C\Delta T$ and do not multiply by $n$.

**Pitfall 5: inconsistent units.** $R = 8.314\ \text{J/(mol·K)}$ requires the pressure in $\text{Pa}$ and the volume in $\text{m}^3$. With pressure in $\text{kPa}$ and volume in $\text{L}$ the product is also in $\text{J}$ ($1\ \text{kPa·L} = 1\ \text{J}$), a handy quick check.

**Pitfall 6: equating "the temperature rises" with "heat must be absorbed".** As the example above shows, work from outside can change the internal energy independently; deciding whether heat is absorbed or released requires finishing the computation of $Q=\Delta U+W$.

`,
  },
  'heat-capacity': {
    chapter: 'Chapter 4 Heat Capacity and Adiabatic Processes',
    title: 'Heat Capacity at Constant Volume and Pressure, Adiabatic Equations',
    summary:
      'Heat capacity measures the heat needed to raise the temperature; Mayer\'s relation links the constant-volume and constant-pressure heat capacities; adiabatic processes are described by the Poisson equation $pV^\\gamma=$ constant.',
    keyPoints: [
      'Constant-volume heat capacity $C_V = (\\partial U/\\partial T)_V$, constant-pressure $C_p = (\\partial H/\\partial T)_p$',
      'Mayer\'s relation $C_p - C_V = nR$ (ideal gas)',
      'Heat capacity ratio $\\gamma = C_p/C_V = (i+2)/i$',
      'Reversible adiabatic process $pV^\\gamma=$ const, $TV^{\\gamma-1}=$ const, $T^\\gamma p^{1-\\gamma}=$ const',
      'Adiabatic expansion does work at the cost of cooling, unlike isothermal expansion',
    ],
    content: String.raw`

Heat a covered pot of oil and an open pot of water with the same flame and you will find that they warm up with different "ease"; and even for the same gas, heating at fixed volume and heating at fixed pressure require different amounts of heat. The reason is that if expansion is allowed during heating, the system pushes against the environment while absorbing heat, so part of the heat is "spent" on doing work and less is left to raise the temperature—this shows up as a constant-pressure heat capacity larger than the constant-volume one. Conversely, at fixed volume the gas cannot expand and do work, so almost all the heat absorbed goes into raising the temperature, and the constant-volume heat capacity is smaller. Behind this temperature difference lies the deep connection between heat capacity, degrees of freedom and the manner of doing work.

Now imagine the barrel of a bicycle pump getting hot when you inflate a tyre, or a spray bottle feeling cold where the perfume emerges—these are **adiabatic** processes in which the gas is compressed or expanded so quickly that there is almost no time to exchange heat. Adiabatic does not mean "constant temperature"; on the contrary, adiabatic compression raises the temperature and adiabatic expansion lowers it, because the work directly changes the internal energy. Understanding the equations of adiabatic processes explains why compressors need cooling and why rising air forms clouds (adiabatic expansion cools the air and water vapour condenses).

The everyday notion of "specific heat" also comes from here: different substances need different amounts of heat to rise by one degree. Water has a particularly large specific heat, so coastal areas have small day–night temperature differences while inland areas have large ones—a macroscopic manifestation of heat capacity in the Earth's climate.

## II. Rigorous Definitions

**Heat capacity**: the ratio of the heat $dQ$ needed to raise the temperature of a system by $dT$ to $dT$. It depends on the process; two are commonly used:

$$C_V = \left(\frac{\delta Q}{dT}\right)_V = \left(\frac{\partial U}{\partial T}\right)_V,\qquad C_p = \left(\frac{\delta Q}{dT}\right)_p = \left(\frac{\partial H}{\partial T}\right)_p$$

where the enthalpy is $H = U + pV$. For an ideal gas $C_V = \dfrac{i}{2}nR$ and $C_p = \dfrac{i+2}{2}nR$.

**Mayer's relation**: differentiating $H=U+pV=U+nRT$ (ideal gas) with respect to $T$ gives

$$C_p - C_V = nR$$

and per unit amount of substance $c_p - c_V = R$. This is the simplest relation connecting the two heat capacities.

**Heat capacity ratio (adiabatic index)**:

$$\gamma = \frac{C_p}{C_V} = \frac{i+2}{i}$$

For a monatomic gas $\gamma=5/3\approx1.67$; for a rigid diatomic gas $\gamma=7/5=1.4$.

**Reversible adiabatic process**: adiabatic means $\delta Q=0$, so the first law gives $dU = -p\,dV$. For an ideal gas $dU = nC_V dT$; substituting, rearranging and using the equation of state, integration yields three equivalent forms:

$$pV^\gamma = \text{constant},\qquad TV^{\gamma-1} = \text{constant},\qquad T^\gamma p^{1-\gamma} = \text{constant}$$

These are collectively called the **Poisson equations**.

## III. Why We Understand It This Way

**Why must $C_p$ exceed $C_V$?** When heating at constant pressure the system expands and does work, so the heat absorbed must be split into "raising the temperature" and "doing work"; at constant volume there is no volume work and all the heat raises the temperature. The excess is exactly the $nR$ in Mayer's relation, representing "the share of expansion work".

**Why does adiabatic expansion cool rather than preserve the temperature?** Adiabatic only means no heat exchange with the outside, but the system can still do work; doing work consumes internal energy, and the internal energy of an ideal gas depends only on temperature, so doing work must lower the temperature. Isothermal expansion maintains the temperature by absorbing heat to compensate the work; the mechanisms are fundamentally different.

**Why does $\gamma$ depend only on the degrees of freedom?** Because both $C_V$ and $C_p$ are proportional to the number of degrees of freedom $i$, and the ratio $\gamma=(i+2)/i$ cancels $R$ and $n$, depending only on the independent ways in which the molecule can move freely (translation, rotation) and not on the kind of gas (its mass).

**Why is free expansion not a case for the adiabatic equations?** The Poisson equations require a reversible quasi-static process; free expansion is adiabatic but irreversible with a non-uniform interior, so $pV^\gamma=$ constant cannot be applied directly. Only $\Delta U=0$ can be used, giving an unchanged final temperature for an ideal gas.

## IV. Typical Calculations

**Example 1: checking Mayer's relation.** For a diatomic ideal gas $C_V = \frac{5}{2}R$, so $C_p = C_V + R = \frac{7}{2}R$ and $\gamma = 7/5 = 1.4$, in agreement with experiment.

**Example 2: final temperature of adiabatic compression.** $1\ \text{mol}$ of monatomic gas ($\gamma=5/3$) with $T_1=300\ \text{K}$ and $V_1=2.0\ \text{L}$ is compressed adiabatically to $V_2=1.0\ \text{L}$:

$$T_2 = T_1\left(\frac{V_1}{V_2}\right)^{\gamma-1} = 300\times 2^{2/3} \approx 300\times1.587 \approx 476\ \text{K}$$

Halving the volume raises the temperature markedly, confirming that adiabatic compression heats.

**Example 3: adiabatic work.** For the same case, the work in an adiabatic process equals the decrease of internal energy:

$$W = -\Delta U = -nC_V(T_2-T_1) = -\frac{3}{2}\times1\times8.314\times(476-300) \approx -2195\ \text{J}$$

The minus sign means the outside does work on the system (compression) and the internal energy increases.

**Example 4: adiabatic versus isothermal final pressure.** Starting from the same $p_1,V_1$ and expanding to $V_2=2V_1$: the isothermal final pressure is $p=p_1/2$; the adiabatic final pressure is $p=p_1(V_1/V_2)^\gamma = p_1/2^{1.4}\approx 0.38p_1 < p_1/2$. The adiabat is steeper than the isotherm, intuitively because adiabatic expansion also cools the gas, so the pressure falls more.

## V. Common Misconceptions

**Misconception 1: heat capacity is a fixed constant of a substance.** In reality heat capacity varies with temperature and phase (at low temperature $C_V$ falls as degrees of freedom freeze out); constancy for an ideal gas is only an approximate model.

**Misconception 2: adiabatic means isothermal.** Adiabatic means no heat exchange, and the temperature may change greatly through work; isothermal requires a constant temperature. The two cannot be interchanged.

**Misconception 3: using $C_p-C_V=nR$ for real gases or liquids.** Mayer's relation depends strictly on the ideal gas law $pV=nRT$; real gases have a correction term because $pV\neq nRT$.

**Misconception 4: believing $\gamma$ is always greater than 1 and constant.** For polyatomic gases with excited vibrational modes $\gamma$ approaches 1 and varies with temperature (vibrations are usually not excited at ordinary temperatures).

**Misconception 5: applying the Poisson equations to an irreversible adiabatic process.** Free expansion and throttling are irreversible and require energy conservation or entropy analysis instead of $pV^\gamma=$ constant.

## VI. Extensions and Synthesis

Heat capacity and adiabatic processes extend into many fields. In the Earth's atmosphere, air that rises and expands adiabatically cools at a lapse rate of about $g/c_p$, the dry adiabatic lapse rate of meteorology; moist air has a smaller lapse rate because condensation releases latent heat, producing unstable convection and thunderstorms. In acoustics the compressions and expansions of a sound wave are so fast that they are approximately adiabatic, and the sound speed $v=\sqrt{\gamma p/\rho}=\sqrt{\gamma RT/M}$ contains $\gamma$ explicitly, which allows the heat capacity ratio to be inferred from acoustic measurements. In low-temperature physics the heat capacity of solids follows the Debye $T^3$ law at low temperature rather than the classical Dulong–Petit constant, showing that the classical theory of heat capacity needs quantum corrections. Combining the two main threads—"heat capacity is the manifestation of degrees of freedom under equipartition" and "adiabatic means work changes the internal energy"—explains a wide range of phenomena from weather to the speed of sound at the molecular level, and displays the power of thermal physics to unify the macroscopic and the microscopic.

## VII. Self-Test and Knowledge Map

The most confusing point about heat capacity is that it is not a "constant of the substance" but a "constant of the process". The same bottle of oxygen has different constant-volume and constant-pressure heat capacities; the same substance differs at low and high temperature. At low temperature the rotational and vibrational degrees of freedom of the molecules are "frozen", and the heat capacity decreases as the temperature falls; only at room temperature is $C_V$ of a diatomic gas stable at $\frac{5}{2}R$. If the temperature is high enough to excite vibrations, $C_V$ rises further to $\frac{7}{2}R$. Classical equipartition cannot explain this temperature dependence and quantum statistics is required—the Einstein and Debye theories of the heat capacity of solids were among the earliest victories of quantum theory, and the Debye $T^3$ law agrees perfectly with experiment at very low temperature, proving that classical physics must fail at the microscopic scale.

Adiabatic processes are everywhere in nature. A dry parcel of air lifted by the terrain expands approximately adiabatically and cools according to $T p^{(1-\gamma)/\gamma}$, giving a dry adiabatic lapse rate of about $9.8\ \text{K/km}$; once the air is saturated, condensation releases latent heat and slows the cooling, giving the moist adiabatic lapse rate, and the difference between the two drives the development of thunderstorms and convection. Understanding this explains why mountain tops are cold, why dry hot winds (foehn effects) occur on lee slopes, and why weather forecasting must account for the adiabatic ascent and descent of air parcels.

In engineering, adiabatic compression is the main process of a compressor, but because it is actually irreversible, the barrel heats up and the efficiency is below the reversible adiabatic value; for this reason large compressors use staged compression with intercooling, staying as close to isothermal as possible to save work. Conversely, expansion in the turbine of a gas turbine is approximately adiabatic and, while delivering work, sharply lowers the gas temperature. Combining Mayer's relation with the Poisson equations also yields the sound speed $v=\sqrt{\gamma RT/M}$, so acoustic measurements can be used to infer the heat capacity ratio of a gas—a neat application of heat capacity theory in acoustics.

It is worth adding that not all systems have positive heat capacity. Self-gravitating systems such as stars and black holes have "negative heat capacity": losing energy makes them hotter, the opposite of ordinary bodies, yet this is the source of the stability of gravitationally bound systems. In everyday life the unusually large specific heat of water (about $4.18\ \text{kJ/(kg}\cdot\text{ K)}$) makes it an ideal medium for storing and dissipating heat; the oceans moderating the global climate and water-cooling systems protecting engines both stem from this. Finally, note that specific heat is often quoted either per unit mass or per mole; check before solving, since the two differ by a factor of the molar mass, and confusing them is one of the commonest ways to lose marks in examinations. Gather these seemingly scattered phenomena into the unified framework "heat capacity measures the energy needed to raise the temperature, adiabatic measures the temperature change caused by work", and the picture of thermal physics becomes clear.

## VIII. Supplementary Derivation: The Complete Integration of the Adiabatic Equations

Textbooks usually state $pV^\gamma = $ constant directly; here the derivation is completed so that you can really "see" where the three Poisson equations come from.

For a reversible adiabatic infinitesimal process $\delta Q = 0$, and the first law becomes

$$dU = -p\,dV$$

For an ideal gas $dU = nC_V dT$, so

$$nC_V\,dT = -p\,dV$$

Substituting the equation of state $p = \dfrac{nRT}{V}$:

$$nC_V\,dT = -\frac{nRT}{V}dV \quad\Rightarrow\quad \frac{dT}{T} = -\frac{R}{C_V}\cdot\frac{dV}{V}$$

Here $R/C_V$ appears. Writing Mayer's relation in molar form $c_p - c_V = R$ with $\gamma = c_p/c_V$,

$$\frac{R}{c_V} = \frac{c_p - c_V}{c_V} = \gamma - 1$$

Substituting back and rearranging:

$$\frac{dT}{T} + (\gamma-1)\frac{dV}{V} = 0$$

Integrating term by term gives $\ln T + (\gamma-1)\ln V = $ constant, i.e. after exponentiation

$$TV^{\gamma-1} = \text{constant}$$

To obtain the $p$–$V$ form, just substitute $T = \dfrac{pV}{nR}$ back:

$$\frac{pV}{nR}\cdot V^{\gamma-1} = \text{constant} \quad\Rightarrow\quad pV^{\gamma} = \text{constant}$$

To obtain the $T$–$p$ form, eliminate $V$ using $V \propto T^{1/(1-\gamma)}$:

$$T^{\gamma}p^{1-\gamma} = \text{constant}$$

The three Poisson equations follow in one sweep; they are not three unrelated conclusions but three ways of writing the same differential relation.

**Closed-form expression for adiabatic work** (very useful): substituting $p = p_1V_1^\gamma/V^\gamma$ into the integral,

$$W = \int_{V_1}^{V_2} p\,dV = \frac{p_1V_1 - p_2V_2}{\gamma-1} = \frac{nR(T_1-T_2)}{\gamma-1}$$

which is completely equivalent to $W = -\Delta U = -nC_V(T_2-T_1)$ because $nC_V = \dfrac{nR}{\gamma-1}$. Both routes may be used in solving problems, and they check each other.

## IX. A Comprehensive Worked Example

**Problem: $n=0.5\ \text{mol}$ of air, treated as a rigid diatomic ideal gas ($\gamma = 1.4$, $C_{V,m}=\dfrac{5}{2}R$), is compressed reversibly and adiabatically from $p_1 = 1.0\times10^{5}\ \text{Pa}$, $T_1=300\ \text{K}$ to $p_2 = 8.0\times10^{5}\ \text{Pa}$. Find: (1) the final temperature $T_2$; (2) the initial and final volumes; (3) the work $W^{\prime}$ required from outside; (4) the work required if instead a reversible isothermal compression to the same final volume were used.**

**(1) Final temperature.** Using $T^\gamma p^{1-\gamma} = $ constant, equivalently

$$T_2 = T_1\left(\frac{p_2}{p_1}\right)^{\frac{\gamma-1}{\gamma}} = 300\times 8^{0.2857}$$

The exponent is $\dfrac{\gamma-1}{\gamma} = \dfrac{0.4}{1.4}\approx 0.2857$, and $8^{0.2857} = e^{0.2857\times\ln 8} = e^{0.2857\times 2.079} = e^{0.594}\approx 1.811$, so

$$T_2 \approx 300\times1.811 \approx 543\ \text{K}\quad(\text{about }270^\circ\text{C})$$

**(2) Initial and final volumes.**

$$V_1 = \frac{nRT_1}{p_1} = \frac{0.5\times8.314\times300}{1.0\times10^{5}} \approx 1.247\times10^{-2}\ \text{m}^3\ (\approx 12.5\ \text{L})$$

From $V_2 = V_1\left(\dfrac{p_1}{p_2}\right)^{1/\gamma} = 1.247\times10^{-2}\times 8^{-0.714}$, and $8^{-0.714} = e^{-0.714\times2.079} = e^{-1.485}\approx 0.227$,

$$V_2 \approx 2.83\times10^{-3}\ \text{m}^3\ (\approx 2.8\ \text{L})$$

Check: $p_2V_2 = 8.0\times10^{5}\times2.83\times10^{-3} \approx 2.26\times10^{3}\ \text{J}$ and $nRT_2 = 0.5\times8.314\times543 \approx 2.26\times10^{3}\ \text{J}$, in agreement.

**(3) Work required for adiabatic compression.** Since $Q=0$, all the work from outside becomes internal energy:

$$W^{\prime} = \Delta U = nC_{V,m}(T_2-T_1) = 0.5\times\frac{5}{2}\times8.314\times(543-300) \approx 10.39\times243 \approx 2.53\times10^{3}\ \text{J}$$

Checking with the closed form: $W^{\prime} = \dfrac{nR(T_2-T_1)}{\gamma-1} = \dfrac{0.5\times8.314\times243}{0.4}\approx 2.53\times10^{3}\ \text{J}$, consistent.

**(4) Isothermal compression to the same final volume.** Compressing isothermally to $V_2 = 2.83\times10^{-3}\ \text{m}^3$ requires

$$W^{\prime}_\text{iso} = nRT_1\ln\frac{V_1}{V_2} = 0.5\times8.314\times300\times\ln\frac{1.247\times10^{-2}}{2.83\times10^{-3}} \approx 1247\times\ln 4.41 \approx 1247\times1.484 \approx 1.85\times10^{3}\ \text{J}$$

**Discussion:** when compressed to the same volume, the adiabatic work ($2.53\ \text{kJ}$) exceeds the isothermal work ($1.85\ \text{kJ}$), and the difference is exactly the extra cost caused by "the extra pressure from the temperature rise". This also explains why engineering pursues **staged compression with intercooling**: keep the process as close to the isotherm as possible to save work, while avoiding a final temperature so high that it damages the equipment.

## X. Pitfalls and Problem-Solving Conventions

**Pitfall 1: mixing up $\gamma$ and the degrees of freedom.** First determine $i$ from the kind of molecule (monatomic $i=3$, rigid diatomic $i=5$), then compute $\gamma = \dfrac{i+2}{i}$; never simply plug in $1.4$.

**Pitfall 2: writing the volume ratio upside down.** In $T_2 = T_1\left(\dfrac{V_1}{V_2}\right)^{\gamma-1}$ and $p_2 = p_1\left(\dfrac{V_1}{V_2}\right)^{\gamma}$ the volume ratio must be "initial over final". Written the other way round, compression would give the absurd conclusion of cooling and depressurization—noticing such a result and turning back to check is a quick self-check.

**Pitfall 3: confusing the work in the two directions.** Work done by the system is $W = -\Delta U$; work done on the system is $W^{\prime} = +\Delta U$. Always state at the outset which is required; many lost marks come not from miscalculation but from a missing minus sign.

**Pitfall 4: comparing amounts of work without fixing the comparison conditions.** Part (4) above shows that "adiabatic work exceeds isothermal work" holds provided **the final volume is the same**; for a fixed final pressure the conclusion may reverse at small pressure ratios. Any comparison must state first "which quantity is held the same".

**Pitfall 5: applying Mayer's relation to a real gas.** $c_p - c_V = R$ depends strictly on $pV = nRT$; at high pressure and low temperature corrections are needed, otherwise both the heat capacity and $\gamma$ are off.

**Pitfall 6: unit conversion.** $\text{L}$ and $\text{m}^3$ differ by $10^{3}$, and with pressure in $\text{kPa}$ the volume should be in $\text{L}$ (the product is in $\text{J}$). Unifying the units before writing any equation saves half the rework.

**Pitfall 7: treating "fast enough" as "adiabatic".** In engineering, fast processes are often approximated as adiabatic on the grounds that there is no time for heat exchange; but strictly, fast does not mean reversible adiabatic—violent disturbances usually bring internal irreversibility (turbulence, friction, uneven temperature). The criterion for using $pV^\gamma = $ constant is **quasi-static and reversible**, not merely "rapid".

**Pitfall 8: ignoring the drift of $\gamma$ with temperature.** At high temperature the vibrational degrees of freedom are gradually excited, and $\gamma$ of a diatomic gas falls slowly from $1.4$ while $C_V$ rises correspondingly. For problems requiring high precision or involving temperature rises of thousands of kelvin, integrate the actual tabulated heat capacity rather than using the room-temperature value throughout.

`,
  },

  'second-law': {
    chapter: 'Chapter 5 The Second Law of Thermodynamics',
    title: 'Reversible and Irreversible Processes, Two Formulations',
    summary:
      'The second law states that every real process connected with thermal phenomena is irreversible; the Kelvin and Clausius formulations are equivalent and rule out perpetual motion machines of the second kind.',
    keyPoints: [
      'Kelvin statement: it is impossible to absorb heat from a single reservoir and convert it entirely into work without other effects',
      'Clausius statement: heat cannot flow spontaneously from a colder to a hotter body',
      'The two statements are equivalent and both point to the irreversibility of processes',
      'Real macroscopic processes (friction, free expansion, heat conduction) are all irreversible',
      'A perpetual motion machine of the second kind (single-reservoir engine) violates the second law and is therefore impossible',
    ],
    content: String.raw`

The first law tells us that energy is conserved, but it is silent about the direction of processes: it forbids neither hot water spontaneously cooling nor cold water spontaneously heating up to a boil—as long as the total energy is unchanged, the first law "permits" everything. Yet in reality a broken cup does not reassemble itself, mixed ink does not separate spontaneously, hot porridge always cools and cold porridge does not boil by itself. These phenomena share one feature: **natural processes have a direction, and that direction is irreversible**. The second law of thermodynamics is the law that gives this "arrow of time" a scientific formulation.

Consider a lump of putty dropped on the floor: its kinetic energy becomes internal energy (a tiny temperature rise), which obeys the first law; but the reverse process—the putty on the floor spontaneously gathering energy and leaping back into your hand—though not violating energy conservation, never happens. What is the difference? The former involves "dissipation": ordered macroscopic motion becomes disordered molecular thermal motion, whereas the reverse would require countless molecules to cooperate so that disordered thermal motion turns back into ordered motion, a probability so small as to be essentially zero. The essence of the second law is precisely to elevate this "statistical impossibility" to a fundamental limitation of nature.

The heat engine question also comes to the fore: can one build a machine that absorbs heat from the ocean (a single reservoir) and continuously does work? The first law does not object (energy is conserved), but the second law firmly forbids it—otherwise humanity would possess an inexhaustible energy source. Such a fantasy device that "takes heat from a single reservoir and does work" is called a perpetual motion machine of the second kind; it is subtler than a perpetual motion machine of the first kind and equally impossible.

## II. Rigorous Definitions

**Reversible process**: a process after which both the system and the surroundings can be restored exactly to their initial states without leaving any change. A reversible process must be quasi-static and free of dissipation (the ideal limit of no friction, no resistance). All real macroscopic processes are irreversible.

**Irreversible process**: a process that cannot return the system to its initial state without leaving effects on the surroundings. Typical irreversible processes: friction generating heat, heat conduction under a finite temperature difference, free expansion of a gas, diffusion, spontaneous chemical reactions.

**Kelvin statement**: it is impossible to absorb heat from a single reservoir and convert it entirely into useful work without causing other changes. In other words, a single-reservoir heat engine with efficiency $100\%$ cannot exist.

**Clausius statement**: heat cannot pass spontaneously, and without cost, from a colder to a hotter body.

**Equivalence of the two statements**: proved by contradiction. If the Clausius statement failed (heat could flow from cold to hot at no cost), one could use this to move heat from cold to hot, then combine it with an ordinary heat engine that converts part of the high-temperature heat into work and rejects the rest to the cold reservoir; overall this is equivalent to taking heat from a single reservoir and doing work, violating the Kelvin statement. The converse holds likewise. So the two statements are equivalent and describe the same law of nature.

**Perpetual motion machine of the second kind**: a cyclic machine that absorbs heat from a single reservoir and converts it entirely into work. Since a cycle returns to the initial state with $\Delta U=0$, having $W=Q$ (full conversion) is equivalent to work from a single reservoir and violates the Kelvin statement, so such a machine cannot be built.

## III. Why We Understand It This Way

**Why is reversibility an ideal limit rather than a reality?** Real processes always involve friction, viscosity, finite temperature differences and other dissipation, and inevitably leave traces outside (such as heat), so they cannot be fully restored. Reversibility requires every step to be infinitely close to equilibrium and free of dissipation—an abstract limit approached but never reached, used as the efficiency bound for real processes.

**Why are the two statements equivalent yet phrased from different angles?** Kelvin starts from "the directionality of work into heat" (heat engines) and Clausius from "the directionality of heat conduction". Their equivalence shows that all irreversible processes are interconnected: if one irreversibility were denied, the others would fall with it, since they spring from the same arrow of time.

**Why is a perpetual motion machine of the second kind more seductive than a "perpetual motion machine"?** It does not violate energy conservation (unlike a machine of the first kind, which creates energy from nothing); it wants to "freeload" on the thermal energy of the environment. Precisely because it wears the cloak of conservation, the second law is needed to close off this path.

**Why is free expansion irreversible although energy is conserved?** In free expansion $\Delta U=0$ and $Q=W=0$, so the first law has no objection; but the gas goes from occupying half the container to filling it, microscopically from "concentrated" to "spread out", and the reverse would require all molecules to return to half the container, a vanishingly small probability. This shows that directionality is decided by probability and the number of microstates, not by energy.

## IV. Typical Calculations

**Example 1: intuition for the efficiency limit.** If a heat engine absorbs $Q_H=1000\ \text{J}$ from $T_H=600\ \text{K}$ and rejects heat to $T_C=300\ \text{K}$, the maximum work under the Carnot limit is

$$W_{\max} = Q_H\left(1-\frac{T_C}{T_H}\right) = 1000\times\left(1-\frac{300}{600}\right) = 500\ \text{J}$$

Claiming an output of $600\ \text{J}$ (efficiency $60\%$) would exceed the Carnot efficiency $50\%$ and violate the second law, so it is impossible.

**Example 2: judging the direction of a process.** Transferring $100\ \text{J}$ of heat from $T_C=300\ \text{K}$ to $T_H=400\ \text{K}$ without consuming work gives a negative total entropy change (see the next chapter) and violates the second law, so it cannot happen spontaneously; a refrigerator consuming work is required.

**Example 3: loss of work through irreversibility.** An expansion with friction generates more heat and does less work than a reversible adiabatic expansion; even for the same change of internal energy, the actual output is smaller than in the reversible case, and the difference is the dissipation loss—the "price" of irreversibility.

**Example 4: the single-reservoir fantasy.** Imagine extracting $Q=10^{20}\ \text{J}$ from the ocean (at about $T=290\ \text{K}$) and converting it entirely into work. The first law permits it, but the Kelvin statement forbids it "without other effects", so such a device is impossible even in theory.

## V. Common Misconceptions

**Misconception 1: the second law says "heat cannot pass from cold to hot".** Wrong—refrigerators do exactly that; the correct statement is that it cannot happen **spontaneously and without cost**. Refrigeration requires work from outside.

**Misconception 2: the second law contradicts the first.** The two are complementary: the first governs the quantity of energy, the second the direction and quality of processes.

**Misconception 3: believing reversible processes can be realized.** Reversibility is an ideal limit; reality always has dissipation, and one can only approach it.

**Misconception 4: taking "efficiency below 1" as the whole content of the second law.** The second law is stronger: it gives an upper bound on the efficiency of reversible engines (the Carnot efficiency) and forbids work from a single reservoir—far more than "not fully convertible".

**Misconception 5: thinking processes are reversible microscopically.** The microscopic mechanical equations are symmetric under time reversal and individual molecular collisions are reversible; macroscopic irreversibility comes from statistics—the extreme improbability of a vast number of particles moving coherently backwards—not from a dynamical prohibition.

## VI. Extensions and Synthesis

The depth of the second law lies in its linking "direction" with "probability" and in giving birth to the central concept of entropy. Every irreversible process corresponds to an increase of some "disorder" of the system (or of the universe), and a reversible process is the limiting case of zero increase. It also provides the physical basis for the arrow of time: in Newtonian mechanics time can run backwards, while the second law explains statistically why we perceive a one-way flow. In engineering it is the fundamental constraint on the design of heat engines, refrigerators and heat pumps; every real device has an efficiency below the Carnot limit, and the gap is the "exergy loss". In cosmology, the "heat death" hypothesis is precisely the extrapolation of entropy increase to the extreme. To understand the second law, grasp the higher viewpoint that "energy has grades and processes have directions"—it raises physics from "what can be done" to "what is allowed to happen", and is one of the deepest laws of classical physics.

## VII. Self-Test and Knowledge Map

The second law is the easiest to "understand" and the hardest to "internalize". One test is: can you distinguish "impossible" from "not allowed"? The first law says energy cannot be created from nothing (not allowed); the second law says that work from a single reservoir, though not violating energy conservation, cannot happen (statistically not allowed). The former is a hard conservation, the latter a statistical limit. Understand this distinction and you will no longer confuse perpetual motion machines of the second kind with those of the first kind that create energy from nothing.

Now consider the relation between reversible and irreversible. A reversible process is a limit one can never reach, an ideal model like the point particle or the rigid body; all real processes are irreversible because of friction, viscosity and finite temperature differences. But it is precisely this limit that gives us a ruler: the efficiency of any real heat engine is less than the Carnot efficiency for the same temperature limits, and how much less measures the "irreversibility loss". Improving an engine is essentially an effort to close that gap.

The second law has also profoundly shaped our understanding of the nature of time. In Newtonian mechanics time can run backwards and individual molecular collisions are strictly reversible; but macroscopic irreversibility comes from statistics—the probability that all the molecules in a box simultaneously return to one corner is so small that the age of the universe would not suffice to see it. That is, the "arrow of time" is not a dynamical prohibition of reverse processes but a probabilistic near-impossibility. This leap from microscopic reversibility to macroscopic irreversibility is the most fascinating theme of statistical physics.

Moreover, the second law finds a striking echo in information theory: if Maxwell's demon tries to lower the entropy of a system by acquiring information about the molecules, its "memory" and the erasure of that information must produce at least an equal amount of entropy, so the total balance does not decrease. This shows that information and entropy are essentially connected—"the more you know, the lower the entropy"—opening the door to understanding life, computation and even black hole entropy. To master the second law is to hold a universal key for measuring "possibility" and "direction".

## VIII. Supplementary Derivation: A Rigorous Proof of the Equivalence of the Two Statements

We mentioned that the Kelvin and Clausius statements are equivalent; here the argument is completed, which also displays the "proof by contradiction plus device combination" style of reasoning characteristic of thermal physics.

**Step 1: assume the Clausius statement is violated.** That is, there is a device X that can move heat $Q$ from the cold reservoir $T_2$ to the hot reservoir $T_1$ without consuming external work or leaving any other effect.

**Step 2: add an ordinary heat engine Y.** Let Y work between the same two reservoirs, absorbing heat $Q$ from the hot reservoir, doing work $W$ and rejecting $Q-W$ to the cold reservoir. This is entirely legitimate in itself (neither the first nor the second law objects).

**Step 3: combine X and Y into a single device.** At the end of one cycle:

- the hot reservoir: receives $Q$ from X and gives up $Q$ to Y, so its net change is zero;
- the cold reservoir: gives $Q$ to X and receives $Q-W$ from Y, so it loses $W$ net;
- the surroundings: receive only the work $W$.

Thus the only net effect of the combined device is: **heat $W$ is taken from a single reservoir and converted entirely into work, with no other effect**. This is exactly what the Kelvin statement forbids. Therefore if the Clausius statement fails, the Kelvin statement must fail; the converse is proved similarly. The two are mutually necessary and sufficient, describing one and the same law of nature.

**A quantitative view.** Behind this argument lies the **Clausius inequality** for cyclic processes:

$$\oint \frac{\delta Q}{T} \le 0$$

with equality for a reversible cycle and strict inequality for an irreversible one. It turns "the possibility of a process" into a computable inequality—just divide the heat absorbed at each point of the cycle by the local temperature and sum; if the result is positive, the process is absolutely impossible. This is the sharpest tool for judging the authenticity of all kinds of "miraculous heat engines", and also the starting point of the concept of entropy in the next chapter.

## IX. A Comprehensive Worked Example

**Problem: a factory has a waste-heat source at $T_1 = 500\ \text{K}$ that can steadily supply a heat flow $\dot{Q}_H = 100\ \text{kJ/s}$, with the environment at $T_2 = 300\ \text{K}$ as the cold reservoir. (1) Find the maximum output power and the heat rejected per second to the environment if a reversible Carnot engine operates between them. (2) A vendor claims that an engine can deliver $60\ \text{kW}$ under these conditions; use both formulations to judge whether this is possible. (3) If the actual engine achieves only $60\%$ of the Carnot efficiency, find the extra heat rejected per second and the corresponding entropy production rate.**

**(1) Reversible Carnot case.**

$$\eta_C = 1 - \frac{T_2}{T_1} = 1 - \frac{300}{500} = 0.4 = 40\%$$

$$P_{\max} = \eta_C\,\dot{Q}_H = 0.4\times100\ \text{kJ/s} = 40\ \text{kW}$$

$$\dot{Q}_C = \dot{Q}_H - P_{\max} = 100 - 40 = 60\ \text{kJ/s}$$

Check: $\dfrac{\dot{Q}_H}{T_1} = \dfrac{100}{500} = 0.2\ \text{kJ/(K·s)}$ and $\dfrac{\dot{Q}_C}{T_2} = \dfrac{60}{300}$, exactly equal, satisfying the reversible-cycle requirement $\oint \dfrac{\delta Q}{T} = 0$.

**(2) Judging the claimed $60\ \text{kW}$.** The claimed efficiency is $\eta = \dfrac{60}{100} = 60\% > \eta_C = 40\%$.

- By the **Carnot theorem**: no engine can exceed the reversible Carnot efficiency between the same temperature limits, so it is impossible;
- By the **Clausius inequality**: for $60\ \text{kW}$ output the rejected heat would be $40\ \text{kJ/s}$, and the cyclic integral $\oint\dfrac{\delta Q}{T} = \dfrac{100}{500} - \dfrac{40}{300} = 0.200 - 0.133 = +0.067\ \text{kJ/(K·s)} > 0$, violating the theorem, so again impossible.

**(3) Actual engine.** The actual efficiency is $\eta = 0.6\times40\% = 24\%$, the output $P = 0.24\times100 = 24\ \text{kW}$ and the rejected heat $\dot{Q}_C = 100-24 = 76\ \text{kJ/s}$, which is $76-60 = 16\ \text{kJ/s}$ more than in the reversible case. The entropy production rate is

$$\dot{S}_\text{gen} = -\frac{\dot{Q}_H}{T_1} + \frac{\dot{Q}_C}{T_2} = -\frac{100}{500} + \frac{76}{300} \approx -0.200 + 0.253 = 0.053\ \text{kJ/(K·s)}$$

The lost power is exactly $T_2\dot{S}_\text{gen} = 300\times0.053 \approx 16\ \text{kW}$, in agreement with the difference $40-24=16\ \text{kW}$ between (1) and (3). This relation is called the **Gouy–Stodola theorem**; it converts the "irreversibility loss" exactly into engineering terms: the more entropy produced, the more work is wasted.

## X. Pitfalls and a Checklist of Criteria

**Pitfall 1: treating "isothermal expansion of an ideal gas" as violating the Kelvin statement.** Isothermal expansion does convert all the heat absorbed into work, but the volume of the gas has changed—exactly the case excluded by "without other changes" in the Kelvin statement. Kelvin forbids a **cyclic** machine from doing work from a single reservoir; a single process can perfectly well achieve full conversion. Checking "is there any other effect" is the key to defusing this trap.

**Pitfall 2: believing the second law forbids heat from cold to hot.** Refrigerators do this every day, paying with external work. What is forbidden is transfer that is "spontaneous and free".

**Pitfall 3: describing a violation of the second law as a violation of the first.** A perpetual motion machine of the second kind strictly obeys energy conservation; it is condemned only because its direction is not allowed. In an answer, state clearly "it does not violate the first law but violates the second".

**Pitfall 4: comparing efficiencies without checking the temperature unit.** The temperatures in $\eta_C = 1 - T_2/T_1$ must be **kelvin**. Substituting $t = 227^\circ\text{C}$ and $27^\circ\text{C}$ gives absurd results; the correct values are $500\ \text{K}$ and $300\ \text{K}$.

**Pitfall 5: using the wrong criterion.** There are two equivalent ways to judge whether an engine is feasible—compare with the Carnot efficiency, or compute the cyclic integral $\oint\dfrac{\delta Q}{T}$ (which must be $\le 0$). The former is quick, the latter universal; master both and check one against the other.

**Pitfall 6: thinking the bottleneck on efficiency is only technological.** The Carnot efficiency is a theoretical ceiling, in which $T_2$ is usually fixed by the environment (rivers, atmosphere) and hard to lower artificially, while $T_1$ is limited by the temperature resistance of the engine materials. Recognizing these two hard constraints is the only way to understand why the power industry regards heat-resistant materials as core technology.

`,
  },
  'entropy': {
    chapter: 'Chapter 6 Entropy and the Increase of Entropy',
    title: 'The Definition of Entropy and the Boltzmann Relation',
    summary:
      'Entropy measures the disorder of a system; for a reversible process the entropy change is defined by $dS=\\delta Q_\\text{rev}/T$, and the Boltzmann relation $S=k\\ln\\Omega$ connects it to the number of microstates.',
    keyPoints: [
      'Clausius definition $dS = \\delta Q_\\text{rev}/T$; entropy is a state function',
      'Clausius inequality $\\Delta S \\ge \\int \\delta Q/T$ (equality for reversible processes)',
      'Boltzmann relation $S = k\\ln\\Omega$ links macroscopic entropy to the number of microstates',
      'Principle of entropy increase: for an isolated system $\\Delta S \\ge 0$, with equality when reversible',
      'Entropy is a statistical measure of the disorder of a system',
    ],
    content: String.raw`

The second law tells us that natural processes are irreversible and have a direction, but we want a concrete quantity to characterize that "direction"—which state is more "spread out", which more "ordered". Imagine a room that gets messier unless tidied, ink that disperses when dropped into water, a gas that fills the whole container on free expansion. In all these phenomena the system goes from "concentrated" to "dispersed". If we could assign to every macroscopic state a number called **entropy** such that spontaneous processes always increase it, the second law would acquire a computable, comparable quantitative form. Entropy, in plain terms, is the scientific scale of "disorder" or "degree of dispersion".

Why do we need a dedicated quantity rather than using energy? Because, as noted above, in these processes the energy can be conserved (free expansion has $\Delta U=0$), and energy cannot distinguish "tidy" from "messy". But "tidy" corresponds to few microscopic arrangements and "messy" to many—books lined up neatly have only a few arrangements, while scattered books have astronomically many. Entropy is exactly the result of counting such microscopic possibilities: the more possibilities, the larger the entropy. Spontaneous processes therefore tend towards the "more probable" state, that is, the state of larger entropy. This leap from "counting" to "direction" is the most beautiful insight of statistical physics.

Everyday experience agrees: melting ice into water and evaporating water into vapour both increase entropy (molecules go from a regular lattice to free motion); burning turns ordered fuel into dispersed exhaust and heat, again increasing entropy. Entropy is not only a thermodynamic quantity but a ruler for measuring "possibility".

## II. Rigorous Definitions

**Clausius definition of entropy**: for a reversible infinitesimal process define the entropy change

$$dS = \frac{\delta Q_\text{rev}}{T}$$

where $\delta Q_\text{rev}$ is the heat absorbed in the reversible process and $T$ the temperature. Since the entropy difference between any two equilibrium states is path-independent, the entropy $S$ is a state function. For a finite reversible process:

$$\Delta S = \int_A^B \frac{\delta Q_\text{rev}}{T}$$

**Clausius inequality**: for any process (including irreversible ones),

$$\Delta S \ge \int_A^B \frac{\delta Q}{T}$$

with equality if and only if the process is reversible; the strict inequality reflects the "extra" entropy produced by irreversibility.

**Boltzmann relation**: the entropy is related to the number of microstates $\Omega$ (the number of microscopic arrangements corresponding to the macrostate) by

$$S = k\ln\Omega$$

where $k$ is the Boltzmann constant. This formula ties macroscopic entropy directly to microscopic possibility and is the cornerstone of statistical physics; Boltzmann had it engraved on his tombstone.

**Principle of entropy increase**: for an isolated system (exchanging neither heat nor work with the outside), $\delta Q=0$, so the Clausius inequality gives

$$\Delta S_\text{isolated} \ge 0$$

with equality for reversible processes and strict inequality for irreversible (spontaneous) ones. This is the mathematical statement of the second law.

**Entropy change of an ideal gas** (reversible isothermal): $\Delta S = nR\ln(V_2/V_1)$; isochoric: $\Delta S = nC_V\ln(T_2/T_1)$; isobaric: $\Delta S = nC_p\ln(T_2/T_1)$.

## III. Why We Understand It This Way

**Why is entropy a state function though defined through a process quantity?** Although the definition contains $\delta Q_\text{rev}$ (a process quantity), it stipulates that the integral must be taken along a reversible path; different reversible paths give the same result (because the integrand forms an exact differential), so the value of $S$ depends only on the state, not on the path.

**Why does large $\Omega$ correspond to large entropy?** $\Omega$ is the number of microscopic arrangements in a macrostate. A system spontaneously tends to the macrostate of maximum probability (maximum $\Omega$), and $S=k\ln\Omega$ increases monotonically with $\Omega$, so a spontaneous process with $\Delta S>0$ is equivalent to "moving to a more probable macrostate". Entropy increase means "from less probable to more probable".

**Why does entropy not decrease in an isolated system?** An isolated system has no external intervention, and the process is driven by internal probability, so it necessarily moves to the macrostate with more microstates, corresponding to an increase of entropy; in the reversible limit the system stays close to equilibrium with no net trend and the entropy is unchanged.

**Why must reversible heat be used in $dS=\delta Q/T$?** Because only a reversible path makes $\delta Q/T$ an exact differential; for an irreversible process the actual $\delta Q/T$ is smaller than the true entropy change, the difference being "entropy production", so an inequality rather than an equality is needed.

## IV. Typical Calculations

**Example 1: entropy change in isothermal free expansion.** $n=1\ \text{mol}$ of ideal gas expands freely from $V_1$ to $2V_1$; although the process is irreversible, the initial and final temperatures are equal, so a reversible isothermal path may be used:

$$\Delta S = nR\ln\frac{V_2}{V_1} = 1\times8.314\times\ln 2 \approx 5.76\ \text{J/K} > 0$$

The entropy of the isolated system increases, consistent with the principle; and since $Q=0$ for free expansion, this verifies $\Delta S > Q/T=0$.

**Example 2: entropy change in heat conduction.** Transfer $Q=1000\ \text{J}$ from $T_H=400\ \text{K}$ to $T_C=300\ \text{K}$ (an isolated two-body system, reversible approximation):

$$\Delta S = -\frac{Q}{T_H} + \frac{Q}{T_C} = -\frac{1000}{400} + \frac{1000}{300} = -2.5 + 3.33 = 0.83\ \text{J/K} > 0$$

The total entropy increases, showing that heat conduction across a finite temperature difference is irreversible.

**Example 3: entropy change on isobaric heating.** $n=2\ \text{mol}$ of monatomic gas ($C_p=\frac{5}{2}R$) heated at constant pressure from $300\ \text{K}$ to $600\ \text{K}$:

$$\Delta S = nC_p\ln\frac{T_2}{T_1} = 2\times\frac{5}{2}\times8.314\times\ln 2 \approx 41.6\times0.693 \approx 28.8\ \text{J/K}$$

**Example 4: Boltzmann microscopic counting.** If the number of microstates of a macrostate rises by a factor $e^{10}$, the entropy increase is $\Delta S = k\ln(e^{10}\Omega_1)-k\ln\Omega_1 = 10k$, showing that an exponential growth of $\Omega$ corresponds to a linear increase of entropy.

## V. Common Misconceptions

**Misconception 1: entropy is just "disorder", and the messier the larger.** This is a popular analogy, but entropy is strictly defined by $\Omega$; some ordered structures (such as crystals) can have low entropy under particular conditions, and one cannot judge by appearance alone.

**Misconception 2: thinking the entropy of a non-isolated system must increase.** The principle of entropy increase holds only for isolated systems; open systems (organisms, refrigerators) can decrease their entropy locally, provided the surroundings compensate so that the total increases.

**Misconception 3: confusing entropy with energy.** Energy is conserved, entropy is not; entropy can be produced by irreversibility and can be transferred in reversible processes—the two have completely different natures.

**Misconception 4: thinking entropy-decreasing processes are impossible.** In local, non-isolated systems entropy can decrease (freezing, the growth of life), at the price of a larger entropy increase in the surroundings; the total entropy still does not decrease.

**Misconception 5: substituting an irreversible process directly into the equality $dS=\delta Q/T$.** The entropy change must be computed along a reversible path, or an entropy production term added; substituting the actual $\delta Q/T$ underestimates the true entropy change.

## VI. Extensions and Synthesis

Entropy spans thermodynamics, statistical physics, information theory and even cosmology. In information theory the Shannon entropy $H=-\sum p_i\ln p_i$ is isomorphic to the Boltzmann entropy, making "information is negative entropy" a profound proposition—if Maxwell's demon tries to lower the entropy of a system using information, its own acquisition of information must produce at least an equal amount of entropy, so the total balance is preserved. In cosmology, black holes have a Bekenstein–Hawking entropy proportional to their area, hinting at thermodynamic laws in gravitational systems. In life sciences, organisms maintain low entropy by eating low-entropy matter and excreting high-entropy waste—a model of entropy balance in open systems. From the macroscopic definition $dS=\delta Q_\text{rev}/T$ to the microscopic essence $S=k\ln\Omega$ and on to the unified framework of information entropy, entropy has become the universal language for measuring "uncertainty" and "possibility". To master it is to master the sharpest quantitative tool of the second law, and to understand why "the universe's total account—entropy—only grows".

## VII. Self-Test and Knowledge Map

Entropy is perhaps the most abstract and most easily misread concept in thermal physics. An effective self-test is: can you state correctly when "entropy decrease" is possible? Many people memorize "entropy always increases" but forget the premise that the system is isolated. The interior of a refrigerator cools and its entropy decreases, entirely legitimately, because it is not an isolated system—the compressor consumes electricity and the environment pays a larger entropy increase, so the total does not decrease. The growth of organisms, crystallization and the formation of ordered structures are all instances of local entropy decrease in open systems and in no way violate the principle of entropy increase.

Now consider the popular reading of entropy as "disorder". Equating entropy with visual disorder is intuitive but unreliable: a crystal is highly ordered with low entropy, yet some seemingly "tidy" macrostates may correspond to an enormous number of microstates. Strictly, entropy is the logarithm of the number of microscopic arrangements corresponding to a macrostate, $S=k\ln\Omega$; it measures "in how many ways the macrostate can be realized", not mere visual tidiness. Ice melting into water increases entropy because at the same energy the number of microscopic positions and velocity combinations available to the molecules explodes, not because it "looks messier".

The engineering value of entropy is equally great. In chemical reactions the Gibbs free energy $G=H-TS$ combines enthalpy and entropy to decide whether a reaction is spontaneous: it occurs if $\Delta G<0$, and the term $-T\Delta S$ is precisely entropy's contribution to spontaneity, explaining many endothermic reactions that proceed spontaneously (such as some dissolution processes). In materials science entropy can even stabilize special phases—"entropy-stabilized materials" use high configurational entropy to stabilize a single phase at high temperature, a frontier of recent alloy design.

From a grander perspective, the principle of entropy increase points to the ultimate fate of the universe. If the universe is treated as an isolated system, its total entropy only grows, eventually approaching heat death—all temperature differences vanish and no useful work can be done. Of course this is only an extrapolation based on classical thermodynamics; dark energy, gravitational collapse and other effects may rewrite the local conclusions. But in any case, entropy, as the quantitative scale of "possibility" and "the direction of time", has travelled from the thermal physics laboratory to cosmology, information theory and the life sciences, becoming one of the most universal concepts across the natural sciences. It also reminds us that entropy is not an enemy but a background—it is precisely in the flood of entropy increase that locally entropy-decreasing life appears so precious and so fragile.

## VIII. Supplementary Derivation: The General Formula for the Entropy Change of an Ideal Gas

The three formulas for isothermal, isochoric and isobaric entropy change given in the previous chapter are special cases of a single formula. Here is the complete derivation that unifies them.

Take $n\ \text{mol}$ of ideal gas and consider an arbitrary reversible infinitesimal process. By the first law and the equation of state:

$$\delta Q_\text{rev} = dU + p\,dV = nC_V dT + \frac{nRT}{V}dV$$

By the Clausius definition $dS = \dfrac{\delta Q_\text{rev}}{T}$, dividing both sides by $T$:

$$dS = nC_V\frac{dT}{T} + nR\frac{dV}{V}$$

If $C_V$ may be treated as constant over the temperature range, integrate directly from the initial to the final state:

$$\Delta S = nC_V\ln\frac{T_2}{T_1} + nR\ln\frac{V_2}{V_1}$$

This is the **general formula for the entropy change of an ideal gas**. Setting $V_2=V_1$ gives the isochoric formula $\Delta S = nC_V\ln\dfrac{T_2}{T_1}$; setting $T_2=T_1$ gives the isothermal formula $\Delta S = nR\ln\dfrac{V_2}{V_1}$.

To obtain the isobaric formula, simply replace the volume using $V_2/V_1 = (T_2/T_1)(p_1/p_2)$:

$$\Delta S = nC_V\ln\frac{T_2}{T_1} + nR\ln\frac{T_2}{T_1} - nR\ln\frac{p_2}{p_1} = nC_p\ln\frac{T_2}{T_1} - nR\ln\frac{p_2}{p_1}$$

For an isobaric process $p_2=p_1$, the last term vanishes and $\Delta S = nC_p\ln\dfrac{T_2}{T_1}$.

**Key reminder:** the right side contains only the state variables $T,V$ (or $T,p$), so it describes **the entropy difference itself**; whether the derivation path is "reversible" is only a computational device. Even if the actual process is irreversible (free expansion, expansion into a vacuum), as long as the initial and final states are equilibrium states the same formula applies—this is the power of "entropy is a state function". Conversely, using the actual $\int\dfrac{\delta Q}{T}$ of an irreversible process gives only the heat flow divided by temperature, which is not the entropy change; the difference is the so-called **entropy production** $S_\text{gen}$:

$$\Delta S = \int \frac{\delta Q}{T} + S_\text{gen},\qquad S_\text{gen} \ge 0$$

This is the compact form of the Clausius inequality.

## IX. A Comprehensive Worked Example

**Problem: $2\ \text{mol}$ of monatomic ideal gas ($C_{V,m}=\dfrac{3}{2}R$, $C_{p,m}=\dfrac{5}{2}R$) changes from the initial state $T_1=300\ \text{K}$, $V_1=10\ \text{L}$ to the final state $T_2=600\ \text{K}$, $V_2=40\ \text{L}$. Find the entropy change of the system and verify the result along two other paths.**

**Method 1: the general formula directly.**

$$\Delta S = nC_V\ln\frac{T_2}{T_1} + nR\ln\frac{V_2}{V_1}$$

Here $nC_V = 2\times\dfrac{3}{2}\times8.314 = 24.94\ \text{J/K}$ and $nR = 2\times8.314 = 16.63\ \text{J/K}$. Substituting:

$$\Delta S = 24.94\times\ln 2 + 16.63\times\ln 4 = 24.94\times0.6931 + 16.63\times1.3863 \approx 17.29 + 23.05 \approx 40.3\ \text{J/K}$$

**Method 2: a two-step reversible path.** First heat at constant volume $V_1$ to $600\ \text{K}$ ($\Delta S_a = nC_V\ln 2 \approx 17.3\ \text{J/K}$), then expand isothermally at $600\ \text{K}$ to $40\ \text{L}$ ($\Delta S_b = nR\ln 4 \approx 23.1\ \text{J/K}$); the total is again $40.3\ \text{J/K}$. Different paths, same result—verifying that entropy is indeed a state function.

**Method 3: the $T$–$p$ formula.** First compute the pressures:

$$p_1 = \frac{nRT_1}{V_1} = \frac{2\times8.314\times300}{1.0\times10^{-2}} \approx 4.99\times10^{5}\ \text{Pa},\qquad p_2 = \frac{2\times8.314\times600}{4.0\times10^{-2}} \approx 2.49\times10^{5}\ \text{Pa}$$

$p_2/p_1 = 0.5$; substituting into $\Delta S = nC_p\ln\dfrac{T_2}{T_1} - nR\ln\dfrac{p_2}{p_1}$ with $nC_p = 2\times\dfrac{5}{2}\times8.314 = 41.57\ \text{J/K}$:

$$\Delta S = 41.57\times0.6931 - 16.63\times\ln 0.5 = 28.81 - 16.63\times(-0.6931) \approx 28.81 + 11.53 \approx 40.3\ \text{J/K}$$

All three methods agree.

**Step 4: judging the nature of the process.** If the change above were achieved by an **irreversible adiabatic** process (for example free expansion into a vacuum followed by stirring), then in fact $\int\dfrac{\delta Q}{T} = 0$ while $\Delta S \approx 40.3\ \text{J/K} > 0$, so the entropy production is positive and the process is indeed irreversible. If it were reversible and adiabatic we would need $\Delta S = 0$, which contradicts the given states—so a state in which $T$ and $V$ both increase **cannot be reached by any reversible adiabatic process**.

## X. Pitfalls and Problem-Solving Conventions

**Pitfall 1: taking $\int\dfrac{\delta Q}{T}$ of the actual irreversible process as the entropy change.** This is the most frequent error in the chapter. To compute an entropy change one must find another **reversible path** connecting the same initial and final states, or use the general formula; in free expansion $\delta Q = 0$ but the entropy change is not zero.

**Pitfall 2: computing only the entropy of the system when judging spontaneity.** The principle of entropy increase applies only to **isolated systems**. For open or non-adiabatic systems the entropy change of the surroundings must be included, using $\Delta S_\text{total} = \Delta S_\text{system} + \Delta S_\text{surroundings} \ge 0$. A refrigerator cooling its interior is the best counterexample.

**Pitfall 3: believing the entropy of every process increases.** The entropy of a system can perfectly well decrease (for reversible isothermal compression $\Delta S = nR\ln\dfrac{V_2}{V_1} < 0$), as long as the accompanying heat release increases the entropy of the surroundings by more.

**Pitfall 4: confusing the conversion between $\Delta S$ and the number of states $\Omega$.** In using $S = k\ln\Omega$ one should take a **ratio**: $\Delta S = k\ln\dfrac{\Omega_2}{\Omega_1}$, not $k\ln\Omega_1 + k\ln\Omega_2$.

**Pitfall 5: writing the argument of the logarithm upside down.** $\ln\dfrac{V_2}{V_1}$ is "final over initial", positive on expansion and negative on compression. Writing the reciprocal flips the sign of the whole expression and leads to the erroneous conclusion that compression increases entropy.

**Pitfall 6: using kelvin throughout.** Entropy has units of $\text{J/K}$, and every $T$ in the formulas must be a thermodynamic temperature; also check whether $C_V$, $C_p$ are molar or total values for the system, and do not forget to multiply by $n$.

`,
  },

  'cycles': {
    chapter: 'Chapter 7 Cycles and Heat Engines',
    title: 'The Carnot Cycle and Engine Efficiency',
    summary:
      'A forward cycle converts part of the heat absorbed into net work; the Carnot cycle is the efficiency limit of a reversible heat engine, and its efficiency $\\eta=1-T_2/T_1$ depends only on the two reservoir temperatures.',
    keyPoints: [
      'Engine efficiency $\\eta = W/Q_H = 1 - Q_C/Q_H$',
      'The Carnot cycle consists of two isotherms and two adiabats and is reversible',
      'Carnot efficiency $\\eta_C = 1 - T_2/T_1$, depending only on the two reservoir temperatures',
      'Coefficient of performance of a refrigerator $\\varepsilon = Q_C/W$; of a heat pump $\\varepsilon_h = Q_H/W$',
      'The Clausius–Clapeyron equation describes the slope of a phase boundary',
    ],
    content: String.raw`

A boiler boils water to drive a steam engine; an internal combustion engine ignites a mixture to drive a piston—these machines share a structure: a working substance (steam, combustion gas) repeatedly undergoes a sequence of state changes, continuously absorbing heat from a hot reservoir and rejecting heat to a cold one during the cycle, and converting the net heat difference into net work output. Why must it be a "cycle"? Because to do work continuously the working substance must be reusable, and cannot simply be burned once and finished. Draw the state changes of the working substance as a closed curve, and the area enclosed is the net work of one cycle—this is the geometric picture of a **heat engine**.

But the first and second laws together impose a limit that is both frustrating and important: you cannot convert all the heat absorbed into work. Some heat must be rejected to a cold reservoir, otherwise the cycle cannot close (Carnot's theorem). This leads to the notion of "efficiency": the fraction of the total heat absorbed that actually becomes work. Clearly the more efficient the machine, the more energy it saves. Where, then, is the upper limit of efficiency? The answer was given by the French engineer Carnot: **among all engines working between two reservoirs at fixed temperatures, the reversible Carnot cycle is the most efficient**, and that efficiency depends only on the two temperatures. This conclusion ties engine efficiency directly to temperature and is the crown of engineering thermodynamics.

Conversely, if the cycle is run backwards (work supplied from outside, heat absorbed from the cold and delivered to the hot), one obtains refrigerators and heat pumps—refrigerators and air conditioners work exactly this way. Their "performance" is measured by a coefficient of performance rather than an efficiency. To understand cycles is to understand the entire thermodynamic skeleton from steam engines to power plants, from refrigerators to air conditioners.

## II. Rigorous Definitions

**Cyclic process**: the system undergoes a sequence of changes and returns to its initial state, so the net change of every state function (including internal energy) is zero: $\Delta U=0$. On a $p$–$V$ diagram it is a closed curve.

**Forward cycle (heat engine)**: a clockwise closed curve. In one cycle the engine absorbs $Q_H>0$ from the hot reservoir and rejects $Q_C>0$ (the amount rejected, taken positive) to the cold reservoir, doing net work

$$W = Q_H - Q_C$$

**Engine efficiency**:

$$\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H}$$

**Carnot cycle**: composed of two reversible isothermal processes and two reversible adiabatic processes, working between reservoirs at $T_1$ (hot) and $T_2$ (cold). Computing the heat in each process and using the adiabatic equations gives

$$\eta_C = 1 - \frac{T_2}{T_1}$$

This is the efficiency limit of every engine working between those two temperatures; all reversible engines have the same efficiency, determined only by the temperatures and independent of the working substance.

**Reverse cycle (refrigerator / heat pump)**:
- coefficient of performance of a refrigerator $\varepsilon = \dfrac{Q_C}{W}$ (heat $Q_C$ taken from the cold, work $W$ consumed);
- coefficient of performance of a heat pump $\varepsilon_h = \dfrac{Q_H}{W}$ (heat $Q_H$ supplied to the hot, work $W$ consumed); the relation is $\varepsilon_h = \varepsilon + 1$.

**Clausius–Clapeyron equation**: describes how the two-phase equilibrium pressure varies with temperature (the slope of the phase boundary):

$$\frac{dp}{dT} = \frac{L}{T\,\Delta v}$$

where $L$ is the latent heat and $\Delta v$ the change of specific volume. It can be used to estimate the variation of the saturation vapour pressure with temperature.

## III. Why We Understand It This Way

**Why must a heat engine reject heat to a cold reservoir?** By Carnot's theorem and the principle of entropy increase, returning to the initial state requires the total entropy to be unchanged (in the reversible case), so the entropy $Q_H/T_1$ of the heat absorbed must be offset by $Q_C/T_2$ of the heat rejected; hence $Q_C>0$ is unavoidable. Not rejecting heat ($Q_C=0$) would give efficiency 1, violating the second law.

**Why does the Carnot efficiency depend only on temperature?** Because in a reversible Carnot cycle heat is exchanged with the reservoirs only during the two isothermal processes, and their ratio $Q_C/Q_H=T_2/T_1$ is uniquely fixed by the geometry of the isotherms and adiabats, independent of the working substance (as long as it is a reversible ideal working substance).

**Why is the efficiency of real engines far below the Carnot limit?** Real processes are irreversible (friction, non-equilibrium heat transfer, throttling), which produces entropy, makes $Q_C$ larger and the efficiency lower; the Carnot efficiency is an unattainable theoretical upper bound.

**Why can the coefficient of performance exceed 1?** A refrigerator "moves" heat $Q_C$ while consuming only work $W$, like a lever amplifying force; $\varepsilon=Q_C/W$ can be far greater than 1 (household refrigerators reach 3–5), and this does not violate energy conservation, because the output is "heat moved", not "heat created".

## IV. Typical Calculations

**Example 1: Carnot efficiency.** An engine works between $T_1=500\ \text{K}$ and $T_2=300\ \text{K}$:

$$\eta_C = 1 - \frac{300}{500} = 0.4 = 40\%$$

If $Q_H=2000\ \text{J}$ is absorbed, the work is $W=800\ \text{J}$ and the rejected heat $Q_C=1200\ \text{J}$.

**Example 2: efficiency and the temperature limit.** To raise $\eta_C$ one must raise $T_1$ or lower $T_2$. With $T_2$ fixed at $300\ \text{K}$, reaching $\eta_C=60\%$ requires

$$1-\frac{300}{T_1}=0.6 \Rightarrow T_1 = \frac{300}{0.4} = 750\ \text{K}$$

showing that raising the temperature alone has limited effect; to make the efficiency approach 1 one must have $T_2\to 0$ (related to the third law).

**Example 3: coefficient of performance.** A refrigerator takes $Q_C=1000\ \text{J}$ from $T_C=270\ \text{K}$ and rejects it to $T_H=300\ \text{K}$; in the reversible case

$$\varepsilon = \frac{T_C}{T_H-T_C} = \frac{270}{30} = 9,\quad W = \frac{Q_C}{\varepsilon} = \frac{1000}{9} \approx 111\ \text{J}$$

The work consumed is far less than the heat moved.

**Example 4: Clausius–Clapeyron estimate.** Water boils at $100^\circ\text{C}$ with $L\approx 2.26\times10^6\ \text{J/kg}$, $\Delta v \approx 1.67\ \text{m}^3/\text{kg}$ and $T=373\ \text{K}$, so

$$\frac{dp}{dT} \approx \frac{2.26\times10^6}{373\times1.67} \approx 3630\ \text{Pa/K}$$

that is, near the boiling point a pressure rise of about $3.6\ \text{kPa}$ corresponds to a temperature rise of 1 K, consistent with the principle of the pressure cooker.

## V. Common Misconceptions

**Misconception 1: the efficiency can equal 1.** The second law forbids a single-reservoir engine; $\eta=1$ would mean no heat rejection and is impossible. The Carnot limit is always less than 1 (unless $T_2=0$).

**Misconception 2: the Carnot efficiency depends on the working substance.** The reversible Carnot efficiency is determined only by the two temperatures, regardless of whether steam, an ideal gas or another substance is used.

**Misconception 3: a coefficient of performance above 1 violates energy conservation.** The coefficient measures "heat moved / work consumed", not "energy created", and is entirely legitimate.

**Misconception 4: confusing heat pumps with refrigerators.** The cycle is the same but the purpose differs: a refrigerator removes heat from a cold region and a heat pump supplies heat to a hot one; the heat pump coefficient is one greater than the refrigerator coefficient.

**Misconception 5: thinking every cycle's efficiency can be written $\eta=1-T_2/T_1$.** That expression holds only for the reversible Carnot cycle; a general cycle must be computed from $\eta=1-Q_C/Q_H$.

## VI. Extensions and Synthesis

Cycle and heat engine theory has deeply influenced energy and power engineering. Real power plants use the Rankine cycle (steam) and internal combustion engines use the Otto or Diesel cycle; their efficiencies are below the Carnot efficiency for the same temperature limits but are practical because of power density and material limits. The engineer's goal is to approach the Carnot bound as closely as possible under irreversible constraints. Carnot's theorem also yields an independent definition of the thermodynamic temperature scale: using the ratio of heat exchanged with the two reservoirs of any reversible engine to define the temperature ratio $T_1/T_2=Q_H/Q_C$, which agrees exactly with the gas scale, thereby unifying temperature, efficiency and entropy in one framework. In low-temperature physics, refrigeration cycles (Stirling, Gifford– McMahon) are cascaded to push temperatures below a millikelvin, with limits set by the Carnot efficiency and the third law. To understand cycles is to hold a key: it anchors the engineering questions "how heat becomes work and how work moves heat" firmly inside the impassable boundary drawn by the second law, and makes clear why saving energy means "reducing irreversibility losses and approaching the Carnot limit".

## VII. Self-Test and Knowledge Map

Cycles and heat engines are the most down-to-earth chapter of thermodynamics, and also a hotbed of misconceptions. One key clarification: the Carnot efficiency formula $\eta_C=1-T_2/T_1$ applies only to the reversible Carnot cycle and must never be applied casually to the Otto, Diesel or Rankine cycles. The efficiency of a real cycle must be computed from $\eta=1-Q_C/Q_H$ using the actual heat absorbed and rejected, and is always below the Carnot efficiency for the same temperature limits—the Carnot efficiency is a bound, not an actual value, and this is crucial when comparing engines.

Now consider the "asymmetry" of temperature in efficiency. From $\eta_C=1-T_2/T_1$ it follows that raising the hot-reservoir temperature $T_1$ yields a much larger efficiency gain than lowering the cold-reservoir temperature $T_2$ by the same amount, because the denominator $T_1$ sits in the denominator of the subtracted term. This explains why raising the initial steam temperature improves power plant efficiency more than struggling to lower the condensation temperature, and it points to the main direction of engineering improvement: the heat resistance of materials often sets the ceiling of engine efficiency.

Refrigeration and heat pumps are often overlooked, yet they are closest to daily life. Refrigerators and air conditioners are reverse-cycle devices whose performance is measured by the coefficient of performance $\varepsilon=Q_C/W$, and $\varepsilon$ can be far greater than 1—this does not violate energy conservation, because a refrigerator moves heat rather than creating it, and the consumed work is only the "moving fee". A heat pump heating a house in winter is more efficient than an electric heater precisely because it "pumps" one unit of electric work plus heat from the environment into the room, supplying an equivalent $Q_H=Q_C+W$; its energy efficiency ratio often exceeds 3, making it an important technology for energy saving and emission reduction.

From a broader perspective, Carnot's theorem not only constrains engines but also defines the thermodynamic temperature scale: using the heat ratio $Q_H/Q_C$ of any reversible engine to define the temperature ratio gives a scale that agrees with the gas scale and is independent of the working substance, closing the logical loop among temperature, efficiency and entropy. In low-temperature physics, multistage refrigeration cascades push temperatures to millikelvin or even microkelvin, with limits set jointly by the Carnot efficiency and the third law. To understand cycles is to hold a key: it anchors the engineering questions "how heat becomes work and how work moves heat" firmly inside the boundary drawn by the second law.

## VIII. Supplementary Derivation: The Four Processes of the Carnot Cycle and the Origin of the Efficiency Formula

The Carnot cycle matters not only because of its high efficiency but because it is the **only** cycle that can move heat reversibly between two given temperatures. Here the origin of $\eta_C = 1 - \dfrac{T_2}{T_1}$ is set out. Let the working substance be $n\ \text{mol}$ of ideal gas with heat capacity ratio $\gamma$, undergoing four reversible processes.

- **Process $1\to2$: reversible isothermal expansion at $T_1$.** The internal energy of an ideal gas depends only on temperature, so $\Delta U_{12}=0$ and all the heat absorbed becomes work:

$$Q_H = W_{12} = nRT_1\ln\frac{V_2}{V_1}$$

- **Process $2\to3$: reversible adiabatic expansion, with the temperature falling from $T_1$ to $T_2$.** $Q=0$, and by the Poisson equation

$$T_1V_2^{\gamma-1} = T_2V_3^{\gamma-1}$$

the gas does work at the cost of its internal energy and cools.

- **Process $3\to4$: reversible isothermal compression at $T_2$.** Again $\Delta U_{34}=0$, and all the work from outside becomes rejected heat:

$$Q_C = \left|W_{34}\right| = nRT_2\ln\frac{V_3}{V_4}$$

- **Process $4\to1$: reversible adiabatic compression, with the temperature rising from $T_2$ back to $T_1$.** $Q=0$, and

$$T_2V_4^{\gamma-1} = T_1V_1^{\gamma-1}$$

**The key step: solve the two adiabatic equations for the same volume-ratio factor.** From the second adiabatic equation $T_1V_2^{\gamma-1} = T_2V_3^{\gamma-1}$,

$$V_3 = V_2\left(\frac{T_1}{T_2}\right)^{\frac{1}{\gamma-1}}$$

and from the fourth, $T_2V_4^{\gamma-1} = T_1V_1^{\gamma-1}$,

$$V_4 = V_1\left(\frac{T_1}{T_2}\right)^{\frac{1}{\gamma-1}}$$

Both contain the same temperature factor $\left(\dfrac{T_1}{T_2}\right)^{\frac{1}{\gamma-1}}$, which cancels on division:

$$\frac{V_3}{V_4} = \frac{V_2}{V_1}$$

Substituting back into the two heat expressions, the arguments of the logarithms are equal, so

$$\frac{Q_C}{Q_H} = \frac{nRT_2\ln(V_3/V_4)}{nRT_1\ln(V_2/V_1)} = \frac{T_2}{T_1}$$

Hence

$$\eta_C = 1 - \frac{Q_C}{Q_H} = 1 - \frac{T_2}{T_1}$$

**A faster entropy route:** since the whole cycle is reversible, $\oint\dfrac{\delta Q}{T} = 0$ must hold, and heat is exchanged only on the two isotherms, so

$$\frac{Q_H}{T_1} - \frac{Q_C}{T_2} = 0 \quad\Rightarrow\quad \frac{Q_C}{Q_H} = \frac{T_2}{T_1}$$

Two lines and it is done. This also tells us that the Carnot efficiency is essentially a **direct corollary of the entropy balance of the cycle**; any design that tries to circumvent it is equivalent to demanding that entropy vanish.

## IX. A Comprehensive Worked Example

**Problem: a reversible Carnot engine with $1\ \text{mol}$ of monatomic ideal gas ($\gamma = 5/3$) as working substance operates between $T_1 = 400\ \text{K}$ and $T_2 = 300\ \text{K}$. During the isothermal expansion the volume grows from $V_1 = 1.0\ \text{L}$ to $V_2 = 2.0\ \text{L}$. Find: (1) the cycle efficiency $\eta_C$; (2) the heat absorbed $Q_H$, the net work $W$ and the heat rejected $Q_C$; (3) the volume $V_3$ at the end of the adiabatic expansion and the volume $V_4$ at the start of the compression; (4) if the cycle is reversed into a refrigerator, how much work is needed to move the same heat, and what is the coefficient of performance?**

**(1) Efficiency.**

$$\eta_C = 1 - \frac{T_2}{T_1} = 1 - \frac{300}{400} = 0.25 = 25\%$$

**(2) Heat and work.**

$$Q_H = nRT_1\ln\frac{V_2}{V_1} = 1\times8.314\times400\times\ln 2 \approx 3325.6\times0.6931 \approx 2304\ \text{J}$$

$$W = \eta_C Q_H = 0.25\times2304 \approx 576\ \text{J},\qquad Q_C = Q_H - W = 2304 - 576 = 1728\ \text{J}$$

Entropy check: $\dfrac{Q_H}{T_1} = \dfrac{2304}{400} = 5.76\ \text{J/K}$ and $\dfrac{Q_C}{T_2} = \dfrac{1728}{300} = 5.76\ \text{J/K}$, equal as required by the entropy balance of a reversible cycle.

**(3) Volumes at the two "adiabatic endpoints".** From $T_1V_2^{\gamma-1} = T_2V_3^{\gamma-1}$, noting $\gamma-1 = \dfrac{2}{3}$ and hence $\dfrac{1}{\gamma-1} = 1.5$:

$$V_3 = V_2\left(\frac{T_1}{T_2}\right)^{\frac{1}{\gamma-1}} = 2.0\times\left(\frac{400}{300}\right)^{1.5} = 2.0\times1.3333^{1.5} \approx 2.0\times1.540 \approx 3.08\ \text{L}$$

$$V_4 = V_1\left(\frac{T_1}{T_2}\right)^{\frac{1}{\gamma-1}} = 1.0\times1.540 \approx 1.54\ \text{L}$$

Check: $\dfrac{V_3}{V_4} = \dfrac{3.08}{1.54} = 2.0 = \dfrac{V_2}{V_1}$, consistent with the key conclusion of the derivation; and $Q_C = nRT_2\ln\dfrac{V_3}{V_4} = 8.314\times300\times\ln 2 \approx 1728\ \text{J}$, consistent with (2).

**(4) Reversed into a refrigerator.** Running the same cycle backwards, the machine absorbs $1728\ \text{J}$ from the $300\ \text{K}$ cold store and rejects $2304\ \text{J}$ to the $400\ \text{K}$ reservoir; the difference is the work required:

$$W = Q_H - Q_C = 2304 - 1728 = 576\ \text{J}$$

$$\varepsilon = \frac{Q_C}{W} = \frac{1728}{576} = 3.0 = \frac{T_2}{T_1-T_2} = \frac{300}{100} = 3$$

**Discussion:** forward it delivers $576\ \text{J}$ of work, backward it consumes $576\ \text{J}$—for a reversible cycle the work is exactly the same in both directions, which is precisely what "reversible" means. In reality friction and heat transfer across finite temperature differences break this symmetry, so that reversing requires more work than the forward cycle delivers.

## X. Pitfalls and Problem-Solving Conventions

**Pitfall 1: applying the Carnot formula indiscriminately.** $\eta = 1 - \dfrac{T_2}{T_1}$ holds **only for the reversible Carnot cycle**. For real cycles such as Otto, Diesel and Rankine, compute term by term with the definition $\eta = 1 - \dfrac{Q_C}{Q_H}$.

**Pitfall 2: temperatures not converted to kelvin.** Substituting Celsius values gives bizarre results; always add $273.15$ first.

**Pitfall 3: confusing the sign convention for $Q_C$.** Textbooks often define $Q_C$ as "the heat rejected" (positive), so that $W = Q_H - Q_C$; under the convention "heat absorbed by the system is positive", the heat of the refrigeration branch is negative and one must use $W = Q_H + Q_C$. State the convention before writing the equations.

**Pitfall 4: thinking the coefficient of performance cannot exceed 1.** $\varepsilon = Q_C/W$ measures "quantity moved / cost of moving"; household refrigerators often reach $3\sim5$, entirely legitimate. It is a different concept from "efficiency must be less than 1".

**Pitfall 5: ignoring the role of $\gamma$ in determining the state parameters.** In finding $V_3$ and $V_4$ the exponent is $\dfrac{1}{\gamma-1}$; writing $\gamma-1$ or $1-\gamma$ is a common slip. After computing, the identity $\dfrac{V_3}{V_4} = \dfrac{V_2}{V_1}$ will expose it.

**Pitfall 6: taking "reversible" to mean "high efficiency".** The point of reversibility is the absence of entropy production, hence the **maximum efficiency between the same two temperatures**; an irreversible cycle with the same heat values will deliver less work because of the extra entropy production.

`,
  },
};

export default map;
