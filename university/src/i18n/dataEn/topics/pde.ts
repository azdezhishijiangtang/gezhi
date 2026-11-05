import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'typical-pde': {
    chapter: 'Chapter 1 Typical Equations and Definite Problems',
    title: 'Three Typical Equations and Definite Problems',
    summary:
      'Wave, heat, harmonic — three equations underpin classical mathematical physics. Look at the physical prototypes first, then write the definite conditions.',
    content: String.raw`

In summer you push one end of a metal rod into a fire: how long before the other end burns your hand? Pluck a guitar string: how does the waveform race toward both ends? Put a constant-temperature source into a still pond: once everything has settled, what shape does the temperature field take? These three everyday questions point respectively to the three most famous equations of partial differential equations: the heat equation, the wave equation and the Laplace equation. They are called the "three typical equations", and they are the starting point of all of classical mathematical physics — and of the entire PDE course.

In the early nineteenth century Fourier studied heat flow, d'Alembert and Euler studied vibrating strings, and Laplace studied gravitational potential, arriving one after another at these three equations. Curiously: physical phenomena differ enormously, yet a second-order linear PDE has only three essentially different types. More importantly, they describe three utterly different "modes of information propagation": in the wave equation a disturbance advances at finite speed, so you can catch up with it or dodge it; in the heat equation heat seems to spread through the whole domain instantly, yet decays rapidly and smooths the details away; the harmonic equation has no time variable and describes the equilibrium state after everything has fallen silent. Grasp these three equations and you hold the skeleton of classical mathematical physics.

The task of this topic is to put the three equations on the same table: see the physical prototypes clearly, write the mathematical forms clearly, supply the definite conditions, and answer one fundamental question — when is a definite problem "well posed"? The following chapters on heat, wave and harmonic equations each unfold this framework in turn, while the method of characteristics handles another family, first-order equations; together they complete the picture of undergraduate PDEs.

## 2. Rigorous Definitions

Start with the one-dimensional model, letting $u(x,t)$ or $u(x,y)$ be the unknown function.

**Wave equation** (vibrating string, sound, electromagnetic waves):

$$\frac{\partial^2 u}{\partial t^2} = a^2 \frac{\partial^2 u}{\partial x^2}$$

**Heat equation** (diffusion, heat transfer):

$$\frac{\partial u}{\partial t} = a^2 \frac{\partial^2 u}{\partial x^2}$$

**Harmonic (Laplace) equation** (steady temperature field, electrostatic field, incompressible irrotational flow):

$$\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0$$

Unified $n$-dimensional notation: $\Delta u = \dfrac{\partial^2 u}{\partial x_1^2} + \cdots + \dfrac{\partial^2 u}{\partial x_n^2}$, called the Laplacian. Then the heat equation reads $u_t = a^2\Delta u$, the wave equation $u_{tt} = a^2\Delta u$, and the harmonic equation $\Delta u = 0$. The constant $a$ is the propagation speed (waves) or the thermal diffusivity, fixed by the material.

A PDE together with suitable **definite conditions** constitutes a complete problem. The conditions fall into two classes:

1. **Initial conditions** (required for evolution equations): the state at $t = 0$ is given, $u(x,0) = \varphi(x)$. The wave equation contains a second-order time derivative, so an initial velocity $u_t(x,0) = \psi(x)$ is also needed; the heat equation needs only one initial function.
2. **Boundary conditions** (required on bounded domains): prescribed on the spatial boundary $\partial\Omega$, in three kinds:
   - **First kind (Dirichlet) condition**: $u|_{\partial\Omega} = g$, directly giving the function values on the boundary — e.g. a string fixed at both ends, or a prescribed boundary temperature;
   - **Second kind (Neumann) condition**: $\dfrac{\partial u}{\partial n}\big|_{\partial\Omega} = g$, giving the normal rate of change — e.g. a prescribed heat flux at an endpoint, or thermal insulation (value zero);
   - **Third kind (Robin) condition**: $\alpha u + \beta \dfrac{\partial u}{\partial n} = g$, a linear combination of the function value and the normal derivative, describing heat exchange with the outside according to Newton's law of cooling.

Only the Cauchy problem (initial data on all space), the mixed problem (bounded domain plus boundary values), or the pure boundary-value problem is "just right"; only then can a solution exist and be unique.

## 3. Why Defined This Way

**Why do the orders of the time derivative differ?** The order is dictated by physics. A string follows Newton's second law: mass times acceleration equals the restoring force, and acceleration is $u_{tt}$, hence the wave equation with a second-order time derivative. Heat conduction comes from conservation of energy: the rate of change of the heat in a small segment of rod equals the difference of the heat fluxes entering and leaving; the rate of change of heat is $u_t$ (first order), while the flux is proportional to the temperature gradient $u_x$ by Fourier's law, so a first-order time derivative pairs with a second-order space derivative, giving $u_t = a^2 u_{xx}$. The order is not a mathematician's whim but a faithful translation of physics.

**Why do evolution equations need initial data?** Time is one-dimensional and one-way: knowing the complete state at $t = 0$, the equation as a "rule of state evolution" can in principle determine any later instant. The state of the heat equation is one function $\varphi(x)$; the state of the wave equation is two functions, $\varphi(x)$ (displacement) and $\psi(x)$ (velocity), because a second-order time derivative needs two pieces of initial data to determine a trajectory. This is exactly like the ODE $y'' = F(t, y, y')$ needing both $y(t_0)$ and $y'(t_0)$.

**Why does the harmonic equation need no initial data?** It has no time variable; it describes not evolution but equilibrium. Here the state of the whole domain is determined uniquely by the boundary data, so it is paired with a boundary-value problem. Imposing an "initial condition" on it would raise the question of where to impose it — there is no time axis.

**Why are boundary conditions split into three classes?** Because physically "what happens at the boundary" has three typical forms: the boundary temperature is clamped (first kind), the boundary heat flux is prescribed (second kind), or the boundary exchanges heat with the outside by Newton's law (third kind). The three classes match three engineering questions and each guarantees well-posedness in the corresponding function space.

**Why classify equations by type?** For a general second-order linear equation

$$Au_{xx} + 2Bu_{xy} + Cu_{yy} + \cdots = 0$$

the discriminant is $\Delta = B^2 - AC$ (isomorphic to the discriminant of a conic): $\Delta > 0$ is **hyperbolic** (wave), $\Delta = 0$ is **parabolic** (heat), $\Delta < 0$ is **elliptic** (harmonic). Check the three typical equations: in the wave equation $u_{tt} - a^2 u_{xx} = 0$, treating $t$ as the second variable gives $A = 1$, $B = 0$, $C = -a^2$, so $\Delta = a^2 > 0$ — hyperbolic; in the harmonic equation $u_{xx} + u_{yy} = 0$, $\Delta = 0 - 1 = -1 < 0$ — elliptic; the heat equation pairs a first-order time derivative with a second-order space derivative and counts as parabolic. The type determines the whole character of the solution: hyperbolic equations have characteristics and finite propagation speed, parabolic ones have infinite propagation speed and a smoothing effect, elliptic ones satisfy the maximum principle. Classifying is the first step of any problem.

**Why require linearity?** In the three typical equations the unknown and its derivatives all appear to the first power. Linearity brings the **superposition principle**: if $u_1, u_2$ are solutions, so is $c_1 u_1 + c_2 u_2$. This breaks a complicated problem into simple "modes" that are then reassembled, and it is the common foundation of the Fourier method and the Green's function method. The real world is full of nonlinear equations (Burgers' equation, the equations of fluid flow) far beyond this framework, but that is already the deep water of modern PDE theory.

## 4. Intuition and Pictures

Lay the three equations side by side in one table and their characters are obvious at a glance:

| Feature | Wave equation | Heat equation | Harmonic equation |
|---|---|---|---|
| Type | Hyperbolic | Parabolic | Elliptic |
| Time derivative | Second order $u_{tt}$ | First order $u_t$ | None |
| Propagation speed | Finite ($a$) | Infinite (instantaneous) | None (equilibrium) |
| Character | Oscillates back and forth, keeps the waveform | Smooths away details, tends to smoothness | No hot spots inside, determined by the boundary |
| Typical phenomena | Strings, sound, light | Heat conduction, diffusion | Steady temperature, electrostatic field |

The wave equation is like a messenger: an initial "bump" races left and right at speed $a$, reflects off the boundary and comes back; energy is conserved and the oscillation never stops. The solution at $(x_0, t_0)$ depends only on the initial interval $[x_0 - at_0, x_0 + at_0]$, called the **domain of dependence**; conversely the influence of a single initial point is confined to a cone of half-angle 45 degrees, the **domain of influence**. Information propagation has a definite "horizon"; action at a distance does not exist.

The heat equation is like a peacemaker: even if the initial temperature is a spike, an instant later the temperature is positive everywhere along the rod (infinite propagation speed), but the spike flattens rapidly and the high-frequency details decay exponentially like $e^{-a^2 n^2 t}$, tending to the mean temperature or a steady distribution after a long time. Reverse the sign of time, $t \to -t$: the equation can still be written formally, but physically it corresponds to the impossible process of "heat spontaneously gathering into a spike" — the heat equation is essentially irreversible.

The harmonic equation is like a frozen relief: there is no time; the boundary values, like a mould, cast the interior completely. The value at any interior point equals the average over a surrounding circle; the hottest and coldest points can only lie on the boundary, and the interior must be "mild". The electrostatic field, the equilibrium shape of an elastic membrane, and the flow field of a source-free irrotational fluid are all its incarnations.

> Intuitive memory: the wave is the "memory master" (it even remembers the initial velocity), heat is the "amnesiac old man" (it forgets the details), and the harmonic equation is the "puppet of the boundary" (it obeys the boundary completely).

## 5. Worked Examples

### Example 1 (Basic: Classifying an Equation)

Problem: Classify the equation $u_{xx} + u_{xy} - 2u_{yy} + 3u_x = 0$ and say which kind of physical phenomenon it corresponds to.

Analysis: Compare coefficients with the general form $Au_{xx} + 2Bu_{xy} + Cu_{yy} + \cdots = 0$; lower-order terms do not affect the type.

Solution: $A = 1$, $2B = 1$ so $B = \dfrac{1}{2}$, $C = -2$. Compute the discriminant

$$\Delta = B^2 - AC = \left(\frac{1}{2}\right)^2 - 1 \times (-2) = \frac{1}{4} + 2 = \frac{9}{4} > 0$$

Since $\Delta > 0$ the equation is of **hyperbolic** type, corresponding to wave-like phenomena. Information propagating along the two characteristic families $y = 2x + c$ and $y = -x + c$ does not interfere; a change of variables reduces it to the standard form of the wave equation.

Comment: The type is determined solely by the coefficients of the second-order principal part. It is no coincidence that the test is isomorphic to the discriminant of a conic — both come from the sign classification of a quadratic form.

### Example 2 (Intermediate: Writing a Definite Problem)

Problem: A soft thin string of length $L$ is fixed at $x = 0$ and $x = L$. At the initial instant the string is plucked into the shape $\varphi(x)$ and given a transverse initial velocity $\psi(x)$. Write the complete definite problem for the vibration and explain the physical meaning of each condition.

Analysis: Small transverse vibrations of the string satisfy the wave equation; "fixed at both ends" is a Dirichlet boundary condition; the initial shape and initial velocity are the two initial conditions.

Solution: Let $u(x,t)$ be the transverse displacement at $x$ at time $t$; then

$$
\begin{cases}
u_{tt} = a^2 u_{xx}, & 0 < x < L,\ t > 0,\\
u(0,t) = u(L,t) = 0, & t \ge 0,\\
u(x,0) = \varphi(x), & 0 \le x \le L,\\
u_t(x,0) = \psi(x), & 0 \le x \le L
\end{cases}
$$

where $a^2 = \dfrac{T}{\rho}$, $T$ is the tension and $\rho$ the linear density. The first line is the physical law (Newton's second law); the second line says both ends are fixed and the string cannot leave its supports; the third and fourth lines give the complete state at $t = 0$ — with only the displacement and no velocity one cannot determine the subsequent motion, exactly why a second-order time derivative needs two pieces of initial data.

Comment: Definite conditions are not "the more the better" but "just right": one boundary value at each end (a first-order spatial derivative needs one condition per end), plus two initial values (a second-order time derivative needs two). Giving more overdetermines the problem (generally no solution); giving fewer underdetermines it (the solution is not unique).

### Example 3 (Advanced: Proving Uniqueness by the Energy Method)

Problem: Let $u_1, u_2$ both solve the heat problem $u_t = a^2 u_{xx}$ ($0 < x < L$, $t > 0$), $u(0,t) = u(L,t) = 0$, $u(x,0) = \varphi(x)$. Prove $u_1 \equiv u_2$.

Analysis: The difference $w = u_1 - u_2$ satisfies the homogeneous equation, homogeneous boundary values and homogeneous initial value. Construct the "energy" $E(t) = \dfrac{1}{2}\displaystyle\int_0^L w^2\,dx$ and prove it vanishes identically.

Solution: Subtracting the equations, boundary values and initial values gives $w_t = a^2 w_{xx}$, $w(0,t) = w(L,t) = 0$, $w(x,0) = 0$. Differentiate $E(t)$ and integrate by parts:

$$E'(t) = \int_0^L w w_t\,dx = a^2\int_0^L w w_{xx}\,dx = a^2\Big[ w w_x \big|_0^L - \int_0^L w_x^2\,dx \Big]$$

By the homogeneous boundary values $w(0,t) = w(L,t) = 0$ the boundary term $w w_x \big|_0^L = 0$, so

$$E'(t) = -a^2\int_0^L w_x^2\,dx \le 0$$

hence $E(t)$ is non-increasing. Also $E(0) = \dfrac{1}{2}\displaystyle\int_0^L w(x,0)^2\,dx = 0$ and $E(t) \ge 0$, so $E(t) \equiv 0$, hence $w \equiv 0$, that is $u_1 \equiv u_2$.

Comment: The trap here is that the energy must be chosen just right — take $\int w^2$ rather than $\int (w_t^2 + w_x^2)$, because the heat equation has only a first-order time derivative and no kinetic term. For the wave equation the same method gives conservation ($E'(t) = 0$) rather than decay, which is the mathematical portrait of the "memory versus amnesia" character of the two types. The method also proves stability: a small perturbation of the initial data only produces a decaying perturbation of the solution.

## 6. Common Mistakes and Pitfalls

1. **Confusing the forms of the three equations.** Writing the heat equation as $u_{tt} = a^2 u_{xx}$ (one order too many in time), or the wave equation as $u_t = a^2 u_{xx}$. Anchor: Newton's second law gives second order (acceleration), conservation of energy gives first order (rate of change). A wrong form sends the whole problem in the wrong direction.

2. **Giving the wave equation only one initial condition.** Writing only $u(x,0) = \varphi(x)$ without $u_t(x,0)$ is like predicting motion from position alone without velocity. A second-order time derivative must be paired with two pieces of initial data.

3. **Imposing initial conditions on the harmonic equation.** $\Delta u = 0$ together with $u(x,0) = \varphi(x)$ is meaningless — the equation has no time variable, so there is no "initial". Elliptic equations take boundary-value problems.

4. **Including lower-order terms when classifying.** The type depends only on $A, B, C$ of the second-order principal part; lower-order terms do not affect the sign of $\Delta = B^2 - AC$, only the detailed shape of the characteristic structure.

5. **Mismatching boundary conditions and the equation.** On a domain with only first-kind conditions, forcing both $u$ and $\partial_n u$ overdetermines the problem (generally no solution); an evolution problem with no boundary condition at all is underdetermined (the solution is not unique). The number of conditions is fixed by the order of the equation together with the shape of the boundary.

## 7. Summary and Mnemonics

Key points to review:

- Three typical equations: wave $u_{tt} = a^2\Delta u$ (hyperbolic), heat $u_t = a^2\Delta u$ (parabolic), harmonic $\Delta u = 0$ (elliptic); their physical sources are Newton's second law, conservation of energy, and equilibrium.
- Definite conditions: evolution equations take initial data (two for the wave, one for heat); boundary conditions come in Dirichlet, Neumann and Robin kinds.
- Classify with $\Delta = B^2 - AC$: positive hyperbolic, zero parabolic, negative elliptic.
- Linear ⇒ superposition, the ground on which both separation of variables and Green's functions stand.
- The three questions of well-posedness: existence, uniqueness, stability — the acceptance test for any definite problem.

**Mnemonic: Waves are second order and remember velocity; heat is first order and smooths things out; harmonic has no time and listens to the boundary; the sign of the discriminant fixes the type.**`,
    keyPoints: [
      'Hyperbolic (wave) / parabolic (heat) / elliptic (harmonic): classify by the sign of the second-order terms',
      'Evolution equations take initial data; steady fields take boundary data',
      'Well-posedness = existence + uniqueness + stability',
      'The solution space of a linear equation is a vector space; superposition is the foundation of separation of variables',
    ],
  },

  'fourier-separation': {
    chapter: 'Chapter 2 Fourier Series and Separation of Variables',
    title: 'Fourier Series and the Method of Separation of Variables',
    summary:
      'Break a function into sine and cosine "LEGO bricks" — any signal can be decomposed; this is the engine of separation of variables.',
    content: String.raw`

The spectrum dancing on an audio equalizer, a voice clip compressed into a few dozen numbers on your phone, the harmonic analysis of an ECG in a hospital — the common core of all these technologies is one mathematical fact: any "well-behaved" function can be decomposed into a superposition of sines and cosines. In 1807, when Fourier announced this bold conjecture to the Paris Academy, Lagrange objected on the spot, arguing that a discontinuous function could not possibly be expanded in trigonometric functions. History sided with Fourier, but the questions the dispute left behind — which functions can be expanded, does the expansion converge, and to what — took the whole nineteenth century to settle completely.

Why decompose into sines and cosines? Because they are the "eigenfunctions" of linear differential operators: differentiating twice merely multiplies by a constant $-\lambda$. So once a PDE is expanded in a Fourier series it turns into a pile of mutually independent algebraic problems, each frequency solved separately and then superposed back. This is precisely the engine of separation of variables, and the theme of this chapter: first make the bricks, then build the house with them.

## 2. Rigorous Definitions

Let the function system $\Big\{1,\ \cos\frac{n\pi x}{L},\ \sin\frac{n\pi x}{L}\Big\}_{n \ge 1}$ be defined on $[-L, L]$. Its **orthogonality** says: for $m \ne n$,

$$\int_{-L}^{L} \cos\frac{m\pi x}{L}\cos\frac{n\pi x}{L}\,dx = 0, \qquad \int_{-L}^{L} \sin\frac{m\pi x}{L}\sin\frac{n\pi x}{L}\,dx = 0$$

and the sine family and the cosine family are mutually orthogonal as well (the integral of a product of different functions is zero). The inner product of a function with itself is nonzero:

$$\int_{-L}^{L} \cos^2\frac{n\pi x}{L}\,dx = L, \qquad \int_{-L}^{L} \sin^2\frac{n\pi x}{L}\,dx = L$$

If $f$ is piecewise smooth on $[-L, L]$, it can be expanded in a **Fourier series**

$$f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty}\left( a_n \cos\frac{n\pi x}{L} + b_n \sin\frac{n\pi x}{L} \right)$$

The coefficient formulas (orthogonality used as a sieve):

$$a_n = \frac{1}{L}\int_{-L}^{L} f(x)\cos\frac{n\pi x}{L}\,dx, \qquad b_n = \frac{1}{L}\int_{-L}^{L} f(x)\sin\frac{n\pi x}{L}\,dx$$

On $[0, L]$ one may extend $f$ **oddly** to $[-L, L]$ (only sine terms survive, giving a sine series) or **evenly** (only cosine terms survive, giving a cosine series); the coefficients then become $\dfrac{2}{L}$ times the integral over $[0, L]$.

**The standard procedure of separation of variables** (taking the vibrating string as the example): set $u(x,t) = X(x)T(t)$, substitute into the equation and separate out a constant, solve the spatial eigenvalue problem with its boundary conditions, then superpose and fix the coefficients by orthogonal projection.

## 3. Why Defined This Way

**Why sines and cosines?** Because they are the solutions of the spatial part obtained by separating the vibrating-string equation, and they are the "purest single-frequency vibrations". More deeply: trigonometric polynomials are uniformly dense in the space of continuous functions — they are "numerous" enough to approximate any continuous function. This is the ground on which the legitimacy of Fourier expansion rests.

**Why do the coefficient formulas look like this?** Multiply both sides of the expansion by $\cos\frac{m\pi x}{L}$ and integrate; orthogonality washes the right-hand side clean and only the term with $m = n$ survives; divide both sides by $L$ and $a_n$ appears. The coefficient formula is not memorized, it is filtered out by orthogonality.

**Why the odd-looking $a_0/2$?** If $a_0$ is defined by the same formula ($\cos 0 = 1$, $\int_{-L}^{L} 1\,dx = 2L$), writing the constant term as $\dfrac{a_0}{2}$ makes it exactly consistent with the formula. This is a historical notation that unifies the computation of the constant and cosine terms.

**Why the "piecewise smooth" condition?** It is the classical sufficient condition: a continuous first derivative on each piece and only finitely many discontinuities of the first kind guarantee that the series converges to $f$ at continuity points and to the average of the one-sided limits at jumps. Without some smoothness the series may diverge everywhere — the expansion is not unconditional.

**Why talk about extensions on $[0, L]$?** A Fourier series is naturally defined on a symmetric interval $[-L, L]$. Problems on $[0, L]$ (such as a string fixed at both ends) need the left half "completed": choose an odd or even extension according to the physical symmetry, and the choice decides whether sines or cosines are used, which corresponds to the boundary conditions ($u(0) = 0$ pairs with sines, $u_x(0) = 0$ with cosines). Choose the wrong extension and the boundary conditions no longer match.

## 4. Intuition and Pictures

Think of a Fourier series as a "recipe for sound": $a_n, b_n$ are the doses of the $n$-th frequency ingredient. A smooth function has a rapidly decaying spectrum (few high-frequency components); a function with sharp corners has a slowly decaying spectrum (of order $1/n$) — the "smoothness" of a function and the "decay rate" of its coefficients are two sides of one coin.

The square wave is a good example for understanding discontinuities: its sine-series coefficients decay like $1/n$, and near the jump the partial sums of finitely many terms overshoot, and the more terms the more the overshoot settles at about $9\%$ of the jump — this is the **Gibbs phenomenon**. It is not a computational bug but the inevitable price of approximating a discontinuity with continuous functions: however hard a continuous partial sum tries, it cannot satisfy both sides of the jump at once.

> Intuition: a Fourier series is a piece of sandpaper — the finer the grit (the more terms), the closer the smooth part comes to the original function, but a small unclean "burr" (the Gibbs overshoot) always remains at the step.

The right/wrong comparison is also instructive:

| Practice | Correct? | Explanation |
|---|---|---|
| Any function can be expanded pointwise to itself | ✗ | Piecewise smoothness and other conditions are needed; at a jump the series converges to the average |
| More terms bring the partial sum closer to the original | ✗ | Near a jump the overshoot does not vanish (Gibbs) |
| Smooth ⇒ fast coefficient decay | ✓ | $C^k$ corresponds to order $1/n^k$ |
| Orthogonality can filter out the coefficients | ✓ | The essence of the coefficient formula |
| An odd extension automatically kills the cosine terms | ✓ | A direct consequence of symmetry |

## 5. Worked Examples

### Example 1 (Basic: Sine Expansion and the Leibniz Series)

Problem: Expand $f(x) = x$ on $(0, \pi)$ in a sine series and use it to obtain a series for $\dfrac{\pi}{4}$.

Analysis: Extend oddly on $[0, \pi]$ and use the sine coefficient formula with $L = \pi$. After the odd extension it suffices to integrate over $[0, \pi]$ and multiply by 2.

Solution: $b_n = \dfrac{2}{\pi}\displaystyle\int_0^{\pi} x\sin nx\,dx$. Integrate by parts:

$$\int_0^{\pi} x\sin nx\,dx = \Big[-\frac{x\cos nx}{n}\Big]_0^{\pi} + \frac{1}{n}\int_0^{\pi}\cos nx\,dx = -\frac{\pi\cos n\pi}{n} + 0 = -\frac{\pi(-1)^n}{n}$$

Hence

$$b_n = \frac{2}{\pi}\cdot\Big(-\frac{\pi(-1)^n}{n}\Big) = \frac{2(-1)^{n+1}}{n}$$

giving the sine series

$$x = 2\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}\sin nx, \qquad 0 < x < \pi$$

Set $x = \dfrac{\pi}{2}$; then $\sin\frac{n\pi}{2}$ is nonzero only for odd $n$ (with value $(-1)^{(n-1)/2}$), so

$$\frac{\pi}{2} = 2\Big(1 - \frac{1}{3} + \frac{1}{5} - \cdots\Big), \qquad \text{i.e.} \qquad \frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \cdots$$

which is precisely the Leibniz series — one of the most beautiful results in mathematical analysis.

Comment: The odd extension automatically kills the cosine terms, which is why the choice of extension matters so much for $[0, L]$ problems. Taking $x = \pi/2$ is a clever shortcut: the even terms all vanish there, reducing the infinite series to an alternating series of reciprocals of odd numbers.

### Example 2 (Intermediate: Solving the Vibrating String by Separation of Variables)

Problem: Solve $u_{tt} = a^2 u_{xx}$ ($0 < x < L$, $t > 0$), $u(0,t) = u(L,t) = 0$, $u(x,0) = \varphi(x)$, $u_t(x,0) = \psi(x)$.

Analysis: Five steps of separation of variables: assume a product solution, separate the constant, solve the eigenvalue problem, solve the time problem, superpose and fix the coefficients.

Solution: Step one, set $u = X(x)T(t)$; substituting gives $X T'' = a^2 X'' T$; divide both sides by $a^2 X T$:

$$\frac{T''}{a^2 T} = \frac{X''}{X} = -\lambda$$

The left side depends only on $t$ and the right side only on $x$, so both equal the same constant, written $-\lambda$.

Step two, solve the spatial problem $X'' + \lambda X = 0$, $X(0) = X(L) = 0$. The sign of $\lambda$ must be discussed: for $\lambda < 0$ the solution is exponential and no nonzero solution can vanish at both ends; for $\lambda = 0$ the solution is linear and again can only be zero; for $\lambda > 0$,

$$X = A\cos\sqrt{\lambda}\,x + B\sin\sqrt{\lambda}\,x$$

$X(0) = 0$ gives $A = 0$; $X(L) = 0$ gives $\sin\sqrt{\lambda}\,L = 0$, so $\sqrt{\lambda_n} = \dfrac{n\pi}{L}$. Eigenvalues $\lambda_n = \left(\dfrac{n\pi}{L}\right)^2$ and eigenfunctions $X_n = \sin\dfrac{n\pi x}{L}$.

Step three, the time problem $T_n'' + \lambda_n a^2 T_n = 0$ has solution

$$T_n = A_n\cos\frac{n\pi a t}{L} + B_n\sin\frac{n\pi a t}{L}$$

Step four, superpose and project with the initial conditions:

$$u = \sum_{n=1}^{\infty}\left(A_n\cos\frac{n\pi a t}{L} + B_n\sin\frac{n\pi a t}{L}\right)\sin\frac{n\pi x}{L}$$

From $u(x,0) = \varphi(x)$ we get $A_n = \dfrac{2}{L}\displaystyle\int_0^L \varphi(x)\sin\frac{n\pi x}{L}\,dx$; differentiating in $t$ and setting $t = 0$ gives $B_n\cdot\dfrac{n\pi a}{L} = \dfrac{2}{L}\displaystyle\int_0^L \psi(x)\sin\frac{n\pi x}{L}\,dx$, that is

$$B_n = \frac{2}{na\pi}\int_0^L \psi(x)\sin\frac{n\pi x}{L}\,dx$$

Comment: This problem is the epitome of the whole method. The most common loss of marks is in step two: writing the general solution without discussing $\lambda \le 0$ drops half of the solution space and leaves the eigenvalue set incomplete. The factor $\dfrac{n\pi a}{L}$ in $B_n$ in step four is also very easily forgotten.

### Example 3 (Advanced: Inhomogeneous Boundary and the Gibbs Phenomenon)

Problem: Solve $u_t = a^2 u_{xx}$ ($0 < x < L$), $u(0,t) = 0$, $u(L,t) = T_0$ (constant), $u(x,0) = 0$. Also explain what must be watched in numerical computation if the initial condition contains a jump.

Analysis: The boundary is inhomogeneous, so "prune" first: subtract a simple function satisfying the boundary values, shaving the boundary flat, and the remaining problem can be handled by separation of variables.

Solution: Let $u = v + \dfrac{T_0}{L}x$. Since $\dfrac{T_0}{L}x$ is linear, $\left(\dfrac{T_0}{L}x\right)_{xx} = 0$, so $v$ satisfies

$$v_t = a^2 v_{xx}, \qquad v(0,t) = v(L,t) = 0, \qquad v(x,0) = -\frac{T_0}{L}x$$

This is exactly a problem of the type in Example 2. After a long time $v \to 0$ (each mode decays exponentially), so

$$u \to \frac{T_0}{L}x$$

that is, a linear steady distribution. This agrees with physics: a rod at initial temperature 0, with the left end kept at 0 and the right end at $T_0$, has heat seeping from left to right and finally a linear temperature transition with constant heat flux.

If the initial value contains a jump (say $\varphi$ has different one-sided limits at $x_1$), its Fourier coefficients decay only like $1/n$, and summing finitely many terms produces an overshoot near the jump (the Gibbs phenomenon), of about $9\%$, which does not disappear as more terms are added. In engineering one either refines the grid or switches to another method near the jump; one cannot simply "add a few more terms".

Comment: The standard move for an inhomogeneous boundary is to subtract a simple function satisfying the boundary values; which one to choose is a free choice, and the simpler it is the simpler the initial condition for $v$. The Gibbs phenomenon reminds us that "formally convergent" and "usable in engineering" are two different things.

## 6. Common Mistakes and Pitfalls

1. **Mixing up the coefficient formulas.** Applying the $[-L, L]$ formula $a_n = \dfrac{1}{L}\displaystyle\int_{-L}^L$ verbatim to a $[0, L]$ problem. The sine (cosine) coefficients on $[0, L]$ are $\dfrac{2}{L}\displaystyle\int_0^L$. Root cause: after an odd (even) extension the integral over the original interval counts twice, while the prefactor in the formula is still $\dfrac{1}{L}$.

2. **Forgetting to check that $\lambda \le 0$ gives no solution.** Writing the general solution of $X'' + \lambda X = 0$ at once, assuming $\lambda > 0$. One must discuss: for $\lambda < 0$ the solution is exponential and cannot vanish at both ends; for $\lambda = 0$ it is linear and can only be zero. Skipping the discussion drops half of the solution space.

3. **Losing the factor when differentiating the time part during superposition.** To fix $B_n$ from $u_t(x,0) = \psi$ one must first differentiate $B_n\sin\frac{n\pi a t}{L}$ to get $B_n\dfrac{n\pi a}{L}$ and then project. Missing this factor makes $B_n$ off by $\dfrac{n\pi a}{L}$ and throws off the phase of every term.

4. **Taking the convergence value at a jump for the function value.** At a jump the Fourier series converges to $\dfrac{1}{2}[\varphi(x_0^+) + \varphi(x_0^-)]$, not to the value defined there. Be careful when substituting a discontinuous function numerically.

5. **Believing more terms always give more accuracy.** Under the Gibbs phenomenon the overshoot near a jump never vanishes; in engineering one should filter or refine the grid rather than blindly adding terms.

## 7. Summary and Mnemonics

Key points to review:

- Orthogonality is the sieve of the Fourier method; the coefficient formulas are filtered out by it.
- Five steps of separation of variables: set $u = XT$ → separate the constant → solve the eigenvalue problem (be sure to discuss $\lambda \le 0$) → solve the time problem → superpose and project.
- For $[0, L]$ problems choose the extension first: $u(0) = 0$ pairs with sines, $u_x(0) = 0$ with cosines.
- Homogenize an inhomogeneous boundary by pruning first; expand an inhomogeneous equation in eigenfunctions or use Duhamel's principle.
- Discontinuity ⇒ $1/n$ coefficient decay ⇒ Gibbs overshoot, the inherent price of continuous approximation to a discontinuity.

**Mnemonic: Orthogonality filters out the coefficients; separation of variables takes five steps; rule out negative eigenvalues first; Gibbs stays behind at the jumps.**`,
    keyPoints: [
      'Orthogonality lets you "project out" the Fourier coefficients',
      'Three steps of separation of variables: assume a separated form → solve the eigenvalue problem → superpose and fix the coefficients',
      'For $[0,L]$ problems choose the odd/even extension first to decide between sine and cosine series',
      'Homogenize an inhomogeneous boundary first; expand the inhomogeneous term in eigenfunctions',
    ],
  },

  'green-functions': {
    chapter: 'Chapter 3 Green\'s Function Method',
    title: 'Green\'s Functions and the Harmonic Equation',
    summary:
      'The fundamental solution produced by a point source is the Green\'s function; superpose them and you get the field of an arbitrary source — physics and mathematics meet here.',
    content: String.raw`

In electrostatics the potential of a point charge is $\dfrac{1}{4\pi r}$; in structural mechanics a unit concentrated force bends a beam into a triangular deflection curve. These two "point sources" share one idea of great value: once the response to a point source is known, the response to an arbitrary distributed source (a continuous charge, a distributed load) is obtained by superposing these point-source responses — because the equation is linear. This "point-source response function" is called, mathematically, the **Green's function**.

The Green's function method is the most beautiful bridge in PDE theory: one end joins physics (Coulomb potential, heat sources, concentrated forces), the other joins analysis (integral representations, explicit solutions of boundary-value problems). It turns "solving a differential equation" into "computing an integral", stitching local singularity (the point source) and global boundary (the boundary values) into a single function. This topic first introduces the harmonic equation and the fundamental solution, then constructs Green's functions, and finally shows how they give the solutions of the Dirichlet problem and Poisson's equation in one stroke.

## 2. Rigorous Definitions

**Fundamental solution**: let $\delta$ be the Dirac function (a unit point source at the origin). A function $\Phi$ satisfying $-\Delta\Phi = \delta$ is called a fundamental solution of the Laplacian. In two and three dimensions respectively,

$$\Phi_2(r) = -\frac{1}{2\pi}\ln r, \qquad \Phi_3(r) = \frac{1}{4\pi r}$$

where $r = |x - y|$ is the distance from the source point $y$ to the field point $x$. Note that $\Phi_3 = \dfrac{1}{4\pi r}$ is exactly the Coulomb potential of electrostatics.

**Green's function**: on a domain $\Omega$, the Green's function $G(x, y)$ is defined by

$$G(x, y) = \Phi(x - y) + H(x, y)$$

where $\Phi$ is the fundamental solution (carrying the point-source singularity) and $H$ is a correction term harmonic in $x \in \Omega$, whose sole duty is to make $G$ vanish on the boundary:

$$G(x, y) = 0, \qquad x \in \partial\Omega$$

That is, for a fixed source point $y$, the function $G(\cdot, y)$ of $x$ satisfies $-\Delta_x G = \delta(x - y)$ inside, vanishes identically on the boundary, and is negative near the boundary (by the maximum principle a function positive inside and zero on the boundary cannot exceed its positive upper bound inside — the Green's function blows up to $+\infty$ near the source and decreases to zero toward the boundary).

**The Green representation formula**: if $u$ satisfies $-\Delta u = f$ in $\Omega$ and $u = g$ on the boundary, then

$$u(x) = \int_\Omega G(x, y)\,f(y)\,dy - \oint_{\partial\Omega} g(y)\,\frac{\partial G}{\partial n}(x, y)\,ds(y)$$

where $\dfrac{\partial G}{\partial n}$ is the derivative along the **outward normal** of the boundary. The first term is the contribution of the volume source (point charges, heat sources); the second is the contribution of the boundary data.

**Harmonic function**: a function satisfying $\Delta u = 0$ in a domain, i.e. a source-free equilibrium field.

## 3. Why Defined This Way

**Why does the fundamental solution carry a singularity?** A point source is a "concentrated" source: squeezing the source into a single point forces the field strength to blow up there. $\ln r$ and $\dfrac{1}{r}$ are precisely the lowest-frequency functions for which the Laplacian "still acts nontrivially at infinity". One verifies that in two dimensions $\Delta\ln r = 2\pi\delta_0$ and in three dimensions $\Delta\dfrac{1}{r} = -4\pi\delta_0$. The order of the singularity is fixed by the dimension of space, and this is no coincidence — the behaviour of the Green's function near the source encodes the geometry of space.

**Why is the Green's function = fundamental solution + harmonic correction?** The fundamental solution only handles "a source in free space" and pays no attention to boundaries. Real problems always have boundaries, and the boundary data must be satisfied. Adding a harmonic function $H$ (which creates no source of its own and only adjusts the boundary behaviour) turns the "point-source response of free space" into the "point-source response inside the given domain". It is like re-drawing the background of a photograph: the subject (the singularity) does not move, the background (the boundary) is repainted.

**Why require $G$ to vanish on the boundary?** Because then the second term of the Green representation contains only the boundary data $g$ and the first only the source $f$, and source and boundary are cleanly separated. If $G$ were nonzero on the boundary, the formula would contain the unknown $\partial_n u$ and the system would couple back into the original problem, wasting all the effort.

**Why construct it by the method of images?** For symmetric domains such as a disk, a sphere or a half-space, one may place an "image charge" outside the domain whose harmonic field exactly cancels the value of the fundamental solution on the boundary. The method of images reduces "solving a PDE" to "finding a symmetric point", the most elegant construction technique.

**Why is the three-dimensional fundamental solution exactly the Coulomb potential?** Because Gauss's law for the electrostatic field $\operatorname{div} E = \rho/\varepsilon_0$ together with $E = -\nabla u$ is precisely Poisson's equation $-\Delta u = \rho/\varepsilon_0$. The solution for a point charge $\rho = q\delta$ is the Coulomb potential. Mathematics and physics coincide completely in the Green's function.

## 4. Intuition and Pictures

Think of the Green's function as the "impulse response of the system". In signal processing, feeding in a sharp pulse makes the system output a response function; the output for an arbitrary input is the convolution with the impulse response. The Green's function is exactly the impulse response of a differential-equation system — only the pulse has moved from the time domain to the space domain and the system from a circuit to a field.

The one-dimensional picture is the most familiar: on $[0, L]$ the Green's function is

$$G(x, \xi) = \begin{cases} \dfrac{x(L - \xi)}{L}, & x \le \xi \\[6pt] \dfrac{\xi(L - x)}{L}, & x \ge \xi \end{cases}$$

which is exactly "the deflection curve of a simply supported beam under a unit force": an upward pulse at $\xi$, decaying linearly on both sides, reaching zero at the two supports. Integrating a continuous distributed load $f$ gives the total deformation. This language is used directly in structural mechanics and circuit theory.

The two-dimensional disk picture is "charge + image charge": the real charge at $y$, the image charge at the outer inversion point $y^* = y/|y|^2$, and the difference of the two potentials vanishes on the circle. The half-space picture is "object + reflection", with the boundary as a mirror.

> Intuition: Green's function = point-source response of free space + correction from the boundary "mirror". The trace left by the source on the boundary is wiped out exactly by the image — that is the geometric meaning of $G|_{\partial\Omega} = 0$.

Right or wrong:

| Statement | Correct? | Explanation |
|---|---|---|
| The Green's function is harmonic in the domain | ✗ | It has a singularity at the source and is harmonic only away from it |
| The Green's function vanishes on the boundary | ✓ | This is part of the definition |
| The fundamental solution is independent of the domain | ✓ | It depends only on the dimension; it is the point-source response of all space |
| The Green's function is symmetric: $G(x,y) = G(y,x)$ | ✓ | Follows from energy reciprocity; physically the reciprocity principle |
| Constructing a Green's function requires solving an equation | ✗ | The method of images writes it down from symmetry |

## 5. Worked Examples

### Example 1 (Basic: One-Dimensional Green's Function versus Direct Solution)

Problem: Use the Green's function to solve $-u'' = 1$ ($0 < x < L$), $u(0) = u(L) = 0$, and compare with direct integration.

Analysis: Apply the Green representation $u(x) = \displaystyle\int_0^L G(x, \xi) \cdot 1\,d\xi$ and integrate piecewise.

Solution: Substitute the piecewise Green's function:

$$u(x) = \int_0^x \frac{\xi(L - x)}{L}\,d\xi + \int_x^L \frac{x(L - \xi)}{L}\,d\xi$$

First piece: $\displaystyle\int_0^x \frac{\xi(L - x)}{L}\,d\xi = \frac{L - x}{L}\cdot\frac{x^2}{2}$.

Second piece: $\displaystyle\int_x^L \frac{x(L - \xi)}{L}\,d\xi = \frac{x}{L}\Big[L\xi - \frac{\xi^2}{2}\Big]_x^L = \frac{x}{L}\Big(\frac{L^2}{2} - Lx + \frac{x^2}{2}\Big)$.

Combining (common denominator $2L$):

$$u(x) = \frac{x^2(L - x) + xL^2 - 2Lx^2 + x^3}{2L} = \frac{xL^2 - x^2L}{2L} = \frac{x(L - x)}{2}$$

Direct integration for comparison: integrating $-u'' = 1$ twice gives $u = -\dfrac{x^2}{2} + Cx + D$; $u(0) = 0$ gives $D = 0$ and $u(L) = 0$ gives $C = \dfrac{L}{2}$, so $u = \dfrac{x(L - x)}{2}$. The two methods agree completely.

Comment: This example shows the whole of the Green's function method: turning "solving a differential equation" into "computing an integral", where the kernel depends only on the domain (not on the source) and can be constructed once and reused. For different sources $f$ on the same domain the equation need not be solved again.

### Example 2 (Intermediate: Disk Green's Function and the Poisson Kernel)

Problem: Verify that the Green's function of the unit disk

$$G(x, y) = \frac{1}{2\pi}\ln\frac{|y|\,|x - y^*|}{|x - y|}, \qquad y^* = \frac{y}{|y|^2}$$

satisfies the definition (for fixed $y \ne 0$, $-\Delta_x G = \delta(x - y)$ and $G = 0$ when $|x| = 1$) and derive the Poisson kernel from it.

Analysis: Split into fundamental solution and correction: $G = -\dfrac{1}{2\pi}\ln|x - y| + \dfrac{1}{2\pi}\ln\big(|y|\,|x - y^*|\big)$. The second term is harmonic for $|x| < 1$ (because $y^*$ lies outside the disk, so $x - y^* \ne 0$).

Solution: **Boundary behaviour**: when $|x| = 1$, note that $y^* = y/|y|^2$ satisfies $|y|\,|x - y^*| = |1 - \overline{y}x|$ (substitute $y^* = 1/\overline{y}$ and check directly). Hence

$$\frac{|y|\,|x - y^*|}{|x - y|} = \frac{|1 - \overline{y}x|}{|x - y|}$$

and for $|x| = 1$ we have $|1 - \overline{y}x| = |x|\,|x - y| = |x - y|$ (because $1 - \overline{y}x = \overline{x}(x - y)$, and taking moduli uses $|x| = 1$), so the ratio is 1 and $G = \dfrac{1}{2\pi}\ln 1 = 0$. The boundary condition is satisfied.

**Singularity**: as $x \to y$, $\ln|x - y| \to -\infty$, so $G \to +\infty$, and $-\Delta_x G = \delta(x - y)$ (a property of the fundamental solution; the harmonic term contributes no singularity).

**Poisson kernel**: compute the outward normal derivative on the boundary $|x| = 1$ (radial, $r = |x|$). Write $\rho = |y|$, $\theta = \arg x$, $\varphi = \arg y$, $D = 1 - 2\rho\cos(\theta - \varphi) + \rho^2$. Using $\dfrac{\partial}{\partial r}\ln|x - y| = \dfrac{r - \rho\cos(\theta - \varphi)}{D}$ evaluated at $r = 1$, and the analogous expression for $y^*$ (with $|y^*| = 1/\rho$):

$$-\frac{\partial G}{\partial n} = -\frac{1}{2\pi}\left[\frac{\rho^2 - \rho\cos(\theta-\varphi)}{D} - \frac{1 - \rho\cos(\theta-\varphi)}{D}\right] = \frac{1}{2\pi}\cdot\frac{1 - \rho^2}{1 - 2\rho\cos(\theta - \varphi) + \rho^2}$$

This is precisely the **Poisson kernel**. Hence the solution of the Dirichlet problem $\Delta u = 0$, $u|_{\partial} = g$ on the unit disk is

$$u(\rho, \theta) = \frac{1}{2\pi}\int_0^{2\pi} \frac{1 - \rho^2}{1 - 2\rho\cos(\theta - \varphi) + \rho^2}\,g(\varphi)\,d\varphi$$

which is the Poisson formula for the disk. Note that $-\partial_n G$ is always positive and that $\dfrac{1}{2\pi}\displaystyle\int_0^{2\pi} P\,d\varphi = 1$ (normalization of the weight, corresponding to $g \equiv 1$ giving $u \equiv 1$).

Comment: The essence of the method of images: the inversion point $y^*$ pairs "the source inside the disk" with "an image source outside", and their fields cancel on the circle. The derivation of the Poisson kernel uses only elementary differentiation yet produces a classical formula — the cost-effectiveness of the Green's function method is on full display.

### Example 3 (Advanced: Poisson's Equation in the Disk)

Problem: Solve Poisson's equation $\Delta u = 1$ in the unit disk, $u|_{\partial} = 0$.

Analysis: Guess the solution by inspection, then verify with the Green's function. The guess is based on $\Delta r^2 = 4$ (two dimensions), so $\dfrac{r^2}{4}$ is a particular solution; then add a harmonic function to flatten the boundary.

Solution: Verify directly that $u = \dfrac{r^2 - 1}{4}$: in two dimensions

$$\Delta r^2 = \Delta(x^2 + y^2) = 2 + 2 = 4$$

so $\Delta\dfrac{r^2}{4} = 1$; and $u = 0$ when $r = 1$, so the boundary condition holds. By uniqueness of the Dirichlet problem (the difference of two solutions is harmonic and zero on the boundary, hence identically zero by the maximum principle) this is the unique solution.

Verify with the Green's function: $\Delta u = 1$ corresponds to $-\Delta u = -1$, i.e. $f = -1$, so

$$u(x) = \int_{|y| < 1} G(x, y)\cdot(-1)\,dy = -\int_{|y| < 1} G(x, y)\,dy$$

Computing this integral directly is tedious, but symmetry helps: $u$ depends only on $r = |x|$; writing $u(r)$ gives $\Delta u = u'' + \dfrac{1}{r}u' = 1$. Integrating gives $u' = \dfrac{r}{2} + \dfrac{C}{r}$ and $u = \dfrac{r^2}{4} + C\ln r + D$. Regularity at the origin requires $C = 0$, and $u(1) = 0$ requires $D = -\dfrac{1}{4}$, so $u = \dfrac{r^2 - 1}{4}$, in agreement with the inspection.

Comment: The trap here is the sign: the fundamental solutions of $\Delta u = f$ and $-\Delta u = f$ differ by a sign, so fix the convention before applying any formula. Here the convention is $-\Delta\Phi = \delta$, so $\Delta u = 1$ corresponds to $f = -1$. A constant solution must be pinned down by regularity at the origin together with the boundary condition; miss either and you are off by a constant.

## 6. Common Mistakes and Pitfalls

1. **Confusing sign conventions.** Is it $\Delta\Phi = \delta$ or $-\Delta\Phi = \delta$? The fundamental solutions differ by a sign (in two dimensions $\dfrac{1}{2\pi}\ln r$ versus $-\dfrac{1}{2\pi}\ln r$). Fix the convention before applying formulas, or every sign in the problem will be reversed.

2. **Forgetting the boundary correction $H$.** Writing $G = \Phi$ and thinking the job is done. The fundamental solution is generally nonzero on the boundary; a harmonic correction must be added so that $G|_{\partial\Omega} = 0$, otherwise the representation formula loses the boundary data or couples in unknown quantities.

3. **Reversing the pieces of the one-dimensional Green's function.** Mixing up the ranges of $\dfrac{x(L-\xi)}{L}$ and $\dfrac{\xi(L-x)}{L}$. Memory aid: $x$ and $\xi$ are symmetric, each piece is "the smaller $\times$ ($L$ minus the larger)" divided by $L$, and the two expressions agree (are continuous) at $x = \xi$.

4. **Treating the Green's function as harmonic everywhere in the domain.** It has a singularity at the source and is harmonic only in the domain with the source removed. When verifying harmonicity, say "away from the source point".

5. **Confusing the roles of the variables.** In $G(x, y)$, $y$ is the source point (integration variable) and $x$ the field point. The normal derivative in $\partial G/\partial n$ is taken with respect to the field point $x$, never $y$. The symmetry $G(x,y) = G(y,x)$ protects you, but the derivation demands clarity.

## 7. Summary and Mnemonics

Key points to review:

- The fundamental solution is the point-source response of free space: $-\dfrac{1}{2\pi}\ln r$ in two dimensions, $\dfrac{1}{4\pi r}$ in three (the Coulomb potential).
- Green's function = fundamental solution + harmonic correction, zero on the boundary; the method of images is the most elegant construction.
- Green representation: $u = \displaystyle\int_\Omega Gf\,dy - \oint_{\partial\Omega} g\,\partial_n G\,ds$, source and boundary cleanly separated.
- Differentiating the disk Green's function along the outward normal gives the Poisson kernel and hence the Poisson formula.
- The one-dimensional Green's function is the unit-force deflection curve of a simply supported beam; physics and mathematics are isomorphic.

**Mnemonic: The point-source response is the fundamental solution; a harmonic correction wipes out the boundary; multiply the source by Green and integrate; multiply the boundary data by the kernel.**`,
    keyPoints: [
      'Harmonic functions: mean value formula + strong maximum principle, no hot spots inside',
      'Green\'s function = fundamental solution + boundary correction (constructed by images)',
      'The three-dimensional fundamental solution is the Coulomb potential 1/(4πr)',
      'Solution of Poisson\'s equation = integral of Green\'s function times the source distribution',
    ],
  },

  'heat-equation': {
    chapter: 'Chapter 4 The Heat Equation',
    title: 'The Heat Equation',
    summary:
      'How heat flows: from Fourier\'s law to the Gaussian heat kernel, watch the diffusion equation flatten a spike into a plane.',
    content: String.raw`

Drop a drop of ink into clear water: the blob advances while spreading, its edges ever blurrier. Leave a cup of morning coffee on the table and within half an hour the temperature is uniform. The common mathematical description of these "flattening" processes is the heat equation. In 1822 Fourier wrote down this equation in his *Analytical Theory of Heat* and thereby invented Fourier series — a physical problem gave birth to a whole toolbox of mathematics, one of the finest stories in the history of science.

The most counter-intuitive feature of the heat equation is its "infinite propagation speed": in theory, at the instant one end is heated the temperature infinitely far away already has a nonzero (exponentially small) response. This contrasts sharply with the finite speed of the wave equation. Another feature is "irreversibility": the heat equation drives heat from concentrated to dispersed; running the videotape backwards (heat spontaneously gathering into a spike) is never seen. This topic makes both features clear: first the explicit solution formula given by the heat kernel, then how it automatically smooths away every sharp detail.

## 2. Rigorous Definitions

Let $u(x,t)$ be the temperature field and $a^2$ the thermal diffusivity (a material constant). The one-dimensional heat equation is

$$\frac{\partial u}{\partial t} = a^2\frac{\partial^2 u}{\partial x^2}, \qquad x \in \mathbb{R},\ t > 0$$

In $n$ dimensions $u_t = a^2\Delta u$. There are two standard definite problems:

1. **Cauchy problem on all space**: $u_t = a^2\Delta u$ ($x \in \mathbb{R}^n$, $t > 0$), $u(x,0) = \varphi(x)$. The solution is given by the **heat kernel** (Gaussian kernel):

$$u(x,t) = \frac{1}{(2a\sqrt{\pi t})^n}\int_{\mathbb{R}^n} e^{-\frac{|x - \xi|^2}{4a^2 t}}\varphi(\xi)\,d\xi$$

In one dimension this is

$$u(x,t) = \frac{1}{2a\sqrt{\pi t}}\int_{-\infty}^{\infty} e^{-\frac{(x - \xi)^2}{4a^2 t}}\varphi(\xi)\,d\xi$$

2. **Mixed problem on a finite interval**: $u_t = a^2 u_{xx}$ ($0 < x < L$, $t > 0$) with boundary conditions (e.g. $u(0,t) = u(L,t) = 0$ or $u_x(0,t) = u_x(L,t) = 0$) and initial value $u(x,0) = \varphi(x)$.

**Maximum principle**: the maximum and minimum of a solution of the heat equation in a bounded domain can only be attained at the initial time or on the boundary (for $t > 0$ interior extrema are "ironed out").

## 3. Why Defined This Way

**Why a first-order time derivative?** It comes from conservation of energy. Take a short segment of rod $[x, x + \Delta x]$; its heat $Q = c\rho\Delta x\,u$ ($c$ the specific heat, $\rho$ the density) changes at a rate equal to the difference of the heat fluxes entering at the two ends. Fourier's law of heat says the flux is $q = -k u_x$ ($k$ the conductivity; heat flows from hot to cold). Hence

$$c\rho\Delta x\,u_t = k u_x(x + \Delta x, t) - k u_x(x, t)$$

Dividing both sides by $c\rho\Delta x$ and letting $\Delta x \to 0$ gives $u_t = \dfrac{k}{c\rho}u_{xx} = a^2 u_{xx}$. The first-order time derivative is not a choice but an inevitability of energy bookkeeping.

**Why is the heat kernel an exponential?** Because $e^{-x^2/(4t)}$ satisfies the heat equation. A direct computation:

$$\partial_t e^{-\frac{x^2}{4t}} = \frac{x^2}{4t^2}e^{-\frac{x^2}{4t}}, \qquad \partial_x e^{-\frac{x^2}{4t}} = -\frac{x}{2t}e^{-\frac{x^2}{4t}}, \qquad \partial_x^2 e^{-\frac{x^2}{4t}} = \Big(\frac{x^2}{4t^2} - \frac{1}{2t}\Big)e^{-\frac{x^2}{4t}}$$

Subtracting gives $\partial_t = a^2\partial_x^2$ (expand $a^2\partial_x^2$ on the right and check term by term: the coefficients of the $x^2$ and $t^{-2}$ terms match, and the constant term is fixed by the normalization of the Gaussian integral). The Gaussian is the "eigen-solution" of the heat equation, just as the sine is the eigen-solution of the wave equation.

**Why integrate instead of using the value at a single point?** Because the initial temperature $\varphi$ is distributed over all space; the temperature at $x$ at time $t$ is a "superposition of initial temperatures migrated from everywhere with Gaussian weights". The standard deviation of the weight $\dfrac{1}{2a\sqrt{\pi t}}e^{-(x-\xi)^2/(4a^2 t)}$ grows like $\sqrt{t}$ — this is the quantitative description of the ink blob "spreading wider and wider": the diffusion distance grows like $\sqrt{t}$, not linearly.

**Why does the maximum principle hold?** Intuitive version: heat flow only cools hot spots and warms cold ones; new extrema cannot spontaneously appear inside. The rigorous argument uses the standard technique for parabolic equations: suppose $u$ attains its maximum at an interior point $(x_0, t_0)$; comparing the solution near that point with a downward-opening parabola shows $u$ is constant in a neighbourhood; then propagating the "set of maximal points" to the whole domain shows $u$ is constant. This is the **strong maximum principle**, which simultaneously gives uniqueness (the difference of two solutions satisfies homogeneous conditions and must vanish) and stability (small perturbations of the data only produce decaying perturbations of the solution).

**Why irreversible?** If $u(x,t)$ is a solution then $\tilde u(x,t) = u(x, -t)$ satisfies $\tilde u_t = -a^2\Delta\tilde u$, which is not the heat equation. Reversing the sign of time turns the "diffusion equation" into an "anti-diffusion equation", which amplifies initial disturbances exponentially (high-frequency modes like $e^{+a^2 n^2 t}$) and is completely ill-posed. This is the second law of thermodynamics projected onto the level of equations.

## 4. Intuition and Pictures

Think of the heat kernel as a bell curve that grows shorter and fatter. At the initial instant it degenerates into a spike (a $\delta$ function); as $t$ increases the peak drops like $1/\sqrt{t}$, the width grows like $\sqrt{t}$, and the area under the curve is conserved (the total heat is unchanged). The solution for an arbitrary initial temperature $\varphi$ is the weighted average obtained by sweeping this swimming bell curve over all space — this is the geometric picture of convolution with the heat kernel.

The smoothing effect is the most famous "superpower" of the heat equation: even if the initial temperature is a discontinuous function with jumps, the solution is infinitely smooth at every instant $t > 0$. The reason is obvious in the Fourier transform of the heat kernel: high-frequency modes carry the factor $e^{-a^2 n^2 t}$, so the larger $n$ the more violently they decay. This amounts to a "low-pass filter": only low-frequency (large-scale) information passes; high-frequency (detail) is annihilated exponentially.

> Intuition: the heat equation is a strict censor — spikes, jumps and burrs in the initial data cannot pass the $t > 0$ gate; only large-scale contours survive.

Picture of the infinite propagation speed: a temperature disturbance at some point of the rod in theory spreads through the whole rod instantly, only decaying like $e^{-x^2/(4a^2 t)}$. In engineering the "range of influence" can be truncated at a few standard deviations ($|x| \lesssim 4a\sqrt{t}$), which is good enough in practice; but mathematically one must admit that at any distance and any small time the temperature is strictly positive (if the initial value is nonnegative).

Right or wrong:

| Statement | Correct? | Explanation |
|---|---|---|
| Heat disturbances propagate at speed $a$ | ✗ | That is the wave equation; the heat equation propagates instantaneously |
| The diffusion distance grows like $\sqrt{t}$ | ✓ | Heat-kernel width $\sim \sqrt{t}$ |
| If the initial data are discontinuous the solution stays discontinuous | ✗ | For $t > 0$ the solution is infinitely smooth |
| Reversing the sign of time still gives the heat equation | ✗ | The anti-diffusion equation is highly ill-posed |
| An insulated thin rod ends up at a uniform temperature | ✓ | It tends to the initial average |

## 5. Worked Examples

### Example 1 (Basic: Heat-Kernel Solution for Gaussian Data)

Problem: With initial temperature $u(x,0) = e^{-x^2}$, solve $u_t = a^2 u_{xx}$ ($x \in \mathbb{R}$) and describe the long-time behaviour.

Analysis: Convolve with the heat kernel. A Gaussian convolved with a Gaussian is still a Gaussian — a classical property of the normal distribution.

Solution: With $\varphi(\xi) = e^{-\xi^2}$ the solution is

$$u(x,t) = \frac{1}{2a\sqrt{\pi t}}\int_{-\infty}^{\infty} e^{-\frac{(x-\xi)^2}{4a^2 t}}e^{-\xi^2}\,d\xi$$

Complete the square: $\dfrac{(x-\xi)^2}{4a^2 t} + \xi^2 = \dfrac{\big(\xi - \frac{x}{1 + 4a^2 t}\big)^2}{\frac{4a^2 t}{1 + 4a^2 t}} + \dfrac{x^2}{1 + 4a^2 t}$ (putting $\xi$ into a perfect square). Substitute and use the Gaussian integral $\displaystyle\int_{-\infty}^{\infty} e^{-\frac{\xi^2}{s^2}}d\xi = s\sqrt{\pi}$:

$$u(x,t) = \frac{1}{2a\sqrt{\pi t}} \cdot e^{-\frac{x^2}{1 + 4a^2 t}} \cdot \frac{2a\sqrt{t}}{\sqrt{1 + 4a^2 t}}\cdot\sqrt{\pi} = \sqrt{\frac{1}{1 + 4a^2 t}}\,e^{-\frac{x^2}{1 + 4a^2 t}}$$

Check $t = 0$: $u(x,0) = e^{-x^2}$ ✓. Long-time behaviour: the $1 + 4a^2 t \to \infty$ in the exponent, so $u \to 0$ (the total heat over all space, $\displaystyle\int u\,dx = \sqrt{\pi}$, is conserved, but it is spread over an ever wider region and the peak tends to zero).

Comment: A Gaussian convolved with a Gaussian is still a Gaussian, and the variances add (here $1/2$ and $2a^2 t$). This explains the "spreading" of the heat kernel: the variance of the solution = variance of the initial data + $2a^2 t$, growing linearly in time, with standard deviation growing like $\sqrt{t}$.

### Example 2 (Intermediate: Finite Interval and Mode Decay)

Problem: Solve $u_t = a^2 u_{xx}$ ($0 < x < L$), $u(0,t) = u(L,t) = 0$, $u(x,0) = \sin\dfrac{\pi x}{L}$.

Analysis: The eigenfunctions of a string fixed at both ends are exactly $\sin\dfrac{n\pi x}{L}$; substitute and see what equation the time part satisfies.

Solution: Let $u = T(t)\sin\dfrac{\pi x}{L}$; then $u_{xx} = -\dfrac{\pi^2}{L^2}u$ and the equation becomes

$$u_t = -\frac{a^2\pi^2}{L^2}u$$

an ODE in $t$ with solution

$$u(x,t) = C e^{-\frac{a^2\pi^2}{L^2}t}\sin\frac{\pi x}{L}$$

The initial value gives $C = 1$, so

$$u(x,t) = e^{-\frac{a^2\pi^2}{L^2}t}\sin\frac{\pi x}{L}$$

Direct check: $u_t = -\dfrac{a^2\pi^2}{L^2}u$ and $a^2 u_{xx} = -a^2\dfrac{\pi^2}{L^2}u$, equal ✓; the boundary and initial conditions both hold ✓.

Generalization: for a general $\varphi$, expand in a sine series $\varphi = \sum c_n\sin\frac{n\pi x}{L}$; then $u = \sum c_n e^{-a^2 n^2\pi^2 t/L^2}\sin\frac{n\pi x}{L}$. High-frequency modes (large $n$) decay far faster — double $n$ and the decay rate quadruples. This is the filtering character of the heat equation: it favours low frequencies and penalizes high ones.

Comment: The solution for a single eigenfunction is astonishingly simple; the secret is that the second spatial derivative merely multiplies by a negative constant. When the initial value happens to be an eigenfunction, do not reach for the heat kernel — try the single mode first. This also explains why the Fourier method is the standard weapon for the heat equation.

### Example 3 (Advanced: Insulated Rod and the Steady-State Limit)

Problem: A thin rod $[0, 1]$ is insulated at both ends, with initial temperature $u(x,0) = x$ ($a = 1$). Find the long-time temperature distribution.

Analysis: Insulation = Neumann conditions $u_x(0,t) = u_x(1,t) = 0$, paired with a cosine series. The key is to see which mode does not decay.

Solution: Expand $\varphi(x) = x$ in cosines on $[0,1]$: $x = \dfrac{a_0}{2} + \displaystyle\sum_{n=1}^{\infty} a_n\cos n\pi x$, where

$$a_0 = 2\int_0^1 x\,dx = 1, \qquad a_n = 2\int_0^1 x\cos n\pi x\,dx = \frac{2\big[(-1)^n - 1\big]}{n^2\pi^2}$$

(computation: $\displaystyle\int_0^1 x\cos n\pi x\,dx = \Big[\frac{x\sin n\pi x}{n\pi}\Big]_0^1 - \frac{1}{n\pi}\int_0^1 \sin n\pi x\,dx = 0 + \frac{(-1)^n - 1}{n^2\pi^2}$). So for odd $n$, $a_n = -\dfrac{4}{n^2\pi^2}$, and for even $n$, $a_n = 0$.

The solution is

$$u(x,t) = \frac{1}{2} - \frac{4}{\pi^2}\sum_{n\ \text{odd}}\frac{1}{n^2}e^{-n^2\pi^2 t}\cos n\pi x$$

As $t \to \infty$ all terms with $e^{-n^2\pi^2 t}$ ($n \ge 1$) decay, while the zeroth mode (the constant) does not, so

$$u(x,t) \to \frac{1}{2}$$

which is exactly the average of the initial temperature $x$ over $[0,1]$. Physical meaning: an insulated rod exchanges no heat with the outside, so the total heat is conserved and the final temperature is uniform, equal to the average of the initial values. Contrast Example 2 (ends fixed at zero temperature): heat escapes through the boundary and the limit is zero — the boundary conditions decide the fate.

Comment: There are two traps. First, a Neumann boundary pairs with a cosine series; a sine series would violate the boundary condition (the derivative of $\sin$ is nonzero at the endpoints). Second, the zeroth mode $a_0/2$ does not decay in time; it carries the "conserved quantity" (the total heat), so it must be kept separately when finding the steady state — multiplying it by a decay factor too would wrongly give "tends to zero".

## 6. Common Mistakes and Pitfalls

1. **Giving the heat equation two initial conditions.** Writing $u_t(x,0) = \psi$ in addition to $u(x,0) = \varphi$ — one too many. A first-order time derivative takes exactly one initial condition; two pieces of initial data are the wave equation's specification. Overdetermining generally leaves no solution.

2. **Dropping the normalization factor when using the heat kernel.** $\dfrac{1}{2a\sqrt{\pi t}}$ is not decoration: without it the total heat is not conserved and the solution does not return to the initial value as $t \to 0$. The $\sqrt{\pi}$ of the Gaussian integral must match the $\sqrt{\pi t}$ in the denominator.

3. **Mistaking diffusion for propagation.** Believing a heat disturbance travels at speed $a$ and drawing a "wavefront". The domain of dependence of the heat equation is all of space: the value at $x$ at time $t$ depends on all the initial data (with Gaussian weights), only the weights far away are exponentially small.

4. **Getting zero for the steady state of an insulated problem.** Under Neumann conditions heat has nowhere to go, so the steady state is the initial average, not zero. Skipping the zeroth mode produces exactly this error.

5. **Solving an inverse problem by reversing time.** Faced with "given the final state, find the initial state", applying the heat equation with the time reversed yields an exponentially ill-conditioned answer — a tiny error in the final data is amplified catastrophically. Inverse problems require regularization; this is the core topic of modern image denoising.

## 7. Summary and Mnemonics

Key points to review:

- The heat equation $u_t = a^2\Delta u$ comes from conservation of energy plus Fourier's law; it is parabolic with a first-order time derivative.
- The heat kernel $\dfrac{1}{(2a\sqrt{\pi t})^n}e^{-|x-\xi|^2/(4a^2 t)}$ gives the explicit solution on all space; its width grows like $\sqrt{t}$.
- Smoothing: for $t > 0$ the solution is infinitely smooth; high-frequency modes decay like $e^{-a^2 n^2 t}$.
- The maximum principle guarantees uniqueness and stability; insulated (Neumann) problems tend to the average temperature.
- Irreversibility: reversing time gives the highly ill-posed anti-diffusion equation.

**Mnemonic: Heat conservation plus Fourier; a first-order time derivative that smooths; the bell-shaped kernel widens step by step; insulation ends at the average.**`,
    keyPoints: [
      'Heat equation u_t = a²Δu: first order in time, second in space, parabolic',
      'On all space the solution is given by the Gaussian heat kernel; the initial value is smoothed into a bell curve',
      'Infinite propagation speed + smoothing: nonzero everywhere instantly, high frequencies decay exponentially',
      'Maximum principle: interior extrema come only from the initial data or boundary; the solution is unique and stable',
      'On a finite interval use separation of variables; insulated problems tend to the average; source terms use Duhamel',
    ],
  },

  'wave-equation': {
    chapter: 'Chapter 5 The Wave Equation',
    title: 'The Wave Equation and d\'Alembert\'s Formula',
    summary:
      'd\'Alembert\'s formula writes the vibrating string as a superposition of left- and right-going waves: half to the left, half to the right, with the initial velocity contributing an integral.',
    content: String.raw`

Shake a long rope and a bump runs along it at constant speed without changing shape, then bounces back off a fixed end; pluck a guitar string and the waveform reflects back and forth between the ends, forming standing waves and musical notes. In 1746 d'Alembert gave the general solution of the one-dimensional wave equation, and for the first time made it clear: the vibration of a string is nothing but "one wave going left" plus "one wave going right".

The wave equation and the heat equation have opposite characters. The heat equation is an old man with amnesia, erasing every initial detail; the wave equation is a memory master, remembering not only the initial shape but also the initial velocity, conserving energy and oscillating forever. The key to understanding waves is the "travelling wave": a disturbance of any shape can be seen as two waves travelling left and right, each going its own way without interference until a boundary bounces it back. This topic starts from the travelling-wave ansatz, derives d'Alembert's formula, and then looks at reflection, energy and three-dimensional spherical waves.

## 2. Rigorous Definitions

The one-dimensional wave equation (vibrating string):

$$\frac{\partial^2 u}{\partial t^2} = a^2\frac{\partial^2 u}{\partial x^2}, \qquad a^2 = \frac{T}{\rho}$$

where $T$ is the tension and $\rho$ the linear density. The **Cauchy problem** (whole line) prescribes two initial values: $u(x,0) = \varphi(x)$, $u_t(x,0) = \psi(x)$.

**Travelling-wave ansatz**: for arbitrary (twice differentiable) functions $F, G$,

$$u(x,t) = F(x - at) + G(x + at)$$

satisfies the wave equation (check directly: $u_{tt} = a^2F'' + a^2G'' = a^2u_{xx}$). $F(x - at)$ travels to the right at speed $a$ (shape unchanged) and $G(x + at)$ to the left at speed $a$. Hence the general solution of the one-dimensional wave equation is the sum of a left-going and a right-going wave.

**d'Alembert's formula**: the unique solution of the Cauchy problem is

$$u(x,t) = \frac{1}{2}\big[\varphi(x - at) + \varphi(x + at)\big] + \frac{1}{2a}\int_{x - at}^{x + at} \psi(\xi)\,d\xi$$

**Energy**: $E(t) = \dfrac{1}{2}\displaystyle\int_{-\infty}^{\infty}\big(u_t^2 + a^2 u_x^2\big)\,dx$ is conserved ($E'(t) = 0$).

**Semi-infinite problem**: for $x > 0$ with boundary condition $u(0,t) = 0$ (fixed end) or $u_x(0,t) = 0$ (free end), extend the initial data oddly or evenly to the whole line and then apply d'Alembert's formula.

## 3. Why Defined This Way

**Why is the general solution $F(x - at) + G(x + at)$?** Introduce the characteristic coordinates

$$\xi = x - at, \qquad \eta = x + at$$

Then $\partial_x = \partial_\xi + \partial_\eta$ and $\partial_t = a(\partial_\eta - \partial_\xi)$; the chain rule gives

$$u_{tt} - a^2 u_{xx} = a^2(u_{\xi\xi} - 2u_{\xi\eta} + u_{\eta\eta}) - a^2(u_{\xi\xi} + 2u_{\xi\eta} + u_{\eta\eta}) = -4a^2 u_{\xi\eta} = 0$$

so the equation degenerates to $u_{\xi\eta} = 0$: integrating in $\xi$ gives $u_\eta = \tilde G(\eta)$, and integrating in $\eta$ gives $u = F(\xi) + G(\eta)$. The mixed derivative disappears — this is the mathematical reason why "left- and right-going waves do not interfere".

**Why does d\'Alembert\'s formula look like this?** Substitute the general solution into the initial conditions: $F(x) + G(x) = \varphi(x)$; differentiating in $t$ gives $u_t = -aF'(x - at) + aG'(x + at)$, and setting $t = 0$ gives $-aF'(x) + aG'(x) = \psi(x)$. Adding and subtracting the two equations for $\varphi$ and $\psi$ gives $G'(x) = \dfrac{1}{2a}\psi(x) + \dfrac{1}{2}\varphi'(x)$; integrating gives $G(x) = \dfrac{1}{2}\varphi(x) + \dfrac{1}{2a}\displaystyle\int_0^x \psi(\xi)\,d\xi + C$ and $F(x) = \dfrac{1}{2}\varphi(x) - \dfrac{1}{2a}\displaystyle\int_0^x \psi\,d\xi - C$. Substituting into $F(x - at) + G(x + at)$, the constant $C$ cancels and the intervals of integration join into $[x - at, x + at]$, which is exactly the formula. The contribution of the initial velocity is an accumulation: the initial velocity "sensed" at time $t$ lies precisely on the interval of dependence.

**Why is the domain of dependence $[x - at, x + at]$?** In the formula $\varphi$ is sampled only at these two points and $\psi$ is integrated only over this interval. What happens outside the interval has no influence on the solution at $(x, t)$ — the wave equation has a strict "horizon". This contrasts essentially with the heat equation (instantaneous influence everywhere) and is the signature of hyperbolic equations.

**Why is energy conserved?** Physically, for a string with no external force and no damping, kinetic plus potential energy should be conserved. Mathematically:

$$E'(t) = \int (u_t u_{tt} + a^2 u_x u_{xt})\,dx = \int (a^2 u_t u_{xx} + a^2 u_x u_{xt})\,dx = a^2\int \partial_x(u_t u_x)\,dx = a^2\big[u_t u_x\big]_{-\infty}^{\infty} = 0$$

(the boundary term decays to zero at infinity). The existence of a conserved quantity implies that the solution of the Cauchy problem is unique (the energy of the difference of two solutions is zero) and stable.

**Why use extensions for semi-infinite problems?** A fixed end $u(0,t) = 0$ requires the initial shape to be odd (antisymmetric about $x = 0$); a free end $u_x(0,t) = 0$ requires it to be even. Extending $\varphi, \psi$ oddly (evenly) to the negative half-axis makes the reflected wave satisfy the boundary condition automatically, and the whole-line formula can be used as is. Physical picture of reflection: at a fixed end the reflection is inverted (a trough becomes a crest); at a free end it is upright (a trough stays a trough).

## 4. Intuition and Pictures

Break d'Alembert's formula into three pieces of furniture: $\dfrac{1}{2}\varphi(x - at)$ is the right half of the initial shape, travelling right at speed $a$; $\dfrac{1}{2}\varphi(x + at)$ is the left half, travelling left at speed $a$; the integral term is the "running account" of the initial velocity over the interval of dependence, spreading out with time. The initial shape is split in half and the halves go their separate ways, while the initial velocity behaves like continuously accruing interest.

Picture of reflection at a fixed end: a right-going wave hits the wall and returns as an upside-down left-going wave (phase difference $\pi$). Mathematically the odd extension makes $\varphi_{\text{odd}}(-s) = -\varphi(s)$, so at $x = 0$ the terms $\varphi(at)$ and $\varphi(-at)$ cancel exactly. At a free end it is the opposite: the even extension gives an upright reflection, and the derivative at the wall point is automatically zero.

The picture of domains of dependence and influence is the signature of hyperbolicity: in the $(x, t)$ plane the two characteristics through $(x_0, t_0)$, $x = x_0 \pm a(t - t_0)$, cut the plane into three regions — the "past light cone" in the middle determines the solution, the two "future light cones" outside are unaffected. Wave propagation has a strict causal structure, the common geometry of all relativistic equations (electromagnetic waves, gravitational waves).

> Intuition: the wave equation is a messenger that delivers only the mail inside the domain of dependence; the heat equation is a thick fog that soaks the whole domain at once.

Right or wrong:

| Statement | Correct? | Explanation |
|---|---|---|
| A waveform decays and deforms as it propagates | ✗ | One-dimensional travelling waves keep their shape (no damping) |
| The value at $x$ at time $t$ depends only on $[x - at, x + at]$ | ✓ | A direct consequence of d'Alembert's formula |
| Reflection at a fixed end does not change the waveform | ✗ | A fixed end reflects with inversion; only a free end keeps the phase |
| Energy conservation ⇒ uniqueness | ✓ | The energy of the difference is zero |
| Two and three dimensions also have sharp wavefronts | △ | Three dimensions do (Huygens' principle); two dimensions leave a tail |

## 5. Worked Examples

### Example 1 (Basic: Applying d\'Alembert\'s Formula Directly)

Problem: Infinite string $u_{tt} = u_{xx}$ ($a = 1$), $u(x,0) = \sin x$, $u_t(x,0) = 0$. Solve and verify.

Analysis: Substitute directly into the formula: $\varphi = \sin x$, $\psi = 0$, $a = 1$.

Solution: $u(x,t) = \dfrac{1}{2}\big[\sin(x - t) + \sin(x + t)\big]$. Using the sum-to-product formula:

$$\sin(x - t) + \sin(x + t) = 2\sin x\cos t$$

so

$$u(x,t) = \sin x\cos t$$

Check: $u_t = -\sin x\sin t$, $u_{tt} = -\sin x\cos t$; $u_{xx} = -\sin x\cos t$; $u_{tt} = u_{xx}$ ✓. $u(x,0) = \sin x$ ✓, $u_t(x,0) = -\sin x\sin 0 = 0$ ✓.

This solution is a **standing wave**: $\sin x$ is fixed and $\cos t$ oscillates, so the whole string swells and shrinks like breathing. It is the superposition of two travelling waves $\dfrac{1}{2}\sin(x \mp t)$ — a standing wave and a travelling wave are only two views of the same solution.

Comment: When the initial velocity is zero the formula reduces to the two $\varphi$ terms; sum-to-product is a sharp tool. Watch out for the illusion that a standing wave "does not move": every point vibrates, only the nodes (where $\sin x = 0$) never move.

### Example 2 (Intermediate: Reflection at a Fixed End)

Problem: Semi-infinite string $x > 0$, $u_{tt} = u_{xx}$, fixed end $u(0,t) = 0$, initial values $u(x,0) = x^2$ ($x \ge 0$), $u_t(x,0) = 0$. Solve.

Analysis: Fixed end ⇒ odd extension: $\varphi_{\text{odd}}(s) = s^2$ for $s \ge 0$ and $\varphi_{\text{odd}}(s) = -s^2$ for $s < 0$. Then apply the whole-line formula.

Solution: $u(x,t) = \dfrac{1}{2}\big[\varphi_{\text{odd}}(x - t) + \varphi_{\text{odd}}(x + t)\big]$. For $x > 0$ there are two cases:

When $t \le x$ (the reflected wave has not arrived): $x - t \ge 0$ and $x + t > 0$, so

$$u = \frac{1}{2}\big[(x - t)^2 + (x + t)^2\big] = x^2 + t^2$$

When $t > x$ (the reflected wave has returned): $x - t < 0$, so $\varphi_{\text{odd}}(x - t) = -(t - x)^2$, while $\varphi_{\text{odd}}(x + t) = (x + t)^2$, hence

$$u = \frac{1}{2}\big[-(t - x)^2 + (x + t)^2\big] = \frac{1}{2}\big[-(t^2 - 2tx + x^2) + t^2 + 2tx + x^2\big] = 2tx$$

Check the boundary: $u(0,t) = 2t \cdot 0 = 0$ ✓ (for $t > 0$). Check continuity at $t = x$: $x^2 + x^2 = 2x^2$ and $2x \cdot x = 2x^2$ ✓. Check $t = 0$: $u = x^2$ ✓.

Picture of the reflection: for $t \le x$ the point $x$ feels only the wave it emitted itself, and the shape evolves as $x^2 + t^2$ (since $(x - t)^2$ and $(x + t)^2$ are constant along their respective characteristics); after $t > x$ the inverted wave reflected from the wall arrives, the value at $x$ becomes $2tx$, completely different from the free solution.

Comment: The odd extension is the standard tool for a fixed end; the key is to think clearly about "how the extended function is defined on the whole real axis". In the case discussion decide the sign of $x - t$ first and then substitute the corresponding extension formula — here $x + t > 0$ holds automatically ($x > 0, t > 0$), which simplifies matters.

### Example 3 (Advanced: Verifying the General Solution and Three-Dimensional Spherical Waves)

Problem: (1) Verify that $u = F(x - at) + G(x + at)$ is indeed the general solution of the wave equation; (2) solve the three-dimensional radial wave equation $u_{tt} = a^2\Big(u_{rr} + \dfrac{2}{r}u_r\Big)$ under the substitution $v = ru$, and explain Huygens' principle.

Analysis: (1) differentiate directly; (2) the radial Laplacian is $\Delta u = u_{rr} + \dfrac{2}{r}u_r$, and the substitution $v = ru$ absorbs the $\dfrac{2}{r}u_r$ term.

Solution: (1) Write $\xi = x - at$, $\eta = x + at$; then $u_x = F' + G'$, $u_{xx} = F'' + G''$, $u_t = -aF' + aG'$, $u_{tt} = a^2F'' + a^2G'' = a^2u_{xx}$ ✓. Any $F, G$ work, so this is the general solution (two arbitrary functions matching two initial conditions).

(2) Let $v(r,t) = r\,u(r,t)$; then $v_r = u + r u_r$ and $v_{rr} = 2u_r + r u_{rr}$. Hence

$$v_{tt} = r u_{tt} = a^2 r\Big(u_{rr} + \frac{2}{r}u_r\Big) = a^2(2u_r + r u_{rr}) = a^2 v_{rr}$$

$v$ satisfies the one-dimensional wave equation! Apply d'Alembert's formula (with initial values $v(r,0) = r\varphi(r)$, $v_t(r,0) = r\psi(r)$):

$$v(r,t) = \frac{1}{2}\big[(r - at)\varphi(r - at) + (r + at)\varphi(r + at)\big] + \frac{1}{2a}\int_{r - at}^{r + at} s\,\psi(s)\,ds$$

Then substitute back $u = v/r$. For a concentrated initial disturbance near the origin ($\varphi, \psi$ supported in a small interval) the solution consists of two terms: the **incoming wave** $\dfrac{(r - at)\varphi(r - at)}{2r}$ and the **outgoing wave** $\dfrac{(r + at)\varphi(r + at)}{2r}$. The outgoing wave decays like $1/r$ (spherical geometry spreads the energy) and expands outward at speed $a$; at the radius $r = at$ it forms a sharp **spherical wavefront** — this is precisely Huygens' principle: waves in three-dimensional space "pass without lingering", and after the front has gone the scene returns to calm. Two dimensions are different (the solution carries a logarithmic tail), and a "reverberation" is left behind the wave.

Comment: The substitution $v = ru$ is a model of dimensional reduction: it turns the three-dimensional radial equation with its $\dfrac{2}{r}$ term into a standard one-dimensional form. The sharp wavefront of Huygens' principle is a privilege of three dimensions, and it is why "sound" (three-dimensional acoustic waves) is much crisper than "ripples" (two-dimensional surface waves). A common error is forgetting to convert the solution for $v$ back to $r$ and obtain $u$.

## 6. Common Mistakes and Pitfalls

1. **Mixing up the number of initial conditions.** Second-order waves take two initial values, first-order heat takes one; giving waves only one or heat two are the most common specification errors. The criterion is the highest order of the time derivative in the equation.

2. **Forgetting the $\dfrac{1}{2a}$ in the integral term of d\'Alembert\'s formula.** Writing $\displaystyle\int_{x - at}^{x + at}\psi\,d\xi$ directly. Dimensional analysis saves you: $u$ has the same dimension as $\varphi$, while the integral term $\int\psi\,d\xi$ carries an extra time dimension, which must be compensated by dividing by the speed $a$; the factor $\dfrac{1}{2}$ comes from splitting the initial shape in half.

3. **Choosing the wrong direction of extension.** Using an even extension at a fixed end (or vice versa) immediately violates the boundary condition. Anchor: fixed (function value zero) uses odd; free (derivative zero) uses even.

4. **Treating a standing wave as "not vibrating".** In $\sin x\cos t$ every non-nodal point vibrates with the rhythm $\cos t$; only the spatial shape is fixed. A standing wave is a view of superposed travelling waves, not a third kind of wave.

5. **Believing two dimensions also have a sharp wavefront.** Huygens' principle (calm restored after the front) holds only in odd dimensions (especially three); the two-dimensional solution carries a logarithmic tail, and a lingering "echo" remains after the disturbance.

## 7. Summary and Mnemonics

Key points to review:

- Travelling-wave ansatz $F(x - at) + G(x + at)$: in characteristic coordinates the equation degenerates to $u_{\xi\eta} = 0$.
- d'Alembert's formula: the initial shape is split in half to the left and right; the initial velocity is integrated over the interval of dependence.
- Domain of dependence $[x - at, x + at]$: finite propagation speed, the hyperbolic signature.
- Semi-infinite problems: odd (even) extension handles reflection at a fixed (free) end.
- Energy conservation gives uniqueness and stability; $v = ru$ reduces the three-dimensional radial equation to one dimension; Huygens' principle is a three-dimensional bonus.

**Mnemonic: Characteristic coordinates split the mixed derivative; left and right travelling waves each fly away; the initial velocity integral has a factor two-a; odd for fixed, even for free.**`,
    keyPoints: [
      'd\'Alembert\'s formula: u = ½[φ(x−at)+φ(x+at)] + (1/2a)∫ initial velocity',
      'General solution = left-going wave F(x−at) + right-going wave G(x+at), running without changing shape',
      'Domain of dependence [x−at, x+at]: finite propagation speed, no influence beyond the horizon',
      'Semi-infinite strings use odd/even extensions for reflection at fixed and free ends',
      'Energy conservation: E(t) = ½∫(u_t² + a²u_x²)dx is constant; three dimensions have spherical waves and Huygens\' principle',
    ],
  },

  'laplace-equation': {
    chapter: 'Chapter 6 The Harmonic Equation',
    title: 'The Dirichlet Problem and Poisson\'s Formula',
    summary:
      'The harmonic equation describes a source-free equilibrium: no interior extrema, the boundary decides everything; Poisson\'s formula on a disk integrates boundary values directly into interior values.',
    content: String.raw`

Imagine a radiator fixed in a winter room; wait long enough for the air to stop moving and the temperature distribution settles — no longer changing with time. This "everything has fallen silent" equilibrium is described by the harmonic (Laplace) equation $\Delta u = 0$. Likewise, in an electrostatic field, the potential in a charge-free region satisfies $\Delta u = 0$; so does the velocity potential of an incompressible irrotational fluid. Harmonic functions (functions satisfying $\Delta u = 0$) are the "quietest" class of solutions in classical PDE theory: no time, no source, no propagation — only the boundary quietly determining the interior.

If the heat equation smooths sharpness away and the wave equation preserves memory, the harmonic equation is "the puppet of the boundary": once the values on the boundary are given, the interior is uniquely determined. The central problem of this topic is called the Dirichlet problem — given the function values on the boundary of a domain, find the solution inside satisfying $\Delta u = 0$. We shall also give the explicit solution on a disk (Poisson's formula), which turns "boundary values" directly into "interior values" by an integral — a classical achievement of the Green's function method.

## 2. Rigorous Definitions

Let $\Omega$ be a domain in $\mathbb{R}^n$ and $u$ twice continuously differentiable.

**Harmonic (Laplace) equation**:

$$\Delta u = \frac{\partial^2 u}{\partial x_1^2} + \cdots + \frac{\partial^2 u}{\partial x_n^2} = 0$$

**Poisson's equation** (with source):

$$\Delta u = f$$

**Dirichlet problem**: $\Delta u = 0$ in $\Omega$, $u = g$ on the boundary $\partial\Omega$ ($g$ a given boundary function).

**Neumann problem**: the normal derivative $\partial u/\partial n = h$ is given on the boundary.

**Mean value property**: if $u$ is harmonic in a disk (or ball) $B$, then the value of $u$ at the centre equals its average over the boundary circle (sphere):

$$u(x_0) = \frac{1}{2\pi}\int_0^{2\pi} u(x_0 + r e^{i\theta})\,d\theta$$

**Maximum principle**: the maximum and minimum of a harmonic function in a bounded domain $\Omega$ can only be attained on the boundary $\partial\Omega$; if it attains a maximum inside, it is constant.

**Poisson's formula for the disk**: the solution of the Dirichlet problem $\Delta u = 0$, $u|_{\partial} = g$ on the unit disk is

$$u(r,\theta) = \frac{1}{2\pi}\int_0^{2\pi} \frac{1 - r^2}{1 - 2r\cos(\theta - \varphi) + r^2}\,g(\varphi)\,d\varphi$$

where the kernel $P(r,\theta-\varphi) = \dfrac{1 - r^2}{1 - 2r\cos(\theta-\varphi) + r^2}$ is called the Poisson kernel.

## 3. Why Defined This Way

**Why does equilibrium correspond to $\Delta u = 0$?** In steady heat conduction the temperature does not change with time, so the time term of the heat equation $u_t = a^2\Delta u$ disappears and $\Delta u = 0$ remains. In a charge-free region of an electrostatic field, Gauss's law $\operatorname{div} E = 0$ together with $E = -\nabla u$ gives $\Delta u = 0$. So $\Delta u = 0$ is essentially the mathematical expression of "no source, no divergence".

**Why is the mean value property central?** The mean value property is an equivalent description of "locally source-free": a function equal at every point to the average around it cannot be higher than its neighbourhood at any point (otherwise the average would be pulled down), so there can be no interior extrema — this is the seed of the maximum principle. Conversely, a function satisfying the mean value property must be harmonic (provable by Taylor expansion). The mean value property is more intuitive than the equation itself; it is the harmonic function's identity card.

**Why does the maximum principle guarantee uniqueness?** Let $u_1, u_2$ both solve the same Dirichlet problem; the difference $w = u_1 - u_2$ is harmonic in $\Omega$ and zero on the boundary. By the maximum principle the maximum and minimum of $w$ are both attained on the boundary and equal $0$, so $w \equiv 0$. Hence the solution is unique. Without boundary conditions harmonic functions are not unique (e.g. the family of constants).

**Why must the Poisson kernel be positive with integral 1?** The Poisson kernel satisfies $P \ge 0$ and $\dfrac{1}{2\pi}\displaystyle\int_0^{2\pi} P\,d\varphi = 1$. The former ensures that a large boundary value gives a large interior value (comparison principle); the latter ensures that a constant boundary $g \equiv c$ gives the constant solution $u \equiv c$ (physically a uniform boundary gives a uniform field). These two properties are exactly what make Poisson's formula satisfy the equation, the boundary condition and uniqueness at once.

## 4. Intuition and Pictures

Think of a harmonic function as a taut elastic membrane: with no external force its shape satisfies $\Delta u = 0$, and the most bulging and most sunken places can only be at the boundary (nailed frame), with the interior necessarily gentle. This is the geometric picture of "no hot spots inside a harmonic function".

The mean value property gives a beautiful criterion: averaging over a circle gives the centre value. Averaging repeatedly lets information "seep" from the boundary all the way into any interior point — Poisson's formula is exactly the integral form of this seepage. The Poisson kernel $P(r,\theta-\varphi)$ becomes sharp as $r \to 1$ (approaching the boundary), concentrating near $\varphi = \theta$, so $u(r,\theta)$ approaches the boundary value $g(\theta)$: the solution fits the boundary continuously.

> Intuition: a harmonic function is like a membrane shaped by its frame, always mild inside, with the boundary the sole master; Poisson's formula translates the boundary's "commands" into each interior point's "obedience" by a weighted integral.

Right or wrong:

| Statement | Correct? | Explanation |
|---|---|---|
| A harmonic function can attain a maximum inside | ✗ | Maximum principle: extrema only on the boundary |
| A harmonic function must be constant | ✗ | Only bounded on the whole plane (Liouville) is it forced to be constant |
| The Dirichlet problem on a disk has a unique solution | ✓ | Follows directly from the maximum principle |
| The Poisson kernel can be negative | ✗ | It is always positive and normalized |
| Mean value property $\Leftrightarrow$ harmonic | ✓ | The two are equivalent (in the continuously differentiable sense) |

## 5. Worked Examples

### Example 1 (Basic: Evaluating with the Mean Value Property)

Problem: Let $u$ be harmonic in the unit disk and continuous on the closed disk, with $u(e^{i\theta}) = \cos\theta$. Find $u(0)$ and give an exact expression for $u(1/2, 0)$.

Analysis: The boundary is known, so apply Poisson's formula directly; at the centre the Poisson kernel reduces to a constant equal to the average.

Solution: By the mean value property the centre value is

$$u(0) = \frac{1}{2\pi}\int_0^{2\pi}\cos\varphi\,d\varphi = 0$$

The same follows from Poisson's formula, where the kernel degenerates to $1/(2\pi)$ at $r = 0$.

For a general point $(r,\theta)$, use Poisson's formula:

$$u(r,\theta) = \frac{1}{2\pi}\int_0^{2\pi} \frac{1 - r^2}{1 - 2r\cos(\theta-\varphi) + r^2}\cos\varphi\,d\varphi$$

Taking $\theta = 0$, the kernel is even about $\varphi = 0$ and $\cos\varphi$ is even too, so $u(r,0) = r\cos 0 = r$. Check: $u = \operatorname{Re}(z) = x$ is plainly harmonic in the unit disk and equals $x = \cos\theta$ on the boundary, so by uniqueness this is the solution. Hence $u(1/2, 0) = 1/2$.

Comment: This problem shows the usual "guess then verify" pattern: observe that the boundary value $\cos\theta$ is exactly the boundary value of the harmonic function $\operatorname{Re}(z)$, and uniqueness gives the interior solution immediately. The mean value property gives a quick computation at the centre.

### Example 2 (Intermediate: Green\'s Function Origin of the Disk Poisson Formula)

Problem: Use the Green's function method to show that the solution of the Dirichlet problem on the unit disk is given by Poisson's formula.

Analysis: By the Green representation, the solution of the harmonic problem $u|_{\partial} = g$ satisfies $u(x) = -\oint_{\partial} g\,\partial_n G\,ds$ with $G$ the disk Green's function. For the disk, $-\partial_n G$ is exactly the Poisson kernel.

Solution: The Green's function of the unit disk is

$$G(x,y) = \frac{1}{2\pi}\ln\frac{|y|\,|x - y^*|}{|x - y|}, \qquad y^* = \frac{y}{|y|^2}$$

Taking its outward normal derivative (radial) with respect to the field point $x$ gives

$$-\frac{\partial G}{\partial n}(x,y) = \frac{1}{2\pi}\cdot\frac{1 - |y|^2}{|x - y|^2}$$

When $x$ is on the boundary ($|x| = 1$) and written in polar coordinates as $x = e^{i\theta},\ y = \rho e^{i\varphi}$, we have $|x - y|^2 = 1 - 2\rho\cos(\theta-\varphi) + \rho^2$, so the Poisson kernel appears:

$$P(\rho,\theta-\varphi) = \frac{1 - \rho^2}{1 - 2\rho\cos(\theta-\varphi) + \rho^2}$$

Substituting into the Green representation gives

$$u(\rho,\theta) = \frac{1}{2\pi}\int_0^{2\pi} P(\rho,\theta-\varphi)\,g(\varphi)\,d\varphi$$

which is exactly Poisson's formula for the disk. The explicit solution of the harmonic equation rests entirely on the same bridge, the Green's function.

Comment: Poisson's formula is the concrete realization of the Green's function on a disk. Note that we reuse the previous chapter's result directly, avoiding a repeated derivation; if the domain is not a disk (a general domain), the Green's function is hard to write explicitly and Poisson's formula has no simple closed form.

### Example 3 (Advanced: Maximum Principle for Uniqueness and Stability)

Problem: Prove that for the Dirichlet problem on the unit disk, if two solutions differ by at most $\varepsilon$ on the boundary, then they differ by at most $\varepsilon$ in the interior.

Analysis: This is stability (continuous dependence). Apply the maximum principle to the difference of the two solutions.

Solution: Let $u_1, u_2$ satisfy boundary data $g_1, g_2$ with $|g_1 - g_2| \le \varepsilon$ on the boundary. Let $w = u_1 - u_2$; then $w$ is harmonic in the disk and $|w| \le \varepsilon$ on the boundary. By the maximum principle the maximum of $w$ inside does not exceed its boundary maximum $\varepsilon$, and its minimum is not less than $-\varepsilon$, so $|w| \le \varepsilon$ on the whole closed disk. The interior error is controlled by the boundary error — the Dirichlet problem is stable.

Further, if $g_1 = g_2$ then $w = 0$ on the boundary, so $w \equiv 0$ and uniqueness is proved. This also shows that a small perturbation of the boundary data produces only a small perturbation of the solution: the problem is well posed.

Comment: This problem takes the maximum principle to its limit. Note that the maximum principle requires the domain to be bounded and the function continuous on the closed domain; missing even one boundary point breaks it (e.g. half-space problems need different techniques).

## 6. Common Mistakes and Pitfalls

1. **Imposing initial conditions on the harmonic equation.** $\Delta u = 0$ has no time variable, so "initial conditions" are meaningless; elliptic equations take boundary-value problems (Dirichlet or Neumann), and imposing initial data leads either to overdetermination or to nonsense.

2. **Believing a harmonic function must be constant.** Only bounded harmonic functions on the whole plane (a Liouville-type result) are forced to be constant; harmonic functions on a bounded domain can be arbitrarily varied, as long as the boundary is prescribed. Confusing "bounded entire function" with "harmonic function on a domain" is a common error.

3. **Getting the sign or the normalization of the Poisson kernel wrong.** The Poisson kernel is always positive and integrates to 1; forgetting the minus sign ($-\partial_n G$) or writing $1 + r^2$ in the numerator breaks the formula at once. In derivations always remember the boundary-fitting condition: $g \equiv 1$ should give $u \equiv 1$.

4. **Ignoring the "centre" premise when using the mean value property.** The mean value formula $u(x_0) = $ circle average holds only when $x_0$ is the centre (of the disk or ball); for an arbitrary interior point use Poisson's formula rather than a simple average.

5. **Confusing the solvability of Dirichlet and Neumann problems.** The Neumann problem $\partial_n u = h$ has the compatibility condition $\oint_{\partial} h\,ds = 0$ (by Gauss's theorem), otherwise there is no solution; the Dirichlet problem has a solution for every $g$ (explicit on a disk).

## 7. Summary and Mnemonics

Key points to review:

- The harmonic equation $\Delta u = 0$ describes a source-free equilibrium (steady temperature, electrostatic potential, irrotational flow potential).
- The mean value property and the maximum principle are the two signatures of harmonic functions: no interior extrema, the boundary decides everything.
- The Dirichlet problem on a disk has an explicit solution — Poisson's formula, with a positive and normalized kernel.
- Maximum principle $\Leftrightarrow$ uniqueness + stability, the guarantee of well-posedness.
- Poisson's formula is the concrete realization of the Green's function on a disk; the two share one source.

**Mnemonic: Laplace for equilibrium, no extrema inside; Poisson decides the interior from the boundary; a positive normalized kernel hugs the boundary.**`,
    keyPoints: [
      'Harmonic equation Δu = 0 describes a source-free equilibrium (steady temperature, electrostatic potential, irrotational flow)',
      'Mean value property and maximum principle: the two signatures of harmonic functions — no interior extrema',
      'The Dirichlet problem on a disk has an explicit solution — Poisson\'s formula, with a positive and normalized kernel',
      'Maximum principle ⇔ uniqueness + stability, the guarantee of well-posedness',
      'Poisson\'s formula is the concrete realization of the Green\'s function on a disk; the two share one source',
    ],
  },

  characteristics: {
    chapter: 'Chapter 7 The Method of Characteristics',
    title: 'The Method of Characteristics for First-Order Equations',
    summary:
      'Walk along the "curves on which information travels" and a first-order PDE degenerates into ODEs — the method of characteristics flattens a PDE into a chain of ODEs.',
    content: String.raw`

The previous chapters dealt with second-order equations, but the family of PDEs also contains an important class of first-order equations. The most elementary first-order linear PDE is the transport equation $u_t + c u_x = 0$: a band of pollutant drifts down a river at speed $c$ without changing shape. To solve for $u$ the key is to find "the curve along which the information travels" — the characteristic. Along a characteristic the original PDE degenerates into an ordinary differential equation, so a high-dimensional difficulty is "flattened" into one dimension.

The method of characteristics is the main weapon for solving first-order (especially first-order quasilinear) PDEs, and the key to understanding the propagation structure of hyperbolic equations (such as the wave equation). This topic starts from the simplest linear transport equation, generalizes to the quasilinear equation $a(x,y,u)u_x + b(x,y,u)u_y = c(x,y,u)$, explains how characteristics turn a PDE into a chain of ODEs, and when and where the initial-value (Cauchy) problem has a solution.

## 2. Rigorous Definitions

The general shape of a first-order quasilinear PDE:

$$a(x,y,u)u_x + b(x,y,u)u_y = c(x,y,u)$$

where $a, b, c$ are known functions. If $c$ is independent of $u$ and $a, b$ depend only on $(x,y)$, the equation is linear; if none of $a, b, c$ contains $u$, it is semilinear.

**Characteristic system** (simultaneous ODEs):

$$\frac{dx}{dt} = a(x,y,u), \qquad \frac{dy}{dt} = b(x,y,u), \qquad \frac{du}{dt} = c(x,y,u)$$

Along the **characteristic curve** $(x(t), y(t), u(t))$ determined by this system, the change of the unknown $u$ is given by the third equation, while the first two determine the projection of the curve onto the plane.

**Cauchy (initial-value) problem**: prescribe $u$ on a non-characteristic curve $\Gamma$ and find a solution of the PDE nearby.

**Basic conclusion of the method of characteristics**: if the initial curve $\Gamma$ is nowhere tangent to a characteristic direction (i.e. $(a,b)$ is not parallel to the tangent of $\Gamma$), then a solution exists and is unique locally; if $\Gamma$ is itself a characteristic curve, the initial data must be compatible with the PDE, otherwise there is no solution.

## 3. Why Defined This Way

**Why do characteristics turn a PDE into an ODE?** In a characteristic direction the directional derivative is $\frac{d}{dt}u = u_x x'(t) + u_y y'(t)$. Taking $x' = a,\ y' = b$ gives, along this direction, $u_x x' + u_y y' = a u_x + b u_y = c = u'$. So the PDE becomes $du/dt = c$ in that direction, an ODE. In other words, a characteristic direction is a direction in which "the PDE degenerates into an ODE" — along it a linear combination of partial derivatives coincides with a total derivative.

**Why must the initial curve not be tangent to a characteristic?** If $\Gamma$ is tangent to a characteristic, the known data along $\Gamma$ already "lie" on the characteristic and cannot supply independent information across it, so the solution cannot be determined uniquely in the transverse direction (or the information is contradictory). Only when $\Gamma$ crosses (is not parallel to) the characteristics can one "fire" a characteristic from each point of $\Gamma$ and cover a neighbourhood with the solution. This is entirely analogous to the dependence of ODE solutions on initial data.

**Why distinguish linear / semilinear / quasilinear?** In the linear case the characteristics depend only on $(x,y)$, not on $u$, so all characteristics are fixed in advance and the solution is unique and globally well behaved; in the quasilinear case the characteristics depend on $u$, which is the unknown, so characteristics and solution are coupled, characteristics may intersect (forming shocks), and the solution ceases to be smooth — this is the origin of nonlinear phenomena.

**Why do shocks (discontinuities) appear?** The characteristics of a quasilinear equation vary with $u$, so characteristics starting from different points may intersect early; at an intersection the same $(x,y)$ corresponds to several values of $u$, the smooth solution breaks down, and weak solutions (discontinuities) must be introduced. This is the mathematical essence of shock waves in traffic flow and gas dynamics.

## 4. Intuition and Pictures

Think of characteristics as "conveyor belts of information": each point of the initial curve launches a belt (a characteristic), and the value of $u$ is carried along it unchanged (linear case) or evolves by a rule (quasilinear). The whole solution is the net woven by these belts. If the belts never cross, the solution is smooth; if two belts collide, the net tears and a shock appears.

For the linear transport equation $u_t + c u_x = 0$ the characteristics are the straight lines $x - ct = $ const, and the solution $u(x,t) = f(x - ct)$ is the initial waveform translated to the right at speed $c$ — no deformation at all, and no diffusion beyond the horizon of propagation.

> Intuition: characteristics are the "spine" of the PDE; along them partial derivatives collapse into ordinary ones; the initial curve must cross this spine for the solution to stand up.

Right or wrong:

| Statement | Correct? | Explanation |
|---|---|---|
| A characteristic is a solution curve | ✗ | It is a curve of information propagation; the solution is the function evolving along it |
| The initial curve can be chosen arbitrarily | ✗ | It must cross the characteristics, otherwise no solution or no uniqueness |
| Characteristics of a linear equation depend on $u$ | ✗ | They depend only on $(x,y)$ and are fixed in advance |
| Quasilinear equations can develop shocks | ✓ | Intersecting characteristics break the smooth solution |
| The method of characteristics applies only to first-order equations | ✓ (this topic) | The characteristic concept for second-order equations is its generalization |

## 5. Worked Examples

### Example 1 (Basic: Linear Transport Equation)

Problem: Solve $u_t + 2 u_x = 0$ with initial value $u(x,0) = \sin x$.

Analysis: First-order linear; the characteristic equations are $dx/dt = 2,\ du/dt = 0$. The characteristics are $x = 2t + x_0$, along which $u$ is constant.

Solution: The characteristic direction is $(x', u') = (2, 0)$. From $dx/dt = 2$ we get $x = 2t + C$, i.e. $x - 2t = $ const (the characteristics). From $du/dt = 0$, $u$ is constant along characteristics, so $u$ depends only on the invariant $x - 2t$:

$$u(x,t) = f(x - 2t)$$

Substituting the initial value $u(x,0) = f(x) = \sin x$ gives

$$u(x,t) = \sin(x - 2t)$$

Check: $u_t = -2\cos(x-2t)$, $u_x = \cos(x-2t)$, $u_t + 2u_x = 0$ ✓; initial value ✓.

Comment: Linear transport is the "hello world" of the method of characteristics. The key is to spot the invariant $x - ct$; the solution is the initial data translated along the characteristics.

### Example 2 (Intermediate: Cauchy Problem for a Quasilinear Equation)

Problem: Solve $u u_x + u_y = 1$ with initial value $u(x,0) = x$.

Analysis: Quasilinear; the characteristic system is $dx/dt = u,\ dy/dt = 1,\ du/dt = 1$. Parametrize from the initial curve $(s, 0, s)$.

Solution: Let the initial parameters be $x(0) = s,\ y(0) = 0,\ u(0) = s$. Solve the characteristic ODEs:

$$\frac{dy}{dt} = 1 \Rightarrow y = t$$

$$\frac{du}{dt} = 1 \Rightarrow u = s + t$$

$$\frac{dx}{dt} = u = s + t \Rightarrow x = s t + \frac{t^2}{2} + s$$

So the parametric solution is: $x = s + st + t^2/2,\ y = t,\ u = s + t$.

Eliminate $s, t$: from $t = y$ we get $x = s(1 + y) + y^2/2$, so $s = \dfrac{x - y^2/2}{1 + y}$ (requiring $y \neq -1$); substituting back into $u = s + y$:

$$u = \frac{x - y^2/2}{1 + y} + y = \frac{x - y^2/2 + y + y^2}{1 + y} = \frac{x + y + y^2/2}{1 + y}$$

Check: $u_x = 1/(1+y)$; $u_y$ is messier but one verifies $u u_x + u_y = 1$ (safer in characteristic form). At $y = 0$, $u = x$ ✓.

Comment: In the quasilinear case the characteristics depend on $u$, so the characteristic curves change with the solution; the parametric form $(x(s,t), y(s,t), u(s,t))$ is often more reliable than the explicit one, and verifying before eliminating the parameters is usually easier. Note that at $y = -1$ the denominator vanishes, corresponding to intersecting characteristics (the solution may break down).

### Example 3 (Advanced: An Initial Curve Tangent to Characteristics Leaves No Solution)

Problem: For the equation $x u_x + y u_y = u$, can the initial curve $x^2 + y^2 = 1$ determine the solution uniquely? What if the curve is $y = x$ instead?

Analysis: The characteristic direction is $(a,b) = (x,y)$, and the characteristics are rays emanating from the origin. Compare the tangent of the initial curve with the characteristic direction.

Solution: The characteristic equations are $dx/x = dy/y = du/u$, giving rays $y/x = $ const as characteristics, along which $u$ varies as $u = C \cdot r$ ($r$ the distance to the origin).

Take the unit circle $x^2 + y^2 = 1$ as the initial curve: at every point of the circle the characteristic direction $(x,y)$ is exactly the normal (radial) direction, while the tangent is $(-y, x)$; the two are not parallel, so the crossing condition holds. Each point of the circle launches a ray characteristic, covering the whole plane (except the origin), and the solution is uniquely determined.

If the initial curve is $y = x$ (a ray through the origin), the curve itself is a characteristic. Along this characteristic $u$ is already determined by the PDE ($u = C r$); if the given initial values do not satisfy this relation there is no solution, and if they do the solution cannot be determined uniquely in the transverse direction (the whole characteristic is fixed, but there is no transverse information). This shows that an initial curve may not be a characteristic curve.

Comment: This problem makes the "crossing condition" concrete geometrically. The unit circle crosses all radial characteristics and is a legitimate initial curve; a ray is itself a characteristic, and using it as an initial curve leads to overdetermination or no solution. To test transversality, compare $(a,b)$ with the tangent of the initial curve.

## 6. Common Mistakes and Pitfalls

1. **Taking the characteristic direction wrong.** When writing the characteristic system as $dx/a = dy/b = du/c$, confusing which is the "parameter direction". The standard procedure introduces a parameter $t$ with $x' = a,\ y' = b,\ u' = c$; the ratio $dx/a = dy/b$ gives the planar projection of the characteristics and must be combined with $du/c$.

2. **Not noticing that the initial curve is tangent to a characteristic.** Applying the formula and producing a "solution" without checking transversality. First test $(a,b)\cdot \tau = 0$ ($\tau$ the tangent of the initial curve); if it holds, a compatibility condition is needed, otherwise there is no solution.

3. **Treating a quasilinear equation as linear.** Assuming the characteristics are fixed in advance and thereby missing the intersection of characteristics (shocks). In the quasilinear case the characteristics depend on $u$, so $u$ must be tracked to draw them correctly.

4. **Ignoring the domain and singularities when eliminating parameters.** In Example 2, $y = -1$ is a zero of the denominator, corresponding to intersecting characteristics; the solution fails near that line. When writing an explicit solution, always mark its domain of validity.

5. **Taking a characteristic for a solution curve.** A characteristic is the trajectory of information propagation in the $(x,y)$ plane; the solution is the function value $u$ evolving along it. The two must not be confused.

## 7. Summary and Mnemonics

Key points to review:

- The first-order quasilinear PDE $a u_x + b u_y = c$ degenerates into a chain of ODEs along characteristic directions.
- Characteristic system $x' = a,\ y' = b,\ u' = c$; in the linear case the characteristics depend only on $(x,y)$, in the quasilinear case on $u$.
- The Cauchy problem requires the initial curve to cross the characteristics, otherwise there is no solution or no uniqueness.
- Characteristics of a quasilinear equation may intersect, forming shocks; the smooth solution breaks down and weak solutions are needed.
- The method of characteristics is the basic tool for understanding the propagation structure of hyperbolic equations.

**Mnemonic: First-order equations look for characteristics; partial derivatives collapse into ordinary ones; only a crossing initial curve works; quasilinear equations raise the storm.**`,
    keyPoints: [
      'A first-order quasilinear PDE a u_x + b u_y = c degenerates into a chain of ODEs along characteristic directions',
      'Characteristic system x′ = a, y′ = b, u′ = c; linear characteristics depend only on (x,y), quasilinear ones on u',
      'The Cauchy problem requires the initial curve to cross the characteristics, otherwise no solution or no uniqueness',
      'Quasilinear characteristics may intersect, forming shocks; the smooth solution breaks down and weak solutions are needed',
      'The method of characteristics is the basic tool for understanding the propagation structure of hyperbolic equations',
    ],
  },
};

export default map;
