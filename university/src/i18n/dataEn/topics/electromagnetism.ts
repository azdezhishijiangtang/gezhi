import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'electrostatics': {
    chapter: 'Chapter 1 Electrostatic Field',
    title: 'Coulomb\u2019s Law and Electric Field Intensity',
    summary:
      'The interaction between charges is described quantitatively by Coulomb\u2019s law, while the electric field intensity abstracts "the force at a point" into a vector field intrinsic to every point in space; the superposition principle lets the field of a complex charge distribution be summed point by point.',
    content: String.raw`

A rubbed balloon can lift scraps of paper, a comb can attract hair, and lightning can leap between a cloud and the ground—behind all these phenomena hides the same thing: electric charge and the interaction force between charges. As early as before the common era, people observed that amber, once rubbed, attracts light objects, but it took the ingenious torsion-balance experiments of Coulomb in the eighteenth century to really explain this force. We cannot see a "field" in daily life, yet we can see its effects: a needle deflecting, paper scraps dancing, hair standing on end. The task of physics is precisely to translate this invisible interaction into a language that can be computed exactly with mathematics.

Why introduce the concept of an "electric field" instead of simply talking about "the force of charge A on charge B"? Because talking about forces directly brings trouble: if charge B is moving, the force seems to be transmitted to B "instantaneously across space", which contradicts the relativistic principle that "interactions cannot propagate faster than light". Once the electric field is introduced, we instead say: charge A excites an electric field in the surrounding space, and this field is an objectively existing form of matter; when charge B enters that space, the field exerts a force on B. The interaction is thus split into two steps—"the source charge produces the field" and "the field exerts a force on the test charge"—and each step is local, in keeping with the modern view of space and time. Though formless, the electric field carries energy, momentum and momentum flux; it is a genuinely existing physical entity, not a fictitious bookkeeping device invented for convenience.

From this, the main line of electrostatic problems becomes clear: first find the field distribution $\vec E(\vec r)$ from the charge distribution, then let any charged body placed in it feel the force $\vec F = q\vec E$. Once $\vec E$ is known, every electrostatic force calculation follows. This chain of "charge → field → force" runs through the whole of electrostatics.

## 2. Rigorous Definitions: Coulomb's Law and Electric Field Intensity

**Charge and Coulomb's law**: The interaction force between two stationary point charges $q_1$, $q_2$ in vacuum acts along the line joining them, with magnitude proportional to the product of the charges and inversely proportional to the square of the distance:

$$\vec F_{12} = \frac{1}{4\pi\varepsilon_0}\frac{q_1 q_2}{r^2}\,\hat r_{12}$$

Here $\varepsilon_0 = 8.854\times10^{-12}\ \text{C}^2/(\text{N}\cdot\text{m}^2)$ is the vacuum permittivity, and the constant of proportionality is $k = 1/(4\pi\varepsilon_0) \approx 8.99\times10^9\ \text{N}\cdot\text{m}^2/\text{C}^2$. Like charges repel and opposite charges attract; the force obeys Newton's third law, $\vec F_{12}=-\vec F_{21}$.

**Electric field intensity**: Place a test charge $q_0$ in an electric field (small enough not to disturb the original field); the ratio of the force $\vec F$ on it to $q_0$ defines the electric field intensity at that point:

$$\vec E = \frac{\vec F}{q_0}$$

Its unit is $\text{N/C}$ (or equivalently $\text{V/m}$). $\vec E$ is independent of the test charge and depends only on the sources; it is a function of position, $\vec E(\vec r)$.

**Field of a point charge**: Directly from Coulomb's law,

$$\vec E = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}\,\hat r$$

The direction is radial: outward for positive charge, inward for negative charge. This is the most basic building block of every electrostatic field.

**Superposition principle**: The field excited jointly by several charges equals the vector sum of the fields each would excite alone:

$$\vec E = \sum_i \vec E_i,\qquad \vec E(\vec r) = \frac{1}{4\pi\varepsilon_0}\sum_i \frac{q_i}{|\vec r-\vec r_i|^3}(\vec r-\vec r_i)$$

For a continuous distribution, replace the sum by an integral $\vec E = \dfrac{1}{4\pi\varepsilon_0}\int \dfrac{dq}{R^2}\hat R$.

**Field lines**: To depict the field vividly we introduce field lines—at every point the tangent to a line agrees with $\vec E$ there, and the density of lines is proportional to the field strength. Field lines begin on positive charge and end on negative charge, and never intersect.

**Electric dipole**: A pair of equal and opposite charges separated by $l$ forms a dipole, with dipole moment $\vec p = q\vec l$ (pointing from negative to positive). At a distance $r\gg l$ from the centre of the dipole:

$$\vec E_{\text{axis}} = \frac{1}{4\pi\varepsilon_0}\frac{2\vec p}{r^3},\qquad \vec E_{\text{bisector}} = -\frac{1}{4\pi\varepsilon_0}\frac{\vec p}{r^3}$$

So the far field of a dipole falls off as $1/r^3$, faster than the $1/r^2$ of a single point charge, because far away the fields of the positive and negative charges largely cancel.

## 3. Why Understand It This Way

**Why divide the force by the test charge?** Because at a given point the force is proportional to the charge placed there; dividing by $q_0$ leaves "force per unit charge", determined only by the sources—an invariant describing the property of space rather than a quantity dependent on the body being measured.

**Why does superposition hold?** Experiment shows that when several charges coexist, the force on each equals the vector sum of the forces the others would exert alone, which means the electric field itself obeys linear superposition. Superposition is the precondition for reducing electrostatics to computable integrals.

**Why does the dipole field decay faster?** The field of a single charge comes from net charge of one sign; a dipole has equal positive and negative charges, so far away the "net charge is zero" and the leading term cancels, leaving only the dipole term caused by charge separation, hence the $1/r^3$ falloff. Mathematically this is the first non-vanishing term of the multipole expansion.

**Why does $\varepsilon_0$ appear in the denominator?** $\varepsilon_0$ measures how readily vacuum "permits" an electric field to exist (the vacuum permittivity). The larger $\varepsilon_0$ is, the weaker the field produced by the same charge, so it sits in the denominator of Coulomb's law.

**Why field lines rather than some other picture?** The electric field is a vector field and must show magnitude and direction at once; field lines show magnitude by density and direction by tangent, the most intuitive two-dimensional visualisation, and they naturally exhibit the topology of "starting on positive, ending on negative, never crossing".

## 4. Typical Calculations

**Example 1: Field on the line joining two charges.** Charges $+Q$ and $-Q$ are separated by $d$; find the field at distance $r$ from the centre on the perpendicular bisector. The two fields have equal magnitude $E_0 = \dfrac{1}{4\pi\varepsilon_0}\dfrac{Q}{r^2+(d/2)^2}$, directed away from $+Q$ and toward $-Q$; their horizontal components cancel while the vertical components add in the same direction, giving

$$E = 2E_0\cos\theta = \frac{1}{4\pi\varepsilon_0}\frac{Qd}{(r^2+d^2/4)^{3/2}}$$

For $r\gg d$ this reduces to the dipole bisector field $-\vec p/(4\pi\varepsilon_0 r^3)$.

**Example 2: Field on the axis of a uniformly charged ring.** For a ring of radius $R$ and total charge $Q$, at distance $x$ from the centre along the axis, the axial components of the element fields add while the radial components cancel, giving

$$E_x = \frac{1}{4\pi\varepsilon_0}\frac{Qx}{(R^2+x^2)^{3/2}}$$

It vanishes at $x=0$ and resembles a point-charge field far away, demonstrating the power of superposition and symmetry.

**Example 3: Field of an infinite uniformly charged plane.** By symmetry the field is perpendicular to the plane and uniform on both sides; integrating gives

$$E = \frac{\sigma}{2\varepsilon_0}$$

where $\sigma$ is the surface charge density. The result is independent of distance—a special property brought by the plane being "infinitely extended".

**Example 4: Torque on a dipole in a uniform field.** When $\vec p$ makes an angle $\theta$ with $\vec E$, the forces on the positive and negative charges form a couple, with torque

$$\vec\tau = \vec p\times\vec E,\qquad \tau = pE\sin\theta$$

This torque turns the dipole moment toward the external field, and is the physical basis of dielectric polarisation and molecular rotation.

## 5. Common Misconceptions

**Misconception 1: The field intensity is proportional to the test charge.** Wrong. $\vec E=\vec F/q_0$ is a definition; $\vec E$ is determined by the sources and is independent of whether a test charge is placed there or how large it is.

**Misconception 2: Coulomb's law applies to every situation.** It holds strictly only for stationary point charges; moving charges and non-point distributions require field superposition or corrections.

**Misconception 3: The field of a negative charge points outward.** Wrong. The field of a negative point charge points toward itself (inward), and field lines end on negative charge.

**Misconception 4: Adding field magnitudes directly when superposing.** Electric field intensity is a vector and must be added as vectors (or components), not as plain numbers.

**Misconception 5: The dipole field decays at the same order as a single charge.** The dipole field falls off as $1/r^3$ and a single charge as $1/r^2$; far away the difference is pronounced.

## 6. Extensions and Synthesis

Computing the field of a continuous charge distribution is essentially integrating the point-charge formula over charge elements $dq$. There are three common types: line charge (element $dq=\lambda dl$), surface charge ($dq=\sigma dS$) and volume charge ($dq=\rho dV$). Symmetry is often exploited in the integration: if a component cancels globally, only the surviving component need be computed, a great simplification. Spherically symmetric distributions, for instance, can be handled with Gauss's theorem (see the next chapter), whereas general distributions rely on superposition integrals.

The electric dipole is the central model for understanding the polarisation of matter. In an external field, a neutral molecule whose positive and negative charge centres do not coincide acquires an induced dipole moment $\vec p = \alpha\vec E$ ($\alpha$ being the polarisability); the aligned orientation of many dipoles produces a macroscopic polarisation $\vec P$, which is the starting point of dielectric theory. From atoms to antennas, the dipole concept is everywhere.

## 7. Worked Examples and Pitfalls

**Example 5: Field on the axis of a semicircular ring.** For a semicircular ring of radius $R$ and line charge density $\lambda$, find the field at the centre. Take a charge element $dq=\lambda R\,d\theta$, which produces at the centre $dE = \dfrac{1}{4\pi\varepsilon_0}\dfrac{dq}{R^2}$, directed radially. By symmetry the horizontal components cancel in pairs, and the vertical components integrate to

$$E_y = \int_0^\pi \frac{1}{4\pi\varepsilon_0}\frac{\lambda R\,d\theta}{R^2}\sin\theta = \frac{\lambda}{4\pi\varepsilon_0 R}\cdot 2 = \frac{\lambda}{2\pi\varepsilon_0 R}$$

directed along the axis of symmetry. The key here is "decompose first, then eliminate by symmetry", the standard routine of the superposition method.

**Example 6: Potential energy of a dipole.** A dipole in an external field has potential energy $U = -\vec p\cdot\vec E = -pE\cos\theta$. The system tends to $\theta=0$ (aligned with the field) to take the lowest energy, consistent with the torque $\tau=pE\sin\theta$ driving $\theta\to0$. Differentiating $U$ with respect to angle gives the torque, illustrating the general relation "force is the negative gradient of potential energy", and foreshadowing the deep link between potential and field.

**Example 7: Equilibrium of three point charges.** A charge $q$ is placed at the midpoint between $+Q$ and $+Q$; what value of $q$ makes all three charges in equilibrium? Let the separation be $a$. For the middle $q$, the force is $2\cdot\dfrac{kQq}{(a/2)^2}=0$, requiring $q=0$; but for the outer $+Q$, the repulsion from the other $+Q$ must be balanced by $q$, requiring $q$ to be negative. Combining gives $q=-Q/4$. The lesson: for equilibrium of a many-charge system, write the equilibrium equation for each charge separately, and stability must be judged separately.

**Example 8: Quantifying field-line density.** If $N$ field lines crossing unit area represent field strength $E$, then the field-line density is proportional to $E$. In a uniform field the lines are parallel and equally spaced; in the field of a point charge they radiate and thin out as $r^2$, visually matching $E\propto 1/r^2$. The field-line picture gives a quick judgement of relative field strength, but quantitative calculation still requires the formulas.

These examples show that the core techniques of electrostatic calculation are "resolve components, exploit symmetry, superpose vectors", while the dipole and potential energy connect the electrostatic field to the potential and polarisation that follow.

## 8. Concept Map and Typical Exam Questions

This chapter on the electrostatic field takes Coulomb's law, electric field intensity and the superposition principle as its trunk. Typical exam questions fall into five types. The first is direct application of Coulomb's law to find the force between two charges, paying attention to vector direction (along the joining line, repulsion for like and attraction for opposite charges). The second is finding the field at a point due to a system of point charges or a continuous distribution—always superpose vectors and use symmetry to cancel components. The third covers the dipole field, torque and potential energy: remember the far field $1/r^3$, $\vec\tau=\vec p\times\vec E$ and $U=-\vec p\cdot\vec E$. The fourth is the field integral for typical symmetric distributions (ring axis, infinite plane, semicircular ring). The fifth is understanding the field-line picture. Common lost marks: treating $\vec E$ as proportional to the test charge, forgetting that field intensity is a vector and adding magnitudes, getting the direction of a negative charge's field wrong, and confusing the falloff laws of a dipole with those of a single charge. When solving problems, first draw the force or field-direction diagram and mark the positive direction, then do strict vector algebra; keep the "charge → field → force" main line firmly in mind and electrostatics has a solid fulcrum.
`,
    keyPoints: [
      'Coulomb\u2019s law $F = k\\dfrac{q_1q_2}{r^2}$ is the foundation of electrostatic interaction',
      'Electric field intensity $\\vec E = \\vec F/q_0$ describes the force on unit positive charge',
      'Field of a point charge $\\vec E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r^2}\\hat r$',
      'The superposition principle lets the field of any charge distribution be decomposed into a vector sum of point-charge fields',
      'Field-line density indicates field strength; the tangent gives its direction',
      'The far field of an electric dipole falls off as $1/r^3$, unlike the $1/r^2$ of a single charge',
    ],
  },
  'gauss-law': {
    chapter: 'Chapter 2 Gauss\u2019s Theorem',
    title: 'Gauss\u2019s Theorem for the Electrostatic Field',
    summary:
      'Electric flux describes the "number of field lines" crossing a surface; Gauss\u2019s theorem links the total flux through any closed surface to the net charge inside, and is a powerful tool for finding the field of highly symmetric charge distributions.',
    content: String.raw`

In Chapter 1 we superposed point by point to find field strengths, but for highly symmetric distributions such as a uniformly charged spherical shell or an infinitely long cylinder, point-by-point integration is very cumbersome. Is there a cleverer way? Recall field lines: we prescribed that the number of field lines crossing unit area is proportional to the field strength. Then the "net number" of field lines crossing a whole closed surface should be related to the charge enclosed by that surface—because field lines start on positive charge and end on negative charge. Gauss's theorem is exactly this intuition written as an exact equation: the net electric flux out of a closed surface equals the net charge inside divided by $\varepsilon_0$.

This is like counting water in a pipe: the total flow "leaking out" of a closed net bag depends only on the net output of the sources inside the bag, and not at all on the water outside. The power of Gauss's theorem is that it does not require knowing $\vec E$ point by point: as long as the symmetry is high enough, the magnitude of $\vec E$ can be read directly from the total charge. It is one of the most important integral forms of electrostatics, and also one of the four equations of Maxwell's equations.

To use it, one must first learn to "count the loose ends"—that is, to compute the electric flux—and to choose the right closed surface (Gaussian surface) that makes the integral simple.

## 2. Rigorous Definitions: Flux and Gauss's Theorem

**Area element vector**: Take an area element $dS$; its unit normal $\hat n$ gives the oriented area element $d\vec S = \hat n\,dS$. For a closed surface the outward normal is usually taken as positive.

**Electric flux**: the net number of field lines crossing a surface $S$

$$\Phi_E = \iint_S \vec E\cdot d\vec S = \iint_S E\cos\theta\,dS$$

where $\theta$ is the angle between $\vec E$ and the normal of the area element. Inward crossing is negative, outward is positive.

**Gauss's theorem**: For any closed surface $S$,

$$\oiint_S \vec E\cdot d\vec S = \frac{Q_{\text{enc}}}{\varepsilon_0}$$

where $Q_{\text{enc}}$ is the net charge enclosed by the surface. It shows that the electrostatic field is a **source field**, with charge as the "source" of the field.

**Finding the field from Gauss's theorem (spherical symmetry)**: A uniformly charged spherical shell (total charge $Q$, radius $R$). Take a concentric spherical Gaussian surface:
- $r>R$: enclosed charge $Q$, $E\cdot 4\pi r^2 = Q/\varepsilon_0$, so $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{Q}{r^2}$, equivalent to a point charge.
- $r<R$ (inside the shell): enclosed charge zero, $E=0$. The field inside a spherical shell vanishes everywhere.

**Uniformly charged solid sphere** ($r<R$, volume charge density $\rho$): enclosed charge $Q(r)= \rho\cdot\frac43\pi r^3$, giving

$$E = \frac{\rho r}{3\varepsilon_0} = \frac{Q r}{4\pi\varepsilon_0 R^3}$$

so the field grows linearly with $r$ inside the sphere.

**Infinitely long uniformly charged cylinder** (line density $\lambda$, radius $R$): take a coaxial cylindrical Gaussian surface (height $L$, radius $r$); the flux through the side is $E\cdot 2\pi r L$ and the end caps contribute nothing:
- $r>R$: $E\cdot 2\pi r L = \lambda L/\varepsilon_0$, so $E = \dfrac{\lambda}{2\pi\varepsilon_0 r}$.
- $r<R$ (uniform volume charge): $E = \dfrac{\lambda r}{2\pi\varepsilon_0 R^2}$.

**Infinite uniformly charged plane** (surface density $\sigma$): take a "pillbox" Gaussian surface piercing the plane; each of the two caps contributes $EA$:

$$2EA = \frac{\sigma A}{\varepsilon_0}\quad\Rightarrow\quad E = \frac{\sigma}{2\varepsilon_0}$$

The direction is perpendicular to the plane, pointing away on both sides (positive charge).

## 3. Why Understand It This Way

**Why must the Gaussian surface be closed?** The left-hand side of Gauss's theorem is the net flux through a closed surface; only a closed surface can fully enclose the "internal sources", and hence be tied to the enclosed net charge.

**Why can $\vec E$ be found directly only with high symmetry?** The theorem gives just one scalar equation, $\oiint \vec E\cdot d\vec S$. If $\vec E$ is not uniform over the surface or its direction is not constant, it cannot be pulled out as $E\times(\text{area})$. Only when symmetry makes $\vec E$ constant in magnitude on the surface and everywhere perpendicular or parallel to the normal does the integral collapse into a simple product.

**Why is the field inside a spherical shell zero?** At any interior point, the field vectors from all parts of the shell cancel exactly; Gauss's theorem gives "total flux is zero", and with spherical symmetry this implies the field vanishes everywhere.

**Why is the field of an infinite plane independent of distance?** The plane extends infinitely, so its "angular size" as seen from afar does not change; geometrically this makes the field strength independent of distance, entirely unlike a charged plate of finite size.

**Why does Gauss's theorem say the electrostatic field is a "source" field?** Because the net flux is proportional to the enclosed net charge: where the charge is, there is the "source" or "sink" of the field. This contrasts fundamentally with source-free fields such as the magnetostatic field.

## 4. Typical Calculations

**Example 1: Field inside and outside a uniformly charged spherical shell.** As above: outside it is equivalent to a point charge, inside it is zero. If the total charge on the shell is $Q$ and the radius $R$, then

$$E(r)=\begin{cases}0,& r<R\\[4pt] \dfrac{1}{4\pi\varepsilon_0}\dfrac{Q}{r^2},& r\ge R\end{cases}$$

**Example 2: A charged conducting spherical shell.** The charge resides only on the outer surface of the conductor, and the field inside (within the metal) is zero; outside, the field equals that of a point charge. This reflects the absence of an electric field inside a conductor in electrostatic equilibrium.

**Example 3: A coaxial cable.** The inner conductor has line density $\lambda$ and the outer $-\lambda$; between the conductors ($a<r<b$) the inner conductor contributes $E=\lambda/(2\pi\varepsilon_0 r)$, and the field inside the outer conductor is zero. This field distribution is the theoretical basis of the cylindrical capacitor.

**Example 4: Two infinite parallel charged planes.** A single plane contributes $\sigma/(2\varepsilon_0)$. Two parallel planes of like sign have their fields cancel outside and add inside, so inside a parallel-plate capacitor $E=\sigma/\varepsilon_0$ and outside it is zero—the origin of the ideal parallel-plate capacitor model.

## 5. Common Misconceptions

**Misconception 1: If there is no charge inside the Gaussian surface, then $E=0$ on that surface.** Wrong. No charge only means the net flux is zero; $\vec E$ at points on the surface need not vanish (for a sphere enclosing no charge outside a point charge, the flux is zero but $E\neq0$ on the surface).

**Misconception 2: Gauss's theorem applies only to symmetric distributions.** Wrong. The theorem holds universally; it is merely difficult to solve for $\vec E$ directly when symmetry is absent, but the equation itself is always valid.

**Misconception 3: Zero flux means no field crosses the surface.** When the inward and outward crossings are equal the net flux is also zero, yet the field may be very strong.

**Misconception 4: Putting $\varepsilon_0$ on the wrong side.** In vacuum the right-hand side is $Q_{\text{enc}}/\varepsilon_0$; it is in the denominator, not the numerator.

**Misconception 5: Counting only one cap of the pillbox.** The pillbox Gaussian surface has two caps; with symmetry each contributes $EA$, so do not omit one.

## 6. Extensions and Synthesis

Gauss's theorem and Coulomb's law are not independent: within electrostatics they are equivalent—Gauss's theorem follows from the inverse-square law, and conversely Coulomb's law can be recovered from Gauss's theorem (plus spatial isotropy). The advantage of Gauss's theorem is its integral form, especially suited to symmetric problems and the concept of flux; Coulomb's law suits point-by-point superposition.

In a dielectric, Gauss's theorem is rewritten as $\oiint \vec D\cdot d\vec S = Q_{\text{free}}$, where $\vec D=\varepsilon_0\vec E+\vec P$ is the electric displacement, which bypasses the complicated polarisation charge. This is extended in Chapter 4. Moreover, combining Gauss's theorem with the divergence theorem yields the differential form $\nabla\cdot\vec E = \rho/\varepsilon_0$, writing the "source" property into the neighbourhood of every point.

## 7. Worked Examples and Pitfalls

**Example 5: A non-uniform spherically symmetric charge distribution.** For a sphere with charge density $\rho(r)=\rho_0(1-r/R)$, find the field inside. Take a Gaussian sphere of radius $r$; the enclosed charge is

$$Q(r)=4\pi\int_0^r \rho_0\left(1-\frac{r'}{R}\right) r'^2 dr' = 4\pi\rho_0\left(\frac{r^3}{3}-\frac{r^4}{4R}\right)$$

From $E\cdot 4\pi r^2 = Q(r)/\varepsilon_0$ we get $E(r)=\dfrac{\rho_0}{\varepsilon_0}\left(\dfrac{r}{3}-\dfrac{r^2}{4R}\right)$. The key: the charge inside the Gaussian surface must be integrated over the actual distribution, not simply replaced by the total charge.

**Example 6: Estimating the self-energy of a uniformly charged sphere.** Using the field energy density $u=\frac12\varepsilon_0 E^2$ and integrating the fields inside and outside the sphere separately gives the electrostatic energy $U=\dfrac{3Q^2}{20\pi\varepsilon_0 R}$. Such problems first find $E(r)$ by Gauss's theorem and then integrate the energy, showing the coherent chain "Gauss's theorem → field → energy".

**Example 7: An infinitely long cylindrical shell.** For a cylindrical shell of radius $R$ and surface charge density $\sigma$, inside ($r<R$) symmetry gives no enclosed charge and $E=0$; outside $E=\sigma R/(\varepsilon_0 r)$. As with the spherical shell, "no field inside the shell" is a general conclusion for symmetric shell distributions.

**Example 8: Testing the inverse-square law with Gauss's theorem.** If the Coulomb force were not exactly $1/r^2$ but $1/r^{2+\delta}$, the field inside a spherical shell would not vanish (a tiny residue); measuring the field inside a conducting shell experimentally yields the extremely tight bound $\delta<10^{-16}$. This shows how Gauss's theorem becomes a powerful tool for testing the fundamental symmetries of natural laws.

What is genuinely hard about Gauss's theorem is not the formula, but "choosing the surface" and "judging whether it can be used". With a good symmetry analysis it is a mighty axe; without enough symmetry, fall back on superposition integrals.

## 8. Concept Map and Typical Exam Questions

This chapter rests on three pillars: electric flux, Gauss's theorem, and finding fields by symmetry. Typical exam questions fall into four types. The first is computing the electric flux through a given surface, paying attention to the angle between the area normal and $\vec E$ and the signs of entry and exit. The second is finding the field of a spherically symmetric distribution (shell, solid sphere, non-uniform sphere) from Gauss's theorem, where the key is correctly computing the enclosed charge. The third is the field of axially symmetric systems (infinite cylinder, cylindrical shell, coaxial cable). The fourth is the field of plane-symmetric systems (infinite plane, parallel plates) and the pillbox Gaussian surface. Common lost marks: assuming zero field on a surface merely because no charge is enclosed, ignoring the distinction between the universality of Gauss's theorem and its direct solvability only under symmetry, omitting one cap of the pillbox, and misplacing $\varepsilon_0$. The iron rule for exams: determine the symmetry → choose the corresponding Gaussian surface → write the enclosed charge → set up $\oiint\vec E\cdot d\vec S=Q_{\text{enc}}/\varepsilon_0$ → solve for $E$. Memorise the correspondence "sphere with sphere, cylinder with cylinder, plane with pillbox" and this chapter is secure.

## 9. Deepening the Physical Intuition: What Gauss's Theorem Really Says

Many students remember Gauss's theorem only as "a tool for finding symmetric fields", which underestimates its significance. What Gauss's theorem really states is something utterly plain: **the total number of field lines leaving a closed surface depends only on the net charge enclosed by that surface, and has nothing to do with the shape or size of the surface, nor with any charge outside it**.

Water flow provides an analogy: imagine space as a region full of flowing water, with positive charges as "springs" that keep emitting water and negative charges as "drains" that absorb it. Whatever shape of closed net bag you stretch out, the net water leaking out per unit time must equal the sum of the outputs of all springs inside minus the sum of the intakes of all drains inside. If a spring lies outside the bag, the water enters through one side and leaves through the other; in and out cancel exactly and it contributes nothing to the net outflow. Here $\varepsilon_0$ serves only as a unit conversion, translating "coulombs" into "number of field lines".

Push one level deeper: why does the inverse-square law in particular make this work? Because the area of a sphere of radius $r$ grows as $r^2$, while the field of a point charge decays as $1/r^2$; the product cancels exactly, so the flux of a point charge through any concentric sphere is the same constant $q/\varepsilon_0$, independent of $r$. If the force law were changed to $1/r^{2+\delta}$, the flux would drift with radius and Gauss's theorem would fail. So Gauss's theorem is essentially **the integral form of Coulomb's inverse-square law**; within electrostatics the two are fully equivalent, not a new law unrelated to Coulomb's law.

This yields a practical criterion: whenever the charge arrangement lets you write the flux as "a constant scalar times an effective area"—spherical symmetry with a concentric sphere, axial symmetry with a coaxial cylinder, plane symmetry with a through-going pillbox—Gauss's theorem solves for $\vec E$ in one step; whenever that fails, the theorem remains correct and can be used to check results, but not to solve, and one should return to superposition integrals or switch to "find the potential first, then take its gradient".

## 10. Complete Derivations and Numerical Worked Examples

### Derivation 1: Gauss's theorem from Coulomb's law (solid-angle argument)

Let a point charge $q$ lie anywhere inside a closed surface $S$. For any area element $d\vec S$ on the surface, let the solid angle it subtends at $q$ be $d\Omega = \dfrac{\hat r\cdot d\vec S}{r^2}$, where $r$ is the distance from $q$ to that element. The elementary flux through the element is

$$d\Phi = \vec E\cdot d\vec S = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}\,\hat r\cdot d\vec S = \frac{q}{4\pi\varepsilon_0}\,d\Omega$$

Integrating over the whole closed surface: since $q$ is inside, all the elements together cover a solid angle of exactly $4\pi$, so

$$\Phi = \frac{q}{4\pi\varepsilon_0}\oiint d\Omega = \frac{q}{4\pi\varepsilon_0}\cdot 4\pi = \frac{q}{\varepsilon_0}$$

If $q$ is outside the surface, the near elements contribute positive solid angle and the far ones negative, and the algebraic sum cancels to zero, so the flux is again zero. For several charges the superposition principle immediately gives the general form $\oiint_S \vec E\cdot d\vec S = Q_{\text{enc}}/\varepsilon_0$. The most moving part of this derivation is that no symmetry assumption is used anywhere, so Gauss's theorem is a universally valid theorem, not merely a trick for symmetric problems.

### Derivation 2: A general formula for spherically symmetric distributions

For any spherically symmetric charge distribution, take a concentric sphere of radius $r$; its flux is $E(r)\cdot 4\pi r^2$, hence

$$E(r) = \frac{Q_{\text{enc}}(r)}{4\pi\varepsilon_0 r^2},\qquad Q_{\text{enc}}(r)=4\pi\int_0^r \rho(r')\,r'^2\,dr'$$

A single formula covers every result for shells, uniform spheres and non-uniform spheres: just replace $Q_{\text{enc}}(r)$ instead of memorising each case. The so-called "various results" are all special cases of this general formula.

### Numerical example (1): Field strength and flux inside and outside a charged shell

**Problem**: A uniformly charged spherical shell of radius $R=0.10\ \text{m}$ carries total charge $Q=2.0\times10^{-8}\ \text{C}$. Find the electric field strength at $r_1=0.050\ \text{m}$ (inside) and $r_2=0.20\ \text{m}$ (outside), and the electric flux through these two Gaussian surfaces. Take $\dfrac{1}{4\pi\varepsilon_0}=8.99\times10^{9}\ \text{N}\cdot\text{m}^2/\text{C}^2$ and $\varepsilon_0=8.85\times10^{-12}\ \text{C}^2/(\text{N}\cdot\text{m}^2)$.

**Step 1 (identify the type)**: The charge distribution is spherically symmetric, so choose concentric spheres as Gaussian surfaces. By symmetry the field can only be radial, with the same magnitude everywhere on a sphere of given radius and everywhere along the normal, so the flux can be written $E\cdot 4\pi r^2$.

**Step 2 (inside)**: All the shell's charge lies on the surface $r=R$, so the Gaussian surface of radius $r_1<R$ encloses $Q_{\text{enc}}=0$, hence

$$E_1\cdot 4\pi r_1^2 = 0\quad\Rightarrow\quad E_1 = 0\ \text{N/C},\qquad \Phi_1 = 0\ \text{N}\cdot\text{m}^2/\text{C}$$

**Step 3 (outside)**: The Gaussian surface of radius $r_2>R$ encloses all the charge, $Q_{\text{enc}}=2.0\times10^{-8}\ \text{C}$, so

$$E_2 = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r_2^2} = (8.99\times10^{9})\times\frac{2.0\times10^{-8}}{(0.20)^2} = \frac{179.8}{0.040} \approx 4.50\times10^{3}\ \text{N/C}$$

directed radially away from the centre. The flux through that Gaussian surface is

$$\Phi_2 = \frac{Q_{\text{enc}}}{\varepsilon_0} = \frac{2.0\times10^{-8}}{8.85\times10^{-12}} \approx 2.26\times10^{3}\ \text{N}\cdot\text{m}^2/\text{C}$$

**Step 4 (cross-check)**: Recomputing the flux directly from the field, $E_2\cdot 4\pi r_2^2 = 4.50\times10^{3}\times4\pi\times0.040 \approx 2.26\times10^{3}$, agrees exactly with Step 3, confirming the calculation. The conclusion in one sentence: zero field inside the shell, equivalent point charge outside.

### Numerical example (2): Field strength of an infinite charged plane

**Problem**: An infinite uniformly charged plane has surface charge density $\sigma=3.0\times10^{-9}\ \text{C/m}^2$; find the field strength at a distance $h=1.0\ \text{cm}$ from the plane.

**Solution**: Take a cylindrical pillbox Gaussian surface of base area $A$, symmetric about the charged plane, with the two caps on opposite sides and parallel to it. The field lines then cross the caps perpendicularly along the axis, while the normal of the side surface is perpendicular to $\vec E$, giving zero flux there; the two caps each contribute $EA$, totalling $2EA$. The enclosed charge is $\sigma A$, so

$$2EA = \frac{\sigma A}{\varepsilon_0}\quad\Rightarrow\quad E = \frac{\sigma}{2\varepsilon_0} = \frac{3.0\times10^{-9}}{2\times8.85\times10^{-12}} \approx 1.69\times10^{2}\ \text{N/C}$$

**Conclusion and pitfall note**: The result has nothing to do with the distance $h$; the value $h=1.0\ \text{cm}$ given in the problem is precisely a redundant distractor, included only to test whether you really understand the physics of the "infinite model". Also remember that the two caps each contribute: counting only one would give the wrong answer $3.39\times10^{2}\ \text{N/C}$.

## 11. Pitfall Checklist and Standard Solution Procedure

**Pitfall 1: Confusing "no charge inside the surface" with "zero field on the surface".** No enclosed charge only guarantees zero net flux; when a point charge lies outside a closed surface, the net flux through that surface is zero but $E\neq0$ everywhere on it, since entry and exit cancel.

**Pitfall 2: Confusing "zero field at a point on the surface" with "no charge inside".** There is no implication either way; never infer one from the other.

**Pitfall 3: Forgetting that a surface is "oriented".** $d\vec S$ must be positive along the outward normal; if the problem gives an open surface, first close it artificially, use Gauss's theorem to get the total flux, then subtract the contribution of the added patch.

**Pitfall 4: Swapping numerator and denominator for $\varepsilon_0$.** Mnemonic: "charge divided by $\varepsilon_0$ gives the flux". Dimensionally, $\varepsilon_0$ has units $\text{C}^2/(\text{N}\cdot\text{m}^2)$, and only dividing by it turns coulombs into $\text{N}\cdot\text{m}^2/\text{C}$.

**Pitfall 5: Applying infinite models to finite systems.** "The field of an infinite plane is independent of distance" and "the field of an infinite cylinder $\propto 1/r$" hold only approximately when the point of interest is much closer than the transverse size of the model; near the edges of a finite plate, edge effects cause significant deviation.

**Pitfall 6: Mixing up the three symmetric pairs.** Spherical symmetry with a sphere ($4\pi r^2$), axial symmetry with a coaxial cylinder ($2\pi r L$, with the caps usually contributing no flux), plane symmetry with a pillbox ($2EA$). Choose the wrong Gaussian surface and the equation cannot even be written.

**Standard solution procedure (five steps)**: 1) determine the symmetry; 2) choose the Gaussian surface, making sure $\vec E$ is constant in magnitude on it and everywhere perpendicular (or parallel) to the normal; 3) compute the enclosed charge by integrating the actual distribution, never substituting the total charge in interior cases; 4) write the equation $\oiint \vec E\cdot d\vec S = E\cdot S_{\text{eff}} = Q_{\text{enc}}/\varepsilon_0$; 5) solve for $E$ and perform two checks—whether the dimensions are right, and whether it reduces to the point-charge field as $r\to\infty$ and joins continuously across interfaces. Practise this procedure until it is second nature and the calculational problems of this chapter become hard to lose marks on; then re-examine your work against the pitfall checklist above to stop careless slips before handing in.
`,
    keyPoints: [
      'Electric flux $\\Phi_E = \\iint_S \\vec E\\cdot d\\vec S$',
      'Gauss\u2019s theorem $\\oiint_S \\vec E\\cdot d\\vec S = Q_{\\text{enc}}/\\varepsilon_0$',
      'Gauss\u2019s theorem shows the electrostatic field is a source field whose sources are charges',
      'Only when the charge distribution is highly symmetric (sphere, cylinder, plane) can $\\vec E$ be found directly',
      'Use a sphere for spherical symmetry, a cylinder for axial symmetry, and a pillbox for plane symmetry',
    ],
  },
  'potential': {
    chapter: 'Chapter 3 Electric Potential',
    title: 'Potential Energy and Electric Potential',
    summary:
      'The electrostatic field is conservative, so a potential energy can be introduced that turns "work done" into "the difference of a function of position"; potential superposition and the gradient relation $E=-\\nabla\\varphi$ link field and potential as two complementary descriptions.',
    content: String.raw`

With the electric field intensity $\vec E$ in hand, every electrostatic problem seems solved: forces, motion and equilibrium can all be computed. But engineers care more often about "how much energy it takes to move a charge from A to B" than about the force at every point. In designing a cathode-ray tube or a particle accelerator, for instance, the key figure is the accelerating voltage (potential difference), not the field distribution. Integrating the force point by point to get the work is tedious, so we look for a scalar function like gravitational potential energy—the potential $\varphi$—such that "work done" equals the potential difference between start and end multiplied by the charge. Scalars are far easier to handle than vectors: no vector superposition is needed, just add the (scalar) potentials contributed by each charge and take the gradient to return to the field.

This is precisely the gift of the "conservative" nature of the electrostatic field. The work done by electrostatic forces is independent of path, so we can define the "potential height" of every point in space, much as the gravitational field defines height. From then on the field has two complementary descriptions: the vector field $\vec E$ tells you "which way the force points", and the scalar field $\varphi$ tells you "how high the energy is". The two transform into each other via $\vec E=-\nabla\varphi$, just like "slope" and "altitude" on a topographic map.

## 2. Rigorous Definitions: Potential Energy, Potential and Gradient

**Conservativeness and the circulation theorem**: Moving a charge along any closed path in an electrostatic field, the work done by the field is zero:

$$\oint_L \vec E\cdot d\vec l = 0$$

That is, the electrostatic field is irrotational (conservative) and a potential energy function can be introduced.

**Potential energy**: When a charge $q$ is moved from a reference point to some point, the work done by an external agent against the field equals the potential energy at that point. The potential energy of a point charge $q$ at point $a$ is

$$W_a = q\varphi_a$$

where $\varphi_a$ is the potential there. The work done by the field between two points is

$$A_{ab} = q(\varphi_a - \varphi_b) = W_a - W_b$$

**Electric potential**: the potential energy per unit positive charge. Taking infinity as the zero of potential, a point charge $q$ produces at distance $r$

$$\varphi = \frac{1}{4\pi\varepsilon_0}\frac{q}{r}$$

The unit is the volt, $\text{V}= \text{J/C}$.

**Superposition principle for potential** (scalar addition, far easier than vector addition of fields):

$$\varphi(\vec r) = \frac{1}{4\pi\varepsilon_0}\sum_i \frac{q_i}{|\vec r-\vec r_i|},\qquad \varphi = \frac{1}{4\pi\varepsilon_0}\int\frac{dq}{R}$$

**Differential relation between field and potential**:

$$\vec E = -\nabla\varphi = -\left(\frac{\partial\varphi}{\partial x}\hat i+\frac{\partial\varphi}{\partial y}\hat j+\frac{\partial\varphi}{\partial z}\hat k\right)$$

So the field points in the direction of fastest decrease of potential, with magnitude equal to the rate of change of potential. In one dimension $E = -d\varphi/dx$.

**Equipotential surfaces**: surfaces on which the potential is constant. Moving a charge on such a surface involves no work by the field, so equipotential surfaces are **everywhere perpendicular** to field lines. The equipotentials of a point charge are concentric spheres.

## 3. Why Understand It This Way

**Why is the electrostatic force conservative?** Because the Coulomb force is a central force with an inverse-square law, structurally the same as gravitation, and its integral around a closed path must vanish. This property lets us define a global potential function.

**Why is potential superposition easier than field superposition?** Potential is a scalar and can be added algebraically; field intensity is a vector and must be decomposed and summed as vectors. Computing the potential of many charges often saves more than half the work of computing the field.

**Why the minus sign in $\vec E=-\nabla\varphi$?** The field pushes a positive charge from high potential toward low potential, i.e. the field points in the direction of decreasing potential; the gradient points in the direction of increase, hence the minus sign.

**Why take infinity as the zero of potential?** For a localised finite charge distribution, the field tends to zero at infinity and so does the potential energy, making infinity the most natural reference; for infinite charged bodies (such as an infinite line) some finite reference point must be chosen instead.

**Why are equipotentials perpendicular to field lines?** If an equipotential had a component along the field, moving a charge along that surface would involve work by the field, contradicting "no work on an equipotential"; hence the two must be perpendicular.

## 4. Typical Calculations

**Example 1: The point of zero potential on the line joining two charges.** $+Q$ and $-Q$ are separated by $d$; at distance $x$ from $+Q$ the potential is

$$\varphi = \frac{1}{4\pi\varepsilon_0}\left(\frac{Q}{x}-\frac{Q}{d-x}\right)=0\quad\Rightarrow\quad x=d/2$$

that is, the whole bisecting plane has zero potential (note that the field does not vanish there; potential and field are different concepts).

**Example 2: Potential of a uniformly charged spherical shell.** Outside, $\varphi = \dfrac{1}{4\pi\varepsilon_0}\dfrac{Q}{r}$; inside ($r<R$), since the field vanishes, the potential everywhere equals its value on the surface, $\varphi = \dfrac{1}{4\pi\varepsilon_0}\dfrac{Q}{R}$.

**Example 3: Field from potential.** Given $\varphi = \dfrac{kQ}{\sqrt{x^2+y^2+z^2}}$, then

$$\vec E = -\nabla\varphi = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r^3}\vec r$$

which recovers the point-charge field. Once fluent, finding the potential first and then the field is often simpler.

**Example 4: Far-field potential of an electric dipole.** With $\vec p=q\vec l$, at large distances $\varphi = \dfrac{1}{4\pi\varepsilon_0}\dfrac{\vec p\cdot\hat r}{r^2}$, decaying as $1/r^2$ (while the field decays as $1/r^3$). Taking the gradient gives the dipole field, confirming $E=-\nabla\varphi$.

## 5. Common Misconceptions

**Misconception 1: Where the potential is zero the field must be zero.** Wrong. On the bisecting plane $\varphi=0$ but $\vec E\neq0$; what determines the field is the spatial rate of change of the potential, not the potential itself.

**Misconception 2: Potential is a vector.** Potential is a scalar, positive or negative, and superposes by algebraic addition.

**Misconception 3: Field lines always run from high to low potential.** This holds for positive charges; a negative charge feels a force in the opposite direction, but field lines are still defined as the direction of force on a positive charge, i.e. toward decreasing potential.

**Misconception 4: Confusing potential energy with potential.** Potential energy $W=q\varphi$ depends on the charge $q$ being considered, whereas the potential $\varphi$ does not depend on $q$.

**Misconception 5: Equipotential surfaces are field lines.** They are orthogonal and entirely different; where equipotentials are closely spaced the field is not necessarily strong—look at the rate of change of potential.

## 6. Extensions and Synthesis

The complementary relation between potential and field is extremely flexible in problem solving: for symmetric distributions, first find $\vec E$ by Gauss's theorem, then integrate $\varphi = -\int \vec E\cdot d\vec l$ to get the potential; for asymmetric distributions, first superpose to get the potential, then take the gradient to get the field. Use whichever is simpler.

In problems on electric dipoles, molecules and antenna radiation, one often performs a "multipole expansion" first: at large distances the potential is written as a monopole term (net charge), a dipole term ($1/r^2$), a quadrupole term, and so on, decaying in turn. A neutral system has no monopole term, so the dipole term dominates—an echo of the dipole fields of Chapter 1.

Potential difference (voltage) is moreover the cornerstone of circuits and electrical engineering: an electron gains kinetic energy $eU$ across a potential difference $U$, on which the design of electron guns, X-ray tubes and particle accelerators rests.

## 7. Worked Examples and Pitfalls

**Example 5: Potential and field on the axis of a uniformly charged disk.** For a disk of radius $R$ and surface density $\sigma$, at distance $x$ from the centre along the axis, split the disk into rings and integrate:

$$\varphi(x) = \frac{\sigma}{2\varepsilon_0}\left(\sqrt{R^2+x^2}-|x|\right)$$

Taking the (one-dimensional) gradient gives $E_x = -\dfrac{d\varphi}{dx} = \dfrac{\sigma}{2\varepsilon_0}\left(1-\dfrac{|x|}{\sqrt{R^2+x^2}}\right)$, in agreement with direct superposition. This "potential first, field second" route is often less work.

**Example 6: Potential difference and kinetic energy.** An electron accelerated through $U=1000\ \text{V}$ gains kinetic energy $eU = 1.6\times10^{-16}\ \text{J}$ and speed $v=\sqrt{2eU/m}\approx 1.9\times10^7\ \text{m/s}$. Note that relativistic effects cannot be neglected for large $U$; here the non-relativistic approximation is adequate.

**Example 7: Field just outside a conductor's surface.** For surface charge density $\sigma$ on a conductor, just outside the surface $\vec E = \sigma/\varepsilon_0\,\hat n$ (from a pillbox Gaussian surface). Since the surface is an equipotential, field lines are perpendicular to it. Combining Gauss's theorem with "the surface is an equipotential" explains uniformly the exterior field conditions of a conductor in electrostatic equilibrium.

**Example 8: Potential of a complex distribution by superposition.** For a hemispherical shell (radius $R$, total charge $Q$), the potential at the centre: a complete shell gives $Q/(4\pi\varepsilon_0R)$ at the centre, so the hemisphere gives half, $\varphi = Q/(8\pi\varepsilon_0R)$. Since every point of the shell is at distance $R$ from the centre, the potential depends only on the total charge through $1/R$, and symmetry makes the integral trivial.

The greatest charm of the potential method is that it replaces cumbersome vector superposition with simple scalar addition, and then a gradient "restores" the field in one step. Cultivate the flexible habit "use Gauss for symmetric fields, find the potential first when asymmetric", and electrostatics becomes easy.

## 8. Concept Map and Typical Exam Questions

This chapter rests on four pillars: conservativeness, potential energy, potential and the gradient relation. Typical exam questions fall into five types. The first is computing the potential of a system of point charges or a continuous distribution, where scalar superposition is simplest. The second is finding the field from a known potential ($\vec E=-\nabla\varphi$), minding the minus sign and the direction. The third is the relation between equipotentials and field lines: remember orthogonality and zero work on an equipotential. The fourth is potential difference, energy and accelerating voltage. The fifth is converting between potential and field for typical symmetric distributions (spherical shell, disk, dipole). Common lost marks: assuming zero potential implies zero field, treating potential as a vector, confusing potential with potential energy, misremembering the sign in $E=-\nabla\varphi$, and mistaking equipotentials for field lines. Advice: prefer scalar superposition for the potential and then the gradient for the field; keep a single zero of potential throughout (usually infinity); remember the metaphor "potential is altitude, field is slope", and both the conceptual and calculational questions of this chapter become secure.

## 9. Deepening the Physical Intuition: Potential Is "Terrain Height"

Picture the potential as terrain height and almost every phenomenon in this chapter can be explained. A topographic map has two things: the altitude $h(x,y)$ at each place, a scalar; and the slope and aspect at each point, the negative gradient $-\nabla h$, a vector. Water flows downhill, and the direction of flow is set by the slope, not by the altitude value itself. Correspondingly, the potential $\varphi$ is the height on the "electromagnetic topographic map", and $\vec E=-\nabla\varphi$ is the slope of that map: it points in the direction of fastest decrease of height (potential), and its magnitude is the maximum steepness of descent.

This analogy immediately explains a counter-intuitive fact that long troubles beginners: **where the potential is zero, the field can be very strong**. Just as a valley at zero altitude (relative to sea level) can contain a sheer cliff—what determines the acceleration of water is the slope, not the absolute altitude. Likewise, inside a uniformly charged conducting sphere at a potential of $10^4\ \text{V}$ the field is zero, just as a flat lake surface on a plateau has high altitude but no slope at all.

Another useful intuition is that "work depends only on the height difference". The effort of climbing depends only on the height difference between start and summit, not on which winding trail you choose—this is exactly what **conservative force** means, and the only necessary condition for introducing potential energy. The reason the electrostatic field enjoys this blessing is that the Coulomb force is a central inverse-square force: its path integral depends only on the radial distances of the start and end points, so around any closed loop the work is strictly zero.

One more often-overlooked point: the absolute value of the potential cannot be measured; only potential differences (voltages) can. The choice of the zero point is entirely a human convention—just as where altitude is zero depends on the chosen datum. For charge distributions confined to a finite region, taking infinity as zero is most natural; but for distributions extending to infinity (an infinite line, an infinite plane), forcing infinity to be zero makes the potential diverge, and a finite reference point must be chosen instead. In practice just remember: **there can be only one zero of potential in a given problem**, and always write the potential energy of $q$ as $W=q\varphi$ rather than $\varphi$ itself.

## 10. Complete Derivations and Numerical Worked Examples

### Derivation 1: Zero circulation and conservativeness

From Coulomb's law, the field of a point charge $q$ is $\vec E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2}\hat r$. Compute the line integral along any closed loop $L$. Note that in spherical coordinates $d\vec l = dr\,\hat r + r\,d\theta\,\hat\theta + r\sin\theta\,d\phi\,\hat\phi$, and $\vec E$ has only a radial component, so

$$\vec E\cdot d\vec l = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}\,dr$$

Since $dr/r^2 = -d(1/r)$ is an **exact differential**, returning to the starting point along a closed loop restores $r$ to its original value and the integral must vanish:

$$\oint_L \vec E\cdot d\vec l = -\frac{q}{4\pi\varepsilon_0}\oint_L d\left(\frac1r\right) = 0$$

By superposition every charge distribution satisfies this, hence $\nabla\times\vec E=0$: the electrostatic field is irrotational and a scalar potential can be defined.

### Derivation 2: From the definition of the field to $\vec E=-\nabla\varphi$

The potential difference is defined as the work done by an external agent in moving unit positive charge from a reference point $P_0$ to $P$: $\varphi(P)-\varphi(P_0) = -\int_{P_0}^{P}\vec E\cdot d\vec l$. Taking infinity as zero gives $\varphi(P) = \int_P^{\infty}\vec E\cdot d\vec l$. Now displace $P$ a small distance $d\vec l$; the change in potential is

$$d\varphi = -\vec E\cdot d\vec l = -\left(E_x dx + E_y dy + E_z dz\right)$$

But by the definition of the exact differential $d\varphi = \dfrac{\partial\varphi}{\partial x}dx + \dfrac{\partial\varphi}{\partial y}dy + \dfrac{\partial\varphi}{\partial z}dz$; comparing coefficients term by term immediately gives

$$\vec E = -\nabla\varphi,\qquad E_x=-\frac{\partial\varphi}{\partial x},\ E_y=-\frac{\partial\varphi}{\partial y},\ E_z=-\frac{\partial\varphi}{\partial z}$$

The physical meaning of the minus sign has been stressed repeatedly: the field points in the direction of fastest decrease of potential, because there a unit positive charge is pushed down the energy hill.

### Numerical example (1): Superposing potentials of two point charges and the work of transport

**Problem**: On the $x$ axis place two point charges $q_1=+4.0\times10^{-9}\ \text{C}$ and $q_2=+2.0\times10^{-9}\ \text{C}$ separated by $d=0.30\ \text{m}$. Find the potential at the midpoint; if a third charge $q_0=+1.0\times10^{-9}\ \text{C}$ is moved slowly from infinity to that midpoint, find the work done by the field and by the external agent. Take $\dfrac{1}{4\pi\varepsilon_0}=8.99\times10^9\ \text{N}\cdot\text{m}^2/\text{C}^2$.

**Solution**: The midpoint is equidistant from both charges, $r_1=r_2=d/2=0.15\ \text{m}$. Potential is a scalar, so add algebraically:

$$\varphi = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_1}{r_1}+\frac{q_2}{r_2}\right) = (8.99\times10^9)\times\frac{4.0\times10^{-9}+2.0\times10^{-9}}{0.15} = (8.99\times10^9)\times(4.0\times10^{-8}) \approx 3.60\times10^2\ \text{V}$$

Note that no vector decomposition is needed at all, which is exactly why the potential method saves work compared with field superposition (finding the field there would require a vector difference, since both charges are positive and their fields weaken each other at the midpoint).

The potential energy of $q_0$ at that point is $W_0 = q_0\varphi = (1.0\times10^{-9})\times(3.60\times10^2) \approx 3.60\times10^{-7}\ \text{J}$. The potential energy at infinity is zero, so in moving $q_0$ slowly from infinity, the **work done by the external agent** is

$$A_{\text{ext}} = \Delta W = W_0 - 0 \approx +3.60\times10^{-7}\ \text{J}$$

while the **work done by the field** is

$$A_{\text{field}} = q_0(\varphi_{\infty}-\varphi) = (1.0\times10^{-9})\times(0-3.60\times10^2) \approx -3.60\times10^{-7}\ \text{J}$$

The two are opposite in sign and sum to zero—"slow movement" means the kinetic energy is unchanged, consistent with the work-energy theorem. This sign convention is the first mark-losing point in such problems.

### Numerical example (2): Potential on a charged shell's surface and transport across regions

**Problem**: A uniformly charged spherical shell of radius $R=0.10\ \text{m}$ carries total charge $Q=5.0\times10^{-9}\ \text{C}$. Find the potential on the surface and at $r=0.20\ \text{m}$ from the centre; if a test charge $q=2.0\times10^{-9}\ \text{C}$ is moved from the surface to that point, how much work does the field do?

**Solution**: By Gauss's theorem from Chapter 2, $E=0$ inside the shell, so the potential throughout the interior equals the surface value; outside, $E$ is the same as for a point charge, hence

$$\varphi_{\text{surface}} = \frac{1}{4\pi\varepsilon_0}\frac{Q}{R} = (8.99\times10^9)\times\frac{5.0\times10^{-9}}{0.10} = \frac{44.95}{0.10} \approx 4.50\times10^2\ \text{V}$$

$$\varphi_{0.20} = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r} = \frac{44.95}{0.20} \approx 2.25\times10^2\ \text{V}$$

Note that $\varphi_{0.20}$ is exactly half the surface value, because the potential decays as $1/r$ (while the field decays as $1/r^2$); the powers differ by one, a quantitative expression of "potential is smoother than field".

Work done by the field:

$$A_{\text{field}} = q(\varphi_{\text{surface}}-\varphi_{0.20}) = (2.0\times10^{-9})\times(4.50\times10^2-2.25\times10^2) \approx 4.50\times10^{-7}\ \text{J}$$

The result is positive, meaning the positive charge is pushed away from the positively charged shell and the work is positive, in agreement with the intuition "like charges repel"; this step is also the quickest way to check whether the signs of the potentials are wrong.

## 11. Pitfall Checklist and Solution Template

**Pitfall 1: Mistaking potential for a "stored form" of field strength.** The field is determined by the **spatial rate of change** of the potential: in a uniform zero-field region (such as the interior of a charged shell) the potential can be hundreds of volts. Remember "height ≠ slope".

**Pitfall 2: Changing the zero of potential at will.** In one problem the zero of potential must be unique. When dealing with distributions extending to infinity (infinite line, infinite plane), do not insist on infinity as zero, or you will encounter divergences.

**Pitfall 3: Applying vector superposition to scalars, or the reverse.** Finding the potential is algebraic addition (with signs); finding the field is vector addition (resolving components or using symmetry). Confusing them leads to sign errors.

**Pitfall 4: Confusing the work done by the field with that done by an external agent.** For slow movement they are opposite: $A_{\text{ext}}=q(\varphi_{\text{final}}-\varphi_{\text{initial}})$, $A_{\text{field}}=q(\varphi_{\text{initial}}-\varphi_{\text{final}})$. Always read the question to see which one is asked.

**Pitfall 5: Ignoring the minus sign.** $A=q(\varphi_a-\varphi_b)$ is "potential at the start minus potential at the end"; $E=-d\varphi/dx$ carries a minus sign. A sign slip ruins everything.

**Pitfall 6: Thinking electrons run from high to low potential.** An electron is negatively charged, feels a force opposite to the field, and spontaneously moves from low to high potential; only positive charges move "from high to low".

**Standard solution template (four steps)**: 1) choose the zero of potential and fix it throughout; 2) find the potentials at the key points by scalar superposition or path integration (if $\vec E$ is already known, use $\varphi_b-\varphi_a=-\int_a^b \vec E\cdot d\vec l$, taking care that the expression for $\vec E$ differs in each segment when integrating piecewise); 3) take the gradient $\vec E=-\nabla\varphi$ to recover the field, or use the potential difference to compute work; 4) check against physical intuition (like charges repel, so a positive charge should be pushed toward lower potential; the unit should be the joule). Master this procedure and the chapter on potential becomes clear and reliable from concept to calculation.
`,
    keyPoints: [
      'The work done by electrostatic forces is path-independent, so the field is conservative',
      'Potential energy $W_a = q\\varphi_a$, work done $A_{ab}=q(\\varphi_a-\\varphi_b)$',
      'Potential of a point charge $\\varphi = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r}$',
      'Potential superposition $\\varphi = \\sum \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_i}{r_i}$',
      'Relation between field and potential $\\vec E = -\\nabla\\varphi$',
      'Moving a charge on an equipotential does no work; equipotentials are everywhere perpendicular to field lines',
    ],
  },
  'conductors-capacitors': {
    chapter: 'Chapter 4 Conductors and Capacitors',
    title: 'Electrostatic Equilibrium and Capacitance',
    summary:
      'In electrostatic equilibrium a conductor has zero field inside and its surface is perpendicular to the external field; a capacitor quantifies charge storage by $C=Q/U$, and introducing a dielectric raises the capacitance through the relative permittivity while changing the field distribution.',
    content: String.raw`

Metals are good conductors because they contain a great many freely moving electrons. Put a piece of metal in an external field and these free electrons immediately drift under the field and redistribute until induced charges pile up on the conductor's surface. The "internal field" produced by the induced charges exactly cancels the external field, making the total field inside the conductor zero. The electrons then cease their directed motion and the system reaches **electrostatic equilibrium**. This automatic "screening" of the internal field is the physical basis of electrostatic applications (Faraday cages, shielded cables).

A conductor in equilibrium has many striking properties: it is an equipotential body (the field inside is zero, so the potential difference along any path vanishes), its charge resides only on the surface, and the field at the surface must be perpendicular to it. With these in hand one can analyse charged conductors, hollow conductors, corona discharge at sharp points, and more.

Going further, if two conductors are separated by an insulating medium and charged, we obtain a **capacitor**—a device dedicated to storing charge and electrical energy. The capacitance $C=Q/U$ measures "how much charge is stored per volt". From radios to flash units, capacitors are everywhere. This chapter strings conductor equilibrium and capacitor storage together, and introduces dielectrics that multiply the capacitance.

## 2. Rigorous Definitions: Equilibrium Conditions and Capacitance

**Conditions for electrostatic equilibrium**:
- The field inside the conductor vanishes everywhere: $\vec E_{\text{in}}=0$;
- The field just outside the surface is perpendicular to it;
- The whole conductor is an equipotential body.

**Charge distribution**: In equilibrium the net charge resides entirely on the surface of the conductor; the relation between the surface charge density $\sigma$ and the field just outside the surface (pillbox Gaussian surface) is

$$E_{\text{surface}} = \frac{\sigma}{\varepsilon_0}$$

**Hollow conductor**: When there is no charge inside the cavity, the inner surface carries no charge and the field within the cavity is zero (electrostatic shielding); when a charge $q$ is inside the cavity, the inner surface acquires $-q$ and the outer surface $+q$, and the external field is determined by the outer-surface charge, independent of the position of the charge inside.

**Capacitance**: the charge-storing ability of an isolated conductor or a system of conductors

$$C = \frac{Q}{U}$$

The unit is the farad, $\text{F} = \text{C/V}$.

**Parallel-plate capacitor** (area $S$, plate separation $d$, neglecting edges): the uniform field between the plates is $E=\sigma/\varepsilon_0=Q/(\varepsilon_0 S)$ and the voltage is $U=Ed=Qd/(\varepsilon_0 S)$, hence

$$C = \frac{\varepsilon_0 S}{d}$$

**Series and parallel**:
- Parallel: $C = C_1+C_2+\cdots$ (same voltage);
- Series: $\dfrac1C = \dfrac1{C_1}+\dfrac1{C_2}+\cdots$ (same charge).

**Dielectrics and permittivity**: Molecular polarisation in the medium produces bound charges that weaken the internal field. Introduce the relative permittivity $\varepsilon_r$:

$$C = \varepsilon_r C_0,\qquad \vec E = \frac{\vec E_0}{\varepsilon_r}$$

where $\varepsilon = \varepsilon_r\varepsilon_0$ is the absolute permittivity. Typical values of $\varepsilon_r$: air ≈ 1, water ≈ 80, barium titanate can reach several thousand.

**Electric displacement**: $\vec D = \varepsilon_0\vec E+\vec P$ ($\vec P$ being the polarisation), and Gauss's theorem in the presence of a dielectric reads

$$\oiint \vec D\cdot d\vec S = Q_{\text{free}}$$

**Energy stored in a capacitor**:

$$W = \frac12 CU^2 = \frac{Q^2}{2C} = \frac12 QU$$

## 3. Why Understand It This Way

**Why must the field inside a conductor be zero?** If there were a field inside, the free electrons would keep being accelerated and would not yet be in equilibrium; charge is at rest only when the field vanishes, so the very definition of equilibrium requires $E=0$ inside.

**Why is the charge only on the surface?** A vanishing internal field means no net volume charge density (by Gauss's theorem), so charge can only sit on the surface; at sharp points of large curvature $\sigma$ is larger and the field stronger, making discharge easy (the principle of the lightning rod).

**Why does inserting a dielectric increase the capacitance?** Polarisation of the dielectric produces bound charges of opposite sign that weaken the effective field between the plates, so at the same voltage more free charge can be accommodated, i.e. $C$ grows by a factor $\varepsilon_r$.

**Why is $\vec D$ more convenient?** In the presence of a dielectric, Gauss's theorem for $\vec D$ involves only free charge, bypassing the complicated calculation of bound charge, and is especially suited to symmetric dielectric problems.

**Why is the stored energy $Q^2/(2C)$ rather than $QU$?** During charging the voltage rises from 0 to $U$, so the average voltage is $U/2$; hence $W=\int_0^Q U\,dQ = \int_0^Q (Q/C)\,dQ = Q^2/(2C)$, not $QU$.

## 4. Typical Calculations

**Example 1: A parallel-plate capacitor.** With $S=0.01\ \text{m}^2$ and $d=1\ \text{mm}$,

$$C = \frac{\varepsilon_0 S}{d} = \frac{8.85\times10^{-12}\times 0.01}{10^{-3}} \approx 8.85\times10^{-11}\ \text{F}=88.5\ \text{pF}$$

**Example 2: Inserting a dielectric.** Charge the capacitor above to $Q$, disconnect the source, then insert a dielectric with $\varepsilon_r=2$: the charge $Q$ is unchanged, $C$ doubles, the voltage halves to $U'=U/2$, and the field halves; the stored energy drops to half (the rest goes into polarising the dielectric). If instead the voltage is held constant, $Q$ doubles and the stored energy doubles.

**Example 3: A spherical capacitor.** For concentric shells of inner and outer radii $a,b$, the voltage between them is $U=\int_a^b \dfrac{Q}{4\pi\varepsilon_0 r^2}dr = \dfrac{Q}{4\pi\varepsilon_0}(\dfrac1a-\dfrac1b)$, hence

$$C = 4\pi\varepsilon_0\frac{ab}{b-a}$$

For $b\gg a$ this reduces to the isolated conducting sphere $C=4\pi\varepsilon_0 a$.

**Example 4: A cylindrical capacitor.** For coaxial radii $a,b$, a similar integration gives $C = 2\pi\varepsilon_0 L/\ln(b/a)$.

## 5. Common Misconceptions

**Misconception 1: There is no charge inside a conductor.** One should say "no net volume charge"; the charge is on the surface. Moreover "no field inside" refers to the metal; a cavity may contain a field (if there is charge within it).

**Misconception 2: Capacitance is proportional to the charge.** $C=Q/U$ is a definition; for a given capacitor $C$ is a constant, independent of $Q$ and $U$ (for an ideal linear dielectric).

**Misconception 3: Inserting a dielectric always halves the field.** That holds only when $Q$ is fixed (disconnected); if $U$ is fixed (connected to the source), the field is unchanged and the charge doubles.

**Misconception 4: More dielectric means more stored energy.** It depends on the connection: it increases at constant voltage and decreases at constant charge.

**Misconception 5: Confusing the voltage division of series with the current division of parallel.** Series elements share the same charge and divide the voltage; parallel elements share the same voltage and divide the current; and the total capacitance of capacitors in series decreases.

## 6. Extensions and Synthesis

Dielectric theory connects microscopic polarisation with the macroscopic field: non-polar molecules acquire an induced dipole moment in a field and polar molecules align with it; both produce a polarisation $\vec P$ and hence bound charge $\rho_b=-\nabla\cdot\vec P$. After introducing $\vec D$, Gauss's theorem in a medium takes the same simple form as in vacuum, making it a general tool for real capacitors, cables and insulators.

The concept of capacitance also extends to "distributed capacitance" and "stray capacitance", which cannot be neglected in high-frequency circuits. In addition, the stored energy of a capacitor $W=\frac12CU^2$ mirrors the magnetic energy $\frac12LI^2$ of an inductor, and underlies the energy of LC oscillators and filter circuits.

## 7. Worked Examples and Pitfalls

**Example 5: Potential and energy of a charged conducting sphere.** For an isolated conducting sphere of radius $R$ and charge $Q$, the surface potential is $\varphi=Q/(4\pi\varepsilon_0 R)$ and the electrostatic energy is

$$W = \frac{Q^2}{2C} = \frac{Q^2}{8\pi\varepsilon_0 R}$$

This can also be verified by integrating the field energy density $u=\frac12\varepsilon_0 E^2$ over all space. The two methods agree, showing the unity of potential and field.

**Example 6: A parallel-plate capacitor half filled with dielectric.** If half the plate area is filled with a dielectric of $\varepsilon_r$ and half remains vacuum, the arrangement is two capacitors in parallel (same voltage), giving

$$C = \frac{\varepsilon_0 S/2}{d} + \frac{\varepsilon_r\varepsilon_0 S/2}{d} = \frac{\varepsilon_0 S}{2d}(1+\varepsilon_r)$$

If instead the dielectric is layered top and bottom (in series), then $1/C = d/(2\varepsilon_0 S)+d/(2\varepsilon_r\varepsilon_0 S)$. Different geometry gives a different equivalent circuit, so read the problem carefully.

**Example 7: Corona discharge and lightning protection.** A sharp point on a conductor has large curvature, large $\sigma$ and extremely high local field, which can ionise the air and form a discharge channel; the lightning rod uses exactly this to lead the strike away and protect the building. This is the most direct engineering application of electrostatic equilibrium and surface charge distribution.

**Example 8: The Faraday cage.** Once a metal cage is grounded, an external field cannot penetrate into the inner cavity (the field inside is zero when the cavity holds no charge), so instruments inside are free of external electrostatic disturbance. Conversely, charge inside the cage does not affect the outside (if grounded). This expresses the two-way nature of electrostatic shielding and is the principle of shielded rooms for precision measurements.

This chapter on conductors and capacitors twists together the two threads "equilibrium—equipotential—surface charge" and "capacitance—dielectric—stored energy"; grasp the master switch "the field inside is zero" and most problems open up.

## 8. Concept Map and Typical Exam Questions

This chapter rests on four pillars: electrostatic equilibrium, capacitance, dielectrics and stored energy. Typical exam questions fall into five types. The first is judging the properties of a conductor in electrostatic equilibrium (internal field, equipotential, surface charge distribution). The second is hollow conductors and electrostatic shielding, distinguishing the cases with and without charge in the cavity. The third is computing capacitance (parallel plate, sphere, cylinder) and series/parallel equivalents. The fourth is how quantities change after inserting a dielectric—always decide first whether the voltage or the charge is held constant. The fifth is the stored energy of a capacitor and where the energy comes from. Common lost marks: assuming there is no charge inside a conductor, treating $C$ as varying with $Q$, confusing the constant-voltage and constant-charge cases with a dielectric, reversing the series/parallel capacitance formulas, and neglecting plate edge effects so that the approximate formula gives a wrong result. Key points for exams: for any conductor, first write "field inside $E=0$, the whole body is an equipotential, charge on the surface"; for any dielectric, first determine the connection and then apply $\varepsilon_r$; remember the picture "potential is altitude, field is slope, a dielectric weakens the field", and this chapter is secure.

## 9. Deepening the Physical Intuition: Electrostatic Equilibrium Is a Process of Self-Correction

Electrostatic equilibrium is not a static, rigid rule but a dynamic process of self-correction; understand this and every property in this chapter follows naturally. Imagine suddenly placing a piece of metal in a uniform external field $\vec E_0$: at first this external field exists everywhere inside the metal, so the free electrons immediately feel a force $-e\vec E_0$, drift opposite to the field, accumulate negative charge on one surface and leave positive charge on the other. This surface charge then excites a "counter-field" $\vec E'$ according to its own distribution, directed opposite to $\vec E_0$.

The key is the feedback: as long as the total internal field has not returned to zero, the electrons keep drifting, the surface charge keeps growing and the counter-field keeps strengthening—until $\vec E'$ exactly cancels $\vec E_0$. At that point the net force on the electrons vanishes, the drift stops, and the system settles into electrostatic equilibrium. In a good conductor the whole process takes only about $10^{-16}\ \text{s}$, appearing instantaneous to the eye. It is a typical **negative-feedback self-consistent mechanism**: deviation drives correction, and correction removes the deviation.

Three basic conclusions can be read off this picture at once. First, **the total internal field is zero**: otherwise the process would not stop. Second, **the conductor is an equipotential body**: a zero internal field means the potential difference between any two points $-\int \vec E\cdot d\vec l = 0$, so the whole conductor (surface included) is at the same potential; this also shows that the surface must be an equipotential, so external field lines must enter or leave perpendicular to it. Third, **net charge resides only on the surface**: from $\nabla\cdot\vec E=\rho/\varepsilon_0$, a vanishing internal $\vec E$ implies a vanishing internal volume charge density $\rho\equiv 0$, so net charge with nowhere else to go is pushed to the boundary, the surface.

Extending further yields two engineering conclusions of great importance. The first is **the relation between surface charge density and curvature**: where the curvature is large (at a sharp point) the charge is denser and the nearby field extremely strong. The reason is that an isolated charged conductor must be an equipotential everywhere, while a protruding part of large curvature "opens out" through a larger angle, spreading the same charge over a more expansive external space; maintaining the same potential therefore requires a larger local surface density. This directly explains lightning rods and electrostatic precipitators. The second is **electrostatic shielding**: when a hollow conductor holds no charge in its cavity, the field is zero everywhere in the cavity (including the metal and the air cavity), forming a "Faraday cage" that completely isolates external electric disturbances.

On this basis, place two mutually insulated conductors face to face and charge them, and you have a **capacitor**: a pair of electrodes, a layer of insulation, and a store of electrical energy. The capacitance $C=Q/U$ answers the question "how much extra charge must be stored per volt of increase"; it is a function of geometry and dielectric, independent of how much charge is currently stored—just as the bottom area of a bucket is independent of how much water it holds.

## 10. Complete Derivations and Numerical Worked Examples

### Derivation 1: Charge on the surface from a vanishing internal field

Take any volume $V$ inside a conductor, bounded by a closed surface $S$. By Gauss's theorem,

$$\oiint_S \vec E\cdot d\vec S = \frac{Q_{\text{enc}}}{\varepsilon_0}$$

In electrostatic equilibrium $\vec E=0$ everywhere on $S$, so the left side vanishes and $Q_{\text{enc}}=\iiint_V \rho\,dV = 0$. Since $V$ is arbitrary, the integrand must vanish everywhere: $\rho\equiv 0$. Hence there is no net charge inside the conductor, and all net charge can reside only at the one remaining place, the surface.

Furthermore, take a flat cylindrical pillbox Gaussian surface flush against the conductor's surface, half inside the metal and half outside. The flux through the inner cap and the side surface both vanish (the side height tends to zero), leaving only the outer cap contributing $E_n A$; the enclosed charge is $\sigma A$, so

$$E_n A = \frac{\sigma A}{\varepsilon_0}\quad\Rightarrow\quad E_n = \frac{\sigma}{\varepsilon_0}$$

This is the origin of "the field just outside a conductor's surface equals the surface charge density divided by $\varepsilon_0$". Note that it differs by a factor of 2 from the infinite charged plane result $\sigma/(2\varepsilon_0)$—because for a conductor the neighbouring electrode on the other side supplies the whole field, so the field exists on one side only.

### Derivation 2: How the quantities change after inserting a dielectric, in two cases

Let the initial air capacitor be $C_0$; insert a dielectric of relative permittivity $\varepsilon_r$ filling the gap, giving $C=\varepsilon_r C_0$. The key is first to decide which of the following cases applies:

- **Constant charge (inserted after disconnecting the source)**: $Q$ is fixed, $C\to\varepsilon_r C_0$, so $U=Q/C$ drops to $U_0/\varepsilon_r$; $E=U/d$ likewise drops to $E_0/\varepsilon_r$; the stored energy $W=Q^2/(2C)$ drops to $W_0/\varepsilon_r$. The difference is converted into the work done in polarising the dielectric (the dielectric gains mechanical energy as it is drawn in).
- **Constant voltage (source always connected)**: $U$ is fixed, $E=U/d$ is unchanged, $Q=CU$ rises to $\varepsilon_r Q_0$, and $W=\frac12 CU^2$ rises to $\varepsilon_r W_0$.

The two cases give opposite conclusions and this is the most frequent mark-losing point in the chapter; write it on the first line of your rough work.

### Numerical example (1): Full calculation for inserting a dielectric at constant voltage

**Problem**: A parallel-plate capacitor has plate area $S=0.050\ \text{m}^2$ and separation $d=1.0\ \text{mm}$, and is kept connected to a $U=200\ \text{V}$ DC source. It is first fully charged in air, then a dielectric slab with $\varepsilon_r=5.0$ is inserted to fill the gap. Find the capacitance, charge, field strength and stored energy before and after insertion, and state how much net charge the source supplied. Take $\varepsilon_0=8.85\times10^{-12}\ \text{F/m}$.

**Solution**: First compute the initial parameters of the air capacitor.

$$C_0 = \frac{\varepsilon_0 S}{d} = \frac{8.85\times10^{-12}\times0.050}{1.0\times10^{-3}} = 4.43\times10^{-10}\ \text{F} = 443\ \text{pF}$$

$$Q_0 = C_0 U = (4.43\times10^{-10})\times200 \approx 8.85\times10^{-8}\ \text{C}$$

$$E_0 = \frac{U}{d} = \frac{200}{1.0\times10^{-3}} = 2.0\times10^{5}\ \text{V/m}$$

$$W_0 = \frac12 C_0 U^2 = \frac12\times(4.43\times10^{-10})\times(4.0\times10^{4}) \approx 8.85\times10^{-6}\ \text{J}$$

After inserting the dielectric, $C=\varepsilon_r C_0 = 5.0\times4.43\times10^{-10} = 2.21\times10^{-9}\ \text{F}$. Because the source remains connected, **$U$ stays at $200\ \text{V}$**, hence

$$E = \frac{U}{d} = 2.0\times10^{5}\ \text{V/m}\ (\text{unchanged}),\qquad Q = CU = (2.21\times10^{-9})\times200 \approx 4.43\times10^{-7}\ \text{C}$$

$$W = \frac12 CU^2 = \frac12\times(2.21\times10^{-9})\times(4.0\times10^{4}) \approx 4.43\times10^{-5}\ \text{J}$$

The extra charge supplied by the source is $\Delta Q = Q-Q_0 = 4.43\times10^{-7}-8.85\times10^{-8} \approx 3.54\times10^{-7}\ \text{C}$, and the work done by the source is $A=\Delta Q\cdot U \approx 7.08\times10^{-5}\ \text{J}$; half of it ($3.54\times10^{-5}\ \text{J}$, exactly the energy increment $\Delta W=W-W_0$) is stored in the capacitor, while the other half is consumed in the mechanical process of drawing the dielectric into the gap and in polarisation. This energy audit is precisely where the constant-voltage case is most often got wrong.

### Numerical example (2): Charge redistribution and energy loss after connecting capacitors in parallel

**Problem**: A capacitor $C_1=2.0\ \mu\text{F}$ is charged to $U_1=100\ \text{V}$, then connected in parallel with an uncharged $C_2=3.0\ \mu\text{F}$ (like plates joined). Find the common voltage, the charge on each capacitor, and the electrostatic energy lost in the process.

**Solution**: Before connection all the charge is carried by $C_1$:

$$Q_{\text{total}} = C_1 U_1 = (2.0\times10^{-6})\times100 = 2.0\times10^{-4}\ \text{C}$$

After connection the charge redistributes between the two capacitors; total charge is conserved, the total capacitance is $C_{\text{total}}=C_1+C_2=5.0\ \mu\text{F}$, and the common voltage is

$$U = \frac{Q_{\text{total}}}{C_{\text{total}}} = \frac{2.0\times10^{-4}}{5.0\times10^{-6}} = 40\ \text{V}$$

Thus

$$Q_1' = C_1 U = (2.0\times10^{-6})\times40 = 8.0\times10^{-5}\ \text{C},\qquad Q_2' = C_2 U = (3.0\times10^{-6})\times40 = 1.2\times10^{-4}\ \text{C}$$

Check: $8.0\times10^{-5}+1.2\times10^{-4}=2.0\times10^{-4}\ \text{C}$, equal to the initial total charge, so charge is conserved.

Now the energy:

$$W_{\text{before}} = \frac12 C_1 U_1^2 = \frac12\times(2.0\times10^{-6})\times10^{4} = 1.0\times10^{-2}\ \text{J}$$

$$W_{\text{after}} = \frac12 C_{\text{total}} U^2 = \frac12\times(5.0\times10^{-6})\times1600 = 4.0\times10^{-3}\ \text{J}$$

The electrostatic energy decreases by $\Delta W = 1.0\times10^{-2}-4.0\times10^{-3} = 6.0\times10^{-3}\ \text{J}$. The energy does not disappear; it is converted into Joule heat and electromagnetic radiation by the transient current in the connecting wires. The conclusion "charge sharing always loses energy" is very general, an inevitable consequence of charge conservation and energy conservation coexisting.

## 11. Pitfall Checklist and Solution Template

**Pitfall 1: Extending "the field inside a conductor is zero" to the cavity.** If a charge is placed in the cavity, the field there is not zero and the inner surface acquires an equal and opposite induced charge. The shielding conclusion applies only to a cavity with no charge inside.

**Pitfall 2: Thinking capacitance varies with charge or voltage.** For a linear dielectric, $C$ is determined by geometry and medium; $C=Q/U$ is only a definition and a measurement formula, just as a bucket's bottom area does not vary with the amount of water.

**Pitfall 3: Applying conclusions about inserting a dielectric without distinguishing the cases.** At constant charge, $Q$ is fixed and the field and voltage fall as $1/\varepsilon_r$; at constant voltage, $U$ is fixed and the charge and stored energy rise as $\varepsilon_r$. Get the case wrong and the answer is wrong.

**Pitfall 4: Confusing the field at a conductor's surface with that of an infinite plane.** A conductor's surface gives $E=\sigma/\varepsilon_0$, an isolated infinite charged sheet gives $E=\sigma/(2\varepsilon_0)$; they differ by a factor of 2, so never substitute one for the other.

**Pitfall 5: Thinking more dielectric means more stored energy.** Inserting at constant charge actually lowers the stored energy.

**Pitfall 6: Neglecting edge effects and breakdown limits.** The parallel-plate formula requires $d$ to be much smaller than the plate dimensions; real dielectrics also have a breakdown field, so the voltage cannot increase without limit.

**Pitfall 7: Forgetting the energy-conservation audit.** In the parallel-capacitor example, where the lost electrostatic energy went must be stated in the answer: it becomes Joule heat.

**Standard solution template (five steps)**: 1) write the three equilibrium facts (internal $E=0$, the whole body is an equipotential, charge on the surface); 2) decide whether this problem is constant-voltage or constant-charge (or involves series/parallel capacitors, with or without a source); 3) find the equivalent capacitance from the geometry or the series/parallel relations; 4) compute the required quantities with $Q=CU$, $E=U/d$, $W=\frac12 CU^2=\frac{Q^2}{2C}$; 5) finish with an energy audit and a dimensional check. Grasp the two master switches "zero field" and "constant voltage or constant charge" and almost every problem in this chapter opens automatically.
`,
    keyPoints: [
      'Electrostatic equilibrium: $E=0$ inside a conductor, and the surface field is perpendicular to the surface',
      'A conductor is an equipotential body and its charge resides only on the surface',
      'Capacitance $C = Q/U$; parallel plates $C = \\varepsilon_0 S/d$',
      'A dielectric increases the capacitance: $\\varepsilon_r$ is the relative permittivity',
      'Energy stored in a capacitor $W = \\tfrac12 CU^2 = Q^2/(2C)$',
      'Electric displacement $\\vec D = \\varepsilon_0\\vec E+\\vec P$; with a dielectric, Gauss\u2019s theorem for $\\vec D$ is simpler',
    ],
  },
  'steady-current': {
    chapter: 'Chapter 5 Steady Current',
    title: 'Current Density and Ohm\u2019s Law',
    summary:
      'The directed motion of charge forms a current, and the current density describes its spatial distribution; Ohm\u2019s law and Kirchhoff\u2019s laws raise circuit analysis from microscopic carrier transport to the solution of macroscopic networks.',
    content: String.raw`

Connect a battery and the bulb lights up—behind this, free electrons in the metal drift collectively under the electric field. An individual electron actually moves in chaotic thermal motion at very high speed, but the motions cancel randomly; with an applied field they acquire a tiny directed drift velocity (of order $10^{-4}\ \text{m/s}$), and it is this "net drift" that constitutes the observable current. A current is not electrons flying through the wire at high speed; rather, the "wave of disturbance" propagates at nearly the speed of light while the electrons drift slowly along with it.

The most intuitive way to describe a current is the total current $I=dq/dt$ (charge crossing a section per unit time). But when a wire changes thickness or material, $I$ alone is not enough, so we introduce the **current density** $\vec j$, characterising the direction and density of charge flow at every point of space. From the microscopic $\vec j=\sigma\vec E$ (the differential form of Ohm's law) we then pass to the macroscopic $U=IR$, gaining a language that runs from carriers to whole circuits. Finally, **Kirchhoff's laws** provide a systematic method for writing down the equations of any circuit network, and are the cornerstone of electrical analysis.

This chapter links microscopic transport with macroscopic networks: from "why a wire heats up" and "why series elements divide voltage" to "how to solve a complex circuit", all rest on the same ideas of conservation and energy.

## 2. Rigorous Definitions: Current Density, Resistance and Kirchhoff

**Current**: the charge crossing a section per unit time

$$I = \frac{dq}{dt}$$

The unit is the ampere, $\text{A}=\text{C/s}$.

**Current density**: the current per unit area perpendicular to the flow. For a volume current

$$\vec j = \rho\vec v_d$$

where $\rho$ is the volume charge density and $\vec v_d$ the mean drift velocity of the carriers; the current through a surface $S$ is $I = \iint_S \vec j\cdot d\vec S$.

**Ohm's law**:
- Macroscopic: $U = IR$;
- Differential (point form): $\vec j = \sigma\vec E$, where $\sigma=1/\rho$ is the conductivity.

**Resistance**:

$$R = \rho\frac{l}{S}$$

where $\rho$ is the resistivity (temperature coefficient $\rho=\rho_0[1+\alpha(T-T_0)]$).

**Electromotive force and sources**: A source converts other forms of energy into electrical energy and maintains a steady current. The electromotive force $\mathscr E$ equals the work done by non-electrostatic forces in carrying unit positive charge from the negative to the positive terminal. A source with internal resistance $r$ has terminal voltage $U = \mathscr E - Ir$.

**Electrical work and Joule heat**: power $P=UI=I^2R=U^2/R$; in a pure resistor electrical energy becomes heat (Joule's law).

**Kirchhoff's laws**:
- Current law (KCL, conservation at a node): $\sum I_{\text{in}} = \sum I_{\text{out}}$, i.e. the algebraic sum of currents into a node is zero;
- Voltage law (KVL, energy around a loop): $\sum U = 0$, i.e. the algebraic sum of voltage rises and drops around a closed loop is zero.

## 3. Why Understand It This Way

**Why does a current respond instantly when the drift velocity is so slow?** The field is established at nearly the speed of light and sets all free electrons drifting almost simultaneously; the "signal" travels fast while the electrons themselves move slowly. It is like a pressure wave travelling instantly along a water pipe while the water itself flows slowly.

**Why is $\vec j=\sigma\vec E$ a point form?** It describes the local relation at each point of space and does not depend on the overall geometry; integrating it gives the macroscopic $U=IR$, which is the bridge from microscopic to macroscopic.

**Why is resistance proportional to length and inversely proportional to cross-section?** A longer path accumulates more obstruction from electron collisions (proportional to $l$), while a thicker section provides more parallel channels (inversely proportional to $S$), matching the intuition of water flowing through pipes of different length and width.

**Why do sources have internal resistance?** There is resistance to charge transport inside the source too; as current flows it consumes part of the electromotive force, so the terminal voltage is less than $\mathscr E$ and falls as the output current grows.

**Why do Kirchhoff's laws hold?** KCL is charge conservation (charge does not pile up at a node); KVL is the single-valuedness of potential (going around a loop returns you to the same potential). Both are rooted in conservation and conservativeness.

## 4. Typical Calculations

**Example 1: Current density in a copper wire.** A copper wire of diameter $1\ \text{mm}$ carries $I=5\ \text{A}$; the cross-section is $S=\pi(0.5\times10^{-3})^2\approx7.85\times10^{-7}\ \text{m}^2$, so

$$j = I/S \approx 6.4\times10^6\ \text{A/m}^2$$

From $j=n e v_d$ ($n\approx8.5\times10^{28}\ \text{m}^{-3}$ being the free-electron number density of copper) the drift velocity is only about $v_d\sim 5\times10^{-4}\ \text{m/s}$.

**Example 2: Resistance versus temperature.** A tungsten filament has $\rho_0=5.6\times10^{-8}\ \Omega\cdot\text{m}$ at $20^\circ\text{C}$ with $\alpha\approx4.5\times10^{-3}/^\circ\text{C}$; heating to $2000^\circ\text{C}$ raises $\rho$ nearly tenfold, which is exactly why an incandescent lamp has a low cold resistance and a large inrush current at switch-on.

**Example 3: A voltage divider.** Two resistors $R_1,R_2$ in series across a voltage $U$ carry $I=U/(R_1+R_2)$, with voltages $U_1=IR_1$ and $U_2=IR_2$, so the divided voltages are proportional to the resistances.

**Example 4: A source under load.** A source with $\mathscr E=12\ \text{V}$ and $r=1\ \Omega$ drives $R=5\ \Omega$: $I=\mathscr E/(R+r)=2\ \text{A}$, terminal voltage $U=IR=10\ \text{V}$, and internal dissipation $I^2r=4\ \text{W}$.

## 5. Common Misconceptions

**Misconception 1: A current is electrons flying through the wire at the speed of light.** The drift is extremely slow; what propagates is the field or signal.

**Misconception 2: The current in a series circuit is "used up" along the way.** The current is the same everywhere in series (under steady conditions charge does not accumulate).

**Misconception 3: Ohm's law holds everywhere.** It applies to linear elements such as metals; in diodes and gas discharges, $U$ and $I$ are not proportional.

**Misconception 4: Electromotive force is a "force".** Its unit is the volt (energy per charge); it measures the work of non-electrostatic forces and is not a unit of force.

**Misconception 5: Ignoring the source's internal resistance.** Real sources have internal resistance, and at large currents the terminal voltage is markedly lower than the electromotive force.

## 6. Extensions and Synthesis

Microscopically, combining $\vec j = nq\vec v_d$ with $\vec v_d = \mu\vec E$ ($\mu$ being the mobility) directly yields $\vec j = nq\mu\vec E$, i.e. $\sigma=nq\mu$. This ties the macroscopic conductivity to carrier concentration and mobility, and is the starting point of semiconductor physics.

In complex networks, Kirchhoff's laws give $N$ equations for $N$ unknown currents or voltages; together with nodal and mesh methods they can be solved systematically. More generally, a steady current satisfies the continuity equation $\nabla\cdot\vec j=0$ (no charge accumulation), which together with the irrotational nature of the electrostatic field forms the field-theoretic basis of steady circuits.

## 7. Worked Examples and Pitfalls

**Example 5: Current density in a wire of non-uniform cross-section.** A conical conductor has different areas at its ends but the same steady current $I$ everywhere; since $I=jS$ is constant, $j$ is larger where $S$ is small, and by $\vec j=\sigma\vec E$ the field is stronger there too. This shows that "equal currents" does not mean "equal current densities"; analysing a non-uniform wire requires distinguishing $I$ from $j$.

**Example 6: Balance of a Wheatstone bridge.** Four arm resistors form a bridge; when the galvanometer branch carries no current, $\dfrac{R_1}{R_2}=\dfrac{R_3}{R_4}$, so an unknown can be found from three known values. It follows from KVL around two loops and KCL at a node—a classic application of Kirchhoff's laws and a standard method of resistance measurement.

**Example 7: The transient of charging a capacitor.** Although outside "steady" conditions, with a resistor $R$ and capacitor $C$ the current decays as $i(t)=\dfrac{\mathscr E}{R}e^{-t/(RC)}$ with time constant $\tau=RC$. It shows the current decaying from its initial value to zero (no current in the final steady state), an example of the junction between steady and dynamic behaviour.

**Example 8: Power matching.** A source supplies a load $R$; when $R=r$ (the internal resistance) the load receives maximum power $P_{\max}=\mathscr E^2/(4r)$. This follows from extremising $P=I^2R=\mathscr E^2 R/(R+r)^2$ with respect to $R$, and is an important conclusion for circuit design.

In this chapter on steady currents, the microscopic description uses $\vec j,\sigma$ for carrier transport, and the macroscopic one uses $R$, Ohm's law and Kirchhoff's laws to solve networks; take "conservation (KCL)" and "single-valuedness (KVL)" as guiding principles and even complex circuits can be untangled.

## 8. Concept Map and Typical Exam Questions

This chapter takes current density, Ohm's law, resistance, sources and Kirchhoff's laws as its main line. Typical exam questions fall into five types. The first is converting between current and current density ($I=\iint\vec j\cdot d\vec S$), distinguishing total current from density. The second is computing resistance and applying temperature corrections. The third is terminal voltage and power distribution in circuits containing sources (including internal resistance). The fourth is series/parallel combinations and voltage/current division. The fifth is solving complex networks with Kirchhoff's laws (nodal method, mesh method, bridges). Common lost marks: thinking electrons move at the speed of light, believing the current decreases along a series circuit, applying Ohm's law to non-linear elements, confusing electromotive force with voltage, and neglecting internal resistance. When solving, first draw the current directions and loop polarities, write KCL at nodes and KVL around independent loops, then solve the system; take "charge conservation → KCL, single-valued potential → KVL" as the underlying logic and no circuit problem will lead you astray.

## 9. Deepening the Physical Intuition: Drift, Collisions and the Microscopic Origin of Ohm's Law

To truly understand a steady current, the macroscopic $U=IR$ must be traced back to electron motion inside the metal. Free electrons in a metal are always in violent thermal motion, with a mean thermal speed of order $10^6\ \text{m/s}$ at room temperature, but in completely random directions—as many go one way as come back, so the net flux is zero. With an applied field each electron gains a small acceleration along $-\vec E$ between two collisions, so the whole electron gas acquires a slow directed drift superposed on the random motion, typically of order $10^{-4}\ \text{m/s}$. It is this negligible drift that constitutes the current we measure.

There is a very important separation of timescales here, which explains many puzzling phenomena. Flip a switch and the bulb lights almost instantly, yet an electron needs hours to drift from the switch to the bulb. There is no contradiction: **it is the field that is conducted, not the electrons**. The field is established along the wire at nearly the speed of light, instantly setting all electrons along the whole line into synchronous drift, so the bulb receives power at once; the migration of a particular electron, however, is snail-slow. This closely resembles a water pipe: apply pressure at one end and the pressure wave reaches the other instantly, the water throughout the pipe starting to move at once, yet a drop of water still takes a long time to travel from one end to the other.

So what is the microscopic mechanism of Ohm's law? The key is that **collisions between electrons and the lattice constitute friction**. Imagine an electron accelerated by $-e\vec E$ in a field $\vec E$ while repeatedly colliding with thermally vibrating ion cores and losing directed momentum. In the "relaxation-time approximation": suppose that on average the directed momentum is "wiped out" by collisions within a characteristic time $\tau$ (about $10^{-14}\ \text{s}$); then the drift velocity satisfies

$$m\frac{d\vec v_d}{dt} = -e\vec E - \frac{m\vec v_d}{\tau}$$

where the second term is the damping force due to collisions. In the steady state $d\vec v_d/dt=0$, hence

$$\vec v_d = -\frac{e\tau}{m}\vec E$$

Substituting into $\vec j = -ne\vec v_d$ ($n$ being the free-electron number density) gives

$$\vec j = \frac{ne^2\tau}{m}\vec E = \sigma\vec E,\qquad \sigma = \frac{ne^2\tau}{m}$$

This is the classic Drude argument deriving the differential form of Ohm's law from microscopic parameters. It immediately yields two testable corollaries: first, the conductivity is proportional to the carrier concentration $n$, which explains why metals (with huge $n$) are far better than semiconductors; second, a higher temperature intensifies lattice vibration and shortens the relaxation time $\tau$, so the resistivity of metals rises with temperature, whereas in semiconductors the surge of $n$ with temperature makes the resistance fall instead—two opposite temperature behaviours, both rooted in this one formula.

Finally, integrating $\vec j=\sigma\vec E$ once returns us to the macroscopic form. For a uniform wire of length $l$ and cross-section $S$, $\vec E$ is axial and constant in magnitude; from $U=\int \vec E\cdot d\vec l = El$ and $I=jS$,

$$U = El = \frac{j}{\sigma}l = \frac{I}{S}\cdot\frac{l}{\sigma} = I\cdot\frac{l}{\sigma S}\quad\Rightarrow\quad R = \frac{l}{\sigma S} = \rho\frac{l}{S}$$

Microscopic and macroscopic thus join perfectly, showing that $R=\rho l/S$ is not an empirical patchwork but the inevitable conclusion of the reasoning above.

## 10. Complete Derivations and Numerical Worked Examples

### Derivation 1: The rigorous relation between current density and current

Let the carrier number density be $n$, the charge of each carrier $q$, and the directed drift velocity $\vec v_d$. Take an area element $d\vec S$; the carriers that can cross it in time $dt$ must lie in an oblique cylinder with base $dS$ and slant $\vec v_d dt$, whose volume is $\vec v_d\cdot d\vec S\,dt$; hence the charge passing through is

$$dq = nq\,(\vec v_d\cdot d\vec S)\,dt\quad\Rightarrow\quad dI = nq\vec v_d\cdot d\vec S = \vec j\cdot d\vec S$$

that is, $\vec j = nq\vec v_d$, and the total current through any surface $S$ is $I = \iint_S \vec j\cdot d\vec S$. This relation shows two things at once: the current is a scalar (the total flow through a given surface) while the current density is a vector (the intensity and direction of flow at each point); the two are linked by a surface integral, and **the same $I$ corresponds to different $j$ in wires of different thickness**.

### Derivation 2: The continuity equation for steady conditions

Steady means the charge density at every point of space does not change with time. For any closed surface $S$, the current flowing out must equal the rate of decrease of the charge inside:

$$\oiint_S \vec j\cdot d\vec S = -\frac{d}{dt}\iiint_V \rho\,dV$$

Using the divergence theorem to convert to differential form gives the continuity equation

$$\nabla\cdot\vec j + \frac{\partial\rho}{\partial t} = 0$$

In the steady state $\partial\rho/\partial t=0$, so $\nabla\cdot\vec j = 0$: the $j$ lines are continuous, which is equivalent to "charge does not accumulate at a node", precisely the field-theoretic expression of **Kirchhoff's current law (KCL)**. Similarly, the steady electric field is still irrotational, $\nabla\times\vec E=0$, so going around a loop returns the potential to its original value—exactly the origin of **Kirchhoff's voltage law (KVL)**. Both circuit laws are thus not arbitrary rules but concrete incarnations of charge and energy conservation.

### Numerical example (1): Resistance, drift velocity and power of a copper wire

**Problem**: A copper wire of length $l=20\ \text{m}$ and cross-section $S=1.5\ \text{mm}^2$ carries a current $I=10\ \text{A}$. Given the resistivity of copper $\rho=1.7\times10^{-8}\ \Omega\cdot\text{m}$, free-electron density $n=8.5\times10^{28}\ \text{m}^{-3}$ and elementary charge $e=1.6\times10^{-19}\ \text{C}$, find: (1) the resistance, the voltage across it and the power dissipated; (2) the current density and the electron drift velocity; (3) the time for one electron to traverse the whole length.

**Solution**:

**(1) Resistance and power**

$$R = \rho\frac{l}{S} = (1.7\times10^{-8})\times\frac{20}{1.5\times10^{-6}} = \frac{3.4\times10^{-7}}{1.5\times10^{-6}} \approx 0.227\ \Omega$$

$$U = IR = 10\times0.227 \approx 2.27\ \text{V},\qquad P = I^2 R = 10^2\times0.227 \approx 22.7\ \text{W}$$

Cross-checking with $P=UI=2.27\times10=22.7\ \text{W}$ agrees.

**(2) Current density and drift velocity**

$$j = \frac{I}{S} = \frac{10}{1.5\times10^{-6}} \approx 6.67\times10^{6}\ \text{A/m}^2$$

$$v_d = \frac{j}{ne} = \frac{6.67\times10^{6}}{(8.5\times10^{28})\times(1.6\times10^{-19})} = \frac{6.67\times10^{6}}{1.36\times10^{10}} \approx 4.9\times10^{-4}\ \text{m/s} \approx 0.49\ \text{mm/s}$$

**(3) Time for the full journey**

$$t = \frac{l}{v_d} = \frac{20}{4.9\times10^{-4}} \approx 4.1\times10^{4}\ \text{s} \approx 11.3\ \text{h}$$

**Conclusion**: The drift velocity is less than half a millimetre per second, and traversing 20 metres takes eleven hours; yet flip the switch and the bulb lights at once. This huge contrast tells us clearly: what "travels fast" in a steady current is the energy-control signal provided by the field, and what "travels slowly" is the individual electron. The problem also reminds us that $\text{A/m}^2$ is the unit of $j$ and $\text{m/s}$ that of $v_d$; always convert to SI units before substituting.

### Numerical example (2): Maximum power transfer and the time constant

**Problem**: A source with $\mathscr E=24\ \text{V}$ and internal resistance $r=2.0\ \Omega$ supplies a variable load $R$. Find: (1) the load resistance giving maximum power and that maximum power; (2) if the load is $R=2.0\ \Omega$ in series with an inductance $L=0.20\ \text{H}$, the time needed for the current to reach $63\%$ of its steady value.

**Solution**:

**(1) Maximum power transfer**

$$P(R) = I^2 R = \left(\frac{\mathscr E}{R+r}\right)^2 R = \frac{\mathscr E^2 R}{(R+r)^2}$$

Differentiating with respect to $R$: $\dfrac{dP}{dR} = \mathscr E^2\dfrac{(R+r)^2-2R(R+r)}{(R+r)^4} = \mathscr E^2\dfrac{r-R}{(R+r)^3}$; setting it to zero gives

$$R = r = 2.0\ \Omega,\qquad P_{\max} = \frac{\mathscr E^2}{4r} = \frac{576}{8.0} = 72\ \text{W}$$

The efficiency is then only $50\%$ (the other half is dissipated in the internal resistance), revealing an unavoidable trade-off between power transfer and energy efficiency: communication systems pursue maximum power matching while power systems favour efficiency and require $R\gg r$.

**(2) The RL transient**

After an $RL$ series circuit is connected to a DC source, KVL gives $\mathscr E = IR + L\dfrac{dI}{dt}$, whose solution is

$$I(t) = \frac{\mathscr E}{R}\left(1-e^{-t/\tau}\right),\qquad \tau = \frac{L}{R}$$

The time constant is $\tau = 0.20/2.0 = 0.10\ \text{s}$. At $t=\tau$, $I(\tau)=\dfrac{\mathscr E}{R}(1-e^{-1})\approx 0.632\,\dfrac{\mathscr E}{R}$, i.e. $63.2\%$ of the steady value, so the required time is

$$t \approx 0.10\ \text{s}$$

The steady current is $\mathscr E/R = 12\ \text{A}$; the inductance then acts as a short circuit, and its stored magnetic energy is $\frac12 LI^2 = \frac12\times0.20\times144 = 14.4\ \text{J}$.

## 11. Pitfall Checklist and Solution Template

**Pitfall 1: Confusing the electron drift velocity with the propagation speed of the signal.** The former is about $10^{-4}\ \text{m/s}$, the latter close to the speed of light—more than ten orders of magnitude apart.

**Pitfall 2: Thinking the current in a series circuit gets smaller further along.** Under steady conditions charge does not accumulate in the wire, so the current is the same everywhere in series; what changes is the potential (voltage division). What is actually "used up" is potential energy and power, not current.

**Pitfall 3: Applying Ohm's law indiscriminately.** It applies only to linear elements. The $U$-$I$ curves of diodes, transistors, gas-discharge tubes and electrolytes are not straight lines through the origin and must be handled with their own characteristics or dynamic resistance.

**Pitfall 4: Treating electromotive force as a force.** Its unit is the volt, defined as the work done by non-electrostatic forces in carrying unit positive charge, with dimensions of energy per coulomb. It is also not the "terminal voltage"; the two differ by the internal drop $Ir$.

**Pitfall 5: Neglecting internal resistance in circuits with sources.** At large currents $Ir$ is significant and the terminal voltage is markedly below the electromotive force; under short circuit the terminal voltage is zero while the current reaches the dangerous value $\mathscr E/r$, a common cause of destroyed sources.

**Pitfall 6: Forgetting that "an open circuit does not mean zero resistance everywhere".** An ideal break has infinite resistance and zero current, yet a full source voltage can appear across the break; this is exactly why touching a single live wire while standing on an insulator can still be dangerous.

**Standard solution template (six steps)**: 1) mark the assumed current direction in each branch and the traversal direction of each loop (directions may be assumed arbitrarily; a negative result means the actual direction is opposite); 2) write KCL at independent nodes; 3) write KVL around independent loops, remembering that traversing a resistor with the current gives a negative term and traversing a source from negative to positive gives $+\mathscr E$; 4) substitute $U=IR$ to obtain a system of linear equations; 5) solve it and reverse the direction of any current that came out negative; 6) check with a power balance—the total power delivered by all sources should equal the total power dissipated in all resistors. Insist on this final power check and the accuracy of your circuit solutions will improve immediately.
`,
    keyPoints: [
      'Current $I = dq/dt$, current density $\\vec j = \\rho\\vec v$',
      'Differential form of Ohm\u2019s law $\\vec j = \\sigma\\vec E$',
      'Resistance $R = \\rho l/S$; the resistivity $\\rho$ depends on temperature',
      'Electromotive force maintains a steady current, and the internal resistance of a source cannot be neglected',
      'Kirchhoff\u2019s current law $\\sum I=0$ and voltage law $\\sum U=0$',
    ],
  },
  'magnetic-field': {
    chapter: 'Chapter 6 Steady Magnetic Field',
    title: 'Biot\u2013Savart Law and Amp\u00e8re\u2019s Loop',
    summary:
      'Moving charges and currents excite magnetic fields; the Biot\u2013Savart law integrates element contributions into the field, Amp\u00e8re\u2019s circuital theorem exploits symmetry to find it, and the Lorentz force and the Hall effect link the magnetic field to mechanics and electrical signals.',
    content: String.raw`

Oersted discovered that a current-carrying wire deflects a compass needle, linking "electricity" and "magnetism" for the first time. Biot, Savart, Ampère and others then gave a quantitative account: a current (moving charge) excites a new field around it—the magnetic field $\vec B$. Though invisible, the magnetic field can turn magnets, spin motors and bend particles into arcs in accelerators. Unlike the electrostatic field, the magnetic force acts on moving charges and is perpendicular to both the velocity and the field (fixed by the cross product), which leads to many counter-intuitive yet beautiful results.

There are two main routes to the field: the **Biot–Savart law**, which splits the current into elements each contributing $d\vec B$ like a "magnetic point source" and then integrates—universal but often requiring skill; and **Ampère's circuital theorem**, dual to Gauss's theorem in electrostatics, which gives the result in one step under high symmetry. Once the field is known, the **Lorentz force** tells us how moving charges are acted on, and the **Hall effect** converts the field into a measurable transverse voltage, becoming central to sensors and materials characterisation.

The deepest difference between the magnetic and electric fields: electric field lines have ends (they start on positive charge), whereas magnetic field lines close on themselves with no endpoints—there are no magnetic monopoles in nature (at least none confirmed). This "sourcelessness" determines the unique geometry and equation structure of the magnetic field.

## 2. Rigorous Definitions: Biot–Savart, Ampère's Loop and the Lorentz Force

**Magnetic flux density $\vec B$**: a vector describing the strength and direction of the magnetic field, with unit the tesla $\text{T}=\text{N}/(\text{A}\cdot\text{m})$.

**Biot–Savart law**: the field produced by a current element $I d\vec l$ at a point $\vec r$ away

$$d\vec B = \frac{\mu_0}{4\pi}\frac{I\,d\vec l\times\hat r}{r^2}$$

where $\mu_0 = 4\pi\times10^{-7}\ \text{T}\cdot\text{m/A}$ is the vacuum permeability. Integrating over a current distribution gives the total field.

**Typical result—infinite straight wire**: at radial distance $r$,

$$B = \frac{\mu_0 I}{2\pi r}$$

with the direction forming concentric circles around the wire (right-hand rule).

**At the centre of a circular current**:

$$B = \frac{\mu_0 I}{2R}$$

**Inside a solenoid (long, closely wound)**: approximately uniform,

$$B = \mu_0 n I$$

with $n$ the number of turns per unit length.

**Ampère's circuital theorem**:

$$\oint_L \vec B\cdot d\vec l = \mu_0 I_{\text{enc}}$$

where $I_{\text{enc}}$ is the net current through any surface bounded by the loop $L$. It shows that the magnetic field is a **rotational field** (its circulation can be non-zero); together with sourcelessness ($\nabla\cdot\vec B=0$) it characterises the field's topology.

**Lorentz force**: the force on a moving charge in an electromagnetic field,

$$\vec F = q(\vec E + \vec v\times\vec B)$$

In a purely magnetic field $\vec F = q\vec v\times\vec B$; the force is perpendicular to the velocity, does no work, and only changes the direction of motion.

**Charged particle in a uniform magnetic field**: it moves in a uniform circle; from $qvB = mv^2/R$ the gyroradius is

$$R = \frac{mv}{qB},\qquad \omega_c = \frac{qB}{m}\ (\text{cyclotron frequency})$$

**Hall effect**: current $I$ flows along $x$ in a conductor and the field $\vec B$ along $z$; carriers are deflected by the Lorentz force to the $y$ side and accumulate charge, establishing a transverse Hall voltage

$$U_H = \frac{IB}{n q d}$$

where $d$ is the sheet thickness and $n$ the carrier density. The sign of $U_H$ reveals the sign of the carriers.

## 3. Why Understand It This Way

**Why does the magnetic force use a cross product?** Experiment shows the magnetic force is perpendicular to both velocity and field; the cross product $q\vec v\times\vec B$ naturally supplies this perpendicularity and the right-hand-rule direction.

**Why does the magnetic force do no work?** The force is always perpendicular to the velocity, so the dot product with the velocity component along the displacement vanishes: $dW=\vec F\cdot d\vec r=0$. The magnetic field changes the direction of motion, not the kinetic energy.

**Why is Ampère's theorem useful only under symmetry?** For the same reason as Gauss's theorem: the theorem gives only one scalar equation for the circulation, and only when symmetry makes $\vec B$ constant in magnitude along the loop and everywhere tangential can the integral be pulled out as $B\times(\text{circumference})$.

**Why do magnetic field lines close?** Because $\nabla\cdot\vec B=0$ (no magnetic monopoles): magnetic field lines have no sources or sinks and must either close or extend to infinity. This contrasts with electric field lines, which start on positive and end on negative charge.

**Why can the Hall voltage identify the carriers?** The sign of $U_H$ depends on the sign of $q$: $q<0$ in metals (electrons) and $q>0$ for holes in semiconductors produce transverse voltages of opposite polarity, which distinguishes the conduction type.

## 4. Typical Calculations

**Example 1: Two parallel long straight wires.** With the currents in the same direction, the fields cancel on the bisecting plane; at a distance $a$ apart with parallel currents, the combined field at a point between them requires vector addition. Two parallel currents in the same direction attract each other (Ampère force $F/L=\mu_0 I_1I_2/(2\pi a)$), while opposite currents repel.

**Example 2: Field outside a toroidal solenoid.** By Ampère's theorem, inside a long solenoid $B=\mu_0 nI$ and outside it is approximately zero—the field is "locked" inside the tube, the design basis of electromagnets and MRI coils.

**Example 3: Deflection of an electron in a magnetic field.** For an electron with $v=10^6\ \text{m/s}$ in $B=0.01\ \text{T}$, the radius is $R=mv/(eB)\approx 5.7\times10^{-4}\ \text{m}$. This principle is used in mass spectrometers to separate ions of different charge-to-mass ratios.

**Example 4: A Hall sensor.** Given $I,d,n$, measuring $U_H$ gives $B=U_H n q d/I$, enabling non-contact field measurement, widely used for motor speed and position sensing.

## 5. Common Misconceptions

**Misconception 1: A magnetic field exerts a force on a stationary charge.** Wrong. When $\vec v=0$ the magnetic force vanishes; a stationary charge feels only the electric force.

**Misconception 2: The magnetic force does work and changes the speed.** The magnetic force is always perpendicular to the velocity, does no work, and only changes the direction.

**Misconception 3: Ampère's theorem applies only to symmetric cases.** The theorem holds universally; it is merely hard to solve directly for $\vec B$ without symmetry.

**Misconception 4: Magnetic field lines have start and end points.** Magnetic field lines close on themselves; there are no magnetic monopoles. Do not confuse them with electric field lines.

**Misconception 5: The Hall voltage depends only on $B$.** It also depends on $I$, $n$ and $d$; the formula is a product relation.

## 6. Extensions and Synthesis

The "rotational but sourceless" structure of the magnetic field is written into Maxwell's equations: $\nabla\times\vec B=\mu_0\vec j$ (steady) and $\nabla\cdot\vec B=0$. Ampère's circuital theorem is its integral form. Once the displacement current is introduced, it is upgraded to the full Ampère–Maxwell law, which predicts electromagnetic waves.

A current-carrying wire itself feels a magnetic force (the Ampère force $d\vec F=I d\vec l\times\vec B$), the basis of motors and loudspeakers. The interaction between two currents links "electricity makes magnetism, magnetism makes force" into a chain of energy conversion. Cyclotron motion, in turn, provides the basic orbits for plasma confinement (tokamaks) and particle accelerators.

## 7. Worked Examples and Pitfalls

**Example 5: Field at the centre of a semicircular current.** For a semicircular arc of radius $R$ carrying current $I$, at the centre the Biot–Savart law gives: each $Id\vec l$ is perpendicular to $\vec r$ toward the centre, $d\vec l\times\hat r$ has magnitude $dl$ and a common direction (perpendicular to the page), so integrating

$$B = \int \frac{\mu_0}{4\pi}\frac{I\,dl}{R^2} = \frac{\mu_0 I}{4\pi R^2}\cdot\pi R = \frac{\mu_0 I}{4R}$$

exactly half that of a full circle, with the direction fixed by the right-hand rule. Note that only the arc counts, not the diameter segment.

**Example 6: Field inside an infinite cylindrical conductor from Ampère's loop.** For radius $R$ and uniform current density $J$, take a coaxial circle: for $r>R$, $B=\mu_0 I/(2\pi r)$; for $r<R$ the enclosed current is $I(r)=J\pi r^2=I r^2/R^2$, so

$$B = \frac{\mu_0 I r}{2\pi R^2}$$

growing linearly with $r$ inside—analogous to, yet different from, the spherically symmetric electrostatic case (here it is circulation, not flux).

**Example 7: The principle of a mass spectrometer.** Ions are first accelerated through a voltage $U$ to $v=\sqrt{2qU/m}$, then enter the magnetic field and move in a circle of radius $R=mv/(qB)$; measuring $R$ determines the charge-to-mass ratio $q/m=2U/(B^2R^2)$. This is a synthesis of "magnetic field + mechanics" beyond the Biot–Savart law, and the basis of isotope separation.

**Example 8: Ampère force and motors.** A straight wire of length $L$ perpendicular to $\vec B$ in a uniform field feels the Ampère force $F=BIL$. If the wire can rotate about an axis, the torque turns it—the physical core of the DC motor; proper commutation maintains continuous rotation.

Calculations in the magnetic field chapter require flexible use of the two tools "Biot–Savart integration (universal)" and "Ampère's loop (symmetric)", plus the Lorentz force to connect the field with particle motion and the Hall voltage, to see the whole picture.

## 8. Concept Map and Typical Exam Questions

This chapter takes the Biot–Savart law, Ampère's circuital theorem, the Lorentz force and the Hall effect as its main line. Typical exam questions fall into five types. The first is finding the field of typical currents (straight wire, circular current, solenoid, semicircle) by the Biot–Savart law, minding vector integration and symmetry. The second is finding the field of symmetric distributions (long straight wire, cylindrical conductor, solenoid, toroid) by Ampère's theorem, determining the symmetry before choosing the loop. The third is the Lorentz force and circular or helical motion of charged particles, remembering $R=mv/(qB)$ and that the magnetic force does no work. The fourth is the Ampère force between currents (attraction or repulsion). The fifth is the Hall effect for measuring fields and identifying carriers. Common lost marks: thinking the magnetic force acts on stationary charges, believing the magnetic force does work, confusing the universality of Ampère's theorem with its solvability conditions, treating magnetic field lines like electric ones (with endpoints), and neglecting the dependence of the Hall voltage on $n$ and $d$. Advice: to find a field, first judge the symmetry, then choose Biot–Savart or Ampère; to find a force, always write the cross product and use the right-hand rule; memorise "the magnetic field is sourceless but rotational" against "the electric field is sourced but irrotational", and the system of this chapter becomes clear.

## 9. Deepening the Physical Intuition: Why the Magnetic Force Must Be a Cross Product

The place beginners most easily get stuck is: why is the force of a magnetic field on a moving charge the awkward cross product $q\vec v\times\vec B$ rather than the simple $q\vec E$ of the electric force? There are three layers of reasons, and going through them makes it feel natural.

The first layer is **experimental fact**. The magnetic force on a charge has three rigid features: it acts only on moving charges, its magnitude grows with speed, and its direction is perpendicular to both the velocity and the field (proof by contradiction is easy: if the force were along the field, a stationary charge would feel it; if it were along the velocity, the magnetic force would do work and change the speed). To satisfy all three at once, the only simple mathematical choice is the cross product $q\vec v\times\vec B$: its magnitude $qvB\sin\theta$ grows linearly with speed, and its direction is automatically perpendicular to the plane spanned by $\vec v$ and $\vec B$ by the right-hand rule.

The second layer is **energy**. Because $\vec F\perp\vec v$, the instantaneous power $P=\vec F\cdot\vec v\equiv 0$: the magnetic force never does work. This is no coincidence; the way the magnetic field acts on charges means it can only "steer", never "accelerate". Precisely for this reason magnetic fields are technically excellent deflectors (CRT deflection coils, mass-analysis magnetic mirrors, cloud-chamber track curvature) but cannot energise particles the way electric fields do. The reason a cyclotron must have an electric gap is precisely that the magnetic field alone cannot raise kinetic energy.

The third layer is deeper, coming from the **unified relativistic view**. A pure electric field in one frame generally appears as a combination of electric and magnetic fields in another. The Lorentz force $q(\vec E+\vec v\times\vec B)$ is exactly covariant, transforming self-consistently between inertial frames. The conclusion this line of thought finally reaches is that the electric and magnetic fields are not two unrelated fields but different projections of one electromagnetic field tensor in different reference frames.

Alongside this "transverse" picture, the topology of the magnetic field differs sharply from the electric one. Electric field lines have ends, starting on positive charge and ending on negative ($\nabla\cdot\vec E=\rho/\varepsilon_0\neq0$, called sourced); magnetic field lines close with no endpoints, because isolated magnetic monopoles do not exist in nature ($\nabla\cdot\vec B=0$, called sourceless). This "sourceless but rotational" structure determines the dual standing of Ampère's theorem relative to Gauss's theorem, and also determines the approach to magnetic fields—replace "flux" with "circulation".

## 10. Complete Derivations and Numerical Worked Examples

### Derivation 1: Field of a finite straight wire from the Biot–Savart law

This is the most useful general derivation of the chapter; many problems can use it directly. Let the wire lie along the $z$ axis carrying current $I$, and let the field point $P$ be at perpendicular distance $a$ from the wire. Take the origin at the foot of the perpendicular. For a current element $I\,dz$ located at $z$, the distance to $P$ is $r=\sqrt{a^2+z^2}$. By the Biot–Savart law,

$$dB = \frac{\mu_0}{4\pi}\frac{I\,dz\sin\theta}{r^2}$$

where $\theta$ is the angle between the direction of $dz$ and $\vec r$, and $\sin\theta = a/r$. Introduce the angle $\beta$ between the line from $P$ to the current element and the perpendicular, so that $z = a\tan\beta$, $dz = a\sec^2\beta\,d\beta$ and $r = a\sec\beta$; substituting,

$$dB = \frac{\mu_0 I}{4\pi}\frac{a}{r^3}dz = \frac{\mu_0 I}{4\pi}\frac{a\cdot a\sec^2\beta\,d\beta}{a^3\sec^3\beta} = \frac{\mu_0 I}{4\pi a}\cos\beta\,d\beta$$

Integrating ($\beta$ from $-\beta_1$ to $\beta_2$) gives the general half-angle formula

$$B = \frac{\mu_0 I}{4\pi a}\left(\sin\beta_1+\sin\beta_2\right)$$

When both ends extend to infinity, $\beta_1=\beta_2=\pi/2$, immediately recovering the infinite straight wire result

$$B = \frac{\mu_0 I}{4\pi a}(1+1) = \frac{\mu_0 I}{2\pi a}$$

The value of this derivation is that it shows quantitatively that "infinite" is only the limit in which the end angles tend to $90^\circ$; the field of a finite wire is always smaller than that of an infinite one, and the closer to the middle of the wire, the closer to the infinite result.

### Derivation 2: Field inside a closely wound solenoid from Ampère's theorem

Take a rectangular loop $abcd$ with one side (length $l$) inside the solenoid along the axis and the opposite side far outside. Suppose the internal field is axial with magnitude $B$ and the external field is approximately zero; then

$$\oint \vec B\cdot d\vec l = B\cdot l + 0\ (\text{outside}) + 0\ (\text{the two perpendicular sides}) = B l$$

The surface bounded by this rectangle is pierced by $nl$ turns of wire ($n$ being turns per unit length), so the net enclosed current is $I_{\text{enc}} = n l I$. By Ampère's theorem,

$$B l = \mu_0 n l I\quad\Rightarrow\quad B = \mu_0 n I$$

The result is uniform and position-independent—the ideal field on which electromagnets, MRI coils and inductors rely. Note that "the external field is zero" is an approximation valid for a long closely wound solenoid; a short, fat coil leaks noticeably at its ends.

### Numerical example (1): Magnetic flux density at the centre of a square current loop

**Problem**: A square loop of side $a=0.20\ \text{m}$ carries a current $I=5.0\ \text{A}$; find the magnetic flux density at its centre. Take $\mu_0=4\pi\times10^{-7}\ \text{T}\cdot\text{m/A}$.

**Solution**: The perpendicular distance from the centre to each side is $d=a/2=0.10\ \text{m}$. For any side, the angles subtended at the centre satisfy

$$\sin\beta_1 = \sin\beta_2 = \frac{a/2}{\sqrt{(a/2)^2+(a/2)^2}} = \frac{0.10}{0.1414} = 0.707$$

By the general formula derived above, one side contributes

$$B_1 = \frac{\mu_0 I}{4\pi d}(\sin\beta_1+\sin\beta_2) = \frac{4\pi\times10^{-7}\times5.0}{4\pi\times0.10}\times(2\times0.707) = (5.0\times10^{-6})\times1.414 \approx 7.07\times10^{-6}\ \text{T}$$

The fields of the four sides have the same direction at the centre (all determined by the right-hand rule, perpendicular to the page), so they add as scalars:

$$B = 4B_1 = 4\times7.07\times10^{-6} \approx 2.83\times10^{-5}\ \text{T}$$

The general formula $B = \dfrac{2\sqrt2\,\mu_0 I}{\pi a}$ can be memorised; substituting $a=0.20$ gives the same $2.83\times10^{-5}\ \text{T}$. Compare the circular current of radius $R$ at its centre, $B=\mu_0 I/(2R)$: taking $R=a/2=0.10\ \text{m}$ gives $3.14\times10^{-5}\ \text{T}$, slightly larger than the square. The reason is that at the same "scale" every part of the circle lies closer to the centre and contributes more concentratedly—exactly the direction worth considering when optimising coil shapes.

### Numerical example (2): Measuring the carriers in a copper sheet by the Hall effect

**Problem**: A rectangular copper sheet of thickness $d=0.10\ \text{mm}$ carries a current $I=5.0\ \text{A}$ and is placed perpendicular to a uniform field $B=0.80\ \text{T}$. The measured transverse Hall voltage is $U_H=2.9\ \mu\text{V}$. Given the free-electron density of copper $n=8.5\times10^{28}\ \text{m}^{-3}$ and $e=1.6\times10^{-19}\ \text{C}$, verify this measurement and explain how the polarity determines the carrier type.

**Solution**: The equilibrium condition of the Hall effect is that the transverse Lorentz force on the carriers balances the transverse electric force: $qvB = qE_H = q\dfrac{U_H}{b}$ ($b$ being the transverse width). The current is $I = n q v\,(bd)$ ($bd$ being the cross-sectional area); eliminating $v$ and $b$ gives

$$U_H = \frac{IB}{n q d} = \frac{5.0\times0.80}{(8.5\times10^{28})\times(1.6\times10^{-19})\times(1.0\times10^{-4})} = \frac{4.0}{1.36\times10^{6}} \approx 2.9\times10^{-6}\ \text{V} = 2.9\ \mu\text{V}$$

in agreement with the measurement. **Determining the carrier type**: let the current $\vec I$ be along $+x$ and the field $\vec B$ along $+z$. If the carriers are positive, their drift is along $+x$, $\vec v\times\vec B$ points along $-y$, positive charge accumulates on the $-y$ face, and that side is at higher potential. If the carriers are electrons ($q<0$), the drift is along $-x$, $\vec v\times\vec B$ points along $+y$, electrons accumulate on the $+y$ face, and that side is at lower potential instead. So merely measuring which side is at higher potential distinguishes a metal (electron conduction) from a P-type semiconductor (hole conduction). This also reminds us that $n$ appears in the denominator, so **metals have extremely small Hall voltages because of their very high carrier density**; practical Hall elements are all made of semiconductors.

## 11. Pitfall Checklist and Solution Template

**Pitfall 1: Thinking the magnetic field exerts a force on a stationary charge.** When $\vec v=0$ the magnetic force is strictly zero; a stationary charge feels only the electric force. This is the first threshold in distinguishing electric from magnetic effects.

**Pitfall 2: Thinking the magnetic force changes the speed or does work.** The magnetic force is always perpendicular to the velocity, so the instantaneous power vanishes identically; it changes direction only, not kinetic energy. A particle can never be "heated" by a purely magnetic field.

**Pitfall 3: Applying the right-hand rule to $-\vec v\times\vec B$.** The Lorentz force direction is that of $\vec v\times\vec B$, and for a negative charge it must be reversed once more. When the problem gives an electron, always set $q=-e$ before determining the direction.

**Pitfall 4: Confusing "universally valid" with "directly solvable" for Ampère's theorem.** The theorem always holds; the integral can be pulled out only when the field is constant and tangential along the loop, otherwise return to Biot–Savart integration.

**Pitfall 5: Forcing the infinite-wire formula onto a finite wire.** For finite length use the $(\sin\beta_1+\sin\beta_2)$ correction; substituting $\mu_0 I/(2\pi r)$ directly overestimates the result.

**Pitfall 6: Neglecting the vector nature of fields from several wires.** The fields of two parallel wires at a point must be combined as vectors; parallel currents attract and antiparallel currents repel, and the direction rules are often misremembered.

**Pitfall 7: Thinking the Hall voltage depends only on $B$.** $U_H=IB/(nqd)$ is a product relation, also involving $I$, $n$, $d$ and the sign of the carriers.

**Standard solution template (five steps)**: 1) judge the symmetry (sphere, cylinder, plane, or none) to decide between Biot–Savart and Ampère's loop; 2) take the element or loop, write the geometry clearly and express $|d\vec l\times\hat r|$ as $dl\sin\theta$; 3) resolve components, cancelling by symmetry wherever possible first; 4) integrate to obtain $B$, then check against a known limit (as $\beta\to 90^\circ$ the infinite case); 5) if forces are involved, write $\vec F=q\vec v\times\vec B$ or $d\vec F=I d\vec l\times\vec B$ and use the right-hand rule for direction. Master the chain "symmetry → choose method → integrate → limit check, finally force analysis", and this chapter yields marks steadily from finding fields to finding forces.
`,
    keyPoints: [
      'Biot\u2013Savart law $d\\vec B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{Id\\vec l\\times\\hat r}{r^2}$',
      'Amp\u00e8re\u2019s circuital theorem $\\oint \\vec B\\cdot d\\vec l = \\mu_0 I_{\\text{enc}}$',
      'Infinite straight wire $B = \\mu_0 I/(2\\pi r)$',
      'Lorentz force $\\vec F = q\\vec v\\times\\vec B$',
      'The Hall effect measures the carrier type and the field strength',
      'The magnetic field is sourceless and rotational ($\\nabla\\cdot\\vec B=0$)',
    ],
  },
  'induction': {
    chapter: 'Chapter 7 Electromagnetic Induction',
    title: 'Faraday\u2019s Law, Self-Inductance and Mutual Inductance',
    summary:
      'A changing magnetic flux excites an induced electromotive force; Faraday\u2019s law and Lenz\u2019s law give its magnitude and direction, while self-inductance, mutual inductance and magnetic field energy fit the electromagnetic field into a complete framework of energy and circuits.',
    content: String.raw`

Faraday spent ten years repeating experiments before finally confirming: merely bringing a magnet near a coil makes a current appear in it—provided the flux is changing. A static magnetic field produces no current; only a changing flux "induces" an electromotive force. This is another great unification in electromagnetism: the electric field can be excited by charge (Coulomb) and also by a changing magnetic field (Faraday). The latter is exactly the working principle of generators, transformers and induction furnaces, and a key link in Maxwell's prediction of electromagnetic waves.

The magnitude of the induced electromotive force is given by **Faraday's law** and its direction by **Lenz's law**—always opposing the change of flux, which is essentially energy conservation expressed in electromagnetism (if the induced current abetted the change, a perpetual motion machine would appear). Furthermore, when the changing flux comes from the coil's own changing current we get **self-inductance**; when it comes from a neighbouring coil we get **mutual inductance**. The magnetic field also carries energy, with density $B^2/(2\mu_0)$ symmetric to the electric energy density $\varepsilon_0E^2/2$; together they form the total energy of the electromagnetic field. This chapter closes the loop "changing magnetism → electricity → stored energy", the finale of classical electromagnetism.

## 2. Rigorous Definitions: Faraday's Law, Inductance and Magnetic Energy

**Magnetic flux**:

$$\Phi_B = \iint_S \vec B\cdot d\vec S$$

with unit the weber, $\text{Wb}=\text{T}\cdot\text{m}^2$.

**Faraday's law of electromagnetic induction**:

$$\mathscr E = -\frac{d\Phi_B}{dt}$$

The minus sign encodes the direction prescribed by Lenz's law.

**Lenz's law**: the induced current is always directed so that its own field opposes the change of flux that produced it. It can be remembered as "oppose the approach, hold on to the departure".

**Motional electromotive force** (a conductor cutting field lines): a conductor element $d\vec l$ moves with velocity $\vec v$, the non-electrostatic force is the Lorentz force, and the electromotive force is

$$\mathscr E = \int (\vec v\times\vec B)\cdot d\vec l$$

For example, a rod of length $L$ cutting a uniform field $B$ perpendicularly at speed $v$ gives $\mathscr E = BLv$.

**Induced electromotive force and the vortex electric field**: a time-varying magnetic field excites a vortex electric field $\vec E_{\text{ind}}$ satisfying

$$\oint \vec E_{\text{ind}}\cdot d\vec l = -\frac{d\Phi_B}{dt}$$

Even with no conductor present, such a non-conservative electric field exists in space.

**Self-inductance**: the electromotive force induced by a change of the coil's own current,

$$\mathscr E_L = -L\frac{dI}{dt}$$

where $L$ is the self-inductance (unit the henry, $\text{H}$); for a long straight solenoid $L=\mu_0 n^2 V$ ($V$ being the volume).

**Mutual inductance**: the current change in coil 1 induces in coil 2

$$\mathscr E_2 = -M\frac{dI_1}{dt}$$

where $M$ is the mutual inductance, with $M_{12}=M_{21}$.

**Magnetic field energy**:

$$w_m = \frac{B^2}{2\mu_0}\ (\text{vacuum}),\qquad W_m = \frac12 LI^2 = \frac12 \frac{\Phi}{I}I^2$$

Substituting $B=\mu_0 nI$ for a solenoid into the field-energy integral gives $W=\frac12 LI^2$, so the two descriptions agree.

## 3. Why Understand It This Way

**Why does Lenz's law need a minus sign?** It ensures the induced current does not "abet" and amplify the original change (which would create energy from nothing and violate conservation). The minus sign is energy conservation written directly into electromagnetic induction.

**Why does motional emf come from the Lorentz force?** A moving free electron in a magnetic field feels $q\vec v\times\vec B$; the component along the wire pushes charge and creates the electromotive force—exactly the microscopic mechanism of "magnetism making electricity".

**Why does self-inductance oppose changes of current?** Current increases → flux increases → the induced emf opposes the increase; current decreases → the induced emf opposes the decrease. Self-inductance is like "inertia", resisting sudden changes of current.

**Why can mutual inductance transfer energy?** The alternating current in one coil produces an alternating flux through the other, inducing an emf—the transformer principle; energy is relayed through the magnetic field in between.

**Why does the magnetic field have an energy density too?** Establishing a current requires work against the self-induced emf, and this work is stored in the magnetic field; when the source is removed the magnetic energy is released (as when an inductor sparks), symmetric to electric energy storage.

## 4. Typical Calculations

**Example 1: A rectangular coil entering and leaving a field.** A coil of width $L$ enters a uniform field region of width $l$ perpendicularly at speed $v$; during entry the flux changes at $d\Phi/dt = BLv$, so the induced emf is $\mathscr E=BLv$ with direction given by Lenz's law (opposing entry, hence a retarding force). Once fully inside, the flux is constant and $\mathscr E=0$.

**Example 2: The Faraday disk generator.** A metal disk of radius $R$ rotates at $\omega$ about its axis in a field $B$ perpendicular to the disk; the radial motional emf is

$$\mathscr E = \int_0^R (\omega r B)\,dr = \frac12 B\omega R^2$$

This is the earliest prototype of a generator outside chemistry.

**Example 3: Current growth with self-inductance.** An $RL$ circuit connected to a source $\mathscr E$ has $I(t)=\dfrac{\mathscr E}{R}(1-e^{-t/\tau})$ with time constant $\tau=L/R$, showing how self-inductance delays the build-up of current.

**Example 4: A mutual-inductance transformer.** With primary voltage $U_1$ and $N_1$ turns, secondary $N_2$ turns, an ideal transformer has $\dfrac{U_1}{U_2}=\dfrac{N_1}{N_2}$ and $\dfrac{I_1}{I_2}=\dfrac{N_2}{N_1}$, stepping voltage up while stepping current down, or vice versa.

## 5. Common Misconceptions

**Misconception 1: A large flux means strong induction.** The key is the **rate of change** of flux $d\Phi/dt$; a large steady flux with no change induces nothing.

**Misconception 2: Lenz's law only gives the magnitude.** It gives the direction; the magnitude comes from the absolute value of Faraday's law, whose minus sign already carries the direction.

**Misconception 3: Motional and induced emf are two different phenomena.** Both are manifestations of Faraday's law; only the source of the non-electrostatic force differs (Lorentz force vs vortex electric field).

**Misconception 4: The self-induced emf always opposes the original current.** It opposes only while the current is increasing; when the current decreases it is in the same direction, opposing the decrease.

**Misconception 5: Magnetic energy exists only while current flows.** After switching off, the current disappears but the magnetic energy can be converted into other forms (such as a spark); energy is conserved, not destroyed.

## 6. Extensions and Synthesis

Faraday's law and the vortex electric field break the limitation "the electrostatic field is irrotational": a changing magnetic field excites a rotational electric field, so that $\oint\vec E\cdot d\vec l\neq0$. Maxwell wrote this term, together with the displacement current, into his equations, obtained the wave equation, and predicted that light is an electromagnetic wave—completing the unification of electricity, magnetism and light.

Transformers, induction heating, magnetic levitation and electromagnetic braking all rely on mutual inductance and eddy currents. Self-inductance is used for filtering, energy storage (inductors) and spark protection. Magnetic and electric field energies together make up the energy of the electromagnetic field, which propagates at speed $c$ in electromagnetic waves, carrying energy to distant places—the physical foundation of wireless communication.

## 7. Worked Examples and Pitfalls

**Example 5: Self-inductance of a long solenoid.** With turn density $n$, volume $V$ and current $I$, the internal field is $B=\mu_0 nI$ and the total flux linkage is $\Psi=N\Phi = n l\cdot (\mu_0 nI\cdot S)=\mu_0 n^2 V I$, hence

$$L = \frac{\Psi}{I} = \mu_0 n^2 V$$

The stored energy $W=\frac12 LI^2=\frac{B^2}{2\mu_0}V$ agrees exactly with the field-energy integral, verifying the equivalence of "circuit quantities" and "field quantities".

**Example 6: Mutual inductance of two coaxial coils.** The current $I_1$ in coil 1 produces a flux $\Phi_{21}\propto I_1$ through coil 2, with mutual inductance $M=\Phi_{21}/I_1$. If the coils are tightly coupled (as on a transformer core), $M\approx\sqrt{L_1L_2}$; leakage makes the actual $M$ smaller. The orientation (terminal polarity) must be determined by Lenz's law; a wrong connection subtracts rather than adds.

**Example 7: Eddy currents and braking in a conducting plate.** When a metal plate moves through a magnetic field, induced eddy currents flow inside; their field opposes the relative motion and produces damping (electromagnetic braking), used in meter damping and high-speed train brakes. Mechanical energy becomes Joule heat, again showing that Lenz's law is energy conservation.

**Example 8: RLC discharge and electromagnetic oscillation.** A capacitor and inductor form an LC circuit in which electric and magnetic energies interchange and the current and voltage oscillate harmonically at $\omega=1/\sqrt{LC}$. This is a macroscopic "electromagnetic pendulum" and the basis of radio tuning and resonant circuits, joining the magnetic energy of Chapter 7 perfectly with the electric field energy of Chapters 1 to 6.

This chapter, from "changing magnetism making electricity" through "self- and mutual inductance" to "magnetic energy storage", completes the last piece of the electromagnetic field as a unified entity; understand it and you understand the common root of generators, transformers and electromagnetic waves.

## 8. Concept Map and Typical Exam Questions

This chapter takes Faraday's law, Lenz's law, motional and induced emf, self- and mutual inductance and magnetic energy as its main line. Typical exam questions fall into six types. The first is finding the induced emf with Faraday's law, noting that it is the rate of change of flux, not the flux itself. The second is determining direction with Lenz's law ("oppose approach, hold departure"). The third is motional emf (cutting field lines, using $\int(\vec v\times\vec B)\cdot d\vec l$). The fourth is induced emf and the vortex electric field. The fifth is self-inductance, mutual inductance, RL transients and transformers. The sixth is magnetic energy and LC oscillation. Common lost marks: thinking a large flux means strong induction, treating Lenz's law as a magnitude formula, confusing motional with induced mechanisms, believing the self-induced emf always reverses, and neglecting the terminal polarity of mutual inductance. Advice: first compute $|d\Phi/dt|$ for the magnitude, then use Lenz's law for the direction; for cutting problems prefer the motional formula; for energy problems use the equivalence of $\frac12LI^2$ and $\frac{B^2}{2\mu_0}$. Take "changing magnetism makes electricity, Lenz is conservation" as the soul, and both this chapter and the whole of electromagnetism become clear.

## 9. Deepening the Physical Intuition: Three Routes to a Changing Flux

Faraday's law $\mathscr E=-d\Phi_B/dt$ has only one variable, $\Phi_B$, but there are three ways for $\Phi_B = \iint_S \vec B\cdot d\vec S = BS\cos\theta$ to change, corresponding to three physical cases; distinguishing them greatly reduces mistakes in determining direction.

**Route 1: changing area (motional)**. The field is constant while the loop's area (or its effective projection perpendicular to the field) changes with time. Typical cases: a conducting rod sliding on rails, a coil pulled into or out of a field region. The non-electrostatic force here is the **Lorentz force**: the component of $q(\vec v\times\vec B)$ along the wire pushes charge and creates the motional emf. This class can use $\mathscr E=BLv$ directly, or its integral form.

**Route 2: changing field (induced)**. The loop is at rest and does not move, but the field itself varies with time. The non-electrostatic force here is the **vortex electric field** $\vec E_{\text{ind}}$: a changing magnetic field excites closed electric field lines in space, and even where there is nothing at all—not even a wire—this field objectively exists. This is the deepest divide from the electrostatic field—electrostatic field lines do not close ($\oint\vec E\cdot d\vec l=0$), whereas vortex electric field lines close into loops ($\oint\vec E\cdot d\vec l=-d\Phi_B/dt\neq0$), so no global scalar potential exists. A transformer is a purely induced case.

**Route 3: changing angle (generator)**. Neither $B$ nor $S$ changes, but the loop rotates about an axis so that $\cos\theta$ varies with time. For uniform rotation at angular velocity $\omega$, $\Phi_B = BS\cos(\omega t)$, hence

$$\mathscr E = -\frac{d}{dt}\big[BS\cos(\omega t)\big] = BS\omega\sin(\omega t)$$

This is the basic principle of the AC generator: the emf varies sinusoidally. Real generators use $N$ turns, giving $\mathscr E = NBS\omega\sin(\omega t)$.

The three routes look different yet are unified under the same $-d\Phi_B/dt$. This "all changes into one" is the power of Faraday's law: **whatever the reason for the flux through a loop changing, the magnitude of the induced emf depends only on the instantaneous rate of change of the flux**. For this reason, when solving problems you need not worry about which class it belongs to; just follow "how does the flux change".

The physical essence of Lenz's law deserves emphasis. Imagine the induced current did not oppose the change but abetted it: then the slightest disturbance would make the flux change amplify itself, and both current and energy would grow out of nothing, constituting a perpetual motion machine. The minus sign of Lenz's law shuts this absurd path. It is therefore not an isolated rule about direction but **the concrete expression of energy conservation in electromagnetic induction**.

## 10. Complete Derivations and Numerical Worked Examples

### Derivation 1: The general integral form of motional emf

Consider a wire of arbitrary shape crossing a magnetic field region. Take an element $d\vec l$ of the segment inside the field, moving with velocity $\vec v$ in the field $\vec B$. Each free charge (charge $q$) in the element feels the Lorentz force $\vec F = q\vec v\times\vec B$, whose component along the wire can do work and acts as the non-electrostatic force. The non-electrostatic force per unit charge, i.e. the "non-electrostatic field", is $\vec E_k = \vec v\times\vec B$, so the motional emf of the whole segment is

$$\mathscr E = \int_a^b (\vec v\times\vec B)\cdot d\vec l$$

Special case: a straight rod of length $L$ in a uniform field, moving at speed $v$ perpendicular both to itself and to the field, has $\vec v\times\vec B$ along the rod with magnitude $vB$, hence

$$\mathscr E = \int_0^L vB\,dl = BLv$$

**Direction and loop power check**: the induced current is $I=\mathscr E/R$, and the current-carrying rod feels the Ampère force $\vec F_B = I\vec L\times\vec B$, whose direction is exactly opposite to the motion (the manifestation of Lenz's law), with magnitude $F_B=BIL$. To maintain uniform motion the external force must satisfy $F_{\text{ext}} = BIL$, whose power is

$$P_{\text{ext}} = F_{\text{ext}}v = BILv = I(BLv) = I\mathscr E = I^2 R$$

so all the work done by the external force becomes Joule heat in the loop, exactly. This power equality is the golden standard for checking results in such problems.

### Derivation 2: Self-inductance and magnetic energy of a long solenoid

Let a long straight solenoid have length $l$, cross-section $S$ and $n$ turns per unit length, carrying current $I$. From the results of Chapter 6 the internal field is approximately uniform: $B=\mu_0 nI$. Each turn links flux $\Phi = BS = \mu_0 nIS$, and with $N=nl$ turns the flux linkage is

$$\Psi = N\Phi = (nl)(\mu_0 nIS) = \mu_0 n^2 (Sl) I = \mu_0 n^2 V I$$

The self-inductance is defined as $L = \Psi/I$, so

$$L = \mu_0 n^2 V$$

Check with the magnetic energy density: from $w_m = \dfrac{B^2}{2\mu_0} = \dfrac{\mu_0^2 n^2 I^2}{2\mu_0} = \dfrac12 \mu_0 n^2 I^2$, integrating over the internal volume $V$ gives

$$W_m = w_m V = \frac12 \mu_0 n^2 V I^2 = \frac12 L I^2$$

in complete agreement with the circuit expression $\frac12 LI^2$. This two-way corroboration of "circuit quantities" and "field quantities" is one of the strongest checks in electromagnetism.

### Numerical example (1): Emf and power of a rod cutting field lines

**Problem**: Two horizontal parallel rails are separated by $L=0.40\ \text{m}$ and carry a metal rod that slides frictionlessly with good contact; the total loop resistance is $R=2.5\ \Omega$. A uniform field $B=0.50\ \text{T}$ points out of the page. An external force moves the rod to the right at constant $v=2.5\ \text{m/s}$. Find: (1) the induced emf, and the magnitude and direction of the loop current; (2) the external force needed for uniform motion and its power; (3) the Joule heat produced in $4.0\ \text{s}$.

**Solution**:

**(1) Emf and current**

The rate at which the rod sweeps across the field can be computed from the rate of change of flux: $\Delta S = L\,v\,\Delta t$, so $\dfrac{d\Phi}{dt} = B\dfrac{dS}{dt} = BLv$, i.e.

$$\mathscr E = BLv = 0.50\times0.40\times2.5 = 0.50\ \text{V}$$

$$I = \frac{\mathscr E}{R} = \frac{0.50}{2.5} = 0.20\ \text{A}$$

Direction: moving the rod to the right increases the loop area and the outward flux; by Lenz's law the induced current's field must point **inward** to oppose the increase, so the current flows clockwise (seen from above), i.e. downward through the rod.

**(2) External force and power**

The rod feels the Ampère force of magnitude

$$F_B = BIL = 0.50\times0.20\times0.40 = 0.040\ \text{N}$$

By the left-hand rule (or Lenz's law) this force opposes the motion, so an external horizontal force $F_{\text{ext}}=0.040\ \text{N}$ to the right is needed to keep the motion uniform. Its power is

$$P_{\text{ext}} = F_{\text{ext}}v = 0.040\times2.5 = 0.10\ \text{W}$$

Checking with the Joule power: $P_R = I^2 R = (0.20)^2\times2.5 = 0.10\ \text{W}$; also $P=\mathscr E^2/R = 0.25/2.5 = 0.10\ \text{W}$. All three agree: **energy is conserved**.

**(3) Joule heat**

$$Q = P_R\,t = 0.10\times4.0 = 0.40\ \text{J}$$

**Conclusion**: The mechanical energy does not disappear; through electromagnetic induction it is transferred completely into the circuit and becomes heat. The equality "external power = Joule heating power" is the checkpoint for all cutting-type problems.

### Numerical example (2): Inductive energy storage and the RL transient

**Problem**: A coil of self-inductance $L=0.20\ \text{H}$ and negligible resistance is connected in series with $R_1=8.0\ \Omega$ and a DC source $\mathscr E=24\ \text{V}$. Find: (1) the steady current and the magnetic energy stored in the coil; (2) the time constant and how long after switch-on the current reaches $90\%$ of its steady value; (3) if at steady state the source is suddenly removed and replaced by a short circuit in its place, the initial magnitude of the self-induced emf across the coil.

**Solution**:

**(1) Steady state and stored energy**

At steady state the current is constant, $dI/dt=0$, and the inductance acts as a short circuit, so

$$I_{\infty} = \frac{\mathscr E}{R_1} = \frac{24}{8.0} = 3.0\ \text{A},\qquad W_m = \frac12 L I_{\infty}^2 = \frac12\times0.20\times9.0 = 0.90\ \text{J}$$

**(2) Time constant**

At the instant of connection KVL gives $\mathscr E = IR_1 + L\dfrac{dI}{dt}$, with solution $I(t) = \dfrac{\mathscr E}{R_1}\left(1-e^{-t/\tau}\right)$, where

$$\tau = \frac{L}{R_1} = \frac{0.20}{8.0} = 2.5\times10^{-2}\ \text{s} = 25\ \text{ms}$$

Setting $I(t)/I_{\infty} = 1-e^{-t/\tau} = 0.90$, i.e. $e^{-t/\tau}=0.10$, gives

$$t = \tau\ln 10 = 2.5\times10^{-2}\times2.303 \approx 5.8\times10^{-2}\ \text{s} \approx 58\ \text{ms}$$

**(3) Self-induced emf after removing the source**

At the instant the source is removed and shorted, the current cannot jump and remains $3.0\ \text{A}$, then decays in the closed loop formed by $R_1$ as $i(t)=3.0\,e^{-t/\tau}$; the initial rate of change is

$$\left|\frac{dI}{dt}\right|_{t=0} = \frac{I_{\infty}}{\tau} = \frac{3.0}{2.5\times10^{-2}} = 1.2\times10^{2}\ \text{A/s}$$

so the initial self-induced emf is

$$\mathscr E_L = L\left|\frac{dI}{dt}\right| = 0.20\times1.2\times10^{2} = 24\ \text{V}$$

exactly equal to $I_{\infty}R_1$. This shows that an inductor does not conjure up a higher voltage; it merely uses its magnetic energy to "hold" the current flowing until that energy is exhausted—precisely the physical reality that ignition coils and relay freewheeling diodes must handle.

## 11. Pitfall Checklist and Solution Template

**Pitfall 1: Treating a large flux as strong induction.** What determines induction is the **rate of change** of flux. For a stationary coil in a uniform field the induced emf is zero however large the flux.

**Pitfall 2: Treating Lenz's law as a magnitude formula.** It gives direction only; the magnitude is always given by $|d\Phi_B/dt|$. Do not confuse the two roles.

**Pitfall 3: Judging the direction of $\vec v\times\vec B$ by magnitude alone.** There is no ready-made scalar conclusion; use the right-hand rule to fix the direction of $\vec v\times\vec B$, then decide which end of the wire is positive. Never rely on impressions.

**Pitfall 4: Ignoring the sign convention of the loop.** Before writing equations you must fix the positive traversal direction of the loop and the matching surface normal (right-hand screw relation); otherwise the minus sign means nothing.

**Pitfall 5: Thinking the self-induced emf always opposes the original current.** It opposes only when the current is **increasing**; when the current decreases the self-induced emf is **in the same direction**, trying to keep the current from decreasing. Remember that self-inductance is "the inertia of current".

**Pitfall 6: Treating a transformer as an emf generator.** A transformer transfers power and creates almost no energy: $U_1I_1\approx U_2I_2$. Stepping the voltage up necessarily steps the current down, and the input power is set by the load.

**Pitfall 7: Ignoring the terminal polarity of mutual inductance.** Two coils in series give a total inductance that may be $L_1+L_2+2M$ (series aiding) or $L_1+L_2-2M$ (series opposing), depending on whether the fluxes they excite point the same way (terminal polarity).

**Standard solution template (five steps)**: 1) first identify whether the object is a single loop or a set of coils, and fix the positive traversal direction; 2) write the flux through the loop $\Phi_B(t)$, noting which of $B$, effective area and angle is the time-dependent one; 3) differentiate to get $\mathscr E=|d\Phi_B/dt|$, multiplying by the number of turns $N$ for a coil; 4) determine the direction by Lenz's law (mnemonic: "increase opposes, decrease follows; oppose approach, hold departure"); 5) check with an energy audit—whether the mechanical power equals the sum of $I^2R$, or whether the input power equals the output power. Insist on this fifth step and the accuracy of your electromagnetic induction solutions improves qualitatively.
`,
    keyPoints: [
      'Faraday\u2019s law $\\mathscr E = -\\dfrac{d\\Phi_B}{dt}$',
      'Lenz\u2019s law: the induced current opposes the change of flux',
      'Motional emf $\\mathscr E = \\int(\\vec v\\times\\vec B)\\cdot d\\vec l$',
      'Self-inductance $\\mathscr E_L = -L\\dfrac{dI}{dt}$, mutual inductance $\\mathscr E_2 = -M\\dfrac{dI_1}{dt}$',
      'Magnetic energy density $w_m = \\dfrac{B^2}{2\\mu_0}$; energy stored in a coil $W=\\tfrac12 LI^2$',
    ],
  },
};

export default map;
