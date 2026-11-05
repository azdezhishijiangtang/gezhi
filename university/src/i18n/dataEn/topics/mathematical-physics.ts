import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'mp-analytic-functions': {
    chapter: 'Chapter 1 Complex Functions and Analytic Functions',
    title: 'Analyticity and the C-R Conditions',
    summary:
      'Analyticity is the central concept of complex analysis; the Cauchy–Riemann conditions turn "differentiable" into a system of partial differential equations for the real and imaginary parts, and reveal the deep link between analytic functions and two-dimensional harmonic functions.',
    keyPoints: [
      'The three representations of a complex number (algebraic, trigonometric, exponential) and the multivaluedness of the argument',
      'Differentiability of a complex function requires the quotient to have the same limit as Δz tends to zero along any direction — far stronger than for real functions',
      'Definition of analyticity: differentiable at a point and in a neighbourhood of it; the C-R conditions are necessary and sufficient (together with continuity or differentiability of the partial derivatives)',
      'f(z)=u+iv is analytic ⟺ u, v are differentiable and satisfy u_x=v_y, u_y=−v_x',
      'The real and imaginary parts of an analytic function are both harmonic, and each is the harmonic conjugate of the other',
      'From a known real part, the imaginary part can be recovered by integrating the C-R conditions, reconstructing the analytic function',
    ],
    content: String.raw`

In university courses on physics and theoretical physics we meet this situation again and again: a real integral that looks hopeless, such as $\int_{-\infty}^{+\infty} \frac{dx}{1+x^2}$ and its many generalizations, suddenly becomes trivial after "going around a loop" in the complex plane; a series whose convergence or divergence on the real axis is a tangle becomes obviously controlled by the nearest singularity in its complex form; and the whole information of a two-dimensional electrostatic field, an ideal fluid's plane flow or a steady temperature field turns out to be packed into a single complex function. The root of all this is the extremely strong structural requirement of analyticity in complex analysis: the real and imaginary parts of an analytic function are locked together by a system of equations, and neither can vary independently.

In real analysis a function is differentiable as soon as its "left and right derivatives exist and are equal" at every point, and the two variables $x$ and $y$ (for a function of two variables) may go their separate ways. In complex analysis, although the variable $z$ also has two degrees of freedom, the limiting process requires that as $\Delta z = \Delta x + i\,\Delta y$ tends to zero along **any direction**, the quotient $\frac{\Delta w}{\Delta z}$ tends to the same number. Approaching along the real axis and along the imaginary axis give two different constraints, and combining them yields the famous Cauchy–Riemann equations. Because of this "any direction" requirement, a complex function that is differentiable at a point is automatically infinitely differentiable and expandable in a power series — none of which holds in real analysis. Analytic functions may be called the most "rigid" and harmonious class in the world of functions, and the task of this lecture is to characterize that rigidity precisely.

## 2. Complex Numbers and the Basic Language of Complex Functions

A complex number $z$ has three equivalent forms: the algebraic form $z = x + iy$, the trigonometric form $z = r(\cos\theta + i\sin\theta)$, and the exponential form $z = r e^{i\theta}$, where $r = |z| = \sqrt{x^2 + y^2}$ is the modulus and $\theta = \arg z$ the argument. Pay particular attention to the **multivaluedness of the argument**: given $z \neq 0$, there are infinitely many $\theta$ satisfying the requirement, differing by integer multiples of $2\pi$. The one lying in $(-\pi, \pi]$ is usually called the principal value $\arg z$, and the whole family is written

$$\mathrm{Arg}\, z = \arg z + 2k\pi, \quad k = 0, \pm 1, \pm 2, \ldots$$

This multivaluedness is the direct source of the multivaluedness of the complex logarithm $\ln z = \ln r + i\,\mathrm{Arg}\,z$, and the starting point for the later study of branches and branch cuts of multivalued functions. Using the exponential form, the geometry of multiplication and division is immediate: moduli multiply and divide, arguments add and subtract, i.e. $|z_1 z_2| = |z_1||z_2|$ and $\arg(z_1 z_2) = \arg z_1 + \arg z_2$.

Replace "a set of complex numbers" by "a function of a complex number" and we get a complex function $w = f(z)$: to each $z = x + iy$ in a region $D$ a complex number $w = u + iv$ is assigned by some rule. Since $u$ and $v$ are both real functions of $x, y$, a complex function is equivalent to **a pair of real functions of two variables**:

$$w = f(z) = u(x, y) + i\,v(x, y)$$

Geometrically, $f$ maps points of the $z$-plane (the plane of the independent variable) to points of the $w$-plane (the plane of values). We may therefore speak of the image of a curve under the map, of conformal transformations between regions, and similar intuitive pictures. For example $w = z^2$ doubles the angle of an angular sector, and $w = e^z$ maps a horizontal strip to an angular sector. This "two planes" viewpoint is the second feature distinguishing complex from real analysis: a function is not merely a correspondence of numbers but a geometric transformation.

## 3. Derivatives and Analytic Functions

The derivative of a complex function at a point $z_0$ looks exactly like that of a real function:

$$f'(z_0) = \lim_{\Delta z \to 0} \frac{f(z_0 + \Delta z) - f(z_0)}{\Delta z}$$

The crucial difference hides in the limiting process: here $\Delta z$ is a complex number, it may tend to zero along any path and in any manner, and the limit must be **independent of the path**. This is a much stricter requirement than for real functions. Two counterexamples. First, $f(z) = \mathrm{Re}\,z = x$: along the real axis $\Delta z = \Delta x$ the quotient is always $1$; along the imaginary axis $\Delta z = i\,\Delta y$ it is always $0$. The two directions give different limits, so $f$ is nowhere differentiable. Second, $f(z) = \bar z = x - iy$: one likewise verifies that it is nowhere differentiable. In the eyes of real analysis these functions are "as smooth as can be" (in one variable they are $f(x)=x$), yet in complex analysis they are nowhere differentiable — witness how strong complex differentiability is.

**The definition of analyticity** has two levels. If $f$ is **differentiable everywhere in a neighbourhood** of $z_0$, then $f$ is analytic at $z_0$; if $f$ is analytic at every point of a region $D$, then $f$ is analytic in $D$. The distinction between "differentiable at a point" and "analytic at a point" must be memorized: differentiability is a local property at a single point, while analyticity requires a whole patch around that point to be differentiable. For example $f(z) = |z|^2 = x^2 + y^2$ can be checked to be differentiable at the single point $z = 0$, but not everywhere in any neighbourhood containing $0$, so it is not analytic at $0$ (the usual phrasing: $0$ is an isolated point of differentiability but not a point of analyticity). As with real functions, sums, differences, products and quotients (with nonzero denominator) of analytic functions, and composites of analytic functions, are again analytic, which lets us judge the analyticity regions of elementary functions one by one: polynomials are analytic in the whole plane, rational functions where the denominator is nonzero, $e^z$, $\sin z$, $\cos z$ in the whole plane, while $\ln z$ and $z^\alpha$ (for non-integer $\alpha$) are analytic only on single-valued branches after "cutting the plane," because of the multivalued argument.

## 4. The Cauchy–Riemann Conditions

Let $f(z) = u(x,y) + i\,v(x,y)$. We now translate "the limit is the same in every direction" into conditions on the partial derivatives of $u, v$. Let $\Delta z$ tend to zero along the **real axis** ($\Delta z = \Delta x$):

$$f'(z) = \lim_{\Delta x \to 0} \frac{[u(x+\Delta x, y) - u(x,y)] + i[v(x+\Delta x, y) - v(x,y)]}{\Delta x} = u_x + i\,v_x$$

Then let $\Delta z$ tend to zero along the **imaginary axis** ($\Delta z = i\,\Delta y$):

$$f'(z) = \lim_{\Delta y \to 0} \frac{[u(x, y+\Delta y) - u(x,y)] + i[v(x, y+\Delta y) - v(x,y)]}{i\,\Delta y} = v_y - i\,u_y$$

Equating the two and comparing real and imaginary parts gives

$$\boxed{\;u_x = v_y, \qquad u_y = -v_x\;}$$

These are the **Cauchy–Riemann equations**, abbreviated as the C-R conditions. The precise theorem reads: $f(z) = u + iv$ is differentiable at a point $z$ **if and only if** $u, v$ are differentiable there and satisfy the C-R conditions; the derivative is then $f'(z) = u_x + i\,v_x = v_y - i\,u_y$. If in addition $u_x, u_y, v_x, v_y$ are continuous in a region $D$ (so that $u, v$ are differentiable) and the C-R conditions hold throughout $D$, then $f$ is analytic in $D$. In examinations and physical applications it is this system of partial differential equations that is used most: deciding analyticity, computing derivatives, building the imaginary part from the real part — all revolve around it. In polar coordinates ($z = r e^{i\theta}$) the C-R conditions become

$$\frac{\partial u}{\partial r} = \frac{1}{r}\frac{\partial v}{\partial \theta}, \qquad \frac{1}{r}\frac{\partial u}{\partial \theta} = -\frac{\partial v}{\partial r}$$

For circular domains or radial problems the polar form is often more convenient.

Why are the C-R conditions so strong? The geometric explanation: at a point of differentiability an analytic function maps infinitesimal circles to infinitesimal circles (preserving angles, i.e. "conformal"), unless the derivative vanishes there. The equations $u_x = v_y$ and $u_y = -v_x$ are exactly equivalent to the Jacobian matrix having the "rotation plus scaling" structure $\begin{pmatrix} a & -b \\ b & a \end{pmatrix}$, which is the algebraic expression of conformality. Hence "analytic" means geometrically **a conformal map**, and this is the geometric root of its role in fluid mechanics and electromagnetism.

## 5. Harmonic Functions and Harmonic Conjugates

Let $f = u + iv$ be analytic in a region $D$ with $u, v$ having continuous second partial derivatives. Differentiate the C-R conditions once more: $u_{xx} = v_{yx}$ and $u_{yy} = -v_{xy}$; adding (mixed partials are equal) gives at once

$$u_{xx} + u_{yy} = 0$$

and $v$ satisfies the same equation. A function of two variables satisfying the Laplace equation

$$\nabla^2 \varphi \equiv \varphi_{xx} + \varphi_{yy} = 0$$

is called **harmonic**. Hence an important conclusion: **the real and imaginary parts of an analytic function are both harmonic**. The converse fails: take two harmonic functions at random and form $u + iv$, and in general it is not analytic — they must be "paired" by the C-R conditions. If $v$ happens to be the C-R partner of $u$ (that is, $u, v$ are differentiable and satisfy the C-R conditions), then $v$ is called the **harmonic conjugate** of $u$. Physically, two-dimensional electrostatic potentials, steady temperature distributions and ideal fluid velocity potentials are all harmonic; an analytic function $f = u + iv$ carries two families of physical fields at once: $u$ may be read as the family of equipotential lines and $v$ as the family of field (stream) lines, and the two families are everywhere orthogonal — seen directly from $\nabla u \cdot \nabla v = u_x v_x + u_y v_y = u_x(-u_y) + u_y u_x = 0$. This is the theoretical basis of the complex potential method.

**Constructing an analytic function from its real part** is the standard computation of this lecture. Given a harmonic function $u(x,y)$, find $v$ such that $f = u + iv$ is analytic. The steps are: write $v_y = u_x$ from the C-R conditions and integrate in $y$ to get $v(x,y) = \int u_x\, dy + g(x)$, where the integration treats $x$ as a constant; substitute the result into the other equation $v_x = -u_y$ to determine the unknown function $g(x)$; finally assemble $f(z) = u + iv$ and replace $x, y$ by $z$ (using the substitution $x = \frac{z + \bar z}{2}$; inside an analytic function $\bar z$ eventually cancels). A complete example: take $u = x^2 - y^2$ and check $u_{xx} + u_{yy} = 2 - 2 = 0$, so it is harmonic. From $v_y = u_x = 2x$ we get $v = 2xy + g(x)$; then $v_x = 2y + g'(x)$ must equal $-u_y = 2y$, giving $g'(x) = 0$ and $g = C$. Hence $f = (x^2 - y^2) + i(2xy + C) = z^2 + iC$. This procedure is drilled systematically in the worked examples.

## 6. Analyticity of Elementary Functions and Summary

Finally, list the analyticity regions of the common elementary functions as a "ledger" for decisions. The exponential function $e^z = e^x(\cos y + i \sin y)$ is analytic in the whole plane, with $e^{z + 2\pi i} = e^z$, i.e. period $2\pi i$; the trigonometric functions $\sin z = \frac{e^{iz} - e^{-iz}}{2i}$ and $\cos z = \frac{e^{iz} + e^{-iz}}{2}$ are analytic in the whole plane, but $\sin z$ is no longer bounded ($|\sin z|$ can be arbitrarily large), quite unlike the real case. The logarithm $\ln z = \ln r + i\,\mathrm{Arg}\,z$ is multivalued; removing a ray from the origin as a cut (say along the negative real axis) yields a single-valued branch, and each branch is analytic on the cut plane. The power function $z^\alpha = e^{\alpha \ln z}$ is analytic in the whole plane when $\alpha$ is an integer (excluding the origin when $\alpha$ is a negative integer), and for fractional $\alpha$ again needs a cut plane and a choice of branch.

To summarize the logical thread of this lecture: a complex function = a pair of real functions of two variables; the strong condition "differentiable in every direction" ⟹ the C-R equations; the C-R conditions (plus differentiability) ⟹ analyticity; analytic ⟹ real and imaginary parts are harmonic and conjugate to each other; conversely a harmonic function determines its conjugate uniquely (up to a constant) via the C-R conditions, reconstructing the analytic function. This chain "differentiable → C-R → analytic → harmonic" is the starting point of the whole theory of complex functions and the foundation of the Cauchy integral theorem and the residue method in the next lecture.

## 7. Typical Pitfalls and a Self-Check List

The concepts of this lecture look simple but are misused extremely often; listing the common pitfalls and checking them one by one is the best way to test mastery. **Pitfall one: mistaking "differentiable at a point" for "analytic at a point."** Analyticity requires differentiability everywhere in a whole neighbourhood of the point; $f(z) = |z|^2$ is differentiable at the origin but not analytic there; to decide "analytic at $z_0$" one must examine a patch around $z_0$, not just $z_0$ itself. **Pitfall two: using the C-R conditions alone as a sufficient condition.** Two partial derivatives existing at a point and satisfying C-R do not guarantee differentiability there — one also needs $u, v$ to be differentiable (for instance the four partial derivatives continuous). The standard counterexample is a function built like $f(z) = \frac{xy^2}{x^2+y^2}$: the limits along the real and imaginary axes agree, so it appears to satisfy a "modified C-R," but along a slant direction the limit changes. The standard formulation in examinations is "the partial derivatives are continuous and satisfy the C-R conditions, hence the function is analytic"; neither condition can be omitted, and only when continuity of the partials is obvious (polynomials, exponentials) may it be skipped. **Pitfall three: misreading "harmonic conjugate" as "the harmonic function with a minus sign."** "$v$ is the harmonic conjugate of $u$" means the pairing under which $u + iv$ is analytic, not $v = -u$; the relation is also asymmetric — if $v$ is conjugate to $u$, then $-u$ is conjugate to $v$, the order being fixed by the signs in the C-R conditions. **Pitfall four: forgetting the unknown function $g(x)$ when integrating to get $v$ from $u$.** When integrating in $y$, any function of $x$ disappears under $\partial/\partial y$, so $g(x)$ must be retained and determined from the second C-R equation; omitting it leaves the imaginary part incomplete. **Pitfall five: dropping the factor $r$ in the polar C-R conditions.** Both polar equations carry a factor $1/r$, and the formulas fail at $r = 0$ (one must return to Cartesian coordinates to handle the origin); in circular-domain problems the differentiability at the origin must be discussed separately.

Another beautiful result worth remembering is the **maximum principle for harmonic functions**: a nonconstant harmonic function attains neither a maximum nor a minimum in the interior of a region; extrema can only occur on the boundary. Its complex-analytic proof is minimal — $u$ is the real part of an analytic function $f = u + iv$, and the modulus $|f|$ obeys the maximum modulus principle; a "shift and scale" trick on the modulus yields the maximum principle for $u$. This principle is precisely the core tool in the uniqueness proof for the Dirichlet problem for Laplace's equation in Chapter 6: the difference of two solutions vanishes on the boundary, so by the maximum principle it vanishes identically inside. The physical intuition matches perfectly: the hottest point of a steady temperature field must lie on the boundary — an isolated hot spot in the interior would immediately lose heat to its surroundings, contradicting "steady state." One last item on the concept checklist: given $u(x, y)$, verify $\nabla^2 u = 0$ before constructing $v$; the order cannot be reversed — a non-harmonic $u$ cannot be paired into an analytic function no matter how you try, and the C-R equations are then an unsolvable system.`,
  },

  'complex-integration': {
    chapter: 'Chapter 2 Complex Integration and Residues',
    title: 'Contour Integration Techniques',
    summary:
      'The Cauchy integral theorem and the residue theorem reduce a complex integral to local information at singularities, making contour integration a powerful tool for evaluating real integrals and summing series.',
    keyPoints: [
      'Definition of the complex integral and the ML inequality: |∮f dz| ≤ ML is the cornerstone of all estimates',
      'Analytic in a simply connected region ⟹ the integral along any closed curve vanishes (Cauchy–Goursat), and the integral is path-independent',
      'The Cauchy integral formula and derivative formula turn values and derivatives at interior points into boundary integrals',
      'Residue theorem: ∮f dz = 2πi × (sum of residues at the isolated singularities inside the contour)',
      'Simple pole: Res f = lim (z−z₀)f(z); for a pole of order m there is a general limit formula',
      'Three standard contour schemes: improper integrals of rational functions, trigonometric integrals, and Fourier-type integrals containing e^{imx}',
    ],
    content: String.raw`

A complex integral is an integral along a curve in the complex plane. Let $C$ be a directed smooth curve on which $f(z)$ is defined. Partition $C$ arbitrarily, choose a point $\zeta_k$ in each small piece, and form the sum $\sum_k f(\zeta_k)\,\Delta z_k$ (note that the increments $\Delta z_k = z_k - z_{k-1}$ are **complex**); if this sum has a limit as the partition is refined indefinitely, the limit is called the integral of $f$ along $C$:

$$\int_C f(z)\, dz = \lim \sum_k f(\zeta_k)\, \Delta z_k$$

For actual computation, parametrizing the curve is the most reliable route: let $z = z(t)$ with $t$ from $\alpha$ to $\beta$; then $\int_C f\, dz = \int_\alpha^\beta f(z(t))\, z'(t)\, dt$, a one-variable definite integral. A complex integral carries two layers of information at once, a "path integral of the real part" and one of the imaginary part:

$$\int_C f\, dz = \int_C (u\, dx - v\, dy) + i \int_C (v\, dx + u\, dy)$$

The basic estimate (**ML inequality**) is used over and over: if $|f(z)| \le M$ along the curve and the curve has length $L$, then

$$\left| \int_C f(z)\, dz \right| \le M L$$

Crude as it looks, in contour integration the integral over a large arc is usually shown to tend to zero precisely by the ML argument "the growth of the denominator beats the numerator, plus the growth of the arc length."

## 2. The Cauchy Integral Theorem: Path Independence for Analytic Functions

The central theorem of this lecture: if $f(z)$ is analytic in a **simply connected region** $D$ and $C$ is any (simple) closed curve in $D$, then

$$\oint_C f(z)\, dz = 0$$

This is the Cauchy–Goursat theorem. Its immediate corollary: in a simply connected region the integral of an analytic function is **independent of the path** and depends only on the endpoints; hence an "antiderivative" can be defined — if $F'(z) = f(z)$ then $\int_{z_1}^{z_2} f\, dz = F(z_2) - F(z_1)$, formally the same as the Newton–Leibniz formula. This shows that the only possible culprit making a closed-contour integral of an analytic function nonzero is **a singularity inside the region** (or a contour enclosing one). The focus of complex integration therefore shifts naturally to "what do singularities contribute?"

If the region is **multiply connected** (an annulus, say, or a contour with holes outside), the composite contour theorem takes over: let $C$ be the outer boundary, $C_1, \ldots, C_n$ the holes on the inner boundaries, and $f$ analytic on the closed region they bound; then the outer integral equals the sum of the inner integrals (the inner boundaries taken clockwise):

$$\oint_C f\, dz = \sum_{k=1}^n \oint_{C_k} f\, dz$$

Intuitively: the integral over the outer loop can be "shrunk and deformed" onto the edges of the holes, because the part lying in the analytic region contributes zero. This theorem is what legitimizes continuously deforming a contour from one shape to another; the "freedom to deform" in contour integration rests entirely on it.

## 3. The Cauchy Integral Formula and the Derivative Formula

The strongest application of Cauchy's theorem is: **the values inside a region are completely determined by the boundary values**. Let $f$ be analytic inside the region bounded by a closed curve $C$ and continuous on $C$, and let $z_0$ be any interior point. Then

$$f(z_0) = \frac{1}{2\pi i} \oint_C \frac{f(z)}{z - z_0}\, dz$$

This is the Cauchy integral formula. It shows that analytic functions have extreme internal rigidity: knowing the boundary values fixes the value at every interior point (the maximum modulus principle and uniqueness theorem for harmonic functions both stem from this). A handy way for physics students to remember it: the integrand $\frac{f(z)}{z - z_0}$ has its singularity at $z_0$, and the formula says "the contribution of this singularity picks out exactly the value of $f$ at $z_0$."

More striking still, differentiating both sides formally at $z_0$ any number of times (differentiation may be moved inside the integral sign) gives the **derivative formula**:

$$f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_C \frac{f(z)}{(z - z_0)^{n+1}}\, dz$$

Its theoretical significance is profound: the left side shows that once $f$ is differentiable once (analytic), all derivatives exist and are still analytic — an analytic function is automatically infinitely differentiable, a property real functions never have; the right side provides a practical calculator: whenever the integrand of a contour integral has the form $\frac{g(z)}{(z - z_0)^{n+1}}$ with $g$ analytic, the integral equals $\frac{2\pi i}{n!} g^{(n)}(z_0)$. In the worked examples, integrals such as $\oint \frac{e^z}{(z-1)^2} dz$ are computed by applying this directly.

## 4. The Residue Theorem: Reducing Integrals to Local Data at Singularities

Expand an analytic function near an isolated singularity in a Laurent series (detailed in the next lecture); the coefficient of the term of degree minus one is called the **residue** at that point:

$$\mathrm{Res}\, f(z)\big|_{z = z_0} = c_{-1} = \frac{1}{2\pi i} \oint_{C_\varepsilon} f(z)\, dz$$

where $C_\varepsilon$ is a small circle around $z_0$. The residue theorem is the summit of this lecture: let $f$ be analytic inside a closed curve $C$ except at finitely many isolated singularities $z_1, \ldots, z_n$, and continuous on $C$. Then

$$\boxed{\;\oint_C f(z)\, dz = 2\pi i \sum_{k=1}^n \mathrm{Res}\, f(z)\big|_{z = z_k}\;}$$

The idea of the proof is the composite contour theorem: deform the contour continuously into small circles around the singularities; the integral over each small circle is exactly $2\pi i\, c_{-1}$ by the definition of the residue, while the terms with positive powers and with negative powers of higher order integrate to zero around a circle (one can check term by term: $\oint (z - z_0)^m dz$ equals $2\pi i$ only for $m = -1$ and vanishes otherwise — which is also why $c_{-1}$ is singled out). The residue theorem compresses a global integration problem into algebraic computation at a few points, and its power shows up everywhere in physics: pole expansions of Green's functions, residue representations of propagators, and singularity analysis of the $S$-matrix in quantum field theory are all, in essence, the residue theorem.

## 5. Computing Residues at Various Singularities

Whether the residue theorem is convenient depends on how quickly residues can be computed. There are three cases by type of singularity.

**Simple pole** (most common): if $z_0$ is a simple pole, then

$$\mathrm{Res}\, f\big|_{z_0} = \lim_{z \to z_0} (z - z_0)\, f(z)$$

If $f(z) = \frac{P(z)}{Q(z)}$ with $P(z_0) \neq 0$ and $Q$ having a simple zero at $z_0$ ($Q'(z_0) \neq 0$), the faster formula is $\mathrm{Res} = \frac{P(z_0)}{Q'(z_0)}$. For example $f = \frac{1}{z^2 + 1}$ at $z = i$: $\mathrm{Res} = \frac{1}{2z}\big|_{z=i} = \frac{1}{2i}$.

**Poles of order two and higher**: if $z_0$ is a pole of order $m$, then

$$\mathrm{Res}\, f\big|_{z_0} = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}} \left[ (z - z_0)^m f(z) \right]$$

For example $f = \frac{1}{(z^2+1)^2}$ has a second-order pole at $z = i$, and $\mathrm{Res} = \lim \frac{d}{dz}\left[\frac{1}{(z+i)^2}\right] = \lim \frac{-2}{(z+i)^3} = \frac{-2}{(2i)^3} = \frac{1}{4i}$. This example is used in full in the worked examples to compute a real integral.

**Removable and essential singularities**: at a removable singularity the Laurent expansion has no negative powers, so the residue is zero; an essential singularity has no general limit formula, and one usually expands in a Laurent series and reads off $c_{-1}$. For example $e^{1/z} = 1 + \frac{1}{z} + \frac{1}{2!\,z^2} + \cdots$ has an essential singularity at $z = 0$ with residue $1$ (from the $\frac{1}{z}$ term).

**The point at infinity** (optional but often used in contour estimates): $\mathrm{Res}\, f\big|_{\infty} = \frac{1}{2\pi i}\oint_{C^+} f\, dz$ (with $C^+$ a clockwise small circle, equivalent to $-\mathrm{Res}\, \frac{1}{t^2} f(1/t)\big|_{t=0}$), and the sum of all residues on the whole plane (including infinity) is zero. When a contour encloses too many singularities, "computing outside the contour instead" plus the point at infinity is often faster.

## 6. Evaluating Real Integrals with the Residue Theorem

The most splendid application of the residue theorem turns three classes of real integrals into contour integrals.

**First class: infinite integrals of rational functions.** Compute $\int_{-\infty}^{+\infty} R(x)\, dx$, where the degree of the denominator of $R$ exceeds that of the numerator by at least two and there are no poles on the real axis. The scheme: add a large semicircle $C_R$ in the upper half-plane to form a closed contour; use the ML inequality to show the integral over the large arc tends to zero; then the real-axis integral equals $2\pi i \times$ (sum of residues at all poles in the upper half-plane). For example

$$\int_{-\infty}^{+\infty} \frac{dx}{1 + x^2} = 2\pi i \cdot \frac{1}{2i} = \pi$$

The versions with trigonometric factors, $\int_{-\infty}^{+\infty} R(x)\cos mx\, dx$ and $\int R(x)\sin mx\, dx$, are the real and imaginary parts of the complex integral $\int R(z) e^{imz} dz$, with the **Jordan lemma** (for $m > 0$, $\left|\int_{C_R} R(z) e^{imz} dz\right| \to 0$ over the large upper semicircle, using the decay of $|e^{imz}| = e^{-my}$) replacing the simple ML argument. Note the convention: use the upper half-plane for $m > 0$ and the lower half-plane for $m < 0$; the sign must not be flipped.

**Second class: trigonometric rational integrals on $[0, 2\pi]$.** To compute $\int_0^{2\pi} R(\cos\theta, \sin\theta)\, d\theta$, substitute $z = e^{i\theta}$: as $\theta$ runs from $0$ to $2\pi$, $z$ goes once around the unit circle, and

$$\cos\theta = \frac{z + z^{-1}}{2}, \qquad \sin\theta = \frac{z - z^{-1}}{2i}, \qquad d\theta = \frac{dz}{iz}$$

so the trigonometric integral becomes a contour integral of a rational function over the unit circle, and the residue theorem applies.

**Third class: integrals with singularities on the real axis.** If there is a pole on the real axis (e.g. $\int_0^\infty \frac{\sin x}{x} dx$), the singularity must be "dodged" with a small semicircle (in the principal-value sense); the contribution of the small semicircle is exactly $-i\pi \times$ the residue there, which leads to the **generalized residue theorem**: principal value integral $= 2\pi i \times$ (sum of residues off the real axis in the upper half-plane) $+ \pi i \times$ (sum of residues on the real axis). Such techniques are routine when computing damped Green's functions and causal propagators.

To summarize the chain of this lecture: Cauchy's theorem (analytic implies zero integral) ⟹ the integral depends only on the singularities ⟹ the Cauchy integral formula (the explicit form for a simple pole) ⟹ the residue theorem (the unified form for arbitrary isolated singularities) ⟹ contour schemes for the three classes of real integrals. With this flow mastered, half of all mathematical-physics integral problems have a unified template.

## 7. Choosing a Method and a Checklist of Common Errors

Contour integration is an "engineering" activity with a great deal of discipline about directions and signs beyond the templates, so the error-prone points deserve a clean sweep. **Error one: contour direction and sign.** The residue theorem's formula assumes the contour runs **counterclockwise** (positively); a contour in the lower half-plane usually runs clockwise and automatically picks up an extra minus sign. Practical advice: write down the contour direction before writing the formula, and draw a picture for mixed problems. **Error two: choosing upper or lower half-plane.** When computing integrals of the form $\int R(x) e^{imx} dx$, one must take $m > 0$ with the upper half-plane and $m < 0$ with the lower half-plane, because $|e^{imz}| = e^{-m\,\mathrm{Im}\,z}$ needs **exponential decay** to suppress the integral over the large arc: in the upper half-plane $\mathrm{Im}\,z > 0$, so only $m > 0$ decays. Using the upper half-plane when $m < 0$ leaves the large-arc integral nonzero and the whole argument collapses. **Error three: missing poles on the real axis.** When the integrand has a pole on the real axis, the standard "sum of residues in the upper half-plane" formula does not apply; one must detour around a small semicircle and add $\pi i \times$ the residue (the principal-value correction). The computation of $\int_0^\infty \frac{\sin x}{x} dx$ in the examples is exactly this route; applying the formula directly loses half the contribution. **Error four: getting the order of the pole wrong.** In the formula for a pole of order $m$, the factor $(m-1)!$ and the number of derivatives $m-1$ are often confused; a safer habit is to determine the order of the pole first (from the order of the zero of the denominator) and then choose the formula — for a simple pole prefer $\frac{P(z_0)}{Q'(z_0)}$, which almost never fails. **Error five: deforming the path across a singularity.** The composite contour theorem allows continuous deformation of the contour, but it **may not cross a singularity**; before and after deformation the contour must enclose the same set of singularities, which is the only guarantee that the sum of residues is unchanged. Mark the singularities when drawing, and confirm they stay on the same side of the contour.

**A decision tree for method selection** is also worth fixing in memory. If the target is $\int_{-\infty}^{+\infty} R(x)\, dx$ (rational, denominator two degrees higher): add a large upper semicircle and use ML. If the target is $\int_0^{2\pi} R(\cos\theta, \sin\theta) d\theta$: substitute $z = e^{i\theta}$ and use the unit circle. If the target is $\int R(x)\cos mx\, dx$ or the sine version: convert to the complex integral $e^{imx}$ and take real or imaginary parts, with the Jordan lemma suppressing the arc. If the target is $\int_0^\infty \frac{\sin x}{x} dx$, $\int_0^\infty \frac{\ln x}{1+x^2} dx$ and similar integrals "with branch points or real-axis singularities": detour and use a branch of a multivalued function (these are advanced material; the idea is "logarithmic branch cut plus keyhole contour"). One last theoretical viewpoint: why is the residue exactly $c_{-1}$? Parametrize the circle as $z = z_0 + \varepsilon e^{i\theta}$ and integrate term by term; $\oint (z - z_0)^n dz$ gives $2\pi i$ for $n = -1$ and zero for all other $n$ — the power minus one is the only one whose integral does not vanish. This "miraculously surviving term" is the finest specimen of the structural beauty of complex analysis, and it explains why residues are ubiquitous: every effect that accumulates by going around a loop (poles of propagators, dispersion relations, the Kramers–Kronig relations) has this $2\pi i\, c_{-1}$ as its mathematical core.

Two further perspectives, more advanced but more often used. **Perspective one: "the boundary determines the interior" in the Cauchy formula, and the mean value property.** Take $C$ to be the circle with centre $z_0$ and radius $R$; the Cauchy integral formula gives $f(z_0) = \frac{1}{2\pi}\int_0^{2\pi} f(z_0 + R e^{i\theta})\, d\theta$ — **the value of an analytic function at the centre equals the arithmetic mean of its values on the circle** (the mean value property). This is the purest expression of "boundary values determine the interior," and the same property for harmonic functions reappears in the Poisson formula in Chapter 6; it also yields the maximum modulus principle immediately: an average cannot exceed the maximum, and equality forces the function to be constant. **Perspective two: residues and series working together.** When a contour encloses many singularities, think one step ahead before computing residues one by one: can the integrand be decomposed into partial fractions? After splitting $\frac{1}{(z^2+1)^2}$ into $\frac{1}{4}\left[ \frac{1}{(z-i)^2} + \frac{1}{z-i} - \frac{1}{(z+i)^2} + \frac{1}{z+i} \right]$ (with coefficients determined by undetermined coefficients), the residues at each pole are read off directly, faster and less error-prone than the second-order pole formula. Partial fractions play the same role in contour integration as geometric series in Laurent expansion — both are techniques for breaking complex structures into standard parts. A final study suggestion: the density of methods in this lecture is high, and understanding is not the same as fluency; work through "definition of the complex integral → Cauchy's theorem → Cauchy integral formula → residue theorem → three classes of real integrals" by hand, deriving and computing one example each, and in particular carry out step by step the differentiation details for second-order poles in the examples — the reliability of the residue method rests entirely on the accuracy of these basic moves.`,
  },

  'mp-power-series': {
    chapter: 'Chapter 3 Power Series Expansions',
    title: 'Taylor and Laurent Expansions',
    summary:
      'The circle of convergence fixes the territory of a power series: inside the disc it is a Taylor expansion, inside an annulus a Laurent expansion with negative powers, and the presence and number of negative powers classify the singularities completely.',
    keyPoints: [
      'A power series has a circle of convergence: |z−z₀|<R converges absolutely, and R is determined by the coefficients (ratio or root test)',
      'Taylor theorem: an analytic function inside a disc expands in a Taylor series, with radius up to the nearest singularity',
      'Laurent theorem: an analytic function in an annulus expands in a two-sided series with positive and negative powers, and the expansion is unique',
      'The indirect method is the most practical: use known expansions such as e^z, 1/(1−z), ln(1+z) and partial fractions',
      'Three kinds of isolated singularity: removable (no negative powers), pole (finitely many), essential (infinitely many)',
      'The order of a pole = the highest negative power; the Laurent expansion is the algebraic basis of residue calculus',
    ],
    content: String.raw`

Convergence of a series of complex terms $\sum_{n=0}^\infty a_n$ is similar to the real case: it converges if the sequence of partial sums has a limit, and absolute convergence ($\sum |a_n|$ converges) is stronger and implies convergence. A power series is a series of the form

$$\sum_{n=0}^\infty c_n (z - z_0)^n = c_0 + c_1 (z - z_0) + c_2 (z - z_0)^2 + \cdots$$

It has an excellent structural theorem (Abel's theorem): if it converges at some point $z_1 \neq z_0$, then it **converges absolutely** in the disc $|z - z_0| < |z_1 - z_0|$; if it diverges at some point, then it diverges everywhere outside the disc $|z - z_0| \ge |z_1 - z_0|$. Hence the region of convergence of a power series is necessarily a disc centred at $z_0$ (possibly degenerating to a point or expanding to the whole plane), and its radius $R$ is called the **radius of convergence**. It is computed from the coefficients:

$$\frac{1}{R} = \lim_{n \to \infty} \sqrt[n]{|c_n|} \qquad \text{or} \qquad R = \lim_{n\to\infty} \left| \frac{c_n}{c_{n+1}} \right|$$

(when the limit exists or is $+\infty$). **Inside** the circle of convergence a power series may be differentiated and integrated term by term, and its sum function is analytic there — these two facts are the theoretical guarantee for the "indirect method." Behaviour **on** the circle is complicated (it may converge, diverge or mix) and is not pursued in this course. Also note: the sum of a power series is analytic inside the circle of convergence, and as we shall see the converse also holds — an analytic function inside a disc can always be expanded in a power series. Together: **power series and analytic functions are two ways of writing the same class of objects.**

## 2. Taylor Expansion

**Taylor's theorem**: if $f(z)$ is analytic in the disc $|z - z_0| < R$, then in that disc

$$f(z) = \sum_{n=0}^\infty c_n (z - z_0)^n, \qquad c_n = \frac{1}{2\pi i} \oint_{|\zeta - z_0| = \rho} \frac{f(\zeta)}{(\zeta - z_0)^{n+1}}\, d\zeta = \frac{f^{(n)}(z_0)}{n!} \quad (0 < \rho < R)$$

The proof uses the Cauchy integral formula plus the geometric expansion $\frac{1}{\zeta - z} = \sum \frac{(z - z_0)^n}{(\zeta - z_0)^{n+1}}$, then integrates term by term. The coefficients are given by derivatives, the same form as in the real Taylor formula; moreover the expansion is **unique** — a function has only this one power series expansion in a given disc, so any legitimate route (undetermined coefficients, term-by-term operations, substituting into a known expansion) produces it.

The most-used Taylor expansions must be memorized (all in the form $z_0 = 0$; a shift gives the general case):

$$e^z = \sum_{n=0}^\infty \frac{z^n}{n!} \quad (|z| < \infty), \qquad \sin z = \sum_{n=0}^\infty \frac{(-1)^n z^{2n+1}}{(2n+1)!}, \qquad \cos z = \sum_{n=0}^\infty \frac{(-1)^n z^{2n}}{(2n)!}$$

$$\frac{1}{1 - z} = \sum_{n=0}^\infty z^n \quad (|z| < 1), \qquad \ln(1 + z) = \sum_{n=1}^\infty \frac{(-1)^{n-1} z^n}{n} \quad (|z| < 1), \qquad (1+z)^\alpha = \sum_{n=0}^\infty \binom{\alpha}{n} z^n$$

The key operation is **determining the radius of convergence**: the radius of a Taylor expansion equals the distance from the centre of expansion to the **nearest singularity**. This provides a useful reverse reasoning — want the radius of the Taylor expansion of $\frac{1}{1+z^2}$ at $z = 0$? The zeros of the denominator are at $z = \pm i$, so $R = 1$; even though the function looks perfectly well behaved on the real axis, singularities in the complex plane constrain the real-axis convergence "from a distance." This explains a famous oddity of real analysis: $\frac{1}{1+x^2}$ is infinitely smooth on the whole real line, yet its Taylor series converges only for $|x| < 1$ — the answer lies in the two singularities $\pm i$ in the complex plane. This is the classic proof that "one must study complex analysis."

**Direct and indirect methods**: the direct method computes the derivatives $f^{(n)}(z_0)$ and substitutes them into the formula, which suits functions with regular derivatives; the indirect method exploits uniqueness, transforming known expansions into the target one by substitution, arithmetic operations and term-by-term calculus, and is the mainstream in practice. For example, to expand $\frac{1}{(1-z)^2}$ at $0$, differentiate $\frac{1}{1-z} = \sum z^n$ term by term: $\sum_{n=1}^\infty n z^{n-1}$, for $|z| < 1$.

## 3. Laurent Expansion

A Taylor expansion requires the function to be analytic throughout a disc, and fails as soon as the disc contains a singularity. But physics and mathematics care most about behaviour near singularities — the residue hides in the negative-power terms of the expansion. Here a theorem about **annuli** is needed.

**Laurent's theorem**: if $f(z)$ is analytic in the annulus $r < |z - z_0| < R$ (the centre $z_0$ may be a singularity), then in that annulus

$$f(z) = \sum_{n=-\infty}^{+\infty} c_n (z - z_0)^n, \qquad c_n = \frac{1}{2\pi i} \oint_C \frac{f(\zeta)}{(\zeta - z_0)^{n+1}}\, d\zeta$$

where $C$ is any closed curve in the annulus encircling $z_0$ once. This two-sided series is the Laurent series: the positive-power part $\sum_{n \ge 0} c_n (z-z_0)^n$ is analytic inside $|z - z_0| < R$ (the "analytic part"), and the negative-power part $\sum_{n \le -1} c_n (z - z_0)^n$ is analytic outside $|z - z_0| > r$ (the "principal part"). The idea of the proof is to split the Cauchy integral formula for a contour in the annulus into two integrals over the inner and outer boundaries; the integral on the inner side uses another geometric expansion of $\frac{1}{\zeta - z}$ and naturally produces negative powers.

Three important remarks. First, **uniqueness**: the Laurent expansion of a function in a given annulus is unique, so the indirect method — partial fractions, known expansions, substitution — may (and should) be used instead of evaluating the contour integral. Second, **the coefficient formula generally cannot be replaced by a derivative formula**: the integrand $\frac{f(\zeta)}{(\zeta - z_0)^{n+1}}$ is not analytic at $z_0$ ($f$ has a singularity there), so the Cauchy derivative formula fails; but for $n \ge 0$ with $f$ replaced by an analytic function it still applies. Third, **the same function has different Laurent expansions on different annuli**: change the annulus and the expansion changes, so one must declare $z_0$ and the annulus first. For example $\frac{1}{z(1-z)}$ equals $\frac{1}{z} + 1 + z + z^2 + \cdots$ for $0 < |z| < 1$, but $-\frac{1}{z^2} - \frac{1}{z^3} - \cdots$ for $1 < |z| < \infty$; both are correct Laurent expansions, serving different annuli.

The relation between Laurent expansion and residues is immediate: the residue at $z_0$ is the coefficient $c_{-1}$ of $(z - z_0)^{-1}$ in the Laurent expansion. Many residue problems that "look like they require a contour integral" are in fact solved by expanding and reading off a coefficient; this is the interface between Chapter 3 and Chapter 2.

## 4. Classification of Singularities

Let $z_0$ be an isolated singularity of $f$ ($f$ analytic in the punctured neighbourhood $0 < |z - z_0| < r$). Examining the negative-power part of the Laurent expansion classifies singularities into three types, with criteria matching the limiting behaviour:

| Type | Laurent feature | $\lim_{z \to z_0} f(z)$ | Example |
|------|--------------|--------------------------|------|
| Removable | No negative powers | Exists and finite | $\frac{\sin z}{z}$ at $0$ |
| Pole (order $m$) | Finitely many negative powers, highest $(z-z_0)^{-m}$ | $\infty$ | $\frac{1}{z^2}$, $\frac{1}{z(z-1)}$ |
| Essential | Infinitely many negative powers | Does not exist (nor is it $\infty$) | $e^{1/z}$, $\sin\frac{1}{z}$ |

**Removable singularity**: no negative powers at all, $f(z) = c_0 + c_1 (z-z_0) + \cdots$, and the limit exists. Defining $f(z_0) = \lim_{z\to z_0} f(z)$ removes the singularity and makes the function analytic. For example $\frac{\sin z}{z}$, given the value $1$ at $0$, becomes analytic in the whole plane.

**Pole**: the principal part has only finitely many terms. If $f(z) = \frac{c_{-m}}{(z-z_0)^m} + \cdots + \frac{c_{-1}}{z - z_0} + c_0 + \cdots$ with $c_{-m} \neq 0$, then $z_0$ is a pole of order $m$. Equivalent characterizations: $z_0$ is a pole of order $m$ ⟺ $(z - z_0)^m f(z)$ is analytic and nonzero at $z_0$ ⟺ $f = \frac{P}{Q}$ ($P, Q$ analytic) with $Q$ having a zero of order $m$ at $z_0$ and $P(z_0) \neq 0$. The last one converts "order of the pole" into "order of the zero of the denominator" and is the most useful: the denominator of $\frac{1}{(z^2+1)^2}$ has a second-order zero at $z = i$, so $z = i$ is a second-order pole.

**Essential singularity**: infinitely many negative powers. The limiting behaviour is wildly chaotic — Weierstrass's theorem says that in an arbitrarily small neighbourhood of an essential singularity, $f$ takes **(all but at most one) complex values**, and each of them infinitely often. Near $0$, $e^{1/z}$ tends to $\infty$ along the positive real axis, to $0$ along the negative real axis, and along the imaginary axis its modulus is always $1$ while its argument oscillates wildly: three paths, three behaviours.

The classification at **the point at infinity** is also often examined: set $t = 1/z$; the behaviour at $z = \infty$ is defined as that of $g(t) = f(1/t)$ at $t = 0$. For example $f = z^3$: $g = t^{-3}$ has a third-order pole at $0$, so $\infty$ is a third-order pole of $f$; $e^z$ has an essential singularity at $\infty$ ($e^{1/t}$ at $t=0$).

## 5. Expansion Techniques and Complete Examples

The standard procedure for a Laurent expansion: **first split into partial fractions, then choose the correct form of the geometric series according to the annulus**. The core is to remember the two geometric series and their ranges:

$$\frac{1}{1 - w} = \sum_{n=0}^\infty w^n \quad (|w| < 1), \qquad \frac{1}{w(1 - 1/w)} = \frac{1}{w - 1} = \sum_{n=1}^\infty w^{-n} \quad (|w| > 1)$$

that is, "positive powers inside, negative powers outside." Take $f(z) = \frac{1}{(z-1)(z-2)}$ (fully worked in the examples): first split it as $\frac{1}{z-2} - \frac{1}{z-1}$. For $|z| < 1$ both terms expand in positive powers, giving the Taylor series; for $1 < |z| < 2$ the term $\frac{1}{z-1}$ must expand in negative powers of $z$ (since $|z| > 1$) while $\frac{1}{z-2}$ keeps positive powers (since $|z| < 2$); for $|z| > 2$ both terms are negative powers. Three annuli, three expansions; the singularities $z = 1$ and $z = 2$ are simple poles, and their residues can be read directly from the $(z - z_0)^{-1}$ terms of the expansions, in agreement with the limit formula.

To summarize the knowledge map of Chapter 3: a power series has a circle of convergence, inside which the sum is analytic; an analytic function inside a disc has a Taylor expansion, with radius up to the nearest singularity; in the presence of singularities one switches to the Laurent expansion on an annulus, whose negative-power part describes the singularity; the "number" of negative-power terms gives the threefold classification; and $c_{-1}$ is the residue, connecting directly to the contour integrals of Chapter 2. Link by link, series are the computational engine of complex analysis.

## 6. Common Errors and Supplementary Techniques

Errors in the series part concentrate on "awareness of the region," so clear them one by one. **Error one: writing a Laurent expansion without declaring the annulus.** Laurent expansions depend on the annulus, and the same function has completely different expansions on different annuli; the standard presentation must state the range such as $0 < |z - z_0| < r$ or $r_1 < |z - z_0| < r_2$, otherwise the answer is incomplete or even meaningless. **Error two: using the geometric series in the wrong direction.** $\frac{1}{1 - w} = \sum w^n$ holds only for $|w| < 1$; when $|w| > 1$ one should rewrite $\frac{1}{1 - w} = \frac{-1/w}{1 - 1/w} = -\sum_{n=1}^\infty w^{-n}$. The rule of thumb for choosing is "produce a common ratio of modulus less than 1": factor the denominator out of the bracket so that the remaining part has modulus strictly less than 1. **Error three: using a Taylor expansion at a centre that is a singularity.** A Taylor expansion requires analyticity throughout the disc; when the centre is a singularity no Taylor expansion exists and only a Laurent expansion can be given; writing $\frac{1}{z(1-z)}$ at $0$ as a "Taylor series" is a conceptual error. **Error four: looking only at the real axis for the radius of convergence.** Determining the Taylor radius requires finding the **nearest singularity in the complex plane**: $\frac{1}{1 + x^2}$ has no singularity on the real axis yet radius $1$ (singularities at $\pm i$); $\ln(1+z)$ has a branch point at $z = -1$ and radius $1$ as well. The search for singularities must be conducted in the whole complex plane. **Error five: using uniqueness backwards.** Uniqueness guarantees "any expansion obtained by legitimate means is correct," but not "any series written down converges to the function" — a series represents the function only within the declared region, and outside it a different expansion is required.

Two more advanced techniques. **Technique one: use symmetry to save work.** The Laurent expansion of an odd function contains only odd powers (positive and negative alike), and that of an even function only even powers; $e^z + e^{-z} = 2\cosh z$ contains only even powers. Check parity before expanding, and half the coefficients are excluded in advance. **Technique two: differentiation and integration as expansion tools.** If the target function differs from the derivative or integral of a known expansion by a factor, expand first and then operate term by term: $\frac{1}{(1-z)^3}$ can be obtained by differentiating $\frac{1}{(1-z)^2} = \sum_{n \ge 1} n z^{n-1}$ once more, which is less error-prone than forcing the binomial series. The legitimacy of term-by-term operations is guaranteed by the differentiability and integrability of power series inside the circle of convergence, but remember that **differentiation compresses the radius of convergence to the nearest singularity** — the region of the resulting series must be rechecked. Finally, note what the series viewpoint gives back to Chapter 2: the hypothesis "finitely many isolated singularities inside the contour" in the residue theorem exists precisely to ensure that each singularity has a punctured neighbourhood, a Laurent expansion and a well-defined $c_{-1}$; the threefold classification of singularities (removable, pole, essential) is likewise built entirely on the structure of the negative-power terms. The Laurent series may be called the shared underlying language of complex integration theory and singularity theory — master Chapter 3 thoroughly and many conclusions of Chapter 2 change from "remembered" to "seen through."

## 7. The Point at Infinity and the Geometric Picture of Expansions

One more section of slightly advanced material to complete the picture and the treatment of the point at infinity. **Laurent expansion at infinity**: to study the behaviour of $f$ near $\infty$, the standard substitution is $t = \frac{1}{z}$; examine the Laurent expansion of $g(t) = f(1/t)$ at $t = 0$ and then substitute $t$ back as $\frac{1}{z}$. Note the reversal of direction: positive powers of $g$ at $t = 0$ correspond to negative powers of $f$ at $\infty$. For example $f(z) = \frac{z}{z+1}$: $g(t) = \frac{1}{1+t} = 1 - t + t^2 - \cdots$ (for $|t| < 1$, i.e. $|z| > 1$), so the expansion of $f$ at $\infty$ is $1 - \frac{1}{z} + \frac{1}{z^2} - \cdots$, where the coefficient $-1$ of $\frac{1}{z}$ is defined as the negative of the residue of $f$ at $\infty$ (by convention $\mathrm{Res}\big|_\infty = -c_{-1}^{(\infty)}$, a sign convention that makes "the sum of all residues on the plane is zero" hold). **The geometric picture of expansions** is worth building in the mind: a Laurent series writes an analytic function on an annulus as two blocks, the "analytic part (a Taylor-type series inside a disc)" and the "principal part (a negative-power series in the outer region)"; the positive-power series converges inside and the negative-power series outside, and their common region of validity is exactly that annulus. Partial fractions always work because they explicitly separate "the principal part of each pole" from "the overall analytic part" — each term of $\frac{1}{(z-1)(z-2)} = \frac{1}{z-2} - \frac{1}{z-1}$ carries the entire negative-power structure of exactly one pole, and the remainder is analytic in the relevant region. This viewpoint of "distributing negative powers by singularity" transfers better than memorizing expansion steps: given a rational function, list its poles first, then for each annulus decide "which poles are inside (producing negative powers) and which outside (producing positive powers)," and the expansion writes itself almost automatically.

Finally, two landmark appearances of series expansions in physics, to close the chapter. **Appearance one: multipole expansion.** The potential $\frac{1}{|\vec r - \vec r\,'|}$ of a group of point charges far away is expanded in the small quantity $r\,'/r$, and the successive corrections (monopole, dipole, quadrupole) are essentially a generating-function series expansion, whose first term gives the leading approximation — the physicist's instinct to "grab the leading term first" is, mathematically, first-term analysis of a Taylor series. **Appearance two: perturbation series.** In quantum mechanics and classical perturbation theory the energies and orbits are expanded in a small parameter $\lambda$ and solved order by order; the radius of convergence is likewise set by the "nearest singularity" (often a level crossing or a phase transition), and the divergence of the series at physical parameter values is frequently a signal of new physics (phase transitions, resonances). So the vocabulary "expansion — region of convergence — singularity" is not only a computational tool but a diagnostic instrument for the limits of validity of theoretical predictions. With this understanding, the chapter on power series is no longer a mere collection of techniques but a grammar book for physical approximation methods.`,
  },

  'fourier-analysis': {
    chapter: 'Chapter 4 Fourier Analysis',
    title: 'Series and Transforms',
    summary:
      'Fourier series decompose a periodic function into discrete harmonics, and the Fourier transform decomposes a nonperiodic function into a continuous spectrum; together they underlie the spectral methods for solving boundary value problems of mathematical physics.',
    keyPoints: [
      'Fourier series: orthogonality gives the coefficient formula, and the Dirichlet conditions guarantee pointwise convergence',
      'Odd and even extension tricks: an odd function has only sine terms, an even function only cosine terms',
      'The complex exponential form c_n is a discrete spectrum, and |c_n|² gives the energy distribution over frequency',
      'Fourier transform pair: F(ω) = ∫f(x)e^{−iωx}dx, f(x) = (1/2π)∫F(ω)e^{iωx}dω',
      'Core properties: linearity, shift, differentiation (differentiate ⟺ multiply by iω), convolution theorem (convolution ⟺ product)',
      'The δ function is a syntactic element of transform methods: the sifting property and FT[δ] = 1 let any signal be written as a superposition of plane waves',
    ],
    content: String.raw`

From pendulums to alternating currents, from the fundamental and overtones of a string to lattice waves in crystals, periodic motion is one of the most universal forms of motion in the physical world. The simplest of all periodic phenomena is the simple harmonic vibration $A\sin(\omega t + \varphi)$. Fourier's basic insight is: **any (sufficiently regular) periodic motion can be written as a superposition of simple harmonic motions**; a nonperiodic signal can be regarded as the limit "as the period tends to infinity," where the discrete harmonics become a continuously distributed set of frequency components. So "analysing a signal" is equivalent to "finding its spectrum" — which frequency components it contains and how much weight each carries. This viewpoint of expanding a function in an orthogonal basis is completely isomorphic to "expanding a vector in basis vectors" in linear algebra: the function space is an infinite-dimensional vector space, $\sin nx$ and $\cos nx$ (or $e^{in\omega x}$) form an orthogonal basis, and the Fourier coefficients are the coordinate components. Study this chapter with that linear-algebra analogy in mind and almost no formula will look abrupt.

## 2. Fourier Series and the Coefficient Formulas

Let $f(x)$ have period $2l$ and be piecewise smooth on $[-l, l]$ (the function and its first derivative piecewise continuous). Then it can be expanded in a trigonometric Fourier series

$$f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty \left( a_n \cos\frac{n\pi x}{l} + b_n \sin\frac{n\pi x}{l} \right)$$

The coefficient formulas come from **orthogonality**: on $[-l, l]$ the family $\{1, \cos\frac{\pi x}{l}, \sin\frac{\pi x}{l}, \cos\frac{2\pi x}{l}, \sin\frac{2\pi x}{l}, \ldots\}$ satisfies

$$\int_{-l}^{l} \cos\frac{m\pi x}{l} \cos\frac{n\pi x}{l}\, dx = l\,\delta_{mn}, \qquad \int_{-l}^{l} \sin\frac{m\pi x}{l} \sin\frac{n\pi x}{l}\, dx = l\,\delta_{mn}, \qquad \int_{-l}^{l} \cos\frac{m\pi x}{l} \sin\frac{n\pi x}{l}\, dx = 0$$

(except that the inner product of the constant function with itself is $2l$). Multiply both sides of the expansion by a basis function and integrate; orthogonality kills all cross terms, leaving one term, and immediately

$$a_n = \frac{1}{l} \int_{-l}^{l} f(x) \cos\frac{n\pi x}{l}\, dx \ (n \ge 0), \qquad b_n = \frac{1}{l} \int_{-l}^{l} f(x) \sin\frac{n\pi x}{l}\, dx \ (n \ge 1)$$

Note the special normalization of $a_0$: the expansion writes $\frac{a_0}{2}$ while the coefficient integral uses $\frac{1}{l}$; this is the convention beginners most often get wrong. **The odd/even extension trick** halves the work: if $f$ is even, all $b_n = 0$ and only cosines remain (a cosine series); if $f$ is odd, all $a_n = 0$ and only sines remain (a sine series). The trick can also be used "in reverse" — for a nonperiodic function defined on $[0, l]$, one may extend it oddly or evenly, obtaining a sine or cosine expansion, with the choice fixed by the future boundary conditions (whether the endpoints are fixed or free); this is the direct source of the coefficient formulas in the method of separation of variables.

## 3. Convergence Theorem and the Gibbs Phenomenon

A Fourier series does not equal $f$ unconditionally; the convergence theorem (Dirichlet) gives sufficient conditions: if $f$ is piecewise smooth on $[-l, l]$, the series converges at every point to

$$\frac{f(x + 0^+) + f(x - 0^-)}{2}$$

i.e. to the average of the left and right limits. In particular, at a continuity point it converges to $f(x)$; at a discontinuity of the first kind it converges to the average of the one-sided limits ("take the midpoint at a jump"); at an endpoint it converges to the average of the one-sided limits there. For a continuous, piecewise smooth function the series also **converges uniformly**. Note that the requirement on the function (piecewise smooth) is far weaker than for a Taylor series — a function with a corner such as $|x|$ fails everywhere for Taylor expansion, yet Fourier expansion is unhindered; this is an important reason why Fourier methods flourish in physics: square waves, sawtooth waves and initial triangular displacements are all insufficiently smooth.

One more detail must be known — the **Gibbs phenomenon**: near a discontinuity the partial sums of the first $N$ terms "overshoot" by about $9\%$ of the jump, and this **does not disappear as $N$ grows**, the overshoot merely moves closer to the discontinuity. This is not a computational error but an intrinsic behaviour of trigonometric polynomial approximation to discontinuous functions, encountered in practice in signal processing and numerical computation.

## 4. Complex Exponential Form and Spectrum

Euler's formula combines the trigonometric series into a more symmetric complex exponential form. Write the fundamental frequency $\omega_0 = \frac{\pi}{l}$ and use $\cos n\omega_0 x = \frac{e^{in\omega_0 x} + e^{-in\omega_0 x}}{2}$, $\sin n\omega_0 x = \frac{e^{in\omega_0 x} - e^{-in\omega_0 x}}{2i}$ to rewrite the series as

$$f(x) = \sum_{n=-\infty}^{+\infty} c_n\, e^{in\omega_0 x}, \qquad c_n = \frac{1}{2l} \int_{-l}^{l} f(x)\, e^{-in\omega_0 x}\, dx$$

The $c_n$ are generally complex and satisfy $c_{-n} = \overline{c_n}$ (when $f$ is real). The sequence $\{c_n\}$ is called the **discrete spectrum** of $f$: $|c_n|$ is the amplitude of the component at frequency $\omega = n\omega_0$, and $|c_n|^2$ is the energy carried by that component (Parseval's identity $\frac{1}{2l}\int_{-l}^l |f|^2 dx = \sum |c_n|^2$ is exactly energy conservation). From then on "spectrum" is no metaphor: one integral of the signal gives its "content" at every frequency, the starting point of all frequency-domain analysis. Examples in physics are everywhere: spectral lines of light correspond to atomic transition frequencies, diffraction spots of crystals to reciprocal lattice vectors, the overtone series of a musical tone to a spectral envelope — all are discrete spectra $c_n$.

## 5. The Fourier Transform

When the period $2l \to \infty$, the spacing of the discrete frequencies $n\omega_0$ tends to $\omega_0 \to 0$, the sum passes into an integral, and the Fourier series grows into the **Fourier transform**. For an absolutely integrable $f(x)$, define

$$F(\omega) = \int_{-\infty}^{+\infty} f(x)\, e^{-i\omega x}\, dx, \qquad f(x) = \frac{1}{2\pi} \int_{-\infty}^{+\infty} F(\omega)\, e^{i\omega x}\, d\omega$$

$F(\omega)$ is called the spectral density and is a function of the continuous variable $\omega$. A few conventions must be stated in advance: the factor $\frac{1}{2\pi}$ is placed on the inverse transform side (the convention of this course); some textbooks use the symmetric $\frac{1}{\sqrt{2\pi}}$, so always check the convention when consulting tables. The basic transform pairs should be memorized: rectangular pulse $\leftrightarrow$ $\text{sinc}$ function (the mathematical substance of diffraction); Gaussian $\leftrightarrow$ Gaussian ($\text{FT}[e^{-ax^2}] = \sqrt{\pi/a}\, e^{-\omega^2/4a}$, the only family whose shape is unchanged by the transform); $e^{-a|x|} \leftrightarrow \frac{2a}{a^2 + \omega^2}$ (the Lorentzian line shape).

The properties are the engine of the transform method, five core ones (all with $\mathcal{F}[f] = F$):

1. **Linearity**: $\mathcal{F}[\alpha f + \beta g] = \alpha F + \beta G$;
2. **Shift**: $\mathcal{F}[f(x - x_0)] = e^{-i\omega x_0} F(\omega)$ (a time shift ⟺ multiplying by a phase factor in frequency; dually, a frequency shift ⟺ multiplying by $e^{i\omega_0 x}$ in time, which is the essence of modulation);
3. **Differentiation**: $\mathcal{F}[f'] = i\omega F(\omega)$, in general $\mathcal{F}[f^{(n)}] = (i\omega)^n F(\omega)$ (requiring $f$ and its derivatives to decay at infinity) — **differentiation becomes multiplication**, the whole secret of solving differential equations by transform;
4. **Convolution**: $\mathcal{F}[f * g] = F(\omega) G(\omega)$, where $(f * g)(x) = \int_{-\infty}^{+\infty} f(\xi) g(x - \xi)\, d\xi$ — convolution in time corresponds to multiplication in frequency; filtering, transfer functions of imaging systems and the response analysis of linear systems all rest on this property;
5. **Parseval**: $\int |f|^2 dx = \frac{1}{2\pi} \int |F|^2 d\omega$ (the total energy is the same in the two representations).

## 6. The δ Function and Physical Applications of the Spectral Idea

To cover "irregular" signals such as point sources and impulses, the transform method must introduce the Dirac $\delta$ function: not a function in the usual sense but a generalized function (a linear functional on continuous functions), defined in engineering by two properties:

$$\delta(x - x_0) = 0 \ (x \neq x_0), \qquad \int_{-\infty}^{+\infty} \delta(x - x_0)\, \varphi(x)\, dx = \varphi(x_0)$$

The second is called the **sifting property**: multiplying $\delta$ by any function and integrating "sifts out" the value of that function at $x_0$. $\delta$ may be regarded as the limit of a pulse of width tending to zero, height tending to infinity and area kept at $1$; in physics it represents a point charge, a point source, a unit impulse. Two key properties in the frequency domain: $\mathcal{F}[\delta(x)] = 1$ ($\delta$ contains all frequencies with equal weight) and $\mathcal{F}[e^{i\omega_0 x}] = 2\pi\, \delta(\omega - \omega_0)$ (a single-frequency signal is a point in the frequency domain). Hence the inverse transform formula $f(x) = \frac{1}{2\pi}\int F(\omega) e^{i\omega x} d\omega$ reads: "**any signal is a continuous superposition of plane waves, and $F(\omega)$ is the weight of the superposition**" — completely isomorphic to "the expansion in momentum eigenstates" in quantum mechanics and the "angular spectrum expansion in plane waves" in optics.

Examples of the physical power of the spectral idea. First, **diffraction**: the amplitude distribution of Fraunhofer diffraction is exactly the Fourier transform of the aperture function; the $\text{sinc}$ pattern of a single slit and the Airy disc of a circular aperture are both "spectra of the aperture," and a lens is itself a Fourier transformer. Second, **signals and systems**: a linear time-invariant system acts as convolution in time and as multiplication by a transfer function in frequency, so filter design is spectrum tailoring. Third, **quantum mechanics**: the position and momentum wave functions are a Fourier transform pair, and the uncertainty relation $\Delta x\, \Delta p \ge \hbar/2$ is precisely the physical expression of "frequency spread and time spread are inversely proportional" ($\text{sinc}$ and rectangle, Gaussian and Gaussian).

A few more conclusions about the bridge between series and transforms, welding them into one. **First, periodic extension is the common switch**: truncate a nonperiodic function to $[-l, l]$ and extend it periodically; the Fourier series then describes the extended function, converging to the original function inside $(-l, l)$ and to the average of the one-sided limits at $\pm l$ — the "wrong" endpoint behaviour is not the series' fault but the fact that the extended function genuinely jumps there. **Second, as $l \to \infty$ the spectral lines become infinitely dense**: in $c_n = \frac{1}{2l}\int_{-l}^l f e^{-in\omega_0 x} dx$, let $l \to \infty$, so $\omega_n = n\omega_0$ becomes a continuous variable $\omega$, $\frac{1}{2l}$ becomes $\frac{d\omega}{2\pi}$, and the sum becomes an integral; the coefficient formula becomes the forward transform and the expansion becomes the inverse transform — the Fourier transform is not a new method but the natural extension of the series in the "infinite period" limit. **Third, discrete and continuous spectra correspond to two kinds of physics**: a bound system (in a finite box) has discrete levels and a line spectrum; a free system (infinite space) has continuous frequencies and a continuous band — the passage from box normalization to free particles in quantum mechanics is mathematically the passage from Fourier series to Fourier transform. Understand this bridge and the two halves of Chapter 4 (series and transforms) are not two sets of formulas but one idea developed at two geometric scales: project a function onto the plane-wave basis and read off its frequency content; to solve a linear equation, let each plane wave respond separately and then superpose the responses.
Fourth, and this is developed in Chapter 5: **the initial value problems for the heat and wave equations are reduced by the Fourier transform to first-order ordinary differential equations** and solved in one step. The examples of the next lecture walk through this route in full.

## 7. The Complete Flow of the Transform Method and Its Limits

Before the examples, turn the "transform method for boundary value problems" into a template and honestly state its limits. Take the initial value problem for heat conduction, $u_t = a^2 u_{xx}$ with $u(x, 0) = \varphi(x)$ (whole space). The standard flow has five steps. **Step one**: Fourier transform in $x$; using the differentiation property $u_{xx} \mapsto -\omega^2 \hat u$, the partial differential equation becomes $\frac{d\hat u}{dt} = -a^2 \omega^2 \hat u$ — all spatial derivatives disappear and the equation reduces to a first-order ODE with $\omega$ as a parameter. **Step two**: solve, giving $\hat u(\omega, t) = \hat\varphi(\omega)\, e^{-a^2 \omega^2 t}$; the initial condition becomes the initial value of $\hat u$ directly, with no technique needed. **Step three**: recognize that the factor $e^{-a^2\omega^2 t}$ is itself the Fourier transform of the Gaussian kernel $G(x, t) = \frac{1}{\sqrt{4\pi a^2 t}} e^{-x^2/(4a^2 t)}$. **Step four**: return to the time domain with the convolution theorem: $u(x, t) = (G * \varphi)(x) = \int_{-\infty}^{+\infty} G(x - \xi, t)\, \varphi(\xi)\, d\xi$ — the solution is a weighted average of the initial temperature distribution with the heat kernel, the weight being a Gaussian centred at $x$ whose width grows like $\sqrt{t}$. **Step five**: check the qualitative behaviour: the Gaussian kernel tends to the $\delta$ function as $t \to 0^+$, so the initial condition is recovered automatically; for any $t > 0$ the solution is infinitely smooth and analytic; the solution depends continuously on the initial data (the $L^2$ norm does not increase), so well-posedness is immediate. The initial value problem for the wave equation follows the same route: after the transform, $\hat u_{tt} = -a^2\omega^2 \hat u$ is a harmonic oscillation equation, whose solution also convolves after the inverse transform — the symmetry and difference of the two routes (oscillation versus decay) precisely reflect the characters of the hyperbolic and parabolic types.

The limits must also be stated clearly, lest the transform method be taken for a master key. **Limit one: boundary conditions are hard to put in the frequency domain.** The Fourier transform naturally suits whole-space or half-line problems; for mixed problems on a bounded interval the boundary conditions become nonlocal constraints on $\hat u$, far less natural than an eigenfunction expansion in sines — bounded domains belong to separation of variables (Chapter 6), and that is the division of labour between the two methods. **Limit two: the coefficients must not depend on $x$.** The differentiation property $\partial_x \mapsto i\omega$ requires constant coefficients; for variable-coefficient equations (such as $x u_{xx}$) the transform produces a convolution of $\omega$ with $\hat u$ and the equation is no simpler; here eigenfunction expansions or special functions are needed. **Limit three: the function must be well behaved enough.** The classical Fourier transform requires $f$ to be absolutely integrable; non-decaying functions (constants, periodic functions, $e^{ikx}$) have no transform classically and require the $\delta$ function or a switch to the Laplace transform and generalized-function framework — the introduction of the $\delta$ language is precisely to bring the most physically useful signals, plane waves, into frequency-domain grammar. **Limit four: half-line problems need the right transform.** For problems on $x > 0$, choose the sine transform (first-kind boundary conditions) or the cosine transform (second-kind boundary conditions) according to the boundary condition; a full-range transform introduces unknown boundary values. With these four limits understood, one can choose correctly among the four tools "transform method, separation of variables, travelling waves, Green's functions" — the core competence of mathematical methods in physics is never remembering a method but choosing the right one for a given problem.`,
  },

  'well-posed-pde': {
    chapter: 'Chapter 5 Well-Posed Problems of Mathematical Physics',
    title: 'Three Types of Equations and Boundary Conditions',
    summary:
      'The wave, heat and Laplace equations come from different physical conservation laws; an equation plus suitable side conditions forms a well-posed problem, and d\'Alembert\'s formula gives an explicit travelling-wave solution for the unbounded string.',
    keyPoints: [
      'Three types: wave equation u_tt − a²u_xx = 0 (hyperbolic), heat u_t − a²u_xx = 0 (parabolic), Laplace u_xx + u_yy = 0 (elliptic)',
      'Equation + initial conditions + boundary conditions = a boundary value problem; different equations need different side conditions',
      'Three kinds of boundary conditions: first kind (u given), second kind (∂u/∂n given), third kind (a linear combination)',
      'Three ingredients of well-posedness: existence, uniqueness, and continuous dependence on the data',
      'd\'Alembert\'s formula u = [φ(x+at) + φ(x−at)]/2 + (1/2a)∫ψ: the picture is a superposition of left- and right-going waves',
      'Linear equations obey superposition, and inhomogeneous problems reduce to homogeneous ones via the impulse principle',
    ],
    content: String.raw`

The equations of mathematical physics are not formulas dropped from the sky but the result of writing physical conservation laws in the language of partial derivatives. The three most basic equations each have their own "ancestry."

**The wave equation** comes from Newton's second law. Consider a small piece of string of length $dx$, with tension $T$, linear density $\rho$, undergoing only small transverse vibrations. The difference between the vertical components of the tension at the two ends supplies the acceleration: $T\, u_{xx}\, dx = \rho\, dx\, u_{tt}$, hence

$$u_{tt} - a^2 u_{xx} = 0, \qquad a = \sqrt{T/\rho}$$

$a$ is the speed of the wave on the string. If there is also an applied transverse force (per unit length $F(x,t)$), the equation becomes inhomogeneous, $u_{tt} - a^2 u_{xx} = f(x,t)$. The same one-dimensional equation describes sound waves and voltage waves on transmission lines; the three-dimensional version $\nabla^2 u - \frac{1}{c^2} u_{tt} = 0$ describes electromagnetic and elastic waves.

**The heat equation** comes from energy conservation plus Fourier's law of heat conduction. Fourier's law says the heat flux is $q = -k\,\nabla u$ ($u$ the temperature, $k$ the conductivity; heat flows spontaneously from hot to cold, hence the minus sign). Write the energy balance for a small volume element: rate of change of internal energy $=$ net heat inflow $+$ internal sources, giving

$$u_t - a^2 \nabla^2 u = f(\vec r, t), \qquad a^2 = k/(c\rho)$$

where $c$ is the specific heat and $\rho$ the density. Without sources and in a steady state ($u_t = 0$) the equation degenerates to Laplace's equation — a steady temperature field is harmonic; this is not a coincidence but the necessary consequence of "the time derivative vanishing."

**Laplace's equation** describes every "steady, source-free" field:

$$\nabla^2 u = u_{xx} + u_{yy} + u_{zz} = 0$$

An electrostatic field in a charge-free region satisfies $\nabla^2 \varphi = 0$ (Gauss's theorem), the velocity potential of an incompressible irrotational fluid satisfies it, and a steady temperature field satisfies it. The version with sources is Poisson's equation $\nabla^2 u = -f$.

Mathematically, a second-order linear partial differential equation $A u_{xx} + 2B u_{xy} + C u_{yy} + (\text{lower-order terms}) = 0$ falls into three classes according to the discriminant $\Delta = B^2 - AC$: $\Delta > 0$ hyperbolic (waves, information propagating at finite speed, characteristics), $\Delta = 0$ parabolic (heat, instantaneous propagation, time irreversibility), $\Delta < 0$ elliptic (Laplace, globally smooth solutions with no boundary). The solution properties of the three classes are utterly different: the solutions of the wave equation may retain discontinuities (shock-like travelling waves), those of the heat equation become infinitely smooth the instant $t > 0$, and those of Laplace's equation are analytic everywhere. The type of the equation determines what side conditions it "likes."

## 2. Side Conditions: Initial and Boundary Conditions

The equation itself gives only the "local law" for u in space-time; to determine a physical process uniquely one must also say "from what state it starts" (initial conditions) and "what happens on the boundary" (boundary conditions).

**Initial conditions**: the wave equation is second order in time, so it needs two initial conditions — the initial displacement $u(x, 0) = \varphi(x)$ and the initial velocity $u_t(x, 0) = \psi(x)$; the heat equation is first order in time and needs only one — the initial temperature distribution $u(x, 0) = \varphi(x)$; Laplace's equation contains no time, so **it neither needs nor should be given initial conditions** (a steady state has no "beginning"). Giving the wrong number either makes the problem unsolvable or ill-posed.

**Boundary conditions** fall into three classes according to linearity (let $\Sigma$ be the boundary and $\frac{\partial}{\partial n}$ the outward normal derivative):

| Type | Name | Form | Physical example |
|------|------|------|----------|
| First | Dirichlet | $u\big|_\Sigma = f$ | String fixed at both ends ($u = 0$); rod end at constant temperature |
| Second | Neumann | $\frac{\partial u}{\partial n}\big|_\Sigma = f$ | Rod end insulated (zero heat flux ⟹ $u_x = 0$); free string end |
| Third | Mixed (Robin) | $\left( u + h \frac{\partial u}{\partial n} \right)\big|_\Sigma = f$ | Rod end exchanging heat with the environment by Newton's cooling law; elastically supported end |

The first kind says "the boundary value is prescribed," the second says "the outgoing flux is prescribed," and the third describes a linear coupling with the outside (value and flux related). The boundary conditions of heat and wave problems may be any combination of the three; boundary value problems for Laplace's equation are named accordingly: one with $u$ given everywhere is a Dirichlet problem, one with $\frac{\partial u}{\partial n}$ given everywhere a Neumann problem. Note a constraint appearing in problems of the second and third kinds: for a Neumann problem to be solvable, the net flux in the boundary data must balance the internal sources (otherwise energy is not conserved and no solution exists); and the solution is determined only up to an additive constant.

**Equation + sufficient side conditions = a boundary value problem.** An initial value problem (Cauchy problem) specifies only initial conditions (the region is all space); a boundary value problem specifies only boundary conditions (steady state); a mixed problem (initial-boundary value problem) specifies both (the evolution of a bounded string or a rod of finite length).

## 3. Well-Posedness: Which Problems Are "Worth Solving"

Hadamard proposed three criteria for a problem to be acceptable physically and mathematically: **a solution exists** (a physical process must happen); **the solution is unique** (the same initial and boundary state should lead to the same evolution, otherwise the theory cannot predict); **the solution is stable** (small changes in the data produce only small changes in the solution — because initial data come from measurement and carry errors, and if the equation magnifies those errors beyond recognition, the solution is worthless even if computed). All three together make a **well-posed problem**.

The three classical types are all well posed in the classical setting: mixed problems for waves and heat on bounded domains, initial value problems on all space, and Dirichlet problems on bounded regions (uniqueness can be proved by energy methods or the maximum principle: a harmonic function attains its maximum and minimum on the boundary, so if it vanishes there it vanishes identically inside — exactly why the solution of the rectangular-domain problem in the examples is unique). Counterexamples are also instructive: the **backward heat problem** (given today's temperature distribution, infer yesterday's) is severely unstable — the heat equation quickly smooths away high-frequency detail from the past, so running backwards amplifies high-frequency errors exponentially; it is a typical ill-posed problem. Similarly, the Cauchy problem for Laplace's equation (giving both the boundary value and the normal derivative to find the interior solution) is ill posed, and its numerical solution requires regularization. The concept of well-posedness reminds us that not every plausible-sounding problem has a good answer: the type of equation and the side conditions must match.

## 4. The Travelling Wave Method and d'Alembert's Formula

The free vibration of an unbounded string is the problem that best reveals the nature of waves:

$$u_{tt} - a^2 u_{xx} = 0, \quad -\infty < x < \infty; \qquad u(x, 0) = \varphi(x), \quad u_t(x, 0) = \psi(x)$$

Introduce the characteristic variables $\xi = x + at$ and $\eta = x - at$ (so $x = \frac{\xi + \eta}{2}$ and $t = \frac{\xi - \eta}{2a}$). The chain rule gives $u_{tt} - a^2 u_{xx} = -4a^2 u_{\xi\eta}$, so the equation becomes $u_{\xi\eta} = 0$. Integrating first in $\xi$ and then in $\eta$, the general solution is

$$u = F(\xi) + G(\eta) = F(x + at) + G(x - at)$$

where $F, G$ are arbitrary twice differentiable functions. The physical meaning of this general solution is immediate: $G(x - at)$ is a **travelling wave translating to the right with speed $a$** (its shape is unchanged, the profile shifting right as $t$ grows), and $F(x + at)$ translates to the left. **The general solution of the wave equation is the superposition of two travelling waves, one left and one right** — a wave does not change shape, it only translates; this is the essential feature distinguishing hyperbolic equations from the heat equation (which smooths) and from elliptic equations (which have no time).

Fix $F, G$ from the initial conditions: $u(x,0) = F(x) + G(x) = \varphi(x)$ and $u_t(x,0) = aF'(x) - aG'(x) = \psi(x)$. Integrating the second gives $F(x) - G(x) = \frac{1}{a}\int_{x_0}^x \psi(s) ds + C$; solving together with the first for $F, G$ and substituting back (with $x_0$ a reference point of integration and the constant absorbed into the split of $\varphi$) gives **d'Alembert's formula**:

$$u(x, t) = \frac{\varphi(x - at) + \varphi(x + at)}{2} + \frac{1}{2a} \int_{x - at}^{x + at} \psi(s)\, ds$$

Read the structure: the displacement at $x$ at time $t$ consists of two parts — the average of the initial profile $\varphi$ at $x \pm at$ (each travelling wave contributing half), plus the averaged integral of the initial velocity $\psi$ over the **domain of dependence** $[x - at, x + at]$. This reveals the causal structure of hyperbolic equations: the solution at $(x, t)$ depends only on the initial data in $[x - at, x + at]$, and information from outside that interval cannot arrive; conversely, a disturbance in the initial data propagates with speed $a$ along the characteristics $x \pm at = \text{constant}$, with the range of influence the characteristic cone they bound. Finite-speed propagation and sharp wavefronts are physical facts read off directly from d'Alembert's formula. Poisson's formula for three-dimensional waves (spherical means) and the method of descent for two dimensions are its generalizations and are omitted here.

## 5. Superposition and a Road Map for Solution Methods

All three equations are **linear**: if $u_1, u_2$ are solutions, so is $c_1 u_1 + c_2 u_2$ (for the homogeneous equation); the general solution of an inhomogeneous equation $=$ a particular solution $+$ the general solution of the corresponding homogeneous equation. Superposition is the common foundation of all methods for linear partial differential equations, and the route is chosen by problem type:

1. **Unbounded domain + wave equation** → the travelling wave method (characteristic transformation), yielding d'Alembert's formula;
2. **Unbounded domain + heat (or wave) initial value problem** → the Fourier transform: after transforming in $x$, $u_t = a^2 u_{xx}$ becomes the first-order ODE $\hat u_t = -a^2 \omega^2 \hat u$, giving $\hat u = \hat\varphi\, e^{-a^2\omega^2 t}$, and the inverse transform (the convolution theorem gives $u = G_a * \varphi$, with $G_a$ the heat kernel). The route announced at the end of Chapter 4 is carried out in full in the examples;
3. **Bounded domain + homogeneous boundary** → separation of variables: expand the solution in an eigenfunction series; this is the theme of Chapter 6;
4. **Steady problems (Laplace/Poisson)** → boundary value problems; regular regions use separation of variables (polar coordinates for discs), general regions rely on Green's functions and the maximum principle.

Inhomogeneous equations have another device, the **impulse principle**: regard a continuous source $f(x, t)$ as a superposition of instantaneous impulses, each contributing to the initial velocity (waves) or initial temperature (heat); the inhomogeneous problem then becomes a homogeneous equation with modified initial conditions and enters the homogeneous framework. With this the framework "equation — side conditions — well-posedness — solution method" is complete, and Chapter 6 unfolds in full its most important branch, separation of variables.

## 6. A Quick Reference for Side Conditions and Common Errors

After studying the three types of equations and d'Alembert's formula, organize "which problem takes which conditions" into a quick reference and take stock of high-frequency errors. **Quick reference**: the wave equation (second order in time) needs two initial conditions plus boundary conditions, and on an unbounded domain only initial conditions (Cauchy problem); the heat equation (first order in time) needs only one initial temperature distribution plus boundary conditions, and on an unbounded domain likewise only initial conditions; Laplace's equation takes no initial conditions at all, only boundary conditions (Dirichlet or Neumann problems). **Error one: giving a heat problem two initial conditions.** The heat equation has only a first derivative in time, so prescribing "initial temperature" plus "initial rate of change of temperature" is redundant, and the problem becomes overdetermined with no solution — the time order of the equation fixes the number of initial conditions, a rigid match. **Error two: not checking compatibility in a Neumann problem.** For a second-kind boundary value problem to be solvable, the boundary data must satisfy a net flux balance: in a steady heat conduction problem the total boundary heat flux must equal the total internal source rate, otherwise energy is not conserved and no solution exists; ignoring this constraint in a numerical computation yields a divergent iteration. **Error three: the sign of a third-kind boundary condition.** The $\frac{\partial}{\partial n}$ in $\left(u + h\frac{\partial u}{\partial n}\right) = f$ is the **outward normal** derivative; the left and right ends of a rod have opposite normals, so the same physical law takes different signs in one-dimensional form at the two ends (combinations of the type $u - \frac{1}{h}u_x$ at the left and $u + \frac{1}{h}u_x$ at the right, the exact signs depending on the coordinate convention); draw a picture and fix the direction before applying formulas. **Error four: confusing $a$ with $a^2$.** In the wave equation $u_{tt} = a^2 u_{xx}$ the wave speed is $a$; in the heat equation $u_t = a^2 u_{xx}$ the quantity $a^2$ is the thermal diffusivity. Writing both with the same letter is fine, but the $a$ in $x \pm at$ of d'Alembert's formula must be the square root — when $a^2 = T/\rho$ the wave speed is $a = \sqrt{T/\rho}$. **Error five: the integration limits for $\psi$ in d'Alembert's formula.** The interval is $[x - at, x + at]$ (the domain of dependence), not $[0, x]$ and not the symmetric $[-at, at]$; the physical meaning is "the accumulated impulse contributed by the initial velocity at those points," and wrong limits give a wrong solution.

Finally, a reminder about the **limits of superposition**: superposition holds only for linear equations and linear side conditions. If a boundary condition is nonlinear (say a radiative exchange term $u^4$), or the equation contains nonlinear terms, sums of homogeneous solutions are no longer solutions and both separation of variables and transform methods must be rebuilt. Fortunately the mainstream of classical mathematical physics — small-amplitude waves, linear heat conduction, electrostatics and magnetostatics in linear media — is linear, which explains why "linearity" is so prized in physical modelling: it is the premise of the entire family of modal expansion methods. Deciding whether a problem is "linearly solvable" — checking the degree of $u$ and its derivatives in every term of the equation, and the linearity of the boundary conditions in $u$ — is the first task before starting to solve, and it is the common entrance that Chapter 5 leaves to the chapters that follow.`,
  },

  'separation-variables': {
    chapter: 'Chapter 6 Separation of Variables',
    title: 'Cartesian and Polar Coordinates',
    summary:
      'Separation of variables turns a partial differential equation into a string of eigenvalue problems, and the orthogonality and completeness of the eigenfunctions legitimize the superposition; Laplace\'s equation in Cartesian and polar coordinates provides the two standard models.',
    keyPoints: [
      'Four-step procedure: set u=XT and substitute → solve the eigenvalue problem → superpose → fix coefficients with the remaining side conditions',
      'Eigenvalues are "selected" by the boundary conditions; a discrete spectrum is a direct consequence of the boundary constraint',
      'Sturm–Liouville theory guarantees: eigenvalues real and nonnegative (typically), eigenfunctions orthogonal with weight',
      'Expansion coefficients are given directly by the orthogonality formula, i.e. generalized Fourier coefficients',
      'Cartesian model: string fixed at both ends / heat conduction in a finite rod, eigenfunctions sin(nπx/l)',
      'Polar model: Laplace\'s equation in a disc, angular eigenfunctions e^{inθ}, radial solutions r^{±n}',
    ],
    content: String.raw`

Separation of variables is the most important and most widely used method for the equations of mathematical physics, and its core idea can be put in one sentence: **look for "separable" particular solutions of the form $u(x, t) = X(x) T(t)$ and split one partial differential equation into two ordinary differential equations**. Take the one-dimensional heat equation and substitute $u = X(x)T(t)$:

$$X T' = a^2 X'' T \quad \Longrightarrow \quad \frac{T'}{a^2 T} = \frac{X''}{X}$$

The left side depends only on $t$ and the right only on $x$; since $x$ and $t$ are independent, a function of $x$ alone and a function of $t$ alone that are everywhere equal must both equal one and the same constant, written $-\lambda$. The equation splits in two:

$$X'' + \lambda X = 0, \qquad T' + a^2 \lambda T = 0$$

Solving a partial differential equation has become solving two ordinary ones. But note: the equation for $X$ comes with **homogeneous boundary conditions** (such as $X(0) = X(l) = 0$), and this creates the central concept of the course — an **eigenvalue problem**: not every $\lambda$ admits a nontrivial solution; only particular values of $\lambda$ allow $X$ to satisfy both the equation and the boundary conditions. These special $\lambda$ are eigenvalues and the corresponding nonzero solutions eigenfunctions. Physically, the boundary constraint "filters out" the vibration (or relaxation) modes the system allows, and a discrete spectrum is the direct consequence of the geometric constraint of "boundedness."

The complete procedure is fixed at four steps: (1) separate the variables, obtaining an eigenvalue problem and a time equation; (2) solve the eigenvalue problem, obtaining all eigenvalues and eigenfunctions; (3) superpose the infinitely many modes into a general solution $u = \sum c_n X_n(x) T_n(t)$ (superposition permits this); (4) determine the superposition coefficients using the as-yet unused side conditions (usually the initial condition) and orthogonality. Two standard worked examples below carry the procedure through.

## 2. A Cartesian Example: Heat Conduction in a Rod of Finite Length

Problem: a uniform thin rod of length $l$ with both ends held at zero temperature and an initial temperature distribution $\varphi(x)$; find the temperature evolution.

$$u_t = a^2 u_{xx} \ (0 < x < l, \ t > 0); \qquad u(0, t) = u(l, t) = 0; \qquad u(x, 0) = \varphi(x)$$

**Step one**: separation gives $X'' + \lambda X = 0$ and $T' + a^2\lambda T = 0$. **Step two**: solve the eigenvalue problem. Discuss the three cases for $\lambda$ (the standard move): for $\lambda < 0$, $X = A e^{\sqrt{-\lambda} x} + B e^{-\sqrt{-\lambda} x}$ and the boundary conditions force $A = B = 0$, so there is no nontrivial solution; for $\lambda = 0$, $X = Ax + B$ and vanishing at both ends again leaves only the zero solution; for $\lambda > 0$, $X = A\cos\sqrt{\lambda}\, x + B\sin\sqrt{\lambda}\, x$, $X(0) = 0$ gives $A = 0$, and $X(l) = 0$ gives $\sin\sqrt{\lambda}\, l = 0$, hence

$$\lambda_n = \left( \frac{n\pi}{l} \right)^2, \qquad X_n(x) = \sin\frac{n\pi x}{l}, \quad n = 1, 2, 3, \ldots$$

**Step three**: the temperature factor of each mode is $T_n = e^{-a^2 \lambda_n t}$, and superposing gives

$$u(x, t) = \sum_{n=1}^\infty c_n\, e^{-\left( \frac{n\pi a}{l} \right)^2 t} \sin\frac{n\pi x}{l}$$

Note that each mode carries a decay factor $e^{-(n\pi a/l)^2 t}$: **the finer the spatial structure (the larger $n$), the faster the relaxation** — heat conduction naturally smooths detail, and this is the modal language for the smoothing effect of parabolic equations. **Step four**: substitute the initial condition, $\varphi(x) = \sum c_n \sin\frac{n\pi x}{l}$; multiply both sides by $\sin\frac{m\pi x}{l}$ and integrate over $[0, l]$; orthogonality $\int_0^l \sin\frac{n\pi x}{l} \sin\frac{m\pi x}{l}\, dx = \frac{l}{2}\delta_{mn}$ leaves only one term:

$$c_n = \frac{2}{l} \int_0^l \varphi(\xi) \sin\frac{n\pi \xi}{l}\, d\xi$$

These are exactly the Fourier sine coefficients of $\varphi$ on $[0, l]$ — the "fix the coefficients" step of separation of variables is really a Fourier expansion of the initial function. The wave equation for a string fixed at both ends, $u_{tt} = a^2 u_{xx}$, follows exactly the same procedure, except that the time equation becomes $T'' + a^2 \lambda_n T = 0$, giving the oscillatory solutions $\sin\frac{n\pi a t}{l}$ and $\cos\frac{n\pi a t}{l}$ with modal frequencies $\omega_n = \frac{n\pi a}{l}$ — the formula for the natural frequencies of a string, the physics of musical instruments.

## 3. Eigenvalue Problems and Sturm–Liouville Theory

The above discussion "trying each $\lambda$ in turn" can be generalized. The general form of a second-order eigenvalue problem is the **Sturm–Liouville equation**:

$$\frac{d}{dx} \left[ p(x) \frac{dX}{dx} \right] + \left[ \lambda\, \rho(x) - q(x) \right] X = 0, \qquad a < x < b$$

together with homogeneous boundary conditions (of the first, second or third kind, or periodic conditions), with $p(x) > 0$, $\rho(x) > 0$, $q(x) \ge 0$. The equation $X'' + \lambda X = 0$ separated from the heat and wave equations in Cartesian coordinates corresponds to the simplest case $p = \rho = 1$, $q = 0$; the Legendre and Bessel equations of Chapter 7 are also written in S-L form — **special functions are essentially the eigenfunctions produced by separation of variables in various coordinate systems**. S-L theory gives three universal conclusions, the certificate of legitimacy of the whole method:

1. **The eigenvalues are all real** and (under the usual boundary conditions) nonnegative;
2. **Eigenfunctions belonging to different eigenvalues are orthogonal with weight**: $\int_a^b \rho(x) X_m X_n\, dx = 0$ for $m \neq n$, the weight $\rho$ coming from the equation;
3. **The eigenfunction system is complete**: every piecewise smooth function $f$ can be expanded in a generalized Fourier series $f = \sum c_n X_n$ converging uniformly, with coefficients $c_n = \frac{\int_a^b \rho f X_n dx}{\int_a^b \rho X_n^2 dx}$.

The second conclusion gives the coefficient formula directly, and the third guarantees that "the initial condition can always be expanded" will not fail. The denominator $N_n^2 = \int_a^b \rho X_n^2 dx$ is called the **squared norm** of the eigenfunction and must be computed when normalizing. The special-function expansions from Chapter 8 onwards (Legendre series on a sphere, Bessel series in a cylinder) use exactly this framework, only with more complicated families of eigenfunctions.

## 4. Intuition for Orthogonality and Completeness

Why does orthogonality arise? Prove it in the simplest case $X'' + \lambda X = 0$: let $X_m, X_n$ be eigenfunctions of different eigenvalues and write $X_m'' X_n - X_n'' X_m = (\lambda_n - \lambda_m) X_m X_n$; the left side is exactly $\left[ X_m' X_n - X_n' X_m \right]'$, and integrating over $[0, l]$ and using the homogeneous boundary conditions (of any of the three kinds, whose combinations make the boundary term vanish) gives $0 = (\lambda_n - \lambda_m)\int_0^l X_m X_n dx$, and since $\lambda_n \neq \lambda_m$ the integral vanishes. This "multiply, subtract, integrate" trick is the template for proving all S-L orthogonality and is worth deriving by hand.

Completeness answers "is superposition enough": finitely many modes certainly cannot represent an arbitrary initial condition, but the eigenfunction system is infinite, and completeness guarantees that $\{X_n\}$ spans the whole space (of piecewise smooth functions) — it is the infinite-dimensional version of "an orthogonal basis exists and everything can be expanded" in linear algebra. The series converges at a discontinuity to the average of the one-sided limits (the same conclusion as for Fourier series) and at a continuity point to the function itself. Physically, completeness says: **every possible motion of the system can be built by superposing its natural modes** — which is why modal analysis can cover all initial conditions.

## 5. Laplace's Equation in Polar Coordinates

When the region is a disc or an annulus, Cartesian eigenfunctions no longer fit the boundary (a simple condition of the type $X(0) = X(l) = 0$ cannot be written on a circular boundary), so polar coordinates must be used. In polar coordinates the two-dimensional Laplace equation is

$$\nabla^2 u = \frac{\partial^2 u}{\partial r^2} + \frac{1}{r} \frac{\partial u}{\partial r} + \frac{1}{r^2} \frac{\partial^2 u}{\partial \theta^2} = 0$$

Set $u(r, \theta) = R(r)\,\Phi(\theta)$ and multiply by $\frac{r^2}{R\Phi}$ to separate:

$$\frac{r^2 R'' + r R'}{R} = -\frac{\Phi''}{\Phi} = \lambda$$

**The angular eigenvalue problem**: $\Phi'' + \lambda \Phi = 0$, where the "boundary condition" comes from a physical requirement — $\theta$ is a periodic variable, $(r, \theta)$ and $(r, \theta + 2\pi)$ are the same point, so $\Phi(\theta + 2\pi) = \Phi(\theta)$ (a periodicity condition, itself a homogeneous boundary condition). Solving gives $\lambda_n = n^2$ and $\Phi_n = \cos n\theta$, $\sin n\theta$ ($n = 0, 1, 2, \ldots$; only the constant for $n = 0$). **The radial equation** $r^2 R'' + r R' - n^2 R = 0$ is an Euler equation; setting $R = r^k$ gives $k = \pm n$, so $R = A r^n + B r^{-n}$. If the region contains the origin (a problem in a disc), the physics requires the temperature or potential to be finite at $r = 0$, so the divergent $r^{-n}$ is discarded, and superposition gives the **general solution inside a disc**:

$$u(r, \theta) = a_0 + \sum_{n=1}^\infty r^n \left( a_n \cos n\theta + b_n \sin n\theta \right)$$

The coefficients are determined by the boundary values on the circle, $u(R_0, \theta) = f(\theta)$: put $r = R_0$, expand $f(\theta)$ in a Fourier series and compare coefficients to get $a_n, b_n$ (for example $a_n = \frac{1}{\pi R_0^n} \int_0^{2\pi} f(\theta) \cos n\theta\, d\theta$). The series may be differentiated term by term inside the disc and converges extremely fast — in fact it can be summed into the **Poisson integral formula**

$$u(r, \theta) = \frac{1}{2\pi} \int_0^{2\pi} \frac{R_0^2 - r^2}{R_0^2 - 2 R_0 r \cos(\theta - \theta') + r^2}\, f(\theta')\, d\theta'$$

which writes "the harmonic function inside a disc is completely determined by the boundary values" as an explicit integral, a quantitative version of the maximum principle and uniqueness. If the region is an annulus (with the origin removed), the $r^{-n}$ terms are retained; for an exterior problem, the condition at infinity ($u$ bounded or tending to a constant) eliminates the $r^n$ terms. So "the boundary conditions of an eigenvalue problem" include not only those explicitly given but also those implicitly required by the geometry of the region (periodicity, boundedness, behaviour at infinity); recognizing these implicit conditions is the key skill in solving problems.

## 6. Rectangular Domains and a Summary of the Procedure

Laplace's equation on a rectangle (the subject of the examples) combines the techniques of the previous two examples: when three of the four sides carry homogeneous conditions and one carries an inhomogeneous value, the homogeneous direction (say $y$) produces sine eigenfunctions $\sin\frac{n\pi y}{b}$ and the inhomogeneous direction (say $x$) produces hyperbolic functions $\sinh$, with the superposition coefficients finally determined by expanding the values on the fourth side in a Fourier series. The hyperbolic functions appear because, after separation of variables for Laplace's equation, both directions are spatial coordinates and the equations are "mirror images" of each other — if one direction oscillates (imaginary eigenvalue), the other must be hyperbolic.

To summarize the applicability criterion and the complete art of separation of variables: **the conditions** are that the equation be linear, that the coefficients be separable (in the coordinate system used), and that the boundary of the region coincide with coordinate surfaces (rectangle, circle, sphere, cylinder). **The procedure** is the fixed four steps: separate → eigenvalue problem → superpose → fix coefficients. **The theoretical pillar** is S-L orthogonality and completeness. **The choice of coordinate system** is dictated by the shape of the region: Cartesian, polar (cylindrical) and spherical each produce their own family of eigenfunctions (trigonometric, Bessel, Legendre). Chapter 7 follows the two roads of spherical and cylindrical coordinates to meet the two most famous families of special functions in mathematical physics.

## 7. Common Errors and Advanced Supplements

Separation of variables involves heavy computation, and errors lurk in the cracks of the procedure, so take stock. **Error one: separating directly with inhomogeneous boundary conditions.** Separation presupposes homogeneous (or periodic) boundary conditions; if they are inhomogeneous (say a rod end at constant temperature $u(0,t) = A$), one must first decompose into "steady state + transient": let $u = v + w$, where $w$ satisfies the inhomogeneous boundary condition and is time-independent (the steady solution) and $v$ satisfies the homogeneous boundary condition and the modified initial condition, then apply separation to $v$. Skipping this step and setting $u = XT$ directly makes the boundary conditions time-dependent, and separation fails immediately. **Error two: forcing the homogeneous method on an inhomogeneous equation.** When the equation carries a source term $f(x,t)$, either use the impulse principle to convert it into modified initial conditions, or expand both the source and the solution in eigenfunctions (the eigenfunction expansion method); assuming $u = \sum c_n(t) X_n(x)$ and substituting into the original equation actually works — expand $f$ as $\sum f_n(t) X_n(x)$ as well and compare coefficients to get a first-order equation for $c_n'(t)$. This "homogeneous method plus mode-by-mode driving" is less error-prone than memorizing the impulse formula. **Error three: skimping on the discussion of the sign of the eigenvalue.** The three cases for $\lambda$ (positive, zero, negative) must be discussed and excluded one by one; in particular $\lambda = 0$ **is** an eigenvalue under second-kind (Neumann) boundary conditions (the constant eigenfunction), and the $a_0$ term of the disc problem is exactly it; assuming "all eigenvalues are positive" loses solutions in insulated-end problems. **Error four: the interval and weight of the orthogonality integral.** The interval of the coefficient integral must match the interval on which the eigenvalue problem is posed, and the weight must match the S-L equation: the weight is $1$ for heat conduction in Cartesian coordinates, $x$ (i.e. $r$) for Bessel expansions in cylindrical coordinates, and $1$ for Legendre expansions in spherical coordinates (but the integration variable is $x = \cos\theta$ with $d x = -\sin\theta\, d\theta$, so do not lose the $\sin\theta$ in the substitution). **Error five: the range of convergence of a series solution.** A series obtained by the power series method converges only up to the nearest singularity; for a long rod or a large region that crosses a singularity of the coefficients, a single series is not enough and one must expand separately on different intervals and match at the junction (continuity of the coefficients and of the derivative); this is the standard variant of the power series method in engineering problems.

One more observation linking this lecture to real problems: **why is the Poisson formula for a disc "better" than the graded series?** The series solution $u = a_0 + \sum r^n(a_n \cos n\theta + b_n \sin n\theta)$ converges more slowly as $r$ approaches the boundary radius (the slow decay of the Fourier coefficients no longer offsets the growth of $r^n$), whereas the Poisson integral sums the series into closed form, computable in one step for any $r$, and incidentally proves that "a harmonic function in a disc is uniquely determined by its boundary values." The comparison reveals a general phenomenon in mathematical physics: series solutions are the universal default form, and a "summable series" upgraded to a closed formula is not only faster to compute but often brings qualitative conclusions (the maximum principle, the mean value property: the temperature at the centre equals the average of the boundary temperatures — obtained from the Poisson formula at $r = 0$). The mean value property is the most elegant feature of harmonic functions and a quick test for any steady solution. The goal of learning separation of variables is exactly to be able to switch freely between "series form" and "integral form" and to choose as needed.`,
  },

  'special-functions': {
    chapter: 'Chapter 7 Special Functions',
    title: 'Legendre and Bessel',
    summary:
      'Separation of variables in spherical and cylindrical coordinates produces the Legendre and Bessel equations; Legendre polynomials, spherical harmonics and Bessel functions form the eigenfunction systems for spherically and cylindrically symmetric problems, and their orthogonality and completeness support modal expansions on spheres and in cylinders.',
    keyPoints: [
      'Variable-coefficient ODEs are solved by power series: expansion at ordinary points and series solutions at regular singular points',
      'The Legendre equation, under the natural boundary condition that solutions be bounded, truncates to the polynomial P_l(x) with l a nonnegative integer',
      'Rodrigues\' formula and the generating function (1−2xt+t²)^{−1/2} are the two great generators of Legendre functions, from which the recurrence relations follow',
      'Spherical problems: associated Legendre functions and spherical harmonics Y_{lm}, a complete eigenfunction system for the angular equation',
      'Bessel functions J_ν are solutions of the radial equation in cylindrical coordinates, and their zeros give the radial eigenvalues',
      'Orthogonality: ∫P_l P_m dx = 2δ_{lm}/(2l+1); ∫ x J_n(λ_m x) J_n(λ_k x) dx is orthogonal with weight',
    ],
    content: String.raw`

The separation of variables of Chapter 6 produced trigonometric eigenfunctions in Cartesian and plane polar coordinates, and all went smoothly. But the physical world is full of spheres and cylinders: conducting spheres in a uniform electrostatic field, temperature distributions in a spherical vessel, electromagnetic modes in a cylindrical waveguide, vibrations of a circular membrane. Separating Laplace's or the wave equation in **spherical** and **cylindrical** coordinates produces ordinary differential equations that are no longer constant-coefficient but variable-coefficient — these are the Legendre and Bessel equations, and their solutions are called special functions. Special functions are not special: they are "the trigonometric functions of spherical and cylindrical problems," occupying exactly the same position as $\sin nx$.

First look at **spherical coordinates** ($r, \theta, \varphi$, with $\theta$ the polar angle). Separating Laplace's equation with $u = R(r)\,\Theta(\theta)\,\Phi(\varphi)$, the azimuthal part gives $\Phi_m = e^{im\varphi}$ (the periodicity condition) and the polar part gives

$$\frac{1}{\sin\theta} \frac{d}{d\theta} \left( \sin\theta\, \frac{d\Theta}{d\theta} \right) + \left[ l(l+1) - \frac{m^2}{\sin^2\theta} \right] \Theta = 0$$

Setting $x = \cos\theta$ turns this into the **associated Legendre equation**; the axisymmetric case $m = 0$ is the **Legendre equation**:

$$(1 - x^2) y'' - 2x y' + l(l+1)\, y = 0$$

The radial part gives the Euler-type equation $r^2 R'' + 2r R' - l(l+1) R = 0$, with solutions $r^l$ and $r^{-l-1}$. Now look at **cylindrical coordinates** ($r, \varphi, z$); after separating off time and $z$ the radial part gives

$$x^2 y'' + x y' + (x^2 - \nu^2) y = 0$$

the **Bessel equation** ($x$ proportional to the radial distance). These equations have variable coefficients, and power functions, exponentials and trigonometric functions are none of them solutions; new machinery must be developed — the **power series method**: at an **ordinary point** of the equation (where the coefficients are analytic) expand the solution in a Taylor-type series, and at a **regular singular point** (such as $x = 0$ for Bessel's equation) expand in a generalized power series $y = x^s \sum a_k x^k$, substituting into the equation and comparing coefficients order by order. Both $x = \pm 1$ for Legendre's equation and $x = 0$ for Bessel's are regular singular points, and the series method gives clean structural results there. The three great families are developed in turn below.

## 2. Legendre Polynomials

At $x = 0$ (an ordinary point), set $y = \sum_{k=0}^\infty a_k x^k$ and substitute into Legendre's equation; comparing coefficients of $x^k$ gives the **three-term recurrence**

$$a_{k+2} = \frac{k(k+1) - l(l+1)}{(k+2)(k+1)}\, a_k$$

The series splits into two independent branches of even and odd parity. The key phenomenon: when $l$ is a nonnegative integer, the recurrence "runs dry" at some point — the numerator $k(k+1) = l(l+1)$ makes a coefficient vanish and the series **truncates to a polynomial**; when $l$ is not an integer, both series diverge at $x = \pm 1$. But $x = \pm 1$ (corresponding to $\theta = 0, \pi$, the poles of the sphere) are regular singular points of the equation, and physics requires the solution to be finite at the poles (a natural boundary condition). Hence: **"l a nonnegative integer" plus "the solution bounded at $\pm 1$" together filter, out of infinitely many solutions, the unique (up to a constant factor) polynomial solution** — the Legendre polynomial $P_l(x)$. This is the eigenvalue-problem idea reappearing with nonconstant coefficients: the discrete index $l = 0, 1, 2, \ldots$ is a product of the boundedness condition. Fixing the constant by the normalization $P_l(1) = 1$, the first few are

$$P_0 = 1, \quad P_1 = x, \quad P_2 = \tfrac{1}{2}(3x^2 - 1), \quad P_3 = \tfrac{1}{2}(5x^3 - 3x), \quad P_4 = \tfrac{1}{8}(35x^4 - 30x^2 + 3)$$

The general expression is **Rodrigues' formula**:

$$P_l(x) = \frac{1}{2^l\, l!} \frac{d^l}{dx^l} \left( x^2 - 1 \right)^l$$

It writes $P_l$ as the $l$-th derivative of a polynomial of degree $l$, from which one immediately reads: $P_l$ is a polynomial of degree $l$ with parity $(-1)^l$ (odd when $l$ is odd), $P_l(1) = 1$, $P_l(-1) = (-1)^l$, and $P_l$ has exactly $l$ zeros, all in $(-1, 1)$. The property most often cited in physics is the **radiation pattern it generates**: as a function of $\theta$, $P_l(\cos\theta)$ has $l$ lobes, which is exactly the source of the angular shapes of atomic orbitals ($s$, $p$, $d$) and of multipole radiation patterns.

## 3. The Generating Function and Recurrence Relations

The Legendre polynomials have another "all-in-one" representation — the **generating function**:

$$\frac{1}{\sqrt{1 - 2xt + t^2}} = \sum_{l=0}^\infty P_l(x)\, t^l, \qquad |t| < 1$$

The left side is the expansion of the inverse distance in electrostatics: expanding the potential of a point charge on the axis in the distance ratio $t = r_< / r_>$, the coefficients are naturally $P_l$ — **the mathematical core of the multipole expansion is exactly the generating function**. Physically, the $l = 0$ term is the monopole (total charge), the $l = 1$ term the dipole ($P_1 = \cos\theta$), the $l = 2$ term the quadrupole ($P_2$), and the infinite series refines the description of the far field level by level. Differentiating the generating function with respect to $t$ or $x$ and comparing coefficients yields a series of **recurrence relations**, the three most used being:

$$(l+1) P_{l+1} = (2l+1)\, x\, P_l - l\, P_{l-1} \qquad \text{(three-term recurrence)}$$

$$P_{l+1}^{\prime} - P_{l-1}^{\prime} = (2l+1) P_l, \qquad (x^2 - 1)\, P_l^{\prime} = l\left( x\, P_l - P_{l-1} \right)$$

The three-term recurrence is a calculator: given $P_0$ and $P_1$, any $P_l$ can be computed by hand; the recurrences involving derivatives are used for differentiating expansions term by term and for verifying differential equations. The generating function even gives $P_l(1)$ for free: set $x = 1$, the left side becomes the expansion $\sum t^l$ of $\frac{1}{1 - t}$, and comparing with the right gives $P_l(1) = 1$, confirming the normalization — this "several results from one formula" quality is why the generating function is used again and again.

## 4. Spherical Harmonics and Boundary Value Problems on a Sphere

When the polar equation carries $m \ne 0$, Legendre's equation is upgraded to the **associated Legendre equation**, whose bounded solutions are the **associated Legendre functions** $P_l^m(x)$ (generated from $P_l$ by $m$ differentiations, with $|m| \le l$). The complete angular eigenfunction, combining the $\theta$ and $\varphi$ parts, is the **spherical harmonic**:

$$Y_{lm}(\theta, \varphi) = N_{lm}\, P_l^m(\cos\theta)\, e^{im\varphi}, \qquad l = 0, 1, 2, \ldots; \quad m = -l, \ldots, l$$

($N_{lm}$ a normalization constant.) $Y_{lm}$ is a complete orthogonal system on the unit sphere: for fixed $l$ there are $2l+1$ values of $m$ (the degeneracy), which is exactly the mathematical origin of the quantization of the $z$-component of angular momentum and of the magnetic quantum number in quantum mechanics; the angular distribution of $|Y_{lm}|^2$ gives the directional shapes of atomic orbitals and molecular bonds. With spherical harmonics, the solution of a **general boundary value problem on a sphere** can be written down as a whole. The general solution of Laplace's equation inside a sphere (without singularities) is

$$u(r, \theta, \varphi) = \sum_{l=0}^\infty \sum_{m=-l}^{l} A_{lm}\, r^l\, Y_{lm}(\theta, \varphi)$$

(for an exterior problem replace $r^l$ by $r^{-l-1}$). The boundary value $u(R_0, \theta, \varphi) = f(\theta, \varphi)$ is expanded in spherical harmonics, with coefficients $A_{lm} = \frac{1}{R_0^l} \int Y_{lm}^* f\, d\Omega$ (divided by the squared normalization). The axisymmetric case ($f$ independent of $\varphi$) degenerates to $m = 0$ only:

$$u(r, \theta) = \sum_{l=0}^\infty A_l\, r^l\, P_l(\cos\theta), \qquad A_l \text{ given by the Legendre expansion of } f(\theta)$$

This is the "polar version" of the disc problem of Chapter 6; the examples carry out $f(\theta) = \cos^2\theta$ in full: decompose the square of the boundary value into $P_0$ and $P_2$ and write the solution in two or three steps. Such computations are routine in electrostatic imaging, the Earth's gravitational potential and spherical-harmonic modelling of magnetic fields.

## 5. Bessel Functions

The radial equation in cylindrical coordinates — Bessel's equation $x^2 y'' + x y' + (x^2 - \nu^2) y = 0$ — has a regular singular point at $x = 0$; solving with the generalized power series $y = x^s \sum a_k x^k$, the indicial equation gives $s = \pm\nu$, yielding two independent solutions:

$$J_\nu(x) = \sum_{k=0}^\infty \frac{(-1)^k}{k!\,\Gamma(k + \nu + 1)} \left( \frac{x}{2} \right)^{2k + \nu} \qquad \text{(Bessel function of the first kind)}$$

The second kind $Y_\nu$ (Neumann function) diverges logarithmically as $x \to 0^+$. If the region contains the cylinder axis ($r = 0$), $Y_\nu$ must be discarded; only annular or exterior regions retain it. The qualitative picture of $J_\nu$ must be remembered: it resembles a damped oscillation — $J_0(0) = 1$, and the zeros of $J_0$, $0 < \mu_1^{(0)} < \mu_2^{(0)} < \cdots$ (approximately $2.405, 5.520, 8.654, \ldots$), gradually approach $\left( n + \tfrac{1}{2} \right)\pi$; $J_1(0) = 0$ and $J_1(x) \approx x/2$ (linear for small $x$). **The zeros are the lifeblood of eigenvalue problems**: for the vibration of a circular membrane, a cylindrical waveguide or heat conduction in a cylindrical rod, the radial eigenvalue problem after separation takes the form

$$\frac{d}{dx} \left( x \frac{dR}{dx} \right) + \left( \lambda x - \frac{n^2}{x} \right) R = 0, \qquad R \text{ finite at } x = 0, \quad R(x_0) = 0$$

an S-L problem with $p = x$ and weight $\rho = x$, whose solutions are $J_n(\sqrt{\lambda} x)$; the boundary condition $R(x_0) = 0$ forces $\sqrt{\lambda}\, x_0 = \mu_m^{(n)}$ (the $m$-th positive zero of $J_n$), hence

$$\lambda_{mn} = \left( \frac{\mu_m^{(n)}}{x_0} \right)^2, \qquad m = 1, 2, 3, \ldots$$

The natural frequencies of a circular membrane are $\omega_{mn} = a\, \mu_m^{(n)} / x_0$ — the inharmonic series of tones heard when a drum is struck is the sound of this string of zeros. Bessel functions likewise have recurrence relations ($\frac{2\nu}{x} J_\nu = J_{\nu-1} + J_{\nu+1}$, $2 J_\nu' = J_{\nu-1} - J_{\nu+1}$), the generating function $e^{\frac{x}{2}(t - 1/t)} = \sum J_n(x) t^n$, and the asymptotic behaviour $J_\nu(x) \approx \sqrt{\frac{2}{\pi x}} \cos\left( x - \frac{\nu\pi}{2} - \frac{\pi}{4} \right)$ (for large $x$ it becomes a damped cosine — far from the axis the wave returns to intuitive behaviour).

## 6. Orthogonality, Completeness and a Survey of Physical Applications

The whole value of special functions ultimately rests on the four words **orthogonal and complete**, because they keep the last two steps of separation of variables (superposition and fixing coefficients) running in spherical and cylindrical problems. Two core orthogonality relations must be memorized:

$$\int_{-1}^{1} P_l(x)\, P_m(x)\, dx = \frac{2}{2l + 1}\, \delta_{lm} \qquad \text{(Legendre squared norm } N_l^2 = \tfrac{2}{2l+1}\text{)}$$

$$\int_0^{x_0} x\, J_n\!\left( \frac{\mu_m^{(n)}}{x_0} x \right) J_n\!\left( \frac{\mu_k^{(n)}}{x_0} x \right) dx = 0 \ (m \ne k), \qquad N^2 = \frac{x_0^2}{2} \left[ J_{n+1}\!\left( \mu_m^{(n)} \right) \right]^2$$

Note that Bessel orthogonality carries the **weight** $x\, dx$: the weight comes from the cylindrical volume element $r\, dr\, d\varphi\, dz$ and corresponds exactly to the position of $\rho(x)$ in S-L theory; the squared norm formula (containing $J_{n+1}(\mu_m^{(n)})$) is the standard component in computing expansion coefficients in a disc. Completeness guarantees that every (piecewise continuous) function on a sphere can be expanded in spherical harmonics and every function in a cylinder in Bessel functions — called the **generalized Legendre expansion** and the **Fourier–Bessel expansion** respectively.

A survey of physical applications, closing the methods of the whole book. **Electrostatics**: a grounded conducting sphere in a uniform external field is solved with just the two terms $P_1$ and $r^{\pm 1}$; the multipole expansion of a point charge's potential is the generating function. **Quantum mechanics**: the hydrogen wave function $\psi_{nlm} = R_{nl}(r) Y_{lm}(\theta, \varphi)$, with the angular part the spherical harmonics; the eigenvalue problem of the angular momentum operators is the spherical harmonic equation. **Elasticity and acoustics**: the vibration modes of a circular membrane are $J_n(\mu_m^{(n)} r/x_0) e^{in\varphi}$, the mathematical explanation of Chladni figures; the cutoff frequencies of the $\text{TE}$ and $\text{TM}$ modes of a cylindrical waveguide are fixed by the zeros of Bessel functions. **Heat conduction**: cooling in a cylinder expands in a Fourier–Bessel series multiplied by exponentially decaying factors. The methodological loop is now closed: physical law → partial differential equation → choice of coordinates → separation of variables → special-function eigenbasis → orthogonal expansion → solution. Master this assembly line and the great majority of linear problems in classical mathematical physics have a systematic solution.

## 7. Common Errors and Further Reading

Errors with special functions concentrate on three dimensions — indices, weights and normalization — so defuse them one by one. **Error one: not distinguishing $l(l+1)$ from an arbitrary separation constant.** After separation in spherical coordinates the radial and angular equations are coupled through a shared constant; by convention the angular eigenvalue is written $l(l+1)$ rather than $\lambda$, which keeps the Legendre equation clean and lets $l$ serve directly as the degree of the polynomial; fix the convention before starting, to avoid mixing them midway. **Error two: the range of $m$ for associated Legendre functions.** $P_l^m$ is meaningful only for $|m| \le l$; $m$ is an integer produced by the periodicity condition in the azimuthal angle, and negative $m$ is related to positive $m$ by $P_l^{-m} \propto P_l^m$ (up to a normalization factor); writing a combination such as $l = 1, m = 2$ is a blunder. **Error three: the complex conjugate in spherical harmonics.** $Y_{lm}$ is complex (containing $e^{im\varphi}$), so the coefficient formula must carry the conjugate, $\int Y_{lm}^* f\, d\Omega$; when expanding a real function the coefficients for $\pm m$ satisfy conjugate pairing, and carelessly dropping the star yields a complex-valued "real field." **Error four: the weight $x$ in Bessel orthogonality.** The integral for fixing coefficients in a cylinder is $\int x J_n(\cdots) J_n(\cdots) dx$; dropping the $x$ means using the wrong inner product and all coefficients are wrong; the squared norm $\frac{x_0^2}{2} J_{n+1}^2(\mu_m^{(n)})$ is derived using the recurrence relations, and deriving it once by hand is worthwhile. **Error five: retaining $Y_\nu$ when the region contains the axis.** $Y_\nu$ diverges as $x \to 0$, so any region containing $r = 0$ (a solid cylinder, a circular membrane) discards it; only annular or exterior domains allow it, exactly parallel to the treatment of the $r^{-l-1}$ term in spherical problems.

Two further threads point the way onwards. **First, Bessel functions of the second and third kind, and waves.** With the time factor $e^{-i\omega t}$, the radial solutions for cylindrical waves are the Hankel functions $H_\nu^{(1,2)} = J_\nu \pm i Y_\nu$, whose asymptotic form $\sqrt{\frac{2}{\pi x}} e^{\pm i(x - \nu\pi/2 - \pi/4)}$ describes outgoing and incoming cylindrical waves — the "outgoing radiation condition" in scattering theory is expressed by Hankel functions, just as plane waves are expressed by $e^{ikz}$; the spherical counterpart is the spherical Bessel function $j_l(x) = \sqrt{\frac{\pi}{2x}} J_{l+1/2}(x)$, which is the solution of the radial equation for hydrogen (times an exponentially decaying factor). **Second, a unified view of special functions.** Legendre, Bessel, Hermite (harmonic oscillator) and Laguerre (radial hydrogen) functions are all eigenfunctions of Sturm–Liouville problems, each orthogonal with weight and each complete; numerically they all have stable recurrences and standard software implementations. In other words, "special functions" are the complete unfolding of the eigenvalue idea in the major coordinate systems; learn any one family and the rest are just the same procedure with a different equation — which is exactly why Chapter 7 follows separation of variables: special functions are not a memory burden but the fruit the method grows naturally.

Two more practical computational matters to close. **The complete action of fixing expansion coefficients**, taking an axisymmetric problem inside a sphere: with boundary value $u(R_0, \theta) = f(\theta)$ and solution $u = \sum A_l r^l P_l(\cos\theta)$, put $r = R_0$ and use the orthogonality $\int_{-1}^{1} P_l P_m dx = \frac{2}{2l+1}\delta_{lm}$ to get

$$A_l = \frac{2l + 1}{2 R_0^l} \int_{-1}^{1} f(\arccos x)\, P_l(x)\, dx$$

Note the two easily missed factors: $R_0^l$ in the denominator (from substituting $r = R_0$ into $r^l$ and solving for $A_l$) and the change of integration variable to $x = \cos\theta$. If $f$ happens to be a polynomial of low degree (such as $\cos^2\theta$ or $\cos^3\theta$), use the recurrence relations to rewrite the polynomial as a linear combination of $P_l$; then the expansion has only two or three terms and no integration is needed — this is the first choice in examinations and in practice, and term-by-term integration is necessary only for $f$ without polynomial structure. **Tables and the numerical side** also deserve mention: in engineering practice Bessel functions come from standard libraries, and before use one must decide which branch suits the range of the argument (series for small $x$, asymptotics for large $x$); the zeros $\mu_m^{(n)}$ are tabulated, and $J_{n+1}(\mu_m^{(n)})$ in the norm formula can also be computed from the tabulated values via the recurrence. The correct posture for combining hand derivation with numerical tools is: perform the separation of variables and eigenvalue analysis by hand (that is the core of understanding) and leave the evaluation of special functions to software — framework in the human brain, computation in the machine, each doing its part. At this point, from complex functions, complex integration and series expansions to Fourier analysis, boundary value problems, separation of variables and finally special functions, one complete main line of mathematical methods in physics has been traced: it begins with "seeing functions more strictly" and ends with "computing physics more accurately."`,
  },
};

export default map;
