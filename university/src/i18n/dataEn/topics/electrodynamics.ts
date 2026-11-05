import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'maxwell-unified': {
    chapter: "Chapter 1 Maxwell's Equations",
    title: 'The Unification of Electromagnetic Laws',
    summary:
      "Maxwell completed Ampère's circuital theorem with the displacement current, combining the laws of electrostatics, magnetostatics, and induction into one self-consistent set of field equations, and from them revealed the energy and energy-flow picture of the electromagnetic field.",
    keyPoints: [
      String.raw`The displacement current $\vec j_D = \partial\vec D/\partial t$ makes the continuity of current compatible with Ampère's circuital theorem, and is the source through which a changing electric field excites a magnetic field`,
      String.raw`Differential form of Maxwell's equations: $\nabla\cdot\vec D=\rho_f$, $\nabla\cdot\vec B=0$, $\nabla\times\vec E=-\partial\vec B/\partial t$, $\nabla\times\vec H=\vec j_f+\partial\vec D/\partial t$`,
      String.raw`The boundary relations follow from the integral forms: the tangential electric field and the normal magnetic induction are continuous, while the jumps of the normal and tangential components are governed by free charge and conduction surface current respectively`,
      String.raw`Electromagnetic energy density $w=\dfrac{1}{2}(\vec E\cdot\vec D+\vec B\cdot\vec H)$, energy flux density (Poynting vector) $\vec S=\vec E\times\vec H$`,
      String.raw`Poynting's theorem $\dfrac{\partial w}{\partial t}+\nabla\cdot\vec S=-\vec j\cdot\vec E$ shows that the energy in a circuit is transported through the space occupied by the field`,
    ],
    content: String.raw`

In the first half of the nineteenth century the principal laws of electromagnetism had been discovered independently one after another: Coulomb's law and Gauss's theorem describe how charges give rise to electric fields; the Biot–Savart law and Ampère's circuital theorem describe how currents give rise to magnetic fields; Faraday's law of electromagnetic induction reveals that a changing magnetic field excites a vortex electric field. Each of these laws had passed the severe test of experiment, yet they remained isolated from one another, like several locally correct maps that cannot be pieced together into a complete picture of the world. Maxwell's genius lay in this: he not only stitched these maps together, he also noticed that the puzzle was missing a crucial corner, and so supplied that corner himself—the displacement current. With the corner filled in, the whole of electromagnetism became transparent at once: electricity and magnetism are no longer two independent phenomena but two faces of one and the same field—the electromagnetic field—under different conditions; the solutions of the equations predict that electromagnetic disturbances propagate at a finite speed, and that speed is exactly the speed of light, whereby light is confirmed to be an electromagnetic wave. This was the first great unification in the history of physics, which Einstein called "the most profound and the most fruitful change that physics has experienced since Newton."

The main thread of this chapter is "from static to dynamic, from isolated to unified". We shall first write Maxwell's equations in integral and differential form and analyse the logical necessity of introducing the displacement current; then derive from the integral forms the boundary relations of the field at an interface between media—the starting point for solving every problem involving interfaces; and finally establish the energy picture of the electromagnetic field: energy density, energy flux density (the Poynting vector), and the field-theoretic statement of energy conservation. Once this framework is mastered, the electromagnetic waves, radiation, and relativistic covariance of the following chapters have a solid foundation.

## 2. Integral and Differential Forms of Maxwell's Equations

In a macroscopic medium, the integral form of Maxwell's equations is:

$$\oint_S \vec D\cdot d\vec S = \int_V \rho_f\,dV,\qquad \oint_L \vec E\cdot d\vec l = -\frac{d}{dt}\int_S \vec B\cdot d\vec S$$

$$\oint_S \vec B\cdot d\vec S = 0,\qquad \oint_L \vec H\cdot d\vec l = \int_S\left(\vec j_f + \frac{\partial\vec D}{\partial t}\right)\cdot d\vec S$$

Each of the four equations has a clear physical picture. The first is Gauss's theorem for the electric field: the flux of the electric displacement through a closed surface equals the free charge enclosed, showing that the electric field has sources—positive charge is the head of $\vec D$ lines and negative charge their tail. The second is the law of electromagnetic induction: the rate of change of magnetic flux drives a vortex electric field, and the minus sign is Lenz's law, indicating that the induced field opposes the change of flux. The third is Gauss's theorem for the magnetic field: $\vec B$ lines always close, and magnetic monopoles do not exist. The fourth is Ampère's circuital theorem for the total current: conduction current and displacement current together excite the magnetic field, which is a rotational field.

Using the divergence theorem and Stokes' theorem of mathematics, shrink the closed surface and closed loop of the integral forms to a point, and the differential forms follow:

$$\nabla\cdot\vec D = \rho_f,\qquad \nabla\cdot\vec B = 0$$

$$\nabla\times\vec E = -\frac{\partial\vec B}{\partial t},\qquad \nabla\times\vec H = \vec j_f + \frac{\partial\vec D}{\partial t}$$

The differential forms are "point-by-point" field equations and are the direct starting point for solving concrete problems. The set contains four field quantities and must be closed by the constitutive relations of the medium:

$$\vec D = \varepsilon\vec E,\qquad \vec B = \mu\vec H,\qquad \vec j_f = \sigma\vec E$$

In a linear, homogeneous, isotropic medium these three relations reduce the number of unknowns to match the number of equations, and only then does the system become a solvable, closed one.

## 3. Displacement Current: A Logically Necessary Stroke

The displacement current was not introduced as an arbitrary hypothesis but was forced by the self-consistency of the theory. Consider the original form of Ampère's circuital theorem $\nabla\times\vec H = \vec j_f$ and take the divergence of both sides. The divergence of the curl of any vector field vanishes identically, so we obtain $\nabla\cdot\vec j_f = 0$—precisely the continuity equation of a steady current, showing that the original theorem holds only in the steady case. But in the non-steady case (for instance a capacitor being charged), charge accumulates on the plates, and charge conservation demands

$$\nabla\cdot\vec j_f + \frac{\partial\rho_f}{\partial t} = 0$$

that is, the divergence of the conduction current is in general nonzero. The two requirements clash head-on: Ampère's circuital theorem and the law of charge conservation cannot both hold. Maxwell noticed that substituting Gauss's theorem for $\vec D$ into the continuity equation gives

$$\nabla\cdot\vec j_f + \frac{\partial}{\partial t}(\nabla\cdot\vec D) = \nabla\cdot\left(\vec j_f + \frac{\partial\vec D}{\partial t}\right) = 0$$

He therefore asserted that the magnetic field should be excited by the "total current" $\vec j_f + \partial\vec D/\partial t$, and that Ampère's circuital theorem must be modified to $\nabla\times\vec H = \vec j_f + \partial\vec D/\partial t$. Here $\vec j_D = \partial\vec D/\partial t$ is called the displacement current density.

The physical meaning of the displacement current is profound: a changing electric field, like a conduction current, is a vortex source of the magnetic field. The most typical example is the charging capacitor—there is no conduction current between the plates, but the changing charge on the plates makes the field between them vary in time; the displacement current joins up the "broken" circuit and ensures that the total current is continuous everywhere, so that the field circling the leads can pass smoothly into the field circling the capacitor. It should be stressed that the displacement current exists in vacuum as well (where only the term $\varepsilon_0\partial\vec E/\partial t$ remains); it is not a real flow of charge, it produces no Joule heat, and in essence it reflects a wholly new physical mechanism: "a changing electric field excites a magnetic field". It is precisely this term that echoes Faraday's law of induction, "a changing magnetic field excites an electric field", forming the two links by which the electromagnetic field sustains itself in vacuum and propagates outward—the existence of electromagnetic waves thus becomes a direct corollary of Maxwell's equations.

In Maxwell's time there was no direct experimental evidence for the displacement current; it was "squeezed out" of theoretical self-consistency, which makes it one of the most successful theoretical predictions in the history of physics. Hertz's experiments of 1887 both confirmed the existence of electromagnetic waves and indirectly established the status of the displacement current; today, from the resonance of a radio antenna to the driving of water molecules by the 2.45 GHz field in a microwave oven, the design of every time-dependent electromagnetic device takes the continuity of the total current as a basic checkpoint. It should also be noted that the introduction of the displacement current makes Maxwell's equations a mathematically self-consistent hyperbolic wave system—and it is precisely this mathematical structure that determines that electromagnetic disturbances propagate at a finite speed, so that the notion of "action at a distance" is swept away for good.

Seen jointly with charge conservation, "the total current is continuous everywhere" is an intrinsic requirement of Maxwell's equations: taking the divergence of $\nabla\times\vec H = \vec j_f + \partial\vec D/\partial t$, the left side vanishes identically while the right side yields exactly the charge-conservation equation—the self-consistency of the equations is equivalent to the physical conservation law. This deep connection is developed to its extreme in modern physics: conservation laws correspond to symmetries (Noether's theorem), and symmetries determine the form of interactions. Maxwell's equations are the first complete example of this modern idea.

## 4. Boundary Relations: Matching Rules for the Field at an Interface

Real problems are often set in a space assembled from several media; the field equations hold inside each medium, but the properties of the media change abruptly at the interface, where the differential equations fail. In that case one applies the integral forms to a flat pillbox on the interface (normal matching) and to a narrow loop (tangential matching), lets their dimensions tend to zero, and obtains the boundary relations:

$$\hat n\cdot(\vec D_2-\vec D_1) = \sigma_f,\qquad \hat n\times(\vec E_2-\vec E_1) = 0$$

$$\hat n\cdot(\vec B_2-\vec B_1) = 0,\qquad \hat n\times(\vec H_2-\vec H_1) = \vec\alpha_f$$

where $\hat n$ points from medium 1 to medium 2, $\sigma_f$ is the free surface charge density on the interface, and $\vec\alpha_f$ is the conduction surface current density. The physical origin of the four relations is clear: the normal jump comes from the "sources" on the interface (free charge makes the normal component of $\vec D$ discontinuous; since there are no magnetic monopoles, the normal component of $\vec B$ is always continuous); the tangential jump comes from the "sources of circulation" on the interface (surface current makes the tangential component of $\vec H$ discontinuous; the induced electric field has no surface source, so the tangential component of $\vec E$ is always continuous).

At an ordinary interface with no free charge and no conduction surface current, the rules simplify to: the tangential component of $\vec E$ is continuous, the normal component of $\vec D$ is continuous, the normal component of $\vec B$ is continuous, and the tangential component of $\vec H$ is continuous. Note two easily confused points. First, what is usually continuous is the normal component of $\vec D$, not that of $\vec E$—when $\varepsilon_1\neq\varepsilon_2$ one has $E_{2n}\neq E_{1n}$. Second, the boundary relations are not independent physical laws but the manifestation of Maxwell's equations at an interface; in solving problems they are the conditions that fix the solution of the differential equations, occupying the status of "the equations on the interface". The discussion of reflection and refraction of electromagnetic waves at interfaces in Chapter 4, and the derivation of the Fresnel formulas, depend entirely on these matching conditions.

## 5. Energy and Energy Flow of the Electromagnetic Field: Poynting's Theorem

The electromagnetic field carries energy, which is the direct expression of "the field is matter". Starting from the work done by the Lorentz force on charges and performing identical transformations with Maxwell's equations, one derives the field-theoretic form of energy conservation—Poynting's theorem:

$$\frac{\partial w}{\partial t} + \nabla\cdot\vec S = -\vec j\cdot\vec E,\qquad w = \frac{1}{2}(\vec E\cdot\vec D + \vec B\cdot\vec H),\qquad \vec S = \vec E\times\vec H$$

Here $w$ is the electromagnetic energy density—the electric and magnetic fields each contribute half; $\vec S$ is the energy flux density (Poynting vector), whose direction gives the direction of energy flow and whose magnitude gives the energy crossing unit area perpendicular to the flow per unit time; the right-hand side $-\vec j\cdot\vec E$ is the power density of the work done by the field on the current, and when it is negative the current (a battery, an antenna) is feeding energy into the field. Integrating over an arbitrary volume, Poynting's theorem states: the decrease of field energy in a region plus the energy flowing out through its boundary equals the work done by the field on the charges in that region—energy conservation holds rigorously in the joint ledger of "field + charges".

The Poynting vector corrects a deep-rooted intuitive error: the energy in a circuit is not "carried by the electrons inside the wire" but is transported through the electromagnetic field in the space around the wire. Take DC transmission: outside the surface of the wire $\vec E$ has a component along the wire, $\vec H$ circles the wire, and $\vec S = \vec E\times\vec H$ points exactly toward the load; energy leaves the source, flows through space, is "injected" sideways into the wire and the load, and finally turns into Joule heat or mechanical work. The wire serves only to guide the distribution of the field. This picture already holds in steady circuits, and in high-frequency and radiation problems it is the only correct one. In addition, the electromagnetic field also carries momentum, with momentum density $\vec g = \vec S/c^2$, which explains effects such as light pressure (radiation pressure) and is a prelude to the passage of Maxwell's theory into relativity.

The electromagnetic field carries not only energy but also momentum: the momentum density is $\vec g = \vec S/c^2$, and the corresponding momentum flow constitutes the electromagnetic stress tensor. When an electromagnetic wave falls on a surface and is absorbed or reflected, the body feels a radiation pressure—$p = I/c$ for complete absorption and $p = 2I/c$ for complete reflection ($I$ being the incident intensity). Light pressure is negligible on everyday scales but decisive on astronomical ones: the tails of comets are blown away from the Sun partly by light pressure, solar-sail spacecraft use light pressure as propulsion, and inside stars light pressure helps to resist gravitational collapse. The existence of field momentum also brings counter-intuitive problems such as "hidden momentum" (the Feynman disk paradox), whose rigorous treatment must count both field momentum and matter momentum—the most vivid footnote to "the field is matter".

## 6. Common Misconceptions

**Misconception 1: The displacement current exists only in a medium.** Wrong. In vacuum $\vec D = \varepsilon_0\vec E$, and the displacement current $\varepsilon_0\partial\vec E/\partial t$ exists just the same; indeed the displacement current in vacuum is precisely the mechanism that allows electromagnetic waves to propagate. The polarization current $\partial\vec P/\partial t$ in a medium is only a part of the displacement current.

**Misconception 2: The displacement current is a flow of charge.** Wrong. The displacement current involves no transport of charge and produces no Joule heat; its name is a historical legacy. It is essentially the "magnetic equivalent" of a changing electric field.

**Misconception 3: $\nabla\cdot\vec B = 0$ means the magnetic field is constant.** Wrong. Zero divergence says only that magnetic induction lines have no ends (no sources); the field may vary violently in space and time. In an electromagnetic wave, for instance, $\vec B$ oscillates while its divergence remains zero.

**Misconception 4: Remembering the boundary relations as "the electric field is continuous everywhere".** Wrong. In general only the tangential component of $\vec E$ is continuous; what is continuous in the normal direction is $\vec D$ (in the absence of free surface charge). Confusing the two guarantees wrong results in interface problems.

**Misconception 5: Energy is transported inside the wire.** Poynting's analysis shows that in a steady circuit energy flows through the space outside the wire and enters the conductor from the side; inside an ideal wire $\vec E=0$, so no energy flux passes through at all.

## 7. Worked Example: Displacement Current and Magnetic Field in a Charging Capacitor

Let a parallel-plate capacitor have plates of radius $R$ and be charged by a constant current $I$. The field between the plates is uniform, $D = \sigma = I t/(\pi R^2)$, so the displacement current density is $j_D = \partial D/\partial t = I/(\pi R^2)$, distributed uniformly between the plates and equal in total to the conduction current in the leads—the total current is continuous. By Ampère's circuital theorem for the total current, take a concentric circular loop of radius $r$:

$$r < R:\quad B = \frac{\mu_0 I r}{2\pi R^2},\qquad r > R:\quad B = \frac{\mu_0 I}{2\pi r}$$

that is, the field between the plates grows linearly with $r$, while outside the plates it agrees with the formula for a long straight wire. The complete numerical evaluation of this result is given in Problem electrodynamics-p6. It vividly displays the picture of "the displacement current taking over from the conduction current" and illustrates the use of the Ampère–Maxwell law; it is the best introductory calculation for understanding the dynamic unity of Maxwell's equations.`,
  },

  'electrostatics-boundary': {
    chapter: 'Chapter 2 Boundary-Value Problems in Electrostatics',
    title: 'Uniqueness Theorem and the Method of Images',
    summary:
      "Electrostatic problems reduce to solving Poisson's equation under given boundary conditions; the uniqueness theorem guarantees a unique solution, and on that basis the method of images and separation of variables turn complicated boundary-value problems into solvable form.",
    keyPoints: [
      String.raw`The electrostatic potential satisfies Poisson's equation $\nabla^2\varphi = -\rho_f/\varepsilon$, which reduces to Laplace's equation $\nabla^2\varphi = 0$ in charge-free regions`,
      String.raw`Uniqueness theorem: with the charge distribution given inside the region and $\varphi$ or $\partial\varphi/\partial n$ given on the boundary, the solution is unique`,
      String.raw`The method of images replaces the induced charge on a conductor surface by fictitious charges; the solution is correct provided the equation inside the region and the boundary conditions are unchanged`,
      String.raw`For a grounded conducting sphere of radius $a$ and a charge $q$ at distance $d$ from the centre, the image charge is $q' = -\dfrac{a}{d}q$, located on the line joining the centre and $q$ at distance $b = a^2/d$ from the centre`,
      String.raw`Separation of variables in spherical coordinates gives the Legendre expansion $\varphi = \sum_l (a_l r^l + b_l r^{-l-1})P_l(\cos\theta)$`,
    ],
    content: String.raw`

Superposing Coulomb's law to obtain the field is good enough for one or a few point charges, but it fails outright as soon as we meet objects such as conductors and dielectrics, for which "the charge distribution itself depends on the field"—what distribution of charge will be induced on a conductor surface is not known in advance; it is precisely what the field has to decide. For problems in which "source and field are entangled", the correct approach is to take another road: instead of chasing the field directly, solve the partial differential equation for the potential $\varphi$. The potential is a scalar, the equation is linear, and all the information about conductors and dielectrics is carried by the boundary conditions. Electrostatics thus rises from a technical matter of "vector superposition" to a definite boundary-value problem: "solve Poisson's equation with given boundary conditions".

The main thread of this chapter has three steps. First, establish the equation obeyed by the potential—Poisson's equation and Laplace's equation; second, prove the uniqueness theorem: once the charge distribution inside the region and the boundary conditions are given, the solution exists and is unique. This step looks abstract, but it is the soul of the whole method, for it declares: no matter by what devious route a solution is contrived, as long as it satisfies the equation and the boundary conditions, it is that one true solution—the legitimacy of the method of images and of separation of variables rests entirely on this guarantee. Third, introduce the two powerful solving tools, the method of images and separation of variables, together with typical worked examples.

## 2. Potential Equations: Poisson and Laplace

The basic equations of the electrostatic field are $\nabla\times\vec E = 0$ and $\nabla\cdot\vec D = \rho_f$. Irrotationality guarantees the existence of a scalar potential, $\vec E = -\nabla\varphi$; substituting into Gauss's theorem, for a homogeneous medium $\varepsilon$ one obtains:

$$\nabla^2\varphi = -\frac{\rho_f}{\varepsilon}$$

This is Poisson's equation. In a region free of free charge the right-hand side vanishes and the equation reduces to Laplace's equation:

$$\nabla^2\varphi = 0$$

The potential energy between two charges superposes as a scalar, far simpler than the superposition of vector fields; and "the field is the gradient of the potential" guarantees that the field can be recovered from the potential without loss, which makes the potential the most economical description in electrostatics. In practice $\rho_f$ is usually known (point charges, given charged bodies) and the unknown is only the situation on the boundary: a conductor grounded or charged, an interface between dielectrics, the potential tending to zero at infinity, and so on—all of which enter the problem as boundary conditions.

There are three common types of boundary condition: the first prescribes the value of the potential on the boundary $\varphi|_S$ (zero for a grounded conductor, a constant for a charged conductor); the second prescribes the normal derivative $\partial\varphi/\partial n|_S$ (which is related to the surface charge density); and when the total charge of a conductor is given, $\varphi$ is an unknown constant on the conductor and the charge condition is imposed in integral form. Physical problems also carry natural boundary conditions, for example $\varphi\to 0$ at infinity when the charge is confined to a finite region.

Boundary-value problems also admit an elegant integral representation: Green's second identity expresses the potential at any point of the region as "the contribution of sources inside the region plus the contribution of the potential and its normal derivative on the boundary", which provides a unified framework for numerical methods (the boundary element method) and for theoretical analysis; and the essence of the method of images is exactly to find, for a particular geometry, the Green function that makes the boundary term vanish. Mastering these integral representations lets one regard an electrostatic problem as the combination of two information channels, "source" and "boundary", and the line of thought immediately becomes clear.

## 3. The Uniqueness Theorem: Only One Answer

**First boundary-value problem (Dirichlet type)**: let the free charge distribution $\rho_f$ inside a region $V$ be given and the potential $\varphi|_S$ on the boundary $S$ be given; then the potential inside $V$ is uniquely determined. **Second boundary-value problem (Neumann type)**: if instead $\partial\varphi/\partial n$ is given on the boundary, then $\varphi$ is unique up to an additive constant (the field $\vec E$ is still unique).

The proof uses contradiction together with Green's first identity: suppose there are two solutions $\varphi_1$ and $\varphi_2$, and set $u = \varphi_1-\varphi_2$; then $u$ satisfies Laplace's equation inside $V$ and $u=0$ (or $\partial u/\partial n=0$) on the boundary. Applying the divergence theorem to $u\nabla u$ gives

$$\oint_S u\frac{\partial u}{\partial n}\,dS = \int_V \left(|\nabla u|^2 + u\nabla^2 u\right)dV = \int_V |\nabla u|^2\,dV$$

The boundary integral vanishes, hence $\int_V|\nabla u|^2 dV = 0$, so $\nabla u = 0$ and $u$ is a constant; under Dirichlet conditions the constant vanishes on the boundary, so $u\equiv 0$, while under Neumann conditions $u$ can only be a constant. Q.E.D.

The value of the uniqueness theorem lies not in "proving that a solution exists" but in "licensing laziness": it turns solving into verifying. Any function that satisfies the correct equation inside the region and the prescribed conditions on the boundary is the only possible answer, however it was guessed and however unreasonable its geometrical picture. The method of images is the most beautiful cashing-in of that licence—we boldly assume that the effect of the induced charge can be replaced by one (or several) fictitious point charges, and once the verification passes the result stands, with no need to ask what the true distribution of induced charge is. The uniqueness theorem also guarantees that once a conducting shell is grounded, the field inside and outside no longer interfere (the rigorous basis of electrostatic shielding), and it underpins assertions such as "inserting a grounded conductor does not change the external field".

One of the most beautiful applications of the uniqueness theorem is the pair of theorems for conducting cavities. First: when a closed conducting shell encloses no charge, the field inside the cavity is identically zero no matter what the external field is—this is the principle of electrostatic shielding, on which the metal cases of precision instruments and the conductive suits used in live-line work on high-voltage lines are based. Second: when the charge inside the shell is fixed, the total induced charge on the outer surface equals that charge, and the external field is determined only by the distribution on the outer surface, independent of where the charge sits inside the cavity—moving the charge inside changes the induced distribution on the inner wall but not the external field. From this one may also define the capacitance-coefficient matrix of a system of conductors; the concept of partial capacitance in multi-conductor systems is its engineering statement.

## 4. The Method of Images: Fooling the Boundary with Fake Charges

**Plane image**: a point charge $q$ lies at distance $a$ in front of an infinite grounded conducting plane. In the region outside the conductor, the field of the induced charge on the surface is equivalent to that of an image charge $-q$ placed symmetrically on the other side of the plane. The potential at an arbitrary point of the region is

$$\varphi(\vec r) = \frac{q}{4\pi\varepsilon_0}\left(\frac{1}{R_+} - \frac{1}{R_-}\right)$$

where $R_\pm$ are the distances from the field point to the real and the image charge respectively. Verification: on the conducting plane $R_+ = R_-$, so $\varphi = 0$ and the boundary condition is satisfied; the equation inside the region is unchanged. The uniqueness theorem declares this to be the true solution. From it one also obtains the total induced charge, $-q$, and the attractive force between the charge and the plane, equal to the attraction of a pair of opposite charges separated by $2a$.

**Spherical image**: a grounded conducting sphere of radius $a$, with a point charge $q$ at distance $d > a$ from the centre. Let the image charge $q'$ lie on the line joining the centre and $q$, at distance $b$ from the centre. Requiring $\varphi = 0$ everywhere on the sphere gives

$$q' = -\frac{a}{d}\,q,\qquad b = \frac{a^2}{d}$$

Note that $b < a$: the image charge always lies inside the sphere, and $|q'| < q$. For any point on the sphere the ratio of its distances to $q$ and $q'$ is constantly $d/a$, so the potential vanishes exactly. If the sphere is not grounded but carries a charge $Q$, one must add a charge $Q + aq/d$ at the centre to satisfy the total-charge condition (the added charge is spread uniformly over the sphere and does not disturb the equipotential property of the grounded solution); if the sphere is isolated, ungrounded, and uncharged, the added charge is $-q' = aq/d$. From the image charge one may further compute the induced surface charge density $\sigma_f = -\varepsilon_0\,\partial\varphi/\partial r|_{r=a}$, whose dependence on the angle $\theta$ is expressed exactly by Legendre functions.

The method of images has a limited range—planes, spheres, and a few cylindrical cases—but its idea is highly suggestive: a complicated boundary effect can be fully simulated by an appropriately arranged "fictitious source". This idea recurs in magnetism (magnetic images), in wave problems (image sources), and even in quantum field theory (image charges and the Casimir effect).

Here is one more combined application: a point charge between two parallel grounded planes can be solved by an infinite chain of images—each reflection produces a new image charge, and summing the convergent series gives the exact solution; a point charge near a dielectric interface (dielectric images), and a dielectric sphere above a conducting plane, are likewise products of the image idea working together with the boundary relations. The family of boundaries accessible to the method of images is small, but combined with the uniqueness theorem and separation of variables it covers almost every classical configuration in the textbooks.

## 5. Separation of Variables

When the boundary geometry matches a coordinate system (families of spheres, cylinders, or planes) and the charge distribution has the corresponding symmetry, Laplace's equation can be solved by separation of variables. Take spherical coordinates: if the problem is axially symmetric, the general solution is

$$\varphi(r,\theta) = \sum_{l=0}^{\infty}\left(a_l r^l + \frac{b_l}{r^{l+1}}\right)P_l(\cos\theta)$$

where $P_l$ are the Legendre polynomials and $a_l$, $b_l$ are determined order by order from the boundary conditions. The standard procedure is: first write the structure of the general solution according to symmetry (in the inner region keep the $r^l$ terms and discard the $r^{-l-1}$ terms to avoid divergence; in the outer region the opposite; if the potential vanishes at infinity, drop the $r^l$ terms as well), then match the potential and its normal derivative on the boundary surface and solve for the coefficients layer by layer. For example, for a grounded conducting sphere in a uniform external field $\vec E_0$, the exterior solution is

$$\varphi = -E_0 r\cos\theta + \frac{E_0 a^3\cos\theta}{r^2}$$

The first term is the external field, and the second is exactly the potential of an induced dipole $\vec p = 4\pi\varepsilon_0 a^3\vec E_0$ located at the centre—the external field "induces" a dipole on the sphere, and this is precisely how a conducting sphere responds to an electric field. Systematic training in separation of variables is a basic skill of electrodynamics; its skeleton is reused again and again in the magnetic scalar potential of Chapter 3, in steady heat conduction of Chapter 4, and in similar problems.

The boundary of applicability of separation of variables is the orthogonality of the coordinate surfaces: Cartesian coordinates give sines and cosines, cylindrical coordinates give Bessel functions, spherical coordinates give Legendre functions, and the choice of coordinates must match the boundary geometry. When the boundary is irregular one may fall back on the Green function method—expressing the solution of an arbitrary boundary-value problem as a superposition of "point-source responses", where the response of a point source under a particular boundary can often be found at one stroke by the method of images: the method of images is in fact a special case and forerunner of the Green function method. Moreover, for an arbitrary finite charge distribution observed from far away, the multipole expansion

$$\varphi = \frac{q}{4\pi\varepsilon_0 r} + \frac{\vec p\cdot\hat r}{4\pi\varepsilon_0 r^2} + \frac{\text{quadrupole term}}{r^3} + \cdots$$

provides a systematic approximate language: total charge, dipole moment, and quadrupole moment characterise in turn the overall features of the distribution, and the leading far-field term is fixed by the first non-vanishing moment. This expansion reappears in fuller form in the radiation theory of Chapter 5, and is the standard bridge between "details of the distribution" and "observation at a distance".

## 6. Common Misconceptions

**Misconception 1: Treating the image charge as a real charge.** The image charge only "equivalently" represents the field outside the region; what matters is the equation and the boundary conditions inside the region. It is meaningless to speak of the field of an image charge inside the conductor or on the other side of the mirror plane, and the true distribution of induced charge is not concentrated at the image position either.

**Misconception 2: Writing $b$ as $d$ or $q'$ as $-q$ in the spherical image.** The correct relations are $q' = -(a/d)q$ and $b = a^2/d$; the image charge is both closer to the centre and smaller in magnitude, and neither may be omitted, or the sphere ceases to be an equipotential surface.

**Misconception 3: Believing the grounded image can be applied directly to an ungrounded conducting sphere.** When the sphere is ungrounded, the surface need only be an equipotential, not zero; a charge at the centre must be added to satisfy the total-charge (or neutrality) condition, otherwise the premise of the uniqueness theorem is violated.

**Misconception 4: Confusing the regions where Poisson's and Laplace's equations apply.** In one and the same problem the two usually coexist: Poisson's equation is used where the point charges are (or the point charges are written as $\delta$ functions), Laplace's equation elsewhere, and the two are joined at interfaces by the boundary relations.

**Misconception 5: Mismatching the radial terms of the inner and outer solutions in separation of variables.** Terms containing $r^l$ are regular at the origin and diverge at infinity; terms containing $r^{-l-1}$ are the opposite. If the region contains the origin the latter must be discarded; if the region extends to infinity and $\varphi\to 0$ is required, the former must be discarded.

## 7. Worked Example: Potential and Induced Charge outside a Grounded Conducting Sphere

Outside a grounded conducting sphere of radius $a = 0.10\ \text{m}$ there is a point charge $q = 3.0\times10^{-8}\ \text{C}$ at distance $d = 0.30\ \text{m}$ from the centre. The spherical image formula gives the image charge $q' = -(a/d)q = -1.0\times10^{-8}\ \text{C}$, located at $b = a^2/d \approx 0.033\ \text{m}$ from the centre. The potential on the line between the sphere and the charge, at $r = 0.20\ \text{m}$ from the centre, is the sum of two Coulomb potentials; inserting the numbers gives about $2.2\times10^3\ \text{V}$; and the total induced charge on the sphere equals exactly the image charge, $-1.0\times10^{-8}\ \text{C}$. The complete solution (including the force on the charge) is given in Problem electrodynamics-p1.

This problem condenses all the main points of the chapter: first the uniqueness theorem confirms the legitimacy of "image hypothesis plus verification", then the position and magnitude of the image charge are fixed, and finally superposition gives the potential at any point of the region. One should form the habit, whenever an image solution is written down, of returning to the two checks "the equation inside the region is unchanged + the boundary conditions are satisfied"—this is the essence of the methods of electrodynamics.`,
  },

  'magnetostatics-boundary': {
    chapter: 'Chapter 3 Steady Magnetic Fields',
    title: 'Vector Potential and Magnetic Scalar Potential',
    summary:
      'The source-free nature of the steady magnetic field allows the magnetic induction to be expressed as the curl of a vector potential, which satisfies a vector Poisson equation in the Coulomb gauge; in current-free regions a magnetic scalar potential can be introduced, mapping magnetic problems onto electrostatic ones.',
    keyPoints: [
      String.raw`Basic equations of the steady magnetic field $\nabla\times\vec H = \vec j_f$, $\nabla\cdot\vec B = 0$; the absence of sources allows $\vec B = \nabla\times\vec A$`,
      String.raw`In the Coulomb gauge $\nabla\cdot\vec A = 0$ the vector potential satisfies $\nabla^2\vec A = -\mu_0\vec j_f$, whose solution is the vector-potential form of the Biot–Savart formula`,
      String.raw`Far field of a magnetic dipole: $\vec A = \dfrac{\mu_0}{4\pi}\dfrac{\vec m\times\hat r}{r^2}$, and $\vec B$ is isomorphic to the field of an electric dipole`,
      String.raw`Magnetic moment $\vec m = I\vec S$; energy in an external field $W = -\vec m\cdot\vec B$; a small current loop is equivalent to a magnetic dipole`,
      String.raw`In current-free regions one may introduce a magnetic scalar potential $\vec H = -\nabla\varphi_m$ with $\nabla^2\varphi_m = -\rho_m$; the magnetic-charge method and magnetic imaging reproduce electrostatics in full`,
    ],
    content: String.raw`

Electric field lines of an electrostatic field have heads and tails: they start on positive charge and end on negative charge; magnetic induction lines, by contrast, always join head to tail in closed loops. Behind this intuitive difference stands a rigorous equation: $\nabla\cdot\vec B = 0$—the magnetic field has no sources, and isolated magnetic charge does not exist in the natural world. The absence of sources endows the magnetic field with a mathematical structure entirely different from that of the electrostatic field: $\vec B$ cannot be written as the gradient of a scalar potential (its divergence would then generally not vanish), yet it can be written as the curl of another vector field:

$$\vec B = \nabla\times\vec A$$

$\vec A$ is called the magnetic vector potential. The motivation for introducing it is exactly parallel to that for introducing the electric potential: handling $\vec B$ directly means facing three mutually coupled component equations, whereas the equations for potentials are usually simpler and more symmetric. The vector potential is not only a computational tool—in quantum mechanics (the Aharonov–Bohm effect) it is the more fundamental field quantity, and in the radiation theory of Chapter 5 the electromagnetic wave is likewise described by $\varphi$ and $\vec A$ together.

The task of this chapter: establish the potential equation of the steady magnetic field, compute the field of a magnetic dipole, and introduce the magnetic scalar potential for problems in current-free regions. "Steady" means that no quantity varies with time; the two curl equations of Maxwell's equations decouple into $\nabla\times\vec H = \vec j_f$ and $\nabla\times\vec E = 0$, electricity and magnetism become independent of each other—which is exactly why this case is simpler than the time-dependent one.

## 2. The Vector Potential and Its Equation

The basic equations of the steady magnetic field are

$$\nabla\times\vec H = \vec j_f,\qquad \nabla\cdot\vec B = 0$$

with $\vec B = \mu\vec H$ for a homogeneous magnetic medium. From $\nabla\cdot\vec B = 0$ one introduces $\vec B = \nabla\times\vec A$ (any field of zero divergence is locally the curl of some field—the Helmholtz theorem of vector analysis); substituting into $\nabla\times\vec B = \mu_0\vec j_f$ (the vacuum case) gives

$$\nabla\times(\nabla\times\vec A) = \nabla(\nabla\cdot\vec A) - \nabla^2\vec A = \mu_0\vec j_f$$

Note that $\vec A$ has a gauge freedom: $\vec A\to\vec A + \nabla\psi$ leaves $\vec B$ unchanged. Choosing the Coulomb gauge $\nabla\cdot\vec A = 0$, the above becomes

$$\nabla^2\vec A = -\mu_0\vec j_f$$

This is a vector Poisson equation for three components, formally identical with the Poisson equation of the electrostatic potential $\nabla^2\varphi = -\rho_f/\varepsilon_0$, so the electrostatic solution may be taken over directly:

$$\vec A(\vec r) = \frac{\mu_0}{4\pi}\int\frac{\vec j_f(\vec r')}{|\vec r - \vec r'|}\,dV'$$

For a line current $I$, $\vec j_f dV' \to I\,d\vec l'$, that is, $\vec A = \dfrac{\mu_0 I}{4\pi}\oint\dfrac{d\vec l'}{R}$. Taking its curl yields the Biot–Savart law. The components of the vector potential are not all independent—the Coulomb gauge has already consumed part of the freedom—but the procedure "find the potential first, then the field" greatly simplifies vector integration, especially when the current has translational or axial symmetry, in which case $\vec A$ often has only one component: for an infinite straight wire $\vec A$ is along the wire, for a long current-carrying solenoid $\vec A$ is azimuthal, and one curl finishes the job.

Gauge freedom deserves more than a footnote. The transformation $\vec A\to\vec A + \nabla\psi$ leaves every magnetic field unchanged, showing that the vector potential is not uniquely determined; a "gauge" is the principle for choosing a representative from infinitely many equivalent descriptions. The Coulomb gauge makes the vector-potential equation closest to the electrostatic problem and is convenient for steady calculations; the Lorenz gauge $\nabla\cdot\vec A + \dfrac{1}{c^2}\dfrac{\partial\varphi}{\partial t} = 0$ makes the potential equations symmetric wave equations and is indispensable in time-dependent problems and in relativistically covariant formulations. Physical observables are insensitive to the choice of gauge, and this idea of "gauge invariance" was generalised in the twentieth century into the organising principle of fundamental interactions—the electromagnetic interaction is exactly the simplest gauge theory.

The Aharonov–Bohm effect (1959) pushed the "reality" of the vector potential to the fore: let the two paths of an electron double-slit interference experiment pass on either side of a shielded flux tube; although $\vec B = 0$ along both paths, the interference fringes still shift with the flux, and the fringes return whenever the flux is an integral multiple of $h/e$. This shows that what acts on a quantum particle is the line integral of the vector potential along the path (that is, the flux), not the local $\vec B$—the potential, which seems "superfluous" in classical theory, becomes the protagonist in the quantum world.

Here is a concrete use of the vector-potential method: for a uniform magnetic field $\vec B = B_0\hat z$ one may take $\vec A = \dfrac{1}{2}\vec B\times\vec r$ (the symmetric gauge), which satisfies the Coulomb gauge everywhere and has curl exactly $\vec B$; writing $\vec p\to\vec p - q\vec A$ in the Lagrangian of a charged particle, the origin of Landau-level quantisation is hidden in this vector potential. Another example is the long solenoid: inside $B = \mu_0 n I$ and outside $B = 0$, yet the vector potential outside does not vanish (it is azimuthal with $\vec A\propto 1/r$)—and it is exactly this configuration of "zero field but nonzero potential" that supports the experimental realisation of the Aharonov–Bohm effect. The vector-potential method is thus a natural bridge between the classical and the quantum.

## 3. Magnetic Dipole: The Far Field of a Small Current Loop

Consider a small current loop whose linear size is far smaller than the distance to the observer: current $I$, area vector $\vec S$ (direction given by the right-hand rule). Define the magnetic moment

$$\vec m = I\vec S$$

Expanding the vector-potential integral for the far field and keeping the leading term gives

$$\vec A(\vec r) = \frac{\mu_0}{4\pi}\frac{\vec m\times\hat r}{r^2},\qquad \vec B = \nabla\times\vec A = \frac{\mu_0}{4\pi}\left[\frac{3(\vec m\cdot\hat r)\hat r - \vec m}{r^3}\right]$$

The field structure is completely isomorphic to the electric field of an electric dipole, hence the name magnetic dipole for a small current loop. This isomorphism is no accident: the far field of any localised current distribution is dominated by the dipole term, with magnetic quadrupole and octupole terms falling off as $1/r^4$ and $1/r^5$, exactly parallel to the multipole expansion of a charge distribution. The energy of a magnetic dipole in an external field is $W = -\vec m\cdot\vec B$, the force is $\vec F = \nabla(\vec m\cdot\vec B)$ and the torque is $\vec\tau = \vec m\times\vec B$—the compass needle and the turning of a motor are macroscopic manifestations of these two formulas. Incidentally, the magnetic moment of a current loop is deeply linked to its angular momentum (the gyromagnetic ratio), which is the starting point of atomic physics and magnetic resonance theory.

A word on the microscopic origin of magnetic moments: the orbital motion and the spin of the electron each carry a magnetic moment, and the Bohr magneton $\mu_B = e\hbar/(2m)$ is the natural unit—the magnetism of a macroscopic magnet is precisely the macroscopic emergence of some $10^{23}$ atomic moments aligned cooperatively. The classification of materials into ferromagnetic, paramagnetic, and diamagnetic is essentially three different ways of keeping this "microscopic magnetic ledger".

## 4. The Magnetic Scalar Potential: Translating Magnetic Problems into Electrostatic Ones

In a spatial region **free of free current** (for instance around a magnet, near the interface between two magnetic media, or in all space outside a current distribution), $\nabla\times\vec H = 0$. An irrotational field can be written as a gradient, so introduce the magnetic scalar potential:

$$\vec H = -\nabla\varphi_m$$

Substituting into $\nabla\cdot\vec B = \mu_0(\nabla\cdot\vec H + \nabla\cdot\vec M) = 0$ and defining the "magnetic charge" $\rho_m = -\nabla\cdot\vec M$ gives

$$\nabla^2\varphi_m = -\rho_m$$

Formally identical with the electrostatic potential equation, only with the constants shifted. The whole electrostatic arsenal—Poisson's equation, the uniqueness theorem, the method of images, separation of variables—can therefore be transplanted unchanged, and this is called the magnetic-charge method. The "magnetic charge" distribution of a uniformly magnetised sphere and the field in the gap of a permanent magnet can both be found quickly by imaging or by an equivalent magnetic dipole; the boundary relations at the interface of two magnetic media, $\varphi_{m1} = \varphi_{m2}$ and $\mu_1\partial\varphi_{m1}/\partial n = \mu_2\partial\varphi_{m2}/\partial n$, correspond word for word to the matching conditions of an electrostatic interface.

It must be clearly understood that the "magnetic charge" in the scalar-potential method is only a mathematical equivalent; $\nabla\cdot\vec B = 0$ guarantees that no real magnetic monopole exists in nature. The condition of applicability must be kept firmly in mind—no free current in the region. If there is a surface current at the interface (bound surface currents of a magnetised medium do not count; conduction surface currents do), the tangential component of $\vec H$ is discontinuous, the scalar potential becomes multivalued, and the method fails; one must then return to the vector potential. The two potentials each have their duty: use the vector potential where there is current, the scalar potential where there is none, and in boundary problems first sort out the regions and then choose the tool.

The engineering embodiment of the scalar-potential method is "magnetic circuit" analysis: magnetic flux is likened to current, magnetomotive force to electromotive force, and reluctance to resistance, so that a network of iron core, air gap, and permanent magnet can be computed with laws resembling those of electric circuits. A permanent magnet is a component carrying its own magnetomotive force, whose operating point is fixed jointly by the demagnetisation curve and the external reluctance; the design of the iron cores of motors, magnetic separators, and NMR instruments all relies on this picture. The demagnetising field is the central concept here: the equivalent magnetic charge of a finite magnet produces inside it a field opposite to the magnetisation, and the flatter the shape the stronger the demagnetisation—which explains why permanent magnets are often made long and thin, and also explains the shape anisotropy of magnetic recording particles: the same material, with geometry deciding whether its magnetism is "soft" or "hard".

## 5. Typical Calculations: Two Demonstrations of the Vector-Potential Method

**Field on the axis of a current loop.** For a loop of radius $a$ carrying current $I$, the vector-potential integral simplifies on the axis, and taking the curl gives

$$B_z = \frac{\mu_0 I a^2}{2(a^2 + z^2)^{3/2}}$$

At the centre $B = \mu_0 I/(2a)$; in the far field $z\gg a$ it becomes $\mu_0 m/(2\pi z^3)$ with $m = I\pi a^2$, in agreement with the magnetic-dipole formula. **A magnetised dielectric sphere.** For a sphere uniformly magnetised with $M_0$, the bound current is confined to the surface and the internal field is uniform:

$$\vec B_{\text{in}} = \frac{2\mu_0}{3}\vec M_0,\qquad \vec H_{\text{in}} = -\frac{1}{3}\vec M_0$$

The internal $\vec H$ is opposite to the magnetisation (the demagnetising field), which is the origin of the shape anisotropy of magnets and can be worked out step by step with the magnetic scalar potential and electrostatic imaging. These two examples display the division of labour: "use the vector potential where there is current, the scalar potential where there is none".

Two further examples show the flexibility of the method. First, magnetic shielding: put a hollow spherical shell of inner radius $a$, outer radius $b$, and permeability $\mu$ into a uniform external field; solving with the magnetic scalar potential shows that the field in the cavity is suppressed by a factor that falls rapidly as $\mu/\mu_0$ grows—high-permeability material "sucks" the flux into the shell, which is why permalloy shields have become standard equipment for precision magnetic measurements. Second, Helmholtz coils: a pair of coaxial loops of radius $R$ separated by $R$ and carrying currents in the same sense produce near the centre a field whose third derivative with respect to the coordinate vanishes, giving a highly uniform region—the classic device for geomagnetic compensation and magnetometer calibration. Both examples use only the potential methods of this chapter and a little algebra, yet they correspond directly to practical devices.

Symmetry analysis itself deserves a summary. Two tools are in constant use in magnetic problems: first, Ampère's circuital theorem together with symmetry arguments—the fields of the three basic configurations (infinite straight wire, infinite current sheet, infinite solenoid) must be known by heart, since complicated fields are often assembled from them; second, the dual translation between the "equivalent current" viewpoint and the "equivalent magnetic charge" viewpoint—the same magnet can be described either by bound currents or by equivalent magnetic charges, the two giving exactly the same $\vec B$ but different internal interpretations of $\vec H$. When meeting a new configuration, make a qualitative judgement with each viewpoint and check them against each other; this avoids the overwhelming majority of sign and direction errors.

## 6. Common Misconceptions

**Misconception 1: Believing the vector potential $\vec A$ is a purely mathematical fiction.** At the level of the classical $\vec B$ it does have gauge arbitrariness, but the Aharonov–Bohm effect shows that the vector potential (and its loop integral, the flux) has observable physical effects; in modern gauge field theory the potential is primary and the field strength is derived from it.

**Misconception 2: Forgetting the gauge condition and mis-computing $\nabla\times(\nabla\times\vec A)$ as $-\nabla^2\vec A$.** That identity presupposes $\nabla\cdot\vec A = 0$ (the Coulomb gauge); under a different gauge the form of the vector-potential equation changes accordingly.

**Misconception 3: Using the magnetic scalar potential in a region containing current.** Irrotationality of $\vec H$ is the precondition for a scalar potential to exist, and it fails as soon as there is free current in the region (even a single wire passing through); the only escape is to exclude the region occupied by the current and handle its "magnetic charge" boundary with care.

**Misconception 4: Writing the magnetic moment as $m = IS$ but getting the direction wrong.** $\vec S$ is an area vector whose direction is fixed by the right-hand rule relative to the current; the energy $-\vec m\cdot\vec B$ shows that the moment tends to align with the external field.

**Misconception 5: Confusing the boundary relations for $\vec B$ and $\vec H$.** What is continuous at an interface is $B_n$ and $H_t$ (in the absence of conduction surface current); treating the tangential component of $B$ or the normal component of $H$ as continuous is the most common error in magnetic-medium problems.

## 7. Worked Example and Connection to Later Chapters

The methods of this chapter are extended in Problem electrodynamics-p6: the magnetic field between the plates of a charging capacitor is obtained directly from Ampère's circuital theorem for the total current, where the displacement current plays the role of "source"—the methods of the steady magnetic field (circuital theorem, symmetry analysis) remain valid in the time-dependent case in modified form. More systematically, the four-dimensional framework $A^\mu = (\varphi/c, \vec A)$ established in this chapter will be joined in Chapter 6 on relativistic electrodynamics: the electric and magnetic potentials turn out to be different components of one and the same four-vector, and electrostatics and magnetostatics are merely projections of the unified electromagnetic picture onto different reference frames. Once the language of the vector potential is mastered, the road from magnetic field to electromagnetic wave, from Ampère to Einstein, runs without a break.`,
  },

  'em-waves': {
    chapter: 'Chapter 4 Electromagnetic Waves',
    title: 'Plane Electromagnetic Waves',
    summary:
      'In vacuum Maxwell\'s equations lead to a wave equation whose plane-wave solutions propagate at the speed of light and oscillate transversely; polarisation, reflection and refraction at interfaces, and waveguides form the three great themes of the theory of electromagnetic-wave propagation.',
    keyPoints: [
      String.raw`Wave equation in source-free vacuum $\nabla^2\vec E - \dfrac{1}{c^2}\dfrac{\partial^2\vec E}{\partial t^2} = 0$, with wave speed $c = 1/\sqrt{\varepsilon_0\mu_0}$`,
      String.raw`The plane wave $\vec E = \vec E_0 e^{i(\vec k\cdot\vec r - \omega t)}$ is transverse: $\vec k\cdot\vec E = 0$, and $E/H = \sqrt{\mu_0/\varepsilon_0} \approx 377\ \Omega$`,
      String.raw`Linear, circular, and elliptical polarisation are characterised by the phase difference between two orthogonal components`,
      String.raw`The Fresnel formulas give the reflection coefficients at an interface; at the angle $\theta_B$ satisfying $\tan\theta_B = n_2/n_1$ the $p$ component is not reflected (Brewster angle)`,
      String.raw`The cutoff frequency of the TE$_{mn}$ mode of a rectangular waveguide is $f_c = \dfrac{c}{2}\sqrt{(m/a)^2+(n/b)^2}$; modes below cutoff cannot propagate, and only exponentially decaying cutoff modes exist`,
    ],
    content: String.raw`

The displacement current and the law of induction complete the dynamic loop of Maxwell's equations: a changing magnetic field excites an electric field, and a changing electric field excites a magnetic field—the two breed each other and sustain each other, so that a disturbance can leave its source and propagate through space at a finite speed. Eliminating the fields from the equations in source-free vacuum yields the standard wave equation, with wave speed

$$c = \frac{1}{\sqrt{\varepsilon_0\mu_0}} \approx 2.998\times 10^8\ \text{m/s}$$

in exact agreement with the experimentally measured speed of light. Maxwell therefore asserted: light is an electromagnetic wave. This was the first time in human history that a fundamental entity was predicted from pure theory and afterwards confirmed by Hertz's experiments. The electromagnetic spectrum, from long-wave radio to gamma rays, spans twenty orders of magnitude and is essentially the same object at different "pitches".

This chapter studies three core questions of electromagnetic-wave propagation. First, plane waves in free space: the solutions of the wave equation, transversality, and polarisation; second, what happens when a wave meets a dielectric interface: the amplitude relations of reflection and refraction are given by the Fresnel formulas, and half-wave loss, the Brewster angle, and total reflection all make their entrance; third, confining the wave to propagate inside a hollow metal tube (a waveguide): the boundary conditions select discrete propagating modes, and new phenomena appear such as cutoff frequencies and group velocities below the speed of light. Together these three topics form the theoretical foundation of everything from optics to microwave engineering.

## 2. The Wave Equation and Plane-Wave Solutions

In source-free vacuum ($\rho = 0$, $\vec j = 0$) Maxwell's equations read $\nabla\cdot\vec E = 0$, $\nabla\cdot\vec B = 0$, $\nabla\times\vec E = -\partial\vec B/\partial t$, $\nabla\times\vec B = \varepsilon_0\mu_0\,\partial\vec E/\partial t$. Taking the curl of the curl equation and eliminating with the other equation:

$$\nabla^2\vec E - \frac{1}{c^2}\frac{\partial^2\vec E}{\partial t^2} = 0,\qquad \nabla^2\vec B - \frac{1}{c^2}\frac{\partial^2\vec B}{\partial t^2} = 0$$

A standard wave equation, with the wave speed fixed by the square root of the product of two constants—the strengths of electricity and magnetism together set the pace of light. Its most important particular solution is the monochromatic plane wave:

$$\vec E(\vec r,t) = \vec E_0\,e^{i(\vec k\cdot\vec r - \omega t)},\qquad \omega = ck$$

$\vec k$ is the wave vector, pointing in the direction of propagation, with $|\vec k| = 2\pi/\lambda$. Substituting the plane wave back into Maxwell's equations yields three algebraic constraints: $\vec k\cdot\vec E_0 = 0$, $\vec k\cdot\vec B_0 = 0$, and $\vec B_0 = \dfrac{1}{\omega}\vec k\times\vec E_0$. They mean that the electric and magnetic fields are both perpendicular to the direction of propagation—an electromagnetic wave is a **transverse wave**—and that $\vec E$, $\vec B$, and $\vec k$ form a right-handed orthogonal triad, with amplitude ratio

$$\frac{|\vec E|}{|\vec B|} = c,\qquad \frac{|\vec E|}{|\vec H|} = \sqrt{\frac{\mu_0}{\varepsilon_0}} = Z_0 \approx 377\ \Omega$$

$Z_0$ is called the vacuum wave impedance. The average energy flux density is $\langle S\rangle = \dfrac{1}{2}c\varepsilon_0 E_0^2$; the "stiffness" of the energy flow is measured by the wave impedance—a point continuous with transmission-line theory and the energetic view of reflection coefficients.

A monochromatic plane wave also has a time-averaged "energy ledger": the electric and magnetic energy densities are equal ($\langle w_E\rangle = \langle w_B\rangle = \dfrac{1}{4}\varepsilon_0 E_0^2$), and the total energy density multiplied by the wave speed gives the energy flux—this neat balance is a general property of linear wave fields, shared by sound waves and waves on a string with only the constants changed. Remember that "electricity and magnetism each take half in an electromagnetic wave", and no error will arise in energy-allocation problems; once the medium is dispersive, however, this balance must be corrected, and the relation between energy velocity and group velocity takes over as the protagonist.

## 3. Polarisation: The "Degree of Freedom" of a Transverse Wave

A transverse wave has one more degree of freedom than a longitudinal one: in the plane perpendicular to propagation the direction of oscillation may take many orientations, and this is polarisation. For linear polarisation $\vec E$ oscillates along a fixed line; if the two orthogonal components $E_x = E_{0x}\cos(\omega t)$ and $E_y = E_{0y}\cos(\omega t + \delta)$ differ in phase by $\delta$, the tip of the resultant vector traces an ellipse—elliptical polarisation; when the two components have equal amplitude and $\delta = \pm\pi/2$ this degenerates to circular polarisation, with $\delta = +\pi/2$ and $-\pi/2$ corresponding to left and right handedness respectively (conventions differ between textbooks—check the definition). Natural light consists of a large number of wave trains of random orientation and unrelated phase, so that macroscopically all polarisation directions are equally represented.

Polarisation is not merely a geometrical description; it is the key to interface behaviour. Decompose an arbitrary polarisation into the $s$ component perpendicular to the plane of incidence (electric field perpendicular to that plane) and the $p$ component parallel to it; the two satisfy the boundary relations independently at the interface, so the laws of reflection and refraction can be treated separately—this is exactly why the Fresnel formulas come in pairs. The state of polarisation changes upon reflection (linear polarisation may become elliptical), and applications such as laser cavities, optical fibres, and liquid-crystal displays are all built on precise control of this degree of freedom.

There are dedicated tools for the quantitative description of polarisation: arrange the two orthogonal components of the electric field into a Jones vector, and linear and circular polarisation are merely special cases of different Jones vectors; the action of an optical element on a Jones vector is a two-by-two matrix, so the evolution of any polarisation state can be computed by matrix algebra. A wave plate is a basic "polarisation processor": a quarter-wave plate introduces a phase difference of $\pi/2$ between the two orthogonal components, turning linear into circular polarisation; a half-wave plate introduces $\pi$, rotating the plane of polarisation. At the level of intensity there is Malus' law $I = I_0\cos^2\alpha$—the rotation angle of the analyser directly modulates the transmitted intensity, and a liquid-crystal display uses a voltage to control the orientation of the liquid crystal and thereby realise, pixel by pixel, brightness through an "electrically controlled rotation angle".

Orthogonal polarisations also satisfy a deep identity: any polarisation state can be decomposed into a superposition of left- and right-circular polarisation, and in the circular basis the treatment of reflection, refraction, and optical activity is often more concise than in the linear basis—circularly polarised light reverses its handedness upon reflection at an interface, and in an optically active medium the different refractive indices of the left and right components rotate the plane of polarisation (the Faraday effect is a non-reciprocal optical activity caused by an applied magnetic field, used in optical isolators to protect lasers). From Jones matrices to the Poincaré sphere, the algebraic and geometrical tools of polarisation turn this "extra degree of freedom" into an engineering object that can be designed and measured precisely.

## 4. Reflection and Refraction at an Interface: The Fresnel Formulas

A plane wave strikes the planar interface between two media (refractive indices $n_1\to n_2$) at angle of incidence $\theta_i$; the boundary relations (continuity of tangential $\vec E$ and tangential $\vec H$) give directly the laws of geometrical optics: the angle of reflection equals the angle of incidence, and Snell's law $n_1\sin\theta_i = n_2\sin\theta_t$. The amplitude relations are given by the Fresnel formulas (real amplitude ratios; a non-negative value means in phase, a negative one means antiphase, i.e. "half-wave loss"):

$$r_s = \frac{n_1\cos\theta_i - n_2\cos\theta_t}{n_1\cos\theta_i + n_2\cos\theta_t},\qquad r_p = \frac{n_2\cos\theta_i - n_1\cos\theta_t}{n_2\cos\theta_i + n_1\cos\theta_t}$$

The reflection coefficient of the $s$ component, $r_s$, is always negative (going from the less to the more dense medium), meaning that the electric field reverses phase upon reflection; the $r_p$ of the $p$ component, however, passes through zero at a particular angle—the reflection disappears entirely. This is the Brewster angle:

$$\tan\theta_B = \frac{n_2}{n_1}$$

At this angle the reflected ray and the refracted ray are exactly at $90^\circ$ (one can show that the Brewster condition is equivalent to $\theta_i + \theta_t = \pi/2$). Natural light incident at this angle leaves a reflected beam of pure $s$ polarisation—the cheapest way to obtain polarised light, and the principle of Brewster windows in lasers and of polarising sunglasses. The energy reflectance is $R = |r|^2$; at normal incidence $R = \left(\dfrac{n_1-n_2}{n_1+n_2}\right)^2$, so a glass–air interface loses about four percent, which is exactly why lenses are coated with anti-reflection films.

When light travels from the denser to the less dense medium ($n_1 > n_2$) with $\theta_i > \theta_c$ ($\sin\theta_c = n_2/n_1$), total reflection occurs. The geometrical angle of refraction then loses its meaning, but the solution is not "no solution": in the second medium there exists an **evanescent wave** propagating along the interface and decaying exponentially in the perpendicular direction; no net energy flux enters the second medium, and all the energy is reflected. The evanescent wave can have part of its energy "prised away" by a nearby third medium (frustrated total reflection), on which fibre-optic couplers and near-field optical microscopes are based.

Two further kinds of "medium" deserve mention. The first is a metal: below the optical frequency, free electrons in a metal oscillate with the field and produce strong reflection and absorption, and the wave decays inside the metal over the skin depth $\delta = \sqrt{2/(\mu_0\sigma\omega)}$—a good conductor reflects almost completely, which is the principle of silver-plated waveguide walls and aluminised mirrors; the higher the frequency the thinner the skin depth, and the AC resistance of a wire rises accordingly. The second is a plasma and dispersive media: collective oscillation of electrons in the ionosphere gives a refractive index $n = \sqrt{1 - \omega_p^2/\omega^2}$ ($\omega_p$ being the plasma frequency), and radio waves below $\omega_p$ are reflected back to the ground—short-wave broadcasting crosses the oceans on this "mirror" of the ionosphere, whereas satellite communication carriers must lie above the cutoff frequency to penetrate it. Dispersion separates phase velocity from group velocity, and the microscopic response of the medium is written directly into the propagation law of the wave.

## 5. Waveguides: Electromagnetic Waves under Constraint

At microwave frequencies the transmission loss of wires rises sharply, and one must switch to hollow metal tubes—waveguides—to carry electromagnetic waves. Let a rectangular waveguide have cross-section width $a$ and height $b$ ($a > b$), with ideal conducting walls: on the walls $E_t = 0$ and $B_n = 0$. Solving the Helmholtz equation $\nabla^2\vec E + k^2\vec E = 0$ inside the guide together with the boundary conditions on the metal walls shows that the solutions propagating along $z$ must be discrete modes: transverse electric modes TE$_{mn}$ and transverse magnetic modes TM$_{mn}$, with the field forming $m$ and $n$ half-wave standing-wave patterns across the section. The cutoff frequency of each mode is

$$f_{c,mn} = \frac{c}{2}\sqrt{\left(\frac{m}{a}\right)^2 + \left(\frac{n}{b}\right)^2}$$

Modes with frequencies below $f_c$ cannot propagate—the field decays exponentially along the axis and becomes a "cutoff mode"; only above $f_c$ can a mode carry net energy flux forward. The dominant mode TE$_{10}$ has the lowest cutoff, $f_c = c/(2a)$, meaning that exactly half a wavelength fits across the width, so the dimensions of a waveguide determine its operating band (for example, X-band waveguide with $a\approx 2.3\ \text{cm}$ corresponds to about $6.5\ \text{GHz}$).

Waves in a waveguide also display two "anomalies": the phase velocity $v_p = c/\sqrt{1-(f_c/f)^2} > c$ (the "apparent speed" of the wave crest can exceed the speed of light but carries no information); the group velocity $v_g = c\sqrt{1-(f_c/f)^2} < c$ (the speed of energy and information, approaching $c$ at higher frequency), and the product of the two is $v_p v_g = c^2$. The guide wavelength $\lambda_g = \lambda_0/\sqrt{1-(f_c/f)^2}$ is longer than the free-space wavelength—cavities and waveguide measurements exploit exactly this to determine microwave frequencies precisely. These phenomena are not peculiar to electromagnetic waves: any confined wave (in an acoustic tube, in a quantum wire) has cutoff and dispersion, and the waveguide is the cleanest and most computable example.

The two ends of a waveguide naturally lead in two directions. Towards low frequency and closure: capping both ends with metal surfaces produces a resonant cavity, whose modes become a discrete standing-wave spectrum with quality factors above $10^4$; magnetrons, klystrons, and the RF cavities of accelerators all centre on resonant cavities. Towards optics and openness: transplanting total reflection and the concept of modes into a dielectric rod gives the optical fibre—the core has a higher refractive index than the cladding, and modes satisfying the total-reflection condition are bound and propagate; multimode fibre suffers modal dispersion because the modes have different group velocities, which limits bandwidth, whereas single-mode fibre shrinks the core until only one mode is allowed, making long-distance optical communication possible. From metal tube to glass thread, the physics of constrained propagation is one and the same.

## 6. Common Misconceptions

**Misconception 1: Believing electromagnetic waves are longitudinal, or that $\vec E$ and $\vec B$ are out of step.** From $\vec k\cdot\vec E_0 = 0$ and $\vec B_0 = \vec k\times\vec E_0/\omega$, $\vec E$ and $\vec B$ are in phase, of the same frequency, mutually perpendicular, and both perpendicular to the direction of propagation; $\vec B$ is not a "secondary field" lagging behind $\vec E$.

**Misconception 2: Taking the minus sign in the Fresnel formulas for an energy loss.** A negative amplitude reflection coefficient means the reflected electric field is in antiphase (half-wave loss); the energy reflectance is $|r|^2$, always positive. Confusing the two leads to the absurdity of a "negative reflectance".

**Misconception 3: Believing there is no field at all at the interface under total reflection.** An evanescent wave exists in the second medium; only its average energy flux vanishes. The evanescent field can penetrate a finite thickness and trigger frustrated total reflection, so total reflection is not "absolute insulation".

**Misconception 4: Believing a waveguide transmits at any frequency.** Below the cutoff frequency a mode attenuates; a waveguide is a high-pass filter, and before using one must check its single-mode operating band (between the cutoff frequencies of TE$_{10}$ and the next higher mode).

**Misconception 5: Seeing a superluminal phase velocity and concluding that relativity is violated.** The phase velocity can exceed the speed of light, but signals and energy travel at the group velocity (never above $c$); mistaking "the crest moving" for "information being transmitted" is a classic misunderstanding.

## 7. Worked Example: Cutoff Frequency and the Fresnel Formulas in Action

Problem electrodynamics-p2 computes the TE$_{10}$ cutoff frequency of a rectangular waveguide ($a = 7.2\ \text{cm}$, $b = 3.4\ \text{cm}$), $f_c = c/(2a) \approx 2.08\ \text{GHz}$, determines which modes can propagate at a given operating frequency, and finds the guide wavelength—the standard procedure of waveguide engineering. Problem electrodynamics-p3 starts from the Fresnel formulas and computes the reflectance of natural light incident at $45^\circ$ on an air–glass interface, and the Brewster angle $\theta_B = \arctan 1.5 \approx 56.3^\circ$—the standard procedure of interface optics. Taken together: every quantitative conclusion of wave theory ultimately reduces to "solving the equation and matching the boundary conditions", methodologically identical to the electrostatic boundary-value problems of Chapter 2.`,
  },

  radiation: {
    chapter: 'Chapter 5 Radiation of Electromagnetic Waves',
    title: 'Dipole Radiation',
    summary:
      'A time-varying source acts on the field point at the finite speed $c$, and the retarded potential is the foundation of radiation theory; the field of electric dipole radiation falls off as $1/r$, its energy flux points along $\\hat r$, and its angular distribution follows a $\\sin^2\\theta$ pattern.',
    keyPoints: [
      String.raw`Retarded potential $\varphi = \dfrac{1}{4\pi\varepsilon_0}\displaystyle\int\dfrac{\rho(\vec r^{\prime}, t - R/c)}{R}\,dV^{\prime}$: what the field point feels at time $t$ is the state of the source $R/c$ earlier`,
      String.raw`The radiation field falls off as $1/r$ (unlike the quasi-static fields with $1/r^2$ and $1/r^3$), and $\vec E$, $\vec B$, $\hat r$ form a right-handed orthogonal triad`,
      String.raw`Electric dipole radiation field $\vec B = \dfrac{\mu_0}{4\pi c}\dfrac{[\ddot{\vec p}]\times\hat n}{r}$, $\vec E = c\vec B\times\hat n$`,
      String.raw`Angular distribution $\dfrac{dP}{d\Omega} \propto \sin^2\theta$: no radiation along the dipole moment, maximum perpendicular to it`,
      String.raw`Total radiated power $P = \dfrac{\langle|\ddot{\vec p}|^2\rangle}{6\pi\varepsilon_0 c^3}$; for a non-relativistic point charge this is the Larmor formula $P = \dfrac{q^2 a^2}{6\pi\varepsilon_0 c^3}$`,
    ],
    content: String.raw`

The electrostatic field is tied fast to charge, its lines running directly to the source; the steady magnetic field circles the current and likewise cannot leave its source. What kind of field can break free and fly to infinity? The answer lies in the time-dependent terms of Maxwell's equations: a changing magnetic field produces an electric field, a changing electric field produces a magnetic field, and the two relay each other, so that a disturbance can propagate while sustaining itself. But for a **net energy flux** to flow permanently to infinity—that is, for **radiation**—the source itself must be **time-varying**: a steady field only stores energy in the near zone and has no far-zone output. The central task of radiation theory is to start from a given time-varying source (the oscillating current in an antenna, the jumping electron in an atom) and compute how much power it emits and in which directions.

To do this one must first answer a question of principle: when and in what manner does the behaviour of the source at $\vec r'$ and time $t'$ influence the field at $\vec r$ and time $t$? The answer is "retardation": every influence travels at the speed of light, so what the field point feels at time $t$ is the state of the source at time $t - R/c$. Writing this causal rule into the potential formulas yields the retarded potential—the starting point of every radiation calculation.

## 2. Retarded Potentials: A Causal Chain at Finite Speed

Describe the field by a vector and a scalar potential ($\vec B = \nabla\times\vec A$, $\vec E = -\nabla\varphi - \partial\vec A/\partial t$), choose the Lorenz gauge $\nabla\cdot\vec A + \dfrac{1}{c^2}\dfrac{\partial\varphi}{\partial t} = 0$, and Maxwell's equations become two symmetric wave equations:

$$\nabla^2\varphi - \frac{1}{c^2}\frac{\partial^2\varphi}{\partial t^2} = -\frac{\rho_f}{\varepsilon_0},\qquad \nabla^2\vec A - \frac{1}{c^2}\frac{\partial^2\vec A}{\partial t^2} = -\mu_0\vec j_f$$

Their retarded solutions are

$$\varphi(\vec r,t) = \frac{1}{4\pi\varepsilon_0}\int\frac{\rho\left(\vec r',\ t - \frac{|\vec r-\vec r'|}{c}\right)}{|\vec r-\vec r'|}\,dV',\qquad \vec A(\vec r,t) = \frac{\mu_0}{4\pi}\int\frac{\vec j\left(\vec r',\ t - \frac{|\vec r-\vec r'|}{c}\right)}{|\vec r-\vec r'|}\,dV'$$

Formally these look like the electrostatic and magnetostatic potential formulas; the only difference is that the argument of the source function is replaced by the **retarded time** $t - R/c$. The physical picture: what the source does at a given instant (say the antenna current is suddenly switched on) is noticed by the field point only after a delay $R/c$; superposing the retarded contributions of all source elements gives the potential at the field point. The retarded potential resonates deeply with the Lorentz covariance of Chapter 6—"causal influence transmitted at the speed of light" is exactly the relativistic causal structure embodied in electromagnetic theory; indeed the Lorenz gauge is named after its inventor Lorenz, and the retarded solution is automatically covariant under Lorentz transformations.

For a point charge the retarded potential can be integrated explicitly to give the Liénard–Wiechert potentials: $\varphi = \dfrac{q}{4\pi\varepsilon_0}\left[\dfrac{1}{(1 - \hat n\cdot\vec v/c)\,R}\right]_{ret}$ and $\vec A = \vec v\,\varphi/c^2$ (the brackets denote quantities at the retarded time). They contain both the uniform-motion part (a quasi-static field falling off as $1/R^2$) and the accelerated part (the radiation field, falling off as $1/R$), and thereby settle at one stroke the field and radiation of an arbitrarily moving charge: bremsstrahlung, synchrotron radiation, and Cherenkov radiation all start from them. In engineering and astrophysics the space around a source is commonly divided by distance into a near-field zone ($r\ll\lambda$, dominated by stored energy), an induction zone, and a far-field radiation zone ($r\gg\lambda$, dominated by energy flux)—the far-field condition $r \gg 2D^2/\lambda$ used in antenna measurements and electromagnetic-compatibility standards comes from here.

The notion of retardation demands a "cognitive flip": we are used to "the field is determined by the present source", whereas the retarded potential asks us to read the causal chain backwards—every present instant at the field point corresponds to some past interval of the source. The procedure for solving a radiation problem is thereby fixed: first write down the time dependence of the source (current or charge distribution), then superpose the contributions of each source element at its own retarded time. Everything is like an echo: every reverberation in a valley answers an earlier shout; it sounds complicated, yet its structure is astonishingly simple.

The retarded potential has a counter-intuitive corollary worth savouring: if the source were suddenly to disappear, the field at the field point would not vanish at once, but only settle down after the last retarded signal arrived—the field behaves like an entity with "inertia", existing independently once excited. This is another layer of meaning in "the field is matter": the energy and momentum that have already left the source and are travelling through the field are no longer subject to the fate of the source.

## 3. The Field of Electric Dipole Radiation

The most basic and most important radiating system is the electric dipole: an oscillating electric dipole much smaller than the wavelength, $\vec p(t) = \vec p_0\cos\omega t$ (equivalent to a uniformly oscillating current element on a short antenna). Expanding the retarded potential in the far zone ($r\gg\lambda\gg l$) and keeping the radiation term gives

$$\vec B(\vec r,t) = \frac{\mu_0}{4\pi c}\,\frac{[\ddot{\vec p}]\times\hat n}{r},\qquad \vec E(\vec r,t) = c\,\vec B\times\hat n = \frac{1}{4\pi\varepsilon_0 c^2 r}\,\hat n\times(\hat n\times[\ddot{\vec p}])$$

where the brackets $[\ddot{\vec p}]$ denote the value at the retarded time and $\hat n$ is the unit vector toward the field point. Three key properties deserve chewing over. **First**, the radiation field falls off as $1/r$—the energy flux density $S\propto E^2$ falls off as $1/r^2$, and multiplying by the sphere area $4\pi r^2$ leaves a total power independent of $r$: the energy really "flows away". This differs from the quasi-static fields: the Coulomb field falls off as $1/r^2$ and the dipole field as $1/r^3$, and their energy-flux integrals vanish at large distance—they are merely the near field breathing energy in and out, not radiation. **Second**, $\vec E$, $\vec B$, and $\hat r$ form a right-handed orthogonal triad—the radiation field is a pure transverse wave. **Third**, the radiation is driven by **acceleration** (here $\ddot{\vec p}$, the second derivative of the dipole moment): a charge in uniform motion does not radiate, a profound manifestation of relativistic causality.

For the same oscillating dipole, two fields of very different character coexist in space: the nearby quasi-static field, falling off as $1/r^2$ and $1/r^3$ and almost in phase with the source, whose main business is storing and returning energy—the electric and magnetic fields breathe in and out alternately, with near-zero time-averaged flux; and the distant radiation field, falling off as $1/r$, separated from the source by the delay $r/c$, which purely transports energy outward. The crossover occurs at $r\sim\lambda$—exactly why near-field antenna measurements must apply spherical-wave corrections while far-field measurements require $r\gg\lambda$. Understanding "one source, two fields" is the first step in reading any antenna-radiation problem.

Consider next the polarisation structure of the radiation field: the radiated electric field is always perpendicular to the direction of propagation, and its plane of oscillation contains the projection of the dipole moment onto the plane of observation—observed along the equator the light is fully linearly polarised, and away from the equator the azimuth of polarisation rotates accordingly. This structure determines the angular-momentum transport of dipole radiation: a wave emitted along the direction of observation has its electric field oscillating in the perpendicular plane, which is exactly where the classical picture meets the spin of the photon (each quantum of energy $\hbar\omega$ carrying $\pm\hbar$ of angular momentum), paving the way for the discussion of circularly polarised radiation and spin angular momentum.

## 4. Angular Distribution and Total Power

Radiation is not isotropic. Time-averaging the Poynting vector gives the angular distribution

$$\frac{dP}{d\Omega} = \frac{\mu_0\,|[\ddot{\vec p}]|^2}{16\pi^2 c}\sin^2\theta = \frac{\langle|\ddot{\vec p}|^2\rangle}{16\pi^2\varepsilon_0 c^3}\sin^2\theta$$

where $\theta$ is the angle between the direction of observation and the dipole moment $\vec p$: there is no radiation at all along the dipole moment ($\theta = 0$) and it is strongest perpendicular to it—the classic "figure-eight" radiation pattern. This is why a broadcast tower covers the horizontal plane uniformly and radiates nothing along the mast. Integrating over the full solid angle gives the total radiated power:

$$P = \frac{\langle|\ddot{\vec p}|^2\rangle}{6\pi\varepsilon_0 c^3}$$

For harmonic oscillation $\vec p = \vec p_0\cos\omega t$, $\langle\ddot p^2\rangle = \dfrac{1}{2}p_0^2\omega^4$, hence

$$P = \frac{\omega^4 p_0^2}{12\pi\varepsilon_0 c^3}$$

The fourth-power dependence on $\omega$ is the cardinal law of radiation theory: raise the frequency tenfold and the power rises ten-thousandfold. It explains why low-frequency emission is extremely inefficient (a 50 Hz power line radiates almost nothing), why radio uses bands above the megahertz, and why the sky is blue—Rayleigh scattering by molecules is essentially forced dipole radiation, and the $1/\lambda^4$ spectral distribution makes short-wavelength blue light scatter far more strongly than red.

For a single non-relativistic charge, $\vec p = q\vec r$ and $\ddot{\vec p} = q\vec a$, and the above reduces to the Larmor formula:

$$P = \frac{q^2 a^2}{6\pi\varepsilon_0 c^3}$$

It gives the radiated power of an accelerating charge and is the starting point of the theories of radiation damping, synchrotron radiation, and bremsstrahlung in Chapter 7. The relativistic generalisation (the Liénard formula) replaces the acceleration by a four-dimensionally covariant expression, foreshadowed in Chapter 6.

The other side of the radiation problem is "reception": when an antenna is used to receive, the reciprocity theorem guarantees that its receiving pattern equals its transmitting pattern, and the effective aperture $A_e = \lambda^2 G/4\pi$ ($G$ being the gain) links antenna language to signal power—the link budgets of radio telescopes and deep-space communication all rest on this formula. The symmetry of transmission and reception once again reflects the time-reversal structure of Maxwell's equations: radiation is a macroscopically irreversible process in which field flows from source to distance, while its microscopic mechanism is entirely reversible.

## 5. Typical Calculation: Short Antennas and Radiation Resistance

Let a short antenna of length $l$ be fed with current $I(t) = I_0\cos\omega t$; its equivalent electric dipole moment satisfies $I_0 l = \omega p_0$ (the current is the rate of change of charge multiplied by the length). Substituting into the power formula gives the average radiated power $P = \dfrac{\mu_0\omega^2 I_0^2 l^2}{12\pi c}$. In engineering one converts this into the **radiation resistance** $R_r = 2P/I_0^2 = 80\pi^2(l/\lambda)^2\ \Omega$: for a short antenna with $l/\lambda = 1/300$, $R_r\approx 8.8\times10^{-3}\ \Omega$, pitifully small—an antenna must be comparable in size with the wavelength to radiate efficiently, which is the quantitative basis for "the antenna must be long enough". The complete numerical example is given in Problem electrodynamics-p4.

One more example, magnetic dipole radiation: the total power of an oscillating magnetic dipole moment $\vec m(t)$ is $P = \dfrac{\mu_0\,\langle|\ddot{\vec m}|^2\rangle}{6\pi c^3}$, smaller than that of an electric dipole of the same amplitude by a factor of order $(v/c)^2$ ($v$ being the speed of the charges inside the source)—which is why atomic transitions are dominated by electric dipole radiation, magnetic dipole transitions being "forbidden transitions" with far longer lifetimes. Multipole radiation expands in orders $1,2,3,\dots$, with the power suppressed by a factor $(kl)^2$ at each step; this hierarchy is the classical root of the selection rules of atomic spectra.

The $\sin^2\theta$ pattern of a short dipole is only the starting point. A half-wave antenna (a symmetric dipole exactly half a wavelength long) carries a standing-wave current distribution, has a "flatter" and more effective pattern, and a radiation resistance of about $73\ \Omega$, conveniently matched to common feed lines. Arranging many antennas into an array at a fixed spacing, the coherent superposition of their radiation produces a sharp interference main lobe—a phased-array radar steers its beam electronically without turning the antenna, on exactly the same principle as grating diffraction: the element spacing and the feed phases fix the direction of the main lobe, and the number of elements fixes the beamwidth and gain. The "antenna language" of directivity, gain, and beam solid angle is in essence a geometrical summary of the angular distribution $dP/d\Omega$. Another intriguing kind of radiation is Cherenkov radiation: when a charged particle moves through a medium faster than the phase velocity of light there, $c/n$, it radiates a cone of light with the particle at its apex, the cone angle satisfying $\cos\theta = c/(nv)$—the particle has not exceeded the speed of light in vacuum, and the radiation arises from the coherent superposition of the wavefronts of dipoles excited in the medium; the eerie blue glow of a reactor pool and the giant water Cherenkov neutrino detectors are direct applications of this formula.

## 6. Common Misconceptions

**Misconception 1: Forgetting retardation in the potential formulas.** Writing the retarded potential as an ordinary Coulomb potential plus a "correction term" is the most common error; the $R$ in the retarded time $t - R/c$ is the distance from the source element to the field point, different elements have different retarded times, and this must be kept inside the integral and computed point by point.

**Misconception 2: Taking a quasi-static field for a radiation field.** Fields falling off as $1/r^2$ and $1/r^3$ are near (induction) fields and carry no net energy flux to infinity; the touchstone of radiation is whether the field falls off as $1/r$ and whether the flux integral is nonzero.

**Misconception 3: Believing a uniformly moving charge also radiates.** Radiation is driven by acceleration; a charge in uniform rectilinear motion does not radiate (in its rest frame it is merely an electrostatic field). Acceleration is the necessary condition for radiation (and, non-relativistically, almost sufficient).

**Misconception 4: Getting the reference for $\theta$ wrong in the $\sin^2\theta$ angular distribution.** $\theta$ is measured from the direction of the dipole moment, not from the plane of propagation; "no radiation along the axis" means along $\vec p$.

**Misconception 5: Thinking the radiated power depends on the total charge of the source.** The Larmor formula contains only $q^2$ and the acceleration—an electrically neutral system (zero net charge) still radiates as long as its internal charges accelerate relative to one another (as in a dipole oscillation); conversely, however large the total charge, without time variation the radiation is zero.

## 7. Worked Example and Extensions

Problem electrodynamics-p4 works out in full the radiated power and radiation resistance of a short antenna: convert the equivalent dipole moment from $I_0 l = \omega p_0$, substitute into $P = \omega^4 p_0^2/(12\pi\varepsilon_0 c^3)$, then cross-check with $R_r = 2P/I_0^2$—two routes reaching the same destination, the best possible test of the dipole radiation formulas. Going deeper: the quantisation of radiation (a photon of energy $\hbar\omega$, Einstein's spontaneous-emission coefficient $A\propto\omega^3|d|^2$) and its connection with the classical $\omega^4$ law, the phased synthesis of antenna-array patterns, and the extension of the retarded potential to an arbitrarily moving charge in the Liénard–Wiechert potentials, form three great roads leading from classical electrodynamics to quantum electrodynamics and to modern antenna engineering. Classical dipole radiation is both an end and a beginning.`,
  },

  'relativity-em': {
    chapter: 'Chapter 6 Relativistic Electrodynamics',
    title: 'Relativistic Covariance of the Electromagnetic Field',
    summary:
      'Charge conservation and Maxwell\'s equations, written in four-dimensional tensor form, unify the electric and magnetic fields into the electromagnetic field tensor $F^{\\mu\\nu}$, from which the field transformations, the invariants, and the covariant equation of motion follow naturally.',
    keyPoints: [
      String.raw`Four-current $j^\mu = (c\rho, \vec j)$; charge conservation is the covariant equation $\partial_\mu j^\mu = 0$`,
      String.raw`Four-potential $A^\mu = (\varphi/c, \vec A)$, satisfying the covariant wave equation $\Box A^\mu = -\mu_0 j^\mu$ in the Lorenz gauge`,
      String.raw`The electromagnetic field tensor $F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu$ unifies $\vec E$ and $\vec B$ into a second-rank antisymmetric tensor`,
      String.raw`Field transformations: $\vec E'_\perp = \gamma(\vec E_\perp + \vec v\times\vec B)$, $\vec B'_\perp = \gamma(\vec B_\perp - \vec v\times\vec E/c^2)$, with the parallel components unchanged`,
      String.raw`The two Lorentz invariants $E^2 - c^2B^2$ and $\vec E\cdot\vec B$ separate the electromagnetic field into six classes of pure-field situations`,
    ],
    content: String.raw`

Special relativity was not born out of thin air: the behaviour of Maxwell's equations in different inertial frames was precisely the starting point of Einstein's 1905 paper. The equations predict the speed of light $c = 1/\sqrt{\varepsilon_0\mu_0}$, but **relative to what**? Under the Galilean transformation the form of the wave equation cannot be preserved, and the speed of light ought to change with the reference frame—yet the Michelson–Morley experiment found no aether wind whatsoever. Einstein's resolution was startling: Maxwell's equations hold in all inertial frames, and what must be revised is not electromagnetism but Newton's conception of space and time. Time and space change with the reference frame; only the speed of light does not.

Conversely, once the relativistic view of space and time is accepted, electromagnetism reveals its hidden deep structure: **the electric and magnetic fields are not two independent fields but projections of one and the same object onto different reference frames**. A pure electric field in one frame becomes an electric plus a magnetic field in another—magnetic phenomena can in essence be understood as the relativistic effect of electrostatic interactions between moving charges. The task of this chapter is to build this "unified language" in full: four-dimensional spacetime, four-current, four-potential, the electromagnetic field tensor; to let Maxwell's equations flow in covariant form at one stroke; and from them to read off the field-transformation formulas and the Lorentz invariants.

## 2. Four-Dimensional Spacetime and the Lorentz Transformation

Take $x^\mu = (x^0, x^1, x^2, x^3) = (ct, x, y, z)$ with metric signature $(+,-,-,-)$; the spacetime interval $ds^2 = c^2dt^2 - dx^2 - dy^2 - dz^2$ is an invariant common to all inertial frames. When two inertial frames move relative to each other with speed $v$ along $x$, the Lorentz transformation is

$$x'^0 = \gamma(x^0 - \beta x^1),\qquad x'^1 = \gamma(x^1 - \beta x^0),\qquad x'^2 = x^2,\qquad x'^3 = x^3$$

where $\beta = v/c$ and $\gamma = 1/\sqrt{1-\beta^2}$. Any set of quantities transforming in this same way is called a four-vector; its components mix linearly under the transformation, while scalars formed from them (contractions) are the same in all inertial frames—the whole power of the covariant method lies in this: write a physical law as an equality between four-vectors and tensors, and the law automatically takes the same form in every inertial frame.

Applied to electrodynamics, the list of objects to be four-dimensionalised is as follows: the spacetime coordinates $x^\mu$; the current and charge density combined into the four-current $j^\mu = (c\rho, \vec j)$—charge density and current density are one entity, and what a resting observer sees as "pure charge" appears to a moving observer as both charge and current; the law of charge conservation $\nabla\cdot\vec j + \partial\rho/\partial t = 0$ written as $\partial_\mu j^\mu = 0$, a four-divergence whose form is unchanged in all inertial frames. In addition, the proper time $d\tau = ds/c$ defines the four-velocity $U^\mu = dx^\mu/d\tau = \gamma(c, \vec v)$ and the four-momentum $p^\mu = mU^\mu = (E/c, \vec p)$—the unification of energy and momentum is exactly the starting point of relativistic mechanics.

The causal structure deserves emphasis: the light cone of an event divides spacetime into future, past, and "absolutely elsewhere", and only events inside or on the cone can be causally connected—the property that fields propagate at the speed of light in Maxwell's equations is strictly consistent with this causal structure, which is the mathematical root of "electromagnetic theory naturally satisfies relativity". From the four-velocity one also derives the velocity-addition formula $u' = \dfrac{u - v}{1 - uv/c^2}$, which guarantees that no composition of velocities exceeds $c$; meanwhile the factor $\gamma$ runs through length contraction and time dilation: lengths along the direction of motion contract by $1/\gamma$ and clocks slow by $\gamma$. All the transformation formulas of this chapter are projections of these kinematic facts onto electromagnetic quantities.

There is also a fact that is often underestimated: Maxwell's equations not only "are compatible with" the Lorentz transformation, they directly hint at it—Voigt, Larmor, and Lorentz all discovered that the electromagnetic field equations are form-invariant under the Lorentz transformation, but at the time this transformation was interpreted as a contraction effect relative to the "aether". Einstein's contribution was to strip away the aether and elevate the transformation to a property of spacetime itself. In this sense special relativity was hidden in Maxwell's equations all along: the intrinsic symmetry of electrodynamics announced the new view of spacetime earlier than the experimental failure to find the aether.

Beneath the coordinate transformation there is also a hierarchy of invariants: the interval $ds^2$ is a scalar; the contraction of the four-velocity $U^\mu U_\mu = c^2$ is a scalar; the contraction of the four-momentum $p^\mu p_\mu = m^2c^2$ gives the famous mass–energy relation $E^2 = p^2c^2 + m^2c^4$. The routine of the covariant method is thus established: put the quantities into four-dimensional objects, form invariants by contraction, and finally make both sides of the equation of the same rank—one set of moves runs through the whole chapter.

## 3. The Four-Potential and the Covariant Wave Equation

The scalar and vector potentials together form exactly one four-vector:

$$A^\mu = \left(\frac{\varphi}{c},\ \vec A\right)$$

This is no coincidence: in the Lorenz gauge $\nabla\cdot\vec A + \dfrac{1}{c^2}\dfrac{\partial\varphi}{\partial t} = 0$ (written covariantly, $\partial_\mu A^\mu = 0$) the two potentials satisfy the same set of wave equations, and their retarded solutions (the retarded potentials of Chapter 5) transform into one another under Lorentz transformations exactly as the components of a four-vector should. The potential equation takes the d'Alembertian form:

$$\Box A^\mu = -\mu_0 j^\mu,\qquad \Box \equiv \nabla^2 - \frac{1}{c^2}\frac{\partial^2}{\partial t^2}$$

$\Box$ is a four-dimensional scalar operator and both sides of the equation are four-vectors—the covariance of the equation is evident at a glance. From the transformation rule of $A^\mu$ one immediately reads off the transformation of the potentials: $A'^0 = \gamma(A^0 - \beta A^1)$, $A'^1 = \gamma(A^1 - \beta A^0)$, $A'^2 = A^2$, $A'^3 = A^3$. A useful corollary: an observer moving uniformly along a wire sees the laboratory's "pure current" as a line carrying a net charge (the line charge density is changed by Lorentz contraction), so a test charge moving beside the wire feels an electric force—the magnetic force turns out to be a relativistic "change of dress" of the electric force, and this derivation needs only length contraction. It is the most intuitive window onto electromagnetic unification.

The four-dimensional language also unifies the Doppler effect and aberration: the wave vector and frequency of a plane wave form the four-wave-vector $k^\mu = (\omega/c, \vec k)$, whose Lorentz transformation gives directly $\omega' = \gamma\omega(1 - \beta\cos\theta)$ and the aberration formula—the relativistic Doppler effect works transversely as well (a transverse shift by a factor $\gamma$), and this "transverse Doppler" effect has been precisely confirmed by the Ives–Stilwell experiment, becoming one of the most direct macroscopic evidences of time dilation. The same four-wave-vector also describes the energy and momentum of a photon, $E = \hbar\omega$, reserving an interface with quantum electrodynamics.

## 4. The Electromagnetic Field Tensor and the Transformation of Fields

The field strengths are built from derivatives of the potential, with the derivative indices arranged into a second-rank antisymmetric tensor:

$$F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu$$

Written out as a matrix, the electric field occupies the 0–i components (with a factor $1/c$) and the magnetic field the i–j components:

$$F^{\mu\nu} = \begin{pmatrix} 0 & -E_x/c & -E_y/c & -E_z/c \\ E_x/c & 0 & -B_z & B_y \\ E_y/c & B_z & 0 & -B_x \\ E_z/c & -B_y & B_x & 0 \end{pmatrix}$$

The six independent components accommodate exactly the three components of $\vec E$ and the three of $\vec B$—**the electromagnetic field tensor unifies the electric and magnetic fields into a single geometrical object**, just as time and space are unified into four-dimensional coordinates. Rewritten with $F^{\mu\nu}$, Maxwell's equations reduce to two:

$$\partial_\nu F^{\mu\nu} = \mu_0 j^\mu,\qquad \partial_\lambda F_{\mu\nu} + \partial_\mu F_{\nu\lambda} + \partial_\nu F_{\lambda\mu} = 0$$

The first packages Gauss's theorem with the Ampère–Maxwell law (taking the $\mu = 0$ component automatically yields charge conservation), and the second packages the magnetic Gauss theorem with Faraday's law (automatically satisfied, because $F$ is a derivative of the potential, corresponding to the cyclic symmetry of $\partial_\lambda\partial_\mu A_\nu$). Four equations condense into two tensor equations, and their form is unchanged under Lorentz transformations—this is the exact meaning of "covariance".

The field-transformation formulas are read off directly from $F'^{\mu\nu} = \Lambda^\mu_{\ \alpha}\Lambda^\nu_{\ \beta}F^{\alpha\beta}$:

$$\vec E'_\parallel = \vec E_\parallel,\qquad \vec B'_\parallel = \vec B_\parallel,\qquad \vec E'_\perp = \gamma(\vec E_\perp + \vec v\times\vec B),\qquad \vec B'_\perp = \gamma\left(\vec B_\perp - \frac{\vec v\times\vec E}{c^2}\right)$$

The components parallel to the direction of motion are unchanged, while the perpendicular components are amplified by $\gamma$ and "visit each other": a magnetic field is born in the electric field and an electric field in the magnetic field. From these one may also write the two Lorentz invariants:

$$\vec E\cdot\vec B,\qquad E^2 - c^2B^2$$

Their values divide the electromagnetic field into six pure cases: when $\vec E\cdot\vec B = 0$ and $E^2 - c^2B^2 > 0$ there exists a pure-electric-field frame; when $< 0$ there exists a pure-magnetic-field frame; when $= 0$ with $\vec E\cdot\vec B = 0$ the case is that of a pure radiation field (a plane wave)—a plane wave is a plane wave in every inertial frame, with amplitudes scaling proportionally, and no frame can make it "disappear".

The classification by invariants can be drawn more finely: when $\vec E\cdot\vec B \neq 0$ the fields are never perpendicular in any frame, and an oblique field cannot be "straightened"; a field with $E^2 - c^2B^2 = 0$ and $\vec E\cdot\vec B = 0$ corresponds to a pure radiation field—a plane wave belongs to this class, its amplitude stretching with the Doppler factor under transformation while its character is unchanged. Another powerful tool is the energy–momentum tensor $T^{\mu\nu}$: it unifies the energy density, the energy flux (the Poynting vector), and the Maxwell stress tensor into one four-dimensional tensor, and the covariant conservation law $\partial_\mu T^{\mu\nu} = 0$ subsumes Poynting's theorem and momentum conservation in one package. Field transformations are by no means purely theoretical—the induction currents driven by moving magnets are the daily business of generators and of the physics of the Earth's magnetosphere.

Field transformations also reward a habit of "limit checking": in the low-speed limit $\gamma\to 1$ and $E' \approx E + \vec v\times\vec B$—exactly the induced emf formula for a moving conductor cutting magnetic lines in quasi-static theory; while the second term in $B' \approx B - \vec v\times\vec E/c^2$ is negligible at low speed, showing that "motion of magnetism producing electricity" is far weaker than "motion of electricity producing magnetism". The symmetry of the two formulas is broken as $c\to\infty$, which explains precisely why the status of electricity and magnetism was long asymmetric in history: magnetic phenomena are $(v/c)$-order relativistic effects, and only when $c$ is restored to the leading role is the symmetry complete.

## 5. Worked Example: The Electric Field in a Pure-Magnetic-Field Frame

Suppose that in the laboratory frame $S$ there is only a uniform magnetic field $\vec B = B_0\hat z$ with $\vec E = 0$, and another frame $S'$ moves with $v = 0.6c$ along $x$. From the field transformations: the parallel components are unchanged (here zero), and the perpendicular components are $\vec E'_\perp = \gamma\vec v\times\vec B = -\gamma v B_0\hat y$ and $\vec B'_\perp = \gamma B_0\hat z$. Inserting $\gamma = 1.25$ and $B_0 = 0.10\ \text{T}$ gives $E' \approx 2.25\times10^7\ \text{V/m}$ and $B' = 0.125\ \text{T}$. Check with the invariants: $E'^2 - c^2B'^2 = -c^2B_0^2$, the same in both frames. The complete calculation is given in Problem electrodynamics-p5. The physics revealed by this problem: an observer at rest in the magnetic field and a moving observer classify "force" in completely different ways—the magnetic Lorentz force of the laboratory frame appears as an electric force in the frame in which the particle is at rest, while the spacetime trajectory computed from the covariant equation of motion is identical.

This example can also reverse-engineer the "origin" of magnetism. Imagine two parallel current-carrying wires: in the laboratory frame the wires are neutral and there is only a weak magnetic attraction; go to the frame moving with the electrons, and the positive ion lattice acquires a net line charge through length contraction, so that a Coulomb force appears—the direction and magnitude of the force agree exactly in the two frames. The magnetic force appears at order $(v/c)^2$ as the relativistic "balancing payment" of the electric force, which is exactly the question Einstein asked at the opening of his 1905 paper, "the relative motion of a magnet and a conductor": the difference between magnetism and electricity is only the projection of one interaction onto different frames; the magnetic force, though small, is "sifted out" into a chapter of its own because the enormous cancellation of electrical neutrality inside matter removes the electric part.

## 6. Common Misconceptions

**Misconception 1: Believing $\vec E$ and $\vec B$ each independently satisfy conservation laws.** Seen separately they mix with each other under Lorentz transformations; neither $\vec E$ nor $\vec B$ alone is a covariant object. The correct unified object is $F^{\mu\nu}$.

**Misconception 2: Mixing the field-transformation formulas with Galilean intuition.** The perpendicular components carry a factor $\gamma$, and the cross terms are $\vec v\times\vec B$ and $\vec v\times\vec E/c^2$; dropping the $\gamma$ or writing the cross terms wrongly are the two most frequent errors in transformation calculations.

**Misconception 3: Believing "magnetism is a relativistic effect of electricity" means the magnetic field is unreal.** The magnetic field can be made to vanish in a suitable frame (if the invariants allow), but for observers in a given frame it is a genuine force and energy flux; unification is not abolition.

**Misconception 4: Forgetting the invariant check.** After any field-transformation calculation one should verify that $\vec E\cdot\vec B$ and $E^2 - c^2B^2$ agree with the original frame—a free and powerful means of checking.

**Misconception 5: Confusing the order and units of the components of $A^\mu$.** The common convention is $A^\mu = (\varphi/c, \vec A)$; if one takes $(\varphi, \vec A)$ instead, the positions of the factors $c$ in the field tensor and in the transformation formulas all change, so the convention must be self-consistent throughout.

## 7. Worked Example and Extensions

Problem electrodynamics-p5 demonstrates the standard operation of transforming the electromagnetic field tensor: the field-transformation formulas give $\vec E'$ and $\vec B'$ in the moving frame, which are then checked against the invariants $E^2 - c^2B^2$ and $\vec E\cdot\vec B$—the computational procedure and the self-checking logic of the tensor method in one pass. The extensions of this chapter run in three directions: first, the covariant equation of motion $K^\mu = qF^{\mu\nu}U_\nu$ (treated in detail in Chapter 7), which writes the Lorentz force in four-dimensional form and is the foundation of the relativistic dynamics of charged particles; second, the Liénard–Wiechert potentials—the retarded potential of a uniformly moving point charge occupies a single line in covariant language, from which the radiation of an arbitrarily moving charge (bremsstrahlung, synchrotron radiation) unfolds; third, the four-dimensional form of electromagnetic stress (the energy–momentum tensor $T^{\mu\nu}$), which upgrades Poynting's theorem into a covariant conservation law and paves the way for the concept of field sources in general relativity. Relativistic electrodynamics is the first complete example of the modern paradigm of "unifying physics through symmetry".`,
  },

  'charged-particle': {
    chapter: 'Chapter 7 Charged Particles and Electromagnetic Fields',
    title: 'Lorentz Force and the Motion of Charged Particles',
    summary:
      'The Lorentz-force equation is the core of charged-particle dynamics: in a uniform magnetic field a particle moves in a helix, crossed electric and magnetic fields produce a drift, and at high speed radiative losses act back on the particle through a radiation-damping force.',
    keyPoints: [
      String.raw`Lorentz force $\vec F = q(\vec E + \vec v\times\vec B)$: the electric force does work, while the magnetic force is always perpendicular to the velocity and does no work`,
      String.raw`Cyclotron motion in a uniform magnetic field: radius $r = mv_\perp/(qB)$, angular frequency $\omega_c = qB/m$ independent of speed, and a helical trajectory`,
      String.raw`Drift in crossed fields: $\vec v_d = \vec E\times\vec B/B^2$, independent of the sign of the charge`,
      String.raw`Covariant equation of motion $K^\mu = qF^{\mu\nu}U_\nu$, the four-force automatically satisfying $K^\mu U_\mu = 0$`,
      String.raw`Non-relativistic radiation damping (Abraham–Lorentz force) $\vec F_{rad} = \dfrac{q^2}{6\pi\varepsilon_0 c^3}\ddot{\vec v}$, which in typical situations may be approximated by $-\dfrac{P}{v^2}\vec v$`,
    ],
    content: String.raw`

In the preceding chapters the protagonist was the field: fields produced by sources, the energy of fields, the waves and radiation of fields. This chapter gives the leading role back to the particle: when a charged particle finds itself in an electromagnetic field, what is its trajectory? And conversely, how does its own radiation "feed back" on it? Together these two questions form the complete dynamical loop of "charged particles and electromagnetic fields"—the particle feels the field, the field is produced by other sources, and the particle's own acceleration radiates outward and loses energy. Cyclotrons, mass spectrometers, electron microscopes, the plasma in a tokamak, and the energetic particles of the Van Allen belts are all governed by one and the same set of equations: the Lorentz-force equation plus relativistic mechanics.

The main thread of this chapter has four steps: first analyse the structure of the Lorentz-force equation itself and its covariant form; then solve the most basic case, cyclotron motion in a uniform magnetic field, establishing the core concepts of cyclotron frequency, cyclotron radius, and invariance of the magnetic moment; next generalise to crossed electric and magnetic fields and derive the drift motion—the basic vocabulary of plasma physics; finally discuss radiation damping: when the radiated power cannot be neglected, the particle must "pay" energy, which is equivalent to a damping force; this fixes the energy ceiling of accelerator design and explains why a perpetual-motion "self-accelerating charge" cannot exist.

## 2. The Lorentz-Force Equation

The force on a charged particle in an electromagnetic field is

$$\vec F = q(\vec E + \vec v\times\vec B)$$

The structure of the Lorentz-force equation deserves close reading. **First**, the force is proportional to the charge $q$ and depends on velocity, but the magnetic part is always perpendicular to the velocity: $\vec v\cdot(q\vec v\times\vec B) = 0$, so the magnetic force does no work and only bends the trajectory; only the electric part does work, with the rate of change of kinetic energy $dE_k/dt = q\vec E\cdot\vec v$. **Second**, the equation is a second-order ordinary differential equation $\vec F = d\vec p/dt$; given the initial position and velocity the trajectory is uniquely determined, and because the force depends only on the present state and not on the acceleration, the theory is self-consistent. **Third**, in the relativistic case it should be written $d\vec p/dt = q(\vec E + \vec v\times\vec B)$ with $\vec p = \gamma m\vec v$—at high speed the "inertia" grows with velocity and the cyclotron frequency falls accordingly, which is why synchrotrons must tune their frequency in step.

The Lorentz force also has a beautiful covariant form. Define the four-force (generalised force) $K^\mu = dp^\mu/d\tau$; then

$$K^\mu = qF^{\mu\nu}U_\nu$$

where $F^{\mu\nu}$ is the electromagnetic field tensor of Chapter 6 and $U_\nu$ the four-velocity. The antisymmetry of $F^{\mu\nu}$ automatically gives $K^\mu U_\mu = 0$ (the four-force is perpendicular to the four-velocity, guaranteeing that the rest mass is unchanged); the spatial components give exactly the three-dimensional Lorentz force, and the time component gives the power $q\vec E\cdot\vec v$. This equation brings "force" into the tensor framework as well, and together with the covariant form of Maxwell's equations it constitutes a complete relativistic electrodynamics.

## 3. Cyclotron Motion in a Uniform Magnetic Field

Let $\vec E = 0$ and $\vec B = B\hat z$. The magnetic force is perpendicular to the velocity, leaves $v_\parallel$ (the component along $\hat z$) and the kinetic energy unchanged, and merely makes the perpendicular component $v_\perp$ rotate uniformly—the particle advances along a helix. Rearranging $m v_\perp^2/r = qv_\perp B$ gives

$$r = \frac{mv_\perp}{qB},\qquad \omega_c = \frac{qB}{m},\qquad T = \frac{2\pi m}{qB}$$

The cyclotron radius is proportional to momentum and inversely proportional to the magnetic field—the principle of the cyclotron and the mass spectrometer; the cyclotron frequency is independent of the particle speed—which is why a classical cyclotron can accelerate with a fixed radio frequency (after relativistic corrections $\omega = \omega_c/\gamma$, so the frequency or the field must be tuned, that is, a synchrotron). Cyclotron motion also defines the magnetic moment of the particle,

$$\mu = \frac{\frac{1}{2}mv_\perp^2}{B}$$

which is an adiabatic invariant in a slowly varying field: as the particle moves into a stronger field $v_\perp$ grows and $v_\parallel$ shrinks until it vanishes and the particle bounces back—the magnetic-mirror effect. The poles of the geomagnetic field trap charged particles in exactly this way, forming the Van Allen belts; a tokamak artificially constructs a "magnetic bottle" to confine fusion plasma. A uniform field is the most basic "integrable" case; motion in a complicated field is usually treated with it as the zeroth-order approximation and drifts as the first-order correction.

Cyclotron motion also has a quantum silhouette: in a uniform magnetic field the energy of a charged particle is quantised into Landau levels $E_n = \hbar\omega_c\left(n + \dfrac{1}{2}\right)$ (plus the kinetic energy of free motion along the field), with level spacing proportional to $B$—the quantum Hall effect and the de Haas–van Alphen oscillations in metals both originate here. Classical cyclotron motion and quantum Landau levels are two readings of the same vector potential, which shows that the kinematics of this chapter is not an "outdated approximation" but the classical limit of a more general quantum theory.

## 4. Motion in Crossed Fields: Drift

When an electric and a magnetic field are present together with $\vec E\perp\vec B$ ("crossed fields"), the motion decomposes into gyration about the magnetic field plus an overall slow drift:

$$\vec v_d = \frac{\vec E\times\vec B}{B^2}$$

The drift velocity is perpendicular to both $\vec E$ and $\vec B$, has magnitude $v_d = E/B$, and is **independent of the sign and the mass of the charge**—positive and negative particles drift together, producing no net current, which is the "gentlest" drift in magnetically confined plasma. Physical intuition: the electric field accelerates the particle over half of its gyro-orbit and decelerates it over the other half, so the curvature of the orbit becomes asymmetric—large on one side and small on the other—the circle is "kneaded" into a cycloid, and the whole translates at $E/B$. When $E < cB$ we have $v_d < c$ and the particle is trapped; when $E > cB$ the magnetic field can no longer hold it and the particle is "peeled off" and escapes—this threshold corresponds exactly to the sign change of the electromagnetic invariant $E^2 - c^2B^2$, echoing the classification of Chapter 6.

Besides the $\vec E\times\vec B$ drift there are two other important drifts: a gravitational or centrifugal force $\vec F_0$ produces $\vec v_d = \vec F_0\times\vec B/(qB^2)$, which depends on the sign of the charge and generates a charge-separation current; magnetic-field gradients and curvature produce gradient and curvature drifts, which run in opposite directions for ions and electrons in toroidal confinement devices and are why a tokamak must rotate its field. The language of drifts is the daily vocabulary of plasma physics and space physics, and all of it comes from successive approximations to the Lorentz-force equation.

The practical arenas of these motions are everywhere. A cyclotron accelerates particles repeatedly with a fixed radio frequency, the radius tracing a spiral as the energy grows; when relativistic effects lower the cyclotron frequency one switches to a frequency-modulated synchrotron, and synchrotron-light sources are the paradigm of turning "the unavoidable radiation from bending" into a tool for probing matter. A mass spectrometer uses $r = mv/(qB)$ to sort ions by charge-to-mass ratio and so distinguish isotopes; in particle-physics experiments the curvature of tracks recorded in a track chamber yields the momentum. The applications of crossed fields are equally striking: in a magnetron electrons perform a cycloidal motion in orthogonal fields and excite microwaves—the heart of a domestic microwave oven is a magnetron; the Hall effect is the solid-state version of crossed-field drift—the balance between the Lorentz force and the transverse electric force gives the Hall voltage, which reflects directly the density and sign of the charge carriers and has become a standard means of characterising semiconductors.

## 5. Radiation Damping: The Particle Pays for Its Own Acceleration

Until Chapter 7 we assumed that the particle merely "feels" the field; now we close the loop: an accelerating particle radiates (the Larmor formula of Chapter 5, $P = q^2a^2/(6\pi\varepsilon_0 c^3)$), the radiation carries away energy and momentum, which is equivalent to the particle being subject to a damping force. In the non-relativistic case energy conservation yields the Abraham–Lorentz force:

$$\vec F_{rad} = \frac{q^2}{6\pi\varepsilon_0 c^3}\,\ddot{\vec v}$$

It depends on the "rate of change of the acceleration", which formally introduces the famous pathological "runaway solution" (the acceleration growing exponentially on its own when the external force vanishes), showing that the classical theory of the point charge has intrinsic difficulties; but in the practical situation where the external force dominates and radiation is only a small correction (the "radiation-damping approximation"), one takes $\ddot{\vec v}\approx \dot{\vec v}_{ext}/m$ and the damping effect can be written self-consistently as the energy lost per period equalling the radiated energy. For circular motion (such as gyration in a magnetic field) the radiated power is constant, and the equivalent damping force is approximately

$$\vec F_{rad} \approx -\frac{P}{v^2}\,\vec v$$

that is, a "velocity drag" whose magnitude is fixed by $P$.

The order of magnitude of radiation damping is usually extremely small—for an electron in a laboratory magnetic field the fraction of energy radiated per period is about $(r_e/r)^2$ (the classical electron radius being $r_e \approx 2.8\times10^{-15}\ \text{m}$), invisible to the eye; but in two situations it becomes the protagonist. First, synchrotron radiation: relativistic electrons bend in a magnetic field and the radiated power is amplified by $\gamma^4B^2$; third-generation synchrotron-light sources and the Crab Nebula in space both shine by it, and it also sets the energy ceiling of a circular accelerator—the energy gain is caught up with by the radiative loss. Second, astrophysics: in pulsar magnetospheres and accretion disks the radiative cooling of particles is entirely governed by the damping term. The classical theory meets its quantum boundary here (the granularity of radiation, the runaway problem), and these are precisely where quantum electrodynamics takes over—but the classical picture has already given the correct energy bookkeeping and the main scaling laws.

To feel the order of magnitude of the damping, introduce the classical electron radius $r_e = \dfrac{e^2}{4\pi\varepsilon_0 m c^2} \approx 2.8\times10^{-15}\ \text{m}$: the ratio of the radiative loss to the particle energy is of order $(r_e/\lambda)^2$ ($\lambda$ being the characteristic length of the motion), about $10^{-8}$ on the atomic scale—in the classical world radiation damping can usually be neglected, but in a synchrotron-light source the amplifying factor $\gamma^4$ pushes it back to centre stage. The self-consistency dilemma of the classical theory (runaway solutions, the divergence of the point-charge self-energy) is ultimately resolved by quantum electrodynamics: renormalisation makes the self-energy reasonable, and the randomness of radiation replaces the deterministic damping force. But as a source of energy bookkeeping and scaling laws, classical radiation damping remains a daily tool of accelerator physics and astrophysics.

## 6. Common Misconceptions

**Misconception 1: Believing the magnetic force can do work.** $(\vec v\times\vec B)\perp\vec v$ holds rigorously, so the magnetic force never does work; all changes in kinetic energy come from the electric field. The energy by which "a magnetic field compresses and heats a plasma" in a confinement device actually comes from the power supply that maintains the field.

**Misconception 2: Forgetting the relativistic correction.** When $v$ approaches the speed of light, the $m$ in $r = mv_\perp/qB$ should be replaced by $\gamma m$, and the cyclotron frequency falls as $1/\gamma$; extrapolating the classical formulas to high energy is seriously misleading.

**Misconception 3: Taking the drift velocity for "acceleration by the electric field".** In crossed fields the particle is not continuously accelerated along the electric field; on average it drifts uniformly perpendicular to it. $v_d = E/B$ has nothing to do with energy gain (over one gyro-period the work done by the electric field cancels).

**Misconception 4: Believing the radiation-damping force can be added to the equation at will.** The Abraham–Lorentz force depends on $\ddot{\vec v}$, and promoting the equation to third order introduces unphysical runaway solutions; the correct procedure is to use the "radiation-damping approximation" only when the external force dominates, treating the radiation as a self-consistent loss of energy.

**Misconception 5: Ignoring collective effects in a neutral multi-particle system.** Beyond the single-particle picture (gyration plus drift), the evolution of the distribution function of a large number of particles is described by the Vlasov equation; single-particle orbits are only the first level of approximation in plasma dynamics.

Finally, note the premise of the Lorentz force: it describes the behaviour of a "test particle" in an external field. When the field produced by the particle itself significantly alters the external field (collective effects in a plasma, space-charge effects in an intense beam), one must return to a joint self-consistent solution of field and particles—Maxwell's equations give the evolution of the field, the Lorentz force gives the motion of the sources, and the sources in turn enter the field equations. This loop is both a challenge (self-consistent computation is complex) and a guarantee (energy and momentum conservation hold automatically); every self-consistent electromagnetic particle simulation is carried out within this framework.

## 7. Worked Example and a Look Back at the Book

Problem electrodynamics-p5 of this chapter examines the situation of a charged particle from the relativistic standpoint: a stationary observer in the laboratory frame sees a pure magnetic field, while in the frame moving with the particle an electric field $E'\approx 2.25\times10^7\ \text{V/m}$ appears—the same motion is described by a magnetic force in one frame and an electric force in another, and the covariant equation $K^\mu = qF^{\mu\nu}U_\nu$ gives the unified answer. This problem joins the field transformations of Chapter 6 with the force equation of this chapter, the last piece of the book's theme of "electromagnetic unification". Looking back over the whole journey: Maxwell's equations (Chapter 1) give the laws of the field, the boundary-value methods (Chapters 2 and 3) solve static problems, waves and radiation (Chapters 4 and 5) reveal the propagation of the field, relativistic covariance (Chapter 6) completes the unification of space and time, and charged-particle dynamics (Chapter 7) closes the loop of interaction between sources and field—the edifice of electrodynamics is now structurally complete.`,
  },
};

export default map;
