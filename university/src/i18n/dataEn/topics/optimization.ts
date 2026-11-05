import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  convexity: {
    chapter: 'Chapter 1 Convexity and the Foundations of Optimization',
    title: 'Convex Sets, Convex Functions and the Classification of Optimization Problems',
    summary:
      'Turn the intuition of "bowls" and "ridges" into definitions: convex sets, convex functions, first- and second-order criteria, and why a local minimum equals the global minimum.',
    keyPoints: [
      'A convex set is closed under the segment joining any two points; a convex function has its chord above its graph',
      'First-order condition: the graph lies above the tangent plane at every point',
      'Second-order condition: the Hessian is positive semidefinite',
      'For a convex problem, a local minimum is necessarily a global minimum',
      'Strict convexity does not guarantee that a minimum exists—e^x is a counterexample',
    ],
    content: String.raw`

Imagine looking for the lowest point of an undulating terrain. If the terrain is a smooth bowl, then wherever you start, as long as you keep going downhill you will end at the bottom, and the bottom is the global lowest point. If the terrain is a chain of ridges, you will stop in some valley, but that may only be a local minimum; over the next ridge there may be a deeper valley.

This difference is the difference between convex and non-convex. The graph of a convex function is like a bowl: for any two points, the chord lies above the graph; at any point, the tangent line lies below the graph. These two geometric facts, which "look like truisms", support the whole of modern optimization theory.

Optimization problems are everywhere in reality: training a neural network minimizes a loss, designing a wing minimizes drag, scheduling production minimizes cost. Unfortunately most problems are non-convex and the bottom of the bowl is hard to find. But as soon as a problem is convex, we have a complete set of reliable, fast, provable algorithms. This is why convex optimization is called "the watershed of optimization": know convex optimization, and many engineering problems have definite answers.

Opening question: why is the local lowest point of a convex function necessarily the global lowest point? Can this property be extended to the constrained case?

## II. Rigorous Definitions

**Definition (convex set)**. Let $C\subseteq\mathbb{R}^n$. If for any $x,y\in C$ and any $t\in[0,1]$,

$$tx+(1-t)y\in C,$$

then $C$ is convex.

In other words, the whole segment joining any two points of the set stays in the set.

**Definition (convex function)**. Let $C$ be convex and $f:C\to\mathbb{R}$. If for any $x,y\in C$ and $t\in[0,1]$,

$$f(tx+(1-t)y)\le tf(x)+(1-t)f(y),$$

then $f$ is convex. If the inequality is strict whenever $x\ne y$ and $t\in(0,1)$, $f$ is strictly convex.

**Definition (strong convexity)**. If there is $m>0$ such that

$$f(y)\ge f(x)+\nabla f(x)^{\top}(y-x)+\frac{m}{2}\|y-x\|^2$$

for all $x,y$, then $f$ is $m$-strongly convex.

**Theorem (first-order condition)**. Let $f$ be differentiable with convex domain. Then $f$ is convex if and only if

$$f(y)\ge f(x)+\nabla f(x)^{\top}(y-x)$$

for all $x,y$. Geometrically: the graph always lies above the tangent plane at any point.

**Theorem (second-order condition)**. Let $f$ be twice continuously differentiable with convex domain. Then $f$ is convex if and only if the Hessian is positive semidefinite:

$$\nabla^2f(x)\succeq0,\qquad \forall x\in C.$$

**Definition (standard form of an optimization problem)**.

$$\min_{x\in\mathbb{R}^n}\ f(x)\quad \text{subject to}\quad x\in C.$$

$f$ is the objective function and $C$ the feasible region. If $C=\mathbb{R}^n$ the problem is unconstrained.

**Definition (local and global minima)**. If there is $\varepsilon>0$ such that $f(y)\ge f(x^*)$ for every feasible $y$ with $\|y-x^*\|<\varepsilon$, then $x^*$ is a local minimum. If $f(y)\ge f(x^*)$ for all feasible $y$, it is a global minimum.

**Theorem (fundamental theorem of convex optimization)**. If $f$ is convex and $C$ is convex, then every local minimum of $f$ on $C$ is a global minimum. If $f$ is strictly convex, the global minimum is unique if it exists.

## III. Why Defined This Way

**Why define a convex set by "segments"?** Because the segment is "the shortest path between two points" and also the easiest object to verify. The equivalent statement is: the set is closed under convex combinations. If $t$ were restricted to $0$ or $1$, the condition would degenerate to "the endpoints belong to the set", which every set satisfies; so $t$ must run over the whole $[0,1]$ to force "the intermediate points to be inside too".

**Why must the domain of a convex function be convex?** Because the definition requires computing $f(tx+(1-t)y)$, and if the segment leaves the domain the expression may be meaningless. A convex domain is a prerequisite for discussing convexity, not an additional condition. Many people verify only $f''\ge0$ and forget the domain, and then go wrong with $f(x)=1/x$: it is convex on $(0,+\infty)$, but on all of $\mathbb{R}\setminus\{0\}$ the domain is not even convex, so it is not a convex function there.

**Why does the first-order condition characterize convexity?** If $f$ is convex, fix $x$ and move a small step in the direction $y-x$; convexity gives

$$f(x+t(y-x))\le(1-t)f(x)+tf(y).$$

Rearranging and dividing by $t$,

$$\frac{f(x+t(y-x))-f(x)}{t}\le f(y)-f(x).$$

Letting $t\to0^+$, the left side tends to $\nabla f(x)^{\top}(y-x)$, giving $f(y)\ge f(x)+\nabla f(x)^{\top}(y-x)$. Conversely, if this inequality holds for all $x,y$, one can prove $f$ is convex. Geometrically it says "the tangent plane is always below the bowl", which is exactly the shape of a bowl.

**Why is the second-order condition only semidefinite, not definite?** Because $f(x)=x^4$ is convex but $f''(0)=0$. Positive definiteness is a sufficient condition for strict convexity (when twice differentiable), not a necessary one. Positive semidefiniteness is the necessary and sufficient condition for convexity.

**Why does convexity turn local minima into global minima?** By contradiction. Suppose $x^*$ is a local but not global minimum; then there is a feasible $y$ with $f(y)<f(x^*)$. Consider points on the segment $x_t=(1-t)x^*+ty$; for small $t$, $x_t$ lies in a neighbourhood of $x^*$. By convexity,

$$f(x_t)\le(1-t)f(x^*)+tf(y)<(1-t)f(x^*)+tf(x^*)=f(x^*),$$

contradicting the local minimality of $x^*$. The proof uses a single inequality, yet it captures the whole power of convex optimization.

**Counterexample: non-convex problems can have many local minima.** Let

$$f(x)=(x^2-1)^2+\frac{x}{10}.$$

$f$ has a local minimum near $x=1$ (value $0.1$) and another near $x=-1$ (value $-0.1$), the latter being the global minimum. Gradient descent starting from $x>0$ stops near $x\approx1$ and never finds $-1$. This is the fundamental difficulty of non-convex optimization.

**Counterexample: strict convexity does not guarantee a minimum.** $f(x)=e^x$ is strictly convex on $\mathbb{R}$ ($f''=e^x>0$), but the infimum $0$ is not attained. So the premise of "strict convexity implies a unique minimum" is that the minimum exists. Existence needs an extra coercivity condition, for example $f(x)\to\infty$ as $\|x\|\to\infty$.

## IV. Intuition and Pictures

**Bowl, chord, tangent.** The graph of a convex function has three equivalent features: the chord lies above the graph; the tangent lies below the graph; the sublevel set $\{x:f(x)\le\alpha\}$ is convex, like a horizontal slice of a bowl.

| Function | Second derivative | Convexity | Note |
|---|---|---|---|
| $x^2$ | $2>0$ | strictly convex | the standard bowl |
| $e^x$ | $e^x>0$ | strictly convex | no minimum |
| $\ln x$ | $-1/x^2<0$ | concave | domain is the positive half-line |
| $x^3$ | $6x$ | neither convex nor concave | inflection point |
| $\lvert x\rvert$ | not differentiable | convex | convex without being differentiable |
| $x^4$ | $12x^2\ge0$ | convex | second derivative zero at $0$ |

> Intuition: a convex function is a "bowl", a concave function an "umbrella", and a function that is neither is a "slide". Put a ball in a bowl and it rolls to the bottom; put it on a slide and where it stops depends on where it started.

**Contour view.** The contours of a two-dimensional convex function are nested convex curves, like concentric ellipses on a topographic map. The gradient is perpendicular to the contours and points in the direction of steepest ascent; the negative gradient points to the bottom of the bowl.

**Jensen's inequality.** Iterating the definition of convexity gives

$$f\left(\sum_{i=1}^{k}t_ix_i\right)\le\sum_{i=1}^{k}t_if(x_i),\qquad t_i\ge0,\ \sum t_i=1.$$

The probabilistic form $f(\mathbb{E}X)\le\mathbb{E}f(X)$ is a special case. This inequality is everywhere in information theory and statistics.

## V. Worked Examples

### Example 1 (Basic: deciding convexity)

Problem: decide the convexity of the following functions on the given intervals: (a) $f(x)=x^2$ on $\mathbb{R}$; (b) $f(x)=\ln x$ on $(0,\infty)$; (c) $f(x)=x^3$ on $\mathbb{R}$; (d) $f(x)=\lvert x\rvert$ on $\mathbb{R}$. Also decide whether the sets $S=\{(x,y):x^2+y^2\le1\}$ and $T=\{(x,y):xy\ge1,\ x>0\}$ are convex.

Analysis: use the second derivative for differentiable functions, and return to the definition otherwise.

Solution: (a) $f''(x)=2>0$, strictly convex.

(b) $f'(x)=1/x$, $f''(x)=-1/x^2<0$, so $\ln x$ is concave, not convex.

(c) $f''(x)=6x$, negative for $x<0$ and positive for $x>0$, changing sign, so $x^3$ is neither convex nor concave.

(d) $\lvert x\rvert$ is not differentiable at $0$; use the definition: for any $x,y$ and $t\in[0,1]$,

$$\lvert tx+(1-t)y\rvert\le\lvert tx\rvert+\lvert(1-t)y\rvert=t\lvert x\rvert+(1-t)\lvert y\rvert,$$

using the triangle inequality and $t,1-t\ge0$. Hence $\lvert x\rvert$ is convex.

Set $S$: let $u,v\in S$, i.e. $\|u\|\le1$, $\|v\|\le1$. Then

$$\|tu+(1-t)v\|\le t\|u\|+(1-t)\|v\|\le t+(1-t)=1,$$

so $tu+(1-t)v\in S$ and $S$ is convex. The triangle inequality for norms was used.

Set $T$: $xy\ge1,x>0$ is equivalent to $y\ge1/x$, i.e. $T$ is the epigraph of $g(x)=1/x$ on $x>0$. $g''(x)=2/x^3>0$, so $g$ is convex, and the epigraph of a convex function is a convex set; hence $T$ is convex.

Comment: the convexity of an epigraph corresponds one-to-one with the convexity of the function—a very useful transformation when testing complicated sets.

### Example 2 (Intermediate: convexity criterion for a quadratic function)

Problem: let $P$ be an $n\times n$ real symmetric matrix, $q\in\mathbb{R}^n$, $r\in\mathbb{R}$, and

$$f(x)=x^{\top}Px+q^{\top}x+r.$$

Prove that $f$ is convex on $\mathbb{R}^n$ if and only if $P$ is positive semidefinite.

Analysis: compute the Hessian, then argue both directions from the definition.

Solution: first compute the gradient and Hessian. Differentiating componentwise:

$$\frac{\partial f}{\partial x_i}=\sum_j2P_{ij}x_j+q_i,\qquad\frac{\partial^2f}{\partial x_i\partial x_j}=2P_{ij}.$$

So $\nabla^2f(x)=2P$, independent of $x$.

If $P\succeq0$, then $\nabla^2f=2P\succeq0$ and the second-order condition gives convexity.

Conversely, suppose $f$ is convex. Fix $x$ and any direction $d\in\mathbb{R}^n$ and consider the scalar function

$$\varphi(t)=f(x+td)=t^2d^{\top}Pd+t(2x^{\top}Pd+q^{\top}d)+f(x).$$

$\varphi$ is convex (the restriction of a convex function to a line is convex), so $\varphi''(t)\ge0$. But $\varphi''(t)=2d^{\top}Pd$, so $d^{\top}Pd\ge0$ for all $d$, i.e. $P\succeq0$.

Comment: this result is the cornerstone of quadratic programming. To decide whether a quadratic function is convex, just check that all eigenvalues of $P$ are nonnegative—no plotting needed.

### Example 3 (Advanced: local minimum implies global minimum)

Problem: prove that a local minimum of a convex function on a convex set is a global minimum; and give an example of a strictly convex function with no minimum.

Analysis: contradiction plus the convexity inequality; take $e^x$ as the example.

Solution: let $f$ be convex, $C$ convex, and $x^*\in C$ a local minimum. Suppose there is $y\in C$ with $f(y)<f(x^*)$.

For $t\in[0,1]$ let $x_t=(1-t)x^*+ty$. Since $C$ is convex, $x_t\in C$. Since $f$ is convex,

$$f(x_t)\le(1-t)f(x^*)+tf(y).$$

Because $f(y)<f(x^*)$, the right side is strictly less than

$$(1-t)f(x^*)+tf(x^*)=f(x^*).$$

For $t>0$ small enough, $\|x_t-x^*\|=t\|y-x^*\|<\varepsilon$, so $x_t$ lies in the neighbourhood of the local minimum and by definition $f(x_t)\ge f(x^*)$, contradicting the inequality. Hence no such $y$ exists and $x^*$ is global.

If $f$ is also strictly convex, suppose $x_1\ne x_2$ are both global minima and take $t=1/2$:

$$f\left(\frac{x_1+x_2}{2}\right)<\frac{f(x_1)+f(x_2)}{2}=f(x_1),$$

contradicting the global minimality of $x_1$. Hence the minimum is unique.

Example: $f(x)=e^x$ satisfies $f''=e^x>0$ and is strictly convex. But $f(x)>0$ with infimum $0$, and $e^x=0$ has no solution, so no minimum exists. This shows that "strict convexity implies a unique minimum" needs the additional premise "a minimum exists".

Comment: the trap is conflating "unique" with "exists". Strict convexity only guarantees "at most one", not "at least one". In engineering one often adds a regularizer or restricts to a bounded closed set precisely to supply existence.

## VI. Common Errors and Pitfalls

- Wrong: verifying $f''\ge0$ at one point and declaring convexity. Correction: it must hold for all $x$, or one must prove the expression for $f''$ is always nonnegative.
- Wrong: forgetting to check whether the domain is convex. Correction: $f(x)=1/x$ has no convexity to discuss on $\mathbb{R}\setminus\{0\}$, because the domain itself is not convex.
- Wrong: thinking that $f$ convex implies $f^2$ convex. Correction: $(x^2-1)^2$ has second derivative $-4$ at $0$ and is concave there, although $x^2-1$ is convex.
- Wrong: thinking a convex function always has a minimum. Correction: $e^x$ is strictly convex but has no minimum; coercivity or a bounded closed domain is needed.
- Wrong: taking "$\nabla f(x^*)=0$" as sufficient for a minimum. Correction: convexity is also needed, otherwise it may be a saddle or a maximum, as with $f(x)=x^3$ at $0$.
- Wrong: confusing convex functions with monotone functions. Correction: $e^{-x}$ is decreasing but convex; $x^3$ is increasing but not convex.
- Wrong: mixing up strong and strict convexity. Correction: strong convexity implies strict convexity, not conversely; $x^4$ is strictly convex but not strongly convex, since $f''(0)=0$.

## VII. Summary and Mnemonic

Key points:

- A convex set is closed under the segment joining any two points; a convex function has its chord above the graph;
- first-order condition: the graph lies above the tangent plane; second-order condition: the Hessian is positive semidefinite;
- for convex optimization a local minimum is a global minimum, and under strict convexity there is at most one;
- strict convexity does not guarantee a minimum exists—$e^x$ is a counterexample;
- a quadratic $x^{\top}Px+q^{\top}x+r$ is convex if and only if $P\succeq0$;
- the sublevel sets of a convex function are convex, and the convexity of the epigraph is equivalent to the convexity of the function.

Mnemonic: **"Two points joined stay inside the set; chord above the graph is a convex function; the tangent always supports the bowl from below; local low means global low."**`,
    relatedProblemIds: [],
  },

  'linear-programming': {
    chapter: 'Chapter 2 Linear Programming',
    title: 'Standard Form and the Graphical Method for Linear Programming',
    summary:
      'Starting from factory scheduling, learn to convert any linear program into standard form and to see geometrically why "the optimum is attained at a vertex".',
    keyPoints: [
      'Standard form: min c^T x, Ax=b, x≥0',
      'Four conversions: negate the objective, add slacks, subtract surpluses, split free variables',
      'The feasible region is a convex polyhedron, and an optimal solution can always be found at a vertex',
      'Graphical method: draw the constraints, determine the feasible region, translate the level lines, read off the vertex',
      'Four outcomes: unique optimum, multiple optima, unbounded, infeasible',
    ],
    content: String.raw`

A small factory makes two products: tables and chairs. Each table uses $4$ hours of carpentry and $2$ hours of painting, with a profit of $60$; each chair uses $3$ hours of carpentry and $1$ hour of painting, with a profit of $30$. This week $240$ carpentry hours and $100$ painting hours are available. How many of each maximize profit?

Let the number of tables be $x_1$ and of chairs $x_2$; the problem is

$$\max\ 60x_1+30x_2\quad\text{s.t.}\quad 4x_1+3x_2\le240,\quad 2x_1+x_2\le100,\quad x_1,x_2\ge0.$$

Both objective and constraints are linear, so this is a linear program. Its feasible region is a polygon in the plane, and the objective is a family of parallel lines; translating the line in the direction of increasing profit, the last point at which it leaves the polygon is the optimum, and it always lies at a vertex.

Linear programming is the starting point of operations research. It was used in the Second World War to plan transport and supply, and entered industry, finance and logistics afterwards. Today the map navigation in your phone, the dispatch of a delivery platform and an airline's crew scheduling all run linear programming solvers behind the scenes. Its algorithms work stably with hundreds of thousands of variables—a model of mathematics turning into productivity.

Opening question: why is the optimum always at a vertex? If the feasible region is unbounded, can an optimum still exist?

## II. Rigorous Definitions

**Definition (general form of a linear program)**.

$$\min\ c^{\top}x\quad\text{s.t.}\quad a_i^{\top}x\le b_i\ (i\in I),\quad a_j^{\top}x=b_j\ (j\in E),\quad x\ge0.$$

with $c,x\in\mathbb{R}^n$. $c^{\top}x$ is the objective function, and each $a_i^{\top}x\le b_i$ is a constraint.

**Definition (standard form)**.

$$\min\ c^{\top}x\quad\text{s.t.}\quad Ax=b,\quad x\ge0.$$

with $A\in\mathbb{R}^{m\times n}$, $b\in\mathbb{R}^m$, usually assuming $m\le n$ and $A$ of full row rank.

**Four rules for standard form.**

1. If the objective is $\max c^{\top}x$, change it to $\min -c^{\top}x$; the optimal solution is unchanged and the optimal value changes sign;
2. for an inequality $a^{\top}x\le b$ introduce a slack variable $s\ge0$ and write $a^{\top}x+s=b$;
3. for an inequality $a^{\top}x\ge b$ introduce a surplus variable $s\ge0$ and write $a^{\top}x-s=b$;
4. a free variable $x_j$ is split as $x_j=x_j^{+}-x_j^{-}$ with $x_j^{\pm}\ge0$. If $b_i<0$, multiply the whole row by $-1$.

**Definition (feasible region and optimal value)**. The feasible region is $\mathcal{F}=\{x:Ax=b,\ x\ge0\}$. If $\mathcal{F}\ne\varnothing$ the problem is feasible. The optimal value is $z^*=\inf\{c^{\top}x:x\in\mathcal{F}\}$; if the infimum is attained in $\mathcal{F}$, an optimal solution exists; if $z^*=-\infty$, the problem is unbounded.

**Definition (vertex)**. If $x\in\mathcal{F}$ cannot be written as a strict convex combination of two distinct points of $\mathcal{F}$, then $x$ is a vertex of $\mathcal{F}$.

**Theorem (vertices and basic feasible solutions)**. Let $A$ have full row rank. Then $x$ is a vertex of $\mathcal{F}$ if and only if it is a basic feasible solution: there is an index set $B$ with $|B|=m$ such that $A_B$ is invertible, $x_B=A_B^{-1}b\ge0$ and $x_{B^c}=0$.

**Theorem (fundamental theorem of linear programming)**. If a linear program has an optimal solution, then some vertex is optimal. If the feasible region is nonempty and the objective is bounded below, the optimal value is attained at a vertex.

**Steps of the graphical method.**

1. Draw the line for each constraint and determine the feasible region;
2. draw the level line of the objective, $c^{\top}x=\text{constant}$;
3. translate the level line in the direction of improvement; the last point or edge meeting the feasible region is the optimum;
4. read off the coordinates and compute the optimal value.

## III. Why Defined This Way

**Why fix the standard form as $Ax=b,x\ge0$?** Because an algorithm needs a uniform "algebraic entrance". Equality constraints let us represent solutions with a basis of the matrix, and nonnegativity gives "basic feasible solution" a precise meaning. Every linear program can be converted to this shape without loss, so an algorithm need only be designed for one shape. Conversion does not change the essence of the problem, only the bookkeeping.

**Why do slack variables not change the problem?** $a^{\top}x\le b$ and "there exists $s\ge0$ with $a^{\top}x+s=b$" are completely equivalent: $s$ is the "leftover amount". Turning an inequality into an equality amounts to putting the "remaining resource" on the books as a variable. Its coefficient in the objective is $0$, so it does not affect profit.

**Why split a free variable into two nonnegative ones?** The standard form requires all variables nonnegative, while in practice a variable may be negative (temperature offset, profit and loss). Any real number can be written as the difference of two nonnegative numbers: $x=x^{+}-x^{-}$, with both components nonnegative. The price is doubling the number of variables, and the gain is uniform treatment.

**Why is the optimum at a vertex?** Intuitively, the feasible region is a polygon and the objective is linear, so its value changes linearly in any direction. The maximum of a linear function on a polygon is attained at an endpoint: if the optimum were in the interior of an edge, moving along the edge in the two directions would increase the value in one and decrease it in the other (unless the whole edge is a level set), so an endpoint is no worse. A rigorous proof uses the "extreme point representation theorem": every point of a bounded polyhedron is a convex combination of vertices, and a linear function takes a weighted average on convex combinations, so its maximum is attained at some vertex.

**Why does the fundamental theorem assume an optimal solution exists?** Because when the problem is unbounded there is no optimal solution to speak of. The theorem says "if there is one, it can be found at a vertex", not "there always is one". The distinction shows up in algorithms as the termination test.

**Counterexamples: unbounded and infeasible.** $\max x_1$ s.t. $x_1\ge0$ is unbounded ($x_1\to\infty$); $\min x_1$ s.t. $x_1\ge1,\ x_1\le0$ has an empty feasible region. Both cases must be recognized, otherwise the algorithm loops forever or returns a wrong answer.

## IV. Intuition and Pictures

**The two-dimensional picture.** Each inequality is a line, and the feasible region is the intersection of the half-planes, a convex polygon (possibly unbounded). The level lines of the objective form a family of parallel lines with normal vector $c$. Translate the level line so that it "sweeps across" the feasible region; the last point it touches is the optimum.

| Case | Geometric appearance | Algebraic feature |
|---|---|---|
| unique optimum | the level line touches the polygon at one vertex | a unique optimal vertex |
| multiple optima | the level line coincides with an edge | two vertices both optimal |
| unbounded | the feasible region extends infinitely in some direction with improving objective | a feasible direction $d$ with $c^{\top}d<0$ |
| infeasible | the half-planes have no common part | contradictory constraints |

> Intuition: linear programming is "finding the highest point on a polygon", and that point can only be at a corner. Hence the algorithm only needs to hop between vertices.

**A vertex is an intersection of constraints.** In two dimensions a vertex is the intersection of two constraint lines; in $n$ dimensions it is the intersection of $n$ hyperplanes, $n-m$ of which come from $x_j=0$. This is exactly the geometric meaning of a "basic feasible solution": set $n-m$ variables to $0$ and solve for the remaining $m$.

## V. Worked Examples

### Example 1 (Basic: converting to standard form)

Problem: convert the following to standard form.

$$\max\ 3x_1+2x_2\quad\text{s.t.}\quad x_1+x_2\le4,\quad 2x_1+x_2\le5,\quad x_1,x_2\ge0.$$

Analysis: apply the four rules one by one—negate the objective, add slack variables.

Solution: negate the objective:

$$\min\ -3x_1-2x_2.$$

Add a slack variable $s_1\ge0$ to the first constraint: $x_1+x_2+s_1=4$. Add $s_2\ge0$ to the second: $2x_1+x_2+s_2=5$.

The standard form is

$$\min\ -3x_1-2x_2$$

$$\text{s.t.}\quad x_1+x_2+s_1=4,\quad 2x_1+x_2+s_2=5,\quad x_1,x_2,s_1,s_2\ge0.$$

In matrix form: $c=(-3,-2,0,0)^{\top}$,

$$A=\begin{pmatrix}1&1&1&0\\2&1&0&1\end{pmatrix},\qquad b=\begin{pmatrix}4\\5\end{pmatrix}.$$

Comment: the objective coefficients of slack variables must be $0$; they are only bookkeeping and generate no profit. Forgetting to write $s\ge0$, or giving them nonzero coefficients, are common errors.

### Example 2 (Intermediate: the graphical method)

Problem: solve the problem above by the graphical method, giving the optimal solution and value.

Analysis: draw the constraint lines, find the vertices of the feasible region, compare the objective values.

Solution: the two constraint lines are $x_1+x_2=4$ and $2x_1+x_2=5$, intersecting at

$$x_1+x_2=4,\quad 2x_1+x_2=5\ \Longrightarrow\ x_1=1,\ x_2=3.$$

The vertices of the feasible region:

- $(0,0)$: satisfies all constraints;
- $(2.5,0)$: intersection of the second constraint with $x_2=0$;
- $(1,3)$: intersection of the two constraint lines;
- $(0,4)$: intersection of the first constraint with $x_1=0$.

Compute the objective $z=3x_1+2x_2$ at each point:

$$z(0,0)=0,\quad z(2.5,0)=7.5,\quad z(1,3)=3+6=9,\quad z(0,4)=8.$$

The maximum is $9$, attained at $(1,3)$. So the optimal solution is $x_1=1$, $x_2=3$, with maximum profit $9$.

Verify with the level line: $3x_1+2x_2=9$ passes through $(1,3)$ and $(3,0)$, and the whole line touches the feasible region only at $(1,3)$; translating further leaves the region, so it is indeed optimal.

Comment: all vertices must be enumerated. Concluding from $(0,4)$ with value $8$ would miss the better $(1,3)$.

### Example 3 (Advanced: unbounded and multiple optima)

Problem: determine the nature of the solutions of the following two problems.

(a) $\max\ x_1+x_2$ s.t. $x_1-x_2\le1$, $x_1,x_2\ge0$.

(b) $\max\ x_1+x_2$ s.t. $x_1+x_2\le2$, $x_1,x_2\ge0$.

Analysis: draw the feasible region, and see whether the objective can grow without bound, or whether the level line coincides with an edge.

Solution: (a) the constraint $x_1-x_2\le1$ means $x_1\le x_2+1$. Taking $x_1=0$, for every $x_2\ge0$ we have $0\le x_2+1$, so the whole positive $x_2$ axis lies in the feasible region. Along this ray the objective is $x_1+x_2=x_2\to+\infty$, so the problem is unbounded and has no optimal solution.

(b) the feasible region is a triangle with vertices $(0,0)$, $(2,0)$, $(0,2)$. The objective values are $0,2,2$. Both $(2,0)$ and $(0,2)$ attain the maximum $2$, and every point of the edge $x_1+x_2=2$ ($x_1,x_2\ge0$) is feasible with objective value $2$. So there are infinitely many optimal solutions, with optimal value $2$.

Comment: two traps. First, "unbounded feasible region" does not mean "unbounded problem": in (a) the region is unbounded and so is the problem, but if the objective were changed to $\min x_1+x_2$, the same region would give the optimum $(0,0)$. Second, "multiple optima" is not an error but a normal degenerate phenomenon; the optimal solutions form a whole edge, which algorithms must handle specially.

## VI. Common Errors and Pitfalls

- Wrong: forgetting to negate the objective when converting max to min. Correction: $\max c^{\top}x$ is equivalent to $-\min(-c^{\top}x)$, and the optimal value changes sign too.
- Wrong: forgetting to flip the inequality when multiplying by $-1$. Correction: $-a^{\top}x\ge-b$ is the correct equivalent form of $a^{\top}x\le b$.
- Wrong: writing $x\ge0$ directly for a free variable. Correction: it must be split into the difference of two nonnegative variables, both nonnegative.
- Wrong: giving a slack variable a nonzero objective coefficient. Correction: slack variables are bookkeeping only, with objective coefficient $0$.
- Wrong: thinking an unbounded feasible region always means no optimum. Correction: a linear objective on an unbounded region may still have a minimum, e.g. $\min x$ on $x\ge0$.
- Wrong: computing only one or two vertices graphically. Correction: all vertices must be enumerated, or excluded after confirming the direction of the level lines.
- Wrong: reading "the optimum is at a vertex" as "the optimal solution is unique". Correction: with multiple optima the whole edge is optimal.

## VII. Summary and Mnemonic

Key points:

- In a linear program both objective and constraints are linear, and the feasible region is a convex polyhedron;
- standard form is $\min c^{\top}x$, $Ax=b$, $x\ge0$;
- four conversions: negate, add slacks, subtract surpluses, split free variables;
- vertices correspond to basic feasible solutions, and an optimum can always be found at a vertex;
- graphical method: draw constraints, determine the region, translate level lines, read vertices;
- four outcomes: unique optimum, multiple optima, unbounded, infeasible.

Mnemonic: **"Linear objective, linear constraints, the feasible region is a polygon; slide along an edge, the value is linear, the optimum must stop at a corner."**`,
    relatedProblemIds: [],
  },

  simplex: {
    chapter: 'Chapter 3 The Simplex Method',
    title: 'The Simplex Method',
    summary:
      'Write "climbing along edges" in algebra: bases, reduced costs, the ratio test and pivoting, plus the criteria for unboundedness and degeneracy.',
    keyPoints: [
      'A basis is m linearly independent columns; a basic feasible solution corresponds to a vertex',
      'The reduced cost σ_j=c_j-c_B^T B^{-1}A_j measures the change in objective',
      'For a min problem, all σ_j≥0 means optimality',
      'Entering variable: a negative reduced cost; leaving variable: minimum ratio, considering only positive coefficients',
      'All nonpositive entries in the entering column mean unboundedness; degeneracy may cause cycling',
    ],
    content: String.raw`

The graphical method of the previous chapter is fine in two dimensions, but real problems have thousands of variables and cannot be drawn. The simplex method gives a purely algebraic way to walk: start from a vertex of the feasible region, move along an edge to an adjacent vertex with a better objective, repeat until no adjacent vertex is better.

It is like climbing on the surface of a polyhedron, allowed to move only along edges, each step to a higher corner. Since there are only finitely many vertices and each step strictly improves (in the non-degenerate case), the algorithm must stop. When it stops, if no adjacent vertex is better, convexity makes the current vertex the global optimum.

The American mathematician Dantzig proposed the method in 1947 for air-force logistics planning. It is still one of the most used linear programming algorithms, and one of the earliest examples of "mathematics turning directly into industrial software".

Opening question: how can algebra tell that "the current vertex is already the best"? How can one guarantee that after a step the solution is still feasible?

## II. Rigorous Definitions

Consider the standard-form problem

$$\min\ c^{\top}x\quad\text{s.t.}\quad Ax=b,\quad x\ge0,$$

where $A$ is $m\times n$ of full row rank, $m\le n$.

**Definition (basis and basic variables)**. Choose $m$ columns from the $n$ columns of $A$ forming an invertible matrix $B$, called a basis. The variables corresponding to $B$ are the basic variables, written $x_B$; the rest are nonbasic, written $x_N$.

**Definition (basic solution and basic feasible solution)**. Set $x_N=0$ and solve $Bx_B=b$ to get $x_B=B^{-1}b$. This $x$ is a basic solution. If $x_B\ge0$ it is a basic feasible solution, corresponding to a vertex of the feasible region.

**Definition (reduced cost)**. For a nonbasic variable $x_j$, define

$$\sigma_j=c_j-c_B^{\top}B^{-1}A_j,$$

where $A_j$ is the $j$-th column of $A$ and $c_B$ the objective coefficients of the basic variables.

**Theorem (optimality criterion)**. If a basic feasible solution satisfies $\sigma_j\ge0$ for all nonbasic $j$, it is optimal for the linear program.

**Algorithm (simplex method)**.

1. Find an initial basic feasible solution, usually taking the slack variables as the basis;
2. compute the reduced costs $\sigma_j$. If all are $\ge0$, stop: the current solution is optimal;
3. choose a nonbasic variable $x_j$ with $\sigma_j<0$ to enter; the Dantzig rule picks the most negative;
4. ratio test: $\theta=\min\{b_i/a_{ij}:a_{ij}>0\}$, and the basic variable attaining the minimum leaves; if all $a_{ij}\le0$, the problem is unbounded, stop;
5. pivot on the element to get a new basis and return to step 2.

**Theorem (unboundedness criterion)**. If a nonbasic variable $x_j$ satisfies $\sigma_j<0$ and its column $B^{-1}A_j\le0$, the problem is unbounded.

**Definition (degeneracy)**. If some basic variable of a basic feasible solution equals $0$, the solution is degenerate. Then the ratio test may give $\theta=0$, the objective does not change after the iteration, and cycling may occur.

**Theorem (Bland's rule)**. Choose the entering variable as the negative reduced cost with the smallest index, and on ties choose the leaving variable with the smallest index; cycling is then avoided.

## III. Why Defined This Way

**Why does a basic feasible solution correspond to a vertex?** A vertex is a point that cannot be written as a strict convex combination of two feasible points. In standard form, $x$ has $n-m$ zero components (the nonbasic variables), and $Bx_B=b$ has a unique solution. These $n-m$ zeros correspond to $n-m$ active constraints $x_j=0$, and with the $m$ equality constraints there are $n$ independent constraints determining a point—exactly a vertex. Conversely, any vertex has at least $n-m$ zero components; otherwise one could move along the null space without violating nonnegativity, contradicting extremality.

**Why do reduced costs decide optimality?** Express the objective in terms of the nonbasic variables. From $Ax=b$, $x_B=B^{-1}b-B^{-1}A_Nx_N$; substituting into the objective:

$$c^{\top}x=c_B^{\top}B^{-1}b+\sum_{j\in N}\left(c_j-c_B^{\top}B^{-1}A_j\right)x_j=z_0+\sum_{j\in N}\sigma_jx_j.$$

Since $x_j\ge0$, if all $\sigma_j\ge0$ then $c^{\top}x\ge z_0$, and the current solution attains the lower bound, hence is optimal. This derivation also explains the meaning of $\sigma_j$: increasing $x_j$ by one unit changes the objective by $\sigma_j$.

**Why choose a negative reduced cost to enter?** Because $\sigma_j<0$ means increasing $x_j$ lowers the objective (we minimize). Choosing the most negative is a heuristic that lowers it fastest, but does not guarantee the fewest steps. In theory any negative reduced cost works.

**Why use the minimum ratio to choose the leaving variable?** After entering, $x_j$ grows from $0$ and the basic variables change:

$$x_B=B^{-1}b-\theta B^{-1}A_j.$$

To keep $x_B\ge0$ we need $\theta\le b_i/(B^{-1}A_j)_i$ for all $(B^{-1}A_j)_i>0$. The minimum ratio ensures the first variable exactly reaches $0$ and the rest remain nonnegative. Rows with coefficient $\le0$ increase as $\theta$ grows and impose no limit, hence only positive coefficients are considered.

**Why does an all-nonpositive column mean unboundedness?** If $B^{-1}A_j\le0$, then $\theta$ can be arbitrarily large while $x_B$ stays nonnegative, and the objective $z_0+\sigma_j\theta\to-\infty$ (since $\sigma_j<0$). One may walk arbitrarily far in this direction and stay feasible, so the problem is unbounded.

**Counterexample: cycling under degeneracy.** Beale constructed an example with $6$ variables and $3$ constraints in which the Dantzig rule cycles among several degenerate vertices and never stops. Bland's rule breaks the cycle by fixing the order of selection. Practical solvers use perturbation or lexicographic methods, which work better.

## IV. Intuition and Pictures

**The simplex tableau.** Write the constraints and objective as a table, each row an equation and the last row the objective (expressed in nonbasic variables). Pivoting is Gaussian elimination: make the pivot $1$ and the rest of its column $0$.

| Step | Geometry | Algebra |
|---|---|---|
| initial solution | standing at a vertex | slack variables form the basis |
| reduced costs | looking at the slopes of adjacent edges | the signs of $\sigma_j$ |
| entering | choosing an ascending edge | choose a negative reduced-cost column |
| leaving | walking to the other end of the edge | minimum ratio |
| pivoting | switching vertices | change of basis |

> Intuition: the simplex method is hill climbing that moves only along edges. The edges of a polyhedron connect vertices, and a linear objective is linear on an edge, so only the endpoints need comparing.

**What does degeneracy look like?** Imagine three edges meeting at one vertex (more than $n$ active constraints). Then there are fewer than $n$ feasible directions from that vertex, the ratio test gives $0$, and a step "in place" merely changes the basis. Degeneracy itself is not an error, but repeated degeneracy can make the algorithm go round in circles.

## V. Worked Examples

### Example 1 (Basic: a complete iteration)

Problem: solve by the simplex method

$$\max\ 3x_1+2x_2\quad\text{s.t.}\quad x_1+x_2\le4,\quad 2x_1+x_2\le5,\quad x_1,x_2\ge0.$$

Analysis: first convert to standard form $\min -3x_1-2x_2$, take $s_1,s_2$ as the initial basis, and iterate with the min rules.

Solution: the standard form is

$$x_1+x_2+s_1=4,\quad 2x_1+x_2+s_2=5,\quad z=-3x_1-2x_2.$$

The initial basis is $(s_1,s_2)$, with $x_B=(4,5)$ and $z=0$. Reduced costs: $\sigma_{x_1}=-3$, $\sigma_{x_2}=-2$.

First iteration: $x_1$ has the most negative reduced cost and enters. Ratios: $4/1=4$, $5/2=2.5$; the minimum is $2.5$, so $s_2$ leaves.

Pivot: divide the second row by $2$:

$$x_1+\tfrac12x_2+\tfrac12s_2=\tfrac52.$$

Subtract the second row from the first:

$$\tfrac12x_2+s_1-\tfrac12s_2=\tfrac32.$$

Express the objective in the new nonbasic variables. From the second row, $x_1=\tfrac52-\tfrac12x_2-\tfrac12s_2$, so

$$z=-3\left(\tfrac52-\tfrac12x_2-\tfrac12s_2\right)-2x_2=-\tfrac{15}{2}-\tfrac12x_2+\tfrac32s_2.$$

New reduced costs: that of $x_2$ is $-\tfrac12<0$; continue.

Second iteration: $x_2$ enters. Ratios: first row $\tfrac32\div\tfrac12=3$, second row $\tfrac52\div\tfrac12=5$; the minimum is $3$, so $s_1$ leaves.

Pivot: multiply the first row by $2$:

$$x_2+2s_1-s_2=3.$$

Subtract $\tfrac12$ times the first row from the second:

$$\left(x_1+\tfrac12x_2+\tfrac12s_2\right)-\tfrac12\left(x_2+2s_1-s_2\right)=\tfrac52-\tfrac32.$$

Simplifying term by term: $x_1$ stays, the $x_2$ terms cancel, $\tfrac12s_2+\tfrac12s_2=s_2$, $-\tfrac12\cdot2s_1=-s_1$, and the right side is $1$, so

$$x_1-s_1+s_2=1.$$

Objective: $x_1=1+s_1-s_2$, $x_2=3-2s_1+s_2$; substituting,

$$z=-3(1+s_1-s_2)-2(3-2s_1+s_2)=-9+s_1+s_2.$$

All reduced costs are $\ge0$; stop. The optimal solution is $x_1=1$, $x_2=3$, the minimum is $-9$, so the original maximum profit is $9$.

Comment: consistent with the graphical method. Note that for a min problem the stopping condition is all reduced costs $\ge0$, the opposite of a max problem.

### Example 2 (Intermediate: recognizing unboundedness)

Problem: handle by the simplex method

$$\max\ x_1+x_2\quad\text{s.t.}\quad x_1-x_2\le1,\quad x_1,x_2\ge0.$$

Analysis: after standard form there is only one constraint, and the reduced costs and column coefficients are simple; focus on the criterion "all entries of the entering column nonpositive".

Solution: convert to min form $\min -x_1-x_2$. Add a slack variable $s\ge0$:

$$x_1-x_2+s=1,\qquad z=-x_1-x_2.$$

The initial basis is $(s)$, with $x_B=1$ and $z=0$. The reduced costs of the nonbasic variables $x_1,x_2$ are $-1,-1$.

Choose $x_2$ to enter. Its coefficient in the constraint is $-1\le0$, and the ratio test has no positive coefficient to use.

By the criterion, $x_2$ can grow without bound while remaining feasible: take $x_1=0$; then $s=1+x_2\ge0$ always holds, and the objective $z=-x_2\to-\infty$. So the original problem is unbounded.

Comment: the key is "all coefficients in the entering column are $\le0$". Then it is not that the ratio cannot be computed, but that no limit exists at all; forcing the computation gives a negative $\theta$, a wrong signal. Real code should scan the column first and report unboundedness once no positive entry is found.

### Example 3 (Advanced: degeneracy and cycling)

Problem: solve by the simplex method

$$\min\ -3x_1-9x_2\quad\text{s.t.}\quad x_1+4x_2\le8,\quad x_1+2x_2\le4,\quad x_1,x_2\ge0,$$

and point out where degeneracy occurs.

Analysis: the two constraints are simultaneously tight at $(0,2)$, the geometric source of degeneracy.

Solution: add slack variables:

$$x_1+4x_2+s_1=8,\quad x_1+2x_2+s_2=4,\quad z=-3x_1-9x_2.$$

The initial basis is $(s_1,s_2)$, with $x_B=(8,4)$. Reduced costs $\sigma_{x_1}=-3$, $\sigma_{x_2}=-9$; choose $x_2$ to enter.

Ratios: $8/4=2$, $4/2=2$, a tie. By Bland's rule choose the basic variable with the smaller index, i.e. $s_1$ leaves.

Divide the first row by $4$:

$$\tfrac14x_1+x_2+\tfrac14s_1=2.$$

Subtract $2$ times the first row from the second:

$$\tfrac12x_1+s_2-\tfrac12s_1=0.$$

Note the right side is $0$, so the basic variable $s_2=0$: this is degeneracy.

Objective: $x_2=2-\tfrac14x_1-\tfrac14s_1$,

$$z=-3x_1-9\left(2-\tfrac14x_1-\tfrac14s_1\right)=-\tfrac34x_1+\tfrac94s_1-18.$$

The reduced cost $\sigma_{x_1}=-\tfrac34<0$; continue. $x_1$ enters; ratios: first row $2\div\tfrac14=8$; second row $0\div\tfrac12=0$. The minimum is $0$, so $s_2$ leaves.

Pivot: multiply the second row by $2$:

$$x_1+2s_2-s_1=0.$$

Subtract $\tfrac14$ times the second row from the first:

$$x_2+\tfrac14s_1-\tfrac12s_2=2.$$

Objective: $x_1=s_1-2s_2$; substituting,

$$z=-\tfrac34(s_1-2s_2)+\tfrac94s_1-18=\tfrac32s_1+\tfrac32s_2-18.$$

All reduced costs are $\ge0$; stop. The optimal solution is $x_1=0$, $x_2=2$, with optimal value $-18$, so the original max problem has optimal value $18$.

Comment: the tie in the first iteration causes degeneracy, and the ratio $0$ in the second lets the objective stay unchanged (still $-18$), merely changing the basis. Degeneracy itself does not destroy correctness, but if the same set of bases recurs, cycling occurs. Beale's example needs $6$ variables to construct a genuine cycle; it is rarely met in practice, but solvers must have protection.

## VI. Common Errors and Pitfalls

- Wrong: for a min problem also choosing the most negative reduced cost to enter and stopping at $\sigma\ge0$ as for max. Correction: for min, $\sigma\ge0$ means optimal; for max, only $\sigma\le0$ is optimal. The two sign conventions must not be mixed.
- Wrong: including all coefficients (negative ones too) in the ratio test. Correction: only positive coefficients; a negative coefficient means the basic variable grows as the entering one grows, so it imposes no limit.
- Wrong: forcing a ratio when the entering column is all nonpositive. Correction: this means the problem is unbounded; stop at once and report it.
- Wrong: at pivoting, changing only the pivot row and forgetting to eliminate the column in other rows. Correction: pivoting is Gaussian elimination; every entry of the pivot column except the pivot must become $0$.
- Wrong: treating degeneracy as an error. Correction: degeneracy is a legitimate basic feasible solution with a basic variable equal to $0$; what must be guarded against is cycling, not degeneracy.
- Wrong: assuming a zero reduced cost always means multiple optima. Correction: $\sigma_j=0$ means bringing $x_j$ in leaves the objective unchanged; it may give another optimal vertex, or the ratio test may prevent it from entering—actually pivot to verify.
- Wrong: taking the first $m$ columns of $A$ as the initial basis. Correction: they must be invertible with $B^{-1}b\ge0$; otherwise use the two-phase method or the big-M method to construct an initial feasible basis.

## VII. Summary and Mnemonic

Key points:

- A basis is $m$ linearly independent columns, and a basic feasible solution corresponds to a vertex of the feasible region;
- the reduced cost $\sigma_j=c_j-c_B^{\top}B^{-1}A_j$ measures the change in objective from increasing $x_j$ by one unit;
- for a min problem all $\sigma_j\ge0$ means optimal;
- choose a negative reduced cost to enter, the minimum ratio to leave, considering only positive coefficients;
- an all-nonpositive entering column means unboundedness;
- degeneracy gives $\theta=0$, may cause cycling, and Bland's rule avoids it.

Mnemonic: **"Only negative reduced costs enter; the minimum ratio decides who leaves; pivot to eliminate and change vertex; stop when all are nonnegative."**`,
    relatedProblemIds: [],
  },

  duality: {
    chapter: 'Chapter 4 Duality Theory',
    title: 'Duality Theory of Linear Programming',
    summary:
      'Turn resource pricing into a dual problem: weak duality gives bounds, strong duality says the two sides are equal, and complementary slackness pairs them up.',
    keyPoints: [
      'Duality turns minimum cost into maximum price: transpose the matrix, swap b and c',
      'Weak duality: a dual feasible value never exceeds a primal feasible value',
      'Strong duality: when both are feasible, the optimal values are equal',
      'Complementary slackness: slack constraint means zero multiplier; positive variable means zero reduced cost',
      'Dual variables are shadow prices and serve as optimality certificates',
    ],
    content: String.raw`

Back to the factory example: $240$ carpentry hours, $100$ painting hours, a profit of $60$ per table and $30$ per chair. The owner wonders: if someone outside wanted to rent my hours, how much should I charge per hour so that I neither lose money nor lose competitiveness?

Let the rent be $y_1$ per carpentry hour and $y_2$ per painting hour. A table occupies $4$ carpentry hours and $2$ painting hours; if the rental income is below the profit, it is better to produce it myself, so

$$4y_1+2y_2\ge60.$$

Similarly for a chair:

$$3y_1+y_2\ge30.$$

Total rental income is $240y_1+100y_2$. The owner wants the price as low as possible (otherwise nobody rents), so the problem becomes

$$\min\ 240y_1+100y_2\quad\text{s.t.}\quad 4y_1+2y_2\ge60,\quad 3y_1+y_2\ge30,\quad y\ge0.$$

This is the dual of the original problem. Remarkably, its optimal value equals the maximum profit of the primal. Economically, $y_i$ is a shadow price: how much the profit increases per extra unit of the resource.

Duality theory answers three questions: why are the optimal values of the two problems equal? how does the dual solution help verify that the primal solution is optimal? and when are they unequal?

Opening question: if the primal problem is unbounded, what happens to the dual?

## II. Rigorous Definitions

**Definition (symmetric primal and dual)**. Primal:

$$\min\ c^{\top}x\quad\text{s.t.}\quad Ax\ge b,\quad x\ge0.$$

Its dual:

$$\max\ b^{\top}y\quad\text{s.t.}\quad A^{\top}y\le c,\quad y\ge0.$$

Here $A$ is $m\times n$, $b\in\mathbb{R}^m$, $c\in\mathbb{R}^n$, $y\in\mathbb{R}^m$.

**Theorem (weak duality)**. If $x$ is primal feasible and $y$ dual feasible, then

$$b^{\top}y\le c^{\top}x.$$

**Corollary**. The dual objective value gives a lower bound for the primal optimum; the primal objective value gives an upper bound for the dual optimum.

**Theorem (strong duality)**. If both the primal and the dual have feasible solutions, then both have optimal solutions and the optimal values are equal:

$$\min c^{\top}x=\max b^{\top}y.$$

**Theorem (complementary slackness)**. Let $x^*,y^*$ be primal and dual optimal solutions; then

$$y_i^*\left(\sum_j a_{ij}x_j^*-b_i\right)=0,\qquad x_j^*\left(c_j-\sum_i a_{ij}y_i^*\right)=0.$$

**Duality conversion table**. In general form, pair according to the following rules:

| Primal (min) | Dual (max) |
|---|---|
| greater-or-equal constraint | variable $y_i\ge0$ |
| less-or-equal constraint | variable $y_i\le0$ |
| equality constraint | variable $y_i$ free |
| variable $x_j\ge0$ | less-or-equal constraint |
| variable $x_j\le0$ | greater-or-equal constraint |
| variable $x_j$ free | equality constraint |

**Theorem (the dual of the dual)**. The dual of the dual is the primal.

## III. Why Defined This Way

**Why is the dual constraint $A^{\top}y\le c$?** From the economic interpretation, $y$ is a resource price, and the $j$-th component of $A^{\top}y$ is "the total rent of the resources used to produce one unit of product $j$". If this total rent exceeds the profit $c_j$ of product $j$, the owner would rather stop producing and rent out the resources, so a rational price must satisfy $A^{\top}y\le c$. This is not a formal derivation but a translation of pricing logic.

**Why does weak duality hold?** Three lines:

$$b^{\top}y\le(Ax)^{\top}y=x^{\top}A^{\top}y\le x^{\top}c=c^{\top}x.$$

The first and third inequalities use feasibility ($Ax\ge b$ and $y\ge0$ ensure multiplying by $y$ preserves the inequality; $A^{\top}y\le c$ and $x\ge0$ ensure multiplying by $x$ preserves it). The middle is the transpose identity. The whole proof uses only "multiplying an inequality by a nonnegative number preserves it", yet gives a very strong conclusion: any dual feasible solution is a certificate for the primal optimum.

**Why does strong duality need both sides feasible?** If the primal is unbounded, the dual cannot have a feasible solution, otherwise weak duality would give a lower bound—a contradiction. If the primal is infeasible, the dual may be unbounded or infeasible, and cases must be discussed separately. Strong duality is usually proved with the separating hyperplane theorem, or from the terminating state of the simplex method: the multipliers $y^{\top}=c_B^{\top}B^{-1}$ at termination automatically satisfy dual feasibility, and the objective values are equal.

**Why is the dual variable of an equality constraint free?** Because an equality constraint can be violated in both directions: $a^{\top}x=b$ allows neither more nor less, and the corresponding "price" may be positive or negative. Forcing $y\ge0$ would penalize only one direction and could not represent a two-sided constraint. The sign rules can be summarized as: the "tighter" the constraint (equality), the "freer" the variable.

**Counterexample: when strong duality fails.** The primal $\min x$ s.t. $0\cdot x\ge1$ is infeasible; the dual is $\max y$ s.t. $0\cdot y\le1$, $y\ge0$, whose optimal value is $+\infty$ (unbounded). One side is infeasible and the other unbounded, and the optimal values are unequal. So the premise "both feasible" cannot be dropped.

## IV. Intuition and Pictures

**Squeezing from above and below.** Each feasible solution of the primal gives an upper bound (min problem), each feasible solution of the dual gives a lower bound. If some $x$ and some $y$ have equal objective values, both are optimal at once—an optimality certificate, no further search needed.

| Primal | Dual |
|---|---|
| decision variables $x$: how much to produce | decision variables $y$: what the resources are worth |
| objective: minimize cost | objective: maximize rent |
| constraints: meet demand | constraints: no more than in-house cost |
| optimal value $z^*$ | the same optimal value $z^*$ |

> Intuition: the primal is "do things most cheaply", the dual "price them highest". They approach the same number from both sides, and that number is the true value of the resources.

**Shadow prices.** If the right-hand side $b_i$ is increased by one unit, the optimal value increases by about $y_i^*$. This is no coincidence: by the envelope theorem, the partial derivative of the optimal value with respect to $b_i$ equals $y_i^*$. So $y_i^*$ answers "what is one more ton of raw material worth", key information for scheduling decisions.

**Intuition of complementary slackness.** Two rules: a resource with a surplus (non-tight constraint) must have zero price; a product with positive output must have zero reduced cost (no excess profit). This is the same as "a perfectly competitive market has no excess profit" in economics.

## V. Worked Examples

### Example 1 (Basic: write the dual and solve)

Problem: write the dual of the following problem and use it to find the optimal value.

$$\min\ 2x_1+3x_2\quad\text{s.t.}\quad x_1+x_2\ge4,\quad x_1+3x_2\ge6,\quad x_1,x_2\ge0.$$

Analysis: the symmetric form follows the definition directly: transpose the constraint matrix, swap $b$ and $c$, turn greater-or-equal into less-or-equal, and min into max.

Solution: the dual is

$$\max\ 4y_1+6y_2\quad\text{s.t.}\quad y_1+y_2\le2,\quad y_1+3y_2\le3,\quad y_1,y_2\ge0.$$

Find the vertices of the dual: the constraint lines $y_1+y_2=2$ and $y_1+3y_2=3$ intersect at

$$2y_2=1\ \Longrightarrow\ y_2=\tfrac12,\quad y_1=\tfrac32.$$

The vertices of the feasible region are $(0,0)$, $(2,0)$, $(0,1)$, $(\tfrac32,\tfrac12)$. Objective values:

$$0,\quad 8,\quad 6,\quad 4\cdot\tfrac32+6\cdot\tfrac12=6+3=9.$$

The maximum is $9$, attained at $(\tfrac32,\tfrac12)$.

Then recover the primal with complementary slackness. Since $y_1,y_2>0$, both primal constraints are tight:

$$x_1+x_2=4,\qquad x_1+3x_2=6.$$

Subtracting gives $2x_2=2$, $x_2=1$, $x_1=3$. The objective is $2\cdot3+3\cdot1=9$, equal to the dual value. So the primal optimum is $(3,1)$ with value $9$.

Comment: the dual feasible region is sometimes smaller than the primal's and has fewer vertices, so it is easier to compute. Note that $(2,0)$ gives $8$ and $(1.5,0.5)$ gives $9$—do not compute only the points on the axes.

### Example 2 (Intermediate: reading solutions from complementary slackness)

Problem: still with the primal of Example 1, given the dual optimum $y^*=(\tfrac32,\tfrac12)$, find the primal optimum without solving the primal.

Analysis: complementary slackness pairs "tight constraints" with "nonzero variables", giving a linear system.

Solution: both dual variables are positive, so $y_i>0$ implies the primal constraints are equalities:

$$x_1+x_2=4,\qquad x_1+3x_2=6.$$

Solving gives $x_1=3$, $x_2=1$, both nonnegative, hence feasible.

Check the other group: the primal variables $x_1,x_2$ are both positive, so both dual constraints should be tight. Substituting $y^*$:

$$y_1+y_2=\tfrac32+\tfrac12=2\quad(\text{tight}),\qquad y_1+3y_2=\tfrac32+\tfrac32=3\quad(\text{tight}).$$

Both groups are satisfied, so $(3,1)$ and $(\tfrac32,\tfrac12)$ are an optimal pair with common optimal value $9$.

Comment: complementary slackness works in both directions: a positive dual variable implies a tight primal constraint; a positive primal variable implies a tight dual constraint. If a constraint is not tight, the corresponding variable must be zero, which greatly narrows the search.

### Example 3 (Advanced: proving optimality with duality)

Problem: consider

$$\max\ 3x_1+2x_2\quad\text{s.t.}\quad x_1+x_2\le4,\quad 2x_1+x_2\le5,\quad x_1,x_2\ge0.$$

Given the feasible solution $x=(1,3)$ with objective value $9$, prove optimality with the dual without enumerating vertices.

Analysis: write the max problem in min form, construct a dual feasible solution whose objective equals $9$

Solution: the primal is equivalent to

$$\min\ -3x_1-2x_2\quad\text{s.t.}\quad -x_1-x_2\ge-4,\quad -2x_1-x_2\ge-5,\quad x\ge0.$$

The two less-or-equal constraints were multiplied by $-1$ to become greater-or-equal. The dual is

$$\max\ -4y_1-5y_2\quad\text{s.t.}\quad -y_1-2y_2\le-3,\quad -y_1-y_2\le-2,\quad y\ge0,$$

i.e.

$$\max\ -4y_1-5y_2\quad\text{s.t.}\quad y_1+2y_2\ge3,\quad y_1+y_2\ge2,\quad y\ge0.$$

Try $y=(1,1)$: $1+2=3\ge3$, $1+1=2\ge2$, $y\ge0$—dual feasible. The dual objective is

$$-4-5=-9.$$

By weak duality every primal feasible solution has objective at least $-9$, i.e. $3x_1+2x_2\le9$. And $x=(1,3)$ attains exactly $9$, so it is optimal. QED.

Comment: this is the power of the "optimality certificate": one dual feasible solution pins down the objective over the whole feasible region, with no enumeration. When looking for $y$, see which two constraints are tight at $x$. Here $x_1+x_2=4$ and $2x_1+x_2=5$ are both tight, the corresponding dual constraints are also tight, and solving gives exactly $(1,1)$.

## VI. Common Errors and Pitfalls

- Wrong: reversing the dual direction, writing the dual of a min problem as min. Correction: a primal min gives a dual max, and vice versa.
- Wrong: imposing $y\ge0$ on the dual variable of an equality constraint. Correction: an equality constraint corresponds to a free variable with no sign restriction.
- Wrong: forgetting to transpose $A$. Correction: the dual constraint of $Ax\ge b$ is $A^{\top}y\le c$; rows and columns are interchanged.
- Wrong: believing strong duality always holds. Correction: both sides must be feasible; when one is unbounded and the other infeasible, the optimal values are unequal.
- Wrong: writing complementary slackness as a product equal to $1$, or dropping a factor. Correction: the product is zero, i.e. $y_i(Ax-b)_i=0$ and $x_j(c-A^{\top}y)_j=0$.
- Wrong: taking the dual optimum directly as the primal optimum. Correction: the dual solution is a "price", not a quantity; recover the primal solution with complementary slackness.
- Wrong: interpreting the shadow price as a "cost". Correction: it is the marginal value of the resource, the rate of change of the optimal value when the right-hand side increases by one unit.

## VII. Summary and Mnemonic

Key points:

- Duality turns "minimum cost" into "maximum price": transpose the constraint matrix, swap $b$ and $c$;
- weak duality: any dual feasible value never exceeds any primal feasible value;
- strong duality: when both are feasible, the optimal values are equal;
- complementary slackness: a slack constraint means a zero multiplier; a positive variable means a zero reduced cost;
- dual variables are shadow prices, equal to the sensitivity of the optimal value to the right-hand side;
- a dual feasible solution is a certificate of primal optimality.

Mnemonic: **"Primal minimizes, dual maximizes; transpose the matrix, flip the inequalities; weak duality bounds from both sides, complementary slackness pairs tight with strict."**`,
    relatedProblemIds: [],
  },

  unconstrained: {
    chapter: 'Chapter 5 Unconstrained Optimization',
    title: 'Optimality Conditions and Newton\'s Method',
    summary:
      'From gradient descent to Newton\'s method: first- and second-order conditions, step size and curvature, local quadratic convergence, and the classic counterexamples where Newton\'s method fails.',
    keyPoints: [
      'First-order necessary: ∇f=0; second-order necessary: Hessian positive semidefinite; second-order sufficient: positive definite',
      'Gradient descent follows the negative gradient; the step size is limited by the maximum curvature',
      'Newton\'s method uses a quadratic model, converges quadratically locally, and costs O(n³) per step',
      'With a large condition number gradient descent oscillates; Newton\'s method is unaffected',
      'Newton\'s method may cycle or diverge and needs a line search as a safeguard',
    ],
    content: String.raw`

Imagine you are blindfolded on a hillside and can only feel the slope under your feet. The plainest downhill strategy is: feel the steepest descending direction, take a step, feel again, take another step. This is gradient descent. It is simple and general, but in a long narrow valley it oscillates back and forth and moves extremely slowly.

A cleverer approach is to feel not only the slope but its rate of change (the curvature), fit a quadratic surface to the terrain underfoot, and jump to the minimum of that quadratic surface. This is Newton's method. It reaches the target in one step on a quadratic function, converges extremely fast near the solution for general functions, but must invert the Hessian each step—expensive—and may jump wildly far from the solution.

Unconstrained optimization is the foundation of all optimization theory. With it, constrained problems can be converted by penalty functions or augmented Lagrangians; training in machine learning is essentially iteration on large-scale problems.

Opening question: is a point with zero gradient necessarily a minimum? Why does Newton's method fail?

## II. Rigorous Definitions

**Definition (unconstrained optimization problem)**.

$$\min_{x\in\mathbb{R}^n}\ f(x),$$

where $f:\mathbb{R}^n\to\mathbb{R}$ is at least twice continuously differentiable.

**Theorem (first-order necessary condition)**. If $x^*$ is a local minimum and $f$ is differentiable at $x^*$, then

$$\nabla f(x^*)=0.$$

Points with $\nabla f(x^*)=0$ are stationary points.

**Theorem (second-order necessary condition)**. If $x^*$ is a local minimum and $f$ is twice differentiable, then $\nabla f(x^*)=0$ and

$$\nabla^2f(x^*)\succeq0.$$

**Theorem (second-order sufficient condition)**. If $\nabla f(x^*)=0$ and $\nabla^2f(x^*)\succ0$, then $x^*$ is a strict local minimum.

**Algorithm (gradient descent)**.

$$x_{k+1}=x_k-\alpha_k\nabla f(x_k),$$

where $\alpha_k>0$ is the step size. With a fixed step size, write $\alpha_k=\alpha$.

**Algorithm (backtracking line search and the Armijo condition)**. Given $\alpha_0>0$, $\rho\in(0,1)$, $c_1\in(0,1)$, set $\alpha=\alpha_0$; while

$$f(x_k-\alpha\nabla f(x_k))>f(x_k)-c_1\alpha\|\nabla f(x_k)\|^2$$

multiply $\alpha$ by $\rho$; when the condition holds, take $\alpha_k=\alpha$.

**Algorithm (Newton's method)**.

$$x_{k+1}=x_k-\left[\nabla^2f(x_k)\right]^{-1}\nabla f(x_k).$$

**Theorem (rates of convergence)**. Let $f$ be strongly convex with Lipschitz gradient; gradient descent with a suitable step size converges linearly:

$$\|x_k-x^*\|\le\rho^k\|x_0-x^*\|,\qquad \rho<1.$$

Newton's method converges quadratically near the solution (Hessian positive definite and Lipschitz):

$$\|x_{k+1}-x^*\|\le C\|x_k-x^*\|^2.$$

## III. Why Defined This Way

**Why is $\nabla f=0$ only necessary?** Because "zero slope" has three possibilities: valley bottom, hilltop, saddle. $f(x)=x^3$ has $f'(0)=0$ at $0$, but $0$ is an inflection point; $f(x,y)=x^2-y^2$ has zero gradient at the origin but rises along $x$ and falls along $y$—a saddle. So second-order information must be added.

**Why is the second-order necessary condition semidefinite rather than definite?** $f(x)=x^4$ has a strict minimum at $0$, yet $f''(0)=0$. Positive semidefiniteness allows flat directions with zero curvature; positive definiteness requires all directions to curve upward. A minimum may have a "fourth-order flat" direction, so the necessary condition can only go as far as semidefiniteness.

**Why does the second-order sufficient condition require positive definiteness?** If the Hessian is positive definite, then near $x^*$ a quadratic approximation holds:

$$f(x^*+d)\approx f(x^*)+\nabla f(x^*)^{\top}d+\frac12d^{\top}\nabla^2f(x^*)d=f(x^*)+\frac12d^{\top}\nabla^2f(x^*)d.$$

Positive definiteness makes the quadratic term positive for every $d\ne0$, so $x^*$ is a strict minimum. This is a direct consequence of Taylor expansion.

**Why does gradient descent follow the negative gradient?** Because the negative gradient is the first-order direction of fastest decrease. By Taylor expansion,

$$f(x-\alpha\nabla f(x))\approx f(x)-\alpha\|\nabla f(x)\|^2,$$

as long as $\alpha$ is small enough the value must decrease. If the step is too large, higher-order terms dominate and the value may rise.

**Why does Newton's method use the inverse Hessian?** Expand $f$ to second order at $x_k$ to get the quadratic model

$$m_k(d)=f(x_k)+\nabla f(x_k)^{\top}d+\frac12d^{\top}\nabla^2f(x_k)d.$$

Setting the gradient of $m_k$ to zero gives $d=-[\nabla^2f(x_k)]^{-1}\nabla f(x_k)$. So the Newton step is "the minimizer of the quadratic model". If $f$ is itself quadratic, the model is exact and one step suffices.

**Why must practical algorithms add a line search?** Because "the negative gradient is a descent direction" holds only for sufficiently small steps. A fixed step may overshoot the valley, make the value rebound, or even diverge. Backtracking starts from a larger $\alpha$ and halves repeatedly until the Armijo condition holds; it guarantees sufficient decrease each step without shrinking the step so much that progress stalls. Theoretically, gradient descent with Armijo converges globally to a stationary point for smooth functions.

**Counterexample: Newton's method cycles.** For $f(x)=x^3-2x+2$ from $x_0=0$:

$$x_1=0-\frac{f(0)}{f'(0)}=0-\frac{2}{-2}=1,$$

$$x_2=1-\frac{f(1)}{f'(1)}=1-\frac{1}{1}=0.$$

Back to $0$, cycling between $0$ and $1$ forever. The reason is that the second derivative vanishes at $x=0$, so the Newton step is amplified; and $x_0$ is far from the true minimum (about $0.816$), so the quadratic model is unreliable.

## IV. Intuition and Pictures

**Contours and the negative gradient.** The denser the contours, the steeper the slope. The negative gradient is perpendicular to the contours and points toward decreasing values. For long narrow elliptic contours (an ill-conditioned problem), the negative gradient is almost perpendicular to the long axis, causing zigzag oscillation.

| Method | Cost per step | Convergence rate | Robustness |
|---|---|---|---|
| gradient descent | $O(n)$ | linear | good, needs step tuning |
| Newton | $O(n^3)$ | quadratic (local) | poor, needs positive definite Hessian |
| quasi-Newton (BFGS) | $O(n^2)$ | superlinear | fairly good |

> Intuition: gradient descent looks only at "which way is downhill", Newton's method also at "how curved the slope is". The more it sees, the more accurately it moves—but the more expensive each observation.

**Geometry of Newton's method: parabola fitting.** At $x_k$, Newton's method replaces $f$ by a parabola with the same value, slope and curvature, then jumps to its vertex. If $f$ is itself a parabola (quadratic), the substitute coincides with the original and one step suffices. If the curvature is negative ($f''<0$), the parabola opens downward, its vertex is a maximum, and the Newton step runs the other way—the geometric reason it fears a non-positive-definite Hessian.

**Effect of the condition number.** For $f(x,y)=x^2+10y^2$ the contours are flat ellipses with condition number $\kappa=10$. Gradient descent with the optimal step converges at a rate about $((\kappa-1)/(\kappa+1))^2\approx0.67$, while Newton's method takes one step. The larger $\kappa$, the slower gradient descent.

## V. Worked Examples

### Example 1 (Basic: find and classify stationary points)

Problem: find all stationary points of $f(x,y)=x^2+xy+y^2-3x$ and classify them.

Analysis: solve $\nabla f=0$, then use the Hessian.

Solution: the partials are

$$\frac{\partial f}{\partial x}=2x+y-3,\qquad\frac{\partial f}{\partial y}=x+2y.$$

Setting both to zero:

$$2x+y=3,\qquad x+2y=0.$$

From the second $x=-2y$; substituting into the first: $-4y+y=3$, i.e. $-3y=3$, $y=-1$, $x=2$. The unique stationary point is $(2,-1)$.

Hessian:

$$\nabla^2f=\begin{pmatrix}2&1\\1&2\end{pmatrix}.$$

Leading principal minors: $2>0$, determinant $4-1=3>0$, so it is positive definite. By the second-order sufficient condition, $(2,-1)$ is a strict local minimum.

In fact $f$ is a convex quadratic (positive definite Hessian), so the local minimum is global, with optimal value

$$f(2,-1)=4-2+1-6=-3.$$

Comment: the Hessian of a quadratic is a constant matrix, so one test settles the global picture. If the determinant is negative it is a saddle; if zero, the second-order condition fails and higher-order information is needed.

### Example 2 (Intermediate: gradient descent and the condition number)

Problem: for $f(x,y)=x^2+10y^2$ from $(1,1)$ with step $\alpha=0.09$, write the iteration, analyse the convergence in the two directions, and give the stability bound on the step.

Analysis: the gradient is $(2x,20y)$; the two directions decouple and can be computed separately.

Solution: the iteration is

$$x_{k+1}=x_k-0.09\cdot2x_k=0.82x_k,$$

$$y_{k+1}=y_k-0.09\cdot20y_k=(1-1.8)y_k=-0.8y_k.$$

Hence

$$x_k=0.82^k,\qquad y_k=(-0.8)^k.$$

Both directions converge: the $x$ direction shrinks to $0.82$ each step, the $y$ direction to $0.8$. If the step is pushed to $0.099$, the $y$ factor becomes $1-1.98=-0.98$, almost no shrinkage, while the $x$ factor is $0.802$. The overall rate is set by the slowest direction.

Stability bound: both factors must lie between $-1$ and $1$. The $x$ direction needs $\lvert1-2\alpha\rvert<1$, i.e. $0<\alpha<1$; the $y$ direction needs $\lvert1-20\alpha\rvert<1$, i.e. $0<\alpha<0.1$. So the stability bound is $\alpha<2/L=2/20=0.1$, where $L=20$ is the maximum curvature.

Comment: the condition number $\kappa=10$ makes the "time scales" of the two directions differ by a factor of $10$; gradient descent must accommodate the slowest direction, so the fast direction is already there while the slow one is still climbing. This is the geometric root of slow convergence on ill-conditioned problems.

### Example 3 (Advanced: the trap of Newton's method)

Problem: for $f(x)=x^3-2x+2$, run Newton's method from $x_0=0$ and prove that it cycles; explain which premise is violated.

Analysis: compute two steps and see whether the starting point returns.

Solution: $f'(x)=3x^2-2$, $f''(x)=6x$. The Newton iteration is

$$x_{k+1}=x_k-\frac{x_k^3-2x_k+2}{3x_k^2-2}.$$

First step, $x_0=0$:

$$x_1=0-\frac{0-0+2}{0-2}=0-\frac{2}{-2}=1.$$

Second step, $x_1=1$:

$$x_2=1-\frac{1-2+2}{3-2}=1-\frac{1}{1}=0.$$

Back to $x_0$. Since the iteration is deterministic, it then repeats $0$ to $1$ and back forever.

Where is the problem? $f''(0)=0$: the second derivative degenerates at $x_0=0$ and the Newton step is amplified by a small denominator; and $x_0$ is far from the true minimum ($f$ has its minimum at $x=\sqrt{2/3}$), where the quadratic model is unreliable.

Comment: the quadratic convergence of Newton's method is a local result, requiring the initial value to lie in the basin of attraction and the Hessian to be positive definite. In practice one uses "damped Newton" (with a line search) or "trust-region methods" to enlarge the basin: compute the direction first, then restrict the step, guaranteeing that the value really decreases.

## VI. Common Errors and Pitfalls

- Wrong: declaring a minimum found after solving $\nabla f=0$. Correction: also use second-order conditions or convexity; $x^3$ and saddles are counterexamples.
- Wrong: declaring positive definiteness because the determinant of the Hessian is positive. Correction: all leading principal minors must be positive; a positive determinant can also mean negative definite.
- Wrong: not checking whether the Hessian is positive definite in Newton's method. Correction: with an indefinite Hessian the Newton direction may not be a descent direction; correct it or use the gradient direction.
- Wrong: using a fixed large step in gradient descent. Correction: the step must be below $2/L$, otherwise divergence; in practice pair it with a line search.
- Wrong: believing Newton's method converges globally. Correction: only locally, and quadratically; the cycle of $x^3-2x+2$ is a counterexample.
- Wrong: conflating "local minimum" with "global minimum". Correction: a non-convex function may have several local minima; use multiple starts or a global algorithm.
- Wrong: taking too small a step in a finite-difference gradient. Correction: too small a step is swamped by rounding error; usually take the order of the square root of machine precision.

## VII. Summary and Mnemonic

Key points:

- first-order necessary condition $\nabla f=0$; second-order necessary $\nabla^2f\succeq0$; second-order sufficient $\nabla^2f\succ0$;
- gradient descent follows the negative gradient, with the step limited by the maximum curvature;
- Newton's method uses a quadratic model, converges quadratically locally, and costs $O(n^3)$ per step;
- with a large condition number gradient descent oscillates, while Newton's method is unaffected;
- Newton's method may cycle or diverge and needs a line search or trust region as a safeguard;
- convexity can upgrade local conclusions to global ones.

Mnemonic: **"First order finds flat ground, second order checks the bowl; gradient sees only slope, Newton adds curvature; too large a step flies away, too far a start loses even the Newton."**`,
    relatedProblemIds: [],
  },

  kkt: {
    chapter: 'Chapter 6 Constrained Optimization',
    title: 'KKT Conditions and Subgradients',
    summary:
      'Write the intuition of "the fence holding the ball" as four equations: stationarity, feasibility, nonnegative multipliers and complementary slackness, then extend to the subgradient for nondifferentiable problems.',
    keyPoints: [
      'The Lagrangian folds constraints into the objective; the multiplier is the price of the constraint',
      'The four KKT conditions: stationarity, primal feasibility, dual feasibility, complementary slackness',
      'KKT necessity needs a constraint qualification such as LICQ or Slater',
      'For a convex problem with Slater, KKT is necessary and sufficient',
      'When nondifferentiable, use subgradients; the optimality condition is 0∈∂f(x*)',
    ],
    content: String.raw`

Put a small ball in a field enclosed by a fence and let it roll to the lowest place. If the lowest point is inside the field, the ball stops where the ground is flat, the gradient is zero, and the fence plays no role. If the lowest point is on the fence, the ball is held by the rail, and the component of gravity along the ground is balanced by the reaction of the rail. Then the gradient is not zero, but points exactly out of the enclosure—held back by the constraint.

This balance of "being held" is the KKT condition. The Lagrange multiplier $\lambda$ measures how strong the force from the rail is: the "harder" the constraint (relaxing it slightly would greatly lower the objective), the larger the multiplier; a constraint that plays no role has multiplier zero.

The KKT conditions translate "constrained optimization" into a system of equations and inequalities, the common language of modern optimization. Support vector machines, model predictive control, optimal power flow and network flows all solve KKT systems. And when the functions are nondifferentiable (for example losses with absolute values or $\max$), the gradient is replaced by a subgradient, and KKT is extended accordingly.

Opening question: why must the multiplier be zero when a constraint plays no role? Are KKT conditions still sufficient for non-convex problems?

## II. Rigorous Definitions

**Definition (constrained optimization problem)**.

$$\min\ f(x)\quad\text{s.t.}\quad g_i(x)\le0\ (i=1,\dots,m),\quad h_j(x)=0\ (j=1,\dots,p).$$

$f$ is the objective, $g_i$ the inequality constraints and $h_j$ the equality constraints. The feasible region is $\mathcal{F}=\{x:g_i(x)\le0,\ h_j(x)=0\}$.

**Definition (Lagrangian)**.

$$L(x,\lambda,\mu)=f(x)+\sum_{i=1}^{m}\lambda_ig_i(x)+\sum_{j=1}^{p}\mu_jh_j(x).$$

$\lambda_i$ and $\mu_j$ are Lagrange multipliers.

**Theorem (KKT conditions)**. If $x^*$ is a local minimum satisfying a constraint qualification, then there are multipliers $\lambda^*,\mu^*$ with

$$\nabla_xL(x^*,\lambda^*,\mu^*)=\nabla f(x^*)+\sum_i\lambda_i^*\nabla g_i(x^*)+\sum_j\mu_j^*\nabla h_j(x^*)=0,$$

$$g_i(x^*)\le0,\qquad h_j(x^*)=0,$$

$$\lambda_i^*\ge0,$$

$$\lambda_i^*g_i(x^*)=0\quad(i=1,\dots,m).$$

The four are called: stationarity, primal feasibility, dual feasibility, complementary slackness.

**Definition (constraint qualification)**. Two common ones:

- LICQ: at $x^*$, the gradients $\nabla g_i$ of all active constraints (those with $g_i(x^*)=0$) together with $\nabla h_j$ are linearly independent;
- Slater condition (convex problems): there is a strictly feasible point $\bar x$ with $g_i(\bar x)<0$ for all $i$ and $h_j(\bar x)=0$.

**Theorem (sufficiency in the convex case)**. If $f,g_i$ are convex, $h_j$ affine, and the Slater condition holds, then the KKT conditions are necessary and sufficient for optimality.

**Definition (subgradient and subdifferential)**. For a convex function $f:\mathbb{R}^n\to\mathbb{R}$, if a vector $g$ satisfies

$$f(y)\ge f(x)+g^{\top}(y-x)\qquad\forall y,$$

then $g$ is a subgradient of $f$ at $x$. The set of all subgradients is denoted $\partial f(x)$, the subdifferential.

**Example**. The subdifferential of $f(x)=\lvert x\rvert$ at $0$ is

$$\partial f(0)=[-1,1].$$

For $x\ne0$, $\partial f(x)=\{\operatorname{sgn}x\}$.

**Theorem (optimality condition via subgradients)**. A convex function $f$ attains its global minimum at $x^*$ if and only if

$$0\in\partial f(x^*).$$

## III. Why Defined This Way

**Why must the multipliers satisfy $\lambda_i\ge0$?** Write the constraint as $g_i\le0$; the feasible directions are those that decrease $g_i$, i.e. $-\nabla g_i$. At the optimum the objective can no longer decrease, so $\nabla f$ must "point outside the constraint", i.e. $\nabla f$ is a nonnegative combination of the $-\nabla g_i$:

$$\nabla f=-\sum\lambda_i\nabla g_i,\qquad\lambda_i\ge0.$$

If some $\lambda_i<0$, one could still decrease along a feasible direction—a contradiction. The sign is not a convention; it is forced by "feasible directions".

**Why complementary slackness $\lambda_ig_i=0$?** If a constraint plays no role ($g_i(x^*)<0$), then near the optimum it still holds and can be ignored entirely; it contributes nothing to the balance, so its multiplier must be zero. Conversely, if $\lambda_i>0$, the constraint is "pushing", and it must be exactly tight ($g_i=0$), otherwise the force is wasted. At most one of the two can be nonzero.

**Why is a constraint qualification needed?** Counterexample: $\min -x$ s.t. $x^2\le0$. The feasible region is only $x=0$, and the optimum is $0$. But $\nabla f(0)=-1$ and $\nabla g(0)=0$, so the stationarity equation becomes $-1+\lambda\cdot0=0$, which has no solution. KKT fails because $\nabla g(0)=0$: the constraint degenerates at this point and cannot provide an effective normal vector. A constraint qualification excludes such degeneracies.

**Why is KKT sufficient for convex problems?** Because $L(x,\lambda,\mu)$ is convex in $x$ ($f,g_i$ convex, $\lambda_i\ge0$ makes $\lambda_ig_i$ convex, $h_j$ affine). If $x^*$ satisfies KKT, then for any feasible $x$,

$$f(x)\ge L(x,\lambda^*,\mu^*)\ge L(x^*,\lambda^*,\mu^*)=f(x^*),$$

the first inequality uses $g_i(x)\le0$, $\lambda_i\ge0$, $h_j(x)=0$; the second that $x^*$ minimizes $L$; the last complementary slackness. Hence $x^*$ is globally optimal. This "squeeze" is the core of convex duality theory.

**Why are subgradients needed?** Because many practical functions are nondifferentiable: $\lvert x\rvert$, $\max(0,x)$, norms. At these points there is no unique tangent, but there is a whole segment of "supporting lines", each with a slope that is a subgradient. The condition $0\in\partial f(x^*)$ says "there is a horizontal supporting line", exactly the geometric feature of a minimum.

**Counterexample: for non-convex problems KKT is only necessary.** Consider

$$\min\ -x^2\quad\text{s.t.}\quad x^2\le1.$$

The objective $-x^2$ is concave and the feasible region is $[-1,1]$. Write $g(x)=x^2-1\le0$; the Lagrangian is $L=-x^2+\lambda(x^2-1)$, and stationarity gives

$$-2x+2\lambda x=0\ \Longrightarrow\ 2x(\lambda-1)=0.$$

There are three kinds of KKT points. If $x=0$, the constraint is not tight, complementary slackness requires $\lambda=0$, KKT holds, but $x=0$ is a maximum ($f=0$). If $x=\pm1$, the constraint is tight, $\lambda=1\ge0$, KKT holds, and both points are minima ($f=-1$). So the same KKT system accepts both minima and a maximum and cannot distinguish them. The reason is that the objective is non-convex and second-order information is not encoded in KKT. Hence for non-convex problems KKT only provides candidates; one must compare function values or do a second-order test.

## IV. Intuition and Pictures

**Geometry: contour tangent to the boundary.** At an optimal boundary point, the contour of the objective is tangent to the constraint boundary. If not, one could slide along the boundary and keep lowering the objective. The algebraic expression of tangency is that the two gradients are parallel: $\nabla f=-\lambda\nabla g$.

| Case | Multiplier | Geometry |
|---|---|---|
| optimum in the interior | all $\lambda_i=0$ | contours close inside |
| constraint active | $\lambda_i>0$ and $g_i=0$ | contour tangent to the boundary |
| constraint inactive | $\lambda_i=0$ and $g_i<0$ | boundary far away |

> Intuition: $\lambda$ is "the reaction force of the fence". The more the fence obstructs, the larger the force; if the fence does not touch the ball, the force is zero.

**Economics: shadow prices.** $\lambda_i$ equals the decrease in the optimal value when the right-hand side of constraint $i$ is relaxed by one unit. How much the owner would pay to relax this constraint is then obvious.

**Subgradients: supporting lines at a corner.** $\lvert x\rvert$ has a corner at $0$ into which infinitely many supporting lines can be inserted, with slopes from $-1$ to $1$. The horizontal one (slope $0$) shows that $0$ is the minimum.

## V. Worked Examples

### Example 1 (Basic: equality constraint)

Problem: solve $\min\ x^2+y^2$ s.t. $x+y=1$.

Analysis: only an equality constraint; use a Lagrange multiplier and solve the linear system.

Solution: the Lagrangian

$$L=x^2+y^2+\mu(x+y-1).$$

Stationarity:

$$\frac{\partial L}{\partial x}=2x+\mu=0,\qquad\frac{\partial L}{\partial y}=2y+\mu=0.$$

Subtracting gives $2x-2y=0$, so $x=y$. Substituting into the constraint $x+y=1$ gives $x=y=\tfrac12$ and $\mu=-1$.

The optimal value is $f(\tfrac12,\tfrac12)=\tfrac14+\tfrac14=\tfrac12$.

Geometric check: the origin (the unconstrained minimum) is not on the line $x+y=1$; the closest point is the foot of the perpendicular from the origin, namely $(\tfrac12,\tfrac12)$. The squared distance is $\tfrac12$, consistent.

Comment: the multiplier of an equality constraint may be positive or negative, with no nonnegativity restriction. This differs from inequality constraints; the sign rule comes from whether the constraint can be violated in both directions.

### Example 2 (Intermediate: inequality constraint and complementary slackness)

Problem: solve $\min\ x^2+y^2$ s.t. $x+y\ge2$. Then solve $\min\ x^2+y^2$ s.t. $x+y\ge-2$ and compare the multipliers.

Analysis: first assume the constraint is active, solve, and check $\lambda\ge0$; then assume it is inactive and check feasibility.

Solution: write the standard form $2-x-y\le0$, i.e. $g(x,y)=2-x-y\le0$.

The Lagrangian

$$L=x^2+y^2+\lambda(2-x-y).$$

Stationarity:

$$2x-\lambda=0,\qquad 2y-\lambda=0\ \Longrightarrow\ x=y=\frac{\lambda}{2}.$$

Case one: the constraint is active, $x+y=2$. Then $2\cdot\tfrac{\lambda}{2}=\lambda=2$, so $\lambda=2>0$ and $x=y=1$. All KKT conditions hold, and the optimal value is $2$.

Case two: the constraint is inactive, $\lambda=0$. Stationarity gives $x=y=0$. Check feasibility: $0+0=0\ge2$ is false, so it is infeasible. This case is excluded.

So the optimum is $(1,1)$ with $\lambda=2$.

Now the second problem: constraint $x+y\ge-2$, i.e. $g=-2-x-y\le0$. The unconstrained minimum $(0,0)$ satisfies $0\ge-2$ and is feasible. So $\lambda=0$, $x=y=0$, and the optimal value is $0$. Complementary slackness is automatic: $\lambda=0$ while $g=-2<0$.

Comment: the two problems differ only on the right-hand side; in one the constraint is active with a positive multiplier, in the other inactive with multiplier zero. Complementary slackness unifies the two cases in one system, so no case split is needed; but by hand a case split is clearer.

### Example 3 (Advanced: subgradients and nondifferentiable optimization)

Problem: find the minimum of $f(x)=\lvert x\rvert+\lvert x-2\rvert$ and all minimizers.

Analysis: $f$ is nondifferentiable at $0$ and $2$; use the subdifferential; the optimality condition is $0\in\partial f(x)$.

Solution: write $f$ piecewise:

$$f(x)=\begin{cases}2-2x, & x<0,\\ 2, & 0\le x\le2,\\ 2x-2, & x>2.\end{cases}$$

Take the subdifferential piece by piece:

- $x<0$: $f'(x)=-2$, $\partial f(x)=\{-2\}$;
- $0<x<2$: $f'(x)=1-1=0$, $\partial f(x)=\{0\}$;
- $x>2$: $f'(x)=2$, $\partial f(x)=\{2\}$;
- $x=0$: $\partial\lvert x\rvert=[-1,1]$, $\partial\lvert x-2\rvert=\{-1\}$, so $\partial f(0)=[-2,0]$;
- $x=2$: $\partial\lvert x\rvert=\{1\}$, $\partial\lvert x-2\rvert=[-1,1]$, so $\partial f(2)=[0,2]$.

Optimality condition $0\in\partial f(x)$: at $x=0$, $0\in[-2,0]$; for $0<x<2$, $\partial f=\{0\}$; at $x=2$, $0\in[0,2]$. Hence all minimizers form $[0,2]$, with minimum value $f=2$.

Comment: the trap here is "there is only one minimizer". $f$ is flat on the whole interval $[0,2]$, and infinitely many points attain the minimum. The subgradient handles "corners" and "flat pieces" uniformly: as long as $0$ lies in the subdifferential set, the point is a minimizer. With an ordinary gradient one could not even start at $0$ and $2$.

## VI. Common Errors and Pitfalls

- Wrong: writing an inequality constraint as $g\le0$ but allowing $\lambda<0$. Correction: $g\le0$ corresponds to $\lambda\ge0$; if written as $g\ge0$, the signs reverse.
- Wrong: treating all constraints as equalities and ignoring complementary slackness. Correction: assume active, solve, then verify $\lambda\ge0$ and feasibility; the inactive case must also be checked.
- Wrong: asserting KKT without checking a constraint qualification. Correction: $\min -x$ s.t. $x^2\le0$ is the classic counterexample where KKT fails.
- Wrong: taking a KKT point as globally optimal in a non-convex problem. Correction: KKT is only necessary; compare several candidates or verify convexity.
- Wrong: in a convex problem verifying only stationarity and forgetting primal and dual feasibility. Correction: all four must be verified together.
- Wrong: using the subgradient as an ordinary gradient in gradient descent. Correction: the negative subgradient is a descent direction but not the steepest; the step must decay like $1/\sqrt{k}$ or similar.
- Wrong: assuming a nondifferentiable point cannot be optimal. Correction: $\lvert x\rvert$ is nondifferentiable at $0$ yet has its unique minimum there.

## VII. Summary and Mnemonic

Key points:

- the Lagrangian "folds" the constraints into the objective; the multiplier is the price of the constraint;
- the four KKT conditions: stationarity, primal feasibility, dual feasibility, complementary slackness;
- complementary slackness: a slack constraint means a zero multiplier; a positive multiplier means a tight constraint;
- KKT necessity needs a constraint qualification such as LICQ or Slater;
- for a convex problem with Slater, KKT is necessary and sufficient;
- when nondifferentiable, use subgradients; the optimality condition is $0\in\partial f(x^*)$.

Mnemonic: **"Lagrangian with multipliers, gradients balance without crossing; slack constraint means zero multiplier, tight constraint pushes back the other way."**`,
    relatedProblemIds: [],
  },
};

export default map;
