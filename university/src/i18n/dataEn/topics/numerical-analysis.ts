import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'function-approximation': {
    chapter: 'Chapter 1 Interpolation and Approximation',
    title: 'Function Approximation and Least Squares',
    summary:
      'Do not insist on passing through every point; make the overall deviation smallest instead. Least squares turns fitting into projection, and the normal equations are its algebraic incarnation.',
    content: String.raw`

On New Year's Day 1801 the Italian astronomer Piazzi found a faint star near Taurus; after 41 days of tracking it vanished into the glare of the Sun. Astronomy then had to answer two questions: will it come back, and where will it appear? The young Gauss computed its orbit from a set of imprecise observations, and at the end of the year astronomers did indeed find Ceres near the predicted position. The tool Gauss used was the method of least squares.

This story points to the central tension of the subject: **the data carry error, and a model must not treat that error as truth**. Suppose you measure a hundred points, each with a measurement noise of $\pm 0.01$. Can you draw a curve that passes through every one of them exactly? Of course you can, with a polynomial of degree ninety-nine. But that curve will oscillate wildly between neighbouring points, and its predictive power may be worse than a simple straight line.

Two kinds of problem therefore arise. The first is **interpolation**: the curve must pass strictly through every data point. It suits cases where the data themselves are trustworthy and only intermediate values are wanted, such as looking up a trigonometric table. The second is **approximation**: the curve need not pass through the points, only minimize the overall deviation from the data. It suits noisy data from which a trend is to be extracted, such as fitting a physical law to measurements. This topic treats the second kind, with emphasis on **least squares**.

A teaser first: what does "smallest overall deviation" mean? Would adding up the errors of all points do? Why do textbooks insist on the sum of squared errors? Behind that choice lies an entire foundation of linear algebra—projection.

## 2. Rigorous Definitions

Let the data points be $(x_i, y_i)$, $i = 1, \dots, m$, with the $x_i$ distinct; give each point a positive weight $\omega_i > 0$ expressing how reliable it is.

**Definition 1 (discrete least-squares fitting)** Let $\mathcal{P}_n$ be the set of all polynomials of degree at most $n$. If $p^* \in \mathcal{P}_n$ satisfies

$$\sum_{i=1}^{m}\omega_i\big(p^*(x_i)-y_i\big)^2 = \min_{p\in\mathcal{P}_n}\sum_{i=1}^{m}\omega_i\big(p(x_i)-y_i\big)^2$$

then $p^*$ is the **least-squares fitting polynomial** of these data in $\mathcal{P}_n$. When $\omega_i\equiv 1$ it is called ordinary least squares.

Note the relation between $n$ and $m$: usually $n \ll m-1$. At most $m-1$ points determine an interpolating polynomial of degree $m-1$; once $n \ge m$ there are more constraints than degrees of freedom, and least squares degenerates into interpolation (zero residual) or has no unique solution at all.

**Definition 2 (continuous best approximation in the mean square)** Let $f\in C[a,b]$. If $p^*\in\mathcal{P}_n$ satisfies

$$\int_a^b \big(f(x)-p^*(x)\big)^2 dx = \min_{p\in\mathcal{P}_n}\int_a^b \big(f(x)-p(x)\big)^2 dx$$

then $p^*$ is the **best mean-square approximation polynomial** to $f$ on $[a,b]$.

**Definition 3 (normal equations)** Take a basis $\varphi_0,\varphi_1,\dots,\varphi_n$ and write a candidate polynomial as $p(x)=\sum_{j=0}^{n}c_j\varphi_j(x)$. Set

$$G_{jk}=\sum_{i=1}^{m}\omega_i\,\varphi_j(x_i)\varphi_k(x_i),\qquad d_j=\sum_{i=1}^{m}\omega_i\,y_i\,\varphi_j(x_i)$$

Then the least-squares solution $c=(c_0,\dots,c_n)^\mathsf{T}$ satisfies the linear system

$$Gc=d$$

$G$ is called the **Gram matrix** and these equations the **normal equations**. With $\varphi_j(x)=x^j$, $G$ is the Gram matrix of a Vandermonde matrix.

**Definition 4 (best uniform approximation)** If $p^*\in\mathcal{P}_n$ satisfies

$$\max_{a\le x\le b}|f(x)-p^*(x)| = \min_{p\in\mathcal{P}_n}\max_{a\le x\le b}|f(x)-p(x)|$$

then $p^*$ is the **best uniform approximation** (Chebyshev approximation). It minimizes the largest deviation, not the sum of squares.

**Definition 5 (orthogonal polynomials)** If the inner product $\langle f,g\rangle=\int_a^b \rho(x)f(x)g(x)dx$ (with $\rho>0$ a weight function) satisfies $\langle\varphi_j,\varphi_k\rangle=0$ for $j\ne k$, the family $\{\varphi_j\}$ is orthogonal with respect to the weight $\rho$. Then the Gram matrix is diagonal.

One existence theorem is worth remembering: the **Weierstrass theorem** says that a continuous function on a closed interval can be uniformly approximated by polynomials to any accuracy. It guarantees that approximation can in principle always be done, but says nothing about what degree to use or which basis is most economical.

## 3. Why It Is Defined This Way

**Why squares rather than absolute values?** There are three levels of reason. First, the square is differentiable everywhere, whereas the absolute value has a corner at zero, so differentiating raises the awkward question "is this point counted positive or negative", which is inconvenient in optimization theory. Second, the sum of squares can be written as an inner product: writing the residual vector $r=(p(x_1)-y_1,\dots,p(x_m)-y_m)^\mathsf{T}$, the sum of squares is $\|r\|_2^2=r^\mathsf{T}r$, so the whole problem becomes "find the nearest point in a subspace", and the projection theory of linear algebra applies directly. Third, the sum of squares punishes large errors severely: a tenfold error becomes a hundredfold when squared, which matches the engineering instinct "better many small errors than one big one".

**Why do the normal equations look like that?** Write the objective as $J(c)=\sum_i\omega_i\big(\sum_j c_j\varphi_j(x_i)-y_i\big)^2$. Differentiate with respect to each $c_k$ and set it to zero:

$$\frac{\partial J}{\partial c_k}=2\sum_{i=1}^{m}\omega_i\Big(\sum_{j=0}^{n}c_j\varphi_j(x_i)-y_i\Big)\varphi_k(x_i)=0$$

Splitting the sum, the first term is exactly $\sum_j G_{kj}c_j$ and the second is $d_k$, giving $Gc=d$. The derivation also reveals a geometric fact: **the residual is orthogonal to every basis function**. In other words, the optimal solution leaves an error with no component at all in the space spanned by the basis—which is precisely the definition of projection.

**Why does the choice of basis matter so much?** The coefficient matrix of the normal equations is $G=A^\mathsf{T}WA$, where $A$ is the $m\times(n+1)$ design matrix and $W$ the diagonal weight matrix. The condition numbers satisfy $\kappa(A^\mathsf{T}A)=\kappa(A)^2$. That is, **the normal equations square the ill-conditioning**. With the monomial basis $1,x,x^2,\dots$ and a wide spread of $x$, $G$ quickly becomes an ill-conditioned Hilbert-type matrix: at $n=8$ the condition number can reach $10^{10}$, and rounding error scrambles the coefficients beyond recognition. With an orthogonal basis, $G$ is diagonal, each coefficient can be found independently, and the conditioning problem disappears.

**Counterexample: what if the condition is not removable?** Least squares requires the basis functions to be linearly independent, otherwise $G$ is singular. Fit on $[-1,1]$ with the four functions $1$, $x$, $x^2$, $1+x+x^2$: the fourth is the sum of the first three, so the determinant of $G$ vanishes, the normal equations have infinitely many solutions, and the coefficients are completely undetermined—yet the fitted curve itself is still unique. This shows that "non-unique coefficients" and "non-unique curve" are two different things. In practice, linearly dependent basis functions should be removed deliberately.

**Why also uniform approximation?** The sum of squares tolerates a fit that is "good overall but out of tolerance somewhere". If the requirement is that no point exceed an error of 0.01 (a tolerance on a machined part, say), uniform approximation is necessary. The Chebyshev alternation theorem states that the error function $f-p^*$ of the best uniform approximation polynomial takes its maximum positive and negative values at least at $n+2$ points alternating in sign. This theorem is the mathematical statement of the "equal ripple" phenomenon.

## 4. Intuition and Pictures

Regard the data as a vector $y=(y_1,\dots,y_m)^\mathsf{T}$ in $m$-dimensional space, and the values of each basis function at the data points as column vectors $a_j=(\varphi_j(x_1),\dots,\varphi_j(x_m))^\mathsf{T}$. All possible fitted values $Ac$ form the column space $\mathrm{span}\{a_0,\dots,a_n\}$. Least squares seeks the point of that subspace nearest to $y$.

> Intuition: imagine a lamp shining perpendicularly onto a tabletop. $y$ is a point in the air and the column space is the tabletop, so $Ac$ is the shadow (orthogonal projection) of $y$ on the table and the residual $y-Ac$ is the perpendicular projection line. The shadow is closest to the origin exactly when the projection line is perpendicular to the tabletop.

From this the Pythagorean relation follows at once:

$$\|y\|^2=\|Ac\|^2+\|y-Ac\|^2$$

Minimizing the residual is equivalent to maximizing the length of the projection, which is where the word "projection" comes from.

Comparing the three notions of "closeness":

| Criterion | Objective | Character | Typical use |
|---|---|---|---|
| Interpolation | zero error at every point | passes exactly, may oscillate | tables, computer graphics |
| Least squares | smallest sum of squares | smooth, sensitive to outliers | fitting experimental data |
| Uniform approximation | smallest maximum error | equal ripple, conservative | tolerance control, hardware tables |

Consider also the shape of the norms: in the plane the unit ball of the 2-norm is a circle, of the 1-norm a diamond, and of the infinity norm a square. Measuring "smallness" with different norms puts the optimum in different places, which also explains why the same data give different straight lines under least squares and under uniform approximation.

## 5. Worked Examples

### Example 1 (basic: the full normal equations for a straight-line fit)

Problem: fit the data $(0,1),(1,3),(2,4)$ with the line $p(x)=a+bx$; find $a$, $b$, and the squared error.

Analysis: $m=3$ with basis $\varphi_0=1,\varphi_1=x$, two unknowns, an overdetermined system with no exact solution in general, so use least squares.

Solution: compute the four sums first:

$$\sum x_i=0+1+2=3,\qquad \sum x_i^2=0+1+4=5$$

$$\sum y_i=1+3+4=8,\qquad \sum x_iy_i=0\cdot1+1\cdot3+2\cdot4=11$$

The normal equations are

$$3a+3b=8,\qquad 3a+5b=11$$

Subtracting the first from the second gives $2b=3$, so $b=\dfrac32$; substituting back gives $3a=8-\dfrac92=\dfrac72$, that is $a=\dfrac76$. Hence

$$p(x)=\frac76+\frac32 x$$

The three residuals are

$$r_0=\frac76-1=\frac16,\qquad r_1=\frac76+\frac32-3=-\frac13,\qquad r_2=\frac76+3-4=\frac16$$

and the squared error is

$$J=\frac{1}{36}+\frac{1}{9}+\frac{1}{36}=\frac{1+4+1}{36}=\frac16$$

Check the orthogonality: $\sum r_i=\dfrac16-\dfrac13+\dfrac16=0$ and $\sum x_ir_i=0-\dfrac13+\dfrac13=0$. The residual is orthogonal to both basis functions $1$ and $x$, so the normal equations were solved correctly.

> Comment: the two rows of the normal equations are exactly "the residual is orthogonal to 1" and "the residual is orthogonal to x". Remembering this geometric meaning is more reliable than memorizing the matrix formula.

### Example 2 (advanced: continuous best mean-square approximation compared with uniform approximation)

Problem: on $[0,1]$ find the best mean-square straight line $p(x)=a+bx$ for $f(x)=x^2$, then the best uniform straight line, and compare them.

Analysis: in the continuous case sums become integrals, and the coefficients of the normal equations are $\int_0^1 1\,dx$, $\int_0^1 x\,dx$ and so on.

Solution: the normal equations are

$$a\int_0^1 1\,dx+b\int_0^1 x\,dx=\int_0^1 x^2dx,\qquad a\int_0^1 x\,dx+b\int_0^1 x^2dx=\int_0^1 x^3dx$$

Evaluating the integrals:

$$a+\frac{b}{2}=\frac13,\qquad \frac{a}{2}+\frac{b}{3}=\frac14$$

From the first, $a=\dfrac13-\dfrac b2$; substituting into the second:

$$\frac16-\frac b4+\frac b3=\frac14\quad\Longrightarrow\quad \frac{b}{12}=\frac{1}{12}\quad\Longrightarrow\quad b=1$$

so $a=\dfrac13-\dfrac12=-\dfrac16$ and the best mean-square approximation is

$$p_2(x)=x-\frac16$$

Its largest error occurs at the endpoints: $p_2(0)=-\dfrac16$ and $p_2(1)=\dfrac56$, so the maximum deviation is $\dfrac16$.

Now the uniform approximation. Write $q(x)=x+c$, with error $e(x)=x^2-x-c$. On $[0,1]$ its extrema occur at $x=0$, $x=1$, and the stationary point $x=\dfrac12$. For equal ripple we need

$$e(0)=-c,\qquad e\!\left(\frac12\right)=-\frac14-c,\qquad e(1)=-c$$

The three values must alternate in sign with equal magnitude, so $-c=\dfrac14+c$, giving $c=-\dfrac18$. Then $e(0)=e(1)=\dfrac18$ and $e\left(\dfrac12\right)=-\dfrac18$. Hence

$$q^*(x)=x-\frac18,\qquad \max|f-q^*|=\frac18$$

Comparison: the constant term is $-\dfrac16\approx-0.1667$ for the mean-square fit and $-\dfrac18=-0.125$ for the uniform fit. The mean-square fit spends more of its error budget on most of the points and leaves larger errors at the ends; the uniform fit spreads the error evenly, giving a smaller maximum error ($\dfrac18<\dfrac16$) but a larger overall squared error. That is the trade-off between the two criteria.

> Comment: same function, same degree, same interval, yet the two "best" fits differ. If an examination asks for the "best approximation" without naming the norm, you must ask whether the mean-square or the uniform norm is meant.

### Example 3 (challenging: the ill-conditioning trap of the normal equations)

Problem: fit the line $y=a+bx$ to the data $(1,2),(1.01,2.01),(1.02,2.02)$. Solve exactly first, then perturb $\sum x_i^2$ by $3\times10^{-5}$ (a relative perturbation of about $10^{-5}$) and watch how the solution changes.

Analysis: the three $x$ values crowd together, the two columns of the design matrix are nearly parallel, and the normal equations are extremely ill-conditioned.

Solution: $\sum x_i=3.03$, $\sum x_i^2=1+1.0201+1.0404=3.0605$, $\sum y_i=6.03$, $\sum x_iy_i=2+2.0301+2.0604=6.0905$. The normal equations are

$$3a+3.03b=6.03,\qquad 3.03a+3.0605b=6.0905$$

The coefficient determinant is

$$\Delta=3\times3.0605-3.03^2=9.1815-9.1809=0.0006$$

From the first equation $a=2.01-1.01b$; substituting into the second:

$$3.03(2.01-1.01b)+3.0605b=6.0905$$

$$6.0903-3.0603b+3.0605b=6.0905\quad\Longrightarrow\quad 0.0002b=0.0002$$

so $b=1$ and $a=1$: the exact solution is $p(x)=1+x$, fitting the data perfectly.

Now change $3.0605$ to $3.0606$. Substituting in the same way:

$$6.0903-3.0603b+3.0606b=6.0905\quad\Longrightarrow\quad 0.0003b=0.0002$$

$$b=\frac23\approx0.6667,\qquad a=2.01-1.01\times\frac23\approx1.3367$$

The slope changes from $1$ to $0.667$, a change of about thirty-three percent, for an input perturbation of only about $3\times10^{-5}$—an amplification of roughly $10^4$.

As for the condition number: the two eigenvalues of $G$ satisfy trace $6.0605$ and determinant $0.0006$, so $\lambda_{\max}\approx6.0605$, $\lambda_{\min}\approx0.0001$, and $\kappa_2(G)\approx6\times10^4$. Since $\kappa(G)=\kappa(A)^2$, $\kappa(A)\approx245$. The normal equations square the condition number, and that is the root of the unreliability of high-degree monomial fitting.

> Comment: the trap here is that "the exact solution is perfectly nice". Judging by the first part alone you would think the method is fine; in reality, as soon as coefficients are rounded the answer is unrecognizable. The right approach is to centre $x$ first (subtract the mean), or to use orthogonal polynomials or a QR factorization, avoiding the explicit formation of $A^\mathsf{T}A$.

## 6. Common Errors and Pitfalls

1. **Saying that least squares makes the curve pass through the points.** Least squares is defined as minimizing the sum of squared residuals; unless the constant term happens to be zero, the curve does not pass through the data points. To draw a curve through all points on seeing the word "fit" is to confuse interpolation with approximation.
2. **Writing the normal equations as $AA^\mathsf{T}c=y$.** The correct form is $A^\mathsf{T}Ac=A^\mathsf{T}y$. Quick check: with $A$ of size $m\times(n+1)$, $A^\mathsf{T}A$ must be $(n+1)\times(n+1)$, matching the number of unknowns; $AA^\mathsf{T}$ is $m\times m$ and has the wrong dimension.
3. **Solving the normal equations directly with a high-degree monomial basis.** For moderately large $n$ (eight or more) the condition number of $G$ explodes. Centre and scale first, or use orthogonal polynomials, QR, or the singular value decomposition. Criterion: if $\kappa(G)$ approaches $1/\varepsilon_{\text{mach}}\approx10^{16}$, not a single digit of the computed coefficients is trustworthy.
4. **Forgetting the weights or the units.** If the measurement precision differs greatly between points, take $\omega_i=1/\sigma_i^2$ ($\sigma_i$ being the standard deviation at that point). With wrong weights the fit is dragged off by the least reliable points.
5. **Blaming the algorithm for a wrongly chosen model.** Fit a straight line to obviously curved data and the residuals show systematic curvature (regular alternation of sign); then increase the degree or change the model rather than endlessly tuning weights. Looking at a residual plot reveals more than looking at the coefficient of determination.
6. **Treating goodness of fit as a licence to extrapolate.** A good fit inside the sample only says the error inside the sample is small; outside the data range a polynomial can diverge rapidly. Before extrapolating, confirm that the model has physical justification.

## 7. Summary and Mnemonics

- Interpolation demands equality at every point; approximation demands only that the overall error be smallest. They solve different problems.
- Least squares is an orthogonal projection onto the column space; the normal equations $A^\mathsf{T}Ac=A^\mathsf{T}y$ are the algebraic statement of "the residual is orthogonal to the basis".
- The normal equations square the condition number, so high-degree monomial bases are unreliable; an orthogonal basis diagonalizes the Gram matrix.
- The mean-square and uniform criteria give different answers; which to choose depends on whether average or worst-case error is to be controlled.
- In the continuous case sums become integrals, and the discrete and continuous derivations are exactly parallel.

**Mnemonic: interpolation passes the points, approximation projects; squares differentiate, normal equations orthogonalize.**
`,
    keyPoints: [
      'Interpolation passes through the points; approximation minimizes the overall error',
      'Least squares = the orthogonal projection of the residual onto the column space',
      'Normal equations AᵀAc=Aᵀy; the condition number is the square of κ(A)',
      'An orthogonal basis diagonalizes the Gram matrix and avoids ill-conditioning',
    ],
  },
  interpolation: {
    chapter: 'Chapter 1 Interpolation and Approximation',
    title: 'Interpolation and Approximation',
    summary:
      'Simple functions through the data points: polynomial interpolation is elegant but oscillates, while splines and least squares are the practical workhorses of engineering.',
    content: String.raw`

Before calculators existed, engineers carried a book of tables listing sine values every 0.01 radian. To look up 0.013, which is not in the table, what do you do? The simplest thing is to average the values at 0.01 and 0.02, which is linear interpolation. It assumes the function is approximately a straight line between the two points. A denser table gives a smaller error; if you are willing to pass a parabola through three points, the accuracy improves further.

The idea of interpolation is precisely this: **use known discrete values to construct an easily computed function that fills in the unknown intermediate values**. Formally: given $n+1$ points, find a polynomial of degree at most $n$ that reproduces the given values exactly at those points.

It sounds perfect: the more points, the higher the degree, so surely the more accurate? The answer is no. In the early twentieth century Runge found a famous counterexample: interpolating $f(x)=\dfrac{1}{25x^2+1}$ on $[-1,1]$ at equally spaced nodes, the more the nodes were refined the more violently the interpolating polynomial oscillated near the ends of the interval, and it even diverged. This shattered intuition and directly gave rise to piecewise interpolation and splines, the modern industrial standard.

This topic answers three questions: why the interpolating polynomial is unique, how to compute it cheaply, and when it will betray you.

## 2. Rigorous Definitions

**Definition 1 (interpolation problem)** Given $n+1$ distinct nodes $x_0<x_1<\cdots<x_n$ and corresponding values $y_0,\dots,y_n$, find a polynomial $L_n(x)$ of degree at most $n$ such that

$$L_n(x_i)=y_i,\qquad i=0,1,\dots,n$$

$L_n$ is the **interpolating polynomial**, the $x_i$ are the **nodes**, and the $y_i$ the **nodal values**.

**Theorem 1 (existence and uniqueness)** Such a polynomial of degree at most $n$ exists and is unique.

Sketch of proof: suppose $L_n$ and $M_n$ both qualify; then $D=L_n-M_n$ is a polynomial of degree at most $n$ with $n+1$ distinct zeros $x_0,\dots,x_n$. A nonzero polynomial of degree $n$ has at most $n$ zeros, so $D\equiv0$. Existence is supplied directly by the Lagrange construction below.

**Definition 2 (Lagrange basis functions)** For each $k$ define

$$\ell_k(x)=\prod_{j=0,\,j\ne k}^{n}\frac{x-x_j}{x_k-x_j}$$

It is a polynomial of degree $n$ satisfying $\ell_k(x_j)=\delta_{kj}$ (1 when $j=k$, 0 otherwise). Hence

$$L_n(x)=\sum_{k=0}^{n}y_k\,\ell_k(x)$$

**Definition 3 (divided differences)** The zeroth divided difference is just the function value $f[x_i]=f(x_i)$; the first is

$$f[x_i,x_{i+1}]=\frac{f(x_{i+1})-f(x_i)}{x_{i+1}-x_i}$$

and in general the $k$-th divided difference is

$$f[x_i,\dots,x_{i+k}]=\frac{f[x_{i+1},\dots,x_{i+k}]-f[x_i,\dots,x_{i+k-1}]}{x_{i+k}-x_i}$$

**Definition 4 (Newton interpolation formula)**

$$N_n(x)=f[x_0]+f[x_0,x_1](x-x_0)+f[x_0,x_1,x_2](x-x_0)(x-x_1)+\cdots+f[x_0,\dots,x_n]\prod_{j=0}^{n-1}(x-x_j)$$

**Theorem 2 (interpolation remainder)** Let $f\in C^{n+1}[a,b]$ with all nodes in $[a,b]$. Then for every $x\in[a,b]$ there is $\xi=\xi(x)\in(a,b)$ such that

$$f(x)-L_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{j=0}^{n}(x-x_j)$$

**Definition 5 (cubic spline)** Given nodes $a=x_0<x_1<\cdots<x_n=b$, if the piecewise function $S(x)$ is a cubic polynomial on each subinterval, $S,S',S''$ are continuous on the whole of $[a,b]$, and $S(x_i)=y_i$, then $S$ is a **cubic spline interpolant**. Two additional boundary conditions (for instance the natural ones $S''(a)=S''(b)=0$) make it unique.

## 3. Why It Is Defined This Way

**Why "degree at most $n$" rather than "exactly $n$"?** The $n+1$ conditions match $n+1$ coefficients—the matching of "as many equations as unknowns". Allowing a higher degree makes the solution non-unique (one may add any multiple of $\prod(x-x_i)$ without changing the nodal values); restricting to a lower degree generally leaves no solution. So "degree at most $n$" is the only choice that guarantees existence and uniqueness.

**Why do the Lagrange basis functions look like products?** We want the $k$-th basis to equal 1 at $x_k$ and 0 at every other node. The numerator $\prod_{j\ne k}(x-x_j)$ vanishes at all the other nodes and merely needs normalizing at $x_k$; the denominator $\prod_{j\ne k}(x_k-x_j)$ is exactly the numerator evaluated at $x_k$. Dividing gives the switch function. This construction turns "solve a linear system" into "write down a formula", a classic case of trading computation for structure.

**Why does the Newton formula use divided differences?** In the Lagrange formula, adding a node forces every $\ell_k$ to be recomputed; the Newton formula is incremental: adding $x_{n+1}$ only appends a term $f[x_0,\dots,x_{n+1}]\prod_{j=0}^{n}(x-x_j)$, leaving the earlier terms untouched. The divided-difference table can also be reused, reducing the work from $O(n^3)$ to $O(n^2)$. Divided differences are insensitive to the order of the nodes (symmetry), so "which point comes first" does not affect the result.

**What does each piece of the remainder formula say?** The factor $\prod(x-x_j)$ vanishes at the nodes, guaranteeing the interpolation conditions; $f^{(n+1)}(\xi)/(n+1)!$ is the familiar face of the Taylor remainder. It tells us that the error is determined by two things: how large the higher derivative is (how curved the function is), and how large the nodal product is (how far the evaluation point is from the nodes). This also explains why the error is large at the edges of the interval—there $\prod|x-x_j|$ is largest.

**Counterexample: the condition "degree at most $n$" cannot be dropped.** For the nodes $0,1$ with values $0,1$, the linear polynomial $L_1(x)=x$ is unique. But $x+x(x-1)=x^2$ also satisfies $L(0)=0$ and $L(1)=1$ with degree 2. Without a degree bound there are infinitely many interpolating polynomials; uniqueness rests entirely on the degree limit.

**Counterexample: refining equally spaced nodes need not converge.** The Runge function $f(x)=\dfrac{1}{25x^2+1}$ is infinitely differentiable on $[-1,1]$, yet the $L_n$ built on equally spaced nodes diverges near the ends as $n\to\infty$. The reason is not that the function is rough but that $\prod|x-x_j|$ grows too fast at the edges and overwhelms the decay of $f^{(n+1)}/(n+1)!$. There are two remedies: change the nodes (Chebyshev nodes cluster them at the ends), or change the structure (piecewise low degree, splines).

**Why cubic splines rather than quadratic?** A piecewise quadratic can make the function and its first derivative continuous, but the second derivative generally jumps at the nodes, so the curvature is discontinuous and a kink is visible. A cubic has four coefficients, enough on each interval to match the value, first derivative, and second derivative at the left end and still leave one degree of freedom to join the right end; stringing the intervals together gives a piecewise function with continuous second derivative. Cubic is the lowest degree that achieves this; higher degrees waste computation. This is why car bodies and font outlines use cubic splines.

**Why are divided differences independent of the order of the nodes?** Take the second divided difference. Computed in the order $x_0,x_1,x_2$,

$$f[x_0,x_1,x_2]=\frac{f[x_1,x_2]-f[x_0,x_1]}{x_2-x_0}$$

Writing it in symmetric form:

$$f[x_0,x_1,x_2]=\frac{f(x_0)}{(x_0-x_1)(x_0-x_2)}+\frac{f(x_1)}{(x_1-x_0)(x_1-x_2)}+\frac{f(x_2)}{(x_2-x_0)(x_2-x_1)}$$

The right side is fully symmetric in the three nodes: permuting the subscripts changes nothing. In general every $k$-th divided difference can be written as such a symmetric sum. This shows that the coefficients of the Newton formula depend only on the set of nodes, not on their order; in programming you may sort them arbitrarily and the result in exact arithmetic is identical.

## 4. Intuition and Pictures

The Lagrange basis functions are like a row of searchlights: the $k$-th lamp shines at full brightness only at $x_k$ and is completely dark at the other nodes. The interpolating polynomial superposes these lamps with brightness $y_k$. This picture explains why a large $y_k$ pulls the curve far up.

The divided-difference table is like a triangular worksheet:

| Nodes | Zeroth | First | Second | Third |
|---|---|---|---|---|
| $x_0$ | $f[x_0]$ | | | |
| $x_1$ | $f[x_1]$ | $f[x_0,x_1]$ | | |
| $x_2$ | $f[x_2]$ | $f[x_1,x_2]$ | $f[x_0,x_1,x_2]$ | |
| $x_3$ | $f[x_3]$ | $f[x_2,x_3]$ | $f[x_1,x_2,x_3]$ | $f[x_0,x_1,x_2,x_3]$ |

Each entry comes from subtracting the two entries to its lower left and dividing by the corresponding node difference. The coefficients of the Newton formula are the top diagonal of the table.

Piecewise versus global:

| Scheme | Smoothness | Error order | Stability | Use |
|---|---|---|---|---|
| Global high-degree polynomial | infinitely differentiable | depends on the nodes | poor, Runge oscillation possible | theory, few nodes |
| Piecewise linear | continuous | $O(h^2)$ | good | fast lookup, graphics |
| Cubic spline | twice continuously differentiable | $O(h^4)$ | good | industry standard, CAD |
| Global interpolation at Chebyshev nodes | infinitely differentiable | near optimal | fairly good | spectral methods, high accuracy |

> Intuition: global high-degree interpolation is like pressing a very long steel ruler against a curved line—the stiffer the ruler, the more the ends lift off. Piecewise interpolation is like joining many short rulers: a good fit, but the joints may not be smooth. A spline is like a thin elastic wooden strip: it both fits and stays smooth.

The explicit Chebyshev nodes are $x_k=\cos\dfrac{(2k+1)\pi}{2(n+1)}$, $k=0,1,\dots,n$. They cluster toward the ends of the interval and are sparse in the middle. One can prove that among all choices of $n+1$ nodes these minimize $\max_{[-1,1]}\prod_{j=0}^{n}|x-x_j|$ and therefore suppress the nodal factor in the remainder. They are precisely the zeros of the Chebyshev polynomial $T_{n+1}(x)=\cos((n+1)\arccos x)$. For a general interval $[a,b]$, apply the linear map $x=\dfrac{a+b}{2}+\dfrac{b-a}{2}t$ carrying $t\in[-1,1]$ to $x\in[a,b]$.

## 5. Worked Examples

### Example 1 (basic: Lagrange interpolation)

Problem: given $f(0)=1,f(1)=2,f(2)=5$, find the quadratic interpolating polynomial and approximate $f(1.5)$.

Analysis: three nodes, quadratic polynomial, so use the Lagrange formula directly.

Solution: write the three basis functions first:

$$\ell_0(x)=\frac{(x-1)(x-2)}{(0-1)(0-2)}=\frac{(x-1)(x-2)}{2}$$

$$\ell_1(x)=\frac{(x-0)(x-2)}{(1-0)(1-2)}=-x(x-2)$$

$$\ell_2(x)=\frac{(x-0)(x-1)}{(2-0)(2-1)}=\frac{x(x-1)}{2}$$

Substituting,

$$L_2(x)=1\cdot\ell_0(x)+2\cdot\ell_1(x)+5\cdot\ell_2(x)$$

Expanding term by term:

$$\ell_0=\frac{x^2-3x+2}{2},\qquad \ell_1=-x^2+2x,\qquad \ell_2=\frac{x^2-x}{2}$$

Collecting like terms: quadratic coefficient $\dfrac12-2+\dfrac52=1$; linear coefficient $-\dfrac32+4-\dfrac52=0$; constant $1$. Hence

$$L_2(x)=x^2+1$$

Check: $L(0)=1,L(1)=2,L(2)=5$, all satisfied. Therefore

$$f(1.5)\approx L_2(1.5)=1.5^2+1=3.25$$

> Comment: these data happen to come from $x^2+1$, so the interpolating polynomial is the original function and there is no error. With data from another function, $L_2(1.5)$ would only be an approximation, with the error controlled by the remainder formula.

### Example 2 (advanced: Newton divided differences and error estimation)

Problem: given $\sqrt4=2,\sqrt9=3,\sqrt{16}=4$, estimate $\sqrt{10}$ by Newton interpolation and give an upper bound for the error from the remainder formula.

Analysis: the nodes $4,9,16$ are not equally spaced, so divided differences are most convenient.

Solution: build the table. The zeroth differences are $2,3,4$. First differences:

$$f[4,9]=\frac{3-2}{9-4}=\frac15=0.2,\qquad f[9,16]=\frac{4-3}{16-9}=\frac17\approx0.142857$$

Second difference:

$$f[4,9,16]=\frac{\frac17-\frac15}{16-4}=\frac{\frac{5-7}{35}}{12}=\frac{-2}{35\cdot12}=-\frac{1}{210}\approx-0.0047619$$

The Newton polynomial:

$$N_2(x)=2+\frac15(x-4)-\frac{1}{210}(x-4)(x-9)$$

At $x=10$:

$$N_2(10)=2+\frac15\cdot6-\frac{1}{210}\cdot6\cdot1=2+1.2-\frac{6}{210}=3.2-0.028571=3.171429$$

Since $\sqrt{10}=3.162278$, the error is about $0.00915$.

Error bound: $f(x)=x^{1/2}$ and $f'''(x)=\dfrac{3}{8}x^{-5/2}$, whose magnitude is largest on $[4,10]$ at $x=4$:

$$|f'''|\le\frac{3}{8\cdot32}=\frac{3}{256}\approx0.01172$$

so the remainder satisfies

$$|R_2(10)|\le\frac{3/256}{6}\cdot|(10-4)(10-9)(10-16)|=\frac{3}{1536}\cdot36=0.0703$$

The actual error $0.00915$ is indeed below the bound $0.0703$, confirming the conservative nature of the formula.

> Comment: the remainder formula gives the worst case, usually an order of magnitude above the actual error. Its value lies in prior assessment: without knowing the true value you can judge whether three nodes suffice.

### Example 3 (challenging: the Runge phenomenon in numbers)

Problem: for $f(x)=\dfrac{1}{25x^2+1}$, build the quartic interpolating polynomial at the equally spaced nodes $-1,-0.5,0,0.5,1$, compute $L_4(0.75)$, and compare with the true value.

Analysis: the function is smooth on $[-1,1]$ but varies violently near the ends. Note that $0.75$ lies between the last two nodes, close to the edge—the place where Runge oscillation is most visible.

Solution: first the nodal values:

$$f(-1)=f(1)=\frac{1}{26}\approx0.03846,\qquad f(-0.5)=f(0.5)=\frac{1}{7.25}\approx0.13793,\qquad f(0)=1$$

Evaluate each basis function at $x=0.75$. For $\ell_0$:

$$\ell_0(0.75)=\frac{(1.75)(0.75)(0.25)(-0.25)}{(-0.5)(-1)(-1.5)(-2)}=\frac{-0.058594}{1.5}\approx-0.03906$$

Similarly

$$\ell_1(0.75)\approx0.21875,\qquad \ell_2(0.75)\approx-0.54688,\qquad \ell_3(0.75)\approx1.09375,\qquad \ell_4(0.75)\approx0.27344$$

The five values sum to $1$, a useful check. Substituting,

$$L_4(0.75)\approx0.03846(-0.03906)+0.13793(0.21875)-0.54688+0.13793(1.09375)+0.03846(0.27344)$$

Term by term: $-0.00150$, $0.03017$, $-0.54688$, $0.15086$, $0.01052$. Adding,

$$L_4(0.75)\approx-0.3568$$

The true value is $f(0.75)=\dfrac{1}{1+25\times0.5625}=\dfrac{1}{15.0625}\approx0.0664$. The error is about $-0.423$: the interpolating curve plunges to a negative value where the truth is positive.

> Comment: the trap is that three seemingly favourable conditions hold at once—smooth function, equally spaced nodes, increasing degree—and the result is disastrous. To judge whether interpolation is reliable, look not only at the smoothness of the function but also at the node distribution and the degree.

## 6. Common Errors and Pitfalls

1. **Saying that $n+1$ points give a polynomial of degree $n+1$.** It should be degree at most $n$. The $n+1$ conditions determine $n+1$ coefficients, and the highest power is $n$.
2. **Treating $\xi$ in the remainder as a fixed point.** $\xi$ depends on $x$ and is usually unknown; only an upper bound can be estimated. Writing $\xi=x$ or pulling $\xi$ outside a sum is wrong.
3. **Believing that more nodes always means more accuracy.** High-degree interpolation at equally spaced nodes can trigger the Runge phenomenon, with the error growing as nodes are added. Before refining, judge the function and the node distribution.
4. **Extrapolating with a high-degree interpolant.** An interpolating polynomial is reliable only near the nodes; outside the data interval the error quickly runs away. Extrapolation needs a model assumption, not a polynomial stretched on faith.
5. **Omitting the spline boundary conditions.** A cubic spline has $4n$ coefficients while the interpolation and internal smoothness conditions give only $4n-2$ equations; without the two boundary conditions the solution is not unique.
6. **Dividing by the wrong node difference in the table.** The denominator of the $k$-th divided difference is the difference between the end nodes $x_{i+k}-x_i$, not the difference between neighbouring nodes, and not $k$.
7. **Expanding the interpolating polynomial in powers before evaluating.** At high degree the coefficients are huge and direct evaluation suffers severe rounding; use Horner's scheme, or the barycentric Lagrange formula, which needs only $O(n)$ operations and is numerically stable.
8. **Treating a cubic spline as one global cubic.** A spline is piecewise cubic and globally twice continuously differentiable, not a single cubic polynomial; it has a different expression on each interval, so locate the interval before evaluating.

## 7. Summary and Mnemonics

- The interpolating polynomial of degree $n$ through $n+1$ distinct nodes exists and is unique; uniqueness comes from "a nonzero polynomial has no more zeros than its degree".
- The Lagrange formula is structurally clear; the Newton formula makes it easy to add points. They are two writings of the same polynomial.
- The remainder equals "higher derivative over factorial" times "the product over nodes"; large edge errors come from that product.
- High-degree interpolation at equally spaced nodes may oscillate (Runge); piecewise linear is stable but inaccurate, while the cubic spline balances smoothness and accuracy.
- Chebyshev nodes cluster at the ends and suppress edge oscillation, making them the recommended choice for global interpolation.
- Divided differences do not depend on the order of the nodes; Chebyshev nodes minimize the maximum of the nodal product.
- The remainder can also be written $f[x_0,\dots,x_n,x]\prod(x-x_j)$; it is equivalent to the derivative form but does not require knowing the $(n+1)$-st derivative of $f$.

**Mnemonic: uniqueness comes from the degree, Lagrange works by switches; Newton's differences add points, edge oscillation calls for new nodes.**
`,
    keyPoints: [
      'Lagrange basis functions act like switches: ℓₖ(xⱼ)=δₖⱼ',
      'Interpolation error = f⁽ⁿ⁺¹⁾(ξ)/(n+1)! × the product over the nodes',
      'Runge phenomenon: high-degree equally spaced interpolation oscillates at the edges; splines and Chebyshev nodes are the cure',
      'Least squares: does not pass through the points but minimizes the squared deviation',
    ],
  },
  'root-finding': {
    chapter: 'Chapter 2 Root Finding',
    title: 'Numerical Solution of Nonlinear Equations',
    summary:
      'Bisection as the fallback, Newton as the sprinter, the secant method as the compromise: first bracket the root, then let the iteration cut the error down again and again.',
    content: String.raw`

In secondary school, quadratic equations are solved by a formula, and cubics and quartics too (though laboriously). Beyond degree five, however, Abel and Galois proved that general equations have no solution in radicals. Worse still, many equations in engineering are not polynomial at all: $x=\cos x$, $e^{-x}=x$, $\tan x=x$. These have no closed form "x equals something", so only approximate values can be found.

The basic strategy of numerical root finding is one sentence: **bracket first, then approach**. First determine roughly where the root is (by an interval, a graph, or a physical estimate), then improve the approximation with an iteration until the error is acceptably small.

The most elementary bracket-and-approach is bisection: if $f(a)$ and $f(b)$ have opposite signs, a continuous function has a root in $(a,b)$; take the midpoint, halve the interval, and the root is certainly in the half retained. It is slow but never lies. At the other extreme is Newton's method: replace the curve by its tangent, often gaining several digits per step, but with a poor initial guess it may wander off or diverge. The thread of this topic is the division of labour and the combination of these two families.

A teaser: for an iteration $x_{k+1}=\varphi(x_k)$, when is convergence guaranteed, and how fast is it? These two questions correspond to contraction mappings and to the order of convergence.

## 2. Rigorous Definitions

**Definition 1 (root and multiplicity)** If $f(x^*)=0$, then $x^*$ is a **root** or **zero** of $f$. If near $x^*$ one can write

$$f(x)=(x-x^*)^m g(x),\qquad g(x^*)\ne0$$

with $m$ a positive integer, then $x^*$ is a root of **multiplicity $m$**. For $m=1$ it is a **simple root**.

**Definition 2 (bisection)** Let $f\in C[a,b]$ with $f(a)f(b)<0$. Set $a_0=a,b_0=b$ and for $k=0,1,2,\dots$ take the midpoint $x_k=\dfrac{a_k+b_k}{2}$:

- if $f(x_k)=0$, then $x^*=x_k$ and stop;
- if $f(a_k)f(x_k)<0$, set $a_{k+1}=a_k$, $b_{k+1}=x_k$;
- otherwise set $a_{k+1}=x_k$, $b_{k+1}=b_k$.

**Theorem 1 (bisection error)** After $k$ steps,

$$|x_k-x^*|\le\frac{b-a}{2^{k+1}}$$

To make the error smaller than $\varepsilon$ it suffices that $k\ge\log_2\dfrac{b-a}{\varepsilon}-1$.

**Definition 3 (fixed-point iteration)** Rewrite $f(x)=0$ in the equivalent form $x=\varphi(x)$. Take an initial value $x_0$ and set

$$x_{k+1}=\varphi(x_k),\qquad k=0,1,2,\dots$$

If the sequence $\{x_k\}$ converges to $x^*$, then $x^*$ satisfies $x^*=\varphi(x^*)$ and is a **fixed point** of $\varphi$.

**Theorem 2 (contraction mapping principle)** If $\varphi$ on $[a,b]$ satisfies:

1. self-mapping: $\varphi([a,b])\subset[a,b]$;
2. contraction: there is a constant $0\le q<1$ such that for all $x,y\in[a,b]$, $|\varphi(x)-\varphi(y)|\le q|x-y|$,

then $\varphi$ has a unique fixed point $x^*$ in $[a,b]$, and for any initial value $x_0\in[a,b]$ the iteration converges, with the a priori estimate

$$|x_k-x^*|\le\frac{q^k}{1-q}|x_1-x_0|$$

If $\varphi\in C^1$ with $|\varphi'(x)|\le q<1$, the contraction property holds (by the mean value theorem).

**Definition 4 (Newton's method)** Suppose $f$ is differentiable and $f'(x_k)\ne0$:

$$x_{k+1}=x_k-\frac{f(x_k)}{f'(x_k)}$$

**Definition 5 (secant method)** Replace the derivative by a divided difference:

$$x_{k+1}=x_k-\frac{f(x_k)(x_k-x_{k-1})}{f(x_k)-f(x_{k-1})}$$

**Definition 6 (order of convergence)** Let $x_k\to x^*$ and $e_k=x_k-x^*$. If there are $p\ge1$ and a constant $C>0$ such that

$$\lim_{k\to\infty}\frac{|e_{k+1}|}{|e_k|^p}=C$$

then the iteration converges with **order $p$**. For $p=1$ with $0<C<1$ it is linear convergence; $p=2$ is quadratic convergence. The larger $p$, the faster the convergence.

## 3. Why It Is Defined This Way

**Why must bisection require $f(a)f(b)<0$?** This is the switch of the intermediate value theorem. With the same sign at both ends the interval may still contain an even number of roots (as $f(x)=x^2$ does on $[-1,1]$), but bisection cannot decide which half to keep and the algorithm fails. Endpoints that are themselves roots must be handled separately, otherwise $f(a)=0$ makes the sign test meaningless.

**Why must the fixed-point iteration be a contraction?** Subtract the iteration formula from itself:

$$x_{k+1}-x^*=\varphi(x_k)-\varphi(x^*)=\varphi'(\xi_k)(x_k-x^*)$$

If $|\varphi'|\le q<1$, each iteration multiplies the error by at least $q$ and the geometric series converges. Conversely, if $|\varphi'|>1$ near some point, the error is amplified and the iteration diverges. The closer $q$ is to 1 the slower the convergence; for $q=0$ (as with Newton's method at a simple root) it is extremely fast.

Iterating $|x_{k+1}-x^*|\le q|x_k-x^*|$ $k$ times gives $|x_k-x^*|\le q^k|x_0-x^*|$. Then the triangle inequality replaces $|x_0-x^*|$ by the computable $|x_1-x_0|$: from $|x_1-x^*|\le q|x_0-x^*|$,

$$|x_0-x^*|\le|x_0-x_1|+|x_1-x^*|\le|x_1-x_0|+q|x_0-x^*|$$

so $|x_0-x^*|\le\dfrac{|x_1-x_0|}{1-q}$ and therefore

$$|x_k-x^*|\le\frac{q^k}{1-q}|x_1-x_0|$$

This is where the a priori estimate comes from. It lets us predict, before computing the answer, how many iterations are needed, from $q$ and the size of the first step.

**Why study different rearrangements of the same equation?** Take $x^2=2$:

- Rearrangement one: $x=\dfrac{2}{x}$ with $\varphi'(x)=-\dfrac{2}{x^2}$; at $x^*=\sqrt2$, $|\varphi'|=1$, so the contraction condition fails and $x_{k+1}=2/x_k$ bounces between two values without converging.
- Rearrangement two: $x=\dfrac12\left(x+\dfrac2x\right)$ with $\varphi'(x)=\dfrac12\left(1-\dfrac2{x^2}\right)$; at $x^*=\sqrt2$, $\varphi'=0$, giving not only convergence but quadratic convergence. This is the ancient Babylonian square-root formula.

One equation, different rearrangements, entirely different fates. Choosing the rearrangement is an art; Newton's method offers a systematic way to choose.

**Why is Newton's method fast?** Expand in a Taylor series at $x^*$:

$$0=f(x^*)=f(x_k)+f'(x_k)(x^*-x_k)+\frac{f''(\xi)}{2}(x^*-x_k)^2$$

Divide both sides by $f'(x_k)$ and rearrange, noting $x_{k+1}=x_k-\dfrac{f(x_k)}{f'(x_k)}$:

$$x^*-x_{k+1}=\frac{f''(\xi)}{2f'(x_k)}(x^*-x_k)^2$$

Hence

$$e_{k+1}\approx\frac{f''(x^*)}{2f'(x^*)}e_k^2$$

The error shrinks quadratically: if $e_k=10^{-3}$, the next is about $10^{-6}$ and the one after $10^{-12}$. The premise is $f'(x^*)\ne0$.

**The geometric origin of Newton's method.** Draw the tangent at $(x_k,f(x_k))$:

$$y=f(x_k)+f'(x_k)(x-x_k)$$

Setting $y=0$ and solving for $x$ gives $x_{k+1}=x_k-\dfrac{f(x_k)}{f'(x_k)}$. Hence the name tangent method. Each step replaces the curve locally by a straight line; when the curve is straight enough near the root, one step suffices, and when it bends sharply the tangent may point far away.

**Why does a multiple root destroy quadratic convergence?** If $x^*$ is a root of multiplicity $m$, write $f=(x-x^*)^m g$; then $f'=(x-x^*)^{m-1}[mg+(x-x^*)g']$. The Newton error recursion becomes

$$e_{k+1}\approx\frac{m-1}{m}e_k$$

which is linear convergence with factor $\frac{m-1}{m}$. For $m=2$ each step only halves the error, much slower. The remedy is to use

$$x_{k+1}=x_k-\frac{m f(x_k)}{f'(x_k)}$$

or to apply Newton's method to $\dfrac{f}{f'}$ (which does not require knowing $m$ in advance).

**Why is the secant method of order 1.618?** It approximates the derivative by a divided difference, and the error order $p$ satisfies $p^2=p+1$, whose positive root is the golden ratio $\dfrac{1+\sqrt5}{2}\approx1.618$. Slightly slower than Newton, but each step evaluates only one $f$ (Newton needs both $f$ and $f'$), so per function evaluation it is often the better bargain.

**Where does the secant formula come from?** Replace $f'(x_k)$ in Newton's formula by the divided difference $\dfrac{f(x_k)-f(x_{k-1})}{x_k-x_{k-1}}$. Geometrically it takes the intersection of the secant through the previous two points with the $x$-axis as the new approximation, hence the name. It needs no derivative but does need two initial values, and each step adds only one new function value.

**Why does the definition of order include a limit?** Because it describes the asymptotic behaviour when the error is small enough. Early on the error is large, higher-order terms may dominate, and a second-order method may not look faster than a first-order one; only when $e_k$ is small does $|e_{k+1}|\approx C|e_k|^p$ hold. This is also why practical algorithms combine bisection with Newton: first reduce the error into the basin of attraction with a low-order method, then let the high-order method shine.

**Why can a stopping rule not look only at the function value?** For a simple root, $f(x)\approx f'(x^*)(x-x^*)$, so $|x-x^*|\approx|f(x)|/|f'(x^*)|$. If $f'(x^*)$ is tiny (the curve is very flat at the root), $x$ may be far from the root even when $|f|$ is small. A reliable rule requires both $|x_{k+1}-x_k|<\varepsilon_x$ and $|f(x_k)|<\varepsilon_f$, together with a prior estimate of the size of $f'$.

## 4. Intuition and Pictures

Bisection is like the guessing game: someone thinks of a number between 1 and 100, you guess the midpoint each time, and they say higher or lower, halving the range each round. Seven guesses pin the number to within 1, because $2^7=128$. It uses no smoothness, only the sign change, and is therefore robust but slow.

Newton's method is like sliding down a slope along the tangent: draw the tangent at $(x_k,f(x_k))$ and its intersection with the $x$-axis is $x_{k+1}$. If the curve is nearly straight near the root, one step suffices; if it bends sharply or the tangent is almost horizontal, you slide very far.

> Intuition: bisection is the steady conservative, Newton the bold and careful radical. The standard engineering practice is to bracket the root into a small interval by bisection and then sprint with Newton, combining robustness and speed.

The geometric picture of fixed-point iteration: plot $y=\varphi(x)$ and $y=x$ together; the iteration goes vertically from $x_k$ to the curve and horizontally to the diagonal, again and again, like walking on stairs. If the slope of the curve at the intersection has magnitude below 1 the iteration spirals in; above 1 it walks away.

| Method | Derivative needed | Order | Work per step | Robustness |
|---|---|---|---|---|
| Bisection | no | linear (error halved) | one $f$ | best (needs a sign change) |
| Fixed-point iteration | no | linear, factor $q$ | one $\varphi$ | depends on the rearrangement |
| Newton | yes, $f'$ | quadratic (simple root) | $f$ and $f'$ | depends on the initial value |
| Secant | no | 1.618 | one $f$ | moderate |

Bisection converges independently of the initial value but halves the interval each step; Newton is extremely fast near the root but sensitive to the initial guess. The standard hybrid is bisection plus Newton: take the Newton step when it falls inside the current bracket, otherwise fall back to a bisection step. This gives both the global reliability of bisection and the local speed of Newton. Many library root finders use exactly this strategy, with the secant method as a fallback.

**Why do initial values matter?** Each Newton step is a tangent map, and convergence is guaranteed only when it maps some interval around the root into itself. That interval is the basin of attraction. Its boundary can be extremely complicated, even fractal; two nearby starting values may converge to completely different roots, or one may converge and the other diverge. The practical remedy is to isolate the root into a sufficiently small interval by bisection and then start Newton's method there.

## 5. Worked Examples

### Example 1 (basic: bisection)

Problem: find the root of $f(x)=x^3-2x-5=0$ in $[2,3]$ to about $0.002$.

Analysis: $f(2)=8-4-5=-1<0$ and $f(3)=27-6-5=16>0$, so the sign-change condition holds. Since $f'(x)=3x^2-2>0$ on $[2,3]$, the function is monotone and the root is unique.

Solution: tabulate the midpoints and signs:

| Step | Interval | Midpoint | Function value | Interval kept |
|---|---|---|---|---|
| 0 | $[2,3]$ | 2.5 | 5.625 | $[2,2.5]$ |
| 1 | $[2,2.5]$ | 2.25 | 1.8906 | $[2,2.25]$ |
| 2 | $[2,2.25]$ | 2.125 | 0.3457 | $[2,2.125]$ |
| 3 | $[2,2.125]$ | 2.0625 | -0.3513 | $[2.0625,2.125]$ |
| 4 | $[2.0625,2.125]$ | 2.09375 | -0.0089 | $[2.09375,2.125]$ |
| 5 | $[2.09375,2.125]$ | 2.109375 | 0.1668 | $[2.09375,2.109375]$ |
| 6 | $[2.09375,2.109375]$ | 2.101563 | 0.0786 | $[2.09375,2.101563]$ |
| 7 | $[2.09375,2.101563]$ | 2.097656 | 0.0347 | $[2.09375,2.097656]$ |

After seven steps the interval has length $0.003906$; taking the midpoint $x\approx2.0957$, the error is at most $0.00195$. The more accurate root is $x^*\approx2.09455$.

> Comment: bisection halves the error each step, so one more decimal digit costs about $\log_2 10\approx3.3$ steps. Its value is not speed but unconditional reliability.

### Example 2 (advanced: Newton's method)

Problem: solve $x^3-2x-5=0$ by Newton's method from $x_0=2$, taking three iterations.

Solution: $f'(x)=3x^2-2$.

$$x_1=2-\frac{8-4-5}{12-2}=2-\frac{-1}{10}=2.1$$

$$x_2=2.1-\frac{9.261-4.2-5}{3(4.41)-2}=2.1-\frac{0.061}{11.23}=2.1-0.005432=2.094568$$

Now compute $f(2.094568)$ and $f'(2.094568)$. Using a Taylor estimate with the true root $x^*\approx2.0945515$ and $f'(x^*)\approx11.1614$,

$$f(2.094568)\approx11.1614\times(1.66\times10^{-5})\approx1.86\times10^{-4}$$

$$f'(2.094568)\approx11.1614+6(2.094568)(1.66\times10^{-5})\approx11.1617$$

$$x_3=2.094568-\frac{1.86\times10^{-4}}{11.1617}\approx2.094568-1.67\times10^{-5}=2.094551$$

Compared with the true value $2.094551$, this is already accurate to six decimal places.

> Comment: the error falls from $0.1$ to $0.0054$ in the first step and to $1.7\times10^{-5}$ in the second, the exponent jumping from 1 to 2, consistent with quadratic convergence. Each Newton step needs the derivative, and that is its cost.

### Example 3 (challenging: the multiple-root trap)

Problem: for $f(x)=x^3-3x+2=(x-1)^2(x+2)$, run Newton's method from $x_0=0$ and observe the rate of convergence.

Solution: $f'(x)=3x^2-3=3(x-1)(x+1)$. The iteration is

$$x_{k+1}=x_k-\frac{(x_k-1)^2(x_k+2)}{3(x_k-1)(x_k+1)}=x_k-\frac{(x_k-1)(x_k+2)}{3(x_k+1)}$$

Starting from $x_0=0$:

$$x_1=0-\frac{(-1)(2)}{3}=\frac23\approx0.6667$$

$$x_2=\frac23-\frac{(-\frac13)(\frac83)}{3\cdot\frac53}=\frac23+\frac{8}{45}=\frac{38}{45}\approx0.8444$$

$$x_3=\frac{38}{45}-\frac{(-\frac{7}{45})(\frac{128}{45})}{3\cdot\frac{83}{45}}\approx0.8444+0.0800=0.9244$$

$$x_4\approx0.9244-\frac{(-0.0756)(2.9244)}{3(1.9244)}\approx0.9244+0.0383=0.9627$$

The errors are $1$, $0.3333$, $0.1556$, $0.0756$, $0.0373$, with the ratio settling near $0.5$—exactly $\dfrac{m-1}{m}=\dfrac12$. Newton still converges to $x^*=1$, but only linearly.

> Comment: the trap is the memory "Newton's method means quadratic convergence". Quadratic convergence holds only at a simple root; at a multiple root it degrades to linear. Multiple roots can be recognized by $f(x^*)=f'(x^*)=0$ or by watching whether the error ratio settles at $\frac{m-1}{m}$. To restore quadratic convergence, use the modified formula $x_{k+1}=x_k-\dfrac{m f(x_k)}{f'(x_k)}$.

## 6. Common Errors and Pitfalls

1. **Starting bisection without checking the sign change.** With $f(a)f(b)>0$ bisection may converge to a place with no root or loop forever. Endpoints that are themselves roots must also be excluded first.
2. **Using only $|f(x_k)|<\varepsilon$ as the stopping rule.** At a multiple root or on a flat stretch, $|f|$ can be small while $x$ is far from the root. Check $|x_{k+1}-x_k|$ and $|f|$ together, or bring in a condition-number estimate.
3. **Using Newton's method where $f'(x_k)\approx0$.** The tangent is nearly horizontal, the intersection flies far away, and the iteration may diverge. Change the initial value or switch to bisection.
4. **Assuming Newton's method always converges.** For $f(x)=\arctan x$ from $x_0=1.5$, the iteration jumps to about $-1.69$, then to about $2.32$, oscillating and diverging. The initial value must lie in the basin of attraction of the root.
5. **Using standard Newton at a multiple root.** Slow convergence is not a program bug but a degeneracy of the method; use the modified formula or apply Newton to $f/f'$.
6. **Rearranging the fixed-point form carelessly.** The rearrangement $x=\varphi(x)$ must be checked for $|\varphi'|<1$; different rearrangements of one equation may converge or diverge.
7. **Confusing the order of convergence with the speed of convergence.** Order $p$ describes only the asymptotic rate as $e_k\to0$; the actual number of steps also depends on the constant $C$ and the initial error. With a large $C$ a second-order method can be slower than a first-order one at the start.
8. **Using equality of two successive iterates as the only stopping test.** In floating point two iterates can coincide while still being far from the root on a flat stretch; combine the residual with the interval length.
9. **Forgetting to round up when estimating the number of bisection steps.** $k\ge\log_2\frac{b-a}{\varepsilon}-1$ yields a decimal, but the actual number of steps must be rounded up; the interval length and error bound often differ by a factor of two as well. In practice loop until the interval is smaller than the tolerance rather than precomputing the count.

## 7. Summary and Mnemonics

- Bisection depends only on continuity and halves the error each step, making it the most reliable fallback.
- A sufficient condition for fixed-point convergence is the contraction property $|\varphi'|\le q<1$, with the speed controlled by $q$.
- Newton's method is quadratic at a simple root and degenerates to linear at a multiple root; each step needs the derivative.
- The secant method replaces the derivative by a divided difference, has order 1.618, and needs no derivative.
- Practical strategy: bracket by bisection, sprint with Newton, and use the secant method when derivatives are inconvenient.
- Stopping needs two rulers, the step length and the residual; the flatter the curve, the more dangerous it is to look at the residual alone.
- The contraction constant $q$ fixes the iteration count: shrinking the error by $10^{-m}$ takes about $m/\log_{10}(1/q)$ steps.
- The number of bisection steps depends only on the interval length and the tolerance, not on the shape of the function; that is its greatest virtue.

**Mnemonic: bisection for insurance, Newton for the sprint; quadratic at simple roots, halved at multiple roots.**
`,
    keyPoints: [
      'Bisection halves the error each step, provided the endpoints have opposite signs',
      'A necessary and sufficient condition for fixed-point convergence is a spectral radius / contraction constant below 1',
      'Newton is quadratic at a simple root and linear at a multiple root',
      'The secant method has order 1.618 and needs no derivative',
    ],
  },
  'numerical-integration': {
    chapter: 'Chapter 2 Numerical Integration and Differentiation',
    title: 'Numerical Integration and Differentiation',
    summary:
      'Turning an integral into a weighted sum: Newton–Cotes formulas, Romberg extrapolation, and Gaussian quadrature—the trade-off between accuracy and the number of nodes.',
    content: String.raw`

Evaluate $\int_0^1 e^{-x^2}dx$. The integrand is as smooth as a silk ribbon, but its antiderivative is not elementary—no substitution or integration by parts produces a finite closed form. The normal distribution in probability, the Fresnel integrals in optics, and the error function in heat conduction are all integrals of this kind.

Numerical integration changes the question: since the area cannot be found exactly, can it be computed accurately enough from finitely many function values? The most direct approach cuts the area into many thin trapezoids, computes each, and adds them up. The trapezoidal rule, Simpson's rule, and Gaussian quadrature are versions of this idea: **replace the limit of infinitely fine subdivision by a weighted sum over finitely many sample points**.

Here is the key design question: given $n$ sample points, how should their positions and weights be chosen to minimize the error? Intuitively, equally spaced samples are the fairest, but mathematics tells us that placing the nodes at the zeros of orthogonal polynomials nearly doubles the accuracy. That is the striking conclusion of Gaussian quadrature: $n$ points achieve algebraic accuracy $2n-1$, and that is the maximum.

## 2. Rigorous Definitions

**Definition 1 (quadrature formula)** An approximation of the form

$$\int_a^b f(x)dx\approx Q(f)=\sum_{k=0}^{n}A_k f(x_k)$$

is a **numerical integration (quadrature) formula**. The $x_k$ are the **nodes** and the $A_k$ the **weights** (independent of $f$, depending only on the nodes and the interval).

**Definition 2 (degree of exactness)** If a quadrature formula is exact for every polynomial of degree at most $m$ but inexact for some polynomial of degree $m+1$, it has **degree of exactness $m$**.

**Definition 3 (Newton–Cotes formulas)** Take equally spaced nodes $x_k=a+kh$ with $h=\dfrac{b-a}{n}$, and integrate the degree-$n$ interpolating polynomial of $f$ instead of $f$; the result is the Newton–Cotes formula of order $n$. For $n=1$, the trapezoidal rule:

$$\int_a^b f(x)dx\approx\frac{b-a}{2}\big(f(a)+f(b)\big)$$

For $n=2$, Simpson's rule:

$$\int_a^b f(x)dx\approx\frac{b-a}{6}\left(f(a)+4f\!\left(\frac{a+b}{2}\right)+f(b)\right)$$

**Definition 4 (composite formulas)** Divide $[a,b]$ into $n$ subintervals and add the low-order formula on each. With $h=\dfrac{b-a}{n}$ and $f_i=f(a+ih)$, the composite trapezoidal rule is

$$T_n=\frac{h}{2}\left(f_0+2\sum_{i=1}^{n-1}f_i+f_n\right)$$

and the composite Simpson rule (with $n$ even and $h=\dfrac{b-a}{n}$) is

$$S_n=\frac{h}{3}\left(f_0+4\sum_{\text{odd}}f_i+2\sum_{\text{even}}f_i+f_n\right)$$

**Theorem 1 (error formulas)** For sufficiently smooth $f$:

$$\int_a^b f-T_1=-\frac{(b-a)^3}{12}f''(\xi),\qquad \int_a^b f-S_2=-\frac{(b-a)^5}{2880}f^{(4)}(\xi)$$

In the composite case:

$$\int_a^b f-T_n=-\frac{b-a}{12}h^2f''(\xi),\qquad \int_a^b f-S_n=-\frac{b-a}{180}h^4f^{(4)}(\xi)$$

where $\xi\in(a,b)$ and $h$ is the length of a subinterval.

**Definition 5 (Romberg integration)** Let $T_{k0}$ be the composite trapezoidal value with step $h_k=\dfrac{b-a}{2^k}$ and define

$$T_{km}=\frac{4^mT_{k,m-1}-T_{k-1,m-1}}{4^m-1},\qquad m=1,2,\dots,k$$

The $T_{km}$ are the **Romberg integrals**, arranged in a triangle with $k$ increasing downward and $m$ to the right.

**Definition 6 (Gaussian quadrature)** If $n+1$ nodes and $n+1$ weights give degree of exactness $2n+1$, the formula is **Gaussian**. On $[-1,1]$ with weight $\rho\equiv1$ and nodes at the zeros of the Legendre polynomial $P_{n+1}$, it is the **Gauss–Legendre formula**.

## 3. Why It Is Defined This Way

**Where does the trapezoidal rule come from?** Replace the curve by the line joining $(a,f(a))$ and $(b,f(b))$ and take the area of the trapezoid under it: $\dfrac{f(a)+f(b)}{2}(b-a)$. The error comes from the curvature of the curve, hence the $f''$ in the error term; for a straight line $f''=0$ and the formula is exact, which is why the degree of exactness is 1.

**Why are the weights of Simpson's rule $1:4:1$?** Replace the curve by the parabola through the three points. On $[-1,1]$ with $p(x)=Ax^2+Bx+C$,

$$\int_{-1}^1 p=A\cdot\frac23+2C$$

while $p(-1)=A-B+C$, $p(0)=C$, and $p(1)=A+B+C$. Solving, $A=\dfrac{p(1)+p(-1)-2p(0)}{2}$ and $C=p(0)$, so

$$\int_{-1}^1 p=\frac13p(-1)+\frac43p(0)+\frac13p(1)$$

Mapping to $[a,b]$ gives $\dfrac{b-a}{6}(f(a)+4f(m)+f(b))$. The weights $1:4:1$ are not arbitrary; they are the inevitable result of integrating a parabola.

**How are the nodes and weights of the two-point Gaussian formula fixed?** Let the nodes be $x_1,x_2$ and the weights $w_1,w_2$, and demand exactness for $1,x,x^2,x^3$:

$$w_1+w_2=2,\qquad w_1x_1+w_2x_2=0$$

$$w_1x_1^2+w_2x_2^2=\frac23,\qquad w_1x_1^3+w_2x_2^3=0$$

Guessing $x_2=-x_1$ and $w_1=w_2=1$ by symmetry gives $2x_1^2=\dfrac23$, so $x_1=\pm\dfrac{1}{\sqrt3}$. Four equations, four unknowns, exactly solvable. This is no accident: $n+1$ nodes plus $n+1$ weights give $2n+2$ degrees of freedom, exactly enough to satisfy $2n+2$ moment conditions, so the highest attainable accuracy is $2n+1$.

**Why are the Gaussian nodes the zeros of Legendre polynomials?** Let the nodes be $x_0,\dots,x_n$ and set $\omega(x)=\prod_{j=0}^{n}(x-x_j)$. If the formula is exact for every polynomial of degree at most $2n+1$, take any polynomial $p$ of degree at most $n$; then $p\omega$ has degree at most $2n+1$ and vanishes at every node, so

$$\int_{-1}^1 p(x)\omega(x)dx=\sum_{i=0}^{n}w_ip(x_i)\omega(x_i)=0$$

Thus $\omega$ is orthogonal to every polynomial of degree at most $n$, so $\omega$ is precisely the Legendre polynomial of degree $n+1$ up to a constant factor. The nodes must be its zeros—not by choice, but forced by the accuracy requirement.

**Why is Simpson's rule exact to degree three?** It is built from quadratic interpolation and should guarantee only degree two. But $x^3$ integrates to zero on the symmetric interval $[-1,1]$, and the $1:4:1$ formula also gives $\frac13(-1)+\frac43(0)+\frac13(1)=0$, so it is exact for $x^3$ as well. Symmetry gives one extra degree for free, so the degree of exactness is 3 rather than 2.

**Why do composite formulas have a higher error order?** On a single interval the trapezoidal error is $O(h^3)$, yet adding $n$ intervals lets the errors partly cancel: if $f''$ varies slowly, the interval errors add with the same sign to give $n\cdot O(h^3)=O(h^2)$; the leading Simpson error contains $f^{(4)}$ and sums to $O(h^4)$. That is the power of composition: the errors are not simply accumulated but exploited through their sign structure.

Take the composite trapezoidal rule: the error on the $i$-th subinterval is $-\dfrac{h^3}{12}f''(\xi_i)$, and summing gives $-\dfrac{h^2}{12}\sum_{i=1}^{n}hf''(\xi_i)$. When $f''$ is continuous, $\sum hf''(\xi_i)\approx\int_a^b f''dx=(b-a)f''(\xi)$, so the total error is $-\dfrac{b-a}{12}h^2f''(\xi)$. The error is not a simple accumulation over intervals but is averaged by the integral; and if $f''$ changes sign on the interval the errors cancel further.

**Why does Romberg accelerate?** The trapezoidal error has the Euler–Maclaurin expansion

$$T(h)=I+c_1h^2+c_2h^4+c_3h^6+\cdots$$

containing only even powers of $h$. Taking $T(h)$ and $T(h/2)$ and eliminating the $h^2$ term,

$$\frac{4T(h/2)-T(h)}{3}=I-\frac{c_2}{4}h^4+\cdots$$

raises the accuracy from $O(h^2)$ to $O(h^4)$ (and this step is exactly Simpson's rule). Continuing to eliminate $h^4$, $h^6$, … builds the Romberg table. It is a beautiful instance of Richardson extrapolation: **trade a linear combination of two crude answers for a finer one**.

**Why can Gaussian formulas reach order $2n+1$?** A formula with $n+1$ nodes has $2(n+1)$ free parameters (nodes plus weights) and can satisfy $2n+2$ moment conditions, so the theoretical maximum degree of exactness is $2n+1$. Equally spaced Newton–Cotes formulas lock the nodes and leave only the weights adjustable, so their accuracy is necessarily lower. Gaussian formulas free the nodes too, at the price that the nodes are no longer equally spaced and the weight tables must be precomputed.

**Counterexample: high-order Newton–Cotes is not better.** For $n\ge8$ the Newton–Cotes weights become negative, the error constant grows, and the formula is numerically unstable; for some smooth functions adding nodes actually increases the error (the same root cause as the Runge phenomenon in interpolation). Practical software therefore rarely uses Newton–Cotes above order 4, preferring composite low-order or Gaussian formulas.

## 4. Intuition and Pictures

Think of an integral as weighing an area: the trapezoidal rule approximates a curvilinear trapezoid by a straight-sided one, Simpson's rule fits a parabola, and Gaussian quadrature cleverly picks a few samples so that the errors in high and low places cancel.

| Formula | Nodes | Degree of exactness | Error order (composite) | Character |
|---|---|---|---|---|
| Trapezoidal | 2 | 1 | $O(h^2)$ | simple and robust, large end errors |
| Simpson | 3 | 3 | $O(h^4)$ | good value, needs an even number of panels |
| 3-point Gauss | 3 | 5 | case dependent | highest accuracy, nodes not equally spaced |
| Romberg | $2^k+1$ | rises layer by layer | exponential improvement | suits smooth functions |

> Intuition: equally spaced formulas sample on a grid—fair but wasteful; Gaussian formulas sample according to the importance of the curve, placing points where the curve bends most (the zeros of Legendre polynomials are denser toward the ends), so the same number of points yields more information.

Numerical differentiation has the same sampling problem. The forward difference $\dfrac{f(x+h)-f(x)}{h}$ uses two points with error $O(h)$; the central difference $\dfrac{f(x+h)-f(x-h)}{2h}$ uses two points symmetrically with error $O(h^2)$. Why does symmetry raise the order? Because in the Taylor expansion the $h^2$ terms cancel on subtraction:

$$f(x+h)-f(x-h)=2hf'(x)+\frac{h^3}{3}f'''(x)+\cdots$$

The total error of numerical differentiation can be written $\dfrac{\varepsilon}{h}+\dfrac{Mh^2}{6}$, where $\varepsilon$ is the scale of rounding error in the function values and $M$ bounds $|f'''|$. The first term grows as $h$ shrinks while the second shrinks. Differentiating with respect to $h$ and setting the result to zero gives the optimal step

$$h\sim\left(\frac{3\varepsilon}{M}\right)^{1/3}$$

With double precision $\varepsilon\approx10^{-16}$ and $M\approx1$, $h\sim10^{-5}$; any smaller and only rounding noise remains. This is why numerical differentiation cannot improve indefinitely by shrinking the step.

## 5. Worked Examples

### Example 1 (basic: composite trapezoidal rule)

Problem: compute $\int_0^1 e^x dx$ with the composite trapezoidal rule for $n=4$ and compare with the true value $e-1$.

Solution: $h=\dfrac{1-0}{4}=0.25$. Nodes and function values:

$$f_0=1,\quad f_1=e^{0.25}=1.284025,\quad f_2=e^{0.5}=1.648721,\quad f_3=e^{0.75}=2.117000,\quad f_4=e=2.718282$$

Composite trapezoidal rule:

$$T_4=\frac{h}{2}\left(f_0+2(f_1+f_2+f_3)+f_4\right)$$

$$=\frac{0.25}{2}\left(1+2(1.284025+1.648721+2.117000)+2.718282\right)$$

Inside the bracket: $1.284025+1.648721+2.117000=5.049746$, doubled is $10.099492$, plus $1+2.718282=3.718282$, giving $13.817774$ in total. Hence

$$T_4=0.125\times13.817774=1.727222$$

The true value is $e-1=1.718282$, so the error is $-0.008940$. With $n=2$ ($h=0.5$), $T_2=1.753931$ with error $-0.035649$. Halving the step reduces the error to about a quarter, consistent with $O(h^2)$.

> Comment: here $T_4-T_2\approx-0.0267$, of the same sign as the error of $T_2$ and about three times it, showing that the difference of two results can estimate the error—the idea of adaptive integration.

### Example 2 (advanced: Simpson and Romberg)

Problem: compute $\int_0^1 e^x dx$ with Simpson's rule ($n=2$), then push the accuracy to the limit with a Romberg table.

Solution: with $h=0.5$ and nodes $0,0.5,1$,

$$S_2=\frac{h}{3}\left(f_0+4f_1+f_2\right)=\frac{0.5}{3}\left(1+4\times1.648721+2.718282\right)$$

$$=\frac{0.5}{3}\left(1+6.594885+2.718282\right)=\frac{0.5}{3}\times10.313167=1.718861$$

The error is $5.79\times10^{-4}$, sixty times better than the trapezoidal rule on the same nodes (error $0.0356$).

Romberg: first three trapezoidal values

$$T_{00}=T(h=1)=1.859141,\quad T_{10}=T(h=0.5)=1.753931,\quad T_{20}=T(h=0.25)=1.727222$$

Extrapolating:

$$T_{11}=\frac{4T_{10}-T_{00}}{3}=\frac{4(1.753931)-1.859141}{3}=1.718861$$

$$T_{21}=\frac{4T_{20}-T_{10}}{3}=\frac{4(1.727222)-1.753931}{3}=1.718319$$

$$T_{22}=\frac{16T_{21}-T_{11}}{15}=\frac{16(1.718319)-1.718861}{15}=1.718283$$

The true value is $1.718282$, so the error of $T_{22}$ is about $10^{-6}$. Note that $T_{11}$ equals $S_2$ exactly—Simpson's rule is the first extrapolation of the trapezoidal rule, and this is no coincidence.

> Comment: each column of the Romberg table has a definite error order: the first $O(h^2)$, the second $O(h^4)$, the third $O(h^6)$. Further down and further right means higher accuracy, but rounding error is also amplified by the extrapolation, so the process cannot continue indefinitely.

### Example 3 (challenging: the accuracy limit of Gaussian formulas)

Problem: compute $\int_{-1}^1 x^4dx$ with the two-point Gauss–Legendre formula, then with the three-point formula, verifying that an $n$-point Gaussian formula is exact to degree $2n-1$.

Solution: the two-point nodes are $\pm\dfrac{1}{\sqrt3}$ with weights 1:

$$Q_2=x_1^4+x_2^4=2\left(\frac{1}{\sqrt3}\right)^4=2\cdot\frac{1}{9}=\frac29\approx0.2222$$

The true value is $\int_{-1}^1x^4dx=\dfrac25=0.4$. The two-point formula is exact only to degree three, so the quartic term fails and the error $0.1778$ is large.

Three-point formula: nodes $0,\pm\sqrt{\dfrac35}$ with weights $\dfrac89,\dfrac59,\dfrac59$:

$$Q_3=\frac89(0)^4+2\cdot\frac59\left(\sqrt{\frac35}\right)^4=2\cdot\frac59\cdot\frac{9}{25}=\frac{90}{225}=0.4$$

exactly the true value. The three-point formula is exact to degree $2\times3-1=5$, so $x^4$ is well within reach.

> Comment: the trap is "the same number of points gives the same accuracy". Three-point Simpson is exact to degree 3, three-point Gauss to degree 5: for the same three function evaluations Gauss extracts two more orders. But the Gaussian nodes are irrational, the weights are untidy, and the function must be smooth at the nodes; for integrands with singularities or known only on a grid, equally spaced formulas are more convenient.

## 6. Common Errors and Pitfalls

1. **Using an odd number of subintervals for composite Simpson.** Each parabola covers two panels, so the number of intervals must be even; otherwise the last one cannot be paired. Check the parity of $n$ explicitly in code.
2. **Confusing $h$ with $(b-a)$.** The coefficient of the composite trapezoidal rule is $h/2$, of composite Simpson $h/3$, and of single-panel Simpson $(b-a)/6$. Dimensional check: weight times function value times length must be a length to the first power.
3. **Treating the degree of exactness as exactness for all functions.** It guarantees only polynomials; for transcendental functions such as $e^x$ or $\sin x$ the error depends on the higher derivatives. High degree of exactness does not imply small error.
4. **Applying the formulas directly to singular integrals.** In $\int_0^1 x^{-1/2}dx$ the endpoint value is infinite, the error formula fails, and composite formulas converge very slowly. Remove the singularity by substitution, or use weighted formulas such as Gauss–Jacobi.
5. **Believing smaller $h$ is always better in numerical differentiation.** Truncation error falls with $h$ but rounding error grows as $\varepsilon/h$; the optimal step for the central difference is about $\varepsilon^{1/3}$, and going smaller is worse.
6. **Extrapolating too many Romberg layers.** High-order extrapolation coefficients are large and amplify rounding error; stop when the error stops decreasing and check the difference between neighbouring entries.
7. **Taking $n$ in composite Simpson for the number of nodes.** $n$ is the number of subintervals and the number of nodes is $n+1$; $n$ must be even, so the number of nodes is odd.
8. **Using high-order Newton–Cotes on noisy data.** High-order weights include negative values and are sensitive to noise; when the data carry only a few significant digits, low-order composite formulas are more reliable.
9. **Forgetting the Jacobian factor when changing the interval in Gaussian formulas.** Mapping $[-1,1]$ to $[a,b]$ requires a factor $\dfrac{b-a}{2}$, and both nodes and weights change with it; omitting it scales the whole result.

## 7. Summary and Mnemonics

- Numerical integration replaces the integral by a weighted sum of nodal function values, the weights being determined by integrating the interpolating polynomial.
- The trapezoidal rule has degree of exactness 1, Simpson's rule 3 (symmetry gives one degree for free), and after composition the error orders are $O(h^2)$ and $O(h^4)$.
- Romberg uses Richardson extrapolation to eliminate $h^2,h^4,\dots$ layer by layer; Simpson's rule is exactly the first extrapolation of the trapezoidal rule.
- An $n$-point Gaussian formula attains degree of exactness $2n-1$, the theoretical optimum for a fixed number of nodes.
- Numerical differentiation is an ill-posed problem, and the step must balance truncation against rounding.
- The number of nodes and weights fixes the accuracy ceiling: equally spaced formulas lock the nodes and adjust only the weights, so they fall short of Gauss.
- A composite formula has one order less than a single-panel one—the joint result of error accumulation and cancellation.

**Mnemonic: two blocks for the trapezoid, three shots for Simpson; Romberg extrapolates, Gaussian points are the sweetest.**
`,
    keyPoints: [
      'Newton–Cotes uses equally spaced nodes; Simpson fits a parabola with accuracy O(h⁴)',
      'Romberg = trapezoidal rule + Richardson extrapolation, doubling the accuracy again and again',
      'An n-point Gaussian formula has degree of exactness 2n−1 (optimal)',
      'Numerical differentiation must balance truncation and rounding, so h cannot be too small',
    ],
  },
  'direct-methods': {
    chapter: 'Chapter 4 Direct Methods for Linear Systems',
    title: 'Gaussian Elimination and Matrix Factorizations',
    summary:
      'Gaussian elimination is LU factorization: pivoting prevents a small pivot from amplifying error, and Cholesky halves the work for symmetric positive definite matrices.',
    content: String.raw`

Solving a two-by-two linear system in school takes a few lines of elimination and substitution. In engineering, however, one often has to solve systems of a thousand unknowns: a finite element model of a single part may have a hundred thousand nodes with several degrees of freedom each; a weather forecast grid has millions of unknowns. Hand computation is impossible, so the computer must execute a fixed procedure.

Gaussian elimination is the mechanization of the school method: use the first row to eliminate the first unknown from the rows below, then the second row to eliminate the second unknown from the rows below it, and so on, reducing the matrix to upper triangular form, and finally back-substitute from the bottom. The whole process uses only multiplication, subtraction, and division, which suits programming.

Mechanization brings new problems. First, if a pivot (the diagonal element of the row used for elimination) is zero, the division breaks down; even when it is merely small, dividing by it amplifies the error beyond repair. Second, eliminating a thousand-order system needs about $\frac{2}{3}n^3$ multiplications, about $6.7\times10^8$ for $n=1000$; that is computable, but if the system must be solved repeatedly (changing right-hand side, fixed matrix), re-eliminating each time is wasteful. The first problem is solved by pivoting and the second by matrix factorization: split $A$ into a product of triangular matrices, after which each solve costs only $O(n^2)$ for back-substitution.

## 2. Rigorous Definitions

**Definition 1 (Gaussian elimination)** For the $n\times n$ system $Ax=b$, form the augmented matrix $[A\mid b]$ and for $k=1,\dots,n-1$ successively:

1. choose the pivot: among rows $k$ to $n$ in column $k$ pick the largest absolute value and swap rows if necessary;
2. eliminate: for $i=k+1,\dots,n$ set $m_{ik}=\dfrac{a_{ik}}{a_{kk}}$ and perform $R_i\leftarrow R_i-m_{ik}R_k$ (updating the right-hand side in step);
3. back-substitute: starting from $x_n=b_n/a_{nn}$, work upward for $x_k$.

**Definition 2 (LU factorization)** If a lower triangular matrix $L$ (with unit diagonal) and an upper triangular matrix $U$ satisfy

$$A=LU$$

this is the **LU factorization** (Doolittle form) of $A$. Allowing row swaps gives

$$PA=LU$$

where $P$ is a permutation matrix.

**Definition 3 (Cholesky factorization)** If $A$ is symmetric positive definite, there is a lower triangular matrix $L$ with positive diagonal such that

$$A=LL^\mathsf{T}$$

the **Cholesky factorization** (square-root method).

**Definition 4 (Thomas algorithm)** If $A$ has nonzeros only on the main diagonal and the two adjacent diagonals, the factors $L,U$ in the LU factorization are also bidiagonal and back-substitution takes linear time—the **Thomas algorithm**, with cost $O(n)$.

**Definition 5 (growth factor)** The ratio of the largest element appearing during elimination to the largest element of the original matrix is the **growth factor**. Partial pivoting aims to keep it small.

**Definition 6 (condition number)** For an invertible matrix $A$,

$$\kappa(A)=\|A\|\,\|A^{-1}\|$$

It measures how much a relative perturbation of the right-hand side or the coefficients is amplified.

## 3. Why It Is Defined This Way

**Why is elimination equivalent to factorization?** Each operation eliminating column entries below row $k$ amounts to left-multiplying by a unit lower triangular matrix $E_k$ (unit diagonal, entries $-m_{ik}$ below the $k$-th diagonal). The whole elimination is

$$E_{n-1}\cdots E_2E_1A=U$$

Left-multiplying by the inverses,

$$A=E_1^{-1}E_2^{-1}\cdots E_{n-1}^{-1}U=LU$$

where $L$ holds the multipliers $m_{ik}$ exactly in their positions below the diagonal. This is the sense in which the elimination process itself is the factorization. With $L$ and $U$ in hand, solving $Ax=b$ becomes solving two triangular systems:

$$Ly=b,\qquad Ux=y$$

each costing only $O(n^2)$.

**How is the operation count obtained?** At step $k$ the submatrix to update has $(n-k)$ rows and $(n-k+1)$ columns, each element costing one multiplication and one subtraction; summing over $k$ from $1$ to $n-1$, the multiplications and divisions are about

$$\sum_{k=1}^{n-1}(n-k)^2=\frac{(n-1)n(2n-1)}{6}\approx\frac{n^3}{3}$$

and the additions are of the same order, giving about $\dfrac{2n^3}{3}$ in total. Back-substitution needs only about $\dfrac{n^2}{2}$. So doubling $n$ makes elimination about eight times slower—which is why direct methods struggle on large problems.

**Why is pivoting indispensable?** Consider an extreme example:

$$10^{-20}x_1+x_2=1,\qquad x_1+x_2=2$$

The exact solution is $x_1=\dfrac{1}{1-10^{-20}}\approx1$ and $x_2\approx1$. Without row swapping the multiplier is $m=10^{20}$, and subtracting $10^{20}$ times the first row from the second makes the coefficient of $x_1$ equal to $1-10^{20}\cdot10^{-20}=0$. In exact arithmetic this is harmless, since the information about $x_1$ remains in the first row; but the coefficient of $x_2$ becomes $1-10^{20}$ and the right-hand side $2-10^{20}$, which in floating point are almost identical, so $x_2$ is computed as $1$ and the true correction $10^{-20}$ is rounded away. Back-substitution then gives $1-x_2=0$, hence $x_1=0$, while the true solution has $x_1\approx1$. After swapping the two rows the multiplier is only $10^{-20}$, the correction to $x_2$ survives, and the error is no longer amplified.

**Why is partial pivoting enough?** Complete pivoting (finding the largest absolute value in the remaining submatrix and swapping both rows and columns) gives a smaller theoretical growth factor, but it requires tracking column permutations and the extra comparisons are expensive. In practice the growth factor of partial pivoting rarely exceeds a few tens and, with IEEE floating point, is stable enough, which is why LAPACK uses partial pivoting by default.

**Why use Cholesky for symmetric positive definite matrices?** Symmetry ties $U$ in $A=LU$ to $L$: $A=A^\mathsf{T}$ forces $U=DL^\mathsf{T}$ with $D$ diagonal, so $A=LDL^\mathsf{T}$. Positive definiteness guarantees that the diagonal of $D$ is positive, so the square root can be absorbed into $L$, giving $A=LL^\mathsf{T}$. There are three benefits: half the storage (only $L$), half the work (about $\frac13n^3$), and no pivoting (positive definiteness keeps the pivots positive). Covariance matrices, finite element stiffness matrices, and the normal-equation matrices of least squares are all symmetric positive definite, so Cholesky is standard in those settings.

**Counterexample: not every matrix admits an LU factorization without pivoting.** The matrix with first row $(0,1)$ and second row $(1,0)$ has a zero first pivot and cannot be eliminated without a row swap, yet it is invertible and factorizes after the swap. So the existence of an LU factorization does not follow from invertibility; a nonzero pivot is an extra condition. More generally, an LU factorization without pivoting exists only if all leading principal minors of $A$ are nonzero.

**Why not compute the inverse?** Forming $A^{-1}$ explicitly costs about $2n^3$ operations (three times LU), needs $n^2$ storage, and has larger numerical error: the entries of $A^{-1}$ can be much larger than those of $A$ and amplify rounding when multiplied. Unless every column of the inverse is genuinely needed, always factorize and back-substitute.

**Growth factor and backward stability.** In floating point, Gaussian elimination can be viewed as exact elimination on a perturbed matrix, the perturbation being of the order of machine precision times the growth factor. As long as the growth factor does not grow exponentially with $n$ the algorithm is backward stable. Partial pivoting bounds the growth factor by $2^{n-1}$ in the worst case, far above what is seen in practice; complete pivoting is theoretically smaller, but the extra cost is not worth it.

## 4. Intuition and Pictures

Gaussian elimination is like clearing a triangle: use the first row to sweep the first column of all rows below to zero, the second row to sweep the second column below, and so on until an upper triangle remains. Back-substitution is like dismantling a tower from the top: solve the last unknown first, substitute back for the second last, and continue to the bottom.

LU factorization is like archiving the elimination process: $L$ records which elimination operations were performed and $U$ records the result. Next time a different right-hand side $b$ arrives there is no need to eliminate again—just do two back-substitutions with the archived $L$ and $U$. That is the value of factorizing once and using many times.

Engineering practice says "factor once, solve many times": $L$ and $U$ depend only on the matrix, not on the right-hand side. With a hundred right-hand sides the factorization is done once and each solve costs about $2n^2$ instead of a fresh $\frac23n^3$. In finite element analysis, where the stiffness matrix is fixed and load cases are many, this is exactly the situation.

| Method | Applicable matrices | Cost | Pivoting | Storage |
|---|---|---|---|---|
| Gaussian elimination | general square | $\frac23n^3$ | required | $n^2$ |
| LU factorization | general square | $\frac23n^3$ | required ($PA=LU$) | $n^2$ |
| Cholesky | symmetric positive definite | $\frac13n^3$ | not required | about $\frac12n^2$ |
| Thomas algorithm | tridiagonal | $O(n)$ | generally not | $O(n)$ |

> Intuition: the condition number is an error amplifier. $\kappa(A)=10^3$ means one digit of rounding in the right-hand side can become three digits of error in the solution; with $\kappa(A)=10^{16}$ double precision cannot guarantee a single correct digit. Pivoting stops the algorithm from creating a disaster of its own, while the condition number describes how sensitive the problem is; the two are not substitutes for each other.

## 5. Worked Examples

### Example 1 (basic: Gaussian elimination with partial pivoting)

Problem: solve

$$2x_1+x_2-x_3=8,\qquad -3x_1-x_2+2x_3=-11,\qquad -2x_1+x_2+2x_3=-3$$

Analysis: the first column has entries $2,-3,-2$; the largest in absolute value is $-3$ (second row), so swap the first and second rows first.

Solution: the three augmented rows are $(2,1,-1\mid8)$, $(-3,-1,2\mid-11)$, $(-2,1,2\mid-3)$. After swapping the first two:

$$R_1=(-3,-1,2\mid-11),\quad R_2=(2,1,-1\mid8),\quad R_3=(-2,1,2\mid-3)$$

Eliminate the first column: $m_{21}=\dfrac{2}{-3}=-\dfrac23$ and $m_{31}=\dfrac{-2}{-3}=\dfrac23$.

$$R_2\leftarrow R_2+\frac23R_1=(0,\ \frac13,\ \frac13\mid\frac23)$$

$$R_3\leftarrow R_3-\frac23R_1=(0,\ \frac53,\ \frac23\mid\frac{13}{3})$$

In the second column $\left|\frac53\right|>\left|\frac13\right|$, so swap the second and third rows:

$$R_2=(0,\frac53,\frac23\mid\frac{13}{3}),\quad R_3=(0,\frac13,\frac13\mid\frac23)$$

Eliminate the second column: $m_{32}=\dfrac{1/3}{5/3}=\dfrac15$.

$$R_3\leftarrow R_3-\frac15R_2=(0,\ 0,\ \frac13-\frac{2}{15}\mid\frac23-\frac{13}{15})=(0,0,\frac15\mid-\frac15)$$

Back-substitution: $\frac15x_3=-\frac15$ gives $x_3=-1$; $\frac53x_2+\frac23(-1)=\frac{13}{3}$ gives $\frac53x_2=5$ and $x_2=3$; and $-3x_1-3+2(-1)=-11$ gives $-3x_1=-6$ and $x_1=2$. Hence

$$x=(2,3,-1)^\mathsf{T}$$

Substituting into the three equations confirms the solution.

> Comment: the right-hand side must be updated at every step, and swapped along with the rows. Back-substitution starts from the last equation; check that the pivot is nonzero before dividing.

### Example 2 (advanced: Cholesky factorization)

Problem: factorize the symmetric matrix with rows $(4,12,-16)$, $(12,37,-43)$, $(-16,-43,98)$ by Cholesky, and show that it is symmetric positive definite.

Solution: let the diagonal entries of $L$ be $l_{11},l_{22},l_{33}$ and determine the lower triangular entries. The formulas are

$$l_{kk}=\sqrt{a_{kk}-\sum_{j<k}l_{kj}^2},\qquad l_{ik}=\frac{1}{l_{kk}}\left(a_{ik}-\sum_{j<k}l_{ij}l_{kj}\right)$$

Column by column.

First column: $l_{11}=\sqrt4=2$, $l_{21}=\dfrac{12}{2}=6$, $l_{31}=\dfrac{-16}{2}=-8$.

Second column: $l_{22}=\sqrt{37-6^2}=\sqrt{37-36}=1$, $l_{32}=\dfrac{-43-(-8)(6)}{1}=-43+48=5$.

Third column: $l_{33}=\sqrt{98-(-8)^2-5^2}=\sqrt{98-64-25}=\sqrt9=3$.

So the rows of $L$ are $(2,0,0)$, $(6,1,0)$, $(-8,5,3)$.

Check: the inner product of the first row with the first column gives $4$; of the second row with the first column, $6\cdot2=12$; of the third row with the first column, $-8\cdot2=-16$; of the second row with itself, $36+1=37$; of the third row with the second column, $-8\cdot6+5\cdot1=-43$; of the third row with itself, $64+25+9=98$. All agree.

Positive definiteness: the three pivots $2,1,3$ are all positive, and the leading principal minors are $4>0$, $4\cdot37-12^2=4>0$, and $\det A=4$, all positive, so $A$ is symmetric positive definite.

> Comment: Cholesky needs no pivoting because positive definiteness keeps every radicand positive. If a negative number appears during the computation the matrix is not positive definite (or has been destroyed by rounding), so stop and check the input.

### Example 3 (challenging: the disaster of a small pivot)

Problem: solve $10^{-20}x_1+x_2=1$, $x_1+x_2=2$ by Gaussian elimination without pivoting, and explain the source of the error.

Solution: the multiplier is $m_{21}=\dfrac{1}{10^{-20}}=10^{20}$. Subtract $10^{20}$ times the first row from the second:

$$(1-10^{20}\cdot10^{-20})x_1+(1-10^{20})x_2=2-10^{20}$$

In exact arithmetic the coefficient of $x_1$ is zero and the equation reduces to $(1-10^{20})x_2=2-10^{20}$, giving $x_2=\dfrac{2-10^{20}}{1-10^{20}}=1-10^{-20}$. Substituting back into the first equation,

$$10^{-20}x_1+(1-10^{-20})=1\quad\Longrightarrow\quad x_1=\frac{10^{-20}}{10^{-20}}=1$$

Everything is fine. The problem is in floating point: $1-10^{-20}$ and $1$ are indistinguishable in double precision, so $x_2$ is stored as $1$ and back-substitution gives $1-x_2=0$, hence $x_1=0$, while the true solution has $x_1\approx1$. The information is not lost through the formula but because "the difference between $1$ and $1-10^{-20}$ is below machine precision".

Swap the two rows first instead:

$$x_1+x_2=2,\qquad 10^{-20}x_1+x_2=1$$

The multiplier is $m=10^{-20}$, the second row becomes $(1-10^{-20})x_2=1-2\times10^{-20}$, giving $x_2\approx1$ and then $x_1\approx1$, correctly.

> Comment: the trap is that nothing goes wrong even in exact arithmetic. $1-1=0$ is legitimate, yet it marks the loss of information. Whether a pivot is too small cannot be judged by asking whether it is zero but only by comparing it with the other entries in its column; that is why partial pivoting chooses the largest absolute value in the column.

## 6. Common Errors and Pitfalls

1. **Forgetting to swap the right-hand side along with the rows.** Swapping only the coefficient rows solves a different system. In code, append $b$ to the augmented matrix and swap whole rows.
2. **Getting the sign of the multiplier backwards.** $R_i\leftarrow R_i-m_{ik}R_k$ with $m_{ik}=a_{ik}/a_{kk}$; writing a plus sign reverses the elimination.
3. **Assuming $A=LU$ always holds.** It requires nonzero pivots; a general matrix only admits $PA=LU$. With a zero pivot and no swap the program divides by zero.
4. **Using Cholesky on a non-positive-definite matrix.** The radicand goes negative and the algorithm collapses. Check positive definiteness first via leading principal minors or eigenvalues.
5. **Believing pivoting lowers the condition number.** Pivoting only prevents the algorithm from amplifying error; it does not change the sensitivity of the problem. An ill-conditioned matrix stays ill-conditioned under any pivoting.
6. **Using dense LU on a sparse matrix.** Elimination creates a great deal of fill-in, and both storage and work explode; use sparse ordering and sparse elimination.
7. **Solving equations by inverting the matrix.** Three times the work and larger error; factorize and back-substitute instead.
8. **Treating the diagonal of $L$ as multipliers.** In Doolittle's form the diagonal of $L$ is fixed at 1 and the multipliers live only in the strictly lower triangle; putting them on the diagonal double-scales during back-substitution.

## 7. Summary and Mnemonics

- Gaussian elimination is repeated left multiplication by unit lower triangular matrices, and the elimination process itself yields $A=LU$.
- Solving $Ax=b$ splits into $Ly=b$ and $Ux=y$, each $O(n^2)$, which suits many right-hand sides.
- Partial pivoting picks the largest absolute value in the column, preventing catastrophic cancellation from a small pivot.
- For symmetric positive definite matrices use Cholesky $A=LL^\mathsf{T}$: half the work, half the storage, and no pivoting.
- The condition number describes the sensitivity of the problem, which is a different matter from the stability of the algorithm.
- Elimination costs about $\frac23n^3$ operations and doubling $n$ costs eight times more; this is why iterative methods exist.
- The Thomas algorithm brings a tridiagonal system from $O(n^3)$ down to $O(n)$, a triumph of sparsity.
- Pivoting does not change the condition number; it only stops the algorithm from amplifying its own error. Ill-conditioned problems must be addressed at the modelling level.

**Mnemonic: eliminate to a triangle, factorize and store; swap a small pivot, take the square root when symmetric.**
`,
    keyPoints: [
      'Elimination = left multiplication by unit lower triangular matrices, whose product gives L',
      'Partial pivoting avoids catastrophic cancellation caused by a small pivot',
      'PA=LU; for symmetric positive definite use A=LLᵀ, halving the work',
      'Tridiagonal systems use the Thomas algorithm with complexity O(n)',
    ],
  },
  'iterative-methods': {
    chapter: 'Chapter 5 Iterative Methods for Linear Systems',
    title: 'Iterative Methods and Condition Numbers',
    summary:
      'Do not factorize the matrix, just multiply matrix by vector repeatedly: the success of Jacobi, Gauss–Seidel, and SOR all hinges on the spectral radius.',
    content: String.raw`

Discretize a two-dimensional Poisson equation by finite differences on a $1000\times1000$ grid and there are a million unknowns. Dense LU needs about $\frac23(10^6)^3\approx6.7\times10^{17}$ operations, which takes a very long time even on a machine doing a trillion floating-point operations per second; storing a dense matrix of a million unknowns needs $8\times10^{12}$ bytes, that is 8 TB. Direct methods fail completely here.

But such matrices have one life-saving property: they are **sparse**. Each unknown is coupled only to a few neighbours, and each row of the matrix has only four or five nonzero entries. For such a matrix the product $Ax$ costs only $O(n)$ operations. Iterative methods exploit exactly this: they do not factorize the matrix but repeatedly multiply by it and add or subtract vectors, each step costing $O(n)$, reaching adequate accuracy in a few tens of steps.

The idea is simple: guess a solution $x^{(0)}$, then design a rule that turns the current guess into a better one $x^{(1)},x^{(2)},\dots$. The question is how to design the rule so that the guesses really improve. The answer lies in the spectral radius of the matrix.

## 2. Rigorous Definitions

**Definition 1 (matrix splitting)** Write $A$ as

$$A=D-L-U$$

where $D$ is the diagonal part of $A$, $-L$ the strictly lower triangular part and $-U$ the strictly upper triangular part (so the entries of $L$ and $U$ are non-negative).

**Definition 2 (Jacobi iteration)** From $Dx=(L+U)x+b$,

$$x^{(k+1)}=D^{-1}(L+U)x^{(k)}+D^{-1}b$$

with iteration matrix $B_J=D^{-1}(L+U)$. In components:

$$x_i^{(k+1)}=\frac{1}{a_{ii}}\left(b_i-\sum_{j\ne i}a_{ij}x_j^{(k)}\right)$$

**Definition 3 (Gauss–Seidel iteration)** From $(D-L)x=Ux+b$,

$$x^{(k+1)}=(D-L)^{-1}Ux^{(k)}+(D-L)^{-1}b$$

with iteration matrix $B_{GS}=(D-L)^{-1}U$. In components:

$$x_i^{(k+1)}=\frac{1}{a_{ii}}\left(b_i-\sum_{j<i}a_{ij}x_j^{(k+1)}-\sum_{j>i}a_{ij}x_j^{(k)}\right)$$

The difference is that when computing the $i$-th component the already updated values $x_j^{(k+1)}$ ($j<i$) are used at once.

**Definition 4 (successive over-relaxation, SOR)** With relaxation factor $\omega>0$,

$$x_i^{(k+1)}=(1-\omega)x_i^{(k)}+\omega\,\tilde{x}_i^{(k+1)}$$

where $\tilde{x}_i^{(k+1)}$ is the $i$-th component produced by Gauss–Seidel. $\omega=1$ reduces to Gauss–Seidel, $1<\omega<2$ is over-relaxation, and $0<\omega<1$ under-relaxation.

**Theorem 1 (convergence criterion)** For any initial value $x^{(0)}$, the iteration $x^{(k+1)}=Bx^{(k)}+g$ converges if and only if

$$\rho(B)<1$$

where $\rho(B)=\max_i|\lambda_i(B)|$ is the **spectral radius** of $B$.

**Theorem 2 (sufficient condition: diagonal dominance)** If $A$ is strictly diagonally dominant, that is

$$|a_{ii}|>\sum_{j\ne i}|a_{ij}|,\qquad i=1,\dots,n$$

then both Jacobi and Gauss–Seidel converge.

**Theorem 3 (convergence range of SOR)** If $A$ is symmetric positive definite, SOR converges for $0<\omega<2$ and diverges for $\omega\ge2$.

**Definition 5 (condition number)** For an invertible $A$, $\kappa(A)=\|A\|\|A^{-1}\|$. For a symmetric positive definite matrix, $\kappa_2(A)=\dfrac{\lambda_{\max}}{\lambda_{\min}}$.

## 3. Why It Is Defined This Way

**Why look at the spectral radius rather than the matrix norm?** Substitute the error $e^{(k)}=x^{(k)}-x^*$ into the iteration:

$$e^{(k)}=B^ke^{(0)}$$

$B^k\to0$ exactly when every eigenvalue of $B$ has modulus below 1 (if $B$ is diagonalizable the eigenvalues of $B^k$ are $\lambda_i^k$; if not, use the Jordan form and the conclusion still holds). The spectral radius gives the exact asymptotic rate: the closer $\rho$ is to 1 the slower the convergence. The matrix norm gives only a sufficient condition: $\|B\|<1$ guarantees convergence, but $\|B\|\ge1$ may still converge, because a norm can exceed the spectral radius.

**Why does diagonal dominance guarantee convergence?** For the Jacobi matrix $B_J=D^{-1}(L+U)$, using the infinity norm,

$$\|B_J\|_\infty=\max_i\sum_{j\ne i}\frac{|a_{ij}|}{|a_{ii}|}<1$$

The norm is below 1, hence convergence. For Gauss–Seidel one can prove $\|B_{GS}\|_\infty\le\|B_J\|_\infty<1$, so it converges too. Note that this is a sufficient, not a necessary, condition: many matrices without diagonal dominance also converge.

A sharper estimate is

$$\|B_{GS}\|_\infty=\max_i\frac{\sum_{j>i}|a_{ij}|}{|a_{ii}|-\sum_{j<i}|a_{ij}|}$$

Strict diagonal dominance makes the denominator positive and the numerator smaller than it, so the norm is below 1. The formula also shows that if the upper triangular part of some row is large, Gauss–Seidel may be slower than Jacobi, or even diverge. Convergence is ultimately decided by the spectral radius.

**Why is Gauss–Seidel usually faster than Jacobi?** It uses each new component as soon as it is computed—the latest information is used immediately. In information terms, the $i$-th component of round $k+1$ uses the $i-1$ freshest values of the same round, while Jacobi still uses all the old values from the previous round. For many practical problems the spectral radius of $B_{GS}$ is about the square of that of $B_J$, roughly halving the number of iterations.

**Why does Jacobi suit parallelism?** Each component update depends only on the whole vector of the previous round, so all components can be computed simultaneously; Gauss–Seidel has a dependency chain between components and must be sequential. GPUs commonly use Jacobi or its block version together with Chebyshev acceleration, trading parallelism against convergence speed.

**What does $\omega$ in SOR tune?** Write SOR as

$$x^{(k+1)}=x^{(k)}+\omega(\tilde{x}^{(k+1)}-x^{(k)})$$

The bracket is the correction suggested by Gauss–Seidel. $\omega>1$ means stepping a little further in the suggested direction and $\omega<1$ means being conservative. For matrices such as those from the Poisson equation there is an optimal $\omega_{opt}=\dfrac{2}{1+\sqrt{1-\rho(B_J)^2}}$ that minimizes the spectral radius. A badly chosen $\omega$ can be slower than Gauss–Seidel, and $\omega\ge2$ diverges outright.

**The optimal SOR parameter is usually unknown.** For the Poisson equation $\rho(B_J)=\cos(\pi h)$, giving $\omega_{opt}=\dfrac{2}{1+\sin(\pi h)}$, which tends to 2 as $h\to0$. Practical computation uses trial runs or adaptive estimates; a slight deviation from the optimum is not catastrophic, but exceeding 2 always diverges. This reminds us that a larger relaxation factor is not always better—there is a ceiling set by the spectral radius.

**Why is the conjugate gradient method faster?** For symmetric positive definite matrices, CG looks for the solution in the Krylov subspace $\mathcal{K}_k=\mathrm{span}\{b,Ab,\dots,A^{k-1}b\}$ that minimizes the error in the $A$-norm. It needs no tuning; each step costs one matrix-vector product and a few inner products; in exact arithmetic it converges within $n$ steps, and rounding usually adds a few more. The convergence rate is roughly governed by $\sqrt{\kappa(A)}$: lowering the condition number from $10^4$ to $10^2$ takes the iteration count from about 100 to about 10. Preconditioning exists precisely to lower $\kappa$.

**Why does the condition number matter?** Let the right-hand side of $Ax=b$ be perturbed by $\delta b$ and the solution by $\delta x$; then

$$A\delta x=\delta b\quad\Longrightarrow\quad\|\delta x\|\le\|A^{-1}\|\|\delta b\|$$

Dividing both sides by $\|x\|$ and using $\|b\|\le\|A\|\|x\|$,

$$\frac{\|\delta x\|}{\|x\|}\le\|A\|\|A^{-1}\|\frac{\|\delta b\|}{\|b\|}=\kappa(A)\frac{\|\delta b\|}{\|b\|}$$

so $\kappa(A)$ bounds the relative error amplification. When $\kappa$ is large, even a perfect algorithm cannot survive a little noise in the input. The convergence rate of iterative methods is also affected: the iteration count of CG is roughly proportional to $\sqrt{\kappa}$.

**The stopping rule must look at the residual, not only at the step.** From $A(x-x^*)=r$ we get $\|x-x^*\|\le\|A^{-1}\|\|r\|$, so the error bound is the residual multiplied by $\|A^{-1}\|$. If $\|A^{-1}\|$ is large, a small residual can coexist with a large error. A practical rule is the relative residual $\|r^{(k)}\|/\|b\|<\varepsilon$, supplemented by the difference between successive iterates.

**Counterexample: diagonal dominance is not necessary.** For the matrix with first row $(2,3)$ and second row $(1,2)$, the first row has $2<3$ and diagonal dominance fails. But the rows of $B_J$ are $(0,-1.5)$ and $(-0.5,0)$, whose eigenvalues are $\pm\sqrt{0.75}\approx\pm0.866$, a spectral radius of $0.866<1$, so Jacobi converges. Diagonal dominance is only a sufficient condition and cannot be used to conclude divergence.

## 4. Intuition and Pictures

Jacobi iteration is like a class handing in papers simultaneously: in each round every student computes a new answer from the blackboard answers of the previous round, and all hand in together. Gauss–Seidel is like going to the blackboard in turn: the first student writes and the second immediately reads what was written, so information travels faster. SOR is like a teacher urging progress: when the direction is right, take a bigger step ($\omega>1$).

| Method | Work per step | Convergence | Parameters | Use |
|---|---|---|---|---|
| Jacobi | $O(\text{nnz})$ | slow | none | parallel friendly |
| Gauss–Seidel | $O(\text{nnz})$ | about twice Jacobi | none | sequential, general sparse |
| SOR | $O(\text{nnz})$ | can be much faster | choose $\omega$ | regularly structured problems |
| Conjugate gradient | $O(\text{nnz})$ | fast, governed by $\sqrt{\kappa}$ | none (symmetric positive definite) | symmetric positive definite sparse systems |

> Intuition: the condition number is like the density of contour lines on a topographic map. A well-conditioned problem is a gentle slope where one step reaches the bottom of the valley; an ill-conditioned one is a long narrow valley, steep across and gentle along, where a gradient method oscillates between the walls and takes a very long time to reach the bottom. Preconditioning rounds off the valley.

The convergence rate can be quantified roughly: with $\rho=\rho(B)$, shrinking the error by $10^{-m}$ takes about $\dfrac{m}{|\log_{10}\rho|}$ steps. For $\rho=0.9$ this is about $22m$ steps and for $\rho=0.5$ about $3.3m$. Lowering the spectral radius from 0.9 to 0.5 cuts the number of steps nearly sevenfold—the value of SOR and of preconditioning.

## 5. Worked Examples

### Example 1 (basic: Jacobi versus Gauss–Seidel)

Problem: solve

$$10x_1-x_2+2x_3=6,\qquad -x_1+11x_2-x_3=22,\qquad 2x_1-x_2+10x_3=-10$$

from $x^{(0)}=(0,0,0)$, taking three steps of Jacobi and of Gauss–Seidel, and compare.

Analysis: the diagonal entries $10,11,10$ exceed the sums of the other absolute values in their rows, $1+2=3$, $1+1=2$, $2+1=3$, so the matrix is strictly diagonally dominant and both methods converge. The exact solution is $(1,2,-1)$.

Solution: the Jacobi component formulas are

$$x_1^{(k+1)}=\frac{6+x_2^{(k)}-2x_3^{(k)}}{10},\quad x_2^{(k+1)}=\frac{22+x_1^{(k)}+x_3^{(k)}}{11},\quad x_3^{(k+1)}=\frac{-10-2x_1^{(k)}+x_2^{(k)}}{10}$$

First step:

$$x_1^{(1)}=\frac{6}{10}=0.6,\qquad x_2^{(1)}=\frac{22}{11}=2,\qquad x_3^{(1)}=\frac{-10}{10}=-1$$

Second step:

$$x_1^{(2)}=\frac{6+2-2(-1)}{10}=1.0,\qquad x_2^{(2)}=\frac{22+0.6+(-1)}{11}=1.9636,\qquad x_3^{(2)}=\frac{-10-2(0.6)+2}{10}=-0.92$$

Third step:

$$x_1^{(3)}=\frac{6+1.9636+1.84}{10}=0.9804,\qquad x_2^{(3)}=\frac{22+1.0-0.92}{11}=2.0073,\qquad x_3^{(3)}=\frac{-10-2(1.0)+1.9636}{10}=-1.0036$$

Gauss–Seidel uses the newest values:

First step:

$$x_1^{(1)}=0.6,\quad x_2^{(1)}=\frac{22+0.6+0}{11}=2.0545,\quad x_3^{(1)}=\frac{-10-2(0.6)+2.0545}{10}=-0.9145$$

Second step:

$$x_1^{(2)}=\frac{6+2.0545-2(-0.9145)}{10}=0.9884$$

$$x_2^{(2)}=\frac{22+0.9884+(-0.9145)}{11}=2.0067,\qquad x_3^{(2)}=\frac{-10-2(0.9884)+2.0067}{10}=-0.9970$$

Third step:

$$x_1^{(3)}=\frac{6+2.0067+1.9940}{10}=1.0001,\qquad x_2^{(3)}=\frac{22+1.0001-0.9970}{11}=2.0003$$

$$x_3^{(3)}=\frac{-10-2(1.0001)+2.0003}{10}=-0.99999$$

Comparison: after three steps the Gauss–Seidel error is about $2.8\times10^{-4}$ while the Jacobi error is about $0.02$, a difference of nearly two orders of magnitude.

> Comment: Gauss–Seidel is not a cleverer formula, it just uses new information earlier. That also explains why it is hard to parallelize: the $i$-th component must wait for the first $i-1$.

### Example 2 (advanced: condition number and perturbation amplification)

Problem: let $A$ have rows $(1,1)$ and $(1,1.0001)$ and $b=(2,2.0001)$, with solution $x=(1,1)$. If the second component of $b$ increases by $0.0001$, what happens to the solution? Compute $\kappa_\infty(A)$ and verify the error bound.

Solution: the new system is

$$x_1+x_2=2,\qquad x_1+1.0001x_2=2.0002$$

Subtracting the two equations: $0.0001x_2=0.0002$, so $x_2=2$ and $x_1=0$. The solution jumps from $(1,1)$ to $(0,2)$.

Relative errors: $\|\delta b\|_\infty=0.0001$ and $\|b\|_\infty=2.0001$, so the relative perturbation of the right-hand side is about $5\times10^{-5}$. With $\|\delta x\|_\infty=1$ and $\|x\|_\infty=1$, the relative change of the solution is 1.

Condition number: $\|A\|_\infty=2.0001$. Here $A^{-1}=\dfrac{1}{0.0001}$ times the matrix with rows $(1.0001,-1)$ and $(-1,1)$, whose infinity norm is $10^4\times2.0001=20001$. Hence

$$\kappa_\infty(A)=2.0001\times20001\approx4.0\times10^4$$

The error bound gives $\kappa(A)\cdot5\times10^{-5}\approx2$, and the actual relative error $1$ does not exceed the bound $2$, confirming the estimate.

Explanation: the two rows of the matrix are almost identical, $A$ is nearly singular, and the entries of the inverse are enormous. A perturbation of $0.0001$ in the input is amplified by $A^{-1}$ into an $O(1)$ error in the solution.

> Comment: this is not the algorithm's fault but the ill-conditioning of the problem. Any direct or iterative method gives the same result. The only way out is to improve the model (change the basis, add regularization) or to increase the precision of the input.

### Example 3 (challenging: diagonal dominance is only sufficient)

Problem: for the matrix $A$ with rows $(2,3)$ and $(1,2)$, decide whether Jacobi and Gauss–Seidel converge; then do the same for $A'$ with rows $(1,2)$ and $(2,1)$.

Solution: for the first matrix $A$, $D$ is diagonal with entries $2,2$, and

$$B_J=D^{-1}(L+U)=\text{rows }(0,-1.5),\ (-0.5,0)$$

The characteristic equation is $\lambda^2-0.75=0$, giving $\lambda=\pm0.866$ and $\rho(B_J)=0.866<1$, so Jacobi converges. Gauss–Seidel:

$$B_{GS}=(D-L)^{-1}U=\text{rows }(0,-1.5),\ (0,0.75)$$

with eigenvalues $0$ and $0.75$, so $\rho=0.75<1$ and it also converges. Although the first row has $2<3$ and diagonal dominance fails, both methods converge.

For the second matrix $A'$ with rows $(1,2)$ and $(2,1)$:

$$B_J=\text{rows }(0,-2),\ (-2,0)$$

with eigenvalues $\pm2$, so $\rho=2>1$ and Jacobi diverges. Gauss–Seidel: the rows of $B_{GS}$ are $(0,-2)$ and $(0,4)$, with eigenvalues $0,4$, so $\rho=4>1$ and it diverges too.

> Comment: the trap is treating diagonal dominance as a necessary and sufficient condition. It is only sufficient: satisfying it guarantees convergence, but failing it does not imply divergence. The only reliable criterion is the spectral radius $\rho(B)<1$; diagonal dominance is merely a shortcut for drawing a conclusion without computing eigenvalues.

## 6. Common Errors and Pitfalls

1. **Using $\|B\|<1$ instead of $\rho(B)<1$ to decide divergence.** A norm can exceed the spectral radius, so $\|B\|\ge1$ may still converge; conversely $\rho(B)\ge1$ certainly diverges.
2. **Reversing the signs in $A=D-L-U$.** If $L$ and $U$ are defined as the lower and upper triangular parts of $A$ themselves (without the minus sign), the iteration changes sign throughout.
3. **Still using old values when updating Gauss–Seidel.** That simply writes Jacobi; make sure components with $j<i$ use the new values of the current round.
4. **Choosing $\omega$ outside $(0,2)$ in SOR.** For symmetric positive definite matrices only $0<\omega<2$ guarantees convergence; $\omega\ge2$ diverges.
5. **Judging convergence by the difference of two successive iterates alone.** When convergence is slow the difference is small while the error is still large; also check the residual $\|b-Ax^{(k)}\|$ and use the condition number.
6. **Forcing an iterative method on an ill-conditioned matrix.** Without preconditioning convergence can be extremely slow; use preconditioned conjugate gradients or another Krylov method.
7. **Assuming iterative methods are always less accurate than direct ones.** On well-conditioned problems an iteration can run to machine precision; the difference lies in speed and robustness.
8. **Treating preconditioning as a panacea.** A preconditioner must approximate $A$ while $M^{-1}$ is cheap; a poor choice increases the iteration count and can even destroy symmetry.
9. **Confusing block and point iterations.** Block Jacobi and block Gauss–Seidel solve small blocks and have different convergence behaviour; when implementing them, be explicit about the block size and ordering.

## 7. Summary and Mnemonics

- Iterative methods split $A$ into $D-L-U$ and only multiply matrix by vector, which suits large sparse systems.
- Convergence is equivalent to the spectral radius satisfying $\rho(B)<1$; a norm below 1 is only sufficient.
- Strict diagonal dominance guarantees convergence of Jacobi and Gauss–Seidel but is not necessary.
- Gauss–Seidel uses the newest components and is usually about twice as fast as Jacobi; SOR converges for symmetric positive definite matrices when $0<\omega<2$.
- The condition number measures the sensitivity of the problem, which neither pivoting nor a change of algorithm can alter.
- A small residual is not a small error; the stopping rule must be understood through the scale of $\|A^{-1}\|$.
- Every step the spectral radius moves closer to 1 multiplies the iteration count; preconditioning is essentially pushing the spectral radius down.
- Jacobi can be parallelized while Gauss–Seidel must be sequential; in parallel environments one trades speed against information use.

**Mnemonic: iteration watches the spectral radius, dominance is only sufficient; use new values first, relax to set the step.**
`,
    keyPoints: [
      'Convergence of an iteration is equivalent to ρ(B)<1',
      'Strict diagonal dominance is a sufficient condition, not a necessary one',
      'Gauss–Seidel uses the newest components and is usually about twice as fast as Jacobi',
      'SOR converges for symmetric positive definite matrices when 0<ω<2',
      'The condition number measures the sensitivity of the problem; pivoting cannot cure ill-conditioning',
    ],
  },
  'numerical-linear': {
    chapter: 'Chapter 3 Numerical Linear Algebra',
    title: 'Numerical Solution of Linear Systems and Eigenvalue Problems',
    summary:
      'From Gaussian elimination to the QR algorithm: direct and iterative methods run on two tracks, the condition number warns of ill-conditioning, and eigenvalues are approached by iteration.',
    content: String.raw`

Numerical linear algebra rests on two pillars. The first is solving $Ax=b$: given a matrix and a right-hand side, find the unknown vector. The second is the eigenvalue problem $Ax=\lambda x$: find the vectors whose direction $A$ leaves unchanged, together with the stretch factor. The first describes input and output, the second the natural modes of a system—the vibration frequencies of a bridge, the steady state of a Markov chain, the principal directions of principal component analysis, the weights of a web ranking are all eigenvalue problems.

In theory the eigenvalues are the roots of the characteristic polynomial $\det(A-\lambda I)=0$. But that theoretical route is all but hopeless numerically: the coefficients of the characteristic polynomial of an $n\times n$ matrix can be extremely sensitive, and at $n=20$ a tiny perturbation of the coefficients can move the roots far away; besides, root finding for a polynomial is itself another numerical problem. Real algorithms therefore never expand the characteristic polynomial but approach the eigenvalues and eigenvectors by iteration.

This topic ties together the earlier ones: direct methods (LU, Cholesky) solve systems, iterative methods handle large sparse ones, the condition number explains why some problems are inherently hard, and finally three weapons for eigenvalues—power iteration, inverse iteration, and the QR algorithm.

## 2. Rigorous Definitions

**Definition 1 (eigenvalue problem)** Let $A\in\mathbb{R}^{n\times n}$. If there is a number $\lambda$ (possibly complex) and a nonzero vector $x$ with

$$Ax=\lambda x$$

then $\lambda$ is an **eigenvalue** of $A$ and $x$ a corresponding **eigenvector**. The set of all eigenvalues is the **spectrum** $\sigma(A)$.

**Definition 2 (power iteration)** Take a nonzero initial vector $v^{(0)}$ and set

$$u^{(k)}=Av^{(k-1)},\qquad v^{(k)}=\frac{u^{(k)}}{\|u^{(k)}\|_\infty},\qquad \mu_k=\|u^{(k)}\|_\infty$$

Then $\mu_k\to\lambda_1$ (the eigenvalue of largest modulus) and $v^{(k)}$ tends to the corresponding unit eigenvector.

**Definition 3 (Rayleigh quotient)** For a real symmetric matrix $A$ and a nonzero vector $v$,

$$R(v)=\frac{v^\mathsf{T}Av}{v^\mathsf{T}v}$$

It gives an estimate of $\lambda$ whose error is of the square of the error in the eigenvector.

**Definition 4 (inverse iteration)** Given an approximate eigenvalue $\mu$ (the shift), iterate

$$(A-\mu I)u^{(k)}=v^{(k-1)},\qquad v^{(k)}=\frac{u^{(k)}}{\|u^{(k)}\|_\infty}$$

It converges to the eigenvector of the eigenvalue nearest $\mu$; if $\mu=0$ it converges to the eigenvalue of smallest modulus.

**Definition 5 (QR algorithm)** Set $A_0=A$ and for $k=0,1,2,\dots$:

$$A_k=Q_kR_k\quad(\text{QR factorization}),\qquad A_{k+1}=R_kQ_k$$

Then $A_k$ is similar to $A$ ($A_{k+1}=Q_k^\mathsf{T}A_kQ_k$), and under suitable conditions $A_k$ converges to an upper triangular matrix whose diagonal entries tend to the eigenvalues.

**Definition 6 (condition number of an eigenvalue)** For a simple eigenvalue $\lambda$ with left and right eigenvectors $x,y$ ($Ax=\lambda x$, $y^\mathsf{T}A=\lambda y^\mathsf{T}$), define

$$\kappa(\lambda)=\frac{\|x\|\,\|y\|}{|y^\mathsf{T}x|}$$

as the condition number of the eigenvalue. For a normal matrix ($A^\mathsf{T}A=AA^\mathsf{T}$), $\kappa(\lambda)=1$.

## 3. Why It Is Defined This Way

**Why does power iteration capture the dominant eigenvalue?** Suppose $A$ is diagonalizable with eigenvectors $u_1,\dots,u_n$ forming a basis, and expand the initial vector:

$$v^{(0)}=\sum_{i=1}^{n}c_iu_i$$

Then

$$A^kv^{(0)}=\sum_{i=1}^{n}c_i\lambda_i^ku_i=\lambda_1^k\left(c_1u_1+\sum_{i=2}^{n}c_i\left(\frac{\lambda_i}{\lambda_1}\right)^ku_i\right)$$

If $|\lambda_1|>|\lambda_2|\ge\cdots$, every term in the bracket except the first tends to zero, the direction tends to $u_1$, and the norm is multiplied by $\lambda_1$ each step. Normalization only prevents overflow or underflow and does not change the direction. The rate is governed by the ratio $\left|\dfrac{\lambda_2}{\lambda_1}\right|$: the smaller the ratio, the faster.

**Why require $c_1\ne0$?** If the initial vector happens to be orthogonal to $u_1$ then $c_1=0$, power iteration never sees the dominant eigenvector and converges to the second largest. In practice rounding introduces a little $u_1$ component, so it usually still converges, but for specially structured matrices (block diagonal, say) it may genuinely stall.

**Why is the Rayleigh quotient more accurate?** For a symmetric matrix, if $v=u_1+\varepsilon w$ with $w\perp u_1$, then

$$R(v)=\lambda_1+\varepsilon^2\frac{w^\mathsf{T}Aw}{w^\mathsf{T}w}+O(\varepsilon^3)$$

The first-order error term vanishes, so the Rayleigh quotient has error $O(\varepsilon^2)$. That is why, after a few power iterations, the Rayleigh quotient can double the accuracy of the eigenvalue.

**Why does inverse iteration find the eigenvalue nearest $\mu$?** The eigenvalues of $(A-\mu I)^{-1}$ are $\dfrac{1}{\lambda_i-\mu}$. The largest $\dfrac{1}{|\lambda_i-\mu|}$ corresponds to the smallest $|\lambda_i-\mu|$, that is the eigenvalue nearest $\mu$. Power iteration on $(A-\mu I)^{-1}$ therefore converges to it. If $\mu$ is accurate the convergence is very fast; each step solves a linear system, which after an LU factorization costs only $O(n^2)$ for back-substitution.

**What is the convergence ratio of inverse iteration?** Applying power iteration to $(A-\mu I)^{-1}$, the dominant eigenvalue is $\dfrac{1}{\lambda_j-\mu}$ ($\lambda_j$ nearest $\mu$) and the next is $\dfrac{1}{\lambda_k-\mu}$, so the convergence ratio is about

$$\left|\frac{\mu-\lambda_j}{\mu-\lambda_k}\right|$$

The closer $\mu$ is to $\lambda_j$ the smaller the numerator and the faster the convergence. This is why a cheap method is used for a rough estimate and inverse iteration for refinement.

**Why can the QR algorithm find all eigenvalues?** First the intuition: for a symmetric $A$, QR iteration is like repeatedly rotating $A$ until it is ever closer to diagonal form. Strictly, $A_{k+1}=Q_k^\mathsf{T}A_kQ_k$ is an orthogonal similarity transformation, so the eigenvalues do not change. For a general symmetric matrix $A_k$ converges to a diagonal matrix; for a nonsymmetric one it converges to upper triangular form (real Schur form), with the eigenvalues on the diagonal (complex ones appearing in $2\times2$ blocks). The rate depends on ratios of neighbouring eigenvalues, so practical algorithms add shifts: use the bottom-right entry $\mu_k$ of $A_k$ as a shift, factorize $A_k-\mu_kI$, and shift back. QR with Wilkinson shifts usually converges one eigenvalue every few steps.

**Shifts and deflation.** When the subdiagonal entry of $A_k$ is small enough, set it to zero; the matrix splits into two blocks and the eigenvalue problem splits into two smaller ones—this is deflation. Shifted QR first drives the eigenvalue nearest the shift to the bottom-right corner, then deflates and handles the remaining block. The whole process peels eigenvalues off one layer at a time, like an onion. Practical software first reduces the matrix to Hessenberg form or tridiagonal form by Householder transformations, bringing the cost per QR step from $O(n^3)$ down to $O(n^2)$.

**Why not use the characteristic polynomial?** Take Wilkinson's polynomial: its roots are extremely sensitive to the coefficients, and a perturbation in the last digit of a coefficient can move them far. Computing eigenvalues is essentially an ill-conditioned version of root finding, so expanding the polynomial is a deliberate walk into ill-conditioning. The QR algorithm bypasses the polynomial and works with orthogonal transformations on the matrix, which is numerically stable.

**The actual size of condition numbers.** The inverse of the $3\times3$ Hilbert matrix has integer entries, with $\|H_3\|_\infty=1+\frac12+\frac13\approx1.833$ and $\|H_3^{-1}\|_\infty=408$, so $\kappa_\infty(H_3)\approx748$; at order ten $\kappa_2$ is about $1.6\times10^{13}$. Such matrices appear constantly in least squares and moment problems, reminding us that "the matrix does not look big but the problem may be extremely hard". Both eigenvalue problems and linear systems can be ill-conditioned, but for different reasons: the former through the angle between eigenvectors, the latter through the ratio of singular values.

**Counterexample: the eigenvalues of a non-normal matrix can be extremely sensitive.** For the matrix with first row $(0,1)$ and second row $(0,0)$ the eigenvalues are $0,0$. Change the lower-left entry from $0$ to $\varepsilon$: the rows become $(0,1)$ and $(\varepsilon,0)$, the characteristic polynomial is $\lambda^2-\varepsilon=0$, and the eigenvalues are $\pm\sqrt{\varepsilon}$. For $\varepsilon=10^{-8}$ the eigenvalues become $\pm10^{-4}$: an input perturbation of $10^{-8}$ produces an output change of $10^{-4}$, an amplification of $10^4$. This is an eigenvalue condition number far above 1, and no stability of the QR algorithm can save it.

## 4. Intuition and Pictures

Power iteration is like looking in a mirror repeatedly: each application of $A$ lets the direction most easily amplified dominate, while the others shrink relatively, until only the dominant direction remains.

Inverse iteration is like using a magnifying glass to find the nearest nail: put the shift $\mu$ at the estimated position and $(A-\mu I)^{-1}$ amplifies most strongly the eigenvalue closest to $\mu$.

The QR algorithm is like continuously rotating the coordinate system: each time choose an orthogonal frame in which the matrix looks more triangular; the rotations leave the eigenvalues unchanged but let them surface one by one onto the diagonal.

| Method | What it finds | Cost per step | Convergence | Use |
|---|---|---|---|---|
| Power iteration | dominant eigenvalue/vector | $O(n^2)$ | ratio of neighbouring eigenvalues | large sparse, only the dominant pair |
| Inverse iteration | eigenvalue nearest $\mu$ | $O(n^2)$ (given LU) | faster the better the shift | known approximation, refinement |
| QR algorithm | all eigenvalues | $O(n^3)$ once plus $O(n^2)$ per step | depends on eigenvalue ratios | small and medium dense |
| Jacobi rotations | all eigenvalues of a symmetric matrix | $O(n^3)$ | quadratic | high accuracy, small matrices |

> Intuition: the condition number has another meaning in eigenvalue problems. For a normal matrix the eigenvalues are insensitive to perturbations (condition number 1); for a non-normal matrix the eigenvectors are nearly parallel and a tiny perturbation can move an eigenvalue by an amount of order $\sqrt{\varepsilon}$ along a dangerous direction. Whether an eigenvalue problem is hard cannot be judged by $\kappa(A)$ alone; the angles between eigenvectors matter too.

## 5. Worked Examples

### Example 1 (basic: power iteration)

Problem: for $A$ with rows $(2,1)$ and $(1,2)$, take $v^{(0)}=(1,0)^\mathsf{T}$ and run four power iterations to find the dominant eigenvalue and eigenvector.

Solution: the eigenvalues of $A$ are $3$ and $1$, the dominant one $3$ having eigenvector $(1,1)^\mathsf{T}$.

First step:

$$Av^{(0)}=(2,1)^\mathsf{T},\qquad \mu_1=2,\qquad v^{(1)}=(1,0.5)^\mathsf{T}$$

Second step:

$$Av^{(1)}=(2.5,2)^\mathsf{T},\qquad \mu_2=2.5,\qquad v^{(2)}=(1,0.8)^\mathsf{T}$$

Third step:

$$Av^{(2)}=(2.8,2.6)^\mathsf{T},\qquad \mu_3=2.8,\qquad v^{(3)}=(1,0.9286)^\mathsf{T}$$

Fourth step:

$$Av^{(3)}=(2.9286,2.8571)^\mathsf{T},\qquad \mu_4=2.9286,\qquad v^{(4)}=(1,0.9756)^\mathsf{T}$$

The sequence $\mu_k$ approaches $3$ monotonically with errors shrinking by the ratio $\dfrac{\lambda_2}{\lambda_1}=\dfrac13$: $3-\mu_4=0.0714$ against $3-\mu_3=0.2$, a ratio of about $0.357$, close to $1/3$.

Refining with the Rayleigh quotient: take $v=(1,0.9756)$,

$$R(v)=\frac{v^\mathsf{T}Av}{v^\mathsf{T}v}=\frac{2.9756+0.9756\times2.9512}{1+0.9518}=\frac{5.8548}{1.9518}\approx2.9997$$

The Rayleigh quotient already pushes the error below $10^{-3}$, clearly better than $\mu_4$.

> Comment: power iteration does one matrix-vector product per step, which suits large sparse matrices. If the dominant eigenvalue is not unique (for instance $\lambda_1=-\lambda_2$) the iteration oscillates between two directions and does not converge.

### Example 2 (advanced: two QR steps)

Problem: perform two QR iterations on $A$ with rows $(2,1)$ and $(1,2)$ and watch the decay of the off-diagonal entries.

Solution: in the first step factorize $A$. The first column is $(2,1)^\mathsf{T}$, so $r_{11}=\sqrt5=2.2361$ and $q_1=(0.8944,0.4472)^\mathsf{T}$. The projection of the second column $(1,2)^\mathsf{T}$ on $q_1$ is $r_{12}=q_1^\mathsf{T}(1,2)=0.8944+0.8944=1.7889$. The residual is

$$(1,2)-1.7889(0.8944,0.4472)=(-0.6,1.2)$$

so $r_{22}=\sqrt{0.36+1.44}=1.3416$ and $q_2=(-0.4472,0.8944)^\mathsf{T}$. Hence

$$A_1=RQ=\text{rows }(2.8,0.6),\ (0.6,1.2)$$

and the off-diagonal entry falls from $1$ to $0.6$.

Second step: factorize $A_1$. The first column is $(2.8,0.6)$, so $r_{11}=\sqrt{8.2}=2.8636$ and $q_1=(0.9778,0.2095)$; $r_{12}=q_1^\mathsf{T}(0.6,1.2)=0.5867+0.2514=0.8381$; the residual is $(0.6,1.2)-0.8381(0.9778,0.2095)=(-0.2195,1.0244)$, so $r_{22}=1.0477$ and $q_2=(-0.2095,0.9778)$. Hence

$$A_2=RQ=\text{rows }(2.9756,0.2195),\ (0.2195,1.0244)$$

The off-diagonal entry goes $1\to0.6\to0.2195$, and the diagonal tends to $(3,1)$. Continuing, the off-diagonal decays by a factor of about $1/3$ per step.

> Comment: the convergence rate of unshifted QR is set by $|\lambda_2/\lambda_1|$, here $1/3$, so each step shrinks the off-diagonal to about a third. Practical software first tridiagonalizes (symmetric) or reduces to Hessenberg form (nonsymmetric) by Householder transformations, cutting the cost per step from $O(n^3)$ to $O(n^2)$, and then adds shifts for speed.

### Example 3 (challenging: failure of power iteration and eigenvalue sensitivity)

Problem: (1) for the matrix with first row $(0,1)$ and second row $(1,0)$, starting from $(1,0)$, what does power iteration do? (2) for the matrix with first row $(0,1)$ and second row $(\varepsilon,0)$, how do the eigenvalues vary with $\varepsilon$?

Solution: (1) this matrix has eigenvalues $1,-1$ of equal modulus, so the dominant eigenvalue is not unique.

$$v^{(0)}=(1,0)\to Av^{(0)}=(0,1)\to A^2v^{(0)}=(1,0)\to\cdots$$

The vector jumps between the two coordinate axes and $\mu_k$ stays at $1$ forever without converging to any eigenvector. The reason is that both expansion coefficients $c_1,c_2$ are nonzero while $|\lambda_1|=|\lambda_2|$, so the ratio does not decay.

(2) The characteristic polynomial of the matrix is

$$\det(A_\varepsilon-\lambda I)=\lambda^2-\varepsilon=0\quad\Longrightarrow\quad\lambda=\pm\sqrt{\varepsilon}$$

For $\varepsilon=10^{-8}$, $\lambda=\pm10^{-4}$: a perturbation of $10^{-8}$ in the matrix entries changes the eigenvalues by $10^{-4}$, an amplification of $10^4$. For $\varepsilon=10^{-16}$ the eigenvalues are still $\pm10^{-8}$ while double precision machine epsilon is about $10^{-16}$, so the eigenvalues can be computed only to about $\sqrt{\varepsilon_{\text{mach}}}\approx10^{-8}$. This is not an algorithmic problem but the condition number of the problem itself.

> Comment: two traps. First, power iteration requires a strictly dominant eigenvalue; when the moduli are equal it oscillates, and subspace iteration or QR should be used. Second, the eigenvalue condition number of a non-normal matrix can be enormous, so a small residual does not mean an accurate eigenvalue—check the eigenvector condition number as well.

## 6. Common Errors and Pitfalls

1. **Expanding the characteristic polynomial to find eigenvalues.** Not viable numerically: the coefficients are extremely sensitive and root finding is another ill-conditioned problem. Use orthogonal-transformation methods such as the QR algorithm.
2. **Not normalizing in power iteration.** The norm of $A^kv$ grows or decays as $\lambda_1^k$ and soon overflows or underflows; normalize every step.
3. **Power iteration with dominant eigenvalues of equal modulus.** When $|\lambda_1|=|\lambda_2|$ the vector oscillates without converging; use subspace iteration or QR.
4. **Confusing singular values with eigenvalues.** The eigenvalues of $A^\mathsf{T}A$ are the squares of the singular values, and the condition number is squared too; the two must not be mixed.
5. **Believing the QR algorithm converges in one step.** Unshifted QR is slow; practical work first reduces to Hessenberg or tridiagonal form and then adds Wilkinson shifts.
6. **Ignoring that $A$ may be singular when using power iteration on $A^{-1}$ for the smallest eigenvalue.** If $A$ is not invertible the inverse does not exist; add a shift $\mu$ and run inverse iteration on $A-\mu I$.
7. **Ignoring the sensitivity of non-normal matrices.** A small residual does not imply an accurate eigenvalue; estimate the eigenvalue condition number $\kappa(\lambda)$.
8. **Using the QR algorithm to find all eigenvalues of a sparse matrix.** QR iterations create fill-in and destroy sparsity; large sparse eigenvalue problems call for Krylov methods such as Arnoldi and Lanczos.
9. **Confusing the modulus of an eigenvalue with a singular value.** For a nonsymmetric matrix the modulus of an eigenvalue can be far below the largest singular value; the spectral norm cannot be estimated by substituting eigenvalues for singular values.

## 7. Summary and Mnemonics

- Direct methods for systems (LU, Cholesky) suit small and medium dense matrices; iterative methods suit large sparse ones.
- Never find eigenvalues through the characteristic polynomial; the QR algorithm approaches them directly by orthogonal similarity.
- Power iteration finds the eigenvalue of largest modulus, with convergence ratio $|\lambda_2/\lambda_1|$; the Rayleigh quotient doubles the accuracy again.
- Inverse iteration finds the eigenvalue nearest the shift $\mu$, and is faster the better the shift.
- The eigenvalues of a non-normal matrix can be extremely sensitive: a perturbation $\varepsilon$ can cause a change of order $\sqrt{\varepsilon}$.
- Large sparse problems use Krylov methods and small dense ones use QR; choosing the wrong tool is more common than computing wrongly.
- Eigenvalue problems are more sensitive than linear systems: the condition number is 1 for normal matrices and can be appallingly large otherwise.
- Power iteration gives only the dominant pair, QR gives the whole spectrum, and inverse iteration refines; the division of labour is clear.

**Mnemonic: power iteration grabs the big one, inverse iteration finds the nearest; QR rotates to triangular form, shifts make it fast.**
`,
    keyPoints: [
      'Gaussian elimination = LU; for symmetric positive definite use Cholesky LLᵀ',
      'κ(A) = ‖A‖‖A⁻¹‖ measures ill-conditioning; the Hilbert matrix is the classic case',
      'Three iterative methods: Jacobi, GS, SOR; large sparse systems use CG',
      'The QR algorithm is the workhorse for eigenvalues; power iteration captures only the dominant one',
    ],
  },
  'ode-numerical': {
    chapter: 'Chapter 7 Numerical Solution of Ordinary Differential Equations',
    title: 'Numerical Methods for Ordinary Differential Equations',
    summary:
      'Turn a differential equation into step-by-step arithmetic: Euler is first order, RK4 fourth order, and stiff problems demand implicit methods.',
    content: String.raw`

Many differential equations can be written down but not solved. The solution of $y'=e^{-t^2}$ is the integral $\int e^{-t^2}dt$, which has no elementary antiderivative; the equations of the three-body problem cannot be expressed in known functions at all. Engineers do not seek a closed form; they ask whether, given initial values, the values $y(t)$ at a number of times can be computed.

Euler's idea is charmingly simple: $y(t_0)=y_0$ is known, and the equation gives the slope at that instant, $y'(t_0)=f(t_0,y_0)$. If the slope stays constant over a short time $h$, then

$$y(t_0+h)\approx y_0+hf(t_0,y_0)$$

This is the forward Euler method. It replaces a curve by a chain of straight segments, each segment's slope fixed at its starting point. The smaller $h$, the closer the chain hugs the curve, but the more work is needed and the more rounding error accumulates.

Euler's method is only first order: halving the step halves the error. That is often not enough in engineering. Hence the Runge–Kutta methods: take several trial points within one step and use a weighted average of their slopes for a more accurate next value. The classical fourth-order Runge–Kutta method evaluates $f$ four times per step yet raises the accuracy to $O(h^4)$—halving the step cuts the error to a sixteenth. This topic also discusses a subtler problem: some equations (stiff equations) defeat explicit methods completely, and implicit methods are required.

## 2. Rigorous Definitions

**Definition 1 (initial value problem)** The first-order initial value problem

$$y'=f(t,y),\qquad y(t_0)=y_0$$

with $f:[t_0,T]\times\mathbb{R}\to\mathbb{R}$ continuous and satisfying a Lipschitz condition in $y$: there is $L\ge0$ such that

$$|f(t,y_1)-f(t,y_2)|\le L|y_1-y_2|$$

has a unique solution (the Picard–Lindelöf theorem).

**Definition 2 (one-step method)** A method of the form

$$y_{k+1}=y_k+h\,\Phi(t_k,y_k,h)$$

is a **one-step method**, with $h=t_{k+1}-t_k$ the step and $\Phi$ the increment function. Euler's method takes $\Phi=f(t_k,y_k)$.

**Definition 3 (local truncation error and order)** Let $y(t)$ be the exact solution and define the local truncation error

$$\tau_{k+1}=y(t_{k+1})-y(t_k)-h\Phi(t_k,y(t_k),h)$$

If $\tau_{k+1}=O(h^{p+1})$ the method is of **order $p$**. The global error of a $p$-th order method (accumulated over $N=(T-t_0)/h$ steps) is $O(h^p)$.

**Definition 4 (explicit and implicit Euler)**

- explicit (forward) Euler: $y_{k+1}=y_k+hf(t_k,y_k)$;
- implicit (backward) Euler: $y_{k+1}=y_k+hf(t_{k+1},y_{k+1})$, whose right-hand side contains the unknown $y_{k+1}$, so each step solves an equation (usually by Newton's method).

**Definition 5 (trapezoidal method)**

$$y_{k+1}=y_k+\frac{h}{2}\big(f(t_k,y_k)+f(t_{k+1},y_{k+1})\big)$$

It is a second-order implicit method.

**Definition 6 (classical fourth-order Runge–Kutta, RK4)**

$$k_1=f(t_k,y_k)$$

$$k_2=f\!\left(t_k+\frac h2,\ y_k+\frac h2k_1\right)$$

$$k_3=f\!\left(t_k+\frac h2,\ y_k+\frac h2k_2\right)$$

$$k_4=f(t_k+h,\ y_k+hk_3)$$

$$y_{k+1}=y_k+\frac h6(k_1+2k_2+2k_3+k_4)$$

**Definition 7 (stiff equations and A-stability)** If the solution contains both very slow and very fast components (eigenvalues with widely differing real parts), the equation is **stiff**. If the absolute stability region of a method contains the entire left half-plane, the method is **A-stable**. Explicit methods have bounded stability regions and therefore cannot be A-stable.

## 3. Why It Is Defined This Way

**Where does the Euler error come from?** Expand the exact solution in a Taylor series:

$$y(t_{k+1})=y(t_k)+hy'(t_k)+\frac{h^2}{2}y''(\xi_k)$$

Since $y'(t_k)=f(t_k,y(t_k))$,

$$\tau_{k+1}=\frac{h^2}{2}y''(\xi_k)=O(h^2)$$

The local error is second order; accumulating over $N$ steps with $N=O(1/h)$ gives a global error of $O(h)$. That is what first order means: the order refers to the global error.

**Why is implicit Euler more stable?** For the model equation $y'=\lambda y$ with $\lambda<0$, explicit Euler gives

$$y_{k+1}=(1+h\lambda)y_k$$

requiring $|1+h\lambda|<1$, that is $h<\dfrac{2}{|\lambda|}$; a slightly larger step oscillates and diverges. Implicit Euler gives

$$y_{k+1}=\frac{1}{1-h\lambda}y_k$$

and for every $h>0$, $\left|\dfrac{1}{1-h\lambda}\right|<1$: unconditional stability. The price is solving an equation at each step. The trapezoidal method has amplification factor $\dfrac{1+h\lambda/2}{1-h\lambda/2}$, which is also below 1 in modulus for $\lambda<0$ and tends to $-1$ as $h\lambda\to-\infty$ (not to 0), so it is A-stable but not L-stable.

**What does L-stability require beyond A-stability?** A-stability only requires the amplification factor to have modulus below 1 in the left half-plane; L-stability additionally requires it to tend to 0 as $h\lambda\to-\infty$. This extra requirement targets the stiff components: when a mode decays extremely fast, the numerical method should also drive it quickly to zero. Implicit Euler has amplification factor $\dfrac{1}{1-h\lambda}$, which tends to 0, so it is L-stable; the trapezoidal method tends to $-1$ and turns a fast-decaying component into a slowly decaying one with alternating sign, producing spurious oscillations.

**How is the equation solved at each step of an implicit method?** Take implicit Euler: each step solves

$$G(z)=z-y_k-hf(t_{k+1},z)=0$$

by Newton's method, $z_{j+1}=z_j-\dfrac{G(z_j)}{G'(z_j)}$, where $G'(z)=1-hf_y(t_{k+1},z)$. The initial guess is usually $z_0=y_k$ or an explicit-Euler predictor. If $h|f_y|$ is large, $G'$ is close to $-hf_y$, the Newton steps are small, and convergence is still fast; but for strongly nonlinear $f$ damping or more iterations may be needed. That is the cost of implicit methods: an inner iteration at every step.

**Why are the RK4 coefficients $1,2,2,1$?** They come from the weights of Simpson's rule. Integrate $y'=f(t,y)$:

$$y(t_{k+1})=y(t_k)+\int_{t_k}^{t_{k+1}}f(t,y(t))dt$$

Approximating the integral by Simpson's rule, with nodes $t_k$, the midpoint, and $t_{k+1}$, gives weights in the ratio $1:4:1$. To reach this accuracy without explicitly forming the partial derivative of $f$ with respect to $t$, RK4 builds an equivalent weighted average from four slope evaluations, and its weights $1,2,2,1$ divided by 6 are the division of labour of the Simpson weights. A rigorous derivation matches the Taylor expansion up to the $h^4$ term; here it is enough to remember the conclusion: fourth-order accuracy needs four stages.

**What are the order conditions?** Expand both $y_{k+1}$ and the exact solution in Taylor series at $t_k$ and require the coefficients of $h,h^2,\dots,h^p$ to agree term by term; this gives algebraic equations for the stage coefficients and weights, the order conditions. For $p=1$ there is one condition, for $p=2$ two, for $p=4$ eight. The four stages of RK4 supply exactly enough free parameters to satisfy the fourth-order conditions, and that is the rigorous origin of its order. Order conditions guarantee accuracy only, not stability; the two must be checked separately.

**Why does high order not mean stability?** Order describes the asymptotic error as $h\to0$, while stability describes whether the error is amplified at fixed $h$. A fourth-order method may have a tiny stability region, and on a stiff problem the step is then dictated by stability rather than accuracy. Practical selection looks at order, stability region, and cost per step together.

**What guarantees convergence?** Convergence of a one-step method is usually split into two facts: consistency (local truncation error $\tau=o(h)$, that is, at least first order) and zero-stability (small perturbations of the initial value are not amplified without bound). For one-step methods zero-stability follows from the Lipschitz condition on the increment function $\Phi$, and the two together give convergence. Multistep methods also need a root condition—the content of Dahlquist's equivalence theorem.

**How does adaptive stepping work?** The most common device is step doubling: compute one step of $h$ and two steps of $h/2$; the difference estimates the local error. If the error is below tolerance the step is enlarged, otherwise it is reduced and the step repeated. Embedded Runge–Kutta methods (RK45, for instance) nest two formulas of different order sharing the function evaluations, which is more efficient. For stiff problems the step control must also respect stability, otherwise the error estimate misleads.

**Counterexample: explicit methods collapse on stiff equations.** Take $y'=-100y$ with $y(0)=1$, whose exact solution is $y=e^{-100t}$. Explicit Euler requires $h<0.02$ for stability; with $h=0.1$ the amplification factor is $1+h\lambda=1-10=-9$, and the iterates $1,-9,81,-729,\dots$ oscillate and diverge exponentially while the true solution has long since decayed to zero. This is not an accuracy problem but a stability problem.

## 4. Intuition and Pictures

Euler's method is like a blind person feeling the way: at each step only the slope at the current position is felt, then you walk straight for $h$. The slope changes within the step, so the chain always drifts from the curve. A smaller step drifts less but requires more steps.

RK4 is like sending four scouts: measure the slope at the start, twice at the midpoint, and once at the end, then average with weights $1:2:2:1$. The two midpoint measurements correct the bending of the direction and the endpoint measurement corrects the slope at the end of the step. Four probes buy fourth-order accuracy, an excellent bargain.

| Method | Order | $f$ evaluations per step | Stability | Use |
|---|---|---|---|---|
| Explicit Euler | 1 | 1 | conditional, step limited | teaching, short intervals |
| Implicit Euler | 1 | 1 plus an equation solve | A-stable | stiff, long intervals |
| Trapezoidal | 2 | 1 plus an equation solve | A-stable, not L-stable | stiff, moderate accuracy |
| RK4 | 4 | 4 | conditional | non-stiff, high accuracy |

> Intuition: the stability region is the safe zone for $h\lambda$ in the complex plane. The stability region of explicit Euler is the disk of radius 1 centred at $(-1,0)$; that of RK4 is larger but still bounded. For a stiff problem $h\lambda$ lies far to the left in the half-plane, which no bounded region can contain, so an A-stable implicit method is required.

The stiffness ratio can be quantified: if the eigenvalues of the Jacobian have negative real parts, define

$$S=\frac{\max_i|\mathrm{Re}\lambda_i|}{\min_i|\mathrm{Re}\lambda_i|}$$

$S$ much greater than 1 means stiffness. It implies that the step of an explicit method is limited by the fastest component while the evolution of the solution is governed by the slowest—a severe mismatch. In a chemical reaction some intermediates vanish within microseconds while the overall reaction lasts minutes, and the stiffness ratio can exceed $10^6$.

## 5. Worked Examples

### Example 1 (basic: explicit Euler)

Problem: solve $y'=y-t^2+1$, $y(0)=0.5$ with explicit Euler at $h=0.2$, computing approximations at $t=0.2,0.4,0.6,0.8$. The exact solution is $y=(t+1)^2-0.5e^t$.

Solution: $f(t,y)=y-t^2+1$.

$$y_1=0.5+0.2(0.5-0+1)=0.5+0.3=0.8$$

At $t_1=0.2$:

$$y_2=0.8+0.2(0.8-0.04+1)=0.8+0.2(1.76)=1.152$$

At $t_2=0.4$:

$$y_3=1.152+0.2(1.152-0.16+1)=1.152+0.2(1.992)=1.5504$$

At $t_3=0.6$:

$$y_4=1.5504+0.2(1.5504-0.36+1)=1.5504+0.2(2.1904)=1.98848$$

The exact values are $y(0.2)=0.8293$, $y(0.4)=1.2141$, $y(0.6)=1.6489$, $y(0.8)=2.1272$. The errors are $0.0293,0.0621,0.0985,0.1387$, accumulating as $t$ grows, consistent with the $O(h)$ global error of a first-order method.

> Comment: the error is not uniform but accumulates step by step. Halving $h$ to $0.1$ roughly halves the error; gaining one more digit would need ten times the steps (for a first-order method).

### Example 2 (advanced: one RK4 step)

Problem: solve the same initial value problem with RK4 at $h=0.2$ and compute $y(0.2)$.

Solution: $t_0=0$, $y_0=0.5$.

$$k_1=f(0,0.5)=0.5-0+1=1.5$$

$$k_2=f(0.1,\ 0.5+0.1\times1.5)=f(0.1,0.65)=0.65-0.01+1=1.64$$

$$k_3=f(0.1,\ 0.5+0.1\times1.64)=f(0.1,0.664)=0.664-0.01+1=1.654$$

$$k_4=f(0.2,\ 0.5+0.2\times1.654)=f(0.2,0.8308)=0.8308-0.04+1=1.7908$$

$$y_1=0.5+\frac{0.2}{6}(1.5+2\times1.64+2\times1.654+1.7908)$$

Inside the bracket: $1.5+3.28+3.308+1.7908=9.8788$; multiplying by $0.2/6=0.033333$ gives $0.329293$. Hence

$$y_1=0.829293$$

The exact value is $0.829299$, so the error is about $6\times10^{-6}$. For the same step, Euler's error is $0.0293$: RK4 is nearly five thousand times better.

> Comment: the four $k$ values are not arbitrary: $k_1$ is the slope at the start, $k_2$ and $k_3$ are two estimates of the slope at the midpoint, and $k_4$ is the slope at the end. The weights $1:2:2:1$ cancel the $h^2,h^3,h^4$ error terms in turn.

### Example 3 (challenging: a stiff problem)

Problem: solve $y'=-100y$, $y(0)=1$ with explicit Euler, implicit Euler, and the trapezoidal method at $h=0.1$ for the first two steps, and compare with the true solution $e^{-100t}$.

Solution: the true values are $y(0.1)=e^{-10}\approx4.54\times10^{-5}$ and $y(0.2)=e^{-20}\approx2.06\times10^{-9}$.

Explicit Euler: amplification factor $1+h\lambda=1-10=-9$.

$$y_1=-9,\qquad y_2=81$$

Sign oscillation with growing modulus: completely wrong.

Implicit Euler: amplification factor $\dfrac{1}{1-h\lambda}=\dfrac{1}{1+10}=\dfrac{1}{11}$.

$$y_1=\frac{1}{11}\approx0.0909,\qquad y_2=\frac{1}{121}\approx0.00826$$

Stable decay, but the first step is three orders of magnitude above the truth ($0.0909$ against $4.54\times10^{-5}$). That is insufficient accuracy, not instability, and reducing $h$ improves it.

Trapezoidal method: amplification factor $\dfrac{1+h\lambda/2}{1-h\lambda/2}=\dfrac{1-5}{1+5}=-\dfrac23$.

$$y_1=-\frac23\approx-0.667,\qquad y_2=\frac49\approx0.444$$

The modulus decays (stability) but the sign alternates and the decay is extremely slow. The true solution has long been at zero while the trapezoidal method still reports $0.444$. This shows that A-stability is not L-stability: as $h\lambda\to-\infty$ the trapezoidal amplification factor tends to $-1$ and cannot wipe out the stiff component quickly.

> Comment: three traps in stiff problems. First, explicit methods simply explode. Second, implicit methods are stable but may be inaccurate and need adaptive stepping. Third, the trapezoidal method is stable yet oscillates; if rapid decay to zero is required, choose an L-stable method such as implicit Euler or BDF.

## 6. Common Errors and Pitfalls

1. **Confusing the order of the local truncation error with that of the global error.** A $p$-th order method has local error $O(h^{p+1})$ and global error $O(h^p)$; saying "RK4's error is $h^4$" refers to the global error.
2. **Blaming a program bug for instability caused by too large a step.** First check whether $h\lambda$ lies in the stability region, then check the code.
3. **Using an explicit method on a stiff equation.** The step is limited by stability to a tiny value and the work explodes; switch to an implicit method.
4. **Not iterating the implicit step to sufficient accuracy.** An unconverged inner Newton iteration introduces extra error; set an inner convergence criterion.
5. **Judging the accuracy of a method from a single step.** Halve the step and compare, checking whether the error ratio matches the theoretical order.
6. **Ignoring the Lipschitz condition and the existence and uniqueness of the solution.** Computing through a singularity near the initial value gives meaningless results.
7. **Adaptive stepping that looks only at the local error.** For stiff problems the step is also limited by stability, and an accuracy-based estimate alone causes oscillation.
8. **Treating adaptive stepping as a panacea.** The error estimate reflects only the local behaviour and becomes unreliable at discontinuities or abrupt step changes; limit the rate of step change and set a minimum step.
9. **Using a high-order method without checking its stability region.** High order guarantees accuracy only as $h\to0$; at fixed $h$ the method may still be unstable. When choosing, first decide whether the problem is stiff, then look at the accuracy required.

## 7. Summary and Mnemonics

- One-step methods turn a differential equation into a recurrence: Euler is first order, RK4 fourth order.
- The local truncation error is one order higher than the global error: local $O(h^{p+1})$ corresponds to global $O(h^p)$.
- The stability condition for explicit Euler is $h<2/|\lambda|$; implicit Euler is unconditionally stable and suits stiff problems.
- RK4 evaluates $f$ four times per step with weights $1:2:2:1$ and is the general choice for non-stiff problems.
- A-stability is not L-stability; for stiff problems check whether the amplification factor tends to zero as $h\lambda\to-\infty$.
- Convergence = consistency + zero-stability; order conditions govern accuracy and the stability region governs damping—both rulers are needed.
- An implicit method needs an inner iteration per step; the price of stability is computation.
- Explicit methods evaluate only $f$ per step, implicit ones solve an equation; choosing a method is choosing which price to pay.

**Mnemonic: Euler walks straight at first order, RK4 scouts four ways; stiff problems switch to implicit, and stability still needs damping.**
`,
    keyPoints: [
      'Local truncation error O(h^(p+1)) corresponds to a global error O(h^p)',
      'Explicit Euler is stable only for h<2/|λ|',
      'RK4 evaluates f four times per step and reaches fourth-order accuracy',
      'Stiff equations need A-stable / L-stable implicit methods',
    ],
  },
};

export default map;
