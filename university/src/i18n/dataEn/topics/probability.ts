import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  bayes: {
    chapter: 'Chapter 1 Random Events and Probability',
    title: 'Conditional Probability and Bayes\' Formula',
    summary:
      'Conditional probability captures the probability updated by known information; Bayes\' formula is the mathematical heart of inverse inference.',
    content: String.raw`

A rare disease has an incidence of only one in a thousand. A hospital acquires a new test kit advertised as "99% accurate": 99% of true patients test positive, and 1% of healthy people are also wrongly flagged positive. Xiao Ming gets his report: positive. His legs go weak and he thinks, "99% accurate — I am almost certainly ill."

Hold on — let the mathematics show you. In every thousand people about 1 really has the disease and 999 are healthy. Among those who test positive, about $1 \times 0.99 = 0.99$ are true patients, and about $999 \times 0.01 \approx 10$ are misjudged healthy people. So the proportion of truly ill people among the positives is only $0.99/(0.99+10) \approx 9\%$, far from 99%. The question this topic answers is exactly this: **after seeing evidence, how should we correctly update our belief about the cause?** The forecast says an 80% chance of rain tomorrow — do you take an umbrella? You draw a red ball in a lottery — what fraction of the pool is red? The common mathematical structure behind all these questions is conditional probability and Bayes' formula.

## 2. Rigorous Definitions

Let $A$ and $B$ be two events of the same random experiment, with $P(B) > 0$. The quantity

$$P(A \mid B) = \frac{P(AB)}{P(B)}$$

is called the **conditional probability that $A$ occurs given that $B$ occurs**, where $P(AB) = P(A \cap B)$ means that $A$ and $B$ occur together. This gives the **multiplication formula** $P(AB) = P(B)\,P(A \mid B)$.

If the events $B_1, B_2, \dots, B_n$ are pairwise disjoint ($B_iB_j = \varnothing$, $i \ne j$) and $B_1 \cup \cdots \cup B_n = \Omega$ (exactly one of them occurs in every trial), they form a **partition** of the sample space. Given a partition, for any event $A$ we have the **law of total probability**:

$$P(A) = \sum_{i=1}^{n} P(B_i)\,P(A \mid B_i)$$

and **Bayes' formula**:

$$P(B_i \mid A) = \frac{P(B_i)\,P(A \mid B_i)}{\sum_{j=1}^{n} P(B_j)\,P(A \mid B_j)}$$

Events $A$ and $B$ are **mutually independent**, defined by $P(AB) = P(A)P(B)$; when $P(B)>0$ this is equivalent to $P(A \mid B) = P(A)$, i.e. "knowing that $B$ happened does not change the probability of $A$ at all".

## 3. Why Defined This Way

**Why divide by $P(B)$?** Once $B$ is known to have happened, the sample space effectively shrinks from $\Omega$ to $B$, and the part of $A$ that can still occur is only $A \cap B$. But the total probability of the shrunken space is no longer 1 but $P(B)$, so the probability must be renormalized, hence the division by $P(B)$. In other words, a conditional probability is "keeping score again on a new field".

**Why require $P(B) > 0$?** The denominator cannot be zero. For $P(B)=0$ the conditional probability is undefined at undergraduate level; a more advanced theory of regular conditional probability is needed, which we exclude here.

**Why does the law of total probability need a "partition"?** Disjointness prevents double counting, and completeness prevents missing paths. Roll a fair die and let $B_1=\{1,2\}$, $B_2=\{2,3\}$; they overlap. Mechanically writing $P(A) = P(B_1)P(A \mid B_1) + P(B_2)P(A \mid B_2)$ counts the part of $A$ occurring through a 2 twice, so the result is necessarily too large — that is the counterexample for dropping disjointness. Conversely, if the partition omits $B_3$, the part of $A$ occurring through $B_3$ is missed entirely.

**Why is "independent" never "disjoint"?** Independence says "$B$ happening does not affect $A$"; disjointness says "if $B$ happens, $A$ cannot". If $P(A)$ and $P(B)$ are both positive and the events are disjoint, then $P(A \mid B) = 0 \ne P(A)$, so they are maximally dependent. Remember: **when the probabilities are positive, independent events can certainly occur together, while disjoint events never can**.

**Why is Bayes' formula called "inverse"?** The law of total probability goes "from cause to effect": given the probabilities of the causes $B_i$, find the total probability of the effect $A$. Bayes' formula goes "from effect back to cause": given that $A$ happened, find how suspicious each cause $B_i$ is. The two are tied together by the multiplication formula and the partition condition; they are two directions of one thing.

## 4. Intuition and Pictures

Think of a Venn diagram as a pizza: $\Omega$ is the whole pizza and $B$ is one slice. Once $B$ is known to have happened your world is only that slice; the small overlap of $A$ with $B$, as a proportion of $B$, is $P(A \mid B)$. The law of total probability cuts the $A$ slice according to "which path $B_i$ it came through", each piece of area $P(B_i)P(A \mid B_i)$, and sums them to get $P(A)$.

The three terms in Bayes' formula, matched one by one with the disease-testing example:

| Name | Position in the formula | Meaning in the disease example |
|------|------|------|
| Prior probability | $P(B_i)$ | Probability of being ill before testing (0.1%) |
| Likelihood | $P(A \mid B_i)$ | Probability of observing a positive given ill/healthy (99% and 1%) |
| Posterior probability | $P(B_i \mid A)$ | Probability of truly being ill after a positive (about 9%) |

> **Intuition**: posterior $\propto$ prior $\times$ likelihood. The prior is "background", the likelihood is "performance", the posterior is the overall verdict. When the base rate is too low, even an accurate test is drowned by a flood of false positives — that is the mathematical basis for "a positive screen for a rare disease need not cause panic first".

Disjointness and independence must be kept apart: the criterion for disjointness is $P(AB)=0$; the criterion for independence is $P(AB)=P(A)P(B)$. The former says "never occur together", the latter "do not influence each other".

## 5. Worked Examples

### Example 1 (Basic: Applying the Definition Directly)

Problem: Roll a fair die, $A$ = "the number is even", $B$ = "the number is at least 4". Find $P(A \mid B)$.

Analysis: $B=\{4,5,6\}$ contains 3 elementary events and $A \cap B = \{4,6\}$ contains 2. One may compute from the definition or simply shrink the sample space; the two routes check each other.

Solution: From the definition, $P(B)=\frac{3}{6}=\frac{1}{2}$ and $P(AB)=\frac{2}{6}=\frac{1}{3}$, so

$$P(A \mid B) = \frac{P(AB)}{P(B)} = \frac{1/3}{1/2} = \frac{2}{3}$$

Checking by shrinking the sample space: the number is known to be one of 4, 5, 6, equally likely, of which 2 are even — again $\frac{2}{3}$. The two computations agree, showing that "shrinking the sample space" and the definition are two ways of saying the same thing.

### Example 2 (Intermediate: A Full Bayes Computation)

Problem: The prevalence of a disease is $P(D)=0.001$. The sensitivity is $P(+ \mid D)=0.99$ (probability that a true patient tests positive) and the false-positive rate is $P(+ \mid \bar{D})=0.01$. A person tests positive; find the probability that he is truly ill.

Analysis: A typical "from effect back to cause". $D$ and $\bar{D}$ form a partition; first compute $P(+)$ with the law of total probability, then $P(D \mid +)$ with Bayes' formula.

Solution: Total probability of a positive:

$$P(+) = P(D)P(+ \mid D) + P(\bar{D})P(+ \mid \bar{D}) = 0.001 \times 0.99 + 0.999 \times 0.01 = 0.01098$$

Then by Bayes' formula:

$$P(D \mid +) = \frac{0.001 \times 0.99}{0.01098} = \frac{0.00099}{0.01098} \approx 0.0902$$

So the probability that a positive person is truly ill is only about 9%. Comment: the trap is that "99% accurate" has been quietly redefined — it is the likelihood $P(+ \mid D)$, not the posterior $P(D \mid +)$. The healthy base (999 people) far outnumbers the patients (1 person); a 1% false-positive rate applied to the large base manufactures about 10 false positives, drowning the fewer than 1 true positive. The lower the base rate, the more extreme the effect.

### Example 3 (Advanced: The Monty Hall Problem)

Problem: There are three doors and the prize is behind one of them. You choose door 1. The host (who knows where the prize is) opens another door with a goat, say door 3, and then asks: do you want to switch to door 2? What are the winning probabilities if you switch and if you do not?

Analysis: The key is that the host "does not open a door at random" — he uses information to eliminate a wrong option. Let $A_i$ = "the prize is behind door $i$" and $B$ = "the host opens door 3".

Solution: Priors $P(A_i) = \frac{1}{3}$. Likelihoods: if the prize is behind door 1, the host opens one of doors 2 and 3 at random (both have goats), so $P(B \mid A_1)=\frac{1}{2}$; if the prize is behind door 2, door 3 must have a goat and the host has no choice, $P(B \mid A_2)=1$; if the prize is behind door 3, the host cannot open door 3, $P(B \mid A_3)=0$. Hence

$$P(A_1 \mid B) = \frac{\frac{1}{3}\times\frac{1}{2}}{\frac{1}{3}\times\frac{1}{2} + \frac{1}{3}\times 1 + \frac{1}{3}\times 0} = \frac{1/6}{1/6+1/3} = \frac{1}{3}$$

The probability of winning without switching is $\frac{1}{3}$; switching gives $1-\frac{1}{3}=\frac{2}{3}$. **Switching is better — the probability doubles.** Comment: the trap is that intuition treats the host's behaviour as "a random event unrelated to the prize". If he opened a door blindfolded and the game restarted whenever he revealed the prize, the answer would indeed be $\frac{1}{2}$; but he has information and is constrained by the rules, so both numerator and denominator of the conditional probability are quietly changed by his behaviour. The power of Bayes' formula is precisely that it accounts clearly for how information enters the reasoning.

## 6. Common Mistakes and Pitfalls

1. **Wrong approach**: assuming $P(A \mid B) = P(B \mid A)$. **Why wrong**: the event and the condition are completely interchanged, and the values are generally quite different (in Example 2 one is 99% and the other 9%). **Correct approach**: convert with Bayes' formula, and make sure the denominator is the total probability.

2. **Wrong approach**: reading "test accuracy 99%" as "if positive, the probability of illness is 99%". **Why wrong**: it confuses the likelihood with the posterior and ignores the base-rate prior. **Correct approach**: write down the prior and the likelihood first, then compute the posterior with Bayes' formula.

3. **Wrong approach**: believing disjoint means independent. **Why wrong**: disjoint events with positive probability satisfy $P(A \mid B)=0 \ne P(A)$, so they are exactly dependent. **Correct approach**: test independence with $P(AB)=P(A)P(B)$ and disjointness with $P(AB)=0$; the two are different.

4. **Wrong approach**: forcing the law of total probability on a family of events that is not a partition. **Why wrong**: overlaps cause double counting and omissions cause missed counting. **Correct approach**: first check pairwise disjointness and that the union is $\Omega$.

5. **Wrong approach**: writing $P(A \mid B)$ without checking $P(B)>0$. **Why wrong**: the denominator is zero and the formula is meaningless. **Correct approach**: confirm first that the conditioning event has positive probability.

## 7. Summary and Mnemonics

Key points to review:

- Conditional probability $P(A \mid B)=\frac{P(AB)}{P(B)}$ ($P(B)>0$); its essence is shrinking the sample space and renormalizing;
- The law of total probability goes "from cause to effect" and requires the $B_i$ to form a partition; Bayes' formula goes "from effect back to cause", with prior times likelihood in the numerator and the total probability in the denominator;
- Prior $\times$ likelihood $\propto$ posterior; with a low base rate the posterior is drowned by the army of misjudgements;
- Independence $\iff P(AB)=P(A)P(B)$, completely different from disjointness.

**Mnemonic: Conditional probability shrinks the space; total probability goes cause to effect; Bayes goes effect to cause; keep independent and disjoint apart.**`,
    keyPoints: [
      'Conditional probability = shrinking the sample space: P(A|B) = P(AB)/P(B)',
      'The law of total probability goes "from cause to effect"; Bayes\' formula goes "from effect back to cause"',
      'Disjoint ≠ independent: independent events can occur simultaneously',
    ],
  },

  distributions: {
    chapter: 'Chapter 2 Random Variables and Their Distributions',
    title: 'Common Probability Distributions',
    summary:
      'Binomial, Poisson, uniform, exponential, normal — five distributions cover the great majority of undergraduate probability models.',
    content: String.raw`

Life is full of phenomena that are "random yet orderly": how many heads in ten coin tosses? How many complaints does a help desk receive in an hour? How long do you wait for a bus? How are the heights of the students in a school distributed? A random variable translates each random outcome into a real number, and a **distribution** answers: with what probability does each number occur? One of the most valuable achievements of probability theory is the discovery of a few distribution patterns that recur throughout nature — the binomial counts successes, the Poisson counts rare events, the uniform means equiprobable, the exponential describes waiting times, and the normal describes measurement error and large sums. Master these five distributions and you hold five keys that open the great majority of undergraduate probability models.

## 2. Rigorous Definitions

First a unified "shell". For any random variable $X$, the function

$$F(x) = P(X \le x), \qquad x \in \mathbb{R}$$

is called the **distribution function** of $X$. It is non-decreasing, right-continuous, $F(-\infty)=0$, $F(+\infty)=1$, and

$$P(a < X \le b) = F(b) - F(a)$$

If $X$ takes only countably many values it is **discrete**, with **probability mass function** $p_k = P(X=x_k)$ satisfying $p_k \ge 0$ and $\sum_k p_k = 1$. If there is a nonnegative integrable function $f(x)$ with $F(x) = \int_{-\infty}^{x} f(t)\,\mathrm{d}t$, then $X$ is **continuous** and $f(x)$ is its **probability density function**, satisfying $f(x) \ge 0$ and $\int_{-\infty}^{+\infty} f(x)\,\mathrm{d}x = 1$.

Five common distributions:

**0-1 (Bernoulli) distribution**: $P(X=1)=p$, $P(X=0)=1-p$, i.e. a single trial with only two outcomes.

**Binomial distribution $X \sim B(n,p)$**: the total number of successes in $n$ independent Bernoulli trials (success probability $p$ each).

$$P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}, \quad k=0,1,\dots,n$$

**Poisson distribution $X \sim P(\lambda)$** ($\lambda>0$): counting rare events.

$$P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k=0,1,2,\dots$$

**Uniform distribution $X \sim U[a,b]$**: $f(x)=\frac{1}{b-a}$ for $a \le x \le b$, zero outside.

**Exponential distribution $X \sim E(\lambda)$** ($\lambda>0$): $f(x)=\lambda e^{-\lambda x}$ for $x>0$, with the **memoryless property**:

$$P(X > s+t \mid X > s) = P(X > t)$$

**Normal distribution $X \sim N(\mu, \sigma^2)$** ($\sigma>0$):

$$f(x) = \frac{1}{\sqrt{2\pi}\,\sigma}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

Standardize $Z = \frac{X-\mu}{\sigma} \sim N(0,1)$ and look up the standard normal distribution function $\Phi(z)$:

$$P(a < X \le b) = \Phi\!\left(\frac{b-\mu}{\sigma}\right) - \Phi\!\left(\frac{a-\mu}{\sigma}\right)$$

## 3. Why Defined This Way

**Why is a unified shell, the distribution function, needed?** Discrete variables use mass functions and continuous ones use densities, two languages each speaking for itself; the distribution function works for both and also handles more general random variables. It is also the natural language for studying limits.

**Why must a density be nonnegative with integral 1?** A density is "probability per unit length": probability cannot be negative (nonnegative), and total probability must be 1 (normalization). Any function satisfying these two conditions can legitimately pose as a density.

**Why is the Poisson distribution a model for rare events?** The Poisson theorem says: when $n$ is large, $p$ is small and $\lambda=np$ is moderate, $B(n,p) \approx P(\lambda)$. Cut an hour into $n$ short intervals, each with a tiny event probability $p$ and independent of the others; the total count is binomial. The more intervals and the smaller their probability, the limit is exactly Poisson. Hence "complaints per hour" and "typos per page" are Poisson.

**Why is the exponential distribution "memoryless"?** The memoryless property $P(X>s+t\mid X>s)=P(X>t)$ means "having already waited $s$ minutes, the probability of waiting more than another $t$ minutes is the same as at the start". This defies everyday intuition (the component is clearly older), but it exactly captures "purely random failure": failure is not postponed because the past was uneventful. One can prove that the only continuous distribution with the memoryless property is the exponential.

**Why is the normal distribution ubiquitous?** The sum of a large number of small independent random influences has a distribution close to normal — that is the central limit theorem. Height is influenced by thousands of genetic and environmental factors, and measurement error is the composite of many tiny perturbations, so both are approximately normal.

## 4. Intuition and Pictures

Comparison of the characters of the five distributions:

| Distribution | What it counts | Expectation | Variance |
|------|------|------|------|
| Binomial $B(n,p)$ | Number of successes | $np$ | $np(1-p)$ |
| Poisson $P(\lambda)$ | Rare events | $\lambda$ | $\lambda$ |
| Uniform $U[a,b]$ | Equiprobable values | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Exponential $E(\lambda)$ | Waiting time | $\frac{1}{\lambda}$ | $\frac{1}{\lambda^2}$ |
| Normal $N(\mu,\sigma^2)$ | Superposed errors | $\mu$ | $\sigma^2$ |

> **Intuition**: as $n$ grows the bar chart of the binomial with $p=0.5$ looks more and more like the normal bell curve — not a coincidence, but the central limit theorem visible to the naked eye.

Two concepts that must be kept apart:

| Statement | Right? | Why |
|------|------|------|
| $P(X=a)=f(a)$ (continuous case) | Wrong | The probability of a single point is always 0; $f(a)$ is a density, not a probability |
| $P(a<X\le b)=\int_a^b f(x)\,\mathrm{d}x$ | Right | Probability is the area under the density curve |
| The standard deviation of $N(\mu,100)$ is 100 | Wrong | The second parameter is the variance; the standard deviation is 10 |

## 5. Worked Examples

### Example 1 (Basic: Binomial Distribution)

Problem: Toss 10 fair coins and let $X$ be the number of heads. Find $P(X=5)$, $E(X)$ and $D(X)$.

Analysis: Each coin is a Bernoulli trial with $p=\frac{1}{2}$; the 10 coins are independent, so $X \sim B(10,\frac{1}{2})$.

Solution:

$$P(X=5) = \binom{10}{5}\left(\frac{1}{2}\right)^5\left(\frac{1}{2}\right)^5 = \frac{252}{1024} \approx 0.246$$

$$E(X) = np = 5, \qquad D(X) = np(1-p) = 2.5$$

Comment: $\binom{10}{5}=252$ counts the ways to choose which 5 coins show heads, and $\left(\frac{1}{2}\right)^{10}$ is the probability of each specified outcome (there are $2^{10}=1024$ equiprobable outcomes). The expectation 5 matches intuition; the variance 2.5 says the number of heads typically deviates from the mean by about $\sqrt{2.5}\approx 1.6$ coins.

### Example 2 (Intermediate: Poisson Distribution)

Problem: A shop receives on average 2 complaints per hour. Suppose the number of complaints in an hour is $X \sim P(2)$; find $P(X \ge 3)$.

Analysis: Complaints are "random events occurring sparsely over a long period", so use Poisson. Computing $P(X\ge 3)$ directly needs an infinite series, so use the complement $P(X \le 2)$.

Solution:

$$P(X \le 2) = e^{-2}\left(1 + 2 + \frac{2^2}{2!}\right) = 5e^{-2}$$

$$P(X \ge 3) = 1 - 5e^{-2} \approx 1 - 0.6767 = 0.3233$$

Comment: Why Poisson and not binomial? View the hour as $n=1000$ one-minute intervals, each with complaint probability $p=0.002$ independent of the others; the total is $\sim B(1000, 0.002)$ with $\lambda = np = 2$. By the Poisson theorem $B(1000,0.002) \approx P(2)$ — the binomial formula would need 1000 terms, Poisson needs three.

### Example 3 (Advanced: Computing with the Normal Distribution)

Problem: Scores on a city-wide exam are $X \sim N(70, 100)$ (in points). (1) Find $P(60 \le X \le 85)$; (2) find the proportion scoring above 90; (3) explain the $3\sigma$ rule.

Analysis: In $N(70,100)$, $\mu=70$ and $\sigma^2=100$, so $\sigma=10$. Every normal probability is converted by standardizing $Z=\frac{X-\mu}{\sigma} \sim N(0,1)$ and looking up $\Phi$.

Solution: (1) Standardize the endpoints: $\frac{60-70}{10}=-1$ and $\frac{85-70}{10}=1.5$, so

$$P(60 \le X \le 85) = \Phi(1.5) - \Phi(-1) = 0.9332 - 0.1587 = 0.7745$$

(2) $\frac{90-70}{10}=2$, so

$$P(X \ge 90) = 1 - \Phi(2) = 0.0228$$

that is, about 2.3% of candidates score above 90.

(3) The $3\sigma$ rule: $P(\mu-3\sigma < X < \mu+3\sigma) = \Phi(3)-\Phi(-3) \approx 0.9974$; a normal variable almost surely lies within 3 standard deviations of the mean, and anything beyond can be regarded as anomalous.

Comment: There are three traps — taking the second parameter 100 for the standard deviation (it is the variance); forgetting to standardize and looking up raw scores; failing to recall $\Phi(-1) = 1-\Phi(1)$. Convert to $Z$ first and look up second: that is the universal entry to normal computations.

## 6. Common Mistakes and Pitfalls

1. **Wrong approach**: taking the second parameter of $N(\mu,\sigma^2)$ for the standard deviation. **Why wrong**: it is the variance. **Correct approach**: take the square root to get $\sigma$, then standardize.

2. **Wrong approach**: saying "the probability that a continuous random variable takes $a$ is $f(a)$". **Why wrong**: the probability of a single point is always 0 for a continuous variable and $f(a)$ is a density value; only an integral (an area) is a probability. **Correct approach**: use $\int_a^b f(x)\,\mathrm{d}x$.

3. **Wrong approach**: using the Poisson approximation for events that are not rare. **Why wrong**: the Poisson theorem requires large $n$, small $p$ and moderate $\lambda=np$; for larger $p$ the binomial and Poisson are far apart. **Correct approach**: check the premises first; for large $p$ use the binomial or a normal approximation.

4. **Wrong approach**: applying the memoryless property to all distributions. **Why wrong**: it is unique to the exponential; the uniform and normal do not have it. **Correct approach**: only for $X \sim E(\lambda)$ may one use $P(X>s+t\mid X>s)=P(X>t)$.

5. **Wrong approach**: describing sampling without replacement by a binomial distribution. **Why wrong**: draws without replacement are not independent, whereas the binomial requires independent repetitions. **Correct approach**: for a large population use the binomial as an approximation; for a small population use the hypergeometric distribution.

6. **Wrong approach**: dropping the binomial coefficient $\binom{n}{k}$ when computing a binomial probability. **Why wrong**: the $k$ successes can occur in any $k$ positions, $\binom{n}{k}$ ways in all. **Correct approach**: $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$, not one factor less.

## 7. Summary and Mnemonics

Key points to review:

- The distribution function $F(x)=P(X\le x)$ describes every random variable uniformly; discrete variables use mass functions, continuous ones densities (nonnegative, integral 1);
- The binomial counts successes in $n$ Bernoulli trials, $E=np$ and $D=np(1-p)$; Poisson counts rare events, $E=D=\lambda$, and approximates the binomial for large $n$ and small $p$;
- Uniform means equiprobable; exponential describes waiting and is the only memoryless one; for the normal, standardize first and look up $\Phi$;
- For a continuous variable a single point has probability 0 and probability is the area under the density curve; the $3\sigma$ rule: almost surely within $\mu\pm 3\sigma$.

**Mnemonic: Binomial counts successes, Poisson counts rare events, uniform is equiprobable, exponential is waiting, normal standardizes first.**`,
    keyPoints: [
      'Binomial: number of successes in n Bernoulli trials; mean np, variance np(1-p)',
      'Poisson approximates the binomial (large n, small p); mean and variance both λ',
      'The exponential distribution is the only continuous memoryless distribution',
      'For the normal distribution, standardize first and then look up the Φ table',
    ],
  },

  'random-vectors': {
    chapter: 'Chapter 2 Random Variables and Their Distributions',
    title: 'Multivariate Random Variables and Their Distributions',
    summary:
      'One trial records two numbers at once: the joint distribution shows the whole, the marginals show the individuals, the conditional shows the relation, and independence shows separability.',
    content: String.raw`

Reality rarely has only one number varying at random. Toss two dice and record (face of the first, face of the second); at a health check record (height, weight); in a household survey record (income, expenditure). Viewing these paired numbers as a whole $(X,Y)$ gives a **two-dimensional random variable**. Univariate knowledge is no longer enough: we want to know whether $X$ and $Y$ are related — are heavier people generally taller? Do the two variables "go their own way" or "conspire"? This leads to a series of new concepts: the joint distribution (looking at both together), the marginal distribution (looking at each alone), the conditional distribution (fixing one and looking at the other), and independence (complete irrelevance). Further, how does one find the distribution of $Z=X+Y$ (total score, total expenditure)? This topic explains it all at once.

## 2. Rigorous Definitions

Let $(X,Y)$ be a two-dimensional random variable; the function of two variables

$$F(x, y) = P(X \le x, Y \le y)$$

is called the **joint distribution function** of $(X,Y)$, with $x, y \in \mathbb{R}$. It is non-decreasing and right-continuous in $x$ and in $y$ separately, and $F(-\infty,y)=F(x,-\infty)=0$, $F(+\infty,+\infty)=1$.

**Discrete case**: if $(X,Y)$ takes only countably many pairs $(x_i,y_j)$, then

$$p_{ij} = P(X = x_i, Y = y_j)$$

is the **joint mass function**, with $p_{ij} \ge 0$ and $\sum_i\sum_j p_{ij} = 1$. This gives the **marginal mass functions**:

$$p_{i\cdot} = P(X=x_i) = \sum_j p_{ij}, \qquad p_{\cdot j} = P(Y=y_j) = \sum_i p_{ij}$$

and, for $p_{i\cdot}>0$, the **conditional mass function** $P(Y=y_j \mid X=x_i) = \frac{p_{ij}}{p_{i\cdot}}$.

**Continuous case**: if there is a nonnegative integrable function $f(x,y)$ with $F(x,y) = \int_{-\infty}^{x}\int_{-\infty}^{y} f(u,v)\,\mathrm{d}u\,\mathrm{d}v$, then $f(x,y)$ is the **joint density**, with $f(x,y)\ge 0$ and $\int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty} f(x,y)\,\mathrm{d}x\,\mathrm{d}y = 1$. The **marginal density** and the **conditional density**:

$$f_X(x) = \int_{-\infty}^{+\infty} f(x,y)\,\mathrm{d}y, \qquad f_{Y \mid X}(y \mid x) = \frac{f(x,y)}{f_X(x)} \quad (f_X(x)>0)$$

**Independence**: $X$ and $Y$ are mutually independent if $F(x,y)=F_X(x)F_Y(y)$ for all $x,y$; for discrete variables this is equivalent to $p_{ij}=p_{i\cdot}p_{\cdot j}$, and for continuous ones to $f(x,y)=f_X(x)f_Y(y)$ (almost everywhere).

Distribution of $Z=X+Y$: for discrete variables $P(Z=z)=\sum_k P(X=k,Y=z-k)$; for continuous variables, if $X$ and $Y$ are independent, then

$$f_Z(z) = \int_{-\infty}^{+\infty} f_X(x)\,f_Y(z-x)\,\mathrm{d}x$$

This integral is called a **convolution**, written $f_Z = f_X * f_Y$.

## 3. Why Defined This Way

**Why does the joint distribution function use the region "both not exceeding"?** The axiomatization of probability is built on "half-plane" type events: events like $P(X\le x)$ and $P(X\le x,Y\le y)$ are the easiest to handle, and the probability of an arbitrary region (a disk, a triangle) can be assembled from them by limiting operations. Using "$\le$" rather than "$<$" is for the good property of right-continuity.

**Why is the marginal distribution called "marginal"?** Write the joint mass function as a table with the values of $X$ as rows and those of $Y$ as columns. The row sums $p_{i\cdot}$ are written in the right margin of the table and the column sums $p_{\cdot j}$ in the bottom margin. A marginal distribution is "compressing away the other variable and looking at just one".

**Why is the independence criterion for continuous variables "separable density"?** If $f(x,y)=f_X(x)f_Y(y)$ then $F(x,y)=F_X(x)F_Y(y)$ and independence holds; conversely independence implies this factorization. Intuitively: if the joint density can be "split" into the product of two univariate densities, the two variables do not interfere. "Almost everywhere" is a technical addendum: changing the density at isolated points or on isolated lines affects no probability.

**Why divide by the marginal density for a conditional density?** This is the continuous version of conditional probability: $P(Y \le y \mid X \in [x,x+\Delta]) \approx \frac{f(x,y)\Delta y\cdot\Delta}{f_X(x)\Delta}$, and letting $\Delta\to 0$ gives $\frac{f(x,y)}{f_X(x)}$. The denominator again serves to normalize.

**Why is independence needed for convolution?** The derivation of the convolution formula uses $f(x,z-x)=f_X(x)f_Y(z-x)$, and this step is exactly independence. Without independence one must use the joint density, $f_Z(z)=\int f(x,z-x)\,\mathrm{d}x$.

## 4. Intuition and Pictures

The **joint distribution table** is the key to all the concepts:

| $p_{ij}$ | $Y=0$ | $Y=1$ | Row sum |
|------|------|------|------|
| $X=0$ | 0.1 | 0.2 | 0.3 |
| $X=1$ | 0.3 | 0.4 | 0.7 |
| Column sum | 0.4 | 0.6 | 1 |

The row sums give the marginal of $X$ ($P(X=0)=0.3$) and the column sums the marginal of $Y$. What does independence mean? It means every row's proportions are proportional to the column sums: if independent we should have $p_{00}=0.3\times 0.4=0.12$, but the table says 0.1 — not independent! This is how to **see independence at a glance** from the table: pick any cell and check whether $p_{ij}$ equals "row sum $\times$ column sum".

A picture analogy for the continuous case: the joint density $f(x,y)$ is a "hill" in three-dimensional space with total volume 1 under it; the marginal density $f_X(x)$ is the outline obtained by flattening the hill along $y$ (integrating); a conditional density is the cross-section curve obtained by cutting vertically along $x=x_0$.

| Statement | Right? | Why |
|------|------|------|
| Knowing the marginals lets you recover the joint | Wrong | Unless independent, the marginals do not determine the joint |
| Independent $\Longrightarrow$ uncorrelated | Right | The covariance of independent variables is 0 |
| Uncorrelated $\Longrightarrow$ independent | Wrong | Counterexample $Y=X^2$: with symmetric $X$ the covariance is 0 yet they are clearly related |

## 5. Worked Examples

### Example 1 (Basic: Discrete Joint Distribution)

Problem: The joint mass function of $(X,Y)$ is $p_{00}=0.1,\ p_{01}=0.2,\ p_{10}=0.3,\ p_{11}=0.4$. (1) Find the marginals; (2) decide independence; (3) find $P(X \le Y)$ and $P(Y=1 \mid X=0)$.

Analysis: All the information is in the four cells; just add and compare according to the definitions.

Solution: (1) Row sums $p_{0\cdot}=0.3$, $p_{1\cdot}=0.7$; column sums $p_{\cdot 0}=0.4$, $p_{\cdot 1}=0.6$. So $X$ has the mass function $(0.3,0.7)$ and $Y$ has $(0.4,0.6)$.

(2) If independent we should have $p_{00}=p_{0\cdot}p_{\cdot 0}=0.12$, but actually $p_{00}=0.1 \ne 0.12$, so they are **not independent**.

(3) $X \le Y$ comprises the three outcomes $(0,0)$, $(0,1)$, $(1,1)$:

$$P(X \le Y) = 0.1 + 0.2 + 0.4 = 0.7$$

Conditional probability:

$$P(Y=1 \mid X=0) = \frac{p_{01}}{p_{0\cdot}} = \frac{0.2}{0.3} = \frac{2}{3}$$

Comment: A conditional probability is "treating the row as a new sample space and renormalizing" — the row total shrinks from 1 to $p_{0\cdot}=0.3$, hence the division by 0.3. This is entirely consistent with the definition of conditional probability in Chapter 1.

### Example 2 (Intermediate: Continuous Joint Density)

Problem: Let $(X,Y)$ have joint density $f(x,y)=4xy$ ($0<x<1,\ 0<y<1$) and 0 elsewhere. (1) Find the marginal densities; (2) decide independence; (3) find $P(X+Y<1)$.

Analysis: Integrate over the region; test independence by separability of the density; compute probabilities with double integrals.

Solution: (1) For $0<x<1$,

$$f_X(x) = \int_0^1 4xy\,\mathrm{d}y = 4x\cdot\frac{1}{2} = 2x$$

and similarly $f_Y(y)=2y$ ($0<y<1$).

(2) $f(x,y)=4xy=(2x)(2y)=f_X(x)f_Y(y)$ holds everywhere on the square, so $X$ and $Y$ are **independent**.

(3) The event $X+Y<1$ corresponds to the triangle below the line $y=1-x$ inside the square:

$$P(X+Y<1) = \int_0^1\int_0^{1-x} 4xy\,\mathrm{d}y\,\mathrm{d}x = \int_0^1 4x\cdot\frac{(1-x)^2}{2}\,\mathrm{d}x = 2\int_0^1 (x-2x^2+x^3)\,\mathrm{d}x$$

$$= 2\left(\frac{1}{2}-\frac{2}{3}+\frac{1}{4}\right) = 2\times\frac{1}{12} = \frac{1}{6}$$

Comment: $4xy$ is a typical "separable" form, so independence is immediate; if the density were a non-separable form such as $x+y$, independence would generally fail. When computing a probability, draw the region first and then fix the limits of integration — a prerequisite step.

### Example 3 (Advanced: Linear Combinations of Independent Normals)

Problem: $X \sim N(0,1)$ and $Y \sim N(1,4)$ are independent. (1) Find the distribution of $Z=2X-Y$; (2) explain the role of "independent" in this conclusion.

Analysis: A linear combination of independent normals is normal; the key is to combine the means and variances.

Solution: (1) From $X \sim N(0,1)$ we get $2X \sim N(0,4)$; a sum of independent normals is normal, so

$$Z = 2X - Y \sim N(0-1,\ 4+4) = N(-1, 8)$$

(2) Independence ensures the variances add: $D(2X-Y)=4D(X)+D(Y)$. If $X$ and $Y$ are not independent, then $D(2X-Y)=4D(X)+D(Y)-4\,\mathrm{Cov}(X,Y)$ and the covariance term cannot be ignored. For instance with $\mathrm{Cov}(X,Y)=1$, $D(Z)=4+4-4=4$, completely different from 8. **The trap is exactly the word "independent"**: without independence the variances cannot simply be added, and to find the distribution of $Z$ one must go back to the joint density and integrate, where this conclusion does not apply.

## 6. Common Mistakes and Pitfalls

1. **Wrong approach**: believing the marginals determine the joint. **Why wrong**: the same marginals can be paired with infinitely many joints (independent is one, correlated another). **Correct approach**: to find the joint, go back to the joint mass function or joint density.

2. **Wrong approach**: misreading the region of integration when computing a normalizing constant. **Why wrong**: $f$ is zero outside the region, so missing it or enlarging it both give a wrong constant. **Correct approach**: draw the region first and fix the limits strictly by the boundary.

3. **Wrong approach**: taking "uncorrelated" for "independent". **Why wrong**: for $X \sim U[-1,1]$ and $Y=X^2$ the covariance is 0 (symmetry makes $E(X^3)=0$), yet $Y$ is completely determined by $X$. **Correct approach**: test independence with $F(x,y)=F_X(x)F_Y(y)$ or its discrete/continuous equivalent.

4. **Wrong approach**: using the convolution $f_Z=f_X*f_Y$ without independence to find the density of $X+Y$. **Why wrong**: the convolution formula is derived using independence. **Correct approach**: without independence use the joint density $f_Z(z)=\int f(x,z-x)\,\mathrm{d}x$.

5. **Wrong approach**: writing the conditional distribution as $\frac{p_{ij}}{p_{\cdot j}}$ (numerator and denominator swapped). **Why wrong**: the condition is on $X=x_i$, so divide by $P(X=x_i)=p_{i\cdot}$. **Correct approach**: "divide by the marginal of whatever you condition on".

6. **Wrong approach**: mistaking the two marginal variances for the joint variance when working with bivariate normals. **Why wrong**: a bivariate normal has five parameters (including $\rho$), and only $\rho=0$ is equivalent to independence. **Correct approach**: check $\rho$ first and then decide whether it can be factored.

## 7. Summary and Mnemonics

Key points to review:

- The joint distribution $F(x,y)=P(X\le x,Y\le y)$ describes the whole; discrete variables use $p_{ij}$, continuous ones $f(x,y)$ (nonnegative, integral 1);
- Marginal = row/column sums (discrete) or flattening by integration (continuous), showing the individual;
- Conditional = joint divided by the corresponding marginal, a natural extension of conditional probability;
- Independent $\iff$ the joint factorizes into the product of marginals; independent $\Rightarrow$ uncorrelated, but not conversely;
- A linear combination of independent normals is normal with variances added; in general use convolution or integrate the joint density.

**Mnemonic: Joint gives the whole, marginal the individual, independent factorizes, conditional divides, convolution needs independence.**`,
    keyPoints: [
      'Joint distribution F(x,y)=P(X≤x,Y≤y); marginals obtained by summing/integrating the joint',
      'Discrete uses the joint mass function, continuous the joint density (nonnegative, integral 1 over the plane)',
      'Independent ⟺ the joint factorizes: p_ij=p_i·p_·j or f=f_X·f_Y',
      'Conditional density f_{Y|X}=f(x,y)/f_X(x); the density of Z=X+Y is a convolution',
    ],
  },

  'characteristic-functions': {
    chapter: 'Chapter 2 Random Variables and Their Distributions',
    title: 'Characteristic Functions',
    summary:
      'Translate a distribution into trigonometric functions: independence becomes multiplication, the distribution is uniquely determined, and differentiating yields moments — the universal language for limit theorems.',
    content: String.raw`

A sound can be written as a waveform in time, or as a spectrum arranged by frequency — two languages for the same information. A probability distribution also has "two languages": one is the density/mass function (the waveform), the other is the **characteristic function** (the spectrum). Why take the trouble to learn the second? Because two laborious tasks become astonishingly simple in the spectral language: first, finding the distribution of a sum of independent random variables is a difficult "convolution" integral in the density language but merely a product of two functions in the characteristic-function language; second, deciding whether a sequence of distributions "converges" to a limit distribution has a clean pointwise criterion in the characteristic-function language. It is fair to say that without characteristic functions there would be no concise proof of the modern central limit theorem. This topic introduces the tool: what it is, why it looks the way it does, and how to use it.

## 2. Rigorous Definitions

Let $X$ be a random variable. The function

$$\varphi_X(t) = E\bigl(e^{\mathrm{i}tX}\bigr) = E(\cos tX) + \mathrm{i}\,E(\sin tX), \qquad t \in \mathbb{R}$$

is the **characteristic function** of $X$, where $\mathrm{i}$ is the imaginary unit with $\mathrm{i}^2=-1$.

**Basic properties** (writing $\varphi=\varphi_X$):

1. Existence: for any random variable $X$, $\varphi_X(t)$ is defined for every real $t$ (because $|e^{\mathrm{i}tX}|=1$, bounded by the constant 1);
2. $\varphi(0)=1$ and $|\varphi(t)| \le 1$;
3. Conjugate symmetry: $\varphi(-t)=\overline{\varphi(t)}$ (when the distribution is symmetric about the origin, $\varphi$ is a real even function);
4. Moments and derivatives: if $E|X|^k < \infty$ then $\varphi$ is $k$-times differentiable at $0$, and

$$\varphi^{(k)}(0) = \mathrm{i}^k E(X^k)$$

5. Sums of independent variables: if $X$ and $Y$ are independent, then $\varphi_{X+Y}(t)=\varphi_X(t)\,\varphi_Y(t)$.

**Uniqueness theorem**: if $\varphi_X(t)=\varphi_Y(t)$ for all $t$, then $X$ and $Y$ have the same distribution — the characteristic function completely determines the distribution. **Continuity theorem**: $X_n$ converges in distribution to $X$ if and only if $\varphi_{X_n}(t) \to \varphi_X(t)$ for all $t$.

Characteristic functions of common distributions:

| Distribution | Characteristic function |
|------|------|
| Bernoulli $B(1,p)$ | $1-p+pe^{\mathrm{i}t}$ |
| Binomial $B(n,p)$ | $(1-p+pe^{\mathrm{i}t})^n$ |
| Poisson $P(\lambda)$ | $e^{\lambda(e^{\mathrm{i}t}-1)}$ |
| Exponential $E(\lambda)$ | $\dfrac{\lambda}{\lambda-\mathrm{i}t}$ |
| Normal $N(\mu,\sigma^2)$ | $e^{\mathrm{i}\mu t-\frac{1}{2}\sigma^2 t^2}$ |

## 3. Why Defined This Way

**Why use $e^{\mathrm{i}tX}$ and not some other function?** Euler's formula $e^{\mathrm{i}\theta}=\cos\theta+\mathrm{i}\sin\theta$ encodes "rotation" as "multiplying by a unit complex number". After taking expectations, $\varphi(t)$ weights all the values of $X$ by $e^{\mathrm{i}tX}$ and sums them — each value contributes a rotation, and the characteristic function is the "average direction" of these rotations. Every detail of the distribution is recorded, in encoded form, in the way $\varphi(t)$ varies with $t$.

**Why is it "more usable" than the density?** When independent random variables are added, the densities convolve (a complicated integral), while characteristic functions merely multiply pointwise — because $E(e^{\mathrm{i}t(X+Y)})=E(e^{\mathrm{i}tX}e^{\mathrm{i}tY})$, and for independent variables the expectation of a product is the product of expectations. The exponential function turns "sum" into "product"; that is the whole magic.

**Why does it exist for every random variable?** $|e^{\mathrm{i}tX}|=1$ always, so the expectation is bounded by 1 and always converges. This is far superior to the moment generating function $M(t)=E(e^{tX})$, which requires exponential moments; heavy-tailed distributions (such as the Cauchy) need not even have an expectation, yet their characteristic functions exist.

**Why is "uniqueness" needed?** It is the conversion guarantee of the whole theory: once an expression for $\varphi$ is computed, it can be redeemed for exactly one distribution. Otherwise the characteristic function would be a mere sequence and could not be inverted, and would have no practical value.

**Why does differentiating give moments?** Differentiate $\varphi(t)=E(e^{\mathrm{i}tX})$ term by term formally: $\varphi'(t)=E(\mathrm{i}Xe^{\mathrm{i}tX})$, and at $t=0$ this gives $\varphi'(0)=\mathrm{i}E(X)$. In general $\varphi^{(k)}(0)=\mathrm{i}^kE(X^k)$. So "differentiating the characteristic function at the origin" becomes a machine for extracting moments of every order.

## 4. Intuition and Pictures

Think of the characteristic function as the "voiceprint" of a distribution:

- $\varphi(0)=1$: at zero frequency it is always 1, a shadow of the normalization condition;
- $|\varphi(t)|$ decays as $|t|$ grows: slow decay means the distribution is "spread out" (heavy tails, large variance); fast decay means it is concentrated near the centre;
- $\varphi$ shows periodic ripples (as for the binomial or uniform), revealing the "lattice structure" of the distribution;
- when the distribution is symmetric about the origin, $\varphi$ is a real even function: the imaginary part is the cancellation of positive and negative values.

**Analogy**: the density is like a photograph, the characteristic function like the compressed encoding of that photograph. "Merging" photographs (convolution) is a nuisance; "merging" encodings is just multiplying bit by bit; and decoding afterwards (the uniqueness theorem) loses nothing.

| Language | Operation on the distribution | Operation on the characteristic function |
|------|------|------|
| Add a constant $c$ | Translate the density | $\varphi_{X+c}(t)=e^{\mathrm{i}ct}\varphi_X(t)$ |
| Scale $aX$ | Stretch the density horizontally | $\varphi_{aX}(t)=\varphi_X(at)$ |
| Add independent variables | Convolution $f*g$ | Pointwise product $\varphi_X\varphi_Y$ |
| Extract the $k$-th moment | Integral $\int x^k f(x)\,\mathrm{d}x$ | Derivative $\varphi^{(k)}(0)/\mathrm{i}^k$ |

> **Intuition**: two of the four basic operations (convolution and moments) are greatly simplified in the characteristic-function language, which is why probability textbooks almost always use characteristic functions when treating sums of independent variables and limit theorems.

## 5. Worked Examples

### Example 1 (Basic: Characteristic Function and Moments of the Poisson)

Problem: For $X \sim P(\lambda)$, find $\varphi_X(t)$ and use it to verify $E(X)=\lambda$ and $D(X)=\lambda$.

Analysis: Substitute the mass function into the definition and recognize the Taylor expansion of the exponential when summing.

Solution: By definition,

$$\varphi(t) = \sum_{k=0}^{\infty} e^{\mathrm{i}tk}\,\frac{\lambda^k e^{-\lambda}}{k!} = e^{-\lambda}\sum_{k=0}^{\infty}\frac{\bigl(\lambda e^{\mathrm{i}t}\bigr)^k}{k!} = e^{-\lambda}\cdot e^{\lambda e^{\mathrm{i}t}} = e^{\lambda(e^{\mathrm{i}t}-1)}$$

For the mean: $\varphi'(t)=\varphi(t)\cdot\lambda \mathrm{i}e^{\mathrm{i}t}$; substituting $t=0$ (note $\varphi(0)=1$) gives

$$\varphi'(0)=\mathrm{i}\lambda = \mathrm{i}E(X) \implies E(X)=\lambda$$

For the second derivative: $\varphi''(t)=\varphi(t)\bigl(\lambda\mathrm{i}e^{\mathrm{i}t}\bigr)^2 + \varphi(t)\,\lambda\mathrm{i}^2e^{2\mathrm{i}t} = \varphi(t)\bigl(-\lambda^2e^{2\mathrm{i}t}-\lambda e^{2\mathrm{i}t}\bigr)$, so

$$\varphi''(0)=-\lambda^2-\lambda = \mathrm{i}^2E(X^2) = -E(X^2) \implies E(X^2)=\lambda^2+\lambda$$

$$D(X) = E(X^2)-[E(X)]^2 = \lambda^2+\lambda-\lambda^2 = \lambda$$

Comment: The procedure for computing moments with characteristic functions is fixed: "differentiate $\to$ set $t=0$ $\to$ divide by $\mathrm{i}^k$". The key trick is to recognize $\sum\frac{z^k}{k!}=e^z$ in the sum, with $z=\lambda e^{\mathrm{i}t}$.

### Example 2 (Intermediate: Sum of Independent Binomials)

Problem: $X \sim B(n,p)$ and $Y \sim B(m,p)$ are independent. Prove $X+Y \sim B(n+m,p)$.

Analysis: Computing the convolution directly is cumbersome; with characteristic functions an independent sum becomes a product and the result is obvious.

Solution: The characteristic function of the binomial is the product of $n$ independent Bernoulli characteristic functions:

$$\varphi_X(t)=\bigl(1-p+pe^{\mathrm{i}t}\bigr)^n, \qquad \varphi_Y(t)=\bigl(1-p+pe^{\mathrm{i}t}\bigr)^m$$

By independence,

$$\varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t)=\bigl(1-p+pe^{\mathrm{i}t}\bigr)^{n+m}$$

which is exactly the characteristic function of $B(n+m,p)$. By the uniqueness theorem, $X+Y \sim B(n+m,p)$.

Comment: Two traps. (1) If the $p$ differ, say $X \sim B(n,p_1)$ and $Y \sim B(m,p_2)$, then $\varphi_{X+Y}$ is the product of a factor of degree $n$ and one of degree $m$ that are different, and it is not the characteristic function of any binomial — the sum has a Poisson-binomial distribution with no simple closed form. (2) The formula $\varphi_{X+Y}=\varphi_X\varphi_Y$ presupposes independence; forget it and the whole solution collapses.

### Example 3 (Advanced: Sums of Independent Normals and the Fourth Moment of the Standard Normal)

Problem: (1) $X \sim N(\mu_1,\sigma_1^2)$ and $Y \sim N(\mu_2,\sigma_2^2)$ are independent; find the distribution of $X+Y$. (2) Use characteristic functions to compute the fourth moment $E(Z^4)$ of the standard normal $Z \sim N(0,1)$.

Analysis: (1) multiply the characteristic functions and use uniqueness; (2) expand $\varphi_Z(t)=e^{-t^2/2}$ in a Taylor series and compare coefficients with $\varphi(t)=\sum E(Z^k)\frac{(\mathrm{i}t)^k}{k!}$.

Solution: (1) $\varphi_X(t)=e^{\mathrm{i}\mu_1t-\frac{1}{2}\sigma_1^2t^2}$ and $\varphi_Y(t)=e^{\mathrm{i}\mu_2t-\frac{1}{2}\sigma_2^2t^2}$; by independence

$$\varphi_{X+Y}(t)=e^{\mathrm{i}(\mu_1+\mu_2)t-\frac{1}{2}(\sigma_1^2+\sigma_2^2)t^2}$$

Comparing with the table, this is exactly the characteristic function of $N(\mu_1+\mu_2,\ \sigma_1^2+\sigma_2^2)$. By the uniqueness theorem $X+Y \sim N(\mu_1+\mu_2,\ \sigma_1^2+\sigma_2^2)$.

(2) Write out the two expansions:

$$\varphi_Z(t)=e^{-t^2/2}=1-\frac{t^2}{2}+\frac{t^4}{8}-\cdots, \qquad \varphi_Z(t)=E(1)+\mathrm{i}tE(Z)+\frac{(\mathrm{i}t)^2}{2}E(Z^2)+\frac{(\mathrm{i}t)^4}{24}E(Z^4)+\cdots$$

Comparing the $t^2$ coefficients: $-\frac{1}{2}=-\frac{E(Z^2)}{2}$, so $E(Z^2)=1$. Comparing the $t^4$ coefficients:

$$\frac{1}{8}=\frac{E(Z^4)}{24} \implies E(Z^4)=3$$

Comment: In (1) "independent" is again indispensable: without it the variances need a covariance correction and the characteristic function is no longer a separable product. (2) shows another face of characteristic functions — a Taylor expansion is a machine for comparing coefficients, and $E(Z^4)=3$ is the origin of "the kurtosis of the normal is 3".

## 6. Common Mistakes and Pitfalls

1. **Wrong approach**: believing the characteristic function is defined only when moments exist. **Why wrong**: $|e^{\mathrm{i}tX}|=1$ is always bounded by 1, so the characteristic function exists for every random variable. **Correct approach**: distinguish the characteristic function (always exists) from the moment generating function (needs exponential moments).

2. **Wrong approach**: taking $\varphi'(0)$ for $E(X)$. **Why wrong**: $\varphi'(0)=\mathrm{i}E(X)$, with an extra $\mathrm{i}$. **Correct approach**: $E(X^k)=\varphi^{(k)}(0)/\mathrm{i}^k$.

3. **Wrong approach**: confusing $\varphi_X(t)=E(e^{\mathrm{i}tX})$ with the moment generating function $M_X(t)=E(e^{tX})$. **Why wrong**: one has a purely imaginary exponent and the other a real one; their domains and properties differ. **Correct approach**: memorize the definitions; when asked for a characteristic function use $\mathrm{i}tX$.

4. **Wrong approach**: using $\varphi_{X+Y}=\varphi_X\varphi_Y$ without independence. **Why wrong**: the formula comes from $E(e^{\mathrm{i}tX}e^{\mathrm{i}tY})=E(e^{\mathrm{i}tX})E(e^{\mathrm{i}tY})$, which requires independence. **Correct approach**: verify independence first.

5. **Wrong approach**: checking $\varphi_X(t_0)=\varphi_Y(t_0)$ at a single point and declaring the distributions equal. **Why wrong**: the uniqueness theorem requires equality for every $t \in \mathbb{R}$. **Correct approach**: prove that the expressions are identically equal for arbitrary $t$.

## 7. Summary and Mnemonics

Key points to review:

- Definition $\varphi_X(t)=E(e^{\mathrm{i}tX})$; always exists, $|\varphi|\le 1$, $\varphi(0)=1$;
- The characteristic function of a sum of independent variables is the product — convolution becomes multiplication, its greatest merit;
- Uniqueness theorem: equal $\varphi$ implies equal distributions; continuity theorem: convergence in distribution is equivalent to pointwise convergence of $\varphi$;
- $\varphi^{(k)}(0)=\mathrm{i}^kE(X^k)$; differentiation yields moments;
- Memorize the common characteristic functions (Bernoulli, binomial, Poisson, exponential, normal); they are the computing platform for sums of independent variables and limit theorems.

**Mnemonic: The characteristic function is the voiceprint of the distribution; independence turns into a product; it uniquely fixes the distribution; differentiating extracts moments; pointwise convergence proves limits.**`,
    keyPoints: [
      'Definition φ_X(t)=E[e^{itX}], which exists for any random variable (|φ|≤1)',
      'The characteristic function of a sum of independent variables multiplies: φ_{X+Y}=φ_X·φ_Y',
      'Uniqueness: φ_X=φ_Y ⟹ X and Y have the same distribution; φ^(k)(0)=i^k·E(X^k)',
      'For the normal N(μ,σ²), φ(t)=e^{iμt−σ²t²/2}',
    ],
  },

  'numerical-characteristics': {
    chapter: 'Chapter 3 Numerical Characteristics',
    title: 'Expectation, Variance and Covariance',
    summary:
      'Compress a whole distribution into a few numbers: expectation fixes the centre, variance measures the spread, and covariance and correlation show how two variables move together.',
    content: String.raw`

Two classes both average 75 points — can we call them "the same"? In one class everyone is near 75; in the other half the students score 95 and half 55 — the average masks an enormous difference. A boss says "the average salary in my company is a million a year", which may just mean the boss earns ninety million and the employees thirty thousand. So asking only "where is the centre" is not enough: one must also ask "how widely is it spread". Probability theory issues a "health report" for random variables: the **expectation** describes the centre, the **variance** (and standard deviation) the size of the fluctuations, and the **covariance** and **correlation coefficient** whether two variables "rise and fall together" or "one goes up as the other goes down". A distribution curve carries enormous information, yet three to five numbers can summarize its main features — and when the distribution is unknown or too complicated, these numerical characteristics are all we can hold on to. Insurance pricing, portfolio construction and exam evaluation all speak through these few numbers.

## 2. Rigorous Definitions

**Expectation (mean)**. Let the discrete variable $X$ have mass function $p_k=P(X=x_k)$; if $\sum_k|x_k|p_k<\infty$, then

$$E(X)=\sum_k x_k p_k$$

Let the continuous variable $X$ have density $f(x)$; if $\int_{-\infty}^{+\infty}|x|f(x)\,\mathrm{d}x<\infty$, then

$$E(X)=\int_{-\infty}^{+\infty} x f(x)\,\mathrm{d}x$$

Intuitively, the expectation is the probability-weighted average. For a random variable $Y=g(X)$ there is a direct formula: $E(g(X))=\sum_k g(x_k)p_k$ or $\int g(x)f(x)\,\mathrm{d}x$ (no need to find the distribution of $Y$ first).

**Variance and standard deviation**. If $E(X)$ exists, then

$$D(X)=\mathrm{Var}(X)=E\bigl[(X-E(X))^2\bigr]=E(X^2)-[E(X)]^2$$

is the variance of $X$, and $\sqrt{D(X)}$ is the **standard deviation**. The variance measures the average size of the deviation of $X$ from its centre (squaring prevents positive and negative deviations from cancelling).

**Covariance and correlation coefficient**. For a two-dimensional random variable $(X,Y)$,

$$\mathrm{Cov}(X,Y)=E\bigl[(X-E(X))(Y-E(Y))\bigr]=E(XY)-E(X)E(Y)$$

$$\rho_{XY}=\frac{\mathrm{Cov}(X,Y)}{\sqrt{D(X)}\sqrt{D(Y)}} \qquad (\text{requiring } D(X)>0,\ D(Y)>0)$$

$\rho_{XY}$ is the **correlation coefficient** and satisfies $|\rho_{XY}| \le 1$; $|\rho_{XY}|=1$ if and only if $X$ and $Y$ are linearly related with probability 1.

**Moments**: $E(X^k)$ is the $k$-th **raw moment** and $E[(X-E(X))^k]$ the $k$-th **central moment**. The expectation is the first raw moment and the variance the second central moment.

**Chebyshev's inequality**: if $D(X)$ exists, then for any $\varepsilon>0$

$$P\bigl(|X-E(X)| \ge \varepsilon\bigr) \le \frac{D(X)}{\varepsilon^2}$$

**Operational properties**:

1. $E(c)=c$, $E(cX)=cE(X)$, $E(X+c)=E(X)+c$;
2. **Linearity**: $E(aX+bY)=aE(X)+bE(Y)$, with no independence required;
3. If $X$ and $Y$ are independent then $E(XY)=E(X)E(Y)$;
4. $D(c)=0$, $D(cX)=c^2D(X)$, $D(X+c)=D(X)$;
5. $D(aX+bY)=a^2D(X)+b^2D(Y)+2ab\,\mathrm{Cov}(X,Y)$.

## 3. Why Defined This Way

**Why is the expectation a probability-weighted average?** It is the limiting form of an arithmetic average. Roll a die infinitely often; the frequency of each face tends to $\frac{1}{6}$, and the "long-run average score" is $\sum k\cdot\frac{1}{6}=3.5$ — the die need never actually show 3.5, yet the long-run average converges to that number. The expectation computes in advance "the average over infinitely many future trials".

**Why require absolute convergence?** If the positive and negative parts each diverge, the value of the "expectation" depends on the order of summation, which is not mathematically legitimate. Classic example: $X$ takes $\pm 2^k$ with probability $2^{-k}$ ($k=1,2,\dots$). Then $E|X|=\sum 2^k\cdot 2^{-k}=\sum 1=\infty$, both the positive and the negative parts are infinite, and it is not rigorous to say $E(X)=0$ by symmetry — this random variable has no expectation at all. Absolute convergence is the entry ticket for "the expectation exists", not decoration.

**Why square the deviations in the variance?** The deviations $X-E(X)$ have both signs and would cancel to 0 in a direct average. Squaring makes them always nonnegative, penalizes large deviations more heavily, and keeps the computation feasible (differentiable, expandable). The price is that the dimension becomes the square of the original (the variance of metres is square metres), so one takes the square root to get the standard deviation, in the same units as the data and comparable with the mean.

**Why introduce covariance?** Because $D(X+Y)$ is in general **not** $D(X)+D(Y)$. When two variables fluctuate in the same direction the total fluctuation is amplified; when they fluctuate oppositely it is cancelled, and the covariance captures exactly this "cooperation". The covariance carries dimensions (centimetres times kilograms) and cannot be compared directly, so one divides by the two standard deviations to get the dimensionless $\rho$, where $|\rho|\le 1$ allows comparison across problems.

**Why is the correlation coefficient at most 1?** It is a direct corollary of the Cauchy–Schwarz inequality: $[\mathrm{Cov}(X,Y)]^2 \le D(X)D(Y)$. Equality holds when $X$ and $Y$ are perfectly linearly related — $\rho=1$ is "perfect co-increase", $\rho=-1$ is "perfect trade-off", and $\rho=0$ merely means "no linear cooperation".

## 4. Intuition and Pictures

**Expectation is the centre of mass.** View the density curve as a mass distribution (total area 1); the expectation is the centroid of the plate: moments balance to the left and right. The centroid of a bell curve lies on its axis of symmetry; for a right-skewed distribution (such as the exponential) the centroid is pulled to the right by the long tail.

**Variance is the moment of inertia.** For the same plate, rotating about the centroid meets more resistance the more spread out it is — the variance is the "moment of inertia" of the random variable. The standard deviation is the scale of a "typical deviation": most data lie within one or two standard deviations of the mean.

Reading the sign of the covariance:

| Range of $\rho$ | Meaning | Picture |
|------|------|------|
| $\rho>0$ | Positive correlation, move together | Scatter plot from lower-left to upper-right |
| $\rho<0$ | Negative correlation, trade off | Scatter plot from upper-left to lower-right |
| $\rho=0$ | No linear correlation (not necessarily unrelated) | No straight-line trend, possibly a curved one |
| $|\rho|=1$ | Perfectly linearly related | The points lie exactly on a straight line |

Numerical characteristics of the common distributions:

| Distribution | Expectation | Variance |
|------|------|------|
| 0-1 distribution | $p$ | $p(1-p)$ |
| Binomial $B(n,p)$ | $np$ | $np(1-p)$ |
| Poisson $P(\lambda)$ | $\lambda$ | $\lambda$ |
| Uniform $U[a,b]$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Exponential $E(\lambda)$ | $\frac{1}{\lambda}$ | $\frac{1}{\lambda^2}$ |
| Normal $N(\mu,\sigma^2)$ | $\mu$ | $\sigma^2$ |

> **Intuition**: Chebyshev's inequality is a "free lunch" — knowing only the mean and the variance, no matter what the distribution looks like, one can guarantee that $X$ lies within $\mu\pm k\sigma$ with probability at least $1-\frac{1}{k^2}$ (at least 75% for $k=2$). A normal distribution reaches 95%; Chebyshev is the guaranteed lower bound.

## 5. Worked Examples

### Example 1 (Basic: Expectation and Variance of the Binomial)

Problem: For $X \sim B(n,p)$, derive $E(X)=np$ and $D(X)=np(1-p)$ by the indicator method.

Analysis: Decompose $X$ into a sum of $n$ independent 0-1 variables, compute each and add.

Solution: Let $I_k=1$ if the $k$-th trial succeeds and $I_k=0$ otherwise. Then $I_k \sim B(1,p)$, the $I_k$ are independent, and

$$X = I_1 + I_2 + \cdots + I_n$$

By linearity (no independence required):

$$E(X)=\sum_{k=1}^n E(I_k)=\sum_{k=1}^n p = np$$

The variance of each $I_k$: $E(I_k^2)=p$, so $D(I_k)=p-p^2=p(1-p)$. Since the $I_k$ are independent their covariances are 0 and the variances add:

$$D(X)=\sum_{k=1}^n D(I_k) = np(1-p)$$

Comment: This decomposition is a staple of probability theory — break a complicated counting variable into a pile of simple 0-1 variables. The division of labour "linearity needs no independence, adding variances does" is used to the full here. Computing $E(X)=\sum k\binom{n}{k}p^kq^{n-k}$ directly is a nightmare; after the decomposition it takes three steps.

### Example 2 (Intermediate: Covariance and Correlation Coefficient)

Problem: The joint mass function of $(X,Y)$ is $p_{00}=0.1,\ p_{01}=0.2,\ p_{10}=0.3,\ p_{11}=0.4$. Find $\mathrm{Cov}(X,Y)$ and $\rho_{XY}$.

Analysis: By definition compute the marginals and $E(XY)$ first; the covariance is "the expectation of the product minus the product of the expectations", and the correlation coefficient divides by the two standard deviations.

Solution: The marginals are $P(X=0)=0.3$, $P(X=1)=0.7$; $P(Y=0)=0.4$, $P(Y=1)=0.6$. Hence

$$E(X)=0.7, \qquad E(Y)=0.6, \qquad E(XY)=P(X=1,Y=1)=0.4$$

(both $X$ and $Y$ take values 0-1, and $XY=1$ only when $(1,1)$ occurs.)

$$\mathrm{Cov}(X,Y)=E(XY)-E(X)E(Y)=0.4-0.7\times 0.6=-0.02$$

The variances: $E(X^2)=E(X)=0.7$, so $D(X)=0.7-0.49=0.21$; $D(Y)=0.6-0.36=0.24$.

$$\rho_{XY}=\frac{-0.02}{\sqrt{0.21\times 0.24}}=\frac{-0.02}{0.2245}\approx -0.089$$

The covariance is negative and the correlation coefficient about $-0.09$: there is a weak trade-off between $X$ and $Y$. Comment: a covariance of $-0.02$ is meaningless on its own (change the units and the number changes), so one must divide by $\sqrt{D(X)D(Y)}$ to standardize it into $\rho$ before concluding "weak negative correlation".

### Example 3 (Advanced: Chebyshev\'s Inequality and a Non-Existent Expectation)

Problem: (1) For $X \sim B(10000,0.5)$, estimate the probability that the frequency $\frac{X}{n}$ deviates from 0.5 by more than 0.01; (2) $X$ takes $\pm 2^k$ with probability $2^{-k}$ ($k=1,2,\dots$); show that $E(X)$ does not exist.

Analysis: (1) use Chebyshev's inequality; (2) test absolute convergence.

Solution: (1) $E(X)=5000$ and $D(X)=10000\times 0.25=2500$. The frequency has mean 0.5 and variance $\frac{2500}{10000^2}=2.5\times 10^{-5}$. Take $\varepsilon=0.01$:

$$P\left(\left|\frac{X}{10000}-0.5\right| \ge 0.01\right) \le \frac{2.5\times 10^{-5}}{0.01^2}=0.25$$

that is, the probability is at most 25%. (A normal approximation refines this to about 4.6%, but the merit of Chebyshev is that it holds regardless of the shape of the distribution.)

(2) $E|X|=\sum_{k=1}^{\infty} 2^k\cdot 2^{-k}=\sum_{k=1}^{\infty} 1=+\infty$. The sums of the absolute values of the positive and negative parts both diverge, so the absolute convergence condition fails and $E(X)$ **does not exist**. Although formally $\sum x_kp_k$ cancels to 0 by symmetry, this cancellation depends on an artificial order of summation and is not accepted mathematically.

Comment: The trap is in (2) — "it looks symmetric and cancels to 0" is an illusion, and absolute convergence is exactly what rules out such pathological variables. The formulas for variance and expectation apply only to quantities that exist; check the ticket before use.

## 6. Common Mistakes and Pitfalls

1. **Wrong approach**: using $D(X+Y)=D(X)+D(Y)$ without checking independence. **Why wrong**: the general formula is $D(X+Y)=D(X)+D(Y)+2\mathrm{Cov}(X,Y)$. **Correct approach**: simplify only when independent (or the covariance is 0).

2. **Wrong approach**: treating $E(XY)=E(X)E(Y)$ as an identity. **Why wrong**: it requires $X$ and $Y$ to be independent (or at least uncorrelated). **Correct approach**: verify independence first, otherwise compute $E(XY)$ from its definition or the joint distribution.

3. **Wrong approach**: believing "zero covariance means independence". **Why wrong**: for $X \sim U[-1,1]$ and $Y=X^2$, $\mathrm{Cov}(X,Y)=E(X^3)-E(X)E(X^2)=0$, yet $Y$ is completely determined by $X$. **Correct approach**: decide independence with the joint distribution; zero covariance only says there is no linear correlation.

4. **Wrong approach**: using linearity without checking that the expectation exists. **Why wrong**: when the expectation does not exist both sides of the equation are meaningless. **Correct approach**: verify absolute convergence first (the common distributions all satisfy it).

5. **Wrong approach**: comparing the strength of correlation by the numerical size of the covariance. **Why wrong**: the covariance has dimensions and changes with the units. **Correct approach**: compare $|\rho|$, which is standardized to $[0,1]$.

6. **Wrong approach**: misremembering the sign in the variance formula, writing $D(X)=E(X^2)+[E(X)]^2$. **Why wrong**: $D(X)=E[(X-EX)^2]=E(X^2)-[E(X)]^2$; the middle term is subtracted, not added. **Correct approach**: expand from the definition; remember "the expectation of the square minus the square of the expectation".

## 7. Summary and Mnemonics

Key points to review:

- Expectation = probability-weighted average (first raw moment), requiring absolute convergence; variance = second central moment = $E(X^2)-[E(X)]^2$;
- Linearity holds unconditionally; adding variances and $E(XY)=E(X)E(Y)$ require independence;
- $D(aX+bY)=a^2D(X)+b^2D(Y)+2ab\,\mathrm{Cov}(X,Y)$; $\rho=\frac{\mathrm{Cov}}{\sqrt{DX}\sqrt{DY}}$, $|\rho|\le 1$;
- Independent $\Rightarrow$ uncorrelated, but uncorrelated $\nRightarrow$ independent (the $Y=X^2$ counterexample);
- Chebyshev's inequality: $P(|X-\mu|\ge\varepsilon)\le\frac{\sigma^2}{\varepsilon^2}$, a sharp tool for guaranteed estimates.

**Mnemonic: Expectation finds the centre, variance measures the spread, covariance shows the pairing, correlation removes the units; independent implies uncorrelated, but not conversely.**`,
    keyPoints: [
      'Expectation is the probability-weighted average; variance D(X)=E(X²)−(EX)² measures the spread',
      'Linearity E(aX+bY)=aE(X)+bE(Y) holds unconditionally',
      'D(X+Y)=D(X)+D(Y)+2Cov(X,Y); additive when independent',
      'Correlation ρ=Cov/(σ_Xσ_Y), |ρ|≤1; independent ⟹ ρ=0 but not conversely',
    ],
  },

  'limit-theorems': {
    chapter: 'Chapter 4 Laws of Large Numbers and the Central Limit Theorem',
    title: 'Laws of Large Numbers and the Central Limit Theorem',
    summary:
      'The law of large numbers says "frequency settles at probability"; the central limit theorem says "many tiny random contributions add up to a bell" — the bridge from randomness to determinism.',
    content: String.raw`

Toss a coin 10 times and get 7 heads, a frequency of 0.7; nobody is surprised. Toss it 10000 times and the frequency settles near 0.5 — not "necessarily", but "almost certainly close". Why does a casino dare to let customers play on and on? Because the house edge per round is tiny, but with enough rounds the law of large numbers turns that edge into an almost certain profit. A wonder in the other direction: a person's height is the sum of hundreds of tiny factors — genes, nutrition, environment — none of which is normally distributed, yet the distribution of heights is very close to normal; line a class up by height and the middle is tall while both ends are low. The two great theorems of this topic are the mathematical versions of these two miracles: the **law of large numbers** answers "why does the average settle after many repetitions", and the **central limit theorem** answers "why does a sum of many small random factors look like a bell". They mark the turn of probability theory from "describing randomness" to "mastering uncertainty", and they are the theoretical foundation of every method in mathematical statistics.

## 2. Rigorous Definitions

**Convergence in probability**. Let $X, X_1, X_2, \dots$ be random variables. If for every $\varepsilon>0$

$$\lim_{n\to\infty} P\bigl(|X_n - X| \ge \varepsilon\bigr) = 0$$

then $X_n$ **converges in probability** to $X$, written $X_n \xrightarrow{P} X$. Intuitively: for $n$ large enough, the probability that $X_n$ deviates from $X$ by more than any prescribed amount tends to 0. Note that this does not exclude large deviations on a "bad sample" of very small probability.

**Bernoulli's law of large numbers**. Let $n_A$ be the number of occurrences of event $A$ in $n$ Bernoulli trials, with $P(A)=p$ each time. Then for every $\varepsilon>0$

$$\lim_{n\to\infty} P\left(\left|\frac{n_A}{n}-p\right| \ge \varepsilon\right)=0$$

that is, the frequency converges in probability to the probability $p$. This law gives legal standing to "estimating a probability by a frequency".

**Khinchin's law of large numbers**. Let $X_1, X_2, \dots$ be independent and identically distributed with $E(X_i)=\mu$ existing. Then

$$\frac{1}{n}\sum_{i=1}^n X_i \xrightarrow{P} \mu$$

the sample mean converges in probability to the population mean. This is the theoretical basis for "estimating a population average by a sample average".

**Central limit theorem (Lindeberg–Lévy)**. Let $X_1, X_2, \dots$ be independent and identically distributed with $E(X_i)=\mu$ and $D(X_i)=\sigma^2$ existing, $\sigma>0$. Then the standardized sum

$$Y_n = \frac{\sum_{i=1}^n X_i - n\mu}{\sqrt{n}\,\sigma}$$

converges in distribution to the standard normal: for every real $z$, $\lim_{n\to\infty} P(Y_n \le z) = \Phi(z)$. In practice: $\sum_{i=1}^n X_i \,\dot\sim\, N(n\mu,\, n\sigma^2)$ and $\bar{X} \,\dot\sim\, N\!\left(\mu,\frac{\sigma^2}{n}\right)$.

**De Moivre–Laplace theorem** (the central limit theorem for the binomial): for $X \sim B(n,p)$ and $q=1-p$,

$$P(X \le k) \approx \Phi\!\left(\frac{k+0.5-np}{\sqrt{npq}}\right)$$

The $\pm 0.5$ in $\frac{k \pm 0.5 - np}{\sqrt{npq}}$ is the **continuity correction**: the binomial is a lattice distribution and the normal is continuous, so the half width of a lattice cell is put back.

**Convergence in distribution**: $X_n$ converges in distribution to $X$ (written $X_n \xrightarrow{d} X$) if $F_{X_n}(x) \to F_X(x)$ at every continuity point $x$ of $F_X$. The conclusion of the central limit theorem is convergence in this sense — it does not require sample-by-sample closeness, only that the shape of the distribution approaches.

## 3. Why Defined This Way

**Why does the law of large numbers use "convergence in probability" rather than pointwise convergence?** Pointwise convergence (converging along every sample path) is the strong law, which is stronger but much harder to prove; convergence in probability only requires "the probability of a large deviation tending to 0", allowing sporadic bad samples, and it matches the everyday version of "frequency settles", provable with Chebyshev's inequality, so the entry threshold is friendly. Both lead to "determinism on average", differing only in strength.

**Why does Khinchin's law require an existing expectation?** For an i.i.d. sequence without an expectation the sample mean may not converge at all. Classic counterexample: the standard Cauchy distribution with density $f(x)=\frac{1}{\pi(1+x^2)}$ has no expectation. It has a striking property: the sample mean of $n$ independent standard Cauchy variables **is still standard Cauchy** — it never converges to any constant. So "the expectation exists" is not dispensable decoration.

**Why does the central limit theorem require finite variance?** Sums of independent variables with infinite variance also have a limit, but it is no longer normal; it belongs to the family of $\alpha$-stable distributions ($1<\alpha<2$) with heavier tails. Normality is the prize reserved for the sweet spot of finite variance.

**Why does the binomial approximation need a continuity correction?** The normal distribution is a smooth curve, while the binomial puts mass on integer points. In the binomial, $P(X \le 55)$ is "a pile of lattice points counted up to 55", which corresponds to the area under the normal curve from $-\infty$ to 55.5; without adding the 0.5 one loses half a cell width and the approximate probability is systematically low. The larger $n$ the narrower each cell relatively, and the smaller the effect of the correction; for $n$ of order a few dozen the correction makes all the difference.

**Why are these two theorems the foundation of statistics?** Sample surveys estimate a population with a sample mean (Khinchin); the margin of error of opinion polls and the acceptance-rate intervals of product inspection are computed from $\bar{X}\dot\sim N(\mu,\sigma^2/n)$ (central limit); the distributions of test statistics in hypothesis testing are derived from it too. Without them statistics would be description only, with no inference.

## 4. Intuition and Pictures

**Picture of the law of large numbers**: fix a coin and record the cumulative frequency of heads. After 10 tosses the frequency jumps wildly between 0.3 and 0.9; after 100 tosses the jumps shrink to 0.4–0.6; after 10000 tosses the frequency is pinned at 0.5 by an invisible hand. **Note**: the law does not promise that the 10001st toss will be heads — the randomness of a single trial is always there; what converges is the "averaged result".

**Picture of the central limit theorem**: take a very strange distribution (a 0/1 Bernoulli, or a uniform), draw $n$ samples at a time and add them. For $n=1$ the histogram is the original distribution (two spikes or a flat top); for $n=2$ a bump appears in the middle with low ends; for $n=5$ it already looks like a small bell; beyond $n=30$ it is practically normal. **However strange the original, the sum is "sucked toward" the normal.**

Comparison of the two convergences:

| | Convergence in probability $X_n \xrightarrow{P} X$ | Convergence in distribution $X_n \xrightarrow{d} X$ |
|------|------|------|
| What is compared | Distance between random variables | Shape of the distribution function |
| Conclusion of the law of large numbers | Yes | — |
| Conclusion of the central limit theorem | — | Yes |
| Intuition | "The values hug each other" | "The outlines look alike" |

> **Intuition**: the law of large numbers says "roll the die many times and the average approaches 3.5", and concerns the centre; the central limit theorem says "the total of 100 dice is approximately normal $N(350, 291.7)$", and concerns the distribution of the sum. One pins down the mean, the other paints the whole picture; they work together.

## 5. Worked Examples

### Example 1 (Basic: Bernoulli\'s Law and a Chebyshev Estimate)

Problem: Toss a fair coin $n=10000$ times and let $v_n$ be the frequency of heads. Use Chebyshev's inequality to bound $P(|v_n-0.5| \ge 0.01)$ and explain the qualitative conclusion of the law of large numbers.

Analysis: The frequency is a mean of a $B(n,p)$ variable; find its expectation and variance, then apply Chebyshev's inequality.

Solution: $n_A \sim B(10000,0.5)$, $E(n_A)=5000$, $D(n_A)=10000\times 0.25=2500$. The frequency $v_n=\frac{n_A}{n}$:

$$E(v_n)=0.5, \qquad D(v_n)=\frac{2500}{10000^2}=2.5\times 10^{-5}$$

By Chebyshev's inequality with $\varepsilon=0.01$:

$$P\bigl(|v_n-0.5| \ge 0.01\bigr) \le \frac{2.5\times 10^{-5}}{0.01^2}=0.25$$

that is, the probability that the frequency of heads deviates from 0.5 by more than 0.01 is at most 25%. Bernoulli's law of large numbers further guarantees that this probability **tends to 0** as $n\to\infty$. Comment: the Chebyshev bound of 25% is loose (the normal approximation gives about 4.6%), but it assumes nothing about the shape of the distribution, is guaranteed correct, and incidentally gives the order of the convergence rate $\frac{pq}{n\varepsilon^2}$: double $n$ and halve the deviation probability.

### Example 2 (Intermediate: The Central Limit Theorem in Sampling)

Problem: The scores of all final-year students in a city have mean $\mu=70$ and standard deviation $\sigma=10$. A random sample of 100 students is taken and $\bar{X}$ is the sample mean. Find $P(|\bar{X}-70| \le 2)$.

Analysis: $n=100$ is large enough for the central limit theorem: $\bar{X} \dot\sim N\!\left(\mu,\frac{\sigma^2}{n}\right)$.

Solution: $\bar{X}$ is approximately

$$\bar{X} \,\dot\sim\, N\!\left(70,\ \frac{100}{100}\right) = N(70, 1)$$

Standardizing:

$$P(|\bar{X}-70| \le 2) \approx \Phi(2)-\Phi(-2)=0.9772-0.0228=0.9544$$

The probability that the sample mean differs from the population mean by at most 2 points is about 95.4%. Comment: this is exactly where the "margin of error" of opinion polls comes from — the fluctuation scale of $\bar{X}$ is $\frac{\sigma}{\sqrt{n}}$ (here $\frac{10}{\sqrt{100}}=1$), so quadrupling the sample size halves the error. With about 95% confidence the error is within $\pm 1.96$ points; that is the standard phrasing of statistical inference.

### Example 3 (Advanced: Normal Approximation to the Binomial with Continuity Correction)

Problem: Toss 100 fair coins and let $X$ be the number of heads, $X \sim B(100,0.5)$. Use the normal approximation to find $P(45 \le X \le 55)$.

Analysis: $np=50 \ge 5$ and $nq=50 \ge 5$, so the approximation conditions hold. $\mu=50$, $\sigma=\sqrt{100\times 0.25}=5$. Use the continuity correction to widen the integer interval $[45,55]$ to $[44.5,55.5]$.

Solution:

$$P(45 \le X \le 55) \approx P(44.5 \le Y \le 55.5), \qquad Y \sim N(50,25)$$

Standardize both ends: $\frac{44.5-50}{5}=-1.1$, $\frac{55.5-50}{5}=1.1$.

$$P(45 \le X \le 55) \approx \Phi(1.1)-\Phi(-1.1)=2\times 0.8643-1=0.7286$$

Without the correction, $\Phi(1)-\Phi(-1)=0.6827$, about 5 percentage points below the exact binomial value (about 0.7287). Comment: the trap is forgetting the $\pm 0.5$. Intuitively, the bar for $X=55$ is about one unit wide and extends from its centre to 55.5; to cover it the normal curve must be drawn out to 55.5, not 55.

## 6. Common Mistakes and Pitfalls

1. **Wrong approach**: reading convergence in probability as "$X_n$ has the limit of an ordinary sequence". **Why wrong**: $X_n$ are random variables and the convergence concerns probability distributions, allowing small-probability deviations. **Correct approach**: test with the language $P(|X_n-X|\ge\varepsilon)\to 0$.

2. **Wrong approach**: applying Khinchin's law to a sequence without an expectation. **Why wrong**: the sample mean of a Cauchy distribution never converges, so the hypothesis is violated. **Correct approach**: confirm first that $E(X_i)=\mu$ exists.

3. **Wrong approach**: using the central limit theorem for very small $n$. **Why wrong**: for $n=5$ the sum is still far from normal and the error is huge. **Correct approach**: in the binomial case the rule of thumb is $np\ge 5$ and $nq\ge 5$; in general $n$ should be at least twenty or thirty.

4. **Wrong approach**: omitting the continuity correction in the binomial normal approximation. **Why wrong**: a lattice distribution fitted with a continuous curve is off by half a cell width and the probability is systematically low (5 percentage points in Example 3). **Correct approach**: for $P(a\le X\le b)$ use $\Phi\!\left(\frac{b+0.5-\mu}{\sigma}\right)-\Phi\!\left(\frac{a-0.5-\mu}{\sigma}\right)$.

5. **Wrong approach**: ignoring independence when sampling. **Why wrong**: draws without replacement from a small sample are not independent and the error formula $\frac{\sigma}{\sqrt{n}}$ fails. **Correct approach**: for a large population treat the draws as approximately independent; for a small population use a finite-population correction.

6. **Wrong approach**: reading "the sample mean tends to $\mu$" as "each trial tends to $\mu$". **Why wrong**: the 10001st toss can still be heads; what tends to a limit is the average, not a single trial. **Correct approach**: distinguish the randomness of the individual from the stability of the average — that is the whole essence of the law of large numbers.

## 7. Summary and Mnemonics

Key points to review:

- Convergence in probability: $P(|X_n-X|\ge\varepsilon)\to 0$; convergence in distribution: the shape of the distribution function approaches;
- Bernoulli's law: frequency $\xrightarrow{P}$ probability; Khinchin's law: the i.i.d. sample mean $\xrightarrow{P}$ the population mean (an expectation is required);
- Central limit theorem: i.i.d., finite variance, the standardized sum $\xrightarrow{d} N(0,1)$; practical form $\sum X_i \dot\sim N(n\mu,n\sigma^2)$;
- De Moivre–Laplace: the binomial is approximately normal, and integer intervals need the continuity correction $\pm 0.5$;
- Applications: sampling error $\frac{\sigma}{\sqrt{n}}$, frequency stability, the theoretical foundation of parameter estimation and hypothesis testing.

**Mnemonic: The law of large numbers keeps the frequency steady; the central limit keeps the sum normal; for the binomial look up Φ; remember the ±0.5 correction.**`,
    keyPoints: [
      'Convergence in probability: ∀ε>0, P(|X_n−X|≥ε)→0',
      'Bernoulli\'s law: frequency→p; Khinchin\'s law: iid sample mean→population mean',
      'Central limit theorem: for iid with finite variance, the standardized sum→N(0,1)',
      'De Moivre–Laplace: normal approximation to the binomial, with continuity correction ±0.5',
    ],
  },

  estimation: {
    chapter: 'Chapter 5 Parameter Estimation',
    title: 'Parameter Estimation',
    summary:
      'Guess the population from a sample: the method of moments matches sample moments, maximum likelihood reasons backwards; judge by unbiasedness, efficiency and consistency, and interval estimates give a range with confidence.',
    content: String.raw`

A biscuit factory produces a hundred thousand packets a day and wants to know the average net weight — it cannot open and weigh them all. An education authority wants to assess the average eyesight of the city's students — it cannot test everyone. Before a presidential election one wants to predict the vote share — one cannot ask every voter. What to do? **Take a sample and infer the population from it.** The shape of the population distribution is often known (weights are approximately normal) but the parameters are not — what are the $\mu$ and $\sigma^2$ of the normal? What is the success probability $p$ of the binomial? Parameter estimation answers two questions: first, how to guess the parameter with a single number (**point estimation**), how to guess and how well; second, how to give an interval and state how confident we are that it "covers" the true value (**interval estimation**). This topic explains the methods, the criteria of quality, and the statistical thinking behind them.

## 2. Rigorous Definitions

**The parameter estimation problem**. Let the population $X$ have a distribution function $F(x;\theta)$ of known form, with $\theta$ an unknown parameter. Let $X_1,\dots,X_n$ be a **simple random sample**: independent, each with the same distribution as $X$. A function $\hat{\theta}=\hat{\theta}(X_1,\dots,X_n)$ of the sample that contains no unknown parameter is called a **statistic**; used as an estimate it is called an **estimator**; the number obtained by substituting the observed values $x_1,\dots,x_n$ is called an **estimate**.

**Method of moments**. Set the sample $k$-th moment equal to the population $k$-th moment:

$$A_k = \frac{1}{n}\sum_{i=1}^n X_i^k = E(X^k)$$

Solving this equation (or system) for $\theta$ gives the **moment estimate** $\hat{\theta}_M$.

**Maximum likelihood**. Let the population have mass function $p(x;\theta)$ (replace $p$ by the density $f$ in the continuous case). The likelihood function is

$$L(\theta)=\prod_{i=1}^n p(x_i;\theta)$$

and its logarithm is $\ell(\theta)=\sum_{i=1}^n \ln p(x_i;\theta)$. The **maximum likelihood estimate** $\hat{\theta}_L$ is the $\theta$ maximizing $L(\theta)$: solve the **likelihood equation**

$$\frac{\partial \ell(\theta)}{\partial \theta_j}=0$$

and then compare with the values at the boundary, taking the largest. The MLE has the **invariance property**: the MLE of $g(\theta)$ is $g(\hat{\theta}_L)$.

**Criteria of quality**:

1. **Unbiasedness**: $E(\hat{\theta})=\theta$; the expectation of the estimator is the true parameter;
2. **Efficiency**: of two unbiased estimators, the one with the smaller variance is more efficient;
3. **Consistency**: as $n\to\infty$, $\hat{\theta} \xrightarrow{P} \theta$;
4. **Mean squared error**: $\mathrm{MSE}(\hat{\theta})=E[(\hat{\theta}-\theta)^2]=D(\hat{\theta})+[\text{bias}]^2$.

**Interval estimation**. An estimate of the form $[\underline\theta,\overline\theta]$ whose endpoints are both statistics, satisfying

$$P\bigl(\underline\theta \le \theta \le \overline\theta\bigr) \ge 1-\alpha$$

$1-\alpha$ is the **confidence level** (usually 0.95). Interval estimates for the mean of a normal population:

- $\sigma$ known: $\displaystyle \bar{X} \pm z_{\alpha/2}\,\frac{\sigma}{\sqrt{n}}$;
- $\sigma$ unknown: $\displaystyle \bar{X} \pm t_{\alpha/2}(n-1)\,\frac{S}{\sqrt{n}}$, where $S^2=\frac{1}{n-1}\sum_{i=1}^n (X_i-\bar{X})^2$.

## 3. Why Defined This Way

**Why distinguish an estimator from an estimate?** An estimator is a random variable (a new sample gives a new number) and its quality must be measured by distributional properties such as expectation and variance; an estimate is the concrete number after substituting the data and has no randomness. Confusing the two makes it impossible to speak of "unbiased" or "efficient" — those are properties of estimators, not of one particular estimate.

**Why can the method of moments fail?** It relies on the sample moments existing and the equations being solvable. For heavy-tailed distributions the sample mean itself has a huge variance and moment estimates are unstable; sometimes the moment equations have no solution or several, and a different order of moments must be chosen. Its merits are simplicity and intuitiveness, and it does not require the fine detail of the population distribution.

**Why is maximum likelihood preferred?** It has a convincing rationale: "whichever parameter values make the data I see most likely, that is my guess." For large samples the MLE is asymptotically normal and asymptotically efficient, and it has the invariance property. The price is that it may be biased in small samples (the MLE of a normal variance is too small) and that one must write the likelihood fully, solve, and check the boundary.

**Why need "efficient" and "consistent" in addition to "unbiased"?** Unbiasedness only guarantees "no systematic bias on average". The estimator $\hat\theta_1=X_1$ (using only the first observation) is also an unbiased estimator of the population mean, but its variance is $n$ times that of $\frac{\sigma^2}{n}$ — useless. Efficiency compares variances within the unbiased family; consistency guarantees that more data means a more reliable estimate. In practice one looks at the mean squared error, which allows trading a little bias for a large reduction in variance.

**Why does interval estimation use the $t$ distribution?** When $\sigma$ is unknown it is replaced by the sample standard deviation $S$, and the distribution of $\frac{\bar{X}-\mu}{S/\sqrt{n}}$ is no longer normal but $t(n-1)$ — the degrees of freedom $n-1$ come from the constraint $\sum(X_i-\bar{X})=0$ on $\sum(X_i-\bar{X})^2$ in $S^2$: $n$ deviations have only $n-1$ degrees of freedom. For small $n$ the $t$ distribution has fatter tails than the normal and larger critical values ($t_{0.025}(15)=2.131>1.96$ for $n=16$), so the threshold is more conservative.

**Why can the confidence level not be read as "the parameter lies in the interval with probability 95%"?** The parameter $\theta$ is a fixed unknown constant with no randomness; what is random is the interval (a new sample gives a new interval). The correct statement (frequency interpretation): repeat the sampling 100 times and construct 100 intervals the same way; about 95 of them cover the true value.

## 4. Intuition and Pictures

Method of moments versus maximum likelihood:

| | Method of moments | Maximum likelihood |
|------|------|------|
| Idea | Match sample moments to population moments and solve | Which parameter values most likely produced this sample |
| Analogy | Estimating a recipe from the ingredient list | A detective reconstructing the case from traces at the scene |
| Requires | Population moments exist | The full form of the distribution |
| Merits | Simple and general | Good for large samples, invariance |
| Demerits | May not be unique | May be biased in small samples, needs solving equations |

**A visual metaphor for unbiasedness**: the estimator is a dart and the bullseye is $\theta$. Unbiased = the average landing point is the bullseye (the scatter may be large); efficient = small scatter; consistent = the more darts, the tighter the cluster.

> **Intuition**: interval estimation is "catching fish with a net". $\bar{X}$ is the centre of the net and $\frac{S}{\sqrt{n}}$ determines the mesh size. The larger the sample $n$, the tighter the net (the narrower the interval); the higher the confidence level, the wider the net must be cast (the wider the interval). With $n$ fixed, "narrower" and "more accurate" cannot both be had — the origin of every sampling error table.

## 5. Worked Examples

### Example 1 (Basic: Method of Moments)

Problem: Let the population be $X \sim N(\mu,\sigma^2)$ with both $\mu$ and $\sigma^2$ unknown, and the sample values $3,5,7,9$. Find the moment estimates of $\mu$ and $\sigma^2$.

Analysis: Two parameters need two moment equations, using the first and second raw moments.

Solution: The sample mean is

$$\bar{x}=\frac{3+5+7+9}{4}=6$$

and the sample second raw moment is

$$A_2=\frac{1}{4}\bigl(3^2+5^2+7^2+9^2\bigr)=\frac{164}{4}=41$$

Moment equations: $\mu=\bar{x}=6$ and $\sigma^2=A_2-\bar{x}^2=41-36=5$. Hence

$$\hat\mu=6, \qquad \hat\sigma^2=5$$

Comment: The procedure is "compute the sample moments $\to$ write the equations $\to$ solve for the parameters". The sample version of the second central moment $\frac{1}{n}\sum(x_i-\bar x)^2$ is equivalent to $A_2-\bar{x}^2$: $\frac{1}{4}[(3-6)^2+(5-6)^2+(7-6)^2+(9-6)^2]=\frac{20}{4}=5$, the same result by another route.

### Example 2 (Intermediate: Maximum Likelihood)

Problem: Let $X \sim B(N,p)$ with $N$ known and $p$ unknown. Run $m$ independent groups of trials ($N$ each) and let the $i$-th group have $x_i$ successes. Find the maximum likelihood estimate of $p$.

Analysis: Write the likelihood, take logarithms, differentiate with respect to $p$ and set to 0.

Solution: The probability of $x_i$ successes in a group is $\binom{N}{x_i}p^{x_i}(1-p)^{N-x_i}$, so the likelihood is

$$L(p)=\left[\prod_{i=1}^m \binom{N}{x_i}\right] p^{\sum x_i}(1-p)^{mN-\sum x_i}$$

Taking logarithms (the combinatorial factor is independent of $p$ and may be dropped):

$$\ell(p)=\left(\sum_{i=1}^m x_i\right)\ln p + \left(mN-\sum_{i=1}^m x_i\right)\ln(1-p)$$

Differentiating and setting to 0:

$$\frac{\mathrm{d}\ell}{\mathrm{d}p}=\frac{\sum x_i}{p}-\frac{mN-\sum x_i}{1-p}=0$$

Solving,

$$\hat p=\frac{\sum_{i=1}^m x_i}{mN}=\frac{\bar x}{N}$$

i.e. "total successes divided by total trials", consistent with the moment estimate. The second derivative at the solution is negative ($\ell''=-\frac{\sum x_i}{p^2}-\frac{mN-\sum x_i}{(1-p)^2}<0$), confirming a maximum. Comment: the MLE procedure "write the likelihood $\to$ take logarithms $\to$ differentiate $\to$ solve $\to$ verify the maximum" cannot skip a step; here the result is the common-sense "success rate = successes / trials", and maximum likelihood has made common sense rigorous.

### Example 3 (Advanced: Unbiasedness, the Corrected Sample Variance and Interval Estimation)

Problem: (1) Prove that the sample mean $\bar{X}$ and the corrected sample variance $S^2=\frac{1}{n-1}\sum_{i=1}^n (X_i-\bar{X})^2$ are unbiased estimators of the population mean and variance; (2) for a normal population with $\sigma$ unknown, $n=16$, $\bar{x}=50$, $S=4$, find the 95% confidence interval for $\mu$.

Analysis: (1) use $\sum(X_i-\bar{X})^2=\sum(X_i-\mu)^2-n(\bar{X}-\mu)^2$ and take expectations on both sides; (2) with $\sigma$ unknown the $t$ distribution must be used.

Solution: (1) Unbiasedness follows at once from $E(\bar{X})=\mu$. For the sum of squares, use the identity (expand both sides, note $\sum X_i=n\bar{X}$, and rearrange)

$$\sum_{i=1}^n (X_i-\bar{X})^2 = \sum_{i=1}^n (X_i-\mu)^2 - n(\bar{X}-\mu)^2$$

Taking expectations on both sides and using independence and identical distribution of the $X_i$ together with $E(\bar{X}-\mu)^2=\frac{\sigma^2}{n}$:

$$E\left[\sum (X_i-\bar{X})^2\right] = n\sigma^2 - n\cdot\frac{\sigma^2}{n} = (n-1)\sigma^2$$

Hence

$$E(S^2)=\frac{1}{n-1}\cdot(n-1)\sigma^2=\sigma^2$$

so $S^2$ is unbiased. Note: using $\frac{1}{n}$ instead of $\frac{1}{n-1}$ (which is exactly the MLE of a normal variance) gives expectation $\frac{n-1}{n}\sigma^2<\sigma^2$, systematically too small — the "correction" $n-1$ exists precisely to fix this bias.

(2) With $\sigma$ unknown use the $t$ pivot: $\frac{\bar{X}-\mu}{S/\sqrt{n}} \sim t(n-1)$. Here $t_{0.025}(15)=2.131$ and the standard error is $\frac{S}{\sqrt{n}}=\frac{4}{4}=1$. The confidence interval is

$$\bar{x} \pm t_{0.025}(15)\cdot\frac{S}{\sqrt{n}} = 50 \pm 2.131 = [47.869,\ 52.131]$$

so the 95% confidence interval for $\mu$ is about $[47.87, 52.13]$. Comment: two traps. (1) If one wrongly assumes "$\sigma$ unknown, use $z=1.96$", the interval becomes $[48.04,51.96]$, apparently narrower but wrong — $S$ itself fluctuates, and the fat tails of $t$ are the toll paid for that uncertainty. (2) The correct reading of a confidence interval is "a 95% coverage rate of the method", not "$\mu$ lies in this interval with probability 95%".

## 6. Common Mistakes and Pitfalls

1. **Wrong approach**: confusing an estimator with an estimate. **Why wrong**: unbiasedness and efficiency are properties of the estimator (a random variable). **Correct approach**: $\hat\theta(X_1,\dots,X_n)$ is a function; $\hat\theta(x_1,\dots,x_n)$ is a number.

2. **Wrong approach**: solving the MLE equation and stopping there. **Why wrong**: the maximum may be at the boundary (e.g. when estimating $p$, a solution $\hat p<0$ should be taken as 0), or the likelihood may have several stationary points. **Correct approach**: compare the likelihood at the stationary points with its values at the boundary.

3. **Wrong approach**: writing the wrong number of moment equations. **Why wrong**: two parameters need two moment equations; with one equation there is no unique solution. **Correct approach**: $k$ parameters take $k$ moment equations.

4. **Wrong approach**: thinking unbiased is enough. **Why wrong**: $\hat\theta=X_1$ is also an unbiased estimator of the mean, but its variance is $n$ times that of $\bar{X}$. **Correct approach**: compare variances within the unbiased family (efficiency), or compare mean squared errors directly.

5. **Wrong approach**: using the wrong critical value for known and unknown $\sigma$. **Why wrong**: with $\sigma$ unknown one must use $t_{\alpha/2}(n-1)$ with $S$ in the denominator. **Correct approach**: check whether the problem gives $\sigma$ or a sample standard deviation.

6. **Wrong approach**: saying "a 95% confidence level means the parameter lies in the interval with probability 95%". **Why wrong**: the parameter is not random; the interval is. **Correct approach**: about 95% of intervals from repeated sampling cover the parameter.

## 7. Summary and Mnemonics

Key points to review:

- Method of moments: sample moments = population moments, solve the equations; MLE: write the likelihood, take logarithms, differentiate, verify the maximum, and it has the invariance property;
- Unbiasedness $E(\hat\theta)=\theta$; efficiency compares variances; consistency $\hat\theta \xrightarrow{P}\theta$; the overall measure is the MSE;
- $\bar{X}$ is an unbiased estimator of $\mu$; $S^2$ (divided by $n-1$) is an unbiased estimator of $\sigma^2$, while the version divided by $n$ is biased;
- Normal mean intervals: for known $\sigma$ use $\bar{X}\pm z_{\alpha/2}\frac{\sigma}{\sqrt n}$; for unknown $\sigma$ use $\bar{X}\pm t_{\alpha/2}(n-1)\frac{S}{\sqrt n}$;
- The confidence level is the coverage rate of the "interval construction method", not the probability that a particular interval contains the parameter.

**Mnemonic: Moments match the sample, maximum likelihood reasons backwards; unbiased, efficient, consistent; for intervals check whether σ is known (known uses z, unknown uses t).**`,
    keyPoints: [
      'Method of moments: sample moments = population moments and solve; maximum likelihood: maximize the likelihood function',
      'Unbiasedness E(θ̂)=θ; both the sample mean and the corrected sample variance S² are unbiased',
      'Efficiency: compare variances; consistency: θ̂→P θ',
      'For known σ the mean interval is X̄±z_{α/2}σ/√n; for unknown σ use the t distribution and S',
    ],
  },

  'hypothesis-testing': {
    chapter: 'Chapter 6 Hypothesis Testing',
    title: 'Hypothesis Testing',
    summary:
      'Look for evidence with a skeptical mind: first set up the "no effect" null hypothesis, then see how rare the data is — rare enough and you reject it.',
    content: String.raw`

In a courtroom the defendant is "presumed innocent" — innocence is assumed first and the prosecution must present evidence; only when the evidence is strong enough (beyond reasonable doubt) is there a conviction. For a new drug, the regulator first assumes "the new drug is no different from placebo", and the manufacturer must produce sufficiently strong data to overturn that. A coin is suspected of being tampered with: first assume "the coin is fair", then see whether the pattern of heads and tails is too extreme to be explained by chance. This style of reasoning — "assume nothing is wrong, then see how unusual the evidence is" — is **hypothesis testing**, the most frequently used tool in mathematical statistics. The question it always answers is: is the difference seen in the data (the drug seems to work, the coin seems biased, the process seems to have changed) a real effect or pure chance? This topic makes the criteria, the procedure, and the most commonly misread concepts (significance level, p-value, the two types of error) clear.

## 2. Rigorous Definitions

**The hypothesis testing problem**. Two mutually exclusive hypotheses are proposed about an unknown parameter $\theta$ of the population distribution:

- **Null hypothesis** $H_0$: the "default state" to be tested (e.g. $\theta=\theta_0$, "no effect", "no difference");
- **Alternative hypothesis** $H_1$: the assertion opposed to $H_0$ (e.g. $\theta \ne \theta_0$ two-sided, or $\theta>\theta_0$, $\theta<\theta_0$ one-sided).

**Test statistic**: a function $T=T(X_1,\dots,X_n)$ of the sample whose distribution when $H_0$ is true is completely known. **Rejection region** $W$: a region of values of the statistic; if the observed value falls in $W$, $H_0$ is rejected.

**Two types of error**:

- **Type I error (rejecting a true null)**: $H_0$ is true but is rejected. Its probability

$$\alpha = P(\text{reject }H_0 \mid H_0 \text{ is true})$$

is the **significance level**, fixed by the analyst before the test (usually 0.05 or 0.01).

- **Type II error (accepting a false null)**: $H_0$ is false but is accepted. Its probability is $\beta=P(\text{accept }H_0 \mid H_0 \text{ is false})$; $1-\beta$ is the **power** of the test.

**Five-step procedure**: 1. State $H_0$ and $H_1$; 2. choose the test statistic; 3. determine the rejection region from the significance level $\alpha$; 4. compute the observed value of the statistic from the sample; 5. reject $H_0$ if it falls in the rejection region, otherwise do not reject.

**p-value**: the probability, assuming $H_0$ is true, of a statistic value "at least as extreme as the current observation". Decision rule: reject $H_0$ if $p<\alpha$.

**Common tests** (mean of a single normal population):

- $\sigma$ known: $Z=\frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}} \sim N(0,1)$, two-sided rejection region $|Z| \ge z_{\alpha/2}$, right-sided $Z \ge z_{\alpha}$;
- $\sigma$ unknown: $T=\frac{\bar{X}-\mu_0}{S/\sqrt{n}} \sim t(n-1)$, two-sided rejection region $|T| \ge t_{\alpha/2}(n-1)$.

**Test for a proportion** (large sample): $H_0: p=p_0$, statistic $Z=\frac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}} \approx N(0,1)$.

## 3. Why Defined This Way

**Why is $H_0$ "no effect, no difference"?** It is the "default state" that must be overturned by evidence, occupying the position of the presumption of innocence: rejecting it requires strong evidence (a rare event occurring), while accepting it requires no evidence (not finding an anomaly is not a proof that there is none). Putting the proposition one wants to prove (the drug works) in $H_1$ and the conservative status quo in $H_0$ places the burden of proof on the party making the claim.

**Why control the Type I error $\alpha$ rather than $\beta$?** Because the calculation of $\beta$ depends on "what the true parameter is", and the true parameter is unknown (otherwise there would be no need to test); $\alpha$ depends only on the known distribution under $H_0$ and can be controlled exactly. It is like the law caring more about "not convicting the innocent" ($\alpha$) than about "letting no one escape" ($\beta$).

**Why is the rejection region placed in the tails?** Under $H_0$ the distribution of the statistic is known (a bell, say); central values are common, tail values rare. Only an observed value in the "rare region" (a small-probability event really happening) constitutes effective doubt about $H_0$. This is the **principle of small probability**: an event of very small probability hardly ever occurs in a single trial, so if it does occur, doubt the premise.

**Why does the p-value carry more information than "reject / do not reject"?** The rejection region is a black-and-white threshold, while the p-value is a continuous scale: $p=0.049$ and $p=0.0001$ both "reject", but the strength of evidence is worlds apart. Reporting the p-value lets readers judge for themselves; this is standard in modern statistical reporting.

**Why can one not say "accept $H_0$"?** Not rejecting $H_0$ only means "the evidence is insufficient to overturn it", much as "not having found aliens does not mean there are none". The standard phrasing is "do not reject $H_0$".

**Why does a large sample make even a tiny difference significant?** The scale of the test statistic contains $\sqrt{n}$: the larger $n$, the more sensitive $\frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}$ to a difference of the same size. With huge $n$, "significant" may correspond to a difference that is meaningless in practice. So significant $\ne$ important, and the effect size should also be reported.

## 4. Intuition and Pictures

The courtroom analogy, translating statistical terms into everyday ones:

| Statistics | Courtroom | Explanation |
|------|------|------|
| $H_0$: the defendant is innocent | The default state | Assumed first |
| $H_1$: the defendant is guilty | The prosecution's claim | Requires evidence |
| Rejection region ($\alpha$) | The "beyond reasonable doubt" threshold | How unusual the evidence must be for a conviction |
| Type I error | Convicting an innocent | Innocent but convicted |
| Type II error | Letting a culprit go | Guilty but acquitted |

> **Intuition**: $\alpha$ and $\beta$ are a see-saw. With a fixed sample size, lowering the conviction threshold ($\alpha$ smaller) means fewer innocents convicted but more real culprits released ($\beta$ larger). The only way to have both is to increase the sample size — to gather more evidence.

The choice between one-sided and two-sided **must be made before seeing the data** — choosing the direction after looking is statistical cheating:

| Situation | $H_1$ | Rejection region |
|------|------|------|
| Only whether it changed | $\mu \ne \mu_0$ | Two-sided: $|Z| \ge z_{\alpha/2}$ |
| Only whether it increased | $\mu > \mu_0$ | Right: $Z \ge z_{\alpha}$ |
| Only whether it decreased | $\mu < \mu_0$ | Left: $Z \le -z_{\alpha}$ |

## 5. Worked Examples

### Example 1 (Basic: $Z$ Test for a Normal Mean)

Problem: The net weight of a brand of monosodium glutamate is $X \sim N(\mu, 4^2)$ ($\sigma=4$ known). The standard net weight is 500 g. A random sample of 16 packets has mean $\bar{x}=498$ g. At $\alpha=0.05$, can one conclude that the mean of this batch does not meet the standard?

Analysis: "Does not meet the standard" is a two-sided question. With $\sigma$ known, use the $Z$ test.

Solution: Five steps. 1. Hypotheses: $H_0: \mu=500$, $H_1: \mu \ne 500$. 2. Statistic

$$Z=\frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}=\frac{\bar{X}-500}{4/\sqrt{16}}=\bar{X}-500$$

Under $H_0$, $Z \sim N(0,1)$. 3. For $\alpha=0.05$ two-sided, $z_{0.025}=1.96$ and the rejection region is $|Z| \ge 1.96$. 4. Observed value

$$z=\frac{498-500}{1}=-2$$

5. Since $|-2|=2>1.96$ it falls in the rejection region, so **reject $H_0$**: the mean differs significantly from 500 g (it is low).

p-value: $p=P(|Z| \ge 2)=2[1-\Phi(2)]=0.0456<0.05$, consistent with the rejection-region decision. Comment: had the alternative been one-sided $H_1: \mu<500$, the rejection region would be $Z<-z_{0.05}=-1.645$, and $-2<-1.645$ still rejects, but the threshold is lower — a one-sided test concentrates all of $\alpha$ in one direction and is more sensitive to a difference in that direction, at the cost of complete blindness to the opposite direction.

### Example 2 (Intermediate: $t$ Test and Proportion Test)

Problem: (1) As in Example 1 but with $\sigma$ unknown, sample standard deviation $s=4$, $n=16$, $\bar{x}=498$, $\alpha=0.05$; does the conclusion change? (2) Toss a coin 100 times and get 60 heads. At $\alpha=0.05$, test whether the coin is fair.

Analysis: (1) With $\sigma$ unknown the $t$ test must be used with 15 degrees of freedom; (2) a large-sample proportion test.

Solution: (1) Statistic

$$T=\frac{\bar{X}-\mu_0}{S/\sqrt{n}}=\frac{498-500}{4/\sqrt{16}}=-2$$

Under $H_0$, $T \sim t(15)$ and the two-sided rejection region is $|T| \ge t_{0.025}(15)=2.131$. Since $|-2|=2<2.131$, **do not reject $H_0$**. With the same data, known $\sigma$ rejects and unknown $\sigma$ does not — because $S$ itself fluctuates and the $t$ critical value is more conservative than $z$ (here the $t$ p-value is about 0.064, slightly above 0.05).

(2) $H_0: p=0.5$, $H_1: p \ne 0.5$. The test statistic is

$$Z=\frac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}=\frac{0.6-0.5}{\sqrt{0.25/100}}=\frac{0.1}{0.05}=2$$

$|Z|=2>1.96$, so reject $H_0$: the coin is not fair (too many heads). The p-value is again 0.0456. Comment: in (2) the denominator uses $p_0(1-p_0)$ rather than $\hat p(1-\hat p)$ — under $H_0$ the population parameter is $p_0$, and the statistic's distribution must be fully determined by $H_0$. Replacing $p_0$ by $\hat p$ is a common but wrong practice.

### Example 3 (Advanced: The Two Types of Error and Power)

Problem: The population is $X \sim N(\mu, 4^2)$; test $H_0: \mu=500$ against $H_1: \mu=503$ (one-sided, $\mu>500$) with $\sigma=4$, $n=16$, $\alpha=0.05$. (1) Find the Type I error probability and, when the true $\mu=503$, the value of $\beta$ and the power $1-\beta$; (2) explain how to increase the power.

Analysis: The Type I error is computed directly from the definition of the rejection region; $\beta$ must be computed under $H_1$ as the probability of falling in the acceptance region.

Solution: (1) Right-sided test, rejection region $\bar{X}>500+z_{0.05}\cdot\frac{\sigma}{\sqrt{n}}=500+1.645\times 1=501.645$. The Type I error probability (equal to $\alpha$ by construction):

$$\alpha=P(\bar{X}>501.645 \mid \mu=500)=P\!\left(Z>\frac{501.645-500}{1}\right)=P(Z>1.645)=0.05$$

Type II error: when $\mu=503$, $\bar{X} \sim N(503,1)$,

$$\beta=P(\bar{X} \le 501.645 \mid \mu=503)=P\!\left(Z \le \frac{501.645-503}{1}\right)=P(Z \le -1.355)\approx 0.0877$$

so the power is $1-\beta \approx 0.912$.

(2) Ways to increase power: increase the sample size $n$ (the rejection boundary moves left and the fluctuation $\frac{\sigma}{\sqrt{n}}$ of $\bar{X}$ shrinks); or increase $\alpha$; or reduce the measurement error $\sigma$. For example, if the true difference were only $\mu=502$, then $\beta=P\!\left(Z \le \frac{501.645-502}{1}\right)=P(Z \le -0.355)\approx 0.361$ and the power only about 64% — **the smaller the true difference, the harder to detect**; to catch a difference of 2 reliably one can only increase $n$.

Comment: There are two traps. (1) Treating $\beta$ as a fixed constant — it varies with the true parameter, and one usually reports a whole "power curve". (2) Believing "no rejection" equals "no difference" — if the power is only 64%, "no difference detected" probably just means the sample was too small, not that the difference does not exist.

## 6. Common Mistakes and Pitfalls

1. **Wrong approach**: saying "do not reject $H_0$" means "$H_0$ is proved true". **Why wrong**: not rejecting only means the evidence is insufficient. **Correct approach**: say "there is not enough evidence to reject $H_0$", and check whether the power is adequate.

2. **Wrong approach**: believing the p-value is "the probability that $H_0$ is true". **Why wrong**: the p-value is the rarity of the data computed **assuming** $H_0$ is true; $P(H_0\mid\text{data})$ is something else (and needs a Bayesian framework). **Correct approach**: p-value = $P(\text{data at least this extreme}\mid H_0)$.

3. **Wrong approach**: deciding one-sided or two-sided after looking at the data. **Why wrong**: choosing the direction afterwards quietly inflates $\alpha$. **Correct approach**: fix $H_1$ from the background of the question before seeing the data.

4. **Wrong approach**: confusing the significance level $\alpha$ with the p-value. **Why wrong**: $\alpha$ is the threshold fixed in advance and the p-value the strength of evidence computed afterwards. **Correct approach**: report "$p=0.032<\alpha=0.05$, reject $H_0$"; the two numbers play different roles.

5. **Wrong approach**: ignoring the premises of the test (normality, independence, whether $\sigma$ is known). **Why wrong**: using the $Z$ test when $\sigma$ is actually unknown, or a $t$ test for a small non-normal sample, makes $\alpha$ a misnomer. **Correct approach**: check the premises first; unknown $\sigma$ uses $t$, large-sample proportions use $Z$.

6. **Wrong approach**: with a huge sample, taking "statistically significant" for "practically important". **Why wrong**: the larger $n$, the more significant even a tiny difference (the statistic contains $\sqrt{n}$). **Correct approach**: report the effect size and a confidence interval so that readers can judge the practical significance.

## 7. Summary and Mnemonics

Key points to review:

- Hypothesis testing = presumption of innocence + the principle of small probability: $H_0$ is the default state, and it is rejected only when the data are rare enough to fall outside the rejection region;
- The Type I error probability $\alpha$ is fixed in advance; the Type II error $\beta$ depends on the true parameter and the power grows with $n$;
- Five steps: state the hypotheses, choose the statistic, fix the rejection region, compute the observed value, make the decision;
- Known $\sigma$ uses $Z$, unknown $\sigma$ uses $t(n-1)$; large-sample proportions use $Z=\frac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}$;
- The p-value is a continuous measure of evidence, and $p<\alpha$ rejects; one- or two-sided is fixed in advance; significant $\ne$ important.

**Mnemonic: Presume innocence to set the null; only a small-probability event rejects it; α handles innocents convicted, β handles culprits released; p below α decides; not rejecting does not make it right.**`,
    keyPoints: [
      'Null hypothesis H₀ (presumption of innocence) and alternative H₁; two types of error α and β',
      'Procedure: hypotheses → statistic → rejection region → observed value → decision',
      'Z test (σ known) and t test (σ unknown); two-sample and proportion tests',
      'p-value = probability under H₀ of a result at least this extreme; reject if p<α',
    ],
  },
};

export default map;
