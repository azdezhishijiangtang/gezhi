import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'analytic-functions': {
    chapter: 'Chapter 1 Analytic Functions',
    title: 'Analytic Functions',
    summary: 'Complex differentiability is far stricter than real differentiability: once differentiable, a function is automatically infinitely differentiable, admits a Taylor expansion, and is conformal—the Cauchy–Riemann equations are the judge.',
    content: String.raw`

The "differentiability" of a complex function and that of a real function look like a one-character difference, but are in fact worlds apart. For a real function @@M0@@ to be differentiable at a point, the difference-quotient limits from the left and right need only coincide; but for a complex function @@M1@@ to be differentiable at a point, the difference quotient @@M3@@ must approach the same value as @@M2@@ approaches that point from infinitely many directions in the plane. The constraint instantly jumps from "a line" to "the entire plane". For this reason, complex differentiability (analyticity) becomes an extremely rigid condition: once differentiable in a neighborhood of a point, the function is automatically infinitely differentiable, can be expanded into a Taylor series, and preserves angles—properties unthinkable in the real world, yet "factory defaults" in the complex world.

In this topic we start from the definitions of the complex limit and complex differentiability, derive the Cauchy–Riemann equations that decide complex differentiability, and use them to explain "why complex differentiability is so powerful". All later theory—Cauchy's integral theory, residues, and power series—is built on the cornerstone of "analyticity".

## 2. Rigorous Definitions

A complex number @@M4@@, where @@M5@@, @@M6@@. Euler's formula

@@M7@@

**Complex differentiability (derivative)**: Suppose @@M8@@ is defined in a neighborhood of @@M9@@,

@@M10@@

When the limit exists (and equals the same value along every path of approach), we say @@M11@@ is differentiable at @@M12@@.

**Analytic (holomorphic)**: If @@M13@@ is differentiable at every point of a region @@M14@@, then @@M15@@ is said to be analytic in @@M16@@; if it is analytic only in some neighborhood of @@M17@@, then @@M18@@ is analytic at @@M19@@.

Writing @@M20@@, where @@M21@@ are real-valued functions.

**Cauchy–Riemann equations (C–R equations)**: If @@M22@@ is differentiable at @@M23@@, then @@M24@@ satisfies

@@M25@@

If the first-order partial derivatives of @@M26@@ are continuous in @@M27@@ and satisfy the C–R equations, then @@M28@@ is differentiable at @@M29@@, and

@@M30@@

## 3. Why Define It This Way

**Why is complex differentiability so much stronger than real differentiability?** Real differentiability only looks at two directions; complex differentiability looks at infinitely many. For example, @@M31@@: the difference quotient @@M32@@. Approaching along the real axis (@@M33@@, @@M34@@ real), the quotient is @@M35@@; approaching along the imaginary axis (@@M36@@), the quotient is @@M37@@. The two directional limits differ, so @@M38@@ is nowhere differentiable. The severity of complex differentiability is thus evident.

**Why are the C–R equations a necessary condition?** From the definition of the derivative, along the real-axis direction @@M39@@ (@@M40@@ real):

@@M41@@

Along the imaginary-axis direction @@M42@@:

@@M43@@

The two must be equal; comparing real and imaginary parts yields @@M44@@ and @@M45@@—precisely the C–R equations. The consistency of the two path limits forces out these two conditions.

**Why do we also need "continuous partial derivatives" for sufficiency?** The C–R equations are only necessary and do not guarantee differentiability (there exist pathological functions satisfying C–R yet not differentiable). Adding continuous partial derivatives lets us express the increment via the total differential, @@M46@@, and the difference-quotient limit exists. Continuity is the safety cushion for "sufficiency".

**Why does the derivative formula look that way?** The @@M47@@ computed along the real axis above is precisely the derivative, because it agrees with the result along the imaginary axis (guaranteed by C–R). So whenever C–R holds and the partials are continuous, the derivative simply equals @@M48@@ (and also @@M49@@, which are equal).

## 4. Intuition and Pictures

Think of complex differentiability as "mapping an infinitesimal disk in the plane to an infinitesimal disk": the derivative @@M50@@ is a complex number whose modulus @@M51@@ is the scaling factor and argument @@M52@@ is the rotation angle. Because scaling and rotation treat every direction on the disk equally, the angle between curves is exactly preserved—this is "conformality". Real differentiability cannot do this: it is defined only in one dimension and has no notion of "angle".

The C–R equations have a beautiful geometric reading: view @@M53@@ as a mapping from @@M54@@ to @@M55@@ on the plane; the C–R equations are equivalent to the mapping's Jacobian being a "rotation + scaling" form (an orthogonal matrix times a scalar), with no shear. A mapping that contains shear (such as @@M56@@) distorts angles, and is therefore not differentiable.

> Intuition: complex differentiability = locally a "similarity transformation" (rotate and scale), with absolutely no shear; this is precisely the geometric root of its great power.

Right-or-wrong comparison:

| Claim | True/False | Explanation |
|---|---|---|
| Complex differentiability is equivalent to the real and imaginary parts each being differentiable | ✗ | The C–R equations must also hold jointly |
| Satisfying C–R guarantees differentiability | ✗ | Continuous partial derivatives (or extra conditions) are also needed |
| @@M57@@ differentiable at a point @@M58@@ analytic | ✗ | Analyticity requires differentiability at every point of a neighborhood |
| Nonzero derivative @@M59@@ conformality | ✓ | A local similarity transformation preserves angles |
| @@M60@@ analytic | ✗ | Nowhere differentiable (limits differ along different axes) |

## 5. Worked Examples

### Example 1 (Basic: using C–R to test differentiability)

Problem: Determine whether @@M61@@ and @@M62@@ are analytic.

Analysis: Write out @@M63@@ and verify the C–R equations and continuity of partial derivatives.

Solution: For @@M64@@, so @@M65@@. Partial derivatives: @@M66@@. C–R: @@M67@@ ✓, @@M68@@ ✓, and the partials are continuous everywhere, hence @@M69@@ is analytic on the whole plane (entire function), and @@M70@@ (consistent with direct differentiation).

For @@M71@@, this is a real-valued function, @@M72@@. The C–R equations require @@M73@@, @@M74@@, which can hold only at @@M75@@. Hence it is nowhere differentiable except at the origin, let alone analytic.

Comment: Entire functions (e.g. @@M76@@, @@M77@@, polynomials) are analytic everywhere; yet a "seemingly simple" real-valued function like @@M78@@ has extremely weak complex differentiability—because being real-valued means @@M79@@, and the C–R equations force @@M80@@ to be constant except at isolated points.

### Example 2 (Intermediate: finding the imaginary part of an analytic function)

Problem: Given the analytic function @@M81@@ with real part @@M82@@, find @@M83@@ (using C–R).

Analysis: Use C–R to find @@M84@@, then assemble @@M85@@. One may also recognize this as @@M86@@.

Solution: From @@M87@@, integration gives

@@M88@@

Moreover, from @@M89@@, while @@M90@@, hence @@M91@@.

Therefore @@M92@@. Hence

@@M93@@

Verification: @@M94@@ ✓, the real part matches. Taking @@M95@@ gives one branch.

Comment: Finding an analytic function from its real part (or its imaginary part from the real part) is a classic application of C–R; in essence it completes the other half in the sense of a "harmonic conjugate". Note that an extra real constant @@M96@@ appears (corresponding to a global shift of the imaginary part), which is allowed—adding a pure constant does not change analyticity.

### Example 3 (Advanced: exponential and logarithm, the first appearance of multi-valuedness)

Problem: Explain why the complex logarithm @@M97@@ is multi-valued, and indicate how to choose a single-valued branch.

Analysis: The solution of the complex exponential @@M98@@ is not unique, because @@M99@@.

Solution: Set @@M100@@; then @@M102@@ satisfying @@M101@@ is

@@M103@@

All of these are called logarithms of @@M104@@, denoted @@M105@@, where the argument @@M106@@ can take infinitely many values differing by @@M107@@—this is multi-valuedness. Take the principal branch @@M108@@, where @@M109@@. To make the principal branch single-valued and analytic, we must cut a "branch cut" out of the plane (usually the negative real axis), because across the negative real axis the argument jumps discontinuously from @@M110@@ to @@M111@@.

Comment: Multi-valuedness is one of the fundamental differences between complex and real functions. Its root lies in the periodicity of the exponential function, @@M112@@. The branch cut is not a "true singularity" of the function, but an artificial slit made when choosing a branch; crossing the branch cut makes the function value jump by @@M113@@. The power function @@M114@@ is similarly multi-valued.

## 6. Common Mistakes and Pitfalls

1. **Thinking the real and imaginary parts being separately differentiable is enough.** @@M115@@ being differentiable with respect to @@M116@@ individually does not imply @@M117@@ is complex-differentiable; the C–R equations must hold jointly. Counterexample: if @@M118@@, then C–R fails (@@M119@@ while @@M120@@).

2. **Using C–R as a sufficient condition without checking continuity of partials.** There exist functions satisfying C–R yet not differentiable at a point (by constructing discontinuous partials). The standard sufficient condition is "partials exist, are continuous, and satisfy C–R".

3. **Calling "differentiable at a point" "analytic".** Analyticity requires differentiability at every point of a neighborhood; differentiability at a single point is too weak (e.g. @@M121@@ is differentiable at the origin but not analytic).

4. **Forgetting the complex logarithm is multi-valued.** Writing @@M122@@ directly without noting the multi-valuedness of @@M123@@, or reusing the same branch across a branch cut, leads to wrong conclusions. Always specify which branch is taken.

5. **Confusing @@M124@@ with the real exponential.** The complex exponential has period @@M125@@ (@@M126@@) and is unbounded (@@M127@@ can be arbitrarily large), completely unlike the real exponential which is monotonic and bounded on one side.

## 7. Summary and Mnemonic

Key points:

- Complex differentiability requires @@M128@@ to approach the same limit along every path, far stricter than real differentiability.
- The C–R equations @@M129@@ are a necessary (and, with continuous partials, sufficient) condition for complex differentiability.
- Where the derivative is nonzero, the function is locally a rotation plus scaling, preserving angles (conformal); this is the origin of conformal mapping.
- Analytic functions are automatically infinitely differentiable and admit Taylor expansions, with extremely strong rigidity.
- The logarithm and power functions are multi-valued because of the periodicity of the exponential, requiring a branch cut for a single-valued branch.

**Mnemonic: Complex differentiability sees all directions; Cauchy–Riemann is the judge; real and imaginary parts pair up as conjugates; conformal, rotating, and scaling.**`,
    keyPoints: ['Analytic = complex-differentiable, far stronger than real differentiability (limits agree along all paths)', 'C–R equations: u_x = v_y, u_y = −v_x', 'Nonzero derivative is conformal—the geometric origin of conformal mapping', 'Logarithm and power functions are multi-valued; use a branch cut for a single-valued branch'],
  },
  'cauchy-theory': {
    chapter: 'Chapter 2 Cauchy Integral Theory',
    title: 'Cauchy Integral Theorem and Formula',
    summary: 'Integrating around a closed curve probes the singularities inside—the integral of an analytic function over a closed loop is zero, and the formula computes derivatives from boundary values.',
    content: String.raw`

A real integral travels along a segment of the real axis, where the path is unique. A complex integral, however, can travel along any curve in the plane—which brings a wonder absent from real analysis: integrating around a closed curve, the result may be neither zero nor dependent on the length of the path; it depends only on which singularities the curve "encloses". The Cauchy integral theorem says: if the function is analytic everywhere inside the closed curve (no singularities), then the integral around the loop is zero; the Cauchy integral formula goes further: even if one point inside is undefined, the values on the boundary completely determine the function value at every interior point.

These two conclusions radically change our understanding of "integration": a complex integral is not an accumulation but a "probe". Like a probe, it reads out all the information about the analytic function inside the curve in one loop. The fundamental theorem of algebra, Liouville's theorem, and the higher-derivative formula all grow out of this probe. In this topic we first discuss estimates for complex integrals, then derive the Cauchy theorem and formula, and finally look at several heavyweight corollaries.

## 2. Rigorous Definitions

**Complex integral (along a curve)**: Let @@M130@@ be a piecewise smooth curve, parameterized by @@M131@@; then

@@M132@@

**ML estimate (integral inequality)**: If @@M133@@ on @@M134@@, and @@M135@@ is the arc length of @@M136@@, then

@@M137@@

**Cauchy integral theorem**: If @@M138@@ is analytic in a simply connected region @@M139@@, and @@M140@@ is any closed curve (rectifiable) in @@M141@@, then

@@M142@@

For a multiply connected region: the integral over the outer boundary equals the sum of the integrals over the inner boundaries (the boundaries of the holes), all taken in the positive direction.

**Cauchy integral formula**: If @@M143@@ is analytic on and inside a closed curve @@M144@@, then for any interior point @@M145@@,

@@M146@@

**Higher-derivative formula**: Differentiate repeatedly under the integral sign with respect to @@M147@@ (analyticity justifies this),

@@M148@@

## 3. Why Define It This Way

**Why does the complex integral multiply by @@M149@@?** A complex integral is the complex packaging of a real vector integral: it views @@M150@@ as the "directed accumulation" of @@M151@@ along the tangent @@M152@@. @@M153@@ carries the curve's direction and speed, guaranteeing the integral is independent of the parametrization (as long as the direction is consistent).

**Why is the loop integral zero when simply connected and analytic @@M154@@?** Intuitively, an analytic function is locally approximated by a constant plus a linear term, and the closed-loop integral of the linear term @@M155@@ is obviously zero; divide the region into many small cells, the internal boundaries cancel pairwise, leaving only the outer boundary, and each small cell is approximately zero, so the whole is zero. Rigorously, by Green's theorem the loop integral becomes an integral over the region of @@M156@@, and the C–R equations make the integrand zero. This tightly binds "analytic" and "loop integral is zero" together.

**Why is there a @@M157@@ in the denominator of the Cauchy formula?** The integrand @@M158@@ has a simple pole (singularity) at @@M159@@; looping around it exactly "fishs out" the information at @@M160@@; the factor @@M161@@ normalizes the residue. In other words, the formula encodes "the value of the function at @@M162@@" into the circulation around @@M163@@.

**Why can we differentiate under the integral sign to get higher derivatives?** Ordinary real integrals must be handled with great care when differentiating under the sign, but here the integrand is analytic in the parameter @@M164@@ and the integration region is fixed, so complex analysis guarantees termwise differentiation. Thus a single integral gives all derivatives of @@M165@@ at once—something impossible in the real world (one integral gives only one value). This is the most powerful proof that "analytic @@M166@@ is infinitely differentiable".

## 4. Intuition and Pictures

Think of the Cauchy integral formula as "the boundary votes to decide the interior": the function value at an interior point @@M167@@ is the weighted sum of every boundary point @@M168@@ with weight @@M169@@. The weight is larger in directions close to @@M170@@, but all boundary points participate. So "the boundary knows everything"—once the boundary values are given, the interior is uniquely locked in.

The ML estimate is the "safety net" of integration: it tells us the absolute value of the integral cannot exceed "max size of the function × path length". When the path is long or the function values are small, the integral is naturally small—a powerful tool for proving many limit and existence results.

> Intuition: the Cauchy theorem says "no singularity, no circulation"; the Cauchy formula says "one hole, and the circulation tells you the value at the hole's center". A complex integral is a probe; all the information inside the loop is read out by it.

Right-or-wrong comparison:

| Claim | True/False | Explanation |
|---|---|---|
| A closed-loop integral is always zero | ✗ | Only when there is no singularity inside (simply connected and analytic) |
| Multiply connected: outer boundary integral = sum of inner boundaries | ✓ | Same positive direction; the holes' contributions count |
| Cauchy formula requires @@M171@@ outside | ✗ | @@M172@@ must lie @@M173@@ inside |
| An analytic function is necessarily infinitely differentiable | ✓ | Given directly by the higher-derivative formula |
| The ML estimate gives an exact value | ✗ | It only gives an upper bound, often a rough one |

## 5. Worked Examples

### Example 1 (Basic: computing an integral with the Cauchy theorem and formula)

Problem: Compute @@M174@@.

Analysis: The integrand has a simple pole at @@M175@@, and @@M176@@ lies inside the circle; everywhere else it is analytic. Apply the Cauchy integral formula directly.

Solution: Write it as @@M177@@; comparing with the Cauchy formula @@M178@@, take @@M179@@ (@@M180@@ is analytic inside @@M181@@, since @@M182@@ is entire). Hence

@@M183@@

Verification: The integrand indeed has its only singularity at @@M184@@ and inside the circle, so the conditions of the Cauchy formula are met. If the pole @@M185@@ lies outside the circle, then the integrand is analytic inside, and the integral should be @@M186@@.

Comment: When facing an integral of "an analytic function over @@M187@@" along a closed curve enclosing @@M188@@, think of the Cauchy formula rather than computing by brute force. If @@M189@@ lies outside the circle, the answer is immediately @@M190@@ (Cauchy theorem). Take the positive (counterclockwise) direction.

### Example 2 (Intermediate: higher-derivative formula for an integral)

Problem: Compute @@M191@@.

Analysis: The denominator @@M192@@ corresponds to the formula for the @@M193@@-th derivative.

Solution: By the higher-derivative formula, @@M194@@:

@@M195@@

Take @@M196@@ (@@M197@@, inside the circle). @@M198@@, hence @@M199@@. Therefore

@@M200@@

Comment: Integrals of @@M201@@ at higher-order poles use the @@M202@@-th derivative formula. The key is to recognize @@M203@@ (the "good" part in the numerator) and @@M204@@, and to compute @@M205@@ accurately. Keep the positive direction.

### Example 3 (Advanced: Liouville's theorem and the fundamental theorem of algebra)

Problem: Use Liouville's theorem to prove the fundamental theorem of algebra: any non-constant polynomial @@M206@@ with complex coefficients has at least one zero.

Analysis: Proof by contradiction—if @@M207@@ has no zero, then @@M208@@ is a bounded entire function, hence constant by Liouville, a contradiction.

Solution: Liouville's theorem: a bounded entire function (analytic and bounded on the whole plane) must be constant.

Assume by contradiction that @@M209@@ is a non-constant polynomial with no zero. Then @@M210@@ is analytic on the whole plane (no poles). As @@M211@@, since @@M212@@ is non-constant, @@M213@@, hence @@M214@@, so @@M215@@ is bounded on the whole plane. By Liouville's theorem, @@M216@@ is constant, and therefore @@M217@@ is also constant—a contradiction. Hence @@M218@@ must have a zero.

Comment: This is the "crown jewel" of complex analysis—a seemingly purely algebraic statement proved in four lines with analytic tools. The core is "no zero @@M219@@ implies reciprocal is a bounded entire function @@M220@@ constant". Note that Liouville's theorem requires analyticity and boundedness on "the whole plane"; if only on a half-plane or a bounded region, the conclusion fails.

## 6. Common Mistakes and Pitfalls

1. **Assuming a closed-loop integral is zero by default.** It is zero only when the function is analytic on and inside the curve; if there is a singularity inside (pole, essential singularity), the integral is generally nonzero. First judge with the Cauchy theorem, then use the formula.

2. **Getting the position of @@M221@@ wrong in the Cauchy formula.** @@M222@@ must lie @@M223@@ inside; if @@M224@@ lies on @@M225@@ (the boundary) the formula does not apply (the integral diverges), and if outside the integral is zero. Always first confirm the relative position of @@M226@@ and @@M227@@.

3. **Miscounting the order @@M228@@ in the higher-derivative formula.** The denominator @@M229@@ corresponds to @@M230@@, i.e. a cubic corresponds to @@M231@@ (second derivative), not the third. Rule of thumb: power minus one = order of derivative.

4. **Ignoring the curve's orientation.** The formula assumes the positive (counterclockwise) direction; if clockwise, the result differs by a minus sign. When unspecified, take the positive direction and state it.

5. **Using the ML estimate as an exact value.** ML is only an upper bound; it suffices to prove "the integral tends to zero", but you cannot invert it to conclude the integral equals @@M232@@. Misuse yields false equalities.

## 7. Summary and Mnemonic

Key points:

- A complex integral @@M233@@; the ML estimate @@M234@@ is a safety net.
- Cauchy theorem: the loop integral of an analytic function in a simply connected region is zero; for multiply connected regions count the "holes".
- Cauchy formula: interior value = boundary integral @@M235@@, the boundary decides everything.
- Higher-derivative formula: a single integral gives all derivatives, analytic @@M236@@ is infinitely differentiable.
- Liouville's theorem (bounded entire function = constant) proves the fundamental theorem of algebra, a model of analytic power.

**Mnemonic: No singularity in the loop, integral zero; only a hole reveals the probe's power; enclose once and the value is fixed; higher derivatives in one stroke.**`,
    keyPoints: ['Cauchy theorem: loop integral of an analytic function in a simply connected region is 0', 'Cauchy formula: interior value = boundary integral / (2πi)', 'Higher-derivative formula: analytic ⇒ infinitely differentiable, with bounded derivatives', 'Liouville theorem: bounded entire function = constant (analytic proof of the fundamental theorem of algebra)'],
  },
  'residues': {
    chapter: 'Chapter 3 Residue Theory',
    title: 'Residue Theorem',
    summary: 'The "charge" at a singularity is called a residue; the closed-loop integral = 2πi × the sum of residues inside—turning a difficult integral into a search for poles.',
    content: String.raw`

The residue theorem is an "upgraded" version of the Cauchy integral formula: the Cauchy formula handles the case of "only one removable singularity inside (actually filled in by @@M237@@)", while the residue theorem handles the general case of "a bunch of singularities inside". Every isolated singularity is like a small box hiding an electric charge; looping around it once fishes out a "charge" equal to the residue; summing the charges of all boxes inside the loop and multiplying by @@M238@@ gives the integral over the whole closed curve.

The most stunning application of the residue theorem is to real integrals: many integrals intractable on the real axis (such as @@M239@@, various rational-function integrals, and integrals involving trigonometric functions) only need "a semicircular arc added" to become a complex closed loop, and the residues at the singularities automatically hand over the answer. In this topic we first classify isolated singularities, then define residues and give computation methods, and finally show three major applications (real integrals, the argument principle, Rouché's theorem).

## 2. Rigorous Definitions

Suppose @@M240@@ is analytic in the punctured neighborhood @@M241@@ of @@M242@@; then @@M243@@ is an **isolated singularity**. Its Laurent expansion

@@M244@@

Classification by the negative-power terms:

| Type | Laurent negative part | Example |
|---|---|---|
| Removable singularity | None (@@M245@@) | @@M246@@ at @@M247@@ |
| @@M248@@-th order pole | Down to @@M249@@ | @@M250@@ at @@M251@@ |
| Essential singularity | Infinitely many negative powers | @@M252@@ at @@M253@@ |

**Residue**: the Laurent coefficient @@M254@@, i.e.

@@M255@@

**Residue theorem**: If @@M256@@ is analytic on and inside a closed curve @@M257@@ except for finitely many singularities @@M258@@, then

@@M259@@

## 3. Why Define It This Way

**Why does the residue look only at @@M260@@?** In the Laurent expansion, the negative-power term @@M261@@ (@@M262@@), when integrated around a small circle, gives @@M263@@ (since its antiderivative is @@M264@@, returning to the original value on the closed loop); the constant term and positive-power terms also integrate to zero; only @@M265@@ has antiderivative @@M266@@, which gains exactly @@M267@@ in one loop. So only @@M268@@ "survives" in the circulation—the residue singling out @@M269@@ is the geometric inevitability of integration.

**Why is the order of a pole determined by the lowest negative power?** If the lowest negative power is @@M270@@, it means the function diverges near @@M271@@ like @@M272@@; the order @@M273@@ quantifies "the strength of the singularity". The larger @@M274@@, the more violent the divergence.

**Why is the residue at a simple pole @@M275@@?** Because @@M276@@ is analytic at @@M277@@ (canceling the first-order pole in the denominator), the limit is simply its value @@M278@@ there. This is the direct operation of "cancel the singularity and look at the remnant".

**Why does the residue theorem hold?** Inside @@M280@@, cut out a small circle around each singularity; the remaining region @@M281@@ is analytic, and by the Cauchy theorem the integral over @@M282@@ equals the sum of the integrals over the small circles; each small-circle integral is @@M283@@ times the residue at that point. So the integral over the whole @@M284@@ is @@M285@@ the sum of residues. The residue theorem is the precise ledger of the Cauchy theorem when "there are multiple holes".

## 4. Intuition and Pictures

Think of each isolated singularity as a charge source in an electric circuit; the residue is its "charge amount"; the closed curve @@M286@@ is a Gaussian-surface probe, and by Gauss's law (here the residue theorem) the total flux detected @@M287@@ the total interior charge. A removable singularity has zero charge (nothing there), a simple pole is a unit charge, and an essential singularity is "infinitely many charges in a mess", indescribable by a simple order.

Picard's theorem captures the madness of an essential singularity: in an arbitrarily small neighborhood of an essential singularity, the function takes almost every complex value (at most one exception). For example, @@M288@@ near @@M289@@, approaching along different directions yields arbitrarily large values or tends to @@M290@@—it "almost" takes every value.

> Intuition: the residue is the one coefficient @@M291@@ that the singularity "leaks" into the integral; all other negative-power terms cancel each other out when looping, and only it survives.

Right-or-wrong comparison:

| Claim | True/False | Explanation |
|---|---|---|
| Residue = @@M292@@ | ✗ | The residue is @@M293@@ (coefficient of the minus-first power) |
| A removable singularity has zero residue | ✓ | No negative-power term, @@M294@@ |
| An essential singularity has a definite order | ✗ | Infinitely many negative powers, no order |
| Residue at a simple pole = @@M295@@ | ✓ | Obtained by canceling the first-order pole |
| The residue theorem requires simply connected | ✗ | Multiply connected (with holes) is precisely where it shines |

## 5. Worked Examples

### Example 1 (Basic: residue at a simple pole)

Problem: Find the residue at @@M296@@ and compute @@M297@@.

Analysis: The poles @@M298@@ are all simple (since @@M299@@). Use the simple-pole formula.

Solution: At @@M300@@, the denominator factor @@M301@@, and the rest is analytic and nonzero at @@M302@@. Simple-pole formula:

@@M303@@

Similarly @@M304@@.

The circle @@M305@@ encloses two poles, @@M306@@ and @@M307@@, hence

@@M308@@

Comment: For a simple pole, "cancel the denominator factor and take the limit" is fastest. One may also use the formula @@M309@@: @@M310@@, at @@M311@@ we have @@M312@@, consistent. The equal residues at the two poles reflect symmetry.

### Example 2 (Intermediate: real integral—rational-function type)

Problem: Compute @@M313@@.

Analysis: The integrand is even, with a quartic denominator and constant numerator, satisfying the upper-half-plane residue condition (@@M314@@).

Solution: Consider the complex function @@M315@@; the poles in the upper half-plane satisfy @@M316@@, i.e. @@M317@@. In the upper half-plane take the two roots whose arguments lie in @@M318@@: @@M319@@. They are both simple poles.

Use the formula @@M320@@ (since @@M321@@). Hence

@@M322@@

(because @@M323@@, @@M324@@; @@M325@@, @@M326@@ has modulus @@M327@@.)

Sum of residues @@M328@@.

Therefore the integral @@M329@@.

Comment: The upper-half-plane method is the "workhorse" of residue applications. Always confirm that the integral over the infinite semicircular arc tends to zero (ML estimate: arc length is @@M330@@, function value is @@M331@@, product is @@M332@@). If @@M333@@, the arc integral does not vanish and this method fails.

### Example 3 (Advanced: Rouché's theorem counting zeros)

Problem: Prove that the equation @@M334@@ has exactly @@M336@@ roots in the unit disk @@M335@@.

Analysis: Use Rouché's theorem; on @@M337@@ split the polynomial into a "principal part" and a "small perturbation".

Solution: On @@M338@@, take @@M339@@, then @@M340@@. The remainder @@M341@@ has modulus

@@M342@@

By Rouché's theorem, @@M343@@ and @@M344@@ have the same number of zeros inside @@M345@@. But @@M346@@ has @@M347@@ zeros in the disk (@@M348@@, fivefold). Hence the original polynomial has exactly @@M349@@ roots in @@M350@@.

Comment: Rouché's theorem is the art of "using the big to suppress the small": on the boundary, if @@M351@@, then @@M352@@ and @@M353@@ have the same number of zeros. Choose @@M354@@ so that its zeros are easy to count (usually the highest-degree or some dominant term). Note that multiple roots are counted by multiplicity; if @@M355@@ has a zero on the boundary the theorem's condition fails and you must change the boundary.

## 6. Common Mistakes and Pitfalls

1. **Taking the residue to be @@M356@@ or some other coefficient.** The residue is strictly the coefficient @@M357@@ of @@M358@@ in the Laurent expansion, not the constant term @@M359@@. Looping a small circle only "fishes out" @@M360@@.

2. **Applying the simple-pole formula to a higher-order pole.** The simple-pole formula @@M361@@ fails for an @@M362@@-th order pole; an @@M363@@-th order pole requires @@M364@@. Determine the order first, then choose the formula.

3. **Forgetting to verify the infinite arc tends to zero in a real integral.** The upper-half-plane method must prove the integral over the large semicircular arc is @@M365@@ (otherwise there is a leakage term). Use ML: arc length × max modulus. @@M366@@ is a sufficient condition.

4. **Writing the Rouché inequality backwards.** The condition is @@M367@@ (on the boundary @@M368@@ dominates); if written as @@M369@@ the conclusion holds for @@M370@@ rather than @@M371@@, and the zero count becomes that of @@M372@@. The principal part must be the "large" one.

5. **Forcing a residue computation for an essential singularity and ignoring the expansion.** An essential singularity has no pole formula; you can only expand the Laurent series directly and take @@M373@@; trying to use @@M374@@ yields infinity or an error.

## 7. Summary and Mnemonic

Key points:

- Three kinds of isolated singularities: removable (no negative powers), @@M375@@-th order pole (down to @@M376@@), essential (infinitely many negative powers).
- Residue @@M377@@, the only coefficient that "survives" one loop around the singularity; residue theorem: closed-loop integral @@M378@@ sum of residues.
- Simple pole @@M379@@; @@M380@@-th order pole differentiate @@M381@@ times; essential singularity expand the series.
- Three application giants: real integrals (upper-half-plane method), argument principle (counting zeros), Rouché's theorem (using the big to suppress the small).
- Picard's theorem: an essential singularity takes almost every complex value in a neighborhood.

**Mnemonic: Singularities fall in three kinds; the residue takes only c_{-1}; after summing the closed-loop integral, real integrals and Rouché show their might.**`,
    keyPoints: ['Three kinds of singularities: removable / pole / essential, by the Laurent negative part', 'Residue theorem: closed-loop integral = 2πi × sum of interior residues', 'Simple pole: take the limit; higher-order pole: differentiate (m−1) times', 'Argument principle and Rouché theorem: turn an integral into counting zeros'],
  },
  'power-series': {
    chapter: 'Chapter 4 Power Series Expansion',
    title: 'Power Series Representation of Analytic Functions',
    summary: 'An analytic function is not only infinitely differentiable, but can be expanded into a convergent power series at every point—the power series is the "ID card" of an analytic function, and its radius is set by the nearest singularity.',
    content: String.raw`

In real functions, an infinitely differentiable function (such as @@M382@@ at @@M383@@) need not expand into a Taylor series convergent to itself—the Taylor series may converge to a different function, or even nowhere converge to the original. But in the complex world this tragedy does not happen: as long as a function is analytic at a point, its Taylor series necessarily converges to the function itself within some disk centered at that point. The power series thus becomes the "ID card" of analytic functions—analytic and "locally expandable into a power series" are completely equivalent.

This yields a very practical criterion: to decide whether a function is analytic, you need not struggle with the C–R equations; just see whether it can be written as a power series. Moreover, the convergence range of a power series is determined by the "nearest singularity": the singularity acts like a wall, blocking the disk of convergence inside the wall. This topic clarifies the convergence structure of power series, Taylor and Laurent expansions, and the profound conclusion that "radius = distance to the nearest singularity".

## 2. Rigorous Definitions

**Power series**: a series of the form @@M384@@. There exists a radius of convergence @@M385@@ (including @@M386@@) such that it converges absolutely when @@M387@@ and diverges when @@M388@@; on @@M389@@ a separate judgment is needed.

**How to find the radius of convergence**:

@@M390@@

**Taylor theorem (equivalent characterization of analyticity)**: @@M391@@ analytic at @@M392@@ @@M393@@ has an expansion in some neighborhood of @@M394@@

@@M395@@

and this series converges to @@M396@@ within the disk of convergence.

**Laurent series**: a function analytic in an annulus @@M397@@ can be expanded as

@@M398@@

where the negative-power part exactly corresponds to the singularity at @@M399@@.

## 3. Why Define It This Way

**Why must the region of convergence be a disk?** The terms of a power series are @@M400@@, whose modulus is @@M401@@. Once it converges at some point @@M402@@, then because @@M403@@ is bounded, it converges absolutely for any nearer point @@M404@@ (comparison test). So the convergence set must be a "disk" centered at @@M405@@ (possibly degenerating to a point @@M406@@ or the whole plane @@M407@@). The circular symmetry in the complex plane comes from the homogeneity of the modulus.

**Why is analytic @@M408@@ expandable into a power series?** "@@M409@@" is obtained from the Cauchy integral formula plus a geometric-series expansion: inside the disk,

@@M410@@

Substitute into the Cauchy formula and integrate term by term, exactly yielding the Taylor coefficients @@M411@@. "@@M412@@" a power series can be differentiated term by term within its disk of convergence, hence is infinitely differentiable and thus analytic. The two are two sides of the same coin.

**Why is the radius equal to the distance to the nearest singularity?** A function cannot be analytic at a singularity, so the Taylor series cannot converge across the singularity (otherwise, by uniqueness of analytic continuation, the function would also be analytic at the singularity—a contradiction). So the disk of convergence can extend at most to the "nearest wall"—the nearest singularity. This is one of the most intuitive yet profound geometric conclusions of complex analysis.

**Why do we need the Laurent series?** The Taylor series requires the center to be analytic; if the center has a singularity (such as @@M413@@ at @@M414@@), there is no Taylor expansion, but one can expand into a Laurent series in a punctured neighborhood, and the negative-power part faithfully records the nature of the singularity (pole order, essential singularity). The Laurent series is "a Taylor series with singularities".

## 4. Intuition and Pictures

Think of the disk of convergence as "a circle centered at @@M415@@ with radius equal to the distance to the nearest singularity". Inside the circle the function is perfectly reproduced by the Taylor series; outside, the series fails—the singularity is an impenetrable wall. For example, @@M416@@ expanded at @@M417@@ gives @@M418@@ with radius of convergence @@M419@@, blocked exactly by the singularity @@M420@@; expanded at @@M421@@ the radius is @@M422@@ (distance to @@M423@@), and the disk @@M424@@ lies entirely inside the "wall".

Within its disk, a power series is like an "infinitely differentiable photocopier": once you know all derivatives at the center, the whole disk is determined—precisely the series version of the "rigidity" of analytic functions.

> Intuition: the singularity is a wall, the disk of convergence is the open space inside the wall; expand at whatever point, and the radius is the distance from that point to the nearest wall.

Right-or-wrong comparison:

| Claim | True/False | Explanation |
|---|---|---|
| The convergence region is a disk | ✓ | Decided by the homogeneity of the complex modulus |
| The Taylor series must converge to the function | Only when analytic ✓ | Real-function counterexample @@M425@@ fails |
| Radius = distance to nearest singularity | ✓ | A corollary of uniqueness of analytic continuation |
| Having a singularity means no expansion | ✗ | A Laurent expansion in a punctured neighborhood is possible |
| Expansions at different centers can differ | ✓ | But each is correct within its own disk |

## 5. Worked Examples

### Example 1 (Basic: radius of convergence of a power series)

Problem: Find the radii of convergence of @@M426@@ and @@M427@@.

Analysis: Use the ratio or root test.

Solution: For @@M428@@, by the ratio test

@@M429@@

Hence @@M430@@. On @@M431@@, the modulus of the general term is @@M432@@, and by the @@M433@@ series (@@M434@@) it converges absolutely, so the closed disk of convergence is @@M435@@.

For @@M436@@,

@@M437@@

Hence @@M438@@, and the series diverges everywhere except @@M439@@.

Comment: Fast-decaying coefficients (e.g. @@M440@@, @@M441@@) give a large radius; fast-growing coefficients (e.g. @@M442@@) give radius zero. The ratio test is most common, but when coefficients contain @@M443@@-th powers the root test is more stable.

### Example 2 (Intermediate: expanding @@M444@@ at an arbitrary center)

Problem: Expand @@M445@@ in a Taylor series at @@M446@@, and state the radius of convergence.

Analysis: Rewrite as an expression in @@M447@@ and use the geometric series.

Solution: @@M448@@, hence

@@M449@@

Set @@M450@@, then @@M451@@, valid when @@M452@@, i.e. @@M453@@.

The radius of convergence is @@M454@@, equal to the distance from @@M455@@ to the nearest singularity @@M456@@ (@@M457@@). Perfectly consistent with "radius = distance to nearest singularity".

Comment: Expanding at a shifted center is essentially "translate then apply the geometric series". The radius is determined by the distance from the new center to the singularity—a quick way to verify the expansion is correct.

### Example 3 (Advanced: Laurent expansion to find a residue)

Problem: Find the negative-power coefficients of the Laurent expansion of @@M458@@ at @@M459@@, and give the residue.

Analysis: @@M460@@ is a second-order pole; expand @@M461@@ then divide by @@M462@@, and take the coefficient of the @@M463@@ term.

Solution: @@M464@@, hence

@@M465@@

Negative-power part: @@M466@@. The residue is @@M467@@ (i.e. the coefficient of @@M468@@).

Verification by the second-order pole formula: @@M469@@ ✓.

Comment: The Laurent expansion is the "master key" for finding residues, especially at higher-order poles. After expanding @@M470@@ and dividing by @@M471@@, read off @@M472@@ directly. Consistent with the pole formula, mutually verifying.

## 6. Common Mistakes and Pitfalls

1. **Confusing radius of convergence with region of convergence.** The radius is the distance to the nearest singularity, but whether it converges on the circle @@M473@@ must be judged separately (some points may converge, others diverge). The radius only guarantees absolute convergence inside and divergence outside.

2. **Assuming the Taylor series always converges to the function.** This is a privilege of complex analytic functions; real functions need not. But in the complex world, as long as the function is analytic at the center, the Taylor series necessarily converges to itself within its disk of convergence.

3. **Reusing the old radius after shifting the center.** Expanding at @@M474@@, the radius @@M475@@ nearest singularity @@M476@@ changes with the center. You cannot apply the @@M477@@-time @@M478@@ to @@M479@@ (there too @@M480@@, but the disk is at a different location).

4. **Using a Laurent expansion as a Taylor expansion.** When the center has a singularity, forcing a Taylor expansion errs; you must allow negative powers. First decide whether the center is analytic.

5. **Mixing up limsup and limit in the root test.** When coefficients are irregular the limit may not exist, and limsup must be used; only when the limit exists can the ratio/root limit formula be used.

## 7. Summary and Mnemonic

Key points:

- A power series has a disk of convergence, radius determined by @@M481@@ or the ratio test.
- Analytic @@M482@@ locally a Taylor expansion; coefficients @@M483@@.
- Radius of convergence = distance from center to nearest singularity (open space inside the wall).
- Laurent series handle annuli and singularities; the negative-power part records the singularity.
- Uniqueness: two expansions of the same function over an overlapping region must agree.

**Mnemonic: A power series surrounds a disk of convergence; the radius is stuck at the nearest wall; analytic equals expandable; the Laurent negative powers record the singularity's wound.**`,
    keyPoints: ['A power series ∑a_n(z−z₀)^n has a disk of convergence; radius R given by root/ratio test', 'Analytic ⇔ locally expandable into a Taylor series (coefficients a_n = f^{(n)}(z₀)/n!)', 'Radius of convergence = distance to nearest singularity (corollary of Abel’s theorem)', 'Laurent series handle annuli with singularities; the negative-power part reflects the singularity', 'Uniqueness: the power-series expansion of a function is unique'],
  },
  'argument-principle': {
    chapter: 'Chapter 5 Argument Principle and Rouché Theorem',
    title: 'Argument Principle and Its Applications',
    summary: 'Walk a closed curve once; the change in argument of the function value is 2π times (number of zeros minus number of poles)—the argument principle lets you "count" roots, and Rouché lets you "compare" them.',
    content: String.raw`

If someone asks you "how many roots does this polynomial have in the unit circle", your first reaction might be to solve the equation—but for high-degree polynomials, exact solution is almost impossible. The argument principle gives a brilliant workaround: you need not find the roots; just walk once around the unit circle and record how many turns the "direction" of the function value @@M484@@ makes; the number of turns tells you how many zeros (minus poles) lie inside. The number of roots is encoded in "the total change of the argument".

The idea behind it is: as @@M485@@ goes around the closed curve @@M486@@ once, the trajectory of @@M487@@ also draws a closed curve in the complex plane; how many times this trajectory winds around the origin equals how many more zeros than poles @@M488@@ has inside. Rouché's theorem is a corollary of the argument principle, using the metaphor of "the big tree shading the small grass": if @@M489@@ is always larger than @@M490@@ on the boundary, then @@M491@@ and @@M492@@ have the same number of roots. In this topic we first establish the argument principle, then derive Rouché's theorem, and finally see how they "take inventory" of roots.

## 2. Rigorous Definitions

Suppose @@M493@@ is analytic on and inside the closed curve @@M494@@ and @@M495@@ has no zeros on @@M496@@ (poles inside are allowed), and we take the positive direction along @@M497@@:

**Argument principle**:

@@M498@@

where @@M499@@ is the number of zeros (counted with multiplicity) of @@M500@@ inside, and @@M501@@ is the number of poles (counted with multiplicity) of @@M502@@ inside.

Equivalently, if we denote the total change of argument of @@M503@@ along @@M504@@ for one turn by @@M505@@, then

@@M507@@

**Rouché's theorem**: If on @@M508@@ we always have @@M509@@, then @@M510@@ and @@M511@@ have the same number of zeros inside @@M512@@.

## 3. Why Define It This Way

**Why can the integral of @@M513@@ count zeros?** At each zero @@M514@@ (say of order @@M515@@), @@M516@@ (@@M517@@); take the logarithmic derivative:

@@M518@@

where @@M519@@ is analytic at @@M520@@ and contributes zero when integrated around @@M521@@, and only @@M522@@ contributes @@M523@@. At each pole (order @@M524@@) it is similar but with opposite sign (contributes @@M525@@). Summing over all singularities inside @@M526@@ and dividing by @@M527@@ gives @@M528@@. So @@M529@@ is a "ruler" that automatically inventories zeros and poles.

**Why is it the change of argument?** Because @@M530@@, integrating once gives the net increment @@M531@@ of @@M532@@ (the imaginary part of the logarithm is the argument). So the imaginary part of the integral is directly the total argument change divided by @@M533@@. Geometrically: how many times the trajectory of @@M534@@ winds around the origin equals how many more zeros than poles are inside.

**Why does Rouché's theorem hold?** On @@M535@@ we have @@M536@@, so neither @@M537@@ nor @@M538@@ is zero on @@M539@@ (otherwise @@M540@@ contradicts), and @@M541@@, where @@M542@@. Thus @@M543@@, and @@M544@@ lies in the right half of the unit disk, winding zero times around the origin over one turn of @@M545@@. Hence @@M546@@ and @@M547@@ have the same argument change, and by the argument principle the same number of zeros. The essence is "the dominant term @@M548@@'s argument is not changed in winding number by the small perturbation @@M549@@".

## 4. Intuition and Pictures

Think of the argument principle as "a satellite orbiting the Earth to count": @@M550@@ walks once around @@M551@@ (you walk the region's boundary), and @@M552@@ acts like a compass pointing at the origin; the number of full turns of the needle is the number of zeros exceeding poles inside. Zeros make the needle turn forward, poles make it turn backward; summing gives @@M553@@.

The "big tree shading small grass" picture of Rouché: on the boundary, the vector @@M554@@ is always longer than @@M555@@, so when added, the direction of @@M556@@ is firmly dominated by @@M557@@ and will not be flung to the other side of the origin by adding @@M558@@—therefore @@M559@@ winds around the origin the same number of times as @@M560@@, and the zero count is unchanged.

> Intuition: the argument change is the "turn-count ledger" of the zero surplus; Rouché says that as long as @@M561@@ dominates @@M562@@ on the boundary, the ledger is not rewritten.

Right-or-wrong comparison:

| Claim | True/False | Explanation |
|---|---|---|
| The argument principle requires @@M563@@ to have no poles | ✗ | Poles inside are allowed, just subtract @@M564@@ |
| The integral gives the exact @@M565@@ | ✗ | It gives @@M566@@; you need to know @@M567@@ separately |
| Rouché requires @@M568@@ | ✗ | Strict @@M569@@ is needed (equality may fail) |
| Multiple roots counted by multiplicity | ✓ | Both @@M570@@ are counted by multiplicity |
| @@M571@@ must have no zero on @@M572@@ | ✓ | Otherwise @@M573@@ diverges on the boundary |

## 5. Worked Examples

### Example 1 (Basic: directly applying the argument principle to count zeros)

Problem: Let @@M574@@; walking @@M575@@ once in the positive direction, use the argument principle to state the number of interior zeros.

Analysis: @@M576@@ is analytic with no poles on @@M577@@ (@@M578@@); the zeros are the fourth roots of unity, all inside the unit circle, so obviously @@M579@@. Verify with the argument principle.

Solution: @@M580@@, @@M581@@. The four simple zeros @@M582@@ all lie inside @@M583@@, with no poles, hence

@@M584@@

Argument angles: @@M585@@ around @@M586@@ once, @@M587@@ winds @@M588@@ times around the origin, and @@M589@@ (the dominant term on the large circle) also winds @@M590@@ times, so @@M591@@, divided by @@M592@@ gives @@M593@@. Consistent.

Comment: This problem is trivial but demonstrates the principle. The key is that @@M594@@ has no zero on the boundary (at @@M595@@ we have @@M596@@, @@M597@@), so the condition holds. If we took @@M598@@, there would be no zeros inside and the integral would be @@M599@@.

### Example 2 (Intermediate: Rouché counting zeros in the unit circle)

Problem: Prove that @@M600@@ has exactly @@M601@@ roots in the unit disk.

Analysis: On @@M602@@ take @@M603@@ (dominant), @@M604@@, and verify @@M605@@.

Solution: On @@M606@@, @@M607@@. And @@M608@@. By Rouché's theorem, @@M609@@ and @@M610@@ have the same number of zeros inside @@M611@@. @@M612@@ has @@M613@@ zeros in the disk (@@M614@@, double). Hence the original equation has exactly @@M615@@ roots (by multiplicity) in @@M616@@.

Comment: The trick of choosing @@M617@@: pick the "longest" term on the boundary. Here @@M618@@ has constant modulus @@M619@@, overpowering the sum of @@M620@@ (modulus @@M621@@) and the constant @@M622@@, which is @@M623@@. If we chose @@M624@@ as @@M625@@, then @@M626@@, while @@M627@@ can reach @@M628@@, failing the condition. The choice of principal part decides success or failure.

### Example 3 (Advanced: proving the fundamental theorem of algebra via the argument principle)

Problem: Give another proof of the fundamental theorem of algebra using the argument principle: a non-constant polynomial @@M629@@ must have a zero.

Analysis: Take a large circle @@M630@@ so that @@M631@@ is large enough for the highest-degree term of @@M632@@ to dominate.

Solution: Let @@M633@@, @@M634@@, @@M635@@. Take @@M636@@ large enough that when @@M637@@ we have @@M638@@ (the triangle inequality guarantees this, since the left is @@M639@@ and the right is @@M640@@). Let @@M641@@, where @@M642@@.

@@M643@@ is entire, with no poles, so @@M644@@ has no poles. If @@M645@@ had no zeros at all, then for any large circle the argument principle gives @@M646@@, i.e. @@M647@@. However, as @@M648@@ goes once around the large circle, @@M649@@ winds @@M650@@ times around the origin, and the relative smallness of @@M651@@ guarantees the argument change of @@M652@@ is also about @@M653@@ turns (by continuity, the winding number is @@M654@@). Hence @@M655@@, a contradiction. Therefore @@M656@@ must have a zero.

Comment: Unlike the Liouville proof, here we use "the winding number of the argument on the large circle = degree @@M657@@" to directly count @@M658@@ zeros (with multiplicity), proving not only existence but also that a degree-@@M659@@ polynomial has exactly @@M660@@ roots. The argument principle resolves both existence and count of roots at once.

## 6. Common Mistakes and Pitfalls

1. **Ignoring that @@M661@@ must not be zero on the boundary.** The argument principle requires @@M662@@ to have no zeros on @@M663@@ (otherwise @@M664@@ diverges). If a zero lies exactly on the boundary, use a different curve that avoids it, or first apply a small perturbation.

2. **Treating @@M665@@ as @@M666@@.** If there are poles inside (e.g. a rational function), the integral gives @@M667@@ minus @@M668@@, and you must know @@M669@@ separately to get @@M670@@. For example, @@M671@@ in the unit circle, @@M672@@, integral @@M673@@.

3. **Using the Rouché inequality as @@M674@@.** Strictly @@M675@@ is required; equality at some points may make @@M676@@ zero on the boundary, breaking the condition. Prefer to微调 the boundary or estimate with margin.

4. **Not counting multiple roots by multiplicity.** Both @@M677@@ and @@M678@@ are counted by multiplicity; a double zero contributes @@M679@@. Miscounting multiplicity leads to wrong conclusions.

5. **Choosing the wrong Rouché principal term.** The principal term must strictly dominate the remainder on the entire boundary; dominating in most of the region is not enough—it must be strictly greater everywhere. First give a global upper bound via the triangle inequality, then decide.

## 7. Summary and Mnemonic

Key points:

- Argument principle: @@M680@@, i.e. total argument change @@M681@@.
- @@M682@@ contributes @@M683@@ at a zero, opposite at a pole, automatically inventorying.
- Rouché's theorem: on the boundary @@M684@@ and @@M685@@ have the same number of zeros (big tree shades small grass).
- Applications: estimating zero distribution of polynomials, another proof of the fundamental theorem of algebra (winding number = degree).
- The argument principle is the residue theorem applied to the log derivative; geometrically it is "the number of windings around the origin".

**Mnemonic: Walk the loop, how many turns of argument; keep the zero surplus in mind; Rouché's big tree shades small grass, same root count, no worry.**`,
    keyPoints: ['Argument principle: 1/(2πi)∮ f′/f dz = N − P (interior zeros minus poles)', 'Essentially the winding number of log f around the origin (total argument change / 2π)', 'Rouché theorem: if |f| > |g| on the boundary then f and f+g have the same number of zeros', 'Applications: estimating polynomial zero distribution, another route to the fundamental theorem of algebra', 'The argument principle can be viewed as the residue theorem applied to the log derivative'],
  },
  'conformal-mapping': {
    chapter: 'Chapter 6 Conformal Mapping',
    title: 'Conformal Mapping',
    summary: 'A mapping that is analytic with nonzero derivative preserves angles and local shape—conformal mapping "kneads" a complicated region into a simple one, thereby moving a hard boundary-value problem onto a disk to solve.',
    content: String.raw`

Earlier we saw that the Dirichlet problem on a disk has a beautiful solution via the Poisson formula. But real problems often occur in irregular regions—airfoil cross-sections, bent pipes, perforated plates. Can we "deform" an irregular region into a disk, solve on the disk, and deform back? The answer is strikingly yes: as long as the mapping is conformal (angle-preserving), angles and local shapes are preserved, and the physical laws (such as the Laplace equation) remain valid after the deformation.

Conformal mapping thus becomes the ace of applied complex analysis: an analytic function @@M686@@ (with @@M687@@) maps an infinitesimal disk to an infinitesimal disk (only rotating, not shearing), thereby "kneading" a "hard region" into an "easy region". In this topic we first define conformality and give its geometric meaning, then show several classic mappings, and finally point out the Riemann mapping theorem—the theoretical peak—and its practical use.

## 2. Rigorous Definitions

Suppose @@M688@@ is analytic at @@M689@@ and @@M690@@. Near @@M691@@, @@M692@@ can be linearly approximated:

@@M693@@

where the complex multiplication @@M694@@ means: scale the vector @@M695@@ by @@M696@@ times and rotate it by angle @@M697@@.

**Conformal mapping (angle-preserving mapping)**: In the above sense, the angle between two curves at @@M698@@ equals the angle between their image curves at @@M699@@ (both magnitude and orientation preserved). If @@M700@@ is analytic and @@M702@@ at every point of a region @@M701@@, then @@M703@@ is called a conformal mapping on @@M704@@.

**Möbius transformation (linear fractional transformation)**:

@@M705@@

**Riemann mapping theorem**: Any simply connected region @@M706@@ (@@M707@@ and not a single point) is conformally equivalent to the unit disk; that is, there exists a univalent analytic function mapping @@M708@@ onto the unit disk (unique up to composition with an automorphism).

## 3. Why Define It This Way

**Why is @@M709@@ needed for conformality?** If @@M710@@, then in the linear approximation the rotation angle @@M711@@ is undefined (@@M712@@ collapses the whole small neighborhood to a point, losing all directional information), and angles cannot be preserved. For example, @@M713@@ at @@M714@@ has @@M715@@, mapping two rays with angle @@M716@@ to rays with angle @@M717@@—the angle is "doubled" (non-conformal). So conformality requires a nonzero derivative.

**Why does conformality preserve the Laplace equation?** A conformal mapping is "shape-preserving"; the Laplacian is form-invariant under a conformal transformation (up to a scaling factor @@M718@@), so @@M719@@ harmonic in @@M720@@ implies @@M721@@ is also harmonic in the image region. Thus a harmonic solution on the disk, carried back to the original region, remains a solution. This is the root reason conformal mapping can "transport boundary-value problems".

**Why is the linear fractional transformation so special?** It maps circles to circles (a line is viewed as a circle through infinity), preserves conformality globally, and is uniquely determined by three point pairs. This "circle-preserving + angle-preserving" property lets it freely adjust the shape of a region's boundary (e.g. map the upper half-plane to the unit disk), making it the basic building block for constructing mappings.

**Why does the Riemann theorem only require simply connected?** Simply connected means the region "has no holes" and can be continuously contracted to a point, hence can be "unrolled" into a disk; if it is multiply connected (such as an annulus), the topology differs and it cannot be conformally equivalent to a disk (annulus maps to annulus). Topological obstruction is the core of the classification of conformal equivalence.

## 4. Intuition and Pictures

Think of a conformal mapping as a "wrinkle-free rubber-sheet stretch": the sheet can rotate and stretch, but never shear or fold. So a small circle remains a small circle, and the angle between intersecting curves is unchanged. Contrast @@M723@@ at the origin: it maps the upper half-plane (an @@M724@@-angle sector) to the whole plane minus the positive real axis (@@M725@@); at the origin the angle is doubled—exactly the picture of @@M726@@ destroying conformality.

The linear fractional transformation @@M727@@ maps the upper half-plane to the unit disk: the real axis maps to the unit circle, and a point in the upper half-plane (such as @@M728@@) maps to @@M729@@. This is a standard operation of "circularizing the boundary and centering the interior", often the "final step" of a conformal mapping.

> Intuition: a conformal mapping is an angle-preserving rubber deformation; the Riemann theorem guarantees any hole-free region can be kneaded into a disk, so all boundary-value problems on simply connected regions are "reduced" to the disk problem.

Right-or-wrong comparison:

| Claim | True/False | Explanation |
|---|---|---|
| Conformal at @@M730@@ | ✗ | The angle there is magnified/distorted (e.g. @@M731@@ doubles at the origin) |
| Conformal mapping preserves area | ✗ | It only preserves angles; area scales by @@M732@@ |
| Linear fractional transformation preserves circles | ✓ | Including lines (circles through @@M733@@) |
| Any region can be mapped to a disk | ✗ | Requires simply connected with no holes |
| Conformal mapping transports harmonic equations | ✓ | The Laplacian is form-invariant under conformality |

## 5. Worked Examples

### Example 1 (Basic: the angle-sector transformation of @@M734@@)

Problem: Find what region @@M735@@ maps the sector @@M736@@ to, and state whether it is conformal at the origin.

Analysis: Use polar coordinates @@M737@@, @@M738@@. The argument doubles.

Solution: Let @@M739@@, then @@M740@@. When @@M741@@, we have @@M742@@; and @@M743@@ is arbitrary, so @@M744@@ lies in the first quadrant (excluding the axes): @@M745@@. That is, @@M746@@ stretches the @@M747@@-sector into an @@M748@@-sector—the angle doubles.

Conformality: at @@M749@@, @@M750@@, conformal; at @@M751@@, @@M752@@, not conformal (angle @@M753@@, doubled). So the origin is a "conformality-failure point".

Comment: @@M754@@ is the best example to show "@@M755@@ destroys conformality". Note that the doubled argument range means the sector is "opened up". This kind of power mapping is often used to flatten wedge regions.

### Example 2 (Intermediate: upper half-plane mapped to the unit disk)

Problem: Verify that @@M756@@ maps the upper half-plane @@M757@@ conformally onto the unit disk @@M758@@.

Analysis: First verify the boundary (real axis) maps to @@M759@@, then verify one interior point (such as @@M760@@) maps inside.

Solution: For a point @@M761@@ on the real axis (real),

@@M762@@

so the real axis maps to the unit circle. For an interior point @@M763@@ of the upper half-plane:

@@M764@@

@@M765@@ lies inside the unit disk, and the mapping is analytic with @@M766@@ (in the upper half-plane @@M767@@), hence conformal. By continuity, the whole upper half-plane maps into the disk; univalence and surjectivity are guaranteed by the structure of the linear fractional transformation.

Comment: This is one of the "standard transformations" of conformal mapping, often used to move a boundary-value problem on the upper half-plane to the disk. Composing it with other mappings reduces various regions to standard domains.

### Example 3 (Advanced: idea of solving a boundary-value problem via conformal mapping)

Problem: Let the region @@M768@@ be the first quadrant with a segment of the positive real axis removed; sketch how to use conformal mapping to find the Laplace boundary-value problem on @@M769@@.

Analysis: Use a power mapping to flatten the sector, then a logarithm/linear transformation to reduce to the upper half-plane, then a standard mapping to the disk, apply the Poisson formula, and invert step by step back.

Solution: Chain of ideas:
1. If @@M770@@ is a sector (e.g. @@M771@@), use @@M772@@ to stretch the opening angle to @@M773@@ (upper half-plane).
2. Map the upper half-plane to the unit disk with @@M774@@.
3. On the disk, solve the harmonic function @@M775@@ with the Poisson formula.
4. Invert the above mappings one by one, carrying @@M776@@ back to the original region @@M777@@; since conformal transformations preserve the Laplace equation, the carried-back function is still a solution on @@M778@@, and the boundary values correspond automatically (the boundary is transported one-to-one).

Key: each step of mapping needs @@M779@@ (conformal) and univalence (no overlap). If the original region has @@M780@@ points (e.g. a corner corresponding to @@M781@@ at the origin), handle the boundary condition at the corner separately.

Comment: The conformal mapping method is the ultimate of the "reduction" idea—translating a hard problem on an unfamiliar region into the known solution on a standard region (disk/half-plane). Real engineering (fluid around airfoils, electrostatic fields) heavily uses look-up-table-style compositions of basic mappings.

## 6. Common Mistakes and Pitfalls

1. **Claiming conformality at a point where @@M782@@.** E.g. @@M783@@, @@M784@@ at the origin has @@M785@@, the angle is magnified @@M786@@ times, not conformal. Check @@M787@@ first to judge conformality.

2. **Assuming conformal preserves area or distance.** Conformal only preserves angles (and local shape); area scales by @@M788@@, and distance is generally not preserved. Reading "conformal" as "isometric" is a common confusion.

3. **Forgetting to verify univalence.** A mapping may be analytic with @@M789@@ yet not univalent (e.g. @@M790@@ overlaps periodically); a conformal mapping usually requires univalence (one-to-one). Confirm the region maps without overlap.

4. **Abusing the Riemann theorem on multiply connected regions.** Annuli and perforated regions cannot be conformally equivalent to a disk (different topology); such regions map to a "standard annulus" and need separate treatment.

5. **Getting boundary correspondence wrong when inverting.** Transporting a boundary-value problem by conformal mapping must confirm the one-to-one correspondence of boundary points (especially the point at infinity and corners), otherwise boundary conditions get mismatched.

## 7. Summary and Mnemonic

Key points:

- Analytic and @@M791@@ conformal: locally rotation + scaling, preserving angles and shape (not distance, not area).
- Linear fractional transformation (az+b)/(cz+d) preserves circles and angles, and can map the upper half-plane to the unit disk.
- Classic mappings: @@M792@@ (sector doubling), @@M793@@ (inversion), exponential (strip @@M794@@ half-plane).
- Riemann mapping theorem: a simply connected region (@@M795@@) is conformally equivalent to the unit disk.
- Applications: reduce boundary-value problems on complicated regions to the disk/half-plane, solve with the Poisson formula, then invert.

**Mnemonic: Analytic with nonzero derivative present; rotation and scaling bring conformality; Riemann says a circle can be kneaded to a disk; bring the hard boundary problem back.**`,
    keyPoints: ['Analytic and f′≠0 ⇒ conformal (angle- and shape-preserving): locally rotation + scaling, preserving angles', 'Linear fractional transformation (az+b)/(cz+d) preserves circles and angles, can map upper half-plane to unit disk', 'Classic mappings: z² (sector doubling), 1/z (inversion), exponential (strip → half-plane)', 'Riemann mapping theorem: a simply connected region (≠ℂ) is conformally equivalent to the unit disk', 'Applications: transform boundary-value problems on complicated regions to standard regions to solve'],
  },
  'analytic-continuation': {
    chapter: 'Chapter 7 Analytic Continuation and Riemann Surfaces',
    title: 'Analytic Continuation and Riemann Surfaces',
    summary: 'An analytic function may be defined in many places; gluing these "local definitions" along paths is analytic continuation; the collection of all branches of a multi-valued function (logarithm, root) forms a Riemann surface.',
    content: String.raw`

A power series defines an analytic function within its disk of convergence, but what about outside the disk? For example, @@M796@@ converges inside @@M797@@, while @@M798@@ actually makes sense on the whole complex plane except @@M799@@. We naturally want to "cross the boundary" and continue defining the function outward—this is analytic continuation. It "grows" a local definition into a global one, the bridge connecting the local and the global in complex analysis.

More troublesome is the multi-valued function: @@M800@@, going once around a closed loop about the origin, increases its argument by @@M801@@ and changes value; @@M802@@ returns to the original value only after two loops. This phenomenon of "not returning to itself after one loop" forces us to glue many copies of the complex plane like a spiral staircase, forming a Riemann surface, so that the function becomes single-valued again on the Riemann surface. In this topic we first discuss the basic idea and uniqueness of analytic continuation, then how Riemann surfaces tidy up the mess of multi-valuedness.

## 2. Rigorous Definitions

**Analytic continuation**: Suppose @@M803@@ is analytic in region @@M804@@, @@M805@@ is analytic in region @@M806@@, and @@M807@@ while @@M808@@ and @@M809@@ coincide on the overlap; then @@M810@@ is called an analytic continuation of @@M811@@ across the common part to @@M812@@. Through a chain of overlapping regions the definition can be extended step by step along a path.

**Uniqueness theorem (simply connected case)**: If two analytic functions in a simply connected region @@M813@@ coincide on a set of points with an accumulation point, then they are identical throughout @@M814@@. Therefore the analytic continuation in a simply connected region is path-independent and uniquely determined.

**Complete analytic function**: the union of all analytic continuations of a function, together with all its branches, forms the complete analytic function.

**Riemann surface**: a surface constructed for a multi-valued function so that the function becomes single-valued and analytic on it. Intuitively, cut each "branch's" copy of the complex plane along a branch cut, then glue the copies according to the continuous transition of function values.

**Examples**:
- The Riemann surface of @@M815@@: infinitely many sheets; going once around the origin rises to the next sheet (argument @@M816@@).
- The Riemann surface of @@M817@@: two sheets; going twice around the origin returns to the original sheet.

## 3. Why Define It This Way

**Why is analytic continuation unique?** The rigidity of an analytic function: once determined on a set of points with an accumulation point, the whole simply connected region is uniquely locked in (uniqueness theorem). So as long as the continuation path lies in a simply connected region, the result is the same no matter which path is taken. This is sharply different from real functions—once a real function is determined on a small interval, it can still do whatever it likes on either side (as long as continuously differentiable), without such global rigidity.

**Why are overlapping regions needed?** Continuation is "step by step": starting from disk @@M818@@, take a disk @@M820@@ overlapping with @@M819@@; on the overlap the function values are already fixed, so by uniqueness the continuation in @@M821@@ is uniquely determined, then take @@M822@@ overlapping with @@M823@@… and so on, relay by relay. The overlap is the "baton handoff", ensuring consistency before and after. Without overlap there is no guarantee the continuation matches the original.

**Why introduce Riemann surfaces for multi-valued functions?** Because on the ordinary complex plane, going once around the origin changes the value of @@M824@@, making single-valued definition impossible. The beauty of the Riemann surface: turn the "jump of value" into "switching to another sheet"; on each sheet the function is single-valued, and the sheets are glued along branch cuts with continuous function-value transition. Thus multi-valuedness is "geometrized"—no longer a defect of the function, but it lives on a multi-layer bed.

**Why is @@M825@@ two-sheeted while @@M826@@ is infinitely sheeted?** The period of @@M827@@ is two loops (@@M828@@, same as the original value), so two sheets suffice to close; whereas @@M829@@ increases its argument by @@M830@@ each loop and never returns to the original value, so infinitely many sheets must be spiraled together. Number of sheets = the number of loops around the branch point needed for the function value to return to itself (root finite, logarithm infinite).

## 4. Intuition and Pictures

Think of analytic continuation as "assembling a continent from local maps": each map (power-series disk) covers a patch, and adjacent maps must match on the overlap (consistent function values); the continent (complete analytic function) assembled by this rule is unique—as long as the continent is simply connected. If the continent has "holes" or "handles" (multiply connected), different winding ways of maps may assemble different layers (multi-valued).

A Riemann surface is like a spiral staircase: walking @@M831@@'s Riemann surface around the origin, each turn takes you up one step, and you never reach "the same map and same value as at departure" unless you walk infinitely many turns. @@M832@@'s staircase has only two steps; two turns return you to the starting step.

> Intuition: analytic continuation is "relay definition along overlapping regions"; a Riemann surface stacks the branches of a multi-valued function into a multi-layer bed, letting the function lie single-valued and安稳.

Right-or-wrong comparison:

| Claim | True/False | Explanation |
|---|---|---|
| Analytic continuation is always unique | ✗ | Unique only in a simply connected region and path-independent; multiply connected may be multi-valued |
| The uniqueness theorem requires equality everywhere | ✗ | Only equality on a set with an accumulation point is needed |
| A Riemann surface makes multi-valued single-valued | ✓ | On the Riemann surface the function is single-valued and analytic |
| The Riemann surface of @@M833@@ is infinitely sheeted | ✗ | Two sheets suffice (period two loops) |
| A branch cut is a true singularity | ✗ | It is an artificial slit cut when choosing a branch |

## 5. Worked Examples

### Example 1 (Basic: from a power series to the global function)

Problem: Given @@M834@@ defined inside @@M835@@, explain how its value should be understood outside @@M836@@, say at @@M837@@.

Analysis: This series sums to @@M839@@ inside @@M838@@; the latter is analytic on @@M840@@ and is the analytic continuation of the original statement.

Solution: Inside @@M841@@, the geometric series sums to

@@M842@@

The right-hand side @@M843@@ is analytic on @@M844@@ and coincides with the original series on the overlap with @@M845@@ (which is of course @@M846@@). Therefore it is the analytic continuation of the original series. So even at @@M847@@ (where the original series diverges), the value is still defined by continuation as @@M848@@.

Comment: This is the most typical example of analytic continuation: a local power series @@M849@@ a global rational function. The original series only "speaks" inside the unit disk; continuation lets it speak everywhere (except singularities). The singularity @@M850@@ is an impassable wall; continuation stops there.

### Example 2 (Intermediate: going around the origin makes @@M851@@ multi-valued)

Problem: Take the principal branch @@M853@@ of @@M852@@ (@@M854@@). Let @@M855@@ travel counterclockwise from the positive real axis once around the circle @@M856@@ back to the start, and explain why the endpoint value differs, and indicate how to construct the Riemann surface.

Analysis: Going once around, the argument increases from @@M857@@ to @@M858@@, but the principal branch forcibly pulls it back to @@M859@@, jumping discontinuously at the negative real axis (the branch cut).

Solution: The principal branch is discontinuous across the negative real axis: approaching the negative real axis from above gives @@M860@@, from below gives @@M861@@, a difference of @@M862@@. Going once around the circle, if crossing the branch cut is not allowed (going along the upper side), the continuous change increases the argument to @@M863@@, but the principal branch instantly jumps back to @@M864@@ when crossing the negative real axis (discontinuously), so the endpoint "appears" still to be @@M865@@—this is the illusion of the branch cut artificially cutting the function.

The true multi-valued @@M866@@: going once around indeed changes the argument to @@M867@@, increasing the function value by @@M868@@. To eliminate this "returning to a different value after looping", construct the Riemann surface: take infinitely many sheets of the complex plane, each cut along the negative real axis, with the @@M869@@-th sheet's @@M870@@, and glue the upper bank of the @@M871@@-th sheet to the lower bank of the @@M872@@-th sheet. Going once around the circle naturally rises to the @@M873@@-th sheet, and the function value increases continuously by @@M874@@. Thus @@M875@@ becomes single-valued and analytic on the Riemann surface.

Comment: A branch cut is not a true singularity of the function, but a slit cut when "choosing a single-valued branch". The Riemann surface uses multi-layer gluing to make multi-valuedness continuous and controllable. Understanding this is the key to mastering multi-valued functions.

### Example 3 (Advanced: the two-sheeted Riemann surface of @@M876@@ and uniformization)

Problem: Explain why the Riemann surface of @@M877@@ is two-sheeted, and verify that @@M878@@ becomes single-valued on it.

Analysis: @@M879@@ has two branches; going once around the origin jumps from one branch to the other, and two loops return to the original branch.

Solution: Let @@M880@@, then @@M881@@. Take @@M882@@ continuously increasing from @@M883@@ (one loop around the origin); the argument of @@M885@@ changes from @@M886@@ to @@M887@@, and the value changes from @@M888@@ to @@M889@@—i.e. jumps to the other branch. Going one more loop (@@M890@@ increases to @@M891@@), the argument becomes @@M892@@, and @@M893@@ returns to @@M894@@, the original branch. Hence the period is two loops, and the Riemann surface needs only two sheets.

Construction: both sheets of the complex plane are cut along the positive real axis (or the negative real axis); the first sheet has @@M895@@, the second has @@M896@@; glue the "upper bank" of the first sheet's cut (@@M897@@) to the "lower bank" of the second sheet (@@M898@@), and the "upper bank" of the second sheet (@@M899@@) back to the "lower bank" of the first sheet (@@M900@@), forming a closed loop. On this two-sheeted surface, walking any closed loop, @@M901@@ takes a unique value continuously—single-valued and analytic.

Comment: The two-sheeted Riemann surface of @@M902@@ is the simplest example of a "multi-layer bed". Contrast the infinitely sheeted @@M903@@; the finite periodicity of the root determines a finite number of sheets. The uniformization idea runs through modern mathematics (e.g. Riemann surfaces of algebraic curves).

## 6. Common Mistakes and Pitfalls

1. **Assuming analytic continuation is always unique.** It is unique only in a simply connected region and path-independent; in a multiply connected region, different paths may yield different branches (multi-valued). Ignoring topology leads to wrong "uniqueness".

2. **Misreading the uniqueness theorem as "equal everywhere".** It suffices that they are equal on a set with an accumulation point (such as a small arc, or a convergent sequence of points) to deduce global identity. The condition is far weaker than imagined.

3. **Treating a branch cut as a true singularity.** @@M904@@, @@M905@@ are not truly non-analytic on the branch cut; it is an artificial slit cut when choosing a branch; the true singularity is the branch point (such as @@M906@@), where the sheets meet.

4. **Confusing "divergent point of the series" with "point where the function is undefined".** For example, at @@M907@@ the series of @@M908@@ diverges, but after continuation the point is defined. The radius of convergence is limited by the nearest singularity, but continuation can cross the divergent region.

5. **Miscounting the number of sheets of a Riemann surface.** @@M909@@ is two-sheeted, not infinitely sheeted; only @@M910@@ is infinitely sheeted. Number of sheets = the number of loops around the branch point needed for the function value to return to itself.

## 7. Summary and Mnemonic

Key points:

- Analytic continuation: using overlapping regions, extend a local analytic definition step by step to a larger region.
- Uniqueness theorem: in a simply connected region, equality on a set with an accumulation point @@M911@@ implies global identity; continuation is path-independent.
- Multi-valued functions (@@M912@@, @@M913@@) do not return to the original value after looping around a branch point; a branch cut or Riemann surface is needed.
- Riemann surface: a multi-layer glued surface making the multi-valued function single-valued and analytic on it; @@M914@@ two-sheeted, @@M915@@ infinitely sheeted.
- A branch cut is an artificial slit; the branch point (such as @@M916@@) is the true singularity.

**Mnemonic: Relay across overlaps to extend analyticity; in a simply connected region uniqueness stands; multi-valued loops switch sheets; on the Riemann surface it rests single-valued.**`,
    keyPoints: ['Analytic continuation: extend a local analytic definition along a path to a larger region via power series; result determined by simply connectedness', 'Uniqueness: in a simply connected region the continuation is unique (path-independent)', 'Branches of multi-valued functions: logarithm, root return to different values after looping a branch point; need a branch cut or Riemann surface', 'Riemann surface: glue the branches of a multi-valued function into a multi-layer surface making it single-valued and analytic', 'Examples: the Riemann surface of log z is a multi-sheeted spiral; that of sqrt z is two-sheeted'],
  },
};

export default map;
