import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'stat-basics': {
    chapter: 'Chapter 1 Basic Concepts of Statistical Physics',
    title: 'Macrostates, Microstates and the Principle of Equal A Priori Probability',
    summary:
      'Statistical physics reduces macroscopic states to microscopic counting: the probability of a macrostate is proportional to its number of microstates, whence the Boltzmann entropy formula $S = k\\ln\\Omega$.',
    keyPoints: [
      'By their exchange with the surroundings, systems are divided into isolated, closed and open systems',
      'A microstate is an exact description of the motion of all particles; a macrostate is fixed by only a few macroscopic parameters',
      'Number of microstates $\\Omega$: the number of microstates belonging to one macrostate, the core of coarse-grained counting',
      'Principle of equal a priori probability: in equilibrium an isolated system realizes each accessible microstate with equal probability',
      'Boltzmann entropy formula $S = k\\ln\\Omega$; the logarithm guarantees additivity of entropy',
      'Macroscopic equilibrium corresponds to the distribution with maximal $\\Omega$; relative fluctuations are about $1/\\sqrt{N}$',
    ],
    content: String.raw`

Toss four identical coins on the table and count the number of heads: all heads has only 1 realization, three heads and one tail has 4, two heads and two tails has 6. Toss them repeatedly and record the results, and you will find that the most frequent outcome is precisely "two heads and two tails"—not because the dynamics favours it, but simply because it has the most realizations. Increase the number of coins to the order of $10^{23}$ and this tendency—"states with more realizations are overwhelmingly common"—becomes extreme: any macroscopic deviation from the most probable distribution has a probability so small that one would have to wait many times the age of the universe to see it once. The entire edifice of statistical physics is built on this naive intuition about counting.

Now consider the diffusion of a scent. Open a perfume bottle in a corner of a room, and a few minutes later the fragrance fills the whole room; we have never seen the fragrance spontaneously withdraw back into the bottle. From the point of view of energy conservation, neither situation violates anything; what truly distinguishes them is the counting of "how the molecules are distributed": a uniform distribution over the room has an astronomical number of realizations, whereas all molecules retreating into one corner has only a handful. The irreversibility of macroscopic processes is in essence a competition between counts. This observation links "heat" and "probability" for the first time, and also separates statistical physics from mechanics: we no longer follow the concrete trajectory of each particle, but count the "weights" with which all possible states occur.

To set out on this road of counting, we must first be clear about three things: what counts as a "microstate", what counts as a "macrostate", and what correspondence rule links the two. This chapter settles these three questions systematically and gives the first universal formula of statistical physics—the Boltzmann entropy formula. It connects the macroscopically measurable entropy with the microscopically countable number of configurations, and is the starting point for every distribution function in the chapters that follow.

## II. Rigorous Definitions

**Systems and their classification**: Thermodynamics and statistical physics classify systems by the way they exchange with the surroundings. A system that exchanges neither energy nor particles with the surroundings is called an **isolated system**; one that exchanges energy but not particles is called a **closed system**; one that exchanges both energy and particles is called an **open system**. By chemical composition one distinguishes one-component and multi-component systems; by phase, single-phase and multi-phase systems. Statistical physics also cares about the statistical attributes of particles: the state of a particle in a classical system is specified by generalized coordinates and momenta; in a quantum system it is specified by a complete set of quantum numbers (energy level, spin orientation, and so on). This difference looks slight, yet in Chapter 5 it will produce two completely different quantum statistics, Bose and Fermi.

**Microstate**: an exact description of the states of motion of all particles in the system. Classically, the microstate of an $N$-particle system is a point in the $6N$-dimensional phase space ($\Gamma$ space), fully determined by $3N$ generalized coordinates and $3N$ generalized momenta; quantum mechanically, a microstate is labelled by a complete set of quantum numbers—for example, which one-particle energy levels the $N$ particles occupy and which spin state each is in. A microstate is the "finest-grained" description and in principle contains all the information about every particle.

**Macrostate**: a state of the system described by a few macroscopic parameters (such as energy $E$, volume $V$, particle number $N$, temperature $T$), without distinguishing which particle sits in which one-particle state. For instance, a distribution $\{a_l\}$ such as "level $\varepsilon_1$ holds $a_1$ particles, level $\varepsilon_2$ holds $a_2$ particles, ..." characterizes a macrostate, without asking at all "which $a_1$ particles" occupy $\varepsilon_1$.

**Number of microstates**: the number of microstates corresponding to one macrostate, denoted $\Omega$. For a Boltzmann system with distinguishable particles and unrestricted occupation of levels, the number of microstates corresponding to the distribution $\{a_l\}$ is

$$\Omega = \frac{N!}{\prod_l a_l!}\prod_l \omega_l^{a_l}$$

where $\omega_l$ is the degeneracy of the level $\varepsilon_l$ (the number of one-particle quantum states it contains). The factor $N!/\prod_l a_l!$ counts the number of ways of choosing "which particles occupy which level", and the factor $\omega_l^{a_l}$ counts the number of ways of "choosing within the degeneracy". If the particles are indistinguishable or restricted by the Pauli exclusion principle, the counting rule changes—this is exactly the origin of quantum statistics, treated in Chapter 5.

**Principle of equal a priori probability**: when an isolated system is in equilibrium, each of its accessible microstates occurs with equal probability. This is the only fundamental postulate of statistical physics; it cannot be derived from more basic laws of mechanics, and its correctness is guaranteed by the agreement of all its consequences with experiment. Its immediate corollary is that the probability of a macrostate is proportional to its number of microstates $\Omega$; hence the equilibrium state of an isolated system corresponds to the macroscopic distribution with maximal $\Omega$.

**Boltzmann entropy formula**:

$$S = k\ln\Omega$$

where $k = 1.38\times10^{-23}\ \text{J/K}$ is the Boltzmann constant. Entropy is uniquely determined by the number of microstates of the macrostate and is a state function. Consider two independent subsystems combined: the numbers of microstates multiply by the multiplication principle, $\Omega = \Omega_1\Omega_2$, and after taking logarithms one has exactly $S = S_1 + S_2$, so the additivity of entropy is satisfied—this is the deep reason for the logarithm in the formula.

## III. Why We Understand It This Way

**Why take the logarithm of the entropy instead of making it directly proportional to $\Omega$?** When two independent systems are combined, the numbers of microstates multiply (the multiplication principle of permutations), whereas thermodynamics requires the total entropy to equal the sum of the entropies of the parts. Only the logarithm turns multiplication into addition: $\ln(\Omega_1\Omega_2) = \ln\Omega_1 + \ln\Omega_2$. Moreover, $\Omega$ for a macroscopic system is an astronomical number, expressible even as a "double exponential" such as $10^{10^{23}}$, which is utterly unwieldy; only after taking logarithms do the numbers become comparable in magnitude with thermodynamic quantities (joules per kelvin).

**Why is the principle of equal a priori probability reasonable?** For an isolated system, the mechanical evolution carries the state back and forth among all accessible microstates, and there is no reason for a long-time average to favour any particular microstate; in the language of information theory, equal probability is the least biased assignment when "only energy conservation is known and nothing else". It cannot be proved, but the Boltzmann, Bose and Fermi distributions derived from it agree precisely with experiment, and that is the final verdict on the validity of the postulate.

**Why does equilibrium correspond to maximal $\Omega$?** An isolated system can only stay within the set of accessible microstates of fixed energy; under equal probability, the macrostate containing more microstates is the one in which the system spends a larger fraction of time. The key point is that for macroscopic systems $\Omega$ varies extremely steeply with the distribution: a tiny deviation from the peak distribution shrinks $\Omega$ by huge powers of $e$. Thus "the system is almost always near the distribution with maximal $\Omega$" and "the macroscopic properties never change with time" are the same statement—this is precisely the statistical interpretation of equilibrium.

**Why is a macrostate a "coarse-grained" description?** No macroscopic observation can resolve the coordinates and momenta of $10^{23}$ particles individually; it can only read off averages such as pressure and temperature. Coarse-graining merges an astronomical number of microstates into one macrostate, and $\Omega$ is exactly the scale on this "merging ruler". Entropy can therefore be understood as "the amount of microscopic information omitted by the macroscopic description": the coarser the description and the more accessible microscopic configurations, the larger the entropy. This viewpoint naturally connects entropy with information theory.

## IV. Typical Calculations

**Example 1: the number of microstates of a two-level spin system.** $N = 10$ spin-$1/2$ magnetic moments are fixed on lattice sites (particles distinguishable), each spin can point up or down, and level degeneracy is neglected. With $n$ spins up and $N-n$ down, the number of microstates of this macrostate is the binomial coefficient

$$\Omega(n) = \frac{N!}{n!\,(N-n)!}$$

At $n = 5$ (half filling) $\Omega = \binom{10}{5} = 252$, the largest of all distributions; at $n = 0$ or $n = 10$ (all parallel) $\Omega = 1$. The total number of microstates is $\sum_n \Omega(n) = 2^{10} = 1024$. If the system is isolated with fixed energy, the principle of equal probability assigns equal probability only within the set of microstates of that energy.

**Example 2: obtaining the entropy from $\Omega$ and comparing.** For the same system, the half-filled distribution has entropy $S = k\ln 252 \approx 5.53\,k$, while the all-parallel distribution has zero entropy, a difference of about $5.5\,k$. This shows that the macroscopic state "equal mixture of both directions" has vastly more microscopic realizations than the others. Note also that for $N = 10$ fluctuations are still pronounced ($n$ can deviate from 5 by one or two); for $N\sim10^{23}$ the relative fluctuation of $n$ is about $1/\sqrt{N}\sim10^{-12}$, completely imperceptible macroscopically—this is the concrete manifestation of "statistical regularity becoming certainty in the limit of large numbers".

**Example 3: using Stirling's formula.** For large $N$, $\ln N! \approx N\ln N - N$. For the two-level system at half filling $n = N/2$:

$$\ln\Omega = \ln\frac{N!}{\left[(N/2)!\right]^2} \approx N\ln 2$$

that is, $S = Nk\ln 2$. This result also equals the information content "one bit per spin" multiplied by $k$, once again showing that entropy is the missing microscopic information.

**Example 4: verifying the additivity of entropy.** System 1 has $\Omega_1 = 10^{20}$ microstates and system 2 has $\Omega_2 = 10^{30}$; after combining (the two being independent and uncorrelated) $\Omega = 10^{50}$, so $S = k\ln 10^{50} = 50\,k\ln 10 \approx 115\,k$, exactly equal to $S_1 + S_2$. The logarithm turns multiplication into addition, guaranteeing the status of entropy as an extensive quantity.

## V. Common Misconceptions

**Misconception 1: treating a microstate as an "enlarged photograph" of a macrostate.** A microstate is not a detailed picture of a macrostate but a complete exact description; one macrostate contains many microstates, and the relation between them is a coarse-grained "one-to-many" one. Confusing the two leads to the erroneous conclusion that $\Omega$ is always 1 and entropy always zero.

**Misconception 2: thinking that equal a priori probability means equal probability for macrostates.** Equal probability applies to microstates; the probability of a macrostate is proportional to $\Omega$, and different macrostates usually differ enormously. "Every microstate is equally probable" and "different macrostates have different probabilities" are not contradictory: the former is the postulate, the latter a corollary.

**Misconception 3: believing $\Omega$ can be measured directly.** $\Omega$ itself cannot be measured; the observable quantity is the entropy $S = k\ln\Omega$. Conversely, thermodynamic entropy allows one to infer the order of magnitude of $\Omega$: for example, 1 mol of gas at room temperature has an entropy of about $100\ \text{J/K}$, corresponding to $\Omega\sim e^{7\times10^{24}}$.

**Misconception 4: mistaking statistical equilibrium for mechanical rest.** In equilibrium the microscopic motion never stops; only the macroscopic distribution stops changing. Fluctuations always exist, but in macroscopic systems their relative size is about $1/\sqrt{N}$, almost unobservable. Brownian motion is one of the very few mesoscopic phenomena that make fluctuations "show themselves".

**Misconception 5: ignoring accessibility constraints.** Equal probability holds only for "accessible" microstates; if conservation laws or selection rules forbid certain microstates, they must be excluded from the count, otherwise both $\Omega$ and the entropy come out wrong. For example, an isolated spin system conserves energy and therefore admits only microstates corresponding to particular values of $n$.

## VI. Extensions and Synthesis

The counting rule for the number of microstates depends on the statistical attributes of the particles—this is the master thread of the following chapters. When particles are distinguishable one obtains Boltzmann counting $\Omega = \frac{N!}{\prod a_l!}\prod\omega_l^{a_l}$, which leads to the Maxwell–Boltzmann distribution; identical bosons may share a one-particle state, with counting $\Omega_{\text{BE}} = \prod_l \binom{a_l + \omega_l - 1}{a_l}$; identical fermions are restricted by the Pauli principle to at most one particle per one-particle state, with counting $\Omega_{\text{FD}} = \prod_l \binom{\omega_l}{a_l}$ and the requirement $a_l \le \omega_l$. The three countings agree in the low-occupancy limit, which is exactly why classical statistics is the high-temperature limit of quantum statistics. The entropy formula also leads to information theory: the Shannon entropy $H = -\sum_i p_i\ln p_i$ reduces to $\ln\Omega$ in the equiprobable case, so statistical physics and information theory share the same mathematical skeleton. Furthermore, an isolated system spontaneously evolves towards macrostates with larger $\Omega$, corresponding to a monotonic increase of entropy—this is precisely the statistical statement of the second law of thermodynamics; Boltzmann's H-theorem is the dynamical version of this idea, and the historical objections of Loschmidt's reversibility paradox and Poincaré's recurrence paradox directly spurred the birth of Gibbs' ensemble theory—understanding this episode of scientific history is of great benefit for mastering the methodology of this chapter.

## VII. Self-Test and Knowledge Map

First self-test question: after shuffling a deck of cards, which is more probable, "ordered" or "disordered", and can this be made quantitative? Strictly speaking, the probability of any particular specified arrangement is $1/52!$, all exactly equal; what we call "disordered" is really "not specifying any particular arrangement", whose realizations fill almost all of the $52!$ possibilities, so the disparity in probability appears immediately. This reminds us that the contrast between order and disorder is essentially the contrast between "specified" and "unspecified"—a counting question, not an aesthetic one. Second self-test question: why can no fluctuation of entropy be seen in a macroscopic system? Since the probability of a macrostate is proportional to $\Omega$ and $S = k\ln\Omega$, the probability of an entropy deviation $\Delta S$ from equilibrium carries a factor $e^{-\Delta S/k}$; a macroscopic deviation corresponds to $\Delta S\gg k$, with a probability so small that in principle it cannot be observed. Only mesoscopic systems such as Brownian motion display fluctuations.

In terms of the knowledge map, this chapter establishes the conceptual chain "macrostate—microstate—counting—entropy" and the single axiom of equal a priori probability. Chapter 2 will build on this and use the method of the most probable distribution to solve explicitly for the distribution maximizing $\Omega$, obtaining the Boltzmann distribution and the partition function; Chapters 3 and 4 raise the viewpoint from "a single isolated system" to "an ensemble of a large number of imaginary copies" and develop the canonical and grand canonical ensembles, making the partition function the generator of all thermodynamic quantities; Chapter 5 introduces indistinguishability and quantum counting, yielding the Bose and Fermi quantum distributions; Chapters 6 and 7 apply the quantum distributions to the photon gas, Bose–Einstein condensation and the metallic electron gas, displaying the power of statistical physics in explaining the properties of real materials. Grasp the main line "counting determines probability, probability determines every thermodynamic quantity", and the logic of the whole course becomes transparent.

`,
  },

  'boltzmann-distribution': {
    chapter: 'Chapter 2 The Boltzmann Distribution',
    title: 'The Most Probable Distribution and the Partition Function',
    summary:
      'Extremizing the number of microstates under the constraints of fixed particle number and energy yields the Boltzmann distribution; the partition function $Z$ summarizes all statistical information and generates every thermodynamic quantity.',
    keyPoints: [
      'Method of the most probable distribution: extremize $\\ln\\Omega$ under constraints, using Lagrange multipliers $\\alpha$, $\\beta$',
      'Boltzmann distribution $a_l = \\omega_l e^{-\\alpha-\\beta\\varepsilon_l}$: occupation of quantum states decays exponentially with energy',
      'Partition function $Z = \\sum_l \\omega_l e^{-\\beta\\varepsilon_l}$, the hub linking microscopic levels to macroscopic thermodynamics',
      'Physical identification of the multipliers: $\\beta = 1/kT$, $\\alpha = -\\mu/kT$',
      'Statistical expressions for thermodynamic quantities: $U = -N\\,\\partial\\ln Z/\\partial\\beta$, $S = Nk(\\ln Z - \\beta\\,\\partial\\ln Z/\\partial\\beta)$',
      'Generalized force $Y = (N/\\beta)\\,\\partial\\ln Z/\\partial y$, e.g. pressure $p = (N/\\beta)\\,\\partial\\ln Z/\\partial V$',
    ],
    content: String.raw`

The previous chapter established the principle that "equilibrium is the macrostate with the largest number of microstates", but a principle alone is not enough: given a set of energy levels $\varepsilon_l$ with degeneracies $\omega_l$, how exactly are the $N$ particles distributed in equilibrium? Turning this question into a solvable mathematical problem yields the protagonist of this chapter—the Boltzmann distribution. The line of reasoning is plain: write the explicit expression for $\ln\Omega$, maximize it under the two constraints "total particle number fixed, total energy fixed", and solve for the most probable occupation numbers of the levels by the method of Lagrange multipliers.

The resulting distribution carries two undetermined multipliers $\alpha$ and $\beta$. Comparing them with thermodynamic quantities identifies $\beta = 1/kT$ and $\alpha = -\mu/kT$—the multipliers that emerged from microscopic counting turn out to be the incarnations of temperature and chemical potential. Even better, all the level information can be compressed into a single sum, the partition function $Z$; it acts like a "generator", and taking various derivatives of it yields all thermodynamic quantities: internal energy, entropy, pressure. To master the partition function is to hold the master switch leading from the microscopic world to macroscopic thermodynamics.

The method of this chapter (the most probable distribution) is conceptually straightforward and is the best ladder for understanding the ensemble theory and quantum statistics that follow. Pay particular attention to the way "how the multipliers correspond to thermodynamic quantities" is argued: first an undetermined constant appears in the microscopic counting, then it is identified physically by comparison with macroscopic laws—this strategy of "compute first, identify later" runs through all of statistical physics.

## II. Rigorous Definitions

**Number of microstates of a Boltzmann system**: consider an isolated system of $N$ distinguishable particles with levels $\varepsilon_l$ ($l = 1,2,\dots$), degeneracies $\omega_l$, and occupation numbers $a_l$ satisfying $\sum_l a_l = N$, $\sum_l a_l\varepsilon_l = U$. The number of microstates corresponding to the distribution $\{a_l\}$ is

$$\Omega = \frac{N!}{\prod_l a_l!}\prod_l \omega_l^{a_l}$$

**Stirling's formula**: for $N\gg1$, $\ln N! \approx N\ln N - N$. Taking logarithms and simplifying (using $\sum_l a_l = N$):

$$\ln\Omega = N\ln N + \sum_l a_l\ln\frac{\omega_l}{a_l}$$

**Derivation of the most probable distribution**: maximize $\ln\Omega$ under the two constraints, introducing Lagrange multipliers $\alpha$, $\beta$ and setting

$$\delta\left(\ln\Omega - \alpha\sum_l a_l - \beta\sum_l a_l\varepsilon_l\right) = 0$$

Using $\frac{\partial}{\partial a_l}\ln\Omega = \ln\frac{\omega_l}{a_l}$ (other occupation numbers being held constant when differentiating with respect to $a_l$), each $a_l$ independently satisfies

$$\ln\frac{\omega_l}{a_l} = \alpha + \beta\varepsilon_l$$

Solving gives the **Boltzmann distribution**:

$$a_l = \omega_l e^{-\alpha-\beta\varepsilon_l}$$

**Partition function**: define the one-particle partition function

$$Z = \sum_l \omega_l e^{-\beta\varepsilon_l}$$

From the normalization condition $\sum_l a_l = N$ one gets $e^{-\alpha} = N/Z$, so the distribution can be written as

$$a_l = \frac{N}{Z}\,\omega_l e^{-\beta\varepsilon_l},\qquad \frac{a_l}{\omega_l} = \frac{N}{Z}e^{-\beta\varepsilon_l}$$

that is, the mean occupation of each one-particle quantum state decays exponentially with energy, and the population of high levels falls off as $e^{-\varepsilon_l/kT}$.

**Statistical expressions for thermodynamic quantities** ($N$ independent particles, $Z$ the one-particle partition function):

$$U = \sum_l a_l\varepsilon_l = -N\frac{\partial\ln Z}{\partial\beta}$$

$$S = k\ln\Omega = Nk\left(\ln Z - \beta\frac{\partial\ln Z}{\partial\beta}\right) = Nk\ln Z + \frac{U}{T}$$

$$Y = \frac{N}{\beta}\frac{\partial\ln Z}{\partial y},\qquad p = \frac{N}{\beta}\frac{\partial\ln Z}{\partial V}$$

where $Y$ is the generalized force exerted by the system on the surroundings (conjugate to the external parameter $y$, such as the volume $V$), arising from the dependence of the levels on the external parameter $\partial\varepsilon_l/\partial y$.

**Physical identification of the multipliers**: taking the total differential of the statistical expressions for $U$ and $S$ and comparing coefficients term by term with the first law $dU = TdS - Y\,dy$ gives

$$\beta = \frac{1}{kT},\qquad \alpha = -\frac{\mu}{kT}$$

$\beta$ is measured by temperature and $\alpha$ by chemical potential: the two Lagrange multipliers of the microscopic counting correspond respectively to the two conservation constraints (energy and particle number) and physically to two intensive quantities (temperature and chemical potential).

## III. Why We Understand It This Way

**Why extremize $\ln\Omega$ rather than $\Omega$ itself?** The logarithm is monotonic, so the extremum is at the same point, but $\ln\Omega$ contains a factor of order $N$ and is convenient to expand with Stirling's formula, whereas $\Omega$ itself is a double-exponentially large number that cannot be handled directly. This reflects the consistent strategy of statistical physics: "take logarithms before computing".

**Why must $\beta$ be tied to temperature?** Imagine two systems in contact, with particles able to be redistributed and energy exchanged; in equilibrium the most probable distribution requires the two subsystems to have equal $\beta$ (otherwise moving energy could still increase $\Omega$), and the macroscopic hallmark of thermal equilibrium is precisely equality of temperature. Comparing the statistical expressions with the first law identifies $\beta$ uniquely as $1/kT$. Temperature thus acquires a microscopic interpretation: it is the exchange rate of "energy for entropy", measuring "how many new microstates are opened up by injecting one more unit of energy into the system".

**Why can the partition function "generate" every thermodynamic quantity?** $Z$ is the sum of Boltzmann weights over all one-particle states and gathers all the level information of the system. $U$ is the $\beta$-derivative of $\ln Z$ (the first moment of the energy weight), $S$ is built from $\ln Z$ and $U$, and the generalized force is the derivative of $\ln Z$ with respect to an external parameter. One function contains all the information, and the various macroscopic quantities are merely its derivatives in different directions—closely analogous to the idea that a potential generates forces in mechanics.

**Why must the distribution be exponential?** The solution of a constrained extremum problem lies in the exponential family: linear constraints (conserved quantities) combined with a logarithmic objective ($\ln\Omega$) inevitably give $e^{-\beta\varepsilon}$-type solutions under the Lagrange multiplier method. The physical picture of exponential decay is that "states of higher energy are harder to fill"; it ensures that high-level contributions are negligible and the sum converges, and it also makes possible the high-temperature limit in which "almost all accessible states are on an equal footing".

## IV. Typical Calculations

**Example 1: population ratio of a two-level system.** A system has only two non-degenerate levels $\varepsilon_0 = 0$, $\varepsilon_1 = \Delta$; the ratio of populations is

$$\frac{a_1}{a_0} = e^{-\Delta/kT}$$

At room temperature ($T = 300\ \text{K}$, $kT \approx 0.026\ \text{eV}$) with $\Delta = 1\ \text{eV}$, $a_1/a_0 = e^{-38.6}\approx1.7\times10^{-17}$, so almost all particles sit in the ground state; only when $kT$ is comparable to $\Delta$ is the excited state appreciably populated. This explains why many excitation processes at ordinary temperatures (such as atomic emission) require external pumping.

**Example 2: partition function and internal energy of a one-dimensional harmonic oscillator.** The levels $\varepsilon_n = \left(n+\frac{1}{2}\right)\hbar\omega$ are non-degenerate, and summing the geometric series gives

$$Z = \sum_{n=0}^{\infty} e^{-\beta\left(n+\frac{1}{2}\right)\hbar\omega} = \frac{e^{-\beta\hbar\omega/2}}{1-e^{-\beta\hbar\omega}} = \frac{1}{2\sinh\left(\beta\hbar\omega/2\right)}$$

so $U = -\partial\ln Z/\partial\beta = \frac{\hbar\omega}{2}\coth\left(\frac{\beta\hbar\omega}{2}\right) = \frac{\hbar\omega}{2} + \frac{\hbar\omega}{e^{\hbar\omega/kT}-1}$. In the high-temperature limit $kT\gg\hbar\omega$, $U\to kT$, in full agreement with the equipartition theorem (the two quadratic terms, coordinate and momentum, each contribute $\frac{1}{2}kT$).

**Example 3: atmospheric density in a gravitational field.** Substituting the gravitational potential energy $\varepsilon = mgz$ into the Boltzmann distribution gives the isothermal atmosphere density profile

$$n(z) = n_0\,e^{-mgz/kT}$$

The scale height $H = kT/mg$ is about $8\ \text{km}$ near the Earth's surface; this is the quantitative statement that the air thins as one climbs, and the most intuitive everyday manifestation of the "Boltzmann factor".

**Example 4: the complete procedure for $U$ and $S$ from $Z$.** Suppose a system has one-particle partition function $Z = aT^{3/2}$ (as for the translational motion of a classical ideal gas, $a = V(2\pi mk/h^2)^{3/2}$). First $\ln Z = \ln a + \frac{3}{2}\ln T$, then change variables using $\beta = 1/kT$: $U = -N\frac{\partial\ln Z}{\partial\beta} = NkT^2\frac{\partial\ln Z}{\partial T} = \frac{3}{2}NkT$; the entropy is $S = Nk\ln Z + U/T = Nk\ln\left(aT^{3/2}\right) + \frac{3}{2}Nk$. The whole procedure uses nothing but differentiation—no further counting is needed. That is the power of the partition function method.

## V. Common Misconceptions

**Misconception 1: treating $\beta$ as $1/T$ and dropping $k$.** $\beta = 1/kT$ has the dimensions of inverse energy; mixing units or omitting $k$ produces absurd results off by more than twenty orders of magnitude in temperature. In numerical work always use the energy unit $kT$ (at room temperature $kT\approx0.026\ \text{eV}$).

**Misconception 2: confusing the one-particle partition function with the system partition function.** In this chapter $Z$ is the one-particle partition function; for $N$ independent particles the system partition function is $Z_N = Z^N$ (classically distinguishable) or $Z_N = Z^N/N!$ (identical quantum particles, Gibbs correction). The $Z$ of the canonical ensemble in Chapter 3 is a sum over "the energy levels of the system as a whole" and has a different meaning; be sure to distinguish the contexts.

**Misconception 3: omitting the degeneracy $\omega_l$.** When summing over levels every term must be multiplied by the degeneracy; omitting it corrupts the distribution and all thermodynamic quantities. Only when summing one by one over "microstates" is no degeneracy factor needed.

**Misconception 4: applying the Boltzmann distribution to strongly degenerate identical-particle systems.** Boltzmann counting assumes distinguishable particles and unrestricted occupation; for low-temperature, high-density Bose or Fermi systems one must switch to quantum statistics (Chapter 5), otherwise wrong results follow (such as the classical electron-gas heat capacity paradox).

**Misconception 5: taking the most probable distribution as "the exact distribution at every instant".** The most probable distribution is the most likely one in an ensemble with sizable fluctuations; the actual distribution fluctuates around it with relative amplitude $1/\sqrt{N}$. For macroscopic systems it may be treated as exact; for small systems (such as a single molecule) the fluctuations cannot be ignored.

## VI. Extensions and Synthesis

The Boltzmann distribution is the common destination of three roads. The first is the most probable counting method of this chapter; the second is the ensemble method of Chapters 3 and 4—in the limit of weak interaction and independent particles the canonical ensemble automatically degenerates into the Boltzmann distribution for independent particles; the third is the grand canonical method of Chapter 5—in the non-degenerate limit both the Bose and Fermi distributions return to the Boltzmann distribution. That all roads lead to the same place shows it is the inevitable consequence of the counting rule "distinguishable particles + unrestricted occupation". Substituting $\varepsilon = p^2/2m$ and integrating over momenta derives the Maxwell velocity distribution $f(v)\propto e^{-mv^2/2kT}$ from the Boltzmann distribution, linking thermal physics with the kinetic theory of gases. Even more interesting is negative temperature: for systems with an upper bound on the energy levels (such as spin systems), a population inversion makes the most probable distribution correspond to $\beta < 0$, and the system is then "hotter" than at any positive temperature—a result of extrapolating the Boltzmann form directly. Moreover, the partition function method is ubiquitous in modern physics: path integrals in lattice field theory, energy-based models in machine learning, conformational statistics of biological macromolecules—all are in essence computations of various partition functions. What this chapter teaches is not just a formula but a whole mode of thought: "sum the weights, generate by differentiation".

## VII. Self-Test and Knowledge Map

Self-test 1: why does the most probable distribution of energy between two bodies at different temperatures make their temperatures exactly equal after contact? Hint: extremize the total number of microstates $\Omega_1(U_1)\Omega_2(U-U_1)$ with respect to $U_1$; the condition is $\partial\ln\Omega_1/\partial U_1 = \partial\ln\Omega_2/\partial U_2$, and since $\partial\ln\Omega/\partial U = 1/kT$, the equilibrium condition is $T_1 = T_2$. This reduces the "transitivity of thermal equilibrium" of the zeroth law to a condition for a counting extremum. Self-test 2: can you write the formula "obtaining $S$ from $Z$" without looking it up, and explain the origin of each term? In $S = Nk\ln Z + U/T$, the first term is "the logarithm of the number of accessible states" and the second is "the contribution of energy traded for entropy", corresponding respectively to configurational and thermal entropy.

In terms of the knowledge map, this chapter turns the "counting principle" of Chapter 1 into concrete distribution functions and the partition function tool, but the derivation is aimed at the specific case "isolated system + distinguishable particles". Chapter 3 generalizes the viewpoint to systems in contact with a heat bath and develops the canonical ensemble, making the partition function applicable to interacting systems; Chapter 4 further allows the particle number to vary, obtaining the grand canonical ensemble and naturally introducing the chemical potential; Chapter 5 re-applies the most probable method on the basis of quantum counting to obtain the Bose and Fermi distributions. As can be seen, the technique "extremize $\ln\Omega$ (or the equivalent entropy functional) under constraints" runs throughout; only the counting rules and constraints change. Master this methodological core and none of the later distribution formulas need be memorized.

## VIII. Further Thoughts

Here is another angle from which to test your understanding: how do the Boltzmann distribution of this chapter and the entropy formula of Chapter 1 close the logical loop? $S = k\ln\Omega$ is the definition, the most probable method is the tool, and the identification $\beta = 1/kT$ in turn makes the entropy formula testable—the $S(U,V,N)$ computed from the Boltzmann distribution satisfies $\left(\partial S/\partial U\right)_{V,N} = 1/T$ in complete agreement with thermodynamics, so the counting theory passes the verdict of macroscopic thermometry. Also worth remembering is a practical trick: when handling a real problem, first write down the level spectrum $\varepsilon_l$ and degeneracies $\omega_l$, second write down $Z = \sum_l \omega_l e^{-\beta\varepsilon_l}$ directly, third differentiate mechanically to get $U$, $S$ and the generalized force—this three-step method can "assembly-line" almost every independent-particle system, from two-level molecules and paramagnetic ions to vibrating solids. Try recomputing the four examples of this chapter with this three-step method, confirm the physical meaning of each step, and then move on to the next chapter.

`,
  },
  'canonical-ensemble': {
    chapter: 'Chapter 3 The Canonical Ensemble',
    title: 'The Ensemble Idea and the Canonical Partition Function',
    summary:
      'A system at constant temperature is described by an ensemble of many imaginary copies; the canonical distribution $\\rho_s \\propto e^{-\\beta E_s}$ follows from the principle of equal a priori probability, and the partition function $Z$ generates internal energy, free energy and entropy.',
    keyPoints: [
      'Ensemble idea: the time average equals the ensemble average; macroscopic quantities are statistical averages over many imaginary copies',
      'The microcanonical ensemble describes isolated systems ($E,V,N$ fixed); the canonical ensemble describes isothermal systems ($T,V,N$ fixed)',
      'Canonical distribution $\\rho_s = e^{-\\beta E_s}/Z$, arising from the exponential sensitivity of the reservoir\'s microstate count to the system energy',
      '$U = -\\partial\\ln Z/\\partial\\beta$, $F = -kT\\ln Z$, $S = -(\\partial F/\\partial T)_V$',
      'Energy fluctuations are tied to heat capacity: $\\overline{(\\Delta E)^2} = kT^2 C_V$, with relative fluctuation about $1/\\sqrt{N}$',
      'In the thermodynamic limit the microcanonical, canonical and grand canonical ensembles give identical thermodynamic results',
    ],
    content: String.raw`

The realistic systems statistical physics deals with have $10^{23}$ degrees of freedom at a stroke; it is neither possible nor necessary to solve for the trajectory of each particle. What we truly care about is the equilibrium value of macroscopic quantities such as pressure and temperature. The question is: what kind of "average of microscopic quantities" should a macroscopic quantity be? Boltzmann's answer was the long-time average, but long-time evolution is mathematically intractable. Gibbs gave a cleverer answer: imagine a large group of "imaginary copies" of the real system with exactly the same macroscopic conditions, each in a different microstate; take a "group photograph" of these copies at one instant, count how often each microstate appears in the photograph, and use this "ensemble average" in place of the "time average". As long as the system is ergodic (it visits all accessible microstates over a long time), the two averages agree.

Ensembles are classified by macroscopic constraints. When the system is isolated ($E,V,N$ fixed) one uses the microcanonical ensemble, in which every accessible microstate has equal probability; when the system is in contact with a large heat bath at fixed temperature ($T,V$ fixed) one uses the canonical ensemble; when the system can also exchange particles with the surroundings ($T,V,\mu$ fixed) one uses the grand canonical ensemble. The overwhelming majority of real experimental conditions are close to constant temperature: a beaker in a water bath, apparatus exposed to the atmosphere—the system and its environment freely exchange heat. The canonical ensemble is therefore the most widely used ensemble and the starting platform for quantum statistics and phase transition theory.

The task of this chapter is to derive the distribution function of the canonical ensemble from the principle of equal a priori probability, define the canonical partition function $Z$, and establish the one-to-one correspondence between $U$, $F$, $S$, $p$ and $Z$. After studying it you will find that the partition function method of Chapter 2 is naturally generalized within the ensemble framework—from "summing over one-particle levels" to "summing over the levels of the system as a whole", so that interacting systems can be handled.

## II. Rigorous Definitions

**Ensemble**: a collection of a large number of imaginary systems that are mutually independent and uncorrelated, share identical macroscopic conditions, and differ in their microstates. The ratio of the numbers of copies in the various microstates defines the probability distribution $\rho$ under those macroscopic conditions. The measured value of a macroscopic quantity $A$ equals the ensemble average $\bar A = \sum_s \rho_s A_s$ (in the quantum case $\bar A = \mathrm{Tr}\,\hat\rho\hat A$).

**Microcanonical ensemble**: describes an isolated system with macroscopic constraints of fixed energy $E$, volume $V$ and particle number $N$. The distribution is uniform: $\rho_s = 1/\Omega$ on the accessible microstates within the energy shell and zero outside. This is the principle of equal a priori probability in ensemble language. The microcanonical ensemble is conceptually the most fundamental but inconvenient for summation, and is usually the starting point for deriving the other ensembles.

**Derivation of the canonical ensemble**: combine "target system + large heat bath" into one isolated system with conserved total energy $E^{(0)}$. Suppose the system is in microstate $s$ (energy $E_s$); the bath then has energy $E^{(0)}-E_s$. The number of microstates of the composite system is $\Omega_s(E_s)\,\Omega_r(E^{(0)}-E_s)$, and by the principle of equal a priori probability the probability for the system to be in state $s$ is proportional to it. The bath is much larger than the system ($E_s\ll E^{(0)}$), so expand the bath entropy about $E^{(0)}$:

$$\ln\Omega_r(E^{(0)}-E_s) \approx \ln\Omega_r(E^{(0)}) - \frac{E_s}{kT}$$

where $(\partial\ln\Omega_r/\partial E)_V = 1/kT$ was used. Hence

$$\rho_s = \frac{1}{Z}\,e^{-\beta E_s},\qquad \beta = \frac{1}{kT}$$

This is the **canonical distribution**: the probability of a microstate depends only on its energy and decays according to the Boltzmann factor. The "weight" of the bath appears as follows: when the system draws energy $E_s$ from the bath, the bath must pay the price of $e^{E_s/kT}$ microstates.

**Canonical partition function**:

$$Z = \sum_s e^{-\beta E_s}$$

summed over all microstates of the system (if summing over levels, multiply each term by its degeneracy $\omega$, i.e. $Z = \sum_E \omega(E)e^{-\beta E}$). $Z$ is dimensionless and $Z\ge1$.

**Relations between thermodynamic quantities and $Z$**:

$$U = \sum_s \rho_s E_s = -\frac{\partial\ln Z}{\partial\beta} = -kT^2\frac{\partial\ln Z}{\partial T}$$

$$F = -kT\ln Z$$

$$S = -\left(\frac{\partial F}{\partial T}\right)_V = k\ln Z + \frac{U}{T} = k\ln Z + kT\frac{\partial\ln Z}{\partial T}$$

$$p = -\left(\frac{\partial F}{\partial V}\right)_T = kT\frac{\partial\ln Z}{\partial V}$$

where $F = U - TS$ is the Helmholtz free energy. $F = -kT\ln Z$ is the central formula of the canonical ensemble: all information in the partition function is condensed into the free energy and then spread to all thermodynamic quantities by differentiation.

**Energy fluctuations**: in the canonical ensemble the energy is not fixed, and its variance is given by the heat capacity:

$$\overline{(\Delta E)^2} = \overline{E^2} - \bar E^2 = kT^2 C_V$$

The relative fluctuation $\sqrt{\overline{(\Delta E)^2}}/\bar E \sim 1/\sqrt{N}$ is entirely negligible in macroscopic systems—this is exactly why the canonical and microcanonical ensembles are equivalent in the thermodynamic limit.

## III. Why We Understand It This Way

**Why is the canonical distribution exponential?** Intuitive explanation: if the system takes energy $E_s$, the bath loses energy $E_s$, and the number of microstates available to the bath varies roughly as $e^{S_r/k} \approx e^{S_r(E^{(0)})/k}\cdot e^{-E_s/kT}$. The bath's microstate count is an overwhelming weight, so the probability of the system being in a high-energy state is exponentially suppressed. The $\beta$ in the exponent comes from $(\partial\ln\Omega_r/\partial E)$ of the bath, the inverse of the bath temperature—"temperature" enters the distribution function of the system through the counting properties of the bath.

**Why does the central formula give the free energy $F$ rather than the internal energy $U$?** The internal energy $U = -\partial\ln Z/\partial\beta$ can of course be computed directly, but the free energy is the thermodynamic potential that decides the direction of processes at constant temperature and volume ($F$ is minimal in equilibrium). $\ln Z$ is the dimensionless "total statistical information"; multiplying by $-kT$ translates it exactly into the language of energy. And starting from $F$, the quantities $S$, $p$, $\mu$ are all just partial derivatives, the chain being the shortest. One may say that $F = -kT\ln Z$ is the "exchange-rate formula" between the microscopic and macroscopic worlds.

**Why can the energy fluctuate while the temperature stays fixed?** The canonical system and the bath continuously exchange energy, so at any instant the system energy is fluctuating; but the bath is large enough that its temperature is not disturbed by the exchanged heat, and the system is "immersed in a constant temperature". This matches the experimental situation: in a sample inside a thermostat, the energy rises and falls with molecular collisions while the temperature always follows the bath.

**Why does the ensemble average equal the measured value for the real system?** A measurement always has finite macroscopic scale and duration and already involves averaging over a large number of microstates and many time slices. The ergodic hypothesis guarantees that the time average of a single system converges to the ensemble average; macroscopic systems also have the property of "self-averaging"—the relative fluctuations of macroscopic quantities such as energy are only $1/\sqrt{N}$, so almost every copy yields the same measured value, and the ensemble average is indistinguishable from a single measurement.

## IV. Typical Calculations

**Example 1: canonical calculation for $N$ independent two-level particles.** Each particle has levels $0$ and $\Delta$, the one-particle partition function is $z = 1 + e^{-\beta\Delta}$, and for $N$ independent distinguishable particles the system partition function is $Z = z^N = (1+e^{-\beta\Delta})^N$. Hence

$$U = -N\frac{\partial\ln z}{\partial\beta} = \frac{N\Delta}{e^{\beta\Delta}+1},\qquad F = -NkT\ln\left(1+e^{-\beta\Delta}\right)$$

$$S = \frac{U-F}{T} = Nk\left[\ln\left(1+e^{-\beta\Delta}\right) + \frac{\beta\Delta}{e^{\beta\Delta}+1}\right]$$

At low temperature $U\to0$, $S\to0$ (everything sits in the ground state); at high temperature $U\to N\Delta/2$, $S\to Nk\ln2$ (the two levels are occupied at random, one bit per particle). This example displays the standard procedure "from $Z$ to all thermodynamic quantities" in full.

**Example 2: partition function of a monatomic ideal gas.** The classical one-particle partition function is the translational one, $z = V/\lambda_T^3$, with thermal wavelength $\lambda_T = h/\sqrt{2\pi mkT}$. For $N$ identical particles one must divide by $N!$ (Gibbs correction), giving $Z = \frac{1}{N!}\left(V/\lambda_T^3\right)^N$. Substituting Stirling's formula $\ln N!\approx N\ln N - N$ into $F = -kT\ln Z$ and differentiating with respect to $V$ gives $p = NkT/V$, so the ideal gas equation of state is re-derived from first principles. Without the $1/N!$ factor the entropy would contain an $N\ln N$ term, producing the Gibbs paradox of a non-extensive entropy of mixing.

**Example 3: heat capacity of the Einstein solid.** Treat the atoms of a solid as $3N$ independent quantum oscillators all of frequency $\omega_E$, giving $Z = \left[2\sinh(\beta\hbar\omega_E/2)\right]^{-3N}$. Differentiation gives

$$C_V = 3Nk\left(\frac{\theta_E}{T}\right)^2\frac{e^{\theta_E/T}}{\left(e^{\theta_E/T}-1\right)^2},\qquad \theta_E = \frac{\hbar\omega_E}{k}$$

At high temperature $C_V\to3Nk$ (the Dulong–Petit law), while at low temperature $C_V$ decays exponentially—the first explanation of the collapse of the low-temperature heat capacity of solids that classical theory could not account for, and one of the most famous early victories of quantum statistics.

**Example 4: inferring the heat capacity from the fluctuation formula.** If a small system (such as a single-molecule magnet) has its energy variance $\overline{(\Delta E)^2}$ measured, then $\overline{(\Delta E)^2} = kT^2 C_V$ immediately gives the heat capacity $C_V = \overline{(\Delta E)^2}/(kT^2)$. For a macroscopic system this relation shows that fluctuations are negligible; for a small system it becomes a measurement tool—the fluctuation turns from a "nuisance" into a "signal".

## V. Common Misconceptions

**Misconception 1: confusion about what is being summed over.** When summing over "microstates" one does not multiply by the degeneracy; when summing over "levels" one must multiply by $\omega$. Mixing the two is the most common error in partition function calculations. Before writing $Z$, be clear about the "granularity" of the sum.

**Misconception 2: treating the canonical ensemble as an ensemble of fixed energy.** Fixed energy belongs to the microcanonical ensemble; in the canonical ensemble the energy is a random variable and only the mean energy $\bar E = U$ is fixed. Confusing the two makes the energy fluctuation formula incomprehensible.

**Misconception 3: forgetting the $1/N!$ factor for identical particles.** For identical particles (gas molecules, electrons) the system partition function must be divided by $N!$, otherwise the entropy is not extensive and the entropy of mixing diverges (the Gibbs paradox). This is the first lesson in passing from classical to correct statistics.

**Misconception 4: taking the ensemble as a large number of systems that really exist.** The ensemble is a computational device and a thought experiment, not a real array of systems; a "copy" is only a way of visualizing a probability distribution. What is measured is always one and the same real system.

**Misconception 5: thinking that the $Z$ in $F = -kT\ln Z$ is always the one-particle partition function.** The $Z$ of the canonical ensemble is the partition function of the system as a whole (a sum over all microstates or system levels). Only when the particles are mutually independent can it be factorized into a power of the one-particle partition function. For interacting systems $Z$ generally cannot be factorized, and this is exactly why the ensemble method is more general than the method of Chapter 2.

## VI. Extensions and Synthesis

Ensemble theory raises statistical physics from "special case: ideal gas" to a universal framework. The three ensembles are equivalent in the thermodynamic limit: the thermodynamic quantities computed in the microcanonical ($E,V,N$), canonical ($T,V,N$) and grand canonical ($T,V,\mu$) ensembles agree as $N\to\infty$, and the choice is a matter of convenience—problems with variable particle number such as adsorption, chemical reactions and quantum statistics are most easily handled in the grand canonical ensemble, while ordinary isothermal problems use the canonical one. From the information-theoretic viewpoint (Jaynes' maximum entropy principle), the three ensembles are the maximum-entropy distributions under known information such as "the mean energy is constrained" or "the mean energy and particle number are constrained", so the choice of ensemble becomes a question of how much information you actually have, and the axiomatic system of statistical physics becomes purer. The canonical partition function is also the stage for phase transition theory: the zeros of $Z$ approach the real axis in the thermodynamic limit exactly at a phase transition, and the scaling theory of critical phenomena and the renormalization group are both built on the partition function. In addition, fluctuation–dissipation relations connect equilibrium fluctuations (the energy fluctuations of this chapter) with non-equilibrium transport coefficients (such as conductivity and viscosity), and are the cornerstone of modern condensed matter physics and linear response theory. When studying this chapter, practise the five-step chain "ensemble → distribution → partition function → thermodynamic quantities → fluctuations" until it is muscle memory; every derivation in the following chapters follows this chain.

## VII. Self-Test and Knowledge Map

Self-test 1: why use $F = -kT\ln Z$ rather than $U$ as the thermodynamic potential directly tied to $Z$? Try answering from two sides: mathematically, $\ln Z$ is the logarithm of a sum over states, and after multiplying by $-kT$ it becomes an equilibrium criterion; physically, the direction of a process at constant temperature and volume is determined by the decrease of $F$, whereas $U$ often stays constant in an isothermal process (ideal gas) and serves no criterion. Self-test 2: for two almost independent systems with a weak interaction, how is the total partition function approximated? $Z\approx Z_1 Z_2(1+\text{interaction correction})$; taking $\ln Z\approx\ln Z_1+\ln Z_2+$ correction gives $F\approx F_1+F_2+\Delta F_{\text{int}}$—extensivity comes from the additivity of the logarithm, and the interaction appears as a small correction to the free energy, which is the germ of the mean-field approximation.

In terms of the knowledge map, this chapter completes the leap from "counting for an isolated system" to "the partition function of an isothermal system"; the partition function is upgraded from the one-particle version to the system version, and the method now applies to interacting systems. Chapter 4 will relax the conditions further, allowing the system to exchange particles with a particle reservoir, obtaining the grand canonical ensemble and the grand partition function, with particle-number fluctuations and the chemical potential taking centre stage; Chapter 5 will then, on the basis of indistinguishable-particle counting, derive the Bose and Fermi distributions in one step using the grand canonical ensemble. In other words, the canonical ensemble is the pivotal link: it receives the most probable method from the past and opens quantum statistics for the future. Master the differential relations between $Z$ and $U$, $F$, $S$, $p$, and the later chapters are almost "redo everything with a different counting rule".

## VIII. Further Thoughts

Finally, a detail that is easily overlooked: the derivation in this chapter assumes distinguishable particles and unrestricted occupation of levels, which superficially conflicts with the quantum fact that identical particles are indistinguishable. Historically the reconciliation was to admit that Boltzmann statistics is only an approximation, but a deeper question is: why should the approximation be so successful? The answer lies in the occupation numbers—when the mean occupation of each one-particle state is far less than 1, the probability of the event "two particles squeeze into the same state" approaches zero, indistinguishability loses observable consequences, and the three countings (Boltzmann, Bose, Fermi) converge mathematically. This "weak-occupancy limit" viewpoint links this chapter with Chapter 5: quantum statistics does not "correct" classical statistics; rather, classical statistics is the natural limit of quantum statistics in the low-occupancy regime. Looking back at every formula of this chapter with this viewpoint, you will find that all of them can be re-derived in the framework of Chapter 5, and that the derivation there will be more symmetric and more universal. Learning proceeds in this spiral way: first master the naive version and use it fluently, then see clearly its place and boundaries within a more general framework.

`,
  },

  'grand-canonical': {
    chapter: 'Chapter 4 The Grand Canonical Ensemble',
    title: 'The Grand Canonical Ensemble and Systems with Variable Particle Number',
    summary:
      'When a system exchanges both energy and particles with a reservoir it is described by the grand canonical distribution $\\rho_{Ns} \\propto e^{-\\beta(E_s-\\mu N)}$, and the grand partition function $\\Xi$ handles particle-number fluctuations and the chemical potential in one framework.',
    keyPoints: [
      'Chemical potential $\\mu$: the change of free energy caused by adding one particle, the criterion for equilibrium of particle exchange',
      'Grand canonical distribution $\\rho_{Ns} = e^{-\\beta(E_s-\\mu N)}/\\Xi$, with temperature and chemical potential fixed by the large reservoir',
      'Grand partition function $\\Xi = \\sum_N z^N Z_N$, with $z = e^{\\beta\\mu}$ the fugacity',
      'Mean particle number $\\bar N = kT\\,\\partial\\ln\\Xi/\\partial\\mu = z\\,\\partial\\ln\\Xi/\\partial z$',
      'Particle-number fluctuation $\\overline{(\\Delta N)^2} = kT\\,(\\partial\\bar N/\\partial\\mu)_{T,V}$, equal to $\\bar N$ for an ideal gas',
      'Grand thermodynamic potential $\\Omega_J = -kT\\ln\\Xi = -pV$; the grand canonical ensemble is the natural language of quantum statistics',
    ],
    content: String.raw`

The canonical ensemble of Chapter 3 treats systems that exchange heat but not particles with a reservoir. This covers many experimental situations, but just as many important cases have a particle number that is not fixed: a gas box connected to a storage tank through a small hole lets molecules pass in and out; in a chemical reaction reactants and products convert into each other; carriers in a semiconductor are continuously generated and recombined; a solid surface adsorbs gas molecules with a coverage that varies with pressure; photons in a cavity are continuously emitted and absorbed by the walls—the photon number is never conserved. Handling such systems, which exchange both energy and particles, requires generalizing the ensemble idea one step further.

The direction of the generalization is natural: Chapter 3 used a "large heat bath" to fix the temperature; now let the reservoir be larger and more capable—it conducts heat and also supplies particles, and both the temperature $T$ and the chemical potential $\mu$ of the system are fixed by this "large reservoir". In complete parallel with the derivation for the canonical ensemble, the principle of equal a priori probability plus an entropy expansion yields a new distribution, in which a new multiplier appears, corresponding to the constraint of particle-number conservation and physically equal to the chemical potential. The partition function is then upgraded to a "grand partition function": one sums not only over all microstates at fixed $N$ but also over all possible particle numbers.

Why go to this trouble? Because for identical quantum systems the grand canonical language is astonishingly compact: leaving the particle number undetermined actually avoids the cumbersome $N!$ factors, and the Bose and Fermi distributions can be derived on a single page (Chapter 5). Moreover, particle-number fluctuations are physically meaningful in themselves—they are connected with the compressibility, critical opalescence and other important phenomena. This chapter first builds the complete framework of the grand canonical ensemble and prepares the stage for quantum statistics.

## II. Rigorous Definitions

**Chemical potential**: the change of free energy when one particle is added to the system at constant temperature and volume:

$$\mu = \left(\frac{\partial F}{\partial N}\right)_{T,V} = \left(\frac{\partial G}{\partial N}\right)_{T,p}$$

The chemical potential is the "price" of particle exchange: particles flow from high chemical potential to low, and the condition for two systems to reach diffusive equilibrium is equality of chemical potentials. Just as a temperature difference drives heat flow, a chemical potential difference drives particle flow.

**Derivation of the grand canonical ensemble**: combine "system + large reservoir (supplying both heat and particles)" into an isolated system with conserved total energy $E^{(0)}$ and total particle number $N^{(0)}$. When the system has particle number $N$ and microstate $s$ (energy $E_s$), the reservoir has energy $E^{(0)}-E_s$ and particle number $N^{(0)}-N$. The number of microstates of the composite system is $\propto \Omega_s\,\Omega_r(E^{(0)}-E_s,\ N^{(0)}-N)$; expand the reservoir entropy in the two variables:

$$\ln\Omega_r \approx \text{const} - \frac{E_s}{kT} + \frac{\mu N}{kT}$$

where $(\partial\ln\Omega_r/\partial E)_N = 1/kT$ and $(\partial\ln\Omega_r/\partial N)_E = -\mu/kT$ were used. The probability for the system to be in $(N,s)$ is therefore

$$\rho_{Ns} = \frac{1}{\Xi}\,e^{-\beta(E_s-\mu N)}$$

This is the **grand canonical distribution**. The combination $E_s-\mu N$ in the exponent is often called the "grand canonical energy".

**Grand partition function**:

$$\Xi = \sum_N\sum_s e^{-\beta(E_s-\mu N)} = \sum_{N=0}^{\infty} z^N Z_N$$

where $z = e^{\beta\mu}$ is called the **fugacity** and $Z_N$ is the canonical partition function at particle number $N$. The grand partition function is the "generating series" of the canonical partition function in the particle number.

**Statistical expressions for thermodynamic quantities**:

$$\bar N = \frac{1}{\beta}\frac{\partial\ln\Xi}{\partial\mu} = kT\frac{\partial\ln\Xi}{\partial\mu} = z\frac{\partial\ln\Xi}{\partial z}$$

$$U = -\frac{\partial\ln\Xi}{\partial\beta} + \mu\bar N = -\frac{\partial\ln\Xi}{\partial\beta}\bigg|_{z} + \mu\bar N$$

$$p = kT\left(\frac{\partial\ln\Xi}{\partial V}\right)_{T,\mu},\qquad S = k\ln\Xi + \frac{U-\mu\bar N}{T}$$

**Grand thermodynamic potential**: define $\Omega_J = -kT\ln\Xi = U - TS - \mu\bar N = F - \mu\bar N$. For a simple homogeneous system (by an extensivity argument) one obtains

$$\Omega_J = -pV$$

This identity ties $\ln\Xi$ directly to the pressure and is extremely useful in quantum statistics.

**Particle-number fluctuations**: in parallel with the energy fluctuations of the canonical ensemble, the variance of the particle number in the grand canonical ensemble is

$$\overline{(\Delta N)^2} = \bar{N^2} - \bar N^2 = kT\left(\frac{\partial\bar N}{\partial\mu}\right)_{T,V}$$

For a classical ideal gas ($\mu = kT\ln(n\lambda_T^3)$) this gives $\overline{(\Delta N)^2} = \bar N$, with relative fluctuation $\sqrt{\overline{(\Delta N)^2}}/\bar N = 1/\sqrt{\bar N}$, entirely negligible macroscopically. The particle-number fluctuation is also proportional to the isothermal compressibility: $\overline{(\Delta N)^2}/\bar N = nkT\kappa_T$; the divergence of the compressibility near a critical point corresponds to a surge of particle-number fluctuations, which is the origin of critical opalescence.

## III. Why We Understand It This Way

**Why must the chemical potential be introduced?** Particle-number conservation is a new constraint, and the Lagrange multiplier method necessarily produces a new multiplier $\alpha$, identified as $\alpha = -\beta\mu$ after comparison with thermodynamics. In other words, temperature is the multiplier of the "energy conservation constraint" and the chemical potential the multiplier of the "particle-number conservation constraint"; one constraint corresponds to one intensive quantity, a perfectly symmetric logic. When the system cannot exchange particles at all (the canonical case), $N$ is fixed and the chemical potential degenerates into an ordinary thermodynamic derivative.

**Why does the grand partition function "generate everything"?** Differentiating $\Xi$ with respect to $z$ (or $\mu$) gives the mean particle number, with respect to $\beta$ the internal energy, with respect to $V$ the pressure; taking the logarithm and multiplying by $-kT$ gives the grand thermodynamic potential. Its relation to the canonical partition function, $Z \to \Xi = \sum z^N Z_N$, is just like the generalization from the one-particle $Z$ to the system $Z$: one more conserved quantity means one more summation and one more direction of generation.

**Why can the particle number fluctuate?** The small hole (or reaction channel) between the system and the particle reservoir is always open, molecules come and go, and at any instant the number of particles inside the system naturally rises and falls; only the reservoir is large enough that its $\mu$ and $T$ are undisturbed. This is completely parallel to "constant temperature but fluctuating energy": the intensive quantity fixed by the reservoir stays constant while its conjugate extensive quantity fluctuates.

**Why is the grand canonical ensemble the natural language of quantum statistics?** For identical quantum systems, fixing the particle number exactly at $N$ and then counting (canonical) runs into complicated combinatorial factors and $N!$; in the grand canonical ensemble, however, the occupations of the various one-particle states are mutually independent (for an ideal gas), and the mean occupation of each state is determined simply by comparing $\mu$ with $\varepsilon$. The Bose and Fermi distributions then follow at once. Chapter 5 will display this fully.

## IV. Typical Calculations

**Example 1: grand partition function of a classical ideal gas.** With the $N$-particle canonical partition function $Z_N = \frac{1}{N!}\left(V/\lambda_T^3\right)^N$,

$$\Xi = \sum_{N=0}^{\infty}\frac{z^N}{N!}\left(\frac{V}{\lambda_T^3}\right)^N = \exp\left(\frac{zV}{\lambda_T^3}\right)$$

so $\ln\Xi = zV/\lambda_T^3$ and $\bar N = z\,\partial\ln\Xi/\partial z = zV/\lambda_T^3$; inverting gives $z = \bar N\lambda_T^3/V = n\lambda_T^3$, hence the chemical potential

$$\mu = kT\ln\left(n\lambda_T^3\right)$$

The pressure follows from $\Omega_J = -kT\ln\Xi = -kT z V/\lambda_T^3 = -pV$ as $p = nkT$, and the equation of state is reproduced once more.

**Example 2: numerical estimate of particle-number fluctuations.** For 1 mol of a classical ideal gas, $\bar N = 6.02\times10^{23}$, the fluctuation is $\sqrt{\overline{(\Delta N)^2}} = \sqrt{\bar N}\approx7.8\times10^{11}$, a relative fluctuation of about $1.3\times10^{-12}$. Even the most precise measurement cannot detect it—this is the statistical basis for "treating the particle number of a macroscopic system as strictly constant". For mesoscopic systems (such as a few thousand electrons in a quantum dot), the relative fluctuation reaches a few percent, and only there is the grand canonical description truly apt.

**Example 3: the Langmuir formula for monolayer adsorption.** A solid surface has $N_s$ independent adsorption sites, each holding at most one molecule, with the adsorbed state lower in energy than the gas phase by $\varepsilon_0$. Treating each site as a "two-state system" that can exchange particles with the gas and using the grand canonical distribution gives an occupancy probability of the form $\theta = \frac{zp}{zp + p_0(T)}$; in the classical limit this reduces to the Langmuir adsorption isotherm

$$\theta = \frac{bp}{1+bp}$$

At low pressure $\theta\propto p$ (most sites empty), at high pressure $\theta\to1$ (saturation). This is a textbook application of the grand canonical ensemble to "open systems".

**Example 4: inferring the compressibility from the fluctuation formula.** Near the superfluid transition of liquid helium the measured density fluctuations grow markedly. From $\overline{(\Delta N)^2}/\bar N = nkT\kappa_T$, measuring the light scattering intensity from the fluctuations (Rayleigh scattering is proportional to density fluctuations) allows the isothermal compressibility $\kappa_T$ to be inferred. Near the critical point $\kappa_T$ diverges and the scattering increases sharply, producing "critical opalescence"—the fluctuation formula connects an observable optical phenomenon with a thermodynamic response function.

## V. Common Misconceptions

**Misconception 1: confusing the levels of $\Xi$ and $Z$.** $Z_N$ is the canonical partition function at fixed particle number $N$, while $\Xi$ is the grand partition function summed over all $N$; writing $\Xi$ as a power $Z_N^N$ or forgetting the $z^N$ factor leads to complete errors. Remember the relation $\Xi = \sum_N z^N Z_N$.

**Misconception 2: writing the partial-derivative conditions of the fluctuation formula incorrectly.** In $\overline{(\Delta N)^2} = kT(\partial\bar N/\partial\mu)_{T,V}$ the variables $T,V$ must be held fixed; holding other variables (such as $p$) changes the form of the formula. The physical reason is that the fluctuation occurs under the experimental setup "a box of fixed volume connected to a reservoir".

**Misconception 3: treating the sign and size of $\mu$ carelessly.** The chemical potential may be positive or negative (for photons $\mu=0$; for a dilute classical gas $\mu$ is large and negative), and its magnitude varies with density and temperature; casually assuming $\mu>0$ or $\mu\approx0$ is a common error. Estimate the order of magnitude first: for a classical gas $|\mu|/kT = -\ln(n\lambda_T^3)^{-1}$, typically a negative number of order ten to twenty.

**Misconception 4: thinking the grand canonical ensemble applies only to "chemical reactions".** It applies to every situation with variable particle number: adsorption, carrier statistics, the photon gas, open quantum dots, and so on. Understand "variable particle number" as "the system has a channel for exchanging particles with a reservoir"; it has nothing to do with whether a chemical reaction occurs.

**Misconception 5: ignoring the consistency between grand canonical and canonical results.** Some students, seeing that $N$ fluctuates in the grand canonical ensemble, worry that the thermodynamic quantities it computes are "inaccurate". In fact, in the thermodynamic limit the relative fluctuation tends to zero and the three ensembles give completely identical results; differences appear only in finite small systems or near critical points.

## VI. Extensions and Synthesis

The grand canonical ensemble is the bridge between classical and quantum statistics. Chapter 5 will show that, applying the grand canonical distribution to identical-particle systems, the grand partition function of an ideal gas can be summed exactly (not merely in the classical limit), and the result automatically splits into two branches according to a $\mp$ sign, giving the Bose–Einstein and Fermi–Dirac distributions—almost every calculation in quantum statistics starts from $\ln\Xi$, with pressure, particle number and internal energy all obtained from its derivatives. The chemical potential also plays a central role in phase transitions and interfacial phenomena: the condition for two-phase equilibrium is equality of $\mu$ (the origin of the Clausius–Clapeyron equation), adsorption and catalysis are driven by surface chemical potential differences, and the carrier distribution in a semiconductor pn junction is described uniformly by the Fermi level (the chemical potential of electrons). More recently, the optical lattices of cold-atom experiments are precisely artificial "grand canonical systems": lattice sites weakly coupled to a huge reservoir, with occupation-number fluctuations directly observable by in-situ imaging, so that measuring particle-number fluctuations has become an experimental criterion for distinguishing a Mott insulator from a superfluid phase. It is fair to say that whenever "a system is embedded in a large reservoir", the grand canonical ensemble is the correct statistical language; and in modern physics, from mesoscopic devices to cosmological relic particles, "embedding in a large reservoir" is almost everywhere.

## VII. Self-Test and Knowledge Map

Self-test 1: why does $E_s - \mu N$ appear in the exponent as a combination? From the derivation, the reservoir "pays" both the energy $E_s$ and the particles $N$, and its entropy decreases by the sum of the two terms; from information theory, this is the result of superposing the multipliers of two constraints (energy and particle number). A linear combination in the exponent corresponds to a linear combination of constraints—a perfectly symmetric structure. Self-test 2: can you explain the origin of $\Omega_J = -pV$? $U$, $S$, $\bar N$ and $V$ are all extensive, so $U-TS-\mu\bar N$ is extensive too; the intensive quantities $T,\mu,p$ do not change when the system is doubled, so the grand thermodynamic potential must be proportional to $V$, with proportionality coefficient $-p$. This is the classic argument that "extensivity determines the form of the function", worth writing out once from memory.

In terms of the knowledge map, this chapter completes the third piece of the jigsaw of statistical physics: the microcanonical (isolated), canonical (isothermal) and grand canonical (isothermal, constant chemical potential) ensembles are all in place, and the corresponding partition functions $\Omega$, $Z$ and $\Xi$ form a complete generating system. Chapter 5 will use the grand canonical ensemble for identical particles: the two counting rules, Bose and Fermi, give two distributions, both returning to the Boltzmann distribution in the high-temperature limit; Chapters 6 and 7 then display the fascinating physics of Bose systems (the photon gas, Bose condensation) and Fermi systems (the metallic electron gas). By now the theoretical framework of statistical physics is complete, and what remains is to set this machine running to explain blackbody radiation, superfluidity, metallic conduction—real and profound natural phenomena.

## VIII. Further Thoughts

One more memory anchor: arrange the three ensembles in a chain of "constraints relaxed one by one". The microcanonical ensemble fixes $E,V,N$ and its partition function is the number of microstates $\Omega$ itself; the canonical ensemble relaxes the energy (handing it to the heat bath), the distribution gains a Boltzmann factor, and the partition function is upgraded to $Z$; the grand canonical ensemble further relaxes the particle number (handing it to the particle reservoir), the distribution gains a factor $e^{\beta\mu N}$, and the partition function is upgraded to $\Xi$. Each relaxed constraint adds one conjugate intensive quantity (temperature, chemical potential) to the exponent and one more layer of summation. Running the "constraint experiment" in reverse is also instructive: if a system can exchange only volume but not particles or energy (such as two gases separated by a movable piston), a multiplier conjugate to $V$ appears, namely pressure equilibrium. The three-step correspondence "constraint—multiplier—intensive quantity" is the universal grammar running through thermodynamics and statistical physics; master it and any new ensemble can be derived on the spot without memorization.

`,
  },
  'quantum-stats': {
    chapter: 'Chapter 5 Quantum Statistics',
    title: 'The Bose–Einstein and Fermi–Dirac Distributions',
    summary:
      'Indistinguishability and the Pauli principle change the microscopic counting rules; the most probable method then yields the Bose–Einstein and Fermi–Dirac distributions, which return to the Boltzmann distribution in the high-temperature, low-density limit.',
    keyPoints: [
      'Bosons (integer spin) allow arbitrary occupation; fermions (half-integer spin) are limited by the Pauli principle to at most one particle per state',
      'Bose counting $\\Omega_{BE} = \\prod_l \\binom{a_l+\\omega_l-1}{a_l}$; Fermi counting $\\Omega_{FD} = \\prod_l \\binom{\\omega_l}{a_l}$',
      'Bose–Einstein distribution $\\bar a_l = \\omega_l/(e^{(\\varepsilon_l-\\mu)/kT}-1)$',
      'Fermi–Dirac distribution $\\bar a_l = \\omega_l/(e^{(\\varepsilon_l-\\mu)/kT}+1)$',
      'In the high-temperature, low-density limit (mean occupation of each quantum state far below 1) both distributions return to the Boltzmann distribution',
      'Degeneracy criterion $n\\lambda_T^3 \\sim 1$: the metallic electron gas is strongly degenerate at room temperature, while ordinary gases are far from degeneracy',
    ],
    content: String.raw`

Classical statistics carries a hidden assumption: particles can be labelled and identified one by one. When two identical gas molecules exchange positions, classical physics counts this as a "new microstate"; quantum mechanics, however, tells us that identical particles are in principle indistinguishable, that exchanging two identical particles produces no observable difference, and that this cannot count as a new state. This difference, which looks like a mere technical detail of counting, is amplified exponentially in systems with huge particle numbers and thus completely changes the shape of the equilibrium distribution.

A further difference comes from spin. In quantum mechanics, particles of integer spin (including zero) are called bosons (photons, $\pi$ mesons, helium-4 atoms, and so on), and any number of identical bosons may crowd into the same one-particle state; particles of half-integer spin are called fermions (electrons, protons, neutrons, helium-3 atoms, and so on) and are restricted by the Pauli exclusion principle to at most one fermion per one-particle quantum state. The rule "may they share a room or not", together with indistinguishability, gives two entirely different counting formulas.

Substituting these two counting rules into the "most probable distribution" framework of Chapter 1 and repeating the Lagrange multiplier method of Chapter 2 yields the two protagonists of this chapter: the Bose–Einstein and Fermi–Dirac distributions. They merge with the Boltzmann distribution in the high-temperature, low-density limit—classical statistics is not "wrong", but the approximation of quantum statistics when "the mean occupation of each quantum state is far below 1". Understanding "when quantum statistics is indispensable and when classical statistics suffices" is as important as remembering the two distribution formulas.

## II. Rigorous Definitions

**Number of microstates of a Bose system**: $a_l$ identical bosons placed in the $\omega_l$ quantum states of level $\varepsilon_l$ (repeated occupation allowed). The counting problem is equivalent to "putting $a_l$ balls into $\omega_l$ boxes of unlimited capacity", and the number of ways is

$$\Omega_{\text{BE}} = \prod_l \frac{(a_l + \omega_l - 1)!}{a_l!\,(\omega_l-1)!}$$

**Number of microstates of a Fermi system**: at most one fermion per quantum state, i.e. "choose $a_l$ occupied states out of $\omega_l$" (with $a_l\le\omega_l$):

$$\Omega_{\text{FD}} = \prod_l \frac{\omega_l!}{a_l!\,(\omega_l-a_l)!}$$

**Most probable distribution**: maximizing $\ln\Omega$ under the constraints $\sum_l a_l = N$, $\sum_l a_l\varepsilon_l = U$ (with the large-occupation Stirling expansion of $\ln\binom{x}{y}$), the two countings give the unified form

$$\bar a_l = \frac{\omega_l}{e^{\alpha+\beta\varepsilon_l} \mp 1}$$

with $-1$ in the denominator for Bose–Einstein and $+1$ for Fermi–Dirac. Rewriting with $\alpha = -\mu/kT$, $\beta = 1/kT$, the mean occupation of a one-particle state (the occupation function) is

$$\bar n(\varepsilon) = \frac{1}{e^{(\varepsilon-\mu)/kT} - 1}\quad(\text{Bose}),\qquad \bar n(\varepsilon) = \frac{1}{e^{(\varepsilon-\mu)/kT} + 1}\quad(\text{Fermi})$$

where $\mu$ is the chemical potential; for a Bose system $\mu$ must not exceed the lowest one-particle level (otherwise the denominator is zero or negative and the distribution is meaningless).

**Classical limit and degeneracy criterion**: when $e^{\alpha} = e^{-\mu/kT}\gg1$ for all levels (that is, the mean occupation of each one-particle state satisfies $\bar n\ll1$), the $\mp1$ can be neglected and both distributions degenerate into the Boltzmann distribution

$$\bar a_l = \omega_l e^{-\mu/kT}e^{-\varepsilon_l/kT}$$

The chemical potential is then expressible in terms of $\bar N$: $\mu = kT\ln\left(n\lambda_T^3\right)$, where $n = N/V$ is the number density and $\lambda_T = h/\sqrt{2\pi mkT}$ the thermal de Broglie wavelength. The classical limit condition is thus equivalent to

$$n\lambda_T^3 \ll 1$$

that is, "on average fewer than one companion per particle in a cube whose side is the thermal wavelength". When $n\lambda_T^3\gtrsim1$ the system enters the **degenerate regime** and quantum statistics must be used. The degeneracy temperature is of order $T_0\sim\hbar^2 n^{2/3}/(mk)$, set by the density and the particle mass: the smaller the mass and the higher the density, the higher the degeneracy temperature.

**Spin degeneracy**: if a particle has spin $s$, each spatial state carries $g = 2s+1$ spin orientations, and $g$ must be included in the density of states and in the degeneracy (for electrons $g=2$).

## III. Why We Understand It This Way

**Why exactly a $\mp1$ difference in the distribution formulas?** After the Stirling expansion, the difference in the counting formulas produces a correction in the derivative of $\ln\Omega$ with respect to $a_l$: the Bose case contributes a term of the type $\ln(1 - \bar n_l)$ and the Fermi case one of the type $\ln(1 + \bar n_l)$; extremizing then gives denominators $-1$ and $+1$ respectively. A single sign, originating in the opposing rules "may share a state" and "at most one state", ultimately leads to such utterly different macroscopic physics as Bose condensation and the Fermi sphere—a one-letter difference in a microscopic rule is amplified by $10^{23}$ into two different worlds.

**Why does classical statistics return at high temperature and low density?** $\bar n\ll1$ means that "two particles squeezed into the same quantum state" is extremely rare; the exchange counting of "which particles occupy which states" (the $N!$ factor and the combinatorial corrections) then becomes negligible, indistinguishability loses observable consequences, and Boltzmann counting is a good approximation. In other words, all the "new physics" of quantum statistics hides in the events of multiple particles sharing a state; suppress those events and the world naturally returns to the classical one.

**Why do bosons "like to huddle" and fermions "push each other away"?** The $-1$ in the denominator of the B-E distribution allows the occupation of low-energy states to be far greater than 1 (the denominator can approach zero), so statistically particles are encouraged to gather in low-energy states—the extreme outcomes being Bose–Einstein condensation and the single-mode occupation of a laser. The $+1$ of the F-D distribution and the Pauli principle cap the occupation at 1, and particles are "statistically repelled" and fill the higher states step by step up to the Fermi energy. Neither tendency is a real mechanical interaction but a purely statistical effect, hence the names "statistical attraction" and "statistical repulsion".

**Why does the degeneracy criterion use $n\lambda_T^3$?** $\lambda_T$ is the "quantum size" of a particle set by the temperature, and $1/n^{1/3}$ is the mean interparticle spacing; the ratio $\lambda_T/d_{\text{mean}}$ is exactly a measure of whether the wave functions overlap appreciably. When $n\lambda_T^3\ll1$ the wave packets of neighbouring particles barely overlap and indistinguishability is unobservable; when $n\lambda_T^3\sim1$ the wave functions overlap and quantum interference becomes the norm, so quantum statistics is required. A single dimensionless number draws the boundary of "quantum territory" cleanly.

## IV. Typical Calculations

**Example 1: comparing the degeneracy parameter of a metallic electron gas and an ordinary gas.** The conduction electron density in copper is $n\approx8.5\times10^{28}\ \text{m}^{-3}$, the electron mass is $m_e = 9.11\times10^{-31}\ \text{kg}$, and at room temperature $T = 300\ \text{K}$ the thermal wavelength is $\lambda_T = h/\sqrt{2\pi m_ekT}\approx4.3\ \text{nm}$, so $n\lambda_T^3\approx8.5\times10^{28}\times(4.3\times10^{-9})^3\approx6.8\times10^3\gg1$: the electron gas is deeply degenerate and Fermi statistics is indispensable. By contrast, helium gas at atmospheric pressure has $n\approx2.7\times10^{25}\ \text{m}^{-3}$ and atomic mass $m = 6.65\times10^{-27}\ \text{kg}$, giving $\lambda_T\approx0.05\ \text{nm}$ and $n\lambda_T^3\approx3\times10^{-6}\ll1$: an ordinary gas is very far from the degenerate regime and classical statistics is more than enough. A set of numbers explains why quantum statistics is obvious in metals and invisible in gases.

**Example 2: the Fermi distribution at $T = 0$ is a step function.** Let $T\to0$: for $E < \mu$, $e^{(E-\mu)/kT}\to0$ and $\bar n\to1$; for $E>\mu$ the exponential diverges and $\bar n\to0$. The Fermi distribution degenerates into a step—completely filled inside the Fermi sphere and completely empty outside, with the boundary being the Fermi surface. This is the starting point of the metallic electron gas theory of Chapter 7, and it shows intuitively that the chemical potential plays the role of "sea level" in a Fermi system.

**Example 3: re-deriving Planck's formula from the B-E distribution.** The photon number is not conserved, so the constraint $\sum a_l = N$ is absent and hence $\alpha = 0$ ($\mu = 0$). An electromagnetic mode of frequency $\omega$ is a quantum state of energy $\hbar\omega$ with mean photon number $\bar n = 1/(e^{\hbar\omega/kT}-1)$; multiplying by the photon energy and the mode density $V\omega^2d\omega/\pi^2c^3$ gives Planck's radiation formula immediately. The first application of Bose statistics, in 1924, solved the blackbody radiation problem that had been outstanding for more than twenty years.

**Example 4: the leading quantum correction for a weakly degenerate gas.** When $n\lambda_T^3$ is slightly less than 1, expanding the distribution in $e^{-\alpha}$ gives the quantum correction to the pressure $pV = NkT\left(1 \pm n\lambda_T^3/2^{5/2}+\dots\right)$: the pressure of a Bose gas is higher (statistical attraction) and that of a Fermi gas lower (statistical repulsion). The excess pressure of helium-4 at low temperature is exactly such an observable statistical effect.

## V. Common Misconceptions

**Misconception 1: thinking quantum statistics holds only for small microscopic systems.** Whether a system is degenerate is decided by $n\lambda_T^3$ and has nothing to do with its size: the $10^{23}$ electrons in a piece of metal are deeply degenerate, whereas a nanolitre of hot dilute gas is not. The criterion is density and temperature, not volume.

**Misconception 2: treating $\alpha$ as a constant independent of density.** In the classical limit $\mu = kT\ln(n\lambda_T^3)$, so both density and temperature enter the chemical potential; in the degenerate regime the temperature dependence of $\mu$ is also crucial (for a Fermi system $\mu$ is approximately the Fermi energy at low temperature and decreases slightly as $T$ rises). Treating $\alpha$ or $\mu$ as a constant loses half the physics.

**Misconception 3: forgetting the spin degeneracy factor.** Electrons have $g=2$ and photons $g=2$ (two polarizations), and $g$ must be included in the density of states and in the Fermi energy formula; omitting $g$ shifts the Fermi energy by a factor $2^{2/3}$.

**Misconception 4: treating the Pauli principle as a kind of "repulsive force".** The Pauli principle is not an energy term or a mechanical interaction but an occupation rule; the "degeneracy pressure" of a Fermi gas comes from the kinetic energy of particles forced into high-energy states after the low ones are filled, not from a repulsive potential. This statistical pressure is exactly what supports white dwarfs and neutron stars.

**Misconception 5: thinking the difference between the two quantum distributions is just "a sign".** The $\mp1$ in the denominator produces radically different low-temperature behaviour: a Bose system undergoes macroscopic condensation when $\mu$ touches bottom (Chapter 6), while a Fermi system forms a Fermi surface and a Fermi sea (Chapter 7). Remembering the formulas is only the beginning; understanding the difference between the two "personalities" is the goal.

## VI. Extensions and Synthesis

The applications of quantum statistics span astrophysics and materials. White dwarfs resist gravity with electron degeneracy pressure and collapse when their mass exceeds the Chandrasekhar limit (about $1.4$ solar masses); neutron stars are supported by neutron degeneracy pressure, with interior Fermi energies reaching tens of MeV. In semiconductor physics, the doping concentration and temperature decide whether the carriers are degenerate: most devices operate in the non-degenerate regime where carriers follow Boltzmann statistics, which is exactly the origin of the Boltzmann factor in the pn junction equation, while degenerate doping (such as a heavily doped emitter) requires Fermi statistics. Helium-4 enters a superfluid phase below $2.17\ \text{K}$ and helium-3 forms a fermionic superfluid pair at millikelvin temperatures—macroscopic manifestations of Bose and Fermi statistics in liquids respectively. In cold-atom physics, Feshbach resonances tune the interatomic interaction so that both Bose and Fermi gases can become superfluid, and the fermion pairing mechanism is isomorphic to the BCS theory of superconductivity. Historically, the theoretical constructions completed by Bose, Einstein, Fermi and Dirac within the short span 1924–1926, together with Sommerfeld's application to metals (1927–1928), laid the statistical foundations of modern condensed matter physics; Chapters 6 and 7 will follow the Bose and Fermi threads in depth.

## VII. Self-Test and Knowledge Map

Self-test 1: given a temperature and a density, can you decide within ten seconds which statistics to use? Procedure: first compute the thermal wavelength $\lambda_T = h/\sqrt{2\pi mkT}$, then $n\lambda_T^3$; far below 1 use Boltzmann, near or above 1 choose B-E or F-D according to spin. Test the procedure on: copper electrons at room temperature (degenerate), air at room temperature (classical), helium-4 at liquid-helium temperature (degenerate, Bose), electrons in the solar core (extremely degenerate). Self-test 2: why does $\mu$ have an upper bound in a Bose system but not in a Fermi system? The B-E distribution requires a positive denominator, i.e. $\mu\le\varepsilon_{\min}$; the F-D denominator is always positive, so $\mu$ may take any value (at low temperature it is the Fermi energy). This difference is precisely the mathematical switch of Bose condensation in Chapter 6.

In terms of the knowledge map, this chapter replays the most probable method of Chapter 2 with two counting rules and obtains two quantum distributions; in the classical limit they unify into the Boltzmann distribution, completing the grand reunion of the "three statistics". Chapter 6 advances along the Bose direction: the photon gas (the special case $\mu=0$) yields the full set of blackbody radiation laws, and an atomic gas yields Bose–Einstein condensation; Chapter 7 advances along the Fermi direction: the metallic electron gas explains the puzzle of the electronic heat capacity, and the Fermi energy and Fermi temperature become everyday vocabulary in condensed matter physics. With this, the main course of statistical physics is about to conclude—three statistics, two quantum distributions, six or seven kinds of real systems—and I hope you can now move freely along the main line "counting → distribution → partition function → thermodynamic quantities".

`,
  },

  'photon-bec': {
    chapter: 'Chapter 6 The Photon Gas and Bose Condensation',
    title: 'Blackbody Radiation and Bose–Einstein Condensation',
    summary:
      'The photon gas is a Bose system with $\\mu=0$; integrating Planck\'s formula gives the Stefan–Boltzmann law. An ideal Bose gas undergoes macroscopic condensation into the ground state at low temperature, with a critical temperature set by the density.',
    keyPoints: [
      'The photon number is not conserved, hence $\\mu=0$, and the mean photon number of each electromagnetic mode is $\\bar n = 1/(e^{\\hbar\\omega/kT}-1)$',
      'Mode density $D(\\omega)d\\omega = V\\omega^2d\\omega/\\pi^2c^3$ (counting both polarization directions)',
      'Planck\'s formula $u(\\omega,T) = \\hbar\\omega^3/\\pi^2c^3\\,(e^{\\hbar\\omega/kT}-1)^{-1}$',
      'Integration gives the energy density $u = aT^4$ and the radiant exitance $M = \\sigma T^4$, $\\sigma = 2\\pi^5k^4/15h^3c^2$',
      'Photon gas equation of state $p = u/3$ (for extreme relativistic particles $p = U/3V$)',
      'Bose–Einstein condensation: $T_c = \\frac{2\\pi\\hbar^2}{mk}\\left[n/\\zeta(3/2)\\right]^{2/3}$, condensate fraction $N_0/N = 1-(T/T_c)^{3/2}$',
    ],
    content: String.raw`

Heat an empty cavity to temperature $T$; the walls continuously emit and absorb photons, and the cavity finally fills with electromagnetic radiation in equilibrium, called blackbody radiation. In the language of statistical physics: the electromagnetic field in the cavity can be decomposed into standing-wave modes, a large number of independent electromagnetic modes, each mode of frequency $\omega$ being energetically equivalent to a harmonic oscillator of the same frequency; the "excitation quantum" is the photon. Photons are indistinguishable (bosons), have spin 1 (two transverse polarization states), zero rest mass, and a totally non-conserved number—the walls emit and absorb photons at any moment and the photon number is determined by the equilibrium condition itself.

In 1900 Planck proposed an interpolation formula for the blackbody spectrum to fit the experimental data and introduced the energy quantum hypothesis for the purpose, and quantum theory was born; in 1924 Bose treated photons as identical bosons and counted them directly, re-deriving the same formula on a single page. One and the same spectral curve is tied at one end to the birth of quantum theory and at the other to the maturity of quantum statistics—this chapter begins there. The photon gas is the cleanest application of Bose statistics: because $\mu=0$, even the chemical potential is dispensed with.

The second half of the chapter deals with another extreme consequence of Bose statistics—Bose–Einstein condensation (BEC). The excited states of an ideal Bose gas can hold only a total number of particles that has an upper limit decreasing with temperature; when the temperature falls below a certain critical value, the surplus particles have nowhere to go and can only pile up macroscopically in the ground state, forming a "macroscopic quantum state". This phenomenon was predicted by Einstein in 1925, realized only in 1995 in a rubidium atomic gas, and awarded the 2001 Nobel Prize in Physics. The photon gas and Bose condensation display, respectively, the "everyday form" and the "extreme form" of Bose statistics.

## II. Rigorous Definitions

**Electromagnetic mode density**: in a cavity of volume $V$, the number of standing-wave modes with wave number between $k$ and $k+dk$ is $V\cdot4\pi k^2dk/(2\pi)^3$; substituting $k = \omega/c$ and multiplying by two polarization directions gives the number of modes in $\omega\sim\omega+d\omega$

$$D(\omega)\,d\omega = \frac{V}{\pi^2c^3}\,\omega^2\,d\omega$$

This $\omega^2$ spectral density comes from the geometric volume of wave-vector space and is the counting result common to all "massless fields" (phonons included).

**Mean occupation of the photon gas and Planck's formula**: the photon number is not conserved, so the constraint $\sum a_l = N$ is absent from the grand canonical distribution, hence $\alpha = 0$, $\mu = 0$. The probability for a mode of frequency $\omega$ to be in the $n$-photon excited state is proportional to $e^{-n\hbar\omega/kT}$, and the mean photon number is

$$\bar n(\omega) = \frac{1}{e^{\hbar\omega/kT}-1}$$

The radiation energy density per unit volume in $\omega\sim\omega+d\omega$ is

$$u(\omega,T)\,d\omega = \frac{\hbar\omega}{V}\cdot D(\omega)d\omega\cdot\bar n(\omega) = \frac{\hbar\omega^3}{\pi^2c^3}\,\frac{d\omega}{e^{\hbar\omega/kT}-1}$$

This is **Planck's formula**. In the low-frequency limit $\hbar\omega\ll kT$, $u\propto\omega^2 kT$ (the Rayleigh–Jeans law); in the high-frequency limit $\hbar\omega\gg kT$, $u\propto\omega^3 e^{-\hbar\omega/kT}$ (Wien's law). Planck's formula joins the two ends exactly.

**Wien displacement law**: extremizing $u(\omega,T)$ shows that the peak frequency is proportional to $T$; expressed in wavelength,

$$\lambda_m T = b,\qquad b = 2.898\times10^{-3}\ \text{m·K}$$

This is the quantitative statement that "the higher the temperature, the shorter the wavelength of the radiation": a heated iron block goes from dull red to bright orange to white, and the cosmic microwave background at $2.725\ \text{K}$ peaks at $1.06\ \text{mm}$.

**Thermodynamics of the photon gas**: integrating Planck's formula (substituting $x = \hbar\omega/kT$ and using $\int_0^\infty x^3dx/(e^x-1) = \pi^4/15$) gives the total energy density

$$u(T) = \int_0^\infty u(\omega,T)d\omega = aT^4,\qquad a = \frac{\pi^2k^4}{15\hbar^3c^3}$$

The radiation pressure follows from the momentum flux; for massless particles moving isotropically $p = u/3$ (note that it is not $2u/3$, because $p^2/2m$ is replaced by $pc$). From $dU = TdS - pdV$ one further obtains the photon gas entropy $S = \frac{4}{3}aT^3V$ and the adiabatic relation $VT^3 = $ const.

**Stefan–Boltzmann law**: the radiant exitance per unit area of a blackbody surface is related to the energy density by $M = \frac{1}{4}cu$ (the cosine projection factor for isotropic radiation), hence

$$M = \sigma T^4,\qquad \sigma = \frac{2\pi^5k^4}{15h^3c^2} = 5.67\times10^{-8}\ \text{W/(m}^2\text{K}^4)$$

**Bose–Einstein condensation**: consider an ideal Bose gas with no spin degeneracy ($g=1$). The maximum number of particles the excited states $(\varepsilon>0)$ can hold shrinks as the temperature falls:

$$N_{\text{ex}}^{\max} = \frac{V}{\lambda_T^3}\,\zeta\!\left(\tfrac{3}{2}\right),\qquad \zeta\!\left(\tfrac{3}{2}\right)\approx2.612$$

where $\lambda_T = h/\sqrt{2\pi mkT}$ is the thermal wavelength. At fixed density $n = N/V$, the temperature at which $N_{\text{ex}}^{\max}$ falls below $N$ is the **critical temperature**

$$T_c = \frac{2\pi\hbar^2}{mk}\left[\frac{n}{\zeta(3/2)}\right]^{2/3} \approx \frac{3.31\,\hbar^2 n^{2/3}}{mk}$$

For $T<T_c$ the chemical potential is pinned at the ground-state energy (with the ground-state energy taken as zero, $\mu=0$), and the ground-state fraction is

$$\frac{N_0}{N} = 1-\left(\frac{T}{T_c}\right)^{3/2}$$

The condensation takes place in momentum space: a large number of particles occupy the same zero-momentum one-particle state, forming a macroscopically coherent matter wave.

## III. Why We Understand It This Way

**Why is the chemical potential of the photon gas zero?** The physical meaning of the chemical potential is "the free-energy cost of adding one particle", and its value is fixed by the particle-number conservation constraint. Photons are continuously emitted and absorbed by the walls, the particle number adjusts itself in equilibrium, and no conservation constraint exists, so the corresponding Lagrange multiplier must vanish. This is not an approximation but an exact conclusion: any "Bose quasiparticle with non-conserved number" (phonons, magnons) satisfies $\mu=0$.

**Why is the energy density proportional to $T^4$?** The spectral density $\omega^2$ times the photon energy $\hbar\omega$ gives an $\omega^3$ weight, which is then multiplied by the Bose occupation $1/(e^{\hbar\omega/kT}-1)$; after the change of variables the integral leaves only the pure number $\int x^3/(e^x-1)dx$, and all temperature dependence comes out as $(kT)^4$. The $T^4$ law is the universal result for a three-dimensional massless field, and the internal energy of a phonon gas is likewise $\propto T^4$ (Debye model).

**Why is the radiation pressure one third of the energy density?** Pressure comes from the momentum flux of particles hitting the wall: for non-relativistic particles $p = 2u/3$ (from the relation between kinetic energy $mv^2/2$ and momentum $mv$), while for extreme relativistic particles $\varepsilon = pc$ gives $p = u/3$. Photons have zero rest mass and always travel at the speed of light, so they belong to the latter class. This one third also determines the adiabatic cooling law $T\propto V^{-1/3}$ of the radiation-dominated early universe during cosmic expansion.

**Why does a critical temperature exist?** The lower the temperature, the longer the thermal wavelength $\lambda_T$, and the smaller the number of excited-state "slots" $\propto 1/\lambda_T^3$ that each thermal-wavelength cube can hold; at fixed density, once the temperature is low enough that the slots are insufficient, the remaining particles can only crowd into the ground state—the condensation is not caused by a new interaction but is a purely statistical "exhaustion of slots". This also explains why condensation is possible only in Bose systems: fermions allow at most one particle per state, so "macroscopic piling up" is out of the question.

## IV. Typical Calculations

**Example 1: the surface temperature of the Sun.** The solar radiant exitance is about $M\approx6.3\times10^7\ \text{W/m}^2$; from $M = \sigma T^4$,

$$T = \left(\frac{M}{\sigma}\right)^{1/4} = \left(\frac{6.3\times10^7}{5.67\times10^{-8}}\right)^{1/4} \approx 5.8\times10^3\ \text{K}$$

consistent with the colour temperature of the solar spectrum. Conversely, the Earth receives solar radiation and re-emits it in the infrared; balancing the two estimates a mean surface temperature of about $255\ \text{K}$ (about $288\ \text{K}$ after including the greenhouse effect), demonstrating the use of the $T^4$ law in planetary climate budgets.

**Example 2: the cosmic microwave background.** The COBE satellite measured a CMB spectrum matching a Planck spectrum at $T = 2.725\ \text{K}$ to better than one part in ten thousand; this is the most direct evidence for the Big Bang picture of a "relic radiation from a universe in thermal equilibrium", and a verification of Planck's formula on a scale of $13.8$ billion light years.

**Example 3: estimating the condensation temperature of helium-4.** Liquid helium has density $\rho = 145\ \text{kg/m}^3$ and $n = \rho/m = 2.18\times10^{28}\ \text{m}^{-3}$; substituting into the $T_c$ formula ($m = 6.65\times10^{-27}\ \text{kg}$) gives $T_c\approx3.1\ \text{K}$. The measured superfluid transition is at $2.17\ \text{K}$: the order of magnitude is right, and the deviation comes from the rather strong interactions in the liquid (the ideal-gas formula is only a zeroth-order approximation).

**Example 4: BEC in a dilute atomic gas.** A rubidium-87 gas is cooled in a magneto-optical trap to a density of about $n\sim10^{20}\ \text{m}^{-3}$, which gives $T_c\sim10^{-7}\ \text{K}$ (of order a hundred nanokelvin). It was precisely at such temperatures that Cornell, Wieman and Ketterle realized Bose condensation of alkali atomic gases in 1995; the condensates observed contained thousands of atoms occupying a single macroscopic wave function, and interference experiments subsequently displayed its coherence directly.

## V. Common Misconceptions

**Misconception 1: taking a blackbody to be "a black-coloured object".** A blackbody is defined as "an ideal body that absorbs all incident radiation", irrespective of its visual colour; the Sun is not black, yet its spectrum is close to a blackbody spectrum. "Blackbody" emphasizes the radiative property and its separation from the interior of the body: any body in equilibrium with a radiation field tends to the same spectral shape.

**Misconception 2: thinking Planck's formula applies only to cavities.** A small hole in a cavity is one realization of an ideal blackbody, but the Planck spectrum describes the equilibrium radiation spectrum of any blackbody (and of approximate blackbodies such as stellar surfaces and the cosmic background), independent of the cavity's shape and material and determined only by the temperature.

**Misconception 3: imagining Bose condensation as "condensing into a droplet" in real space.** BEC occurs in momentum space: the particles gather in the zero-momentum state, while in real space the gas still fills the whole box and its density profile differs little from that of an ordinary gas. It is a condensation of coherence, not the formation of a liquid drop.

**Misconception 4: ignoring the difference between the photon and the harmonic oscillator spectra.** The energy of an electromagnetic mode is $n\hbar\omega$ (no zero-point term enters the photon counting), whereas an ordinary quantum harmonic oscillator has a zero-point energy $\frac{1}{2}\hbar\omega$; when computing radiation pressure and entropy the contribution of the zero-point term must be handled correctly (for the photon gas one usually starts from the occupation numbers and avoids it naturally).

**Misconception 5: forgetting the behaviour of the chemical potential after condensation.** For $T<T_c$, $\mu$ is pinned at the ground-state energy and no longer varies, and the whole temperature dependence of the condensate fraction $N_0/N = 1-(T/T_c)^{3/2}$ is carried by the excited states; continuing to use the $\mu(T)$ formula valid for $T>T_c$ gives absurd results.

## VI. Extensions and Synthesis

The statistical framework of the photon gas can be transplanted wholesale to phonons in solids: phonons are also Bose quasiparticles with $\mu=0$, only with the dispersion $\omega = ck$ replaced by an acoustic branch $\omega = c_s k$; the mode density has the same structure, so the Debye model gives the $T^3$ law of the low-temperature heat capacity of solids (of the same origin as the $T^4$ energy law of the photon gas)—blackbody radiation and the heat capacity of solids are mathematically twin problems. The physics of Bose condensation is reproduced again and again in superfluid helium-4 and in the condensation of Cooper pairs in superconductors (paired fermions behaving as bosons); a laser is "non-equilibrium condensation of photons"—a large number of photons occupying the same optical mode, an interesting contrast with the equilibrium condensation of BEC. BEC itself has become the standard platform of contemporary quantum simulation: loading a condensate into an optical lattice simulates the behaviour of electrons in a crystal; tuning the scattering length with Feshbach resonances explores the whole BCS–BEC crossover; rotating condensates realize artificial gauge fields and quantum Hall states. Thermal radiation likewise has broad applications: comparing the luminous efficiency of incandescent lamps and LEDs, satellite thermal control, infrared thermometry, and the radiation entropy budget of primordial nucleosynthesis in cosmology—all are direct engineering uses of the $T^4$ law and the Planck spectrum. One may say that this chapter gathers "the oldest quantum problem" (blackbody radiation) and "the newest quantum matter" (BEC) into a single Bose-statistical framework, the finest showcase of the unifying beauty of statistical physics.

## VII. Self-Test and Knowledge Map

Self-test 1: why was blackbody radiation unsolvable in classical physics, while Bose statistics settled it at one blow? Classically equipartition assigns $kT$ to each electromagnetic mode, and the number of modes $\propto\omega^2$ has no upper limit, so the integral diverges (the ultraviolet catastrophe); Bose statistics replaces the energy per mode by $\hbar\omega/(e^{\hbar\omega/kT}-1)$, suppressing the high frequencies exponentially, so the integral converges and gives $T^4$. The crux of the problem is exactly the two points "energy quantization + identical-particle counting", both indispensable. Self-test 2: why does the condensation temperature rise with density and fall with mass? $T_c\propto n^{2/3}/m$: the denser and lighter the particles, the longer the thermal wavelength, and the easier it is for the "slots" to be exhausted already at a relatively high temperature. This explains why electrons (very light but fermionic) and atoms (heavier, requiring lower temperatures) take completely different routes to degeneracy.

In terms of the knowledge map, this chapter is a double feature of Bose statistics: the $\mu=0$ photon gas gives the full set of blackbody radiation laws (Planck spectrum, Wien displacement, Stefan–Boltzmann, $p = u/3$), while an atomic gas with $\mu$ touching bottom gives Bose–Einstein condensation and the condensate-fraction formula. The common mathematical basis is the B-E distribution together with the mode density for massless/linear dispersion. The next chapter turns to Fermi statistics: the electron gas in metals will display the Fermi energy, the Fermi temperature and the linear electronic heat capacity, explaining the puzzle of the metallic heat capacity that classical statistics could not handle. The Bose and Fermi threads have now both completed their main derivations, and the full picture of the three statistics closes here.

`,
  },

  'fermi-gas': {
    chapter: 'Chapter 7 The Fermi Gas',
    title: 'The Metallic Electron Gas and the Fermi Energy',
    summary:
      'The conduction electrons of a metal form a strongly degenerate Fermi gas; the Fermi energy $E_F$ and Fermi temperature $T_F$ characterize its degeneracy, and the electronic heat capacity is proportional to $T/T_F$, far below the classical prediction.',
    keyPoints: [
      'Free electron gas model: conduction electrons treated as non-interacting fermions in a box, with spin degeneracy $g=2$',
      'Density of states $D(E)\\propto\\sqrt{E}$; at $T=0$ the electrons fill up to the Fermi energy $E_F = \\frac{\\hbar^2}{2m}(3\\pi^2n)^{2/3}$',
      'Fermi temperature $T_F = E_F/k \\sim 10^4$–$10^5\\ \\text{K}$; room temperature is far below $T_F$, so the electron gas is strongly degenerate',
      'Mean energy per electron at $T=0$: $\\bar E = 3E_F/5$; even at zero temperature the electrons move at about $10^6\\ \\text{m/s}$',
      'Low-temperature electronic heat capacity $C_V = \\frac{\\pi^2}{2}Nk\\,\\dfrac{T}{T_F}$, linear in temperature and far smaller than the lattice heat capacity',
      'In the high-temperature, low-density limit ($n\\lambda_T^3\\ll1$) Boltzmann statistics is recovered, as for non-degenerate carriers in semiconductors',
    ],
    content: String.raw`

Why does cutting a piece of metal in two require force? Why do metals conduct electricity and heat, and why are they shiny? The classical theory of metals (the Drude model, 1900) treated conduction electrons as a classical ideal gas: electrons obey Boltzmann statistics and equipartition like gas molecules. This model derives Ohm's law but runs into a wall over the heat capacity: if $N$ electrons were a classical gas, they would contribute $\frac{3}{2}Nk$ to the heat capacity, comparable with the $3Nk$ of the lattice vibrations, giving a total of $4.5Nk$; yet the measured heat capacity of metals at room temperature is almost exactly $3Nk$, with the electronic contribution below one percent. Classical statistics met its Waterloo here.

In 1926–1928 Sommerfeld applied the newly born Fermi–Dirac statistics to the electron gas, and the mystery dissolved at once: the Pauli principle "locks" the overwhelming majority of electrons below the Fermi surface, and thermal excitation can only disturb a thin layer of thickness about $kT$ near that surface; the fraction of electrons able to absorb heat is only $N\cdot kT/E_F\sim1\%$, so the electronic heat capacity is naturally two orders of magnitude below the classical prediction. This is the central picture of the chapter—the electrons in a metal are not a "steaming classical gas" but a cold, calm "Fermi sea": below the surface (the Fermi surface) all is still, and only the water molecules near the surface feel the temperature.

This chapter builds the complete statistical description of the free electron gas: density of states, Fermi energy, Fermi temperature, thermodynamic quantities at finite temperature and the electronic heat capacity, and explains when one may fall back on classical statistics (non-degenerate carriers in semiconductors). The Fermi energy and Fermi temperature become everyday vocabulary in condensed matter physics from here on.

## II. Rigorous Definitions

**Free electron gas model**: the conduction electrons in a metal (one per atom, e.g. the monovalent $4s$ electron of copper) are treated as a gas of mutually non-interacting fermions confined in the metal volume $V$; the positive ion background only provides a uniform potential well (Wigner–Seitz approximation), with the boundary being an infinitely high potential wall. An electron has spin $1/2$ and spin degeneracy $g = 2$ (each spatial state holds two electrons of opposite spin).

**Density of states**: in $k$ space there is one $k$ point per volume $(2\pi)^3/V$; the constant-energy surface $E = \hbar^2k^2/2m$ is a sphere, and one can count the number of states (including spin) with energy below $E$

$$\Gamma(E) = \frac{V}{3\pi^2}\left(\frac{2mE}{\hbar^2}\right)^{3/2}$$

Differentiating with respect to $E$ gives the **density of states** (the number of one-particle states per unit energy interval)

$$D(E) = \frac{V}{2\pi^2}\left(\frac{2m}{\hbar^2}\right)^{3/2}\sqrt{E} \propto \sqrt{E}$$

The $\sqrt{E}$ density of states is the universal feature of a three-dimensional non-relativistic gas (the $\omega^2$ spectral density of phonons and photons is likewise a geometric result of dimensionality and dispersion).

**Fermi energy and Fermi momentum**: at $T = 0$ the electrons fill all states from the lowest up, and the highest occupied level is the **Fermi energy**. Setting $\Gamma(E_F) = N$:

$$E_F = \frac{\hbar^2}{2m}\,(3\pi^2 n)^{2/3},\qquad p_F = \hbar(3\pi^2 n)^{1/3},\qquad n = N/V$$

**Fermi temperature**:

$$T_F = \frac{E_F}{k}$$

For metals $T_F$ is about $10^4$–$10^5\ \text{K}$, far above any working temperature, so the metallic electron gas is deeply degenerate at all practical temperatures ($T\ll T_F$).

**Mean energy at zero temperature**: the electrons are uniformly distributed in the sphere, $U_0 = \int_0^{E_F} E\,D(E)dE = \frac{3}{5}NE_F$, so the mean energy per electron is

$$\bar E = \frac{3}{5}E_F$$

that is, at zero temperature the electrons are not at rest but move at the Fermi velocity $v_F = p_F/m\sim10^6\ \text{m/s}$ (the kinetic energy of the quantum ground state, not thermal motion).

**Thermodynamic quantities at finite temperature**: for $T\ll T_F$ the Fermi distribution $f(E) = 1/(e^{(E-\mu)/kT}+1)$ deviates from a step function only within a thin layer of width about $kT$ near $E_F$. The Sommerfeld expansion gives the temperature corrections to the internal energy and the chemical potential

$$U = \frac{3}{5}NE_F\left[1 + \frac{5\pi^2}{12}\left(\frac{T}{T_F}\right)^2 + \cdots\right],\qquad \mu \approx E_F\left[1 - \frac{\pi^2}{12}\left(\frac{T}{T_F}\right)^2\right]$$

**Electronic heat capacity**: differentiating $U$ gives the famous linear heat capacity formula

$$C_V^{(e)} = \left(\frac{\partial U}{\partial T}\right)_V = \frac{\pi^2}{2}\,Nk\,\frac{T}{T_F}$$

Its ratio to the lattice heat capacity $3Nk$ (Dulong–Petit regime) is about $\frac{\pi^2}{6}\cdot\frac{Z T}{T_F}$ ($Z$ the number of valence electrons per atom), roughly $0.6\%$ for copper at room temperature—the heat capacity paradox is thus resolved. At very low temperature the lattice heat capacity falls as $T^3$ and the electronic one ($\propto T$) takes over; in the low-temperature metallic heat capacity $C = \gamma T + AT^3$ the coefficient $\gamma$ is precisely a measure of the density of states at the Fermi surface.

## III. Why We Understand It This Way

**Why is the electronic heat capacity two orders of magnitude below the classical prediction?** Classical equipartition assumes every electron takes part in thermal motion of $\frac{3}{2}kT$; the Pauli principle decrees that for electrons with energy below $E_F - kT$ the neighbouring states are already filled, so they cannot absorb energy of order $kT$, and only the fraction $\sim kT/E_F$ near the Fermi surface is "thermally active". Hence $C_V\sim Nk\cdot T/T_F$: the degeneracy parameter $T/T_F\sim10^{-2}$ directly sets the reduction factor. This is the paradigm of "the Pauli principle freezing internal degrees of freedom", and the same logic explains the low-temperature behaviour of nuclear matter and white dwarfs.

**Why do electrons still move at great speed at zero temperature?** If all electrons were at rest (zero momentum), the Pauli principle would be violated—all of them would occupy the same momentum state. The "ground state" of a fermion system must be the configuration filling the Fermi sphere, and the kinetic energy $3E_F/5$ is the "inalienable kinetic energy" imposed by the counting rule, independent of temperature. The electron degeneracy pressure (the support mechanism of white dwarfs) is exactly the resistance of this kinetic energy to compression.

**Why do conduction and heat transport involve only the electrons near the Fermi surface?** An electric field accelerates electrons by shifting the whole Fermi sphere in $k$ space, and only electrons near the surface can find empty states to move into (inner electrons have nowhere to go and contribute nothing to the current). Conductivity, thermal conductivity, the Hall coefficient, thermoelectric emf and other transport quantities are all determined by Fermi surface parameters; hence "the Fermi surface is the soul of a metal".

**When must one abandon Fermi statistics and fall back on the classical description?** When $n\lambda_T^3\ll1$ (non-degenerate) the $+1$ in the Fermi distribution can be neglected and Boltzmann statistics returns. Carriers in semiconductors have low concentrations ($n$ below about $10^{21}\ \text{m}^{-3}$, seven or eight orders of magnitude below metals), and at room temperature $n\lambda_T^3\sim10^{-5}$, completely non-degenerate, which is why the Boltzmann factor in the pn junction equation holds; only heavy doping or low-temperature high injection enters the degenerate regime, where Fermi statistics is needed.

## IV. Typical Calculations

**Example 1: Fermi energy and Fermi temperature of copper.** Copper has density $\rho = 8.96\times10^3\ \text{kg/m}^3$, molar mass $M = 63.5\times10^{-3}\ \text{kg/mol}$ and is monovalent, so the electron number density is

$$n = \frac{\rho N_A}{M} = \frac{8.96\times10^3\times6.02\times10^{23}}{63.5\times10^{-3}} \approx 8.5\times10^{28}\ \text{m}^{-3}$$

Substituting into the $E_F$ formula gives $E_F\approx1.13\times10^{-18}\ \text{J}\approx7.0\ \text{eV}$ and $T_F = E_F/k\approx8.2\times10^4\ \text{K}$. The melting point of copper ($1358\ \text{K}$) is far below $T_F$: a solid metal is always a deeply degenerate electron gas.

**Example 2: Fermi velocity and zero-temperature pressure.** For copper $p_F = \hbar(3\pi^2n)^{1/3}\approx1.5\times10^{-24}\ \text{kg·m/s}$ and $v_F = p_F/m_e\approx1.6\times10^6\ \text{m/s}$—at zero temperature the electrons still move at a thousandth of the speed of light. The zero-temperature electron gas pressure is $p_0 = \frac{2}{5}nE_F\approx3.8\times10^{10}\ \text{Pa}$ (hundreds of thousands of atmospheres); this huge degeneracy pressure is balanced by the ionic potential well, which shows just how tightly the electron gas is compressed.

**Example 3: numerical value of the electronic heat capacity.** At room temperature $T = 300\ \text{K}$ the ratio of the electronic to the lattice heat capacity of copper is

$$\frac{C_V^{(e)}}{C_V^{(lattice)}} \approx \frac{\pi^2}{2}\cdot\frac{T}{T_F}\cdot\frac{1}{3} \approx \frac{4.93\times300/8.2\times10^4}{3} \approx 6\times10^{-3}$$

about $0.6\%$, in agreement with experiment (the electronic contribution at room temperature is below about $1\%$). At $T\sim1\ \text{K}$, however, the lattice term $\propto T^3$ is already much smaller than the linear term and the electronic heat capacity dominates—low-temperature specific heat measurements are precisely the standard way to extract the density of states at the Fermi surface (the $\gamma$ coefficient).

**Example 4: the classical limit for semiconductor carriers.** Silicon doped with phosphorus at $n = 10^{21}\ \text{m}^{-3}$ at room temperature has $kT\approx0.026\ \text{eV}$ and electron thermal wavelength $\lambda_T\approx7\ \text{nm}$, so $n\lambda_T^3\approx3\times10^{-7}\ll1$: the carriers are completely non-degenerate and follow Boltzmann statistics. If the doping is raised to $10^{26}\ \text{m}^{-3}$ (heavily degenerate doping), $n\lambda_T^3\sim0.3$, the Fermi level enters the conduction band, and the device behaviour must be described by Fermi statistics (degenerate semiconductors, tunnel diodes).

## V. Common Misconceptions

**Misconception 1: taking the Fermi temperature as the actual temperature of the electron gas.** $T_F = E_F/k$ is only a conversion of the energy scale, not "how hot" the electrons are; the entropy and heat capacity of the electron gas are controlled by $T/T_F$, and at room temperature the electron gas is relatively "cold" (deeply degenerate) even though $T_F$ reaches a hundred thousand kelvin.

**Misconception 2: thinking that at $T = 0$ the electrons are at rest and the gas pressure vanishes.** The Pauli principle forces the electrons to fill the Fermi sphere, so at zero temperature there is a mean kinetic energy $3E_F/5$ and a degeneracy pressure $2nE_F/5$; "zero temperature, zero pressure" holds only for a classical gas.

**Misconception 3: omitting the spin degeneracy factor.** Forgetting $g = 2$ shifts the Fermi energy by $2^{2/3}\approx1.59$ times; always check $g$ in the density of states or in $\Gamma(E)$ when writing formulas.

**Misconception 4: thinking all electrons contribute to metallic conduction.** Electrons in filled inner bands have nowhere to go in an electric field; transport involves only electrons near the Fermi surface. This also explains why the conductivity of monovalent and polyvalent metals differs far less than the ratio of their valence electron numbers.

**Misconception 5: assuming $\mu$ equals $E_F$ at finite temperature.** $\mu(T)$ decreases slowly with temperature, by an amount of order $-\frac{\pi^2}{12}k^2T^2/E_F$; for $T\ll T_F$ one may approximate it by $E_F$, but its temperature dependence must be considered when discussing thermionic emission or the shift of the Fermi level in semiconductors.

## VI. Extensions and Synthesis

The stage of the Fermi gas extends far beyond metals. White dwarfs are supported by electron degeneracy pressure, and the mass limit (the Chandrasekhar limit, $\approx1.4$ solar masses) comes from the competition in which "degeneracy pressure grows more slowly with density than gravity"; the interior of a neutron star is an extreme relativistic neutron Fermi gas whose equation of state determines the mass–radius relation of the star, testable by observing millisecond pulsars. In metal theory, Bloch waves and band structure generalize the free electron gas into "a Fermi gas in a periodic lattice potential", and the interplay of the Fermi surface with Brillouin zone boundaries produces the distinction between metals, insulators and semiconductors; in the BCS theory of conventional superconductivity, electrons of opposite spin near the Fermi surface form Cooper pairs, with the Fermi sea as the background in which pairing occurs. Semiconductor physics is the field where Fermi statistics "travels light": in the non-degenerate approximation the Fermi–Dirac distribution reduces to a Boltzmann factor, and the carrier concentration, the position of the Fermi level and the pn junction current equation all follow from it, with the full Fermi statistics restored under heavy degenerate doping. In cold atoms, fermionic atoms (such as lithium-6 and potassium-40) also form a Fermi sea in magnetic traps, and Feshbach resonances realize paired superfluidity, turning the BCS–BEC crossover into a tunable experiment. Looking back over this chapter and the preceding ones reveals a complete narrative: classical statistics fails on the metallic heat capacity (the opening) → the Pauli principle and the Fermi distribution provide the answer (this chapter) → the Fermi surface becomes the language of modern condensed matter physics (the extension). Here statistical physics delivers its most beautiful piece of timely help.

## VII. Self-Test and Knowledge Map

Self-test 1: estimate the $E_F$ of copper without consulting tables. Procedure: density and molar mass give $n\sim10^{29}\ \text{m}^{-3}$ → $(3\pi^2n)^{1/3}\sim1.4\times10^{10}\ \text{m}^{-1}$ → $E_F = \hbar^2k_F^2/2m\sim10^{-18}\ \text{J}\sim7\ \text{eV}$. Cultivate the habit of "estimate the order of magnitude first, then compute the number"; it lets you spot most computational errors on the spot. Self-test 2: why can low-temperature heat capacity measurements distinguish the electronic from the lattice contribution in metals? With $C = \gamma T + AT^3$, plotting $C/T$ against $T^2$ should give a straight line: the intercept is $\gamma$ (the electronic term) and the slope is $A$ (the Debye term). This standard experimental treatment is a direct application of the two temperature dependences, "linear versus cubic".

In terms of the knowledge map, this chapter dissects the metallic electron gas with the Fermi–Dirac distribution: the $\sqrt{E}$ density of states, the Fermi energy $E_F\propto n^{2/3}$, the Fermi temperature, the Sommerfeld expansion and the linear electronic heat capacity, all in one sweep; the high-temperature, low-density limit automatically rejoins Boltzmann statistics and connects with semiconductor carrier statistics. The theory and applications of the three statistics (Boltzmann, Bose, Fermi) have now all been unfolded: the counting principles of Chapter 1, the partition function of Chapter 2, the ensemble framework of Chapters 3 and 4, the quantum distributions of Chapter 5, and the two application features of Chapters 6 and 7 form the complete trunk of statistical physics. Looking back over the whole journey, one main line runs through it—**equilibrium is a maximum of counting, and every thermodynamic quantity is a derivative of the counting**; may you carry this line into deeper textbooks and the literature.

## VIII. Further Thoughts

Finally, place the Fermi gas and the Bose gas side by side for a closing comparison. They share the same geometry of the density of states (three-dimensional non-relativistic dispersion gives the $\sqrt{E}$ form), yet at low temperature they go in two directions: a Bose gas, once $\mu$ touches bottom, presses the surplus particles wholesale into the ground state and forms a coherent condensate; a Fermi gas, with at most one particle per state, can only pile the Fermi sphere ever higher and resist compression with degeneracy pressure. One "condenses downwards", the other "stacks upwards", and the divergence comes solely from a sign in the denominator. Even more telling is the middle ground: let fermions pair up two by two (Cooper pairs), and the composite particles are bosons that can condense into a superfluid or superconductor—the BCS–BEC crossover theory describes exactly the continuous evolution from "weakly paired with large overlap" to "tightly bound small molecules". Evidently Bose and Fermi are not two isolated kingdoms but two connected tracts of the same statistical continent, with the bridge between them built from pairing and indistinguishability. Understand this, and looking back at the Fermi sea picture of this chapter you will feel a deeper respect for "statistical rules determine the forms of matter".

`,
  },
};

export default map;
