import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'banach-spaces': {
    chapter: 'Chapter 1 Metric Spaces and Banach Spaces',
    title: 'Metric Spaces and Banach Spaces',
    summary:
      'Abstract "distance" and calculus is reborn in infinite-dimensional space—completeness is the foundation of all convergence theory.',
    keyPoints: [
      'Completeness = every Cauchy sequence converges, the foundation of all convergence theory',
      'Contraction mapping principle: existence, uniqueness and a constructive iteration in one step',
      'Newton’s method is a contraction mapping; Picard’s existence theorem relies on it too',
      'The infinite-dimensional unit ball is not compact—the motivation for spectral theory and compact operators',
    ],
    content: String.raw`

A ride-hailing app estimates distance as a straight line, while a navigation app computes along streets—the same word "distance", different rules, different conclusions. Three things recur in mathematical analysis: convergence, limits and continuity. On ℝ they rely on |x − y|, on ℝⁿ on the square root of a sum of squares, and in function spaces on "the maximum difference between two functions". Rather than retelling the theory on every new stage, we abstract "distance" itself: as long as a set carries a distance function satisfying three axioms, the whole theory of convergence transfers verbatim. That is a metric space.

But distance alone is not enough. The rationals ℚ have a distance, yet they are full of "holes": a sequence of rationals can approach √2 in the Cauchy sense while the limit is not in ℚ. So the intermediate value property, the workhorse of calculus, fails all over ℚ. A space with the holes filled is called complete; a complete space with a norm (a distance that can be added) is a Banach space. This lecture builds that stage; dual spaces, operators and spectral theory all perform on it later.

Motivating question: the set of polynomials with distance given by "maximum gap"—is it complete? If not, which functions are missing? The answer is Example 3 in Section 5.

## 2. Rigorous Definitions

**Metric space**: a nonempty set X equipped with a function d: X × X → ℝ such that for all x, y, z ∈ X:

1. **Positive definiteness**: d(x, y) ≥ 0, and d(x, y) = 0 if and only if x = y;
2. **Symmetry**: d(x, y) = d(y, x);
3. **Triangle inequality**: d(x, z) ≤ d(x, y) + d(y, z).

Then (X, d) is a metric space and d a metric.

**Normed space**: a norm ‖·‖: X → ℝ on a linear space X satisfies positive definiteness ‖x‖ ≥ 0 with ‖x‖ = 0 iff x = 0; homogeneity ‖αx‖ = |α|‖x‖; and the triangle inequality ‖x + y‖ ≤ ‖x‖ + ‖y‖. A normed space becomes a metric space via d(x, y) = ‖x − y‖.

**Convergence and Cauchy sequences**: a sequence {xₙ} converges to x if d(xₙ, x) → 0. {xₙ} is Cauchy if distances between terms tend to 0, i.e. d(xₙ, xₘ) → 0 as n, m → ∞. Every convergent sequence is Cauchy; the converse need not hold.

**Completeness and Banach spaces**: a metric space in which every Cauchy sequence converges is complete. A complete normed space is a Banach space.

Common examples:

| Space | Distance or norm | Complete? |
|---|---|---|
| ℝⁿ with the Euclidean distance | square root of the sum of squared coordinate differences | yes |
| The continuous function space C[a,b] | the maximum gap between two functions | yes |
| Square-summable sequences ℓ² | square root of the sum of squared absolute values | yes |
| p-summable sequences ℓ^p (1 ≤ p < infinity) | p-th root of the sum of p-th powers | yes |
| L^p spaces | p-th root of the integral of the p-th power | yes |
| The rationals ℚ | the usual distance | no |

## 3. Why Define It This Way

**Positive definiteness** locks "distance zero" to "the same point": distinct points must be at strictly positive distance, and a point must be at distance zero from itself. Keep only half of it—say, allow distinct points at distance 0—and you get a pseudometric space that "glues two points together"; quotient constructions use it, but classical limit theory needs points to be distinguishable.

**Symmetry** says distance has no direction. Drop it and you get a quasimetric space, where "x is near y" and "y is near x" may differ; even uniqueness of limits is lost, so the classical framework keeps it.

**The triangle inequality is the soul.** It says "a detour is never shorter". Without it the notion of a Cauchy sequence collapses: d(xₙ, xₘ) → 0 would no longer mean "the whole sequence bunches together". A concrete counterexample: on ℝ define d(x, y) = (x − y)². It is positive definite and symmetric, but d(0, 2) = 4 exceeds d(0, 1) + d(1, 2) = 2, so the triangle inequality fails; then "Cauchy" and "bounded" come apart and convergence theory cannot even start.

**Why is completeness indispensable?** Because it is exactly equivalent to "every Cauchy sequence converges", and convergence is the lifeline of calculus. The price of ℚ being incomplete is severe: the function x² − 2 changes sign on ℚ but has no zero, and the nested interval theorem fails. ℝ is precisely the completion of ℚ. A frequently used criterion in normed spaces: a linear subspace is complete if and only if it is closed—which explains why C[a,b] is complete while the polynomial subspace is not.

## 4. Intuition and Pictures

Think of a metric space as a map, the metric as "the fare between any two places", and the triangle inequality as "a transfer is never cheaper". A Cauchy sequence is a group of travellers getting closer and closer to one another, gathering somewhere; completeness guarantees that if the formation is converging, some passenger is standing there waiting—there is no "ghost destination".

The watershed between finite and infinite dimensions is the compactness of the unit ball: the unit sphere in ℝⁿ is compact, and every bounded sequence has a convergent subsequence; whereas the unit ball of an infinite-dimensional space "leaks everywhere"—this is the content of Riesz's lemma: outside any proper closed subspace one can find a unit vector nearly perpendicular to it. Every "difficulty peculiar to infinite dimensions" (spectra can be continuous, inverses can be unbounded, bounded sets need not be sequentially compact) originates here.

True-versus-false table:

| Statement | True/False | Explanation |
|---|---|---|
| A convergent sequence is Cauchy | true | follows directly from the triangle inequality |
| A Cauchy sequence converges | false | only in complete spaces; ℚ is a counterexample |
| A bounded sequence has a convergent subsequence | false | the infinite-dimensional unit ball is not compact; the basis vectors of ℓ² are a counterexample |
| All norms on a finite-dimensional space are equivalent | true | hence finite-dimensional normed spaces are complete |
| A complete subspace is a closed subspace | true | in normed spaces the two are equivalent |

## 5. Worked Examples

### Example 1 (Basic: verifying a Banach space)

Problem: prove that C[0,1] with the sup norm is a Banach space.

Approach: three things to prove: the sup norm really is a norm; C[0,1] is a linear space (obvious); completeness—take a Cauchy sequence in the sup norm, construct the limit pointwise, then show the convergence is uniform and the limit is continuous.

Solution: of the three norm axioms, positive definiteness and homogeneity are obvious; the triangle inequality follows from pointwise estimates followed by taking the maximum.

Completeness: suppose {fₙ} satisfies: for n, m ≥ N the maximum gap is less than ε. For each fixed point x, {|fₙ(x)|} is a Cauchy sequence in ℝ, hence convergent; call its limit f(x). Letting m → ∞ in the gap estimate, the maximum gap from fₙ to f is at most ε, i.e. {fₙ} converges uniformly to f. A uniformly convergent sequence of continuous functions has a continuous limit (the standard ε/3 argument), so f ∈ C[0,1]. Hence every Cauchy sequence converges and C[0,1] is complete, a Banach space.

### Example 2 (Intermediate: the contraction mapping principle)

Problem: let T(x) = cos x. Prove that T has a unique fixed point; starting from x₀ = 0, compute x₃ and give an error estimate.

Approach: ℝ is complete. By the mean value theorem the derivative of cos has absolute value at most sin 1, and sin 1 < 1, so T is a contraction.

Solution: for any x, y there is an intermediate point ξ with |cos x − cos y| = |−sin ξ||x − y| ≤ sin 1·|x − y|, and sin 1 ≈ 0.8415 < 1. By the contraction mapping principle T has a unique fixed point x*, and the iteration from any starting value converges to it, with error bound

$$d(x_n, x^*) \le \frac{q^n}{1-q}\,d(x_1, x_0), \qquad q = \sin 1$$

With x₀ = 0: x₁ = cos 0 = 1, x₂ = cos 1 ≈ 0.5403, x₃ = cos 0.5403 ≈ 0.8576. Also d(x₁, x₀) = 1, so for n = 3 the error is at most q³/(1 − q) ≈ 3.75. This bound is crude but rigorously valid (the true fixed point is about 0.7391), and it shows the value of the contraction principle: a computable error guarantee without solving the equation.

### Example 3 (Advanced: incomplete spaces and their "holes")

Problem: decide whether the following are complete: (a) ℚ with the usual distance; (b) the interval (0, 1] with the usual distance; (c) all polynomials on [0,1] with the sup norm.

Approach: to disprove completeness it suffices to construct a non-convergent Cauchy sequence; to prove it one generally "constructs the limit and verifies that it returns to the space".

Solution: (a) take the decimal truncations of √2: 1, 1.4, 1.41, 1.414, …. This is a Cauchy sequence in ℚ (truncations of equal length differ by at most a negative power of 10), but the limit √2 is not in ℚ. So it is incomplete.

(b) take xₙ = 1/n. It is Cauchy, and the limit 0 is not in (0,1]. It is exactly a dense but not closed subspace of ℝ—an incomplete subspace is one that "lacks a point".

(c) incomplete. Take the Taylor partial sums of the exponential, pₙ(x) = Σ_{k=0}ⁿ xᵏ/k!. On [0,1] the remainder is at most e/(n+1)!, so {pₙ} is Cauchy in the sup norm; it converges uniformly to eˣ, and eˣ is not a polynomial. So the sup closure of the polynomial space is all of C[0,1], and its completion is exactly the space of continuous functions—the functional-analytic form of the Weierstrass approximation theorem.

Comment: the shared trap is treating "incomplete" as a defect of the space. Incompleteness only says the space has holes, and completing it fills them: completing the polynomials gives continuous functions, completing ℚ gives ℝ. The answer to the motivating question: the polynomial space is incomplete, and what is missing is exactly all "non-polynomial continuous functions".

## 6. Common Mistakes and Pitfalls

1. Mistake: treating "Cauchy" and "convergent" as synonyms. Why wrong: Cauchy only requires terms to be close to each other, not that a limit point exists; the sequence in ℚ approaching √2 is a counterexample. Correct: decide completeness of the space first, then discuss "Cauchy implies convergent".
2. Mistake: assuming "a subspace inherits completeness automatically". Why wrong: only closed subspaces do; ℚ is a non-closed subspace of ℝ, and polynomials are a non-closed subspace of C[a,b]. Correct: completeness is equivalent to being closed.
3. Mistake: applying the contraction principle without checking that T maps the space into itself. Why wrong: for T(x) = x + 1 on (0, 1) the image leaves the space, so a fixed point is out of the question. Correct: confirm the range lies in X, then find the contraction constant.
4. Mistake: using an "upper bound" in place of a "minimum" when interpreting the sup norm. Why wrong: the sup norm takes a supremum; a continuous function on a compact interval attains its maximum, but on a non-compact set there may be a sup and no max. Correct: distinguish sup from max when writing norms.
5. Mistake: carrying finite-dimensional intuition into infinite dimensions, e.g. "bounded sets are sequentially compact". Why wrong: the unit vectors of ℓ² are pairwise at distance √2, so there is no convergent subsequence. Correct: sequential compactness is a very strong requirement and must be verified case by case.

## 7. Summary and Mnemonic

Key points reviewed:

- a metric space is a set plus a distance satisfying three axioms; a normed space is a linear space plus an additive norm.
- convergent implies Cauchy; Cauchy implies convergent if and only if the space is complete.
- a Banach space is a complete normed space; C[a,b], ℓ^p and L^p are the three model examples.
- the contraction mapping principle: completeness plus contraction yields existence, uniqueness and iteration with error estimates.
- the divide between finite and infinite dimensions: is the unit ball sequentially compact?

**Mnemonic: three axioms and a triangle, Cauchy needs completeness; contraction gives a fixed point, and iteration makes the error appear.**`,
    relatedProblemIds: ['p-fa-1'],
  },
  'dual-spaces': {
    chapter: 'Chapter 2 Dual Spaces',
    title: 'Linear Functionals and Dual Spaces',
    summary:
      'Continuous linear functionals are the "measuring devices" of a space; the dual space X* translates properties of the space into the language of functionals, and the Hahn–Banach theorem guarantees there are enough of them.',
    keyPoints: [
      'X* = all continuous linear functionals, with norm equal to the maximal amplification on the unit ball',
      'For linear functionals, continuous ⟺ bounded; Hahn–Banach guarantees there are enough of them',
      'Classical dualities: ℓ^p ↔ ℓ^q, C[a,b] ↔ Radon measures, L^p ↔ L^q',
      'Reflexive = the canonical embedding J: X → X** is surjective; ℓ^1 and c₀ are not reflexive',
    ],
    content: String.raw`

In finite-dimensional linear algebra a vector is "measured" by a row vector: multiply the row on the left of the column and get a number. In infinite dimensions the "measuring device" is a continuous linear functional—a map turning vectors into numbers that respects the linear structure. Physics is full of them: the field strength at a point is a functional, the flux in a given direction is a functional, and taking an inner product in quantum mechanics is a functional. Collecting all measuring devices gives another space, the dual space X*. The wonder is that studying X is often equivalent to studying X*; many properties that are hard to see in X (weak convergence, sequential compactness) become transparent from the vantage point of X*.

Motivating question: every linear functional on ℝⁿ has the form f(x) = a·x. So what do "all" continuous linear functionals on ℓ^p look like? Can something else appear in infinite dimensions? This is exactly what duality theory answers, in Example 3 of Section 5.

## 2. Rigorous Definitions

**Linear functional**: a map f from a normed space X over the field 𝔽 to 𝔽 satisfying f(αx + βy) = αf(x) + βf(y). **Continuous** means f(xₙ) → f(x) whenever xₙ → x.

**Dual space** X* = L(X, 𝔽) is the set of all continuous linear functionals, equipped with the dual norm:

$$\|f\| = \sup_{\|x\| \le 1} |f(x)| = \sup_{x \ne 0} \frac{|f(x)|}{\|x\|}$$

A linear functional is continuous if and only if it is bounded, i.e. the supremum above is finite—a free gift from linearity to analysis: a linear function continuous at the origin is controlled on the unit ball. With this norm X* is a normed space; when X is complete, X* is a Banach space.

**Hahn–Banach theorem (norm-preserving extension form)**: let M be a linear subspace of X and f a continuous linear functional on M. Then there exists F ∈ X* agreeing with f on M and not increasing the norm. Two standard corollaries:

- there are enough functionals: for any x₀ ≠ 0 there is f of norm 1 with f(x₀) = ‖x₀‖;
- geometric separation form: disjoint closed convex sets can be separated by a nonzero continuous linear functional.

**Reflexivity**: the dual of the dual, X**, is again a Banach space. The canonical embedding J: X → X** is defined by J(x)(f) = f(x). If J is surjective, X is called reflexive. In a reflexive space every bounded sequence has a weakly convergent subsequence, which is the engine of the direct method in the calculus of variations.

## 3. Why Define It This Way

**Why must functionals be continuous?** A discontinuous linear functional is useless in analysis: it can map a tiny vector to a huge number, and limits cannot be interchanged with operations. Using the axiom of choice one can manufacture plenty of nonlinear functionals, but they are unbounded and uncontrollable. The Hahn–Banach theorem guarantees that continuous functionals are "numerous enough"—without it the dual space might be empty and useless.

**Why take the supremum over the unit ball as the norm?** The "amplification factor" is the only quantity a linear functional cares about: the sup over the unit ball measures exactly that factor, and by homogeneity it equals the supremum of |f(x)|/‖x‖ over nonzero x. This also explains why functionals of smaller norm are "gentler".

**Why study reflexivity?** Reflexive spaces have the best weak sequential compactness: every bounded sequence has a subsequence converging weakly to some element. The standard variational scheme—minimizing sequence, extract a weakly convergent subsequence, pass to the limit using weak lower semicontinuity—draws its power at every step from reflexivity. In non-reflexive spaces (such as ℓ¹ and c₀) this machinery stalls.

## 4. Intuition and Pictures

Think of X as all the attributes of a commodity and X* as all the "price lists": each list f quotes a price f(x) for each item x; linearity means the price of a bundle equals the bundle of prices; ‖f‖ is the largest discount factor on the list. The Hahn–Banach theorem says that a price list defined on only some commodities can be extended consistently to all of them without raising the maximum factor.

A survey of classical dualities:

| Space | Dual space | Representation |
|---|---|---|
| ℝⁿ with the Euclidean norm | ℝⁿ itself | inner product f(x) = a·x |
| ℓ^p (1 < p < infinity) | ℓ^q with reciprocal exponents summing to 1 | summation f(x) = Σ aₙxₙ |
| ℓ^1 | ℓ^∞ | bounded sequences as coefficients |
| c₀ (sequences tending to 0) | ℓ^1 | dual to ℓ^1 |
| C[a,b] | space of signed Radon measures | Riesz representation: integration |
| L^p (1 < p < infinity) | L^q | Hölder's inequality |

Note the asymmetry at the two ends: the dual of ℓ^1 is ℓ^∞, but the dual of ℓ^∞ is much larger than ℓ^1, so ℓ^1 is not reflexive; for 1 < p < infinity both ℓ^p and L^p are reflexive. Reflexivity is a rare and precious property.

## 5. Worked Examples

### Example 1 (Basic: computing a dual norm)

Problem: X = ℝⁿ with the norm equal to the largest absolute coordinate. Find the dual norm of f(x) = Σ aᵢxᵢ.

Approach: the dual norm is a supremum over the unit ball; proceed in two steps: bound above, then construct a point attaining the bound.

Solution: upper bound: |f(x)| = |Σ aᵢxᵢ| ≤ Σ |aᵢ|·|xᵢ| ≤ Σ |aᵢ|, since each |xᵢ| ≤ 1. Take x with i-th coordinate equal to the sign of aᵢ and all others 0; the unit-ball condition holds and f(x) = Σ|aᵢ|. So the dual norm equals Σ|aᵢ|, the sum of absolute values of the coefficients. Compare the Euclidean case: there the dual norm is the square root of the sum of squared coefficients (Cauchy–Schwarz with equality). Same formula, different norm, different "size".

### Example 2 (Intermediate: extending a functional by Hahn–Banach)

Problem: let M be the line in ℝ² spanned by (1,1), with the max-coordinate norm. Define f(t, t) = t. Extend f to the whole plane without increasing its norm.

Approach: compute the norm of f on M, then look for extensions on the whole plane that do not increase it.

Solution: the unit ball of M consists of |t| = 1, where |f(t,t)| = 1, so the norm of f on M is 1. On the whole plane a linear functional has the form F(x,y) = αx + βy with norm |α| + |β| (the result of Example 1). The extension conditions are F(1,1) = α + β = 1 and |α| + |β| = 1. Coefficient pairs satisfying them include (1, 0), (1/2, 1/2), (0, 1): both F(x,y) = x and F(x,y) = (x+y)/2 are legitimate extensions. The extension is not unique, but every norm equals 1—exactly what "norm-preserving" means.

### Example 3 (Advanced: a non-reflexive space)

Problem: prove that c₀ with the sup norm is not reflexive.

Approach: it suffices that the canonical embedding is not surjective. We know (c₀)* = ℓ¹, so (c₀)** = (ℓ¹)*, which contains ℓ^∞.

Solution: consider the bounded constant sequence a = (1, 1, 1, …). It defines a functional F(y) = Σ yₙ on ℓ¹: the series converges absolutely and |F(y)| ≤ ‖y‖₁, so F ∈ (ℓ¹)* with ‖F‖ = 1 (take y to be the first basis vector for equality).

The image of the canonical embedding consists of sequences x in c₀ acting on ℓ¹ as J(x). If the constant sequence were in the image, there would be x ∈ c₀ with Σxₙyₙ = Σyₙ for all y ∈ ℓ¹; taking y the n-th basis vector gives xₙ = 1 for every n, so x does not tend to 0, a contradiction. Hence J is not surjective and c₀ is not reflexive.

Comment: the trap is that "the double dual is bigger" violates finite-dimensional intuition. In finite dimensions X ≅ X** is a theorem; in infinite dimensions it is only an embedding, and the "bounded sequences not tending to 0" in ℓ^∞ are exactly the extra part. The motivating question is now fully answered: for ℓ^p (1 < p < infinity) every functional is represented by an ℓ^q sequence, but asymmetry appears at ℓ^1 and ℓ^∞.

## 6. Common Mistakes and Pitfalls

1. Mistake: conflating "linear functional" with "continuous linear functional". Why wrong: every linear space has plenty of discontinuous functionals (defined via a Hamel basis), but they are unbounded and unusable in analysis. Correct: X* contains only the continuous ones.
2. Mistake: thinking the Hahn–Banach extension is unique. Why wrong: Example 2 gives at least three different extensions. Correct: the theorem guarantees existence and norm preservation only; uniqueness needs extra conditions (such as orthogonal decomposition in a Hilbert space).
3. Mistake: computing the dual norm over the "open unit ball". Why wrong: the supremum over the open and closed balls is the same (the norm is continuous), but if you mistake it for a maximum and hunt for an attaining point, the open ball has none. Correct: use the closed ball, and distinguish sup from max.
4. Mistake: concluding reflexivity from an abstract isomorphism X ≅ X*. Why wrong: reflexivity requires the canonical map J to be surjective, not "some isomorphism exists"; moreover ℓ¹ and ℓ^∞ are not even isomorphic as Banach spaces (the former is separable, the latter is not). Correct: reflexivity is about J, not about abstract isomorphism.
5. Mistake: confusing weak and strong convergence. Why wrong: the basis vectors of ℓ² do not converge strongly, yet every functional applied to them tends to 0, i.e. they converge weakly to 0. Correct: weak convergence is weaker; it allows "coordinates escaping and disappearing once measured by functionals".

## 7. Summary and Mnemonic

Key points reviewed:

- the dual space X* is all continuous linear functionals, with norm equal to the amplification on the unit ball.
- Hahn–Banach: a functional on a subspace extends without increasing the norm; hence there are enough functionals to separate points and norms.
- classical dualities: ℓ^p paired with ℓ^q, C[a,b] dual to Radon measures, L^p dual to L^q.
- reflexive means the canonical embedding is surjective; ℓ^p (1 < p < infinity) is reflexive, ℓ^1 and c₀ are not.

**Mnemonic: functionals measure vectors, the dual is another room; Hahn preserves norms to extend, and reflexivity asks whether J fills the hall.**`,
    relatedProblemIds: [],
  },
  'open-mapping': {
    chapter: 'Chapter 3 Fundamental Theorems',
    title: 'Open Mapping, Closed Graph, and the Uniform Boundedness Principle',
    summary:
      'Three theorems driven by Baire’s category theorem: completeness upgrades pointwise information to uniform information for free—the rigidity of Banach spaces.',
    keyPoints: [
      'Baire’s category theorem is the common engine of the three theorems',
      'Uniform boundedness: pointwise bounded ⟹ uniformly bounded (X complete)',
      'Open mapping: a bounded surjection between Banach spaces maps open sets to open sets; the inverse operator theorem is a corollary',
      'Closed graph: closed graph ⟹ bounded; completeness cannot be dropped (the differentiation counterexample)',
    ],
    content: String.raw`

In real analysis there is a fact: a complete metric space cannot be written as a countable union of "thin lines"—put plainly, the real line cannot be assembled from countably many nowhere-dense sets. This is Baire's category theorem. In the world of linear operators it detonates a string of startling conclusions: a family of operators that is pointwise bounded is automatically uniformly bounded; a linear operator whose graph is closed is automatically continuous; a surjective operator between Banach spaces automatically maps open sets to open sets. The three are jointly called the fundamental theorems of functional analysis, with the common theme: **completeness upgrades pointwise information to uniform information for free**.

Motivating question: the sequence of functions sin(nx) is bounded at each point x (by 1), but its sequence of derivatives equals n at x = 0, which is unbounded. Why cannot pointwise properties be upgraded automatically? What extra condition do the three theorems need? Example 1 in Section 5 provides a beautiful reversal.

## 2. Rigorous Definitions

**Baire's category theorem**: if a complete metric space is written as a countable union of closed sets, at least one of them has interior points. Equivalently: the intersection of countably many open dense sets is still dense.

**Uniform boundedness principle (resonance theorem)**: let X be a Banach space, Y a normed space, and {Tᵢ} a family of bounded linear operators from X to Y. If sup ‖Tᵢx‖ < ∞ for every x ∈ X (pointwise bounded), then sup ‖Tᵢ‖ < ∞ (uniformly bounded).

**Open mapping theorem**: let X, Y be Banach spaces and T ∈ L(X, Y) surjective. Then T maps open sets of X onto open sets of Y.

**Inverse operator theorem**: a direct corollary—if the above T is also injective, then T⁻¹ is bounded.

**Closed graph theorem**: let X, Y be Banach spaces and T: X → Y linear. If its graph (the set of all pairs point-image) is closed in the product space, then T is bounded.

## 3. Why Define It This Way

**Why can none of the three theorems do without completeness?** Because the main tool of proof is Baire's category theorem, whose stage must be complete. Proof of the open mapping theorem: surjectivity of T makes Y covered by countably many "closures of images of unit balls"; Baire gives one of them an interior point, linearity moves that point back to the origin, and the image of the unit ball contains a small ball. Without completeness, every step may collapse.

**Why does pointwise boundedness upgrade to uniform boundedness?** The intuition: if sup ‖Tᵢ‖ were infinite, the operators would grow "fiercer and fiercer"; but their fierceness is structural (linear), and beyond some threshold it must erupt at some point x, making ‖Tᵢx‖ unbounded. Continuity pins "the operator is fierce" to "it is fierce at some point"—so pointwise boundedness conversely shows there is a uniform ceiling on strength.

**Why is the closed graph theorem magical?** It converts verifying continuity, an analytic task, into verifying sequential closedness, a semi-algebraic task: it suffices to check "if xₙ → x and Txₙ → y, then y = Tx". The price is that the domain must be complete—Example 3 in Section 5 gives the classic case where the theorem fails for an incomplete domain.

## 4. Intuition and Pictures

Think of a family of operators as a group of workers, each with "strength" ‖Tᵢ‖. The resonance theorem says: if every piece of material x survives processing by all workers without exploding, then the workers' strength cannot grow without bound; there must be a uniform ceiling. In other words, infinity can only appear in a non-structural way; linearity plus completeness seal it off.

The three theorems at a glance:

| Theorem | Hypothesis | Conclusion |
|---|---|---|
| Resonance theorem | pointwise bounded | norms uniformly bounded |
| Open mapping theorem | surjective and bounded | open sets map to open sets |
| Inverse operator theorem | surjective and injective | the inverse is bounded |
| Closed graph theorem | closed graph | bounded |

Analogy: an incomplete space is like a table with holes, and whatever you put on it falls through; a Banach space is a solid table where everything rests securely. The conclusions of the three theorems look "free", but every hypothesis is "complete".

## 5. Worked Examples

### Example 1 (Basic: a standard application of the resonance theorem)

Problem: let there be a sequence aₙ. If for every sequence x ∈ c₀ tending to 0 the series Σ aₙxₙ converges, prove that Σ|aₙ| < ∞.

Approach: regard the partial sums as linear functionals on c₀ and apply the resonance theorem.

Solution: define Tₖ(x) = Σ_{n ≤ k} aₙxₙ. Each Tₖ is a continuous linear functional on c₀, and |Tₖ(x)| ≤ (Σ_{n ≤ k}|aₙ|)‖x‖∞. The hypothesis says that for every fixed x the series converges, i.e. {Tₖ(x)} converges, hence is certainly pointwise bounded. By the resonance theorem, sup ‖Tₖ‖ < ∞.

Compute ‖Tₖ‖: take the n-th coordinate of x equal to the sign of aₙ (for n ≤ k) and the rest 0; then ‖x‖∞ = 1 and Tₖ(x) = Σ_{n ≤ k}|aₙ|, so ‖Tₖ‖ = Σ_{n ≤ k}|aₙ|. Hence for all k, Σ_{n ≤ k}|aₙ| ≤ sup ‖Tₖ‖ < ∞, so Σ|aₙ| < ∞, i.e. a ∈ ℓ¹.

This is exactly the reversal of the motivating question: pointwise information (convergence of each series) suffices on a Banach space to yield a global conclusion.

### Example 2 (Intermediate: the closed graph theorem)

Problem: on ℓ² define T(xₙ) = (xₙ/n). Decide whether T is bounded.

Approach: a direct estimate gives the answer immediately; then take the closed graph route to experience "closed graph ⇒ bounded".

Solution: direct estimate: ‖Tx‖² = Σ|xₙ|²/n² ≤ Σ|xₙ|², so ‖T‖ ≤ 1; taking x = e₁ gives ‖T‖ = 1.

Closed graph route: suppose x⁽ᵏ⁾ → x and Tx⁽ᵏ⁾ → y. Convergence in ℓ² implies coordinatewise convergence, so yₙ = lim (x⁽ᵏ⁾ₙ/n) = xₙ/n, i.e. y = Tx. The graph is closed. By the closed graph theorem (ℓ² is complete), T is bounded.

### Example 3 (Advanced: completeness cannot be dropped)

Problem: let T be the differentiation operator from C¹[0,1] to C[0,1], both spaces with the sup norm. Prove that T is unbounded yet has closed graph.

Approach: this is the classic counterexample showing that "the domain is Banach" cannot be dropped in the closed graph theorem: C¹[0,1] with the sup norm is incomplete.

Solution: unboundedness: take fₙ(x) = sin(2πnx); then ‖fₙ‖∞ = 1 while ‖Tfₙ‖∞ = 2πn → ∞, so T is unbounded.

Closed graph: suppose fₖ → f uniformly and fₖ′ → g uniformly. By the fundamental theorem of calculus, fₖ(x) − fₖ(0) = ∫₀ˣ fₖ′(t)dt. Letting k → ∞, uniform convergence permits passing to the limit, giving f(x) − f(0) = ∫₀ˣ g(t)dt. The right side is differentiable with derivative g, so f ∈ C¹ and f′ = g, i.e. the limit (f, g) of (fₖ, fₖ′) lies in the graph. The graph is closed.

Incompleteness check: take gₙ(x) = √((x − 1/2)² + 1/n); it is Cauchy in the sup norm (the difference of values is controlled by 1/n − 1/m), with uniform limit |x − 1/2|, which is not differentiable at 1/2. So C¹[0,1] is incomplete.

Comment: T has closed graph yet is unbounded, while the operator on ℓ² is bounded—the difference is precisely whether the domain is complete. That is the boundary of the closed graph theorem: both spaces must be complete for the conclusion to hold.

## 6. Common Mistakes and Pitfalls

1. Mistake: remembering the resonance theorem backwards, as "uniform boundedness implies pointwise boundedness". Why wrong: that direction is trivial (direct estimate); the power of the theorem is in the other direction. Correct: hypothesis pointwise, conclusion uniform.
2. Mistake: forgetting "surjective" in the open mapping theorem. Why wrong: the projection onto the first coordinate is bounded and injective, yet maps an open disc to a segment, not an open set. Correct: open mapping requires surjectivity; the injective version is the inverse operator theorem, requiring both surjective and injective.
3. Mistake: applying the three theorems on incomplete spaces. Why wrong: the differentiation operator of Example 3 has closed graph but is unbounded. Correct: confirm completeness of the spaces first.
4. Mistake: thinking the closed graph theorem assumes T is already continuous. Why wrong: continuity is exactly the conclusion; the hypothesis is only the sequential condition "closed graph". Correct: check the roles of hypothesis and conclusion separately.
5. Mistake: confusing "closed graph" with "maps closed sets to closed sets". Why wrong: the former says the operator's graph is closed in the product space; the latter says the image preserves closedness—two entirely different notions. Correct: the closed graph theorem is about the former.

## 7. Summary and Mnemonic

Key points reviewed:

- Baire's category theorem is the engine: a complete space cannot be covered by countably many "thin lines".
- the three theorems: resonance (pointwise to uniform), open mapping (surjections preserve openness), closed graph (closed graph implies continuity), all requiring completeness.
- inverse operator theorem: a bijective bounded surjection between Banach spaces has an automatically bounded inverse.
- completeness cannot be dropped: the differentiation operator on C¹ is the best warning.

**Mnemonic: pointwise bounded means uniformly together, surjections swap open sets; a closed graph is automatically continuous, and all three theorems rest on completeness.**`,
    relatedProblemIds: [],
  },
  'hilbert-spaces': {
    chapter: 'Chapter 2 Hilbert Spaces',
    title: 'Hilbert Spaces',
    summary:
      'Complete spaces with an inner product: perpendicularity, projection and orthonormal bases bring geometric intuition into infinite dimensions.',
    keyPoints: [
      'The parallelogram law distinguishes inner-product norms from general norms',
      'Projection theorem: the best approximation point ⟺ the error is orthogonal to the subspace',
      'Riesz representation: a continuous linear functional is an inner product with some element',
      'Gram–Schmidt plus Parseval: a countable orthonormal basis gives a Fourier expansion',
    ],
    content: String.raw`

The two most useful things in Euclidean geometry are the Pythagorean theorem and projection. With them, "the shortest distance from a point to a line is along the perpendicular" becomes common sense, and least squares becomes an algorithm. The natural question of functional analysis is whether this intuition survives in infinite dimensions. The answer is yes—provided the space carries an inner product, a structure that defines lengths and angles. A complete space with an inner product is a Hilbert space: the class of Banach spaces most like Euclidean space, and the common language of quantum mechanics, signal processing and partial differential equations.

Motivating question: a norm induced by an inner product satisfies the parallelogram law. Conversely, does a norm satisfying the parallelogram law necessarily come from some inner product? Example 1 in Section 5 gives the complete answer.

## 2. Rigorous Definitions

**Inner product**: a function ⟨·, ·⟩: H × H → 𝔽 on a linear space H over the field 𝔽 satisfying:

1. **Positive definiteness**: ⟨x, x⟩ is a nonnegative real number, and ⟨x, x⟩ = 0 if and only if x = 0;
2. **Linearity in the first argument**: ⟨αx + βy, z⟩ = α⟨x, z⟩ + β⟨y, z⟩;
3. **Conjugate symmetry**: ⟨x, y⟩ and ⟨y, x⟩ are conjugates (symmetry in the real case).

The inner product induces the norm ‖x‖ = the square root of ⟨x, x⟩; a complete normed space whose norm comes from an inner product is a Hilbert space.

**Orthogonality and projection**: x and y are orthogonal if ⟨x, y⟩ = 0. The orthogonal complement M^⊥ of M is the set of all vectors orthogonal to every element of M.

**Projection theorem**: let H be a Hilbert space and M a closed linear subspace. For every x ∈ H there is a unique m₀ ∈ M with ‖x − m₀‖ = d(x, M), and x − m₀ is orthogonal to M. The map P_M: x ↦ m₀ is called the orthogonal projection onto M, and there is a direct sum decomposition H = M ⊕ M^⊥.

**Riesz representation theorem**: for every continuous linear functional f ∈ H* there is a unique z ∈ H with f(x) = ⟨x, z⟩ for all x, and ‖f‖ = ‖z‖.

**Orthonormal basis**: an orthonormal sequence {eₙ} in H whose span is dense is called an orthonormal basis. Equivalently, for every x the generalized Fourier expansion x = Σ ⟨x, eₙ⟩ eₙ holds, and Parseval's identity ‖x‖² = Σ |⟨x, eₙ⟩|² is valid.

## 3. Why Define It This Way

**Why conjugate symmetry rather than ordinary symmetry?** In the complex world the square of a length must be a nonnegative real number; with mere symmetry ⟨x, x⟩ could be complex and no real square root would exist. Conjugate symmetry guarantees ⟨x, x⟩ is real, and with positive definiteness one can take the square root. In real spaces this degenerates to symmetry and changes no conclusion.

**Why is the parallelogram law the key test?** Because not every norm comes from an inner product: the unit balls of ℓ¹ and ℓ^∞ are a diamond and a square, whereas an inner-product unit ball must be "round" enough to satisfy ‖x + y‖² + ‖x − y‖² = 2‖x‖² + 2‖y‖². Example 1 gives the converse: if a norm satisfies the parallelogram law, some inner product induces it. This is the "identity card" of a Hilbert space.

**Why does the projection theorem require M closed?** Because the best approximation point takes the infimum of the distance to M; if M is not closed, the infimum may be 0 and unattained (Example 3 in Section 5). Closedness guarantees that the "foot of the perpendicular" exists.

**Why is the Riesz representation theorem important?** It concretizes the dual space as H itself: every measuring device is an inner product with some vector. Studying functionals thus becomes studying vectors—the infinite-dimensional incarnation of finite-dimensional transposition, and the mathematical prototype of "every observable corresponds to a state" in quantum mechanics.

## 4. Intuition and Pictures

An inner product equips vectors with a protractor: a large inner product means directions are close, zero means perpendicular. The projection theorem says: drop a perpendicular from any point to a closed subspace, the foot is unique, and the error is orthogonal to the subspace—"the shortest distance goes along the perpendicular" still holds in infinite dimensions.

Analogy: a Hilbert space is like an infinite concert hall. An orthonormal basis is a set of "pure tones", and each piece x is decomposed into its spectrum ⟨x, eₙ⟩ over the pure tones; Parseval says the total energy of the piece equals the sum of the energies of the pure tones. Fourier analysis is exactly where this theorem gets its name.

True-versus-false table:

| Statement | True/False | Explanation |
|---|---|---|
| An inner-product space is necessarily complete | false | inner product plus completeness makes a Hilbert space |
| The parallelogram law holds | true | characteristic of inner-product spaces |
| Orthogonality makes sense in any normed space | false | orthogonality depends on an inner product |
| A separable Hilbert space has a countable orthonormal basis and is isomorphic to ℓ² | true | classification theorem |
| Every continuous linear functional comes from an inner product | true | Riesz representation theorem |

## 5. Worked Examples

### Example 1 (Basic: the parallelogram law and the polarization identity)

Problem: prove that inner-product spaces satisfy the parallelogram law; and conversely construct an inner product from a norm in the real case.

Solution: expand ‖x + y‖² = ⟨x + y, x + y⟩ = ‖x‖² + 2⟨x, y⟩ + ‖y‖²; similarly ‖x − y‖² = ‖x‖² − 2⟨x, y⟩ + ‖y‖². Adding the two gives:

$$\|x + y\|^2 + \|x - y\|^2 = 2\|x\|^2 + 2\|y\|^2$$

Conversely: given a real norm satisfying the parallelogram law, define ⟨x, y⟩ = (1/4)(‖x + y‖² − ‖x − y‖²). One checks directly that it is symmetric bilinear and positive definite (⟨x, x⟩ = ‖x‖²), and induces the original norm. In the complex case use ⟨x, y⟩ = (1/4) times the sum of four norm squares weighted by powers of i. Hence "the norm comes from an inner product" is equivalent to the parallelogram law.

Application: ℓ¹ violates the parallelogram law—take x = (1,0), y = (0,1); the left side is 4 + 4 = 8 and the right side is 2 + 2 = 4, unequal. So ℓ¹ and ℓ^∞ are not Hilbert spaces.

### Example 2 (Intermediate: computing a projection)

Problem: H = ℓ², M the set of all sequences whose third and later coordinates vanish. x = (1, 1/2, 1/3, 1/4, …). Find P_M x and d(x, M).

Approach: M is a closed subspace (coordinate convergence preserves a zero tail); its orthogonal complement is the set of sequences whose first two coordinates vanish.

Solution: decompose x as (1, 1/2, 0, 0, …) + (0, 0, 1/3, 1/4, …). The first term lies in M, the second is orthogonal to M (elements of M have arbitrary first two coordinates and zero tail, so the inner product involves only the first two coordinates, all zero). Hence:

$$P_M x = (1, \tfrac12, 0, 0, \dots), \qquad d(x, M)^2 = \sum_{n \ge 3} \frac{1}{n^2} = \frac{\pi^2}{6} - \frac54$$

The error vector (0, 0, 1/3, 1/4, …) is indeed orthogonal to M: ⟨(0, 0, 1/3, …), (a, b, 0, …)⟩ = 0·a + 0·b + Σ_{n≥3} (1/n)·0 = 0. The foot exists and is unique, exactly as the projection theorem asserts.

### Example 3 (Advanced: closedness cannot be dropped)

Problem: H = ℓ², M the set of all sequences with only finitely many nonzero coordinates. x = (1, 1/2, 1/4, 1/8, …). Find d(x, M) and explain whether a best approximation exists.

Approach: M is dense in ℓ² but not closed.

Solution: finite sequences are dense in ℓ² (truncation approximates), so d(x, M) = 0. If some m ∈ M satisfied ‖x − m‖ = 0, then x = m ∈ M, a contradiction (the coordinates of x are distinct and nonzero). So the infimum 0 is not attained and no best approximation exists. The trap is that M is not closed: in a closed subspace the foot always exists and is unique, while in a non-closed subspace there is not even a "foot". The answer to the motivating question (the polarization identity) was given in Example 1: the parallelogram law is a necessary and sufficient condition for an inner product.

## 6. Common Mistakes and Pitfalls

1. Mistake: thinking "equipped with an inner product" already makes a Hilbert space. Why wrong: Hilbert means inner product plus completeness; C[0,1] with the square-integrable inner product is incomplete, and only its completion is L². Correct: verify completeness first.
2. Mistake: forgetting the conjugate in a complex inner product, writing ⟨x, y⟩ = ⟨y, x⟩. Why wrong: they should be conjugates; getting it wrong can make ⟨x, x⟩ complex. Correct: fix one convention (e.g. linearity in the first argument) and keep it everywhere.
3. Mistake: conflating "orthogonal" with "linearly independent". Why wrong: orthogonal implies independent, but not conversely—(1,1) and (1,0) in the plane are independent but not orthogonal. Correct: orthogonality is stronger; orthogonalize with Gram–Schmidt.
4. Mistake: using Parseval ‖x‖² = Σ|xₙ|² for a non-orthogonal basis. Why wrong: the expansion coefficients are ⟨x, eₙ⟩, and only an orthonormal basis gives an energy decomposition. Correct: confirm orthonormality first.
5. Mistake: assuming the projection operator is invertible. Why wrong: P_M is idempotent and self-adjoint, with kernel M^⊥ unless M = H, so it is not invertible. Correct: projection compresses information; it is not an invertible transform.

## 7. Summary and Mnemonic

Key points reviewed:

- the square root of the inner product gives the norm; the parallelogram law is the identity card of an inner product (and the polarization identity reconstructs it).
- projection theorem: in a closed subspace the foot exists uniquely, and the error is orthogonal to the subspace.
- Riesz representation: H* is isomorphic to H; a functional is an inner product.
- an orthonormal basis gives a generalized Fourier series; a separable Hilbert space is isomorphic to ℓ².

**Mnemonic: inner product yields norm by square root, parallelogram proves the lineage; projection drops a foot in closed space, and Riesz makes functionals easy to find.**`,
    relatedProblemIds: ['p-fa-2'],
  },
  'operators': {
    chapter: 'Chapter 3 Bounded Linear Operators',
    title: 'Bounded Linear Operators and Spectra',
    summary:
      'The three fundamental theorems and spectral decomposition—matrix analysis extended to infinite dimensions, the mathematical language of quantum mechanics.',
    keyPoints: [
      'Bounded = continuous; the operator norm is the operator’s "height"',
      'The three theorems: resonance, open mapping, closed graph, with Baire’s theorem as the tool',
      'Spectrum = parameters at which the operator is not invertible; the spectrum of a compact operator consists almost entirely of eigenvalues',
      'The spectral theorem for self-adjoint operators: the mathematical language of quantum mechanics',
    ],
    content: String.raw`

The central object of linear algebra is the matrix: a linear map between finite-dimensional spaces. Delete the words "finite-dimensional" and you get a linear operator—the common protagonist of functional analysis and quantum mechanics. But boundedness is a new topic: in infinite dimensions "linear" no longer implies "continuous", and a linear operator can map a unit vector to one of arbitrary length (differentiation does exactly this). This lecture studies bounded linear operators: the space they form is itself a Banach space, and the algebra on it (composition, inversion, adjoint) and spectral theory are the main courses of the next two lectures.

Motivating question: a sequence of operators Tₙ can converge pointwise to 0 (every vector is squashed), yet never "converge to 0", because the norm stays 1. How deep is the gulf between pointwise and uniform convergence? Example 3 in Section 5 gives the standard answer.

## 2. Rigorous Definitions

**Bounded linear operator**: T: X → Y linear. The following three are equivalent:

1. T is continuous: xₙ → x implies Txₙ → Tx;
2. T maps bounded sets to bounded sets;
3. the operator norm is finite: ‖T‖ = sup{‖Tx‖ : ‖x‖ ≤ 1} < ∞.

Sketch of equivalence: 3 ⇒ 2 is obvious; 2 ⇒ 1 uses ε control; 1 ⇒ 3 by contradiction (if the norm were infinite, take unit vectors xₙ with ‖Txₙ‖ ≥ n; then xₙ/n → 0 but T(xₙ/n) does not tend to 0).

**Operator space** L(X, Y) is a normed space under the operator norm; when Y is complete it is a Banach space. Algebraic structure: operators can be added and multiplied by scalars; if T ∈ L(X, Y) and S ∈ L(Y, Z), then ST ∈ L(X, Z) with ‖ST‖ ≤ ‖S‖‖T‖.

**Invertibility**: T has a bounded inverse if there is S ∈ L(Y, X) with ST = I_X and TS = I_Y; then T is a linear isomorphism. There is no universal bound on the norm of the inverse—which is why the inverse operator theorem needs the Banach framework.

**Adjoint operator**: on a Hilbert space, T* is uniquely determined by ⟨Tx, y⟩ = ⟨x, T*y⟩; when T = T*, T is called self-adjoint. The spectral theory of self-adjoint operators is the language of observables in quantum mechanics.

## 3. Why Define It This Way

**Why remember that "bounded" and "continuous" are equivalent?** Because it is a gift from linearity to analysis: a general continuous map has no "norm", but the degree of continuity of a linear continuous map is fully captured by one number ‖T‖—the amplification factor. This makes L(X, Y) a normed space, giving "operator convergence", "operator series" and "operator topologies" a foothold.

**Why take the sup over the unit ball as the operator norm?** Because the amplification of a linear operator is uniform: controlling the image of the unit ball controls everything (homogeneity). Note the difference from "the image is bounded": the latter only asks for boundedness, the former for a uniform finite supremum—in infinite dimensions this is a qualitative difference.

**Why is the composition inequality ‖ST‖ ≤ ‖S‖‖T‖ important?** It makes operator multiplication compatible with the norm, so L(X) becomes a normed algebra—without it, operator series and operator exponentials could not be defined.

## 4. Intuition and Pictures

An operator is a vector-processing machine: input x, output Tx. Bounded means the machine cannot turn finite-sized raw material into an infinitely large product; its maximal throughput is ‖T‖. The adjoint T* is the infinite-dimensional version of "transpose": rewrite ⟨Tx, y⟩ in the other order as ⟨x, T*y⟩. A self-adjoint operator is like a mirror, acting symmetrically.

Three flavours of operator convergence:

| Type of convergence | Definition | Strength |
|---|---|---|
| Uniform convergence | ‖Tₙ − T‖ → 0 | strongest |
| Strong convergence | ‖Tₙx − Tx‖ → 0 for every x | intermediate |
| Weak convergence | f(Tₙx) → f(Tx) for every x and every functional f | weakest |

In finite dimensions the three coincide; in infinite dimensions they weaken level by level—another scene where finite-dimensional intuition fails.

## 5. Worked Examples

### Example 1 (Basic: the norm of an integral operator)

Problem: C[0,1] with the sup norm, (Tf)(x) = ∫₀¹ e^{x−y} f(y) dy. Find ‖T‖.

Approach: estimate pointwise first, then verify with a function attaining the bound.

Solution: for any ‖f‖∞ ≤ 1, |(Tf)(x)| ≤ ∫₀¹ e^{x−y}|f(y)|dy ≤ e^x ∫₀¹ e^{−y}dy = e^x(1 − e^{−1}) ≤ e(1 − e^{−1}) = e − 1. So ‖T‖ ≤ e − 1.

For the lower bound: take f ≡ 1 (norm 1); then (Tf)(1) = ∫₀¹ e^{1−y}dy = e − 1, so ‖T‖ ≥ e − 1. Together:

$$\|T\| = e - 1$$

### Example 2 (Intermediate: the shift operator and its adjoint)

Problem: the right shift on ℓ², S(x₁, x₂, …) = (0, x₁, x₂, …). Find ‖S‖ and S*, and verify S*S = I while SS* ≠ I.

Solution: ‖Sx‖² = Σ|xₙ|² = ‖x‖², so ‖S‖ = 1 (S is nonzero). For arbitrary y:

$$\langle Sx, y\rangle = \sum_{n \ge 1} (Sx)_n \overline{y_n} = \sum_{m \ge 1} x_m \overline{y_{m+1}} = \langle x, S^*y\rangle$$

Hence (S*y)ₘ = yₘ₊₁, i.e. S* is the left shift: S*(y₁, y₂, …) = (y₂, y₃, …). Then S*S(x) = S*(0, x₁, …) = x, so S*S = I; while SS*(y) = S(y₂, y₃, …) = (0, y₂, y₃, …), which differs from y when y₁ ≠ 0. SS* is the projection onto the subspace "first coordinate zero". Shifts are the typical isometric but non-unitary operators: the right shift loses the information in the first coordinate, and the left shift cannot restore it.

### Example 3 (Advanced: pointwise convergence is not uniform convergence)

Problem: on ℓ², Tₙ(x) = xₙe₁ (move the n-th coordinate to the first place). Prove that Tₙ → 0 strongly, but the norms do not tend to 0.

Solution: fix x ∈ ℓ²; then ‖Tₙx‖ = |xₙ|. Since Σ|xₙ|² < ∞, necessarily xₙ → 0, so Tₙx → 0 for every x (strong convergence). But:

$$\|T_n\| = \sup_{\|x\|_2 \le 1} |x_n| = 1 \quad (\text{taking } x = e_n)$$

So ‖Tₙ − 0‖ = 1 does not tend to 0, and the convergence is not uniform.

Comment: the trap is mistaking "every x is eventually squashed" for "the operator becomes 0". Strong convergence preserves neither norms, nor invertibility, nor continuity of the spectrum—which is exactly why the next lecture must introduce the uniform topology.

## 6. Common Mistakes and Pitfalls

1. Mistake: assuming every linear map is continuous. Why wrong: the differentiation operator D: C¹ → C is linear but unbounded. Correct: continuity must be verified; in infinite dimensions linear does not imply continuous.
2. Mistake: treating the sup as a max and hunting for an attaining point when computing norms. Why wrong: the sup norm takes a supremum; on a compact domain a continuous function attains it, but in general one only gets arbitrarily close. Correct: use sup language and state separately when the value is attained.
3. Mistake: using ‖ST‖ ≤ ‖S‖‖T‖ as an equality. Why wrong: composition can "loosen" (e.g. composing projections). Correct: the inequality already suffices to define series and exponentials.
4. Mistake: thinking a bijection at the level of maps has a bounded inverse. Why wrong: outside the Banach framework the inverse of a bijective linear map can be unbounded (the contrapositive of the inverse operator theorem). Correct: a bounded inverse requires the open mapping theorem, or a direct verification that the inverse has finite norm.
5. Mistake: transplanting the finite-dimensional conclusion "spectrum equals eigenvalues". Why wrong: in infinite dimensions continuous and residual spectra appear. Correct: re-examine with "is λI − T invertible?".

## 7. Summary and Mnemonic

Key points reviewed:

- bounded, continuous and finite norm are equivalent; ‖T‖ is the sup over the unit ball.
- L(X, Y) is a normed space (a Banach space when Y is complete); composition is submultiplicative.
- the adjoint generalizes the transpose; self-adjoint operators formalize quantum observables.
- three convergences: uniform stronger than strong, strong stronger than weak; in finite dimensions all collapse.

**Mnemonic: linear need not be continuous, bounded is continuous; one norm stands for ten, and the adjoint outdoes the transpose.**`,
    relatedProblemIds: ['p-fa-3'],
  },
  'spectral-theory': {
    chapter: 'Chapter 6 Spectral Theory',
    title: 'Spectral Theory of Bounded Operators',
    summary:
      'The spectrum is the set of parameters where "λI − T is not invertible": the spectral radius formula, the three spectral parts and the resolvent equation upgrade matrix eigenvalue theory to infinite dimensions.',
    keyPoints: [
      'Spectrum = parameters where λI − T is not invertible; the resolvent on the resolvent set satisfies the resolvent equation',
      'σ(T) is nonempty and compact; spectral radius formula r(T) = lim ‖Tⁿ‖^{1/n}',
      'Point, continuous and residual spectra: three ways of failing; matrices have only point spectrum',
      'σ(T*) is the complex conjugate of σ(T); the Neumann series inverts for large |λ|',
    ],
    content: String.raw`

In linear algebra all the secrets of solving (λI − A)x = y are hidden in the determinant: nonzero gives a unique solution, zero allows nonzero solutions. Infinite dimensions have no determinant, but the question remains: given an operator T and a parameter λ, when is λI − T invertible? The answer partitions the whole complex plane into a "safe zone" and a "minefield", and the minefield is the spectrum of T. The spectrum is the operator's genome: it determines how functions of the operator are defined and the solution structure of differential equations; in quantum mechanics it is the observable energy levels.

Motivating question: a matrix has finitely many spectral points (eigenvalues), and its spectral radius is exactly the largest eigenvalue modulus. What about infinite dimensions? The right shift has no eigenvalues at all, yet its spectrum fills the whole closed unit disc—here the landscape of infinite-dimensional spectral theory begins.

## 2. Rigorous Definitions

**Resolvent set and spectrum**: let T ∈ L(X). If λI − T is a linear isomorphism onto X with bounded inverse, λ belongs to the resolvent set ρ(T). The set σ(T) = ℂ minus ρ(T) is the spectrum. For λ ∈ ρ(T), R(λ, T) = (λI − T)⁻¹ is the resolvent.

**The three parts of the spectrum** (classified by how invertibility fails):

- point spectrum: λI − T is not injective, i.e. Tx = λx has a nonzero solution (λ is an eigenvalue);
- continuous spectrum: λI − T is injective with dense but not surjective image;
- residual spectrum: λI − T is injective but the image is not dense.

**Basic properties of the spectrum** (X a Banach space):

1. σ(T) is a nonempty compact set;
2. spectral radius r(T) = sup{|λ| : λ ∈ σ(T)} ≤ ‖T‖;
3. spectral radius formula: r(T) = lim of the n-th root of ‖Tⁿ‖ (the limit exists);
4. resolvent equation: R(λ, T) − R(μ, T) = (μ − λ)R(λ, T)R(μ, T);
5. σ(T*) is the complex conjugate of σ(T);
6. polynomial spectral mapping: p(σ(T)) = σ(p(T)).

## 3. Why Define It This Way

**Why define the spectrum by "invertibility" rather than by "eigenvalues"?** Because in infinite dimensions "λI − T is not invertible" happens in far richer ways than "has an eigenvalue": it can be injective with an image missing a closure point, or surjective but not injective. The division into point, continuous and residual spectra records the three failure modes one by one. In the matrix world only the point spectrum remains, and finite-dimensional intuition must be upgraded.

**Why must the spectrum be nonempty?** This is a purely analytic theorem: if ρ(T) were the whole complex plane, then R(λ, T) would be a bounded operator-valued analytic function on ℂ whose norm tends to 0 as |λ| → ∞, contradicting Liouville's theorem (a bounded entire function is constant). Note it depends on X being complete—on incomplete spaces there exist operators with empty spectrum.

**Why is the spectral radius formula important?** It converts the radius of the spectrum, a geometric object, into the growth rate of operator powers, a dynamical object: r(T) = lim ‖Tⁿ‖^{1/n}. For submultiplicative sequences, Fekete's lemma guarantees the limit exists.

## 4. Intuition and Pictures

Think of the complex plane as a map of parameters: the resolvent set is the safe zone where λI − T works well; the spectrum is the minefield. The "larger" the operator, the larger the minefield; the spectral radius is its radius, at most ‖T‖. When λ is large enough, λI − T resembles λ(I − T/λ) and the Neumann series gives an explicit inverse:

$$(\lambda I - T)^{-1} = \frac1\lambda \sum_{n=0}^{\infty} \left(\frac{T}{\lambda}\right)^n, \qquad |\lambda| > \|T\|$$

Portraits of the three spectral parts:

| Operator | Point spectrum | Continuous spectrum | Residual spectrum |
|---|---|---|---|
| Finite-dimensional matrix | all eigenvalues | none | none |
| Right shift on ℓ² | empty | the unit circle | the interior of the unit disc |
| Left shift on ℓ² | the interior of the unit disc | the unit circle | empty |

## 5. Worked Examples

### Example 1 (Basic: the spectrum of a matrix)

Problem: let A be the matrix of a 90-degree rotation in the plane, first row (0, −1), second row (1, 0). Find σ(A).

Solution: the determinant of λI − A is λ² + 1. It is nonzero exactly when λ ≠ ±i, so σ(A) = {i, −i}, all point spectrum: Ax = ix has the solution x = (1, −i); check A(1, −i) = (i, 1) = i(1, −i). The spectral radius is 1, equal to the operator norm. In finite dimensions the spectrum equals the set of eigenvalues, and the spectral radius is the largest eigenvalue modulus.

### Example 2 (Intermediate: the spectrum of the right shift)

Problem: the right shift on ℓ², S(x₁, x₂, …) = (0, x₁, x₂, …). Prove that σ(S) is the closed unit disc, and describe its parts.

Approach: split into |λ| > 1 and |λ| ≤ 1; the first uses the Neumann series, the second proves non-surjectivity.

Solution: (1) |λ| > 1: ‖S/λ‖ = 1/|λ| < 1, so λI − S = λ(I − S/λ) is invertible with inverse given by the Neumann series; hence λ ∈ ρ(S).

(2) |λ| ≤ 1: prove that λI − S is not surjective. First injectivity: Tx = 0 means λx₁ = 0 and xₙ₊₁ = λxₙ, which by recursion gives x = 0 (from the first equation when λ ≠ 0; when λ = 0, Sx = 0 gives x = 0 directly), so λI − S is always injective.

Now non-surjectivity: let y = e₁. The equation (λI − S)x = e₁ reads, coordinate by coordinate, λxₙ − xₙ₋₁ = yₙ (with x₀ = 0), giving xₙ = λ^{−n}. When |λ| ≤ 1 we have |xₙ| ≥ 1, so x is not square-summable and not in ℓ². Hence e₁ is not in the image and the map is not surjective. So the closed unit disc is contained in σ(S); combined with boundedness of σ(S) (radius at most ‖S‖ = 1), σ(S) is the closed unit disc.

Classification of parts: the point spectrum is empty (injectivity was shown); for |λ| < 1 the image is not dense (since λ̄ is an eigenvalue of the left shift, whose eigenvalues are exactly the interior of the unit disc), giving residual spectrum; for |λ| = 1 the image is dense but not surjective (e₂ is likewise not in the image: the solution is xₙ = λ^{−(n−1)} with modulus 1), giving continuous spectrum.

### Example 3 (Advanced: spectral radius and structural traps)

Problem: decide true or false and justify: (1) the spectrum of a bounded operator is nonempty; (2) σ(T) equals σ(T*); (3) the spectral radius equals ‖T‖; (4) the spectrum of a compact operator is finite.

Solution: (1) true. On a Banach space the spectrum of a bounded operator is nonempty (Liouville argument).

(2) false. The relation is complex conjugation: σ(T*) = conjugate of σ(T). They coincide only for self-adjoint operators.

(3) false. Only ≤ holds. A nilpotent operator (T² = 0 but T ≠ 0) has spectral radius 0 while ‖T‖ > 0; in general r(T) = lim ‖Tⁿ‖^{1/n} can be strictly smaller than ‖T‖.

(4) false. The spectrum of a compact operator is at most countable and may be infinite: e.g. the diagonal operator T(xₙ) = (xₙ/n) on ℓ² has spectrum {1/n} ∪ {0}, an infinite set (details in the next lecture).

## 6. Common Mistakes and Pitfalls

1. Mistake: understanding "λ ∈ σ(T)" as "Tx = λx has a nonzero solution". Why wrong: that is only the point spectrum; in infinite dimensions λI − T can be injective yet non-invertible because it is not surjective or its image is not closed. Correct: the spectrum is the set of all non-invertible parameters, and must be subdivided into three parts.
2. Mistake: thinking "|λ| ≥ ‖T‖ means λ lies in the resolvent set". Why wrong: the Neumann series requires |λ| strictly greater than ‖T‖; on the circle |λ| = ‖T‖ one may be in the spectrum (the unit circle of the right shift is continuous spectrum). Correct: only the strict inequality is safe.
3. Mistake: confusing σ(T) with σ(T*). Why wrong: they are related by complex conjugation and need not be equal. Correct: σ(T*) is the conjugate of σ(T).
4. Mistake: remembering "the spectrum is compact" as "the spectrum is finite". Why wrong: only matrices have finite spectra; compact operators can have countable spectra; a general operator's spectrum can be a whole disc. Correct: compact is not finite.
5. Mistake: applying the spectral radius formula to unbounded operators. Why wrong: the formula holds for bounded operators; unbounded spectral theory needs a different framework (e.g. self-adjoint unbounded operators on Hilbert space). Correct: confirm boundedness first.

## 7. Summary and Mnemonic

Key points reviewed:

- the spectrum is the set of parameters where λI − T is not invertible; the resolvent satisfies the resolvent equation.
- σ(T) is nonempty and compact; the spectral radius formula r(T) = lim ‖Tⁿ‖^{1/n} ≤ ‖T‖.
- point, continuous and residual spectra correspond to three ways of failing; in finite dimensions only the point spectrum remains.
- σ(T*) is the conjugate of σ(T); the polynomial spectral mapping holds.

**Mnemonic: spectrum is the minefield, resolvent the safe harbour, the radius formula computes the limit; point, continuous and residual, and infinite dimensions have all three.**`,
    relatedProblemIds: [],
  },
  'compact-operators': {
    chapter: 'Chapter 7 Compact Operators',
    title: 'Compact Operators and Riesz–Schauder Theory',
    summary:
      'Compact operators squash bounded sets into relatively compact ones and are the operators closest to matrices: every nonzero spectral point is an isolated eigenvalue, and the Fredholm alternative holds.',
    keyPoints: [
      'Compact operators map bounded sets to relatively compact sets; finite-rank operators approximate every compact operator in norm',
      'The spectrum is at most countable; nonzero spectral points are isolated eigenvalues with finite-dimensional eigenspaces; 0 is always in the spectrum',
      'Riesz–Schauder theory: the Fredholm alternative at nonzero parameters',
      'The Volterra operator: σ = {0} and 0 is not an eigenvalue',
    ],
    content: String.raw`

The world of finite-dimensional matrices is pleasant: eigenvalues exhaust the spectrum, multiplicities are finite, and Jordan forms exist. In infinite dimensions the spectrum of a general bounded operator can be continuous and eigenvalues may not exist. Compact operators are the operators that are "almost finite-dimensional": they squash the unit ball into an almost sequentially compact set—any bounded sequence passed through them carries a convergent subsequence. As a result most of the beautiful conclusions of matrix theory revive: all spectral points except 0 are eigenvalues, eigenspaces are finite-dimensional, 0 is the only possible accumulation point, and the Fredholm alternative holds. The theory of integral equations and the solution of elliptic partial differential equations are built on this cornerstone.

Motivating question: the Volterra operator Vf(t) = ∫₀ᵗ f makes functions smoother; what is its spectrum? Does it have eigenvalues? Example 2 in Section 5 gives the startling answer: the spectrum is only {0}, and 0 is not an eigenvalue at all.

## 2. Rigorous Definitions

**Compact operator**: T: X → Y bounded linear. If T maps every bounded set in X to a relatively compact set in Y (compact closure), T is compact. Equivalently: the image of any bounded sequence has a convergent subsequence.

**Finite-rank operators** (finite-dimensional image) are compact; when Y is complete, every compact operator can be approximated in norm by finite-rank operators—the space of compact operators is exactly the norm closure of the finite-rank operators.

**Spectral theorem for compact operators (Riesz–Schauder)**: let X be a complex Banach space and T compact. Then:

1. σ(T) is at most countable; when X is infinite-dimensional, 0 always belongs to σ(T);
2. every nonzero spectral point is an eigenvalue, and its eigenspace is finite-dimensional;
3. the nonzero eigenvalues are isolated in σ(T), the only possible accumulation point being 0.

**Riesz–Schauder theory (Fredholm alternative)**: T compact, λ ≠ 0. Then either (λI − T)x = y has a unique solution for every y; or the homogeneous equation (λI − T)x = 0 has a nonzero solution, the solution space is finite-dimensional, and then the inhomogeneous equation is solvable if and only if y is orthogonal to the solutions of the adjoint problem (in the Hilbert space case).

## 3. Why Define It This Way

**Why is "relatively compact" the right notion of compactness?** It carries finite-dimensional sequential compactness to infinite dimensions: a bounded sequence passed through T has a convergent subsequence. Mere boundedness is too weak (the ℓ² unit ball is bounded but not sequentially compact), while relative compactness captures exactly "squashed to look finite-dimensional".

**Why is 0 always in the spectrum in infinite dimensions?** If 0 were not in σ(T), then T would be invertible: the image of the unit ball would contain a small ball, and that image is relatively compact, so the unit ball would be sequentially compact and Riesz's lemma would force the space to be finite-dimensional. Hence a compact operator on an infinite-dimensional Banach space is never invertible.

**Why do nonzero eigenvalues have finite multiplicity and are isolated?** If dim ker(λI − T) were infinite, one could choose unit vectors pairwise at distance at least 1 in it; their images are λ times themselves, with no convergent subsequence, contradicting compactness. Isolation is similar: if a sequence of nonzero eigenvalues converged to μ ≠ 0, combining with the eigenvectors again produces a sequence without a convergent subsequence, a contradiction.

## 4. Intuition and Pictures

A compact operator is like a compressor: however wild the input sequence (as long as it is bounded), the output allows a convergent subsequence to be extracted—it freezes most of the infinite-dimensional degrees of freedom. The extreme case is a finite-rank operator: the output lands in a finite-dimensional grid and matrix theory applies directly; a general compact operator is a limit of finite-rank operators, and "approximability by finite rank" is the root of its good spectral properties.

Analogy: a compact operator is like a low-dimensional projector for high-dimensional data. Information is compressed into finite dimensions, the observable energy levels become discrete, and they can only pile up at the origin.

| Property | General bounded operator | Compact operator |
|---|---|---|
| Shape of the spectrum | any nonempty compact set | at most countable, plus 0 |
| Nonzero spectral points | may be continuous | must be isolated eigenvalues |
| Eigenspace dimension | may be infinite | finite at nonzero eigenvalues |
| Is 0 in the spectrum? | not necessarily | always, in infinite dimensions |
| Fredholm alternative | absent | holds |

## 5. Worked Examples

### Example 1 (Basic: rank-one operators)

Problem: let X be a Banach space, f ∈ X*, y₀ ∈ Y. Define Tx = f(x)y₀. Prove that T is compact and find ‖T‖.

Solution: ‖T‖ = ‖f‖‖y₀‖: on one hand |f(x)y₀| ≤ ‖f‖‖x‖‖y₀‖; on the other, take x with f(x) = ‖f‖ for equality. The image is the one-dimensional space spanned by y₀. Let {xₙ} be bounded; then {f(xₙ)} is a bounded sequence of numbers, hence has a convergent subsequence (Bolzano–Weierstrass), so {Txₙₖ} converges. Compactness holds. Rank-one operators are the smallest nonzero units of compact operators.

### Example 2 (Intermediate: the Volterra operator)

Problem: on L²[0,1], Vf(t) = ∫₀ᵗ f(s)ds. Prove that V is compact, σ(V) = {0}, and 0 is not an eigenvalue.

Approach: compactness via the Arzelà–Ascoli idea; the spectral radius via estimates of ‖Vⁿ‖; absence of eigenvalues via a differential equation.

Solution: (1) compactness: let ‖f‖₂ ≤ 1 and g = Vf. By Cauchy–Schwarz, |g(t)| ≤ ∫₀ᵗ|f| ≤ ‖f‖₂√t ≤ 1 (uniform boundedness); and |g(t) − g(s)| ≤ ∫ₛᵗ|f| ≤ ‖f‖₂√|t − s| ≤ √|t − s| (equicontinuity). By the Arzelà–Ascoli theorem the image set is relatively compact in C[0,1], and sup convergence implies L² convergence, so V is compact.

(2) spectral radius: the integral kernel of Vⁿ is (t − s)^{n−1}/(n−1)! (by induction), whose squared L² norm equals 1/((n − 1)!)² times the integral over the triangular region, namely 1/((2n − 1)(2n)); hence ‖Vⁿ‖ ≤ 1/(n − 1)!. Therefore:

$$r(V) = \lim_{n\to\infty} \sqrt[n]{\|V^n\|} \le \lim_{n\to\infty} \frac{1}{\sqrt[n]{(n-1)!}} = 0$$

The spectrum is nonempty (bounded operators on a Banach space), so σ(V) = {0}.

(3) no eigenvalues: suppose Vf = λf. If λ = 0, then Vf = 0 forces f = 0 a.e. If λ ≠ 0, take a continuous representative: Vf is continuous, hence f is continuous, Vf is differentiable with derivative f, so λf is differentiable with (λf)′ = f, giving f′ = f/λ. The solution is f(t) = Ce^{t/λ}; and Vf(0) = 0 = λf(0), so C = 0 and f = 0. So 0 is not an eigenvalue.

Comment: this shatters the last illusion that "spectral points are eigenvalues": 0 cannot be removed from the spectrum yet can be a purely continuous spectral point. The trap is that invertibility in infinite dimensions requires a bounded inverse—V is injective with dense image, yet not invertible. The answer to the motivating question: σ(V) = {0} and there are no eigenvalues.

### Example 3 (Advanced: the Fredholm alternative)

Problem: the diagonal operator T(xₙ) = (λₙxₙ) on ℓ² with λₙ → 0. Prove that T is compact and discuss (I − T)x = y using the alternative.

Approach: λₙ → 0 makes T compact (approximation by finite-rank truncations); solve the equation coordinatewise.

Solution: compactness: let T_N keep only the first N coordinates (zeroing the rest); it has finite rank and is compact; ‖T − T_N‖ = sup_{n > N}|λₙ| → 0, and the norm limit of compact operators is compact (relative compactness of finite-rank images plus uniform convergence), so T is compact.

Spectrum: the nonzero λₙ are all eigenvalues (eigenvectors the basis vectors), and 0 ∈ σ(T) (infinite dimensions). Nonzero eigenvalues are isolated (λₙ → 0), with multiplicity 1.

Alternative: is 1 an eigenvalue? If some λₙ = 1, the homogeneous equation has a nonzero solution (the n-th basis vector), the solution space dimension equals the number of coordinates with λₙ = 1 and is finite; then (I − T)x = y is solvable if and only if yₙ = 0 on those coordinates. If all λₙ ≠ 1, the infimum of (1 − λₙ) is positive (since λₙ → 0, denominators at large indices are at least 1/2, and only finitely many early ones are nonzero), the inverse is the diagonal operator (1/(1 − λₙ)), which is bounded, and every y is solved uniquely.

Comment: this is exactly infinite-dimensional matrix solving: a diagonal compact operator is a countably dimensional diagonal matrix, all conclusions parallel linear algebra, with the ghost spectral point 0 added.

## 6. Common Mistakes and Pitfalls

1. Mistake: conflating "compact" with "bounded". Why wrong: the identity on ℓ² is bounded but not compact (the unit ball is not sequentially compact). Correct: compact is strictly stronger than bounded; verify relative compactness.
2. Mistake: thinking the spectrum of a compact operator is finite. Why wrong: λₙ = 1/n gives a sequence of eigenvalues, the spectrum being {1/n} ∪ {0}, countably infinite. Correct: at most countable, with 0 the only possible accumulation point.
3. Mistake: assuming a compact operator must have eigenvalues or that 0 is invertible. Why wrong: the Volterra operator has spectrum {0}, while 0 is neither an eigenvalue nor invertible. Correct: 0 cannot be removed from the spectrum, but may be a continuous spectral point.
4. Mistake: using the Fredholm alternative at λ = 0. Why wrong: the alternative holds only for λ ≠ 0; for λ = 0 the question is invertibility of −T, impossible in infinite dimensions. Correct: discuss the alternative only at nonzero parameters.
5. Mistake: verifying compactness only by "the image is bounded". Why wrong: boundedness is too weak; compactness requires relative compactness. Correct: use Arzelà–Ascoli for function spaces, and finite-rank approximation for diagonal or integral operators.

## 7. Summary and Mnemonic

Key points reviewed:

- compact operators squash bounded sets into relatively compact sets; finite-rank operators are compact and approximate every compact operator in norm.
- the spectrum is at most countable; nonzero spectral points are isolated eigenvalues with finite-dimensional eigenspaces; 0 is always in the spectrum (infinite dimensions).
- Riesz–Schauder theory: the Fredholm alternative holds at nonzero parameters.
- the Volterra operator: spectrum {0} with no eigenvalues, the extreme example of a compressed spectrum.

**Mnemonic: compact operators mimic matrices, nonzero spectral points are eigenvalues; the zero point in the spectrum cannot be removed, and the alternative is clarified by Riesz–Schauder.**`,
    relatedProblemIds: [],
  },
};

export default map;
