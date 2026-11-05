import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'nuclear-properties': {
    chapter: 'Chapter 1 Basic Properties of the Atomic Nucleus',
    title: 'Nucleon Composition and the Nuclear Force',
    summary:
      'From nuclear charge and mass, nuclear radius and density to binding energy and the character of the nuclear force, this topic builds the full set of basic parameters and the physical picture used to describe a nucleus.',
    keyPoints: [
      'A nucleus consists of $Z$ protons and $N$ neutrons, with mass number $A = Z + N$ and nuclear charge $Ze$',
      'The nuclear radius obeys $R = r_0 A^{1/3}$ with $r_0 \\approx 1.2\\,\\text{fm}$; the density is about $2.3\\times 10^{17}\\,\\text{kg/m}^3$ and independent of $A$',
      'The binding energy is $B = [Z m_p + N m_n - M]c^2$, and the curve of binding energy per nucleon peaks near $A \\approx 56$ at about $8.8\\,\\text{MeV}$',
      'The nuclear force is short-ranged, saturated, charge-independent, and has a repulsive core and spin dependence',
      'Saturation of the nuclear force directly explains both the $A^{1/3}$ law for the radius and the near proportionality $B \\propto A$',
      'The free neutron is unstable because it is heavier than the proton by $1.293\\,\\text{MeV}$, and undergoes beta decay',
    ],
    content: String.raw`

In 1911 Rutherford inferred from the large-angle scattering of alpha particles that all the positive charge and almost all the mass of an atom are concentrated in a tiny region less than one ten-thousandth of the atomic radius: the nucleus. In the century since, our picture has grown from "a small positively charged dot" into "a quantum many-body system of protons and neutrons bound by the nuclear force". The task of this chapter is to measure, one by one, the basic parameters of this small and heavy heart—charge, mass, size, density, binding energy—and to answer a more fundamental question: why do positively charged protons crowded into a space of femtometre scale not blow apart under Coulomb repulsion.

If an atom were blown up to a stadium a hundred metres across, the nucleus would be the size of a mung bean, yet it carries more than 99.9 percent of the mass. More astonishing still is its density: one cubic centimetre of nuclear matter can weigh two hundred million tonnes. Such extreme compactness means that matter inside a nucleus is utterly unlike any macroscopic state, and must be described by quantum mechanics and the strong interaction. Nuclear matter has no "container"; it is held together by its own forces, a self-bound quantum droplet.

The three integers that most basically describe a nucleus are the proton number $Z$, the neutron number $N$, and the mass number $A = Z + N$. $Z$ fixes the nuclear charge $Ze$ and hence which chemical element the atom is; changing $N$ leaves the chemistry alone but profoundly affects nuclear stability. Nuclei with the same $Z$ and different $N$ are called isotopes, those with the same $A$ and different $Z$ isobars, and those with the same $N$ and different $Z$ isotones. Because protons and neutrons have similar masses and behave almost identically under the nuclear force, they are collectively called nucleons—the most basic and most powerful simplification in nuclear physics: treat the $A$ nucleons as two charge states of one particle.

## 2. Rigorous Definitions and Formulas

**Nuclear charge and nuclear mass**: the nuclear charge is $Q = Ze$ with $e = 1.602\times 10^{-19}\,\text{C}$. The natural unit of mass in nuclear physics is the atomic mass unit

$$1\,\text{u} \equiv \frac{1}{12}m(^{12}\text{C}) = 1.6605\times 10^{-27}\,\text{kg} = 931.5\,\text{MeV}/c^2$$

The rest energies of the nucleons are $m_p c^2 = 938.272\,\text{MeV}$ and $m_n c^2 = 939.565\,\text{MeV}$, while the electron has only $m_e c^2 = 0.511\,\text{MeV}$. Note that the neutron is heavier than the proton by $1.293\,\text{MeV}$, more than twice the electron mass; this is exactly why the free neutron undergoes spontaneous beta decay while the free proton is stable.

**Nuclear radius**: electron scattering, muonic atom spectroscopy, and many other experiments show that the charge distribution of a nucleus is approximately spherically symmetric, with an equivalent radius obeying

$$R = r_0 A^{1/3},\qquad r_0 \approx 1.2\,\text{fm},\qquad 1\,\text{fm} = 10^{-15}\,\text{m}$$

More accurately the charge density is described by the two-parameter Fermi distribution

$$\rho(r) = \frac{\rho_0}{1 + \exp\!\left(\dfrac{r - R}{a}\right)},\qquad a \approx 0.54\,\text{fm}$$

where $a$ characterizes the diffuseness of the nuclear surface: a nucleus has no sharp geometric boundary but, like a liquid drop, possesses a "skin".

**Nuclear density**: treating the nucleus as a uniform sphere of radius $R$ and mass $M \approx A m_u$,

$$\rho = \frac{A m_u}{\frac43\pi R^3} = \frac{3 m_u}{4\pi r_0^3} \approx 2.3\times 10^{17}\,\text{kg/m}^3$$

The crucial point is that this result is independent of $A$: nuclear matter is an almost incompressible liquid whose density is a universal constant. This is a direct consequence of the saturation of the nuclear force.

**Mass defect and binding energy**: experiments show that a nucleus always weighs less than the sum of its constituent nucleons, and the difference

$$\Delta m = Z m_p + N m_n - M_{\text{nuc}}$$

is called the mass defect; the corresponding energy is the binding energy

$$B = \Delta m\, c^2 = \left[Z m_p + N m_n - M(A,Z)\right]c^2$$

If atomic masses (electrons included) are what is available, the electron masses cancel between the two sides (neglecting electron binding), giving the more convenient form

$$B = \left[Z\,M(^{1}\text{H}) + N\,m_n - M_{\text{atom}}(A,Z)\right]c^2$$

**Binding energy per nucleon** $\varepsilon = B/A$ is the key index of nuclear stability: it is largest for medium-mass nuclei ($A\approx 56$--$62$) at about $8.8\,\text{MeV}$; it is smaller for light nuclei and fluctuates with $A$; and it falls slowly for heavy nuclei, reaching only about $7.6\,\text{MeV}$ for $^{238}\text{U}$. This curve lifts fusion at one end and fission at the other, and is the physical basis of all nuclear energy use.

**Nuclear angular momentum, magnetic moment, and electric quadrupole moment**: a nucleus has a total angular momentum (nuclear spin) $I$; even-even nuclei always have a $0^+$ ground state, odd-$A$ nuclei take half-integer values, and odd-odd nuclei take integer values. Associated with the spin is the magnetic moment

$$\mu = g_I\,\mu_N\,I,\qquad \mu_N = \frac{e\hbar}{2m_p} = 5.05\times 10^{-27}\,\text{J/T}$$

The nuclear magneton is about $1836$ times smaller than the Bohr magneton, which shows that nuclear magnetism is far weaker than electronic magnetism—exactly why nuclear magnetic resonance signals are so feeble. The proton magnetic moment is $+2.793\,\mu_N$ and the neutron's is $-1.913\,\mu_N$: a neutron carries no net charge yet has a magnetic moment, which shows directly that it is not a point particle but has internal structure. In addition, many nuclei have a nonzero electric quadrupole moment $Q$, indicating a charge distribution that deviates from spherical—direct evidence of nuclear deformation.

**Main features of the nuclear force**: (1) short range, an effective range of about $1$--$2\,\text{fm}$; (2) enormous strength, about two orders of magnitude stronger than the electromagnetic interaction at $1\,\text{fm}$; (3) saturation, each nucleon interacting only with a few neighbours, hence $B\propto A$; (4) charge independence, the nuclear part of the $p$--$p$, $n$--$n$, and $n$--$p$ interactions being nearly the same; (5) a repulsive core, the potential turning strongly repulsive at separations below about $0.5\,\text{fm}$; (6) spin dependence, including a non-central tensor component.

## 3. Why It Works This Way

**Why is the nuclear radius proportional to $A^{1/3}$?** If the density of nuclear matter is constant, the volume is proportional to the nucleon number $A$, that is $\frac43\pi R^3 \propto A$, so $R \propto A^{1/3}$. Behind this lies the saturation of the nuclear force: each nucleon interacts only with a few neighbours, so adding nucleons is like adding liquid to a drop—it merely enlarges the volume without changing the internal tightness. Compare an atom: the electron cloud does not grow as $Z^{1/3}$ with the electron number, because the electromagnetic force is not saturated and inner electrons are pulled ever more tightly to the nucleus.

**Why is the nuclear density so astonishing?** Because the nucleons are almost touching. The mean spacing between nucleons inside a nucleus is about $1$--$2\,\text{fm}$, while the nucleons themselves are of femtometre size, so nuclear matter resembles a basket of hard spheres in contact. For comparison: water is $10^3\,\text{kg/m}^3$, white dwarf matter about $10^9\,\text{kg/m}^3$, and the core of a neutron star $10^{17}$--$10^{18}\,\text{kg/m}^3$—of the same order as nuclear density, because a neutron star is essentially a macroscopic nucleus.

**Why does the curve of binding energy per nucleon peak in the middle and fall at both ends?** Medium-mass nuclei give each nucleon the fullest set of neighbours, so the volume energy is maximized. In light nuclei surface nucleons are a large fraction, and lacking neighbours they are less tightly bound, which lowers $\varepsilon$; heavy nuclei do have full neighbourhoods, but Coulomb repulsion grows as $Z^2$ and is long-ranged and unsaturated, cancelling the gain in volume energy, so the curve sinks slowly. The peaks at $^{4}\text{He}$, $^{12}\text{C}$, and $^{16}\text{O}$ come from shell effects, discussed in Chapter 2.

**Why does a neutron, with no charge, have a magnetic moment?** Magnetic moments arise from moving charge. The neutron is neutral overall but contains charged quarks whose positive and negative parts are not spatially coincident, producing a nonzero net magnetic moment, directed opposite to the spin and therefore negative. The neutron magnetic moment was one of the earliest experimental signals that the nucleon has internal structure, decades before deep inelastic scattering confirmed the quarks. Similarly, the proton's magnetic moment greatly exceeds the value $2\times\frac{e\hbar}{2m_p}$ expected of a pointlike Dirac particle, which is further evidence of internal structure.

**Why must the nuclear force be a short-range strong force?** It has to overcome, at femtometre scales, a Coulomb repulsion of order hundreds of newtons between protons, so it must be extremely strong; yet it cannot be long-ranged, or all nucleons would attract one another and the nucleus would collapse to a point, and nuclear matter would not show a constant saturated density. Short range plus saturation is the unified explanation of the seemingly contradictory pair of properties: very high binding energy together with constant density.

**Why is a repulsive core needed?** If the nuclear force were attractive at every distance, nucleons would approach without limit. Experimentally, nucleon–nucleon scattering phase shifts change sign at high energy, showing that the potential is positive at very short distances. The repulsive core gives nuclear matter its incompressibility (a compression modulus of about $200\,\text{MeV}$) and is the microscopic basis for a neutron star's resistance to gravitational collapse.

## 4. Typical Calculations

**Example 1: the radius and density of $^{56}\text{Fe}$.** With $A = 56$, $R = 1.2\times 56^{1/3}\,\text{fm}$. Since $56^{1/3}\approx 3.826$,

$$R \approx 1.2\times 3.826\,\text{fm} \approx 4.6\,\text{fm}$$

The mass is $M = 56\times 1.6605\times 10^{-27}\,\text{kg} = 9.30\times 10^{-26}\,\text{kg}$ and the volume $\frac43\pi R^3 = \frac43\pi (4.6\times 10^{-15})^3 \approx 4.1\times 10^{-43}\,\text{m}^3$, hence

$$\rho = \frac{9.30\times 10^{-26}}{4.1\times 10^{-43}} \approx 2.3\times 10^{17}\,\text{kg/m}^3$$

in agreement with the direct evaluation of $3m_u/(4\pi r_0^3)$, confirming that the density is independent of $A$.

**Example 2: binding energies of the deuteron and the alpha particle.** For the deuteron $B = 2.22\,\text{MeV}$, a binding energy per nucleon of only $1.11\,\text{MeV}$, showing that it is a loosely bound system. The alpha particle ($^{4}\text{He}$) has $B = 28.3\,\text{MeV}$ and $7.07\,\text{MeV}$ per nucleon, far above its neighbours $^{3}\text{He}$ ($2.57\,\text{MeV}$ per nucleon) and $^{6}\text{Li}$ ($5.33\,\text{MeV}$ per nucleon). This prominent spike is exactly why the alpha particle is so stable and often emerges as a whole in nuclear reactions.

**Example 3: an intuitive scale for the mass defect.** A binding energy of $8\,\text{MeV}$ per nucleon corresponds to a defect per nucleon of

$$\Delta m = \frac{8\,\text{MeV}}{931.5\,\text{MeV/u}} \approx 8.6\times 10^{-3}\,\text{u}$$

that is, about one percent of the nucleon mass is converted into binding energy. The fraction looks small, but chemical energies are only of the order of electronvolts, so the energy scale of nuclear reactions is about six orders of magnitude higher.

**Example 4: comparing the nuclear and Coulomb forces.** Two protons separated by $r = 1\,\text{fm}$ have a Coulomb potential energy

$$V_C = \frac{e^2}{4\pi\varepsilon_0 r} = \frac{1.44\,\text{MeV}\cdot\text{fm}}{1\,\text{fm}} = 1.44\,\text{MeV}$$

corresponding to a force of about $1.44\,\text{MeV/fm} \approx 230\,\text{N}$ (using $1\,\text{MeV/fm} = 160\,\text{N}$). At the same distance the nuclear force is about two orders of magnitude stronger, reaching thousands of newtons, enough to bind the protons firmly inside the nucleus.

## 5. Common Misconceptions

**Misconception 1: the nuclear mass is the proton mass plus the neutron mass.** Wrong. The difference is the mass defect; though only about one percent, it is precisely where the entire binding energy resides. Any nuclear energy calculation must start from accurate masses and never simply add them.

**Misconception 2: binding energy is "energy stored in the nucleus that can be taken out".** Binding energy is the energy that must be supplied to break the nucleus into free nucleons; the nucleus itself sits at lower energy. The energy released in a bomb or a reactor comes from the difference of binding energy per nucleon before and after, not from "releasing the binding energy itself".

**Misconception 3: a nucleus has a well-defined surface.** The nuclear density varies gradually, with a transition layer from centre to edge usually described by the thickness between the $10\%$ and $90\%$ density points, about $2\,\text{fm}$; heavy nuclei can also be deformed and not spherical.

**Misconception 4: the nuclear force depends on charge.** After the Coulomb part is removed, the nuclear force treats $p$--$p$, $n$--$n$, and $n$--$p$ almost identically; this is charge independence and the experimental basis for the concept of isospin. Mirror nuclei such as $^{3}\text{He}$ and $^{3}\text{H}$ having highly similar level structures is direct proof.

**Misconception 5: nucleons move inside the nucleus on definite orbits like planets.** Nucleons are fermions forming a Fermi sea inside the nucleus, with a mean free path comparable to the nuclear radius; they must be described by a shell mean field plus residual interactions, not by classical orbits.

## 6. Summary and Outlook

This chapter has established the "identity card" of the nucleus: charge $Ze$, mass number $A$, radius $R\approx 1.2A^{1/3}\,\text{fm}$, constant density $2.3\times 10^{17}\,\text{kg/m}^3$, binding energy per nucleon about $8\,\text{MeV}$, and the short-range strong nuclear force that binds it all. These parameters look scattered but are highly self-consistent: saturation explains at once the constant density, the $A^{1/3}$ law, and $B\propto A$, while the shape of the binding-energy curve explains the energy sources of both fusion and fission.

With these basic quantities in hand, the next chapter can ask: why are some nuclei especially stable? Why do "magic numbers" exist? How are nucleons arranged inside a nucleus? From the liquid-drop model to the shell model we shall see how nuclear physics, like atomic physics, uses the tool of "models" to reduce a complex many-body problem to a computable, predictive physical picture. And throughout, the central thread remains the quantitative relation among mass, energy, and the nuclear force.
`,
  },
  'nuclear-models': {
    chapter: 'Chapter 2 Models of Nuclear Structure',
    title: 'The Liquid-Drop Model and the Shell Model',
    summary:
      'The Weizsäcker semi-empirical mass formula gives a macroscopic liquid-drop description of the binding energy, while magic numbers and strong spin–orbit coupling build a microscopic shell model; the two are unified in the picture of collective motion.',
    keyPoints: [
      'The physical origin of the five terms of the Weizsäcker formula $B = a_v A - a_s A^{2/3} - a_c Z(Z-1)A^{-1/3} - a_a (A-2Z)^2/A + \\delta$',
      'The volume and surface terms express the saturation of the nuclear force, while the Coulomb and asymmetry terms fix the position of the beta stability line',
      'The magic numbers $2, 8, 20, 28, 50, 82, 126$ are the most direct experimental evidence for the shell model',
      'Strong spin–orbit coupling $\\vec{l}\\cdot\\vec{s}$ splits the levels into $j = l \\pm 1/2$, and this is the key to reproducing the magic numbers',
      'Doubly magic nuclei such as $^{4}\\text{He}$, $^{16}\\text{O}$, $^{208}\\text{Pb}$ are exceptionally stable, and the shell model predicts ground-state spin and parity',
      'Nuclei far from closed shells become deformed and develop rotational and vibrational collective spectra',
    ],
    content: String.raw`

A nucleus is a strongly interacting many-body system of a few tens to a few hundred nucleons. Solving such a quantum many-body problem exactly is extremely difficult, so physicists adopted the same strategy as in atomic physics: build models. What is fascinating is that two apparently contradictory models both succeed spectacularly for the same nucleus—one treats it as a charged liquid drop, the other as a shell structure in which nucleons move independently in a mean field.

The liquid-drop model seizes the "macroscopic" and "statistical" side: nuclear density is constant and the nuclear force is saturated, so the nucleus is like an incompressible charged droplet. It is very good at answering questions about overall energy: what is the binding energy of this nucleus, will it fission, where does the beta stability line lie. The shell model seizes the "microscopic" and "single-particle" side: nucleons move almost independently in the mean field formed by all the others, producing a level structure analogous to the electron shells of an atom. It is very good at answering questions about quantum states: what are the ground-state spin and parity, why are certain nuclei especially stable.

The two pictures can coexist because they describe two sides of one coin: the liquid-drop model gives the smooth average trend, and the shell model superimposes quantum corrections on it. A real nucleus has both the collective behaviour of a droplet and the shell structure of single particles, and their unification is the "collective model" and "unified model" developed later. Understanding this is the key to the whole of nuclear structure physics.

## 2. Rigorous Definitions and Formulas

**The Weizsäcker semi-empirical mass formula** (the Bethe–Weizsäcker formula) writes the binding energy as the sum of five terms

$$B(A,Z) = a_v A - a_s A^{2/3} - a_c\frac{Z(Z-1)}{A^{1/3}} - a_a\frac{(A-2Z)^2}{A} + \delta$$

A commonly used set of coefficients is (in MeV)

$$a_v = 15.75,\quad a_s = 17.8,\quad a_c = 0.711,\quad a_a = 23.7,\quad \delta = \begin{cases} +34\,A^{-3/4}, & \text{even-even nuclei} \\ 0, & \text{odd-}A\text{ nuclei} \\ -34\,A^{-3/4}, & \text{odd-odd nuclei} \end{cases}$$

The physical meaning of the terms is as follows: volume energy (saturation of the nuclear force, a constant binding contribution per nucleon), surface energy (surface nucleons have fewer neighbours; a correction by the surface area $A^{2/3}$), Coulomb energy (electrostatic repulsion between protons, estimated as $Z(Z-1)/R$), asymmetry energy (the Pauli principle favours $N\approx Z$; departing from $N=Z$ forces nucleons into higher kinetic states), and pairing energy (like nucleons are more stable in pairs).

Extremizing this formula with respect to $Z$ gives the beta stability line

$$Z_{\text{stable}} \approx \frac{A}{2 + \dfrac{a_c}{2a_a}A^{2/3}} \approx \frac{A}{2 + 0.015\,A^{2/3}}$$

which explains why light nuclei are stable at $N\approx Z$ while heavy nuclei need more neutrons to "dilute" the Coulomb repulsion.

**The shell model**: the experimentally defined magic numbers are

$$2,\ 8,\ 20,\ 28,\ 50,\ 82,\ 126$$

When the proton or neutron number equals a magic number the nucleus shows exceptional stability: a higher binding energy, a sudden rise in the energy of the first excited state, a sharp drop in the neutron capture cross-section. The shell model assumes that nucleons move independently in the average potential supplied by all the others; a common choice is the Woods–Saxon potential plus the Coulomb potential

$$V(r) = \frac{-V_0}{1 + \exp\!\left(\dfrac{r-R}{a}\right)}$$

But this alone yields only the magic numbers $2, 8, 20$ and cannot explain the larger ones. In 1949 Mayer and Jensen independently introduced a strong spin–orbit coupling term

$$V_{ls}(r)\,\vec{l}\cdot\vec{s},\qquad \vec{l}\cdot\vec{s} = \frac{1}{2}\left[j(j+1) - l(l+1) - s(s+1)\right]\hbar^2$$

which splits each $l$ level into $j = l + 1/2$ and $j = l - 1/2$, with the $j = l+1/2$ level pushed down substantially. It is precisely this splitting that moves the large gaps to the right places and reproduces all the magic numbers at a stroke. Levels are conventionally labelled $nl_j$, such as $1s_{1/2}$, $1p_{3/2}$, $1p_{1/2}$, $1d_{5/2}$, $2s_{1/2}$, $1d_{3/2}$, $1f_{7/2}$ and so on.

**The collective model**: in nuclei far from closed shells the coupling between valence nucleons and the core deforms the nucleus, described by a deformation parameter $\beta$. A deformed nucleus can rotate as a whole, with the rotational spectrum

$$E_J = \frac{\hbar^2}{2\mathcal{I}}J(J+1),\qquad J = 0, 2, 4, \dots\ (\text{even-even nuclei})$$

whose level spacing ratio $E_4/E_2 \approx 3.33$ is the signature of a rotational band; near-spherical nuclei instead show surface vibrations, with phonon excitations at approximately equal spacing.

## 3. Why It Works This Way

**Why can the liquid-drop model compute binding energies accurately?** Because the binding energy is a "global" quantity insensitive to the details of nucleon arrangement. Statistically, once the five dominant factors are captured—saturation (volume term), boundary effects (surface term), long-range Coulomb (Coulomb term), the Pauli principle (asymmetry term), and pairing (pairing term)—binding energies can be computed to one percent across hundreds of nuclei. It is a textbook success of "grasping the principal contradiction".

**Why must the surface energy be subtracted?** A nucleon at the surface has no neighbours on one side and is only about half as strongly bound as an interior nucleon. The number of surface nucleons is proportional to the surface area $\propto R^2 \propto A^{2/3}$, so the correction grows as $A^{2/3}$. This term is a large fraction in light nuclei, which is the main reason their binding energy per nucleon is low; as $A$ grows its relative importance decays as $A^{-1/3}$.

**Why does the Coulomb term use $Z(Z-1)$ rather than $Z^2$?** A proton does not interact with itself, and the number of proton pairs is $Z(Z-1)/2$, so the Coulomb energy is proportional to $Z(Z-1)$. This detail is unimportant for light nuclei but cannot be neglected in a high-precision mass formula.

**Why is spin–orbit coupling indispensable?** A pure central mean field (an infinite spherical well or a harmonic oscillator) puts the level gaps in the wrong places and cannot produce a large enough gap after $28$. With the $\vec{l}\cdot\vec{s}$ term, $1f_{7/2}$ is pushed far down and separated from the group above, creating the magic number $28$; similarly the downward shifts of $1g_{9/2}$, $1h_{11/2}$, and $1i_{13/2}$ produce $50$, $82$, and $126$. This is one of the most essential differences between nuclear and atomic shells: inside a nucleus the spin–orbit coupling is not a tiny fine-structure correction but a leading effect of the same order as the mean field, because it originates in the spin dependence of the nuclear force itself.

**Why must the mean field of the shell model be "self-consistent"?** The mean field is generated by all the nucleons, and each nucleon moves in that field, so the two must be self-consistent—the idea of the Hartree–Fock method. A self-consistent mean field reproduces magic numbers and single-particle levels starting from two-body nuclear forces, showing that although the nuclear many-body problem is extremely complicated it admits a good mean-field approximation; the part beyond the mean field is called the residual interaction, responsible for pairing and collective motion.

**What does pairing inside a nucleus have to do with superconductivity?** Nucleons experience a short-range pairing attraction that makes like nucleons occupy time-reversed conjugate orbitals in pairs, almost isomorphic to the formation of Cooper pairs by electrons in a metal. The pairing term, the $0^+$ ground states of even-even nuclei, and moments of inertia smaller than the rigid-body value can all be explained quantitatively by pairing correlations. Nuclear and condensed-matter physics reveal a deep structural similarity here, and the authors of BCS theory drew their inspiration from nuclear physics.

**Why are there so many even-even nuclei?** About one hundred and sixty stable even-even nuclei occur in nature, but only a handful of odd-odd ones ($^{2}\text{H}$, $^{6}\text{Li}$, $^{10}\text{B}$, $^{14}\text{N}$). The pairing term $\delta$ says that nuclei with paired protons and paired neutrons are additionally stabilized, while unpaired nucleons leave an energy penalty.

**Why does deformation occur only far from closed shells?** A closed-shell nucleus is spherical, because the shell structure is especially stable against deformation; when a shell is partly filled, valence nucleons polarize the core and prefer an ellipsoidal deformation that lowers the energy. A deformed nucleus can rotate as a whole, producing rotational bands—a collective motion of liquid-drop type, where the shell and liquid-drop pictures merge.

## 4. Typical Calculations

**Example 1: the binding energy of $^{56}\text{Fe}$ from the Weizsäcker formula.** With $A = 56$, $Z = 26$ (even-even), $A^{1/3} \approx 3.826$, $A^{2/3} \approx 14.64$:

$$\begin{aligned} a_v A &= 15.75\times 56 = 882.0 \\ a_s A^{2/3} &= 17.8\times 14.64 = 260.6 \\ a_c\frac{Z(Z-1)}{A^{1/3}} &= 0.711\times\frac{26\times 25}{3.826} = 0.711\times 169.9 = 120.8 \\ a_a\frac{(A-2Z)^2}{A} &= 23.7\times\frac{(56-52)^2}{56} = 23.7\times 0.286 = 6.8 \\ \delta &= +34\times 56^{-3/4} = +1.7 \end{aligned}$$

$$B = 882.0 - 260.6 - 120.8 - 6.8 + 1.7 \approx 495.5\,\text{MeV}$$

The experimental value is $492.3\,\text{MeV}$, a relative error below one percent, and the binding energy per nucleon $8.85\,\text{MeV}$ against $8.79\,\text{MeV}$.

**Example 2: the contributions for the heavy nucleus $^{238}\text{U}$.** With $A = 238$, $Z = 92$, $A^{1/3}\approx 6.20$, $A^{2/3}\approx 38.4$: volume $3748.5$, surface $-684.1$, Coulomb $-960.2$, asymmetry $-290.4$, pairing $+0.6$, totaling about $1814\,\text{MeV}$ against the experimental $1801.7\,\text{MeV}$. The Coulomb and asymmetry terms together already reach $1250\,\text{MeV}$, cancelling almost a third of the volume energy—exactly the root of the instability of heavy nuclei.

**Example 3: the position of the beta stability line.** For $A = 56$, $Z_{\text{stable}} \approx 56/(2 + 0.015\times 14.64) = 56/2.22 \approx 25.2$, consistent with $Z = 26$ for the stable nuclide $^{56}\text{Fe}$; for $A = 208$, $A^{2/3}\approx 34.9$ and $Z_{\text{stable}} \approx 208/(2+0.52) \approx 82.5$, exactly $Z = 82$ for $^{208}\text{Pb}$. As $A$ grows the stability line shifts ever further toward neutron excess.

**Example 4: ground-state spin and parity predicted by the shell model.** For an odd-$A$ nucleus the ground-state spin and parity are fixed by the $nl_j$ orbital of the last unpaired nucleon, the parity being $(-1)^l$. For $^{17}\text{O}$: $^{16}\text{O}$ is doubly magic ($Z=N=8$) and the ninth neutron falls into $1d_{5/2}$, so the ground state is $5/2^+$; for $^{15}\text{O}$ there is a hole in $1p_{1/2}$, giving $1/2^-$. These predictions agree perfectly with experiment—the finest triumph of the shell model.

**Example 5: an empirical check of the pairing term.** Comparing the neutron separation energies of $^{120}\text{Sn}$ ($Z = 50$ magic, $N = 70$ even) and $^{121}\text{Sn}$ ($N = 71$ odd), the former is about $1.2\,\text{MeV}$ higher. This systematic odd-even staggering directly reflects the pairing term $\delta$: a paired neutron gains extra binding, while an unpaired one must pay the pairing penalty.

## 5. Common Misconceptions

**Misconception 1: the liquid-drop and shell models are mutually exclusive.** Quite the opposite: they are complementary. The liquid-drop model gives the smooth background energy and the shell model the quantum fluctuations on top. Modern large-scale shell-model calculations and density-functional methods combine the two.

**Misconception 2: the Weizsäcker formula is derived from first principles.** It is semi-empirical: the form of each term has physical justification, but the coefficients are fitted to experimental masses. Different sources therefore quote slightly different coefficient sets, and the coefficients used must be used consistently.

**Misconception 3: magic numbers come from "nucleons arranged in pretty geometric shapes".** Such guesses were made early on, but the real mechanism is quantum degeneracy: each $nl_j$ level holds $2j+1$ like nucleons, and the cumulative nucleon count at each large gap is a magic number.

**Misconception 4: the shell model applies only to spherical nuclei.** The deformed shell model (Nilsson model) extends the mean field to a deformed potential, handles the many deformed nuclei of the rare-earth and actinide regions, and successfully predicts their single-particle levels and rotational bands.

**Misconception 5: the larger the binding energy, the more stable the nucleus.** What really decides stability is the binding energy per nucleon and the energy difference relative to neighbouring nuclides (the $Q$ value of alpha decay, the height of the fission barrier). $^{238}\text{U}$ has a total binding energy of $1800\,\text{MeV}$ and still decays spontaneously.

## 6. Summary and Outlook

This chapter has described one and the same nucleus with two models: the Weizsäcker formula computes the binding energy to one percent from five physical factors and yields the beta stability line and the fission trend; the shell model reproduces all the magic numbers through strong spin–orbit coupling and predicts ground-state spin and parity precisely. The two merge in the collective motion of deformed nuclei and form our basic understanding of nuclear structure.

It is worth adding that the semi-empirical mass formula, with only five parameters, reproduces the masses of more than two thousand known nuclides with a root-mean-square error of about $3\,\text{MeV}$; modern macroscopic–microscopic mass models add shell and deformation corrections and reduce the error below $1\,\text{MeV}$, providing essential input for astrophysical calculations such as rapid neutron capture (the r-process) nucleosynthesis.

These models are not merely historical relics but working tools of today's research: in neutron-rich nuclei far from beta stability (the objects of radioactive-beam facilities) magic numbers migrate or even disappear, and new "new magic numbers" are continually being discovered; pairing, deformation, and coupling to the continuum become crucial near the drip lines. The next chapter turns to the dynamic behaviour of nuclei—radioactive decay—where differences in binding energy translate directly into observable decay energies and half-lives.
`,
  },
  'nuclear-decay': {
    chapter: 'Chapter 3 Radioactive Decay',
    title: 'Decay Modes and Their Laws',
    summary:
      'With the exponential decay law as the main thread, this topic treats systematically the energetics, selection rules, and half-lives of alpha, beta, and gamma decay, and gives quantitative methods for cascade decay and activity.',
    keyPoints: [
      'The decay law $N(t) = N_0 e^{-\\lambda t}$, the half-life $T_{1/2} = \\ln 2/\\lambda$, and the activity $A = \\lambda N$',
      'The $Q$ value of alpha decay follows from the mass difference, and the kinetic energy is shared inversely as the masses, $E_\\alpha = Q(A-4)/A$',
      'The alpha half-life is fixed by tunnelling through the Coulomb barrier, and the Geiger–Nuttall law gives a linear relation between $\\lg T_{1/2}$ and $1/\\sqrt{E_\\alpha}$',
      'Beta decay includes $\\beta^-$, $\\beta^+$, and orbital electron capture, with different $Q$-value conditions; the neutrino is what makes the continuous spectrum possible',
      'Gamma transitions compete with internal conversion, and decay schemes display levels, branching ratios, and selection rules',
      'Cascade decay obeys the Bateman equations, and under secular equilibrium the daughter activity approaches that of the parent',
    ],
    content: String.raw`

Of the more than three thousand nuclides discovered, only about two hundred and eighty are stable; the rest must transform into other nuclei by radioactive decay. Why are some nuclei stable and others not? The answer is again the binding energy per nucleon: whenever a channel exists that lowers the total mass, decay can occur, though the rate may be too slow to notice. $^{238}\text{U}$ has a half-life of four and a half billion years, comparable to the age of the Earth, which is why we still find it in nature; $^{8}\text{Be}$ has a half-life of only $10^{-16}\,\text{s}$ and splits into two alpha particles almost as soon as it forms.

The most profound property of radioactive decay is its memorylessness and statistical character. When a particular nucleus will decay is completely random and unpredictable; yet the decay rate of a large collection of like nuclei is extremely precisely proportional to the number present. This passage from individual randomness to collective certainty is the charm of statistical law, and it forces us to describe the fate of a nucleus only in probabilistic language.

There is also a practical thread. Natural radioactivity comprises three kinds of rays—alpha, beta, and gamma—which are deflected differently, or not at all, in a magnetic field, and by this Rutherford and others determined their charges and properties. We now know that alpha decay is the emission of a $^{4}\text{He}$ nucleus, beta decay is a nucleon inside the nucleus changing its charge and emitting an electron (or positron) and a neutrino, and gamma decay is a nucleus dropping from an excited state and emitting a high-energy photon. The three often occur in cascade, forming a complete decay scheme.

## 2. Rigorous Definitions and Formulas

**The decay law**: let the probability per unit time for any one nucleus to decay be the constant $\lambda$ (the decay constant); then

$$\frac{dN}{dt} = -\lambda N \quad\Longrightarrow\quad N(t) = N_0 e^{-\lambda t}$$

This defines the half-life and the mean lifetime

$$T_{1/2} = \frac{\ln 2}{\lambda},\qquad \tau = \frac{1}{\lambda} = \frac{T_{1/2}}{\ln 2}$$

and the activity (decays per unit time) is

$$A(t) = \lambda N(t) = A_0 e^{-\lambda t}$$

Its unit is the becquerel $\text{Bq} = \text{s}^{-1}$, with the conventional unit curie $1\,\text{Ci} = 3.7\times 10^{10}\,\text{Bq}$ (originally defined as the activity of $1\,\text{g}$ of radium).

**Alpha decay**: a parent nucleus $P$ becomes a daughter $D$ and emits an alpha particle

$$^{A}_{Z}X \;\to\; ^{A-4}_{Z-2}Y + ^{4}_{2}\text{He}$$

The released decay energy is

$$Q_\alpha = \left[M(A,Z) - M(A-4,Z-2) - M(^{4}\text{He})\right]c^2$$

Momentum conservation requires the alpha particle and the daughter to have equal momentum magnitudes, so the kinetic energy is shared inversely as the masses

$$E_\alpha = Q_\alpha\frac{A-4}{A},\qquad E_D = Q_\alpha\frac{4}{A}$$

The half-life is fixed by the probability of the alpha particle tunnelling through the Coulomb barrier. Roughly, the transmission factor is $P \sim e^{-2G}$, where the Gamow factor is

$$2G = \frac{2}{\hbar}\int_R^b \sqrt{2m_\alpha\left[V(r) - E\right]}\,dr,\qquad V(r) = \frac{2Z_D e^2}{4\pi\varepsilon_0 r}$$

with the upper limit fixed by $V(b) = E$, that is $b = 2Z_D e^2/(4\pi\varepsilon_0 E)$. Written empirically, the half-life obeys the Geiger–Nuttall law

$$\lg T_{1/2} = \frac{a\,Z_D}{\sqrt{E_\alpha}} + b$$

which gives a beautiful straight line across half-lives spanning more than twenty orders of magnitude.

**Beta decay**: in essence a weak-interaction transformation of a nucleon inside the nucleus

$$\beta^-:\; n \to p + e^- + \bar{\nu}_e,\qquad \beta^+:\; p \to n + e^+ + \nu_e,\qquad \text{EC}:\; p + e^- \to n + \nu_e$$

In terms of atomic masses the $Q$-value conditions are respectively

$$Q_{\beta^-} = \left[M(A,Z) - M(A,Z+1)\right]c^2$$
$$Q_{\beta^+} = \left[M(A,Z) - M(A,Z-1) - 2m_e\right]c^2$$
$$Q_{\text{EC}} = \left[M(A,Z) - M(A,Z-1)\right]c^2$$

where $\beta^+$ requires subtracting two electron masses (one for the positron, one for the difference in atomic electron number). The energy of the electron (or positron) is continuous because the energy is shared among three final-state particles and the missing share is carried off by the neutrino—exactly the reason Pauli proposed the neutrino hypothesis in 1930.

**Branching ratios and decay schemes**: if a nucleus has several decay channels, each with its own partial decay constant $\lambda_i$, the total decay constant is $\lambda = \sum_i \lambda_i$, the branching ratio is $b_i = \lambda_i/\lambda$, and the observed half-life is $T_{1/2} = \ln 2/\lambda$. Plotting the levels of parent and daughter, the transition energies, the branching ratios, and the spin and parity of each level on a single diagram gives the decay scheme, the most used and most intuitive "map" in nuclear data tables.

**Gamma decay and internal conversion**: an excited nucleus de-excites by emitting a photon

$$E_\gamma = E_i - E_f - E_{\text{recoil}}$$

or by handing the energy directly to an atomic electron (internal conversion), with internal conversion coefficient $\alpha_{\text{ic}} = \Gamma_{e}/\Gamma_{\gamma}$. Gamma transitions obey angular momentum and parity selection rules; the higher the multipolarity and the lower the energy, the slower the transition, which is why isomeric (metastable) states exist.

**Cascade decay**: for $1 \to 2 \to 3$,

$$\frac{dN_2}{dt} = \lambda_1 N_1 - \lambda_2 N_2$$

With $N_2(0) = 0$ this yields the Bateman equation

$$N_2(t) = \frac{\lambda_1}{\lambda_2 - \lambda_1}N_1(0)\left(e^{-\lambda_1 t} - e^{-\lambda_2 t}\right)$$

If the parent is far longer lived than the daughter ($\lambda_1 \ll \lambda_2$), after a long time secular equilibrium is reached:

$$\frac{N_2}{N_1} \approx \frac{\lambda_1}{\lambda_2},\qquad A_2 \approx A_1$$

If $\lambda_1$ and $\lambda_2$ are comparable but still $\lambda_1 < \lambda_2$, transient equilibrium occurs with $A_2/A_1 = \lambda_2/(\lambda_2 - \lambda_1)$—the operating principle of medical isotope generators.

## 3. Why It Works This Way

**Why is decay random?** Decay is governed by quantum tunnelling or by weak-interaction transitions, and a nucleus has no internal clock deciding when to decay; we can only give a transition probability per unit time. This has nothing to do with the "age" of the nucleus: a $^{238}\text{U}$ nucleus that has existed for a billion years has exactly the same probability of decaying in the next second as one just created.

**Why is the alpha energy discrete while the beta electron energy is continuous?** Alpha decay is a two-body decay, and momentum conservation fixes a unique sharing of energy between the alpha particle and the daughter, so the alpha spectrum consists of discrete lines. Beta decay is a three-body decay, and the energy can be shared arbitrarily among the electron, the neutrino, and the recoiling nucleus, so the electron spectrum is continuous. This difference was the most intractable puzzle of the 1930s; Bohr even considered abandoning energy conservation, until Pauli's neutrino resolved it completely.

**Why do heavy nuclei prefer alpha decay?** The alpha particle has a binding energy per nucleon of $7.07\,\text{MeV}$, so emerging as a whole is energetically "profitable"; it also carries two positive charges and has a fair probability of preforming inside the nucleus. Emitting a single proton or a heavier nucleus (such as $^{12}\text{C}$) is usually energetically unfavourable by comparison.

**Why is the alpha half-life so sensitive to energy?** Because the transmission probability is exponential. Changing $E_\alpha$ from $4\,\text{MeV}$ to $9\,\text{MeV}$ roughly halves the Gamow factor $2G$, while $e^{-2G}$ can change by twenty or thirty orders of magnitude. That is why thorium and uranium take billions of years to decay while some polonium isotopes decay almost instantly.

**Why can some excited states "live" so long?** The rate of a gamma transition grows as a high power of the transition energy and falls steeply with increasing multipolarity. When the spin difference between an excited state and the ground state is large but the energy difference is small, the transition is forced into high multipolarity (M4, E5) and the rate collapses, extending the lifetime to seconds, years, or longer—an isomer. $^{180\text{m}}\text{Ta}$ has a lifetime exceeding $10^{15}$ years and is the only naturally occurring isomer.

**Why do branching ratios differ from nucleus to nucleus?** Because they depend on the $Q$ value of each channel and the level structure of the daughter. $^{40}\text{K}$ can decay by $\beta^-$, by electron capture, and very rarely by $\beta^+$; the available energy differs for the three channels, and the nuclear matrix elements and final-state level densities further weight them, producing specific branching ratios. Decay does not "choose at will" but is strictly determined by quantum transition probabilities.

**Why is beta decay much slower than alpha decay?** Alpha decay only requires crossing a barrier and is a consequence of the strong interaction; beta decay must change flavour and can proceed only through the weak interaction, whose coupling is far smaller. Even with a substantial $Q$ value, beta half-lives are typically milliseconds or longer, sometimes $10^{16}$ years or more (double beta decay).

**Why does the electron capture channel exist?** When the $Q$ value is insufficient to create a positron (less than $2m_e c^2 = 1.022\,\text{MeV}$), the nucleus can still "swallow" an inner orbital electron to accomplish $p \to n$, emitting only a monoenergetic neutrino. EC and $\beta^+$ compete, and $Q_{\text{EC}}$ exceeds $Q_{\beta^+}$ by $2m_e c^2$.

## 4. Typical Calculations

**Example 1: the alpha decay energy of $^{238}\text{U}$.** With atomic masses $M(^{238}\text{U}) = 238.0508\,\text{u}$, $M(^{234}\text{Th}) = 234.0436\,\text{u}$, $M(^{4}\text{He}) = 4.0026\,\text{u}$,

$$Q_\alpha = (238.0508 - 234.0436 - 4.0026)\times 931.5 = 0.0046\times 931.5 \approx 4.28\,\text{MeV}$$

and the alpha kinetic energy is

$$E_\alpha = 4.28\times\frac{234}{238} \approx 4.21\,\text{MeV}$$

in agreement with the measured $4.20\,\text{MeV}$ monoenergetic alpha line, while the recoiling $^{234}\text{Th}$ carries only $0.072\,\text{MeV}$.

**Example 2: the activity of a radium source.** $1\,\mu\text{g}$ of $^{226}\text{Ra}$ ($T_{1/2} = 1600\,\text{a}$) contains

$$N = \frac{10^{-6}}{226}\times 6.022\times 10^{23} \approx 2.66\times 10^{15}$$

nuclei. The decay constant is $\lambda = \ln 2/(1600\times 3.156\times 10^{7}\,\text{s}) \approx 1.37\times 10^{-11}\,\text{s}^{-1}$, so the activity is

$$A = \lambda N \approx 3.66\times 10^{4}\,\text{Bq} \approx 1\,\mu\text{Ci}$$

which explains the origin of the curie: the activity of $1\,\text{g}$ of radium is about $1\,\text{Ci}$.

**Example 3: the $\beta^+$ decay of $^{11}\text{C}$.** With $M(^{11}\text{C}) = 11.011434\,\text{u}$ and $M(^{11}\text{B}) = 11.009305\,\text{u}$, the mass difference is $0.002129\,\text{u} = 1.983\,\text{MeV}$; subtracting $2m_e c^2 = 1.022\,\text{MeV}$,

$$Q_{\beta^+} = 1.983 - 1.022 \approx 0.96\,\text{MeV}$$

Since $Q_{\beta^+} > 0$, $^{11}\text{C}$ can undergo positron decay, and it is one of the most used nuclides for PET (positron emission tomography) tracers.

**Example 4: radiocarbon dating.** In a living sample the $^{14}\text{C}/^{12}\text{C}$ ratio is in equilibrium with the atmosphere; after death the exchange stops and $^{14}\text{C}$ decays with $T_{1/2} = 5730\,\text{a}$. If a wooden sample has one fifth of the activity of fresh material,

$$t = T_{1/2}\frac{\ln 5}{\ln 2} = 5730\times 2.322 \approx 1.33\times 10^{4}\,\text{a}$$

that is, about thirteen thousand three hundred years. The method is very reliable for carbon-containing samples younger than fifty thousand years.

**Example 5: the $^{99}\text{Mo}$–$^{99\text{m}}\text{Tc}$ generator.** The parent $^{99}\text{Mo}$ has a half-life of $66\,\text{h}$ and the daughter $^{99\text{m}}\text{Tc}$ of $6\,\text{h}$. Since $\lambda_1 < \lambda_2$, transient equilibrium is reached after about a day:

$$\frac{A_2}{A_1} = \frac{\lambda_2}{\lambda_2 - \lambda_1} = \frac{1/6}{1/6 - 1/66} \approx 1.10$$

The daughter activity slightly exceeds the parent's and can be "milked" once a day while decaying at the parent's rate of $66\,\text{h}$—the principle of the technetium generator in hospitals.

**Example 6: branching ratios and partial half-lives.** $^{40}\text{K}$ decays to $^{40}\text{Ca}$ by $\beta^-$ with a branching ratio of about $89.3\%$, and to $^{40}\text{Ar}$ by electron capture with about $10.7\%$. If the total half-life is $1.25\times 10^{9}\,\text{a}$, the partial half-life of the $\beta^-$ channel is

$$T_{1/2}(\beta^-) = \frac{T_{1/2}}{b_{\beta^-}} = \frac{1.25\times 10^{9}}{0.893} \approx 1.40\times 10^{9}\,\text{a}$$

$^{40}\text{Ar}$ is a noble gas that is trapped in rock minerals and accumulates, while $^{40}\text{K}$ decreases with time; their ratio gives a clock—the physical basis of potassium–argon dating, whose range covers the whole history of the Earth and even of the solar system.

Incidentally, decay constants are not absolutely constant: for channels that depend on the wave function of atomic electrons, such as electron capture and internal conversion, the chemical environment can change the half-life by a relative amount of $10^{-3}$--$10^{-4}$. This is a real if small measurable link between nuclear physics and chemistry.

## 5. Common Misconceptions

**Misconception 1: the half-life is "the time for half the nuclei to decay away".** It should be understood as the time for each nucleus's survival probability to fall to one half. After two half-lives a quarter remains, not zero; in theory an infinite time is needed for complete decay.

**Misconception 2: activity equals the mass of the radioactive sample.** Activity is proportional to the number of nuclei divided by the half-life. A nuclide with an extremely long half-life may have low activity even in a large mass, while a trace of a short-lived nuclide can be intensely active. Radiation hazard depends on activity, the type of radiation, and its energy together.

**Misconception 3: beta decay "violates energy conservation".** The continuous beta spectrum once raised this doubt, but the neutrino carries away the missing energy and angular momentum. In 1956 Reines and Cowan directly detected neutrinos using reactor antineutrinos, fully confirming energy conservation.

**Misconception 4: the daughter only begins to decay after the parent has finished.** A cascade proceeds continuously, the daughter decaying as it is produced. If the daughter is much shorter lived than the parent, equilibrium is reached quickly; if the daughter lives far longer, it simply accumulates and no equilibrium exists.

**Misconception 5: the three decay chains can be combined at will.** A real decay must satisfy simultaneously the energy condition ($Q>0$), the angular momentum and parity selection rules, and the nuclear-structure "allowance". Forbidden transitions can have branching ratios too small to observe.

## 6. Summary and Outlook

With the exponential decay law as its skeleton, this chapter has brought alpha, beta, and gamma decay into a single framework: the energetics is fixed by mass differences, the rate by the type of interaction and by barrier penetration, and the distribution among final particles by conservation laws. The decay scheme turns all of this into a map; branching ratios tell us the probability of each road, half-lives how long the journey takes.

Radioactivity is not confined to the laboratory. It gives geology uranium–lead and potassium–argon dating, archaeology the $^{14}\text{C}$ clock, medicine nuclides for diagnosis and therapy, and cosmology evidence for nucleosynthesis. The next chapter reverses the question and asks what happens when particles are fired at nuclei: from spontaneous decay to controlled nuclear reactions, where $Q$ values, threshold energies, and cross-sections become the central concepts.
`,
  },
  'nuclear-reactions': {
    chapter: 'Chapter 4 Nuclear Reactions',
    title: 'Fission, Fusion, and Cross-Sections',
    summary:
      'Centred on the reaction energy Q and the cross-section, this topic discusses the energetics of nuclear reactions, threshold energies, and the compound-nucleus mechanism, and analyses the chain reaction of fission and the tunnelling through the Coulomb barrier in fusion.',
    keyPoints: [
      'The reaction energy $Q = (m_a + M_A - m_b - M_B)c^2$; $Q>0$ releases energy, $Q<0$ absorbs it and requires a threshold',
      'The laboratory threshold is $E_{\\text{th}} = -Q\\left(1 + \\dfrac{m_a}{M_A}\\right)$; an endoergic reaction must additionally supply recoil energy',
      'The cross-section $\\sigma$ expresses the probability, in units of the barn $1\\,\\text{b} = 10^{-28}\\,\\text{m}^2$, with reaction rate $R = \\Phi N\\sigma$',
      'The compound-nucleus mechanism gives the resonant Breit–Wigner cross-section; direct reactions and compound-nucleus reactions differ in timescale by six orders of magnitude',
      'Each $^{235}\\text{U}$ fission releases about $200\\,\\text{MeV}$, and $k_{\\text{eff}}$ together with delayed neutrons makes a controlled chain reaction possible',
      'D–T fusion has $Q = 17.6\\,\\text{MeV}$ against a Coulomb barrier of about $0.4\\,\\text{MeV}$, occurring in a hot plasma through tunnelling and the Gamow peak',
    ],
    content: String.raw`

The first three chapters dealt with the spontaneous behaviour of nuclei: unstable nuclei finding their own way toward stability. What truly changed the world, however, was hitting nuclei deliberately so that they transform as we wish. In 1919 Rutherford bombarded nitrogen with alpha particles and achieved the first artificial nuclear transformation $^{14}\text{N}(\alpha,p)^{17}\text{O}$; in 1932 Cockcroft and Walton bombarded lithium with protons, the first nuclear reaction driven by artificially accelerated particles; in 1938 Hahn and Strassmann discovered the fission of uranium; in 1952 the first hydrogen bomb ignited fusion.

The core questions of a nuclear reaction are only three: is it energetically allowed (the $Q$ value and the threshold)? How likely is it (the cross-section)? How are the products distributed (the reaction mechanism)? This chapter is organized around these three questions. Fission and fusion are their two most spectacular manifestations: the first splits a heavy nucleus, the second joins light nuclei, and in both cases the energy comes from the slope of the binding-energy curve.

It is worth stressing how astonishing the energy density of nuclear reactions is. One gram of $^{235}\text{U}$ fully fissioned releases energy comparable to the heat of combustion of more than two tonnes of good coal; one gram of a deuterium–tritium mixture releases about three times more again. This millionfold gap is the fundamental difference between nuclear and chemical energy.

## 2. Rigorous Definitions and Formulas

**Reaction energy and the $Q$ value**: for the two-body reaction $a + A \to b + B$, define

$$Q = \left[(m_a + M_A) - (m_b + M_B)\right]c^2$$

$Q>0$ is an exoergic reaction and $Q<0$ an endoergic one. Since the number of electrons in atomic masses is conserved, atomic masses can usually be used directly.

**Threshold energy**: an endoergic reaction does not occur as soon as the incident energy equals $|Q|$; kinetic energy must also be left for the overall motion of the final state. The non-relativistic result in the laboratory frame (target at rest) is

$$E_{\text{th}} = -Q\left(1 + \frac{m_a}{M_A}\right)$$

The exact relativistic expression is

$$E_{\text{th}} = \frac{\left[(m_b + M_B)^2 - (m_a + M_A)^2\right]c^2}{2M_A}$$

The excess is precisely the centre-of-mass kinetic energy that must be carried along.

**Reaction cross-section**: let a thin target have $n_t$ target nuclei per unit area, let $N_0$ particles be incident, and let $N_r$ react; then

$$\sigma = \frac{N_r}{N_0\,n_t}$$

It has the dimensions of an area, measured in barns

$$1\,\text{b} = 10^{-28}\,\text{m}^2 = 100\,\text{fm}^2$$

The differential cross-section $d\sigma/d\Omega$ gives the angular distribution, and the total cross-section is $\sigma = \int (d\sigma/d\Omega)\,d\Omega$. The reaction rate (reactions per unit time) is

$$R = \Phi\,N\,\sigma$$

where $\Phi$ is the incident flux (particles per unit time per unit area) and $N$ the number of nuclei in the target. For neutrons in a medium the macroscopic cross-section is $\Sigma = n\sigma$ and the mean free path $\ell = 1/\Sigma$.

**The compound-nucleus model**: Bohr proposed in 1936 that the reaction proceeds in two steps

$$a + A \to C^* \to b + B$$

The incident particle first merges with the target to form a compound nucleus $C^*$ in which the energy is thoroughly mixed; its lifetime of about $10^{-16}$--$10^{-18}\,\text{s}$ is far longer than the time for a particle to cross the nucleus ($10^{-22}\,\text{s}$), so it loses all memory of the entrance channel and its decay depends only on itself. Near a resonance the cross-section is described by the Breit–Wigner formula

$$\sigma \propto \frac{1}{(E - E_R)^2 + \Gamma^2/4}$$

where $E_R$ is the resonance energy and $\Gamma$ the level width (related to the lifetime by $\Gamma\tau \approx \hbar$). By contrast, direct reactions (stripping and pick-up) take place at the nuclear surface on a very short timescale and show pronounced forward-peaked angular distributions.

**Fission**: a heavy nucleus stretches along the deformation path of the liquid-drop model, overcomes the fission barrier and breaks. $^{235}\text{U}$ absorbing a thermal neutron forms $^{236}\text{U}^*$ with an excitation energy (about $6.5\,\text{MeV}$) above the fission barrier (about $6\,\text{MeV}$), so thermal neutrons can induce fission, whereas $^{238}\text{U}$ after neutron capture is insufficiently excited and needs fast neutrons above about $1\,\text{MeV}$. A typical fission releases about $200\,\text{MeV}$, distributed roughly as

$$E_{\text{fragment kinetic}} \approx 168\,\text{MeV},\quad E_{\text{prompt neutrons}} \approx 5\,\text{MeV},\quad E_{\text{prompt }\gamma} \approx 7\,\text{MeV},\quad E_{\beta+\gamma+\nu} \approx 20\,\text{MeV}$$

Each fission emits on average $\nu \approx 2.4$ neutrons, the physical basis of the chain reaction. The four-factor formula describes the multiplication factor of a thermal reactor

$$k_{\text{eff}} = \eta\,\varepsilon\,p\,f$$

$k_{\text{eff}} = 1$ is critical and $>1$ supercritical. Here $\eta$ is the number of fast neutrons produced per neutron absorbed, $\varepsilon$ the fast fission factor, $p$ the probability of escaping resonance capture, and $f$ the thermal utilization factor. The delayed neutron fraction of about $\beta \approx 0.0065$ stretches the response time of the reactor power from milliseconds to seconds and makes manual control possible.

**Fusion**: light nuclei combine into a more tightly bound nucleus. The easiest to achieve is the deuterium–tritium reaction

$$\text{D} + \text{T} \to\, ^{4}\text{He} + n,\qquad Q = 17.6\,\text{MeV}$$

Other important reactions are $\text{D} + \text{D} \to\, ^{3}\text{H} + p$ ($Q = 4.03\,\text{MeV}$) and $\text{D} + \text{D} \to\, ^{3}\text{He} + n$ ($Q = 3.27\,\text{MeV}$). The two nuclei must overcome the Coulomb barrier

$$E_C = \frac{Z_1 Z_2 e^2}{4\pi\varepsilon_0 R},\qquad R \approx r_0\left(A_1^{1/3} + A_2^{1/3}\right)$$

Thermonuclear reactions proceed through the combined action of tunnelling and the high-energy tail of the Maxwell distribution, whose product peaks at the so-called Gamow peak

$$E_0 = \left(\frac{E_G (kT)^2}{4}\right)^{1/3},\qquad E_G = \frac{(2\pi\alpha Z_1 Z_2)^2}{2}m_r c^2$$

Fusion ignition also requires the Lawson criterion (for D–T roughly $nT\tau \gtrsim 3\times 10^{21}\,\text{keV}\cdot\text{s}/\text{m}^3$): density, temperature, and confinement time must all be sufficient at once.

## 3. Why It Works This Way

**Why must an endoergic reaction pay extra energy?** The incident particle arrives with momentum, and the final state as a whole must keep the same centre-of-mass momentum; that kinetic energy cannot be used to pay the $Q$ value and is deducted as a toll. The lighter the projectile and the heavier the target, the smaller the toll—which also explains why threshold energies can be substantially above $|Q|$ in heavy-ion experiments.

**Why use a cross-section instead of a probability?** A cross-section merges the geometric size of the target nucleus and the dynamical effects of the interaction into one equivalent area, which is intuitive and easy to combine. It can be compared directly with the geometric cross-section $ \pi R^2 $: $^{235}\text{U}$ has a geometric cross-section of about $1.7\,\text{b}$ but a thermal-neutron fission cross-section as high as $585\,\text{b}$, showing that this is governed purely by quantum effects (resonance and the $1/v$ law) and has nothing to do with classical "aiming".

**Why are thermal neutrons more effective at inducing fission?** Neutrons carry no charge and face no Coulomb barrier; the lower the energy, the longer they linger near the nucleus and the greater the capture probability—the $1/v$ law approximately obeyed by the fission cross-section. Charged particles, by contrast, must first penetrate the Coulomb barrier, so their reaction rate grows with energy.

**Why does the compound nucleus "forget" how it was formed?** Because the energy is rapidly redistributed among the $A+1$ nucleons, forming a highly complex many-body excited state whose lifetime far exceeds any single-particle period. Statistically, the compound nucleus distributes its decay probability according to the number of available states in each open channel, independent of the entrance channel. This picture explains the ubiquity of resonances and why compound nuclei usually decay by evaporating neutrons or emitting gamma rays.

**Why can $^{238}\text{U}$ not serve as thermal-reactor fuel while $^{235}\text{U}$ can?** The key is the odd-even effect in neutron binding energy: the even-neutron nucleus ($^{235}\text{U}$ + n $\to$ $^{236}\text{U}$) gains about $1\,\text{MeV}$ more binding than the odd-neutron one ($^{238}\text{U}$ + n $\to$ $^{239}\text{U}$), just enough to clear the fission barrier. This difference of less than one percent is why $^{238}\text{U}$, which makes up $99.3\%$ of natural uranium, cannot by itself sustain a thermal neutron chain reaction.

**Why does fusion need a hundred million degrees?** The Coulomb barrier is only a few tenths of an MeV, but what actually drives the reaction is the product of the tunnelling probability and the Maxwell tail. At too low a temperature there are pitifully few particles with enough energy, and the tunnelling probability decays exponentially; only when the temperature reaches the order of ten keV (about a hundred million kelvin) does the Gamow peak fall where plenty of particles live. At the same time the plasma must be confined long enough, or radiative losses exceed the fusion output.

**Why must a fusion reactor "breed" its own tritium?** Tritium has a half-life of only $12.3\,\text{a}$ and hardly exists in nature, so it cannot be mined like uranium. A feasible approach is to breed it in situ from lithium using the fusion neutrons

$$^{6}\text{Li} + n \to\, ^{4}\text{He} + \text{T} + 4.8\,\text{MeV},\qquad ^{7}\text{Li} + n \to\, ^{4}\text{He} + \text{T} + n - 2.5\,\text{MeV}$$

Blanke design is therefore a central difficulty of fusion engineering: the tritium breeding ratio must exceed $1$ (with margin for losses and start-up inventory), while the blanket must also extract energy and shield against neutrons.

**Why is the fission fragment mass distribution asymmetric?** The liquid-drop model predicts symmetric splitting, but the measured mass yield for thermal fission of $^{235}\text{U}$ is double-humped, peaking near $A\approx 95$ and $A\approx 140$. This arises from shell effects: fragments prefer configurations close to magic numbers ($N=50$, $N=82$), another example of the liquid-drop and shell models interweaving.

## 4. Typical Calculations

**Example 1: the $Q$ value and threshold of $^{14}\text{N}(\alpha,p)^{17}\text{O}$.** With atomic masses $^{14}\text{N} = 14.003074\,\text{u}$, $^{4}\text{He} = 4.002603\,\text{u}$, $^{17}\text{O} = 16.999132\,\text{u}$, $^{1}\text{H} = 1.007825\,\text{u}$,

$$Q = (14.003074 + 4.002603 - 16.999132 - 1.007825)\times 931.5 = -0.00128\times 931.5 \approx -1.19\,\text{MeV}$$

and the threshold is

$$E_{\text{th}} = 1.19\times\left(1 + \frac{4}{14}\right) \approx 1.53\,\text{MeV}$$

so the incident alpha particle needs at least $1.53\,\text{MeV}$ of kinetic energy—exactly why Rutherford could achieve the reaction with a natural alpha source of about $5\,\text{MeV}$.

**Example 2: the Coulomb barrier and Gamow peak of the D–T reaction.** With $R = 1.2(2^{1/3} + 3^{1/3})\,\text{fm} = 1.2(1.26 + 1.44) \approx 3.24\,\text{fm}$,

$$E_C = \frac{1.44\,\text{MeV}\cdot\text{fm}}{3.24\,\text{fm}} \approx 0.44\,\text{MeV}$$

The reduced mass is $m_r c^2 \approx 1125\,\text{MeV}$, so $E_G = (2\pi/137)^2 \times 1125/2 \approx 1.18\,\text{MeV}$. At $kT = 10\,\text{keV}$,

$$E_0 = \left(\frac{1.18\times 10^2}{4}\right)^{1/3} \approx 3.1\,\text{keV}$$

so the most effective reaction energy is only about $3\,\text{keV}$, far below the barrier height—fusion depends entirely on tunnelling.

**Example 3: the energy and power of $^{235}\text{U}$ fission.** One fission releases about $200\,\text{MeV} = 3.2\times 10^{-11}\,\text{J}$. One gram of $^{235}\text{U}$ contains

$$N = \frac{1}{235}\times 6.022\times 10^{23} \approx 2.56\times 10^{21}$$

nuclei, whose complete fission releases

$$E = 2.56\times 10^{21}\times 3.2\times 10^{-11} \approx 8.2\times 10^{10}\,\text{J}$$

equivalent to about $2.8$ tonnes of standard coal, or about $1\,\text{MW}$ sustained for a day.

**Example 4: the reaction rate in a reactor.** With a thermal neutron flux $\Phi = 10^{14}\,\text{cm}^{-2}\text{s}^{-1}$ and a $^{235}\text{U}$ fission cross-section $\sigma_f = 585\,\text{b} = 5.85\times 10^{-22}\,\text{cm}^2$, each nucleus fissions

$$r = \Phi\sigma_f = 10^{14}\times 5.85\times 10^{-22} \approx 5.9\times 10^{-8}\,\text{s}^{-1}$$

so one gram of fuel fissions at $2.56\times 10^{21}\times 5.9\times 10^{-8} \approx 1.5\times 10^{14}\,\text{s}^{-1}$, corresponding to a power of about $1.5\times 10^{14}\times 3.2\times 10^{-11} \approx 4.8\,\text{kW}$.

**Example 5: comparing the energy density of fusion and fission.** Per unit mass, D–T fusion releases

$$\frac{17.6\,\text{MeV}}{5\,\text{u}} \approx 3.4\times 10^{14}\,\text{J/kg}$$

whereas $^{235}\text{U}$ fission gives about $8.2\times 10^{13}\,\text{J/kg}$, so the former is about four times the latter; both exceed chemical fuels (about $3\times 10^{7}\,\text{J/kg}$) by more than six orders of magnitude. The numbers tell us that the superiority of nuclear energy lies not in the "total amount of energy" but in the energy density: the same mass of fuel can release a million times more energy.

## 5. Common Misconceptions

**Misconception 1: a reaction with $Q<0$ can occur at any incident energy.** It must exceed the threshold. For reactions induced by heavy ions the threshold is often tens of percent above $|Q|$, and ignoring this can ruin an experiment design.

**Misconception 2: a larger cross-section means a "thicker" target.** The cross-section is a dynamical quantity, not a geometric size. The same target can have cross-sections differing by tens of orders of magnitude for different projectiles and energies; the huge thermal fission cross-section of $^{235}\text{U}$ compared with its geometric cross-section is the classic example.

**Misconception 3: nuclear fission means "chain reaction".** Spontaneous and induced fission are behaviours of a single nucleus; a chain reaction requires that each fission on average produces at least one neutron that triggers the next, which depends on the multiplication factor and the geometry, moderation, and absorption of the system.

**Misconception 4: a nuclear power plant can explode like a bomb.** A weapon requires highly enriched uranium or plutonium reaching deep supercriticality within microseconds; reactor fuel is lightly enriched and relies on delayed neutrons to stay controlled, and any rise in power is suppressed by negative feedback such as Doppler broadening and the moderator temperature coefficient, so the physics does not permit a nuclear explosion.

**Misconception 5: fusion power is already available on a large scale.** Tokamaks and inertial confinement devices are still struggling with ignition and long steady-state operation, and materials, tritium self-sufficiency, and energy conversion efficiency remain unsolved. The main difficulty of fusion is not "whether the reaction can occur" but "whether it can give a net output economically".

## 6. Summary and Outlook

This chapter has compressed nuclear reactions into three computable quantities: the $Q$ value says whether the reaction is energetically possible, the threshold gives the minimum incident energy, and the cross-section gives the probability and rate. Fission and fusion are the grandest applications of these concepts: fission achieves control through neutron multiplication and delayed neutrons, fusion breaks through the Coulomb barrier through tunnelling and a hot plasma.

From a broader viewpoint, nuclear reactions are also the engine of nucleosynthesis in the universe. The pp chain and CNO cycle in stellar interiors, together with the rapid neutron capture process (r-process) in supernova explosions, have jointly produced the abundance pattern of today's periodic table. The next chapter leaves the nuclear scale for a deeper layer: the elementary particles that make up the nucleons themselves, and the four interactions that govern them.
`,
  },
  'particle-intro': {
    chapter: 'Chapter 5 Introduction to Particle Physics',
    title: 'Fundamental Particles and the Four Interactions',
    summary:
      'This topic organizes the family tree of fundamental particles into leptons and hadrons, compares the strength and range of the four interactions, and establishes Feynman diagrams and conservation laws as the basic language of particle physics.',
    keyPoints: [
      'Matter particles comprise three generations of leptons and six flavours of quarks; hadrons are made of quarks and split into mesons $q\\bar{q}$ and baryons $qqq$',
      'The relative strengths of the four interactions are about $1 : 10^{-2} : 10^{-6} : 10^{-39}$, and the range is set by the mass of the mediating particle',
      'Massive mediators give short-range forces with range about $\\hbar/(M c)$, which explains the extremely short range of the weak interaction',
      'Feynman diagrams are the graphical language of perturbation theory: external lines, internal propagators, and vertex couplings determine the amplitude',
      'Charge $Q$, baryon number $B$, and lepton number $L$ are strictly conserved; strangeness $S$ is conserved only in strong and electromagnetic processes',
      'Antiparticles and annihilation are inevitable in relativistic quantum theory, and the threshold for electron–positron pair production is $2m_e c^2$',
    ],
    content: String.raw`

The previous four chapters treated the nucleus as a collection of nucleons, but do nucleons themselves have structure? From the 1930s experiments began to answer: first the positron was discovered, then the muon, the pion, and strange particles appeared in cosmic rays, followed by the antiproton and the neutrino, until by the 1960s the "elementary particles" numbered several hundred and physicists faced a situation like Mendeleev's—a classification table was needed.

Today we know that the boundary of the "elementary" has been greatly compressed: the basic bricks of matter are only six flavours of quarks and six flavours of leptons, linked by four interactions. The proton, neutron, and pion, once regarded as elementary, are in fact composites of quarks. This shift of understanding is one of the greatest achievements of twentieth-century physics.

Particle physics also differs fundamentally from nuclear physics in how it is done: nuclear physics can "put a nucleus on the table", whereas most fundamental particles live for extremely short times and can only be produced by accelerators and recorded through their "remains" in detectors. Particle physics is therefore inherently a science interleaving prediction and inference: create particles with an accelerator, reconstruct them with detectors, and finally weave them into a story with conservation laws and the theory of interactions.

## 2. Rigorous Definitions and Formulas

**Leptons**: spin-$1/2$ fermions that do not feel the strong interaction, in three generations

$$\begin{pmatrix} \nu_e \\ e^- \end{pmatrix},\quad \begin{pmatrix} \nu_\mu \\ \mu^- \end{pmatrix},\quad \begin{pmatrix} \nu_\tau \\ \tau^- \end{pmatrix}$$

The masses of the charged leptons are $m_e = 0.511\,\text{MeV}$, $m_\mu = 105.66\,\text{MeV}$, and $m_\tau = 1776.9\,\text{MeV}$; neutrinos are extremely light (below the electronvolt scale) and oscillate, which shows that they have nonzero mass. Each generation has its own lepton number $L_e$, $L_\mu$, $L_\tau$, conserved separately in the great majority of processes.

**Hadrons**: composite particles that feel the strong interaction, divided into mesons ($q\bar{q}$, integer spin) and baryons ($qqq$, half-integer spin). Common examples are the nucleons $p, n$, the pions $\pi^+, \pi^0, \pi^-$ (masses $139.57$ and $134.98\,\text{MeV}$), the kaons ($493.7$ and $497.6\,\text{MeV}$), and the hyperons $\Lambda, \Sigma, \Xi, \Omega$. All hadrons carry a baryon number $B$: $B = 1$ for baryons, $B = -1$ for antibaryons, and $B = 0$ for mesons.

**The four interactions** (relative strengths and characteristics at the $1\,\text{GeV}$ scale):

| Interaction | Relative strength | Range | Mediator | Charge |
| --- | --- | --- | --- | --- |
| Strong | $1$ | $\sim 1\,\text{fm}$ | gluon $g$ (massless, coloured) | colour |
| Electromagnetic | $\sim 10^{-2}$ | long range | photon $\gamma$ | electric charge |
| Weak | $\sim 10^{-6}$ | $\sim 10^{-18}\,\text{m}$ | $W^\pm, Z^0$ | weak isospin |
| Gravity | $\sim 10^{-39}$ | long range | graviton (unobserved) | mass/energy |

A massive mediator produces a short-range force, with range estimated from the uncertainty relation

$$R \approx \frac{\hbar}{M c}$$

Taking $M_W c^2 = 80.4\,\text{GeV}$ and $\hbar c = 197.3\,\text{MeV}\cdot\text{fm}$ gives

$$R \approx \frac{197.3\,\text{MeV}\cdot\text{fm}}{8.04\times 10^{4}\,\text{MeV}} \approx 2.5\times 10^{-3}\,\text{fm} = 2.5\times 10^{-18}\,\text{m}$$

**Relativistic kinematics** (in natural units $\hbar = c = 1$):

$$E^2 = p^2 + m^2,\qquad \beta = \frac{p}{E},\qquad \gamma = \frac{E}{m}$$

For a two-body reaction the Lorentz invariant is

$$s = (p_1 + p_2)^2$$

In the centre-of-mass frame $s = E_{\text{cm}}^2$. For a fixed-target experiment $s = 2m_A E_a + m_a^2 + m_A^2$, and at high energy $E_{\text{cm}} \approx \sqrt{2m_A E_a}$, an extremely poor use of energy; for a collider $E_{\text{cm}} = 2E$.

**Feynman rules** (at the conceptual level): each external line corresponds to a real incoming or outgoing particle, each internal line to a virtual particle contributing a propagator $1/(q^2 - m^2)$; each vertex contributes a coupling constant ($e$ for the electromagnetic, $g_s$ for the strong, $g$ for the weak interaction). The amplitude is the product of vertices and propagators, and one sums over all possible intermediate states before taking the modulus squared to obtain a probability

$$\mathcal{M} = \sum_{\text{all diagrams}} \mathcal{M}_i,\qquad \text{probability} \propto |\mathcal{M}|^2$$

The more complicated the diagram and the more vertices, the smaller the contribution (proportional to a power of the coupling), which is why perturbation theory works.

**Particle lifetimes and decay widths**: the lifetime $\tau$ of an unstable particle and the uncertainty in its mass (the decay width $\Gamma$) satisfy

$$\Gamma\,\tau \approx \hbar$$

The $Z$ boson has mass $91.2\,\text{GeV}$ and width $2.5\,\text{GeV}$, corresponding to a lifetime of only about $3\times 10^{-25}\,\text{s}$; the muon has a lifetime of $2.2\,\mu\text{s}$, a width far too small to measure directly. The width is the shape of the resonance peak: collider experiments measure a Breit–Wigner resonance curve whose width directly gives the lifetime.

**Conservation laws**: energy–momentum, angular momentum, and charge $Q$ are strictly conserved in every process; baryon number $B$ and lepton number $L$ are conserved in the perturbative processes allowed by the Standard Model; strangeness $S$, charm $C$, and bottomness $B'$ are conserved only in strong and electromagnetic interactions, while the weak interaction can change them—which is exactly why some particles are "long-lived" before decaying.

**Antiparticles**: every particle has an antiparticle of the same mass and opposite additive quantum numbers such as charge. Electron–positron annihilation

$$e^+ + e^- \to 2\gamma \ (\text{or}\ 3\gamma)$$

requires at least $2mc^2$ of energy in the reverse process; near a nuclear field the threshold for producing an $e^+e^-$ pair is

$$E_{\text{th}} \approx 2m_e c^2\left(1 + \frac{m_e}{M}\right)$$

## 3. Why It Works This Way

**Why was the discovery of the muon once puzzling?** It shares every property with the electron except being two hundred times heavier, and it does not feel the strong interaction. Rabi famously asked "who ordered that?". Today we know this is the structure of "generations": the repetition of three generations is an empirical fact the Standard Model does not yet explain, yet it is a necessary condition for neutrino oscillation and CP violation to exist.

**Why is the weak interaction both "weak" and "short-ranged"?** Its coupling constant is not much smaller than the electromagnetic one—its effective low-energy strength is small because the propagator $1/(q^2 - M_W^2)$ is suppressed by the denominator when $q^2 \ll M_W^2$. What really makes it feeble at low energy is the enormous mass of $W$ and $Z$. Once the energy reaches the $100\,\text{GeV}$ scale, the weak and electromagnetic strengths become comparable—the experimental basis of electroweak unification.

**Why is the strong interaction stronger at low energy?** Quantum chromodynamics has asymptotic freedom: the coupling decreases as the energy scale rises and grows as it falls. At low energy $\alpha_s$ becomes large, leading to quark confinement and hadronization, so what we see in the laboratory is always hadrons and never free quarks.

**Why are Feynman diagrams so effective?** They turn extremely complicated field-theory calculations into countable graphical rules, and the physical meaning of each diagram is clear: particle propagation and vertex interaction. More importantly they reveal the notion of a virtual particle—an intermediate state need not satisfy the on-shell energy–momentum condition as long as it returns to on-shell initial and final states, a direct expression of quantum mechanics and the uncertainty relation.

**Why can conservation laws "veto" a reaction at a glance?** Conservation laws are the first gate screening the possibilities. To decide whether a reaction can occur, proceed in three steps: first check whether the additive quantum numbers such as charge, baryon number, and lepton number are conserved (if not, it is forbidden); then check whether energy and momentum allow it (the $Q$ value and the threshold); finally check whether it is dominated by an interaction that permits the process (strong is fastest, electromagnetic next, weak slowest, and only the weak interaction can change flavour).

**Why distinguish "stable" from "long-lived"?** The strictly stable particles are only the photon, the electron, the lightest neutrino, and the proton (whose stability is still under test, with a lifetime lower bound above $10^{34}\,\text{a}$). A neutron can be stable inside a nucleus, yet a free neutron survives only $880\,\text{s}$; muons, pions, and kaons decay through the weak or electromagnetic interaction. Whether a particle is stable depends on whether a lighter final state exists that all conservation laws allow—the first criterion for a particle's fate.

**Why is there so little antimatter?** The Big Bang should have produced equal amounts of matter and antimatter, yet the observed universe is almost entirely matter. This requires CP violation and baryon-number-violating processes (the three Sakharov conditions). The Standard Model source of CP violation (the CKM phase) is too weak to explain the observed asymmetry, a major puzzle shared by particle physics and cosmology.

## 4. Typical Calculations

**Example 1: energy sharing in the two-body decay of a pion.** For $\pi^+ \to \mu^+ + \nu_\mu$ with $m_\pi = 139.57\,\text{MeV}$, $m_\mu = 105.66\,\text{MeV}$, $m_\nu \approx 0$, in the pion rest frame

$$E_\mu = \frac{m_\pi^2 + m_\mu^2}{2m_\pi} = \frac{139.57^2 + 105.66^2}{2\times 139.57} \approx 109.8\,\text{MeV}$$

so the muon kinetic energy is $T_\mu = 109.8 - 105.66 = 4.14\,\text{MeV}$ and its momentum $p_\mu = \sqrt{E_\mu^2 - m_\mu^2} \approx 29.8\,\text{MeV}$. The monoenergetic muon is the signature of a two-body decay and the basis of monoenergetic muon beams from pion decay.

**Example 2: the threshold for antiproton production.** For $p + p \to p + p + p + \bar{p}$ with the target proton at rest, the minimum invariant mass of the final state is $4m_p$, so

$$s = 2m_p^2 + 2m_p E_{\text{tot}} = (4m_p)^2 \ \Rightarrow\ E_{\text{tot}} = 7m_p$$

that is, the incident proton kinetic energy is

$$T_{\text{th}} = 6m_p c^2 = 6\times 938\,\text{MeV} \approx 5.6\,\text{GeV}$$

This is exactly how the $6.2\,\text{GeV}$ Bevatron was designed, and how the antiproton was discovered in 1955. With proton–proton collisions, two beams of $0.94\,\text{GeV}$ each would reach the same centre-of-mass energy.

**Example 3: the range of the weak interaction.** From $R \approx \hbar c/(M_W c^2)$ we get $R \approx 2.5\times 10^{-18}\,\text{m}$, three orders of magnitude below the nuclear radius, so the weak interaction occurs almost "pointlike" on nuclear scales—which also explains why weak cross-sections are tiny and beta half-lives long.

**Example 4: comparing gravity with the electromagnetic force.** Two protons separated by $1\,\text{fm}$ have a gravitational potential energy

$$V_G = \frac{G m_p^2}{r} \approx 1.17\times 10^{-36}\,\text{MeV}$$

against a Coulomb potential energy of about $1.44\,\text{MeV}$, a ratio of about $10^{-36}$. This is why gravity can be ignored entirely in particle physics—except near the Planck scale of $10^{19}\,\text{GeV}$.

**Example 5: the threshold for neutrino detection.** Inverse beta decay $\bar{\nu}_e + p \to n + e^+$ is the central reaction of reactor neutrino experiments, with threshold

$$E_{\text{th}} = \frac{(m_n + m_e)^2 - m_p^2}{2m_p}c^2 \approx 1.806\,\text{MeV}$$

Together with the $2.2\,\text{MeV}$ gamma from neutron capture and the two $0.511\,\text{MeV}$ photons from positron annihilation, this forms the "delayed coincidence" signal, the common principle of the 1956 Reines–Cowan experiment and of all reactor neutrino experiments today.

## 5. Common Misconceptions

**Misconception 1: a particle decays however it likes.** Conservation laws and energy conditions must both be satisfied. A free proton cannot decay into a neutron, a positron, and a neutrino because $m_p < m_n + m_e$; but a proton bound in a nucleus can, because the nuclear binding energy changes the energy balance.

**Misconception 2: a neutrino is just a "very small electron".** Neutrinos feel neither the strong nor the electromagnetic interaction, only the weak one, and they oscillate among three flavours; their mass may originate differently from other fermions (the seesaw mechanism, for instance), an important clue beyond the Standard Model.

**Misconception 3: virtual particles are "real particles that we cannot see".** A virtual particle is the graphical expression of an internal propagator in perturbation theory; it does not satisfy the on-shell relation $E^2 = p^2 + m^2$ and cannot be observed directly. Treating it as a real particle easily leads to misunderstanding of quantum field theory.

**Misconception 4: a short-lived particle must interact strongly.** The lifetime depends on the availability of decay channels and on coupling strengths, not on the particle itself. $\pi^0$ decays electromagnetically with a lifetime of $8.4\times 10^{-17}\,\text{s}$, while the neutron decays weakly with a lifetime as long as $880\,\text{s}$.

**Misconception 5: an antiparticle is a "negatively charged particle".** An antiparticle has the same mass, lifetime, and spin as the particle but opposite additive quantum numbers such as charge. The neutron is neutral, yet the antineutron has opposite baryon number ($-1$ against $+1$) and an opposite magnetic moment.

## 6. Summary and Outlook

This chapter has established the basic language of particle physics: the classification of leptons and hadrons, the comparison of the four interactions, the graphical rules of Feynman diagrams, and conservation laws as a powerful screening tool. It should also be remembered that the "relative strengths" given here are effective comparisons at low energy (about $1\,\text{GeV}$) and change with the energy scale: the strong coupling decreases with energy, the electromagnetic coupling increases slowly, and the three converge near $10^{15}$--$10^{16}\,\text{GeV}$. This trend of "coupling unification" is the intellectual starting point of grand unified theories and reminds us that "strong" and "weak" are not absolute.

With this language we can read any modern particle-physics reaction formula and judge whether it can occur, which interaction dominates it, and roughly how fast it is.

The next chapter descends to the quark level: why exactly three generations? Why must a baryon consist of three quarks? Why is a "colour" quantum number, invisible in everyday terms, needed? We shall also discuss symmetry, a theme running through modern physics—parity, charge conjugation, and time reversal, together with the famous parity violation and CP violation of the weak interaction.
`,
  },
  'quark-model': {
    chapter: 'Chapter 6 The Quark Model and Symmetry',
    title: 'Hadron Structure and Conservation Laws',
    summary:
      'From the octet classification to the quark model and colour charge, this topic reveals the internal structure of hadrons and discusses symmetries such as parity, charge conjugation, and CP, together with their violation.',
    keyPoints: [
      'The octet classification arranges hadrons by isospin $I_3$ and hypercharge $Y$, and the Gell-Mann–Nishijima relation $Q = I_3 + Y/2$ gives the charge in one formula',
      'Mesons are $q\\bar{q}$ and baryons $qqq$; the six quark flavours $u,d,s,c,b,t$ carry charges of $\\pm 2/3$ or $\\mp 1/3$',
      'Colour $SU(3)_c$ resolves the spin–statistics problem of $\\Omega^-$ and is confirmed experimentally by the $R$ ratio and three-jet events',
      'Quantum chromodynamics has asymptotic freedom and quark confinement, with $\\Lambda_{\\text{QCD}} \\approx 200\\,\\text{MeV}$',
      'The quark model gives $\\mu_n/\\mu_p \\approx -2/3$, in close agreement with the measured $-0.685$',
      'The weak interaction violates parity and $CP$; the Wu experiment and the neutral kaon experiments established these two violations respectively',
    ],
    content: String.raw`

By the late 1950s more than a hundred new hadrons had been discovered, with chaotic names ($\Lambda$, $\Sigma$, $\Xi$, $K$, $\rho$, $\omega$ …), and physicists jokingly called it the "particle zoo". In 1961 Gell-Mann and Ne'eman independently proposed the "Eightfold Way", arranging hadrons of similar properties by the third component of isospin $I_3$ and the hypercharge $Y$ into beautiful symmetric patterns: the eight lightest baryons form an octet, the eight pseudoscalar mesons another octet, and the spin-$3/2$ baryons a decuplet. This immediately suggests Mendeleev's periodic table—the regularity of the patterns hints at a deeper structure.

Sure enough, in 1964 Gell-Mann and Zweig independently pointed out that these patterns are exactly the representation-theory result of quark combinations. Mesons are $q\bar{q}$ and baryons $qqq$, and just three quarks ($u, d, s$) suffice to build all the hadrons then known. Even more striking, the missing vertex on the decuplet diagram was predicted to be a particle with strangeness $-3$ and mass about $1680\,\text{MeV}$, namely $\Omega^-$; that same year it was found in the liquid hydrogen bubble chamber at Brookhaven with mass $1672\,\text{MeV}$. This is one of the finest pages in the history of theory–experiment interaction.

Yet the quark model faced a sharp difficulty from the start: $\Omega^-$ consists of three $s$ quarks with parallel spins and a symmetric spatial wave function, which seems to violate the Pauli exclusion principle. The resolution was to introduce a new degree of freedom—colour charge. Colour later became the cornerstone of quantum chromodynamics (QCD), and the puzzle "why is no free quark ever seen" led to the discovery of confinement and asymptotic freedom.

## 2. Rigorous Definitions and Formulas

**Hypercharge and the Gell-Mann–Nishijima relation**: define the hypercharge

$$Y = B + S$$

(more generally $Y = B + S + C + B' + T$, including charm, bottom, and top), then the hadron charge satisfies

$$Q = I_3 + \frac{Y}{2}$$

where $I_3$ is the third component of isospin. This relation unifies the seemingly messy charge values into a single compact formula.

**Quark quantum numbers** (six flavours):

| Quark | $Q$ | $B$ | $S$ | $C$ | Mass (current mass) |
| --- | --- | --- | --- | --- | --- |
| $u$ | $+2/3$ | $1/3$ | $0$ | $0$ | $\sim 2.2\,\text{MeV}$ |
| $d$ | $-1/3$ | $1/3$ | $0$ | $0$ | $\sim 4.7\,\text{MeV}$ |
| $s$ | $-1/3$ | $1/3$ | $-1$ | $0$ | $\sim 93\,\text{MeV}$ |
| $c$ | $+2/3$ | $1/3$ | $0$ | $+1$ | $\sim 1.27\,\text{GeV}$ |
| $b$ | $-1/3$ | $1/3$ | $0$ | $0$ | $\sim 4.18\,\text{GeV}$ |
| $t$ | $+2/3$ | $1/3$ | $0$ | $0$ | $\sim 173\,\text{GeV}$ |

**Hadron composition**: mesons are $q\bar{q}$, baryons $qqq$, and antibaryons $\bar{q}\bar{q}\bar{q}$. Typical examples:

$$p = uud,\quad n = udd,\quad \pi^+ = u\bar{d},\quad \pi^- = d\bar{u},\quad K^+ = u\bar{s},\quad \Lambda = uds,\quad \Omega^- = sss$$

**Deep inelastic scattering and the parton model**: in 1968 the electron–proton deep inelastic scattering experiment at SLAC showed that high-energy electrons were bounced back at large angles by pointlike hard scattering centres inside the proton. Introducing the Bjorken scaling variable $x = Q^2/(2M\nu)$, the structure function $F_2(x)$ was found to depend approximately only on $x$ and not on the momentum transfer $Q^2$ (scaling), indicating that the probe strikes nearly free pointlike constituents. These constituents were subsequently identified as quarks, and the high-precision "violation" of scaling became precisely the quantitative evidence for QCD and asymptotic freedom.

**Colour charge and QCD**: each quark carries one of three colours (red, green, blue); the strong interaction is described by the $SU(3)_c$ gauge theory, and the eight gluons carry colour–anticolour combinations, so gluons interact with one another as well. Physically observable hadrons must be colour singlets ("colourless"):

$$\text{baryon}:\ \frac{1}{\sqrt{6}}(RGB - RBG + GBR - GRB + BRG - BGR),\qquad \text{meson}:\ \frac{1}{\sqrt{3}}(R\bar{R} + G\bar{G} + B\bar{B})$$

The baryon colour wave function is completely antisymmetric, which exactly resolves the Pauli difficulty of $\Omega^-$. The running coupling satisfies

$$\alpha_s(Q^2) = \frac{4\pi}{\beta_0\ln(Q^2/\Lambda_{\text{QCD}}^2)},\qquad \beta_0 = 11 - \frac{2}{3}n_f,\qquad \Lambda_{\text{QCD}} \approx 200\,\text{MeV}$$

The $11$ in the denominator comes from gluon self-interaction, and it is this that makes $\alpha_s$ decrease as $Q^2$ grows—asymptotic freedom. At low energy $\alpha_s$ grows and causes confinement: pulling quarks apart would need infinite energy, so quark–antiquark pairs are created and hadronization (jets) occurs.

**The $R$ ratio**: the ratio of hadron production to muon-pair production in electron–positron collisions

$$R = \frac{\sigma(e^+e^- \to \text{hadrons})}{\sigma(e^+e^- \to \mu^+\mu^-)} = 3\sum_f Q_f^2$$

The factor $3$ is the number of colours. In the $u,d,s$ region $R = 3\left(\frac49 + \frac19 + \frac19\right) = 2$, against an experimental value of about $2$, consistent with three colours.

**Symmetry and its violation**: the three discrete transformations are parity $P$ (spatial inversion), charge conjugation $C$ (particle to antiparticle), and time reversal $T$. The electromagnetic and strong interactions conserve $P$, $C$, and $T$ separately; the weak interaction maximally violates $P$ (coupling only to left-handed fermions) and also violates $C$ and $CP$, while preserving $CPT$ overall (the CPT theorem is a necessary consequence of any local Lorentz-invariant quantum field theory). CP violation in the Standard Model comes from the complex phase of the CKM matrix

$$V_{\text{CKM}} = \begin{pmatrix} V_{ud} & V_{us} & V_{ub} \\ V_{cd} & V_{cs} & V_{cb} \\ V_{td} & V_{ts} & V_{tb} \end{pmatrix}$$

whose unitarity-triangle area $J \approx 3\times 10^{-5}$ quantifies the strength of CP violation.

## 3. Why It Works This Way

**Why is an invisible quantum number called "colour" needed?** There are three independent pieces of evidence: first, the Pauli difficulty of $\Omega^-$, which needs an extra antisymmetric index; second, the factor $3$ in the $R$ ratio; third, the decay rate of $\pi^0 \to \gamma\gamma$, whose theoretical value is proportional to the square of the number of colours and agrees with experiment only for $N_c = 3$. Colour charge has evolved from "assumed for consistency" into a physical reality measured independently by several experiments.

**Why is the discovery of $J/\psi$ called the "November Revolution"?** In November 1974 the groups of Ting and Richter almost simultaneously announced a new particle of mass about $3.1\,\text{GeV}$, $J/\psi$, a bound state of a charm quark and an anticharm quark ($c\bar{c}$). Unexpectedly its decay width is extremely narrow, its lifetime about two orders of magnitude longer than hadronic states of the same mass, because its strong decay channels are energetically closed and it can decay only in a "forbidden" way. The discovery confirmed the existence of the charm quark at a stroke, verified the quark model and asymptotic freedom, and won broad confidence for electroweak unification.

**Why is the proton mass far greater than the sum of the quark masses?** The current masses of the three valence quarks in a proton add up to only about $10\,\text{MeV}$, while the proton mass is $938\,\text{MeV}$. The difference comes from the energy of the gluon field in the QCD vacuum, the quark–antiquark sea, and the relativistic kinetic energy of the quarks. In other words, the mass of visible matter is mostly interaction energy, entirely in the spirit of $E = mc^2$.

**Why are confinement and asymptotic freedom not contradictory?** They are two ends of the same running coupling: at high energy (short distance) $\alpha_s$ is small and quarks behave almost freely, which is the scaling seen in deep inelastic scattering; at low energy (long distance) $\alpha_s$ is large, the colour field lines are squeezed into a "colour tube", and pulling them apart costs infinite energy, so new hadrons are produced instead. In 1973 Gross, Wilczek, and Politzer discovered asymptotic freedom, earning the 2004 Nobel Prize in Physics.

**Why is parity violated in the weak interaction?** The $V-A$ structure of the weak interaction couples only to left-handed fermions (and right-handed antifermions), which intrinsically distinguishes left from right. In 1956 Lee and Yang pointed out that all previous experiments had failed to test parity conservation in the weak interaction; in 1957 Wu used polarized $^{60}\text{Co}$ nuclei at extremely low temperature and found a pronounced forward–backward asymmetry of the emitted beta electrons relative to the nuclear spin, establishing parity violation.

**Why is CP violation so important?** Because it is one of the necessary conditions for explaining the matter–antimatter asymmetry of the universe (the Sakharov conditions). In 1964 Cronin and Fitch found that the long-lived neutral kaon decays into the $2\pi$ state of $CP$ parity $+1$ (with probability about $2\times 10^{-3}$), establishing CP violation for the first time; later the B factories (BaBar and Belle) measured the CKM unitarity triangle precisely, confirming that the Standard Model source of CP violation does exist, though its strength cannot explain the cosmological observations—so new sources of CP violation remain to be found.

**Why can the Eightfold Way predict particle masses?** Under exact $SU(3)$ flavour symmetry all members of a multiplet would have equal masses; in reality the $s$ quark is heavier, so the symmetry is broken. Expanding the breaking in $SU(3)$ representations yields the famous Gell-Mann–Okubo mass formula

$$M = M_0 + M_1 Y + M_2\left[I(I+1) - \frac14 Y^2\right]$$

which successfully predicted the mass of $\Omega^-$ and is a classic example of the idea that symmetry breaking, too, can be treated quantitatively.

## 4. Typical Calculations

**Example 1: checking charges with the Gell-Mann–Nishijima relation.** For the proton $p$: $B = 1, S = 0$, so $Y = 1$, with isospin $I = 1/2$ and $I_3 = +1/2$, hence $Q = 1/2 + 1/2 = 1$ ✓. For $\Xi^-$: $S = -2$, $Y = -1$, $I_3 = -1/2$, hence $Q = -1/2 - 1/2 = -1$ ✓. For $\Omega^-$: $S = -3$, $Y = -2$, $I = 0$, hence $Q = 0 + (-1) = -1$ ✓.

**Example 2: equal spacing in the decuplet and the prediction of $\Omega^-$.** The decuplet members have $Y = 1$ ($\Delta$), $0$ ($\Sigma^*$), $-1$ ($\Xi^*$), and $-2$ ($\Omega^-$), and the $M_1 Y$ term of the mass formula gives equal spacing. From the mass spacings of $\Delta(1232)$, $\Sigma^*(1385)$, and $\Xi^*(1533)$, about $150\,\text{MeV}$, extrapolation gives

$$M_{\Omega^-} \approx 1533 + 145 \approx 1678\,\text{MeV}$$

against the experimental $1672\,\text{MeV}$, an error below one percent.

**Example 3: nucleon magnetic moments in the quark model.** Assuming equal constituent quark masses and magnetic moments proportional to charge, $\mu_u = -2\mu_d$. The spin wave functions give

$$\mu_p = \frac43\mu_u - \frac13\mu_d,\qquad \mu_n = \frac43\mu_d - \frac13\mu_u$$

Substituting $\mu_d = -\mu_u/2$,

$$\frac{\mu_n}{\mu_p} = \frac{-\frac23\mu_u - \frac13\mu_u}{\frac43\mu_u + \frac16\mu_u} = \frac{-1}{3/2} = -\frac23 \approx -0.667$$

The measured value is $\mu_n/\mu_p = -1.913/2.793 = -0.685$, a rather good agreement.

**Example 4: the $R$ ratio and the number of colours.** At $\sqrt{s} = 5\,\text{GeV}$ (with $u,d,s,c$ open),

$$R = 3\left(\frac49 + \frac19 + \frac19 + \frac49\right) = 3\times \frac{10}{9} = \frac{10}{3} \approx 3.33$$

The measured value is about $3.6$ (including QCD radiative corrections), whereas without colour it would be $10/9 \approx 1.1$, clearly inconsistent with experiment. This is one of the most direct quantitative tests of colour degrees of freedom.

**Example 5: the magnitude of CP violation.** In the neutral kaon system, the short-lived $K_S$ ($c\tau \approx 2.7\,\text{cm}$) decays mainly to $2\pi$ and the long-lived $K_L$ ($c\tau \approx 15\,\text{m}$) mainly to $3\pi$. Experimentally $K_L$ also decays to $2\pi$ with probability about $2\times 10^{-3}$, with amplitude ratio

$$\left|\frac{A(K_L \to \pi^+\pi^-)}{A(K_S \to \pi^+\pi^-)}\right| \approx 2.3\times 10^{-3}$$

This tiny number is nonetheless one of the keys to the existence of the universe.

**Example 6: the "proton spin crisis".** The naive quark model expects the proton spin $1/2$ to come from the sum of the three valence quark spins, but the polarized deep inelastic scattering of the EMC experiment in 1988 measured the quark spin contribution to be only about $30\%$. The rest comes from gluon spin and from the orbital angular momentum of quarks and gluons. This "proton spin crisis" still drives COMPASS, HERMES, the RHIC spin programme, and lattice QCD calculations.

## 5. Common Misconceptions

**Misconception 1: the proton is "three quarks".** More precisely, the valence quarks of the proton are $uud$, but to a low-energy probe it is a complex dynamical system of valence quarks, sea quarks, and gluons; lattice QCD calculations show that the gluon field supplies most of the mass and of the spin structure.

**Misconception 2: quarks have "colour" as a visual property.** "Colour" is only the name of a three-state quantum number, unrelated to everyday colour; the name was chosen because $SU(3)$ coincides with the "three" of the three primary colours and because a colour singlet corresponds to "white".

**Misconception 3: CPT violation has been observed.** Quite the opposite: CPT is so far strictly preserved in all experiments (for instance, particles and antiparticles have equal masses, lifetimes, and magnetic moments to extremely high precision). CP violation does not imply CPT violation.

**Misconception 4: parity violation means all physics is "left–right indifferent".** Only the weak interaction violates parity; the strong and electromagnetic interactions still conserve it strictly. To judge whether a process conserves parity, see which interaction dominates it.

**Misconception 5: symmetry breaking means "the theory is wrong".** Modern physics holds that symmetries and their breaking are equally important: exact symmetries give conservation laws and selection rules, while broken symmetries give the mass spectrum and a wealth of phenomena. The Higgs mechanism itself is an example of spontaneous symmetry breaking.

## 6. Summary and Outlook

Following the thread "classification—structure—symmetry", this chapter has organized the messy hadron world into a combinatorial game of quarks: the octet provides the classification framework, the quark model the internal structure, colour and QCD the dynamics, and the violation of $P$, $C$, and $CP$ reveals a deeper asymmetric beauty in the laws of nature.

Finally it should be said that the quark model, though extremely successful, is not a separate theory independent of QCD: it is the low-energy effective description of QCD, just as valence-bond theory is to quantum chemistry. Today lattice QCD computes hadron mass spectra, magnetic moments, and decay constants directly from the action, raising the earlier "taxonomy" to a genuine first-principles calculation, and the agreement with experiment has become an important test of the Standard Model.

Today's frontier advances along two lines: precision tests, such as the high-precision measurements of CP violation and rare decays by LHCb and Belle II and first-principles lattice QCD calculations of hadron masses and magnetic moments; and the search for new physics beyond the Standard Model, such as the origin of neutrino mass, particle candidates for dark matter, and the origin of the quark–lepton "generations". All these explorations depend on the experimental tools described in the next chapter—accelerators and detectors.
`,
  },
  'detectors-accelerators': {
    chapter: 'Chapter 7 Detectors and Accelerators',
    title: 'Experimental Methods',
    summary:
      'Starting from the principles of accelerators and a comparison of centre-of-mass energies, this topic introduces tracking, calorimetry, and particle identification, explains event reconstruction, and looks ahead to the Standard Model and the new physics beyond it.',
    keyPoints: [
      'A cyclotron has frequency $f = qB/(2\\pi m)$; a synchrotron adjusts the magnetic field and the radio-frequency phase in step, and colliders hold a decisive advantage in centre-of-mass energy',
      'A fixed target gives $\\sqrt{s} \\approx \\sqrt{2m_A E_a}$, while a collider of the same energy per beam reaches $2E$, several orders of magnitude higher',
      'Luminosity and cross-section fix the event rate $R = \\mathcal{L}\\sigma$, and the integrated luminosity is the basic measure of statistics',
      'Detector layers: the inner tracker measures momentum ($p_\\perp = 0.3BR$), the outer calorimeters measure energy, and the outermost layer is the muon spectrometer',
      'The energy loss of charged particles obeys the Bethe–Bloch formula $\\propto z^2/\\beta^2$, and Cherenkov radiation and time of flight serve for particle identification',
      'Event reconstruction includes track fitting, vertex finding, and missing transverse momentum, while the trigger compresses $40\\,\\text{MHz}$ down to the kilohertz level',
    ],
    content: String.raw`

The scale of fundamental particles is far below the resolution limit of any microscope, and their lifetimes are often only $10^{-10}\,\text{s}$ or shorter, so we can never "see" them directly. The whole art of a particle physics experiment is to let invisible particles leave recordable traces in a detector, and then to reconstruct those traces into one complete collision event using the laws of physics.

The work is shared by two enormous devices: the accelerator "creates" high-energy particles and the detector "records" their consequences. The history of accelerators is a history of ever higher centre-of-mass energy—from the few megavolts of a Van de Graaff generator to the tens of teraelectronvolts of the Large Hadron Collider. The history of detectors is a history of ever better spatial, energy, and time resolution and ever more simultaneously measured particles—from a few photographs in a cloud chamber to electronics processing hundreds of millions of channels per second.

To understand a modern high-energy experiment, three words matter most: energy (which decides what particles can be produced), luminosity (which decides how many), and detection (which decides what can be identified). This chapter is organized around these three words, and closes with a larger question: what is all this effort trying to answer?

## 2. Rigorous Definitions and Formulas

**Main types of accelerator**:

Electrostatic accelerators (Van de Graaff, tandem) accelerate directly with high voltage and are limited by insulation, generally to $10$--$25\,\text{MV}$. Linear accelerators accelerate stage by stage with a radio-frequency field, commonly with gradients of $20$--$30\,\text{MV/m}$, and serve well as injectors or electron colliders. In a cyclotron particles spiral in a constant magnetic field with cyclotron frequency

$$f = \frac{qB}{2\pi m}$$

which is non-relativistically independent of energy, so a fixed frequency can accelerate repeatedly; but as energy and hence mass grow, the frequency detunes, limiting proton cyclotrons to about $25\,\text{MeV}$. The solutions are frequency modulation (the synchrocyclotron) or letting the magnetic field grow with energy (the synchrotron). A synchrotron combined with strong focusing (alternating quadrupoles) confines the beam to a very small cross-section and is the mainstream of modern large accelerators. The relation between bending radius and momentum is

$$p\,[\text{GeV}/c] = 0.3\,B\,[\text{T}]\,R\,[\text{m}]$$

**Centre-of-mass energy**: for a particle of energy $E_a$ hitting a target nucleus $m_A$ at rest,

$$s = m_a^2 + m_A^2 + 2m_A E_a,\qquad \sqrt{s} \approx \sqrt{2m_A E_a}\quad(E_a \gg m)$$

while in a collider two beams of energy $E$ each meet head-on,

$$\sqrt{s} = 2E$$

The difference is decisive. Take the LHC's $7\,\text{TeV} + 7\,\text{TeV}$ proton collisions, with $\sqrt{s} = 14\,\text{TeV}$; to obtain the same centre-of-mass energy with a fixed target would require

$$E_a = \frac{s}{2m_p} \approx \frac{(1.4\times 10^4)^2}{2\times 0.938}\,\text{GeV} \approx 1.0\times 10^8\,\text{GeV} = 10^5\,\text{TeV}$$

which is entirely impractical.

**Luminosity and event rate**: the event rate is fixed by luminosity and cross-section,

$$R = \mathcal{L}\,\sigma$$

The luminosity is measured in $\text{cm}^{-2}\text{s}^{-1}$, and the LHC design luminosity is about $10^{34}\,\text{cm}^{-2}\text{s}^{-1}$. Integrating over time gives the integrated luminosity, commonly quoted in $\text{fb}^{-1}$ ($1\,\text{fb}^{-1} = 10^{39}\,\text{cm}^{-2}$); the expected number of events for a process is the product of $\sigma$ and the integrated luminosity.

**Energy loss of charged particles**: the Bethe–Bloch formula (approximate form)

$$-\left\langle\frac{dE}{dx}\right\rangle \approx K\,\frac{Z}{A}\,\frac{z^2}{\beta^2}\left[\ln\frac{2m_e c^2\beta^2\gamma^2}{I} - \beta^2\right]$$

where $z$ is the charge number of the incident particle and $Z, A, I$ are medium parameters. It has two important features: the loss rate is proportional to $z^2$, and it reaches a minimum near $\beta\gamma \approx 3$--$4$ (the minimum ionizing particle, about $2\,\text{MeV}/(\text{g}/\text{cm}^2)$), after which it rises slowly because of relativistic effects (the relativistic rise). Measuring $dE/dx$ together with momentum therefore identifies the particle type.

**Electromagnetic showers and radiation length**: high-energy electrons and photons multiply in a medium through bremsstrahlung and pair production, with a characteristic length called the radiation length $X_0$ (about $0.89\,\text{cm}$ for lead tungstate, $0.56\,\text{cm}$ for lead). Electromagnetic calorimeters are usually $20$--$30\,X_0$ thick, and the energy resolution is commonly parametrized as

$$\frac{\sigma_E}{E} = \frac{a}{\sqrt{E}} \oplus \frac{b}{E} \oplus c$$

The characteristic length of a hadronic shower is the nuclear interaction length $\lambda_I$ (about $17\,\text{cm}$ for iron), and hadronic calorimeters typically use $5$--$10\,\lambda_I$.

**Cherenkov radiation**: a charged particle moving faster than the phase velocity of light in a medium emits radiation at an angle satisfying

$$\cos\theta = \frac{1}{n\beta},\qquad \beta > \frac{1}{n}$$

Both the threshold condition and the radiation angle measure the velocity, so combined with a momentum measurement they fix the mass and identify the particle. A time-of-flight detector (TOF) measures $\beta$ directly, and a time resolution of order $100\,\text{ps}$ allows $\pi/K$ separation in the low-momentum region.

**Overall structure of the Standard Model**: the gauge group is

$$SU(3)_C \times SU(2)_L \times U(1)_Y$$

containing three generations of quarks and leptons, twelve gauge bosons (eight gluons, the photon, $W^\pm$, $Z$), and one scalar Higgs boson ($125\,\text{GeV}$, discovered in 2012). The vacuum expectation value of the Higgs field, $v \approx 246\,\text{GeV}$, gives fermion masses through Yukawa couplings and the $W$ and $Z$ masses through the gauge couplings.

## 3. Why It Works This Way

**Why do almost all modern high-energy experiments use colliders?** Because in a fixed-target experiment most of the energy goes into the overall centre-of-mass motion of the final state and cannot be used to create new particles. A collider lets the momenta of the two beams cancel, so all the energy can become the mass and internal motion of new particles. The price is a beam density far below that of a stationary target, which must be compensated by very high luminosity—exactly why "colliders are hard in luminosity".

**Why are multiple detector layers needed?** Because different particles leave different traces: charged particles leave tracks, electrons and photons deposit all their energy in the electromagnetic calorimeter, hadrons shower in the hadronic calorimeter, muons are so penetrating that they leave only tracks, and neutrinos escape entirely. Stacking these layers like an onion lets "which layer did it stop in" determine the particle's identity—the idea of layered detection.

**Why is the muon spectrometer placed outermost?** The muon is two hundred times heavier than the electron, and bremsstrahlung loss is inversely proportional to the mass squared, so it does not radiate as rapidly as an electron; and since it does not feel the strong interaction it is not absorbed by nuclei. The muon is therefore the only charged particle able to penetrate the whole calorimeter and reach the outermost layer (neutrinos excepted, but they leave no track), and identifying it there is cleanest. This is also why the $H \to ZZ^* \to 4\mu$ decay of the Higgs boson is called the "golden channel".

**Why can missing transverse momentum hint at neutrinos or dark matter?** The total transverse momentum in the centre-of-mass frame is zero before the collision, so the sum over all visible final-state particles should vanish. A measured nonzero value means some particle escaped undetected. The only known particle in the Standard Model that can escape is the neutrino, so missing transverse momentum is its fingerprint; missing transverse momentum beyond expectation may hint at dark matter or other new physics.

**Why is a trigger system indispensable?** The LHC proton beams collide every $25\,\text{ns}$, forty million times a second, each producing about a thousand particles. Recording everything would mean hundreds of terabytes per second, far beyond storage capacity. The trigger first performs a coarse hardware selection (Level-1) within microseconds, then a refined software selection (the HLT), keeping only about a kilohertz of events—a compression of forty thousand to one. Ensuring that "nothing important is thrown away" is a subtle discipline in itself.

**Why is the Higgs boson so hard to find?** Its production cross-section is tiny (about $20\,\text{pb}$ at the LHC, a billionth of the total), the backgrounds to its main decay channels are enormous, and the cleanest diphoton channel has a branching ratio of only about two per mille, requiring a small peak at $125\,\text{GeV}$ to be resolved against a huge continuum with excellent energy resolution and enormous statistics. The 2012 discovery was the product of forty years of collaboration among accelerators, detectors, computing, and theory.

## 4. Typical Calculations

**Example 1: collider versus fixed target in centre-of-mass energy.** Two $7\,\text{TeV}$ proton beams give $\sqrt{s} = 14\,\text{TeV}$; a $7\,\text{TeV}$ proton hitting a proton at rest gives

$$\sqrt{s} = \sqrt{2\times 0.938\times 7000}\,\text{GeV} \approx \sqrt{13132}\,\text{GeV} \approx 115\,\text{GeV}$$

two orders of magnitude lower than the collider of the same beam energy, showing the advantage decisively.

**Example 2: momentum and curvature in a magnetic spectrometer.** In a field $B = 4\,\text{T}$ a charged particle with $p_\perp = 100\,\text{GeV}/c$ has a track radius

$$R = \frac{p_\perp}{0.3B} = \frac{100}{0.3\times 4} \approx 83\,\text{m}$$

so large that what is actually measured is the sagitta of the track. For a lever arm $L = 1\,\text{m}$ the sagitta is

$$s = \frac{L^2}{8R} = \frac{1}{8\times 83} \approx 1.5\,\text{mm}$$

Distinguishing $100\,\text{GeV}$ from higher momenta therefore requires spatial resolution at the tens of micrometres—the reason silicon pixel detectors exist.

**Example 3: luminosity and the number of Higgs events.** With the LHC peak luminosity $\mathcal{L} = 10^{34}\,\text{cm}^{-2}\text{s}^{-1}$ and a Higgs production cross-section $\sigma \approx 20\,\text{pb} = 2\times 10^{-35}\,\text{cm}^2$,

$$R = 10^{34}\times 2\times 10^{-35} \approx 0.2\,\text{s}^{-1}$$

so about $0.2$ Higgs bosons are produced per second. An effective year of $10^7\,\text{s}$ yields about two million, but after branching ratios and detection efficiency only hundreds to a thousand events in the "golden channel" are usable for analysis—which is why a high-luminosity upgrade (HL-LHC) is needed.

**Example 4: separating pions from kaons with Cherenkov radiation.** With a radiator of $n = 1.0014$ and $p = 5\,\text{GeV}/c$, the pion has $\beta_\pi = p/\sqrt{p^2 + m_\pi^2} \approx 0.99961$ and the kaon $\beta_K \approx 0.99516$; the threshold is $\beta > 1/n = 0.99860$. Hence

$$\cos\theta_\pi = \frac{0.99860}{0.99961} \approx 0.99899 \ \Rightarrow\ \theta_\pi \approx 2.6^\circ$$

while the kaon is below threshold and does not radiate. From "whether it radiates" and "at what angle" one can separate pions from kaons cleanly in the few-GeV momentum range.

**Example 5: radiation length and calorimeter depth.** A lead tungstate crystal has $X_0 \approx 0.89\,\text{cm}$, so a depth of $25\,X_0$ is about $22\,\text{cm}$, enough to absorb the electromagnetic shower of a $100\,\text{GeV}$ electron completely; a hadronic calorimeter using iron ($\lambda_I \approx 17\,\text{cm}$) needs about $1.2\,\text{m}$ for $7\,\lambda_I$. This explains why hadronic calorimeters are always the thickest and heaviest part of a detector.

## 5. Common Misconceptions

**Misconception 1: the higher the accelerator energy, the better.** Energy is only one condition. With insufficient luminosity rare processes remain unobservable; with insufficient detector resolution the signal drowns in background. Energy, luminosity, and detection must advance together.

**Misconception 2: detectors directly "photograph" particle tracks.** Detectors record electrical signals from ionization or excitation, and the track is reconstructed from these discrete spatial points by fitting algorithms (commonly a Kalman filter); the same signals may yield different track hypotheses under different algorithms.

**Misconception 3: particle identification relies on a single method.** Modern experiments use combined identification: $dE/dx$ works at low momentum, TOF at low and medium momentum, Cherenkov radiation at medium and high momentum, while calorimeters and the muon spectrometer discriminate by "whether it penetrates". A single method usually works only in a particular momentum range.

**Misconception 4: high-energy experiments only look for "discoveries", not "exclusions".** In fact most analyses produce limits: a lower bound on the mass of some new particle, an upper bound on some coupling. Exclusion and discovery are equally important, and together they delineate the space of theories.

**Misconception 5: the Standard Model is "finished" and only needs patching.** Despite its enormous experimental success, the Standard Model has clear defects: it does not include gravity, does not explain neutrino masses, the origin of generations or the mass hierarchy, offers no dark matter candidate, and cannot explain the matter–antimatter asymmetry of the universe. These gaps are exactly where the next generation of experiments begins.

## 6. Summary and Outlook

This chapter has traced the complete chain of a modern particle physics experiment: accelerators supply energy and luminosity, detectors convert invisible particles into measurable signals, triggering and reconstruction reduce immense raw data to physical events, and statistics and theory finally turn them into knowledge. Only a few core formulas run through it all—$p = 0.3BR$, $R = \mathcal{L}\sigma$, the Bethe–Bloch energy loss, the Cherenkov angle—yet they support the whole of experimental analysis.

Looking ahead, the experimental frontier advances along several routes: the energy frontier (a high-luminosity LHC and future hundred-kilometre circular colliders, linear colliders, and muon colliders), the intensity frontier (long-baseline neutrino experiments, rare decays, and searches for neutrinoless double beta decay), and the cosmic frontier (direct dark matter detection, cosmic-ray and gamma-ray observations). China's Jiangmen Underground Neutrino Observatory, China Jinping Underground Laboratory, the High Altitude Cosmic Ray Observatory, the Beijing Electron–Positron Collider, and the proposed Circular Electron Positron Collider all occupy important places in this landscape.

Returning to the question with which the course began—"what is the world made of"—from Rutherford's alpha scattering to today's quarks, gluons, and Higgs boson, we have approached the deepest structure of matter step by step. But each approach raises new questions: why these particles, these constants, these symmetries? Perhaps the next answer is hidden in a collision not yet recorded.
`,
  },
};

export default map;
