import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  kinematics: {
    chapter: 'Chapter 1 Kinematics of a Particle',
    title: 'Describing Motion: Position Vector, Velocity, and Acceleration',
    summary:
      'Write the position of an object as an ordered function of time; differentiating it once gives velocity, twice gives acceleration. Projectile and circular motion are instances of this language.',
    keyPoints: [
      'The first time derivative of the position vector is velocity; the second is acceleration',
      'Projectile motion splits into two independent components: uniform horizontal motion and uniformly accelerated vertical motion',
      'The acceleration of circular motion splits into a tangential part and a normal (centripetal) part',
      'Relative motion is essentially a translation between coordinate frames, and velocities obey simple vector addition',
      'The Galilean transformation relates coordinates and velocities between inertial frames at low speed',
    ],
    content: String.raw`

You stand on a platform and watch a train pass; the position of its front changes from moment to moment. Then you sit inside and look out of the window: the trees recede. The same "motion" traces completely different paths in the eyes of different observers. To study motion scientifically, the first step is not to ask "why does it move" (that belongs to dynamics) but to record "what the motion looks like" in a unified, unambiguous language. That is the task of **kinematics**: it cares only about how position, velocity, and acceleration change with time, and not about the forces behind them.

In everyday life we say "drive a little faster" or "it slowed down"; such statements are vague. How fast is fast? Slowed down to what? The first tool kinematics offers is to represent the object's position in space as a point evolving in time—the **position vector** $\vec{r}(t)$. Once position is written as a function of time, velocity and acceleration are no longer new concepts but merely derivatives of that function. One may say that all of particle kinematics is the story of "one function plus two derivatives"; everything else is applying that function to concrete situations.

Think further: why do we need a "position vector" rather than just a "distance"? Because knowing only how far something has travelled tells us nothing about the direction or the path taken. The position vector pins down a location in three-dimensional space in one stroke; its time derivative (velocity) carries both magnitude and direction, and one more derivative (acceleration) describes how the velocity itself changes. This chain of derivatives forms the complete vocabulary of motion: position answers "where", velocity answers "which way and how fast", acceleration answers "how the state of motion is being rewritten".

## 2. Rigorous Definitions

**Particle**: an object abstracted into a point that has mass but no size. When the shape and size of the body matter little to the problem (the Earth in its orbit, a flying bullet), this abstraction is accurate enough.

**Position vector**: the directed segment from the origin of the reference frame to the location of the particle

$$\vec{r}(t) = x(t)\,\vec{i} + y(t)\,\vec{j} + z(t)\,\vec{k}$$

In Cartesian coordinates it is simply three coordinate components as functions of time. Eliminating $t$ between the components gives the **trajectory equation**, which describes the shape of the path without explicit time.

**Average and instantaneous velocity**: over $\Delta t$ the displacement is $\Delta\vec{r}$, and the average velocity is $\overline{\vec{v}} = \Delta\vec{r}/\Delta t$; taking the limit gives the instantaneous velocity

$$\vec{v}(t) = \lim_{\Delta t\to 0}\frac{\Delta\vec{r}}{\Delta t} = \frac{d\vec{r}}{dt} = \dot{x}\,\vec{i} + \dot{y}\,\vec{j} + \dot{z}\,\vec{k}$$

The magnitude $|\vec{v}|$ is called the **speed** and is always positive; the direction of velocity is the direction of motion (along the tangent to the path).

**Acceleration**: the first derivative of velocity with respect to time, or the second derivative of the position vector

$$\vec{a}(t) = \frac{d\vec{v}}{dt} = \frac{d^2\vec{r}}{dt^2}$$

The direction of acceleration is in general **not** along the direction of motion—in uniform circular motion, for example, the speed never changes, yet the acceleration always points toward the centre and is perpendicular to the velocity.

**Projectile motion**: launched with initial speed $\vec{v}_0$ at an angle $\theta$ to the horizontal, with air resistance neglected so that only gravity acts. Decomposing the motion into horizontal and vertical directions allows the two to be handled independently:

$$x(t) = v_0\cos\theta \cdot t, \qquad y(t) = v_0\sin\theta \cdot t - \frac{1}{2}gt^2$$

The horizontal direction is uniform and the vertical uniformly accelerated, coupled through the shared time $t$. Eliminating $t$ gives the trajectory $y = x\tan\theta - \dfrac{gx^2}{2v_0^2\cos^2\theta}$, which is a parabola.

**Decomposition of acceleration in circular motion**: with speed $v$ and radius of curvature $R$, the acceleration decomposes as

$$a_t = \frac{dv}{dt} \quad\text{(tangential, changes the speed)}, \qquad a_n = \frac{v^2}{R} \quad\text{(normal, changes the direction)}$$

The resultant acceleration has magnitude $a = \sqrt{a_t^2 + a_n^2}$. In particular, in uniform circular motion $v$ is constant, $a_t=0$, and only the centripetal normal acceleration $a_n = v^2/R = \omega^2 R$ remains.

**Relative motion and the Galilean transformation**: let frame $S'$ translate relative to $S$ with constant velocity $\vec{u}$; then the position vectors and velocities of one and the same particle in the two frames satisfy

$$\vec{r} = \vec{r}' + \vec{u}\,t, \qquad \vec{v} = \vec{v}' + \vec{u}, \qquad \vec{a} = \vec{a}'$$

This is precisely the rigorous statement of "velocity addition" in classical mechanics.

## 3. Why It Works This Way

**Why can acceleration be perpendicular to velocity?** Velocity tells us "which way and how fast"; acceleration tells us "how the velocity changes". Velocity contains both magnitude and direction, so as long as the direction of the velocity is changing, there must be an acceleration component perpendicular to the velocity that "bends" the path, even if the speed stays constant. The normal acceleration $v^2/R$ is exactly the measure of this bending.

**Why split projectile motion into two directions?** Because gravity acts only vertically, and horizontally there is no force at all (ideally). The horizontal and vertical dynamics are independent of each other but share the same time axis, so a two-dimensional problem becomes two one-dimensional ones that are solved separately and then stitched back together through the time $t$. This is the central technique for handling curved motion.

**Why is relative motion an addition and nothing else?** Imagine walking forward inside a moving train: your speed relative to the ground is naturally your speed relative to the train plus the speed of the train relative to the ground. This follows directly from the translational symmetry of space; near the speed of light the addition must be replaced by the relativistic velocity composition, but at everyday scales Galilean addition is accurate enough.

**Why use the particle abstraction?** Real bodies have shape, but when describing "the Earth going around the Sun" the Earth's radius is negligible compared with the orbital radius. Only by abstracting away secondary scales can the main law be captured; when spin or rotation is the subject, the particle model must be abandoned in favour of the rigid body.

**Why is a trajectory equation without time still useful?** It answers "which points will be passed through", which is what we need to decide whether something hits a wall or lands on a target; the time-dependent position vector additionally tells us "when". The two are complementary.

## 4. Typical Calculations

**Example 1: maximum range and optimal angle of an oblique throw.** At landing $y=0$ with $t>0$, and the vertical equation gives the flight time $T = 2v_0\sin\theta/g$. The horizontal range is

$$R = x(T) = v_0\cos\theta \cdot \frac{2v_0\sin\theta}{g} = \frac{v_0^2\sin 2\theta}{g}$$

At $\theta = 45^\circ$ we have $\sin 2\theta = 1$ and the maximum $R_{\max} = v_0^2/g$.

**Example 2: acceleration in uniform circular motion.** Take $\vec{r} = R(\cos\omega t\,\vec{i} + \sin\omega t\,\vec{j})$; then

$$\vec{v} = R\omega(-\sin\omega t\,\vec{i} + \cos\omega t\,\vec{j}), \qquad \vec{a} = -R\omega^2(\cos\omega t\,\vec{i} + \sin\omega t\,\vec{j}) = -\omega^2\vec{r}$$

So $\vec{a}$ has magnitude $\omega^2 R = v^2/R$ and points exactly toward the centre, perpendicular to the velocity—it changes only the direction, not the speed.

**Example 3: a numerical relative-velocity problem.** Rain falls vertically at $v_r=6\ \text{m/s}$ relative to the ground, while a person runs forward at $u=8\ \text{m/s}$. The velocity of the rain relative to the person is $\vec{v}_{rel} = \vec{v}_r - \vec{u}$, whose magnitude is $|\vec{v}_{rel}| = \sqrt{v_r^2+u^2}=10\ \text{m/s}$, at an angle to the vertical given by $\tan\alpha = u/v_r = 4/3$. The person sees the rain coming slantwise from the front.

**Example 4: natural coordinates for general curved motion.** Taking the unit tangent $\vec{e}_t$ and unit normal $\vec{e}_n$ along the path, $\vec{a} = \dfrac{dv}{dt}\vec{e}_t + \dfrac{v^2}{\rho}\vec{e}_n$, where $\rho$ is the radius of curvature. Any curved motion can be split in this way into "how fast" and "how much it turns".

## 5. Common Misconceptions

**Misconception 1: large acceleration means high speed.** The two are unrelated: acceleration is the rate of change of velocity. A rocket at ignition has almost zero speed but enormous acceleration; a cruising high-speed train has a large speed but zero acceleration.

**Misconception 2: uniform circular motion has no acceleration.** It has a centripetal acceleration, the direction of the velocity keeps changing, and it is certainly not "uniform straight-line motion". "Uniform" refers only to the constant speed.

**Misconception 3: the normal acceleration changes the speed.** The normal acceleration is always perpendicular to the velocity, does zero work, and changes only the direction; changing the speed requires a tangential acceleration.

**Misconception 4: the Galilean transformation is universal.** It holds only when the relative speed of the two frames is far below the speed of light; at high speed the Lorentz transformation is required.

**Misconception 5: relative velocities can be subtracted at will.** One must state clearly "who is relative to whom"; writing the sign backwards yields exactly the opposite conclusion. Fix the reference frame and the positive direction before starting.

## 6. Extensions and Synthesis

Two further coordinate systems in kinematics are worth knowing. The first is **polar coordinates**, which describe planar motion by $(r,\varphi)$; the velocity then has a radial component $\dot r$ and a transverse component $r\dot\varphi$, and the acceleration gains Coriolis and centripetal terms. This suits planetary orbits and rotating flows. The second is the **natural coordinate system** of Example 4, which decomposes along the tangent and normal of the path and matches most closely our intuition of "speeding up" and "turning".

Combining kinematics with the calculus also lets us recover position from acceleration: given $\vec{a}(t)$ together with the initial conditions $\vec{v}(t_0)$ and $\vec{r}(t_0)$, two successive integrations give the velocity and the position vector. This is the standard procedure for solving concrete motion problems. Many motions that look complicated (the cycloid of a charged particle in a uniform field, for instance) arise in this way. Master the main line "function—derivative—integral" and kinematics stops being a heap of scattered formulas and becomes a single coherent framework.

## 7. Worked Examples and Pitfalls

**Example 5: the river-crossing decision as relative motion.** Let the current have constant velocity $\vec{u}$ and let a boat have constant speed $v$ relative to still water. Which way should the bow point to land exactly opposite the starting point? The velocity of the boat relative to the bank is $\vec{v}_{\text{bank}} = \vec{v}_{\text{boat/water}} + \vec{u}$, and its component along the river must vanish, so the bow must point upstream with a component that exactly cancels the current. If $\alpha$ is the angle between the bow and the normal to the bank, then $v\sin\alpha = u$, that is $\alpha = \arcsin(u/v)$; crossing perpendicularly is possible only when $v>u$, otherwise the boat necessarily drifts downstream. This example turns "velocity addition" from an abstract formula into a concrete navigational decision, and reminds us that a poorly chosen frame can make a problem unrecognizable.

**Example 6: recovering the whole motion from an acceleration function.** Let the acceleration be $a(t)=kt$ (growing linearly in time) with initial velocity $v(0)=v_0$ and initial position $x(0)=x_0$. Integrating once gives $v(t)=v_0+\frac12 kt^2$, and integrating again gives $x(t)=x_0+v_0t+\frac16 kt^3$. The standard procedure shown here—"given the higher derivative and the initial values, integrate step by step"—is the universal template for kinematic calculations; any complicated acceleration can be handled this way, the only difference being how hard the integrals are. Measurements often supply $a$ as a function of position or of velocity instead, and then a change of variable (for instance $a=v\,dv/dx$) is needed before integrating; this is the focus of more advanced training.

**Example 7: three-dimensional helical motion.** A particle moves uniformly along the $z$ axis with $v_z$ while simultaneously executing uniform circular motion in the $xy$ plane; its path is a helix on a cylinder. Its position vector is $\vec{r}=R\cos\omega t\,\vec{i}+R\sin\omega t\,\vec{j}+v_z t\,\vec{k}$, its speed $\sqrt{(R\omega)^2+v_z^2}$ is constant, but its acceleration $\vec{a}=-R\omega^2(\cos\omega t\,\vec{i}+\sin\omega t\,\vec{j})$ always points toward the $z$ axis and only bends the path without changing the forward speed. Helical motion is the archetype of "translation plus rotation" superposed, and a prelude to the motion of charged particles in a magnetic field.

**Example 8: reading the shape of a trajectory from a velocity field.** If $v_x=A$ and $v_y=B\sin(\omega t)$, then $x=At+x_0$ and $y=-(B/\omega)\cos(\omega t)+y_0$; eliminating $t$ gives $y=y_0-(B/\omega)\cos(\omega x/A)$, a cosine wave stretched along the $x$ axis. Even simple rules of motion can therefore produce quite elaborate paths, which is exactly the value of the kinematic recipe "find the components first, then eliminate the parameter to get the trajectory".

These examples show that the real difficulty in kinematics was never the formulas themselves, but translating a real situation correctly into the language of position vectors, velocities, and accelerations, and choosing the right frame and coordinate system. With practice this translation becomes intuition—and intuition is the source of speed in problem solving.

## 8. Concept Map and Exam Patterns

When learning kinematics, organize the material along the main line "set up coordinates, write the position vector, differentiate step by step, integrate when needed". Exam problems fall roughly into four types. The first asks for kinematic quantities from one another, for instance velocity and displacement from a given acceleration, where the emphasis is on the integration and on the initial conditions. The second is projectile motion, whose core is the decomposition into uniform horizontal and uniformly accelerated vertical motion linked by a common time. The third is the acceleration decomposition of circular and curved motion, where one must separate the tangential part that changes the speed from the normal part that changes the direction, the normal part always pointing toward the centre of curvature. The fourth is relative motion, where the key is to choose the frame well and to write the velocity addition correctly; for rain relative to a pedestrian or a boat relative to a current, draw a diagram first and write the equations afterwards. In examinations the most frequent losses come from mistaking the normal acceleration for something that changes the speed, from reversing the signs in relative velocities, and from forgetting that at the apex of a parabola the vertical velocity component vanishes while the horizontal one does not. Plug these holes one by one and kinematics becomes a reliable source of marks.
`,
  },
  'newton-laws': {
    chapter: "Chapter 2 Newton's Laws of Motion",
    title: "Newton's Three Laws and Common Forces",
    summary:
      "Newton's three laws fix the relation between force and motion in an inertial frame: force is what changes a state of motion, and F=ma turns force, mass, and acceleration into a computable equation.",
    keyPoints: [
      'The law of inertia defines the inertial frame and the property of a body to preserve its state of motion',
      "Newton's second law F=ma is the central equation of classical dynamics",
      'Action and reaction are equal in magnitude, opposite in direction, and act on different bodies',
      'Common forces include gravity, elastic force (Hooke\'s law), and friction',
      "Newton's second law can still be used in a non-inertial frame once inertial forces are introduced",
    ],
    content: String.raw`

We learn as children that "push something and it moves". But the sharper question is: what does pushing produce? The ancient Greeks believed force maintains motion, and this intuition is deeply wrong—push a person gently on ice and they glide to a stop, so it seems that without force there is no motion. Yet on a smoother table they slide much farther. Newton's insight was to see through this: the stopping happens because of friction and other resistance, and without any force a body would keep its state of motion forever. The meaning of "force" is thereby inverted: force does not maintain motion, it **changes** it (that is, it produces acceleration).

This idea was condensed into three laws that together form the axiomatic foundation of classical mechanics. The first two tell us "how force determines acceleration in an inertial frame", the third tells us "forces always come in pairs". On top of this we must know the most common forces in nature: gravity, elastic force, and friction. Finally, when we are forced to describe motion in an accelerating frame (a turning car, say), we introduce "inertial forces" to patch things up.

It is worth stressing that Newton's laws are not "derived" from more basic principles; they are summarized experimental regularities and the cornerstone of the whole edifice of classical mechanics. Their preconditions are an **inertial frame** and **macroscopic, low-speed** phenomena; outside that range (strong gravitational fields, microscopic scales, speeds near that of light) they must be replaced by general relativity, quantum mechanics, or relativistic mechanics.

## 2. Rigorous Definitions

**Newton's first law (law of inertia)**: every body remains at rest or in uniform straight-line motion unless acted upon by an external force. It simultaneously **defines the inertial frame**—a frame in which a body free of forces moves uniformly in a straight line—and introduces the property of "inertia" (the larger the mass, the harder it is to change the state of motion).

**Newton's second law**: in an inertial frame, the resultant external force on a body equals its mass times its acceleration

$$\vec{F}_{\text{net}} = m\vec{a} = \frac{d\vec{p}}{dt}, \qquad \vec{p} = m\vec{v}$$

For constant mass this is $\vec{F}=m\vec{a}$; it is a vector equation, usually decomposed onto the coordinate axes and used component by component (for example $F_x=ma_x$).

**Newton's third law**: the forces two bodies exert on each other are always equal in magnitude, opposite in direction, and collinear:

$$\vec{F}_{12} = -\vec{F}_{21}$$

The key point: the two forces act on **different** bodies, so they **cannot cancel**.

**Gravity**: near the Earth a body experiences a force that is approximately constant

$$\vec{G} = m\vec{g}, \qquad g \approx 9.8\ \text{m/s}^2$$

**Elastic force (Hooke's law)**: within its elastic limit, an ideal spring exerts a force proportional to the deformation and directed toward the equilibrium position

$$F = -kx$$

The minus sign says that the force always tries to undo the deformation.

**Friction**:
- Kinetic friction $f_k = \mu_k N$, directed opposite to the relative sliding;
- Static friction $0 \le f_s \le \mu_s N$, its magnitude fixed by the equilibrium condition, exactly enough to prevent relative sliding.

Here $N$ is the normal force from the contact surface.

**Non-inertial frames and inertial forces**: in a frame translating with acceleration $\vec{a}_0$ relative to an inertial frame, if we still want to write $\vec{F}=m\vec{a}'$ we must introduce an inertial force

$$\vec{F}_{\text{inertial}} = -m\vec{a}_0$$

so that the effective equation reads $\vec{F} + \vec{F}_{\text{inertial}} = m\vec{a}'$. In a rotating frame there are also the centrifugal force $-m\omega^2\vec{r}_\perp$ and the Coriolis force $-2m\vec{\omega}\times\vec{v}'$.

## 3. Why It Works This Way

**Why is mass the measure of inertia?** Push an empty cart and a loaded cart with the same force and the latter accelerates less. The mass $m$ sits in the denominator, which is exactly what it means to measure a body's ability to resist acceleration—the quantitative expression of inertia.

**Why do action and reaction not cancel?** Because they act on two different bodies. You push a wall and the wall pushes you; both forces are real, but each changes the motion of its own body. Only when analysing the forces on a **single body** do we add up all the forces acting on it.

**Why can static friction be nonzero while nothing moves?** Static friction adjusts passively: push a table gently and it does not move, and the static friction is exactly equal to your push. Push harder and it grows too, until it reaches the limit $\mu_s N$ and "collapses" into kinetic friction. Its magnitude is set by the need for equilibrium, not by a fixed formula.

**Why invent a fictitious force in a non-inertial frame?** Because in an accelerating carriage you really do see a small ball roll "by itself" toward the rear, as if a force acted on it. To keep Newton's second law valid in that frame we accept that this "apparent force" exists there; it corresponds to no real interaction, but it makes the calculation consistent.

**Why write gravity as $mg$ rather than the full law of universal gravitation?** Near the Earth's surface the gravitational force varies very little with height, and the centrifugal effect of the Earth's rotation is already absorbed into the apparent $g$, so the constant force $mg$ is both simple and accurate enough.

## 4. Typical Calculations

**Example 1: a body on an inclined plane.** A mass $m$ rests on a smooth plane inclined at $\alpha$; resolve gravity along the plane and perpendicular to it: $mg\sin\alpha$ points down the slope and $mg\cos\alpha$ presses into the plane. The normal force is $N = mg\cos\alpha$, and along the slope $ma = mg\sin\alpha$, so the acceleration is

$$a = g\sin\alpha$$

**Example 2: connected bodies.** Two masses $m_1,m_2$ hang from a light string over a smooth pulley; the system feels the weight difference $(m_2-m_1)g$ and has total mass $m_1+m_2$, hence

$$a = \frac{(m_2-m_1)g}{m_1+m_2}$$

Applying $T - m_1 g = m_1 a$ to one body then gives the tension $T$.

**Example 3: a pendulum in a non-inertial frame.** In a carriage accelerating to the right with $a_0$, a suspended ball at rest relative to the carriage hangs with the string deviating from the vertical by

$$\tan\theta = \frac{a_0}{g}$$

This follows directly from the inertial force $-ma_0$ and the weight $mg$ combining along the string.

**Example 4: a horizontal pull with friction.** A mass $m$ is pulled by a horizontal force $F$ with friction coefficient $\mu$, so the net force is $F-\mu mg = ma$ and $a=(F-\mu mg)/m$; when $F\le \mu mg$ the body does not move and static friction exactly balances $F$.

## 5. Common Misconceptions

**Misconception 1: motion requires force.** Wrong. Without external force a body keeps its velocity (including rest); force only changes velocity.

**Misconception 2: action and reaction balance each other.** They act on different bodies and cannot cancel; what cancels are the balanced forces acting on one and the same body.

**Misconception 3: kinetic friction always opposes motion.** It opposes **relative** motion; sometimes it is the very thing that drives a body forward (as when a person walks, or when the ground pushes a wheel forward through static friction).

**Misconception 4: apparent weight gain or loss means gravity changed.** What changes is the normal force $N$; the weight $mg$ does not change. Accelerating upward gives $N>mg$ (apparent overweight), free fall gives $N=0$ (complete weightlessness).

**Misconception 5: inertial forces in non-inertial frames are "real forces".** They have no source body; they are introduced only for convenience in a particular accelerating frame.

## 6. Extensions and Synthesis

The real power of Newton's laws lies in **many-body systems** and **variable-force problems**. For connected bodies one usually uses the "whole-system method" to find the common acceleration and the "isolation method" to find internal forces (string tension, contact pressure); the two together solve any assembly, however complicated. For variable forces (an elastic force depending on position, a drag depending on velocity), the second law becomes the differential equation $m\ddot x = F(x,\dot x,t)$, which must be integrated subject to the initial conditions—this reduces mechanics to the standard routine "state the law, choose coordinates, solve the differential equation".

In the study of planets and satellites, universal gravitation supplies the centripetal force $G\dfrac{Mm}{r^2}=m\dfrac{v^2}{r}$, which directly relates orbital speed, period, and radius—one of the most brilliant achievements of Newtonian mechanics. Master the three steps "force analysis—orthogonal decomposition—write the equations" and the great majority of static and dynamic problems in classical mechanics will fall.

## 7. Worked Examples and Pitfalls

**Example 5: apparent weight in an elevator.** A person of mass $m$ stands on a scale in an elevator. When the elevator starts upward with acceleration $a$, the pressure on the scale satisfies $N-mg=ma$, that is $N=m(g+a)>mg$, an apparent overweight. Accelerating downward gives $mg-N=ma$ and $N=m(g-a)<mg$, an apparent weight loss. In free fall $a=g$ and $N=0$, complete weightlessness. Note that the weight $mg$ never changes; only the normal force does, which is the difference between "apparent weight" and "true weight".

**Example 6: connected bodies on an incline.** A block of mass $m_1$ lies on a smooth incline and is connected by a light string over a pulley to a hanging mass $m_2$. Applying Newton's second law to the system along the direction of motion gives $(m_2 g - m_1 g\sin\alpha) = (m_1+m_2)a$, hence the common acceleration; isolating $m_1$ then gives the tension $T = m_1(g\sin\alpha + a)$. This is the standard pattern "the whole system for the acceleration, isolation for the internal force", which solves almost every connected-body problem.

**Example 7: centrifugal effects in a non-inertial frame.** A body rotating uniformly on a turntable at rest relative to it nevertheless seems to be "pulled" outward. In the turntable frame one must introduce a centrifugal inertial force $m\omega^2 r$ to balance the real constraint force, which explains why it does not slide inward. Without the inertial force the real forces alone cannot account for its being at rest—exactly why non-inertial frames need them.

**Example 8: the passivity of static friction.** Place a book gently on a slightly tilted table: it may not move, and the static friction then points up the slope with magnitude exactly $mg\sin\alpha$. Increase the tilt and the static friction grows with it, until $\alpha$ reaches the critical angle $\theta_c$ with $\tan\theta_c=\mu_s$ and the book slides. The value of static friction is fixed entirely by "how much is needed for equilibrium"; the limit $\mu_s N$ is only an upper bound, so never write $f_s=\mu_s N$ straight away.

**Example 9: telling action and reaction apart.** When a horse pulls a cart, the force of the horse on the cart and the reaction of the cart on the horse are equal and opposite, and both are real. The cart moves forward because the static friction of the ground on the horse points forward and exceeds the resistance of the cart on the horse. Many people mistakenly think "action and reaction cancel, so the cart cannot move"; the error is to treat two forces acting on different bodies as balanced forces on one body. Distinguishing **which body each force acts on** is the key to applying the third law.

Taken together, success with Newton's laws hinges on two steps: first draw the force diagram, never omitting or duplicating a force; then decide firmly whether to use $\vec F= m\vec a$ in an inertial frame or to add inertial forces in a non-inertial one. Make these two steps muscle memory and dynamics will serve you everywhere.

## 8. Concept Map and Exam Patterns

The backbone of this chapter is the three laws plus three common forces, supplemented by the convenient treatment of non-inertial frames. Exam problems fall into five types. The first is a single body on an incline, where one must decompose gravity orthogonally and compute the normal direction before the tangential one. The second is connected bodies, where the routine is the whole system for the acceleration and isolation for the internal forces. The third is apparent weight, where one separates the change of the normal force from the constancy of the weight. The fourth involves friction, where the emphasis is on the passivity of static friction and the direction of kinetic friction. The fifth is non-inertial frames, where one remembers that the equations keep their form once inertial forces are included. Frequent losses come from treating action and reaction as balanced forces, from believing friction is always a resistance, from omitting the inertial force in a non-inertial frame, and from ignoring the assumption of a light pulley under which the tensions on the two sides are equal. Draw the force diagram first, mark the reference frame clearly, and then decide between Newton's second law and an added inertial force; following this order avoids almost every mistake.

## 9. Mnemonics and Distinctions

To aid memory, the chapter can be compressed into a few lines: the first law fixes inertia, the second computes acceleration, the third produces pairs; gravity points down, elastic force points to equilibrium, friction looks at relative motion. There are three groups of easily confused ideas. First, balanced forces versus action and reaction: balanced forces act on the same body and sum to zero, whereas action and reaction act on different bodies and cannot cancel. Second, overweight versus weightlessness: look at the direction of the acceleration, not of the velocity—accelerating upward means overweight regardless of whether the motion is up or down. Third, static versus kinetic friction: static friction varies as needed up to the limit $\mu_s N$, while kinetic friction is always $\mu_k N$, always opposes relative sliding, and yet is often what drives a body forward rather than resisting it. Memorize these three distinctions and the conceptual questions in an exam will give you little trouble.
`,
  },
  momentum: {
    chapter: 'Chapter 3 Momentum and Impulse',
    title: 'The Impulse–Momentum Theorem and Conservation of Momentum',
    summary:
      'The accumulation of force over time is impulse, which equals the change of momentum; when the resultant external force on a system vanishes, the total momentum is conserved—the master key to collisions and recoil.',
    keyPoints: [
      'Impulse is the time integral of force and the cause of any change in momentum',
      'The impulse–momentum theorem links a process quantity (impulse) with a state quantity (momentum)',
      'The total momentum of a system is conserved when the resultant external force is zero',
      'Kinetic energy is conserved in elastic collisions; after a perfectly inelastic collision the bodies share one velocity',
      'The motion of the centre of mass is governed only by the resultant external force',
    ],
    content: String.raw`

In billiards the cue ball strikes the object ball: the object ball flies off and the cue ball stops. What exactly is "handed over" here? Not velocity (stopping and flying off are different velocities), and not force alone (the contact force is brief but enormous and hard to measure directly). Newton's second law $\vec{F}=m\vec{a}=m\,d\vec{v}/dt$ tells us that the accumulated effect of a force over time equals mass times the change of velocity—and this quantity "mass times velocity", $\vec{p}=m\vec{v}$, is called **momentum**. Momentum packages a body's "capacity for motion" into a conserved quantity: with no external interference, the total momentum of a system stays the same no matter how its parts collide internally. That is why collisions, explosions, and rocket recoil are easier to handle with momentum than with the details of forces—you need not know the complicated contact forces during the impact, only the states before and after.

Even better, momentum conservation is naturally tied to the concept of the **centre of mass**: the centre of mass behaves like a single massive particle driven only by the resultant external force. So "how the whole thing moves" is decided by the centre of mass, and "how the inside churns" is decided by relative motion. This chapter rests on these three ideas—impulse, momentum, and centre of mass.

The introduction of impulse gives "a brief but large force" a measurable language. An egg dropped on a carpet survives while the same egg on a stone floor breaks; the force is not different, the duration is, and hence the average impact force differs enormously. By integrating force over time we capture the main line of impacts, blows, and cushioning.

## 2. Rigorous Definitions

**Momentum**: the product of a particle's mass and velocity

$$\vec{p} = m\vec{v}$$

It is a vector, directed along the velocity; for a system one takes the sum over particles $\vec{P} = \sum m_i\vec{v}_i$.

**Impulse**: the accumulation of force over time

$$\vec{I} = \int_{t_1}^{t_2} \vec{F}(t)\,dt$$

For a constant force $\vec{I} = \vec{F}\Delta t$. Impulse is a vector directed along the force. Engineering estimates use the average impact force $\bar{F} = \Delta p/\Delta t$.

**Impulse–momentum theorem** (for a particle):

$$\vec{I} = \int \vec{F}\,dt = \Delta\vec{p} = m\vec{v}_2 - m\vec{v}_1$$

It says that "the accumulation of force in time changes momentum".

**Law of conservation of momentum**: if the resultant external force on a system is zero ($\sum \vec{F}_{\text{ext}} = 0$), the total momentum stays constant

$$\vec{P} = \text{constant vector}$$

Note that internal forces cannot change the total momentum, only redistribute it; and even when the resultant external force is nonzero, momentum is still conserved along any direction in which its component vanishes.

**Collisions**: after a head-on collision of two particles, the outcome is described by momentum conservation together with the coefficient of restitution $e$. An elastic collision has $e=1$ and conserves kinetic energy; a perfectly inelastic collision has $e=0$ and a common final velocity. In general, in one dimension:

$$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$$

For the elastic case one adds $\frac12 m_1 v_1^2 + \frac12 m_2 v_2^2 = \frac12 m_1 v_1'^2 + \frac12 m_2 v_2'^2$.

**Centre of mass**: the mass-weighted average position of a system

$$\vec{R}_c = \frac{\sum m_i \vec{r}_i}{M}, \qquad M = \sum m_i$$

**Centre-of-mass theorem**:

$$M\vec{a}_c = \sum \vec{F}_{\text{ext}} = \frac{d\vec{P}}{dt}$$

That is, the centre of mass moves like a particle of mass $M$ under the resultant external force; internal forces do not affect its trajectory.

## 3. Why It Works This Way

**Why is momentum better than velocity for describing a "handover"?** Because during a collision velocities jump and differ from body to body, whereas the total momentum is rock solid (when no external force acts). It is the ledger of the "inventory" of motion; internal transfers do not change the total.

**Why do internal forces leave the total momentum unchanged?** Every pair of internal forces is equal and opposite (Newton's third law), so they appear in pairs in the change of total momentum and cancel each other; they only redistribute momentum inside the system and never shake the whole.

**Why does a perfectly inelastic collision lose kinetic energy?** Because once the bodies stick together, the kinetic energy of their relative motion is dissipated internally into heat and deformation. Momentum is conserved but kinetic energy is not, and the difference is exactly the dissipated energy.

**Why is the centre-of-mass trajectory so "clean"?** Because all internal forces cancel in pairs, leaving only the resultant external force to drive the centre of mass. Even if the system explodes into chaos inside (an explosion, a person walking on a boat), the centre of mass continues smoothly along its original path.

**Why does cushioning reduce injury?** Because $\bar F = \Delta p/\Delta t$: lengthening the interaction time $\Delta t$ reduces the average impact force proportionally. This is the principle of airbags, trampolines, and bending the knees on landing.

## 4. Typical Calculations

**Example 1: perfectly inelastic collision.** A bullet of mass $m$ travelling at $v$ embeds itself in a stationary block $M$ and they move together. With no horizontal external force, momentum is conserved:

$$mv = (m+M)V \quad\Rightarrow\quad V = \frac{m}{m+M}v$$

The kinetic energy is $\frac12 mv^2$ before and $\frac12(m+M)V^2 = \frac{m^2}{2(m+M)}v^2$ after, so the fraction lost is $\frac{M}{m+M}$.

**Example 2: rocket recoil (momentum conservation in differential form).** Let the rocket have mass $m$ and let the exhaust speed relative to the rocket be $u$; momentum conservation of the system yields the Tsiolkovsky formula

$$\Delta v = u\ln\frac{m_0}{m}$$

so the velocity increment depends on the exhaust speed and the mass ratio.

**Example 3: motion of the centre of mass.** A person of mass $m$ walks from bow to stern on a stationary boat of mass $M$ and length $L$. With no horizontal external force the centre of mass does not move, so the boat shifts forward relative to the water by $x = \frac{m}{m+M}L$.

**Example 4: velocities in an elastic collision.** Solving the one-dimensional elastic collision gives $v_1' = \frac{m_1-m_2}{m_1+m_2}v_1 + \frac{2m_2}{m_1+m_2}v_2$; when $m_1=m_2$ the two bodies exchange velocities, which is why billiard balls "hand over" motion so crisply.

## 5. Common Misconceptions

**Misconception 1: momentum conservation requires that no force act on the system.** Only the **resultant external force** must vanish; internal forces, however large, do not affect the total momentum.

**Misconception 2: all collisions conserve kinetic energy.** Only elastic collisions do; inelastic collisions lose kinetic energy.

**Misconception 3: momentum conservation is a scalar statement.** Momentum is a vector, so conservation must be checked direction by direction; it often happens that momentum is conserved along one axis and not along another.

**Misconception 4: the centre of mass always lies inside the body.** For a hollow ring or a crescent-shaped body it may lie in the cavity or outside the body.

**Misconception 5: the size of an impulse depends only on the magnitude of the force.** It also depends on the duration; a brief large force and a sustained small force can both produce appreciable impulses.

## 6. Extensions and Synthesis

Momentum conservation is especially important for **variable-mass systems**: rockets, condensing raindrops, and coal delivered by a conveyor belt can all be handled with the "differential form of the impulse–momentum theorem". The core remains $\vec{F}_{\text{ext}} = d\vec{P}/dt$, only now the boundary of the system moves, so one cannot simply equate the total momentum before and after but must write the rate equation.

In **two-dimensional collisions** momentum conservation is a vector equation and must be written in two directions; only together with the coefficient of restitution or an energy condition can the post-collision velocities be determined uniquely. The centre-of-mass frame often simplifies matters: there the total momentum is always zero and an elastic collision merely reverses the velocities, making the picture exceptionally clear. To understand momentum is to hold the master key to every problem about collisions, explosions, and recoil.

## 7. Worked Examples and Pitfalls

**Example 5: displacement in the person-and-boat model.** A person of mass $m$ walks from bow to stern of a boat of mass $M$ and length $L$ that was initially at rest. With no horizontal external force the centre of mass does not move. Let the boat's displacement relative to the water be $x$ (positive backwards); then the person's displacement relative to the water is $x-L$ (with a consistent sign convention). The centre of mass being fixed gives $M x + m(x-L)=0$, hence $x = \frac{m}{m+M}L$. The distance the person walks and the distance the boat retreats are in the ratio of the masses, independent of how fast the person walks—an elegant result that follows purely from momentum (centre-of-mass) conservation.

**Example 6: oblique impact of a ball on a wall.** A ball of mass $m$ strikes a smooth vertical wall with velocity $\vec v$ at an angle $\theta$; the wall supplies an impulse only in the horizontal direction, so the vertical velocity is unchanged. After an elastic impact the horizontal velocity reverses with the same magnitude while the vertical component is preserved, so the outgoing angle equals the incoming one and the speed is unchanged. Momentum is not conserved in this process (the wall is attached to the Earth, so the resultant external force on the system is nonzero), but the horizontal momentum is transferred to the Earth. The lesson: always confirm the premise "resultant external force is zero" before invoking momentum conservation, otherwise apply it only along one direction or to part of the system.

**Example 7: a rear-end collision, perfectly inelastic.** A car of mass $M$ is at rest and a car of mass $m$ hits it at $v$ and they stick together. The common velocity is $V=mv/(m+M)$ and the kinetic energy loss is $\Delta E = \frac12 m v^2 - \frac12(m+M)V^2 = \frac12 \frac{mM}{m+M}v^2$. The lost fraction grows as the two masses become comparable and shrinks as one mass greatly exceeds the other—which explains why "a small car hitting a large one" is more dangerous, while a large car rear-ending a small one disperses the energy over a greater mass.

**Example 8: an explosion.** A stationary shell bursts into two fragments; momentum conservation requires the two momenta to be equal in magnitude and opposite in direction. If one fragment happens to be at rest, the other must carry off all the original momentum (here zero, so the fragments must again be equal and opposite). The internal forces of an explosion greatly exceed external ones such as gravity, so momentum may be treated as conserved over the short interval—the standard approximation for blasting and for stage separation of rockets.

**Example 9: the physical meaning of the coefficient of restitution.** In a one-dimensional collision the coefficient of restitution $e = \frac{v_2'-v_1'}{v_1-v_2}$ measures the "elasticity" of the impact: $e=1$ is perfectly elastic (all kinetic energy kept), $e=0$ is perfectly inelastic (common velocity), and $0<e<1$ is partially inelastic. It compresses "how much kinetic energy is lost" into a dimensionless number between zero and one, used in engineering to characterize materials and impact types.

In learning momentum, the worst mistake is to treat conservation as an unconditional universal tool. Confirm the system boundary and the external forces in your head first, and only then decide whether it applies; form this habit and collision problems lose all their mystery.

## 8. Concept Map and Exam Patterns

The backbone of this chapter is impulse, the impulse–momentum theorem, and momentum conservation, together with the centre of mass and the classification of collisions. Exam problems fall into five types. The first is a collision solved directly by momentum conservation, where the initial and final momenta must be written out and treated direction by direction. The second is the perfectly inelastic collision, whose signature is a common final velocity. The third is the elastic collision, which requires both momentum and kinetic energy conservation, or the ready-made velocity formulas. The fourth is variable mass and recoil, such as rockets and condensing raindrops, where the differential form of the theorem is needed. The fifth is centre-of-mass motion, common in the person-and-boat model and in the internal redistribution of a system. The commonest errors are using momentum conservation without checking that the resultant external force vanishes, forgetting that momentum is a vector and must be verified axis by axis, assuming the centre of mass must lie inside the body, and confusing the coefficient of restitution with the kinetic energy loss. The iron rule is: delimit the system, confirm the external forces, decide whether conservation applies, and finally check units and directions—then you will hardly ever slip.

## 9. Mnemonics and Distinctions

The chapter's mnemonic: impulse is accumulation, momentum is state; with no external force, momentum never changes; the centre of mass follows external forces and ignores internal ones. There are four groups of easily confused ideas. First, momentum conservation and mechanical energy conservation have different conditions: the former asks whether the resultant external force vanishes, the latter whether only conservative forces do work; neither implies the other. Second, elastic versus inelastic collisions: elastic conserves kinetic energy, perfectly inelastic maximizes the loss with a common final velocity, and partially inelastic lies in between, described by the coefficient of restitution. Third, momentum is a vector and must be checked direction by direction; momentum is often conserved horizontally while not vertically. Fourth, the position of the centre of mass need not lie inside the body, and hollow or irregular shapes require particular care. Combine the mnemonic with these distinctions and both conceptual and computational questions become manageable.

## 10. Further Thoughts

The concept of momentum is generalized at higher levels of physics. In relativity momentum is written $\vec p = \gamma m\vec v$ with $\gamma=1/\sqrt{1-v^2/c^2}$; as the speed approaches that of light, momentum is no longer proportional to velocity, and this is the origin of the mass-energy relation $E^2=p^2c^2+m^2c^4$. In continuous media and fluids, momentum is transported through space as a "momentum flux", and the corresponding conservation law appears as the convective term in the Navier–Stokes equations. Even in electromagnetism, electromagnetic waves carry momentum, and radiation pressure is the macroscopic manifestation of that momentum being absorbed or reflected by a body. The humble $m\vec v$ of the classroom is thus a unifying thread running through both classical and modern physics, and repays repeated reflection.
`,
  },
  'work-energy': {
    chapter: 'Chapter 4 Work and Energy',
    title: 'Work, the Work–Kinetic Energy Theorem, and Potential Energy',
    summary:
      'The accumulation of force over space is work, which turns into a change of kinetic energy; the work of a conservative force is path-independent, which allows a potential energy to be defined and yields the powerful tool of mechanical energy conservation.',
    keyPoints: [
      'Work is the accumulation of force along the displacement, W=∫F·dr',
      'The work–kinetic energy theorem ties the total work directly to the change of kinetic energy',
      'A conservative force does path-independent work, so a potential energy can be defined',
      'Gravity, elastic force, and universal gravitation are all conservative',
      'Mechanical energy is conserved only when conservative forces alone do work',
    ],
    content: String.raw`

Lifting weights tires you because you keep exerting a force while moving through a distance; pushing a wall until your back aches but never moving it is exhausting yet "does no work". In physics "work" measures exactly the accumulation of force over space: force without displacement is not work, and the more closely the force aligns with the displacement, the more work is done. Linking "work" to "kinetic energy" (the capacity to do work that a body possesses by virtue of its motion) yields the work–kinetic energy theorem, which bypasses the complicated details of how the force varies during the process and compares only the initial and final states.

Work admits a deeper classification as well: for some forces (gravity, for instance) the work depends only on the endpoints and not on the path, and such **conservative forces** can be associated with a "stored energy"—the potential energy. The total mechanical energy of the system (kinetic plus potential) is then constant whenever only conservative forces do work. This is far easier than analysing forces one by one: identify which forces in the system are conservative and which dissipate, and you can write the energy conservation equation directly, solving a host of problems from the simple pendulum to the spring oscillator.

The greatness of the energy viewpoint lies in its **universality**: mechanical energy can be converted into internal energy, electrical energy, or chemical energy, and "conservation of total energy" is a more fundamental law of nature than "conservation of mechanical energy". In this chapter we build the language of work and energy within mechanics, laying the foundation for later cross-disciplinary energy analysis.

## 2. Rigorous Definitions

**Work** (constant force along a straight line): the dot product of force and displacement

$$W = \vec{F}\cdot\vec{s} = Fs\cos\theta$$

where $\theta$ is the angle between force and displacement. For a variable force along a curved path:

$$W = \int_A^B \vec{F}\cdot d\vec{r}$$

Work is a scalar and may be positive or negative: positive when force and displacement agree in direction, negative when they oppose.

**Kinetic energy**:

$$E_k = \frac12 mv^2$$

**Work–kinetic energy theorem**: the work done by the resultant force on a particle equals the change of its kinetic energy

$$W_{\text{net}} = \Delta E_k = \frac12 mv_2^2 - \frac12 mv_1^2$$

It connects a "process" (work) with a "state" (kinetic energy) and requires no knowledge of how the acceleration varied in between.

**Conservative force**: a force whose work is path-independent and depends only on the initial and final positions. An equivalent criterion: the work around any closed loop vanishes, $\oint \vec{F}\cdot d\vec{r}=0$.

**Potential energy**: for a conservative force one defines a potential energy $E_p$ satisfying

$$W_{\text{cons}} = -\Delta E_p = E_{p1} - E_{p2}$$

Common cases: gravitational potential energy $E_p = mgh$ (with some horizontal level as zero); elastic potential energy $E_p = \frac12 kx^2$; gravitational potential energy of two masses $E_p = -G\frac{Mm}{r}$.

**Mechanical energy**:

$$E = E_k + E_p$$

**Law of conservation of mechanical energy**: if only conservative forces do work (non-conservative and dissipative forces do none), then

$$E_k + E_p = \text{constant}$$

If non-conservative forces such as sliding friction are present, then $\Delta E_k + \Delta E_p = W_{\text{non-cons}}$.

## 3. Why It Works This Way

**Why is work a dot product?** Because only the component of the force along the displacement actually "pushes" the body forward; the component perpendicular to the displacement (the centripetal force of uniform circular motion, for example) does no work and only changes the direction. The dot product extracts precisely this effective component.

**Why is kinetic energy proportional to $v^2$ rather than $v$?** Because it comes from an integral: for uniform acceleration $v^2-v_0^2=2as$, and multiplying by $\frac12 m$ gives the work $Fs=\Delta(\frac12 mv^2)$. The $v^2$ dependence makes the kinetic energy of a fast body grow steeply, which is why the destructiveness of a car crash grows with the square of the speed.

**Why can potential energy be defined only for conservative forces?** If the work depended on the path, no "position" could uniquely determine the stored energy; only when the work is path-independent does fixing one point as zero assign a definite value to every other point.

**Why does mechanical energy conservation require "conservative forces only"?** Non-conservative forces such as friction convert mechanical energy into internal energy. The total energy is still conserved (the first law of thermodynamics), but the mechanical part is no longer constant. Conservation is conditional, and the condition is written into the premise.

**Why can potential energy be negative (gravitational)?** Because the zero is taken at infinity, and gravity does positive work as the potential energy decreases, so at finite separation the potential energy is negative. What matters is the difference of potential energy, not its absolute value.

## 4. Typical Calculations

**Example 1: sliding down an incline.** A mass $m$ slides down a smooth incline from height $h$; only gravity does work, so mechanical energy is conserved:

$$mgh = \frac12 mv^2 \quad\Rightarrow\quad v = \sqrt{2gh}$$

independent of the inclination and length of the incline—a direct consequence of potential energy depending only on height.

**Example 2: a spring oscillator.** A spring compressed by $x_0$ is released and returns to its natural length, converting all its elastic potential energy into kinetic energy:

$$\frac12 kx_0^2 = \frac12 mv^2 \quad\Rightarrow\quad v = x_0\sqrt{\frac{k}{m}}$$

**Example 3: the work of a variable force via the theorem.** A body decelerating under a drag $f = -cv$ allows the stopping distance to be obtained by integrating $W = \Delta E_k$, avoiding any need to track the instantaneous acceleration.

**Example 4: the condition at the top of a loop.** For a circular track of radius $R$, passing the top safely requires $mg \le m v^2/R$, that is $v \ge \sqrt{gR}$; mechanical energy conservation then gives a minimum starting height $h = \frac52 R$.

## 5. Common Misconceptions

**Misconception 1: force means work.** There must be a displacement along the force; holding a weight motionless is tiring but does no work.

**Misconception 2: the work–kinetic energy theorem holds only for constant forces.** It holds equally for variable forces and curved paths, provided one uses the total work (by integration or by summing over segments).

**Misconception 3: potential energy belongs to a single body.** Potential energy belongs to "the body plus the field" (or the system); speaking of "the gravitational potential energy of a body" is shorthand, and strictly it belongs to the Earth–body system.

**Misconception 4: mechanical energy conservation always holds.** It fails when non-conservative forces such as friction or air resistance do work, and then one must use total energy conservation including internal energy.

**Misconception 5: since the zero of potential energy is arbitrary, potential energy is meaningless.** The zero is arbitrary, but the difference between two points (which is the work done by the conservative force) is definite and measurable.

## 6. Extensions and Synthesis

The work–energy principle is the culmination of this chapter: the work of the resultant force equals the change of kinetic energy, and that work splits into conservative and non-conservative parts, so that

$$W_{\text{non-cons}} = \Delta E_k + \Delta E_p = \Delta E_{\text{mech}}$$

It reduces the question "is mechanical energy conserved?" to the single criterion "does any non-conservative force do work?", and is extremely widely used. When a conveyor belt accelerates a body to $v$, for instance, the work done by the motor becomes partly the kinetic energy of the body and partly heat from sliding friction, and the principle computes both exactly.

In a wider view, mechanical energy is only one form of energy. Friction producing heat is the conversion of mechanical into internal energy; a generator converts mechanical into electrical energy. Energy conservation cuts across every branch of physics and is nature's most reliable bookkeeping rule. Once you command work, kinetic energy, potential energy, and the bridges between them (the work–kinetic energy theorem and the work–energy principle), you own the tools to solve almost any energy problem in mechanics.

## 7. Worked Examples and Pitfalls

**Example 5: the energy method for a string-connected body.** A small ball of mass $m$ attached to a light string of length $l$ is released from rest in the horizontal position; find its speed at the lowest point. It descends a height $l$ and all the gravitational potential energy becomes kinetic energy: $mgl = \frac12 m v^2$, so $v=\sqrt{2gl}$, with no need anywhere to analyse the tension or the tangential acceleration—far simpler than Newton's laws. Furthermore, at the lowest point the tension follows from $T-mg=mv^2/l$, giving $T=3mg$: the energy method delivers the speed and the force method the forces, and the two complement each other.

**Example 6: a spring gun firing a ball.** A spring compressed by $x_0$ is released and launches a ball from rest along a smooth horizontal surface. The elastic potential energy $\frac12 kx_0^2$ becomes the ball's kinetic energy, giving the muzzle speed $v=x_0\sqrt{k/m}$. If the gun is mounted on a movable platform, part of the energy remains as the recoil kinetic energy of the platform and the ball's speed is smaller; mechanical energy is still conserved for the ball-plus-platform system, but momentum conservation is needed to distribute the energy—an illustration of work, energy, and momentum used together.

**Example 7: where a body stops on a rough incline.** A body slides up a rough incline of angle $\alpha$ with initial speed $v_0$ and friction coefficient $\mu$; find the maximum distance travelled. While ascending, the kinetic energy is spent overcoming gravity and friction: $\frac12 m v_0^2 = mg s\sin\alpha + \mu mg\cos\alpha\, s$, hence $s = \frac{v_0^2}{2g(\sin\alpha+\mu\cos\alpha)}$. Starting from the top at rest instead, whether it begins to slide depends on comparing $\tan\alpha$ with $\mu$. Work and energy let us skip the complicated deceleration and go straight to the endpoint.

**Example 8: reading a potential energy curve.** Plot the potential energy $E_p(x)$ of a one-dimensional conservative system; the force $F=-dE_p/dx$ is minus the slope of the curve, and equilibrium points correspond to zero slope—minima are stable equilibria and maxima unstable ones. The total energy $E$ of the particle is a horizontal line, and the gap between the potential curve below it and $E$ is the kinetic energy. This "energy landscape" displays the range of motion, the turning points, and the stability at a glance, and is a universal tool for understanding molecular bonds, lattice vibrations, and astrophysical potential wells.

**Example 9: power and the rate of doing work.** The work done per unit time is the power $P = \vec F\cdot\vec v$. A car starting at constant power $P$ has a traction force that falls as the speed rises, so the acceleration decreases until the speed becomes uniform; combining $P=Fv$ with $F-f=ma$ gives a differential equation for the speed. The power viewpoint introduces "how fast work is done" into energy analysis and is a central concept in mechanical and electrical machine design.

The essence of the energy method is "ask only about the endpoints, not the process", but its premise is that every conservative and non-conservative contribution has been accounted for. Form the habit of first judging conservation, then writing the equation, then checking the units, and energy problems become both fast and safe.

## 8. Concept Map and Exam Patterns

This chapter rests on four pillars—work, the work–kinetic energy theorem, potential energy, and mechanical energy conservation—with the work–energy principle at the centre. Exam problems fall into five types. The first is computing the work of a constant or variable force, with the emphasis on the dot product and the integral. The second is applying the work–kinetic energy theorem to a single body, bypassing a complicated process to compare initial and final kinetic energies. The third is recognizing conservative forces and their potential energies; gravity, elastic force, and universal gravitation are all conservative and admit a potential energy. The fourth is mechanical energy conservation, whose premise is that only conservative forces do work. The fifth is the work–energy principle with non-conservative forces, where the non-conservative work equals the change of mechanical energy. Common losses come from thinking that force implies work, attributing potential energy to a single body, assuming mechanical energy is always conserved, and overlooking that the zero of potential energy is arbitrary so that only differences matter. Judge the system first, then the conservation conditions, and prefer the energy method to dodge tedious force analysis—it is both faster and more accurate.

## 9. Mnemonics and Distinctions

The chapter's mnemonic: dot product for work, integration for the total; the work–kinetic energy theorem asks only about the endpoints; conservative forces define potential energy, and mechanical energy conservation depends on conditions. There are four groups of easily confused ideas. First, whether work is done: a force and a displacement along it are both required, perpendicular components do nothing, and holding a body still does no work. Second, the scope of the work–kinetic energy theorem: it holds for constant forces, variable forces, and curved paths alike, requiring only the total work and no details of the process. Third, to whom potential energy belongs: it belongs to a system, not a single body, and "the gravitational potential energy of a body" is only shorthand. Fourth, mechanical energy conservation versus energy conservation: the former is a special case of the latter, and with friction and other non-conservative forces mechanical energy is not conserved while the total energy still is. Keep these clear and the energy method will come readily to hand.

## 10. Further Thoughts

The ideas of work and energy reach far beyond mechanics. In thermal physics the internal energy is the sum of molecular kinetic and potential energies, and the first law of thermodynamics is essentially energy conservation including heat transfer. In electromagnetism a source does work converting other forms of energy into electric field energy, while the work of the Ampère force realizes the exchange between electrical and mechanical energy. In relativity the total energy $E=\gamma mc^2$ treats mass itself as a form of energy. Energy conservation may be called nature's most reliable bookkeeping rule; it keeps its form across every branch, which is why fluency with the work–energy viewpoint is a mark of physical literacy. To master the work–energy principle in mechanics is to hold the key that opens the whole of energy physics.
`,
  },
  'angular-momentum': {
    chapter: 'Chapter 5 Angular Momentum',
    title: 'Torque and Conservation of Angular Momentum',
    summary:
      'Torque describes the tendency of a force to rotate a body about an axis, and angular momentum is the rotational counterpart of momentum; when the resultant torque vanishes, angular momentum is conserved, which explains the conical pendulum and Kepler\'s second law.',
    keyPoints: [
      'Torque M = r × F determines changes of rotational state',
      'Angular momentum L = r × p is the candidate conserved quantity in rotation',
      'The angular momentum theorem M = dL/dt',
      'Angular momentum is conserved when the resultant external torque is zero',
      'Conservation explains the conical pendulum, the speeding up of a skater pulling in the arms, and Kepler\'s area law',
    ],
    content: String.raw`

When you push a door, the farther you are from the hinge the less effort it takes—the same force at a different point of application produces a very different rotational effect. So the ability to "make a body turn about a point" depends not only on the magnitude of the force but also on the perpendicular distance from the line of action to the axis (the lever arm). This rotational version of "influence" is called **torque**. Correspondingly, where translation has momentum, rotation has an analogous quantity—**angular momentum**—which measures a body's "stock of rotation about an axis".

Remarkably, just as momentum is conserved when no external force acts, angular momentum is conserved when no external torque acts. You have surely seen a figure skater spin faster after pulling in the arms: pulling them in reduces the moment of inertia, and since angular momentum is fixed, the angular velocity must increase. A planet orbiting the Sun feels a gravitational force always directed toward the centre, so the torque about the centre vanishes and angular momentum is conserved—which leads directly to Kepler's second law, "equal areas in equal times". Angular momentum raises rotation to a status equal to that of momentum and is the cornerstone for analysing rotating systems from planets to gyroscopes to atoms.

Torque and angular momentum are easily confused with "force" and "momentum" at first, but remember: **torque is the rotational effect of force, angular momentum is the rotational effect of momentum**, and the angular momentum theorem $ \vec{M}=d\vec{L}/dt $ is formally identical in shape to Newton's second law $ \vec{F}=d\vec{p}/dt $, which makes both memory and application straightforward.

## 2. Rigorous Definitions

**Torque** (about a reference point $O$): the cross product of the position vector and the force

$$\vec{M} = \vec{r} \times \vec{F}, \qquad |\vec{M}| = rF\sin\theta = F\cdot d$$

where $d$ is the lever arm (the perpendicular distance from the axis to the line of action). Torque is a vector whose direction is given by the right-hand rule and lies along the axis.

**Angular momentum** (of a particle about $O$):

$$\vec{L} = \vec{r} \times \vec{p} = \vec{r} \times m\vec{v}, \qquad |\vec{L}| = mvr_\perp$$

For a rigid body rotating about a fixed axis, $\vec{L} = I\vec{\omega}$, where $I$ is the moment of inertia.

**Angular momentum theorem**:

$$\vec{M} = \frac{d\vec{L}}{dt}$$

that is, the resultant external torque equals the rate of change of angular momentum—the rotational version of Newton's second law.

**Law of conservation of angular momentum**: if the resultant external torque about some reference point vanishes ($\vec{M}=0$), then

$$\vec{L} = \text{constant vector}$$

A common case: in a central force field (the force always points toward a fixed centre) the torque about the force centre vanishes identically, so angular momentum is conserved.

**Conical pendulum**: the bob moves uniformly in a horizontal circle, gravity and the string tension together supply the centripetal force, and the string sweeps out a cone. About the suspension point the gravitational torque makes $\vec{L}$ precess slowly, but the component along the vertical axis is conserved.

**Kepler's second law (constant areal velocity)**: under a central force

$$\frac{dA}{dt} = \frac{L}{2m} = \text{constant}$$

so equal areas are swept in equal times—the geometric expression of angular momentum conservation.

## 3. Why It Works This Way

**Why is torque a cross product rather than a dot product?** Because the dot product gives the component of force along the radius, which cannot make a body rotate; what actually produces rotation is the component perpendicular to the position vector, and the cross product magnitude $rF\sin\theta$ extracts exactly that component while its direction indicates the axis of rotation.

**Why must angular momentum be conserved under a central force?** Because the force $\vec{F}$ and the position vector $\vec{r}$ are collinear, so the cross product $\vec{r}\times\vec{F}=0$, the torque vanishes, and angular momentum is automatically constant. Gravity and the Coulomb force are both central, which is why planetary and electronic orbits both conserve angular momentum.

**Why does pulling in the arms make a skater spin faster?** Angular momentum $L=I\omega$ is fixed, pulling in the arms reduces the moment of inertia $I$, so the angular velocity $\omega$ must increase. This is not "acceleration out of nothing"; the price is paid by bringing mass closer to the axis and lowering $I$.

**Why does the bob of a conical pendulum not fall?** The vertical component of the tension balances gravity and the horizontal component supplies the centripetal force; the vertical resultant vanishes and there is no vertical acceleration, so the rotation is steady.

**Why is angular momentum conservation less intuitive than momentum conservation?** Because everyday rotation is usually damped by friction (non-conservative torques), and the pure conservation is seen mostly in nearly dissipation-free settings such as celestial bodies and ice rinks; it takes deliberate recognition.

## 4. Typical Calculations

**Example 1: angular velocity and inclination of a conical pendulum.** With string length $l$, bob mass $m$, and angle $\theta$ to the vertical, the radius of the circle is $r = l\sin\theta$. Vertical equilibrium gives $T\cos\theta = mg$ and the horizontal equation gives $T\sin\theta = m\omega^2 r = m\omega^2 l\sin\theta$; eliminating $T$,

$$\omega^2 = \frac{g}{l\cos\theta}$$

The larger $\theta$ is (the lower the bob swings), the larger the angular velocity.

**Example 2: a skater pulling in the arms.** With initial $I_1,\omega_1$ and final $I_2$, $I_1\omega_1 = I_2\omega_2$ gives

$$\omega_2 = \frac{I_1}{I_2}\omega_1$$

If $I_2 = I_1/2$ the spin rate doubles.

**Example 3: areal velocity.** On an elliptical orbit with perihelion speed $v_p$ and distance $r_p$, angular momentum conservation gives $r_p v_p = r_a v_a$, and the areal velocity is $\frac{dA}{dt} = \frac12 r_p v_p$.

**Example 4: angular momentum of a particle in circular motion.** A mass $m$ moving at speed $v$ on a circle of radius $R$ has $L = m v R = m R^2 \omega = I\omega$ about the centre, consistent with the rigid-body formula.

## 5. Common Misconceptions

**Misconception 1: torque is a scalar like force.** Torque is a vector with a direction (about an axis), and torques of equal magnitude and opposite sense have opposite effects.

**Misconception 2: angular momentum conservation requires zero resultant force.** Only the resultant **torque** must vanish; under a central force the resultant force is nonzero and angular momentum is still conserved.

**Misconception 3: a skater speeding up by pulling in the arms violates energy conservation.** The kinetic energy grows with the spin rate, and the energy comes from the work the skater does in pulling the arms in (muscular effort); the total energy is conserved.

**Misconception 4: $L=I\omega$ applies to every rotation.** It holds only for rotation about a fixed axis or for a symmetric rigid body; the angular momentum of a general particle must be computed as $\vec{r}\times\vec{p}$.

**Misconception 5: a conical pendulum and a simple pendulum have the same period.** The conical pendulum has $T=2\pi\sqrt{l\cos\theta/g}$, shorter than $2\pi\sqrt{l/g}$ for a simple pendulum of the same length.

## 6. Extensions and Synthesis

Angular momentum conservation is equally fundamental in the **microscopic and astronomical** realms. An electron orbiting a nucleus moves in a central force field, and the quantization of angular momentum is central to the Bohr model and to quantum mechanics; the stable structure of galactic arms and of Saturn's rings is likewise shaped by angular momentum conservation together with mechanical equilibrium.

One easily overlooked detail: the reference point for angular momentum conservation must be fixed (or taken at the centre of mass), otherwise the angular momentum may change apparently even when the torque vanishes, simply because the reference point moves. For composite systems (a person standing on a turntable, for instance) one must take a common fixed axis before applying $I_1\omega_1=I_2\omega_2$. Studying the chain "torque—angular momentum—conservation condition" alongside the translational "force—momentum—conservation" greatly deepens one's grasp of the nature of rotation.

## 7. Worked Examples and Pitfalls

**Example 5: the speed relation between perihelion and aphelion.** A planet moves on an ellipse with the Sun at a focus. Gravity is a central force, so the angular momentum about the Sun is conserved: $r_p v_p = r_a v_a$. Combined with mechanical energy conservation $\frac12 m v_p^2 - G\frac{Mm}{r_p} = \frac12 m v_a^2 - G\frac{Mm}{r_a}$, the perihelion and aphelion speeds can be solved for. Kepler's second law (constant areal velocity) is precisely the geometric statement of angular momentum conservation, while the shape of the orbit is fixed by angular momentum and energy together—the meeting point of the two pillars of celestial mechanics.

**Example 6: precession of a gyroscope (qualitative).** When a spinning gyroscope tilts, the gravitational torque about the pivot does not lie along the spin axis but makes the angular momentum vector $\vec L$ rotate slowly about the vertical, so the gyroscope precesses about the vertical instead of falling. The precession rate is $\Omega = \frac{mgr}{L}$, where $r$ is the horizontal distance from the centre of mass to the pivot. Here the angular momentum theorem appears in vector form: $\vec M = d\vec L/dt$, and the torque changes only the direction of $\vec L$, not its magnitude; the faster the spin, the larger $L$ and the slower the precession—which is also why a fast-spinning bicycle wheel does not easily fall over.

**Example 7: collapse of a rotating cloud from angular momentum conservation.** A gas cloud with a large radius and slow initial rotation collapses under gravity toward its centre, and its angular momentum is approximately conserved, $I\omega=$ constant. If the radius shrinks to one tenth, the moment of inertia falls to about one hundredth and the angular velocity grows about a hundredfold. This is the core mechanism of star formation and of the acceleration of accretion disks, and it explains why galactic nuclei rotate so fast.

**Example 8: catching a flying ball while standing on a turntable.** A person on a turntable is initially at rest; a ball of mass $m$ arrives at speed $v$ tangentially and is caught at a distance $r$ from the axis. The angular momentum of the system (person, turntable, ball) about the axis is conserved: the initial angular momentum $mvr$ brought by the ball equals the final moment of inertia times the angular velocity. The problem links "translational angular momentum $\vec r\times\vec p$" with "rotational angular momentum $I\omega$" and is a touchstone for whether the definition of angular momentum has really been understood.

**Example 9: how to decide that a torque vanishes.** To decide whether angular momentum is conserved, the key is whether the resultant torque vanishes, not whether the resultant force does. Central forces, smooth hinges, and frictionless bearings all correspond to zero torque, whereas gravity about the centre of mass or about a suspension point generally gives a nonzero torque. First state clearly "about which point (or axis) the torque is taken", then decide whether that point is fixed or is the centre of mass; get this wrong and the whole conservation equation is wrong.

Angular momentum is often neglected by beginners because everyday rotation is always damped by friction and the pure conservation is rarely seen. But on the stages where dissipation is negligible—celestial bodies, ice rinks, gyroscopes, atoms—it shines brighter than momentum. Remember it in parallel with momentum and the world of rotation opens up at once.

## 8. Concept Map and Exam Patterns

The backbone of this chapter is torque, angular momentum, the angular momentum theorem, and conservation, illustrated by the conical pendulum and Kepler's laws. Exam problems fall into four types. The first is computing torque, where one uses the cross product to extract the component perpendicular to the position vector and determines the sense of rotation. The second is judging the conditions for angular momentum conservation, where the key is that the resultant torque, not the resultant force, vanishes—a central force field satisfies this automatically. The third is the "pulling in the arms" family, such as a skater, or a turntable and a caught ball, solved with $I_1\omega_1=I_2\omega_2$. The fourth combines angular momentum with celestial motion, using the areal velocity or the perihelion–aphelion speed relation. Frequent errors: treating torque as a scalar, believing conservation requires zero resultant force, assuming $\omega$ rather than $L$ is conserved when $I$ varies, and taking the torque about a reference point that is neither fixed nor the centre of mass. Keep firmly in mind that angular momentum and momentum are formally symmetric, memorize the correspondence table "torque to force, angular momentum to momentum", and rotational problems stop being intimidating.

## 9. Mnemonics and Distinctions

The chapter's mnemonic: torque is the force of rotation, angular momentum is the momentum of rotation; zero torque means conservation, and central forces satisfy it naturally; arms in, spin up, arms out, spin down. There are four groups of easily confused ideas. First, torque versus force: torque is a vector with a direction about an axis, equal and opposite torques have opposite effects, and it is not a scalar. Second, the condition for conservation: only the resultant torque need vanish, and in a central force field the resultant force is nonzero yet conservation still holds. Third, the relation between angular momentum and momentum: the two are formally symmetric, but angular momentum involves the moment of inertia or a cross product with the position vector, so momentum conclusions cannot be transferred blindly. Fourth, the choice of reference point: the torque must be taken about a fixed point or the centre of mass, otherwise the angular momentum changes apparently and the conservation equation fails. Master these and both celestial and rotating systems can be analysed with composure.

## 10. Further Thoughts

Angular momentum takes on an even deeper character in modern physics. An electron orbiting a nucleus moves in a central force field, and its angular momentum can take only discrete values—angular momentum quantization—which directly determines the shell structure of atoms and the periodic table. Photons also carry spin angular momentum, which can be transferred on interacting with matter and has given rise to optical tweezers and optical spin manipulation. On cosmic scales, galactic rotation curves and the distribution of angular momentum are key evidence for testing dark matter models. From microscopic atoms to macroscopic galaxies the thread of angular momentum conservation never breaks, showing its profound status as the product of a basic symmetry (rotational symmetry) and reminding us that physical laws often reappear with the same structure at different scales.
`,
  },
  'rigid-body': {
    chapter: 'Chapter 6 Rotation of a Rigid Body about a Fixed Axis',
    title: 'Moment of Inertia and the Law of Rotation',
    summary:
      'In fixed-axis rotation the moment of inertia plays the role of mass, the law of rotation M=Iα corresponds exactly to F=ma for translation, and the parallel-axis theorem gives the moment of inertia about any axis.',
    keyPoints: [
      'Moment of inertia I = ∫ r² dm measures rotational inertia',
      'The law of rotation M = Iα is the rotational Newton\'s second law',
      'Rotational kinetic energy Ek = ½ Iω²',
      'Parallel-axis theorem I = I_cm + Md²',
      'Rotating bodies can also be handled with mechanical energy conservation when combined with translation',
    ],
    content: String.raw`

So far we have treated bodies as particles, all the mass squeezed into a point. But as soon as a body must **rotate**—a flywheel, a door, the spinning Earth—the mass is distributed in space, and its distance from the axis directly determines how hard it is to turn. Push a dumbbell: rotating it crosswise (mass far from the axis) is clearly harder than rotating it lengthwise (mass close to the axis). Rotational inertia therefore depends not only on the total mass but on how that mass is distributed about the axis. Thus the "mass $m$" of translation is upgraded to the "moment of inertia $I$" of rotation.

With $I$ in hand, everything in rotation corresponds rigorously to translation: force to torque, acceleration to angular acceleration, mass to moment of inertia, kinetic energy to rotational kinetic energy, momentum to angular momentum. This correspondence lets us solve rotational problems with exactly the same reasoning. Add one practical theorem—the parallel-axis theorem—which says that once the moment of inertia about the centre of mass is known, the moment of inertia about any parallel axis at a given distance follows immediately, with no repeated integration.

The rigid body is the natural generalization of the particle: it keeps the essential feature "mass distribution" while ignoring deformation. Flywheel energy storage, rolling wheels, and gyroscopic stabilisation can then all be solved precisely within the framework of fixed-axis rotation, without descending into the complications of continuous media.

## 2. Rigorous Definitions

**Rigid body**: an ideal body whose shape and size do not change under forces, so that the distance between any two of its points stays constant.

**Angular position, angular velocity, angular acceleration**:

$$\theta(t),\qquad \omega = \frac{d\theta}{dt},\qquad \alpha = \frac{d\omega}{dt} = \frac{d^2\theta}{dt^2}$$

For fixed-axis rotation these may be treated as algebraic quantities (with sign indicating the sense of rotation).

**Moment of inertia** (about an axis):

$$I = \int r^2\,dm = \sum m_i r_i^2$$

where $r$ is the perpendicular distance from the mass element to the axis. Common results: a thin rod about its centre $I=\frac{1}{12}ML^2$ and about an end $I=\frac{1}{3}ML^2$; a uniform disk about the central perpendicular axis $I=\frac12 MR^2$; a ring $I=MR^2$; a solid sphere $I=\frac25 MR^2$.

**Law of rotation**:

$$M = I\alpha$$

The resultant external torque equals the moment of inertia times the angular acceleration—the rotational $F=ma$.

**Rotational kinetic energy**:

$$E_k = \frac12 I\omega^2$$

**Parallel-axis theorem**: if the moment of inertia about an axis through the centre of mass is $I_c$, then for a parallel axis at distance $d$

$$I = I_c + Md^2$$

**Perpendicular-axis theorem** (thin plate): for two perpendicular axes $x,y$ in the plane of the plate and an axis $z$ perpendicular to it, $I_z = I_x + I_y$.

## 3. Why It Works This Way

**Why does the moment of inertia contain $r^2$ rather than $r$?** Because it is defined from kinetic energy: the kinetic energy of a mass element is $\frac12 dm\,(r\omega)^2 = \frac12 (r^2 dm)\omega^2$, and factoring out $\omega^2$ leaves the coefficient $\int r^2 dm$, which is exactly $I$. The $r^2$ means that mass far from the axis has its contribution amplified, which is why a dumbbell is so hard to spin crosswise.

**Why does the parallel-axis theorem add $Md^2$?** Shifting the mass a distance $d$ from the centre-of-mass axis adds a squared term to each element; when expanded, the cross terms cancel because of the definition of the centre of mass, leaving $\sum dm\,d^2 = Md^2$. It follows that the moment of inertia about any parallel axis is **never smaller** than that about the centre-of-mass axis.

**Why does the law of rotation look exactly like Newton's second law?** Because rotation is simply translation projected onto angular coordinates: torque is the rotational effect of force, angular acceleration the rotational effect of acceleration, and the moment of inertia corresponds to inertial mass.

**Why does mechanical energy conservation still apply to rigid bodies?** As long as no non-conservative torque does work (bearing friction neglected, for instance), rotational kinetic energy and gravitational potential energy interchange exactly as in the particle case.

**Why is the moment of inertia never negative?** It is the integral of $r^2$ (always non-negative) weighted by mass—a "second moment", non-negative just as mass is.

## 4. Typical Calculations

**Example 1: a falling body driving a pulley.** A mass $m$ falls on a light string passing over a pulley of moment of inertia $I$ and radius $R$. For the body $mg - T = ma$, for the pulley $TR = I\alpha$, and $a = R\alpha$. Solving:

$$a = \frac{mg}{m + I/R^2}, \qquad T = mg\frac{I/R^2}{m + I/R^2}$$

So the pulley's $I/R^2$ acts as an extra "translational mass".

**Example 2: using the parallel-axis theorem.** For a thin rod of length $L$ about an axis through its end, $I = I_c + Md^2 = \frac{1}{12}ML^2 + M(L/2)^2 = \frac13 ML^2$.

**Example 3: rolling down an incline.** A solid sphere rolls down an incline (pure rolling); mechanical energy conservation gives $mgh = \frac12 mv^2 + \frac12 I\omega^2$, and with pure rolling $v=\omega R$ and $I=\frac25 MR^2$,

$$v = \sqrt{\frac{10}{7}gh}$$

smaller than the $\sqrt{2gh}$ of sliding, because part of the potential energy went into rotational kinetic energy.

**Example 4: flywheel energy storage.** A flywheel of moment of inertia $I$ spinning at $\omega$ stores $E=\frac12 I\omega^2$; to brake quickly a braking torque $M$ must bring the angular momentum to zero in $\Delta t$, requiring an angular impulse $M\Delta t = I\omega$.

## 5. Common Misconceptions

**Misconception 1: the moment of inertia equals the mass.** It depends on the mass distribution and the axis; the same body has different $I$ about different axes.

**Misconception 2: angular velocity and linear velocity are the same.** They are related by $v = \omega r$; the linear velocity differs at different distances from the axis, while the angular velocity is common.

**Misconception 3: sliding friction does work during pure rolling.** At the contact point of pure rolling the velocity is instantaneously zero, so static friction does no work; only sliding friction dissipates mechanical energy.

**Misconception 4: the mass of a pulley can be ignored at will.** Only the light-pulley assumption makes the tensions on the two sides equal; for a massive pulley the tensions differ (the difference supplies the angular acceleration).

**Misconception 5: rotational and translational kinetic energies cannot be added.** When a rigid body both translates and rotates, its total kinetic energy is the sum of the two.

## 6. Extensions and Synthesis

Rigid-body mechanics also handles **planar motion** (translation plus rotation, as in a rolling wheel): any planar motion can be decomposed into "translation of the centre of mass plus rotation about the centre of mass", described respectively by $M\vec a_c=\sum\vec F$ and $M_c=I_c\alpha$. This is the theoretical basis of the dynamics of bicycle and car wheels.

**The form of angular momentum for rigid bodies** also deserves attention: for fixed-axis rotation $\vec L = I\vec\omega$ and the external torque is $M = d(I\omega)/dt$. If $I$ can vary (a dancer opening the arms), then even with no external torque $\omega$ changes inversely with $I$—another confirmation of angular momentum conservation. Combining the moment of inertia, the law of rotation, the parallel-axis theorem, and energy methods solves fixed-axis rotation and even general planar motion systematically and elegantly.

## 7. Worked Examples and Pitfalls

**Example 5: the period of a physical pendulum.** A rigid body swings with small amplitude about a smooth horizontal axis, with the centre of mass at distance $d$ from the axis and moment of inertia $I$ about it. The gravitational torque is $-mgd\sin\theta \approx -mgd\,\theta$, so the law of rotation $I\ddot\theta = -mgd\,\theta$ gives the angular frequency $\omega = \sqrt{mgd/I}$ and the period $T=2\pi\sqrt{I/(mgd)}$. Defining an equivalent simple-pendulum length $l_{\text{eq}}=I/(md)$ reproduces the simple-pendulum formula exactly—the physical pendulum brings bodies of any shape into the framework of simple harmonic motion and shows that "the moment of inertia is the mass of rotation".

**Example 6: comparing the acceleration of a rolling ring, disk, and sphere.** A ring, a disk, and a solid sphere roll without slipping down the same incline; their accelerations are $\frac{g\sin\alpha}{1+I/(mR^2)}$. Substituting the respective $I/R^2$ (m for the ring, m/2 for the disk, 2m/5 for the sphere) gives accelerations that increase in the order ring, disk, sphere: the sphere is fastest, the disk next, the ring slowest. The reason is clear: the larger the moment of inertia, the more of the potential energy goes into rotation and the less is left for translation. The comparison illustrates vividly how mass distribution affects rotation.

**Example 7: angular impulse in rotation.** Integrating the law of rotation $M=I\alpha$ over time gives $\int M\,dt = I\omega_2 - I\omega_1$, the left side being the angular impulse (impulse moment). A skater spinning at $\omega_1$ with arms out pulls them in under internal forces, halving $I$; there is no external torque, so angular momentum is conserved, which is consistent with a vanishing angular impulse—note that zero torque means zero angular impulse, hence $I\omega$ unchanged. Distinguishing "angular impulse" from "the zero-external-torque premise of angular momentum conservation" is the key to avoiding confusion.

**Example 8: flywheel storage from an efficiency standpoint.** A flywheel spinning at $\omega$ stores $E=\frac12 I\omega^2$. Stopping it in a braking time $\Delta t$ requires an average braking torque $\bar M = I\omega/\Delta t$. The energy density of flywheel storage is proportional to $I\omega^2$; modern composite flywheels reach very high energy densities with rapid charge and discharge, making them a research focus for grid peak shaving and regenerative braking in rail transit—the most direct engineering application of rigid-body rotational kinetic energy.

**Example 9: decomposing planar motion of a rigid body.** A rod $AB$ of length $L$ has one end $A$ sliding along a horizontal floor with speed $v_A$ while the angle $\theta$ to the horizontal changes. Decompose the motion into translation of the centre of mass plus rotation about it: the centre-of-mass velocity follows from averaging the velocities of the two ends (the instantaneous relation for a rigid body), and the angular velocity follows from the constraint that the velocity components of the two ends along the rod are equal. Such problems train the doctrine "any planar motion = translation of the centre of mass + rotation about it", after which robotic arms, wheels, and linkages hold no terrors.

Rigid-body mechanics looks as though it adds one extra dimension, "rotation", to particle mechanics, but in truth it only replaces mass by moment of inertia, force by torque, and translation by angular motion. Grasp this rigorous correspondence table and fixed-axis rotation, rolling, and planar motion are merely different stages for the same logic.

## 8. Concept Map and Exam Patterns

This chapter is built on the moment of inertia, the law of rotation, rotational kinetic energy, and the parallel-axis theorem. Exam problems fall into five types. The first is computing or looking up a moment of inertia, remembering that it depends on the mass distribution and the axis and making good use of the parallel-axis theorem. The second is applying $M=I\alpha$ to a single body, in exact correspondence with $F=ma$. The third is a falling body over a pulley, where a massive pulley gives unequal tensions. The fourth is pure rolling, where the contact point is instantaneously at rest, static friction does no work, and the energy method is simplest. The fifth is planar motion of a rigid body, decomposed into translation of the centre of mass plus rotation about it. Frequent errors: equating the moment of inertia with the mass, confusing angular and linear velocity, thinking friction does work in pure rolling, and setting the two tensions equal when the pulley is not assumed light. First identify the axis and the moment of inertia, then use the law of rotation or the energy method; for a rolling body always write the pure-rolling constraint $v=\omega R$ first, and you will be safe.

## 9. Mnemonics and Distinctions

The chapter's mnemonic: the moment of inertia is the mass of rotation, the law of rotation is the second law of rotation; the parallel-axis theorem adds $Md^2$ on translation; static friction does no work in pure rolling. There are four groups of easily confused ideas. First, the moment of inertia versus mass: it depends on the mass distribution and the axis, and the same body has different values about different axes, so the two cannot be equated. Second, angular versus linear velocity: $v=\omega r$, the linear velocity grows with distance from the axis while the angular velocity is common to all points. Third, friction in pure rolling: the contact point is instantaneously at rest, static friction does no work, and only sliding friction dissipates mechanical energy. Fourth, the mass of the pulley: with a light pulley the tensions are equal, with a massive one they are not, and the difference supplies the angular acceleration. Keep these four straight and rigid-body problems will hardly trap you again.

## 10. Further Thoughts

The principles of rigid-body rotation are everywhere in engineering. Gyroscopes and inertial navigation exploit the angular momentum stability of a fast rotor to keep an axis pointing in a fixed direction in space, becoming a "compass that needs no outside reference" for aircraft, submarines, and missiles. Flywheel storage keeps electrical energy at high density in the form of rotational kinetic energy for grid peak shaving and regenerative braking in rail transit, with fast charge-discharge and long life. The joint motion of robotic arms and robots is essentially the real-time solution of rigid-body planar motion. Understanding the moment of inertia, the law of rotation, and energy methods is not merely a matter of passing examinations but the first threshold into mechanical, aerospace, and robotics engineering, with applications far beyond textbook exercises. One more point: the blade design of modern wind turbines, the steady rotation of hard-disk spindles, and even the drum dynamics of a washing machine during spin-drying are all optimised on the basis of the law of rotation and moment-of-inertia calculations; understanding them lets you see the real projection of mechanical principles in everyday appliances. When studying, combine the theory with experiments and numerical simulation, matching abstract formulas one-to-one with visible rotational phenomena for a firmer grasp.
`,
  },
  oscillations: {
    chapter: 'Chapter 7 Simple Harmonic Motion',
    title: 'Kinematics of Simple Harmonic Motion',
    summary:
      "Simple harmonic motion is governed by the differential equation x''+ω²x=0, whose solution is a cosine of amplitude and phase; the rotating-vector method turns the abstract phase into an intuitive geometric rotation.",
    keyPoints: [
      "Simple harmonic motion satisfies x'' + ω²x = 0",
      'The solution is x = A cos(ωt + φ), with A the amplitude and φ the initial phase',
      'Angular frequency ω, period T=2π/ω, and frequency f=1/T are mutually related',
      'The rotating-vector method represents an oscillation by the projection of a uniformly rotating vector',
      'The total mechanical energy is conserved and alternates periodically between kinetic and potential energy',
    ],
    content: String.raw`

A swing, a pendulum clock, a spring oscillator, and even the thermal vibration of atoms about their equilibrium positions look utterly different on the surface, yet share one core feature: the body moves back and forth about an equilibrium position, and the farther it strays the stronger the "pull" that brings it back. Distilling this ideal case—"restoring force proportional to displacement and oppositely directed"—gives **simple harmonic motion (SHM)**. It is the master template for all vibration and waves, since any complicated oscillation can be decomposed into simple harmonic motions of many frequencies (Fourier analysis); to master this single model is to hold the key to the whole building of vibration and waves.

In this chapter we begin with the "kinematics": we do not ask where the force comes from (that is dynamics) but only what something looks like if a certain quantity varies harmonically. The answer is astonishingly simple—a cosine, completely determined by three numbers: the amplitude, the angular frequency, and the initial phase. To make the abstract notion of "phase" intuitive, physics invented the **rotating-vector method**: let a vector rotate uniformly and its projection is exactly the displacement of a simple harmonic oscillation.

This effort is worthwhile because simple harmonic motion is everywhere: alternating voltages, sound waves, light waves, and lattice vibrations are all, in essence, harmonic variation of some quantity. Once you can switch freely in your mind between "the projection of a rotating vector" and "a cosine curve", most of vibration and wave theory becomes remarkably easy.

## 2. Rigorous Definitions

**The differential equation of simple harmonic motion**: the displacement $x$ satisfies

$$\frac{d^2x}{dt^2} + \omega^2 x = 0$$

where $\omega$ is the angular frequency (fixed by the system itself; for a spring oscillator $\omega = \sqrt{k/m}$).

**General solution**:

$$x(t) = A\cos(\omega t + \varphi)$$

$A$ is the **amplitude** (the maximum displacement) and $\varphi$ the **initial phase** (which fixes the state at the initial moment). It may equally be written $x = A\sin(\omega t + \varphi')$.

**Period and frequency**:

$$T = \frac{2\pi}{\omega}, \qquad f = \frac{1}{T} = \frac{\omega}{2\pi}$$

**Velocity and acceleration**:

$$v = -A\omega\sin(\omega t+\varphi) = - \omega\sqrt{A^2 - x^2}, \qquad a = -\omega^2 x$$

The acceleration is always opposite to the displacement and proportional to it in magnitude—precisely the kinematic criterion for simple harmonic motion.

**Rotating-vector method**: draw a vector of length $A$ rotating uniformly counter-clockwise about the origin with angular velocity $\omega$, making an initial angle $\varphi$ with the $x$ axis. The projection of its tip on the $x$ axis, $x = A\cos(\omega t+\varphi)$, is the simple harmonic motion. The phase $(\omega t+\varphi)$ is the angle turned by the vector; to compare how fast two oscillations are, look at $\omega$; to compare how they keep step, look at the phase difference.

**Energy**: a spring oscillator conserves its total mechanical energy

$$E = \frac12 kA^2 = \frac12 mv^2 + \frac12 kx^2$$

Kinetic and potential energy alternate periodically between $0$ and $E$, each averaging half.

## 3. Why It Works This Way

**Why must the restoring force be proportional to the displacement?** Because only then is the solution of $x''+\omega^2 x=0$ a perfect cosine; if the restoring force is not linear (a large-angle pendulum, for instance) the motion is not strictly harmonic and shows nonlinear distortion. For small oscillations every potential energy can be Taylor-expanded to second order and thus approximated as harmonic—which explains why simple harmonic motion is everywhere.

**Why a cosine rather than something else?** The cosine is only a convention; a sine differs from it by an initial phase of $\pi/2$. Choosing the cosine makes "released from maximum displacement" correspond to $\varphi=0$, the most natural description; in essence the choice is fixed by the initial conditions.

**Why can a rotating vector represent an oscillation?** Because the projection of uniform circular motion satisfies $x''+\omega^2 x=0$ exactly. Lifting a one-dimensional oscillation into a two-dimensional rotation turns the phase into a visible geometric angle, making the comparison and superposition of oscillations intuitive.

**Why does a conserved system still move?** With no damping, the kinetic and potential energies trade back and forth while their sum is constant; the energy is handed over rather than lost, so the motion continues forever (ideally).

**Why is "acceleration opposite to displacement" a criterion?** Because $a=-\omega^2 x$ is equivalent to the differential equation: any motion satisfying it must be simple harmonic. It lets you recognize simple harmonic motion without solving any equation.

## 4. Typical Calculations

**Example 1: amplitude and initial phase from the initial conditions.** If at $t=0$ the displacement is $x_0$ and the velocity $v_0$, then

$$A = \sqrt{x_0^2 + \left(\frac{v_0}{\omega}\right)^2}, \qquad \tan\varphi = -\frac{v_0}{\omega x_0}$$

and the sign of $x_0$ determines the quadrant of $\varphi$.

**Example 2: frequency of a spring oscillator.** From $m x'' = -kx$ we get $\omega = \sqrt{k/m}$, hence

$$T = 2\pi\sqrt{\frac{m}{k}}$$

The period depends only on $m$ and $k$, not on the amplitude—the expression of isochronism.

**Example 3: superposing two oscillations of the same frequency.** With phase difference $\Delta\varphi=0$ the amplitudes add (reinforcement) and with $\Delta\varphi=\pi$ they subtract (weakening); in general the amplitude is $A = \sqrt{A_1^2 + A_2^2 + 2A_1A_2\cos\Delta\varphi}$.

**Example 4: the small-angle approximation of a simple pendulum.** For length $l$ and mass $m$, at small angles $\sin\theta\approx\theta$, so the equation of motion becomes $\ddot\theta + (g/l)\theta=0$: simple harmonic motion with period $T=2\pi\sqrt{l/g}$—the isochronism of the pendulum that Galileo observed.

## 5. Common Misconceptions

**Misconception 1: simple harmonic motion is a sine wave.** It is an oscillation in time; a "wave" is the propagation of an oscillation through space, and the two are different.

**Misconception 2: a larger amplitude means a longer period.** An ideal simple harmonic oscillator has a period independent of amplitude (isochronism); only a large-angle pendulum shows amplitude dependence.

**Misconception 3: the phase is just the initial phase.** The phase is the time-varying $\omega t+\varphi$; the initial phase is only its value at $t=0$.

**Misconception 4: maximum acceleration coincides with maximum velocity.** Quite the opposite: the displacement (and hence the acceleration) is largest at the endpoints, where the velocity vanishes; at the equilibrium position the velocity is largest and the acceleration zero.

**Misconception 5: the length of the rotating vector changes.** It represents the amplitude and stays fixed; what rotates is the direction (the phase), not the length.

## 6. Extensions and Synthesis

Simple harmonic motion is the starting point for **damped** and **forced** oscillations. Real systems always have friction, and the amplitude decays as $A(t)=A_0 e^{-\beta t}$—that is damped oscillation. If a periodic external force is also applied, the system exhibits **resonance** when the driving frequency approaches the natural frequency, with the amplitude growing sharply; bridges and machines must be designed with resonance damage in mind.

In a wider setting, any "small disturbance from equilibrium" experiences a linear restoring force and is therefore approximately harmonic: the thermal vibration of atoms in a lattice, the $LC$ oscillation of a capacitor and inductor in a circuit, even some models of economic cycles. Learn to describe an oscillation by the three parameters "amplitude—angular frequency—phase" and to visualize it with the rotating-vector method, and you command the common language leading to waves, acoustics, optics, and AC circuits.

## 7. Worked Examples and Pitfalls

**Example 5: superposing two collinear oscillations of the same frequency.** Let $x_1=A_1\cos(\omega t+\varphi_1)$ and $x_2=A_2\cos(\omega t+\varphi_2)$. Adding them as rotating vectors shows that the resultant is again a harmonic oscillation of the same frequency, with amplitude $A=\sqrt{A_1^2+A_2^2+2A_1A_2\cos\Delta\varphi}$ and initial phase given by $\tan\varphi = \frac{A_1\sin\varphi_1+A_2\sin\varphi_2}{A_1\cos\varphi_1+A_2\cos\varphi_2}$. When $\Delta\varphi=2k\pi$ there is complete reinforcement with $A=A_1+A_2$; when $\Delta\varphi=(2k+1)\pi$ there is complete weakening with $A=|A_1-A_2|$. This result underlies the understanding of interference and beats.

**Example 6: superposing perpendicular oscillations and Lissajous figures.** If $x=A\cos(\omega t)$ and $y=B\cos(\omega t+\delta)$, the combined path is an ellipse; for $\delta=0$ or $\pi$ it degenerates to a straight line, and for $\delta=\pi/2$ with $A=B$ it is a circle. When the frequencies are in a simple integer ratio a stable Lissajous figure forms, and this is how an oscilloscope measures an unknown frequency—the two-dimensional superposition of harmonic oscillations bridges vibration and geometry.

**Example 7: exponential decay of a damped oscillation.** Adding a drag proportional to velocity, $-bv$, turns the equation into $m\ddot x + b\dot x + kx = 0$. For light damping the solution is $x=A_0 e^{-\beta t}\cos(\omega_d t+\varphi)$: the amplitude decays exponentially with coefficient $\beta=b/(2m)$, and the damped frequency $\omega_d=\sqrt{\omega_0^2-\beta^2}<\omega_0$. Damping makes an oscillation "slowly come to rest", and engineering measures its purity by the quality factor $Q=\omega_0/(2\beta)$.

**Example 8: forced oscillation and resonance.** Applying a periodic force $F_0\cos\Omega t$ to an oscillator gives the steady-state amplitude $A = \frac{F_0/m}{\sqrt{(\omega_0^2-\Omega^2)^2+4\beta^2\Omega^2}}$. When the driving frequency $\Omega$ approaches the natural frequency $\omega_0$ and the damping is small, the amplitude grows sharply—resonance. Resonance can tune a radio receiver and can also destroy a bridge or a turbine, so it must be treated cautiously in the design of machines and buildings.

**Example 9: the anharmonicity of a large-angle pendulum.** The exact equation of motion is $\ddot\theta + (g/l)\sin\theta = 0$, which reduces to harmonic form only for small $\theta$ with $\sin\theta\approx\theta$. At large angles the period grows with amplitude, with the correction $T \approx 2\pi\sqrt{l/g}\,(1+\theta_0^2/16)$. The lesson: simple harmonic motion is the result of linearizing a small oscillation, and outside its range one must return to the original nonlinear equation rather than blindly invoking isochronism.

Simple harmonic motion is a central model of physics because it is at once mathematically simple (a second-order linear differential equation with constant coefficients) and physically universal (every small disturbance looks like it). Internalize the three parameters "amplitude, angular frequency, phase" and the rotating-vector method, and you hold the key to the entire world of vibration and waves.

## 8. Concept Map and Exam Patterns

This chapter is built on the differential equation, the general solution, the rotating-vector method, and energy. Exam problems fall into five types. The first determines the amplitude and initial phase from the initial conditions, where $x_0$ and $v_0$ together fix the quadrant of the phase. The second computes the periods of spring oscillators and simple pendulums, remembering that only the small-angle pendulum is approximately harmonic. The third uses the rotating-vector method to compare phase differences and how oscillations keep step. The fourth superposes harmonic oscillations, adding vectors for collinear oscillations of the same frequency and using Lissajous figures for perpendicular ones. The fifth treats damped and forced oscillations, with emphasis on the resonance condition. Frequent errors: equating simple harmonic motion with a sine wave, believing the amplitude affects the period, confusing the phase with the initial phase, thinking the velocity is largest at the endpoints, and treating the length of the rotating vector as variable. First identify harmonic motion by the kinematic criterion $a=-\omega^2 x$, then solve with the three parameters, and visualize the abstract phase with the rotating-vector method; everything later in vibration and waves will come twice as easily.

## 9. Mnemonics and Distinctions

The chapter's mnemonic: the differential equation is the root, the three parameters of the general solution fix everything; the rotating vector shows the phase, energy trades back and forth and is forever conserved. There are four groups of easily confused ideas. First, oscillation versus wave: a harmonic oscillation is an oscillation in time, while a wave is its propagation in space; the two must not be confused. Second, period versus amplitude: the period of an ideal harmonic oscillator is independent of the amplitude, and isochronism holds only in the small-oscillation approximation. Third, phase versus initial phase: the phase is the time-varying $\omega t+\varphi$, the initial phase is merely its value at $t=0$, and the phase difference compares how two oscillations keep step. Fourth, the states at the endpoints: at the endpoints the displacement and acceleration are largest and the velocity zero, while at the equilibrium position the velocity is largest and the acceleration zero; they are complementary, not identical. Sort these out and the study of vibration and waves proceeds smoothly.

## 10. Further Thoughts

The real power of simple harmonic motion lies in the idea of "decomposition". Any complicated periodic motion can be built from a series of harmonic oscillations of different frequencies, amplitudes, and phases—the essence of Fourier analysis, which gives the processing of signals, sound, and images a unified language. In quantum mechanics the stationary wave functions of a system are often eigenstates in a harmonic potential, and the harmonic oscillator is one of the most basic solvable models. Magnetic resonance imaging in medicine, modulation and demodulation in communications, and timbre synthesis in music all rest on an understanding of harmonic components. To master simple harmonic motion is to own the building block for dismantling and understanding almost every periodic phenomenon, a value far beyond a single mechanics course. One more remark: from mechanical pendulums to the piezoelectric oscillation of a quartz watch, from the standing waves on a guitar string to the ear's discrimination of sound, the foundations of human timekeeping and communication rest almost entirely on stable (or nearly stable) harmonic oscillation; understand this chapter and you also understand the physical language behind "time" and "sound". After class, try recording the oscillation curve of a pendulum or a spring with a phone sensor and verifying the period formula yourself—the insight will be especially deep.
`,
  },
};

export default map;
