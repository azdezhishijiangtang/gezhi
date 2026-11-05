import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'generating-functions': {
    chapter: 'Chapter 1 Generating Functions',
    title: 'Generating Functions',
    summary:
      'Pack a sequence into a power series: recurrences become algebra, counting becomes coefficients—the "transformer" of combinatorics.',
    keyPoints: [
      'OGF: convolution becomes multiplication—the algebraization of combinatorial concatenation',
      'Recurrence → functional equation for the generating function → solve the algebraic equation → read off coefficients',
      'EGF (divided by n!) is used for labelled structures and partition-type counting',
      'Catalan numbers C=1+xC²: brackets, binary trees, and stack sequences share one source',
    ],
    content: String.raw`

How many ways are there to make 10 yuan from 1-, 2-, and 5-yuan coins? The plainest approach is casework: with 0, 1, or 2 five-yuan coins, then enumerate the numbers of 2- and 1-yuan coins. The more cases, the more mistakes: one missed, one double-counted, and in the end you cannot even tell whether the answer is right.

Change the bookkeeping. Write all the possibilities for "using 1-yuan coins" as a series: 0 coins is $1$, 1 coin is $x$, 2 coins is $x^2$, and so on, giving $1 + x + x^2 + x^3 + \cdots$. Likewise "using 2-yuan coins" is $1 + x^2 + x^4 + \cdots$ and "using 5-yuan coins" is $1 + x^5 + x^{10} + \cdots$. Multiply the three series: in the expansion pick one term from each bracket and add the exponents. Picking $x^2$, $x^3$, $x^5$ corresponds to "2 one-yuan, 3 two-yuan, 1 five-yuan" coins, total value $2 + 6 + 5 = 13$. So the coefficient of $x^{10}$ is exactly the number of ways to make 10 yuan.

This is not a trick but a change of viewpoint: **turn a counting problem into a problem about the coefficients of a polynomial**. Polynomials can be added, multiplied, differentiated, and solved for, and each of these algebraic operations has a precise meaning in the language of counting. A combinatorialist can therefore say: I am not counting, I am doing algebra.

This topic answers four questions: what exactly is a generating function (rigorous definition)? Why does multiplication correspond precisely to "concatenation"? How do you turn a recurrence into an equation, solve it, and read the coefficients back? And finally, why can one algebraic equation explain bracket matchings, binary trees, and triangulations—objects that look entirely unrelated?

## 2. Rigorous Definitions

**Definition 1 (ordinary generating function)** Let $\{a_n\}_{n\ge 0}$ be a sequence. The formal power series

$$A(x) = \sum_{n=0}^{\infty} a_n x^n = a_0 + a_1 x + a_2 x^2 + \cdots$$

is called the **ordinary generating function** (OGF) of the sequence.

The word "formal" is crucial: we do not regard $x$ as a real or complex number, we do not discuss convergence, and we never assign a value to $x$. $x^n$ is merely a label attached to $a_n$ so that the exponent can record the size. Two formal power series are equal if and only if all coefficients agree. From this point of view $\sum_{n\ge 0} n!\,x^n$ is a perfectly legitimate object, even though it converges only at $x = 0$.

**Definition 2 (operations on formal power series)** Addition is termwise; multiplication is defined by the Cauchy convolution:

$$A(x)B(x) = \sum_{n\ge 0}\left(\sum_{k=0}^{n} a_k b_{n-k}\right)x^n.$$

That is, the coefficient of $x^n$ in the product is $c_n = \sum_{k=0}^{n} a_k b_{n-k}$. This formula is the source of all the magic in this topic.

**Definition 3 (exponential generating function)** For a sequence $\{a_n\}_{n\ge 0}$,

$$\hat{A}(x) = \sum_{n=0}^{\infty} \frac{a_n}{n!}\,x^n$$

is called its **exponential generating function** (EGF). The $n!$ in the denominator is not decoration; it is designed for "labelled" structures, for reasons given in Section 3.

**Definition 4 (combinatorial class)** If a class of combinatorial objects has exactly $a_n$ objects of size $n$, then $A(x)$ is called the generating function of that class. For example, the class of "$n$-element subsets" has $a_n = \binom{m}{n}$ objects ($m$ fixed), and its generating function is $(1+x)^m$.

**Table of common expansions** (all understood as formal power series):

| Sequence $a_n$ | Generating function | Basis |
| $1$ | $\frac{1}{1-x}$ | Geometric series |
| $n$ | $\frac{x}{(1-x)^2}$ | Differentiate the geometric series and multiply by $x$ |
| $\binom{n+k}{k}$ | $\frac{1}{(1-x)^{k+1}}$ | Product of $k+1$ geometric series |
| $\frac{1}{n!}$ | $e^x$ | Taylor series of the exponential |
| $\frac{(-1)^n}{n!}$ | $e^{-x}$ | Replace $x$ by $-x$ above |
| $\frac{1}{n+1}\binom{2n}{n}$ | $\frac{1-\sqrt{1-4x}}{2x}$ | Solving a quadratic |

Also remember the **generalized binomial theorem**: for any real $\alpha$,

$$(1+x)^{\alpha} = \sum_{n\ge 0}\binom{\alpha}{n}x^n,\qquad \binom{\alpha}{n} = \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}.$$

When $\alpha$ is a negative integer $-k$, $\binom{-k}{n} = (-1)^n\binom{n+k-1}{k-1}$, which is the source of $\frac{1}{(1-x)^k}$ in the table.

## 3. Why Define It This Way

**Why multiplication rather than addition?** Because the most common construction of combinatorial objects is "concatenation": an object consists of a left and a right part whose sizes add to the size of the whole. If there are $a_k$ ways to build a left half of size $k$ and $b_{n-k}$ ways to build a right half of size $n-k$, then there are $\sum_k a_k b_{n-k}$ objects of size $n$. That is exactly the coefficient of a product. In other words, **the multiplication of generating functions is tailor-made for concatenation**.

An immediate example: choosing $r$ balls from $m$ red and $n$ blue, classified by the number $k$ of red ones, gives $\sum_k \binom{m}{k}\binom{n}{r-k}$ ways. On the other hand, choosing directly gives $\binom{m+n}{r}$. Algebraically $(1+x)^m(1+x)^n = (1+x)^{m+n}$, and comparing coefficients of $x^r$ on both sides immediately yields Vandermonde's identity. The proof uses only one thing: multiplying and comparing coefficients.

**Why divide by $n!$ in the EGF?** Because concatenating "labelled" structures first requires deciding which labels go to the left. Splitting $n$ labels into $k$ and $n-k$ can be done in $\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$ ways. This binomial coefficient is precisely a free gift of EGF multiplication: $\frac{1}{k!}\cdot\frac{1}{(n-k)!}$ multiplied by $n!$ is $\binom{n}{k}$. The coefficient of OGF multiplication is just $1$, which throws away the "choose the labels" information.

The counterexample makes the point: the number of permutations is $a_n = n!$. Its OGF is $\sum n!\,x^n$, which has no closed form and is nearly unusable; its EGF is $\sum \frac{n!}{n!}x^n = \frac{1}{1-x}$, incredibly clean. Choose the wrong generating function and a short problem becomes a long march.

**Why allow the series to diverge?** Because combinatorial counting cares only about coefficients, and convergence is a question for analysis. Insisting on convergence would exclude fast-growing sequences such as $n!$ and the Bell numbers—precisely the objects that most need generating functions. Addition, multiplication, differentiation, composition, and inversion of formal power series can all be defined purely algebraically, with no limits.

**Why adopt the convention $\binom{n}{k} = 0$ for $k<0$ or $k>n$?** It makes formulas hold automatically at the boundary and saves a great deal of casework. For instance Vandermonde's identity becomes $\sum_{k\in\mathbb{Z}}\binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}$, where $k$ runs over all integers and out-of-range terms vanish. Without the convention the summation limits must be written as $\max(0, r-n)$ to $\min(r, m)$—ugly and error-prone.

## 4. Intuition and Pictures

Think of a generating function as a **suitcase**: the sequence is a pile of clothes on the floor, and the generating function packs them into compartments by size. The suitcase is not the clothes, but you can carry it around—add, multiply, differentiate—and finally open it and take out the coefficient you want compartment by compartment. The formal power series is the suitcase and $x$ is the numbering system of the compartments.

**Translation table for basic operations**:

| Combinatorial operation | Generating function operation |
| Disjoint union: either class A or class B | $A(x) + B(x)$ |
| Ordered concatenation: A then B, sizes add | $A(x)B(x)$ |
| A sequence of A's of arbitrary length | $\frac{1}{1-A(x)}$ |
| Labelled splitting into A and B | $\hat{A}(x)\hat{B}(x)$ |
| Removing one element (size minus one) | Divide by $x$, or shift suitably |

Read a few familiar objects with this table. $\frac{1}{1-x} = 1 + x + x^2 + \cdots$ says "there is exactly one object of each size", for instance "a row of $n$ white balls". $\frac{1}{(1-x)^2}$ is the product of two $\frac{1}{1-x}$, with coefficients $n+1$, corresponding to the number of solutions of "two non-negative integers summing to $n$"—exactly the number of ways to put $n$ indistinguishable balls into 2 distinguishable boxes.

Now look at $\frac{1}{1-x-x^2}$. As a formal power series its coefficients are uniquely determined by $F_0 = 0$, $F_1 = 1$, $F_n = F_{n-1} + F_{n-2}$. But if you insist on treating it as a function and set $x = 1/10$, you get $\frac{0.1}{1 - 0.1 - 0.01} = \frac{0.1}{0.89}\approx 0.1124$, and $\sum F_n 10^{-n}$ really does converge to that value. The two viewpoints shake hands here, but the formal viewpoint is more widely applicable: it never needs to ask "may I substitute".

**A reminder**: a generating function is not the magic of "turning a sequence into a function and back"; it is an **encoding**. The quality of an encoding depends on whether it turns the operations you want to perform into easy algebraic operations. The OGF turns concatenation into multiplication; the EGF turns labelled concatenation into multiplication; that is their entire reason for existing.

## 5. Worked Examples

### Example 1 (basic: closed form for a linear recurrence)

Problem: let $a_0 = 2$, $a_1 = 5$, and $a_n = 5a_{n-1} - 6a_{n-2}$ for $n\ge 2$; find a closed form for $a_n$.

Analysis: "multiply the recurrence by $x^n$ and sum over $n\ge 2$"; the left side gives $A(x)$ minus the first two terms, and the right gives $5x$ times $A(x)$ minus its first term, minus $6x^2A(x)$. Solve for $A(x)$, then use partial fractions.

Solution: let $A(x) = \sum_{n\ge 0}a_nx^n$. From the recurrence,

$$\sum_{n\ge 2}a_nx^n = 5\sum_{n\ge 2}a_{n-1}x^n - 6\sum_{n\ge 2}a_{n-2}x^n.$$

Rewriting term by term: the left side is $A(x) - a_0 - a_1x$; the first term on the right is $5x\left(A(x) - a_0\right)$ and the second is $6x^2A(x)$. Hence

$$A(x) - 2 - 5x = 5x\left(A(x) - 2\right) - 6x^2A(x).$$

Collecting the $A(x)$ terms:

$$A(x)\left(1 - 5x + 6x^2\right) = 2 + 5x - 10x = 2 - 5x.$$

Factoring the denominator, $1 - 5x + 6x^2 = (1-2x)(1-3x)$, so

$$A(x) = \frac{2-5x}{(1-2x)(1-3x)} = \frac{1}{1-2x} + \frac{1}{1-3x}.$$

The last step can be checked directly: $\frac{(1-3x) + (1-2x)}{(1-2x)(1-3x)} = \frac{2-5x}{(1-2x)(1-3x)}$, which is correct. Then from $\frac{1}{1-cx} = \sum c^nx^n$ read off the coefficients:

$$a_n = 2^n + 3^n.$$

Check: at $n = 2$ the recurrence gives $5\cdot 5 - 6\cdot 2 = 13$, while $2^2 + 3^2 = 4 + 9 = 13$, consistent.

Comments: the two roots $2$ and $3$ of the denominator become the two bases of the closed form—the generating-function explanation of the "characteristic root method" for linear recurrences with constant coefficients. If the denominator has a repeated root, the partial fractions contain $\frac{1}{(1-cx)^2}$, corresponding to an extra factor $n$ in the closed form—which explains why the repeated-root case needs $n c^n$.

### Example 2 (intermediate: the EGF of derangement numbers)

Problem: $n$ letters and $n$ addressed envelopes are matched one to one; if no letter goes into its own envelope, how many arrangements are there? Call this number $D_n$ (the derangement number) and find a closed form.

Analysis: take an arbitrary permutation and split it by its "fixed points" (correctly placed letters): $k$ fixed points plus a derangement on the remaining $n-k$ elements. This is a splitting of a labelled structure, ideal for the EGF.

Solution: classify first by the number of fixed points. Choosing $k$ fixed points can be done in $\binom{n}{k}$ ways, and the other $n-k$ elements must all be deranged, in $D_{n-k}$ ways, hence

$$n! = \sum_{k=0}^{n}\binom{n}{k}D_{n-k},\qquad D_0 = 1.$$

Dividing both sides by $n!$:

$$1 = \sum_{k=0}^{n}\frac{1}{k!}\cdot\frac{D_{n-k}}{(n-k)!}.$$

The right side is exactly the coefficient of $x^n$ in the product of $e^x$ and $D(x) = \sum_{n\ge 0}\frac{D_n}{n!}x^n$. The left side is the EGF of the sequence $1,1,1,\dots$, namely $\frac{1}{1-x}$. So we get the functional equation

$$e^x D(x) = \frac{1}{1-x}\quad\Longrightarrow\quad D(x) = \frac{e^{-x}}{1-x}.$$

Expand: $e^{-x} = \sum_{k\ge 0}\frac{(-1)^k}{k!}x^k$ and $\frac{1}{1-x} = \sum_{j\ge 0}x^j$; multiplying,

$$\frac{D_n}{n!} = \sum_{k=0}^{n}\frac{(-1)^k}{k!}\quad\Longrightarrow\quad D_n = n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}.$$

Check: $D_1 = 1(1-1) = 0$; $D_2 = 2(1-1+\tfrac12) = 1$; $D_3 = 6(1-1+\tfrac12-\tfrac16) = 2$; $D_4 = 24(1-1+\tfrac12-\tfrac16+\tfrac1{24}) = 9$. The individual counts agree: the only derangements of three elements are the two 3-cycles.

Comments: the key to this problem is not computation but **recognizing the structure**. "Permutation = set of fixed points + derangement" is a set partition, and in the EGF language a set partition is multiplication. Using an OGF by mistake would treat $\sum_k\binom{n}{k}D_{n-k}$ as an ordinary convolution and write $\sum_n n!\,x^n = D(x)\cdot\frac{1}{1-x}$; the left side has no closed form and the equation cannot be solved—what is lost is precisely that binomial coefficient.

### Example 3 (advanced: Catalan numbers and a quadratic equation)

Problem: let $C_0 = 1$ and $C_{n+1} = \sum_{i=0}^{n}C_iC_{n-i}$ for $n\ge 0$; find a closed form for $C_n$.

Analysis: the right side is the convolution of $C$ with itself, exactly the coefficients of $C(x)^2$; multiplying by $x$ shifts the index by one. The recurrence thus becomes an algebraic equation.

Solution: let $C(x) = \sum_{n\ge 0}C_nx^n$. From the recurrence,

$$C(x) - C_0 = \sum_{n\ge 0}C_{n+1}x^{n+1} = x\sum_{n\ge 0}\left(\sum_{i=0}^{n}C_iC_{n-i}\right)x^n = xC(x)^2.$$

Substituting $C_0 = 1$ gives $C(x) - 1 = xC(x)^2$, that is

$$xC(x)^2 - C(x) + 1 = 0.$$

Treating this as a quadratic equation in $C(x)$, the quadratic formula gives

$$C(x) = \frac{1 \pm \sqrt{1-4x}}{2x}.$$

**Choosing the sign**: as a formal power series, $C(x)$ must have the constant term $C_0 = 1$. As $x\to 0$, the "$+$" sign has numerator tending to $2$ and denominator to $0$, so the expression diverges and cannot have a finite constant term; the "$-$" sign has numerator tending to $0$ with limit $1$, which is acceptable. Hence

$$C(x) = \frac{1-\sqrt{1-4x}}{2x}.$$

Now read off the coefficients. By the generalized binomial theorem, for $n\ge 1$,

$$\binom{1/2}{n} = \frac{(-1)^{n-1}}{2^{2n-1}\,n}\binom{2n-2}{n-1}.$$

(Check $n=1$: the right side is $\frac{1}{2}\binom{0}{0} = \frac12$ and the left is $\frac12$, consistent.) Hence

$$\binom{1/2}{n}(-4)^n = \frac{(-1)^{n-1}(-4)^n}{2^{2n-1}n}\binom{2n-2}{n-1} = -\frac{2}{n}\binom{2n-2}{n-1}.$$

So

$$\sqrt{1-4x} = 1 - \sum_{n\ge 1}\frac{2}{n}\binom{2n-2}{n-1}x^n,$$

and substituting into $C(x)$ and cancelling $2x$:

$$C(x) = \sum_{n\ge 1}\frac{1}{n}\binom{2n-2}{n-1}x^{n-1} = \sum_{m\ge 0}\frac{1}{m+1}\binom{2m}{m}x^m.$$

Therefore $C_n = \frac{1}{n+1}\binom{2n}{n}$. The first few values are $1, 1, 2, 5, 14, 42$.

Comments: three pitfalls. First, forgetting to fix the sign with $C_0 = 1$ when solving the quadratic and casually taking the "$+$" sign, which is not a power series. Second, writing $C(x) - 1$ as $C(x)$, so that the equation becomes $C = xC^2$ and everything is wrong. Third, forgetting that $x$ has already been divided out, shifting all indices by one. None is hard, but any one of them yields a wrong sequence that "looks like" the Catalan numbers.

The Catalan numbers are famous because they count many objects at once: the legal matchings of $n$ pairs of brackets, the shapes of binary trees with $n+1$ leaves, the triangulations of a convex $(n+2)$-gon, the lattice paths from $(0,0)$ to $(n,n)$ on $2n$ steps that never cross the diagonal, and the legal sequences of pushes and pops on a stack with $n$ elements. They satisfy the same recurrence, hence have the same generating function. **The generating function is their identity card**: different appearances, the same identity.

## 6. Common Errors and Pitfalls

- **Substituting a formal power series as a function.** Wrong: from $\sum 2^nx^n = \frac{1}{1-2x}$, assert the identity holds for all $x$. Why wrong: as an identity of functions it holds only for $|x| < \frac12$; at $x = 1$ the two sides are a divergent series and $-1$. Correct: distinguish clearly between "formal identity" and "functional identity"; combinatorial counting uses only the former.

- **Mixing up OGF and EGF.** Wrong: use ordinary generating functions for permutations, set partitions, and derangements, then complain that the coefficients do not match. Why wrong: concatenating labelled structures carries a factor $\binom{n}{k}$ that only the EGF generates automatically. Correct: first ask "are the objects labelled?"; labelled means EGF, unlabelled means OGF.

- **Wrong convolution index.** Wrong: writing $c_n$ as $\sum_{k=0}^{n}a_kb_k$ or $\sum_{k=0}^{n}a_kb_{n+k}$. Why wrong: $x^n$ in the product comes from $x^k\cdot x^{n-k}$, and the two indices must add to $n$. Correct: mark the exponents on paper before collecting.

- **Not checking the constant term after solving.** Wrong: taking $C = \frac{1+\sqrt{1-4x}}{2x}$ for the Catalan numbers. Why wrong: this diverges as $x\to 0$ and is not a power series. Correct: any formal power series solution must have a finite constant term; filter by taking $x\to 0$ or comparing the coefficients of $x^0$.

- **Mishandling repeated roots in partial fractions.** Wrong: splitting $\frac{1}{(1-x)^2(1-2x)}$ as $\frac{A}{1-x} + \frac{B}{1-2x}$. Why wrong: a repeated root requires a $(1-x)^2$ term, otherwise clearing denominators cannot match degrees. Correct: for a factor $(1-cx)^m$ write $\frac{A_1}{1-cx} + \cdots + \frac{A_m}{(1-cx)^m}$.

- **Forgetting the terms from the initial conditions.** Wrong: writing $A = 5xA - 6x^2A$ directly from $a_n = 5a_{n-1} - 6a_{n-2}$, which gives $A = 0$. Why wrong: the recurrence holds only for $n\ge 2$, so the $n = 0,1$ terms are missing. Correct: sum the recurrence "over $n\ge 2$", add $a_0 + a_1x$ on the left and $5a_0x$ on the right.

## 7. Summary and Mnemonic

Key points:

- The OGF encodes a sequence as a formal power series; $x^n$ is only the label "size $n$" and has nothing to do with convergence.
- Multiplication corresponds to convolution, hence to the concatenation of combinatorial objects; this is the source of every technique.
- The standard recipe for a linear recurrence: multiply by $x^n$ and sum → solve for $A(x)$ → partial fractions → read coefficients.
- Use the EGF (divide by $n!$) for labelled structures, because splitting labels carries binomial coefficients; use the OGF for unlabelled ones.
- The Catalan numbers satisfy $C = 1 + xC^2$, giving $C(x) = \frac{1-\sqrt{1-4x}}{2x}$ and $C_n = \frac{1}{n+1}\binom{2n}{n}$.
- One generating function can be the "identity card" of many combinatorial objects at once—its deepest use.

**Mnemonic: recurrence becomes equation, convolution becomes multiplication, the constant term decides the sign, the coefficient is the answer.**`,
  },

  'inclusion-exclusion': {
    chapter: 'Chapter 2 Inclusion–Exclusion and Pigeonhole',
    title: 'The Inclusion–Exclusion and Pigeonhole Principles',
    summary:
      'One corrects overcounting, the other guarantees existence—the two everyday tools of combinatorial reasoning.',
    keyPoints: [
      'Inclusion–exclusion: add singles, subtract pairs, add triples... alternating up to n-fold intersections',
      'Derangement number Dₙ/n! → 1/e; Euler\'s totient is also derived by inclusion–exclusion',
      'Pigeonhole: n+1 into n must collide; the averaging form is the continuous generalization',
      'Ramsey: R(3,3)=6; R(5,5) still unknown (43~48)',
    ],
    content: String.raw`

In a class of 40, 18 speak French, 12 speak German, and 5 speak both. How many speak at least one? Most people answer at once: $18 + 12 - 5 = 25$. Why subtract 5? Because the 5 who speak both were counted once among the 18 and again among the 12, so together they were counted twice; subtracting one copy makes each person counted exactly once.

Three sets are not so easy. For sets $A, B, C$, adding the three sizes counts the pairwise intersections twice, so they must be subtracted; but what about the common part $A\cap B\cap C$? It is added once in each single set (three times) and subtracted once in each pairwise intersection (three times), so its net contribution is $0$, when it should be $1$. So it must be added back once. This is the rhythm "add—subtract—add".

In general, the size of a union of $n$ sets alternates through "single intersections, double intersections, triple intersections, ...". This rule is the **inclusion–exclusion principle**. It solves the problem of "having overcounted, we must back up".

Complementing it is another weapon. Put $n+1$ pigeons into $n$ cages: however you do it, some cage holds at least two. This is the **pigeonhole principle**. It does not tell you which cage is crowded, only that one certainly is. One is responsible for exact correction, the other for existential assertions; together they are the two everyday legs of combinatorial reasoning.

The question posed at the start—how many integers from $1$ to $1000$ are divisible by none of $2$, $3$, $5$—will be answered by inclusion–exclusion in Section 4; and the claim that "among six people there are always three mutual acquaintances or three mutual strangers" will be proved rigorously in Section 5 using the strengthened pigeonhole principle.

## 2. Rigorous Definitions

**Theorem 1 (inclusion–exclusion, union form)** For finite sets $A_1, A_2, \dots, A_n$,

$$\left|\bigcup_{i=1}^{n}A_i\right| = \sum_{\emptyset\ne S\subseteq[n]}(-1)^{|S|+1}\left|\bigcap_{i\in S}A_i\right|,$$

where $[n] = \{1,2,\dots,n\}$ and the sum runs over all nonempty subsets $S$. Written out,

$$\left|\bigcup_{i=1}^{n}A_i\right| = \sum_i|A_i| - \sum_{i<j}|A_i\cap A_j| + \sum_{i<j<k}|A_i\cap A_j\cap A_k| - \cdots + (-1)^{n+1}|A_1\cap\cdots\cap A_n|.$$

**Theorem 2 (inclusion–exclusion, complement form)** With the same notation,

$$\left|\bigcap_{i=1}^{n}\overline{A_i}\right| = \sum_{S\subseteq[n]}(-1)^{|S|}\left|\bigcap_{i\in S}A_i\right|,$$

with the convention that for $S = \emptyset$, $\bigcap_{i\in\emptyset}A_i$ is the whole universe $X$, so the first term is $|X|$. This is the form most used in practice: what we usually want to count are the elements satisfying none of the properties.

**Theorem 3 (probability form)** If $A_1,\dots,A_n$ are events in a probability space, then

$$\Pr\left(\bigcup_{i=1}^{n}A_i\right) = \sum_{\emptyset\ne S\subseteq[n]}(-1)^{|S|+1}\Pr\left(\bigcap_{i\in S}A_i\right).$$

It is just Theorem 1 with both sides divided by the size of the sample space.

**Theorem 4 (pigeonhole principle, simple form)** If $N$ objects are placed in $k$ boxes and $N > k$, then some box contains at least two objects.

**Theorem 5 (pigeonhole principle, strengthened form)** If $N$ objects are placed in $k$ boxes, then some box contains at least $\lceil N/k\rceil$ objects, where $\lceil\cdot\rceil$ denotes the ceiling.

An equivalent statement of the strengthened form: if every box contains at most $q$ objects, the total is at most $kq$. The proof is a contradiction: suppose every box contains at most $\lceil N/k\rceil - 1$; then the total is at most $k(\lceil N/k\rceil - 1) < N$, a contradiction.

## 3. Why Define It This Way

**Why must the signs alternate?** Because the number of times each element is counted must cancel to exactly $1$. Suppose $x$ belongs to exactly $k$ of the sets $A_i$. The total number of times it is counted on the right is

$$\sum_{j=1}^{k}(-1)^{j+1}\binom{k}{j} = 1 - \sum_{j=0}^{k}(-1)^{j}\binom{k}{j} = 1 - (1-1)^k = 1,$$

using the binomial theorem $\sum_{j=0}^{k}(-1)^j\binom{k}{j} = (1-1)^k = 0$ for $k\ge 1$. If $k = 0$, the element belongs to no $A_i$ and is counted $0$ times, as it should be. So no matter how many sets contain $x$, the right side counts it exactly once—which is precisely the definition of the union size. **The alternation is not a convention but the only choice forced by the binomial theorem.**

**Why also the complement form?** Because in many problems the "good objects" are those satisfying none of several bad properties. For instance a derangement requires "letter $i$ is not in envelope $i$" for all $i$—that is, none of $n$ bad properties occurs. In the complement form the first term is the total $n!$, and the rest subtract and add back in turn—exactly the standard "total minus at least one bad property".

**Why is the pigeonhole principle "obvious" yet useful?** Its proof is one sentence: if every box holds at most one, the total is at most $k$, contradicting $N>k$. Its power comes not from depth but from **turning an existence question into a counting question**. You need not construct the crowded cage—just count and you know it exists.

**Counterexamples to the conditions.** The word "finite" in the inclusion–exclusion formula cannot be dropped. For countably many sets $A_1, A_2, \dots$ the alternating series may not converge at all and the formula fails. For example take $A_i$ to be the singleton sets of the natural numbers: the union is $\mathbb{N}$, and the alternating sum is meaningless. Likewise "strictly more objects than boxes" cannot be relaxed: $n$ objects into $n$ boxes can perfectly well be one per box, so the conclusion fails.

## 4. Intuition and Pictures

Think of inclusion–exclusion as **peeling labels**. Each element wears several labels, label $i$ meaning "belongs to $A_i$". The sum $\sum|A_i|$ counts all labels; subtracting $\sum|A_i\cap A_j|$ tears off one from each pair of simultaneous labels; adding back the triple labels... in the end each element keeps only one valid label, "I am in the union". It is like peeling an onion, layer by layer, until everyone is counted exactly once.

**Comparison of three approaches**:

| Situation | Consequence of direct addition | Inclusion–exclusion correction |
| Union of two sets | Intersection elements counted twice | Subtract the intersection once |
| Union of three sets | Triple elements added three times and subtracted three times, net zero | Add the triple intersection back once |
| Union of $n$ sets | An element of multiplicity $k$ is counted $2^k-1$ times | Alternate until exactly once |

Now compute the opening question. Let $A_2, A_3, A_5$ be the multiples of $2, 3, 5$ from $1$ to $1000$. By inclusion–exclusion,

$$\left|A_2\cup A_3\cup A_5\right| = 500 + 333 + 200 - 166 - 100 - 66 + 33 = 734,$$

where $166 = \lfloor 1000/6\rfloor$, $100 = \lfloor 1000/10\rfloor$, $66 = \lfloor 1000/15\rfloor$, $33 = \lfloor 1000/30\rfloor$. So the number not divisible by $2, 3,$ or $5$ is

$$1000 - 734 = 266$$

Note that $1000\cdot\frac12\cdot\frac23\cdot\frac45 = 266.67$, only slightly different from the exact $266$: the product formula of Euler's totient is exact only when $n$ is a multiple of $30$, and $1000$ is not, so one must do the inclusion–exclusion honestly.

**Geometric intuition for pigeonhole**: put $5$ points in a square of side $1$; then two of them are at distance at most $\frac{\sqrt2}{2}$. Proof: cut the square into four equal smaller squares of side $\frac12$; any two points inside one are at distance at most the diagonal $\frac{\sqrt2}{2}$; $5$ points into $4$ pieces means one piece contains two.

**From pigeonhole to Ramsey**: the pigeonhole principle asserts "some box is crowded"; Ramsey's theorem asserts "some region necessarily contains complete order". The former is the prototype of the latter, developed fully in Chapter 5.

## 5. Worked Examples

### Example 1 (basic: derangements)

Problem: $n$ letters and $n$ envelopes are matched one to one; if no letter goes into its own envelope, how many arrangements are there?

Analysis: let $X$ be all $n!$ permutations and $A_i$ the set of permutations in which letter $i$ goes into envelope $i$. We want $|\overline{A_1}\cap\cdots\cap\overline{A_n}|$.

Solution: first compute the sizes of the intersections. If $k$ specified letters are correctly placed, the remaining $n-k$ letters can be arranged arbitrarily, so

$$\left|A_{i_1}\cap\cdots\cap A_{i_k}\right| = (n-k)!.$$

There are $\binom{n}{k}$ ways to choose the $k$ indices, so by the complement form of inclusion–exclusion,

$$D_n = \sum_{k=0}^{n}(-1)^k\binom{n}{k}(n-k)! = n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}.$$

The first few values: $D_1 = 0$, $D_2 = 1$, $D_3 = 2$, $D_4 = 9$, $D_5 = 44$. Check $D_4$: $24(1 - 1 + \frac12 - \frac16 + \frac1{24}) = 24\cdot\frac{9}{24} = 9$, consistent with direct enumeration.

Dividing both sides by $n!$,

$$\frac{D_n}{n!} = \sum_{k=0}^{n}\frac{(-1)^k}{k!}\ \longrightarrow\ e^{-1}\approx 0.3679.$$

That is, even with an enormous number of letters, the probability that "not one is correctly placed" settles near $36.8\%$. This counterintuitive conclusion is exactly what inclusion–exclusion delivers.

Comments: this is the template for all inclusion–exclusion problems—write down the "bad properties", compute the sizes of intersections "satisfying several bad properties simultaneously", then alternate additions and subtractions. The intersections are easy to size because once several positions are fixed, the remaining elements are completely free.

### Example 2 (intermediate: counting surjections)

Problem: put $m$ distinct balls into $n$ distinct boxes with every box nonempty; how many ways are there ($m\ge n$)?

Analysis: without restriction there are $n^m$ ways. Let $A_i$ be the set of placements in which box $i$ is empty; we want the number where none of $n$ bad properties occurs.

Solution: if $k$ specified boxes must be empty, every ball can only go into the remaining $n-k$ boxes, giving $(n-k)^m$ placements. Hence

$$N = \sum_{k=0}^{n}(-1)^k\binom{n}{k}(n-k)^m.$$

Take $m = 4$, $n = 3$:

$$N = 3^4 - 3\cdot 2^4 + 3\cdot 1^4 - 1\cdot 0^4 = 81 - 48 + 3 - 0 = 36.$$

On the other hand the number of surjections equals $n!\,S(m,n)$, where $S(m,n)$ is a Stirling number of the second kind (the number of ways to split $m$ elements into $n$ nonempty unlabelled blocks). $S(4,3) = 6$, so $3!\cdot 6 = 36$, the same as the other count. (Here $0^4 = 0$; when $k = n$ and $m\ge 1$ the term really vanishes, because "all boxes empty" cannot accommodate any ball.)

Comments: this example combines inclusion–exclusion with the general strategy "relax the restriction first, then subtract the bad cases". Watch the $k = n$ term: $0^m$ is $0$ for $m\ge 1$, do not mistakenly write $1$. If $m = 0$, then $0^0$ is taken as $1$ by combinatorial convention and the formula remains correct ($1$ when $n = 0$, otherwise $0$).

### Example 3 (advanced: monotone subsequences and pigeonhole)

Problem: prove that among any $mn+1$ distinct real numbers in a row there is an increasing subsequence of length $m+1$ or a decreasing subsequence of length $n+1$.

Analysis: one of the most beautiful applications of the pigeonhole principle. The idea is to attach a pair of labels to each position: the length of the longest increasing subsequence ending there and the length of the longest decreasing subsequence ending there. If two positions had identical labels, we would get a contradiction.

Solution: let the numbers be $a_1, a_2, \dots, a_{mn+1}$, pairwise distinct. For each $i$ define

$$f_i = \text{length of the longest increasing subsequence ending at } a_i,\qquad g_i = \text{length of the longest decreasing subsequence ending at } a_i.$$

Clearly $1\le f_i\le mn+1$ and $1\le g_i\le mn+1$. Suppose for contradiction that there is no increasing subsequence of length $m+1$ and no decreasing subsequence of length $n+1$; then

$$1\le f_i\le m,\qquad 1\le g_i\le n.$$

So the pairs $(f_i, g_i)$ take at most $mn$ possible values, while there are $mn+1$ indices. By the pigeonhole principle there are $i<j$ with $(f_i,g_i) = (f_j,g_j)$.

Since $a_i\ne a_j$, only two cases arise.

- If $a_i < a_j$: append $a_j$ to the increasing subsequence of length $f_i$ ending at $a_i$, obtaining an increasing subsequence of length $f_i + 1$ ending at $a_j$, so $f_j\ge f_i + 1 > f_i$, contradicting $f_j = f_i$.
- If $a_i > a_j$: similarly, appending to the decreasing subsequence gives $g_j\ge g_i + 1 > g_i$, contradicting $g_j = g_i$.

Both cases contradict the assumption, so the conclusion follows.

Comments: the subtlety is "the labels must be pairwise distinct"—this is not obvious but follows from the distinctness of the $a_i$ plus "appending makes it longer". If equality were allowed, then when $a_i = a_j$ neither appending works and the proof breaks. Another common error is to define only one label (say the increasing one); that yields only a comparison of $m$ with $mn+1$ and never the "or decreasing" conclusion. **Two labels and one pigeonhole is the standard recipe for this kind of problem.**

## 6. Common Errors and Pitfalls

- **Subtracting only the pairwise intersections and forgetting to add back the triple.** Wrong: $|A\cup B\cup C| = |A|+|B|+|C| - |A\cap B| - |A\cap C| - |B\cap C|$. Why wrong: elements in the triple are added three times and subtracted three times, net $0$, when they should be counted once. Correct: add $+ |A\cap B\cap C|$, and alternate by $(-1)^{|S|+1}$ all the way to the $n$-fold intersection.

- **Confusing the signs of the union and complement forms.** Wrong: when counting "none of the bad properties occurs", writing $\sum(-1)^{|S|+1}|A_S|$. Why wrong: in the complement form the first term is the whole universe $|X|$ and the sign starts with $+$; the union form starts with single sets and also with $+$, but the two correspond to different combinatorial quantities. Correct: state clearly whether you are counting a union or a complement, then use the matching formula.

- **Reading "some box has two" as "the specified box has two".** Wrong: asserting "split 13 people over 12 months, so there must be two with birthdays in January". Why wrong: pigeonhole guarantees only that some month exists, not which. Correct: state the conclusion as "some month has at least two"; specifying it requires extra information.

- **Not rounding the average up.** Wrong: $100$ objects into $7$ boxes, assert "some box has at least $100/7$". Why wrong: counts are integers and $100/7\approx 14.28$, so the conclusion should be at least $15$ ($\lceil 100/7\rceil$). Correct: always round up in the strengthened form.

- **Computing intersection sizes wrongly in inclusion–exclusion.** Wrong: when fixing $k$ positions, also constraining the remaining $n-k$ elements not to satisfy bad properties. Why wrong: the intersection $A_{i_1}\cap\cdots\cap A_{i_k}$ requires only that these $k$ bad properties occur; the other positions are completely free. Correct: the remaining elements are unrestricted, giving counts like $(n-k)!$ or $(n-k)^m$.

- **Using "additive only when disjoint" incorrectly.** Wrong: writing $|A\cup B| = |A| + |B|$ for arbitrary sets. Why wrong: this holds only when $A\cap B = \emptyset$; in general the intersection is counted twice. Correct: in general subtract $|A\cap B|$—which is the starting point of inclusion–exclusion.

## 7. Summary and Mnemonic

Key points:

- Union form: add singles, subtract pairs, add triples, with signs $(-1)^{|S|+1}$, alternating up to the $n$-fold intersection.
- Complement form: start from $|X|$ with signs $(-1)^{|S|}$; the standard algorithm for "none of the bad properties occurs".
- Correctness rests on the binomial identity $\sum_{j=1}^{k}(-1)^{j+1}\binom{k}{j} = 1$, so each element is counted exactly once.
- Derangements $D_n = n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}$, with $D_n/n!\to e^{-1}$.
- Surjections $=\sum_{k=0}^{n}(-1)^k\binom{n}{k}(n-k)^m = n!\,S(m,n)$.
- Pigeonhole: $N$ into $k$ boxes forces some box to hold $\lceil N/k\rceil$; the strengthened form is the master key for existence proofs.
- Monotone subsequence theorem: $mn+1$ distinct reals contain an increasing subsequence of length $m+1$ or a decreasing one of length $n+1$.

**Mnemonic: unions alternate add and subtract, complements start from the whole; more pigeons than cages forces a pair in one cage.**`,
  },

  polya: {
    chapter: 'Chapter 3 Pólya Counting',
    title: 'Pólya Counting and Combinatorial Designs',
    summary:
      'Turn "identical up to rotation means count once" into a theorem: group actions plus Burnside\'s lemma bring symmetry into counting.',
    keyPoints: [
      'Group action → orbit = essentially different; orbit–stabilizer |G|=|Orb|·|Stab|',
      'Burnside\'s lemma: number of orbits = average number of fixed points',
      'Pólya\'s theorem: weight by cycle structure to count by categories',
      'Design theory: STS, projective planes—the mathematics of experiment design and coding',
    ],
    content: String.raw`

Colour the 6 beads of a necklace black or white: how many different necklaces are there? Ignoring symmetry, each bead has 2 choices, giving $2^6 = 64$. But the necklace can be rotated: rotating "BBWWWW" by one place gives the same necklace. Counting "identical up to rotation" as one, the answer is far below 64. What is it?

Worse is the cube: colour its 6 faces with two colours, counting "identical up to rotation" as one—how many? Here one may rotate about a face-centre axis, a vertex axis, or an edge-midpoint axis, and each kind of rotation imposes a different "must be the same colour" requirement. Brute-force enumeration of 64 colourings and then de-duplication quickly becomes a mess.

These problems share a structure: there is a **set of objects** (colourings), a **symmetry group** (rotations), and the group moves the objects around, with objects moved into one another regarded as the same. Mathematically, objects "moved into one another" form an **orbit**, and the problem becomes "count the orbits".

In 1875 Burnside gave an astonishingly simple formula: the number of orbits equals the average number of objects fixed by a group element. In 1937 Pólya refined it into a generating-function version that counts by colour composition. These two theorems turn symmetry from a nuisance into a tool: the more symmetry, the less work.

## 2. Rigorous Definitions

**Definition 1 (group action)** Let $G$ be a finite group and $X$ a finite set. If for each $g\in G$ a map $x\mapsto gx$ ($X\to X$) is given such that

1. $ex = x$ ($e$ the identity) for all $x\in X$;
2. $g(hx) = (gh)x$ for all $g,h\in G$ and $x\in X$,

then $G$ **acts** on $X$. The second condition requires that "apply $h$ then $g$" equals "apply the product $gh$", which guarantees that the group structure is really used and not just a loose collection of bijections.

**Definition 2 (orbit and stabilizer)** For $x\in X$, set

$$\operatorname{Orb}(x) = \{gx : g\in G\}\subseteq X,\qquad \operatorname{Stab}(x) = \{g\in G : gx = x\}\le G,$$

called the **orbit** and the **stabilizer** of $x$. The orbit is "all the places $x$ can be carried by the symmetry group"; the stabilizer consists of the group elements that carry $x$ back to itself and is a subgroup of $G$.

**Theorem 1 (orbit–stabilizer)** For any $x\in X$,

$$|G| = |\operatorname{Orb}(x)|\cdot|\operatorname{Stab}(x)|.$$

**Definition 3 (fixed-point set)** For $g\in G$ put

$$\operatorname{Fix}(g) = \{x\in X : gx = x\}.$$

**Theorem 2 (Burnside's lemma)** Let the finite group $G$ act on the finite set $X$ and let $N$ be the number of orbits; then

$$N = \frac{1}{|G|}\sum_{g\in G}|\operatorname{Fix}(g)|.$$

**Definition 4 (cycle index)** Decompose the permutation induced by $g$ on $X$ into disjoint cycles, and let $m_k(g)$ be the number of cycles of length $k$; then

$$Z(G) = \frac{1}{|G|}\sum_{g\in G}x_1^{m_1(g)}x_2^{m_2(g)}\cdots$$

is called the **cycle index** of $G$ acting on $X$.

**Theorem 3 (Pólya enumeration theorem)** Let each colour $c$ in a colour set $C$ carry weight $w(c)$. Group the colourings by orbit; then the sum of the orbit weights (all colourings in one orbit have the same weight) is

$$\sum_{\text{orbit}}w(\text{orbit}) = Z(G)\Big|_{x_k = \sum_{c\in C}w(c)^k}.$$

If all weights are taken as $w(c) = 1$, the right side reduces to $\frac{1}{|G|}\sum_g |C|^{c(g)}$, where $c(g)$ is the total number of cycles of $g$—which is Burnside's lemma.

## 3. Why Define It This Way

**Why does the orbit–stabilizer theorem hold?** Consider the map $\varphi: G\to\operatorname{Orb}(x)$, $\varphi(g) = gx$. It is surjective (the orbit is by definition all the $gx$). Which $g$ map to the same point? $\varphi(g) = \varphi(h)$ is equivalent to $gx = hx$, hence to $h^{-1}gx = x$, i.e. $h^{-1}g\in\operatorname{Stab}(x)$, which is equivalent to $g\in h\operatorname{Stab}(x)$. So the preimage of each image point is exactly a left coset, all of the same size $|\operatorname{Stab}(x)|$. Hence $|G| = |\operatorname{Orb}(x)|\cdot|\operatorname{Stab}(x)|$.

**Why is Burnside's lemma an "average"?** Count the pairs $(g,x)$ with $gx = x$ in two ways.

By $g$: for fixed $g$ there are $|\operatorname{Fix}(g)|$ such $x$, giving $\sum_g|\operatorname{Fix}(g)|$.

By $x$: for fixed $x$ the $g$ with $gx = x$ are exactly $\operatorname{Stab}(x)$, giving $\sum_x|\operatorname{Stab}(x)|$.

By orbit–stabilizer, $\sum_x|\operatorname{Stab}(x)| = \sum_x\frac{|G|}{|\operatorname{Orb}(x)|} = |G|\sum_{\text{orbits}}\sum_{x\in\text{orbit}}\frac{1}{|\text{orbit}|} = |G|\cdot N$. Equating the two gives $N = \frac{1}{|G|}\sum_g|\operatorname{Fix}(g)|$.

This proof reveals the real meaning of the formula: **each orbit contributes exactly $|G|$ to the total**, so dividing by $|G|$ gives the number of orbits. It is not "averaging and happening to be right" but "each orbit is counted exactly $|G|$ times".

**Why are there $|C|^{c(g)}$ colourings fixed by a given $g$?** Because $gx = x$ requires the colouring to be constant on each cycle of $g$: the points of a cycle are carried around by $g$, and for the whole to be invariant they must share a colour. Each cycle chooses a colour independently, giving $|C|^{c(g)}$. With weights, a cycle of length $k$ coloured $c$ contributes $w(c)^k$ (each of the $k$ points contributes once), so the weight of that cycle is $\sum_c w(c)^k$; multiplying gives the substitution $x_k = \sum_c w(c)^k$ in Pólya's formula.

**Counterexample to the conditions**: replace the "group" by an arbitrary set of bijections and the orbit–stabilizer theorem collapses. For example take $X = \{1,2,3,4\}$ and $S = \{e,\sigma\}$ where $\sigma = (1234)$ is a 4-cycle. $S$ is not closed ($\sigma^2\notin S$); then $|\operatorname{Orb}(1)| = 4$ and $|\operatorname{Stab}(1)| = 1$ while $|S| = 2$, so $2 = 4\cdot 1$ fails. If $G$ is only a semigroup, $h^{-1}$ does not exist and the coset argument breaks as well. **The group condition is not decoration; it is the premise that the preimages have equal size.**

## 4. Intuition and Pictures

Think of a group action as a **kaleidoscope**: $X$ is all possible patterns, $G$ the ways of turning the tube, and an orbit the family of patterns you see while turning. Counting orbits means counting "genuinely different patterns", not "the total number of photographs, one per angle".

An intuitive version of Burnside's lemma: let each group element $g$ vote, with a number of votes equal to the colourings it fixes; the total number of votes divided by the order of the group is the number of orbits. Why may we divide like this? Because the total number of times each orbit is "fixed" equals the order of the group—go around once and, in total, the elements fix each colouring the corresponding number of times.

**A complete ledger for colouring the four vertices of a square** (the best exercise for understanding the formula):

| Group element | Count | Cycle structure | Fixed colourings (2 colours) |
| Identity | 1 | $1^4$ | 16 |
| Rotate $90^\circ$, $270^\circ$ | 2 | $4^1$ | 2 |
| Rotate $180^\circ$ | 1 | $2^2$ | 4 |

Total $\frac{16 + 2\cdot 2 + 4}{4} = \frac{24}{4} = 6$. These 6 essentially different 2-colourings of a 4-cycle can be found by hand: 2 all-same, 2 with three of one colour, 1 with two adjacent pairs, 1 with two opposite pairs—6 in all, matching the formula.

**Right and wrong**:

| Method | Result | Problem |
| Direct $2^4$ | 16 | Counts rotations as different |
| $16/4$ | 4 | Orbit sizes need not equal 4, so direct division fails |
| Burnside average | 6 | Correct: each orbit contributes exactly the group order |

There is also a free **self-check**: the result of Burnside must be an integer. If you compute a fraction like $\frac{17}{4}$, do not recheck the algebra first; check whether some $|\operatorname{Fix}(g)|$ was miscounted—the number of orbits is an integer by nature, so the denominator must divide the numerator. This property is very useful in exams for locating an error at once.

## 5. Worked Examples

### Example 1 (basic: three-colouring the vertices of a square)

Problem: colour the 4 vertices of a square red, green, blue. If only rotations are allowed (no reflections), how many essentially different colourings are there? And if all symmetries are allowed (rotations and reflections)?

Analysis: the former group is the cyclic group $C_4$ of order 4, the latter the dihedral group $D_4$ of order 8. List the cycle structure of each element and apply Burnside.

Solution: **rotations only**. $C_4 = \{e, r, r^2, r^3\}$ acting on the 4 vertices:

- $e$: cycle structure $1^4$, fixes $3^4 = 81$ colourings;
- $r, r^3$: cycle structure $4^1$, all four vertices must share a colour, fixing $3$ each, $2\cdot 3 = 6$ in total;
- $r^2$: cycle structure $2^2$ (diagonal swap), fixes $3^2 = 9$.

$$N_{C_4} = \frac{81 + 6 + 9}{4} = \frac{96}{4} = 24.$$

**With reflections**. $D_4$ adds 4 reflections to $C_4$:

- 2 reflections in diagonals: fix 2 vertices and swap 2, cycle structure $1^2 2^1$, each fixes $3^3 = 27$, total $54$;
- 2 reflections in lines through opposite edge midpoints: swap two pairs of vertices, cycle structure $2^2$, each fixes $3^2 = 9$, total $18$.

$$N_{D_4} = \frac{81 + 6 + 9 + 54 + 18}{8} = \frac{168}{8} = 21.$$

Comments: the two answers differ (24 and 21), showing that **a larger group merges orbits**. In applications you must first decide what counts as the same: for a tile pattern with rotations only use $C_4$, with flipping allowed use $D_4$. This is the most error-prone step, more so than the computation itself.

### Example 2 (intermediate: a six-bead necklace and Pólya's formula)

Problem: colour 6 beads arranged in a regular hexagon black and white, allowing rotations (no reflections). (1) How many necklaces are there? (2) How many have exactly 3 black and 3 white beads?

Analysis: the group is $C_6$ with 6 rotations. Compute each cycle structure, then extract the coefficient by colour composition with Pólya's formula.

Solution: (1) the 6 elements of $C_6$ and their cycle structures:

- rotation by 0 (identity): $1^6$, fixes $2^6 = 64$;
- rotation by 1 or 5: a single 6-cycle $6^1$ each, fixing $2$, total $4$;
- rotation by 2 or 4: two 3-cycles $3^2$ each, fixing $2^2 = 4$, total $8$;
- rotation by 3: three 2-cycles $2^3$ (antipodal swaps), fixing $2^3 = 8$.

$$N = \frac{64 + 4 + 8 + 8}{6} = \frac{84}{6} = 14.$$

(2) Write the cycle index. Translating the table into a polynomial:

$$Z(C_6) = \frac{1}{6}\left(x_1^6 + 2x_6 + 2x_3^2 + x_2^3\right).$$

With two colours, set $x_k = b^k + w^k$ ($b$ for black, $w$ for white); the generating function of orbits by colour composition is

$$Z(C_6)\Big|_{x_k = b^k + w^k} = \frac{1}{6}\left((b+w)^6 + 2(b^6+w^6) + 2(b^3+w^3)^2 + (b^2+w^2)^3\right).$$

Extract the coefficient of $b^3w^3$ term by term:

- $(b+w)^6$: $\binom{6}{3} = 20$;
- $2(b^6+w^6)$: $0$;
- $2(b^3+w^3)^2 = 2(b^6 + 2b^3w^3 + w^6)$: coefficient $4$;
- $(b^2+w^2)^3 = b^6 + 3b^4w^2 + 3b^2w^4 + w^6$: $0$.

Hence the number of necklaces with exactly 3 black and 3 white beads is

$$\frac{20 + 0 + 4 + 0}{6} = 4.$$

Direct enumeration confirms it: reading clockwise, record the gaps between consecutive black beads (three gaps summing to 6); the possible patterns are only $1,1,4$ (three consecutive), $1,2,3$, $1,3,2$, and $2,2,2$ (alternating)—four types, matching the formula.

Comments: part (2) shows the power of Pólya over Burnside—Burnside gives only the total 14, while Pólya stratifies by "how many black, how many white". In the substitution $x_k = b^k + w^k$ the exponent $k$ must follow the cycle length; writing $x_k = b + w$ is the most common error.

### Example 3 (advanced: colouring the six faces of a cube)

Problem: colour the 6 faces of a cube black and white, counting rotations as the same; how many colourings are there?

Analysis: the rotation group of the cube has 24 elements in 5 classes. The key is to count the cycle structure of each class correctly, especially not to miss "rotation by $180^\circ$ about an axis through edge midpoints".

Solution: classify by rotation axis.

- **Identity**: 1 element, cycle structure $1^6$, fixes $2^6 = 64$.
- **About the centres of a pair of opposite faces, by $\pm 90^\circ$**: 3 pairs of opposite faces, 2 rotations each, 6 in all. The top and bottom faces are fixed and the 4 side faces rotate in a cycle, cycle structure $1^2 4^1$, each fixing $2^2\cdot 2 = 8$, total $48$.
- **About the centres of a pair of opposite faces, by $180^\circ$**: 3 elements. Top and bottom fixed, the 4 side faces swapped in pairs, cycle structure $1^2 2^2$, each fixing $2^2\cdot 2^2 = 16$, total $48$.
- **About a pair of opposite vertices, by $\pm 120^\circ$**: 4 body diagonals, 2 rotations each, 8 in all. The 6 faces split into two 3-cycles, cycle structure $3^2$, each fixing $2^2 = 4$, total $32$.
- **About a pair of opposite edge midpoints, by $180^\circ$**: 6 pairs of opposite edges, 6 elements. The 6 faces split into three 2-cycles, cycle structure $2^3$, each fixing $2^3 = 8$, total $48$.

Check the total number of elements: $1 + 6 + 3 + 8 + 6 = 24$, consistent with the order of the rotation group. Hence

$$N = \frac{64 + 48 + 48 + 32 + 48}{24} = \frac{240}{24} = 10.$$

Comments: the whole difficulty is the classification. Missing the last class (about edge midpoints) loses $48$ and gives $8$; mistaking the fixed count for a $90^\circ$ rotation as $2^2$ (thinking only top and bottom are free, forgetting that the four side faces must share a colour, leaving only 2 choices) is also wrong. **For each class ask two questions: how many cycles are there? how many points does each cycle force to share a colour?** The first sets the exponent, the second the base.

## 6. Common Errors and Pitfalls

- **Dividing the total by the group order.** Wrong: $2^4/4 = 4$. Why wrong: orbits need not have size $|G|$; colourings with more symmetry (such as all-same) have smaller orbits. Correct: use Burnside's average of fixed-point counts.

- **Miscounting the cycle structure.** Wrong: thinking a $90^\circ$ rotation about a face-centre axis fixes $2^2$ face colourings. Why wrong: the 4 side faces form a 4-cycle under $90^\circ$ and must all share a colour, giving 2 choices; with 2 each for top and bottom, that is $2^3 = 8$. Correct: draw the cycle decomposition on paper first, then count the cycles.

- **Choosing the wrong group.** Wrong: the problem says "identical up to rotation" but $D_4$ including reflections is used. Why wrong: a reflection corresponds to a mirror image in three dimensions, usually not allowed (unless the problem says faces may be flipped). Correct: list the allowed transformations, confirm they form a group, then compute.

- **Writing the Pólya substitution wrongly.** Wrong: setting $x_k = b + w$ for all $k$. Why wrong: a cycle of length $k$ means $k$ points share a colour, contributing $b^k$ or $w^k$, so $x_k = b^k + w^k$. Correct: the exponent must follow the cycle length.

- **Confusing "number of colourings" with "number of orbits".** Wrong: computing $\sum_g|\operatorname{Fix}(g)| = 240$ and reporting 240. Why wrong: that is the total number of (group element, colouring) pairs that are fixed; it must still be divided by $|G|$. Correct: divide by the group order at the end, and check that the result is an integer (a non-integer means something is wrong).

- **Forgetting to check that the group action is closed.** Wrong: casually taking "rotation by $90^\circ$ and some reflection" as the transformation set. Why wrong: such a set may not be a group, and the premises of orbit–stabilizer and Burnside fail. Correct: confirm closure under composition and inverses.

## 7. Summary and Mnemonic

Key points:

- A group action formalizes symmetry; an orbit is an equivalence class of "essentially the same", and counting orbits means counting essentially different configurations.
- Orbit–stabilizer: $|G| = |\operatorname{Orb}(x)|\cdot|\operatorname{Stab}(x)|$, proved by cosets.
- Burnside: number of orbits $=\frac{1}{|G|}\sum_g|\operatorname{Fix}(g)|$; the essence is that each orbit contributes $|G|$.
- The number of colourings fixed by $g$: with $k$ colours it is $k^{c(g)}$, where $c(g)$ is the number of cycles.
- The cycle index $Z(G)$ packs the cycle structure into a polynomial; Pólya's theorem substitutes $x_k = \sum_c w(c)^k$ to count by colour composition.
- Cube with two colours: $10$; square with three colours: $24$ with rotations only, $21$ with reflections; six-bead necklace with two colours: $14$, of which $4$ have three black and three white.

**Mnemonic: orbits equal the average number of fixed points, fixed counts follow the cycles; in the Pólya substitution the exponent follows the length, and the classification never goes wrong.**`,
  },
  'counting-identities': {
    chapter: 'Chapter 4 Combinatorial Identities',
    title: 'Combinatorial Identities and Combinatorial Interpretation',
    summary:
      'Count the same pile of things twice and the identity grows by itself: double counting, bijection, and generating functions are the three keys to proving combinatorial identities.',
    keyPoints: [
      'Double counting: the same set counted two ways must give equal results',
      'Pascal, absorption, Vandermonde, and hockey-stick are the four basic identities',
      'Prefer the combinatorial story: tell it clearly first, then write the algebra',
      'Σk²C(n,k)=n(n+1)2^(n-2) requires deciding whether chairman and secretary are the same person',
    ],
    content: String.raw`

Why is $\sum_{k=0}^{n}\binom{n}{k} = 2^n$? The quickest answer is the binomial theorem: set $x = 1$ in $(1+x)^n = \sum_k\binom{n}{k}x^k$; the right side becomes the sum of coefficients and the left becomes $2^n$. Three lines, airtight.

But it does not answer "why". $2^n$ is the total number of subsets of an $n$-element set (each element is either chosen or not), and $\binom{n}{k}$ is the number of $k$-element subsets. Classifying all subsets by size and adding certainly gives all subsets. **This explanation is not "another proof" but the "origin" of the same equation.**

The difference between the two proofs is worth savouring: the algebraic proof tells you "it is true", the combinatorial explanation tells you "why it is true". The former can be checked mechanically; the latter transfers to new problems, suggests new identities, and lets you re-derive the formula when you forget it.

There are two basic forms of combinatorial explanation. The first is **double counting**: count the same finite set in two ways, and the two results must agree, yielding an identity. The second is **bijection**: build a one-to-one correspondence between two seemingly different sets, so that their cardinalities are equal. Add the algebraic machine of generating functions and you have the three main roads for proving combinatorial identities.

This topic aims to build the habit of "seeing a formula and thinking of a story": every binomial coefficient is a choice, every summation is a classification, and the two sides of an identity are just two ways of naming the same batch of objects.

## 2. Rigorous Definitions

**Definition 1 (binomial coefficient)** For a non-negative integer $n$ and an integer $k$, $\binom{n}{k}$ denotes the number of $k$-element subsets of an $n$-element set, called a **binomial coefficient**. Explicitly,

$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}\quad(0\le k\le n),$$

with the convention $\binom{n}{k} = 0$ when $k<0$ or $k>n$. This "zero outside the range" convention lets sums run over all integers and gives formulas a uniform shape.

**Definition 2 (combinatorial identity)** An equation of the form

$$\sum_{k} a_k\binom{n}{k} = \sum_{j} b_j\binom{m}{j}$$

that holds for all non-negative integers satisfying the conditions is called a **combinatorial identity**. Its characteristic is that both sides count "some kind of choice", so there is usually a combinatorial story behind it.

**Definition 3 (double counting proof)** Let $S$ be a finite set. If method one computes $|S|$ as $A$ and method two computes $|S|$ as $B$, then $A = B$. This style of proof is called **double counting**.

**Definition 4 (bijective proof)** If there is a one-to-one correspondence $f: X\to Y$ between sets $X$ and $Y$, then $|X| = |Y|$. This style of proof is called a **bijective proof**.

**Definition 5 (generating function proof)** If both sides of an equation can be identified as coefficients of the same formal power series (or as two expansions of the same series), then comparing coefficients yields the identity.

**Table of basic identities** (all provable by combinatorial interpretation):

| Name | Identity | Combinatorial story |
| Symmetry | $\binom{n}{k} = \binom{n}{n-k}$ | Choosing $k$ is the same as leaving $n-k$ |
| Pascal | $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$ | Look at whether element $n$ is chosen |
| Absorption | $k\binom{n}{k} = n\binom{n-1}{k-1}$ | Designate one "representative" among the $k$ |
| Vandermonde | $\sum_{k}\binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}$ | Choose $r$ people from two groups |
| Hockey stick | $\sum_{i=r}^{n}\binom{i}{r} = \binom{n+1}{r+1}$ | Classify by the largest element |
| Row sum | $\sum_{k}\binom{n}{k} = 2^n$ | All subsets classified by size |
| Alternating sum | $\sum_{k}(-1)^k\binom{n}{k} = 0$ | As many odd subsets as even ones |
| Sum of squares | $\sum_{k}\binom{n}{k}^2 = \binom{2n}{n}$ | Choose $n$ people from two groups of $n$ |

## 3. Why Define It This Way

**Why is double counting legitimate?** Because it is only the formalization of the commonplace "compute the same number two ways". $|S|$ is a definite positive integer; method one gives the expression $A$ and method two gives $B$, and both equal $|S|$, so $A = B$. There is no approximation or limit—it is a direct consequence of finite counting. The only risk is that **the two methods do not actually count the same set**; that is a modelling error, not a logical one.

**When may you "divide"?** Double counting often appears as "each object is counted $d$ times", in which case you divide by $d$. This step has a premise: **every object must be counted the same number of times**. Counterexample: to find the average height of a class, if boys are counted twice and girls once, dividing by 2 is wrong. A typical combinatorial error is "count ordered pairs and divide by 2" when some objects have two equal components, so they were counted only once—dividing by 2 then undercounts.

**Why the convention $\binom{n}{k} = 0$?** Because identities are most fragile at the "boundary". For Vandermonde, without the zero convention the summation index must be restricted to $\max(0,r-n)\le k\le\min(r,m)$, making the formula bulky and easy to get wrong. With the convention, $k$ runs over all integers and the proof needs no casework. It is an investment: "trade definition for simplicity".

**Why is a combinatorial proof worth learning more than an algebraic one?** Algebraic proofs (induction, generating functions, mechanical summation) win on reliability and mechanizability; combinatorial proofs win on **explanatory power**. A combinatorial proof often yields generalizations at the same time. For instance the story "choose a committee from $n$ people and designate a chair" not only proves $\sum_k k\binom{n}{k} = n2^{n-1}$ but immediately generalizes to "designate a chair and a secretary" (corresponding to $k^2$) and "designate $j$ distinct officers" (corresponding to $k(k-1)\cdots(k-j+1)$). Once the story is clear, the generalization is free.

**Counterexample: something that looks like double counting but is not.** Someone "proves" $\sum_{k}\binom{n}{k} = n!$ on the grounds that "each subset corresponds to a permutation". This is wrong: no bijection exists between subsets and permutations ($n=2$ gives 4 on the left and 2 on the right). The error is not in double counting but in **claiming a bijection that was never constructed**. Every step of a combinatorial proof must point to a concrete correspondence.

## 4. Intuition and Pictures

Think of double counting as **two ledgers**: the same consignment of goods, recorded in one ledger by the warehouse (classified by type) and in another by accounts (classified by value). The totals must agree because they record the same goods. An identity is the mathematical statement "the two ledger totals are equal".

**Picture of Pascal's triangle**: each number equals the sum of the two numbers on its shoulders. This is not a coincidence but a direct projection of "look at whether the last element is chosen". Reading the triangle horizontally gives row sums $2^n$; reading it diagonally gives the hockey-stick identity; reading along the shallow diagonals gives Fibonacci numbers. Dozens of identities hide in one triangle, because they are all projections of the same combinatorial objects in different directions.

**The grammar of "telling a story"**:

| Component of the formula | Combinatorial meaning |
| $\binom{n}{k}$ | Choose $k$ from $n$ |
| Sum $\sum_k$ | Classify by some feature $k$ |
| Product $\binom{m}{k}\binom{n}{r-k}$ | Group first, then choose within groups |
| $2^n$ | Each element independently makes a binary choice |
| $k\binom{n}{k}$ | Choose $k$, then designate one of them |
| $\binom{n}{k}\binom{k}{j}$ | Choose $k$, then choose $j$ among them |

The last row deserves separate mention: $\binom{n}{k}\binom{k}{j}$ can also be read as "first choose $j$ core members, then fill up to $k$ from the remaining $n-j$", i.e. $\binom{n}{j}\binom{n-j}{k-j}$. Summing both sides over $k$ gives

$$\sum_{k}\binom{n}{k}\binom{k}{j} = \binom{n}{j}2^{n-j},$$

because after fixing $j$ core members, the other $n-j$ elements are each freely chosen or not.

The hockey-stick identity can be read with the same grammar: choose $r+1$ elements from $n+1$, classified by the "largest element". If the largest is the $(i+1)$-th, the other $r$ must be chosen from the first $i$, giving $\binom{i}{r}$; letting $i$ run from $r$ to $n$ and summing gives $\sum_{i=r}^{n}\binom{i}{r} = \binom{n+1}{r+1}$. This proof uses one action—classification—yet compresses a whole column of additions into one binomial coefficient.

## 5. Worked Examples

### Example 1 (basic: committee and chair)

Problem: prove that $\sum_{k=0}^{n}k\binom{n}{k} = n2^{n-1}$ for $n\ge 1$.

Analysis: the left side classifies by "committee size $k$", and $k\binom{n}{k}$ is "choose $k$ people and designate one as chair". The right side counts the same objects in a different order.

Solution: **combinatorial proof**. Consider all pairs $(C, p)$ where $C\subseteq[n]$ is a nonempty subset (the committee) and $p\in C$ (the chair).

By size: there are $\binom{n}{k}$ committees of size $k$, each with $k$ choices of chair, so the total is $\sum_{k=1}^{n}k\binom{n}{k}$ (the $k=0$ term is $0$, so we may sum from $0$).

By chair: choose the chair $p$ first, $n$ ways; each of the other $n-1$ people independently decides whether to join, $2^{n-1}$ ways. The total is $n2^{n-1}$.

Same objects, two counts, hence

$$\sum_{k=0}^{n}k\binom{n}{k} = n2^{n-1}.$$

**Algebraic check**: from the absorption identity $k\binom{n}{k} = n\binom{n-1}{k-1}$,

$$\sum_{k=0}^{n}k\binom{n}{k} = n\sum_{k=1}^{n}\binom{n-1}{k-1} = n\sum_{j=0}^{n-1}\binom{n-1}{j} = n2^{n-1}.$$

The two proofs confirm each other. Check with $n=4$: $0 + 1\cdot 4 + 2\cdot 6 + 3\cdot 4 + 4\cdot 1 = 4 + 12 + 12 + 4 = 32 = 4\cdot 2^3$, correct.

Comments: note the right side is $n2^{n-1}$, not $n2^n$—once the chair is fixed, only the remaining $n-1$ people are free. That $n-1$ is the easiest place to slip.

### Example 2 (intermediate: Vandermonde's identity)

Problem: prove that for $m, n, r\ge 0$,

$$\sum_{k=0}^{r}\binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}.$$

Analysis: the right side chooses $r$ people from $m+n$. Split the $m+n$ into two groups—$m$ men and $n$ women—and classify by the number $k$ of men chosen.

Solution: let $M$ be the set of men ($|M| = m$) and $W$ the set of women ($|W| = n$), with $M\cap W = \emptyset$. Choosing $r$ people from $M\cup W$ can be done in $\binom{m+n}{r}$ ways.

On the other hand, classify by "how many men were chosen". If $k$ men are chosen, then $r-k$ women must be chosen, in $\binom{m}{k}\binom{n}{r-k}$ ways. Here $k$ ranges from $0$ to $r$ (out of range the binomial coefficient is zero and contributes nothing). The total is $\sum_{k=0}^{r}\binom{m}{k}\binom{n}{r-k}$.

The two counts concern the same family of subsets, so the identity holds.

Check with $m = n = r = 2$: left $= \binom20\binom22 + \binom21\binom21 + \binom22\binom20 = 1 + 4 + 1 = 6$, right $= \binom42 = 6$, consistent.

**Special case**: taking $m = n = r$ and using the symmetry $\binom{n}{r-k} = \binom{n}{n-(r-k)} = \binom{n}{n-r+k}$, at $r = n$ we get

$$\sum_{k=0}^{n}\binom{n}{k}\binom{n}{n-k} = \sum_{k=0}^{n}\binom{n}{k}^2 = \binom{2n}{n}.$$

Comments: Vandermonde is the universal template for "split into groups, then classify". Its algebraic proof compares coefficients in $(1+x)^m(1+x)^n = (1+x)^{m+n}$—one line; but the combinatorial proof explains why the coefficients are exactly the distribution of "number of men". Both are worth knowing.

### Example 3 (advanced: sum of squares and "chair–secretary")

Problem: prove $\sum_{k=0}^{n}k^2\binom{n}{k} = n(n+1)2^{n-2}$ for $n\ge 1$.

Analysis: $k^2$ splits as $k(k-1) + k$, corresponding to "chair and secretary are different people" and "chair and secretary are the same person". Assuming at the outset that they differ loses the diagonal case—the trap in this problem.

Solution: **algebraic method**. Use $k^2 = k(k-1) + k$.

First term: by applying the absorption identity twice,

$$k(k-1)\binom{n}{k} = k\cdot n\binom{n-1}{k-1} = n(n-1)\binom{n-2}{k-2},$$

so

$$\sum_{k}k(k-1)\binom{n}{k} = n(n-1)\sum_{k}\binom{n-2}{k-2} = n(n-1)2^{n-2}.$$

The second term is $n2^{n-1} = 2n2^{n-2}$ by Example 1. Adding:

$$\sum_{k}k^2\binom{n}{k} = n(n-1)2^{n-2} + 2n2^{n-2} = n(n+1)2^{n-2}.$$

**Combinatorial method**. Consider triples $(C, p, q)$ where $C\subseteq[n]$ is nonempty and $p, q\in C$ are the chair and secretary, with $p = q$ allowed.

By committee size: there are $\binom{n}{k}$ committees of size $k$, and $k$ choices each for chair and secretary, $k^2$ in all; the total is the left side.

By "are the two the same person":

- $p = q$: choose this person ($n$ ways), the other $n-1$ join freely ($2^{n-1}$ ways), total $n2^{n-1}$;
- $p\ne q$: choose the chair ($n$), then the secretary ($n-1$), the other $n-2$ join freely ($2^{n-2}$), total $n(n-1)2^{n-2}$.

Summing gives $n2^{n-1} + n(n-1)2^{n-2} = n(n+1)2^{n-2}$, consistent with the algebra.

Check with $n=3$: left $= 0 + 1\cdot 3 + 4\cdot 3 + 9\cdot 1 = 24$; right $= 3\cdot 4\cdot 2 = 24$, consistent.

Comments: the trap is "allowing $p=q$". If chair and secretary are assumed distinct, the combinatorial method counts only $n(n-1)2^{n-2}$, short by $n2^{n-1}$; algebraically this corresponds to writing $k^2$ as $k(k-1)$. **On seeing $k^2$, think "ordered pair, possibly equal", then decide whether to subtract the diagonal.**

## 6. Common Errors and Pitfalls

- **The two sides of a double count actually count different objects.** Wrong: "prove" $\sum_k\binom{n}{k} = n!$ by "subsets correspond to permutations". Why wrong: for $n = 2$ the left is 4 and the right is 2—there is no bijection. Correct: write down the maps in both directions before the proof and verify they are mutually inverse.

- **Dividing by the multiplicity without checking it is constant.** Wrong: counting unordered pairs by counting ordered pairs and always dividing by 2, even when some pairs have equal components. Why wrong: objects on the diagonal were counted only once, so dividing by 2 undercounts. Correct: classify (equal / distinct) first, then handle each case.

- **Missing terms in the limits of a Vandermonde sum.** Wrong: summing only to $\min(m,r)$, or forgetting the lower bound on $k$. Why wrong: when $r>m$ or $r>n$ some values of $k$ still contribute. Correct: use the zero convention so $k$ runs over all integers, or write $\max(0,r-n)\le k\le\min(r,m)$ honestly.

- **Using the factorial formula for $\binom{n}{k}$ with $k>n$.** Wrong: writing $\binom{3}{5} = \frac{3!}{5!(-2)!}$. Why wrong: $(-2)!$ is undefined. Correct: remember the convention $\binom{n}{k} = 0$ for $k>n$ or $k<0$; do not substitute the factorial formula.

- **Differentiating both sides of an identity and substituting a boundary value without checking.** Wrong: differentiating $(1+x)^n$ and setting $x=1$ without saying why substitution is legitimate (it is a polynomial identity, so it is). Why wrong: if the two sides were infinite series, substitution might leave the radius of convergence. Correct: distinguish "polynomial identity" from "formal power series identity"; only the former permits free substitution.

- **Giving examples instead of a proof.** Wrong: verifying $n=1,2,3$ and declaring the identity proved. Why wrong: finitely many cases cannot cover infinitely many $n$. Correct: give a double count, a bijection, an induction, or a generating function proof.

## 7. Summary and Mnemonic

Key points:

- The essence of a combinatorial identity is "count the same objects twice"; double counting is the most direct proof.
- A bijective proof requires writing two mutually inverse maps; "feeling that they correspond" is not enough.
- Common identities: symmetry, Pascal, absorption, Vandermonde, hockey stick, row sum, alternating sum, sum of squares.
- On seeing $k\binom{n}{k}$ think "choose people and designate one"; on seeing $k(k-1)\binom{n}{k}$ think "designate two distinct people".
- On seeing $\binom{n}{k}\binom{k}{j}$ think "choose a large set then a subset", or read it backwards as "fix the core, then fill up".
- Before dividing by a multiplicity, confirm that every object is counted the same number of times.

**Mnemonic: count the same pile twice and the identity stands up on its own; choose then designate to see the order, and classify before dividing by two.**`,
  },

  'ramsey-theory': {
    chapter: 'Chapter 5 Ramsey Theory',
    title: "Ramsey's Theorem",
    summary:
      'No colouring is chaotic enough to avoid a monochromatic clique: from six people at a party to the unknown frontier of R(5,5), Ramsey theory studies the inevitable order inside disorder.',
    keyPoints: [
      'R(s,t): the least n such that every red-blue colouring of K_n contains a red K_s or a blue K_t',
      'R(3,3)=6, R(3,4)=9, R(4,4)=18; 43≤R(5,5)≤48',
      'The recurrence R(s,t)≤R(s-1,t)+R(s,t-1) ensures finiteness and gives an upper bound',
      'Probabilistic method: random colouring has expected monochromatic cliques below 1, giving R(s,s)>2^((s-1)/2)',
    ],
    content: String.raw`

Six people attend a party. Any two either know each other or do not. Prove that there must be three people who all know one another, or three people none of whom know one another.

Do not rush to compute; try a few configurations in your head first. You will find that no arrangement of the "acquaintance" network escapes the conclusion. Stranger still, five people do not suffice: arrange five people in a circle and let only neighbours know each other; then there is no triple of mutual acquaintances (the circle contains no triangle) and no triple of mutual strangers (among three non-adjacent people some pair is adjacent). So "six" is the exact threshold.

The abstract form of such questions: colour the edges of a complete graph red or blue; how many vertices are needed to guarantee a red $K_s$ or a blue $K_t$? This least number is written $R(s,t)$ and called a **Ramsey number**. The party problem is exactly $R(3,3) = 6$.

The spirit of Ramsey theory in one sentence: **sufficiently large disorder necessarily contains local order**. It does not tell you where the order is or what it looks like, only that it exists. This is akin to the pigeonhole principle but far deeper: pigeonhole guarantees "some box is crowded", Ramsey guarantees "some region is uniformly coloured".

In 1928 the young Frank Ramsey wrote down this theorem while discussing decidability in logic (the paper appeared in 1930). He probably did not expect that nearly a century later it would be one of the most active branches of combinatorics, with the simplest two-dimensional case $R(5,5)$ still unknown.

## 2. Rigorous Definitions

**Definition 1 (complete graph and edge colouring)** The **complete graph** $K_n$ on $n$ vertices has exactly one edge between every pair of distinct vertices. A **red-blue two-colouring** of the edges of $K_n$ assigns red or blue to each edge.

**Definition 2 (Ramsey number)** For positive integers $s, t\ge 2$, define $R(s,t)$ as the least positive integer $n$ with the property:

> Every red-blue two-colouring of the edges of $K_n$ necessarily contains a red $K_s$ ($s$ vertices pairwise joined by red edges) or a blue $K_t$.

If no such $n$ exists, set $R(s,t) = \infty$. Ramsey's theorem asserts that $R(s,t)$ is finite for all $s,t$.

**Equivalent statement (graph form)** $R(s,t)$ is the least $n$ such that every graph $G$ on $n$ vertices contains a clique of size $s$ (pairwise adjacent) or an independent set of size $t$ (pairwise non-adjacent). Viewing edges of $G$ as red and non-edges as blue makes the two statements equivalent. The graph form is more convenient in proofs.

**Definition 3 (multicolour and diagonal cases)** $R(s_1,\dots,s_k)$ is the least $n$ such that every $k$-colouring of the edges of $K_n$ contains a $K_{s_i}$ in some colour. When $s_1 = \cdots = s_k = s$ we write $R_k(s)$. Clearly $R(s,t) = R(t,s)$, by swapping the two colours.

**Theorem 1 (Ramsey, 1930)** For all $s,t\ge 2$, $R(s,t)$ exists and is finite, and satisfies the recurrence

$$R(s,t)\le R(s-1,t) + R(s,t-1).$$

**Theorem 2 (infinite version)** Every finite colouring of the edges of the complete graph $K_{\mathbb{N}}$ (vertices the natural numbers, every two joined) contains an infinite monochromatic complete subgraph.

**Theorem 3 (upper bound)** For $s,t\ge 2$,

$$R(s,t)\le \binom{s+t-2}{s-1}.$$

**Theorem 4 (probabilistic lower bound)** For $s\ge 3$,

$$R(s,s) > 2^{(s-1)/2}.$$

## 3. Why Define It This Way

**Why $R(1,t) = 1$ and $R(2,t) = t$?** These are the base cases of the recurrence. $R(1,t)$ requires a red $K_1$—a single vertex always counts as a red $K_1$—so $n=1$ suffices. $R(2,t)$ requires a red edge or a blue $K_t$: if $K_t$ has no red edge then all its edges are blue, giving a blue $K_t$ directly; while a fully blue $K_{t-1}$ has neither a red edge nor a blue $K_t$. Hence $R(2,t) = t$.

**Why does the recurrence hold?** Let $n = R(s-1,t) + R(s,t-1)$. Take any red-blue colouring of $K_n$ and any vertex $v$. The $n-1$ edges from $v$ split by colour into a red set $A$ and a blue set $B$, with

$$|A| + |B| = n - 1 = R(s-1,t) + R(s,t-1) - 1,$$

so at least one of $|A|\ge R(s-1,t)$ and $|B|\ge R(s,t-1)$ holds.

If $|A|\ge R(s-1,t)$: in the subgraph induced by $A$, by the definition of $R(s-1,t)$ there is either a blue $K_t$ (done) or a red $K_{s-1}$; the latter together with $v$, whose edges to it are all red, forms a red $K_s$.

If $|B|\ge R(s,t-1)$: symmetrically, either a red $K_s$ exists or a blue $K_{t-1}$, which together with $v$ forms a blue $K_t$.

Either way the required monochromatic clique is found, so $R(s,t)\le n$. **This proof gives existence and an upper bound at once**: $R$ cannot be infinite because the recurrence traps it below a finite number.

**Why is "least" important?** The definition of $R(s,t)$ requires **exactly** the least $n$. Knowing "some $n$ works" is mere existence; a Ramsey number is a sharp threshold, with a counterexample at $n-1$ and none at $n$. Proving $R(s,t)\le n$ requires only "n is enough"; proving $R(s,t)>n-1$ requires **constructing** a colouring of $K_{n-1}$ avoiding both red $K_s$ and blue $K_t$. Upper bounds come from reasoning, lower bounds from construction; both are needed.

**Why are lower bounds so hard?** Because $K_n$ has $\binom{n}{2}$ edges and $2^{\binom n2}$ colourings. For $n = 48$ this is about $10^{542}$, so enumeration is hopeless. The recurrence upper bound is also loose: $R(4,5)\le R(3,5)+R(4,4) = 14+18 = 32$ while the formula gives $\binom{7}{3} = 35$, yet the true value is $25$. **The gap between the bounds is the most famous landscape of Ramsey theory.**

**Counterexample to the conditions**: replace "complete graph" by an arbitrary graph and the theorem fails immediately—an edgeless graph contains neither red nor blue edges, so no conclusion for $s,t\ge 2$ can be drawn. "Complete" guarantees a colourable edge between every pair of vertices; it is the carrier of the whole theorem.

## 4. Intuition and Pictures

Think of a red-blue colouring as a **relationship network**: red edges mean "acquainted", blue edges "unacquainted". $R(s,t)$ asks: how many people are needed to guarantee either $s$ mutual acquaintances or $t$ mutual strangers? It is not about one particular party but about **all possible social relations**.

**Known exact values**:

| $(s,t)$ | $R(s,t)$ | Note |
| $(3,3)$ | $6$ | Six people at a party, the classic result |
| $(3,4)$ | $9$ | The next nontrivial value |
| $(3,5)$ | $14$ | Determined in 1955 |
| $(4,4)$ | $18$ | Determined in 1955 |
| $(4,5)$ | $25$ | Determined in 1995 |
| $(5,5)$ | between $43$ and $48$ | Still unknown |

The exact value of $R(5,5)$ is the holy grail of the field. Erdős had a famous metaphor: if aliens landed and demanded $R(5,5)$, humanity should throw all its computers at it; if they demanded $R(6,6)$, humanity should surrender.

**Intuition for the bounds**: the upper bound $\binom{s+t-2}{s-1}$ is a direct product of "recurrence + Pascal", growing like $4^s/\sqrt{s}$—crude but completely rigorous. The probabilistic lower bound gives only $2^{s/2}$, showing the true value grows at least like that. The two still differ exponentially—one of order $4^s$, the other $2^{s/2}$—and have barely improved in a century. That is itself a deep mystery.

**Right and wrong**:

| Statement | Correct? | Reason |
| Among six people there are three mutual acquaintances or three mutual strangers | Yes | $R(3,3)=6$ |
| Five also suffice | No | The pentagon colouring is a counterexample |
| $R(5,5)$ is about $2^{25}$ | No | It is known to lie between $43$ and $48$, far below $2^{25}$ |
| Ramsey's theorem guarantees existence but not location | Yes | It is a pure existence theorem |

## 5. Worked Examples

### Example 1 (basic: $R(3,3) = 6$)

Problem: prove $R(3,3) = 6$: among any six people there are three mutual acquaintances or three mutual strangers, while five do not suffice.

Analysis: the upper bound uses "pick one person, count five edges, pigeonhole three"; the lower bound uses the pentagon construction.

Solution: **upper bound**. Pick any person $v$; the relations with the other 5 are 5 edges. By the pigeonhole principle at least $\lceil 5/2\rceil = 3$ edges have the same colour. Assume $v$'s edges to $a, b, c$ are all red (the blue case is entirely symmetric).

Examine the three edges among $a, b, c$:

- If one of $ab, bc, ca$ is red, say $ab$, then $v, a, b$ are pairwise joined by red edges, forming a red triangle;
- If none is red, all three are blue, so $a, b, c$ form a blue triangle.

One of the two cases must occur, so $R(3,3)\le 6$.

**lower bound**. On the 5 vertices $0,1,2,3,4$ colour as follows: colour the edges of the pentagon $0-1-2-3-4-0$ red and the other 5 edges (the pentagram $0-2-4-1-3-0$) blue.

The red graph is $C_5$, which contains no triangle (the largest clique in $C_5$ has 2 vertices). The blue graph is also $C_5$ (the pentagram is isomorphic to the pentagon), likewise triangle-free. So this colouring has neither a red $K_3$ nor a blue $K_3$, showing $R(3,3) > 5$.

Hence $R(3,3) = 6$.

Comments: the upper bound contains the sentence most easily omitted: **"assume the three edges are red"**. This uses the red-blue symmetry and must be stated. The lower-bound construction must verify two things (no red triangle, no blue triangle); saying "obviously" is not acceptable, since one must also check that the pentagram really is a pentagon.

### Example 2 (intermediate: $R(3,4) = 9$)

Problem: prove $R(3,4) = 9$.

Analysis: the upper bound uses "pick a vertex, 8 edges, take 4 of one colour". The lower bound requires a colouring of $K_8$ with no red triangle and no blue $K_4$. This construction has a nice graph description: place 8 vertices on a cycle and take red edges to be "adjacent" and "antipodal".

Solution: **upper bound**. Let the edges of $K_9$ be red-blue coloured. Pick any vertex $v$; it has 8 edges, so by the pigeonhole principle at least 4 have the same colour. Assume $v$'s edges to $a,b,c,d$ are all red.

If any edge among $a,b,c,d$ is red, say $ab$, then $v,a,b$ form a red triangle—done. If no edge among $a,b,c,d$ is red, all 6 of those edges are blue and $a,b,c,d$ form a blue $K_4$—also done. Hence $R(3,4)\le 9$. (With 4 blue edges, swap red and blue; the conclusion is the same.)

**lower bound**. On the vertex set $\{0,1,\dots,7\}$ define the red edges as

$$E_{\text{red}} = \{\{i,i+1\}: i\in\mathbb{Z}_8\}\cup\{\{i,i+4\}: i\in\mathbb{Z}_8\},$$

that is an octagon plus 4 diameters, $8 + 4 = 12$ red edges; the remaining $\binom82 - 12 = 16$ edges are blue.

First prove **no red triangle**. By rotational symmetry it suffices to check vertex $0$, whose red neighbours are $1, 7, 4$. Among the three pairs: $1$ and $7$ differ by $2$ (mod 8), not a red edge; $1$ and $4$ differ by $3$, not red; $7$ and $4$ differ by $3$, not red. So $0$ lies in no red triangle; by symmetry no vertex does.

Now prove **no blue $K_4$**. A blue $K_4$ is a set of 4 vertices pairwise joined by no red edge, i.e. an independent set of size 4 in the red graph. The red graph contains the octagon $0-1-\cdots-7-0$, so a red independent set is an independent set of $C_8$. Take 4 pairwise non-adjacent vertices of $C_8$: between consecutive chosen vertices there must be at least one unchosen vertex, and 4 chosen vertices create 4 gaps while only 4 vertices remain unchosen, so each gap contains exactly one unchosen vertex—the chosen vertices must alternate, hence be $\{0,2,4,6\}$ or $\{1,3,5,7\}$. But $\{0,2,4,6\}$ contains the red edge $0-4$ and $\{1,3,5,7\}$ contains the red edge $1-5$ (an antipodal edge), so neither is independent. Contradiction.

Hence this colouring has neither a red $K_3$ nor a blue $K_4$, showing $R(3,4) > 8$. Combined with the upper bound, $R(3,4) = 9$.

Comments: neither verification in the lower bound can be replaced by "draw a picture and look". The absence of a red triangle uses vertex-transitivity (only one vertex need be checked); the absence of a blue $K_4$ uses the fact that $C_8$ has only two maximum independent sets, which requires the gap-counting argument above. **The whole value of a construction problem lies in the verification; an incomplete verification is no work at all.**

### Example 3 (advanced: an exponential lower bound by the probabilistic method)

Problem: prove that $R(s,s) > 2^{(s-1)/2}$ for $s\ge 3$.

Analysis: instead of constructing a colouring, colour **randomly** and show that the probability of a "bad colouring" is positive. This is the probabilistic method introduced by Erdős in 1947 and one of the most famous arguments in the history of combinatorics.

Solution: take $n = \lfloor 2^{(s-1)/2}\rfloor$ and colour each edge of $K_n$ independently red with probability $\frac12$ and blue with probability $\frac12$.

Let $X$ be the number of monochromatic $K_s$. For each $s$-element vertex set $S$, the probability that it is monochromatic is

$$\Pr(S \text{ monochromatic}) = 2\cdot\left(\frac12\right)^{\binom s2} = 2^{1-\binom s2},$$

since there are $\binom s2$ edges, each all-red or all-blue being one case. By linearity of expectation (independence is not needed),

$$\mathbb{E}[X] = \binom{n}{s}2^{1-\binom s2}.$$

Using $\binom{n}{s}\le \frac{n^s}{s!}$ and $n\le 2^{(s-1)/2}$:

$$\mathbb{E}[X]\le \frac{n^s}{s!}2^{1-\frac{s(s-1)}{2}}\le \frac{2^{\frac{s(s-1)}{2}}}{s!}\cdot 2^{1-\frac{s(s-1)}{2}} = \frac{2}{s!}.$$

For $s\ge 3$, $\frac{2}{s!}\le \frac{2}{6} = \frac13 < 1$.

An expectation below 1 means **there is at least one colouring with $X = 0$** (otherwise, if every colouring had $X\ge 1$, the expectation would be $\ge 1$). That colouring contains neither a red $K_s$ nor a blue $K_s$, so $R(s,s) > n$, that is

$$R(s,s)\ge n+1 > 2^{(s-1)/2}.$$

Comments: the probabilistic method proves only "there exists" and does not exhibit a colouring—the most commonly misunderstood point. Another misunderstanding is "expectation below 1 means most likely there is no monochromatic clique"—on the contrary, a small expectation only says "small on average", while the distribution may be large on a few colourings; all we need is that at least one colouring has zero, and that is guaranteed rigorously by the expectation being below 1. One more detail: $n$ was rounded down, so $n+1 > 2^{(s-1)/2}$ and the inequality in the conclusion remains strict $>$, not $\ge$.

## 6. Common Errors and Pitfalls

- **Reading $R(s,t)$ as "some $n$ works".** Wrong: proving $R(3,3)\le 100$ and then declaring $R(3,3) = 100$. Why wrong: $R$ is a minimum, and an upper bound is not the exact value. Correct: only an upper bound together with a lower bound (construction) pins down the exact value.

- **Proving only the upper bound without constructing a lower bound.** Wrong: proving "six always work" and asserting $R(3,3)=6$. Why wrong: one must also show five do not. Correct: the lower bound requires a concrete colouring, verified edge by edge.

- **Omitting the discussion of "edges among the three points" in the upper bound.** Wrong: from three red edges at $v$, declaring a red triangle found. Why wrong: one still needs a red edge among $a,b,c$. Correct: split into "some red edge exists" and "all are blue", concluding in each case.

- **Confusing "a monochromatic $K_s$" with "a $K_s$ of a specified colour".** Wrong: writing the definition of $R(s,s)$ as "there must be a red $K_s$". Why wrong: the definition requires a red $K_s$ **or** a blue $K_s$; the colour is not fixed. Correct: state the "or" explicitly.

- **Misusing "expectation below 1 implies probability below 1" in the probabilistic method.** Wrong: from $\mathbb{E}[X] < 1$ concluding, beyond $\Pr(X=0) > 0$, that $\Pr(X=0)$ is large. Why wrong: Markov's inequality gives only $\Pr(X\ge 1)\le \mathbb{E}[X]$, which yields existence but not a specific probability. Correct: use only the existence conclusion.

- **Believing $R(s,t)$ can be guessed continuously in $s$.** Wrong: from $R(3,3)=6$ and $R(4,4)=18$ guessing $R(5,5)=50$ or similar. Why wrong: Ramsey numbers grow very irregularly, with no simple recurrence between known values. Correct: quote only proved bounds.

## 7. Summary and Mnemonic

Key points:

- $R(s,t)$ is the least $n$ such that every red-blue colouring of $K_n$ contains a red $K_s$ or a blue $K_t$; it measures the critical scale of "order inside disorder".
- Basic values: $R(1,t)=1$, $R(2,t)=t$, $R(3,3)=6$, $R(3,4)=9$, $R(3,5)=14$, $R(4,4)=18$, $R(4,5)=25$.
- The recurrence $R(s,t)\le R(s-1,t)+R(s,t-1)$ gives both existence and an upper bound; unfolding it gives $R(s,t)\le\binom{s+t-2}{s-1}$.
- Lower bounds come from constructions: $R(3,3)>5$ uses the pentagon, $R(3,4)>8$ uses "octagon plus diameters".
- Probabilistic method: after random colouring the expected number of monochromatic $K_s$ is below 1, giving $R(s,s) > 2^{(s-1)/2}$.
- $R(5,5)$ is known only to lie between $43$ and $48$; computing the exact value remains an open problem.

**Mnemonic: six people force three of one colour, five edges can dodge it; upper bounds by recurrence, lower bounds by construction, and the gap between them is a century wide.**`,
  },

  designs: {
    chapter: 'Chapter 6 Combinatorial Designs',
    title: 'Block Designs and Finite Geometry',
    summary:
      'Make every two points share a block exactly once: block designs unify experimental layouts, projective planes, and error-correcting codes in one set of parameters.',
    keyPoints: [
      't-(v,k,λ): every t points lie in exactly λ blocks',
      'The two counting identities bk=vr and λ(v-1)=r(k-1)',
      'Fano plane 2-(7,3,1); STS(v) exists ⟺ v≡1,3 (mod 6)',
      'Fisher\'s inequality b≥v proved with the incidence matrix and eigenvalues',
    ],
    content: String.raw`

In 1850 Kirkman posed a seemingly harmless problem: a girls' school has 15 students; each day they walk in 5 groups of 3, and over 7 consecutive days **every two girls must be together in a group exactly once**. Is such an arrangement possible?

Count first. The 15 girls form $\binom{15}{2} = 105$ pairs; each group of 3 contributes $\binom{3}{2} = 3$ pairs; 5 groups a day contribute 15 pairs; 7 days contribute exactly $7\times 15 = 105$ pairs. The numbers match perfectly, which makes one believe the arrangement exists—but "the numbers match" has never been the same as "the construction exists".

The abstract form: there are $v$ points, and we choose some $k$-element subsets (called **blocks**) so that any $t$ points lie together in exactly $\lambda$ blocks. This is a $t$-$(v,k,\lambda)$ **block design**. Kirkman's problem is exactly a $2$-$(15,3,1)$ design, with the extra requirement that the blocks of the 7 days split into 7 "parallel classes" (each day's 5 groups disjoint and covering all 15 girls); this strengthened version is called a **resolvable design**.

Design theory looks like a puzzle but is in fact the skeleton of experimental science. An agronomist comparing $v$ varieties in plots of $k$ must ensure every two varieties appear together in a block equally often—that is a block design. A communications engineer constructing error-correcting codes wants any two codewords to agree in controlled positions—that is also a block design. A finite projective plane is a "geometry with only finitely many points", and its incidence structure is exactly a perfect symmetric design.

## 2. Rigorous Definitions

**Definition 1 ($t$-design)** Let $v, k, t, \lambda$ be positive integers with $t\le k\le v$. Let $X$ be a $v$-element set (the **point set**) and $\mathcal{B}$ a family of $k$-element subsets of $X$ (the **blocks**). If every $t$-element subset $T$ of $X$ is contained in exactly $\lambda$ blocks $B\in\mathcal{B}$, then $(X,\mathcal{B})$ is a $t$-$(v,k,\lambda)$ **design**.

- If the blocks are pairwise distinct, it is a **simple design**;
- A design with $t = 2$ is called a **block design** or **balanced incomplete block design** (BIBD), because every pair of points occurs equally often—hence "balanced";
- If the number of blocks $b$ equals the number of points $v$, it is a **symmetric design**.

**Definition 2 (parameters)** Write $b = |\mathcal{B}|$ for the number of blocks. For a point $x\in X$, let $r_x$ be the number of blocks containing $x$. In a design with $t\ge 2$ all $r_x$ are equal, written $r$ (see Section 3).

**Definition 3 (Steiner triple system)** A $2$-$(v,3,1)$ design is called a **Steiner triple system**, written $\mathrm{STS}(v)$: every pair of points lies in exactly one triple.

**Definition 4 (finite projective plane)** Let $q\ge 2$. A **finite projective plane of order $q$** is a $2$-$(q^2+q+1,\,q+1,\,1)$ design (equivalently, it satisfies "any two points determine a unique line, and any two lines meet in exactly one point"). Its parameters are

$$v = q^2+q+1,\qquad k = q+1,\qquad \lambda = 1,\qquad b = v,\qquad r = q+1.$$

For $q = 2$ we get the **Fano plane** with 7 points and 7 lines, the smallest projective plane.

**Definition 5 (finite affine plane)** Take the point set $\mathbb{F}_q^2$ ($q^2$ points) and the blocks to be all "lines" ($q$ points each); this gives a $2$-$(q^2,\,q,\,1)$ design, the **affine plane of order $q$**. Its parameters are $v = q^2$, $k = q$, $\lambda = 1$, $b = q^2+q$, $r = q+1$.

**Theorem 1 (basic counting identities)** For a $t$-$(v,k,\lambda)$ design,

$$bk = vr,\qquad \lambda\binom{v}{t} = b\binom{k}{t}.$$

For $t = 2$ the second is equivalent to $\lambda(v-1) = r(k-1)$.

**Theorem 2 (Fisher's inequality)** If a $2$-$(v,k,\lambda)$ design has $k<v$ and $b>0$, then $b\ge v$.

**Theorem 3 (existence of STS, Kirkman)** $\mathrm{STS}(v)$ exists if and only if

$$v\equiv 1 \text{ or } 3 \pmod 6.$$

## 3. Why Define It This Way

**Why require $\lambda$ to be constant?** Because "balance" is what distinguishes a design from an arbitrary family of sets. If we only required each block to have $k$ points without equal pair occurrences, any pile of triples would qualify and the theory would have no structure. A constant $\lambda$ means every point, every pair, and every $t$-tuple is treated equally, and this **symmetry** is why design theory yields strong conclusions. In statistical language: every comparison between two varieties takes place in equally many blocks, so the experiment is unbiased.

**Where do the two counting identities come from?** The first counts incidences $(x,B)$ with $x\in B$: by points it is $vr$ (each point lies in $r$ blocks), by blocks it is $bk$ (each block contains $k$ points), hence $vr = bk$.

The second counts pairs $(T,B)$ with $T\subseteq B$: by $T$ it is $\lambda\binom vt$ (each $T$ is contained in $\lambda$ blocks), by $B$ it is $b\binom kt$ (each block contains $\binom kt$ $t$-subsets). Equating gives the identity. **Without $\lambda$ constant the second expression cannot even be written**—that is exactly the role of that condition in the definition.

**Why is $r$ independent of the point?** Fix $x$ and count triples $(y,B)$ with $x,y\in B$: by $y$ there are $(v-1)\lambda$, by $B$ there are $r_x(k-1)$, so $r_x = \lambda(v-1)/(k-1)$, independent of $x$.

**Necessary conditions are not sufficient.** Take $v = 8$, $k = 3$, $\lambda = 1$. If a design existed, $r = \frac{1\cdot 7}{2} = 3.5$, not an integer—contradiction. So no $2$-$(8,3,1)$ design exists. The lesson: **parameters must pass divisibility tests, but passing them does not guarantee existence**. For example a projective plane of order $q = 6$ satisfies all divisibility conditions ($v = 43$, $k = 7$, $r = 7$, $b = 43$), yet is excluded by the Bruck–Ryser–Chowla theorem ($6\equiv 2\pmod 4$ and $6$ is not a sum of two squares); the plane of order $q = 10$ had to be excluded by large-scale computation. **Existence is the deepest pitfall in design theory.**

**Why does STS require $v\equiv 1,3\pmod 6$?** Each triple covers 3 pairs and each pair is covered once, so $3b = \binom v2$, i.e. $b = \frac{v(v-1)}{6}$ must be an integer, equivalent to $6\mid v(v-1)$. On the other hand, fixing a point $x$, the other $v-1$ points must pair up into triples containing $x$, so $v-1$ must be even, i.e. $v$ odd. Combining "$v$ odd" with "$3\mid v(v-1)$": for odd $v$, $v\equiv 1,3,5\pmod 6$; and $3\mid v(v-1)$ requires $v\equiv 0$ or $1\pmod 3$, excluding $v\equiv 5\pmod 6$. What remains is $v\equiv 1,3\pmod 6$. Kirkman proved sufficiency, so the existence question for STS is **completely settled**.

## 4. Intuition and Pictures

**The Fano plane** is the best model for understanding designs. Take 7 points and draw 7 "lines", each containing 3 points, with any two points on exactly one line. Its 7 blocks can be written as

$$\{1,2,4\},\ \{2,3,5\},\ \{1,3,6\},\ \{1,5,7\},\ \{2,6,7\},\ \{3,4,7\},\ \{4,5,6\}.$$

You can draw it like this: the triangle $123$ has vertices $1,2,3$, edge midpoints $4$ (on $12$), $5$ (on $23$), $6$ (on $13$), and centre $7$. Then the three sides $124, 235, 136$, the three medians $157, 267, 347$, and the circle through the midpoints $456$ form 7 lines, each with exactly 3 points. This figure has a famous property: **it cannot be drawn in the Euclidean plane using straight lines without crossings**—a circle must masquerade as a "line". That is the watershed between projective and Euclidean geometry.

**An STS is a triangle decomposition of a complete graph.** View the $v$ points as vertices of $K_v$ and each triple as a triangle in $K_v$. Every pair in exactly one triple is equivalent to every edge of $K_v$ lying in exactly one triangle. So an STS exists ⟺ the edges of $K_v$ can be partitioned into edge-disjoint triangles. This translation is extremely useful: $K_7$ has 21 edges, split into exactly 7 triangles—the Fano plane.

**Parameter comparison table**:

| Design | $v$ | $k$ | $\lambda$ | $b$ | $r$ |
| Fano plane $q=2$ | 7 | 3 | 1 | 7 | 3 |
| Affine plane $q=3$ | 9 | 3 | 1 | 12 | 4 |
| Projective plane $q=3$ | 13 | 4 | 1 | 13 | 4 |
| Kirkman STS(15) | 15 | 3 | 1 | 35 | 7 |
| Biplane $2$-$(11,5,2)$ | 11 | 5 | 2 | 11 | 5 |

Note the last row: $v = b = 11$ is a symmetric design with $\lambda = 2$; such designs are called **biplanes**. Their existence is not guaranteed by divisibility but requires an explicit construction.

**"Every point on $r$ lines, every line through $k$ points, any two points on one line"**—these three sentences are the whole axiom system of finite geometry. Replace "line" by "block" and "point" by "element" and geometry becomes design; conversely, any sufficiently symmetric design can be drawn as a kind of "geometry". That is where the name "finite geometry" comes from.

## 5. Worked Examples

### Example 1 (basic: parameters of the Fano plane and verification)

Problem: verify that the 7 triples above form a $2$-$(7,3,1)$ design and find $b, r$.

Analysis: check the definition item by item. $v = 7$, $k = 3$, $\lambda = 1$. We must verify: every block has 3 points; every pair of points lies in exactly one block.

Solution: the 7 blocks are

$$B_1=\{1,2,4\},\ B_2=\{2,3,5\},\ B_3=\{1,3,6\},\ B_4=\{1,5,7\},\ B_5=\{2,6,7\},\ B_6=\{3,4,7\},\ B_7=\{4,5,6\}.$$

Each block clearly contains 3 points. Now check the 21 pairs, split into those containing point 1 and those not.

Pairs containing 1, six in all: $12,14$ in $B_1$; $13,16$ in $B_3$; $15,17$ in $B_4$. Each exactly once.

Pairs not containing 1, fifteen in all: $23,25$ in $B_2$; $24$ in $B_1$; $26,27$ in $B_5$; $34,37$ in $B_6$; $35$ in $B_2$; $36$ in $B_3$; $45,46$ in $B_7$; $47$ in $B_6$; $56$ in $B_7$; $57$ in $B_4$; $67$ in $B_5$. Checking one by one, the 15 pairs are distinct and all covered.

So $(X,\mathcal{B})$ is a $2$-$(7,3,1)$ design. Parameters: $b = 7$; from $vr = bk$ we get $7r = 21$, so $r = 3$. The formula $r = \frac{\lambda(v-1)}{k-1} = \frac{6}{2} = 3$ gives the same.

Comments: verifying "each pair exactly once" cannot be done by spot-checking a few pairs. The reliable way is to **classify by whether a fixed point is included**, as above, ensuring all 21 pairs are covered without repetition. Also check $b$ and $r$ against the two identities—a quick way to catch a slip: if $vr\ne bk$, something was miscounted.

### Example 2 (intermediate: constructing STS(9) from an affine plane)

Problem: construct a $2$-$(9,3,1)$ design on $\mathbb{F}_3^2$ and verify the parameters.

Analysis: $\mathbb{F}_3 = \{0,1,2\}$ is the field with three elements (addition and multiplication mod 3). Take the 9 points $(x,y)$ and the blocks to be all "lines" $y = mx+b$ together with the vertical lines $x = c$.

Solution: the point set is $X = \mathbb{F}_3^2$ with 9 points. The blocks fall into two classes:

- non-vertical lines: $L_{m,b} = \{(x,\,mx+b) : x\in\mathbb{F}_3\}$ with $m, b\in\mathbb{F}_3$, $3\times 3 = 9$ of them;
- vertical lines: $V_c = \{(c,\,y) : y\in\mathbb{F}_3\}$ with $c\in\mathbb{F}_3$, 3 of them.

That is $b = 12$ blocks, each containing exactly 3 points.

**Any two points lie on exactly one line.** Let $P_1 = (x_1,y_1)$ and $P_2 = (x_2,y_2)$ with $P_1\ne P_2$.

- If $x_1 = x_2$: both lie on the vertical line $V_{x_1}$, and distinct vertical lines are disjoint (different $c$ give different point sets), so it is unique.
- If $x_1\ne x_2$: in $\mathbb{F}_3$ the difference $x_2 - x_1$ is invertible; let $m = (y_2-y_1)(x_2-x_1)^{-1}$ and $b = y_1 - mx_1$; then both points satisfy $y = mx+b$, i.e. both lie on $L_{m,b}$. Lines with the same slope $m$ are parallel (different $b$ means disjoint), so the line is unique.

Hence every pair of points lies in exactly one block, $\lambda = 1$.

Parameter check: $v = 9$, $k = 3$, $\lambda = 1$, $b = 12$. From $vr = bk$, $9r = 36$ so $r = 4$; from $\lambda(v-1) = r(k-1)$, $8 = 4\cdot 2$, which holds; and $\lambda\binom92 = 36 = 12\cdot\binom32 = 12\cdot 3$, also holds.

Comments: the beauty of this construction is that **it is geometry and design at once**. Each point lies on 4 lines (3 non-vertical lines of distinct slopes plus 1 vertical line), which is the geometric meaning of $r = 4$. A common error is treating $\mathbb{F}_3$ like ordinary integers when computing slopes, forgetting that $2 = -1$ and that division means multiplying by an inverse; in $\mathbb{F}_3$ the inverse of $2$ is $2$ (since $2\cdot 2 = 4\equiv 1$), and such details must be right.

### Example 3 (advanced: Fisher's inequality)

Problem: prove that if a $2$-$(v,k,\lambda)$ design has $k<v$ and $b>0$, then $b\ge v$.

Analysis: write "is the point in the block" as a matrix; then "any two points share exactly $\lambda$ blocks" becomes "all off-diagonal entries of the matrix product equal $\lambda$". Then use the rank inequality from linear algebra.

Solution: let the points be $x_1,\dots,x_v$ and the blocks $B_1,\dots,B_b$. Define the **incidence matrix** $M = (m_{ij})$ as the $v\times b$ matrix with

$$m_{ij} = \begin{cases}1, & x_i\in B_j,\\ 0, & x_i\notin B_j.\end{cases}$$

Consider the $v\times v$ matrix $MM^{T}$, whose $(i,j)$ entry is the inner product of the $i$-th and $j$-th rows of $M$, i.e. the number of blocks containing both $x_i$ and $x_j$.

- For $i = j$: the number of blocks containing $x_i$, namely $r$;
- For $i\ne j$: equal to $\lambda$.

Hence

$$MM^{T} = (r-\lambda)I + \lambda J,$$

where $I$ is the identity matrix and $J$ the all-ones matrix.

Find the eigenvalues of $MM^T$. The eigenvalues of $J$ are $v$ (on the vector $\mathbf{1}$) and $0$ (on $\mathbf{1}^{\perp}$, with multiplicity $v-1$). Therefore:

- on $\mathbf{1}$: $(r-\lambda) + \lambda v = r + \lambda(v-1)$, which by $\lambda(v-1) = r(k-1)$ equals $r + r(k-1) = rk$;
- on $\mathbf{1}^{\perp}$: $r-\lambda$, with multiplicity $v-1$.

Since $k<v$, the identity $\lambda(v-1) = r(k-1)$ gives $\frac{v-1}{k-1}>1$, so $r = \lambda\cdot\frac{v-1}{k-1} > \lambda$, i.e. $r-\lambda>0$. Thus all eigenvalues of $MM^T$, namely $rk>0$ and $r-\lambda>0$, are nonzero, $MM^T$ is invertible, and hence

$$v = \operatorname{rank}(MM^{T})\le \operatorname{rank}(M)\le \min(v,b)\le b.$$

So $b\ge v$.

Comments: the key is translating combinatorial conditions into a matrix equation. Three details cannot be skipped. First, $r>\lambda$ must be proved, otherwise $MM^T$ might be singular. Second, $\operatorname{rank}(MM^T)\le\operatorname{rank}(M)$ holds for any real matrix (the null space of $M$ is contained in that of $MM^T$). Third, $\operatorname{rank}(M)\le b$ because $M$ has only $b$ columns. Only all three together give $v\le b$. This also explains why symmetric designs ($b = v$) are so special: they make the inequality an equality, forcing the incidence matrix to be square and of full rank.

## 6. Common Errors and Pitfalls

- **Reading $\lambda$ as "the number of times each block occurs".** Wrong: saying "each block is shared by $\lambda$ points". Why wrong: $\lambda$ describes how many blocks contain **each $t$-element point set**, not how many points a block contains. Correct: remember "any $t$ points, exactly $\lambda$ blocks".

- **Reversing the counting identity.** Wrong: writing $\lambda\binom{k}{t} = b\binom{v}{t}$ instead of $\lambda\binom{v}{t} = b\binom{k}{t}$. Why wrong: the left side counts "$\lambda$ blocks per $t$-set", so the total should be proportional to the number of $t$-sets, $\binom vt$. Correct: re-derive by counting the same incidence set twice instead of memorizing.

- **Assuming divisibility of the parameters guarantees a design.** Wrong: seeing $v=8$, $k=3$, $\lambda=1$ and declaring a design exists. Why wrong: $r = \frac{\lambda(v-1)}{k-1} = 3.5$ is not an integer, so no design exists. Correct: first check that $r, b$ are integers, then consider deeper existence theorems; passing the parameter tests is only necessary.

- **Misremembering the projective plane parameters.** Wrong: writing the number of points of a projective plane of order $q$ as $q^2$. Why wrong: it is $q^2+q+1$; $q^2$ is the number of points of the affine plane. Correct: remember "projective = affine + the hyperplane at infinity", with $q+1$ extra points at infinity.

- **Forgetting the factor 3 when dividing edges for STS.** Wrong: from $\binom v2 = b$ concluding $b = v(v-1)/2$. Why wrong: a triple covers 3 pairs, so $3b = \binom v2$. Correct: first count how many pairs each block covers, then divide.

- **Confusing "simple design" with "general design".** Wrong: assuming blocks cannot repeat. Why wrong: the definition allows the same subset to appear as several blocks (multiplicity above 1); only a "simple design" forbids it. Correct: state "simple" explicitly when uniqueness is needed.

## 7. Summary and Mnemonic

Key points:

- A $t$-$(v,k,\lambda)$ design: $v$ points, block size $k$, every $t$ points in exactly $\lambda$ blocks.
- Two counting identities: $bk = vr$ and $\lambda\binom vt = b\binom kt$; for $t=2$ the latter becomes $\lambda(v-1) = r(k-1)$.
- The Fano plane is $2$-$(7,3,1)$: 7 points, 7 lines, 3 points per line, 3 lines per point.
- An STS is a triangle decomposition of $K_v$, existing if and only if $v\equiv 1,3\pmod 6$.
- Projective plane: $v = b = q^2+q+1$, $k = r = q+1$, $\lambda = 1$; affine plane: $v = q^2$, $k = q$, $b = q^2+q$.
- Fisher's inequality $b\ge v$: proved with the incidence matrix $MM^T = (r-\lambda)I + \lambda J$ and a rank inequality.
- Divisibility of parameters is necessary, not sufficient; existence questions may need deep number theory or computation.

**Mnemonic: any $t$ points in exactly $\lambda$ blocks, two ledgers give $b$ and $r$; Fisher says blocks are no fewer than points, and passing the parameters still may not exist.**`,
  },
};

export default map;
