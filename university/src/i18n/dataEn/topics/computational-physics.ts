import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'errors-fp': {
    chapter: 'Chapter 1 Error and Floating-Point Arithmetic',
    title: 'The Foundation of Numerical Computation: Error, Floating Point and Condition Numbers',
    summary:
      'Copying a formula into a computer does not mean computing it correctly: how errors arise, how they propagate, and how the condition number amplifies them is the first threshold of every numerical method.',
    content: String.raw`

On 25 February 1991, during the Gulf War, a Patriot missile battery deployed at Dhahran in Saudi Arabia failed to intercept an incoming Scud, killing twenty-eight soldiers. The cause found by the subsequent investigation was surprising: not radar failure, not operator error, but a tiny rounding error in the control system's clock. The system accumulated time in a 24-bit register, adding once every 0.1 second; but the decimal 0.1 is the infinite repeating binary fraction $0.0001100110011\cdots_2$, which can only be stored truncated. Each truncation introduces a relative error of about $9.5\times10^{-8}$, and after a hundred hours of continuous operation the accumulated drift reaches about 0.34 second—enough to shift the intercept window by hundreds of metres.

This case illustrates the theme of this topic: numerical computation is not copying formulas into a computer but a discipline about **how errors arise, propagate, and get amplified**. The mistake physics students most often make in their first programs is to treat fifteen digits of double output as fifteen correct digits, and "it computed" as "it computed correctly". In fact a badly designed algorithm can consume all fifteen digits of precision within a few dozen steps and output something that looks perfectly normal but is in fact pure noise.

We can split a numerical computation into three layers. The outermost is **model error**: describing Mercury's perihelion precession with Newtonian mechanics neglects general-relativistic corrections, approximating by point charges neglects the spatial distribution of charge—such errors are independent of the algorithm and can only be removed by improving the physical model. The middle layer is **truncation error**: an infinite process is replaced by a finite one—a Taylor series keeps only three terms, an iteration runs only ten times, an integration grid uses only a hundred panels, an infinite series is truncated at term $N$. The innermost layer is **rounding error**: computers store real numbers with a finite number of digits, and every addition, subtraction, multiplication and division may lose the last digit. This course deals mainly with the latter two, and their relation is often contradictory: reducing the step size lowers truncation error but increases the number of operations and hence the accumulation of rounding error, so there is an optimal balance between them.

Here is a teaser: compute $10^{16}+1$ in double precision, then subtract $10^{16}$; what do you get? Intuition says 1, but the answer is very likely 0. Why? The answer lies in the binary representation of floating-point numbers.

## 2. Defining and Measuring Error

Let $x^*$ be the true value and $x$ an approximation.

**Definition 1 (absolute and relative error)** The absolute error is $e(x)=x-x^*$ and the absolute error bound $\varepsilon$ satisfies $|e(x)|\le\varepsilon$; the relative error is $e_r(x)=\dfrac{x-x^*}{x^*}$ (requiring $x^*\ne0$) and the relative error bound $\varepsilon_r$ satisfies $|e_r(x)|\le\varepsilon_r$. The two are related by $\varepsilon=|x^*|\varepsilon_r$. When the true value is unknown, practice replaces $|x^*|$ by $|x|$.

**Definition 2 (significant digits)** If $x$ is written in normalised form $x=\pm0.a_1a_2\cdots a_n\times10^m$ (with $a_1\ne0$) and

$$|e(x)|\le\frac12\times10^{m-n}$$

then $x$ is said to have $n$ significant digits. In that case the relative error bound satisfies

$$\varepsilon_r\le\frac{1}{2a_1}\times10^{1-n}$$

Conversely, if $|e_r(x)|\le\dfrac{1}{2(a_1+1)}\times10^{1-n}$, then $x$ has at least $n$ significant digits. This pair of theorems gives a practical criterion: **the number of significant digits corresponds one-to-one with the relative error bound; the smaller the leading digit, the fewer significant digits a given relative error allows.** For example 0.0999 and 0.1001 have the same absolute error $2\times10^{-4}$, yet the former has only two significant digits while the latter has three.

**Definition 3 (truncation error)** The error introduced by replacing an infinite (or prohibitively expensive) true process with a finite one. Typical sources: truncating a Taylor expansion, truncating an infinite series, terminating an iteration early, discretising a continuous problem. It usually varies with the step size $h$ as a power: $E_{\mathrm{tr}}=O(h^p)$, where $p$ is called the order of the method.

**Definition 4 (rounding error)** Because the computer word length is finite, the storage of real numbers and the results of operations must be rounded to the nearest representable number; the resulting error is the rounding error. Under IEEE 754 double precision a single operation satisfies $\mathrm{fl}(x\ \mathrm{op}\ y)=(x\ \mathrm{op}\ y)(1+\delta)$ with $|\delta|\le u$, where the machine precision is $u=2^{-53}\approx1.11\times10^{-16}$.

**Definition 5 (condition number)** For the evaluation problem $y=f(x)$, the relative condition number is defined as

$$\kappa_f(x)=\lim_{\Delta x\to0}\left|\frac{\Delta y/y}{\Delta x/x}\right|=\left|\frac{x\,f^\prime(x)}{f(x)}\right|$$

It measures how many times a relative perturbation at the input is amplified on its way to the output. $\kappa$ close to 1 is called well-conditioned, $\kappa\gg1$ ill-conditioned, and $\kappa\to\infty$ singular.

**Definition 6 (forward and backward error)** Let the algorithm produce $\hat y$. The forward error is $\hat y-y$ (how wrong the result is); the backward error is the smallest $|\Delta x|$ such that $\hat y=f(x+\Delta x)$ (equivalently, how much the original problem must be perturbed). The two are linked by the condition number:

$$\text{forward error}\ \lesssim\ \kappa_f(x)\times\text{backward error}$$

This is the core idea of Wilkinson's backward error analysis: **the result of a stable algorithm should be the exact solution of a slightly perturbed set of input data.** If that perturbation is of the same order as machine precision, the algorithm is backward stable.

## 3. The World of Floating Point: IEEE 754

Modern computers almost all follow the IEEE 754 standard. A double-precision (binary64) number occupies 64 bits: 1 sign bit $s$, an 11-bit exponent field $e$ and a 52-bit fraction field $f$; a normalised number has the value

$$x=(-1)^s\,(1.f)_2\times2^{e-1023},\qquad 1\le e\le2046$$

where $(1.f)_2=1+\sum_{k=1}^{52}b_k2^{-k}$ is the normalised significand; the implicit leading 1 occupies no storage—the so-called "hidden bit" trick. From this we can count several key quantities:

- machine precision (unit roundoff) $u=2^{-53}\approx1.11\times10^{-16}$, corresponding to about 16 decimal significant digits;
- the smallest positive normal number $2^{-1022}\approx2.23\times10^{-308}$, and the largest finite number about $1.80\times10^{308}$;
- $e=2047$ is reserved for $\pm\infty$ and NaN (not a number), while $e=0$ represents subnormal numbers, giving a smooth transition at underflow.

The basic model of floating-point arithmetic is

$$\mathrm{fl}(x\ \mathrm{op}\ y)=(x\ \mathrm{op}\ y)(1+\delta),\qquad|\delta|\le u,\quad \mathrm{op}\in\{+,-,\times,\div\}$$

Note that the relative error is relative to **the result of that operation**, not to the inputs. Hence after $n$ operations the accumulated rounding error grows in the worst case as $(1+u)^n\approx1+nu$; in practice errors are positive and negative and often grow statistically as $\sqrt n\,u$, but a rigorous a priori bound can only be estimated in the worst case.

Floating-point arithmetic has three "quirks" that differ from real arithmetic:

1. **Addition is not associative**: $(a+b)+c\ne a+(b+c)$. A typical manifestation is a large number swallowing a small one: $10^{16}+1$ equals $10^{16}$ in double precision, because storing $10^{16}+1$ needs 54 significant bits while double precision has only 53. Thus $(10^{16}+1)-10^{16}=0$.
2. **Catastrophic cancellation**: when two nearby numbers are subtracted, the leading significant digits cancel completely, leaving only the inherently unreliable low-order digits, so the relative error is amplified drastically. This is the most ferocious source of rounding error.
3. **Overflow and underflow**: exceeding $1.8\times10^{308}$ gives infinity, while falling below $2.2\times10^{-308}$ loses precision or even becomes zero. When multiplying many factors, switch to logarithms: $\prod_i a_i=\exp\left(\sum_i\ln a_i\right)$.

## 4. Condition Numbers, Ill-Conditioning and Stability

**The condition number is a property of the problem, not of the algorithm.** This sentence deserves repeated emphasis. If a problem is itself ill-conditioned, no algorithm can rescue it—like measuring a rod whose length varies violently with temperature using a precision ruler: however accurate the ruler, the measurement is poor. Conversely, a well-conditioned problem with an unstable algorithm also yields garbage.

Several typical examples:

- Evaluating $f(x)=\sqrt{x}$: $\kappa=\left|\dfrac{x\cdot\frac{1}{2\sqrt x}}{\sqrt x}\right|=\dfrac12$, well conditioned; taking a square root does not amplify relative error;
- Evaluating $f(x)=\ln x$: $\kappa=\left|\dfrac{1}{\ln x}\right|$, which tends to infinity as $x\to1$; severely ill-conditioned near $x=1$;
- Root finding $f(x)=0$: at a simple root $x^*$, an absolute perturbation $\varepsilon$ of the function value displaces the root by $|\Delta x|\approx\dfrac{\varepsilon}{|f^\prime(x^*)|}$, so the absolute condition number is $\dfrac{1}{|f^\prime(x^*)|}$. At a root of multiplicity $m$, $f(x)\approx c(x-x^*)^m$, and from $c(\Delta x)^m\approx\varepsilon$ we get $|\Delta x|\approx\left(\dfrac{\varepsilon}{|c|}\right)^{1/m}$, i.e. **a loss of a factor $m$ in significant digits**: a double root keeps only half the digits, a triple root only a third.
- Linear systems $Ax=b$: $\kappa(A)=\|A\|\,\|A^{-1}\|$, and a perturbation of the right-hand side produces a relative error in the solution satisfying $\dfrac{\|\delta x\|}{\|x\|}\le\kappa(A)\dfrac{\|\delta b\|}{\|b\|}$. The Hilbert matrix $H_{ij}=\dfrac{1}{i+j-1}$ is a famous ill-conditioned matrix, already of condition number order $10^{13}$ at $n=10$.

**Cancellation and algorithmic rearrangement.** Computing $f(x)=\sqrt{x+1}-\sqrt{x}$ for $x\gg1$: the two terms are nearly equal, and direct subtraction loses many significant digits. Rewrite as

$$f(x)=\frac{(x+1)-x}{\sqrt{x+1}+\sqrt{x}}=\frac{1}{\sqrt{x+1}+\sqrt{x}}$$

The denominator is a **sum** of two nearby numbers (no subtraction occurs), the cancellation disappears and the accuracy is restored at once. Similarly, $1-\cos x$ for small $x$ should be written as $2\sin^2\dfrac{x}{2}$; the variance $\sum x_i^2-n\bar x^2$ in statistics should be replaced by a two-pass recurrence. This kind of "identity transformation that avoids subtraction" is a basic skill of numerical stability design.

**Balancing total error.** When a quantity is computed with step size $h$, the total error usually takes the form

$$E(h)=C_1h^p+\frac{C_2u}{h}$$

The first term is truncation error, the second rounding error (the number of operations is proportional to $1/h$). Setting $E^\prime(h)=0$ gives the optimal step size

$$h_{\mathrm{opt}}=\left(\frac{C_2u}{pC_1}\right)^{\frac{1}{p+1}},\qquad E_{\min}\sim O\left(u^{\frac{p}{p+1}}\right)$$

This shows that **blindly reducing the step size not only fails to improve accuracy but can make the result worse.** For example, in first-order finite-difference numerical differentiation ($p=1$), $h_{\mathrm{opt}}\sim\sqrt u\approx10^{-8}$, and the best accuracy achievable is only of order $10^{-8}$—of sixteen digits of machine precision, numerical differentiation keeps only eight.

## 5. Worked Examples

### Example 1 (basic: significant digits and the relative error bound)

Problem: Approximate $\pi$ by $\pi\approx3.1416$. How many significant digits does it have, and what is the relative error bound?

Solution: The true value is $\pi=3.1415926535\cdots$, and the absolute error is $|e|=|3.1416-3.14159265|\approx7.35\times10^{-6}$. In normalised form $3.1416=0.31416\times10^{1}$, so $m=1$ and $a_1=3$. Requiring $|e|\le\dfrac12\times10^{1-n}$, i.e. $7.35\times10^{-6}\le0.5\times10^{1-n}$, gives $10^{1-n}\ge1.47\times10^{-5}$, so $1-n\ge-4.83$ and $n\le5.83$; taking the integer $n=5$, $\pi\approx3.1416$ has 5 significant digits. By the theorem, the relative error bound is

$$\varepsilon_r\le\frac{1}{2a_1}\times10^{1-n}=\frac16\times10^{-4}\approx1.67\times10^{-5}$$

while the actual relative error is $\dfrac{7.35\times10^{-6}}{3.14159}\approx2.34\times10^{-6}$; the bound is loose but correct—exactly the meaning of "bound": it guarantees the error is no worse, without promising it is that bad.

### Example 2 (advanced: two algorithms for a quadratic)

Problem: Solve $x^2-2\times10^{8}x+1=0$ with the quadratic formula; explain why it loses accuracy and how to fix it.

Solution: The discriminant is $\Delta=b^2-4ac=4\times10^{16}-4$ with $b=-2\times10^{8}$. The small root is

$$x_1=\frac{-b-\sqrt{\Delta}}{2}=\frac{2\times10^{8}-\sqrt{4\times10^{16}-4}}{2}$$

Note that $\sqrt{4\times10^{16}-4}=2\times10^{8}\sqrt{1-10^{-16}}\approx2\times10^{8}\left(1-\tfrac12\times10^{-16}\right)$. This number differs from $2\times10^{8}$ by a relative amount of only $5\times10^{-17}$, already below the double-precision machine precision $u\approx1.11\times10^{-16}$; the result of direct subtraction is determined entirely by rounding noise and may be 0 or even negative, whereas the true value is $x_1\approx5\times10^{-9}$.

The fix uses the product relation between the roots $x_1x_2=\dfrac{c}{a}=1$: first compute the large root

$$x_2=\frac{-b+\mathrm{sign}(b)\,\sqrt{\Delta}}{2}=\frac{2\times10^{8}+\sqrt{4\times10^{16}-4}}{2}\approx2\times10^{8}$$

Here the two terms are added with the same sign, so no cancellation occurs; then set $x_1=\dfrac{1}{x_2}\approx5\times10^{-9}$, with the accuracy intact. This example shows that **two equivalent formulas for the same mathematical problem can behave utterly differently numerically; choosing a formula is choosing stability.**

## 6. Common Errors and Pitfalls

1. **Mistaking printed digits for significant digits**. Of fifteen formatted digits the last few are almost certainly meaningless noise. Before any accuracy analysis, first establish how many digits of the input data are actually trustworthy.
2. **Comparing two floating-point numbers with equality**. Test $|a-b|<\varepsilon_{\mathrm{abs}}+\varepsilon_{\mathrm{rel}}\max(|a|,|b|)$ instead; a purely absolute tolerance fails when magnitudes differ greatly, a purely relative one fails near zero, and the mixed criterion is the most robust.
3. **Ignoring the summation order when accumulating**. Summing from small to large is more accurate than the reverse; the more precise approach is Kahan or Neumaier compensated summation, using a compensation variable to record the low-order bits lost each time.
4. **Not applying an identity transformation when subtracting nearby numbers**. See the $\sqrt{x+1}-\sqrt{x}$ example above. The $\mathrm{e}^{x}-1$ (for small $x$) common in physics should use the $\mathrm{expm1}$ function.
5. **Overlooking the opposing behaviour of truncation and rounding error**. See $E(h)=C_1h^p+C_2u/h$; numerical differentiation is especially dangerous, since a smaller step is not better.
6. **Blaming the algorithm for an ill-conditioned problem**. Estimate the condition number first: if $\kappa\sim10^{10}$, then even a backward-stable algorithm loses ten significant digits in forward error. In that case change the formulation of the problem (reparameterise, add regularisation, or use higher-precision arithmetic) rather than swapping algorithms.
7. **Mixing single and double precision without realising it**. Single precision is much faster on GPUs, but a chain of millions of accumulations fails after a few thousand steps; critical accumulators must use double precision or compensated summation.
8. **Ignoring overflow and underflow**. A product of many factors underflows to zero; taking logarithms and summing solves it. Computing partition functions in statistical physics and likelihoods in machine learning both require the log-sum-exp trick.
9. **Judging correctness by "the curve looks smooth"**. Numerical error often produces perfectly smooth but wrong results; the only reliable verification is to vary the parameters (step size, precision, algorithm) and run a convergence test, observing whether the error decreases at the theoretical order.

## 7. Summary and Mnemonics

- Error has three layers: model error, truncation error, rounding error; computational physics mainly concerns the latter two.
- Significant digits are defined by the absolute error bound and correspond one-to-one with the relative error bound: $\varepsilon_r\le\dfrac{1}{2a_1}10^{1-n}$.
- Double-precision machine precision $u=2^{-53}\approx1.11\times10^{-16}$; the relative error of a single operation does not exceed $u$.
- Floating-point addition is not associative; a large number swallowing a small one and catastrophic cancellation are the two great killers of rounding error.
- The condition number is a property of the problem: $\kappa=\left|\dfrac{xf^\prime(x)}{f(x)}\right|$; forward error is roughly the condition number times the backward error.
- Stability is a property of the algorithm: a backward-stable algorithm gives "the exact solution of a perturbed input".
- Truncation error decreases as $h$ decreases while rounding error increases, so there is an optimal step size $h_{\mathrm{opt}}\sim u^{1/(p+1)}$.
- When subtracting nearby numbers, first apply an identity transformation (rationalisation, half-angle formula, logarithms) and then compute.

**Mnemonic: ask the condition number first, then watch the step size; transform before subtracting, compensate when accumulating; fifteen digits printed does not mean fifteen are trustworthy.**`,
    keyPoints: [
      'Truncation error O(h^p) decreases as the step size shrinks while rounding error increases, so an optimal step size exists',
      'Double-precision machine precision u = 2^{-53} ≈ 1.11×10^{-16}, about 16 decimal significant digits',
      "Relative condition number κ = |x f'(x)/f(x)|; forward error ≈ κ × backward error",
      'Subtracting nearby numbers causes catastrophic cancellation of significant digits, requiring rationalisation or a half-angle transformation',
      'n significant digits correspond to a relative error bound of 1/(2a_1) × 10^{1-n}',
      'The result of a backward-stable algorithm is the exact solution of a slightly perturbed input',
    ],
  },
  'cp-root-finding': {
    chapter: 'Chapter 2 Root Finding',
    title: 'Bisection and Newton\u2019s Method: From Interval Bracketing to Tangent Acceleration',
    summary:
      'Bisection trades halving the interval for robustness, Newton\u2019s method trades the tangent line for speed: only by understanding the order of convergence and stopping criteria do you know when to be fast and when to be safe.',
    content: String.raw`

Root finding is the oldest and most underrated problem among numerical methods. Physics encounters it almost everywhere: the peak of the blackbody spectrum is determined by Wien's equation $5(1-e^{-x})=x$ (with $x=\dfrac{hc}{\lambda k_BT}$); the bound-state levels of a one-dimensional finite square well are determined by $\tan z=\sqrt{(z_0/z)^2-1}$; the reflection zeros of optical thin films, the resonant frequency of an RLC circuit, and even Kepler's equation for planetary orbits $M=E-e\sin E$ all reduce in the end to $f(x)=0$.

What these equations share is that **there is no closed-form root formula**. A quadratic can be solved by the quadratic formula, cubics and quartics have cumbersome radical solutions, and for degree five and above no radical solution exists at all (the Abel–Ruffini theorem); transcendental equations cannot rely on algebra in the slightest. So we can only "try".

Trying comes in two schools. The first is like the **price-guessing game** on television: the host keeps saying "higher" or "lower", you cut the interval in half each time, and after a dozen rounds you are certain to close in. This is bisection: it never fails, but it is slow—each question buys only one bit of information. The second is like **taking a shortcut**: stand at a point on the curve, walk along the tangent to where it meets the horizontal axis, and take that intersection as the new position. If the curve is fairly straight nearby, one step can land next to the root, and the closer you are the more accurate each step becomes. This is Newton's method: astonishingly fast, but liable to slip—given a bad starting point, the tangent can fling you to the far horizon.

Here is a teaser: does Newton's method gain one correct digit per step? No. Its number of correct digits roughly **doubles** each step: one digit becomes two, two become four, four become eight. That doubling is what quadratic convergence means, and it is the reason the risk is worth taking.

## 2. Algorithm Definitions and Convergence Theory

**Definition 1 (bracketing interval)** If $f\in C[a,b]$ and $f(a)f(b)<0$, then by the intermediate value theorem $[a,b]$ contains at least one root. If in addition $f$ is strictly monotone on $[a,b]$, the root is unique and $[a,b]$ is called a **bracketing interval**. Finding a bracketing interval (by scanning, plotting or physical reasoning) is the first step of numerical root finding, and the one most often skipped.

**Algorithm 1 (bisection)** Take $a_0=a$, $b_0=b$ and the midpoint $x_k=\dfrac{a_k+b_k}{2}$; if $f(a_k)f(x_k)<0$ set $b_{k+1}=x_k$, $a_{k+1}=a_k$, otherwise set $a_{k+1}=x_k$, $b_{k+1}=b_k$. After each iteration the interval halves: $b_k-a_k=\dfrac{b-a}{2^k}$, hence

$$|x_k-x^*|\le\frac{b-a}{2^{k+1}}$$

To achieve accuracy $\varepsilon$, the required number of midpoints is

$$N\ge\left\lceil\log_2\frac{b-a}{2\varepsilon}\right\rceil=\left\lceil\frac{\ln(b-a)-\ln(2\varepsilon)}{\ln2}\right\rceil$$

Bisection converges linearly (ratio $\tfrac12$) and requires only continuity of $f$, neither differentiability nor smoothness; it is the **most robust** root finder.

**Definition 2 (fixed-point iteration)** Rewrite $f(x)=0$ equivalently as $x=\varphi(x)$ and iterate $x_{k+1}=\varphi(x_k)$. There are infinitely many rewritings (for example $x^3-x-1=0$ can be written $x=x^3-1$, $x=\sqrt[3]{x+1}$, $x=\dfrac{1}{x^2-1}$, and so on), and different rewritings have utterly different convergence behaviour.

**Theorem 1 (contraction mapping, Banach fixed-point theorem)** If $\varphi\in C[a,b]$ satisfies $\varphi([a,b])\subseteq[a,b]$ and there is a constant $L<1$ with $|\varphi^\prime(x)|\le L$ for all $x\in[a,b]$, then: $\varphi$ has a unique fixed point $x^*$ in $[a,b]$; for any $x_0\in[a,b]$ the iteration converges to $x^*$; and the a priori estimate

$$|x_k-x^*|\le\frac{L^k}{1-L}|x_1-x_0|$$

and the a posteriori estimate

$$|x_k-x^*|\le\frac{L}{1-L}|x_k-x_{k-1}|$$

hold. The a posteriori estimate is especially useful: it uses only the two already-computed successive iterates and needs no knowledge of the true value, so it serves directly as a stopping criterion. Note that as $L\to1$, $\dfrac{L}{1-L}\to\infty$ and convergence becomes extremely slow—the stagnation phenomenon of "apparently moving but not moving".

**Algorithm 2 (Newton's method)** Given $x_0$, iterate

$$x_{k+1}=x_k-\frac{f(x_k)}{f^\prime(x_k)},\qquad k=0,1,2,\dots$$

This is the fixed-point iteration with $\varphi(x)=x-\dfrac{f(x)}{f^\prime(x)}$; geometrically it takes the intersection of the tangent to $f$ at $x_k$ with the $x$ axis as the new approximation.

**Definition 3 (order of convergence)** Write the error as $e_k=x_k-x^*$. If there are $p\ge1$ and a constant $C\ne0$ with

$$\lim_{k\to\infty}\frac{|e_{k+1}|}{|e_k|^p}=C$$

then the iteration has order of convergence $p$, and $C$ is the asymptotic error constant. $p=1$ with $C<1$ is linear convergence; $p=1$, $C=0$ is superlinear; $p=2$ is quadratic. The larger $p$ and the smaller $C$, the faster the convergence. Roughly speaking, an order-$p$ method multiplies the number of correct significant digits by about $p$ per iteration.

**Definition 4 (stopping criteria)** A practical program should set three kinds of stopping condition at once:

- successive difference: $\dfrac{|x_{k+1}-x_k|}{\max(|x_{k+1}|,1)}<\varepsilon_{\mathrm{rel}}$;
- residual: $|f(x_{k+1})|<\varepsilon_f$;
- maximum number of iterations $k_{\max}$ and stagnation detection (exit if several consecutive steps bring no improvement).

## 3. Mathematical Derivation of the Order of Convergence

**Derivation for Newton's method and the error recurrence.** Expand $f$ in a Taylor series about $x_k$ and evaluate at $x^*$:

$$0=f(x^*)=f(x_k)+f^\prime(x_k)(x^*-x_k)+\frac12f^{\prime\prime}(\xi_k)(x^*-x_k)^2$$

where $\xi_k$ lies between $x_k$ and $x^*$. Dividing both sides by $f^\prime(x_k)$ and rearranging:

$$x_k-\frac{f(x_k)}{f^\prime(x_k)}-x^*=\frac{f^{\prime\prime}(\xi_k)}{2f^\prime(x_k)}(x^*-x_k)^2$$

The left side is exactly $x_{k+1}-x^*=e_{k+1}$, and the right side contains $e_k^2=(x_k-x^*)^2$ (the square removes the sign), so

$$e_{k+1}=\frac{f^{\prime\prime}(\xi_k)}{2f^\prime(x_k)}\,e_k^2\ \Longrightarrow\ |e_{k+1}|\approx C|e_k|^2,\qquad C=\left|\frac{f^{\prime\prime}(x^*)}{2f^\prime(x^*)}\right|$$

Given a simple root with $f^\prime(x^*)\ne0$, this is quadratic convergence. Note that $C$ has dimensions of "per unit error", and it determines from how many digits the doubling becomes visible: if $C|e_0|>1$, the first few steps may still jump about, and only inside the basin $|e_k|<1/C$ does the doubling become steady.

**Derivation for fixed-point iteration.** By the mean value theorem, $e_{k+1}=\varphi(x_k)-\varphi(x^*)=\varphi^\prime(\xi_k)e_k$. If $|\varphi^\prime|\le L<1$ the error contracts by $L$ each step and the convergence is linear; if $\varphi^\prime(x^*)=0$ but $\varphi^{\prime\prime}(x^*)\ne0$, expanding to second order gives $e_{k+1}\approx\dfrac{\varphi^{\prime\prime}(x^*)}{2}e_k^2$, again quadratic. Newton's method is quadratic precisely because

$$\varphi^\prime(x)=1-\frac{f^{\prime2}-ff^{\prime\prime}}{f^{\prime2}}=\frac{f(x)f^{\prime\prime}(x)}{f^{\prime2}(x)}$$

and $f(x^*)=0$ at the root, so $\varphi^\prime(x^*)=0$. This identity also explains Newton's failure modes: when $f^\prime(x_k)\approx0$ (the curve nearly horizontal or near an inflection point), $\varphi^\prime$ is large and the iteration oscillates violently or even diverges.

**Degeneracy at multiple roots and its correction.** If $x^*$ is a root of multiplicity $m$, write $f(x)=c(x-x^*)^m+\cdots$; then

$$\varphi^\prime(x^*)=1-\frac{1}{m}\ne0$$

Newton's method degenerates to linear convergence with ratio $1-\dfrac1m$ ($\dfrac12$ for a double root, $\dfrac23$ for a triple root). The remedy is to multiply the step by the multiplicity:

$$x_{k+1}=x_k-m\frac{f(x_k)}{f^\prime(x_k)}$$

Now $\varphi^\prime(x^*)=0$ and quadratic convergence is restored. Another trick that does not require knowing the multiplicity is to apply Newton's method to $u(x)=\dfrac{f(x)}{f^\prime(x)}$ (whose roots are simple), i.e. Schröder iteration. Note also that a multiple root is itself an ill-conditioned problem (see Chapter 1): an $m$-fold root retains only $\dfrac1m$ of the significant digits, and no algorithm can remedy that.

**Secant method and superlinear convergence.** If the derivative is hard or expensive to obtain, replace it by a divided difference:

$$x_{k+1}=x_k-f(x_k)\frac{x_k-x_{k-1}}{f(x_k)-f(x_{k-1})}$$

Its order of convergence is $p=\dfrac{1+\sqrt5}{2}\approx1.618$ (the golden ratio), and each step needs only one function evaluation (Newton's method needs two, function plus derivative), so measured by "accuracy gain per unit cost" it is often better than Newton's method.

## 4. Intuition and Pictures

Treating the logarithm of the error as a kind of time, the $|e_k|$ curves of the three methods are completely different:

| Method | Order | New evaluations per step | Derivative needed | Robustness | Significant digits per step |
|---|---|---|---|---|---|
| Bisection | 1 (ratio 1/2) | 1 | No | Converges whenever a bracketing interval exists | Fixed gain of about 0.301 digits |
| Fixed point | 1 (ratio $L$) | 1 | No | Depends on the rewriting; may diverge | Fixed gain of $-\log_{10}L$ digits |
| Secant | 1.618 | 1 | No | Fairly good | Multiplied by 1.618 |
| Newton | 2 | 2 | Yes | Poor, sensitive to the initial guess | Doubles |

Bisection gains a fixed 1 bit per step ($\log_{10}2\approx0.301$ decimal digits), so going from $10^{-2}$ to $10^{-16}$ takes about 47 steps; Newton's method starting from $10^{-2}$ gives errors of roughly $10^{-4},10^{-8},10^{-16}$: four steps and done. That is the power of "doubling".

Geometrically, Newton's method replaces the curve by its tangent. If $f$ is convex near the root and the initial guess lies on the convex side, the tangent intersections approach monotonically from one side (as when computing $\sqrt2$, descending from above); if the initial guess falls on the other side of an inflection point, the tangent can throw the next iterate further away, or even create a two-cycle. The classic counterexample is $f(x)=x^3-2x+2$ with $x_0=0$: since $f^\prime(0)=-2$ sends the iterate to $x_1=1$, symmetry sends it back to $x_2=0$, and it is trapped in a loop. Another famous counterexample is $f(x)=\arctan x$: when $|x_0|>1.39$ the tangent is too flat and the iteration diverges monotonically to infinity.

**Higher-dimensional generalisation.** What physics meets more often is a nonlinear system $F(x)=0$ with $F:\mathbb{R}^n\to\mathbb{R}^n$ (for example the force-balance conditions of a many-body equilibrium, or the nodal equations of a nonlinear circuit). Newton's method generalises to

$$x_{k+1}=x_k-J^{-1}(x_k)F(x_k),\qquad J_{ij}=\frac{\partial F_i}{\partial x_j}$$

where $J$ is the Jacobian matrix. In practice $J^{-1}$ is never formed explicitly; instead one solves the linear system $J\,\delta=-F$ and sets $x_{k+1}=x_k+\delta$ (Chapter 7). The cost per step rises from $O(n)$ to $O(n^3)$, so quasi-Newton methods (such as Broyden's rank-one update) are often used to approximate the Jacobian and bring the cost down to $O(n^2)$. The multidimensional Newton method likewise converges only when the initial guess is close enough to the solution; in engineering it must be combined with damping: $x_{k+1}=x_k+\alpha\delta$, choosing $\alpha\in(0,1]$ by a line search or trust region so that $\|F\|$ decreases at every step. This is the standard way of "trading robustness for a larger basin of convergence".

**The physical meaning of the stopping criteria.** The successive-difference criterion measures "is the solution still moving"; the residual criterion measures "how well is the equation satisfied". When $|f^\prime(x^*)|$ is large (as at the intersection of a steep exponential), the residual can be tiny while the error in the variable is still large; when $|f^\prime(x^*)|$ is small (near a multiple root or an extremum), the variable has long stopped moving while the residual is still appreciable. Physical quantities are often unequally sensitive to the variable and to the residual, so which criterion to use depends on whether you ultimately want a position or an energy.

The standard engineering practice is a **hybrid strategy**: first use bisection (or the more robust Brent method) to enclose the solution in a small range, then switch to Newton or the secant method to enjoy quadratic convergence; as soon as a Newton step leaves the interval or increases $|f|$, fall back to bisection at once. Brent's method blends bisection, the secant method and inverse quadratic interpolation, combining the reliability of bisection with superlinear speed, and is the default in real software (such as SciPy's brentq).

## 5. Worked Examples

### Example 1 (basic: number of bisection steps and the error)

Problem: Use bisection to find the root of $f(x)=x^3-x-1$ in $[1,2]$; write out the first three intervals and estimate how many midpoints are needed to reach $10^{-4}$.

Solution: $f(1)=-1<0$ and $f(2)=5>0$, and $f^\prime(x)=3x^2-1>0$ throughout $[1,2]$, so the root is unique.

First midpoint $x_1=1.5$: $f(1.5)=3.375-2.5=0.875>0$, root in $[1,1.5]$;
second $x_2=1.25$: $f(1.25)=1.953125-2.25=-0.296875<0$, root in $[1.25,1.5]$;
third $x_3=1.375$: $f(1.375)=2.59961-2.375=0.22461>0$, root in $[1.25,1.375]$.

After three iterations the interval length is 0.125, and the midpoint error does not exceed 0.0625. To reach $\varepsilon=10^{-4}$,

$$N\ge\frac{\ln1-\ln(2\times10^{-4})}{\ln2}=\frac{\ln(5\times10^{3})}{\ln2}\approx\frac{8.517}{0.693}\approx12.29$$

so 13 midpoints must be computed. The cost of bisection depends logarithmically on the accuracy: very cheap and completely predictable.

### Example 2 (advanced: Newton's method for the Wien displacement equation)

Problem: The peak of the blackbody spectrum satisfies $5(1-e^{-x})=x$; iterate twice with Newton's method starting from $x_0=5$.

Solution: Let $f(x)=5(1-e^{-x})-x$, so $f^\prime(x)=5e^{-x}-1$. At $x_0=5$:

$$e^{-5}=6.7379\times10^{-3},\quad f(5)=5\times0.99326-5=-3.3690\times10^{-2}$$

$$f^\prime(5)=5\times6.7379\times10^{-3}-1=-0.96631$$

$$x_1=5-\frac{-3.3690\times10^{-2}}{-0.96631}=5-3.4864\times10^{-2}=4.9651360$$

The true value is $x^*=4.9651142$, so the first step already has an error of about $2.2\times10^{-5}$ (5 significant digits). For the second step at $x_1$: $e^{-x_1}=6.9771\times10^{-3}$, $f(x_1)=5(1-6.9771\times10^{-3})-4.9651360=-2.13\times10^{-5}$, $f^\prime(x_1)=-0.96511$, hence

$$x_2=4.9651360-\frac{-2.13\times10^{-5}}{-0.96511}=4.9651360-2.21\times10^{-5}=4.9651142$$

The difference from the true value is now below $10^{-8}$: the error jumped from $2.2\times10^{-5}$ to the $10^{-9}$ level in one step, exactly what quadratic convergence $e_{k+1}\approx Ce_k^2$ predicts (here $C=\left|\dfrac{f^{\prime\prime}}{2f^\prime}\right|=\left|\dfrac{-5e^{-x}}{2f^\prime}\right|\approx0.018$). Physical conclusion: the Wien displacement constant $b=\dfrac{hc}{k_Bx^*}\approx2.898\times10^{-3}\ \mathrm{m\cdot K}$.

## 6. Common Errors and Pitfalls

1. **Turning to Newton's method without first finding a bracketing interval**. First use physical reasoning or a coarse scan to determine $[a,b]$ with $f(a)f(b)<0$; otherwise the iteration may converge to an irrelevant root or diverge.
2. **Stopping merely on the residual $|f(x_k)|$**. If $|f^\prime(x^*)|$ is large (a steep function), the residual is tiny while the error is still large; near a multiple root $|f^\prime|$ is small, so the residual has long reached machine precision while the error remains appreciable. Prefer the relative successive-difference criterion.
3. **Continuing to iterate where $f^\prime\approx0$**. A vanishing denominator makes the step explode; the program must check $|f^\prime|<\epsilon$ and switch methods.
4. **Forgetting to set a maximum number of iterations**. A non-convergent iteration loops forever; also detect stagnation (several consecutive steps with no decrease in $|f|$).
5. **Treating a fixed-point rewriting as arbitrary**. Different rewritings of the same equation may converge or diverge: $x=x^3-1$ has $|\varphi^\prime|=|3x^2|\approx4.7>1$ near the root and diverges, whereas $x=\sqrt[3]{x+1}$ has $|\varphi^\prime|\approx0.14$ and converges. After rewriting, always check $|\varphi^\prime|<1$.
6. **Expecting quadratic convergence at a multiple root**. There Newton's method is only linear with ratio $1-\dfrac1m$; switch to $x_{k+1}=x_k-m\dfrac{f}{f^\prime}$ or Schröder iteration, and accept the loss of a factor $m$ in significant digits.
7. **Using bisection to chase high accuracy**. Bisection cannot exploit the smoothness of the function, needs more than 50 steps to reach machine precision, and cannot signal "the residual has bottomed out"; demands for high accuracy belong to Newton or Brent.
8. **Ignoring the case of multiple roots**. A polynomial may have several real roots; isolate them one by one with a flux scan (checking sign changes on a coarse grid) and solve each; stopping after one root often misses the physically meaningful one (such as an excited-state level).
9. **Replacing the derivative with a low-accuracy finite difference**. When mixing the secant and Newton methods, an ill-chosen difference step (too large gives truncation, too small gives cancellation) degrades the order to linear; the difference step should be of order $\sqrt u\,|x|$.

## 7. Summary and Mnemonics

- Bisection always converges for continuous functions, with error $|x_k-x^*|\le(b-a)/2^{k+1}$ and 1 bit per step.
- Fixed-point iteration converges if and only if $|\varphi^\prime|\le L<1$ after rewriting; the a posteriori error estimate is $\dfrac{L}{1-L}|x_k-x_{k-1}|$.
- Newton's method $x_{k+1}=x_k-\dfrac{f}{f^\prime}$ converges quadratically at a simple root, with error constant $C=\left|\dfrac{f^{\prime\prime}(x^*)}{2f^\prime(x^*)}\right|$.
- A multiple root degrades Newton's method to linear (ratio $1-\dfrac1m$); multiplying by the multiplicity $m$ restores second order.
- The meaning of order $p$: the number of significant digits is multiplied by $p$ each step; the secant method has $p\approx1.618$ and is often more economical than Newton.
- Stopping needs mixed criteria: relative step size, residual and maximum iterations, none of which can be omitted.
- Engineering practice prefers a hybrid strategy (bisection as a safety net plus Newton for acceleration) or Brent's method.

**Mnemonic: bracket the interval first, bisection as the net and Newton to charge; brake when the tangent goes flat, multiply by m at a multiple root for second order.**`,
    keyPoints: [
      'Bisection error bound (b−a)/2^{k+1}, gaining a fixed 1 bit of information per step',
      "Fixed-point iteration converges when |φ'(x)| ≤ L < 1, with a posteriori error bound L/(1−L)·|x_k − x_{k−1}|",
      "Newton's method is quadratically convergent at a simple root, with error constant C = |f''(x*)/(2f'(x*))|",
      'A multiple root degrades Newton\u2019s method to linear convergence (ratio 1−1/m); multiplying by the multiplicity m restores second order',
      'Order p means the significant digits are multiplied by p per step; the secant method has p ≈ 1.618',
      'The stopping criteria should use relative step size, residual and maximum iterations together',
    ],
  },
  'num-integration': {
    chapter: 'Chapter 3 Numerical Integration and Differentiation',
    title: 'From Riemann Sums to Romberg: The Precision Game of Quadrature Formulas',
    summary:
      'The trapezoid rule uses straight lines, Simpson\u2019s rule uses parabolas, and Romberg cancels the errors of different step sizes against each other: the essence of numerical integration is squeezing more accuracy out of the same set of function values.',
    content: String.raw`

Calculus courses teach the routine for $\int_a^b f(x)\,dx$: find an antiderivative and substitute the limits. But most of what physics actually needs to integrate has no antiderivative at all. The partition function of statistical physics $Z=\int e^{-\beta E(\Gamma)}d\Gamma$ is a high-dimensional integral; the total energy of blackbody radiation requires $\int_0^\infty \dfrac{x^3}{e^x-1}dx$; quantum scattering cross sections involve integrals of oscillating spherical Bessel functions; path integrals are integrals over infinitely many dimensions. There are worse cases still: **the integrand is itself the output of a numerical experiment**—all you have is a table, such as a density of states $\rho(E)$ from a Monte Carlo simulation, or an absorption curve measured by a spectrometer.

Then the only recourse is to return to the definition of the integral: cut the interval into small pieces and approximate the total area by the sum of the pieces. The most naive idea is the **Riemann sum**—replace each piece by a rectangle whose height is taken at the left endpoint:

$$I\approx\sum_{k=0}^{n-1}f(x_k)h,\qquad h=\frac{b-a}{n}$$

The error of the rectangle rule is $O(h)$: shrinking $h$ tenfold only shrinks the error tenfold. To reach $10^{-10}$ accuracy would need $10^{10}$ subintervals, clearly unacceptable. Can the same function values be traded for higher accuracy? Yes, and the idea is extremely elegant: replace the rectangle by a higher-degree polynomial (straight line → parabola → cubic), or more cleverly—**linearly combine two low-accuracy results at different step sizes so that the error terms cancel**. The former gives Simpson's rule, the latter gives Romberg extrapolation; these are the two main lines of this chapter.

Here is a teaser: the trapezoid rule uses a linear polynomial and has error $O(h^2)$; Simpson's rule uses a quadratic polynomial, so one would expect $O(h^3)$, yet it is in fact $O(h^4)$. Where does the extra order come from? The answer is the "unexpected bonus" brought by symmetry.

## 2. Quadrature Formulas and Degree of Precision

**Definition 1 (mechanical quadrature formula)** A formula of the form

$$I_n(f)=\sum_{k=0}^{n}A_k\,f(x_k)$$

is called a mechanical quadrature formula, with $x_k$ the nodes and $A_k$ the coefficients (weights). If the nodes are equally spaced and include the endpoints, it is a Newton–Cotes formula.

**Definition 2 (degree of precision)** If a quadrature formula is exact for every polynomial of degree up to $m$ but inexact for $x^{m+1}$, its degree of precision is $m$. This is the first measure of a quadrature formula: the higher the degree of precision, the better the accuracy for smooth functions.

**Construction of interpolatory quadrature.** Approximate $f$ by the Lagrange interpolating polynomial through $n+1$ nodes, $L_n(x)=\sum_k f(x_k)\ell_k(x)$; integrating gives

$$A_k=\int_a^b\ell_k(x)\,dx=\int_a^b\prod_{j\ne k}\frac{x-x_j}{x_k-x_j}\,dx$$

A formula constructed this way has at least degree of precision $n$ (since it integrates $L_n$ exactly, and $f\equiv L_n$ when $f$ is a polynomial of degree $\le n$).

**Trapezoid rule ($n=1$)** With nodes $a,b$:

$$T=\frac{b-a}{2}\big[f(a)+f(b)\big],\qquad E_T=-\frac{(b-a)^3}{12}f^{\prime\prime}(\xi)$$

Degree of precision 1. Geometrically it replaces the area under the curve by the area of a trapezoid.

**Simpson's rule ($n=2$)** With nodes $a,m=\dfrac{a+b}{2},b$:

$$S=\frac{b-a}{6}\left[f(a)+4f(m)+f(b)\right],\qquad E_S=-\frac{(b-a)^5}{2880}f^{(4)}(\xi)$$

The weights of the three nodes are in the ratio $1:4:1$ and the degree of precision is **3**—one order more than the 2 a quadratic "should" give. The reason is that the nodes are symmetric about the midpoint, so the integration error of the cubic term $x^3$ cancels exactly on a symmetric interval. This is the general rule for equally spaced Newton–Cotes formulas: **when $n$ is even, an interpolatory formula can reach degree of precision $n+1$**; when $n$ is odd it is only $n$. This is also why practice almost always uses $n=2$ (Simpson) and rarely $n=1,3$.

Going further, Boole's rule for $n=4$ is

$$B=\frac{2h}{45}\left(7f_0+32f_1+12f_2+32f_3+7f_4\right),\qquad h=\frac{b-a}{4}$$

with degree of precision 5. But the weights of higher-order Newton–Cotes formulas become negative (for $n\ge8$), making the summation unstable, so in practice composite low-order formulas or Gaussian quadrature are preferred.

**Gaussian quadrature (a supplement)** If the restriction of equally spaced nodes is dropped and the nodes are treated as unknowns, then $n+1$ nodes can reach degree of precision $2n+1$, the nodes being the zeros of orthogonal polynomials. Gauss–Legendre quadrature is far more accurate than Newton–Cotes with the same number of nodes, and is the first choice when "the integrand can be sampled anywhere".

## 3. Composite Quadrature and Romberg Extrapolation

**Composite trapezoid rule.** Divide $[a,b]$ into $n$ equal parts, $h=\dfrac{b-a}{n}$, $x_k=a+kh$, $f_k=f(x_k)$:

$$T_n=\frac{h}{2}\left(f_0+2\sum_{k=1}^{n-1}f_k+f_n\right)$$

Summing the per-panel errors $-\dfrac{h^3}{12}f^{\prime\prime}(\xi_k)$ and combining by the intermediate value theorem:

$$E_{T_n}=\sum_k\left(-\frac{h^3}{12}f^{\prime\prime}(\xi_k)\right)=-\frac{h^2}{12}\sum_k h f^{\prime\prime}(\xi_k)=-\frac{b-a}{12}h^2f^{\prime\prime}(\xi)$$

so the overall error is $O(h^2)$. Note that going from $O(h^3)$ per panel to $O(h^2)$ overall loses one power—because the number of panels is proportional to $1/h$. This rule "the global order is one lower than the local order" is exactly the same as in the numerical solution of ODEs.

**Composite Simpson's rule.** Take $n$ even and $h=\dfrac{b-a}{n}$, applying Simpson's rule to each pair of subintervals:

$$S_n=\frac{h}{3}\left(f_0+4\sum_{k\ \mathrm{odd}}f_k+2\sum_{k\ \mathrm{even},\,k\ne0,n}f_k+f_n\right)$$

$$E_{S_n}=-\frac{b-a}{180}h^4f^{(4)}(\xi)=O(h^4)$$

**Richardson extrapolation.** Suppose the error of some formula has the asymptotic expansion $T(h)=I+c_1h^2+c_2h^4+\cdots$. Then

$$T\!\left(\frac h2\right)=I+\frac{c_1h^2}{4}+\frac{c_2h^4}{16}+\cdots$$

Eliminating the $h^2$ term between the two:

$$\frac{4T(h/2)-T(h)}{3}=I-\frac{c_2}{4}h^4+\cdots$$

Remarkably, this combination **is exactly the composite Simpson formula**—two trapezoid results "for free" yield fourth-order accuracy without a single extra function value. Continuing to eliminate the $h^4$ term gives the Cotes formula

$$\frac{16S(h/2)-S(h)}{15}=I+O(h^6)$$

and eliminating $h^6$ gives the Romberg formula $\dfrac{64C(h/2)-C(h)}{63}=I+O(h^8)$.

**The Romberg recurrence table.** Let $R_{k,0}=T(h/2^k)$ be the composite trapezoid values with successively halved step sizes; then

$$R_{k,j}=R_{k,j-1}+\frac{R_{k,j-1}-R_{k-1,j-1}}{4^j-1},\qquad j=1,2,\dots,k$$

Each column raises the order by two, forming a lower-triangular table. Each added row only requires halving the interval once more (doubling the number of function values), yet raises the accuracy by two orders—this is what "squeezing more accuracy out of the same function values" means. In practice one stops when the difference between two successive diagonal entries falls below the tolerance.

**Adaptive integration.** If the integrand varies violently in places (such as a spike near a potential well), uniform refinement is wasteful. Adaptive Simpson first computes $S(a,b)$ and $S(a,m)+S(m,b)$ for the two halves; from the order of the Simpson error,

$$|S(a,b)-I|\approx\frac{1}{15}\left|S(a,b)-S(a,m)-S(m,b)\right|$$

If this estimate exceeds the tolerance, recursively refine the half with the larger error. This is the archetypal idea of "putting computing resources where they are most needed", and is extremely effective for the spikes and boundary layers common in physics.

**Typical integrals in physics and their pitfalls.** Statistical physics is full of ratios like

$$\langle E\rangle=\frac{\displaystyle\int_0^\infty E\,e^{-\beta E}\rho(E)\,dE}{\displaystyle\int_0^\infty e^{-\beta E}\rho(E)\,dE},\qquad \rho(E)\propto E^{d/2-1}$$

which carries both an algebraic singularity at $E=0$ (for $d=1$, $\rho\propto E^{-1/2}$) and an infinite upper limit. The standard treatment is to handle the exponential decay analytically first (substituting $t=\beta E$ to make it dimensionless) and then apply adaptive Simpson to the remaining finite interval; truncating directly to $[0,E_{\max}]$ with a uniform grid both wastes samples and easily misses the contribution near zero. Another famous example is the Fermi–Dirac integral

$$F_k(\eta)=\int_0^\infty\frac{x^k}{e^{x-\eta}+1}\,dx$$

In the degenerate limit $\eta\gg1$ the integrand approaches a step function (the Fermi surface), and a uniform grid smears out the fine structure inside the Fermi sea; here one should choose different substitutions according to the sign of $\eta$, or switch to specially adapted Gaussian nodes. A third pitfall is the **oscillatory integral** $\int_a^b f(x)\cos(\omega x)dx$: for large $\omega$ the positive and negative parts nearly cancel and the integral is tiny, while the Simpson error is proportional to $\omega^2\|f\|$, so the relative error can be completely out of control. The remedy is to take at least 6–8 points per half wavelength, or to use Filon's method (interpolating $f$ by a polynomial and integrating the oscillatory factor exactly).

## 4. Numerical Differentiation and Differences

Numerical differentiation is in a completely different situation from numerical integration: **integration is a smoothing process (errors average out), differentiation is an amplifying process (noise is amplified)**. This is the key to understanding numerical differentiation.

From the Taylor expansion $f(x+h)=f(x)+hf^\prime+\dfrac{h^2}{2}f^{\prime\prime}+\cdots$ we obtain:

- forward difference: $f^\prime(x)\approx\dfrac{f(x+h)-f(x)}{h}$, truncation error $-\dfrac h2f^{\prime\prime}(\xi)$, first order;
- backward difference: $f^\prime(x)\approx\dfrac{f(x)-f(x-h)}{h}$, also first order;
- central difference: $f^\prime(x)\approx\dfrac{f(x+h)-f(x-h)}{2h}$, truncation error $-\dfrac{h^2}{6}f^{\prime\prime\prime}(\xi)$, second order.

The central difference is two orders better (rather than one) again because of symmetry: the even-order terms in the expansion cancel. The second derivative uses

$$f^{\prime\prime}(x)\approx\frac{f(x+h)-2f(x)+f(x-h)}{h^2},\qquad E=-\frac{h^2}{12}f^{(4)}(\xi)$$

which is exactly the basic brick for discretising differential equations into difference equations (see Chapter 5).

**The step-size dilemma.** The total error of the central difference consists of a truncation part and a rounding part:

$$E(h)\approx\frac{h^2}{6}|f^{\prime\prime\prime}|+\frac{u\,|f|}{h}$$

The second term comes from the cancellation when subtracting two nearby function values (the numerator is about $2h|f^\prime|$, whose rounding error is about $u|f|$; dividing by $2h$ gives $\dfrac{u|f|}{2h}$, of order $\dfrac{u|f|}{h}$). Setting the derivative to zero:

$$h_{\mathrm{opt}}=\left(\frac{3u|f|}{|f^{\prime\prime\prime}|}\right)^{1/3}\approx6.7\times10^{-6}\quad(\text{double precision, }|f|\sim|f^{\prime\prime\prime}|\sim1)$$

and the corresponding best accuracy is only of order $10^{-10}$—**doing numerical differentiation with sixteen digits of machine precision leaves at most ten**. This confirms from another angle the conclusion of Chapter 1: differentiation is an ill-conditioned operation whose condition number diverges as $1/h$. If the data themselves carry experimental noise $\sigma$, the optimal step grows further to $h_{\mathrm{opt}}\sim\left(\dfrac{\sigma}{|f^{\prime\prime\prime}|}\right)^{1/3}$; when handling experimental data, smooth or fit first, then differentiate.

## 5. Worked Examples

### Example 1 (basic: trapezoid, Simpson and one extrapolation)

Problem: Compute $I=\displaystyle\int_0^1 e^{-x^2}dx$, compare the accuracy of the composite trapezoid rule ($h=0.5$ and $h=0.25$) with the composite Simpson rule ($h=0.25$), and verify the extrapolation formula.

Solution: Function values (six digits): $f(0)=1$, $f(0.25)=0.939413$, $f(0.5)=0.778801$, $f(0.75)=0.569783$, $f(1)=0.367879$.

Composite trapezoid with $h=0.5$ ($n=2$):

$$T_1=\frac{0.5}{2}\left[1+2(0.778801)+0.367879\right]=0.731370$$

Composite trapezoid with $h=0.25$ ($n=4$):

$$T_2=\frac{0.25}{2}\left[1+2(0.939413+0.778801+0.569783)+0.367879\right]=0.742984$$

Composite Simpson with $h=0.25$ ($n=4$):

$$S_2=\frac{0.25}{3}\left[1+4(0.939413+0.569783)+2(0.778801)+0.367879\right]=0.746855$$

The true value is $I=0.746824$. The errors are $-1.545\times10^{-2}$, $-3.840\times10^{-3}$ and $+3.1\times10^{-5}$ respectively. The ratio of the two trapezoid errors is $4.02\approx2^2$, confirming $O(h^2)$; Simpson's rule uses the same five function values yet presses the error below one hundredth of the trapezoid's, confirming $O(h^4)$.

Now check with extrapolation:

$$\frac{4T_2-T_1}{3}=\frac{4\times0.742984-0.731370}{3}=0.746855$$

in complete agreement with the directly computed Simpson value $S_2$ (apart from last-digit rounding). This shows that **Simpson's rule is exactly one Richardson extrapolation of the trapezoid rule**, and the Romberg method simply uses this coincidence repeatedly.

### Example 2 (advanced: choosing the step for numerical differentiation)

Problem: Use the central difference to compute the derivative of $f(x)=\sin x$ at $x=1$, comparing $h=0.1$, $h=0.01$ and $h=10^{-6}$.

Solution: The true value is $f^\prime(1)=\cos1=0.5403023$.

$h=0.1$: $\dfrac{\sin1.1-\sin0.9}{0.2}=\dfrac{0.891207-0.783327}{0.2}=0.539402$, error $-9.0\times10^{-4}$;
$h=0.01$: error about $-9.0\times10^{-6}$ (a hundredfold reduction, exactly the $h^2$ order);
$h=10^{-6}$: the truncation error is about $9\times10^{-13}$, but the two $\sin$ values already agree to the sixth digit, so the subtraction loses about 6 significant digits; the rounding error $\dfrac{u}{h}\approx\dfrac{10^{-16}}{10^{-6}}=10^{-10}$ takes over, and the actual accuracy is only of order $10^{-10}$.

The theoretical optimal step is $h_{\mathrm{opt}}=\left(\dfrac{3u|f|}{|f^{\prime\prime\prime}|}\right)^{1/3}=\left(3\times10^{-16}\dfrac{\sin1}{\cos1}\right)^{1/3}\approx6.6\times10^{-6}$, at which the total error is about $10^{-10}$. **Conclusion: smaller $h$ is not better; if higher accuracy is needed, use extrapolation ($\dfrac{4D_{h/2}-D_h}{3}$ gives fourth order), analytic differentiation, or automatic differentiation.**

## 6. Common Errors and Pitfalls

1. **Believing the smaller the step the better**. This is especially visible in numerical differentiation: the total error $E(h)=C_1h^p+\dfrac{C_2u}{h}$ has a minimum, and beyond the optimal step the accuracy deteriorates rapidly.
2. **Ignoring singularities of the integrand**. For $\int_0^1 x^{-1/2}dx$ the derivative diverges at the endpoint and the error orders of the trapezoid and Simpson rules all fail; first make a change of variable (such as $x=t^2$) to remove the singularity, or use Gauss–Jacobi quadrature designed for endpoint singularities.
3. **Using an odd number of subintervals with composite Simpson**. The formula requires an even number of subintervals; if $n$ is odd, the last panel must be handled by the trapezoid rule or merged with its neighbour.
4. **Applying ordinary quadrature to an oscillatory integrand**. $\int_0^{100}\sin(100x)f(x)dx$ needs at least 8–10 points per wavelength; the grid must be set by the oscillation frequency, not the interval length. Use Filon's method or change variables first.
5. **Ignoring truncation of an infinite interval**. For $\int_0^\infty$ first estimate the tail contribution: if the integrand decays exponentially, truncate where the tail beyond $R$ is below tolerance; for algebraic decay, substitute $x=\dfrac{t}{1-t}$ to map to a finite interval.
6. **Treating extrapolation as a panacea**. Richardson extrapolation requires a clean asymptotic expansion in $h^2,h^4,\dots$; if the integrand has discontinuities, cusps or boundary layers the expansion fails and extrapolation amplifies the error instead.
7. **Using tensor grids for high-dimensional integrals**. Above three dimensions, 100 points per direction already means $10^6$ evaluations, and six dimensions means $10^{12}$; high-dimensional problems must switch to Monte Carlo (see Chapter 6) or sparse grids.
8. **Applying numerical differentiation to noisy experimental data**. Smooth first (Savitzky–Golay filtering) or fit by least squares, then differentiate the fitted curve; direct differencing amplifies the noise by a factor $1/h$.
9. **Forgetting to check convergence**. The most practical verification is to halve $h$ and recompute, checking that the error falls at the theoretical order (a factor of 4 for the trapezoid rule, 16 for Simpson); if not, the code or the assumptions are wrong.

## 7. Summary and Mnemonics

- The trapezoid rule has degree of precision 1 and error $O(h^2)$; Simpson's rule has degree of precision 3 and error $O(h^4)$.
- Even-order Newton–Cotes formulas gain one extra order of precision from symmetry.
- The global error of composite quadrature is one order lower than the per-panel error: per panel $O(h^{p+1})$ → global $O(h^p)$.
- Richardson extrapolation $\dfrac{4T(h/2)-T(h)}{3}$ gives exactly the Simpson value; repeated extrapolation is the Romberg algorithm, with recurrence $R_{k,j}=R_{k,j-1}+\dfrac{R_{k,j-1}-R_{k-1,j-1}}{4^j-1}$.
- Numerical differentiation is an ill-conditioned operation: central-difference truncation is $O(h^2)$ and rounding $O(u/h)$, the optimal step is $h\sim u^{1/3}\approx10^{-5}$, and the best accuracy is about $10^{-10}$.
- Integration smooths and differentiation amplifies; the two treat noise in opposite ways.
- Do not use tensor grids for high-dimensional integrals; hand them to Monte Carlo.

**Mnemonic: trapezoid second order, Simpson fourth; one extrapolation layer lifts two orders; differentiation fears a small step, and once noise is amplified you are blind.**`,
    keyPoints: [
      'The trapezoid rule has degree of precision 1 and error O(h^2); Simpson\u2019s rule has degree of precision 3 and error O(h^4)',
      'The global error of composite quadrature is one order lower than the per-panel error: per panel O(h^{p+1}) corresponds to global O(h^p)',
      'Richardson extrapolation (4T(h/2)−T(h))/3 is exactly the composite Simpson value; repeated extrapolation is the Romberg algorithm',
      'Romberg recurrence R_{k,j} = R_{k,j−1} + (R_{k,j−1} − R_{k−1,j−1})/(4^j − 1)',
      'Central differences have truncation error O(h^2) but rounding error O(u/h); the optimal step is about u^{1/3} ≈ 10^{-5}',
      'Integration smooths and differentiation amplifies: for noisy data, smooth or fit before differentiating',
    ],
  },
  'ode-numerics': {
    chapter: 'Chapter 4 Numerical Solution of Ordinary Differential Equations',
    title: 'From Euler to RK4: Turning Differential Equations into Recurrences',
    summary:
      'Single-step methods turn a differential relation into a step-by-step recurrence; the order of accuracy tells you how the error falls with the step size, and the stability region tells you how large the step may be.',
    content: String.raw`

Newton's second law written out is a second-order ODE: $m\ddot x=F(x,\dot x,t)$. As soon as the force is even slightly nonlinear—the $\sin\theta$ of a pendulum, the air drag $-\alpha v|v|$, the spring $F=-kx-\beta x^3$—the analytic solution disappears. The three-body problem, the Lorenz attractor, laser rate equations, RC and RLC transients, nuclear decay chains, colliding galaxies—these account for the vast majority of the problems physics students meet.

More importantly, what we care about in experiments is often **not a formula but a trajectory**: how long does a damped oscillator take to stop? When does the pendulum angle exceed the critical value? A numerical solution gives the $t$–$x$ curve directly, more intuitive than any closed expression.

The standard form of an initial value problem is

$$\frac{dy}{dt}=f(t,y),\qquad y(t_0)=y_0$$

The idea of a numerical solution is utterly plain: given $y_n\approx y(t_n)$, how do we use information from $f$ to predict $y_{n+1}\approx y(t_{n+1})$? From the Taylor expansion

$$y(t_{n+1})=y(t_n)+hy^\prime(t_n)+\frac{h^2}{2}y^{\prime\prime}(t_n)+\cdots$$

Keeping only the first two terms and replacing the derivative by the known function ($y^\prime=f$) gives

$$y_{n+1}=y_n+h\,f(t_n,y_n)$$

This is the **explicit Euler method**. It is the "Hello World" of all ODE numerics: simple, easy to understand, low in accuracy, poor in stability. The task of this chapter is to see where its shortcomings come from and how to patch them up step by step into the fourth-order Runge–Kutta method (RK4) most used in engineering.

Here is a teaser: halve the step size and by how much does Euler's error shrink? By half (first order); RK4's shrinks to one sixteenth (fourth order). What does this "order" really mean, and why are stability and accuracy discussed separately?

## 2. From Euler to RK4: Schemes and Derivations

**Algorithm 1 (explicit Euler)**

$$y_{n+1}=y_n+h f(t_n,y_n)$$

Geometrically it takes a step along the tangent at $t_n$. The local truncation error (assuming $y_n=y(t_n)$ exactly) is

$$T_{n+1}=y(t_{n+1})-y(t_n)-hf(t_n,y(t_n))=\frac{h^2}{2}y^{\prime\prime}(\xi)=O(h^2)$$

**Algorithm 2 (implicit Euler and the trapezoidal method)** If the derivative is taken at the right endpoint:

$$\text{implicit Euler:}\ y_{n+1}=y_n+hf(t_{n+1},y_{n+1})$$

$$\text{trapezoidal:}\ y_{n+1}=y_n+\frac h2\big[f(t_n,y_n)+f(t_{n+1},y_{n+1})\big]$$

Both are implicit schemes and require solving an equation at each step (usually by Newton iteration), but in exchange the stability is far better. The trapezoidal method has local error $O(h^3)$ and is globally second order.

**Algorithm 3 (improved Euler / Heun predictor–corrector)** To avoid solving equations, first predict with Euler and then correct with the trapezoid formula:

$$\tilde y_{n+1}=y_n+hf(t_n,y_n)$$

$$y_{n+1}=y_n+\frac h2\big[f(t_n,y_n)+f(t_{n+1},\tilde y_{n+1})\big]$$

This is a second-order explicit method with two function evaluations per step, an excellent entry-level choice in terms of "accuracy per cost".

**The Runge–Kutta idea.** A Taylor expansion needs $y^\prime,y^{\prime\prime},\dots$, and higher derivatives are both hard to obtain and expensive. The genius of Runge and Kutta was to **reproduce the higher-order terms of the Taylor expansion equivalently by a linear combination of function values at several points**. The general form is

$$y_{n+1}=y_n+h\sum_{i=1}^{s}b_i k_i,\qquad k_i=f\Big(t_n+c_ih,\ y_n+h\sum_{j<i}a_{ij}k_j\Big)$$

where the coefficients satisfy the order conditions (encoded in the Butcher tableau). The most classic fourth-order scheme ($s=4$) is

$$k_1=f(t_n,y_n)$$

$$k_2=f\Big(t_n+\frac h2,\ y_n+\frac h2k_1\Big),\qquad k_3=f\Big(t_n+\frac h2,\ y_n+\frac h2k_2\Big)$$

$$k_4=f\big(t_n+h,\ y_n+hk_3\big)$$

$$y_{n+1}=y_n+\frac h6\big(k_1+2k_2+2k_3+k_4\big)$$

The weights $1:2:2:1$ recall Simpson's rule, and this is no coincidence: when $f$ depends only on $t$, RK4 reduces exactly to Simpson's rule for integration. Its local truncation error is $O(h^5)$ and its global error $O(h^4)$, with four function evaluations per step.

## 3. Local Truncation Error, Global Order and Stability

**Definition 1 (local truncation error and global error)** Assuming the previous step is exact ($y_n=y(t_n)$), the error produced by one step $T_{n+1}$ is the local truncation error; the error accumulated from $t_0$ to $t_N$, $e_N=y_N-y(t_N)$, is the global error. They are related by

$$|e_N|\approx\sum_{k}|T_k|\ \Longrightarrow\ \text{local } O(h^{p+1})\ \Rightarrow\ \text{global } O(h^{p})$$

because the number of steps is $N\sim\dfrac{T}{h}$, and the accumulation drops the order by one. $p$ is called the **order** of the method. Saying "RK4 is fourth order" refers to the global error $O(h^4)$.

**Definition 2 (consistency and convergence)** If $\dfrac{T_{n+1}}{h}\to0$ as $h\to0$ the scheme is consistent; if the numerical solution tends to the true solution as $h\to0$ it is convergent. The fundamental theorem: **consistency + zero-stability $\Rightarrow$ convergence**, and the order of convergence equals the order of the scheme.

**Stability analysis (test equation)** Take the linear test equation

$$y^\prime=\lambda y,\qquad \lambda\in\mathbb{C},\ \mathrm{Re}\,\lambda<0$$

Applied to it, any method reduces to $y_{n+1}=G(z)y_n$ with $z=h\lambda$ and $G$ the amplification factor. The condition for the numerical solution not to diverge is

$$|G(z)|\le1$$

The region of the $z$ plane satisfying this is the **region of absolute stability**.

- Explicit Euler: $G(z)=1+z$, with stability region the unit disc centred at $-1$. For real $\lambda<0$ it requires $h\le\dfrac{2}{|\lambda|}$.
- Implicit Euler: $G(z)=\dfrac{1}{1-z}$, with stability region $|z-1|\ge1$, containing the entire left half-plane—called **A-stable**, so the step is not restricted by stability.
- Trapezoidal: $G(z)=\dfrac{1+z/2}{1-z/2}$; $|G|\le1$ in the left half-plane, also A-stable; but as $z\to-\infty$, $G\to-1$ and the decay is extremely slow (not L-stable).
- RK4: $G(z)=1+z+\dfrac{z^2}{2}+\dfrac{z^3}{6}+\dfrac{z^4}{24}$, with stability interval on the real axis about $[-2.785,0]$.

**Stability and accuracy are two different rulers.** The order only guarantees that the error falls fast as $h\to0$; stability decides whether, at a given $h$, the error grows exponentially. A high-order method still blows up at a large step. Physically this means: **the step must simultaneously satisfy "resolving the dynamics" ($h$ smaller than the fastest timescale) and "lying inside the stability region".**

**Stiff problems.** If a system contains timescales of wildly different magnitude (such as $\lambda_1=-1$, $\lambda_2=-10^6$), an explicit method is forced to take $h<2\times10^{-6}$ to remain stable, while physically only the slow scale must be tracked and a step of $10^{-2}$ would do. The total number of steps is then held hostage by the fastest scale and the computational cost explodes. The criterion is the stiffness ratio $\dfrac{\max|\mathrm{Re}\lambda|}{\min|\mathrm{Re}\lambda|}\gg1$. Stiff problems should use implicit methods (implicit Euler, BDF, implicit RK), trading the cost of solving an equation per step for unconditional stability.

**A practical way to identify stiffness.** Computing all eigenvalues of the Jacobian for a large system is itself too expensive, so engineering practice relies on three heuristic signals. First, an explicit method still diverges at a very small step, or the error estimate demands a step far smaller than the timescale of physical change. Second, there is a clearly separated range of timescales: in chemical kinetics the rate constants of fast and slow reactions differ by $10^6$; in circuits the $RC$ constant of stray capacitance differs from the signal period by several orders; an oscillator made of a stiff spring and a heavy mass contains both very fast and very slow vibrations. Third, the solution curve has a typical shape—a brief fast transient followed by a long smooth stretch—so that if the step is still locked to the transient scale, most of the computational effort is wasted. Once stiffness is confirmed, switch to an implicit method (BDF, Radau, implicit RK); implicit methods solve a nonlinear system at each step, usually by Newton iteration, whose Jacobian may come from a sparse analytic expression or finite differences, with a "frozen Jacobian" strategy reusing one LU factorisation over several steps to amortise the $O(n^3)$ cost.

## 4. Damped Oscillation: A Complete Physical Case

Consider the damped harmonic oscillator

$$m\ddot x+c\dot x+kx=0,\qquad x(0)=x_0,\ \dot x(0)=v_0$$

Convert to a first-order system: let $y=(x,v)^\mathsf{T}$, then

$$\frac{d}{dt}\begin{pmatrix}x\\v\end{pmatrix}=\begin{pmatrix}v\\ -\dfrac{c}{m}v-\dfrac{k}{m}x\end{pmatrix}=\begin{pmatrix}0&1\\ -\omega_0^2&-2\gamma\end{pmatrix}\begin{pmatrix}x\\v\end{pmatrix}$$

where $\omega_0=\sqrt{k/m}$ is the natural frequency and $\gamma=\dfrac{c}{2m}$ the damping rate. The eigenvalues of the coefficient matrix are

$$\lambda_{\pm}=-\gamma\pm\sqrt{\gamma^2-\omega_0^2}$$

For underdamping ($\gamma<\omega_0$), $\lambda_{\pm}=-\gamma\pm i\omega_d$ with $\omega_d=\sqrt{\omega_0^2-\gamma^2}$, and the analytic solution is

$$x(t)=e^{-\gamma t}\left[x_0\cos\omega_dt+\frac{v_0+\gamma x_0}{\omega_d}\sin\omega_dt\right]$$

When solving this system numerically the step is subject to three constraints:

1. **Accuracy constraint**: at least 20–30 points per period, i.e. $h\lesssim\dfrac{2\pi}{20\,\omega_d}\approx\dfrac{0.3}{\omega_d}$; under RK4 the phase error per step is about $\dfrac{(h\omega_d)^5}{120}$, so $h\omega_d\approx0.2$ already gives a single-step error of order $10^{-7}$.
2. **Stability constraint**: substitute $\lambda_+$ into the stability region. For explicit Euler the condition $|1+h\lambda_+|\le1$ expands to $(1-\gamma h)^2+(\omega_dh)^2\le1$, i.e.

$$h\le\frac{2\gamma}{\gamma^2+\omega_d^2}=\frac{2\gamma}{\omega_0^2}$$

Note that this upper bound is proportional to $\gamma$: the weaker the damping, the smaller the stable step for explicit Euler (with no damping, $\gamma=0$, Euler's method is always marginally stable and the amplitude slowly diverges). This is the fundamental reason explicit Euler is unsuited to conservative systems.
3. **Physical fidelity constraint**: the numerical damping should approximate the real damping. Euler's method changes the energy by $|1+h\lambda|^2$ each step, inconsistent with the true decay $e^{2\mathrm{Re}\lambda h}$, so long integrations show "spurious damping" or "spurious growth". For long simulations (such as orbit integration) prefer symplectic integrators, which preserve phase-space volume exactly and keep the energy oscillating within bounds.

**Unified treatment of higher-order equations and systems.** Any $m$-th order equation $y^{(m)}=f(t,y,y^\prime,\dots,y^{(m-1)})$ can be reduced to a first-order system by introducing $y_1=y,\ y_2=y^\prime,\ \dots,\ y_m=y^{(m-1)}$:

$$\dot y_1=y_2,\quad\dot y_2=y_3,\ \dots,\ \dot y_m=f(t,y_1,\dots,y_m)$$

Hence every single-step method needs to be written only once for first-order systems and is then universally applicable—which is why standard solver libraries (such as odeint, solve_ivp) accept only the first-order form. The second-order system most common in physics, $\ddot x=F(x,\dot x,t)$, becomes the state vector $(x,\dot x)$; $N$ particles give a $2N$-dimensional system.

For such second-order systems there is a special class of schemes worth knowing—**symplectic integrators**. The velocity Verlet scheme is

$$x_{n+1}=x_n+v_nh+\frac12a_nh^2,\qquad v_{n+1}=v_n+\frac12\big(a_n+a_{n+1}\big)h^2$$

It is only second order (far below RK4's fourth), yet it reigns supreme in molecular dynamics. The reason is that it preserves phase-space volume (symplectic) and the energy error only oscillates within bounds over long integrations instead of drifting monotonically; RK4, though far more accurate per step, lets the energy drift slowly and monotonically, so after millions of steps the trajectory is long distorted. **Single-step accuracy and long-term fidelity are not the same thing**: the former is a local property, the latter a geometric one. The first principle of choosing a method is to ask yourself: do I care about the numbers within a few dozen steps, or the statistical distribution after millions?

**Adaptive step size.** Practical ODE solvers do not use a fixed step. The simplest strategy is step-halving comparison: take one step with $h$ and one with $h/2$; from the error behaviour of a $p$-th order method,

$$\mathrm{err}\approx\frac{|y_{h}-y_{h/2}|}{2^p-1}$$

If err exceeds the tolerance, halve and retry; if it is below a fraction of the tolerance, enlarge the step. Modern solvers (Dormand–Prince RK45, Radau, BDF) use embedded formulas that produce both $p$-th and $(p+1)$-th order results from the same set of $k_i$, giving an error estimate at almost no extra cost. Physical simulations should also monitor conserved quantities (energy, momentum, normalisation of probability) as an independent check of correctness.

## 5. Worked Examples

### Example 1 (basic: accuracy of Euler versus improved Euler)

Problem: Solve $y^\prime=-y$, $y(0)=1$ with $h=0.1$, computing two steps by explicit Euler and by improved Euler respectively, and compare with the true values.

Solution: The true values are $y(0.1)=e^{-0.1}=0.904837$ and $y(0.2)=e^{-0.2}=0.818731$.

Explicit Euler ($G=0.9$):

$$y_1=1+0.1(-1)=0.9,\qquad y_2=0.9+0.1(-0.9)=0.81$$

The errors are $-4.84\times10^{-3}$ and $-8.73\times10^{-3}$; the error accumulates roughly linearly with the number of steps, a direct expression of the first-order result $e_N\approx N\,O(h^2)=\dfrac{T}{h}O(h^2)=O(h)$.

Improved Euler (Heun) at the same step size:

$$\tilde y_1=1+0.1(-1)=0.9,\qquad y_1=1+\frac{0.1}{2}\big[(-1)+(-0.9)\big]=0.905$$

$$\tilde y_2=0.905+0.1(-0.905)=0.8145,\qquad y_2=0.905+\frac{0.1}{2}\big[(-0.905)+(-0.8145)\big]=0.819025$$

The errors are $+1.63\times10^{-4}$ and $+2.94\times10^{-4}$, about 30 times smaller than explicit Euler's. The lesson: **one extra function evaluation (two instead of one) buys a whole order of accuracy, an extremely good bargain.**

### Example 2 (advanced: one RK4 step for the damped oscillator and the stability limit)

Problem: Take $m=1,\ c=0.4,\ k=4$, i.e. $\ddot x=-0.4\dot x-4x$, with $x(0)=1,\ \dot x(0)=0$. Take one RK4 step with $h=0.1$ and compare with the analytic solution and with explicit Euler.

Solution: The system is $\dot x=v$, $\dot v=-0.4v-4x$. The four slopes (each a two-vector $(k^{(x)},k^{(v)})$):

$$k_1=(0,\ -4)$$

$$k_2=\big(-0.2,\ -0.4(-0.2)-4(1)\big)=(-0.2,\ -3.92)$$

$$k_3=\big(-0.196,\ -0.4(-0.196)-4(0.99)\big)=(-0.196,\ -3.8816)$$

$$k_4=\big(-0.38816,\ -0.4(-0.38816)-4(0.9804)\big)=(-0.38816,\ -3.766336)$$

$$x_1=1+\frac{0.1}{6}\big[0+2(-0.2)+2(-0.196)-0.38816\big]=0.9803307$$

$$v_1=0+\frac{0.1}{6}\big[-4+2(-3.92)+2(-3.8816)-3.766336\big]=-0.3894923$$

Analytic solution: $\gamma=0.2$, $\omega_d=\sqrt{4-0.04}=1.98997$,

$$x(t)=e^{-0.2t}\big[\cos(1.98997t)+0.100504\sin(1.98997t)\big]$$

Substituting $t=0.1$ gives $x=0.9803292$, $v=-0.389492$. RK4's error is about $1.5\times10^{-6}$, while explicit Euler's ($x_1=1,\ v_1=-0.4$) is about $2\times10^{-2}$—**four orders of magnitude apart**.

Stability check: the eigenvalues are $\lambda_{\pm}=-0.2\pm1.98997i$. Explicit Euler requires $h\le\dfrac{2\gamma}{\omega_0^2}=\dfrac{0.4}{4}=0.1$—the $h=0.1$ of this problem sits exactly at the critical point, and a slightly larger step diverges; RK4's stability boundary is about $h|\lambda|\le2.785$, i.e. $h\le1.39$, entirely unconstrained. The contrast vividly shows that **stability limits explicit Euler, while accuracy sets the actual upper bound on the step.**

## 6. Common Errors and Pitfalls

1. **Confusing local and global orders of error**. A $p$-th order method has local truncation error $O(h^{p+1})$ and global error $O(h^p)$; saying "RK4's error is $h^4$" refers to the global error.
2. **Blaming a program bug when a too-large step diverges**. First check whether $h\lambda$ lies in the stability region, then check the code.
3. **Using explicit methods to force through a stiff equation**. The step is locked by the fastest scale and the number of steps explodes; switch to an implicit method (BDF, Radau).
4. **The inner iteration of an implicit method not converging**. The Newton iteration at each step must have a convergence criterion, or the error introduced may exceed the truncation error of the scheme itself.
5. **Judging accuracy from a single step**. Always run a convergence test with a halved step, checking that the error ratio approaches $2^p$.
6. **Ignoring monitoring of conserved quantities**. If the energy drifts monotonically in a long integration (orbits, molecular dynamics), the scheme is unsuitable; conservative systems should use a symplectic integrator (such as velocity Verlet), which keeps the energy oscillating within bounds rather than drifting.
7. **Treating high-order methods as a panacea**. High order only guarantees asymptotic accuracy as $h\to0$; for a fixed $h$, the stability region and the cost per step matter just as much. For non-stiff, moderate-accuracy needs, RK2/RK3 are often more economical than RK4.
8. **Ignoring stability in adaptive stepping**. The error estimate reflects only local accuracy; for stiff problems the step is also constrained by stability, so minimum and maximum step-change rates should be set.
9. **Applying first-order formulas directly to second-order equations**. First write $\ddot x=F$ as the two-dimensional system $\dot x=v,\ \dot v=F$; every component of the state vector must take part in the computation of all $k_i$.

## 7. Summary and Mnemonics

- Single-step methods turn the ODE into a recurrence; explicit Euler is first order, improved Euler second, RK4 fourth.
- The local truncation error is one order higher than the global error: local $O(h^{p+1})$ corresponds to global $O(h^p)$.
- Stability looks at the amplification factor: explicit Euler $G=1+h\lambda$ (requiring $h\le2/|\lambda|$), implicit Euler $G=(1-h\lambda)^{-1}$ (A-stable).
- RK4 uses four $f$ evaluations per step with weights $1:2:2:1$, and is the default choice for non-stiff problems.
- For the damped oscillator the eigenvalues $\lambda=-\gamma\pm i\omega_d$ determine both the accuracy requirement and the stable step; explicit Euler's stable step $h\le2\gamma/\omega_0^2$ tends to zero as the damping weakens.
- Use implicit methods when the stiffness ratio is $\gg1$; use symplectic integrators for long-time conservative systems.
- Adaptive stepping uses embedded RK or step halving to estimate the error: $\mathrm{err}\approx|y_h-y_{h/2}|/(2^p-1)$.

**Mnemonic: Euler takes one straight step, RK4 probes four ways; switch to implicit for stiffness, keep to the symplectic path for long runs.**`,
    keyPoints: [
      'Local truncation error O(h^{p+1}) corresponds to global error O(h^p); the order drops by one because the number of steps is proportional to 1/h',
      'RK4 weights 1:2:2:1, four f evaluations per step, globally fourth-order accurate',
      'Explicit Euler amplification factor G = 1 + hλ; for real negative λ it requires h ≤ 2/|λ|',
      'Implicit Euler G = (1−hλ)^{-1} is A-stable and suits stiff equations',
      'Damped oscillator eigenvalues λ = −γ ± iω_d; explicit Euler stable step h ≤ 2γ/ω_0^2',
      'Adaptive stepping uses embedded RK or step halving: err ≈ |y_h − y_{h/2}|/(2^p − 1)',
    ],
  },
  'pde-numerics': {
    chapter: 'Chapter 5 Numerical Solution of Partial Differential Equations',
    title: 'Finite Differences: Laying Continuous Fields onto a Grid',
    summary:
      'Replace derivatives by difference quotients and the PDE becomes an algebraic recurrence; the price is that every step must answer the same question: is this scheme stable?',
    content: String.raw`

In an ODE the unknown is a function of time $y(t)$—a single curve; in a PDE the unknown is a field $u(x,t)$—a whole surface. Heat conduction, diffusion, string vibration, electromagnetic waves, the Schrödinger equation, fluid mechanics: almost every "field" in physics is governed by a PDE.

Raising the dimension brings two fundamental difficulties. First, **the data explode**: 100 grid points on a one-dimensional interval means 100 unknowns, a two-dimensional $100\times100$ grid means ten thousand, and three dimensions adds two more orders of magnitude. Second, **entirely new failure modes appear**: an ODE solution of insufficient accuracy merely gives an inaccurate result, but if a PDE scheme is unstable the error grows exponentially within a few dozen steps and the screen fills with garbage of order $10^{30}$—this is not an accuracy problem, the scheme itself is disqualified.

The finite-difference method is the most straightforward and most beginner-friendly discretisation: replace the continuous $(x,t)$ by grid points $(x_j,t^n)$ and derivatives by difference quotients, so the PDE becomes an algebraic relation at each grid point, and one marches upward layer by layer from the initial values.

Here is a teaser: for the heat equation, does shrinking the time step make the result more accurate? The answer is that **beyond a certain threshold, shrinking the time step makes the computation diverge immediately**. That threshold is the famous CFL (Courant–Friedrichs–Lewy) stability condition, the protagonist of this chapter.

## 2. Difference Schemes: From Derivatives to Difference Quotients

**Grid and notation.** Take a spatial step $\Delta x$ and a time step $\Delta t$, grid points $x_j=j\Delta x$, $t^n=n\Delta t$, and write $u_j^n\approx u(x_j,t^n)$.

Taylor expansion gives three basic difference quotients (consistent with Chapter 3):

$$\text{forward:}\ \frac{\partial u}{\partial t}\bigg|_j^n=\frac{u_j^{n+1}-u_j^n}{\Delta t}+O(\Delta t)$$

$$\text{backward:}\ \frac{\partial u}{\partial t}\bigg|_j^n=\frac{u_j^{n}-u_j^{n-1}}{\Delta t}+O(\Delta t)$$

$$\text{central:}\ \frac{\partial^2 u}{\partial x^2}\bigg|_j^n=\frac{u_{j+1}^n-2u_j^n+u_{j-1}^n}{\Delta x^2}+O(\Delta x^2)$$

The central difference of the second derivative has error $-\dfrac{\Delta x^2}{12}u_{xxxx}$ and is second-order accurate; fourth- and sixth-order compact schemes can be obtained from wider stencils.

**Definition 1 (consistency)** If the truncation error of the difference equation tends to zero as $\Delta t,\Delta x\to0$, the scheme is consistent with the original equation. The leading term of the truncation error gives the order of accuracy: the FTCS scheme for the heat equation is $O(\Delta t)+O(\Delta x^2)$.

**Definition 2 (stability)** If perturbations of the numerical solution due to the initial data (and to rounding errors) remain bounded at any fixed time, the scheme is stable. The most common analytical tool is **von Neumann (Fourier) stability analysis**: expand the error in Fourier modes

$$\varepsilon_j^n=\xi^n e^{ikj\Delta x}$$

substitute into the difference scheme to obtain the amplification factor $\xi(k)$; the necessary and sufficient condition for stability is

$$|\xi(k)|\le1\quad\text{for all wavenumbers }k$$

**Theorem (Lax equivalence theorem)** For a well-posed linear initial value problem, **consistency + stability $\iff$ convergence**. This theorem turns the vague question "is the scheme good?" into two testable conditions: consistency needs only a Taylor expansion, stability only the computation of $|\xi|$. It is the pivot of the whole theory of finite differences.

## 3. The Heat Equation: Explicit, Implicit and Stability

The one-dimensional heat (diffusion) equation is

$$\frac{\partial u}{\partial t}=\alpha\frac{\partial^2u}{\partial x^2},\qquad \alpha>0$$

**Scheme 1 (FTCS, explicit)** Forward in time, central in space:

$$\frac{u_j^{n+1}-u_j^n}{\Delta t}=\alpha\frac{u_{j+1}^n-2u_j^n+u_{j-1}^n}{\Delta x^2}$$

Rearranged into a recurrence:

$$u_j^{n+1}=u_j^n+r\big(u_{j+1}^n-2u_j^n+u_{j-1}^n\big),\qquad r=\frac{\alpha\Delta t}{\Delta x^2}$$

$r$ is called the **grid Fourier number** (the Courant number of the diffusive type); it is the only dimensionless parameter determining stability.

Substituting $\varepsilon_j^n=\xi^ne^{ikj\Delta x}$:

$$\xi=1+r\big(e^{ik\Delta x}-2+e^{-ik\Delta x}\big)=1-4r\sin^2\frac{k\Delta x}{2}$$

We need $|\xi|\le1$ for all $k$. Since $\xi$ decreases monotonically with $r$, the most dangerous case is $\sin^2=1$ (the highest-frequency mode, the sawtooth of wavelength $2\Delta x$), where $\xi=1-4r$ and the condition becomes

$$-1\le1-4r\le1\ \Longrightarrow\ r\le\frac12$$

that is,

$$\Delta t\le\frac{\Delta x^2}{2\alpha}$$

This is the CFL condition for the explicit heat scheme. Its physical meaning is intriguing: **the time step must be proportional to the square of the space step**. To improve the spatial resolution tenfold ($\Delta x$ becomes $1/10$), the number of time steps must increase a hundredfold and the total cost a thousandfold. This "quadratic penalty" is the fatal weakness of explicit methods for parabolic equations.

**Scheme 2 (BTCS, implicit)** Backward difference in time, spatial derivative at level $n+1$:

$$u_j^{n+1}-r\big(u_{j+1}^{n+1}-2u_j^{n+1}+u_{j-1}^{n+1}\big)=u_j^n$$

The amplification factor is $\xi=\dfrac{1}{1+4r\sin^2(k\Delta x/2)}$, which satisfies $|\xi|<1$ for any $r>0$, so the scheme is **unconditionally stable**. The price is solving a tridiagonal linear system at each step:

$$-r\,u_{j-1}^{n+1}+(1+2r)u_j^{n+1}-r\,u_{j+1}^{n+1}=u_j^n$$

The Thomas algorithm (the chasing method) needs only $O(N)$ operations, a very good bargain. In two dimensions, ADI (alternating direction implicit) splitting reduces the two-dimensional implicit problem to two one-dimensional tridiagonal solves.

**Scheme 3 (Crank–Nicolson)** Take the time midpoint, with the spatial derivative the average over the two adjacent levels:

$$\frac{u_j^{n+1}-u_j^n}{\Delta t}=\frac{\alpha}{2}\left[\frac{u_{j+1}^{n+1}-2u_j^{n+1}+u_{j-1}^{n+1}}{\Delta x^2}+\frac{u_{j+1}^{n}-2u_j^{n}+u_{j-1}^{n}}{\Delta x^2}\right]$$

The truncation error is $O(\Delta t^2)+O(\Delta x^2)$, one order better in time, and the scheme is unconditionally stable. But its amplification factor

$$\xi=\frac{1-2r\sin^2(k\Delta x/2)}{1+2r\sin^2(k\Delta x/2)}$$

tends to $-1$ for large $r$ with $\sin^2\approx1$, so high-frequency components decay slowly while alternating in sign, producing non-physical oscillations (since it is A-stable but not L-stable). The engineering compromise is a moderate $r$ (such as $r\lesssim5$), or a few backward-Euler steps first to "iron out" the high frequencies.

**Quantitative comparison of accuracy and stability.** The truncation error of the FTCS scheme can be read term by term from the Taylor expansion: the forward time difference contributes $\dfrac{\Delta t}{2}u_{tt}$ and the central space difference $\dfrac{\alpha\Delta x^2}{12}u_{xxxx}$, so the overall accuracy is "first order in time, second in space". Reducing $\Delta x$ while keeping $r$ fixed makes $\Delta t\propto\Delta x^2$, so the time error term also falls as $\Delta x^2$ and the total error behaves as $O(\Delta x^2)$. To make the time direction second order as well, switch to Crank–Nicolson or a three-level scheme.

There is a highly instructive counterexample here: use a central difference for the time derivative too (the Richardson scheme),

$$\frac{u_j^{n+1}-u_j^{n-1}}{2\Delta t}=\alpha\frac{u_{j+1}^n-2u_j^n+u_{j-1}^n}{\Delta x^2}$$

Its truncation error is $O(\Delta t^2)+O(\Delta x^2)$—perfect consistency and higher accuracy—yet von Neumann analysis gives $\xi^2+8r s^2\xi-1=0$, one of whose roots always has modulus greater than 1: it is **unconditionally unstable** and diverges immediately however small the step. This example is the best footnote to "consistency does not equal stability", and shows why the Lax equivalence theorem must require both conditions at once. It reminds us that in constructing a difference scheme, raising the order and ensuring stability are two independent jobs, and one must never assume "higher order is necessarily better".

**Boundary conditions.** Dirichlet conditions assign values directly to the boundary grid points; Neumann conditions (adiabatic boundary $\partial u/\partial x=0$) use the ghost-point method: set $u_{-1}^n=u_1^n$, so the central difference becomes $\dfrac{u_1^n-2u_0^n+u_{-1}^n}{\Delta x^2}=\dfrac{2(u_1^n-u_0^n)}{\Delta x^2}$, preserving second order. Robin (convective) conditions are handled similarly. Poor boundary treatment is the number one cause of "stable scheme, wrong result".

## 4. The Wave Equation and the CFL Condition

The one-dimensional wave equation

$$\frac{\partial^2u}{\partial t^2}=c^2\frac{\partial^2u}{\partial x^2}$$

is discretised with a second-order central difference in time and in space:

$$\frac{u_j^{n+1}-2u_j^n+u_j^{n-1}}{\Delta t^2}=c^2\frac{u_{j+1}^n-2u_j^n+u_{j-1}^n}{\Delta x^2}$$

$$u_j^{n+1}=2u_j^n-u_j^{n-1}+\nu^2\big(u_{j+1}^n-2u_j^n+u_{j-1}^n\big),\qquad \nu=\frac{c\,\Delta t}{\Delta x}$$

$\nu$ is the **Courant number**. Substituting a Fourier mode gives

$$\xi^2-2\big(1-2\nu^2s^2\big)\xi+1=0,\qquad s^2=\sin^2\frac{k\Delta x}{2}$$

The product of the two roots is 1, so both have modulus 1 (pure oscillation, no dissipation) if and only if the discriminant is non-positive: $|1-2\nu^2s^2|\le1$, i.e. $\nu^2s^2\le1$. For the most dangerous $s^2=1$ this gives the classic CFL condition

$$\nu=\frac{c\,\Delta t}{\Delta x}\le1$$

**The physical meaning of the CFL condition (Courant–Friedrichs–Lewy in its original form)**: the domain of dependence of the numerical scheme must contain the physical domain of dependence. The value of the wave equation at $(x_j,t^{n+1})$ depends on the initial data within $x_j\pm c\Delta t$, while the explicit scheme uses only the three points $x_{j-1},x_j,x_{j+1}$, covering $x_j\pm\Delta x$. If $c\Delta t>\Delta x$, physical information travels faster than the grid can propagate it and the scheme simply "cannot see" the information that truly influences the point, so it must fail. This argument needs no Fourier analysis and applies to any hyperbolic equation; it is one of the deepest geometric insights in numerical methods.

At $\nu=1$ the scheme propagates exactly along the characteristics and the numerical solution agrees with the analytic one at the grid points (for the source-free one-dimensional wave equation); for $\nu<1$ there is slight **numerical dispersion** (different wavenumbers travel at slightly different phase velocities and the waveform gradually grows jagged); for $\nu>1$ it diverges exponentially.

The second time level comes from the initial velocity $u_t(x,0)=g(x)$:

$$u_j^1=u_j^0+\Delta t\,g(x_j)+\frac{\nu^2}{2}\big(u_{j+1}^0-2u_j^0+u_{j-1}^0\big)$$

This level must use a second-order formula, or the overall accuracy is dragged down to first order.

**Elliptic equations (Poisson's equation)** The steady problem $\nabla^2u=-\rho/\varepsilon_0$, once discretised, gives the five-point stencil

$$\frac{u_{i+1,j}+u_{i-1,j}+u_{i,j+1}+u_{i,j-1}-4u_{i,j}}{h^2}=-\frac{\rho_{i,j}}{\varepsilon_0}$$

This is a large sparse linear system ($N$ unknowns, 5 non-zeros per row), solved by direct methods (banded LU) or iterative methods (Jacobi, Gauss–Seidel, SOR, conjugate gradients, multigrid). Multigrid can solve it to the level of the discretisation error in $O(N)$ time and is the core technology for large-scale field solving.

Until all three layers of verification pass, no "reasonable-looking" curve can be trusted—the most dangerous failure of a numerical method is not a crash but a quiet, wrong answer.

## 5. Worked Examples

### Example 1 (basic: the step-size limit of the explicit heat scheme)

Problem: Solve $u_t=\alpha u_{xx}$ with the FTCS scheme, taking $\alpha=0.5$ and $\Delta x=0.1$. Which of $\Delta t=0.01$ and $\Delta t=0.02$ is stable?

Solution: The grid Fourier number is $r=\dfrac{\alpha\Delta t}{\Delta x^2}=\dfrac{0.5\,\Delta t}{0.01}=50\,\Delta t$.

$\Delta t=0.01$: $r=0.5$, exactly on the stability boundary $r\le\dfrac12$. The amplification factor of the highest-frequency mode ($\sin^2=1$) is $\xi=1-4\times0.5=-1$: it changes sign each step without growing, so the scheme is marginally stable; in practice rounding errors cause slight wobble, so $r\le0.4$ is recommended for margin.

$\Delta t=0.02$: $r=1.0$, and the highest-frequency mode has $\xi=1-4=-3$, **amplifying that mode threefold every step**. After 20 steps the amplification is $3^{20}\approx3.5\times10^9$ and the sawtooth oscillation completely swamps the solution. This is exactly the disaster caused by "harmlessly doubling the time step".

Conclusion: $\Delta t\le\dfrac{\Delta x^2}{2\alpha}=\dfrac{0.01}{1}=0.01$. To use $\Delta t=0.02$ one must switch to an implicit scheme (BTCS or Crank–Nicolson).

### Example 2 (advanced: the Courant-number criterion for the wave equation)

Problem: For the string equation $u_{tt}=c^2u_{xx}$ with $c=1$ and $\Delta x=0.1$, test the stability for $\nu=0.5$, $\nu=1$ and $\nu=1.2$, and give the corresponding $\Delta t$.

Solution: The CFL condition $\nu=\dfrac{c\Delta t}{\Delta x}\le1$ gives $\Delta t\le\dfrac{\Delta x}{c}=0.1$.

- $\nu=0.5$ ($\Delta t=0.05$): for the most dangerous mode $s^2=1$ the equation is $\xi^2-2(1-2\times0.25)\xi+1=\xi^2-\xi+1=0$, with roots $e^{\pm i\pi/3}$; $|\xi|=1$, stable and with no growing dispersion error;
- $\nu=1$ ($\Delta t=0.1$): $\xi^2+2\xi+1=0$, $\xi=-1$ (double root), marginally stable; here the scheme propagates exactly along the characteristics;
- $\nu=1.2$ ($\Delta t=0.12$): the equation is $\xi^2+3.76\xi+1=0$ with roots about $-0.289$ and $-3.471$; $|\xi|_{\max}=3.47>1$, amplifying 3.47-fold per step and diverging.

> Comment: the stability conditions of parabolic and hyperbolic equations have completely different forms—the heat equation requires $\Delta t=O(\Delta x^2)$, the wave equation only $\Delta t=O(\Delta x)$. Hence the wave equation can be solved efficiently with explicit schemes, whereas the heat equation on a fine grid almost always needs an implicit scheme.

## 6. Common Errors and Pitfalls

1. **Forgetting to check the CFL condition**. This is the most common cause of failure in PDE numerics; recompute $r$ or $\nu$ every time the grid changes.
2. **Shrinking the space and time steps independently**. In parabolic problems the two are coupled by $r\le1/2$, so shrinking only $\Delta t$ or only $\Delta x$ can break the bound.
3. **Poor boundary treatment**. Wrong ghost points, mixing Dirichlet with Neumann, or duplicate assignment at corners all produce stable but wrong solutions; first test against a known analytic solution (such as $u=e^{-\alpha k^2t}\sin kx$) to validate the boundary.
4. **Long simulations with an explicit scheme**. Though stable, $\Delta t$ is locked by the quadratic penalty and the accumulated number of steps is enormous; switch to Crank–Nicolson or ADI.
5. **Crank–Nicolson producing non-physical oscillations at large $r$**. It is not L-stable; for problems with discontinuous initial data (such as a rectangular temperature profile) the high-frequency components ring for a long time; a few backward-Euler steps first can smooth them.
6. **Ignoring numerical dispersion and dissipation**. Even when stable, the scheme makes different wavenumbers travel at slightly different speeds (dispersion) or decay in amplitude (dissipation); for long-distance propagation check the phase-velocity error and use higher-order or compact differences if necessary.
7. **Using explicit schemes directly in two or three dimensions**. The stability condition becomes $r_x+r_y\le\dfrac12$ (two dimensions), a tighter constraint; use ADI or implicit Krylov methods.
8. **Solving elliptic equations with dense matrices**. The coefficient matrix of the five-point stencil is extremely sparse (5 non-zeros per row), and dense LU turns $O(N)$ into $O(N^3)$; use sparse iterative methods or multigrid.
9. **Skipping the grid-convergence test**. Halve $\Delta x$ (adjusting $\Delta t$ per CFL) and recompute; the error should fall at the theoretical order. If it does not, the boundary or initial conditions are usually mishandled.

## 7. Summary and Mnemonics

- Finite differences replace derivatives by difference quotients: first order in time $O(\Delta t)$, second order in space $O(\Delta x^2)$.
- von Neumann analysis: substitute $e^{ikj\Delta x}$ to find the amplification factor $\xi$; stable if and only if $|\xi|\le1$ for all $k$.
- The FTCS stability condition for the heat equation is $r=\dfrac{\alpha\Delta t}{\Delta x^2}\le\dfrac12$, i.e. $\Delta t=O(\Delta x^2)$: tenfold finer space needs a hundredfold more time steps—the quadratic penalty of explicit methods for parabolic equations, and the reason fine grids force implicit schemes.
- Parabolic and hyperbolic stability conditions have entirely different forms (quadratic penalty versus linear constraint); deciding between explicit and implicit starts with identifying the type of equation.
- The CFL condition for the wave equation is $\nu=\dfrac{c\Delta t}{\Delta x}\le1$, i.e. $\Delta t=O(\Delta x)$; geometrically, the numerical domain of dependence must cover the physical one.
- Implicit schemes (BTCS, Crank–Nicolson) are unconditionally stable at the price of solving a linear system per step; tridiagonal systems use the Thomas algorithm in $O(N)$.
- Lax equivalence theorem: consistency + stability ⇔ convergence; check consistency (Taylor) first, then stability ($|\xi|$).
- Elliptic equations discretise into sparse linear systems, best handled by iterative methods or multigrid.

**Mnemonic: for the heat equation watch r at one half, for the wave equation watch ν at one; implicit buys stability, the chasing method solves tridiagonal; halve the grid and verify again, the error must fall at the right order.**`,
    keyPoints: [
      'von Neumann stability analysis: substitute a Fourier mode and find the amplification factor ξ; stability requires |ξ| ≤ 1',
      'The explicit FTCS stability condition for the heat equation is r = αΔt/Δx² ≤ 1/2, i.e. Δt = O(Δx²)',
      'The CFL condition for the wave equation is ν = cΔt/Δx ≤ 1; geometrically the numerical domain of dependence must cover the physical one',
      'The implicit BTCS and Crank–Nicolson schemes are unconditionally stable, solving a tridiagonal system each step (Thomas algorithm O(N))',
      'Crank–Nicolson is second order in time but not L-stable; at large r the high-frequency components produce non-physical oscillations',
      'Lax equivalence theorem: for well-posed linear initial value problems, consistency + stability is equivalent to convergence; elliptic equations discretise into sparse linear systems',
    ],
  },
  'monte-carlo': {
    chapter: 'Chapter 6 Monte Carlo Methods',
    title: 'Monte Carlo: Solving Deterministic Problems with Randomness',
    summary:
      'When dimension defeats grid methods, scattering points at random becomes the only way out: the error falls only as 1/√N, yet is almost independent of dimension.',
    content: String.raw`

In 1777 the French naturalist Buffon posed a curious question: drop a needle of length $l$ at random onto a floor ruled with parallel lines a distance $d>l$ apart; what is the probability that the needle crosses a line? The answer is $P=\dfrac{2l}{\pi d}$. That means **by dropping needles repeatedly and counting the crossing frequency, one can work backwards to $\pi$.** In 1901 the Italian mathematician Lazzarini dropped the needle 3408 times and obtained $\pi\approx3.1415929$—accurate to six decimal places (suspiciously lucky, but the reasoning is entirely correct).

This is the primitive form of the Monte Carlo method: express a deterministic quantity ($\pi$, some integral, some physical observable) as the expectation of a random process, then estimate it by the average over a large number of random samples.

The name itself comes from the Manhattan Project of the 1940s. Ulam and von Neumann had to compute the transport of neutrons through fissile material—a neutron scatters randomly, is absorbed randomly and triggers new fissions randomly every so often, and this high-dimensional random process simply cannot be written as a solvable equation. They used random numbers on a computer to "simulate" the fates of tens of thousands of neutrons and then gathered statistics. Because the whole method depends on chance, it was named after the casino city of Monte Carlo.

The two great application areas of Monte Carlo are **high-dimensional integration** and **simulation of random processes**. The former solves the "curse of dimensionality"—as Chapter 3 noted, tensor-grid quadrature above three dimensions blows up exponentially; the latter directly simulates the physical process itself (neutron transport, molecular collisions, spin flips, Brownian motion) and is the standard tool of statistical and particle physics.

Here is a teaser: Monte Carlo converges as $N^{-1/2}$—far slower than Simpson's $N^{-4}$—so why is it worth using? The key is that this $N^{-1/2}$ **is independent of dimension**: in one dimension it loses badly, in twenty dimensions it wins outright.

## 2. Random Numbers: The Foundation of Everything

**Pseudorandom number generators.** A computer is a deterministic machine, so the "random numbers" it produces are really deterministic sequences that merely look random. The classic example is the linear congruential generator (LCG):

$$x_{n+1}=(a\,x_n+c)\bmod m,\qquad u_n=\frac{x_n}{m}$$

By the Hull–Dobell theorem, when $c\ne0$ and (i) $c$ and $m$ are coprime; (ii) $a-1$ is divisible by every prime factor of $m$; (iii) if $m$ is divisible by 4 then so is $a-1$, the sequence attains the full period $m$. The LCG is extremely fast and has a small state, but its defects are fatal: the low-order bits have far shorter periods than the high-order ones (if $m=2^k$, the lowest bit has period 2), and in higher dimensions the random points fall on a small number of hyperplanes (the Marsaglia effect).

The modern standard is the Mersenne Twister MT19937, with period $2^{19937}-1$ and good uniformity up to 623 dimensions; it is the default generator in Python and MATLAB. The newer PCG and xoshiro families are better in speed and statistical properties. In physical simulations always record the seed so results can be reproduced.

**Sampling non-uniform distributions.** Given a target density $p(x)$, the most basic method is **inverse transform sampling**: if $F(x)=\int_{-\infty}^x p(t)dt$ is invertible, take a uniform random number $u$ and set $x=F^{-1}(u)$; then $x$ follows $p$. For example the exponential distribution $p(x)=\lambda e^{-\lambda x}$ gives $x=-\dfrac{1}{\lambda}\ln u$.

For the normal distribution use the Box–Muller transform:

$$z_0=\sqrt{-2\ln u_1}\cos(2\pi u_2),\qquad z_1=\sqrt{-2\ln u_1}\sin(2\pi u_2)$$

which produces two independent standard normal variables at once. Note that $u_1$ cannot be 0 (the logarithm diverges); implementations should take $u_1\in(0,1]$ or use Marsaglia's polar method (avoiding trigonometric functions and rejecting points with $r^2\ge1$).

**Three practical criteria for judging random numbers**: uniformity (histograms and the $\chi^2$ test), independence (autocorrelation functions near zero), and long period with high-dimensional uniformity (the pairs $(u_n,u_{n+1})$ filling the square). "Looks random" is not enough—the history of physics includes simulation results that deviated systematically from the truth because of defective generators.

## 3. Monte Carlo Integration: Unbiased Estimators and $1/\sqrt N$

**The basic estimator.** To compute $I=\displaystyle\int_a^b f(x)dx$, take $N$ independent uniform samples $x_i\sim U(a,b)$; then

$$\hat I_N=(b-a)\cdot\frac1N\sum_{i=1}^N f(x_i)=(b-a)\,\overline{f}$$

**Unbiasedness**: by the linearity of expectation, $\mathbb{E}[\hat I_N]=(b-a)\mathbb{E}[f]=I$. Note that unbiased does not mean accurate; the variance matters too.

**Variance and error**: let $\sigma_f^2$ be the variance of $f$ on $[a,b]$; then

$$\mathrm{Var}(\hat I_N)=\frac{(b-a)^2\sigma_f^2}{N},\qquad \sigma_{\hat I}=\frac{(b-a)\,\sigma_f}{\sqrt N}$$

By the central limit theorem $\hat I_N$ is asymptotically normal, so the $95\%$ confidence interval is about $\hat I_N\pm1.96\,\sigma_{\hat I}$. In practice the sample standard deviation $s$ replaces $\sigma_f$, giving the **standard error**

$$\mathrm{SE}=\frac{(b-a)\,s}{\sqrt N},\qquad s^2=\frac{1}{N-1}\sum_{i=1}^N(f_i-\overline f)^2$$

This is one of the most important outputs of the Monte Carlo method: **it provides an error estimate together with the result**, which deterministic quadrature formulas cannot do.

**The meaning of $1/\sqrt N$**: to gain one decimal digit of accuracy (reduce the error tenfold) requires a hundredfold sample size. This is the "slowness" of Monte Carlo, and its fate.

**Why is it still worth it?** Compare a $d$-dimensional integral. Composite Simpson takes $n$ points per direction, so the total number of points is $N=n^d$ and the error is $O(n^{-4})=O(N^{-4/d})$: $N^{-4}$ for $d=1$, $N^{-1}$ for $d=4$, $N^{-0.4}$ for $d=10$—worse than Monte Carlo's $N^{-0.5}$. Monte Carlo is always $N^{-1/2}$, **independent of dimension**. The crossover dimension is about $d\approx8$ (lower when combined with importance sampling). The partition function of statistical physics is a $10^{23}$-dimensional integral and a path integral is infinite-dimensional—there Monte Carlo is the only feasible tool.

**An intuitive high-dimensional example.** Compute the volume of the $d$-dimensional unit ball: scatter points uniformly in the hypercube $[-1,1]^d$ and count the fraction $p$ satisfying $\sum_{i}x_i^2\le1$; then $V_d=2^d p$. For $d=10$ the true value is $V_{10}=\dfrac{\pi^5}{120}\approx2.550$ while the hypercube volume is $2^{10}=1024$, so the hit rate is only about $0.25\%$—in high-dimensional space almost all the volume is concentrated in the corners, the most vivid picture of the curse of dimensionality. Even with such a low hit rate, $10^5$ samples still give three significant digits, whereas a ten-dimensional tensor grid with 100 points per direction would need $10^{20}$ grid points, entirely unrealistic. The comparison makes the value of "Monte Carlo is slow but dimension-independent" very clear.

**The antidote to the curse of dimensionality**: Monte Carlo replaces "the number of grid points grows exponentially with dimension" by "the sample variance grows slowly with dimension", at the cost of the error falling from $N^{-4}$ to $N^{-1/2}$, trading randomness for dimension independence. In high dimensions this is an extremely good bargain.

## 4. Reducing Variance: Importance Sampling and Other Techniques

**Importance sampling** is the most powerful acceleration. Rewrite the integral as

$$I=\int\frac{f(x)}{p(x)}\,p(x)\,dx=\mathbb{E}_p\!\left[\frac{f(X)}{p(X)}\right],\qquad \hat I=\frac1N\sum_{i=1}^N\frac{f(x_i)}{p(x_i)},\ x_i\sim p$$

The variance of the new estimator is $\dfrac1N\mathrm{Var}_p\!\left[\dfrac f p\right]$. Minimising it over $p$ (subject to $\int p=1$) by the calculus of variations gives the optimal density

$$p^*(x)=\frac{|f(x)|}{\int|f|\,dx}$$

for which the variance is zero—of course unrealistic (it requires knowing the integral), but it points the way: **match the sampling density to the shape of the integrand, scattering more points where the function is large.** For example, to compute $\int_0^\infty x^3e^{-x}dx$, sample with $p(x)=e^{-x}$ (the exponential distribution); the estimated quantity becomes $\mathbb{E}[X^3]$ and the variance goes from divergent (uniform scattering on an infinite interval) to finite.

Even if a perfect density cannot be found, ensure that the tail of $p$ **does not decay faster than $|f|$**, otherwise $\dfrac fp$ explodes in some regions and the variance runs out of control—the most common failure mode of importance sampling.

**Other variance-reduction techniques**:

- **Antithetic variates**: use $u$ and $1-u$ in pairs, exploiting negative correlation to cancel part of the variance; very effective for monotone functions.
- **Stratification**: divide the interval into $k$ strata and draw a fixed $N/k$ points from each, preventing random clumping; the variance drops from $\dfrac{\sigma^2}{N}$ to about $\dfrac{\sigma^2}{N}-\dfrac{\text{between-strata variance}}{N}$.
- **Control variates**: find a function $g\approx f$ with a known exact integral and estimate the expectation of the difference $f-g$, thereby removing most of the variance.
- **Quasi-Monte Carlo**: replace pseudorandom numbers by low-discrepancy sequences (Sobol, Halton); the error can approach $O(N^{-1})$ (times $\log^d N$), excellent in low and moderate dimensions.

## 5. Random Walks and Physical Applications

**Random walks and diffusion.** One-dimensional unbiased random walk: at each step move a distance $a$ left or right with equal probability; after $N$ steps the position is $x_N=\sum_{k=1}^N\xi_k$ with $\xi_k=\pm a$. Then

$$\langle x_N\rangle=0,\qquad \langle x_N^2\rangle=N a^2$$

The mean squared displacement grows linearly with the number of steps (not with the displacement), the signature of a diffusive process. Comparing with the solution $\langle x^2\rangle=2Dt$ (one dimension) of the diffusion equation $\dfrac{\partial\rho}{\partial t}=D\dfrac{\partial^2\rho}{\partial x^2}$ gives the correspondence between step length and diffusion coefficient

$$D=\frac{a^2}{2\Delta t}$$

This relation is the bridge between random walks and PDEs: Brownian motion, polymer conformations, turbulent diffusion and financial price models are all built on it. In three dimensions $\langle r^2\rangle=6Dt$.

**Markov chain Monte Carlo (MCMC) and statistical physics.** Statistical physics needs canonical ensemble averages

$$\langle A\rangle=\frac{1}{Z}\sum_{\Gamma}A(\Gamma)e^{-\beta E(\Gamma)},\qquad Z=\sum_{\Gamma}e^{-\beta E(\Gamma)}$$

but the configuration space $\Gamma$ has size $2^N$ ($N$ spins) or larger, so enumeration is impossible. The Metropolis algorithm **constructs a Markov chain whose stationary distribution is exactly the Boltzmann distribution** $\pi(\Gamma)\propto e^{-\beta E(\Gamma)}$. Each step proposes a change $\Gamma\to\Gamma^\prime$ and accepts it with probability

$$P_{\mathrm{acc}}(\Gamma\to\Gamma^\prime)=\min\big(1,\ e^{-\beta\Delta E}\big),\qquad \Delta E=E(\Gamma^\prime)-E(\Gamma)$$

Changes that lower the energy are always accepted, changes that raise it are accepted with a Boltzmann-factor probability. The rule satisfies the **detailed balance condition**

$$\pi(\Gamma)P(\Gamma\to\Gamma^\prime)=\pi(\Gamma^\prime)P(\Gamma^\prime\to\Gamma)$$

from which it follows that $\pi$ is the stationary distribution of the chain; requiring in addition that the chain be irreducible and aperiodic, the sampled distribution tends to $\pi$ after a long time and the time average equals the ensemble average.

When using MCMC, note in particular: **samples from the thermalisation (burn-in) stage must be discarded**, and adjacent samples are highly correlated, so the error estimate must be corrected by the autocorrelation time $\tau$ (the effective sample size is about $\dfrac{N}{2\tau}$). Near a critical point **critical slowing down** occurs ($\tau\sim L^z$, $z\approx2$), and cluster algorithms (Swendsen–Wang, Wolff) that flip a whole patch of spins at once are needed.

The Ising model is the textbook case for MCMC: $E=-J\sum_{\langle ij\rangle}s_is_j-h\sum_i s_i$; the two-dimensional Ising model undergoes a ferromagnetic–paramagnetic transition at $T_c=\dfrac{2J}{k_B\ln(1+\sqrt2)}\approx2.269\dfrac{J}{k_B}$, and Monte Carlo clearly shows the magnetisation jumping up from zero near the critical point and the specific heat spiking.

## 6. Common Errors and Pitfalls

1. **Forgetting to report the error**. A Monte Carlo result must come with its standard error $\dfrac{(b-a)s}{\sqrt N}$; a number without an error is no result at all.
2. **Thinking more samples solve everything**. The error falls as $N^{-1/2}$, so one more digit costs a hundredfold samples; first try hard to reduce the variance (importance sampling, stratification, control variates).
3. **An importance density with too thin a tail**. If $p$ is much smaller than $|f|$ somewhere, $\dfrac fp$ explodes, the variance worsens and the result can be badly off; always check that $\dfrac fp$ is bounded.
4. **A poor random number generator**. Short low-bit periods and high-dimensional hyperplane structure shift the simulation systematically; use MT19937 or better and run statistical tests.
5. **Reusing the same random stream for comparative experiments**. When comparing two algorithms, use the **same random sequence** (the common random numbers technique), otherwise the difference is buried in random noise.
6. **Ignoring thermalisation and autocorrelation**. MCMC must sample from equilibrium; correlated successive samples make the error estimate too small and must be corrected by the effective sample size $\dfrac{N}{2\tau}$.
7. **Using Monte Carlo for low-dimensional integrals**. One- and two-dimensional integrals are orders of magnitude more efficient with Gaussian quadrature or adaptive Simpson; Monte Carlo wins only at higher dimension ($d\gtrsim4$–$8$) or with complicated region shapes.
8. **Treating pseudorandom numbers as truly random for security**. Cryptography needs cryptographically secure generators; the state of MT19937 used in simulations can be reverse-engineered and must never be mixed in.
9. **Drawing physical conclusions from too few samples**. Critical points and critical exponents require finite-size scaling analysis (simulate several lattice sizes $L$ and extrapolate); single simulations are often badly distorted by finite-size effects.

## 7. Summary and Mnemonics

- Monte Carlo expresses a deterministic quantity as the expectation of a random variable and estimates it by the sample mean; the estimator is unbiased.
- Error $\sigma_{\hat I}=\dfrac{(b-a)\sigma_f}{\sqrt N}$: $1/\sqrt N$ convergence, independent of dimension.
- The curse of dimensionality: composite quadrature in $d$ dimensions has error $O(N^{-4/d})$ while Monte Carlo is always $O(N^{-1/2})$, which wins for $d\gtrsim8$.
- The optimal importance density is $p^*\propto|f|$; in practice the density tail must not decay faster than $|f|$.
- Inverse transform $x=F^{-1}(u)$ and the Box–Muller transform are the two basic sampling tools.
- A random walk has $\langle x^2\rangle=Na^2$, corresponding to diffusion with $D=\dfrac{a^2}{2\Delta t}$ (in one dimension $\langle x^2\rangle=2Dt$).
- The Metropolis acceptance probability $\min(1,e^{-\beta\Delta E})$ satisfies detailed balance, with the Boltzmann distribution as its stationary distribution.
- MCMC must discard thermalisation samples and correct errors by the autocorrelation time.

**Mnemonic: scatter points to estimate an expectation, the error follows the square root; importance sampling matches the shape, keep the tail no thinner than f; discard thermalisation before statistics, correct the error for autocorrelation.**`,
    keyPoints: [
      'The Monte Carlo estimator Î = (b−a)·(1/N)Σf(x_i) is unbiased, with standard deviation falling as (b−a)σ_f/√N',
      '1/√N convergence is independent of dimension, whereas composite quadrature has error O(N^{−4/d}) in d dimensions; Monte Carlo wins in high dimensions',
      'The optimal importance density is p*(x) = |f(x)|/∫|f|; estimate the expectation of f/p and keep the tail of p from decaying faster than |f|',
      'Inverse transform sampling x = F^{−1}(u); the Box–Muller transform produces two independent normal variables at once',
      'A one-dimensional random walk has ⟨x²⟩ = Na², corresponding to a diffusion coefficient D = a²/(2Δt)',
      'The Metropolis acceptance probability min(1, e^{−βΔE}) satisfies detailed balance and gives the Boltzmann distribution; MCMC must discard thermalisation samples',
    ],
  },
  'eigen-numerics': {
    chapter: 'Chapter 7 Matrix Methods and Eigenvalues',
    title: 'Numerical Linear Algebra: From Gaussian Elimination to the Power Method',
    summary:
      'Stationary states, normal modes and stability in physics all reduce in the end to matrix eigenvalue problems; the power method approaches the dominant eigenvalue by the plainest iteration.',
    content: String.raw`

Open any physics textbook and eigenvalue problems appear again and again:

- **Quantum mechanics**: the stationary Schrödinger equation $\hat H\psi=E\psi$; the eigenvalues of the Hamiltonian operator are the observable energy levels. Once space is discretised, $\hat H$ becomes a matrix (usually tridiagonal or banded), and finding the levels means finding matrix eigenvalues.
- **Vibration and waves**: the normal modes of a coupled spring–mass system satisfy $Kx=\omega^2 Mx$ (a generalised eigenvalue problem); the eigenvalues give the normal frequencies and the eigenvectors the mode shapes. Molecular vibrational spectra, lattice phonons and bridge resonance modes all use the same mathematics.
- **Rotation**: the eigenvectors of a rigid body's inertia tensor are the principal axes and the eigenvalues the principal moments of inertia.
- **Stability**: linearising a nonlinear system about an equilibrium gives $\dot{\delta x}=J\,\delta x$; the real parts of the eigenvalues of the Jacobian $J$ decide stability. The stability criterion $|\xi|\le1$ for the difference schemes of Chapter 5 is, in essence, the requirement that the **spectral radius of the amplification matrix** satisfy $\rho(G)\le1$.
- **Data**: principal component analysis (PCA) is exactly the eigendecomposition of a covariance matrix, indispensable for denoising and feature extraction in experimental physics data.

Besides eigenvalue problems, linear systems $Ax=b$ are equally the skeleton of computation: implicit difference schemes solve a tridiagonal system at every step, finite elements solve large sparse systems, and least-squares fitting solves the normal equations. This chapter treats the two together because they share the same toolkit—**matrix factorisation**.

Here is a teaser: for solving $Ax=b$, textbooks say "use $x=A^{-1}b$", yet numerical computation almost never actually inverts the matrix. Why? The answer involves both operation count and accuracy, and it is where this chapter begins.

## 2. Gaussian Elimination and LU Factorisation

**Gaussian elimination.** Perform row operations on the augmented matrix to reduce $A$ to an upper triangular matrix $U$, then back-substitute. At step $k$ the pivot is $a_{kk}^{(k)}$ in row $k$, and the entries below are eliminated:

$$m_{ik}=\frac{a_{ik}^{(k)}}{a_{kk}^{(k)}},\qquad a_{ij}^{(k+1)}=a_{ij}^{(k)}-m_{ik}a_{kj}^{(k)}$$

Forward elimination costs about $\dfrac23n^3$ floating-point operations, and back-substitution $O(n^2)$.

**Why pivoting is essential.** If $a_{kk}^{(k)}$ is small, the multipliers $m_{ik}$ become large, the eliminated entries are magnified and the rounding error is magnified with them. The classic counterexample (no pivoting):

$$A=\begin{pmatrix}10^{-20}&1\\1&1\end{pmatrix}$$

In double precision $1/10^{-20}=10^{20}$ far exceeds what machine precision can represent; once $\dfrac{1}{10^{-20}}$ enters the computation, $1-10^{20}$ is essentially $-10^{20}$, all information and accuracy are lost and the solution is completely wrong. With **partial pivoting** (swap up the row with the largest absolute value in the column below the $k$-th), the multipliers satisfy $|m_{ik}|\le1$, the growth factor is controlled, and this very example immediately gives the correct solution. Practical implementations must always use partial pivoting; the cost is only $O(n^2)$ comparisons.

**LU factorisation.** All the multipliers of Gaussian elimination form a unit lower triangular matrix $L$, so

$$A=LU,\qquad L=\begin{pmatrix}1&&\\m_{21}&1&\\ \vdots&\ddots&1\end{pmatrix},\quad U=\text{upper triangular}$$

Once factorised, solving $Ax=b$ takes two steps:

$$Ly=b\ (\text{forward substitution}),\qquad Ux=y\ (\text{back substitution})$$

each $O(n^2)$. Its greatest value lies in **one matrix, many right-hand sides**: in implicit differencing the right-hand side changes every step but the matrix does not, so one factorisation ($O(n^3)$) suffices and every step then costs only $O(n^2)$. For tridiagonal matrices LU factorisation reduces to the Thomas chasing method, needing only $O(n)$.

**Special structure calls for special algorithms**: symmetric positive definite matrices use the Cholesky factorisation $A=LL^\mathsf{T}$ (half the work and numerically more stable); symmetric indefinite matrices use $LDL^\mathsf{T}$; orthogonal transformations (Householder, Givens) are used for QR and least squares, with the best numerical stability.

**Why not invert.** Computing $A^{-1}$ needs about $2n^3$ operations (three times LU factorisation), and the rounding error of $A^{-1}b$ is usually larger than that of an LU solve; worse, $A^{-1}$ is often dense even when $A$ is extremely sparse. Hence the first principle of numerical linear algebra: **factorise rather than invert, stay sparse rather than dense.**

**Condition number and accuracy.** Let $\hat x$ be the computed solution and $r=b-A\hat x$ the residual. The relation between error and residual is governed by the condition number:

$$\frac{\|x-\hat x\|}{\|x\|}\le\kappa(A)\frac{\|r\|}{\|b\|},\qquad \kappa(A)=\|A\|\,\|A^{-1}\|$$

A small residual does not guarantee a small error: if $\kappa(A)=10^{8}$, even a residual at machine precision leaves eight wrong digits in the solution. This is Chapter 1's "the condition number is a property of the problem" appearing in linear algebra. The remedy is **iterative refinement**: compute the residual $r=b-A\hat x$ in double precision, solve $A\delta=r$, set $\hat x\leftarrow\hat x+\delta$, and several digits of accuracy are recovered.

## 3. The Power Method, Inverse Iteration and the QR Algorithm

**Algorithm 1 (power method)** Used to find the eigenvalue of largest modulus $\lambda_1$ and its eigenvector. Take any $x_0$ and iterate

$$y_k=Ax_{k-1},\qquad x_k=\frac{y_k}{\|y_k\|},\qquad \lambda_1\approx\frac{x_k^\mathsf{T}Ax_k}{x_k^\mathsf{T}x_k}\ (\text{Rayleigh quotient})$$

Normalisation is essential, otherwise the vector overflows when $|\lambda_1|>1$ and underflows to zero when $|\lambda_1|<1$.

**Derivation of convergence.** Suppose $A$ is diagonalisable with eigenvectors $v_1,\dots,v_n$ corresponding to $|\lambda_1|>|\lambda_2|\ge\cdots$, and expand the initial vector as $x_0=\sum_ic_iv_i$ (with $c_1\ne0$). Then

$$A^kx_0=\lambda_1^k\left[c_1v_1+\sum_{i\ge2}c_i\left(\frac{\lambda_i}{\lambda_1}\right)^kv_i\right]$$

The second term in the bracket decays at rate $\left|\dfrac{\lambda_2}{\lambda_1}\right|^k$, so $x_k\to v_1$ (up to a sign). **The rate of convergence is determined by the ratio of eigenvalues**: the closer $\left|\dfrac{\lambda_2}{\lambda_1}\right|$ is to 1, the slower the convergence. If $\lambda_1=-\lambda_2$ or there is a conjugate complex pair, the power method oscillates between two directions and does not converge.

The eigenvalue estimate from the Rayleigh quotient is far more accurate than the vector itself: if the vector error is $O(\varepsilon)$, the Rayleigh quotient error is $O(\varepsilon^2)$ (for symmetric matrices), a direct consequence of the stationary property of quadratic forms.

**Algorithm 2 (inverse iteration and shifted inverse iteration)** Applying the power method to $A^{-1}$ gives the eigenvalue of **smallest modulus**:

$$Ay_k=x_{k-1}\ (\text{solve the system}),\qquad x_k=\frac{y_k}{\|y_k\|}$$

Each step solves a linear system (using an LU factorisation computed once). More useful is the **shifted** version: if an approximate eigenvalue $\mu$ is known, apply the power method to $(A-\mu I)^{-1}$; it converges to the eigenvalue closest to $\mu$, with ratio $\left|\dfrac{\lambda_j-\mu}{\lambda_k-\mu}\right|$ ($\lambda_j$ the closest, $\lambda_k$ the next closest), extremely fast when $\mu$ is near the target. This is the standard way of polishing a rough eigenvalue estimate.

**Algorithm 3 (QR algorithm)** The standard method for all eigenvalues. Iterate

$$A_k=Q_kR_k\ (\text{QR factorisation}),\qquad A_{k+1}=R_kQ_k$$

Since $A_{k+1}=Q_k^\mathsf{T}A_kQ_k$, the sequence has the same eigenvalues (a similarity transformation) and under suitable conditions converges to an upper triangular (or quasi-triangular) matrix with the eigenvalues on the diagonal. Practical implementations first reduce to **Hessenberg form** (for nonsymmetric matrices) or tridiagonal form (for symmetric ones), bringing the cost of each QR factorisation from $O(n^3)$ down to $O(n^2)$, and then add shifts (Wilkinson shifts) to accelerate convergence. Eigenvalues of symmetric matrices are well conditioned (condition number 1), whereas severely degenerate eigenvalues of nonsymmetric matrices may be ill conditioned.

**The scale of the eigenvalue problem** also determines the algorithm: dense matrices with $n\lesssim10^3$ use QR (LAPACK's dgeev); sparse matrices with $n\sim10^5$–$10^7$ can only use iterative methods. There it is impossible even to store a dense matrix ($10^{10}$ entries), let alone perform a QR factorisation; the only feasible operation is the **matrix–vector product** $y=Ax$ (which costs only $O(n)$ for a sparse matrix).

Krylov subspace methods are built on exactly this operation: starting from $v_1$, construct

$$\mathcal{K}_m=\mathrm{span}\{v_1,Av_1,A^2v_1,\dots,A^{m-1}v_1\}$$

project the original problem onto this $m$-dimensional subspace, solve a small eigenvalue problem, and keep expanding the subspace. Symmetric matrices use the **Lanczos algorithm** (three-term recurrence, $O(n)$ memory) and nonsymmetric ones the **Arnoldi algorithm** (orthogonalising all basis vectors, with implicit restarting in practice to control memory and orthogonalisation cost). They efficiently find the extreme eigenvalues (largest, smallest, or those near a shift), exactly the low-lying excited-state levels and lowest normal frequencies that physics cares about most. Spectral transformation tricks (applying $(A-\mu I)^{-1}$ or a polynomial transformation) can "move" interior eigenvalues to the extremes and accelerate convergence.

## 4. Physical Applications: From Continuous Eigenvalue Problems to Matrices

**Discretising the one-dimensional stationary Schrödinger equation.** Consider a particle in an infinite square well, $-\dfrac{\hbar^2}{2m}\psi^{\prime\prime}=E\psi$, $0<x<L$. Take $N$ interior grid points with spacing $h=\dfrac{L}{N+1}$ and replace the second derivative by a second-order central difference:

$$-\frac{\hbar^2}{2mh^2}\left(\psi_{j+1}-2\psi_j+\psi_{j-1}\right)=E\psi_j$$

Written in matrix form $H\psi=E\psi$, where

$$H=\frac{\hbar^2}{2mh^2}\begin{pmatrix}2&-1&&\\-1&2&-1&\\ &\ddots&\ddots&\ddots\\ &&-1&2\end{pmatrix}$$

This is a symmetric tridiagonal matrix. Its eigenvalues can be found analytically:

$$E_n=\frac{\hbar^2}{mh^2}\left(1-\cos\frac{n\pi}{N+1}\right)=\frac{2\hbar^2}{mh^2}\sin^2\frac{n\pi}{2(N+1)}$$

For $n\ll N$, $\sin\theta\approx\theta$ gives $E_n\approx\dfrac{\hbar^2n^2\pi^2}{2mL^2}$—exactly the levels of the continuous theory $E_n=\dfrac{n^2\pi^2\hbar^2}{2mL^2}$ (substitute $h=\dfrac{L}{N+1}$). This example shows beautifully that **discretisation turns the differential operator into a matrix and the matrix eigenvalues are the numerical energy levels; low-lying states are very accurate, while high levels ($n$ approaching $N$) deviate badly because their wavelength approaches the grid spacing**—a direct manifestation of discretisation error.

**Normal modes.** The equations of motion of coupled oscillators are $M\ddot x=-Kx$; setting $x=ae^{i\omega t}$ gives $Ka=\omega^2Ma$, a generalised eigenvalue problem. If $M$ is symmetric positive definite, first factorise $M=LL^\mathsf{T}$ to reduce it to the standard problem $L^{-1}KL^{-\mathsf{T}}b=\omega^2b$. Of the $n$ normal frequencies obtained, the smallest is the fundamental, with all masses moving in phase; the largest has neighbouring masses in antiphase.

**Stability analysis.** The difference schemes of Chapter 5 can be written $u^{n+1}=Gu^n$ with $G$ the amplification matrix. The numerical solution does not diverge provided

$$\rho(G)=\max_i|\lambda_i(G)|\le1$$

$\rho(G)$ is the spectral radius of $G$, i.e. the eigenvalue of largest modulus. Hence **the power method can be used directly to estimate the spectral radius of a difference scheme**: repeatedly multiply a random vector by $G$ and normalise; the limit of the norm is $\rho(G)$. For more complex schemes (multidimensional, variable-coefficient, nonlinear) where the amplification factor cannot be found analytically, numerically estimating the spectral radius with the power method is the most practical stability test. This also shows that eigenvalue computation and the numerical solution of PDEs are not two isolated topics but two faces of the same spectral theory.

## 5. Worked Examples

### Example 1 (basic: solving a linear system by LU factorisation)

Problem: Use LU factorisation to solve

$$\begin{pmatrix}2&1&1\\4&3&3\\8&7&9\end{pmatrix}x=\begin{pmatrix}4\\10\\24\end{pmatrix}$$

Solution: In the first elimination step the multipliers are $l_{21}=\dfrac42=2$ and $l_{31}=\dfrac82=4$:

$$R_2\leftarrow R_2-2R_1=(0,1,1),\qquad R_3\leftarrow R_3-4R_1=(0,3,5)$$

Second step, $l_{32}=\dfrac31=3$: $R_3\leftarrow R_3-3R_2=(0,0,2)$. Hence

$$L=\begin{pmatrix}1&0&0\\2&1&0\\4&3&1\end{pmatrix},\qquad U=\begin{pmatrix}2&1&1\\0&1&1\\0&0&2\end{pmatrix}$$

Check: the second row of $LU$ is $2(2,1,1)+(0,1,1)=(4,3,3)$ and the third is $4(2,1,1)+3(0,1,1)+(0,0,2)=(8,7,9)$, matching the original matrix.

Forward substitution for $Ly=b$: $y_1=4$; $2y_1+y_2=10\Rightarrow y_2=2$; $4y_1+3y_2+y_3=24\Rightarrow y_3=2$.

Back substitution for $Ux=y$: $2x_3=2\Rightarrow x_3=1$; $x_2+x_3=2\Rightarrow x_2=1$; $2x_1+x_2+x_3=4\Rightarrow x_1=1$.

So $x=(1,1,1)^\mathsf{T}$. After one factorisation, any new right-hand side $b^\prime$ needs only two $O(n^2)$ triangular solves—exactly the situation in implicit time stepping, where the same matrix is reused repeatedly.

### Example 2 (advanced: the power method for the dominant eigenvalue)

Problem: Use the power method to find the dominant eigenvalue of $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, iterating four steps from $x_0=(1,0)^\mathsf{T}$.

Solution: (The exact eigenvalues are $\lambda_1=3$ and $\lambda_2=1$, with eigenvectors $(1,1)^\mathsf{T}$ and $(1,-1)^\mathsf{T}$.)

$$x_1=\frac{Ax_0}{\|Ax_0\|_\infty}=\frac{(2,1)^\mathsf{T}}{2}=(1,\ 0.5)^\mathsf{T}$$

$$x_2=\frac{(2.5,\ 2)^\mathsf{T}}{2.5}=(1,\ 0.8)^\mathsf{T},\qquad x_3=\frac{(2.8,\ 2.6)^\mathsf{T}}{2.8}=(1,\ 0.9286)^\mathsf{T}$$

$$x_4=\frac{(2.9286,\ 2.8571)^\mathsf{T}}{2.9286}=(1,\ 0.9756)^\mathsf{T}$$

The vector is indeed approaching $(1,1)^\mathsf{T}$. Estimate the eigenvalue with the Rayleigh quotient (using $x_3=(1,0.9286)^\mathsf{T}$):

$$\lambda\approx\frac{x^\mathsf{T}Ax}{x^\mathsf{T}x}=\frac{1\times2.9286+0.9286\times2.8572}{1+0.9286^2}=\frac{5.5817}{1.8623}=2.9974$$

only $2.6\times10^{-3}$ away from the true value 3. Theoretically the error at step $k$ should be proportional to $\left|\dfrac{\lambda_2}{\lambda_1}\right|^k=\left(\dfrac13\right)^k$: at $k=4$ that is about $1.2\times10^{-2}$ (the vector error), while the Rayleigh quotient, through the stationary property of the quadratic form, presses the error down quadratically to the $10^{-3}$ level, in agreement with observation.

If instead shifted inverse iteration is used (with $\mu=2.9$), the convergence ratio is about $\left|\dfrac{3-2.9}{1-2.9}\right|\approx0.053$, so one step yields three or four new digits—the power of "rough first, fine afterwards".

## 6. Common Errors and Pitfalls

1. **Actually inverting the matrix**. It costs three times as much as LU, is less accurate and turns sparse matrices dense; the right approach is to factorise and then back-substitute.
2. **Not pivoting**. A small pivot makes the multipliers huge and amplifies rounding error; partial pivoting costs almost nothing and must be enabled.
3. **Judging accuracy by a small residual**. $\dfrac{\|x-\hat x\|}{\|x\|}\le\kappa(A)\dfrac{\|r\|}{\|b\|}$: with a large condition number a small residual does not mean a small error; estimate the condition number or use iterative refinement.
4. **Not normalising in the power method**. $|\lambda_1|>1$ overflows and $<1$ underflows; normalise every step.
5. **Using the power method when $\lambda_1$ and $\lambda_2$ are close (or a complex conjugate pair, or $\lambda_1=-\lambda_2$)**. The convergence ratio approaches 1 and the iteration is extremely slow or oscillates; switch to shifted inverse iteration or Lanczos/Arnoldi.
6. **Applying the QR algorithm to large sparse matrices**. Dense QR is $O(n^3)$ and fills in the zeros; large problems must use iterative methods that only perform matrix–vector products.
7. **Ignoring symmetry and structure**. Symmetric positive definite matrices use Cholesky (half the work, more stable), and symmetric matrices have well-conditioned eigenvalues (condition number 1); exploiting structure gives a large speed-up.
8. **Forgetting to check grid convergence after discretisation**. The eigenvalue error of the difference matrix is $O(h^2)$; high levels (wavelength near the grid spacing) have the largest error, so a halved-$h$ test is essential.
9. **Treating the generalised problem $Kx=\lambda Mx$ as standard**. If $M\ne I$, first whiten (Cholesky) or call a dedicated generalised eigensolver; otherwise the "eigenvalues" obtained have no physical meaning.

## 7. Summary and Mnemonics

- Gaussian elimination is $O(n^3)$ and must use partial pivoting; the elimination multipliers form $L$, so $A=LU$.
- Many right-hand sides need only one factorisation: $O(n^3)$ to factor plus $O(n^2)$ per forward/back substitution; tridiagonal systems use the Thomas algorithm in $O(n)$.
- Never invert explicitly: slower, less accurate, denser.
- Accuracy is governed by the condition number: $\dfrac{\|x-\hat x\|}{\|x\|}\le\kappa(A)\dfrac{\|r\|}{\|b\|}$; a small residual is not a small error.
- The power method $x_k=Ax_{k-1}/\|Ax_{k-1}\|$ has convergence ratio $\left|\dfrac{\lambda_2}{\lambda_1}\right|$; the Rayleigh quotient gives a high-accuracy eigenvalue estimate.
- Inverse iteration finds the smallest eigenvalue; shifted inverse iteration polishes a known approximation to machine precision.
- The QR algorithm finds all eigenvalues; practical implementations first reduce to Hessenberg or tridiagonal form and add shifts.
- The stability of a difference scheme is $\rho(G)\le1$: the spectral radius is the largest eigenvalue of the amplification matrix and can be estimated numerically by the power method.

**Mnemonic: factorise, never invert; always choose a large pivot; the power method chases the largest, shifted inverse iteration polishes it home; let the spectral radius exceed one and the scheme is bound to collapse.**`,
    keyPoints: [
      'Gaussian elimination is O(n^3) and must use partial pivoting; the elimination multipliers form L, so A = LU',
      'Many right-hand sides need only one LU factorisation O(n^3); each later step costs O(n^2) for forward and back substitution',
      'The error is governed by the condition number: ‖x−x̂‖/‖x‖ ≤ κ(A)·‖r‖/‖b‖; a small residual is not a small error',
      'The power method converges at ratio |λ_2/λ_1|, must normalise every step, and the Rayleigh quotient gives a high-accuracy eigenvalue estimate',
      'Shifted inverse iteration (A−μI)^{-1} rapidly polishes a known approximate eigenvalue',
      'The QR algorithm finds all eigenvalues; practical implementations first reduce to Hessenberg or tridiagonal form with shifts; the stability criterion for difference schemes is the spectral radius ρ(G) ≤ 1',
    ],
  },
};

export default map;
