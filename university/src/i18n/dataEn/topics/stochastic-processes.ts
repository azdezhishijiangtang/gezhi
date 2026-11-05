import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'markov-chains': {
    chapter: 'Chapter 1 Markov Chains',
    title: 'Markov Chains',
    summary:
      'The future depends only on the present and not on the past—from Google PageRank to queueing systems, the Markov property is the first approximation in modelling.',
    keyPoints: [
      'Markov property: P(future | present, past) = P(future | present)',
      'Chapman–Kolmogorov: P⁽ⁿ⁾ = Pⁿ—a matrix power is a multi-step transition',
      'Ergodic theorem: a finite, irreducible, aperiodic chain has a unique stationary distribution',
      'PageRank, MCMC and M/M/1 queues are all built on it',
    ],
    content: String.raw`

Tomorrow's weather is of course related to today's, and to yesterday's. But there is a class of stochastic processes that is especially "forgetful": as soon as you know which state you are in now, the probability law of the future is fully determined, and how you got here does not matter. This is the Markov property, also called absence of after-effect.

The classic picture is a drunkard's walk: whether his next step goes left or right depends only on where he stands at this moment, not on how he staggered here. Web browsing is another: which link you click next depends mainly on the links on the current page, not on what you looked at three days ago. Google's PageRank turns exactly this "random clicking" model into a matrix and ranks pages by the stationary distribution.

A Markov chain writes this evolution, whose "memory lasts one step", precisely in terms of states, transition probabilities and matrices. It is both the most practical model in probability theory and a large-scale application of linear algebra (non-negative matrices, eigenvalues). The core question of this lecture is: does a random system that changes step by step settle in the long run into a fixed distribution? Which distribution? And when does it fail to settle?

## II. Rigorous Definitions

Let $\{X_n,\ n=0,1,2,\dots\}$ be a stochastic process taking values in a countable state set $S$ (such as $\{0,1,2,\dots\}$).

**Markov property**: for any $n$ and any states $i_0,\dots,i_{n+1}$, whenever the conditional probabilities are meaningful,

$$P(X_{n+1}=i_{n+1}\mid X_n=i_n,X_{n-1}=i_{n-1},\dots,X_0=i_0)=P(X_{n+1}=i_{n+1}\mid X_n=i_n)$$

In other words: given the present, the past carries no extra information for predicting the future.

**Time homogeneity**: if $P(X_{n+1}=j\mid X_n=i)$ does not depend on $n$, the chain is called time-homogeneous. This lecture treats only time-homogeneous chains.

**One-step transition probabilities and the transition matrix**:

$$p_{ij}=P(X_{n+1}=j\mid X_n=i),\qquad P=(p_{ij})$$

Every row of $P$ sums to $1$ and the entries are non-negative; such a matrix is called a **stochastic matrix**.

**$n$-step transition probabilities**: $p_{ij}^{(n)}=P(X_{n}=j\mid X_0=i)$, with matrix $P^{(n)}$.

**Chapman–Kolmogorov equations**:

$$p_{ij}^{(n+m)}=\sum_{k\in S}p_{ik}^{(n)}p_{kj}^{(m)},\qquad P^{(n+m)}=P^{(n)}P^{(m)}$$

In particular $P^{(n)}=P^n$.

**Initial distribution and the distribution at time $n$**: if the initial distribution is the row vector $\mu_0=(\mu_0(i))_{i\in S}$, then the distribution at time $n$ is

$$\mu_n=\mu_0P^n,\qquad \mu_n(j)=\sum_i\mu_0(i)p_{ij}^{(n)}$$

**Stationary distribution**: a probability row vector $\pi$ satisfying

$$\pi P=\pi,\qquad \sum_i\pi_i=1,\qquad \pi_i\ge0$$

is called a stationary distribution. It satisfies "distributed as $\pi$ today, still distributed as $\pi$ tomorrow".

**Classification of states**:

- **Communication**: there exist $n,m\ge0$ with $p_{ij}^{(n)}>0$ and $p_{ji}^{(m)}>0$, written $i\leftrightarrow j$. Communication is an equivalence relation.
- **Irreducible**: all states lie in one communication class.
- **Recurrent**: starting from $i$, the probability of returning to $i$ sooner or later is $1$; otherwise the state is **transient**.
- **Period**: the period of state $i$ is $d(i)=\gcd\{n\ge1:p_{ii}^{(n)}>0\}$. $d=1$ is called aperiodic.
- **Ergodic**: irreducible, aperiodic and positive recurrent (finite mean return time).

**Absorption probability and hitting time**: let $A$ be a set of absorbing states and $h_i=P(\text{eventually enter }A\mid X_0=i)$; then

$$h_i=\sum_j p_{ij}h_j\quad(i\notin A),\qquad h_i=1\ (i\in A)$$

This is **first-step analysis**: start from $i$, take one step, and apply the law of total probability to the landing point.

## III. Why These Definitions

**Why does every row of the transition matrix sum to $1$?** Starting from state $i$, the next step must land in some state (including staying at $i$); these events are mutually exclusive and exhaustive, so

$$\sum_jp_{ij}=\sum_jP(X_{n+1}=j\mid X_n=i)=1$$

This is not an extra assumption but a direct consequence of probability normalization. Column sums are generally not $1$, since the probabilities of "arriving at $j$ from all over at the next instant" may add up to more than $1$.

**Why does the C-K equation hold?** To go from $i$ to $j$ in $n+m$ steps, look at where the $n$-th step lands. If $X_n=k$, the first $n$ steps go from $i$ to $k$ and the last $m$ from $k$ to $j$. By the Markov property the second leg depends only on $X_n=k$ and not on the earlier history, so

$$P(X_{n+m}=j\mid X_0=i)=\sum_kP(X_n=k\mid X_0=i)P(X_{n+m}=j\mid X_n=k)$$

which is the C-K equation. In matrix form it is $P^{n+m}=P^nP^m$. "A matrix power equals a multi-step transition" is the most central algebraic fact about Markov chains.

**Why does the stationary distribution satisfy $\pi P=\pi$?** If $\mu_0=\pi$, then $\mu_1=\pi P$. Requiring the distribution to be unchanged gives $\pi P=\pi$. That is, $\pi$ is a left eigenvector of $P$ with eigenvalue $1$. Since the rows of $P$ sum to $1$, the all-ones vector is a right eigenvector: $P\mathbf{1}=\mathbf{1}$, so $1$ is certainly an eigenvalue and $\pi$ certainly exists (for finite state spaces).

**When is the stationary distribution unique?** If the chain is irreducible and positive recurrent, the stationary distribution exists and is unique, with

$$\pi_i=\frac{1}{m_i},\qquad m_i=E[\text{time to return to }i\text{, starting from }i]$$

If the chain is reducible, different recurrent classes may each have a stationary distribution, and convex combinations are again stationary, so uniqueness fails. For example, in a chain of two absorbing states, every $(\alpha,1-\alpha)$ is stationary.

**When does $P^n$ converge to the stationary distribution?** One needs irreducibility + aperiodicity + positive recurrence. Then for any initial distribution $\mu_0$,

$$\lim_{n\to\infty}\mu_0P^n=\pi$$

and the rate of convergence is governed by the modulus of the second largest eigenvalue of $P$. Periodicity destroys convergence: for $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ the stationary distribution is $(1/2,1/2)$, but $P^n$ oscillates between $P$ and $I$ and $p_{ij}^{(n)}$ does not converge.

> Counterexample (the conditions are indispensable): what if irreducibility is dropped? For $P=\begin{pmatrix}1&0\\0&1\end{pmatrix}$ irreducibility fails and the stationary distributions are all $(\alpha,1-\alpha)$, not unique. What if aperiodicity is dropped? That is the two-period chain above: the stationary distribution is unique but $P^n$ does not converge. So "uniqueness" and "convergence" are two different conclusions with different conditions.

**Why does first-step analysis work?** It splits "the long-run behaviour starting from $i$" into "take one step" and "the long-run behaviour starting from the new state". By the Markov property the history is "reset" after one step, and the problem returns to an equation of the same type but with a different state. This yields a linear system, and solving it gives the answer. It is the most used computational technique for Markov chains.

## IV. Intuition and Pictures

Think of a chain as a maze: each state is a room and $p_{ij}$ is the probability of walking from $i$ to $j$. Recurrent states are like dead ends with a pool—once inside you cannot leave, and you will return to the pool sooner or later; transient states are like corridors—you may pass through, but you will not stay forever. Irreducibility means the whole maze is connected; period $d$ means you can only return to a room at step numbers that are multiples of $d$.

| Concept | Intuition | Criterion |
|---|---|---|
| Recurrent | you will come back | return probability $1$ |
| Transient | you may leave for good | return probability less than $1$ |
| Communicating | two rooms reachable from each other | a path in both directions |
| Period $d$ | return only at particular steps | gcd of return times |
| Stationary | the distribution stops changing | $\pi P=\pi$ |
| Ergodic | long-run distribution independent of the start | irreducible, aperiodic, positive recurrent |

> Intuition: a stationary distribution is an equilibrium of "inflow equals outflow". For each state $j$, in the long run the probability flux flowing into $j$ from elsewhere, $\sum_i\pi_ip_{ij}$, exactly equals the outflow $\pi_j$. This does not mean "the chain has stopped" but "the proportions of individuals in the various states have stabilized" while individuals keep jumping.

**Detailed balance**: if there is a $\pi$ with

$$\pi_ip_{ij}=\pi_jp_{ji}\quad(\forall i,j)$$

then the chain is called reversible and $\pi$ is automatically stationary (sum over $i$). Birth–death chains, random walks and many other models satisfy detailed balance, and using it to find $\pi$ is faster than solving $\pi P=\pi$.

Right versus wrong:

- Wrong: all states of a finite chain are recurrent. Right: a finite chain has at least one recurrent class but may contain transient states (for example the intermediate states before absorption).
- Wrong: the stationary distribution is always unique. Right: it is unique only for irreducible positive recurrent chains; a reducible chain has infinitely many.
- Wrong: having a stationary distribution implies convergence. Right: a periodic chain has a stationary distribution but does not converge.

## V. Worked Examples

### Example 1 (Basic: two-step transition and stationary distribution)

Problem: for the two-state chain $P=\begin{pmatrix}0.7&0.3\\0.4&0.6\end{pmatrix}$, find $P^2$, the probability of going from state $1$ to state $2$ in two steps, and the stationary distribution.

Approach: multiply matrices directly for $P^2$; solve $\pi P=\pi$ plus normalization for the stationary distribution.

Solution:

$$P^2=\begin{pmatrix}0.7&0.3\\0.4&0.6\end{pmatrix}\begin{pmatrix}0.7&0.3\\0.4&0.6\end{pmatrix}$$

Entry by entry:

$$(P^2)_{11}=0.7\cdot0.7+0.3\cdot0.4=0.49+0.12=0.61$$

$$(P^2)_{12}=0.7\cdot0.3+0.3\cdot0.6=0.21+0.18=0.39$$

$$(P^2)_{21}=0.4\cdot0.7+0.6\cdot0.4=0.28+0.24=0.52$$

$$(P^2)_{22}=0.4\cdot0.3+0.6\cdot0.6=0.12+0.36=0.48$$

So $P^2=\begin{pmatrix}0.61&0.39\\0.52&0.48\end{pmatrix}$, and the probability of going from state $1$ to state $2$ in two steps is $0.39$.

Stationary distribution: write $\pi=(\pi_1,\pi_2)$; the component form of $\pi P=\pi$ is

$$0.7\pi_1+0.4\pi_2=\pi_1,\qquad 0.3\pi_1+0.6\pi_2=\pi_2$$

The first equation gives $0.4\pi_2=0.3\pi_1$, i.e. $\pi_2=\dfrac34\pi_1$. Adding $\pi_1+\pi_2=1$:

$$\pi_1+\frac34\pi_1=\frac74\pi_1=1\quad\Longrightarrow\quad\pi_1=\frac47,\quad\pi_2=\frac37$$

Hence $\pi=\left(\dfrac47,\dfrac37\right)$: in the long run about $\dfrac47$ of the time is spent in state $1$.

The convergence rate can also be checked with eigenvalues: $\operatorname{tr}P=1.3$, $\det P=0.42-0.12=0.30$, so the eigenvalues are $1$ and $0.3$. Hence

$$P^n=\Pi+0.3^n\begin{pmatrix}\ast&\ast\\\ast&\ast\end{pmatrix}\to\Pi$$

where both rows of $\Pi$ equal $\pi$, and the convergence rate is governed by $0.3^n$.

> Comment: this problem shows that "the stationary distribution is the left eigenvector for eigenvalue $1$". Since $|0.3|<1$, $P^n$ converges to the matrix $\Pi$ with identical rows, so whatever the starting state, the long-run distribution is $\pi$. If the other eigenvalue had modulus $1$ (periodic chain) or greater than $1$ (non-stochastic matrix), convergence would fail.

### Example 2 (Intermediate: gambler's ruin)

Problem: a gambler starts with $i$ units ($0\le i\le N$); each round he wins $1$ with probability $p$ and loses $1$ with probability $q=1-p$, and the game stops on reaching $0$ (ruin) or $N$ (the goal). Find the probability $P_i$ of eventually reaching $N$; for $p=q=\frac12$ also find the expected number of rounds $E_i$.

Approach: this is an absorbing chain; use first-step analysis to write difference equations.

Solution: **probability of reaching $N$**. Starting from $i$, take one step first:

$$P_i=pP_{i+1}+qP_{i-1}\quad(1\le i\le N-1),\qquad P_0=0,\ P_N=1$$

This is a linear difference equation with constant coefficients. Substituting $P_i=r^i$ gives

$$pr^2-r+q=0\quad\Longrightarrow\quad(r-1)(pr-q)=0$$

(since $p+q=1$: $pr^2-r+q=(r-1)(pr-q)$, which expands to $pr^2-pr-qr+q=pr^2-(p+q)r+q$, exactly the original expression.)

The roots are $r=1$ and $r=q/p$.

**When $p\ne q$**, the general solution is

$$P_i=A+B\left(\frac{q}{p}\right)^i$$

with the boundary conditions

$$A+B=0,\qquad A+B\left(\frac{q}{p}\right)^N=1$$

giving $B=\dfrac{1}{(q/p)^N-1}$, $A=-B$, hence

$$P_i=\frac{1-(q/p)^i}{1-(q/p)^N}$$

**When $p=q=\frac12$**, $r=1$ is a double root and the general solution is $P_i=A+Bi$. From $P_0=0$, $A=0$; from $P_N=1$, $B=1/N$, so

$$P_i=\frac{i}{N}$$

**Expected number of rounds (fair case)**. Let $E_i$ be the expected number of steps from $i$ to absorption; then

$$E_i=1+pE_{i+1}+qE_{i-1},\qquad E_0=E_N=0$$

For $p=q=\frac12$, $E_i=1+\frac12(E_{i+1}+E_{i-1})$, i.e.

$$E_{i+1}-2E_i+E_{i-1}=-2$$

whose left side is the negative of the second difference. Setting $D_i=E_i-E_{i-1}$ gives $D_{i+1}-D_i=-2$, so $D_i=D_1-2(i-1)$. Hence

$$E_i=\sum_{k=1}^{i}D_k=iD_1-i(i-1)$$

From $E_N=0$, $ND_1-N(N-1)=0$, i.e. $D_1=N-1$. Therefore

$$E_i=i(N-1)-i(i-1)=i(N-i)$$

Check: it vanishes for $i=0$ or $N$; for $N=2$, $i=1$, $E_1=1$, indeed a single round decides the game.

> Comment: the characteristic-root method for difference equations parallels the one for differential equations exactly, but note that in the repeated-root case one switches to "$A+Bi$" rather than "$A+Bi$ times an exponential". Also, when $p\le q$ and $N\to\infty$, $P_i\to0$—this is the precise quantitative statement of "the longer you gamble, the more surely you lose": as long as the win rate is not favourable, the long-run ruin probability is $1$.

### Example 3 (Advanced: why irreducibility and aperiodicity are needed)

Problem: describe the long-run behaviour of the following two chains and explain why neither condition for uniqueness of the stationary distribution and convergence of $P^n$ can be dropped.

(a) $P_1=\begin{pmatrix}1&0\\0&1\end{pmatrix}$; (b) $P_2=\begin{pmatrix}0&1\\1&0\end{pmatrix}$.

Approach: both chains are extremely simple, but they violate irreducibility and aperiodicity respectively.

Solution: **(a)** Both states are absorbing. $\pi P_1=\pi$ holds for every probability vector $\pi=(\alpha,1-\alpha)$, so there are infinitely many stationary distributions, not a unique one. Irreducibility fails (two closed communication classes). Starting from state $1$ the chain stays at $1$ forever, and from $2$ it stays at $2$; $P_1^n=P_1$ converges, but the limit depends on the initial value.

**(b)** The chain must jump back and forth between $1$ and $2$: it is irreducible and positive recurrent, but has period $2$ (it can return to the original state only at even steps). The stationary distribution satisfies

$$\pi_1=\pi_2,\qquad \pi_1+\pi_2=1\quad\Longrightarrow\quad\pi=\left(\frac12,\frac12\right)$$

and is unique. But

$$P_2^{2k}=I,\qquad P_2^{2k+1}=P_2$$

so $P_2^n$ does not converge. Starting from state $1$, at even times the chain is certainly at $1$ and at odd times certainly at $2$; it never "settles" into the probability distribution $\frac12$—only averaging over time gives $\frac12$.

> Comment: these two counterexamples make the division of labour between the conditions clear. Irreducibility guarantees "the stationary distribution is unique"; aperiodicity guarantees "$P^n$ converges". If only convergence of the time average is required ($\frac1n\sum_{k=0}^{n-1}P^k\to\Pi$), a periodic chain is acceptable, but the pointwise limit does not exist. When an exam asks about "the stationary distribution" versus "the limiting distribution", be sure to distinguish which is meant.

## VI. Common Errors and Pitfalls

1. **Writing the C-K equation in the wrong order**: wrong—writing $P^{(n+m)}=P^mP^n$ for fear that $P^nP^m\ne P^mP^n$. Why wrong—powers of the same matrix commute automatically, $P^nP^m=P^{n+m}$. Right—write $\sum_kp_{ik}^{(n)}p_{kj}^{(m)}$ following "first $n$ steps, then $m$ steps".
2. **Forgetting normalization of the stationary distribution**: wrong—stopping after $\pi P=\pi$ gives a ratio. Why wrong—the eigen-equation has infinitely many solutions (up to a constant factor). Right—add $\sum_i\pi_i=1$ and $\pi_i\ge0$.
3. **Treating transient states as the long-run home**: wrong—thinking every state of a finite chain has a positive limiting probability. Why wrong—a transient state is visited finitely often, so its limiting probability is $0$. Right—the limiting mass sits only on recurrent classes.
4. **Ignoring the irreducibility condition**: wrong—claiming a unique stationary distribution for a chain with several recurrent classes. Why wrong—each closed class has its own stationary distribution and convex combinations are still stationary. Right—uniqueness requires irreducible positive recurrence.
5. **Confusing "has a stationary distribution" with "$P^n$ converges"**: wrong—declaring convergence for a periodic chain. Why wrong—$P^n$ oscillates for a periodic chain. Right—convergence requires aperiodicity; in the periodic case only time averages can be discussed.
6. **Substituting the gambler's ruin boundary conditions backwards**: wrong—taking $P_0=1$ or $P_N=0$. Why wrong—$0$ is ruin (failure) and $N$ the goal (success). Right—$P_0=0,\ P_N=1$.
7. **Omitting the constant $1$ of "the first step" in first-step analysis**: wrong—writing the expected number of rounds as $E_i=pE_{i+1}+qE_{i-1}$. Why wrong—one step has already been taken and must be added. Right—$E_i=1+pE_{i+1}+qE_{i-1}$.

## VII. Summary and Mnemonics

Key points:

- Markov property: given the present, the future is conditionally independent of the past.
- Transition matrix rows sum to $1$; $P^{(n)}=P^n$ (C-K equation).
- Distribution evolution $\mu_n=\mu_0P^n$; the stationary distribution solves $\pi P=\pi$ plus normalization.
- Irreducible positive recurrent ⟹ unique stationary distribution; adding aperiodicity ⟹ $P^n$ converges to the matrix whose rows are all $\pi$.
- First-step analysis turns long-run probabilities into linear systems; difference equations are solved by the characteristic-root method.
- Applications: PageRank, MCMC, queueing, gambler's ruin, absorbing chains.

**Mnemonic: Markov looks one step back, transition rows sum to one; C-K multiplies powers, stationary solves πP=π.**

`,
  },

  'poisson-process': {
    chapter: 'Chapter 2 The Poisson Process',
    title: 'The Poisson Process',
    summary:
      'The standard model for random arrivals: independent increments + stationary increments ⟹ Poisson counts. The memorylessness of the exponential interarrival times is its soul.',
    keyPoints: [
      'Poisson process = independent increments + stationary increments + Poisson counts',
      'Interarrival times are exponential; Sₙ is Erlang distributed',
      'Memorylessness is the fingerprint of the exponential distribution and the hallmark of the Poisson assumption',
      'Independent Poisson streams can be superposed and thinned; compound Poisson models claim amounts',
    ],
    content: String.raw`

Incoming calls at a call centre, vehicles passing an intersection, the decay of radioactive atoms, the firing of neurons—what these phenomena have in common is that events arrive one by one at random, and what we care about is "how many have arrived by time $t$" and "how long between two consecutive ones".

The simplest model is this: cut time into many small intervals, toss a coin independently in each, and an event arrives on heads. As the number of intervals tends to infinity, the arrival probability per interval tends to zero, and the expected arrival rate stays at $\lambda$, the limit of this "Bernoulli sieve" is the Poisson process. It is the standard model for random arrivals and the starting point of queueing theory, reliability and actuarial science.

The most counterintuitive property of the Poisson process is **memorylessness**: having already waited 10 minutes on the platform, the distribution of the remaining wait for the next bus is exactly the same as on arrival. The bus does not remember how long you have waited. This property makes computation extremely simple, and it has also drawn repeated criticism—real buses tend to bunch up and do not satisfy memorylessness.

This lecture answers: why do "independent increments + stationary increments + rarity" force the Poisson distribution? Why are interarrival times exactly exponential? And, given that $n$ events arrived in some interval, what law do their arrival times follow?

## II. Rigorous Definitions

**Counting process** $\{N(t),t\ge0\}$: $N(t)$ is the number of events arriving in $[0,t]$, taking non-negative integer values, with $N(0)=0$, right-continuous and non-decreasing sample paths, and jumps of size $1$.

**Independent increments**: for any $0\le t_1<t_2<\cdots<t_n$, the increments

$$N(t_2)-N(t_1),\ N(t_3)-N(t_2),\ \dots,\ N(t_n)-N(t_{n-1})$$

are mutually independent.

**Stationary increments**: the distribution of $N(t+s)-N(t)$ depends only on the length $s$ of the interval, not on its starting point $t$.

**Rarity (orderliness)**:

$$\lim_{h\to0}\frac{P(N(h)\ge2)}{h}=0$$

that is, in a sufficiently short interval two events almost never arrive simultaneously.

**Poisson process**: a counting process satisfying the three properties above with

$$P(N(t)=k)=\frac{(\lambda t)^k}{k!}e^{-\lambda t},\qquad k=0,1,2,\dots$$

where $\lambda>0$ is called the intensity (the mean number of arrivals per unit time). Equivalently, $N(t)\sim\operatorname{Poisson}(\lambda t)$ and

$$E[N(t)]=\operatorname{Var}[N(t)]=\lambda t$$

**Interarrival times and waiting times**: let $T_1$ be the time of the first arrival, $T_n$ the interval between the $n$-th and the $(n-1)$-th arrival, and $S_n=T_1+\cdots+T_n$ the time of the $n$-th arrival. Then

$$T_n\overset{\text{i.i.d.}}{\sim}\operatorname{Exp}(\lambda),\qquad S_n\sim\operatorname{Erlang}(n,\lambda)$$

The Erlang density is

$$f_{S_n}(t)=\frac{\lambda^nt^{n-1}}{(n-1)!}e^{-\lambda t},\qquad t\ge0$$

**Non-homogeneous Poisson process**: replace the constant $\lambda$ by a time-dependent function $\lambda(t)\ge0$ and let

$$m(t)=\int_0^t\lambda(s)\,ds$$

then $N(t)-N(s)\sim\operatorname{Poisson}\big(m(t)-m(s)\big)$.

**Compound Poisson process**: $S(t)=\sum_{i=1}^{N(t)}X_i$, where the $X_i$ are independent and identically distributed, independent of $N(t)$, and $X_i$ is the "size" of the $i$-th event (claim amount, order value, and so on).

## III. Why These Definitions

**Why do independence, stationarity and rarity force the Poisson distribution?** Divide $[0,t]$ into $n$ small intervals of length $t/n$. By rarity each interval holds at most one event; by stationarity each has an event with the same probability $p_n\approx\lambda t/n$; by independence the intervals are independent. So $N(t)$ approximately follows the binomial distribution $B(n,p_n)$:

$$P(N(t)=k)\approx\binom{n}{k}\left(\frac{\lambda t}{n}\right)^k\left(1-\frac{\lambda t}{n}\right)^{n-k}$$

Let $n\to\infty$. Expanding the binomial coefficient:

$$\binom{n}{k}\frac{(\lambda t)^k}{n^k}=\frac{n(n-1)\cdots(n-k+1)}{n^k}\cdot\frac{(\lambda t)^k}{k!}\to\frac{(\lambda t)^k}{k!}$$

and

$$\left(1-\frac{\lambda t}{n}\right)^{n-k}=\left(1-\frac{\lambda t}{n}\right)^{n}\left(1-\frac{\lambda t}{n}\right)^{-k}\to e^{-\lambda t}\cdot1$$

Multiplying the two gives the Poisson probability. So "independent, stationary, rare" are not three isolated assumptions but the three necessary conditions for a limit of binomial distributions.

**One can also derive it from a differential equation.** Write $p_k(t)=P(N(t)=k)$. In $[t,t+h]$, by rarity, the probability of one arrival is $\lambda h+o(h)$, of none is $1-\lambda h+o(h)$, and of two is $o(h)$. Hence

$$p_0(t+h)=p_0(t)\big(1-\lambda h+o(h)\big)\quad\Longrightarrow\quad p_0'(t)=-\lambda p_0(t)$$

With $p_0(0)=1$ this gives $p_0(t)=e^{-\lambda t}$. For $k\ge1$,

$$p_k(t+h)=p_k(t)(1-\lambda h)+p_{k-1}(t)\lambda h+o(h)$$

that is,

$$p_k'(t)=-\lambda p_k(t)+\lambda p_{k-1}(t)$$

By induction (or by multiplying by $e^{\lambda t}$ and integrating) one gets $p_k(t)=\dfrac{(\lambda t)^k}{k!}e^{-\lambda t}$. This derivation also explains the meaning of the intensity $\lambda$: the instantaneous probability of an arrival per unit time.

**Why are interarrival times exponential?** The first arrival time exceeding $t$ is equivalent to no event arriving in $[0,t]$:

$$P(T_1>t)=P(N(t)=0)=e^{-\lambda t}$$

which is exactly the survival function of the exponential distribution with parameter $\lambda$. For general $T_n$, by independent increments the process "starts afresh" after each arrival, so all intervals are independent and identically distributed.

**Where does memorylessness come from?** For $s,t\ge0$,

$$P(T_1>s+t\mid T_1>s)=\frac{P(T_1>s+t)}{P(T_1>s)}=\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}=e^{-\lambda t}=P(T_1>t)$$

Given that one has waited $s$, the probability of waiting $t$ more is the same as waiting $t$ from scratch. This is the memorylessness unique to the exponential distribution.

> Counterexample (the conditions are indispensable): if stationary increments are dropped, say the arrival rate varies with time $\lambda(t)=2t$ (busier later), then $N(t)$ is no longer Poisson (variance no longer equals mean) and the intervals are no longer exponential with a common parameter. If independent increments are dropped, say events arrive in clusters (three at a time), rarity fails, the counts become over-dispersed, and the Poisson model badly underestimates peak risk.

**Given $N(t)=n$, why are the arrival times uniform?** For $0<s<t$,

$$P(T_1\le s\mid N(t)=1)=\frac{P(N(s)=1,N(t)-N(s)=0)}{P(N(t)=1)}=\frac{\lambda se^{-\lambda s}\cdot e^{-\lambda(t-s)}}{\lambda te^{-\lambda t}}=\frac{s}{t}$$

which is exactly the distribution function of the uniform distribution on $[0,t]$. Generalizing to $n$ arrivals: given $N(t)=n$, the joint distribution of the $n$ arrival times is that of the order statistics of $n$ independent $U(0,t)$ samples. Intuitively, the Poisson process "scatters points uniformly" in time, and conditional on the total number of points, each point is equally likely to fall anywhere.

## IV. Intuition and Pictures

| Object | Distribution | Meaning |
|---|---|---|
| $N(t)$ | $\operatorname{Poisson}(\lambda t)$ | number of arrivals in time $t$ |
| $T_i$ | $\operatorname{Exp}(\lambda)$ | interval between consecutive arrivals |
| $S_n$ | $\operatorname{Erlang}(n,\lambda)$ | time of the $n$-th arrival |
| $N(t)-N(s)$ | $\operatorname{Poisson}(\lambda(t-s))$ | number of arrivals in an interval |

> Intuition: the Poisson process is a "uniform scatterer"—any two intervals of equal length receive the same expected number of points and do not influence each other; the spacings are random with mean $1/\lambda$ but can be arbitrarily short or arbitrarily long. Memorylessness means the machine has no timer: at every instant it starts waiting for the next point from zero.

Three important operations:

- **Superposition**: the union of two independent Poisson processes (intensities $\lambda_1,\lambda_2$) is again Poisson with intensity $\lambda_1+\lambda_2$.
- **Thinning**: label each event independently type $1$ with probability $p$ and type $2$ with $1-p$; then the two classes are each Poisson processes with intensities $\lambda p$ and $\lambda(1-p)$, and are independent.
- **Conditional uniformity**: given $N(t)=n$, the arrival times are the ordered $n$ independent uniform points.

Right versus wrong:

- Wrong: the intervals of a Poisson process are the constant $1/\lambda$. Right: the intervals are exponential random variables; $1/\lambda$ is only the mean.
- Wrong: after waiting a long time, the next bus "is due". Right: the exponential is memoryless, and the residual wait is exponential with the same parameter.
- Wrong: the variance of $N(t)$ is $\sqrt{\lambda t}$. Right: both the mean and the variance of the Poisson distribution are $\lambda t$.

## V. Worked Examples

### Example 1 (Basic: computing Poisson probabilities directly)

Problem: a call centre receives on average $2$ calls per minute, arrivals following a Poisson process. Find the probability of exactly $5$ calls in $3$ minutes and the probability of at least $1$ call in $3$ minutes.

Approach: $N(3)\sim\operatorname{Poisson}(\lambda t)=\operatorname{Poisson}(6)$.

Solution:

$$P(N(3)=5)=\frac{6^5e^{-6}}{5!}=\frac{7776\cdot e^{-6}}{120}=64.8\,e^{-6}$$

With $e^{-6}\approx0.00247875$,

$$P(N(3)=5)\approx64.8\times0.00247875\approx0.1606$$

At least one call:

$$P(N(3)\ge1)=1-P(N(3)=0)=1-e^{-6}\approx1-0.002479=0.9975$$

> Comment: the Poisson probability mass concentrates near the mean $6$, and the probability of exactly $5$ calls is only about $16\%$. Simplify fractions before substituting $e^{-6}$ to avoid loss of precision from multiplying large numbers.

### Example 2 (Intermediate: conditional distribution and memorylessness)

Problem: same $\lambda=2$. (a) Given no calls in the first $2$ minutes, find the probability of still no calls over the next $3$ minutes. (b) Given exactly $5$ calls in $10$ minutes, find the probability that all $5$ fall in the first $3$ minutes.

Approach: (a) use independent increments or exponential memorylessness; (b) use "given the count, arrival times are uniform".

Solution: **(a)** By independent increments, the arrivals in $[2,5]$ are independent of the history in $[0,2]$:

$$P(N(5)-N(2)=0\mid N(2)=0)=P(N(3)=0)=e^{-2\cdot3}=e^{-6}\approx0.002479$$

Alternatively: the first arrival time $T_1\sim\operatorname{Exp}(2)$ and, given $T_1>2$, memorylessness gives

$$P(T_1>5\mid T_1>2)=P(T_1>3)=e^{-6}$$

The two methods agree.

**(b)** Given $N(10)=5$, the five arrival times are the order statistics of five independent $U(0,10)$ samples. Each point falls in the first $3$ minutes with probability $3/10$, independently, so

$$P(\text{all in the first }3\text{ minutes}\mid N(10)=5)=\left(\frac{3}{10}\right)^5=\frac{243}{100000}=0.00243$$

> Comment: the key to (b) is "conditional uniformity": do not use Poisson probabilities again, because the condition $N(10)=5$ already fixes the total count, and all that remains is where the five points fall. This trick is extremely common in queueing simulation: first draw the total number of arrivals, then scatter the points uniformly over the interval.

### Example 3 (Advanced: non-homogeneous Poisson process)

Problem: a system has an arrival rate growing with time, $\lambda(t)=2t$ (units: per hour, $t$ in hours). Find the probability of exactly $1$ arrival in $3$ hours, and the mean and variance of the number of arrivals in those $3$ hours.

Approach: the counts of a non-homogeneous Poisson process follow a Poisson distribution with parameter $m(t)=\int_0^t\lambda(s)ds$.

Solution: first compute the cumulative intensity:

$$m(3)=\int_0^3 2s\,ds=\big[s^2\big]_0^3=9$$

so $N(3)\sim\operatorname{Poisson}(9)$ and

$$P(N(3)=1)=\frac{9^1e^{-9}}{1!}=9e^{-9}\approx9\times0.0001234=0.00111$$

Both the mean and the variance equal $m(3)=9$.

> Comment: in the non-homogeneous case, $\lambda t$ must be replaced by $\int_0^t\lambda(s)ds$. Many people simply write $\lambda(3)\cdot3=18$, which is wrong—the intensity is changing, so one must integrate. Also, a non-homogeneous Poisson process still has independent increments but not stationary ones, so the distributions over different intervals depend only on their own cumulative intensities.

### Example 4 (Advanced: compound Poisson and thinning)

Problem: an insurance company has a daily number of claims $N\sim\operatorname{Poisson}(3)$, each claim amount $X_i$ i.i.d. with $E[X]=1000$ yuan and $E[X^2]=2\times10^6$ yuan$^2$. Find the mean and variance of the total daily claim $S=\sum_{i=1}^{N}X_i$; and if each claim is independently classified as "large" with probability $0.2$, find the distribution of the number of large claims.

Approach: the Wald-type formulas for compound Poisson; thinning uses binomial decomposition.

Solution: by conditional expectation,

$$E[S]=E\big[E[S\mid N]\big]=E[N\,E[X]]=3\times1000=3000\text{ yuan}$$

For the variance use the law of total variance:

$$\operatorname{Var}(S)=E[\operatorname{Var}(S\mid N)]+\operatorname{Var}(E[S\mid N])$$

Given $N=n$, $S$ is a sum of $n$ i.i.d. variables with $\operatorname{Var}(S\mid N=n)=n\operatorname{Var}(X)$; also $E[S\mid N]=N E[X]$. Hence

$$\operatorname{Var}(S)=E[N]\operatorname{Var}(X)+\operatorname{Var}(N)(E[X])^2$$

$$\operatorname{Var}(X)=E[X^2]-(E[X])^2=2\times10^6-10^6=10^6$$

$$\operatorname{Var}(S)=3\times10^6+3\times10^6=6\times10^6$$

so the standard deviation is about $2449$ yuan.

Large claims: each arrival is labelled independently with $p=0.2$, so by the thinning property the number of large claims follows $\operatorname{Poisson}(\lambda p)=\operatorname{Poisson}(0.6)$ and is independent of the number of small claims.

> Comment: the variance of a compound Poisson has two parts: the first, $E[N]\operatorname{Var}(X)$, comes from the randomness of the count, and the second, $\operatorname{Var}(N)(E[X])^2$, from the randomness of each amount. Omitting the second term is a common error. The thinning property says that independent labelling does not destroy the Poisson property, it only scales the intensity down proportionally.

## VI. Common Errors and Pitfalls

1. **Confusing the distributions of counts and intervals**: wrong—treating $N(t)$ as exponential or $T_i$ as Poisson. Why wrong—counts are discrete Poisson, intervals are continuous exponential. Right—$N(t)\sim\operatorname{Poisson}(\lambda t)$, $T_i\sim\operatorname{Exp}(\lambda)$.
2. **Misusing memorylessness**: wrong—"I have waited a long time, so it must be close". Why wrong—the exponential is memoryless and the residual wait is exponential with the same parameter, independent of the elapsed time. Right—reset and use $\operatorname{Exp}(\lambda)$ again.
3. **Still using $\lambda t$ in the non-homogeneous case**: wrong—writing $N(t)\sim\operatorname{Poisson}(\lambda(t)t)$. Why wrong—the intensity varies with time, so the parameter should be the cumulative intensity $\int_0^t\lambda(s)ds$. Right—integrate first, then substitute.
4. **Dropping a term in the compound Poisson variance**: wrong—writing $\operatorname{Var}(S)=E[N]\operatorname{Var}(X)$. Why wrong—the count $N$ is itself random and contributes $\operatorname{Var}(N)(E[X])^2$. Right—use the law of total variance and keep both terms.
5. **Treating conditional uniformity as unconditional uniformity**: wrong—claiming the arrival times are uniform without conditioning on $N(t)=n$. Why wrong—unconditionally the arrival times are not uniform (the count is random). Right—first condition on "exactly $n$".
6. **Approximating "at least one" by $\lambda t$**: wrong—$P(N(t)\ge1)\approx\lambda t$. Why wrong—this is an approximation valid only for very small $\lambda t$; the exact value is $1-e^{-\lambda t}$. Right—use the complement $1-P(N=0)$.
7. **Multiplying intensities under superposition**: wrong—the combined intensity of two Poisson streams is $\lambda_1\lambda_2$. Why wrong—arrival rates add, they do not multiply. Right—$\lambda_1+\lambda_2$.

## VII. Summary and Mnemonics

Key points:

- Poisson process = independent increments + stationary increments + rarity; counts $N(t)\sim\operatorname{Poisson}(\lambda t)$, mean and variance both $\lambda t$.
- Interarrival times are i.i.d. $\operatorname{Exp}(\lambda)$; the time of the $n$-th arrival follows $\operatorname{Erlang}(n,\lambda)$.
- Memorylessness is the fingerprint of the exponential distribution and the most idealized feature of the Poisson model.
- Given $N(t)=n$, the arrival times are the order statistics of $n$ independent $U(0,t)$ samples.
- Independent Poisson streams superpose (intensities add) and can be thinned by a probability (intensities scale down), with the two sub-streams independent.
- The non-homogeneous case uses the cumulative intensity $\int_0^t\lambda(s)ds$; compound Poisson uses the total expectation and total variance formulas.

**Mnemonic: independent, stationary, rare; Poisson counts, exponential gaps; memoryless is the special mark; given the count, points fall uniformly.**

`,
  },
  'brownian-martingale': {
    chapter: 'Chapter 3 Brownian Motion and Martingales',
    title: 'Brownian Motion and Martingales',
    summary:
      'Continuous-time random walks: Brownian paths are everywhere continuous yet nowhere differentiable; a martingale is the mathematical embodiment of a "fair game".',
    keyPoints: [
      'Brownian motion: independent, stationary Gaussian increments and continuous paths',
      'Paths are continuous but nowhere differentiable; the law of the iterated logarithm describes extreme fluctuations',
      'Martingale = fair game: E[Mₜ|Fₛ] = Mₛ',
      'Optional stopping: E[Mτ] = E[M₀]; no arbitrage ⟺ existence of a martingale measure',
    ],
    content: String.raw`

In 1827 the botanist Brown saw pollen grains jittering ceaselessly in water under the microscope. In 1905 Einstein used that jitter to infer the existence of water molecules. Today we know Brownian motion as the fundamental model of continuous-time randomness: it is diffusion in physics, the logarithm of stock prices in finance, and noise in engineering.

Seen discretely it is easy to understand: a gambler steps one unit left or right with equal probability. After $n$ steps the standard deviation of the position is $\sqrt{n}$. Shrink the step to $1/\sqrt{n}$ and the time to $1/n$, and the limit is Brownian motion. This scaling—"time by $n$, space by $\sqrt{n}$"—explains why Brownian paths, though continuous, are rough everywhere and differentiable nowhere.

Paired with Brownian motion is another concept, the **martingale**: the mathematician's fair game. However much you have won or lost, the conditional expected gain on the next hand is zero. Brownian motion is itself a martingale; more generally, $B_t^2-t$ is one too—and that strange correction term $-t$ is the germ of $(dB_t)^2=dt$ in stochastic calculus.

This lecture answers three questions: why is Brownian motion non-differentiable? Why is a martingale the rigorous definition of "fair"? And how can the optional stopping theorem compute the gambler's ruin probability in one line?

## II. Rigorous Definitions

**Standard Brownian motion (Wiener process)** $\{B_t,t\ge0\}$ is a process satisfying the following four properties:

1. $B_0=0$;
2. **Independent increments**: for $0\le s<t$, $B_t-B_s$ is independent of $\{B_u:0\le u\le s\}$;
3. **Stationary Gaussian increments**: $B_t-B_s\sim N(0,t-s)$;
4. **Continuous paths**: $t\mapsto B_t$ is continuous almost surely.

Immediately from the definition: $B_t\sim N(0,t)$, $E[B_t]=0$, $\operatorname{Var}(B_t)=t$, and the covariance is

$$\operatorname{Cov}(B_s,B_t)=\min(s,t)$$

**Information flow (filtration)** $\{\mathcal{F}_t\}$: $\mathcal{F}_t$ represents all information observable up to time $t$, usually taken as the completion of $\sigma(B_u:u\le t)$. $\mathcal{F}_t$ grows with $t$, like a notebook that keeps getting thicker.

**Martingale**: a stochastic process $\{M_t\}$ is a martingale with respect to $\{\mathcal{F}_t\}$ if

1. $M_t$ is adapted to $\mathcal{F}_t$ (the value of $M_t$ is known at time $t$);
2. $E[|M_t|]<\infty$;
3. for any $s\le t$,

$$E[M_t\mid\mathcal{F}_s]=M_s$$

**Submartingale and supermartingale**: if $E[M_t\mid\mathcal{F}_s]\ge M_s$ it is a submartingale (upward tendency); if $\le$, a supermartingale.

**Stopping time**: a random time $\tau$ is a stopping time if for every $t\ge0$ the event $\{\tau\le t\}\in\mathcal{F}_t$. Intuitively: by time $t$ one can decide whether the process has already stopped, without peeking into the future. For example, "the first time the process reaches $a$" is a stopping time; "the time at which Brownian motion attains its maximum on $[0,1]$" is not (it requires knowing the whole path).

**Quadratic variation**: for a partition $0=t_0<t_1<\cdots<t_n=t$ of $[0,t]$, if

$$\sum_{i=0}^{n-1}(B_{t_{i+1}}-B_{t_i})^2$$

converges in probability to a limit as the partition becomes finer, that limit is called the quadratic variation $[B]_t$. For Brownian motion,

$$[B]_t=t$$

**Optional stopping theorem**: if $M$ is a martingale and $\tau$ a stopping time, then under one of the following conditions,

$$E[M_\tau]=E[M_0]$$

The conditions include: $\tau$ is bounded; or there is a constant $C$ with $|M_{t\wedge\tau}|\le C$; or $E[\tau]<\infty$ with bounded increments.

**Reflection principle**: for $a>0$,

$$P\left(\max_{0\le s\le t}B_s\ge a\right)=2P(B_t\ge a)=2\left(1-\Phi\left(\frac{a}{\sqrt t}\right)\right)$$

## III. Why These Definitions

**Why can Brownian motion be viewed as the limit of a random walk?** Let $S_n=\sum_{i=1}^{n}\xi_i$ with $\xi_i=\pm1$ equally likely. Then $E[S_n]=0$ and $\operatorname{Var}(S_n)=n$. Construct

$$B_t^{(n)}=\frac{1}{\sqrt n}S_{\lfloor nt\rfloor}$$

By the central limit theorem $B_1^{(n)}\to N(0,1)$; more generally, the multidimensional CLT gives convergence of the finite-dimensional distributions to Gaussian ones, with the variance of the limiting increment equal to the time difference. This is Donsker's theorem. The key to the scaling is "divide space by $\sqrt n$": dividing by $n$ would give a horizontal line, and not dividing at all would make the variance explode.

**Why are the paths nowhere differentiable?** Consider the difference quotient

$$\frac{B_{t+h}-B_t}{h}$$

The numerator is $N(0,h)$, with standard deviation $\sqrt h$. So the difference quotient has standard deviation $\dfrac{\sqrt h}{h}=\dfrac{1}{\sqrt h}\to\infty$. That is, the smaller $h$ is, the wilder the difference quotient, and it cannot converge to a finite limit. Strictly, Brownian sample paths are almost surely nowhere differentiable. This immediately declares ordinary calculus invalid for Brownian motion and forces the development of stochastic calculus.

**Why is the quadratic variation $t$?** Divide $[0,t]$ into $n$ equal parts of length $\Delta=t/n$. The increment $\Delta B_i\sim N(0,\Delta)$, so $E[(\Delta B_i)^2]=\Delta$ and $\operatorname{Var}((\Delta B_i)^2)=2\Delta^2$. Hence

$$E\left[\sum_{i=1}^{n}(\Delta B_i)^2\right]=n\Delta=t$$

$$\operatorname{Var}\left[\sum_{i=1}^{n}(\Delta B_i)^2\right]=n\cdot2\Delta^2=\frac{2t^2}{n}\to0$$

By Chebyshev's inequality the sum of squares converges in probability to $t$. This is the rigorous origin of $(dB_t)^2=dt$: the square of a Brownian increment is not a higher-order infinitesimal but of the same order as $dt$.

**Why does the definition of a martingale use conditional expectation?** Let $M_t$ be your wealth at time $t$. A fair game means: given all information $\mathcal{F}_s$ up to time $s$, you cannot predict whether the next stretch gains or loses, and the conditional expected wealth still equals the current wealth $M_s$. In symbols, $E[M_t\mid\mathcal{F}_s]=M_s$. If $\mathcal{F}_s$ is replaced by "knowing nothing", one only gets the unconditional expectation $E[M_t]=E[M_0]$, which is too weak—it would allow the strategy "run away when winning, hold on when losing" to profit. The conditional expectation rules out exploiting historical information.

**Why is Brownian motion a martingale?** For $s<t$,

$$E[B_t\mid\mathcal{F}_s]=E[B_s+(B_t-B_s)\mid\mathcal{F}_s]=B_s+E[B_t-B_s]=B_s$$

because the increment is independent of $\mathcal{F}_s$ and has zero mean. Likewise, $B_t^2-t$ is a martingale:

$$E[B_t^2-t\mid\mathcal{F}_s]=E\big[(B_s+(B_t-B_s))^2\mid\mathcal{F}_s\big]-t$$

$$=B_s^2+2B_sE[B_t-B_s]+E[(B_t-B_s)^2]-t=B_s^2+(t-s)-t=B_s^2-s$$

**Why does the optional stopping theorem need conditions?** Take $\tau$ to be the first time Brownian motion reaches $1$. Then $B_{t\wedge\tau}$ is a martingale and $E[B_{t\wedge\tau}]=0$. But $B_\tau=1$, so writing $E[B_\tau]=E[B_0]=0$ would contradict this. The problem is that $\tau$ is unbounded and $E[\tau]=\infty$, so the limit cannot be moved inside the expectation. Thus "bounded stopping time" or "uniform integrability" is not a technical decoration but a premise of the theorem.

> Counterexample (the conditions are indispensable): $X_t=B_t+\mu t$ ($\mu\ne0$) is a continuous Gaussian process with independent increments and $X_t-X_s\sim N(\mu(t-s),t-s)$, yet it is not a martingale:

$$E[X_t\mid\mathcal{F}_s]=X_s+\mu(t-s)\ne X_s$$

It has drift, representing "the house's cut". This shows that "Gaussian + continuous" is not enough to be Brownian motion; the mean must vanish.

## IV. Intuition and Pictures

| Object | Intuition | Key property |
|---|---|---|
| Brownian motion | a continuously jittering random curve | independent Gaussian increments, variance equal to time |
| Martingale | the wealth of a fair game | conditional expectation unchanged |
| Stopping time | a rule for cashing in that does not peek at the future | $\{\tau\le t\}$ decided by $\mathcal{F}_t$ |
| Quadratic variation | the "cumulative squared wobble" of the path | $[B]_t=t$ |
| Reflection principle | mirror the path after it hits a level | the maximum distribution becomes computable |

> Intuition: Brownian motion is like a drunk ant crawling on paper, jittering at every instant, its line connected but never smooth. Magnify any small piece and the shape of the burrs resembles the whole—this is self-similarity:

$$\{B_{ct}\}_{t\ge0}\overset{d}{=}\{\sqrt c\,B_t\}_{t\ge0}$$

Stretching time by $c$ is equivalent to stretching space by $\sqrt c$. This is also the origin of fractals: however much you zoom in, you never see a smooth straight line.

A martingale is like a "mirror of fairness": from whatever stretch of history you look, the future average is even-handed. But fairness is not convergence—the symmetric random walk is a martingale yet crosses back and forth infinitely often; a martingale needs boundedness or uniform integrability to converge.

Right versus wrong:

- Wrong: Brownian motion is continuous, hence almost everywhere differentiable. Right: continuous but almost surely nowhere differentiable.
- Wrong: a martingale always converges to some random variable. Right: a martingale only guarantees an unchanged conditional expectation; convergence needs extra conditions (such as $L^2$ boundedness).
- Wrong: $B_{ct}\sim cB_t$. Right: $B_{ct}\sim\sqrt c\,B_t$; the variance scales by $c$, not $c^2$.

## V. Worked Examples

### Example 1 (Basic: computing increment distributions)

Problem: find $P(B_4-B_1>1)$ and $P(|B_2|>1)$.

Approach: use $B_4-B_1\sim N(0,3)$ and $B_2\sim N(0,2)$, standardize, and use the standard normal distribution function $\Phi$.

Solution: by stationary Gaussian increments, $B_4-B_1\sim N(0,4-1)=N(0,3)$. Standardizing:

$$P(B_4-B_1>1)=P\left(\frac{B_4-B_1}{\sqrt3}>\frac{1}{\sqrt3}\right)=1-\Phi\left(\frac{1}{\sqrt3}\right)$$

$\dfrac{1}{\sqrt3}\approx0.5774$ and $\Phi(0.5774)\approx0.718$, so the probability is about $0.282$.

Second question: $B_2/\sqrt2\sim N(0,1)$,

$$P(|B_2|>1)=P\left(\left|\frac{B_2}{\sqrt2}\right|>\frac{1}{\sqrt2}\right)=2\left(1-\Phi\left(\frac{1}{\sqrt2}\right)\right)$$

$\dfrac{1}{\sqrt2}\approx0.7071$ and $\Phi(0.7071)\approx0.760$, so the probability is about $2\times0.240=0.480$.

> Comment: the variance of a Brownian increment is the "time difference", not "the time". The variance of $B_4-B_1$ is $3$, not $4$ or $1$. This is the most common computational error.

### Example 2 (Intermediate: verifying a martingale)

Problem: prove that $M_t=B_t^2-t$ is a martingale, and find $\operatorname{Var}(B_t^2)$.

Approach: use independent increments together with $E[B_t^2]=t$ and $E[B_t^4]=3t^2$.

Solution: for $s<t$, let $\Delta=B_t-B_s$; then $\Delta$ is independent of $\mathcal{F}_s$ with $\Delta\sim N(0,t-s)$. Hence

$$E[B_t^2-t\mid\mathcal{F}_s]=E\big[(B_s+\Delta)^2\mid\mathcal{F}_s\big]-t$$

$$=B_s^2+2B_sE[\Delta\mid\mathcal{F}_s]+E[\Delta^2]-t$$

$$=B_s^2+0+(t-s)-t=B_s^2-s$$

so $E[M_t\mid\mathcal{F}_s]=M_s$, and $E|M_t|\le E[B_t^2]+t=2t<\infty$; therefore it is a martingale.

Variance: $B_t\sim N(0,t)$ with fourth moment $E[B_t^4]=3t^2$, so

$$\operatorname{Var}(B_t^2)=E[B_t^4]-(E[B_t^2])^2=3t^2-t^2=2t^2$$

> Comment: $B_t^2-t$ is "the energy of Brownian motion minus the time"; it is a martingale precisely because the variance of Brownian motion equals the time. Replacing $t$ by $ct$ gives a martingale only when $c=1$. This example is the discrete version of Itô's formula $d(B_t^2)=2B_tdB_t+dt$: the $dt$ term is exactly what compensates the second-order variation.

### Example 3 (Advanced: optional stopping and first passage times)

Problem: let $a,b>0$ and $\tau=\inf\{t\ge0:B_t=a\text{ or }B_t=-b\}$. Find $P(B_\tau=a)$ and $E[\tau]$.

Approach: use the bounded stopping time $\tau\wedge n$ and then take limits. Two martingales give the probability and the expected time respectively.

Solution: **probability**. $B_t$ is a martingale and $\tau\wedge n$ is bounded, so by the optional stopping theorem

$$E[B_{\tau\wedge n}]=E[B_0]=0$$

As $n\to\infty$, $\tau\wedge n\to\tau$ (almost surely) and $|B_{\tau\wedge n}|\le\max(a,b)$, so by dominated convergence

$$E[B_\tau]=0$$

Let $P(B_\tau=a)=p$; then $P(B_\tau=-b)=1-p$, hence

$$a\,p-b(1-p)=0\quad\Longrightarrow\quad p=\frac{b}{a+b}$$

**Expected time**. $B_t^2-t$ is a martingale, and applying the optional stopping theorem to $\tau\wedge n$ in the same way gives

$$E[B_{\tau\wedge n}^2]=E[\tau\wedge n]$$

As $n\to\infty$ the left side tends to $B_\tau^2$, dominated by $\max(a^2,b^2)$, so

$$E[B_\tau^2]=a^2p+b^2(1-p)=a^2\frac{b}{a+b}+b^2\frac{a}{a+b}=\frac{ab(a+b)}{a+b}=ab$$

On the right, monotone convergence gives $E[\tau\wedge n]\to E[\tau]$ (possibly infinite). Therefore

$$E[\tau]=ab$$

In particular, for $a=b=1$, $P(B_\tau=1)=1/2$ and $E[\tau]=1$.

> Comment: the key here is "truncate first, then take the limit". Applying $E[B_\tau]=0$ directly to the unbounded stopping time $\tau$ is dangerous—one must first prove that the limit can be exchanged. Here dominated convergence ($B$ is bounded) and monotone convergence ($\tau\wedge n$ increasing) are used, so it is legitimate. $E[\tau]=ab$ also shows that in the symmetric case, although one side is certainly reached, the mean waiting time is finite (equal to $1$) even though $\tau$ is unbounded.

### Example 4 (Advanced: the reflection principle)

Problem: find $P\left(\max_{0\le s\le t}B_s\ge a\right)$ for $a>0$.

Approach: set up a one-to-one correspondence between "having reached $a$" and "ending above $a$".

Solution: let $M_t=\max_{0\le s\le t}B_s$. The event $\{M_t\ge a\}$ splits into two disjoint parts:

$$\{M_t\ge a\}=\{B_t\ge a\}\cup\{M_t\ge a,\ B_t<a\}$$

For the second part, let $\tau_a=\inf\{s:B_s=a\}$. After $\tau_a$, reflect the path in the horizontal line $a$ and define

$$\tilde B_s=\begin{cases}B_s,&s\le\tau_a\\2a-B_s,&s>\tau_a\end{cases}$$

By the strong Markov property and symmetry of Brownian motion, $\tilde B$ is again a Brownian motion, and after reflection the endpoint is $2a-B_t>a$. So "having reached $a$ and ending below $a$" corresponds one-to-one with "ending above $a$", with equal probability:

$$P(M_t\ge a,\ B_t<a)=P(B_t>a)$$

Therefore

$$P(M_t\ge a)=P(B_t\ge a)+P(B_t>a)=2P(B_t\ge a)=2\left(1-\Phi\left(\frac{a}{\sqrt t}\right)\right)$$

> Comment: the beauty of the reflection principle is that it turns "the path maximum", an event depending on the whole history, into "the endpoint position", an event depending on a single random variable. It holds only for continuous, symmetric Brownian motion; the drifted $B_t+\mu t$ requires a change of measure (Girsanov's theorem) and cannot be reflected directly.

## VI. Common Errors and Pitfalls

1. **Treating Brownian motion as an ordinary differentiable function**: wrong—writing $dB_t/dt$ and applying the chain rule. Why wrong—the paths are almost surely nowhere differentiable and $dB/dt$ does not exist. Right—use stochastic calculus and remember $(dB_t)^2=dt$.
2. **Assuming a martingale must converge**: wrong—concluding from $E[M_t]=E[M_0]$ that $M_t$ has a limit. Why wrong—a martingale controls only the mean, not the fluctuations; the symmetric random walk is a counterexample. Right—$L^2$ boundedness or uniform integrability is needed.
3. **Abusing the optional stopping theorem**: wrong—writing $E[M_\tau]=E[M_0]$ for an arbitrary stopping time. Why wrong—an unbounded stopping time may prevent exchanging the limit and the expectation. Right—truncate with $\tau\wedge n$ first and verify dominated or monotone convergence.
4. **Confusing Brownian motion with a drifted process**: wrong—treating $B_t+\mu t$ as standard Brownian motion. Why wrong—it has a non-zero mean, is not a martingale, and its increments have non-zero mean. Right—standard Brownian motion requires $E[B_t]=0$.
5. **Getting the variance scaling wrong**: wrong—writing $B_{ct}\sim cB_t$ or $\operatorname{Var}(B_{ct})=c^2t$. Why wrong—the variance of Brownian motion is linear in time, $\operatorname{Var}(B_{ct})=ct$. Right—$B_{ct}\overset{d}{=}\sqrt c\,B_t$.
6. **Writing the covariance as $\min(s,t)^2$**: wrong—inferring the covariance from $\operatorname{Var}(B_t)=t$. Why wrong—$\operatorname{Cov}(B_s,B_t)=E[B_sB_t]=\min(s,t)$. Right—decompose using $B_t=B_s+(B_t-B_s)$.
7. **Treating a first passage time as a bounded stopping time**: wrong—using $E[B_\tau]=0$ directly without truncation. Why wrong—$\tau$ is unbounded, $E[\tau]$ may be infinite, and exchanging limits is illegitimate. Right—apply the theorem to $\tau\wedge n$ first and then take the limit.

## VII. Summary and Mnemonics

Key points:

- Brownian motion: $B_0=0$, independent increments, $B_t-B_s\sim N(0,t-s)$, continuous paths.
- Paths are continuous but almost surely nowhere differentiable; the quadratic variation is $[B]_t=t$, i.e. $(dB_t)^2=dt$.
- Martingale: $E[M_t\mid\mathcal{F}_s]=M_s$, the mathematician's fair game; both $B_t$ and $B_t^2-t$ are martingales.
- Stopping time: a stopping rule that does not peek at the future; the optional stopping theorem needs boundedness or uniform integrability.
- First passage probability $P(B_\tau=a)=\dfrac{b}{a+b}$; expected first passage time $E[\tau]=ab$.
- The reflection principle turns an extremum event into an endpoint event: $P(\max_{s\le t}B_s\ge a)=2P(B_t\ge a)$.

**Mnemonic: Brownian is continuous, never smooth; a martingale is the fair expected value; stopping times must not peek ahead—truncate first, then take the limit.**

`,
  },

  'ctmc': {
    chapter: 'Chapter 2 Continuous-Time Markov Chains',
    title: 'Continuous-Time Markov Chains',
    summary:
      'A continuous-time Markov chain sojourns in discrete states and jumps at exponential times, replacing the discrete transition matrix P by the rate matrix Q. Birth–death processes, queueing systems and reliability models are all built on it.',
    keyPoints: [
      'Holding times are exponential; memorylessness keeps the process Markovian',
      'Rate matrix Q: q_{ij} is the jump rate from i to j, q_{ii} = -Σ_{j≠i} q_{ij}',
      'Kolmogorov forward and backward equations: the derivative of P in t equals QP = PQ',
      'Stationary distribution π satisfies πQ = 0 (the analogue of πP = π)',
      'Birth–death special case: birth rates λ_n, death rates μ_n, with a product-form stationary distribution',
    ],
    content: String.raw`

A discrete-time Markov chain jumps once per step: from step $n$ to step $n+1$, time is cut into uniform slots. But reality is often not like that: a machine runs for a random time and then suddenly fails, a repairman takes a random time to fix it, and then it runs again—the time spent in a state is random, and so is the instant of jumping to the next state.

Processes of this "continuous time, discrete state" kind are called continuous-time Markov chains (CTMC). Their language is not "where does one step go" but "at what rate per second does one move". The transition matrix $P$ is replaced by the rate matrix $Q$: the entries of $P$ are probabilities (dimensionless) while those of $Q$ are rates (units $1/$time). Customer arrivals and service completions in a queueing system, the conversion of molecules in a chemical reaction, the failure and repair of components in reliability theory—all are naturally CTMCs.

This lecture answers three questions: why must holding times be exponential? How does the rate matrix $Q$ determine the transition probabilities $P(t)$? And how does one compute the long-run fraction of time spent in each state?

## II. Rigorous Definitions

Let $\{X(t),t\ge0\}$ be a stochastic process with values in a countable state set $S$.

**Markov property**: for any $t,s\ge0$ and states $i,j$,

$$P(X(t+s)=j\mid X(t)=i,\ \{X(u):u<t\})=P(X(t+s)=j\mid X(t)=i)$$

**Time homogeneity**: the right-hand side does not depend on $t$.

**Transition probability matrix**:

$$p_{ij}(t)=P(X(t+s)=j\mid X(s)=i),\qquad P(t)=(p_{ij}(t))$$

satisfying $P(0)=I$, $P(t+s)=P(t)P(s)$ (the semigroup property), with rows summing to $1$.

**Holding times**: let $T_i$ be the time the process spends in state $i$ after entering it. The definition of a CTMC requires

$$P(T_i>t)=e^{-q_it},\qquad q_i\ge0$$

i.e. $T_i\sim\operatorname{Exp}(q_i)$ (with $q_i=0$ meaning $T_i=+\infty$, an absorbing state); $q_i$ is called the total rate of leaving state $i$.

**Jump chain (embedded chain)**: after leaving $i$, the probability that the next state is $j$ is

$$p_{ij}=\frac{q_{ij}}{q_i}\quad(j\ne i),\qquad p_{ii}=0$$

where $q_{ij}\ge0$ is the jump rate from $i$ to $j$. If $q_i=0$, $i$ is called an absorbing state.

**Rate matrix (generator)** $Q=(q_{ij})$:

$$q_{ij}\ge0\ (i\ne j),\qquad q_{ii}=-\sum_{j\ne i}q_{ij}=-q_i$$

so every row of $Q$ sums to $0$.

**Kolmogorov equations**:

$$\frac{d}{dt}P(t)=P(t)Q\quad\text{(forward equation)},\qquad \frac{d}{dt}P(t)=QP(t)\quad\text{(backward equation)}$$

with the initial condition $P(0)=I$ and the formal solution

$$P(t)=e^{Qt}$$

**Stationary distribution**: a probability row vector $\pi$ satisfying

$$\pi Q=0,\qquad \sum_i\pi_i=1,\qquad \pi_i\ge0$$

**Birth–death process**: states $0,1,2,\dots$ with only nearest-neighbour jumps:

$$q_{n,n+1}=\lambda_n\ (\text{birth rate}),\qquad q_{n,n-1}=\mu_n\ (\text{death rate}),\qquad \mu_0=0$$

## III. Why These Definitions

**Why must holding times be exponential?** Suppose the holding time follows a general distribution $G$. If one has already stayed $s$, the residual time $T-s\mid T>s$ generally has a distribution depending on $s$. But the Markov property requires "the future depends only on the current state", that is, the distribution of the residual time cannot depend on how long one has already stayed. The only continuous distribution satisfying

$$P(T>s+t\mid T>s)=P(T>t)\quad(\forall s,t\ge0)$$

is the exponential. The proof is short: with $\bar G(t)=P(T>t)$, one has $\bar G(s+t)=\bar G(s)\bar G(t)$, whose continuous solution is $\bar G(t)=e^{-qt}$. So the exponential distribution is not "chosen at random" but a necessary consequence of the Markov property.

**Why do the rows of $Q$ sum to zero?** In a very short time $h$, starting from $i$ the process either stays at $i$ or jumps to some $j\ne i$. The probability of jumping to $j$ is about $q_{ij}h+o(h)$ and of staying at $i$ is $1-q_ih+o(h)$. Normalization gives

$$q_{ii}=-q_i=-\sum_{j\ne i}q_{ij}$$

So the diagonal entries are negative (or zero), the off-diagonal ones non-negative, and the rows sum to zero. This corresponds to "rows sum to $1$" for discrete chains, with "probability" replaced by "rate".

**Why $P(t)=e^{Qt}$?** In $[t,t+h]$, first reach some state at time $t$ and then jump once in the time $h$. By the Markov property,

$$P(t+h)=P(t)\big(I+Qh+o(h)\big)$$

Rearranging, dividing by $h$ and letting $h\to0$ gives $P'(t)=P(t)Q$. This is exactly the matrix form of a linear system of ODEs, with solution $P(t)=e^{Qt}$. Similarly, looking at $[0,h]$ first and then $t$ gives $P'(t)=QP(t)$. The two equations have the same solution because $Q$ commutes with $e^{Qt}$.

**Why does the stationary distribution solve $\pi Q=0$?** Stationarity means $\pi P(t)=\pi$ for all $t$. Differentiating with respect to $t$ and evaluating at $t=0$:

$$0=\left.\frac{d}{dt}\pi P(t)\right|_{t=0}=\pi P'(0)=\pi Q$$

Conversely, if $\pi Q=0$ then $\pi P(t)=\pi e^{Qt}=\pi$ (since $\pi Q^k=0$ for $k\ge1$). So $\pi Q=0$ is equivalent to "the distribution does not change with time".

**How is the stationary distribution of a birth–death process derived?** A birth–death process satisfies detailed balance: in the long run the flux from $n$ to $n+1$ equals the flux back from $n+1$ to $n$,

$$\pi_n\lambda_n=\pi_{n+1}\mu_{n+1}$$

hence

$$\pi_{n+1}=\frac{\lambda_n}{\mu_{n+1}}\pi_n\quad\Longrightarrow\quad\pi_n=\pi_0\prod_{k=0}^{n-1}\frac{\lambda_k}{\mu_{k+1}}$$

and $\sum_n\pi_n=1$ fixes

$$\pi_0=\left(1+\sum_{n=1}^{\infty}\prod_{k=0}^{n-1}\frac{\lambda_k}{\mu_{k+1}}\right)^{-1}$$

The stationary distribution exists when the series converges; when it diverges, the process "escapes to infinity" and has no stationary distribution (for example $\lambda\ge\mu$ in M/M/1).

> Counterexample (the conditions are indispensable): if the holding time is deterministic, say $5$ seconds, the process is no longer a CTMC. Having waited $4$ seconds, you know exactly that it jumps in $1$ second; the future depends on the elapsed time and the Markov property fails. If one insists on non-exponential holding times, one needs semi-Markov processes, or the elapsed time must be incorporated into the state.

**Explosion**: if the jumps get faster and faster so that infinitely many jumps occur in a finite time ($\sum 1/q_n<\infty$), the process "explodes" and the rows of $P(t)$ may sum to less than $1$. Undergraduate treatments usually assume no explosion, i.e. $Q$ is conservative and $\sum_n1/q_n=\infty$.

## IV. Intuition and Pictures

| Discrete chain | Continuous chain |
|---|---|
| transition matrix $P$ (probabilities) | rate matrix $Q$ (rates) |
| one-step transition $p_{ij}$ | instantaneous jump rate $q_{ij}$ |
| $P^n$ | $P(t)=e^{Qt}$ |
| $\pi P=\pi$ | $\pi Q=0$ |
| rows sum to $1$ | rows sum to $0$ |

> Intuition: think of $Q$ as a "flow diagram". Flow from $i$ to $j$ at rate $q_{ij}$, and the total rate out of $i$ is $q_i=-q_{ii}$. The stationary distribution $\pi$ is the balanced flow of this diagram: for each state, the total inflow equals the total outflow. Note that this is not "the water has stopped flowing" but "the water level has stabilized"—individuals keep jumping, only the proportions in the various states are constant.

Two complementary views:

- **Jump-chain view**: first choose the next stop by the embedded chain $p_{ij}=q_{ij}/q_i$, then draw the holding time from $\operatorname{Exp}(q_i)$. Good for simulation.
- **Generator view**: $Q$ gives the instantaneous rate of change directly and $P(t)=e^{Qt}$ gives the transition probabilities at any time. Good for analytic computation.

Right versus wrong:

- Wrong: $q_{ii}$ is positive (the "rate of arriving at oneself"). Right: $q_{ii}=-q_i\le0$; the diagonal is the negative outflow rate.
- Wrong: a CTMC uses $P^n$ for multi-step transitions. Right: use the matrix exponential $e^{Qt}$, because time is continuous.
- Wrong: $q_{ij}$ is a probability. Right: it is a rate that may exceed $1$ (depending on the time unit); only $q_{ij}/q_i$ is a probability.

## V. Worked Examples

### Example 1 (Basic: two-state machine model)

Problem: a machine has two states, "working" and "failed". The rate from working to failed is $\lambda$ and from failed to repaired is $\mu$. Write down $Q$ and find the stationary distribution.

Approach: two states with $q_{12}=\lambda$ and $q_{21}=\mu$; the diagonal is fixed by the zero row sums.

Solution:

$$Q=\begin{pmatrix}-\lambda&\lambda\\\mu&-\mu\end{pmatrix}$$

Let $\pi=(\pi_1,\pi_2)$ and solve $\pi Q=0$:

$$\pi_1(-\lambda)+\pi_2\mu=0\quad\Longrightarrow\quad\pi_2=\frac{\lambda}{\mu}\pi_1$$

Adding normalization:

$$\pi_1+\frac{\lambda}{\mu}\pi_1=1\quad\Longrightarrow\quad\pi_1=\frac{\mu}{\lambda+\mu},\qquad\pi_2=\frac{\lambda}{\lambda+\mu}$$

So in the long run the machine works a fraction $\dfrac{\lambda}{\lambda+\mu}$ of the time and is failed a fraction $\dfrac{\mu}{\lambda+\mu}$. For $\lambda=0.1$/hour and $\mu=0.5$/hour, the working fraction is $0.5/0.6=5/6$.

> Comment: rates have units of $1/$time, so $\lambda$ and $\mu$ can be added directly—they have the same dimensions. The stationary probabilities depend only on the ratio $\rho=\lambda/\mu$, consistent with "the ratio of mean repair time to mean time between failures".

### Example 2 (Intermediate: finding $P(t)$)

Problem: continuing the previous example, find $p_{11}(t)=P(X(t)=1\mid X(0)=1)$ and $p_{12}(t)$.

Approach: solve the forward equation $P'(t)=P(t)Q$, or use $p_{11}+p_{12}=1$ to reduce the system to one dimension.

Solution: the first row of $P(t)$ satisfies

$$p_{11}'=-\lambda p_{11}+\mu p_{21},\qquad p_{12}'=\lambda p_{11}-\mu p_{12}$$

and $p_{11}+p_{12}=1$, $p_{21}=1-p_{11}$ (the two entries of the first column also satisfy $p_{11}+p_{21}=1$, since starting from either state the process ends up in state $1$ or $2$). Substituting into the first equation:

$$p_{11}'=-\lambda p_{11}+\mu(1-p_{11})=-(\lambda+\mu)p_{11}+\mu$$

This is a first-order linear equation. The steady particular solution is $p_{11}=\dfrac{\mu}{\lambda+\mu}$ and the homogeneous solution is $Ce^{-(\lambda+\mu)t}$, so

$$p_{11}(t)=\frac{\mu}{\lambda+\mu}+\frac{\lambda}{\lambda+\mu}e^{-(\lambda+\mu)t}$$

(the constant is fixed by $p_{11}(0)=1$: $\dfrac{\mu}{\lambda+\mu}+C=1$, $C=\dfrac{\lambda}{\lambda+\mu}$). Hence

$$p_{12}(t)=1-p_{11}(t)=\frac{\lambda}{\lambda+\mu}\left(1-e^{-(\lambda+\mu)t}\right)$$

As $t\to\infty$, $p_{11}\to\dfrac{\mu}{\lambda+\mu}$ and $p_{12}\to\dfrac{\lambda}{\lambda+\mu}$, in agreement with the stationary distribution of Example 1.

> Comment: the convergence is governed by $e^{-(\lambda+\mu)t}$ and the time constant is $\dfrac{1}{\lambda+\mu}$. Note that both rows of $P(t)$ have the same limit and the same convergence rate—the second largest eigenvalue of the two-state chain is exactly $-(\lambda+\mu)$. If $\lambda$ or $\mu$ is large, mixing is fast; if both are small, the system stays in one state for a long time.

### Example 3 (Advanced: the M/M/1 queue)

Problem: an M/M/1 queue with arrival rate $\lambda$, service rate $\mu$ and $\rho=\lambda/\mu<1$. Find the stationary distribution, the mean queue length and the mean sojourn time.

Approach: this is a birth–death process with $\lambda_n=\lambda$ and $\mu_n=\mu$. Use detailed balance.

Solution: from $\pi_n\lambda=\pi_{n+1}\mu$,

$$\pi_n=\pi_0\rho^n$$

Normalization:

$$\pi_0\sum_{n=0}^{\infty}\rho^n=\frac{\pi_0}{1-\rho}=1\quad\Longrightarrow\quad\pi_0=1-\rho$$

so

$$\pi_n=(1-\rho)\rho^n,\qquad n=0,1,2,\dots$$

a geometric distribution with parameter $1-\rho$. The mean queue length is

$$L=\sum_{n=0}^{\infty}n(1-\rho)\rho^n=(1-\rho)\frac{\rho}{(1-\rho)^2}=\frac{\rho}{1-\rho}$$

By Little's law $L=\lambda W$, the mean sojourn time is

$$W=\frac{L}{\lambda}=\frac{\rho}{\lambda(1-\rho)}=\frac{1}{\mu-\lambda}$$

and the mean waiting time in the queue (excluding service) is

$$W_q=W-\frac{1}{\mu}=\frac{1}{\mu-\lambda}-\frac{1}{\mu}=\frac{\lambda}{\mu(\mu-\lambda)}=\frac{\rho}{\mu-\lambda}$$

As $\rho\to1^-$, $L\to\infty$ and $W\to\infty$—the system approaches saturation and the queue explodes.

> Comment: $\rho<1$ is necessary for a stationary distribution to exist. If $\lambda\ge\mu$, customers arrive faster than they are served, the queue grows without bound, $\sum\rho^n$ diverges and no stationary distribution exists. This agrees with intuition, but note that even $\rho=1$ is not "exactly balanced": it is null recurrent—the process returns to $0$ infinitely often yet has no stationary distribution, and the mean queue length diverges with time.

## VI. Common Errors and Pitfalls

1. **Getting the sign of the diagonal of $Q$ wrong**: wrong—writing $q_{ii}$ as the positive $q_i$. Why wrong—the rows of $Q$ must sum to zero, so the diagonal is the negative outflow rate. Right—$q_{ii}=-\sum_{j\ne i}q_{ij}$.
2. **Treating rates as probabilities**: wrong—using $q_{ij}$ directly as a one-step transition probability, or requiring $q_{ij}\le1$. Why wrong—rates carry dimensions and may exceed $1$; only $q_{ij}/q_i$ is a probability. Right—compute $q_i$ first, then normalize.
3. **Using $P^n$ for continuous-time transitions**: wrong—writing $P(t)=P^n$ for a CTMC. Why wrong—time is continuous and transitions are given by the matrix exponential $e^{Qt}$. Right—solve the Kolmogorov equations or diagonalize $Q$.
4. **Reversing the birth–death direction**: wrong—writing $\pi_n\mu_n=\pi_{n+1}\lambda_{n+1}$. Why wrong—detailed balance says "a birth from $n$ to $n+1$" equals "a death from $n+1$ to $n$", i.e. $\pi_n\lambda_n=\pi_{n+1}\mu_{n+1}$. Right—draw the arrows by state: births to the right, deaths to the left.
5. **Ignoring the existence condition for stationarity**: wrong—writing $\pi_n=(1-\rho)\rho^n$ for M/M/1 without checking $\rho<1$. Why wrong—for $\rho\ge1$ the series diverges and no stationary distribution exists. Right—verify $\sum\pi_n<\infty$ first.
6. **Taking the stationary distribution of the embedded chain for that of the CTMC**: wrong—replacing $\pi$ by the stationary distribution of $p_{ij}=q_{ij}/q_i$. Why wrong—the embedded chain counts "one jump", while the CTMC weights by holding time; states with long holding times occupy a larger share of the CTMC. Right—the CTMC $\pi_i$ is proportional to the embedded-chain stationary distribution divided by $q_i$ (in the irreducible positive recurrent case).
7. **Thinking the process still jumps when $q_i=0$**: wrong—computing an outflow rate for an absorbing state. Why wrong—$q_i=0$ means the holding time is infinite and no jump ever occurs. Right—treat absorbing states separately with absorption-probability equations.

## VII. Summary and Mnemonics

Key points:

- CTMC: continuous time, discrete states; holding times must be exponential (memoryless), otherwise the Markov property fails.
- Rate matrix $Q$: off-diagonal entries are jump rates, the diagonal is the negative total outflow rate, rows sum to $0$.
- Transition probabilities $P(t)=e^{Qt}$ satisfy the forward/backward equations $P'=PQ=QP$.
- The stationary distribution solves $\pi Q=0$ plus normalization; birth–death processes use detailed balance $\pi_n\lambda_n=\pi_{n+1}\mu_{n+1}$.
- The embedded chain $p_{ij}=q_{ij}/q_i$ describes "where to jump"; the exponential holding time describes "how long to stay".
- M/M/1: $\pi_n=(1-\rho)\rho^n$, $L=\rho/(1-\rho)$, $W=1/(\mu-\lambda)$, requiring $\rho<1$.

**Mnemonic: continuous time, exponential jumps; remember the rate matrix Q; the diagonal is the negative outflow; stationary solves πQ=0.**

`,
  },
  'renewal-process': {
    chapter: 'Chapter 4 Renewal Processes',
    title: 'Renewal Processes and Renewal Theorems',
    summary:
      'A renewal process generalizes the Poisson process to arbitrary interarrival distributions: a component fails and is replaced, with i.i.d. intervals. The renewal theorem says the long-run renewal rate tends to 1/E[T], and gives limiting distributions for the age and the residual life.',
    keyPoints: [
      'Renewal process: intervals X_n i.i.d., S_n = X_1+...+X_n the time of the n-th renewal',
      'Renewal function m(t)=E[N(t)] satisfies m(t)=F(t)+∫_0^t m(t-x)dF(x)',
      'Basic renewal theorem: m(t)/t → 1/μ (μ=E[X])',
      'Key renewal theorem: for directly Riemann integrable h, ∫_0^t h(t-x)dm(x) → (1/μ)∫_0^∞ h',
      'The age A(t) and residual life R(t) have limiting distribution (1/μ)∫_0^x (1-F(s))ds',
    ],
    content: String.raw`

The Poisson process assumes that consecutive event intervals are exponentially distributed. But in reality the intervals are often not exponential: the lifetimes of light bulbs cluster between hundreds and thousands of hours, the maintenance intervals of machines vary with age, the interarrival times of customers have clear peaks and troughs. The renewal process replaces the "exponential intervals" of the Poisson process with "arbitrary i.i.d. intervals" while keeping the rest of the structure: a component fails, is immediately replaced by a brand-new one of the same model, and so on; each replacement is called a renewal.

This model answers three very practical questions: how many replacements by time $t$? How often on average in the long run? A component that has already been used for $x$ hours—how much longer will it last on average? The last question is especially counterintuitive: pick a time at random and look, and the mean lifetime of the current component is often longer than "the mean lifetime"—because you are more likely to run into long-lived components. This is the waiting-time paradox, also called the inspection paradox.

The heart of this lecture is "regeneration": after each replacement the system is statistically as good as new, as if time had restarted. Precisely this makes the renewal process describable by a convolution-type integral equation (the renewal equation) and yields the long-run average rate $1/\mu$.

## II. Rigorous Definitions

Let $X_1,X_2,\dots$ be i.i.d. non-negative random variables with $P(X_i=0)<1$ and mean

$$0<\mu=E[X_1]<\infty$$

**Renewal times**:

$$S_0=0,\qquad S_n=X_1+\cdots+X_n\quad(n\ge1)$$

$S_n$ is the time of the $n$-th replacement.

**Renewal counting process**:

$$N(t)=\max\{n:S_n\le t\}=\sum_{n=1}^{\infty}\mathbf{1}_{\{S_n\le t\}}$$

the number of renewals in $[0,t]$.

**Renewal function**:

$$m(t)=E[N(t)]$$

**Renewal equation**:

$$m(t)=F(t)+\int_0^t m(t-x)\,dF(x)$$

where $F(x)=P(X\le x)$ is the distribution function of the interval. If $F$ has density $f$, then $dF(x)=f(x)dx$ and the integral becomes an ordinary convolution.

**Age and residual life**:

$$A(t)=t-S_{N(t)}\quad(\text{age of the current component}),\qquad R(t)=S_{N(t)+1}-t\quad(\text{residual life of the current component})$$

Clearly

$$A(t)+R(t)=X_{N(t)+1}\quad(\text{total lifetime of the current component})$$

**Delayed renewal process**: the first interval $X_1$ has a different distribution from the subsequent $X_2,X_3,\dots$ (for example the system has already been running for some time at $t=0$), while the rest remain i.i.d.

**Renewal reward process**: each renewal earns a reward $R_n$ (i.i.d., possibly correlated with $X_n$), and $R(t)=\sum_{n=1}^{N(t)}R_n$ is the cumulative reward up to $t$.

**Basic renewal theorem**:

$$\lim_{t\to\infty}\frac{N(t)}{t}=\frac{1}{\mu}\ \text{a.s.},\qquad \lim_{t\to\infty}\frac{m(t)}{t}=\frac{1}{\mu}$$

**Key renewal theorem**: if $F$ is non-arithmetic (the intervals do not lie on a lattice) and $h$ is directly Riemann integrable, then

$$\lim_{t\to\infty}\int_0^t h(t-x)\,dm(x)=\frac{1}{\mu}\int_0^{\infty}h(x)\,dx$$

**Renewal reward theorem**:

$$\lim_{t\to\infty}\frac{E[R(t)]}{t}=\frac{E[R_1]}{\mu}$$

## III. Why These Definitions

**Why "renewal"?** After each replacement the lifetime of the new component is independent of the old one and identically distributed, so from the moment of replacement the future statistical law is exactly the same as from $0$. This "statistical rebirth" is called regeneration. It allows us to "restart the clock" at every renewal time and decompose a long-run problem into independent identically distributed pieces.

**Where does the renewal equation come from?** Condition $N(t)$ on the time $X_1$ of the first renewal. If $X_1>t$ there is no renewal in $[0,t]$ and $N(t)=0$; if $X_1=x\le t$, then after the first renewal the counting restarts at $x$ and the expected number of renewals in the remaining time $t-x$ is $m(t-x)$. Hence

$$m(t)=P(X_1\le t)+\int_0^t m(t-x)\,dF(x)=F(t)+\int_0^t m(t-x)\,dF(x)$$

The first term $F(t)$ is the probability of "at least one renewal" (one renewal contributes one to the count), and the integral is "the expected number in the remaining time after the first one at $x$". This is a direct consequence of the law of total expectation plus regeneration.

**Why does the basic renewal theorem hold?** By the strong law of large numbers, $S_n/n\to\mu$ a.s. And $S_{N(t)}\le t<S_{N(t)+1}$; dividing by $N(t)$:

$$\frac{S_{N(t)}}{N(t)}\le\frac{t}{N(t)}<\frac{S_{N(t)+1}}{N(t)}$$

As $t\to\infty$, $N(t)\to\infty$, and $S_{N(t)}/N(t)\to\mu$, $S_{N(t)+1}/N(t)\to\mu$ (since $(N(t)+1)/N(t)\to1$); the squeeze gives $t/N(t)\to\mu$, i.e. $N(t)/t\to1/\mu$. Taking expectations (which requires uniform integrability) gives $m(t)/t\to1/\mu$.

Intuitively: each interval has mean length $\mu$, so on average $1/\mu$ renewals occur per unit time. Note that this limit depends only on the mean, not on the shape of the interval distribution—the shape affects only the transient $m(t)$ and the rate of convergence.

**Why is the limiting distribution of the residual life not $F$?** Pick a time $t$ at random and look: the current component is "the interval hit by that instant". Long intervals occupy more time, so the probability of being hit is proportional to their length—this is length bias. Formally, the limiting distribution of the total lifetime of the current component has density

$$f_L(x)=\frac{x\,f(x)}{\mu}$$

(because an interval of length $x$ is hit with probability proportional to $x$, and the normalizing constant is $\mu=E[X]$). Conditional on this, the residual life is uniform on $[0,x]$, so

$$P(R(t)>y)\to\frac{1}{\mu}\int_y^{\infty}(1-F(x))\,dx$$

Differentiating with respect to $y$ gives the limiting density

$$f_R(y)=\frac{1-F(y)}{\mu}$$

It is not $f(y)$ but a version flattened by the survival function: long lifetimes carry more weight. The mean residual life is

$$E[R]=\int_0^{\infty}y\frac{1-F(y)}{\mu}dy=\frac{E[X^2]}{2\mu}$$

(obtainable by integration by parts). Since $E[X^2]=\mu^2+\sigma^2$,

$$E[R]=\frac{\mu}{2}+\frac{\sigma^2}{2\mu}\ge\frac{\mu}{2}$$

with equality only for a degenerate distribution (no randomness). In other words, a randomly arriving observer waits on average more than half a lifetime—this is the inspection paradox.

**Why does the key renewal theorem look like that?** It converts the discrete average "sum over renewal times" into the continuous average "integral of $h$":

$$\sum_{n}S_n\le t\text{ near}\ \approx\ \frac{1}{\mu}\int_0^{\infty}h(x)dx$$

because in the long run the density of renewal times tends to $1/\mu$ ($1/\mu$ per unit time). For $h=\mathbf{1}_{[0,y]}$ the left side is the limit of $P(R(t)\le y)$ and the right side is $\frac1\mu\int_0^y(1-F(x))dx$, exactly the residual-life formula above.

## IV. Intuition and Pictures

Draw the time axis as segments of random length whose junctions are the renewal times. The renewal process studies the statistics of these segments:

| Quantity | Meaning | Key result |
|---|---|---|
| $N(t)$ | number of renewals in $[0,t]$ | $N(t)/t\to1/\mu$ |
| $m(t)=E[N(t)]$ | expected count | satisfies the renewal equation |
| $A(t)$ | age of the current component | limiting density $(1-F)/\mu$ |
| $R(t)$ | residual life of the current component | limiting density $(1-F)/\mu$ |
| $A(t)+R(t)$ | total lifetime of the current component | length biased, mean $E[X^2]/\mu$ |

> Intuition: imagine walking into a factory at a random moment and seeing a machine running. You are more likely to see a long-lived machine, because it runs for a longer time—this is length bias. You ask "how much longer will it last", and the answer's distribution naturally favours long lifetimes. Conversely, if you track every machine from the moment it is installed, the residual-life distribution you see is the original $F$.

Right versus wrong:

- Wrong: the intervals of a renewal process must be exponential. Right: the exponential is only a special case; the intervals are arbitrary i.i.d., and the exponential case degenerates to the Poisson process.
- Wrong: the long-run renewal rate depends on the variance of the intervals. Right: the first-order limit $1/\mu$ depends only on the mean; the variance affects $O(1)$ corrections and the residual life.
- Wrong: $E[R(t)]\to\mu/2$. Right: $E[R]\to E[X^2]/(2\mu)=\mu/2+\sigma^2/(2\mu)$, which exceeds $\mu/2$ when there is randomness.

## V. Worked Examples

### Example 1 (Basic: Poisson as a special renewal process)

Problem: if $X_i\sim\operatorname{Exp}(\lambda)$, verify that $N(t)$ is a Poisson process of intensity $\lambda$ and find $m(t)$ and the residual-life distribution.

Approach: exponential intervals are i.i.d., and by memorylessness the counting process has independent and stationary increments.

Solution: the renewal process with exponential intervals is the Poisson process, so $N(t)\sim\operatorname{Poisson}(\lambda t)$ and

$$m(t)=E[N(t)]=\lambda t$$

The basic renewal theorem gives $\dfrac{m(t)}{t}=\lambda=\dfrac{1}{\mu}$ with $\mu=1/\lambda$, consistent.

Residual life: by memorylessness, $R(t)\sim\operatorname{Exp}(\lambda)$ for all $t$ (not only in the limit). Checking with the formula:

$$P(R>y)=\frac{1}{\mu}\int_y^{\infty}(1-F(x))dx=\lambda\int_y^{\infty}e^{-\lambda x}dx=e^{-\lambda y}$$

which is exactly the survival function of $\operatorname{Exp}(\lambda)$. The mean residual life is $E[R]=1/\lambda=\mu$; and $E[X^2]/(2\mu)=\dfrac{2/\lambda^2}{2/\lambda}=\dfrac1\lambda$, consistent.

> Comment: the exponential is the only "memoryless" interval distribution, so only for the Poisson process does $R(t)$ follow the original distribution for all $t$. For a general renewal process a limiting distribution exists only as $t\to\infty$, and that limit is flattened by length bias.

### Example 2 (Intermediate: renewal function for uniform intervals)

Problem: for $X_i\sim U(0,1)$, find $m(t)$ on $0\le t\le1$.

Approach: for $t\le1$, $F(t)=t$ and $dF(x)=dx$ ($0\le x\le t$), so the renewal equation becomes

$$m(t)=t+\int_0^t m(t-x)\,dx$$

Solution: substituting $u=t-x$,

$$m(t)=t+\int_0^t m(u)\,du$$

Differentiating with respect to $t$:

$$m'(t)=1+m(t),\qquad m(0)=0$$

This first-order linear equation has the solution

$$m(t)=e^t-1$$

Check: substituting back,

$$t+\int_0^t(e^{t-x}-1)dx=t+\big[-e^{t-x}-x\big]_0^t=t+(-1-t)-(-e^t)=e^t-1$$

correct. For small $t$, $m(t)\approx t+\dfrac{t^2}{2}$: the first term is the linear main term "one renewal per hour on average", and the second is the correction from "possibly two renewals".

> Comment: this problem shows the power of the renewal equation—a convolution integral equation becomes a simple ODE after differentiation. Note that Leibniz's rule was used and that $m(0)=0$. If the interval distribution has a density, the renewal equation can usually be turned into a differential equation; if the distribution is discrete, use a recursion.

### Example 3 (Advanced: limiting residual life and the inspection paradox)

Problem: for intervals $U(0,1)$, find the limiting distribution of $R(t)$ as $t\to\infty$ and $E[R]$, and compare with $E[X]=1/2$.

Approach: use the key renewal theorem, or the length-bias formula directly.

Solution: $F(x)=x$ for $0\le x\le1$, $1-F(x)=1-x$, $\mu=\dfrac12$. For $0\le y\le1$,

$$P(R>y)=\frac{1}{\mu}\int_y^1(1-x)dx=2\cdot\frac{(1-y)^2}{2}=(1-y)^2$$

so the limiting distribution function is

$$F_R(y)=1-(1-y)^2=2y-y^2,\qquad 0\le y\le1$$

with density $f_R(y)=2(1-y)$, a triangular distribution skewed towards $0$. The mean is

$$E[R]=\int_0^1y\cdot2(1-y)dy=2\left(\frac12-\frac13\right)=2\cdot\frac16=\frac13$$

Checking with $E[R]=\dfrac{E[X^2]}{2\mu}$: $E[X^2]=\dfrac13$, $2\mu=1$, so $E[R]=\dfrac13$, consistent.

Yet the original interval mean is $E[X]=\dfrac12$. The residual life seen at a random instant averages $\dfrac13$, less than $\dfrac12$—does this contradict the "inspection paradox"? Note that $E[R]=\dfrac13$ is the residual life; the mean total lifetime of the current component is

$$E[L]=\frac{E[X^2]}{\mu}=\frac{1/3}{1/2}=\frac23>\frac12$$

The total lifetime is lengthened, but the residual life is only part of it. The mean age is also $\dfrac13$, and the two add up to $\dfrac23$, exactly the mean total lifetime of the current component.

> Comment: the correct statement of the inspection paradox is "the total lifetime of the current component is on average longer than that of a typical component", not "the residual life necessarily exceeds half the mean lifetime". The uniform example makes this crystal clear: total lifetime $2/3>1/2$, but residual life $1/3<1/2$. Many people conflate the two quantities.

## VI. Common Errors and Pitfalls

1. **Assuming the intervals must be exponential**: wrong—treating the renewal process as a Poisson process and using $N(t)\sim\operatorname{Poisson}(\lambda t)$. Why wrong—the exponential is only a special case; for general intervals $N(t)$ is not Poisson and its variance does not equal its mean. Right—use the renewal equation or the renewal theorems.
2. **Taking the limiting residual-life distribution to be the original $F$**: wrong—writing $P(R\le y)=F(y)$. Why wrong—the interval hit at a random instant is length biased, with long intervals weighted more. Right—the limiting density is $(1-F(y))/\mu$.
3. **Wrong integration limits in the renewal equation**: wrong—writing $\int_0^{\infty}m(t-x)dF(x)$ without restricting $x\le t$. Why wrong—the first renewal cannot occur after $t$. Right—the upper limit is $t$ (or let the support of $F$ truncate it naturally).
4. **Ignoring $\mu<\infty$ in the basic theorem**: wrong—applying $m(t)/t\to1/\mu$ to a heavy-tailed distribution (say $\mu=\infty$). Why wrong—then $1/\mu=0$, yet the actual renewals may be extremely slow, and the hypotheses are not satisfied. Right—verify $0<\mu<\infty$ first.
5. **Confusing age with residual life**: wrong—assuming $A(t)=R(t)$. Why wrong—they generally differ, though they share a limiting distribution (the same $(1-F)/\mu$). Right—distinguish "already used" from "still to come".
6. **Computing the mean residual life as $\mu/2$**: wrong—forgetting the variance correction. Why wrong—$E[R]=\mu/2+\sigma^2/(2\mu)$; the larger the randomness, the longer the mean residual. Right—use $E[X^2]/(2\mu)$.
7. **Omitting the "period" in the renewal reward theorem**: wrong—writing $R(t)/t\to E[R_1]$. Why wrong—the reward per unit time must be divided by the mean period $\mu$. Right—$R(t)/t\to E[R_1]/\mu$.

## VII. Summary and Mnemonics

Key points:

- Renewal process: intervals $X_i$ i.i.d., $S_n$ the time of the $n$-th renewal, $N(t)=\max\{n:S_n\le t\}$.
- Regeneration: the statistical law resets after each renewal, which is the source of the renewal equation.
- Renewal equation $m(t)=F(t)+\int_0^t m(t-x)dF(x)$; with a density it becomes a differential equation.
- Basic renewal theorem: $N(t)/t\to1/\mu$, $m(t)/t\to1/\mu$, depending only on the mean.
- The limiting densities of the residual life and the age are both $(1-F)/\mu$; the mean residual life is $E[X^2]/(2\mu)$.
- Inspection paradox: the mean total lifetime seen at a random instant is $E[X^2]/\mu$, larger than the $\mu$ of a typical component.
- The Poisson process is the special case of exponential intervals; the renewal reward theorem gives the long-run average reward rate $E[R_1]/\mu$.

**Mnemonic: replace on failure—that is renewal; intervals i.i.d.; long-run rate one over μ; residual life flattened out.**

`,
  },

  'stationary-processes': {
    chapter: 'Chapter 6 Stationary Processes',
    title: 'Stationary Processes and Ergodicity',
    summary:
      'The statistical properties of a stationary process do not change under time shifts. A wide-sense stationary process is fully described by its mean and correlation function, and ergodicity guarantees that a single sufficiently long sample path can estimate the ensemble mean.',
    keyPoints: [
      'Strict stationarity: finite-dimensional distributions invariant under shifts; wide-sense stationarity: constant mean, autocovariance depending only on the time lag',
      'A wide-sense stationary process is characterized by its mean function and autocorrelation R(τ)',
      'Ergodicity: time average = ensemble average (a long enough sample represents the whole)',
      'Spectral decomposition: the correlation function is the Fourier transform of the spectral distribution',
      'Applications: prediction and filtering in signal processing and time series',
    ],
    content: String.raw`

A piece of audio, a series of temperature observations, the returns of a stock—their statistical properties often do not change with "from which second you start listening". The white noise of this afternoon and of tomorrow afternoon sound statistically the same; a steady machine vibration has roughly the same spectral shape whichever instant you cut it at. This "shift invariance" is stationarity.

Stationarity has two levels. **Strict stationarity** requires all finite-dimensional distributions to be invariant under time shifts—a very strong requirement, almost impossible to verify from data. **Wide-sense stationarity** requires only second moments: the mean is constant and the autocovariance depends only on the time lag. Engineering almost always uses wide-sense stationarity, because it needs only the mean and the autocorrelation function, and the whole theory of linear filtering, prediction and spectral analysis depends only on second moments.

Paired with stationarity is **ergodicity**: if the process is sufficiently "mixing", then taking one sufficiently long sample path and averaging over time can replace averaging over all possible samples. This lets us estimate the statistics of a whole piece of music from a short recording. But ergodicity is not an automatic consequence of stationarity—there exist stationary but non-ergodic processes, for example $X_t=Y$ ($Y$ a random constant), whose time average is always $Y$ and never equals the ensemble mean.

This lecture answers: how do strict and wide-sense stationarity differ? Why does the autocorrelation function depend only on the lag? And when can one sample path represent the whole?

## II. Rigorous Definitions

Let $\{X_t\}$ be a stochastic process, with $t$ either integer (discrete time) or real (continuous time).

**Strict stationarity**: for any $n$, any times $t_1,\dots,t_n$ and any shift $h$,

$$(X_{t_1},\dots,X_{t_n})\overset{d}{=}(X_{t_1+h},\dots,X_{t_n+h})$$

that is, all finite-dimensional joint distributions are invariant under shifts.

**Wide-sense (weak) stationarity**: the following hold

1. $E[X_t^2]<\infty$;
2. $E[X_t]=m$ is a constant independent of $t$;
3. the autocovariance

$$\gamma(s,t)=\operatorname{Cov}(X_s,X_t)=E[(X_s-m)(X_t-m)]$$

depends only on the lag $\tau=t-s$, written $\gamma(\tau)$.

$\gamma(\tau)$ is called the **autocovariance function**; dividing by the variance gives the **autocorrelation function**

$$\rho(\tau)=\frac{\gamma(\tau)}{\gamma(0)}$$

**Properties of the autocovariance**:

- symmetry: $\gamma(\tau)=\gamma(-\tau)$;
- non-negative definiteness: for any $n$, any $t_i$ and any complex numbers $c_i$, $\sum_{i,j}c_i\bar c_j\gamma(t_i-t_j)\ge0$;
- $|\gamma(\tau)|\le\gamma(0)$.

**Mean ergodicity**: if

$$\lim_{T\to\infty}\frac{1}{T}\int_0^T X_t\,dt=E[X_0]\quad\text{(a.s. or in mean square)}$$

the process is called mean ergodic. In discrete time the corresponding statement is $\dfrac1n\sum_{k=1}^nX_k\to E[X_0]$.

**Spectral density**: if $\sum_{\tau}|\gamma(\tau)|<\infty$ (discrete) or $\int|\gamma(\tau)|d\tau<\infty$ (continuous), define

$$f(\omega)=\frac{1}{2\pi}\sum_{\tau=-\infty}^{\infty}\gamma(\tau)e^{-i\omega\tau}\quad(\text{discrete})$$

or

$$f(\omega)=\frac{1}{2\pi}\int_{-\infty}^{\infty}\gamma(\tau)e^{-i\omega\tau}d\tau\quad(\text{continuous})$$

**Wiener–Khinchin theorem**:

$$\gamma(\tau)=\int_{-\infty}^{\infty}e^{i\omega\tau}f(\omega)\,d\omega$$

that is, the autocovariance and the spectral density are a Fourier transform pair.

**White noise**: $\gamma(0)=\sigma^2$, $\gamma(\tau)=0$ for $\tau\ne0$. Its spectral density is the constant $f(\omega)=\dfrac{\sigma^2}{2\pi}$—equal energy at all frequencies.

## III. Why These Definitions

**Why does wide-sense stationarity capture only second moments?** For a **Gaussian process**, the mean function and the covariance function completely determine all finite-dimensional distributions. Hence a Gaussian process is wide-sense stationary ⟺ strictly stationary. For general processes, wide-sense stationarity is weaker and easier to verify, and linear prediction, filtering and spectral analysis use only second moments, so it suffices in engineering. In other words, wide-sense stationarity is "stationarity that is good enough".

**Why does the autocovariance depend only on the lag?** Stationarity means "how correlated two instants $\tau$ apart are" should not depend on which day one starts counting. If $\gamma(s,t)$ still depended on $s$, the statistical law of the process would drift with time and it would not be stationary. Writing $\gamma$ as a one-variable function $\gamma(\tau)$ is what makes the Fourier analysis below possible.

**Why must the autocovariance be non-negative definite?** For any linear combination $Y=\sum c_iX_{t_i}$, the variance is

$$\operatorname{Var}(Y)=\sum_{i,j}c_i\bar c_j\gamma(t_i-t_j)\ge0$$

a direct requirement of non-negative variance. Conversely, any non-negative definite function can serve as the autocovariance of some wide-sense stationary process (an existence theorem). So "non-negative definite" is not an extra condition but the essential feature of an autocovariance.

**Why is the spectral density non-negative?** By the Wiener–Khinchin theorem $f(\omega)$ is the Fourier transform of $\gamma$. Energy cannot be negative in any frequency window, and one can prove $f(\omega)\ge0$. This is also the frequency-domain equivalent of "the autocovariance is non-negative definite".

**What is the criterion for mean ergodicity?** In continuous time the time average

$$\bar X_T=\frac1T\int_0^TX_t\,dt$$

has variance

$$\operatorname{Var}(\bar X_T)=\frac{1}{T^2}\int_0^T\int_0^T\gamma(s-t)\,ds\,dt=\frac{2}{T}\int_0^T\left(1-\frac{\tau}{T}\right)\gamma(\tau)\,d\tau$$

If $\dfrac1T\int_0^T\gamma(\tau)d\tau\to0$, the variance tends to zero and $\bar X_T$ converges in mean square to $m$, i.e. the process is mean ergodic. Intuitively: only if the autocovariance decays fast enough (short memory) does the time average contain enough "independent information" to approach the ensemble mean.

> Counterexample (the conditions are indispensable): let $X_t=Y$ with $Y$ a random variable, $E[Y]=\mu$ and $\operatorname{Var}(Y)>0$. Then $E[X_t]=\mu$ is constant and $\gamma(\tau)=\operatorname{Var}(Y)$ is independent of $t$, so the process is wide-sense stationary. But the time average $\dfrac1T\int_0^TX_tdt=Y$ varies from sample to sample and does not equal $\mu$. Here $\gamma(\tau)$ does not decay (it is constant) and the ergodicity criterion fails. Evidently "stationary" and "ergodic" are independent concepts.

**Why can a periodic process be ergodic?** Take $X_t=A\cos(\omega t+\Theta)$ with $\Theta\sim U(0,2\pi)$. Its autocovariance $\gamma(\tau)=\dfrac{A^2}{2}\cos\omega\tau$ does not decay, so by the criterion above it is not mean ergodic. Yet the time average

$$\frac1T\int_0^TX_tdt\to0=E[X_t]$$

holds almost surely (because the integral of a cosine over whole periods vanishes). This shows that "covariance decay" is only a sufficient condition, not a necessary one. The time average of a periodic process can be ergodic because a single sample path already sweeps through all phases. This example reminds us that ergodicity must be analysed case by case, not judged solely by whether the autocovariance decays.

## IV. Intuition and Pictures

| Concept | Intuition | Mathematical description |
|---|---|---|
| Strict stationarity | the whole statistics are shift invariant | finite-dimensional distributions shift invariant |
| Wide-sense stationarity | flat mean, correlation depends only on spacing | $E[X_t]=m$, $\gamma$ depends only on $\tau$ |
| Ergodicity | one long sample equals the whole | time average = ensemble average |
| Spectral density | decompose correlation into frequencies | the Fourier transform of $\gamma$ |
| White noise | equal energy at all frequencies, no memory | $\gamma(\tau)=\sigma^2\delta_{\tau0}$ |

> Intuition: a stationary process is like a statistically uniform tape—played from whatever second, it sounds (statistically) the same; ergodicity is like listening to the whole tape to learn its average loudness. The autocorrelation $\gamma(\tau)$ measures whether two points $\tau$ apart still remember each other: the larger $\tau$ is, the closer to $0$, the shorter the memory; if $\gamma(\tau)$ decays very slowly, the process has long memory and a single sample can hardly represent the whole.

Three typical shapes of the autocorrelation plot:

- **fast decay** (such as $\rho^h$ for AR(1)): short memory, a broad and flat spectral density;
- **slow decay** (long memory): the spectral density concentrates at low frequencies;
- **periodicity** (such as $\cos\omega\tau$): sharp peaks at $\pm\omega$, corresponding to a deterministic periodic component.

Right versus wrong:

- Wrong: wide-sense stationarity implies strict stationarity. Right: it holds only for special processes such as Gaussian ones; in general wide-sense stationarity is weaker.
- Wrong: a stationary process is necessarily ergodic. Right: $X_t=Y$ is a counterexample; ergodicity needs an extra mixing condition.
- Wrong: the spectral density is the autocorrelation function. Right: the two are a Fourier transform pair, with different dimensions and meanings.

## V. Worked Examples

### Example 1 (Basic: verifying wide-sense stationarity)

Problem: let $X_t=A\cos\omega t+B\sin\omega t$ with $A,B$ independent, $E[A]=E[B]=0$, $\operatorname{Var}(A)=\operatorname{Var}(B)=\sigma^2$ and $\omega$ constant. Verify that $X_t$ is wide-sense stationary and find its autocovariance.

Approach: compute the mean and $\operatorname{Cov}(X_s,X_t)$ directly.

Solution: the mean is

$$E[X_t]=E[A]\cos\omega t+E[B]\sin\omega t=0$$

a constant. Autocovariance: for $s,t$,

$$\operatorname{Cov}(X_s,X_t)=E[X_sX_t]$$

$$=E\big[(A\cos\omega s+B\sin\omega s)(A\cos\omega t+B\sin\omega t)\big]$$

Expand into four terms. Since $A,B$ are independent with zero means, $E[AB]=E[A]E[B]=0$ and the cross terms vanish:

$$=\sigma^2\cos\omega s\cos\omega t+\sigma^2\sin\omega s\sin\omega t=\sigma^2\cos\omega(t-s)$$

Writing $\tau=t-s$ gives $\gamma(\tau)=\sigma^2\cos\omega\tau$, depending only on $\tau$. Hence the process is wide-sense stationary.

Mean ergodicity: the time average is

$$\frac1T\int_0^TX_tdt=\frac{A}{T}\frac{\sin\omega T}{\omega}+\frac{B}{T}\frac{1-\cos\omega T}{\omega}\to0$$

because the numerators are bounded while $T\to\infty$. So the time average converges to $E[X_t]=0$ and the process is mean ergodic.

> Comment: the key is the cross term $E[AB]=0$. If $A$ and $B$ were correlated, the covariance would contain mixed $\sin$ and $\cos$ terms and generally would no longer depend only on $\tau$. Also, although $\gamma(\tau)$ does not decay, the process is still mean ergodic—confirming that "covariance decay" is only a sufficient condition.

### Example 2 (Intermediate: stationary solution and autocovariance of AR(1))

Problem: let $X_t=\varphi X_{t-1}+\varepsilon_t$ with $|\varphi|<1$, where $\varepsilon_t$ is i.i.d. white noise with $E[\varepsilon_t]=0$, $\operatorname{Var}(\varepsilon_t)=\sigma^2$, independent of past $X_{t-k}$. Find the variance and autocovariance of the stationary solution.

Approach: expand the recursion backwards to express $X_t$ as a geometrically weighted sum of past noise.

Solution: substituting repeatedly,

$$X_t=\varphi(\varphi X_{t-2}+\varepsilon_{t-1})+\varepsilon_t=\cdots=\sum_{k=0}^{\infty}\varphi^k\varepsilon_{t-k}$$

(the series converges in mean square for $|\varphi|<1$). Hence

$$E[X_t]=\sum_{k=0}^{\infty}\varphi^kE[\varepsilon_{t-k}]=0$$

Variance:

$$\gamma(0)=\operatorname{Var}(X_t)=\sum_{k=0}^{\infty}\varphi^{2k}\operatorname{Var}(\varepsilon_{t-k})=\sigma^2\sum_{k=0}^{\infty}\varphi^{2k}=\frac{\sigma^2}{1-\varphi^2}$$

Autocovariance: for $h\ge0$,

$$\gamma(h)=\operatorname{Cov}(X_t,X_{t+h})=\operatorname{Cov}\left(\sum_{k=0}^{\infty}\varphi^k\varepsilon_{t-k},\ \sum_{j=0}^{\infty}\varphi^j\varepsilon_{t+h-j}\right)$$

The noise terms shared by the two sums are $\varepsilon_{t-k}$ with $t+h-j=t-k$, i.e. $j=h+k\ge h$. By independence only these shared terms contribute:

$$\gamma(h)=\sum_{k=0}^{\infty}\varphi^k\varphi^{h+k}\sigma^2=\varphi^h\sigma^2\sum_{k=0}^{\infty}\varphi^{2k}=\varphi^h\frac{\sigma^2}{1-\varphi^2}=\varphi^h\gamma(0)$$

So the autocorrelation is $\rho(h)=\varphi^h$, decaying geometrically. The closer $|\varphi|$ is to $1$, the longer the memory.

> Comment: this problem shows what "stationary solution" means: the recursion itself generates a sequence from any initial value, but the sequence is stationary only if it starts in the infinitely distant past and $|\varphi|<1$. If $|\varphi|\ge1$ the variance diverges and no wide-sense stationary solution exists. $\varphi=1$ is the random walk, which is non-stationary.

### Example 3 (Advanced: spectral density of AR(1))

Problem: find the spectral density of the AR(1) process above and discuss the limits $\varphi=0$ and $\varphi\to1^-$.

Approach: use the Wiener–Khinchin theorem and take the discrete Fourier transform of $\gamma(h)=\varphi^{|h|}\gamma(0)$.

Solution:

$$f(\omega)=\frac{1}{2\pi}\sum_{h=-\infty}^{\infty}\varphi^{|h|}\gamma(0)e^{-i\omega h}$$

First compute the geometric sum. Let $S=\sum_{h=-\infty}^{\infty}\varphi^{|h|}e^{-i\omega h}$; then

$$S=1+\sum_{h=1}^{\infty}\varphi^h\left(e^{-i\omega h}+e^{i\omega h}\right)=1+\frac{\varphi e^{-i\omega}}{1-\varphi e^{-i\omega}}+\frac{\varphi e^{i\omega}}{1-\varphi e^{i\omega}}$$

Putting over a common denominator, the denominator is

$$(1-\varphi e^{-i\omega})(1-\varphi e^{i\omega})=1-2\varphi\cos\omega+\varphi^2$$

and the numerator is

$$(1-2\varphi\cos\omega+\varphi^2)+\varphi e^{-i\omega}(1-\varphi e^{i\omega})+\varphi e^{i\omega}(1-\varphi e^{-i\omega})$$

$$=1-2\varphi\cos\omega+\varphi^2+2\varphi\cos\omega-2\varphi^2=1-\varphi^2$$

Hence

$$S=\frac{1-\varphi^2}{1-2\varphi\cos\omega+\varphi^2}$$

so

$$f(\omega)=\frac{1}{2\pi}\cdot\frac{\sigma^2}{1-\varphi^2}\cdot\frac{1-\varphi^2}{1-2\varphi\cos\omega+\varphi^2}=\frac{\sigma^2}{2\pi(1-2\varphi\cos\omega+\varphi^2)}$$

**Discussion**:

- $\varphi=0$: $f(\omega)=\dfrac{\sigma^2}{2\pi}$, a constant—exactly the white-noise spectrum with equal energy at all frequencies.
- $\varphi\to1^-$: at $\omega=0$ the denominator is $1-2\varphi+\varphi^2=(1-\varphi)^2\to0$, so $f(0)\to\infty$ and the spectrum has a spike at zero frequency. This corresponds to "long memory, strong low-frequency content", approaching the $1/f^2$-type spectrum of a random walk.
- $\varphi<0$: the denominator is smallest at $\omega=\pi$ and the spectrum peaks at high frequency; the series tends to alternate in sign.

> Comment: the spectral density translates "memory in the time domain" into "energy distribution in the frequency domain". AR(1) has only one parameter $\varphi$, yet it determines both the decay rate and the position of the spectral peak. The easiest place to err is the numerator of the geometric sum: it is $1-\varphi^2$, not $1+\varphi^2$; a quick check is to insert the special value $\omega=0$.

## VI. Common Errors and Pitfalls

1. **Taking wide-sense stationarity for strict stationarity**: wrong—inferring that all distributions are shift invariant from "constant mean and lag-only autocovariance". Why wrong—wide-sense stationarity constrains only second moments, and higher-order distributions may change. Right—the two are equivalent only for special processes such as Gaussian ones; in general state them separately.
2. **Forgetting that the mean must be constant**: wrong—saying "it is stationary after removing the trend" for a trending series $X_t=t+Z_t$ while still applying spectral analysis to the original series. Why wrong—the mean varies with time and the autocovariance generally depends on $t$. Right—difference or detrend first, then test stationarity.
3. **Assuming stationarity implies ergodicity**: wrong—using the time average of one sample to estimate the ensemble mean directly. Why wrong—$X_t=Y$ is a stationary, non-ergodic counterexample. Right—verify the ergodicity condition, or state it as an explicit assumption.
4. **Computing the autocovariance as $E[X_tX_{t+\tau}]$ and forgetting to subtract the mean**: wrong—using the second moment when the mean is non-zero. Why wrong—the covariance must subtract $m^2$, otherwise a constant mean is mistaken for correlation. Right—$\gamma(\tau)=E[X_tX_{t+\tau}]-m^2$.
5. **Confusing the spectral density with the autocorrelation**: wrong—taking $\gamma(\tau)$ for the spectral density, or forgetting the $1/(2\pi)$ factor. Why wrong—they are a Fourier transform pair with different dimensions. Right—use the Wiener–Khinchin theorem and mind the constants of the forward and inverse transforms.
6. **Judging ergodicity of a periodic process by the covariance alone**: wrong—declaring it non-ergodic because $\gamma(\tau)=\cos\omega\tau$ does not decay. Why wrong—covariance decay is only a sufficient condition; the time average of a random-phase cosine does converge to the mean. Right—compute the time average explicitly, or use a finer ergodic theorem.
7. **Writing a stationary solution for AR(1) when $|\varphi|\ge1$**: wrong—applying $\sigma^2/(1-\varphi^2)$. Why wrong—the variance is negative or meaningless and the series diverges. Right—a stationary solution exists only for $|\varphi|<1$.

## VII. Summary and Mnemonics

Key points:

- Strict stationarity: all finite-dimensional distributions are shift invariant; wide-sense stationarity: constant mean, autocovariance depending only on the lag.
- Wide-sense stationarity is fully described by the mean $m$ and the autocovariance $\gamma(\tau)$; for Gaussian processes it is equivalent to strict stationarity.
- The autocovariance is symmetric, non-negative definite and satisfies $|\gamma(\tau)|\le\gamma(0)$.
- Ergodicity: the time average equals the ensemble average; extra conditions are needed and stationarity does not imply it.
- Wiener–Khinchin: $\gamma$ and the spectral density $f$ are a Fourier transform pair; white noise has a constant spectrum.
- AR(1): $\gamma(h)=\varphi^{|h|}\sigma^2/(1-\varphi^2)$ and spectral density $\sigma^2/[2\pi(1-2\varphi\cos\omega+\varphi^2)]$.

**Mnemonic: stationary means shift-invariant shape; wide sense looks at second-order; one long sample stands for all; ergodic means time average equals ensemble.**

`,
  },
  'stochastic-calculus': {
    chapter: 'Chapter 7 Introduction to Stochastic Analysis',
    title: 'The Itô Integral and Itô’s Lemma',
    summary:
      'Brownian paths are nowhere differentiable, so ordinary calculus fails. The Itô integral values each interval at its left endpoint and, together with Itô’s lemma (the stochastic chain rule), becomes the mathematical engine of derivative pricing.',
    keyPoints: [
      'The Brownian increment dW_t satisfies (dW_t)^2 = dt (the source of the Itô correction)',
      'The Itô integral ∫ H_t dW_t is a mean-square limit and requires predictability',
      'Itô’s lemma: df = f_t dt + f_x dX + ½ f_{xx} σ^2 dt (an extra second-order correction)',
      'Geometric Brownian motion dS_t = μ S_t dt + σ S_t dW_t is solved with Itô’s lemma',
      'Application: the Black–Scholes option pricing equation',
    ],
    content: String.raw`

In the previous lecture we learned that Brownian paths are continuous yet almost surely nowhere differentiable. The difference quotient $(B_{t+h}-B_t)/h$ has standard deviation $1/\sqrt h$, which grows as $h$ shrinks, so there is no limit at all. Traditional calculus is thus paralysed at once: $dB_t/dt$ does not exist, and the chain rule $df=f'\,dx$ loses its footing.

But reality does not allow us to stop. Finance must price options, physics must write dynamical equations with noise, biology must model random fluctuations in populations—all of these require integrating and differentiating stochastic processes. Kiyoshi Itô gave the answer in the 1940s: define the integral by evaluating at the **left endpoint** of each interval and accept a counterintuitive correction $(dB_t)^2=dt$, and a self-consistent and powerful stochastic calculus emerges.

The most famous product of this theory is the Black–Scholes option pricing formula. Its core is not financial intuition but **Itô's lemma**, which has one extra second-order term compared with the ordinary chain rule. This lecture answers: why must the Itô integral use the left endpoint? What exactly does $(dB)^2=dt$ mean? And why is the extra term not decoration but necessity?

## II. Rigorous Definitions

**Information flow and adapted processes**: $\{\mathcal{F}_t\}$ is the information up to time $t$; $H_t$ is called adapted if $H_t$ is determined by $\mathcal{F}_t$ (no peeking at the future). If in addition $H_t$ depends only on the discrete information before $t$ (left continuity), it is called **predictable**.

**Itô integral of a simple predictable process**: let

$$H_t=\sum_{i=0}^{n-1}H_{t_i}\mathbf{1}_{(t_i,t_{i+1}]}(t)$$

with $0=t_0<t_1<\cdots<t_n=t$ and $H_{t_i}$ a bounded $\mathcal{F}_{t_i}$-measurable random variable. Define

$$\int_0^tH_s\,dB_s=\sum_{i=0}^{n-1}H_{t_i}\big(B_{t_{i+1}}-B_{t_i}\big)$$

Note that the left endpoint $H_{t_i}$ is used; it depends only on information before $t_i$ and is independent of the increment $B_{t_{i+1}}-B_{t_i}$.

**General Itô integral**: for an adapted process $H$ with

$$E\left[\int_0^tH_s^2\,ds\right]<\infty$$

take a sequence of simple predictable processes $H^{(n)}$ converging to $H$ in $L^2$ and define

$$\int_0^tH_s\,dB_s=L^2\text{-}\lim_{n\to\infty}\int_0^tH_s^{(n)}\,dB_s$$

**Itô isometry**:

$$E\left[\left(\int_0^tH_s\,dB_s\right)^2\right]=E\left[\int_0^tH_s^2\,ds\right]$$

It follows at once that $E\left[\int_0^tH_sdB_s\right]=0$ and that $\int_0^tH_sdB_s$ is a martingale in $t$.

**Quadratic variation**: for $0=t_0<t_1<\cdots<t_n=t$,

$$[X]_t=\lim_{\|\Delta\|\to0}\sum_{i=0}^{n-1}(X_{t_{i+1}}-X_{t_i})^2$$

For $X=B$ this gives $[B]_t=t$; more generally, for $X_t=\int_0^tH_sdB_s$ the quadratic variation is $[X]_t=\int_0^tH_s^2ds$.

**Itô process**:

$$X_t=X_0+\int_0^t\mu_s\,ds+\int_0^t\sigma_s\,dB_s$$

written in differential form as

$$dX_t=\mu_t\,dt+\sigma_t\,dB_t$$

**Itô's lemma (one-dimensional)**: let $f(t,x)$ have continuous partial derivatives $f_t,f_x,f_{xx}$ and let $X_t$ be the Itô process above; then $Y_t=f(t,X_t)$ satisfies

$$dY_t=\left(f_t+\mu_tf_x+\frac12\sigma_t^2f_{xx}\right)dt+\sigma_tf_x\,dB_t$$

Equivalently,

$$df(t,X_t)=f_t\,dt+f_x\,dX_t+\frac12f_{xx}(dX_t)^2$$

with the conventions $dt\cdot dt=0$, $dt\cdot dB_t=0$, $dB_t\cdot dB_t=dt$.

**Stochastic differential equation (SDE)**:

$$dX_t=b(t,X_t)\,dt+\sigma(t,X_t)\,dB_t,\qquad X_0=x_0$$

**Geometric Brownian motion**:

$$dS_t=\mu S_t\,dt+\sigma S_t\,dB_t$$

**Stratonovich integral**: evaluates at the midpoint of each interval, written $\int H\circ dB$. Its relation to the Itô integral is

$$\int_0^tH_s\circ dB_s=\int_0^tH_s\,dB_s+\frac12[H,B]_t$$

When $H_t=\sigma(X_t)$, the Stratonovich SDE $dX=b\,dt+\sigma\circ dB$ is equivalent to the Itô SDE

$$dX=\left(b+\frac12\sigma\sigma'\right)dt+\sigma\,dB$$

## III. Why These Definitions

**Why must the left endpoint be used?** If the right endpoint $H_{t_{i+1}}$ were used, it would depend on the endpoint of the increment $B_{t_{i+1}}-B_{t_i}$, which amounts to "betting with knowledge of the future"—this is anticipative. Mathematically, $H_{t_{i+1}}$ is not independent of the increment, $E[H_{t_{i+1}}(B_{t_{i+1}}-B_{t_i})]$ is generally non-zero, and the integral is no longer a martingale. The left endpoint ensures that $H_{t_i}$ is independent of the increment, so

$$E\left[H_{t_i}(B_{t_{i+1}}-B_{t_i})\mid\mathcal{F}_{t_i}\right]=H_{t_i}E[B_{t_{i+1}}-B_{t_i}]=0$$

the whole sum has zero expectation, and the integral is fair. In finance this corresponds exactly to "one cannot trade at future prices".

**Why $(dB)^2=dt$?** In ordinary calculus $(dx)^2$ is a higher-order infinitesimal that can be neglected. But a Brownian increment $\Delta B\sim N(0,\Delta t)$ has squared expectation $\Delta t$ and standard deviation $\sqrt2\Delta t$. Dividing $[0,t]$ into $n$ pieces and summing:

$$E\left[\sum(\Delta B_i)^2\right]=t,\qquad \operatorname{Var}\left[\sum(\Delta B_i)^2\right]=\frac{2t^2}{n}\to0$$

The sum of squares converges in probability to $t$. So $(dB)^2$ is of the same order as $dt$ and cannot be dropped. This is the source of the extra second-order term in Itô's lemma.

**How is Itô's lemma derived?** Take the second-order Taylor expansion of $f(t,x)$:

$$df=f_t\,dt+f_x\,dX+\frac12f_{xx}(dX)^2+\cdots$$

where $dX=\mu\,dt+\sigma\,dB$. Substituting and using the multiplication rules:

$$(dX)^2=\mu^2(dt)^2+2\mu\sigma\,dt\,dB+\sigma^2(dB)^2=\sigma^2\,dt$$

hence

$$df=\left(f_t+\mu f_x+\frac12\sigma^2f_{xx}\right)dt+\sigma f_x\,dB$$

The ordinary chain rule has only the first two terms; the extra $\frac12\sigma^2f_{xx}dt$ in Itô's lemma is exactly the contribution of $(dX)^2$.

**What goes wrong if the correction is dropped?** Take $f(x)=x^2$ and $X_t=B_t$. The ordinary chain rule gives $d(B_t^2)=2B_t\,dB_t$, which integrates to $B_t^2=2\int_0^tB_sdB_s$, i.e. $\int B\,dB=B_t^2/2$. But this integral should have zero expectation (martingale), whereas $E[B_t^2/2]=t/2\ne0$, a contradiction. The correct result is

$$d(B_t^2)=2B_t\,dB_t+dt\quad\Longrightarrow\quad\int_0^tB_s\,dB_s=\frac12B_t^2-\frac12t$$

whose expectation is zero, and the contradiction disappears. Evidently the correction term is not optional; it is required to keep the identity consistent with the martingale property.

**Why is the Itô integral a martingale?** For a simple process each term of the sum has zero conditional expectation given $\mathcal{F}_{t_i}$, so the whole is a martingale; the martingale property survives the $L^2$ limit (under suitable integrability). The isometry comes from the vanishing of the cross terms:

$$E\left[\left(\sum H_{t_i}\Delta B_i\right)^2\right]=\sum E[H_{t_i}^2]E[(\Delta B_i)^2]=E\left[\sum H_{t_i}^2\Delta t_i\right]$$

Taking the limit gives $E[(\int H\,dB)^2]=E\int H^2dt$.

**What is the difference between Itô and Stratonovich?** Itô uses the left endpoint; the integral is a martingale but the chain rule gains an extra term. Stratonovich uses the midpoint; the chain rule agrees with ordinary calculus but the integral is not a martingale and "peeks" at information inside the interval. Physicists like Stratonovich (because it preserves covariance under coordinate changes) and financiers like Itô (because non-anticipativity and the martingale property correspond to no arbitrage). The two can be converted into each other, the correction being $\frac12$ times the quadratic covariation.

## IV. Intuition and Pictures

| Ordinary calculus | Itô calculus |
|---|---|
| $(dx)^2\approx0$ | $(dB)^2=dt$ |
| $df=f'\,dx$ | $df=f'\,dX+\frac12f''\sigma^2dt$ |
| the integral may be evaluated at any point | the left endpoint is required (non-anticipative) |
| paths are differentiable | paths are nowhere differentiable |

> Intuition: the amplitude of a Brownian wobble is of order $\sqrt{dt}$, and its square is exactly of order $dt$. Ordinary calculus treats the square of an infinitesimal as zero, whereas stochastic calculus must keep it—and that retention gives the stochastic world its own "quadratic variation". You can think of $(dB)^2=dt$ as "the energy of the wobble": the variances of the individual steps add up to exactly the elapsed time.

A crude but useful analogy: an ordinary function is like a smooth highway where the tangent predicts the road ahead; Brownian motion is like a road covered in gravel, where the "squared jolts" of each step do not disappear but accumulate into the distance travelled. Itô's lemma is the "chain rule with jolts".

Right versus wrong:

- Wrong: the expectation of the Itô integral $\int H\,dB$ is generally non-zero. Right: under $E\int H^2dt<\infty$ it is a martingale with zero mean.
- Wrong: Itô's lemma is just the ordinary chain rule. Right: it has an extra $\frac12f_{xx}\sigma^2dt$.
- Wrong: $(dB)^2$ is a higher-order infinitesimal that can be neglected. Right: it equals $dt$, of the same order as the first-order term.

## V. Worked Examples

### Example 1 (Basic: computing $\int B\,dB$ and its moments)

Problem: find the expression, expectation and variance of $I_t=\int_0^tB_s\,dB_s$.

Approach: apply Itô's lemma to $f(x)=x^2$.

Solution: $f_t=0$, $f_x=2x$, $f_{xx}=2$, $\mu=0$, $\sigma=1$. By Itô's lemma

$$d(B_t^2)=2B_t\,dB_t+\frac12\cdot2\cdot1^2\,dt=2B_t\,dB_t+dt$$

Rearranging and integrating:

$$\int_0^tB_s\,dB_s=\frac12B_t^2-\frac12t$$

Expectation: $E[B_t^2]=t$, so $E[I_t]=\dfrac12t-\dfrac12t=0$, consistent with the martingale property.

Variance:

$$\operatorname{Var}(I_t)=E[I_t^2]=E\left[\left(\frac12B_t^2-\frac12t\right)^2\right]=\frac14\left(E[B_t^4]-2tE[B_t^2]+t^2\right)$$

With $B_t\sim N(0,t)$, $E[B_t^4]=3t^2$ and $E[B_t^2]=t$, so

$$=\frac14(3t^2-2t^2+t^2)=\frac14\cdot2t^2=\frac12t^2$$

The Itô isometry gives the same: $E[I_t^2]=E\int_0^tB_s^2ds=\int_0^ts\,ds=\dfrac12t^2$.

> Comment: this is the "multiplication table" of stochastic calculus. Remember two things: the result is $B_t^2/2-t/2$, not $B_t^2/2$; and the mean is zero while the variance is not. Dropping $-t/2$ would give the wrong expectation $t/2$, directly violating the martingale property.

### Example 2 (Intermediate: geometric Brownian motion)

Problem: solve $dS_t=\mu S_t\,dt+\sigma S_t\,dB_t$ with $S_0>0$, and find $E[S_t]$ and $\operatorname{Var}(S_t)$.

Approach: $S_t>0$, so take logarithms to turn multiplication into addition. Apply Itô's lemma to $f(x)=\ln x$.

Solution: $f_x=1/x$, $f_{xx}=-1/x^2$, $f_t=0$. By Itô's lemma

$$d(\ln S_t)=\frac1{S_t}dS_t-\frac12\frac1{S_t^2}(dS_t)^2$$

$$=\frac1{S_t}\big(\mu S_tdt+\sigma S_tdB_t\big)-\frac12\frac1{S_t^2}\sigma^2S_t^2dt$$

$$=\left(\mu-\frac{\sigma^2}{2}\right)dt+\sigma\,dB_t$$

Integrating:

$$\ln S_t=\ln S_0+\left(\mu-\frac{\sigma^2}{2}\right)t+\sigma B_t$$

so

$$S_t=S_0\exp\left(\left(\mu-\frac{\sigma^2}{2}\right)t+\sigma B_t\right)$$

Expectation: $\sigma B_t\sim N(0,\sigma^2t)$, and using the moment generating function of the normal, $E[e^{\sigma B_t}]=e^{\sigma^2t/2}$,

$$E[S_t]=S_0e^{(\mu-\sigma^2/2)t}e^{\sigma^2t/2}=S_0e^{\mu t}$$

Variance: first the second moment,

$$E[S_t^2]=S_0^2e^{2(\mu-\sigma^2/2)t}E[e^{2\sigma B_t}]=S_0^2e^{(2\mu-\sigma^2)t}e^{2\sigma^2t}=S_0^2e^{(2\mu+\sigma^2)t}$$

so

$$\operatorname{Var}(S_t)=S_0^2e^{2\mu t}\left(e^{\sigma^2t}-1\right)$$

> Comment: the drift is corrected to $\mu-\sigma^2/2$, the most famous by-product of Itô's lemma. Many people intuitively write $S_t=S_0e^{\mu t+\sigma B_t}$, which would give $E[S_t]=S_0e^{(\mu+\sigma^2/2)t}$, inconsistent with $S_0e^{\mu t}$. The larger the volatility, the more the logarithmic drift is pushed down, yet the expected price still grows at rate $\mu$—the two facts are not contradictory.

### Example 3 (Advanced: the Ornstein–Uhlenbeck process)

Problem: solve $dX_t=-\theta X_t\,dt+\sigma\,dB_t$ with $X_0=x_0$ and $\theta>0$. Find $E[X_t]$, $\operatorname{Var}(X_t)$ and the limiting distribution as $t\to\infty$.

Approach: this is a first-order linear SDE; use the integrating factor $e^{\theta t}$.

Solution: by the product rule ($e^{\theta t}$ is an ordinary differentiable function, and multiplying it by the Itô differential of $X_t$ produces no extra second-order term, because the cross term of $d(e^{\theta t})=\theta e^{\theta t}dt$ with $dB$ is $dt\cdot dB=0$):

$$d\left(e^{\theta t}X_t\right)=e^{\theta t}dX_t+\theta e^{\theta t}X_tdt=e^{\theta t}\big(-\theta X_tdt+\sigma dB_t\big)+\theta e^{\theta t}X_tdt=\sigma e^{\theta t}dB_t$$

Integrating:

$$e^{\theta t}X_t=x_0+\sigma\int_0^te^{\theta s}dB_s$$

so

$$X_t=x_0e^{-\theta t}+\sigma\int_0^te^{-\theta(t-s)}dB_s$$

Expectation: the Itô integral has zero mean,

$$E[X_t]=x_0e^{-\theta t}\to0$$

Variance: by the Itô isometry,

$$\operatorname{Var}(X_t)=\sigma^2E\left[\left(\int_0^te^{-\theta(t-s)}dB_s\right)^2\right]=\sigma^2\int_0^te^{-2\theta(t-s)}ds$$

$$=\sigma^2\left[\frac{e^{-2\theta(t-s)}}{2\theta}\right]_{s=0}^{s=t}=\frac{\sigma^2}{2\theta}\left(1-e^{-2\theta t}\right)$$

As $t\to\infty$ the mean tends to $0$ and the variance to $\dfrac{\sigma^2}{2\theta}$. Since $X_t$ is Gaussian (a deterministic function plus an Itô integral with a deterministic integrand), the limiting distribution is

$$X_\infty\sim N\left(0,\frac{\sigma^2}{2\theta}\right)$$

> Comment: the OU process is "Brownian motion with reversion": the larger $\theta$, the faster the reversion and the smaller the stationary variance. It is also the solution of the Vasicek interest rate model and of the Langevin equation. Note that the exponent of the integrating factor is $+\theta t$ while that of the solution is $-\theta t$; in the variance integral the exponent is $-2\theta(t-s)$, so do not lose the factor $2$.

### Example 4 (Advanced: the Black–Scholes equation)

Problem: let the stock price be $dS_t=\mu S_tdt+\sigma S_tdB_t$ and the option price $V(t,S_t)$ be smooth. Construct a riskless portfolio and derive the PDE satisfied by $V$.

Approach: write $dV$ with Itô's lemma, then hedge away the $dB$ term with $\Delta=V_S$ shares of the stock.

Solution: by Itô's lemma,

$$dV=\left(V_t+\mu SV_S+\frac12\sigma^2S^2V_{SS}\right)dt+\sigma SV_S\,dB$$

Construct the portfolio $\Pi=V-\Delta S$ with $\Delta=V_S$ (adjusted continuously). Then

$$d\Pi=dV-V_S\,dS$$

$$=\left(V_t+\mu SV_S+\frac12\sigma^2S^2V_{SS}\right)dt+\sigma SV_SdB-V_S\big(\mu Sdt+\sigma SdB\big)$$

The $dB$ terms cancel, and so do the $\mu SV_S$ terms:

$$d\Pi=\left(V_t+\frac12\sigma^2S^2V_{SS}\right)dt$$

The portfolio is instantaneously riskless, so by no arbitrage it must earn the risk-free rate $r$:

$$d\Pi=r\Pi\,dt=r(V-SV_S)\,dt$$

Comparing the two expressions:

$$V_t+\frac12\sigma^2S^2V_{SS}=r(V-SV_S)$$

Rearranging gives the Black–Scholes equation

$$\frac{\partial V}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2V}{\partial S^2}+rS\frac{\partial V}{\partial S}-rV=0$$

> Comment: the key to the derivation is "eliminating $dB$" and "eliminating $\mu$". The former uses the $\Delta$ hedge, and the latter is an algebraic consequence of Itô's lemma—which is why the option price does not depend on the stock's expected return $\mu$ but only on the volatility $\sigma$ and the risk-free rate $r$. The equation is parabolic and needs a terminal condition (such as $V(T,S)=(S-K)^+$ for a European call) and boundary conditions to be well posed.

## VI. Common Errors and Pitfalls

1. **Omitting the Itô correction**: wrong—using the ordinary chain rule $df=f'dX$. Why wrong—$(dX)^2$ contains $\sigma^2dt$ and cannot be neglected. Right—$df=f_tdt+f_xdX+\frac12f_{xx}(dX)^2$.
2. **Treating $(dB)^2$ as zero**: wrong—discarding second-order terms in expansions. Why wrong—$dB\sim\sqrt{dt}$, so its square is of order $dt$, the same order as the first-order terms. Right—remember the multiplication rules $dB\cdot dB=dt$, $dt\cdot dB=0$, $dt\cdot dt=0$.
3. **Mixing Itô and Stratonovich**: wrong—computing with Itô's formula and then interpreting the result in the Stratonovich sense, or vice versa. Why wrong—the two differ by $\frac12$ times the quadratic covariation, giving different numbers. Right—declare which integral is used and stay consistent.
4. **Evaluating the integral at the right endpoint**: wrong—using $H_{t_{i+1}}$. Why wrong—it introduces future information and destroys the martingale property and the isometry. Right—the Itô integral uses the left endpoint.
5. **Getting the drift of geometric Brownian motion wrong**: wrong—writing $S_t=S_0e^{\mu t+\sigma B_t}$. Why wrong—the $-\sigma^2/2$ correction is missing. Right—$S_t=S_0\exp((\mu-\sigma^2/2)t+\sigma B_t)$.
6. **Computing the expectation of an Itô integral wrongly**: wrong—believing $E[\int HdB]\ne0$. Why wrong—under $E\int H^2dt<\infty$ it is a martingale with zero mean. Right—use the isometry or the martingale property.
7. **Losing the factor 2 in the OU variance**: wrong—writing $\sigma^2(1-e^{-\theta t})/\theta$. Why wrong—the integrand is $e^{-2\theta(t-s)}$, whose integral gives a denominator $2\theta$. Right—$\sigma^2(1-e^{-2\theta t})/(2\theta)$.

## VII. Summary and Mnemonics

Key points:

- Brownian paths are non-differentiable and ordinary calculus fails; the Itô integral is defined at the left endpoint, ensuring non-anticipativity and the martingale property.
- The core identity $(dB_t)^2=dt$, i.e. the quadratic variation $[B]_t=t$; the multiplication rules $dt\cdot dB=0$, $dt\cdot dt=0$.
- Itô isometry: $E[(\int HdB)^2]=E\int H^2dt$; the Itô integral is a martingale.
- Itô's lemma: $df=f_tdt+f_xdX+\frac12f_{xx}\sigma^2dt$, with a second-order correction beyond the ordinary chain rule.
- Geometric Brownian motion: $S_t=S_0\exp((\mu-\sigma^2/2)t+\sigma B_t)$ and $E[S_t]=S_0e^{\mu t}$.
- OU process: the mean reverts exponentially and the stationary variance is $\sigma^2/(2\theta)$.
- The Black–Scholes equation follows from "eliminating $dB$ by $\Delta$ hedging" and does not depend on $\mu$.

**Mnemonic: Itô evaluates on the left; dB squared equals dt; the lemma adds a second-order term; option pricing is born from it.**

`,
  },
};

export default map;
