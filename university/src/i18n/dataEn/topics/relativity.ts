import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'postulates': {
    chapter: 'Chapter 1 Basic Principles of Relativity',
    title: 'Einstein’s Two Postulates',
    summary:
      'Starting from the null result of the Michelson–Morley experiment, Einstein rebuilt the entire conception of space and time on two postulates: the principle of relativity and the constancy of the speed of light.',
    keyPoints: [
      'The null result of the Michelson–Morley experiment shows that the ether hypothesis conflicts with the facts',
      'Principle of relativity: all physical laws have the same form in every inertial frame; no inertial frame is privileged',
      'Constancy of the speed of light: the speed of light $c$ in vacuum is independent of the motion of source and observer',
      'Relativity of simultaneity: judging distant events to be simultaneous depends on the frame; "absolute simultaneity" does not exist',
      'The two postulates contradict the Galilean transformation and necessarily lead to a new spacetime transformation',
    ],
    content: String.raw`

At the end of the nineteenth century the edifice of classical physics seemed complete, yet "two small clouds" hung overhead. One of them concerned the medium that carries light. Sound waves travel through air, water waves along a water surface—so what carries light through vacuum? Physicists imagined an omnipresent, invisible, intangible medium—the ether—and took it to be the carrier of light oscillations. If the ether existed, then the Earth, revolving about the Sun at about $30\ \text{km/s}$, would be like a ship sailing through an "ocean of ether", and the speed of light measured on Earth should differ with direction: smaller when measured head-on into the "ether wind", larger when crossing it.

In 1887 Michelson and Morley tested this with extreme precision using the interferometer they had invented. The instrument split a beam of light into two mutually perpendicular paths, recombined them after reflection to produce interference fringes, and then the whole apparatus was rotated by $90^{\circ}$; if an ether wind existed, the optical path difference between the two arms would change and the fringes should shift by about $0.4$ of a fringe width. The result was—however the apparatus was rotated, whatever the season, the shift never exceeded the experimental error. This "null result" shook the physics community: the ether hypothesis was in sharp conflict with the facts. Afterwards Lorentz and FitzGerald proposed that "bodies contract along the direction of motion" to rescue the ether, and Poincaré too realized that a wholly new mechanics was needed; but the one who gave the complete and concise answer was Einstein, aged 26, in 1905.

## 2. Einstein's Two Basic Postulates

Einstein's brilliance lay in not patching up the ether theory but in re-examining "time" and "space" at the most basic conceptual level. His 1905 paper "On the Electrodynamics of Moving Bodies" opened by stating two basic postulates.

**First: the principle of relativity.** All physical laws (mechanical, electromagnetic, optical) have the same form in all inertial frames; there is no special, "privileged" inertial frame. This principle generalizes Galileo's principle of relativity (everything mechanical behaves normally in a uniformly moving ship's cabin) to all of physics. Its direct corollary: no physical experiment can tell us whether we are at rest or in uniform rectilinear motion. Tossing a coin vertically on a smoothly moving high-speed train looks exactly as it does on the ground—this is the everyday face of the principle of relativity.

**Second: the constancy of the speed of light.** In every inertial frame the speed of light in vacuum is the same constant in all directions, $c = 299792458\ \text{m/s} \approx 3\times10^8\ \text{m/s}$, independent of the motion of the source. This sounds plain but is startling: imagine a searchlight on a rocket approaching head-on at $0.9c$; by classical velocity addition we should measure $1.9c$, but the postulate asserts we still measure $c$. This is not an approximation but an exact statement.

Each postulate looks harmless alone, yet together they are earth-shaking: if the speed of light is the same for all inertial observers, the classical Galilean transformation $x^{\prime}=x-vt$, $t^{\prime}=t$ cannot hold universally, because the Galilean velocity rule $u^{\prime}=u-v$ plainly violates the constancy of light—light travels at $c$ in $S$, and would become $c-v$ in $S^{\prime}$ moving at $v$. What must be abandoned is precisely our deep-rooted notion of absolute space and time: time no longer flows at the same rate for all observers, and spatial lengths are no longer absolute.

## 3. The Deep Content of the Constancy of Light Speed

To understand the postulate correctly one must first grasp what "measuring the speed of light" means. Measuring a speed requires two things: a distance and a time interval. The constancy of light speed says: an observer in any inertial frame, using his own ruler and his own clock to measure the same beam of light in vacuum, obtains $c$. The key is the phrase "his own"—different frames have their own clocks and rulers, and these do not correspond to one another as simply as Newton assumed.

An important corollary follows at once: **in any inertial frame the speed of light is the same in all directions**, no direction being special. This isotropy means each inertial frame can define its own "natural" standard of simultaneity, and the standards of different inertial frames differ from one another—this is the origin of the simultaneity problem in the next section. It should also be noted that the postulate concerns the speed of light in vacuum in inertial frames; in a medium light travels slower than $c$ (and varies with the medium's state of motion), while in non-inertial frames or gravitational fields (the domain of general relativity) the question must be discussed separately. None of these constitutes a refutation of the postulate.

Historically the constancy of light speed was not an arbitrary assumption. Besides Michelson–Morley, abundant evidence supports it: astronomical observations of binary star systems show that light emitted by sources moving at different speeds does not arrive at Earth in a scrambled order (otherwise binary orbits would look distorted); later particle accelerator experiments directly verified that light emitted by fast particles still travels at $c$. Einstein's genius lay in elevating this empirical regularity to a principle and asking what it demands of the definitions of time and space.

## 4. The Relativity of Simultaneity

The most direct and most shocking corollary of the two postulates is: **simultaneity is relative**. Einstein illustrated this with the famous train-and-platform thought experiment.

Suppose an observer on the platform sees lightning strike the front and the back of a train simultaneously (both strikes occur at his own position, and since he is equidistant from front and back, the light signals arrive together, so he judges them "simultaneous"). A train moving at speed $v$ passes the centre of the platform at the instant of the strikes, with an observer on board. In the platform frame the light from the front travels toward the approaching train, while the light from the rear must catch up with the train. Hence the observer on the train receives the light from the front first and the light from the rear later. By the constancy of light speed, the on-board observer measures both light speeds as $c$, and he is equidistant from front and rear, so he can only conclude: the strike at the front happened before the strike at the rear.

Two events that are simultaneous in one frame are not simultaneous in another—this is not because someone's clock is "broken", nor a measurement error, but a property of time itself. Quantitatively, suppose that in the platform frame $S$ events 1 and 2 occur at $(x_1, t)$ and $(x_2, t)$ respectively; then in the train frame $S^{\prime}$ moving at $v$ the time difference is

$$\Delta t^{\prime} = \gamma\,\frac{v\,(x_1 - x_2)}{c^2},\qquad \gamma = \frac{1}{\sqrt{1-v^2/c^2}}$$

where $\gamma$ is called the Lorentz factor. Only when $x_1=x_2$ (events at the same place) or $v=0$ is $\Delta t^{\prime}=0$, that is, **only same-place simultaneity (and the time order of same-place events) has absolute meaning**; distant simultaneity and the temporal order of distant events are both frame-dependent. From this follows the safe boundary of causality: as long as event 1 is the cause of event 2 (for example firing a bullet and the bullet hitting the target), the two events can be connected by a signal no faster than light, and their time order cannot be reversed in any inertial frame—this will be seen more clearly in the light-cone structure of Chapter 4.

## 5. From the Two Postulates to a New View of Spacetime

Taking the two postulates as axioms, one can rebuild the whole of kinematics and dynamics. The logical chain is as follows: first, the constancy of light speed for all inertial frames requires that the spacetime transformation linking two inertial frames must give $u^{\prime}=c$ when $u=c$; second, the transformation satisfying this and reducing to the Galilean transformation when $v\ll c$ is precisely the Lorentz transformation (derived in Chapter 2); third, the Lorentz transformation automatically yields time dilation, length contraction and a limiting velocity for velocity composition (Chapter 3); fourth, reshaping Newtonian mechanics into a theory whose form is invariant under this transformation gives the mass-energy relation $E=mc^2$ (Chapter 5).

It is worth stressing that in special relativity "the constancy of light speed" plays the role of a property of spacetime rather than a property of light: $c$ is first of all the limiting speed of spacetime structure itself (any disturbance propagating at that speed obeys the same rules), and light merely travels at the limiting speed, which makes electromagnetic waves the natural yardstick for measuring spacetime. Modern textbooks therefore prefer to speak of "the invariance of the limiting speed", with light as its best messenger. Understanding this explains why neutrinos (whose apparent superluminal rumor was eventually disproved) and gravitational waves all propagate no faster than $c$—this is the discipline of spacetime, not a privilege of light.

## 6. Common Misconceptions

**Misconception 1: the constancy of light speed means "light is unchanged relative to anything".** The postulate applies only to the speed of light in vacuum in inertial frames; it cannot be applied freely in accelerated frames, gravitational fields, or media. **Misconception 2: time dilation is a mechanical defect of clocks.** The time effect under the Lorentz transformation has nothing to do with clock construction; every physical process (atomic vibration, biological metabolism, radioactive decay) slows by the same factor, showing that time itself, not the clock, is changing. **Misconception 3: the relativity of simultaneity destroys causality.** Events with a causal link (signals can connect them) keep an absolutely fixed order; only events with neither causal nor any signal connection (spacelike separation) can have their order reversed, and reversing them creates no logical contradiction. **Misconception 4: Einstein overthrew Newtonian mechanics.** Quite the opposite: for $v\ll c$ Newtonian mechanics is an excellent approximation to relativistic mechanics, and everyday engineering still uses it; special relativity delimits the domain of validity of Newtonian mechanics.

## 7. Chapter Summary and Exam Points

This chapter calls for three firm convictions: first, the null result of Michelson–Morley delivered the death sentence to an absolutely stationary frame (the ether) and is the experimental starting point of relativity; second, the principle of relativity and the constancy of light speed together form the axiomatic basis of special relativity, and all conclusions follow logically from them; third, the relativity of simultaneity is the key to understanding time dilation and length contraction later—"simultaneity" varies with the frame, which is what makes "moving clocks run slow and moving rulers contract" possible. Common exam questions: explain the relation between the Michelson–Morley experiment and relativity; analyse simultaneity with the train thought experiment; decide which quantities are relative and which absolute (temporal order is relative but causality is unchanged; the speed of light and the form of physical laws are absolute). Before studying Chapter 2, the reader is advised to draw the train-lightning spacetime diagram once by hand, separating "who sees the light first" from "who judges simultaneity"—this is the key step to avoiding confusion.

## 8. Thought Experiments Once More

To consolidate the two postulates, rehearse two more miniature thought experiments. First, the light clock. Imagine a "light clock" in which a light pulse bounces between two parallel mirrors, one "tick" being one round trip. When the clock moves relative to the observer, the light follows a slanted path, the path lengthens, and since the speed of light is unchanged each tick lengthens—this is the most intuitive derivation of time dilation, using only the Pythagorean theorem and the constancy of light speed. Second, clock synchronization. To synchronize clocks at different places in a frame one must send signals at speed $c$ and correct for the travel time; performing this procedure in another frame yields different sets of "simultaneous" events. The relativity of simultaneity thus comes not from defective clocks but from the coordinate dependence of the very operation "synchronize by light". Draw both experiments once on paper, and the two postulates cease to be slogans and become tools you can wield at will.`,
  },

  'lorentz-transform': {
    chapter: 'Chapter 2 Lorentz Transformations',
    title: 'The Law of Spacetime Transformation',
    summary:
      'The Lorentz transformation is the mathematical embodiment of the two postulates: it gives the conversion rules between the spacetime coordinates of different inertial frames and yields velocity transformation and causal structure.',
    keyPoints: [
      'The Lorentz transformation $x^{\\prime}=\\gamma(x-vt)$, $t^{\\prime}=\\gamma(t-vx/c^2)$ is the only linear transformation satisfying the constancy of light speed and the principle of relativity',
      'For $v\\ll c$ the Lorentz transformation reduces to the Galilean transformation; classical mechanics is its low-speed limit',
      'The velocity transformation $u_x^{\\prime}=\\dfrac{u_x-v}{1-u_x v/c^2}$ keeps the composed speed below $c$',
      'The time order of two spacelike-separated events can be reversed by changing frames; that of timelike-separated events cannot',
      'The light cone divides events into future, past and "absolutely unreachable", the geometric expression of causality',
    ],
    content: String.raw`

In Newtonian mechanics the coordinates of two inertial frames are converted by the Galilean transformation: if $S^{\prime}$ moves with speed $v$ along $x$ relative to $S$ and the origins coincide at $t=t^{\prime}=0$, then

$$x^{\prime} = x - vt,\qquad y^{\prime}=y,\quad z^{\prime}=z,\qquad t^{\prime}=t$$

The term $t^{\prime}=t$ in the Galilean transformation deserves the most caution—it presupposes an absolute time common to all observers. As shown in the previous chapter, the relativity of simultaneity declares this presupposition invalid. Adding the requirement of the constancy of light speed (light propagates at $c$ in $S$ and must still be measured as $c$ in $S^{\prime}$), the Galilean transformation must be replaced. There are four guiding principles for the replacement: linearity (spacetime is homogeneous, so the transformation cannot vary with position or time); reduction to the Galilean transformation when $v\ll c$ (agreement with existing experiments); the speed of light equal to $c$ in both frames; and the inverse transformation obtained by replacing $v$ with $-v$ (the principle of relativity). The transformation satisfying all four is the Lorentz transformation.

## 2. Deriving the Lorentz Transformation

Write the transformation in linear form $x^{\prime}=A\,x + B\,t$, $t^{\prime}=C\,t + D\,x$, with coefficients depending only on $v$. Four steps determine them.

First step: the origin of $S^{\prime}$ has the trajectory $x=vt$ in $S$, and substituting must give $x^{\prime}=0$, hence $x^{\prime}=A(x-vt)$.

Second step: consider a light signal. In $S$ light travelling along $x$ satisfies $x=ct$, and substitution gives $x^{\prime}=A(c-v)t$. By the constancy of light speed it also satisfies $x^{\prime}=ct^{\prime}$ in $S^{\prime}$, hence $t^{\prime}=A(c-v)t/c$. Considering the reverse light $x=-ct$, one likewise gets $t^{\prime}=A(c+v)t/c$. Both expressions should hold for general events, and comparison shows that $t^{\prime}$ must have the form $t^{\prime}=E\,t - F\,x$, with symmetry giving $E=A$, $F=Av/c^2$, that is

$$t^{\prime} = A\left(t - \frac{v\,x}{c^2}\right)$$

Third step: the principle of relativity requires the inverse transformation to have the same form. Solving the two equations for $x$ and $t$ and comparing with the direct transformation with $v\to -v$ gives

$$A^2\left(1 - \frac{v^2}{c^2}\right) = 1 \quad\Longrightarrow\quad A = \gamma \equiv \frac{1}{\sqrt{1-v^2/c^2}}$$

Fourth step: the $y$ and $z$ directions are perpendicular to the motion and stay unchanged, $y^{\prime}=y$, $z^{\prime}=z$. Collecting the results gives the **Lorentz transformation**:

$$x^{\prime} = \gamma(x - vt),\qquad t^{\prime} = \gamma\left(t - \frac{v\,x}{c^2}\right),\qquad y^{\prime}=y,\qquad z^{\prime}=z$$

Its inverse is $x=\gamma(x^{\prime}+vt^{\prime})$, $t=\gamma(t^{\prime}+v\,x^{\prime}/c^2)$, exactly replacing $v$ by $-v$. Note that $\gamma$ is real only when $|v|<c$, hinting that no massive frame (body) can reach the speed of light. Lorentz had written these formulas in 1904, but regarded them as a mathematical trick against the "ether wind"; Einstein proved that they are the transformation law of spacetime itself—an entirely different meaning.

## 3. Basic Properties of the Lorentz Transformation

**Low-speed limit.** For $v\ll c$, $\gamma\to1$ and $vx/c^2\to0$, so the Lorentz transformation reduces to the Galilean transformation and all conclusions of Newtonian mechanics remain reliable at low speed. **Upper limit on speed.** If $v\ge c$ then $\gamma$ is meaningless, so the relative speed between inertial frames must be less than $c$. **Length contraction along the direction of motion.** This can be read off directly from $x^{\prime}=\gamma(x-vt)$ (detailed in the next chapter). **Coupling of time and space.** $t^{\prime}$ contains $x$ and $x^{\prime}$ contains $t$, showing that time and space are no longer independent stages but an intertwined unity—the most essential difference between the Lorentz and Galilean transformations.

## 4. Velocity Transformation Formulas

Let a particle have velocity components $(u_x, u_y, u_z)$ in $S$. Differentiating both sides of the Lorentz transformation, $\mathrm{d}x^{\prime}=\gamma(\mathrm{d}x - v\,\mathrm{d}t)$, $\mathrm{d}t^{\prime}=\gamma(\mathrm{d}t - v\,\mathrm{d}x/c^2)$, and dividing gives

$$u_x^{\prime} = \frac{u_x - v}{1 - \dfrac{u_x\,v}{c^2}},\qquad u_y^{\prime} = \frac{u_y}{\gamma\left(1-\dfrac{u_x\,v}{c^2}\right)},\qquad u_z^{\prime} = \frac{u_z}{\gamma\left(1-\dfrac{u_x\,v}{c^2}\right)}$$

This is the **relativistic velocity transformation** (Einstein velocity addition). It has three properties worth checking. First, substituting $u_x=c$ gives $u_x^{\prime}=(c-v)/(1-v/c)=c$: the speed of light is invariant under the transformation, so the postulate is automatically satisfied. Second, for any $u<c$ and $v<c$ the composed speed is strictly less than $c$—the denominator $1-u_xv/c^2>0$ acts as a brake. Third, at low speed it reduces to $u_x^{\prime}\approx u_x-v$. Hence "superluminal addition" is forever impossible: even if a ship flies at $0.9c$ and fires an object forward at $0.9c$, the ground measures $(0.9c+0.9c)/(1+0.81)\approx0.994c$.

## 5. Causality and the Light Cone

The Lorentz transformation gives the time difference of two events as $\Delta t^{\prime}=\gamma(\Delta t - v\,\Delta x/c^2)$. For fixed $v<c$, whether some frame can make $\Delta t^{\prime}$ change sign depends on the sign of the invariant $\Delta t^2-\Delta x^2/c^2$. Accordingly the relation of two events falls into three classes: **timelike** ($\Delta s^2=c^2\Delta t^2-\Delta x^2>0$, connectable by a signal slower than $c$), whose order is absolutely fixed and which can support causality; **lightlike** ($\Delta s^2=0$, connected exactly by a light signal), whose order is also fixed; and **spacelike** ($\Delta s^2<0$, no signal can arrive in time), for which there is always a frame making the events simultaneous and always a frame reversing their order—but precisely because no causal influence can cross a spacelike separation, the reversal creates no causal paradox. The geometric picture of causality is the light cone: with an event as vertex, $c\Delta t=\pm\sqrt{\Delta x^2+\Delta y^2+\Delta z^2}$ traces two conical surfaces, events inside (including on the boundary) can be causally connected to the vertex, those outside never can. Chapter 4 will draw this structure more precisely from the viewpoint of spacetime geometry.

## 6. Two Typical Calculations

**Example one: velocity composition.** A ship flies at $v=0.8c$ relative to Earth and fires a probe forward at $0.6c$ relative to the ship. The ground measures

$$u = \frac{0.8c+0.6c}{1+0.8\times0.6} = \frac{1.4c}{1.48} \approx 0.946c < c$$

Galilean addition would give $1.4c$; the relativistic correction lowers it by about a third, and however much the two component speeds are increased (both below $c$), the result always approaches but never exceeds $c$.

**Example two: reversal of order for a spacelike separation.** In $S$, event $A$ occurs at $(x=0, t=0)$ and event $B$ at $(x=3c\ \text{s},\ t=1\ \text{s})$. Since $|\Delta x|>c|\Delta t|$, the interval is spacelike. Choose $v$ so that $\Delta t^{\prime}=0$: $\Delta t^{\prime}=\gamma(1 - 3v/c)=0$, that is $v=c/3$. In that frame $A$ and $B$ are simultaneous; if $v>c/3$ then $B$ even occurs before $A$. But no light can even make the round trip between $A$ and $B$, so reversing their order violates no law of causality.

## 7. Common Errors and Chapter Summary

There are three common errors. First, the $v$ in the numerator and denominator of the velocity transformation is the relative speed of the frames, not to be confused with the particle speed $u$ under study; the appearance of $\gamma$ in the transverse component $u_y^{\prime}$ reflects the fact that length contraction and time dilation both act on transverse motion, so transverse velocity cannot be assumed unchanged. Second, to judge the order of events one must first classify the interval: timelike fixes the order, spacelike allows simultaneity and reversal; never mistake "I see it later" for "it happens later". Third, the Lorentz transformation connects only inertial frames; accelerated frames or gravitational fields belong to general relativity. Summary: the Lorentz transformation is the computational core of relativity, and time dilation, length contraction, velocity transformation and causal structure are all its direct corollaries; mastering the $\gamma$ factor and using intervals to classify causality captures the whole chapter.

## 8. Cosmic Rays, Accelerators and the $\gamma$ of Daily Life

The numerical values of time dilation and length contraction are often counter-intuitive. Flying around the world in an airliner at $250\ \text{m/s}$, $\gamma-1\approx3.5\times10^{-13}$; a lifetime of flying makes one younger by only a few nanoseconds, yet atomic clocks can measure it. Satellites and fast particles amplify the effect to engineering scale. Protons in accelerators run at $\gamma$ of several thousand; in their own frame the tens-of-metres accelerating pipe contracts to the millimetre scale, which is another way to understand high-energy particle motion. Atmospheric muons, unstable nuclei in cyclotrons, electrons in storage rings—lengthened lifetimes are standard fare. Conversely, length contraction has never been directly "photographed", because it is masked by aberration and Terrell rotation: a fast object looks like an ordinary shape rotated through an angle, not a squashed ellipsoid—measuring (reading simultaneously) and seeing (light reaching the eye) are two different operations, and this is the most frequently conflated point in teaching kinematics. Separate "measuring" from "seeing" and many "paradoxes" of relativistic kinematics vanish automatically. Another mental exercise: if a starship flies to the Andromeda galaxy (about $2.5\times10^6$ light years) at $0.99c$, the Earth frame requires about $2.5\times10^6$ years, while the proper time on board is only about $3.6\times10^5$ years—light years are large, but the $\gamma$ factor is truly a "spacetime compression ratio".

## 9. Velocity, Acceleration and Rigid Bodies

Two frequently asked questions deserve answers together. First, what happens when one accelerates further at very high speed? Because of the "braking" structure of velocity composition, each equal increment of velocity along the direction of motion requires ever more "raw velocity", so the acceleration in the laboratory frame falls sharply; a body can approach $c$ indefinitely but never reach it. Second, is there still a "rigid body" in relativity? No. If one end of a long rod is pushed, the "push" travels to the other end as an elastic wave propagating at the speed of sound in the material (no faster than light), so the rod must first bend and then recover; a truly rigid body would mean instantaneous transmission of information, contradicting the light-speed limit. This also clarifies the operational meaning of "simultaneous measurement": measuring the length of a moving ruler requires reading both ends simultaneously, and "simultaneous" is a property of the frame, so length is a property of the frame, while the rest length is the object's intrinsic geometric quantity. These two points prepare the ground for dynamics (the relation between force and acceleration) and spacetime geometry (world lines).

## 10. Rethinking Invariance and Symmetry

The value of the Lorentz transformation lies not merely in converting coordinates but in revealing symmetry. One of the deepest principles of physics is that every invariance corresponds to a conservation law. In special relativity, invariance under time translation gives energy conservation, invariance under spatial translation gives momentum conservation, invariance under spatial rotation gives angular momentum conservation, and Lorentz invariance guarantees that physical laws have the same form in all inertial frames. Together these symmetries form the Poincaré group, the full symmetry of special-relativistic spacetime and the basis for classifying particles: mass and spin label the irreducible representations of the Poincaré group, and the zero rest mass of the photon and the theoretically predicted spin-2 graviton both come from here. Looking back, Einstein's two postulates can be restated more modernly in one sentence: physical laws are invariant under the Poincaré group. Understand this layer and you will see why the Lorentz transformation is as natural as a rotation—it is a rotation of spacetime.

There is one more inversion of ideas worth stating separately. In Galileo's time people believed space to be absolute: space comes first, bodies move within it, and time flows uniformly. Special relativity reverses the relation of master and servant—events and intervals come first, and the division into space and time depends on the observer. So-called "length" is merely the width with which different simultaneity slices cut the same world-tube; so-called "duration" is merely the number of segments into which different coordinate grids divide the same world line. The observer is like a photographer: the same sculpture (the invariant) can be photographed from countless angles, but there is only one sculpture. Learn to distinguish "photograph" from "sculpture" and every "who is right" dispute in relativity dissolves: no frame's conclusions are truer, only invariants carry objectivity. This is also the most valuable methodological legacy special relativity left to all of physics. Readers interested may treat the correspondence between conservation laws and symmetries as an optional exercise and taste the elegance of this method.`,
  },

  'relativistic-kinematics': {
    chapter: 'Chapter 3 Relativistic Kinematics',
    title: 'Length Contraction and Time Dilation',
    summary:
      'Moving clocks run slow and moving rulers contract, both following directly from the Lorentz transformation; the twin paradox and the Doppler effect demonstrate the practical power of relativistic kinematics.',
    keyPoints: [
      'Proper time $\\Delta\\tau$ is the reading of a clock at rest with the object; the time dilation formula $\\Delta t=\\gamma\\Delta\\tau$',
      'The lengthened lifetime of muons is the most direct experimental evidence for time dilation',
      'Length contraction $L=L_0/\\gamma$ occurs only along the direction of motion; transverse lengths are unchanged',
      'The twin paradox is resolved by the asymmetry of the two paths: the astronaut’s proper time is shorter',
      'The relativistic Doppler formula $\\nu=\\nu_0\\sqrt{\\frac{1-\\beta}{1+\\beta}}$ (receding) contains both time dilation and propagation effects',
    ],
    content: String.raw`

The central task of relativistic kinematics is to answer: how do different observers measuring the time interval and the length of the same moving body obtain different results? To answer it one must first clarify what "clock" means. **Proper time** $\Delta\tau$ is defined as the time recorded by a clock at rest relative to the object studied—the watch on the astronaut's wrist, the "internal" decay clock of a muon, both record proper time. **Coordinate time** $\Delta t$ is the time recorded by a whole network of synchronized clocks spread through the frame. The Lorentz transformation shows that for the same process the two are related by

$$\Delta t = \gamma\,\Delta\tau,\qquad \gamma=\frac{1}{\sqrt{1-v^2/c^2}}\ge 1$$

that is, the proper time of a moving body is always shorter than the coordinate time. This is not a mechanical defect of clocks but a property of time itself: every physical process—atomic vibration, chemical reaction, heartbeat, radioactive decay—slows by the same factor as seen from the coordinate frame. Always distinguish "which clock moves relative to which frame"; this is the precondition for making no mistakes in any kinematic calculation.

## 2. Time Dilation and Its Experimental Evidence

The derivation of time dilation takes only two lines. Suppose a sequence of events occurs at the same place in $S^{\prime}$ ($x^{\prime}$ fixed), for instance a clock carried on a spaceship. From the inverse Lorentz transformation $t=\gamma(t^{\prime}+v\,x^{\prime}/c^2)$, taking the difference of two readings at the same $x^{\prime}$ gives $\Delta t=\gamma\,\Delta t^{\prime}$, and $\Delta t^{\prime}=\Delta\tau$ is the proper time, so the time interval in the coordinate frame exceeds the proper time by a factor $\gamma$—**moving clocks run slow**.

The most beautiful experimental evidence is the muon. Muons are produced by cosmic rays in the upper atmosphere (about $10\ \text{km}$ up) and have a mean lifetime of only $\tau_0\approx2.2\ \mu\text{s}$. Without relativistic effects, even at the speed of light a muon could travel only $c\tau_0\approx660\ \text{m}$ in its life, far short of the ground. Yet experiments find abundant muons reaching sea level. Taking $v=0.995c$ ($\gamma\approx10$): the ground observer sees the muon lifetime lengthened to $\gamma\tau_0\approx22\ \mu\text{s}$, allowing about $6.6\ \text{km}$ of flight, enough to penetrate the atmosphere; in the muon's own frame the lifetime is still $2.2\ \mu\text{s}$, but the atmosphere contracts to a tenth, about $1\ \text{km}$, which it can also cross. The two descriptions use different effects (time dilation or length contraction) to reach the same observable conclusion—a display of the self-consistency of relativity. Lifetime measurements of unstable particles in accelerators and atomic-clock experiments on aircraft circling the Earth (the Hafele–Keating experiment) have verified the formula to better than one part in a thousand.

## 3. Length Contraction

Measuring the length of a moving ruler requires reading the positions of both ends at the **same instant**. Let the ruler be at rest in $S^{\prime}$ with rest length (proper length) $L_0$; $S$ measures its two ends at equal $t$. From $x^{\prime}=\gamma(x-vt)$, the difference of the end coordinates is $\Delta x^{\prime}=\gamma\,\Delta x$ (at the same $t$), hence

$$L = \Delta x = \frac{L_0}{\gamma}$$

that is, the length of a moving body along its direction of motion contracts to $1/\gamma$ of its rest length. Three points must be stressed. First, contraction occurs only along the direction of motion: transverse lengths perpendicular to the velocity are unchanged, so a fast-flying sphere would look squashed into an ellipsoid along the motion. Second, "seeing" differs from "measuring": what the eye sees also includes the effect of light travel time (Terrell rotation), and a fast sphere actually still looks spherical, merely rotated through an angle—an optical rather than a kinematic effect. Third, length contraction is mutual: $S$ sees $S^{\prime}$'s ruler shortened, and $S^{\prime}$ sees $S$'s ruler shortened equally; neither is wrong, because the operations they perform (their simultaneity standards) differ—the root is still the relativity of simultaneity.

## 4. The Twin Paradox

An elder brother travels among the stars at nearly the speed of light and returns to find himself younger than the younger brother who stayed on Earth—this is the famous twin paradox. "Paradox" refers to the apparent logical contradiction: motion is relative, the younger brother sees the elder moving and the elder sees the younger moving, so should not each consider the other younger? The answer: **the situations of the two are not symmetric**. The younger brother remains in one inertial frame throughout; the elder passes through three stages—departure, turn-around and return—and at turn-around switches from "moving away from the Earth frame" to "moving toward the Earth frame", a non-inertial process. The spacetime interval $\Delta s^2=c^2\Delta t^2-\Delta x^2$ is invariant, and for timelike motion the inertial (straight world line) path is precisely the one with the largest $\Delta s$—in other words, **the younger brother who takes no detour in an inertial frame experiences the longest proper time**, and the elder's detour makes him younger.

A concrete number: the destination is 6 light years away and the ship makes the round trip at $v=0.8c$ ($\gamma=1/0.6=5/3$). In the Earth frame one leg takes $7.5$ years, the round trip $15$ years; the ship's proper time is $7.5\times0.6=4.5$ years per leg, $9$ years in total. On reunion the elder brother is $6$ years younger. At the instant of turn-around the elder considers "time on Earth to jump forward" by about $1.6$ years (corresponding to the jump of the simultaneity slice), and precisely this jump resolves the paradox. Atomic-clock round-the-world experiments have verified this conclusion on a real scale.

## 5. The Relativistic Doppler Effect

The acoustic Doppler effect depends on a medium; the optical Doppler effect needs no medium and must include time dilation. Let a source recede from the observer along the line of sight at speed $v$, with $\beta=v/c$. The frequency received is

$$\nu = \nu_0\sqrt{\frac{1-\beta}{1+\beta}}$$

This is the **relativistic Doppler formula**. It can be split into two factors: the number of waves emitted per unit time is reduced by time dilation (factor $1/\gamma$), while the receding motion lengthens the distance between successive crests (the classical factor $(1-\beta)$); together they give the formula. When the source approaches, $\beta$ changes sign, the frequency rises and the light is blue-shifted; when it recedes the frequency falls and the light is red-shifted. The red shift of distant galaxy spectra is the basic tool for measuring cosmic expansion; the famous Hubble law $v=H_0 d$ rests on the red-shift Doppler conversion (for cosmological red shift a rigorous treatment belongs to general relativity, but at low speed the Doppler formula gives an excellent approximation). There is also the transverse Doppler effect: even when the source sweeps by transversely, where classical theory predicts no shift, relativity predicts a red shift $\nu=\nu_0/\gamma$ arising purely from time dilation, an effect also confirmed experimentally.

## 6. Typical Calculations and Problem-solving Technique

**Example one: interstellar travel.** Alpha Centauri is about $4.3$ light years away and a ship flies at $0.9c$. The Earth frame requires $4.3/0.9\approx4.8$ years; the proper time on board is $4.8\times\sqrt{1-0.81}\approx2.1$ years, so the astronaut subjectively travels only a little over two years.

**Example two: the muon problem.** See the data of Section 2: $\gamma\approx10$; from the ground viewpoint the lifetime is lengthened, from the muon viewpoint the atmosphere is thinner, and both calculations agree.

There are three points of technique: first draw a diagram and identify the events (what happens when and where); identify the two defining conditions "a clock at the same place measures proper time, a ruler read simultaneously measures length"; finally apply $\Delta t=\gamma\Delta\tau$ or $L=L_0/\gamma$, and never memorize "moving clocks run slow" without determining whose clock is moving.

## 7. Distinguishing Confusions and Chapter Summary

**Distinction one: do time dilation and length contraction contradict each other?** In the muon problem the ground uses time dilation and the muon uses length contraction, with identical conclusions, showing that they are two faces of the same spacetime structure and not contradictory. **Distinction two: who really slows down?** Two observers in mutual uniform motion each measure the other's clock as slow; there is no contradiction, because comparing two clocks requires bringing them together (involving acceleration and turn-around), and then the conclusion is unique: the one who underwent a non-inertial process is younger. **Distinction three: can length contraction squeeze an object into a hole shorter than itself?** The garage paradox answers yes, but the order of "the door closes" and "the tail enters" differs between frames, and consistency is restored once the timing of the door operations is included. Summary: this chapter has only two main formulas, $\Delta t=\gamma\Delta\tau$ and $L=L_0/\gamma$, plus the Doppler formula; the key to all of them is simultaneity—time is measured "at the same place", length "at the same time". Once the events are clearly separated, only algebra remains.

## 8. Three Thought Experiments and Correction of Intuition

First, the photon rocket and navigation: an astronaut flies at $0.8c$ to a target 4 light years away; the ship itself measures the distance contracted to $4\times0.6=2.4$ light years, so the on-board clock advances only $2.4/0.8=3$ years, while the ground clock advances $4/0.8=5$ years. Both descriptions are self-consistent and both agree that "the on-board clock accumulated less than the ground clock"—the one-way version of the twin problem. Second, the high-speed shot: a ship sweeps past the ground at $0.9c$ and fires an arrow forward at $0.5c$ relative to the ship; the ground measures $(0.9c+0.5c)/(1+0.45)\approx0.966c$, apparently only slightly faster than the ship—the closer to the speed of light, the smaller the "gain" from addition, and velocity space seems compressed into a cusp at $c$. Third, chasing light: at 16 Einstein asked "what would I see if I chased a beam of light at the speed of light?" Electromagnetic theory would predict a "frozen" oscillating field, yet Maxwell's equations admit no such solution; precisely this paradox led him to the constancy of light speed—light speed is a common constant of all inertial frames, and no observer can "catch up" with light. These three experiments together correct one intuition: motion near the speed of light twists everyday experience entirely, and old intuitions must be tested and replaced one by one.

## 9. Kinematic Effects in Astrophysics

Relativistic kinematics is no delicate laboratory toy; it shapes the entire high-energy universe. Pulsars are rapidly rotating neutron stars whose surface material moves at a significant fraction of the speed of light, and the arrival times of their radiation must include time dilation corrections. Jets from active galactic nuclei and quasars are ejected at more than $0.99c$; the observed brightness and apparent superluminal motion both stem from relativistic beaming—when the jet points almost at the observer the Doppler factor $\delta=[\gamma(1-\beta\cos\theta)]^{-1}$ far exceeds 1, the radiated intensity is amplified by orders of magnitude, and the apparent transverse speed of the jet can even exceed the speed of light (a projection effect that violates no limit). The afterglow evolution of gamma-ray bursts is likewise dominated by relativistic expansion. Closer to home: GPS satellites move at about $3.9\ \text{km/s}$; special-relativistic time dilation makes their clocks lose about $7\ \mu\text{s}$ per day, while the gravitational effect of general relativity makes them gain about $45\ \mu\text{s}$ per day, a net gain of $38\ \mu\text{s}$ per day—without correction the positioning error would accumulate to more than $10\ \text{km}$ per day. From satellite navigation to jets in the depths of the universe, time dilation and length contraction are everyday facts that must be written into engineering equations.

## 10. Formula Sheet and Methodology of This Chapter

The chapter condenses into one sheet: proper-time relation $\Delta t=\gamma\Delta\tau$; length relation $L=L_0/\gamma$; Doppler relation $\nu=\nu_0\sqrt{(1-\beta)/(1+\beta)}$ (positive for recession); transverse Doppler $\nu=\nu_0/\gamma$; velocity composition $u=(u^{\prime}+v)/(1+u^{\prime}v/c^2)$. Methodologically three steps are emphasized: first identify the events and the frame, writing down "who measures what"; second identify the invariants—the reading of a clock at the same place is proper time, the difference of a ruler read simultaneously is length; third substitute into the formulas and check the low-speed limit. Most errors occur where the events are not separated and formulas are memorized blindly. Relativity is not hard; what is hard is keeping the account of "who sees whom" straight. Once the account is clear, only multiplying or dividing by a $\gamma$ remains.

## 11. Three Exercises for Self-study

Exercise one: a train of rest length $120\ \text{m}$ passes through a tunnel of rest length $120\ \text{m}$ at $0.6c$. How long is the train in the ground frame? How long is the tunnel in the train frame? How do the two frames order the events "the front leaves the tunnel" and "the tail enters the tunnel"? (Hint: in the ground frame the train contracts to $96\ \text{m}$ and fits entirely inside; in the train frame the tunnel contracts to $96\ \text{m}$, so the front has already left before the tail enters—different descriptions, perfectly consistent.) Exercise two: someone travels to Proxima Centauri (about 4.2 light years) and back at $0.8c$, aged 30 at departure; how old on return? How old is the twin who stayed on Earth? (Hint: proper time on board is about $2\times4.2\times0.6=5.04$ years, so he is about 35; the Earth frame experiences $2\times4.2/0.8=10.5$ years, so the twin is about 40.5.) Exercise three: a source approaching at $0.6c$ emits red light of $600\ \text{nm}$; what wavelength and colour does the observer measure? (Hint: longitudinal blue shift, $\nu=\nu_0\sqrt{(1+\beta)/(1-\beta)}=2\nu_0$, the wavelength halves to $300\ \text{nm}$, moving into the ultraviolet.) These three exercises cover all the formulas of the chapter; finish them and you may confidently proceed to the next chapter.`,
  },

  'spacetime-geometry': {
    chapter: 'Chapter 4 Spacetime Geometry',
    title: 'Minkowski Space',
    summary:
      'Minkowski wove time and space into four-dimensional spacetime; the interval invariant, world lines and light cones translate every relativistic effect into elegant geometric language.',
    keyPoints: [
      'The interval $\\Delta s^2=c^2\\Delta t^2-\\Delta x^2-\\Delta y^2-\\Delta z^2$ is a Lorentz invariant',
      'The "distance" of Minkowski spacetime has a positive signature difference; its geometry differs from Euclidean space',
      'A world line is the trajectory traced by a body in the spacetime diagram, its slope in one-to-one correspondence with velocity',
      'Light cones divide spacetime into causally accessible and inaccessible regions; the causal structure is the same for all observers',
      'The twin paradox is obvious on a spacetime diagram: the straight world line has the longest proper time',
    ],
    content: String.raw`

In 1908 Minkowski declared in a lecture at Göttingen: "Henceforth space by itself, and time by itself, are doomed to fade away into mere shadows, and only a kind of union of the two will preserve an independent reality." He elevated Einstein's algebraic results into a geometric picture: time and space are not separate stages but together form a four-dimensional **Minkowski spacetime**, events are points in it, and the Lorentz transformation is a kind of "rotation" in it. This seems only a change of wording but is enormously powerful—the formerly scattered formulas (time dilation, length contraction, simultaneity) suddenly become natural corollaries of one geometric structure, and general relativity grew along exactly this road.

Conventionally the coordinates are written $x^0=ct$ (multiplying time by $c$ so that it has the dimensions of length), and a point of four-dimensional spacetime is denoted $(ct, x, y, z)$. In a spacetime diagram the horizontal axis is usually space $x$ and the vertical axis $ct$; if an observer's world line is straight, the reciprocal of its slope (with $ct$ vertical) is his velocity—the faster he moves, the more the world line "lies down"; the world line of light always has slope $1$ (a $45^{\circ}$ line), and the world line of any massive body must have slope greater than $1$—it can never cross the world line of light.

## 2. The Interval Invariant: The "Pythagorean Theorem" of Spacetime

In Euclidean geometry the squared distance between two points $x^2+y^2+z^2$ is invariant under coordinate rotation. In Minkowski spacetime the counterpart of "distance" is the **interval**

$$\Delta s^2 = c^2\Delta t^2 - \Delta x^2 - \Delta y^2 - \Delta z^2$$

One checks that substituting the Lorentz transformation leaves the value of $\Delta s^2$ identical for all inertial frames—it is a Lorentz invariant. Note the difference from Euclidean distance: the signs here are mixed (signature $+,-,-,-$; some textbooks take the opposite signature), which determines that the "geometric character" of spacetime differs radically from Euclidean space. Along a world line the infinitesimal interval can be written

$$\mathrm{d}s^2 = c^2\mathrm{d}t^2 - \mathrm{d}x^2-\mathrm{d}y^2-\mathrm{d}z^2 = c^2\mathrm{d}\tau^2$$

that is, $\mathrm{d}s/c$ is exactly the proper-time increment $\mathrm{d}\tau$ of the body itself. This identity links the "invariant" to the "clock carried along": **the proper time between two points on a world line is this "spacetime arc length" divided by $c$**, independent of who describes it—a genuinely geometric quantity.

## 3. Timelike, Lightlike and Spacelike Intervals

According to the sign of $\Delta s^2$, pairs of events fall into three classes with entirely different physical meanings. **Timelike** ($\Delta s^2>0$): there is a frame in which the two events occur at the same place, and $\Delta s/c$ is the proper time elapsed in that frame; the events can be connected by a signal slower than light, their order is the same in all frames, and causality can be established. **Lightlike** ($\Delta s^2=0$): the events are connected exactly by a light signal, $\Delta s^2=c^2\Delta t^2-\Delta x^2=0$ means $\Delta x=c\Delta t$; only light (and any particle travelling at $c$) can follow such a path. **Spacelike** ($\Delta s^2<0$): there is a frame in which the events are simultaneous (then $\Delta s^2=-\Delta x^2$, and $|\Delta x|$ is the spatial distance measured simultaneously in that frame); no signal can go back and forth between the events, and their order can be reversed without violating causality. Incidentally, length contraction can be read off geometrically: in the ruler's rest frame the rest length $L_0$ is measured (two events at the ends at the same place, interval $\Delta s^2=-L_0^2$), while in the moving frame both ends are measured simultaneously giving $L$ (two events at the ends at the same time, interval $\Delta s^2=-L^2$); the invariant immediately gives $L=L_0/\gamma$. Time dilation is likewise a direct reshaping of the invariant relation. One invariant, three effects—this is the efficiency of the geometric method.

## 4. World Lines and Proper Time

The trajectory of a body in spacetime is called its **world line**. Uniform motion gives a straight world line, accelerated motion a curve, and rest a vertical line ($x$ constant). The proper time along a world line is given by the integral

$$\tau = \int \sqrt{1-\frac{v^2}{c^2}}\;\mathrm{d}t = \int\frac{\mathrm{d}s}{c}$$

It is invariant: no matter which frame is used to parametrize the world line, the integral is the same. From this comes the most famous conclusion of Minkowski geometry: **the straight world line (inertial motion) connecting two events has the longest proper time**, and any detour (acceleration) gives a shorter proper time. This contrasts with the Euclidean "the straight line is the shortest path between two points", the reason being the signature—flip the sign in front of the time term and "longest" replaces "shortest". The twin paradox receives its final resolution here: the brother who stays on Earth follows a straight line, the travelling brother takes a detour, and the traveller's proper time must be shorter, with no ambiguity. The same principle predicts that, as long as gravity or acceleration can be neglected, anyone who wants to "stay young" must keep moving uniformly at high speed—and turning around is an unavoidable price.

## 5. Light Cones and Causal Structure

Drawing a spacetime diagram with any event $P$ at the origin, all events satisfying $\Delta s^2=0$ form a double cone—the **light cone**. Events inside the upper cone (future light cone) can be influenced by signals from $P$, events inside the lower cone (past light cone) can influence $P$; the region outside the cone ("elsewhere") has no causal connection with $P$ unless superluminal signals exist. Since the interval is invariant, this causal classification is exactly the same for **all** inertial frames: if one observer finds $Q$ inside the future light cone of $P$, every other observer must agree. This geometrizes the causal discussion of the previous chapter: causal structure is a property of spacetime itself and does not change with the observer.

The light cone also answers a common question: "what if I could go faster than light?" On the spacetime diagram the world line of a superluminal signal has slope less than $1$, and a Lorentz transformation (equivalently a skewing of the diagram) can make it "arrive before it is sent" in some frame—hence the paradox. In the framework of relativity, therefore, $c$ is an absolute upper limit for the speed of information and matter; this is not a technical limitation but a requirement of causal consistency.

## 6. Solving Problems with Spacetime Diagrams

A spacetime diagram is not only a conceptual picture but an efficient computational tool. The Lorentz transformation appears as a "shear-like" skewing of the coordinate grid: the time axis of $S^{\prime}$ ($x^{\prime}=0$, that is $x=vt$) tilts to the right, the space axis ($t^{\prime}=0$, that is $t=vx/c^2$) tilts toward the horizontal, and the two axes are symmetric about the $45^{\circ}$ light ray. Surfaces of simultaneity ($t^{\prime}=$ constant) form a family of slanted lines with slope exactly $v/c^2$—the relativity of simultaneity is visible at a glance. The standard procedure for drawing a solution: mark the event points, draw the world lines, indicate the axes of the frames concerned, and read off the geometric relations (parallelograms and the hyperbolas $c^2t^2-x^2=$ constant are common tools, the latter representing "equal intervals"). For example the garage–ladder paradox: in the garage frame both doors close simultaneously and the car is "trapped"; in the car frame the front door closes first and then opens, and the rear door closes only after the whole car has passed—both pictures are different projections of the same invariant structure, with no contradiction.

## 7. Summary and Extensions

This chapter rewrites relativity as geometry: the interval is the invariant "distance", a world line is a history, proper time is arc length, the light cone is the fence of causality, and the Lorentz transformation is an interval-preserving "rotation". Master it and all previous formulas become obvious at a glance; it also paves the way forward—the four-vectors of the four-dimensional formalism (Chapter 6) are precisely vectors of this geometric space, while general relativity replaces Minkowski's flat spacetime with curved spacetime, making gravity itself geometry. Readers are advised to draw three diagrams by hand: the world lines of the twins, a light cone, and the coordinate grid of a Lorentz transformation. After drawing them, "time is the fourth dimension" is no longer a slogan but a landscape you can look down upon.

## 8. Constant Proper Acceleration and Hyperbolic Motion

One of the most beautiful applications of spacetime geometry is the description of a spaceship under constant thrust. Define the proper acceleration $\alpha$ as the acceleration read by the ship's own accelerometer; one can show that its world line is a hyperbola

$$x^2 - c^2t^2 = \left(\frac{c^2}{\alpha}\right)^2,\qquad x(t)=\frac{c^2}{\alpha}\left(\sqrt{1+\frac{\alpha^2t^2}{c^4}}-1\right)$$

(assuming the ship starts from rest at the origin.) The velocity $v=\alpha t/\sqrt{1+\alpha^2t^2/c^2}$ grows with time yet always stays below $c$: in the laboratory frame the acceleration "fades" ever more, while the ship itself feels a constant thrust. Accelerating continuously at a comfortable $g\approx9.8\ \text{m/s}^2$, one approaches the speed of light in about a year of ship time, after which galaxy-scale travel becomes possible in proper-time terms—though the energy budget is staggering, a topic for the dynamics chapter. Hyperbolic motion is also the special-relativistic precursor of "uniform acceleration is equivalent to gravity" (the equivalence principle) in general relativity. As an exercise, set $\alpha=10\ \text{m/s}^2$ and $t=1$ year and compute the velocity and distance by hand, turning the formulas into numbers.

## 9. Drawing Exercises with Spacetime Diagrams

Readers are advised to complete three drawing exercises. First: draw the world lines of the twins, a vertical line for the younger brother and an isosceles triangle for the elder, with $x$ horizontal and $ct$ vertical; then use "equal-proper-time hyperbolas" ($c^2t^2-x^2=$ constant) to mark the elder's proper time before and after turn-around, verifying that the sum of the proper times along the two sides of the triangle is less than along the vertical line. Second: draw the coordinate grid of $S^{\prime}$ ($v=0.6c$), the time axis with slope $c/v$, the space axis with slope $v/c$, the two symmetrically placed on either side of the $45^{\circ}$ light ray; draw one "surface of simultaneity" and watch how it tilts as $v$ increases. Third: draw a light cone and redraw the two examples "who sees the light first" from Chapter 1 and "spacelike events reversing order" from Chapter 2. The ability to draw spacetime diagrams is the ability to internalize the Lorentz transformation as geometric intuition; afterwards, when you meet any paradox, draw first and write later, and nine times out of ten it is solved at a glance. If that is not enough, add a fourth exercise: draw length contraction as the result of "a simultaneity line cutting a world-tube"—the world-tube is the region swept out by the entire history of the body, and simultaneity lines of different frames cut out different widths, which is precisely the graphical language of "length varies with the frame".

## 10. Applying the Interval Idea to Measurement

The interval invariant is not theoretical decoration; it directly supports modern measurement technology. The relativistic version of radar ranging is an interval calculation: the round-trip time of a pulse and the distance to the target must, when the target moves fast, be defined through intersections of world lines and light cones; the data-processing core of satellite navigation, deep-space probes and gravitational-wave detection is this geometry. Gravitational-wave detection is especially beautiful: each arm of the interferometer is four kilometres long, and the arm-length difference caused by a passing wave is far smaller than the radius of a proton; the measurement is possible precisely because "optical path constitutes the observable and the interval is a geometric fact". Another application is high-precision time synchronization: clocks in different frames cannot be compared directly; one must integrate proper time along world lines and correct item by item for Doppler and gravitational effects. It can be said that every step of modern precision measurement rests on the concepts of this chapter: events, world lines, proper time, intervals. With solid geometry, measurement problems are upgraded from "patchwork formula corrections" to "design at the level of principle".

Finally, a touchstone for whether you have mastered the chapter: can you explain time dilation, length contraction, the relativity of simultaneity and the Doppler effect in one sentence each? The answer should be—they are all different projections of the interval invariant: a pair of same-place events projects onto another frame as a long time difference at different places; a pair of simultaneous events projects as a length difference at different places; a lightlike interval constrains the frequency transformation into a square-root formula. Four effects, one root—this is the most elegant aspect of Minkowski geometry. If you can say this fluently, the chapter truly belongs to you.`,
  },

  'relativistic-dynamics': {
    chapter: 'Chapter 5 Relativistic Dynamics',
    title: 'Mass–Energy Relation',
    summary:
      'To keep the laws of mechanics form-invariant under the Lorentz transformation, momentum and energy must be redefined, which yields the mass–energy equation and the energy–momentum relation.',
    keyPoints: [
      'Relativistic momentum $\\mathbf{p}=\\gamma m_0\\mathbf{v}$ guarantees momentum conservation in all inertial frames',
      'The mass–velocity relation $m=\\gamma m_0$ prevents a body from reaching the speed of light',
      'The mass–energy equation $E_0=m_0c^2$ shows that rest mass measures rest energy',
      'Kinetic energy $E_k=(\\gamma-1)m_0c^2$ reduces to $\\frac{1}{2}m_0v^2$ at low speed',
      'The energy–momentum relation $E^2=p^2c^2+m_0^2c^4$ applies uniformly to massive and massless particles',
      'The force $\\mathbf{F}=\\mathrm{d}\\mathbf{p}/\\mathrm{d}t$ keeps its form, but $\\mathbf{F}$ is no longer parallel to acceleration',
    ],
    content: String.raw`

Newtonian mechanics is no longer form-invariant under the Lorentz transformation: if one keeps $\mathbf{p}=m\mathbf{v}$ and momentum conservation, then a collision that conserves momentum in one inertial frame fails to conserve it in another. The principle of relativity requires physical laws to have the same form in all inertial frames, so the definition of momentum must be modified to make conservation hold under the Lorentz transformation. The principle of the modification: keep the deepest empirical law "momentum conservation" and the form $\mathbf{F}=\mathrm{d}\mathbf{p}/\mathrm{d}t$, and sacrifice the untested old assumption that "mass is independent of velocity".

Kinematic analyses of many collision processes (for example perfectly inelastic collisions, or comparative calculations of elastic collisions in two inertial frames) consistently show that if momentum is defined as

$$\mathbf{p} = \gamma m_0\,\mathbf{v},\qquad \gamma=\frac{1}{\sqrt{1-v^2/c^2}}$$

then momentum conservation holds simultaneously in all inertial frames. Here $m_0$ is the mass measured in the body's rest frame (rest mass), an invariant; the combination $m=\gamma m_0$ grows with speed and is called the (relativistic) mass. The modification looks small, but its consequences cover all of modern physics.

## 2. Mass–Velocity Relation and the Light-Speed Barrier

From $m=\gamma m_0$ one sees that the faster the motion, the larger the mass: at $v=0.9c$, $m\approx2.29m_0$; at $v=0.99c$, $m\approx7.09m_0$. As $v\to c$, $m\to\infty$, and accelerating an infinite mass with a finite force is impossible, so **the speed of a body with rest mass is always less than $c$**. Conversely, particles travelling at $c$ (photons and the like) must have $m_0=0$ (otherwise momentum and energy would diverge). In accelerators, accelerating an electron from $0.99c$ to $0.999c$ requires far more energy than from rest to $0.99c$—the mass–velocity relation is verified every day.

A modern note on "mass varying with speed": contemporary physics prefers to use only the invariant $m_0$ (called the mass) and to put all of $\gamma m_0c^2$ into the energy, avoiding the conceptual confusion of "relativistic mass". Both formulations make identical observable predictions; this course keeps $m=\gamma m_0$ in its formulas to connect with most textbooks, but remember: the invariant is the physical substance.

## 3. Energy and the Mass–Energy Equation

Integrating "work done by a force equals the increment of kinetic energy" along the relativistic momentum redefines the kinetic energy as

$$E_k = \int_0^v \mathbf{F}\cdot\mathrm{d}\mathbf{r} = \int_0^v v\,\mathrm{d}(\gamma m_0 v) = \gamma m_0 c^2 - m_0 c^2 = (\gamma - 1)\,m_0 c^2$$

This expression automatically suggests defining the total energy as

$$E = \gamma m_0 c^2 = mc^2,\qquad E_0 = m_0 c^2$$

where $E_0$ is the energy a body possesses at rest (rest energy). This is the famous **mass–energy equation**: mass and energy are two ways of bookkeeping the same entity, with conversion rate $c^2$. Since $c^2\approx9\times10^{16}\ \text{J/kg}$, a tiny mass defect corresponds to enormous energy—the origin of nuclear energy. The equation is not the property of nuclear physics alone: chemical burning also releases heat accompanied by a mass decrease, but the fraction is only about $10^{-10}$ and cannot be weighed; a cup of hot water is slightly heavier than a cup of cold water, a difference that equally exists. Mass conservation and energy conservation thus merge into one unified law of mass–energy conservation.

## 4. Kinetic Energy, Binding Energy and Nuclear Reactions

The most frequent application of the mass–energy equation is nuclear reactions. Let the total rest mass before the reaction be $\sum m_i$ and after the reaction $\sum m_f$; the energy released is $Q=\Delta m\,c^2$, where $\Delta m=\sum m_i-\sum m_f$ is the mass defect. The proton–proton chain of the Sun fuses four hydrogen nuclei into one helium nucleus, with a defect of about $0.7\%$ of the mass, released according to $E=\Delta mc^2$, which has powered the Sun's light and heat for billions of years; the fission of uranium-235 in a power station releases about $200\ \text{MeV}$ per event, corresponding to a mass defect of about $0.2\ \text{u}$. More precisely one should speak of **binding energy**: the binding energy of a nucleus is $B=\Delta m\,c^2$, and the curve of binding energy per nucleon peaks near iron, which explains why both light-nucleus fusion and heavy-nucleus fission release energy. Computations often use $1\ \text{u}\,c^2=931.5\ \text{MeV}$, a basic tool of nuclear physics homework.

## 5. The Energy–Momentum Relation

Combining $E=\gamma m_0c^2$ and $p=\gamma m_0v$ and eliminating $\gamma$ gives one of the most important invariant relations in mechanics,

$$E^2 = p^2 c^2 + m_0^2 c^4$$

For a body at rest ($p=0$) it reduces to $E=m_0c^2$; for a photon ($m_0=0$) it gives $E=pc$, that is the photon momentum $p=E/c$. This relation is ubiquitous in particle physics: measuring a particle's momentum and energy gives its mass; the experimental upper limit on the neutrino mass was obtained precisely by testing it accurately. It also gives the relativistic version of de Broglie's relations ($E=h\nu$, $p=h/\lambda$ are self-consistent for photons), a bridge to quantum mechanics.

## 6. Force and Acceleration: The Relativistic Correction to Newton's Second Law

Keeping the form $\mathbf{F}=\mathrm{d}\mathbf{p}/\mathrm{d}t=\mathrm{d}(\gamma m_0\mathbf{v})/\mathrm{d}t$ and expanding, one finds

$$\mathbf{F} = \gamma m_0\,\mathbf{a}_{\perp} + \gamma^3 m_0\,\mathbf{a}_{\parallel}$$

that is, force and acceleration are in general **no longer parallel**: the effective inertia perpendicular to the velocity is $\gamma m_0$, and along the velocity $\gamma^3 m_0$. This means "mass increasing with speed" must be distinguished by direction, and also that a body under constant force cannot accelerate indefinitely—as the speed approaches $c$ the parallel acceleration falls sharply to zero. Historically this distinction led people to speak of "longitudinal mass" and "transverse mass"; the modern view abandons the terminology and uses momentum and energy directly. Another point: $\mathbf{F}=\mathrm{d}\mathbf{p}/\mathrm{d}t$ and $\mathbf{F}=m_0\mathbf{a}$ are no longer equivalent at high speed, so problems should always start from the momentum form.

## 7. Typical Calculations and Summary

**Example one: electron accelerator.** Accelerating an electron from rest to kinetic energy $E_k=1\ \text{MeV}$ ($m_0c^2=0.511\ \text{MeV}$) gives total energy $E=1.511\ \text{MeV}=2.958\,m_0c^2$, hence $\gamma=2.958$ and $v=\sqrt{1-1/\gamma^2}\,c\approx0.941c$. The classical kinetic-energy formula would give $v\approx1.98c$, absurdly wrong—high-speed problems must use relativity.

**Example two: collider efficiency.** To make two protons collide with relative kinetic energy $E$, a fixed-target arrangement needs an incident energy of order $E^2/(2m_pc^2)$, whereas a collider needs only $E/2$ each—the fundamental reason for building colliders (see the worked examples).

Summary: the chapter makes only one modification—momentum $\mathbf{p}=\gamma m_0\mathbf{v}$; energy grows naturally out of the work relation as $E=\gamma m_0c^2$; the energy–momentum relation $E^2=p^2c^2+m_0^2c^4$ is the crystallization of the three. Remember four practical formulas: $p=\gamma m_0v$, $E=\gamma m_0c^2$, $E_k=(\gamma-1)m_0c^2$, $E^2=p^2c^2+m_0^2c^4$; with the idea of invariants, most dynamical problems yield readily.

## 8. Experimental Witness: From Beta Rays to the LHC

The history of relativistic dynamics is a history of experimental verification. In 1909 Bücherer used electromagnetic deflection of beta rays (electrons) to measure the charge-to-mass ratio and found that mass grows with speed, the data agreeing precisely with $m=\gamma m_0$—the earliest direct verification. Accelerators then became the ultimate test bed: cyclotrons fail once particle energies exceed the MeV scale—because the increased mass lowers the cyclotron frequency, engineering must switch to synchrotrons, and the "relativistic correction" was written directly into machine design. The Large Hadron Collider accelerates protons to $\gamma\approx7460$ ($6.8\ \text{TeV}$ per beam), each proton carrying more than seven thousand times its rest energy. The most direct display of the mass–energy relation is "creating matter": when the collision energy is high enough, new particles can be produced out of nothing—antiprotons (discovered 1955), the J/ψ particle, the Higgs boson (discovered 2012) all "materialize" from collision energy; the equivalence of energy and mass is verified daily by billions of collisions.

## 9. Problem-solving Routine with Energy, Momentum and Invariants

Relativistic dynamics problems have an efficient routine whose core is invariants. First write $(E,p)$ for each particle, using MeV/GeV units for convenience. Second identify the conservation laws: total energy and total momentum of an isolated system are conserved, together forming conservation of the total four-momentum. Third, for questions such as "find the available energy" or "find the mass of the final state", square or take the modulus squared of both sides of the equation so that cross momentum terms cancel and only invariants remain. The classic demonstration is a perfectly inelastic collision: a particle of momentum $p$ and energy $E$ hits an identical particle at rest, and the composite rest mass satisfies $M^2c^4=2m_0^2c^4+2Em_0c^2$, visibly increasing with the incident energy—the harder the collision, the "heavier" the product, precisely why fixed-target accelerators are limited in efficiency. Decay problems yield to the same method: a particle of rest mass $M$ at rest decays into two particles, and conservation of four-momentum squared immediately gives the daughter energy $E_1=\dfrac{M^2+m_1^2-m_2^2}{2M}c^2$, a formula used daily in particle physics. Master the pair "conservation + invariants" and the difficulty of dynamics problems drops sharply.

## 10. A Checklist of Common Errors

This section lists five high-frequency mistakes that cost marks. First, substituting $m_0$ as a speed-dependent quantity into the old formula $F=m_0a$; the correct procedure is to return to $\mathbf{F}=\mathrm{d}\mathbf{p}/\mathrm{d}t$. Second, writing kinetic energy as $\frac{1}{2}mv^2$ with $m$ replaced by $\gamma m_0$—the correct formula is $E_k=(\gamma-1)m_0c^2$, which reduces to the classical form only to first order. Third, writing $m_0^2c^4$ as $m^2c^4$ in the energy–momentum relation, destroying invariance; remember that both sides contain only the invariant $m_0$. Fourth, assigning a "rest mass" to a photon or computing photon energy with the classical kinetic formula; a photon has only $E=pc=h\nu$. Fifth, computing only the mass defect in a nuclear reaction and omitting the check of kinetic-energy conservation in the final state. After solving, finish with two self-checks: does the low-speed limit restore the classical result? Is the conclusion symmetric under frame reversal ($v\to -v$)? If both pass, the answer is very likely correct.

## 11. From Classical to Relativistic: A Comparative Study

Placing Newtonian mechanics and relativistic dynamics side by side is the most effective way to consolidate the chapter. Momentum: classically $\mathbf{p}=m_0\mathbf{v}$, relativistically $\mathbf{p}=\gamma m_0\mathbf{v}$. Energy: classical kinetic energy $\frac{1}{2}m_0v^2$, relativistic $E_k=(\gamma-1)m_0c^2$, plus a new rest energy $m_0c^2$ independent of speed. Mass: classically the invariant is the mass itself; relativistically the invariant is $m_0$, and all speed effects go into $\gamma$. Conservation laws: classically mass and energy are conserved separately; relativistically they merge into one mass–energy conservation. Laws of motion: classically $\mathbf{F}=m_0\mathbf{a}$; relativistically the form $\mathbf{F}=\mathrm{d}\mathbf{p}/\mathrm{d}t$ is kept but force and acceleration are generally no longer parallel. Limit checks: expanding every relativistic formula in Taylor series for $v\ll c$ restores the classical results at first order, the correction being of order $\frac{1}{2}v^2/c^2$—about $10^{-15}$ in daily life, $10^{-10}$ at satellite speeds, and dominant near the speed of light. Readers are advised to write out such a comparison table by hand, with three columns for formula, conditions of validity and limiting behaviour; afterwards the popular saying "relativity overthrew classical mechanics" is replaced by a more accurate picture: it delimits and contains classical mechanics.

The other half of comparative study is a sense of numbers. Remember three anchors: at $v=0.1c$, $\gamma-1\approx0.005$ and the classical formulas remain reliable; at $v=0.5c$, $\gamma\approx1.155$ and the correction already reaches fifteen per cent, so relativity is required; at $v=0.99c$, $\gamma\approx7.1$ and the effect dominates completely. For any high-speed problem, first estimate the order of $\gamma$ from the anchors and then decide which set of formulas to use—this step prevents most methodological errors. The other side of numerical sense is unit sense: particle physics uses MeV and GeV, nuclear physics MeV and u, macroscopic engineering joules and kilograms, all converted through $c^2$; fluency in the conversion chain is a basic skill of dynamics exercises.`,
  },

  'four-vectors': {
    chapter: 'Chapter 6 Four-dimensional Formalism',
    title: 'Four-vectors and Tensors',
    summary:
      'Write spacetime coordinates as a four-position, regroup physical quantities into four-vectors, make the Lorentz transformation a matrix action, and physical laws acquire a concise covariant form.',
    keyPoints: [
      'The four-position $X^{\\mu}=(ct,x,y,z)$ is the basic object of Minkowski spacetime',
      'The Lorentz transformation is the action of a matrix $\\Lambda^{\\mu}_{\\ \\nu}$ that preserves the Minkowski metric',
      'The four-velocity $U^{\\mu}=\\gamma(c,\\mathbf{v})$ has constant squared modulus $c^2$',
      'The four-momentum $P^{\\mu}=(E/c,\\mathbf{p})$ unifies energy and momentum into one vector',
      'Covariant equations keep their form under Lorentz transformations, the mathematical expression of the principle of relativity',
    ],
    content: String.raw`

The formulas of the first three chapters, though correct, look scattered: one for time dilation, one for length contraction, three for velocity transformation, each carrying its own $\gamma$. This patchwork feeling comes from one fact—we have been writing physics with three-dimensional vectors plus an independent time variable. Minkowski geometry tells us that time and space are one, and the natural move is to pack them into a four-dimensional object. Then a miracle happens: the Lorentz transformation becomes a matrix multiplication, the various $\gamma$ factors appear automatically in the right places, energy and momentum, charge and current, electromagnetic potentials all merge into single objects, and physical laws become compact equations of the same form in all inertial frames. This language is called the covariant formalism, and it is the necessary road to general relativity and quantum field theory.

Greek indices $\mu,\nu=0,1,2,3$ label the four-dimensional components, with $0$ corresponding to time. Repeated upper and lower indices are summed (Einstein convention), so the $\sum$ sign can be omitted.

## 2. Four-position and Metric

The four-position is defined as

$$X^{\mu} = (ct,\; x,\; y,\; z)$$

The "distance" between two events is given by the metric. Introducing the Minkowski metric tensor

$$\eta_{\mu\nu} = \mathrm{diag}(1,\,-1,\,-1,\,-1)$$

the interval invariant is the "inner product" of the difference of two four-positions,

$$\Delta s^2 = \eta_{\mu\nu}\,\Delta X^{\mu}\Delta X^{\nu} = c^2\Delta t^2 - \Delta x^2 - \Delta y^2 - \Delta z^2$$

The distinction between upper and lower indices arises here: $A^{\mu}$ is called a contravariant component, $A_{\mu}=\eta_{\mu\nu}A^{\nu}$ a covariant component; their time components agree while their space components differ by a sign. This seemingly fussy rule is exactly what guarantees that the inner product is invariant.

## 3. The Tensor Form of the Lorentz Transformation

A Lorentz transformation with velocity $v$ along $x$ can be written in matrix form

$$\Lambda^{\mu}_{\ \nu} = \begin{pmatrix}\gamma & -\beta\gamma & 0 & 0\\ -\beta\gamma & \gamma & 0 & 0\\ 0 & 0 & 1 & 0\\ 0 & 0 & 0 & 1\end{pmatrix},\qquad X^{\prime\mu} = \Lambda^{\mu}_{\ \nu}\,X^{\nu}$$

where $\beta=v/c$. Note that this matrix resembles a plane rotation yet differs in spirit: the trigonometric functions of a rotation are replaced by $\gamma$ and $\beta\gamma$ (one may formally write $\beta=\sinh\varphi$, $\gamma=\cosh\varphi$, so the Lorentz transformation is a hyperbolic rotation through the "rapidity" $\varphi$). The matrix satisfies $\Lambda^{\mathrm{T}}\eta\,\Lambda=\eta$—precisely this condition guarantees the invariance of the interval. All Lorentz transformations form a group (the Lorentz group); adding translations gives the Poincaré group, the full symmetry of special-relativistic spacetime.

## 4. Four-velocity and Four-acceleration

The three-velocity $\mathbf{u}=\mathrm{d}\mathbf{x}/\mathrm{d}t$ is not the spatial part of a four-vector, because $\mathrm{d}t$ is not invariant. Differentiate instead with respect to proper time: $\mathrm{d}\tau=\mathrm{d}t/\gamma$ is invariant, so define the **four-velocity**

$$U^{\mu} = \frac{\mathrm{d}X^{\mu}}{\mathrm{d}\tau} = \gamma\,(c,\; \mathbf{u})$$

It is automatically a four-vector (a derivative with respect to an invariant parameter preserves the transformation property). Its "squared modulus" is $U^{\mu}U_{\mu}=\gamma^2(c^2-u^2)=c^2$, a constant for every particle and every inertial frame—the magnitude of the four-velocity never changes, only its direction, an extremely clean geometric picture. Similarly define the **four-acceleration**

$$A^{\mu} = \frac{\mathrm{d}U^{\mu}}{\mathrm{d}\tau} = \gamma\frac{\mathrm{d}}{\mathrm{d}t}\big[\gamma(c,\mathbf{u})\big]$$

which satisfies $U^{\mu}A_{\mu}=0$ (four-velocity and four-acceleration are "orthogonal"). This explains a puzzle of Chapter 5: why force and three-acceleration are not parallel—the three-dimensional "non-orthogonality" is the projection of four-dimensional orthogonality. The world line of uniformly accelerated motion (constant proper acceleration) is a hyperbola, from which the velocity–time relation of a constant-thrust starship can be computed; it never exceeds $c$.

## 5. Four-momentum and Conservation Laws

Multiplying the four-velocity by the invariant $m_0$ gives the **four-momentum**

$$P^{\mu} = m_0 U^{\mu} = \left(\frac{E}{c},\; \mathbf{p}\right)$$

The time component is exactly the energy (divided by $c$) and the space components exactly the three-momentum—energy and momentum are two faces of the same four-vector. Its squared modulus gives the energy–momentum relation

$$P^{\mu}P_{\mu} = \frac{E^2}{c^2} - p^2 = m_0^2c^2$$

In collisions or decays the total four-momentum is conserved: $\sum_i P_i^{\mu}=$ constant, one sentence containing four conservation laws (one for energy, three for momentum). The "invariant mass" most used in particle physics comes from the squared modulus of the total four-momentum: $s=(P_1+P_2)^{\mu}(P_{1\mu}+P_{2\mu})/c^2$, independent of the frame, a measure of the available collision energy (see the worked examples). The four-momentum of a photon is $P^{\mu}=(h\nu/c,\,h\nu\,\hat{\mathbf{n}}/c)$, with zero squared modulus—a "null vector".

## 6. The Power of the Covariant Formalism

The value of the four-dimensional language is this: any physical law written as an equation between four-vectors automatically keeps its form under the Lorentz transformation—the mathematical embodiment of the principle of relativity. The next two chapters will show: current and charge density combine into the four-current $J^{\mu}=(c\rho,\mathbf{J})$, and the continuity equation becomes $\partial_{\mu}J^{\mu}=0$; the electromagnetic potentials combine into the four-potential $A^{\mu}=(\phi/c,\mathbf{A})$; the electromagnetic field tensor $F^{\mu\nu}$ packs the six components of the electric and magnetic fields into one antisymmetric tensor, and Maxwell's equations condense into two, $\partial_{\mu}F^{\mu\nu}=\mu_0J^{\nu}$ and $\partial_{[\lambda}F_{\mu\nu]}=0$. The original four-plus-four equations become two, and covariance is obvious—this is not decoration but deep physics: Maxwell's equations are relativistic from birth, and the constancy of light speed was hidden in their structure all along.

## 7. Summary and Study Advice

The core list of this chapter has only four items: four-position and metric, the Lorentz transformation matrix, four-velocity $U^{\mu}=\gamma(c,\mathbf{u})$, four-momentum $P^{\mu}=(E/c,\mathbf{p})$, plus two identities $U^{\mu}U_{\mu}=c^2$ and $P^{\mu}P_{\mu}=m_0^2c^2$. Three pieces of advice: first, work out the component expansion of $X^{\prime\mu}=\Lambda^{\mu}_{\ \nu}X^{\nu}$ by hand and confirm it is the Lorentz transformation of Chapter 2; second, re-derive the energy–momentum relation using $P^{\mu}P_{\mu}$ and appreciate the efficiency of the invariant method; third, do one collision problem using four-momentum conservation (see the worked examples) and experience the tool "the squared modulus of the total four-vector is the same in every frame". After mastering the chapter, special relativity changes from a set of long formulas into a geometry, and the electromagnetic field tensor of Chapter 7 will pose no obstacle.

## 8. Worked Instances: Decays, Collisions and Invariants

The power of the four-dimensional formalism is best felt through examples. Example one, particle decay: a particle of rest mass $M$ at rest decays into two particles of masses $m_1$, $m_2$. Total four-momentum conservation gives $P=P_1+P_2$. Using the invariant $P_2^{\mu}P_{2\mu}=m_2^2c^2$ for the second particle and substituting $P_2=P-P_1$, squaring and rearranging gives $E_1=\dfrac{M^2+m_1^2-m_2^2}{2M}c^2$—one line of algebra yields all the kinematics. Example two, invariant mass: the $s=(P_1+P_2)^{\mu}(P_{1\mu}+P_{2\mu})/c^2$ of a collision system has the same value in any frame, so it may be computed in the most convenient one; for head-on equal-energy collisions $\sqrt{s}=E_1+E_2$, while for fixed targets at high energy $\sqrt{s}\approx\sqrt{2m_0E_1}$; these two formulas explain the logic of building colliders. Example three, another way to get the velocity: from $U^{\mu}=\gamma(c,\mathbf{v})$, given a particle's four-momentum $(E/c,\mathbf{p})$, $v=pc^2/E$, more direct than finding $\gamma$ first and then $v$. The common methodology of the three: put "which particles" into one four-vector equation, then take the squared modulus or choose the most convenient frame—the invariant does all the frame conversions for you. Extending each of the three examples one step further (for instance from two-body to three-body decay) is the best exercise for testing whether you have truly mastered the invariant method.

## 9. From Four-vectors to Tensors: The Next Step

The natural step after four-vectors is second-rank tensors. The metric $\eta_{\mu\nu}$ is itself a second-rank tensor, playing the role of a machine that lowers upper indices; the Lorentz transformation preserves $\eta$, which is exactly what distinguishes an ordinary "rotation" from a "boost". The most important second-rank antisymmetric tensor in physics is the electromagnetic field tensor $F^{\mu\nu}$ of the next chapter, which packs the six components of $\mathbf{E}$ and $\mathbf{B}$ into a $4\times4$ antisymmetric matrix; readers used to four-vectors will find that a tensor transformation is just two matrix actions. In addition, the Einstein summation convention implicit in this chapter (repeated indices are summed) is the universal notation of relativity and field theory; practise "reading indices" from the start: multiply and contract upper with lower indices, and keep the number of free indices equal on both sides, and the meaning of an equation is immediately clear. Study advice: derive $U^{\mu}U_{\mu}=c^2$, $P^{\mu}P_{\mu}=m_0^2c^2$ and $\mathbf{p}=E\mathbf{v}/c^2$ by hand, then do one small numerical problem for each, and the chapter may be declared passed.

## 10. Remarks on Signs and Conventions

In four-dimensional calculations conventions cause more errors than technique, and this section gathers the reminders. First, signature: this course uses $(+,-,-,-)$; some textbooks use $(-,+,+,+)$. They differ only by an overall sign, but the interpretation of the signs of intervals and squared moduli must change accordingly; when mixing two books, check the convention first. Second, index position: the space components of $A^{\mu}$ and $A_{\mu}$ differ by a sign, so upper and lower indices must be paired when writing equations. Third, units: high-energy physics often uses natural units with $c=1$, where energy, momentum and mass share one unit; this course keeps $c$ to connect with textbooks, but practise translating between the two styles. Fourth, gamma and beta: $\beta=v/c$, $\gamma=(1-\beta^2)^{-1/2}$; writing $\beta$ first and then $\gamma$ reduces arithmetic errors, and near $1$ the factorization $1-\beta^2=(1-\beta)(1+\beta)$ is more stable. For an unfamiliar formula, first check whether it reduces at $v\ll c$ and whether it is self-consistent for a photon ($\beta=1$); these two questions are the cheapest correctness tests. Internalize these conventions and the four-dimensional language turns from a burden into the most economical expression.

## 11. Computational Practice and Common Sign Traps

Hand computation is the only way to make the four-dimensional language your own; the following numerical exercises are recommended. Exercise one: verify the squared modulus of the four-velocity. Take $v=0.6c$; then $\gamma=1.25$, $U^{\mu}=(1.25c,\,0.75c)$, and the squared modulus is $1.25^2c^2-0.75^2c^2=c^2$, as theory requires. Exercise two: check the energy–momentum relation. For an electron with kinetic energy $2\ \text{MeV}$, $E=2.511\ \text{MeV}$, $pc=\sqrt{E^2-(m_0c^2)^2}\approx2.46\ \text{MeV}$, and $v=pc^2/E\approx0.98c$. Exercise three: invariant mass. Two $1\ \text{MeV}$ photons collide head-on; the total four-momentum is $(2\ \text{MeV}/c,\,\mathbf{0})$, so $\sqrt{s}=2\ \text{MeV}$, equivalent to a particle of rest energy $2\ \text{MeV}$—well above the threshold $2m_ec^2=1.022\ \text{MeV}$ for creating an electron–positron pair, so the reaction can proceed. If time permits, do a comprehensive problem: a pion at rest (rest energy $140\ \text{MeV}$) decays into a muon (rest energy $106\ \text{MeV}$) and a neutrino (approximately massless); using this chapter's formulas find the muon energy and speed, about $E_{\mu}=110\ \text{MeV}$ and $v\approx0.27c$—cosmic-ray muons are produced exactly this way, echoing the time dilation of Chapter 3.

There are three common sign traps: writing $P^{\mu}P_{\mu}$ as $E^2/c^2+p^2$ (missing the minus sign on the space components); writing the four-velocity as $(c,\mathbf{v})$ (missing the $\gamma$); mixing the $c=1$ and explicit-$c$ styles so that dimensions become inconsistent. Each trap corresponds to a high-frequency loss of marks in real exams, so check these places specifically. After computing, substitute the result back to verify the squared modulus—an indispensable closing step of any four-dimensional calculation.

## 12. A Comprehensive Example: Compton Scattering in Four Dimensions

Compton scattering is the best exercise for four-momentum conservation. Let an incident photon of energy $E = h\nu$ collide with an electron at rest (rest energy $m_0c^2$) and scatter at angle $\theta$ to the incident direction with energy $E'$.

**Step one: write the four four-momenta.** Take the incident direction as the $x$ axis: incident photon $k^{\mu} = (E/c,\; E/c,\; 0,\; 0)$, scattered photon $k^{\prime\mu} = (E'/c,\; (E'/c)\cos\theta,\; (E'/c)\sin\theta,\; 0)$, electron initially $P^{\mu} = (m_0c,\; \mathbf{0})$, finally $P^{\prime\mu}$.

**Step two: eliminate the final electron with the invariant.** From the conservation equation $P' = k + P - k'$, take the squared modulus of both sides:

$$P^{\prime\mu}P'_{\mu} = (P + k - k')^{\mu}(P + k - k')_{\mu} = m_0^2c^2$$

In expanding, note three properties: $k^{\mu}k_{\mu} = k^{\prime\mu}k'_{\mu} = 0$ (photons are null vectors), $P^{\mu}k_{\mu} = P^{\mu}k'_{\mu} = m_0E$ (the electron is at rest, only the time component contributes), and $k^{\mu}k'_{\mu} = \dfrac{EE'}{c^2}(1 - \cos\theta)$. Substituting gives

$$m_0^2c^2 + 2m_0(E - E') - 2\frac{EE'}{c^2}(1 - \cos\theta) = m_0^2c^2$$

**Step three: solve for the change in wavelength.** Rearranging gives $m_0c^2(E - E') = EE'(1 - \cos\theta)$; dividing both sides by $EE'$,

$$\frac{1}{E'} - \frac{1}{E} = \frac{1 - \cos\theta}{m_0c^2}$$

Using $E = hc/\lambda$ to convert to wavelength immediately gives the Compton formula

$$\Delta\lambda = \lambda' - \lambda = \frac{h}{m_0c}(1 - \cos\theta)$$

where $h/m_0c = 2.43\times10^{-12}\ \text{m}$ is the Compton wavelength of the electron. The whole derivation never touches a $\gamma$ and performs no frame transformation—the efficiency of the invariant method is fully displayed.

**Step four: numerical check.** Take $\theta = 90^\circ$ and incident X-rays with $\lambda = 0.0711\ \text{nm}$ (the Kα line of molybdenum); then $\Delta\lambda = 2.43\ \text{pm}$, $\lambda' = 0.0735\ \text{nm}$, a relative change of 3.4%, in precise agreement with experiment. For visible light ($\lambda \approx 500\ \text{nm}$) the relative Compton shift is only $5\times10^{-6}$, almost unmeasurable—which explains why the Compton effect is significant only in the X-ray band.

**Step five: methodological summary.** The standard routine of the four-dimensional method has only three steps: write all participants as four-vectors and list the conservation equation; leave the unknown four-vector alone on the left; take the squared modulus of both sides and replace unknown spacetime components by known invariants ($m_0^2c^2$ or 0). For high-energy collisions, decays and photon scattering this procedure is much faster than listing energy and momentum equations one by one, and it is less likely to omit terms.

**Inverse Compton scattering: energy transferred backwards.** If the incident photon is of low energy (for example a cosmic microwave background photon of about $6\times10^{-4}\ \text{eV}$) and the electron is relativistic ($\gamma \gg 1$), energy flows from the electron to the photon in the collision. For a head-on collision the final photon energy is about $E' \approx 4\gamma^2E$ (Thomson regime, requiring $4\gamma E \ll m_0c^2$). With $\gamma = 10^4$ the amplification is $4\times10^8$, enough to lift a microwave photon into the X-ray band—exactly the astrophysical significance of inverse Compton scattering in active galactic nuclei and X-ray binaries. The same Compton formula shows forward scattering draining photon energy and inverse scattering boosting it; the direction is decided by "who carries more energy", and both statements follow from four-momentum conservation—the reader need only replace $P^{\mu}$ in steps one and two by that of a moving electron.

## 13. Self-check List

Six questions for self-examination: can you write the interval in the $(+,-,-,-)$ convention and explain the meaning of each sign? Can you verify from $\Lambda^{\mathrm{T}}\eta\Lambda = \eta$ that the Lorentz transformation preserves the metric? Can you explain why $U^{\mu}U_{\mu} = c^2$ holds for every particle? Can you derive the Compton formula in one step with $P^{\mu}P_{\mu}$? Can you explain what it means that the squared modulus of a photon's four-momentum vanishes? Can you translate freely between the $c = 1$ and explicit-$c$ styles? Pass all six and the four-dimensional language has become second nature.`,
  },

  'em-relativity': {
    chapter: 'Chapter 7 Relativistic Electrodynamics',
    title: 'Unification of the Electromagnetic Field',
    summary:
      'Electric and magnetic fields transform into each other under the Lorentz transformation; the field tensor and the four-potential reveal that the two are faces of one entity, and magnetism is a relativistic effect of electricity.',
    keyPoints: [
      'The field tensor $F^{\\mu\\nu}$ unifies the six components of the electric and magnetic fields into an antisymmetric tensor',
      'The field transformation formulas show that $\\mathbf{E}$ and $\\mathbf{B}$ convert into each other with the frame; no absolute "pure electric field" exists',
      'The four-potential $A^{\\mu}=(\\phi/c,\\mathbf{A})$ and the Lorentz gauge $\\partial_{\\mu}A^{\\mu}=0$ make the potential equation covariant',
      'For a uniformly moving point charge the electric field is enhanced transversely, and along the direction of motion $\\mathbf{B}=\\mathbf{v}\\times\\mathbf{E}/c^2$',
      'Maxwell’s equations are intrinsically relativistic; the constancy of light speed follows from the internal structure of electromagnetic theory',
    ],
    content: String.raw`

Historically, relativity was born out of the conflict between electrodynamics and Newtonian mechanics. Maxwell's equations predict that electromagnetic waves propagate at $c=1/\sqrt{\mu_0\varepsilon_0}$—relative to what? Under the Galilean transformation the equations take different forms in different inertial frames, so there ought to be a special "ether frame" in which alone the speed of light is $c$. Michelson–Morley refuted the ether, and Einstein asserted instead: Maxwell's equations have the same form in all inertial frames, and the constancy of light speed is their corollary. This chapter's task is to make that statement fully explicit: how the electric and magnetic fields transform with the frame, and why "magnetism is a relativistic effect of electricity".

## 2. The Electromagnetic Field Tensor

The three components of $\mathbf{E}$ and the three of $\mathbf{B}$, six numbers in all, fit neatly into an antisymmetric second-rank tensor in four-dimensional spacetime:

$$F^{\mu\nu} = \begin{pmatrix} 0 & -E_x/c & -E_y/c & -E_z/c\\ E_x/c & 0 & -B_z & B_y\\ E_y/c & B_z & 0 & -B_x\\ E_z/c & -B_y & B_x & 0\end{pmatrix}$$

(textbooks differ slightly in units and signs; the physics is the same.) Why can the electric and magnetic fields be assembled into one tensor? Because under the Lorentz transformation $F^{\prime\mu\nu}=\Lambda^{\mu}_{\ \alpha}\Lambda^{\nu}_{\ \beta}F^{\alpha\beta}$ the time–space mixed components (that is $\mathbf{E}$) and the space–space components (that is $\mathbf{B}$) mix with each other—just as, under a rotation of coordinates, the $x$ component of a three-vector leaks into the $y$ component. The tensor form shows that **the electric and magnetic fields are not two independent fields but different components of one electromagnetic field**; what you see as a pure electric field in frame $S$ appears as electric plus magnetic field in the relatively moving frame $S^{\prime}$.

## 3. Field Transformation Formulas

Expanding the tensor transformation above gives the rules for transforming the fields. Let $S^{\prime}$ move with velocity $\mathbf{v}$ relative to $S$, and decompose the fields into parts parallel and perpendicular to $\mathbf{v}$:

$$\mathbf{E}^{\prime}_{\parallel} = \mathbf{E}_{\parallel},\qquad \mathbf{B}^{\prime}_{\parallel} = \mathbf{B}_{\parallel}$$

$$\mathbf{E}^{\prime}_{\perp} = \gamma\left(\mathbf{E}_{\perp} + \mathbf{v}\times\mathbf{B}\right),\qquad \mathbf{B}^{\prime}_{\perp} = \gamma\left(\mathbf{B}_{\perp} - \frac{\mathbf{v}\times\mathbf{E}}{c^2}\right)$$

The parallel components are unchanged, while the perpendicular ones mix with $\gamma$ and convert into each other. Two important extreme cases: first, if $S$ contains only a magnetic field ($\mathbf{E}=0$), then in $S^{\prime}$ there appears an electric field $\mathbf{E}^{\prime}_{\perp}=\gamma\,\mathbf{v}\times\mathbf{B}$—the motional emf produced by a moving conductor in a magnetic field is, seen from the conductor's rest frame, this induced electric field driving the charges; the two explanations merge under relativity. Second, in the low-speed limit $\gamma\approx1$ and the transformation reduces to $\mathbf{E}^{\prime}\approx\mathbf{E}+\mathbf{v}\times\mathbf{B}$, $\mathbf{B}^{\prime}\approx\mathbf{B}-\mathbf{v}\times\mathbf{E}/c^2$.

There is also a useful invariant: $F^{\mu\nu}F_{\mu\nu}=2(B^2-E^2/c^2)$ is the same in all inertial frames. If in some frame $B^2>E^2/c^2$, then a frame can always be found in which the electric field vanishes (pure magnetic field), and conversely. Whether the electric or the magnetic field is larger has no absolute meaning; the invariant is the "true body".

## 4. Four-potential and Gauge

The scalar potential $\phi$ and vector potential $\mathbf{A}$ combine into the four-potential

$$A^{\mu} = \left(\frac{\phi}{c},\; \mathbf{A}\right)$$

The field strengths come from derivatives of the potential: $F^{\mu\nu}=\partial^{\mu}A^{\nu}-\partial^{\nu}A^{\mu}$ (in three-dimensional language $\mathbf{E}=-\nabla\phi-\partial\mathbf{A}/\partial t$, $\mathbf{B}=\nabla\times\mathbf{A}$). The potential has a gauge freedom: $A^{\mu}\to A^{\mu}+\partial^{\mu}\chi$ leaves the field unchanged. Using it one may choose the **Lorentz gauge** $\partial_{\mu}A^{\mu}=0$ (that is $\nabla\cdot\mathbf{A}+\frac{1}{c^2}\partial\phi/\partial t=0$), in which the potential in vacuum satisfies the wave equation

$$\Box A^{\mu} = \partial_{\nu}\partial^{\nu}A^{\mu} = 0$$

where $\Box\equiv\frac{1}{c^2}\partial^2/\partial t^2-\nabla^2$ is the d'Alembertian, itself a Lorentz invariant. Hence the electromagnetic potential propagates at exactly $c$, and the equation is covariant—the constancy of light speed emerges naturally from within electromagnetic theory. Charge and current are equally covariant: $\rho$ and $\mathbf{J}$ combine into the four-current $J^{\mu}=(c\rho,\mathbf{J})$, and charge conservation reads $\partial_{\mu}J^{\mu}=0$. An intriguing corollary: volume changes through length contraction while charge is invariant, so a neutral conductor at rest becomes charged in another frame—the presence of net charge is also relative.

## 5. Magnetism as a Relativistic Effect of Electricity

This statement is no exaggeration and can be seen with a simple estimate. Consider two parallel current-carrying wires: in the laboratory frame the wires are neutral but carry current, and the moving electrons feel a magnetic force $F=qvB$ toward or away from the wire. Change to the frame moving with the electrons: the positive ions in the wire recede at $-v$ and, because of length contraction, their linear density increases while that of the electrons decreases, so the wire acquires a net charge, and the electrons feel the **electrostatic Coulomb force** of this net charge. The forces computed in the two frames (multiplied by the appropriate $\gamma$) are strictly equal—the magnetic force is merely the Coulomb force seen from a different viewpoint, and the dimensional difference between $B$ and $E$ by one power of $v$ exactly reflects the $c^2$ conversion.

Take a uniformly moving point charge as a further example. A charge at rest has only the spherically symmetric Coulomb field $\mathbf{E}=q\hat{\mathbf{r}}/(4\pi\varepsilon_0 r^2)$; when it moves uniformly at $v$, the field transformation gives: along the direction of motion the field weakens to $E_{\parallel}=E_0(1-\beta^2)$, perpendicular to it the field strengthens to $E_{\perp}=\gamma E_0$, and the field lines are compressed into a "pancake" perpendicular to the velocity; at the same time there accompanies a magnetic field $\mathbf{B}=\mathbf{v}\times\mathbf{E}/c^2$. As $v\to c$ the electric field concentrates almost entirely in the transverse plane—the energy radiated by a charged particle in synchrotron radiation is concentrated forward as a direct consequence of this geometry.

## 6. The Covariant Form of Maxwell's Equations

Packing $\mathbf{E}$ and $\mathbf{B}$ into $F^{\mu\nu}$ and the sources into $J^{\mu}$, Maxwell's equations contract into two:

$$\partial_{\mu}F^{\mu\nu} = \mu_0 J^{\nu},\qquad \partial_{[\lambda}F_{\mu\nu]} = 0$$

The first comprises the four sourced equations (Gauss's law and the Ampère–Maxwell law), the second the four source-free ones (Gauss's law for magnetism and Faraday's law); $\partial_{[\lambda}F_{\mu\nu]}=0$ is equivalent to the existence of $F^{\mu\nu}=\partial^{\mu}A^{\nu}-\partial^{\nu}A^{\mu}$. Four equations become two, and each is an equality between four-vectors and tensors, so covariance is self-evident. This also answers the suspense of Chapter 1: Maxwell's equations need no modification to accommodate relativity—they were relativistic from birth; it is Newtonian mechanics that had to be rebuilt. The Lorentz force can also be written covariantly as $f^{\mu}=qF^{\mu\nu}U_{\nu}$, whose spatial part is $\mathbf{F}=q(\mathbf{E}+\mathbf{u}\times\mathbf{B})$ and whose time part gives the power $q\mathbf{E}\cdot\mathbf{u}$ (the magnetic field does no work); the accounts of energy and force balance automatically in four dimensions.

## 7. Summary and Extensions

This chapter closes the loop of the course: relativity arose from the conflict between electromagnetism and mechanics, and finally rewrote electromagnetism more concisely and elegantly. Three core statements: the electric and magnetic fields combine into the field tensor $F^{\mu\nu}$, and the transformation formulas are the component expansion of a tensor transformation; charge–current and the electromagnetic potential each form a four-vector, and Maxwell's equations become two covariant equations; the constancy of light speed is an intrinsic property of electromagnetic theory. Two directions of extension: first, electrodynamics of moving media (magnetohydrodynamics, plasma physics) makes heavy use of the field transformation formulas; second, replacing Minkowski spacetime by a curved one and keeping $F^{\mu\nu}$ covariant under a curved metric leads to general relativity and gravitoelectromagnetism. Readers are advised to do two things after class: derive the field distribution of a uniformly moving point charge and draw the field lines; redo the "force on a charge in a moving wire" calculation in two frames with the field transformation formulas, and appreciate the power of invariants and covariance. At this point the whole main content of special relativity is in place: two axioms, one set of transformations, one geometry, and one unified electromagnetic field.

## 8. Extension: Doppler Effect and Aberration of Electromagnetic Waves

Field transformations and the four-wave-vector are powerful tools for light propagation. Writing the phase of light as the four-scalar $\varphi=k_{\mu}x^{\mu}$, the four-wave-vector $k^{\mu}=(\omega/c,\mathbf{k})$ is automatically covariant; applying the Lorentz transformation for an observer moving at $v$ immediately gives $\omega^{\prime}=\gamma\omega(1-\beta\cos\theta)$—the general form of the Doppler formula, reducing to $\nu^{\prime}=\nu_0\sqrt{(1-\beta)/(1+\beta)}$ for longitudinal recession and giving a pure time-dilation red shift $\nu^{\prime}=\nu_0/\gamma$ transversely ($\theta=90^{\circ}$). The same step also gives aberration: $\cos\theta^{\prime}=(\cos\theta-\beta)/(1-\beta\cos\theta)$, that is, the direction of a celestial body seen by a moving observer crowds toward the direction of motion—an astronaut on a fast ship would see the stars squeezed into a small patch ahead. Both effects are basic tools in astronomical observation (annual aberration of stars, apparent superluminal motion of relativistic jets) and in the design of synchrotron light sources.

## 9. Unifying Energy, Momentum and Stress

The final layer of unification in the four-dimensional formalism is the energy–momentum tensor $T^{\mu\nu}$: the energy density of the electromagnetic field, its momentum density $\mathbf{g}=\mathbf{S}/c^2$ (the Poynting vector), the energy flux and the Maxwell stress tensor—sixteen components in all—fit into one symmetric tensor. Energy conservation and momentum conservation merge into $\partial_{\mu}T^{\mu\nu}=0$, said in one sentence. The profundity of this object is that in general relativity it is precisely the source of gravity. In this sense the chapter completes the most important conceptual shift of the course: once all conservation laws and field equations are written as "four-dimensional tensor equations", the frame retreats into the background and the physical content (invariants and covariant equations) steps forward. From Faraday's lines of force to Maxwell's equations, to Minkowski's four-dimensional spacetime, to $F^{\mu\nu}$ and $T^{\mu\nu}$, every step of abstraction in electrodynamics bought a unified vision; following this road further leads to gauge field theory and the language of modern physics.

## 10. Study Roadmap and Self-check List

With this chapter, the main trunk of special relativity is complete. Check yourself against the following list: can you write the matrix of the electromagnetic field tensor and point out which components $\mathbf{E}$ and $\mathbf{B}$ occupy? Can you use the field transformations to explain the equivalent descriptions, in two frames, of "the force on a moving charge in a current-carrying wire"? Can you re-derive the Doppler effect and aberration with the four-wave-vector? Can you explain why Maxwell's equations are relativistic without modification? Can you explain accurately the sentence "magnetism is a relativistic effect of electricity" (the electric and magnetic fields convert into each other with the frame, the tensor is the entity, and neither is invariant)? If any item fails, return to the corresponding section, reread and derive by hand. The signposts ahead are also set: replacing the flat metric $\eta_{\mu\nu}$ by a curved metric $g_{\mu\nu}$ and ordinary derivatives by covariant derivatives gives general relativity; generalizing the gauge symmetry of the electromagnetic field gives gauge field theory. Walk into the next course with four-dimensional eyes, and you will find you already speak the mother tongue of modern physics.

## 11. Full Solutions of Two Classic Problems

Problem one: motional emf of a moving conductor. A rod of length $L$ translates at speed $v$ perpendicular to a magnetic field $\mathbf{B}$. In the laboratory frame the charges in the rod feel the Lorentz force $qvB$ and accumulate at one end, creating an electrostatic field; at equilibrium the potential difference between the ends is the emf $\mathcal{E}=vBL$. Change to the rod's rest frame: part of the magnetic field transforms into an electric field $E^{\prime}\approx vB$, and the same emf arises from the action of this field on the charges in the stationary rod; both frames give the same emf, differing only in the attribution of power and the explanation of the energy source—this pair of explanations was long regarded as two different mechanisms, and relativity reveals their identity. Problem two: the magnetic field of a moving charge. A point charge $q$ moves uniformly at $\mathbf{v}$; the field transformation gives its accompanying magnetic field $\mathbf{B}=\mathbf{v}\times\mathbf{E}/c^2$; at low speed, substituting $E\approx q/(4\pi\varepsilon_0r^2)$ reproduces exactly the Biot–Savart law for a uniformly moving charge—magnetostatics turns out to be electrostatics after one Lorentz transformation. The common lesson of both problems deserves remembering: whenever "electricity and magnetism look like two different things", change the frame and you will see they are one. With this, the seven lectures of the course are complete: from two clouds to two axioms, from transformations to geometry, from dynamics to the four-dimensional formalism, and finally back to the unification of electromagnetism. May this "invariant-centred" way of thinking become your starting point for all modern physics to come.`,
  },
};

export default map;
