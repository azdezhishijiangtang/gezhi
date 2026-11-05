import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'early-models': {
    chapter: 'Chapter 1 Electrons and Early Models',
    title: 'The Thomson and Rutherford Models',
    summary:
      'From the discovery of the electron to Thomson\'s "plum pudding" model, and then to the nuclear structure revealed by Rutherford\'s scattering experiment, the picture of the atom was twice rebuilt from the ground up in the face of experimental fact.',
    keyPoints: [
      'J. J. Thomson measured the charge-to-mass ratio of the electron with cathode rays, proving the electron is a universal constituent of atoms',
      'Thomson\'s model spread positive charge uniformly through a sphere with electrons embedded in it, and could not explain large-angle scattering',
      'Rutherford\'s α-particle scattering experiment found that a few particles bounced back at large angles, showing that positive charge is concentrated in a tiny nucleus',
      'The scattering formula quantifies the deflection under the Coulomb repulsion and laid the foundation of the nuclear atom',
      'The nucleus measures about $10^{-15}\\,\\text{m}$, far smaller than the atomic scale $10^{-10}\\,\\text{m}$',
    ],
    content: String.raw`

By the end of the nineteenth century chemists already knew that the elements were made of atoms, yet the ancient creed "the atom is indivisible" still held sway. What truly broke it was a seemingly ordinary piece of apparatus—the cathode ray in an evacuated tube. When a high voltage is applied across a rarefied gas, the tube wall glows, showing that some invisible "ray" streams out of the cathode. In 1897 Thomson applied electric and magnetic fields to such rays and measured the ratio of charge to mass of the particles in them. He found the ratio was exactly the same no matter which gas or which electrode material was used, and concluded that the rays consist of tiny negatively charged particles present in all matter: the electron. The atom was no longer an indivisible steel ball; inside it hid smaller, negatively charged components.

Since the atom as a whole is electrically neutral, equal positive charge must accompany the negative electrons. What did that positive charge look like, and how was it arranged with the electrons? This question came immediately. Thomson proposed a simple and symmetric idea: spread the positive charge uniformly through a sphere the size of the atom, like jelly, and embed the electrons in it like raisins; each electron could oscillate slightly about its equilibrium position, and the oscillation frequency would correspond to the light emitted by the atom. This "plum pudding model" was quite popular for a while, because it roughly explained the stability of atoms and some spectral features. But it had a fatal weakness—it predicted that an incoming particle passing through the atom would be deflected only very slightly.

What really sank the model was Rutherford's scattering experiment. In 1909 Geiger and Marsden, under Rutherford's direction, bombarded an extremely thin gold foil with fast α particles from a radioactive source and placed fluorescent screens around it to count the particles scattered into each angle. According to the Thomson model, an α particle should be deflected by at most a few degrees. But the experiment recorded that the vast majority of α particles passed almost straight through, while a small fraction—about one in eight thousand—bounced back, deflected by more than $90^\circ$ and sometimes nearly $180^\circ$. Rutherford later remarked that it was like firing a shell at a sheet of paper and having the shell come back at you. Such violent deflection could only be produced by a center that is extremely small, extremely massive, and strongly positively charged, and so the nuclear model of the atom was born.

## 2. Rigorous Definitions and Formulas

**Charge-to-mass ratio of the electron**: in mutually perpendicular electric field $\vec{E}$ and magnetic field $\vec{B}$, let the cathode ray pass through undeflected; then the electric force balances the Lorentz force

$$eE = evB \quad\Rightarrow\quad v = \frac{E}{B}$$

Now remove the electric field; the particle moves in a circle in the pure magnetic field with radius $r$ satisfying

$$evB = \frac{mv^2}{r} \quad\Rightarrow\quad \frac{e}{m} = \frac{E}{B^2 r}$$

Thomson thus obtained $e/m \approx 1.76\times 10^{11}\,\text{C/kg}$, far larger than that of any ion known at the time, showing that the electron is extremely light.

**Rutherford scattering formula**: let the α particle have charge $2e$ and kinetic energy $E_k = \tfrac12 mv^2$, the nucleus charge $Ze$, and the impact parameter $b$. Under a pure Coulomb repulsion the orbit is a hyperbola, and the scattering angle $\theta$ is related to $b$ by

$$b = \frac{Ze^2}{4\pi\varepsilon_0\, 2E_k}\cot\frac{\theta}{2} = \frac{k}{2E_k}\cot\frac{\theta}{2},\qquad k = \frac{Ze^2}{4\pi\varepsilon_0}$$

The annulus of radius $b$ to $b+db$ around the target nucleus has area $2\pi b\,db$, corresponding to the solid angle $d\Omega = 2\pi\sin\theta\,d\theta$. The differential cross section for one target nucleus scattering into $d\Omega$ per unit area is

$$\frac{d\sigma}{d\Omega} = \left(\frac{Ze^2}{16\pi\varepsilon_0 E_k}\right)^2 \frac{1}{\sin^4(\theta/2)}$$

This is the celebrated Rutherford scattering formula, which agrees precisely with experiment over a wide range of angles.

**Distance of closest approach**: if the α particle heads straight at the nucleus (impact parameter $b=0$), all its kinetic energy becomes potential energy at the distance of closest approach $r_{\min}$

$$r_{\min} = \frac{1}{4\pi\varepsilon_0}\frac{2Ze^2}{E_k}$$

**Order of magnitude of the nuclear radius**: large-angle scattering implies a nuclear radius of about $R \sim 10^{-15}\,\text{m}$, while the whole atom has a radius of about $10^{-10}\,\text{m}$; the two differ by a factor of a hundred thousand, showing that the interior of the atom is extraordinarily empty.

## 3. Why We Understand It This Way

**Why do the vast majority of α particles barely deflect?** Most of the atom's volume is the empty region of the electron cloud; an α particle is larger and more energetic, passes far from the nucleus, and the Coulomb force falls off as the inverse square of distance, so the net force is negligible and it travels nearly in a straight line. This is exactly where the counterintuitive conclusion "the atom is mostly empty" comes from.

**Why are a very few bounced back at large angles?** Only when an α particle comes very close to the nucleus and enters the region of the strong Coulomb field does it feel a repulsion large enough to hurl it back. The smaller and more concentrated the nucleus, the rarer but more violent such "close encounters" are. The one-in-eight-thousand rebound probability implies that the nuclear cross-sectional area is only about one ten-thousandth of the atomic cross section.

**Why can't the Thomson model be saved?** Inside a uniformly charged sphere Gauss's theorem gives $E(r)\propto r$, zero at the center and largest at the surface, far too weak to deflect a fast α particle at atomic scales by a large angle. The Thomson model rules out the possibility of "bouncing back" on principle, and was therefore directly refuted by experiment.

**Why use α particles as probes?** An α particle is more than seven thousand times heavier than an electron, so the electrons deflect it negligibly; it carries $+2e$ and energies of order MeV, enough to "feel" the nuclear Coulomb field without being appreciably slowed—an ideal miniature projectile.

## 4. Typical Calculations

**Example 1: estimating the distance of closest approach to a gold nucleus.** Take the α-particle kinetic energy $E_k = 5.0\,\text{MeV}$ and the gold nucleus $Z=79$. Substitute into $r_{\min} = \dfrac{2Ze^2}{4\pi\varepsilon_0 E_k}$. Using $\dfrac{e^2}{4\pi\varepsilon_0} \approx 1.44\,\text{MeV}\cdot\text{fm}$,

$$r_{\min} = \frac{2\times 79 \times 1.44\,\text{MeV}\cdot\text{fm}}{5.0\,\text{MeV}} \approx 45.5\,\text{fm} = 4.55\times 10^{-14}\,\text{m}$$

This is of the same order as, though larger than, the later measured gold nuclear radius $R\approx 7\,\text{fm}$, showing that in the scattering the α particle never actually touches the nucleus and that the process remains Coulomb scattering.

**Example 2: scattering angle and impact parameter.** For $E_k = 5\,\text{MeV}$ and $Z=79$, find the impact parameter corresponding to a deflection $\theta = 90^\circ$. From $b = \dfrac{Ze^2}{4\pi\varepsilon_0\cdot 2E_k}\cot 45^\circ$,

$$b = \frac{79\times 1.44}{2\times 5.0}\,\text{fm} \approx 11.4\,\text{fm}$$

So a $90^\circ$ deflection occurs once the impact parameter shrinks to about ten or so femtometres, further confirming that only very close approaches to the nucleus are dangerous.

**Example 3: numerical value of the differential cross section.** Compute the differential cross section at $\theta=90^\circ$ for $E_k = 5\,\text{MeV}$

$$\frac{d\sigma}{d\Omega} = \left(\frac{79 e^2}{16\pi\varepsilon_0\cdot 5\,\text{MeV}}\right)^2 = \left(\frac{79\times 1.44\,\text{MeV}\cdot\text{fm}}{16\times 5\,\text{MeV}}\right)^2 \approx (1.42\,\text{fm})^2 \approx 2.0\,\text{fm}^2$$

The dimension is area, of the same order as the nuclear cross section.

## 5. Common Misconceptions

**Misconception 1: the Rutherford model explains atomic stability.** No. The nuclear model only says that the positive charge is concentrated, but leaves a fatal contradiction: an electron orbiting the nucleus would radiate electromagnetic waves and collapse almost instantly, giving the atom a lifetime of less than an instant under classical electrodynamics. True stability requires quantum theory, which is the starting point of Bohr's model in the next chapter.

**Misconception 2: electrons sit still on fixed orbits like planets.** In the early nuclear model, an electron at rest would be pulled into the nucleus; if it orbits, it must radiate. Rutherford himself was aware of this difficulty: the model is a structural description, not a complete dynamical answer.

**Misconception 3: the scattering cross-section formula applies at all angles.** When the incident energy is high enough to penetrate the Coulomb barrier, or the distance is small enough for nuclear forces to act, the pure Coulomb formula fails and nuclear reactions and the strong interaction must be included.

**Misconception 4: α particles are "knocked" back by electrons.** An α particle is far heavier than an electron, and a collision with an electron can at most slow it slightly, never cause a large-angle rebound; the rebound can only come from the Coulomb repulsion of a heavy, small nucleus.

**Misconception 5: the Thomson model was worthless.** Though refuted, it was the first to connect the internal structure of the atom with the electron and it inspired later models; in the history of science, "models refuted by experiment" are also rungs on the ladder of progress.

## 6. Extensions and Synthesis

Rutherford scattering has grown into a general tool for probing the microscopic structure of matter: by bombarding a target with an ion beam and measuring the energy spectrum and angular distribution of the scattered particles, one can infer the charge distribution of the target nuclei, estimate nuclear radii, and even probe the diffuseness of the nuclear surface. Extending the scattering formula to relativistic cases and many-body corrections underlies Rutherford backscattering spectrometry (RBS) in nuclear physics and materials analysis.

From a broader viewpoint, the discovery of the electron and the establishment of the nuclear model mark the moment atomic physics moved from chemistry's "table of elements" to the experimentally accessible study of "internal structure". The stability crisis it left behind was precisely the opening for Planck's and Einstein's quantum ideas—in the next chapter we shall see how Bohr resolves the crisis at a stroke with "stationary states" and "quantization conditions", giving the first quantitative answer for the hydrogen energy levels.

## 7. How Science Corrects Itself: The Clash of Models

Looking back at the turn from Thomson to Rutherford, we find a pattern that recurs throughout the history of science: a widely accepted model is usually not falsified by internal logic, but dragged down by a seemingly tiny experimental anomaly that the old framework cannot accommodate. For several years after it was proposed the Thomson model showed no obvious flaw; it explained why atoms are neutral and where the electrons come from, and could give rough accounts of some spectra. What was truly fatal was that roughly one ten-thousandth of particles bouncing back in Rutherford's scattering. In the eyes of many colleagues this was a negligible deviation; for Rutherford it was precisely the doorway to a new world the old framework had missed.

This style of research, which uses anomalous data as a breakthrough, remains the methodological core of experimental physics. Students doing experiments today are often reminded not to hurry to dismiss data that deviate from theory as errors, because undiscovered phenomena may be hiding there. Rutherford later pushed this spirit to its limit, using a similar scattering idea to probe the nucleus itself and founding the vast field of nuclear physics. It is fair to say that the discovery of the electron and the establishment of the nuclear model are not just a set of concrete conclusions, but a way of thinking about how to trust experiment and how to correct theory.

It is also worth noting that a model being superseded does not make it worthless. Though the Thomson model failed as a structural description, it was the first to put the internal structure of the atom on the table, and it produced a computable electron charge-to-mass ratio. Scientific progress is rarely a matter of tearing everything down; more often it is judging afresh, on the old foundation, which assumptions must be kept and which must be discarded. Recognizing this lets us face the more abstract quantum theory to come without worshipping early models and without belittling the groundwork they laid.

Finally, the Rutherford scattering experiment also incidentally established the order-of-magnitude distinction between the atomic scale and the nuclear scale, a distinction verified again and again by countless experiments since. The overwhelming volume of the atom is indeed empty, the electrons are scattered through it like dust, while the mass and positive charge are compressed into an extremely small nucleus at the center. This extreme inhomogeneity completely changed our intuition about how dense matter is, and foreshadowed all later understanding of the properties of the nucleus itself.`,
  },

  'bohr-model': {
    chapter: 'Chapter 2 The Bohr Model of the Atom',
    title: 'Stationary States and Quantization Conditions',
    summary:
      'With the stationary-state postulate and quantized angular momentum at its core, Bohr derived the hydrogen energy levels and orbital radii semi-classically, giving atomic spectra a computable physical basis for the first time.',
    keyPoints: [
      'Stationary-state postulate: an electron moving on certain circular orbits does not radiate and occupies a state of definite energy',
      'Angular-momentum quantization $L = n\\hbar$ is the model\'s central ad hoc condition',
      'Bohr radius $a_0 = 4\\pi\\varepsilon_0\\hbar^2/(m_e e^2) \\approx 0.529\\,\\text{Å}$',
      'Hydrogen levels $E_n = -13.6\\,\\text{eV}/n^2$, from which the Rydberg constant follows',
      'The Bohr model explains hydrogen spectra successfully but cannot handle many-electron atoms or line intensities',
    ],
    content: String.raw`

The previous chapter left a glaring problem: by classical electromagnetism, an electron orbiting a nucleus must radiate energy and spiral into the nucleus, giving the atom a lifetime of less than a nanosecond; yet real atoms are rock solid and even emit discrete bright-line spectra. In 1913 Bohr, building on Rutherford's model, boldly borrowed the quantum ideas of Planck and Einstein and proposed three mutually supporting postulates that cut this knot.

Bohr's idea can be summed up in one sentence: an electron cannot exist stably on an arbitrary orbit; only certain "special orbits" are selected by quantum rules, and while the electron stays on them it emits no light and its energy is conserved. Only when the electron jumps from a higher orbit to a lower one does it release the energy difference as a photon, whose frequency is fixed by that difference. In this way the stability of atoms (no radiation in a stationary state) and the discreteness of spectra (radiation only during transitions) are explained at the same time. The "small nucleus" picture of the nuclear model is preserved, while quantization patches the fatal wound of classical theory.

## 2. Rigorous Definitions and Derivation

**Angular-momentum quantization condition**: Bohr assumed that when the electron moves on the $n$-th circular orbit, its orbital angular momentum can only take

$$L = m_e v r = n\hbar,\qquad n = 1,2,3,\dots$$

where $\hbar = h/(2\pi)$ and $n$ is called the principal quantum number. This is an artificial postulate of the model; it was later derived naturally from de Broglie's matter waves.

**Orbital radius**: the Coulomb attraction of the nucleus supplies the centripetal force

$$\frac{1}{4\pi\varepsilon_0}\frac{e^2}{r^2} = \frac{m_e v^2}{r}$$

Combining with $m_e v r = n\hbar$ to eliminate $v$ gives the radius of the $n$-th orbit

$$r_n = \frac{4\pi\varepsilon_0\hbar^2}{m_e e^2}\, n^2 = a_0 n^2$$

where

$$a_0 = \frac{4\pi\varepsilon_0\hbar^2}{m_e e^2} \approx 5.29\times 10^{-11}\,\text{m} = 0.529\,\text{Å}$$

is called the Bohr radius, the basic length scale of atomic physics.

**Energy levels**: the total energy is kinetic plus potential

$$E_n = \frac12 m_e v^2 - \frac{1}{4\pi\varepsilon_0}\frac{e^2}{r_n} = -\frac{1}{4\pi\varepsilon_0}\frac{e^2}{2r_n}$$

Substituting $r_n$ gives

$$E_n = -\frac{m_e e^4}{2(4\pi\varepsilon_0)^2\hbar^2}\frac{1}{n^2} \equiv -\frac{13.6\,\text{eV}}{n^2}$$

The ground-state energy at $n=1$ is $-13.6\,\text{eV}$, exactly the minimum energy needed to remove the electron from hydrogen entirely (the ionization energy).

**Transition frequency (Bohr frequency condition)**:

$$h\nu = E_{n_2} - E_{n_1},\qquad n_2 > n_1$$

This is the physical origin of discrete spectra.

## 3. Why We Understand It This Way

**Why angular momentum of all things?** Bohr needed a switch that turns "infinitely many possible orbits" into "a finite set of allowed orbits". Angular momentum $L=n\hbar$ was chosen because it is the simplest, and because when combined with the later de Broglie wavelength $\lambda = h/p$, the circumference of the circular orbit contains exactly an integer number of matter wavelengths, $2\pi r = n\lambda$, making the standing-wave condition hold naturally—quantization is not invented from nothing but an expression of wave nature.

**Why does a stationary state not radiate?** This directly denies classical electrodynamics, but experience forces it: without assuming stationary states are stable, the atom would collapse instantly, contradicting fact. Bohr redefined "radiation" as a "transition event" rather than "the necessary consequence of an accelerating charge"—a revolution in conception.

**Why are the energy levels negative?** Taking the potential energy of the electron at infinity as zero, the total energy of any bound state is below zero (the kinetic energy is not enough to escape). $E_n<0$ is precisely the signature of an electron bound to the nucleus; as $n\to\infty$, $E\to 0$, corresponding to the ionization limit.

**Why is $E_n\propto 1/n^2$?** The radius grows as $n^2$ and the Coulomb potential energy shrinks as $1/r\propto 1/n^2$ (becoming less negative), so the total energy approaches zero as $1/n^2$; the levels crowd together as $n$ grows, which is clearly visible in the spectra of highly excited states.

## 4. Typical Calculations

**Example 1: speed in the first Bohr orbit.** From $v_n = \dfrac{e^2}{4\pi\varepsilon_0\hbar}\dfrac{1}{n}$, for the ground state

$$v_1 = \frac{e^2}{4\pi\varepsilon_0\hbar} \approx \alpha c \approx \frac{c}{137} \approx 2.19\times 10^6\,\text{m/s}$$

where $\alpha = e^2/(4\pi\varepsilon_0\hbar c)\approx 1/137$ is the fine-structure constant, showing that although fast, the electron moves far slower than light, so the non-relativistic approximation is justified.

**Example 2: ionization energy.** With $E_1 = -13.6\,\text{eV}$, ionizing requires $13.6\,\text{eV}$. This matches the measured ionization energy of hydrogen exactly—the most beautiful victory of the Bohr model.

**Example 3: the first Lyman line.** The $n=2\to n=1$ transition energy

$$\Delta E = E_2 - E_1 = -13.6\left(\frac14 - 1\right) = 10.2\,\text{eV}$$

corresponds to the wavelength $\lambda = hc/\Delta E \approx 1240/10.2 \approx 121.6\,\text{nm}$, in the ultraviolet, in agreement with experiment.

## 5. Common Misconceptions

**Misconception 1: the Bohr model is a purely quantum theory.** It is only "semi-classical"—the orbits are still definite classical circles, with quantization conditions imposed on top. The model cannot say "how" the electron jumps between orbits, or how long a transition takes.

**Misconception 2: the electron can be pictured drawing a circle at constant speed.** In fuller quantum mechanics the electron has no definite orbit, only a probability cloud; the Bohr orbit is only an approximation to the mean radius and must not be taken as a classical trajectory.

**Misconception 3: the Bohr model applies to all atoms.** It gives exact results only for hydrogen and hydrogen-like ions (one electron); electron–electron interactions make it fail quickly for many-electron atoms, which require full quantum mechanics.

**Misconception 4: the $13.6\,\text{eV}$ in the level formula is an exact universal constant.** For a hydrogen-like ion of nuclear charge $Z$ it should be $13.6 Z^2\,\text{eV}/n^2$; and finite nuclear mass plus relativistic corrections introduce small deviations.

**Misconception 5: the quantization condition is derived.** In Bohr's scheme it is a postulate; the real "derivation" comes from the eigenvalue problem of the Schrödinger equation, and Bohr's condition is only an approximation to its circular-orbit case with $l=n-1$.

## 6. Extensions and Synthesis

The success of the Bohr model is not limited to hydrogen. Replacing the nuclear charge by $Ze$ and the electron mass by the reduced mass $\mu$, it immediately gives the levels of hydrogen-like ions (such as He$^+$, Li$^{2+}$), $E_n = -13.6 Z^2\,\text{eV}/n^2$, in excellent agreement with the spectra of highly charged ions. This extension is extremely useful in astrophysics and plasma diagnostics.

More profoundly, the "stationary state–transition" framework Bohr proposed directly gave birth to the old quantum theory and paved the way for Heisenberg's matrix mechanics and Schrödinger's wave mechanics. The principal quantum number $n$, the discrete levels, and the selection rules we see in quantum mechanics today can all find their naive prototypes in Bohr's picture. In the next chapter we follow this thread to study the series regularities of the hydrogen spectrum and the Rydberg formula, and see how Bohr's predictions fit a mass of experimental data with hardly a seam.

## 7. Limits of the Bohr Model and Its Theoretical Legacy

Though the Bohr model scored a great success with hydrogen, its boundaries are equally clear. First, it cannot explain the spectra of many-electron atoms, because electron–electron interactions simply cannot be handled cleanly in the classical picture; second, it is nearly helpless about line intensities, selection rules, and why lines appear only between particular transitions; third, it assumes the electron has a definite orbit yet cannot say what the electron actually undergoes during a transition—transition times and paths are blank. These defects show that the Bohr model is a stepping stone to the full quantum theory, not the destination.

Yet the value of a stepping stone should not be underestimated. Bohr's concept of the stationary state was later reformulated in quantum mechanics as an energy eigenstate; the quantization condition was derived naturally from de Broglie matter waves; the frequency condition corresponds to the selection rule that the transition matrix element be nonzero. In other words, the seemingly arbitrary assumptions of the old quantum theory found their place in a deeper theory. In the process Bohr also formulated the correspondence principle, arguing that quantum theory should return to classical results in the limit of large quantum numbers; this principle guided the construction of countless semi-empirical formulas and became a bridge between the old and new theories.

More broadly, the Bohr model displays a common pattern of success in physics: when an old theory fails completely on a class of problems, first propose a transitional model with artificial assumptions, use it to capture the dominant features, and then wait for a fuller theory to digest those assumptions. Hydrogen thus became the first touchstone for any new atomic theory, from the Schrödinger equation to relativistic quantum mechanics. Understanding this piece of history helps us grasp the real rhythm of theoretical physics better than memorizing a few formulas.

Moreover, the Bohr model had a profound influence on chemistry. It was the first to link atomic stability with discrete energy levels, hinting at regularity in electron arrangement, and so paved the way for the Pauli exclusion principle and the quantum explanation of the periodic table. A model that belonged to atomic physics thus seeped into the deepest logic of chemistry. When we say today that an atom is in its ground or excited state, we are using Bohr's language.

From a teaching standpoint, the Bohr model has another irreplaceable merit: it is simple enough to be derived completely with high-school circular motion and Coulomb's law, yet it gives numerical results in close agreement with experiment. This simple yet profound character makes it an excellent starting point for introducing quantum concepts in physics textbooks. Students need not be frightened by wave functions and operators at the outset; they can first appreciate the power of quantization in a familiar classical picture and then gradually move to more abstract formulations. Good physics teaching is often exactly like this: using a cane one can hold, leading a person into a wilderness that once looked forbidding.

Returning to Bohr's own philosophy of science, he also proposed the famous complementarity principle, arguing that a microscopic object displays wave and particle pictures that are complementary and cannot appear at the same time under different experimental arrangements. Although complementarity belongs more to the interpretation of quantum mechanics, it is of one piece with the anomaly-driven thinking embodied in the Bohr model, and together they form the basic attitude of the Copenhagen school toward the quantum world. Understanding Bohr is therefore not only understanding an atomic model, but also understanding how twentieth-century physics views the relation between observation, reality, and theory.

## 8. Full Derivation of the Energy Formula and Numerical Checks

Section 2 gave the orbital radius and the energy levels directly; this section fills in the algebra and performs one dimensional check and one numerical check. The purpose is to let you confirm that these formulas are not memorized but can be recomputed by hand.

Start from the two basic relations—the Coulomb attraction acting as centripetal force, and the quantization of angular momentum:

$$\frac{1}{4\pi\varepsilon_0}\frac{e^2}{r^2} = \frac{m_e v^2}{r},\qquad m_e v r = n\hbar$$

Solving the second for $v = n\hbar/(m_e r)$ and substituting into the right side of the first:

$$\frac{m_e}{r}\cdot\left(\frac{n\hbar}{m_e r}\right)^2 = \frac{n^2\hbar^2}{m_e r^3} = \frac{1}{4\pi\varepsilon_0}\frac{e^2}{r^2}$$

Multiplying both sides by $r^3$ and rearranging gives the radius of the $n$-th orbit

$$r_n = \frac{4\pi\varepsilon_0\hbar^2}{m_e e^2}\,n^2 = a_0 n^2$$

**Dimensional check**: in SI units, $[\varepsilon_0] = \mathrm{C^2\,N^{-1}m^{-2}}$, $[\hbar] = \mathrm{J\,s} = \mathrm{kg\,m^2\,s^{-1}}$, $[m_e] = \mathrm{kg}$, $[e] = \mathrm{C}$, hence

$$[a_0] = \frac{[\varepsilon_0][\hbar]^2}{[m_e][e^2]} = \frac{\mathrm{C^2 N^{-1} m^{-2}}\cdot \mathrm{kg^2 m^4 s^{-2}}}{\mathrm{kg}\cdot \mathrm{C^2}} = \frac{\mathrm{kg\,m^2\,s^{-2}}}{\mathrm{N}} = \mathrm{m}$$

exactly a unit of length: the formula is dimensionally consistent.

**Numerical check**: substituting $\varepsilon_0 = 8.854\times10^{-12}\ \mathrm{F/m}$, $\hbar = 1.055\times10^{-34}\ \mathrm{J\,s}$, $m_e = 9.109\times10^{-31}\ \mathrm{kg}$, $e = 1.602\times10^{-19}\ \mathrm{C}$,

$$a_0 = \frac{4\pi\times 8.854\times10^{-12}\times (1.055\times10^{-34})^2}{9.109\times10^{-31}\times (1.602\times10^{-19})^2}\ \mathrm{m} \approx 5.29\times10^{-11}\ \mathrm{m} = 0.529\ \text{Å}$$

**Energy**: the force-balance equation gives a neat relation between kinetic and potential energy. Multiplying both sides by $r$ gives $m_e v^2 = e^2/(4\pi\varepsilon_0 r)$, so

$$K = \frac12 m_e v^2 = \frac{e^2}{8\pi\varepsilon_0 r},\qquad U = -\frac{e^2}{4\pi\varepsilon_0 r}\quad\Longrightarrow\quad K = -\frac12 U$$

that is, a particle bound in a Coulomb potential satisfies $K = -U/2$ (the virial theorem for $V\propto 1/r$). The total energy $E = K + U = U/2 = -e^2/(8\pi\varepsilon_0 r)$; substituting $r = a_0 n^2$ gives

$$E_n = -\frac{e^2}{8\pi\varepsilon_0 a_0}\cdot\frac{1}{n^2} = -\frac{m_e e^4}{2(4\pi\varepsilon_0)^2\hbar^2}\cdot\frac{1}{n^2}$$

Checking the ground-state value once more:

$$E_1 = -\frac{(1.602\times10^{-19})^2}{8\pi\times 8.854\times10^{-12}\times 5.29\times10^{-11}}\ \mathrm{J} \approx -2.18\times10^{-18}\ \mathrm{J}$$

Dividing by $1\ \mathrm{eV} = 1.602\times10^{-19}\ \mathrm{J}$ gives $E_1 \approx -13.6\ \mathrm{eV}$, in close agreement with the measured ionization energy. The habit of "check dimensions first, substitute numbers later" is a reliable safeguard against order-of-magnitude errors in atomic physics calculations.

## 9. Worked Comprehensive Example

**Problem: radius, transition wavelength, and re-ionization energy of the singly ionized helium ion He$^+$.**

For hydrogen-like ions one need only replace $e^2$ by $Ze^2$. Given the He$^+$ nuclear charge $Z=2$ and neglecting nuclear motion: (1) find the ratio of the ground-state orbital radius to the Bohr radius; (2) find the wavelength of the photon emitted in the $n=3\to n=2$ transition; (3) find the minimum photon energy needed to ionize He$^+$ again from the $n=2$ excited state. Take $hc = 1240\ \mathrm{eV\cdot nm}$.

**Step 1: radius.** The generalized radius is $r_n = a_0 n^2/Z$, hence

$$r_1(\mathrm{He^+}) = \frac{a_0}{2} = \frac{0.529\ \text{Å}}{2} \approx 0.265\ \text{Å}$$

Doubling the nuclear charge pulls the electron closer and halves the orbit radius—the most direct qualitative judgment.

**Step 2: transition wavelength.** The hydrogen-like levels are $E_n = -13.6\,Z^2/n^2\ \mathrm{eV} = -54.4/n^2\ \mathrm{eV}$. Thus

$$\Delta E = E_3 - E_2 = -54.4\left(\frac{1}{9} - \frac{1}{4}\right)\ \mathrm{eV} = -54.4\times(-0.1389)\ \mathrm{eV} \approx 7.56\ \mathrm{eV}$$

$$\lambda = \frac{hc}{\Delta E} = \frac{1240\ \mathrm{eV\cdot nm}}{7.56\ \mathrm{eV}} \approx 164\ \mathrm{nm}$$

This lies in the far ultraviolet and belongs to the Pickering series of He$^+$; the experimental value is about $164.0\ \mathrm{nm}$, differing by less than one percent, with the residual mainly from the reduced-mass correction due to the finite nuclear mass.

**Step 3: re-ionization energy from $n=2$.** The ionization energy equals the absolute value of the binding energy of that level:

$$E_{\text{ion}} = |E_2| = \frac{54.4}{4}\ \mathrm{eV} = 13.6\ \mathrm{eV},\qquad \lambda = \frac{1240}{13.6}\ \mathrm{nm} \approx 91.2\ \mathrm{nm}$$

**A point worth savoring**: this number happens to equal the ionization energy of hydrogen in its ground state. The reason is that $Z^2/n^2 = 4/4 = 1$: doubling the nuclear charge and doubling the principal quantum number exactly cancel. Understanding the scaling relations behind such "coincidences" is far more useful than remembering isolated numbers.

## 10. Self-Check List and Error Traps Revisited

- **Do not swap the positions of $Z$ and $n$**: levels scale as $Z^2/n^2$, radii as $n^2/Z$. One misplaced factor and the answer is off by a power of $Z$.
- **Transition energy is upper minus lower**: $h\nu = E_{\text{upper}} - E_{\text{lower}}$, which is positive; if you subtract the other way and get a negative value, take its absolute value.
- **Be fluent with unit conversions**: $1\ \mathrm{eV} = 1.602\times10^{-19}\ \mathrm{J}$, $hc = 1240\ \mathrm{eV\cdot nm}$. When the wavelength is given in $\mathrm{nm}$, the energy in $\mathrm{eV}$ follows directly from $E = 1240/\lambda$.
- **Do not forget the reduced mass**: accurate work should replace $m_e$ by $\mu = m_e M/(m_e+M)$, a correction of about five parts in ten thousand for hydrogen, non-negligible in high-resolution spectroscopy.
- **Do not take the Bohr orbit literally**: the radius $a_0 n^2$ is only the average scale of the probability distribution; the quantum ground-state cloud has maximum probability density at $r=a_0$, but the electron has no definite trajectory.

**A self-check question**: if a spectral line of some hydrogen-like ion has exactly one quarter of the wavelength of the same transition in hydrogen, what is $Z$? (Answer: since $\Delta E\propto Z^2$ and $\lambda\propto 1/\Delta E$, we get $\lambda\propto 1/Z^2$, hence $Z^2 = 4$ and $Z = 2$, i.e. He$^+$.) If you can answer this quickly, you have truly mastered the core scaling relations of the Bohr model and can carry them into the next chapter's discussion of spectral series.`,
  },

  'hydrogen-spectrum': {
    chapter: 'Chapter 3 The Hydrogen Spectrum',
    title: 'The Balmer Series and the Rydberg Formula',
    summary:
      'The hydrogen spectrum shows discrete series, and the Balmer series together with the Rydberg formula unifies the line wavelengths in one compact empirical law, for which Bohr theory supplies the microscopic foundation.',
    keyPoints: [
      'The Rydberg formula $\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)$ describes hydrogen lines as a whole',
      'The Balmer series has $n_f=2$ and lies in the visible; the Lyman series with $n_f=1$ is ultraviolet',
      'The Rydberg constant $R_\\infty \\approx 1.097\\times 10^7\\,\\text{m}^{-1}$ becomes $R_H$ once nuclear mass is included',
      'A series limit corresponds to ionization into the continuum; its energy is the ionization energy',
      'Fine structure splits each principal line into closely spaced doublets',
    ],
    content: String.raw`

In the middle of the nineteenth century people used prisms to decompose the light of stars and gas discharge tubes, and found that hydrogen does not emit a continuous rainbow but a number of discrete bright lines, each at a precise wavelength. Earlier, in 1885, Balmer fitted an empirical formula to the visible hydrogen lines and predicted the positions of lines not yet observed, with astonishing accuracy. This pattern—empirical formula first, theoretical explanation later—recurs throughout atomic physics, and the hydrogen spectrum is its cleanest, most orderly specimen.

These lines are not scattered at random but group into "series": each group crowds towards shorter wavelengths and approaches a limiting wavelength, beyond which lies a continuum. The key to this structure is exactly the energy ladder of Bohr's previous chapter—every line is a photon released when an electron jumps from some higher level to some lower one, with the wavelength fixed uniquely by the energy difference. The mysterious empirical formula thus acquires a microscopic origin at once.

## 2. Rigorous Definitions and Formulas

**Rydberg formula**: the wavenumber (reciprocal wavelength) of hydrogen can be written

$$\tilde{\nu} = \frac{1}{\lambda} = R_H\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right),\qquad n_i > n_f = 1,2,3,\dots$$

where $R_H$ is the Rydberg constant for hydrogen.

**Theoretical value of the Rydberg constant**: comparing the Bohr levels $E_n = -\dfrac{R_H hc}{n^2}$ with $E_n = -\dfrac{\mu e^4}{2(4\pi\varepsilon_0)^2\hbar^2 n^2}$ gives

$$R_\infty = \frac{m_e e^4}{8\varepsilon_0^2 h^3 c} \approx 1.097373\times 10^7\,\text{m}^{-1}$$

Since the nucleus is not infinitely heavy, $m_e$ should be replaced by the reduced mass $\mu = \dfrac{m_e M}{m_e+M}$, giving

$$R_H = R_\infty \frac{\mu}{m_e} = R_\infty\left(1 - \frac{m_e}{M_p}\right) \approx 1.09678\times 10^7\,\text{m}^{-1}$$

**The series**: fixing the final state $n_f$ and letting $n_i = n_f+1, n_f+2, \dots$ produces one series:

- Lyman series $n_f=1$ (ultraviolet),
- Balmer series $n_f=2$ (visible),
- Paschen series $n_f=3$ (near infrared),
- Brackett $n_f=4$, Pfund $n_f=5$, etc. (infrared).

**Series limit**: as $n_i\to\infty$,

$$\frac{1}{\lambda_{\lim}} = \frac{R_H}{n_f^2}$$

corresponding to the electron falling from the ionization continuum to level $n_f$, or equivalently the minimum energy $\Delta E = hcR_H/n_f^2$ needed to ionize from $n_f$.

**Original form of the Balmer formula**:

$$\lambda = B\,\frac{n^2}{n^2 - 4},\qquad B\approx 364.6\,\text{nm},\quad n=3,4,5,\dots$$

which is precisely the Rydberg formula for $n_f=2$.

## 3. Why We Understand It This Way

**Why do lines form series that converge to a limit?** The level spacing decreases as $n$ grows, so when jumping back to the same final state from ever higher excited states the photon energy increment shrinks, the wavelengths become shorter and crowd together, and finally tend to a limit—a geometric reflection of the ladder's steps becoming denser at high $n$.

**Why is the Balmer series exactly in the visible?** The final state $n_f=2$ has energy about $-3.4\,\text{eV}$; photons from adjacent higher states carry $1.9\sim 3.4\,\text{eV}$, corresponding to wavelengths of about $365\sim 656\,\text{nm}$, straddling the visible and the near-ultraviolet edge, which is why the human eye saw this series first.

**Why does the Rydberg constant differ for hydrogen and hydrogen-like ions?** The reduced-mass correction varies with nuclear mass: the heavier the nucleus, the closer to $R_\infty$; the lighter, the larger the deviation. Precise measurement of $R$ also yields the nuclear mass ratio, and historically this led to the discovery of isotope effects.

**Why do spectral lines show fine splitting?** Relativistic corrections and spin–orbit coupling split each $n,l$ level further, turning a single line into a close doublet or multiplet. This is the electron spin and fine structure to be explored in the next chapter.

## 4. Typical Calculations

**Example 1: the Balmer $H_\alpha$ line.** $n_i=3\to n_f=2$:

$$\frac{1}{\lambda} = R_H\left(\frac14 - \frac19\right) = R_H\cdot\frac{5}{36}$$

$$\lambda = \frac{36}{5R_H} \approx \frac{36}{5\times 1.0968\times 10^7} \approx 6.563\times 10^{-7}\,\text{m} = 656.3\,\text{nm}$$

the bright red $H_\alpha$ line.

**Example 2: the Lyman limit.** $n_f=1,\ n_i\to\infty$:

$$\lambda_{\lim} = \frac{1}{R_H} \approx 91.18\,\text{nm}$$

in the far ultraviolet, corresponding to the $13.6\,\text{eV}$ needed to ionize from the ground state.

**Example 3: the first Paschen line.** $n_i=4\to n_f=3$:

$$\frac{1}{\lambda} = R_H\left(\frac19 - \frac1{16}\right) = R_H\cdot\frac{7}{144}$$

$$\lambda \approx \frac{144}{7\times 1.0968\times 10^7} \approx 1.875\,\mu\text{m}$$

in the infrared, requiring an infrared spectrometer.

## 5. Common Misconceptions

**Misconception 1: the Rydberg formula is purely empirical with no theory.** It does have an empirical origin, but Bohr theory derives its entire structure from first principles, including the expression for $R$—a model case of theory repaying experience.

**Misconception 2: all hydrogen lines are in the visible.** Only the Balmer series is visible; the Lyman series is ultraviolet and the rest infrared, so the eye sees only a small fraction.

**Misconception 3: there are denser lines beyond the series limit.** Beyond the limit lies the continuum (the ionization region), with no discrete lines but a continuous absorption/emission band.

**Misconception 4: the Rydberg constant is one constant valid everywhere.** It differs slightly for different atoms and isotopes; for many-electron atoms a quantum defect must be introduced and the formula is no longer so compact.

**Misconception 5: shorter wavelength means lower energy.** No: $E=hc/\lambda$, so shorter wavelength means higher frequency and higher energy; the short-wavelength direction toward the limit corresponds to larger transition energies.

## 6. Extensions and Synthesis

The spirit of the Rydberg formula—"level differences determine lines"—is the cornerstone of atomic spectroscopy. Generalized to many-electron atoms, inner-shell screening requires rewriting it as $\tilde\nu = R/(n-\delta)^2$, where $\delta$ is the quantum defect, different for states of different angular momentum; this is how the complex spectra of alkali and noble-gas atoms are labelled.

In astrophysics the Balmer lines of hydrogen (especially $H_\alpha$, $H_\beta$) are the workhorses for measuring stellar temperatures, galactic redshifts, and the interstellar medium: how much the lines are redshifted tells us how fast the object recedes, and the strength of absorption lines reveals the composition and temperature of stellar atmospheres. From the discharge tube in the laboratory to distant galaxies, the simple line of the Rydberg formula threads together microscopic quantum laws and the macroscopic cosmic picture—exactly what makes atomic physics so fascinating.

## 7. Methodological Significance and Modern Extensions of Spectroscopy

The mutual confirmation of the Rydberg formula and Bohr theory is a model of the upward spiral of theory and experiment in physics. Note that when Balmer gave his empirical formula the quantum concept did not yet exist; he guessed the integer regularities hidden behind the hydrogen spectrum purely from mathematical simplicity and the accuracy of the fit. This ability to discover integer relations in data recurs throughout physics, from blackbody radiation to particle resonances: integers and ratios often point to deep quantization or symmetry. The Rydberg formula reminds us that empirical laws have great theoretical value in themselves; the key is whether a suitable framework can be found to explain them.

In modern times the study of the hydrogen spectrum has long outgrown the visible Balmer series. The twenty-one-centimetre line of neutral hydrogen observed by radio astronomy comes from transitions between hyperfine levels and has become one of the most important probes of galaxy distribution and large-scale structure; high-resolution laser spectroscopy in turn pushes the precision of the Rydberg formula to its limit, testing the small corrections of quantum electrodynamics to the levels and even looking for signs that physical constants drift slowly with time. A nineteenth-century empirical formula thus runs from the terrestrial laboratory to galaxies billions of light-years away.

On the other hand, the idea that level differences determine lines, embodied in the Rydberg formula, has generalized into the common language of all atomic and molecular spectroscopy. Whether analysing elemental abundances in stellar atmospheres or remotely sensing methane and water vapour in planetary atmospheres, the essence is comparing observed line positions with level differences calibrated in the laboratory. It is fair to say that much of our clear knowledge of the chemical composition of the universe is owed to the science of spectroscopy that began with the hydrogen atom.

Finally, because of its simple structure, the hydrogen spectrum remains the touchstone of quantum theory. Any new atomic theory must first reproduce these lines precisely before it can be considered sound. From the Schrödinger equation to the extremely precise calculations that include relativistic and QED corrections, hydrogen is always the cleanest specimen for testing the correctness of theory. It is like a ruler measuring each advance in our understanding of the microscopic world.

From a teaching perspective, the hydrogen spectrum is also the most concrete entry point to the concept of quantum numbers. The principal quantum number sets the main scale of the levels, while the fine and hyperfine structures correspond to the tiny splittings from relativistic corrections and nuclear spin coupling. By following how a single spectral line splits into a doublet and then into still finer lines at higher resolution, students can directly appreciate how the various interactions in quantum mechanics pile up layer by layer on top of the coarse levels. This path from coarse to fine, from simple to complex, is the most natural and most durable way to learn atomic physics.

Furthermore, the lines actually observed are not infinitely thin mathematical lines but always have some width. The causes include natural linewidth, Doppler broadening, and collision broadening, reflecting respectively the lifetime of the level, thermal motion, and interactions between particles. By analysing the line profile, physicists can even read off temperature, density, and pressure from a single line—the inversion technique routinely used in astrophysics and plasma diagnostics. The Rydberg formula gives the centre of the line, while profile analysis tells us about the richer physical environment behind it.

## 8. Complete Derivation of the Rydberg Formula from Bohr Levels

This section truly connects the level formula of Chapter 2 with the empirical formula of this chapter, and gives two numerical conclusions that can be checked immediately.

**The derivation.** From the Bohr levels $E_n = -\dfrac{R_H hc}{n^2}$ and the Bohr frequency condition $h\nu = E_{n_i} - E_{n_f}$, write directly

$$h\nu = \frac{R_H hc}{n_f^2} - \frac{R_H hc}{n_i^2} = R_H hc\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right)$$

Dividing both sides by $hc$ and noting $\nu/c = 1/\lambda$ immediately gives the Rydberg formula

$$\frac{1}{\lambda} = R_H\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right)$$

So the Rydberg formula is not an independent empirical law: it is the inevitable consequence of "levels distributed as $1/n^2$" plus "the photon carries off the level difference". Conversely, $13.6\ \mathrm{eV} = R_\infty hc$ yields the Rydberg constant:

$$R_\infty = \frac{13.6\ \mathrm{eV}}{hc} = \frac{13.6\times 1.602\times10^{-19}\ \mathrm{J}}{6.626\times10^{-34}\ \mathrm{J\,s}\times 2.998\times10^{8}\ \mathrm{m/s}} \approx 1.097\times10^{7}\ \mathrm{m^{-1}}$$

**Numerical check.** With $hc = 1.9864\times10^{-25}\ \mathrm{J\,m}$ and $R_\infty = 1.0974\times10^{7}\ \mathrm{m^{-1}}$:

$$R_\infty hc = 1.0974\times10^{7}\times 1.9864\times10^{-25}\ \mathrm{J} \approx 2.180\times10^{-18}\ \mathrm{J} \approx 13.61\ \mathrm{eV}$$

consistent with the ground-state ionization energy computed independently in Chapter 2—the two routes confirm each other.

**Why a reduced-mass correction is still needed.** The derivation above assumes the nucleus is at rest; in reality the electron and nucleus orbit their common centre of mass, and the two-body problem should be reduced to one body by replacing $m_e$ with the reduced mass $\mu = m_e M/(m_e + M)$. Since both the levels and the Rydberg constant are proportional to mass, the correction factor is

$$R_H = R_\infty\frac{\mu}{m_e} = \frac{R_\infty}{1 + m_e/M_p} = R_\infty\left(1 - \frac{1}{1836} + \cdots\right) \approx 1.09678\times10^{7}\ \mathrm{m^{-1}}$$

This correction is only five parts in ten thousand, absolutely invisible to the eye, yet obvious in high-resolution spectra—it produces the famous **isotope shift**.

## 9. Worked Comprehensive Example

**Problem: the isotope shift of the Balmer-$\alpha$ line of hydrogen and deuterium, and its observability.**

Given $m_e/M_p = 1/1836$, deuteron mass approximately $M_D \approx 2M_p$, $R_\infty = 1.09737\times10^{7}\ \mathrm{m^{-1}}$. (1) Find $R_H$ and $R_D$; (2) find the wavelengths of the Balmer-$\alpha$ lines ($n_i=3\to n_f=2$) of hydrogen and deuterium and their difference $\Delta\lambda$; (3) with a grating of $600$ lines per millimetre and illuminated width $1.0\ \mathrm{cm}$, what is the lowest order needed to resolve the two lines?

**Step 1: the Rydberg constants of the two isotopes.**

$$R_H = \frac{R_\infty}{1 + 1/1836} = \frac{1.09737\times10^{7}}{1.000545}\ \mathrm{m^{-1}} \approx 1.09677\times10^{7}\ \mathrm{m^{-1}}$$

For deuterium $m_e/M_D \approx 1/3672$, so

$$R_D = \frac{R_\infty}{1 + 1/3672} = \frac{1.09737\times10^{7}}{1.000272}\ \mathrm{m^{-1}} \approx 1.09707\times10^{7}\ \mathrm{m^{-1}}$$

**Step 2: wavelengths of the two Balmer-$\alpha$ lines.** From $\dfrac{1}{\lambda} = R\left(\dfrac14 - \dfrac19\right) = \dfrac{5R}{36}$ we get $\lambda = \dfrac{36}{5R}$:

$$\lambda_H = \frac{36}{5\times 1.09677\times10^{7}}\ \mathrm{m} \approx 6.5647\times10^{-7}\ \mathrm{m} = 656.47\ \mathrm{nm}$$

$$\lambda_D = \frac{36}{5\times 1.09707\times10^{7}}\ \mathrm{m} \approx 6.5629\times10^{-7}\ \mathrm{m} = 656.29\ \mathrm{nm}$$

$$\Delta\lambda = \lambda_H - \lambda_D \approx 0.18\ \mathrm{nm}$$

The deuterium line is shifted slightly toward shorter wavelengths. **Check**: from $\Delta\lambda/\lambda \approx \Delta R/R = 1/3672 \approx 2.7\times10^{-4}$, multiplying by $656.4\ \mathrm{nm}$ gives $0.18\ \mathrm{nm}$, consistent with the direct subtraction. Historically it was precisely in 1932 that Urey found this faint companion line beside the Balmer lines of natural hydrogen, thereby confirming the existence of deuterium.

**Step 3: required resolving power.** Resolving the two lines requires

$$R_{\text{need}} = \frac{\lambda}{\Delta\lambda} = \frac{656.4}{0.18} \approx 3.6\times10^{3}$$

The grating has a total of $N = 600\ \mathrm{mm^{-1}}\times 10\ \mathrm{mm} = 6.0\times10^{3}$ slits and resolving power $R = kN$. In first order $R = 6.0\times10^{3} > 3.6\times10^{3}$, so **first order suffices**; second order gives more margin. This shows that although the isotope shift is tiny, it is entirely within the reach of an ordinary laboratory grating spectrometer—which is why spectroscopy remains one of the most economical and reliable means of identifying isotopes.

## 10. Self-Check List and Error Traps Revisited

- **Do not confuse wavenumber with wavelength**: the left side of the Rydberg formula is $1/\lambda$ (in $\mathrm{m^{-1}}$), not $\lambda$. After computing, always take the reciprocal and check that the order of magnitude is a few hundred nanometres.
- **Order of $n_i$ and $n_f$**: the formula requires $n_i > n_f$ so that the bracket is positive; a negative wavenumber means the order was reversed.
- **Choosing between $R_H$ and $R_\infty$**: whenever a concrete nucleus is involved you must use $R_H$ with the reduced-mass correction; $R_\infty$ is only for the abstract infinitely heavy nucleus. The two differ by about five parts in ten thousand.
- **Do not mistake the series limit for the brightest line**: the limit is the convergence point as $n_i\to\infty$; the brightest lines are actually the low-order ones with the largest level differences or the largest populations.
- **Identify the series first**: if the problem mentions visible light think Balmer $n_f=2$; if ultraviolet, most likely Lyman $n_f=1$; if infrared, consider Paschen $n_f=3$ and higher.

**A self-check question**: in astronomy, redshift is conventionally described by the dimensionless $z = \Delta\lambda/\lambda_0$ rather than by how many nanometres a line has moved. Why? (Answer: at a given recession velocity the absolute shift differs from line to line, but the relative shift is the same; $z$ puts observations of different objects and different bands on one ruler, and it is directly related to the cosmic scale factor.) If you can answer this, you can already extend the laboratory Rydberg formula naturally into the observational language of astronomy.`,
  },
  xray: {
    chapter: 'Chapter 4 X-Rays',
    title: 'Production and Absorption of X-Rays',
    summary:
      'X-rays consist of a continuous bremsstrahlung spectrum and characteristic lines of the elements; Moseley\'s law ties the characteristic frequencies to atomic number, while Bragg\'s law provides the crystal-diffraction method for precise measurement.',
    keyPoints: [
      'The continuous spectrum comes from decelerating fast electrons (bremsstrahlung) and has a short-wavelength cutoff $\\lambda_{\\min}$',
      'Characteristic lines come from transitions of inner-shell electrons, unique to each element: Moseley\'s law $\\sqrt{\\nu}\\propto (Z-b)$',
      'An absorption edge corresponds to the minimum photon energy needed to ionize a given inner-shell electron',
      "Bragg's law $2d\\sin\\theta = n\\lambda$ is the basis of X-ray diffraction wavelength measurement",
      'X-rays serve both as a probe of material structure and as a powerful tool for studying inner atomic levels',
    ],
    content: String.raw`

In 1895 Röntgen found that when a cathode-ray tube operates it produces an unknown radiation that penetrates black paper, makes a fluorescent screen glow, and exposes photographic plates; he called it X-radiation. We now know that X-rays are simply electromagnetic waves of extremely short wavelength (about $0.01\sim 10\,\text{nm}$), lying between ultraviolet and γ rays. Their "penetrating power" comes from the high photon energy associated with short wavelengths, enough to cross the binding of outer atomic electrons while still being partly absorbed by dense matter.

X-rays are not of a single wavelength; they contain two quite distinct components. One is a "continuous spectrum" starting at some shortest wavelength and extending continuously to longer wavelengths, like a continuous band of light. The other is a set of sharp "peaks" superimposed on it, whose positions depend only on the element of the target material, called the "characteristic spectrum". The former tells the story of decelerating electrons, the latter the story of inner-shell electron transitions. Get both straight and you have the whole physics of X-rays.

## 2. Rigorous Definitions and Formulas

**Continuous spectrum and short-wavelength limit**: fast electrons (kinetic energy $E_k = eV$ at accelerating voltage $V$) strike a metal target and are decelerated in the nuclear field, converting kinetic energy into photons. A single electron can at most convert all its kinetic energy into one photon in a single encounter, so a shortest wavelength exists (Duane–Hunt law)

$$\lambda_{\min} = \frac{hc}{eV} = \frac{1240\,\text{eV}\cdot\text{nm}}{eV} = \frac{1.24\,\text{nm}\cdot\text{kV}}{V}$$

Note that $\lambda_{\min}$ depends only on the tube voltage, not on the target material.

**Characteristic spectrum and Moseley's law**: characteristic X-rays come from photons emitted when an outer electron fills a vacancy left after an inner-shell (K, L, ...) electron is ejected. For the K$_\alpha$ line (L shell $\to$ K shell), Moseley found the square root of the frequency to be approximately linear in atomic number:

$$\sqrt{\nu} = a\,(Z - b),\qquad b\approx 1$$

More precisely, a hydrogen-like approximation (effective nuclear charge $(Z-1)e$ acting on one electron) gives

$$h\nu_{K_\alpha} \approx \frac{3}{4}R_\infty hc\,(Z-1)^2$$

**Absorption edge**: when the incident photon energy is just enough to ionize a particular inner-shell electron, the absorption coefficient jumps; the corresponding wavelength is the absorption edge $\lambda_K,\lambda_L$, etc. The K edge satisfies

$$h\frac{c}{\lambda_K} = E_K^{\text{binding}}$$

the minimum energy required to lift a K-shell electron into the continuum.

**Bragg's law**: using a crystal as a three-dimensional grating, the condition for constructive interference of X-rays on planes with spacing $d$ is

$$2d\sin\theta = n\lambda,\qquad n=1,2,3,\dots$$

This lets us measure an unknown $\lambda$ from a known $d$, or conversely determine crystal structure from a known $\lambda$.

## 3. Why We Understand It This Way

**Why is the short-wavelength cutoff sharp?** Energy conservation limits a single photon to carrying away at most the entire kinetic energy of one electron; longer wavelengths arise because electrons radiate in several steps, repeatedly, or lose only part of their energy. The cutoff wavelength is an invariant, independent of the target, fixed solely by the voltage.

**Why is the characteristic spectrum a "fingerprint" of an element?** The depth of inner-shell levels is strongly governed by the nuclear charge $Z$ (roughly a $Z^2$ law), so different elements have very different level differences, and the characteristic line positions are uniquely fixed by the element. This is how Moseley identified new elements in unknown minerals and corrected ordering errors in the periodic table of his day.

**Why is there a $(Z-1)$ correction in Moseley's formula?** The electron making the transition is not attracted by the bare nucleus alone; it is also screened by the remaining electron in the same shell, so the effective nuclear charge is slightly less than $Z$. Taking a screening constant of about 1 for K$_\alpha$ is a compromise between experience and theory.

**Why can X-rays "see through" objects?** The high photon energy and short wavelength give an interaction cross section that grows with $Z$, so dense high-$Z$ materials (bone, metal) absorb strongly and cast deep shadows on film, while soft tissue absorbs weakly and is faintly exposed—exactly the physics of medical radiography.

## 4. Typical Calculations

**Example 1: short-wavelength limit.** For a tube voltage $V = 30\,\text{kV}$,

$$\lambda_{\min} = \frac{1.24\,\text{nm}\cdot\text{kV}}{30\,\text{kV}} \approx 0.0413\,\text{nm} = 0.413\,\text{Å}$$

corresponding to a photon energy of exactly $30\,\text{keV}$.

**Example 2: the copper K$_\alpha$ line.** Copper has $Z=29$; use $h\nu \approx \tfrac34 R_\infty hc (Z-1)^2$. First the wavenumber

$$\tilde\nu = \frac{3}{4}R_\infty (28)^2 \approx 0.75\times 1.097\times 10^7 \times 784 \approx 6.45\times 10^9\,\text{m}^{-1}$$

$$\lambda = 1/\tilde\nu \approx 1.55\times 10^{-10}\,\text{m} = 0.155\,\text{nm}$$

in close agreement with the measured copper K$_\alpha$ of about $0.154\,\text{nm}$.

**Example 3: Bragg diffraction.** Rock salt has plane spacing $d = 0.282\,\text{nm}$; if the first-order peak ($n=1$) appears at $\theta=15^\circ$, then

$$\lambda = 2d\sin\theta = 2\times 0.282\times \sin 15^\circ \approx 0.146\,\text{nm}$$

which calibrates the X-ray wavelength.

## 5. Common Misconceptions

**Misconception 1: X-rays and γ rays are fundamentally different.** Both are electromagnetic waves; they differ only in origin (X-rays from inner-shell electron processes or bremsstrahlung, γ rays from nuclear transitions) and typical energy range. There is no absolute boundary in the spectrum.

**Misconception 2: the peak positions of the continuous spectrum are set by the target material.** The shape and cutoff of the continuous spectrum are set only by the voltage; the target affects only the overall intensity and the characteristic peaks, never $\lambda_{\min}$.

**Misconception 3: characteristic lines appear at all voltages.** They appear only when the tube voltage is high enough to eject inner-shell electrons (exceeding the shell binding energy); below that, only the continuous spectrum exists.

**Misconception 4: Bragg's law holds at any angle.** It requires $\sin\theta \le 1$ and the existence of a family of lattice planes; disordered amorphous materials give no sharp Bragg peaks, only diffuse rings.

**Misconception 5: the more absorption the clearer the image.** Medical imaging is just the opposite: contrast comes from differences in absorption; total absorption or total transmission carries no information, so a suitable energy window is needed.

## 6. Extensions and Synthesis

Since the time of the Braggs, X-ray diffraction has been a "super microscope" for revealing the internal structure of matter. From the diffraction pattern that confirmed the DNA double helix, to determining protein crystal structures and analysing phase transformations in alloys, the same $2d\sin\theta = n\lambda$ is at work. Synchrotron sources today provide extremely intense, extremely pure X-ray beams, letting us "see" chemical reactions inside living molecules at atomic resolution.

On the other hand, characteristic X-ray lines and absorption edges give the most direct experimental window on inner atomic levels: the fine structure in absorption spectra (EXAFS) even tells us the species and distance of neighbouring atoms. From a strange ray that penetrated black paper to a bridge between microscopic atomic structure and macroscopic materials science, the chapter on X-rays displays the experimental power of atomic physics to the full, and prepares us for the atomic nucleus and radioactivity—next chapter we descend to a smaller scale to see how nuclei themselves decay and how they keep time.

## 7. The Modern Panorama of X-Ray Technology and Its Cross-Disciplinary Impact

Since their discovery, X-rays have long since spilled out of pure physics laboratories into medicine, materials, biology, and industrial inspection. In medicine, X-ray radiography and computed tomography based on absorption differences present the interior of the human body non-invasively and have become indispensable tools of diagnosis; in materials science, X-ray diffraction is the standard method for determining crystal structures and tracking phase transformations and stress distributions; in biology, it was X-ray diffraction patterns that let Watson and Crick infer the double helix of DNA, founding molecular biology. A discovery made with a cathode-ray tube ended up reshaping human understanding of the structure of both life and matter.

Methodologically, characteristic X-ray lines and Moseley's law also provide an important example: inner-shell electron levels, buried deep in a strong Coulomb field, are extremely sensitive to nuclear charge, and so become natural probes of elemental identity and even of isotopic environment. Modern X-ray absorption fine-structure spectroscopy can tell us the species, distance, and coordination number of the neighbours of a particular element without damaging the sample—an ability of great value in catalysis, environmental science, and archaeological analysis. Techniques developed to understand atomic structure have turned into tools for exploring far more complex material systems.

It is worth adding that X-rays interact with matter in many ways: besides coherent scattering that produces diffraction, there are the photoelectric effect, Compton scattering, and incoherent scattering, corresponding to photon absorption, and to energy change after a photon collides with an electron. Understanding how the relative strength of these processes varies with photon energy and atomic number is the basis for designing X-ray equipment, assessing radiation-protection doses, and interpreting astronomical X-ray data. Modern synchrotron sources push all this to extreme brightness and tunability, so that X-rays have grown from a tool for looking at bones into a general platform for resolving electronic structure and dynamical processes in matter.

Finally, characteristic X-ray lines directly drove the completion of the periodic table. Moseley measured the frequencies of characteristic X-rays in different minerals, determined the atomic numbers of the elements, and corrected misorderings previously caused by sorting on atomic weight. This means the position of an element in the periodic table is essentially fixed by nuclear charge, not by atomic weight. The conclusion not only clarified the order of the chemical elements but also planted a key hint for later understanding the relation between the nucleus and the electron shells.

In radiation protection and health physics, the penetrating power of X-rays is closely tied to their energy: low-energy X-rays are easily absorbed by superficial tissue and cause skin damage, while high-energy X-rays penetrate deep into the body. Medical imaging therefore always trades image contrast against dose, using the lowest necessary dose to obtain diagnostic information. This trade-off is itself an application of decay laws, absorption coefficients, and the interaction of radiation with tissue—atomic physics maturing from basic understanding into responsible engineering practice.

## 8. The Microscopic Mechanism of K-Series Radiation and the Origin of $(Z-1)^2$

Section 2 quoted the empirical formula for K$_\alpha$ directly; this section takes it apart: it explains why the expression contains $(Z-1)$ rather than $Z$, and provides a calculation template ready to use.

**The process has three steps.** First, the energy of the fast incident electron must exceed the K-shell binding energy $E_K$ in order to eject a K-shell electron from the target atom, leaving a hole. Second, an outer electron (usually from the L shell) drops down to fill the hole. Third, the released energy is either radiated as a photon (characteristic X-ray) or transferred to another electron and ejected through the Auger process—the two channels compete, with radiative transitions dominating in heavy elements and Auger processes in light ones. Which shell the electron in the second step comes from determines the series name: L$\to$K is K$_\alpha$, M$\to$K is K$_\beta$, and so on.

**Effective nuclear charge and screening.** The K shell originally holds two $1s$ electrons. When one is ejected, the remaining one stays in the K shell; the electron dropping from the L shell does not see the full bare nuclear charge $Ze$ but feels partial screening by the other $1s$ electron. In the spherically symmetric approximation the screening constant is $\sigma\approx 1$, so the effective nuclear charge is

$$Z_{\text{eff}} = Z - \sigma \approx Z - 1$$

Replacing $Z$ by $Z_{\text{eff}}$ in the hydrogen-like level formula gives

$$E_n = -13.6\,\frac{(Z-1)^2}{n^2}\ \mathrm{eV}$$

The K$_\alpha$ photon energy equals the level difference from $n=2$ to $n=1$:

$$h\nu_{K_\alpha} = E_2 - E_1 = -13.6(Z-1)^2\left(\frac14 - 1\right)\ \mathrm{eV} = \frac34\times 13.6\,(Z-1)^2\ \mathrm{eV}$$

that is,

$$h\nu_{K_\alpha} \approx 10.2\,(Z-1)^2\ \mathrm{eV} = \frac34 R_\infty hc\,(Z-1)^2$$

Taking the square root of both sides gives $\sqrt{\nu}\propto (Z-1)$, which is Moseley's law. **Corollary 1**: the frequency ratio of K$_\beta$ to K$_\alpha$ is

$$\frac{\nu_{K_\beta}}{\nu_{K_\alpha}} = \frac{1 - 1/9}{1 - 1/4} = \frac{8/9}{3/4} \approx 1.19$$

**Corollary 2**: to excite the K series the tube voltage must satisfy $eV \gtrsim E_K \approx 13.6(Z-1)^2\ \mathrm{eV}$. Both corollaries can be tested directly—the first measures about $1.10$ rather than $1.19$, and the second deviates by more than ten percent, for exactly the same reason: a $1s$ electron screens an L-shell electron differently from a free electron, and setting $\sigma = 1$ uniformly is only the lowest-order approximation. Recognizing the limits of an approximation matters as much as remembering the formula.

## 9. Worked Comprehensive Example

**Problem: cutoff wavelength, characteristic wavelength, and target power of a molybdenum X-ray tube.**

An X-ray tube uses molybdenum ($Z=42$) as target, with tube voltage $V = 35\ \mathrm{kV}$ and tube current $I = 20\ \mathrm{mA}$. Take $hc = 1240\ \mathrm{eV\cdot nm}$. (1) Find the short-wavelength limit $\lambda_{\min}$ of the continuous spectrum and the corresponding photon energy; (2) estimate the K$_\alpha$ wavelength of molybdenum in the hydrogen-like approximation and compare with the measured $0.0711\ \mathrm{nm}$; (3) estimate the minimum tube voltage needed to excite the K series and judge whether this tube produces characteristic lines; (4) estimate the thermal power and X-ray power deposited on the target.

**Step 1: short-wavelength limit.** By the Duane–Hunt law

$$\lambda_{\min} = \frac{hc}{eV} = \frac{1.24\ \mathrm{nm\cdot kV}}{35\ \mathrm{kV}} \approx 0.0354\ \mathrm{nm} = 0.354\ \text{Å}$$

corresponding to a photon energy of exactly $35\ \mathrm{keV}$. Note that this result depends only on the tube voltage, not on the target—switch to a copper or tungsten target and, as long as the voltage is unchanged, $\lambda_{\min}$ is identical to the last digit.

**Step 2: K$_\alpha$ wavelength.** From $h\nu = 10.2\,(Z-1)^2\ \mathrm{eV}$ with $Z-1 = 41$:

$$h\nu_{K_\alpha} = 10.2\times 41^2\ \mathrm{eV} = 10.2\times 1681\ \mathrm{eV} \approx 1.71\times10^{4}\ \mathrm{eV} = 17.1\ \mathrm{keV}$$

$$\lambda_{K_\alpha} = \frac{hc}{h\nu} = \frac{1240\ \mathrm{eV\cdot nm}}{1.71\times10^{4}\ \mathrm{eV}} \approx 0.0723\ \mathrm{nm}$$

The deviation from the measured $0.0711\ \mathrm{nm}$ is about $1.7\%$. Considering that the model uses only the first approximation "$\sigma=1$", this agreement is quite satisfactory, and it confirms that the physical picture—K$_\alpha$ dominated by the strong inner-shell Coulomb field—is correct.

**Step 3: minimum excitation voltage.**

$$V_{\min} \approx \frac{E_K}{e} \approx 13.6\,(Z-1)^2\ \mathrm{V} = 13.6\times 1681\ \mathrm{V} \approx 2.29\times10^{4}\ \mathrm{V} = 22.9\ \mathrm{kV}$$

Since $35\ \mathrm{kV} > 22.9\ \mathrm{kV}$, this tube can eject K-shell electrons and the screen will show molybdenum characteristic peaks superimposed on the continuous spectrum. (The measured K absorption edge of molybdenum is about $20.0\ \mathrm{keV}$, again confirming that $\sigma=1$ is only a rough estimate.)

**Step 4: power distribution.** The electrical power is $P = VI = 3.5\times10^{4}\ \mathrm{V}\times 2.0\times10^{-2}\ \mathrm{A} = 700\ \mathrm{W}$. The empirical estimate of X-ray yield is $\eta \approx 10^{-9} Z V$ (with $V$ in volts), so

$$\eta \approx 10^{-9}\times 42\times 3.5\times10^{4} \approx 1.5\times10^{-3}$$

$$P_X \approx \eta P \approx 1.0\ \mathrm{W},\qquad P_{\text{heat}} \approx 699\ \mathrm{W}$$

**This is the key point**: more than $99.8\%$ of the input power becomes heat rather than X-rays. Practical X-ray tubes must therefore have rotating-anode heat dissipation and oil or water cooling—an engineering detail that is, next to the Duane–Hunt law, the most important practical constraint.

## 10. Self-Check List and Error Traps Revisited

- **The two components are governed by different factors**: the shape and short-wavelength limit of the continuous spectrum are set by the tube voltage and are independent of the target; the peak positions of the characteristic spectrum are set by the target (atomic number $Z$) and independent of the voltage. When asked "what changes if the target is changed", first decide which component is meant.
- **Keep units consistent**: in $\lambda_{\min} = 1.24/V\ \mathrm{nm}$, $V$ is in $\mathrm{kV}$; using $\mathrm{eV}$ and $\mathrm{nm}$ instead requires $hc = 1240\ \mathrm{eV\cdot nm}$. Mixing them guarantees an order-of-magnitude error.
- **Definition of the Bragg angle**: in $2d\sin\theta = n\lambda$, $\theta$ is the angle between the incident ray and the **lattice plane**, not the plane normal. If the problem gives the latter, use $\cos$ instead.
- **Meaning of $n$**: $n$ is the diffraction order, not the number of reflections or the number of planes involved; first order is the most common.
- **Do not treat the screening constant as exact**: $\sigma\approx 1$ leaves one to a few percent error in the K$_\alpha$ wavelength; for four significant figures, consult tables or empirical screening constants.

**A self-check question**: in an X-ray diffraction experiment, why insert a filter or use a crystal monochromator so that only the K$_\alpha$ line is used rather than the whole continuous spectrum? (Answer: the continuum contains many wavelengths, each satisfying its own Bragg condition, so the diffraction peaks overlap into a background from which the plane spacing cannot be uniquely recovered; monochromatic K$_\alpha$ gives a one-to-one correspondence between peak position and spacing.) If you can answer this, you have truly understood the pair of roles: "characteristic lines provide the monochromatic probe, the continuum provides only background".`,
  },

  radioactivity: {
    chapter: 'Chapter 5 The Nucleus and Radioactivity',
    title: 'Decay Modes and Half-Life',
    summary:
      'Radioactive nuclides transform into stable nuclei through α, β, and γ decay; decay obeys an exponential law, and the half-life is the central parameter characterizing a nuclide\'s lifetime and its use as a clock.',
    keyPoints: [
      'α decay emits a $^4_2\\text{He}$ nucleus, β decay changes the neutron–proton ratio, γ decay releases energy from an excited nuclear level',
      'Decay law $N(t) = N_0 e^{-\\lambda t}$; decay constant $\\lambda$ and half-life $T_{1/2} = \\ln 2/\\lambda$',
      'Activity $A = \\lambda N$ also decays exponentially',
      'In a decay chain, parent and daughter activities become equal at transient equilibrium',
      'Radioisotopes are widely used in dating, medical tracing, and irradiation',
    ],
    content: String.raw`

In the preceding chapters we focused on electrons and the atomic shell, treating the nucleus as a small point of charge $+Ze$. But the nucleus itself is not immutable: some nuclides are naturally unstable and spontaneously emit particles or photons, transmuting into another nucleus—this is radioactivity. In 1896 Becquerel discovered the radioactivity of uranium, and the Curies subsequently isolated polonium and radium, opening the door to nuclear physics.

What is fascinating about radioactivity is that it is "unpredictable yet sharply statistical": when any single nucleus decays is completely random, and you cannot predict whether a particular atom will decay in the next second; but for an astronomical collection of atoms, the number decaying follows a smooth exponential curve in time with strict regularity. This transition from individual randomness to collective determinacy is a vivid embodiment of statistical-physics thinking at nuclear scales, and it makes the half-life a reliable clock for geological dating, medical tracing, and even food irradiation.

## 2. Rigorous Definitions and Formulas

**The three main decay modes**:
- α decay: $^A_ZX \to\,^{A-4}_{Z-2}Y +\,^4_2\text{He}$, emitting a helium nucleus, decreasing the mass number by 4 and the charge number by 2;
- β decay: β$^-$ decay $n\to p + e^- + \bar\nu_e$ increases $Z$ by 1 with the mass number unchanged; β$^+$ decay and electron capture decrease $Z$ by 1;
- γ decay: the nucleus drops from an excited state to the ground state, emitting a high-energy photon, leaving $A,Z$ unchanged.

**Decay law**: let $N(t)$ be the number of undecayed nuclei at time $t$. Since each nucleus has a constant probability $\lambda$ per unit time of decaying (the decay constant), we have the differential equation

$$\frac{dN}{dt} = -\lambda N$$

whose solution is

$$N(t) = N_0 e^{-\lambda t}$$

**Half-life**: defined as the time for $N$ to fall to half,

$$T_{1/2} = \frac{\ln 2}{\lambda} = \frac{0.693}{\lambda}$$

**Mean lifetime**: $\tau = 1/\lambda = T_{1/2}/\ln 2$.

**Activity (radioactive intensity)**: decays per unit time

$$A(t) = \lambda N(t) = A_0 e^{-\lambda t},\qquad A_0 = \lambda N_0$$

The SI unit is the becquerel (Bq, one decay per second).

**Decay energy**: taking α decay as an example, the mass defect $\Delta m = m_X - m_Y - m_\alpha$ becomes the kinetic energy of the daughter nucleus and the α particle (which move in opposite directions by momentum conservation); the decay energy is $Q = \Delta m\,c^2$.

## 3. Why We Understand It This Way

**Why is a single decay random while the ensemble is exponential?** The exponential law follows from the assumption that "the decay probability of each surviving nucleus per unit time is constant", equivalent to a memoryless Poisson process; the statistical average over many independent events smooths naturally into $e^{-\lambda t}$. It is like the distribution of human lifetimes: individually unpredictable, yet the overall death rate is stable.

**Why is the half-life independent of the initial amount?** Each decay depends only on "how much is left now", a fixed proportion, so whether you start with a thousand or a hundred million, the time to halve is the same. This is the key feature distinguishing exponential from linear decay.

**Why can α decay "tunnel" through the barrier?** Inside the nucleus the α particle faces a Coulomb barrier that is classically impassable, but quantum mechanics allows it to escape with some probability by tunnelling—exactly the content of the Geiger–Nuttall law and barrier-penetration theory, and the reason significant α decay occurs only in heavy nuclei.

**Why does γ decay not change the element by itself?** A γ photon carries no mass or charge and only removes the excess energy of the excited state, so the daughter keeps the same $A,Z$ and merely "cools down"; it usually follows an α or β decay.

## 4. Typical Calculations

**Example 1: carbon-14 dating.** $^{14}\text{C}$ has $T_{1/2}\approx 5730\,\text{a}$. If the $^{14}\text{C}$ activity of a sample has fallen to one quarter of the modern value, two half-lives have passed,

$$t = 2 T_{1/2} \approx 1.15\times 10^4\,\text{a}$$

This is the core method of archaeology and palaeoclimatology.

**Example 2: number of remaining nuclei.** Initially $N_0 = 10^{20}$ nuclei of some nuclide with $\lambda = 10^{-9}\,\text{s}^{-1}$; find the number left after 1000 years. First convert $t = 1000\times 3.156\times 10^7 \approx 3.156\times 10^{10}\,\text{s}$,

$$\lambda t \approx 10^{-9}\times 3.156\times 10^{10} \approx 31.6$$

$$N = N_0 e^{-31.6} \approx 10^{20}\times 1.9\times 10^{-14} \approx 1.9\times 10^6$$

so nearly all have decayed.

**Example 3: activity conversion.** If a sample has activity $A=3.7\times 10^{10}\,\text{Bq}$ (one curie) and decay constant $\lambda = 1.0\times 10^{-8}\,\text{s}^{-1}$, then the number of nuclei is

$$N = A/\lambda = 3.7\times 10^{18}$$

and the mass follows from $m = N M/N_A$.

## 5. Common Misconceptions

**Misconception 1: the shorter the half-life the more dangerous.** Not necessarily; a short-lived nuclide decays quickly and has high activity but disappears fast, so its long-term hazard may be smaller; a long-lived nuclide can contaminate for decades or more. The two risks are of different kinds.

**Misconception 2: heating or pressurizing can appreciably change the decay rate.** Radioactivity is a process of the strong and weak interactions inside the nucleus; ordinary temperatures and pressures affect the half-life negligibly, which is why nuclear clocks are so stable.

**Misconception 3: the material "disappears" after decay.** The nuclide becomes another nuclide (often an atom of a different element); mass–energy is conserved, only the identity changes. The mass defect is released as kinetic energy and radiation.

**Misconception 4: γ rays are "heavier" than α and β.** γ is a massless photon; α is a helium nucleus (heaviest, most ionizing, least penetrating); β is an electron. Hazard and protection depend on penetrating and ionizing power, not on the name.

**Misconception 5: all radioactivity is harmful.** Used sensibly, radioactivity serves cancer radiotherapy, industrial radiography, food sterilization, and tracer diagnostics—an important technological tool. The key is dose and control.

## 6. Extensions and Synthesis

Radioactive decay chains are the most common situation in nature: the daughter of a parent may itself be radioactive and continue to decay until a stable nuclide is reached. The three natural chains—uranium, thorium, and actinium—all end at stable lead isotopes. In a closed system, when parent and daughter reach "transient equilibrium" their activities are equal; this property is widely used to date rocks (uranium–lead dating, for instance), pushing the age of the Earth to the billions of years.

In the second half of the twentieth century, experiments confirming parity violation in decay and the existence of the neutrino tied radioactivity research to elementary-particle physics. From a fluorescent substance to a yardstick for the age of the universe, the chapter on radioactivity displays both the instability of the nucleus and the iron macroscopic laws behind microscopic randomness. Next chapter we return to the atomic shell and introduce the revolutionary concept of electron spin, to see how it explains the alkali doublets and the Landé g factor, carrying atomic physics to a finer quantum picture.

## 7. Full Derivation of the Exponential Decay Law and the Three Characteristic Times

Earlier we quoted $N(t)=N_0 e^{-\lambda t}$ directly; this section derives it from a probability assumption and clarifies once and for all the two easily confused concepts of half-life and mean lifetime.

**Starting from memorylessness.** Suppose $N(t)$ nuclei remain undecayed at time $t$. The experimental fact is that each nucleus has a constant probability $\lambda$ per unit time of decaying, independent of how long it has already existed. This is the **memorylessness** of the decay process—a nucleus is not more likely to decay because it is "old". Hence in a short time $\mathrm{d}t$ the expected number of decays is $-\mathrm{d}N = \lambda N\,\mathrm{d}t$, which can be separated as

$$\frac{\mathrm{d}N}{N} = -\lambda\,\mathrm{d}t$$

Integrating both sides, $\int_{N_0}^{N}\dfrac{\mathrm{d}N'}{N'} = -\lambda\int_0^t \mathrm{d}t'$, gives

$$\ln\frac{N}{N_0} = -\lambda t\quad\Longrightarrow\quad N(t) = N_0 e^{-\lambda t}$$

**The three characteristic times.** Textbooks often introduce three time scales, defined and related as follows:

- **Half-life** $T_{1/2} = \dfrac{\ln 2}{\lambda} \approx \dfrac{0.693}{\lambda}$, satisfying $N(T_{1/2}) = N_0/2$;
- **Mean lifetime** $\tau = \dfrac{1}{\lambda}$, satisfying $N(\tau) = N_0/e \approx 0.368\,N_0$;
- **The $e$-folding time of the activity**, which is $\tau$ itself, since $A = \lambda N$ has the same exponential as $N$.

The mean lifetime is $1/\lambda$ because it is the expectation of the lifetime distribution $p(t) = \lambda e^{-\lambda t}$:

$$\langle t\rangle = \int_0^{\infty} t\,\lambda e^{-\lambda t}\,\mathrm{d}t = \frac{1}{\lambda}$$

Its relation to the half-life is $\tau = T_{1/2}/\ln 2 \approx 1.44\,T_{1/2}$: the mean lifetime is about $44\%$ longer than the half-life, because the long tail of the exponential distribution pulls the average up. **The most common mistake is to swap the two**, so remember firmly that $\tau > T_{1/2}$.

**A more convenient way to write it.** Express $e^{-\lambda t}$ in terms of the half-life: $N/N_0 = 2^{-t/T_{1/2}}$. Then "after $n$ half-lives the remainder is $2^{-n}$" can be done entirely in your head: after 7 half-lives $1/128 \approx 0.8\%$ remains, after 10 about $0.1\%$.

**Statistical fluctuations of decay counts.** A single decay is a random event, and the number of counts $M$ recorded in a time interval follows a Poisson distribution with standard deviation $\sigma = \sqrt{M}$ and relative uncertainty $\sigma/M = 1/\sqrt{M}$. To reach $1\%$ precision you need about $10^{4}$ counts; for $0.1\%$ you need $10^{6}$. This is why radioactivity experiments often require long counting times, and it is the direct measurement-level expression of "individual random, collective deterministic" mentioned at the start of the chapter.

## 8. Decay Chains and the Dynamics of Transient Equilibrium

Radioactivity rarely goes to the end in one step; more often it proceeds in a "chain". Let parent $X$ (decay constant $\lambda_1$) decay into daughter $Y$ ($\lambda_2$), which then decays into a stable nucleus. Assuming only the parent is present initially with $N_{10}$, the equations are

$$\frac{\mathrm{d}N_1}{\mathrm{d}t} = -\lambda_1 N_1,\qquad \frac{\mathrm{d}N_2}{\mathrm{d}t} = \lambda_1 N_1 - \lambda_2 N_2$$

The first gives $N_1 = N_{10}e^{-\lambda_1 t}$. Substituting into the second yields the first-order linear equation $\mathrm{d}N_2/\mathrm{d}t + \lambda_2 N_2 = \lambda_1 N_{10}e^{-\lambda_1 t}$, solved with the integrating factor $e^{\lambda_2 t}$:

$$N_2(t) = \frac{\lambda_1}{\lambda_2 - \lambda_1}N_{10}\left(e^{-\lambda_1 t} - e^{-\lambda_2 t}\right)$$

The corresponding daughter activity is

$$A_2(t) = \lambda_2 N_2(t) = \frac{\lambda_2}{\lambda_2 - \lambda_1}A_{10}\left(e^{-\lambda_1 t} - e^{-\lambda_2 t}\right)$$

**The transient-equilibrium case** ($\lambda_1 < \lambda_2$, the parent outliving the daughter, e.g. $^{226}\mathrm{Ra}\to{}^{222}\mathrm{Rn}$): when the time is long compared with the daughter's half-life but short compared with the parent's, $e^{-\lambda_2 t}\to 0$ while $e^{-\lambda_1 t}$ is still nearly constant, so

$$N_2(t) \approx \frac{\lambda_1}{\lambda_2 - \lambda_1}N_1(t),\qquad \frac{A_2}{A_1} \approx \frac{\lambda_2}{\lambda_2 - \lambda_1}$$

The number of daughter nuclei keeps a fixed ratio to the parent, and both decay with the parent's half-life. If in addition $\lambda_2 \gg \lambda_1$ (a very short-lived daughter), the ratio approaches $A_2/A_1\to 1$, i.e. **equal parent and daughter activities**—the familiar "radioactive equilibrium". Conversely, if $\lambda_2 < \lambda_1$ (the daughter outlives the parent), no such equilibrium occurs; after long enough the system is dominated by the daughter and decays with its own half-life. The three natural chains—uranium, thorium, actinium—ending at stable lead isotopes are the joint result of these two branches.

## 9. Worked Comprehensive Example

**Problem: equilibrium activity and radon atom number in the radium–radon system.**

Given $^{226}\mathrm{Ra}$ half-life $T_1 = 1600\ \mathrm{a}$ and its daughter $^{222}\mathrm{Rn}$ half-life $T_2 = 3.82\ \mathrm{d}$. A sample of $m = 1.0\ \mathrm{mg}$ of pure $^{226}\mathrm{Ra}$ is sealed in a container. Take $N_A = 6.02\times10^{23}\ \mathrm{mol^{-1}}$, $1\ \mathrm{a} = 3.156\times10^{7}\ \mathrm{s}$. (1) Find the number of radium atoms and the activity $A_1$; (2) after about one month of sealing, find the radon activity $A_2$; (3) find the radon atom number $N_2$ at equilibrium and the corresponding mass.

**Step 1: radium atom number and activity.**

$$N_1 = \frac{m}{M}N_A = \frac{1.0\times10^{-3}\ \mathrm{g}}{226\ \mathrm{g/mol}}\times 6.02\times10^{23}\ \mathrm{mol^{-1}} \approx 2.66\times10^{18}$$

$$\lambda_1 = \frac{\ln 2}{T_1} = \frac{0.693}{1600\times 3.156\times10^{7}\ \mathrm{s}} \approx 1.37\times10^{-11}\ \mathrm{s^{-1}}$$

$$A_1 = \lambda_1 N_1 = 1.37\times10^{-11}\times 2.66\times10^{18}\ \mathrm{s^{-1}} \approx 3.65\times10^{7}\ \mathrm{Bq}$$

**Check**: historically one curie (Ci) was defined as the activity of 1 g of radium, $3.7\times10^{10}\ \mathrm{Bq}$. Our sample is 1 mg, so it should be $3.7\times10^{7}\ \mathrm{Bq}$, within $2\%$ of the computed $3.65\times10^{7}\ \mathrm{Bq}$ (the residual comes from the rounded $T_1$). The conversion chain is thus correct.

**Step 2: radon activity.**

$$\lambda_2 = \frac{\ln 2}{3.82\times 86400\ \mathrm{s}} = \frac{0.693}{3.30\times10^{5}\ \mathrm{s}} \approx 2.10\times10^{-6}\ \mathrm{s^{-1}}$$

Since $\lambda_2/\lambda_1 \approx 1.5\times10^{5}\gg 1$ and the sealing time (about 7.9 radon half-lives) far exceeds $T_2$, the system is in secular equilibrium, so

$$\frac{A_2}{A_1} = \frac{\lambda_2}{\lambda_2 - \lambda_1} \approx 1.0000065 \approx 1,\qquad A_2 \approx A_1 = 3.65\times10^{7}\ \mathrm{Bq}$$

**Step 3: radon atom number and mass.**

$$N_2 = \frac{A_2}{\lambda_2} = \frac{3.65\times10^{7}}{2.10\times10^{-6}} \approx 1.74\times10^{13}$$

$$m_2 = \frac{N_2}{N_A}\times 222\ \mathrm{g/mol} = \frac{1.74\times10^{13}}{6.02\times10^{23}}\times 222\ \mathrm{g} \approx 6.4\times10^{-9}\ \mathrm{g}$$

**The physical meaning**: although radon's activity equals radium's exactly, it corresponds to five orders of magnitude fewer atoms, a mass of only a few nanograms. The reason is that radon decays far faster—from $A = \lambda N$, **the same activity can be supplied by very many "slow" nuclei or by very few "fast" ones**. This explains why radon gas is a significant radiological hazard yet completely imperceptible to the senses; it also shows that when discussing radioactivity, quoting only the "activity" or only the "mass" is incomplete—the half-life must be given with them. Step 3 also shows that once the seal is broken, escaped radon decays away within weeks, while the parent radium keeps producing new radon on a thousand-year timescale—the fundamental reason indoor radon requires continuous ventilation and mitigation.

## 10. Self-Check List and Error Traps Revisited

- **Do not swap mean lifetime and half-life**: $\tau = 1/\lambda = 1.44\,T_{1/2}$, the mean lifetime is longer; $N(\tau)/N_0 = 1/e \approx 0.368$, not $1/2$.
- **Activity is not proportional to mass**: $A = \lambda N$; for the same mass, a short-lived nuclide has a much higher activity.
- **Keep units consistent**: the units of $\lambda$ and $t$ must match; if time is in years, use $\mathrm{a^{-1}}$, and never mix seconds with years.
- **"Decayed" is not "disappeared"**: the lost parent has become the daughter; only at the stable end does the change truly stop.
- **Do not forget counting statistics**: the relative error is $1/\sqrt{M}$; an order of magnitude too few counts makes the conclusion meaningless.
- **Direction of the equilibrium condition**: radioactive equilibrium only makes sense when the parent outlives the daughter ($\lambda_1<\lambda_2$); the reverse does not hold.

**One more practical piece of problem-solving experience.** When tackling radioactivity problems, follow three fixed steps. First, state clearly whether you are asked for a number of nuclei or an activity, and write $N(t)=N_0 e^{-\lambda t}$ or $A(t)=A_0 e^{-\lambda t}$. Second, bring $\lambda$ and $T_{1/2}$ into the same units as the time given in the problem—carelessness here loses more marks than anything else. Third, substitute numbers, and afterwards sanity-check the order of magnitude with "how many half-lives have passed" ($n = t/T_{1/2}$, with remainder $2^{-n}$). If the two routes differ by a factor, it is almost certainly a unit conversion or a sign in the exponent. With this habit, most decay problems can be solved correctly at the first attempt without relying on scattered memorized formulas.

**A self-check question**: why is $^{14}\mathrm{C}$ dating only applicable to samples up to tens of thousands of years old, while the potassium–argon method ($T_{1/2} = 1.25\times10^{9}\ \mathrm{a}$) can date rocks hundreds of millions of years old? (Answer: precision is highest when the sample age is comparable to the half-life of the nuclide used. $^{14}\mathrm{C}$ has a half-life of 5730 a; beyond about ten half-lives the remaining fraction is below one part in a thousand and cannot be reliably distinguished under counting statistics. For hundred-million-year scales, a longer-lived nuclide matched to the age is required.) If you can explain this clearly, you have internalized the principle that "which nuclide serves as the clock depends on the age scale of the object being dated".`,
  },

  'electron-spin': {
    chapter: 'Chapter 6 Electron Spin and the Alkali Metals',
    title: 'Spin and Fine Structure',
    summary:
      'The electron carries an intrinsic spin 1/2; spin–orbit coupling produces the doublets of alkali spectra and the fine structure of atomic levels, while the Landé g factor describes the response of the magnetic moment to a magnetic field.',
    keyPoints: [
      'The electron spin quantum number is $s=1/2$ with projection $m_s = \\pm 1/2$; it is an intrinsic degree of freedom, not literal rotation',
      'Spin magnetic moment $\\vec{\\mu}_s = -g_s\\mu_B\\vec{S}/\\hbar$ with $g_s\\approx 2$',
      'Spin–orbit coupling splits each alkali line into a doublet (e.g. the sodium D lines)',
      'Total angular momentum $j = l\\pm 1/2$; splitting by $j$ is the fine structure',
      'The Landé g factor gives the ratio of total magnetic moment to total angular momentum and sets the Zeeman splitting',
    ],
    content: String.raw`

In 1925 Uhlenbeck and Goudsmit proposed a bold and awkward idea: besides orbiting the nucleus, the electron carries an "intrinsic angular momentum" of its own, called spin. It is awkward because if the electron really were a small spinning ball, the surface speed computed from the classical picture would far exceed the speed of light—obviously absurd. Spin is not mechanical rotation like the Earth's; it is a quantum degree of freedom the electron is born with, with no classical counterpart, describable only by a newly introduced quantum number.

The introduction of spin immediately resolved several puzzles: in the Stern–Gerlach experiment the silver atom beam splits into two rather than spreading continuously, showing that the electron magnetic moment has only two orientations; spectral lines in alkali metals that should be "single" are in fact a pair of closely spaced doublets (the sodium yellow D lines are the famous example); and the complex splitting patterns of the anomalous Zeeman effect are explained only once spin is included. Spin was thus promoted from "stopgap" to one of the cornerstones of quantum mechanics.

## 2. Rigorous Definitions and Formulas

**Spin quantum number**: the electron spin quantum number is fixed at

$$s = \frac12,\qquad m_s = \pm\frac12$$

and the magnitude of the spin angular momentum is

$$|\vec{S}| = \sqrt{s(s+1)}\,\hbar = \frac{\sqrt{3}}{2}\hbar$$

**Spin magnetic moment**: the spin magnetic moment is proportional to the spin angular momentum, but with a gyromagnetic ratio different from the orbital case:

$$\vec{\mu}_s = -g_s\frac{e}{2m_e}\vec{S} = -g_s\mu_B\frac{\vec{S}}{\hbar},\qquad g_s \approx 2.0023$$

where $\mu_B = e\hbar/(2m_e) \approx 9.27\times 10^{-24}\,\text{J/T}$ is the Bohr magneton. Note that the spin $g$ factor is about 2, whereas the orbital value is $g_L=1$.

**Spin–orbit coupling**: in the rest frame of the electron the motion of the nucleus produces a magnetic field that acts on the electron spin moment; the Hamiltonian is approximately

$$H_{so} \approx \xi(r)\,\vec{L}\cdot\vec{S},\qquad \xi(r) \propto \frac{1}{r}\frac{dV}{dr}$$

Coupling introduces the total angular momentum $\vec{J} = \vec{L}+\vec{S}$. For given $l\neq 0$, $j$ takes two values

$$j = l + \frac12 \quad\text{or}\quad j = l - \frac12$$

The level therefore splits, with a spacing (fine-structure splitting) of roughly

$$\Delta E_{fs} \sim \alpha^2 E_n$$

where $\alpha\approx 1/137$ is the fine-structure constant, so the splitting is far smaller than the principal level spacing.

**Alkali doublets**: the sodium valence electron in the $3p$ state ($l=1$) splits into $j=3/2$ and $j=1/2$; transitions to $3s\ (j=1/2)$ produce

$$D_1:\ 3p_{1/2}\to 3s_{1/2}\ (\lambda\approx 589.6\,\text{nm}),\qquad D_2:\ 3p_{3/2}\to 3s_{1/2}\ (\lambda\approx 589.0\,\text{nm})$$

**Landé g factor**: for total angular momentum $\vec{J}$, the projection of the magnetic moment along $\vec{J}$ gives

$$g_J = 1 + \frac{J(J+1) + S(S+1) - L(L+1)}{2J(J+1)}$$

and the Zeeman correction to the level energy is $\Delta E = g_J\mu_B B m_J$.

## 3. Why We Understand It This Way

**Why can spin not be classical rotation?** If the electron were a ball of radius about $10^{-15}\,\text{m}$ rotating with angular momentum $\hbar/2$, its surface speed would far exceed the speed of light, violating relativity; moreover a $g$ factor near 2 cannot be obtained from any uniformly charged sphere model. Spin is a purely quantum intrinsic property.

**Why do alkali metals show doublets while hydrogen's fine structure is more hidden?** An alkali atom has closed inner shells plus one valence electron; the effective potential felt by the valence electron deviates from pure Coulomb because of inner screening, and spin–orbit coupling is significant in $p,d$ states, splitting the principal line clearly into a doublet. Hydrogen's fine structure exists too, but the splitting is smaller and often masked by other effects.

**Why is $g_s\approx 2$ "anomalous"?** If the electron were merely a charged point particle in orbital motion, $g$ should be 1; the Dirac equation gives $g_s=2$ naturally from relativistic quantum mechanics, and quantum electrodynamics further explains the tiny $0.0023$ deviation (the anomalous magnetic moment)—one of the most precise predictions of theoretical physics.

**Why must the angular momenta couple?** Both the spin and orbital magnetic moments interact with the magnetic field, and the two are "entangled" through relativistic corrections; only the total $\vec{J}$ is conserved, and only in the $L,S,J$ coupling scheme (LS coupling) can levels and selection rules be labelled correctly.

## 4. Typical Calculations

**Example 1: spin projection values.** The $z$ component of the electron spin is

$$S_z = m_s\hbar = \pm\frac12\hbar$$

corresponding to the two states $|\uparrow\rangle,|\downarrow\rangle$—exactly the origin of the two beams in the Stern–Gerlach experiment.

**Example 2: Landé g factor (sodium $3p$).** For $L=1,S=1/2,J=3/2$:

$$g_J = 1 + \frac{\frac{15}{4}+\frac34 - 2}{2\cdot\frac{15}{4}} = 1 + \frac{1}{3} = \frac43$$

For $J=1/2$:

$$g_J = 1 + \frac{\frac34+\frac34 - 2}{2\cdot\frac34} = 1 - \frac23 = \frac13$$

The two differ, making the Zeeman pattern asymmetric—the hallmark of the anomalous Zeeman effect.

**Example 3: estimating the fine-structure splitting.** The sodium $3p$ doublet has an energy difference of about $\Delta E_{fs}\approx 2.1\,\text{meV}$, corresponding to a wavelength difference

$$\Delta\lambda \approx \frac{\lambda^2}{hc}\Delta E \approx \frac{(589\,\text{nm})^2}{1240\,\text{eV}\cdot\text{nm}}\times 0.0021\,\text{eV} \approx 0.59\,\text{nm}$$

in agreement with the observed separation of $D_1$ and $D_2$.

## 5. Common Misconceptions

**Misconception 1: spin means the electron is really rotating.** As noted above, this is a misleading picture; spin has no classical counterpart and is an intrinsic quantum number.

**Misconception 2: the spin g factor should be 1.** Only orbital motion has $g_L=1$; because of the relativistic Dirac equation the spin has $g_s\approx 2$, and misusing this gives wrong magnetic moments and Zeeman splittings.

**Misconception 3: all spectral lines split into doublets.** Only levels with $l\neq 0$ and spin–orbit coupling split; for $l=0$ ($s$ states) $j$ is unique and there is no fine splitting.

**Misconception 4: the Landé g factor is always greater than 1.** It can be greater than, equal to, or less than 1 depending on the combination of $L,S,J$; pure orbital gives $g=1$, pure spin gives $g=2$, and mixtures can fall below 1.

**Misconception 5: fine structure equals hyperfine structure.** Fine structure comes from relativistic corrections and spin–orbit coupling (inside the electron system), whereas hyperfine structure comes from the coupling between nuclear spin and the electrons, with a splitting smaller by about $m_e/M_p$.

## 6. Extensions and Synthesis

The introduction of spin completely changed the landscape of atomic physics. In the Pauli exclusion principle, spin together with the spatial wave function determines electron arrangement, thereby explaining the entire structure of the periodic table: each orbital holds at most two electrons of opposite spin. Without spin there would be no modern understanding of the regularities of the chemical elements.

Spin–orbit coupling and relativistic corrections together make up the "fine structure" of atomic levels; adding nuclear spin effects gives the "hyperfine structure". This layer-by-layer refinement makes spectroscopy the most precise probe of the atomic interior. These ideas extend to solid-state physics (electron paramagnetic resonance, spintronics) and particle physics (the intrinsic spin-1/2 statistics of fermions). From the two fine lines split out of the warm yellow light of a sodium lamp to modern quantum information and spin qubits, the chapter on electron spin raises atomic physics from "orbital mechanics" to a complete quantum many-body picture. Next chapter we turn to larger systems—molecules and lasers—to see how atoms combine into molecules and how they are driven into stimulated emission, the light of modern technology.`,
  },

  'molecules-laser': {
    chapter: 'Chapter 7 Molecules and Lasers',
    title: 'Molecular Spectra and Stimulated Emission',
    summary:
      'Molecules produce characteristic spectra through rotational, vibrational, and electronic transitions; lasers exploit stimulated emission under population inversion to amplify coherent light, and the three-level system is the classic model for understanding laser operation.',
    keyPoints: [
      'Molecular levels comprise electronic, vibrational, and rotational parts, giving electronic, vibrational, and rotational spectra by energy scale',
      'Rigid-rotor levels $E_J = J(J+1)\\hbar^2/(2I)$; vibration approximates a harmonic oscillator $E_v = (v+1/2)\\hbar\\omega$',
      'Stimulated emission: an incident photon induces a clone photon of the same frequency, phase, and direction',
      'Lasing requires population inversion and optical cavity feedback',
      'A three-level system (e.g. ruby) pumps population to an upper level to achieve inversion',
    ],
    content: String.raw`

When we bring two or more atoms together to form a molecule, the levels that belonged to a single atom suddenly become rich: the electrons still move among the nuclei, but the nuclei themselves can vibrate relative to one another, and the whole molecule can rotate. Each of the three motions has its own energy scale—electronic motion is largest (of order eV), vibration next (about $0.1\,\text{eV}$), rotation smallest (about $10^{-3}\,\text{eV}$)—and their superposition makes molecular spectra far denser and more complex than atomic spectra, yet for that very reason rich in information about chemical bonds and molecular structure.

On the other hand, the laser, born in the mid-twentieth century, completely changed the way humanity uses light. In an ordinary source atoms emit independently and "spontaneously", the waves are chaotic; a laser instead multiplies photons through "stimulated emission", outputting a beam that is highly directional, extremely monochromatic, and strongly coherent. To understand the laser, grasp two keywords: population inversion and resonant cavity. This chapter starts from the degrees of freedom of a molecule and moves to stimulated emission and the three-level system, the root of modern optics.

## 2. Rigorous Definitions and Formulas

**Rigid rotor (pure rotation)**: approximating a diatomic molecule as two point masses at fixed distance $r$ rotating about the centre of mass, the moment of inertia is $I = \mu r^2$ ($\mu$ the reduced mass), and the levels are

$$E_J = \frac{J(J+1)\hbar^2}{2I},\qquad J = 0,1,2,\dots$$

The rotational selection rule is $\Delta J = \pm 1$; absorption lines are approximately equally spaced and lie in the far infrared to microwave region.

**Harmonic oscillator (pure vibration)**: vibration along the chemical bond is approximated by a harmonic potential, with levels

$$E_v = \left(v + \frac12\right)\hbar\omega,\qquad v = 0,1,2,\dots$$

The zero-point energy $\tfrac12\hbar\omega$ shows that a molecule vibrates even at absolute zero. A combined vibration–rotation spectrum carries a rotational fine structure around each vibrational line.

**Total electronic–vibrational–rotational energy**: approximately additive,

$$E \approx E_{\text{el}} + E_v + E_J$$

so electronic transitions (visible/ultraviolet) are usually "smeared" by vibrational and rotational substructure into band spectra—the reason molecular spectra appear as "bands" rather than "lines".

**Einstein coefficients and stimulated emission**: take two levels $1$ (lower), $2$ (upper) with populations $N_1,N_2$ per unit volume. In a radiation field of energy density $\rho(\nu)$, per unit time and volume:
- absorption: $N_1 B_{12}\rho$
- spontaneous emission: $N_2 A_{21}$
- stimulated emission: $N_2 B_{21}\rho$

At equilibrium, combined with the Planck distribution, this yields

$$g_1 B_{12} = g_2 B_{21},\qquad A_{21} = \frac{8\pi h\nu^3}{c^3}B_{21}$$

The photon from stimulated emission has the same frequency, phase, polarization, and direction as the incident photon—the origin of laser coherence.

**Population inversion and gain**: in normal thermal equilibrium $N_2 \ll N_1$ and absorption dominates; if pumping makes $N_2 > N_1$ (inversion), stimulated emission exceeds absorption and the medium has net gain.

**Three-level system**: take ruby (Cr$^{3+}$ in Al$_2$O$_3$). Pumping lifts population from the ground state $E_1$ to a broad upper level $E_3$, which relaxes rapidly and non-radiatively to the metastable level $E_2$; once the population in $E_2$ exceeds that of the ground state $E_1$, inversion is achieved and stimulated emission on $E_2\to E_1$ gives the laser.

## 3. Why We Understand It This Way

**Why are molecular spectra bands rather than lines?** Every electronic transition is accompanied by a large number of possible vibrational and rotational changes; countless closely spaced lines crowd together into a continuous "band", which looks broad when resolution is insufficient but is really a dense line series.

**Why is the rotational scale the smallest?** The molecular moment of inertia $I$ is large (it involves the whole molecular mass and the bond length), and $\Delta E\sim \hbar^2/I$; a large denominator means small spacing, so rotational spectra fall in the microwave/far infrared.

**Why is population inversion needed to lase?** In thermal equilibrium the lower level is crowded, so light passing through the medium is net absorbed rather than amplified; only by lifting most of the population to the upper level does stimulated emission overcome absorption and amplify light—the essential difference between a laser and a light bulb.

**Why does a three-level system cost more pumping than four?** A three-level system needs more than half the ground-state population moved to $E_2$ before inversion (a high threshold); in a four-level system the lower lasing level is nearly empty, so a little pumping gives inversion and higher efficiency, which is why most modern lasers are four-level.

**Why is the resonant cavity indispensable?** A single pass gives limited gain; the cavity makes light bounce back and forth through the gain medium many times, accumulating amplification and, through the cavity modes, selecting a single frequency and direction, outputting a highly monochromatic, collimated beam.

## 4. Typical Calculations

**Example 1: rotational constant and line spacing.** For CO, $\mu\approx 1.14\times 10^{-26}\,\text{kg}$ and $r\approx 0.113\,\text{nm}$, so

$$I = \mu r^2 \approx 1.14\times 10^{-26}\times (1.13\times 10^{-10})^2 \approx 1.46\times 10^{-46}\,\text{kg·m}^2$$

$$\frac{\hbar^2}{2I} \approx \frac{(1.055\times 10^{-34})^2}{2\times 1.46\times 10^{-46}} \approx 3.8\times 10^{-23}\,\text{J} \approx 2.4\times 10^{-4}\,\text{eV}$$

and the spacing between adjacent rotational lines is $2B = 2\hbar^2/I \approx 4.8\times 10^{-4}\,\text{eV}$, squarely in the far infrared.

**Example 2: estimating the vibrational frequency.** If the effective force constant of the bond is $k\approx 1900\,\text{N/m}$, then

$$\omega = \sqrt{\frac{k}{\mu}} \approx \sqrt{\frac{1900}{1.14\times 10^{-26}}} \approx 4.1\times 10^{14}\,\text{rad/s}$$

$$\hbar\omega \approx 1.055\times 10^{-34}\times 4.1\times 10^{14} \approx 4.3\times 10^{-20}\,\text{J} \approx 0.27\,\text{eV}$$

corresponding to infrared absorption, consistent with the measured CO vibrational energy of about $0.27\,\text{eV}$.

**Example 3: growth of stimulated-emission power.** Let the small-signal gain coefficient be $g$; the intensity $I$ propagating through the medium satisfies $dI/dz = gI$, so $I(z)=I_0 e^{gz}$; when $gz\gg 1$ with cavity feedback the output is amplified dramatically, expressing the exponential growth at the heart of the laser.

## 5. Common Misconceptions

**Misconception 1: molecules have only electronic levels.** No—molecules also have vibrational and rotational degrees of freedom, equally important for spectra and thermodynamic properties; many molecules emit no visible light at all and are characterized only in the infrared or microwave.

**Misconception 2: stimulated emission violates energy conservation.** In stimulated emission the incident photon energy must match the level difference $h\nu = E_2-E_1$; the extra photon energy comes from the upper-level population, and the total is conserved.

**Misconception 3: the laser "creates light from nothing".** A laser needs pump energy to excite the population to the upper level and then releases that energy as coherent light—conversion, not creation.

**Misconception 4: population inversion is an equilibrium state.** Inversion is a strongly non-equilibrium state that must be maintained by external pumping; stop the pump and the system quickly relaxes to thermal equilibrium and the laser goes out.

**Misconception 5: three-level systems are easier than four-level.** The opposite: three-level systems require emptying most of the ground state, giving a high threshold and low efficiency; four-level systems, with a nearly empty lower lasing level, invert easily and are far more widely used.

## 6. Extensions and Synthesis

Molecular spectroscopy is an indispensable "fingerprint" technique in modern chemistry and biology: infrared spectroscopy identifies functional groups, Raman spectroscopy probes symmetric vibrations, and microwave spectroscopy measures bond lengths and dipole moments precisely. Together these form the toolkit for identifying everything from drug molecules to interstellar molecules. Comparing molecular rotational–vibrational levels with the quantum harmonic oscillator and rotor models is a shortcut to understanding the quantum nature of the chemical bond.

Laser technology has turned stimulated emission from an abstract formula into a device that changed society: from fibre-optic communications, laser surgery, and precision ranging to cold atoms and quantum computing, all rest on population inversion and coherent amplification. Notably, the invention of the laser is a model of engineering an atomic-physics concept—it stems from Einstein's 1917 theoretical prediction of radiative balance and took forty years to be first realized by Maiman with ruby. From the tiny rotational hops inside a molecule to coherent beams lighting up the entire information age, the last chapter of atomic physics ties microscopic quantum laws tightly to modern technology, and closes the course with a door opening onto modern optical science and quantum technology.`,
  },
};

export default map;
