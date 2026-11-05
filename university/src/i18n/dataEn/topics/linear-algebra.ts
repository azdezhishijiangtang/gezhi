import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'determinants': {
    chapter: 'Chapter 1 Determinants',
    title: 'Definition and Computation of Determinants',
    summary:
      'The determinant is a scalar invariant of a square matrix: geometrically a volume scaling factor, algebraically a criterion for the solvability of linear systems.',
    keyPoints: [
      'det is multilinear and alternating: swapping two rows changes the sign, proportional rows give 0',
      'Adding a multiple of one row to another leaves the determinant unchanged—the core simplification tool',
      'Expansion formula: an entry times its cofactor, summed over a row',
    ],
    content: String.raw`

You have surely solved a system of two linear equations. For instance, to solve
$$
\begin{cases} a_{11}x_1 + a_{12}x_2 = b_1 \\ a_{21}x_1 + a_{22}x_2 = b_2 \end{cases}
$$
elimination gives $x_1 = \frac{b_1 a_{22} - b_2 a_{12}}{a_{11}a_{22} - a_{12}a_{21}}$ and $x_2 = \frac{a_{11}b_2 - a_{21}b_1}{a_{11}a_{22} - a_{12}a_{21}}$. Notice that both fractions share the denominator $a_{11}a_{22} - a_{12}a_{21}$—the second-order determinant. When this number is 0, the system has either no solution or infinitely many, and no unique solution exists. In other words, this "determinant" is exactly the criterion for a unique solution.

Raise the viewpoint to geometry: in the plane, the signed area of the parallelogram spanned by $\vec{u}=(a_{11},a_{21})$ and $\vec{v}=(a_{12},a_{22})$ is precisely the value of this determinant. A negative area means the order of the two vectors is opposite to the orientation of the coordinate system. Extended to three and n dimensions, the determinant is the signed volume of the "parallelotope" spanned by n vectors. So the determinant plays two roles at once: algebraically a criterion for the solvability of linear systems, geometrically the (signed) factor by which a linear transformation scales volume.

This lecture answers: how is the determinant defined rigorously? What are the computational tricks? Why is it 0 when two rows are proportional? Afterwards you will be able to compute determinants up to order four by hand and understand their central place in matrix theory.

## 2. Rigorous Definitions

**Definition 1 (permutations and inversion number)** An ordered array formed from $1,2,\dots,n$ is called a permutation of order n. In a permutation, a pair of entries whose order is opposite to their size (the earlier one larger than the later one) is called an inversion. The total number of inversions is called the inversion number, written $\tau(\sigma)$. A permutation with an even inversion number is even; with an odd one, odd.

**Definition 2 (determinant of order n)** Let $A=(a_{ij})$ be a square matrix of order n. The determinant of $A$ is defined as
$$
\det A = \sum_{\sigma \in S_n} \operatorname{sgn}(\sigma) \prod_{i=1}^{n} a_{i,\sigma(i)}
$$
where $S_n$ is the set of all n! permutations of order n and $\operatorname{sgn}(\sigma) = (-1)^{\tau(\sigma)}$ is the sign of $\sigma$: $+1$ for even, $-1$ for odd. In other words, the determinant multiplies n entries taken from distinct rows and distinct columns, sums over all possible choices, and attaches signs according to the parity of each choice.

**The expansion viewpoint**. The second- and third-order cases can be written out:
$$
\begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}
$$
$$
\begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{vmatrix}
= a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32}
- a_{13}a_{22}a_{31} - a_{12}a_{21}a_{33} - a_{11}a_{23}a_{32}
$$

**Definition 3 (expansion along a row or column)** A determinant of order n can be reduced in order: deleting row i and column j leaves a determinant of order $n-1$, called the minor $M_{ij}$; with the sign $(-1)^{i+j}$ it is called the cofactor $A_{ij} = (-1)^{i+j}M_{ij}$. Then
$$
\det A = \sum_{j=1}^{n} a_{ij}A_{ij} \quad (\text{expanding along row } i)
= \sum_{i=1}^{n} a_{ij}A_{ij} \quad (\text{expanding along column } j)
$$
This splits a determinant of order n into a linear combination of n determinants of order $n-1$, the key to recursive reduction.

## 3. Why Define It This Way

**Why must the multiplied entries come from "distinct rows and distinct columns"?** The determinant measures the volume spanned by n column vectors. If some row picked an entry in the same column as another row, one basis vector would be used twice, the figure would degenerate to lower dimension, and the volume should be 0—the definition, taking only distinct columns, excludes exactly the degenerate case.

**Why attach signs by the parity of the permutation (alternation)?** This is the source of "signed volume". Swapping any two rows of a matrix swaps two vectors, flipping the orientation of the parallelotope: the volume's magnitude is unchanged but its sign reverses. This property forces the sign in front of each term to vary with the parity of the permutation; without signs the determinant would degenerate into a scalar that cannot reflect orientation, and the most important geometric meaning (the sign of the volume scaling) would be lost. Counterexample: if all terms were positive, $\begin{vmatrix}0&1\\1&0\end{vmatrix}$ would come out as 1, whereas swapping the standard basis vectors reverses orientation and the value should be $-1$.

**Why is the determinant 0 when two rows are proportional?** Proportional rows mean the two row vectors are linearly dependent, so the figure spanned by the n column vectors is flattened into an $(n-1)$-dimensional hyperplane, and the volume is of course 0. Algebraically: if row i = k × row j, then in each term $a_{i,\sigma(i)}a_{j,\sigma(j)}$ the condition $\sigma(i)\ne\sigma(j)$ guarantees the columns differ, but after swapping rows i and j the parity of the permutation flips and the terms cancel in pairs.

**Why is $\det(A^\mathsf{T})=\det A$?** Transposition turns rows into columns. The definition takes entries by rows, $a_{i,\sigma(i)}$; after transposition it takes them by columns, $a_{\sigma(i),i}$. Setting $\tau=\sigma^{-1}$, the summation still runs over all permutations and the sign is unchanged, so the value is the same. This shows that rows and columns play perfectly symmetric roles in the determinant—any property about "rows" holds for "columns" too.

## 4. Intuition and Pictures

**Geometric picture**: $\det A$ is the signed volume of the parallelotope into which the linear map A sends the unit cube. $\det A=2$ means volume is doubled; $\det A=-2$ means doubled with orientation reversed (like a mirror image); $\det A=0$ means space is flattened onto a lower-dimensional plane.

**Table of how row operations affect the determinant**:

| Row operation | Effect on the determinant |
|--------|----------------|
| Swap two rows | changes sign (multiply by −1) |
| Multiply a row by k | multiplies the determinant by k |
| Add k times one row to another | no change |
| Two rows equal / proportional | determinant is 0 |
| Some row all 0 | determinant is 0 |

**Analogy**: think of the determinant as a "signed volume meter". Adding a multiple of a row is like shearing a parallelogram along one side—base and height are unchanged, so the area is unchanged (shear transformations preserve area). This is the geometric root of "adding a multiple leaves it unchanged".

**Computational strategy**: first use row additions (type 3) to create as many zeros as possible in some row or column, then expand along that row or column to reduce the order. Creating zeros and reducing, repeatedly, is far faster than the n!-term formula.

## 5. Worked Examples

### Example 1 (Basic: direct computation by definition and properties)

Problem: compute $\begin{vmatrix} 1 & 2 & 0 \\ 3 & 1 & 2 \\ 0 & 4 & 1 \end{vmatrix}$.

Approach: the third column already has a zero; either create more zeros by row addition and expand along a column, or use the third-order diagonal rule. We demonstrate expansion.

Solution: expand along the first row:
$$
\begin{aligned}
\det A &= 1\cdot(-1)^{1+1}\begin{vmatrix}1&2\\4&1\end{vmatrix}
+ 2\cdot(-1)^{1+2}\begin{vmatrix}3&2\\0&1\end{vmatrix}
+ 0\cdot(-1)^{1+3}\begin{vmatrix}3&1\\0&4\end{vmatrix} \\
&= 1\cdot(1\cdot1 - 2\cdot4) - 2\cdot(3\cdot1 - 2\cdot0) + 0 \\
&= 1\cdot(-7) - 2\cdot 3 = -7 - 6 = -13
\end{aligned}
$$

Comment: expanding along the row or column with the most zeros is least work; here the first row's zero already removes one term.

### Example 2 (Intermediate: simplify by properties, then compute)

Problem: compute $\begin{vmatrix} 2 & 1 & 1 & 1 \\ 1 & 2 & 1 & 1 \\ 1 & 1 & 2 & 1 \\ 1 & 1 & 1 & 2 \end{vmatrix}$.

Approach: every row sums to 5—this is the "equal row sums" type. Trick: add columns 2, 3, 4 to column 1 (row addition, determinant unchanged), factor 5 out of column 1, then use row additions to eliminate the off-diagonal entries.

Solution: add columns 2, 3, 4 to column 1:
$$
\det A = \begin{vmatrix} 5 & 1 & 1 & 1 \\ 5 & 2 & 1 & 1 \\ 5 & 1 & 2 & 1 \\ 5 & 1 & 1 & 2 \end{vmatrix}
= 5\begin{vmatrix} 1 & 1 & 1 & 1 \\ 1 & 2 & 1 & 1 \\ 1 & 1 & 2 & 1 \\ 1 & 1 & 1 & 2 \end{vmatrix}
$$
Subtract the first row from the last three rows ($r_i \leftarrow r_i - r_1$):
$$
= 5\begin{vmatrix} 1 & 1 & 1 & 1 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{vmatrix}
= 5\cdot 1\cdot 1\cdot 1\cdot 1 = 5
$$

Comment: equal row or column sums is a high-frequency type; adding all columns into one and factoring out is the standard move. The result 5 also matches the "eigenvalue check" (the matrix has eigenvalues 5,1,1,1).

### Example 3 (Advanced: the Vandermonde determinant)

Problem: prove the Vandermonde formula $V(x_1,\dots,x_n)=\begin{vmatrix}1&1&\cdots&1\\ x_1&x_2&\cdots&x_n\\ \vdots&\vdots&\ddots&\vdots\\ x_1^{n-1}&x_2^{n-1}&\cdots&x_n^{n-1}\end{vmatrix} = \prod_{1\le i<j\le n}(x_j-x_i)$.

Approach: from the last column backwards, successively eliminate the higher powers using multiples of the neighbouring column, then factor out the terms $(x_n-x_k)$ column by column. Induction is clearest.

Solution: induct on n. For n=2, $\begin{vmatrix}1&1\\x_1&x_2\end{vmatrix}=x_2-x_1$ holds. Assume it for n-1 and consider order n: starting from the n-th column, subtract $x_1$ times the preceding column from each column (row addition, unchanged); then column k ($k\ge 2$) acquires the factor $(x_k-x_1)$, and the first row is 0 except for the first entry. Expanding along the first row leaves a Vandermonde determinant of order $n-1$, so by induction
$$
V = (x_2-x_1)(x_3-x_1)\cdots(x_n-x_1)\cdot V(x_2,\dots,x_n)
= \prod_{1\le i<j\le n}(x_j-x_i)
$$

Comment: the Vandermonde determinant is the ancestor of interpolation and discriminants. The trap is the sign—the product requires $i<j$ and the factor $(x_j-x_i)$; reversing the order multiplies everything by $(-1)^{\binom{n}{2}}$. When any two $x$ are equal the determinant is 0, corresponding to "two rows proportional".

## 6. Common Mistakes and Pitfalls

1. **Misusing the diagonal rule for third-order determinants**. Mistake: adding only the three main diagonals and forgetting to subtract the three anti-diagonals. Correct: three "sums" along the main diagonal direction minus three along the anti-diagonal direction, six terms in all. Higher orders cannot use the diagonal rule; expand or create zeros.
2. **Writing a row addition as "multiply a row by k and add it to another" and then factoring out k**. Mistake: believing $r_j\leftarrow r_j+k r_i$ multiplies the determinant by k. Why wrong: row addition does not change the determinant; only "multiplying a single row by k" does. Correct: row addition always preserves the determinant; factoring applies only when an entire row is scaled.
3. **Getting the cofactor sign $(-1)^{i+j}$ wrong during expansion**. Mistake: treating all terms as positive. Why wrong: the sign is determined by the parity of the row-plus-column index; omitting it flips every sign. Correct: compute the parity of $i+j$ first, positive when even, negative when odd.
4. **Confusing the minor $M_{ij}$ with the cofactor $A_{ij}$**. Mistake: expanding directly with $M_{ij}$ and no sign. Correct: the expansion uses the cofactor $A_{ij}=(-1)^{i+j}M_{ij}$.
5. **Treating the determinant as a linear function**. Mistake: writing $\det(A+B)=\det A+\det B$. Why wrong: the determinant is not linear in the matrix itself; counterexample $\det(I+I)=2^n\ne 1+1$. Correct: only $\det(AB)=\det A\det B$, $\det(kA)=k^n\det A$ and $\det(A^{-1})=1/\det A$ hold.

## 7. Summary and Mnemonic

Key points reviewed:
- definition: sum over all permutations, negative for odd and positive for even; order n has n! terms.
- three tools: swapping changes sign, factoring out a common factor, adding a multiple leaves it unchanged; proportional rows give 0.
- reduction: expand along a row or column, $\det A=\sum a_{ij}A_{ij}$, combined with creating zeros.
- important identities: $\det(A^\mathsf{T})=\det A$, $\det(AB)=\det A\det B$, $\det(kA)=k^n\det A$, $\det(A^{-1})=1/\det A$.

Mnemonic: **"Take one entry from distinct rows and columns, and sum with parity signs; additions leave it fixed, swaps reverse it, and zeros plus expansion reduce the order."**`,
    relatedProblemIds: ['p-det-1'],
  },
  'matrix-operations': {
    chapter: 'Chapter 2 Matrices and Their Operations',
    title: 'Matrix Operations, Inverses, and Elementary Transformations',
    summary:
      'Matrices are the algebraic language of linear transformations: addition, multiplication and transposition are the basic operations, the inverse is the "undo transformation", and elementary transformations are the tool for simplification and inversion.',
    keyPoints: [
      'Matrix multiplication is not commutative, but is associative and distributive; entry formula (AB)_{ij}=Σ a_{ik}b_{kj}',
      'The inverse A^{-1} satisfies AA^{-1}=I; invertible ⟺ det A≠0 ⟺ full rank',
      'Adjugate method A^{-1}=A*/det A; block formulas and (AB)^{-1}=B^{-1}A^{-1}',
      'Elementary transformations = row addition, scaling, swapping; equivalent to left multiplication by elementary matrices, central to inverses and rank',
      'The rank rank(A) is the order of the largest nonzero minor, and it determines the number of solutions',
    ],
    content: String.raw`

If a linear transformation is "kneading space"—rotating, stretching, shearing—then a matrix is the "instruction manual" recording that kneading. Two manuals can be stacked: first do transformation B, then A, and together they are AB. But watch the order: rotate then stretch usually differs from stretch then rotate—the geometric root of non-commutative matrix multiplication.

We learned function composition $f(g(x))$ in high school; matrix multiplication is its linear version. And the "inverse matrix" is the manual for "undoing the kneading": if A stretches a figure by 2, then $A^{-1}$ shrinks it back by 1/2. Not every transformation can be undone—one that flattens the plane onto a line (non-invertible) has no inverse.

This lecture connects three things: how to add, subtract and multiply matrices; what an inverse is and how to find it; and why elementary transformations are a universal simplification tool.

## 2. Rigorous Definitions

**Definition 1 (matrix)** A rectangular array of $m\times n$ numbers
$$
A = \begin{pmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & \ddots & \vdots \\ a_{m1} & \cdots & a_{mn} \end{pmatrix}
$$
is called an $m\times n$ matrix. The entry $a_{ij}$ sits in row i and column j.

**Definition 2 (addition and scalar multiplication)** Matrices of the same shape add entrywise: $(A+B)_{ij}=a_{ij}+b_{ij}$; scalar multiplication is $(kA)_{ij}=k a_{ij}$. Both are called linear operations and satisfy commutativity, associativity and distributivity.

**Definition 3 (multiplication)** If A is $m\times p$ and B is $p\times n$, then $C=AB$ is $m\times n$ with entry in row i, column j equal to
$$
c_{ij} = \sum_{k=1}^{p} a_{ik} b_{kj}
$$
that is, the (i,j) entry of C is the sum of products of row i of A with column j of B. Note that the number of columns of A must equal the number of rows of B.

**Definition 4 (transpose)** Interchanging rows and columns gives the transpose $A^\mathsf{T}$, with $(A^\mathsf{T})_{ij}=a_{ji}$.

**Definition 5 (inverse)** For a square matrix A, if a square matrix B satisfies $AB=BA=I$, then B is called the inverse of A, written $A^{-1}$, and A is called invertible (or nonsingular).

**Definition 6 (elementary transformations)** Three types: (1) swap two rows (columns); (2) multiply a row (column) by a nonzero constant; (3) add k times one row (column) to another. The corresponding square matrices are elementary matrices.

## 3. Why Define It This Way

**Why is multiplication "row times column" rather than entrywise?** Because a matrix represents the composition of transformations. Let A and B represent two linear transformations; the matrix of the composite in a basis must be $c_{ij}=\sum_k a_{ik}b_{kj}$, computed by applying "B first, then A" to basis vectors—the same idea as function composition. Entrywise multiplication would lose the structure of composition.

**Why is matrix multiplication not commutative?** Geometrically, rotating 90° then stretching the x-axis differs from stretching then rotating. Algebraically, AB requires the columns of A to match the rows of B, while BA may not even be defined. Counterexample: $\begin{pmatrix}0&1\\0&0\end{pmatrix}\begin{pmatrix}1&0\\0&0\end{pmatrix}=\begin{pmatrix}0&0\\0&0\end{pmatrix}$, whereas in the other order it equals $\begin{pmatrix}0&1\\0&0\end{pmatrix}$, plainly different.

**Why require $AB=BA=I$ on both sides?** One side alone is not enough: one-sided inverses exist for non-square or singular situations. For square matrices $AB=I$ automatically implies $BA=I$ (provable), but writing both sides in the definition is safest and emphasizes uniqueness of the inverse.

**Why three types of elementary transformation?** They correspond to "left-multiplying the matrix by an elementary matrix". Every invertible matrix factors into a product of elementary matrices, so elementary transformations are the "atomic operations of matrix algebra"—inversion, rank and solving systems all rely on them.

## 4. Intuition and Pictures

**Analogy: function composition**. Matrix multiplication ≈ function composition, inverse matrix ≈ inverse function, identity matrix I ≈ identity function.

**Table of operation rules**:

| Property | Formula |
|------|------|
| Associativity | $(AB)C = A(BC)$ |
| Distributivity | $A(B+C)=AB+AC$ |
| Transpose | $(AB)^\mathsf{T}=B^\mathsf{T}A^\mathsf{T}$, $(A^\mathsf{T})^\mathsf{T}=A$ |
| Inverse | $(AB)^{-1}=B^{-1}A^{-1}$, $(A^{-1})^{-1}=A$, $(A^\mathsf{T})^{-1}=(A^{-1})^\mathsf{T}$ |
| Determinant | $\det(AB)=\det A\det B$, $\det(A^{-1})=1/\det A$ |

**Caution**: in general $AB\ne BA$; $(A+B)^{-1}\ne A^{-1}+B^{-1}$ (usually false); $AB=0$ does not imply $A=0$ or $B=0$ (singular matrices can cancel).

## 5. Worked Examples

### Example 1 (Basic: applying the definition to compute products)

Problem: let $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, $B=\begin{pmatrix}0&1\\1&0\end{pmatrix}$. Find AB and BA.

Approach: use the row-times-column formula directly.

Solution:
$$
AB = \begin{pmatrix}1\cdot0+2\cdot1 & 1\cdot1+2\cdot0\\ 3\cdot0+4\cdot1 & 3\cdot1+4\cdot0\end{pmatrix}
= \begin{pmatrix}2&1\\4&3\end{pmatrix}
$$
$$
BA = \begin{pmatrix}0\cdot1+1\cdot3 & 0\cdot2+1\cdot4\\ 1\cdot1+0\cdot3 & 1\cdot2+0\cdot4\end{pmatrix}
= \begin{pmatrix}3&4\\1&2\end{pmatrix}
$$

Comment: AB≠BA; this example visually confirms non-commutativity.

### Example 2 (Intermediate: inverse by the adjugate)

Problem: find the inverse of $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$.

Approach: the second-order inverse has the formula $A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$, which comes from the adjugate $A^*$.

Solution: $\det A = 1\cdot4-2\cdot3 = -2\neq 0$, so A is invertible.
$$
A^{-1} = \frac{1}{-2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix}
= \begin{pmatrix}-2&1\\3/2&-1/2\end{pmatrix}
$$
Check: $AA^{-1}=\begin{pmatrix}1&2\\3&4\end{pmatrix}\begin{pmatrix}-2&1\\3/2&-1/2\end{pmatrix}=\begin{pmatrix}1&0\\0&1\end{pmatrix}$.

Comment: for second order use the formula directly; for higher order the elementary row operations $(A\mid I)\to(I\mid A^{-1})$ are safer.

### Example 3 (Advanced: inverse by elementary row operations)

Problem: use elementary row operations to invert $A=\begin{pmatrix}1&1&1\\0&2&1\\0&0&3\end{pmatrix}$.

Approach: form the augmented matrix $(A\mid I)$ and use row operations only to turn the left half into I; the right half is then the inverse.

Solution:
$$
\left(\begin{array}{ccc|ccc}
1&1&1&1&0&0\\0&2&1&0&1&0\\0&0&3&0&0&1
\end{array}\right)
\xrightarrow{r_3\leftarrow r_3/3}
\left(\begin{array}{ccc|ccc}
1&1&1&1&0&0\\0&2&1&0&1&0\\0&0&1&0&0&1/3
\end{array}\right)
$$
$$
\xrightarrow{r_2\leftarrow r_2-r_3,\ r_1\leftarrow r_1-r_3}
\left(\begin{array}{ccc|ccc}
1&1&0&1&0&-1/3\\0&2&0&0&1&-1/3\\0&0&1&0&0&1/3
\end{array}\right)
\xrightarrow{r_2\leftarrow r_2/2}
\left(\begin{array}{ccc|ccc}
1&1&0&1&0&-1/3\\0&1&0&0&1/2&-1/6\\0&0&1&0&0&1/3
\end{array}\right)
$$
$$
\xrightarrow{r_1\leftarrow r_1-r_2}
\left(\begin{array}{ccc|ccc}
1&0&0&1&-1/2&-1/6\\0&1&0&0&1/2&-1/6\\0&0&1&0&0&1/3
\end{array}\right)
$$
Hence $A^{-1}=\begin{pmatrix}1&-1/2&-1/6\\0&1/2&-1/6\\0&0&1/3\end{pmatrix}$.

Comment: the trap is to use row operations only and never mix in column operations; inverting an upper triangular matrix is especially fast because it only needs back-substitution.

## 6. Common Mistakes and Pitfalls

1. **Assuming matrix multiplication commutes**. Mistake: believing AB=BA. Correct: except in special cases (commuting matrices) it generally fails; never reorder terms involving AB at will.
2. **Writing $(AB)^{-1}$ as $A^{-1}B^{-1}$**. Mistake: wrong order. Correct: $(AB)^{-1}=B^{-1}A^{-1}$ (the order of inverses is reversed).
3. **$(A+B)^{-1}=A^{-1}+B^{-1}$**. Mistake: there is no such distributivity for inverses. A random second-order matrix refutes it. Correct: to invert a sum, add first then invert, or use an identity.
4. **Confusing $A^\mathsf{T}$ (transpose) with $A^{-1}$ (inverse)**. Mistake: assuming $A^\mathsf{T}=A^{-1}$. Correct: only orthogonal matrices satisfy $A^\mathsf{T}=A^{-1}$; in general the two are unrelated. Transposition swaps rows and columns; inversion undoes a transformation.
5. **Mixing row and column operations when inverting**. Mistake: doing both on $(A\mid I)$. Correct: use only one kind (usually row operations); column operations destroy the conclusion that the right half is the inverse.
6. **Ignoring the necessary and sufficient condition for invertibility**. Mistake: forcing an inverse for a singular matrix. Correct: compute $\det A$ first; if $\det A=0$ it is not invertible (singular).

## 7. Summary and Mnemonic

Key points reviewed:
- multiplication: row times column, $(AB)_{ij}=\sum_k a_{ik}b_{kj}$; not commutative but associative and distributive.
- invertible ⟺ $\det A\ne0$ ⟺ full rank; the inverse is unique, $A^{-1}A=I$.
- two ways to invert: the adjugate $A^{-1}=A^*/\det A$ (low order); elementary row operations $(A\mid I)\to(I\mid A^{-1})$ (general).
- three types of elementary transformation, corresponding to left multiplication by elementary matrices; a unified tool for inverses, rank and solving systems.
- important: $(AB)^{-1}=B^{-1}A^{-1}$, $(AB)^\mathsf{T}=B^\mathsf{T}A^\mathsf{T}$.

Mnemonic: **"Rows times columns, never swap the order; invert by reversing and reconnecting; three elementary moves reduce to simplest form, and a zero determinant means no inverse appears."**`,
    relatedProblemIds: [],
  },
  'linear-systems': {
    chapter: 'Chapter 3 Systems of Linear Equations',
    title: 'Solving Linear Systems and Their Structure',
    summary:
      'Gaussian elimination reduces a system to echelon form; the rank and the number of unknowns decide existence and uniqueness, while the solution structure of homogeneous and inhomogeneous systems is described by fundamental solution sets.',
    keyPoints: [
      'Gaussian elimination = elementary row operations to echelon form; the case is decided by the rank r of the coefficient matrix and the rank of the augmented matrix',
      'Solvable iff r(A)=r(A|b); unique when r=n, infinitely many when r<n',
      'The homogeneous system Ax=0 always has the zero solution; a nonzero solution exists ⟺ r(A)<n, with solution space dimension n−r',
      'General solution of an inhomogeneous system = one particular solution + the corresponding homogeneous general solution',
      'A fundamental solution set is a basis of the homogeneous solution space, containing n−r linearly independent solutions',
    ],
    content: String.raw`

Solving systems of equations is the oldest and most practical task of linear algebra. The primary-school "chickens and rabbits in one cage" is essentially a system of two linear equations; circuit analysis in engineering, input–output models in economics and coordinate changes in computer graphics all end up as a large linear system $Ax=b$.

A fundamental question: given a system, does it have solutions at all? If so, is the solution unique or infinite? Gaussian elimination, given more than 200 years ago, is still the kernel of every numerical linear algebra algorithm. This lecture explains elimination thoroughly, uses the single word "rank" to answer existence and count together, and gives the structure formula for the general solution.

## 2. Rigorous Definitions

**Definition 1 (linear system)** A system of the form
$$
\begin{cases} a_{11}x_1+\cdots+a_{1n}x_n = b_1 \\ \vdots \\ a_{m1}x_1+\cdots+a_{mn}x_n = b_m \end{cases}
$$
is a linear system with m equations and n unknowns, written $Ax=b$, where $A=(a_{ij})$ is the coefficient matrix, $x=(x_j)$, and $\bar A=(A\mid b)$ is the augmented matrix. When $b=0$ the system is called homogeneous.

**Definition 2 (Gaussian elimination and echelon form)** Apply elementary row operations to the augmented matrix, aiming at row echelon form: any zero row is at the bottom; the leading nonzero entry (pivot) of each nonzero row lies strictly to the right of the pivot of the row above.

**Definition 3 (rank)** The order of the largest nonzero minor of A is called the rank, written $r(A)$ or $\operatorname{rank}(A)$. Equivalently, the number of nonzero rows in a row echelon form is the rank.

**Solvability criterion**: the system $Ax=b$ is solvable ⟺ $r(A)=r(\bar A)$. When solvable: if $r(A)=n$ (the number of unknowns) the solution is unique; if $r(A)<n$ there are infinitely many solutions.

## 3. Why Define It This Way

**Why use only row operations, never column operations?** Column operations amount to renumbering the unknowns, which changes the meaning of the solution (which x corresponds to which column). Row operations correspond to adding and subtracting equations, which does not change the solution set. So echelon reduction uses row operations only.

**Why is the criterion $r(A)=r(\bar A)$?** Row operations neither add nor remove information. If $r(A)<r(\bar A)$, the augmented matrix contains a row with "all coefficients 0 but a nonzero constant", i.e. the contradictory equation $0=b$ ($b\ne0$), so there is no solution. If the two are equal there is no contradiction, so a solution exists.

**Why unique when $r=n$ and infinite when $r<n$?** The number of pivots is the number of unknowns that can be determined independently. When the pivot count equals n, every unknown is pinned down—unique. When it is less than n, there are $n-r$ free unknowns taking arbitrary values, each choice giving a solution—infinitely many.

**Why must a homogeneous system have the zero solution?** Substituting $x=0$ into $Ax=0$ always works. A nonzero solution exists exactly when $r(A)<n$—the coefficient matrix "flattens" space, so the kernel is nontrivial.

## 4. Intuition and Pictures

**Geometric picture**: each equation is a hyperplane in n-dimensional space. The intersection of two hyperplanes can be a line (infinitely many solutions), a point (unique) or empty (parallel). A system of three equations in three unknowns is the intersection of three planes.

**Table of solution cases**:

| Case | Condition | Solution set |
|------|------|------|
| no solution | $r(A)<r(\bar A)$ | empty |
| unique solution | $r(A)=r(\bar A)=n$ | a single point |
| infinitely many | $r(A)=r(\bar A)<n$ | an $(n-r)$-dimensional affine subspace |

**Analogy**: the rank is like "the number of effectively independent equations". If two equations are multiples of each other, they carry only one piece of information—the rank automatically deducts such redundancy.

## 5. Worked Examples

### Example 1 (Basic: decide and solve)

Problem: solve $\begin{cases} x_1+x_2+x_3=3\\ 2x_1+3x_2+x_3=6\\ x_1-x_2-2x_3=-2\end{cases}$.

Approach: write the augmented matrix and reduce to echelon form.

Solution:
$$
\bar A=\left(\begin{array}{ccc|c}
1&1&1&3\\2&3&1&6\\1&-1&-2&-2
\end{array}\right)
\xrightarrow{r_2\leftarrow r_2-2r_1,\ r_3\leftarrow r_3-r_1}
\left(\begin{array}{ccc|c}
1&1&1&3\\0&1&-1&0\\0&-2&-3&-5
\end{array}\right)
$$
$$
\xrightarrow{r_3\leftarrow r_3+2r_2}
\left(\begin{array}{ccc|c}
1&1&1&3\\0&1&-1&0\\0&0&-5&-5
\end{array}\right)
$$
Back-substitute: $x_3=1$, $x_2-x_3=0\Rightarrow x_2=1$, $x_1+x_2+x_3=3\Rightarrow x_1=1$. The unique solution is $(1,1,1)$.

Comment: $r=3=n$, so a unique solution is forced.

### Example 2 (Intermediate: structure of infinitely many solutions)

Problem: solve $\begin{cases} x_1+x_2+x_3+x_4=2\\ 2x_1+3x_2+x_3-x_4=3\end{cases}$ and write the general solution.

Approach: 2 equations, 4 unknowns, so $r\le2<4$; infinitely many solutions with 2 free variables.

Solution: augmented matrix
$$
\left(\begin{array}{cccc|c}
1&1&1&1&2\\2&3&1&-1&3
\end{array}\right)
\xrightarrow{r_2\leftarrow r_2-2r_1}
\left(\begin{array}{cccc|c}
1&1&1&1&2\\0&1&-1&-3&-1
\end{array}\right)
$$
Pivot columns 1 and 2; free variables $x_3,x_4$. Put $x_3=s,x_4=t$:
from row 2, $x_2=x_3+3x_4-1=s+3t-1$; from row 1, $x_1=2-x_2-x_3-x_4=2-(s+3t-1)-s-t=3-2s-4t$.
General solution $x=(3-2s-4t,\ s+3t-1,\ s,\ t)^\mathsf{T}= (3,-1,0,0)^\mathsf{T}+s(-2,1,1,0)^\mathsf{T}+t(-4,3,0,1)^\mathsf{T}$.

Comment: the particular solution $(3,-1,0,0)$ plus the fundamental solution set $\{(-2,1,1,0),(-4,3,0,1)\}$; the fundamental set contains $n-r=2$ vectors.

### Example 3 (Advanced: a system with a parameter)

Problem: discuss for which values of $a$ the system $\begin{cases} x_1+x_2+x_3=1\\ x_1+ax_2+x_3=1\\ x_1+x_2+a^2x_3=a\end{cases}$ is solvable, uniquely solvable, or has infinitely many solutions.

Approach: the determinant of the coefficient matrix is $\det A = (a-1)^2(a+2)$ (Vandermonde type).

Solution: $\det A = \begin{vmatrix}1&1&1\\1&a&1\\1&1&a^2\end{vmatrix}=(a-1)^2(a+2)$.
- If $a\ne1$ and $a\ne-2$: $\det A\ne0$, $r(A)=3$, unique solution.
- If $a=1$: all three equations become $x_1+x_2+x_3=1$, $r(A)=r(\bar A)=1<3$, infinitely many solutions.
- If $a=-2$: the coefficient matrix has rank 2, while the augmented matrix $\bar A=\begin{pmatrix}1&1&1&1\\1&-2&1&1\\1&1&4&-2\end{pmatrix}$; subtracting the first row from the third gives $(0,0,3,-3)$, the first row is $(1,1,1,1)$, the second minus the first is $(0,-3,0,0)$, so its rank is 3 ≠ $r(A)=2$ and there is no solution.

Comment: with parameters, do not rush to eliminate; inspecting $\det A$ is easier. The value $a=-2$ is the "coefficient rank rises, augmented rank also rises but they differ" no-solution trap.

## 6. Common Mistakes and Pitfalls

1. **Eliminating before computing the determinant in a parametrized system**. Mistake: blindly using row operations that kill the parameter and lose the case split. Correct: compute $\det A$ first to locate the singular parameter values, then discuss each case.
2. **Confusing $r(A)$ with $r(\bar A)$, misjudging solvability**. Mistake: concluding from $r(A)$ alone. Correct: compare the two; only equality gives solutions.
3. **Treating free variables as arbitrary but writing the particular solution wrongly**. Mistake: substituting back incorrect expressions for the pivot variables. Correct: setting the free variables to 0 gives a particular solution; then set each free variable to 1 in turn with the others 0 to get a fundamental solution set.
4. **Forgetting to add the particular solution to the homogeneous general solution**. Mistake: writing only the homogeneous part for an inhomogeneous system. Correct: inhomogeneous general solution = particular solution + homogeneous general solution (the dimensions add up to the full solution set).
5. **Assuming that as many equations as unknowns implies uniqueness**. Mistake: extra equations may contradict or be redundant. Correct: look at the rank, not the number of equations; only $r=n$ gives uniqueness.
6. **Computing pivot columns incorrectly during row operations**. Mistake: pivots in the wrong columns, hence wrong free variables. Correct: in echelon form the variables of the pivot columns are basic, the rest are free.

## 7. Summary and Mnemonic

Key points reviewed:
- Gaussian elimination: row operations only, to echelon or reduced echelon form.
- criterion: $r(A)=r(\bar A)$ gives solutions; $r=n$ unique, $r<n$ infinitely many.
- homogeneous: $Ax=0$ always has the zero solution; a nonzero solution ⟺ $r<n$, solution space dimension $n-r$.
- inhomogeneous general solution = particular + homogeneous general; the fundamental set has $n-r$ linearly independent solutions.
- with parameters, compute $\det A$ first and then split into cases.

Mnemonic: **"Row operations to echelon, equal ranks mean solutions are in sight; uniqueness only at full rank n, and free variables hold the base."**`,
    relatedProblemIds: [],
  },
  'vector-spaces': {
    chapter: 'Chapter 4 Vector Spaces',
    title: 'Vector Spaces, Bases and Dimension',
    summary:
      'A vector space abstracts the structure "can be added, can be scaled"; a basis and dimension give it coordinates, forming the stage of all linear algebra.',
    keyPoints: [
      'A vector space = an abelian group under addition + scalar multiplication, satisfying the eight axioms',
      'Subspace test: nonempty and closed under addition and scalar multiplication (it must pass through the origin)',
      'Linear independence = only the trivial combination vanishes; span is the generated subspace; a basis is both independent and spanning',
      'Dimension = the number of vectors in a basis, an intrinsic property independent of the basis',
      'Coordinates: after fixing a basis, the array of coefficients of a vector in that basis',
    ],
    content: String.raw`

In analytic geometry a point of the plane is written with two coordinates $(x,y)$ and a point of space with $(x,y,z)$. But a "vector space" abstracts this structure: it does not care what the points are, only whether they can be added and scaled, and that these operations obey eight rules. Thus not only $\mathbb{R}^2,\mathbb{R}^3$ are vector spaces, but also sets of polynomials, sets of continuous functions and sets of matrices—as long as addition and scalar multiplication are sensibly defined.

The greatest concept of a vector space is a "basis": a few vectors suffice to span the whole space, just as three non-coplanar edges pin down an entire room. The dimension is "the minimum number of edges needed". This lecture builds that abstract language; it is the foundation of linear transformations, eigenvalues and quadratic forms later.

## 2. Rigorous Definitions

**Definition 1 (real vector space)** A set V with two operations—addition $V\times V\to V$ and scalar multiplication $\mathbb{R}\times V\to V$—satisfying eight axioms: (1) addition is commutative and associative; (2) there is a zero element $0$; (3) every element has a negative; (4) $1\cdot v=v$; (5) $a(bv)=(ab)v$; (6)(7) distributivity $a(u+v)=au+av$ and $(a+b)v=av+bv$. Such V is a (real) vector space.

**Definition 2 (subspace)** A nonempty subset W of V that is closed under addition and scalar multiplication (i.e. $u,v\in W\Rightarrow u+v\in W$ and $a\in\mathbb{R}\Rightarrow au\in W$) is itself a vector space, called a subspace. The test needs only "nonempty plus two closures".

**Definition 3 (linear combination and span)** A linear combination of vectors $v_1,\dots,v_k$ is $\sum a_i v_i$. The set of all such combinations is the span $\operatorname{span}\{v_i\}$.

**Definition 4 (linear independence)** If $\sum a_i v_i=0$ only when all $a_i=0$, the vectors are linearly independent; otherwise dependent.

**Definition 5 (basis and dimension)** A set of vectors that is both linearly independent and spans V is a basis of V. The number of vectors in a basis is the dimension $\dim V$.

**Definition 6 (coordinates)** Once a basis $e_1,\dots,e_n$ is fixed, any vector is $v=\sum x_i e_i$, and the array $(x_1,\dots,x_n)$ is the coordinate vector of v in that basis.

## 3. Why Define It This Way

**Why exactly eight axioms, no more and no fewer?** They guarantee "one can do algebra as with ordinary vectors". Remove one and anomalies appear: without negatives subtraction cannot be defined; without distributivity $(a+b)v$ cannot be expanded. They are the "minimal complete rule set" of linear structure.

**Why must a subspace be tested for closure?** A subspace must itself be a vector space, and among the eight axioms only closure (under addition and scalar multiplication) can hold in the ambient space yet fail for the subset. The other axioms are inherited from V automatically. Counterexample: the points of the first quadrant are closed under addition, but scaling by a negative number leaves the quadrant, so it is not a subspace.

**Why is linear independence so important?** Dependence means some vector is "superfluous"—expressible by the others, contributing no new direction. A basis being independent means "no redundant edges"; spanning means "these edges fill the space". Together they guarantee that a basis is a "minimal generating set".

**Why is dimension well defined (independent of the basis)?** The replacement theorem guarantees that any two bases contain the same number of vectors. So "dimension" is an intrinsic property of the space, not depending on which basis you choose.

## 4. Intuition and Pictures

**Geometric picture**: in $\mathbb{R}^3$, a line through the origin is a 1-dimensional subspace, a plane through the origin is 2-dimensional, and the origin alone is 0-dimensional. Lines or planes not through the origin are not subspaces (they lack the zero element and are not closed under subtraction).

**Table of common vector spaces**:

| Set | Dimension | Explanation |
|------|------|------|
| $\mathbb{R}^n$ | n | the standard coordinate space |
| Polynomials of degree ≤ n, $P_n$ | n+1 | basis $1,x,\dots,x^n$ |
| All $m\times n$ matrices | mn | basis the single-entry matrices |
| Continuous functions $C[a,b]$ | infinite | function space |

**Analogy**: a basis is like a coordinate system; the dimension is like "the number of independent directions"; a subspace is like a "small room" partitioned off a large one, obeying the same rules.

## 5. Worked Examples

### Example 1 (Basic: testing a subspace)

Problem: decide whether $W=\{(x,y,z)\mid x+y+z=0\}$ is a subspace of $\mathbb{R}^3$.

Approach: check nonemptiness and closure under addition and scalar multiplication.

Solution: clearly $(0,0,0)\in W$, so it is nonempty. If $u=(x_1,y_1,z_1),v=(x_2,y_2,z_2)\in W$, the coordinate sum of $(u+v)$ is $(x_1+x_2)+(y_1+y_2)+(z_1+z_2)=0+0=0$, so $u+v\in W$. For $a\in\mathbb{R}$, the coordinate sum of $au$ is $a(x_1+y_1+z_1)=0$, so $au\in W$. Hence W is a subspace (a plane through the origin, of dimension 2).

Comment: only planes and lines through the origin are subspaces; changing the equation to $=1$ breaks it (no zero element).

### Example 2 (Intermediate: finding a basis and dimension)

Problem: find a basis and the dimension of $V=\operatorname{span}\{(1,2,0),(0,1,1),(1,3,1)\}$.

Approach: arrange the vectors as columns of a matrix, use elementary row operations to read the rank, and take a maximal independent subset as the basis.

Solution: the matrix
$$
\begin{pmatrix}1&0&1\\2&1&3\\0&1&1\end{pmatrix}
\xrightarrow{r_2\leftarrow r_2-2r_1}
\begin{pmatrix}1&0&1\\0&1&1\\0&1&1\end{pmatrix}
\xrightarrow{r_3\leftarrow r_3-r_2}
\begin{pmatrix}1&0&1\\0&1&1\\0&0&0\end{pmatrix}
$$
has rank 2; the first two columns correspond to linearly independent vectors $(1,2,0),(0,1,1)$, and the third vector = first + second. So a basis is $\{(1,2,0),(0,1,1)\}$ and $\dim V=2$.

Comment: the dimension of a span equals the rank of the generating set; deleting redundant vectors gives a basis.

### Example 3 (Advanced: change of coordinates)

Problem: in $\mathbb{R}^2$ the old basis is $e_1=(1,0),e_2=(0,1)$ and the new basis $f_1=(1,1),f_2=(1,-1)$. Find the coordinates of $v=(3,1)$ in the new basis.

Approach: write $v=x' f_1+y' f_2$ and solve a linear system.

Solution: $(3,1)=x'(1,1)+y'(1,-1)=(x'+y',\ x'-y')$. This gives $x'+y'=3,\ x'-y'=1$, so $x'=2,y'=1$. The new coordinates are $(2,1)$.

Comment: the same vector has different coordinates in different bases, but the vector itself does not change; the change-of-basis matrix is determined by the relation between the old and new bases.

## 6. Common Mistakes and Pitfalls

1. **Treating a line or plane not through the origin as a subspace**. Mistake: believing the set defined by $x+y=1$ is a subspace. Correct: it lacks the zero element and is not closed under subtraction, so it is not a subspace. Subspaces must pass through the origin.
2. **Confusing "linearly independent" with "pairwise non-parallel"**. Mistake: thinking three pairwise non-parallel vectors are independent. Correct: three vectors may be coplanar (e.g. $(1,0,0),(0,1,0),(1,1,0)$ are pairwise non-parallel yet dependent). Check whether only the zero combination vanishes.
3. **Assuming a generating set is a basis**. Mistake: using a set with redundant vectors as a basis. Correct: a basis must both span and be independent; first delete redundancy from a generating set (find a maximal independent subset).
4. **Thinking the dimension changes with the basis**. Mistake: believing a new basis changes the dimension. Correct: dimension is intrinsic and basis-independent; any basis has the same number of vectors.
5. **Treating a function space as finite-dimensional**. Mistake: assuming $C[a,b]$ has a finite basis. Correct: it is infinite-dimensional; only restrictions such as bounded degree give finite dimension.
6. **Conflating coordinates with the vector**. Mistake: saying "the vector (3,1)" while ignoring its dependence on the chosen basis. Correct: coordinates are always relative to a basis; changing the basis changes them.

## 7. Summary and Mnemonic

Key points reviewed:
- vector space: addition plus scalar multiplication satisfying the eight axioms; it does not care what the elements are.
- subspace: nonempty + closed under addition and scaling; a sub-figure through the origin.
- linear independence = no redundancy; spanning = fills the space; basis = both independent and spanning.
- dimension = the size of a basis, intrinsic and independent of the choice of basis.
- coordinates: the "address" of a vector once a basis is fixed.

Mnemonic: **"Eight axioms establish the space, closed subspaces pass the origin; independent and spanning make a basis, dimension fixed and coordinates appear."**`,
    relatedProblemIds: [],
  },
  'linear-transformations': {
    chapter: 'Chapter 5 Linear Transformations',
    title: 'Linear Transformations and Their Matrices',
    summary:
      'A linear transformation preserves addition and scalar multiplication; its kernel and image describe its structure, the rank–nullity theorem links them, and a matrix is its expression in a basis.',
    keyPoints: [
      'Linear transformations satisfy T(u+v)=Tu+Tv and T(av)=aTv, and can be represented by matrices',
      'The kernel ker T = {Tv=0} and the image Im T are both subspaces',
      'Rank–nullity theorem: dim ker T + dim Im T = dim V',
      'After fixing bases a linear transformation corresponds to a unique matrix; changing bases makes matrices similar, B=P^{-1}AP',
      'The matrix of a composite = the product of the matrices in the order of composition',
    ],
    content: String.raw`

A linear transformation is a "map preserving addition and scalar multiplication"—geometrically, rotations, scalings, projections and shears, transformations that do not bend or twist. Matrices matter precisely because they are the "coordinate expressions" of a family of linear transformations: fix a basis, and every linear transformation corresponds uniquely to a matrix.

The essence of understanding a linear transformation is: rather than staring at entries one by one, look at which directions it "keeps fixed" or "crushes to zero". The kernel is the set of directions crushed to zero; the image is the range still reachable after the transformation. The rank–nullity theorem says: how much is crushed + how much remains = the total dimension. This lecture connects transformations with their matrices.

## 2. Rigorous Definitions

**Definition 1 (linear transformation)** A map $T:V\to W$ satisfying $T(u+v)=Tu+Tv$ and $T(av)=aTv$ (for all $u,v\in V,a\in\mathbb{R}$) is a linear transformation (or linear map).

**Definition 2 (kernel and image)** The kernel $\ker T=\{v\in V\mid Tv=0\}$ is a subspace of V; the image $\operatorname{Im} T=\{Tv\mid v\in V\}$ is a subspace of W. The dimension of $\ker T$ is the nullity, and the dimension of $\operatorname{Im}T$ is the rank $r(T)$.

**Definition 3 (matrix of a transformation)** Take a basis $e_1,\dots,e_n$ of V and a basis $f_1,\dots,f_m$ of W. Express $Te_j$ in the W basis as a column vector; the $m\times n$ matrix A formed from these columns is the matrix of T in that pair of bases. Then $T(x)=A x$ (computed in coordinates).

**Definition 4 (composition and inverse)** The matrix of $S\circ T$ equals the matrix of $S$ times the matrix of $T$ (mind the order); the matrix of an invertible linear transformation is invertible.

**Rank–nullity theorem**: $\dim\ker T + \dim\operatorname{Im}T = \dim V$.

## 3. Why Define It This Way

**Why must a linear transformation preserve addition and scalar multiplication?** Because only then can it be represented by a matrix—matrix multiplication automatically satisfies $A(u+v)=Au+Av$ and $A(av)=aAv$. A transformation that is not linear (such as translation by a constant or taking absolute values) cannot be written as a simple matrix. Linear = "fully describable by a matrix".

**Why are kernel and image subspaces?** The kernel is closed under addition: $Tu=Tv=0\Rightarrow T(u+v)=0$; likewise for scalars. The image is closed too. They carry structural information about the transformation: the kernel is the "dimension eaten", the image the "dimension retained".

**Why does the matrix depend on the choice of basis?** The same transformation, rewritten in new coordinates after a change of basis, has a different matrix (similarity). But the geometric behaviour of the transformation does not change. Counterexample: a 90° rotation has matrix $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ in the standard orthonormal basis; in a skewed basis its matrix looks different, yet describes the same rotation.

**Why does the rank–nullity theorem hold?** Take a basis of $\ker T$ and extend it to a basis of V; the added basis vectors, after applying T, are linearly independent and span $\operatorname{Im}T$. Hence $\dim\operatorname{Im}T = n - \dim\ker T$, which is the theorem.

## 4. Intuition and Pictures

**Geometric picture**: a linear transformation from $\mathbb{R}^2$ to itself still sends grid lines to parallel lines (no bending). A projection flattens the plane onto a line (the kernel is the perpendicular direction, the image that line); a rotation preserves area (determinant of absolute value 1); a scaling changes area.

**Kernel/image/rank table** (for $T:\mathbb{R}^n\to\mathbb{R}^m$):

| Quantity | Meaning |
|----|------|
| $\ker T$ | directions mapped to 0, $\dim=n-r$ |
| $\operatorname{Im}T$ | the actually reachable range, dimension $=r$ |
| $r$ | the rank of the matrix, the dimension of the column space |

**Analogy**: a linear transformation is a machine; the kernel is the input direction "swallowed with no effect", the image is "the kinds of product it can make". The theorem says: kinds swallowed + kinds produced = all kinds of input.

## 5. Worked Examples

### Example 1 (Basic: verify linearity and find the matrix)

Problem: let $T:\mathbb{R}^2\to\mathbb{R}^2,\ T(x,y)=(2x+y,\ x-y)$. Verify linearity and find the matrix in the standard basis.

Approach: check the two linearity properties, then compute $T(e_1),T(e_2)$ as columns.

Solution: for arbitrary $u,v$ and $a$: expanding $T(u+v)$ by components equals $Tu+Tv$, and $T(av)=aTv$, so T is linear. With the standard basis $e_1=(1,0),e_2=(0,1)$, $Te_1=(2,1),Te_2=(1,-1)$. Hence the matrix is
$$
A=\begin{pmatrix}2&1\\1&-1\end{pmatrix}
$$

Comment: the matrix of a linear transformation is just the images of the basis vectors arranged in columns.

### Example 2 (Intermediate: kernel and image)

Problem: for $A=\begin{pmatrix}1&2&1\\0&1&1\\1&3&2\end{pmatrix}$, find bases of $\ker A$ and $\operatorname{Im}A$ for the transformation $x\mapsto Ax$.

Approach: solve $Ax=0$ for the kernel; a maximal independent subset of the columns is a basis of the image.

Solution: row reduction gives $A\to\begin{pmatrix}1&2&1\\0&1&1\\0&0&0\end{pmatrix}$. From $Ax=0$, $x_3=t,\ x_2=-t,\ x_1=t$, so the kernel is spanned by $(1,-1,1)^\mathsf{T}$, with basis $\{(1,-1,1)\}$. The first two columns $\begin{pmatrix}1\\0\\1\end{pmatrix},\begin{pmatrix}2\\1\\3\end{pmatrix}$ are linearly independent and form a basis of $\operatorname{Im}A$.

Comment: $\dim\ker=1,\dim\operatorname{Im}=2$, satisfying $1+2=3$.

### Example 3 (Advanced: matrices in different bases and similarity)

Problem: the same transformation $T$ has matrices A and B in the bases $\mathcal{A}=\{e_1,e_2\}$ and $\mathcal{B}=\{e_1+e_2,e_1-e_2\}$. Find the relation.

Approach: the change-of-basis matrix P converts B-coordinates to A-coordinates; the two matrices are similar, $B=P^{-1}AP$.

Solution: we have $\mathcal{B}=\mathcal{A}P$ with $P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$. Then the matrices of the same transformation in the two bases satisfy $B=P^{-1}AP$. Computing, $P^{-1}=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}$; if $A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ (a 90° rotation), then $B=P^{-1}AP=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, exactly the same (because P is itself an orthogonal change of basis and the rotation commutes with it). In general $B$ is a similar copy of A.

Comment: similar matrices are "dialects" of the same transformation in different bases; similarity invariants (eigenvalues, trace, determinant) are properties of the transformation itself.

## 6. Common Mistakes and Pitfalls

1. **Treating an affine map as linear**. Mistake: thinking the translation $T(x)=x+b$ is linear. Correct: it fails $T(0)=0$ ($T(0)=b\ne0$), so it is affine, not linear, and cannot be represented by a single matrix (homogeneous coordinates are needed).
2. **Confusing the order of matrix multiplication**. Mistake: writing the matrix of $S\circ T$ as $AS$ instead of $SA$. Correct: T first, then S, so the matrix is $SA$ (with column-vector convention).
3. **Assuming that a trivial kernel implies a surjective image**. Mistake: from $\mathbb{R}^3\to\mathbb{R}^3$ with trivial kernel the image is everything—true; but from $\mathbb{R}^3\to\mathbb{R}^2$ with trivial kernel the image dimension would be 3? No—the image lies in $\mathbb{R}^2$ and has dimension at most 2. Correct: use rank–nullity; the image dimension is at most the target dimension.
4. **Believing matrices in different bases are equal**. Mistake: assuming A=B. Correct: in general they are only similar, $B=P^{-1}AP$; invariants agree but the matrices may differ.
5. **Computing the image space from a single row reduction**. Mistake: the image is spanned by columns, so one must look at the rank of the column set. Correct: use row operations on A to find a maximal independent set of columns (row operations preserve the dependence structure of columns, but the vectors must be chosen from the original columns).
6. **Forgetting that $\ker T$ must contain 0**. Mistake: writing the kernel as a set without zero. Correct: the kernel is a subspace and must contain the zero vector.

## 7. Summary and Mnemonic

Key points reviewed:
- linear transformations preserve addition and scalar multiplication; they can be represented by matrices.
- kernel = directions crushed to zero; image = reachable range; both are subspaces.
- rank–nullity: $\dim\ker+\dim\operatorname{Im}=\dim V$.
- the same transformation in different bases gives similar matrices $B=P^{-1}AP$; eigenvalues and the like are invariants.
- composite matrices multiply, with T first and S second giving $SA$.

Mnemonic: **"Preserve addition and scaling and it is linear; the kernel swallows zero directions and the image appears; rank plus nullity keeps the dimension; changing basis gives similarity from one source."**`,
    relatedProblemIds: [],
  },
  'eigen': {
    chapter: 'Chapter 5 Similar Matrices and Quadratic Forms',
    title: 'Eigenvalues and Eigenvectors',
    summary:
      'An eigenvector is a vector the matrix stretches without turning; the eigenvalue is the stretch factor—diagonalization turns a complicated matrix into a scaling.',
    keyPoints: [
      'The sum of the eigenvalues = the trace, the product = the determinant',
      'Finding eigenvectors = solving the fundamental solution set of (λE − A)x = 0',
      'Diagonalizable ⟺ n linearly independent eigenvectors exist; a real symmetric matrix is always orthogonally diagonalizable',
    ],
    content: String.raw`

Imagine a machine that moves every arrow in the plane to a new position by some rule. Most arrow directions get twisted, but some "lucky" arrows are merely lengthened or shortened, their direction unchanged—only their length multiplied by a factor. These special arrows are eigenvectors, and the factor is the eigenvalue.

A concrete example: stretch the plane by 3 along the x-axis. Clearly an arrow along the x-axis is lengthened 3 times with unchanged direction (eigenvector, eigenvalue 3), while an arrow along the y-axis is squashed to 0 (eigenvector, eigenvalue 0). Eigenvalues and eigenvectors are the key to a matrix's "inner behaviour": diagonalization, solving differential equations, Google's PageRank and principal component analysis all rest on them. This lecture answers: how are they defined, how are they computed, and when can a matrix be diagonalized?

## 2. Rigorous Definitions

**Definition (eigenvalues and eigenvectors)** Let A be a square matrix of order n. If there is a number $\lambda$ and a nonzero vector $x$ such that
$$
Ax=\lambda x
$$
then $\lambda$ is an eigenvalue of A and $x$ an eigenvector belonging to $\lambda$.

**Characteristic polynomial and characteristic equation**. Rewrite the definition as $(\lambda I-A)x=0$. For a nonzero solution x to exist, the matrix $\lambda I-A$ must be singular, i.e.
$$
|\lambda I-A|=0
$$
This is the characteristic equation. The polynomial of degree n on the left, $p(\lambda)=|\lambda I-A|$, is the characteristic polynomial, and its roots are all the eigenvalues (with multiplicity).

**Relation to trace and determinant**:
$$
\sum_{i=1}^n\lambda_i=\operatorname{tr}(A)=\sum_{i=1}^n a_{ii},\qquad \prod_{i=1}^n\lambda_i=\det(A)
$$
that is, the sum of the eigenvalues is the trace and the product is the determinant.

**Steps to find eigenvectors**: (1) solve the characteristic equation for $\lambda_i$; (2) for each $\lambda_i$ solve the homogeneous system $(\lambda_i I-A)x=0$; (3) the nonzero linear combinations of its fundamental solution set are exactly all eigenvectors belonging to $\lambda_i$.

## 3. Why Define It This Way

**Why must x be nonzero?** If x=0 were allowed, $A\cdot0=\lambda\cdot0$ would hold for every $\lambda$ and eigenvectors would be meaningless (the zero vector indicates no direction). Nonzero guarantees it really is a "direction".

**Why use $\lambda I-A$ rather than $A-\lambda I$?** They differ only by the sign $(-1)^n$, so the condition that the determinant vanish is identical and the characteristic equation is the same. The convention $\lambda I-A$ makes the leading term $\lambda^n$, so the polynomial is more standard (its coefficients are matrix invariants).

**Why is the product of eigenvalues the determinant and the sum the trace?** The characteristic polynomial is $p(\lambda)=|\lambda I-A|=\lambda^n-(\operatorname{tr}A)\lambda^{n-1}+\cdots+(-1)^n\det A$. The constant term (put $\lambda=0$) gives $(-1)^n\det A$, and the product of the roots gives $\prod\lambda_i$; while the coefficient of $\lambda^{n-1}$ is exactly $-\operatorname{tr}A$, corresponding to the sum of the roots. This is a direct application of Vieta's formulas.

**Why are eigenvectors of distinct eigenvalues linearly independent?** This is proved by induction: if $\lambda_1,\dots,\lambda_k$ are distinct, their eigenvectors $x_1,\dots,x_k$ must be linearly independent. This is the theoretical root of "distinct eigenvalues imply diagonalizability".

## 4. Intuition and Pictures

**Geometric picture**: an eigenvector is a direction that is "stretched but not turned" by the transformation; an eigenvalue >1 lengthens, 0<λ<1 shortens, λ<0 reverses and stretches, λ=0 crushes to zero (lands in the kernel).

**Diagonalizability test table**:

| Case | Conclusion |
|------|------|
| n distinct eigenvalues | always diagonalizable |
| for every $\lambda$, geometric multiplicity = algebraic multiplicity | diagonalizable |
| some $\lambda$ has geometric multiplicity < algebraic multiplicity | not diagonalizable |

**Spectral theorem (real symmetric)**: a real symmetric matrix has all real eigenvalues, eigenvectors of distinct eigenvalues are orthogonal, and it is orthogonally diagonalizable (see the inner-product space topic).

**Analogy**: eigenvectors are the "principal axes" of the transformation, eigenvalues the scaling factors along them; diagonalization means "viewed along the principal axes, the transformation is just scaling separately".

## 5. Worked Examples

### Example 1 (Basic: computing eigenvalues and eigenvectors directly)

Problem: find the eigenvalues and eigenvectors of $A=\begin{pmatrix}3&1\\0&2\end{pmatrix}$.

Approach: for an upper triangular matrix the eigenvalues are the diagonal entries; then solve $(\lambda I-A)x=0$.

Solution: characteristic polynomial $|\lambda I-A|=(\lambda-3)(\lambda-2)$, so $\lambda_1=3,\lambda_2=2$.
For $\lambda_1=3$: $3I-A=\begin{pmatrix}0&-1\\0&1\end{pmatrix}$, the equation is $-x_2=0$, so $x_1$ is free and an eigenvector is $(1,0)^\mathsf{T}$ (and its multiples).
For $\lambda_2=2$: $2I-A=\begin{pmatrix}-1&-1\\0&0\end{pmatrix}$, the equation is $-x_1-x_2=0$; taking $x_1=1$ gives $x_2=-1$, so an eigenvector is $(1,-1)^\mathsf{T}$.

Comment: two distinct eigenvalues force two linearly independent eigenvectors, so the matrix is diagonalizable.

### Example 2 (Intermediate: quick check via trace and determinant)

Problem: given $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$, find the eigenvalues and verify the trace and determinant relations.

Approach: for second order use the formula $\lambda^2-\operatorname{tr}(A)\lambda+\det(A)=0$ directly.

Solution: $\operatorname{tr}(A)=2,\det(A)=1\cdot1-2\cdot2=-3$. The characteristic equation $\lambda^2-2\lambda-3=0$ gives $\lambda=3,-1$. Check: sum $3+(-1)=2=\operatorname{tr}A$, product $3\cdot(-1)=-3=\det A$. Consistent.
Corresponding eigenvectors: for λ=3, solving $(3I-A)x=0$ gives $(1,1)^\mathsf{T}$; for λ=-1 gives $(1,-1)^\mathsf{T}$.

Comment: for a second-order matrix the eigenvalues can be written down from the trace and determinant in two lines—a high-frequency time saver.

### Example 3 (Advanced: repeated eigenvalues and the diagonalizability test)

Problem: $A=\begin{pmatrix}2&1\\0&2\end{pmatrix}$ and $B=\begin{pmatrix}2&0\\0&2\end{pmatrix}$ both have eigenvalue 2 (double). Are they diagonalizable?

Approach: look at the geometric multiplicity $\dim\ker(\lambda I-A)$.

Solution: for B: $2I-B=0$, so the kernel is $\mathbb{R}^2$ and the geometric multiplicity is 2 = the algebraic multiplicity 2; B is diagonalizable (it is already diagonal).
For A: $2I-A=\begin{pmatrix}0&-1\\0&0\end{pmatrix}$, whose solution space is 1-dimensional, so the geometric multiplicity is 1 < 2 and A is not diagonalizable. A is a Jordan block of order 2.

Comment: a repeated eigenvalue need not prevent diagonalization; the point is whether the geometric multiplicity equals the algebraic one. B is a scalar matrix (every vector is an eigenvector), while A has only a one-dimensional eigenspace.

## 6. Common Mistakes and Pitfalls

1. **Treating the eigenvector as unique**. Mistake: writing one eigenvector and believing it is the only one. Correct: the eigenvectors belonging to one eigenvalue form a 1-dimensional (or higher) subspace; any nonzero combination from the fundamental solution set works.
2. **Including the zero vector when computing eigenvectors**. Mistake: a fundamental solution set containing zero. Correct: eigenvectors must be nonzero; the fundamental set gives directions, but the combination must not be all zero.
3. **Confusing the signs of $A-\lambda I$ and $\lambda I-A$**. Mistake: an extra $(-1)^n$ in the determinant. Correct: the characteristic equations are equivalent with the same roots; but mind the convention for the leading term of the characteristic polynomial.
4. **Believing a repeated root always prevents diagonalization**. Mistake: see B in Example 3. Correct: check whether the geometric multiplicity is full.
5. **Thinking the sum of eigenvectors of different eigenvalues is again an eigenvector**. Mistake: in general it is not. Correct: only combinations belonging to the same eigenvalue remain eigenvectors; combinations from different eigenvalues do not satisfy the eigen-equation.
6. **Mismatching eigenvalues and eigenvectors**. Mistake: using the eigenvector of λ=3 for λ=2. Correct: each eigenvector must solve the system for the corresponding $\lambda_i I-A$, strictly paired.

## 7. Summary and Mnemonic

Key points reviewed:
- eigenvalue/eigenvector: $Ax=\lambda x$ with x nonzero; characteristic equation $|\lambda I-A|=0$.
- the sum of eigenvalues = the trace, the product = the determinant (Vieta).
- method: solve the characteristic equation for λ, then solve $(\lambda I-A)x=0$ for the eigenvectors (fundamental solution set).
- diagonalizable ⟺ n linearly independent eigenvectors ⟺ every eigenvalue has geometric multiplicity = algebraic multiplicity; distinct eigenvalues always allow diagonalization.
- a real symmetric matrix has all real eigenvalues, eigenvectors of distinct eigenvalues are orthogonal, and it is orthogonally diagonalizable.

Mnemonic: **"Solve Ax=λx to find the principal axes, roots of the characteristic equation; trace and determinant check the answer, and full geometric multiplicity brings diagonal form."**`,
    relatedProblemIds: ['p-eigen-1'],
  },
  'similar-jordan': {
    chapter: 'Chapter 6 Eigenvalues and Similar Matrices',
    title: 'Similar Canonical Forms and Jordan Canonical Form',
    summary:
      'Similarity means the same transformation in different bases; diagonalizability requires the geometric multiplicity to be full, and otherwise the Jordan form gives the cleanest similarity classification.',
    keyPoints: [
      'Similarity B=P^{-1}AP means the same transformation in different bases; eigenvalues, trace, determinant and rank are shared',
      'Algebraic multiplicity = multiplicity of the root; geometric multiplicity = dim ker(λI-A), always m_g ≤ m_a',
      'Diagonalizable ⟺ every eigenvalue has geometric multiplicity = algebraic multiplicity ⟺ n linearly independent eigenvectors exist',
      'Jordan form = block diagonal with blocks J_k(λ); number of blocks = geometric multiplicity, sum of block sizes = algebraic multiplicity',
      'Powers of a Jordan block J_2(λ) acquire a polynomial extra term',
    ],
    content: String.raw`

The previous topic covered eigenvalues: if there is a set of vectors that are "stretched but not turned", the matrix can be turned into a diagonal one and computations simplify at once. But reality is often unkind—some matrices cannot find enough eigenvectors (for example a "shear" that rotates the plane a little and stretches it), and cannot be diagonalized.

Here the Jordan form enters: it is the "closest generalization" of a diagonal matrix—diagonal blocks are replaced by small upper triangular blocks (Jordan blocks), each corresponding to one eigenvalue. Every complex square matrix can be brought to Jordan form; it is the matrix's "simplest identity card" up to similarity. This lecture explains clearly: when a matrix can be diagonalized, when it must go to Jordan form, and the difference between geometric and algebraic multiplicity.

## 2. Rigorous Definitions

**Definition 1 (similarity)** Square matrices A, B are similar if $B=P^{-1}AP$ for some invertible $P$. Similar matrices describe the same linear transformation in different bases and share eigenvalues, trace, determinant and rank.

**Definition 2 (algebraic and geometric multiplicity)** The multiplicity of an eigenvalue $\lambda$ as a root of the characteristic polynomial is its algebraic multiplicity $m_a$; its geometric multiplicity is $m_g=\dim\ker(\lambda I-A)$, the number of linearly independent eigenvectors belonging to $\lambda$. Always $1\le m_g\le m_a$.

**Definition 3 (diagonalizability condition)** A is diagonalizable ⟺ every eigenvalue has geometric multiplicity = algebraic multiplicity ⟺ there are n linearly independent eigenvectors ⟺ all Jordan blocks are of order 1.

**Definition 4 (Jordan block)** An upper triangular matrix of order k of the form
$$
J_k(\lambda)=\begin{pmatrix}\lambda&1&0&\cdots&0\\0&\lambda&1&\cdots&0\\\vdots&&\ddots&\ddots&\vdots\\0&\cdots&0&\lambda&1\\0&\cdots&0&0&\lambda\end{pmatrix}
$$
is called a Jordan block of order k with eigenvalue $\lambda$.

**Definition 5 (Jordan canonical form)** Every complex square matrix A is similar to a block diagonal matrix $\operatorname{diag}(J_{k_1}(\lambda_1),\dots,J_{k_r}(\lambda_r))$, where the number of Jordan blocks with a given $\lambda$ equals its geometric multiplicity, and the sum of their sizes equals the algebraic multiplicity. This is the Jordan canonical form (unique up to the order of the blocks).

## 3. Why Define It This Way

**Why is similarity $P^{-1}AP$ and not something else?** Because a change of basis transforms coordinates by $x'=P^{-1}x$, so the new matrix $B$ satisfies $Bx'=P^{-1}APx'$—exactly $P^{-1}AP$. It captures precisely "the same transformation, a different coordinate system".

**Why is $m_g\le m_a$, and why does diagonalizability require equality?** Each Jordan block contributes 1 eigenvector (the first column of the block), so the geometric multiplicity equals the number of blocks; the algebraic multiplicity equals the sum of block sizes. The number of blocks ≤ the sum of sizes, with equality only when every block has size 1 (i.e. is diagonal). So diagonalizable ⟺ no block larger than 1 ⟺ $m_g=m_a$.

**Why do non-diagonalizable matrices exist?** When some eigenvalue has $m_g<m_a$, at least one block has size ≥2, and the matrix cannot be diagonalized using eigenvectors alone. The typical example is $J_2(0)=\begin{pmatrix}0&1\\0&0\end{pmatrix}$: its only eigenvalue is 0 with algebraic multiplicity 2, but $\ker(0\cdot I-A)$ is 1-dimensional, so the geometric multiplicity is 1 and it is not diagonalizable.

**Why does Jordan form always exist over the complex numbers?** The characteristic polynomial always has roots over ℂ, so Jordan chains (generalized eigenvectors) can be built eigenvalue by eigenvalue. Over ℝ, if the eigenvalues are complex one must pass to ℂ or use a real canonical form.

## 4. Intuition and Pictures

**Geometric picture**: diagonalizable = space can be filled entirely by "pure stretching directions"; non-diagonalizable = there are "stretching directions plus companion directions sliding along them" (Jordan blocks describe this chain).

**Diagonalizability test table**:

| Condition | Conclusion |
|------|------|
| n distinct eigenvalues | always diagonalizable |
| for every $\lambda$: $m_g=m_a$ | diagonalizable |
| some $\lambda$ has $m_g<m_a$ | not diagonalizable, Jordan form needed |

**Analogy**: diagonalization is like combing a tangled mass into parallel threads; Jordan form is like combing and still leaving a few small "tangled clumps", each clump a Jordan block.

## 5. Worked Examples

### Example 1 (Basic: deciding diagonalizability)

Problem: decide whether $A=\begin{pmatrix}2&0\\0&2\end{pmatrix}$ and $B=\begin{pmatrix}2&1\\0&2\end{pmatrix}$ are diagonalizable.

Approach: look at the eigenvalue multiplicities and the geometric multiplicity.

Solution: A has eigenvalue 2 (algebraic multiplicity 2), and $2I-A=0$, so $\ker=\mathbb{R}^2$ and the geometric multiplicity is 2 = the algebraic multiplicity; A is diagonalizable (it is already diagonal).
B has eigenvalue 2 (algebraic multiplicity 2), and $2I-B=\begin{pmatrix}0&-1\\0&0\end{pmatrix}$ has a 1-dimensional solution space, so the geometric multiplicity is 1 < 2 and B is not diagonalizable. B is exactly a Jordan block of order 2, $J_2(2)$.

Comment: a diagonal matrix and a Jordan block with the same numbers differ enormously; the key is the geometric multiplicity.

### Example 2 (Intermediate: finding the Jordan form)

Problem: find the Jordan form of $A=\begin{pmatrix}3&1&0\\0&3&1\\0&0&3\end{pmatrix}$.

Approach: the only eigenvalue is 3 with algebraic multiplicity 3; $3I-A$ has rank 2, so $\ker$ has dimension 1 = the geometric multiplicity, hence a single block of order 3.

Solution: eigenvalue 3 (triple). $3I-A=\begin{pmatrix}0&-1&0\\0&0&-1\\0&0&0\end{pmatrix}$ has rank 2 and nullity 1. So there is only one Jordan block $J_3(3)$; that is, A is already in Jordan form:
$$
J=\begin{pmatrix}3&1&0\\0&3&1\\0&0&3\end{pmatrix}
$$

Comment: when the geometric multiplicity is 1 and the algebraic multiplicity n, the Jordan form is a single block of order n.

### Example 3 (Advanced: computing a matrix function with the Jordan form)

Problem: find $A^k$ (k a positive integer) for $A=\begin{pmatrix}2&1\\0&2\end{pmatrix}$.

Approach: A is $J_2(2)$ and hard to diagonalize, but one can decompose $A=2I+N$ with $N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ and $N^2=0$.

Solution: $A=2I+N$, and $(2I)$ commutes with $N$, so by the binomial theorem
$$
A^k=(2I+N)^k=(2I)^k+\binom{k}{1}(2I)^{k-1}N+\binom{k}{2}(2I)^{k-2}N^2+\cdots
$$
Since $N^2=0$, all later terms vanish:
$$
A^k=2^k I + k\cdot 2^{k-1} N = \begin{pmatrix}2^k&k2^{k-1}\\0&2^k\end{pmatrix}
$$

Comment: the power of a Jordan block acquires a "polynomial term" (here $k2^{k-1}$), the fingerprint of $m_g<m_a$; the power of a diagonal matrix just multiplies the exponents entrywise and has no such extra term.

## 6. Common Mistakes and Pitfalls

1. **Believing a repeated eigenvalue prevents diagonalization**. Mistake: A=2I has a repeated eigenvalue yet is diagonalizable. Correct: the key is whether the geometric multiplicity equals the algebraic one, not whether the root is repeated.
2. **Computing the geometric multiplicity wrongly**. Mistake: using $m_g=m_a$ minus something. Correct: $m_g=n-r(\lambda I-A)$, the dimension of the solution space of $(\lambda I-A)x=0$.
3. **Confusing similarity with equality**. Mistake: thinking similar matrices have the same entries. Correct: similarity shares only invariants (eigenvalues, trace, determinant, rank); entries can differ completely.
4. **Getting the column order of P wrong in the Jordan form**. Mistake: arranging eigenvectors and generalized eigenvectors of different blocks arbitrarily. Correct: the chain of each Jordan block (eigenvector, generalized eigenvectors) must occupy consecutive columns of P, ordered along the chain.
5. **Forcing complex Jordan form in the real domain**. Mistake: writing complex Jordan blocks directly for a real matrix with complex eigenvalues. Correct: over ℝ use a real canonical form (2×2 real blocks for conjugate complex roots), or extend to ℂ first.
6. **Assuming every matrix is diagonalizable**. Mistake: assuming n eigenvectors can always be found. Correct: only when every eigenvalue has full geometric multiplicity; otherwise only Jordan form is available.

## 7. Summary and Mnemonic

Key points reviewed:
- similarity $B=P^{-1}AP$: the same transformation in different bases; eigenvalues, trace, determinant and rank are shared.
- algebraic multiplicity = multiplicity of the root; geometric multiplicity = dimension of the eigenspace; always $m_g\le m_a$.
- diagonalizable ⟺ every $\lambda$ has $m_g=m_a$ ⟺ n linearly independent eigenvectors.
- Jordan form: block diagonal, each block $J_k(\lambda)$; number of blocks = geometric multiplicity, sum of sizes = algebraic multiplicity. It always exists over ℂ.
- powers of a Jordan block acquire polynomial extra terms.

Mnemonic: **"Similarity changes the basis but not the source, the two multiplicities need careful thought; fill the geometric count and you get diagonal, otherwise Jordan blocks chain together."**`,
    relatedProblemIds: [],
  },
  'quadratic-forms': {
    chapter: 'Chapter 7 Quadratic Forms',
    title: 'Standard Forms and Positive Definiteness of Quadratic Forms',
    summary:
      'A quadratic form is a homogeneous polynomial of degree two; completing the square and orthogonal transformations reduce it to standard form, and positive definiteness is decided by leading principal minors or eigenvalues.',
    keyPoints: [
      'A quadratic form ↔ a real symmetric matrix A, f = xᵀAx; split the cross-term coefficient equally between symmetric positions',
      'Standard form = sum of squares; normal form has coefficients ±1,0; Sylvester’s law makes the positive and negative inertia indices unique',
      'Reduction methods: completing the square (congruence), orthogonal transformation (length-preserving), eigenvalues',
      'Positive definite ⟺ all leading principal minors positive ⟺ all eigenvalues positive; negative definite, semidefinite and indefinite each have their own test',
      'Reduce quadratic forms by congruence CᵀAC, not similarity C^{-1}AC',
    ],
    content: String.raw`

A quadratic form is a "homogeneous polynomial of degree two"—for example $x^2+y^2$ describes a circle, $x^2-y^2$ a hyperbola, and $x^2+xy+y^2$ is also a conic, merely tilted. Completing the square or rotating the coordinate system can "straighten" a tilted conic so that its shape becomes clear. That is reducing a quadratic form to standard form.

The deeper applications lie in optimization and classification: the second-order term in the extremum problem of a multivariate function is a quadratic form; deciding whether it "opens upward everywhere" (positive definite) or is "saddle-shaped" (indefinite) determines whether a critical point is a minimum or a saddle. This lecture handles quadratic forms uniformly with matrices and gives the method of completing the square, the orthogonal transformation method, and tests for positive definiteness.

## 2. Rigorous Definitions

**Definition 1 (quadratic form)** A homogeneous polynomial of degree two in n variables
$$
f(x_1,\dots,x_n)=\sum_{i,j=1}^n a_{ij}x_i x_j,\quad a_{ij}=a_{ji}
$$
is a quadratic form. The symmetric matrix $A=(a_{ij})$ is its matrix, and one writes $f=x^\mathsf{T}Ax$.

**Definition 2 (standard form and normal form)** A quadratic form containing only squared terms $d_1y_1^2+\cdots+d_ny_n^2$ is in standard form; if the coefficients are only $1,-1,0$ it is in normal form.

**Definition 3 (congruence)** If there is an invertible C with $B=C^\mathsf{T}AC$, then A and B are congruent. Reducing to standard form means finding a congruence that makes A diagonal.

**Definition 4 (positive definiteness and variants)** $x^\mathsf{T}Ax>0$ for all $x\ne0$ is positive definite; $\ge0$ positive semidefinite; $<0$ negative definite; taking both signs indefinite.

**Law of inertia**: after reducing a real quadratic form to normal form, the numbers of positive, negative and zero coefficients (the positive and negative inertia indices) are determined uniquely by the form itself, independent of the reduction.

## 3. Why Define It This Way

**Why must the matrix of a quadratic form be symmetric?** The coefficient of $x_ix_j$ appears in A at both $(i,j)$ and $(j,i)$, so an asymmetric representation is not unique. Forcing symmetry makes the matrix correspond one-to-one with the form, and the formula $f=x^\mathsf{T}Ax$ clean. Counterexample: allowing asymmetry, the same form would have many matrix representations and congruence theory would be a mess.

**Why use congruence rather than similarity to reduce to standard form?** Because substituting $x=Cy$ gives $x^\mathsf{T}Ax=y^\mathsf{T}(C^\mathsf{T}AC)y$, producing $C^\mathsf{T}AC$, not $C^{-1}AC$. This is the natural equivalence for bilinear forms, distinct from similarity for linear transformations.

**Why are the inertia indices unique?** This is Sylvester's law of inertia: however you complete squares or orthogonalize, the numbers of positive and negative square terms are intrinsic properties of the form, like the rank. Hence positive definite if and only if the positive inertia index equals n (the normal form is all +1).

**Why require $x\ne0$ for positive definiteness?** Because positive definiteness describes a "bowl shape"—every direction away from the origin goes upward. Requiring positivity only in some directions gives indefinite or semidefinite forms. At the zero vector the value is always 0, so $x=0$ must be excluded.

## 4. Intuition and Pictures

**Geometric picture**: the level sets $f=c$ of a binary quadratic form $x^\mathsf{T}Ax$ are conics. Positive definite corresponds to an ellipse (a bowl); indefinite to a hyperbola (a saddle); semidefinite to a degenerate parabolic cylinder.

**Positive definiteness test table**:

| Type | Condition (one equivalent formulation) |
|------|------|
| positive definite | all leading principal minors > 0; or all eigenvalues > 0 |
| negative definite | leading principal minors of odd order < 0, of even order > 0 |
| positive semidefinite | all principal minors ≥ 0 (or all eigenvalues ≥ 0) |
| indefinite | both positive and negative eigenvalues occur |

**Analogy**: a quadratic form is a "terrain": $x^\mathsf{T}Ax$ is the height. Positive definite = the origin is the bottom of a bowl (uphill everywhere); indefinite = a saddle (uphill one way, downhill another).

## 5. Worked Examples

### Example 1 (Basic: write the matrix and complete the square)

Problem: reduce $f(x,y)=x^2+4xy+y^2$ to standard form.

Approach: write the symmetric matrix first, then complete the square.

Solution: the matrix is $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$. Completing the square:
$$
f=x^2+4xy+y^2=(x+2y)^2-3y^2
$$
Put $u=x+2y,\ v=y$; then the standard form is $f=u^2-3v^2$.

Comment: completing the square is the most elementary and direct method; it gives a standard but not normal form (coefficients not ±1,0).

### Example 2 (Intermediate: the orthogonal transformation method)

Problem: use an orthogonal transformation to reduce $f=2x_1^2+2x_2^2+2x_1x_3$ to standard form (matrix $A=\begin{pmatrix}2&0&1\\0&2&0\\1&0&2\end{pmatrix}$).

Approach: find the eigenvalues and orthonormal eigenvectors of A, build an orthogonal matrix Q, and $f=y^\mathsf{T}(Q^\mathsf{T}AQ)y$ is diagonal.

Solution: characteristic polynomial
$$
\det(\lambda I-A)=\begin{vmatrix}\lambda-2&0&-1\\0&\lambda-2&0\\-1&0&\lambda-2\end{vmatrix}=(\lambda-2)\big((\lambda-2)^2-1\big)
$$
Eigenvalues $\lambda=2,3,1$. Corresponding orthonormal eigenvectors may be taken as $e_2=(0,1,0)$, $\frac1{\sqrt2}(1,0,1)$, $\frac1{\sqrt2}(1,0,-1)$. Build the orthogonal matrix Q; then
$$
Q^\mathsf{T}AQ=\operatorname{diag}(2,3,1)
$$
and the standard form is $f=2y_1^2+3y_2^2+y_3^2$.

Comment: orthogonal transformations preserve length, so geometrically they are only rotations or reflections and do not distort the figure—especially suitable for geometric problems.

### Example 3 (Advanced: testing positive definiteness)

Problem: decide whether $A=\begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{pmatrix}$ is positive definite.

Approach: compute the leading principal minors.

Solution: first order $2>0$; second order $\begin{vmatrix}2&-1\\-1&2\end{vmatrix}=4-1=3>0$; third order
$$
\det A=2\begin{vmatrix}2&-1\\-1&2\end{vmatrix}-(-1)\begin{vmatrix}-1&-1\\0&2\end{vmatrix}=2\cdot3+1\cdot(-2)=6-2=4>0
$$
The third leading principal minor is 4 > 0. All leading principal minors are positive, so A is positive definite.

Comment: the tridiagonal "2,-1,0" matrix is a discrete Laplacian and is positive definite everywhere; using leading principal minors is less work than finding eigenvalues.

## 6. Common Mistakes and Pitfalls

1. **Writing the matrix of a quadratic form asymmetrically**. Mistake: writing $x^2+4xy+y^2$ as $A=\begin{pmatrix}1&4\\0&1\end{pmatrix}$. Correct: split the cross-term coefficient equally, $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$.
2. **Thinking the inertia indices change with the method**. Mistake: believing different methods give different counts of positive and negative terms. Correct: the law of inertia guarantees the positive and negative indices are unique.
3. **Using similarity instead of congruence**. Mistake: diagonalizing a quadratic form with $P^{-1}AP$. Correct: use $C^\mathsf{T}AC$ (congruence).
4. **Testing positive definiteness only by $\det A>0$**. Mistake: thinking a positive determinant means positive definite. Correct: all leading principal minors must be positive; counterexample $\begin{pmatrix}-1&0\\0&-1\end{pmatrix}$ has positive determinant but is negative definite.
5. **Mistaking semidefinite for positive definite**. Mistake: calling a form positive definite when it has a zero eigenvalue. Correct: positive definiteness requires strict >0 and all eigenvalues positive; a zero eigenvalue at best gives semidefiniteness.
6. **Ignoring invertibility of the variable substitution**. Mistake: using a non-invertible substitution when completing the square, losing information. Correct: the congruence matrix C must be invertible, otherwise it is not an equivalent simplification.

## 7. Summary and Mnemonic

Key points reviewed:
- quadratic form ↔ real symmetric matrix; $f=x^\mathsf{T}Ax$.
- standard form: sum of squares; normal form: coefficients ±1,0; the law of inertia guarantees unique positive and negative inertia indices.
- reduction methods: completing the square (congruence), orthogonal transformation (length preserving), eigenvalues.
- positive definite ⟺ all leading principal minors positive ⟺ all eigenvalues positive; negative definite, semidefinite and indefinite each have their own test.
- congruence $B=C^\mathsf{T}AC$, distinct from similarity.

Mnemonic: **"Quadratic means symmetric, and only symmetry makes the matrix unique; completing squares or rotating both work, and all principal minors positive settles definiteness."**`,
    relatedProblemIds: [],
  },
  'inner-product-spaces': {
    chapter: 'Chapter 8 Inner Product Spaces',
    title: 'Inner Product Spaces and Orthogonal Diagonalization',
    summary:
      'An inner product equips abstract vectors with length and angle; the spectral theorem makes real symmetric matrices orthogonally diagonalizable, the geometric basis of PCA and least squares.',
    keyPoints: [
      'The inner product is positive definite, symmetric (real) or conjugate symmetric (complex), and linear in the first argument',
      'Norm ‖v‖=√⟨v,v⟩; orthogonal ⟺ ⟨u,v⟩=0; an orthonormal basis makes coordinates equal projections',
      'Cauchy–Schwarz |⟨u,v⟩|≤‖u‖‖v‖; the Pythagorean theorem holds when orthogonal',
      'Spectral theorem: a real symmetric matrix is orthogonally diagonalizable, QᵀAQ=diag(λ); eigenvectors of distinct eigenvalues are orthogonal',
      'Gram–Schmidt orthogonalization turns any basis into an orthonormal one',
    ],
    content: String.raw`

In the familiar $\mathbb{R}^3$ we can compute lengths and angles thanks to the dot product. But a vector space may "have no built-in notion of length"—for example a polynomial space. An inner product space equips an abstract vector space with "a ruler and a protractor": once an inner product is defined, length, angle, orthogonality and projection all become available.

With an inner product, the most important generalization is that a real symmetric matrix (more generally, a real symmetric or complex Hermitian matrix) is not only diagonalizable but diagonalizable by a set of orthonormal eigenvectors—this is the spectral theorem and orthogonal diagonalization. It gives quadratic forms, least squares and principal component analysis (PCA) a unified geometric foundation. This lecture builds inner product spaces and proves the spectral theorem.

## 2. Rigorous Definitions

**Definition 1 (inner product)** An inner product on a vector space V is a two-variable function $\langle u,v\rangle$ satisfying: (1) positive definiteness $\langle v,v\rangle\ge0$, with =0 only when $v=0$; (2) symmetry (real) or conjugate symmetry (complex); (3) linearity in the first argument. A real or complex space with an inner product is an inner product space.

**Definition 2 (length and angle)** The norm is $\|v\|=\sqrt{\langle v,v\rangle}$; two vectors are orthogonal ⟺ $\langle u,v\rangle=0$; the cosine of the angle is $\cos\theta=\frac{\langle u,v\rangle}{\|u\|\|v\|}$.

**Definition 3 (orthogonal and orthonormal sets)** A set of pairwise orthogonal nonzero vectors is an orthogonal set; if all are unit vectors it is orthonormal. If it forms a basis it is an orthonormal basis (ONB).

**Definition 4 (orthogonal complement)** $W^\perp=\{v\mid \langle v,w\rangle=0,\forall w\in W\}$.

**Definition 5 (orthogonal projection)** The nearest point of v to a subspace W, $\operatorname{proj}_W v$, satisfying $v-\operatorname{proj}_W v\in W^\perp$.

**Spectral theorem (real symmetric)**: a real symmetric matrix A has all real eigenvalues, and eigenvectors of distinct eigenvalues are automatically orthogonal; there exists an orthogonal matrix Q with $Q^\mathsf{T}AQ=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$. In the complex case use a unitary matrix for a Hermitian matrix.

## 3. Why Define It This Way

**Why must an inner product be positive definite and symmetric?** Positive definiteness guarantees that $\|v\|$ is a genuine length (nonnegative, zero only at the origin); symmetry guarantees the angle formula is symmetric and $\langle v,v\rangle$ is real. Remove either and the notions of "length" and "orthogonality" collapse. Counterexample: if $\langle v,v\rangle<0$ were allowed (as for indefinite forms), one would not obtain a norm.

**Why must an orthogonal set be linearly independent?** Suppose $\sum a_i e_i=0$; taking the inner product with $e_j$ gives $a_j\|e_j\|^2=0$, hence $a_j=0$ (since $\|e_j\|\ne0$). Orthogonality solves for the coefficients automatically—the fundamental reason orthonormal bases are so convenient.

**Why are eigenvectors of distinct eigenvalues of a real symmetric matrix orthogonal?** Suppose $Ax=\lambda x,\ Ay=\mu y,\ \lambda\ne\mu$. Then $\lambda\langle x,y\rangle=\langle Ax,y\rangle=\langle x,Ay\rangle=\mu\langle x,y\rangle$ (using symmetry), so $(\lambda-\mu)\langle x,y\rangle=0$ and hence $\langle x,y\rangle=0$. Symmetry is the bridge.

**Why does the spectral theorem guarantee orthogonal diagonalization?** For a symmetric matrix, each eigenvalue has geometric multiplicity equal to its algebraic multiplicity (so it is diagonalizable); then apply Gram–Schmidt inside each eigenspace. The resulting eigenvectors are complete and pairwise orthogonal, and normalizing gives the orthogonal matrix Q.

## 4. Intuition and Pictures

**Geometric picture**: in an inner product space, "projection" means finding the nearest point—like dropping a vector perpendicularly onto the floor. Orthogonal diagonalization rotates the axes onto the eigenvector directions, so that on each axis the transformation is pure scaling.

**Table of inner product properties**:

| Property | Formula |
|------|------|
| Cauchy–Schwarz | $|\langle u,v\rangle|\le \|u\|\|v\|$ |
| Triangle inequality | $\|u+v\|\le\|u\|+\|v\|$ |
| Pythagorean theorem | $u\perp v\Rightarrow\|u+v\|^2=\|u\|^2+\|v\|^2$ |
| Orthogonal projection | $v=\operatorname{proj}_W v + w^\perp$ |

**Analogy**: an orthogonal basis is like a set of mutually perpendicular axes; an orthonormal basis also has unit length, so the coordinates are exactly "the projection lengths onto each axis".

## 5. Worked Examples

### Example 1 (Basic: inner products and orthogonality)

Problem: on $P_2$ define $\langle f,g\rangle=\int_{-1}^1 f(x)g(x)\,dx$. Decide whether $1$ and $x$ are orthogonal.

Approach: compute whether the inner product is 0.

Solution:
$$
\langle 1,x\rangle=\int_{-1}^1 x\,dx=\left[\frac{x^2}{2}\right]_{-1}^1=\frac12-\frac12=0
$$
so 1 and x are orthogonal.

Comment: functions can be orthogonal too; the Legendre polynomials are the family orthogonal under this inner product.

### Example 2 (Intermediate: Gram–Schmidt)

Problem: orthonormalize $\alpha_1=(1,1,0),\alpha_2=(1,0,1),\alpha_3=(0,1,1)$ in $\mathbb{R}^3$.

Approach: successively subtract the projections onto the preceding vectors.

Solution: take $\beta_1=\alpha_1=(1,1,0)$.
$\beta_2=\alpha_2-\frac{\langle\alpha_2,\beta_1\rangle}{\|\beta_1\|^2}\beta_1=(1,0,1)-\frac{1}{2}(1,1,0)=(\frac12,-\frac12,1)$.
$\beta_3=\alpha_3-\frac{\langle\alpha_3,\beta_1\rangle}{2}\beta_1-\frac{\langle\alpha_3,\beta_2\rangle}{\|\beta_2\|^2}\beta_2$; here $\langle\alpha_3,\beta_1\rangle=1$, $\langle\alpha_3,\beta_2\rangle=\frac12\cdot0+(-\frac12)\cdot1+1\cdot1=\frac12$, and $\|\beta_2\|^2=\frac14+\frac14+1=\frac32$.
Hence $\beta_3=(0,1,1)-\frac12(1,1,0)-\frac{1/2}{3/2}(\frac12,-\frac12,1)=(0,1,1)-(\frac12,\frac12,0)-(\frac16,-\frac16,\frac13)=(-\frac23,\frac23,\frac23)$. Normalizing gives the ONB.

Comment: Gram–Schmidt is the standard tool for "straightening" an arbitrary basis into perpendicular coordinate axes.

### Example 3 (Advanced: an application of orthogonal diagonalization)

Problem: use orthogonal diagonalization to find the spectral decomposition of $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, and interpret the quadratic form.

Approach: find an orthogonal Q with $Q^\mathsf{T}AQ=\Lambda$; then $A=Q\Lambda Q^\mathsf{T}$.

Solution: eigenvalues from $\det(\lambda I-A)=(\lambda-2)^2-1=0$, giving $\lambda=3,1$. Corresponding unit eigenvectors $u_1=\frac1{\sqrt2}(1,1)$ (λ=3) and $u_2=\frac1{\sqrt2}(1,-1)$ (λ=1). The orthogonal matrix
$$
Q=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix},\quad \Lambda=\begin{pmatrix}3&0\\0&1\end{pmatrix}
$$
Then $A=3u_1u_1^\mathsf{T}+1u_2u_2^\mathsf{T}$ (spectral decomposition). The corresponding quadratic form $f=2x^2+2xy+2y^2$ becomes $3u^2+v^2$ after a 45° rotation, straightening the ellipse.

Comment: spectral decomposition splits a matrix into a sum of "scalings along eigen-directions"; orthogonal diagonalization is everywhere in PCA and vibration modes.

## 6. Common Mistakes and Pitfalls

1. **Checking only symmetry and forgetting positive definiteness**. Mistake: omitting $\langle v,v\rangle=0\Rightarrow v=0$. Correct: positive definiteness is first among the four requirements; without it the norm is meaningless.
2. **Handling the complex case as if symmetric**. Mistake: writing $\langle u,v\rangle=\langle v,u\rangle$ over ℂ instead of the conjugate. Correct: a complex inner product is linear in the first argument and conjugate-linear in the second, and requires the conjugate transpose.
3. **Using an orthogonal set as an orthonormal basis**. Mistake: using non-normalized orthogonal vectors directly as a coordinate basis. Correct: the coordinate formula $x_i=\langle v,e_i\rangle$ holds only for an orthonormal basis; for merely orthogonal vectors divide by $\|e_i\|^2$.
4. **Believing any matrix can be orthogonally diagonalized**. Mistake: only real symmetric (or complex Hermitian) and other normal matrices can. Correct: a general matrix can only be diagonalized up to similarity (if at all); orthogonal diagonalization is a privilege of symmetric matrices.
5. **Getting the Gram–Schmidt order wrong, losing orthogonality**. Mistake: subtracting projections in the wrong order. Correct: at step k subtract all projections onto the first k−1 already orthogonal vectors, in a fixed order.
6. **Confusing the orthogonal complement with a set complement**. Mistake: thinking $W^\perp$ is the complement in the set-theoretic sense. Correct: $W^\perp$ is the set of all vectors orthogonal to W, and the dimensions are complementary: $V=W\oplus W^\perp$.

## 7. Summary and Mnemonic

Key points reviewed:
- the inner product gives length, angle and orthogonality; the norm is $\|v\|=\sqrt{\langle v,v\rangle}$.
- an orthogonal set is automatically independent; an orthonormal basis makes coordinates equal projections.
- Cauchy–Schwarz, the triangle inequality and the Pythagorean theorem are the three cornerstones.
- spectral theorem: a real symmetric matrix is orthogonally diagonalizable, and eigenvectors of distinct eigenvalues are orthogonal.
- orthogonal diagonalization = rotating the axes onto the eigen-directions, turning the transformation into pure scaling.

Mnemonic: **"Inner product installs a ruler for lengths and angles, orthogonal bases make projections plain; symmetry plus the spectral theorem lets axes rotate, and eigen-directions scale in a straight line."**`,
    relatedProblemIds: [],
  },
};

export default map;
