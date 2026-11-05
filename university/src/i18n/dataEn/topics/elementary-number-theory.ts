import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'divisibility': {
    chapter: 'Chapter 1 Divisibility and Primes',
    title: 'Divisibility, Primes, and How Many There Are',
    summary:
      'Starting from "do the candies divide evenly?", we turn divisibility, primes and unique factorization into a language of building blocks, and then ask how many primes there are and how densely they are spread.',
    keyPoints: [
      'Divisibility a|b means there is an integer q with b=aq, and requires a≠0',
      'A prime is an integer greater than 1 whose only positive divisors are 1 and itself; neither 1 nor 0 counts',
      'Division with remainder gives a unique quotient and remainder, the foundation of the whole course',
      'Fundamental Theorem of Arithmetic: the prime factorization of n>1 is unique (up to order)',
      'Number of divisors d(n)=∏(e_i+1); there are infinitely many primes',
    ],
    content: String.raw`

Divide $12$ candies equally among $3$ children: each gets $4$, and nothing is left over; divide them among $5$ children: each gets $2$ and $2$ remain. "Nothing left over" is the everyday version of divisibility: the dividend contains a whole number of copies of the divisor. In mathematics we do not count candies; we ask a cleaner question: does there exist an integer $q$ such that $b=aq$?

In the world of multiplication there is also a special class of numbers that cannot be broken into smaller products. $6=2\times3$ can be split, $7$ cannot, and $12=2^2\times3$ splits all the way into two $2$s and one $3$. These "indivisible bricks" are the primes. The Fundamental Theorem of Arithmetic tells us that every integer greater than $1$ factors uniquely into a product of primes, just as every molecule has a unique chemical formula.

Two natural questions then arise. First, are the bricks enough? That is, are there infinitely many primes? Second, how are the bricks distributed? There are $25$ primes below $100$ and $168$ below $1000$; they thin out as we go, but will they ever run dry?

Motivating question: why do mathematicians insist that "$1$ is not prime"? This is no word game—it is the lifeline on which unique factorization stands or falls. We return to this question at the end of the section.

## 2. Rigorous Definitions

**Definition (divisibility)**. Let $a,b\in\mathbb{Z}$ with $a\neq0$. If there exists an integer $q$ such that $b=aq$, we say $a$ divides $b$, written $a\mid b$, and call $a$ a divisor of $b$ and $b$ a multiple of $a$. Otherwise we write $a\nmid b$.

Here $q$ must be an integer, and this is the watershed between divisibility and ordinary division: $2\mid6$ because $6=2\times3$; $4\nmid6$ because $6/4=1.5$ is not an integer. The definition also deliberately requires $a\neq0$; the reason is explained in the next section.

**Definition (prime and composite)**. Let $n$ be an integer greater than $1$. If the only positive divisors of $n$ are $1$ and $n$ itself, $n$ is called prime; if $n>1$ and $n$ is not prime, $n$ is called composite.

Under this definition the smallest primes are $2,3,5,7,11,13,17,19,23,29$. Note that $2$ is the only even prime, since every even number greater than $2$ has $2$ as a divisor.

**Theorem (division with remainder)**. For any $a\in\mathbb{Z}$ and positive integer $b$, there exist unique integers $q,r$ such that

$$a=bq+r,\qquad 0\le r<b.$$

$q$ is called the quotient and $r$ the remainder. This theorem is the foundation of the whole course: it guarantees that "remainder" is well defined, so that congruences and the Euclidean algorithm have ground to stand on.

**Theorem (Fundamental Theorem of Arithmetic)**. Every integer $n>1$ can be written as

$$n=p_1^{e_1}p_2^{e_2}\cdots p_k^{e_k},$$

where $p_1<\cdots<p_k$ are primes and $e_i\ge1$; moreover, up to the order of the factors, this factorization is unique.

Uniqueness is where all the power lies. It lets us read off the structure of a number the way we read a chemical formula: the number of divisors, the greatest common divisor, whether it is a perfect square—all can be seen from the exponents.

**Definition (prime-counting function)**. Let $\pi(x)$ denote the number of primes not exceeding $x$. For example $\pi(10)=4$ and $\pi(100)=25$.

**Theorem (Euclid)**. There are infinitely many primes.

**Theorem (Prime Number Theorem)**. As $x\to\infty$,

$$\pi(x)\sim\frac{x}{\ln x},$$

meaning that the ratio of the two sides tends to $1$.

## 3. Why Define It This Way

**Why require $a\neq0$?** Because $0$ cannot serve as a divisor. If $0\mid b$ were allowed, there would have to be a $q$ with $b=0\cdot q=0$, which holds only for $b=0$; and when $b=0$ any $q$ works, so the quotient is not unique. Mathematical definitions dread "non-unique answers", so $0$ is simply deleted from the position of divisor. Conversely, $a\mid0$ holds for every $a\neq0$, because $0=a\cdot0$, and there is no contradiction.

**Why do primes require $n>1$?** This is the most easily overlooked and most critical point of the section. What would happen if $1$ counted as prime? $6=2\times3=1\times2\times3=1\times1\times2\times3$, and factorization is immediately non-unique; worse, any number can be multiplied by arbitrarily many $1$s, and uniqueness collapses completely. In multiplication $1$ plays the role of the "identity element" (multiplying by it changes nothing), not the role of an "atom". Excluding $1$ amounts to declaring: we count only the factors that genuinely contribute to size.

**Why are $0$ and $1$ neither prime nor composite?** A composite must be "writable as a product of two integers both greater than $1$". Neither $0$ nor $1$ can do that, so they fall outside both classes. This is not an omission but the inevitable outcome of the classification: primes "generate", $1$ "does nothing", and $0$ "absorbs everything".

**Why do negative divisors not affect the definition of prime?** Because the definition of prime counts only positive divisors. If $-7$ also counted as a divisor of $7$, every prime would acquire an extra negative divisor, and the definition would need the extra clause "up to a sign". Number theory conventionally leaves signs to the unit $\pm1$ and studies only positive divisors.

**Why must unique factorization be "up to order"?** $12=2\times2\times3=3\times2\times2$; the commutativity of multiplication makes order carry no information. So uniqueness can only demand "equal after rearrangement", which is the usual refined use of the word "unique" in mathematics: unique up to some equivalence relation.

**Counterexample: what if unique factorization fails?** In the set $\{a+b\sqrt{-5}: a,b\in\mathbb{Z}\}$, $6=2\times3=(1+\sqrt{-5})(1-\sqrt{-5})$, and neither factorization can be split further, so uniqueness fails. This shows that the Fundamental Theorem of Arithmetic is not "obvious": it depends on the special structure of the ring of integers. It holds for the integers because we are lucky; in general number rings it may fail.

## 4. Intuition and Pictures

Think of the integers as a wall built from prime bricks. Each number corresponds to a unique "bill of materials":

| Integer | Prime factorization | Number of positive divisors |
|---|---|---|
| $12$ | $2^2\cdot3$ | $6$ |
| $60$ | $2^2\cdot3\cdot5$ | $12$ |
| $97$ | $97$ | $2$ |
| $100$ | $2^2\cdot5^2$ | $9$ |
| $5040$ | $2^4\cdot3^2\cdot5\cdot7$ | $60$ |

The divisor-count formula comes from combinatorial counting: if $n=\prod p_i^{e_i}$, the exponent of $p_i$ in a divisor can be $0,1,\dots,e_i$, giving $e_i+1$ choices independently, hence

$$d(n)=\prod_{i=1}^{k}(e_i+1).$$

$5040$ has $5\times3\times2\times2=60$ divisors, which is why $7!$ is chosen as a "highly composite" number when dividing things up: it can be split equally among many different numbers of people.

> Intuition: primes are like the elements of the periodic table, composites like compounds. Factoring a number is chemical analysis, and the result of that analysis is unique.

**How sparse are the primes?** The sieve makes it visible: cross out the multiples of $2$, then the multiples of $3$, then of $5$, and what remains is prime. $\pi(100)=25$, $\pi(1000)=168$, $\pi(10^6)=78498$. The density decays roughly like $1/\ln x$, but it is never zero.

**How large can the gaps between primes be?** Take any $n>1$ and consider

$$n!+2,\ n!+3,\ \dots,\ n!+n.$$

These $n-1$ numbers are divisible by $2,3,\dots,n$ respectively, so all are composite. Hence gaps can be arbitrarily large. But large gaps do not mean the primes stop; Euclid's theorem guarantees they are infinite.

**To test primality it suffices to try up to $\sqrt{n}$.** If $n=ab$ with $a\le b$, then $a\le\sqrt{n}$. So we need only check for divisors between $2$ and $\sqrt{n}$. Testing $97$: only $2,3,5,7$ need be tried (since $9^2=81<97<100=10^2$, trying up to $9$ suffices), and none divides it, so $97$ is prime.

## 5. Worked Examples

### Example 1 (Basic: testing primality and factoring)

Problem: decide whether $1,0,91,97$ are prime; factor $5040$ into primes and find its number of positive divisors.

Approach: first check the "greater than $1$" clause of the definition, then use trial division; after factoring, apply the divisor-count formula.

Solution: $1$ is not greater than $1$, so it is not prime; $0$ is not greater than $1$ either, so it is neither prime nor composite.

For $91$: $2$ does not divide it (odd); $3$ does not ($9+1=10$ is not a multiple of $3$); $5$ does not (last digit is not $0$ or $5$); $7$ does: $91=7\times13$. Hence $91$ is composite.

For $97$: $\sqrt{97}<10$, so we need only try $2,3,5,7$. $97$ is odd, $9+7=16$ is not divisible by $3$, the last digit is neither $0$ nor $5$, and $97=7\times13+6$ leaves remainder $6$. None divides it, so $97$ is prime.

Factor $5040$: first divide by $10$ to get $504$, then extract small primes step by step.

$$5040=504\times10=(2^3\cdot3^2\cdot7)\times(2\cdot5)=2^4\cdot3^2\cdot5\cdot7.$$

Check: $2^4=16$, $3^2=9$, $16\times9=144$, $144\times5=720$, $720\times7=5040$, correct.

Number of divisors:

$$d(5040)=(4+1)(2+1)(1+1)(1+1)=5\times3\times2\times2=60.$$

Comment: $5040=7!$ is a classic "highly composite" number, often used to design quantities that split evenly into many parts. When factoring, trying small primes in turn is more reliable than guessing.

### Example 2 (Intermediate: proof that there are infinitely many primes)

Problem: prove by Euclid's method that there are infinitely many primes, and explain why the proof does not "construct a new prime".

Approach: contradiction. Assume there are only finitely many, multiply them all and add $1$, then examine the prime factors of this new number.

Solution: suppose there are only finitely many primes, listed as $p_1,p_2,\dots,p_n$. Let

$$N=p_1p_2\cdots p_n+1.$$

Since $N>1$, by the Fundamental Theorem of Arithmetic $N$ has at least one prime factor $p$.

If $p$ were some $p_i$, then $p\mid p_1p_2\cdots p_n$ and also $p\mid N$, so $p$ divides their difference:

$$N-p_1p_2\cdots p_n=1.$$

But a prime $p\ge2$ cannot divide $1$, a contradiction. So $p$ is not among $p_1,\dots,p_n$, contradicting "these are all the primes". Hence there are infinitely many primes.

Why can we not say "$N$ must be prime"? Because $N$ may be composite. For example, take the first six primes:

$$2\cdot3\cdot5\cdot7\cdot11\cdot13+1=30031=59\times509.$$

$30031$ is not prime, but its prime factors $59$ and $509$ are both outside the original list. The proof needs only "a new prime factor outside the list exists", not that $N$ itself is prime.

Comment: this is the model of "contradiction plus construction". It also shows: to refute a finite list of primes, it suffices to build one number that the list cannot explain.

### Example 3 (Advanced: a necessary condition for Mersenne numbers)

Problem: let $n$ be a positive integer. Prove that if $2^n-1$ is prime then $n$ is prime. Also test whether $2^{11}-1$ is prime for $n=11$, showing that the converse fails.

Approach: use the factorization identity $x^k-1=(x-1)(x^{k-1}+x^{k-2}+\cdots+1)$.

Solution: suppose $n$ is not prime. If $n=1$, then $2^1-1=1$ is not prime. If $n$ is composite, write $n=ab$ with $a>1$, $b>1$. Put $x=2^a$; then

$$2^n-1=(2^a)^b-1=(2^a-1)\left(2^{a(b-1)}+2^{a(b-2)}+\cdots+1\right).$$

Both factors are integers greater than $1$: in the first, $2^a\ge4$, so $2^a-1\ge3$; the second has at least $b\ge2$ positive terms, so it exceeds $1$. Thus $2^n-1$ is composite, contradicting the assumption. Hence $n$ must be prime.

Now compute $n=11$:

$$2^{11}-1=2048-1=2047.$$

Trial division reveals

$$2047=23\times89.$$

Check: $23\times89=23\times(90-1)=2070-23=2047$. So $2^{11}-1$ is composite.

Comment: the trap here is confusing necessary and sufficient conditions. $n$ being prime is only necessary for $2^n-1$ to be prime, not sufficient. For $n=2,3,5,7$ the values $3,7,31,127$ are all prime, which easily misleads one into believing the converse; $n=11$ shatters that illusion at once. Primes of the form $2^n-1$ are called Mersenne primes, and finding them remains a hot topic in computational number theory.

## 6. Common Mistakes and Pitfalls

- Mistake: treating $1$ as prime. Correction: $1$ would destroy unique factorization, and by definition it is not prime. Always check "is it greater than $1$" first.
- Mistake: thinking $2$ is not prime because it is even. Correction: the only divisors of $2$ are $1,2$, so it is prime, and it is the only even prime.
- Mistake: saying "$0$ is divisible by everything, so $0$ is special". Correction: $a\mid0$ holds for $a\neq0$, but $0\mid b$ is meaningless; do not conflate "being divided" with "serving as divisor".
- Mistake: in a primality test, dividing up to $n/2$ or even $n-1$. Correction: only up to $\sqrt{n}$ is needed, because divisors come in pairs.
- Mistake: reading $a\mid b$ as "$b$ divides $a$". Correction: $a\mid b$ means $a$ divides $b$, i.e. $b/a$ is an integer, and $a$ is the smaller "part".
- Mistake: believing $2^n-1$ is prime if and only if $n$ is prime. Correction: only "$2^n-1$ prime implies $n$ prime" holds; $n=11$ is a counterexample.
- Mistake: stopping a factorization at something that "looks indivisible". Correction: factor until every factor is prime—e.g. $84=2\times42$ must be split further into $2^2\times3\times7$.

## 7. Summary and Mnemonic

Key points reviewed:

- $a\mid b$ means there is an integer $q$ with $b=aq$, where $a\neq0$;
- a prime is an integer greater than $1$ whose only positive divisors are $1$ and itself; neither $1$ nor $0$ counts;
- division with remainder gives a unique quotient and remainder, the starting point of congruence theory;
- Fundamental Theorem of Arithmetic: $n>1$ has a unique prime factorization, up to order;
- number of divisors $d(n)=\prod(e_i+1)$, obtained by choosing exponents independently;
- there are infinitely many primes, with density about $1/\ln x$, yet gaps can be arbitrarily large;
- $2^n-1$ prime implies $n$ prime, but not conversely.

Mnemonic: **"Zero remainder is what divisibility means; atoms above one are the primes; factorization unique up to order; try dividing to the square root and no further."**`,
    relatedProblemIds: [],
  },
  'gcd-bezout': {
    chapter: 'Chapter 2 Greatest Common Divisor',
    title: 'Greatest Common Divisor, Bézout’s Identity and the Euclidean Algorithm',
    summary:
      'Starting from tiling a floor and measuring water, we explain why the gcd can be written as an integer combination, and why repeated division works.',
    keyPoints: [
      'gcd is the largest common divisor, with the convention gcd(a,0)=|a|',
      'The Euclidean algorithm rests on gcd(a,b)=gcd(b,a mod b)',
      'Bézout: there exist integers x,y with ax+by=gcd(a,b)',
      'The linear equation ax+by=c is solvable if and only if gcd(a,b)|c',
      'General solution = particular solution + homogeneous solution, with step divided by the gcd',
    ],
    content: String.raw`

A renovator wants to tile a $24$ dm by $36$ dm room with square tiles, without cutting, using the largest possible tiles. The answer is to cut the room into large squares of side $12$ dm: $24=2\times12$, $36=3\times12$, two across and three down, exactly covering the floor. $12$ is the greatest common divisor of $24$ and $36$: it "measures" both numbers exactly and is the longest such ruler.

Now a kitchen problem: with only a $6$-litre jug and a $10$-litre jug, neither graduated, can you measure out $2$ litres? Can you measure $1$ litre? The first is possible: fill the $6$-litre jug and pour it into the $10$-litre jug, then fill the $6$-litre jug again and top up the $10$-litre jug (only $4$ litres go in), leaving $2$ litres in the $6$-litre jug. The second is impossible no matter how you pour.

Both problems share the same underlying structure: all integer combinations

$$6x+10y\qquad(x,y\in\mathbb{Z})$$

are exactly the multiples of $2$, that is, the multiples of $\gcd(6,10)=2$. Pouring can only produce such numbers, so $1$ litre can never appear. This law—"combinations only reach multiples of the gcd"—is precisely the content of Bézout's identity.

Motivating question: why can the greatest common divisor be written in the form $ax+by$? And how are the coefficients $x,y$ actually computed?

## 2. Rigorous Definitions

**Definition (greatest common divisor)**. Let $a,b$ be integers, not both zero. If a positive integer $d$ satisfies (i) $d\mid a$ and $d\mid b$; (ii) every positive integer $c$ dividing both $a$ and $b$ satisfies $c\le d$, then $d$ is called the greatest common divisor of $a$ and $b$, written $d=\gcd(a,b)$.

Condition (i) says $d$ is a common divisor; condition (ii) says it is the largest of them. Together, "greatest" means largest in size, not maximal in the divisibility partial order.

**Definition (coprime)**. If $\gcd(a,b)=1$, then $a$ and $b$ are called coprime.

Coprime does not require either to be prime: $8$ and $9$ are coprime, and so are $14$ and $15$. Coprimality only cares about "having no brick in common".

**Definition (least common multiple)**. The least positive integer that is a multiple of both $a$ and $b$, written $\operatorname{lcm}(a,b)$.

**Theorem (Bézout's identity)**. For any integers $a,b$ not both zero, there exist integers $x,y$ such that

$$ax+by=\gcd(a,b).$$

Conversely, the least positive integer in the set $\{ax+by:x,y\in\mathbb{Z}\}$ is exactly $\gcd(a,b)$.

**Corollary**. $a,b$ are coprime if and only if there exist integers $x,y$ with $ax+by=1$.

**Algorithm (Euclidean algorithm)**. Let $a\ge b>0$ and perform division with remainder repeatedly:

$$a=q_1b+r_1,\quad b=q_2r_1+r_2,\quad r_1=q_3r_2+r_3,\ \dots$$

until some remainder is $0$. The last nonzero remainder is $\gcd(a,b)$.

**Algorithm (extended Euclidean algorithm)**. At each step record the coefficients $(s_i,t_i)$ in $r_i=s_ia+t_ib$; the last nonzero remainder yields the Bézout coefficients.

**Theorem**. For positive integers $a,b$,

$$\gcd(a,b)\cdot\operatorname{lcm}(a,b)=ab.$$

## 3. Why Define It This Way

**Why "greatest" rather than "any common divisor"?** There can be many common divisors, but all of them are "generated" by the greatest one: the common divisors of $a,b$ are exactly the divisors of $\gcd(a,b)$. So capturing the greatest captures them all. This is also why the gcd is uniquely determined: for two positive integers there is no ambiguity about which is larger.

**Why the convention $\gcd(a,0)=|a|$?** Because every integer divides $0$, so the common divisors of $a$ and $0$ are all the divisors of $a$, the largest being $|a|$. This convention lets the terminating step of the Euclidean algorithm fit in naturally: the last nonzero remainder is exactly the answer.

**Why is $\gcd(a,b)=\gcd(b,a-qb)$?** The key observation is that $a$ and $b$ have exactly the same common divisors as $b$ and $a-qb$. If $d\mid a$ and $d\mid b$, then $d\mid(a-qb)$; conversely if $d\mid b$ and $d\mid(a-qb)$, then $d$ divides $(a-qb)+qb=a$. The two sets of common divisors coincide, so of course their maxima do. Each step uses this identity to make the numbers smaller—that is the legitimacy of the Euclidean algorithm.

**Why does Bézout's identity hold?** Consider the set of all integer combinations

$$S=\{ax+by:x,y\in\mathbb{Z}\}.$$

$S$ is closed under addition and subtraction (the sum or difference of two combinations is again a combination). Take the least positive integer $d$ in $S$. Divide $a$ by $d$: $a=qd+r$, $0\le r<d$, so

$$r=a-qd=a-q(ax_0+by_0)=a(1-qx_0)+b(-qy_0)\in S.$$

If $r>0$, this contradicts the minimality of $d$, so $r=0$, i.e. $d\mid a$. Similarly $d\mid b$, so $d$ is a common divisor and $d\le\gcd(a,b)$. On the other hand $\gcd(a,b)$ divides $a$ and $b$, hence divides every combination $ax+by$, in particular $d$, so $\gcd(a,b)\le d$. Squeezing from both sides, $d=\gcd(a,b)$.

**Why must the Bézout coefficients be integers, and why may they not be restricted to be nonnegative?** If $x,y\ge0$ were required, $6x+10y$ could only take $0,6,10,12,16,\dots$, among which $2$ does not appear, and Bézout's identity would fail at once. Allowing negative coefficients is equivalent to allowing "pouring out"—emptying a jug—which is exactly the key move in the water-measuring problem. So the power of Bézout's identity comes from the integers being closed under subtraction.

**Counterexample: do common divisors always exist?** In the integers they do, because the set of common divisors is finite and contains $1$. But in a general number ring "greatest" may be meaningless (there is no order), and one must restate things in the language of ideals. This reminds us that the definition of gcd depends on the order structure of the integers.

## 4. Intuition and Pictures

**Geometric picture: measuring a long ruler with a short one.** Think of $a,b$ as two segments. Each time, measure the longer with the shorter; after a whole number of steps a small piece is left, which is then used to measure the shorter one, and so on. The "shortest ruler" that finally measures all segments exactly is $\gcd$. The tiling problem is its two-dimensional version.

**Lattice picture: integer points on a line.** Integer solutions of $ax+by=c$ correspond to lattice points on the line $ax+by=c$. Bézout's identity says the line passes through a lattice point if and only if $\gcd(a,b)\mid c$. Moreover, once there is one lattice point, all of them are equally spaced, with spacing vector $(b/d,-a/d)$ where $d=\gcd(a,b)$.

| Concept | In one sentence | Example |
|---|---|---|
| $\gcd(a,b)$ | the longest common ruler | $\gcd(24,36)=12$ |
| $\operatorname{lcm}(a,b)$ | the shortest common multiple | $\operatorname{lcm}(24,36)=72$ |
| coprime | no common ruler except $1$ | $\gcd(8,9)=1$ |
| Bézout identity | the common ruler can be built from both | $24\cdot2+36\cdot(-1)=12$ |

Check the last row: $48-36=12$, indeed.

> Intuition: $\gcd$ is the "common minimal step". On the number line, starting from $0$ and moving by steps of $a$ or $b$ (backwards allowed), the positions reachable exactly are precisely the integer multiples of $\gcd$.

**Why is $\gcd\cdot\operatorname{lcm}=ab$?** Write $a=\prod p^{e_p}$ and $b=\prod p^{f_p}$. The gcd takes $\min(e_p,f_p)$ at each prime factor, the lcm takes $\max(e_p,f_p)$, and $\min+\max=e+f$. Multiplying term by term gives the identity. The formula holds only for two numbers. For three numbers the gcd takes the minimum exponent, the lcm the maximum, and the middle exponent is lost, so the product is generally smaller than $abc$. For $2,4,8$: $\gcd=2$, $\operatorname{lcm}=8$, product $16$, while $abc=64$.

## 5. Worked Examples

### Example 1 (Basic: repeated division and back-substitution)

Problem: find $\gcd(1071,462)$ and integers $x,y$ with $1071x+462y=21$.

Approach: first compute the gcd by repeated division, then back-substitute from the penultimate line upward.

Solution: division with remainder:

$$1071=2\times462+147,$$

$$462=3\times147+21,$$

$$147=7\times21+0.$$

The last nonzero remainder is $21$, so $\gcd(1071,462)=21$.

Back-substitute: from the second line,

$$21=462-3\times147.$$

From the first line, $147=1071-2\times462$; substituting,

$$21=462-3(1071-2\times462)=462-3\times1071+6\times462=7\times462-3\times1071.$$

So take $x=-3$, $y=7$. Check: $1071\times(-3)+462\times7=-3213+3234=21$, correct.

Comment: at each back-substitution step just replace the remainder by a difference from the previous line; signs are easily lost, so always substitute back into the original equation.

### Example 2 (Intermediate: linear Diophantine equation)

Problem: find all integer solutions of $259x+111y=37$.

Approach: compute $\gcd(259,111)$ to test solvability; divide out the common factor, find a particular solution, then add the general homogeneous solution.

Solution: repeated division:

$$259=2\times111+37,\qquad 111=3\times37+0.$$

So $\gcd(259,111)=37$. Since $37\mid37$, the equation is solvable. Divide both sides by $37$:

$$7x+3y=1.$$

A particular solution: $7=2\times3+1$, i.e. $1=7-2\times3$. So $x_0=1$, $y_0=-2$ is one solution.

Next the general solution of the homogeneous equation $7x+3y=0$. Since $\gcd(7,3)=1$, $7x=-3y$ forces $3\mid x$; write $x=3t$, then $y=-7t$. Hence all integer solutions are

$$x=1+3t,\qquad y=-2-7t,\qquad t\in\mathbb{Z}.$$

Check: $259(1+3t)+111(-2-7t)=(259-222)+(777-777)t=37$ for every $t$.

Comment: the general solution is a particular solution plus the homogeneous one. The step of the homogeneous solution is $(b/d,-a/d)$ with $d=\gcd(a,b)$—the most commonly misremembered point: it is not $(b,a)$; the $d$ must be divided out.

### Example 3 (Advanced: the water-measuring problem and invariants)

Problem: with only $6$-litre and $10$-litre unmarked jugs, allowing filling, emptying and pouring between them, prove that $2$ litres can be measured but $1$ litre never can.

Approach: for "can", give a construction; for "cannot", use an invariant—show that at every moment both amounts are even.

Solution: first construct $2$ litres.

1. Fill the $6$-litre jug and pour it all into the $10$-litre jug. The $10$-litre jug now holds $6$ litres.
2. Fill the $6$-litre jug again and pour into the $10$-litre jug until it is full. The $10$-litre jug needs $4$ more litres, so $2$ litres remain in the $6$-litre jug.

The $6$-litre jug now holds $2$ litres; done.

Now prove $1$ litre is impossible. Let the amounts at some moment be $(u,v)$; claim both are multiples of $2$. Initially $(0,0)$ satisfies this. The three operations preserve the property:

- Filling a jug: $6$ and $10$ are both multiples of $2$;
- Emptying a jug: it becomes $0$, still a multiple of $2$;
- Pouring between jugs: if $t$ litres go from the $6$-litre to the $10$-litre jug, then $u$ decreases by $t$ and $v$ increases by $t$. Here $t$ either equals $u$ (emptying), or makes the $10$-litre jug exactly full, i.e. $t=10-v$. In the former case $u,v$ stay even; in the latter $t=10-v$ is even minus even, still even, so the new $u-t$ and $v+t$ are still even.

By induction, both amounts are even at all times. So some jug can never hold exactly $1$ litre. Since the total is conserved, if one jug held $1$ litre the other would be odd, which is likewise excluded.

Comment: this is the "physical version of Bézout's identity". The reachable amounts are exactly $\{6x+10y\ge0\}$ ($x,y$ integers), that is, all nonnegative even numbers, and $1$ is not among them. The construction proves "can", the invariant proves "cannot"; both hands must be firm. With $6$- and $9$-litre jugs, $\gcd=3$, only multiples of $3$ are reachable and even $2$ litres would be impossible.

## 6. Common Mistakes and Pitfalls

- Mistake: treating $\gcd(0,0)=0$ as a theorem. Correction: the common divisors of $0$ and $0$ are unbounded, so $\gcd(0,0)$ is only a convention (programming libraries mostly return $0$); the original definition requires $a,b$ not both zero.
- Mistake: using negative remainders in repeated division, causing sign chaos. Correction: always take nonnegative remainders $0\le r<b$, and take absolute values at the end.
- Mistake: writing the general solution as $x=x_0+bt,\ y=y_0-at$. Correction: divide by $d=\gcd(a,b)$, writing $x=x_0+(b/d)t,\ y=y_0-(a/d)t$; otherwise solutions are lost.
- Mistake: thinking coprime implies one of them is prime. Correction: $8$ and $9$, and $14$ and $15$, are coprime and neither is prime.
- Mistake: from $a\mid bc$ and $\gcd(a,b)=1$ concluding "$a\mid c$ is obvious". Correction: this is exactly Euclid's lemma and needs Bézout: from $ax+by=1$ multiply by $c$ to get $acx+bcy=c$, and both terms on the left are divisible by $a$.
- Mistake: extending $\gcd\cdot\operatorname{lcm}=ab$ to three numbers. Correction: for three numbers the product generally differs from $abc$; e.g. $2,4,8$ gives $2\times8=16$ while $abc=64$.

## 7. Summary and Mnemonic

Key points reviewed:

- $\gcd(a,b)$ is the greatest common divisor, with the convention $\gcd(a,0)=|a|$;
- the Euclidean algorithm shrinks the problem via $\gcd(a,b)=\gcd(b,a\bmod b)$;
- Bézout: $ax+by=\gcd(a,b)$ always has integer solutions, and they can be constructed;
- coprimality is equivalent to the existence of $x,y$ with $ax+by=1$;
- the linear equation $ax+by=c$ is solvable if and only if $\gcd(a,b)\mid c$, and its general solution is a particular solution plus the homogeneous one;
- $\gcd\cdot\operatorname{lcm}=ab$, valid only for two positive numbers.

Mnemonic: **"Divide the large by the small, bring the remainder down; stop at zero, the last nonzero is the common factor; substitute back for integer coefficients, with Bézout as guarantor."**`,
    relatedProblemIds: [],
  },
  'congruences': {
    chapter: 'Chapter 3 Congruences',
    title: 'Congruence Theory and the Chinese Remainder Theorem',
    summary:
      'Abstracting the "counting in circles" of clocks and calendars into congruences, we explain clearly when division is allowed, when solutions exist, and how the Chinese Remainder Theorem is constructed.',
    keyPoints: [
      'a≡b (mod m) is defined by m|(a-b), equivalently equal remainders',
      'Congruences are closed under addition, subtraction and multiplication; division requires coprimality with the modulus',
      'ax≡b (mod m) is solvable iff gcd(a,m)|b, and then there are gcd(a,m) solutions',
      'Chinese Remainder Theorem: the solution is unique when the moduli are pairwise coprime',
      'Both Fermat’s little theorem and Euler’s theorem require the base to be coprime to the modulus',
    ],
    content: String.raw`

A clock on the wall shows $10$ o'clock; five hours later it shows $3$, not $15$. The face has only $12$ marks, so after $12$ we return to $0$. This "counting in circles" is congruence: we care only about the remainder on division by $12$, not how many turns were made.

Calendars are the same. Today is Wednesday; ten days later is Saturday, because $10$ and $3$ are congruent mod $7$. Hash tables, circular buffers and checksums in computers are all the same thing underneath.

Ancient China had a famous problem, the "unknown number of objects" in the *Sunzi Suanjing*: there is a quantity, counted in threes it leaves $2$, counted in fives it leaves $3$, counted in sevens it leaves $2$—what is it? In modern language we seek $x$ with

$$x\equiv2\pmod3,\qquad x\equiv3\pmod5,\qquad x\equiv2\pmod7.$$

The answer is $23$ (unique mod $105$). Problems of this kind—assembling one number from several remainder conditions—are solved systematically by the Chinese Remainder Theorem, the protagonist of this section.

Motivating question: why can several remainder conditions determine a number uniquely? And if the moduli are not coprime, can they still be combined?

## 2. Rigorous Definitions

**Definition (congruence)**. Let $m$ be a positive integer and $a,b\in\mathbb{Z}$. If $m\mid(a-b)$, then $a$ and $b$ are called congruent modulo $m$, written

$$a\equiv b\pmod m.$$

Otherwise they are incongruent, written $a\not\equiv b\pmod m$.

Equivalent formulation: $a$ and $b$ leave the same remainder on division by $m$. The two formulations agree because $a-b=(q_a-q_b)m+(r_a-r_b)$ with $|r_a-r_b|<m$, so $m\mid(a-b)$ if and only if $r_a=r_b$.

**Theorem (congruence is an equivalence relation)**. Congruence is reflexive, symmetric and transitive, hence partitions the integers into residue classes. The class containing $a$ is written $[a]_m$, and the set of all classes is written $\mathbb{Z}/m\mathbb{Z}$, with $m$ elements.

**An important warning: $\mathbb{Z}/m\mathbb{Z}$ is generally not an integral domain.** Modulo $6$, $2\cdot3=6\equiv0$: two nonzero elements multiply to zero. Such elements are called zero divisors. Their existence is the algebraic root of "you may not cancel at will": cancelling $2$ from $2\cdot3\equiv2\cdot0$ would give $3\equiv0$, absurd. Only when $m$ is prime does $\mathbb{Z}/m\mathbb{Z}$ have no zero divisors, every nonzero element being invertible, so that it becomes a field. This also explains why Fermat's little theorem holds only for prime moduli.

**Theorem (arithmetic properties of congruences)**. If $a\equiv b\pmod m$ and $c\equiv d\pmod m$, then

$$a\pm c\equiv b\pm d\pmod m,\qquad ac\equiv bd\pmod m.$$

That is, addition, subtraction and multiplication of residue classes are well defined, and $\mathbb{Z}/m\mathbb{Z}$ forms a ring.

**Definition (complete and reduced residue systems)**. Choosing one representative from each residue class gives $m$ numbers, a complete residue system, e.g. $0,1,\dots,m-1$. Choosing representatives only from the classes coprime to $m$ gives $\varphi(m)$ numbers, a reduced residue system. The function $\varphi$ is Euler's totient.

**Theorem (linear congruences)**. Let $d=\gcd(a,m)$. The equation

$$ax\equiv b\pmod m$$

is solvable if and only if $d\mid b$; when solvable, it has exactly $d$ solutions modulo $m$.

**Theorem (Chinese Remainder Theorem)**. Let $m_1,\dots,m_k$ be pairwise coprime and $M=m_1\cdots m_k$. Then the system

$$x\equiv a_1\pmod{m_1},\ \dots,\ x\equiv a_k\pmod{m_k}$$

has a unique solution modulo $M$.

**Theorem (Fermat's little theorem)**. If $p$ is prime and $p\nmid a$, then

$$a^{p-1}\equiv1\pmod p.$$

**Theorem (Euler's theorem)**. If $\gcd(a,m)=1$, then $a^{\varphi(m)}\equiv1\pmod m$.

## 3. Why Define It This Way

**Why use $m\mid(a-b)$ instead of "equal remainders"?** Because the former does not require proving uniqueness of division with remainder first, and does not depend on the signs of $a,b$. For $a=-1$, $b=11$, $m=12$ we have $-1\equiv11\pmod{12}$—the same position on the clock face—which is immediate from $12\mid(-12)$, whereas "remainders" would first require a convention for negative remainders. A definition relying on fewer auxiliary concepts is cleaner.

**Why can congruences be added and multiplied but not divided at will?** The legality of addition and multiplication comes from $m\mid(a-b)$ and $m\mid(c-d)$ implying $m\mid(ac-bd)$:

$$ac-bd=a(c-d)+d(a-b).$$

Both terms on the right are divisible by $m$. Division fails: $2\cdot1\equiv2\cdot3\pmod4$, but cancelling $2$ gives $1\equiv3\pmod4$, absurd. The reason is that $2$ is not coprime to the modulus $4$, so $2$ is not invertible in $\mathbb{Z}/4\mathbb{Z}$.

The correct rule is: if $ac\equiv bc\pmod m$ and $\gcd(c,m)=1$, then $a\equiv b\pmod m$. In general one can cancel only $\gcd(c,m)$, dividing the modulus at the same time:

$$ac\equiv bc\pmod m\ \Longrightarrow\ a\equiv b\pmod{m/\gcd(c,m)}.$$

**Why does a linear congruence require $d\mid b$?** The left side $ax$ is always a multiple of $d=\gcd(a,m)$, and $ax\equiv b$ means $b=ax+km$, also a multiple of $d$. This necessary condition is also sufficient, since Bézout gives $ax_0+my_0=d$, and multiplying by $b/d$ yields a solution.

**Why does the CRT require pairwise coprime moduli?** Because otherwise the conditions may contradict each other. For example

$$x\equiv0\pmod4,\qquad x\equiv1\pmod6.$$

The first requires $x$ even, the second requires $x$ odd ($1$ mod $6$ is odd), so there is no solution. More generally, $x\equiv a\pmod m$ and $x\equiv b\pmod n$ have a common solution if and only if $a\equiv b\pmod{\gcd(m,n)}$. When coprime, $\gcd=1$ and the condition is automatic.

**Counterexample: non-coprime yet compatible.** $x\equiv1\pmod4$ and $x\equiv3\pmod6$: $\gcd(4,6)=2$ and $1\equiv3\pmod2$, so they are compatible, with solution $x\equiv7\pmod{12}$. So "not coprime" does not mean "no solution"; it only means the uniqueness conclusion cannot be applied directly.

## 4. Intuition and Pictures

**The clock model.** Modulo $12$ the world is a ring with $12$ marks joined end to end. Addition is walking along the ring; multiplication is repeatedly walking the same arc. The general case modulo $m$ is a ring of $m$ marks.

**Geometry of solutions: equally spaced lattice points.** View $ax\equiv b\pmod m$ as integer points on the line $ax-b=my$. If $d=\gcd(a,m)$ divides $b$, there are $d$ solutions, equally spaced between $0$ and $m-1$ with spacing $m/d$. For $6x\equiv4\pmod{10}$: $d=2$, and reducing gives $3x\equiv2\pmod5$, i.e. $x\equiv4\pmod5$; the two solutions are $x\equiv4$ and $x\equiv9\pmod{10}$, with spacing exactly $5$. Check: $6\cdot4=24\equiv4$, $6\cdot9=54\equiv4$. This turns "the number of solutions" from an abstract formula into points you can count.

**The running-track model.** Two runners lap with periods $4$ seconds and $6$ seconds; their relative phases are described by congruences: since $\gcd(4,6)=2$, only $2$ relative phases can be synchronized, not all $24$ combinations.

| Concept | Clock analogy |
|---|---|
| $a\equiv b\pmod{12}$ | the hand points to the same mark |
| residue class $[a]_{12}$ | all times pointing to that mark |
| complete residue system | one time chosen from each of the $12$ marks |
| reduced residue system | only marks coprime to $12$, i.e. $1,5,7,11$ |
| modular inverse | the step that walks back to $1$ |

> Intuition: a congruence looks only at the remainder, not the number of turns. Every conclusion about divisibility can be translated into a problem of walking around a ring.

**Why is $\varphi(12)=4$?** Among $1$ to $12$, only $1,5,7,11$ are coprime to $12$. The general formula: if $m=p_1^{e_1}\cdots p_k^{e_k}$, then

$$\varphi(m)=m\prod_{i=1}^{k}\left(1-\frac{1}{p_i}\right).$$

For $m=12=2^2\cdot3$: $\varphi(12)=12(1-\frac12)(1-\frac13)=12\cdot\frac12\cdot\frac23=4$, matching.

## 5. Worked Examples

### Example 1 (Basic: solving linear congruences)

Problem: solve $3x\equiv5\pmod7$; then decide whether $6x\equiv4\pmod9$ is solvable.

Approach: for the first, $\gcd(3,7)=1$, so find the modular inverse of $3$; for the second use the criterion $d\mid b$.

Solution: first $3x\equiv5\pmod7$. Try multiples of $3$: $3,6,2,5$; the fourth is $5$, so $3\times4=12\equiv5\pmod7$ and $x\equiv4$ is a solution. Since $\gcd(3,7)=1$ the solution is unique, and all solutions are

$$x\equiv4\pmod7.$$

Alternatively find the inverse first: $3\times5=15\equiv1\pmod7$, so $3^{-1}\equiv5$; multiplying by $5$ gives $x\equiv25\equiv4\pmod7$, consistent.

Next $6x\equiv4\pmod9$. $d=\gcd(6,9)=3$, but $3\nmid4$, so there is no solution. Intuitive check: $6x$ is always a multiple of $3$, and remains a multiple of $3$ mod $9$ (since $9$ is also a multiple of $3$), so it cannot equal $4$.

Comment: the first step in solving a linear congruence is always to compute $d=\gcd(a,m)$, which decides both "whether there is a solution" and "how many".

### Example 2 (Intermediate: the Chinese Remainder Theorem)

Problem: solve the system

$$x\equiv2\pmod3,\qquad x\equiv3\pmod5,\qquad x\equiv2\pmod7.$$

Approach: the three moduli are pairwise coprime, $M=105$; use the constructive method.

Solution: $M=3\times5\times7=105$. Let

$$M_1=\frac{M}{3}=35,\qquad M_2=\frac{M}{5}=21,\qquad M_3=\frac{M}{7}=15.$$

Find the inverses of $M_i$ modulo $m_i$:

- $35\equiv2\pmod3$; the inverse of $2$ is $2$ (since $2\times2=4\equiv1$), so $y_1=2$;
- $21\equiv1\pmod5$; the inverse of $1$ is $1$, so $y_2=1$;
- $15\equiv1\pmod7$; the inverse of $1$ is $1$, so $y_3=1$.

Hence

$$x\equiv a_1M_1y_1+a_2M_2y_2+a_3M_3y_3=2\cdot35\cdot2+3\cdot21\cdot1+2\cdot15\cdot1.$$

Term by term: $2\cdot35\cdot2=140$, $3\cdot21=63$, $2\cdot15=30$, total

$$x\equiv140+63+30=233\equiv233-2\cdot105=23\pmod{105}.$$

Check: $23=3\times7+2$; $23=5\times4+3$; $23=7\times3+2$. All three conditions hold.

Comment: the essence of the construction is "let each term contribute to exactly one modulus and be zero for the others". $M_1y_1$ equals $1$ mod $3$ and $0$ mod $5$ and $7$—a unit impulse.

If the moduli are not coprime, the formula for merging two congruences is: let $d=\gcd(m_1,m_2)$ and $d\mid(a_2-a_1)$, put $x=a_1+m_1t$; the condition becomes $(m_1/d)t\equiv(a_2-a_1)/d\pmod{m_2/d}$. Since $m_1/d$ and $m_2/d$ are coprime, we can invert to get a unique $t$ mod $m_2/d$, and finally $x\equiv a_1+m_1t_0\pmod{\operatorname{lcm}(m_1,m_2)}$. Periodic task scheduling in engineering often uses this formula, since periods need not be coprime.

### Example 3 (Advanced: large exponents and the non-coprime trap)

Problem: compute $2^{100}\bmod13$ and $2^{100}\bmod8$.

Approach: in the first, the modulus is prime and does not divide the base, so Fermat's little theorem reduces the exponent; in the second the base and modulus are not coprime, Euler's theorem fails, and one must observe directly.

Solution: first $2^{100}\bmod13$. $13$ is prime and $\gcd(2,13)=1$, so Fermat's little theorem gives

$$2^{12}\equiv1\pmod{13}.$$

Group the exponent by $12$: $100=8\times12+4$, hence

$$2^{100}=(2^{12})^8\cdot2^4\equiv1^8\cdot16\equiv3\pmod{13}.$$

The answer is $3$.

Next $2^{100}\bmod8$. Note $2^3=8\equiv0\pmod8$, so as long as the exponent is at least $3$, $2^n$ is a multiple of $8$:

$$2^{100}=2^3\cdot2^{97}\equiv0\cdot2^{97}\equiv0\pmod8.$$

The answer is $0$.

Comment: the trap is in the second part. $\varphi(8)=4$, so blindly applying Euler's theorem would give $2^{100}\equiv2^{0}=1$, wildly wrong. Euler's theorem requires $\gcd(a,m)=1$, and here $\gcd(2,8)=2$, so the hypothesis fails. When base and modulus share a factor, the right move is to pull out the common factor or to observe when a power becomes divisible by the modulus.

## 6. Common Mistakes and Pitfalls

- Mistake: cancelling a common factor from both sides of a congruence at will. Correction: cancel directly only when the factor is coprime to the modulus; otherwise divide the modulus by the gcd too, e.g. $4\equiv10\pmod6$ cancelling $2$ gives $2\equiv5\pmod3$.
- Mistake: writing $a\equiv b\pmod m$ as $a=b$. Correction: congruence is an equivalence relation, not equality; $23\equiv2\pmod7$ but $23\neq2$.
- Mistake: applying the CRT formula without checking coprimality. Correction: first verify pairwise coprimality; when not coprime, test compatibility via $a\equiv b\pmod{\gcd(m,n)}$, then merge.
- Mistake: omitting a prime factor when computing $\varphi(n)$. Correction: $\varphi(n)=n\prod(1-1/p)$, the product running over distinct prime factors only; exponents do not affect it.
- Mistake: believing $a\equiv b\pmod m$ implies $a^k\equiv b^k\pmod{m^k}$. Correction: only modulo $m$ follows; powers do not raise the modulus.
- Mistake: mishandling negative remainders. Correction: always reduce remainders to $0\le r<m$; e.g. $-1\bmod7=6$, not $-1$.
- Mistake: dividing in modular arithmetic without checking invertibility. Correction: compute the gcd first; only when it equals $1$ may you invert.

## 7. Summary and Mnemonic

Key points reviewed:

- $a\equiv b\pmod m$ is defined by $m\mid(a-b)$, equivalently equal remainders;
- congruences are closed under addition, subtraction and multiplication; division needs $\gcd(c,m)=1$;
- $ax\equiv b\pmod m$ is solvable if and only if $\gcd(a,m)\mid b$, with $\gcd(a,m)$ solutions;
- Chinese Remainder Theorem: when the moduli are pairwise coprime, the remainder conditions determine a unique residue class modulo $M$;
- Fermat's little theorem and Euler's theorem both require base coprime to modulus;
- when they are not coprime, extract the common factor or observe directly; do not force the formulas.

Mnemonic: **"Congruence means the difference is divisible; add, subtract, multiply freely; before cancelling ask about coprimality; group the remainders and seek China."**`,
    relatedProblemIds: [],
  },
  'primitive-roots': {
    chapter: 'Chapter 4 Primitive Roots and Indices',
    title: 'Primitive Roots, Indices and Order',
    summary:
      'Explaining order and primitive roots as "generators on a clock face", we answer which moduli have primitive roots and bring discrete logarithms into cryptography.',
    keyPoints: [
      'The order ord_n(a) is the least positive integer with a^k≡1, and it divides φ(n)',
      'A primitive root has order φ(n); its powers run through the reduced residue system',
      'A primitive root exists if and only if n=1,2,4,p^k,2p^k',
      'There are φ(φ(n)) primitive roots; g^k is one iff gcd(k,φ(n))=1',
      'Indices turn multiplication into addition modulo φ(n)',
    ],
    content: String.raw`

Modulo $7$ the nonzero elements are $1,2,3,4,5,6$. Take $3$ and keep multiplying:

$$3^1=3,\quad3^2=2,\quad3^3=6,\quad3^4=4,\quad3^5=5,\quad3^6=1.$$

The six results visit $1$ through $6$ exactly once and return to $1$. Like a key, $3$ strings the whole multiplicative group into a single chain. Such an element is called a primitive root.

Try $2$ instead: $2,4,1,2,4,1,\dots$, which cycles after only $3$ elements and never covers the whole set. The order of $2$ is $3$, and the order of $3$ is $6$.

Order measures "how long until we return to $1$", while a primitive root is "returning to $1$ only after visiting everyone else". This is more than a curiosity: Diffie–Hellman key exchange, ElGamal encryption and the discrete logarithm problem all rest on "powers of a primitive root represent every nonzero element". Recovering $x$ from $g^x\equiv a$—computing a discrete logarithm—is believed to be extremely hard for suitable parameters, and that is the security foundation of cryptography.

Primitive roots are also the basis of "discrete logarithms". Ordinary logarithms turn multiplication into addition; discrete logarithms do the same, only on a finite cyclic group. With them, power equations such as $x^k\equiv a$ become the linear congruence $k\cdot\operatorname{ind}_g(x)\equiv\operatorname{ind}_g(a)\pmod{\varphi(n)}$, which takes only one modular inversion to solve. The price is that computing $\operatorname{ind}_g$ is itself hard—exactly the "one-wayness" cryptography wants.

Motivating question: which moduli have primitive roots? Why does modulus $8$ have none?

## 2. Rigorous Definitions

**Definition (order)**. Let $n\ge1$ and $\gcd(a,n)=1$. The least positive integer $k$ such that

$$a^k\equiv1\pmod n$$

is called the order of $a$ modulo $n$, written $\operatorname{ord}_n(a)$.

**Theorem (basic properties of order)**.

1. $\operatorname{ord}_n(a)$ exists and divides $\varphi(n)$;
2. $a^k\equiv1\pmod n$ if and only if $\operatorname{ord}_n(a)\mid k$;
3. $\operatorname{ord}_n(a^m)=\dfrac{\operatorname{ord}_n(a)}{\gcd(m,\operatorname{ord}_n(a))}$.

**Definition (primitive root)**. If $\operatorname{ord}_n(g)=\varphi(n)$, then $g$ is a primitive root modulo $n$.

Equivalently, $g^0,g^1,\dots,g^{\varphi(n)-1}$ run exactly through the reduced residue system modulo $n$. In other words, the cyclic group generated by $g$ is the entire multiplicative group.

**Theorem (existence of primitive roots)**. A primitive root modulo $n$ exists if and only if

$$n=1,2,4,p^k,2p^k,$$

where $p$ is an odd prime and $k\ge1$.

**Theorem (number of primitive roots)**. If a primitive root modulo $n$ exists, there are $\varphi(\varphi(n))$ of them.

**Theorem (primitive roots and powers)**. Let $g$ be a primitive root modulo $n$. Then $g^k$ is a primitive root if and only if $\gcd(k,\varphi(n))=1$.

**Definition (index and discrete logarithm)**. Let $g$ be a primitive root modulo $n$ and $\gcd(a,n)=1$. The unique $e\in\{0,1,\dots,\varphi(n)-1\}$ with $g^e\equiv a\pmod n$ is called the index of $a$ to base $g$, written $\operatorname{ind}_g(a)$.

Indices turn multiplication into addition:

$$\operatorname{ind}_g(ab)\equiv\operatorname{ind}_g(a)+\operatorname{ind}_g(b)\pmod{\varphi(n)}.$$

This is exactly where the name "discrete logarithm" comes from.

## 3. Why Define It This Way

**Why require $\gcd(a,n)=1$?** Otherwise the order does not exist at all. Let $d=\gcd(a,n)>1$. If $a^k\equiv1\pmod n$, then $d\mid a^k$, so $d\mid(a^k-1)$; but $d\mid a^k$, hence $d\mid1$, a contradiction. So when they are not coprime the powers of $a$ never return to $1$, but get stuck in an absorbing state, e.g. $2,4,0,0,\dots$ modulo $8$.

**Why must the order divide $\varphi(n)$?** Use division with remainder. Let $k=\operatorname{ord}_n(a)$ and write $\varphi(n)=qk+r$ with $0\le r<k$. By Euler's theorem $a^{\varphi(n)}\equiv1$, and

$$a^{\varphi(n)}=a^{qk+r}=(a^k)^q\cdot a^r\equiv a^r.$$

So $a^r\equiv1$. If $r>0$ this contradicts the minimality of $k$; hence $r=0$, i.e. $k\mid\varphi(n)$. This argument is the classic pairing of "minimality plus division with remainder", worth memorizing.

**Why do not all moduli have primitive roots?** Because the multiplicative group need not be cyclic. The smallest counterexample is $n=8$: the reduced residue system is $\{1,3,5,7\}$ and

$$3^2=9\equiv1,\quad5^2=25\equiv1,\quad7^2=49\equiv1\pmod8.$$

Every element has order at most $2$, while $\varphi(8)=4$, so no element has order $4$ and there is no primitive root. And $n=8$ is precisely absent from the allowed list $1,2,4,p^k,2p^k$.

**Why must a prime modulus have a primitive root?** Because $\mathbb{Z}/p\mathbb{Z}$ is a finite field, so its multiplicative group is a finite abelian group. A finite abelian group is cyclic if for every $d$ the equation $x^d=1$ has at most $d$ solutions. Over a field the polynomial $x^d-1$ has degree $d$ and so at most $d$ roots; the condition holds, hence the unit group is cyclic and a primitive root exists. This explains why prime moduli are so "well behaved", and shows that the failure for composite moduli comes from zero divisors destroying the property "the number of roots does not exceed the degree".

**Why does $n=4$ work but $n=8$ not?** The unit group modulo $4$ is only $\{1,3\}$, and $3$ has order $2=\varphi(4)$, so it works. The unit group modulo $8$ has four elements, but every non-identity element has order $2$, so structurally it is not cyclic. As the power of $2$ grows, the unit group falls apart.

**Why does $g^k$ being a primitive root require $\gcd(k,\varphi(n))=1$?** By the order formula

$$\operatorname{ord}_n(g^k)=\frac{\operatorname{ord}_n(g)}{\gcd(k,\operatorname{ord}_n(g))}=\frac{\varphi(n)}{\gcd(k,\varphi(n))}.$$

For this to equal $\varphi(n)$ we need $\gcd(k,\varphi(n))=1$. Intuitively, if $k$ shares a factor with $\varphi(n)$, then $g^k$ "skips" some elements and never covers the whole set.

**Why do indices turn multiplication into addition?** Because $g^{e_1}g^{e_2}=g^{e_1+e_2}$. An index is the logarithm of a "discrete step", completely analogous to $\ln(ab)=\ln a+\ln b$ for real numbers. The difference is that here indices are taken modulo $\varphi(n)$, since $g^{\varphi(n)}=1$.

## 4. Intuition and Pictures

**Think of the multiplicative group as a ring of seats.** The $\varphi(n)$ seats are arranged in a circle, and $g$ is the move "advance one seat each time". If $g$ is a primitive root it visits every seat in one lap; if $g$ has order $k$ it only circles among its own $k$ seats.

| $n$ | $\varphi(n)$ | Primitive root? | Primitive roots |
|---|---|---|---|
| $7$ | $6$ | yes | $3,5$ |
| $8$ | $4$ | no | none |
| $9$ | $6$ | yes | $2,5$ |
| $10$ | $4$ | yes | $3,7$ |
| $12$ | $4$ | no | none |
| $13$ | $12$ | yes | $2,6,7,11$ |

Check $n=9$: $2^1=2$, $2^2=4$, $2^3=8$, $2^4=7$, $2^5=5$, $2^6=1$; the six values run through $\{1,2,4,5,7,8\}$, so $2$ is a primitive root. The number of primitive roots is $\varphi(6)=2$, the other being $2^5=32\equiv5$.

**How do we find primitive roots in practice?** First factor $\varphi(n)=q_1^{e_1}\cdots q_s^{e_s}$, then test candidates $g$ one by one: it suffices to check $g^{\varphi(n)/q_i}\not\equiv1$ for every prime factor $q_i$, without checking all proper divisors. For $n=17$, $\varphi=16=2^4$, so only $g^{8}\not\equiv1$ must be verified. The candidate $3$ gives $3^8\equiv-1$ and passes at once. This trick reduces the number of tests from $\varphi(n)$ to the number of prime factors, and is the standard way cryptographic libraries generate parameters.

> Intuition: a primitive root is the "generator" of the multiplicative group. With it, multiplicative problems (solving $x^k\equiv a$) translate into linear problems about indices, and the difficulty collapses.

**A "log table" for discrete logarithms.** Base $g=3$ modulo $7$:

| $e$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---|---|---|---|---|---|
| $3^e\bmod7$ | $1$ | $3$ | $2$ | $6$ | $4$ | $5$ |

Looking up the table gives $\operatorname{ind}_3(6)=3$, since $3^3=27\equiv6$. To solve $3^x\equiv6$, the table gives $x\equiv3\pmod6$ immediately.

## 5. Worked Examples

### Example 1 (Basic: computing orders and testing a primitive root)

Problem: compute $\operatorname{ord}_7(2)$ and $\operatorname{ord}_7(3)$, and decide whether $3$ is a primitive root modulo $7$.

Approach: compute powers one by one until $1$ first appears; then compare with $\varphi(7)=6$.

Solution: for $a=2$:

$$2^1=2,\quad2^2=4,\quad2^3=8\equiv1\pmod7.$$

So $\operatorname{ord}_7(2)=3$. It divides $6$, as the theory requires.

For $a=3$:

$$3^1=3,\quad3^2=9\equiv2,\quad3^3\equiv2\cdot3=6,$$

$$3^4\equiv6\cdot3=18\equiv4,\quad3^5\equiv4\cdot3=12\equiv5,\quad3^6\equiv5\cdot3=15\equiv1.$$

The first five are not $1$ and the sixth is, so $\operatorname{ord}_7(3)=6=\varphi(7)$. Hence $3$ is a primitive root modulo $7$.

Comment: there is no need to compute from $1$ to $6$ to find out. Since the order must divide $6$, it suffices to test the proper divisors $1,2,3$: none of $3^1,3^2,3^3$ equals $1$, so the order is $6$. This trick saves a lot of computation for large moduli.

### Example 2 (Intermediate: finding all primitive roots)

Problem: find all primitive roots modulo $7$ and verify the count formula $\varphi(\varphi(7))=2$.

Approach: $3$ is known to be a primitive root, so every element is $3^k$; filter by "$3^k$ is a primitive root if and only if $\gcd(k,6)=1$".

Solution: $\varphi(7)=6$; among $k\in\{1,2,3,4,5\}$ the ones coprime to $6$ are $k=1,5$. Hence the primitive roots are

$$3^1=3,\qquad3^5=243.$$

Compute $243\bmod7$: $7\times34=238$, remainder $5$. So the primitive roots are $3$ and $5$.

Check $5$:

$$5^1=5,\ 5^2=25\equiv4,\ 5^3\equiv4\cdot5=20\equiv6,\ 5^4\equiv6\cdot5=30\equiv2,\ 5^5\equiv2\cdot5=10\equiv3,\ 5^6\equiv3\cdot5=15\equiv1.$$

The first five are not $1$ and the sixth is $1$, so the order is $6$ and it is indeed a primitive root.

Count check: $\varphi(\varphi(7))=\varphi(6)=2$, matching the two primitive roots found.

Comment: once one primitive root is found, the rest are its "coprime powers". This avoids testing $1$ through $6$ one by one.

### Example 3 (Advanced: large exponents and testing proper divisors)

Problem: decide whether $3$ is a primitive root modulo $17$, and compute $3^{2024}\bmod17$.

Approach: $\varphi(17)=16$ with proper divisors $1,2,4,8$. It suffices to verify $3^8\not\equiv1$, then reduce the exponent by the order.

Solution: first compute the lower powers of $3$.

$$3^2=9,\qquad3^4=81\equiv81-68=13\pmod{17}.$$

$$3^8\equiv13^2=169\equiv169-153=16\equiv-1\pmod{17}.$$

Then $3^{16}=(3^8)^2\equiv(-1)^2=1$, consistent with Fermat's little theorem. Check the proper divisors: $3^1=3\ne1$, $3^2=9\ne1$, $3^4=13\ne1$, $3^8\equiv-1\ne1$. So the order is none of $1,2,4,8$ and must be $16$; hence $3$ is a primitive root modulo $17$.

Now compute $3^{2024}$. Since the order is $16$,

$$2024=126\times16+8,$$

$$3^{2024}=(3^{16})^{126}\cdot3^8\equiv1\cdot(-1)\equiv16\pmod{17}.$$

The answer is $16$.

Comment: two traps. First, verifying $3^{16}\equiv1$ alone does not show it is a primitive root; all proper divisors must be excluded. Second, when reducing the exponent use the order (here $16$), not just any multiple. If the order is $8$ and you mistakenly use $16$, the result is still right (since $16$ is a multiple of the order), but using $12$ would give a wrong answer. The safe procedure is always to determine the order first.

## 6. Common Mistakes and Pitfalls

- Mistake: assuming every modulus has a primitive root. Correction: only $1,2,4,p^k,2p^k$ do; $8,12,15,16$ do not.
- Mistake: computing an order without checking $\gcd(a,n)=1$. Correction: when they are not coprime the order does not exist, and the power sequence falls into a non-trivial cycle or an absorbing state.
- Mistake: concluding $a$ is a primitive root after verifying only $a^{\varphi(n)}\equiv1$. Correction: one must verify $a^d\ne1$ for every proper divisor $d\mid\varphi(n)$.
- Mistake: thinking the primitive root is unique. Correction: there are $\varphi(\varphi(n))$ of them (when they exist); for $n=7$ they are $3$ and $5$.
- Mistake: confusing $\operatorname{ind}_g(a)$ with a real logarithm and forgetting the modulus $\varphi(n)$. Correction: an index is unique only modulo $\varphi(n)$.
- Mistake: believing $g^k$ is a primitive root for any $k$. Correction: it requires $\gcd(k,\varphi(n))=1$.
- Mistake: applying Fermat's little theorem when the modulus is not prime. Correction: use Euler's theorem, and require coprimality.
- Mistake: treating "order" as an unrelated concept. Correction: the period of $a^k$ in $k$ is exactly $\operatorname{ord}_n(a)$, which is why the order must divide the group order $\varphi(n)$.
- Mistake: taking a primitive root to be "the largest element" or some special number. Correction: a primitive root is a structural notion, unrelated to numerical size; the two primitive roots modulo $7$ are $3$ and $5$, both smaller than $6$.

## 7. Summary and Mnemonic

Key points reviewed:

- the order $\operatorname{ord}_n(a)$ is the least positive integer with $a^k\equiv1$, and it always divides $\varphi(n)$;
- a primitive root is an element of order $\varphi(n)$, whose powers run through the whole reduced residue system;
- a primitive root exists if and only if $n=1,2,4,p^k,2p^k$;
- there are $\varphi(\varphi(n))$ primitive roots; the others are $g^k$ with $\gcd(k,\varphi(n))=1$;
- indices (discrete logarithms) turn multiplication into addition modulo $\varphi(n)$;
- to test a primitive root, exclude all proper divisors of $\varphi(n)$.

Mnemonic: **"Order is the shortest walk back to one, and it divides Euler's number; only one who tours the whole group is a primitive root, and only four families of moduli deserve one."**`,
    relatedProblemIds: [],
  },
  'quadratic-residues': {
    chapter: 'Chapter 5 Quadratic Residues',
    title: 'The Law of Quadratic Reciprocity',
    summary:
      'Starting from the last digit of a square, we use the Legendre symbol to turn "is it a square?" into computable multiplication, then explain the flip and the sign in the reciprocity law.',
    keyPoints: [
      'A quadratic residue means x²≡a (mod p) is solvable, with p an odd prime',
      'Euler’s criterion: (a/p)≡a^{(p-1)/2} (mod p)',
      'Supplementary laws: −1 depends on p mod 4, and 2 on p mod 8',
      'Reciprocity changes sign only when p,q are both ≡3 (mod 4)',
      'The Jacobi symbol keeps the algebraic rules, but equalling 1 does not guarantee a solution',
    ],
    content: String.raw`

Look only at the units digit. The square of any integer can end only in $0,1,4,5,6,9$, never in $2,3,7,8$. Hence $x^2\equiv2\pmod{10}$ has no solution—the most elementary quadratic-residue phenomenon.

Modulo a prime the question is subtler. Take $p=11$ and compute the squares of $1$ to $10$:

$$1^2=1,\ 2^2=4,\ 3^2=9,\ 4^2=16\equiv5,\ 5^2=25\equiv3,$$

$$6^2\equiv3,\ 7^2\equiv5,\ 8^2\equiv9,\ 9^2\equiv4,\ 10^2\equiv1.$$

The resulting set is $\{1,3,4,5,9\}$: exactly $5$ values, which is $(11-1)/2$. The other five numbers $2,6,7,8,10$ are never squares. This symmetry—"half are, half are not"—is the starting point of quadratic-residue theory.

Deciding whether a number is a square could be done by brute force, but that is infeasible for large $p$. We need a "formula" that turns "is it a square?" into a computable symbol. The Legendre symbol is that symbol, Euler's criterion gives an algorithm for it, and the reciprocity law lets us look it up without actually computing high powers. It is one of the most beautiful theorems in number theory; Gauss called it the "golden theorem".

Motivating question: is $x^2\equiv5\pmod{11}$ solvable? What about $x^2\equiv3\pmod{11}$? How can we decide quickly?

## 2. Rigorous Definitions

**Definition (quadratic residue)**. Let $p$ be an odd prime and $a$ an integer with $p\nmid a$. If the congruence

$$x^2\equiv a\pmod p$$

is solvable, $a$ is called a quadratic residue modulo $p$; otherwise a quadratic non-residue.

**Definition (Legendre symbol)**. For an odd prime $p$ and an integer $a$, define

$$\left(\frac{a}{p}\right)=\begin{cases}1, & p\nmid a \text{ and } a \text{ is a square mod } p,\\ -1, & p\nmid a \text{ and } a \text{ is not a square mod } p,\\ 0, & p\mid a.\end{cases}$$

The symbol is read "the Legendre symbol of $a$ with respect to $p$"; it looks like a fraction but is not one.

**Theorem (Euler's criterion)**. For an odd prime $p$ and $p\nmid a$,

$$\left(\frac{a}{p}\right)\equiv a^{(p-1)/2}\pmod p.$$

**Theorem (basic properties)**.

1. Complete multiplicativity: $\left(\frac{ab}{p}\right)=\left(\frac{a}{p}\right)\left(\frac{b}{p}\right)$;
2. $\left(\frac{a^2}{p}\right)=1$ when $p\nmid a$;
3. $\left(\frac{a+p}{p}\right)=\left(\frac{a}{p}\right)$, i.e. the symbol depends only on $a\bmod p$.

**Theorem (supplementary laws)**.

$$\left(\frac{-1}{p}\right)=(-1)^{(p-1)/2},\qquad\left(\frac{2}{p}\right)=(-1)^{(p^2-1)/8}.$$

Translated into congruences: $-1$ is a quadratic residue if and only if $p\equiv1\pmod4$; $2$ is a quadratic residue if and only if $p\equiv\pm1\pmod8$.

**Theorem (law of quadratic reciprocity)**. Let $p,q$ be distinct odd primes. Then

$$\left(\frac{p}{q}\right)\left(\frac{q}{p}\right)=(-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}.$$

Equivalently: if $p\equiv q\equiv3\pmod4$ then $\left(\frac{p}{q}\right)=-\left(\frac{q}{p}\right)$; otherwise the two are equal.

**Definition (Jacobi symbol)**. Let $n=p_1^{e_1}\cdots p_k^{e_k}$ be a positive odd integer and define

$$\left(\frac{a}{n}\right)=\prod_{i=1}^{k}\left(\frac{a}{p_i}\right)^{e_i}.$$

The Jacobi symbol retains multiplicativity and the reciprocity law, but $\left(\frac{a}{n}\right)=1$ no longer guarantees that $a$ is a quadratic residue modulo $n$.

## 3. Why Define It This Way

**Why discuss only odd primes?** For $p=2$ every element is a square ($0^2=0$, $1^2=1$), the problem degenerates and there is nothing to discuss. Only for odd primes is there a "half are, half are not" structure.

**Why require $p\nmid a$?** If $p\mid a$, then $x^2\equiv a\equiv0$ has only the solution $x\equiv0$, a different kind of question from "is the squaring map surjective". Assigning it the value $0$ is a convention that lets the multiplicativity formula hold also when $a\equiv0$.

**Why use $1,-1,0$ rather than "solvable, not solvable"?** Because numbers can be multiplied. Encoding "is it a square" as a group homomorphism immediately yields multiplicativity: to judge $ab$ one only judges $a$ and $b$ separately. That is the power of symbolization—it turns a logical problem into an algebraic computation.

**Why does Euler's criterion hold?** By Fermat's little theorem $a^{p-1}\equiv1$, so

$$\left(a^{(p-1)/2}\right)^2\equiv1\pmod p.$$

Modulo a prime, $y^2\equiv1$ has only the solutions $y\equiv\pm1$ (since $(y-1)(y+1)\equiv0$ and $p$ prime divides one factor). Hence $a^{(p-1)/2}$ is $1$ or $-1$.

If $a$ is a square, $a\equiv x^2$, then $a^{(p-1)/2}\equiv x^{p-1}\equiv1$. The image of the squaring map has $(p-1)/2$ elements, exactly all roots of $y^{(p-1)/2}=1$ (that equation has degree $(p-1)/2$ and at most that many roots), so non-squares must give $-1$.

**Gauss's lemma and the origin of $(2/p)$.** Let $p$ be an odd prime with $p\nmid a$. Consider the least positive residues of $a,2a,\dots,\frac{p-1}{2}a$ modulo $p$; if $\nu$ of them exceed $p/2$, then $\left(\frac{a}{p}\right)=(-1)^{\nu}$. For $a=2$ these residues are exactly $2,4,\dots,p-1$; counting how many exceed $p/2$ yields $\left(\frac{2}{p}\right)=(-1)^{(p^2-1)/8}$. This lemma converts "is it a square" into "count the elements"; it was one of the earliest tools for proving reciprocity, and it explains why the rule for $2$ looks at mod $8$ rather than mod $4$.

**Why does the reciprocity law look like that?** It says that "$p$ is a square modulo $q$" and "$q$ is a square modulo $p$" are almost equivalent, differing by a sign only when $p,q$ are both $\equiv3\pmod4$. This symmetry is highly non-trivial: two different moduli constrain each other's square structure. Its practical value is the "flip": turn a symbol with a large modulus into one with a small modulus, then reduce, shrinking numbers as fast as the Euclidean algorithm does.

**Counterexample: the Jacobi symbol trap.** $\left(\frac{2}{15}\right)=\left(\frac{2}{3}\right)\left(\frac{2}{5}\right)=(-1)(-1)=1$, yet $x^2\equiv2\pmod{15}$ has no solution. Because $2$ is not a square mod $3$, the equation fails already mod $3$, let alone mod $15$. A Jacobi symbol equal to $1$ only says "the number of non-residue prime factors is even", not that a solution exists. This is the most famous trap of the section.

## 4. Intuition and Pictures

**The square table.** We already computed the table modulo $11$: $1,3,4,5,9$ are residues and $2,6,7,8,10$ are not. Note that $x$ and $-x$ have the same square, so only the first half needs computing; the second half repeats.

| $p$ | $p\bmod4$ | $p\bmod8$ | $-1$ a square? | $2$ a square? |
|---|---|---|---|---|
| $5$ | $1$ | $5$ | yes | no |
| $7$ | $3$ | $7$ | no | yes |
| $11$ | $3$ | $3$ | no | no |
| $13$ | $1$ | $5$ | yes | no |
| $17$ | $1$ | $1$ | yes | yes |
| $19$ | $3$ | $3$ | no | no |

Check $p=7$: $-1\equiv6$, the square table is $\{1,2,4\}$, and $6$ is absent, so it is a non-residue; $2$ is in the table, so it is a residue.

**Why exactly half?** The squaring map $x\mapsto x^2$ glues $x$ to $-x$, so each image has at least two preimages; and for odd $p$, $x\ne-x$ (otherwise $2x\equiv0$, $x\equiv0$, outside the multiplicative group), so each image has exactly two preimages and there are $(p-1)/2$ images. Another way: the quadratic residues are the squaring subgroup of the multiplicative group, and in a cyclic group of order $n$ the subgroup of $k$-th powers has size $n/\gcd(n,k)$; taking $n=p-1$ and $k=2$ gives $(p-1)/2$. Both computations give the same number, so "half" is no coincidence but a necessity of group structure.

> Intuition: the squaring map "folds" the cyclic group of order $p-1$ in half, each image having exactly two preimages $x$ and $-x$, so the image occupies only half.

**Reciprocity is like a change-of-base formula.** When computing a symbol with a large numerator, reciprocity lets us "flip and reduce", shrinking the numerator at every step—very convenient by hand—and it also handles composite numerators (split into prime factors first).

## 5. Worked Examples

### Example 1 (Basic: direct table)

Problem: list all quadratic residues modulo $11$ and solve $x^2\equiv5\pmod{11}$.

Approach: compute the squares of $1$ to $5$; those of $6$ to $10$ repeat.

Solution: compute

$$1^2=1,\quad2^2=4,\quad3^2=9,\quad4^2=16\equiv5,\quad5^2=25\equiv3.$$

By symmetry $(-k)^2=k^2$, so all residues are

$$\{1,3,4,5,9\}.$$

Since $5$ appears, it corresponds to $x\equiv4$ and $x\equiv-4\equiv7$. Check: $4^2=16=11+5$; $7^2=49=44+5$. So the solutions are $x\equiv4$ or $x\equiv7\pmod{11}$.

Comment: quadratic residues come in pairs, $x$ and $p-x$ being solutions together, so the number of solutions is always $0$ or $2$ (when $p\nmid a$).

### Example 2 (Intermediate: computation with reciprocity)

Problem: compute $\left(\dfrac{91}{167}\right)$.

Approach: $91=7\times13$; split into two Legendre symbols, flip each by reciprocity, and watch the sign.

Solution: by multiplicativity,

$$\left(\frac{91}{167}\right)=\left(\frac{7}{167}\right)\left(\frac{13}{167}\right).$$

First compute $\left(\frac{7}{167}\right)$. $7\equiv3\pmod4$ and $167\equiv3\pmod4$, so flipping changes the sign:

$$\left(\frac{7}{167}\right)=-\left(\frac{167}{7}\right).$$

$167=7\times23+6$, so $\left(\frac{167}{7}\right)=\left(\frac{6}{7}\right)$. Factor $6=2\times3$:

$$\left(\frac{2}{7}\right)=1\quad(7\equiv-1\pmod8),$$

$$\left(\frac{3}{7}\right)=-\left(\frac{7}{3}\right)=-\left(\frac{1}{3}\right)=-1.$$

Here $3$ and $7$ are both $\equiv3\pmod4$, so the sign changes; and $7\equiv1\pmod3$, so $\left(\frac{7}{3}\right)=1$. Hence $\left(\frac{6}{7}\right)=1\times(-1)=-1$ and

$$\left(\frac{7}{167}\right)=-(-1)=1.$$

Next compute $\left(\frac{13}{167}\right)$. Since $13\equiv1\pmod4$, flipping preserves the sign:

$$\left(\frac{13}{167}\right)=\left(\frac{167}{13}\right)=\left(\frac{11}{13}\right).$$

$11\equiv3\pmod4$ and $13\equiv1\pmod4$; not both $3$, so no sign change:

$$\left(\frac{11}{13}\right)=\left(\frac{13}{11}\right)=\left(\frac{2}{11}\right).$$

$11\equiv3\pmod8$, so $\left(\frac{2}{11}\right)=-1$. Hence $\left(\frac{13}{167}\right)=-1$.

Finally

$$\left(\frac{91}{167}\right)=1\times(-1)=-1.$$

Comment: every step requires checking the residues of the two primes mod $4$. The sign flips only when both are $\equiv3$; missing or adding a sign is the most common way to lose marks on such problems.

### Example 3 (Advanced: all primes making $3$ a residue)

Problem: find all odd primes $p$ for which $3$ is a quadratic residue modulo $p$.

Approach: use reciprocity to flip $\left(\frac{3}{p}\right)$ into $\left(\frac{p}{3}\right)$, then classify by $p$ mod $12$.

Solution: for $p\ne3$, reciprocity gives

$$\left(\frac{3}{p}\right)\left(\frac{p}{3}\right)=(-1)^{\frac{3-1}{2}\cdot\frac{p-1}{2}}=(-1)^{(p-1)/2}.$$

Hence

$$\left(\frac{3}{p}\right)=(-1)^{(p-1)/2}\left(\frac{p}{3}\right).$$

And $\left(\frac{p}{3}\right)=1$ when $p\equiv1\pmod3$, and $-1$ when $p\equiv2\pmod3$.

Classify $p$ mod $12$ into four cases (odd primes other than $3$, so $p\equiv1,5,7,11\pmod{12}$):

- $p\equiv1\pmod{12}$: $(p-1)/2$ even, sign $+1$; $p\equiv1\pmod3$, so $\left(\frac{p}{3}\right)=1$. Product $1$.
- $p\equiv5\pmod{12}$: $(p-1)/2$ even, sign $+1$; $p\equiv2\pmod3$, so $\left(\frac{p}{3}\right)=-1$. Product $-1$.
- $p\equiv7\pmod{12}$: $(p-1)/2$ odd, sign $-1$; $p\equiv1\pmod3$, so $\left(\frac{p}{3}\right)=1$. Product $-1$.
- $p\equiv11\pmod{12}$: $(p-1)/2$ odd, sign $-1$; $p\equiv2\pmod3$, so $\left(\frac{p}{3}\right)=-1$. Product $1$.

So $3$ is a quadratic residue if and only if

$$p\equiv\pm1\pmod{12},$$

i.e. $p\equiv1$ or $11\pmod{12}$.

Spot checks: $p=11$, $5^2=25\equiv3\pmod{11}$; $p=13$, $4^2=16\equiv3\pmod{13}$; $p=23\equiv11\pmod{12}$, $7^2=49\equiv3\pmod{23}$; $p=7\equiv7\pmod{12}$ should be a non-residue, and the square table $\{1,2,4\}$ does not contain $3$.

Comment: the trap is that $p=3$ itself must be excluded separately (then the symbol is $0$ and $3\equiv0$ is a trivial square). The classification uses mod $12$, not mod $4$ or mod $3$, because the sign depends on both.

## 6. Common Mistakes and Pitfalls

- Mistake: using the Jacobi symbol as if it were Legendre, concluding solvability from $\left(\frac{a}{n}\right)=1$. Correction: for composite $n$ it is only a necessary condition; $\left(\frac{2}{15}\right)=1$ yet there is no solution.
- Mistake: changing the sign unconditionally when flipping by reciprocity. Correction: the sign changes only when $p\equiv q\equiv3\pmod4$.
- Mistake: remembering the rule for $\left(\frac{2}{p}\right)$ as depending on $p\bmod4$. Correction: it depends on $p\bmod8$; it is $1$ when $p\equiv\pm1\pmod8$.
- Mistake: thinking $\left(\frac{a}{p}\right)=1$ means $a$ is a perfect square. Correction: it only means $a$ is a square modulo $p$; for instance $3$ is a residue mod $11$ but $3$ itself is not a square.
- Mistake: using Euler's criterion $a^{(n-1)/2}$ when the denominator is not prime. Correction: Euler's criterion holds only for odd primes.
- Mistake: forgetting the case $a\equiv0$, so that a stray $0$ appears in products of symbols. Correction: first check $p\mid a$; then the symbol is $0$ and the equation degenerates.
- Mistake: flipping a composite numerator as if it were prime. Correction: first split into prime factors using multiplicativity, then flip each.
- Mistake: assuming $\left(\frac{a}{p}\right)$ and $\left(\frac{p}{a}\right)$ can be interchanged directly. Correction: reciprocity carries a sign, differing only when both are $\equiv3\pmod4$; and when $a$ is composite the right side is not even a Legendre symbol.

## 7. Summary and Mnemonic

Key points reviewed:

- a quadratic residue means $x^2\equiv a\pmod p$ is solvable, with $p$ an odd prime and $p\nmid a$;
- the Legendre symbol takes values $1,-1,0$ and is completely multiplicative;
- Euler's criterion: $\left(\frac{a}{p}\right)\equiv a^{(p-1)/2}\pmod p$;
- the supplementary laws give the symbols for $-1$ (look at $p\bmod4$) and $2$ (look at $p\bmod8$);
- quadratic reciprocity: $\left(\frac{p}{q}\right)\left(\frac{q}{p}\right)=(-1)^{(p-1)(q-1)/4}$;
- the Jacobi symbol keeps the algebraic laws, but the value $1$ does not guarantee a solution.

Mnemonic: **"Squares fold in half and leave one half; Euler judges by the half power; reciprocity swaps top and bottom, and two threes both need a sign change."**`,
    relatedProblemIds: [],
  },
  'diophantine': {
    chapter: 'Chapter 6 Diophantine Equations',
    title: 'Diophantine Equations and a Special Case of Fermat’s Last Theorem',
    summary:
      'From postage stamps and builders laying out right angles to the parametrization of Pythagorean triples, we prove the n=4 case of Fermat’s Last Theorem by infinite descent.',
    keyPoints: [
      'Diophantine equations demand integer solutions; existence and the structure of the general solution are the core',
      'ax+by=c is solvable if and only if gcd(a,b)|c',
      'Primitive Pythagorean triples are generated by m²-n², 2mn, m²+n²',
      'Non-primitive solutions are multiples of primitive ones; a complete answer must include them',
      'x⁴+y⁴=z² has no positive integer solution, proved by infinite descent',
    ],
    content: String.raw`

How many ways can you make $17$ cents of postage from $3$-cent and $5$-cent stamps? Let there be $x$ three-cent stamps and $y$ five-cent stamps, so $3x+5y=17$. Try: $x=4,y=1$ works, since $12+5=17$. Any others? For $x=1$, $5y=14$ fails; for $x=3$, $5y=8$ fails. So there is only this one positive solution. Equations admitting only integer solutions are called Diophantine equations, after the third-century Greek mathematician Diophantus.

Now a building site. Workers need to draw a right angle on the ground; they take a rope with equally spaced knots, form a triangle with sides $3,4,5$, and a right angle appears by itself, because

$$3^2+4^2=9+16=25=5^2.$$

Positive integer triples satisfying $x^2+y^2=z^2$ are called Pythagorean triples. This is the most famous Diophantine equation; it has infinitely many solutions, and a beautiful formula captures them all.

Finally, Fermat's Last Theorem. Fermat wrote in the margin of his *Arithmetica* that $x^n+y^n=z^n$ has no positive integer solution for $n\ge3$, but the margin was too narrow for the proof. That sentence kept mathematics busy for three hundred and fifty-eight years, until Wiles completed the proof in $1994$. Here we attack only the case $n=4$, proved by Fermat himself using "infinite descent"; the beauty of the method reveals the soul of the whole field.

Motivating question: why does $3x+5y=17$ have only one solution? Can all Pythagorean triples be written down?

## 2. Rigorous Definitions

**Definition (Diophantine equation)**. An equation or system whose unknowns take integer values (or positive integers, or nonnegative integers) is called a Diophantine equation. Finding all integer solutions is called solving it.

**Theorem (linear Diophantine equation)**. Let $a,b$ not both zero and $d=\gcd(a,b)$. The equation

$$ax+by=c$$

has an integer solution if and only if $d\mid c$. When solvable, if $(x_0,y_0)$ is one particular solution, all solutions are

$$x=x_0+\frac{b}{d}t,\qquad y=y_0-\frac{a}{d}t,\qquad t\in\mathbb{Z}.$$

**Theorem (Pythagorean triples)**. Among the positive integer solutions of $x^2+y^2=z^2$, those with $\gcd(x,y,z)=1$ are called primitive. All primitive solutions (up to swapping $x,y$) can be written as

$$x=m^2-n^2,\qquad y=2mn,\qquad z=m^2+n^2,$$

where $m>n>0$, $\gcd(m,n)=1$, and $m,n$ have opposite parity.

**Theorem (Fermat's Last Theorem)**. For an integer $n\ge3$, the equation

$$x^n+y^n=z^n$$

has no positive integer solution.

**Theorem (the case $n=4$)**. The equation $x^4+y^4=z^2$ has no positive integer solution.

**Definition (Pell's equation)**. Equations of the form

$$x^2-Dy^2=1$$

are called Pell equations, where $D$ is a positive nonsquare integer. Such an equation has infinitely many positive integer solutions; the least positive solution $(x_1,y_1)$ is called the fundamental solution, and all solutions come from expanding $(x_1+y_1\sqrt{D})^k$.

## 3. Why Define It This Way

**Why is the solvability condition $d\mid c$?** Because the left side $ax+by$ is always a multiple of $d$ ($d$ divides $a$ and $b$, hence any combination). So $c$ must be a multiple of $d$—a necessary condition. Sufficiency comes from Bézout: $ax_0'+by_0'=d$, and multiplying by $c/d$ represents $c$.

**Why is the step of the general solution $(b/d,-a/d)$?** The homogeneous equation $ax+by=0$ is equivalent to $ax=-by$. Dividing by $d$ gives $(a/d)x=-(b/d)y$. Since $\gcd(a/d,b/d)=1$, $b/d$ must divide $x$; write $x=(b/d)t$ and substitute back to get $y=-(a/d)t$. Failing to clear the common factor first causes lost or spurious solutions—the most common error.

**Why must $m,n$ be coprime with opposite parity for Pythagorean triples?** Both conditions secure primitivity. If $m,n$ are both odd, then $m^2-n^2$ and $m^2+n^2$ are even, so $x,y,z$ are all even and $2$ can be cancelled, giving a non-primitive triple; if $\gcd(m,n)=g>1$, then $g^2$ divides $x,y,z$, again non-primitive. Conversely, $m,n$ satisfying both conditions always produce a primitive solution. Non-primitive solutions are just primitive ones multiplied by an integer.

**Why does the $n=4$ case need infinite descent?** Proving directly that "no minimal solution exists" is hard, since there is no lower bound to compare with. The idea of descent is: assume a solution exists, take the one with least $z$, then construct a solution with smaller $z$, a contradiction. This requires the construction to strictly decrease some positive integer, which is logically equivalent to the impossibility of an infinite descending sequence of natural numbers.

**Why do Pell equations always have solutions?** This needs continued fractions or the pigeonhole principle. Intuitively, $\sqrt{D}$ is irrational and $x/y$ can approximate it arbitrarily well, while $x^2-Dy^2=(x-y\sqrt{D})(x+y\sqrt{D})$ is squeezed small during the approximation, and rounding gives $1$. Solutions of Pell equations grow fast: for $D=2$ the fundamental solution is $3+2\sqrt2$, and the next is $17+12\sqrt2$.

**Counterexample: why can the $n=4$ method not be extended directly?** Because for composite $n$ one can reduce to prime factors (e.g. $n=6$ gives $x^6=(x^2)^3$), and the real difficulty is odd prime $n$, which requires modular forms and elliptic curves, far beyond elementary descent. The case $n=4$ is tractable because $x^4+y^4=z^2$ happens to allow one more factorization.

## 4. Intuition and Pictures

**Lattice points on a line.** $ax+by=c$ is a line, and integer solutions are lattice points on it. If $d\mid c$ there are infinitely many, equally spaced along the line with spacing vector $(b/d,-a/d)$. If $d\nmid c$, the line "misses" every lattice point.

**Pythagorean triples form a tree.** $(m,n)=(2,1)$ gives $(3,4,5)$; $(3,2)$ gives $(5,12,13)$; $(4,1)$ gives $(15,8,17)$; $(4,3)$ gives $(7,24,25)$. All primitive triples indeed form a ternary tree, generated from $(3,4,5)$ by three matrix transformations.

| $m$ | $n$ | $x=m^2-n^2$ | $y=2mn$ | $z=m^2+n^2$ |
|---|---|---|---|---|
| $2$ | $1$ | $3$ | $4$ | $5$ |
| $3$ | $2$ | $5$ | $12$ | $13$ |
| $4$ | $1$ | $15$ | $8$ | $17$ |
| $4$ | $3$ | $7$ | $24$ | $25$ |
| $5$ | $2$ | $21$ | $20$ | $29$ |

> Intuition: $m^2-n^2$, $2mn$ and $m^2+n^2$ are the real part, imaginary part and squared modulus of the complex number $(m+ni)^2$. Pythagorean triples are essentially a by-product of "squaring Gaussian integers".

**Infinite descent is like a shrinking Russian doll.** You open one layer and find a smaller identical doll inside; but positive integers cannot shrink forever, so the original assumption fails.

## 5. Worked Examples

### Example 1 (Basic: general solution of a linear equation)

Problem: solve $12x+18y=30$ and write all integer solutions.

Approach: compute the gcd to test solvability, cancel the common factor, find one particular solution, then apply the general formula.

Solution: $\gcd(12,18)=6$ and $6\mid30$, so solutions exist. Divide by $6$:

$$2x+3y=5.$$

By inspection $x_0=1$, $y_0=1$: $2+3=5$.

Homogeneous equation $2x+3y=0$: $\gcd(2,3)=1$, so $x=3t$, $y=-2t$. All solutions are

$$x=1+3t,\qquad y=1-2t,\qquad t\in\mathbb{Z}.$$

Spot check $t=2$: $x=7,y=-3$, $12\cdot7+18\cdot(-3)=84-54=30$. Spot check $t=-1$: $x=-2,y=3$, $-24+54=30$. Both correct.

For positive solutions we need $1+3t>0$ and $1-2t>0$, i.e. $t>-1/3$ and $t<1/2$; the only integer is $t=0$, giving $(1,1)$.

Comment: the general solution is "all lattice points on one line"; adding constraints (positive, nonnegative, bounded) means filtering along that line, usually leaving finitely many solutions.

### Example 2 (Intermediate: triples with hypotenuse $65$)

Problem: find all positive integer pairs $(x,y)$ with $x^2+y^2=65^2$, up to order.

Approach: $65=5\cdot13$. Primitive solutions come from the two representations of $65$ as a sum of two squares; non-primitive ones come from small triples times multiples. Both routes must be taken.

Solution: first primitive solutions. Write $65$ as a sum of two squares:

$$65=1^2+8^2=4^2+7^2.$$

For $(m,n)=(8,1)$: $x=64-1=63$, $y=2\cdot8\cdot1=16$, $z=64+1=65$, giving $(16,63,65)$.

For $(m,n)=(7,4)$: $x=49-16=33$, $y=2\cdot7\cdot4=56$, $z=49+16=65$, giving $(33,56,65)$.

Next non-primitive solutions. $65=5\times13$, with $5$ corresponding to $(3,4,5)$ and $13$ to $(5,12,13)$; multiply each:

$$(3,4,5)\times13=(39,52,65),\qquad(5,12,13)\times5=(25,60,65).$$

So there are four in total:

$$(16,63,65),\quad(33,56,65),\quad(25,60,65),\quad(39,52,65).$$

Check: $16^2+63^2=256+3969=4225=65^2$; $33^2+56^2=1089+3136=4225$; $25^2+60^2=625+3600=4225$; $39^2+52^2=1521+2704=4225$. All correct.

Comment: writing only the parametrization misses non-primitive solutions. The complete method: factor $z$, build primitive solutions from every factorization of its factors as sums of two squares, then consider all possible multiples.

### Example 3 (Advanced: infinite descent for $n=4$)

Problem: prove that $x^4+y^4=z^2$ has no positive integer solution.

Approach: assume a solution, take the one with least $z$, and first cancel common factors so that $\gcd(x,y)=1$. Regard $x^2,y^2,z$ as a primitive Pythagorean triple; after parametrizing, apply the Pythagorean parametrization once more to $m,n$, and finally construct a smaller solution.

Solution: suppose a positive solution exists and take the one with least $z$. If $\gcd(x,y)=g>1$, then $g^4\mid z^2$ and cancelling $g^2$ gives a smaller solution, contradicting minimality. So $\gcd(x,y)=1$ and hence $\gcd(x^2,y^2)=1$.

Thus $(x^2,y^2,z)$ is a primitive Pythagorean triple. One leg is even; swapping $x,y$ if needed makes $y^2$ even. By the parametrization there exist $m>n>0$ with $\gcd(m,n)=1$ and $m,n$ of opposite parity such that

$$x^2=m^2-n^2,\qquad y^2=2mn,\qquad z=m^2+n^2.$$

From $y^2=2mn$, $mn$ is even, and $m,n$ have opposite parity. Also $m$ cannot be even: otherwise $x^2=m^2-n^2\equiv0-1\equiv3\pmod4$, impossible (a square is $0$ or $1$ mod $4$). So $m$ is odd and $n$ even.

Now look at $x^2+n^2=m^2$. Since $\gcd(x,n)=1$ (if a prime $r\mid x,n$, then $r\mid m^2=x^2+n^2$, so $r\mid m$, contradicting $\gcd(m,n)=1$), the triple $(x,n,m)$ is also primitive, with $n$ the even leg. There exist $p>q>0$ with $\gcd(p,q)=1$, of opposite parity, such that

$$n=2pq,\qquad x=p^2-q^2,\qquad m=p^2+q^2.$$

Substitute back into $y^2=2mn$:

$$y^2=2(p^2+q^2)(2pq)=4pq(p^2+q^2).$$

Divide both sides by $4$:

$$\left(\frac{y}{2}\right)^2=pq(p^2+q^2).$$

Now $p,q,p^2+q^2$ are pairwise coprime: $\gcd(p,q)=1$; if a prime $r\mid p$ and $r\mid p^2+q^2$, then $r\mid q^2$, so $r\mid q$, contradiction; similarly for $q$. A product of pairwise coprime positive integers that is a square forces each factor to be a square:

$$p=r^2,\qquad q=s^2,\qquad p^2+q^2=t^2.$$

Therefore

$$r^4+s^4=t^2.$$

This is a new solution. But

$$t^2=p^2+q^2=m<m^2+n^2=z,$$

so $t<z$, contradicting the minimality of $z$.

Hence the original equation has no positive integer solution.

Comment: the trap is the use of minimality. One must ensure the $z$-coordinate $t$ of the new solution is strictly smaller than the original $z$; otherwise the descent fails. Here $t^2=m$ while $z=m^2+n^2$, and for $m\ge2$ clearly $m<m^2+n^2$. Also, "a product of pairwise coprime integers that is a square forces each to be a square" uses the Fundamental Theorem of Arithmetic and cannot be taken for granted. From the unsolvability of $x^4+y^4=z^2$ one immediately gets the unsolvability of $x^4+y^4=z^4$ (write $z^4=(z^2)^2$), which is the $n=4$ case of Fermat's Last Theorem.

## 6. Common Mistakes and Pitfalls

- Mistake: seeking a particular solution of a linear equation without computing the gcd. Correction: first compute $d=\gcd(a,b)$; if $d\nmid c$, declare no solution and save the effort.
- Mistake: writing the general solution as $x=x_0+bt,\ y=y_0-at$. Correction: divide by $d$, or the solution set is $d$ times too sparse and many solutions are lost.
- Mistake: using the Pythagorean parametrization without checking coprimality and parity of $m,n$. Correction: otherwise you generate non-primitive or repeated triples, e.g. $(m,n)=(3,1)$ gives $(8,6,10)$, merely twice $(3,4,5)$.
- Mistake: saying "no integer solution" when the claim is "no positive integer solution". Correction: $x^4+y^4=z^2$ has trivial solutions (such as $x=0$ or $y=0$); the statement is restricted to positive integers.
- Mistake: in infinite descent, not verifying that the new solution is smaller. Correction: at every step explicitly write down a positive component of the new solution that is strictly smaller than in the original, or the logic breaks.
- Mistake: thinking a Pell equation has only one solution. Correction: $x^2-2y^2=1$ has infinitely many; $3+2\sqrt2$ is only the fundamental solution.
- Mistake: transplanting the parametrization of $x^2+y^2=z^2$ to $x^3+y^3=z^3$. Correction: the cubic equation has no such quadratic-form structure, and the parametrization fails.

## 7. Summary and Mnemonic

Key points reviewed:

- Diophantine equations care only about integer solutions; existence and the structure of the general solution are the two themes;
- $ax+by=c$ is solvable if and only if $\gcd(a,b)\mid c$, and the general solution is a particular plus homogeneous solution;
- primitive Pythagorean triples are generated by $m^2-n^2$, $2mn$, $m^2+n^2$ with $m>n$, coprime, opposite parity;
- non-primitive triples are multiples of primitive ones and must not be omitted;
- Fermat's Last Theorem has no positive solutions for $n\ge3$; the case $n=4$ has an elementary descent proof;
- the key to infinite descent is constructing a strictly smaller solution, contradicting minimality.

Mnemonic: **"Linear first checks the common factor, general solutions slide along lattice points; Pythagoras takes two squares, and endless descent breaks the fourth power."**`,
    relatedProblemIds: [],
  },
};

export default map;
