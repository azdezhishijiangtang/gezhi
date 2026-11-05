import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'lebesgue-measure': {
    chapter: 'Chapter 1 Lebesgue Measure',
    title: 'Lebesgue Measure',
    summary:
      'Give up the obsession with "the length of an interval" and assign an "area" to an arbitrary cloud of points by means of outer measure—the first step of modern integration theory.',
    content: String.raw`

Riemann integration cuts the domain into thin vertical strips and demands that the function be "more or less constant" inside each strip before it can be integrated. But in reality a great many functions—for instance the Dirichlet function, which takes the value 1 at rational points and 0 at irrational points—fluctuate violently inside every small interval, so Riemann integration simply gives up. Lebesgue took a different route: instead of touching the domain, he measured the area of "the set itself"—assigning a "volume" to an arbitrary point set in $\mathbb{R}^n$, called its measure. Once sets can be measured, one groups the function by its range of values and sums, and even very wild functions become integrable. This step is called "build the measure first".

Opening question: why does the set of all rational numbers have measure $0$, even though it is dense "everywhere"? By the end of this section you will have the answer.

## 2. Rigorous Definitions

**Outer measure.** For any point set $E$ in $\mathbb{R}^n$, cover it with countably many open rectangular boxes $I_k$ and take the infimum of the total volume:

$$m^*(E) = \inf\left\{ \sum_{k} |I_k| : E \subset \bigcup_{k} I_k \right\}$$

**Measurable set (Carathéodory condition).** $E$ is called Lebesgue measurable if for every set $A$,

$$m^*(A) = m^*(A \cap E) + m^*(A \setminus E)$$

In that case we write $m(E) = m^*(E)$, called the Lebesgue measure of $E$.

**The class of measurable sets.** All measurable sets form a $\sigma$-algebra: it is closed under complement, countable unions and countable intersections. Every Borel set (open sets, closed sets, $F_\sigma$, $G_\delta$) is measurable.

## 3. Why This Definition

Outer measure gauges size by "covering": the more tightly boxes can cover $E$, the smaller the number assigned. It automatically satisfies non-negativity, monotonicity and countable subadditivity. But outer measure is unfriendly to subtraction (in general $m^*(A\setminus B) \neq m^*(A)-m^*(B)$), so one must additionally single out the "well-behaved" measurable sets.

The meaning of the Carathéodory condition is this: $E$ can cut an arbitrary set $A$ "neatly into two pieces" without any loss of measure. In other words, the boundary of $E$ is "obedient" enough that the outer measures of the two pieces add up exactly to that of the whole. Only sets satisfying this condition are given a measure value with confidence.

Counterexample (non-measurable sets exist): with the axiom of choice one constructs the Vitali set $V\subset[0,1]$ by classifying $[0,1]$ according to "difference is rational" and taking one representative from each class. $V$ is non-measurable: were it measurable, translation invariance and countable additivity would force both $0 < m(V) < \infty$ and $m(V)=0$ or $\infty$, a contradiction.

## 4. Intuition and Pictures

> Think of outer measure as "the least amount of standard tile needed to cover a stain on the floor"; a measurable set is a stain with a "clean boundary, whose cutting wastes no tile".

Key facts side by side:

| Set | Measure |
|------|------|
| A single point | $0$ |
| Countable set (including all rationals) | $0$ |
| Interval $[a,b]$ | $b-a$ |
| Cantor set (uncountable) | $0$ |
| Vitali set | Non-measurable |

**Regularity**: a measurable set $E$ satisfies $m(E) = \sup\{m(K): K\subset E,\ K\text{ compact}\} = \inf\{m(U): E\subset U,\ U\text{ open}\}$, that is, it can be approximated arbitrarily well from inside by compact sets and from outside by open sets.

## 5. Worked Examples

### Example 1 (Basic: a countable set has measure zero)

Problem: prove that the set of rational numbers $\mathbb{Q}$ has Lebesgue measure $0$.

Solution: enumerate $\mathbb{Q}$ as $\{q_1,q_2,\dots\}$. For each $q_k$ take the covering interval $(q_k-\varepsilon/2^{k+1}, q_k+\varepsilon/2^{k+1})$, whose total length is $\sum \varepsilon/2^k = \varepsilon$. Hence $m^*(\mathbb{Q}) \le \varepsilon$ for every $\varepsilon>0$, so $m^*(\mathbb{Q})=0$.

### Example 2 (Intermediate: the Cantor set has measure zero)

Problem: show that the Cantor set $C$ is uncountable yet has measure $0$.

Analysis: at each step the middle third of every remaining segment is removed, so after the $n$-th step there remain $2^n$ segments each of length $3^{-n}$, with total length $(2/3)^n\to 0$. By monotonicity of outer measure $m^*(C)\le (2/3)^n\to 0$, so $m(C)=0$. Meanwhile $C$ is in one-to-one correspondence with $\{0,1\}^\mathbb{N}$, hence uncountable.

### Example 3 (Advanced: verifying measurability)

Problem: verify that the open interval $(a,b)$ is measurable.

Solution: take any $A$; we must show $m^*(A)=m^*(A\cap(a,b))+m^*(A\setminus(a,b))$. Subadditivity of outer measure gives "$\ge$" automatically; the reverse inequality "$\le$" follows from a covering construction. More generally every open set is a countable union of open intervals, and the class is closed under countable unions, so open sets are measurable; hence so are closed sets, $F_\sigma$ and $G_\delta$ sets.

## 6. Common Pitfalls

- Error: assuming a "dense set" must have large measure. Correct: the rationals are dense yet have measure $0$.
- Error: treating outer measure as a measure and subtracting directly. Correct: additivity holds only for measurable sets.
- Error: believing every set is measurable. Correct: under the axiom of choice non-measurable sets exist (the Vitali set).
- Error: confusing $m^*$ with $m$. Correct: $m$ is defined only on measurable sets and there equals $m^*$.

## 7. Summary and Mnemonics

Key points to recall:
- Outer measure = infimum of the total volume of countable covers.
- Carathéodory's condition for measurability: arbitrary sets can be cut neatly with no loss.
- Countable sets have measure $0$; the Cantor set is uncountable yet has measure $0$.
- Axiom of choice $\Rightarrow$ non-measurable sets exist (the Vitali set).

**Mnemonic: outer measure is the infimum over covers; measurable means cutting without loss; dense need not have volume, the rationals have measure zero.**

Supplementary remark: "countable additivity" of a measure differs from "finite additivity": for a pairwise disjoint countable family $\{E_k\}$, $m(\bigcup E_k)=\sum m(E_k)$; but for uncountable unions or intersecting sets only subadditivity $m^*(\bigcup E_k)\le\sum m^*(E_k)$ is available. This is precisely why outer measure cannot be subtracted first.

Lebesgue measure also enjoys translation invariance $m(E+x)=m(E)$ and scaling $m(cE)=|c|m(E)$. Regularity tells us that any measurable set can be approximated to arbitrary accuracy from inside by compact sets and from outside by open sets—a fact that is crucial when proving that "a measurable set can be written as the difference of an $F_\sigma$ and a $G_\delta$", and the starting point of many existence proofs.`,
    keyPoints: [
      'Outer measure = infimum of the total volume of countable covers',
      'Carathéodory condition for measurability: arbitrary sets can be cut neatly',
      'Countable sets have measure 0; the Cantor set is uncountable but has measure 0',
      'Axiom of choice ⇒ non-measurable sets exist (the Vitali set)',
    ],
  },

  'measurable-functions': {
    chapter: 'Chapter 2 Measurable Functions',
    title: 'Measurable Functions and Egorov’s Theorem',
    summary:
      'Measurable functions are the entry ticket to "Lebesgue integrability": they may be as bad as they like, as long as "the set where a given value is taken" is measurable; Egorov’s theorem says convergence is almost uniform.',
    content: String.raw`

Riemann integration demands that a function be "almost continuous"; Lebesgue integration is far more permissive and only demands that the function be "measurable". What does measurable mean? Intuitively: whatever range of values you pick (say "the points where the function exceeds 5"), the set of such points must be a measurable set. How wildly the function jumps between those points, and whether it is continuous, does not matter at all. Measurable functions drop the harsh requirement of continuity entirely and keep only "the values can be stratified"—and that is enough to support the whole theory of integration.

Opening question: can a sequence of measurable functions converging almost everywhere be made uniformly convergent after "removing a small piece"? Egorov's theorem answers "yes".

## 2. Rigorous Definitions

**Measurable function.** Let $f$ be defined on a measurable set $E$ and take values in $\overline{\mathbb{R}}$. If for every real number $a$ the level set

$$\{x\in E : f(x) > a\}$$

is measurable, then $f$ is called measurable on $E$. Equivalent formulations: for every open set $U$, $f^{-1}(U)$ is measurable; or for every Borel set $B$, $f^{-1}(B)$ is measurable.

**Simple function.** Of the form $\varphi = \sum_{k=1}^{n} c_k \chi_{E_k}$, where $E_k$ is measurable and $\chi$ is an indicator function. Simple functions are automatically measurable.

**Almost everywhere (a.e.).** If a statement holds outside some point set whose measure is $0$, it is said to hold "almost everywhere".

## 3. Why This Definition

One defines measurability through the level sets $\{f>a\}$ because this only cares about "whether the set of points where the values fall in a given range is measurable" and not about continuity. This relaxation, bought by selling continuity, is exactly why the Lebesgue integral can handle the Dirichlet function: it takes 1 at rational points and 0 at irrational points, so its level sets are either all of $[0,1]$ (measure 1) or its complement (measure 0), both measurable, hence the function is measurable.

Measurable functions are closed under operations: the four arithmetic operations (with the denominator not identically zero), taking absolute values, sup and inf, and pointwise limits all preserve measurability. This is the foundation on which integration theory runs smoothly.

**Egorov's theorem.** If $m(E)<\infty$ and $f_n\to f$ almost everywhere on $E$, then for every $\delta>0$ there is a measurable set $E_\delta\subset E$ with $m(E\setminus E_\delta)<\delta$ such that $f_n\rightrightarrows f$ uniformly on $E_\delta$. That is, "almost everywhere convergence is almost uniform convergence after deleting a set of small measure".

## 4. Intuition and Pictures

> A measurable function is like a "height-stratified statisticable chart": you draw a horizontal line, and the region above it must have a measurable area. Whether the graph is connected into one piece does not matter.

| Class of functions | Measurable? | Comment |
|--------|--------|------|
| Continuous functions | Yes | Preimage of an open set is open (measurable) |
| Monotone functions | Yes | Only countably many discontinuities |
| Simple functions | Yes | By definition a combination of indicators |
| Pointwise limits of measurable sequences | Yes | Closed under limits |

**Simple approximation theorem**: every non-negative measurable function $f$ can be approximated monotonically from below by a sequence of non-negative simple functions; a general measurable function is assembled from its positive and negative parts. This is the cornerstone of the Lebesgue integral.

## 5. Worked Examples

### Example 1 (Basic: verifying measurability)

Problem: prove that the Dirichlet function $D(x)=1$ ($x$ rational), $0$ ($x$ irrational) is measurable on $[0,1]$.

Solution: for any $a$, if $a<0$ then $\{D>a\}=[0,1]$ is measurable; for $0\le a<1$, $\{D>a\}=\mathbb{Q}\cap[0,1]$ is measurable (measure $0$); for $a\ge 1$, $\{D>a\}=\varnothing$ is measurable. Hence $D$ is measurable.

### Example 2 (Intermediate: closure of measurable functions under operations)

Problem: if $f,g$ are measurable, prove that $f+g$ is measurable.

Analysis: since $\{f+g>a\} = \bigcup_{r\in\mathbb{Q}} \{f>r\}\cap\{g>a-r\}$, the right-hand side is a countable union of measurable sets and hence measurable. The density of the rationals in the reals is used here to split one inequality into an intersection of two measurable level sets.

### Example 3 (Advanced: applying Egorov's theorem)

Problem: let $f_n(x)=x^n$ on $[0,1]$. Show that it converges almost everywhere but not uniformly, and explain this with Egorov.

Solution: $f_n\to f$ with $f=0\ (x<1)$, $1\ (x=1)$, converging almost everywhere (it fails only at $x=1$, a set of measure $0$). But $\sup|f_n-f|=1$ does not tend to $0$, so the convergence is not uniform. Egorov says: for any $\delta>0$ one may remove a small neighbourhood of $x=1$ of length $<\delta$, and on the remaining set the convergence is uniform—that single point is the "bad point".

## 6. Common Pitfalls

- Error: treating "measurable function" as "continuous function". Correct: measurability is far weaker, continuity is only a special case.
- Error: assuming almost everywhere convergence implies uniform convergence. Correct: Egorov only gives uniformity after removing a small-measure set, and only on sets of finite measure.
- Error: defining measurability via $\{f=a\}$. Correct: the standard choice is $\{f>a\}$ (or $\ge$, $\lt$ etc.); single-point sets are not enough to characterize the property.
- Error: ignoring a vanishing denominator. Correct: the arithmetic operations require the denominator to be non-zero almost everywhere.

## 7. Summary and Mnemonics

Key points to recall:
- $f$ is measurable $\iff$ for every $a$, $\{x:f(x)>a\}$ is measurable.
- Measurable functions are closed under arithmetic operations, limits and composition.
- Simple functions can approximate any measurable function monotonically.
- Egorov's theorem: almost everywhere convergence $\Rightarrow$ uniform convergence after removing a set of small measure.

**Mnemonic: measurability looks only at level sets, continuity is merely a special case; Egorov says the bad points can be discarded, a small handful at a time.**

Supplementary remark: the notion "almost everywhere" runs through the whole of real analysis: if a statement holds outside an exceptional set of measure $0$, it is said to hold almost everywhere (written a.e.). For example, two measurable functions that agree almost everywhere have the same integral—the integral "cannot see" differences on null sets. This is exactly why the Lebesgue integral handles the Dirichlet function so easily.

Lusin's theorem gives yet another deep characterization of measurable functions: for every $\varepsilon>0$ there is a closed set $F\subset E$ with $m(E\setminus F)<\varepsilon$ such that $f$ is continuous on $F$. It says that "a measurable function is almost a continuous function"—as long as one tolerates a small piece of measure, continuity can be recovered. It complements Egorov's theorem (almost everywhere convergence ≈ uniform convergence after deleting a small-measure set), and together they reveal the intimate relation between measurable and continuous functions.`,
    keyPoints: [
      'f is measurable ⇔ for every a, {x:f(x)>a} is measurable',
      'Measurable functions are closed under arithmetic operations, limits and composition',
      'Simple functions approximate any measurable function',
      'Egorov’s theorem: almost everywhere convergence ⇒ uniform convergence after removing a set of small measure',
    ],
  },

  'lebesgue-integral': {
    chapter: 'Chapter 2 The Lebesgue Integral',
    title: 'The Lebesgue Integral',
    summary:
      'Integrate simple functions first, then take the supremum—the monotone convergence and dominated convergence theorems rule the whole theory.',
    content: String.raw`

Riemann integration "cuts vertically" (slicing by the domain); Lebesgue integration "cuts horizontally" (stratifying by the range of values). One first defines the integral of simple functions (combinations of finitely many indicators), then lets a general non-negative function be approached from below by simple functions and takes the supremum of the integrals. This even integrates the Dirichlet function: it takes 1 at rational points (measure 0) and 0 at irrational points (measure 1), so the integral is naturally $0\cdot 1 + 1\cdot 0 = 0$. The engine of the whole theory is the three convergence theorems—they allow "limit" and "integral" to be exchanged.

Opening question: why is every Riemann integrable function Lebesgue integrable, while the converse fails? This section explains it thoroughly.

## 2. Rigorous Definitions

**Integral of a simple function.** For $\varphi = \sum_{k=1}^{n} a_k \chi_{E_k}$ ($a_k\ge 0$), define

$$\int_E \varphi = \sum_{k=1}^{n} a_k\, m(E_k)$$

independently of the representation.

**Non-negative measurable functions.** Approximate from below by simple functions $\varphi$:

$$\int_E f = \sup\left\{ \int_E \varphi : 0 \le \varphi \le f,\ \varphi\ \text{simple} \right\}$$

**General functions.** Decompose $f = f^+ - f^-$ (both positive and negative parts non-negative). If $\int |f| = \int f^+ + \int f^- < \infty$, $f$ is called **Lebesgue integrable**, with integral $\int f = \int f^+ - \int f^-$.

## 3. Why This Definition

Starting from simple functions is natural because their integral is just "a weighted sum of measures", with no ambiguity. For non-negative functions one takes "the supremum of integrals of approximating simple functions from below", which guarantees monotonicity and stability. Requiring $\int|f|<\infty$ for integrability ensures that neither the positive nor the negative part diverges, so the integral is well defined and absolutely convergent.

**The three convergence theorems**:
- **Monotone convergence theorem (MCT)**: if $0\le f_1\le f_2\le\cdots\to f$, then $\int f_n\to\int f$. This has the weakest hypothesis: only non-negativity and monotonicity.
- **Fatou's lemma**: if $f_n\ge 0$, then $\int\liminf f_n \le \liminf\int f_n$.
- **Dominated convergence theorem (DCT)**: if $f_n\to f$ and $|f_n|\le g$ with $g$ integrable, then $\int f_n\to\int f$.

Counterexample (failure without domination): $f_n = n\chi_{(0,1/n)}$ tends pointwise to $0$, but $\int f_n = 1\not\to 0$—there is no integrable dominating function, so DCT does not apply.

**Comparison with Riemann**: on $[a,b]$, $f$ is Riemann integrable $\iff$ $f$ is bounded and continuous almost everywhere; Riemann integrability implies Lebesgue integrability with the same value, but not conversely ($D(x)$ is the counterexample).

## 4. Intuition and Pictures

> The Lebesgue integral is like "stratifying by height first, weighing the area of each layer, multiplying by the height, and adding up". Which layer has large area and contributes much is immediately visible.

| Property | Riemann integral | Lebesgue integral |
|------|----------|------------|
| Integrability condition | Bounded + continuous a.e. | $\int|f|<\infty$ |
| Dirichlet function | Not integrable | Integrable (value 0) |
| Interchange of limits | Needs uniform convergence | DCT/MCT suffice |
| Completeness | Not complete | $L^1$ is complete |

**Fubini's theorem**: if $f\ge 0$ or absolutely integrable, the multiple integral can be reduced to iterated integrals in either order:

$$\int_{\mathbb{R}^{m+n}} f = \int_{\mathbb{R}^m}\left(\int_{\mathbb{R}^n} f(x,y)\,\mathrm{d}y\right)\mathrm{d}x$$

## 5. Worked Examples

### Example 1 (Basic: integral of the Dirichlet function)

Problem: compute the Lebesgue integral of $D(x)$ on $[0,1]$.

Solution: $D = \chi_{\mathbb{Q}\cap[0,1]}$. It is measurable and $|D|\le 1$ (integrable). The integral is $\int_{[0,1]} D = 1\cdot m(\mathbb{Q}\cap[0,1]) + 0\cdot m([0,1]\setminus\mathbb{Q}) = 1\cdot 0 + 0 = 0$.

### Example 2 (Intermediate: monotone convergence theorem)

Problem: find the limit as $n\to\infty$ of $\int_0^\infty \frac{e^{-x}}{x}\chi_{(1/n,1)}\,\mathrm{d}x$.

Analysis: set $f_n(x)=\frac{e^{-x}}{x}\chi_{(1/n,1)}$; then $0\le f_1\le f_2\le\cdots\to f(x)=\frac{e^{-x}}{x}\chi_{(0,1)}$. By MCT,
$$\lim_{n\to\infty}\int f_n = \int_0^1 \frac{e^{-x}}{x}\,\mathrm{d}x$$
Although the integrand is unbounded at $0$, the Lebesgue integral still handles it (here finite in the improper sense).

### Example 3 (Advanced: dominated convergence theorem)

Problem: compute $\lim_{n\to\infty}\int_0^1 \frac{n x}{1+n^2 x^2}\,\mathrm{d}x$.

Solution: write $f_n(x)=\frac{nx}{1+n^2x^2}$. Pointwise $f_n(x)\to 0$. But a dominating function is needed: note $f_n(x)\le \frac{1}{2x}$ (since $1+n^2x^2\ge 2nx$), and $1/(2x)$ is not integrable on $[0,1]$, so domination fails. Direct computation gives $\int_0^1 f_n = \frac{1}{2}\ln(1+n^2)\to\infty$. Comment: DCT does not apply here, a warning to "first check whether an integrable dominant exists".

## 6. Common Pitfalls

- Error: conflating Riemann integrability with Lebesgue integrability. Correct: Lebesgue is strictly broader.
- Error: using DCT without verifying that the dominating function is integrable. Correct: the dominant must be Lebesgue integrable.
- Error: assuming the integral of a non-negative function is necessarily finite. Correct: it may equal $+\infty$ (then the function is not integrable but MCT still holds).
- Error: using Fubini to swap order unconditionally. Correct: non-negativity or absolute integrability is required.

## 7. Summary and Mnemonics

Key points to recall:
- Route of the integral: simple functions $\to$ non-negative functions (sup) $\to$ general functions ($f^+-f^-$).
- Three theorems: MCT, Fatou, DCT; DCT is the most used.
- Riemann integrable = bounded + continuous a.e.; Lebesgue integrable is strictly broader.
- Fubini's theorem: order may be swapped only under absolute integrability (unconditional for non-negative functions).

**Mnemonic: integrate simple functions first, then take the supremum; DCT needs an integrable dominant, MCT only needs non-negative monotonicity.**`,
    keyPoints: [
      'Route of the integral: simple functions → non-negative functions (sup) → general functions (f⁺−f⁻)',
      'Three theorems: MCT, Fatou, DCT; DCT is the most used',
      'Riemann integrable = bounded + continuous a.e.; Lebesgue integrable is strictly broader',
      'Fubini’s theorem: order may be swapped only under absolute integrability (unconditional for non-negative functions)',
    ],
  },

  'convergence-theorems': {
    chapter: 'Chapter 3 The Lebesgue Integral',
    title: 'The Dominated Convergence Theorem and Its Applications',
    summary:
      'The sharpest tools of the Lebesgue integral: monotone convergence, Fatou and dominated convergence—they make "exchanging limit and integral" a matter of rules.',
    content: String.raw`

One of the basic questions of calculus: a sequence of functions $f_n$ tends to $f$; when does $\int f_n \to \int f$? For the Riemann integral one needs uniform convergence before daring to exchange. Lebesgue theory gives far weaker criteria: as long as the sequence is capped by some "integrable ceiling" $g$ (dominated convergence), or the functions increase monotonically (monotone convergence), the exchange is legitimate. These three convergence theorems are the Swiss army knife of real analysis—proving existence, computing limiting integrals and building the structure of $L^p$ spaces all depend on them.

Opening question: why can one exchange limit and integral directly in $\lim_{n\to\infty}\int_0^1 n x e^{-n x}\,\mathrm{d}x$? This section reveals it.

## 2. Rigorous Definitions

**Monotone convergence theorem (Levi).** If $0\le f_1\le f_2\le\cdots$ and $f_n\to f$ almost everywhere (or pointwise), then

$$\lim_{n\to\infty}\int f_n = \int f$$

**Fatou's lemma.** If $f_n\ge 0$, then

$$\int \liminf_{n\to\infty} f_n \le \liminf_{n\to\infty} \int f_n$$

**Dominated convergence theorem (DCT, Lebesgue).** If $f_n\to f$ almost everywhere and there is an integrable function $g$ with

$$|f_n(x)| \le g(x)\quad \text{a.e.}$$

then $f$ is integrable and

$$\lim_{n\to\infty}\int f_n = \int f$$

**Levi's series theorem.** If $u_n\ge 0$ are measurable, then $\int\sum u_n = \sum\int u_n$ (the series version of monotone convergence).

## 3. Why This Definition

The monotone convergence theorem requires no "domination" at all, because for non-negative monotonically increasing functions the integral only grows and is bounded above by $\int f$, so the limit is necessarily $\int f$—the integral analogue of "a monotone increasing bounded sequence converges".

Fatou's lemma is "one half" of DCT: it only guarantees a lower bound, not equality; when the sequence is dominated from both sides, Fatou squeezes it and DCT follows.

The heart of DCT is uniform integrability: the dominating function $g$ frames the "energy" of the whole sequence at once, so that large values anywhere cannot destroy the exchange of limit and integral. Without $g$, a "spike" such as $f_n=n\chi_{(0,1/n)}$ makes the integrals fail to converge to the integral of the limit.

Counterexample (missing domination): $f_n = n\chi_{(0,1/n)}$ has pointwise limit $0$, but $\int f_n=1\not\to 0$, precisely because there is no integrable dominant.

## 4. Intuition and Pictures

> Dominated convergence is like "throwing a blanket of fixed thickness over a sequence of oscillating waveforms": as long as the blanket (the dominating function) has finite total volume, however the waveform shakes, the total integral stays stable.

| Theorem | Key condition | Strength of conclusion |
|------|----------|----------|
| MCT | Non-negative, monotone increasing | Limit = limit of integrals |
| Fatou | Non-negative | Gives only a lower bound |
| DCT | Dominated by an integrable function | Limit = limit of integrals |
| Levi | Series with non-negative terms | Sum and integral may be exchanged |

Strategy: when facing "an integral under a limit sign", think of DCT first (look for a dominant); when facing "a sum with non-negative terms / monotone", use MCT or Levi.

## 5. Worked Examples

### Example 1 (Basic: direct application of DCT)

Problem: compute $\lim_{n\to\infty}\int_0^1 \frac{x^n}{1+x}\,\mathrm{d}x$.

Solution: write $f_n(x)=\frac{x^n}{1+x}$. On $[0,1]$, $0\le f_n\le 1$ (integrable domination), and $f_n\to 0$ for $x<1$ while $f_n(1)=1/2$, so it tends to $0$ almost everywhere. By DCT the limit equals $\int_0^1 0 = 0$.

### Example 2 (Intermediate: limit of an integral with a parameter)

Problem: compute $\lim_{n\to\infty}\int_0^\infty \frac{n}{1+n^2 x^2}\,\mathrm{d}x$.

Analysis: $f_n(x)=\frac{n}{1+n^2x^2}$. Substituting $u=nx$ gives $\int_0^\infty \frac{1}{1+u^2}\,\mathrm{d}u = \pi/2$, independent of $n$, so the limit is $\pi/2$. Note that the peak of $f_n$ grows ever higher (the dominant would be of the non-integrable $\frac{1}{x\sqrt{}}$ type), so DCT does not apply and one must compute directly—this is the "spike" type, a reminder not to abuse DCT.

### Example 3 (Advanced: Levi's theorem for a series)

Problem: prove that for measurable $f\ge 0$, $\int\sum_{n=1}^\infty 2^{-n}f(x/n)\,\mathrm{d}x = \sum_{n=1}^\infty 2^{-n} n\int_0^\infty f$.

Solution: let $u_n(x)=2^{-n}f(x/n)\ge 0$. By Levi's theorem,
$$\int\sum u_n = \sum\int u_n$$
and $\int_0^\infty f(x/n)\,\mathrm{d}x = n\int_0^\infty f$. Substituting gives the right-hand side. Comment: Levi settles the exchange between summation of non-negative terms and integration in one stroke.

## 6. Common Pitfalls

- Error: applying DCT without checking that the dominant is integrable. Correct: a Lebesgue integrable dominant $g$ must exist.
- Error: taking "pointwise convergence to 0" as "the integral tends to 0". Correct: DCT or MCT type conditions are needed.
- Error: using DCT on a sequence with spikes. Correct: spikes usually have no dominant and should be computed directly.
- Error: writing Fatou's lemma as an equality. Correct: Fatou gives only $\le$; equality needs extra domination.

## 7. Summary and Mnemonics

Key points to recall:
- Monotone convergence theorem: for non-negative monotone increasing sequences, integral and limit may be exchanged.
- Fatou's lemma gives a lower bound and is half of DCT.
- Dominated convergence: with an integrable dominant, limit and integral may be exchanged.
- Levi's theorem is the series version of monotone convergence; non-negative sums and integrals may be exchanged.

**Mnemonic: look for an integrable dominant to use DCT; use MCT for non-negative monotone; use Levi for series that should be swapped.**`,
    keyPoints: [
      'Monotone convergence theorem: for non-negative monotone increasing sequences integral and limit may be exchanged',
      'Fatou’s lemma gives a lower bound estimate',
      'Dominated convergence: with an integrable dominant, limit and integral may be exchanged',
      'Levi’s theorem is the series version of monotone convergence',
    ],
  },

  'lp-spaces': {
    chapter: 'Chapter 3 Lp Spaces',
    title: 'Lp Spaces and Fourier Series',
    summary:
      'Treat functions as vectors: inner product, orthogonality, projection—the Hilbert space L² turns Fourier series into the Pythagorean theorem.',
    content: String.raw`

In $\mathbb{R}^n$ a vector has a length (norm) and an angle (inner product). Strikingly, by viewing functions as "vectors in an infinite-dimensional space" one can define length and angle in the same way: integrals play the role of sums, and $L^p$ spaces are "the sets of functions whose $p$-th power is integrable". Among them $L^2$ is the most special—it has an inner-product structure, so orthogonality, projection and the Pythagorean theorem all come back to life, and Fourier series become "projecting a function onto an orthogonal basis of sines and cosines". This turns analysis into geometry.

Opening question: why does the Fourier series in $L^2$ have "total energy error tending to zero"? This section explains it geometrically.

## 2. Rigorous Definitions

For a measure space $(\Omega,\mathcal{M},m)$ define

$$L^p(\Omega) = \left\{ f : \int_\Omega |f|^p\,\mathrm{d}m < \infty \right\},\qquad \|f\|_p = \left(\int_\Omega |f|^p\right)^{1/p}$$

**Hölder's inequality** ($\frac{1}{p}+\frac{1}{q}=1$, $p,q>1$):

$$\int |fg| \le \|f\|_p\,\|g\|_q$$

**Minkowski's inequality** (triangle inequality, $p\ge 1$):

$$\|f+g\|_p \le \|f\|_p + \|g\|_p$$

**$L^2$ inner product**: $\langle f,g\rangle = \int f\overline{g}$, inducing the norm $\|f\|_2 = \sqrt{\langle f,f\rangle}$.

## 3. Why This Definition

A norm must be non-negative, homogeneous and satisfy the triangle inequality. Minkowski's inequality is exactly the source of the triangle inequality on $L^p$; Hölder's inequality is its "integral version of the Cauchy–Schwarz inequality", commonly used to estimate integrals of products.

Note that for $p<1$ the triangle inequality fails (counterexample: $f=\chi_{[0,1/2]},g=\chi_{[1/2,1]}$; at $p=1/2$, $\|f+g\|_{1/2}=2^{2}=4 > \|f\|+\|g\|=2\cdot 2=4$? a subtler construction is in fact required), so $L^p$ is a normed space only for $p\ge 1$. All $L^p$ ($1\le p\le\infty$) are **complete** (Banach spaces)—limits do not escape the space, which is the key to stable analysis.

**Bessel's inequality**: for an orthogonal system $\{e_n\}$, $\sum_n |\langle f,e_n\rangle|^2 \le \|f\|_2^2$.

**Parseval's identity**: if $\{e_n\}$ is a complete orthogonal system, then $\sum |\langle f,e_n\rangle|^2 = \|f\|_2^2$ (conservation of energy).

## 4. Intuition and Pictures

> Think of $L^2$ as "an infinite-dimensional Euclidean space": a function is a vector, its Fourier coefficients are the lengths of its projections on the orthogonal basis, and the Pythagorean theorem says "total energy = sum of the energies of the components".

| Space | Structure | Key properties |
|------|------|----------|
| $L^p\ (1\le p<\infty)$ | Normed, complete (Banach) | Hölder, Minkowski |
| $L^2$ | Inner product, complete (Hilbert) | Orthogonality, projection, Parseval |
| $L^\infty$ | Essentially bounded | $\operatorname{ess\,sup}$ |

**Riesz–Fischer theorem**: $f\mapsto (\langle f,e_n\rangle)_n$ is an isometric surjection from $L^2$ onto $\ell^2$—every square-summable sequence is the Fourier coefficient sequence of some $L^2$ function, and $L^2\cong\ell^2$.

## 5. Worked Examples

### Example 1 (Basic: Hölder's inequality)

Problem: for $f\in L^p,g\in L^q$ ($1/p+1/q=1$), prove $\int|fg|\le\|f\|_p\|g\|_q$.

Solution: this is the standard form of Hölder's inequality; it follows directly from convexity or Young's inequality: for $a,b\ge 0$, $ab\le a^p/p + b^q/q$; substituting $a=|f|/\|f\|_p$, $b=|g|/\|g\|_q$ and integrating gives the result. Equality holds when $|f|^p$ and $|g|^q$ are proportional.

### Example 2 (Intermediate: Bessel's inequality)

Problem: let $\{e_n\}$ be an orthonormal sine-cosine system in $L^2[0,2\pi]$. Prove that for any $f\in L^2$, $\sum |c_n|^2\le\|f\|_2^2$.

Analysis: the orthogonal projection $S_N=\sum_{n=1}^N c_n e_n$ is the best approximation to $f$ in the $N$-dimensional subspace, so $\|f-S_N\|_2^2 = \|f\|_2^2 - \sum_{n=1}^N |c_n|^2\ge 0$; letting $N\to\infty$ gives Bessel's inequality.

### Example 3 (Advanced: mean-square convergence)

Problem: prove that the partial sums $S_N$ of the Fourier series of $f\in L^2[0,2\pi]$ satisfy $\lim_{N\to\infty}\|f-S_N\|_2=0$.

Solution: since the sine-cosine system is complete in $L^2$, Riesz–Fischer and Parseval give the projection error $\|f-S_N\|_2^2 = \|f\|_2^2 - \sum_{n\le N}|c_n|^2\to 0$. This is **mean-square convergence** (the total energy error tends to zero). Note that it does not guarantee convergence at every point—pointwise convergence needs further conditions such as Dini's or Jordan's.

## 6. Common Pitfalls

- Error: calling $L^p$ a normed space when $p<1$. Correct: the triangle inequality fails; it holds only for $p\ge 1$.
- Error: taking mean-square convergence for pointwise convergence. Correct: they answer different questions with different criteria.
- Error: miswriting the relation between $p$ and $q$ in Hölder. Correct: $1/p+1/q=1$ must hold.
- Error: ignoring completeness. Correct: the completeness of $L^p$ underlies many limiting arguments.

## 7. Summary and Mnemonics

Key points to recall:
- Hölder (integral estimates) and Minkowski (triangle inequality) are the two pillars of $L^p$.
- $L^2$ has an inner-product structure: orthogonality, projection, Bessel's inequality.
- Parseval = conservation of energy; Riesz–Fischer: $L^2\cong\ell^2$.
- Mean-square convergence $\neq$ pointwise convergence; the criteria differ.

**Mnemonic: L² is the Hilbert space of functions; orthogonal projection gives Fourier coefficients, and energy is conserved by Parseval.**`,
    keyPoints: [
      'Hölder (integral estimates) and Minkowski (triangle inequality) are the two pillars of Lp',
      'L² has an inner-product structure: orthogonality, projection, Bessel’s inequality',
      'Parseval = conservation of energy; Riesz–Fischer: L² ≅ ℓ²',
      'Mean-square convergence ≠ pointwise convergence; the criteria differ',
    ],
  },

  'differentiation': {
    chapter: 'Chapter 5 Differentiation and the Indefinite Integral',
    title: 'Bounded Variation and the Lebesgue Differentiation Theorem',
    summary:
      'A function of bounded variation splits cleanly into the difference of two increasing functions; the Lebesgue differentiation theorem says that "integrating and then differentiating returns the function almost everywhere".',
    content: String.raw`

The Newton–Leibniz formula says $F(x)-F(a)=\int_a^x F'(t)\,\mathrm{d}t$. But a Lebesgue integrable function may "jump around", and its derivative may fail to exist at some points. To preserve this mutual inversion one must impose a "mild" condition on the function—**absolute continuity**. Before that, get to know **functions of bounded variation**: their total variation is finite, the total length of their graph (the accumulated ups and downs) is bounded, and hence they split cleanly into the difference of two increasing functions. This is the key step that extends "differentiation and integration are inverse" to the Lebesgue framework.

Opening question: why must a function that is differentiable everywhere with identically zero derivative be constant? Absolute continuity gives the answer.

## 2. Rigorous Definitions

**Total variation.** For a partition $P: a=x_0<x_1<\cdots<x_n=b$ of $[a,b]$,

$$V(f,P) = \sum_{i=1}^{n} |f(x_i) - f(x_{i-1})|$$

If $\sup_P V(f,P) < \infty$, then $f$ is called a **function of bounded variation**, and the supremum is denoted by the total variation $V_a^b(f)$.

**Decomposition theorem for bounded variation.** $f$ has bounded variation $\iff$ there exist two monotone increasing functions $g,h$ with $f = g - h$.

**Absolute continuity.** $f$ is absolutely continuous on $[a,b]$ if for every $\varepsilon>0$ there is $\delta>0$ such that for any finite family of pairwise disjoint subintervals $(a_k,b_k)$, $\sum(b_k-a_k)<\delta$ implies $\sum|f(b_k)-f(a_k)|<\varepsilon$.

**Lebesgue differentiation theorem.** If $f\in L^1_{\mathrm{loc}}$, then

$$\lim_{r\to 0} \frac{1}{m(B_r(x))}\int_{B_r(x)} f(y)\,\mathrm{d}y = f(x)\quad \text{a.e.}$$

## 3. Why This Definition

Total variation measures the "total mileage of ups and downs" of a function. If this mileage is finite, the function cannot oscillate violently infinitely many times (for example $\sin(1/x)$ has infinite variation near $0$ and is not of bounded variation). A function of bounded variation has a derivative almost everywhere, and that derivative is integrable—much stronger than a general measurable function.

Absolute continuity is stronger than uniform continuity: it requires that "a small total length of intervals" controls "a small total change of values", and that this hold for every finite family of intervals. Precisely this guarantees that $F(x)=\int_a^x f$ satisfies Newton–Leibniz: $F$ is absolutely continuous and $F'=f$ almost everywhere.

Counterexample (bounded variation $\neq$ absolute continuity): the Cantor function (devil's staircase) is monotone increasing, hence of bounded variation, but its derivative is almost everywhere $0$ on the Cantor set (of measure 0) and yet it is not constant—it is not absolutely continuous, so Newton–Leibniz fails for it. This shows that absolute continuity cannot be dropped.

## 4. Intuition and Pictures

> Bounded variation is like "a mountain road that never circles forever", with finite total climbing plus total descending; absolute continuity is like "the shorter the walk, the smaller the height change", controlled even when accumulated piecewise.

| Condition | Strength | Relation to differentiation and integration |
|------|------|----------------|
| Continuous | Weak | Not enough to guarantee the N-L formula |
| Bounded variation | Medium | Splits into two increasing functions, differentiable a.e. |
| Absolutely continuous | Strong | N-L formula holds: $F'$=$f$ a.e. |

**Jordan decomposition**: the positive and negative variations of a bounded-variation function give its two monotone components.

## 5. Worked Examples

### Example 1 (Basic: monotone functions have bounded variation)

Problem: prove that a monotone increasing function $f$ on $[a,b]$ has bounded variation.

Solution: for any partition $P$, monotonicity gives $\sum|f(x_i)-f(x_{i-1})| = f(b)-f(a)$, independent of the partition, so $V_a^b(f)=f(b)-f(a)<\infty$. Hence monotone functions have bounded variation (and are differentiable a.e. with integrable derivative).

### Example 2 (Intermediate: verifying the Lebesgue differentiation theorem)

Problem: for $f=\chi_{[0,1]}$, verify that $\lim_{r\to 0}\frac{1}{2r}\int_{x-r}^{x+r} f = f(x)$ holds for $x\neq 0,1$.

Analysis: for $x\in(0,1)$ and $r$ small enough the interval lies inside $[0,1]$, so the average is $1=f(x)$; for $x>1$ or $x<0$ one likewise gets $0=f(x)$. Only at the two points $x=0,1$ (measure $0$) does the limit of the average differ from the function value. This is exactly what "almost everywhere" means.

### Example 3 (Advanced: absolute continuity and the N-L formula)

Problem: let $f\in L^1[a,b]$ and set $F(x)=\int_a^x f$. Prove that $F$ is absolutely continuous and $F'=f$ a.e.

Solution: by absolute continuity of the integral, for any $\varepsilon$ choose $\delta$ so that $m(E)<\delta$ implies $\int_E|f|<\varepsilon$. For a family of disjoint intervals with $\sum(b_k-a_k)<\delta$, $\sum|F(b_k)-F(a_k)| \le \sum\int_{a_k}^{b_k}|f| < \varepsilon$, so $F$ is absolutely continuous. The Lebesgue differentiation theorem then gives $F'=f$ almost everywhere. Comment: this transplants the fundamental theorem of calculus whole into the Lebesgue framework.

## 6. Common Pitfalls

- Error: assuming bounded variation implies absolute continuity. Correct: the Cantor function is a counterexample; absolute continuity is stronger.
- Error: deducing constancy from "derivative zero everywhere" while ignoring absolute continuity. Correct: absolute continuity (or connectedness of the interval plus absolute continuity) is required.
- Error: taking the Lebesgue differentiation theorem as holding everywhere. Correct: it holds only almost everywhere.
- Error: confusing total variation with $|f(b)-f(a)|$. Correct: total variation is the "accumulated ups and downs" and may far exceed the endpoint difference.

## 7. Summary and Mnemonics

Key points to recall:
- A function of bounded variation = the difference of two monotone increasing functions, with finite total variation.
- Absolute continuity $\Rightarrow$ bounded variation, and the set where the derivative vanishes has measure zero.
- Lebesgue differentiation theorem: the limit of averages equals the function value almost everywhere.
- Newton–Leibniz holds under absolute continuity.

**Mnemonic: bounded variation is the difference of two increasing functions; only absolute continuity preserves N-L; the differentiation theorem says integrating and differentiating returns the function (a.e.).**`,
    keyPoints: [
      'A function of bounded variation = the difference of two monotone increasing functions',
      'Absolute continuity ⇒ bounded variation and the set where the derivative vanishes has measure zero',
      'Lebesgue differentiation theorem: the limit of averages equals the function value almost everywhere',
      'The Newton-Leibniz formula holds under absolute continuity',
    ],
  },

  'product-measures': {
    chapter: 'Chapter 6 Product Measures',
    title: 'Product Measures and Fubini’s Theorem',
    summary:
      'Build a product measure "area × area" on a product space; Fubini’s theorem guarantees that iterated integrals may be taken in either order.',
    content: String.raw`

We already know how to measure the length of sets on a line (Lebesgue measure). The area of a rectangle in the plane is then naturally "length × width". The question generalizes to arbitrary point sets: how does one build a two-dimensional product measure out of two one-dimensional measures? The intuition is "fix one coordinate, measure a length, then accumulate along the other coordinate"—exactly iterated integration. Fubini's theorem guarantees that as long as the function is "absolutely integrable", integrating over $x$ first and then over $y$, or the reverse, gives the same result, and it equals the double integral. This gives the computation of double integrals a theoretical shield.

Opening question: why does changing the order in $\int_0^1\int_0^1 \frac{x-y}{(x+y)^3}\,\mathrm{d}x\mathrm{d}y$ give the opposite sign? This section reveals the trap.

## 2. Rigorous Definitions

**Product $\sigma$-algebra.** For measurable spaces $(X,\mathcal{A})$, $(Y,\mathcal{B})$, the product $\sigma$-algebra $\mathcal{A}\otimes\mathcal{B}$ is generated by the "rectangular cylinder sets" $A\times B$ ($A\in\mathcal{A},B\in\mathcal{B}$).

**Product measure.** If $\mu,\nu$ are $\sigma$-finite measures, there is a unique measure $\mu\times\nu$ with

$$(\mu\times\nu)(A\times B) = \mu(A)\,\nu(B)$$

For general measurable sets it is obtained by Carathéodory extension.

**Fubini's theorem.** If $f$ is **integrable** on $X\times Y$ with respect to $\mu\times\nu$ (that is, $\iint |f|\,\mathrm{d}(\mu\times\nu) < \infty$), then

$$\iint f\,\mathrm{d}(\mu\times\nu) = \int_X\left(\int_Y f(x,y)\,\mathrm{d}\nu(y)\right)\mathrm{d}\mu(x) = \int_Y\left(\int_X f(x,y)\,\mathrm{d}\mu(x)\right)\mathrm{d}\nu(y)$$

and the inner integrals are well defined almost everywhere.

**Tonelli's theorem.** If $f\ge 0$ is measurable (integrability not required), the iterated integrals equal the double integral (possibly $+\infty$), and the order may be swapped unconditionally.

## 3. Why This Definition

The product measure equals the product of the measures on rectangles, consistent with the naive "area = length × width"; through $\sigma$-algebra extension the definition reaches all measurable sets.

Fubini's theorem requires **absolute integrability** because swapping the order is essentially interchanging the order of "infinitely many sums", and without absolute convergence the result may change, as with conditionally convergent series. Tonelli's theorem targets non-negative functions, carries no integrability burden, and hence allows unconditional swapping—it is often used to first establish that an integral is finite and then to apply Fubini.

Counterexample (failure without absolute integrability): take $f(x,y)=\frac{x-y}{(x+y)^3}$ on $(0,1]\times(0,1]$. One computes $\int_0^1\int_0^1 f\,\mathrm{d}x\mathrm{d}y = -1/2$, whereas swapping the order gives $+1/2$, the opposite sign! The reason is $\iint|f|=\infty$, so Fubini's absolute integrability condition fails and the swap is illegal.

## 4. Intuition and Pictures

> Fubini is like two ways of cutting a cake, "slice vertically then horizontally" and "slice horizontally then vertically"; as long as the total weight of the cake is finite (absolute integrability), both methods weigh the same total.

| Theorem | Condition | May the order be swapped? |
|------|------|----------|
| Tonelli | $f\ge 0$ measurable | Yes (allowing $\infty$) |
| Fubini | $\iint|f|<\infty$ | Yes |
| No absolute integrability | — | No, errors possible |

Procedure: first verify $\iint|f|<\infty$ (or prove it finite using Tonelli), then swap with confidence.

## 5. Worked Examples

### Example 1 (Basic: product measure gives the area of a rectangle)

Problem: find the Lebesgue measure of $[0,2]\times[0,3]$ in $\mathbb{R}^2$.

Solution: by definition of the product measure, $m([0,2]\times[0,3]) = m([0,2])\cdot m([0,3]) = 2\cdot 3 = 6$, consistent with the geometric area.

### Example 2 (Intermediate: Fubini computes a double integral)

Problem: compute $\iint_{[0,1]^2} e^{-(x+y)}\,\mathrm{d}x\mathrm{d}y$.

Analysis: $\iint |e^{-(x+y)}| = \int_0^1\int_0^1 e^{-x}e^{-y} = (\int_0^1 e^{-x})^2 = (1-e^{-1})^2 < \infty$, so the function is absolutely integrable. By Fubini,
$$\iint = \left(\int_0^1 e^{-x}\mathrm{d}x\right)\left(\int_0^1 e^{-y}\mathrm{d}y\right) = (1-e^{-1})^2$$

### Example 3 (Advanced: Tonelli decides integrability)

Problem: decide whether $f(x,y)=\frac{1}{(1+x+y)^2}$ is integrable on $[0,\infty)^2$.

Solution: use Tonelli (non-negative):
$$\iint f = \int_0^\infty\int_0^\infty \frac{1}{(1+x+y)^2}\,\mathrm{d}y\mathrm{d}x = \int_0^\infty \frac{1}{1+x}\,\mathrm{d}x = \infty$$
so it is not integrable (although the iterated integrals are finite? note that here it really is infinite). Comment: the iterated integral of a non-negative function directly gives the double integral and can be used to decide integrability.

## 6. Common Pitfalls

- Error: swapping the order without checking absolute integrability. Correct: Fubini requires $\iint|f|<\infty$.
- Error: using Tonelli as if it were Fubini on sign-changing functions. Correct: for sign-changing functions absolute integrability must first be established.
- Error: thinking the rectangle definition of the product measure works for all sets. Correct: $\sigma$-finiteness and the extension theorem are needed for general sets.
- Error: ignoring the $\sigma$-finite condition. Correct: uniqueness of the product measure relies on $\sigma$-finiteness.

## 7. Summary and Mnemonics

Key points to recall:
- The product $\sigma$-algebra is generated by rectangular cylinder sets.
- The product measure equals the product of measures on rectangles.
- Fubini's theorem: absolutely integrable functions may be integrated in either order.
- Tonelli's theorem: non-negative functions may be swapped unconditionally.

**Mnemonic: the product measure multiplies measures; Fubini needs absolute integrability to swap, non-negative functions go straight to Tonelli.**`,
    keyPoints: [
      'The product σ-algebra is generated by rectangular cylinder sets',
      'The product measure m×n equals the product of measures on rectangles',
      'Fubini’s theorem: absolutely integrable functions may be integrated in either order',
      'Tonelli’s theorem: non-negative functions may be swapped unconditionally',
    ],
  },
};

export default map;
