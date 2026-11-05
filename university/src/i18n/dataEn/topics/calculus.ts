import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  limits: {
    chapter: 'Chapter 1 Functions and Limits',
    title: 'Limits and Continuity',
    summary:
      'Limits are the foundation of calculus. Master the ε-δ definition, the two important limits, and equivalent infinitesimal substitution, and you hold half of all calculus computation.',
    keyPoints: [
      'Logical structure of the ε-δ definition: ∀ε>0, ∃δ>0, 0<|x-x₀|<δ ⟹ |f(x)-A|<ε',
      'The two important limits and all their variants (the sinx/x type and the 1^∞ type)',
      'Equivalent infinitesimals may be used only in products and quotients, never in sums or differences',
      'Continuous ⟺ the limit equals the function value',
    ],
    content: String.raw`

In the fifth century BC the Greek mathematician Zeno devised the paradox of "Achilles and the tortoise": give the tortoise a head start, then let Achilles run. Zeno argued that whenever Achilles reaches the point where the tortoise was, the tortoise has crept a little further; after covering that bit, the tortoise is still slightly ahead. Repeating this, Achilles seems always a little short and can never catch up. The paradox puzzled people for more than two thousand years. Its error lies in assuming that "infinitely many time intervals must add up to an infinite time", whereas mathematics later proved that a sequence of ever shorter waiting times can add up to a finite total. Achilles not only catches the tortoise but can be computed exactly—at which instant and at which place.

The same idea in another guise is instantaneous velocity. The speedometer reads 100 km/h at a given moment; what does "the speed at a moment" mean? A moment is an instant, the displacement in an instant is 0, and 0 divided by 0 is meaningless. The mathematician's approach: first compute the average speed over a short interval, then keep shortening the interval and watch which stable value the average speed approaches. That "stable value being approached" is the limit, and this idea is the foundation of all calculus—derivatives, integrals, and series all rest on it.

This topic answers three questions: what exactly is a limit (the rigorous definition)? How is it computed (the two important limits and equivalent infinitesimals)? How does it relate to continuity? After studying it you should be able to describe "approaching indefinitely" in precise language and compute the limits of the great majority of elementary functions.

## 2. Rigorous Definitions

**Definition 1 (limit of a sequence)** Given a sequence $a_1, a_2, \dots$ and a constant $A$. If for every given positive number $\varepsilon$ (however small) there is a positive integer $N$ such that for all $n > N$ we have $|a_n - A| < \varepsilon$, then the sequence is said to converge to $A$, written

$$\lim_{n \to \infty} a_n = A$$

**Definition 2 (limit of a function, $x \to x_0$)** Let $f(x)$ be defined in a deleted neighbourhood of $x_0$ and let $A$ be a constant. If for every given $\varepsilon > 0$ there is $\delta > 0$ such that whenever $0 < |x - x_0| < \delta$ we always have

$$|f(x) - A| < \varepsilon$$

then $f(x)$ is said to have limit $A$ as $x \to x_0$, written $\lim\limits_{x \to x_0} f(x) = A$. Here $x_0$ may be finite or $\pm\infty$ (for $x \to \infty$ replace the condition $0 < |x - x_0| < \delta$ by $|x| > X$, i.e. "there is always $X > 0$ such that $|x| > X$ implies $|f(x) - A| < \varepsilon$").

**Definition 3 (one-sided limits)** If in Definition 2 the condition is changed to $x_0 - \delta < x < x_0$ (approach from the left only), we obtain the left limit $\lim\limits_{x \to x_0^-} f(x)$; approaching only from the right gives the right limit $\lim\limits_{x \to x_0^+} f(x)$. A limit exists if and only if both one-sided limits exist and are equal.

**Definition 4 (infinity)** If for every $M > 0$ there is $\delta > 0$ such that whenever $0 < |x - x_0| < \delta$ we have $|f(x)| > M$, then $f(x)$ is said to be infinite as $x \to x_0$, written $\lim\limits_{x \to x_0} f(x) = \infty$. Note that infinity is a particular form of "the limit does not exist", not a finite number.

**Definition 5 (continuity)** A function $f(x)$ is continuous at $x_0$ if and only if all three conditions hold:

1. $f(x)$ is defined at $x_0$;
2. $\lim\limits_{x \to x_0} f(x)$ exists;
3. $\lim\limits_{x \to x_0} f(x) = f(x_0)$.

In "increment language": $\Delta y = f(x_0 + \Delta x) - f(x_0)$ satisfies $\Delta y \to 0$ (as $\Delta x \to 0$). If the function is continuous at every point of an interval it is said to be continuous on that interval; at the endpoints of a closed interval it means left- or right-continuity.

**Classification of discontinuities** ($x_0$ is a point of discontinuity, i.e. not continuous):

| Type | Condition | Example |
|------|-----------|---------|
| Removable discontinuity | Both one-sided limits exist and are equal, but do not equal the function value (or the function is undefined there) | $\frac{\sin x}{x}$ at $x = 0$ |
| Jump discontinuity | Both one-sided limits exist but are unequal | The sign function at $x = 0$ |
| Infinite discontinuity | At least one one-sided limit is infinite | $\frac{1}{x}$ at $x = 0$ |
| Oscillatory discontinuity | The limit does not exist and is not infinite; the function oscillates without bound | $\sin\frac{1}{x}$ at $x = 0$ |

The first two are called discontinuities of the first kind, the last two of the second kind.

## 3. Why Define It This Way

**Why the order "for any $\varepsilon$, there exists $\delta$"?** $\varepsilon$ is the accuracy demanded by the opponent, $\delta$ is the guarantee we find, so $\delta$ must depend on $\varepsilon$. The order can never be swapped: "there exists $\varepsilon > 0$ such that for any $\delta > 0$ we have $|f(x) - A| < \varepsilon$" is almost vacuous—take $\varepsilon$ large enough and any function satisfies it. The rigour of the limit definition comes precisely from this order of quantifiers.

**Why is the neighbourhood $0 < |x - x_0| < \delta$ "deleted"?** A limit studies the trend as $x$ approaches $x_0$, and has nothing to do with whether $f$ is defined at $x_0$ or what its value there is. Counterexample: let $f(x) = 1$ for $x \neq 0$ and $f(0) = 100$. As $x \to 0$ the limit is still 1, independent of $f(0)$. This "deleted" point is exactly what decouples the limit from the function value, and it foreshadows the "removable discontinuity".

**Why are all three conditions for continuity indispensable?** Each has a counterexample. (1) Without "defined": $f(x) = \frac{\sin x}{x}$ ($x \neq 0$) is undefined at $x = 0$; although the limit is 1, the function is not continuous. (2) Without "the limit exists": the sign function $f(x) = \frac{x}{|x|}$ ($x \neq 0$), $f(0) = 0$, has one-sided limits $-1$ and $1$ and is discontinuous. (3) Without "equal": let $f(x) = \frac{\sin x}{x}$ ($x \neq 0$) and $f(0) = 2$; the limit is 1 but the value is 2, so it is still discontinuous. Only all three together constitute continuity.

**Why must $A$ be a "constant"?** This excludes two pathologies: oscillation ($\sin\frac{1}{x}$ swings forever between $-1$ and $1$ as $x \to 0$ and approaches no constant) and divergence to infinity ($\frac{1}{x}$ as $x \to 0$). The former is an oscillatory discontinuity, the latter is singled out as infinity.

## 4. Intuition and Pictures

Think of the $\varepsilon$-$\delta$ definition as a contest: the opponent gives the radius $\varepsilon$ of an error tube, and you must find the radius $\delta$ of an input range such that every $x$ in $(x_0 - \delta, x_0 + \delta)$ (with $x_0$ removed) has its function value inside the tube $(A - \varepsilon, A + \varepsilon)$. The smaller $\varepsilon$, the thinner the tube, and usually the smaller $\delta$—but the existence of $\delta$ is the whole point.

**Geometric origin of the two important limits.** The first important limit $\lim\limits_{x \to 0} \frac{\sin x}{x} = 1$ can be proved by squeezing areas in the unit circle: for $0 < x < \frac{\pi}{2}$ compare the areas of a triangle, a sector, and a larger triangle, obtaining

$$\sin x < x < \tan x$$

Dividing each term by $\sin x$ (positive, so the inequalities keep their direction): $1 < \frac{x}{\sin x} < \frac{1}{\cos x}$; taking reciprocals gives $\cos x < \frac{\sin x}{x} < 1$. As $x \to 0^+$, $\cos x \to 1$, so by the squeeze theorem $\frac{\sin x}{x} \to 1$; the case $x \to 0^-$ follows by oddness. The second important limit $\lim\limits_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$ comes from compound interest: principal 1, annual rate 100%, compounded $n$ times a year, gives $\left(1 + \frac{1}{n}\right)^n$ at year end; the more frequent the compounding the larger the yield, but it does not grow without bound—it tends to the constant $e \approx 2.71828$.

**Table of equivalent infinitesimals** (as $x \to 0$):

| Infinitesimal | Equivalent form | Origin |
|--------------|-----------------|--------|
| $\sin x$ | $x$ | First important limit |
| $\tan x$ | $x$ | $\frac{\sin x}{x} \cdot \frac{1}{\cos x}$ |
| $1 - \cos x$ | $\frac{1}{2}x^2$ | Double-angle formula $1 - \cos x = 2\sin^2\frac{x}{2}$ |
| $e^x - 1$ | $x$ | Definition of the derivative |
| $\ln(1+x)$ | $x$ | Definition of the derivative |
| $(1+x)^\alpha - 1$ | $\alpha x$ | Definition of the derivative |
| $\arcsin x$ | $x$ | Inverting $\sin y \sim y$ |

**Feel for continuity and discontinuity in graphs**: the graph of a continuous function can be drawn "in one stroke" without lifting the pen; at a discontinuity the graph breaks. A removable discontinuity is like a pinhole (fill in one point and it is continuous), a jump like a cliff, an infinite discontinuity like a vertical line rushing to infinity, an oscillatory discontinuity like infinitely dense jitter.

A continuous function on a closed interval has four important properties: **boundedness** (it cannot rush to infinity), the **extreme value theorem** (it attains a maximum and a minimum), the **intermediate value theorem** (it takes every intermediate value between two function values), and the **zero theorem** (opposite signs at the ends imply a root inside). These are the standard weapons for proving "the equation has a solution".

## 5. Worked Examples

### Example 1 (basic: proving directly with the $\varepsilon$-$\delta$ definition)

Problem: prove by definition that $\lim\limits_{x \to 2} (2x + 1) = 5$.

Analysis: the routine for $\varepsilon$-$\delta$ proofs is "work backwards, write forwards". First look at the target $|f(x) - A| = |2x + 1 - 5| = 2|x - 2|$; to make $2|x - 2| < \varepsilon$ we need only $|x - 2| < \frac{\varepsilon}{2}$, so $\delta$ should be taken as $\frac{\varepsilon}{2}$.

Solution: for any given $\varepsilon > 0$, take $\delta = \frac{\varepsilon}{2}$. When $0 < |x - 2| < \delta$,

$$|2x + 1 - 5| = 2|x - 2| < 2\delta = \varepsilon$$

Since $\varepsilon$ is arbitrary, by definition $\lim\limits_{x \to 2} (2x + 1) = 5$.

Comments: note three points. (1) The expression for $\delta$ may contain only $\varepsilon$, never $x$. (2) "We need only $|x-2| < \varepsilon/2$" gives a sufficient condition, so $\delta = \frac{\varepsilon}{2}$ is legitimate, and anything smaller is too. (3) The verification must use the direction of the inequality in $0 < |x - x_0| < \delta$, justifying each step.

### Example 2 (intermediate: the correct use of equivalent infinitesimals)

Problem: find $\lim\limits_{x \to 0} \dfrac{\tan x - \sin x}{x^3}$.

Analysis: this is of type $\frac{0}{0}$. Both $\sin x \sim x$ and $\tan x \sim x$ are equivalent infinitesimals, but their difference is of third order in $x$. Replacing directly gives $\frac{x - x}{x^3} = 0$, which erases the higher-order information that determines the limit—equivalent infinitesimals may be substituted only in multiplicative factors. The correct approach is to turn the difference into a product.

Solution: $\tan x - \sin x = \sin x\left(\frac{1}{\cos x} - 1\right) = \frac{\sin x (1 - \cos x)}{\cos x}$. Hence

$$\frac{\tan x - \sin x}{x^3} = \frac{\sin x}{x} \cdot \frac{1 - \cos x}{x^2} \cdot \frac{1}{\cos x}$$

Each of the three factors has a limit: the first important limit gives $\lim \frac{\sin x}{x} = 1$; the equivalent infinitesimal $1 - \cos x \sim \frac{x^2}{2}$ gives $\lim \frac{1 - \cos x}{x^2} = \frac{1}{2}$; and $\lim \frac{1}{\cos x} = 1$. By the product rule for limits,

$$\lim_{x \to 0} \frac{\tan x - \sin x}{x^3} = 1 \cdot \frac{1}{2} \cdot 1 = \frac{1}{2}$$

Comments: this is the standard case of "no equivalent substitution in sums and differences". The usable criterion: if the difference of the two replaced terms is 0, they cancel to higher order, and the higher-order expansion must be kept—exactly the job of Taylor's formula in the next topic.

### Example 3 (advanced: the trap of the $1^\infty$ indeterminate form)

Problem: find $\lim\limits_{x \to 0} (1 + 2x)^{3/\sin x}$.

Analysis: the base $1 + 2x \to 1$ and the exponent $\frac{3}{\sin x} \to \infty$—the typical $1^\infty$ indeterminate form. A base "tending to 1" certainly does not mean the limit is 1 (just as $\left(1 + \frac{1}{n}\right)^n \to e \neq 1$). The standard method is to take logarithms of the whole expression and bring the exponent down.

Solution: let $L = (1 + 2x)^{3/\sin x}$; then

$$\ln L = \frac{3\ln(1 + 2x)}{\sin x}$$

As $x \to 0$, $\ln(1 + 2x) \sim 2x$ and $\sin x \sim x$, so

$$\lim_{x \to 0} \ln L = \lim_{x \to 0} \frac{3 \cdot 2x}{x} = 6$$

The logarithm is continuous, so $L = e^6$, i.e.

$$\lim_{x \to 0} (1 + 2x)^{3/\sin x} = e^6$$

Comments: there are three pitfalls. (1) Not taking logarithms and declaring the limit to be 1 because the base tends to 1. (2) Taking logarithms but staring only at $\ln(1+2x) \sim 2x$ while forgetting to replace $\sin x$ by $x$, and getting stuck. (3) Misremembering the companion form of the second important limit: $\lim (1 + 2x)^{1/x} = e^2$, not $e$, because $\ln(1+2x)^{1/x} = \frac{\ln(1+2x)}{x} \to 2$. There is only one criterion: after taking logarithms everything returns to products and quotients, and the known limits of $\frac{\sin x}{x}$ and $\frac{\ln(1+x)}{x}$ apply.

## 6. Common Errors and Pitfalls

1. **Replacing equivalent infinitesimals in sums.** Wrong: replace $\tan x - \sin x$ by $x - x = 0$. Why wrong: after cancellation the limit is decided by higher-order terms, and substitution throws that information away. Correct: first transform the difference identically into a product (factor out, rationalize, sum-to-product), then replace within multiplicative factors.
2. **Reversing the logical order of $\varepsilon$-$\delta$.** Wrong: "there exists $\varepsilon > 0$ such that for any $\delta > 0$, $|f(x) - A| < \varepsilon$". That is not the definition of a limit but a description of "the limit is not $A$". The correct order is always "for any $\varepsilon > 0$ there exists $\delta > 0$".
3. **Treating "has a limit" as "is continuous".** Wrong: "$f(x) = \frac{\sin x}{x}$ has limit 1 at $x = 0$, so it is continuous". Why wrong: the function is not defined at $x = 0$ to begin with, and continuity requires the function to be defined there and the limit to equal the value. Correct: it becomes continuous only after defining $f(0) = 1$ (a removable discontinuity).
4. **Taking $1^\infty$ for granted.** Wrong: the base tends to 1, so the whole limit is 1. Correct: always take logarithms and reduce to $\frac{0}{0}$ or $\frac{\infty}{\infty}$; remember $(1 + kx)^{m/x} \to e^{km}$.
5. **Ignoring one-sided limits.** Wrong: for $f(x) = \arctan\frac{1}{x}$, simply say the limit as $x \to 0$ is 0. Why wrong: as $x \to 0^+$ the limit is $\frac{\pi}{2}$ and as $x \to 0^-$ it is $-\frac{\pi}{2}$; the two differ, so the limit does not exist. Correct: for piecewise functions, absolute values, and infinite discontinuities, compute both one-sided limits first.
6. **Treating "bounded oscillation" as "having a limit".** Wrong: "$\sin\frac{1}{x}$ lies between $-1$ and $1$, so the limit as $x \to 0$ exists". Why wrong: a limit requires approaching a single constant, whereas $\sin\frac{1}{x}$ swings between $-1$ and $1$ infinitely often; for any $\varepsilon < 1$ the values cannot be confined to a small tube. Correct: evaluate along two different sequences of points to obtain two different limits and thereby disprove existence.

### Example 4 (advanced: the squeeze theorem for sums with a variable number of terms)

Problem: find $\lim\limits_{n\to\infty}\left(\dfrac{1}{n^2+1} + \dfrac{1}{n^2+2} + \cdots + \dfrac{1}{n^2+n}\right)$.

Analysis: this is a sum of $n$ terms whose number grows with $n$, so equivalent infinitesimals cannot be applied directly; use the squeeze theorem to bound it.

Solution: let $S_n$ denote the sum. Each term lies between $\dfrac{1}{n^2+n}$ and $\dfrac{1}{n^2+1}$, and there are $n$ terms, so

$\frac{n}{n^2+n} \le S_n \le \frac{n}{n^2+1}$

that is $\dfrac{1}{n+1} \le S_n \le \dfrac{n}{n^2+1}$. As $n\to\infty$ both ends tend to 0, so by the squeeze theorem $S_n \to 0$.

Comments: the squeeze theorem is made for sums or products whose number of terms varies with $n$—enlarge and shrink to squeeze an intractable sum toward a known limit.

## 7. Summary and Mnemonic

Key points:

- The $\varepsilon$-$\delta$ definition of a limit: for any $\varepsilon > 0$ there is $\delta > 0$ such that $0 < |x - x_0| < \delta$ implies $|f(x) - A| < \varepsilon$. $\varepsilon$ is given first, $\delta$ is found afterwards, and $\delta$ depends only on $\varepsilon$ and the function $f$.
- Two important limits: $\lim\limits_{x \to 0} \frac{\sin x}{x} = 1$ (the pillar of the $\frac{0}{0}$ type); $\lim\limits_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$ (the pillar of the $1^\infty$ type). All variants are the same in essence.
- Equivalent infinitesimals may be substituted only in multiplicative factors; sums and differences must first be turned into products.
- Continuous ⟺ defined + limit exists + the two are equal; discontinuities fall into removable, jump, infinite, and oscillatory types.
- A continuous function on a closed interval is bounded, attains its extrema, and satisfies the intermediate value and zero theorems.

Mnemonic: **"$\varepsilon$ challenges, $\delta$ responds; the deleted neighbourhood is where the trend is read. Products and quotients may be swapped, sums are risky; the three conditions for continuity stay in mind."**`,
  },

  taylor: {
    chapter: 'Chapter 2 Differential Calculus of Functions of One Variable',
    title: 'Taylor Expansion',
    summary:
      'Approximating smooth functions by polynomials: Taylor\'s formula is the universal tool for evaluating limits, numerical approximation, error estimation, and proving inequalities.',
    keyPoints: [
      'Taylor formula = function value + derivative information of all orders, with the order set by the required accuracy',
      'Five Maclaurin expansions to memorize: eˣ, sinx, cosx, ln(1+x), (1+x)^α',
      'The Peano remainder is used for limit estimates, the Lagrange remainder for error bounds and inequalities',
    ],
    content: String.raw`

How does a calculator "know" what $\sin 30.5^\circ$ equals? A computer can only add, subtract, multiply, and divide, yet the sine table has infinitely many decimals. The secret: any sufficiently smooth function can be approximated arbitrarily well locally by a polynomial. The intuitive reason is plain—a polynomial is completely determined by finitely many coefficients, while the behaviour of a smooth function near a point is "encoded" step by step by its value there, its first derivative (how steep), its second derivative (how curved). Assemble this information by order and you get Taylor's formula: approximate the function by a polynomial with finitely many terms, and describe the error of the approximation by the remainder.

The idea is as old as calculus itself; Newton, Gregory, and Taylor obtained the general form in turn, and the precise estimate of the remainder (the Lagrange remainder) upgraded approximation from a hand-computation tool to rigorous mathematics. Today it is a threefold weapon: evaluating limits (expand infinitesimals into polynomials whose order is visible), estimating errors (knowing to how many decimals the approximation is good), and proving inequalities (enlarge a function into a polynomial).

This topic presents the formula at two levels of precision: with the Peano remainder (good for limits) and with the Lagrange remainder (good for error estimates and inequalities), plus the five Maclaurin expansions that must be memorized.

## 2. Rigorous Definitions

**Definition 1 (Taylor formula with Peano remainder)** If $f$ is $n$ times differentiable at $x_0$, then as $x \to x_0$

$$f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + o\big((x - x_0)^n\big)$$

where $o\big((x-x_0)^n\big)$ denotes an infinitesimal of higher order than $(x-x_0)^n$.

**Definition 2 (Taylor formula with Lagrange remainder)** If $f$ is $n+1$ times differentiable on an interval containing $x_0$, then for any $x$ in the interval there exists $\xi$ between $x_0$ and $x$ such that

$$f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \frac{f^{(n+1)}(\xi)}{(n+1)!}(x - x_0)^{n+1}$$

The special case $x_0 = 0$ is called the **Maclaurin formula**. If $f$ is differentiable to all orders and the remainder tends to 0, we obtain the Taylor series (a power series, treated in the topic on infinite series).

**Five Maclaurin expansions to memorize** ($x \to 0$):

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots + \frac{x^n}{n!} + o(x^n)$$

$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots + (-1)^n \frac{x^{2n+1}}{(2n+1)!} + o(x^{2n+2})$$

$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots + (-1)^n \frac{x^{2n}}{(2n)!} + o(x^{2n+1})$$

$$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots + (-1)^{n-1}\frac{x^n}{n} + o(x^n)$$

$$(1+x)^\alpha = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \cdots + \binom{\alpha}{n}x^n + o(x^n)$$

## 3. Why Define It This Way

**Why does the coefficient carry $k!$?** Each differentiation "leaks" one factor from the coefficient of a power; $\frac{1}{k!}$ cancels exactly that, so that "after substituting $x = x_0$ the $k$-th derivative equals $f^{(k)}(x_0)$"—the mechanism of "encoding a function by its derivatives". Think of the polynomial part as the "best replay of the affine data" of $f$ at $x_0$.

**What is the Peano remainder $o\big((x-x_0)^n\big)$?** It describes only the local behaviour as $x \to x_0$: the error tends to 0 faster than $(x-x_0)^n$. It suits "order comparison" (seeing which term dies faster when evaluating limits), but cannot give an error bound "far from $x_0$".

**Why is the Lagrange remainder stronger?** It writes the error as an explicit expression $\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$, which can be estimated globally (for instance when $|f^{(n+1)}| \leq M$) and suits numerical approximation and proving inequalities.

**Counterexample (the condition cannot be dropped)**: $f(x) = x|x|$ has $f(0) = f'(0) = 0$ at $x = 0$, but $f''(0)$ does not exist. The first-order Taylor formula then holds ($x|x| = 0 + 0 \cdot x + o(x)$ since $\frac{|x|x}{x} = |x| \to 0$), but the second-order formula $x|x| = o(x^2)$ fails (since $\frac{|x|x}{x^2}$ oscillates between $\pm 1$ and does not tend to 0). The condition "$n$-times differentiable" is not padding: with too low an order the expansion is simply wrong.

## 4. Intuition and Pictures

**Approximation order by order**: order zero gives a constant (a horizontal line), first order the tangent line, second order a parabola (capturing curvature), third order finer twisting still... each extra order makes the approximation "stick" a little longer near $x_0$.

**Strategy diagram**: when evaluating a limit, expand numerator and denominator separately and look for the "lowest nonzero order"—it is like the end of the balance that tips first, and it determines the limit. The principle: **expand to exactly the lowest order that survives cancellation**. Expanding more is wasteful, expanding less leaves you stuck.

**Feel for the error**: the Peano remainder is a "microscope" (valid only near $x_0$), the Lagrange remainder is a "ruler" (giving an error bound over the whole interval). Choosing the wrong tool is the most common way Taylor calculations crash.

## 5. Worked Examples

### Example 1 (basic: Taylor's formula for a limit)

Problem: find $\lim\limits_{x \to 0} \dfrac{\cos x - 1 + \frac{x^2}{2}}{x^4}$.

Analysis: type $\frac{0}{0}$. In the numerator, expand $\cos x$ to the $x^4$ term; the constant and $x^2$ terms cancel, so we must expand to fourth order—exactly the "expand to the lowest surviving order" strategy.

Solution: $\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} + o(x^4)$; substituting,

$$\frac{\cos x - 1 + \frac{x^2}{2}}{x^4} = \frac{\frac{x^4}{24} + o(x^4)}{x^4} = \frac{1}{24} + o(1)$$

so the limit is $\frac{1}{24}$.

Comments: expanding only to $x^2$ leaves the numerator as $o(x^2)$, still $\frac{0}{0}$ and no way forward. Criterion: combine like terms first, see where the lowest nonzero order appears, and expand to that order.

### Example 2 (intermediate: numerical approximation and error estimate)

Problem: use the Maclaurin formula to compute $\ln 1.1$ with error not exceeding $10^{-4}$.

Analysis: expand $\ln(1+x)$ at $x = 0.1$; this is an alternating series, and the error does not exceed the absolute value of the first omitted term.

Solution: $\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + o(x^4)$. Taking terms up to $x^3$:

$$\ln 1.1 \approx 0.1 - \frac{0.01}{2} + \frac{0.001}{3} = 0.0953333\cdots$$

The absolute value of the first omitted term is $\frac{0.0001}{4} = 0.000025 < 10^{-4}$, meeting the accuracy. (True value $\ln 1.1 \approx 0.0953102$.)

Checking with the Lagrange remainder: $R_3(x) = \frac{f^{(4)}(\xi)}{4!}x^4 = \frac{-6}{24(1+\xi)^4}x^4 = -\frac{x^4}{4(1+\xi)^4}$; for $0 < \xi < x = 0.1$, $|R_3| \leq \frac{0.1^4}{4} = 0.000025$, consistent with the alternating-series estimate.

Comments: a complete answer to a numerical approximation must contain three parts—the expansion, the substitution, and the error estimate. Writing only "$\approx 0.0953$" without an error bound is unacceptable in engineering.

### Example 3 (advanced: the pitfall of the Peano remainder)

Problem: prove that $e^x > 1 + x + \frac{x^2}{2}$ for $x > 0$.

Analysis: using the Peano remainder $e^x = 1 + x + \frac{x^2}{2} + o(x^2)$ gives a conclusion only "for $x$ sufficiently small", and the sign of $o(x^2)$ is unknown, so no comparison of size is possible. The Lagrange remainder must be used, writing the error as an explicit positive term.

Solution: apply Taylor's formula with Lagrange remainder to $f(t) = e^t$ on $[0, x]$ (expanded to second order):

$$e^x = 1 + x + \frac{x^2}{2} + \frac{e^{\xi}}{3!}x^3, \quad 0 < \xi < x$$

Since $e^{\xi} > 0$ and $x^3 > 0$, the error term is strictly positive, so $e^x > 1 + x + \frac{x^2}{2}$ for $x > 0$.

Comments: this example exposes a common misconception: the Peano remainder says only that "the error is a small quantity of order higher than $x^2$"; its sign and size are undetermined, so it cannot be used for inequalities. Whenever size comparisons or error bounds are involved, use the Lagrange remainder (or the integral remainder).

## 6. Common Errors and Pitfalls

1. **Expanding to insufficient order**: seeing $\frac{0}{0}$ and expanding to first order, only to have everything cancel again. Correct: combine like terms in the numerator first, estimate the lowest nonzero order, then decide the order of expansion.
2. **Choosing the wrong remainder type**: proving an inequality with the Peano remainder. Correct: Lagrange remainder for inequalities and error bounds; Peano remainder for limits and order comparison.
3. **Misremembering Maclaurin coefficients**: $\sin x$ has no $x^2$ term and $\cos x$ no $x$ term; the binomial coefficient of $(1+x)^\alpha$ is $\frac{\alpha(\alpha-1)}{2}$, not $\frac{\alpha}{2}$; the coefficients of $\ln(1+x)$ are $\frac{1}{k}$ with alternating signs.
4. **Substituting outside the interval of convergence**: the expansion of $(1+x)^\alpha$ is valid only for $|x| < 1$, and so is that of $\ln(1+x)$; $e^x$ converges everywhere. Substituting outside the interval (for instance taking $x = 2$ to compute $\ln 3$) yields a divergent series.
5. **Forgetting the position of $x_0$**: when expanding at a nonzero point the base of the powers is $(x - x_0)$, not $x$, and the remainder is $o\big((x-x_0)^n\big)$; a single translation avoids this trap.
6. **Thinking the remainder can be dropped at will**: "$o(x^3)$ is small, so ignore it" is legitimate only in multiplicative factors; in sums its sign is undetermined and the conclusion may be overturned.

### Example 4 (advanced: high-order derivatives from Taylor coefficients)

Problem: let $f(x) = e^{x^2}$; find $f^{(10)}(0)$.

Analysis: differentiating ten times directly is highly error-prone; expand into a Maclaurin series and compare the coefficient of $x^{10}$.

Solution: $e^t = \sum\limits_{k=0}^{\infty}\dfrac{t^k}{k!}$; substituting $t = x^2$ gives

$e^{x^2} = \sum_{k=0}^{\infty}\frac{x^{2k}}{k!}$

The $x^{10}$ term occurs at $k=5$ with coefficient $\dfrac{1}{5!}$. Taylor's formula requires the coefficient of $x^{10}$ to be $\dfrac{f^{(10)}(0)}{10!}$, hence

$f^{(10)}(0) = 10!\cdot\frac{1}{5!} = \frac{3628800}{120} = 30240$

Comments: going from derivatives to the expansion is easy; going backwards from the expansion to high-order derivatives is harder—the Taylor series turns that hard problem into "reading coefficients", a hundred times less work than differentiating by brute force.

## 7. Summary and Mnemonic

Key points:

- Taylor's formula = a polynomial with finitely many terms + a remainder; the coefficients are $\frac{f^{(k)}(x_0)}{k!}$, i.e. "encoding the function by its derivatives".
- The Peano remainder handles "local order comparison" (limits); the Lagrange remainder handles "global estimates" (errors, inequalities).
- Five Maclaurin expansions to memorize: $e^x$, $\sin x$, $\cos x$, $\ln(1+x)$, $(1+x)^\alpha$.
- Strategy: for limits, expand to the lowest order surviving cancellation; for inequalities, expand and fix the sign with the Lagrange remainder.

Mnemonic: **"Derivatives encode a polynomial; expand until cancellation stops; Peano compares order, Lagrange fixes sign; never forget to shift $x_0$."**`,
  },

  integrals: {
    chapter: 'Chapter 3 Integral Calculus of Functions of One Variable',
    title: 'Indefinite and Definite Integrals',
    summary:
      'The fundamental theorem of calculus links differentiation and integration; substitution and integration by parts are the two keys to computation.',
    keyPoints: [
      'Newton–Leibniz formula: the definite integral equals the increment of an antiderivative',
      'Substitution requires changing the limits (definite integrals); for integration by parts choose u by "inverse, log, power, exponential, trig"',
      'On a symmetric interval check parity first—it can halve the work',
    ],
    content: String.raw`

The area of a rectangle is base times height and the area of a triangle is half base times height—both are formulas for "straight-sided" figures. But what is the area of the "curvilinear trapezoid" bounded by the parabola $y = x^2$ and the $x$-axis between $[0, 1]$? All straight-sided formulas fail. Archimedes computed such problems by exhaustion, but the method was clumsy and had to be redesigned for every case. In the seventeenth century Newton and Leibniz discovered an astonishing passage: the area of a curvilinear figure and "the inverse operation of differentiation" are the same thing. This is the fundamental theorem of calculus—it translates a geometric problem (area) into an algebraic one (finding an antiderivative), and overnight nearly every area problem had a unified solution.

The entrance to this passage is the indefinite integral. If "given distance, find velocity" is differentiation, then "given velocity, find distance" is its inverse—the indefinite integral. The exit is the definite integral: a "numerical area" with upper and lower limits, and the Newton–Leibniz formula sews the two together: the value of the definite integral = the antiderivative at the upper limit minus that at the lower limit. Once the theory is in place the rest is craft: substitution and integration by parts are the two most used screwdrivers.

This topic first establishes the concepts of the indefinite and definite integral, then trains the three main techniques—substitution, integration by parts, and partial fractions—and finally treats properties special to definite integrals (symmetry, sign preservation, the mean value theorem for integrals).

## 2. Rigorous Definitions

**Definition 1 (antiderivative)** If $F'(x) = f(x)$ on an interval $I$, then $F$ is called an antiderivative of $f$ on $I$.

**Definition 2 (indefinite integral)** The set of all antiderivatives of $f$ is called the indefinite integral of $f$, written

$$\int f(x)\,\mathrm{d}x = F(x) + C$$

where $C$ is an arbitrary constant. Any two antiderivatives of the same function differ by a constant, so $+C$ is not decoration but part of the definition.

**Definition 3 (definite integral)** Let $f$ be bounded on $[a, b]$. Insert points $a = x_0 < x_1 < \cdots < x_n = b$ arbitrarily, let $\Delta x_i = x_i - x_{i-1}$, $\lambda = \max \Delta x_i$, and choose $\xi_i \in [x_{i-1}, x_i]$ to form the Riemann sum $\sum f(\xi_i)\Delta x_i$. If as $\lambda \to 0$ this sum has a limit independent of the partition and the choices, then $f$ is integrable on $[a, b]$ and the limit is called the definite integral:

$$\int_a^b f(x)\,\mathrm{d}x = \lim_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i)\,\Delta x_i$$

A continuous function is always integrable.

**Theorem (Newton–Leibniz formula)** If $f$ is continuous on $[a, b]$ and $F$ is any antiderivative of $f$, then

$$\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a)$$

**Substitution formula for definite integrals** Let $x = \varphi(t)$ be differentiable on $[\alpha, \beta]$ with $\varphi'(t)$ continuous, $\varphi(\alpha) = a$, $\varphi(\beta) = b$; then

$$\int_a^b f(x)\,\mathrm{d}x = \int_{\alpha}^{\beta} f\big(\varphi(t)\big)\,\varphi'(t)\,\mathrm{d}t$$

**Integration by parts for definite integrals**:

$$\int_a^b u\,\mathrm{d}v = \big[uv\big]_a^b - \int_a^b v\,\mathrm{d}u$$

**Properties of the definite integral**:

- Linearity: $\int_a^b (kf \pm lg) = k\int_a^b f \pm l\int_a^b g$;
- Additivity over intervals: $\int_a^b = \int_a^c + \int_c^b$ (any $c$);
- Sign preservation: $f \geq 0 \Rightarrow \int_a^b f \geq 0$; more generally $f \leq g \Rightarrow \int_a^b f \leq \int_a^b g$;
- Parity on symmetric intervals: $f$ odd $\Rightarrow \int_{-a}^{a} f = 0$; $f$ even $\Rightarrow \int_{-a}^{a} f = 2\int_0^a f$;
- Mean value theorem for integrals: a continuous $f$ satisfies $\int_a^b f(x)\,\mathrm{d}x = f(\xi)(b-a)$ for some $\xi \in [a, b]$.

## 3. Why Define It This Way

**Why are there infinitely many antiderivatives?** Differentiation "erases" constant information—the derivative of any constant is 0—so the inverse operation must restore the lost constant; that is where $+C$ comes from. Forgetting $+C$ is the most common beginner's error.

**Why is the Newton–Leibniz formula astonishing?** It says that "an infinitely refined summation process" (analysis) equals "subtracting two function values" (algebra). Without it every definite integral would have to start from partitioning, summing, and taking limits. The formula turns integral calculus from a "technique" into a "method"; it is the hub of the whole subject.

**Why must substitution "change the limits"?** In a definite integral the variable is a dummy—the value depends only on the interval and the integrand, not on the name of the variable. After substitution the interval must be changed to the range of the new variable, or you compute a different integral.

**Why is the choice of $u$ in integration by parts important?** $\int u\,\mathrm{d}v$ shifts the difficulty: "hard-to-integrate $v$" becomes "easy", while "easy-to-differentiate $u$" may become "hard" in $u'v$. The principle is to put in $u$ whatever simplifies on differentiation, summarized as "inverse, log, power, exponential, trig" (inverse trigonometric, logarithmic, power, exponential, trigonometric—earlier ones are preferred as $u$).

**Counterexample (the condition cannot be dropped)**: the Newton–Leibniz formula requires $f$ continuous (or integrable with the corresponding conditions) on $[a, b]$. Counterexample: "applying the formula" to $f(x) = \frac{1}{x^2}$ on $[-1, 1]$ gives $\left[-\frac{1}{x}\right]_{-1}^{1} = -2$. But $f > 0$, and a definite integral, if it exists, must be non-negative—the contradiction exposes the error: $f$ is unbounded at $x = 0$ and is not a proper integrable function, so the formula fails.

## 4. Intuition and Pictures

**From Riemann sums to the definite integral**: cut $[a, b]$ into thin strips, erect a small rectangle of height $f(\xi_i)$ on each; the sum of the rectangle areas approximates the area of the curvilinear trapezoid; the thinner the strips the better, and the limit is the definite integral. The elongated $\int$ is precisely the letter S of "Sum".

**Indefinite vs definite integral**: the indefinite integral is a "family of functions" (a family of parallel curves differing by a vertical shift); the definite integral is a "number" (an area, a total). The Newton–Leibniz formula is the bridge between the family and the number.

**Picture of integration by parts**: $\int u\,\mathrm{d}v = uv - \int v\,\mathrm{d}u$ amounts to integrating the "region" in the other direction; the difference of the two areas cancels exactly.

**Feel for symmetry**: an odd function has "positive and negative areas cancelling" on a symmetric interval, giving 0 directly; an even function is "mirror-symmetric left to right", so compute half and double it. These are free marks; always check before an exam.

## 5. Worked Examples

### Example 1 (basic: integration by parts)

Problem: find the indefinite integral $\displaystyle\int x e^x\,\mathrm{d}x$.

Analysis: the integrand is "power $\times$ exponential"; by "inverse, log, power, exponential, trig" choose $u = x$ (power comes first) and $\mathrm{d}v = e^x\,\mathrm{d}x$.

Solution:

$$\int x e^x\,\mathrm{d}x = \int x\,\mathrm{d}(e^x) = x e^x - \int e^x\,\mathrm{d}x = x e^x - e^x + C$$

Check: differentiating $(x-1)e^x$ gives $e^x + (x-1)e^x = x e^x$, recovering the integrand—correct.

Comments: what if the choice is reversed? With $u = e^x$, $\mathrm{d}v = x\,\mathrm{d}x$ we get $\int x e^x = \frac{x^2}{2}e^x - \int \frac{x^2}{2}e^x\,\mathrm{d}x$: the power goes up and we move further away. Here the mnemonic for choosing $u$ is the compass.

### Example 2 (intermediate: substitution must change the limits)

Problem: compute $\displaystyle\int_0^a \sqrt{a^2 - x^2}\,\mathrm{d}x$ ($a > 0$).

Analysis: let $x = a\sin t$; then $\sqrt{a^2 - x^2} = a\cos t$ (restricting $t \in [0, \frac{\pi}{2}]$ ensures $\cos t \geq 0$ so the square root is correct) and $\mathrm{d}x = a\cos t\,\mathrm{d}t$; $x = 0$ gives $t = 0$, and $x = a$ gives $t = \frac{\pi}{2}$.

Solution:

$$\int_0^a \sqrt{a^2 - x^2}\,\mathrm{d}x = \int_0^{\pi/2} a\cos t \cdot a\cos t\,\mathrm{d}t = a^2\int_0^{\pi/2}\cos^2 t\,\mathrm{d}t$$

Using $\cos^2 t = \frac{1 + \cos 2t}{2}$:

$$= a^2 \cdot \frac{1}{2}\left[t + \frac{\sin 2t}{2}\right]_0^{\pi/2} = \frac{\pi a^2}{4}$$

Geometric meaning: this is the area of a quarter circle of radius $a$; the answer is self-consistent.

Comments: substitution involves three things—replace the integrand, replace the differential, replace the limits; none may be omitted. The new variable must keep the sign of the square root correct, so restricting the range of $t$ is not an optional step.

### Example 3 (advanced: the limits of validity of the Newton–Leibniz formula)

Problem: decide whether $\displaystyle\int_{-1}^{1} \frac{1}{x^2}\,\mathrm{d}x$ may be computed as $\left[-\frac{1}{x}\right]_{-1}^{1} = -2$.

Analysis: the integrand is unbounded at $x = 0$ (an infinite discontinuity) and is not continuous on $[-1, 1]$. The property "the integral of a non-negative function is non-negative" contradicts the computed $-2$, exposing the error at once.

Solution: it may not. The Newton–Leibniz formula requires the integrand to be continuous on the closed interval. Here $f(x) = \frac{1}{x^2}$ tends to $+\infty$ at $x = 0$; this is an improper integral, which must be split into $\int_{-1}^{0} + \int_{0}^{1}$ and treated separately: both diverge to $+\infty$, so the original integral diverges and the finite value $-2$ simply does not exist.

Comments: the general way to spot this trap is "first check whether the integrand has a break or an infinite point inside the interval, then apply the formula". The negative value obtained by formal application is itself the alarm: the proper integral of a positive function cannot be negative.

## 6. Common Errors and Pitfalls

1. **Forgetting $+C$ in the indefinite integral**: $\int 2x\,\mathrm{d}x = x^2$ is a common slip; dropping the arbitrary constant removes half the answer. When solving a concrete inverse problem, determine $C$ from the initial condition.
2. **Forgetting to change the limits after substitution**: if $\int_0^a \sqrt{a^2-x^2}\,\mathrm{d}x$ is changed to $\sin t$ but still written as $\int_0^a$, the interval and the integrand do not match.
3. **Reversing $u$ and $\mathrm{d}v$ in integration by parts**: choosing $u = e^x$, $\mathrm{d}v = x\,\mathrm{d}x$ for $\int x e^x\,\mathrm{d}x$ leads to the more complicated $\int x^2 e^x$. Use "inverse, log, power, exponential, trig".
4. **Incomplete first-kind substitution (differential matching)**: writing $\int \sin 2x\,\mathrm{d}x$ as $-\cos 2x + C$ forgets the inner derivative 2; the correct result is $-\frac{1}{2}\cos 2x + C$. Differentiate to check.
5. **Not checking parity on symmetric intervals**: computing $\int_{-\pi/2}^{\pi/2} x\cos x\,\mathrm{d}x$ laboriously, when it is an odd function and the integral is 0 at once.
6. **Treating the $\xi$ of the mean value theorem as computable**: $\xi$ is only guaranteed to exist and its position is usually not obtainable; you cannot casually write $\xi = \frac{a+b}{2}$.

### Example 4 (advanced: partial fractions of a rational function)

Problem: find the indefinite integral $\displaystyle\int \frac{1}{x^2-1}\,\mathrm{d}x$.

Analysis: the integrand is a proper rational fraction; decompose it by partial fractions into a difference of two simple fractions.

Solution: since $x^2-1 = (x-1)(x+1)$, set

$\frac{1}{x^2-1} = \frac{A}{x-1} + \frac{B}{x+1}$

Clearing denominators gives $1 = A(x+1) + B(x-1)$. Setting $x=1$ gives $A = \frac{1}{2}$; setting $x=-1$ gives $B = -\frac{1}{2}$. Hence

$\int \frac{1}{x^2-1}\,\mathrm{d}x = \frac{1}{2}\int\frac{1}{x-1}\,\mathrm{d}x - \frac{1}{2}\int\frac{1}{x+1}\,\mathrm{d}x = \frac{1}{2}\ln|x-1| - \frac{1}{2}\ln|x+1| + C$

that is $\dfrac{1}{2}\ln\left|\dfrac{x-1}{x+1}\right| + C$.

Comments: partial fractions is the general method for integrating rational functions: factor the denominator and fit coefficients for linear factors, repeated factors, and quadratic factors, reducing everything to $\ln$ and $\arctan$.

## 7. Summary and Mnemonic

Key points:

- Indefinite integral = all antiderivatives (with $+C$); definite integral = limit of Riemann sums = $F(b) - F(a)$.
- Three techniques: matching differentials (first-kind substitution), variable substitution (second-kind substitution, change the limits), integration by parts ("inverse, log, power, exponential, trig").
- Properties of definite integrals: linearity, additivity, sign preservation, parity symmetry, mean value theorem.
- Before applying a formula, check: is it continuous? is the interval right? have the limits been changed?

Mnemonic: **"Indefinite gets $+C$, definite uses Newton–Leibniz; substitution changes limits, parts put inverse functions first; odd functions vanish on symmetric intervals, and a positive function never integrates negative."**`,
  },

  derivatives: {
    chapter: 'Chapter 2 Differential Calculus of Functions of One Variable',
    title: 'Derivatives and Differentials',
    summary:
      'The derivative is the limit of a difference quotient: tangent slope, instantaneous velocity, and rate of change are three faces of one thing; the arithmetic rules and the chain rule cover every elementary function.',
    keyPoints: [
      'Definition: the limit of a difference quotient; geometrically the tangent slope, physically the instantaneous velocity',
      'Differentiable implies continuous, but continuous need not be differentiable (corner points)',
      'Arithmetic rules + chain rule + derivative of the inverse function',
      'The differential dy = f′(x)dx is the linear principal part of the increment, giving the linear approximation',
    ],
    content: String.raw`

Seventeenth-century Europe was full of pressing technical problems: at what speed must a cannonball leave the muzzle to trace that fateful parabola? In which direction is a planet "currently" moving at any instant? These share one mathematical core: how to find "how fast a quantity changes at an instant". The average rate of change is easy—displacement divided by time; but "an instant" has zero duration, and 0 divided by 0 is undefined. The solution of Newton and Leibniz, later written as the derivative, was: first compute the average rate over a short interval, then let the interval shrink without bound and see which number the average approaches. That number is the instantaneous rate of change.

The same idea is geometrically the tangent. The tangent to a circle can be defined as "perpendicular to the radius", but how should the tangent to an arbitrary curve—say the parabola $y = x^2$—at a point be defined? Similarly: take two points on the curve and join them by a secant, then let one point slide along the curve toward the other. The secant "rotates" to a limiting position; that position is the tangent and its slope is the derivative. Geometry (tangent slope), physics (instantaneous velocity), and economics (marginal cost) all land on the same definition, which shows that the derivative has grasped something essential.

This topic covers four things: the rigorous definition of the derivative, why "differentiable" is stronger than "continuous", how to use the arithmetic rules and the chain rule, and why "differential"—which looks brand new—is only another way of bookkeeping the derivative.

## 2. Rigorous Definitions

**Definition 1 (derivative)** Let $f$ be defined in a neighbourhood of $x_0$. If the limit

$$\lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$$

exists, then $f$ is **differentiable** at $x_0$ and the limit is the **derivative** of $f$ at $x_0$, written $f'(x_0)$ or $\left.\frac{dy}{dx}\right|_{x = x_0}$. The fraction above is called the **difference quotient** (average rate of change); the derivative is its limit (instantaneous rate of change). Equivalent form: $\lim\limits_{x \to x_0} \dfrac{f(x) - f(x_0)}{x - x_0}$.

**Definition 2 (one-sided derivatives)** The left derivative $f'_-(x_0) = \lim\limits_{\Delta x \to 0^-} \dfrac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$ and the right derivative $f'_+(x_0) = \lim\limits_{\Delta x \to 0^+} \dfrac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$. Then $f$ is differentiable at $x_0$ $\iff$ both one-sided derivatives exist and are equal.

**Definition 3 (differential)** Let $\Delta y = f(x_0 + \Delta x) - f(x_0)$. If there is a constant $A$ such that

$$\Delta y = A\,\Delta x + o(\Delta x) \quad (\Delta x \to 0)$$

then $f$ is **differentiable in the sense of the differential** at $x_0$, and $A\,\Delta x$ is called the differential of $f$ at $x_0$, written $\mathrm{d}y = A\,\mathrm{d}x$ (with $\mathrm{d}x = \Delta x$).

**Theorem 1** Differentiable $\Longrightarrow$ continuous. The converse fails.

**Theorem 2 (functions of one variable)** Differentiable in the differential sense $\iff$ differentiable, and $A = f'(x_0)$, i.e. $\mathrm{d}y = f'(x_0)\,\mathrm{d}x$.

**Rules of differentiation** (for differentiable $u, v$):

- Sums, products, quotients: $(u \pm v)' = u' \pm v'$, $(uv)' = u'v + uv'$, $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$ ($v \neq 0$);
- Chain rule: for $y = f(u)$, $u = g(x)$, $\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}y}{\mathrm{d}u} \cdot \frac{\mathrm{d}u}{\mathrm{d}x} = f'(g(x))\,g'(x)$;
- Inverse function: $(f^{-1})'(y) = \frac{1}{f'(x)}$, where $y = f(x)$ and $f'(x) \neq 0$.

**Higher derivatives**: $f^{(n)}(x) = \left(f^{(n-1)}\right)'(x)$, with the second derivative written $f''(x)$. Mechanically $s''(t)$ is acceleration; geometrically $f''$ describes concavity.

## 3. Why Define It This Way

**Why is the denominator of the difference quotient $\Delta x$?** Because "average rate of change" is by definition "change in the function divided by change in the variable". Replacing $\Delta x$ by something else (say $(\Delta x)^2$) would break the dimensions: a rate must be "per unit of the variable".

**Why must "the limit exists" agree from both sides?** A one-sided derivative corresponds to a one-sided average rate, and different directions can give different values. Counterexample: $f(x) = |x|$ at $x = 0$ has secant slope $-1$ on the left and $+1$ on the right; the one-sided derivatives differ, so it is not differentiable. This is the algebraic signature of a "corner".

**Why does differentiability imply continuity?** The difference quotient has a limit while the denominator $\Delta x \to 0$; the numerator $f(x_0 + \Delta x) - f(x_0)$ must then tend to 0, otherwise the quotient would be unbounded and could not have a finite limit. In other words, differentiability "forces" continuity at the point.

**Why does continuity not imply differentiability?** Continuity only requires "no jump"; differentiability also requires "approach with the same slope from each side". $|x|$ is continuous at 0, but the left and right slopes are $-1$ and $+1$. There are even functions that are continuous everywhere and differentiable nowhere (the Weierstrass function, met in mathematical analysis).

**Why is $o(\Delta x)$ the key in the definition of the differential?** It says the error is of higher order than $\Delta x$, which is exactly the meaning of "replace the curve locally by a line": the true increment $\Delta y$ (the curve) and the linear increment $\mathrm{d}y$ (the tangent) differ only by a higher-order small quantity. Without $o(\Delta x)$ any "linear part" could call itself a differential, and the definition would lose its discriminating power.

## 4. Intuition and Pictures

**From secant to tangent**: the secant is "the chord joining two points", the tangent "the direction that touches only one point". As the moving point slides toward the fixed one, the limit of the secant slope is the tangent slope—the derivative is both a limit value and the tilt of that tangent.

**Sign of the derivative and rise/fall**: where $f'(x) > 0$ the tangent points upward and the function rises; where $f'(x) < 0$ it falls; where $f'(x) = 0$ the tangent is horizontal (a stationary point, possibly a peak, a valley, or a plateau). The rigorous argument belongs to the next topic on the mean value theorem, but build the intuition from the graph first.

**Differential vs increment**: $\Delta y$ is "the path actually travelled", $\mathrm{d}y$ is "the straight distance along the tangent". The two nearly coincide when $\Delta x$ is small, and the difference is $o(\Delta x)$.

**Linear approximation formula**:

$$f(x_0 + \Delta x) \approx f(x_0) + f'(x_0)\,\Delta x$$

It is a rearrangement of the definition of the differential, and the starting point of approximate computation and numerical methods.

**Feel for the second derivative**: the first derivative says "how steep the slope is", the second says "whether the slope is getting steeper or flatter"—the boundary between concave (cup opening upward, $f'' > 0$) and convex (cup opening downward, $f'' < 0$).

## 5. Worked Examples

### Example 1 (basic: differentiating from the definition)

Problem: use the definition to find the derivative of $f(x) = \frac{1}{x}$ ($x \neq 0$), and compute $f'(2)$.

Analysis: substitute into the difference quotient, clear denominators to cancel $\Delta x$, then take the limit. Note that $x$ and $\Delta x$ are tied together; $\Delta x$ cannot be set to 0 prematurely.

Solution: for $x \neq 0$,

$$\frac{f(x + \Delta x) - f(x)}{\Delta x} = \frac{\frac{1}{x + \Delta x} - \frac{1}{x}}{\Delta x} = \frac{x - (x + \Delta x)}{x(x + \Delta x)\,\Delta x} = \frac{-1}{x(x + \Delta x)}$$

Letting $\Delta x \to 0$,

$$f'(x) = -\frac{1}{x^2}, \qquad f'(2) = -\frac{1}{4}$$

Comments: this is the standard treatment of a $\frac{0}{0}$ indeterminate form—simplify before taking the limit. Check against a table of derivatives.

### Example 2 (intermediate: chain rule and linear approximation)

Problem: (1) find the derivative of $y = \ln(\sin(x^2 + 1))$; (2) approximate $\sqrt{1.05}$ with a differential.

Analysis: (1) the function is a three-layer composition: $\ln$ applied to $\sin$ applied to $x^2 + 1$; differentiate layer by layer from outside in and multiply. (2) take $f(x) = \sqrt{x}$ and use the linear approximation at $x_0 = 1$.

Solution: (1) by the chain rule

$$\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{1}{\sin(x^2 + 1)} \cdot \cos(x^2 + 1) \cdot 2x = 2x\cot(x^2 + 1)$$

(2) $f(x) = \sqrt{x}$, $f'(x) = \frac{1}{2\sqrt{x}}$, $f'(1) = \frac{1}{2}$. With $\Delta x = 0.05$:

$$f(1.05) \approx f(1) + f'(1)\,\Delta x = 1 + \frac{1}{2} \times 0.05 = 1.025$$

Comments: the true value of $\sqrt{1.05}$ is about $1.024695$, an error of about $0.0003$—amply good for everyday estimates. The essence of the linear approximation is "replace the curve by its tangent over a small range"; the smaller $\Delta x$ the better, and the error is of second order in $\Delta x$. A tip for not missing layers in the chain rule: each composition adds a factor; draw a "variable relation diagram" and count the paths from outside in.

### Example 3 (advanced: differentiability versus continuity)

Problem: discuss the continuity and differentiability of $f(x) = |x|$ and $g(x) = x|x|$ at $x = 0$.

Analysis: both functions have different expressions on the two sides of 0, so the one-sided difference quotients must be computed separately.

Solution: for $f(x) = |x|$:

$$\lim_{x \to 0^+} \frac{|x| - 0}{x} = 1, \qquad \lim_{x \to 0^-} \frac{|x| - 0}{x} = -1$$

The one-sided derivatives differ, so $f$ is not differentiable at 0; but $|x| \to 0 = f(0)$, so it is continuous—the typical "continuous but not differentiable" corner.

For $g(x) = x|x|$: $g(x) = x^2$ for $x > 0$ and $g(x) = -x^2$ for $x < 0$.

$$\frac{g(0 + \Delta x) - g(0)}{\Delta x} = \frac{\Delta x\,|\Delta x|}{\Delta x} = |\Delta x| \to 0$$

so $g'(0) = 0$ and $g$ is differentiable at 0.

Comments: the trap is to treat "continuous but not differentiable" as the exclusive property of $|x|$. In fact multiplying the "corner" of $|x|$ by $x$ smooths it out—both one-sided derivatives become 0. The only reliable tool for differentiability is whether the one-sided derivatives exist and are equal, not whether the graph "looks smooth".

## 6. Common Errors and Pitfalls

1. **Writing $(uv)'$ as $u'v'$.** Why wrong: a derivative is not a pointwise product but a limit of "sums of changes". Correct: $(uv)' = u'v + uv'$.
2. **Forgetting to square the denominator in the quotient rule, or reversing the subtraction**: $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$; writing $u'v - v'u$ or omitting $v^2$ are frequent errors, and the reversed order flips the sign.
3. **Missing a layer of the chain rule**: for $y = \ln(\sin(x^2+1))$ writing only $\frac{1}{\sin(x^2+1)} \cdot \cos(x^2+1)$ and omitting the innermost $2x$. Each composition adds a factor: "outside in, multiply layer by layer".
4. **Treating "defined" as "differentiable"**: $f(x) = |x|$ is defined and continuous at 0 yet not differentiable. Differentiability is stronger than continuity; the implication is "differentiable $\Rightarrow$ continuous", not the reverse.
5. **Using the wrong point in the inverse-function derivative**: $(f^{-1})'(y) = \frac{1}{f'(x)}$ where $x = f^{-1}(y)$—the $f'$ in the denominator is evaluated at the preimage $x$, not at $y$. Writing $f'(y)$ there is a classic error.
6. **Using the linear approximation over a wide range**: $\Delta y = \mathrm{d}y + o(\Delta x)$ holds only for small $\Delta x$. Approximating $\sqrt{1.05}$ with the tangent is fine; approximating $\sqrt{400}$ that way is absurd—approximation presupposes "local".

### Example 4 (advanced: implicit differentiation)

Problem: find the derivative $y'$ of the function $y = y(x)$ defined by $x^2 + y^2 = 1$.

Analysis: $y$ is not given explicitly; use implicit differentiation—differentiate both sides with respect to $x$, treating $y$ as a function of $x$.

Solution: differentiate both sides with respect to $x$:

$2x + 2y\,y' = 0 \quad\Rightarrow\quad y' = -\frac{x}{y}$

(valid for $y\neq 0$; at $y=0$ the tangent is vertical and the derivative does not exist.)

Comments: the recipe for implicit differentiation is "differentiate both sides with respect to $x$, and multiply by $y'$ whenever $y$ appears". It avoids solving explicitly for $y$ and suits cases where that is impossible. Logarithmic differentiation (take logarithms first, then differentiate) is a close relative, made for power-exponential functions $u(x)^{v(x)}$.

## 7. Summary and Mnemonic

Key points:

- Derivative = limit of the difference quotient = tangent slope = instantaneous rate of change: three identities in one.
- Differentiable $\Rightarrow$ continuous, but continuity need not give differentiability (the corner of $|x|$); for functions of one variable, differentiability and having a differential are equivalent.
- Arithmetic rules, the chain rule, and the inverse-function rule cover every elementary function.
- The differential $\mathrm{d}y = f'(x)\,\mathrm{d}x$ is the linear principal part of the increment; $\Delta y \approx \mathrm{d}y$ gives the linear approximation.
- Higher derivatives are "derivatives of derivatives": acceleration, concavity.

Mnemonic: **"Take the limit of the quotient, the secant becomes the tangent; differentiable means continuous, corners are not; the chain runs outside in, the differential straightens the curve."**`,
  },

  'mean-value-theorem': {
    chapter: 'Chapter 2 Differential Calculus of Functions of One Variable',
    title: 'Mean Value Theorems and Their Applications',
    summary:
      'The three mean value theorems—Rolle, Lagrange, Cauchy—are the hub of differential calculus: monotonicity, extrema, inequality proofs, and L\'Hôpital\'s rule all follow from them.',
    keyPoints: [
      'Rolle: equal endpoint values ⟹ a horizontal tangent inside; all three conditions are indispensable',
      'Lagrange: f(b)−f(a) = f′(ξ)(b−a), linking the average with the instantaneous',
      'L\'Hôpital\'s rule applies only to 0/0 and ∞/∞, and is a sufficient, not a necessary, condition',
      'Monotonicity from the sign of f′; extrema by the first or second derivative test; for closed-interval extrema do not forget the endpoints',
    ],
    content: String.raw`

On a motorway you drive 120 km in two hours, an average of 60 km/h. Without radar, a traffic officer can still assert that at some instant your speedometer read exactly 60 km/h. This is not luck but a mathematical theorem—for if you had been faster than 60 at every instant you would have covered more than 120 km in two hours, and if slower at every instant you could not have covered 120 km. The bridge that rigorously links "average" and "instantaneous" is the Lagrange mean value theorem, the central station of the whole of differential calculus: monotonicity, extrema, concavity, inequality proofs, and L'Hôpital's rule all depart from here.

The idea generalizes: there is also a correspondence between the "average ratios" of two functions (Cauchy's mean value theorem), and its special case—equal endpoint values force a horizontal tangent inside (Rolle's theorem)—has a beautiful geometric picture. L'Hôpital's rule is the most famous by-product: when two functions both tend to 0 at a point, the limit of their ratio can be converted into the ratio of derivatives, turning a $\frac{0}{0}$ indeterminate form into a computation.

This topic builds the three theorems in the order "Rolle $\to$ Lagrange $\to$ Cauchy", then uses them on four classes of problems: proving identities and inequalities, deciding monotonicity, finding extrema, and simplifying limits (L'Hôpital's rule).

## 2. Rigorous Definitions

**Theorem 1 (Rolle's theorem)** If $f$ satisfies: (1) continuous on the closed interval $[a, b]$; (2) differentiable on the open interval $(a, b)$; (3) $f(a) = f(b)$; then there is at least one point $\xi \in (a, b)$ with $f'(\xi) = 0$.

**Theorem 2 (Lagrange mean value theorem)** If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there is at least one point $\xi \in (a, b)$ such that

$$f(b) - f(a) = f'(\xi)(b - a)$$

that is $\dfrac{f(b) - f(a)}{b - a} = f'(\xi)$: the secant slope equals the tangent slope somewhere. Equivalent form (finite increment formula): $f(x_0 + \Delta x) - f(x_0) = f'(x_0 + \theta\Delta x)\,\Delta x$ with $0 < \theta < 1$.

**Theorem 3 (Cauchy mean value theorem)** If $f, g$ are continuous on $[a, b]$ and differentiable on $(a, b)$ with $g'(x) \neq 0$ (hence $g(b) \neq g(a)$), then there is at least one point $\xi \in (a, b)$ such that

$$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(\xi)}{g'(\xi)}$$

Geometrically: the chord slope of the parametric curve $(g(t), f(t))$ equals the tangent slope at some point.

**Theorem 4 (L'Hôpital's rule, $\frac{0}{0}$ type)** Suppose: (1) $\lim\limits_{x \to x_0} f(x) = \lim\limits_{x \to x_0} g(x) = 0$; (2) $f, g$ are differentiable in a deleted neighbourhood of $x_0$ with $g'(x) \neq 0$; (3) $\lim\limits_{x \to x_0} \frac{f'(x)}{g'(x)}$ exists (or is infinite); then $\lim\limits_{x \to x_0} \frac{f(x)}{g(x)} = \lim\limits_{x \to x_0} \frac{f'(x)}{g'(x)}$.

**Theorem 5 (L'Hôpital's rule, $\frac{\infty}{\infty}$ type)** Change condition (1) to "both tend to infinity"; the rest and the conclusion are the same.

**Corollary 1 (monotonicity test)** Let $f$ be differentiable on an interval $I$. If $f'(x) > 0$ for $x \in I$, then $f$ is strictly increasing on $I$; if $f'(x) < 0$, strictly decreasing.

**Corollary 2 (first derivative test for extrema)** Let $f$ be continuous at $x_0$ and differentiable on both sides. If $f'$ is positive on the left of $x_0$ and negative on the right, $x_0$ is a local maximum; if negative then positive, a local minimum; if the sign does not change, it is not an extremum.

**Corollary 3 (second derivative test)** Suppose $f'(x_0) = 0$ and $f''(x_0)$ exists. If $f''(x_0) < 0$ then $x_0$ is a local maximum; if $f''(x_0) > 0$, a local minimum; if $f''(x_0) = 0$ the test is inconclusive.

**Corollary 4 (concavity and inflection points)** Where $f'' > 0$ the curve is concave up; where $f'' < 0$ it is concave down; a continuity point where $f''$ changes sign is an inflection point.

## 3. Why Define It This Way

**Why are Rolle's three conditions indispensable?** Three counterexamples each break one condition. (1) Breaking continuity: on $[0, 2]$ let $f$ be 0 for $x < 1$ and 1 for $x \geq 1$; the endpoint values are equal but there is no horizontal tangent anywhere. (2) Breaking equal endpoints: $f(x) = x$ on $[0, 1]$ has derivative identically 1 and no zero. (3) Breaking differentiability: $f(x) = |x|$ on $[-1, 1]$ has equal endpoint values, but at the corner it is not differentiable and $f'$ is never 0. The conditions are not decoration; each guards against one loophole.

**Why does Lagrange's theorem not need equal endpoint values?** Just "bend" Rolle's theorem: construct the auxiliary function $F(x) = f(x) - f(a) - \frac{f(b) - f(a)}{b - a}(x - a)$, so that $F(a) = F(b) = 0$; Rolle applied to $F$ gives $F'(\xi) = 0$, i.e. $f'(\xi) = \frac{f(b)-f(a)}{b-a}$. This "auxiliary function method" is the standard routine for mean value problems: freeze $\xi$ in the conclusion and work backwards to the construction.

**Why does the converse of the monotonicity test fail?** $f(x) = x^3$ is strictly increasing on the whole real line, yet $f'(0) = 0$. The correct statement is a direct corollary of Lagrange: for any $x_1 < x_2$ the difference quotient equals some derivative, and if the derivative is always positive the quotient is positive.

**Why does L'Hôpital's rule require "the limit of the derivative ratio exists"?** Its proof applies Cauchy's theorem to $f, g$; if $A = \lim \frac{f'}{g'}$ does not exist, one cannot conclude that $\frac{f}{g}$ has no limit. Counterexample: $\lim\limits_{x \to \infty} \frac{x + \sin x}{x}$ is 1 by direct computation, but $\frac{1 + \cos x}{1}$ oscillates with no limit. The rule is a sufficient condition, not a necessary one.

## 4. Intuition and Pictures

**Rolle's theorem**: at the top of a hill whose two ends are at the same height, the tangent must be horizontal.

**Lagrange's theorem**: the chord joining two points must be parallel to the tangent somewhere along the way. The "instant" at which the instantaneous speed equals the average speed is exactly $\xi$.

**Cauchy's theorem**: the chord and the tangent of a parametric curve have equal slopes at the same parameter.

**Summary table of tests**:

| Purpose | Tool | Caution |
|---------|------|---------|
| Monotonicity | Sign of $f'$ | Isolated zeros do not matter ($x^3$) |
| Candidate extrema | $f'(x) = 0$ or nondifferentiable points | Stationary points are only candidates |
| Confirming extrema | Sign change of $f'$ or sign of $f''$ | Fails when $f''(x_0) = 0$ |
| Extrema on a closed interval | Stationary points + nondifferentiable points + endpoints | Never omit the endpoints |
| Concavity/inflection | Sign and sign change of $f''$ | An inflection point must be a continuity point |

**Workflow for L'Hôpital**: check the type ($\frac{0}{0}$ or $\frac{\infty}{\infty}$) $\to$ differentiate numerator and denominator $\to$ simplify $\to$ check the type again $\to$ substitute or apply the rule once more. Each step must re-check the type; otherwise you are driving without a licence.

## 5. Worked Examples

### Example 1 (basic: finding $\xi$ in Rolle's theorem)

Problem: verify that $f(x) = x(x-1)(x-2)$ satisfies the conditions of Rolle's theorem on $[0, 2]$, and find all $\xi$ with $f'(\xi) = 0$.

Analysis: a cubic polynomial is continuous and differentiable everywhere; $f(0) = 0$ and $f(2) = 0$, so the endpoint values agree.

Solution: expanding, $f(x) = x^3 - 3x^2 + 2x$, so $f'(x) = 3x^2 - 6x + 2$. Setting $f'(x) = 0$:

$$x = \frac{6 \pm \sqrt{36 - 24}}{6} = 1 \pm \frac{\sqrt{3}}{3}$$

Both $\xi_1 = 1 - \frac{\sqrt{3}}{3} \approx 0.423$ and $\xi_2 = 1 + \frac{\sqrt{3}}{3} \approx 1.577$ lie in $(0, 2)$. Rolle's theorem guarantees only "at least one"; here there are actually two—the horizontal tangents occur at the hilltop and at the valley bottom.

### Example 2 (intermediate: L'Hôpital's rule)

Problem: find $\lim\limits_{x \to 0} \dfrac{e^x - 1 - x}{x^2}$.

Analysis: substitution gives $\frac{0}{0}$, satisfying L'Hôpital's conditions; apply it twice.

Solution:

$$\lim_{x \to 0} \frac{e^x - 1 - x}{x^2} = \lim_{x \to 0} \frac{e^x - 1}{2x} = \lim_{x \to 0} \frac{e^x}{2} = \frac{1}{2}$$

Each step checks the type: after the first differentiation it is still $\frac{0}{0}$; after the second it becomes a determinate form ready for substitution. The answer is $\frac{1}{2}$.

Comments: L'Hôpital is not the only route—the Maclaurin expansion $e^x = 1 + x + \frac{x^2}{2} + o(x^2)$ gives the answer in one step. Know both tools and use them to check each other.

### Example 3 (advanced: proving inequalities with the mean value theorem, and the L'Hôpital trap)

Problem: (1) prove that $e^x > 1 + x$ for $x > 0$; (2) discuss why $\lim\limits_{x \to \infty} \dfrac{x + \sin x}{x}$ cannot be computed (directly) with L'Hôpital's rule.

Analysis: (1) regard $e^x - 1$ as an increment of the function on $[0, x]$ and factor out $e^{\xi}$ with Lagrange's formula. (2) Splitting the terms gives the limit 1, but L'Hôpital gives $\frac{1 + \cos x}{1}$, which oscillates without a limit—the rule is not a master key.

Solution: (1) let $f(t) = e^t$; by Lagrange's theorem on $[0, x]$,

$$e^x - e^0 = e^{\xi}(x - 0), \quad 0 < \xi < x$$

Since $e^{\xi} > e^0 = 1$, we have $e^x - 1 > x$, i.e. $e^x > 1 + x$ for $x > 0$. Equality holds at $x = 0$.

(2) Direct computation:

$$\lim_{x \to \infty} \frac{x + \sin x}{x} = 1 + \lim_{x \to \infty}\frac{\sin x}{x} = 1 + 0 = 1$$

But formally applying L'Hôpital gives $\frac{1 + \cos x}{1}$, which oscillates between 0 and 2 and has no limit. The reason: the conclusion of L'Hôpital is "if the limit of the derivative ratio exists, then the original limit exists and is equal to it"; the converse fails—when the derivative ratio has no limit, the original limit may still exist. This is the standard counterexample to "L'Hôpital is not omnipotent".

## 6. Common Errors and Pitfalls

1. **Applying L'Hôpital without checking the conditions**: first decide whether the form is $\frac{0}{0}$ or $\frac{\infty}{\infty}$; otherwise do not use it. For example, differentiating $\lim \frac{x^2 \sin\frac{1}{x}}{x}$ directly makes things worse; a bounded-quantity argument is cleaner.
2. **Falling into a loop with L'Hôpital**: $\lim\limits_{x \to \infty} \frac{\sqrt{x^2+1}}{x}$ becomes more complicated after one differentiation; first do the algebra (divide numerator and denominator by $x$) to get 1. The rule is only one tool; equivalent manipulation is often faster.
3. **Treating "derivative zero" as an extremum**: $f(x) = x^3$ has zero derivative at 0 but no extremum. Stationary points are only candidates and must be checked by a sign change of $f'$ or the sign of $f''$.
4. **Forcing a verdict when the second derivative test fails**: if $f''(x_0) = 0$ the test is inconclusive ($x^4$ has a minimum at 0, $-x^4$ a maximum, $x^5$ no extremum); go back to the definition or use higher derivatives.
5. **Comparing only stationary points for extrema on a closed interval**: omitting the endpoints and nondifferentiable points is a classic error. Compare the values at stationary points, nondifferentiable points, and both endpoints.
6. **Ignoring the interval in the monotonicity test**: $f' > 0$ must hold on the whole interval; if $f' < 0$ on one part and $f' > 0$ on another, the discussion must be split.

### Example 4 (advanced: a Lipschitz inequality from the mean value theorem)

Problem: prove that $|\sin a - \sin b| \le |a-b|$ for all real $a,b$.

Analysis: write the difference as an increment of the function and use Lagrange's theorem to relate it to the derivative.

Solution: let $f(x) = \sin x$; on $[a,b]$ (or $[b,a]$), by Lagrange's theorem,

$\sin a - \sin b = \cos\xi\,(a-b)$

for some $\xi$. Taking absolute values and using $|\cos\xi|\le 1$:

$|\sin a - \sin b| = |\cos\xi|\,|a-b| \le |a-b|$

Comments: this shows that the "Lipschitz constant" of the sine is 1. In general, if $|f'|$ is bounded then $f$ is Lipschitz, and the difference of values at any two points is controlled by the difference of the arguments—the mean value theorem is the engine for such inequality proofs.

## 7. Summary and Mnemonic

Key points:

- Rolle (equal endpoints $\to$ horizontal tangent inside), Lagrange (secant slope = tangent slope somewhere), Cauchy (ratio of increments = ratio of derivatives) form a ladder of generalizations.
- Auxiliary function method: freeze $\xi$ in the conclusion and work backwards—the universal route for proof problems.
- L'Hôpital applies only to $\frac{0}{0}$ and $\frac{\infty}{\infty}$, and only as a sufficient condition; check the type before and the limit after.
- The three tests—monotonicity, extrema, concavity—all reduce to signs of derivatives.
- Three steps for extrema: find candidates (stationary points, nondifferentiable points, endpoints) $\to$ compute values $\to$ compare.

Mnemonic: **"Equal heights force a horizontal line, a secant forces a parallel tangent; check the type before L'Hôpital, read signs for monotonicity and extrema."**`,
  },
  'integral-applications': {
    chapter: 'Chapter 3 Integral Calculus of Functions of One Variable',
    title: 'Applications of the Definite Integral',
    summary:
      'The method of elements cuts an "inhomogeneous whole" into "approximately homogeneous slices": area, volume, arc length, work, and centroid all follow one template.',
    keyPoints: [
      'Method of elements: slice → approximate as uniform → write dQ = q(x)dx → integrate',
      'Area is upper minus lower; volumes use disks when the region touches the axis and washers when there is a gap',
      'Arc element ds = √(1+y′²)dx, or √(x′²+y′²) for parametric curves',
      'The axis of rotation must match the integration variable; if not, switch to cylindrical shells',
    ],
    content: String.raw`

An engineer building a dam must know the total water pressure on a large gate: the deeper the point the greater the pressure, and the load over the whole face is non-uniform—how to compute it? A factory must find the mass of a steel beam of varying thickness: each short segment has a different density—how to sum them? How large is the volume of a turbine blade rotating about an axis? These problems share one structure: globally "non-uniform and changing", but locally "approximately uniform and computable". The unified answer of calculus is the **method of elements**: cut the object into infinitely many slices, approximate each as uniform, write down the contribution of a slice (the element), then integrate to sum.

The method sounds abstract, but you have already met its standard template: volumes of solids of revolution, areas of plane figures, arc lengths of curves, and work done by a variable force are all products of "local approximation + integration". Newton used the method extensively in the Principia, and nineteenth-century mathematicians (Cauchy, Riemann) gave it a rigorous foundation: the element is the integrand expression, and the error of "approximation" disappears automatically in the integration.

This topic applies the method to six classes of problems: areas of plane figures, volumes of solids of revolution, volumes of solids with known cross sections, arc lengths of plane curves, areas of surfaces of revolution, and centroids and work by a variable force. Once you master the method you can set up the integral for any "accumulation-type" problem yourself—that is the real skill.

## 2. Rigorous Definitions

**General rule of the method of elements** The required quantity $Q$ is distributed over $[a, b]$ with "density" $q(x)$ at each point $x$; then

$$Q = \int_a^b \mathrm{d}Q, \qquad \mathrm{d}Q = q(x)\,\mathrm{d}x$$

**Area of a plane figure (rectangular coordinates)** With upper and lower boundaries $y = f(x)$, $y = g(x)$ ($f \geq g$):

$$A = \int_a^b \big[f(x) - g(x)\big]\,\mathrm{d}x$$

**Area of a plane figure (polar coordinates)** With boundary $r = r(\theta)$:

$$A = \frac{1}{2}\int_{\alpha}^{\beta} r^2(\theta)\,\mathrm{d}\theta$$

**Volume of a solid of revolution (disk method, about the $x$-axis)** $y = f(x) \geq 0$:

$$V = \pi\int_a^b f^2(x)\,\mathrm{d}x$$

**Volume of a solid of revolution (washer method)** Outer radius $f(x)$, inner radius $g(x)$:

$$V = \pi\int_a^b \big[f^2(x) - g^2(x)\big]\,\mathrm{d}x$$

**Volume of a solid of revolution (shell method, about the $y$-axis)**:

$$V = 2\pi\int_a^b x\,f(x)\,\mathrm{d}x$$

**Volume from known cross sections** With cross-sectional area $A(x)$:

$$V = \int_a^b A(x)\,\mathrm{d}x$$

**Arc length of a plane curve**:

$$s = \int_a^b \sqrt{1 + y'^2}\,\mathrm{d}x \quad (\text{rectangular}); \qquad s = \int_{\alpha}^{\beta} \sqrt{x'^2 + y'^2}\,\mathrm{d}t \quad (\text{parametric})$$

**Lateral area of a surface of revolution** (about the $x$-axis):

$$S = 2\pi\int_a^b |y|\,\sqrt{1 + y'^2}\,\mathrm{d}x = 2\pi\int_a^b |y|\,\mathrm{d}s$$

**Centroid** For a uniform lamina occupying a region $D$ of area $A$:

$$\bar{x} = \frac{1}{A}\iint_D x\,\mathrm{d}\sigma, \qquad \bar{y} = \frac{1}{A}\iint_D y\,\mathrm{d}\sigma$$

**Work by a variable force** (force along $x$ with magnitude $F(x)$ varying with position):

$$W = \int_a^b F(x)\,\mathrm{d}x$$

## 3. Why Define It This Way

**Why is the method of elements legitimate (why does the error vanish)?** The error caused by the "non-uniformity" inside a slice is of the order of the square of the slice length ($\Delta x^2$); summed over $n$ slices the total error is $O(\Delta x) \to 0$. The rigorous version is the Riemann sum theorem—"approximation" is not carelessness but something the limit absorbs.

**Why does the arc-length formula have a square root?** The chord of a small piece is $\sqrt{\Delta x^2 + \Delta y^2} = \sqrt{1 + \left(\frac{\Delta y}{\Delta x}\right)^2}\,\Delta x$, whose limit is $\sqrt{1 + y'^2}\,\mathrm{d}x$. Why not $\Delta x + \Delta y$ (the polygonal length)? Because the total polygonal length depends on the partition and is not a well-defined quantity; only the "sum of squares under a root" form is stable under refinement.

**Why is the volume of revolution $\pi f^2$?** Each slice is a flat cylinder of base radius $f(x)$ and height $\mathrm{d}x$, with volume $\pi f^2\,\mathrm{d}x$. With a gap (a hollow $g(x)$ between the region and the axis) the slice becomes a washer with volume $\pi(f^2 - g^2)\mathrm{d}x$—note it is the difference of squared radii, not the square of the difference of radii.

**Why do the shell and disk methods coexist?** The same solid of revolution can be sliced two ways: horizontally (disks/washers, integrating along the axis) or vertically (shells, of volume $2\pi x \cdot f(x)\,\mathrm{d}x$). Which to use depends on which expression is simpler—that is experience, and also strategy.

**Counterexample (the condition cannot be dropped)**: the disk method requires the region to be adjacent to the axis of rotation ($g(x) \equiv 0$). If there is a gap between the region and the axis and one still applies $\pi\int f^2$, the volume of the gap is counted as well and the result is too large. The inner radius in the washer method is an indispensable correction.

## 4. Intuition and Pictures

**Flow chart of the method**: cut a slice (thickness $\mathrm{d}x$) $\to$ treat the slice as uniform (use an endpoint value) $\to$ write the element $\mathrm{d}Q = q(x)\,\mathrm{d}x$ $\to$ integrate $\int_a^b$ $\to$ substitute values.

**Picture of area**: a vertical strip of width $\mathrm{d}x$ and height $f(x) - g(x)$, with area element $(f-g)\,\mathrm{d}x$. A quick way to decide which curve is on top is to test a point inside the interval.

**Picture of the arc element**: a small right triangle with legs $\mathrm{d}x$, $\mathrm{d}y$ and hypotenuse $\mathrm{d}s$—when the formula escapes you, derive it on the spot: $\mathrm{d}s^2 = \mathrm{d}x^2 + \mathrm{d}y^2$.

**Feel for the centroid**: the centroid is the "balance point" of a lamina; for uniform density it coincides with the centre of mass and depends only on shape (a symmetric figure has its centroid on the axis of symmetry).

## 5. Worked Examples

### Example 1 (basic: area of a plane figure)

Problem: find the area of the region bounded by $y = x^2$ and $y = 2x$.

Analysis: find the intersection points to set the interval of integration, then decide which function is on top.

Solution: solving $x^2 = 2x$ gives $x = 0$ or $x = 2$. Take the test point $x = 1$ in $(0, 2)$: $2x = 2 > 1 = x^2$, so the line is above and the parabola below.

$$A = \int_0^2 (2x - x^2)\,\mathrm{d}x = \left[x^2 - \frac{x^3}{3}\right]_0^2 = 4 - \frac{8}{3} = \frac{4}{3}$$

Comments: decide upper and lower before fixing the limits; reversed order gives a negative "area", and "area is non-negative" is itself the best check.

### Example 2 (intermediate: volume of revolution, washer method)

Problem: find the volume of the solid obtained by rotating the region bounded by $y = x^2$ and $y = 2x$ about the $x$-axis.

Analysis: on rotation there is a gap between the region and the $x$-axis (the two curves), so each slice is a washer with outer radius $2x$ and inner radius $x^2$.

Solution:

$$V = \pi\int_0^2 \left[(2x)^2 - (x^2)^2\right]\mathrm{d}x = \pi\int_0^2 (4x^2 - x^4)\,\mathrm{d}x = \pi\left[\frac{4x^3}{3} - \frac{x^5}{5}\right]_0^2 = \pi\left(\frac{32}{3} - \frac{32}{5}\right) = \frac{64\pi}{15}$$

Comments: the washer rule is "outer radius squared minus inner radius squared". Never take $(2x - x^2)^2$ as the integrand—that subtracts the radii first and then squares, which is geometrically wrong.

### Example 3 (advanced: arc length and the "obvious" wrong formula)

Problem: compute the arc length of $y = x^{3/2}$ for $0 \leq x \leq 4$.

Analysis: the arc element is $\mathrm{d}s = \sqrt{1 + y'^2}\,\mathrm{d}x$ with $y' = \frac{3}{2}x^{1/2}$, so $\mathrm{d}s = \sqrt{1 + \frac{9x}{4}}\,\mathrm{d}x$; one substitution finishes it.

Solution:

$$s = \int_0^4 \sqrt{1 + \frac{9x}{4}}\,\mathrm{d}x$$

Let $u = 1 + \frac{9x}{4}$, $\mathrm{d}u = \frac{9}{4}\mathrm{d}x$; $x = 0$ gives $u = 1$ and $x = 4$ gives $u = 10$:

$$s = \frac{4}{9}\int_1^{10} \sqrt{u}\,\mathrm{d}u = \frac{4}{9}\cdot\frac{2}{3}\left[u^{3/2}\right]_1^{10} = \frac{8}{27}\left(10\sqrt{10} - 1\right)$$

Comments: the usual slips are writing $\int_0^4 \sqrt{1 + y^2}\,\mathrm{d}x$ (using $y$ instead of $y'$) or $\int_0^4 \sqrt{1 + (x^{3/2})^2}\,\mathrm{d}x$ (forgetting to differentiate first). The test: $\mathrm{d}s^2 = \mathrm{d}x^2 + \mathrm{d}y^2$ always holds; dividing by $\mathrm{d}x^2$ gives $\left(\frac{\mathrm{d}s}{\mathrm{d}x}\right)^2 = 1 + \left(\frac{\mathrm{d}y}{\mathrm{d}x}\right)^2$—derive it from the little triangle when memory fails.

## 6. Common Errors and Pitfalls

1. **Integrating without deciding upper and lower**: area must be "upper minus lower"; reversed order gives a negative value. Make a habit of sketching, then fixing the limits, then deciding order.
2. **Omitting the inner radius in the washer method**: when there is a gap between the region and the axis, integrating only the outer radius overestimates the volume. Test: does the axis touch the boundary of the region?
3. **Rotating about the $y$-axis but integrating over $x$**: the axis and the integration variable must match—for the $y$-axis either solve for $x = g(y)$ and use disks, or keep $y = f(x)$ and use shells.
4. **Mixing up the arc-length formula**: $\sqrt{1 + y^2}$ (forgetting to differentiate) is far from $\sqrt{1 + y'^2}$; parametric curves require $\sqrt{x'^2 + y'^2}$.
5. **Mixing variables inside an element**: in $\mathrm{d}Q = q(x)\,\mathrm{d}x$, $q(x)$ and $\mathrm{d}x$ must belong to the same "thickness direction"; multiplying a thickness along $x$ by a quantity varying along $y$ without integrating is a dimensional error.
6. **Forgetting signs and units in physical problems**: in $W = \int F\,\mathrm{d}x$ the work is positive when force and displacement agree; a spring going from compression through $F = 0$ to extension must be handled piecewise or by odd symmetry; in pressure problems "depth" is measured from the free surface, and the wrong datum shifts the answer by a constant.

### Example 4 (advanced: work by a variable force)

Problem: a spring obeys Hooke's law $F = kx$. Stretching it $0.01\,\mathrm{m}$ from equilibrium requires $2\,\mathrm{N}$; find the work done by an external force in stretching it from equilibrium to $0.1\,\mathrm{m}$.

Analysis: the force varies linearly with the extension $x$; by the method of elements the force is approximately constant over a small displacement $\mathrm{d}x$, so the work is $\mathrm{d}W = F\,\mathrm{d}x$.

Solution: from $F(0.01)=2$ we get $k = 2/0.01 = 200\ (\mathrm{N/m})$. Hence

$W = \int_0^{0.1} 200x\,\mathrm{d}x = 200\cdot\frac{x^2}{2}\Big|_0^{0.1} = 100\times 0.01 = 1\ (\mathrm{J})$

Comments: the general formula for work by a variable force is $W = \int_a^b F(x)\,\mathrm{d}x$. Note that the lower limit starts from the equilibrium position $x=0$; if you continue from an already stretched state, the lower limit must change accordingly.

## 7. Summary and Mnemonic

Key points:

- Method of elements: slice $\to$ uniform approximation $\to$ write $\mathrm{d}Q = q(x)\,\mathrm{d}x$ $\to$ integrate.
- Area is upper minus lower; volume depends on whether the region touches the axis (disk or washer); arc length memorize $\sqrt{1 + y'^2}$; lateral area $2\pi|y|\,\mathrm{d}s$.
- The axis of rotation and the integration variable must match; if not, switch methods (shells).
- Centroid, work, and pressure are all special cases of one template; the centroid depends only on shape.

Mnemonic: **"Slice an element, write the differential; area is upper minus lower. Disks when it hugs the axis, washers when there is a gap; arc length is the root of one plus the square of the derivative; match the axis to the variable."**`,
  },

  'multivariable-differential': {
    chapter: 'Chapter 4 Differential Calculus of Functions of Several Variables',
    title: 'Differential Calculus of Multivariable Functions',
    summary:
      'Partial derivatives look along the coordinate axes, the total differential gives the overall linear approximation, and the gradient points to the steepest ascent—extending the derivative from a line to a whole surface.',
    keyPoints: [
      'Partial derivative = derivative in one variable with the others held fixed; total differential dz = fx dx + fy dy',
      'Differentiable ⇒ partials exist and continuous; partials existing ⇏ differentiability (counterexample xy/(x²+y²))',
      'Directional derivative = projection of the gradient onto the direction; the gradient points to steepest ascent',
      'Chain rule: the rate of the dependent variable = the sum over paths of partials times intermediate derivatives',
    ],
    content: String.raw`

On a mountainside halfway up, the "steepness" of the terrain underfoot is different in different directions: heading east may be a gentle slope, heading north a cliff. The derivative of a function of one variable answers only "the rate of change along one line (the $x$-axis)", but in reality temperature, pressure, and altitude are functions of several variables, and we need to know how fast things change "in any direction". Multivariable calculus extends the derivative from "a line" to "a surface, a whole space": partial derivatives describe change along coordinate directions, the total differential describes the overall linear approximation, and the directional derivative and gradient tell us "where the steepest way up is".

This topic clarifies four things: how partial derivatives are defined (looking "partially"), what the total differential is (the overall linear principal part), what relation differentiability bears to the existence of partial derivatives, and what the chain rule looks like in several variables. They are the natural higher-dimensional extension of the one-variable derivative, but with many subtleties the one-dimensional case does not have.

## 2. Rigorous Definitions

**Definition 1 (multivariable function)** Let $D \subset \mathbb{R}^n$; a map $f: D \to \mathbb{R}$ is called a function of $n$ variables, written $z = f(x_1,\dots,x_n)$. In the two-variable case write $z = f(x,y)$, whose domain is usually some region of the plane.

**Definition 2 (partial derivative)** Hold the other variables fixed and let only one vary, taking the derivative in the one-variable sense:

$$\frac{\partial z}{\partial x}\bigg|_{(x_0,y_0)} = \lim_{\Delta x \to 0}\frac{f(x_0+\Delta x, y_0) - f(x_0,y_0)}{\Delta x}$$

written $f_x(x_0,y_0)$ or $z_x$. Similarly for $f_y$. Dropping the subscript point gives the partial derivative function $f_x(x,y)$.

**Definition 3 (total differential)** If the increment

$$\Delta z = f(x_0+\Delta x, y_0+\Delta y) - f(x_0,y_0)$$

can be written as

$$\Delta z = A\,\Delta x + B\,\Delta y + o(\rho), \qquad \rho = \sqrt{(\Delta x)^2+(\Delta y)^2}$$

then $f$ is differentiable at $(x_0,y_0)$ and the linear principal part $A\,\mathrm{d}x + B\,\mathrm{d}y$ is called the total differential, written $\mathrm{d}z$. Here $\rho$ is the distance between two points of the plane and $\mathrm{d}x = \Delta x$, $\mathrm{d}y = \Delta y$ are the differentials of the independent variables.

**Theorem 1 (differentiable implies partials exist)** If $f$ is differentiable at a point, then both partial derivatives exist and $A = f_x$, $B = f_y$, so that

$$\mathrm{d}z = f_x\,\mathrm{d}x + f_y\,\mathrm{d}y$$

**Theorem 2 (sufficient condition for differentiability)** If $f_x, f_y$ exist in a neighbourhood of the point and are continuous there, then $f$ is differentiable there.

**Definition 4 (directional derivative)** Along the unit vector $\vec{l} = (\cos\alpha, \cos\beta)$:

$$\frac{\partial f}{\partial \vec{l}} = \lim_{t\to 0^+}\frac{f(x_0+t\cos\alpha, y_0+t\cos\beta) - f(x_0,y_0)}{t}$$

It measures the rate of change per unit length in that direction.

**Definition 5 (gradient)** $\nabla f = (f_x, f_y)$ is a vector. The directional derivative equals the projection of the gradient onto that direction:

$$\frac{\partial f}{\partial \vec{l}} = \nabla f \cdot \vec{l} = |\nabla f|\cos\theta$$

where $\theta$ is the angle between the gradient and the direction $\vec{l}$.

**Chain rule** If $z = f(x,y)$ with both $x = x(t)$, $y = y(t)$ depending on $t$, then

$$\frac{\mathrm{d}z}{\mathrm{d}t} = f_x \frac{\mathrm{d}x}{\mathrm{d}t} + f_y \frac{\mathrm{d}y}{\mathrm{d}t}$$

## 3. Why Define It This Way

**Why does a partial derivative watch only one variable?** A multivariable function already has different rates of change in different directions; the most natural first step is to hold the others fixed and let one move, splitting the "multivariable difficulty" into "one-variable small problems". That is the meaning of "partial": nail the other directions down for the moment and look at one line.

**Why is "differentiable" far stronger than "both partials exist"?** Counterexample: let

$$f(x,y) = \begin{cases} \dfrac{xy}{x^2+y^2}, & (x,y)\neq(0,0) \\ 0, & (x,y)=(0,0) \end{cases}$$

On the coordinate axes $f(x,0)=0$ and $f(0,y)=0$, so $f_x(0,0)=f_y(0,0)=0$ both exist; but approaching the origin along $y=x$ gives $f\to 1/2 \neq f(0,0)$, so the function is not even continuous at the origin, let alone differentiable. "Partials exist" does not even guarantee continuity, whereas "differentiable" guarantees that a tangent plane approximates the surface locally.

**Why must the error in the total differential be $o(\rho)$ rather than $o(\Delta x)$?** The error must be of higher order than the straight-line distance $\rho$ to the point, so that the planar approximation holds simultaneously in all directions. Requiring only higher order in $\Delta x$ degenerates into an approximation along the coordinate axes and loses the meaning of "overall linear approximation".

**Why does the gradient point in the direction of steepest ascent?** The directional derivative is the inner product of the gradient with the unit direction; by the properties of the inner product it is largest (equal to $|\nabla f|$) when the direction is parallel to the gradient and smallest ($-|\nabla f|$) when antiparallel. So the gradient direction is the fastest way up and its magnitude is the maximum rate of ascent; the normal to a level curve (a curve of constant value) is exactly the gradient direction.

## 4. Intuition and Pictures

**Tangent plane**: near a point a differentiable surface can be fitted by a plane (the tangent plane), and the total differential is the change of height on that plane. The two partial derivatives give the slopes of the intersections of the tangent plane with the two coordinate planes.

**Partials existing ≠ a smooth surface**: the counterexample surface above looks like a "saddle point" at the origin—smooth along the coordinate axes, but going diagonally it does not match up, so there is no unique tangent plane. That is the geometric face of non-differentiability.

**Picture of the gradient field**: on a contour map the gradient is perpendicular to the contours and points uphill, just as the steepest climb on a hill always cuts across the contours.

**Tree diagram of the chain rule**: the dependent variable $z$ depends on $t$ through the intermediate variables $x,y$; for each path compute "partial derivative times the derivative of the intermediate variable with respect to $t$", then add. This is continuous with the one-variable chain rule, except that branches are added.

**Higher and mixed partials**: differentiating again gives the second partials $f_{xx}, f_{xy}, f_{yx}, f_{yy}$. When these are continuous the order can be exchanged ($f_{xy}=f_{yx}$, Clairaut's theorem). Imagine an elastic sheet: stretching it horizontally then vertically, or vertically then horizontally, gives the same final deformation—the intuition behind the interchangeability of mixed partials.

**Implicit differentiation**: the equation $F(x,y)=0$ determines $y=y(x)$ locally, and differentiating with respect to $x$ gives $\frac{\mathrm{d}y}{\mathrm{d}x} = -\frac{F_x}{F_y}$ ($F_y\neq 0$). It turns the differentiation of a function defined by an equation into a ratio of partials, avoiding an explicit solution for $y$.

## 5. Worked Examples

### Example 1 (basic: partial derivatives and the total differential)

Problem: let $z = x^2 y + 3xy^3$; find $z_x, z_y$ and the total differential $\mathrm{d}z$.

Analysis: for $z_x$ treat $y$ as a constant and differentiate with respect to $x$; for $z_y$ treat $x$ as a constant.

Solution:

$$z_x = 2xy + 3y^3, \qquad z_y = x^2 + 9xy^2$$

Hence

$$\mathrm{d}z = (2xy+3y^3)\,\mathrm{d}x + (x^2+9xy^2)\,\mathrm{d}y$$

Comments: the "partial" in partial derivative is exactly treating the other variables as constants for the moment; the total differential is the two partials times their own differentials, added—fully analogous to $\mathrm{d}y = y'\mathrm{d}x$ in one variable.

### Example 2 (intermediate: chain rule)

Problem: let $z = e^{xy}$ with $x = \sin t$, $y = t^2$; find $\dfrac{\mathrm{d}z}{\mathrm{d}t}$.

Analysis: the composition path is $z \to (x,y) \to t$; compute the partials and the derivatives, then apply the chain rule.

Solution: $z_x = y e^{xy}$, $z_y = x e^{xy}$, $\dfrac{\mathrm{d}x}{\mathrm{d}t} = \cos t$, $\dfrac{\mathrm{d}y}{\mathrm{d}t} = 2t$. Hence

$$\frac{\mathrm{d}z}{\mathrm{d}t} = y e^{xy}\cos t + x e^{xy}\cdot 2t = e^{xy}(y\cos t + 2tx)$$

Substituting $x = \sin t$, $y = t^2$:

$$\frac{\mathrm{d}z}{\mathrm{d}t} = e^{t^2\sin t}\bigl(t^2\cos t + 2t\sin t\bigr)$$

Comments: one can also differentiate $z = e^{t^2\sin t}$ directly with respect to $t$ and check; the two methods must agree—a good way to verify the chain rule calculation.

### Example 3 (advanced: directional derivative and gradient)

Problem: let $f(x,y) = x^2 - xy + y^2$; find the directional derivative at $(1,1)$ along $\vec{l} = \left(\dfrac{3}{5},\dfrac{4}{5}\right)$.

Analysis: compute the gradient, then take its inner product with the unit direction vector.

Solution: $f_x = 2x - y$, $f_y = -x + 2y$, so $\nabla f(1,1) = (1, 1)$. Hence

$$\frac{\partial f}{\partial \vec{l}}\bigg|_{(1,1)} = (1,1)\cdot\left(\frac{3}{5},\frac{4}{5}\right) = \frac{3}{5} + \frac{4}{5} = \frac{7}{5}$$

Comments: the maximum of the directional derivative is $|\nabla f| = \sqrt{2}$, attained in the direction $(1,1)$; the minimum is $-\sqrt{2}$, in the opposite direction. This direction is neither steepest nor flattest, so we get an intermediate value $\frac{7}{5}$ between the two.

### Example 4 (supplementary: approximation with the total differential)

Problem: use the total differential to approximate $(1.02)^{2.01}$ and state the order of the error.

Analysis: regard it as the value of the two-variable function $f(x,y) = x^y$ near $(1,2)$, using $f(x,y) \approx f(1,2) + f_x(1,2)\Delta x + f_y(1,2)\Delta y$.

Solution: $f(1,2) = 1$. The partials are $f_x = y x^{y-1}$, so $f_x(1,2) = 2$, and $f_y = x^y\ln x$, so $f_y(1,2) = 0$. With $\Delta x = 0.02$, $\Delta y = 0.01$:

$$f(1.02,2.01) \approx 1 + 2\times 0.02 + 0\times 0.01 = 1.04$$

The true value is about $1.0408$, so the error is only about $0.0008$.

Comments: the total-differential approximation is very effective for small changes, with an error of second order. Here $f_y(1,2)=0$, so the first-order contribution in the $y$ direction vanishes and the error comes mainly from the second-order term in $y$—hence still small. Once again, the power of "replacing a surface locally by a plane".

## 6. Common Errors and Pitfalls

1. **Treating "partials exist" as "differentiable"**: the counterexample above shows that partials existing does not even guarantee continuity; differentiability needs stronger conditions (continuous partials or the total-differential definition).
2. **Letting other variables move while taking a partial derivative**: computing $z_x$ requires $y$ to be held constant, or an extra term appears. Mnemonic: "differentiate with respect to one, treat the rest as constants".
3. **Exchanging mixed partials without conditions**: $f_{xy} = f_{yx}$ requires continuous partials (Clairaut); at discontinuities the exchange may give different results.
4. **Missing a path in the chain rule**: if $z$ depends on $t$ through two intermediate variables, there must be two product terms added; writing one is a typical omission.
5. **Using a non-unit vector for the directional derivative**: the direction vector must be normalized, otherwise the inner product does not give the rate per unit length.
6. **Taking the gradient direction to lie along a contour**: the gradient is perpendicular to the contours and the directional derivative along a contour is 0; the steepest climb cuts across the contours.

## 7. Summary and Mnemonic

Key points:
- Partial derivative = derivative in one variable with the others fixed; total differential = linear principal part of the increment, $\mathrm{d}z = f_x\mathrm{d}x + f_y\mathrm{d}y$.
- Differentiable $\Rightarrow$ partials exist; partials continuous $\Rightarrow$ differentiable; partials existing $\not\Rightarrow$ differentiable.
- Directional derivative = projection of the gradient; the gradient points to steepest ascent, and its magnitude is the maximum rate.
- Chain rule: "the rate of the dependent variable = the sum over paths of partials times intermediate derivatives".

Mnemonic: **"Hold the rest constant for a partial; only differentiability earns a tangent plane. The gradient is normal to contours; never miss a branch of the chain."**`,
  },

  'multiple-integrals': {
    chapter: 'Chapter 5 Double and Triple Integrals',
    title: 'Double and Triple Integrals',
    summary:
      'Accumulating a non-uniform quantity over a region: reducing to iterated integrals is the key computation, and polar, cylindrical, and spherical coordinates plus the Jacobian are the simplifiers.',
    keyPoints: [
      'A multiple integral accumulates a non-uniform quantity over a region; reducing to iterated integrals is the core skill',
      'The polar area element carries an extra r, cylindrical an extra r, spherical an extra ρ²sinφ',
      'Symmetry: when the region is symmetric and the parity of the integrand matches, the integral simplifies',
      'Change of variables always brings the absolute value of the Jacobian determinant',
    ],
    content: String.raw`

How do you find the total mass of a thin plate whose density varies from point to point? And the volume or total mass of an irregular three-dimensional body? The one-variable definite integral accumulates a non-uniform quantity "along a line"; the double integral extends accumulation to a plane region, the triple integral to a spatial region. The idea is identical: cut the region into infinitely many small pieces, treat the density as uniform on each, write the contribution of the piece (the element), and sum in the limit. This is the method of elements in two and three dimensions, and the unified algorithm for probability densities, centroids, moments of inertia, and other physical quantities.

This topic proceeds in three steps: build intuition from the definition and geometric meaning, reduce multiple integrals to iterated integrals (the key to computation), and finally introduce the three simplifiers—polar, cylindrical, and spherical coordinates—and the Jacobian for change of variables.

## 2. Rigorous Definitions

**Definition 1 (double integral)** Let $f$ be bounded on a bounded closed region $D$ of the plane. Partition $D$ arbitrarily into $n$ small regions, let the $i$-th have area $\Delta\sigma_i$ and diameter $d_i$, $\lambda = \max d_i$, choose $(\xi_i,\eta_i)\in\Delta\sigma_i$, and form the Riemann sum $\sum f(\xi_i,\eta_i)\Delta\sigma_i$. If as $\lambda\to 0$ the limit exists and is independent of the partition and the choices, then $f$ is integrable on $D$ and the limit is the double integral:

$$\iint_D f(x,y)\,\mathrm{d}\sigma = \lim_{\lambda\to 0}\sum_{i=1}^{n} f(\xi_i,\eta_i)\Delta\sigma_i$$

**Sufficient condition for integrability**: $f$ is continuous on $D$ (or bounded and continuous almost everywhere).

**Properties**: linearity, additivity over regions ($\iint_{D_1\cup D_2} = \iint_{D_1}+\iint_{D_2}$ when they do not overlap), sign preservation ($f\ge 0\Rightarrow$ integral $\ge 0$), and the mean value theorem (a continuous function satisfies $\iint_D f = f(P^*)|D|$ for some point $P^*$).

**Reduction to an iterated integral (first $y$, then $x$)**: if $D = \{(x,y): a\le x\le b,\ y_1(x)\le y\le y_2(x)\}$, then

$$\iint_D f(x,y)\,\mathrm{d}\sigma = \int_a^b \mathrm{d}x \int_{y_1(x)}^{y_2(x)} f(x,y)\,\mathrm{d}y$$

**Polar coordinate transformation**: $x = r\cos\theta,\ y = r\sin\theta$, and the area element becomes

$$\mathrm{d}\sigma = r\,\mathrm{d}r\,\mathrm{d}\theta$$

so $\iint_D f(x,y)\,\mathrm{d}\sigma = \iint_{D'} f(r\cos\theta, r\sin\theta)\, r\,\mathrm{d}r\,\mathrm{d}\theta$.

**Definition 2 (triple integral)**: similarly $\iiint_\Omega f\,\mathrm{d}V = \lim\sum f(P_i)\Delta V_i$.

**Cylindrical coordinates**: $x = r\cos\theta,\ y = r\sin\theta,\ z = z$, with volume element $\mathrm{d}V = r\,\mathrm{d}r\,\mathrm{d}\theta\,\mathrm{d}z$.

**Spherical coordinates**: $x = \rho\sin\varphi\cos\theta,\ y = \rho\sin\varphi\sin\theta,\ z = \rho\cos\varphi$ ($\varphi$ measured from the $z$-axis), with volume element

$$\mathrm{d}V = \rho^2\sin\varphi\,\mathrm{d}\rho\,\mathrm{d}\varphi\,\mathrm{d}\theta$$

**Change of variables (Jacobian)**: $\iint_D f(x,y)\,\mathrm{d}x\,\mathrm{d}y = \iint_{D'} f(x(u,v),y(u,v))\, |J|\,\mathrm{d}u\,\mathrm{d}v$, where

$$J = \frac{\partial(x,y)}{\partial(u,v)} = \begin{vmatrix} x_u & x_v \\ y_u & y_v \end{vmatrix}$$

## 3. Why Define It This Way

**Why does the polar area element carry an extra $r$?** In polar coordinates a small region is a sector-shaped ring of area approximately $r\,\mathrm{d}r\,\mathrm{d}\theta$. Omitting $r$ would make regions far from the origin too small—$r$ is the correction for "circumference stretching with radius".

**Why be careful with the limits when integrating first in $y$?** The boundary of the region may be piecewise; you must draw the region, fix the range of the outer variable, then the inner one. Reversed limits or a missing piece both give wrong answers.

**Why take the absolute value of the Jacobian?** A volume element must be non-negative while a determinant can be negative (the orientation is reversed); the absolute value keeps the volume correct.

**Counterexample (the condition cannot be dropped)**: without continuity the Riemann sum may fail to converge. For instance the Dirichlet function (1 at rational points, 0 at irrational points) cannot be integrated to a definite value over any region, which is why "continuous (or bounded and continuous almost everywhere)" is required.

## 4. Intuition and Pictures

**Double integral = volume under a surface**: when $f(x,y)\ge 0$, $\iint_D f\,\mathrm{d}\sigma$ is exactly the volume of the solid with base $D$ and top $z = f(x,y)$.

**Symmetry**: if the region is symmetric about the $y$-axis and $f$ is odd in $x$, the integral is 0; if $f$ is even, it equals twice the integral over the right half.

**Choosing coordinates**: polar suits disks, sectors, and annuli; rectangular suits rectangles and triangles; cylindrical suits solids of revolution about an axis; spherical suits spheres and cones.

**Geometric meaning of the Jacobian**: it measures how large a unit square becomes after the transformation—the area of the corresponding small parallelogram.

**Physical applications of multiple integrals**: mass = $\iint_D \rho(x,y)\,\mathrm{d}\sigma$ ($\rho$ the area density); centroid $(\bar{x},\bar{y}) = \frac{1}{M}\iint_D (x,y)\rho\,\mathrm{d}\sigma$; moment of inertia $I = \iint_D r^2\rho\,\mathrm{d}\sigma$. These formulas are further expansions of the method of elements: cut the total into pieces, treat each as uniform, and sum. In probability, the probability $P((X,Y)\in D) = \iint_D f(x,y)\,\mathrm{d}\sigma$ for a two-dimensional random variable is also a double integral.

## 5. Worked Examples

### Example 1 (basic: reducing to an iterated integral in rectangular coordinates)

Problem: find $\iint_D (x+y)\,\mathrm{d}\sigma$, where $D$ is bounded by $y=0$, $y=x$, $x=1$.

Analysis: sketch the region first: $0\le x\le 1$, $0\le y\le x$.

Solution:

$$\int_0^1 \mathrm{d}x \int_0^x (x+y)\,\mathrm{d}y = \int_0^1 \left[xy + \frac{y^2}{2}\right]_0^x \mathrm{d}x = \int_0^1 \left(x^2 + \frac{x^2}{2}\right)\mathrm{d}x = \int_0^1 \frac{3}{2}x^2\,\mathrm{d}x = \frac{1}{2}$$

Comments: fix the outer limits first ($x$ from 0 to 1), then the inner ones ($y$ from 0 to $x$); a clear sketch is the prerequisite for correct limits.

### Example 2 (intermediate: polar coordinates)

Problem: find $\iint_D e^{-(x^2+y^2)}\,\mathrm{d}\sigma$ over the unit disk $D$: $x^2+y^2\le 1$.

Analysis: a disk region with an integrand containing $x^2+y^2$—polar coordinates are the natural choice.

Solution: $x^2+y^2 = r^2$, $\mathrm{d}\sigma = r\,\mathrm{d}r\,\mathrm{d}\theta$, $0\le r\le 1$, $0\le\theta\le 2\pi$.

$$\iint_D e^{-(x^2+y^2)}\,\mathrm{d}\sigma = \int_0^{2\pi}\mathrm{d}\theta\int_0^1 e^{-r^2} r\,\mathrm{d}r = 2\pi\cdot\left[-\frac{1}{2}e^{-r^2}\right]_0^1 = \pi(1-e^{-1})$$

Comments: this integral cannot be done in rectangular coordinates (the antiderivative is not elementary); in polar coordinates it reduces to elementary functions—the classic victory of polar coordinates.

### Example 3 (advanced: triple integral in spherical coordinates)

Problem: find the volume of the part of the ball $x^2+y^2+z^2\le R^2$ in the first octant.

Analysis: in the first octant $x,y,z\ge 0$, so the spherical ranges are $0\le\rho\le R$, $0\le\varphi\le\pi/2$, $0\le\theta\le\pi/2$.

Solution:

$$V = \int_0^{\pi/2}\mathrm{d}\theta\int_0^{\pi/2}\mathrm{d}\varphi\int_0^R \rho^2\sin\varphi\,\mathrm{d}\rho = \frac{\pi}{2}\cdot 1\cdot\frac{R^3}{3} = \frac{\pi R^3}{6}$$

This is exactly $1/8$ of the whole ball's volume $\frac{4}{3}\pi R^3$, so the result is self-consistent.

Comments: in the spherical volume element $\rho^2\sin\varphi$, the $\rho^2$ comes from radial stretching and the $\sin\varphi$ from "the latitude circle shrinking with latitude"; both are easily omitted.

### Example 4 (supplementary: simplification by symmetry)

Problem: find $\iint_D (x^3 + y^2)\,\mathrm{d}\sigma$, where $D$ is the disk $x^2+y^2\le 1$.

Analysis: the disk is symmetric about both coordinate axes. $x^3$ is odd in $x$, so its integral over the disk is 0; the $y^2$ part can be done in polar coordinates.

Solution: by symmetry

$$\iint_D x^3\,\mathrm{d}\sigma = 0$$

and

$$\iint_D y^2\,\mathrm{d}\sigma = \int_0^{2\pi}\mathrm{d}\theta\int_0^1 (r\sin\theta)^2\, r\,\mathrm{d}r = \left(\int_0^{2\pi}\sin^2\theta\,\mathrm{d}\theta\right)\left(\int_0^1 r^3\,\mathrm{d}r\right) = \pi\cdot\frac{1}{4} = \frac{\pi}{4}$$

so the original integral equals $\frac{\pi}{4}$.

Comments: symmetry is the most economical simplification—checking parity first often makes a whole integral vanish and saves much work. Doing the polar integral honestly here would be a long detour.

## 6. Common Errors and Pitfalls

1. **Omitting $r$ in polar coordinates**: the area element is $r\,\mathrm{d}r\,\mathrm{d}\theta$; dropping $r$ makes the result systematically too small.
2. **Reversed limits or an unsplit region**: for complicated regions (such as an annulus crossed by an axis) sketch first and split the integral if necessary.
3. **Wrong angular ranges in spherical coordinates**: the first octant is not a full $2\pi$; $\varphi$ is measured from the $z$-axis, not from the $xy$-plane.
4. **Not taking the absolute value of the Jacobian**: this produces negative volumes.
5. **Misusing symmetry**: both "the region is symmetric about an axis" and "the function is odd (or even) in that variable" must hold; one alone is not enough.
6. **Order of integration inconsistent with the limits**: once the order is chosen, the inner and outer limits must correspond to the same set of variable relations.

## 7. Summary and Mnemonic

Key points:
- A multiple integral accumulates a non-uniform quantity over a region; reducing to iterated integrals is the core of computation.
- The polar area element carries $r$, the cylindrical volume element carries $r$, the spherical volume element carries $\rho^2\sin\varphi$.
- Symmetry and a good choice of coordinates greatly simplify computation.
- A change of variables always brings the absolute value of the Jacobian determinant.

Mnemonic: **"Partition, sum, take the limit; iterated integrals are the trunk. Polar adds r, spherical adds ρ²sinφ; check parity before anything else."**`,
  },

  'line-surface-integrals': {
    chapter: 'Chapter 6 Line Integrals, Surface Integrals, and Elements of Field Theory',
    title: 'Line Integrals, Surface Integrals, and Elements of Field Theory',
    summary:
      'First-kind integrals of a scalar ignore orientation, second-kind integrals of a vector depend on it; Green, Gauss, and Stokes unify as "the boundary integral equals the integral of the interior derivative".',
    keyPoints: [
      'First-kind line/surface integrals: scalar accumulation, independent of direction or side',
      'Second-kind line/surface integrals: projection of a vector, dependent on direction or side',
      'The three formulas: Green (plane), Gauss (space), Stokes (surface)',
      'Path independence ⇔ zero curl ⇔ a potential function exists (on a simply connected region)',
    ],
    content: String.raw`

A bent wire with a density that varies along its length—how to find its total mass? That is a line integral of the first kind. If the wire lies in a force field, how much work is done along the whole path? That is a line integral of the second kind (with respect to coordinates). How much fluid crosses an open surface? That is a surface integral. Green's theorem, Gauss's theorem, and Stokes' theorem are three golden keys connecting "quantities inside a region" with "quantities on the boundary", and they are the mathematical language of field theory in electromagnetism and fluid mechanics. This topic first distinguishes the two kinds of line integrals and the two kinds of surface integrals, then presents the three theorems and their physical meaning.

## 2. Rigorous Definitions

**First-kind line integral (with respect to arc length)**: let $f$ be defined on a curve $L$;

$$\int_L f(x,y)\,\mathrm{d}s = \lim_{\lambda\to 0}\sum f(P_i)\Delta s_i$$

It is independent of direction. With the parametrization $x=x(t),y=y(t)$, the arc element is $\mathrm{d}s = \sqrt{x'^2+y'^2}\,\mathrm{d}t$.

**Second-kind line integral (with respect to coordinates)**:

$$\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y$$

It depends on direction. Under parametrization $\mathrm{d}x = x'(t)\mathrm{d}t$, $\mathrm{d}y = y'(t)\mathrm{d}t$, and the limits run from the starting point to the endpoint.

Relation between the two kinds: if $(\cos\alpha,\cos\beta)$ is the unit tangent vector, then

$$\int_L P\,\mathrm{d}x+Q\,\mathrm{d}y = \int_L (P\cos\alpha + Q\cos\beta)\,\mathrm{d}s$$

**Green's theorem**: let the closed curve $L$ positively bound the region $D$, and let $P,Q$ have continuous first partials on $D$; then

$$\oint_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)\mathrm{d}\sigma$$

**First-kind surface integral**: $\iint_\Sigma f\,\mathrm{d}S$, with $\mathrm{d}S = |\vec{r}_u\times\vec{r}_v|\,\mathrm{d}u\,\mathrm{d}v$ under parametrization.

**Second-kind surface integral (with respect to coordinates)**:

$$\iint_\Sigma P\,\mathrm{d}y\mathrm{d}z + Q\,\mathrm{d}z\mathrm{d}x + R\,\mathrm{d}x\mathrm{d}y$$

It depends on the side of the surface (the direction of the normal).

**Gauss's theorem**: let the closed surface $\Sigma$ bound the region $\Omega$ and take the outward side;

$$\iint_{\Sigma} P\,\mathrm{d}y\mathrm{d}z+Q\,\mathrm{d}z\mathrm{d}x+R\,\mathrm{d}x\mathrm{d}y = \iiint_\Omega \left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)\mathrm{d}V$$

**Stokes' theorem**: let the boundary of the surface $\Sigma$ be the closed curve $L$;

$$\oint_L \vec{A}\cdot\mathrm{d}\vec{r} = \iint_\Sigma (\nabla\times\vec{A})\cdot\vec{n}\,\mathrm{d}S$$

**The three operations of field theory**: gradient $\nabla f$; divergence $\nabla\cdot\vec{F} = \dfrac{\partial P}{\partial x}+\dfrac{\partial Q}{\partial y}+\dfrac{\partial R}{\partial z}$ (a scalar); curl $\nabla\times\vec{F}$ (a vector).

## 3. Why Define It This Way

**The essential difference between the two kinds**: the first kind is "accumulating a scalar along a path" (mass, arc length) and is independent of direction; the second kind is "accumulating the projection of a vector along a path" (work, flux) and depends on direction. This is a difference of physical substance, not a game of notation.

**Why is Green's theorem "region = boundary"?** The circulation around the boundary on the left equals the total "local rotation strength" (curl) inside the region on the right: macroscopic circulation = the sum of microscopic vorticity.

**Physical reading of Gauss's theorem**: divergence is "source strength per unit volume", and the total source inside a volume equals the net flux through the boundary—the change in the air inside a balloon equals the net flow through its surface.

**Counterexample (the condition cannot be dropped)**: Green's theorem requires $P,Q$ to have continuous first partials in $D$ and $L$ to be closed. If the region contains a singular point (for instance the field $\dfrac{-y}{x^2+y^2}\mathrm{d}x+\dfrac{x}{x^2+y^2}\mathrm{d}y$ at the origin), the integral around a loop enclosing the singularity is nonzero, the theorem cannot be applied directly, and the multiply connected region must be handled by "cutting a hole".

## 4. Intuition and Pictures

**Arc element $\mathrm{d}s$ and coordinate element $\mathrm{d}x$**: $\mathrm{d}s$ is the length of a small segment (always positive); $\mathrm{d}x$ is its projection on the $x$ direction, which may be positive or negative—exactly the source of the different sensitivity to orientation.

**Picture of Green's theorem**: imagine wind swirling inside a region; the total circulation on the boundary equals the sum of the strengths of all the little vortices inside.

**Picture of Gauss's theorem**: think of the region as a balloon; the change in the amount of air inside equals the net flow through the balloon's surface.

**Picture of Stokes' theorem**: the circulation around the boundary of a surface equals the flux of the curl "through" the surface; the surface may be stretched over the boundary in any way—as long as the boundary is unchanged, the result is unchanged.

**Unified picture of conservative fields**: a vector field with zero curl everywhere is called irrotational (conservative). The "continuous versions" of Green, Gauss, and Stokes tell us that on a simply connected region, irrotational $\iff$ path independent $\iff$ a potential function exists $\iff$ the integral over any closed curve is zero. Gravity and electrostatic fields satisfy this, so the work depends only on the endpoints, not the path—the origin of the concept of potential energy.

## 5. Worked Examples

### Example 1 (basic: arc length by a first-kind line integral)

Problem: find the arc length of the uniform semicircle $x^2+y^2=a^2\ (y\ge 0)$ (take linear density 1).

Analysis: parametrize $x=a\cos t,\ y=a\sin t,\ t\in[0,\pi]$; the arc element is $\mathrm{d}s = a\,\mathrm{d}t$.

Solution:

$$s = \int_L 1\,\mathrm{d}s = \int_0^\pi a\,\mathrm{d}t = \pi a$$

Comments: arc length is independent of direction; take the parameter range over the complete semicircle, and the result is exactly the length of half the circumference.

### Example 2 (intermediate: area by Green's theorem)

Problem: use Green's theorem to find the area enclosed by the ellipse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$.

Analysis: take $P = -\dfrac{y}{2}$, $Q = \dfrac{x}{2}$, so that $\dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y} = 1$; then the area is $\oint_L \dfrac{x\,\mathrm{d}y-y\,\mathrm{d}x}{2}$.

Solution: parametrize $x=a\cos t,\ y=b\sin t$;

$$A = \frac{1}{2}\int_0^{2\pi}\bigl(ab\cos^2 t + ab\sin^2 t\bigr)\,\mathrm{d}t = \frac{ab}{2}\cdot 2\pi = \pi ab$$

Comments: Green's theorem turns "finding an area" into "integrating along the boundary"; after parametrization the answer appears at once, lighter than a double integral in rectangular coordinates.

### Example 3 (advanced: path independence and potential functions)

Problem: prove that on a simply connected region, if $\dfrac{\partial Q}{\partial x} = \dfrac{\partial P}{\partial y}$, then the line integral $\int_L P\,\mathrm{d}x+Q\,\mathrm{d}y$ is path independent.

Analysis: by Green's theorem the integral over any closed curve is 0, so the endpoints determine the value.

Solution: take two paths $L_1,L_2$ from $A$ to $B$ and join them with opposite orientations into the closed curve $C = L_1 - L_2$. By Green's theorem

$$\oint_C P\,\mathrm{d}x+Q\,\mathrm{d}y = \iint_D \left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)\mathrm{d}\sigma = 0$$

so the two integrals are equal and the value is path independent. A potential function $u$ can then be constructed with $\mathrm{d}u = P\,\mathrm{d}x+Q\,\mathrm{d}y$, and the integral equals $u(B)-u(A)$.

Comments: in field theory this corresponds to a "conservative field"; the existence of a potential function is necessary and sufficient for path independence. Gravity and electrostatic fields are of this type.

### Example 4 (supplementary: flux by Gauss's theorem)

Problem: find the total outward flux of the field $\vec{F} = (x, y, z)$ through the sphere $x^2+y^2+z^2 = R^2$.

Analysis: use Gauss's theorem directly; the divergence $\nabla\cdot\vec{F} = 1+1+1 = 3$ is constant.

Solution: by Gauss's theorem

$$\iint_{\Sigma} \vec{F}\cdot\vec{n}\,\mathrm{d}S = \iiint_{\Omega} (\nabla\cdot\vec{F})\,\mathrm{d}V = 3\cdot \frac{4}{3}\pi R^3 = 4\pi R^3$$

Comments: without Gauss one would have to parametrize the sphere and integrate patch by patch—tedious. Gauss's theorem turns "the flux through a closed surface" into "volume times the constant divergence" in one step, showing the power of "boundary integral = integral of the interior derivative". Note that the outward side must be taken; the inward side differs by a sign.

## 6. Common Errors and Pitfalls

1. **Ignoring orientation in second-kind line integrals**: swapping start and end changes the sign; the direction in which $t$ increases must agree with the direction of integration.
2. **Using Green's theorem on a non-closed curve**: first add a segment to close the curve, then subtract the integral along the auxiliary segment.
3. **Applying Green's theorem on a region containing a singularity**: cut a hole first (multiply connected); do not apply it as is.
4. **Choosing the wrong side for a surface integral**: second-kind surface integrals depend on the normal (outward or inward) and differ by a sign.
5. **Confusing divergence and curl formulas**: divergence is a dot product (a scalar), curl is a cross product (a vector); they cannot be mixed up.
6. **Confusing $\mathrm{d}s$ with $\mathrm{d}x$**: the first kind uses $\mathrm{d}s$ (always positive), the second uses $\mathrm{d}x,\mathrm{d}y$ (of either sign).

## 7. Summary and Mnemonic

Key points:
- First-kind line/surface integrals: scalar accumulation, independent of direction or side; second kind: projection of a vector, dependent on direction or side.
- Green (plane closed curve ↔ region), Gauss (closed surface ↔ volume), Stokes (surface boundary ↔ surface) unify as "boundary integral = integral of the interior derivative".
- Path independence $\iff$ zero curl $\iff$ a potential function exists (on a simply connected region).
- Gradient, divergence, and curl are the three basic operations of field theory.

Mnemonic: **"First kind is scalar, indifferent to direction; second kind is a vector, watching which side. Green, Gauss, Stokes: the boundary integral equals the interior derivative."**`,
  },

  'infinite-series': {
    chapter: 'Chapter 7 Series of Numbers and Power Series',
    title: 'Numerical Series and Power Series',
    summary:
      'Infinite sums are judged by partial sums; positive series by comparison, alternating series by monotonicity, and a power series encloses an interval on which it may be differentiated and integrated term by term.',
    keyPoints: [
      'Convergence = the limit of partial sums exists; terms tending to 0 is necessary but not sufficient',
      'Positive series: comparison, ratio, root; alternating series: Leibniz',
      'Absolute convergence ⇒ convergence; rearranging a conditionally convergent series can change its sum',
      'A power series has a radius of convergence, and inside the interval it may be differentiated and integrated term by term',
    ],
    content: String.raw`

Does $1 + \dfrac{1}{2} + \dfrac{1}{4} + \dfrac{1}{8} + \cdots$, added forever, exceed 2? Zeno's paradox of more than two thousand years ago is essentially an infinite sum. The central question of infinite series is: "can infinitely many terms add up to a finite value?" It is not only a cornerstone of analysis but also the foundation of function approximation (Taylor series, Fourier series) and numerical computation—a computer evaluates $\sin x$, $\cos x$, and the exponential entirely by series expansions. This topic first builds the system of convergence tests for numerical series, then moves to power series, providing the theoretical basis for approximating functions by polynomials.

## 2. Rigorous Definitions

**Definition 1 (numerical series)** Given a sequence $u_1,u_2,\dots$, write formally $\sum_{n=1}^\infty u_n$. Its $n$-th partial sum is $S_n = \sum_{k=1}^n u_k$. If the sequence $\{S_n\}$ converges to a finite number $S$, the series is said to converge, written $\sum u_n = S$; otherwise it diverges.

**Cauchy criterion**: the series converges $\iff$ for every $\varepsilon>0$ there is $N$ such that $m>n>N$ implies $|S_m-S_n|<\varepsilon$. It does not require knowing the sum in advance—it is an intrinsic criterion.

**Tests for positive series**:
- Comparison test: if $0\le u_n\le v_n$ and $\sum v_n$ converges, then $\sum u_n$ converges; conversely if $\sum u_n$ diverges then $\sum v_n$ diverges.
- Ratio test: if $\lim\limits_{n\to\infty}\dfrac{u_{n+1}}{u_n} = \rho$, then the series converges for $\rho<1$, diverges for $\rho>1$, and the test is inconclusive for $\rho=1$.
- Root test: if $\lim\limits_{n\to\infty}\sqrt[n]{u_n} = \rho$, the conclusion is the same as above.

**Alternating series (Leibniz test)**: if $u_n = (-1)^{n-1}a_n$ with $a_n>0$ decreasing monotonically and $\lim a_n = 0$, then the series converges and the truncation error satisfies $|R_n|\le a_{n+1}$.

**Absolute and conditional convergence**: if $\sum|u_n|$ converges the series is absolutely convergent; if $\sum u_n$ converges but $\sum|u_n|$ diverges it is conditionally convergent. An absolutely convergent series may be rearranged arbitrarily without changing its sum; a conditionally convergent series can be rearranged to any value (Riemann's rearrangement theorem).

**Power series**: of the form $\sum_{n=0}^\infty a_n(x-x_0)^n$. There is a radius of convergence $R = 1/\limsup\limits_{n}\sqrt[n]{|a_n|}$; the series converges absolutely for $|x-x_0|<R$ and diverges for $|x-x_0|>R$, with the endpoints decided separately. Inside the interval of convergence the sum function may be differentiated and integrated term by term.

**Taylor series**: if $f$ is differentiable to all orders at $x_0$ and the remainder tends to 0, then

$$f(x) = \sum_{n=0}^\infty \frac{f^{(n)}(x_0)}{n!}(x-x_0)^n$$

## 3. Why Define It This Way

**Why define convergence by partial sums?** "Adding infinitely many terms" has no independent meaning; one must first define the finite sum $S_n$ and then ask whether its limit exists—only a limit existing gives the "infinite sum" a value.

**Why does the Cauchy criterion not need the sum in advance?** It looks only at whether the "tail pieces" can be made arbitrarily small; if so, the sequence of partial sums is a Cauchy sequence and must converge. It is purely intrinsic.

**Why does the ratio test fail when $\rho=1$?** The harmonic series $\sum 1/n$ diverges while $\sum 1/n^2$ converges, yet in both cases the ratio tends to 1. So at $\rho=1$ the ratio test is powerless and one must use the comparison or integral test.

**Why is absolute convergence important?** Absolute convergence guarantees invariance under rearrangement and makes the algebraic operations on series (addition, multiplication) freer; conditional convergence is far more fragile.

**Counterexample (terms tending to 0 is not sufficient)**: the harmonic series $\sum 1/n$ has terms $1/n\to 0$ yet diverges. So "terms tending to 0" is only a necessary condition for convergence, not a sufficient one.

## 4. Intuition and Pictures

**Sequence of partial sums**: plot $S_n$ as a broken line; convergence means the line approaches a fixed height, divergence means it either rushes to infinity or oscillates forever.

**Intuition for comparison**: smaller than a convergent series implies convergence; larger than a divergent series implies divergence—like measuring the unknown against a known benchmark.

**Alternating series**: positive and negative cancel, like a pendulum gradually settling at the centre, and the truncation error does not exceed the first discarded term.

**Interval of convergence of a power series**: a symmetric open interval centred at $x_0$ (the endpoints judged separately), like a "safe corridor" inside which calculus may be done freely.

**From numerical to functional series**: replace the constant terms of a numerical series by functions and you get a functional series; for fixed $x$ it degenerates into a numerical series. Power series are the most important class of functional series, representing a function as an "infinite polynomial". This is the destination of the previous topic on Taylor's formula: when the remainder tends to 0, Taylor's formula becomes a Taylor series, so $\sin x, \cos x, e^x$ can all be written as power series, on which computers base their numerical work.

## 5. Worked Examples

### Example 1 (basic: geometric series)

Problem: find the sum of $\sum_{n=0}^\infty \dfrac{1}{2^n}$.

Analysis: $|q| = 1/2 < 1$; use the geometric series formula directly.

Solution:

$$S = \frac{1}{1-1/2} = 2$$

Comments: the geometric series $\sum a q^n$ converges if and only if $|q|<1$, with sum $a/(1-q)$; for $|q|\ge 1$ it diverges.

### Example 2 (intermediate: ratio test)

Problem: decide the convergence of $\sum_{n=1}^\infty \dfrac{n^2}{2^n}$.

Analysis: with an exponential in the denominator, the ratio test is the best fit.

Solution:

$$\frac{u_{n+1}}{u_n} = \frac{(n+1)^2}{2^{n+1}}\cdot\frac{2^n}{n^2} = \frac{1}{2}\left(1+\frac{1}{n}\right)^2 \to \frac{1}{2} < 1$$

so the series converges.

Comments: the exponential denominator overwhelms the polynomial numerator and the ratio test is crisp; if the numerator were exponential $a^n$ with $a>2$ the conclusion would reverse.

### Example 3 (advanced: conditional convergence and error estimate)

Problem: decide the convergence of $\sum_{n=1}^\infty \dfrac{(-1)^{n-1}}{n}$, and estimate the error of the sum of the first 10 terms.

Analysis: this is an alternating series; apply the Leibniz test, then use the divergence of $\sum 1/n$ to conclude conditional convergence.

Solution: $a_n = 1/n$ decreases monotonically to 0, so by the Leibniz criterion the series converges. Since the harmonic series $\sum 1/n$ diverges, the convergence is conditional. The error of the sum $S_{10}$ of the first 10 terms satisfies

$$|R_{10}| \le a_{11} = \frac{1}{11} \approx 0.0909$$

Comments: conditional convergence "converges only through cancellation of signs", and a rearrangement can change the sum—the most essential difference from absolute convergence, and the marvel of Riemann's rearrangement theorem.

### Example 4 (supplementary: summing a power series)

Problem: find the interval of convergence and the sum function of $\sum_{n=0}^\infty x^n$, and use it to find $\sum_{n=1}^\infty \dfrac{1}{2^n}$.

Analysis: this is a geometric series whose radius of convergence is fixed by $|x|<1$; the sum function comes from the geometric formula, with endpoints decided separately.

Solution: for $|x|<1$

$$\sum_{n=0}^\infty x^n = \frac{1}{1-x}$$

For $|x|\ge 1$ the terms do not tend to 0, so the series diverges. Hence the interval of convergence is $(-1,1)$, with both endpoints $x=\pm 1$ divergent. Setting $x=1/2$ (inside the interval):

$$\sum_{n=0}^\infty \left(\frac{1}{2}\right)^n = \frac{1}{1-1/2} = 2$$

Removing the $n=0$ term ($x^0=1$) gives $\sum_{n=1}^\infty \frac{1}{2^n} = 1$, consistent with Example 1.

Comments: the usual way to find a power series sum is "recognize a geometric series or a known expansion, or differentiate or integrate term by term into a known one". Here term-by-term integration also gives $\sum x^{n+1}/(n+1) = -\ln(1-x)$, showing the power series as a "function generator".

## 6. Common Errors and Pitfalls

1. **Treating "terms tend to 0" as sufficient**: the harmonic series is the standard counterexample; always check.
2. **Jumping to a conclusion when the ratio test gives $\rho=1$**: switch to the comparison or integral test.
3. **Forgetting to check monotone decrease for an alternating series**: $a_n\to 0$ alone is not enough; the terms must decrease.
4. **Confusing absolute and conditional convergence**: first test whether $\sum|u_n|$ converges, then draw the conclusion.
5. **Not testing the endpoints of a power series separately**: the radius of convergence fixes only the open interval; the endpoints must be substituted and tested individually.
6. **Ignoring endpoint changes after term-by-term differentiation or integration**: term-by-term calculus is valid inside the interval of convergence, but convergence at the endpoints may change.

## 7. Summary and Mnemonic

Key points:
- Convergence = the limit of partial sums exists; terms tending to 0 is necessary but not sufficient.
- Positive series: comparison, ratio, root tests; alternating series: the Leibniz test.
- Absolute convergence $\Rightarrow$ convergence; rearranging a conditionally convergent series can change its sum.
- A power series has a radius of convergence; inside the interval it may be differentiated and integrated term by term.

Mnemonic: **"Infinite sums live or die by partial sums; terms going to zero proves nothing. Ratio below 1 converges; alternating error is no more than the next term."**`,
  },
};

export default map;
