import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'constraints-gc': {
    chapter: 'Chapter 1 Constraints and Generalized Coordinates',
    title: 'Constraint Types and Degrees of Freedom: the Map of Analytical Mechanics',
    summary:
      'First separate holonomic from nonholonomic constraints, recognize ideal constraints, count the degrees of freedom and choose good generalized coordinates—every later equation of analytical mechanics is built on this map.',
    keyPoints: [
      'Holonomic constraints restrict only positions (including integrable differential constraints); nonholonomic ones involve velocities and are not integrable',
      'The count s = 3N − k holds only for holonomic constraints; a nonholonomic system may need more coordinates than degrees of freedom',
      'An ideal constraint is one whose reaction forces do zero total virtual work: smooth surfaces, light strings, smooth hinges, rolling without slipping',
      'A virtual displacement is an imagined displacement allowed at a frozen instant (δt = 0); it need not coincide with a real one',
      'Generalized coordinates are not unique; good ones simplify the kinetic energy and make symmetry visible',
      "d'Alembert–Lagrange principle turns dynamics into virtual-work balance at each instant—the bridge to Lagrange's equations",
    ],
    content: String.raw`

The standard Newtonian recipe is to draw the free-body diagram, write out the components of $\vec{F}=m\vec{a}$ and solve—yet the equations are usually cluttered with unknowns: string tensions, normal reactions on inclined planes, hinge forces. These quantities only "keep the geometry intact"; they are not what we care about, yet they occupy half of every equation. Eighteenth-century mathematicians changed the question: since constraints forbid certain motions, the number of truly independent ways a system can move must be smaller than the number of coordinates. So why not count "how it can move" first, describe the configuration with the fewest independent parameters, and then write equations in scalar language such as energy? Constraint forces can then be bypassed entirely.

That is the starting point of analytical mechanics: classifying constraints, counting degrees of freedom, choosing generalized coordinates. They look like mere preparation, but they decide whether Lagrange's equations can be set up at all—choose good coordinates and the equations halve at once; analyse the constraints correctly and conserved quantities appear by themselves. This chapter surveys the terrain of the whole theory: which directions are free, which are pinned by constraints, which reaction forces hide inside virtual work.

## II. Formal Definition

**Constraints and constraint equations**: restrictions on the positions (or velocities) of the particles of a system over time, written as

$$f(\vec{r}_1,\vec{r}_2,\dots,\vec{r}_N,t)=0 \quad\text{or}\quad f(\vec{r}_i,\dot{\vec{r}}_i,t)=0$$

**Holonomic constraints**: geometric constraints on position only, together with differential constraints that contain velocities but integrate to a geometric relation. For example $\dot{x}-t\dot{y}=0$ integrates to $x-ty=C$ and stays holonomic. **Nonholonomic constraints**: velocity constraints that do not integrate—the classic cases are an ice skate (the blade forbids sideways sliding) and rolling without slipping on a general surface.

**Scleronomic and rheonomic constraints**: if the constraint equation does not contain $t$ explicitly it is scleronomic (a fixed sphere); if it contains $t$ it is rheonomic (a surface that moves or deforms in time).

**Virtual displacement**: an imagined infinitesimal displacement $\delta\vec{r}_i$ allowed by the constraints at a fixed instant, with time frozen ($\delta t=0$). It differs from the real displacement $d\vec{r}$: the real one unfolds in time and is uniquely fixed by the dynamics, whereas virtual ones are merely a set of geometrically possible alternatives, freely combined in linear combination.

**Ideal constraint**: the reaction forces do zero total virtual work on any virtual displacement,

$$\sum_{i=1}^{N}\vec{F}_{Ni}\cdot\delta\vec{r}_i=0$$

Smooth contacts, inextensible light strings, smooth hinges, internal constraints of a rigid body and rolling without slipping (contact point instantaneously at rest) are all ideal. This condition underlies the principle of virtual work and the d'Alembert–Lagrange principle, and it is where the promise "equations without solving for constraint forces" is cashed in.

**Generalized coordinates and degrees of freedom**: a set of independent parameters $q_1,\dots,q_s$ that completely fixes the configuration. The number of degrees of freedom is

$$s = 3N - k$$

where $N$ is the number of particles and $k$ the number of independent holonomic constraints. For holonomic systems the number of generalized coordinates equals the degrees of freedom; for nonholonomic ones it does not—there may be more coordinates than degrees of freedom, because velocity constraints still "eat" some independent modes.

## III. Why It Works This Way

**Why freeze time for virtual displacements?** A virtual displacement answers "which other positions are geometrically possible right now", comparing alternatives at one instant. If time were allowed to flow the constraint surface itself would move and the comparison would change meaning. Under rheonomic constraints real and virtual displacements may be unrelated: for a shrinking spherical constraint the real displacement may point inside the sphere while any inward virtual displacement is forbidden—clearly two different notions.

**Why are ideal constraints so important?** They make reaction forces invisible in virtual work: without knowing tensions or normal forces you can write equations containing only applied forces. Smooth surfaces, light strings and hinges are ideal because the reactions are orthogonal to virtual displacements; rolling without slipping has static friction, but the virtual displacement of the contact point is zero, so its virtual work vanishes and it is ideal too. The whole edifice rests on the promise of "never solving for constraint forces".

**Why count degrees of freedom as $3N-k$?** Each particle has 3 coordinates in space and each independent holonomic constraint removes one parameter. When $N$ particles are tied into a rigid body by enough rigid rods, $s=6$ (3 translations + 3 rotations)—the origin of "a free rigid body has six degrees of freedom"; fix one point and only $s=3$ rotational degrees remain.

**Why choose generalized coordinates carefully?** They are not unique, and good ones simplify the kinetic energy and expose symmetry. In a central field, using polar coordinates $(r,\varphi)$ removes the angle $\varphi$ from the Lagrangian altogether, so angular momentum conservation is obvious. This is the model of "pick the right coordinates and the physics falls out", and the seed of cyclic-coordinate theory.

## IV. Typical Calculations

**Example 1: counting degrees of freedom.** (a) A free particle: $s=3$. (b) A spherical pendulum—a particle on a light rigid rod of length $l$ fixed at a point: constraint $x^2+y^2+z^2=l^2$, $s=3-1=2$, with coordinates $(\theta,\varphi)$. (c) Two particles in a plane joined by a light rigid rod of length $l$: $N=2$, $k=1$, $s=6-1=5$. (d) A general rigid body $s=6$; rotating about a fixed point $s=3$, exactly described by three Euler angles.

**Example 2: classifying constraints.** A particle confined to a sphere of time-varying radius $x^2+y^2+z^2=R^2(t)$: geometric (holonomic), rheonomic. A cylinder rolling without slipping on a horizontal line: the condition $\dot{x}=R\dot{\theta}$ contains velocities but integrates to $x=R\theta+C$, so it is still holonomic; however a disk rolling and simultaneously turning (possibly steering) on a plane has a rolling condition involving the heading angle that does not integrate—a typical nonholonomic constraint. "Contains velocities" does not mean "nonholonomic"; integrability is the dividing line.

**Example 3: equilibrium by virtual work.** Blocks of mass $m_1$, $m_2$ rest on two smooth inclined planes of angles $\alpha$, $\beta$ and are joined by a light string over a pulley at the top. The string is inextensible (ideal), so with coordinates along the string $s_1+s_2=\text{const}$ and $\delta s_2=-\delta s_1$. Only gravity does work:

$$\delta W = m_1 g\sin\alpha\,\delta s_1 + m_2 g\sin\beta\,\delta s_2 = \left(m_1 g\sin\alpha - m_2 g\sin\beta\right)\delta s_1$$

Setting $\delta W=0$ for arbitrary $\delta s_1$ gives $m_1\sin\alpha = m_2\sin\beta$. The tension never appears—ideal constraints remove unknown internal forces completely, which is the power of virtual work.

**Example 4: nonholonomic systems have more coordinates than degrees of freedom.** An ice skate on a horizontal rink: the configuration needs $(x,y,\theta)$ where $\theta$ is the blade heading; the velocity constraint $\dot{x}\sin\theta-\dot{y}\cos\theta=0$ (no velocity perpendicular to the blade) does not integrate, so the system has 2 degrees of freedom but needs 3 coordinates. "Number of coordinates equals degrees of freedom" holds only for holonomic systems.

## V. Common Pitfalls

**Pitfall 1: calling every velocity constraint nonholonomic.** The test is integrability, not appearance: $\dot{x}=t\dot{y}$ integrates to $x-ty=C$ and is holonomic; skate and general rolling conditions do not integrate and are nonholonomic. For beginners, "rolling along a straight line is holonomic, steering rolling is not" covers the two representative cases.

**Pitfall 2: confusing degrees of freedom with number of coordinates.** They coincide for holonomic systems; nonholonomic systems need more coordinates. When counting, count only independent holonomic constraints—duplicate or derivable equations do not add to $k$.

**Pitfall 3: treating every frictional contact as non-ideal.** Ideality depends on the virtual work of the reaction, not on the presence of friction. Rolling contact has static friction, but the contact point's virtual displacement is zero, so the virtual work vanishes and the constraint is ideal; only sliding friction does virtual work and must be treated as non-ideal.

**Pitfall 4: mixing real and virtual displacements.** Only under scleronomic constraints is the real displacement one of the infinitely many virtual ones; under rheonomic constraints they may differ completely, and virtual work must use virtual displacements.

**Pitfall 5: assuming coordinates must be independent.** If the parameters chosen are not independent (for instance Cartesian coordinates of two particles joined by a rigid rod), Lagrange's method does not apply directly; Lagrange multipliers and the first-kind equations are needed.

## VI. Extensions

On the basis of ideal constraints and virtual displacements, d'Alembert's principle brings inertial forces into the virtual-work balance: $\sum_i(\vec{F}_i-m_i\vec{a}_i)\cdot\delta\vec{r}_i=0$, turning dynamics into an instantaneous balance problem. Parameterizing virtual displacements by generalized coordinates, $\delta\vec{r}_i=\sum_\alpha \frac{\partial\vec{r}_i}{\partial q_\alpha}\delta q_\alpha$, defines the **generalized force**

$$Q_\alpha = \sum_i \vec{F}_i\cdot\frac{\partial\vec{r}_i}{\partial q_\alpha}$$

and the inertial term, after integration by parts, becomes the left-hand side of Lagrange's equations in the next chapter. After this chapter you should be able to perform the standard three steps on any system: count degrees of freedom, choose generalized coordinates, verify ideality. Conversely, when the count is unclear or the coordinates are dependent, recognize that multipliers or new coordinates are needed rather than forcing the formula.

## VII. Worked Examples and Error Warnings

**Example 5: the lever by virtual work.** A light rigid rod of length $L$ turns about a smooth horizontal axis at one end $O$; weights $P$ and $Q$ hang at distances $a$ and $b$ from $O$. Take the angle $\theta$ with the horizontal as generalized coordinate, so the heights are $y_1 = -a\sin\theta$, $y_2 = -b\sin\theta$ (upward positive). The smooth axis, the light rod and the string are ideal, so reactions and internal forces never enter:

$$\delta W = -P\,\delta y_1 - Q\,\delta y_2 = (Pa - Qb)\cos\theta\,\delta\theta$$

Setting $\delta W = 0$ for arbitrary $\delta\theta$ gives $Pa = Qb$—the lever principle memorized in school is simply the oldest application of virtual work. No tension or reaction appears anywhere; Newton's method would have introduced two unknown constraint forces only to eliminate them again.

**Example 6: degrees of freedom of a four-bar linkage.** A planar four-bar linkage has 3 moving links (the frame is fixed) and 4 smooth cylindrical hinges. Each moving link has 3 planar degrees of freedom (2 translations + 1 rotation), so $3\times 3 = 9$; each hinge removes 2 relative degrees, and 4 hinges remove 8. Hence $s = 9 - 8 = 1$: one input angle determines the whole motion. This is why mechanical design requires the number of degrees of freedom to equal the number of actuators—more freedom and the mechanism flops, fewer and it locks. The bookkeeping "sum over links, subtract per constraint" is the same $3N-k$ idea transplanted to mechanism and robotics.

**Summary of error warnings.** Marks are lost in three places: misjudging an integrable velocity constraint as nonholonomic (or the reverse)—remember integrability is the test; double-counting the same constraint in different forms or missing hidden ones (sliding on a surface implies zero normal displacement); and using dependent generalized coordinates without noticing—contradictory or "multiple" solutions are the warning sign. Before writing equations, sketch the constraints, label the independent parameters and write the constraint equations.`,
  },

  'lagrange-eq': {
    chapter: 'Chapter 2 Lagrange Equations',
    title: 'From Newton to Lagrange: Mechanizing the Language of Energy',
    summary:
      'Feed L = T − V into the second-kind Lagrange equations and the mechanical routine "write energy, differentiate" generates every equation of motion; cyclic coordinates hand over conservation laws directly.',
    keyPoints: [
      'Second-kind Lagrange equations: d/dt(∂L/∂q̇_α) − ∂L/∂q_α = 0 (conservative); for non-conservative forces the right side is the generalized force Q_α',
      'The generalized momentum p_α = ∂L/∂q̇_α unifies linear and angular momentum',
      'A cyclic coordinate (∂L/∂q_α = 0) reflects a symmetry, and the corresponding generalized momentum is conserved',
      'If L does not contain t explicitly there is an energy integral h = Σq̇_α p_α − L, and h = T + V for scleronomic constraints',
      'Standard routine: count degrees of freedom, choose coordinates, write T and V, substitute, read off conservation laws',
      'L = T − V holds only when the generalized forces are derivable from a potential; with friction use the general form or a dissipation function',
    ],
    content: String.raw`

Newtonian vector mechanics on a constrained system means decomposing vectors, projecting, eliminating unknowns—handicraft for every problem. Lagrange found something striking: pick generalized coordinates, write one scalar function—the Lagrangian $L = T - V$—and then mechanically "differentiate, differentiate again, subtract", and all equations of motion appear. Constraint forces never show up, and the coordinates can be angles, arc lengths, anything convenient. Mechanics turns from an art of drawing into a form-filling procedure.

Better still, the procedure reads the table for you: once the equations are written, scanning which coordinates are absent from $L$ hands you the conservation laws. The deep link between symmetry and conservation first appears here as the "cyclic coordinate", foreshadowing Noether's theorem. The goal of this chapter is to make this energy language fluent enough for typical systems: pendulum, inclined plane, wedge, central field.

## II. Formal Definition

**Generalized force**: the "component" of the applied forces along a generalized coordinate,

$$Q_\alpha = \sum_i \vec{F}_i\cdot\frac{\partial\vec{r}_i}{\partial q_\alpha}, \qquad \delta W = \sum_\alpha Q_\alpha\,\delta q_\alpha$$

When the forces come from a potential $V(q,t)$, $Q_\alpha = -\dfrac{\partial V}{\partial q_\alpha}$.

**Lagrangian and second-kind Lagrange equations**: for a holonomic system with potential forces, define $L(q,\dot{q},t)=T-V$; the equations of motion are

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{q}_\alpha} - \frac{\partial L}{\partial q_\alpha} = 0, \qquad \alpha = 1,2,\dots,s$$

If not all generalized forces are potential, replace the right side by $Q_\alpha$. These are $s$ second-order ODEs; by contrast the first-kind equations keep constraint forces explicitly through Lagrange multipliers and suit reaction-force problems.

**Generalized momentum**:

$$p_\alpha = \frac{\partial L}{\partial \dot{q}_\alpha}$$

In Cartesian coordinates it is the usual momentum $m\dot{x}$; in polar coordinates the derivative with respect to $\dot{\varphi}$ gives $mr^2\dot{\varphi}$, the angular momentum. One concept covers translational and rotational inertia alike.

**Cyclic coordinates and conservation**: if $L$ does not contain $q_\alpha$ explicitly ($\partial L/\partial q_\alpha = 0$), the coordinate is cyclic and

$$\frac{d}{dt}\,p_\alpha = \frac{\partial L}{\partial q_\alpha} = 0 \;\Longrightarrow\; p_\alpha = \text{constant}$$

**Energy integral**: if $L$ does not contain $t$ explicitly,

$$h = \sum_\alpha \dot{q}_\alpha\,\frac{\partial L}{\partial \dot{q}_\alpha} - L = \text{constant}$$

When the constraints are scleronomic (the coordinate transformation does not contain $t$) and the potential does not depend on velocities, $h = T + V$, the usual mechanical energy.

## III. Why It Works This Way

**Why can $\partial L/\partial\dot{q}_\alpha$ be called momentum?** Differentiation is sensitivity to how fast things move. In Cartesian coordinates $L = \frac12 m\dot{x}^2 - V$ and the sensitivity is $m\dot{x}$; in polar coordinates $L$ contains $r^2\dot{\varphi}^2$ and the sensitivity to $\dot{\varphi}$ is $mr^2\dot{\varphi}$—the farther from the axis and the faster the spin, the "harder" it is to change the angular rate. That is angular momentum. Generalized momentum is not an analogy but the same object wearing different coordinates.

**Why does $\partial L/\partial q_\alpha$ act as a generalized force?** For conservative forces $-\partial V/\partial q_\alpha$ is the downhill slope of the potential in that direction; Lagrange's equation says the rate of change of generalized momentum equals that downhill push. The equation $m\ddot{x}=-dV/dx$ is only its Cartesian special case.

**Why do cyclic coordinates signal symmetry?** $\partial L/\partial q_\alpha = 0$ means shifting $q_\alpha$ by a constant leaves $L$ unchanged—the analytic statement of symmetry under that transformation. Translation symmetry gives momentum conservation, rotational symmetry angular momentum, time translation energy. Conservation laws stop being coincidences and become the bookkeeping of symmetry. The practical trick is therefore: choose variables that make $L$ "miss a coordinate or miss time".

**Why does kinetic energy so often carry cross terms?** With non-orthogonal generalized coordinates (polar, oblique), the basis vectors are not orthogonal, so the quadratic form picks up terms like $2m\dot{x}\dot{s}\cos\alpha$. They are not errors but faithful records of the coordinate geometry; dropping a cross term is the most common accident in Lagrangian calculations.

## IV. Typical Calculations

**Example 1: the simple pendulum.** With angle $\theta$ and length $l$: $T = \frac12 ml^2\dot{\theta}^2$, $V = mgl(1-\cos\theta)$, so

$$L = \frac12 ml^2\dot{\theta}^2 - mgl(1-\cos\theta)$$

Substituting: $\dfrac{d}{dt}(ml^2\dot{\theta}) + mgl\sin\theta = 0$, i.e. $\ddot{\theta} + \dfrac{g}{l}\sin\theta = 0$. For small oscillations $\sin\theta\approx\theta$ gives $T_0 = 2\pi\sqrt{l/g}$. The rod tension never appears.

**Example 2: a block on a fixed incline.** With arc length $s$ downward along the plane: $L = \frac12 m\dot{s}^2 + mg s\sin\alpha$ (zero of potential arbitrary), giving $m\ddot{s} = mg\sin\alpha$—the same as Newton, without the normal reaction.

**Example 3: central field and angular momentum.** In polar coordinates $L = \frac12 m(\dot{r}^2 + r^2\dot{\varphi}^2) - V(r)$. Since $\varphi$ is cyclic,

$$p_\varphi = mr^2\dot{\varphi} = \text{constant}$$

which is Kepler's second law in analytic form. Substituting into the energy integral $h = \frac12 m\dot{r}^2 + \dfrac{p_\varphi^2}{2mr^2} + V(r)$ reduces the radial motion to a one-dimensional effective-potential problem, with $p_\varphi^2/(2mr^2)$ the familiar centrifugal barrier.

**Example 4: block on a movable wedge (preview).** Two coordinates $x$ (wedge position) and $s$ (block's slide along the face); the kinetic energy contains the cross term $m\dot{x}\dot{s}\cos\alpha$. Horizontal translation symmetry makes $x$ cyclic, so total horizontal momentum is conserved—details in the paired problem.

## V. Common Pitfalls

**Pitfall 1: assuming $L = T - V$ always holds.** It requires potential forces; with sliding friction or air drag the right side must include non-conservative generalized forces, or a Rayleigh dissipation function. Blind use "manufactures" energy.

**Pitfall 2: forgetting to express the potential in generalized coordinates.** The potential must be a function of the chosen coordinates before differentiating. Gravity can be $mgz$ or $-mg s\sin\alpha$; mixing two coordinate systems is the commonest elementary error.

**Pitfall 3: wrong cyclic criterion.** The test is $\partial L/\partial q_\alpha = 0$ (derivative with respect to the coordinate), not with respect to the velocity; whether $q_\alpha$ "appears" must be judged from both $T$ and $V$.

**Pitfall 4: differentiating once and forgetting $d/dt$.** After $\partial L/\partial\dot{q}_\alpha$ you still need the total derivative, which acts on explicit $t$, on $q$ and on $\dot{q}$—no step of the chain rule can be skipped.

**Pitfall 5: using dependent parameters as coordinates.** Generalized coordinates must be independent, otherwise the system is overdetermined and the answer wrong. Check by counting: the number of parameters must equal $s$.

## VI. Extensions

The value of Lagrange's equations shows in complex systems: multiple pendulums, mechanisms, coupled rotor systems, where Newton's method would disentangle dozens of internal forces. It also accommodates non-inertial frames naturally—write the frame's acceleration into $L$ as an effective potential or as a time-dependent coordinate transformation. Deeper still, Lagrange's equations are the Euler equations of the next chapter's Hamiltonian principle: the single statement that the action $S=\int L\,dt$ is stationary is equivalent to all of them. The cyclic-coordinate/conservation correspondence rises to Poisson brackets and canonical transformations, and finally to Noether's theorem: every continuous symmetry corresponds to a conserved quantity. Make "symmetry implies conservation" an instinct: ask about translation, rotation and time-translation symmetry first, since the conservation list often arrives before the equations of motion.

## VII. Worked Examples and Error Warnings

**Example 5: Atwood machine by Lagrange.** A massless smooth pulley carries a light string with masses $m_1 > m_2$. With $x$ the downward displacement of $m_1$: $T = \tfrac12(m_1+m_2)\dot{x}^2$, and with the initial position as zero, $V = -(m_1-m_2)gx$, so

$$L = \tfrac12(m_1+m_2)\dot{x}^2 + (m_1-m_2)gx$$

Lagrange's equation gives $(m_1+m_2)\ddot{x} = (m_1-m_2)g$, i.e. $a = \dfrac{m_1-m_2}{m_1+m_2}\,g$. No tension appears; if it is wanted, solve $m_1 g - T = m_1 a$ afterwards for a single particle. "Solve the motion first, recover constraint forces later" is the standard division of labour.

**Example 6: spring pendulum and dimensional reduction by a cyclic coordinate.** On a smooth horizontal table a particle of mass $m$ is attached to a fixed point $O$ by a light spring of natural length $r_0$ and stiffness $k$. In polar coordinates $L = \tfrac12 m(\dot{r}^2 + r^2\dot{\varphi}^2) - \tfrac12 k(r-r_0)^2$. The angle $\varphi$ is cyclic, so $p_\varphi = mr^2\dot{\varphi}$ (angular momentum about $O$) is conserved. Substituting into the energy integral reduces the radial problem to

$$V_{\text{eff}}(r) = \tfrac12 k(r-r_0)^2 + \frac{p_\varphi^2}{2mr^2}$$

The spring attracts near $r_0$ while the centrifugal term repels strongly at small $r$; they balance at some $r^* > r_0$ where the effective potential has a minimum—the particle orbits while oscillating stably about $r^*$. A two-degree-of-freedom system is reduced to a one-dimensional problem with a centrifugal barrier, exactly parallel to Kepler's problem.

**Summary of error warnings.** Before writing equations, check three things: are there exactly $s$ independent coordinates; are the cross terms of $T$ complete (the wedge's $2\dot{x}\dot{s}\cos\alpha$ is a classic loss); is the cyclic criterion mistakenly written as zero derivative with respect to $\dot{q}$? After solving, test consistency with the conservation laws: the time derivative of momentum conservation must agree with the equations, and the total derivative of the energy integral must vanish.

**Example 7: pendulum in a lift—a non-inertial frame is just a coordinate change.** A lift accelerates upward at $a$ and carries a pendulum of length $l$. Write the bob's coordinates in the inertial frame and substitute the translation $z = z' + \tfrac12 at^2$ into the Lagrangian:

$$L = \tfrac12 ml^2\dot{\theta}^2 + ml(g+a)\cos\theta$$

equivalent to replacing $g$ by $g+a$, giving $\omega = \sqrt{(g+a)/l}$ and a shorter period than on the ground. No inertial-force formula appears anywhere: in the Lagrangian framework a non-inertial frame is only a coordinate transformation, and inertial forces enter as corrections to the potential. If the lift accelerates downward with $a>g$ the "effective gravity" changes sign, the pendulum hangs upside down, and the formula still predicts correctly.

**Study advice.** Practise in this order: solve three standard problems completely with this chapter's routine (fixed incline, Atwood machine, spring pendulum), then attempt a coupled system with a cyclic coordinate (a movable wedge), and after each write a one-line "conservation list". Once the five steps—count, choose, write $T$ and $V$, substitute, read conservation—become muscle memory, Chapter 2 is no longer a set of formulas but a portable equation-generating machine.

**Method summary.** Lagrange's mechanics is the art of generating vector equations from a scalar. Three hurdles: coordinates (use angles, arc lengths, relative slides, always independent and exactly $s$ in number); energy (write every cross term of $T$ and every constant of $V$ honestly); structure (read generalized momenta, cyclic coordinates and the energy integral from the equations, and use them to check the result). Clear the three and you will find Lagrange's equations a machine with a transparent structure: feed in coordinates and energy, get out equations of motion and conservation laws. Later, the variational principle will explain why it runs—the action is stationary—and Hamiltonian mechanics will show its more powerful engine.`,
  },

  'variational-principle': {
    chapter: 'Chapter 3 Variational Principles',
    title: "Hamilton's Principle: All of Mechanics in One Sentence",
    summary:
      'The true motion makes the action S = ∫L dt stationary—Hamilton\u2019s principle sums up all of mechanics in one sentence, and the Euler equation of the calculus of variations is Lagrange\u2019s equation.',
    keyPoints: [
      'The variation δJ of a functional is the first-order change caused by perturbing the shape of a function—a different object from an ordinary differential',
      'With fixed endpoints, integration by parts removes the boundary term and δS = 0 yields the Euler–Lagrange equation',
      "Hamilton's principle δ∫L dt = 0 is fully equivalent to the second-kind Lagrange equations (for conservative systems)",
      '"Least action" is really "stationary action": the true path may be a minimum, maximum or saddle',
      'The brachistochrone is a cycloid and the geodesic on a sphere a great circle—two calling cards of the calculus of variations',
      'Isochronous variations satisfy δq̇ = d(δq)/dt, so variation commutes with differentiation',
    ],
    content: String.raw`

Ancient scholars were fascinated by the idea that nature acts by some "economy principle". Hero of Alexandria argued from reflection that light takes the shortest path; Fermat corrected this to "the path of least time" and derived the laws of reflection and refraction. In the seventeenth and eighteenth centuries Maupertuis claimed motion also follows "least action", and Lagrange and Hamilton gradually polished this vague assertion into a precise mathematical principle. Today we know the true motion need not minimize the action, but it must make it **stationary**—like a ball resting at the bottom of a bowl or balanced on its rim, where the first-order effect of any small disturbance vanishes.

Hamilton's principle is that sentence: among all motions satisfying the constraints and agreeing with the given positions at the two end times, the actual motion makes

$$\delta S = \delta\int_{t_1}^{t_2} L\,dt = 0$$

One principle, one integral sign, and the whole domain of Newton's three laws is taken over. It supplies no new force; it gives existing dynamics a global, geometric formulation—and it is precisely that globality which made it the common language of field theory, general relativity and even quantum path integrals.

## II. Formal Definition

**Functional**: a quantity whose argument is a function. Given a curve $y(x)$,

$$J[y] = \int_{x_1}^{x_2} F\left(x, y, y'\right)dx$$

maps a whole curve to a number. The action $S = \int_{t_1}^{t_2} L(q,\dot{q},t)\,dt$ maps a path $q(t)$ to a real number.

**Variation**: perturb the path, $q(t)\to q(t)+\delta q(t)$, with $\delta q(t)$ a small smooth function vanishing at the ends, $\delta q(t_1)=\delta q(t_2)=0$. The first-order change

$$\delta J = \int_{x_1}^{x_2}\left(\frac{\partial F}{\partial y}\,\delta y + \frac{\partial F}{\partial y'}\,\delta y'\right)dx$$

is the first variation. Isochronous variation commutes with differentiation: $\delta y' = \dfrac{d}{dx}(\delta y)$.

**Euler–Lagrange equation**: integrate the $\delta y'$ term by parts; the boundary term dies because the endpoints are fixed, and since $\delta y$ is arbitrary inside the interval (fundamental lemma of the calculus of variations), $\delta J=0$ is equivalent to

$$\frac{\partial F}{\partial y} - \frac{d}{dx}\frac{\partial F}{\partial y'} = 0$$

**Hamilton's principle**: in a conservative holonomic system the true motion makes the action stationary under all variations vanishing at the endpoints. Replacing $F$ by $L$ and the independent variable by $t$, the Euler equation becomes verbatim the second-kind Lagrange equation—Chapters 2 and 3 meet here.

## III. Why It Works This Way

**How does variation differ from differentiation?** Differentiation asks how much a function value changes when a number changes; variation asks how much a functional changes when the whole curve changes shape. The independent variable is a number in one case, a function in the other. But the technique is the same: first-order expansion and stationarity. The power of extremal principles is that they replace "solve a differential equation" with "find a stationary curve", geometrizing the problem globally.

**Why must the endpoints be fixed?** The boundary term $[p\,\delta y]_{x_1}^{x_2}$ from integration by parts vanishes only when the variations vanish there, which is what makes the Euler equation hold. With free endpoints the boundary term must vanish by itself, yielding extra "natural boundary conditions"—an extension essential in elastic plates and fracture mechanics.

**Why "least" if only stationarity is guaranteed?** The sign of the second variation $\delta^2 S$ decides the nature: positive definite is a minimum, negative definite a maximum, indefinite a saddle. For short enough time intervals the action is usually minimal; over longer times conjugate points appear and the true path is often merely a saddle. The accurate name is the "principle of stationary action"; "least action" is a historical habit.

**Why can mechanics be written as a variational principle?** For conservative holonomic systems stationarity and the equations of motion are equivalent at every instant. But the variational statement replaces the instant-by-instant causal narrative with a global property of the whole path—one sentence, one scalar, easy to transplant: replace $L$ by a Lagrangian density and you get field equations; sum over all paths instead of selecting the stationary one and you step into the path-integral formulation of quantum mechanics.

## IV. Typical Calculations

**Example 1: the brachistochrone.** Find the curve down which a bead slides under gravity from the origin to a fixed point $(a,b)$ in the shortest time. With $y$ downward, energy conservation gives $v=\sqrt{2gy}$ and the time functional

$$T[y] = \int_0^a \sqrt{\frac{1+y'^2}{2gy}}\,dx$$

$F$ does not contain $x$, so the Beltrami identity $F - y'\dfrac{\partial F}{\partial y'} = C$ reduces this to $y(1+y'^2)=2a$ (with $a$ a constant). The parametrization $y = a(1-\cos t)$, $x = a(t-\sin t)$ is a **cycloid**, not the straight line or circular arc of intuition. Solved by the Bernoulli brothers, the problem is regarded as the birth certificate of the calculus of variations.

**Example 2: geodesics on a sphere.** The length of a curve on the unit sphere is $J = \int\sqrt{\sin^2\theta + \theta'^2}\,d\varphi$ (with longitude $\varphi$ as parameter). Stationary curves satisfy the Beltrami relation $\sin^2\theta/\sqrt{\sin^2\theta+\theta'^2}=C$, whose solutions are **great circles**—the shortest paths between two points on a sphere. Air routes follow great circles rather than parallels, a daily demonstration of the variational principle.

**Example 3: deriving the harmonic oscillator from Hamilton's principle.** With $L = \frac12 m\dot{x}^2 - \frac12 kx^2$ and $S=\int L\,dt$, varying the path and integrating by parts:

$$\delta S = \int_{t_1}^{t_2}\left(m\dot{x}\,\delta\dot{x} - kx\,\delta x\right)dt = -\int_{t_1}^{t_2}(m\ddot{x} + kx)\,\delta x\,dt = 0$$

Since $\delta x$ is arbitrary, $m\ddot{x}+kx=0$. One integration by parts "varies out" Newton's second law.

**Example 4: reading conservation laws off the principle.** If $L$ does not contain a coordinate, the action is invariant under translating it and the Euler equation gives conservation of the corresponding generalized momentum; if $L$ has no explicit $t$, then $h=\sum\dot{q}p_q - L$ is conserved. From the variational viewpoint conservation laws are readings of the symmetries of the principle—the seed of Noether's theorem.

## V. Common Pitfalls

**Pitfall 1: confusing "stationary" with "least".** Over long times the action is often a saddle value; the correct statement is $\delta S=0$. Writing "least action" in an exam usually costs nothing, but you must understand that only stationarity is meant.

**Pitfall 2: guessing the rules of variation.** Isochronous variations satisfy $\delta\dot{q}=d(\delta q)/dt$ and $\delta(\partial L/\partial\dot{q}) = \partial(\delta L)/\partial\dot{q}$: variation commutes with differentiation and partial differentiation. But variation cannot be freely interchanged with time integration—that is exactly what must be argued separately.

**Pitfall 3: ignoring boundary conditions.** The fixed-endpoint assumption must not be silently dropped; when a problem says "one end free" or "the endpoint slides on a curve", the corresponding natural or transversality conditions must be added, or the solution is incomplete.

**Pitfall 4: expecting new physics.** For a given system Hamilton's principle is fully equivalent to Newton's and Lagrange's equations, merely a different formulation; its value is the universal framework and its power to generalize, not new forces or terms.

**Pitfall 5: forcing it on non-conservative systems.** With friction or external driving you cannot simply write $\delta\int L\,dt=0$; the generalized d'Alembert–Lagrange principle is needed, adding non-conservative generalized forces as extra terms.

## VI. Extensions

The variational principle is the first bridge from theoretical mechanics to modern physics. Hamilton himself noticed the mathematical isomorphism between action and Fermat's optical path, and developed the picture of orbits as "rays" and action wavefronts as "wave surfaces"; a century later Schrödinger followed the analogy "geometric optics → wave optics" and upgraded the Hamilton–Jacobi equation into a wave equation, and quantum mechanics was born. In the mid-twentieth century Feynman replaced "select the stationary path" by "sum over all paths": when the action is much larger than $\hbar$ the phases of non-stationary paths cancel and only the stationary path survives—the classical variational principle becomes the stationary-phase approximation of a quantum one. This chapter is more than drill: it displays the most effective working style of theoretical physics—find a universal extremal (stationary) principle and let the equations be corollaries.

## VII. Worked Examples and Error Warnings

**Example 5: proving and using the Beltrami identity.** When $F(x,y,y')$ does not contain $x$, consider the total derivative of $F - y'\dfrac{\partial F}{\partial y'}$:

$$\frac{d}{dx}\left(F - y'\frac{\partial F}{\partial y'}\right) = y'\left(\frac{\partial F}{\partial y} - \frac{d}{dx}\frac{\partial F}{\partial y'}\right)$$

(the two terms containing $y''$ cancel on expansion). If the Euler equation holds the right side vanishes, so $F - y'F_{y'} = C$: a second-order equation reduced to first order. The brachistochrone becomes integrable precisely this way. Rule of thumb: if $F$ misses $x$, use Beltrami; if $F$ misses $y$, then $\partial F/\partial y' = C$ integrates once directly. Read off the first integral corresponding to whichever variable is missing—that is the first reflex in variational problems.

**Example 6: the catenary and Lagrange multipliers.** A uniform chain hangs between two points; at equilibrium its centre of mass is lowest with the length $L$ fixed:

$$J[y] = \int y\sqrt{1+y'^2}\,dx \to \min, \qquad \int\sqrt{1+y'^2}\,dx = L$$

Introducing a multiplier $\lambda$ and applying Beltrami to $F = (y+\lambda)\sqrt{1+y'^2}$ ($F$ has no explicit $x$) gives $(y+\lambda)/\sqrt{1+y'^2} = c$, hence

$$y + \lambda = c\cosh\!\left(\frac{x-x_0}{c}\right)$$

the catenary. The physical "lowest centre of mass" and the mathematical "constrained variation" meet here; the multiplier trick of turning a constrained variation into an unconstrained one recurs in optimization, statistical physics and constrained variational methods in quantum mechanics.

**Summary of error warnings.** The first step of any variational problem is to establish three things: the integrand, the endpoint conditions, whether there are extra constraints. After integration by parts, state where the boundary term goes (removed for fixed endpoints, natural conditions for free ones); the conclusion "the integrand vanishes because $\delta x$ is arbitrary" must rest on the fundamental lemma, not on "obviously". Finally check dimensions and limits: the action has dimensions of energy times time; special cases of the solution should reproduce known results.

**Example 7: deriving Snell's law from the variational principle.** Light crosses an interface $y=0$ between two media with speeds $v_1$ and $v_2$, vertical distances $h_1$, $h_2$ and total horizontal distance $d$. With crossing abscissa $x$ the total time is

$$T(x) = \frac{\sqrt{h_1^2 + x^2}}{v_1} + \frac{\sqrt{h_2^2 + (d-x)^2}}{v_2}$$

Setting $\partial T/\partial x = 0$ and simplifying gives

$$\frac{\sin\theta_1}{v_1} = \frac{\sin\theta_2}{v_2}$$

Snell's law—Fermat's most famous trophy. Note that the crossing point sliding along the interface is a "movable endpoint" variation: the condition is a transversality condition, of which the equation above is the concrete form. Extended to a continuously stratified medium $v(y)$ the same principle yields the differential equation of a bent ray, so atmospheric refraction and mirages can be computed; in mechanics the analogue is the continuity of the tangential momentum when a particle crosses a potential step. That correspondence is the heart of Hamilton's optical-mechanical analogy.

**Study advice.** Train "geometry first, computation second": draw the geometric meaning of the functional (length, time, energy), fix endpoints and constraints, then write the integrand. The usual slips are signs in integration by parts and the fate of the boundary term; write the derivation of $\delta S$ three times—brachistochrone, oscillator, catenary—and every later variational derivation is a combination of these three.

**Method summary.** Three sentences capture the chapter: first, the fundamental laws of mechanics can be written as "some functional is stationary", the equations of motion being corollaries rather than starting points; second, finding stationary points of functionals runs parallel to finding extrema of functions—first variation to first derivative, Euler equation to stationarity, second variation to the extremum test—so "least" only guarantees stationarity; third, endpoint conditions and constraints are inseparable parts of a variational problem, and both the boundary term and the multipliers grow from there. With these three sentences, the brachistochrone, the catenary and geodesics are not three isolated puzzles but three test runs of the same machine. The variational idea returns throughout physics: minimum potential energy in elasticity, ray equations in optics, variational methods and path integrals in quantum mechanics—all share this grammar: set up the functional, demand stationarity, and the equations appear.`,
  },

  'hamilton-eq': {
    chapter: 'Chapter 4 Hamiltonian Mechanics',
    title: 'Canonical Equations and Phase Space: Drawing Motion as a Curve',
    summary:
      'A Legendre transform turns L(q, q̇) into H(q, p); the equations of motion become 2s first-order canonical equations, and mechanics becomes geometry in phase space.',
    keyPoints: [
      'H(q,p,t) = Σp_αq̇_α − L, with every q̇ eliminated in favour of the generalized momentum p',
      'Canonical equations q̇ = ∂H/∂p, ṗ = −∂H/∂q are symmetric: q and p are on equal footing',
      'H is conserved ⟺ ∂H/∂t = 0; with scleronomic constraints and a time-independent potential H is the mechanical energy',
      'Each point of phase space is a fully determined state; trajectories never cross except at equilibrium points',
      'The phase trajectories of a one-dimensional oscillator are concentric ellipses parametrized by energy',
      'The Legendre transform needs non-degeneracy (nonzero Hessian); otherwise constrained-system theory is required',
    ],
    content: String.raw`

Lagrange's equations are $s$ second-order equations, initial data require both positions and velocities, and two kinds of variables are mixed. In 1834 Hamilton made a rewrite that looked simple but changed everything: instead of velocities $\dot{q}$, label the state by generalized momenta $p$; use a Legendre transform to exchange $L$ for the Hamiltonian $H(q,p,t)$; the equations become $2s$ first-order equations of highly symmetric form:

$$\dot{q}_\alpha = \frac{\partial H}{\partial p_\alpha}, \qquad \dot{p}_\alpha = -\frac{\partial H}{\partial q_\alpha}$$

Coordinates and momenta are now peers. Treat the $2s$ numbers $(q,p)$ as a point: all possible points form **phase space**, and the entire history of a system is a curve (a phase trajectory) there. Initial conditions are no longer a row of numbers beside the equation but a geometric point; motion is no longer a list of functions of time but a flow on a manifold. This geometrization lets motion be "seen" for the first time, and gives statistical mechanics, chaos theory and quantization their stage.

## II. Formal Definition

**Generalized momentum and the Legendre transform**: $p_\alpha = \partial L/\partial\dot{q}_\alpha$. When the Hessian $\det\left(\partial^2 L/\partial\dot{q}_\alpha\partial\dot{q}_\beta\right)\neq 0$, the velocities can be inverted as functions of $(q,p,t)$ and the Hamiltonian is defined by

$$H(q,p,t) = \sum_{\alpha=1}^{s} p_\alpha\dot{q}_\alpha - L(q,\dot{q},t)$$

This is the Legendre transform: it exchanges the language of velocities for the language of momenta. It is the same kind of transform as $U(S,V)\to H(S,p)$ in thermodynamics: slope variables and original variables trade roles.

**Canonical equations**:

$$\dot{q}_\alpha = \frac{\partial H}{\partial p_\alpha}, \qquad \dot{p}_\alpha = -\frac{\partial H}{\partial q_\alpha}, \qquad \alpha = 1,\dots,s$$

The evolution of any dynamical quantity $f(q,p,t)$ follows: $\dfrac{df}{dt} = \dfrac{\partial f}{\partial t} + \sum_\alpha\left(\dfrac{\partial f}{\partial q_\alpha}\dot{q}_\alpha + \dfrac{\partial f}{\partial p_\alpha}\dot{p}_\alpha\right)$.

**Phase space and phase trajectories**: the $2s$-dimensional space with coordinates $(q_1,\dots,q_s,p_1,\dots,p_s)$. Each instant of the system is a point; given $H$, exactly one trajectory passes through each point (trajectories do not intersect except at singular points—the geometric statement of determinism). For $s=1$ phase space is a plane and trajectories are easy to see.

**Conservation of $H$**: $\dfrac{dH}{dt} = \dfrac{\partial H}{\partial t}$, so $H$ is conserved when it has no explicit $t$. If the constraints are scleronomic and the potential has no explicit $t$, then $H = T + V$ is the mechanical energy; in general "H is conserved" and "mechanical energy is conserved" are two different statements.

## III. Why It Works This Way

**Why switch to momenta?** Three things are gained. Symmetry: in the canonical equations $q$ and $p$ are on equal footing (up to a sign), and that symmetric structure is the foundation of everything that follows. Clear initial data: the pair $(q_0,p_0)$ uniquely determines the future, so "state" acquires a precise definition. Visible conservation laws: momentum is the generator of symmetry, and with $p$ as coordinate, cyclic coordinates and canonical transformations become natural.

**Why is the Legendre transform "fair"?** $H = p\dot{q} - L$ keeps all dynamical information: it merely changes the independent variables of the describing function from position–velocity to position–momentum, a one-to-one correspondence, just as internal energy and enthalpy describe the same thermodynamic system.

**How does phase-space geometry encode dynamics?** For a one-dimensional oscillator, $H = \dfrac{p^2}{2m} + \dfrac12 kx^2 = E$ is a family of concentric ellipses with semi-axes $\sqrt{2E/k}$ ($x$) and $\sqrt{2mE}$ ($p$). Larger energy means a larger ellipse, trajectories never cross, and the centre $(0,0)$ is the equilibrium. The pendulum's phase portrait is richer: closed ellipses at small amplitude, a separatrix (the outline of an "eye") at large amplitude, and on the separatrix the critical orbit that approaches the inverted position asymptotically—all the drama of nonlinear mechanics is drawn on this portrait.

**What is better about first-order equations?** Geometrically, a first-order system defines a flow (a velocity field) in phase space, so flows and volumes can be discussed globally; analytically, first-order systems are convenient for numerical integration and for transformation theory. Physically, "force changes motion" becomes "the state flows through phase space", fusing geometry and dynamics.

## IV. Typical Calculations

**Example 1: the one-dimensional oscillator.** $L = \frac12 m\dot{x}^2 - \frac12 kx^2$ and $p = m\dot{x}$, so

$$H = \frac{p^2}{2m} + \frac12 kx^2$$

The canonical equations $\dot{x} = p/m$, $\dot{p} = -kx$ combine to $\ddot{x} + \omega^2 x = 0$ with $\omega=\sqrt{k/m}$. The phase trajectory is the ellipse $p^2/2m + kx^2/2 = E$, enclosing area $2\pi E/\omega$—the star of the Bohr–Sommerfeld condition $\oint p\,dx = nh$ in the old quantum theory.

**Example 2: projectile motion.** $H = \dfrac{p_x^2 + p_y^2}{2m} + mgy$ gives $\dot{p}_x = 0$ (horizontal momentum conserved) and $\dot{p}_y = -mg$; integrating yields the parabola. In the Hamiltonian framework conservation laws come almost for free: $H$ has no $x$, so $p_x$ is conserved.

**Example 3: central field.** In polar momenta,

$$H = \frac{p_r^2}{2m} + \frac{p_\varphi^2}{2mr^2} + V(r)$$

$p_\varphi$ (angular momentum) and $H$ (energy) are conserved, and the radial motion becomes a one-dimensional problem for $p_r$ in the effective potential $\dfrac{p_\varphi^2}{2mr^2} + V(r)$—the same result as Lagrange's method but with first-order equations throughout.

**Example 4: when H is not the mechanical energy.** A bead is constrained to a hoop rotating at constant angular rate $\omega$ (a time-dependent constraint): $L = \frac12 mR^2(\dot{\theta}^2 + \omega^2\sin^2\theta) - mgR\cos\theta$, giving

$$H = \frac{p_\theta^2}{2mR^2} - \frac12 mR^2\omega^2\sin^2\theta + mgR\cos\theta$$

while the mechanical energy is $E = \frac{p_\theta^2}{2mR^2} + \frac12 mR^2\omega^2\sin^2\theta + mgR\cos\theta$. They differ by a term. $H$ is still conserved (since $L$ has no explicit $t$), but it is no longer $T+V$—"conserved" and "equal to the mechanical energy" are different things.

## V. Common Pitfalls

**Pitfall 1: velocities left inside H.** After the Legendre transform $H$ must be a function of $(q,p,t)$; forgetting to eliminate $\dot{q}$ yields a "pseudo-H" that gives wrong equations. This is the biggest trap of the method.

**Pitfall 2: assuming $H \equiv T+V$.** It holds only for scleronomic constraints, a time-independent potential and a time-independent coordinate transformation; the rotating hoop is a counterexample. First check $\partial H/\partial t = 0$ (conservation), then argue separately about the relation to mechanical energy.

**Pitfall 3: dropping the minus sign in $\dot{p}_\alpha$.** That sign is the only asymmetry between the two branches of the canonical equations; get it wrong and the phase trajectories reverse.

**Pitfall 4: expecting phase trajectories to cross.** Away from equilibrium (singular) points the velocity field is unique, so trajectories cannot cross; a "crossing" portrait means either a singular point or a drawing error.

**Pitfall 5: ignoring non-degeneracy of the Legendre transform.** If the Hessian is degenerate (a relativistic particle at the speed limit, gauge-constrained systems), $p$ cannot be inverted uniquely for $\dot{q}$ and Dirac's constrained theory is needed.

## VI. Extensions

Hamiltonian mechanics is not just a new set of equations but a framework for changing coordinates globally at will: canonical transformations, Poisson brackets and Hamilton–Jacobi theory all rest on the symmetric structure of the canonical equations. Phase space also nursed statistical mechanics: Liouville's theorem says the flow preserves volume, so trajectories on an energy surface behave like an incompressible fluid—entropy and ensembles grow from there. Twentieth-century work showed that integrable systems (Kepler, oscillator) have trajectories lying on invariant tori, while non-integrable ones interweave chaos and islands (KAM theorem)—"determinism is not predictability" comes from this picture. The Hamiltonian form is also the springboard to quantization: replace Poisson brackets by commutators and the algebra becomes quantum. Cultivate the habit of drawing phase portraits: stability, periods, conservation laws and signs of chaos often need no equations at all.

## VII. Worked Examples and Error Warnings

**Example 5: the pendulum in Hamiltonian form.** With angle $\theta$: $L = \tfrac12 ml^2\dot{\theta}^2 - mgl(1-\cos\theta)$, $p_\theta = ml^2\dot{\theta}$, and

$$H = \frac{p_\theta^2}{2ml^2} + mgl(1-\cos\theta)$$

The canonical equations are $\dot{\theta} = p_\theta/(ml^2)$, $\dot{p}_\theta = -mgl\sin\theta$. The orbit of energy $E$ is $H=E$: for $E < 2mgl$ closed orbits about $(0,0)$ (oscillation); for $E = 2mgl$ the separatrix through the inverted point $(\pi,0)$ (a homoclinic orbit, taking infinite time to reach the top); for $E > 2mgl$ monotone rotation. One portrait holds all behaviour—oscillation, criticality, rotation—without a single elliptic integral.

**Example 6: isochronism and phase area of the oscillator.** The phase orbit is an ellipse enclosing

$$\oint p\,dx = \pi\sqrt{2mE}\cdot\sqrt{\frac{2E}{k}} = \frac{2\pi E}{\omega}$$

The area is proportional to the energy while the period $T = 2\pi/\omega$ is independent of it—isochronism in phase space means "the area is swept at a constant rate". The Bohr–Sommerfeld condition $\oint p\,dx = nh$ quantizes this area and immediately gives $E_n = n\hbar\omega$, agreeing with the exact quantum result up to the zero-point energy.

**Summary of error warnings.** Checklist: write $p_\alpha$ → invert for $\dot{q}$ → build $H$ → verify no $\dot{q}$ remains → write the canonical equations → draw the portrait if needed. Guard against three frequent errors: velocities left in $H$; a missing minus in the $\dot{p}$ equation; and calling "H conserved" the same as "mechanical energy conserved" without checking scleronomic constraints and a time-independent potential. When drawing, locate equilibria and separatrices first (the pendulum's $E = 2mgl$ carries the most important stability information).

**Example 7: incompressible phase flow—Liouville in one dimension.** The flow field is $(\dot{q}, \dot{p}) = (\partial H/\partial p,\, -\partial H/\partial q)$, whose divergence is

$$\frac{\partial \dot{q}}{\partial q} + \frac{\partial \dot{p}}{\partial p} = \frac{\partial^2 H}{\partial q\,\partial p} - \frac{\partial^2 H}{\partial p\,\partial q} = 0$$

A vanishing divergence means the phase fluid is incompressible: a blob of phase points deforms but never expands or contracts. This is the simplest case of Liouville's theorem, the basis of microcanonical volume conservation, and it explains why trajectories "crowd but never overlap"—phase area cannot be created or destroyed. Compare a damped oscillator, whose equation is not Hamiltonian: phase area shrinks onto an attractor. "Hamiltonian system" thus carries a built-in conservation of area, the geometric precondition for its smooth marriage with statistics and quantum theory.

**Study advice.** The skill to train is translation: from any Lagrangian, complete in two minutes the chain "write $p_\alpha$ → invert $\dot{q}$ → build $H$ → write the canonical equations". Then draw portraits for three systems (oscillator, pendulum, inverted pendulum) and locate equilibria and separatrices; translate the conservation list into Hamiltonian language ($\partial H/\partial q_\alpha = 0 \Leftrightarrow p_\alpha$ conserved). Once translation is instinct, Poisson brackets and canonical transformations follow naturally.

**Method summary.** Judge Hamiltonian mechanics on a larger scale. Mathematically it rewrites mechanics as a flow on phase space, the canonical equations being its generator and Poisson brackets its algebra. Physically it is the gateway to statistical mechanics (phase-volume conservation is the foundation of ensemble theory), the boundary between integrable and chaotic systems (invariant tori and KAM), and the springboard to quantization (canonical coordinates correspond to quantum operators). Do not stop at "compute $H$, write equations": always ask which quantities are conserved, what the phase orbit looks like, and whether the equilibrium is stable—these answers are often closer to the essence than the analytic solution.`,
  },

  'canonical-jacobi': {
    chapter: 'Chapter 5 Canonical Transformations and Hamilton–Jacobi Theory',
    title: 'Poisson Brackets and Action: Finding Dynamics Better Coordinates',
    summary:
      'Poisson brackets are the canonical invariant algebra of mechanics, canonical transformations preserve the form of the equations, and the Hamilton–Jacobi equation turns solving the motion into solving one partial differential equation.',
    keyPoints: [
      'Poisson bracket [u,v] = Σ(∂u/∂q ∂v/∂p − ∂u/∂p ∂v/∂q); the equations of motion are [q,H] and [p,H]',
      'Fundamental brackets [q_α, p_β] = δ_αβ; brackets are antisymmetric and satisfy the Jacobi identity',
      'A transformation is canonical iff it preserves the fundamental brackets; there are four types of generating function',
      'Poisson brackets are numerically invariant under canonical transformations, so conservation does not depend on coordinates',
      'Hamilton–Jacobi equation ∂S/∂t + H(q, ∂S/∂q, t) = 0; its complete integral carries s independent constants',
      'For steady systems S = W(q; α) − Et, and the wavefront–ray duality of geometric optics reappears',
    ],
    content: String.raw`

Chapter 2 offered a sweet reward: a cyclic coordinate is absent from $L$, so its generalized momentum is conserved and one equation drops out. That suggests an ambitious idea—can we find a set of superb coordinates that make **all** coordinates cyclic? Then $H$ depends only on the new momenta, all momenta are conserved, and the equations integrate in one step. The wish is fine, but good coordinates differ from system to system; how do we find them systematically?

Hamilton and Jacobi gave an elegant answer: instead of trying coordinates one by one, invert the problem—solve a partial differential equation (the Hamilton–Jacobi equation), whose complete integral automatically generates those superb coordinates. This chapter first builds the grammar of "coordinate changing": which transformations preserve the form of the canonical equations (canonical transformations), and how to test and express them with algebraic quantities (Poisson brackets); then presents the Hamilton–Jacobi equation. This theory is also the historical bridge to quantum mechanics: Schrödinger's equation is the "wave upgrade" of the H–J equation.

## II. Formal Definition

**Poisson bracket**: the algebraic operation on two phase-space functions $u(q,p)$, $v(q,p)$,

$$[u,v] = \sum_{\alpha}\left(\frac{\partial u}{\partial q_\alpha}\frac{\partial v}{\partial p_\alpha} - \frac{\partial u}{\partial p_\alpha}\frac{\partial v}{\partial q_\alpha}\right)$$

Fundamental brackets: $[q_\alpha, p_\beta] = \delta_{\alpha\beta}$, $[q_\alpha,q_\beta]=[p_\alpha,p_\beta]=0$. Brackets are antisymmetric, $[u,v]=-[v,u]$, obey the Leibniz rule $[u,vw]=[u,v]w+u[v,w]$ and the Jacobi identity $[u,[v,w]]+[v,[w,u]]+[w,[u,v]]=0$—a standard Lie algebra. Any quantity evolves as

$$\frac{du}{dt} = [u,H] + \frac{\partial u}{\partial t}$$

so the canonical equations acquire an algebraic look: $\dot{q}_\alpha = [q_\alpha,H]$, $\dot{p}_\alpha = [p_\alpha,H]$.

**Canonical transformation**: a map $(q,p)\to(Q,P)$ that preserves the form of the canonical equations (a function $K(Q,P,t)$ still exists with $\dot{Q}=\partial K/\partial P$, $\dot{P}=-\partial K/\partial Q$). Equivalent test:

$$[Q_j, P_k] = \delta_{jk}, \qquad [Q_j,Q_k]=[P_j,P_k]=0$$

**Generating functions**: a canonical transformation can be generated by one function. For a type-2 generator $F_2(q,P,t)$: $p_\alpha = \partial F_2/\partial q_\alpha$, $Q_\alpha = \partial F_2/\partial P_\alpha$, and the new Hamiltonian $K = H + \partial F_2/\partial t$. Depending on which variables are independent there are four types. For instance $F_2 = kqP$ generates the scaling $Q = kq$, $p = kP$; $F_2 = qP$ generates the identity.

**Hamilton–Jacobi equation**: seek a canonical transformation with $K \equiv 0$ (all new variables frozen, all new momenta constant). The generator $S$ satisfies

$$\frac{\partial S}{\partial t} + H\left(q, \frac{\partial S}{\partial q}, t\right) = 0$$

Its **complete integral** $S(q;\alpha_1,\dots,\alpha_s,t)$ carries $s$ independent constants (independent meaning $\det(\partial^2 S/\partial q\partial\alpha)\neq 0$); take $\alpha$ as the new momenta and solve $Q = \partial S/\partial\alpha = \beta$ (constant) for $q(t)$—one PDE delivers the whole set of integrals of motion.

## III. Why It Works This Way

**Why is the Poisson bracket canonically invariant?** Its definition uses only the symplectic structure of phase space (the "area element" encoded by the fundamental brackets), and canonical transformations are exactly those preserving that structure. Hence $[u,v]$ is numerically unchanged. This makes conservation coordinate-free: $[u,H]=0$ (with no explicit $t$ in $u$) is conservation in any canonical coordinates.

**Why is "all coordinates cyclic" equivalent to $K=0$?** If $K(Q,P)=0$ then $\dot{P}=0$ (all momenta conserved) and $\dot{Q}=0$ (coordinates frozen too)—motion is completely frozen in the new variables and all information has moved into the transformation $S$. Mechanics is thus smuggled into a PDE, the most striking achievement of Hamiltonian mechanics: dynamics and partial differential equations are the same thing in disguise.

**What is the physical picture of $S$?** For steady systems $S(q;\alpha,t) = W(q;\alpha) - Et$ and the H–J equation reduces to $H(q,\partial W/\partial q)=E$. Surfaces of constant $S$ propagate like wavefronts, and their normals are the possible orbits—the duality of "wave surface" and "ray" of geometric optics. Hamilton wrote this analogy in the 1830s; Schrödinger upgraded it in 1926: geometric optics is to wave optics as classical mechanics is to quantum mechanics.

**What is Poisson's theorem good for?** If $u$ and $v$ are conserved then so is $[u,v]$ (immediate from the Jacobi identity). This is an algebraic machine for manufacturing new conservation laws from known ones; in Kepler's problem the brackets of angular momentum with the Runge–Lenz vector complete the list and prove the orbit closes.

## IV. Typical Calculations

**Example 1: fundamental brackets and the oscillator.** For $H = \dfrac{p^2}{2m} + \dfrac12 m\omega^2q^2$,

$$[q,H] = \frac{\partial q}{\partial q}\frac{\partial H}{\partial p} = \frac{p}{m} = \dot{q}, \qquad [p,H] = -\frac{\partial H}{\partial q} = -m\omega^2 q = \dot{p}$$

in agreement with the canonical equations; $[H,H]=0$ gives energy conservation. And $[q,p]=1$ is the standard weight for testing whether any candidate transformation is canonical.

**Example 2: generating function and scaling.** Take $F_2(q,P) = kqP$: $p = kP$, $Q = kq$. Check $[Q,P] = [kq, p/k] = [q,p] = 1$, so it is canonical. The new Hamiltonian is $K(Q,P) = H(Q/k, kP)$—scaling stretches phase space without breaking the form of the dynamics.

**Example 3: H–J for a free particle.** $H = p^2/2m$; try $S(x;\alpha,t) = \alpha x - \dfrac{\alpha^2}{2m}t$. Substituting: $\partial S/\partial t = -\alpha^2/2m$, $H(x,\partial S/\partial x) = \alpha^2/2m$, their sum vanishes. From $\beta = \partial S/\partial\alpha = x - \alpha t/m$,

$$x(t) = \beta + \frac{\alpha}{m}t$$

The two constants $\alpha$ (momentum) and $\beta$ (initial position) are the initial data—one solution of the PDE covers every orbit.

**Example 4: H–J for the oscillator (outline).** For the steady case set $S = W(q;E) - Et$, giving $\dfrac12 m\left(\dfrac{dW}{dq}\right)^2 + \dfrac12 m\omega^2 q^2 = E$ and $W = \int\sqrt{2mE - m^2\omega^2q^2}\,dq$; solving $\partial S/\partial E = \beta$ recovers $q = A\sin(\omega t + \varphi_0)$. More roundabout than direct solution, but the same recipe works for any separable system.

## V. Common Pitfalls

**Pitfall 1: treating brackets as commutative.** $[u,v] = -[v,u]$ and $[u,u]=0$; reversing the order flips all signs. Watch the order especially when proving Poisson's theorem.

**Pitfall 2: calling any coordinate change canonical.** Only transformations preserving the fundamental brackets qualify; a casual change such as $Q = q^2$ generally destroys the canonical structure. There is only one test: compute $[Q,P]$.

**Pitfall 3: expecting H to be preserved.** What is preserved is the **form** of the equations, not the value or shape of the Hamiltonian; the new Hamiltonian $K = H + \partial F/\partial t$ usually looks completely different—and that is the point.

**Pitfall 4: ignoring the "complete" in complete integral.** The $s$ constants $\alpha$ must be independent (nonzero Jacobian); otherwise the transformation degenerates and the orbit cannot be recovered. Most failures of the H–J method come from this.

**Pitfall 5: confusing $S$ with $W$.** $W$ is the time-independent characteristic function of a steady problem, $S$ the complete integral including the time term, with $S = W - Et$ in the steady case. Mixing them duplicates or loses the energy term.

## VI. Extensions

The trio—Poisson brackets, canonical transformations, the H–J equation—forms the modern face of mechanics as geometry and algebra. Brackets rise to a Lie algebra in symmetry theory: $[L_x,L_y]=L_z$ is the fingerprint of $SO(3)$. Replace brackets by $(1/i\hbar)$ times commutators and the entire formal bridge leads to quantum mechanics—Dirac called it the shortcut to quantization. Canonical transformations lead to the Liouville–Arnold theorem for integrable systems: $s$ mutually involutive conserved quantities confine the motion to invariant tori; conversely the KAM theorem describes how tori survive weak perturbations. The H–J equation remains a mother equation in wave mechanics, geometric optics and semiclassical gravity. Treat the chapter as a grammar lesson: the routine of checking brackets, building generators and separating variables is the master key to all integrable systems.

## VII. Worked Examples and Error Warnings

**Example 5: the Poisson algebra of angular momentum.** With $L_x = yp_z - zp_y$, $L_y = zp_x - xp_z$, $L_z = xp_y - yp_x$, direct expansion kills all coordinate-coordinate and momentum-momentum brackets, leaving

$$[L_x, L_y] = L_z, \qquad [L_y, L_z] = L_x, \qquad [L_z, L_x] = L_y$$

plus $[L^2, L_i] = 0$. These relations contain no Hamiltonian—they are structural properties of phase space; divided by $i\hbar$ they become the starting algebra of quantum angular momentum. For rotationally invariant systems $[H, L_i] = 0$ for every component, an algebraic proof of angular momentum conservation.

**Example 6: auditing conservation laws with Poisson's theorem.** In Kepler's problem $H = \dfrac{p^2}{2m} - \dfrac{k}{r}$ with $H$ and $\vec{L}$ conserved, define the Runge–Lenz vector $\vec{A} = \vec{p}\times\vec{L} - mk\,\vec{r}/r$; a direct computation gives $[A_i, H] = 0$, so $\vec{A}$ is conserved—its fixed direction is the algebraic reason the major axis does not turn and the orbit closes. Computing $[A_i, L_j]$ and $[A_i, A_j]$ produces nothing new: all results are expressible in $\vec{A}$, $\vec{L}$ and $H$. The list closes—a three-dimensional integrable system needs exactly five independent involutive constants. Poisson's theorem acts as an auditor, both manufacturing and certifying completeness.

**Summary of error warnings.** Checklist for brackets: everything reduces to $[q,p]=1$; antisymmetry and the Jacobi identity are the sharpest tools; when checking conservation do not forget the "no explicit $t$" half of the condition. The usual H–J failure is non-independent constants of the complete integral—verify $\det(\partial^2 S/\partial q\,\partial\alpha)\neq 0$, or solving for $q(t)$ stalls on a degenerate equation. And canonical transformations are certified by one act only: compute $[Q,P]$.

**Example 7: a type-1 generator and the coordinate–momentum swap.** A type-1 generator uses the old and new coordinates $(q,Q)$: $p = \partial F_1/\partial q$, $P = -\partial F_1/\partial Q$. Take $F_1(q,Q) = \tfrac12 qQ$: $p = Q/2$, $P = -q/2$, i.e. $Q = 2p$, $P = -q/2$. Check $[Q,P] = [2p, -q/2] = -[p,q] = 1$: canonical, and it swaps the roles of coordinates and momenta, with the new "coordinate" twice the old momentum. Such a transformation defies naive intuition yet is generated in one step; the four types differ only in which variables are independent ($q,Q$; $q,P$; $p,Q$; $p,P$). The type-2 generator $F_2(q,P,t)$ is the most used because its variables are the new momenta (conserved constants), naturally matched to initial-value problems.

**Study advice.** Digest in three layers: first bracket arithmetic (compute $[q,p]$, verify the angular momentum algebra); then generating functions (identity, scaling, coordinate–momentum swap), always checking $[Q,P]=1$; finally a full H–J run (free particle, oscillator), watching how $K=0$ and constant new coordinates fulfil the original dream of "all coordinates cyclic".

**Method summary.** Canonical transformations and Hamilton–Jacobi theory are called the summit of classical mechanics not for their computation but for their idea: the whole content of dynamics fits into one function (a generator or the action $S$), and the equations degenerate into a PDE that function satisfies. Poisson brackets unify conservation tests, equations of motion and canonicity checks into one algebra. Be patient: master brackets first (they are the words), then the generating functions (the syntax), then two complete examples (the model essays). With words, syntax and models in hand, central fields, relativistic particles and field-theoretic analogues all follow the same map.`,
  },

  'small-oscillations': {
    chapter: 'Chapter 6 Small Oscillations',
    title: 'Small Oscillations with Many Degrees of Freedom: the Decoupling Magic of Normal Coordinates',
    summary:
      'Near a stable equilibrium everything is governed by quadratic forms: the secular equation det(K − ω²M) = 0 gives the normal frequencies, and normal coordinates decouple the motion completely.',
    keyPoints: [
      'The theory needs only the quadratic forms of kinetic and potential energy: M and K symmetric, V positive definite ensures stability',
      'Normal frequencies follow from det(K − ω²M) = 0; the ω² are real and positive when the forms are positive definite',
      'In each normal mode all coordinates oscillate at one frequency with fixed phase relations',
      'The general motion is a linear superposition of modes; initial conditions only fix the coefficients',
      'Normal coordinates make T and V simultaneously sums of squares, so each mode conserves its own energy',
      'ω² < 0 signals an unstable equilibrium (an inverted pendulum), not an arithmetic error',
    ],
    content: String.raw`

A plucked string, a swaying bridge, a stretching molecular bond, an atom vibrating in a lattice—push any system in stable equilibrium gently and it moves back and forth about that point. This is no coincidence: mathematically, a smooth potential surface near a minimum looks like a paraboloid, the restoring force is approximately linear, and Hooke's law becomes the first approximation to everything. In one degree of freedom we can already solve $\ddot{x} + \omega^2x = 0$; the trouble with many degrees of freedom is that the coordinates are entangled—two pendulums joined by a spring, and the displacement of either pushes the other.

The central result of this chapter is a striking simplification: however complex the coupling, once kinetic and potential energy are written as quadratic forms there is always a set of **normal coordinates** that decouples all degrees of freedom—each normal coordinate is an independent harmonic oscillator with its own frequency. The apparently messy motion of a multi-degree system is just a superposition of pure tones (normal modes), as a chord decomposes into notes. This language underlies acoustics, structural engineering, molecular spectroscopy and solid-state physics.

## II. Formal Definition

**Stable equilibrium**: a configuration $q^0$ where the potential has a minimum ($\partial V/\partial q_\alpha|_{q^0} = 0$ with positive-definite curvature). Move the origin to the equilibrium point, so $q^0 = 0$.

**Quadratic approximation**: for small oscillations keep terms to second order,

$$V = V_0 + \frac12\sum_{\alpha\beta}k_{\alpha\beta}q_\alpha q_\beta + O(q^3), \qquad T = \frac12\sum_{\alpha\beta}m_{\alpha\beta}\dot{q}_\alpha\dot{q}_\beta$$

$k_{\alpha\beta}$ are the second derivatives at equilibrium (the stiffness matrix, symmetric) and $m_{\alpha\beta}$ the coefficients of the kinetic quadratic form (the mass matrix, symmetric and positive definite). Linear terms vanish by the equilibrium condition and the constant does not affect the equations.

**Small-oscillation equations and the secular equation**: substituting into Lagrange's equations gives

$$\mathbf{M}\ddot{\mathbf{q}} + \mathbf{K}\mathbf{q} = 0$$

With the harmonic ansatz $\mathbf{q} = \mathbf{A}\,e^{i\omega t}$, a nonzero amplitude requires a vanishing determinant:

$$\det\left(\mathbf{K} - \omega^2\mathbf{M}\right) = 0$$

This is a degree-$s$ equation in $\omega^2$, giving $s$ **normal frequencies**. Since $\mathbf{M}$ and $\mathbf{K}$ are symmetric and positive definite, all $\omega_j^2$ are real and positive; a negative $\omega^2$ means the equilibrium is unstable there (divergent solutions), as near the top of an inverted pendulum.

**Normal coordinates and normal modes**: a linear transformation diagonalizes $\mathbf{M}$ and $\mathbf{K}$ simultaneously, so that

$$L = \frac12\sum_{j}\left(\dot{Q}_j^2 + \omega_j^2 Q_j^2\right)\times(\text{normalizing factor})$$

Each $Q_j$ oscillates independently: $\ddot{Q}_j + \omega_j^2Q_j = 0$. The corresponding pattern is a **normal mode**: all coordinates vibrate at one frequency with fixed amplitude ratios (given by the eigenvector), either in phase or in antiphase. The general motion is a linear superposition.

## III. Why It Works This Way

**Why is second order enough?** At equilibrium the first-order term (gradient) vanishes, so the leading term of the potential is quadratic; for small $q$ the cubic term is a relative correction of order $q$ and dies away faster as the amplitude shrinks. The kinetic energy is already quadratic in velocities (for scleronomic constraints), so no approximation is needed. The whole problem is thus compressed into two symmetric matrices—the most successful dimensional reduction in physics.

**Why are the $\omega^2$ real?** For symmetric positive-definite $\mathbf{M}$, $\mathbf{K}$, the generalized eigenvalue problem $\mathbf{K}a = \omega^2\mathbf{M}a$ has positive real eigenvalues (use the inner product $\langle x,y\rangle_M = x^T\mathbf{M}y$). Physically, real frequencies mean oscillation; imaginary ones mean exponential divergence, which occurs only at unstable equilibria. So a negative $\omega^2$ is not an arithmetic slip—check whether the equilibrium point is right and stable.

**What does a normal mode look like?** Imagine a line of people holding hands moving together: a normal mode is a formation with perfectly matched rhythm—everyone rises and falls at the same frequency with fixed amplitude ratios (in phase, antiphase, or some ratio). Any initial disturbance decomposes into such formations, each evolving independently. This is Fourier thinking in mechanics: coupled coordinates are the time domain, normal coordinates the frequency domain.

**Why is each mode's energy independent?** In normal coordinates $L$ is a sum of squares, the equations decouple, and each $E_j = \frac12(\dot{Q}_j^2 + \omega_j^2Q_j^2)\times$factor is separately conserved. The "energy exchange" seen in coupled coordinates is simply constants coexisting; the observed sloshing between pendulums is the beat of two nearby frequencies.

## IV. Typical Calculations

**Example 1: coupled pendulums.** Two identical pendulums (length $l$, mass $m$) are joined by a light spring of stiffness $k$ at distance $d$ from the suspension points. With angles $\theta_1,\theta_2$:

$$T = \frac12 ml^2(\dot{\theta}_1^2 + \dot{\theta}_2^2), \qquad V = \frac12 mgl(\theta_1^2+\theta_2^2) + \frac12 kd^2(\theta_1-\theta_2)^2$$

The secular equation gives two frequencies: the in-phase mode $\theta_1=\theta_2$ (spring undeformed) with $\omega_1^2 = g/l$; the antiphase mode $\theta_1=-\theta_2$ (spring repeatedly stretched) with $\omega_2^2 = g/l + 2kd^2/(ml^2)$.

**Example 2: a two-oscillator chain.** Two masses $m$: outer ends attached to walls by springs $k$, joined by a spring $k'$. The equations are $m\ddot{x}_1 = -kx_1 - k'(x_1-x_2)$ and its symmetric partner. The in-phase mode has no spring extension, $\omega_1^2 = k/m$; the antiphase mode doubles the middle spring's contribution, $\omega_2^2 = (k+2k')/m$. Antiphase is always "stiffer"—coupling raises the high mode and leaves the low one alone, the general rule for couplings of the $k_{12}<0$ type.

**Example 3: reading modes from initial conditions.** If only $\theta_1$ is displaced by $\theta_0$ initially ($\theta_2=0$), the general solution is $\theta_1 = \frac{\theta_0}{2}(\cos\omega_1 t + \cos\omega_2 t)$, $\theta_2 = \frac{\theta_0}{2}(\cos\omega_1 t - \cos\omega_2 t)$. For weak coupling $\omega_1\approx\omega_2$ this produces **beats**: energy transfers between the pendulums with period $\pi/|\omega_2-\omega_1|$—the clearest classroom demonstration of mode superposition.

**Example 4: degeneracy.** Two uncoupled identical pendulums have $\omega_1=\omega_2$: degeneracy. Then any linear combination is a legitimate mode, and the non-uniqueness itself is physical information; a perturbation (light coupling) lifts the degeneracy and splits the frequencies—structurally identical to degenerate perturbation theory in quantum mechanics.

## V. Common Pitfalls

**Pitfall 1: expanding about a point that is not the origin.** The quadratic approximation presupposes the origin is at equilibrium ($\partial V/\partial q=0$); forgetting the shift leaves a linear term (a constant force) in the equations and gives wrong results.

**Pitfall 2: dropping cross terms in the kinetic energy.** Coupling often hides in $T$, in terms like $m_{12}\dot{q}_1\dot{q}_2$ (especially for double pendulums and non-orthogonal coordinates). Watching only $V$ misses half the coupling.

**Pitfall 3: assuming modes are "symmetric combinations".** Mode shapes are fixed by eigenvectors; only systems with enough symmetry give the neat in-phase/antiphase patterns. In general you must compute the eigenvectors.

**Pitfall 4: extrapolating linear theory to large amplitudes.** At larger amplitude cubic and quartic terms matter: frequencies drift with amplitude (nonlinear shift) and modes exchange energy again. Small-oscillation theory is valid only for "small enough" amplitude.

**Pitfall 5: panicking at $\omega^2<0$.** A negative $\omega^2$ is not an error but the criterion for "not a stable equilibrium here" (inverted pendulum, maximum of the potential). The right response is to change to a stable point or accept the meaning of the divergent solution.

## VI. Extensions

The normal-mode idea upgrades directly to continuous systems: treat a string as an infinite chain of particles and take the continuum limit to get the wave equation; standing waves (fundamental and overtones) are the string's normal modes, and timbre is set by the mode spectrum. In solid-state physics, quantized lattice vibrations become phonons, and specific heats (Debye), resistivity and superconductivity are all phrased in that language; the infrared absorption frequencies of molecules are exactly the normal frequencies of the chemical-bond system. In engineering, seismic design means avoiding normal frequencies: the Tacoma Narrows failure and the rule against soldiers marching in step across bridges are footnotes to this lesson. Quantitatively, forced multi-degree systems resonate as $\omega\to\omega_j$, with damping broadening the peaks—together with the Rayleigh dissipation function and Lagrange multipliers, this forms the interface from theoretical mechanics to continuum and engineering vibration.

## VII. Worked Examples and Error Warnings

**Example 5: constructing normal coordinates for two oscillators.** For the chain of Example 2, adding and subtracting the equations:

$$m\ddot{x}_+ = -kx_+\ (x_+ = \tfrac{x_1+x_2}{2}), \qquad m\ddot{x}_- = -(k+2k')x_-\ (x_- = \tfrac{x_1-x_2}{2})$$

The symmetric and antisymmetric coordinates decouple automatically—these are the normal coordinates $Q_1 = x_+$, $Q_2 = x_-$. The general solution is $x_1 = A\cos\omega_1 t + B\cos\omega_2 t$, $x_2 = A\cos\omega_1 t - B\cos\omega_2 t$; for weak coupling $k' \ll k$ the frequencies are close and **beats** appear, with energy transferring every $\pi/|\omega_2-\omega_1|$. Geometrically this is just "rotating the coupled coordinates by 45°", turning a two-degree problem into two independent oscillators.

**Example 6: the inverted pendulum and reading $\omega^2 < 0$.** Linearize about the upright position ($\theta$ measured from vertical up): the restoring torque reverses sign, $ml^2\ddot{\theta} = mgl\theta$, i.e. $\ddot{\theta} - \dfrac{g}{l}\theta = 0$. The secular equation gives $\omega^2 = -g/l < 0$ and $\theta = Ae^{\lambda t} + Be^{-\lambda t}$ with $\lambda = \sqrt{g/l}$: the divergent term shows the upright position is unstable and any small deviation grows exponentially. The rule: on seeing a negative $\omega^2$, first check whether the equilibrium point is wrong (the stable one is directly below the pivot); if it is right, the instability is the conclusion—hence the inverted pendulum as the classic benchmark in control engineering.

**Summary of error warnings.** Routine: find a stable equilibrium → shift the origin → write the quadratic forms of $T$ and $V$ (watch the cross terms) → form the secular equation → solve for all $\omega^2$ → get mode shapes from eigenvectors → superpose with initial conditions. Two checks: $\text{tr}(\mathbf{M}^{-1}\mathbf{K}) = \sum_j \omega_j^2$ for the sum of frequencies, and substituting each mode back into the original equations. Remember that modes are pure only at small amplitude; slight increases produce frequency shifts and mode mixing, so deviation from theory is a signal of nonlinearity, not a calculation error.

**Example 7: the spherical pendulum, small oscillations and degeneracy.** Near equilibrium a spherical pendulum of length $l$ can swing in two orthogonal vertical planes, with identical linearized equations $\ddot{x} + \frac{g}{l}x = 0$, $\ddot{y} + \frac{g}{l}y = 0$—equal frequencies, hence degeneracy. The general small motion is an arbitrary linear combination, tracing an ellipse whose orientation is set by the initial conditions with no preferred direction. The Foucault pendulum uses the Earth's rotation as a small Coriolis "coupling" that lifts the degeneracy and slowly rotates the ellipse, thereby "weighing" the Earth's spin. Degeneracy means mode non-uniqueness is a direct reading of symmetry; any perturbation splits it and selects its preferred modes—exactly parallel to degenerate perturbation theory in quantum mechanics.

**Method summary.** The methodological value of small oscillations is often underestimated. It is a complete demonstration of linearization: project the nonlinear world onto the plane of quadratic forms near equilibrium and complexity becomes $s$ independent oscillators. It is also the cradle of mode decomposition—expanding complex motion into pure tones by eigenfrequency, a language that later appears in circuits, waves, quantum mechanics and signal processing. Computationally, remember that the symmetry of $\mathbf{M}$ and $\mathbf{K}$ is the source of every conclusion: real frequencies, orthogonal modes, diagonalized energy. For every problem ask where the symmetry is, which mode "sees" it (in phase, antiphase) and which mode the coupling raises or lowers. Then the normal frequencies are not cold numbers from a determinant but a direct reading of the system's inner structure.`,
  },

  'rigid-body-top': {
    chapter: 'Chapter 7 Rigid Bodies and Tops',
    title: 'Euler Angles and Rigid-Body Motion about a Fixed Point: Why a Top Does Not Fall',
    summary:
      'Euler angles parametrize rotation about a fixed point, Euler\u2019s equations hold in the body frame, and a fast symmetric top precesses slowly at Ω ≈ mgl/(I₃ω₃) instead of falling.',
    keyPoints: [
      'Euler angles (φ, θ, ψ) locate a rigid body by three rotations; ω₃ = ψ̇ + φ̇cosθ and its partners are the dictionary of rigid-body mechanics',
      'The inertia tensor can always be diagonalized: L₁ = I₁ω₁ in the principal frame, but ω and L are generally not parallel',
      'Euler\u2019s dynamical equations hold only in the body principal frame; the extra (I₂−I₃)ω₂ω₃ terms come from the rotation of the frame',
      'For a symmetric heavy top φ and ψ are cyclic, so p_φ and p_ψ are conserved',
      'A fast top precesses slowly at Ω ≈ mgl/(I₃ω₃); steady precession in general solves a quadratic equation in Ω',
      'Rotation of a free body about its intermediate principal axis is unstable (tennis-racket theorem)',
    ],
    content: String.raw`

A toy top spinning rapidly stays up even when tilted, slowly circling the vertical axis; hold a bicycle wheel by one end of its axle and let go—the wheel does not drop but slowly turns about the support, axle and all. Intuition cries "anti-gravity"; physics answers in one sentence: **a torque changes the direction of angular momentum, not its magnitude**. The gravitational torque is always perpendicular to the spin angular momentum, so it cannot push the top over (that would shorten the vertical component of $\vec{L}$); it can only push the tip of $\vec{L}$ around a circle—that is precession.

Rotation about a fixed point is the most delicate chapter of Newtonian mechanics: rotations do not commute (x then y differs from the reverse), angular velocity and angular momentum are generally not parallel, and the inertia tensor in a fixed frame tumbles with the body. Euler's genius was to move into a body-fixed frame "riding on the body", where the inertia is constant—at the price of extra terms, which are Euler's dynamical equations. This chapter uses Euler angles as the dictionary and Euler's equations as the engine to unravel free rotation and the precession and nutation of a symmetric heavy top.

## II. Formal Definition

**Euler angles**: the configuration of a body rotating about a fixed point is fixed by three angles: precession $\varphi$ (swing of body axis 3 about the fixed $z$), nutation $\theta$ (angle between body axis 3 and fixed $z$), and spin $\psi$ (rotation about body axis 3). The three rotations "about $z$ by $\varphi$ → about the line of nodes by $\theta$ → about axis 3 by $\psi$" carry the fixed frame exactly to the body frame. Components of angular velocity along the body principal axes:

$$\omega_1 = \dot{\varphi}\sin\theta\sin\psi + \dot{\theta}\cos\psi$$

$$\omega_2 = \dot{\varphi}\sin\theta\cos\psi - \dot{\theta}\sin\psi$$

$$\omega_3 = \dot{\psi} + \dot{\varphi}\cos\theta$$

**Inertia tensor**: $I_{ij} = \int\rho\,(r^2\delta_{ij} - x_ix_j)\,dV$. It is symmetric, so a set of orthogonal **principal axes** always diagonalizes it to $I_1,I_2,I_3$; in that frame $\vec{L}_1 = I_1\omega_1$ and so on, but $\vec{L}$ and $\vec{\omega}$ are generally not collinear unless the rotation axis is principal.

**Euler's dynamical equations**: in the body principal frame (the angular momentum theorem $\vec{M} = d\vec{L}/dt|_{\text{space}}$ transferred to the rotating frame picks up $\vec{\omega}\times\vec{L}$):

$$I_1\dot{\omega}_1 - (I_2 - I_3)\omega_2\omega_3 = M_1$$

$$I_2\dot{\omega}_2 - (I_3 - I_1)\omega_3\omega_1 = M_2$$

$$I_3\dot{\omega}_3 - (I_1 - I_2)\omega_1\omega_2 = M_3$$

**Symmetric heavy top**: $I_1 = I_2$, one point fixed, centre of mass at distance $l$ from the support, moving under gravity. The Lagrangian in Euler angles is

$$L = \frac12 I_1(\dot{\theta}^2 + \dot{\varphi}^2\sin^2\theta) + \frac12 I_3(\dot{\psi} + \dot{\varphi}\cos\theta)^2 - mgl\cos\theta$$

$\varphi$ and $\psi$ are cyclic, so $p_\varphi$ and $p_\psi = I_3\omega_3$ are conserved. A fast top (large $\omega_3$) precesses slowly at

$$\Omega \approx \frac{mgl}{I_3\omega_3}$$

General steady precession ($\theta$ constant, $\dot{\varphi} = \Omega$) satisfies $I_1\Omega^2\cos\theta - I_3\omega_3\Omega + mgl = 0$, with two roots: slow and fast precession. **Nutation** is a small oscillation of $\theta$ superimposed on precession, making the axle tip trace a rippled curve on the sphere.

## III. Why It Works This Way

**Where does the "supporting force" of precession come from?** Nowhere. The pivot supplies only a constraint force through the support (no torque); the gravitational torque $\vec{M} = l\vec{e}_3\times m\vec{g}$ has magnitude $mgl\sin\theta$ along the line of nodes. The angular momentum theorem says $d\vec{L}/dt = \vec{M}$: for fast spin $\vec{L}\approx I_3\omega_3\vec{e}_3$ nearly along the symmetry axis, and $\Omega\vec{z}\times\vec{L}$ supplies exactly a rate of change along the line of nodes—setting them equal, $\Omega I_3\omega_3\sin\theta = mgl\sin\theta$, yields $\Omega = mgl/(I_3\omega_3)$. The torque does not change the magnitude of $\vec{L}$, only walks its direction around a circle; "not falling" is the inertia of the direction of angular momentum, not a mysterious lift.

**Why write the equations in the body frame?** The inertia tensor describes how mass is distributed about axes; as the body turns, all particle positions relative to the fixed frame change, so $I_{ij}$ there is a complicated function of time, whereas in a body-fixed frame it is constant. The price is that the rotating frame is not inertial and the theorem gains $\vec{\omega}\times\vec{L}$, giving the $(I_2-I_3)\omega_2\omega_3$ terms—geometric tolls, none of which may be dropped.

**Why does a free symmetric top precess regularly?** With no torque the space-fixed $\vec{L}$ and $\omega_3$ are both conserved; the angle between axis 3 and $\vec{L}$ is fixed, so axis 3 sweeps a cone about $\vec{L}$ at constant rate. The linearized Euler equations give the exact rate $\Omega_0 = (I_3-I_1)\omega_3/I_1$: the faster and more "slender" the body, the faster the cone. The precession of Earth's axis and the Chandler wobble are this same set of equations on an astronomical scale.

**Why is the intermediate axis unstable?** Perturb free rotation about principal axis 2 and the linearized equations grow as $\exp(\lambda t)$ with $\lambda^2 = \dfrac{(I_2-I_3)(I_1-I_2)}{I_1I_3}\omega_2^2$. About the largest or smallest axis $(I_2-I_3)(I_1-I_2)<0$, so perturbations oscillate (stable); about the intermediate axis the product is positive and they grow exponentially (unstable)—the **tennis-racket theorem**: toss a racket and it insists on flipping about its middle axis.

## IV. Typical Calculations

**Example 1: precession period of a suspended wheel.** A bicycle wheel of mass $m = 1.5\ \text{kg}$, moment $I_3 = 0.17\ \text{kg·m}^2$, centre of mass $l = 0.10\ \text{m}$ from the support, spinning at $\omega_3 = 30\ \text{rad/s}$ (about 5 turns per second). Slow precession:

$$\Omega \approx \frac{mgl}{I_3\omega_3} = \frac{1.5\times 9.8\times 0.10}{0.17\times 30} \approx 0.29\ \text{rad/s}$$

A period of about 22 seconds—one turn about the support every 22 s, matching the demonstration.

**Example 2: regular precession of a free symmetric top.** Set $M_i = 0$, $I_1=I_2$ in Euler's equations: $\omega_3$ is conserved and $\dot{\omega}_1 = \dfrac{I_1-I_3}{I_1}\omega_3\omega_2$, $\dot{\omega}_2 = \dfrac{I_3-I_1}{I_1}\omega_3\omega_1$, so

$$\omega_1 = A\cos(\Omega_0 t + \delta), \quad \omega_2 = A\sin(\Omega_0 t + \delta), \quad \Omega_0 = \frac{I_3 - I_1}{I_1}\omega_3$$

The transverse part of $\vec{\omega}$ rotates uniformly: body axis 3 precesses about the space-fixed $\vec{L}$ at $\Omega_0$.

**Example 3: two roots of steady precession.** For a symmetric heavy top in steady precession, $\partial L/\partial\theta = 0$ gives $I_1\Omega^2\cos\theta - I_3\omega_3\Omega + mgl = 0$. When $I_3^2\omega_3^2 \ge 4I_1mgl\cos\theta$ there are two roots: the slow one $\Omega\approx mgl/(I_3\omega_3)$ (what a fast top usually shows) and the fast one $\Omega\approx I_3\omega_3/(I_1\cos\theta)$, of the order of the spin itself and hard to observe.

**Example 4: the flipping racket.** With spin $\omega_2$ about the intermediate axis and small perturbations $\omega_1,\omega_3$, the linearized equations give $\ddot{\omega}_1 = \lambda^2\omega_1$ with $\lambda = \omega_2\sqrt{(I_2-I_3)(I_1-I_2)/(I_1I_3)}$. For the intermediate axis $\lambda$ is real and the perturbation grows exponentially—a tossed book or racket inevitably flips, a prelude to chaos demonstrated by a single Euler equation.

## V. Common Pitfalls

**Pitfall 1: inventing an upward "mystery force".** Only gravity and the pivot reaction act; the mechanism is the geometry of torque and angular momentum, not a new force. Introducing "centrifugal lift" or "precession support" as forces is a conceptual error.

**Pitfall 2: confusing the three angular rates.** $\dot{\psi}$ is spin about the body axis, $\dot{\varphi}$ precession about the vertical, $\dot{\theta}$ nutation; moreover $\omega_3 = \dot{\psi} + \dot{\varphi}\cos\theta$ contains a precession contribution. What is conserved is $\omega_3$ (from $p_\psi$), not $\dot{\psi}$.

**Pitfall 3: applying $\Omega = mgl/(I_3\omega_3)$ everywhere.** It is the fast-top slow-precession approximation, valid when $mgl \ll I_3\omega_3^2$ ($1.47 \ll 153$ in Example 1). If the spin is not fast, return to the quadratic equation for steady precession and include nutation.

**Pitfall 4: using Euler's equations in the fixed frame.** They hold only in the body principal frame; in the fixed frame the inertia tensor varies and the $\omega\times L$ terms do not appear—instead the coefficients become time dependent and much messier.

**Pitfall 5: assuming $\vec{L}$ is always along $\vec{\omega}$.** They are collinear only for a symmetric top or when the rotation axis is principal; in general $\vec{L} = \mathbf{I}\vec{\omega}$ is a tensor action and can point far away. That is why $\vec{\omega}$ "wanders" inside a free body (regular precession).

## VI. Extensions

Motion about a fixed point is one of the last fortresses of classical mechanics: the complete solution for a general heavy top needs elliptic integrals, and Poincaré's and Cartan's analyses of its geometry pushed rigid-body mechanics toward Lie groups and symplectic geometry. In applications, gyrocompasses and inertial navigation use the directional memory of a gyro ($\vec{L}$ fixed in space) as a reference for aircraft, missiles and ships; satellite attitude control uses spin or momentum wheels, the Hubble reaction wheels being "controllable tops"; phone attitude sensors and drone flight controllers solve Euler angles in real time. In nature, the Earth is a huge free symmetric top, and the precession of its axis (about 26000 years) and polar motion (Chandler wobble) are quantitatively described by these equations; pulsar glitches ("starquakes") also rely on rigid-body dynamics. Take three tools away: the Euler-angle dictionary, principal-axis reduction (turning tensors into constants), and conservation from cyclic coordinates ($p_\varphi$, $p_\psi$ first)—the entrance to every rigid-body problem is these three steps.

## VII. Worked Examples and Error Warnings

**Example 5: vector derivation of wheel precession.** Keep the axle horizontal ($\theta = 90°$) with one end supported and spin $\omega_3$ along the axle. When spin dominates precession, $\vec{L} \approx I_3\omega_3\,\vec{e}_3$. The gravitational torque $\vec{M} = \vec{l}\times m\vec{g}$ has magnitude $mgl$, horizontal and perpendicular to the axle. If the axle precesses about the vertical at $\Omega$, the tip of $\vec{L}$ moves at $|\Omega\hat{z}\times\vec{L}| = \Omega I_3\omega_3$; equating this to $mgl$,

$$\Omega = \frac{mgl}{I_3\omega_3}$$

The direction is fixed by $\vec{M}$: the wheel precesses in the sense that follows the torque rather than falling along gravity. Only one approximation is used—$\vec{L}$ along the axle (spin far larger than $I_1\Omega$)—which is exactly the "fast top" assumption; always check magnitudes before writing it.

**Example 6: inertia tensor of a uniform thin disk.** For a disk of radius $R$, mass $m$: about the symmetry axis $I_3 = \tfrac12 mR^2$; about a diameter, the perpendicular-axis theorem for a thin body $I_1 + I_2 = I_3$ plus symmetry gives $I_1 = \tfrac14 mR^2$. Three mutually perpendicular principal axes and three constant moments—the standard prototype of a symmetric top, from which wheels, flywheels and coins are all discussed. Sanity checks: $I_1 < I_3$ (mass at the rim contributes most to the symmetry axis) and $2I_1 = I_3$ exactly.

**Summary of error warnings.** Order of work: fix principal axes and moments (only $I_1, I_3$ for a symmetric top) → write the Lagrangian in Euler angles → circle the cyclic coordinates and read off the constants → choose the route (fast-top approximation, steady-precession equation, or full Euler equations). Distinguish $\dot{\psi}$ (spin), $\dot{\varphi}$ (precession) and the oscillation of $\theta$ (nutation); what is conserved is $\omega_3 = \dot{\psi} + \dot{\varphi}\cos\theta$ and $p_\varphi$, not $\dot{\psi}$ or $\dot{\varphi}$ alone. In numerical problems compare $mgl$ with $I_3\omega_3^2$ before substituting numbers, or you may use an approximation whose condition fails.

**Example 7: the Chandler wobble—Euler's equations at astronomical scale.** Approximate the Earth as a free symmetric top spinning about its symmetry axis. Rotation flattens it, so $I_3$ slightly exceeds $I_1$ with $(I_3 - I_1)/I_1 \approx 1/305$. From $\Omega_0 = \dfrac{I_3 - I_1}{I_1}\,\omega_3$ with $\omega_3 = 2\pi/\text{day}$, the axis should wobble with a period near 305 days; the observed Chandler wobble is about 433 days, the difference coming from the Earth not being perfectly rigid—elastic deformation of oceans and mantle lengthens the period. The same Euler equation describes a toy top spinning once in minutes and a polar motion of fourteen months on a planetary scale; the gap between theory and observation then becomes a probe of the Earth's interior.

**Method summary.** Rigid bodies are the finale of the course and a test of the first six chapters: constraint analysis says a body with one fixed point has three degrees of freedom; generalized coordinates turn them into Euler angles; cyclic coordinates give the first integrals $p_\varphi$, $p_\psi$; the energy integral supplies a third; and the steady-precession equation is "divided out" of these integrals. The best revision is to walk this chain again and watch analytical mechanics simplify a formidable problem layer by layer. Applications run from inertial navigation to dual-spin satellite stabilisation to the gyro chip in a phone; astronomically, precession, the Chandler wobble and pulsar glitches all fall under the same equations. The main frame of theoretical mechanics is now complete—constraints, Lagrange, variation, Hamilton, oscillations, rigid bodies—a single thread from start to finish, and a reliable foundation for continuum mechanics, electrodynamics and quantum mechanics.`,
  },
};

export default map;
