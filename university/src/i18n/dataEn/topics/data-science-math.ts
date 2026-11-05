import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'matrix-decomposition': {
    chapter: 'Chapter 1 Matrix Decomposition',
    title: 'SVD and Low-Rank Approximation',
    summary:
      'Every matrix factors into "rotate—stretch—rotate": the singular values tell you which directions carry information and which are merely noise.',
    content: String.raw`

Suppose you run a video site with one million users and fifty thousand films. Users rate films, forming a $1000000\times 50000$ matrix—fifty billion cells. The overwhelming majority are empty; nobody has watched every film. Yet a recommender system must guess "what you might like" from these sparse ratings.

One key observation: the ratings are not fifty billion independent numbers. People who like *Star Wars* tend to like *Star Trek*; people who like art-house cinema tend to like certain directors. What actually drives the ratings may be only a dozen "latent factors": action, romance, comedy, suspense, star power… If each user and each film is described by a vector of a dozen dimensions, the rating is approximately the inner product of two vectors. In other words, although this huge matrix looks enormous, its **rank** is in fact low.

Singular value decomposition (SVD) is precisely the tool for discovering this low-rank structure. It splits an arbitrary matrix $A$ into

$$A=U\Sigma V^{\mathsf{T}},$$

where $U$ and $V$ are orthogonal matrices and $\Sigma$ is diagonal, with the singular values arranged from largest to smallest along the diagonal. The leading singular values are large and correspond to the "real structure" in the data; the later ones are small and are usually just noise. Keeping only the first $k$ yields the best low-rank approximation.

Motivating question: why is "discarding the smallest singular values" the "best low-rank approximation"? What justifies the claim that no other rank-$k$ matrix can come closer to the original? The answer is a beautiful theorem—the Eckart–Young theorem.

## 2. Rigorous Definitions

**Definition (singular value decomposition).** Let $A\in\mathbb{R}^{m\times n}$ have rank $r$. Then there exist orthogonal matrices $U\in\mathbb{R}^{m\times m}$, $V\in\mathbb{R}^{n\times n}$ and a diagonal matrix $\Sigma\in\mathbb{R}^{m\times n}$ such that

$$A=U\Sigma V^{\mathsf{T}},$$

where the diagonal entries of $\Sigma$ satisfy $\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_r>0$ and all others are $0$. The $\sigma_i$ are called singular values, the columns of $U$ left singular vectors, and the columns of $V$ right singular vectors.

**Definition (compact SVD and rank-$k$ truncation).** Keeping only the first $k$ singular values:

$$A_k=\sum_{i=1}^{k}\sigma_i u_i v_i^{\mathsf{T}},$$

is called the rank-$k$ truncated SVD of $A$. Here $u_i$ is the $i$-th column of $U$ and $v_i$ the $i$-th column of $V$.

**Theorem (existence of the SVD).** Every real matrix admits a singular value decomposition. The construction: $A^{\mathsf{T}}A$ is symmetric positive semidefinite, hence has an orthogonal eigendecomposition $A^{\mathsf{T}}A=V\Lambda V^{\mathsf{T}}$, with $\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$ and $\lambda_i\ge 0$. Set $\sigma_i=\sqrt{\lambda_i}$; for each $\sigma_i>0$ define $u_i=Av_i/\sigma_i$, then complete the $u_i$ to an orthogonal basis of $\mathbb{R}^m$ to obtain the decomposition.

**Theorem (Eckart–Young).** For any matrix $B$ of rank at most $k$,

$$\lVert A-B\rVert_2\ge\sigma_{k+1},\qquad \lVert A-B\rVert_F\ge\sqrt{\sum_{i=k+1}^{r}\sigma_i^2},$$

and $A_k$ attains both lower bounds simultaneously. That is, $A_k$ is the best rank-$k$ approximation in both the Frobenius and the spectral norm.

**Definition (pseudoinverse).** Let $A=U\Sigma V^{\mathsf{T}}$; invert the positive singular values of $\Sigma$ and keep the zeros as zeros, obtaining $\Sigma^{+}$, and define

$$A^{+}=V\Sigma^{+}U^{\mathsf{T}}.$$

**Definition (condition number).** For an invertible square matrix, $\kappa(A)=\sigma_1/\sigma_r$. It measures "how much a small perturbation of the input is amplified": if $Ax=b$ and $A(x+\delta x)=b+\delta b$, then

$$\frac{\lVert\delta x\rVert}{\lVert x\rVert}\le\kappa(A)\frac{\lVert\delta b\rVert}{\lVert b\rVert}.$$

## 3. Why Define It This Way

**Why must it be "rotate—stretch—rotate"?** Apply $A$ to the unit sphere. The unit sphere is $\{x:\lVert x\rVert=1\}$; after $A$ it becomes an ellipsoid. The SVD says exactly this: first $V^{\mathsf{T}}$ rotates the coordinates (leaving the shape of the sphere unchanged), then $\Sigma$ stretches by $\sigma_i$ along each coordinate axis, and finally $U$ rotates to the final orientation. The semi-axis lengths of the ellipsoid are the singular values and the semi-axis directions are the left singular vectors. Any linear map, however complicated it looks, is essentially just these three steps.

**Why are singular values nonnegative?** Because they are the square roots of the eigenvalues of $A^{\mathsf{T}}A$, and $A^{\mathsf{T}}A$ is positive semidefinite: for any $x$,

$$x^{\mathsf{T}}A^{\mathsf{T}}Ax=\lVert Ax\rVert^2\ge 0.$$

The eigenvalues of a positive semidefinite matrix are nonnegative, so their square roots are nonnegative. Sign information is absorbed into the orientations of $u_i$ and $v_i$.

**Why are $U$ and $V$ orthogonal?** Because $A^{\mathsf{T}}A$ and $AA^{\mathsf{T}}$ are both real symmetric matrices; eigenvectors belonging to distinct eigenvalues of a real symmetric matrix are mutually orthogonal, and within a repeated eigenvalue one may also orthogonalize. Orthogonality means "change direction without changing length"—the algebraic expression of a "pure rotation".

**Why is the truncated SVD the best low-rank approximation?** Take the spectral norm. Let $B$ have rank at most $k$; then the null space $\ker B$ has dimension at least $n-k$, while $\operatorname{span}\{v_1,\dots,v_{k+1}\}$ has dimension $k+1$. The dimensions sum to more than $n$, so the intersection is nontrivial. Choose a unit vector $x$ in both; then $Bx=0$ and

$$Ax=\sum_{i=1}^{k+1}\sigma_i(v_i^{\mathsf{T}}x)u_i.$$

Since $x$ lies in the span of the first $k+1$ right singular vectors, $\sum_{i\le k+1}(v_i^{\mathsf{T}}x)^2=1$, hence

$$\lVert Ax\rVert^2=\sum_{i=1}^{k+1}\sigma_i^2(v_i^{\mathsf{T}}x)^2\ge\sigma_{k+1}^2.$$

Therefore $\lVert A-B\rVert_2\ge\lVert(A-B)x\rVert=\lVert Ax\rVert\ge\sigma_{k+1}$. The error of $A_k$ is exactly $\sigma_{k+1}$, so the bound is attained. The beauty of this argument is that it constructs no particular $B$; it uses only the linear-algebra fact that "subspaces of complementary dimension must intersect".

**Why do we need the pseudoinverse?** When $A$ is not square or not invertible, $A^{-1}$ does not exist, yet the least-squares problem $\min\lVert Ax-b\rVert$ is still meaningful. The pseudoinverse gives $x^{+}=A^{+}b$, the minimum-norm element among all least-squares solutions. If $A$ has full column rank, $A^{+}=(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}$, the familiar normal-equation solution; if $A$ is rank-deficient, the pseudoinverse automatically zeroes the components in the null-space directions, preventing the solution from blowing up.

**Why does the condition number matter?** If $\sigma_r$ is tiny, $A$ nearly flattens the information in some directions. When solving $Ax=b$, tiny noise in those directions is amplified by $1/\sigma_r$. With a condition number of $10^6$, the sixth significant digit of the input may be entirely untrustworthy. The SVD lets us see at a glance which directions are reliable and which should be regularized—truncating small singular values is essentially "admitting that the information in those directions has been drowned by noise".

## 4. Intuition and Pictures

Think of the matrix as a "data map": $v_i$ is the $i$-th principal direction in input space, $u_i$ the corresponding direction in output space, and $\sigma_i$ the factor by which that direction is amplified or compressed.

| Singular value | Meaning | Handling |
|---|---|---|
| Very large | Main structure, strong signal | Keep |
| Medium | Secondary structure | Keep depending on the task |
| Very small | Noise, redundancy, numerical error | Truncate |
| Exactly zero | Exact linear dependence | Must drop; compressible without loss |

> Intuition: the SVD is an X-ray of the matrix. $\sigma_1$ is the skeleton, $\sigma_2$ the major organs, and the later small singular values are wrinkles in the clothing and grain in the image. Low-rank approximation keeps only the skeleton and organs and erases the grain.

Image compression is the most intuitive application. A $1000\times 1000$ grayscale image has $10^6$ pixels, so direct storage takes $10^6$ numbers. Keeping the first $50$ singular values requires only $1000\times 50$ left vectors, $1000\times 50$ right vectors and $50$ singular values—about $10^5$ numbers, a compression ratio of roughly $10:1$. The price is a blurrier image, because the discarded $\sigma_{51},\dots$ carried precisely the fine texture.

> Another analogy: take the SVD of a matrix of student grades. The first singular vector may correspond to "overall learning ability" and the second to "arts-versus-sciences tilt". These latent factors are not defined by hand—the data grows them itself.

## 5. Worked Examples

### Example 1 (Basic: the complete SVD of a $2\times 2$ matrix by hand)

Problem: find the singular value decomposition of $A=\begin{bmatrix}3&0\\4&5\end{bmatrix}$ and verify $A=U\Sigma V^{\mathsf{T}}$.

Analysis: first compute $A^{\mathsf{T}}A$, find its eigenvalues and eigenvectors to obtain $V$ and the $\sigma_i$, then use $u_i=Av_i/\sigma_i$ to get $U$.

Solution: first

$$A^{\mathsf{T}}A=\begin{bmatrix}3&4\\0&5\end{bmatrix}\begin{bmatrix}3&0\\4&5\end{bmatrix}=\begin{bmatrix}25&20\\20&25\end{bmatrix}.$$

The characteristic polynomial is $(25-\lambda)^2-400=0$, so $25-\lambda=\pm 20$, giving $\lambda_1=45$ and $\lambda_2=5$. Thus

$$\sigma_1=\sqrt{45}=3\sqrt{5}\approx 6.708,\qquad \sigma_2=\sqrt{5}\approx 2.236.$$

For $\lambda_1=45$, solve $(A^{\mathsf{T}}A-45I)v=0$:

$$\begin{bmatrix}-20&20\\20&-20\end{bmatrix}\begin{bmatrix}v_1\\v_2\end{bmatrix}=0\ \Longrightarrow\ v_1=v_2,$$

and normalizing gives $v_1=(1,1)^{\mathsf{T}}/\sqrt{2}$. For $\lambda_2=5$, similarly $v_2=(1,-1)^{\mathsf{T}}/\sqrt{2}$.

Now the left singular vectors:

$$u_1=\frac{Av_1}{\sigma_1}=\frac{1}{3\sqrt{5}}\cdot\frac{1}{\sqrt{2}}\begin{bmatrix}3\\9\end{bmatrix}=\frac{1}{\sqrt{10}}\begin{bmatrix}1\\3\end{bmatrix},$$

$$u_2=\frac{Av_2}{\sigma_2}=\frac{1}{\sqrt{5}}\cdot\frac{1}{\sqrt{2}}\begin{bmatrix}3\\-1\end{bmatrix}=\frac{1}{\sqrt{10}}\begin{bmatrix}3\\-1\end{bmatrix}.$$

Check orthogonality: $u_1^{\mathsf{T}}u_2=(3-3)/10=0$ and $\lVert u_1\rVert=\lVert u_2\rVert=1$.

Hence

$$U=\frac{1}{\sqrt{10}}\begin{bmatrix}1&3\\3&-1\end{bmatrix},\quad \Sigma=\begin{bmatrix}3\sqrt{5}&0\\0&\sqrt{5}\end{bmatrix},\quad V=\frac{1}{\sqrt{2}}\begin{bmatrix}1&1\\1&-1\end{bmatrix}.$$

Verify the reconstruction. The first term:

$$\sigma_1u_1v_1^{\mathsf{T}}=3\sqrt{5}\cdot\frac{1}{\sqrt{20}}\begin{bmatrix}1&1\\3&3\end{bmatrix}=\frac{3}{2}\begin{bmatrix}1&1\\3&3\end{bmatrix}=\begin{bmatrix}1.5&1.5\\4.5&4.5\end{bmatrix}.$$

The second term:

$$\sigma_2u_2v_2^{\mathsf{T}}=\sqrt{5}\cdot\frac{1}{\sqrt{20}}\begin{bmatrix}3&-3\\-1&1\end{bmatrix}=\frac{1}{2}\begin{bmatrix}3&-3\\-1&1\end{bmatrix}=\begin{bmatrix}1.5&-1.5\\-0.5&0.5\end{bmatrix}.$$

Adding gives $\begin{bmatrix}3&0\\4&5\end{bmatrix}=A$.

Comment: note that $\sigma_i$ is the square root of an eigenvalue of $A^{\mathsf{T}}A$, not the eigenvalue itself. The eigenvalues of $A$ may be complex (here they are $3,5$), but singular values are always real and nonnegative.

### Example 2 (Intermediate: best rank-one approximation and its error)

Problem: continuing Example 1, find the best rank-one approximation $A_1$ of $A$, compute $\lVert A-A_1\rVert_F$ and the relative error, and compare with the theoretical lower bound.

Analysis: $A_1=\sigma_1u_1v_1^{\mathsf{T}}$, and the error norm should equal $\sigma_2$.

Solution: from Example 1,

$$A_1=\begin{bmatrix}1.5&1.5\\4.5&4.5\end{bmatrix}.$$

The residual

$$E=A-A_1=\begin{bmatrix}3-1.5&0-1.5\\4-4.5&5-4.5\end{bmatrix}=\begin{bmatrix}1.5&-1.5\\-0.5&0.5\end{bmatrix}.$$

Compute the Frobenius norm:

$$\lVert E\rVert_F=\sqrt{1.5^2+(-1.5)^2+(-0.5)^2+0.5^2}=\sqrt{2.25+2.25+0.25+0.25}=\sqrt{5}.$$

It equals $\sigma_2=\sqrt{5}$ exactly, consistent with the Eckart–Young theorem.

Now the relative error. $\lVert A\rVert_F=\sqrt{9+0+16+25}=\sqrt{50}=5\sqrt{2}\approx 7.071$, so

$$\frac{\lVert A-A_1\rVert_F}{\lVert A\rVert_F}=\frac{\sqrt{5}}{\sqrt{50}}=\frac{1}{\sqrt{10}}\approx 0.316.$$

That is, about $31.6\%$ of the energy is lost.

Comment: this example has only two singular values, so truncating to rank one must lose the second. If the singular values of $A$ decay quickly (say $\sigma_2/\sigma_1=0.01$), the error at the same compression ratio becomes negligible. Whether a low-rank approximation is good depends on the decay rate of the singular values, not on the size of the matrix.

### Example 3 (Advanced: pseudoinverse of a rank-deficient matrix and the minimum-norm least-squares solution)

Problem: let $A=\begin{bmatrix}1&1\\1&1\\1&1\end{bmatrix}$ and $b=(1,2,3)^{\mathsf{T}}$. Find $A^{+}$ and the least-squares solution $x^{+}=A^{+}b$, and verify that it has minimum norm.

Analysis: $A$ has rank 1 and its column space is a single line. Compute the pseudoinverse via the SVD, then check the normal equations and the minimum-norm condition.

Solution: first

$$A^{\mathsf{T}}A=\begin{bmatrix}3&3\\3&3\end{bmatrix}.$$

Its eigenvalues are $6$ and $0$, with eigenvectors $v_1=(1,1)^{\mathsf{T}}/\sqrt{2}$ and $v_2=(1,-1)^{\mathsf{T}}/\sqrt{2}$. Hence $\sigma_1=\sqrt{6}$ and

$$u_1=\frac{Av_1}{\sigma_1}=\frac{1}{\sqrt{6}}\cdot\frac{1}{\sqrt{2}}\begin{bmatrix}1\\1\\1\end{bmatrix}\cdot 2=\frac{1}{\sqrt{3}}\begin{bmatrix}1\\1\\1\end{bmatrix}.$$

The pseudoinverse is

$$A^{+}=\frac{1}{\sigma_1}v_1u_1^{\mathsf{T}}=\frac{1}{\sqrt{6}}\cdot\frac{1}{\sqrt{2}}\cdot\frac{1}{\sqrt{3}}\begin{bmatrix}1&1&1\\1&1&1\end{bmatrix}=\frac{1}{6}\begin{bmatrix}1&1&1\\1&1&1\end{bmatrix}.$$

Thus

$$x^{+}=A^{+}b=\frac{1}{6}\begin{bmatrix}1+2+3\\1+2+3\end{bmatrix}=\begin{bmatrix}1\\1\end{bmatrix}.$$

Check the normal equations: $Ax^{+}=(2,2,2)^{\mathsf{T}}$ and the residual is $r=b-Ax^{+}=(-1,0,1)^{\mathsf{T}}$, while

$$A^{\mathsf{T}}r=\begin{bmatrix}1&1&1\\1&1&1\end{bmatrix}\begin{bmatrix}-1\\0\\1\end{bmatrix}=\begin{bmatrix}0\\0\end{bmatrix}.$$

So $x^{+}$ is a least-squares solution. All least-squares solutions satisfy $x_1+x_2=2$, and the one of smallest norm is $x_1=x_2=1$, namely $x^{+}$.

Comment: the trap here is that "the least-squares solution" is usually not unique. The null space of $A$ is spanned by $(1,-1)^{\mathsf{T}}$, and any $x^{+}+t(1,-1)^{\mathsf{T}}$ gives the same residual. The added value of the pseudoinverse is that it selects, among infinitely many solutions, the one with smallest norm—numerically the most stable.

## 6. Common Mistakes and Pitfalls

- Mistake: conflating the SVD with the eigendecomposition. Correction: the eigendecomposition exists only for square matrices (and not always then), whereas the SVD exists for any matrix; singular values are the square roots of the eigenvalues of $A^{\mathsf{T}}A$, not the eigenvalues of $A$.
- Mistake: swapping the roles of $U$ and $V$. Correction: $A=U\Sigma V^{\mathsf{T}}$, where $U$ acts on output space ($m$ dimensions) and $V$ on input space ($n$ dimensions); getting the dimensions wrong shows up immediately.
- Mistake: pairing the eigenvectors of $AA^{\mathsf{T}}$ and $A^{\mathsf{T}}A$ arbitrarily. Correction: $u_i$ must come from $u_i=Av_i/\sigma_i$; you cannot simply glue the results of two eigendecompositions together.
- Mistake: assuming singular values must be in ascending order. Correction: the standard convention is descending, and truncation keeps the first $k$; the wrong ordering turns "best low-rank approximation" into "discarding the main structure".
- Mistake: using the eigenvalues of $A^{\mathsf{T}}A$ directly as singular values. Correction: take square roots; also, $A^{\mathsf{T}}A$ squares the condition number and loses half the digits, so in practice one runs the SVD on $A$ directly.
- Mistake: believing the truncated SVD approximates the original entrywise. Correction: it is optimal only in the Frobenius and spectral norms, and individual entries may deviate a lot; sparse-matrix completion needs factorization models, not naive truncation.
- Mistake: inverting an ill-conditioned matrix directly. Correction: when $\kappa(A)$ is large, inversion amplifies noise; use the pseudoinverse with truncation (regularization) or ridge regression.
- Mistake: assuming a rank-$k$ approximation needs all $k$ singular values to be large. Correction: what matters is the decay; if $\sigma_{k+1}$ is the same order as $\sigma_1$, truncating to $k$ throws away a great deal of information.

## 7. Summary and Mnemonic

Key points:

- Any matrix factors as $A=U\Sigma V^{\mathsf{T}}$; geometrically this is "rotate—stretch—rotate";
- Singular values are the square roots of the eigenvalues of $A^{\mathsf{T}}A$: nonnegative and in descending order;
- The truncated SVD $A_k=\sum_{i\le k}\sigma_iu_iv_i^{\mathsf{T}}$ is the best rank-$k$ approximation;
- Eckart–Young: the error is $\sigma_{k+1}$ (spectral norm) or $\sqrt{\sum_{i>k}\sigma_i^2}$ (Frobenius norm);
- The pseudoinverse $A^{+}=V\Sigma^{+}U^{\mathsf{T}}$ gives the minimum-norm least-squares solution;
- The condition number $\kappa=\sigma_1/\sigma_r$ measures the error amplification.

Mnemonic: **"Rotate left, rotate right, stretch between; big singular values are the skeleton; truncate the small ones to drop the noise; the pseudoinverse fixes whatever misbehaves."**`,
    keyPoints: [
      'SVD: A=UΣVᵀ, geometrically a rotation—stretch—rotation',
      'Singular values are square roots of eigenvalues of AᵀA: nonnegative, descending',
      'The truncated SVD is the best low-rank approximation in Frobenius and spectral norm',
      'The pseudoinverse gives the minimum-norm least-squares solution',
      'Condition number κ=σ₁/σᵣ measures error amplification',
    ],
  },
  'pca': {
    chapter: 'Chapter 2 Dimensionality Reduction',
    title: 'Principal Component Analysis',
    summary:
      'Find the longest axis in the cloud: PCA compresses the data along the directions of greatest variance while keeping the reconstruction error minimal.',
    content: String.raw`

You have collected the grades of 1000 students in 20 courses and want to draw a picture of how they differ. But a 20-dimensional space cannot be drawn. Can we squash it into 2 dimensions while keeping as much of the original information as possible?

The crudest approach is to pick two courses at random, say mathematics and physics. But the two are highly correlated, so the points crowd onto a diagonal line and one coordinate is wasted. A better approach: first look for the direction in which the whole cloud of data is "stretched longest" and take it as the first axis; then, among the directions perpendicular to it, take the second-longest as the second axis. The resulting 2-D picture keeps the most "spread" with the fewest coordinates.

This is principal component analysis (PCA). "Spread" is measured by variance: the larger the variance, the more separated the points are along that direction, and the more information it carries. PCA seeks a set of orthogonal directions such that the sum of variances of the data projected onto the first $k$ of them is maximal; equivalently, such that the reconstruction error after projection is minimal.

But several details are easy to get wrong. First, you must subtract the mean, otherwise "how far the data's centre is from the origin" masquerades as variance. Second, if one column is measured in metres and another in grams, the magnitudes differ by millions, and the high-variance column monopolizes the first principal component—here you must standardize first. Third, PCA is a linear method: on doughnut-shaped data it will stubbornly fit a straight line, with meaningless results.

Motivating question: why are "maximize projected variance" and "minimize reconstruction error" the same thing? Why are the eigenvectors of the covariance matrix exactly the directions we want?

## 2. Rigorous Definitions

**Definition (centering the data).** Let the data matrix be $X\in\mathbb{R}^{n\times d}$, one sample per row. The sample mean is

$$\bar x=\frac{1}{n}\sum_{i=1}^{n}x_i,$$

and the $i$-th row of the centered matrix $\tilde X$ is $x_i-\bar x$.

**Definition (covariance matrix).** The sample covariance matrix is

$$S=\frac{1}{n-1}\tilde X^{\mathsf{T}}\tilde X\in\mathbb{R}^{d\times d},$$

whose diagonal entries are the variances of the features and whose off-diagonal entries are covariances. Replacing $1/(n-1)$ by $1/n$ changes only the overall scale, not the directions of the eigenvectors nor the explained-variance ratios.

**Definition (principal components).** Take the eigendecomposition of $S$:

$$S=V\Lambda V^{\mathsf{T}},\qquad \Lambda=\operatorname{diag}(\lambda_1\ge\lambda_2\ge\cdots\ge\lambda_d\ge 0).$$

The $i$-th principal direction is $v_i$ (the $i$-th column of $V$), and the $i$-th principal component score is $\tilde Xv_i$. The projection matrix is $V_k=[v_1,\dots,v_k]$, and the reduced data are

$$Z=\tilde X V_k\in\mathbb{R}^{n\times k}.$$

**Definition (explained variance ratio).** The explained variance ratio of the first $k$ components is

$$\text{EVR}(k)=\frac{\sum_{i=1}^{k}\lambda_i}{\sum_{i=1}^{d}\lambda_i}.$$

**Definition (whitening).** Divide the scores by the square roots of the corresponding singular values:

$$Z_{\text{white}}=\tilde X V_k\Lambda_k^{-1/2},$$

so that every principal component has variance 1 and they are mutually uncorrelated.

**Theorem (optimality of PCA).** Among all unit vectors $w$, the projected variance $w^{\mathsf{T}}Sw$ is maximized by $\lambda_1$, attained at $w=v_1$; among unit vectors orthogonal to $v_1,\dots,v_{k-1}$, the maximum is $\lambda_k$, attained at $w=v_k$. Hence the subspace spanned by the first $k$ principal components maximizes the total projected variance and minimizes the reconstruction error

$$\sum_{i=1}^{n}\lVert x_i-\bar x-V_kV_k^{\mathsf{T}}(x_i-\bar x)\rVert^2.$$

**Relation to the SVD.** Run the SVD of the centered matrix, $\tilde X=U\Sigma V^{\mathsf{T}}$; then $S=\frac{1}{n-1}V\Sigma^2V^{\mathsf{T}}$, so

$$\lambda_i=\frac{\sigma_i^2}{n-1},\qquad \text{scores}=U\Sigma.$$

## 3. Why Define It This Way

**Why is maximizing variance equivalent to minimizing reconstruction error?** Let $w$ be a unit vector; project the samples onto $w$ and reconstruct, giving $\hat x_i=\bar x+ww^{\mathsf{T}}(x_i-\bar x)$. By Pythagoras (the projection is orthogonal to the residual),

$$\lVert x_i-\bar x\rVert^2=\lVert ww^{\mathsf{T}}(x_i-\bar x)\rVert^2+\lVert (I-ww^{\mathsf{T}})(x_i-\bar x)\rVert^2.$$

The left side is the total variance of all samples (a constant) and the first term is the variance retained by the projection. So "retain the most variance" and "minimize the residual sum of squares" are two sides of the same coin.

**Why are the directions eigenvectors of the covariance matrix?** Use a Lagrange multiplier. To maximize $w^{\mathsf{T}}Sw$ subject to $w^{\mathsf{T}}w=1$, form

$$\mathcal{L}=w^{\mathsf{T}}Sw-\lambda(w^{\mathsf{T}}w-1).$$

Differentiating with respect to $w$ and setting it to zero gives $2Sw-2\lambda w=0$, i.e. $Sw=\lambda w$. So every extremum must be an eigenvector, and the corresponding maximum is the eigenvalue. Taking the largest eigenvalue gives the first principal component; repeating the same argument in the remaining orthogonal complement gives the subsequent ones in order.

**Why must we center first?** Suppose the data all sit near $(100,100)$ with only tiny fluctuations. Without centering, the covariance matrix (more precisely the uncentered second moment $\frac1nX^{\mathsf{T}}X$) treats "the mean is far from the origin" as enormous variance, so the first principal component points toward the mean instead of toward the real direction of variation. Centering moves the origin to the data's centre of gravity, so that variance reflects only "fluctuation about the mean".

**Why are the eigenvectors automatically orthogonal?** Because $S$ is real symmetric. Eigenvectors of a real symmetric matrix belonging to distinct eigenvalues are necessarily orthogonal; if an eigenvalue is repeated, one may choose an orthogonal basis within its eigenspace. Orthogonality guarantees that the components are uncorrelated and the information is not duplicated.

**Why do units affect the result?** Variance carries units. Height measured in metres has variance about $0.01$; in centimetres, about $100$—a factor of ten thousand. PCA sees only numerical magnitude, so it naturally treats the feature with "the bigger unit" as "the more informative". If the features have different dimensions and you want them treated equally, standardize first: $z_{ij}=(x_{ij}-\bar x_j)/s_j$, which is equivalent to running PCA on the correlation matrix.

**Why do $1/n$ and $1/(n-1)$ not affect the directions?** They differ by a constant factor: the eigenvectors are unchanged, the eigenvalues scale by the same factor, and the explained variance ratios are unchanged. But for statistical inference and unbiased estimation of the population covariance, $1/(n-1)$ is the right choice.

**What are the limitations of PCA?** It finds only linear subspaces. If the data lie on a curved manifold (a Swiss roll, say), no line or plane can describe them, and one needs kernel PCA, t-SNE, UMAP or similar nonlinear methods. Moreover, PCA is sensitive to outliers because variance is a quadratic quantity: a single extreme point can drag the components toward it.

## 4. Intuition and Pictures

Think of the data as a cloud. PCA gives the cloud a new coordinate system: the first axis along the cloud's longest direction, the second along the longest remaining direction, and so on. Once the axes are chosen, keeping only the first few completes the dimensionality reduction.

| Concept | One-line reading | Common misconception |
|---|---|---|
| Centering | Move the cloud's centre of gravity to the origin | Forgetting to subtract the mean, so the mean poses as variance |
| First principal component | The cloud's longest direction | Assuming it must correspond to some original feature |
| Eigenvalue | The variance along that direction | Treating the eigenvalue as a correlation coefficient |
| Score | The sample's coordinate in the new system | Confusing it with the loading matrix |
| Explained variance ratio | Share of total variance held by the first $k$ directions | Assuming bigger is always better and ignoring information loss |

> Intuition: PCA is like straightening a photo taken at an angle. Nothing in the picture changes; the axes are merely rotated to align with the edges of the objects, so that fewer pixels suffice to describe the main shape.

> Another analogy: project a three-dimensional rugby ball onto a plane. Projecting along the long axis gives a long ellipse and retains the most information; projecting along a short axis gives a small circle and loses almost all the shape. PCA finds the long axis automatically.

## 5. Worked Examples

### Example 1 (Basic: complete PCA of four points)

Problem: the data points are $(1,1),(2,3),(3,2),(4,4)$. (1) Find the mean and covariance matrix; (2) find the eigenvalues and principal directions; (3) find the scores and the explained variance ratio; (4) reconstruct using the first principal component and compute the error.

Analysis: center first, then compute $S=\frac1n\tilde X^{\mathsf{T}}\tilde X$ (here $1/n$ is used to match the variance), then diagonalize a $2\times 2$ matrix.

Solution: (1) the mean is

$$\bar x=\left(\frac{1+2+3+4}{4},\frac{1+3+2+4}{4}\right)=(2.5,2.5).$$

The four centered vectors are

$$(-1.5,-1.5),\quad(-0.5,0.5),\quad(0.5,-0.5),\quad(1.5,1.5).$$

Hence

$$\sum\tilde x_1^2=2.25+0.25+0.25+2.25=5,\qquad \sum\tilde x_2^2=5,$$
$$\sum\tilde x_1\tilde x_2=2.25-0.25-0.25+2.25=4.$$

Thus

$$S=\frac14\begin{bmatrix}5&4\\4&5\end{bmatrix}=\begin{bmatrix}1.25&1\\1&1.25\end{bmatrix}.$$

(2) The characteristic polynomial is

$$\det(S-\lambda I)=(1.25-\lambda)^2-1=\lambda^2-2.5\lambda+0.5625.$$

The discriminant is $2.5^2-4\times 0.5625=6.25-2.25=4$, so

$$\lambda=\frac{2.5\pm 2}{2}=2.25\ \text{or}\ 0.25.$$

For $\lambda_1=2.25$, $(S-\lambda_1I)v=0$ gives $-v_1+v_2=0$, so $v_1=(1,1)^{\mathsf{T}}/\sqrt2$. For $\lambda_2=0.25$ we get $v_2=(1,-1)^{\mathsf{T}}/\sqrt2$.

(3) The scores are $z_i=\tilde x_i^{\mathsf{T}}v_1$:

$$z_1=\frac{-1.5-1.5}{\sqrt2}=-2.121,\quad z_2=\frac{-0.5+0.5}{\sqrt2}=0,$$
$$z_3=0,\quad z_4=\frac{1.5+1.5}{\sqrt2}=2.121.$$

The second-component scores are $0,-0.707,0.707,0$. The explained variance ratio is

$$\frac{2.25}{2.25+0.25}=0.9,$$

i.e. the first component retains $90\%$ of the variance.

(4) Reconstruct with the first component only: $\hat x_i=\bar x+z_iv_1$. For the first point,

$$\hat x_1=(2.5,2.5)-2.121\cdot\frac{1}{\sqrt2}(1,1)=(2.5-1.5,2.5-1.5)=(1,1),$$

recovered exactly. The second and third points reconstruct to $(2.5,2.5)$, with error vectors $(-0.5,0.5)$ and $(0.5,-0.5)$ of squared norm $0.5$ each. The total error is $1$, the average $0.25$—exactly $\lambda_2$.

Comment: the first and fourth points lie on the diagonal $y=x$, so the first component represents them exactly; the second and third deviate from the diagonal and account for the discarded variance $0.25$. The geometric picture is very clear: the cloud is elongated along $45^\circ$, and PCA rotates the axes onto that direction.

### Example 2 (Intermediate: the correspondence between PCA and the SVD)

Problem: run the SVD of the centered matrix $\tilde X$ from Example 1, verify $\lambda_i=\sigma_i^2/n$, and write down the score matrix.

Analysis: $\tilde X$ is $4\times 2$, so $V$ is $2\times 2$ and $\Sigma$ is $4\times 2$. Only the eigenvalues of $\tilde X^{\mathsf{T}}\tilde X$ are needed.

Solution: the centered matrix is

$$\tilde X=\begin{bmatrix}-1.5&-1.5\\-0.5&0.5\\0.5&-0.5\\1.5&1.5\end{bmatrix}.$$

Hence

$$\tilde X^{\mathsf{T}}\tilde X=\begin{bmatrix}5&4\\4&5\end{bmatrix}.$$

The eigenvalues are $9$ and $1$, so $\sigma_1=3$ and $\sigma_2=1$. From $\lambda_i=\sigma_i^2/n$,

$$\lambda_1=\frac{9}{4}=2.25,\qquad \lambda_2=\frac{1}{4}=0.25,$$

in complete agreement with Example 1. The right singular vectors are still $v_1=(1,1)^{\mathsf{T}}/\sqrt2$ and $v_2=(1,-1)^{\mathsf{T}}/\sqrt2$.

The left singular vectors:

$$u_1=\frac{\tilde Xv_1}{3}=\frac{1}{3}\cdot\frac{1}{\sqrt2}\begin{bmatrix}-3\\0\\0\\3\end{bmatrix}=\frac{1}{\sqrt2}\begin{bmatrix}-1\\0\\0\\1\end{bmatrix},$$

$$u_2=\frac{\tilde Xv_2}{1}=\frac{1}{\sqrt2}\begin{bmatrix}0\\-1\\1\\0\end{bmatrix}.$$

The score matrix is $Z=U\Sigma$: the first column is $3u_1=(-2.121,0,0,2.121)^{\mathsf{T}}$ and the second is $1\cdot u_2=(0,-0.707,0.707,0)^{\mathsf{T}}$, matching Example 1.

Comment: this correspondence matters a great deal. In practice the data matrix is often huge; forming the $d\times d$ covariance matrix and diagonalizing it costs $O(nd^2)$, whereas a truncated SVD of $\tilde X$ (randomized SVD, for instance) computes only the leading singular values at cost $O(ndk)$—the standard recipe for large-scale PCA.

### Example 3 (Advanced: a "fake principal component" caused by forgetting to standardize)

Problem: the data are $(1,1000),(2,2000),(3,3000),(4,4000)$; the two features are perfectly linearly dependent. (1) Run PCA without standardization and find the first principal direction and the explained variance ratio; (2) standardize and repeat, comparing the results; (3) state the lesson.

Analysis: the second column is 1000 times the first, so its variance is $10^6$ times larger. Compute the covariance matrix first.

Solution: (1) the mean is $(2.5,2500)$. After centering,

$$(-1.5,-1500),\ (-0.5,-500),\ (0.5,500),\ (1.5,1500).$$

The covariance matrix (with $1/n$) is

$$S=\begin{bmatrix}1.25&1250\\1250&1250000\end{bmatrix}.$$

Since the columns are perfectly linearly dependent, $S$ has rank 1 and the determinant is

$$1.25\times 1250000-1250^2=1562500-1562500=0.$$

The eigenvalues are $\lambda_1=1250001.25$ and $\lambda_2=0$. The first eigenvector satisfies $(S-\lambda_1I)v=0$; its second row gives $1250v_1+(1250000-\lambda_1)v_2=0$, i.e. $1250v_1-1.25v_2=0$, so $v_2=1000v_1$. After normalization,

$$v_1\approx(0.001,0.9999995)^{\mathsf{T}},$$

pointing almost entirely along the second feature. The explained variance ratio is $100\%$, but only because the data have rank 1—it does not mean the first component is "meaningful".

(2) Standardize: the sample standard deviations of the two columns are

$$s_1=\sqrt{1.25}\approx 1.118,\qquad s_2=\sqrt{1250000}\approx 1118.03.$$

After standardization each column has variance 1 and the correlation is 1, so the covariance (correlation) matrix is

$$R=\begin{bmatrix}1&1\\1&1\end{bmatrix},$$

with eigenvalues $2$ and $0$ and first eigenvector $(1,1)^{\mathsf{T}}/\sqrt2$. Each feature now carries half the weight.

(3) The lesson: without standardization, PCA is effectively "whoever has the larger numbers wins", and the first component is hijacked by the feature with the bigger unit; after standardization, PCA looks for directions in the sense of "relative change". Whenever the features have different dimensions, standardize first. Conversely, if all features share a unit and you genuinely want features with large absolute fluctuations to matter more, not standardizing is reasonable—it depends on the problem, not on dogma.

Comment: the trap is that "explained variance ratio $100\%$" looks beautiful and easily suggests a perfect result. In fact it only says the data have rank 1; the direction of the first component may still be meaningless in the domain.

## 6. Common Mistakes and Pitfalls

- Mistake: running PCA without centering. Correction: the uncentered second moment mistakes the mean direction for the direction of maximum variance; subtract the mean first.
- Mistake: not standardizing when the units differ. Correction: features with large magnitudes monopolize the components; apply $z$-score standardization, or state explicitly why the original scale is kept.
- Mistake: equating a "high explained variance ratio" with "a good model". Correction: a high ratio only says the data are low-rank or the features strongly correlated; it does not make the components physically interpretable.
- Mistake: confusing loadings (eigenvectors) with scores (projected coordinates). Correction: loadings describe "how the original features combine into a component"; scores describe "where each sample sits in the new coordinates"—their dimensions are $d$ and $n$ respectively.
- Mistake: using PCA for feature selection and then interpreting by original names. Correction: a principal component is a linear combination of the original features and usually corresponds to no single one; for sparse, interpretable directions use sparse PCA.
- Mistake: ignoring outliers. Correction: variance is quadratic, so one extreme point can swing the components; apply robust statistics or outlier detection first.
- Mistake: assuming PCA handles nonlinear structure. Correction: PCA finds only linear subspaces; curved manifolds require kernel PCA, autoencoders or manifold learning.
- Mistake: fitting PCA separately on training and test sets. Correction: the principal directions must be estimated on the training set only and then applied to the test set, otherwise information leaks.

## 7. Summary and Mnemonic

Key points:

- PCA looks for the orthogonal directions that maximize projected variance, equivalently minimizing reconstruction error;
- The directions are eigenvectors of the covariance matrix $S=\tilde X^{\mathsf{T}}\tilde X/(n-1)$ and the variances are the eigenvalues;
- Explained variance ratio $=\sum_{i\le k}\lambda_i/\sum_i\lambda_i$;
- Relation to the SVD: $\lambda_i=\sigma_i^2/(n-1)$, scores $=U\Sigma$;
- Always center first; standardize when units differ;
- PCA is linear, sensitive to outliers, and cannot handle curved manifolds.

Mnemonic: **"Subtract the mean, then hunt the axis; biggest variance is best; standardize when units clash; don't force what isn't linear."**`,
    keyPoints: [
      'PCA maximizes projected variance, equivalently minimizes reconstruction error',
      'The principal components are eigenvectors of the covariance matrix; the eigenvalues are variances',
      'Center first; standardize when the units differ',
      'Correspondence with the SVD: λ=σ²/(n-1), scores = UΣ',
      'PCA is linear and sensitive to outliers',
    ],
  },
  'statistical-inference': {
    chapter: 'Chapter 3 Statistical Inference',
    title: 'Frequentist and Bayesian Inference',
    summary:
      'The same data, two worldviews: one asks "what is the parameter?", the other asks "what do I believe the parameter is?"',
    content: String.raw`

You toss a coin 10 times and get 7 heads. What is the probability $p$ that the coin lands heads? Intuition says $0.7$. But if you know the coin comes from a mint whose "head probability is centred at $0.5$", you might pull the estimate a little toward $0.5$, say $0.64$. The former is the frequentist maximum likelihood estimate; the latter is the Bayesian posterior mean.

Both approaches are reasonable; the disagreement is about what "probability" means. Frequentists regard $p$ as a fixed unknown constant and the data as random; a "$95\%$ confidence interval" means that if you repeated the experiment infinitely often, about $95\%$ of the intervals would cover the true value—but for the single interval in your hand you may not say "there is a $95\%$ probability that $p$ lies inside". Bayesians regard $p$ itself as possibly random: the prior expresses "belief before seeing data", and once the data arrive Bayes' rule updates it into a posterior; only then may a "$95\%$ credible interval" be read as "there is a $95\%$ probability that $p$ lies inside".

This is not wordplay. The two kinds of interval may be numerically close, but in small-sample, strong-prior or multiple-comparison settings they lead to sharply different conclusions. More common is mixing the two vocabularies: computing a confidence interval by frequentist means and interpreting it in Bayesian language, or treating a $p$-value as "the probability that the null hypothesis is true". These confusions are a major source of the reproducibility crisis in science.

Motivating questions: what exactly is a $p$-value? Why can a "$95\%$ confidence interval" not be read as "the parameter lies inside with probability $95\%$"? Is a Bayesian prior "subjective bias"?

## 2. Rigorous Definitions

**Definition (statistical model).** A statistical model is a family of probability distributions $\{P_\theta:\theta\in\Theta\}$, where $\theta$ is the parameter and $\Theta$ the parameter space. The samples $x_1,\dots,x_n$ are regarded as drawn independently from some $P_\theta$.

**Definition (likelihood function).** Given an observation $x$, the likelihood is

$$L(\theta)=p(x\mid\theta),$$

i.e. "the probability (density) of observing this data when the parameter is $\theta$". Note that it is a function of $\theta$ with the data fixed. The maximum likelihood estimate (MLE) is

$$\hat\theta_{\mathrm{MLE}}=\arg\max_{\theta\in\Theta}L(\theta).$$

**Definition (sufficient statistic).** If $T(X)$ satisfies $p(x\mid\theta)=h(x)g(T(x),\theta)$, then $T$ is a sufficient statistic: once $T(x)$ is known, the data contain no further information about $\theta$. For the Bernoulli model the number of heads $\sum x_i$ is sufficient.

**Definition (confidence interval).** The interval $[L(X),U(X)]$ has confidence level $1-\alpha$ if for every $\theta$,

$$P_\theta\bigl(L(X)\le\theta\le U(X)\bigr)\ge 1-\alpha.$$

The probability refers to the random interval, not to the fixed parameter.

**Definition ($p$-value).** Let $T$ be the test statistic with observed value $t_{\mathrm{obs}}$. For the right-sided test of $H_0:\theta=\theta_0$ against $H_1:\theta>\theta_0$,

$$p=P_{\theta_0}(T\ge t_{\mathrm{obs}}).$$

It is "the probability, under the null hypothesis, of a result at least as extreme". Reject $H_0$ when $p<\alpha$.

**Definition (Bayesian inference).** Give the parameter a prior distribution $\pi(\theta)$; after observing $x$,

$$\pi(\theta\mid x)=\frac{p(x\mid\theta)\pi(\theta)}{\int p(x\mid\theta')\pi(\theta')\,d\theta'}.$$

The denominator is a normalizing constant (the marginal likelihood). The posterior mean, posterior median or maximum a posteriori estimate (MAP) may serve as a point estimate:

$$\hat\theta_{\mathrm{MAP}}=\arg\max_\theta p(x\mid\theta)\pi(\theta).$$

**Definition (conjugate prior).** If the prior and posterior belong to the same family of distributions, the prior is called conjugate. The Bernoulli likelihood with a Beta prior is the standard example: if $p\sim\mathrm{Beta}(\alpha,\beta)$ and we observe $k$ successes and $n-k$ failures, then

$$p\mid x\sim\mathrm{Beta}(\alpha+k,\ \beta+n-k).$$

**Definition (credible interval).** A Bayesian $95\%$ credible interval $[a,b]$ satisfies

$$P(\theta\in[a,b]\mid x)=0.95,$$

where the probability refers to the posterior distribution.

## 3. Why Define It This Way

**Why is the likelihood not "the probability of the parameter"?** Because frequentists do not treat $\theta$ as a random variable: $\int L(\theta)\,d\theta$ is usually not 1, and there is no such thing as "the probability that $\theta$ takes a certain value". $L(\theta)$ answers: "if the true value were $\theta$, how plausible would this data be?" The MLE picks the parameter that makes the data look most plausible, not the "most probable parameter". Only the Bayesian framework supplies that: the posterior really is the probability distribution of the parameter.

**Why do we usually take logarithms of the likelihood?** Because independence turns the likelihood into a product, and the logarithm turns it into a sum, which is easier to differentiate and avoids numerical underflow:

$$\ell(\theta)=\log L(\theta)=\sum_{i=1}^{n}\log p(x_i\mid\theta).$$

The logarithm is strictly increasing, so it does not move the extremum. For the Bernoulli model,

$$\ell(p)=k\log p+(n-k)\log(1-p),$$

and setting the derivative to zero gives $k/p-(n-k)/(1-p)=0$, hence $\hat p=k/n$.

**Why can the interpretation of a confidence interval not be reversed?** Because the frequentist probability is defined only for repeated sampling. The true value $\theta$ is fixed and the interval is random: each experiment yields a different $[L,U]$, and about $95\%$ of them cover $\theta$. Once you have computed a concrete $[0.42,0.98]$, it either covers the truth or it does not—the probability is 0 or 1. Saying "$\theta$ lies inside with probability $95\%$" treats $\theta$ as random, which is Bayesian language.

**Why is a $p$-value not "the probability that the null is true"?** $p=P(\text{data at least this extreme}\mid H_0)$ is conditional on $H_0$, whereas one would like to know $P(H_0\mid\text{data})$. Bayes' rule links them, but requires a prior:

$$P(H_0\mid x)=\frac{P(x\mid H_0)P(H_0)}{P(x\mid H_0)P(H_0)+P(x\mid H_1)P(H_1)}.$$

When the prior $P(H_0)$ is small (in genome-wide studies, for instance, where thousands of genes are a priori "probably unrelated"), the posterior probability can be low even for $p=0.001$. This is one root of "significant $p$-value but irreproducible result".

**Why does Bayesian inference need a prior?** Because to speak of "the probability of a parameter" you need a starting point. The prior is not cheating; it makes existing knowledge explicit. If you do not want it to dominate, use a weakly informative prior (a uniform Beta(1,1), say) or a hierarchical prior. As data accumulate, the likelihood dominates the posterior and the influence of the prior fades—the "convergence" of Bayesian updating.

**Why are conjugate priors useful?** Because they keep the posterior inside a known family, so no numerical integration is needed. The Beta–Binomial update rule is extremely simple: add the numbers of successes and failures to the two prior parameters. This is computationally convenient and also intuitive: the prior amounts to "virtual $\alpha-1$ successes and $\beta-1$ failures". Beta(2,2) is like having seen 1 success and 1 failure beforehand.

**Why is the Bayesian estimate "pulled toward" the prior?** The posterior mean is a weighted average of the prior mean and the sample mean:

$$E[p\mid x]=\frac{\alpha+k}{\alpha+\beta+n}=\frac{\alpha+\beta}{\alpha+\beta+n}\cdot\frac{\alpha}{\alpha+\beta}+\frac{n}{\alpha+\beta+n}\cdot\frac{k}{n}.$$

The larger the sample size $n$, the greater the weight of the data. This is precisely the mathematical form of shrinkage, and the ancestor of ridge regression and hierarchical models.

## 4. Intuition and Pictures

| Dimension | Frequentist | Bayesian |
|---|---|---|
| Parameter | Fixed unknown constant | Random variable with a distribution |
| Meaning of probability | Long-run relative frequency | Degree of belief |
| Main outputs | Point estimate, confidence interval, $p$-value | Posterior distribution, credible interval |
| Interval reading | About $95\%$ of repeated intervals cover the truth | The posterior probability that the parameter lies inside is $95\%$ |
| Prior information | Not used | Introduced explicitly through the prior |
| Small samples | Relies on asymptotic approximations | The prior can stabilize the estimate |

> Intuition: the frequentist is like an archer shooting blindfolded and studying the distribution of arrows; the Bayesian first estimates where the bullseye is and then revises that estimate according to where the arrow landed. The former asks "how good is this action in the long run", the latter "given this arrow, where is the bullseye most likely to be".

> Another analogy: a $p$-value is "the probability of evidence this strong if the defendant were innocent", yet it is often misread as "the probability that the defendant is guilty". The former conditions on innocence, the latter on the evidence—exactly the opposite direction. This is the prosecutor's fallacy.

## 5. Worked Examples

### Example 1 (Basic: MLE and confidence interval for a Bernoulli model)

Problem: toss a coin 10 times, 7 heads. (1) Find the MLE of $p$; (2) find the Fisher information and the standard error; (3) construct the $95\%$ Wald interval and point out its problem.

Analysis: the likelihood is $p^7(1-p)^3$; take logs and differentiate. The standard error comes from the Fisher information $I(p)=n/[p(1-p)]$.

Solution: (1) the log-likelihood is

$$\ell(p)=7\log p+3\log(1-p).$$

Differentiating:

$$\ell'(p)=\frac{7}{p}-\frac{3}{1-p}=0\ \Longrightarrow\ 7(1-p)=3p\ \Longrightarrow\ p=\frac{7}{10}=0.7.$$

The second derivative $\ell''(p)=-7/p^2-3/(1-p)^2<0$, so this is a maximum: $\hat p=0.7$.

(2) The Fisher information is

$$I(p)=\frac{n}{p(1-p)}=\frac{10}{0.7\times 0.3}=\frac{10}{0.21}\approx 47.62.$$

The standard error is

$$\mathrm{SE}=\frac{1}{\sqrt{I(\hat p)}}=\sqrt{\frac{0.21}{10}}=\sqrt{0.021}\approx 0.1449.$$

(3) The Wald interval:

$$\hat p\pm 1.96\,\mathrm{SE}=0.7\pm 1.96\times 0.1449=0.7\pm 0.284.$$

That is, $[0.416,\ 0.984]$.

The problem: the upper bound approaches 1, and with a more extreme sample (10 heads out of 10, say) the Wald interval degenerates to the single point $[1,1]$—completely distorted. The reason is that the normal approximation ignores the range of $p$ and the fact that the variance depends on $p$. Better choices are the Wilson interval or the exact Clopper–Pearson interval.

Comment: the MLE uses only the sufficient statistic "number of heads", which matches intuition. The Wald interval behaves well for large samples with $p$ away from 0 and 1, but is unreliable near the boundary.

### Example 2 (Intermediate: conjugate Beta–Binomial updating)

Problem: prior $p\sim\mathrm{Beta}(2,2)$, and 7 successes out of 10 observations. (1) Find the posterior; (2) find the posterior mean, mode and standard deviation; (3) compare with the MLE and explain shrinkage.

Analysis: the Beta density is proportional to $p^{\alpha-1}(1-p)^{\beta-1}$; multiplying by the Bernoulli likelihood $p^k(1-p)^{n-k}$ adds the exponents, giving the posterior.

Solution: (1) the prior exponents are $(1,1)$ and the likelihood exponents are $(7,3)$; adding gives $(8,4)$, hence

$$p\mid x\sim\mathrm{Beta}(9,5).$$

(2) The posterior mean:

$$E[p\mid x]=\frac{9}{9+5}=\frac{9}{14}\approx 0.6429.$$

The mode:

$$\mathrm{Mode}=\frac{\alpha-1}{\alpha+\beta-2}=\frac{8}{12}\approx 0.6667.$$

The variance:

$$\mathrm{Var}=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}=\frac{45}{196\times 15}=\frac{45}{2940}\approx 0.01531,$$

so the standard deviation is $\sqrt{0.01531}\approx 0.1237$. An approximate $95\%$ credible interval is $0.6429\pm 1.96\times 0.1237$, about $[0.400,\ 0.885]$.

(3) The MLE is $0.7$, the prior mean is $0.5$, and the posterior mean $0.6429$ lies between them, closer to the data. Check with the weighted-average formula:

$$E[p\mid x]=\frac{4}{14}\times 0.5+\frac{10}{14}\times 0.7=\frac{2}{14}+\frac{7}{14}=\frac{9}{14}.$$

The prior acts like "4 virtual observations" (2 successes, 2 failures); with 10 real observations the data get weight $10/14$.

Comment: the posterior mean $0.6429$ is more conservative than the MLE—this is shrinkage. With a strong prior (Beta(100,100), say) the posterior is firmly pulled toward $0.5$; with a weak prior (Beta(1,1)) it nearly equals the likelihood. The strength of the prior must be set by domain knowledge, never tuned to make the answer look nice.

### Example 3 (Advanced: base-rate fallacy and multiple comparisons)

Problem: (1) A disease has prevalence $1\%$; a test has sensitivity $99\%$ and specificity $99\%$. Someone tests positive—what is the probability that they actually have the disease? (2) Run 100 independent hypothesis tests at significance level $0.05$, all null hypotheses being true; what is the probability of at least one false positive?

Analysis: (1) use Bayes' rule, noting that the denominator consists of "true positives + false positives"; (2) use the complement.

Solution: (1) let $D$ denote disease and $+$ a positive test. We know

$$P(D)=0.01,\quad P(+\mid D)=0.99,\quad P(+\mid D^c)=0.01.$$

First the overall positive rate:

$$P(+)=P(+\mid D)P(D)+P(+\mid D^c)P(D^c)=0.99\times 0.01+0.01\times 0.99=0.0198.$$

Hence

$$P(D\mid +)=\frac{0.0099}{0.0198}=0.5.$$

In other words, after a positive test the probability of actually having the disease is only $50\%$. The reason is the low prevalence: the absolute number of false positives matches that of true positives—in every 10000 people there are 99 true positives and 99 false positives.

(2) The probability of no false positive in one test is $0.95$, so for 100 independent tests the probability of none at all is $0.95^{100}$:

$$0.95^{100}=\exp(100\ln 0.95)=\exp(-5.129)\approx 0.00592.$$

Thus the probability of at least one false positive is

$$1-0.00592\approx 0.994,$$

as high as $99.4\%$. This is the multiple-comparison problem: with many tests, "significance" is almost inevitable, and one must apply a Bonferroni correction (divide $\alpha$ by the number of tests) or control the FDR.

Comment: the two parts are two sides of the same coin. Part (1) reminds us that $P(D\mid +)\neq P(+\mid D)$; part (2) reminds us that $P(\text{at least one significant}\mid H_0\text{ all true})$ explodes with the number of tests. Treating a $p$-value as "the probability that the null is true", or ignoring multiple comparisons, is seriously misleading.

## 6. Common Mistakes and Pitfalls

- Mistake: treating the likelihood $L(\theta)$ as a probability density for $\theta$. Correction: the likelihood is not normalized, and under the frequentist view $\theta$ is not a random variable; only the posterior is a probability distribution for the parameter.
- Mistake: saying "the parameter lies in the confidence interval with probability $95\%$". Correction: the confidence level describes the coverage of repeated sampling; only a Bayesian credible interval may be read that way.
- Mistake: treating a $p$-value as "the probability that the null is true". Correction: $p=P(\text{data}\mid H_0)$, not $P(H_0\mid\text{data})$; the two differ by a prior.
- Mistake: concluding "no difference" or "the null holds" just because $p>0.05$. Correction: failing to reject is not accepting; the sample may be too small or the effect too weak.
- Mistake: running many tests without correction. Correction: with 100 tests the false-positive probability can reach $99\%$; use Bonferroni, Holm or FDR.
- Mistake: choosing the prior arbitrarily and adjusting it after seeing results. Correction: the prior must be fixed before looking at the data; post-hoc tuning voids the posterior and is the Bayesian version of $p$-hacking.
- Mistake: believing Bayesian methods "need no assumptions". Correction: priors, likelihoods and independence are all assumptions; Bayes merely writes them down more explicitly.
- Mistake: using Wald intervals for small samples. Correction: when $p$ is near 0 or 1 and $n$ is small the normal approximation fails; use Wilson, Clopper–Pearson or a Bayesian interval.

## 7. Summary and Mnemonic

Key points:

- Frequentists treat the parameter as a fixed constant and infer with likelihoods, confidence intervals and $p$-values;
- Bayesians treat the parameter as a random variable and infer with priors, posteriors and credible intervals;
- The MLE maximizes the likelihood, usually via the log-derivative; for Bernoulli data $\hat p=k/n$;
- Beta–Binomial conjugate update: $\mathrm{Beta}(\alpha,\beta)\to\mathrm{Beta}(\alpha+k,\beta+n-k)$;
- The posterior mean is a weighted average of prior and sample means—shrinkage;
- A $p$-value is not $P(H_0\mid x)$, confidence intervals admit no Bayesian reading, and multiple comparisons must be corrected.

Mnemonic: **"Likelihood reads the data, the prior reads belief; never read intervals backwards, and a $p$-value is no posterior."**`,
    keyPoints: [
      'Frequentist: the parameter is fixed; probability is long-run frequency',
      'Bayesian: the parameter is random; prior times likelihood gives the posterior',
      'The MLE maximizes the likelihood; for Bernoulli data p̂=k/n',
      'Beta–Binomial conjugate updating; the posterior mean exhibits shrinkage',
      'A p-value is not the probability that the null is true; multiple comparisons need correction',
    ],
  },
  'ml-optimization': {
    chapter: 'Chapter 4 Optimization in Machine Learning',
    title: 'Empirical Risk Minimization and Regularization',
    summary:
      'Training a model means picking, from a pile of candidate functions, the one with the smallest loss—but fit the training set too closely and it will fail on new data.',
    content: String.raw`

Most machine-learning tasks ultimately reduce to an optimization problem: given training data $(x_1,y_1),\dots,(x_n,y_n)$, find a prediction function $f$ that minimizes the average loss on the training set. This is empirical risk minimization (ERM). Linear regression, logistic regression, support vector machines and neural networks are all special cases; they differ only in the choice of loss function and function class.

But "smallest training error" is not the same as "best model". An extreme example: fit a degree-9 polynomial to 10 points and the training error can be exactly zero; feed it a fresh sample from the same distribution and the predictions may be hopelessly wrong. This is overfitting—the model has treated the noise in the training set as if it were a pattern.

The remedy is to add a penalty term that keeps the model from becoming "too complex". Ridge regression penalizes the sum of squared weights; the lasso penalizes the sum of absolute weights. The former shrinks all weights uniformly, the latter can push some weights to exactly zero, incidentally performing feature selection. The strength of the penalty is controlled by the hyperparameter $\lambda$: $\lambda=0$ recovers ordinary least squares, while $\lambda\to\infty$ drives all weights to zero.

Motivating questions: why does $L_2$ regularization only "shrink" the weights while $L_1$ can "delete" features? Why does gradient descent diverge as soon as the learning rate is a little too large? Is regularization restricting the model, or helping it find a more reliable solution?

## 2. Rigorous Definitions

**Definition (empirical risk).** Given a loss function $\ell(\hat y,y)$, a model $f_w$ and a training set, the empirical risk is

$$\hat R_n(w)=\frac{1}{n}\sum_{i=1}^{n}\ell\bigl(f_w(x_i),y_i\bigr).$$

The parameter learned by ERM is $\hat w=\arg\min_w\hat R_n(w)$.

**Definition (regularized empirical risk).** Adding a regularizer $\Omega(w)$:

$$\min_w\ \frac{1}{n}\sum_{i=1}^{n}\ell\bigl(f_w(x_i),y_i\bigr)+\lambda\Omega(w),\qquad \lambda\ge 0.$$

Ridge regression takes $\ell=(\hat y-y)^2$ and $\Omega=\lVert w\rVert_2^2$; the lasso takes $\Omega=\lVert w\rVert_1=\sum_j\lvert w_j\rvert$.

**Definition (closed-form solution of ridge regression).** For the linear model $Xw$ with squared loss,

$$\hat w_{\text{ridge}}=(X^{\mathsf{T}}X+\lambda I)^{-1}X^{\mathsf{T}}y.$$

Even if $X^{\mathsf{T}}X$ is singular, $\lambda>0$ guarantees the matrix is invertible.

**Definition (gradient descent).** Given a differentiable objective $F(w)$ and a learning rate $\eta>0$, iterate

$$w^{(t+1)}=w^{(t)}-\eta\nabla F(w^{(t)}).$$

Stochastic gradient descent (SGD) estimates the gradient from one sample or a small batch at a time, replacing the full gradient by an unbiased but high-variance estimate.

**Definition (convex function).** $F$ is convex if for all $w_1,w_2$ and $t\in[0,1]$,

$$F(tw_1+(1-t)w_2)\le tF(w_1)+(1-t)F(w_2).$$

Every local minimum of a convex function is a global minimum. Squared loss with $L_2$ regularization and logistic loss with $L_2$ regularization are both convex; neural networks generally are not.

**Definition (bias–variance decomposition).** For squared loss, if $y=f^*(x)+\varepsilon$ with $\mathbb{E}[\varepsilon]=0$ and $\mathrm{Var}(\varepsilon)=\sigma^2$, then

$$\mathbb{E}\bigl[(y-\hat f(x))^2\bigr]=\bigl(\mathrm{Bias}\hat f(x)\bigr)^2+\mathrm{Var}\bigl(\hat f(x)\bigr)+\sigma^2.$$

## 3. Why Define It This Way

**Why does ERM overfit?** Because the training set is only a finite sample of the population. ERM cares only about "small loss at these $n$ points", not "small loss at unseen points". When the model capacity is large enough, it can fill the gaps between the training points with any shape it likes, noise included. Formally, the training error is a biased estimate of the generalization error, and the gap grows with model complexity.

**Why does $L_2$ regularization prevent overfitting?** It bounds the norm of the weights, so the model cannot assign extremely large coefficients to particular features. From the bias–variance view, limiting capacity increases bias and decreases variance; when variance dominates the error, the total error falls. From the optimization view, $\lambda>0$ raises every eigenvalue of $X^{\mathsf{T}}X$ by $\lambda$, lowering the condition number from $\sigma_1^2/\sigma_r^2$ to $(\sigma_1^2+\lambda)/(\sigma_r^2+\lambda)$: numerically more stable, and the solution less sensitive to perturbations of the data.

**Why does $L_1$ regularization produce sparse solutions?** Two angles.

Geometric: the $L_1$ ball is a diamond in two dimensions (a polytope in higher dimensions) with vertices on the coordinate axes. When a level set of the loss touches the $L_1$ ball, the contact point is very likely at a vertex, so some coordinates become exactly zero. The $L_2$ ball is round, and the contact point is generally not on an axis.

Algebraic: consider the one-dimensional problem $\min_w \frac12(w-y)^2+\lambda\lvert w\rvert$. For $w\neq 0$, set the subgradient to contain zero:

$$w-y+\lambda\,\mathrm{sign}(w)=0.$$

If $w>0$ then $w=y-\lambda$; if $w<0$ then $w=y+\lambda$. Combined,

$$w=\mathrm{sign}(y)\max(\lvert y\rvert-\lambda,0).$$

This is soft thresholding. When $\lvert y\rvert\le\lambda$, $w$ is set exactly to zero. The $L_2$ solution, by contrast, is $w=y/(1+\lambda)$, which vanishes only when $y=0$ and never actively "deletes a feature".

**Why does gradient descent require a small enough learning rate?** For the quadratic $F(w)=\frac12a(w-w^*)^2$, the error of gradient descent obeys

$$w^{(t+1)}-w^*=(1-\eta a)(w^{(t)}-w^*).$$

It converges if and only if $\lvert 1-\eta a\rvert<1$, i.e. $0<\eta<2/a$. If $\eta>2/a$ the error is amplified at every step and diverges exponentially; if $\eta=2/a$ it oscillates forever between two values. The learning rate is not "the smaller the better": too small converges slowly, too large diverges, and the right value depends on the curvature $a$. For a general smooth function, $a$ is the largest curvature (the largest eigenvalue of the Hessian).

**Why regularize instead of simply restricting model size?** The two are equivalent in some cases (ridge regression is the Lagrangian form of the constraint $\lVert w\rVert_2\le t$), but the penalty form is easier to optimize: constrained optimization needs projections, whereas the penalty only adds a term to the gradient. Moreover $\lambda$ provides a continuous "complexity knob" that cross-validation can tune.

## 4. Intuition and Pictures

Think of training as "drawing a curve through all the points on a sheet of paper". The denser the points, the more easily noise drags the curve astray. Regularization attaches a rubber band to the curve and pulls it toward a simpler shape.

| Regularization | Penalty | Character of the solution | Geometric picture | When to use |
|---|---|---|---|---|
| None | $0$ | Minimal training error, high variance | Passes through every point | Many samples, little noise |
| Ridge | $\lVert w\rVert_2^2$ | All weights shrunk, none zero | Circular constraint | Correlated or collinear features |
| Lasso | $\lVert w\rVert_1$ | Some weights exactly zero | Diamond constraint | High-dimensional sparse data, feature selection |
| Elastic net | $\alpha\lVert w\rVert_1+(1-\alpha)\lVert w\rVert_2^2$ | Sparse yet stable | Between the two | Groups of correlated features |

> Intuition: $L_2$ is "turning everyone's volume down together"; $L_1$ is "muting the quiet speakers outright". The former keeps every feature but weakens their influence; the latter deletes the unimportant ones.

> Bias–variance: too simple a model has large bias (underfitting); too complex a model has large variance (overfitting). Regularization pulls the model from the "too complex" side toward the middle, trading a little bias for a large drop in variance.

## 5. Worked Examples

### Example 1 (Basic: closed-form ridge solution and shrinkage)

Problem: $X=\begin{bmatrix}1&0\\0&1\\1&1\end{bmatrix}$, $y=(1,2,3)^{\mathsf{T}}$. For $\lambda=0,1,10$, find the ridge solutions and observe the shrinkage.

Analysis: use $\hat w=(X^{\mathsf{T}}X+\lambda I)^{-1}X^{\mathsf{T}}y$; first compute $X^{\mathsf{T}}X$ and $X^{\mathsf{T}}y$.

Solution: first

$$X^{\mathsf{T}}X=\begin{bmatrix}1&0&1\\0&1&1\end{bmatrix}\begin{bmatrix}1&0\\0&1\\1&1\end{bmatrix}=\begin{bmatrix}2&1\\1&2\end{bmatrix},$$

$$X^{\mathsf{T}}y=\begin{bmatrix}1&0&1\\0&1&1\end{bmatrix}\begin{bmatrix}1\\2\\3\end{bmatrix}=\begin{bmatrix}4\\5\end{bmatrix}.$$

For $\lambda=0$:

$$\begin{bmatrix}2&1\\1&2\end{bmatrix}\begin{bmatrix}w_1\\w_2\end{bmatrix}=\begin{bmatrix}4\\5\end{bmatrix}.$$

From the first equation $w_2=4-2w_1$; substituting into the second gives $w_1+2(4-2w_1)=5$, so $-3w_1=-3$, $w_1=1$, $w_2=2$.

For $\lambda=1$:

$$\begin{bmatrix}3&1\\1&3\end{bmatrix}\begin{bmatrix}w_1\\w_2\end{bmatrix}=\begin{bmatrix}4\\5\end{bmatrix}.$$

Multiply the first equation by 3: $9w_1+3w_2=12$; subtract the second: $8w_1=7$, $w_1=0.875$; back-substituting, $w_2=4-3\times 0.875=1.375$.

For $\lambda=10$:

$$\begin{bmatrix}12&1\\1&12\end{bmatrix}\begin{bmatrix}w_1\\w_2\end{bmatrix}=\begin{bmatrix}4\\5\end{bmatrix}.$$

From the first equation $w_2=4-12w_1$; substituting into the second gives $w_1+12(4-12w_1)=5$, so $-143w_1=-43$, $w_1=43/143\approx 0.301$ and $w_2=4-12\times 0.301\approx 0.392$.

| $\lambda$ | $w_1$ | $w_2$ | $\lVert w\rVert_2$ |
|---|---|---|---|
| 0 | 1 | 2 | 2.236 |
| 1 | 0.875 | 1.375 | 1.630 |
| 10 | 0.301 | 0.392 | 0.494 |

Comment: as $\lambda$ grows, both weights are pushed toward zero, yet neither becomes exactly zero. This is the "uniform shrinkage" character of $L_2$. Ridge regression does not select features; it merely makes all coefficients more conservative.

### Example 2 (Intermediate: step size and convergence of gradient descent)

Problem: minimize $F(w)=(w-3)^2$. (1) With $w^{(0)}=0$ and $\eta=0.1$, write the iteration and compute the first four steps; (2) find the necessary and sufficient condition for convergence; (3) take $\eta=1.1$ and explain what happens.

Analysis: $F'(w)=2(w-3)$, so the iteration is $w^{(t+1)}=w^{(t)}-\eta\cdot 2(w^{(t)}-3)$.

Solution: (1) the iteration is

$$w^{(t+1)}=w^{(t)}-0.2(w^{(t)}-3)=0.8w^{(t)}+0.6.$$

Let $e_t=w^{(t)}-3$; then $e_{t+1}=0.8e_t$, so $e_t=0.8^t(e_0)=0.8^t(-3)$, i.e.

$$w^{(t)}=3-3\times 0.8^t.$$

The first four steps:

$$w^{(1)}=0.6,\quad w^{(2)}=1.08,\quad w^{(3)}=1.464,\quad w^{(4)}=1.7712.$$

Each step shrinks the error to $0.8$ of its value; the sequence converges to $3$.

(2) In general $e_{t+1}=(1-2\eta)e_t$, which converges if and only if

$$\lvert 1-2\eta\rvert<1\ \Longleftrightarrow\ 0<\eta<1.$$

Here $a=2$, consistent with $0<\eta<2/a=1$.

(3) With $\eta=1.1$ the factor is $1-2.2=-1.2$, and $\lvert -1.2\rvert>1$: the error alternates in sign and grows in magnitude,

$$w^{(1)}=-3.6,\quad w^{(2)}=7.32,\quad w^{(3)}=-14.184,\dots$$

diverging rapidly to infinity.

Comment: the learning rate is not an arbitrary hyperparameter; it is tied directly to the curvature of the objective. The larger the curvature (the steeper the function), the smaller the admissible step. In practice one uses line search, learning-rate decay or adaptive methods (Adam) to mitigate this.

### Example 3 (Advanced: $L_1$ soft thresholding and sparsity)

Problem: solve the one-dimensional problem $\min_w F(w)=\frac12(w-y)^2+\lambda\lvert w\rvert$ with $y=2$, $\lambda=1$; then with $y=0.5$, $\lambda=1$. Compare with the ridge solution $w=y/(1+\lambda)$.

Analysis: $F$ is not differentiable at $w=0$, so use subgradients. The subdifferential of $L_1$ is $\{\mathrm{sign}(w)\}$ for $w\neq 0$ and $[-1,1]$ at $w=0$.

Solution: first consider $w>0$. Then $\lvert w\rvert=w$; setting the derivative to zero,

$$w-y+\lambda=0\ \Longrightarrow\ w=y-\lambda.$$

This requires $w>0$, i.e. $y>\lambda$. Next consider $w<0$, where $\lvert w\rvert=-w$; setting the derivative to zero,

$$w-y-\lambda=0\ \Longrightarrow\ w=y+\lambda,$$

which requires $y<-\lambda$. Finally consider $w=0$: the subgradient is

$$0-y+\lambda[-1,1]=[-y-\lambda,\ -y+\lambda].$$

$w=0$ is optimal if and only if $0$ lies in this interval, i.e. $\lvert y\rvert\le\lambda$. Combining the three cases,

$$w=\mathrm{sign}(y)\max(\lvert y\rvert-\lambda,0).$$

For $y=2$, $\lambda=1$: $w=2-1=1$. For $y=0.5$, $\lambda=1$: $\lvert y\rvert<\lambda$, so $w=0$.

Ridge comparison: $w=y/(1+\lambda)$. For $y=2$, $w=1$; for $y=0.5$, $w=0.25$—still nonzero.

Comment: $L_1$ sends signals "below the threshold" exactly to zero, which is where sparsity comes from. The larger $\lambda$, the more features are deleted. This also explains why the lasso can perform feature selection while ridge regression cannot. Note that $L_1$ is not differentiable at the origin, so optimization requires subgradients, coordinate descent or proximal gradient methods.

## 6. Common Mistakes and Pitfalls

- Mistake: minimizing only the training error and never looking at validation error. Correction: training error decreases monotonically with complexity, while generalization error is U-shaped; select models with a validation set or cross-validation.
- Mistake: not standardizing features before regularization. Correction: $L_1$ and $L_2$ penalties are sensitive to the scale of the weights, so features with large units are over-penalized; standardize first.
- Mistake: assuming larger $\lambda$ is always better. Correction: too large a $\lambda$ underfits and drives all coefficients toward zero; choose it on a grid by cross-validation.
- Mistake: believing ridge regression performs feature selection. Correction: $L_2$ only shrinks, never zeroes; all features survive. Use the lasso or elastic net for sparsity.
- Mistake: setting the learning rate far too large or too small. Correction: too large diverges, too small converges slowly; base it on the curvature or search over it, and use an adaptive optimizer if needed.
- Mistake: expecting gradient descent to find the global optimum of a nonconvex problem. Correction: nonconvex objectives such as neural networks may stall in local minima or saddle points; in practice random initialization, momentum and SGD noise help.
- Mistake: tuning hyperparameters on the test set. Correction: that leaks information and destroys the independence of the test set; use a train/validation/test split or nested cross-validation.
- Mistake: assuming regularization always improves performance. Correction: with abundant data and little noise it may add bias with no benefit; decide by validation results.

## 7. Summary and Mnemonic

Key points:

- Empirical risk minimization optimizes only the training loss and easily overfits;
- Regularization adds a complexity penalty to the objective, trading bias for variance;
- The ridge closed form $(X^{\mathsf{T}}X+\lambda I)^{-1}X^{\mathsf{T}}y$ shrinks without zeroing;
- The lasso soft-threshold solution $\mathrm{sign}(y)\max(\lvert y\rvert-\lambda,0)$ produces sparsity;
- Gradient descent converges when $0<\eta<2/a$, with $a$ the largest curvature;
- The hyperparameter $\lambda$ must be chosen on a validation set or by cross-validation.

Mnemonic: **"Loss fits, penalty constrains; L2 shrinks, L1 erases; step size follows curvature, tuning follows validation."**`,
    keyPoints: [
      'Empirical risk minimization optimizes only the training loss and overfits easily',
      'Regularization trades bias for variance and controls model complexity',
      'Ridge has a closed form; L2 shrinks without zeroing',
      'Lasso soft thresholding gives sparse solutions and performs feature selection',
      'Gradient descent converges when 0<η<2/a, with a the largest curvature',
    ],
  },
  'kernels': {
    chapter: 'Chapter 5 Kernel Methods',
    title: 'The Kernel Trick and Support Vector Machines',
    summary:
      'No explicit lifting into higher dimensions, yet all its benefits: a kernel silently swaps the inner product, and the SVM widens the margin as far as it goes.',
    content: String.raw`

In the plane, two classes of points interleave: $(1,1)$ and $(-1,-1)$ in one, $(1,-1)$ and $(-1,1)$ in the other. No straight line separates them—this is the XOR problem. But change coordinates, say let $u=x_1x_2$; then the first class has $u=1$ and the second $u=-1$, and a vertical line does the job.

This "changing coordinates" is called a feature map $\varphi$. Mapping the data from the original space into a higher-dimensional one may make entangled points linearly separable. The trouble is that the high-dimensional map can be enormously expensive or even infinite-dimensional—you simply cannot write $\varphi(x)$ down.

The beauty of the kernel trick: many linear algorithms (the perceptron, the SVM, ridge regression, PCA) end up using only the **inner products** $\langle\varphi(x_i),\varphi(x_j)\rangle$ between samples, never $\varphi(x_i)$ alone. So we may define a function directly,

$$k(x,z)=\langle\varphi(x),\varphi(z)\rangle,$$

and replace every inner product by $k(x,z)$, without ever knowing what $\varphi$ looks like. It is like comparing how similar two people are: you need not list their entire CVs, only a formula that computes the similarity directly.

The support vector machine (SVM) is the most famous stage for the kernel trick. It demands not only that the two classes be separated but that the separation be as wide as possible—the wider the margin, the more tolerant the model is of noise. Remarkably, the final classifier is determined by a handful of "support vectors", while all other samples get weight exactly zero.

Motivating questions: which functions can serve as kernels? Why must the kernel matrix be positive semidefinite? Why does maximizing the margin improve generalization?

## 2. Rigorous Definitions

**Definition (feature map and kernel function).** Let $\varphi:\mathcal{X}\to\mathcal{H}$ map the input into an inner-product space $\mathcal{H}$. The kernel is defined as

$$k(x,z)=\langle\varphi(x),\varphi(z)\rangle_{\mathcal{H}}.$$

**Definition (positive semidefinite kernel).** A symmetric function $k:\mathcal{X}\times\mathcal{X}\to\mathbb{R}$ is a positive semidefinite kernel if for any finite set of points $x_1,\dots,x_n$ the Gram matrix

$$K=\bigl[k(x_i,x_j)\bigr]_{i,j=1}^{n}$$

is positive semidefinite, i.e. $c^{\mathsf{T}}Kc\ge 0$ for every $c\in\mathbb{R}^n$.

**Theorem (Mercer).** A continuous symmetric function $k$ is an inner product in some Hilbert space if and only if its Gram matrix is positive semidefinite for every finite point set. In that case there is a reproducing kernel Hilbert space (RKHS) $\mathcal{H}_k$ with $k(x,\cdot)\in\mathcal{H}_k$ and $f(x)=\langle f,k(x,\cdot)\rangle$.

**Common kernels**:

- Linear kernel $k(x,z)=x^{\mathsf{T}}z$;
- Polynomial kernel $k(x,z)=(x^{\mathsf{T}}z+c)^d$ with $c\ge 0$, $d\in\mathbb{N}$;
- Gaussian RBF kernel $k(x,z)=\exp\bigl(-\lVert x-z\rVert^2/(2\sigma^2)\bigr)$;
- Laplace kernel $k(x,z)=\exp(-\lVert x-z\rVert_1/\sigma)$.

**Definition (hard-margin SVM).** Given labels $y_i\in\{-1,+1\}$, solve

$$\min_{w,b}\ \frac12\lVert w\rVert^2\quad \text{s.t.}\quad y_i\bigl(w^{\mathsf{T}}\varphi(x_i)+b\bigr)\ge 1,\ i=1,\dots,n.$$

The constraints require every point not only to be on the correct side but to be at least one "unit margin" away from the boundary.

**Definition (soft-margin SVM).** Introduce slack variables $\xi_i\ge 0$:

$$\min_{w,b,\xi}\ \frac12\lVert w\rVert^2+C\sum_{i=1}^{n}\xi_i\quad \text{s.t.}\quad y_i\bigl(w^{\mathsf{T}}\varphi(x_i)+b\bigr)\ge 1-\xi_i.$$

$C>0$ controls the trade-off between "maximizing the margin" and "tolerating misclassification".

**Definition (dual problem).** With Lagrange multipliers $\alpha_i\ge 0$ one obtains

$$\max_{\alpha}\ \sum_{i=1}^{n}\alpha_i-\frac12\sum_{i,j=1}^{n}\alpha_i\alpha_jy_iy_jk(x_i,x_j)$$

$$\text{s.t.}\quad 0\le\alpha_i\le C,\qquad \sum_{i=1}^{n}\alpha_iy_i=0.$$

The decision function is

$$f(x)=\sum_{i=1}^{n}\alpha_iy_ik(x_i,x)+b.$$

**Definition (support vectors).** Samples with $\alpha_i>0$ are support vectors. In the hard-margin case they lie exactly on the margin boundary, satisfying $y_i(w^{\mathsf{T}}\varphi(x_i)+b)=1$.

## 3. Why Define It This Way

**Why must the kernel matrix be positive semidefinite?** Because if $k(x,z)=\langle\varphi(x),\varphi(z)\rangle$, then for any coefficients $c$,

$$c^{\mathsf{T}}Kc=\sum_{i,j}c_ic_j\langle\varphi(x_i),\varphi(x_j)\rangle=\Bigl\lVert\sum_i c_i\varphi(x_i)\Bigr\rVert^2\ge 0.$$

Positive semidefiniteness is necessary for "being an inner product", and Mercer's theorem says it is also sufficient. If the kernel matrix is indefinite the dual is no longer a convex quadratic program, optimization may fail to converge, and the resulting "similarity" cannot be interpreted as an inner product in any space.

**Why does the kernel trick work?** Look at the dual and the decision function: they touch the data only through $k(x_i,x_j)$, and $\varphi(x_i)$ itself never appears. So choosing a positive semidefinite kernel is equivalent to running a linear SVM in some (possibly infinite-dimensional) feature space, while the computational cost depends only on the number of samples $n$, not on the feature dimension. That is the whole of the kernel trick: **swap coordinates via inner products**.

**Why does the SVM maximize the margin?** The margin is the distance from the decision boundary to the nearest sample. For a linear function $w^{\mathsf{T}}x+b=0$, the distance from a point to the hyperplane is $\lvert w^{\mathsf{T}}x+b\rvert/\lVert w\rVert$. Under the constraint $y_i(w^{\mathsf{T}}x_i+b)\ge 1$ the nearest point is at distance at least $1/\lVert w\rVert$, so the geometric margin is $2/\lVert w\rVert$. Maximizing the margin is equivalent to minimizing $\lVert w\rVert^2$. Intuitively, a wider margin tolerates larger perturbations near the boundary, so the model is more robust; statistical learning theory further gives a generalization bound inversely proportional to the margin.

**Why do only support vectors matter?** The KKT conditions give complementary slackness: $\alpha_i\bigl[y_i(w^{\mathsf{T}}\varphi(x_i)+b)-1+\xi_i\bigr]=0$. For most points, which lie outside the margin and are correctly classified, the bracket is strictly positive, hence $\alpha_i=0$. They contribute nothing to $w=\sum\alpha_iy_i\varphi(x_i)$ and may be deleted without changing the model. Only points on or beyond the margin boundary have $\alpha_i>0$. This gives the SVM its sparsity: prediction requires storing only the support vectors.

**Why does the RBF kernel correspond to an infinite-dimensional space?** Use the Taylor expansion of the exponential:

$$\exp\Bigl(\frac{x^{\mathsf{T}}z}{\sigma^2}\Bigr)=\sum_{m=0}^{\infty}\frac{(x^{\mathsf{T}}z)^m}{\sigma^{2m}m!}.$$

Each term $(x^{\mathsf{T}}z)^m$ is a degree-$m$ polynomial kernel corresponding to a finite-dimensional feature space; summing over all degrees makes the feature space infinite-dimensional. The RBF kernel also maps distance to similarity: the closer the two points, the closer the kernel value to 1; the farther apart, the closer to 0.

**Why can $C$ be neither too large nor too small?** $C$ weights the misclassification penalty. As $C\to\infty$ the model tends to the hard margin and becomes extremely sensitive to noise and outliers; too small a $C$ permits many misclassifications and underfits. In practice $C$ and the kernel parameter $\gamma=1/(2\sigma^2)$ are chosen on a grid by cross-validation.

## 4. Intuition and Pictures

Think of kernel methods as "putting on a different pair of glasses": points hopelessly entangled in the original space may, in a higher dimension, be lifted as if by a hand so that a single flat cut separates them.

| Kernel | Form | Feature space | When to use |
|---|---|---|---|
| Linear | $x^{\mathsf{T}}z$ | The original space | Linearly separable, high-dimensional sparse data |
| Polynomial | $(x^{\mathsf{T}}z+c)^d$ | Finite, dimension $\binom{d+n}{d}$ | Images, interaction features |
| RBF | $\exp(-\lVert x-z\rVert^2/(2\sigma^2))$ | Infinite-dimensional | General purpose, smooth boundaries |
| Laplace | $\exp(-\lVert x-z\rVert_1/\sigma)$ | Infinite-dimensional | Sparse, robust |

> Intuition: the SVM builds the "widest motorway" between the two classes. The wider the road, the less likely roadside noise is mistaken for a signpost. The support vectors are the vehicles hugging the shoulder—their positions determine how wide the road can be; how cars far away drive has no effect on the width.

> Intuition for the kernel matrix: $K_{ij}$ is the "similarity" between samples $i$ and $j$. Positive semidefiniteness means these similarities can consistently come from inner products of vectors in some space, ruling out self-contradictory metrics like "A resembles B, B resembles C, but A does not resemble C at all".

## 5. Worked Examples

### Example 1 (Basic: an explicit feature map for a polynomial kernel)

Problem: take $k(x,z)=(x^{\mathsf{T}}z+1)^2$ with $x,z\in\mathbb{R}^2$. (1) Write the explicit feature map $\varphi$; (2) verify $k(x,z)=\varphi(x)^{\mathsf{T}}\varphi(z)$ for $x=(1,2)$, $z=(3,1)$.

Analysis: expand the square and match each term to a feature coordinate.

Solution: (1) with $x=(x_1,x_2)$ and $z=(z_1,z_2)$,

$$(x_1z_1+x_2z_2+1)^2=1+2x_1z_1+2x_2z_2+x_1^2z_1^2+2x_1x_2z_1z_2+x_2^2z_2^2.$$

Hence we may take

$$\varphi(x)=\bigl(1,\ \sqrt2x_1,\ \sqrt2x_2,\ x_1^2,\ \sqrt2x_1x_2,\ x_2^2\bigr).$$

This maps $\mathbb{R}^2$ to $\mathbb{R}^6$: the original two-dimensional data are lifted to six dimensions, gaining squared and cross terms.

(2) First $x^{\mathsf{T}}z=1\times 3+2\times 1=5$, so $k(x,z)=(5+1)^2=36$.

Then the feature vectors:

$$\varphi(x)=(1,\ 1.414,\ 2.828,\ 1,\ 2.828,\ 4),$$
$$\varphi(z)=(1,\ 4.243,\ 1.414,\ 9,\ 4.243,\ 1).$$

Multiply term by term and sum:

$$1\times 1=1,\quad 1.414\times 4.243=6,\quad 2.828\times 1.414=4,$$
$$1\times 9=9,\quad 2.828\times 4.243=12,\quad 4\times 1=4.$$

The total is $1+6+4+9+12+4=36$, matching the kernel value.

Comment: this example shows that a "kernel" really does correspond to an explicit feature space, only one of possibly very high dimension. If $d=3$ and the original dimension is $n=100$, the explicit feature dimension is $\binom{103}{3}\approx 176851$, whereas computing $k(x,z)$ costs one inner product plus one cube—independent of the dimension. That is the power of the kernel trick.

### Example 2 (Intermediate: a complete one-dimensional hard-margin SVM)

Problem: one-dimensional data: $x=-2,-1$ labelled $-1$, and $x=1,2$ labelled $+1$. Find the hard-margin $w,b$, the margin, the support vectors and the dual variables.

Analysis: the data are symmetric about the origin, so the optimal hyperplane should be $x=0$, i.e. $b=0$. The constraint holds with equality at the support vectors and determines $w$.

Solution: assume $w>0$ and $b=0$. The constraints are $y_iwx_i\ge 1$. For $x=1$ ($y=1$): $w\ge 1$; for $x=-1$ ($y=-1$): $w\ge 1$; for $x=\pm2$: $2w\ge 1$, automatically satisfied. The objective $\frac12w^2$ is minimal at $w=1$. Hence

$$w=1,\qquad b=0,\qquad f(x)=x.$$

The margin is

$$\frac{2}{\lVert w\rVert}=2.$$

The support vectors are $x=1$ and $x=-1$, which satisfy $y_i(wx_i+b)=1$; at $x=\pm2$ we have $y_i(wx_i+b)=2>1$, so they are not support vectors.

Dual check: let the multipliers of the two support vectors be $\alpha_1,\alpha_2$. From $\sum\alpha_iy_i=0$ we get $\alpha_1=\alpha_2$; from $w=\sum\alpha_iy_ix_i$,

$$1=\alpha_1\cdot1\cdot1+\alpha_2\cdot(-1)\cdot(-1)=\alpha_1+\alpha_2,$$

so $\alpha_1=\alpha_2=0.5$. The dual objective is

$$\sum\alpha_i-\frac12\sum_{i,j}\alpha_i\alpha_jy_iy_jx_ix_j=1-\frac12(1)=0.5,$$

equal to the primal optimum $\frac12w^2=0.5$: strong duality holds.

Comment: the trap is "why can't $w$ be 2?". Taking $w=2$ also separates the classes and satisfies the constraints ($2\ge1$), but the objective $\frac12w^2=2$ is larger and the margin is only 1. The SVM wants the widest road, not merely some road that separates.

### Example 3 (Advanced: testing a kernel matrix for positive semidefiniteness)

Problem: (1) decide whether the two-point Gram matrix $K=\begin{bmatrix}1&2\\2&1\end{bmatrix}$ can come from some inner product; (2) explain why the RBF kernel corresponds to an infinite-dimensional feature space.

Analysis: a necessary condition for positive semidefiniteness is that all eigenvalues are nonnegative, equivalently $K_{12}^2\le K_{11}K_{22}$.

Solution: (1) the eigenvalues:

$$\det(K-\lambda I)=(1-\lambda)^2-4=\lambda^2-2\lambda-3=(\lambda-3)(\lambda+1).$$

The eigenvalues are $3$ and $-1$, one positive and one negative, so $K$ is indefinite: $k$ is not a positive semidefinite kernel and cannot be written as an inner product of vectors in any space.

One may also check with the Cauchy–Schwarz inequality: if $k(x,z)=\langle\varphi(x),\varphi(z)\rangle$, then

$$\lvert k(x,z)\rvert^2\le k(x,x)k(z,z)=1\times 1=1.$$

But here $k(x_1,x_2)=2$ and $\lvert 2\rvert^2=4>1$, a contradiction.

(2) For the RBF kernel, let $\gamma=1/(2\sigma^2)$; then

$$k(x,z)=e^{-\gamma\lVert x\rVert^2}e^{-\gamma\lVert z\rVert^2}e^{2\gamma x^{\mathsf{T}}z}.$$

Expand the last factor in a Taylor series:

$$e^{2\gamma x^{\mathsf{T}}z}=\sum_{m=0}^{\infty}\frac{(2\gamma)^m}{m!}(x^{\mathsf{T}}z)^m.$$

Each $(x^{\mathsf{T}}z)^m$ is a homogeneous polynomial kernel of degree $m$, corresponding to a feature space of dimension $\binom{n+m-1}{m}$. As $m$ runs over all nonnegative integers the feature space is the direct sum of these finite-dimensional spaces, of infinite dimension. The two leading exponential factors merely rescale each feature by a positive weight and do not affect positive semidefiniteness.

Comment: the trap in the first part is that "diagonal entries are 1, so it looks like a similarity" is not enough—the off-diagonal entry cannot exceed the geometric mean of the diagonal ones. The trap in the second is that "infinite-dimensional" sounds uncomputable, yet the kernel value is always a scalar requiring only one Euclidean distance; the kernel trick buys infinite expressive power at scalar cost.

## 6. Common Mistakes and Pitfalls

- Mistake: assuming any symmetric function can be a kernel. Correction: positive semidefiniteness is required; $K=\begin{bmatrix}1&2\\2&1\end{bmatrix}$ is a counterexample and makes the dual nonconvex.
- Mistake: treating a kernel as a distance. Correction: a larger kernel value usually means greater similarity, but the RBF kernel ranges over $(0,1]$ and is not a distance; distance kernels such as $-\lVert x-z\rVert$ need not be positive semidefinite.
- Mistake: believing kernels require explicitly computing high-dimensional features. Correction: the whole point of the trick is to avoid that; only low-dimensional cases such as the polynomial kernel admit an explicit $\varphi$.
- Mistake: not standardizing features before SVM training. Correction: the RBF kernel is based on Euclidean distance, so features with large units dominate it; standardize first.
- Mistake: making $C$ as large as possible. Correction: too large a $C$ approaches the hard margin and is noise-sensitive; choose it by cross-validation.
- Mistake: thinking the support vectors are "all training samples". Correction: only samples with $\alpha_i>0$ are support vectors, usually a small minority; this is why SVM prediction is efficient.
- Mistake: computing the kernel matrix over training and test sets together. Correction: kernel values may be computed across train/test, but model parameters come from the training set only; standardization and kernel parameters must also be estimated on the training set.
- Mistake: assuming kernel methods apply only to classification. Correction: kernel ridge regression, kernel PCA and Gaussian processes all use the same "replace the inner product" idea.

## 7. Summary and Mnemonic

Key points:

- A kernel stands in for an inner product in feature space: $k(x,z)=\langle\varphi(x),\varphi(z)\rangle$;
- A valid kernel is characterized by every finite Gram matrix being positive semidefinite;
- The kernel trick makes the dual depend only on $k(x_i,x_j)$, independent of the feature dimension;
- The SVM maximizes the margin $2/\lVert w\rVert$, equivalently minimizes $\lVert w\rVert^2$;
- Only support vectors ($\alpha_i>0$) affect the decision function;
- The soft margin trades margin against misclassification via $C$, and both $C$ and the kernel parameter need cross-validation.

Mnemonic: **"No map needed to lift the space; swap the inner product and all is light; the widest road is the safest road; support vectors decide the fight."**`,
    keyPoints: [
      'A kernel is equivalent to an inner product in some feature space',
      'A valid kernel requires every Gram matrix to be positive semidefinite',
      'The kernel trick makes the dual depend only on kernel values, independent of feature dimension',
      'The SVM maximizes the margin 2/||w||, equivalently minimizing ||w||²',
      'Only support vectors affect the decision; C trades margin against misclassification',
    ],
  },
  'mcmc': {
    chapter: 'Chapter 6 Sampling Methods',
    title: 'MCMC and the Metropolis Algorithm',
    summary:
      'When the integral will not budge, let a Markov chain wander: run it long enough and the places it lingers obey the target distribution.',
    content: String.raw`

The heart of Bayesian inference is the posterior distribution

$$\pi(\theta\mid x)=\frac{p(x\mid\theta)\pi(\theta)}{\int p(x\mid\theta')\pi(\theta')\,d\theta'}.$$

The denominator is a high-dimensional integral. With 100 parameters, a grid method would need to enumerate $100^{100}$ points; even with only 10 grid points per dimension that is $10^{100}$ evaluations, far more than the number of atoms in the universe. Yet what we actually need is usually not the denominator but the posterior mean, quantiles or credible intervals—and all of these can be approximated by "sampling from the posterior".

So the question becomes: how do we sample from a distribution we know only up to an unnormalized density? All we know is $\tilde\pi(\theta)=p(x\mid\theta)\pi(\theta)$, without the normalizing constant. In 1953 Metropolis gave a clever answer: build a Markov chain whose stationary distribution is exactly $\pi$. Start anywhere, random-walk by the rules, and after enough steps the frequency of visits to each region approximates its probability.

The intuition is "hill climbing blindfolded": you stand on a hillside and can sense only your current height and that of a candidate point. If the candidate is higher, move there; if lower, still move there with some probability, so as not to be trapped at a local peak. In the long run you spend more time high up, and your visiting frequency is proportional to height—exactly the target distribution.

Motivating questions: how must the transition rule be designed so that the stationary distribution is precisely $\pi$? Why is it necessary to "accept worse points with some probability"? How long must the chain run before it has "mixed"?

## 2. Rigorous Definitions

**Definition (Markov chain and stationary distribution).** A transition kernel $P(x,dy)$ on a state space $\mathcal{X}$ has $P(x,\cdot)$ a probability distribution. A distribution $\pi$ satisfying

$$\pi(dy)=\int_{\mathcal{X}}\pi(dx)P(x,dy),$$

i.e. $\pi P=\pi$, is called stationary. If the chain is irreducible and aperiodic, it converges to $\pi$ from any initial distribution.

**Definition (detailed balance).** If

$$\pi(dx)P(x,dy)=\pi(dy)P(y,dx),$$

the chain is said to satisfy detailed balance with respect to $\pi$. Detailed balance is stronger than stationarity: integrating both sides over $x$ gives $\pi P=\pi$.

**Definition (Metropolis–Hastings algorithm).** Given a target density $\pi$ (known up to a constant) and a proposal kernel $q(y\mid x)$:

1. From $x^{(t)}$, draw a candidate $y\sim q(\cdot\mid x^{(t)})$;
2. Compute the acceptance rate

$$\alpha(x,y)=\min\left(1,\ \frac{\pi(y)\,q(x\mid y)}{\pi(x)\,q(y\mid x)}\right);$$

3. With probability $\alpha$ set $x^{(t+1)}=y$; otherwise set $x^{(t+1)}=x^{(t)}$.

**Definition (random-walk Metropolis).** With a symmetric proposal $q(y\mid x)=q(x\mid y)$ the acceptance rate simplifies to

$$\alpha(x,y)=\min\left(1,\ \frac{\pi(y)}{\pi(x)}\right).$$

**Definition (independence sampler).** With a proposal $q(y)$ independent of the current state, the acceptance rate is

$$\alpha(x,y)=\min\left(1,\ \frac{\pi(y)q(x)}{\pi(x)q(y)}\right),$$

suited to situations where the proposal is already close to the target.

**Definition (Gibbs sampling).** Update coordinates in turn, drawing from the conditional distribution

$$x_j^{(t+1)}\sim\pi\bigl(x_j\mid x_{-j}^{(t)}\bigr),$$

where $x_{-j}$ denotes all coordinates except the $j$-th. It is a special case of MH with acceptance rate identically 1.

**Definition (burn-in, thinning and effective sample size).** The first $B$ steps (burn-in) are discarded because the chain has not yet reached stationarity; keeping one sample every $m$ steps is called thinning. Because samples are correlated, the effective sample size is

$$\mathrm{ESS}=\frac{N}{1+2\sum_{k=1}^{\infty}\rho_k},$$

where $\rho_k$ is the autocorrelation at lag $k$. The ESS is much smaller than the actual number of samples $N$.

## 3. Why Define It This Way

**Why does detailed balance imply stationarity?** Let $X\sim\pi$; the distribution of $Y$ after one transition is

$$\pi P(dy)=\int\pi(dx)P(x,dy)=\int\pi(dy)P(y,dx)=\pi(dy)\int P(y,dx)=\pi(dy).$$

The second equality uses detailed balance and the last uses the normalization of the transition kernel. So $\pi$ is unchanged by one step and is therefore stationary.

**Why does the MH acceptance rate take this form?** We want the transition kernel to satisfy detailed balance. With proposal $q$ and acceptance rate $\alpha$, the actual transition density is $q(y\mid x)\alpha(x,y)$. We require

$$\pi(x)q(y\mid x)\alpha(x,y)=\pi(y)q(x\mid y)\alpha(y,x).$$

Take

$$\alpha(x,y)=\min\left(1,\frac{\pi(y)q(x\mid y)}{\pi(x)q(y\mid x)}\right);$$

then when $\pi(x)q(y\mid x)\le\pi(y)q(x\mid y)$ we have $\alpha(x,y)=1$ and $\alpha(y,x)=\pi(x)q(y\mid x)/[\pi(y)q(x\mid y)]$, so both sides equal $\pi(x)q(y\mid x)$; the reverse case is symmetric. Detailed balance holds.

**Why does a symmetric proposal simplify the formula?** Because $q(x\mid y)=q(y\mid x)$ cancels, leaving only the density ratio $\pi(y)/\pi(x)$. The normalizing constant cancels in the ratio too—precisely why we never need to compute the denominator.

**Why must we sometimes accept worse points?** If we accepted only candidates with $\pi(y)>\pi(x)$, the chain would climb until it stuck at some local maximum and could never explore other regions; the stationary distribution would degenerate to a single point. Allowing "downhill" moves with some probability lets the chain cross valleys and visit the whole support. The acceptance rate $\pi(y)/\pi(x)$ exactly compensates for the bias that "high points are less likely to be proposed at random".

**Why is a burn-in period needed?** The starting point $x^{(0)}$ is usually not drawn from $\pi$ (a random choice, say). The chain needs several steps to "forget" the starting point and settle into stationarity. The burn-in is this discarded transient. Strictly, its length depends on the mixing speed, diagnosed in practice from trace plots and $\hat R$.

**Why do correlated samples reduce efficiency?** MCMC samples are not independent; neighbouring samples are highly correlated. If each step moves only a little, the chain "spins in place" and $N$ samples may carry as much information as a few dozen independent ones. The effective sample size measures exactly this. Too small a proposal step gives a high acceptance rate but slow movement; too large a step gives a low acceptance rate but long jumps. For high-dimensional random walks the optimal acceptance rate is about $0.234$.

**Why is Gibbs' acceptance rate 1?** Because it samples from the exact conditional distribution. Let the current state be $x$ and update only the $j$-th coordinate to obtain $y=(x_j',x_{-j})$, with proposal $q(y\mid x)=\pi(x_j'\mid x_{-j})$. Substituting into the MH acceptance rate:

$$\frac{\pi(y)q(x\mid y)}{\pi(x)q(y\mid x)}=\frac{\pi(x_j',x_{-j})\pi(x_j\mid x_{-j})}{\pi(x_j,x_{-j})\pi(x_j'\mid x_{-j})}=1,$$

because $\pi(x_j,x_{-j})=\pi(x_j\mid x_{-j})\pi(x_{-j})$ makes numerator and denominator identical. Gibbs therefore always accepts.

## 4. Intuition and Pictures

Think of the target distribution as a terrain map whose height is probability density. MCMC is a drunkard walking on the mountain: he tends to go uphill but occasionally steps down. After long enough, the density of his footprints in each region is proportional to that region's height.

| Diagnostic | Meaning | Healthy signal | Warning signal |
|---|---|---|---|
| Trace plot | Samples versus iteration | Rapid fluctuation about the mean | Long-run trend, stuck at a value |
| Autocorrelation | Correlation of neighbouring samples | Decays quickly to 0 | Very slow decay, long tail |
| ESS | Equivalent number of independent samples | Close to the actual sample count | Far below the sample count |
| $\hat R$ | Between-chain variance ratio | Close to 1.00 | Above 1.01 |
| Acceptance rate | Fraction of accepted candidates | 0.2 to 0.5 | Near 0 or 1 |

> Intuition: the proposal step is the drunkard's stride. Too short and he walks safely but never leaves the block in a night; too long and he is always rejected and never moves. A good stride balances "going far" against "not being rejected".

> Another analogy: MCMC does not "draw lots directly from the distribution" but "runs a process for a long time and records how often it visits each place". It is like gauging how busy a city's districts are: instead of surveying everyone, follow one taxi driver at random and record the fraction of time spent in each district.

## 5. Worked Examples

### Example 1 (Basic: the transition matrix of a three-state discrete MH chain)

Problem: target $\pi=(0.1,0.2,0.7)$ on states $\{1,2,3\}$. Proposal rule: state 1 may propose only 2, state 3 may propose only 2, and state 2 proposes 1 or 3 with probability $1/2$ each. Find the acceptance rates and the transition matrix, and verify $\pi P=\pi$.

Analysis: use the MH acceptance rate $\alpha=\min(1,\pi(y)q(x\mid y)/[\pi(x)q(y\mid x)])$, noting the asymmetry of the proposal.

Solution: compute case by case.

- $1\to2$: $q(1\mid2)=1/2$, $q(2\mid1)=1$,

$$\alpha=\min\left(1,\frac{0.2\times 0.5}{0.1\times 1}\right)=\min(1,1)=1.$$

- $2\to1$: $q(2\mid1)=1$, $q(1\mid2)=1/2$,

$$\alpha=\min\left(1,\frac{0.1\times 1}{0.2\times 0.5}\right)=\min(1,1)=1.$$

- $2\to3$: $q(3\mid2)=1/2$, $q(2\mid3)=1$,

$$\alpha=\min\left(1,\frac{0.7\times 1}{0.2\times 0.5}\right)=\min(1,7)=1.$$

- $3\to2$: $q(3\mid2)=1/2$, $q(2\mid3)=1$,

$$\alpha=\min\left(1,\frac{0.2\times 0.5}{0.7\times 1}\right)=\min\left(1,\frac17\right)=\frac17.$$

So the transition matrix is

$$P=\begin{bmatrix}0&1&0\\ 0.5&0&0.5\\ 0&\frac17&\frac67\end{bmatrix}.$$

Verify stationarity. The three components of $\pi P$:

$$(\pi P)_1=0.1\times0+0.2\times0.5+0.7\times0=0.1,$$
$$(\pi P)_2=0.1\times1+0.2\times0+0.7\times\frac17=0.1+0.1=0.2,$$
$$(\pi P)_3=0+0.2\times0.5+0.7\times\frac67=0.1+0.6=0.7.$$

Exactly $\pi$.

Comment: note that the acceptance rate for $2\to1$ is 1 even though $\pi(1)<\pi(2)$. The reason is that the probability of proposing 1 from 2 is only $1/2$ while the probability of proposing 2 from 1 is 1; the Hastings correction restores the "proposal bias". Omitting the ratio of $q$ yields a wrong chain.

### Example 2 (Intermediate: random-walk MH on a continuous target)

Problem: target $\pi(x)\propto e^{-x^2/2}$ (standard normal), proposal $q(y\mid x)=\mathcal{N}(x,1)$. (1) Write the acceptance rate; (2) starting from $x_0=0$, take four steps given candidates and uniform random numbers.

Analysis: the proposal is symmetric, so the acceptance rate is $\min(1,e^{-(y^2-x^2)/2})$.

Solution: (1) since $q(y\mid x)=q(x\mid y)$,

$$\alpha(x,y)=\min\left(1,\frac{e^{-y^2/2}}{e^{-x^2/2}}\right)=\min\left(1,e^{-(y^2-x^2)/2}\right).$$

(2) Step by step.

- Step 1: $y_1=1.2$, ratio $e^{-(1.44-0)/2}=e^{-0.72}\approx 0.487$. Drawing $u_1=0.30<0.487$, accept, $x_1=1.2$.
- Step 2: $y_2=0.3$, ratio $e^{-(0.09-1.44)/2}=e^{0.675}\approx 1.964$, capped at $\min(1,\cdot)=1$. With $u_2=0.90<1$, accept, $x_2=0.3$.
- Step 3: $y_3=-0.5$, ratio $e^{-(0.25-0.09)/2}=e^{-0.08}\approx 0.923$. With $u_3=0.60<0.923$, accept, $x_3=-0.5$.
- Step 4: $y_4=-1.8$, ratio $e^{-(3.24-0.25)/2}=e^{-1.495}\approx 0.224$. With $u_4=0.80>0.224$, reject, $x_4=-0.5$.

The trace is $0\to1.2\to0.3\to-0.5\to-0.5$. The chain tends to linger where $|x|$ is small and occasionally tries to go far, only to be rejected.

Comment: a higher acceptance rate is not better. Here the step is 1 and the acceptance rate about $0.7$, so the chain moves briskly; with a step of $0.01$ the acceptance rate approaches 1, but each step moves so little that $10^6$ steps barely cover a few standard deviations and the ESS is tiny.

### Example 3 (Advanced: the consequence of dropping the Hastings correction for an asymmetric proposal)

Problem: the target is uniform on $\{1,2\}$. The proposal has $q(1\to2)=0.9$ and $q(2\to1)=0.1$. (1) If one wrongly uses $\alpha=\min(1,\pi(y)/\pi(x))$, find the stationary distribution; (2) apply the correct Hastings correction and verify that the stationary distribution becomes uniform.

Analysis: for a uniform target $\pi(y)/\pi(x)=1$, so naive Metropolis always accepts and the chain simply follows the proposal.

Solution: (1) the naive acceptance rate is always 1, hence

$$P=\begin{bmatrix}0.1&0.9\\0.1&0.9\end{bmatrix}.$$

Let the stationary distribution be $(\pi_1,\pi_2)$; then

$$\pi_1=0.1\pi_1+0.1\pi_2,\qquad \pi_1+\pi_2=1.$$

The first equation gives $0.9\pi_1=0.1\pi_2$, i.e. $\pi_2=9\pi_1$, hence $\pi_1=0.1$ and $\pi_2=0.9$. The stationary distribution is $(0.1,0.9)$, not the uniform target. The chain spends most of its time in state 2 because escaping from 2 to 1 is hard to propose.

(2) The correct acceptance rates:

$$\alpha(1\to2)=\min\left(1,\frac{1\times0.1}{1\times0.9}\right)=\frac19,$$
$$\alpha(2\to1)=\min\left(1,\frac{1\times0.9}{1\times0.1}\right)=1.$$

Hence

$$P=\begin{bmatrix}0.9&0.1\\0.1&0.9\end{bmatrix}.$$

By symmetry the stationary distribution is $(0.5,0.5)$—exactly uniform. Detailed balance also holds directly: $0.5\times0.1=0.5\times0.1$.

Comment: the trap is "the target is uniform, so isn't the acceptance rate 1?". A uniform target only says $\pi(y)/\pi(x)=1$; the proposal itself has a directional bias, which must be cancelled by $q(x\mid y)/q(y\mid x)$. Whenever the proposal is asymmetric, the Hastings correction is indispensable.

## 6. Common Mistakes and Pitfalls

- Mistake: omitting the Hastings correction for an asymmetric proposal. Correction: the chain converges to the wrong stationary distribution; multiply by $q(x\mid y)/q(y\mid x)$.
- Mistake: replacing $\pi$ by an unnormalized density in the acceptance rate and forgetting that it cancels. Correction: the acceptance rate depends only on ratios, so the normalizing constant cancels automatically—precisely why MCMC suits Bayesian posteriors.
- Mistake: not discarding burn-in samples. Correction: the initial transient does not belong to the target distribution and introduces bias; determine the burn-in from trace diagnostics.
- Mistake: assuming a higher acceptance rate is better. Correction: a high acceptance rate often means the step is too small and the chain moves slowly; for high-dimensional random walks the optimum is about $0.234$.
- Mistake: drawing conclusions from one short chain. Correction: run several chains from different starting points and check $\hat R$, ESS and traces to confirm adequate mixing.
- Mistake: proposing each coordinate independently when the parameters are highly correlated. Correction: use block updates, Gibbs, HMC or NUTS, which are far more efficient.
- Mistake: treating MCMC samples as independent in tests. Correction: they are correlated, so standard errors must be corrected by the ESS; otherwise confidence intervals are too narrow.
- Mistake: using a single random-walk chain for a multimodal target. Correction: the chain may be trapped in one mode; use parallel tempering, multiple chains or better proposals.

## 7. Summary and Mnemonic

Key points:

- MCMC builds a Markov chain with stationary distribution $\pi$ and approximates probabilities by sample frequencies;
- Detailed balance $\pi(x)P(x,y)=\pi(y)P(y,x)$ is a sufficient condition for a stationary chain;
- The MH acceptance rate $\min(1,\pi(y)q(x\mid y)/[\pi(x)q(y\mid x)])$ reduces to the density ratio for symmetric proposals;
- Gibbs samples from conditional distributions with acceptance rate always 1;
- Burn-in discards the transient; the ESS measures the real information in correlated samples;
- The proposal step must balance acceptance rate against travel distance; the high-dimensional optimum is about $0.234$.

Mnemonic: **"Linger high, wander low; detailed balance keeps it slow; burn the transient, count ESS; a modest stride is how you go."**`,
    keyPoints: [
      'MCMC builds a Markov chain whose stationary distribution is the target posterior',
      'Detailed balance is a sufficient condition for stationarity',
      'The MH acceptance rate contains the proposal ratio; for symmetric proposals it becomes the density ratio',
      'Gibbs is an MH special case with acceptance rate 1',
      'Burn-in and mixing diagnostics are needed, and correlated samples must be corrected by the ESS',
    ],
  },
  'information-theory': {
    chapter: 'Chapter 7 Information Theory',
    title: 'Entropy, Mutual Information and Coding',
    summary:
      'Entropy measures uncertainty and is also the limit of compression; mutual information tells you how much two variables share.',
    content: String.raw`

Play the game of twenty questions: I think of a number between 1 and 1024 and you may only ask yes/no questions. The smartest strategy is bisection—"is it greater than 512?"—which halves the candidates each time, so 10 questions pin the answer down, because $2^{10}=1024$. If instead I ask "is it 7?", you may be lucky and hit it at once, but on average it takes 512 questions.

The difference between the two strategies is the difference in "amount of information". Bisection gains exactly 1 bit each time, 10 bits in total; "is it 7?" almost always gets a "no" and barely reduces the uncertainty. In 1948 Shannon turned this intuition into precise mathematics: the **entropy** of a random variable is the minimum average number of bits needed to describe it.

Entropy is not merely a theoretical curiosity. It is the limit of file compression: English text has entropy about 1 bit per character, whereas ASCII storage uses 8 bits, so in principle it can be compressed eightfold. It is also the limit of communication: how many bits per second a noisy channel can carry reliably is decided by its capacity. And it is a common tool in machine learning: decision trees select features by information gain, variational autoencoders regularize with the KL divergence, and contrastive learning optimizes mutual information.

Motivating questions: why can "uncertainty" be measured exactly by a formula? Why is entropy a lower bound on compression rather than the average performance of some algorithm? Why is the KL divergence asymmetric, yet central to variational inference?

## 2. Rigorous Definitions

**Definition (entropy).** For a discrete random variable $X$ taking values in $\mathcal{X}$ with distribution $p(x)$, the entropy is

$$H(X)=-\sum_{x\in\mathcal{X}}p(x)\log_2 p(x).$$

We adopt the convention $0\log 0=0$. The unit is the bit. It measures "average surprise": the less probable an event, the more information its occurrence carries.

**Definition (joint and conditional entropy).**

$$H(X,Y)=-\sum_{x,y}p(x,y)\log_2 p(x,y),$$

$$H(Y\mid X)=-\sum_{x,y}p(x,y)\log_2 p(y\mid x).$$

**Definition (chain rule).**

$$H(X,Y)=H(X)+H(Y\mid X)=H(Y)+H(X\mid Y).$$

**Definition (mutual information).**

$$I(X;Y)=\sum_{x,y}p(x,y)\log_2\frac{p(x,y)}{p(x)p(y)}=H(X)-H(X\mid Y)=H(Y)-H(Y\mid X).$$

It measures "how much the uncertainty of $X$ is reduced by knowing $Y$", and $I(X;Y)=I(Y;X)\ge 0$, vanishing exactly when $X,Y$ are independent.

**Definition (KL divergence).**

$$D_{\mathrm{KL}}(P\Vert Q)=\sum_{x}p(x)\log_2\frac{p(x)}{q(x)}.$$

It measures the extra average number of bits paid when "encoding data from $P$ with distribution $Q$". $D_{\mathrm{KL}}\ge 0$, but it is asymmetric and is not a metric.

**Definition (source coding theorem).** For an i.i.d. source, any lossless code has average length $L$ satisfying

$$L\ge H(X),$$

while Huffman coding satisfies $L<H(X)+1$. Entropy is the lower bound on compression, and it can be approached.

**Definition (channel capacity).** For a discrete memoryless channel $P(y\mid x)$,

$$C=\max_{p(x)}I(X;Y).$$

It is the maximum rate of reliable transmission over the channel.

**Definition (binary symmetric channel, BSC).** Input $X\in\{0,1\}$, output $Y=X\oplus E$ with $E\sim\mathrm{Bernoulli}(p)$ independent of $X$. The crossover probability is $P(Y\neq X)=p$, and the capacity is

$$C=1-h(p),\qquad h(p)=-p\log_2p-(1-p)\log_2(1-p).$$

## 3. Why Define It This Way

**Why does $-\log p$ measure the information of a single event?** Three plain requirements pin the form down: first, the less probable the event the more information, so it must be a decreasing function of $p$; second, the information of two independent events occurring together must add, i.e. $f(p_1p_2)=f(p_1)+f(p_2)$; third, information must be continuous. The only such functions are $f(p)=-C\log p$. Taking $C=1$ and base 2 gives "bits".

**Why is entropy the average information?** Treat $-\log_2 p(x)$ as the "surprise" of event $x$; weighting it by probability gives the entropy. For a uniform distribution every event has surprise $\log_2 n$ and the entropy is maximal; when one event has probability 1 the others never occur and the entropy is 0. This matches intuition: the less predictable, the larger the entropy.

**Why does the chain rule hold?** From $p(x,y)=p(x)p(y\mid x)$, take negative logarithms:

$$-\log p(x,y)=-\log p(x)-\log p(y\mid x).$$

Taking expectations over $p(x,y)$ on both sides gives $H(X,Y)$ on the left and $H(X)$ and $H(Y\mid X)$ on the right. The proof uses the product rule for probabilities exactly once.

**Why is the KL divergence nonnegative?** By Jensen's inequality. Since $\log$ is concave,

$$D_{\mathrm{KL}}(P\Vert Q)=-\sum_x p(x)\log_2\frac{q(x)}{p(x)}\ge-\log_2\sum_x p(x)\frac{q(x)}{p(x)}=-\log_2 1=0.$$

Equality holds if and only if $q(x)/p(x)$ is constant on the support of $P$, i.e. $P=Q$. The proof simultaneously shows that "encoding with the wrong distribution costs extra bits".

**Why is the KL divergence asymmetric?** Because "approximating $P$ by $Q$" and "approximating $Q$ by $P$" penalize differently. If $P$ has mass somewhere $Q$ is nearly zero, $D(P\Vert Q)$ blows up; the reverse does not. This asymmetry is extremely useful in variational inference: $D(Q\Vert P)$ forces $Q$ to cover all the modes of $P$ (mass-covering), whereas $D(P\Vert Q)$ tends to lock onto a single mode (mode-seeking).

**Why does Huffman coding attain the entropy?** Huffman greedily merges the two least frequent nodes, constructing an optimal prefix tree. A prefix code guarantees that no codeword is a prefix of another, so decoding is unique. Optimality follows from an exchange argument: in an optimal tree the two least frequent symbols are necessarily the deepest pair of siblings; merging them and recursing gives the result by induction. The expected codeword length lies between $H$ and $H+1$, the gap arising because "codeword lengths must be integers".

**Why is entropy the limit of compression?** Because there are only about $2^{nH(X)}$ typical sequences of length $n$, and they carry almost all the probability. Atypical sequences are numerous but their total probability tends to zero. Assigning short codes to typical sequences and one "escape code" to the rest achieves about $nH(X)$ bits with error probability tending to zero. Conversely, with fewer than $nH(X)$ bits there are not enough distinguishable codewords to cover the typical set, so errors are inevitable.

## 4. Intuition and Pictures

| Concept | Formula | Intuition | Range |
|---|---|---|---|
| Entropy $H(X)$ | $-\sum p\log p$ | Average uncertainty | $0\le H\le\log\lvert\mathcal{X}\rvert$ |
| Conditional entropy $H(Y\mid X)$ | $H(X,Y)-H(X)$ | Remaining uncertainty of $Y$ once $X$ is known | $\ge 0$ |
| Mutual information $I(X;Y)$ | $H(Y)-H(Y\mid X)$ | Information shared by $X$ and $Y$ | $\ge 0$, symmetric |
| KL divergence | $\sum p\log(p/q)$ | Extra cost of using the wrong distribution | $\ge 0$, asymmetric |

> Intuition: entropy is the average number of yes/no questions you need to pin down the answer. A fair coin has entropy 1 bit—exactly one question; a coin with head probability 0.9 has entropy about 0.469 bits, because most of the time you already know the answer and only occasionally are you surprised.

> Intuition for mutual information: $I(X;Y)$ is "the overlap area of two circles". $H(X)$ and $H(Y)$ are the two circles, $H(X,Y)$ their union, and $H(X\mid Y)$ the part of the $X$ circle not overlapping $Y$. The larger the overlap, the better one can infer one variable from the other.

## 5. Worked Examples

### Example 1 (Basic: computing entropy and a Huffman code)

Problem: source symbols $a,b,c,d$ with probabilities $1/2,1/4,1/8,1/8$. (1) Find the entropy; (2) construct a Huffman code and find the average length; (3) compare the two.

Analysis: the entropy follows from the definition; Huffman merges the two least probable nodes each time.

Solution: (1) term by term:

$$H=-\frac12\log_2\frac12-\frac14\log_2\frac14-\frac18\log_2\frac18-\frac18\log_2\frac18.$$

$$\log_2\frac12=-1,\quad \log_2\frac14=-2,\quad \log_2\frac18=-3.$$

Hence

$$H=\frac12\times1+\frac14\times2+\frac18\times3+\frac18\times3=0.5+0.5+0.375+0.375=1.75\ \text{bits}.$$

(2) Huffman construction:

- Merge $c,d$ (each $1/8$) into node $cd$ with probability $1/4$;
- Now there are $a(1/2)$, $b(1/4)$ and $cd(1/4)$; merge $b$ and $cd$ into $bcd$ with probability $1/2$;
- Merge $a$ and $bcd$, probability $1$.

Assigning 0/1 from the root: $a=0$, $b=10$, $c=110$, $d=111$. Codeword lengths are $1,2,3,3$.

The average length is

$$L=\frac12\times1+\frac14\times2+\frac18\times3+\frac18\times3=1.75\ \text{bits}.$$

(3) $L=H=1.75$, attaining the lower bound. This happens because every probability is a negative integer power of $2$, so each codeword length equals $-\log_2 p$ exactly, with no integer-rounding loss.

Comment: if the probabilities are not powers of $2$ (say $0.3,0.2,0.2,0.15,0.15$), the Huffman average length is strictly greater than the entropy, but by less than 1 bit. This "less than 1" bound is the universal guarantee for prefix codes.

### Example 2 (Intermediate: mutual information and capacity of a binary symmetric channel)

Problem: a BSC with crossover probability $p=0.1$ and uniformly distributed input $X$. (1) Find $H(Y\mid X)$; (2) find $I(X;Y)$; (3) find the capacity and explain the case $p=0.5$.

Analysis: $Y=X\oplus E$, so given $X$ the uncertainty of $Y$ comes entirely from $E$.

Solution: (1) given $X=x$, $Y$ equals $x$ with probability $0.9$ and flips with probability $0.1$, so

$$H(Y\mid X)=h(0.1)=-0.1\log_2 0.1-0.9\log_2 0.9.$$

Computing:

$$\log_2 0.1\approx-3.3219,\qquad \log_2 0.9\approx-0.1520.$$

$$h(0.1)=0.1\times3.3219+0.9\times0.1520=0.3322+0.1368=0.4690.$$

(2) Since $X$ is uniform and the channel symmetric, $Y$ is also uniform and $H(Y)=1$. Hence

$$I(X;Y)=H(Y)-H(Y\mid X)=1-0.4690=0.5310\ \text{bits}.$$

(3) The capacity is

$$C=\max_{p(x)}I(X;Y)=1-h(p).$$

At $p=0.1$, $C=0.531$ bits per use. At $p=0.5$, $h(0.5)=1$ and $C=0$: the output is independent of the input and the channel conveys nothing. At $p=0$ or $p=1$, $h=0$ and $C=1$: noiseless, or a constant flip that can be cancelled by prior agreement, so 1 bit per use.

Comment: $I(X;Y)$ is not "the number of bits transmitted" but "the average information gained per channel use". To transmit 1000 bits reliably requires about $1000/0.531\approx 1883$ channel uses. That is the practical meaning of Shannon's coding theorem.

### Example 3 (Advanced: the asymmetry of the KL divergence)

Problem: $P=(1/2,1/2)$, $Q=(1/4,3/4)$. (1) Find $D(P\Vert Q)$; (2) find $D(Q\Vert P)$; (3) explain why they differ and what this means in variational inference.

Analysis: compute term by term from the definition, watching the base of the logarithm.

Solution: (1)

$$D(P\Vert Q)=\frac12\log_2\frac{1/2}{1/4}+\frac12\log_2\frac{1/2}{3/4}.$$

The first term is $\log_2 2=1$; the second is $\log_2(2/3)=\log_2 2-\log_2 3=1-1.5850=-0.5850$. Hence

$$D(P\Vert Q)=0.5\times1+0.5\times(-0.5850)=0.5-0.2925=0.2075\ \text{bits}.$$

(2)

$$D(Q\Vert P)=\frac14\log_2\frac{1/4}{1/2}+\frac34\log_2\frac{3/4}{1/2}.$$

The first term is $\log_2(1/2)=-1$; the second is $\log_2(3/2)=0.5850$. Hence

$$D(Q\Vert P)=0.25\times(-1)+0.75\times0.5850=-0.25+0.4388=0.1888\ \text{bits}.$$

(3) Both are nonnegative, yet $D(P\Vert Q)=0.2075\ne D(Q\Vert P)=0.1888$, so KL is not a metric. The difference comes from "whose small probability is penalized": $Q$ assigns only $1/4$ to the first symbol where $P$ assigns $1/2$, so encoding $P$-data with $Q$ costs extra bits on that symbol; in the reverse direction the penalty falls on the second symbol.

In variational inference we approximate the true posterior $P$ by $Q$. Minimizing $D(Q\Vert P)$ severely penalizes the case " $P$ has mass where $Q$ has none", forcing $Q$ to cover every mode of $P$ and tending to spread probability out (mass-covering); minimizing $D(P\Vert Q)$ tends to make $Q$ lock onto one mode of $P$ (mode-seeking). Which to choose depends on whether you fear "missing something" or "spreading too thin".

Comment: the trap is that the word "divergence" sounds like a distance, but a distance must be symmetric and satisfy the triangle inequality. KL satisfies neither. Reading it as a "cost" rather than a "distance" makes everything much clearer.

## 6. Common Mistakes and Pitfalls

- Mistake: treating entropy as "the length of the data" or "the size of the compressed file". Correction: entropy is a theoretical lower bound; real codes have integer lengths and headers, so files are usually slightly larger than $nH$.
- Mistake: forgetting to multiply by the probability when computing entropy, summing $-\log p$ directly. Correction: entropy is an expectation and must be weighted by $p(x)$.
- Mistake: confusing the conditional entropies $H(Y\mid X)$ and $H(X\mid Y)$. Correction: they are generally different; $H(Y\mid X)$ is the remaining uncertainty of $Y$ once $X$ is known.
- Mistake: believing mutual information can be negative. Correction: $I(X;Y)\ge0$, zero exactly at independence; negative values can only arise from estimation error.
- Mistake: using the KL divergence as a distance for clustering or nearest neighbours. Correction: KL is asymmetric and violates the triangle inequality; use the JS divergence or the Wasserstein distance when a symmetric measure is needed.
- Mistake: thinking a BSC with $p=0.5$ is merely "a bit noisier". Correction: $C=0$, the output is independent of the input, and the reliable rate is zero—total channel failure, not reduced efficiency.
- Mistake: expecting Huffman coding to reach the entropy while ignoring integer codeword lengths. Correction: Huffman satisfies $H\le L<H+1$ and necessarily loses something when probabilities are not powers of $2$; arithmetic coding can come closer.
- Mistake: assuming higher entropy means "more useful data". Correction: entropy measures uncertainty only; uniform noise has maximal entropy and no informative value at all.

## 7. Summary and Mnemonic

Key points:

- Entropy $H(X)=-\sum p\log_2 p$ measures average uncertainty and is the lower bound on lossless compression;
- The chain rule $H(X,Y)=H(X)+H(Y\mid X)$ follows from the product rule of probability;
- Mutual information $I(X;Y)=H(Y)-H(Y\mid X)$ is symmetric and nonnegative, measuring shared information;
- The KL divergence is nonnegative but asymmetric: the extra cost of encoding with the wrong distribution;
- Huffman coding satisfies $H\le L<H+1$ and attains the entropy when probabilities are powers of $2$;
- The BSC capacity is $C=1-h(p)$, which vanishes at $p=0.5$.

Mnemonic: **"Entropy is uncertainty, compression has a floor; mutual information is overlap, KL is a cost; base two makes bits, and half-and-half gives zero."**`,
    keyPoints: [
      'Entropy measures average uncertainty and is the lower bound on lossless compression',
      'Chain rule H(X,Y)=H(X)+H(Y|X)',
      'Mutual information is symmetric and nonnegative, measuring shared information',
      'The KL divergence is nonnegative but asymmetric, and is not a metric',
      'Huffman average length satisfies H≤L<H+1; BSC capacity is 1-h(p)',
    ],
  },
};

export default map;
