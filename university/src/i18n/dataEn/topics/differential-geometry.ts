import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'curve-theory': {
    chapter: 'Chapter 1 Curve Theory',
    title: 'Curve Theory: Curvature and Torsion',
    summary:
      'A curve is completely determined by its curvature and torsion (up to a rigid motion)—the "fundamental theorem of kinematics" of geometry.',
    content: String.raw`

How do we describe a space curve completely in mathematics? An equation alone is not enough—the same shape can be traced at different speeds (the shape does not change whether you walk fast or slow). What we want are quantities independent of the tracing, depending only on the curve itself.

Prelude: flying an aircraft along a curve, you feel two things—how sharply you turn (curvature) and how much you roll (torsion). The fundamental theorem says: record the curvature and torsion at every point along the way, and the curve is uniquely determined (up to a translation and rotation). Curvature and torsion are the DNA of a curve, just as a fingerprint uniquely identifies a person.

But turning this intuition into a theorem requires solving three technical problems first: how to remove the influence of the parametrization speed? How to build at each point a frame that moves with the curve? How to define curvature and torsion in terms of that frame? This chapter unfolds in that order.

## 2. Rigorous Definitions

**Parametric curve**. A parametric curve is a smooth map $\vec r:I\to\mathbb{R}^3$, where $I$ is an interval and $\vec r(t)=(x(t),y(t),z(t))$. It is called regular if $\vec r'(t)\ne\vec 0$ for every $t$.

**Arc length**. The arc length from $t_0$ to $t$ is defined as

$$s(t)=\int_{t_0}^{t}\lvert\vec r'(\tau)\rvert\,d\tau.$$

If $\vec r$ is regular, $s'(t)=\lvert\vec r'(t)\rvert>0$, so $s$ is strictly increasing and invertible. Replacing $t$ by the inverse function of $s$ gives the arc-length parametrization $\vec r(s)$, satisfying

$$\left\lvert\frac{d\vec r}{ds}\right\rvert=1.$$

This is the unit-speed parametrization: the curve is traced at constant speed $1$ and the formulas are cleanest.

**The Frenet frame** (for the arc-length parametrization). Define

$$\vec T(s)=\vec r'(s),\qquad \kappa(s)=\lvert\vec T'(s)\rvert,\qquad \vec N(s)=\frac{\vec T'(s)}{\kappa(s)}\quad(\kappa>0),$$

$$\vec B(s)=\vec T(s)\times\vec N(s).$$

$\vec T$ is the unit tangent, $\vec N$ the principal normal (pointing to the inside of the bend), and $\vec B$ the binormal. Together they form a right-handed orthonormal frame $\{\vec T,\vec N,\vec B\}$ called the Frenet frame. $\kappa$ is the curvature.

**Torsion**. Define

$$\tau(s)=-\vec B'(s)\cdot\vec N(s).$$

**The Frenet–Serret formulas**. Under the above definitions,

$$\vec T'=\kappa\vec N,\qquad \vec N'=-\kappa\vec T+\tau\vec B,\qquad \vec B'=-\tau\vec N.$$

These three formulas say that the variation of the frame along the curve is completely governed by the two functions $\kappa$ and $\tau$.

**The three special planes**. The plane through $\vec r(s)$ with normal $\vec B$ is the osculating plane, spanned by $\vec T,\vec N$; the plane with normal $\vec T$ is the normal plane, spanned by $\vec N,\vec B$; the plane with normal $\vec N$ is the rectifying plane, spanned by $\vec T,\vec B$.

**Osculating circle**. Where $\kappa>0$, the circle in the osculating plane with centre $\vec r(s)+\vec N(s)/\kappa(s)$ and radius $1/\kappa(s)$ is the osculating circle; it has second-order contact with the curve at that point.

**Formulas for a general parameter**. If $\vec r(t)$ is not reparametrized by arc length, then

$$\kappa=\frac{\lvert\vec r'\times\vec r''\rvert}{\lvert\vec r'\rvert^3},\qquad \tau=\frac{(\vec r'\times\vec r'')\cdot\vec r'''}{\lvert\vec r'\times\vec r''\rvert^2}.$$

Both formulas require $\vec r'\times\vec r''\ne\vec 0$, i.e. $\kappa>0$.

**Curvature of a plane curve**. If $\vec r(t)=(x(t),y(t),0)$, then

$$\kappa=\frac{\lvert x'y''-y'x''\rvert}{((x')^2+(y')^2)^{3/2}}.$$

If the curve is the graph of a function $y=f(x)$, then

$$\kappa=\frac{\lvert f''(x)\rvert}{(1+f'(x)^2)^{3/2}}.$$

**Fundamental theorem of curve theory**. Given continuous functions $\kappa(s)>0$ and $\tau(s)$ on an interval $I$, there exists a unique (up to a rigid motion) unit-speed curve $\vec r:I\to\mathbb{R}^3$ whose curvature and torsion are exactly $\kappa,\tau$.

## 3. Why Define It This Way

**Why require regularity $\vec r'\ne\vec 0$?** Otherwise cusps appear, the tangent is undefined and the frame collapses. Counterexample: $\vec r(t)=(t^2,t^3)$, whose derivative is $(2t,3t^2)$ and vanishes at $t=0$; the image has a cusp at the origin, the two branches have opposite tangent directions, and there is no unique tangent. Regularity guarantees that the curve turns smoothly, like a motorway with no sudden dead end.

**Why use the arc-length parameter?** Because $\lvert\vec r'(s)\rvert=1$ makes $\vec T'\perp\vec T$: differentiating $\vec T\cdot\vec T=1$ gives $2\vec T\cdot\vec T'=0$. Hence $\vec T'$ lies entirely in the normal direction, the curvature is simply $\lvert\vec T'\rvert$, and the principal normal is the normalization of $\vec T'$. With another parameter, $\vec T'$ picks up a tangential component and the formulas need an extra subtraction—a clumsy derivation.

**Why does the principal normal point to the inside of the bend?** For the circle $\vec r(s)=(R\cos(s/R),R\sin(s/R),0)$, $\vec T=(-\sin,\cos,0)$ and $\vec T'=(-\cos,-\sin,0)/R$, which points to the centre. A general curve is approximated near a point by its osculating circle, and $\vec T'$ points to that circle's centre—the side toward which the curve bends. So $\vec N$ is the inward direction of the bend.

**Why define the binormal by a cross product?** The cross product gives a unit vector perpendicular to both $\vec T$ and $\vec N$, completing a right-handed orthogonal system and pointing along the axis of twist. It rotates with the curve and records the direction of twisting. For a plane curve, $\vec B$ is constantly perpendicular to the plane, so $\vec B'=0$ and $\tau=0$.

**Why is curvature nonnegative while torsion may have either sign?** Curvature measures how sharply the curve bends—magnitude without direction—so $\kappa\ge0$. Torsion measures the direction of the twist: a right-handed helix has $\tau>0$, a left-handed one $\tau<0$, and a plane curve $\tau=0$. The sign records the sense in which the frame rotates about $\vec T$.

**Counterexample: a line has no Frenet frame.** For the line $\vec r(s)=\vec a s+\vec b$, $\vec T=\vec a$ is constant and $\vec T'=0$, so $\kappa=0$ and $\vec N=\vec T'/\kappa$ is undefined. With zero curvature, the osculating plane and principal normal are not unique. The Frenet frame exists only at points with $\kappa>0$; the fundamental theorem requires $\kappa>0$ precisely to avoid this degeneracy.

**Signed curvature of a plane curve**. For a plane curve one may attach a sign to the curvature:

$$k=\frac{x'y''-y'x''}{((x')^2+(y')^2)^{3/2}}.$$

$k>0$ means the curve turns left, $k<0$ turns right, and $\lvert k\rvert=\kappa$. The signed curvature distinguishes two curves that are mirror images, which the unsigned curvature cannot; this is why plane curve theory carries one more sign of information than space curve theory.

**Why is $\tau=0$ equivalent to being a plane curve?** If the curve lies in some plane, both $\vec T,\vec N$ lie in that plane, $\vec B$ is constantly its normal, hence $\vec B'=0$ and $\tau=0$. Conversely, if $\tau=0$ then $\vec B'=0$ and $\vec B$ is constant; then $(\vec r\cdot\vec B)'=\vec T\cdot\vec B=0$, so $\vec r\cdot\vec B$ is constant and the curve lies in the plane perpendicular to $\vec B$. Torsion is thus the rate at which the curve leaves its osculating plane.

**Why does the fundamental theorem hold?** Write the Frenet–Serret formulas as a first-order linear system of ODEs for $(\vec T,\vec N,\vec B)$, with coefficients given by $\kappa,\tau$. Given an initial frame (a rigid motion), the Picard–Lindelöf theorem gives a unique solution; integrating $\vec r'=\vec T$ then yields the curve. Changing the initial frame merely applies a rigid motion to the curve. So $(\kappa,\tau)$ really are a complete set of invariants.

## 4. Intuition and Pictures

> Intuition: the curvature $\kappa$ is how sharply you turn (a circle of radius $R$ has $\kappa=1/R$; the flatter the bend, the larger the circle and the smaller the curvature); the torsion $\tau$ is how hard you twist—a plane curve has $\tau=0$.

| Curve | $\kappa$ | $\tau$ | Shape |
|---|---|---|---|
| Line | $0$ | $0$ | Neither bends nor twists |
| Circle | $1/R$ | $0$ | Uniform bend, no twist |
| Circular helix | $a/(a^2+b^2)$ | $b/(a^2+b^2)$ | Uniform bend, uniform twist |
| Plane curve | varies | $0$ | Always in one plane |

> Even more concretely: imagine riding a bicycle along the curve. $\vec T$ is where your face points, $\vec N$ is the direction you lean inward (centrifugal force pushes you out, so you lean in), and $\vec B$ points from your feet to your head. Large curvature means you lean hard (a sharp turn); large torsion means you are simultaneously rolling (a spiralling climb).

| Claim | Right or wrong | Explanation |
|---|---|---|
| Curvature is $\lvert\vec r''\rvert$ | Wrong | The tangential acceleration must be removed; the correct formula is $\lvert\vec r'\times\vec r''\rvert/\lvert\vec r'\rvert^3$ |
| Zero torsion means a straight line | Wrong | Zero torsion only means the curve is planar; a circle also qualifies |
| Zero curvature means a straight line | Right | $\kappa\equiv0$ forces $\vec T$ constant, hence a line |
| Curvature depends on the parametrization | Wrong | Curvature is geometric and invariant under reparametrization |
| The principal normal always points into the curve | Right | It points to the centre of the osculating circle |

The osculating circle is the best circular approximation to the curve at that point: it shares the tangent and the curvature, its centre lies along $\vec N$, and its radius is $1/\kappa$. The larger the curvature, the smaller the osculating circle and the sharper the turn; when the curvature vanishes the osculating circle degenerates to a line.

## 5. Worked Examples

### Example 1 (Basic: curvature and torsion of a circle)

Problem: for the circle $\vec r(t)=(R\cos t,R\sin t,0)$, find the arc-length parametrization, the Frenet frame, the curvature and the torsion.

Analysis: replace $t$ by the arc length $s=Rt$, then apply the definitions one by one.

Solution: $\vec r'(t)=(-R\sin t,R\cos t,0)$ and $\lvert\vec r'(t)\rvert=R$, so $s=Rt$, i.e. $t=s/R$. The arc-length parametrization is

$$\vec r(s)=\left(R\cos\frac{s}{R},R\sin\frac{s}{R},0\right).$$

Hence

$$\vec T(s)=\vec r'(s)=\left(-\sin\frac{s}{R},\cos\frac{s}{R},0\right),$$

$$\vec T'(s)=\left(-\frac{1}{R}\cos\frac{s}{R},-\frac{1}{R}\sin\frac{s}{R},0\right).$$

So

$$\kappa=\lvert\vec T'\rvert=\frac{1}{R},\qquad \vec N=\frac{\vec T'}{\kappa}=\left(-\cos\frac{s}{R},-\sin\frac{s}{R},0\right).$$

$\vec N$ points exactly to the centre, consistent with "the principal normal points into the bend". Next the binormal:

$$\vec B=\vec T\times\vec N=(0,0,1).$$

$\vec B$ is constant, so $\vec B'=0$ and $\tau=-\vec B'\cdot\vec N=0$. The osculating plane is $z=0$, the osculating circle is the circle itself, with centre at the origin and radius $R$.

Comment: the curvature of a circle is the constant $1/R$ and its torsion is zero. The larger the radius, the smaller the curvature; as $R\to\infty$, $\kappa\to0$, matching a straight line. This example is the benchmark for every curvature computation.

### Example 2 (Intermediate: the circular helix)

Problem: for the helix $\vec r(t)=(a\cos t,a\sin t,bt)$ with $a>0$, find the curvature and torsion and verify the Frenet–Serret formulas.

Analysis: the speed is constant, $\sqrt{a^2+b^2}$, so we may use the arc-length parameter $s=vt$.

Solution: $\vec r'(t)=(-a\sin t,a\cos t,b)$, so

$$v=\lvert\vec r'\rvert=\sqrt{a^2+b^2},\qquad s=vt.$$

The unit tangent is

$$\vec T=\frac{\vec r'}{v}=\frac{1}{v}(-a\sin t,a\cos t,b).$$

Differentiate with respect to $s$, noting $d/dt=v\,d/ds$:

$$\frac{d\vec T}{ds}=\frac{1}{v}\frac{d\vec T}{dt}=\frac{1}{v^2}(-a\cos t,-a\sin t,0).$$

Hence

$$\kappa=\left\lvert\frac{d\vec T}{ds}\right\rvert=\frac{a}{v^2}=\frac{a}{a^2+b^2},$$

$$\vec N=\frac{1}{\kappa}\frac{d\vec T}{ds}=(-\cos t,-\sin t,0).$$

The binormal is

$$\vec B=\vec T\times\vec N=\frac{1}{v}(-a\sin t,a\cos t,b)\times(-\cos t,-\sin t,0).$$

Component by component:

$$(-a\sin t)(-\sin t)-b(-\sin t)=b\sin t,$$

$$-\big((-a\sin t)\cdot0-b(-\cos t)\big)=-b\cos t,$$

$$(-a\sin t)(-\sin t)-(a\cos t)(-\cos t)=a.$$

Hence

$$\vec B=\frac{1}{v}(b\sin t,-b\cos t,a).$$

Differentiating again with respect to $s$:

$$\frac{d\vec B}{ds}=\frac{1}{v^2}(b\cos t,b\sin t,0)=-\frac{b}{v^2}(-\cos t,-\sin t,0)=-\frac{b}{v^2}\vec N.$$

From $\vec B'=-\tau\vec N$,

$$\tau=\frac{b}{v^2}=\frac{b}{a^2+b^2}.$$

Finally verify $\vec N'=-\kappa\vec T+\tau\vec B$:

$$\frac{d\vec N}{ds}=\frac{1}{v}(\sin t,-\cos t,0),$$

$$-\kappa\vec T+\tau\vec B=-\frac{a}{v^3}(-a\sin t,a\cos t,b)+\frac{b}{v^3}(b\sin t,-b\cos t,a).$$

First component: $(a^2\sin t+b^2\sin t)/v^3=\sin t/v$; second: $(-a^2\cos t-b^2\cos t)/v^3=-\cos t/v$; third: $(-ab+ab)/v^3=0$. This agrees with $d\vec N/ds$.

Comment: both curvature and torsion of the helix are constant, which is exactly why "a curve of constant curvature and torsion is a helix". When $b>0$, $\tau>0$ and the helix is right-handed; $a=0$ degenerates to a line, $b=0$ to a circle.

### Example 3 (Advanced: curvature and torsion for a general parameter)

Problem: for the curve $\vec r(t)=(t,t^2,t^3)$, find the curvature and torsion at $t=1$, and write down the Frenet frame and the osculating plane there.

Analysis: use the general-parameter formulas directly; first compute $\vec r',\vec r'',\vec r'''$ and the cross product.

Solution: differentiating,

$$\vec r'=(1,2t,3t^2),\qquad \vec r''=(0,2,6t),\qquad \vec r'''=(0,0,6).$$

At $t=1$:

$$\vec r'=(1,2,3),\qquad \vec r''=(0,2,6),\qquad \vec r'''=(0,0,6).$$

The cross product is

$$\vec r'\times\vec r''=(2\cdot6-3\cdot2,\;3\cdot0-1\cdot6,\;1\cdot2-2\cdot0)=(6,-6,2).$$

Hence

$$\lvert\vec r'\times\vec r''\rvert=\sqrt{36+36+4}=\sqrt{76}=2\sqrt{19},$$

$$\lvert\vec r'\rvert=\sqrt{1+4+9}=\sqrt{14}.$$

Thus

$$\kappa=\frac{2\sqrt{19}}{(\sqrt{14})^3}=\frac{2\sqrt{19}}{14\sqrt{14}}=\frac{\sqrt{19}}{7\sqrt{14}}\approx0.1664.$$

The torsion is

$$\tau=\frac{(\vec r'\times\vec r'')\cdot\vec r'''}{\lvert\vec r'\times\vec r''\rvert^2}=\frac{(6,-6,2)\cdot(0,0,6)}{76}=\frac{12}{76}=\frac{3}{19}\approx0.1579.$$

The Frenet frame:

$$\vec T=\frac{(1,2,3)}{\sqrt{14}},\qquad \vec B=\frac{(6,-6,2)}{2\sqrt{19}}=\frac{(3,-3,1)}{\sqrt{19}},$$

$$\vec N=\vec B\times\vec T=\frac{(-11,-8,9)}{\sqrt{266}}.$$

Direct check: $\vec N\cdot\vec T=(-11-16+27)/\sqrt{266\cdot14}=0$, $\vec N\cdot\vec B=(-33+24+9)/\sqrt{266\cdot19}=0$, and $\lvert\vec N\rvert=1$.

The osculating plane passes through $\vec r(1)=(1,1,1)$ with normal $\vec B=(3,-3,1)$, so its equation is

$$3(x-1)-3(y-1)+(z-1)=0,$$

i.e. $3x-3y+z-1=0$.

Comment: the trap is that $\lvert\vec r''\rvert/\lvert\vec r'\rvert^2$ is not the curvature. That would give $\sqrt{40}/14\approx0.452$, far from the correct answer. The reason is that $\vec r''$ contains a tangential component, which must be removed with the cross product. Only when $\vec r'\cdot\vec r''=0$ (constant speed, for instance) do the two coincide; the helix satisfies exactly this condition, which is why the shortcut works there.

## 6. Common Mistakes and Pitfalls

- Mistake: applying $\kappa=\lvert\vec T'\rvert$ with a non-arc-length parameter. Correction: either use the arc-length parametrization first or apply the general formula $\kappa=\lvert\vec r'\times\vec r''\rvert/\lvert\vec r'\rvert^3$.
- Mistake: taking $\lvert\vec r''\rvert$ as the curvature. Correction: $\vec r''$ includes tangential acceleration, which must be removed; only constant-speed parametrizations have no tangential component.
- Mistake: forgetting to normalize $\vec N$ and $\vec B$. Correction: the Frenet frame requires all three vectors to be unit vectors; otherwise the cross product and the torsion formula go wrong.
- Mistake: omitting the closing brace of $\{\vec T,\vec N,\vec B\}$. Correction: the frame is a triple; always write it out fully as $\{\vec T,\vec N,\vec B\}$.
- Mistake: thinking a negative torsion is meaningless. Correction: the sign gives the sense of the twist (left- or right-handed) and the absolute value its severity.
- Mistake: confusing the directions of the principal normal and the binormal. Correction: $\vec N$ points to the centre of curvature (into the bend), $\vec B$ is perpendicular to the osculating plane.
- Mistake: assuming large curvature means a tight coil. Correction: torsion matters too; a helix may have modest curvature yet twist continuously.
- Mistake: forcing the Frenet formulas at points with $\kappa=0$. Correction: on lines or at inflection points $\vec N$ is undefined and the frame degenerates; handle such pieces separately or reparametrize.
- Mistake: writing the centre of the osculating circle as $\vec r+\vec B/\kappa$. Correction: the centre lies along $\vec N$, i.e. $\vec r+\vec N/\kappa$, with radius $1/\kappa$.
- Mistake: believing reparametrization changes the curvature. Correction: curvature and torsion are geometric invariants depending only on the shape, not on how it is traced.

## 7. Summary and Mnemonic

Key points:

- The arc-length parametrization gives $\lvert\vec r'(s)\rvert=1$ and the simplest formulas;
- The Frenet frame $\{\vec T,\vec N,\vec B\}$ is a right-handed orthonormal frame moving with the curve;
- Curvature measures bending, $\kappa=\lvert\vec T'\rvert$; torsion measures twisting, $\tau=-\vec B'\cdot\vec N$;
- Frenet–Serret: $\vec T'=\kappa\vec N$, $\vec N'=-\kappa\vec T+\tau\vec B$, $\vec B'=-\tau\vec N$;
- General parameter: $\kappa=\lvert\vec r'\times\vec r''\rvert/\lvert\vec r'\rvert^3$, $\tau=(\vec r'\times\vec r'')\cdot\vec r'''/\lvert\vec r'\times\vec r''\rvert^2$;
- Fundamental theorem: $(\kappa,\tau)$ determine the curve uniquely up to a rigid motion.

Mnemonic: **"Arc length makes it clean, TNB stays right-handed; curvature bends, torsion twists."**`,
    keyPoints: [
      'Arc-length parametrization gives |r\'(s)| = 1 and the simplest formulas',
      'The Frenet frame {T,N,B} is an orthonormal system moving with the curve',
      'Curvature measures bending, torsion twisting; a circle has κ=1/R',
      'Fundamental theorem: (κ, τ) determine the curve up to a rigid motion',
    ],
  },
  'surface-theory': {
    chapter: 'Chapter 2 Surface Theory',
    title: 'Surface Theory: The Two Fundamental Forms',
    summary:
      'The first fundamental form governs measurement, the second governs bending—the whole geometry of a surface lives in these two quadratic forms.',
    content: String.raw`

How does one do geometry on a surface (a sphere, a saddle)? We need to measure lengths on it, compute areas, and see how it bends into three-dimensional space. Everything rests on two quadratic forms: the first fundamental form handles intrinsic measurement (the surface's own internal metric), the second handles extrinsic bending (how it curves outward).

Prelude: a sheet of paper lying flat has very simple forms; roll it into a tube and the intrinsic measurement is unchanged (lines drawn on the paper keep their lengths), but the extrinsic bending changes. Gauss discovered that the Gaussian curvature measuring the bending is determined by the first form alone—the deepest surprise in differential geometry, and the seed of intrinsic geometry.

This chapter packs "measurement" and "bending" into two quadratic forms and shows how they combine into normal curvature, principal curvatures, Gaussian curvature and mean curvature. Once you own this language, the local geometry of a surface becomes a string of computable numbers.

## 2. Rigorous Definitions

**Regular parametrized surface**. Let $U\subset\mathbb{R}^2$ be open and $\vec r:U\to\mathbb{R}^3$ a smooth map. $\vec r$ is a regular parametrized surface if for every $(u,v)\in U$,

$$\vec r_u(u,v)\times\vec r_v(u,v)\ne\vec 0.$$

Then every point has a unique tangent plane and a unit normal

$$\vec n=\frac{\vec r_u\times\vec r_v}{\lvert\vec r_u\times\vec r_v\rvert}.$$

**First fundamental form**. Define

$$E=\vec r_u\cdot\vec r_u,\qquad F=\vec r_u\cdot\vec r_v,\qquad G=\vec r_v\cdot\vec r_v,$$

$$\mathrm I=E\,du^2+2F\,du\,dv+G\,dv^2.$$

**Second fundamental form**. Define

$$L=\vec r_{uu}\cdot\vec n,\qquad M=\vec r_{uv}\cdot\vec n,\qquad N=\vec r_{vv}\cdot\vec n,$$

$$\mathrm{II}=L\,du^2+2M\,du\,dv+N\,dv^2.$$

**Geometric quantities**. The squared length of a small displacement $d\vec r=\vec r_u du+\vec r_v dv$ is

$$\lvert d\vec r\rvert^2=\mathrm I,$$

so the first form is the metric. The area element is

$$dA=\sqrt{EG-F^2}\,du\,dv.$$

The angle between two parameter curves is determined by $E,F,G$: when $F=0$ the parameter curves are orthogonal.

**Normal curvature**. Along a unit tangent direction $d\vec r$, the normal curvature is

$$\kappa_n=\frac{\mathrm{II}}{\mathrm I}=\frac{L\,du^2+2M\,du\,dv+N\,dv^2}{E\,du^2+2F\,du\,dv+G\,dv^2}.$$

It is the normal component of the surface's bending in that direction.

**Shape operator and principal curvatures**. The shape operator $S=-d\vec n$ is a self-adjoint linear operator on the tangent plane (symmetric with respect to the first form). Its two eigenvalues $\kappa_1,\kappa_2$ are the principal curvatures and the corresponding eigendirections the principal directions. Hence

$$K=\det S=\kappa_1\kappa_2=\frac{LN-M^2}{EG-F^2},$$

$$H=\frac12\operatorname{tr}S=\frac{\kappa_1+\kappa_2}{2}=\frac{EN+GL-2FM}{2(EG-F^2)}.$$

$K$ is the Gaussian curvature and $H$ the mean curvature.

**Gauss map**. The map $\vec n:S\to S^2$ sending each point to its unit normal is the Gauss map. Its differential is the shape operator (up to sign), so $K$ is the Jacobian determinant of the Gauss map.

**Theorema Egregium**. The Gaussian curvature $K$ depends only on the first fundamental form $E,F,G$ and their derivatives, not on how the surface is embedded in $\mathbb{R}^3$. That is, $K$ is intrinsic; the mean curvature $H$ is not.

## 3. Why Define It This Way

**Why is the first form a dot product?** Because for a small displacement $d\vec r=\vec r_u du+\vec r_v dv$ on the surface, bilinear expansion gives its squared length as

$$\lvert d\vec r\rvert^2=E\,du^2+2F\,du\,dv+G\,dv^2.$$

The dot product naturally yields lengths and angles, so the first form is the surface's tape measure. It is positive definite: by the linear independence of $\vec r_u,\vec r_v$ and the Cauchy–Schwarz inequality,

$$EG-F^2=\lvert\vec r_u\rvert^2\lvert\vec r_v\rvert^2-(\vec r_u\cdot\vec r_v)^2>0.$$

**Why does the second form dot $\vec r_{uu}$ with the normal?** $\vec r_{uu}$ describes the acceleration with which the surface bends along a parameter direction. Its component along the normal is the second-order quantity telling whether the surface bulges out or caves in; the tangential component only reflects the speed of the parametrization, not geometry. Dotting with the unit normal filters out exactly the normal component. Note that $\vec r_{uu}\cdot\vec r_u=\frac12 E_u$, which involves only derivatives of the first form and carries no extrinsic bending, so it cannot be used to define the second form.

**Why does the second form depend on the orientation of the normal?** If $\vec n$ is replaced by $-\vec n$, then $L,M,N$ all change sign, so does $\mathrm{II}$, so does the normal curvature, and so does the mean curvature; but the Gaussian curvature $K=LN-M^2$ is quadratic and does not change sign. Hence $K$ is intrinsic bending, while $H$ depends on which side you call "outside".

**Why are the principal curvatures eigenvalues of the shape operator?** The normal curvature $\kappa_n$ is a function of the direction $d\vec r$. Writing it as $\mathrm{II}(v,v)/\mathrm{I}(v,v)$, extremizing it gives the generalized eigenvalue problem $\det(\mathrm{II}-\kappa\mathrm{I})=0$. The shape operator is self-adjoint (symmetric with respect to $\mathrm I$), which guarantees real eigenvalues and mutually orthogonal eigendirections. The two eigenvalues are the maximum and minimum of the normal curvature.

**Why are the principal directions orthogonal?** Because $S$ is self-adjoint with respect to the first form:

$$\langle S(v),w\rangle=\mathrm{II}(v,w)=\mathrm{II}(w,v)=\langle v,S(w)\rangle.$$

Eigenvectors of a self-adjoint operator belonging to distinct eigenvalues are necessarily orthogonal (for a positive definite inner product). So the two principal directions are always perpendicular, and near each point the surface can be cut along them into two orthogonal lines of curvature.

**Why is $K$ intrinsic while $H$ is not?** The proof of the theorema egregium writes $K$ as an explicit expression in $E,F,G$ and their first and second derivatives, so knowing only the metric on the surface suffices to compute $K$, with no knowledge of how it bends in $\mathbb{R}^3$. The mean curvature depends on the choice of normal and on the embedding: a plane and a cylinder share the same first form (both $du^2+dv^2$), yet the plane has $H=0$ and the cylinder $H=-1/2$, showing that $H$ is not intrinsic.

**Counterexample: what if the normal is not normalized?** If $\vec N=\vec r_u\times\vec r_v$ is used instead of the unit normal $\vec n$, then $L,M,N$ are all multiplied by $\lambda=\lvert\vec r_u\times\vec r_v\rvert=\sqrt{EG-F^2}$. The "Gaussian curvature" computed from the formula becomes

$$\frac{L'N'-M'^2}{EG-F^2}=\lambda^2\frac{LN-M^2}{EG-F^2}=(EG-F^2)K,$$

which in general is not $K$. So the normal must be normalized—one of the commonest computational errors.

## 4. Intuition and Pictures

> Intuition: the first form is the surface's tape measure (intrinsic); the second form is a camber gauge (extrinsic bending). The Gaussian curvature $K=\kappa_1\kappa_2$ combines the two.

| Sign of $K$ | Type of point | Example |
|---|---|---|
| $K>0$ | Elliptic point (like a drumhead) | Outside of a sphere |
| $K=0$ | Parabolic point | Cylinder, plane |
| $K<0$ | Hyperbolic point (like a saddle) | Potato chip, hyperbolic paraboloid |

| Quantity | Determined by | Geometric meaning |
|---|---|---|
| $E,F,G$ | First form | Length, angle, area |
| $L,M,N$ | Second form | Normal bending |
| $\kappa_n$ | Ratio of the two | Normal curvature in one direction |
| $K$ | Combination, but actually only the first form | Intrinsic bending |
| $H$ | Combination | Extrinsic bending, orientation-dependent |

> More concretely: standing on the tangent plane at a point, the first form tells you "how far you actually travel on the surface when you take a step", which may differ from the Euclidean step in the tangent plane (because the surface is curved); the second form tells you "whether, after that step, you are on a bulge or in a dip". Together they completely determine the local shape.

> A practical rule for identifying the type of point: look at whether the two principal curvatures share a sign. Same sign gives $K>0$ and a bowl; opposite signs give $K<0$ and a saddle; one zero gives $K=0$ and a column.

When $K>0$ the surface bends the same way in both directions and lies locally on one side of the tangent plane; when $K<0$ it bends oppositely and the tangent plane cuts through the surface; when $K=0$ at least one principal curvature vanishes and the surface is straight in that direction. This picture is more intuitive than the formula: think of the shape first, then compute the sign.

## 5. Worked Examples

### Example 1 (Basic: the plane and the cylinder)

Problem: for the plane $\vec r(u,v)=(u,v,0)$ and the unit cylinder $\vec r(u,v)=(\cos u,\sin u,v)$, find the two fundamental forms, the Gaussian and mean curvatures, and compare.

Analysis: compute partial derivatives, the normal and the dot products separately; take the outward normal for the cylinder.

Solution: the plane. $\vec r_u=(1,0,0)$, $\vec r_v=(0,1,0)$, $\vec n=(0,0,1)$. Hence

$$E=G=1,\quad F=0,\quad L=M=N=0.$$

So $\mathrm I=du^2+dv^2$, $\mathrm{II}=0$, $K=0$, $H=0$. The plane does not bend.

The cylinder. $\vec r_u=(-\sin u,\cos u,0)$, $\vec r_v=(0,0,1)$, so

$$E=1,\quad F=0,\quad G=1.$$

The cross product $\vec r_u\times\vec r_v=(\cos u,\sin u,0)$ is already a unit vector, so $\vec n=(\cos u,\sin u,0)$ (outward normal). The second derivatives:

$$\vec r_{uu}=(-\cos u,-\sin u,0),\quad \vec r_{uv}=0,\quad \vec r_{vv}=0.$$

Hence

$$L=\vec r_{uu}\cdot\vec n=-1,\qquad M=0,\qquad N=0.$$

So $\mathrm I=du^2+dv^2$, $\mathrm{II}=-du^2$,

$$K=\frac{LN-M^2}{EG-F^2}=0,\qquad H=\frac{EN+GL-2FM}{2(EG-F^2)}=-\frac12.$$

The principal curvatures are $L/E=-1$ and $N/G=0$.

Comment: the plane and the cylinder share the same first form ($du^2+dv^2$), so they are locally isometric—rolling paper into a tube does not stretch it. But their second forms differ, and the mean curvatures ($0$ versus $-1/2$) show that the extrinsic bending differs. Both have $K=0$ because $K$ sees only the intrinsic metric. Note $L=-1$ rather than $+1$: with the outward normal the cylinder's surface bends inward; choosing the inward normal gives $L=+1$ and $H=+1/2$, while $K$ stays $0$.

### Example 2 (Intermediate: the sphere)

Problem: for a sphere of radius $R$, find $E,F,G,L,M,N$, the principal curvatures, $K$ and $H$.

Analysis: use spherical coordinates, mind the ranges of the polar angle $\theta$ and azimuth $\varphi$; the parametrization degenerates at the poles, where another chart is needed.

Solution: take

$$\vec r(\theta,\varphi)=(R\sin\theta\cos\varphi,R\sin\theta\sin\varphi,R\cos\theta),$$

with $0<\theta<\pi$ and $0<\varphi<2\pi$. Differentiating:

$$\vec r_\theta=R(\cos\theta\cos\varphi,\cos\theta\sin\varphi,-\sin\theta),$$

$$\vec r_\varphi=R\sin\theta(-\sin\varphi,\cos\varphi,0).$$

Dot products give

$$E=R^2,\qquad F=0,\qquad G=R^2\sin^2\theta.$$

The cross product is $\vec r_\theta\times\vec r_\varphi=R^2\sin\theta\,(\sin\theta\cos\varphi,\sin\theta\sin\varphi,\cos\theta)$, so the unit normal is

$$\vec n=(\sin\theta\cos\varphi,\sin\theta\sin\varphi,\cos\theta)=\frac{\vec r}{R},$$

the outward normal. The second derivatives:

$$\vec r_{\theta\theta}=-R(\sin\theta\cos\varphi,\sin\theta\sin\varphi,\cos\theta)=-\vec r,$$

$$\vec r_{\theta\varphi}=R\cos\theta(-\sin\varphi,\cos\varphi,0),$$

$$\vec r_{\varphi\varphi}=-R\sin\theta(\cos\varphi,\sin\varphi,0).$$

Hence

$$L=\vec r_{\theta\theta}\cdot\vec n=-R,\qquad M=0,\qquad N=\vec r_{\varphi\varphi}\cdot\vec n=-R\sin^2\theta.$$

Therefore

$$K=\frac{LN-M^2}{EG-F^2}=\frac{R^2\sin^2\theta}{R^4\sin^2\theta}=\frac{1}{R^2},$$

$$H=\frac{EN+GL-2FM}{2(EG-F^2)}=\frac{-R^3\sin^2\theta-R^3\sin^2\theta}{2R^4\sin^2\theta}=-\frac1R.$$

The principal curvatures satisfy $\kappa_1=\kappa_2=-1/R$ (outward normal), so $K=1/R^2$ and $H=-1/R$.

Comment: the sphere has constant curvature and every point is elliptic. $K>0$ says it bends the same way in both principal directions. With the inward normal, $L,M,N$ change sign and $H=+1/R$, while $K$ is unchanged. At the poles $G=0$ and the parametrization degenerates, but the curvature as a geometric quantity remains well defined; one simply switches charts.

### Example 3 (Advanced: the hyperbolic paraboloid)

Problem: for the hyperbolic paraboloid $\vec r(u,v)=(u,v,u^2-v^2)$, find $E,F,G,L,M,N$, $K$ and $H$, and the principal curvatures at the origin.

Analysis: compute the partial derivatives and the cross product, then dot term by term; at the origin $F=0$, so the principal curvatures can be read off.

Solution: differentiating,

$$\vec r_u=(1,0,2u),\qquad \vec r_v=(0,1,-2v),$$

$$\vec r_{uu}=(0,0,2),\qquad \vec r_{uv}=(0,0,0),\qquad \vec r_{vv}=(0,0,-2).$$

First form:

$$E=1+4u^2,\qquad F=-4uv,\qquad G=1+4v^2.$$

The cross product is

$$\vec r_u\times\vec r_v=(-2u,2v,1),$$

with norm

$$W=\sqrt{1+4u^2+4v^2}.$$

So the unit normal is

$$\vec n=\frac{(-2u,2v,1)}{W}.$$

Second form:

$$L=\frac{2}{W},\qquad M=0,\qquad N=-\frac{2}{W}.$$

Hence

$$EG-F^2=(1+4u^2)(1+4v^2)-16u^2v^2=1+4u^2+4v^2=W^2,$$

$$K=\frac{LN-M^2}{EG-F^2}=\frac{-4/W^2}{W^2}=-\frac{4}{(1+4u^2+4v^2)^2},$$

$$H=\frac{EN+GL-2FM}{2(EG-F^2)}=\frac{(1+4u^2)(-2/W)+(1+4v^2)(2/W)}{2W^2}=\frac{4(v^2-u^2)}{W^3}.$$

At the origin $u=v=0$: $E=G=1$, $F=0$, $L=2$, $N=-2$, $M=0$, so $K=-4$, $H=0$, and the principal curvatures are $L/E=2$ and $N/G=-2$. One positive, one negative: a hyperbolic point.

Comment: the two principal curvatures of a saddle have opposite signs, which is exactly why $K<0$. $H=0$ only says the principal curvatures cancel; it does not make the surface flat—$K=-4$ leaves no doubt that this is a saddle. The example also shows that the sign of $K$ can be read directly from $LN-M^2$ without computing the principal curvatures.

## 6. Common Mistakes and Pitfalls

- Mistake: thinking the first form contains extrinsic bending information. Correction: it is purely intrinsic; rolling paper into a tube leaves $\mathrm I$ unchanged.
- Mistake: assuming $F$ is always $0$. Correction: $F=0$ only when the parameter curves are orthogonal; in oblique coordinates $F\ne0$.
- Mistake: confusing normal curvature with principal curvature. Correction: the normal curvature varies with direction; the principal curvatures are its two extrema.
- Mistake: believing the sign of $K$ says nothing about the type of point. Correction: $K>0$ elliptic, $K<0$ hyperbolic, $K=0$ parabolic.
- Mistake: ignoring the effect of the orientation of $\vec n$ on the signs of $L,M,N$. Correction: flipping the normal flips $\mathrm{II}$ and $H$ but not $K$.
- Mistake: computing $L,M,N$ from the unnormalized $\vec r_u\times\vec r_v$. Correction: divide by its norm; otherwise $K$ gets multiplied by $EG-F^2$.
- Mistake: taking $L/E$ and $N/G$ as the principal curvatures. Correction: that holds only when $F=M=0$; in general solve $\det(\mathrm{II}-\kappa\mathrm I)=0$.
- Mistake: treating $\mathrm{II}$ as positive definite. Correction: $\mathrm{II}$ takes both signs; it measures the direction of bending, not a metric.
- Mistake: using $EG-F^2$ rather than $\sqrt{EG-F^2}$ as the area element. Correction: the area element is $\sqrt{EG-F^2}\,du\,dv$.
- Mistake: equating $H=0$ with a plane. Correction: minimal surfaces (catenoid, helicoid) have $H=0$ but $K<0$; they are curved.

## 7. Summary and Mnemonic

Key points:

- The first fundamental form $\mathrm I=E\,du^2+2F\,du\,dv+G\,dv^2$ is the intrinsic metric, fixing length, angle and area;
- The second fundamental form $\mathrm{II}=L\,du^2+2M\,du\,dv+N\,dv^2$ measures extrinsic bending, and $\mathrm{II}/\mathrm I$ gives the normal curvature;
- The principal curvatures are eigenvalues of the shape operator, satisfying $\det(\mathrm{II}-\kappa\mathrm I)=0$;
- The Gaussian curvature $K=(LN-M^2)/(EG-F^2)$ is intrinsic; the mean curvature $H=(EN+GL-2FM)/(2(EG-F^2))$ depends on orientation;
- Minimal surfaces have $H=0$—the mathematics of soap films.

Mnemonic: **"One form measures, two form bends; principal curvatures shape it, Gauss hides inside."**`,
    keyPoints: [
      'The first fundamental form = intrinsic metric (length, area, angle)',
      'The second fundamental form = extrinsic bending; II/I gives the normal curvature',
      'Gaussian curvature K = κ₁κ₂ = (LN−M²)/(EG−F²)',
      'Minimal surfaces H=0: the mathematics of soap films',
    ],
  },
  'intrinsic-geometry': {
    chapter: 'Chapter 3 Intrinsic Geometry',
    title: 'Intrinsic Geometry and the Gauss–Bonnet Theorem',
    summary:
      'Gaussian curvature does not depend on the embedding—the theorema egregium; Gauss–Bonnet stitches local curvature to global topology.',
    content: String.raw`

If a two-dimensional ant lived on a sphere, unable to leave and unable to see outside, it could know the world only through measurements made inside. It could discover that the angles of a triangle sum to more than $180^\circ$ and deduce that it is not on a plane—all through intrinsic geometry.

Prelude: Gauss made a startling discovery—the curvature $K$ of a sphere can be measured without ever leaving the sphere, because it is determined entirely by the internal metric. Even better: sum the angle excesses of all small triangles and you get a constant fixed by topology alone (the number of holes). This is the Gauss–Bonnet theorem, which sews local curvature to global topology.

This chapter answers three questions: which quantities are intrinsic? How does one define a "straight line" on a surface? How does local bending accumulate into global topology? The answers are the theorema egregium, geodesics, and the Gauss–Bonnet theorem.

## 2. Rigorous Definitions

**Isometry and local isometry**. A map $f:S_1\to S_2$ between surfaces is an isometry if it preserves the lengths of curves on the surface; equivalently, if it preserves the first fundamental form. If every point has a neighbourhood on which the restriction of $f$ is an isometry, $f$ is a local isometry. Quantities depending only on the first fundamental form are called intrinsic.

**Theorema Egregium**. The Gaussian curvature $K$ is intrinsic: it depends only on the first fundamental form $E,F,G$ and their first and second derivatives, not on how the surface is embedded in $\mathbb{R}^3$.

**Christoffel symbols**. Defined from the first fundamental form,

$$\Gamma_{ij}^k=\frac12 g^{kl}\left(\frac{\partial g_{jl}}{\partial u^i}+\frac{\partial g_{il}}{\partial u^j}-\frac{\partial g_{ij}}{\partial u^l}\right),$$

where $(g_{ij})$ is the matrix of the first fundamental form and $(g^{kl})$ its inverse. They depend only on $E,F,G$ and are therefore intrinsic.

**Geodesic**. A curve $\gamma$ on a surface is a geodesic if its geodesic curvature $\kappa_g=0$; equivalently, if its acceleration is purely normal:

$$\nabla_{\dot\gamma}\dot\gamma=0,$$

where $\nabla$ is the covariant derivative on the surface. In coordinates,

$$\frac{d^2u^k}{dt^2}+\Gamma_{ij}^k\frac{du^i}{dt}\frac{du^j}{dt}=0.$$

**Parallel transport**. A vector field $V$ along a curve $\gamma$ is parallel if $\nabla_{\dot\gamma}V=0$. Transporting a tangent vector once around a closed curve may return it rotated relative to the original; the angle is called the holonomy.

**Local Gauss–Bonnet**. Let $D$ be a simply connected region on a surface whose boundary consists of geodesic segments with interior angles $\alpha_1,\dots,\alpha_m$. Then

$$\iint_D K\,dA+\sum_{i=1}^{m}(\pi-\alpha_i)=2\pi.$$

In particular, a geodesic triangle ($m=3$) satisfies

$$\iint_D K\,dA=\alpha_1+\alpha_2+\alpha_3-\pi.$$

**Global Gauss–Bonnet**. Let $M$ be a compact, orientable surface without boundary. Then

$$\iint_M K\,dA=2\pi\chi(M),$$

where $\chi(M)=2-2g$ is the Euler characteristic and $g$ the genus (number of holes). If $M$ has boundary, one must add the integral of the geodesic curvature along the boundary and the exterior angles at the corners.

**Angle excess**. The sum of the interior angles of a geodesic triangle minus $\pi$ is called the angle excess; it equals the total Gaussian curvature over the triangle. It is positive on a sphere, zero on a plane, and negative on a hyperbolic surface.

## 3. Why Define It This Way

**Why is $K$ intrinsic?** Because $K$ can be computed explicitly from $E,F,G$ and their derivatives (that is the content of the proof of the theorema egregium). An ant measuring distances, angles and areas on the surface obtains $E,F,G$ and hence $K$, without knowing how the surface bends in three-dimensional space. Rolling paper without stretching keeps $K=0$; flattening a sphere requires stretching, because the sphere has $K=1/R^2\ne0$.

**Why is a geodesic $\nabla_{\dot\gamma}\dot\gamma=0$?** It says the curve does not accelerate sideways, only normally—"seen from inside the surface, it travels in a straight line". Straight lines in the plane, great circles on a sphere and helices on a cylinder all satisfy this. The geodesic equation contains only Christoffel symbols, which are determined by the first fundamental form, so geodesics are intrinsic and independent of the embedding.

**Why does parallel transport depend on the path?** On a plane, transporting a vector once around any closed curve returns it to itself. On a sphere this need not happen: transport around a spherical triangle rotates the vector by an angle exactly equal to the triangle's area (the angle excess). This phenomenon, holonomy, is precisely the intrinsic manifestation of curvature: the more curvature, the greater the holonomy. So $K$ can be measured by the rotation angle of "parallel transport around a small loop", something the ant can do.

**Why does Gauss–Bonnet hold?** The local version is a geometric form of Green's theorem: integrating $K$ over a region equals the boundary integral of geodesic curvature plus the angle terms. The global version triangulates the surface into small triangles, applies the local formula to each, and sums. The geodesic-curvature contributions of interior edges cancel in pairs, leaving only the angle contributions at vertices, whose total is exactly $2\pi\chi(M)$. The integral of the local curvature is thus locked by topology.

**Counterexample: cylinder and plane.** The cylinder has $K=0$ and so does the plane; the cylinder can be cut open and flattened without stretching, so the two are locally isometric. But the sphere has $K=1/R^2>0$ and cannot be locally isometric to a plane; every world map stretches or compresses somewhere, which is why map projections must compromise.

**Counterexample: the apex of a cone.** A cone with the apex removed has $K=0$ and can be flattened into a sector of the plane. But at the apex there is an angle deficit: if the cone has half-angle $\beta$, the flattened sector has central angle $2\pi\sin\beta$, a deficit of $2\pi(1-\sin\beta)$. This deficit is the "concentrated curvature" of the apex, which is not a smooth point but a singular one. Gauss–Bonnet still holds for surfaces with singularities, provided the angle deficits are counted.

## 4. Intuition and Pictures

> Intuition: geodesics are the "straight lines" of a surface (great circles on a sphere, helices on a cylinder). Gauss–Bonnet integrates how much the surface bends locally into how many holes it has globally.

| Surface | Genus $g$ | $\chi=2-2g$ | $\iint K\,dA$ |
|---|---|---|---|
| Sphere | $0$ | $2$ | $4\pi$ |
| Torus | $1$ | $0$ | $0$ |
| Double torus | $2$ | $-2$ | $-4\pi$ |

| Geometry | $K$ | Angle sum of a triangle | Parallel lines |
|---|---|---|---|
| Euclidean plane | $0$ | $\pi$ | Never meet |
| Sphere | $>0$ | $>\pi$ | Always meet |
| Hyperbolic plane | $<0$ | $<\pi$ | Diverge |

> More concretely: a sphere is like an inflated balloon, bulging outward everywhere; integrating the total bulge gives the positive value $4\pi$. A torus bulges outward on the outside and saddles on the inside, and the contributions cancel to $0$. Topology (the number of holes) fixes the total in advance, regardless of how the surface bends—the magic of a local sum pinning down a global quantity.

> The ant's experiment: pick three points on a sphere, join them by geodesics into a triangle, and measure the three interior angles. It finds a sum greater than $180^\circ$, with the excess exactly the triangle's area divided by $R^2$. The same experiment on a plane gives zero excess. No need to leave the surface—purely intrinsic measurement.

## 5. Worked Examples

### Example 1 (Basic: local isometry of a cylinder and a plane)

Problem: show that the cylinder $\vec r(u,v)=(\cos u,\sin u,v)$ is locally isometric to the plane, and explain how their geodesics correspond.

Analysis: compare the first fundamental forms; identical first forms imply local isometry.

Solution: the cylinder's first form was computed in Example 1:

$$E=1,\qquad F=0,\qquad G=1,$$

so $\mathrm I=du^2+dv^2$, which is also the first form of the plane. Hence the map $(u,v)\mapsto(u,v)$ (on the parameter domain) preserves the first fundamental form and is a local isometry. Intuitively, cutting the cylinder along a generator and flattening it gives a strip of the plane, with lengths and angles preserved.

Geodesics on the cylinder satisfy $\Gamma_{ij}^k=0$ (because $E,F,G$ are constant), so the geodesic equations reduce to

$$u''=0,\qquad v''=0.$$

The solutions are $u(t)=at+b$, $v(t)=ct+d$—straight lines in the parameter plane. Rolling back onto the cylinder:

- If $a=0$, $u$ is constant: a vertical generator;
- If $c=0$, $v$ is constant: a horizontal circle;
- If both $a,c$ are nonzero: a helix.

Comment: the cylinder and the plane are locally isometric, so their intrinsic geometry is identical and $K=0$. But the cylinder is not a plane: it has different global topology (it is homotopy equivalent to a circle), and a closed geodesic going once around corresponds to a straight line on the plane with its ends glued. Local isometry is not global isometry.

### Example 2 (Intermediate: the angle excess of a spherical triangle)

Problem: on the unit sphere take the octant triangle bounded by three great-circle arcs with vertices $(1,0,0)$, $(0,1,0)$, $(0,0,1)$. Verify the Gauss–Bonnet theorem.

Analysis: all three sides are great circles, hence geodesics; all three angles are right angles; the area is one eighth of the sphere's area.

Solution: the three sides lie in the coordinate planes $x=0$, $y=0$, $z=0$, all great circles. The boundary is therefore geodesic, with $\kappa_g=0$. At each vertex the two sides run along two coordinate axes and are perpendicular, so the three interior angles are

$$\alpha=\beta=\gamma=\frac{\pi}{2}.$$

The area of the triangle is one eighth of the unit sphere's area:

$$A=\frac{4\pi}{8}=\frac{\pi}{2}.$$

The unit sphere has $K=1$, so

$$\iint_D K\,dA=A=\frac{\pi}{2}.$$

The angle excess is

$$\alpha+\beta+\gamma-\pi=\frac{3\pi}{2}-\pi=\frac{\pi}{2}.$$

The two agree: Gauss–Bonnet holds.

For a sphere of radius $R$, $K=1/R^2$ and the area is $A=R^2\cdot\pi/2$, so the integral $KA=\pi/2$ still equals the angle excess. In general, the area of a spherical geodesic triangle is

$$A=R^2(\alpha+\beta+\gamma-\pi).$$

Comment: this example makes "angle excess equals total curvature" concrete. Note that the angle excess is dimensionless while the total curvature is $K$ times the area, with dimension $1$; on the unit sphere they coincide numerically, while on a sphere of radius $R$ one must multiply by $R^2$.

### Example 3 (Advanced: total curvature of a torus)

Problem: for the torus

$$\vec r(u,v)=((R+r\cos v)\cos u,(R+r\cos v)\sin u,r\sin v),$$

with $R>r>0$, compute $\iint K\,dA$ and verify it with global Gauss–Bonnet.

Analysis: compute $K$ and the area element, integrate, and compare with $\chi=0$.

Solution: from the computation of the second fundamental form (see the surface theory topic),

$$K=\frac{\cos v}{r(R+r\cos v)},\qquad dA=r(R+r\cos v)\,du\,dv.$$

Hence

$$\iint_{T^2}K\,dA=\int_0^{2\pi}\int_0^{2\pi}\frac{\cos v}{r(R+r\cos v)}\cdot r(R+r\cos v)\,du\,dv.$$

The integrand simplifies to $\cos v$, so

$$\iint K\,dA=\int_0^{2\pi}du\int_0^{2\pi}\cos v\,dv=2\pi\cdot\big[\sin v\big]_0^{2\pi}=0.$$

On the other hand, the torus has genus $g=1$ and Euler characteristic

$$\chi=2-2g=0,$$

so global Gauss–Bonnet gives $\iint K\,dA=2\pi\chi=0$, in agreement with the direct computation.

The expression for $K$ also shows: for $v\in(0,\pi/2)\cup(3\pi/2,2\pi)$, $\cos v>0$ and these are elliptic points on the outside; for $v\in(\pi/2,3\pi/2)$, $\cos v<0$ and these are saddle points on the inside; at $v=\pi/2,3\pi/2$, $K=0$ and these are the top and bottom circles. Positive and negative curvatures cancel exactly, giving zero total curvature.

Comment: this shows that a torus cannot have everywhere positive Gaussian curvature—the integral would be positive, contradicting $\chi=0$. Topology prescribes the total curvature in advance, and the surface can only satisfy it by distributing positive and negative bending. This is one of the deepest consequences of Gauss–Bonnet.

## 6. Common Mistakes and Pitfalls

- Mistake: thinking rolling paper changes $K$. Correction: without stretching $K$ stays $0$ (theorema egregium); changing $K$ requires stretching.
- Mistake: treating a geodesic as "always the shortest". Correction: geodesics are only locally shortest; between antipodal points on a sphere there are infinitely many great-circle arcs of equal length.
- Mistake: confusing $\chi$ with the genus. Correction: for a closed orientable surface $\chi=2-2g$; the sphere has $g=0$ but $\chi=2$.
- Mistake: believing a saddle surface has negative total curvature. Correction: $K<0$ locally, but the global integral depends on topology; a torus has saddles inside yet total integral zero.
- Mistake: ignoring the orientability and compactness hypotheses of global Gauss–Bonnet. Correction: the global formula needs compact, orientable, boundaryless; with boundary, add the boundary terms.
- Mistake: taking the mean curvature as intrinsic too. Correction: $K$ is intrinsic, $H$ is not; a plane and a cylinder share the first form but differ in $H$.
- Mistake: equating isometry with homeomorphism. Correction: isometry preserves lengths, homeomorphism only topology; a cylinder is locally isometric to a plane but not globally homeomorphic to it.
- Mistake: ignoring the angle deficit at a cone's apex. Correction: the apex is singular, and Gauss–Bonnet must include the deficit $2\pi(1-\sin\beta)$.
- Mistake: applying "area equals angle excess" to a non-geodesic triangle. Correction: local Gauss–Bonnet retains a boundary term with the geodesic curvature integral; the simplification requires a geodesic boundary.

## 7. Summary and Mnemonic

Key points:

- Theorema egregium: $K$ is determined by the first fundamental form alone and is intrinsic;
- A geodesic is a straight line on the surface, equivalently a curve whose tangent is parallel transported, $\nabla_{\dot\gamma}\dot\gamma=0$;
- The geodesic equation is given by Christoffel symbols and depends only on the metric;
- The rotation angle of parallel transport around a closed loop, the holonomy, equals the total curvature of the enclosed region;
- Local Gauss–Bonnet: the angle excess of a geodesic triangle equals $\iint K\,dA$;
- Global Gauss–Bonnet: $\iint_M K\,dA=2\pi\chi(M)$—curvature locked to topology.

Mnemonic: **"Gauss curvature hides inside; the ant measures its triangle wide; local curvature sums to whole; Euler's number settles the toll."**`,
    keyPoints: [
      'Theorema egregium: K is determined by the first fundamental form (it is intrinsic)',
      'Geodesic = straight line on the surface = curve whose tangent is parallel transported',
      'Local Gauss–Bonnet: ∫K dA = angle sum − π',
      'Global form: ∫K dA = 2πχ(M)—curvature locked by topology',
    ],
  },
  'regular-surfaces': {
    chapter: 'Chapter 2 Regular Surfaces',
    title: 'Regular Surfaces and Tangent Spaces',
    summary:
      'Regularity guarantees a tangent plane at every point; the tangent space is the "flat approximation" of the surface there, and all of differential geometry starts from it.',
    content: String.raw`

Curve theory studies a line; surface theory studies a sheet. But what counts as a smooth sheet? A sphere or a torus does; the edge where two planes meet does not—there is no unique tangent plane there. Regularity is the standard we impose on a smooth sheet: every point must be flattenable, must admit a tangent plane.

Prelude: why is the apex of a cone not a regular point? Because all directions emanating from the apex crowd together, the cross product $\vec r_u\times\vec r_v=0$, and the tangent plane is not unique. The regularity condition $\vec r_u\times\vec r_v\ne\vec 0$ excludes exactly this kind of folded cusp, so that the surface looks like a small patch of plane at every point and calculus can be done locally.

But a nonzero cross product is not enough: the parametrization must not overlap itself, and must not map two different parameter points to the same point of the surface. The definition of a regular surface therefore adds a homeomorphism condition. This chapter separates these two conditions, explains each, and gives precise definitions of the tangent space, tangent plane and normal vector.

## 2. Rigorous Definitions

**Regular parametrized surface**. Let $U\subset\mathbb{R}^2$ be open and $\vec r:U\to\mathbb{R}^3$ smooth. $\vec r$ is a regular parametrized surface (or coordinate chart) if:

1. $\vec r$ is smooth (this book asks for $C^\infty$; in fact $C^2$ suffices to define curvature);
2. For every $(u_0,v_0)\in U$, $\vec r_u\times\vec r_v\ne\vec 0$;
3. $\vec r$ is a homeomorphism from $U$ onto its image $\vec r(U)$ (with the subspace topology).

Condition 2 is regularity, condition 3 is embeddedness. The image $\vec r(U)$ is called a surface patch.

**Regular surface**. A set $S\subset\mathbb{R}^3$ is a regular surface if every point $p\in S$ has a neighbourhood $V$ and a regular parametrized surface $\vec r:U\to V\cap S$. Such an $\vec r$ is a local parametrization or coordinate chart near $p$. The collection of all charts is an atlas.

**Tangent space and tangent plane**. At $p=\vec r(u_0,v_0)$ the tangent space is defined as

$$T_pS=\operatorname{span}\{\vec r_u(u_0,v_0),\vec r_v(u_0,v_0)\}=\{a\vec r_u+b\vec r_v:a,b\in\mathbb{R}\}.$$

It is a two-dimensional linear subspace through the origin. The affine plane through $p$ with direction $T_pS$,

$$p+T_pS=\{p+w:w\in T_pS\},$$

is the tangent plane. The unit normal

$$\vec n(p)=\frac{\vec r_u\times\vec r_v}{\lvert\vec r_u\times\vec r_v\rvert}(u_0,v_0)$$

is perpendicular to the whole tangent space.

**Differential**. The differential of the parametrization $d\vec r_{(u_0,v_0)}:\mathbb{R}^2\to T_pS$ sends $(a,b)$ to $a\vec r_u+b\vec r_v$. It is a linear isomorphism carrying directions in the parameter plane to directions in the tangent plane.

**Surfaces given by the implicit function theorem**. If $F:W\subset\mathbb{R}^3\to\mathbb{R}$ is smooth, $p\in W$, $F(p)=0$ and $\nabla F(p)\ne\vec 0$, then some neighbourhood of $p$ makes $F^{-1}(0)$ a regular surface. This is the most convenient tool for deciding whether an equation defines a surface.

**Orientation**. A regular surface $S$ is orientable if there is a globally continuous unit normal field $\vec n:S\to S^2$. A connected orientable surface has exactly two orientations ($\vec n$ and $-\vec n$). The Möbius band is not orientable.

**Tangent vector field**. A smooth tangent vector field along $S$ is a smooth map $V:S\to\mathbb{R}^3$ with $V(p)\in T_pS$. Tangent fields may vary smoothly over the surface, and are a basic object in the study of surfaces.

## 3. Why Define It This Way

**Why require $\vec r_u\times\vec r_v\ne\vec 0$?** The cross product is nonzero exactly when $\vec r_u,\vec r_v$ are linearly independent, i.e. when they span a genuine two-dimensional plane. If it vanishes, the two partial derivatives are collinear, the parametrization drops rank at that point, and the tangent plane is either non-unique or nonexistent.

Counterexample: the cone $\vec r(u,v)=(v\cos u,v\sin u,v)$. At $v=0$ (the apex), $\vec r_u=(0,0,0)$ and $\vec r_v=(\cos u,\sin u,1)$, so the cross product vanishes. The apex has no unique tangent plane, hence the cone is not a regular surface; with the apex removed it is.

Another counterexample: $\vec r(u,v)=(u,0,\lvert u\rvert)$ is not differentiable at $u=0$, failing even smoothness, let alone regularity.

**Why require a homeomorphism?** Regularity is only a local condition: it ensures the image looks like a small patch of plane near each point, but the parametrization may overlap itself globally. Counterexample: $\vec r(u,v)=(\cos u,\sin u,v)$ with $u\in(0,4\pi)$. It is locally regular, but $u$ and $u+2\pi$ map to the same point, so the parametrization is two-to-one and not a homeomorphism. Its image is a cylinder, but the parametrization winds around it twice and cannot serve as a chart.

A subtler counterexample: $\vec r(u,v)=(u,v,u^2)$ is regular and injective on all of $\mathbb{R}^2$, with image a parabolic cylinder—no problem. But if the parameter domain is chosen badly, say restricted to a self-intersecting curve, the image may knot. The homeomorphism condition guarantees the parametrization neither tears nor glues.

**Why require smoothness rather than mere continuity?** Continuous maps can draw fractals and Peano curves, which have no tangent plane at all. Defining the tangent space needs first partial derivatives; defining curvature needs second. The book takes $C^\infty$ to avoid discussing regularity; practical theorems usually need only $C^2$.

**Why is the tangent space a flat approximation?** Near $p$ the surface is approximated to first order by the tangent plane:

$$\vec r(u_0+\Delta u,v_0+\Delta v)=\vec r(u_0,v_0)+\vec r_u\Delta u+\vec r_v\Delta v+O(\lvert\Delta\rvert^2).$$

The first-order term lies exactly in $T_pS$, so the tangent space is the linearization of the surface at that point. Velocity vectors of curves and tangent fields of the surface all live in this plane.

**Why is the implicit function theorem handy?** Because many surfaces are given by equations rather than parametrizations. The sphere $x^2+y^2+z^2=R^2$ is defined by a single equation, but writing a global parametrization is awkward (it degenerates at the poles). The implicit function theorem says: as long as the gradient is nonzero, the equation defines a regular surface locally. This converts "find a parametrization" into the easy check "compute the gradient".

**Counterexample: a vanishing gradient does not disprove a surface.** The condition $\nabla F(p)\ne\vec 0$ is sufficient, not necessary. For example $F(x,y,z)=x^2$ has zero gradient at the origin, yet $F^{-1}(0)$ is the plane $x=0$, still a regular surface. The implicit function theorem fails here, but the surface is fine. So a vanishing gradient only means the theorem cannot guarantee a surface, not that none exists.

**Why does orientability matter?** Because the second fundamental form, normal curvature, flux and Gauss map all need a continuous normal. The Möbius band can be oriented locally, but after one circuit the normal flips, so no global orientation exists. Orientability is a global property of the surface, not a local one.

## 4. Intuition and Pictures

> Intuition: every point of a regular surface can be smoothed into a small patch of plane; the tangent space is the mathematical embodiment of that patch, and every velocity vector along the surface lives in it.

| Surface | Regular? | Exceptional points | Note |
|---|---|---|---|
| Sphere | Yes | None | Gradient nonzero everywhere |
| Torus | Yes | None | $R>r$ keeps the cross product nonzero |
| Cone | Locally no | Apex | Cross product vanishes at the apex |
| Möbius band | Yes | None | But not orientable |
| Intersection line of two planes | No | The whole line | No unique tangent plane along the line |

> More concretely: think of the surface as a sheet of paper gently ruffled by wind (not torn or folded); the tangent plane at each point is the glass plate that best fits the sheet there. Velocity vectors are like the instantaneous direction of an ant crawling on the paper—necessarily lying in the glass plate. That is what "the tangent space contains all tangent vectors" means.

| Claim | Right or wrong | Explanation |
|---|---|---|
| The image of a regular parametrization is necessarily a regular surface | Wrong | If it is not regular or not a homeomorphism, the image may have singularities or self-intersections |
| $\vec r_u\times\vec r_v\ne\vec 0$ at every point is enough | Wrong | A homeomorphism is also required to avoid self-overlap |
| The tangent plane passes through the origin | Wrong | The tangent plane passes through a point of the surface; only the tangent space passes through the origin |
| The normal is perpendicular to every vector in the tangent plane | Right | This is a basic property of the cross product |
| A zero gradient means it is definitely not a surface | Wrong | The condition is sufficient, not necessary |

## 5. Worked Examples

### Example 1 (Basic: a graph is a regular surface)

Problem: let $f:U\subset\mathbb{R}^2\to\mathbb{R}$ be smooth. Show that $\vec r(x,y)=(x,y,f(x,y))$ is a regular parametrized surface and write down the tangent plane equation.

Analysis: compute the cross product of the two partial derivatives and show it never vanishes.

Solution: differentiating,

$$\vec r_x=(1,0,f_x),\qquad \vec r_y=(0,1,f_y).$$

The cross product is

$$\vec r_x\times\vec r_y=(0\cdot f_y-f_x\cdot1,\;f_x\cdot0-1\cdot f_y,\;1\cdot1-0\cdot0)=(-f_x,-f_y,1).$$

Its third component is always $1$, so the cross product never vanishes: $\vec r$ is regular. It is injective (the first two coordinates determine $(x,y)$ uniquely), and the inverse $(x,y,z)\mapsto(x,y)$ is continuous, so it is a homeomorphism onto its image. Hence a graph is a regular surface.

At $(x_0,y_0)$ the normal is $(-f_x,-f_y,1)$ and the tangent plane is

$$-f_x(x_0,y_0)(x-x_0)-f_y(x_0,y_0)(y-y_0)+(z-f(x_0,y_0))=0,$$

i.e.

$$z=f(x_0,y_0)+f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0).$$

This is exactly the first-order Taylor expansion of calculus: the tangent plane is the first-order linear approximation to the graph.

Comment: the graph of any smooth function is a regular surface—the simplest way to construct one. The tangent plane equation is just the first-order Taylor formula: geometry and analysis correspond perfectly here.

### Example 2 (Intermediate: parametrizing the sphere and its tangent plane)

Problem: show that the sphere $x^2+y^2+z^2=R^2$ is a regular surface and find its tangent plane at $p_0=(x_0,y_0,z_0)$.

Analysis: give a local parametrization in spherical coordinates; switch charts at the poles. For the tangent plane use the normal $\vec n=p_0/R$.

Solution: spherical coordinates

$$\vec r(\theta,\varphi)=(R\sin\theta\cos\varphi,R\sin\theta\sin\varphi,R\cos\theta),$$

with $0<\theta<\pi$ and $0<\varphi<2\pi$. The cross product:

$$\vec r_\theta=R(\cos\theta\cos\varphi,\cos\theta\sin\varphi,-\sin\theta),$$

$$\vec r_\varphi=R\sin\theta(-\sin\varphi,\cos\varphi,0),$$

$$\vec r_\theta\times\vec r_\varphi=R^2\sin\theta(\sin\theta\cos\varphi,\sin\theta\sin\varphi,\cos\theta).$$

For $0<\theta<\pi$, $\sin\theta>0$ and the cross product is nonzero, so this chart covers the sphere minus the north and south poles and is a regular parametrization. The poles are covered by another chart (interchanging the roles of $z$ and $x$, say). Hence the sphere is a regular surface.

At $p_0$ the normal is radial, $\vec n=p_0/R$ (the gradient of the defining function is $2p_0$). The tangent plane passes through $p_0$ with normal $p_0$, so

$$(x-x_0)x_0+(y-y_0)y_0+(z-z_0)z_0=0,$$

which simplifies to

$$x x_0+y y_0+z z_0=R^2.$$

Comment: the sphere's tangent plane equation is delightfully simple: replace $x^2$ by $x x_0$, $y^2$ by $y y_0$, $z^2$ by $z z_0$. This is the general rule for tangent planes to quadrics (the polarization identity). Note that spherical coordinates degenerate at the poles, so a single parametrization cannot cover the whole sphere; an atlas is required.

### Example 3 (Advanced: regularity and tangent plane of a torus)

Problem: show that the torus

$$\vec r(u,v)=((R+r\cos v)\cos u,(R+r\cos v)\sin u,r\sin v),\qquad R>r>0,$$

is a regular parametrized surface, and find the tangent plane at $(u,v)=(0,0)$.

Analysis: compute the norm of the cross product and use $R+r\cos v\ge R-r>0$.

Solution: differentiating,

$$\vec r_u=(-(R+r\cos v)\sin u,(R+r\cos v)\cos u,0),$$

$$\vec r_v=(-r\sin v\cos u,-r\sin v\sin u,r\cos v).$$

The cross product is

$$\vec r_u\times\vec r_v=r(R+r\cos v)(\cos u\cos v,\sin u\cos v,\sin v).$$

Its norm is

$$\lvert\vec r_u\times\vec r_v\rvert=r(R+r\cos v)\sqrt{\cos^2u\cos^2v+\sin^2u\cos^2v+\sin^2v}=r(R+r\cos v).$$

Since $R>r>0$, $R+r\cos v\ge R-r>0$, so the cross product never vanishes and the parametrization is regular.

At $(u,v)=(0,0)$: the point is $(R+r,0,0)$, the normal is $(\cos0\cos0,\sin0\cos0,\sin0)=(1,0,0)$, and the tangent plane is

$$x=R+r.$$

Comment: regularity of the torus depends on $R>r$. If $R=r$ the inner circle degenerates to a point (a horn torus) and the cross product vanishes there; if $R<r$ the surface self-intersects (a spindle torus) and is no longer an embedded torus. With parameter domain $(0,2\pi)\times(0,2\pi)$, $\vec r$ is injective; on a closed rectangle the four edges glue and it is no longer injective. So a "regular parametrization" requires a homeomorphism on an open set, and a closed surface needs several charts glued together.

## 6. Common Mistakes and Pitfalls

- Mistake: assuming a smooth function always gives a regular surface. Correction: the gradient must also be nonzero (or the parametrization's cross product must be nonzero); the cone's apex is a counterexample.
- Mistake: checking the cross product at only one point. Correction: regularity requires it to be nonzero everywhere; solve $\vec r_u\times\vec r_v=\vec 0$ and confirm there is no solution.
- Mistake: ignoring injectivity of the parametrization. Correction: $\vec r(u,v)=(\cos u,\sin u,v)$ on $u\in(0,4\pi)$ is regular but two-to-one and is not a chart.
- Mistake: conflating the tangent plane with the tangent space. Correction: the tangent space is a two-dimensional vector space through the origin; the tangent plane is the affine plane through a surface point with that direction.
- Mistake: using an unnormalized cross product as the normal. Correction: the normal must be normalized, otherwise the second fundamental form and curvatures are wrong.
- Mistake: assuming a zero gradient rules out a surface. Correction: $\nabla F=0$ only defeats the implicit function theorem; the surface may still exist, e.g. the zero set of $F=x^2$ is a plane.
- Mistake: treating the whole cone as a regular surface. Correction: the apex is singular; one can only parametrize it piecewise with the apex removed.
- Mistake: assuming every surface is orientable. Correction: the Möbius band is not; orientability is a global property.
- Mistake: covering a whole closed surface with one parametrization. Correction: the sphere and the torus each need at least two charts; a single chart loses injectivity at the gluing.
- Mistake: confusing tangent vector fields with normal fields. Correction: a tangent field takes values in the tangent space; a normal field is perpendicular to it and exists globally only on orientable surfaces.

## 7. Summary and Mnemonic

Key points:

- A regular surface requires a smooth parametrization with $\vec r_u\times\vec r_v\ne\vec 0$ that is a homeomorphism onto its image;
- The tangent space is spanned by $\vec r_u,\vec r_v$ and is the first-order flat approximation of the surface; the tangent plane passes through a surface point;
- The normal is perpendicular to the whole tangent space and, once normalized, feeds the second fundamental form;
- A graph $z=f(x,y)$ is automatically regular, with cross product $(-f_x,-f_y,1)$;
- Implicit function theorem: when $\nabla F\ne\vec 0$, $F^{-1}(0)$ is locally a regular surface;
- An orientable surface has a global unit normal field; the Möbius band does not.

Mnemonic: **"Nonzero cross product, a tangent plane; a homeomorphic chart, a surface plain; implicit theorems solve the equation; one normal gives orientation."**`,
    keyPoints: [
      'Regular surface: r_u×r_v≠0, with a tangent plane at every point',
      'Tangent space = the plane spanned by r_u, r_v',
      'Geometric quantities are invariant under regular coordinate changes',
      'Tangent vector fields vary smoothly over the surface',
    ],
  },
  'fundamental-forms': {
    chapter: 'Chapter 3 Surface Theory',
    title: 'Computing the First and Second Fundamental Forms',
    summary:
      'The first fundamental form governs measurement, the second governs bending—the whole geometry of a surface lives in these two quadratic forms.',
    content: String.raw`

Given a surface, how do we compute the coefficients of its first and second fundamental forms? These coefficients $E,F,G$ and $L,M,N$ are the raw material of every surface computation: length, area, normal curvature and Gaussian curvature all derive from them. This chapter drills the practical work of computing once a parametric equation is in hand.

Prelude: a parametric equation is like a coordinate grid on the surface. The first-form coefficients tell you how long the grid lines are and at what angle they meet; the second-form coefficients tell you how far the grid bulges along the normal. Once the eight dot products of derivatives are computed, the surface geometry is in your hands—this is the starting point and basic skill of all surface theory.

The computation itself is not hard; three things trip people up: the normal must be normalized, the cross terms carry a factor $2$, and the principal curvatures cannot simply be read as $L/E$ and $N/G$ (unless $F=M=0$). This chapter fills in these three traps with three complete examples.

## 2. Rigorous Definitions

Let $\vec r(u,v)$ be a regular parametrized surface, with first partials $\vec r_u,\vec r_v$, second partials $\vec r_{uu},\vec r_{uv},\vec r_{vv}$, and unit normal

$$\vec n=\frac{\vec r_u\times\vec r_v}{\lvert\vec r_u\times\vec r_v\rvert}.$$

**First-form coefficients (intrinsic)**:

$$E=\vec r_u\cdot\vec r_u,\qquad F=\vec r_u\cdot\vec r_v,\qquad G=\vec r_v\cdot\vec r_v,$$

$$\mathrm I=E\,du^2+2F\,du\,dv+G\,dv^2.$$

**Second-form coefficients (extrinsic bending)**:

$$L=\vec r_{uu}\cdot\vec n,\qquad M=\vec r_{uv}\cdot\vec n,\qquad N=\vec r_{vv}\cdot\vec n,$$

$$\mathrm{II}=L\,du^2+2M\,du\,dv+N\,dv^2.$$

**Area element**:

$$dA=\sqrt{EG-F^2}\,du\,dv.$$

**Normal curvature**:

$$\kappa_n=\frac{\mathrm{II}}{\mathrm I}=\frac{L\,du^2+2M\,du\,dv+N\,dv^2}{E\,du^2+2F\,du\,dv+G\,dv^2}.$$

**Principal curvatures**. Solve the generalized eigenvalue equation

$$\det\begin{pmatrix}L-\kappa E & M-\kappa F\\ M-\kappa F & N-\kappa G\end{pmatrix}=0,$$

i.e.

$$(L-\kappa E)(N-\kappa G)-(M-\kappa F)^2=0.$$

The two roots $\kappa_1,\kappa_2$ are the principal curvatures.

**Gaussian and mean curvature**:

$$K=\frac{LN-M^2}{EG-F^2},\qquad H=\frac{EN+GL-2FM}{2(EG-F^2)}.$$

**Simplification for orthogonal parameters**. If $F=M=0$ then

$$\kappa_1=\frac{L}{E},\qquad \kappa_2=\frac{N}{G},\qquad K=\frac{LN}{EG},\qquad H=\frac{EN+GL}{2EG}.$$

**Formulas for a graph**. If $z=f(x,y)$ and $W=\sqrt{1+f_x^2+f_y^2}$, then

$$E=1+f_x^2,\quad F=f_xf_y,\quad G=1+f_y^2,$$

$$L=\frac{f_{xx}}{W},\quad M=\frac{f_{xy}}{W},\quad N=\frac{f_{yy}}{W},$$

$$K=\frac{f_{xx}f_{yy}-f_{xy}^2}{W^4}.$$

**Formulas for a surface of revolution**. If $\vec r(u,v)=(f(v)\cos u,f(v)\sin u,v)$ with $f>0$, then

$$E=f^2,\quad F=0,\quad G=1+f'^2,$$

$$L=-\frac{f}{\sqrt{1+f'^2}},\quad M=0,\quad N=\frac{f''}{\sqrt{1+f'^2}},$$

$$K=-\frac{f''}{f(1+f'^2)^2}.$$

## 3. Why Define It This Way

**Why are $E,F,G$ dot products?** Because the squared length of a small displacement $d\vec r=\vec r_u du+\vec r_v dv$ expands exactly as

$$\lvert d\vec r\rvert^2=E\,du^2+2F\,du\,dv+G\,dv^2.$$

Dot products naturally give lengths and angles. $E$ is the squared speed of the $u$-curve, $G$ that of the $v$-curve, and $F$ the inner product of the two parameter curves. $F=0$ means the parameter curves are orthogonal.

**Why do $L,M,N$ dot second derivatives with the normal?** $\vec r_{uu}$ and companions describe the bending acceleration along parameter directions; their normal component is how much the surface bulges outward. The tangential component involves only derivatives of the first form (for instance $\vec r_{uu}\cdot\vec r_u=\frac12 E_u$) and is not new geometric information. Dotting with the unit normal filters out exactly the normal component.

**Why do the cross terms carry a factor $2$?** Because the quadratic form is written

$$E\,du^2+2F\,du\,dv+G\,dv^2,$$

where the cross terms $du\,dv$ and $dv\,du$ appear symmetrically twice, giving $2F$ when combined. Similarly the cross term of the second form has coefficient $2M$. Forgetting this $2$ is the commonest algebraic error.

**Why must the normal be normalized?** If $\vec N=\vec r_u\times\vec r_v$ is used instead of $\vec n$, then $L,M,N$ are all multiplied by $\lambda=\sqrt{EG-F^2}$. The "Gaussian curvature" computed from the formula becomes

$$\frac{\lambda^2(LN-M^2)}{EG-F^2}=(EG-F^2)K,$$

which in general is not $K$. The mean curvature is also multiplied by $\lambda$. Normalization is therefore not optional; it is part of the definition.

**Why can the principal curvatures not be read as $L/E$ and $N/G$?** Because $E,F,G$ and $L,M,N$ are matrices in the same basis, but $(du,dv)$ is not an orthonormal basis. Finding the principal curvatures is a generalized eigenvalue problem that must include the first-form matrix. Only when $F=M=0$ (parameter curves orthogonal and principal directions aligned with them) do we get $\kappa_1=L/E$ and $\kappa_2=N/G$.

**Counterexample: reading $L/E$ directly fails when $F\ne0$.** For $z=x^2+y^2$ at $(1,1)$, $E=G=5$, $F=4$, $L=N=2/3$, $M=0$. Reading $L/E=2/15\approx0.133$ is wrong; the true principal curvatures are $2/27\approx0.074$ and $2/3\approx0.667$. The discrepancy comes from the directional coupling induced by $F\ne0$.

**Why are $K$ and $H$ the two symmetric functions of the principal curvatures?** Because the characteristic polynomial of the shape operator is $\kappa^2-(\operatorname{tr}S)\kappa+\det S=0$. So $\det S=K$ is the product and $\frac12\operatorname{tr}S=H$ the mean. Knowing $K,H$ determines the two principal curvatures (up to solving a quadratic), and conversely.

**Why is the second fundamental form symmetric?** Because $\vec r_{uv}=\vec r_{vu}$, so the definition of $M$ does not depend on the order of differentiation. More deeply, the shape operator is self-adjoint with respect to the first form:

$$\mathrm{II}(v,w)=\langle S(v),w\rangle=\langle v,S(w)\rangle=\mathrm{II}(w,v).$$

It can therefore be represented by a symmetric matrix, whose eigenvalues are real and eigendirections orthogonal. This is the root reason why principal curvatures and directions exist and are orthogonal.

**Three shortcuts in computation**. First, prefer an orthogonal parametrization so that $F=0$; second, prefer a line-of-curvature parametrization so that $M=0$, when the principal curvatures can be read off; third, exploit symmetry—meridians and parallels for a surface of revolution, spherical coordinates for a sphere. Choosing the right parametrization halves the work: this is experience as much as geometric intuition.

## 4. Intuition and Pictures

> Intuition: think of the coefficients as rulers and inclinations of the grid. $E,G$ are the squared lengths of the two grid lines, $F$ is the cosine-scaled angle between them, and $L,M,N$ describe how the grid tilts out of the tangent plane.

| Coefficient | Meaning | Type |
|---|---|---|
| $E,G$ | Squared lengths of the grid lines | Intrinsic |
| $F$ | Angle between the grid lines ($F=0$: orthogonal) | Intrinsic |
| $L,M,N$ | Normal tilting | Extrinsic |
| $EG-F^2$ | Squared grid area | Intrinsic |
| $LN-M^2$ | Determinant of normal bending | Extrinsic |

> More concretely: $E,G$ are two rulers measuring the grid's step lengths, $F$ tells you whether the rulers are skewed (zero when orthogonal); $L,M,N$ are three protractors measuring how far the grid tilts out of the tangent plane. Intrinsic quantities decide how to measure on the surface; extrinsic ones decide how it bulges.

| Situation | Simplification | Caution |
|---|---|---|
| $F=0$ | Parameter curves orthogonal | Area element reduces to $\sqrt{EG}$ |
| $F=M=0$ | Principal directions along parameters | Principal curvatures read as $L/E,N/G$ |
| $F=0,M\ne0$ | Orthogonal but not principal | Still solve the generalized eigenvalue problem |
| Surface of revolution | $F=M=0$ | Meridians orthogonal to parallels |

| Step | Operation | Check |
|---|---|---|
| 1 | Compute $\vec r_u,\vec r_v$ | Are they linearly independent? |
| 2 | Compute $E,F,G$ | Is $EG-F^2>0$? |
| 3 | Compute $\vec n$ | Is it a unit vector? |
| 4 | Compute $\vec r_{uu},\vec r_{uv},\vec r_{vv}$ | Are the second partials right? |
| 5 | Compute $L,M,N$ | Is the orientation of the normal consistent? |
| 6 | Compute $K,H$ or solve for principal curvatures | Are signs and dimensions plausible? |

## 5. Worked Examples

### Example 1 (Basic: the full set of coefficients for a torus)

Problem: for the torus

$$\vec r(u,v)=((R+r\cos v)\cos u,(R+r\cos v)\sin u,r\sin v),\qquad R>r>0,$$

find $E,F,G,L,M,N$, $K$, $H$, and the principal curvatures at $v=0$ and $v=\pi$.

Analysis: write $A=R+r\cos v$, compute the partials and the cross product, then dot term by term.

Solution: differentiating,

$$\vec r_u=(-A\sin u,A\cos u,0),$$

$$\vec r_v=(-r\sin v\cos u,-r\sin v\sin u,r\cos v).$$

First form:

$$E=A^2,\qquad F=0,\qquad G=r^2.$$

The cross product is

$$\vec r_u\times\vec r_v=Ar(\cos u\cos v,\sin u\cos v,\sin v),$$

with norm $Ar$, so

$$\vec n=(\cos u\cos v,\sin u\cos v,\sin v).$$

Second derivatives:

$$\vec r_{uu}=(-A\cos u,-A\sin u,0),$$

$$\vec r_{uv}=(r\sin v\sin u,-r\sin v\cos u,0),$$

$$\vec r_{vv}=(-r\cos v\cos u,-r\cos v\sin u,-r\sin v).$$

Dot products:

$$L=\vec r_{uu}\cdot\vec n=-A\cos v,\qquad M=\vec r_{uv}\cdot\vec n=0,\qquad N=\vec r_{vv}\cdot\vec n=-r.$$

Hence

$$K=\frac{LN-M^2}{EG-F^2}=\frac{Ar\cos v}{A^2r^2}=\frac{\cos v}{r(R+r\cos v)},$$

$$H=\frac{EN+GL-2FM}{2(EG-F^2)}=\frac{-A^2r-Ar^2\cos v}{2A^2r^2}=-\frac{R+2r\cos v}{2r(R+r\cos v)}.$$

At $v=0$: $A=R+r$, $L=-(R+r)$, $N=-r$, $F=M=0$, so

$$\kappa_1=\frac{L}{E}=-\frac1{R+r},\qquad \kappa_2=\frac{N}{G}=-\frac1r.$$

At $v=\pi$: $A=R-r$, $L=R-r$, $N=-r$, so

$$\kappa_1=\frac1{R-r},\qquad \kappa_2=-\frac1r.$$

Comment: on the outside $v=0$ both principal curvatures are negative—an elliptic point with $K=1/(r(R+r))>0$; on the inside $v=\pi$ they have opposite signs—a hyperbolic point with $K=-1/(r(R-r))<0$. At $v=\pi/2$, $\cos v=0$ and $K=0$: a parabolic point. The torus exhibits all three types of point.

### Example 2 (Intermediate: a graph and its principal curvatures)

Problem: for $z=f(x,y)=x^2+y^2$, find $E,F,G,L,M,N$, $K$, $H$ and the two principal curvatures at $(x,y)=(1,1)$.

Analysis: apply the graph formulas; the principal curvatures require the generalized eigenvalue equation, not a direct reading of $L/E$.

Solution: first the derivatives at $(1,1)$:

$$f_x=2x=2,\quad f_y=2y=2,\quad f_{xx}=2,\quad f_{yy}=2,\quad f_{xy}=0.$$

$$W=\sqrt{1+2^2+2^2}=3.$$

First form:

$$E=1+f_x^2=5,\qquad F=f_xf_y=4,\qquad G=1+f_y^2=5.$$

Second form:

$$L=\frac{f_{xx}}{W}=\frac23,\qquad M=\frac{f_{xy}}{W}=0,\qquad N=\frac{f_{yy}}{W}=\frac23.$$

Gaussian curvature:

$$K=\frac{LN-M^2}{EG-F^2}=\frac{4/9}{25-16}=\frac{4}{81}.$$

Mean curvature:

$$H=\frac{EN+GL-2FM}{2(EG-F^2)}=\frac{5\cdot\frac23+5\cdot\frac23-0}{2\cdot9}=\frac{20/3}{18}=\frac{10}{27}.$$

The principal curvatures solve

$$\det\begin{pmatrix}\frac23-5\kappa & -4\kappa\\ -4\kappa & \frac23-5\kappa\end{pmatrix}=0.$$

That is,

$$\left(\frac23-5\kappa\right)^2-16\kappa^2=0.$$

Taking square roots, $\frac23-5\kappa=\pm4\kappa$, hence

$$\kappa_1=\frac{2}{27},\qquad \kappa_2=\frac23.$$

Check: $\kappa_1\kappa_2=4/81=K$ and $(\kappa_1+\kappa_2)/2=10/27=H$, consistent.

Comment: the trap here is $F=4\ne0$. Reading $L/E=N/G=2/15$ directly would give two equal principal curvatures and suggest an umbilic point; the true curvatures are $2/27$ and $2/3$, very different. $F\ne0$ means the parameter curves are not orthogonal and the principal directions are not aligned with them, so the generalized eigenvalue equation must be solved. Incidentally, in $(du,dv)$ coordinates the two principal directions are $(1,1)$ and $(1,-1)$—the diagonals of the $u,v$ grid.

### Example 3 (Advanced: the helicoid is a minimal surface)

Problem: for the helicoid

$$\vec r(u,v)=(v\cos u,v\sin u,cu),\qquad c>0,\ v\ne0,$$

find $E,F,G,L,M,N$, $K$, $H$, and decide whether it is a minimal surface.

Analysis: compute directly; note that $E$ contains $v^2+c^2$ and the normal must be normalized.

Solution: differentiating,

$$\vec r_u=(-v\sin u,v\cos u,c),\qquad \vec r_v=(\cos u,\sin u,0).$$

First form:

$$E=v^2+c^2,\qquad F=0,\qquad G=1.$$

The cross product is

$$\vec r_u\times\vec r_v=(-c\sin u,c\cos u,-v),$$

with norm $\sqrt{v^2+c^2}$, so

$$\vec n=\frac{(-c\sin u,c\cos u,-v)}{\sqrt{v^2+c^2}}.$$

Second derivatives:

$$\vec r_{uu}=(-v\cos u,-v\sin u,0),$$

$$\vec r_{uv}=(-\sin u,\cos u,0),$$

$$\vec r_{vv}=(0,0,0).$$

Dot products:

$$L=\frac{cv\sin u\cos u-cv\cos u\sin u}{\sqrt{v^2+c^2}}=0,$$

$$M=\frac{c\sin^2u+c\cos^2u}{\sqrt{v^2+c^2}}=\frac{c}{\sqrt{v^2+c^2}},$$

$$N=0.$$

Hence

$$K=\frac{LN-M^2}{EG-F^2}=\frac{-c^2/(v^2+c^2)}{v^2+c^2}=-\frac{c^2}{(v^2+c^2)^2}<0,$$

$$H=\frac{EN+GL-2FM}{2(EG-F^2)}=\frac{0+0-0}{2(v^2+c^2)}=0.$$

So the helicoid is a minimal surface, but not a flat one: $H=0$ while $K<0$.

Comment: this shows that $H=0$ and $K=0$ are entirely different matters. A minimal surface requires zero mean curvature (like a soap film) yet may bend equally and oppositely in the two principal directions, giving $K<0$. The helicoid is also ruled: fixing $u$, the map $v\mapsto\vec r(u,v)$ is a straight line. Ruled, minimal and negatively curved—all three properties occur simultaneously on the helicoid.

## 6. Common Mistakes and Pitfalls

- Mistake: forgetting to normalize the normal. Correction: $\vec n$ must be a unit vector, otherwise $L,M,N$ are multiplied by $\sqrt{EG-F^2}$ and both $K$ and $H$ are wrong.
- Mistake: writing the cross-term coefficient as $F$ or $M$ without the $2$. Correction: quadratic forms are written $2F\,du\,dv$ and $2M\,du\,dv$.
- Mistake: using the unnormalized $\vec r_u\times\vec r_v$ directly as $\vec n$. Correction: divide by its norm.
- Mistake: assuming $F=0$ always. Correction: that holds only for orthogonal parameter nets; for general parameters $F\ne0$.
- Mistake: taking $L/E$ and $N/G$ as the principal curvatures. Correction: that holds only when $F=M=0$; in general solve $\det(\mathrm{II}-\kappa\mathrm I)=0$.
- Mistake: confusing $du,dv$ with coordinate increments. Correction: they are differential-form variables; a direction is given by the ratio $du:dv$, and overall scaling does not affect the normal curvature.
- Mistake: using $EG-F^2$ rather than $\sqrt{EG-F^2}$ as the area element. Correction: the area element is $\sqrt{EG-F^2}\,du\,dv$.
- Mistake: treating the sign of $H$ as absolute. Correction: $H$ depends on the orientation of the normal; flipping it flips $H$ but not $K$.
- Mistake: writing the denominator of $K$ as $EG$. Correction: it is $EG-F^2$; when $F\ne0$ the difference is large.
- Mistake: treating $\mathrm{II}$ as positive definite. Correction: $\mathrm{II}$ takes both signs; it is not a metric and cannot measure lengths.

## 7. Summary and Mnemonic

Key points:

- $E=\vec r_u\cdot\vec r_u$, $F=\vec r_u\cdot\vec r_v$, $G=\vec r_v\cdot\vec r_v$ are the first-form coefficients;
- $L=\vec r_{uu}\cdot\vec n$, $M=\vec r_{uv}\cdot\vec n$, $N=\vec r_{vv}\cdot\vec n$ are the second-form coefficients;
- The area element is $\sqrt{EG-F^2}\,du\,dv$; arc length, angle and area all come from the first form;
- Normal curvature $\kappa_n=\mathrm{II}/\mathrm I$; principal curvatures solve $\det(\mathrm{II}-\kappa\mathrm I)=0$;
- $K=(LN-M^2)/(EG-F^2)$ and $H=(EN+GL-2FM)/(2(EG-F^2))$;
- When $F=M=0$ the principal curvatures reduce to $L/E$ and $N/G$.

Mnemonic: **"Derivatives first, then cross; unit normal dots the second; EFG measure inside, LMN measure outside."**`,
    keyPoints: [
      'E=r_u·r_u, F=r_u·r_v, G=r_v·r_v are the first-form coefficients',
      'L=r_uu·n, M=r_uv·n, N=r_vv·n are the second-form coefficients',
      'Arc length, area and angle all come from the first form',
      'Normal curvature k_n=II/I',
    ],
  },
  'geodesics': {
    chapter: 'Chapter 4 Geodesics',
    title: 'Geodesics and the Exponential Map',
    summary:
      'A geodesic is a "straight line" on a surface; the exponential map lays rays of the tangent plane back onto the surface, and is the source of locally shortest paths.',
    content: String.raw`

On a plane the shortest path between two points is a straight line. On a sphere? A great circle (the equator, a meridian). On a general surface, the straightest curves are called geodesics. They are both the shortest paths (locally) and the curves that do not drift sideways—the most natural stand-in for a straight line on a surface.

Prelude: transoceanic flights follow great circles, not parallels (except the equator), because only great circles are spherical geodesics and hence shortest. The exponential map associates, to a starting point and a direction and a distance, a precise point on the surface; it is the hinge of geodesic theory and the key tool for laying the tangent plane back onto the surface.

This chapter builds three things: the differential equation of geodesics, the local properties of the exponential map, and the global failure of geodesics (the cut locus). Finally the Clairaut relation handles surfaces of revolution, reducing the geodesic problem to a conserved quantity.

## 2. Rigorous Definitions

**Geodesic**. A curve $\gamma:I\to S$ on a surface $S$ is a geodesic if its geodesic curvature $\kappa_g=0$; equivalently,

$$\nabla_{\dot\gamma}\dot\gamma=0,$$

where $\nabla$ is the covariant derivative on the surface. Geometrically, $\gamma''$ is purely normal and has no tangential component: seen from inside the surface, the curve has no sideways acceleration.

**Geodesic equation**. In local coordinates $(u^1,u^2)=(u,v)$,

$$\frac{d^2u^k}{dt^2}+\Gamma_{ij}^k\frac{du^i}{dt}\frac{du^j}{dt}=0,\qquad k=1,2,$$

where $\Gamma_{ij}^k$ are the Christoffel symbols, determined by the first fundamental form.

**Affine parameter**. A parameter $t$ satisfying the geodesic equation is called affine. If $t$ is affine, so is $at+b$; the arc-length parameter is a special affine parameter (speed $1$). With a non-affine parametrization an extra term appears and the equation is no longer the geodesic equation.

**Exponential map**. Fix $p\in S$. For $v\in T_pS$ let $\gamma_v$ be the geodesic with $\gamma_v(0)=p$ and $\dot\gamma_v(0)=v$, and define

$$\exp_p(v)=\gamma_v(1),$$

whenever $\gamma_v$ is defined on $[0,1]$. $\exp_p$ maps a neighbourhood of the origin in the tangent plane onto a neighbourhood of $p$ on the surface.

**Normal coordinates**. Take an orthonormal basis of $T_pS$ and write $v=(x,y)$; then $(x,y)\mapsto\exp_p(xe_1+ye_2)$ gives coordinates near $p$, called normal coordinates. In them $\Gamma_{ij}^k(p)=0$, and geodesics through $p$ are locally straight lines.

**Clairaut relation**. For a surface of revolution, let $f(r)$ be the radius of the parallel circle and $\alpha$ the angle between the geodesic and the meridian; then along the geodesic

$$f(r)\sin\alpha=C,$$

where $C$ is constant along that geodesic.

**Completeness**. A surface is geodesically complete if every geodesic extends to all $t\in\mathbb{R}$. The Hopf–Rinow theorem: completeness is equivalent to every pair of points being joined by a shortest geodesic, and also to closed bounded subsets being compact.

**Cut locus**. The first point along a geodesic from $p$ at which it ceases to be shortest is a cut point; all cut points form the cut locus. Inside the cut locus $\exp_p$ is a diffeomorphism; beyond it, folding or repetition may occur.

## 3. Why Define It This Way

**Why must the acceleration of a geodesic be purely normal?** Because an observer inside the surface cannot see the normal direction and can only feel tangential acceleration. If the acceleration has a tangential component, the curve turns as seen from inside the surface; if it is purely normal, the curve looks straight from inside. This is the precise meaning of "walking a straight line on a surface".

**Why is the geodesic equation a second-order ODE?** Because "position plus velocity" determines a geodesic. The equation is second order in $u^k$, and given an initial point and velocity the Picard–Lindelöf theorem provides a unique solution. It also shows that through each point and each direction there is exactly one geodesic.

**Why do the Christoffel symbols involve only the first form?** Because parallel transport and the covariant derivative are intrinsic notions depending only on the metric. The formula for $\Gamma$ contains only $g_{ij}$ and its derivatives, never the second form. Hence geodesics are intrinsic: two locally isometric surfaces have the same geodesics (in corresponding parameters).

**Why is the exponential map a diffeomorphism near the origin?** Compute the differential of $\exp_p$ at $0$: the curve along direction $v$ is $t\mapsto\exp_p(tv)=\gamma_v(t)$, whose velocity at $t=0$ is $v$. So $d(\exp_p)_0=\operatorname{id}$, which is nonsingular. By the inverse function theorem, $\exp_p$ is a diffeomorphism on some neighbourhood of $0$, the injectivity-radius ball.

**Why are geodesics only locally shortest?** The first variation formula of the calculus of variations says that a locally shortest curve has zero geodesic curvature, i.e. is a geodesic. Conversely, a geodesic is shortest over a sufficiently short time (guaranteed by the exponential map and Gauss' lemma). Globally this may fail: between two points of a sphere the two great-circle arcs have equal length, and between antipodal points there are infinitely many; on a cylinder a helix is longer the more it winds.

**Counterexample: parallels are not geodesics.** On a sphere, the parallels other than the equator ($\theta=\theta_0$) are not geodesics. Their acceleration points toward the polar axis, whereas the sphere's normal is radial; the two are not parallel, so the acceleration has a tangential component. Seen from inside the sphere the parallel is therefore curved. The equator is the exception: its acceleration points to the centre, exactly along the normal, so it is a geodesic.

**Why does the Clairaut relation hold?** The metric of a surface of revolution is invariant under rotation about the axis, so by Noether's theorem the angular momentum $f^2\dot\theta$ is conserved. Writing the angular momentum in terms of $f\sin\alpha$ gives Clairaut's relation. It is a first integral of the geodesic equation, reducing a second-order equation to first order.

**Why does completeness matter?** If a surface is incomplete (a point removed, say), a geodesic may run into the "hole" in finite time and cannot be extended. The Hopf–Rinow theorem says that when the surface is complete, the exponential map is defined on the whole tangent plane and every pair of points is joined by a shortest geodesic. This is a cornerstone of global differential geometry.

## 4. Intuition and Pictures

> Intuition: a geodesic is a taut rubber band on the surface (locally shortest); the exponential map fires rays from $p$ and spreads them over the surface.

| Surface | Geodesics | Note |
|---|---|---|
| Plane | Straight lines | $\Gamma=0$ |
| Sphere | Great circles | Intersections of the sphere with planes through its centre |
| Cylinder | Helices, generators, horizontal circles | Straight lines when unrolled |
| Cone (apex removed) | Straight lines of the unrolled sector | Geodesics when rolled back |
| Torus | Complicated closed geodesics | Determined by the slope of two winding directions |

> More concretely: imagine placing a compass at each point $p$ of the surface; the exponential map is the process of shooting each arrow of the tangent plane out from the origin along a geodesic to its landing point. On a small scale this is like pasting a flat chart onto the surface without wrinkling; only beyond a certain radius (the cut locus) does folding appear.

| Claim | Right or wrong | Explanation |
|---|---|---|
| Geodesics are always shortest | Wrong | Only locally shortest; between antipodal points of a sphere there are infinitely many geodesics of equal length |
| All parallels are geodesics | Wrong | Only the equator is; other parallels have tangential acceleration |
| The geodesic equation depends only on the metric | Right | The Christoffel symbols are determined by the first form |
| The exponential map is globally injective | Wrong | Beyond the cut locus it may repeat or fold |
| A horizontal circle on a cylinder is a geodesic | Right | Its acceleration is along the normal (pointing to the axis) |

## 5. Worked Examples

### Example 1 (Basic: geodesics in plane polar coordinates)

Problem: in plane polar coordinates $(r,\theta)$ the metric is $ds^2=dr^2+r^2d\theta^2$. Find the geodesic equations and solve for all geodesics.

Analysis: compute the Christoffel symbols, then solve the second-order equations; simplify using conservation of angular momentum and unit speed.

Solution: $g_{rr}=1$, $g_{\theta\theta}=r^2$, $g_{r\theta}=0$. The nonzero Christoffel symbols are

$$\Gamma^r_{\theta\theta}=-r,\qquad \Gamma^\theta_{r\theta}=\Gamma^\theta_{\theta r}=\frac1r.$$

The geodesic equations:

$$r''-r(\theta')^2=0,\qquad \theta''+\frac{2}{r}r'\theta'=0.$$

Multiply the second by $r^2$:

$$r^2\theta''+2rr'\theta'=(r^2\theta')'=0,$$

so angular momentum is conserved:

$$r^2\theta'=h.$$

If $h=0$ then $\theta'=0$ and $\theta$ is constant: the curve is a ray from the origin, i.e. a straight line.

If $h\ne0$, use unit speed $r'^2+r^2\theta'^2=1$. Let $u=1/r$; then $r'=-u'/u^2$ and $\theta'=hu^2$. Substituting:

$$\frac{u'^2}{u^4}+h^2u^2=1\quad\Longrightarrow\quad u'^2=u^4(1-h^2u^2).$$

Hence

$$\frac{du}{d\theta}=\frac{u'}{\theta'}=\pm\frac{\sqrt{1-h^2u^2}}{h}.$$

Separating variables and integrating:

$$\int\frac{du}{\sqrt{1-h^2u^2}}=\pm\frac{\theta}{h}+C,$$

i.e.

$$\frac1h\arcsin(hu)=\pm\frac{\theta}{h}+C',$$

so $hu=\sin(\pm\theta+C'')$, i.e.

$$r=\frac{h}{\sin(\theta-\theta_0)}.$$

This is exactly the general equation of a line in polar coordinates: $r\sin(\theta-\theta_0)=h$, where $h$ is the distance from the origin to the line. Hence all geodesics are straight lines.

Comment: this shows that although the geodesic equations look complicated in polar coordinates, the solutions are still straight lines. Coordinates are only a descriptive tool; the geometric conclusion is unchanged. The geometric meaning of $h$ is the distance from the origin to the line; $h=0$ corresponds to a ray through the origin.

### Example 2 (Intermediate: geodesics on a sphere are great circles)

Problem: prove that the geodesics on the unit sphere are exactly the great circles.

Analysis: use the fact that $\gamma''$ is parallel to $\gamma$, build a function whose normal component satisfies a harmonic equation, and show it vanishes identically.

Solution: let $\gamma:I\to S^2$ be a unit-speed geodesic. Differentiating $\lvert\gamma\rvert^2=1$ twice,

$$\gamma\cdot\gamma'=0,\qquad \gamma\cdot\gamma''=-\lvert\gamma'\rvert^2=-1.$$

The acceleration of a geodesic is purely normal, and the normal of the unit sphere is $\gamma$, so

$$\gamma''=-\gamma.$$

Let

$$n_0=\gamma(0)\times\gamma'(0).$$

Since $\gamma(0)\perp\gamma'(0)$ and both are nonzero, $n_0\ne0$. Define

$$f(t)=\gamma(t)\cdot n_0.$$

Then $f(0)=\gamma(0)\cdot n_0=0$ and

$$f'(t)=\gamma'(t)\cdot n_0,\qquad f'(0)=\gamma'(0)\cdot n_0=0.$$

Differentiating again:

$$f''(t)=\gamma''(t)\cdot n_0=-\gamma(t)\cdot n_0=-f(t).$$

So $f''+f=0$ with $f(0)=f'(0)=0$, and by uniqueness for second-order linear ODEs $f\equiv0$. Hence $\gamma(t)$ always lies in the plane through the origin with normal $n_0$, and the intersection of that plane with the sphere is precisely a great circle. So geodesics are great circles.

Conversely, any great circle $\gamma(t)=\cos t\,p+\sin t\,v$ (with $p\perp v$ and $\lvert p\rvert=\lvert v\rvert=1$) satisfies $\gamma''=-\gamma$, so its acceleration is normal and it is a geodesic.

The exponential map: for the unit sphere, $\exp_p(v)=\cos\lvert v\rvert\,p+\sin\lvert v\rvert\,\frac{v}{\lvert v\rvert}$. It is a diffeomorphism for $\lvert v\rvert<\pi$; when $\lvert v\rvert=\pi$ every direction maps to the antipode $-p$ and $\exp_p$ is no longer injective. The cut locus is $\{-p\}$.

Comment: the key to the proof is translating "geodesic" into "acceleration parallel to the position vector" and then using a harmonic-oscillator equation to show the curve is confined to a plane through the centre. The formula for the exponential map comes for free: travelling a distance $t$ along a unit direction means rotating by $t$ radians.

### Example 3 (Advanced: the Clairaut relation and the highest latitude on a sphere)

Problem: for the surface of revolution $ds^2=dr^2+f(r)^2d\theta^2$, prove that geodesics satisfy $f(r)\sin\alpha=C$ (with $C$ constant), where $\alpha$ is the angle between the geodesic and the meridian. Then use it to find the highest latitude reachable by a geodesic on the unit sphere.

Analysis: obtain the angular momentum from the first integral of the $\theta$ equation, and express it in terms of $\alpha$.

Solution: the $\theta$ equation among the geodesic equations is

$$\theta''+\frac{2f'}{f}r'\theta'=0,$$

and multiplying by $f^2$:

$$f^2\theta''+2ff'r'\theta'=(f^2\theta')'=0.$$

Hence

$$f^2\theta'=h.$$

Let $\gamma$ have unit speed. The meridian direction $\partial_r$ is a unit vector, while the parallel direction $\partial_\theta$ has length $f$. Hence

$$\cos\alpha=\gamma'\cdot\partial_r=r',\qquad \sin\alpha=\gamma'\cdot\frac{\partial_\theta}{f}=f\theta'.$$

Therefore

$$f\sin\alpha=f^2\theta'=h,$$

which is Clairaut's relation.

For the unit sphere, take $\theta$ as the polar angle (measured from the north pole); the parallel radius is $f(\theta)=\sin\theta$, so

$$\sin\theta\sin\alpha=C.$$

If the geodesic makes angle $\alpha_0$ with the meridian at the equator $\theta=\pi/2$, the constant is $\sin(\pi/2)\sin\alpha_0=\sin\alpha_0$. At the highest latitude the geodesic is tangent to the parallel, $\alpha=\pi/2$, so

$$\sin\theta_{\min}=\sin\alpha_0.$$

Since $\theta_{\min}\in[0,\pi/2]$, $\theta_{\min}=\alpha_0$, and the highest latitude (angle from the equator) is

$$\frac{\pi}{2}-\theta_{\min}=\frac{\pi}{2}-\alpha_0.$$

For example, $\alpha_0=\pi/2$ (along the equator) gives highest latitude $0$, staying on the equator; $\alpha_0=0$ (along a meridian) gives highest latitude $\pi/2$, reaching the pole.

Comment: Clairaut's relation reduces the second-order geodesic equation to a first-order conservation law, the fastest tool for geodesics on surfaces of revolution. Its geometric meaning is conservation of angular momentum: the farther from the axis, the slower the rotation about it; when the geodesic reaches a turning point, the rotation about the axis vanishes and the curve is tangent to the parallel.

## 6. Common Mistakes and Pitfalls

- Mistake: believing all shortest paths are geodesics and all geodesics are shortest. Correction: geodesics are only locally shortest; between antipodal points of a sphere there are infinitely many geodesics of equal length.
- Mistake: taking a parallel as a geodesic. Correction: only the equator is; the others have tangential acceleration and nonzero geodesic curvature.
- Mistake: ignoring the Christoffel symbols and using Euclidean acceleration directly. Correction: acceleration on a surface must be projected onto the tangent plane; the $\Gamma$ terms cannot be dropped.
- Mistake: applying the geodesic equation with an arbitrary parameter. Correction: it holds only for affine parameters; reparametrizing adds a term.
- Mistake: assuming the exponential map is globally one-to-one. Correction: it fails beyond the cut locus; on a sphere it folds at the antipode.
- Mistake: conflating "a straight line on the surface" with "a straight line in space". Correction: a spatial line lying on the surface is indeed a geodesic, but a geodesic need not be a spatial line, e.g. a great circle.
- Mistake: thinking a horizontal circle on a cylinder is not a geodesic. Correction: its acceleration is normal (toward the axis), so it is a geodesic; a sphere's parallel is not, because its acceleration is not along the sphere's normal.
- Mistake: using Clairaut's relation on a non-rotational surface. Correction: it requires rotational symmetry about an axis; a general surface has no such conserved quantity.
- Mistake: ignoring completeness. Correction: a sphere with a point removed is incomplete, and some geodesics run into the hole in finite time and cannot be extended.
- Mistake: confusing geodesic curvature with Gaussian curvature. Correction: $\kappa_g$ is the sideways bending of a curve relative to the surface, $K$ is the bending of the surface itself; the two differ.

## 7. Summary and Mnemonic

Key points:

- A geodesic has a parallel-transported tangent, $\nabla_{\dot\gamma}\dot\gamma=0$, with acceleration purely normal;
- The geodesic equation is given by Christoffel symbols, depends only on the first fundamental form, and is intrinsic;
- Given an initial point and velocity, a geodesic exists and is unique locally;
- The exponential map $\exp_p(v)$ travels a length $\lvert v\rvert$ along a geodesic and is a diffeomorphism near the origin;
- Geodesics are locally shortest but not necessarily globally so; the cut locus is where this first fails;
- Surfaces of revolution obey Clairaut's relation $f(r)\sin\alpha=C$ (constant $C$), which reduces the order and yields geodesics.

Mnemonic: **"Geodesics never stray, acceleration points the normal way; the exponential map lays the plane, Christoffel symbols mark the lane."**`,
    keyPoints: [
      'Geodesic: acceleration perpendicular to the surface (tangent parallel transported)',
      'The geodesic equation is expressed with Christoffel symbols',
      'The exponential map exp_p(v) travels length |v| along a geodesic',
      'In normal coordinates geodesics are locally shortest',
    ],
  },
  'differential-forms': {
    chapter: 'Chapter 6 Exterior Differential Forms',
    title: 'Exterior Differential Forms and Stokes\u2019 Theorem',
    summary:
      'Exterior differentiation unifies every integral into one key: Newton–Leibniz, Gauss and Stokes are all special cases of a single formula.',
    content: String.raw`

Calculus has three siblings: Newton–Leibniz (one dimension), Green (the plane), and Gauss with Stokes (three dimensions). They look like separate tools, but all are special cases of one more unified formula—Stokes' theorem for exterior differential forms. It is a master key that always ties an integral over a region to an integral over its boundary.

Prelude: why do the divergence theorem and Gauss' formula look alike? Because both take the form

$$\int_M d\omega=\int_{\partial M}\omega.$$

The exterior derivative $d$ is the operation that unifies them, and the antisymmetry of the wedge product encodes the essence of oriented area and oriented volume. This chapter builds three things: the algebra of differential forms, the calculus of the exterior derivative, and how Stokes' theorem unifies all integral theorems.

## 2. Rigorous Definitions

**Differential form**. A $k$-form on $\mathbb{R}^n$ is an expression of the form

$$\omega=\sum_{i_1<\cdots<i_k}f_{i_1\cdots i_k}\,dx_{i_1}\wedge\cdots\wedge dx_{i_k}$$

where the $f_{i_1\cdots i_k}$ are smooth functions. A $0$-form is simply a function.

**Wedge product**. The wedge product $\wedge$ is bilinear, associative and antisymmetric:

$$dx_i\wedge dx_j=-dx_j\wedge dx_i,\qquad dx_i\wedge dx_i=0.$$

Hence swapping two factors changes the sign and a repeated factor gives zero. The wedge of a $k$-form and an $l$-form is a $(k+l)$-form.

**Exterior derivative**. For $\omega=\sum_I f_I\,dx_I$, define

$$d\omega=\sum_I df_I\wedge dx_I=\sum_I\sum_{j=1}^{n}\frac{\partial f_I}{\partial x_j}\,dx_j\wedge dx_I.$$

It raises a $k$-form to a $(k+1)$-form. The central property is

$$d^2=0.$$

**Pullback**. If $F:U\to V$ is smooth and $\omega$ is a $k$-form on $V$, the pullback $F^*\omega$ is a $k$-form on $U$, obtained by composing the coefficients of $\omega$ with $F$ and replacing the differentials by those of $F$. It commutes with the exterior derivative:

$$d(F^*\omega)=F^*(d\omega).$$

**Integration**. A $k$-form can be integrated only over a $k$-dimensional oriented manifold (or a parametrized $k$-dimensional region). If $\omega=f\,dx_1\wedge\cdots\wedge dx_k$, then

$$\int_D\omega=\int_D f\,dx_1\cdots dx_k.$$

Under a change of variables the Jacobian appears automatically—the reward for the antisymmetry of the wedge product.

**Stokes' theorem**. Let $M$ be an $n$-dimensional oriented smooth manifold with boundary and $\omega$ an $(n-1)$-form on $M$. Then

$$\int_M d\omega=\int_{\partial M}\omega,$$

where the orientation of $\partial M$ is given by the outward-normal-first convention.

**Closed and exact forms**. If $d\omega=0$, $\omega$ is closed; if $\omega=d\eta$, it is exact. Since $d^2=0$, every exact form is closed. The converse need not hold: the conditions under which a closed form is exact are the subject of de Rham cohomology.

**de Rham cohomology**.

$$H^k_{\mathrm{dR}}(M)=\frac{\ker(d:\Omega^k\to\Omega^{k+1})}{\operatorname{im}(d:\Omega^{k-1}\to\Omega^k)}.$$

It quantifies how far closed forms are from being exact, and is the differential-form version of the homology groups.

**Poincaré lemma**. If $M$ is contractible (for instance $\mathbb{R}^n$ or a star-shaped region), every closed $k$-form with $k\ge1$ is exact. So closed-but-not-exact can only happen on spaces with holes.

## 3. Why Define It This Way

**Why must the wedge product be antisymmetric?** Because oriented areas and volumes change sign when two directions are swapped, and a repeated direction collapses to zero. $dx\wedge dy$ denotes an oriented area element and $dy\wedge dx$ the opposite orientation; $dx\wedge dx$ is a degenerate area and equals zero. This is the essence of determinants and orientation. Antisymmetry also makes the Jacobian appear automatically in the change-of-variables formula: $dx\wedge dy$ becomes the Jacobian times $du\wedge dv$, with nothing extra to remember.

**Why is $d^2=0$?** For a $0$-form $f$,

$$d(df)=\sum_{j}\sum_{i}\frac{\partial^2f}{\partial x_i\partial x_j}dx_i\wedge dx_j.$$

Since mixed partials are equal while $dx_i\wedge dx_j=-dx_j\wedge dx_i$, the symmetric part multiplied by the antisymmetric part vanishes, so $d^2f=0$. For general forms the same cancellation of mixed partials against antisymmetry applies. Geometrically, $d$ corresponds to taking the boundary, and the boundary of a boundary is empty.

**Why does Stokes' theorem hold?** First prove it for an $n$-dimensional cube: integrate $d\omega$ term by term with the one-variable fundamental theorem, and the integrals over interior faces cancel in pairs, leaving only the boundary faces. Then transfer the cube result to a general manifold by subdivision and partitions of unity. Stokes' theorem is thus essentially the higher-dimensional Newton–Leibniz formula, and $d^2=0$ is the algebraic shadow of "the boundary of a boundary is empty".

**Why does the pullback commute with $d$?** Because pulling back means composing the coefficients and differentials of $\omega$ with $F$ and its differential, while $d$ only takes partial derivatives and wedge products. By the chain rule, pulling back then differentiating and differentiating then pulling back give the same derivative terms. This commutation is the most important technical property of the formalism, and the change-of-variables proof of Stokes' theorem relies on it entirely.

**Why is closed not the same as exact?** Because closed only says there is no local obstruction, whereas exact requires a global primitive. The counterexample is the angle form

$$\theta=\frac{-y\,dx+x\,dy}{x^2+y^2}$$

on $\mathbb{R}^2\setminus\{0\}$. It satisfies $d\theta=0$ (computed in the next section), yet its integral around the unit circle is $2\pi$, which is impossible for the differential of a function (a loop integral would then vanish). That $2\pi$ is the "flux" of the hole at the origin. The Poincaré lemma says that if the region is contractible, this cannot happen.

**Why are differential forms the natural objects of integration?** Because under a change of variables they transform by the Jacobian determinant, exactly cancelling the Jacobian factor in the change-of-variables formula. Ordinary functions or vector fields lack this automaticity and require separate rules for transforming divergence and curl. The language of forms unifies orientation, Jacobian and boundary in a single algebra.

**Counterexample: what if we drop antisymmetry?** If $dx\,dy$ were treated as ordinary multiplication, swapping would not change the sign, the sign of the Jacobian determinant would be lost under change of variables, and so would the orientation information. The direction of Stokes' theorem (counterclockwise positive) could not be encoded automatically. Antisymmetry is not an aesthetic choice but an intrinsic requirement of oriented integration.

## 4. Intuition and Pictures

> Intuition: a differential form is an infinitesimal measurement with a direction. A $0$-form is a function, a $1$-form a line-integral element, a $2$-form an area element, a $3$-form a volume element. $d$ raises the degree by one, and Stokes says the integral of the raised form over the interior equals the integral of the original over the boundary.

| Degree | Geometric object | Integral |
|---|---|---|
| 0 | Function | Evaluation at points |
| 1 | Oriented segment | Line integral |
| 2 | Oriented area | Surface integral, flux |
| 3 | Oriented volume | Volume integral |

| Classical theorem | Form version |
|---|---|
| Newton–Leibniz | One-dimensional Stokes |
| Green's theorem | Two-dimensional planar Stokes |
| Gauss divergence theorem | Three-dimensional divergence |
| Classical Stokes formula | Three-dimensional curl |

> More concretely: think of $d$ as the operator that takes a boundary. Take the boundary of a region and you get its edge; take the boundary again and you get nothing—hence $d^2=0$. Stokes' theorem says: integrating in the interior and then taking the boundary gives the same result as taking the boundary first and integrating on it. This is the ultimate generalization of the fundamental theorem of calculus.

| Claim | Right or wrong | Explanation |
|---|---|---|
| $dx\wedge dy=dy\wedge dx$ | Wrong | Swapping changes the sign |
| $dx\wedge dx=0$ | Right | A repeated direction is degenerate |
| A closed form is always exact | Wrong | The region must be contractible; the angle form is a counterexample |
| $d^2=0$ | Right | Mixed partials plus antisymmetry |
| Stokes applies only in three dimensions | Wrong | It is one formula in every dimension |

## 5. Worked Examples

### Example 1 (Basic: computing exterior derivatives)

Problem: compute the following exterior derivatives and verify $d^2=0$:

(1) $f=x^2yz$;
(2) $\alpha=yz\,dx+xz\,dy+xy\,dz$;
(3) $\beta=x^2y\,dz$.

Analysis: apply $d\omega=\sum df_I\wedge dx_I$; remember $dx\wedge dx=0$.

Solution: (1)

$$df=2xyz\,dx+x^2z\,dy+x^2y\,dz.$$

Now $d(df)$: by equality of mixed partials and $dx_i\wedge dx_j=-dx_j\wedge dx_i$, all terms cancel in pairs, so $d^2f=0$.

(2) Term by term:

$$d(yz\,dx)=d(yz)\wedge dx=(z\,dy+y\,dz)\wedge dx=z\,dy\wedge dx+y\,dz\wedge dx,$$

$$d(xz\,dy)=(z\,dx+x\,dz)\wedge dy=z\,dx\wedge dy+x\,dz\wedge dy,$$

$$d(xy\,dz)=(y\,dx+x\,dy)\wedge dz=y\,dx\wedge dz+x\,dy\wedge dz.$$

Collecting like terms, using $dy\wedge dx=-dx\wedge dy$, $dz\wedge dx=-dx\wedge dz$ and $dz\wedge dy=-dy\wedge dz$:

$$d\alpha=(z-z)dx\wedge dy+(x-x)dy\wedge dz+(y-y)dz\wedge dx=0.$$

So $\alpha$ is closed. In fact $\alpha=d(xyz)$, so it is also exact.

(3)

$$d\beta=d(x^2y)\wedge dz=(2xy\,dx+x^2\,dy)\wedge dz=2xy\,dx\wedge dz+x^2\,dy\wedge dz.$$

This is not zero, so $\beta$ is not closed. Now $d^2\beta$:

$$d(2xy\,dx\wedge dz)=2x\,dy\wedge dx\wedge dz=-2x\,dx\wedge dy\wedge dz,$$

$$d(x^2\,dy\wedge dz)=2x\,dx\wedge dy\wedge dz,$$

and the two sum to zero, confirming $d^2=0$.

Comment: the three parts cover three cases: exact and closed, closed and exact, not closed. Note that every term of $d\alpha=0$ is a "difference of like partials"—the differential-form version of vanishing curl.

### Example 2 (Intermediate: the angle form is closed but not exact)

Problem: on $\mathbb{R}^2\setminus\{0\}$ let

$$\theta=\frac{-y\,dx+x\,dy}{x^2+y^2}.$$

Prove that $d\theta=0$ but that $\theta$ is not exact.

Analysis: compute the exterior derivative, then integrate around the unit circle; if exact, the integral must vanish.

Solution: write $D=x^2+y^2$, $f=-y/D$, $g=x/D$. Then $\theta=f\,dx+g\,dy$ and

$$d\theta=(g_x-f_y)\,dx\wedge dy.$$

Compute:

$$g_x=\frac{\partial}{\partial x}\left(\frac{x}{D}\right)=\frac{D-x\cdot2x}{D^2}=\frac{y^2-x^2}{D^2},$$

$$f_y=\frac{\partial}{\partial y}\left(\frac{-y}{D}\right)=\frac{-D+y\cdot2y}{D^2}=\frac{y^2-x^2}{D^2}.$$

So $g_x-f_y=0$ and $d\theta=0$.

Along the unit circle $\gamma(t)=(\cos t,\sin t)$ with $0\le t\le2\pi$ and counterclockwise orientation:

$$\gamma'(t)=(-\sin t,\cos t),\qquad \theta(\gamma'(t))=\frac{-\sin t\cdot(-\sin t)+\cos t\cdot\cos t}{1}=1.$$

Hence

$$\oint_{S^1}\theta=\int_0^{2\pi}1\,dt=2\pi\ne0.$$

If $\theta=df$ for some smooth function $f$, then by Stokes (or the fundamental theorem of calculus),

$$\oint_{S^1}\theta=\oint_{S^1}df=f(\gamma(2\pi))-f(\gamma(0))=0,$$

a contradiction. So $\theta$ is closed but not exact.

Comment: this $2\pi$ is the "evidence" of the hole at the origin. $\theta$ is locally exact: on the plane slit along the negative real axis, $\theta=d\arctan(y/x)$ (for a suitable branch). But the angle function cannot be made single-valued globally—after one circuit about the origin it increases by $2\pi$—so no global primitive exists. This example is the generator of the de Rham cohomology $H^1_{\mathrm{dR}}(\mathbb{R}^2\setminus\{0\})\cong\mathbb{R}$.

### Example 3 (Advanced: verifying Stokes with Green's theorem)

Problem: let $D$ be the unit disk and $\omega=(x^2-y)\,dx+(y^2+x)\,dy$. Compute $\iint_D d\omega$ and $\oint_{\partial D}\omega$ separately, verifying Stokes' theorem.

Analysis: compute $d\omega$, then do the boundary integral via a parametrization; note the counterclockwise orientation of the boundary.

Solution: with $P=x^2-y$ and $Q=y^2+x$,

$$d\omega=(Q_x-P_y)\,dx\wedge dy=(1-(-1))\,dx\wedge dy=2\,dx\wedge dy.$$

Hence

$$\iint_D d\omega=2\iint_D dx\,dy=2\cdot\pi\cdot1^2=2\pi.$$

The boundary is $\gamma(t)=(\cos t,\sin t)$ with $0\le t\le2\pi$, counterclockwise. Since $\gamma'(t)=(-\sin t,\cos t)$,

$$\omega(\gamma'(t))=( \cos^2t-\sin t)(-\sin t)+(\sin^2t+\cos t)(\cos t).$$

Expanding:

$$=-\cos^2t\sin t+\sin^2t+\sin t\cos t+\cos^2t.$$

Integrating:

$$\oint_{\partial D}\omega=\int_0^{2\pi}\left(\sin^2t+\cos^2t\right)dt+\int_0^{2\pi}\left(-\cos^2t\sin t+\sin t\cos t\right)dt.$$

The first term is $\int_0^{2\pi}1\,dt=2\pi$. In the second, $-\cos^2t\sin t=\frac{d}{dt}\left(\frac{\cos^3t}{3}\right)$ and $\sin t\cos t=-\frac{d}{dt}\left(\frac{\cos^2t}{2}\right)$ are derivatives of periodic functions and integrate to zero over a period. Hence

$$\oint_{\partial D}\omega=2\pi.$$

The two sides agree, so Stokes' theorem holds.

Comment: two traps here. First the sign of $d\omega$: $Q_x-P_y=1-(-1)=2$, not zero. Second the orientation of the boundary: counterclockwise is positive; clockwise would flip the sign of both sides. Green's theorem is the planar special case of Stokes' theorem and is clearest when written in the language of forms.

## 6. Common Mistakes and Pitfalls

- Mistake: treating the wedge product as ordinary multiplication. Correction: $dx\wedge dy=-dy\wedge dx$ and $dx\wedge dx=0$.
- Mistake: forgetting $d^2=0$. Correction: it is the cornerstone of the theory, and many computations (cohomology, for instance) rely on it.
- Mistake: assuming a closed form is always exact. Correction: the region must be contractible; the angle form on $\mathbb{R}^2\setminus\{0\}$ is closed but not exact.
- Mistake: reversing the direction of a pullback. Correction: if $F:U\to V$ and $\omega$ is a form on $V$, then $F^*\omega$ is a form on $U$.
- Mistake: integrating in the wrong dimension. Correction: a $k$-form integrates only over a $k$-dimensional oriented region; a $1$-form cannot serve as an area element.
- Mistake: reversing the orientation of the boundary. Correction: planar regions are counterclockwise positive; for three-dimensional regions take the outward normal first and then orient the boundary by the right-hand rule.
- Mistake: calling the angle form globally exact. Correction: it is only locally exact on a region slit along a ray; globally, one circuit about the origin yields an extra $2\pi$.
- Mistake: assuming a closed $0$-form is constant. Correction: it is constant on a connected manifold; on a disconnected one it may be piecewise constant.
- Mistake: adding forms of different degrees. Correction: a $k$-form and an $l$-form can be added only when $k=l$.
- Mistake: thinking $d$ depends on coordinates. Correction: $d$ is a coordinate-free operator; the coordinate formula is merely one expression of it.

## 7. Summary and Mnemonic

Key points:

- Differential forms are oriented objects of integration; the wedge product is antisymmetric with $dx\wedge dx=0$;
- The exterior derivative $d$ raises a $k$-form to a $(k+1)$-form and satisfies $d^2=0$;
- Pullback commutes with $d$: $d(F^*\omega)=F^*(d\omega)$;
- Stokes' theorem $\int_M d\omega=\int_{\partial M}\omega$ unifies Newton–Leibniz, Green, Gauss and classical Stokes;
- Closed forms need not be exact; the angle form is the model counterexample, and the obstruction is a hole;
- Poincaré lemma: on a contractible region every closed form is exact.

Mnemonic: **"Wedge anticommutes, exterior squared is zero; closed is not exact, and the hole will show."**`,
    keyPoints: [
      'Differential form ω = f dx∧dy∧…, with an antisymmetric wedge product',
      'Exterior derivative d: d²=0, raising a k-form to a (k+1)-form',
      'Stokes\u2019 theorem ∫_M dω = ∫_{∂M} ω',
      'Green, Gauss and classical Stokes are all special cases',
    ],
  },
};

export default map;
