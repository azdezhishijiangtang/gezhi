import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'real-numbers': {
    chapter: 'Chapter 1 Real Numbers and Limits of Sequences',
    title: 'Completeness of the Reals and the Supremum Principle',
    summary:
      'The watershed between mathematical analysis and advanced calculus: starting from the supremum principle, build limit theory rigorously and understand everything the word "complete" means.',
    keyPoints: [
      'The supremum principle = a least upper bound always exists; it is the core of completeness of the reals',
      'Monotone bounded convergence, nested intervals, accumulation points, finite covering and the Cauchy criterion are equivalent',
      'Cauchy criterion: no need to guess the limit, only to estimate the distance between any two terms',
      'The rationals do not satisfy the supremum principle — the "holes" are exactly the irrationals',
    ],
    content: String.raw`

We are taught from childhood that "the number line is a single continuous thread," but what does that sentence actually mean in mathematics? Imagine standing on the number line formed by the rationals $\mathbb{Q}$. You can write $1$, $1.4$, $1.41$, $1.414\cdots$ and approach $\sqrt{2}$ forever, yet you can never step on $\sqrt{2}$ itself, because it is not rational. The rationals leave "holes" in the line. Mathematical analysis studies the reals $\mathbb{R}$, whose most important property is that all those holes have been filled in — that is "completeness."

Motivating question: why must a sequence that is "increasing and bounded above" converge to some real number? Among the rationals this fails (the rational sequence above that approaches $\sqrt{2}$ has no rational limit). In this section we make "no holes" precise and turn it into a tool we can use at will.

## 2. Rigorous Definitions

**Definition (upper bound, supremum).** Let $S \subset \mathbb{R}$ be nonempty. If there is a real number $M$ such that $x \le M$ for every $x \in S$, then $M$ is called an upper bound of $S$ and $S$ is said to be bounded above. The smallest of all upper bounds (if it exists) is called the **supremum** of $S$, written $\sup S$.

Similarly, if there is $m$ with $x \ge m$ for every $x \in S$, then $m$ is called a lower bound; the largest of all lower bounds is called the **infimum**, written $\inf S$.

**Supremum principle (completeness axiom).** Every nonempty subset of $\mathbb{R}$ that is bounded above has a supremum; dually, every nonempty subset bounded below has an infimum.

**Least-upper-bound characterization of the supremum.** $\alpha = \sup S$ if and only if both of the following hold at once:

1. $x \le \alpha$ for every $x \in S$ ($\alpha$ is an upper bound);
2. for every $\varepsilon > 0$ there is $x_0 \in S$ with $x_0 > \alpha - \varepsilon$ (no number smaller than $\alpha$ is still an upper bound).

## 3. Why Define It This Way

The supremum principle is treated as an "axiom" rather than a "theorem" because it captures the fundamental difference between the real and the rational number systems. It cannot be derived from some more basic fact; it is a label we "stick" onto the real numbers.

Counterexample (what happens without completeness): in $\mathbb{Q}$, the set $A = \{x \in \mathbb{Q} : x^2 < 2\}$ is bounded above (by $3/2$, for instance), but it has no supremum. The reason: if $\alpha = \sup A$ lay in $\mathbb{Q}$, then $\alpha^2$ could neither equal $2$ (otherwise $\alpha = \sqrt{2} \notin \mathbb{Q}$), nor be smaller than $2$ (otherwise a larger rational number still in $A$ could be found), nor be larger than $2$ (otherwise a smaller rational number would still be an upper bound) — a contradiction. That "gap" is exactly where $\sqrt{2}$ sits.

In the second characterization, "no amount smaller than $\alpha$ is still an upper bound" is the key: it rules out candidates that are "close but not small enough." Without it, every number above the true supremum would also satisfy the first condition, and the meaning of "least" would be lost.

## 4. Intuition and Pictures

> You may picture $\sup S$ as follows: press a sliding board down onto $S$ from the right; where the board stops is the supremum. $\inf S$ is where a board pushed up from the left stops.

The five equivalent theorems of the real number system (each can be derived from the supremum principle, so any of them may be invoked in a proof):

| Theorem | In one sentence | Typical use |
|------|--------|----------|
| Monotone bounded convergence | An increasing sequence bounded above converges | Prove a sequence converges |
| Nested intervals | Nested closed intervals shrink to a unique common point | Prove that some point exists |
| Accumulation point | An infinite bounded set has an accumulation point | Extract a convergent subsequence |
| Finite covering | An open cover of a closed interval has a finite subcover | Prove uniform continuity by contradiction |
| Cauchy criterion | If any two terms eventually get close, the sequence converges | Decide convergence without knowing the limit |

## 5. Worked Examples

### Example 1 (basic: proving a supremum with the characterization)

Problem: let $S = \{1 - 1/n : n \in \mathbb{N}\}$. Find $\sup S$ and prove it rigorously.

Solution: conjecture $\sup S = 1$. Check the two conditions:
(1) $1 - 1/n < 1$ for every $n$, so $1$ is an upper bound;
(2) for any $\varepsilon > 0$, the Archimedean property gives $n$ with $1/n < \varepsilon$, that is $1 - 1/n > 1 - \varepsilon$.
Hence $1$ is the least upper bound and $\sup S = 1$.

### Example 2 (intermediate: the Cauchy criterion)

Problem: suppose $|x_{n+1} - x_n| \le q\,|x_n - x_{n-1}|$ with $0 < q < 1$. Prove that $\{x_n\}$ converges.

Analysis: guessing the limit directly is hard, so use the Cauchy criterion. For any $m \ge 1$:

$$|x_{n+m} - x_n| \le |x_n - x_{n-1}|\,(q + q^2 + \cdots + q^m) < \frac{q}{1-q}\,|x_n - x_{n-1}|$$

As $n \to \infty$ the right-hand side tends to $0$, so for every $\varepsilon > 0$ there is $N$ such that $|x_m - x_n| < \varepsilon$ whenever $m,n > N$. The Cauchy condition holds, so $\{x_n\}$ converges.

### Example 3 (advanced: the hypotheses of the nested interval theorem cannot be dropped)

Problem: construct nested closed intervals $[a_n, b_n]$ with $a_n = -1/n$ and $b_n = 1 + 1/n$, and find all their common points.

Solution: the length $b_n - a_n = 1 + 2/n \to 1$ does not tend to $0$, so the hypothesis "lengths tend to $0$" of the nested interval theorem fails. Here $a_n \uparrow 0$ and $b_n \downarrow 1$, and the common set is $[0,1]$, not a single point. Comment: the theorem requires the lengths to tend to $0$; otherwise the intersection may be a whole segment instead of a point.

## 6. Common Errors and Pitfalls

- Error: treating $\sup S$ as "the largest number in $S$." Correct: $\sup S$ need not belong to $S$ (in Example 1, $1 \notin S$).
- Error: believing that a bounded sequence must have a largest term. Correct: boundedness only guarantees a supremum, not the existence of a maximum (e.g. $1 - 1/n$ has no largest term).
- Error: applying the supremum principle inside $\mathbb{Q}$. Correct: it holds only in $\mathbb{R}$; the rationals do not satisfy it.
- Error: concluding $\sup S = \alpha$ after verifying only that "$\alpha$ is an upper bound." Correct: minimality (the second condition) must also be checked.

## 7. Summary and Mnemonic

Key points:
- The supremum principle = "the reals have no holes," the heart of completeness.
- Supremum = least upper bound, and it must be proved rigorously with both conditions.
- Monotone bounded convergence, nested intervals, accumulation points, finite covering and the Cauchy criterion are equivalent and mutually usable.
- The power of the Cauchy criterion: convergence can be decided without knowing what the limit is.

**Mnemonic: the supremum is the "least upper bound," and neither condition may be omitted; the reals have no holes, and the five theorems are one family.**`,
  },

  'limits-continuity': {
    chapter: 'Chapter 2 Limits of Functions and Continuity',
    title: 'Limits and Continuity of Functions',
    summary:
      'Use the ε-δ language to make "getting arbitrarily close" precise, and answer why continuous functions preserve intermediate values and boundedness.',
    keyPoints: [
      'ε-δ definition of a limit of a function: once x is close enough to x0, f(x) is arbitrarily close to A',
      'One-sided limits and limits at infinity are variants of the ε-δ definition',
      'Heine theorem: a function limit exists ⇔ all sequential limits agree',
      'Continuous ⇔ the limit may pass through the function value; a continuous function on a closed interval attains its extrema and has the intermediate value property',
    ],
    content: String.raw`

When we say "as $x$ tends to $x_0$, $f(x)$ tends to $A$," the intuition is: the closer $x$ gets to $x_0$, the closer $f(x)$ gets to $A$. But how close is close enough? Mathematics cannot rely on feeling. The concept of a limit prescribes rules for "getting arbitrarily close": however demanding the error tolerance you ask for (however small the $\varepsilon$), I can always find a sufficiently small neighbourhood (some $\delta$) such that as soon as $x$ falls inside it, $f(x)$ meets your tolerance.

Motivating question: why can the graph of a continuous function be "drawn in one stroke, without a break"? We return to this question at the end of the section.

## 2. Rigorous Definitions

**Definition (the ε-δ language for limits of functions).** Let $f$ be defined in some punctured neighbourhood of $x_0$. Then $A$ is called the limit of $f$ as $x \to x_0$, written $\lim_{x\to x_0} f(x) = A$, if and only if:

$$\forall \varepsilon > 0,\ \exists \delta > 0,\ \text{such that whenever } 0 < |x - x_0| < \delta,\ |f(x) - A| < \varepsilon$$

**One-sided limits**: replacing "$0 < |x - x_0| < \delta$" by "$x_0 - \delta < x < x_0$" gives the left limit $f(x_0^-)$; replacing it by "$x_0 < x < x_0 + \delta$" gives the right limit $f(x_0^+)$.

**Definition (continuity).** $f$ is continuous at $x_0$ if and only if $\lim_{x\to x_0} f(x) = f(x_0)$, that is:

$$\forall \varepsilon > 0,\ \exists \delta > 0,\ \text{such that whenever } |x - x_0| < \delta,\ |f(x) - f(x_0)| < \varepsilon$$

Note that the definition of continuity allows $x = x_0$ (the neighbourhood is no longer punctured); this is exactly what lets the limit "pass through" the function value.

## 3. Why Define It This Way

In the $\varepsilon$-$\delta$ definition the order "first $\varepsilon$, then $\delta$" cannot be reversed: you state how accurate you want it, and only then do I guarantee that I can deliver — rather than fixing a range first and talking about error afterwards. This is what makes the error arbitrarily small.

Dropping the "punctured" requirement gives continuity; keeping it, the existence of the limit has nothing to do with the value of $f(x_0)$, or even with whether $f$ is defined there — a limit cares about behaviour near $x_0$, not about the value at $x_0$.

Counterexample (the limit exists but the function is discontinuous): let $f(x) = 0$ for $x \neq 0$ and $f(0) = 1$. Then $\lim_{x\to 0} f(x) = 0 \neq f(0)$: the limit exists yet $f$ is not continuous there. So continuity is strictly stronger than existence of the limit; it additionally demands "the limit equals the function value."

## 4. Intuition and Pictures

> Think of $\varepsilon$ as a vertical "error band" that $f(x)$ must fall into, and $\delta$ as a horizontal "safe zone": once $x$ falls inside it, you are safe. The limit exists precisely when, no matter how narrow the error band, a sufficiently small horizontal safe zone can always be drawn.

**Heine theorem (sequential criterion)**: $\lim_{x\to x_0} f(x) = A$ if and only if for every sequence with $x_n \to x_0$ ($x_n \neq x_0$) we have $f(x_n) \to A$. It converts a limit of functions into a limit of sequences, and is a powerful tool for proving that a limit does not exist: it suffices to find two sequences tending to $x_0$ that give different limits.

| Concept | Key condition | Requires $f(x_0)$? |
|------|----------|-------------------|
| Limit of a function | $0<|x-x_0|<\delta$ | No |
| Continuous | $|x-x_0|<\delta$ and the limit equals the value | Yes |

## 5. Worked Examples

### Example 1 (basic: a direct ε-δ proof of a limit)

Problem: prove from the definition that $\lim_{x\to 2} (3x - 1) = 5$.

Solution: take any $\varepsilon > 0$; we need $\delta > 0$ such that $0 < |x - 2| < \delta$ implies $|(3x-1) - 5| < \varepsilon$. Note that
$$|(3x-1)-5| = |3x - 6| = 3|x - 2|$$
Taking $\delta = \varepsilon/3$, whenever $|x-2| < \delta$ we get $3|x-2| < 3\delta = \varepsilon$. Q.E.D.

### Example 2 (intermediate: proving a limit does not exist via Heine)

Problem: prove that $f(x) = \sin(1/x)$ has no limit as $x \to 0$.

Analysis: take $x_n = 1/(2n\pi) \to 0$, then $f(x_n) = \sin(2n\pi) = 0 \to 0$; then take $y_n = 1/(2n\pi + \pi/2) \to 0$, then $f(y_n) = \sin(2n\pi + \pi/2) = 1 \to 1$. The two sequences give different limits, so by the Heine theorem the limit does not exist.

### Example 3 (advanced: continuity preserves intermediate values)

Problem: let $f$ be continuous on $[a,b]$ with $f(a) < 0 < f(b)$. Prove that there is $\xi \in (a,b)$ with $f(\xi) = 0$.

Solution: this is the zero point theorem. Consider $S = \{x \in [a,b] : f(x) < 0\}$, which is nonempty and bounded above; let $c = \sup S$. By continuity, $\lim_{x\to c^-} f(x) \le 0$ and $\lim_{x\to c^+} f(x) \ge 0$, so $f(c) = 0$. If $f(c)<0$ we could extend the upper bound to the right, a contradiction; if $f(c)>0$ the points just left of $c$ would already be nonnegative, a contradiction. Hence $f(c)=0$.

## 6. Common Errors and Pitfalls

- Error: reversing the direction when writing $\delta$ as a function of $\varepsilon$, i.e. "given $\delta$, find $\varepsilon$." Correct: $\varepsilon$ must come first, then $\delta$.
- Error: cancelling $|x - x_0|$ in a limit proof and ignoring the coefficient. Correct: as in Example 1, keep the factor $3$ and take $\delta = \varepsilon/3$.
- Error: believing that a limit exists exactly when both one-sided limits exist. Correct: they must also be equal.
- Error: equating "continuous at $x_0$" with "defined at $x_0$ and the limit exists." Correct: the limit value must equal the function value as well.

## 7. Summary and Mnemonic

Key points:
- Limit of a function, $\varepsilon$-$\delta$: first the error $\varepsilon$, then the safe zone $\delta$.
- One-sided limits are the "half" versions of $\varepsilon$-$\delta$; the limit exists $\iff$ both one-sided limits exist and are equal.
- Heine theorem: a function limit $\iff$ all sequential limits agree; it is the easiest way to prove non-existence.
- Continuous = the limit passes through the function value; a continuous function on a closed interval attains a maximum and a minimum and has the intermediate value property.

**Mnemonic: ε first, δ second, the safe zone narrowing with the error band; continuous means the limit value equals the function value.**`,
  },

  'derivatives-ma': {
    chapter: 'Chapter 3 Derivatives and Differentials',
    title: 'Derivatives and Differentials',
    summary:
      'The derivative is the slope of the tangent and the differential is the "straight line for a curve" linear approximation — every seed of the mean value theorems is planted here.',
    keyPoints: [
      'The derivative f\'(x0)=lim (f(x)-f(x0))/(x-x0) is the slope of the tangent line',
      'Differentiable implies continuous; the converse fails (e.g. |x| at 0)',
      'The differential df=f\'(x0)Δx is the best linear approximation in the sense of a higher-order infinitesimal',
      'Rules of differentiation: the four operations, the chain rule, inverse functions and implicit differentiation',
    ],
    content: String.raw`

A car's speedometer shows "instantaneous speed," yet speed is essentially "the rate of change of distance with respect to time." At a given instant the car clearly "does not move," and yet the speed is not zero — how is that possible? The answer: look at the distance covered in a very short time divided by that time, then let the time shrink to zero; the resulting limit is the instantaneous speed. The derivative is the abstraction of this idea: it measures how sensitively the output of a function responds to a change in its input.

Motivating question: why can the graph of a differentiable function never have a sharp corner? By the end of the section you will see why.

## 2. Rigorous Definitions

**Definition (derivative).** Let $f$ be defined in a neighbourhood of $x_0$. If the limit

$$f'(x_0) = \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}$$

exists, then $f$ is said to be differentiable at $x_0$, and that limit is called the derivative (that is, the slope of the tangent). Equivalently, in increment notation:

$$f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$$

**Definition (differential).** If $\Delta y = f(x_0 + \Delta x) - f(x_0)$ can be written as

$$\Delta y = A\,\Delta x + o(\Delta x)$$

where $A$ does not depend on $\Delta x$, then $f$ is said to be differentiable at $x_0$, $A\,\Delta x$ is called the differential, written $\mathrm{d}y = f'(x_0)\,\Delta x$ (usually with the convention $\mathrm{d}x = \Delta x$).

## 3. Why Define It This Way

The difference quotient $(f(x)-f(x_0))/(x-x_0)$ is the slope of the secant through two points; letting $x \to x_0$ turns the secant into the tangent, and the limit of the slopes is the derivative. So "differentiable = a uniquely determined tangent direction exists."

The definition of the differential splits the increment into "the linear main part $A\Delta x$" plus "a higher-order small quantity $o(\Delta x)$." The linear main part is the differential — it is the best straight-line approximation to $\Delta y$. When $\Delta x$ is small, discarding the higher-order term and replacing $\Delta y$ by $\mathrm{d}y$ gives a negligible error.

Counterexample (differentiable implies continuous, but not conversely): the function $f(x) = |x|$ is continuous at $x=0$, but
$$\lim_{h\to 0^+} \frac{|h|}{h} = 1,\quad \lim_{h\to 0^-} \frac{|h|}{h} = -1$$
The left and right derivatives differ, so $f$ is not differentiable at $0$ — the graph has a sharp corner and no unique tangent.

## 4. Intuition and Pictures

> The differential is "replacing a curve by a straight line": over a very short stretch, a curved graph is approximated by its own tangent. The error is a higher-order infinitesimal that shrinks faster than $\Delta x$ as $\Delta x$ shrinks.

Key relationships:

| Relationship | Conclusion |
|------|------|
| Differentiable ⇒ continuous | Holds |
| Continuous ⇒ differentiable | Fails (counterexample $|x|$) |
| Differentiable (differential exists) ⇔ derivable | For one-variable functions the two are equivalent, and $\mathrm{d}y = f'(x_0)\mathrm{d}x$ |

Basic differentiation rules: the four operations $(u\pm v)' = u' \pm v'$, $(uv)' = u'v + uv'$, $(u/v)' = (u'v - uv')/v^2$; the chain rule $(f\circ g)' = (f'\circ g)\cdot g'$; inverse functions $(f^{-1})'(y) = 1/f'(x)$.

## 5. Worked Examples

### Example 1 (basic: differentiating from the definition)

Problem: use the definition to find the derivative of $f(x) = x^2$ at an arbitrary $x$.

Solution:
$$f'(x) = \lim_{h\to 0} \frac{(x+h)^2 - x^2}{h} = \lim_{h\to 0} \frac{2xh + h^2}{h} = \lim_{h\to 0} (2x + h) = 2x$$

### Example 2 (intermediate: implicit differentiation)

Problem: let $x^2 + y^2 = 1$ determine the implicit function $y = y(x)$. Find $y'$.

Analysis: differentiate both sides with respect to $x$, remembering that $y$ is a function of $x$:
$$2x + 2y\,y' = 0 \quad\Rightarrow\quad y' = -\frac{x}{y}$$
This illustrates the chain rule applied to an implicit function.

### Example 3 (advanced: approximation with differentials)

Problem: use a differential to estimate $\sqrt{1.02}$.

Solution: take $f(x) = \sqrt{x}$, $f'(x) = 1/(2\sqrt{x})$. At $x_0 = 1$, $\mathrm{d}y = f'(1)\cdot 0.02 = 0.01$. Hence $\sqrt{1.02} \approx f(1) + \mathrm{d}y = 1 + 0.01 = 1.01$ (the true value is about $1.00995$, so the error is tiny).

## 6. Common Errors and Pitfalls

- Error: believing that continuity implies differentiability. Correct: $|x|$ is continuous but not differentiable at $0$.
- Error: writing the chain rule as $(f\circ g)' = f'(g)\cdot g'$ and omitting the inner variable. Correct: it should be $f'(g(x))\cdot g'(x)$.
- Error: forgetting that $y$ depends on $x$ in implicit differentiation, thus missing a factor $y'$. Correct: every term in $y$ needs a factor $y'$.
- Error: confusing the differential $\mathrm{d}y$ with the increment $\Delta y$. Correct: $\mathrm{d}y$ is only the linear main part; the two differ by a higher-order infinitesimal.

## 7. Summary and Mnemonic

Key points:
- Derivative = limit of the difference quotient = slope of the tangent = rate of change.
- Differentiable implies continuous; continuous need not be differentiable (sharp corner counterexample).
- The differential is the linear approximation that replaces a curve by a line, $\mathrm{d}y = f'(x_0)\mathrm{d}x$.
- The four operations, the chain rule, inverse functions and implicit differentiation are the four tools.

**Mnemonic: the derivative is the limit of a secant turning into a tangent; differentiable implies continuous, but continuous need not be differentiable.**

Supplement: higher-order derivatives $f^{(n)}$ describe how strongly a curve bends; a positive second derivative means locally convex downward (bowl-shaped), a negative one locally convex upward (dome-shaped). The Leibniz notation $\frac{\mathrm{d}y}{\mathrm{d}x}$ writes the derivative as a "quotient of differentials"; strictly speaking $\mathrm{d}y,\mathrm{d}x$ are linear main parts of increments rather than genuine infinitesimals, but the notation cancels like a fraction in the chain rule and in integration by substitution, which is extremely convenient.

One-sided derivatives $f'_+(x_0)=\lim_{h\to0^+}\frac{f(x_0+h)-f(x_0)}{h}$ and $f'_-(x_0)$ approach from the right and from the left respectively. A function is differentiable at $x_0$ if and only if both one-sided derivatives exist and are equal. For a piecewise function, the one-sided derivatives must be computed separately at the junction point rather than by blindly applying formulas. For example, with $f(x)=x^2\sin(1/x)$ for $x\neq 0$ and $f(0)=0$, the definition gives $f'(0)=0$, yet the derivative oscillates without bound near $0$ — showing that differentiability does not imply that the derivative is continuous, and that a derivative may have discontinuities (necessarily of the second kind).`,
  },

  'mean-value-ma': {
    chapter: 'Chapter 4 Mean Value Theorems',
    title: 'Mean Value Theorems and Taylor\'s Formula',
    summary:
      'Rolle, Lagrange and Cauchy link "overall change" to "instantaneous rate at some point," and Taylor\'s formula then gives polynomial approximation with an explicit remainder.',
    keyPoints: [
      'Lagrange mean value theorem: f(b)-f(a)=f\'(ξ)(b-a)',
      'Rolle is a special case of Lagrange (equal endpoint values)',
      'Cauchy mean value theorem is the parametrized version, used for l\'Hôpital',
      'Taylor\'s formula: with Peano remainder (local) or Lagrange remainder (global error estimate)',
    ],
    content: String.raw`

You drive from city A to city B, covering $100$ kilometres in $1$ hour, so the average speed is $100$ km/h. A traffic officer can issue a ticket without measuring your speed the whole way — because he knows that, since the average speed was so high, at some instant the instantaneous speed must have reached or exceeded it. This is the everyday prototype of Lagrange's mean value theorem: the total change of a function over an interval equals the instantaneous rate at some point multiplied by the length of the interval.

Motivating question: why must a function whose derivative vanishes everywhere be constant? The mean value theorem settles it in one stroke.

## 2. Rigorous Definitions

**Rolle's theorem.** If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a) = f(b)$, then there is $\xi \in (a,b)$ with $f'(\xi) = 0$.

**Lagrange mean value theorem.** If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there is $\xi \in (a,b)$ with

$$f(b) - f(a) = f'(\xi)\,(b - a)$$

**Cauchy mean value theorem.** If $f,g$ are continuous on $[a,b]$, differentiable on $(a,b)$, and $g'(x) \neq 0$, then there is $\xi \in (a,b)$ with

$$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(\xi)}{g'(\xi)}$$

**Taylor's formula (with Lagrange remainder).** If $f$ is $n+1$ times differentiable near $x_0$, then

$$f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \frac{f^{(n+1)}(\xi)}{(n+1)!}(x - x_0)^{n+1}$$

## 3. Why Define It This Way

Rolle's theorem requires $f(a)=f(b)$ because then the chord joining the endpoints is horizontal; if the graph bulges up or sags down in between, there must be a point where the slope vanishes (a vertex). Lagrange's theorem is Rolle's theorem "viewed at an angle": take the chord slope $(f(b)-f(a))/(b-a)$ as the horizontal reference and construct the auxiliary function $F(x) = f(x) - f(a) - \frac{f(b)-f(a)}{b-a}(x-a)$, so that $F(a)=F(b)=0$; applying Rolle to $F$ gives the result.

Cauchy's theorem compares two functions in "parametrized" fashion and is the theoretical basis of l'Hôpital's rule.

The heart of Taylor's formula is approximating a function by a polynomial: the remainder is the $(n+1)$-st derivative at some point times $(x-x_0)^{n+1}/(n+1)!$, which gives an exact estimate of the error (as opposed to the Peano remainder, which only states the order of magnitude).

## 4. Intuition and Pictures

> Lagrange's mean value theorem says: on a curve one can always find a point whose tangent is parallel to the chord joining the endpoints. In other words, the "overall average speed" is exactly hit somewhere by the "instantaneous speed."

| Theorem | Geometric picture | Key condition |
|------|----------|----------|
| Rolle | Chord horizontal, tangent at the vertex horizontal | Equal endpoint values |
| Lagrange | Tangent at some point ∥ chord | Endpoint values need not be equal |
| Cauchy | Tangent direction of the parametrized curve ∥ chord at some point | $g'\neq0$ |

Taylor's formula, meanwhile, is "fitting parabolas, cubics, ... onto the original function layer by layer"; the higher the order, the tighter the fit.

## 5. Worked Examples

### Example 1 (basic: proving a function is constant)

Problem: let $f$ be differentiable on $\mathbb{R}$ with $f'(x) \equiv 0$. Prove that $f$ is constant.

Solution: take any $a<b$. By Lagrange's mean value theorem there is $\xi\in(a,b)$ with $f(b)-f(a)=f'(\xi)(b-a)=0$, so $f(b)=f(a)$. Every two points have equal values, hence $f$ is constant.

### Example 2 (intermediate: a limit of l'Hôpital type)

Problem: find $\lim_{x\to 0} \frac{\sin x - x}{x^3}$.

Analysis: numerator and denominator both tend to $0$. Use the Taylor expansion $\sin x = x - x^3/6 + o(x^3)$, then
$$\frac{\sin x - x}{x^3} = \frac{-x^3/6 + o(x^3)}{x^3} \to -\frac{1}{6}$$
Here Taylor's formula is cleaner than repeated use of l'Hôpital's rule.

### Example 3 (advanced: estimating an inequality)

Problem: prove that $\ln(1+x) < x$ for every $x>0$.

Solution: let $f(t)=\ln(1+t)$ and apply Lagrange's mean value theorem on $[0,x]$: there is $\xi\in(0,x)$ with
$$\ln(1+x) - \ln 1 = \frac{1}{1+\xi}\cdot x < x$$
because $1/(1+\xi)<1$ when $\xi>0$. Q.E.D.

## 6. Common Errors and Pitfalls

- Error: assuming $\xi$ is the midpoint of the interval when using Lagrange's theorem. Correct: the location of $\xi$ is generally unknown; only its existence is guaranteed.
- Error: treating the mean point $\xi$ as a fixed value when estimating an inequality, and then getting the direction of the estimate backwards. Correct: check the direction in which $f'(\xi)$ is being bounded.
- Error: writing the remainder in Peano form and then using it to estimate a concrete numerical error. Correct: a numerical error estimate requires the Lagrange remainder.
- Error: allowing the denominator derivative in Cauchy's theorem to vanish. Correct: $g'(x)\neq 0$ on the interval is required.

## 7. Summary and Mnemonic

Key points:
- Rolle is a special case of Lagrange (equal endpoint values).
- Lagrange mean value theorem: $f(b)-f(a)=f'(\xi)(b-a)$, linking the global to the local.
- Cauchy's mean value theorem is the parametrized version underpinning l'Hôpital's rule.
- Taylor's formula with Lagrange remainder allows exact estimation of the approximation error.

**Mnemonic: the mean value theorem says "every overall change is hit instantaneously somewhere"; Taylor writes a function as a polynomial plus a remainder.**

Supplement: using the mean value theorem backwards is also important. If $f'(x)\ge 0$ holds everywhere, then for any $a<b$ Lagrange's theorem gives $\xi$ with $f(b)-f(a)=f'(\xi)(b-a)\ge 0$, so $f$ is nondecreasing. This is a standard trick: turning "the sign of the derivative" into "the monotonicity of the function."

Taylor's formula with Peano remainder $f(x)=\sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!}(x-x_0)^k + o((x-x_0)^n)$ only states that the remainder is of higher order than $(x-x_0)^n$, which suits local asymptotic analysis; the Lagrange remainder writes the error explicitly as the $(n+1)$-st derivative at some point, which suits numerical error estimates. The two serve different purposes and must be chosen accordingly. Geometric meaning of higher derivatives: the second derivative determines convexity, the third reflects how fast the convexity changes.`,
  },

  'integrals-ma': {
    chapter: 'Chapter 5 Integration',
    title: 'The Riemann Integral',
    summary:
      'Define the Riemann integral by "partition — approximate — sum — take the limit"; only functions that are "more or less continuous" can be integrated.',
    keyPoints: [
      'Darboux sums: upper sum S=Σ M_iΔx_i and lower sum s=Σ m_iΔx_i',
      'Integrable ⇔ the gap between upper and lower sums can be made arbitrarily small ⇔ the set of points with large oscillation can be covered by arbitrarily small intervals',
      'Continuous functions, monotone functions and functions with finitely many discontinuities are all integrable',
      'An integrable function must be bounded; Riemann integrable ⇔ continuous almost everywhere',
    ],
    content: String.raw`

To find the area of the curvilinear trapezoid under a curve $y = f(x)$ from $a$ to $b$, the ancients already had a method: cut $[a,b]$ into many thin vertical strips, approximate each strip by a rectangle, and add up all the rectangle areas; the finer the cut, the better the approximation, and the limit is the true area. This process of "subdivide indefinitely, sum, take the limit" is the Riemann integral. It makes "continuous summation" rigorous and is the stage on which the fundamental theorem of calculus performs.

Motivating question: why can the Dirichlet function (1 at rationals, 0 at irrationals) not be integrated? Read on and you will see.

## 2. Rigorous Definitions

**Partition.** Insert points $a = x_0 < x_1 < \cdots < x_n = b$ into $[a,b]$, write $\Delta x_i = x_i - x_{i-1}$ and $\lambda = \max_i \Delta x_i$ for the mesh. Choose points $\xi_i \in [x_{i-1}, x_i]$ in each subinterval.

**Riemann sum.** $S = \sum_{i=1}^{n} f(\xi_i)\,\Delta x_i$.

**Riemann integrable.** If, as $\lambda \to 0$, the Riemann sums tend to one and the same limit $I$ regardless of how we partition and how we choose the $\xi_i$, then $f$ is said to be Riemann integrable on $[a,b]$, written

$$\int_a^b f(x)\,\mathrm{d}x = I = \lim_{\lambda\to 0} \sum_{i=1}^{n} f(\xi_i)\,\Delta x_i$$

**Darboux sums.** Let $M_i = \sup_{[x_{i-1},x_i]} f$ and $m_i = \inf_{[x_{i-1},x_i]} f$; the upper sum is $\overline{S} = \sum M_i\Delta x_i$ and the lower sum $\underline{S} = \sum m_i\Delta x_i$.

## 3. Why Define It This Way

Defining the integral as a limit over "arbitrary partitions and arbitrary sample points" guarantees that the value does not depend on how we subdivide and sample — as long as the subdivision is fine enough, the result is stable. This is precisely the idea of a limit: arbitrary process, unique limit.

Equivalent characterization of integrability (Darboux's theorem): **$f$ is integrable $\iff$ for every $\varepsilon>0$ there is a partition with $\overline{S} - \underline{S} < \varepsilon$**. The gap between the upper and lower sums measures the "oscillation"; its tending to zero means the function "hardly wiggles anywhere."

Counterexample (not integrable): for the Dirichlet function $D(x)$, on any small interval $\sup D = 1$ and $\inf D = 0$, so the upper sum is always $b-a$ and the lower sum always $0$; the gap does not tend to zero and $D$ is not integrable. It "jumps at every point," which the Riemann integral cannot handle — precisely the motivation for the Lebesgue integral.

## 4. Intuition and Pictures

> The Riemann integral is like "cutting a cake vertically": every cut goes straight down and rectangular strips build up the area. If the cake's surface jitters madly (jumping everywhere), the height of the strips cannot be pinned down.

Criteria for integrability:

| Type of function | Riemann integrable? |
|----------|--------------|
| Continuous | Yes |
| Monotone | Yes |
| Only finitely many discontinuities | Yes |
| Bounded and continuous almost everywhere | Yes |
| Unbounded / jittering everywhere (e.g. $D(x)$) | No |

Important facts: an integrable function must be **bounded**; Riemann integrable $\iff$ the set of discontinuities has measure zero.

## 5. Worked Examples

### Example 1 (basic: integrating a power function from the definition)

Problem: use Riemann sums to compute $\int_0^1 x^2\,\mathrm{d}x$.

Solution: take the uniform partition $x_i = i/n$, $\Delta x_i = 1/n$, and $\xi_i = i/n$. The Riemann sum is
$$S_n = \sum_{i=1}^{n} \left(\frac{i}{n}\right)^2 \frac{1}{n} = \frac{1}{n^3}\sum_{i=1}^{n} i^2 = \frac{1}{n^3}\cdot\frac{n(n+1)(2n+1)}{6} \to \frac{1}{3}$$
so the integral is $1/3$.

### Example 2 (intermediate: Darboux sums decide integrability)

Problem: let $f$ be continuous on $[a,b]$. Prove that $f$ is integrable.

Analysis: a continuous function on a closed interval is uniformly continuous. Take any $\varepsilon>0$; there is $\delta>0$ such that $|x-y|<\delta$ implies $|f(x)-f(y)|<\varepsilon/(b-a)$. Take a partition with mesh $\lambda<\delta$; then on each subinterval the oscillation satisfies $\omega_i < \varepsilon/(b-a)$, hence $\overline{S}-\underline{S} \le \sum \omega_i\Delta x_i < \varepsilon$. By the Darboux criterion $f$ is integrable.

### Example 3 (advanced: bounded but with too many discontinuities)

Problem: show that $f(x)=1$ for rational $x$ and $0$ for irrational $x$ is not integrable on $[0,1]$.

Solution: every small interval contains both rationals and irrationals, so $M_i=1$ and $m_i=0$; the gap between upper and lower sums is always $1$ and does not tend to $0$, so $f$ is not integrable. Comment: integrability requires the "bad points" to be few enough (of measure zero).

## 6. Common Errors and Pitfalls

- Error: believing that unbounded functions can also be Riemann integrated. Correct: Riemann integrability implies boundedness.
- Error: taking Riemann sums with right endpoints only and treating that as the definition. Correct: the definition demands the same limit for arbitrary sample points; a special choice is only a special case.
- Error: confusing the upper and lower sums. Correct: the upper sum uses suprema and the lower sum infima, and only when the gap tends to zero is the function integrable.
- Error: thinking only finitely many continuity points is enough for integrability. Correct: a countable, even measure-zero, set of discontinuities is allowed.

## 7. Summary and Mnemonic

Key points:
- Riemann integral = partition, approximate, sum, take the limit.
- Darboux criterion: the gap between upper and lower sums can be made arbitrarily small $\iff$ integrable.
- Continuous, monotone and finitely discontinuous functions are integrable; integrable $\iff$ continuous almost everywhere and necessarily bounded.
- Functions that jitter everywhere (Dirichlet) cannot be Riemann integrated and need the Lebesgue integral.

**Mnemonic: cut vertically, sum, take the limit; the gap between upper and lower sums must vanish; functions that jitter too much cannot be integrated.**

Supplement: the mean value theorem for integrals is the integral version of Lagrange's theorem: if $f$ is continuous on $[a,b]$, then there is $\xi\in[a,b]$ with $\int_a^b f = f(\xi)(b-a)$, that is, "some point attains the average value." More generally, the first mean value theorem states that if $g\ge 0$ then $\int fg = f(\xi)\int g$.

The linearity of the Riemann integral is often overlooked yet extremely useful: $\int (af+bg) = a\int f + b\int g$, together with additivity over intervals $\int_a^b = \int_a^c + \int_c^b$. Combined with preservation of sign (if $f\ge 0$ then the integral is $\ge 0$) and the absolute value inequality $|\int f| \le \int |f|$, these allow estimates of integrals. They are basic tools in proof problems and should be second nature.`,
  },

  'integral-apps-ma': {
    chapter: 'Chapter 6 Applications of the Definite Integral',
    title: 'Applications of Definite Integrals and Improper Integrals',
    summary:
      'Treat the definite integral as "continuous summation": area, arc length, volume and solids of revolution all come from one formula, while improper integrals handle infinite intervals and singularities.',
    keyPoints: [
      'Element method: first write the quantity as a differential dV, dL and then integrate',
      'Formulas for planar area, volume of a solid of revolution and arc length of a curve',
      'Improper integrals are defined by taking limits; absolute convergence is stronger than convergence',
      'Comparison test and Cauchy test decide convergence of improper integrals',
    ],
    content: String.raw`

The essence of the definite integral $\int_a^b f(x)\,\mathrm{d}x$ is "adding up infinitely many infinitesimals." Since it is a summing machine, any quantity describable as "take an element, then accumulate" can be written as an integral. The area of a plane figure, the length of a curve, the volume of a solid of revolution, even the centre of mass of a thin rod — the recipe is identical: find the right element $\mathrm{d}V$, $\mathrm{d}L$, $\mathrm{d}A$ and the integral gives the total. This is the "element method."

Motivating question: if the interval of integration is infinite (e.g. $[1,+\infty)$), or the function blows up at an endpoint (e.g. $1/\sqrt{x}$ at $0$), can we still integrate? The second half of this section answers that.

## 2. Rigorous Definitions

**Element method.** If the increment of a quantity $Q$ over a small interval $[x, x+\mathrm{d}x]$ can be written as $\mathrm{d}Q = f(x)\,\mathrm{d}x + o(\mathrm{d}x)$, then the total is $Q = \int_a^b f(x)\,\mathrm{d}x$.

**Area of a plane figure.** The area bounded by $y=f(x)\ge 0$ and the $x$-axis:
$$A = \int_a^b f(x)\,\mathrm{d}x$$
Between two curves: $A = \int_a^b |f(x)-g(x)|\,\mathrm{d}x$.

**Volume of a solid of revolution** (about the $x$-axis): $V = \pi\int_a^b [f(x)]^2\,\mathrm{d}x$.

**Arc length of a curve** (parametric form $x(t),y(t)$):
$$L = \int_\alpha^\beta \sqrt{[x'(t)]^2 + [y'(t)]^2}\,\mathrm{d}t$$

**Improper integrals.** Infinite-interval type: $\int_a^{+\infty} f = \lim_{R\to\infty} \int_a^R f$; singularity type (singular point $c$): $\int_a^b f = \lim_{t\to c^+} \int_t^b f$ (convergent when the limit exists).

## 3. Why Define It This Way

The legitimacy of the element method comes from the integral's insensitivity to "higher-order small quantities": the $o(\mathrm{d}x)$ part of an increment disappears after summation and passage to the limit, so only the linear main part $\mathrm{d}Q$ needs to be kept.

The volume formula for a solid of revolution comes from "slicing the solid into thin discs," each approximately a cylinder of radius $f(x)$ and thickness $\mathrm{d}x$, with volume $\pi f(x)^2\mathrm{d}x$.

Counterexample (the conditions for improper integrals cannot be skipped): $\int_1^{+\infty} \frac{1}{x}\,\mathrm{d}x = \lim_{R\to\infty}\ln R = +\infty$ diverges, while $\int_1^{+\infty} \frac{1}{x^2}\,\mathrm{d}x = 1$ converges. A tiny difference in the exponent makes an enormous difference in convergence — so improper integrals must be judged separately, by their limit definition.

## 4. Intuition and Pictures

> The element method is like "slicing a sausage": each slice contributes a little, and all slices together give the weight of the whole sausage. Finding the right "weight formula" for each slice is the key.

| Quantity | Element | Integral formula |
|----|------|----------|
| Area | $\mathrm{d}A = f(x)\mathrm{d}x$ | $\int_a^b f$ |
| Volume of revolution | $\mathrm{d}V = \pi f^2\mathrm{d}x$ | $\pi\int_a^b f^2$ |
| Arc length | $\mathrm{d}L = \sqrt{1+(f')^2}\mathrm{d}x$ | $\int_a^b\sqrt{1+(f')^2}$ |

Convergence of improper integrals: for $\int_1^\infty x^{-p}\mathrm{d}x$, convergence holds if and only if $p>1$; for the singularity integral $\int_0^1 x^{-p}\mathrm{d}x$, convergence holds if and only if $p<1$.

## 5. Worked Examples

### Example 1 (basic: volume of a solid of revolution)

Problem: find the volume obtained by rotating $y = \sqrt{x}$ on $[0,1]$ about the $x$-axis.

Solution:
$$V = \pi\int_0^1 (\sqrt{x})^2\,\mathrm{d}x = \pi\int_0^1 x\,\mathrm{d}x = \pi\cdot\frac{1}{2} = \frac{\pi}{2}$$

### Example 2 (intermediate: arc length of a curve)

Problem: find the arc length of a stretch of the catenary $y = \frac{1}{2}(e^x + e^{-x})$ from $0$ to $1$.

Analysis: $y' = \frac{1}{2}(e^x - e^{-x})$, so $1+(y')^2 = \frac{1}{4}(e^x+e^{-x})^2 = y^2$. The arc length is
$$L = \int_0^1 \sqrt{1+(y')^2}\,\mathrm{d}x = \int_0^1 y\,\mathrm{d}x = \frac{1}{2}(e + e^{-1} - 2)$$

### Example 3 (advanced: convergence of an improper integral)

Problem: decide the convergence of $\int_0^1 \frac{1}{\sqrt{x}}\,\mathrm{d}x$.

Solution: this is a singularity integral (singular point $0$).
$$\int_0^1 x^{-1/2}\,\mathrm{d}x = \lim_{t\to 0^+} \int_t^1 x^{-1/2}\,\mathrm{d}x = \lim_{t\to 0^+} 2(1 - \sqrt{t}) = 2$$
The limit exists, so the integral converges, with value $2$. Comment: here $p=1/2<1$, matching the convergence condition for singularity integrals.

## 6. Common Errors and Pitfalls

- Error: writing the arc length element as $\mathrm{d}L = f'(x)\mathrm{d}x$. Correct: it should be $\sqrt{1+(f')^2}\,\mathrm{d}x$.
- Error: omitting the factor $\pi$ in the volume of a solid of revolution. Correct: the volume of a cylinder contains $\pi r^2$.
- Error: believing that $\int_1^\infty 1/x\,\mathrm{d}x$ converges because $1/x\to0$. Correct: it diverges; "tending to zero" is not enough to guarantee convergence.
- Error: substituting infinity directly into an improper integral. Correct: it must be handled via the limit definition.

## 7. Summary and Mnemonic

Key points:
- Element method: find the element $\mathrm{d}A$, $\mathrm{d}V$, $\mathrm{d}L$ first, then integrate.
- The area formula, the volume of a solid of revolution and the arc length formula each have their own element.
- Improper integrals are defined by limits; absolute convergence is stronger than conditional convergence.
- The comparison test and the $p$-test decide convergence quickly.

**Mnemonic: find the element, then integrate; total up like slicing a sausage; for improper integrals take the limit first, then the value.**`,
  },

  'uniform-convergence': {
    chapter: 'Chapter 7 Series of Functions',
    title: 'Uniform Convergence',
    summary:
      'Pointwise convergence is not enough: uniform convergence guarantees that limit operations (limits, integrals, derivatives) may be interchanged — it is the "licence" of analysis.',
    keyPoints: [
      'Uniform convergence = the sup deviation tends to 0, and the choice of N does not depend on x',
      'Three preservation properties: continuity, integrability, differentiability (differentiation needs the derivative series to converge uniformly)',
      'x^n on [0,1]: the standard counterexample of pointwise convergence without preservation of continuity',
      'Weierstrass M-test: if the dominating series converges, the series of functions converges uniformly',
    ],
    content: String.raw`

Imagine a sequence of functions $\{f_n\}$, each very smooth, "converging" to some limit function $f$. But if the convergence is merely "pointwise" — each fixed $x$ approaches slowly on its own — these $f_n$ may approach at different rates at different places. The result is bad: each $f_n$ is continuous, yet the limit $f$ may break into pieces; each $f_n$ is integrable, yet the limit of the integrals need not equal the integral of the limit. We need a stronger form of convergence in which the whole curve collapses onto $f$ "simultaneously and in step" — that is uniform convergence.

Motivating question: why does $x^n$ on $[0,1]$ "converge yet fail to preserve continuity"? This section answers it.

## 2. Rigorous Definitions

**Definition (uniform convergence).** Let $\{f_n\}$ and $f$ be defined on $D$. If

$$\forall \varepsilon > 0,\ \exists N,\ \text{such that for } n > N,\ \forall x \in D:\ \big|f_n(x) - f(x)\big| < \varepsilon$$

then $\{f_n\}$ is said to **converge uniformly** to $f$ on $D$, written $f_n \rightrightarrows f$.

**Criterion**:

$$f_n \rightrightarrows f \quad\Longleftrightarrow\quad \sup_{x \in D}\big|f_n(x) - f(x)\big| \to 0$$

**Series of functions** $\sum u_n(x)$ are treated as the uniform convergence of the sequence of partial sums $S_n = \sum_{k=1}^n u_k(x)$.

**Weierstrass M-test**: if $|u_n(x)| \le a_n$ (for all $x\in D$) and $\sum a_n$ converges, then $\sum u_n(x)$ converges uniformly.

## 3. Why Define It This Way

The only difference from pointwise convergence is the order of the quantifiers: pointwise convergence is "$\forall x\ \exists N$" ($N$ may vary with $x$), whereas uniform convergence is "$\exists N\ \forall x$" (a single $N$ works for all $x$). Uniform convergence requires one $N$ to subdue every location at once, which is exactly what "simultaneous approximation" means.

The supremum characterization is the most intuitive: as long as the largest deviation tends to zero, everything is under control everywhere. The idea of the M-test is to trap the whole series of functions under a "dominating series" $a_n$ independent of $x$; since the numerical series converges, the series of functions converges, and uniformly.

Counterexample (the price of non-uniform convergence): $f_n(x) = x^n$ on $[0,1]$ has pointwise limit $f(x) = 0$ for $x<1$ and $1$ for $x=1$, but $\sup |x^n - f(x)| = 1$ does not tend to $0$, so the convergence is not uniform. Consequence: each $f_n$ is continuous, yet the limit is not — continuity cannot be passed to a pointwise limit.

## 4. Intuition and Pictures

> Picture each $f_n$ as a rubber band: uniform convergence means all the bands settle onto the target curve $f$ in one rhythm; pointwise convergence means each is slack or tight in its own way, and the final result may be wrinkled and broken.

| Property | Pointwise convergence | Uniform convergence |
|------|----------|----------|
| Does $N$ depend on $x$? | Yes | No |
| Preserves continuity | No | Yes |
| Preserves integrals (interchange limit and integral) | No | Yes |
| Preserves differentiability (with extra hypotheses) | No | Yes |

## 5. Worked Examples

### Example 1 (basic: deciding uniform convergence with sup)

Problem: decide whether $f_n(x) = \frac{x}{n+x}$ converges uniformly to $0$ on $[0,1]$.

Solution: $|f_n(x)| = \frac{x}{n+x} \le \frac{1}{n}$ (since $x\le 1$), so $\sup_{[0,1]} |f_n| \le 1/n \to 0$; the convergence to $0$ is uniform.

### Example 2 (intermediate: the M-test)

Problem: prove that $\sum_{n=1}^\infty \frac{\sin(nx)}{n^2}$ converges uniformly on $\mathbb{R}$.

Analysis: for every $x$, $|\sin(nx)/n^2| \le 1/n^2$, and $\sum 1/n^2$ converges. By the Weierstrass M-test the series converges uniformly.

### Example 3 (advanced: failure to transfer continuity)

Problem: show that $f_n(x)=x^n$ converges pointwise but not uniformly on $[0,1]$, and point out the consequence.

Solution: the limit $f(x)=0$ for $x<1$ and $1$ for $x=1$ is discontinuous at $x=1$. If the convergence were uniform, continuity would be transferred, a contradiction; hence it is not uniform. This shows that without uniform convergence, "interchanging the limit and evaluation" fails.

## 6. Common Errors and Pitfalls

- Error: mistaking pointwise convergence for uniform convergence. Correct: the quantifier order differs, and uniform convergence is strictly stronger.
- Error: believing that the limit of a uniformly convergent sequence is necessarily differentiable. Correct: continuity and integrability are preserved; differentiability also needs the derivative series to converge uniformly.
- Error: using a dominating series that depends on $x$ in the M-test. Correct: the dominating terms $a_n$ must be independent of $x$.
- Error: ignoring the domain. Correct: uniform convergence is a property "on a set $D$," and it may fail on a larger set.

## 7. Summary and Mnemonic

Key points:
- Uniform convergence = the sup deviation tends to $0$, and the choice of $N$ is independent of $x$.
- Three preservation properties: continuity, integrability, differentiability (differentiation needs uniform convergence of the derivative series).
- $x^n$ on $[0,1]$: the standard counterexample of pointwise convergence failing to transfer continuity.
- Weierstrass M-test: a convergent dominating series makes the series of functions converge uniformly.

**Mnemonic: uniform convergence looks at the sup, one N rules them all; continuity and integrals are preserved, differentiation still needs a uniform derivative.**

Supplement: uniform convergence of series also has the Dirichlet and Abel tests. Dirichlet requires the partial sums $\sum_{k=1}^n a_k(x)$ to be uniformly bounded while $b_n(x)$ is monotone in $x$ for each $x$ and tends uniformly to $0$; Abel requires $\sum a_n$ to converge uniformly and $\{b_n\}$ to be uniformly bounded and monotone. They handle alternating or product-type series and are the mainstays beyond the M-test.

The relation between uniform and pointwise convergence can be understood through function spaces: regard each $f_n$ as a point in some space; uniform convergence is convergence in the "supremum norm," far stronger than pointwise convergence. Under uniform convergence, continuity, Riemann integrability and (when the derivative series converges uniformly) differentiability are all inherited by the limit function — this is the reliable basis for interchanging limits in analysis.`,
  },

  'parameter-integrals': {
    chapter: 'Chapter 8 Integrals Depending on a Parameter',
    title: 'Integrals Depending on a Parameter',
    summary:
      'When the integrand carries a parameter: when may we "pull out" the parameter under the integral sign and differentiate? The Γ and B functions are the crown of this theory.',
    keyPoints: [
      'Differentiation under the integral sign: enough that the integrand and its partial derivative are continuous',
      'Interchanging the order of integration: absolute integrability is the safe passport',
      'Γ(n+1)=n!; Γ(½)=√π; B(p,q)=Γ(p)Γ(q)/Γ(p+q)',
      'The parameter method (introduce a parameter, then differentiate) is a sharp tool for difficult integrals',
    ],
    content: String.raw`

An ordinary definite integral $\int_a^b f(x)\,\mathrm{d}x$ evaluates to a number. But if the integrand also hides a parameter $t$, say $I(t) = \int_a^b f(x,t)\,\mathrm{d}x$, then each choice of $t$ gives an integral value, so $I$ becomes a function of $t$. Natural questions follow: is this function continuous? Can it be differentiated? Can integration and differentiation be interchanged? The theory of parameter integrals answers exactly these questions — it lets us pull the parameter $t$ out from under the integral sign and differentiate it like a constant, turning a hard integral into a differential equation to be solved.

Motivating question: how is $\int_0^\infty \frac{\sin x}{x}\,\mathrm{d}x$, an integral with no elementary antiderivative, shown to equal $\pi/2$? The end of this section reveals it.

## 2. Rigorous Definitions

**Differentiation under the integral sign (proper integrals).** Let $f(x,t)$ and $\frac{\partial f}{\partial t}$ be continuous on $[a,b]\times[c,d]$. Then

$$I(t) = \int_a^b f(x,t)\,\mathrm{d}x$$

is differentiable on $[c,d]$, and

$$I'(t) = \int_a^b \frac{\partial f}{\partial t}(x,t)\,\mathrm{d}x$$

**Interchanging the order of integration.** If $f$ is continuous on the rectangle (or nonnegative and measurable), then

$$\int_c^d\int_a^b f(x,t)\,\mathrm{d}x\,\mathrm{d}t = \int_a^b\int_c^d f(x,t)\,\mathrm{d}t\,\mathrm{d}x$$

For improper integrals, unconditional interchange requires absolute integrability (that is, $\iint |f| < \infty$).

## 3. Why Define It This Way

Integration is "infinite summation," and differentiating a finite sum term by term is legitimate; the point is that continuity ensures the limit can pass through the integral sign. The hypothesis that the partial derivative is continuous is exactly what allows the two limits — differentiation and integration — to be interchanged by uniform convergence.

Counterexample (missing hypotheses cause errors): if $\partial_t f$ is discontinuous or the control for an improper integral is missing, interchanging the order may give a wrong result. Hence in the improper case one needs a "dominating function" $g(x)$ with $|\partial_t f| \le g(x)$ and $\int g < \infty$.

**The Γ function**: $\Gamma(s) = \int_0^\infty x^{s-1}e^{-x}\,\mathrm{d}x\ (s>0)$. The recursion $\Gamma(s+1)=s\Gamma(s)$ with $\Gamma(1)=1$ gives $\Gamma(n+1)=n!$; $\Gamma(1/2)=\sqrt{\pi}$.

**The B function**: $B(p,q) = \int_0^1 x^{p-1}(1-x)^{q-1}\,\mathrm{d}x\ (p,q>0)$, with $B(p,q)=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}$.

## 4. Intuition and Pictures

> Differentiation under the integral sign is like "treating the summation sign as transparent": since an integral is a sum, differentiating with respect to the parameter just sums the partial derivatives one by one. The premise is that "the limit of the sum" behaves well (continuity / uniform convergence).

A typical technique — the **parameter method**: to compute a hard integral $J$, first build a parametrized integral $F(t)=\int \cdots\,\mathrm{d}x$, differentiate with respect to $t$ to obtain something easy to integrate, then integrate and fix the constant with a boundary condition.

| Tool | Use |
|------|------|
| Differentiation under the integral sign | Turn an integral into a differential equation |
| Interchanging the order of integration | Simplify double integrals |
| Γ and B functions | Central limit theorem, normalizing probability densities |

## 5. Worked Examples

### Example 1 (basic: differentiation under the integral sign)

Problem: let $I(t) = \int_0^1 e^{tx}\,\mathrm{d}x$. Find $I'(t)$.

Solution: the integrand and the partial derivative $x e^{tx}$ are continuous, so
$$I'(t) = \int_0^1 x e^{tx}\,\mathrm{d}x$$
A direct computation confirms it: $I(t) = (e^t - 1)/t$ and $I'(t) = (te^t - e^t + 1)/t^2$, in agreement with the integral.

### Example 2 (intermediate: the parameter method)

Problem: compute $J = \int_0^1 \frac{x-1}{\ln x}\,\mathrm{d}x$.

Analysis: introduce $I(t) = \int_0^1 \frac{x^t - 1}{\ln x}\,\mathrm{d}x$, so that $J = I(1)$. Differentiating:
$$I'(t) = \int_0^1 x^t\,\mathrm{d}x = \frac{1}{t+1}$$
Integrating gives $I(t) = \ln(t+1) + C$; from $I(0)=0$ we get $C=0$, hence $J = I(1) = \ln 2$.

### Example 3 (advanced: the Dirichlet integral)

Problem: prove that $\int_0^\infty \frac{\sin x}{x}\,\mathrm{d}x = \frac{\pi}{2}$.

Solution: let $F(t) = \int_0^\infty e^{-tx}\frac{\sin x}{x}\,\mathrm{d}x\ (t>0)$. Differentiating with respect to $t$ (legitimacy can be shown):
$$F'(t) = -\int_0^\infty e^{-tx}\sin x\,\mathrm{d}x = -\frac{1}{1+t^2}$$
Integrating gives $F(t) = C - \arctan t$; from $F(t)\to 0$ as $t\to\infty$ we get $C = \pi/2$, hence $F(t) = \frac{\pi}{2} - \arctan t$. Letting $t\to 0^+$ gives the original integral $= \pi/2$.

## 6. Common Errors and Pitfalls

- Error: differentiating under the integral sign without checking that the partial derivative is continuous. Correct: confirm that $f$ and $\partial_t f$ are continuous (or that an improper integral is dominated).
- Error: interchanging the order of integration for improper integrals at will. Correct: absolute integrability is the "safe passport."
- Error: writing the Γ recursion as $\Gamma(s+1)=\Gamma(s)$. Correct: it should be $s\Gamma(s)$.
- Error: integrating $I'(t)$ and forgetting the boundary condition. Correct: fixing the constant requires an initial value such as $I(0)$.

## 7. Summary and Mnemonic

Key points:
- Differentiation under the integral sign: continuity of the integrand and of its partial derivative suffices.
- Interchanging the order of integration: absolute integrability is the safe passport.
- $\Gamma(n+1)=n!$, $\Gamma(1/2)=\sqrt{\pi}$, $B(p,q)=\Gamma(p)\Gamma(q)/\Gamma(p+q)$.
- The parameter method (introduce a parameter, then differentiate) is a sharp tool for difficult integrals.

**Mnemonic: you may differentiate under the integral sign, but first check the partial derivative is continuous; the parameter method builds an equation, and Γ and B are the two crowns.**`,
  },

  'multivariable-ma': {
    chapter: 'Chapter 9 Differential Calculus of Functions of Several Variables',
    title: 'Differential Calculus of Several Variables',
    summary:
      'Partial derivatives, total differentials and the chain rule upgrade the one-variable "tangent line" to a "tangent plane" and a "gradient direction."',
    keyPoints: [
      'Partial derivative = the one-variable derivative with all other variables held fixed',
      'A total differential exists ⇒ all partial derivatives exist and the function is differentiable; conversely continuity of the partial derivatives ⇒ differentiability',
      'Chain rule: differentiating a composite function accumulates contributions along every path',
      'The gradient points in the direction of the greatest directional derivative; a necessary condition for an extremum is a zero gradient',
    ],
    content: String.raw`

A one-variable function changes in only one direction; a function of several variables (say the terrain height $f(x,y)$) changes at different rates in different directions — walking east may be gentle, walking north may be steep. The notion of a "derivative" therefore splits in two: holding the other variables fixed and moving only one gives the **partial derivative**; considering the overall linear approximation in all directions at once gives the **total differential**. The gradient, in turn, points in the direction of steepest ascent. This lecture upgrades the one-variable tangent line to a multivariable tangent plane.

Motivating question: why are there functions whose partial derivatives all exist and yet which are not differentiable (have no tangent plane)? After reading you will know.

## 2. Rigorous Definitions

**Partial derivatives.** Let $z = f(x,y)$ be defined in a neighbourhood of $(x_0,y_0)$,

$$\frac{\partial f}{\partial x}(x_0,y_0) = \lim_{h\to 0} \frac{f(x_0+h,y_0) - f(x_0,y_0)}{h}$$

and the partial derivative with respect to $y$ is defined similarly.

**Total differential.** If the increment

$$\Delta z = f(x_0+h, y_0+k) - f(x_0,y_0) = A h + B k + o(\sqrt{h^2+k^2})$$

then $f$ is said to be differentiable at $(x_0,y_0)$, and $\mathrm{d}z = f_x\,\mathrm{d}x + f_y\,\mathrm{d}y$.

**Directional derivative.** Along the unit vector $\mathbf{u}=(\cos\theta,\sin\theta)$ the directional derivative is

$$\frac{\partial f}{\partial \mathbf{u}} = \nabla f \cdot \mathbf{u},\qquad \nabla f = (f_x, f_y)$$

## 3. Why Define It This Way

A partial derivative measures only the rate of change "along a coordinate axis," so the information is incomplete. The total differential requires a linear map $(h,k)\mapsto Ah+Bk$ that approximates the increment with a remainder of higher order than the distance $\sqrt{h^2+k^2}$ — far stronger than "the partial derivatives exist separately."

Chain of implications: **continuous partial derivatives $\Rightarrow$ differentiable $\Rightarrow$ all partial derivatives exist**; none of the arrows reverses.

Counterexample (partial derivatives exist but the function is not differentiable): $f(x,y) = \frac{xy}{\sqrt{x^2+y^2}}$ for $(x,y)\neq 0$ and $f(0,0)=0$. One easily computes $f_x(0,0)=f_y(0,0)=0$, but along the direction $y=x$, $\Delta f / \sqrt{2h^2} = h^2/( \sqrt{2}|h|\cdot \sqrt{2}|h|) = 1/2$ does not tend to $0$, so $f$ is not differentiable — there is no unique tangent plane.

## 4. Intuition and Pictures

> Differentiable = the surface can be pressed flat by a single plane (the tangent plane) at that point; the existence of partial derivatives only says there are tangent lines along the two coordinate axes, but the sheet of paper need not be flat.

| Condition | Implies | Counterexample note |
|------|------|----------|
| Continuous partial derivatives | Differentiable | Strongest |
| Differentiable | Partial derivatives exist, function continuous | Differentiable need not have continuous partials |
| Partial derivatives exist | Only derivatives along the two axes | Need not be differentiable |

Chain rule: if $z=f(x,y)$ with $x=x(t),y=y(t)$, then
$$\frac{\mathrm{d}z}{\mathrm{d}t} = f_x\,x'(t) + f_y\,y'(t)$$
For a multivariable composite, contributions accumulate along every path.

## 5. Worked Examples

### Example 1 (basic: computing partial derivatives)

Problem: let $f(x,y) = x^2 y + e^{xy}$. Find $f_x$ and $f_y$.

Solution: differentiating with respect to $x$ (treating $y$ as a constant) gives $f_x = 2xy + y e^{xy}$; with respect to $y$, $f_y = x^2 + x e^{xy}$.

### Example 2 (intermediate: the chain rule)

Problem: let $z = f(x,y)$ with $x = r\cos\theta$, $y = r\sin\theta$. Find $\partial z/\partial r$.

Analysis: by the chain rule
$$\frac{\partial z}{\partial r} = f_x \cos\theta + f_y \sin\theta$$
which is the directional derivative in the radial direction.

### Example 3 (advanced: necessary condition for an extremum)

Problem: let $f$ attain an extremum at an interior point $(x_0,y_0)$ and be differentiable there. Prove that $\nabla f = 0$.

Solution: if $f$ has an extremum, then the one-variable functions $\phi(t)=f(x_0+t, y_0)$ and $\psi(t)=f(x_0, y_0+t)$ both have an extremum at $0$, so $\phi'(0)=f_x=0$ and $\psi'(0)=f_y=0$, i.e. the gradient vanishes. Comment: a stationary point is necessary but not sufficient for an extremum (saddle points satisfy it too).

## 6. Common Errors and Pitfalls

- Error: believing that the existence of partial derivatives implies differentiability. Correct: a total differential requires differentiability (or continuous partial derivatives).
- Error: writing the chain rule with only one term. Correct: for a multivariable composite, contributions accumulate along the paths of all independent variables.
- Error: treating a stationary point directly as an extremum. Correct: a second-order test (the Hessian) is needed to distinguish maximum, minimum and saddle.
- Error: writing the directional derivative as $\nabla f$ without normalizing. Correct: the direction vector must have unit length.

## 7. Summary and Mnemonic

Key points:
- Partial derivative = the one-variable derivative with the other variables fixed.
- Existence of the total differential ⇒ the partial derivatives exist; continuous partial derivatives ⇒ differentiable (the converse fails).
- Chain rule: differentiating a composite function accumulates along all paths.
- The gradient direction maximizes the directional derivative; a necessary condition for an extremum is a zero gradient.

**Mnemonic: partials look at the two axes, the total differential at the tangent plane; the gradient points steepest, a stationary point is not necessarily an extremum.**

Supplement: higher-order and mixed partial derivatives are independent of the order of differentiation under continuity (Clairaut's theorem): if $f_{xy}$ and $f_{yx}$ are continuous in a neighbourhood, then $f_{xy}=f_{yx}$. This frees us from worrying about order when computing second partials.

The implicit function theorem is the summit of multivariable calculus: the equation $F(x,y)=0$ locally determines a differentiable function $y=y(x)$ where $F_y\neq 0$, with $\frac{\mathrm{d}y}{\mathrm{d}x}=-\frac{F_x}{F_y}$. This is read directly from the total differential $\mathrm{d}F=F_x\mathrm{d}x+F_y\mathrm{d}y=0$. In several variables it generalizes to: how many implicit functions a system determines depends on whether the Jacobian matrix has full rank. The gradient $\nabla f$ is perpendicular to the level curves and points in the direction of fastest growth, and its magnitude is the maximal directional derivative.`,
  },

  'multiple-integrals-ma': {
    chapter: 'Chapter 10 Multiple, Line and Surface Integrals',
    title: 'Multiple, Line and Surface Integrals',
    summary:
      'Double and triple integrals accumulate "volume elements" and change variables via the Jacobian; line and surface integrals move integration onto paths and surfaces.',
    keyPoints: [
      'Double integrals reduce to iterated integrals (Fubini, in the continuous case)',
      'Polar, cylindrical and spherical substitutions all require the Jacobian factor',
      'Line and surface integrals of the first kind are with respect to arc length and area element; the second kind with respect to coordinates',
      'Green, Gauss and Stokes connect the three kinds of integrals with the boundary',
    ],
    content: String.raw`

A one-variable definite integral accumulates along a line; a double integral "tiles a plane region with small squares" and accumulates heights to give a volume; a triple integral "cuts space into small cubes" and accumulates density to give total mass. Even better, integration is not confined to planes and solids — one can also integrate along a curve (summing linear density to get mass) or over a surface (summing flux to get flow). When changing coordinate systems (polar, spherical), remember that the area or volume of the small pieces changes; the correction factor is the Jacobian determinant.

Motivating question: why is the area element in polar coordinates $r\,\mathrm{d}r\,\mathrm{d}\theta$ rather than $\mathrm{d}r\,\mathrm{d}\theta$? This section explains it.

## 2. Rigorous Definitions

**Double integral.** When $f$ is integrable over a closed region $D$,
$$\iint_D f(x,y)\,\mathrm{d}x\,\mathrm{d}y = \lim_{\lambda\to 0}\sum f(\xi_i,\eta_i)\,\Delta \sigma_i$$

**Iterated integral (Fubini).** If $f$ is continuous (or absolutely integrable),
$$\iint_D f = \int_a^b\left(\int_{\varphi_1(x)}^{\varphi_2(x)} f(x,y)\,\mathrm{d}y\right)\mathrm{d}x$$

**Polar change of variables.** $x = r\cos\theta,\ y = r\sin\theta$, with area element
$$\mathrm{d}x\,\mathrm{d}y = r\,\mathrm{d}r\,\mathrm{d}\theta$$

**Triple integral in spherical coordinates.** $x=\rho\sin\phi\cos\theta$, etc., with volume element $\rho^2\sin\phi\,\mathrm{d}\rho\,\mathrm{d}\phi\,\mathrm{d}\theta$.

**Line integral of the first kind** (with respect to arc length): $\int_L f\,\mathrm{d}s$; **of the second kind** (with respect to coordinates): $\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y$.

## 3. Why Define It This Way

The double integral is the Riemann sum generalized to the plane: cut the region into small pieces $\Delta\sigma_i$, multiply the height $f$ by the area, sum, and take the limit.

Under a change of variables, the Jacobian determinant $J = \frac{\partial(x,y)}{\partial(u,v)}$ describes "the stretching factor of a small piece after the coordinate grid deforms." In polar coordinates, the piece bounded by the radial difference $\mathrm{d}r$ and the angular difference $\mathrm{d}\theta$ is approximately a rectangle with sides $\mathrm{d}r$ and $r\,\mathrm{d}\theta$, so the area is $r\,\mathrm{d}r\,\mathrm{d}\theta$ — that $r$ is the Jacobian factor; the farther from the origin, the larger the area opened up by the same angle.

Counterexample (forgetting the Jacobian factor gives a wrong answer): using $\mathrm{d}x\mathrm{d}y = \mathrm{d}r\mathrm{d}\theta$ for the area of the unit disc gives $\int_0^{2\pi}\int_0^1\mathrm{d}r\mathrm{d}\theta = 2\pi$, which is wrong; multiplying by $r$ correctly gives $\pi$.

## 4. Intuition and Pictures

> Changing coordinates is like changing to a "deforming ruler": the cells you measure change size, so you must multiply by the Jacobian factor to compensate, or the total is distorted.

| Integral | Element | Typical application |
|------|------|----------|
| Double | $f\,\mathrm{d}x\mathrm{d}y$ | Mass and area of a plane lamina |
| Triple | $f\,\mathrm{d}x\mathrm{d}y\mathrm{d}z$ | Mass of a solid body |
| Line, first kind | $f\,\mathrm{d}s$ | Arc length, linear density |
| Line, second kind | $P\mathrm{d}x+Q\mathrm{d}y$ | Work done by a variable force along a path |

Link to the three great formulas: Green (plane), Gauss (space) and Stokes (surface) relate an integral over a region to an integral over its boundary.

## 5. Worked Examples

### Example 1 (basic: area in polar coordinates)

Problem: find the area of the unit disc $x^2+y^2\le 1$.

Solution:
$$A = \iint_{x^2+y^2\le 1} 1\,\mathrm{d}x\mathrm{d}y = \int_0^{2\pi}\int_0^1 r\,\mathrm{d}r\,\mathrm{d}\theta = 2\pi\cdot\frac{1}{2} = \pi$$

### Example 2 (intermediate: triple integral in spherical coordinates)

Problem: find the volume of the ball $x^2+y^2+z^2\le R^2$.

Analysis: in spherical coordinates,
$$V = \int_0^{2\pi}\int_0^\pi\int_0^R \rho^2\sin\phi\,\mathrm{d}\rho\mathrm{d}\phi\mathrm{d}\theta = 2\pi\cdot 2\cdot \frac{R^3}{3} = \frac{4}{3}\pi R^3$$

### Example 3 (advanced: Green's formula)

Problem: compute $\oint_L x\,\mathrm{d}y - y\,\mathrm{d}x$, where $L$ is the unit circle traversed counterclockwise.

Solution: by Green's formula, $\oint_L P\mathrm{d}x+Q\mathrm{d}y = \iint_D (Q_x - P_y)\,\mathrm{d}x\mathrm{d}y$ with $P=-y,\ Q=x$, so $Q_x-P_y = 1-(-1)=2$. The region $D$ has area $\pi$, so the integral equals $2\pi$.

## 6. Common Errors and Pitfalls

- Error: omitting the factor $r$ in polar coordinates. Correct: the area element must contain the factor $r$.
- Error: writing the spherical Jacobian as $\rho^2$ and omitting $\sin\phi$. Correct: it should be $\rho^2\sin\phi$.
- Error: ignoring orientation in a line integral of the second kind. Correct: reversing the direction changes the sign.
- Error: applying Green's formula on a region that is not simply connected or that contains singularities. Correct: no singularities may lie inside the region.

## 7. Summary and Mnemonic

Key points:
- Double integrals become iterated integrals (Fubini, in the continuous case).
- Polar, cylindrical and spherical substitutions all require the Jacobian factor.
- Line and surface integrals of the first kind are with respect to arc length and area element; the second kind with respect to coordinates.
- Green, Gauss and Stokes connect the three kinds of integrals with the boundary.

**Mnemonic: a change of variables always brings a Jacobian; polar adds r, spherical adds ρ²sinφ; boundary formulas tie the whole together.**`,
  },

  'fourier-series-ma': {
    chapter: 'Chapter 11 Fourier Series',
    title: 'Fourier Series',
    summary:
      'Decompose a periodic function into a superposition of sines and cosines: the Fourier coefficients are "projections," and convergence is policed by the Dirichlet conditions.',
    keyPoints: [
      'The Fourier coefficients a0, an, bn come from inner products (integrals)',
      'Orthogonality: sines and cosines of different frequencies have zero inner product over one period',
      'The Dirichlet conditions guarantee pointwise convergence to (f(x+)+f(x-))/2',
      'Parseval identity: energy = sum of the energies of the harmonics',
    ],
    content: String.raw`

The sound of a violin you hear is, in essence, a superposition of sine waves of different frequencies and amplitudes. In the nineteenth century Fourier boldly claimed that any (sufficiently well-behaved) periodic function can be written as an infinite sum of sines and cosines. It is like decomposing a colour into three primaries — the Fourier series decomposes a periodic signal into a superposition of "simple harmonic waves whose frequencies are integer multiples" of the fundamental. The amplitude coefficient of each harmonic is given by the "inner product" (integral) of the function with the corresponding sine or cosine; it is essentially a projection.

Motivating question: to what value does the Fourier series of a square wave converge at a jump point? This section gives the exact answer.

## 2. Rigorous Definitions

Let $f$ have period $2\pi$. Its **Fourier series** is

$$f(x) \sim \frac{a_0}{2} + \sum_{n=1}^{\infty} \big(a_n\cos nx + b_n\sin nx\big)$$

with coefficients (projections):

$$a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\cos nx\,\mathrm{d}x,\quad b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin nx\,\mathrm{d}x$$

**Orthogonality**: on $[-\pi,\pi]$, sines and cosines of different frequencies have pairwise "zero inner product":

$$\int_{-\pi}^{\pi} \cos mx\,\cos nx\,\mathrm{d}x = \begin{cases} 0 & m\neq n \\ \pi & m=n\neq 0 \end{cases}$$

**Dirichlet convergence theorem.** If $f$ is piecewise monotone on $[-\pi,\pi]$ with only finitely many discontinuities (the Dirichlet conditions), then its Fourier series converges at every point to

$$\frac{f(x^+) + f(x^-)}{2}$$

## 3. Why Define It This Way

The coefficient formula comes from "orthogonal projection": since the sines and cosines are mutually orthogonal, multiplying both sides by $\cos nx$ and integrating kills all the cross terms, leaving only the term of interest. This is exactly the continuous version of "expanding coordinates in an orthogonal basis" in a vector space.

The Dirichlet conditions ensure the function is "not too wild": piecewise monotone plus finitely many discontinuities rules out violent oscillation. At a jump discontinuity the series does not converge to the function value but to the average of the left and right limits — this is the mathematical statement of the Gibbs phenomenon.

Counterexample (unconditional divergence): if regularity is abandoned (say a pathological function discontinuous everywhere), the Fourier series may diverge everywhere. So the hypotheses of the convergence theorem are essential.

## 4. Intuition and Pictures

> The Fourier coefficients are like the faders on a mixing console: one fader per frequency, and a fader's height is set by the function's projection onto that frequency's sine. Low-frequency faders determine the overall outline, high-frequency faders the sharp detail.

| Concept | Meaning |
|------|------|
| Coefficients $a_n,b_n$ | Amplitudes (projections) of the harmonics at each frequency |
| Orthogonality | Different frequencies do not interfere, so coefficients are computed independently |
| Dirichlet conditions | Guarantee pointwise convergence to the mean of the one-sided limits |
| Parseval identity | Energy = sum of the energies of the harmonics |

## 5. Worked Examples

### Example 1 (basic: Fourier coefficients of a square wave)

Problem: let $f(x)=1$ for $0<x<\pi$, $f(x)=-1$ for $-\pi<x<0$, with period $2\pi$. Find its Fourier series.

Solution: $f$ is odd, so $a_n=0$. Compute
$$b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin nx\,\mathrm{d}x = \frac{2}{\pi}\int_0^\pi \sin nx\,\mathrm{d}x = \frac{2}{n\pi}(1-(-1)^n)$$
so the odd terms are $b_{2k-1}=4/((2k-1)\pi)$, and the series is $f(x) \sim \frac{4}{\pi}\sum_{k=1}^\infty \frac{\sin(2k-1)x}{2k-1}$.

### Example 2 (intermediate: the value at an endpoint)

Problem: to what value does the series in the previous example converge at $x=0$?

Analysis: by the Dirichlet theorem it converges to $(f(0^+)+f(0^-))/2 = (1+(-1))/2 = 0$. The square wave is "flattened" to the midpoint at the jump.

### Example 3 (advanced: the Parseval identity)

Problem: use the Parseval identity on Example 1 to find $\sum_{k=1}^\infty \frac{1}{(2k-1)^2}$.

Solution: Parseval gives $\frac{1}{\pi}\int_{-\pi}^\pi f^2 = \frac{a_0^2}{2}+\sum(a_n^2+b_n^2)$. The left side is $\frac{1}{\pi}\cdot 2\pi = 2$; the right side is $\sum_{k} \frac{16}{(2k-1)^2\pi^2}$. Hence $2 = \frac{16}{\pi^2}\sum\frac{1}{(2k-1)^2}$, giving $\sum = \pi^2/8$.

## 6. Common Errors and Pitfalls

- Error: writing the $a_0$ coefficient as a constant term without the factor $1/2$. Correct: the constant term is $a_0/2$.
- Error: misjudging parity and losing a whole family of coefficients. Correct: for an odd function $a_n=0$; for an even function $b_n=0$.
- Error: believing that at a jump point the series converges to the function value. Correct: it converges to the average of the one-sided limits.
- Error: forgetting the orthonormal factor $\pi$. Correct: the inner product must be divided by $\pi$ to give the coefficient.

## 7. Summary and Mnemonic

Key points:
- The Fourier coefficients $a_n,b_n$ come from inner products (integrals); they are projections in essence.
- Orthogonality: sines and cosines of different frequencies have zero inner product over one period.
- The Dirichlet conditions guarantee pointwise convergence to $(f(x^+)+f(x^-))/2$.
- Parseval identity: total energy = sum of the harmonic energies.

**Mnemonic: Fourier coefficients are projections, each independent on an orthogonal basis; at a jump the series takes the average, and Parseval conserves energy.**

Supplement: a Fourier series always converges in the $L^2$ sense (mean square convergence) to the original function; pointwise convergence needs the Dirichlet conditions. Near a jump discontinuity the partial sums "overshoot" — the Gibbs phenomenon: no matter how many terms are taken, the overshoot is about $9\%$ of the jump (about $0.0895$ times it) and does not disappear as the number of terms grows, it only narrows. This is an intrinsic feature of Fourier series, not a computational error.

Combined with odd and even extensions, a function on $[0,\pi]$ can produce a sine series (odd extension) or a cosine series (even extension), which is extremely common in the separation of variables used to solve partial differential equations. Remember: a sine series corresponds to homogeneous Dirichlet boundary conditions and a cosine series to homogeneous Neumann boundary conditions; the choice depends on the physical boundary conditions.`,
  },
};

export default map;
