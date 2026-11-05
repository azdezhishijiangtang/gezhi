import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'wave-function': {
    chapter: 'Chapter 1 Wave Functions and the Schrödinger Equation',
    title: 'The Statistical Interpretation of the Wave Function',
    summary:
      'The wave function is a probability amplitude, not a probability; its squared modulus gives the probability density of finding the particle, the Schrödinger equation determines how it evolves, and stationary states and superposition make up the whole language of quantum dynamics.',
    content: String.raw`

Classical mechanics answers "where is the particle and where is it going" with a definite trajectory; but in the double-slit experiment electrons strike the screen one after another, their landing points apparently lawless, yet after thousands of them alternating bright and dark interference fringes emerge. For a single electron we can at best say "with what probability it lands here"; but this cloud of probability does not come from nothing — like a water wave it interferes and diffracts. de Broglie proposed the matter-wave hypothesis and Born took the decisive step: **the intensity of the wave at a point is proportional to the probability of finding the particle there**. This wave is not the probability itself but a "probability amplitude": it may be complex and may be negative, and it is exactly this "freedom of sign" that lets two waves cancel or reinforce when superposed, producing interference terms that do not exist in classical probability theory. Schrödinger then wrote down the evolution equation for this amplitude — the first law of quantum mechanics. The task of this chapter is to make three things clear: what the wave function is, how it evolves in time, and how the probabilities of observables are read off from it.

It is worth noting that the very name "probability amplitude" reminds us that the wave function sits between "wave" and "probability": it is neither a real disturbance like a water wave nor a probability distribution in the classical sense, but a complex function carrying a phase, whose squared modulus alone connects to experimental readings. Grasp the distinction between "amplitude" and "squared modulus" and none of the later formulas will seem mysterious.

## 2. Rigorous Definitions

**Wave function and statistical interpretation**: the quantum state of a system is described by a complex-valued function $\Psi(\vec r, t)$. Born's statistical interpretation: the probability of finding the particle at time $t$ in the volume element $dV$ near $\vec r$ is

$$dP = |\Psi(\vec r, t)|^2\, dV$$

$|\Psi|^2$ is called the **probability density**. The total probability over all space being 1 gives the **normalization condition**

$$\int |\Psi(\vec r, t)|^2\, dV = 1$$

An unnormalized wave function differing by a constant factor describes the same physics, and even after normalization it may still differ by a phase factor $e^{i\alpha}$, which likewise affects no observable.

A physically admissible wave function must satisfy the **standard conditions**: single-valued, finite, continuous; at a finite jump of the potential, the wave function and its first derivative must also be continuous (where the potential is infinite only the wave function need be continuous). These conditions are the first sieve translating "physically sensible" into mathematical constraints.

**Time-dependent Schrödinger equation**:

$$i\hbar\frac{\partial \Psi}{\partial t} = \hat H \Psi, \qquad \hat H = -\frac{\hbar^2}{2m}\nabla^2 + V(\vec r, t)$$

It is one of the fundamental postulates of quantum mechanics, on a par with Newton's equation in classical mechanics; it cannot be "derived" from more basic principles, and its correctness is supported by all experiments. The equation is **linear and homogeneous** in $\Psi$, so if $\Psi_1$ and $\Psi_2$ are solutions, so is any linear combination $c_1\Psi_1 + c_2\Psi_2$ — this is the **superposition principle**, the ultimate source of all interference phenomena.

**Stationary states**: when $V$ does not depend explicitly on time one separates variables, $\Psi(\vec r, t) = \psi(\vec r)\, e^{-iEt/\hbar}$, and substitution gives the **stationary Schrödinger equation**

$$-\frac{\hbar^2}{2m}\nabla^2\psi + V(\vec r)\psi = E\psi$$

This is an energy eigenvalue problem: the discrete $E_n$ and the corresponding $\psi_n$ are determined jointly by the equation and the boundary conditions. In a stationary state the probability density $|\psi(\vec r)|^2$ and the probability distributions of all observables **do not change with time** — "stationary" refers to the distribution, not to the particle being at rest.

**Conservation of probability**: the Schrödinger equation directly implies the continuity equation

$$\frac{\partial |\Psi|^2}{\partial t} + \nabla\cdot\vec j = 0, \qquad \vec j = \frac{\hbar}{2mi}\left(\Psi^*\nabla\Psi - \Psi\nabla\Psi^*\right)$$

where $\vec j$ is the probability current density. Probability is neither created nor destroyed out of nothing; this is the local manifestation of the unitarity of the evolution.

## 3. Why We Understand It This Way

**Why the squared modulus rather than the amplitude itself?** Probability must be a nonnegative real number, whereas the wave function is generally complex, so the wave function itself will not do; the squared modulus both guarantees nonnegativity and preserves the phase information. More profoundly: if $\Psi = c_1\Psi_1 + c_2\Psi_2$, then

$$|\Psi|^2 = |c_1\Psi_1|^2 + |c_2\Psi_2|^2 + 2c_1^*c_2\,\Psi_1^*\Psi_2$$

The last **cross term** is the interference term — it is precisely this term that binds "wave" and "probability" together, and dropping it reduces quantum mechanics to classical statistics.

**Why may the wave function be complex?** Because every observable (probability density, probability current, expectation value) is built from moduli and **phase differences**; complex numbers are simply the most economical language for recording amplitude and phase at once. Experiments cannot measure the global phase $e^{i\alpha}$ but can measure relative phases, and these are exactly the source of interference fringes.

**Why does a stationary state still "move"?** The stationary wave function evolves with the phase factor $e^{-iEt/\hbar}$, but $|\Psi|^2$ and all distributions are time-independent. Only by **superposing** stationary states of different energies do terms oscillating in time appear: for example, superposing two stationary states with equal weight makes the probability density oscillate at the beat frequency $\omega = (E_2 - E_1)/\hbar$, which is exactly the frequency of the light emitted in an atomic transition.

**Where does quantization come from?** The Schrödinger equation itself allows continuous $E$, but a bound state must also satisfy boundary conditions (vanishing at infinity, vanishing at the walls of a well). Only a discrete set of $E$ can satisfy both the equation and the boundary conditions — **quantization is a product of "differential equation + boundary conditions"**, not an extra postulate inserted by hand. This is entirely isomorphic to the fact that a string fixed at both ends can only vibrate at discrete harmonics.

**Why does the same prepared state give definite statistics?** Prepare the same quantum state (the same apparatus, the same procedure): a single outcome is unpredictable, but the frequency over many repetitions converges to $|\psi|^2$ — formally the same as the statistical stability of dice, except that quantum probabilities have an interference structure that cannot be reproduced by classical joint probabilities (one of the roots of Bell's inequality). The probability amplitude is therefore "a more fundamental description than probability": first the amplitude, then the probability, and measurement merely "cashes in" the squared modulus of the amplitude.

**In how many dimensions does a wave function "live"?** A single-particle wave function lives in three-dimensional coordinate space, but a two-particle wave function $\Psi(\vec r_1, \vec r_2)$ lives in a six-dimensional configuration space — it is not a "matter wave" in real space. This explains why entanglement between particles cannot be simulated by superposing waves in three-dimensional space: the correlation between the two particles is written into a higher-dimensional structure.

**Is the squared modulus of the wave function the same as "wave intensity"?** For an electromagnetic wave the intensity is proportional to the square of the field strength and can carry energy continuously; for a matter wave $|\psi|^2$ is a probability density, and a single measurement yields only an all-or-nothing result. Similar in form, different in nature: one is an energy distribution, the other a statistical prediction — remember the difference and you will not think of $\psi$ as "a cloud into which the electron has spread".

## 4. Typical Calculations

**Example 1: Normalizing a Gaussian wave packet.** Let $\psi(x) = A e^{-x^2/2a^2}$. From

$$\int_{-\infty}^{+\infty}|\psi|^2 dx = A^2\int_{-\infty}^{+\infty} e^{-x^2/a^2}dx = A^2\, a\sqrt{\pi} = 1$$

we get $A = (\pi a^2)^{-1/4}$. Normalization fixes only the modulus and involves no phase; the verification of the harmonic-oscillator ground state in Chapter 3 (see the accompanying problems) uses the same Gaussian integral.

**Example 2: Oscillation of a superposition of two stationary states.** Take $\Psi = \frac{1}{\sqrt2}\left(\psi_1 e^{-iE_1t/\hbar} + \psi_2 e^{-iE_2t/\hbar}\right)$; then

$$|\Psi|^2 = \frac12\left(\psi_1^2 + \psi_2^2\right) + \psi_1\psi_2\cos\frac{(E_2 - E_1)t}{\hbar}$$

The cross term oscillates as a cosine with period $T = 2\pi\hbar/(E_2 - E_1)$; this is the quantum "beat".

**Example 3: Probability current of a plane wave.** For $\Psi = \dfrac{1}{\sqrt{2\pi\hbar}}e^{i(px - Et)/\hbar}$, substituting into the formula for $\vec j$ gives $j = \dfrac{p}{m}|\Psi|^2 = v|\Psi|^2$, consistent with the intuition that "probability is transported at speed $v$"; in scattering problems this is exactly what is used to define the transmission coefficient as a ratio of currents.

**Example 4: Deciding whether a wave function is admissible.** The function $\psi(x) = e^{-|x|}$ is continuous at $x = 0$ but its derivative is not; unless the potential has an infinite jump, it is not a legitimate stationary wave function. Conversely, at the wall of an infinite well the wave function need only be continuous and its derivative may jump — the standard conditions must be applied in accordance with the shape of the potential.

## 5. Common Misconceptions

**Misconception 1: taking the wave function for a probability.** $\psi$ is a probability amplitude, which may be complex, negative and phase-carrying; only $|\psi|^2$ is a probability density. Confusing the two discards all interference phenomena and cannot explain why the superposition of probabilities is not conserved (what is superposed is the amplitude, not the probability).

**Misconception 2: believing the normalization constant is unique.** After normalization one may still multiply by an arbitrary phase $e^{i\alpha}$; in three dimensions the constant also carries dimensions, and its value is fixed by the potential and the boundary conditions together.

**Misconception 3: reading "stationary state" as "the particle is at rest".** A stationary state only means the probability distribution does not change with time; the kinetic energy may still be large (the ground state of a well has zero-point energy, see Chapter 3).

**Misconception 4: thinking that in a superposition the particle is "in both states at once".** Before measurement it is meaningless to ask "which state it is in"; measurement yields some outcome with a certain probability and "projects" the state onto the corresponding eigenstate (collapse). Superposition is a superposition of amplitudes, not a classical "either this or that".

**Misconception 5: trying to "derive" the Schrödinger equation.** An analogy with the wave equation can only give hints; it is a fundamental postulate of the same status as Newton's equation, and the test is experiment, not logical deduction. When learning it, remember the key difference from the heat equation: the time derivative is first order, and therefore the wave function is complex.

**Misconception 6: taking the "size" of $|\psi|^2$ for "the number of particles".** For a single-particle system $|\psi|^2$ is the probability density of a single measurement, not "the mass density of a particle cloud"; drawing the electron as a charged cloud is only a convenient picture, while each detection still receives one whole electron. Only in the sense of multi-particle occupation numbers (as in the electron gas of a metal) does the "cloud" acquire the interpretation of an "average number distribution"; and multi-particle systems, after exchange symmetrization, exhibit correlation structures that make the single-particle cloud picture even less applicable.

## 6. Extensions and Synthesis

**Many particles and indistinguishability**: an $N$-particle wave function $\Psi(\vec r_1, \cdots, \vec r_N)$ lives in a higher-dimensional configuration space; identical particles also require definite symmetry under exchange, which leads directly to the boson/fermion distinction of Chapter 7. The one-dimensional two-particle symmetrization exercises will be developed gradually after the accompanying problems of this chapter.

**Measurement and interpretation**: Born's rule answers "what is the probability", but "why measurement causes collapse" is still debated: the Copenhagen interpretation takes collapse as an axiom, the many-worlds interpretation denies collapse, and decoherence theory explains how the interference terms "seem to disappear" through entanglement with the environment. These discussions do not change the calculational rules, but they shape our attitude toward whether the wave function represents reality or knowledge.

**Awareness of applications**: the probability current defines tunnelling rates and scattering cross sections; superpositions of stationary states are the common mechanism of quantum oscillations, atomic clocks (hyperfine level splittings) and laser coherence. When studying later chapters keep one main thread in mind: **first solve the eigenvalue problem to obtain $\psi_n$ and $E_n$, then assemble arbitrary states with the superposition principle** — the wells and oscillators of Chapter 3 and the representation expansions of Chapter 4 are all concretizations of this thread.

## 7. Worked Examples

**Example 5: Probability current of a superposition of two stationary states.** Take real wave functions $\psi_1, \psi_2$ (e.g. two eigenstates of a well) forming $\Psi = \frac{1}{\sqrt2}\left(\psi_1 e^{-iE_1t/\hbar} + \psi_2 e^{-iE_2t/\hbar}\right)$. Substituting into the probability current formula and using the reality of $\psi_1, \psi_2$ to simplify gives

$$j(x, t) = \frac{\hbar}{2m}\sin\frac{(E_2 - E_1)t}{\hbar}\left(\psi_2\psi_1' - \psi_1\psi_2'\right)$$

$j$ oscillates at the beat frequency: probability is "carried back and forth" between different parts of the system, which is the microscopic mechanism of wave-packet oscillation (tunnelling oscillations in a symmetric double well and the inversion oscillation of the ammonia molecule are both of this kind); while for a single stationary state $j$ vanishes identically — "flow" belongs only to superpositions.

**Example 6: Quantum reflection at a potential step.** A particle of energy $E > V_0$ is incident from the left on the step $V = V_0\ (x > 0)$. Let the wave numbers on the two sides be $k = \sqrt{2mE}/\hbar$ and $k' = \sqrt{2m(E - V_0)}/\hbar$, with wave function $\psi = e^{ikx} + r e^{-ikx}\ (x < 0)$ and $\psi = t e^{ik'x}\ (x > 0)$. Matching $\psi$ and $\psi'$ at $x = 0$ gives $1 + r = t$ and $k(1 - r) = k't$, so $r = \dfrac{k - k'}{k + k'}$ and the reflection coefficient is

$$R = \left(\frac{k - k'}{k + k'}\right)^2$$

Even when the energy is enough to "climb the step", a quantum particle is partly reflected — a purely wave-mechanical effect with no classical counterpart; as $E \to V_0$ we have $k' \to 0$ and $R \to 1$, almost total reflection. Conservation of probability current (the language of $j$ in Example 5) guarantees $R + T = 1$: reflection and transmission trade off against each other.`,
    keyPoints: [
      'ψ is a probability amplitude; |ψ|² is the probability density, and interference comes from the cross term in the superposition',
      'The Schrödinger equation is a fundamental postulate; its linearity guarantees the superposition principle',
      'A stationary state is an energy eigenstate: the probability distribution does not change with time, only the phase evolves',
      'Quantization arises from "differential equation + boundary conditions", not from an extra postulate',
      'Conservation of probability (the continuity equation) expresses the unitarity of the evolution',
    ],
  },

  'qm-operators': {
    chapter: 'Chapter 2 Operators and Observables',
    title: 'Hermitian Operators and Eigenvalue Problems',
    summary:
      'Observables are represented by Hermitian operators and the eigenvalues are the measurement outcomes; commutation relations quantify whether two observables can be determined simultaneously and lead directly to the criterion for conserved quantities.',
    content: String.raw`

In classical mechanics a physical quantity is just a number: position is a vector, energy a real number, and measurement is merely "reading it off". In quantum mechanics the state is described by a wave function, yet measurement yields a **number** — there must be a bridge from "function" to "number". That bridge is the **operator**: every observable (position, momentum, energy, angular momentum, ...) corresponds to a linear operator acting on wave functions; the possible outcomes of a measurement are the **eigenvalues** of that operator; the probability of obtaining a given value is given by the expansion coefficients of the state in the eigenfunctions. Why Hermitian operators in particular? Because that guarantees real eigenvalues (measurement outcomes must be real) and eigenfunctions forming a complete orthogonal basis (so that the probabilities sum to 1). Further, whether two operators commute decides whether the two observables can be measured precisely at the same time: the commutator is the precise language of "uncertainty" in the quantum world and the key to identifying conserved quantities. It is fair to say that this chapter upgrades quantum mechanics from "one wave equation" to an axiomatic system about **linear algebra and measurement**, and the later chapters are merely applications of this language.

Beginners often ask: what "is" an operator? The plainest answer is "an operation on a wave function": $\hat p$ turns $\psi$ into its derivative (times $-i\hbar$), $\hat x$ multiplies $\psi$ by $x$. The operation itself may be complicated, but two disciplines must not be violated: **linearity** (to preserve superposition) and **Hermiticity** (to guarantee real outcomes and conservation of probability). Everything in this chapter — eigenvalues, commutators, uncertainty relations, conserved quantities — is a logical consequence of these two disciplines.

**What are the rules of commutator algebra?** It satisfies linearity and the Leibniz rule $[\hat A, \hat B\hat C] = [\hat A, \hat B]\hat C + \hat B[\hat A, \hat C]$, and obeys the Jacobi identity $[[\hat A,\hat B],\hat C] + [[\hat B,\hat C],\hat A] + [[\hat C,\hat A],\hat B] = 0$. There are only a few rules, yet their power runs through the whole book: the algebraic solutions of the oscillator and of angular momentum are repeated uses of exactly these rules. Operator algebra is a "multiplication game with an ordering constraint", and the best way in is to compute a few examples by hand.

## 2. Rigorous Definitions

**Operators and expectation values**: an observable $A$ is represented by a linear Hermitian operator $\hat A$. For a system in the normalized state $\psi$, the expectation value of $A$ is

$$\langle A\rangle = \int \psi^* \hat A \psi\, dV$$

It equals the average of many measurements on the same prepared state, not a prediction for a single measurement.

**Hermitian operator**: for all states $\psi,\varphi$,

$$\int \varphi^* \hat A\psi\, dV = \int (\hat A\varphi)^* \psi\, dV \qquad (\hat A^\dagger = \hat A)$$

Three important properties: all eigenvalues are real; eigenfunctions belonging to different eigenvalues are mutually orthogonal; the eigenfunctions form a complete basis, so any state can be expanded as

$$\psi = \sum_n c_n \psi_n, \qquad c_n = \langle \psi_n | \psi\rangle, \qquad |c_n|^2 = \text{probability of measuring } A_n$$

For a continuous spectrum the sum becomes an integral and $|c(\lambda)|^2 d\lambda$ is the probability that the measured value lies in $[\lambda, \lambda + d\lambda]$; completeness guarantees the normalization $\sum_n |c_n|^2 = 1$. Hermiticity, real eigenvalues and normalized probabilities are interlocking links, none of which can be missing.

**Basic commutation and uncertainty relations**: position and momentum satisfy

$$[\hat x, \hat p_x] = \hat x\hat p_x - \hat p_x\hat x = i\hbar$$

For any two Hermitian operators,

$$\Delta A\, \Delta B \ge \frac{1}{2}\left|\langle [\hat A, \hat B]\rangle\right|, \qquad \Delta A = \sqrt{\langle A^2\rangle - \langle A\rangle^2}$$

In particular $\Delta x\,\Delta p \ge \hbar/2$; for angular momentum $[\hat L_i, \hat L_j] = i\hbar\varepsilon_{ijk}\hat L_k$, whence $\Delta L_x\,\Delta L_y \ge \frac{\hbar}{2}|\langle L_z\rangle|$.

**Conserved quantities**: the expectation value evolves as

$$\frac{d\langle A\rangle}{dt} = \left\langle\frac{\partial \hat A}{\partial t}\right\rangle + \frac{i}{\hbar}\langle[\hat H, \hat A]\rangle$$

If $\hat A$ does not depend explicitly on time and $[\hat A, \hat H] = 0$, then $\langle A\rangle$ does not change with time, and the probability distribution of measurements of $A$ does not change either — $\hat A$ is a **conserved quantity**. For example, in a central force field $\hat L^2$ and $\hat L_z$ both commute with $\hat H$ and are conserved; when $\hat H$ does not depend explicitly on $t$ the energy itself is always conserved.

**Ehrenfest's theorem**: $\dfrac{d\langle x\rangle}{dt} = \dfrac{\langle p\rangle}{m}$, $\dfrac{d\langle p\rangle}{dt} = -\langle V'(x)\rangle$ — the expectation values "approximately" obey Newton's equation, the germ of the classical limit.

## 3. Why We Understand It This Way

**Why must measurement outcomes come from the eigenvalue spectrum?** Repeated measurement of the same system (ideal non-destructive measurement) must give a stable, repeatable result, and "repeatable" means the system lands on some invariant structure — an eigenstate is exactly a state in which "measuring $\hat A$ must give $A_n$". Hermiticity guarantees that these values are real and the probabilities normalized, so "outcome = eigenvalue" and "probability = squared modulus of the coefficient" form a self-consistent closed system.

**Why do commuting operators have common eigenstates?** A theorem of linear algebra: two Hermitian operators commute ⇔ there is a common complete set of eigenfunctions. Physically, $[\hat A,\hat B]=0$ means "measuring A then B" is independent of the order, and the two quantities can have definite values simultaneously; conversely (as with $x$ and $p$), any attempt to compress the fluctuation of one widens the other.

**Is the uncertainty relation a "technical limitation"?** No. It has nothing to do with instrument precision but is an intrinsic property of objects such as wave functions: squeezing a state in coordinate space (small $\Delta x$) necessarily broadens its Fourier width (large $\Delta p$). A Gaussian wave packet (such as the oscillator ground state, see the accompanying problems) makes the inequality an equality, showing that $\hbar/2$ is a hard lower bound and not an empirical estimate.

**Why are conserved quantities "conserved"?** When $[\hat A,\hat H]=0$ the evolution operator $e^{-i\hat Ht/\hbar}$ commutes with $\hat A$, so any probability distribution "freezes" in the eigenbasis of $\hat A$. This agrees with the spirit of Noether's theorem, "symmetry ⇒ conserved quantity": time-translation symmetry ⇒ energy conservation, rotational symmetry ⇒ angular momentum conservation, spatial-translation symmetry ⇒ momentum conservation.

**Why does the expectation formula $\langle A\rangle = \int\psi^*\hat A\psi\, dV$ look like that?** Expand the state in the eigenbasis of $\hat A$: $\langle A\rangle = \sum_n |c_n|^2 A_n$, exactly the average of "probability × value"; and $\int\psi^*\hat A\psi$ is identically equal to it (thanks to completeness). One faces measurement, the other computation; two roads to the same place.

**Why does $\hat H$ have a special status?** It both generates time evolution ($e^{-i\hat Ht/\hbar}$) and labels the stationary energies by its eigenvalues; the eigenbasis of $\hat H$ is therefore the most commonly used "working representation". Any operator commuting with $\hat H$ does not change with time in this basis — the criterion for conserved quantities in this chapter and the matrix mechanics of Chapter 4 meet here.

**What does $\Delta A = 0$ mean?** The state is an eigenstate of $\hat A$, so measuring $A$ must give a definite value; the conjugate quantity, which does not commute with $\hat A$, is then pushed to maximal fluctuation, its distribution completely spread out. "Definite value" and "completely indefinite" always appear in pairs, which is the other face of the uncertainty relation. For example, a one-dimensional Gaussian minimum-uncertainty state presses $\Delta x$ to its minimum and $\Delta p$ immediately reaches the corresponding lower bound — both sides are "maxed out" at once.

## 4. Typical Calculations

**Example 1: Verify that $\hat p = -i\hbar\, d/dx$ is Hermitian.** Integrate by parts:

$$\int \varphi^* \left(-i\hbar \frac{d\psi}{dx}\right) dx = -i\hbar\left[\varphi^*\psi\right]_{-\infty}^{+\infty} + \int \left(-i\hbar\frac{d\varphi}{dx}\right)^* \psi\, dx$$

The boundary term vanishes because the wave functions are integrable, and what remains is exactly the Hermiticity definition.

**Example 2: The basic commutator.** For any $\psi$: $[\hat x, \hat p]\psi = x(-i\hbar\psi') - (-i\hbar(x\psi)') = -i\hbar x\psi' + i\hbar\psi + i\hbar x\psi' = i\hbar\psi$, so $[\hat x, \hat p] = i\hbar$. This is the cornerstone of all quantum algebra.

**Example 3: Uncertainty of a truncated state in a well.** In an infinite well take $\psi = \sqrt{30/a^5}\,x(a - x)$; by symmetry $\langle x\rangle = a/2$ and $\langle p\rangle = 0$; integrating gives $\langle x^2\rangle = \frac{2a^2}{7}$ and $\langle p^2\rangle = \frac{10\hbar^2}{a^2}$, so $\Delta x = \frac{a}{2\sqrt7}$ and $\Delta p = \frac{\sqrt{10}\,\hbar}{a}$,

$$\Delta x\,\Delta p = \sqrt{\frac{5}{14}}\,\hbar \approx 0.60\,\hbar > \frac{\hbar}{2}$$

consistent with the uncertainty relation, and not an equality — this state is not a Gaussian minimum-uncertainty state.

**Example 4: Identifying conserved quantities.** For a free particle $[\hat H, \hat p] = 0$, so momentum is conserved; placing it in an external field $V(x)$ gives $[\hat H, \hat p] = i\hbar V'(x) \neq 0$ and momentum is no longer conserved. Conservation is decided entirely by symmetry, independently of the detailed form of the wave function.

**Example 5: The parity operator.** $\hat P\psi(x) = \psi(-x)$; $\hat P^2 = 1$ and $\hat P$ is Hermitian, with eigenvalues $\pm 1$ (even/odd parity). In a symmetric potential $V(x) = V(-x)$, $[\hat P, \hat H] = 0$ and parity is conserved: stationary states may be taken as even or odd functions, and the spectrum is therefore "layered" (in the oscillator, even $n$ has even parity and odd $n$ odd parity). Parity is one of the simplest conserved quantities and a sharp tool for quick simplification.

## 5. Common Misconceptions

**Misconception 1: thinking operators can be freely reordered.** In quantum mechanics order matters: when $[\hat A,\hat B]\ne 0$, $\hat A\hat B$ and $\hat B\hat A$ are different operators; ask about the commutator before simplifying a product.

**Misconception 2: taking a Hermitian operator for a "real matrix".** Hermiticity is the geometric property $\hat A^\dagger = \hat A$ and is independent of the representation; only after choosing an orthonormal basis does it appear as a self-adjoint matrix. In another representation the matrix elements need not be real, but the eigenvalues are always real.

**Misconception 3: taking $\Delta A$ for the error of a single measurement.** $\Delta A$ is the statistical fluctuation (standard deviation) of many measurements on the same prepared state; it is neither instrument inaccuracy nor "a deviation in every measurement".

**Misconception 4: thinking a conserved quantity must have a definite value.** Conservation only guarantees that the **probability distribution** does not change with time; only when the initial state is an eigenstate of $\hat A$ does $A$ always take a definite value. For example, in a spherically symmetric potential $L_z$ is conserved, yet in the state $|l, m=0\rangle$, $L_z$ is 0 while $L_x$ fluctuates.

**Misconception 5: using $|c_n|$ rather than $|c_n|^2$ for the probability.** The probability is the squared modulus; and the expansion coefficients must be normalized, otherwise a factor $\sum|c_n|^2$ must be supplied.

**Misconception 6: saying "cannot be determined simultaneously" means "measuring one disturbs the other".** The disturbance picture is intuitive only in some cases; the essence is that **the state simply has no simultaneously definite values of $A$ and $B$ to be disturbed** — the commutator describes the structure of state space, not the interaction between apparatus and particle. EPR-type correlation experiments (measuring on the two particles separately) also obey the uncertainty relation, further ruling out the "disturbance" explanation.

**Misconception 7: thinking any product of operators is a legitimate observable.** A function $f(\hat A)$ of a single operator (such as $\hat A^2$) is a legitimate observable; but the product $\hat A\hat B$ of two different operators is Hermitian if and only if $[\hat A, \hat B] = 0$, and with a different order of multiplication it is not even the same operator — check Hermiticity before writing a product, and do not take $\hat A\hat B$ for an observable outright.

## 6. Extensions and Synthesis

**Reconstructing quantum mechanics from commutation relations**: Dirac pointed out that quantization amounts to replacing the classical Poisson bracket by $\frac{1}{i\hbar}$ times the commutator. The ladder-operator algebra of the oscillator (see the accompanying problems; it solves the whole spectrum using only $[a,a^\dagger]=1$) and the $L_\pm$ algebra of angular momentum in Chapter 5 are examples of "obtaining the whole spectrum from commutation relations alone" — the commutation relations are more fundamental than the differential equation.

**Completeness and entanglement**: extending the idea of a complete basis to many-particle systems yields tensor-product spaces and entangled states: states that cannot be written as a product of single-particle states (such as certain combinations of $\frac{1}{\sqrt2}(\psi_a(1)\psi_b(2) + \psi_b(1)\psi_a(2))$) contain non-classical correlations between particles — the starting point of Chapter 7 and of quantum information.

**Operators, representations and matrices**: the "Hermitian operators" of this chapter acquire a matrix embodiment in Chapter 4 — choose a basis and an operator becomes a (generally infinite-dimensional) Hermitian matrix, and the energy eigenvalue problem becomes matrix diagonalization. After studying Chapter 4, look back at the examples of this chapter to appreciate the precise meaning of "wave mechanics and matrix mechanics are two ways of writing the same theory".

Finally, a study tip: for every new system, ask three questions — what are its conserved quantities? which operators commute and can be determined simultaneously? what special properties does its ground state have (zero-point energy, parity, degeneracy)? These three connect to symmetry, measurement and ground-state energy respectively, and once asked, you have most of the system's "personality".

## 7. Worked Examples

**Example 5: An algebraic proof that $[\hat L^2, \hat L_z] = 0$.** From $\hat L^2 = \hat L_x^2 + \hat L_y^2 + \hat L_z^2$ and the basic commutation relations $[\hat L_i, \hat L_j] = i\hbar\varepsilon_{ijk}\hat L_k$:

$$[\hat L^2, \hat L_z] = \sum_i \left(\hat L_i[\hat L_i, \hat L_z] + [\hat L_i, \hat L_z]\hat L_i\right) = i\hbar\sum_{i,k}\varepsilon_{izk}\left(\hat L_i\hat L_k + \hat L_k\hat L_i\right)$$

In the sum over $i, k$ the symbol $\varepsilon_{izk}$ is antisymmetric under $i \leftrightarrow k$ while $\hat L_i\hat L_k + \hat L_k\hat L_i$ is symmetric, so the terms cancel pairwise and the commutator is zero. Hence $\hat L^2$ and $\hat L_z$ have a common system of eigenfunctions (the $Y_l^m$ of Chapter 5) — "whether the two can be determined simultaneously" is decided entirely at the algebraic level, without writing down any differential equation.

**Example 6: What exactly does a conserved quantity "freeze"?** An oscillator is in the state $\psi = \frac{1}{\sqrt2}\left(|0\rangle + |1\rangle\right)$. On the one hand, $\hat H$ does not depend explicitly on $t$, so energy is conserved: the expansion coefficients only acquire phases, $c_n(t) = c_n(0)\, e^{-iE_nt/\hbar}$, and the probabilities of measuring $E_0$ or $E_1$ are forever $1/2$ each. On the other hand, $\langle x\rangle = \sqrt{\hbar/2m\omega}\,\cos\omega t$ oscillates with time and the shape of the wave function clearly changes. The comparison reveals the precise meaning of "conservation": the **probability distribution of measurements** of a conserved quantity does not change with time, but the state does; which quantities are conserved is decided by whether $[\hat A, \hat H]$ vanishes. This example also previews the language of Chapter 6: in any system without explicit time dependence, evolution in the energy representation is merely "each coefficient turning a phase". Incidentally, if the initial state is already an eigenstate of $\hat H$ (a stationary state), even $\langle x\rangle$ does not oscillate — the difference between "moving" and "not moving" is decided entirely by how the initial state is expanded in the energy eigenbasis.`,
    keyPoints: [
      'Observables are Hermitian operators: real eigenvalues, complete orthogonal eigenfunctions',
      'Measurement probability = squared modulus of the expansion coefficient in the eigenbasis',
      'A nonzero commutator ⇒ no simultaneous determination: ΔA·ΔB ≥ ½|⟨[Â,B̂]⟩|',
      '[x̂,p̂] = iħ is the core of quantization; from it the whole oscillator spectrum follows algebraically',
      'Â independent of time with [Â,Ĥ] = 0 ⇔ Â is a conserved quantity',
      'Expectation values evolve by Ehrenfest\'s theorem and correspond to the classical equations of motion',
    ],
  },

  '1d-potentials': {
    chapter: 'Chapter 3 One-Dimensional Stationary Problems',
    title: 'Potential Wells, the Harmonic Oscillator and Tunnelling',
    summary:
      'The infinite well, the harmonic oscillator and the square barrier are three exactly solvable "standard models": standing waves fixing the levels, an equally spaced oscillator spectrum, and exponentially sensitive tunnelling — the three hallmarks of the quantum world.',
    content: String.raw`

The potential fields quantum mechanics can really **solve exactly** are few, and one-dimensional problems account for most of them: the infinite well teaches you "quantization", the harmonic oscillator teaches "equally spaced levels and zero-point energy", the square barrier teaches "tunnelling". Together they cover almost every key feature of the quantum world: discrete spectra, wave-function nodes, exponential tails in the classically forbidden region, and transition probabilities that vary exponentially with a parameter. Better still, many seemingly complicated three-dimensional problems reduce to one-dimensional models: separating variables in a central force field leaves an "effective one-dimensional radial equation" with a centrifugal potential, the vibration of a diatomic molecule is a harmonic oscillator, and the current of a scanning tunnelling microscope is a tunnelling current. Grinding through these three models is therefore the best-value investment in learning quantum mechanics; the solving routine of this chapter — write the general solution, apply the boundary conditions, count the nodes, normalize — will also run through the whole book.

Putting the three models side by side has a methodological meaning too: **the same Schrödinger equation with different $V(x)$ produces completely different spectral structures** — a direct lesson that "the potential shapes the levels". Faced with any new system, the first reaction should be "what does its $V$ look like, what are the boundary conditions", not a rush to plug into formulas. Different potentials give very different "personalities": well levels spread out like overtones, oscillator levels are evenly spaced like a musical scale, and a barrier simply "lets most of the probability go". Remembering these "personalities" is more useful than memorizing formulas.

## 2. Rigorous Definitions

**Bound and scattering states**: when $E$ is below the potential at infinity the wave function decays at infinity and the levels are discrete — a bound state; when $E$ is above it the wave function oscillates at infinity and the energy is continuous — a scattering state. One-dimensional bound states are **non-degenerate** (provable with the Wronskian): two bound states of the same energy can only differ by a constant factor.

**Infinite square well**: $V(x) = 0\ (0 < x < a)$ and $V = \infty$ outside. Inside, the stationary equation is $-\frac{\hbar^2}{2m}\psi'' = E\psi$ with general solution $\psi = A\sin kx + B\cos kx$, and the boundary conditions $\psi(0) = \psi(a) = 0$ force

$$k = \frac{n\pi}{a}, \qquad E_n = \frac{n^2\pi^2\hbar^2}{2ma^2}, \qquad \psi_n(x) = \sqrt{\frac{2}{a}}\sin\frac{n\pi x}{a} \quad (n = 1, 2, \ldots)$$

The energies are $\propto n^2$: the higher the level, the larger the spacing; the ground-state energy $E_1 \neq 0$ is the **zero-point energy**. The wave functions are standing waves fixed at both ends; the $n$-th state has $n - 1$ interior nodes, and wave functions of adjacent levels are orthogonal.

**Linear harmonic oscillator**: $V = \frac12 m\omega^2 x^2$, with stationary equation

$$-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + \frac12 m\omega^2 x^2\psi = E\psi$$

Requiring the wave function to converge as $|x| \to \infty$ gives the discrete spectrum

$$E_n = \left(n + \frac12\right)\hbar\omega, \qquad \psi_n \propto H_n(\xi)\, e^{-\xi^2/2}, \qquad \xi = \sqrt{\frac{m\omega}{\hbar}}\, x$$

where $H_n$ are Hermite polynomials and $n = 0, 1, 2, \ldots$. The levels are **equally spaced** by $\hbar\omega$, which is exactly the basis of Planck's black-body hypothesis; the zero-point energy $E_0 = \hbar\omega/2$ is consistent with the uncertainty relation.

**Square barrier and tunnelling**: a particle of energy $E < V_0$ is incident on a barrier of width $a$. In the classically forbidden region $0 < x < a$ the wave function is $\propto e^{-\kappa x}$ with

$$\kappa = \frac{\sqrt{2m(V_0 - E)}}{\hbar}$$

The probability of crossing is given by the transmission coefficient; roughly,

$$T \approx e^{-2\kappa a}$$

(the exact expression is $T = \left[1 + \dfrac{V_0^2\sinh^2\kappa a}{4E(V_0 - E)}\right]^{-1}$, which reduces to the exponential form for a high, wide barrier). $T$ is **exponentially sensitive** to $\kappa a$: a slightly higher or thicker barrier makes the probability drop by orders of magnitude.

## 3. Why We Understand It This Way

**Quantization = the standing-wave condition.** A bound wave is "locked" between two walls and must be self-consistent on each round trip: the accumulated phase must be an integer multiple of $\pi$, otherwise it interferes destructively with itself. In a well, the phase for one round trip, $2ka$, must be an integer multiple of $2\pi$, i.e. $k = n\pi/a$. This is entirely isomorphic to a string fixed at both ends, which can only vibrate at discrete harmonics — quantization is not an imposed "axiom" but the natural result of **a wave forming a standing wave under boundary conditions**.

**Where does the zero-point energy come from?** If $E = 0$ the particle would sit completely at rest at the bottom of the well (or at the oscillator's equilibrium point) with a definite position, so $\Delta x = 0$ and $\Delta p = 0$, violating the uncertainty relation. Confining the particle to a width $a$ makes the momentum fluctuation at least of order $\hbar/a$ and the kinetic energy at least of order $\hbar^2/ma^2$ — exactly the origin of $E_1 = \pi^2\hbar^2/2ma^2$: **the tighter the confinement, the higher the zero-point energy**. Liquid helium does not solidify even at absolute zero under ordinary pressure because zero-point motion overcomes the van der Waals binding.

**The physics of the node rule.** At a node the probability density is zero, which cuts space into segments each "imprisoning" a piece of the waveform; each extra node forces the wave to bend more sharply and raises the kinetic energy. So energy is ordered by the number of nodes: no nodes is the ground state, one node the first excited state, and so on — one glance at the wave function tells you which state it is.

**Why is tunnelling possible?** In the classically forbidden region the wave function does not drop to zero immediately but decays exponentially; if the barrier is thin enough the decay is incomplete, the tail "pokes through" to the other side and continues with a small amplitude. The tunnelling probability $e^{-2\kappa a}$ is exponentially sensitive to $a$ and to $\sqrt{V_0 - E}$: $\alpha$-decay lifetimes range from microseconds to tens of billions of years merely because the width of the Coulomb barrier differs slightly.

**Why are one-dimensional problems often "easy"?** The one-dimensional stationary equation is a second-order linear ODE, and the behaviour of its solutions is completely determined by the two initial data (the wave function and its derivative); together with the two hard constraints "finite everywhere" and "bound states must converge", solvability is greatly enhanced. Numerically this is the "shooting method": guess an $E$, integrate from one end to the other, and whether the wave function diverges tells you at once whether $E$ is too high or too low — reverse the direction of divergence and the energy converges in the right direction.

**Why is the harmonic oscillator ubiquitous?** Near the minimum of any smooth potential one can expand $V = V_0 + \frac{1}{2}V''x^2 + \cdots$, and for small amplitudes the higher-order terms are negligible — the harmonic oscillator is "the universal approximation to any stable equilibrium": molecular vibrations, lattice vibrations (phonons) and the modes of the electromagnetic field (photons) all start from it; Chapter 6 then uses perturbation theory to treat anharmonic corrections such as $\lambda x^3$ and $\lambda x^4$.

## 4. Typical Calculations

**Example 1: Averages in the ground state of a well.** $\langle x\rangle = \frac{2}{a}\int_0^a x\sin^2\frac{\pi x}{a}dx = \frac{a}{2}$ (by symmetry); $\langle x^2\rangle = a^2\left(\frac13 - \frac{1}{2\pi^2}\right) \approx 0.283\,a^2$. From $E_1 = \langle p^2\rangle/2m$ we get $\Delta p = \pi\hbar/a$, and one verifies $\Delta x\,\Delta p \approx 0.568\,\hbar > \hbar/2$, again consistent with the uncertainty relation.

**Example 2: Photons of a level transition.** For an electron in a well of $a = 1$ nm, $E_1 \approx 0.376$ eV (see the accompanying problems), so the $n = 2 \to 1$ transition has photon energy $3E_1 \approx 1.13$ eV and wavelength $\lambda = hc/\Delta E \approx 1100$ nm (near infrared) — the level structure maps directly onto a measurable spectrum.

**Example 3: Estimating tunnelling.** An electron meets a barrier 1 eV above its energy with width $a = 0.1$ nm: $\kappa = \sqrt{2m\Delta E}/\hbar \approx 5.1\times10^9\ \text{m}^{-1}$, so $2\kappa a \approx 1.0$ and $T \sim e^{-1} \approx 0.37$; the barrier is almost "transparent". If $a = 1$ nm then $T \sim e^{-10} \approx 4\times10^{-5}$ — a tenfold increase in thickness drops the probability by nearly four orders of magnitude, and the atomic resolution of the STM comes precisely from this exponential sensitivity.

**Example 4: The classical limit of the oscillator.** As $n \to \infty$ the oscillations of $|\psi_n|^2$ become dense near $\pm x_{\max}$ and the envelope tends to the classical probability distribution $\rho(x) = \frac{1}{\pi\sqrt{x_{\max}^2 - x^2}}$ (largest at the two ends, smallest at the centre) — for large quantum numbers the quantum distribution smoothly returns to the classical one, a textbook case of the correspondence principle.

**Example 5: Inferring model parameters from a level ratio.** The two lowest transmission resonances of a nanostructure are measured to have energy ratio $E_2 : E_1 = 4 : 1$ — the signature of an ideal infinite well ($E_n \propto n^2$), so the well may be judged approximately "infinitely deep" and the effective width $a$ fixed by $E_1 = \pi^2\hbar^2/2ma^2$; if the ratio deviates from 4, the deviation carries information about the well depth and barrier height. The level ratio is the first diagnostic of "whether the model applies".

## 5. Common Misconceptions

**Misconception 1: taking the well levels to be equally spaced.** $E_n \propto n^2$ and the spacing increases; it is the **harmonic oscillator** that is equally spaced. Do not confuse the two; the anchors are "standing-wave overtones" and "spring oscillator".

**Misconception 2: thinking "the wave function vanishes at the wall = the particle cannot touch the wall".** Zero probability density at the wall is only the expression of the boundary condition; in barrier tunnelling the wave function must precisely "reach into" the classically forbidden region. In a finite well the wave function also leaks outside the well, which underlies surface states and weak intermolecular interactions.

**Misconception 3: misremembering where $n$ starts.** For a well $n = 1, 2, \ldots$ ($n = 0$ gives the trivial zero solution); for the oscillator $n = 0, 1, 2, \ldots$ ($n = 0$ has a nonzero ground state). The energy formulas therefore differ by a shift of the starting point.

**Misconception 4: looking for degeneracy in one-dimensional bound states.** One-dimensional bound states are non-degenerate; degeneracy is a product of two or more dimensions (or of spin degrees of freedom). If you find "two states of the same energy in one dimension", you have probably miscalculated.

**Misconception 5: applying the classical "climbing over an obstacle" picture to tunnelling.** For $E < V_0$ the particle does not "climb halfway and slide back", nor is there a "time taken to cross the obstacle"; tunnelling is a global effect of the wave function penetrating the barrier and $T$ can only be computed from the wave equation.

**Misconception 8: trying to "extract and use" the zero-point energy.** The ground state is already the lowest stationary state; there is no lower state to release energy into. Zero-point energy can only be reduced, and work done, by changing the confinement (widening the well, lowering the frequency); the Casimir effect discusses exactly the energy difference produced by "changing the vacuum state". Similarly, the "lowest" of the ground state is relative to the current Hamiltonian: once the external parameters change, the system relaxes to the new ground state and releases the energy difference.

**Misconception 6: taking the transmission coefficient as "a measure of the time spent crossing the barrier".** Tunnelling has a probability and a rate, but "how long the particle spent inside the barrier" has no unique definition (the Hartmann effect: thickening the barrier leaves the transmission time almost unchanged). When discussing tunnelling, sticking to the language of probability and probability current is safest.

**Misconception 7: transplanting one-dimensional conclusions to three dimensions.** In one dimension any attractive potential, however shallow, has a bound state; in three dimensions there is a critical depth — below it there is **no** bound state. Dimension changes the existence and degeneracy structure of bound states, so cross-dimensional transplants need care.

## 6. Extensions and Synthesis

**From one dimension to three.** In a central force field $V(r)$, separating variables as $\psi = R(r)Y_l^m(\theta, \varphi)$ gives a radial equation that is exactly "a one-dimensional problem with the centrifugal potential $\frac{\hbar^2 l(l+1)}{2mr^2}$"; the hydrogen energy levels, the number of radial nodes and the orbital quantum numbers all arise from this technique, as do the three-dimensional square well and the spherical oscillator.

**Periodic potentials and bands.** Infinitely many wells in a row form a periodic potential (the Kronig–Penney model); the discrete levels broaden into **bands** separated by gaps — the quantum foundation of the conductivity of solids, with the single well as its unit cell.

**Tunnelling in the real world.** The scanning tunnelling microscope (STM) images atoms using the exponential sensitivity of the tunnelling current to distance; writing and erasing a flash memory is electrons tunnelling into and out of a floating gate; hydrogen fusion in the solar core relies on protons penetrating the Coulomb barrier; in a Josephson junction the superconducting Cooper pairs tunnel as a whole. The one-dimensional square barrier is a toy model, but its exponential law is the common soul of these technologies. It is worth linking the exact solutions of this chapter (well, oscillator) with the perturbative treatment of Chapter 6 ("almost solvable" potentials) into a complete toolbox: first the standard models, then approximate corrections, and only then numerical methods.

## 7. Worked Examples

**Example 5: The level equation of a finite square well.** Well depth $V_0$, width $a$. Using parity: the even-parity solution is $\psi = A\cos kx$ inside and $\psi = B\, e^{-\kappa(|x| - a/2)}$ outside, with $k = \sqrt{2mE}/\hbar$ and $\kappa = \sqrt{2m(V_0 - E)}/\hbar$. Matching the wave function and its first derivative at $x = a/2$:

$$k\tan\frac{ka}{2} = \kappa \qquad (\text{even parity; odd parity gives } -k\cot\tfrac{ka}{2} = \kappa)$$

This is a transcendental equation for $E$, solved graphically: as $V_0 \to \infty$ the right side diverges and it reduces to $ka/2 = \pi/2, 3\pi/2, \ldots$, exactly the quantization condition of the infinite well; and for any $V_0 > 0$ the equation has at least one solution — **in one dimension any attractive potential, however shallow, has at least one bound state**, quite unlike three dimensions (which needs a critical depth). The thickness over which the wave function leaks outside the well, $\sim 1/\kappa$, grows rapidly as $E \to V_0$; this is the "probing" distance of tunnelling.

**Example 6: Resonant transmission.** For $E > V_0$ a particle does not necessarily "pass through" a square barrier: the exact transmission coefficient is

$$T = \left[1 + \frac{V_0^2\sin^2(k'a)}{4E(E - V_0)}\right]^{-1}, \qquad k' = \frac{\sqrt{2m(E - V_0)}}{\hbar}$$

When $k'a = n\pi$ (the barrier width holds exactly an integer number of half wavelengths) $\sin k'a = 0$ and $T = 1$ — **resonant transmission**, with the barrier completely "transparent". The mechanism is the constructive interference of multiple reflections between the two interfaces, cancelling the reflection entirely; it is the same physics as anti-reflection coatings and resonant tunnelling diodes. Conversely, for $k'a = (n + \frac12)\pi$ the reflection is strongest. All the information of one-dimensional scattering is written in the oscillations of $T(E)$, from which the shape of the barrier can be inferred (the germ of the inverse scattering problem).`,
    keyPoints: [
      'Infinite well Eₙ ∝ n², the wave function is a standing wave fixed at both ends',
      'The n-th bound state has n−1 interior nodes; more nodes means higher kinetic energy',
      'Oscillator levels are equally spaced by ħω; the zero-point energy ħω/2 is a purely quantum effect',
      'Tunnelling probability is exponentially sensitive to κa: T ≈ e^(−2κa)',
      'One-dimensional bound states are non-degenerate; scattering states have continuous energy',
    ],
  },

  representation: {
    chapter: 'Chapter 4 Representations and Matrix Mechanics',
    title: 'Quantum Mechanics in Hilbert Space',
    summary:
      'View a quantum state as a vector in Hilbert space; the coordinate, momentum and energy representations are merely different "coordinate systems"; Dirac notation and unitary transformations free physics from any particular representation.',
    content: String.raw`

A vector can be described in Cartesian coordinates $(x, y, z)$ or in spherical coordinates $(r, \theta, \varphi)$ — the vector itself does not change, only the "way the components are recorded". The same holds for a quantum state: the same state $|\psi\rangle$ is written as a wave function $\psi(x)$ in the coordinate representation, as $\varphi(p)$ in the momentum representation, and as a set of coefficients $\{c_n\}$ in the energy representation. The three descriptions carry **exactly the same** physical information and are connected by unitary transformations (such as the Fourier transform). Why switch between them? Because with the right basis an operator becomes a diagonal matrix and the problem simplifies at once: in the energy representation the Hamiltonian is diagonal and the time evolution is just a phase factor; in the momentum representation the momentum operator is a multiplication rather than a derivative. Heisenberg's matrix mechanics of 1925 and Schrödinger's wave mechanics of 1926 looked hostile at first but were soon proved completely equivalent — and the reason for the equivalence is the theme of this chapter: **they are the same Hilbert space expanded in different bases**.

Here is a practical suggestion: while studying this chapter, do the "translation" three times — write the solution of the infinite well once in the language of coordinates (solving a differential equation), once in the language of energy (spectrum plus superposition) and once in Dirac notation ($\hat H|n\rangle = E_n|n\rangle$). After three rounds you will find that the mathematics is the same, only the "typesetting" differs; and from then on, faced with a new problem, you will be able to choose the least laborious typesetting. Incidentally, the word "representation" also extends to quantum computing: the computational basis of a qubit, $\{|0\rangle, |1\rangle\}$, is just the most convenient basis of a two-dimensional Hilbert space — remember it and the abstractions of this chapter come down from the page to reality.

## 2. Rigorous Definitions

**Hilbert space and Dirac notation**: a quantum state is a vector in Hilbert space, written as a ket $|\psi\rangle$; its dual is the bra $\langle\psi|$. The inner product $\langle\varphi|\psi\rangle$ is complex and satisfies $\langle\varphi|\psi\rangle = \langle\psi|\varphi\rangle^*$; a state is normalized when $\langle\psi|\psi\rangle = 1$. Observables are represented by Hermitian operators, and an operator acting on a ket gives a new vector: $\hat A|\psi\rangle$.

**Representations and wave functions**: take the position eigenkets $|x\rangle$ as a basis (a continuum), with $\hat x|x\rangle = x|x\rangle$ and completeness written as

$$\int |x\rangle\langle x|\, dx = \mathbb{1}, \qquad \langle x|x'\rangle = \delta(x - x')$$

The "components" of the state are $\psi(x) = \langle x|\psi\rangle$, which is exactly the wave function. Likewise taking the momentum basis $|p\rangle$ gives $\varphi(p) = \langle p|\psi\rangle$. Between the two bases,

$$\langle x|p\rangle = \frac{1}{\sqrt{2\pi\hbar}}\, e^{ipx/\hbar}$$

whence

$$\varphi(p) = \frac{1}{\sqrt{2\pi\hbar}}\int \psi(x)\, e^{-ipx/\hbar}\, dx$$

**The coordinate and momentum representations are Fourier transforms of each other**. In the coordinate representation $\hat x = x$ (multiplication) and $\hat p = -i\hbar\partial_x$; in the momentum representation the roles are exactly exchanged: $\hat p = p$ and $\hat x = i\hbar\partial_p$.

**Matrix representation**: taking a discrete basis $\{|n\rangle\}$ (typically energy eigenkets), an operator is represented by the matrix

$$A_{mn} = \langle m|\hat A|n\rangle, \qquad |\psi\rangle \leftrightarrow (c_1, c_2, \ldots)^T, \qquad c_n = \langle n|\psi\rangle$$

A Hermitian operator corresponds to a Hermitian matrix; the eigenvalue equation $\hat A|\psi\rangle = A|\psi\rangle$ becomes the matrix eigenvalue problem $\sum_n A_{mn}c_n = A\,c_m$. The measurement probabilities $|c_n|^2$ and the expectation values $\sum_{mn} c_m^* A_{mn} c_n$ are standard operations in the matrix language.

**Change of representation**: changing from the basis $\{|n\rangle\}$ to $\{|\alpha\rangle\}$ is performed by the unitary matrix $S_{n\alpha} = \langle n|\alpha\rangle$ (the same transformation also changes the components of a state from one set of coordinates to another):

$$A' = S^\dagger A S, \qquad c' = S^\dagger c, \qquad S^\dagger S = \mathbb{1}$$

Unitarity guarantees that inner products, expectation values, eigenvalues and traces are unchanged — **physics is independent of the representation**. The art of choosing a representation lies in diagonalizing as many operators as possible simultaneously.

**Matrix elements of the oscillator** (a demonstration): from the ladder operators $a = \sqrt{\tfrac{m\omega}{2\hbar}}\,x + \tfrac{i}{\sqrt{2m\hbar\omega}}\,p$ one obtains

$$x_{mn} = \langle m|\hat x|n\rangle = \sqrt{\frac{\hbar}{2m\omega}}\left(\delta_{m,n+1} + \delta_{m,n-1}\right)$$

In the energy representation the position operator is a matrix "nonzero only on the subdiagonals" — a natural result of the ladder-operator language, which the accompanying problems use to solve the oscillator spectrum algebraically.

## 3. Why We Understand It This Way

**Which is more fundamental, the state vector or the wave function?** The state vector. The wave function is only the component of the state vector in one continuous basis (positions), just as "coordinate components" are not the vector itself. The value of Dirac notation is that it writes the representation-independent geometric relations (orthogonality, completeness, projection) separately from the representation-dependent component computations, giving a clearer line of thought and more economical notation.

**Why is the Fourier transform a "change of representation"?** Both $|x\rangle$ and $|p\rangle$ are complete bases, and the "dictionary" connecting them is precisely the plane wave $\langle x|p\rangle$; the kernel $e^{-ipx/\hbar}$ of the Fourier transform is that dictionary. In this language the uncertainty relation $\Delta x\,\Delta p \ge \hbar/2$ is simply "the width constraint between a pair of Fourier-conjugate variables", the same as the time–bandwidth product in signal processing.

**Why does a unitary transformation "not change physics"?** A unitary transformation is a "rotation" of Hilbert space: the length of a vector (normalization), the angle between vectors (inner products and transition amplitudes) and the spectrum (eigenvalues) are all rotation invariants. So one may confidently choose the most convenient basis for the computation and convert back to the required representation at the end.

**The distinction of pictures.** A state evolving in time while the operators stay fixed is the Schrödinger picture; transferring the evolution to the operators while the state stays fixed is the Heisenberg picture — the two are connected by a time-dependent unitary transformation and have completely equivalent observable content. Matrix mechanics naturally lives in the Heisenberg picture, while wave mechanics is closer to the Schrödinger picture.

**How do continuous and discrete bases coexist?** The same Hilbert space can hold both the basis $\{|x\rangle\}$ (continuous, uncountable) and the basis $\{|n\rangle\}$ (discrete, countable), just as three-dimensional space can use either Cartesian or spherical coordinates. The "mixed" matrix elements $\langle m|\hat A|x\rangle$ (discrete on one side, continuous on the other) are the standard objects of scattering and transition calculations — the $V_{mn}$ of Fermi's golden rule in Chapter 6 is exactly of this kind.

**Why is "making what diagonal" the paradigm for choosing a representation?** An operator is a multiplication in its own eigenrepresentation and a derivative in the conjugate representation; the difficulty of an equation therefore depends on which thing you write as a "reading" and which as a "derivative". The computational strategy of the whole of quantum mechanics is essentially the repeated answer to "make what diagonal".

**Are matrix mechanics and wave mechanics only "typeset" differently?** Precisely: the spectrum of the same Hermitian operator does not change with the basis; the evolution equations $i\hbar\,\dot{c}_n = \sum_m H_{nm}c_m$ and $i\hbar\,\partial_t\psi = \hat H\psi$ are translated into each other by a Fourier-type transformation. Choosing a basis is like choosing a language; the grammar (linear algebra) is shared. That is also why von Neumann could unify the two mechanics in *The Mathematical Foundations of Quantum Mechanics* — in the cast list of that book, Hilbert space is the protagonist.

## 4. Typical Calculations

**Example 1: States and measurement in the energy representation.** $|\psi\rangle = \frac{1}{\sqrt3}\left(|1\rangle + |2\rangle + |3\rangle\right)$ (energy eigenbasis): the probabilities of measuring $E_1, E_2, E_3$ are each $1/3$, and $\langle H\rangle = (E_1 + E_2 + E_3)/3$; the time evolution is just each coefficient multiplied by $e^{-iE_nt/\hbar}$, and the probabilities $|c_n|^2$ never change — a direct expression of energy conservation.

**Example 2: The oscillator ground state in the momentum representation.** The Fourier transform of a Gaussian $\psi_0(x)$ is again a Gaussian: $\varphi_0(p) \propto e^{-p^2/2m\hbar\omega}$, and $\Delta p = \sqrt{m\hbar\omega/2}$ — "the more localized in coordinate space, the wider in momentum space" displays itself on one and the same state, the product of the two widths being exactly $\hbar/2$.

**Example 3: Reading selection rules off matrix elements.** The probability of an electric dipole transition is proportional to $|\langle m|\hat x|n\rangle|^2$; from the expression for $x_{mn}$ above it follows immediately that the oscillator allows only transitions with $\Delta n = \pm 1$, so the spectrum is a single set of equally spaced lines. The matrix language makes selection rules readable at a glance.

**Example 4: The infinite well in the momentum representation.** $\varphi_n(p) = \langle p|n\rangle = \frac{1}{\sqrt{2\pi\hbar}}\int_0^a \sqrt{\tfrac{2}{a}}\sin\frac{n\pi x}{a}\, e^{-ipx/\hbar}dx$, which shows two peaks near $p \approx \pm n\pi\hbar/a$ — a standing wave in coordinate space corresponds to a "two-peaked" momentum space, each representation telling the same physics in its own way.

**Example 5: Time evolution in the energy representation is all "phase rotation".** $c_n(t) = c_n(0)\, e^{-iE_nt/\hbar}$: the probabilities $|c_n|^2$ never change, only the relative phases. When the accumulated relative phases come back into step the interference pattern is restored (quantum revival); when interference terms are averaged out by the environment a pure state looks like a statistical mixture (the germ of decoherence). The "time-dependent evolution" of wave mechanics and the "phase rotation" of matrix mechanics are two ways of saying the same thing; and again we see the benefit of "making what diagonal" — in the energy representation the evolution is so simple that only a phase factor is left.

## 5. Common Misconceptions

**Misconception 1: taking $|\psi\rangle$ for the wave function itself.** $|\psi\rangle$ is an abstract vector; $\psi(x)$, $\varphi(p)$ and $\{c_n\}$ are its components in various representations. Confusing them leads to pointless debates such as "is the wave function real".

**Misconception 2: confusing unitary and Hermitian.** Hermitian operators represent measurable observables (real eigenvalues); unitary operators represent transformations and evolution (preserving inner products). The evolution operator $e^{-i\hat Ht/\hbar}$ is unitary but generally not Hermitian.

**Misconception 3: thinking a change of representation changes probabilities.** $|c_n|^2$ and $\int|\psi(x)|^2 dx$ are strictly invariant under unitary transformations; only the "bookkeeping" changes.

**Misconception 4: abusing discrete sums in a continuous basis.** The position basis is continuous: completeness is the integral $\int|x\rangle\langle x|dx = \mathbb{1}$ and orthonormality is the $\delta$ function $\langle x|x'\rangle = \delta(x - x')$, which must be distinguished from $\sum_n$ and $\delta_{mn}$ in a discrete basis.

**Misconception 5: ignoring dimensional conventions.** The energy-representation coefficients $c_n$ are dimensionless, while a one-dimensional wave function $\psi(x)$ has dimension $L^{-1/2}$; forgetting dimensions usually means a normalization factor such as $\sqrt{2\pi\hbar}$ has been dropped, and errors are especially likely around a Fourier transform.

**Misconception 6: believing the wave function must "have a shape in three-dimensional space".** A two-particle wave function lives in a six-dimensional configuration space, and a spin wave function lives in an abstract internal space; the "shape of the wave" is a representation component, not a physical ripple in three-dimensional space. Three-dimensional intuition may help understanding but must not be used as a physical criterion — the shape changes with the representation, the content of the state vector does not.

**Misconception 7: treating completeness and orthogonality as "negligible mathematical details".** The probability interpretation of the expansion coefficients depends entirely on completeness ($\sum_n|c_n|^2 = 1$) and orthogonality; and "normalization to a $\delta$ function" in the continuous spectrum is a technical point requiring care, since omitting $(2\pi\hbar)^{-1/2}$ makes every probability off by a constant factor. Do once the exercise of substituting $\langle x|p\rangle$ into $\int|x\rangle\langle x|dx = \mathbb{1}$ to obtain $\langle p|p'\rangle = \delta(p - p')$, and the normalization of continuous bases will never be forgotten. Likewise remember: a plane wave normalized to a $\delta$ function is not a physical state; a real wave packet is.

## 6. Extensions and Synthesis

**History and unification.** Heisenberg's matrix mechanics (1925) and Schrödinger's wave mechanics (1926) were unified mathematically by von Neumann within the Hilbert-space framework: the former computes matrices in the energy representation, the latter solves differential equations in the coordinate representation. Dirac notation is the crystallized product of this unification and the language now common to quantum information and quantum field theory.

**The density matrix in one sentence.** When a state is known only as a statistical mixture (such as thermal equilibrium, $\rho \propto e^{-\hat H/kT}$) a pure-state vector is insufficient, and one uses the density operator $\hat\rho = \sum_i p_i |\psi_i\rangle\langle\psi_i|$ — it is the greatest beneficiary of the "representation-independent" idea: the trace language $\langle A\rangle = \mathrm{tr}(\hat\rho\hat A)$ is entirely free of any particular representation.

**Practical strategy for choosing a representation.** Bound-state levels → energy representation (diagonal Hamiltonian); scattering and wave-packet propagation → coordinate or momentum representation; rotations and spin → angular momentum representation; identical many-body systems → particle-number (Fock) representation. The accompanying problems solve the oscillator levels algebraically with ladder operators and the particle-number representation, the first practical exercise of this strategy — it is continuous with the angular momentum of Chapter 5 and the identical particles of Chapter 7.

## 7. Worked Examples

**Example 5: The oscillator in the momentum representation.** In the momentum representation $\hat p = p$ (multiplication) and $\hat x = i\hbar\,\partial_p$, and the stationary equation becomes

$$\left[\frac{p^2}{2m} - \frac{1}{2}m\omega^2\hbar^2\frac{\partial^2}{\partial p^2}\right]\varphi(p) = E\varphi(p)$$

It is **isomorphic** to the coordinate-representation equation (equivalent to swapping $m \leftrightarrow 1/m\omega^2$), so the solution is again Gaussian: $\varphi_0(p) \propto e^{-p^2/2m\hbar\omega}$, and the levels are again $E_n = \left(n + \frac12\right)\hbar\omega$. The two representations give the same spectrum — "physics is independent of the representation" is no longer a slogan but an equivalence one can verify by hand; incidentally we obtain the width ratio $\Delta x / \Delta p = 1/m\omega$: the heavier the oscillator and the lower its frequency, the more "definite" its position.

**Example 6: Diagonalizing $\hat L_x$ by a change of representation.** Arrange the three normalized eigenstates of $\hat L_x$ (see the accompanying problems of Chapter 5) as columns of the matrix

$$S = \frac{1}{2}\begin{pmatrix} 1 & \sqrt{2} & 1\\ \sqrt{2} & 0 & -\sqrt{2}\\ 1 & -\sqrt{2} & 1 \end{pmatrix}$$

Then $S^\dagger \hat L_x S = \mathrm{diag}(\hbar, 0, -\hbar)$: in the "$\hat L_x$ representation" $\hat L_x$ is diagonal, while $\hat L_z$ becomes a non-diagonal matrix isomorphic to the original $\hat L_x$ — after the coordinate system is rotated by $90°$ the two operators exchange roles. One verifies directly that $S^\dagger S = \mathbb{1}$ (here $S$ is a real orthogonal matrix), and the inner products and measurement probability distributions of any state are strictly unchanged before and after the transformation. This little $3\times3$ matrix is the most concrete image of "a change of representation = a change of basis".`,
    keyPoints: [
      'A quantum state is a vector |ψ⟩ in Hilbert space; a representation is a choice of basis',
      'The wave function ψ(x) = ⟨x|ψ⟩ is only the component in the coordinate representation',
      'Coordinate and momentum representations are related by a Fourier transform with kernel ⟨x|p⟩',
      'Operator matrix elements Aₘₙ = ⟨m|Â|n⟩; eigenvalues are independent of the representation',
      'A change of representation is unitary: inner products, traces and eigenvalues are all invariant',
      'Choosing a "good" representation (one that diagonalizes the operators) greatly simplifies the computation',
    ],
  },

  'angular-momentum-qm': {
    chapter: 'Chapter 5 Angular Momentum',
    title: 'Quantization and Coupling',
    summary:
      'Angular momentum is defined by commutation relations, and ladder-operator algebra yields the quantum numbers and eigenstates; spin and angular momentum coupling (CG coefficients) carry this language into atomic structure and quantum technology.',
    content: String.raw`

In 1913 Bohr took the quantization of angular momentum, $L = n\hbar$, as a postulate and successfully computed the hydrogen spectrum, but "why quantization" remained open. Quantum mechanics gave the answer: angular momentum is an operator and its quantization is a necessary consequence of the **commutation relations** — no orbital picture is needed at all. More beautifully, this algebra lets us climb from one state to another with "ladder operators", like climbing a ladder, obtaining all the eigenvalues without solving any differential equation. And when the Stern–Gerlach experiment revealed that the electron has an extra "intrinsic angular momentum" — spin — with no relation to spatial motion and purely a quantum property, the same algebra ($s = 1/2$, two projection states) described it cleanly. Angular momentum is therefore the most structurally beautiful and most widely applied chapter of quantum mechanics: atomic spectra, magnetic resonance, molecular rotation and qubits are full of its traces.

The methodology of this chapter is continuous with the ladder operators of the oscillator in Chapter 3: **first write the algebra (the commutation relations), then let the algebra "spit out" the spectrum**. This idea was later generalized into the Lie-algebra method, and the isospin of particle physics and the symmetry of quark "flavour" use exactly the same $SU(2)$, $SU(3)$ mathematics. Learning angular momentum is a ticket into modern symmetry physics.

**Why do spherical harmonics look the way they do?** $Y_l^m$ is the joint requirement of $\hat L^2$ and $\hat L_z$: the eigenvalue property of $\hat L_z$ forces the $\varphi$ dependence to be $e^{im\varphi}$, single-valuedness restricts $m$ to integers, and then the eigenvalue equation of $\hat L^2$ yields the associated Legendre functions of the $\theta$ direction. Each step is a necessary consequence of algebra and single-valuedness, with nothing negotiable. Remember two common values as well: $Y_0^0 = 1/\sqrt{4\pi}$ (isotropic) and $Y_1^0 \propto \cos\theta$ (dipole distribution), which appear everywhere in multipole expansions and radiation patterns.

## 2. Rigorous Definitions

**Orbital angular momentum operator**: $\hat{\vec L} = \hat{\vec r} \times \hat{\vec p}$, with components

$$\hat L_x = y\hat p_z - z\hat p_y, \qquad \hat L_y = z\hat p_x - x\hat p_z, \qquad \hat L_z = x\hat p_y - y\hat p_x$$

In spherical coordinates $\hat L_z = -i\hbar\frac{\partial}{\partial\varphi}$. The central commutation relations

$$[\hat L_i, \hat L_j] = i\hbar\,\varepsilon_{ijk}\hat L_k$$

show that the three components do not commute with each other; only $\hat L^2$ commutes with any one component (usually $\hat L_z$), and these can be determined simultaneously.

**Quantum numbers and eigenfunctions**: the common eigenfunctions are the spherical harmonics $Y_l^m(\theta, \varphi)$:

$$\hat L^2 Y_l^m = l(l+1)\hbar^2 Y_l^m, \qquad \hat L_z Y_l^m = m\hbar\, Y_l^m$$

with $l = 0, 1, 2, \ldots$ (the orbital quantum number) and $m = -l, \ldots, +l$ (the magnetic quantum number, $2l + 1$ values). Note that the magnitude of $\vec L$ is $\sqrt{l(l+1)}\,\hbar$, **always greater than its maximum component $l\hbar$**.

**Ladder operators**: $\hat L_\pm = \hat L_x \pm i\hat L_y$. From the commutation relations one proves

$$\hat L_\pm|l, m\rangle = \hbar\sqrt{(l \mp m)(l \pm m + 1)}\, |l, m \pm 1\rangle$$

They do not change $l$ but raise or lower $m$ by one step; the chain terminates at $m = \pm l$ (the coefficient vanishes), which is the algebraic reason why $m$ takes only $2l + 1$ values. From $\hat L^2 = \hat L_\pm\hat L_\mp + \hat L_z^2 \mp \hbar\hat L_z$ one also obtains the mean square of the transverse components, $\langle L_x^2\rangle = \langle L_y^2\rangle = \frac12[l(l+1) - m^2]\hbar^2$.

**Spin**: particles such as the electron carry an intrinsic angular momentum $\hat{\vec S}$ obeying **exactly the same** commutation algebra as orbital angular momentum, but the quantum number $s$ is fixed by the species of particle (for the electron $s = 1/2$, $m_s = \pm 1/2$). A spin state is described by a two-dimensional vector, $\hat S_i = \frac{\hbar}{2}\sigma_i$, with the Pauli matrices

$$\sigma_x = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}, \qquad \sigma_y = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}, \qquad \sigma_z = \begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}$$

Spin has no classical counterpart; it is not "a small ball rotating".

**Angular momentum coupling**: the total angular momentum $\hat{\vec J} = \hat{\vec L} + \hat{\vec S}$ (or the sum of the angular momenta of two particles) obeys the same algebra; the eigenvalues of $\hat J^2$ and $\hat J_z$ are $j(j+1)\hbar^2$ and $m_j\hbar$, where $j = |l - s|, \ldots, l + s$. The coupled basis and the uncoupled basis are related by **CG coefficients** (Clebsch–Gordan coefficients); for example, coupling two $1/2$:

$$|1, 1\rangle = |\uparrow\uparrow\rangle, \quad |1, 0\rangle = \tfrac{1}{\sqrt2}\left(|\uparrow\downarrow\rangle + |\downarrow\uparrow\rangle\right), \quad |1, -1\rangle = |\downarrow\downarrow\rangle, \quad |0, 0\rangle = \tfrac{1}{\sqrt2}\left(|\uparrow\downarrow\rangle - |\downarrow\uparrow\rangle\right)$$

that is, $\frac12 \otimes \frac12 = 1 \oplus 0$: a symmetric triplet and an antisymmetric singlet, a structure that will recur repeatedly in the identical particles of Chapter 7.

## 3. Why We Understand It This Way

**Why are the commutation relations the "essence"?** Any three operators satisfying $[\hat J_i, \hat J_j] = i\hbar\varepsilon_{ijk}\hat J_k$, whether they come from orbit, spin or another degree of freedom, must have the eigenvalue spectrum $j(j+1)\hbar^2$, $m\hbar$ — the whole edifice rests on the algebra, independently of the detailed shape of the wave function. That is why spin, which "has no classical picture", can yet be computed exactly.

**Why is $|\vec L|$ greater than its maximum component?** If $|\vec L| = l\hbar$ and $L_z$ also took $l\hbar$, then $L_x = L_y = 0$; but that would require $[\hat L_x, \hat L_y] = 0$, contradicting $i\hbar\hat L_z \ne 0$. The algebra forces "transverse fluctuation always exists": the angular momentum vector **precesses** about the $z$ axis, and what is quantized is the projection, not the direction of the vector itself.

**Why do ladder operators exist?** $[\hat L_z, \hat L_\pm] = \pm\hbar\hat L_\pm$ means that $\hat L_\pm|l,m\rangle$ is still an eigenstate of $\hat L_z$ with the eigenvalue shifted by $\pm\hbar$ — the "ladder" is a direct product of the algebraic structure. This technique was already rehearsed in the oscillator (Chapter 3 and the accompanying problems); the two are two applications of one idea.

**What are CG coefficients?** They are simply the **matrix elements of the change of representation** from the uncoupled basis (such as $|m_l\rangle|m_s\rangle$) to the coupled basis ($|j, m_j\rangle$) — a concretization of the change-of-representation idea of Chapter 4. Physically, the total magnetic moment of an atom and the fine structure of its levels are determined by the coupled $j$; mathematically, CG coefficients have standard tables and need not be rederived each time.

**Why choose only $\hat L^2$ and $\hat L_z$ as the common eigenstates?** The three components do not commute, so at most one of them can be determined simultaneously with $\hat L^2$; choosing $z$ is only a convention (convenient in spherical coordinates). Rotational symmetry guarantees the same conclusions for any axis — which is the deeper reason why "the measurement spectrum along any axis is the same" (Example 1 of this chapter measures $L_x$).

**Angular momentum conservation and isotropic space.** In a central force field $[\hat H, \hat L^2] = [\hat H, \hat L_z] = 0$, because the potential depends only on $r$ and favours no direction: rotational symmetry is implemented as angular momentum conservation through Noether's theorem. Adding an external magnetic field (which singles out the $z$ axis) leaves $L_z$ conserved but lifts the $m$ degeneracy of the levels — as much symmetry is lost, so much conservation and degeneracy is lost.

**Why are some CG coefficients negative?** The signs of the coherent superposition come from the phase convention in which all ladder-operator matrix elements take positive roots; physical quantities (probabilities, energy shifts) depend only on squared moduli and relative phases, so the convention does not affect observables, but coefficients looked up in different tables must use the same convention, otherwise the signs of interference terms will be wrong.

## 4. Typical Calculations

**Example 1: Constructing the $L_x$ eigenstates from ladder operators.** For $l = 1$, the action of $L_\pm$ gives the matrix of $\hat L_x$ in $\{|1,1\rangle, |1,0\rangle, |1,-1\rangle\}$ as $\frac{\hbar}{\sqrt2}\begin{pmatrix}0&1&0\\1&0&1\\0&1&0\end{pmatrix}$; diagonalizing gives the eigenvalues $\hbar, 0, -\hbar$ and the eigenstates (e.g. $|L_x = \hbar\rangle = \frac12|1,1\rangle + \frac{1}{\sqrt2}|1,0\rangle + \frac12|1,-1\rangle$). Measuring $L_x$ on $|1,0\rangle$: the probabilities of $\pm\hbar$ are each $1/2$ (the full derivation is in the accompanying problems).

**Example 2: Levels of a rigid rotor.** The rotational Hamiltonian of a diatomic molecule is $H = \hat L^2/2I$, and the spectrum of $\hat L^2$ gives at once

$$E_l = \frac{l(l+1)\hbar^2}{2I}, \qquad l = 0, 1, 2, \ldots$$

The spacing of adjacent levels grows linearly with $l$, corresponding to the equally spaced frequencies of the microwave rotational spectrum — another instance of "levels from ladder operators".

**Example 3: Precession of spin in a magnetic field.** For $\hat H = -\gamma B\hat S_z$, $|\uparrow_z\rangle$ is a stationary state; if the initial state is $|\uparrow_x\rangle = \frac{1}{\sqrt2}\left(|\uparrow_z\rangle + |\downarrow_z\rangle\right)$, the two components beat at the frequency difference $\gamma B$ and the spin orientation precesses about the $z$ axis — the core of nuclear magnetic resonance.

**Example 4: Counting CG couplings.** Coupling $l = 1$ with $s = 1/2$: $j = 3/2$ (4 values of $m_j$) and $j = 1/2$ (2 values of $m_j$), giving $4 + 2 = 6 = 3 \times 2$ states, the same as the number in the uncoupled basis — coupling does not create or destroy states, it only regroups them.

**Example 5: Measuring the bond length from the rotational spectrum.** The spacing of adjacent rotational levels of a diatomic molecule is $E_{l+1} - E_l = \hbar^2(l+1)/I$, with $I = \mu r^2$ ($\mu$ the reduced mass, $r$ the bond length). Experiment gives equally spaced microwave lines $\Delta\nu$, and $h\Delta\nu = \hbar^2/I$ fixes $r$ at once — "levels from ladder operators" thus becomes a quantum ruler for molecular size ($r \approx 0.113$ nm for CO), the laboratory incarnation of the rigid rotor of Example 2.

**Example 6: The idea of the spin echo.** The dephasing of transverse magnetization comes from tiny differences in the magnetic field at each nucleus; a $180°$ pulse makes the phases "walk backwards", cancelling the static dephasing and leaving the genuine homogeneous relaxation — the spin-echo sequence of magnetic resonance imaging is essentially an interference experiment controlling relative phases. Phase is the most sensitive "adjustable knob" of an angular momentum state, and every pulse-sequence design revolves around it — this chapter's language leads straight into medical imaging.

## 5. Common Misconceptions

**Misconception 1: writing the magnitude of angular momentum as $l\hbar$.** The correct value is $\sqrt{l(l+1)}\,\hbar$; only from this does the precession picture "the vector never points along the $z$ axis" follow naturally.

**Misconception 2: thinking spin is rotation.** If the electron were a small ball whose spin produced $s = 1/2$, its surface speed would exceed the speed of light by several orders of magnitude; spin is an intrinsic quantum degree of freedom obeying only algebraic rules and resembling spatial rotation only formally.

**Misconception 3: omitting the negative values of the magnetic quantum number.** $m = -l, \ldots, +l$ gives $2l + 1$ values in all; the negative states are just as real and correspond to orientations about the $-z$ direction.

**Misconception 4: thinking $L_x$ and $L_y$ "cannot be measured".** They can be measured, only not simultaneously with $L_z$; the component along any axis has a spectrum isomorphic to that of $L_z$. The accompanying problems of this chapter are exactly the standard operation of "measuring $L_x$ on an $L_z$ eigenstate".

**Misconception 5: taking CG coefficients for probabilities.** The probability is the **squared modulus** of the CG coefficient (and the coupled-basis coefficients are normalized); the CG coefficients themselves may be positive or negative and depend on the phase convention.

**Misconception 6: confusing the Bohr magneton with the gyromagnetic ratio.** The spin magnetic moment $\vec\mu_s = -g_s\mu_B\vec S/\hbar$ ($g_s \approx 2$) has a different gyromagnetic ratio from the orbital part ($g_l = 1$); exactly this difference makes spin–orbit coupling and the anomalous Zeeman effect observable, and it is one of the experimental signatures that "spin does not come from orbital motion".

**Misconception 7: thinking "orbital" angular momentum allows half-integers.** The orbital wave function must be single-valued as $\varphi \to \varphi + 2\pi$, forcing $l$ to be an integer; half-integers can only come from spin. If you compute an "orbital state" with $l = 1/2$, you have probably mistaken the kind of angular momentum or the boundary conditions of the equation.

**Misconception 8: equating $m$ with the magnitude of the magnetic moment.** The magnetic moment also carries a $g$ factor and a spin contribution, and nuclear magnetic moments are about three orders of magnitude smaller than the Bohr magneton; when comparing magnetic moments, write the full form $\vec\mu = -g\mu_B\vec J/\hbar$ first — get the order of magnitude wrong and the judgement "nuclear versus electronic magnetic moment" flips entirely.

## 6. Extensions and Synthesis

**The quantum theory of rotations.** The rotation operator $\hat U(R) = e^{-i\alpha\hat L_z/\hbar}$ generates the transformation matrices of spherical harmonics, $D^l_{m'm}(\alpha, \beta, \gamma)$ (Wigner D matrices), the universal basis for any "directional distribution" on the sphere (directional correlations, multipole expansions). The rotational properties of spin $1/2$ reveal a striking fact as well: a rotation by $2\pi$ changes the sign of the wave function, and $4\pi$ is needed to restore it — spin is tied to the double cover $SU(2)$ of the rotation group, which gives half-integer spin a deep geometric meaning.

**Its operation in atomic physics.** The angular part of the hydrogen wave function $\psi_{nlm} = R_{nl}(r)Y_l^m(\theta, \varphi)$ is exactly the $Y_l^m$ of this chapter; spin–orbit coupling $\hat H_{so} \propto \hat{\vec L}\cdot\hat{\vec S}$ is diagonalized with the total angular momentum $\hat{\vec J}$, giving the fine-structure doublets of the alkali spectra; the Zeeman effect is explained by the relation between $m_j$ and the magnetic moment. The whole "fingerprint reading" of atomic spectra rests on angular momentum coupling.

**A quantum-technology perspective.** A spin-$1/2$ system is the simplest "qubit": $|\uparrow\rangle, |\downarrow\rangle$ form a two-dimensional Hilbert space and the Pauli matrices are the basic logic gates; magnetic resonance imaging (MRI) manipulates exactly the precession and transitions of nuclear spins. It is worth comparing this chapter with the representation language of Chapter 4: the angular momentum representation is just another concrete practice of "choosing $|l,m\rangle$ as the basis", and the ladder operators are the same key running through the oscillator and angular momentum.

## 7. Worked Examples

**Example 5: Deriving $\langle \hat L_x^2\rangle = \frac{1}{2}[l(l+1) - m^2]\hbar^2$.** From $\hat L_x = \frac{1}{2}(\hat L_+ + \hat L_-)$,

$$\hat L_x^2 = \frac{1}{4}\left(\hat L_+^2 + \hat L_-^2 + \hat L_+\hat L_- + \hat L_-\hat L_+\right)$$

Taking the expectation in $|l, m\rangle$: $\hat L_\pm^2$ moves $m$ by two steps and is orthogonal to $|l,m\rangle$, contributing zero; then using the identities $\hat L_-\hat L_+ = \hat L^2 - \hat L_z^2 - \hbar\hat L_z$ and $\hat L_+\hat L_- = \hat L^2 - \hat L_z^2 + \hbar\hat L_z$, the two expectations are $[l(l+1) - m^2 - m]\hbar^2$ and $[l(l+1) - m^2 + m]\hbar^2$; adding and dividing by 4 gives

$$\langle \hat L_x^2\rangle = \frac{1}{2}\left[l(l+1) - m^2\right]\hbar^2$$

The whole derivation uses only ladder-operator algebra and never touches a differential equation; together with $\langle \hat L_x\rangle = 0$ it immediately gives $\langle \hat L_x^2\rangle = \hbar^2/2$ for the state $l = 1, m = 0$ (confirming the matrix computation in the accompanying problems).

**Example 6: Chained Stern–Gerlach experiments.** A beam of silver atoms in the state $|\uparrow_z\rangle$ first passes a $z$-direction magnetic analyser: all are deflected up (the eigenstate is stable); if instead it passes an $x$-direction analyser, half go up and half down — because $|\uparrow_z\rangle = \frac{1}{\sqrt2}\left(|\uparrow_x\rangle + |\downarrow_x\rangle\right)$; if the $|\uparrow_x\rangle$ beam is selected and sent back into a $z$ analyser, again half become $|\uparrow_z\rangle$ and half $|\downarrow_z\rangle$. Successive measurements "erase" the information previously selected: $\hat S_x$ and $\hat S_z$ do not commute, so successive measurements are incompatible. This experiment turns "commutation relations ⇒ the order of measurements cannot be exchanged" into a visible splitting of an atomic beam, and is the earliest direct evidence for the existence of spin and its quantized behaviour — the chained version from 1968 onwards demonstrated "wave-function collapse" step by step down to the level of single atoms.`,
    keyPoints: [
      'The essence of angular momentum is the algebraic relation [L̂ᵢ,L̂ⱼ] = iħεᵢⱼₖL̂ₖ',
      'L² and L̂z share eigenvalues l(l+1)ħ² and mħ, m = −l,…,+l',
      'The ladder operators L̂± shift m by one step, with step size √((l∓m)(l±m+1))',
      '|L| = √(l(l+1))ħ exceeds any component ⇒ directional quantization and precession',
      'Spin is intrinsic angular momentum with no classical counterpart; for the electron s = 1/2',
      'Coupling two angular momenta expands in CG coefficients: ½⊗½ = 1 ⊕ 0',
    ],
  },

  perturbation: {
    chapter: 'Chapter 6 Perturbation Theory and the Variational Method',
    title: 'Approximation Methods',
    summary:
      'When the equation cannot be solved, perturbation theory corrects the levels and wave functions order by order, degeneracy requires diagonalization first, time-dependent perturbation theory describes transitions, and the variational method approaches the ground state from above.',
    content: String.raw`

The quantum systems that can be solved exactly can be counted on one hand: the well, the oscillator, the Coulomb field ... and the real world is almost never among them — an atom in an external electric field, a slightly anharmonic molecule, the electron correlation of helium all defy solution. What then? Quantum mechanics has developed a "toolbox of approximation methods", of which the three most important are: **stationary perturbation theory** — when the Hamiltonian is only slightly more than "solvable", expand the levels and wave functions in powers of a small parameter and correct order by order; **time-dependent perturbation theory** — when the outside world varies in time, compute the probability of the system "jumping" from one state to another, the theoretical basis of laser-driven transitions, spectral emission and absorption; **the variational method** — forget the wave equation and use directly the fact that "the energy expectation value is bounded below for any state" to approach the ground state from above. The three complement each other: perturbation theory tells you "which way and how far it shifts", the variational method gives the guarantee "no worse than". How do they divide the work? Perturbation theory needs a "good zeroth-order solution", the variational method only a "good trial function", and time-dependent perturbation theory handles "a changing outside world"; in practice they take turns — first the variational method to fix parameters, then perturbation theory for corrections, and finally time-dependent perturbation theory to predict line intensities. The division of labour is complementary but the boundaries are not walls: the matrix version of the variational method and numerical diagonalization are hard to tell apart, and the "order-by-order diagram" idea of perturbation theory grows into a great tree in quantum field theory. Together they push quantum mechanics from "textbook models" to "real laboratories".

There is also a fourth, often overlooked tool: **symmetry analysis**. Before computing, use parity and angular momentum selection rules to eliminate whole blocks of matrix elements; this often shrinks "a page of integrals" into "two lines of algebra". The examples and text of this chapter demonstrate this repeatedly — look at the symmetry first, then pick up the pen.

## 2. Rigorous Definitions

**Stationary non-degenerate perturbation theory**: $\hat H = \hat H^{(0)} + \lambda\hat H'$, where the solutions of $\hat H^{(0)}$ are known, $\hat H^{(0)}|n^{(0)}\rangle = E_n^{(0)}|n^{(0)}\rangle$, and $E_n^{(0)}$ is non-degenerate. Substituting

$$E_n = E_n^{(0)} + \lambda E_n^{(1)} + \lambda^2 E_n^{(2)} + \cdots$$

into the equation and comparing orders gives

$$E_n^{(1)} = \langle n^{(0)}|\hat H'|n^{(0)}\rangle$$

$$E_n^{(2)} = \sum_{m \neq n} \frac{\left|\langle m^{(0)}|\hat H'|n^{(0)}\rangle\right|^2}{E_n^{(0)} - E_m^{(0)}}, \qquad |n^{(1)}\rangle = \sum_{m \neq n} \frac{\langle m^{(0)}|\hat H'|n^{(0)}\rangle}{E_n^{(0)} - E_m^{(0)}}\,|m^{(0)}\rangle$$

Condition of validity: $\left|\langle m|\hat H'|n\rangle\right| \ll \left|E_n^{(0)} - E_m^{(0)}\right|$ — the perturbation being "small" is relative to the level spacing, not small in absolute terms.

**Degenerate perturbation theory**: if $E_n^{(0)}$ has $g$-fold degeneracy, the denominators blow up and the perturbation must first be diagonalized within the degenerate subspace: solve the **secular equation**

$$\det\left(H'_{ij} - E^{(1)}\delta_{ij}\right) = 0, \qquad H'_{ij} = \langle \psi_i^{(0)}|\hat H'|\psi_j^{(0)}\rangle$$

The $g$ roots give the correct zeroth-order combinations and the first-order shifts; the degeneracy is partly or wholly lifted.

**Time-dependent perturbation and transitions**: $\hat H(t) = \hat H^{(0)} + \hat H'(t)$, with the system initially in $|n\rangle$. To first order the amplitude for finding the system in $|m\rangle$ at time $t$ is

$$c_m^{(1)}(t) = -\frac{i}{\hbar}\int_0^t H'_{mn}(t')\, e^{i\omega_{mn}t'}\, dt', \qquad \omega_{mn} = \frac{E_m^{(0)} - E_n^{(0)}}{\hbar}$$

and the transition probability is $P_{n \to m} = |c_m^{(1)}|^2$. A constant perturbation gives a resonance structure at long times; a periodic perturbation (frequency $\omega$) resonates at $\omega \approx \omega_{mn}$, and the rate of transition to a continuum of final states is **Fermi's golden rule**

$$w = \frac{2\pi}{\hbar}\,|V_{mn}|^2\,\rho(E_m)$$

with $\rho(E)$ the density of final states — the central formula for spectral line intensities and scattering cross sections.

**The variational method**: for any normalized trial state $|\psi\rangle$, $\langle\psi|\hat H|\psi\rangle \ge E_0$ (the ground-state energy). Constructing a parametrized $|\psi(\alpha)\rangle$ and minimizing $E(\alpha)$ gives an upper bound to the ground-state energy and the best approximate wave function. Classic case: taking a helium-like trial wave function with effective charge $Z^*$ gives $Z^* = Z - 5/16 = 27/16$ and $E \approx -77.5$ eV, close to the experimental $-79.0$ eV (the independent-electron picture gives $-108.8$ eV, off by nearly 38%).

## 3. Why We Understand It This Way

**Why is the power-series expansion legitimate?** Regard the effect of $\hat H'$ as a "small nudge": the zeroth-order wave function is nudged to acquire small "admixed components", the first-order shift is their average in the original state, and the second-order shift is their second-order effect. Convergence requires the coupling between neighbouring levels to be much smaller than the spacing; once the levels are degenerate (spacing zero) the series diverges, so in the degenerate case one must switch to "diagonalize first" — this is not a technical patch but a necessity of the mathematical structure.

**The "level repulsion" of the second-order shift.** The sign of $E_n^{(2)}$ is decided by $E_n^{(0)} - E_m^{(0)}$: levels above $n$ (negative denominator) push $n$ down, levels below push it up. For the ground state all denominators are negative, so the ground state always shifts down; the overall effect is that levels "repel" each other and the spacings widen, continuous with the splitting of degeneracy.

**Why do transitions explode at resonance?** In the time-dependent integral $e^{i\omega_{mn}t'}$ is an oscillating factor: when the perturbation frequency is far from $\omega_{mn}$ the contributions cancel, and no probability accumulates; when the frequency matches, each period adds in phase and the probability grows linearly, $\propto t$ — this is the quantum root of the "frequency selection" of spectroscopy, and energy conservation $E_m - E_n = \hbar\omega$ emerges naturally through coherent accumulation.

**Why does the variational method only guarantee the ground state?** The minimum of $\langle\psi|\hat H|\psi\rangle$ over the whole Hilbert space is $E_0$; but excited states correspond to "saddle points", and a slightly poor trial function may give a value below them. So the variational method is best at the ground state; for excited states one needs constraints orthogonal to the lower states or special techniques.

**Why do off-diagonal elements not appear in the first-order shift?** $E_n^{(1)}$ takes only the diagonal element; the role of the off-diagonal elements is to "change the wave function" (the first-order correction $|n^{(1)}\rangle$), and their energy effect appears only at second order. "First order changes the energy through diagonal elements, first order changes the wave function through off-diagonal elements" is the most memorable division of labour in perturbation theory, and it explains why degeneracy (where the diagonal element fails) needs special treatment.

**Parity selection rules for the perturbed wave function.** If the parity of $\hat H'$ differs from that of the unperturbed Hamiltonian (e.g. $\lambda x$ is odd), then matrix elements are nonzero only between states of opposite parity — the first-order wave-function correction automatically "admixes only opposite-parity components". This is exactly the case for an oscillator in a uniform electric field: $|n\rangle$ mixes only with $|n \pm 1\rangle$ (opposite parity and adjacent). Knowing parity zeroes out half the matrix elements at once.

**When does perturbation theory fail, and what to use instead?** Three typical failures: near-degeneracy (switch to degenerate perturbation theory or a two-level model), strong coupling (the series diverges; use the variational method or numerical diagonalization), long-time resonance (in time-dependent problems the series fails near resonance and the two-level Rabi oscillation must be solved exactly). Recognizing the failure mode is itself an important problem-solving skill.

## 4. Typical Calculations

**Example 1: A well with $\lambda x^2$.** Adding the perturbation $H' = \lambda x^2$ to the infinite well gives the first-order shift

$$E_n^{(1)} = \lambda a^2\left(\frac13 - \frac{1}{2n^2\pi^2}\right)$$

about $0.283\,\lambda a^2$ for the ground state and $0.321\,\lambda a^2$ for the first excited state, approaching the classical value $\lambda a^2/3$ for large $n$ (integration details in the accompanying problems).

**Example 2: An oscillator with an anharmonic term.** For $H' = \lambda x^4$, using ladder operators one finds $\langle n|x^4|n\rangle = \frac{3\hbar^2}{4m^2\omega^2}(2n^2 + 2n + 1)$, so

$$E_n^{(1)} = \frac{3\lambda\hbar^2}{4m^2\omega^2}\left(2n^2 + 2n + 1\right)$$

The anharmonicity makes the levels no longer equally spaced — exactly why the real vibrational-rotational spectra of molecules deviate from the ideal oscillator.

**Example 3: The first-order Stark effect.** The $n = 2$ level of hydrogen is fourfold degenerate ($2s$ and $2p$, $m = 0, \pm 1$). In a uniform field $\mathcal E$, $H' = e\mathcal E z$: the diagonal elements all vanish by parity, but the off-diagonal element between $2s$ and $2p_{m=0}$ is $-3ea_0\mathcal E$, and the secular equation gives the first-order shifts $E_2^{(0)} \pm 3ea_0\mathcal E$, while the two $m = \pm 1$ states are unchanged — the degeneracy is lifted and the splitting is proportional to the field strength, the signature case for "diagonalize first".

**Example 4: A variational estimate.** See the helium atom above: a single parameter $Z^*$ reduces the error from $38\%$ to about $2\%$. The more parameters (linear variation, configuration interaction), the lower and more accurate the bound — modern quantum-chemistry software is essentially large-scale variational computation.

**Example 5: The polarizability of the hydrogen ground state.** In a uniform field $H' = e\mathcal E z$ has zero diagonal element in the ground state ($1s$, even parity), so the first-order shift vanishes; the second-order shift requires a sum over all $np$ states (opposite parity), and a closed summation using Laguerre polynomials gives $E_1^{(2)} = -\frac{9}{4}\, 4\pi\varepsilon_0 a_0^3\, \mathcal E^2$. Comparing with the macroscopic definition of polarization, $\Delta E = -\frac{1}{2}\alpha\mathcal E^2$, one reads off the ground-state polarizability $\alpha = \frac{9}{2}\, 4\pi\varepsilon_0 a_0^3$ — a "purely quantum correction" coefficient that is exactly the experimentally measured polarizability of hydrogen.

## 5. Common Misconceptions

**Misconception 1: concluding "the level does not move" when the first-order correction vanishes.** The second-order correction remains. For example, in a uniform electric field the oscillator has $\langle n|x|n\rangle = 0$ and a vanishing first-order shift, but the second order gives a uniform downward shift of all levels, $-q^2\mathcal E^2/2m\omega^2$ (equivalent to a shift of the equilibrium point), and the result happens to be exact.

**Misconception 2: forcing the non-degenerate formula on a degenerate level.** The denominator vanishes and the series diverges; one must first diagonalize $\hat H'$ in the degenerate subspace before discussing shifts.

**Misconception 3: thinking a small perturbation parameter is necessarily reliable.** "Small" is measured relative to the level spacing; if some pair of levels is nearly degenerate (such as the $2s$ and $2p$ of hydrogen), even a very small $\lambda$ must be treated as degenerate.

**Misconception 4: using the square of a $\delta$ function as the transition probability.** For a continuum of final states one must integrate over energy and the density of states; "probability per unit time" is the physical quantity — exactly why the golden rule brings in the density of final states.

**Misconception 5: taking a variational result for an exact value.** The variational method gives an **upper bound**, and only for the ground state; how far above it lies is not controlled in general and must be cross-checked against experiment or other methods.

**Misconception 6: taking $E_n^{(1)}$ for "the new level".** The shift is only a correction; the full level is $E_n^{(0)} + E_n^{(1)} + E_n^{(2)} + \cdots$, and each order depends on the structure of the unperturbed spectrum. When reporting a result, state to which order it is computed and roughly how good the convergence is.

**Misconception 7: forgetting "what the initial state is" for a time-dependent perturbation.** The transition probability $P_{n \to m}$ is always relative to some initial state; change the initial state and all matrix elements and phase factors must be rearranged. In a time-dependent problem, declare the initial state in the first sentence — a transition probability without a declared initial state is meaningless.

## 6. Extensions and Synthesis

**Perturbation theory as the language for "organizing experimental facts".** The fine structure of atomic spectra (relativistic corrections, spin–orbit coupling), the Lamb shift, and the Stark and Zeeman shifts of molecules — every small correction term in the experimental tables corresponds to some matrix element at some order of the perturbation expansion. Learning perturbation theory is learning to "read" the Hamiltonian term by term into physical effects.

**Connections with other methods.** The matrix version of the variational method (linear variation, diagonalizing $H_{ij}$ in a finite basis) is the workhorse of modern computational physics; the WKB approximation handles "slowly varying potentials", generalizing the square-barrier $e^{-2\kappa a}$ to $e^{-2\int \kappa dx}$; the Green's function method leads into quantum field theory. Together with the exact models of Chapter 3, the approximate methods of this chapter's formulas and numerical diagonalization, they form the complete main line of undergraduate quantum computation.

## 7. Worked Examples

**Example 5: The oscillator in a uniform electric field — the series truncates exactly.** Add the perturbation $H' = q\mathcal E x$. For the oscillator $x$ has only adjacent nonzero matrix elements: $\left|\langle n - 1|x|n\rangle\right|^2 = \frac{\hbar n}{2m\omega}$ and $\left|\langle n + 1|x|n\rangle\right|^2 = \frac{\hbar(n+1)}{2m\omega}$, so the second-order correction has only two terms:

$$E_n^{(2)} = \frac{q^2\mathcal E^2\, \hbar n/(2m\omega)}{+\hbar\omega} + \frac{q^2\mathcal E^2\, \hbar(n+1)/(2m\omega)}{-\hbar\omega} = -\frac{q^2\mathcal E^2}{2m\omega^2}$$

independent of $n$; and since all higher matrix elements vanish, the series **truncates exactly** at second order — in complete agreement with the exact solution (an oscillator with the equilibrium point shifted by $x_0 = -q\mathcal E/m\omega$, all levels lowered by $q^2\mathcal E^2/2m\omega^2$). Perturbation theory is not always "approximate": when selection rules make the series stop dead, it is exact. A vanishing first-order shift with a nonzero second order again reminds us that "first order zero ≠ the level does not move"; comparing the picture of a shifted equilibrium point with this example also verifies that the shifted oscillator has the same frequency and only a uniform downward shift of the levels.

**Example 6: A two-level system and avoided crossing.** Take the two-state basis $\{|1\rangle, |2\rangle\}$ and let $\hat H = \begin{pmatrix} E_1 & V\\ V & E_2 \end{pmatrix}$ ($V$ a real coupling matrix element). Diagonalizing gives

$$E_\pm = \frac{E_1 + E_2}{2} \pm \sqrt{\left(\frac{E_1 - E_2}{2}\right)^2 + V^2}$$

As a parameter is tuned so that $E_1 \to E_2$ the two levels do not cross but keep a minimum separation $2|V|$ — an **avoided crossing**; the eigenstates also change from "pure $|1\rangle$ / pure $|2\rangle$" to symmetric/antisymmetric combinations. This is both the minimal realization of degenerate perturbation theory (the near-degenerate case) and the minimal example of the linear variational method (with $|1\rangle, |2\rangle$ as variational basis): the two states of an ammonia maser and the Rabi oscillation of a qubit are both governed by this $2\times2$ matrix; and avoided crossings are the daily business of modern spectrum engineering (level tuning in quantum dots and superconducting qubits).`,
    keyPoints: [
      'Perturbation theory expands E as a power series in a small parameter λ, correcting order by order',
      'First-order shift = the average of the perturbation in the unperturbed state ⟨n|H′|n⟩',
      'The second-order shift involves "level repulsion": the ground state always moves down and the spacings widen',
      'Degeneracy requires diagonalizing H′ in the degenerate subspace first (the secular equation)',
      'Time-dependent perturbation theory gives transition probabilities; a periodic perturbation yields Fermi\'s golden rule',
      'The variational method gives a rigorous upper bound to the ground-state energy; the cleverer the trial function, the closer',
    ],
  },

  'identical-particles': {
    chapter: 'Chapter 7 Identical Particles',
    title: 'The Pauli Principle and Exchange Symmetry',
    summary:
      'Identical particles must be symmetric or antisymmetric under exchange: bosons and fermions part ways here, and the Pauli exclusion principle shapes the material world from atomic structure to the fate of stars.',
    content: String.raw`

No two leaves are identical, yet two electrons are completely identical: not only are their properties the same, but in principle they **cannot** be numbered — no experiment can tell "this is electron 1 and that is electron 2". This seemingly philosophical statement has hard physical consequences. Consider two particles in single-particle states $\psi_a$ and $\psi_b$; the products $\psi_a(1)\psi_b(2)$ and $\psi_a(2)\psi_b(1)$ are physically indistinguishable, and the true state must "package" the two: as the symmetric combination

$$\psi_+ = \frac{1}{\sqrt2}\left[\psi_a(1)\psi_b(2) + \psi_a(2)\psi_b(1)\right]$$

or the antisymmetric combination

$$\psi_- = \frac{1}{\sqrt2}\left[\psi_a(1)\psi_b(2) - \psi_a(2)\psi_b(1)\right]$$

Nature allows only these two ways of packaging, decided by the spin of the particle: particles with half-integer spin (electrons, protons, neutrons) always take the antisymmetric form — **fermions**; particles with integer spin (photons, $\pi$ mesons) always take the symmetric form — **bosons**. Antisymmetry brings the Pauli exclusion principle and underpins the periodic table and the fate of white dwarfs; symmetry brings Bose–Einstein condensation and the coherence of lasers. Indistinguishability is one of the most "non-classical" structures of quantum mechanics, yet it is the true legislator of the order of the material world.

## 2. Rigorous Definitions

**Exchange operator**: $\hat P_{12}$ exchanges all coordinates (space + spin) of the two particles: $\hat P_{12}\Psi(1, 2) = \Psi(2, 1)$. Since $\hat P_{12}^2 = \mathbb{1}$, its eigenvalues are only $\pm 1$:

$$\hat P_{12}\Psi_\pm = \pm\Psi_\pm$$

$\Psi_+$ is called a symmetric state and $\Psi_-$ an antisymmetric state.

**Symmetrized wave functions**: when the two particles occupy single-particle states $\psi_a, \psi_b$ (orthonormal),

$$\Psi_\pm(1, 2) = \frac{1}{\sqrt2}\left[\psi_a(1)\psi_b(2) \pm \psi_a(2)\psi_b(1)\right]$$

Key observation: if $\psi_a = \psi_b$ the antisymmetric combination is **identically zero** — two fermions cannot occupy the same single-particle state, which is exactly the **Pauli exclusion principle**. The symmetric combination remains nonzero when $a = b$, and normalizes to $\Psi = \psi_a(1)\psi_a(2)$.

**Spin and statistics**: the spin-statistics theorem of relativistic quantum field theory proves that particles of integer spin are bosons (symmetric under exchange) and particles of half-integer spin are fermions (antisymmetric). The total wave function = spatial part × spin part, and the overall symmetry is achieved by "division of labour" between the two: for fermions the spin singlet (antisymmetric) must be paired with a symmetric spatial wave function, and the spin triplet (symmetric) with an antisymmetric spatial wave function.

**Many-particle generalization**: the total wave function of $N$ fermions is antisymmetric under the exchange of any two, which is equivalent to a **Slater determinant**

$$\Psi = \frac{1}{\sqrt{N!}}\det\left[\psi_i(j)\right]_{i,j=1}^{N}$$

If two rows coincide the determinant vanishes — the matrix form of the exclusion principle. For bosons one takes the symmetrized permanent. (What the two have in common: exchanging any two particles multiplies the expression by a definite sign or leaves it unchanged — indistinguishability is hard-coded into the algebraic structure, no longer dependent on any bookkeeping convention.)

**Exchange correlation**: symmetrization changes the spatial correlation of the two particles. For $\Psi_\pm$ one computes

$$\langle x_1 x_2\rangle_\pm = \langle a|\hat x|a\rangle\langle b|\hat x|b\rangle \pm \left|\langle a|\hat x|b\rangle\right|^2$$

The $\pm$ in the cross term makes fermions tend to "avoid each other" (anti-correlation) and bosons to "cluster" (bunching) — with no interaction force at all, yet the effect is as if there were one, hence the name **exchange force / statistical correlation**.

## 3. Why We Understand It This Way

**Why must we symmetrize?** Indistinguishability means that "particle 1 in $a$, particle 2 in $b$" and "particle 1 in $b$, particle 2 in $a$" are **the same physical state**; the product wave function records them as two different states, violating indistinguishability. Taking the symmetric/antisymmetric combination of the two products amounts to "removing the labels". More deeply: the Hamiltonian of identical many-body systems is invariant under exchange and $\hat P_{12}$ is conserved — once a state is symmetric (antisymmetric) it stays so forever, and the symmetry never "leaks away".

**Why can bosons pile into one state but fermions not?** The antisymmetric combination vanishes identically when $a = b$: this is not "coincidentally difficult" but a structural prohibition of the wave function. The symmetric combination of bosons is instead enhanced when $a = b$: $N$ bosons can all pour into the same state, forming a macroscopically coherent **Bose–Einstein condensate** (first realized in rubidium vapour in 1995, a Nobel-prize work).

**The interference nature of the exchange term.** The $\pm|\langle a|x|b\rangle|^2$ in $\langle x_1x_2\rangle$ comes from the interference of two "indistinguishable paths" — particle 1 through $a$ and particle 2 through $b$, versus the two exchanged — and the two amplitudes add (constructive) or subtract (destructive). This is the same origin as double-slit interference: indistinguishable alternative processes must superpose coherently, and indistinguishability pushes this principle up to the level of particle "identity".

**What is Pauli pressure?** Electrons in a Fermi sea would all like to crowd into the lowest levels but are stacked upward by the exclusion principle until the Fermi energy. Compressing the system forces the Fermi energy up, producing a strong pressure resisting compression (degeneracy pressure) — white dwarfs rely on electron degeneracy pressure and neutron stars on neutron degeneracy pressure to resist gravity; it is often what keeps a dead star from collapsing into a black hole.

**Why are two "almost identical" particles not identical?** Identity is binary: either all intrinsic properties (mass, charge, spin, ...) coincide exactly and are in principle indistinguishable, or they are two distinguishable species. An electron and a muon differ only in mass and must still be treated separately; a proton and a neutron can be regarded as identical nucleons (an isospin doublet) only in the approximation that ignores electromagnetic effects. Whether to symmetrize depends on whether there is physically "a way to tell them apart", not on whether they "look alike".

## 4. Typical Calculations

**Example 1: Bosons and fermions in a well.** In a well of width $a$ the single-particle levels are $E_n = n^2E_1$. Two spin-0 bosons: both in $n = 1$ in the ground state, $E = 2E_1$, $\Psi = \psi_1(1)\psi_1(2)$; the first excited state $(1, 2)$ takes the symmetric combination, $E = 5E_1$. Two spin-0 fermions: the ground state forces one in $n = 1$ and one in $n = 2$, $E = E_1 + E_2 = 5E_1$ — the Pauli principle raises the ground-state energy directly.

**Example 2: States of a pair of spin-1/2 fermions.** Two electrons: symmetric space × spin singlet, or antisymmetric space × spin triplet, both legitimate. The ground state (both electrons in $n = 1$) can only take the former, $E = 2E_1$, non-degenerate; in the first excited state $(1, 2)$ both combinations are allowed, $E = 5E_1$, with degeneracy $3 + 1 = 4$ (the full construction is in the accompanying problems).

**Example 3: Parahelium and orthohelium.** For the excited configuration $1s\,2s$: antisymmetric space with a triplet spin is **orthohelium**, symmetric space with a singlet spin is **parahelium**. Exchange symmetry splits the two sets of levels, and parahelium $2^1S_0$ is metastable — the origin of the two sets of spectral lines in helium.

**Example 4: Estimating the Fermi energy.** For a metallic electron gas $E_F = \frac{\hbar^2}{2m}(3\pi^2 n)^{2/3}$; taking the electron density of copper $n \approx 8.5\times10^{28}\ \text{m}^{-3}$ gives $E_F \approx 7$ eV — far above the thermal energy at room temperature ($0.025$ eV), so the behaviour of the electrons is governed by the Pauli principle rather than by temperature; this is the origin of the anomalous specific heat of metals and of the quantum explanation of conductivity.

## 5. Common Misconceptions

**Misconception 1: symmetrizing "distinguishable" particles.** Symmetrization applies only to **identical** particles; an electron and a muon, though similar, are distinguishable and need no antisymmetrization. The test is "whether any experiment can tell them apart".

**Misconception 2: forgetting that spin also takes part in the exchange.** The exchange operator exchanges all coordinates, including spin. Antisymmetrizing only the spatial part while ignoring spin leads to the false conclusion that "two spin-1/2 electrons cannot both be in $n = 1$" — in a spin singlet they certainly can.

**Misconception 3: taking exchange degeneracy for physical degeneracy.** $\psi_a(1)\psi_b(2)$ and $\psi_a(2)\psi_b(1)$ are not two states but two wrong writings of one state; after symmetrization the "degeneracy" disappears and the levels do not split because of it.

**Misconception 4: thinking the Pauli principle is a "force".** It is not an interaction but a structural property of the antisymmetric wave function; "Pauli pressure" is the macroscopic manifestation of a statistical constraint and requires no modification of any interaction.

**Misconception 5: thinking a bosonic many-body state is just a single-particle state multiplied by the number of particles.** A bosonic many-body state must be symmetrized (or written in the particle-number representation $|n_1, n_2, \ldots\rangle$), and the normalization of an $N$-particle state depends on the occupation numbers; only when all particles occupy the same single-particle state can the product be written directly.

**Misconception 6: thinking Bose–Einstein condensation is "just many particles staying together".** The essence of a BEC is a macroscopic number of particles sharing **one and the same single-particle wave function**, the whole condensate being described by one macroscopic coherent wave function; when the temperature rises and particles fly out, the coherence is destroyed. It is the manifestation of "exchange symmetry" as a phase transition when $N$ reaches macroscopic scale, and the "occupation number" language of the particle-number representation $|n_1, n_2, \ldots\rangle$ exists precisely for this. Experimentally, the evidence for a BEC (a sharp peak in the velocity distribution, macroscopic interference fringes) belongs with superfluidity and lasers to the family of macroscopic coherence — all of them rest on Bose statistics, not on "high enough density"; note also that condensation requires particle-number conservation, so an equilibrium photon gas, whose photon number is not conserved, gives only black-body radiation and no condensate.

## 6. Extensions and Synthesis

**Second quantization and the particle-number representation.** The most economical language for identical many-body systems is that of creation and annihilation operators: $a_p^\dagger$ "adds one" identical particle to mode $p$. Bosons satisfy $[a_p, a_q^\dagger] = \delta_{pq}$ and fermions the anticommutation relations $\{c_p, c_q^\dagger\} = \delta_{pq}$ — the anticommutator automatically encodes the exclusion principle. The Hamiltonian, the symmetrized wave functions and the exchange correlations are all absorbed into the algebra, and the representation ideas of Chapter 4 and the ladder operators of Chapter 3 meet here.

**The fork in statistical physics.** Indistinguishability rewrites statistical mechanics: the Maxwell–Boltzmann distribution is replaced by the Bose–Einstein and Fermi–Dirac distributions. The former gives the photon gas (Planck's formula for black-body radiation), Bose–Einstein condensation and superfluidity; the latter gives the electron gas, the structure of white dwarfs and neutron stars, and the Fermi surface of semiconductors. The dividing line between the two is exactly the integer/half-integer nature of spin — the spin-statistics theorem straddles quantum mechanics and statistical physics.

**From the periodic table to chemistry.** The Pauli principle + the minimum-energy principle + Hund's rules → the shell structure of electrons → the quantum explanation of the periodicity of the elements; the saturation of covalent bonds (a hydrogen molecule can bond only two electrons with antiparallel spins) is a direct expression of the exclusion principle too. It is fair to say that the rulebook of chemistry is written with the antisymmetry of fermions. It is worth practising the symmetrized construction with the accompanying problems (identical particles in a well), and, after learning perturbation theory in Chapter 6, returning to the realistic case of "weak interaction between particles".

## 7. Worked Examples

**Example 5: A numerical glimpse of exchange correlation.** Two particles in a well occupy the orthogonal states $\psi_1, \psi_2$. The separation variance without symmetrization is $\langle (x_1 - x_2)^2\rangle_{\text{direct}} = 2\left(\langle x^2\rangle_1 - \langle x\rangle^2\right) = a^2\left(\frac{1}{6} - \frac{1}{\pi^2}\right) \approx 0.065\,a^2$; symmetrization adds $\mp 2|\langle 1|x|2\rangle|^2$, where the cross matrix element is $\langle 1|x|2\rangle = -\dfrac{16a}{9\pi^2}$, so $2|\cdot|^2 \approx 0.065\,a^2$. Hence

$$\langle (x_1 - x_2)^2\rangle_{\text{sym}} \approx 0.0005\,a^2 \ \text{(the two particles almost touch)}, \qquad \langle (x_1 - x_2)^2\rangle_{\text{anti}} \approx 0.13\,a^2 \ \text{(clearly avoiding each other)}$$

With no interaction at all, exchange symmetry alone produces the "bunching" of bosons and the "Fermi hole" of fermions — statistical correlation is a two-body effect unique to quantum mechanics, and lasers (photon bunching) and the metallic electron gas (Pauli blocking) are its two extreme incarnations.

**Example 6: The helium atom — symmetry, perturbation and variation in concert.** Ignoring the interaction between the electrons, the helium ground state is $1s^2$: the spatial wave function is symmetric, so the two electron spins must be antiparallel (a spin singlet) — the Pauli principle has already entered. Treating the electron repulsion $H' = \dfrac{e^2}{4\pi\varepsilon_0 r_{12}}$ as a perturbation, its first-order correction is

$$E^{(1)} = \frac{5Z}{4}\times 13.6\ \text{eV} \approx 34\ \text{eV} \qquad (Z = 2)$$

so $E \approx -108.8 + 34 = -74.8$ eV (experiment: $-79.0$ eV); introducing the effective charge $Z^* = 27/16$ by the variational method (each electron partly screens the nuclear charge seen by the other) improves the result to $-77.5$ eV. One problem strings together three main lines: symmetry decides the ground-state structure, perturbation theory gives the correction, and the variational method closes in further — exactly the standard procedure for dealing with real many-electron systems, and it naturally stitches Chapter 7 together with Chapters 6 and 5.`,
    keyPoints: [
      'Indistinguishability requires the wave function to be symmetric (bosons) or antisymmetric (fermions) under exchange',
      'Spin-statistics relation: integer spin ⇒ boson; half-integer spin ⇒ fermion',
      'Pauli exclusion: two fermions cannot occupy the same single-particle state',
      'The total fermion wave function (space × spin) is overall antisymmetric: the singlet pairs with symmetric space',
      'Exchange symmetry produces statistical correlation: fermions anti-correlate, bosons bunch',
      'The Pauli principle explains the periodic table, chemical bonds and the degeneracy pressure of white dwarfs',
    ],
  },
};

export default map;
