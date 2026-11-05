import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'topological-spaces': {
    chapter: 'Chapter 1 Topological Spaces',
    title: 'Topological Spaces and Continuity',
    summary:
      'Throw away "distance" and keep only "open sets"—when rubber-sheet geometry replaces ruler-and-compass geometry, the essence of continuity surfaces.',
    keyPoints: [
      'A topology is a family of open sets satisfying three axioms; continuity means the preimage of an open set is open',
      'A homeomorphism is the "equals sign" of topology: a doughnut ≅ a coffee cup',
      'Quotient topologies glue together the Möbius band, the torus and the projective plane',
      'Continuous functions preserve connectedness → a topological proof of the intermediate value theorem',
    ],
    content: String.raw`

Imagine a piece of modelling clay in your hand. You can stretch it, flatten it, twist it—as long as you do not tear it or glue two distinct points into one, it remains "the same lump of clay" in the eyes of a topologist. Mould a square into a circle, a coffee cup into a doughnut—as long as the number of "holes" does not change, topology regards them as one family. This viewpoint—"ignoring distance, caring only about connectedness and holes"—is the soul of topology.

But this raises a sharp question: if we are not allowed to speak of distance (the clay can be stretched arbitrarily far), can we still define "continuity"? In calculus, continuity is defined with $\varepsilon-\delta$ language and distance; once distance is gone, continuity seems to lose its basis. Worse, many important mathematical objects have no natural distance at all, yet still need the notions of "continuous" and "convergent"—for example the Zariski topology in algebraic geometry, and quotient spaces obtained by gluing equivalence classes together.

Introductory question: in a world with only "open sets", what does it mean for a function $f$ from a space $X$ to a space $Y$ to "pass over without tearing"? In this chapter we redefine continuity with a list of open sets, and discover that it is more essential than we imagined: continuity has nothing to do with concrete shape or distance, only with "which sets count as open".

## II. Rigorous Definitions

**Definition (topology and topological space)**. Let $X$ be a set and $\mathcal{T}$ a family of subsets of $X$. If $\mathcal{T}$ satisfies the following three axioms, it is called a topology on $X$, $(X,\mathcal{T})$ is called a topological space, and the members of $\mathcal{T}$ are called open sets:

1. $\varnothing\in\mathcal{T}$ and $X\in\mathcal{T}$;
2. closure under arbitrary unions: if $\{U_\alpha\}_{\alpha\in A}\subset\mathcal{T}$, then $\bigcup_{\alpha\in A}U_\alpha\in\mathcal{T}$;
3. closure under finite intersections: if $U_1,\dots,U_n\in\mathcal{T}$, then $\bigcap_{i=1}^{n}U_i\in\mathcal{T}$.

Here $A$ is an arbitrary index set, possibly infinite or uncountable; "finite intersections" allows only finitely many. The asymmetry between points 2 and 3 is the technical core of all topology, and the next section explains it.

**Definition (closed set)**. $F\subset X$ is called closed if its complement $X\setminus F$ is open.

De Morgan's laws immediately give the dual properties of closed sets: the intersection of arbitrarily many closed sets is closed, the union of finitely many closed sets is closed; $\varnothing$ and $X$ are both open and closed.

**Definition (interior, closure, boundary)**. For $A\subset X$:

- the interior $\operatorname{int}A$ is the union of all open sets contained in $A$, the largest open set inside $A$;
- the closure $\overline{A}$ is the intersection of all closed sets containing $A$, the smallest closed set containing $A$;
- the boundary $\partial A=\overline{A}\setminus\operatorname{int}A$.

**Definition (neighbourhood)**. $N\subset X$ is a neighbourhood of the point $x$ if there is an open set $U$ with $x\in U\subset N$. Note that a neighbourhood need not itself be open; only an "open neighbourhood" is open.

**Definition (base and subbase)**. Let $\mathcal{B}\subset\mathcal{T}$. If every open set can be written as a union of members of $\mathcal{B}$, then $\mathcal{B}$ is a base for the topology $\mathcal{T}$. $\mathcal{B}$ is a base for some topology if and only if: (i) $\bigcup_{B\in\mathcal{B}}B=X$; (ii) for any $B_1,B_2\in\mathcal{B}$ and $x\in B_1\cap B_2$, there is $B_3\in\mathcal{B}$ with $x\in B_3\subset B_1\cap B_2$. A subbase is a weaker notion: its finite intersections form a base.

**Definition (subspace topology)**. If $A\subset X$, then $\mathcal{T}_A=\{U\cap A: U\in\mathcal{T}\}$ is a topology on $A$, called the subspace topology.

**Definition (continuous)**. Let $f:X\to Y$. $f$ is continuous at $x_0$ if for every neighbourhood $V$ of $f(x_0)$, $f^{-1}(V)$ is a neighbourhood of $x_0$; $f$ is continuous if for every open set $V$ in $Y$, $f^{-1}(V)$ is open in $X$. Equivalently: the preimage of every closed set is closed; or it suffices to check the preimages of open sets in a base (or even a subbase).

**Definition (homeomorphism)**. If $f:X\to Y$ is a bijection and both $f$ and $f^{-1}$ are continuous, then $f$ is a homeomorphism and $X$ and $Y$ are homeomorphic, written $X\cong Y$.

**Common topologies**:

- discrete topology: $\mathcal{T}=2^X$, all subsets open, the strongest topology;
- indiscrete (trivial) topology: $\mathcal{T}=\{\varnothing,X\}$, the weakest topology;
- cofinite topology: open sets are $\varnothing$ or subsets with finite complement;
- cocountable topology: open sets are $\varnothing$ or subsets with countable complement;
- usual topology on the real line $\mathbb{R}$: generated by the base of all open intervals $(a,b)$;
- Sierpiński space: $X=\{0,1\}$, $\mathcal{T}=\{\varnothing,\{1\},\{0,1\}\}$.

## III. Why These Definitions

**Why "arbitrary unions, finite intersections" and not the other way round?** Because in Euclidean space the arbitrary union of open intervals is still open: take any point $x$ of the union, it comes from some open interval, and that interval lies entirely in the union, so $x$ still has a whole stretch of room. Arbitrary intersections fail:

$$\bigcap_{n=1}^{\infty}\left(-\frac{1}{n},\frac{1}{n}\right)=\{0\},$$

and the right side is a single point, which is not open in $\mathbb{R}$. Geometrically, infinitely many trimmings can shave an open interval down to a line, to a point, shaving away all the room. So the axiom only dares to require finite intersections—finitely many trimmings still leave a smallest positive radius.

**Why require $\varnothing$ and $X$ to be open?** So that union and intersection have identity elements: the union of the empty family is $\varnothing$ and the intersection of the empty family is $X$. If $X$ were not counted as open, the continuity of constant maps and the definition of subspaces would break. You may think of $X$ as the whole stage, and the stage itself is of course open.

**Why is continuity phrased with "preimages of open sets" rather than "images of open sets"?** Continuity means nearby points are mapped to nearby points. In terms of open sets: a patch $V$ around $f(x)$ should come from a patch $f^{-1}(V)$ around $x$. Pulling back is the key here, because $f$ may collapse distinct points together, so the image may shrink and flatten; only the preimage faithfully records which points were sent into $V$.

A counterexample suffices to show that "images open" is the wrong condition. Let $\operatorname{id}:\mathbb{R}\to\mathbb{R}$ be the identity, with the usual topology on the domain and the discrete topology on the codomain. Every set is open in the discrete topology, so this map sends open sets to open sets and is an open map; but is it continuous? Take the singleton $\{0\}$, which is open in the discrete space, while its preimage $\{0\}$ is not open in the usual topology, so the map is not continuous. Evidently "open sets map to open sets" and continuity are two independent things.

**Why is the closed-set version equivalent?** Because preimages commute with complements: $f^{-1}(Y\setminus F)=X\setminus f^{-1}(F)$. So "the preimage of every open set is open" and "the preimage of every closed set is closed" are two ways of saying the same thing.

**Why do the base criteria look like that?** A base is a set of building blocks. To ensure that the overlap of any two blocks can be filled by blocks, condition (ii) is needed: every point of the overlap has a small block inserted into it. Without it, the open sets assembled could fail to be closed under finite intersections and would not form a topology.

**Why must a homeomorphism have a continuous inverse?** Because "same structure" must be two-way. There are examples of continuous bijections with discontinuous inverse: $f:[0,2\pi)\to S^1$, $f(t)=e^{it}$. It is continuous and bijective, but its inverse is discontinuous at $1$: a small arc near $1$ on $S^1$ pulls back to $[0,\varepsilon)\cup(2\pi-\varepsilon,2\pi)$, which is not open in $[0,2\pi)$ (near $0$ there is only the right half). So $[0,2\pi)$ and $S^1$ are not homeomorphic—one has a cut, the other is joined up.

## IV. Intuition and Pictures

Think of a topology as issuing open-set licences to the set $X$: $\mathcal{T}$ is the batch of approved subsets. The more licences issued, the stronger the topology and the more points can be distinguished; the fewer, the blurrier the space.

| Topology | What open sets look like | Intuition |
|---|---|---|
| discrete | all subsets | every point on its own, the finest |
| indiscrete | only the empty set and the whole space | nothing can be separated, the blurriest |
| cofinite | finite complement, or the whole space | only the finitely many missing points matter |
| usual (real line) | unions of open intervals | everyday intuition of continuity |
| subspace | intersections of open sets with $A$ | slice the open sets of the big space |

> Intuition: an open set is one in which every point can move a little while staying inside. A closed set is one that contains all its limit points. The interior is the heart where one can move freely; the boundary is the skin outside the heart but inside the closure.

The contrast between strong and weak topologies can also be read as resolution: the discrete topology is infinite resolution, where any point can be circled on its own; the indiscrete topology is zero resolution, where any non-empty open set is the whole space. Many theorems in topology (Hausdorff, compactness) are essentially asking: is the resolution of this space high enough?

> More intuitively: a continuous map is a delivery van that does not tear. It may flatten, curl and fold a patch of open set, but it cannot rip apart points that were joined. "The preimage of an open set is open" says exactly that the van will not tear a whole patch to pieces.

## V. Worked Examples

### Example 1 (Basic: verifying a topology and computing interior, closure, boundary)

Problem: let $X=\{a,b,c\}$ and $\mathcal{T}=\{\varnothing,\{a\},\{a,b\},X\}$. Verify that $\mathcal{T}$ is a topology and find the interior, closure and boundary of $\{b\}$.

Approach: check the three axioms one by one; then find the largest open subset and the smallest closed superset by definition.

Solution: first the axioms. $\varnothing$ and $X$ belong to $\mathcal{T}$ by definition. $\mathcal{T}$ has only four members, so arbitrary unions need only check pairwise unions: $\{a\}\cup\{a,b\}=\{a,b\}$, $\{a\}\cup X=X$, $\{a,b\}\cup X=X$, all in $\mathcal{T}$; unions of three or more reduce to these. Finite intersections: $\{a\}\cap\{a,b\}=\{a\}$, $\{a\}\cap X=\{a\}$, $\{a,b\}\cap X=\{a,b\}$, all in $\mathcal{T}$. Hence $\mathcal{T}$ is a topology.

Now the closed sets. Closed sets are complements of open sets:

$$X\setminus\varnothing=X,\quad X\setminus\{a\}=\{b,c\},\quad X\setminus\{a,b\}=\{c\},\quad X\setminus X=\varnothing.$$

So the family of closed sets is $\{\varnothing,\{c\},\{b,c\},X\}$.

For $A=\{b\}$: the only open set contained in $A$ is $\varnothing$, so $\operatorname{int}A=\varnothing$. The closed sets containing $A$ are $\{b,c\}$ and $X$, the smallest being $\{b,c\}$, so $\overline{A}=\{b,c\}$. Hence

$$\partial A=\overline{A}\setminus\operatorname{int}A=\{b,c\}.$$

Comment: $\{b\}$ is neither open nor closed; its closure has one more point $c$, showing that at this point limit points may come from the topological structure rather than from a distance.

### Example 2 (Intermediate: closed sets and convergence in the cofinite topology)

Problem: let $X$ be infinite with the cofinite topology. Prove that $X$ is $T_1$; that any two non-empty open sets intersect; and that if a sequence $(x_n)$ has pairwise distinct terms, it converges to every point of $X$.

Approach: closed sets are finite sets or $X$; open sets are large and their complements small.

Solution: (1) The complement $X\setminus\{x\}$ of the singleton $\{x\}$ is open (its complement is a single point, hence finite), so $\{x\}$ is closed. For any two points $x\ne y$, $X\setminus\{y\}$ is an open set containing $x$ but not $y$, and $X\setminus\{x\}$ contains $y$ but not $x$. Hence $X$ is $T_1$.

(2) Let $U,V$ be non-empty and open. Then $X\setminus U$ and $X\setminus V$ are both finite, so

$$X\setminus(U\cap V)=(X\setminus U)\cup(X\setminus V)$$

is finite. Since $X$ is infinite, $X\setminus(U\cap V)\ne X$, hence $U\cap V\ne\varnothing$. In particular, no two points can have disjoint open neighbourhoods, so $X$ is not Hausdorff.

(3) Take any $x\in X$ and any open neighbourhood $U$ of $x$. Then $F=X\setminus U$ is finite. Since the terms of $(x_n)$ are pairwise distinct, at most $|F|$ of them lie in $F$; so there is $N$ such that $x_n\notin F$ for $n>N$, i.e. $x_n\in U$. By the arbitrariness of $U$, $x_n\to x$. Since $x$ was arbitrary, the sequence converges to every point.

Comment: this example shows that $T_1$ is still far from Hausdorff, and that in a non-Hausdorff space limits need not be unique. When we discuss separation axioms later, we shall use this property as a standard counterexample.

### Example 3 (Advanced: the Sorgenfrey topology generated by half-open intervals)

Problem: on $\mathbb{R}$ let $\mathcal{B}=\{[a,b): a<b\}$. Prove that $\mathcal{B}$ is a base for some topology, that the topology $\mathcal{T}_S$ it generates is strictly finer than the usual topology, and that $[0,1)$ is both open and closed in $\mathcal{T}_S$.

Approach: first verify the base criteria, then compare the two topologies.

Solution: (1) Covering: $\bigcup_{a<b}[a,b)=\mathbb{R}$, since every $x\in[x,x+1)$.

(2) Base criterion: let $x\in[a,b)\cap[c,d)$. Put $e=\max\{a,c\}$ and $f=\min\{b,d\}$. Then the intersection is exactly $[e,f)$ (if $e<f$; if $e\ge f$ the intersection is empty and there is nothing to check). Since $x$ lies in the intersection, necessarily $e\le x<f$, i.e. $e<f$, and

$$x\in[e,f)\subset[a,b)\cap[c,d).$$

So the base criterion holds and $\mathcal{B}$ generates a topology $\mathcal{T}_S$.

(3) Comparison: take any usual open set $(a,b)$ and $x\in(a,b)$. Take $[x,b)\subset(a,b)$ (since $x<b$); this is a base element of $\mathcal{T}_S$ contained in $(a,b)$. Hence $(a,b)$ is a union of open sets of $\mathcal{T}_S$, so $(a,b)\in\mathcal{T}_S$. Therefore the usual topology is contained in $\mathcal{T}_S$.

Conversely, $[0,1)\in\mathcal{T}_S$. Can it be open in the usual topology? If so, there is $\varepsilon>0$ such that $(-\varepsilon,\varepsilon)\subset[0,1)$, but $-\varepsilon/2\in(-\varepsilon,\varepsilon)$ is not in $[0,1)$, a contradiction. So $[0,1)$ is not usually open, the two topologies are strictly different, and $\mathcal{T}_S$ is strictly finer.

(4) $[0,1)$ is closed: its complement is $(-\infty,0)\cup[1,\infty)$. And

$$(-\infty,0)=\bigcup_{n=1}^{\infty}[-n,0),\qquad [1,\infty)=\bigcup_{n=1}^{\infty}[1,1+n),$$

both unions of open sets of $\mathcal{T}_S$, so the complement is open and $[0,1)$ is closed. Hence $[0,1)$ is both open and closed.

Comment: this topology is called the lower limit topology and the resulting space the Sorgenfrey line. It is finer than the usual topology yet still first countable and separable; when we discuss separation axioms it is the standard example of a separable space that is not second countable. Note that the building blocks $[a,b)$, closed on the left and open on the right, give the left endpoint a smallest step while the right endpoint has none.

## VI. Common Errors and Pitfalls

- Error: writing "arbitrary union" as "finite union". Correction: the axiom requires closure under arbitrary unions; finite unions are only a special case. Requiring only finite unions gives a structure far weaker than a topology.
- Error: thinking open sets are closed under arbitrary intersections. Correction: $\bigcap_n(-1/n,1/n)=\{0\}$ is not open. Only finite intersections are axiomatic.
- Error: equating closed with bounded-and-closed or with "contains no boundary". Correction: closed only means the complement is open; $\mathbb{R}$ itself is both open and closed, and in a discrete space every set is both.
- Error: thinking the only clopen sets are the empty set and the whole space. Correction: that is exactly the definition of connectedness; in a disconnected space there are non-trivial clopen sets, such as $[0,1]$ inside $[0,1]\cup[2,3]$.
- Error: treating an open set of the subspace as open in the ambient space. Correction: $[0,1/2)$ is open in the subspace topology of $[0,1]$ but not in $\mathbb{R}$. Openness is relative to the surrounding space.
- Error: thinking continuity means open sets map to open sets. Correction: continuity means preimages of open sets are open. The identity from the real line (usual topology) to the real line (discrete topology) is an open map but not continuous.
- Error: thinking a continuous bijection is necessarily a homeomorphism. Correction: the inverse must also be continuous; $[0,2\pi)\to S^1$, $t\mapsto e^{it}$ is a counterexample.
- Error: verifying only one open set when proving continuity. Correction: all open sets must be checked; in practice it suffices to check base elements, since general open sets are unions of base elements and preimages commute with unions.
- Error: thinking finer is always better. Correction: a finer topology has more open sets and fewer continuous maps; compactness is harder in a finer topology and Hausdorffness easier, so a balance is needed.

## VII. Summary and Mnemonics

Key points:

- a topology is a family of open sets satisfying three axioms: the empty set and the whole space belong to it, arbitrary unions, finite intersections;
- closed sets are complements of open sets; the interior is the largest open subset, the closure the smallest closed superset, and the boundary is the closure minus the interior;
- a base is a set of building blocks, with the criterion that overlaps can be filled by smaller blocks; the subspace topology consists of intersections of open sets with $A$;
- continuity is equivalent to "preimages of open sets are open", and also to "preimages of closed sets are closed"; a homeomorphism is a bijection continuous in both directions;
- common topologies: discrete, indiscrete, cofinite, usual, Sorgenfrey.

Mnemonic: **"Three axioms for open sets, arbitrary unions and finite intersections; continuity looks at preimages, homeomorphisms run both ways."**

`,
  },

  'compact-connected': {
    chapter: 'Chapter 2 Compactness and Connectedness',
    title: 'Compactness and Connectedness',
    summary:
      'Compactness is the infinite substitute for "finite": every open cover has a finite subcover. The extreme value theorem and uniform continuity depend on it.',
    keyPoints: [
      'Compact = every open cover has a finite subcover (in metric spaces = sequentially compact)',
      'Heine–Borel: in ℝⁿ compact = closed and bounded',
      'Both the extreme value theorem and uniform continuity rest on compactness',
      'Path connected ⟹ connected; for locally path connected spaces the two are equivalent',
    ],
    content: String.raw`

Why must a continuous function on a closed interval attain a maximum? Why is a continuous function on $[0,1]$ necessarily uniformly continuous? These seemingly obvious facts about the real numbers all depend on a deeper property—compactness.

Introduction: on $(0,1)$ the function $f(x)=1/x$ is continuous yet unbounded, and certainly has no maximum; on $\mathbb{R}$ the function $f(x)=x$ is continuous yet not uniformly continuous. Where is the problem? In the fact that these two domains are too scattered and too infinite. Compactness injects the spirit of the finite into infinite sets, reviving these good properties. Its definition sounds convoluted: every open cover has a finite subcover. But you can think of it in plain words—however many patches you use to cover the space, you can always pick out finitely many that already suffice.

This chapter also clarifies the difference between connectedness and path connectedness: a lump of dough that cannot be cut in two is connected, while path connected means any two points can be joined by a curve that never leaves the dough. The two coincide in well-behaved spaces but can diverge in pathological ones, and that counterexample will stay with you for life.

## II. Rigorous Definitions

**Definition (open cover and compactness)**. Let $X$ be a topological space. A family of open sets $\{U_\alpha\}_{\alpha\in A}$ covers $X$ if $\bigcup_{\alpha\in A}U_\alpha=X$. $X$ is compact if every open cover has a finite subcover, i.e. there are finitely many indices $\alpha_1,\dots,\alpha_m$ with $X=U_{\alpha_1}\cup\cdots\cup U_{\alpha_m}$.

**Finite intersection property**. $X$ is compact if and only if: for any family of closed sets, if every finite subfamily has non-empty intersection, then the whole family has non-empty intersection. This equivalent form is very convenient for existence proofs.

**Equivalent characterizations in metric spaces**. Let $(X,d)$ be a metric space. The following are equivalent:

- $X$ is compact;
- $X$ is sequentially compact: every sequence has a convergent subsequence with limit in $X$;
- $X$ is complete and totally bounded (for every $\varepsilon>0$ it can be covered by finitely many balls of radius $\varepsilon$);
- $X$ satisfies the Bolzano–Weierstrass property: every infinite subset has an accumulation point.

**Heine–Borel theorem**. In $\mathbb{R}^n$ a subset is compact if and only if it is closed and bounded.

**Local compactness**. Every point has a compact neighbourhood. $\mathbb{R}^n$ is locally compact but not compact; one-point compactification adds a point at infinity to $\mathbb{R}^n$, giving $S^n$.

**Connectedness**. $X$ is connected if it cannot be written as the union of two non-empty disjoint open sets. Equivalently: the only clopen subsets of $X$ are $\varnothing$ and $X$. A subset $A$ of $X$ is connected if $A$ with the subspace topology is a connected space.

**Path connectedness**. Any two points $x,y\in X$ can be joined by a continuous path $\gamma:[0,1]\to X$ with $\gamma(0)=x$ and $\gamma(1)=y$. Path connectedness is stronger than connectedness.

**Connected components and path components**. Classifying $X$ by "belonging to the same connected subset" gives the connected components; classifying by "can be joined by a path" gives the path components. Connected components are always closed; path components need not be.

**Local connectedness and local path connectedness**. Every point has a neighbourhood base consisting of connected (or path connected) neighbourhoods. When the space is locally path connected, connected components and path components coincide, and every connected open set is path connected.

**Common properties of compactness**:

- the continuous image of a compact space is compact;
- a closed subset of a compact space is compact;
- a compact subset of a Hausdorff space is closed;
- a continuous real function on a compact space attains its maximum and minimum;
- a continuous function on a compact metric space is uniformly continuous;
- the product of finitely many compact spaces is compact; the product of arbitrarily many compact spaces is compact (Tychonoff's theorem).

## III. Why These Definitions

**Why finite subcovers rather than something else?** Because finiteness is the precondition for induction, for picking out maxima and minima, and for taking the maximum over finitely many indices. With an infinite cover you cannot compare block by block; a finite subcover compresses an infinite problem into a finite one. All the benefits of compactness—existence of extrema, uniform continuity, the finite intersection property—come from this act of "compressing the infinite into the finite".

A counterexample shows the condition cannot be dropped: on $(0,1)$ take the open cover

$$U_n=\left(\frac{1}{n},1-\frac{1}{n}\right),\qquad n\ge 3.$$

For any $x\in(0,1)$, choose $n$ large enough that $1/n<x<1-1/n$; then $x\in U_n$, so this is indeed an open cover. But the union of any finitely many $U_n$ equals $U_N$ for the largest index $N$, and $U_N$ misses the points of $(0,1/N]$. Hence there is no finite subcover and $(0,1)$ is not compact. This is exactly the root of the unboundedness of $1/x$ and of its lack of a maximum.

**Why do metric spaces have so many equivalent characterizations?** Because distance provides the equivalent languages of boundedness, Cauchy sequences and accumulation points. In a metric space, "every sequence has a convergent subsequence" and "every open cover has a finite subcover" imply each other—this is the equivalence of sequential compactness and compactness. In a general topological space, however, sequences are not enough (nets or filters are needed), so open covers give the most universal definition.

**Why is "closed and bounded" equivalent to compact only in $\mathbb{R}^n$?** The Heine–Borel theorem depends on the finite-dimensional structure of $\mathbb{R}^n$. In a general metric space, closed and bounded is far from sufficient. Counterexample: in an infinite-dimensional Hilbert space the closed unit ball is closed and bounded but not compact (take a sequence of pairwise orthogonal unit vectors; it has no convergent subsequence). Another more elementary counterexample is $\mathbb{Q}\cap[0,1]$: it is closed and bounded in $\mathbb{Q}$ yet not compact, because a sequence of rationals approaching $1/\sqrt{2}$ has no subsequence converging in $\mathbb{Q}$.

**Why is connectedness defined by "two non-empty disjoint open sets"?** This is a precise formulation of "cannot be cut apart". If $X=U\cup V$ with $U,V$ non-empty, disjoint and both open, then $U$ and $V$ are two cleanly severed pieces, and $U$ is also closed (since $V$ is open). So connectedness is equivalent to the absence of non-trivial clopen subsets. This equivalent form is more often used in proofs: to show that $X$ is connected, it suffices to show that any clopen subset is either empty or all of $X$.

**Why is path connectedness stronger?** Path connectedness requires that any two points be joined by a continuous segment brought over, which is much stronger than merely not being cuttable. A counterexample is the topologist's sine curve:

$$S=\left\{\left(x,\sin\frac{1}{x}\right):0<x\le 1\right\}\cup\{(0,0)\}.$$

It is connected (being part of the closure of a connected graph), but no path starting from $(0,0)$ can reach the graph on the right—the graph oscillates infinitely as $x\to0$, and the continuity of the path would be torn. So $S$ is connected but not path connected. This example also shows that a space can have one connected component but two path components.

**Why do continuous maps preserve compactness and connectedness?** For compactness: pull back an open cover of the target space to an open cover of the source, take a finite subcover and push it forward. For connectedness: if the image split into two disjoint non-empty open pieces, the preimage would split in the same way, contradicting connectedness. These two properties are the most important "carrying capacities" of compactness and connectedness, and the extreme value theorem and the intermediate value theorem are both corollaries.

## IV. Intuition and Pictures

Think of the space as a quilt and the open cover as patches. Compactness says: however many patches you use, you can always pick out finitely many that cover it. Connectedness is like an intact lump of dough that cannot be cut into two separate halves.

| Space | Compact? | Connected? | Path connected? |
|---|---|---|---|
| $[0,1]$ | yes | yes | yes |
| $(0,1)$ | no | yes | yes |
| $\mathbb{R}$ | no | yes | yes |
| finite set | yes | depends | depends |
| $S^1$ | yes | yes | yes |
| topologist's sine curve | yes | yes | no |
| rationals | no | no | no |

> Intuition: a compact space is a controllable infinity—however large and complicated, it can always be grasped by finite means. A connected space is one whole piece—it cannot be split into two unrelated halves. A path connected space is one you can walk through—there is a route between any two points.

The difference between compactness and connectedness can also be remembered through counterexamples: $(0,1)$ is connected but not compact (it lacks endpoints); the topologist's sine curve is compact and connected but not path connected (it has an oscillating tail); the rationals are neither connected nor compact (they are riddled with holes).

> More intuitively: compactness governs the efficiency of covering, connectedness the difficulty of splitting. A space can be very compact yet hard to walk through (the sine curve), or easy to walk through yet impossible to cover finitely (the real line).

## V. Worked Examples

### Example 1 (Basic: proving $[0,1]$ compact using suprema)

Problem: without quoting the Heine–Borel theorem, prove directly from the definition that $[0,1]$ is compact.

Approach: collect the right endpoints that can be finitely covered, take the supremum, and show that this supremum is $1$.

Solution: let $\{U_\alpha\}_{\alpha\in A}$ be any open cover of $[0,1]$. Let

Let $S$ be the set of all $x\in[0,1]$ such that the closed interval $[0,x]$ can be covered by finitely many $U_\alpha$.

First $0\in S$: take $U_{\alpha_0}$ with $0\in U_{\alpha_0}$; then $\{0\}$ is covered by one open set. So $S$ is non-empty and bounded above by $1$. Let $c=\sup S$.

Show $c\in S$. Take $U_\beta$ with $c\in U_\beta$. Since $U_\beta$ is open in $\mathbb{R}$, there is $\varepsilon>0$ with $(c-\varepsilon,c+\varepsilon)\subset U_\beta$. If $c=0$, then $[0,\varepsilon/2]\subset U_\beta$, so $\varepsilon/2\in S$, contradicting that $c=0$ is the supremum. Hence $c>0$. By the definition of the supremum there is $x\in S$ with $x>c-\varepsilon$. Then $[0,x]$ is covered by finitely many $U_\alpha$, and

$$[x,c]\subset(c-\varepsilon,c+\varepsilon)\subset U_\beta,$$

so $[0,c]$ is covered by those finitely many open sets together with $U_\beta$, i.e. $c\in S$.

Finally show $c=1$. If $c<1$, take $\delta>0$ with $[c,c+\delta)\subset U_\beta$ and $c+\delta\le1$. Then $[0,c+\delta/2]$ is covered by the same finitely many open sets plus $U_\beta$, so $c+\delta/2\in S$, contradicting that $c$ is the supremum. Hence $c=1$, that is, $[0,1]$ is covered by finitely many $U_\alpha$. Since the cover was arbitrary, $[0,1]$ is compact.

Comment: this proof is the template for compactness arguments—use a supremum to assemble local information into a global conclusion. It does not depend on the special structure of $\mathbb{R}^n$, and with small modifications proves that any closed interval is compact.

### Example 2 (Intermediate: $(0,1)$ is not compact, and uniform continuity fails)

Problem: prove that $(0,1)$ is not compact, and show that $f(x)=1/x$ on $(0,1)$ is continuous but fails both boundedness and uniform continuity.

Approach: construct an open cover with no finite subcover; then use sequences to show the failure of uniform continuity.

Solution: (1) Take $U_n=(1/n,1-1/n)$, $n\ge3$. For any $x\in(0,1)$, by the Archimedean property there is $n$ with $1/n<x$ and $1/n<1-x$, i.e. $x\in U_n$. So $\{U_n\}$ is an open cover. Given finitely many $U_{n_1},\dots,U_{n_m}$, let $N=\max\{n_1,\dots,n_m\}$; their union is $U_N$ (since $U_n$ increases with $n$), and $1/(N+1)\in(0,1)$ is not in $U_N$. Hence there is no finite subcover and $(0,1)$ is not compact.

(2) $f(x)=1/x$ is continuous on $(0,1)$. Take $x_n=1/n$; then $f(x_n)=n\to\infty$, so $f$ is unbounded—the theorem "a continuous function on a compact space is bounded" fails here.

(3) Take $x_n=1/n$ and $y_n=1/(n+1)$. Then

$$\lvert x_n-y_n\rvert=\frac{1}{n(n+1)}\to0,$$

but

$$\lvert f(x_n)-f(y_n)\rvert=\lvert n-(n+1)\rvert=1.$$

So for $\varepsilon=1$, however small $\delta>0$ is, one can find two points closer than $\delta$ whose function values differ by $1$. Hence $f$ is not uniformly continuous on $(0,1)$.

Comment: a continuous function on a compact metric space is necessarily uniformly continuous—a great gift of compactness to analysis. What $(0,1)$ lacks is compactness at the endpoints; after completing the interval to $[0,1]$, $1/x$ cannot even be continuously extended, and the problem is exposed more starkly.

### Example 3 (Advanced: the topologist's sine curve is connected but not path connected)

Problem: let

$$S=\left\{\left(x,\sin\frac{1}{x}\right):0<x\le1\right\}\cup\{(0,0)\}.$$

Prove that $S$ is connected but not path connected.

Approach: connectedness uses the fact that the closure of a connected set is connected; non-path-connectedness uses contradiction, the projected interval and the infinite oscillation of $\sin(1/x)$.

Solution: write $G=\{(x,\sin(1/x)):0<x\le1\}$.

(1) $G$ is connected: it is the image of the connected interval $(0,1]$ under the continuous map $x\mapsto(x,\sin(1/x))$.

(2) $S$ is connected: the points $(1/(n\pi),0)$ belong to $G$ and tend to $(0,0)$, so $(0,0)\in\overline{G}$, hence $G\subset S\subset\overline{G}$. Use the standard lemma: if $A$ is connected and $A\subset B\subset\overline{A}$, then $B$ is connected. Proof: if $B=U\cup V$ is a separation ($U,V$ non-empty, disjoint, open in $B$), then connectedness of $A$ implies $A\subset U$ or $A\subset V$; assume $A\subset U$. Since $U$ is closed in $B$, $\overline{A}\cap B\subset U$, but $B\subset\overline{A}$, so $B\subset U$, contradicting that $V$ is non-empty. Hence $S$ is connected.

(3) $S$ is not path connected. Suppose there is a continuous path $\gamma:[0,1]\to S$ with $\gamma(0)=(0,0)$ and $\gamma(1)\in G$. Write $\gamma(t)=(x(t),y(t))$ and let

$$t_0=\inf\{t\in[0,1]:x(t)>0\}.$$

Since $x(0)=0$ and $x(1)>0$, and $\{t:x(t)>0\}$ is open in $[0,1]$, we have $t_0\in[0,1)$, $x(t_0)=0$, and for every $\delta>0$ there is $t\in(t_0,t_0+\delta)$ with $x(t)>0$.

First take $\varepsilon=1/2$. Since $y$ is continuous at $t_0$ and $y(t_0)=0$, there is $\delta_0>0$ such that $\lvert y(t)\rvert<1/2$ whenever $\lvert t-t_0\rvert<\delta_0$. Then take $\delta\in(0,\min\{\delta_0,1-t_0\})$ such that $a:=x(t_0+\delta)>0$ (such a $\delta$ exists because $x$ takes positive values arbitrarily close to the right of $t_0$). Consider the interval $I=[t_0,t_0+\delta]$. Its image $\gamma(I)$ is connected, so the projection $J=x(I)$ onto the $x$ coordinate is a connected subset of $\mathbb{R}$, i.e. an interval. $J$ contains $0=x(t_0)$ and $a=x(t_0+\delta)$, so $J\supset[0,a]$.

Hence for every $s\in(0,a)$ there is $t\in I$ with $x(t)=s$. Since $s>0$, the corresponding point must lie on $G$, so $y(t)=\sin(1/s)$. Choose $s$ in $(0,a)$ with $\sin(1/s)=1$, and then $s$ with $\sin(1/s)=-1$ (there are infinitely many such $s$ in any small positive interval), obtaining $t_1,t_2\in I$ with $y(t_1)=1$ and $y(t_2)=-1$.

But $t_1,t_2\in I$ satisfy $\lvert t_i-t_0\rvert\le\delta<\delta_0$, so $\lvert y(t_i)\rvert<1/2$, contradicting $\lvert y(t_i)\rvert=1$.

Therefore no such path exists and $S$ is not path connected.

Comment: $S$ is also compact (closed and bounded), so it shows at the same time that compact plus connected does not imply path connected. The trap in this counterexample is that looking at the picture one feels the tail connects to the origin, but a continuous path requires $y(t)$ to have a limit as $x(t)\to0$, and $\sin(1/x)$ simply refuses.

## VI. Common Errors and Pitfalls

- Error: thinking a bounded closed set is always compact. Correction: this holds only in $\mathbb{R}^n$ (and finite-dimensional normed spaces); the infinite-dimensional unit ball is not compact, and $\mathbb{Q}\cap[0,1]$ is another counterexample.
- Error: taking "every sequence has a convergent subsequence" as the definition of compactness in general topology. Correction: general topology needs nets or open covers; sequential compactness and compactness are equivalent only in metric spaces.
- Error: thinking a compact subset is necessarily closed. Correction: this holds only in Hausdorff spaces. In Sierpiński space $\{1\}$ is finite hence compact, but its complement $\{0\}$ is not open, so $\{1\}$ is not closed.
- Error: confusing local compactness with compactness. Correction: $\mathbb{R}$ is locally compact but not compact; local compactness means each point has a compact neighbourhood, while the whole space may extend indefinitely.
- Error: thinking connected implies path connected. Correction: the topologist's sine curve is connected but not path connected; the two are equivalent only when the space is locally path connected.
- Error: thinking a connected open set in a general space is path connected. Correction: this is true for open subsets of $\mathbb{R}^n$ but fails in general topological spaces.
- Error: conflating connected components with path components. Correction: path components always lie inside connected components, but not conversely; the sine curve has one connected component and two path components.
- Error: thinking that because the continuous image of a compact space is compact, the preimage is compact too. Correction: a continuous map preserves compactness of images, not preimages; compactness of preimages needs extra conditions (such as properness).
- Error: thinking the product of arbitrarily many compact spaces needs a condition beyond the axiom of choice. Correction: Tychonoff's theorem is itself equivalent to a form of the axiom of choice, and using it is legitimate.
- Error: treating the rationals as connected. Correction: between any two rationals there is an irrational, so $\mathbb{Q}$ can be cut into two non-empty open sets; $\mathbb{Q}$ is totally disconnected and its components are single points.

## VII. Summary and Mnemonics

Key points:

- compact means every open cover has a finite subcover; in metric spaces it is also equivalent to sequential compactness, or to complete plus totally bounded;
- Heine–Borel: in $\mathbb{R}^n$ compact equals closed and bounded;
- continuous images preserve compactness; a continuous real function on a compact space attains its extrema and is uniformly continuous;
- connected means it cannot be split into two non-empty disjoint open sets, equivalently it has no non-trivial clopen subsets;
- path connectedness is stronger than connectedness, and the topologist's sine curve is the standard counterexample;
- a compact subset of a Hausdorff space is closed, and a closed subset of a compact space is compact.

Mnemonic: **"Open cover, finite net; compactness present, extrema met; joined as one piece, cannot be cut; paths connecting, stronger yet."**

`,
  },
  'fundamental-group': {
    chapter: 'Chapter 3 The Fundamental Group',
    title: 'The Fundamental Group',
    summary:
      'Turning "holes" into algebra: loops around a hole cannot be contracted, and loops can be composed—the first lesson of algebraic topology.',
    keyPoints: [
      'The fundamental group = homotopy classes of loops, with concatenation as the operation',
      'π₁(S¹) ≅ ℤ: the winding number gives a complete classification',
      'van Kampen: the group of a space = the groups of two pieces glued along their intersection (amalgamated product)',
      'π₁(torus) = ℤ²; π₁(figure eight) = free group (non-abelian)',
    ],
    content: String.raw`

How does one say "this space has a hole" in mathematical language? Feel it out: on the circle $S^1$ there is a class of loops that go around the hole and cannot be contracted to a point by any continuous deformation; whereas in a solid disc every loop can be shrunk to a point. This degree of non-contractibility is what the fundamental group sets out to quantify.

Introduction: why are loops on a doughnut freer than loops on a sphere? Because a doughnut has two independent directions to wind around (around the hole, around the tube), while a sphere has none—any loop on a sphere can be contracted to a point. The fundamental group turns this freedom of winding into a group, thereby distinguishing different shapes. Even better, it is a homeomorphism invariant: homeomorphic spaces necessarily have isomorphic fundamental groups, so it can be used to prove topological conclusions such as "the sphere is not homeomorphic to the torus".

But the fundamental group is not perfect: it may be non-abelian and is harder to compute than homology; and it sees only one-dimensional holes, being powerless against the two-dimensional cavity enclosed by a sphere. Nevertheless it remains the most intuitive and most geometric algebraic invariant, and the stage for covering space theory and van Kampen's theorem.

## II. Rigorous Definitions

Fix a base point $x_0\in X$. A path is a continuous map $\gamma:[0,1]\to X$. If $\gamma(0)=\gamma(1)=x_0$, $\gamma$ is called a loop based at $x_0$.

**Path homotopy**. Two loops $\gamma_0,\gamma_1$ based at $x_0$ are called path homotopic (or homotopic rel endpoints) if there is a continuous map $H:[0,1]\times[0,1]\to X$ with

$$H(s,0)=\gamma_0(s),\quad H(s,1)=\gamma_1(s),\quad H(0,t)=H(1,t)=x_0.$$

Write $\gamma_0\simeq\gamma_1$. Here $s$ is the path parameter and $t$ the homotopy parameter; $H(0,t)=H(1,t)=x_0$ says that the endpoints stay pinned at $x_0$ throughout the deformation.

**Concatenation and reversal of loops**. For two loops $\alpha,\beta$ based at $x_0$, their concatenation is defined by

$$(\alpha*\beta)(s)=\begin{cases}\alpha(2s), & 0\le s\le\frac{1}{2},\\[2pt] \beta(2s-1), & \frac{1}{2}\le s\le1.\end{cases}$$

The reversed loop is $\bar\alpha(s)=\alpha(1-s)$.

**The fundamental group**. The set of homotopy classes of loops based at $x_0$ is denoted $\pi_1(X,x_0)$, with the operation

$$[\alpha][\beta]=[\alpha*\beta].$$

This operation is well defined (homotopic loops remain homotopic after concatenation) and satisfies the group axioms: the identity is the constant loop $[c_{x_0}]$, the inverse is $[\bar\alpha]$, and associativity holds only up to homotopy (the three ways of concatenating differ in the speed of parametrization but can be removed by a reparametrizing homotopy).

**Change of base point**. If $h$ is a path from $x_0$ to $x_1$, define

$$\beta_h:\pi_1(X,x_1)\to\pi_1(X,x_0),\qquad [\gamma]\mapsto[h*\gamma*\bar h].$$

It is a group isomorphism. Hence when $X$ is path connected the fundamental groups at different base points are isomorphic, and one often writes $\pi_1(X)$; but this isomorphism depends on the path $h$ and is not canonical.

**Induced homomorphism**. If $f:X\to Y$ is continuous with $f(x_0)=y_0$, then

$$f_*:\pi_1(X,x_0)\to\pi_1(Y,y_0),\qquad f_*([\gamma])=[f\circ\gamma]$$

is a group homomorphism, and it is functorial: $(g\circ f)_*=g_*\circ f_*$ and $(\operatorname{id})_*=\operatorname{id}$. Thus homeomorphic spaces have isomorphic fundamental groups, and the fundamental group is a topological invariant.

**Simply connected and contractible**. $X$ is simply connected if it is path connected and $\pi_1(X)=0$. $X$ is contractible if $\operatorname{id}_X$ is homotopic to a constant map. A contractible space is necessarily simply connected, but not conversely (for example $S^2$ is simply connected but not contractible).

**van Kampen's theorem**. Let $X=U\cup V$ with $U,V,U\cap V$ path connected and $U,V$ open. Then

$$\pi_1(X)\cong\pi_1(U)*_{\pi_1(U\cap V)}\pi_1(V),$$

i.e. the amalgamated free product of the two groups along the images of the intersection. It is the most powerful tool for computing fundamental groups.

## III. Why These Definitions

**Why classify loops up to homotopy?** Without classification, the loops based at $x_0$ are uncountably many and cannot form a meaningful group at all. Homotopy classification identifies loops that can be continuously deformed into each other, and what remains is the essential information about the space. In other words, the fundamental group does not care how a loop is walked, only how it winds around holes.

**Why must homotopies fix the endpoints?** Because the group operation needs an identity and inverses. If the endpoints were allowed to move (free homotopy), a loop could slide to another base point, and the homotopy classes would no longer form a group—only conjugacy classes. With fixed endpoints, the constant loop can serve as identity and the reversed loop as inverse. This is the fundamental difference between based homotopy and free homotopy.

**Why is the operation head-to-tail concatenation?** It corresponds to going around once and then once more, exactly modelling the addition of winding numbers. On the circle, three turns followed by two turns gives five turns; three turns followed by three turns in the opposite direction gives zero. This operation is associative (up to homotopy), has an identity and inverses, hence forms a group. Note that associativity is not strict equality: $(\alpha*\beta)*\gamma$ and $\alpha*(\beta*\gamma)$ run at different speeds, but a reparametrizing homotopy connects them.

**Why fix a base point?** Because although the fundamental groups at different base points are isomorphic, the isomorphism is not canonical. Fixing a base point makes the group structure clear and gives the induced homomorphism definite endpoints. If the space is not path connected, the fundamental groups on different path components may be entirely unrelated.

**Why is the fundamental group non-abelian?** Because winding has an order. In the figure-eight space $S^1\vee S^1$, going around the left loop then the right loop, versus the right then the left, are two different routes that cannot be exchanged by homotopy. This is exactly the non-abelian nature of the free group $F_2$. Only in spaces whose fundamental group is abelian (such as the torus) does the order not matter.

**Counterexample: what if we do not take homotopy classes?** Take $S^1$. The set of all loops based at $1$ has no natural group structure: concatenating two loops gives a loop, but inverses do not exist—you cannot walk a three-times-around loop exactly backwards into the constant loop, only contract it homotopically. So one must quotient by homotopy to obtain the clean group $\mathbb{Z}$.

## IV. Intuition and Pictures

> Intuition: the fundamental group records holes. A loop winding $n$ times around a hole is not homotopic to one winding $m$ times; winding $n$ times then $-n$ times returns to the constant loop (inverse).

| Space | $\pi_1$ | Meaning |
|---|---|---|
| disc $B^2$ | $0$ | every loop is contractible |
| circle $S^1$ | $\mathbb{Z}$ | winding number |
| torus $S^1\times S^1$ | $\mathbb{Z}^2$ | two independent winding directions |
| sphere $S^2$ | $0$ | every loop is contractible |
| real projective plane | $\mathbb{Z}/2\mathbb{Z}$ | one turn cannot be contracted, two can |
| figure eight $S^1\vee S^1$ | $\mathbb{Z}*\mathbb{Z}$ | free group, non-abelian |

> More intuitively: think of the fundamental group as a ledger of windings around holes. On the circle, three turns is $+3$, two turns the other way is $-2$, and the composite leaves $+1$—exactly addition in $\mathbb{Z}$. On the torus the two directions are independent and do not affect each other, hence $\mathbb{Z}^2$; on the figure eight the two loops cannot be reordered, hence a non-abelian free group. The fundamental group of the real projective plane is $\mathbb{Z}/2\mathbb{Z}$: one turn cannot be contracted, only two—this is the prototype of torsion at the level of homotopy.

| Statement | True or false | Explanation |
|---|---|---|
| $\pi_1$ is always abelian | false | the figure eight has fundamental group the free group $F_2$, non-abelian |
| homeomorphic spaces have isomorphic $\pi_1$ | true | the fundamental group is a topological invariant |
| isomorphic $\pi_1$ implies homeomorphic | false | the fundamental group is only necessary, not sufficient |
| $\pi_1=0$ implies contractible | false | $S^2$ is simply connected but not contractible |
| different base points give different $\pi_1$ | false | when path connected they are isomorphic |

## V. Worked Examples

### Example 1 (Basic: the fundamental group of a convex set is trivial)

Problem: let $C\subset\mathbb{R}^n$ be convex and $x_0\in C$. Prove that $\pi_1(C,x_0)=0$.

Approach: in a convex set the segment between any two points lies inside the set, so any loop can be contracted to $x_0$ by a straight-line homotopy.

Solution: take any loop $\gamma:[0,1]\to C$ based at $x_0$. Define

$$H(s,t)=(1-t)\gamma(s)+t x_0,\qquad (s,t)\in[0,1]\times[0,1].$$

Since $C$ is convex, $\gamma(s)\in C$ and $x_0\in C$, so $H(s,t)\in C$. $H$ is a composite of continuous maps, hence continuous. Moreover

$$H(s,0)=\gamma(s),\quad H(s,1)=x_0,\quad H(0,t)=(1-t)x_0+t x_0=x_0,$$

and similarly $H(1,t)=x_0$. So $H$ is a path homotopy from $\gamma$ to the constant loop. Every loop is therefore homotopic to the constant loop, and $\pi_1(C,x_0)$ has only the identity.

Comment: the proof uses only convexity, so it holds for star-shaped sets, $\mathbb{R}^n$ itself, and open and closed balls. It is also the simplest instance of "contractible spaces have trivial fundamental group".

### Example 2 (Intermediate: $\pi_1(S^1)\cong\mathbb{Z}$)

Problem: prove that $\pi_1(S^1,1)\cong\mathbb{Z}$.

Approach: use the covering map $p:\mathbb{R}\to S^1$, $p(t)=e^{2\pi it}$, to lift loops to paths on the real line; the displacement of the endpoint is the winding number.

Solution: first state the path lifting lemma: for any path $\gamma:[0,1]\to S^1$ and any $s_0\in\mathbb{R}$ with $p(s_0)=\gamma(0)$, there is a unique continuous $\tilde\gamma:[0,1]\to\mathbb{R}$ with $p\circ\tilde\gamma=\gamma$ and $\tilde\gamma(0)=s_0$. Idea of the proof: since $\gamma([0,1])$ is compact, choose a sufficiently fine partition $0=s_0<s_1<\cdots<s_m=1$ such that each $\gamma([s_{i-1},s_i])$ lies in an evenly covered open arc; on each piece, $p$ restricted to the interval containing $\tilde\gamma(s_{i-1})$ is a homeomorphism, and one takes the inverse piece by piece. Uniqueness follows from "if two lifts agree at one point, they agree on a connected neighbourhood".

Define the winding number (degree) of a loop $\gamma$ as

$$\deg(\gamma)=\tilde\gamma(1)-\tilde\gamma(0)\in\mathbb{Z}.$$

Here $\tilde\gamma(1)$ and $\tilde\gamma(0)$ are both preimages of $1$, so the difference is an integer. The definition does not depend on the choice of starting point for the lift: choosing another starting point $s_0+k$ adds $k$ to both endpoints, leaving the difference unchanged.

Homotopy invariance: let $H$ be a homotopy of $\gamma$ to $\delta$ fixing the endpoints. Lift $H$ to $\tilde H:[0,1]\times[0,1]\to\mathbb{R}$. For each $t$, $s\mapsto\tilde H(s,t)$ is a lift of $H(\cdot,t)$. In particular $\tilde H(1,t)$ and $\tilde H(0,t)$ are both preimages of $1$, so

$$t\mapsto \tilde H(1,t)-\tilde H(0,t)$$

is a continuous integer-valued function, hence constant. At $t=0$ it equals $\deg(\gamma)$ (since $s\mapsto\tilde H(s,0)$ is a lift of $\gamma$), and at $t=1$ it equals $\deg(\delta)$. The constant equals both, so

$$\deg(\gamma)=\deg(\delta).$$

Thus $\deg$ induces a map $\deg:\pi_1(S^1,1)\to\mathbb{Z}$, $[\gamma]\mapsto\deg(\gamma)$.

Homomorphism property: let $\alpha,\beta$ be loops. Lift $\alpha$ to $\tilde\alpha$ starting at $0$; then lift $\beta$ to $\tilde\beta$ starting at $\tilde\alpha(1)$. Then the concatenation $\tilde\alpha*\tilde\beta$ is a lift of $\alpha*\beta$, starting at $0$ and ending at $\tilde\beta(1)$. Hence

$$\deg(\alpha*\beta)=\tilde\beta(1)=\big(\tilde\alpha(1)-0\big)+\big(\tilde\beta(1)-\tilde\alpha(1)\big)=\deg(\alpha)+\deg(\beta).$$

Surjectivity: for any $n\in\mathbb{Z}$, the loop $\gamma_n(s)=e^{2\pi ins}$ lifts to $s\mapsto ns$, so $\deg(\gamma_n)=n$.

Injectivity: if $\deg(\gamma)=0$, the lift $\tilde\gamma$ satisfies $\tilde\gamma(1)=\tilde\gamma(0)$, i.e. $\tilde\gamma$ is a loop in $\mathbb{R}$. Since $\mathbb{R}$ is convex, $\tilde\gamma$ contracts to a constant loop by the straight-line homotopy

$$\tilde H(s,t)=(1-t)\tilde\gamma(s).$$

This is a homotopy fixing the endpoints (because $\tilde\gamma(0)=\tilde\gamma(1)$ stays fixed throughout). Composing $\tilde H$ with $p$ gives a homotopy of $\gamma$ to the constant loop fixing the endpoints. Hence $\ker(\deg)=0$.

In conclusion, $\deg$ is a group isomorphism and $\pi_1(S^1,1)\cong\mathbb{Z}$.

Comment: this proof is the prototype of the covering space method. The integer winding number is essentially "on which sheet the lifted endpoint lies". When we discuss covering spaces later we shall generalize the same argument to general coverings.

### Example 3 (Advanced: torus, figure eight and sphere)

Problem: compute $\pi_1(S^1\times S^1)$ and $\pi_1(S^1\vee S^1)$, and use the fundamental group to prove that $S^2$ is not homeomorphic to the torus.

Approach: for the torus use the covering $\mathbb{R}^2\to S^1\times S^1$; for the figure eight use van Kampen; for the sphere use van Kampen or a covering.

Solution: (1) Torus. Let $T^2=S^1\times S^1$ with the covering map

$$p:\mathbb{R}^2\to T^2,\qquad p(s,t)=(e^{2\pi is},e^{2\pi it}).$$

A lifting argument exactly analogous to Example 2 shows that homotopy classes of loops based at $(1,1)$ correspond one-to-one with endpoint displacements $(m,n)\in\mathbb{Z}^2$, and that this correspondence is a group isomorphism. Hence

$$\pi_1(T^2)\cong\mathbb{Z}^2.$$

Intuitively, $m$ is the number of turns around the hole and $n$ the number around the tube, the two directions being independent.

(2) Figure eight. Let $X=S^1\vee S^1$, the two circles meeting at a point $x_0$. Take $U$ to be the first circle together with a small arc of the second near $x_0$, and $V$ the second circle together with a small arc of the first near $x_0$. Then $U$ and $V$ are both homotopy equivalent to $S^1$, and $U\cap V$ is homotopy equivalent to a point (contractible). By van Kampen,

$$\pi_1(X)\cong\pi_1(U)*\pi_1(V)\cong\mathbb{Z}*\mathbb{Z}=F_2,$$

the free group on two generators $a,b$. It is non-abelian: define a homomorphism $\varphi:F_2\to S_3$ by $a\mapsto(12)$ and $b\mapsto(23)$. Then

$$\varphi(ab)=(12)(23)=(123),\qquad \varphi(ba)=(23)(12)=(132),$$

which are different, so $ab\ne ba$.

(3) Sphere. Write $S^2$ as the union of two open sets: $U$ the sphere minus the south pole and $V$ the sphere minus the north pole. By stereographic projection $U$ and $V$ are both homeomorphic to $\mathbb{R}^2$, so their fundamental groups are trivial; their intersection is the sphere minus both poles, homotopy equivalent to $S^1$ and path connected. By van Kampen,

$$\pi_1(S^2)\cong 0*_{\mathbb{Z}}0=0.$$

(4) Distinguishing them. If $S^2$ and $T^2$ were homeomorphic, their fundamental groups would be isomorphic. But $\pi_1(S^2)=0$ while $\pi_1(T^2)=\mathbb{Z}^2\ne0$, a contradiction. Hence they are not homeomorphic.

Comment: this example shows two uses of the fundamental group: computing it (torus, figure eight) and using it to disprove homeomorphism (sphere versus torus). Note that the fundamental group of the figure eight is non-abelian while its abelianization is $\mathbb{Z}^2$—exactly the information that the homology group $H_1$ discards.

## VI. Common Errors and Pitfalls

- Error: thinking the fundamental group is always abelian. Correction: the figure eight has fundamental group the free group $F_2$, which is non-abelian; only the abelianized $H_1$ is abelian.
- Error: treating fundamental groups at different base points as different groups. Correction: in a path connected space they are isomorphic and one usually assumes a common point; but the isomorphism depends on the path and is not canonical.
- Error: thinking an isomorphism of $\pi_1$ implies homeomorphism. Correction: the fundamental group is only a topological invariant, not a complete invariant; $S^2$ and $S^3$ are both simply connected but not homeomorphic.
- Error: confusing based homotopy with free homotopy. Correction: free homotopy gives conjugacy classes, not a group; the fundamental group must fix the endpoints.
- Error: thinking $\pi_1=0$ implies contractible. Correction: $S^2$ is simply connected but not contractible; its second homology group is non-zero.
- Error: taking $H_1$ and $\pi_1$ to be the same thing. Correction: $H_1$ is the abelianization of $\pi_1$; for the figure eight $\pi_1=F_2$ but $H_1=\mathbb{Z}^2$.
- Error: understanding the inverse as the negative of a point. Correction: points in a space have no addition; the inverse means walking the loop backwards, $[\alpha]^{-1}=[\bar\alpha]$.
- Error: getting the order of concatenation backwards. Correction: $[\alpha][\beta]$ means walk $\alpha$ first and then $\beta$; some textbooks use the opposite convention, so check the formula before reading.
- Error: thinking $\pi_1(S^1\vee S^1)=\mathbb{Z}^2$. Correction: $\mathbb{Z}^2$ is abelian whereas the figure eight is not; the correct answer is $F_2$, whose abelianization is $\mathbb{Z}^2$.

## VII. Summary and Mnemonics

Key points:

- the fundamental group consists of homotopy classes of loops with head-to-tail concatenation as the operation; the identity is the constant loop and the inverse the reversed loop;
- changing the base point gives an isomorphism, and in path connected spaces the groups at different base points are isomorphic;
- $\pi_1(S^1)\cong\mathbb{Z}$, the winding number given by the endpoint displacement of the lift through a covering;
- van Kampen: the group of a space equals the amalgamated free product of the groups of two pieces over their intersection;
- $\pi_1(T^2)=\mathbb{Z}^2$, $\pi_1(S^1\vee S^1)=F_2$ (non-abelian), $\pi_1(S^2)=0$;
- the fundamental group is a homeomorphism invariant and can be used to prove that spaces are not homeomorphic.

Mnemonic: **"Loops in homotopy classes, head to tail in a queue; count the windings round the holes, the group keeps the tally true."**

`,
  },

  'continuous-maps': {
    chapter: 'Chapter 2 Continuous Maps and Quotient Spaces',
    title: 'Continuous Maps, Homeomorphisms and Quotient Spaces',
    summary:
      'Continuity rests on open sets rather than distance; a homeomorphism is the equality of topology; quotient spaces glue equivalence classes together to create new worlds.',
    keyPoints: [
      'Continuous = the preimage of an open set is open (equivalently, preimages of closed sets are closed, preimages of base elements are open)',
      'A homeomorphism is topological equivalence: a bijection continuous in both directions',
      'Quotient topology: U is open ⟺ its preimage under the projection is open; gluing constructs the Möbius band',
      'Pasting lemma: continuity on a closed (or open) cover implies global continuity',
    ],
    content: String.raw`

In the previous chapter we defined topological spaces using open sets. Now a natural question arises: how does one express that two topological spaces correspond to each other without tearing? That is a continuous map. Furthermore, if two spaces can be matched by a continuous bijection whose inverse is also continuous, topology regards them as the same—this is a homeomorphism, the equals sign of topology.

Introduction: roll a sheet of paper into a cylinder; the points on the sheet correspond one-to-one with the points on the cylinder and the neighbourhood relations are not destroyed. This correspondence is continuous, invertible, and has a continuous inverse—so the flat strip and the cylinder are homeomorphic. But the strip and the sphere are not homeomorphic, because the cylinder can still be flattened while the sphere cannot. Quotient spaces go further: glue certain points into one, producing marvellous shapes such as the Möbius band and the torus. This chapter is the basis for how properties such as connectedness and compactness are carried along by maps.

In fact a continuous map is like a fidelity-preserving delivery van in the topological world: it carries compactness to compactness, connectedness to connectedness, and the complementary information of open sets (closed sets) to closed sets. Master continuity and homeomorphism and you hold the key to deciding whether different spaces are essentially the same; master quotient spaces and you can personally manufacture complicated topological monsters from simple spaces.

## II. Rigorous Definitions

**Definition (continuity at a point)**. Let $f:X\to Y$ and $x_0\in X$. $f$ is continuous at $x_0$ if for every neighbourhood $V$ of $f(x_0)$ the preimage $f^{-1}(V)$ is a neighbourhood of $x_0$. In terms of open sets: for every open set $V$ containing $f(x_0)$ there is an open set $U$ containing $x_0$ with $f(U)\subset V$.

**Definition (continuous map)**. $f:X\to Y$ is continuous if for every open set $V$ in $Y$, $f^{-1}(V)$ is open in $X$. Equivalent conditions:

- for every closed set $F$ in $Y$, $f^{-1}(F)$ is closed in $X$;
- for every member $B$ of some base $\mathcal{B}$ of $Y$, $f^{-1}(B)$ is open;
- for every member $S$ of some subbase of $Y$, $f^{-1}(S)$ is open;
- for every $A\subset X$, $f(\overline{A})\subset\overline{f(A)}$.

In a metric space this is equivalent to the $\varepsilon-\delta$ definition: for every $\varepsilon>0$ there is $\delta>0$ such that $d_X(x,x_0)<\delta$ implies $d_Y(f(x),f(x_0))<\varepsilon$.

**Definition (homeomorphism and embedding)**. If $f:X\to Y$ is a bijection and both $f$ and $f^{-1}$ are continuous, $f$ is a homeomorphism and $X$ is homeomorphic to $Y$, written $X\cong Y$. If $f:X\to Y$ is a continuous injection and $f$ is a homeomorphism from $X$ onto its image $f(X)$ (with the subspace topology), $f$ is an embedding.

**Definition (topological property)**. A property depending only on the topological structure and preserved by homeomorphisms is called a topological property, for example compactness, connectedness, Hausdorffness, countability and path connectedness. Boundedness, curvature and distance are not topological properties.

**Definition (quotient topology and quotient map)**. Let $q:X\to Y$ be a surjection. The quotient topology on $Y$ is defined by

$$\mathcal{T}_Y=\{U\subset Y: q^{-1}(U)\in\mathcal{T}_X\},$$

and $q$ is then called a quotient map. Equivalently, $q$ is continuous and surjective, and for any $U\subset Y$, $U$ is open if and only if $q^{-1}(U)$ is open. A quotient map need not be open or closed.

**Definition (saturated set)**. $A\subset X$ is $q$-saturated if $A=q^{-1}(q(A))$, i.e. $A$ is a union of whole fibres. $q$ is a quotient map if and only if $q$ is continuous and maps every saturated open set to an open set (equivalently, every saturated closed set to a closed set).

**Universal property of quotient spaces**. If $q:X\to Y$ is a quotient map and $f:X\to Z$ is continuous and constant on each fibre (i.e. $q(x)=q(x')$ implies $f(x)=f(x')$), then there is a unique continuous $\bar f:Y\to Z$ with $\bar f\circ q=f$. This is the only correct way to construct maps out of a quotient space: first define the map upstairs, then check that it is compatible with the fibres.

**Pasting lemma**. Let $X=A\cup B$ with $A,B$ both closed (or both open), and let $f:A\to Y$ and $g:B\to Y$ be continuous and agree on $A\cap B$. Then $f\cup g:X\to Y$ is continuous.

**Common quotient constructions**:

- $[0,1]/(0\sim1)\cong S^1$: glue the two ends of a segment;
- $[0,1]^2/(0,y)\sim(1,y)$: glue the left and right sides of a square in the same direction, giving a cylinder;
- $[0,1]^2/(0,y)\sim(1,1-y)$: glue in the opposite direction, giving the Möbius band;
- gluing the two pairs of opposite sides of $[0,1]^2$ in the same directions gives the torus;
- $S^2/(x\sim -x)\cong\mathbb{R}P^2$: glue antipodal points, giving the real projective plane;
- $\mathbb{R}/\mathbb{Z}\cong S^1$: reduce the reals modulo the integers.

## III. Why These Definitions

**Why preimages rather than images?** Continuity means nearby points map to nearby points. If $f(x)$ lies in an open set $V$, then $x$ must come from $f^{-1}(V)$; requiring this preimage to be open is exactly requiring that $x$ have some room to move. Conversely, requiring images of open sets to be open rules out many continuous maps. For example $f(x)=x^2$ is continuous, but $f((-1,1))=[0,1)$ is not open.

Counterexample: the identity from the real line (usual topology) to the real line (discrete topology) maps every open set to an open set (all sets are open in the discrete space), yet is not continuous, because the preimage of the singleton $\{0\}$ is not open in the usual topology. This shows that being an open map and being continuous are two independent things.

**Why must a homeomorphism have a continuous inverse?** Because identical structure must be two-way. A continuous bijection may squash a space: $f:[0,2\pi)\to S^1$, $f(t)=e^{it}$, is a continuous bijection, but its inverse is discontinuous at $1$. $[0,2\pi)$ has a cut and $S^1$ does not; the topological structures differ. So continuity in both directions is required.

An important sufficient condition: if $f:X\to Y$ is a continuous bijection with $X$ compact and $Y$ Hausdorff, then $f$ is a homeomorphism. Proof: it suffices to show $f$ is closed. Let $F\subset X$ be closed; then $F$ is compact (a closed subset of a compact space is compact), $f(F)$ is compact (a continuous image of a compact set is compact), and a compact subset of a Hausdorff space is closed, so $f(F)$ is closed. A bijective closed map has a continuous inverse. This theorem is extremely useful when constructing homeomorphisms.

**Why is the quotient topology defined as the finest one?** For the quotient map $q:X\to Y$ to be continuous, an open set $U$ in $Y$ must have $q^{-1}(U)$ open. Gathering all $U$ satisfying this into the topology gives the finest topology making $q$ continuous. Any finer and $q$ would fail to be continuous; any coarser and the open sets that the quotient space ought to have would be lost. This finest choice is exactly what makes the universal property hold: any continuous map constant on fibres factors through $q$.

**Why need a quotient map be neither open nor closed?** The quotient topology cares only about saturated sets. If an open set does not contain whole fibres, its image may not be open. Counterexample: let $X=[0,1]$, $A=\{0\}\cup\{1/n:n\ge1\}$, and let $Y=X/A$ be the quotient obtained by collapsing $A$ to a point, with $q:X\to Y$ the quotient map. Take $U=[0,1/2)$, which is open in $X$. But

$$q^{-1}(q(U))=U\cup A=[0,1/2]\cup\{1\},$$

which is not open in $[0,1]$ ($1/2$ is not an interior point), so $q(U)$ is not open. Hence $q$ is not an open map.

**Why can a quotient space destroy Hausdorffness?** Because gluing may force originally separated points to be identified. Counterexample: on $\mathbb{R}$ take the quotient by $x\sim y$ iff $x-y\in\mathbb{Q}$, giving $\mathbb{R}/\mathbb{Q}$. Let $U\subset\mathbb{R}/\mathbb{Q}$ be non-empty and open; then $\pi^{-1}(U)$ is non-empty open in $\mathbb{R}$ and invariant under rational translations. It contains an interval $(a,b)$, hence contains $(a,b)+q$ for every $q\in\mathbb{Q}$; and $\bigcup_{q\in\mathbb{Q}}((a,b)+q)=\mathbb{R}$ (for any $x$, take $q\in\mathbb{Q}\cap(x-b,x-a)$, then $x-q\in(a,b)$). So $\pi^{-1}(U)=\mathbb{R}$, i.e. $U$ is the whole quotient space. Thus $\mathbb{R}/\mathbb{Q}$ has only two open sets, the empty set and the whole space; it is an indiscrete space and not even $T_1$. This shows that taking a quotient can crush a very good space into the blurriest one.

**Why does the pasting lemma need a closed or open cover?** If $A,B$ are neither closed nor open, local continuity need not paste into global continuity. For example on $\mathbb{R}$ let $A=\mathbb{Q}$ and $B=\mathbb{R}\setminus\mathbb{Q}$, with $f=0$ on $A$ and $f=1$ on $B$; they agree on $A\cap B=\varnothing$, but $f$ is not continuous. A closed (or open) cover guarantees that closedness (or openness) of the preimages can be pasted together.

## IV. Intuition and Pictures

> Intuition: a continuous map is a rubber deformation without tearing; a homeomorphism is a two-way rubber deformation; a quotient space is the craft of gluing equivalent points into one.

| Operation | Result |
|---|---|
| glue the two ends of a segment | circle $S^1$ |
| glue one pair of opposite sides of a square in the same direction | cylinder |
| glue one pair in opposite directions | Möbius band |
| glue both pairs suitably | torus or Klein bottle |
| glue antipodal points of a sphere | real projective plane |
| reduce the reals modulo the integers | circle |

> Think again about gluing in quotient spaces: you can regard a square as a sheet of rubber, tape the left side to the right to get a cylinder; then tape the top and bottom in opposite directions, twisting the tape half a turn, to get a Möbius band with only one side and one edge. These constructions all rely on the quotient topology, whose core rule is a single sentence: if the preimage under the projection is open, the set in the quotient space is open.

| Property | Preserved by continuous maps? | Preserved by quotient maps? |
|---|---|---|
| compactness | yes (image compact) | yes (quotient maps are continuous surjections) |
| connectedness | yes | yes |
| path connectedness | yes | yes |
| Hausdorffness | not necessarily | not necessarily |
| first countability | not necessarily | not necessarily |
| local compactness | not necessarily | not necessarily |

## V. Worked Examples

### Example 1 (Basic: $x^2$ is continuous but not an open map)

Problem: prove that $f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2$, is continuous, and show that it is not an open map.

Approach: verify continuity with preimages of open sets; find an open set whose image is not open.

Solution: take any open interval $(a,b)$ and compute its preimage.

- if $b\le0$, then $f^{-1}((a,b))=\varnothing$;
- if $a<0<b$, then $f^{-1}((a,b))=(-\sqrt{b},\sqrt{b})$;
- if $0\le a<b$, then $f^{-1}((a,b))=(-\sqrt{b},-\sqrt{a})\cup(\sqrt{a},\sqrt{b})$.

All three cases are open. Any open set is a union of open intervals, and preimages commute with unions, so the preimage of any open set is open and $f$ is continuous.

But $f((-1,1))=[0,1)$, which is not open in $\mathbb{R}$ ($0$ is not an interior point). So $f$ is not an open map.

Comment: continuity and being an open map are independent notions. $x^2$ folds an open interval, and the endpoint $0$ is pushed onto the boundary, so the image ceases to be open.

### Example 2 (Intermediate: $[0,1]/(0\sim1)\cong S^1$)

Problem: prove that the quotient space obtained by gluing the two ends of $[0,1]$ is homeomorphic to the circle $S^1$.

Approach: construct a quotient map and use the fact that a continuous bijection from a compact space to a Hausdorff space is a homeomorphism.

Solution: let $q:[0,1]\to S^1$, $q(t)=e^{2\pi it}$. $q$ is continuous and surjective, and $q(s)=q(t)$ if and only if $s-t\in\mathbb{Z}$. In $[0,1]$ this is equivalent to $s=t$ or $\{s,t\}=\{0,1\}$. So the fibres of $q$ are exactly the equivalence classes of the relation $0\sim1$.

Let $Y=[0,1]/(0\sim1)$ and let $\pi:[0,1]\to Y$ be the quotient map. By the universal property there is a continuous map $\bar q:Y\to S^1$ with $\bar q\circ\pi=q$. Concretely, $\bar q([t])=q(t)$, well defined because $q$ is constant on equivalence classes.

$\bar q$ is a bijection: surjectivity follows from that of $q$; if $\bar q([s])=\bar q([t])$ then $q(s)=q(t)$, so $s=t$ or $\{s,t\}=\{0,1\}$, i.e. $[s]=[t]$.

$Y$ is compact: it is the image of the compact space $[0,1]$ under the continuous surjection $\pi$. $S^1$ is Hausdorff: it is a subspace of $\mathbb{R}^2$. A continuous bijection from a compact space to a Hausdorff space is a homeomorphism, so $\bar q$ is a homeomorphism and $Y\cong S^1$.

Comment: the key is not to write down a formula for the inverse, but to obtain the continuity of the inverse automatically from compactness plus Hausdorffness. This is the most common recipe for constructing homeomorphisms.

### Example 3 (Advanced: gluing a square into a torus)

Problem: prove that the quotient of $[0,1]^2$ by the equivalence relation

$$(0,y)\sim(1,y),\qquad (x,0)\sim(x,1),\qquad 0\le x,y\le1$$

is homeomorphic to the torus $T^2=S^1\times S^1$.

Approach: construct the quotient map $q(x,y)=(e^{2\pi ix},e^{2\pi iy})$ and apply the compact-to-Hausdorff theorem.

Solution: let $q:[0,1]^2\to T^2$, $q(x,y)=(e^{2\pi ix},e^{2\pi iy})$. $q$ is continuous and surjective. $q(x,y)=q(x',y')$ if and only if $x-x'\in\mathbb{Z}$ and $y-y'\in\mathbb{Z}$. In $[0,1]$ this is equivalent to $x=x'$ or $\{x,x'\}=\{0,1\}$, and $y=y'$ or $\{y,y'\}=\{0,1\}$. This is exactly the equivalence relation above (including the identification of the four corners).

Let $Y=[0,1]^2/\sim$ and $\pi$ the quotient map. The universal property gives a continuous bijection $\bar q:Y\to T^2$. $Y$ is a continuous image of the compact space $[0,1]^2$, hence compact; $T^2$ is a subspace of $\mathbb{R}^4$, hence Hausdorff. Thus $\bar q$ is a homeomorphism and $Y\cong T^2$.

If the top/bottom and left/right gluings are instead reversed, i.e. $(0,y)\sim(1,1-y)$ and $(x,0)\sim(1-x,1)$, the resulting quotient space is the Klein bottle, which cannot be embedded in $\mathbb{R}^3$ and cannot be written as a product of two circles like the torus. The choice of direction determines the result of gluing, and this is the easiest place to go wrong in quotient constructions.

Comment: this example shows that a quotient space can turn a flat square into a curved torus. Note that the topology of the torus (one hole) is not inherited from the square but created by the gluing.

## VI. Common Errors and Pitfalls

- Error: thinking a continuous map necessarily sends open sets to open sets. Correction: continuity is about preimages; open maps are about images, and the two are independent. $x^2$ is continuous but not an open map.
- Error: taking a continuous bijection for a homeomorphism. Correction: the inverse must also be continuous; $[0,2\pi)\to S^1$ is a counterexample.
- Error: thinking the quotient topology is just any topology assigned to the quotient set. Correction: it is the finest topology making the projection continuous, uniquely determined by the condition that preimages are open.
- Error: thinking a quotient space necessarily inherits the Hausdorffness of the original space. Correction: $\mathbb{R}/\mathbb{Q}$ is indiscrete and not even $T_1$.
- Error: thinking a quotient map must be an open map. Correction: the quotient map that collapses a convergent sequence to a point is not open.
- Error: forgetting to check that a map is constant on fibres when using the universal property. Correction: this is the key to well-definedness; without it one obtains a map that does not exist.
- Error: using the pasting lemma on an arbitrary cover. Correction: a closed or open cover is needed; the partition into rationals and irrationals is a counterexample.
- Error: thinking homeomorphisms preserve distance, angles or curvature. Correction: homeomorphisms preserve only topological properties; stretching a circle into an ellipse is still a homeomorphism, but the curvature changes.
- Error: confusing the subspace topology with the quotient topology. Correction: a subspace takes intersections with a smaller set, a quotient crushes onto equivalence classes; the directions are opposite.

## VII. Summary and Mnemonics

Key points:

- continuity is equivalent to "preimages of open sets are open", and also to "preimages of closed sets are closed" and "preimages of base elements are open";
- a homeomorphism is a bijection continuous in both directions; a continuous bijection from a compact space to a Hausdorff space is automatically a homeomorphism;
- the quotient topology is the finest topology making the projection continuous, with $U$ open iff $q^{-1}(U)$ is open;
- universal property: a continuous map constant on fibres factors through the quotient map;
- pasting lemma: local continuity on a closed (or open) cover pastes into global continuity;
- quotient operations may destroy Hausdorffness, countability and other properties.

Mnemonic: **"Continuity looks at preimages, homeomorphisms run both ways; quotient topologies glue, universal properties fix the map."**

`,
  },
  'separation-axioms': {
    chapter: 'Chapter 3 Separation Axioms',
    title: 'Separation Axioms and Countability',
    summary:
      'In a Hausdorff space limits are unique; T0 to T4 separate points and closed sets step by step; countability constrains how dense the "small neighbourhoods" are.',
    keyPoints: [
      'T1: singletons are closed; T2 (Hausdorff): two points have disjoint neighbourhoods, so limits are unique',
      'T3 (regular + T1), T4 (normal + T1): separate a point from a closed set, or two closed sets, by open sets',
      'Countability: first countable (each point has a countable neighbourhood base), second countable (a countable base, ⟹ first countable, ⟹ separable)',
      'Urysohn lemma: in a normal space any two closed sets can be separated by a continuous function',
    ],
    content: String.raw`

With a topology in hand, can we distinguish how close points are to one another? On the usual real line any two points can be separated by disjoint open intervals; but in some exotic topologies two points cannot be separated at all. The levels of separability are exactly the separation axioms.

Introduction: why are limits always unique in real analysis? Because the real line is Hausdorff—two distinct points each have their own territory, which do not trespass on each other. If the space is not Hausdorff, a sequence may head for two different limits at once. Separation axioms impose rules on spaces, while countability constrains whether the small neighbourhoods are dense enough (for example whether countably many small neighbourhoods can approach every point), and this decides whether sequences suffice to describe convergence instead of nets.

In other words, separation and countability together determine how much the space resembles the Euclidean spaces we know—the closer to $T_4$ and second countable, the smoother the tools of analysis; the more exotic the space, the more careful one must be about traps in limits and continuity.

## II. Rigorous Definitions

**Separation axioms**. Let $X$ be a topological space.

- $T_0$ (Kolmogorov): for any two distinct points $x\ne y$, there is at least one open set containing one of them but not the other.
- $T_1$: for any two distinct points $x\ne y$, each has an open neighbourhood not containing the other. Equivalently: every singleton $\{x\}$ is closed; equivalently: for each $x$, the intersection of all open sets containing $x$ is $\{x\}$.
- $T_2$ (Hausdorff): any two distinct points have disjoint open neighbourhoods.
- $T_3$ (regular): $T_1$ holds and for any point $x$ and closed set $F$ not containing $x$, there are disjoint open sets $U\ni x$ and $V\supset F$.
- $T_{3\frac12}$ (Tychonoff): $T_1$ holds and for any point $x$ and closed set $F$ not containing $x$, there is a continuous function $f:X\to[0,1]$ with $f(x)=0$ and $f|_F=1$.
- $T_4$ (normal): $T_1$ holds and for any two disjoint closed sets $A,B$ there are disjoint open sets $U\supset A$ and $V\supset B$.

Note: some textbooks define regularity and normality as separation properties without $T_1$, and call the versions including $T_1$ by $T_3$ and $T_4$. This topic follows the latter convention: $T_3$ and $T_4$ include $T_1$ by default. Without $T_1$, regularity and normality may become vacuous (for example in the indiscrete topology), so $T_1$ is a necessary foundation.

**Countability axioms**.

- First countable: each point has a countable neighbourhood base, i.e. there is a countable family $\{U_n\}$ such that every open set containing $x$ contains some $U_n$.
- Second countable: the topology has a countable base, i.e. there is a countable family $\mathcal{B}$ such that every open set is a union of members of $\mathcal{B}$.
- Separable: there is a countable dense subset $D$, i.e. $\overline{D}=X$.
- Lindelöf: every open cover has a countable subcover.

**Basic relations**:

- second countable implies first countable, separable and Lindelöf;
- in a metric space, second countable, separable and Lindelöf are equivalent;
- metric spaces are first countable, normal and paracompact;
- compact Hausdorff spaces are normal;
- regular plus Lindelöf implies normal;
- second countable plus regular implies normal, hence metrizable (the Urysohn metrization theorem);
- $T_4$ implies $T_3$ implies $T_2$ implies $T_1$ implies $T_0$, but the converse implications generally fail.

**Urysohn lemma**. If $X$ is normal and $A,B$ are disjoint closed sets, then there is a continuous function $f:X\to[0,1]$ with $f|_A=0$ and $f|_B=1$.

**Tietze extension theorem**. If $X$ is normal, $A\subset X$ is closed and $f:A\to[a,b]$ is continuous, then $f$ extends to a continuous function $F:X\to[a,b]$.

## III. Why These Definitions

**Why must $T_3$ and $T_4$ come after $T_1$?** Because regularity and normality speak only of separating a point from a closed set, or two closed sets, and without requiring singletons to be closed these conditions may be satisfied vacuously. Counterexample: in the indiscrete topology (only the empty set and the whole space open) the only closed sets are the empty set and the whole space. For any point $x$ and any closed set $F$ not containing $x$, necessarily $F=\varnothing$, and $U=X$, $V=\varnothing$ separates them. So the indiscrete topology is regular in the weak sense yet not even $T_0$. With $T_1$ added, singletons are closed, and regularity and normality acquire real content.

**Why is Hausdorffness so important?** It guarantees uniqueness of limits. Proof: suppose $x_n\to x$ and $x_n\to y$ with $x\ne y$. Take disjoint open neighbourhoods $U\ni x$ and $V\ni y$. There is $N_1$ with $x_n\in U$ for $n>N_1$ and $N_2$ with $x_n\in V$ for $n>N_2$. For $n>\max\{N_1,N_2\}$ we get $x_n\in U\cap V=\varnothing$, a contradiction. Hence limits are unique. This is why all of analysis assumes Hausdorffness.

**Why is $T_1$ not enough?** Counterexample: the cofinite topology on an infinite set $X$. Singletons are closed (their complements are open), so $T_1$ holds. But any two non-empty open sets intersect (both complements are finite, so their union cannot be all of $X$), so no two points have disjoint open neighbourhoods and $T_2$ fails. Worse, a sequence of pairwise distinct terms converges to every point, so limits are utterly non-unique. This shows the gulf between $T_1$ and $T_2$ can be very wide.

**Why is normality important?** Because normality upgrades the separation of closed sets to separation by continuous functions—that is Urysohn's lemma. With continuous functions one can construct partitions of unity, extend maps and prove metrization theorems. Part of why metric spaces are so convenient is that they are automatically normal. Conversely, normality does not imply metrizability: the Sorgenfrey line is normal yet not second countable, hence not metrizable.

**Why is second countability stronger than separability?** Second countability gives a countable base, which can be used to embed, extract subcovers and build countable dense sets. Separability gives only a countable dense subset, much less information. Counterexample: the Sorgenfrey line is separable (the rationals are dense) but every base must be uncountable, so it is not second countable. In a metric space, separability implies second countability (take rational-radius balls around a countable dense set as a base), so the two are equivalent; in general topological spaces they are not.

**Why is Lindelöf needed?** The Lindelöf property compresses an arbitrary open cover into a countable one, a further level of compression from the infinite to the countable. Compactness compresses the infinite to the finite; Lindelöf to the countable. Regular plus Lindelöf gives normal, a common shortcut for proving normality.

**Counterexample: normality is not hereditary.** A subspace of a normal space need not be normal; a product of normal spaces need not be normal. The Sorgenfrey line is normal, but the Sorgenfrey plane (the product of two Sorgenfrey lines) is not. This shows that separation axioms are not always preserved under subspaces and products, and care is needed in using them.

## IV. Intuition and Pictures

| Axiom | What it separates | Typical spaces |
|---|---|---|
| $T_0$ | at least one side has territory | Sierpiński space |
| $T_1$ | singletons closed | cofinite topology |
| $T_2$ | two points have disjoint neighbourhoods | $\mathbb{R}^n$, metric spaces |
| $T_3$ | a point from a closed set | metric spaces, compact Hausdorff |
| $T_{3\frac12}$ | a point from a closed set by a continuous function | metric spaces |
| $T_4$ | two closed sets | metric spaces, compact Hausdorff |

> Intuition: the axioms add locks level by level. $T_0$ can separate just one thing, $T_1$ can shut each point into its own closure, $T_2$ gives two points disjoint territories, $T_3$ separates a point from a closed set, $T_4$ separates two closed sets.

| Countability | Meaning | Strength |
|---|---|---|
| first countable | each point has a countable neighbourhood base | local, weak |
| second countable | has a countable base | global, strong |
| separable | has a countable dense subset | global, weak |
| Lindelöf | every open cover has a countable subcover | global, medium |

> Intuition: countability is like the density of a net over the space. A second countable space can be covered by countably many nets, so that sequential convergence suffices to describe the topology; this is also the basis of separability and of separable metrics. Separation axioms govern whether things can be pulled apart, countability whether they can be covered; only together do they keep the intuition of calculus valid in general spaces.

> More intuitively still: Hausdorff means two quarrelling people each have a room; regular means a person and a wall can be separated; normal means two walls can be separated. Countability is whether the number of rooms is small enough—small enough to describe in countably many ways.

## V. Worked Examples

### Example 1 (Basic: the cofinite topology is $T_1$ but not $T_2$)

Problem: let $X$ be an infinite set with the cofinite topology. Prove that $X$ is $T_1$ but not $T_2$, and show that limits are not unique.

Approach: the complement of a singleton is finite hence open; any two non-empty open sets must intersect.

Solution: (1) For any $x\in X$, the complement of $X\setminus\{x\}$ is $\{x\}$, which is finite, so $X\setminus\{x\}$ is open. Hence $\{x\}$ is closed and $X$ is $T_1$.

(2) Let $U,V$ be non-empty and open. Then $X\setminus U$ and $X\setminus V$ are finite, so

$$X\setminus(U\cap V)=(X\setminus U)\cup(X\setminus V)$$

is finite. Since $X$ is infinite, $X\setminus(U\cap V)\ne X$, so $U\cap V\ne\varnothing$. Hence there are no two disjoint non-empty open sets and $X$ is not $T_2$.

(3) Take a sequence $(x_n)$ of pairwise distinct points of $X$. For any $x\in X$ and any open set $U$ containing $x$, $F=X\setminus U$ is finite, so only finitely many $n$ have $x_n\in F$. Thus there is $N$ with $x_n\in U$ for $n>N$. So $x_n\to x$. Since $x$ was arbitrary, the sequence converges to every point at once, and limits are not unique.

Comment: this example shows that $T_1$ guarantees only that singletons are closed, not that points can be separated by open sets. $T_2$ is the minimum requirement for unique limits.

### Example 2 (Intermediate: every metric space is normal)

Problem: prove that every metric space $(X,d)$ is normal, and construct a Urysohn function.

Approach: use the distance function $d(x,A)$ to build a function that passes continuously from $0$ to $1$.

Solution: let $A,B$ be disjoint closed sets. For any $x$ let

$$d(x,A)=\inf\{d(x,a):a\in A\}.$$

First two facts. First, $d(x,A)$ is $1$-Lipschitz:

$$\lvert d(x,A)-d(y,A)\rvert\le d(x,y),$$

hence continuous. Second, $d(x,A)=0$ if and only if $x\in\overline{A}$; since $A$ is closed this is equivalent to $x\in A$.

Define

$$f(x)=\frac{d(x,A)}{d(x,A)+d(x,B)}.$$

The denominator is always positive: if $d(x,A)+d(x,B)=0$ then $x\in A$ and $x\in B$, contradicting $A\cap B=\varnothing$. So $f$ is a quotient of continuous functions, hence continuous, with $0\le f\le1$. For $x\in A$, $d(x,A)=0$ so $f(x)=0$; for $x\in B$, $d(x,B)=0$ so $f(x)=1$.

Let

$$U=f^{-1}\left(\left[0,\frac13\right)\right),\qquad V=f^{-1}\left(\left(\frac23,1\right]\right).$$

These are preimages of open sets of $[0,1]$, hence open in $X$; they are disjoint; $A\subset U$ and $B\subset V$. So $X$ is normal. This $f$ is an explicit construction of the function guaranteed by Urysohn's lemma.

Comment: this proof is the quantitative version: normality not only separates closed sets but can do so quantitatively with a continuous function. Almost all separation properties of metric spaces can be constructed explicitly using distance functions.

### Example 3 (Advanced: the Sorgenfrey line is separable and first countable but not second countable)

Problem: on $\mathbb{R}$ take the topology $\mathcal{T}_S$ generated by $\{[a,b):a<b\}$. Prove that it is first countable and separable but not second countable.

Approach: first countability uses $[x,x+1/n)$ as a local base; separability uses the rationals; failure of second countability uses the fact that each $x$ needs its own distinct base element.

Solution: (1) First countable. For fixed $x$, the family $\{[x,x+1/n):n\ge1\}$ is a countable local base at $x$. Take any open set $U$ containing $x$; by the definition of a base there is a base element $[x,b)\subset U$ (since $U$ is a union of base elements, the one containing $x$ must be of the form $[x,b)$). Take $n>1/(b-x)$; then

$$[x,x+1/n)\subset[x,b)\subset U.$$

So the space is first countable.

(2) Separable. Show that $\mathbb{Q}$ is dense. Take any non-empty open set $U$; it contains a base element $[a,b)$. By the density of the rationals there is $q\in\mathbb{Q}\cap[a,b)$, so $q\in U$. Thus $\mathbb{Q}$ meets every non-empty open set, $\overline{\mathbb{Q}}=\mathbb{R}$, and the space is separable.

(3) Not second countable. Suppose $\mathcal{B}$ is a countable base. For each $x\in\mathbb{R}$, $[x,x+1)$ is open, so there is $B_x\in\mathcal{B}$ with

$$x\in B_x\subset[x,x+1).$$

Since $B_x$ is a base element it is of the form $[a,b)$. From $x\in[a,b)\subset[x,x+1)$ we get $a\le x$ and $a\ge x$, so $a=x$, i.e. $B_x=[x,b)$ and hence $\inf B_x=x$. If $x\ne y$ then $\inf B_x=x\ne y=\inf B_y$, so $B_x\ne B_y$. Thus $x\mapsto B_x$ is an injection from $\mathbb{R}$ into $\mathcal{B}$, but $\mathbb{R}$ is uncountable and $\mathcal{B}$ countable, a contradiction. So no countable base exists.

Comment: the Sorgenfrey line is the standard example of a separable space that is not second countable. It shows that in general topological spaces separability does not imply second countability; the two are equivalent only in metric spaces. It is also normal yet not metrizable, since metrizable plus separable would imply second countable.

## VI. Common Errors and Pitfalls

- Error: thinking $T_1$ implies Hausdorff. Correction: the cofinite topology on an infinite set is $T_1$ but not $T_2$.
- Error: thinking normal implies metrizable. Correction: the Sorgenfrey line is normal but not metrizable; normality only guarantees that closed sets can be separated by open sets.
- Error: conflating first and second countability. Correction: second countability is stronger and implies first countability, separability and Lindelöf; the converse fails.
- Error: thinking separable implies second countable. Correction: the Sorgenfrey line is separable but not second countable; the two are equivalent only in metric spaces.
- Error: thinking unique limits need no conditions. Correction: in a non-Hausdorff space limits may be multiple; the cofinite topology is a counterexample.
- Error: taking "singletons closed" for $T_2$. Correction: $T_1$ (singletons closed) is strictly weaker than $T_2$.
- Error: thinking a subspace of a $T_4$ space must be $T_4$. Correction: normality is not hereditary; a subspace of a normal space need not be normal.
- Error: thinking the product of normal spaces must be normal. Correction: the Sorgenfrey line is normal, but its square (the Sorgenfrey plane) is not.
- Error: using Urysohn's lemma without checking normality. Correction: the lemma requires $T_4$; in a non-normal space such a continuous function may not exist.

## VII. Summary and Mnemonics

Key points:

- $T_1$: singletons closed; $T_2$ Hausdorff: two points have disjoint neighbourhoods and limits are unique;
- $T_3$ regular: a point and a closed set can be separated by open sets; $T_4$ normal: two disjoint closed sets can be separated by open sets;
- $T_4$ implies $T_3$ implies $T_2$ implies $T_1$ implies $T_0$, and the converses generally fail;
- second countable implies first countable, separable and Lindelöf; in metric spaces second countable, separable and Lindelöf are equivalent;
- metric spaces are normal; compact Hausdorff spaces are normal; regular plus Lindelöf is normal;
- Urysohn's lemma: in a normal space two closed sets can be bridged by a continuous function.

Mnemonic: **"T0 tells apart, T1 shuts points in; T2 unique limits, T3 point from closed; T4 closed from closed, by continuous transition."**

`,
  },

  'covering-spaces': {
    chapter: 'Chapter 5 Covering Spaces',
    title: 'Covering Spaces and the Lifting Theorems',
    summary:
      'A covering space is like a staircase stacked in layers; the lifting theorem "lifts" paths of the base space to the upper levels, and the winding number shows itself.',
    keyPoints: [
      'A covering map p: E→B is a local homeomorphism with discrete fibres',
      'Uniqueness of path lifting: once the starting point is fixed the lift is unique',
      'Homotopy lifting theorem: homotopies fixing the endpoints lift globally',
      'π₁(B) acts on the fibre; the universal covering corresponds to the trivial subgroup of π₁',
    ],
    content: String.raw`

Imagine a spiral staircase: viewed from directly above, every step projects onto the same floor tile—this structure, stacked layer upon layer yet coinciding when viewed from above, is a covering space. The ground floor is $B$, the whole staircase is $E$, and the projection $p$ sends you from a step back to the tile it stands on.

Introduction: the universal covering of the circle $S^1$ is the real line $\mathbb{R}$—wrap the line around the circle at integer intervals. A curve on $S^1$ winding $n$ times is lifted to $\mathbb{R}$ as an ascending path from $0$ to $n$. The covering space translates global information such as the winding number into the simple fact of where the lifted path ends, and is one of the most powerful tools for computing fundamental groups.

This chapter answers three questions: which maps count as coverings? can paths in the base space be lifted uniquely to the upper level? and, once lifted, how does the winding information become a permutation of the fibre? The answers are given respectively by the definition of a covering map, the path lifting lemma, and the subgroup theory corresponding to coverings.

## II. Rigorous Definitions

**Definition (covering map)**. A continuous surjection $p:E\to B$ is a covering map if every point $b\in B$ has an open neighbourhood $U$ (called an evenly covered neighbourhood) such that

$$p^{-1}(U)=\bigsqcup_{\alpha\in A}V_\alpha,$$

where each $V_\alpha$ is open in $E$ and $p|_{V_\alpha}:V_\alpha\to U$ is a homeomorphism. Each $V_\alpha$ is called a sheet.

**Fibre and number of sheets**. $p^{-1}(b)$ is called the fibre over $b$. If $B$ is connected the cardinality of the fibre is constant, called the number of sheets of the covering. It may be finite or infinite.

**Lift**. Given a map $f:Y\to B$, a lift of $f$ is a map $\tilde f:Y\to E$ with $p\circ\tilde f=f$. In terms of a commutative diagram, the triangle $Y\to E\to B$ agrees with $Y\to B$.

**Path lifting lemma**. Let $p:E\to B$ be a covering, $\gamma:[0,1]\to B$ a path and $e_0\in p^{-1}(\gamma(0))$. Then there is a unique path $\tilde\gamma:[0,1]\to E$ with $\tilde\gamma(0)=e_0$ and $p\circ\tilde\gamma=\gamma$.

**Homotopy lifting theorem**. Let $p:E\to B$ be a covering, $H:Y\times[0,1]\to B$ continuous, and suppose $H_0=H(\cdot,0)$ has a lift $\tilde H_0:Y\to E$. Then $H$ has a unique lift $\tilde H:Y\times[0,1]\to E$ with $\tilde H(\cdot,0)=\tilde H_0$.

**Uniqueness of lifts theorem**. Let $Y$ be connected and $f:Y\to B$ have two lifts $\tilde f_1,\tilde f_2$. If $\tilde f_1(y_0)=\tilde f_2(y_0)$ at some point $y_0$, then $\tilde f_1=\tilde f_2$.

**Covering transformation**. A covering transformation (deck transformation) of a covering $p:E\to B$ is a homeomorphism $\varphi:E\to E$ with $p\circ\varphi=p$. All covering transformations form a group $\operatorname{Deck}(p)$.

**Universal covering**. If $\tilde B$ is simply connected and $p:\tilde B\to B$ is a covering, then $p$ is called a universal covering.

**Covering correspondence**. Let $B$ be path connected, locally path connected and semi-locally simply connected. Then the connected coverings of $B$ (up to isomorphism) correspond one-to-one with the conjugacy classes of subgroups of $\pi_1(B)$. The universal covering corresponds to the trivial subgroup; an $n$-sheeted covering corresponds to a subgroup of index $n$; a regular covering corresponds to a normal subgroup, in which case the group of covering transformations is isomorphic to $N(H)/H$.

**Basic examples**:

- $p:\mathbb{R}\to S^1$, $p(t)=e^{2\pi it}$, an infinite-sheeted covering, the universal covering;
- $p_n:S^1\to S^1$, $p_n(z)=z^n$, an $n$-sheeted covering;
- $p:S^n\to\mathbb{R}P^n$, gluing antipodal points, a $2$-sheeted covering;
- $p:\mathbb{R}^2\to T^2$, $p(s,t)=(e^{2\pi is},e^{2\pi it})$, the universal covering;
- $p:S^2\to\mathbb{R}P^2$, a $2$-sheeted covering.

## III. Why These Definitions

**Why require even covering?** It guarantees that locally $E$ looks like a stack of copies of $U$, with the projection purely a stacking map and no gluing or twisting. This makes the map locally invertible, so that lifts are unique and controllable. If one required only a local homeomorphism, branch points or gluing might appear, and lifts would lose uniqueness.

Counterexample: $p:(0,2)\to S^1$, $p(t)=e^{2\pi it}$. It is a local homeomorphism but not a covering. The preimage of the point $1\in S^1$ is $\{1\}$ (since $t=0,2$ are excluded); take a small arc $U$ around $1$; then $p^{-1}(U)$ consists of three pieces: a half-open interval near $0$, an interval around $1$, and a half-open interval near $2$. The last two pieces do not both map homeomorphically onto $U$, so $1$ is not evenly covered.

Another counterexample: $p:\mathbb{C}\to\mathbb{C}$, $p(z)=z^2$. Every point other than $0$ has an evenly covered neighbourhood, but at $0$ the preimage of any neighbourhood is connected (not two disjoint copies), so $0$ is a branch point; this is not a covering but a branched covering.

**Why does path lifting need compactness?** The key to the proof is to divide $[0,1]$ into finitely many small pieces such that the image of each piece lies in some evenly covered neighbourhood. This step uses the compactness of $\gamma([0,1])$ (the Lebesgue number lemma). Without compactness one might need infinitely many pieces and the lift need not exist. For example, if the domain is replaced by $(0,1)$ or an infinite ray, some paths may fail to lift globally.

**Why does the starting point determine the lift uniquely?** Because the sheets of a covering are disjoint and a lift cannot jump from one sheet to another. Locally $p$ is a homeomorphism, so the lift is forced to follow a unique sheet; if two lifts agree at one point, their difference is a continuous function taking discrete values, hence identically zero. This is the uniqueness theorem.

**Why does the universal covering require simple connectedness?** The universal covering is the largest covering and should have no non-trivial loops. If $\tilde B$ still had a non-trivial loop, it could be covered further and would not be universal. Its existence requires the base space to be semi-locally simply connected; the Hawaiian earring fails this at the common point and therefore has no universal covering.

**Why is the fundamental group induced by a covering injective?** Let $p_*:\pi_1(E,e_0)\to\pi_1(B,b_0)$. If $p_*[\gamma]=0$, then $p\circ\gamma$ is contractible in $B$. Lifting the contracting homotopy to $E$ gives a contraction of $\gamma$ in $E$, so $[\gamma]=0$. Hence the kernel is zero and $p_*$ is injective. The fundamental group of a covering can therefore be regarded as a subgroup of that of the base.

**Lifting criterion**. Let $Y$ be path connected and locally path connected, $f:Y\to B$ continuous and $p:E\to B$ a covering. Then $f$ has a lift if and only if

$$f_*\pi_1(Y,y_0)\subset p_*\pi_1(E,e_0).$$

Necessity follows directly from functoriality: if $f=p\circ\tilde f$ then $f_*=p_*\circ\tilde f_*$, and the image naturally lies in the image of $p_*$. Sufficiency uses path lifting: for each $y\in Y$ take a path $\gamma$ from $y_0$ to $y$, lift $f\circ\gamma$ from $e_0$ to $E$, and show that the endpoint depends only on $y$ and not on $\gamma$—exactly what the subgroup condition guarantees. This criterion is the most used computational tool in covering theory: to decide whether a map lifts, compute the image of the fundamental group.

**Why is the number of sheets constant over a connected base?** For each $n$, the set $\{b\in B:\lvert p^{-1}(b)\rvert=n\}$ is both open and closed (by even covering), so on a connected base it is either empty or all of $B$. Hence the number of sheets is constant. If the base is disconnected, different components may have different numbers of sheets. If the total space is compact and the base Hausdorff, the fibres are discrete compact sets, hence finite, and the covering has finitely many sheets; conversely, in $\mathbb{R}\to S^1$ the fibres are infinite discrete sets, giving infinitely many sheets.

## IV. Intuition and Pictures

> Intuition: a covering is like a stack of pancakes—above one point of the base hang several points; walking along a path in the base means walking parallel along the corresponding sheet in $E$, which is called lifting. At a fork, the sheet you are on decides which branch you take.

| Covering | Base | Total space | Sheets | Subgroup of the fundamental group |
|---|---|---|---|---|
| exponential map | $S^1$ | $\mathbb{R}$ | infinite | $0$ |
| $z\mapsto z^n$ | $S^1$ | $S^1$ | $n$ | $n\mathbb{Z}$ |
| antipodal gluing | $\mathbb{R}P^n$ | $S^n$ | $2$ | subgroup of index $2$ |
| plane wrapping the torus | $T^2$ | $\mathbb{R}^2$ | infinite | $0$ |

> More intuitively: wrapping the line around the circle is like winding an infinitely long paper strip around a cylinder, each turn corresponding to an integer $n$. Walking from $0$ to $5$ along the line and projecting down means winding $5$ times; walking to $-3$ means winding $3$ times backwards. The number of sheets in the fibre is exactly that integer, and the fundamental group $\pi_1(S^1)\cong\mathbb{Z}$ is precisely the group of these integers.

| Statement | True or false | Explanation |
|---|---|---|
| a covering is a local homeomorphism | true | near each point it is a homeomorphism onto a sheet |
| a local homeomorphism is a covering | false | $(0,2)\to S^1$ is a local homeomorphism but not a covering |
| the fibres of a covering are discrete | true | every fibre point is isolated |
| a covering always has finitely many sheets | false | $\mathbb{R}\to S^1$ has infinitely many |
| a universal covering is one with infinitely many sheets | false | it also requires the total space to be simply connected |

## V. Worked Examples

### Example 1 (Basic: the exponential map is a covering)

Problem: prove that $p:\mathbb{R}\to S^1$, $p(t)=e^{2\pi it}$, is a covering map and find the number of sheets.

Approach: for each point take an open arc of length less than $1$ and check that its preimage is countably many disjoint intervals.

Solution: take any $z_0=e^{2\pi it_0}\in S^1$ and let

$$U=\{e^{2\pi it}:\lvert t-t_0\rvert<1/2\},$$

the open arc from $t_0-1/2$ to $t_0+1/2$. Then

$$p^{-1}(U)=\bigcup_{k\in\mathbb{Z}}\left(t_0+k-\frac12,t_0+k+\frac12\right).$$

These intervals are pairwise disjoint. On each of them $p$ is injective (the interval has length exactly one period $1$), continuous, and has image $U$, so it is a homeomorphism from that interval onto $U$. Thus $U$ is evenly covered and $p$ is a covering.

The fibre $p^{-1}(z_0)=\{t_0+k:k\in\mathbb{Z}\}$ is countably infinite, so the covering has infinitely many sheets. The total space $\mathbb{R}$ is simply connected, so this is the universal covering.

Comment: the sheets of this covering are intervals of length $1$, and the projection wraps each interval into a whole turn. The infinite number of sheets corresponds exactly to the infinitely many elements of $\pi_1(S^1)=\mathbb{Z}$.

### Example 2 (Intermediate: lifting specific paths)

Problem: let $p:\mathbb{R}\to S^1$ be as in Example 1. Find the lifts of the following paths from the specified starting points, and compute the endpoints and winding numbers:

(1) $\gamma_1(t)=e^{2\pi it^2}$, starting point $3$;
(2) $\gamma_2(t)=e^{2\pi i\sin(2\pi t)}$, starting point $0$.

Approach: guess a $\tilde\gamma$ with $p\circ\tilde\gamma=\gamma$ and then use uniqueness.

Solution: (1) Let $\tilde\gamma_1(t)=3+t^2$. Then

$$p(\tilde\gamma_1(t))=e^{2\pi i(3+t^2)}=e^{6\pi i}e^{2\pi it^2}=e^{2\pi it^2}=\gamma_1(t),$$

and $\tilde\gamma_1(0)=3$. By uniqueness this is the required lift. The endpoint is $\tilde\gamma_1(1)=4$, so

$$\deg(\gamma_1)=4-3=1.$$

(2) Let $\tilde\gamma_2(t)=\sin(2\pi t)$. Then

$$p(\tilde\gamma_2(t))=e^{2\pi i\sin(2\pi t)}=\gamma_2(t),$$

and $\tilde\gamma_2(0)=0$. This is the required lift. The endpoint is $\tilde\gamma_2(1)=\sin(2\pi)=0$, so $\deg(\gamma_2)=0$. This loop first winds one way and then the other, with net winding zero, and is indeed homotopic to the constant loop.

Comment: computing a lift usually means guessing a real-valued function whose composition with the exponential map gives the original path. Once guessed, uniqueness guarantees there is no other lift. The winding number is just the displacement of the lifted endpoint—no complicated integration is needed.

### Example 3 (Advanced: the $n$-sheeted covering and the subgroup $n\mathbb{Z}$)

Problem: let $p_n:S^1\to S^1$, $p_n(z)=z^n$ with $n\ge1$. Prove that it is an $n$-sheeted covering, find the induced homomorphism $(p_n)_*$ and the group of covering transformations, and explain the correspondence between coverings and subgroups.

Approach: choose a suitable open arc whose preimage splits into $n$ disjoint open arcs; compute the induced homomorphism from the image of a generator; the covering transformations are rotations.

Solution: (1) $p_n$ is an $n$-sheeted covering. Take any $z_0=e^{2\pi it_0}$ and let

$$U=\{e^{2\pi it}:\lvert t-t_0\rvert<1/2\},$$

then

$$p_n^{-1}(U)=\bigcup_{k=0}^{n-1}\left(\frac{t_0+k}{n}-\frac{1}{2n},\frac{t_0+k}{n}+\frac{1}{2n}\right),$$

$n$ disjoint open arcs in total. On each arc the map $z\mapsto z^n$ is continuous and injective (the argument range is exactly one period, so the endpoints do not coincide) with image $U$, hence a homeomorphism onto $U$. So $p_n$ is an $n$-sheeted covering. The fibre $p_n^{-1}(z_0)$ has exactly $n$ points, the $n$ $n$-th roots of $z_0$.

(2) Induced homomorphism. Take the generator $\gamma(t)=e^{2\pi it}$; then

$$(p_n)_*([\gamma])=[p_n\circ\gamma]=[e^{2\pi int}]=[\gamma]^n.$$

Since $\pi_1(S^1)=\mathbb{Z}$ is generated by $[\gamma]$, $(p_n)_*$ is multiplication by $n$, $\mathbb{Z}\to\mathbb{Z}$, with image $n\mathbb{Z}$. This also shows that the loop $\gamma$ of the base cannot lift to a closed loop in $S^1$, because the lift starting at $1$ is $t\mapsto e^{2\pi it/n}$, ending at $e^{2\pi i/n}\ne1$; but $\gamma^n$ does lift to a closed loop.

(3) Covering transformations. For each $k=0,1,\dots,n-1$ the rotation

$$\rho_k(z)=e^{2\pi ik/n}z$$

satisfies $p_n(\rho_k(z))=z^n=p_n(z)$, hence is a covering transformation. Conversely, if $\varphi$ is a covering transformation then $\varphi(1)$ must be a preimage of $1$, i.e. some $e^{2\pi ik/n}$; by the uniqueness of lifts, $\varphi=\rho_k$. Hence

$$\operatorname{Deck}(p_n)\cong\mathbb{Z}/n\mathbb{Z}.$$

(4) Covering correspondence. The connected coverings of $S^1$ (up to isomorphism) correspond one-to-one with the subgroups of $\mathbb{Z}$. Every subgroup has the form $m\mathbb{Z}$ with $m\ge0$; $m=0$ corresponds to the universal covering $\mathbb{R}\to S^1$, and $m\ge1$ to the $m$-sheeted covering $z\mapsto z^m$. The group of covering transformations is $\mathbb{Z}/m\mathbb{Z}$ ($m\ge1$) or $\mathbb{Z}$ ($m=0$). This correspondence is the core of covering space theory: the number of sheets is the index of the subgroup; the larger the subgroup, the smaller the covering, and the universal covering corresponds to the smallest, trivial subgroup.

Comment: this example ties together coverings, fundamental groups and covering transformations. The $n$-sheeted covering corresponds to the subgroup $n\mathbb{Z}$, the group of covering transformations is $\mathbb{Z}/n\mathbb{Z}$, and the universal covering corresponds to the trivial subgroup. Remember this table and many covering problems can be seen through at a glance.

## VI. Common Errors and Pitfalls

- Error: thinking a local homeomorphism is a covering. Correction: $(0,2)\to S^1$ is a local homeomorphism but not a covering; even covering is a stronger local condition.
- Error: taking a branched covering for a covering. Correction: $z\mapsto z^2$ on $\mathbb{C}$ has a branch point at $0$, and $0$ has no evenly covered neighbourhood.
- Error: thinking any map can be lifted. Correction: the existence of a lift needs conditions, for example $f_*\pi_1(Y)\subset p_*\pi_1(E)$ (for path connected, locally path connected $Y$).
- Error: thinking homotopy lifting needs no initial lift. Correction: the homotopy lifting theorem requires $H_0$ to already have a lift; without a starting point the lift may not exist.
- Error: thinking the number of sheets is always constant. Correction: it is constant only when the base is connected; different components may have different numbers.
- Error: equating the universal covering with an infinite-sheeted covering. Correction: the universal covering requires the total space to be simply connected; an infinite-sheeted covering need not be.
- Error: thinking the group of covering transformations always acts transitively on the fibre. Correction: only regular coverings do; in general it may fail to be transitive.
- Error: thinking the homomorphism of fundamental groups induced by a covering is surjective. Correction: it is injective, with image a subgroup; surjectivity needs extra conditions.
- Error: ignoring that the fibres of a covering are discrete. Correction: every fibre point is isolated; if the total space is compact and the base Hausdorff, the fibres are finite.

## VII. Summary and Mnemonics

Key points:

- a covering map is a local homeomorphism with discrete fibres, each base point having an evenly covered neighbourhood;
- path lifting is unique once the starting point is fixed; homotopy lifting exists globally; the uniqueness theorem requires the total space to be connected;
- a covering induces an injection $\pi_1(E)\hookrightarrow\pi_1(B)$ whose image is a subgroup;
- connected coverings correspond one-to-one with conjugacy classes of subgroups of $\pi_1(B)$; the universal covering corresponds to the trivial subgroup;
- the $n$-sheeted covering $z\mapsto z^n$ corresponds to the subgroup $n\mathbb{Z}$, with group of covering transformations $\mathbb{Z}/n\mathbb{Z}$;
- the winding number equals the displacement of the lifted endpoint.

Mnemonic: **"Coverings stack in layers, locally like a copy; lifts fix the start, and the sheets reveal the winding."**

`,
  },

  'homology': {
    chapter: 'Chapter 7 Introduction to Homology Theory',
    title: 'A First Look at Simplicial Homology',
    summary:
      'Cut the space into triangles and count "holes" with the boundary operator: homology groups are the abelianization of the fundamental group and its higher-dimensional generalization.',
    keyPoints: [
      'A simplicial complex is built from simplices such as vertices, edges and triangles',
      'Boundary operator ∂: ∂²=0, with chain groups C_n→C_{n-1}',
      'H_n=ker∂_n/im∂_{n+1}: the group of n-dimensional holes',
      'H₀ counts connected components; H₁ is the abelianization of π₁',
    ],
    content: String.raw`

The fundamental group can count one-dimensional holes, but it may be non-abelian, hard to compute, and powerless against cavities of dimension two or more (such as the void enclosed by a sphere). We need a better-behaved invariant—an abelian group—that can count dimension by dimension: dimension zero counts connected pieces, dimension one counts ring-shaped holes, dimension two counts cavities. These are the homology groups.

Introduction: the surface of a sphere $S^2$ has no one-dimensional hole ($\pi_1=0$), yet it encloses a two-dimensional cavity. The fundamental group cannot see it, but the second homology group $H_2(S^2)\cong\mathbb{Z}$ sees through it at a glance. Homology systematically numbers the holes, and being abelian its operations are simple and additive, computable with linear algebra and the Mayer–Vietoris sequence—it is the workhorse of algebraic topology.

The price of homology is lost information: it remembers only the algebraic structure of "cycles modulo boundaries", not the order of loops. So the figure eight, with $\pi_1=F_2$, becomes $\mathbb{Z}^2$ in $H_1$, and the non-abelian information is flattened out. But precisely because it is flattened, homology is computable and suitable for generalization to higher dimensions.

## II. Rigorous Definitions

**Simplicial complex**. A simplicial complex $K$ is a collection built from simplices such as vertices, edges, triangles and tetrahedra, with the requirements: every face of a simplex belongs to $K$; the intersection of two simplices is a common face or empty. An $n$-simplex is written $[v_0,\dots,v_n]$ and is the convex hull of $n+1$ affinely independent points.

**Oriented simplex**. Give the vertices an ordering $[v_0,\dots,v_n]$. Two orderings differing by an even permutation represent the same orientation; differing by an odd permutation they represent opposite orientations and a minus sign. For example $[v_0,v_1]=-[v_1,v_0]$.

**Chain group**. $C_n(K)$ is the free abelian group with basis the oriented $n$-simplices of $K$. Its elements are called $n$-chains and are finite formal sums

$$c=\sum_\sigma a_\sigma\,\sigma,\qquad a_\sigma\in\mathbb{Z}.$$

**Boundary operator**. For an oriented simplex $\sigma=[v_0,\dots,v_n]$ define

$$\partial_n\sigma=\sum_{i=0}^{n}(-1)^i[v_0,\dots,\widehat{v_i},\dots,v_n],$$

where the hat means the vertex is deleted. Extending linearly to all of $C_n$ gives a group homomorphism $\partial_n:C_n\to C_{n-1}$.

**Core property**. $\partial_{n-1}\circ\partial_n=0$. Proof: in $\partial\partial\sigma$ every $(n-2)$-face arises by deleting two vertices, and it appears exactly twice with opposite signs, hence cancels.

**Cycles and boundaries**. $Z_n=\ker\partial_n$ is the group of $n$-cycles; $B_n=\operatorname{im}\partial_{n+1}$ is the group of $n$-boundaries. From $\partial^2=0$ we get $B_n\subset Z_n$.

**Homology group**.

$$H_n(K)=Z_n/B_n=\ker\partial_n\,/\,\operatorname{im}\partial_{n+1}.$$

Its elements are called homology classes, written $[c]$. $H_n$ is a finitely generated abelian group and decomposes as

$$H_n\cong\mathbb{Z}^{b_n}\oplus\mathbb{Z}/k_1\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}/k_r\mathbb{Z},$$

where $b_n$ is called the $n$-th Betti number and the finite part is called the torsion.

**Reduced homology**. $\tilde H_0=H_0/\mathbb{Z}$, so that the reduced homology of a point vanishes entirely, which makes theorems easier to state.

**Euler characteristic**.

$$\chi(K)=\sum_{n\ge0}(-1)^n c_n=\sum_{n\ge0}(-1)^n b_n,$$

where $c_n$ is the number of $n$-simplices of $K$ and $b_n$ the $n$-th Betti number.

**Basic properties**:

- $H_0\cong\mathbb{Z}^c$, where $c$ is the number of connected components;
- for a path connected space, $H_1\cong\pi_1^{\mathrm{ab}}$ (Hurewicz's theorem);
- homotopy equivalent spaces have isomorphic homology; homeomorphic ones certainly do;
- simplicial homology agrees with singular homology and is independent of the triangulation;
- Mayer–Vietoris sequence: if $X=U\cup V$ with suitable open $U,V,U\cap V$, there is a long exact sequence relating the homology of the three.

## III. Why These Definitions

**Why orient the simplices?** Because boundaries must cancel. Without orientation the boundary of a triangle is the sum of its three edges, and each edge also appears in a neighbouring triangle, so when one takes the chain of a whole surface the boundaries do not cancel automatically and $\partial^2=0$ fails. Orientation gives each edge a start and an end, and the boundary directions induced by adjacent triangles are opposite, so they cancel exactly. This is the same idea as determinants and signed volumes.

**Why is $\partial^2=0$?** Geometrically, the boundary of a triangle is three edges, and these three edges join head to tail, together having no boundary; the boundary of a boundary is empty. Algebraically, a face obtained by deleting two vertices appears twice: deleting $i$ then $j$ versus $j$ then $i$, with signs differing by a minus, so they cancel. This identity is the cornerstone of all homology theory; it guarantees $B_n\subset Z_n$, so that the quotient makes sense.

**Why quotient out boundaries?** Because a cycle that is itself the boundary of a solid should not count as a hole. For example the 2-chain covering the whole sphere is a cycle, but the void it encloses is solid (a ball), not a hole; and it is not the boundary of any 3-chain (the sphere has no 3-simplices), so it is non-zero in $H_2$. Conversely, a loop inside a disc is the boundary of some 2-chain, hence zero in homology. Homology records only the holes that cannot be filled.

**Why abelian groups?** Because abelian groups allow linear algebra: kernels, images, quotients, ranks, Smith normal form. With non-abelian groups the computations become extremely difficult. The price is the loss of non-abelian information: the figure eight's $\pi_1=F_2$ becomes $\mathbb{Z}^2$ in $H_1$, and the difference between $ab$ and $ba$ disappears. Homology is the abelianization of the fundamental group, and this trade-off is worth it.

**Why take finitely generated free abelian chain groups?** Because a finite simplicial complex has only finitely many simplices in each dimension, the chain groups are free abelian of finite rank and the boundary operator can be represented by an integer matrix. Computing homology then reduces to finding kernels and images of matrices, the concrete algorithm being the Smith normal form: apply integer row and column operations to the boundary matrix to make it diagonal; the number of non-zero diagonal entries gives the rank and diagonal entries greater than $1$ give the torsion coefficients. This turns a topological problem completely into a linear algebra problem, and is the fundamental reason why homology is easier to compute than the fundamental group.

**Why is homology independent of the triangulation?** This is a deep theorem (the invariance of simplicial homology). Intuitively, two different triangulations have a common subdivision, and subdivision does not change the homology groups. Singular homology uses continuous simplices instead of straight ones, is automatically independent of the subdivision, and is isomorphic to simplicial homology. So homology is a topological invariant of the space, not an artefact of the triangulation.

**Homology groups are homotopy invariants, not quantities meaningful only for homeomorphisms.** Homotopy equivalence is coarser than homeomorphism, and homology depends only on the homotopy type. A disc is homotopy equivalent to a point and has the same homology; a cylinder is homotopy equivalent to a circle although the two are not homeomorphic. Homology cannot see the details of how things are glued, only how many holes there are.

**Counterexample: what if we do not quotient out boundaries?** Consider a solid triangle (including its interior). Among its 1-chains, the cycle formed by the three edges is the boundary of the 2-simplex. If boundaries were not quotiented out, this cycle would be mistaken for a one-dimensional hole, but the solid triangle has no hole at all. Quotienting out boundaries exactly sets "loops that can be filled" to zero.

**Why does $H_0$ count connected components?** A 0-chain is a formal sum of vertices and $\partial_0=0$, so $Z_0=C_0$. $\partial_1$ sends an edge $[v,w]$ to $w-v$. Two vertices are equivalent in homology if and only if their difference is a boundary of some 1-chain, i.e. if they can be joined by a path made of edges. So the rank of $H_0$ is the number of connected components.

## IV. Intuition and Pictures

> Intuition: homology groups count holes that cannot be filled. $H_0$ counts how many pieces are connected; $H_1$ counts independent ring-shaped holes; $H_2$ counts cavities.

| Space | $H_0$ | $H_1$ | $H_2$ | $\chi$ |
|---|---|---|---|---|
| point | $\mathbb{Z}$ | $0$ | $0$ | $1$ |
| circle $S^1$ | $\mathbb{Z}$ | $\mathbb{Z}$ | $0$ | $0$ |
| sphere $S^2$ | $\mathbb{Z}$ | $0$ | $\mathbb{Z}$ | $2$ |
| torus $T^2$ | $\mathbb{Z}$ | $\mathbb{Z}^2$ | $\mathbb{Z}$ | $0$ |
| real projective plane | $\mathbb{Z}$ | $\mathbb{Z}/2\mathbb{Z}$ | $0$ | $1$ |
| Klein bottle | $\mathbb{Z}$ | $\mathbb{Z}\oplus\mathbb{Z}/2\mathbb{Z}$ | $0$ | $0$ |

> More intuitively: think of a cycle as a closed loop drawn on a surface, and of a boundary as the complete rim of some face. If a closed loop happens to be the rim of a face, it does not enclose a hole; only when it surrounds an unfillable cavity, or winds around a loop that cannot be contracted, does it leave a non-zero homology class in the quotient.

| Concept | Geometric picture | Algebraic definition |
|---|---|---|
| $n$-chain | a formal sum of $n$-dimensional pieces | element of $C_n$ |
| cycle | a loop or surface without boundary | $\ker\partial_n$ |
| boundary | the rim of some $(n+1)$-piece | $\operatorname{im}\partial_{n+1}$ |
| homology class | a cycle modulo boundaries | $Z_n/B_n$ |
| Betti number | number of independent $n$-holes | free rank of $H_n$ |
| torsion | a hole that closes only after $k$ turns | finite part of $H_n$ |

The free part of a homology group can also be read off from the Betti numbers: $b_n=\operatorname{rank}H_n$. The larger the Betti number, the more independent $n$-dimensional holes; the torsion records twisted holes that close only after a certain number of turns. For example $\mathbb{R}P^2$ has $b_1=0$ but $H_1=\mathbb{Z}/2\mathbb{Z}$, showing a twisted one-dimensional hole that the Betti numbers alone would miss.

## V. Worked Examples

### Example 1 (Basic: simplicial homology of the circle)

Problem: triangulate $S^1$ with three vertices $v_0,v_1,v_2$ and three edges

$$e_0=[v_0,v_1],\quad e_1=[v_1,v_2],\quad e_2=[v_2,v_0].$$

Compute $H_0,H_1,H_2$.

Approach: write down the boundary matrix and compute its kernel and image.

Solution: there are no 2-simplices, so $C_2=0$ and $H_2=\ker\partial_2=0$.

Boundaries:

$$\partial e_0=v_1-v_0,\quad \partial e_1=v_2-v_1,\quad \partial e_2=v_0-v_2.$$

Let $c=a e_0+b e_1+c e_2$. Then

$$\partial c=a(v_1-v_0)+b(v_2-v_1)+c(v_0-v_2)=(c-a)v_0+(a-b)v_1+(b-c)v_2.$$

$\partial c=0$ if and only if $c-a=0$, $a-b=0$ and $b-c=0$, i.e. $a=b=c$. Hence

$$Z_1=\ker\partial_1=\mathbb{Z}\,(e_0+e_1+e_2)\cong\mathbb{Z}.$$

Since $C_2=0$, $B_1=\operatorname{im}\partial_2=0$, so

$$H_1=Z_1/B_1\cong\mathbb{Z}.$$

Now $H_0$. $Z_0=C_0=\mathbb{Z}v_0\oplus\mathbb{Z}v_1\oplus\mathbb{Z}v_2$, and

$$B_0=\operatorname{im}\partial_1=\{(c-a)v_0+(a-b)v_1+(b-c)v_2\}.$$

Note that the sum of the three coefficients is $0$; conversely, any vector with zero coefficient sum is realized by some $(a,b,c)$ (take $a=0$, $b=-\beta$, $c=-\beta-\gamma$ with $\alpha+\beta+\gamma=0$). So $B_0$ is the subgroup of vectors with coefficient sum zero, of rank $2$. Hence

$$H_0=C_0/B_0\cong\mathbb{Z}.$$

Comment: the generator of $H_1$ is the whole circle $e_0+e_1+e_2$, a cycle without boundary that is not the boundary of any 2-chain (since there are no 2-simplices). This is exactly the algebraic expression of "one turn around the hole cannot be contracted".

### Example 2 (Intermediate: simplicial homology of the sphere)

Problem: triangulate $S^2$ as the boundary of a tetrahedron with vertices $v_0,v_1,v_2,v_3$, edges $e_{ij}=[v_i,v_j]$ ($i<j$) and faces $f_{ijk}=[v_i,v_j,v_k]$ ($i<j<k$). Compute $H_0,H_1,H_2$.

Approach: write the boundaries of the four faces, solve the linear system for $\ker\partial_2$, and use the rank–nullity theorem to compare $\ker\partial_1$ with $\operatorname{im}\partial_2$.

Solution: there are no 3-simplices, so $H_3=0$. First compute $\partial_2$:

$$\partial f_{012}=e_{12}-e_{02}+e_{01},$$

$$\partial f_{013}=e_{13}-e_{03}+e_{01},$$

$$\partial f_{023}=e_{23}-e_{03}+e_{02},$$

$$\partial f_{123}=e_{23}-e_{13}+e_{12}.$$

Let $c=a f_{012}+b f_{013}+c f_{023}+d f_{123}$ and require $\partial c=0$. Comparing coefficients edge by edge:

$$e_{01}:a+b=0,\qquad e_{02}:-a+c=0,\qquad e_{03}:-b-c=0,$$

$$e_{12}:a+d=0,\qquad e_{13}:b-d=0,\qquad e_{23}:c+d=0.$$

From $a+b=0$, $b=-a$; from $-a+c=0$, $c=a$; from $a+d=0$, $d=-a$. Substituting into the remaining three equations they hold automatically. Hence

$$Z_2=\ker\partial_2=\mathbb{Z}\,(f_{012}-f_{013}+f_{023}-f_{123})\cong\mathbb{Z}.$$

Thus $H_2=Z_2/B_2=Z_2/0\cong\mathbb{Z}$.

Now $H_1$. The rank of $C_0$ is $4$; the space is connected, so $H_0\cong\mathbb{Z}$ and hence the rank of $\operatorname{im}\partial_1$ is $3$. The rank of $C_1$ is $6$, so by rank–nullity

$$\operatorname{rank}Z_1=6-3=3.$$

On the other hand $C_2$ has rank $4$ and $\ker\partial_2$ has rank $1$, so $\operatorname{im}\partial_2$ has rank $4-1=3$. Since $\partial^2=0$ gives $\operatorname{im}\partial_2\subset\ker\partial_1$ and both have rank $3$, they are equal. Hence

$$H_1=Z_1/B_1=Z_1/\operatorname{im}\partial_2=0.$$

Comment: the generator of $H_2$ is the alternating oriented sum of the four faces, representing the whole sphere. It is not the boundary of any 3-chain (there being no 3-simplices), so it is a genuine two-dimensional hole. $H_1=0$ means that every 1-cycle on the sphere is the boundary of some 2-chain, consistent with $S^2$ being simply connected.

### Example 3 (Advanced: torsion in the real projective plane)

Problem: compute $H_*(\mathbb{R}P^2;\mathbb{Z})$ using a cell decomposition and explain the geometric meaning of the torsion.

Approach: $\mathbb{R}P^2$ has one 0-cell, one 1-cell and one 2-cell; the key point is that the attaching map of the 2-cell has degree $2$.

Solution: $\mathbb{R}P^2$ can be viewed as the disc $D^2$ with antipodal boundary points identified. Its cell structure is

$$\mathbb{R}P^2=e^0\cup e^1\cup e^2.$$

Both ends of $e^1$ are attached to $e^0$, so $\partial_1(e^1)=v-v=0$. The boundary of $e^2$ is a circle attached to the 1-skeleton $\mathbb{R}P^1=S^1$; the attaching map is exactly the double covering $S^1\to S^1$, $z\mapsto z^2$, of degree $2$. So the chain complex is

$$0\to C_2=\mathbb{Z}\xrightarrow{\times2}C_1=\mathbb{Z}\xrightarrow{0}C_0=\mathbb{Z}\to0.$$

Hence

$$H_2=\ker(\times2)=0,\qquad H_1=\ker 0/\operatorname{im}(\times2)=\mathbb{Z}/2\mathbb{Z},\qquad H_0=\mathbb{Z}.$$

Euler characteristic check:

$$\chi=1-1+1=1,\qquad b_0-b_1+b_2=1-0+0=1.$$

Consistent.

Geometric meaning: $H_1=\mathbb{Z}/2\mathbb{Z}$ says that on $\mathbb{R}P^2$ there is a closed curve that cannot be contracted after one turn but can after two. This is the algebraic trace of "non-orientability": the non-trivial loops in $\mathbb{R}P^2$ have no continuous orientation, and orientation is restored only after two turns. It also shows that $H_1$ need not be free, and that vanishing Betti numbers do not mean the absence of one-dimensional holes.

Comment: this is the standard example of "homology with torsion". Using only Betti numbers, $\mathbb{R}P^2$ looks like a point ($b_0=1$, the rest zero), but $H_1=\mathbb{Z}/2$ distinguishes it from a point. Homology groups carry more information than Betti numbers.

## VI. Common Errors and Pitfalls

- Error: thinking $H_1$ is the same as $\pi_1$. Correction: $H_1$ is the abelianization of $\pi_1$ and discards non-abelian information; the figure eight has $\pi_1=F_2$ and $H_1=\mathbb{Z}^2$.
- Error: treating a cycle directly as a hole. Correction: one must further quotient out boundary chains to obtain homology classes; a loop inside a disc is a cycle but also a boundary, hence zero in homology.
- Error: ignoring orientation and signs. Correction: simplices carry orientations, and swapping two vertices changes the sign; the $(-1)^i$ in the boundary formula must not be dropped.
- Error: thinking higher homology always vanishes. Correction: $H_2=\mathbb{Z}$ for the sphere and for the torus; higher-dimensional holes are common.
- Error: thinking $H_n$ is always free. Correction: $H_1=\mathbb{Z}/2\mathbb{Z}$ for $\mathbb{R}P^2$ has torsion.
- Error: confusing simplicial homology with singular homology. Correction: the two are isomorphic but have different domains; the former uses a triangulation, the latter continuous singular simplices.
- Error: thinking equal homology groups imply homeomorphic spaces. Correction: homology is only an invariant, not a complete one; there exist spaces with the same homology that are not homotopy equivalent.
- Error: taking the Euler characteristic only as an alternating count. Correction: it equals $\sum(-1)^n b_n$ and is a topological invariant; torsion does not affect it.
- Error: thinking every space can be triangulated. Correction: not every topological space is triangulable; singular homology applies to general spaces as well.

## VII. Summary and Mnemonics

Key points:

- a simplicial complex is built from simplices such as vertices, edges and triangles; swapping vertices of an oriented simplex changes the sign;
- the boundary operator $\partial_n:C_n\to C_{n-1}$ satisfies $\partial^2=0$;
- $H_n=\ker\partial_n/\operatorname{im}\partial_{n+1}$ counts $n$-dimensional holes;
- $H_0$ counts connected components; for a path connected space $H_1=\pi_1^{\mathrm{ab}}$;
- $H_2=\mathbb{Z}$ for the sphere sees through two-dimensional cavities; $H_1=\mathbb{Z}/2$ for $\mathbb{R}P^2$ exhibits torsion;
- the Euler characteristic $\chi=\sum(-1)^n b_n$ is a topological invariant.

Mnemonic: **"Boundary of a boundary, zero without a doubt; cycles mod boundaries, hole by hole come out."**

`,
  },
};

export default map;
