import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'first-order-ode': {
    chapter: 'Chapter 1 First-Order Differential Equations',
    title: 'Solving First-Order Differential Equations',
    summary:
      'Five types, five keys: separable, homogeneous, linear, exact, integrating factor. Identify the type first, then start computing.',
    content: String.raw`

A differential equation is the language for "describing the world by rates of change". Imagine a cup of coffee at 90℃ in a room at 20℃; Newton's law of cooling says the rate at which the temperature falls is proportional to the difference from room temperature. Written as a formula,

$$\frac{dT}{dt} = -k\,(T - 20)$$

Note that this formula does not directly tell you what $T$ equals; it only prescribes the relation that $T$ and its own derivative must satisfy. "Solving the equation" means working the function $T(t)$ back out of that relation.

A first-order differential equation is one in which only the first derivative $y'$ of the unknown function appears, with no $y''$ or higher derivatives. It is the entry key: every higher-order equation later must first be reduced to a first-order system, so the methods of this chapter keep recurring.

The real difficulty is not integration technique but "face recognition". The same equation can be written in many ways, and deciding which class it belongs to determines which key you should use. The main line of this article is one sentence: **identify the type first, then start computing**. After reading you can answer a concrete question: given $y' + \frac{1}{x}y = x^2$ and given $y' = \frac{y}{x} + 1$, why must one take two completely different routes?

## II. Rigorous Definitions

Let $x$ be the independent variable and $y=y(x)$ the unknown function, and write $y'=\dfrac{dy}{dx}$.

**First-order explicit equation**: of the form

$$y' = f(x,y)$$

where $f$ is a known function defined on some plane region $D$.

**Solution**: if a function $y=\varphi(x)$ is differentiable on an interval $I$, and for all $x\in I$ we have $(x,\varphi(x))\in D$ and

$$\varphi'(x) \equiv f\big(x,\varphi(x)\big)$$

then $\varphi$ is called a solution of the equation on $I$. Substituting the function turns the equation into an identity—only then is it a "solution".

**General solution, particular solution, singular solution**: the family $y=\varphi(x,C)$ containing an arbitrary constant $C$ is the general solution if it covers all solutions near every point of the region; the solution obtained after fixing $C$ by an initial value $y(x_0)=y_0$ is a particular solution; a solution that cannot be obtained by choosing some $C$ in the general solution is a singular solution. Singular solutions are often envelopes, such as that of Clairaut's equation.

Five basic types follow. Let $P,Q,g,h,\varphi,M,N$ all be continuous on the relevant regions.

**1. Separable equation**:

$$\frac{dy}{dx} = g(x)\,h(y)$$

the right-hand side factors into "a factor of $x$ only" times "a factor of $y$ only".

**2. Homogeneous equation**:

$$\frac{dy}{dx} = \varphi\!\left(\frac{y}{x}\right)$$

the right-hand side depends on $y$ only through the ratio $y/x$. Here "homogeneous" means all terms have the same degree—not the same as "homogeneous linear" in linear algebra.

**3. First-order linear equation**:

$$\frac{dy}{dx} + P(x)\,y = Q(x)$$

the unknown $y$ and $y'$ appear only to the first power, with no terms like $y^2$, $yy'$ or $\sin y$. When $Q\equiv 0$ it is called homogeneous linear, otherwise non-homogeneous linear.

**4. Exact equation (total differential equation)**: written in differential form

$$M(x,y)\,dx + N(x,y)\,dy = 0$$

if there is a differentiable function $u(x,y)$ with

$$du = M\,dx + N\,dy$$

then the equation is called exact and $u$ its potential function. The equation is then equivalent to $du=0$, with solution $u(x,y)=C$.

**5. Bernoulli equation**:

$$\frac{dy}{dx} + P(x)\,y = Q(x)\,y^{n}\qquad (n\ne 0,1)$$

when $n=0$ or $n=1$ it is already linear, so those cases are excluded.

**Integrating factor**: if $\mu(x,y)\ne 0$ makes $\mu M\,dx+\mu N\,dy=0$ exact, then $\mu$ is an integrating factor. The factor $e^{\int P dx}$ for a linear equation is a special case.

## III. Why Defined This Way (The Motivation of Each Method)

**Why can separable variables be separated?** Because the right-hand side $g(x)h(y)$ splits the two variables completely. Where $h(y)\ne 0$, divide both sides by $h(y)$ and multiply by $dx$:

$$\frac{dy}{h(y)} = g(x)\,dx$$

the left contains only $y$, the right only $x$. Integrating each side is essentially the inverse of the chain rule: if $H'(y)=1/h(y)$, then

$$\frac{d}{dx}H\big(y(x)\big) = H'(y)y' = \frac{y'}{h(y)} = g(x)$$

so $H(y)=\int g(x)\,dx+C$ satisfies the original equation automatically. Note that we treated $dy/dx$ as a fraction; the rigorous statement is the chain rule above, but "multiplying by $dx$" is a safe mnemonic in computation.

**Why multiply a linear equation by an integrating factor?** There is no ready formula for integrating $y'+Py$ directly, because the left-hand side is not the derivative of a product. But recall the product rule:

$$\big(\mu y\big)' = \mu y' + \mu' y$$

we want this to equal $\mu(y'+Py)=\mu y'+\mu P y$, so it suffices that $\mu'=\mu P$, giving

$$\mu(x)=e^{\int P(x)\,dx}$$

Multiplying both sides by $\mu$ turns the equation into $(\mu y)'=\mu Q$, immediately integrable:

$$y = e^{-\int P dx}\left(\int Q(x)e^{\int P dx}\,dx + C\right)$$

This is the general solution of a first-order linear equation. The integral $\int P\,dx$ appears twice: once in the exponent and once inside the inner integral—not a typo, but the inevitable result of "multiply in, then divide out".

**Why does an exact equation look at $M_y=N_x$?** If $M=u_x$, $N=u_y$, and the second mixed partials of $u$ are continuous, then

$$M_y = u_{xy} = u_{yx} = N_x$$

so $M_y=N_x$ is necessary for a potential function to exist. On a simply connected region it is also sufficient: the line integral

$$u(x,y)=\int_{x_0}^{x}M(s,y_0)\,ds+\int_{y_0}^{y}N(x,t)\,dt$$

is path-independent and satisfies $u_x=M$, $u_y=N$. Testing exactness requires only two partial derivatives—very mechanical.

**Why set $z=y^{1-n}$ for a Bernoulli equation?** Divide both sides by $y^n$:

$$y^{-n}y' + P(x)y^{1-n} = Q(x)$$

note that $z=y^{1-n}$ has derivative $z'=(1-n)y^{-n}y'$, so multiplying the above by $1-n$ gives

$$z' + (1-n)P(x)z = (1-n)Q(x)$$

a first-order linear equation in $z$. The motive for the substitution is "to make $y^{-n}y'$ into $z'$", and the exponent $1-n$ is exactly what turns the power of $y$ from $1-n$ into one.

**A counterexample showing the condition cannot be dropped**: the equation $y'=y^2,\ y(0)=0$. If one separates variables and divides by $y^2$, one gets $-1/y=x+C$, which contradicts the initial value, so many people write "no solution". But $y\equiv 0$ plainly satisfies both the equation and the initial condition! The problem is that dividing by $y^2$ assumes $y\ne 0$ and throws away the constant solution. The right procedure is: check the constant solutions $h(y)=0$ separately before separating, and restore them at the end. This pit is even worse for $y'=y^{1/3}$—there both $y\equiv 0$ and $y=(2x/3)^{3/2}$ are solutions through the origin, and uniqueness fails entirely.

## IV. Intuition and Pictures

A first-order equation $y'=f(x,y)$ assigns a slope to every point $(x,y)$ of the plane. Drawing all these slopes as short segments gives the direction field (slope field); solution curves are everywhere tangent to these segments, hence the name integral curves.

> Intuition: the direction field is like a meadow of grass blown down by the wind, each blade pointing in the locally allowed direction of motion; an integral curve is the track you get by walking along the fallen grass. Two integral curves cannot cross, otherwise there would be two slopes at the intersection, contradicting the single-valuedness of $f$.

A useful auxiliary line when sketching is the **isocline**: setting $f(x,y)=k$ gives a curve on which every integral curve has tangent slope $k$. Draw a few isoclines and then connect along the directions and you can sketch the phase portrait.

Comparison of the five types:

| Type | Identifying feature | Core operation |
|---|---|---|
| Separable | right side can be written $g(x)h(y)$ | separate, then integrate both sides |
| Homogeneous | right side contains only $y/x$ | set $u=y/x$, reduce to separable |
| Linear | $y,y'$ both to the first power, no products | multiply by the integrating factor $e^{\int P dx}$ |
| Exact | $M_y=N_x$ | find the potential $u$, solve $u=C$ |
| Bernoulli | right side carries $y^n$ | set $z=y^{1-n}$, reduce to linear |

In practice, check in the following order and stop at the first hit:

1. Can the right side be written $g(x)h(y)$? If so, separable.
2. Does the right side depend only on $y/x$? If so, homogeneous; set $u=y/x$.
3. Is it $y'+Py=Q$? If so, linear; apply the integrating factor.
4. Written as $Mdx+Ndy=0$, is $M_y=N_x$? If so, exact.
5. Is it $y'+Py=Qy^n$? If so, Bernoulli.

Right versus wrong: seeing $\dfrac{dy}{dx}=\dfrac{y}{x}+1$, do not classify it as linear just because $y$ appears to the first power—it contains the quotient $y/x$, and a linear equation does not allow $y$ in the coefficients. The correct judgement is homogeneous; setting $u=y/x$ gives $xu'=1$, hence $y=x(\ln x+C)$.

> Another common misjudgement: is $y'=x+y$ separable? No—$x+y$ does not factor into a product; it is linear with $P=-1,\ Q=x$. Judge the type by structure, not by resemblance.

## V. Worked Examples

### Example 1 (Basic: separable variables + initial value)

Problem: solve $\dfrac{dy}{dx}=2xy$ and find the particular solution with $y(0)=1$.

Analysis: the right side is the product of $2x$ and $y$, so it is separable. First note that $y\equiv 0$ is a constant solution, temporarily lost when dividing by $y$.

Solution: for $y\ne 0$, separate:

$$\frac{dy}{y}=2x\,dx$$

integrating both sides:

$$\ln|y|=x^2+C_1$$

exponentiating gives $|y|=e^{C_1}e^{x^2}$; dropping the absolute value and absorbing the sign into the constant:

$$y=C\,e^{x^2}\qquad (C\ne 0)$$

Since $y\equiv 0$ is also a solution, corresponding to $C=0$, the general solution can be written uniformly as $y=Ce^{x^2}$ with $C$ arbitrary.

Substituting $y(0)=1$: $1=C e^{0}=C$, so

$$y=e^{x^2}$$

Check: $y'=2x e^{x^2}=2xy$ and $y(0)=1$; correct.

> Comment: here the constant solution $y=0$ happens to be absorbed by $C=0$, so the general solution has no gap; but that is luck, not the rule. The next example shows a case that cannot be absorbed.

### Example 2 (Intermediate: first-order linear equation)

Problem: solve $y'+\dfrac{1}{x}y=x^2\ (x>0)$ and find the particular solution with $y(1)=2$.

Analysis: this is the standard linear form $y'+P(x)y=Q(x)$ with $P=1/x$, $Q=x^2$.

Solution: the integrating factor

$$\mu(x)=e^{\int \frac{1}{x}dx}=e^{\ln x}=x$$

(since $x>0$, no absolute value is needed). Multiply both sides by $x$:

$$xy'+y=x^3$$

the left side is exactly $(xy)'$, so

$$(xy)'=x^3$$

integrating,

$$xy=\frac{x^4}{4}+C\quad\Longrightarrow\quad y=\frac{x^3}{4}+\frac{C}{x}$$

This is the general solution. Substituting $y(1)=2$:

$$2=\frac{1}{4}+C\quad\Longrightarrow\quad C=\frac{7}{4}$$

so the particular solution is

$$y=\frac{x^3}{4}+\frac{7}{4x}$$

Check: $y'=\dfrac{3x^2}{4}-\dfrac{7}{4x^2}$, while $\dfrac{y}{x}=\dfrac{x^2}{4}+\dfrac{7}{4x^2}$; adding gives $x^2$, correct.

> Comment: one may also apply the formula $y=e^{-\int P dx}\big(\int Qe^{\int P dx}dx+C\big)$ directly. The easiest mistake with the formula is the signs of the two exponents: the outer one must be negative, because the integrating factor has to be divided out again.

### Example 3 (Advanced: Bernoulli equation and interval of existence)

Problem: solve $y'+\dfrac{y}{x}=y^2$, $y(1)=1$, and state the maximal interval of existence.

Analysis: the right side contains $y^2$, so it is not linear; it has the form $y'+Py=Qy^n$ with $n=2$—Bernoulli. Set $z=y^{1-2}=y^{-1}$.

Solution: first note that $y\equiv 0$ is a solution but does not satisfy $y(1)=1$, so wherever the solution lives, $y\ne 0$.

Divide both sides by $y^2$:

$$y^{-2}y'+\frac{1}{x}y^{-1}=1$$

set $z=y^{-1}$; then $z'=-y^{-2}y'$, i.e. $y^{-2}y'=-z'$. Substituting,

$$-z'+\frac{z}{x}=1\quad\Longrightarrow\quad z'-\frac{z}{x}=-1$$

a linear equation in $z$ with $P=-1/x$; the integrating factor is

$$\mu=e^{\int -\frac{1}{x}dx}=e^{-\ln x}=\frac{1}{x}$$

multiply both sides by $1/x$:

$$\frac{z'}{x}-\frac{z}{x^2}=-\frac{1}{x}\quad\Longrightarrow\quad \left(\frac{z}{x}\right)'=-\frac{1}{x}$$

integrating:

$$\frac{z}{x}=-\ln x+C\quad\Longrightarrow\quad z=x(C-\ln x)$$

back-substituting $z=1/y$:

$$y=\frac{1}{x(C-\ln x)}$$

from $y(1)=1$ we get $1=\dfrac{1}{1\cdot C}$, so $C=1$ and

$$y=\frac{1}{x(1-\ln x)}$$

The interval of existence requires a nonzero denominator and $x>0$: $1-\ln x>0$, i.e. $0<x<e$. As $x\to e^-$, $y\to+\infty$—blow-up. So the maximal interval is $(0,e)$.

Check: from $z=x(1-\ln x)$ we get $z'=1-\ln x-1=-\ln x$, and $z'-\frac{z}{x}=-\ln x-(1-\ln x)=-1$, satisfying the transformed equation; the back-substitution is correct.

> Comment: two traps here. First, when $n=2$ we set $z=y^{-1}$; some mistakenly reverse the sign of $z'$ after setting it. Second, stopping once the general solution is found and forgetting that the initial value truncates the interval of existence at the blow-up point. The denominator $1-\ln x$ vanishes at $x=e$—not an ordinary "point of undefinedness" but where the solution genuinely runs to infinity.

### Example 4 (Comprehensive: exact equation)

Problem: solve $(2xy+3x^2)\,dx+(x^2-2y)\,dy=0$.

Analysis: write it as $Mdx+Ndy=0$ with $M=2xy+3x^2$, $N=x^2-2y$; first verify exactness.

Solution: compute the partials

$$M_y=2x,\qquad N_x=2x$$

they are equal and continuous on the whole plane, so the equation is exact and a potential $u$ exists.

Integrate $M$ with respect to $x$ (treating $y$ as constant):

$$u=\int(2xy+3x^2)\,dx=x^2y+x^3+\phi(y)$$

then differentiate with respect to $y$:

$$u_y=x^2+\phi'(y)$$

this must equal $N=x^2-2y$, so $\phi'(y)=-2y$ and $\phi(y)=-y^2$ (the constant can be absorbed into $C$). Hence

$$u(x,y)=x^2y+x^3-y^2$$

and the general solution is

$$x^2y+x^3-y^2=C$$

Check: differentiating both sides gives $(2xy+3x^2)dx+(x^2-2y)dy=0$, the original equation.

> Comment: if $M_y\ne N_x$, try to find an integrating factor depending only on $x$. When $\dfrac{M_y-N_x}{N}$ contains only $x$, take $\mu(x)=\exp\!\big(\int\frac{M_y-N_x}{N}dx\big)$; when $\dfrac{N_x-M_y}{M}$ contains only $y$, take $\mu(y)=\exp\!\big(\int\frac{N_x-M_y}{M}dy\big)$. These two formulas come from forcing $(\mu M)_y=(\mu N)_x$ and then separating variables.

## VI. Common Errors and Pitfalls

1. **Losing constant solutions when separating**: wrong—dividing by $h(y)$ directly and writing only the integral result. Why wrong—the division assumes $h(y)\ne 0$, and $h(y)=0$ often gives legitimate constant solutions. Right—first check separately whether $h(y)=0$ is a solution, then restore it.
2. **Forgetting the absolute value in $\int\frac{dy}{y}=\ln|y|$**: wrong—writing $\ln y$. Why wrong—$\ln y$ is undefined for $y<0$, so the negative branch is lost. Right—keep $|y|$ and absorb the sign into the arbitrary constant at the end.
3. **Reversing the sign of the integrating factor**: wrong—writing the general solution as $y=e^{\int P dx}(\cdots)$. Why wrong—the factor multiplied in must be divided out again, so the outer exponent must be negative. Right—$y=e^{-\int P dx}\big(\int Qe^{\int P dx}dx+C\big)$.
4. **Confusing homogeneous with linear**: wrong—treating anything with $y/x$ as linear. Why wrong—a linear equation does not allow $y$ in the coefficients. Right—when the right side depends only on $y/x$, set $u=y/x$ and reduce to $xu'=\varphi(u)-u$.
5. **Wrong exponent in the Bernoulli substitution**: wrong—setting $z=y^{-n}$. Why wrong—$z'=(1-n)y^{-n}y'$, so only $z=y^{1-n}$ turns $y^{-n}y'$ into a constant multiple of $z'$. Right—$z=y^{1-n}$.
6. **Not stating the interval of existence**: wrong—treating $y=\frac{1}{x(1-\ln x)}$ as defined for all $(0,+\infty)$. Why wrong—a solution is valid only on an interval where it is continuously differentiable and the denominator is nonzero. Right—after solving, check the zeros of the denominator and the initial value, and state the maximal interval.
7. **Checking only one partial derivative for exactness**: wrong—computing $u_x=M$ and writing the answer at once. Why wrong—one must also verify $u_y=N$, or $\phi(y)$ may be wrong. Right—check both steps and finally verify by differentiating $u$.

## VII. Summary and Mnemonic

Key points:

- Five types of first-order equations: separable, homogeneous, linear, exact, Bernoulli; identifying the type comes before computing.
- Separable: separate and integrate both sides; always restore the constant solution $h(y)=0$.
- Homogeneous: set $u=y/x$, then $y'=u+xu'$ and the equation becomes $xu'=\varphi(u)-u$.
- Linear: integrating factor $\mu=e^{\int P dx}$, general solution $y=e^{-\int P dx}\big(\int Q\mu\,dx+C\big)$.
- Exact: criterion $M_y=N_x$; find the potential $u$ and get the implicit solution $u=C$; if not exact, look for an integrating factor.
- Bernoulli: set $z=y^{1-n}$ to linearize, then substitute back and check $y=0$.
- Any general solution must be combined with the initial value to fix the constant, and the maximal interval of existence stated.

**Mnemonic: type first—separable, homogeneous, linear, exact; the integrating factor's outer sign is negative, and don't forget the absolute value and the constant.**`,
    keyPoints: [
      'The first step is always "identify the type": separable → homogeneous → linear → exact',
      'The general solution formula for a first-order linear equation contains ∫P dx twice',
      'Exactness criterion M_y = N_x; if not exact, find an integrating factor',
      'Separation of variables loses constant solutions—always check at the end',
    ],
    relatedProblemIds: ['p-ode-1'],
  },

  'higher-linear-ode': {
    chapter: 'Chapter 2 Higher-Order Linear Differential Equations',
    title: 'Higher-Order Linear Differential Equations',
    summary:
      'An n-th order linear equation is n first-order equations in a system. Solution structure, the characteristic equation and undetermined coefficients are the three pillars of undergraduate exams.',
    content: String.raw`

The displacement of a spring oscillator satisfies $my''+cy'+ky=0$, the bending of a beam satisfies $y^{(4)}=f(x)$, and the current in an RLC circuit also satisfies a second-order linear equation. Superficially unrelated, they share the same mathematical structure: the unknown function and its derivatives appear to the first power, and the coefficients depend only on the independent variable.

The most fascinating thing about linear equations is the **superposition principle**: the sum of two solutions is a solution, and a solution times a constant is a solution. So the set of all solutions is a vector space. The problem immediately becomes three linear-algebraic questions: what is the dimension of this space? how do we find a basis? and what happens when a non-homogeneous term appears?

The core question of this lecture: why does the general solution of an n-th order linear equation contain exactly n arbitrary constants, and why do n "linearly independent" homogeneous solutions plus one particular solution miss nothing? The answer lies in the dimension of the solution space and the Wronskian.

## II. Rigorous Definitions

The standard form of an $n$**-th order linear differential equation** is

$$y^{(n)}+a_{n-1}(x)y^{(n-1)}+\cdots+a_1(x)y'+a_0(x)y=f(x)$$

where $a_0,\dots,a_{n-1}$ and $f$ are known continuous functions on an interval $I$. The left side is denoted $L[y]$, where $L$ is a linear differential operator: $L[c_1y_1+c_2y_2]=c_1L[y_1]+c_2L[y_2]$.

- If $f\equiv 0$, it is a **homogeneous equation** $L[y]=0$;
- if $f\not\equiv 0$, a **non-homogeneous equation**, and $f$ is called the forcing term or non-homogeneous term.

**Existence and uniqueness**: for any $x_0\in I$ and any array $(c_0,c_1,\dots,c_{n-1})$, the initial value problem

$$L[y]=f,\qquad y(x_0)=c_0,\ y'(x_0)=c_1,\ \dots,\ y^{(n-1)}(x_0)=c_{n-1}$$

has a unique solution on $I$.

**Linear dependence and independence**: the functions $y_1,\dots,y_n$ are linearly dependent on $I$ if there are constants $k_1,\dots,k_n$ not all zero with $k_1y_1+\cdots+k_ny_n\equiv 0$; otherwise they are linearly independent.

**Wronskian**:

$$W(x)=\begin{vmatrix}
y_1 & y_2 & \cdots & y_n\\
y_1' & y_2' & \cdots & y_n'\\
\vdots & \vdots & & \vdots\\
y_1^{(n-1)} & y_2^{(n-1)} & \cdots & y_n^{(n-1)}
\end{vmatrix}$$

**Fundamental set of solutions**: if $n$ solutions $y_1,\dots,y_n$ of the homogeneous equation satisfy $W(x)\ne 0$ on $I$, they form a fundamental set. The general solution of the homogeneous equation is then

$$y_h=C_1y_1+\cdots+C_ny_n$$

**Structure of the non-homogeneous general solution**: if $y^*$ is one particular solution of the non-homogeneous equation, all solutions are

$$y=y_h+y^*=C_1y_1+\cdots+C_ny_n+y^*$$

**Constant-coefficient case**: if all $a_i$ are constants, substitute $y=e^{\lambda x}$ into the homogeneous equation and cancel $e^{\lambda x}$ to get the **characteristic equation**

$$\lambda^n+a_{n-1}\lambda^{n-1}+\cdots+a_1\lambda+a_0=0$$

whose roots are the characteristic roots.

**Euler equation**: a variable-coefficient equation of the form

$$x^ny^{(n)}+b_{n-1}x^{n-1}y^{(n-1)}+\cdots+b_1xy'+b_0y=f(x)$$

in which each term has "order of derivative" equal to "power of $x$".

## III. Why Defined This Way

**Why is the homogeneous solution space exactly $n$-dimensional?** Fix $x_0$. For each initial vector $\vec{c}=(c_0,\dots,c_{n-1})$ there is a unique solution. In particular, take the $n$ standard basis vectors

$$\vec{e}_1=(1,0,\dots,0),\ \dots,\ \vec{e}_n=(0,\dots,0,1)$$

giving $n$ solutions $y_1,\dots,y_n$. Their Wronskian at $x_0$ is the determinant of the identity matrix, $1\ne 0$, so they are linearly independent. On the other hand, the initial vector of any solution $y$ at $x_0$ can be written $\vec{c}=\sum c_i\vec{e}_i$, and by uniqueness $y=\sum c_i y_i$. Hence these $n$ solutions span the whole solution space, whose dimension is exactly $n$. The dimension is no coincidence—it is "the number of degrees of freedom of the initial conditions".

**Why does $W\ne 0$ detect linear independence?** Suppose $\sum k_iy_i\equiv 0$. Differentiate $0,1,\dots,n-1$ times with respect to $x$ to get the homogeneous linear system

$$\begin{pmatrix}
y_1 & \cdots & y_n\\
\vdots & & \vdots\\
y_1^{(n-1)} & \cdots & y_n^{(n-1)}
\end{pmatrix}
\begin{pmatrix}k_1\\ \vdots\\ k_n\end{pmatrix}=0$$

if $W(x_0)\ne 0$ the coefficient matrix is invertible and only the zero solution $k_1=\cdots=k_n=0$ exists, so the functions are independent. Conversely, if they are dependent, the columns are linearly dependent and $W\equiv 0$.

A finer result is **Liouville's formula**: for $n$ solutions of the same homogeneous equation,

$$W(x)=W(x_0)\exp\left(-\int_{x_0}^{x}a_{n-1}(s)\,ds\right)$$

the exponential factor is always positive, so $W$ is either identically zero or nowhere zero. This is why one need only compute $W$ at one convenient point.

> Counterexample (the hypothesis cannot be dropped): $y_1=x^2$ and $y_2=x|x|$ are linearly independent on $(-1,1)$, yet $W\equiv 0$. Direct computation: for $x>0$ both equal $x^2$ and $W=0$; for $x<0$, $y_2=-x^2$ and $W=x^2(-2x)-2x(-x^2)=0$. They do not satisfy the same second-order linear equation, so Liouville's formula does not apply. So "$W=0$ implies dependence" requires the extra hypothesis "solutions of the same linear equation".

**Why try $e^{\lambda x}$ in the constant-coefficient case?** Because differentiating multiplies by $\lambda$: $(e^{\lambda x})^{(k)}=\lambda^k e^{\lambda x}$. Every term then carries the common factor $e^{\lambda x}$, and cancelling it gives the characteristic equation. In other words, $e^{\lambda x}$ is an eigenfunction of the operator $L$, with $\lambda$ the eigenvalue.

**Why multiply by $x^k$ for a repeated root?** Let $\lambda$ be a root of multiplicity $k$; then the characteristic polynomial can be written $P(\lambda')=(\lambda'-\lambda)^kQ(\lambda')$, corresponding to the operator factorization $L=(D-\lambda)^kQ(D)$. The key identity is

$$(D-\lambda)\big(x^m e^{\lambda x}\big)=m x^{m-1}e^{\lambda x}$$

each application of $D-\lambda$ lowers the power of $x$ by one. Thus for $m=0,1,\dots,k-1$, $k$ applications give zero, and these $k$ functions are all solutions; their Wronskian is nonzero, exactly supplying the dimensions missing at a repeated root. For $m\ge k$ the function is not killed, so only the first $k$ are needed.

**Why pair complex roots into sines and cosines?** If $\lambda=\alpha+i\beta$ is a root of a real polynomial, so is its conjugate $\bar\lambda=\alpha-i\beta$. Taking a linear combination of the complex solution $e^{(\alpha+i\beta)x}$ and its conjugate, Euler's formula

$$e^{(\alpha+i\beta)x}=e^{\alpha x}(\cos\beta x+i\sin\beta x)$$

shows that the real and imaginary parts are $e^{\alpha x}\cos\beta x$ and $e^{\alpha x}\sin\beta x$; they are still solutions and are real-valued.

**What about the non-homogeneous case?** Two main methods.

**Undetermined coefficients**: if $f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_m(x)\sin\beta x\big)$, where $P_m,Q_m$ are polynomials of degree at most $m$, set

$$y^*=x^{k}e^{\alpha x}\big(R_m(x)\cos\beta x+S_m(x)\sin\beta x\big)$$

where $R_m,S_m$ are undetermined polynomials of degree $m$ and $k$ is the multiplicity of $\alpha+i\beta$ as a characteristic root ($k=0$ if it is not a root). The reason for $x^k$: if the forcing frequency coincides with a homogeneous frequency, a direct guess overlaps the homogeneous solution, the left side becomes zero and the coefficients can never be found; multiplying by $x$ pushes the solution out of the resonant subspace.

**Variation of parameters**: set $y^*=u_1y_1+\cdots+u_ny_n$, requiring the $u_i$ to satisfy

$$\sum_{i=1}^{n}u_i'y_i^{(j)}=0\ (j=0,\dots,n-2),\qquad \sum_{i=1}^{n}u_i'y_i^{(n-1)}=f(x)$$

for a second-order equation this gives

$$u_1'=-\frac{y_2f}{W},\qquad u_2'=\frac{y_1f}{W}$$

then integrate. It works for any continuous $f$, at the cost of computing integrals.

## IV. Intuition and Pictures

The correspondence between characteristic roots and solution forms is the core of the chapter:

| Characteristic root | Corresponding real solution |
|---|---|
| simple real root $\lambda$ | $e^{\lambda x}$ |
| real root $\lambda$ of multiplicity $k$ | $e^{\lambda x},xe^{\lambda x},\dots,x^{k-1}e^{\lambda x}$ |
| simple complex root $\alpha\pm i\beta$ | $e^{\alpha x}\cos\beta x,\ e^{\alpha x}\sin\beta x$ |
| complex root $\alpha\pm i\beta$ of multiplicity $k$ | the two groups above each multiplied by $1,x,\dots,x^{k-1}$ |

> Intuition: real roots control "growth or decay", complex roots control "rotation or oscillation". The real part $\alpha$ is the exponential envelope of the amplitude: for $\alpha<0$ the oscillation is squeezed to $0$, for $\alpha>0$ it grows without bound, for $\alpha=0$ it oscillates with constant amplitude. The imaginary part $\beta$ is the angular frequency, deciding how fast one period goes. The extra factor $x^m$ at a repeated root is the "linearly growing envelope" caused by resonance.

In two dimensions this can be drawn as a "root plane": the left half-plane means decay, the right half-plane growth, the imaginary axis constant-amplitude oscillation. This picture reappears in the systems of Chapter 5 and the stability theory of Chapter 7, with "roots" replaced by "eigenvalues".

The form of the particular solution can be remembered thus: the particular solution looks like the forcing term, with $x^k$ added in exactly two situations—when the exponent/frequency of the forcing term hits a characteristic root. One hit, one factor of $x$; $k$ hits, $x^k$.

Right versus wrong:

- Wrong: because the characteristic roots are complex, write $Ce^{(\alpha+i\beta)x}$ as a real solution. Right: the solution of a real-coefficient equation must be real-valued; take a linear combination of the real and imaginary parts.
- Wrong: for a double root write only $e^{\lambda x}$. Right: write both $e^{\lambda x}$ and $xe^{\lambda x}$.
- Wrong: because the forcing term is $e^{2x}$, guess the particular solution as $Ae^{2x}$. Right: first check whether $2$ is a characteristic root; if so, multiply by $x$ (or $x^k$).

## V. Worked Examples

### Example 1 (Basic: homogeneous constant coefficients + initial values)

Problem: find the solution of $y''-5y'+6y=0$ with $y(0)=1,\ y'(0)=0$.

Analysis: constant-coefficient homogeneous; write the characteristic equation first.

Solution: the characteristic equation

$$\lambda^2-5\lambda+6=0\quad\Longrightarrow\quad(\lambda-2)(\lambda-3)=0$$

two distinct real roots $\lambda_1=2,\ \lambda_2=3$, so the general solution is

$$y=C_1e^{2x}+C_2e^{3x}$$

substituting the initial values:

$$y(0)=C_1+C_2=1,\qquad y'(0)=2C_1+3C_2=0$$

subtracting twice the first from the second gives $C_2=-2$, hence $C_1=3$. So

$$y=3e^{2x}-2e^{3x}$$

Check: $y(0)=3-2=1$; $y'=6e^{2x}-6e^{3x}$, $y'(0)=0$; and $y''=12e^{2x}-18e^{3x}$, substituting into $y''-5y'+6y$ gives $(12-30+18)e^{2x}+(-18+30-12)e^{3x}=0$, correct.

> Comment: two initial conditions fix exactly two constants, in perfect correspondence with "the solution space of a second-order equation is two-dimensional". Given only $y(0)$, one obtains a family with one free parameter.

### Example 2 (Intermediate: resonance and undetermined coefficients)

Problem: find the solution of $y''+y=\cos x$ with $y(0)=0,\ y'(0)=0$.

Analysis: the homogeneous characteristic roots are $\lambda=\pm i$; the forcing term $\cos x$ corresponds to $\alpha+i\beta=i$, exactly a simple characteristic root, so $k=1$ and the particular solution must be multiplied by $x$.

Solution: the homogeneous general solution

$$y_h=C_1\cos x+C_2\sin x$$

guess $y^*=x(A\cos x+B\sin x)$. Differentiating:

$$y^{*'}=A\cos x+B\sin x+x(-A\sin x+B\cos x)$$

$$y^{*''}=-2A\sin x+2B\cos x+x(-A\cos x-B\sin x)$$

hence

$$y^{*''}+y^*=-2A\sin x+2B\cos x$$

(the terms containing $x$ cancel exactly—the algebraic signature of resonance). Setting this equal to $\cos x$:

$$-2A=0,\qquad 2B=1\quad\Longrightarrow\quad A=0,\ B=\frac{1}{2}$$

so $y^*=\dfrac{x}{2}\sin x$ and the general solution is

$$y=C_1\cos x+C_2\sin x+\frac{x}{2}\sin x$$

Substituting $y(0)=0$ gives $C_1=0$. Differentiating again:

$$y'=C_2\cos x+\frac{1}{2}\sin x+\frac{x}{2}\cos x$$

from $y'(0)=0$ we get $C_2=0$. Finally

$$y=\frac{x}{2}\sin x$$

Check: $y'=\frac12\sin x+\frac{x}{2}\cos x$, $y''=\cos x-\frac{x}{2}\sin x$, so $y''+y=\cos x$ and both initial values vanish; correct.

> Comment: the amplitude $x/2$ grows linearly in time—the resonance of an undamped forced oscillation. If the forcing frequency differs from the natural frequency, the particular solution has no $x$ factor and the amplitude stays bounded. The only basis for deciding "multiply by $x$ or not" is whether the forcing frequency is a characteristic root, not whether resonance "looks likely".

### Example 3 (Intermediate: Euler equation)

Problem: solve $x^2y''-2xy'+2y=x^3\ (x>0)$.

Analysis: in each term the power of $x$ equals the order of the derivative—an Euler equation. Set $x=e^t$ (i.e. $t=\ln x$) to absorb the powers of $x$ into derivatives with respect to $t$.

Solution: write $D=\dfrac{d}{dt}$. By the chain rule,

$$xy'=Dy,\qquad x^2y''=D(D-1)y$$

substituting into the equation:

$$\big[D(D-1)-2D+2\big]y=e^{3t}$$

i.e.

$$(D^2-3D+2)y=e^{3t}$$

the characteristic equation $r^2-3r+2=(r-1)(r-2)=0$ gives the homogeneous solution

$$y_h=C_1e^{t}+C_2e^{2t}=C_1x+C_2x^2$$

The forcing term $e^{3t}$ corresponds to $r=3$, not a characteristic root, so guess $y_p=Ae^{3t}$. Substituting:

$$(9-9+2)Ae^{3t}=2Ae^{3t}=e^{3t}\quad\Longrightarrow\quad A=\frac{1}{2}$$

so $y_p=\dfrac12e^{3t}=\dfrac12x^3$ and the general solution is

$$y=C_1x+C_2x^2+\frac{x^3}{2}$$

Check: $y'=C_1+2C_2x+\frac32x^2$, $y''=2C_2+3x$. Then

$$x^2y''-2xy'+2y=(2C_2x^2+3x^3)-(2C_1x+4C_2x^2+3x^3)+(2C_1x+2C_2x^2+x^3)=x^3$$

correct.

> Comment: the essence of the Euler equation is to turn "variable coefficients" into "constant coefficients" via $x=e^t$. The substitution formulas must be memorized completely: $xy'=Dy$, $x^2y''=D(D-1)y$, $x^3y'''=D(D-1)(D-2)y$. Converting only $x^2y''$ and forgetting $xy'$ is a common error.

### Example 4 (Advanced: variation of parameters)

Problem: find one particular solution of $y''+y=\tan x$ (on an interval where $\cos x\ne 0$).

Analysis: the forcing term $\tan x$ is not of the form "exponential times polynomial times sine/cosine", so undetermined coefficients fails; use variation of parameters. Take the homogeneous fundamental set $y_1=\cos x,\ y_2=\sin x$.

Solution: the Wronskian

$$W=y_1y_2'-y_1'y_2=\cos x\cos x-(-\sin x)\sin x=1$$

By the variation-of-parameters formulas

$$u_1'=-\frac{y_2f}{W}=-\sin x\tan x=-\frac{\sin^2x}{\cos x},\qquad u_2'=\frac{y_1f}{W}=\cos x\tan x=\sin x$$

First $u_1$. Using $\sin^2x=1-\cos^2x$:

$$u_1'=-\frac{1-\cos^2x}{\cos x}=-\sec x+\cos x$$

integrating,

$$u_1=-\ln|\sec x+\tan x|+\sin x$$

(since $\int\sec x\,dx=\ln|\sec x+\tan x|$ and $\int\cos x\,dx=\sin x$). Then

$$u_2=\int\sin x\,dx=-\cos x$$

so

$$y^*=u_1y_1+u_2y_2=\big(-\ln|\sec x+\tan x|+\sin x\big)\cos x+(-\cos x)\sin x$$

the two $\sin x\cos x$ terms cancel, giving

$$y^*=-\cos x\,\ln|\sec x+\tan x|$$

and the general solution

$$y=C_1\cos x+C_2\sin x-\cos x\ln|\sec x+\tan x|$$

Check: with $y^*=-\cos x\ln|\sec x+\tan x|$,

$$y^{*'}=\sin x\ln|\sec x+\tan x|-\cos x\cdot\sec x=\sin x\ln|\sec x+\tan x|-1$$

(because $(\ln|\sec x+\tan x|)'=\sec x$). Differentiating again:

$$y^{*''}=\cos x\ln|\sec x+\tan x|+\sin x\sec x=\cos x\ln|\sec x+\tan x|+\tan x$$

so $y^{*''}+y^*=\tan x$, correct.

> Comment: the two equations of variation of parameters come from "forcing $u_1'y_1+u_2'y_2=0$", so that differentiating produces no $u_i''$. After solving for $u_i'$ one must integrate, and the integration constants may be taken as zero—we need only one particular solution. The final check cannot be skipped, because the integral of $\tan x$ easily produces sign errors.

## VI. Common Errors and Pitfalls

1. **Applying the Wronskian test to arbitrary functions**: wrong—computing $W=0$ and declaring linear dependence. Why wrong—$W=0$ is equivalent to dependence only under "solutions of the same linear equation"; $x^2$ and $x|x|$ is a counterexample. Right—first confirm they solve the same homogeneous equation, then use Liouville's formula.
2. **Missing solutions at a repeated root**: wrong—writing only $e^{\lambda x}$ for a double root. Why wrong—that gives only one solution, not enough dimensions, so the general solution is incomplete. Right—write $e^{\lambda x},xe^{\lambda x},\dots,x^{k-1}e^{\lambda x}$, $k$ functions in all.
3. **Wrong choice of $k$ in undetermined coefficients**: wrong—taking $k$ as the degree of the forcing polynomial, or always $0$. Why wrong—$k$ is the multiplicity of $\alpha+i\beta$ as a characteristic root and decides resonance. Right—compute the characteristic roots first, then compare with the exponent and frequency of the forcing term.
4. **Treating complex roots as real solutions**: wrong—writing $y=Ce^{(\alpha+i\beta)x}$ and claiming it is real-valued. Why wrong—unless $C$ is complex and paired with its conjugate, the function is complex. Right—take real and imaginary parts, writing $e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$.
5. **Incomplete substitution for the Euler equation**: wrong—converting $x^2y''$ to $D(D-1)y$ but leaving $xy'$ unchanged. Why wrong—after the substitution the independent variable is $t$, and all powers of $x$ must be absorbed. Right—apply $x^ky^{(k)}=D(D-1)\cdots(D-k+1)y$ term by term.
6. **Omitting the homogeneous part**: wrong—submitting only a particular solution. Why wrong—the general solution of a non-homogeneous equation is "homogeneous general solution + one particular solution"; the particular solution is just one point. Right—find $y_h$, add $y^*$, then fix constants by the initial values.
7. **Sign error in variation of parameters**: wrong—writing $u_1'=+y_2f/W$. Why wrong—the coefficient matrix of the two equations has determinant $W$, and Cramer's rule gives $u_1$ a negative numerator. Right—$u_1'=-y_2f/W,\ u_2'=y_1f/W$.

## VII. Summary and Mnemonic

Key points:

- The solution space of an $n$-th order linear homogeneous equation is $n$-dimensional; the general solution is a linear combination of a fundamental set.
- A fundamental set is characterized by $W\ne 0$; for solutions of the same equation, $W$ is either identically zero or nowhere zero (Liouville's formula).
- Constant coefficients: write the characteristic equation; the type of root decides the form of solution; repeated roots multiply by $x^m$, complex roots pair into sine and cosine.
- Non-homogeneous: general solution = homogeneous general solution + one particular solution; undetermined coefficients checks "whether the forcing frequency is a characteristic root", variation of parameters works for a general forcing term.
- For the Euler equation set $x=e^t$ and use $x^ky^{(k)}=D(D-1)\cdots(D-k+1)y$ to reach constant coefficients.

**Mnemonic: the characteristic equation fixes the root type; repeated roots multiply by powers, complex roots pair into sines; undetermined coefficients watch the multiplicity, variation of parameters integrates for the particular solution.**`,
    keyPoints: [
      'Homogeneous general solution needs Wronskian ≠ 0; non-homogeneous general solution = homogeneous general solution + particular solution',
      'Characteristic roots set the solution: repeated roots multiply by powers, complex roots pair into sine and cosine',
      'Undetermined coefficients: k = multiplicity of λ±iβ as a characteristic root',
      'Euler equation: substitute x = e^t to reach constant coefficients',
    ],
    relatedProblemIds: ['p-ode-2'],
  },

  'ode-systems': {
    chapter: 'Chapter 3 Systems of Equations and Stability',
    title: 'Systems of Differential Equations and an Introduction to Stability',
    summary:
      'Rewrite higher-order equations as first-order systems and describe the motion qualitatively with phase portraits—without solving, you can still know where the system is going.',
    content: String.raw`

In a second-order equation $y''+3y'+2y=0$, the future evolution is decided by two numbers: the current position $y$ and the current velocity $y'$. Once these two are fixed, everything afterwards is fixed. That being so, why not pack "position" and "velocity" into a vector, and let the equation speak about that vector only once?

This is the state-space viewpoint: rewrite an $n$-th order scalar equation as a first-order vector equation

$$\vec{x}'=\vec{F}(t,\vec{x}),\qquad \vec{x}\in\mathbb{R}^n$$

The dimension rises, but every equation contains only first derivatives, the form is uniform, and linear algebra comes into play at once. Better still, when the right side does not depend explicitly on $t$, we can "flatten" time and look only at how the state moves in space—this is the phase portrait. Many systems have no analytic solution, yet the phase portrait tells us where they end up and whether they are stable.

This lecture answers two questions: why can a higher-order equation always be converted into a first-order system? And, without solving, on what grounds do eigenvalues decide the stability of an equilibrium?

## II. Rigorous Definitions

The standard form of a **first-order system of differential equations** is

$$\begin{cases}
x_1'=f_1(t,x_1,\dots,x_n)\\
\ \vdots\\
x_n'=f_n(t,x_1,\dots,x_n)
\end{cases}$$

in vector form $\vec{x}'=\vec{F}(t,\vec{x})$, where $\vec{x}=(x_1,\dots,x_n)^{\mathsf T}$ and $\vec{F}=(f_1,\dots,f_n)^{\mathsf T}$.

**Autonomous system**: the right side does not depend explicitly on $t$, i.e. $\vec{x}'=\vec{F}(\vec{x})$. Autonomous means "the rule does not change with time", the prerequisite for drawing a phase portrait.

**Linear system**:

$$\vec{x}'=A(t)\vec{x}+\vec{f}(t)$$

with $A(t)$ an $n\times n$ matrix. If $A$ is constant and $\vec{f}\equiv\vec{0}$, it is a **constant-coefficient homogeneous linear system** $\vec{x}'=A\vec{x}$.

**Matrix exponential**:

$$e^{At}=\sum_{k=0}^{\infty}\frac{t^kA^k}{k!}=I+tA+\frac{t^2}{2!}A^2+\cdots$$

For any constant matrix $A$, this series converges absolutely for all $t$.

**Fundamental matrix**: if every column of the $n\times n$ matrix $\Phi(t)$ is a solution of the homogeneous system and $\det\Phi(t_0)\ne 0$, then $\Phi$ is a fundamental matrix. The general solution is then $\vec{x}(t)=\Phi(t)\vec{c}$ with $\vec{c}$ an arbitrary constant vector. In particular $\Phi(t)=e^{At}$ is the fundamental matrix with $\Phi(0)=I$.

**Equilibrium**: a point satisfying $\vec{F}(\vec{x}^*)=0$. A system at this point never moves.

**Stability (in the sense of Lyapunov)**: the equilibrium $\vec{x}^*$ is stable if for every $\varepsilon>0$ there is $\delta>0$ such that $\|\vec{x}(0)-\vec{x}^*\|<\delta$ implies, for all $t\ge 0$,

$$\|\vec{x}(t)-\vec{x}^*\|<\varepsilon$$

**Asymptotic stability**: stability plus the requirement that $\lim_{t\to\infty}\vec{x}(t)=\vec{x}^*$.

**Linearization**: suppose $\vec{F}$ is continuously differentiable; the Jacobian at the equilibrium is

$$J=D\vec{F}(\vec{x}^*)=\begin{pmatrix}
\dfrac{\partial f_1}{\partial x_1} & \cdots & \dfrac{\partial f_1}{\partial x_n}\\
\vdots & & \vdots\\
\dfrac{\partial f_n}{\partial x_1} & \cdots & \dfrac{\partial f_n}{\partial x_n}
\end{pmatrix}_{\vec{x}=\vec{x}^*}$$

Setting $\vec{\xi}=\vec{x}-\vec{x}^*$ gives $\vec{\xi}'=J\vec{\xi}+o(\|\vec{\xi}\|)$; dropping higher-order terms gives the linearized system $\vec{\xi}'=J\vec{\xi}$.

## III. Why Defined This Way

**Why can an equation of order $n$ always be converted into a first-order system?** Set

$$x_1=y,\quad x_2=y',\quad \dots,\quad x_n=y^{(n-1)}$$

then the first $n-1$ equations are mere "definitions":

$$x_1'=x_2,\quad x_2'=x_3,\quad \dots,\quad x_{n-1}'=x_n$$

and the last equation solves the original for the highest derivative:

$$x_n'=y^{(n)}=F\big(t,y,y',\dots,y^{(n-1)}\big)=F(t,x_1,\dots,x_n)$$

so we obtain an $n$-dimensional first-order system. No information is lost: conversely, the solution for $x_1$ recovers $y=x_1$, and the other components are just its derivatives. The two writings are equivalent.

**Why is the solution $e^{At}\vec{x}_0$?** Differentiate term by term:

$$\frac{d}{dt}e^{At}=\frac{d}{dt}\sum_{k=0}^{\infty}\frac{t^kA^k}{k!}=\sum_{k=1}^{\infty}\frac{t^{k-1}A^k}{(k-1)!}=A\sum_{j=0}^{\infty}\frac{t^jA^j}{j!}=Ae^{At}$$

here $A$ commutes with $e^{At}$, because $e^{At}$ is a power series in $A$. Hence

$$\frac{d}{dt}\big(e^{At}\vec{x}_0\big)=Ae^{At}\vec{x}_0=A\big(e^{At}\vec{x}_0\big)$$

satisfies the equation; and $e^{A\cdot 0}=I$, so the initial value is right. By uniqueness this is the unique solution.

**Why does diagonalization decouple the system?** If $A=P\Lambda P^{-1}$ with $\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$, set $\vec{y}=P^{-1}\vec{x}$; then

$$\vec{y}'=P^{-1}\vec{x}'=P^{-1}AP\vec{y}=\Lambda\vec{y}$$

in components $y_i'=\lambda_i y_i$, each independent, with solution $y_i=C_ie^{\lambda_i t}$. Back in the original coordinates:

$$\vec{x}=P\vec{y}=\sum_{i=1}^{n}C_ie^{\lambda_i t}\vec{p}_i$$

where $\vec{p}_i$ is the $i$-th column of $P$, the eigenvector for $\lambda_i$. This is the origin of "fundamental solutions = eigenvalue exponential times eigenvector".

**What if it cannot be diagonalized?** Use the Jordan normal form. Take a defective $2\times 2$ matrix, $A=\lambda I+N$ with $N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ satisfying $N^2=0$. Since $\lambda I$ and $N$ commute,

$$e^{At}=e^{\lambda t}e^{Nt}=e^{\lambda t}\left(I+tN+\frac{t^2}{2}N^2+\cdots\right)=e^{\lambda t}(I+tN)$$

the extra $tN$ term is the "polynomial times exponential" contributed by the generalized eigenvector. This derivation also explains why $e^{A+B}=e^Ae^B$ generally fails: if $A,B$ do not commute, the expansion of $e^{A+B}$ contains cross terms that cannot be split.

**Why do eigenvalues decide the stability of a linear system?** If $A$ is diagonalizable, the solution is a linear combination of $e^{\lambda_i t}\vec{p}_i$:

- all $\operatorname{Re}\lambda_i<0$: every mode decays exponentially, solutions tend to zero, asymptotically stable;
- some $\operatorname{Re}\lambda_i>0$: the corresponding mode grows exponentially, solutions unbounded, unstable;
- all $\operatorname{Re}\lambda_i\le 0$ with the purely imaginary eigenvalues simple (or semisimple): solutions bounded, stable but generally not asymptotically.

**What about nonlinear systems?** Use linearization (Lyapunov's indirect method): if all eigenvalues of $J$ have negative real part, the equilibrium is asymptotically stable; if some eigenvalue has positive real part, unstable; if the largest real part is exactly zero, linearization fails and higher-order terms must be examined. This last clause cannot be dropped: $\dot x=x^3$ linearizes at the origin to $\dot\xi=0$, eigenvalue zero, linearization gives no information, yet the original system is unstable (positive initial values diverge, and so do negative ones); while $\dot x=-x^3$ also linearizes to zero but is asymptotically stable. So with zero real part one cannot conclude.

## IV. Intuition and Pictures

The phase portrait of a two-dimensional linear system $\vec{x}'=A\vec{x}$ is decided by the eigenvalues:

| Eigenvalues | Type of equilibrium | Stability |
|---|---|---|
| real roots of opposite sign | saddle | unstable |
| real roots of the same sign, negative | stable node | asymptotically stable |
| real roots of the same sign, positive | unstable node | unstable |
| repeated root (defective) | degenerate node | stable or unstable |
| purely imaginary roots | centre | stable but not asymptotically |
| complex conjugate roots with negative real part | stable focus | asymptotically stable |
| complex conjugate roots with positive real part | unstable focus | unstable |

> Intuition: think of the state $(x,y)$ as the pose of a small ball on a tabletop. A stable node is like the bottom of a bowl, all directions pull inward; an unstable node is like a hilltop, all directions push outward; a saddle is like a horse's saddle, one direction in and the other out; a centre is like a frictionless circular orbit, going round forever; a focus is like a vortex, spiralling in or out. A phase portrait ignores how fast time runs and draws only the shapes of trajectories—hence "qualitative" analysis.

For nonlinear systems, first draw the phase portrait of the linearization near the equilibrium, then treat the higher-order terms as a "slight distortion". As long as the equilibrium is hyperbolic (no eigenvalue with zero real part), the distortion does not change the type—this is the content of the Hartman–Grobman theorem.

Right versus wrong:

- Wrong: seeing an equilibrium and assuming it is stable. Right: compute the Jacobian eigenvalues.
- Wrong: a centre is asymptotically stable. Right: a centre is only stable; its trajectories are closed curves that do not approach the origin.
- Wrong: a saddle "is stable in one direction" so it counts as stable. Right: stability requires all initial conditions to stay nearby; a saddle escapes along the unstable direction.

**Lyapunov's direct method** (only a preview here, detailed in Chapter 7): if one can find a positive definite function $V(\vec{x})$ whose derivative along trajectories $\dot V=\nabla V\cdot\vec{F}\le 0$, the equilibrium is stable; if $\dot V$ is negative definite, asymptotically stable. It requires no solution of the equation and suits nonlinear systems especially well.

## V. Worked Examples

### Example 1 (Basic: reducing the order and solving)

Problem: write $y''+3y'+2y=0$ as a first-order system and find the solution with $y(0)=1,\ y'(0)=0$.

Analysis: set $x_1=y,\ x_2=y'$; then $x_1'=x_2$ and $x_2'=y''=-2y-3y'=-2x_1-3x_2$.

Solution: the system is

$$\vec{x}'=\begin{pmatrix}0&1\\-2&-3\end{pmatrix}\vec{x},\qquad \vec{x}(0)=\begin{pmatrix}1\\0\end{pmatrix}$$

The characteristic polynomial of $A=\begin{pmatrix}0&1\\-2&-3\end{pmatrix}$ is

$$\det(A-\lambda I)=\begin{vmatrix}-\lambda&1\\-2&-3-\lambda\end{vmatrix}=\lambda^2+3\lambda+2=(\lambda+1)(\lambda+2)$$

with eigenvalues $\lambda_1=-1,\ \lambda_2=-2$.

- For $\lambda_1=-1$: $(A+I)\vec{v}=0$, i.e. $\begin{pmatrix}1&1\\-2&-2\end{pmatrix}\vec{v}=0$; take $\vec{v}_1=(1,-1)^{\mathsf T}$.
- For $\lambda_2=-2$: $(A+2I)\vec{v}=0$, i.e. $\begin{pmatrix}2&1\\-2&-1\end{pmatrix}\vec{v}=0$; take $\vec{v}_2=(1,-2)^{\mathsf T}$.

The general solution is

$$\vec{x}(t)=C_1e^{-t}\begin{pmatrix}1\\-1\end{pmatrix}+C_2e^{-2t}\begin{pmatrix}1\\-2\end{pmatrix}$$

Substituting the initial values:

$$C_1+C_2=1,\qquad -C_1-2C_2=0$$

from the second $C_1=-2C_2$; substituting into the first gives $-C_2=1$, so $C_1=2,\ C_2=-1$. Hence

$$\vec{x}(t)=2e^{-t}\begin{pmatrix}1\\-1\end{pmatrix}-e^{-2t}\begin{pmatrix}1\\-2\end{pmatrix}=\begin{pmatrix}2e^{-t}-e^{-2t}\\-2e^{-t}+2e^{-2t}\end{pmatrix}$$

The first component is $y(t)=2e^{-t}-e^{-2t}$. Check: $y(0)=1$, $y'=-2e^{-t}+2e^{-2t}$, $y'(0)=0$, and $y''+3y'+2y=0$.

> Comment: one could also solve the second-order equation directly and obtain the same $y$. The value of converting to a system is that it turns "solving a second-order equation" into "finding matrix eigenvalues", and this language transfers verbatim to $n$ dimensions.

### Example 2 (Intermediate: defective matrix and matrix exponential)

Problem: find the matrix exponential $e^{At}$ for $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$, then solve $\vec{x}'=A\vec{x},\ \vec{x}(0)=(1,2)^{\mathsf T}$.

Analysis: $A=I+N$ with $N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $N^2=0$, and $I$ commutes with $N$.

Solution: since $I$ and $N$ commute,

$$e^{At}=e^{(I+N)t}=e^{t}e^{Nt}=e^{t}\left(I+tN+\frac{t^2}{2}N^2+\cdots\right)$$

with $N^2=0$ the series truncates after the second term:

$$e^{At}=e^{t}(I+tN)=e^{t}\begin{pmatrix}1&t\\0&1\end{pmatrix}$$

so

$$\vec{x}(t)=e^{At}\vec{x}(0)=e^{t}\begin{pmatrix}1&t\\0&1\end{pmatrix}\begin{pmatrix}1\\2\end{pmatrix}=e^{t}\begin{pmatrix}1+2t\\2\end{pmatrix}$$

Check: $\vec{x}'=e^{t}\begin{pmatrix}1+2t+2\\2\end{pmatrix}=e^{t}\begin{pmatrix}3+2t\\2\end{pmatrix}$, and $A\vec{x}=e^{t}\begin{pmatrix}(1+2t)+2\\2\end{pmatrix}=e^{t}\begin{pmatrix}3+2t\\2\end{pmatrix}$, consistent.

> Comment: $A$ has only one eigenvalue, $1$, but its geometric multiplicity is $1$ ($\ker(A-I)$ is one-dimensional), so it cannot be diagonalized. Writing $e^{At}=P\operatorname{diag}(e^t,e^t)P^{-1}=e^tI$ would drop the $t$ term and give a wrong solution. A defective matrix must go through the $I+N$ decomposition or Jordan blocks.

### Example 3 (Advanced: linearized classification of a nonlinear system)

Problem: discuss the equilibria of the damped pendulum $\theta''+\dfrac12\theta'+\sin\theta=0$ and their types.

Analysis: set $x=\theta,\ y=\theta'$, giving the autonomous system

$$x'=y,\qquad y'=-\sin x-\frac12y$$

equilibria satisfy $y=0$ and $\sin x=0$, i.e. $(k\pi,0)$, $k\in\mathbb{Z}$.

Solution: the Jacobian

$$J(x,y)=\begin{pmatrix}0&1\\-\cos x&-\frac12\end{pmatrix}$$

**At $(0,0)$**: $\cos 0=1$,

$$J=\begin{pmatrix}0&1\\-1&-\frac12\end{pmatrix}$$

characteristic equation $\lambda^2+\frac12\lambda+1=0$, discriminant $\frac14-4=-\frac{15}{4}<0$, so

$$\lambda=-\frac14\pm i\frac{\sqrt{15}}{4}$$

the real part is negative: a stable focus. Physically, the pendulum swings back and forth at small angles with decaying amplitude, eventually stopping at the lowest point.

**At $(\pi,0)$**: $\cos\pi=-1$,

$$J=\begin{pmatrix}0&1\\1&-\frac12\end{pmatrix}$$

characteristic equation $\lambda^2+\frac12\lambda-1=0$, discriminant $\frac14+4=\frac{17}{4}>0$, roots

$$\lambda=\frac{-\frac12\pm\frac{\sqrt{17}}{2}}{2}=\frac{-1\pm\sqrt{17}}{4}$$

one positive and one negative ($\frac{-1+\sqrt{17}}{4}\approx0.781>0$, $\frac{-1-\sqrt{17}}{4}\approx-1.281<0$), so $(\pi,0)$ is a saddle. Physically it is the inverted pendulum: a slight deviation and it falls.

Since both equilibria are hyperbolic (no eigenvalue with zero real part), the types given by linearization are reliable.

> Comment: the trap is that "there are infinitely many equilibria". Many people compute only $(0,0)$ and stop. The right procedure is to solve $\sin x=0$ to find all equilibria, then linearize each. Also, $\cos\pi=-1$ at $(\pi,0)$ brings a positive eigenvalue, the hallmark of a saddle; using $\cos\pi=1$ by mistake gives a stable focus.

## VI. Common Errors and Pitfalls

1. **Misusing $e^{A+B}=e^Ae^B$**: wrong—splitting a matrix exponential like a scalar one. Why wrong—$e^{A+B}=e^Ae^B$ holds only when $A,B$ commute, which general matrices do not. Right—use diagonalization, Jordan decomposition or the series definition.
2. **Diagonalizing a defective matrix directly**: wrong—writing $n$ solutions $e^{\lambda t}\vec{v}$ on seeing a repeated eigenvalue. Why wrong—there may be fewer than $n$ eigenvectors, so a fundamental set cannot be assembled. Right—compute $\dim\ker(A-\lambda I)$; if insufficient, introduce generalized eigenvectors, and $t^ke^{\lambda t}$ appears in the solution.
3. **Confusing stable with asymptotically stable**: wrong—saying a centre "returns to the origin". Why wrong—a centre is only bounded, it does not converge. Right—asymptotic stability requires $\lim\vec{x}(t)=\vec{x}^*$.
4. **Using linearization beyond its range**: wrong—concluding stable/unstable when the Jacobian has zero real parts or purely imaginary eigenvalues. Why wrong—higher-order terms can change the qualitative behaviour. Right—use Lyapunov functions, centre manifolds, or a direct analysis.
5. **Confusing the order of variables when reducing**: wrong—setting $x_1=y'$, $x_2=y$ but still using $x_1'=x_2$. Why wrong—the derivative relations no longer match the variable definitions. Right—fix $x_k=y^{(k-1)}$, then $x_k'=x_{k+1}$.
6. **Substituting initial values in the wrong place**: wrong—taking $\vec{x}(0)$ directly as the coefficient vector in the general solution. Why wrong—the coefficients equal the initial values only when the fundamental matrix is the identity at $0$. Right—solve $\Phi(0)\vec{c}=\vec{x}(0)$.

## VII. Summary and Mnemonic

Key points:

- An $n$-th order equation is equivalent to an $n$-dimensional first-order system; take the state as $y,y',\dots,y^{(n-1)}$.
- Constant-coefficient homogeneous system: $\vec{x}=e^{At}\vec{x}_0$; when diagonalizable, the fundamental solutions are $e^{\lambda_it}\vec{v}_i$.
- For a defective matrix write $A=\lambda I+N$, $e^{At}=e^{\lambda t}(I+tN+\cdots)$, and the solution contains $t^ke^{\lambda t}$.
- Classify equilibria by the Jacobian eigenvalues: saddle, node, focus, centre.
- Linearization is reliable only when hyperbolic (no zero real parts); otherwise nonlinear analysis is needed.
- Stable means "does not run away"; asymptotically stable means "and comes back".

**Mnemonic: reduce the order, solve the homogeneous system by the matrix exponential; eigenvalues draw the phase portrait, and beware of zero real parts.**`,
    keyPoints: [
      'Higher-order equation → first-order system: the first step of standardization',
      'Constant-coefficient systems are solved with the matrix exponential e^{xA}',
      'Qualitative phase-portrait analysis: equilibria + linearization (Jacobian eigenvalues)',
      'Lyapunov functions: judge stability without solving',
    ],
    relatedProblemIds: ['p-ode-3'],
  },

  'existence-uniqueness': {
    chapter: 'Chapter 3 Existence and Uniqueness of Solutions',
    title: 'The Picard Existence Theorem and Uniqueness',
    summary:
      'Not every differential equation has an explicit solution. Picard iteration tells us: as long as the right side is continuous and Lipschitz in y, the initial value problem has a unique local solution. This is the foundation of the whole theoretical edifice.',
    content: String.raw`

In the previous chapters we were busy solving equations, but avoided a more fundamental question: given an arbitrary $y'=f(x,y)$, does it have a solution at all? And if so, is the solution through a given point unique?

Reality is not encouraging. The equation $y'=y^2,\ y(0)=1$ has the solution $y=\dfrac{1}{1-x}$, but it is meaningful only for $x<1$, blowing up to infinity as $x\to1^-$—a solution exists but does not live long. Worse, $y'=\sqrt{|y|},\ y(0)=0$: $y\equiv0$ is a solution, $y=\dfrac{x^2}{4}\ (x\ge0)$ is also a solution, and even piecewise functions that "wait a while and then start growing" are solutions. One initial value corresponds to infinitely many solutions, and uniqueness fails completely.

The Picard–Lindelöf theorem draws the safe boundary: as long as $f$ is continuous and Lipschitz in $y$, the initial value problem has a unique solution near $x_0$. It is the foundation of the whole theory—all later conclusions about "continuous dependence on initial data" and "continuation of solutions" grow from here.

## II. Rigorous Definitions

Consider the initial value problem (IVP)

$$y'=f(x,y),\qquad y(x_0)=y_0$$

**Rectangular region**: take $a>0,\ b>0$ and let

$$R=\{(x,y):\ |x-x_0|\le a,\ |y-y_0|\le b\}$$

**Lipschitz condition**: if there is a constant $L>0$ such that for any $(x,y_1),(x,y_2)$ in $R$,

$$|f(x,y_1)-f(x,y_2)|\le L|y_1-y_2|$$

then $f$ is Lipschitz in $y$ on $R$, and $L$ is the Lipschitz constant.

**Picard–Lindelöf theorem**: let $f(x,y)$ be continuous on the closed rectangle $R$ and Lipschitz in $y$, and let

$$M=\max_{(x,y)\in R}|f(x,y)|,\qquad h=\min\left(a,\ \frac{b}{M}\right)$$

then the initial value problem has a unique solution on $|x-x_0|\le h$.

**Picard iteration (successive approximation)**:

$$y_0(x)\equiv y_0,\qquad y_{n+1}(x)=y_0+\int_{x_0}^{x}f\big(s,y_n(s)\big)\,ds$$

**Peano existence theorem**: if only continuity of $f$ on $R$ is assumed (no Lipschitz), then the initial value problem has at least one solution on $|x-x_0|\le h$, but uniqueness is not guaranteed.

**Maximal interval of existence**: the union of all intervals to which the solution can be continued gives the maximal interval $(a,b)$. At the endpoints the solution either tends to infinity (blow-up) or approaches the boundary of the region.

**Grönwall's inequality**: if a nonnegative continuous function $u(x)$ satisfies

$$u(x)\le C+\int_{x_0}^{x}L\,u(s)\,ds\qquad(x\ge x_0)$$

with $C\ge0,\ L\ge0$, then

$$u(x)\le Ce^{L(x-x_0)}$$

It is the core tool for proving uniqueness and continuous dependence.

## III. Why Defined This Way

**Why convert the differential equation into an integral equation?** Integrate $y'=f(x,y)$ from $x_0$ to $x$ and insert the initial value:

$$y(x)=y_0+\int_{x_0}^{x}f\big(s,y(s)\big)\,ds$$

Conversely, if a continuous function $y$ satisfies this integral equation, then by the fundamental theorem of calculus $y$ is differentiable, $y'=f(x,y)$ and $y(x_0)=y_0$. So the two problems are equivalent. The advantage of the integral equation is that the right side defines a map $T$ on a function space, and solving becomes finding a fixed point $y=T(y)$; and the integral operator is "gentler" than the differential operator—it maps bounded functions to continuous or even differentiable ones.

**Why does the Lipschitz condition guarantee convergence of the iteration?** On the interval $I=[x_0-h,x_0+h]$ consider the space of continuous functions $C(I)$ with the max norm $\|y\|=\max_I|y|$. For $y,z\in C(I)$,

$$|(Ty)(x)-(Tz)(x)|\le\int_{x_0}^{x}|f(s,y(s))-f(s,z(s))|\,ds\le L|x-x_0|\,\|y-z\|\le Lh\|y-z\|$$

hence

$$\|Ty-Tz\|\le Lh\,\|y-z\|$$

as long as $Lh<1$, $T$ is a contraction. By the Banach fixed-point theorem, $T$ has a unique fixed point in $C(I)$, and the iteration converges to it from any starting point. The role of $h=\min(a,b/M)$ in the theorem is exactly to keep the iteration inside the rectangle (so that $M$ is valid) while shortening the interval enough to make $Lh<1$—if originally $Lh\ge1$, take a smaller $h$.

**Why does uniqueness need Lipschitz?** Let $y,z$ be two solutions with the same initial value and set $u=|y-z|$. Then

$$u(x)\le\int_{x_0}^{x}L\,u(s)\,ds$$

by Grönwall's inequality (with $C=0$), $u\equiv0$, so $y=z$. The whole argument uses only "the difference is controlled by $L$ times the difference". Without Lipschitz, the difference might be controlled by a factor blowing up near the origin, Grönwall fails, and uniqueness can collapse.

**Why is continuity not enough?** Continuity only guarantees that $|f(x,y_1)-f(x,y_2)|$ is small when $y_1,y_2$ are close, but gives no uniform "linear rate". Near $y=0$, the difference quotient of $f(y)=\sqrt{|y|}$,

$$\frac{|\sqrt{|y_1|}-\sqrt{|y_2|}|}{|y_1-y_2|}=\frac{1}{\sqrt{|y_1|}+\sqrt{|y_2|}}$$

tends to infinity as $y_1,y_2\to0$, and no finite $L$ can control it. It is this "infinitely steep" slope that lets a solution linger at the origin for an arbitrary time before leaving, creating infinitely many solutions.

**A practical criterion**: if $f$ and $\dfrac{\partial f}{\partial y}$ are both continuous on $R$, then by the mean value theorem

$$f(x,y_1)-f(x,y_2)=\frac{\partial f}{\partial y}(x,\xi)(y_1-y_2)$$

the partial derivative is continuous on a closed rectangle and hence bounded; take $L=\max_R\left|\dfrac{\partial f}{\partial y}\right|$. This is the most common way to verify Lipschitz, but note that the rectangle must avoid points where the partial derivative blows up.

**Error estimate**: from the contraction property one can prove

$$|y_n(x)-y(x)|\le\frac{M L^n|x-x_0|^{n+1}}{(n+1)!}$$

the right side tends to zero rapidly with $n$, so Picard iteration not only proves existence but also actually approximates, with an error bound.

## IV. Intuition and Pictures

Think of solving as "polishing a curve" in function space. The map $T$ turns one candidate curve into another: use the curve to compute the slope $f(s,y_n(s))$, then integrate to a new height. The Lipschitz condition guarantees that $T$ pulls two nearby curves closer together, with contraction ratio $Lh$. As long as the ratio is below $1$, repeated polishing draws the curve to the unique fixed point.

> Intuition: imagine a tube of width $2b$ whose slope never exceeds $M$ in absolute value. An integral curve starting from $(x_0,y_0)$ can rise at most $Mh$ over a horizontal distance $h$. Choosing $h\le b/M$ keeps the curve inside the tube. That is where the $h$ of the theorem comes from: it guarantees both "not leaving the rectangle" and "contraction".

Comparison of several typical cases:

| Equation | Nature of the right side | Existence | Uniqueness |
|---|---|---|---|
| $y'=x+y$ | globally continuous, bounded partial | global | unique |
| $y'=y^2$ | locally Lipschitz | local | unique, but blows up |
| $y'=\sqrt{\lvert y\rvert}$ | continuous, not Lipschitz at the origin | local | not unique |
| $y'=\begin{cases}0,&y<0\\1,&y\ge0\end{cases}$ | discontinuous | possibly none | none |

The last row shows that continuity is not decoration. When the right side jumps, the solution curve may be unable to satisfy the slope requirements on both sides near the jump surface.

Right versus wrong:

- Wrong: if $f$ is continuous there is a unique solution. Right: continuity gives only existence (Peano); uniqueness needs Lipschitz.
- Wrong: Lipschitz is weaker than continuity. Right: Lipschitz implies continuity, not conversely; Lipschitz is the stronger condition.
- Wrong: the solution given by the theorem is global. Right: only a local solution on $|x-x_0|\le h$, continuable up to blow-up or the boundary.

## V. Worked Examples

### Example 1 (Basic: verifying the conditions and computing Picard iterates)

Problem: for $y'=x+y,\ y(0)=0$ on the rectangle $|x|\le1,\ |y|\le1$, verify the Picard theorem, write $h$, and compute $y_1,y_2,y_3$.

Analysis: $f(x,y)=x+y$ is continuous on the whole plane, $\partial f/\partial y=1$ is bounded, so $L=1$.

Solution: on the rectangle

$$M=\max_{|x|\le1,|y|\le1}|x+y|=2$$

hence

$$h=\min\left(1,\frac{1}{2}\right)=\frac{1}{2}$$

the theorem guarantees a unique solution on $|x|\le\frac12$. Take $y_0(x)\equiv0$ and iterate:

$$y_1(x)=\int_0^x(s+0)\,ds=\frac{x^2}{2}$$

$$y_2(x)=\int_0^x\left(s+\frac{s^2}{2}\right)ds=\frac{x^2}{2}+\frac{x^3}{6}$$

$$y_3(x)=\int_0^x\left(s+\frac{s^2}{2}+\frac{s^3}{6}\right)ds=\frac{x^2}{2}+\frac{x^3}{6}+\frac{x^4}{24}$$

the pattern is visible: $y_n(x)=\sum_{k=2}^{n+1}\dfrac{x^k}{k!}$. As $n\to\infty$,

$$y(x)=\sum_{k=2}^{\infty}\frac{x^k}{k!}=e^x-1-x$$

Check: $y'=e^x-1$, while $x+y=x+e^x-1-x=e^x-1$, and $y(0)=1-1-0=0$; correct.

> Comment: $y'=x+y$ is linear and can be solved in one step with an integrating factor, $y=e^x-1-x$. Picard iteration looks clumsy here, but its value is universality: for nonlinear equations without elementary solutions it still gives a computable approximating sequence and an error bound.

### Example 2 (Intermediate: explicit solution and maximal interval)

Problem: solve $y'=y^2,\ y(0)=1$, find the maximal interval of existence, and use the theorem to estimate an $h$ that guarantees existence.

Analysis: $f=y^2$ is continuous on the whole plane, $\partial f/\partial y=2y$ is bounded on any bounded rectangle, so there is local existence and uniqueness.

Solution: separate variables ($y\ne0$):

$$\frac{dy}{y^2}=dx\quad\Longrightarrow\quad-\frac{1}{y}=x+C$$

from $y(0)=1$ we get $C=-1$, so

$$y=\frac{1}{1-x}$$

as $x\to1^-$, $y\to+\infty$—blow-up. So the maximal interval is $(-\infty,1)$; going from $x=0$ in the negative direction, the solution can be continued all the way to $-\infty$.

Estimate from the theorem: on the rectangle $|x|\le a,\ |y-1|\le b$,

$$M=\max|y^2|=(1+b)^2,\qquad h=\min\left(a,\frac{b}{(1+b)^2}\right)$$

for example $a=b=1$ gives $M=4$ and $h=\min(1,1/4)=1/4$. The theorem guarantees a solution only on $|x|\le1/4$, while the true solution lives to $x=1$—the theorem is sufficient, not optimal.

> Comment: the $h$ given by the theorem is usually much smaller than the true interval, because $M$ is the maximum slope over the whole rectangle, which is too conservative. What really decides the lifetime of a solution is when the solution itself runs to infinity, not how large the rectangle is.

### Example 3 (Advanced: a complete counterexample to uniqueness)

Problem: prove that $y'=\sqrt{|y|},\ y(0)=0$ has infinitely many solutions.

Analysis: $f(y)=\sqrt{|y|}$ is continuous but not Lipschitz at the origin. Find two solutions first, then construct a whole family.

Solution: **Solution one**: $y_0(x)\equiv0$. Then $y_0'=0=\sqrt{|0|}$, satisfying the equation and the initial value.

**Solution two**: for $x\ge0$ let $y_1(x)=\dfrac{x^2}{4}$, and for $x<0$ let $y_1(x)=0$. Check: for $x>0$,

$$y_1'(x)=\frac{x}{2},\qquad \sqrt{|y_1(x)|}=\sqrt{\frac{x^2}{4}}=\frac{x}{2}$$

they are equal; for $x<0$ both sides are $0$; at $x=0$ the left and right derivatives are both $0$, so $y_1'(0)=0=\sqrt{|y_1(0)|}$. Hence $y_1$ is also a solution.

**A whole family**: for any $c\ge0$ let

$$y_c(x)=\begin{cases}0,&x\le c\\[2pt]\dfrac{(x-c)^2}{4},&x>c\end{cases}$$

for $x>c$, $y_c'=\dfrac{x-c}{2}=\sqrt{y_c}$; for $x<c$ both sides vanish; at $x=c$ both one-sided derivatives are zero. So every $c\ge0$ gives a solution satisfying $y(0)=0$. The solutions are distinct, hence infinitely many.

**Why does Lipschitz fail?** For $y_1>0,\ y_2=0$,

$$\frac{|f(y_1)-f(0)|}{|y_1-0|}=\frac{\sqrt{y_1}}{y_1}=\frac{1}{\sqrt{y_1}}\to+\infty\quad(y_1\to0^+)$$

no finite $L$ makes the inequality hold at all points.

> Comment: this counterexample is more intuitive than $y^{1/3}$: the solution can "wait at the origin" for an arbitrary time $c$ and then leave along a parabola. The waiting time is the degree of freedom of the multiple solutions. Peano's theorem guarantees at least one solution but cannot control "when it starts to move".

### Example 4 (Advanced: continuous dependence)

Problem: let $f$ be Lipschitz in $y$ (constant $L$), and let $y_1,y_2$ be the solutions with initial values $y_1(x_0)=a$, $y_2(x_0)=b$. Prove that

$$|y_1(x)-y_2(x)|\le|a-b|\,e^{L|x-x_0|}$$

Analysis: the difference of the two solutions is controlled by the initial difference and the difference of the right sides; use Grönwall's inequality.

Solution: assume $x\ge x_0$. Subtract and integrate:

$$y_1(x)-y_2(x)=a-b+\int_{x_0}^{x}\big[f(s,y_1(s))-f(s,y_2(s))\big]ds$$

take absolute values and use the Lipschitz condition:

$$|y_1(x)-y_2(x)|\le|a-b|+\int_{x_0}^{x}L|y_1(s)-y_2(s)|\,ds$$

let $u(x)=|y_1(x)-y_2(x)|$ and $C=|a-b|$; this is exactly the form of Grönwall's inequality, so

$$u(x)\le|a-b|e^{L(x-x_0)}$$

for $x<x_0$ reverse the interval and replace the exponent by $L|x-x_0|$; the conclusion is the same.

> Comment: this estimate shows that solutions depend Lipschitz-continuously on initial data, with error growing at most exponentially. It is the reassurance of numerical computation: a tiny error in the measured initial value will not make the solution veer off instantly (but for large $L$ and long intervals the amplification can be severe—the source of the sensitivity of chaotic systems to initial conditions).

## VI. Common Errors and Pitfalls

1. **Taking local existence for global**: wrong—concluding from the theorem that "the solution exists for all $x$". Why wrong—the theorem gives only a local result on $|x-x_0|\le h$, and $h$ may be small. Right—find the local solution, then use continuation to the maximal interval and check for blow-up.
2. **Believing continuity implies uniqueness**: wrong—verifying only continuity and asserting uniqueness. Why wrong—Peano's theorem guarantees existence only; uniqueness needs Lipschitz or stronger, and $\sqrt{|y|}$ is a counterexample. Right—verify Lipschitz, or check whether $\partial f/\partial y$ is bounded.
3. **Confusing Lipschitz with continuity**: wrong—saying "Lipschitz is a kind of continuity, hence weaker". Why wrong—Lipschitz implies continuity but not conversely; Lipschitz is stronger. Right—continuity is the threshold for existence, Lipschitz the threshold for uniqueness.
4. **Using the partial-derivative criterion on a rectangle containing a singularity**: wrong—claiming "the partial exists, so Lipschitz" for $\sqrt{|y|}$ on a rectangle containing $y=0$. Why wrong—the partial does not exist or is unbounded at $y=0$. Right—the rectangle must avoid the blow-up point, or verify the Lipschitz inequality directly.
5. **Taking one Picard iterate as the exact solution**: wrong—computing $y_2$ and writing "the solution is $y_2$". Why wrong—$y_n$ is only an approximation unless one proves it satisfies the equation exactly. Right—take the limit or use the error estimate to state the accuracy.
6. **Ignoring the two constraints on $h$**: wrong—taking $h=a$ only and forgetting the $b/M$ bound. Why wrong—too large an $h$ lets the iteration leave the rectangle, invalidating $M$ and the Lipschitz constant. Right—$h=\min(a,b/M)$.
7. **Reversing signs in Grönwall's inequality**: wrong—writing $e^{L(x-x_0)}$ as $e^{-L(x-x_0)}$. Why wrong—the inequality is an upper bound, so the exponent must be a positive growth factor. Right—$u\le Ce^{L(x-x_0)}$ ($x\ge x_0$).

## VII. Summary and Mnemonic

Key points:

- Existence rests on continuity of $f$ (Peano); uniqueness on the Lipschitz condition in $y$ (Picard–Lindelöf).
- Proof tools: convert the differential equation to an integral equation, build a contraction by Picard iteration, and use the Banach fixed-point theorem for the unique fixed point.
- The theorem is local: $h=\min(a,b/M)$; solutions can be continued up to blow-up or the boundary.
- Continuous and bounded partial derivatives are the most common sufficient condition for Lipschitz, but the rectangle must avoid singularities.
- Grönwall's inequality gives quantitative estimates of uniqueness and continuous dependence.
- Classic counterexample: $y'=\sqrt{|y|},\ y(0)=0$ has infinitely many solutions; continuity is not enough for uniqueness.

**Mnemonic: continuity preserves existence, Lipschitz preserves uniqueness; iterate the integral equation, valid until the blow-up.**`,
    keyPoints: [
      'Existence via Picard iteration: convert to an integral equation, then approximate successively',
      'Uniqueness needs the Lipschitz condition: |f(x,y)-f(x,z)| ≤ L|y-z|',
      'Local existence plus continuation: solutions extend to the boundary or blow up',
      'Counterexample y\' = y^{1/3} is not Lipschitz, so the solution is not unique',
      'Continuity preserves existence only; uniqueness also needs Lipschitz',
    ],
    relatedProblemIds: [],
  },

  'constant-coefficient-systems': {
    chapter: 'Chapter 5 Constant-Coefficient Linear Systems',
    title: 'Solving Constant-Coefficient Linear Systems',
    summary:
      'The first-order constant-coefficient system x\' = A x + f(t) is the natural generalization of higher-order constant-coefficient equations. With the matrix exponential e^{At}, eigenvalues and eigenvectors, it can be solved as systematically as a scalar equation, and one sees directly how each mode evolves in time.',
    content: String.raw`

The scalar equation $x'=ax$ has the solution $x=x_0e^{at}$; one number $a$ decides everything: positive means growth, negative decay, zero constancy. For a system $\vec{x}'=A\vec{x}$, $A$ is a matrix controlling many directions at once: some are stretched, some squeezed, some rotated. The goal of solving is to find these directions, turning the coupled system into a set of independent scalar equations.

This is very clean when $A$ is diagonalizable: the eigenvectors give "axes that are not rotated", and the eigenvalues give the growth rate along each axis. The solution is a superposition of terms $e^{\lambda_i t}\vec{v}_i$, each called a **mode**. This is exactly what engineers mean by "the n-th mode of the system".

If $A$ cannot be diagonalized, generalized eigenvectors appear and $t e^{\lambda t}$ shows up in the solution—not a mathematician's quirk but the manifestation of "resonance" in a linear system. If an external input $\vec{f}(t)$ is added, variation of parameters integrates its influence in. This lecture covers all three at once: diagonalizable, defective, non-homogeneous.

## II. Rigorous Definitions

**Constant-coefficient linear system**:

$$\vec{x}'(t)=A\vec{x}(t)+\vec{f}(t)$$

where $A$ is an $n\times n$ real constant matrix, $\vec{x}(t)\in\mathbb{R}^n$, and $\vec{f}(t)$ is a known continuous vector function. When $\vec{f}\equiv\vec{0}$ it is called homogeneous.

**Matrix exponential**:

$$e^{At}=\sum_{k=0}^{\infty}\frac{t^kA^k}{k!}$$

it converges for all $t\in\mathbb{R}$ and satisfies $e^{A\cdot0}=I$, $\dfrac{d}{dt}e^{At}=Ae^{At}=e^{At}A$.

**General solution of the homogeneous system**: any solution can be written

$$\vec{x}(t)=e^{At}\vec{c}$$

with $\vec{c}=\vec{x}(0)$. If $\Phi(t)$ is a fundamental matrix (columns linearly independent, $\det\Phi(0)\ne0$), the general solution is $\vec{x}=\Phi(t)\vec{c}$, and $\Phi(t)=e^{At}\Phi(0)$.

**Eigenpairs and fundamental solutions**: if $A\vec{v}=\lambda\vec{v}$, $\vec{v}\ne0$, then

$$\vec{x}(t)=e^{\lambda t}\vec{v}$$

is a solution of the homogeneous system, because $(e^{\lambda t}\vec{v})'=\lambda e^{\lambda t}\vec{v}=e^{\lambda t}A\vec{v}=A(e^{\lambda t}\vec{v})$.

**Generalized eigenvector**: if $(\lambda,\vec{v})$ is an eigenpair and $\vec{w}$ satisfies

$$(A-\lambda I)\vec{w}=\vec{v}$$

then $\vec{w}$ is a generalized eigenvector (of rank 2) corresponding to $\vec{v}$. Then

$$\vec{x}(t)=e^{\lambda t}\big(t\vec{v}+\vec{w}\big)$$

is also a solution. Check: differentiating gives $e^{\lambda t}\big[\lambda(t\vec{v}+\vec{w})+\vec{v}\big]$, while $A(t\vec{v}+\vec{w})=t\lambda\vec{v}+(\lambda\vec{w}+\vec{v})$; the two agree.

**Non-homogeneous (variation of parameters)**:

$$\vec{x}(t)=e^{At}\vec{c}+e^{At}\int_{0}^{t}e^{-As}\vec{f}(s)\,ds$$

the first term is the homogeneous general solution, the second a particular solution. With initial value $\vec{x}(0)=\vec{x}_0$, we have $\vec{c}=\vec{x}_0$.

## III. Why Defined This Way

**Why is $e^{At}\vec{c}$ always a solution?** Because the matrix exponential is a power series in $A$, so $A$ commutes with $e^{At}$:

$$Ae^{At}=A\sum_{k=0}^{\infty}\frac{t^kA^k}{k!}=\sum_{k=0}^{\infty}\frac{t^kA^{k+1}}{k!}=e^{At}A$$

differentiate term by term:

$$\frac{d}{dt}e^{At}=\sum_{k=1}^{\infty}\frac{kt^{k-1}A^k}{k!}=\sum_{k=1}^{\infty}\frac{t^{k-1}A^k}{(k-1)!}=Ae^{At}$$

so $\dfrac{d}{dt}(e^{At}\vec{c})=Ae^{At}\vec{c}$, and at $t=0$ it equals $\vec{c}$. By uniqueness these are all the solutions.

**Why does diagonalization decouple?** Let $A=P\Lambda P^{-1}$ with $\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$. Since $A^k=P\Lambda^kP^{-1}$,

$$e^{At}=P\left(\sum_{k=0}^{\infty}\frac{t^k\Lambda^k}{k!}\right)P^{-1}=P\operatorname{diag}(e^{\lambda_1t},\dots,e^{\lambda_nt})P^{-1}$$

denote the columns of $P$ by $\vec{p}_1,\dots,\vec{p}_n$; then

$$e^{At}\vec{c}=\sum_{i=1}^{n}(P^{-1}\vec{c})_i\,e^{\lambda_it}\vec{p}_i$$

each mode evolves independently: the initial component of the $i$-th mode is exponentially amplified or shrunk by the eigenvalue $\lambda_i$.

**Why does a defective matrix produce $t$ terms?** If $A$ cannot be diagonalized, use the Jordan form. The simplest case is $A=\lambda I+N$ with $N$ nilpotent ($N^k=0$ for some $k$). Since $\lambda I$ and $N$ commute,

$$e^{At}=e^{\lambda t}e^{Nt}=e^{\lambda t}\left(I+tN+\frac{t^2}{2!}N^2+\cdots+\frac{t^{k-1}}{(k-1)!}N^{k-1}\right)$$

the series truncates after finitely many terms, producing $t^j e^{\lambda t}$. For the $2\times2$ Jordan block $N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $N^2=0$, giving directly $e^{At}=e^{\lambda t}(I+tN)$—the matrix version of the generalized-eigenvector solution above.

**Why does $e^{A+B}=e^Ae^B$ generally fail?** Scalar exponents can be split because $a,b$ are numbers and automatically commute. Matrices need not. Expanding,

$$e^{A+B}=I+(A+B)+\frac{(A+B)^2}{2}+\cdots$$

while

$$e^Ae^B=\left(I+A+\frac{A^2}{2}+\cdots\right)\left(I+B+\frac{B^2}{2}+\cdots\right)=I+A+B+\frac{A^2}{2}+AB+\frac{B^2}{2}+\cdots$$

the two differ by $\frac{1}{2}(AB-BA)=\frac12[A,B]$ and higher commutator terms. They are equal only when $[A,B]=0$. Counterexample: take

$$A=\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad B=\begin{pmatrix}0&0\\1&0\end{pmatrix}$$

then $A^2=B^2=0$, $e^A=I+A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$, $e^B=I+B=\begin{pmatrix}1&0\\1&1\end{pmatrix}$, with product $\begin{pmatrix}2&1\\1&1\end{pmatrix}$. But $A+B=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ satisfies $(A+B)^2=I$, so

$$e^{A+B}=\cosh(1)I+\sinh(1)(A+B)=\begin{pmatrix}\cosh1&\sinh1\\\sinh1&\cosh1\end{pmatrix}\approx\begin{pmatrix}1.543&1.175\\1.175&1.543\end{pmatrix}$$

clearly different from $\begin{pmatrix}2&1\\1&1\end{pmatrix}$.

**Where does the non-homogeneous formula come from?** Set $\vec{x}=e^{At}\vec{c}(t)$ with $\vec{c}(t)$ to be determined. Substituting:

$$\vec{x}'=Ae^{At}\vec{c}+e^{At}\vec{c}'=A\vec{x}+e^{At}\vec{c}'$$

for this to equal $A\vec{x}+\vec{f}$ we need $e^{At}\vec{c}'=\vec{f}$, i.e. $\vec{c}'=e^{-At}\vec{f}$. Integrating,

$$\vec{c}(t)=\vec{c}(0)+\int_0^t e^{-As}\vec{f}(s)\,ds$$

multiplying on the left by $e^{At}$ gives the formula. This is the "turn constants into functions" method of variation of parameters; its essence is to project the non-homogeneous term into the time-evolving coordinate system and then integrate.

**What if $\vec{f}$ has a special form?** If $\vec{f}(t)=e^{\mu t}\vec{p}$ ($\vec{p}$ constant), guess $\vec{x}_p=e^{\mu t}\vec{q}$; substituting gives $(\mu I-A)\vec{q}=\vec{p}$. If $\mu$ is not an eigenvalue of $A$, $\mu I-A$ is invertible and $\vec{q}$ follows directly; if $\mu$ is an eigenvalue, set $\vec{q}=\vec{q}_0+t\vec{q}_1+\cdots$, producing polynomial times exponential—exactly parallel to "multiply by $t$" in the scalar resonant case.

## IV. Intuition and Pictures

Eigenvalues decide the "fate" of each mode:

| Eigenvalue | Form of the mode | Long-term behaviour |
|---|---|---|
| real root $\lambda>0$ | $e^{\lambda t}\vec{v}$ | exponential growth along $\vec{v}$ |
| real root $\lambda<0$ | $e^{\lambda t}\vec{v}$ | exponential decay along $\vec{v}$ |
| complex root $\alpha\pm i\beta$ | $e^{\alpha t}(\cos\beta t,\sin\beta t)$ | spiral; $\alpha$ decides in or out |
| repeated root + defect | $e^{\lambda t}(t\vec{v}+\vec{w})$ | polynomial times exponential |
| purely imaginary root | sine and cosine | closed elliptic trajectories |

> Intuition: think of $A$ as a row of knobs, each eigenvector an independent axis. The real part controls whether the "volume" on that axis is amplified or attenuated, the imaginary part controls "rotation speed", and a defect is like two knobs mechanically linked, turning one drags the other, producing a $t$-fold drift term.

In the phase portrait, the classification of two-dimensional systems is exactly as in the previous chapter: stable node, saddle, stable focus, centre. The matrix exponential simply translates the "phase portrait" into a "function of time": the phase portrait shows the shape of trajectories, the matrix exponential how fast one moves along them.

Right versus wrong:

- Wrong: $e^{At}=e^{\lambda_1t}P_1+\cdots$ also holds for non-diagonalizable matrices. Right: a complete eigenvector basis is needed first; with a defect, add generalized eigenvectors and $t$ terms.
- Wrong: if all eigenvalues of $A$ are $\lambda$, write $e^{At}=e^{\lambda t}I$. Right: this holds only when $A=\lambda I$; with a defect, $e^{At}=e^{\lambda t}(I+tN+\cdots)$.

## V. Worked Examples

### Example 1 (Basic: a diagonalizable system)

Problem: solve $\vec{x}'=\begin{pmatrix}3&1\\1&3\end{pmatrix}\vec{x}$, $\vec{x}(0)=\begin{pmatrix}1\\0\end{pmatrix}$.

Analysis: a symmetric matrix is orthogonally diagonalizable; find the eigenvalues and eigenvectors first.

Solution: the characteristic polynomial

$$\det(A-\lambda I)=\begin{vmatrix}3-\lambda&1\\1&3-\lambda\end{vmatrix}=(3-\lambda)^2-1=\lambda^2-6\lambda+8=(\lambda-2)(\lambda-4)$$

eigenvalues $\lambda_1=4,\ \lambda_2=2$.

- For $\lambda_1=4$: $(A-4I)\vec{v}=\begin{pmatrix}-1&1\\1&-1\end{pmatrix}\vec{v}=0$; take $\vec{v}_1=(1,1)^{\mathsf T}$.
- For $\lambda_2=2$: $(A-2I)\vec{v}=\begin{pmatrix}1&1\\1&1\end{pmatrix}\vec{v}=0$; take $\vec{v}_2=(1,-1)^{\mathsf T}$.

The general solution is

$$\vec{x}(t)=C_1e^{4t}\begin{pmatrix}1\\1\end{pmatrix}+C_2e^{2t}\begin{pmatrix}1\\-1\end{pmatrix}$$

Substituting the initial values:

$$C_1+C_2=1,\qquad C_1-C_2=0$$

giving $C_1=C_2=\dfrac12$. Hence

$$\vec{x}(t)=\frac12e^{4t}\begin{pmatrix}1\\1\end{pmatrix}+\frac12e^{2t}\begin{pmatrix}1\\-1\end{pmatrix}=\frac12\begin{pmatrix}e^{4t}+e^{2t}\\e^{4t}-e^{2t}\end{pmatrix}$$

Check: at $t=0$ it is $(1,0)^{\mathsf T}$; differentiating gives $\frac12(4e^{4t}+2e^{2t},4e^{4t}-2e^{2t})^{\mathsf T}$, while $A\vec{x}=\frac12(3(e^{4t}+e^{2t})+(e^{4t}-e^{2t}), (e^{4t}+e^{2t})+3(e^{4t}-e^{2t}))=\frac12(4e^{4t}+2e^{2t},4e^{4t}-2e^{2t})$, consistent.

> Comment: both eigenvalues are positive, so both modes grow and the origin is an unstable node. If the initial value were $(1,-1)^{\mathsf T}$, then $C_1=0$ and only the decaying $e^{2t}$ mode remains—showing that whether a solution grows or decays depends on which mode the initial value excites, but stability requires no mode to grow.

### Example 2 (Intermediate: defective matrix and generalized eigenvector)

Problem: solve $\vec{x}'=\begin{pmatrix}2&1\\0&2\end{pmatrix}\vec{x}$, $\vec{x}(0)=\begin{pmatrix}1\\0\end{pmatrix}$.

Analysis: $\lambda=2$ is a double root, but $A-2I=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ has rank $1$ and a one-dimensional null space, so eigenvectors are insufficient and a generalized eigenvector is needed.

Solution: eigenvectors satisfy $(A-2I)\vec{v}=0$, i.e. the second component is zero; take $\vec{v}=(1,0)^{\mathsf T}$.

Find the generalized eigenvector $\vec{w}$ with $(A-2I)\vec{w}=\vec{v}$:

$$\begin{pmatrix}0&1\\0&0\end{pmatrix}\begin{pmatrix}w_1\\w_2\end{pmatrix}=\begin{pmatrix}w_2\\0\end{pmatrix}=\begin{pmatrix}1\\0\end{pmatrix}$$

so $w_2=1$, $w_1$ arbitrary; take $\vec{w}=(0,1)^{\mathsf T}$.

Thus two linearly independent solutions are

$$\vec{x}_1=e^{2t}\vec{v}=e^{2t}\begin{pmatrix}1\\0\end{pmatrix},\qquad \vec{x}_2=e^{2t}(t\vec{v}+\vec{w})=e^{2t}\begin{pmatrix}t\\1\end{pmatrix}$$

the general solution

$$\vec{x}(t)=C_1e^{2t}\begin{pmatrix}1\\0\end{pmatrix}+C_2e^{2t}\begin{pmatrix}t\\1\end{pmatrix}=e^{2t}\begin{pmatrix}C_1+C_2t\\C_2\end{pmatrix}$$

substituting $\vec{x}(0)=(1,0)^{\mathsf T}$: $C_1=1,\ C_2=0$. Hence

$$\vec{x}(t)=e^{2t}\begin{pmatrix}1\\0\end{pmatrix}$$

Check: $\vec{x}'=2e^{2t}(1,0)^{\mathsf T}$, while $A\vec{x}=e^{2t}\begin{pmatrix}2\\0\end{pmatrix}$, consistent.

> Comment: the initial value happens to lie in the eigenvector direction, so $C_2=0$ and no $t$ term appears. But that does not mean the $t$ term does not exist—with another initial value, say $(0,1)^{\mathsf T}$, the solution is $e^{2t}(t,1)^{\mathsf T}$ and the $t$ term appears at once. Whether a generalized eigenvector is needed depends on whether $\dim\ker(A-\lambda I)$ equals the algebraic multiplicity, not on the initial value of one problem.
>
> One may also use the matrix exponential directly: $A=2I+N$, $N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $N^2=0$, so $e^{At}=e^{2t}(I+tN)=e^{2t}\begin{pmatrix}1&t\\0&1\end{pmatrix}$, consistent with the fundamental matrix above.

### Example 3 (Advanced: non-homogeneous and resonance)

Problem: solve $\vec{x}'=\begin{pmatrix}0&1\\-1&0\end{pmatrix}\vec{x}+\begin{pmatrix}0\\\cos t\end{pmatrix}$.

Analysis: the eigenvalues of $A$ are $\pm i$, and the forcing frequency $1$ equals the natural frequency—resonance. Compute fully with variation of parameters.

Solution: first find $e^{At}$. Since $A^2=-I$,

$$e^{At}=\sum_{k=0}^{\infty}\frac{t^kA^k}{k!}=\left(1-\frac{t^2}{2!}+\cdots\right)I+\left(t-\frac{t^3}{3!}+\cdots\right)A=\cos t\,I+\sin t\,A$$

i.e.

$$e^{At}=\begin{pmatrix}\cos t&\sin t\\-\sin t&\cos t\end{pmatrix},\qquad e^{-As}=\begin{pmatrix}\cos s&-\sin s\\\sin s&\cos s\end{pmatrix}$$

compute the integrand vector:

$$e^{-As}\vec{f}(s)=\begin{pmatrix}\cos s&-\sin s\\\sin s&\cos s\end{pmatrix}\begin{pmatrix}0\\\cos s\end{pmatrix}=\begin{pmatrix}-\sin s\cos s\\\cos^2s\end{pmatrix}$$

integrating:

$$\int_0^t-\sin s\cos s\,ds=-\frac12\sin^2t$$

$$\int_0^t\cos^2s\,ds=\int_0^t\frac{1+\cos2s}{2}ds=\frac{t}{2}+\frac{\sin2t}{4}$$

so

$$\vec{c}(t)=\begin{pmatrix}-\frac12\sin^2t\\[2pt]\frac{t}{2}+\frac{\sin2t}{4}\end{pmatrix}$$

multiply on the left by $e^{At}$:

$$x_{p1}=\cos t\left(-\frac12\sin^2t\right)+\sin t\left(\frac{t}{2}+\frac{\sin2t}{4}\right)$$

using $\sin t\sin2t=2\sin^2t\cos t$, the second term is $\frac{t}{2}\sin t+\frac12\sin^2t\cos t$, which cancels the first, giving $x_{p1}=\dfrac{t}{2}\sin t$.

$$x_{p2}=-\sin t\left(-\frac12\sin^2t\right)+\cos t\left(\frac{t}{2}+\frac{\sin2t}{4}\right)$$

using $\cos t\sin2t=2\sin t\cos^2t$,

$$x_{p2}=\frac12\sin^3t+\frac{t}{2}\cos t+\frac12\sin t\cos^2t=\frac12\sin t+\frac{t}{2}\cos t$$

so the particular solution is

$$\vec{x}_p(t)=\begin{pmatrix}\frac{t}{2}\sin t\\[2pt]\frac12\sin t+\frac{t}{2}\cos t\end{pmatrix}$$

and the general solution

$$\vec{x}(t)=C_1\begin{pmatrix}\cos t\\-\sin t\end{pmatrix}+C_2\begin{pmatrix}\sin t\\\cos t\end{pmatrix}+\begin{pmatrix}\frac{t}{2}\sin t\\[2pt]\frac12\sin t+\frac{t}{2}\cos t\end{pmatrix}$$

Check: $x_{p1}'=\frac12\sin t+\frac{t}{2}\cos t=x_{p2}$, satisfying the first equation; $x_{p2}'=\frac12\cos t+\frac12\cos t-\frac{t}{2}\sin t=\cos t-\frac{t}{2}\sin t$, while $-x_{p1}+\cos t=-\frac{t}{2}\sin t+\cos t$, satisfying the second.

> Comment: the signature of resonance is the $t\sin t$ and $t\cos t$ in the particular solution—an amplitude growing linearly in time. With a forcing term $\cos 2t$ (frequency different from the natural one), the particular solution would carry no $t$. This problem also shows that the integrals in variation of parameters can be heavy, but every step is mechanical; always verify both components at the end.

## VI. Common Errors and Pitfalls

1. **Abusing $e^{A+B}=e^Ae^B$**: wrong—splitting a matrix exponential like a scalar one. Why wrong—it holds only when $A,B$ commute; see the counterexample above. Right—use diagonalization, Jordan decomposition or the series.
2. **Forcing eigenvectors for a defective matrix**: wrong—still writing $n$ solutions $e^{\lambda t}\vec{v}$ at a repeated root. Why wrong—there are not enough eigenvectors, the solutions written are linearly dependent, and the general solution is incomplete. Right—compute the geometric multiplicity, add generalized eigenvectors, and the solution contains $t^ke^{\lambda t}$.
3. **Wrong eigenvectors**: wrong—substituting another eigenvalue for $\lambda$ when solving $(A-\lambda I)\vec{v}=0$. Why wrong—each eigenvalue has its own null space. Right—find the null space for each eigenvalue separately and verify by $A\vec{v}=\lambda\vec{v}$.
4. **Sign error in the non-homogeneous formula**: wrong—writing $e^{At}\int e^{As}\vec{f}(s)ds$. Why wrong—substituting gives $\vec{c}'=e^{-At}\vec{f}$, so the exponent must be negative. Right—$e^{At}\int_0^t e^{-As}\vec{f}(s)ds$.
5. **Taking initial values directly as coefficients**: wrong—using $\vec{x}(0)$ as $\vec{c}$ in front of $e^{At}$ while using a non-identity fundamental matrix. Why wrong—the coefficients equal the initial values only when $\Phi(0)=I$. Right—solve $\Phi(0)\vec{c}=\vec{x}_0$.
6. **Wrong particular-solution form under resonance**: wrong—still guessing $\vec{q}e^{\mu t}$ when the forcing frequency equals an eigenvalue. Why wrong—$\mu I-A$ is singular and the equation has no solution or infinitely many. Right—guess $(\vec{q}_0+t\vec{q}_1)e^{\mu t}$, raising the power according to multiplicity.
7. **Writing complex solutions for real eigenvalues**: wrong—writing $e^{(\alpha+i\beta)t}\vec{v}$ directly as a real-valued solution. Why wrong—a real system needs real solutions. Right—take real and imaginary parts, or separate the real and imaginary parts of a conjugate pair.

## VII. Summary and Mnemonic

Key points:

- The homogeneous general solution is $\vec{x}=e^{At}\vec{c}$; the matrix exponential is the "vector version of $e^{at}$".
- Diagonalizable: $A=P\Lambda P^{-1}$, fundamental solutions $e^{\lambda_it}\vec{v}_i$.
- Defective: use Jordan blocks or generalized eigenvectors, and the solution contains $t^ke^{\lambda t}$.
- Non-homogeneous: variation of parameters $\vec{x}_p=e^{At}\int_0^t e^{-As}\vec{f}(s)ds$; for special $\vec{f}$ use undetermined coefficients.
- Resonance: when the forcing frequency hits an eigenvalue, the particular solution gains powers of $t$.
- $e^{A+B}=e^Ae^B$ holds only when $A,B$ commute.

**Mnemonic: the matrix exponential solves the homogeneous system, diagonalization pairs eigenvalues with eigenvectors; a defect adds $t$ terms via Jordan, and variation of parameters handles the non-homogeneous part.**`,
    keyPoints: [
      'The homogeneous general solution is given by e^{At}; fundamental solutions correspond to eigenpairs',
      'If A is diagonalizable, the solution is a linear combination of e^{λ_i t} times eigenvectors v_i',
      'Repeated roots with too few eigenvectors: use Jordan blocks, and the solution contains t^k e^{λt}',
      'Non-homogeneous: variation of parameters, x_p = e^{At} ∫ e^{-As} f(s) ds',
      'e^{At} can be computed by diagonalization, Jordan form or undetermined coefficients',
    ],
    relatedProblemIds: [],
  },

  'phase-plane': {
    chapter: 'Chapter 6 Phase Plane and Qualitative Theory',
    title: 'The Phase Plane and Qualitative Analysis',
    summary:
      'A planar autonomous system can be drawn as trajectories in the phase plane (x,y); without solving, one can judge the type of equilibria and the direction of trajectories. The Jacobian eigenvalues of the linearization divide equilibria into nodes, saddles, centres and foci, and the Poincaré–Bendixson theorem characterizes isolated periodic motion.',
    content: String.raw`

The large-amplitude swing of a pendulum satisfies $\theta''+\sin\theta=0$, an equation with no elementary explicit solution. Yet we do not need the formula for $\theta(t)$ to answer many questions: will the pendulum swing over the top? after a small disturbance, will it return to the lowest point? what does the motion look like at high energy? The method is to take "position" and "velocity" as two coordinates in a plane and let time hide behind the curve.

Concretely, set $x=\theta,\ y=\theta'$, giving

$$x'=y,\qquad y'=-\sin x$$

every point $(x,y)$ corresponds to a velocity vector $(y,-\sin x)$. Starting from a point and following these vectors draws a trajectory; all trajectories together form the phase portrait. The order of time is recorded by the "arrows", while the geometric shape of the trajectories exposes the structure of the system: closed loops mean periodic motion, spirals mean damped oscillation, saddle shapes mean unstable equilibrium.

This is qualitative theory: not solving, only studying the geometry of trajectories. The core questions of this lecture: how can the eigenvalues of the Jacobian alone divide equilibria into saddles, nodes, foci and centres? And how can one tell whether a system has an isolated periodic orbit (a limit cycle)?

## II. Rigorous Definitions

Consider the planar autonomous system

$$\begin{cases}x'=f(x,y)\\ y'=g(x,y)\end{cases}$$

with $f,g$ continuously differentiable. **Autonomous** means the right side does not contain $t$ explicitly.

**Trajectory (orbit)**: the image set of a solution curve $\{(x(t),y(t)):t\in I\}$. Note that a trajectory is a set without the time parameter; different solutions may traverse the same trajectory at different speeds.

**Equilibrium (singular point)**: a point with $f(x^*,y^*)=g(x^*,y^*)=0$. It is the degenerate case of a trajectory—a single point.

**Jacobian and linearization**: at the equilibrium,

$$J=\begin{pmatrix}f_x&f_y\\g_x&g_y\end{pmatrix}_{(x^*,y^*)}$$

setting $\xi=x-x^*,\ \eta=y-y^*$ gives $(\xi',\eta')^{\mathsf T}=J(\xi,\eta)^{\mathsf T}+o(\|(\xi,\eta)\|)$. The linearized system is $(\xi',\eta')^{\mathsf T}=J(\xi,\eta)^{\mathsf T}$.

**Hyperbolic equilibrium**: no eigenvalue of $J$ has zero real part.

**Classification of equilibria** (let the eigenvalues of $J$ be $\lambda_1,\lambda_2$, with $\tau=\operatorname{tr}J$, $\delta=\det J$):

- $\delta<0$: eigenvalues of opposite sign, a **saddle**;
- $\delta>0,\ \tau^2-4\delta\ge0,\ \tau<0$: **stable node**; $\tau>0$: **unstable node**;
- $\delta>0,\ \tau^2-4\delta<0,\ \tau<0$: **stable focus**; $\tau>0$: **unstable focus**;
- $\delta>0,\ \tau=0$: **centre** (linear case).

**Limit cycle**: an isolated closed trajectory, i.e. one with no other closed trajectory in some neighbourhood. A stable limit cycle attracts trajectories on both sides and is called an attractor.

**First integral**: if a function $H(x,y)$ is constant along trajectories, i.e.

$$\frac{d}{dt}H(x(t),y(t))=H_xf+H_yg\equiv0$$

then $H$ is a first integral of the system, and trajectories lie on the level sets $H=C$.

**Poincaré–Bendixson theorem**: let $K$ be a compact (bounded closed) positively invariant region (trajectories that enter never leave), containing no equilibrium. If a trajectory starts in $K$ and stays in $K$, then its $\omega$-limit set is a closed trajectory.

**Dulac criterion**: if on a simply connected region $D$ there is a $C^1$ function $B(x,y)$ such that

$$\frac{\partial(Bf)}{\partial x}+\frac{\partial(Bg)}{\partial y}$$

does not change sign on $D$ and is not identically zero, then $D$ contains no closed trajectory.

## III. Why Defined This Way

**Why can linearization decide the type of a nonlinear equilibrium?** This is the content of the Hartman–Grobman theorem: if the equilibrium is hyperbolic (no zero real part), the topological structure of trajectories of the nonlinear system near the equilibrium is the same as that of its linearization—there is a homeomorphism matching the two. Intuitively, the linear part is the leading term of the Taylor expansion, and in a sufficiently small neighbourhood the higher-order terms $o(\|(\xi,\eta)\|)$ only slightly distort the trajectories without changing the qualitative structure of "in or out".

But hyperbolicity cannot be dropped. If $J$ has a zero or purely imaginary eigenvalue, the higher-order terms can be of the same order as the linear ones, or more important. For example, $\dot x=x^2$ linearizes at the origin to $\dot\xi=0$, and the linearization looks "motionless", but the actual solution $x=1/(C-t)$ blows up; $\dot x=-x^3$ and $\dot x=x^3$ also linearize identically, yet one is asymptotically stable and the other unstable. So with zero real part, linearization gives no conclusion.

**Why do $\tau,\delta$ suffice for the classification?** The second-order characteristic polynomial is

$$\lambda^2-\tau\lambda+\delta=0$$

with roots $\dfrac{\tau\pm\sqrt{\tau^2-4\delta}}{2}$. The sign of the discriminant decides real or complex roots, the sign of $\delta$ decides whether the two roots have opposite signs ($\delta=\lambda_1\lambda_2$), and the sign of $\tau$ decides the sum of the real parts ($\tau=\lambda_1+\lambda_2$). Combining these three gives exactly saddles, nodes, foci and centres. When $\delta=0$ at least one eigenvalue is zero—a non-hyperbolic degenerate case requiring separate analysis.

**Why do closed trajectories correspond to periodic solutions?** If a trajectory closes, then after returning to the starting point the solution repeats the same path because the autonomous system's "rule does not change with time", so $x(t+T)=x(t)$, $y(t+T)=y(t)$, with $T$ the period of one circuit. Conversely, the trajectory of a non-constant periodic solution must be closed. So "finding periodic motion" is equivalent to "finding closed trajectories".

**Why does the Poincaré–Bendixson theorem hold only in the plane?** Planar trajectories cannot self-intersect (otherwise there would be two velocity directions at the intersection), which greatly restricts long-time behaviour: a trajectory trapped in a compact region, unable to stop (no equilibrium) and unable to wind infinitely complexly, must eventually approach a closed trajectory. In three or more dimensions trajectories can knot up and chaos appears, and the theorem fails. This is the root of "two dimensions are special, three are complex".

**Why is the Dulac criterion valid?** It is a direct corollary of Green's theorem. If a closed trajectory $\Gamma$ bounds a region $\Omega$, apply Green's theorem to the vector field $(Bf,Bg)$:

$$\iint_{\Omega}\left[\frac{\partial(Bf)}{\partial x}+\frac{\partial(Bg)}{\partial y}\right]dxdy=\oint_{\Gamma}(Bf\,dy-Bg\,dx)$$

the right side vanishes along the closed trajectory (the direction of the trajectory is parallel to the tangent, $(dx,dy)$ is proportional to $(f,g)$, and the integrand is zero). But the left integrand has a fixed sign, so the integral cannot be zero—a contradiction. Hence no such closed trajectory exists.

## IV. Intuition and Pictures

Draw a "classification map" with the trace and determinant:

| Condition | Type | Stability |
|---|---|---|
| $\delta<0$ | saddle | unstable |
| $\delta>0,\ \tau<0,\ \tau^2\ge4\delta$ | stable node | asymptotically stable |
| $\delta>0,\ \tau>0,\ \tau^2\ge4\delta$ | unstable node | unstable |
| $\delta>0,\ \tau<0,\ \tau^2<4\delta$ | stable focus | asymptotically stable |
| $\delta>0,\ \tau>0,\ \tau^2<4\delta$ | unstable focus | unstable |
| $\delta>0,\ \tau=0$ | centre | stable but not asymptotically |

> Intuition: think of the phase portrait as a topographic map and the vector field as the direction of water flow. A stable node is a "sink" into which all water flows; an unstable node is a "source" from which water gushes; a saddle is a mountain pass, water in one direction and out the other; a centre is a circulation, water going round forever without falling; a focus is a vortex, water spiralling in or out.

When sketching a phase portrait, first find the two **nullclines**: $f(x,y)=0$ (where $x'=0$ and the vector is vertical) and $g(x,y)=0$ (where $y'=0$ and the vector is horizontal). Their intersections are equilibria; the nullclines divide the plane into regions in each of which the vector direction (up-right, down-left, etc.) is fixed, from which the global flow can be sketched.

Right versus wrong:

- Wrong: $\delta>0$ means stable. Right: also look at $\tau$; if $\tau>0$ it is unstable.
- Wrong: $\tau=0,\delta>0$ is necessarily a centre. Right: that holds only for linear systems; a nonlinear system at purely imaginary eigenvalues may spiral in or out, and higher-order terms must be examined.
- Wrong: a limit cycle is just a "closed trajectory". Right: a limit cycle must also be "isolated", with no continuous band of closed trajectories nearby; around a centre there are rings of closed trajectories, but they are not a limit cycle.

## V. Worked Examples

### Example 1 (Basic: classifying a linear system)

Problem: determine the type and stability of the origin for $x'=x+y,\ y'=-x+y$.

Analysis: the right side is already linear, so the coefficient matrix is the Jacobian.

Solution:

$$J=\begin{pmatrix}1&1\\-1&1\end{pmatrix}$$

$$\tau=\operatorname{tr}J=2,\qquad \delta=\det J=1\cdot1-1\cdot(-1)=2$$

the discriminant $\tau^2-4\delta=4-8=-4<0$, so the eigenvalues are

$$\lambda=\frac{2\pm\sqrt{-4}}{2}=1\pm i$$

the real part is positive, $\delta>0,\ \tau>0,\ \tau^2<4\delta$, so the origin is an unstable focus and trajectories spiral outward.

One may also verify directly: let $r^2=x^2+y^2$; then

$$rr'=xx'+yy'=x(x+y)+y(-x+y)=x^2+y^2=r^2$$

so $r'=r$ and the radius grows exponentially; meanwhile the angle satisfies $\theta'=1$ (computable), giving a logarithmic spiral.

> Comment: $\tau=2>0$ means "net expansion", $\delta=2>0$ means "both directions rotate with the same sign", and the imaginary part means rotation. Together they mean "rotate while moving outward"—an unstable focus.

### Example 2 (Intermediate: predator–prey model)

Problem: analyse the equilibria and trajectories of $\dot x=x(a-by),\ \dot y=-y(c-dx)$ with $a,b,c,d>0$.

Analysis: this is the classic Lotka–Volterra model, $x$ the prey and $y$ the predator. Solve the equilibrium equations first.

Solution: equilibria satisfy

$$x(a-by)=0,\qquad y(c-dx)=0$$

giving two equilibria: $O=(0,0)$ and $P=(c/d,\ a/b)$.

**At $O$**: the Jacobian

$$J=\begin{pmatrix}a-by&-bx\\dy&-c+dx\end{pmatrix}_{(0,0)}=\begin{pmatrix}a&0\\0&-c\end{pmatrix}$$

eigenvalues $a>0$ and $-c<0$ of opposite sign, so $O$ is a saddle. Ecologically: without prey the predator dies out, and without predators the prey grows exponentially.

**At $P$**: substituting $x^*=c/d,\ y^*=a/b$,

$$J=\begin{pmatrix}0&-b\cdot\frac{c}{d}\\d\cdot\frac{a}{b}&0\end{pmatrix}=\begin{pmatrix}0&-\frac{bc}{d}\\\frac{ad}{b}&0\end{pmatrix}$$

$$\tau=0,\qquad \delta=0\cdot0-\left(-\frac{bc}{d}\right)\left(\frac{ad}{b}\right)=ac>0$$

the eigenvalues satisfy $\lambda^2+ac=0$, i.e. $\lambda=\pm i\sqrt{ac}$; it is a centre (in the linearized sense). The linearization predicts closed elliptic trajectories.

**First integral**: let

$$H(x,y)=dx-c\ln x+by-a\ln y$$

then

$$H_x=d-\frac{c}{x},\qquad H_y=b-\frac{a}{y}$$

along trajectories,

$$H'=\left(d-\frac{c}{x}\right)x(a-by)+\left(b-\frac{a}{y}\right)\big(-y(c-dx)\big)$$

$$=(dx-c)(a-by)-(by-a)(c-dx)$$

note that $by-a=-(a-by)$, so the second term becomes $+(a-by)(c-dx)$, hence

$$H'=(a-by)\big[(dx-c)+(c-dx)\big]=0$$

so $H$ is a first integral and the trajectories are the level curves $H=C$. Near $P$, $H$ takes a minimum and the level curves are closed, so a family of periodic orbits surrounds $P$.

> Comment: the linearization gives "centre", but a centre is non-hyperbolic and strictly speaking the linearization cannot settle the matter. Here one must use the first integral $H$ to prove that the trajectories really are closed. This is the typical case of "beware of purely imaginary eigenvalues": if higher-order terms push the centre away, the linearization misleads.

### Example 3 (Advanced: limit cycle and polar coordinates)

Problem: discuss the trajectories of

$$x'=x-y-x(x^2+y^2),\qquad y'=x+y-y(x^2+y^2)$$

and prove that a stable limit cycle exists.

Analysis: the right side contains $x^2+y^2$, so polar coordinates are natural. Set $x=r\cos\theta,\ y=r\sin\theta$.

Solution: first compute $rr'=xx'+yy'$:

$$xx'+yy'=x\big(x-y-xr^2\big)+y\big(x+y-yr^2\big)$$

$$=x^2-xy-x^2r^2+xy+y^2-y^2r^2=r^2-r^4=r^2(1-r^2)$$

since $rr'=r^2(1-r^2)$, divide by $r$ for $r>0$:

$$r'=r(1-r^2)$$

then compute $\theta'$. From $\theta=\arctan(y/x)$,

$$\theta'=\frac{xy'-yx'}{r^2}=\frac{x\big(x+y-yr^2\big)-y\big(x-y-xr^2\big)}{r^2}$$

$$=\frac{x^2+xy-xyr^2-xy+y^2+xyr^2}{r^2}=\frac{r^2}{r^2}=1$$

so the system completely decouples in polar coordinates:

$$r'=r(1-r^2),\qquad \theta'=1$$

**Solve the $r$ equation**: separate variables,

$$\frac{dr}{r(1-r^2)}=dt$$

partial fractions $\dfrac{1}{r(1-r^2)}=\dfrac{1}{r}+\dfrac{r}{1-r^2}$, integrating gives

$$\ln r-\frac12\ln|1-r^2|=t+C$$

i.e.

$$\frac{r^2}{1-r^2}=Ae^{2t}\quad\Longrightarrow\quad r^2(t)=\frac{1}{1+Be^{-2t}}$$

with $B>0$ determined by the initial value. As $t\to+\infty$, $Be^{-2t}\to0$, so $r(t)\to1$, and

- if $0<r(0)<1$, then $r'>0$ and $r$ increases monotonically to $1$;
- if $r(0)>1$, then $r'<0$ and $r$ decreases monotonically to $1$.

Meanwhile $\theta=t+\theta_0$ rotates uniformly. Hence every nonzero trajectory spirals toward the unit circle $r=1$. The unit circle itself is a closed trajectory ($r'=0$ when $r\equiv1$), and there are no other closed trajectories nearby, so it is a stable limit cycle.

The origin $r=0$ is an equilibrium; from $r'\approx r$ it is unstable (nearby trajectories move away).

> Comment: polar coordinates turn this problem into two one-dimensional problems—the standard approach for symmetric systems. Note that $r'=r(1-r^2)$ has two equilibrium radii $r=0,1$: $r=0$ is the origin, $r=1$ the limit cycle. To judge stability, look only at the sign of $r'$ on either side: for $r$ slightly below $1$, $r'>0$; slightly above, $r'<0$; so $r=1$ attracts from both sides.
>
> Without polar coordinates one may also use the Poincaré–Bendixson theorem: take the annular region $K=\{1/2\le r\le2\}$; on $r=1/2$, $r'>0$ (outward), and on $r=2$, $r'<0$ (inward), so $K$ is positively invariant; $K$ contains no equilibrium; by the theorem, a closed trajectory exists in $K$. The Dulac criterion can then show it is unique.

## VI. Common Errors and Pitfalls

1. **Abusing linearization at non-hyperbolic equilibria**: wrong—still concluding "stable/centre" when eigenvalues are zero or purely imaginary. Why wrong—higher-order terms can change the qualitative behaviour. Right—use first integrals, Lyapunov functions, polar coordinates or centre-manifold analysis.
2. **Treating a centre as asymptotically stable**: wrong—saying a centre "eventually returns to the origin". Why wrong—the trajectories of a centre are closed curves; it is stable but not asymptotically so. Right—distinguish "bounded" from "convergent".
3. **Not finding all equilibria**: wrong—analysing after solving for only one pair $(x,y)$. Why wrong—a nonlinear equation may have several solutions, each of which must be classified separately. Right—solve all solutions of $f=g=0$ first, then compute the Jacobian at each.
4. **Calling a saddle "semi-stable"**: wrong—thinking a saddle is overall stable because it has a stable direction. Why wrong—stability requires no initial condition to escape far; a saddle escapes exponentially along its unstable manifold. Right—a saddle is unstable overall.
5. **Confusing closed trajectories with limit cycles**: wrong—calling any ring of closed trajectories a limit cycle. Why wrong—a limit cycle must be isolated; around a centre there is a continuous family of closed trajectories, not a limit cycle. Right—check whether other closed trajectories exist nearby.
6. **Using Poincaré–Bendixson in three dimensions**: wrong—using "bounded and no equilibrium implies a closed trajectory" in a higher-dimensional system. Why wrong—the theorem is planar only; in three dimensions strange attractors and chaos may appear. Right—use other tools in higher dimensions (Lyapunov functions, numerical methods).
7. **Sign errors in the Dulac criterion**: wrong—computing only $f_x+g_y$ and forgetting the product differentiation after multiplying by $B$. Why wrong—the criterion uses the divergence $\partial(Bf)/\partial x+\partial(Bg)/\partial y$, and for non-constant $B$ there are extra terms $B_xf+B_yg$. Right—multiply by $B$ first, then take the divergence, or simply test with $B=1$.

## VII. Summary and Mnemonic

Key points:

- The phase plane flattens time and studies autonomous systems through the geometry of trajectories.
- Classify equilibria by the Jacobian eigenvalues: $\delta<0$ saddle; $\delta>0$ look at $\tau$ and the discriminant for node/focus; $\tau=0,\delta>0$ linear centre.
- Linearization is reliable only when hyperbolic (no zero real parts); purely imaginary and zero eigenvalues need nonlinear analysis.
- Closed trajectories correspond to periodic solutions; a limit cycle is an isolated closed trajectory describing self-excited oscillation.
- Poincaré–Bendixson (planar): compact positively invariant region + no equilibrium ⟹ a closed trajectory exists.
- The Dulac criterion uses divergence to rule out closed trajectories; first integrals use level curves to prove them.

**Mnemonic: first find the equilibria in the phase portrait, then use trace and determinant to classify; saddle, node, centre, focus—a limit cycle is an isolated loop.**`,
    keyPoints: [
      'The phase plane uses the state (x,y) as coordinates; trajectories represent the motion',
      'Equilibria are classified by the eigenvalues of the linearized Jacobian',
      'Saddle (real roots of opposite sign) unstable; node (same sign) stable or unstable; centre (purely imaginary) conservative; focus (complex roots) spiral',
      'A limit cycle is an isolated closed trajectory, its existence judged by the Poincaré–Bendixson theorem',
      'The phase portrait answers stability questions qualitatively, with no explicit solution',
    ],
    relatedProblemIds: [],
  },

  'stability-theory': {
    chapter: 'Chapter 7 Stability Theory',
    title: 'Lyapunov Stability',
    summary:
      'Lyapunov\'s direct method needs no solution of the differential equation: construct a positive definite "energy" function V and see whether it decreases along trajectories, and the stability of an equilibrium is settled. It is one of the most central tools of control theory and dynamical systems.',
    content: String.raw`

In engineering the most pressing question is often not "how does the system move" but "will it return to its original position by itself". An inverted pendulum topples at a light touch—unstable; a ball at the bottom of a bowl, pushed, rocks a few times and returns—asymptotically stable; in a frictionless bowl, a pushed ball circles the wall forever—stable but not asymptotically.

If a system has an analytic solution, judging stability is just looking at the limit as $t\to\infty$. But the vast majority of nonlinear systems cannot be solved. Lyapunov's genius was this: **do not solve the equation, find an "energy function"**. If energy only decreases along the motion (dissipated by friction), the system will sooner or later stop at the minimum-energy point; if energy is conserved, it circles on an equal-energy surface.

This "energy function" was later abstracted into the Lyapunov function $V$: it need not be a real physical energy, only positive definite, with a derivative along trajectories that is not positive. It is like a topographic map, turning the abstract stability problem into the geometric question "how does a ball roll inside a bowl".

## II. Rigorous Definitions

Consider the autonomous system

$$\vec{x}'=\vec{F}(\vec{x}),\qquad \vec{F}(0)=0$$

i.e. the origin is an equilibrium (any equilibrium can be moved to the origin by translation).

**Lyapunov stability**: for every $\varepsilon>0$ there is $\delta>0$ such that $\|\vec{x}(0)\|<\delta$ implies, for all $t\ge0$,

$$\|\vec{x}(t)\|<\varepsilon$$

In words: if the initial value is close enough to the origin, the whole trajectory stays near the origin forever.

**Asymptotic stability**: stability plus

$$\lim_{t\to\infty}\vec{x}(t)=0$$

**Exponential stability**: there are constants $C,\alpha>0$ with $\|\vec{x}(t)\|\le C\|\vec{x}(0)\|e^{-\alpha t}$. It is stronger than asymptotic stability and gives the rate of convergence.

**Positive and negative definiteness**: let $V$ be continuously differentiable on a neighbourhood $D$ of the origin with $V(0)=0$.

- if $V(\vec{x})>0$ for all $\vec{x}\ne0$ in $D$, $V$ is **positive definite**;
- if $-V$ is positive definite, $V$ is **negative definite**;
- if $V(\vec{x})\ge0$, **positive semidefinite**; if $V(\vec{x})\le0$, **negative semidefinite**.

**Derivative along trajectories**:

$$\dot V(\vec{x})=\frac{d}{dt}V\big(\vec{x}(t)\big)=\nabla V(\vec{x})\cdot\vec{F}(\vec{x})=\sum_{i=1}^{n}\frac{\partial V}{\partial x_i}F_i(\vec{x})$$

note that it is differentiated along the trajectories of the system, not a partial derivative with respect to $t$.

**Lyapunov function**: if a positive definite $V$ makes $\dot V$ negative semidefinite ($\dot V\le0$), then $V$ is a Lyapunov function for the equilibrium.

**Lyapunov stability theorems**:

1. If a positive definite $V$ with $\dot V\le0$ exists, the origin is stable;
2. if moreover $\dot V$ is negative definite, the origin is asymptotically stable;
3. if $V$ is positive definite, $\dot V\le0$, and the set $\{\dot V=0\}$ contains no complete trajectory other than the origin, the origin is asymptotically stable (LaSalle's invariance principle).

**Global asymptotic stability**: if $V$ is positive definite on all of $\mathbb{R}^n$, $\dot V$ negative definite, and $V$ is radially unbounded ($V(\vec{x})\to\infty$ as $\|\vec{x}\|\to\infty$), the origin is globally asymptotically stable.

**Chetaev's instability theorem**: if there is a function $V$ (not necessarily positive definite) and a region $U$ arbitrarily close to the origin such that $V>0$ and $\dot V>0$ in $U$, then the origin is unstable.

**Lyapunov equation**: for a linear system $\vec{x}'=A\vec{x}$, the matrix equation

$$A^{\mathsf T}P+PA=-Q$$

is the Lyapunov equation. If all eigenvalues of $A$ have negative real part ($A$ is Hurwitz), then for every positive definite $Q$ there is a unique positive definite solution $P$.

## III. Why Defined This Way

**Why does $\dot V\le0$ imply stability?** Let $V$ be positive definite. Given $\varepsilon>0$, take the ball $B_\varepsilon=\{\|\vec{x}\|<\varepsilon\}$. On the boundary of $B_\varepsilon$ (a compact set), $V$ attains a positive minimum $m>0$. Since $V$ is continuous and $V(0)=0$, there is $\delta>0$ such that $V(\vec{x})<m$ whenever $\|\vec{x}\|<\delta$. If the initial value satisfies $\|\vec{x}(0)\|<\delta$, then $V(\vec{x}(0))<m$; and $\dot V\le0$ means $V(\vec{x}(t))$ is non-increasing, so for all $t\ge0$, $V(\vec{x}(t))\le V(\vec{x}(0))<m$. If at some time the trajectory reached the boundary of $B_\varepsilon$, there $V\ge m$, a contradiction. So the trajectory stays in $B_\varepsilon$ forever—stability.

**Why does negative definite $\dot V$ give asymptotic stability?** Now $V(\vec{x}(t))$ decreases strictly and is bounded below by $0$, so the limit $L\ge0$ exists. If $L>0$, the trajectory stays in the compact set $\{V\ge L\}$, on which $\dot V$ has a strictly negative upper bound $-\eta<0$, so $V$ would fall below $L$ in finite time—a contradiction. Hence $L=0$. Since $V$ is positive definite with $V(0)=0$, it follows that $\vec{x}(t)\to0$ (a rigorous argument also uses the continuity of $V$).

**Why is $\dot V\le0$ not enough for asymptotic stability?** Consider the centre system

$$x'=-y,\qquad y'=x$$

take $V=x^2+y^2$; then

$$\dot V=2x(-y)+2y(x)=0$$

$\dot V$ is negative semidefinite but identically zero. The trajectories are circles around the origin and never approach it. So between "stable" and "asymptotically stable" lies the case "energy no longer decreases". For asymptotic stability the system must not be able to remain in $\{\dot V=0\}$—exactly the condition of LaSalle's invariance principle.

**Why is LaSalle's principle needed?** For many physical systems the energy derivative is only negative semidefinite. For a damped pendulum, energy does not decrease at the instant the velocity is zero, and $\dot V=0$ occurs on the whole line $y=0$. From $\dot V\le0$ alone one gets only stability; but a point on $y=0$ that stays there needs $y'=0$, i.e. $\sin x=0$, which only the equilibria satisfy. So a trajectory cannot linger in $\{\dot V=0\}$ and still tends to the origin. LaSalle's principle makes this case—"energy does not increase but cannot stay put forever"—rigorous.

**Why must $V$ be positive definite?** If $V$ is not sign definite, its level surfaces are not closed surfaces enclosing the origin; a trajectory can cross $V=0$ into the region $V<0$, and $\dot V\le0$ then only says it descends along some direction, not that it is confined near the origin. For example $V=x^2-y^2$ near a saddle has $\dot V>0$ exactly in the unstable direction, and can be used instead to prove instability (Chetaev).

**Why can a linear system use the Lyapunov equation?** Let $V=\vec{x}^{\mathsf T}P\vec{x}$ with $P$ symmetric positive definite. Then

$$\dot V=\vec{x}^{\mathsf T}A^{\mathsf T}P\vec{x}+\vec{x}^{\mathsf T}PA\vec{x}=\vec{x}^{\mathsf T}(A^{\mathsf T}P+PA)\vec{x}$$

if $P$ satisfies $A^{\mathsf T}P+PA=-Q$, then $\dot V=-\vec{x}^{\mathsf T}Q\vec{x}$. Taking $Q=I$ gives $\dot V=-\|\vec{x}\|^2$, negative definite, and asymptotic stability follows at once. The construction is necessary and sufficient: $A$ is Hurwitz if and only if for every $Q>0$ the equation has a unique positive definite solution $P$.

**Why does "failing to find $V$" not mean instability?** Lyapunov's theorem is a sufficient condition, not a necessary one. Converse theorems guarantee that an asymptotically stable system always has a Lyapunov function, but that function may be very complicated, even impossible to write explicitly. Failing to find one only means "not found"; it is no basis for a conclusion. To prove instability, use Chetaev's theorem or linearization (when an eigenvalue with positive real part exists).

## IV. Intuition and Pictures

Think of $V$ as terrain height, with the origin the lowest point:

| Condition | Geometric picture | Conclusion |
|---|---|---|
| $V>0,\ \dot V\le0$ | a bowl; the ball only goes down | stable |
| $V>0,\ \dot V<0$ | a bowl; the ball keeps rolling down | asymptotically stable |
| $V>0,\ \dot V=0$ | a smooth frictionless bowl wall; the ball circles at constant height | stable, not asymptotically |
| $V>0$ can be arbitrarily small, $\dot V>0$ reachable | a hilltop; the ball is pushed away | unstable |

> Intuition: the level surfaces of $V$ are rings of "contour lines". $\dot V<0$ means trajectories always cross from high contours to low ones, like water flowing downhill; $\dot V=0$ means they follow one contour; $\dot V>0$ means going uphill, and sooner or later leaving.

Right versus wrong:

- Wrong: any "energy" will do as $V$. Right: $V$ must vanish at the origin and be locally positive definite; a physical energy need not qualify (for example a potential with a constant term must first be shifted so the equilibrium is at zero).
- Wrong: $\dot V\le0$ implies asymptotic stability. Right: one needs $\dot V$ negative definite, or LaSalle's principle to exclude "resting in $\{\dot V=0\}$".
- Wrong: only eigenvalues with negative real part count as stable. Right: that is only a sufficient condition for local asymptotic stability; a nonlinear system may have a non-hyperbolic stable equilibrium.

## V. Worked Examples

### Example 1 (Basic: a quadratic Lyapunov function)

Problem: use the direct method to judge the stability of the origin for $\dot x=-x+y,\ \dot y=-2y$.

Analysis: the right side is linear, with $A=\begin{pmatrix}-1&1\\0&-2\end{pmatrix}$ and eigenvalues $-1,-2$, both negative, so it should be asymptotically stable. Verify with $V=x^2+y^2$.

Solution: $V=x^2+y^2$ is positive definite. Along trajectories,

$$\dot V=2x\dot x+2y\dot y=2x(-x+y)+2y(-2y)$$

$$=-2x^2+2xy-4y^2$$

complete the square:

$$-2x^2+2xy-4y^2=-2\left(x^2-xy+\frac{y^2}{4}\right)-\frac{7}{2}y^2=-2\left(x-\frac{y}{2}\right)^2-\frac{7}{2}y^2$$

both squared terms have negative coefficients and vanish only when $x-\frac{y}{2}=0$ and $y=0$ (i.e. $x=y=0$), so $\dot V$ is negative definite. By Lyapunov's theorem the origin is asymptotically stable.

Check the completion of the square: $-2(x-y/2)^2=-2x^2+2xy-y^2/2$, and adding $-7y^2/2$ gives $-2x^2+2xy-4y^2$, correct.

> Comment: $V=x^2+y^2$ is not a magic key "guessed" at random. It works here because the eigenvalues of $A$ are negative real and the coupling term $xy$ is small. With stronger coupling, $x^2+y^2$ may give an indefinite $\dot V$, and one must switch to $V=\vec{x}^{\mathsf T}P\vec{x}$ (see Example 3).

### Example 2 (Intermediate: damped pendulum and LaSalle's principle)

Problem: discuss the stability of the origin for the damped pendulum $x'=y,\ y'=-\sin x-y$.

Analysis: take the total energy $V=\dfrac12y^2+(1-\cos x)$. Near the origin $1-\cos x\approx\dfrac{x^2}{2}\ge0$, so $V$ is positive definite; it is exactly "kinetic + potential energy".

Solution: $V(0,0)=0$, and in some neighbourhood of the origin ($|x|<2\pi$), $V>0$ except at the origin, so it is positive definite. Along trajectories,

$$\dot V=y\dot y+\sin x\cdot\dot x=y(-\sin x-y)+\sin x\cdot y=-y^2\le0$$

so the origin is stable. But $\dot V$ is only negative semidefinite: $\dot V=0$ on the whole line $y=0$, so asymptotic stability does not follow directly.

Use LaSalle's invariance principle. Suppose a trajectory stays forever in $\{\dot V=0\}=\{y=0\}$. If $y\equiv0$, then $y'\equiv0$; but $y'=-\sin x-y=-\sin x$, so we must have $\sin x=0$, i.e. $x=k\pi$. In a small neighbourhood of the origin only $x=0$ qualifies. So the only complete trajectory in $\{\dot V=0\}$ is the origin. By LaSalle's principle the origin is asymptotically stable.

Physically: energy is dissipated by damping ($\dot V=-y^2$), but not at the instants when the velocity is zero; the pendulum cannot stay forever at a non-equilibrium position with zero velocity, so it must end at the lowest point.

> Comment: this is the standard model of "$\dot V$ negative semidefinite but not negative definite". Saying "$\dot V\le0$, hence asymptotically stable" directly is wrong; one must add the argument that "$\{\dot V=0\}$ contains no other invariant set". Conversely, for the undamped pendulum ($y'=-\sin x$) one has $\dot V\equiv0$, energy is conserved, the trajectories are closed equal-energy curves, and it is stable but not asymptotically stable—the two problems differ by one damping term, yet the conclusions differ completely.

### Example 3 (Advanced: the Lyapunov equation)

Problem: for $A=\begin{pmatrix}0&1\\-2&-3\end{pmatrix}$, solve the Lyapunov equation $A^{\mathsf T}P+PA=-I$ and verify that $V=\vec{x}^{\mathsf T}P\vec{x}$ gives asymptotic stability.

Analysis: let $P=\begin{pmatrix}a&b\\b&c\end{pmatrix}$ be symmetric and compare entries.

Solution: first compute

$$A^{\mathsf T}P=\begin{pmatrix}0&-2\\1&-3\end{pmatrix}\begin{pmatrix}a&b\\b&c\end{pmatrix}=\begin{pmatrix}-2b&-2c\\a-3b&b-3c\end{pmatrix}$$

$$PA=\begin{pmatrix}a&b\\b&c\end{pmatrix}\begin{pmatrix}0&1\\-2&-3\end{pmatrix}=\begin{pmatrix}-2b&a-3b\\-2c&b-3c\end{pmatrix}$$

adding:

$$A^{\mathsf T}P+PA=\begin{pmatrix}-4b&a-3b-2c\\a-3b-2c&2b-6c\end{pmatrix}=\begin{pmatrix}-1&0\\0&-1\end{pmatrix}$$

comparing the four entries:

$$-4b=-1\ \Longrightarrow\ b=\frac14$$

$$2b-6c=-1\ \Longrightarrow\ \frac12-6c=-1\ \Longrightarrow\ c=\frac14$$

$$a-3b-2c=0\ \Longrightarrow\ a=\frac34+\frac12=\frac54$$

so

$$P=\begin{pmatrix}\frac54&\frac14\\[2pt]\frac14&\frac14\end{pmatrix}$$

positive definiteness: the leading principal minor $\frac54>0$ and determinant $\frac54\cdot\frac14-\frac1{16}=\frac5{16}-\frac1{16}=\frac14>0$, so $P$ is positive definite.

Then $V=\vec{x}^{\mathsf T}P\vec{x}=\frac54x^2+\frac12xy+\frac14y^2$ is positive definite, and

$$\dot V=\vec{x}^{\mathsf T}(A^{\mathsf T}P+PA)\vec{x}=-\vec{x}^{\mathsf T}\vec{x}=-x^2-y^2$$

negative definite, so the origin is asymptotically stable.

One may also expand directly: $\dot V=\frac52x\dot x+\frac12(\dot xy+x\dot y)+\frac12y\dot y$; substituting $\dot x=y,\ \dot y=-2x-3y$ and simplifying also gives $-x^2-y^2$.

> Comment: the Lyapunov equation turns "finding $V$" into "solving a linear system", the most practical method for linear systems. Note that $Q$ must be positive definite; with an arbitrary positive semidefinite $Q$ the resulting $P$ may not be positive definite and no conclusion follows. Also, $A$ must be Hurwitz (all eigenvalues with negative real part), otherwise the equation may have no solution or a non-positive-definite one.

## VI. Common Errors and Pitfalls

1. **Confusing stable with asymptotically stable**: wrong—concluding from $\dot V\le0$ that the system "returns to the origin". Why wrong—for a centre $\dot V=0$ and it is only stable. Right—asymptotic stability needs $\dot V$ negative definite, or LaSalle's principle to exclude other invariant sets.
2. **Concluding when $V$ is not positive definite**: wrong—taking an arbitrary function as a Lyapunov function. Why wrong—if $V$ is not positive definite its level surfaces do not enclose the origin, and $\dot V\le0$ cannot confine the trajectory. Right—verify $V(0)=0$ and $V>0$ in a neighbourhood of the origin.
3. **Missing terms in $\dot V$**: wrong—writing $\dot V$ as $\partial V/\partial t$, or differentiating only the explicit $x$. Why wrong—the derivative along trajectories uses the chain rule $\dot V=\nabla V\cdot\vec{F}$. Right—sum $\partial V/\partial x_i$ times $F_i$.
4. **Errors in completing the square or judging definiteness**: wrong—giving up when $-2x^2+2xy-4y^2$ has an unclear sign. Why wrong—quadratic definiteness has systematic criteria (completing the square, leading principal minors, eigenvalues). Right—complete the square into a sum, or write it as a matrix and use minors.
5. **Thinking failure to find $V$ means instability**: wrong—declaring instability after a few failed attempts. Why wrong—Lyapunov's theorem is sufficient; the converse only guarantees existence, not easy discovery. Right—use Chetaev's theorem, linearization (positive real part) or numerical methods to prove it another way.
6. **Forgetting radial unboundedness for global stability**: wrong—declaring global asymptotic stability from positive definite $V$ and negative definite $\dot V$. Why wrong—if the level surfaces of $V$ are not closed at infinity, trajectories may escape to infinity. Right—also verify $V(\vec{x})\to\infty$ as $\|\vec{x}\|\to\infty$.
7. **Using stability conclusions away from an equilibrium**: wrong—computing a Jacobian at an arbitrary point and discussing "stability". Why wrong—stability is a property of equilibria. Right—find the equilibrium first, then translate or linearize there.

## VII. Summary and Mnemonic

Key points:

- Stable: initial values close enough, trajectories stay nearby; asymptotically stable: and converge to the equilibrium; exponentially stable: convergence at an exponential rate.
- Direct method: construct positive definite $V$ and look at the sign of $\dot V=\nabla V\cdot\vec{F}$.
- $\dot V\le0$ gives stability; negative definite $\dot V$ gives asymptotic stability; $\dot V\le0$ with no other invariant set in $\{\dot V=0\}$ gives asymptotic stability by LaSalle.
- $V$ is like an energy bowl: the ball only rolls down and eventually rests at the bottom; with conserved energy it circles on a contour.
- Linear systems: solve $A^{\mathsf T}P+PA=-Q$, $V=\vec{x}^{\mathsf T}P\vec{x}$, $\dot V=-\vec{x}^{\mathsf T}Q\vec{x}$.
- Failure to find $V$ is not instability; prove instability with Chetaev or a positive-real-part eigenvalue.

**Mnemonic: build V like a bowl, differentiate along the trajectory to see rise or fall; V positive and dotV negative, and it comes back asymptotically.**`,
    keyPoints: [
      'Stable (Lyapunov sense): small initial disturbance, the solution stays bounded and nearby',
      'Asymptotically stable: not only stable, but tending to the equilibrium over time',
      'Direct method: V > 0 with derivative along trajectories ≤ 0 gives stability; < 0 gives asymptotic stability',
      'The V function is like an energy bowl placed over the equilibrium, opening upward',
      'Instability is decided by Chetaev\'s theorem',
    ],
    relatedProblemIds: [],
  },
};

export default map;
