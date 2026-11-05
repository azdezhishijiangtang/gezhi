import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'logic': {
    chapter: 'Chapter 1 Propositional Logic',
    title: 'Propositional Logic and Normal Forms',
    summary:
      'Turn reasoning into algebra: five connectives, truth tables, and principal disjunctive/conjunctive normal forms make "proof" mechanically checkable.',
    content: String.raw`

Imagine you are a detective. The clues are: if the murderer is the butler, then the door lock was forced; the lock was not forced. What do you conclude? Almost everyone blurts out: "the murderer is not the butler." The inference is so natural that you hardly notice you are reasoning.

But answer a harder question: if I hide the reasoning inside winding verbiage—"if A is elected then B resigns, if B resigns then C raises prices, if C raises prices then D benefits"—can you still see at a glance whether "A was not elected, so D does not benefit" is right or wrong? Now imagine a programmer facing thousands of risk-control rules of the form "if condition A holds, execute B", with the product manager asking: is this rule set self-contradictory? A human can read ten rules by feel; ten thousand rules mean surrender.

Propositional logic was born to solve exactly this pain point: **it turns reasoning from "arguing" into "computing"**. It cares about only two things—whether each sentence is true or false, and how sentences are joined together—and then, with a small truth table, mechanically decides in dictionary fashion whether any inference is valid. Every if-statement in a computer and every logic-gate circuit rests on this algebra.

The motivating question of this chapter: given several premises and a conclusion, is there a method—depending not on intelligence but only on patience—that decides in finitely many steps whether "the conclusion is necessarily true whenever the premises are"? Spoiler: yes, and the key is the principal normal form. Let us first fix the rules of this world.

The story begins three centuries ago. Leibniz dreamed of a "universal language" that would reduce every dispute to "let us calculate"; Boole turned logic into algebra, Frege fitted logic with the gears of quantifiers, and Russell and Whitehead spent hundreds of pages proving "$1 + 1 = 2$". This line of thought directly gave birth to computer science. In the discrete-mathematics syllabus, propositional logic is the first cornerstone: it is both the grammar lesson of mathematical reasoning and the foundation for predicate logic, switching circuits and program verification. Master this chapter and you will thank yourself again and again later.

## 2. Rigorous Definitions

**Proposition**: a declarative sentence that can be judged true or false. There are only two truth values: true (written $\mathrm{T}$ or $1$) and false (written $\mathrm{F}$ or $0$). Questions, exclamations and sentences such as "will it rain tomorrow" have no truth value and are not propositions. Note also that an open sentence with a free variable, such as $x > 0$, has no truth value until $x$ is specified; it is a propositional function, handled in the next chapter on predicate logic.

**The five basic connectives** (used to assemble compound propositions from atomic ones):

| Connective | Symbol | Read as | Truth value |
|--------|------|------|------|
| Negation | $\neg p$ | not $p$ | Truth value reversed |
| Conjunction | $p \wedge q$ | $p$ and $q$ | True only when both are true |
| Disjunction | $p \vee q$ | $p$ or $q$ | False only when both are false |
| Implication | $p \to q$ | if $p$ then $q$ | False only when the antecedent is true and the consequent false |
| Equivalence | $p \leftrightarrow q$ | $p$ if and only if $q$ | True only when the truth values agree |

**Recursive definition of a propositional formula**:
1. A single propositional variable is a formula;
2. If $A$ is a formula, then $\neg A$ is a formula;
3. If $A, B$ are formulas, then $(A \wedge B)$, $(A \vee B)$, $(A \to B)$, $(A \leftrightarrow B)$ are formulas;
4. Only what is obtained by finitely many uses of 1–3 is a formula.

**Truth tables and assignments**: a formula with $n$ variables has $2^n$ assignments. Writing out the full truth table is the process of viewing the formula as a "truth function".

**Three special kinds of formula**: one true under every assignment is a **tautology**; one false under every assignment is a **contradiction**; one true under at least one assignment is **satisfiable**.

**Logical equivalence**: $A \Leftrightarrow B$ means the two have the same truth value under every assignment. Common equivalences include De Morgan's laws $\neg(p \wedge q) = \neg p \vee \neg q$; the implication equivalence $p \to q = \neg p \vee q$; double negation $\neg\neg p = p$; and the commutative, associative, distributive, idempotent and absorption laws.

**Principal disjunctive normal form (PDNF)**: a **minterm** is a conjunction containing all $n$ variables, each appearing exactly once either as itself or as its negation, e.g. $p \wedge \neg q \wedge r$. A disjunction of several **distinct** minterms is a PDNF. Theorem: every formula has a unique PDNF (up to the order of the minterms).

**Principal conjunctive normal form (PCNF)**: a **maxterm** is a disjunction containing all the variables, each exactly once. A conjunction of several distinct maxterms is a PCNF, also unique.

**Valid inference**: $P_1, P_2, \dots, P_n \Rightarrow Q$ means that under every assignment making $P_1 \wedge P_2 \wedge \cdots \wedge P_n$ true, $Q$ is also true. It is equivalent to $P_1 \wedge P_2 \wedge \cdots \wedge P_n \to Q$ being a tautology.

## 3. Why Define It This Way

**Why look only at truth values, not content**: the five connectives are all **truth functions**—the truth value of a compound depends only on the truth values of its parts, not on what the sentences are about. This is the principle of extensionality, and it is the precondition for logic being mechanically computable. If meaning could affect truth value (as in "I believe it will rain tomorrow"), this tool would not suffice; that is the territory of modal logic.

**Why is an implication stipulated true when the antecedent is false**: $p \to q$ is a "promise"—it is broken only if $p$ happens and $q$ does not. A contract saying "if it rains tomorrow, we deliver" is not violated when it does not rain and no delivery is made. If an implication with a false antecedent were stipulated false, then commonplace vacuous truths such as "if pigs could fly, then $1 + 1 = 2$" would be misjudged as false. To say "the two things stand or fall together", use $\leftrightarrow$.

**Why must a minterm contain "each variable exactly once"**: this is the key to uniqueness of the normal form. If variables could be omitted, both $p$ and $p \wedge (q \vee \neg q)$ would be "candidate minterms", the same formula would have several "normal forms", and table comparison would lose its unique standard. Likewise "distinct minterms" is required because by idempotence repeated terms do not change the truth value and are redundant.

**Why can "valid inference" be reduced to "tautology checking"**: valid inference says "there is no counterexample assignment", i.e. "the conjunction of premises true while the conclusion is false" never happens, which is exactly "premises conjunction $\to$ conclusion" being always true. So every inference problem is translated into one question: is this implication a tautology?

**Why define formulas recursively, and bother with precedence and parentheses**: the recursive definition guarantees that "what counts as a formula" does not depend on anyone's feel for language—any legitimate formula can be traced step by step back to atomic propositions, ruling out pseudo-formulas that merely "read like" formulas. Precedence and parentheses guarantee a unique assembly order: $p \wedge q \vee r$ equals $(p \wedge q) \vee r$ because "conjunction binds tighter"; without the convention the same string would admit several readings and mechanical checking would be impossible. That $n$ variables give $2^n$ assignments is also a direct consequence of the recursive definition: each variable independently takes true or false, and the numbers of choices multiply.

## 4. Intuition and Pictures

**Circuit analogy**: switches in series are conjunction (current flows only when all close), switches in parallel are disjunction (at least one path), and a single-pole double-throw switch is negation. Propositional logic is the ancestor of Boolean algebra, and the AND, OR and NOT gates in a CPU are its physical embodiment. Studying propositional logic is studying the "thinking hardware" of computers.

**An implication is a written promise**: $p \to q$ does not guarantee that $p$ occurs, nor does it guarantee what causes $q$; it says only "if $p$ is true then $q$ must be true". Hence a proposition is not equivalent to its converse $q \to p$, but is equivalent to its contrapositive $\neg q \to \neg p$.

**Truth-table quick reference**:

| $p$ | $q$ | $\neg p$ | $p \wedge q$ | $p \vee q$ | $p \to q$ | $p \leftrightarrow q$ |
|---|---|---|---|---|---|---|
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

**The "subscript notation" for PDNF**: with 3 variables, read each assignment as a binary number with $p$ as the most significant bit. The assignment $(1, 0, 1)$ corresponds to the minterm $p \wedge \neg q \wedge r$, written $m_5$. So "find the PDNF" compresses into one sentence: **collect the indices of the rows in which the truth table is true**. The index sets of the PDNF and the PCNF split $0$ to $2^n - 1$ in two and are complements of each other.

**Right-versus-wrong table**:

| Everyday phrasing | What logic actually says |
|---|---|
| "or" means one of the two | $\vee$ is inclusive or; both true still counts as true |
| "if $p$ then $q$" suggests causation | No causation is required, only a truth-value promise |
| "$p$ or $q$ does not hold" means neither holds | It means "not at least one true", i.e. both are false |

**Turning a formula into a circuit**: replace each connective by the corresponding logic gate and the formula becomes a circuit diagram; a tautology is "a circuit whose output is always 1". This also explains why digital circuits are naturally suited to logical operations—the truth table is the circuit's specification and formula simplification is circuit optimization.

## 5. Worked Examples

### Example 1 (Basic: deciding whether an inference is valid)

Problem: decide whether this inference is valid: "if today is Wednesday, the library is open; the library is not open; therefore today is not Wednesday."

Analysis: let $p$: today is Wednesday, $q$: the library is open. The premises are $p \to q$ and $\neg q$, and the conclusion is $\neg p$. It suffices to write the four-row truth table for $p, q$ and check whether the conclusion is true in every row where all premises are true.

Solution:

| $p$ | $q$ | $p \to q$ | $\neg q$ | Premise conjunction $(p \to q) \wedge \neg q$ | Conclusion $\neg p$ |
|---|---|---|---|---|---|
| T | T | T | F | F | F |
| T | F | F | T | F | F |
| F | T | T | F | F | T |
| F | F | T | T | T | T |

Only the fourth row has a true premise conjunction, and there the conclusion $\neg p$ is also true; there is no counterexample row, so the inference is **valid**. This is exactly **modus tollens**: $(p \to q) \wedge \neg q \Rightarrow \neg p$.

### Example 2 (Intermediate: finding the PDNF and PCNF)

Problem: find the principal disjunctive and conjunctive normal forms of $A = (p \wedge q) \vee (\neg p \wedge r)$.

Analysis: three variables give 8 assignments. Compute the truth value row by row; true rows contribute a disjunction of the corresponding minterms, false rows a conjunction of the corresponding maxterms.

Solution: computing row by row, the true assignments are $001, 011, 110, 111$ and the false ones are $000, 010, 100, 101$.

The minterm notation $m_i$ numbers each assignment as binary ($p$ most significant):

$$m_1 = \neg p \wedge \neg q \wedge r, \quad m_3 = \neg p \wedge q \wedge r, \quad m_6 = p \wedge q \wedge \neg r, \quad m_7 = p \wedge q \wedge r$$

$$A = m_1 \vee m_3 \vee m_6 \vee m_7$$

Maxterms negate every variable of the assignment:

$$M_0 = p \vee q \vee r, \quad M_2 = p \vee \neg q \vee r, \quad M_4 = \neg p \vee q \vee r, \quad M_5 = \neg p \vee q \vee \neg r$$

$$A = M_0 \wedge M_2 \wedge M_4 \wedge M_5$$

Check: substitute the false assignment $101$ (i.e. $p = 1, q = 0, r = 1$) into the PCNF: $M_5 = \neg p \vee q \vee \neg r = 0 \vee 0 \vee 0 = 0$, so the conjunction is 0, matching the truth value of $A$; and substituting the true assignment $110$ makes all four maxterms 1, so the conjunction is 1, again correct. Note that the PDNF indices $\{1, 3, 6, 7\}$ and the PCNF indices $\{0, 2, 4, 5\}$ exactly partition 0 to 7 and are complements.

### Example 3 (Advanced: a widespread fallacy)

Problem: someone argues: "if you study hard, you will pass the exam; Xiaoming passed the exam; therefore Xiaoming studied hard." Is this inference valid?

Analysis: let $p$: Xiaoming studied hard, $q$: Xiaoming passed. The form is $(p \to q) \wedge q \Rightarrow p$, called **affirming the consequent**. To decide validity, look for a counterexample row.

Solution:

| $p$ | $q$ | $p \to q$ | Premise $(p \to q) \wedge q$ | Conclusion $p$ |
|---|---|---|---|---|
| T | T | T | T | T |
| T | F | F | F | T |
| F | T | T | T | F |
| F | F | T | F | F |

In the third row, $p = \mathrm{F}$ and $q = \mathrm{T}$: he did not study hard yet still passed (the exam was unusually easy, say), and here the premises are all true while the conclusion is false. **A counterexample row exists, so the inference is invalid.**

Comment: the trap is that "the conclusion sounds reasonable". In daily life we assume "effort is the only cause of passing", so it feels self-evident; but logically "passing" could perfectly well result from an easy exam, luck or other causes. Validity looks only at form, not at plausibility. To make the argument valid one must add the premise "only by studying hard can one pass" (i.e. $q \to p$); alternatively "he did not pass, therefore he did not study hard" is valid modus tollens.

## 6. Common Mistakes and Pitfalls

1. **Mistake**: believing $p \to q$ and $q \to p$ are equivalent. **Why it is wrong**: their truth tables differ; "if it is a cat it is a mammal" is true, "if it is a mammal it is a cat" is false. **Correct**: a proposition is equivalent only to its contrapositive $\neg q \to \neg p$.
2. **Mistake**: reading "or" as exclusive or. **Why it is wrong**: $\vee$ is inclusive; $p \vee q$ is still true when both hold. **Correct**: to express one-of-two, write $(p \vee q) \wedge \neg(p \wedge q)$.
3. **Mistake**: omitting or repeating minterms when computing a PDNF. **Why it is wrong**: omission changes the truth function, and repetition, though harmless to the truth value, violates the "distinct minterms" convention. **Correct**: tick row by row against the truth table and verify the index set against the true rows.
4. **Mistake**: computing $\neg(p \wedge q)$ as $\neg p \wedge \neg q$. **Why it is wrong**: "not (raining and windy)" means "not raining or not windy". **Correct**: use De Morgan, $\neg(p \wedge q) = \neg p \vee \neg q$; on entering the bracket the connective flips and the symbol swaps.
5. **Mistake**: simplifying by "what looks right". **Why it is wrong**: every step must rest on a stated equivalence, otherwise errors are almost certain. **Correct**: cite the equivalence used at each step, and fall back on the truth table when unsure.
6. **Mistake**: writing a truth table "and stopping there", without checking row by row. **Why it is wrong**: with many variables it is easy to slip a row, and a single typo can flip "valid" into "invalid". **Correct**: compute column by column and align them; for complex formulas compute subformulas first and then combine.

## 7. Summary and Mnemonic

Key points:
- Propositions care only about truth values; the five connectives generate every compound proposition, and $p \to q$ is false in exactly one case, "true antecedent, false consequent".
- De Morgan's laws and the implication equivalence $p \to q = \neg p \vee q$ are the two pillars of all simplification.
- Every formula has a unique PDNF and PCNF; the PDNF takes the true rows of the truth table and the PCNF the false ones.
- Valid inference is equivalent to "premises conjunction $\to$ conclusion" being a tautology; a single counterexample refutes it.
- Propositional logic is the language of Boolean algebra and the thinking hardware of computer circuits.

**Mnemonic: two truth values rule the world, five connectives build the frame, De Morgan holds it together; disjoin the true rows, conjoin the false, and the table tells you true from false.**

`,
    keyPoints: [
      'The implication p→q is false only in the case "true antecedent, false consequent"',
      'De Morgan\u2019s laws and p→q = ¬p∨q are the two pillars of simplification',
      'The PDNF takes the true rows of the truth table; the PCNF takes the false rows',
      'Valid inference ⟺ the conjunction of premises implying the conclusion is a tautology',
    ],
  },
  'predicate-logic': {
    chapter: 'Chapter 2 Predicate Logic',
    title: 'Predicate Logic and Quantifier Reasoning',
    summary:
      'A microscope for propositional logic: individuals, predicates and quantifiers, so that even "for every ε there exists δ" can be rigorously symbolized.',
    content: String.raw`

Aristotle's syllogism has circulated for two thousand years: "all men are mortal; Socrates is a man; therefore Socrates is mortal." Nobody has doubted it. But consider: with the tools of propositional logic this inference cannot be represented at all! "All men are mortal" is not an atomic proposition—inside it there is a subject, a quantifier and a statement about individuals. Propositional logic is blind to the internal structure of sentences and can only look on helplessly.

This blind spot is fatal in mathematics. Mathematical theorems are almost all of the form: "for every $\varepsilon > 0$ there exists $\delta > 0$ such that whenever $|x - a| < \delta$ we have $|f(x) - f(a)| < \varepsilon$." Without quantifiers and predicates one cannot even write the definition of a limit, let alone judge whether an inference is correct. The motivating question of this chapter: **how do we symbolize sentences like "all" and "some" while retaining the ability to check them mechanically?**

The answer is predicate logic (first-order logic): split a sentence into "individuals + predicates + quantifiers". Once you have learned it you will find that symbolizing mathematical statements suddenly follows rules like stacking blocks, and that the two rules "rename carefully, substitute cautiously" steer you away from the pitfalls beginners fall into most often.

In the syllabus, propositional logic answers "how are sentences assembled" and predicate logic answers "what do the sentences say": the former is syntax, the latter syntax plus semantics. You have not really learned the language of mathematics until you can write the symbolic form of "for every $\varepsilon$ there exists $\delta$"; and you have not turned that language into a reliable tool until you can judge the validity of quantified reasoning.

## 2. Rigorous Definitions

**Individual terms**: the objects being discussed. **Individual constants** are specific objects (such as $a$: Socrates, $0$: zero); **individual variables** are placeholders (such as $x, y$). The range of the variables is the **domain of discourse**, denoted $D$.

**Predicates**: expressions describing properties of or relations between individuals. $P(x)$ means "$x$ is mortal" and $L(x, y)$ means "$x$ loves $y$". An $n$-ary predicate has a truth value only after $n$ individuals are supplied.

**Quantifiers**:
- The **universal quantifier** $\forall x$: every $x$ in the domain;
- The **existential quantifier** $\exists x$: at least one $x$ in the domain.

**Propositional function**: $P(x)$ has no truth value until $x$ is specified and is called a propositional function (open sentence); only when a quantifier is added (as in $\forall x\, P(x)$) or a constant is substituted (as in $P(a)$) does it become a proposition.

**Scope**: a quantifier governs only the smallest complete subformula immediately following it, and this range is its scope. By convention $\forall x\, A \wedge B$ means $(\forall x\, A) \wedge B$, so $x$ binds only in $A$; to extend the scope you must add parentheses: $\forall x\, (A \wedge B)$. Marking out the scope first is the most important reflex when reading a formula.

**Inductive definition of first-order formulas**:
1. Atomic formulas: an $n$-ary predicate filled with $n$ terms;
2. If $A$ is a formula, so is $\neg A$;
3. If $A, B$ are formulas, so are $(A \wedge B)$, $(A \vee B)$, $(A \to B)$, $(A \leftrightarrow B)$;
4. If $A$ is a formula and $x$ a variable, then $\forall x\, A$ and $\exists x\, A$ are formulas;
5. Only what is obtained by finitely many applications of the above is a formula.

**Bound and free occurrences**: an $x$ inside the scope of $\forall x\, A$ or $\exists x\, A$ is a **bound occurrence**; an occurrence not bound by any quantifier is **free**. A formula with no free variables is a **sentence** and has a definite truth value. For example, in $\forall x\, (P(x) \to Q(x, y))$ the variable $x$ is bound and $y$ is free.

**Renaming rule**: a bound variable may be renamed throughout, $\forall x\, A(x) = \forall z\, A(z)$, provided $z$ does not already occur in $A$—this prevents **variable capture**.

Two contrasting examples: in $\forall x\, (P(x) \to \forall y\, R(x, y))$ both $x$ and $y$ are bound, there are no free variables, and it is a sentence with a definite truth value; in $\forall x\, (P(x) \to Q(x, y))$ the variable $y$ is free, and the formula is like a machine "waiting for $y$ to be supplied"—different values of $y$ give different truth values.

**Substitution rule**: replace every free occurrence of $x$ in $A$ by the term $t$, requiring that no variable of $t$ becomes bound by a quantifier of $A$.

**Prenex normal form**: an equivalent form in which all quantifiers are moved to the front of the formula.

**Quantifier negation laws**:

$$\neg \forall x\, A = \exists x\, \neg A, \qquad \neg \exists x\, A = \forall x\, \neg A$$

## 3. Why Define It This Way

**Why distinguish bound from free variables**: a bound variable is a "local variable", like a loop index in a program, and renaming it changes nothing; a free variable is an "external interface", and renaming it changes which object is meant. Confusing the two is the chief source of errors in quantified reasoning.

**Why have both the renaming and substitution rules**: together they prevent variable capture. For example, $\exists y\, (x < y)$ is true (every real number has a larger one), but replacing the free variable $x$ by $y$ gives $\exists y\, (y < y)$, deriving a false statement from a true one. The rules require renaming the bound variable out of the way first, and then substituting.

**Why can quantifiers not be replaced by finitely many $\wedge$, $\vee$**: when the domain is infinite (the natural numbers, say), $\forall x\, P(x)$ amounts to an infinitely long conjunction, which can be neither written down nor checked. Quantifiers are the tool for compressing infinite information, and that is exactly why they can express "every natural number has a certain property".

**Why can quantifiers not be swapped at will**: $\forall x \exists y\, L(x, y)$ says "everyone loves someone (possibly a different someone)", whereas $\exists y \forall x\, L(x, y)$ says "there is one person loved by everyone"—far stronger. Quantifiers are "switches with an order".

**Why must "all $S$ are $P$" be written $\forall x\, (S(x) \to P(x))$**: a universal sentence is essentially a conditional—"if it is $S$, then it is $P$"—which holds vacuously for individuals that are not $S$. Written as $\forall x\, (S(x) \wedge P(x))$, it would assert that everything in the domain is $S$, which is entirely wrong.

**Why watch the scope, distinguishing $\forall x\, (A \to B)$ from $(\forall x\, A) \to B$**: the former says "for every $x$, if $A(x)$ then $B(x)$", with $B$ inside the scope of the quantifier; the latter treats "all $x$ satisfy $A$" as a single premise. If $x$ occurs free in $B$, the latter is not even a well-formed formula ($x$ dangles); even when well formed, the meaning is completely different. Scope determines meaning, and parentheses are not decoration.

**Why must renaming and substitution be two separate rules**: renaming acts on bound variables (local variables) and substitution on free variables (external inputs); neither replaces the other. Learning only one and forgetting the other leads to steps in proofs that look symmetric but are illegal. Compare with programming languages: renaming is like alpha-conversion and substitution like binding an actual argument; compilers rely on exactly these two rules to keep "names" from bleeding into each other.

## 4. Intuition and Pictures

**The universal quantifier is a census taker, the existential quantifier a witness**. To prove $\forall x\, P(x)$ you must "take an arbitrary $x$ and prove $P(x)$"; one missed case ruins everything. To prove $\exists x\, P(x)$ you need only construct one witness. Conversely, **refuting a universal claim needs only one counterexample** ($\neg \forall x\, P = \exists x\, \neg P$), while **refuting an existential claim requires checking everything** ($\neg \exists x\, P = \forall x\, \neg P$). This asymmetry runs through all of mathematics.

**Comparison of quantifier orders**:

| Formula | Reading | Plain-language gloss |
|---|---|---|
| $\forall x \exists y\, L(x, y)$ | For every $x$ there is some $y$ | Everyone carries someone in their heart |
| $\exists y \forall x\, L(x, y)$ | There is some $y$ for every $x$ | A universal heartthrob, loved by all |
| $\exists x \exists y\, L(x, y)$ | There is $x$ and there is $y$ | At least one pair of lovers exists |
| $\forall x \forall y\, L(x, y)$ | For all $x$ and all $y$ | Everyone in the world loves everyone |

**The renaming metaphor**: renaming a bound variable is like renaming a local variable inside a function—behaviour is unchanged; carelessly renaming a free variable is like secretly renaming a global variable—the program immediately goes out of control.

**Right-versus-wrong table**:

| Formula | Meaning | When true |
|---|---|---|
| $\neg \forall x\, P(x)$ | Not everyone passed | Someone failed |
| $\forall x\, \neg P(x)$ | Everyone failed | All failed |
| $\neg \exists x\, P(x)$ | Nobody passed | All failed |
| $\exists x\, \neg P(x)$ | Someone failed | At least one failed |

A one-character difference, a world of difference in meaning. $\neg \forall x\, P$ means the same as $\exists x\, \neg P$, and $\neg \exists x\, P$ means the same as $\forall x\, \neg P$; these two pairs must become muscle memory.

**Translating between quantifiers and sets**: $\forall x \in S\, P(x)$ can be written $\forall x\, (x \in S \to P(x))$; $\exists x \in S\, P(x)$ can be written $\exists x\, (x \in S \wedge P(x))$. Note that restricting the domain translates to an implication inside a universal quantifier and to a conjunction inside an existential one—structurally identical to the form of "all $S$ are $P$", the same logic in two costumes. Converting restricted quantifiers into standard unrestricted ones is a basic exam skill.

## 5. Worked Examples

### Example 1 (Basic: symbolizing and verifying a syllogism)

Problem: symbolize "all men are mortal; Socrates is a man; therefore Socrates is mortal" and verify that the inference is valid.

Analysis: let the domain be "men". $M(x)$: $x$ is a man; $D(x)$: $x$ is mortal; $a$: Socrates.

Solution: premises: $\forall x\, (M(x) \to D(x))$ and $M(a)$; conclusion: $D(a)$. The derivation:

1. $\forall x\, (M(x) \to D(x))$, premise (universal instantiation: it holds for any individual in the domain, hence for $a$);
2. $M(a) \to D(a)$, by universal instantiation on step 1, replacing $x$ by the constant $a$;
3. $M(a)$, premise;
4. $D(a)$, by modus ponens from steps 2 and 3.

Every step uses a rule already validated in propositional logic, plus one new key, "universal instantiation". **Answer to the motivating question**: this is the skeleton most used in mathematical proofs—applying a general law to a specific object.

### Example 2 (Intermediate: negation and prenex normal form)

Problem: find the prenex normal form of $\neg \forall x\, \big(P(x) \to \exists y\, Q(x, y)\big)$.

Analysis: work from the outside in, applying De Morgan's laws and the quantifier negation laws, citing the justification at each step.

Solution:

$$\neg \forall x\, \big(P(x) \to \exists y\, Q(x, y)\big) = \exists x\, \neg \big(P(x) \to \exists y\, Q(x, y)\big)$$

by the quantifier negation law $\neg \forall x\, A = \exists x\, \neg A$.

$$= \exists x\, \big(P(x) \wedge \neg \exists y\, Q(x, y)\big)$$

by the implication equivalence $p \to q = \neg p \vee q$, negated to give $\neg(p \to q) = p \wedge \neg q$.

$$= \exists x\, \big(P(x) \wedge \forall y\, \neg Q(x, y)\big)$$

by the quantifier negation law $\neg \exists y\, A = \forall y\, \neg A$.

Finally move the quantifiers in the conjuncts to the front ($x$ and $y$ have different names and do not clash):

$$\neg \forall x\, \big(P(x) \to \exists y\, Q(x, y)\big) = \exists x\, \forall y\, \big(P(x) \wedge \neg Q(x, y)\big)$$

Note that the prefix $\exists x \forall y$ cannot be swapped to $\forall y \exists x$: the original says "there is some $x$ such that for all $y$, not $Q$"; the swapped version says "for every $y$ one can find (possibly a different) $x$ with not $Q$"—different meanings.

### Example 3 (Advanced: the trap of distributing a quantifier)

Problem: decide whether the following is universally valid (true for every domain and every predicate):

$$\forall x\, \big(P(x) \vee Q(x)\big) \;\to\; \big(\forall x\, P(x) \vee \forall x\, Q(x)\big)$$

Analysis: the left side sounds like "everyone knows at least one of the two", the right like "either everyone knows $P$ or everyone knows $Q$"—the intuition already falters. To refute it, it suffices to give a domain and an assignment making the premise true and the conclusion false.

Solution: take the domain $D = \{1, 2\}$ and let $P(1) = \mathrm{T}, P(2) = \mathrm{F}, Q(1) = \mathrm{F}, Q(2) = \mathrm{T}$: person 1 knows $P$ but not $Q$, person 2 knows $Q$ but not $P$.

The premise $\forall x\, (P(x) \vee Q(x))$: for $x = 1$, $P(1) = \mathrm{T}$; for $x = 2$, $Q(2) = \mathrm{T}$; both true, so the premise holds.

The conclusion $\forall x\, P(x) \vee \forall x\, Q(x)$: $\forall x\, P(x)$ is false (since $P(2)$ is false) and $\forall x\, Q(x)$ is false (since $Q(1)$ is false), so the disjunction is false.

Premise true, conclusion false: **the formula is invalid**. Where is the trap? $\vee$ does not distribute over $\forall$! $\forall x\, (P \vee Q)$ says only "everyone knows a little of something"; $\forall P \vee \forall Q$ demands "everyone specializes in the same thing", far stronger. Symmetrically, $\exists$ does not distribute over $\wedge$: one cannot infer "someone knows both" from "someone knows $P$ and someone knows $Q$"; but $\exists x\, (P \wedge Q)$ does imply $(\exists x\, P) \wedge (\exists x\, Q)$ (a single witness supports both conclusions).

## 6. Common Mistakes and Pitfalls

1. **Mistake**: writing $\neg \forall x\, P(x)$ as $\forall x\, \neg P(x)$. **Why it is wrong**: "not everyone passed" (someone failed) is not "everyone failed". **Correct**: $\neg \forall x\, P = \exists x\, \neg P$; when negating, $\forall$ and $\exists$ swap.
2. **Mistake**: writing "all $S$ are $P$" as $\forall x\, (S(x) \wedge P(x))$. **Why it is wrong**: the conjunctive version asserts that everything in the domain is $S$. **Correct**: the standard form is $\forall x\, (S(x) \to P(x))$.
3. **Mistake**: renaming a bound variable to a name already in use. **Why it is wrong**: renaming $x$ to $y$ in $\forall x \exists y\, (x < y)$ gives $\forall y \exists y\, (y < y)$, which means something else entirely and is false. **Correct**: rename to a fresh variable and rename consistently within the scope.
4. **Mistake**: substituting without checking for capture. **Why it is wrong**: replacing the free variable $x$ by $y$ in $\exists y\, (x < y)$ gives $\exists y\, (y < y)$, turning a true statement into a false one. **Correct**: first rename the bound variable away from $y$ to get $\exists z\, (x < z)$, then substitute to get $\exists z\, (y < z)$.
5. **Mistake**: treating $P(x)$ as a proposition and asking whether it is true. **Why it is wrong**: with $x$ unspecified $P(x)$ is a propositional function with no truth value. **Correct**: quantify it first ($\forall x\, P(x)$) or substitute a constant ($P(a)$).
6. **Mistake**: proving an existential statement by saying "clearly there is one" without constructing it. **Why it is wrong**: the legitimacy of $\exists$ rests on "exhibiting an instance", and a constructive proof is the baseline of mathematical honesty. **Correct**: write down the constructed $x_0$ explicitly and then verify $P(x_0)$; both steps are required.

## 7. Summary and Mnemonic

Key points:
- Predicate logic = propositional logic + individuals, predicates, quantifiers; mathematical statements can now be rigorously symbolized.
- Free variables are "interfaces" and bound variables are "local variables"; both renaming and substitution must avoid capture.
- Quantifier negation laws: $\neg \forall = \exists \neg$ and $\neg \exists = \forall \neg$: negation moves inward.
- Quantifier order cannot be swapped freely; neither $\forall$ nor $\exists$ distributes over $\vee$ or $\wedge$.
- The standard form of "all $S$ are $P$" is $\forall x\, (S(x) \to P(x))$.

**Mnemonic: universal takes an arbitrary one, existential builds a witness; negating a quantifier swaps it; keep free and bound apart, and careless renaming will trap you.**

`,
    keyPoints: [
      'Quantifiers compress infinite information: ∀x P(x) is an infinitely long conjunction',
      'Negating quantifiers uses De Morgan: ¬∀ becomes ∃¬, ¬∃ becomes ∀¬',
      'Bound variables may be renamed; substituting a free variable must avoid capture',
      '∀∃ order cannot be swapped; quantifiers do not distribute over ∨/∧',
      '"All S are P" is written ∀x(S(x)→P(x)), not as a conjunction',
    ],
  },
  'sets-relations': {
    chapter: 'Chapter 3 Sets and Relations',
    title: 'Sets, Relations and Functions',
    summary:
      'The common bedrock of mathematics: a set is determined by its elements, five properties pin down a relation, equivalence relations correspond one-to-one with partitions, and a function is a special single-valued relation.',
    content: String.raw`

In 1901 Russell dropped a bomb on the naive set theory of the day, which held that "any condition whatsoever collects a set": let $R$ be "the set of all sets that do not contain themselves". Then $R \in R$ if and only if $R \notin R$—a contradiction in one sentence. The paradox tells us that sets are the bedrock of mathematics, and that two bottom lines must be defended—"determined uniquely by its elements" and "conditions may not be combined freely"—or the whole edifice collapses. Today, numbers, functions, spaces and every other mathematical object reduce in the end to sets.

The other big topic of this chapter is "relations". A course-enrolment table in a registrar's system and the call log on a phone are both, in essence, relations between two sets. And a function—familiar since school—is in the language of set theory merely "a special relation assigning exactly one output to each input". Once relations are clear, equivalence, classification, order and functions all line up in a single chain.

The motivating question: given an arbitrary relation ("knows", "divides", "is congruent to"), how do we quickly decide whether it is an equivalence relation? And if it is, how do we automatically sort the elements into classes? This is exactly what the theorem "equivalence relations correspond one-to-one with partitions" answers, demonstrated in full in the fifth section's example.

Why do relations deserve a chapter of their own? Because they answer one of the commonest questions in mathematics: is there a connection between two objects? Equivalence, quotient sets, classification, order and functions are all special cases or extensions of relations. Set theory gives mathematics its nouns; relation theory gives it its verbs.

## 2. Rigorous Definitions

**Sets and membership**: a set is determined uniquely by its elements (extensionality). $a \in A$ means $a$ is an element of $A$. Common number sets: $\mathbb{N}$ (natural numbers), $\mathbb{Z}$ (integers), $\mathbb{Q}$ (rationals), $\mathbb{R}$ (reals), $\mathbb{C}$ (complex numbers).

**Subsets and equality**: $A \subseteq B \iff \forall x\, (x \in A \to x \in B)$. $A = B \iff A \subseteq B$ and $B \subseteq A$. The empty set $\varnothing$ is a subset of every set.

**Power set**: the set of all subsets of $A$, written $\mathcal{P}(A)$, with $|\mathcal{P}(A)| = 2^{|A|}$.

**Operations**: union $A \cup B$, intersection $A \cap B$, difference $A \setminus B$, complement $\overline{A}$ (the universal set $U$ must be specified first), symmetric difference $A \triangle B$.

These operations satisfy commutative, associative and distributive laws and De Morgan's laws, for example $\overline{A \cup B} = \overline{A} \cap \overline{B}$. When learning them, keep three descriptions aligned: a symbol, a Venn diagram and a natural-language reading—the picture of $A \setminus B$ is "the part only in $A$", and the natural language is "in $A$ but not in $B$". Once the three agree, set-identity exercises become translation exercises.

**Cartesian product**: $A \times B = \{(a, b) : a \in A, b \in B\}$, with cardinality $|A \times B| = |A| \cdot |B|$.

**Relation**: a subset $R$ of $A \times B$ is a binary relation from $A$ to $B$, and $(a, b) \in R$ is often written $aRb$; when $A = B$ it is a relation on $A$. The five basic properties (with $R$ a relation on $A$):

| Property | Definition |
|---|---|
| Reflexive | $\forall x \in A,\ xRx$ |
| Irreflexive | $\forall x \in A,\ \neg(xRx)$ |
| Symmetric | $\forall x, y \in A,\ xRy \to yRx$ |
| Antisymmetric | $\forall x, y \in A,\ (xRy \wedge yRx) \to x = y$ |
| Transitive | $\forall x, y, z \in A,\ (xRy \wedge yRz) \to xRz$ |

**Equivalence relation**: a relation that is reflexive, symmetric and transitive. The equivalence class is $[a] = \{x \in A : xRa\}$. A **partition** splits $A$ into nonempty, pairwise disjoint subsets whose union is $A$.

**Partial order**: a reflexive, antisymmetric, transitive relation, written $(A, \preceq)$. When every two elements are comparable it is a **total order**. Related notions: maximal and minimal elements, greatest and least elements, upper and lower bounds.

"Comparable" means the two elements are related in at least one direction; incomparable pairs appear in a Hasse diagram as "not lying on the same descending path". The usual order on the reals is total (any two numbers are comparable), whereas divisibility on $\{2, 3\}$ is not—the richness of partially ordered sets comes precisely from such pairs that "have nothing to do with each other".

**Function**: $f : A \to B$ is a relation satisfying "for every $x \in A$ there is a unique $y \in B$ with $(x, y) \in f$". **Injective** (distinct inputs have distinct images), **surjective** (every element of $B$ is an image), **bijective** (both). Only a bijection has an inverse $f^{-1}$. Composition $(g \circ f)(x) = g(f(x))$.

## 3. Why Define It This Way

**Why is a set determined by its elements (extensionality)**: a set in set theory has no property of "how it is described"; $\{1, 2\}$ and "the positive integers not exceeding 2" are the same set. If the same elements could form "different" sets, equality would lose its meaning. The root of Russell's paradox is exactly "unrestricted comprehension"; later axiomatic set theory repaired it with a **restricted form of the comprehension axiom** (the separation schema): one may only "sift" subsets out of existing sets, not conjure sets out of thin air.

**Why does antisymmetry look like that**: it says only "if both directions hold, the two ends must be equal", and does not forbid one direction on its own. Divisibility is typical: $2 \mid 6$ holds while $6 \mid 2$ does not, perfectly legitimate; only when $a \mid b$ and $b \mid a$ is $a = b$ forced. If the definition were changed to "distinct elements may not be related either way", that would be irreflexivity plus symmetry, killing many important relations (divisibility, inclusion).

**Why does transitivity need all three parties**: transitivity is a chain reaction: $aRb$ and $bRc$ imply $aRc$. Without it, "a friend of a friend" need not be a friend, equivalence classes shatter into sand, and the partition theorem has nothing to stand on.

**Why do equivalence relations correspond one-to-one with partitions**: equivalence classes automatically give a partition (elements in the same class are related, elements in different classes are not); conversely, given a partition, stipulating "related exactly when in the same class" automatically satisfies reflexivity, symmetry and transitivity. Both routes work, so either side may be taken as the definition and the other derived—hence the word "equivalence".

**Why must a function be "unique"**: a function is a single-valued relation. "Square root" as a relation sends $4$ to $\pm 2$ and is not a function; the arithmetic square root is. Uniqueness guarantees "the same input always gives the same output", which is what lets a function be tabulated, graphed and composed.

**Why does the transitivity definition look at three steps yet govern chains of any length**: the definition involves only $x, y, z$, but mathematical induction extends it to chains of any length: if $a R a_1, a_1 R a_2, \dots, a_{k-1} R a_k$, then $a R a_k$. What lets equivalence classes be genuinely separate, and quotient sets make sense, is exactly this indefinitely extendable property. Without it a chain breaks after two steps and classification is impossible.

## 4. Intuition and Pictures

**Venn diagrams**: the union is the total shaded area of two circles, the intersection the overlap, the difference the part belonging only to $A$, and the complement the part outside the circle. All the laws (commutative, associative, distributive, De Morgan) can be "seen" in the picture.

**Relation matrices**: write the relation as a 0-1 matrix with $R_{ij} = 1$ meaning $a_i R a_j$. Reflexive = all diagonal entries 1; symmetric = the matrix is symmetric about the diagonal; antisymmetric = symmetric positions cannot both be 1 (except on the diagonal); transitive = the Boolean square of the matrix is "covered" by the original. Reading the matrix is less error-prone than reciting definitions.

**The plate picture of equivalence classes**: think of $A$ as a pile of beans; an equivalence relation sorts them onto plates, each plate an equivalence class, with no overlap and no bean left out. That is a partition.

**Hasse diagrams of partial orders**: draw larger elements above, drawing only "covering" relations (no third element in between); then $a \preceq b$ holds exactly when you can descend from $a$ to $b$ along the lines (possibly through intermediate points). An abstract order becomes a picture you can look at.

**Right-versus-wrong table**:

| Claim | Right or wrong |
|---|---|
| $2 \subseteq \{1, 2\}$ | Wrong; $2$ is an element, so write $2 \in \{1, 2\}$ |
| $\varnothing \subseteq A$ | Right; the empty set is a subset of every set |
| $\varnothing \in \mathcal{P}(A)$ | Right; the empty set is a subset of $A$ and therefore an element of the power set |
| $A \subseteq \mathcal{P}(A)$ | Generally wrong; elements and subsets are two levels and must not be mixed |
| $\{1, 2\}$ and $\{2, 1\}$ are different | Wrong; a set is unordered, so they are the same |

**The relational view of a graph of a function**: regard the graph in the plane as a set of points; it is the most intuitive relation—"each $x$ corresponds to a unique $y$" is equivalent to "any vertical line meets the graph at most once". This is the set-theoretic basis of the vertical line test taught at school, and it shows that functions are nothing mysterious: they are relations with a "single-valued" constraint imposed.

## 5. Worked Examples

### Example 1 (Basic: verifying an equivalence relation and finding the classes)

Problem: on $\mathbb{Z}$ define $aRb \iff a \equiv b \pmod{3}$. Prove that $R$ is an equivalence relation and write down all equivalence classes.

Analysis: verify the three properties of an equivalence relation one by one; the classes split into three according to the remainder modulo 3.

Solution: reflexivity: for every $a \in \mathbb{Z}$, $a - a = 0$ is divisible by 3, so $aRa$.

Symmetry: if $aRb$ then $3 \mid (a - b)$, hence $3 \mid (b - a)$, so $bRa$.

Transitivity: if $aRb$ and $bRc$ then $a - b = 3m$ and $b - c = 3n$ (with $m, n \in \mathbb{Z}$); adding gives $a - c = 3(m + n)$, so $aRc$.

$R$ is an equivalence relation. The classes split into three according to remainder:

$$[0] = \{\dots, -6, -3, 0, 3, 6, \dots\}, \quad [1] = \{\dots, -5, -2, 1, 4, 7, \dots\}, \quad [2] = \{\dots, -4, -1, 2, 5, 8, \dots\}$$

The three classes are pairwise disjoint with union $\mathbb{Z}$—exactly a partition, corresponding one-to-one with the equivalence relation. **Answer to the motivating question**: to recognize an equivalence relation check these three properties; to find the classes, sort the elements by remainder (or by "mutual reachability within a class").

### Example 2 (Intermediate: maximal versus greatest elements in a poset)

Problem: on $S = \{1, 2, 3, 4, 6, 12\}$ define the divisibility relation $a \preceq b \iff a \mid b$. Verify that it is a partial order, draw the Hasse diagram, and find the maximal, minimal, greatest and least elements.

Analysis: verify the three properties of a partial order first; draw the Hasse diagram with "small below, large above, only covering relations". An element $a$ covers $b$ ($a$ above) when $b \mid a$ and there is no $c \in S$ with $b \mid c \mid a$ and $c \neq a, b$.

Solution: reflexivity: $a \mid a$. Antisymmetry: for positive integers, $a \mid b$ and $b \mid a$ force $a = b$. Transitivity: divisibility is clearly transitive. So it is a partial order.

Covering relations: $1$ is covered by $2, 3$ (the primes); $2$ is covered by $4, 6$; $3$ is covered by $6$; $4, 6$ are covered by $12$.

The Hasse diagram has four layers from bottom to top: bottom $\{1\}$; second layer $\{2, 3, 4\}$; third layer $\{6\}$; top layer $\{12\}$. Edges: $1$ to $2, 3$; $2$ to $4, 6$; $3$ to $6$; $4, 6$ to $12$.

Maximal elements: those not "pressed down" by any other element—only $12$, so the greatest element is also $12$. Minimal elements: $1$ (nothing is smaller), so the least element is also $1$.

Key reminder: if $12$ is removed from $S$, the maximal elements become $4$ and $6$, and now **there is no greatest element**. A greatest element must exceed everything (and is unique); maximal elements only require nothing above them (there may be several). The two notions must be kept apart.

### Example 3 (Advanced: composition of functions does not commute)

Problem: let $f(x) = 2x + 1$ and $g(x) = x^2$ (domain and codomain both $\mathbb{R}$). Find $g \circ f$ and $f \circ g$; decide whether $f$ and $g$ are injective or surjective; find $f^{-1}$.

Analysis: compose "inner first, then outer"; injectivity means "equal images imply equal preimages", surjectivity means "the range fills the codomain".

Solution: $(g \circ f)(x) = g(f(x)) = (2x + 1)^2 = 4x^2 + 4x + 1$.

$(f \circ g)(x) = f(g(x)) = 2x^2 + 1$.

Take $x = 1$: the former gives $9$, the latter $3$—unequal. **Composition of functions is not commutative**; it is only associative, $(h \circ g) \circ f = h \circ (g \circ f)$.

$f$ is injective: if $f(x_1) = f(x_2)$ then $2x_1 + 1 = 2x_2 + 1$, so $x_1 = x_2$. $f$ is surjective: for any $y \in \mathbb{R}$ take $x = \dfrac{y - 1}{2}$, then $f(x) = y$. So $f$ is a bijection.

Solving $y = 2x + 1$ gives $x = \dfrac{y - 1}{2}$, i.e. $f^{-1}(y) = \dfrac{y - 1}{2}$.

$g$ is not injective: $g(2) = g(-2) = 4$. Nor surjective: its range $[0, +\infty)$ is not all of $\mathbb{R}$. So $g$ is not a bijection and $g^{-1}$ does not exist (as a function). **Trap: a non-bijective function has no inverse function**; mechanically solving $y = x^2$ to get $x = \pm\sqrt{y}$ produces only an inverse relation, which fails the "unique" requirement.

## 6. Common Mistakes and Pitfalls

1. **Mistake**: mixing up $\in$ and $\subseteq$, writing $2 \subseteq \{1, 2\}$. **Why it is wrong**: $\in$ links an element to a set, $\subseteq$ links a set to a set. **Correct**: $2 \in \{1, 2\}$ and $\{2\} \subseteq \{1, 2\}$.
2. **Mistake**: believing $|\mathcal{P}(A)| = |A| + 1$. **Why it is wrong**: each element faces two fates, "chosen into the subset" or "not", so $n$ elements give $2^n$ combinations. **Correct**: $|\mathcal{P}(A)| = 2^{|A|}$.
3. **Mistake**: reading antisymmetry as "distinct elements may not be related in either direction". **Why it is wrong**: antisymmetry forbids only the two-way case for distinct elements; one direction is perfectly fine ($2 \mid 6$). **Correct**: check the definition $(xRy \wedge yRx) \Rightarrow x = y$.
4. **Mistake**: assuming a transitive relation must be reflexive or irreflexive. **Why it is wrong**: on the domain $\{1, 2\}$ let $R = \{(1, 1)\}$; it is transitive (no chain to continue) yet neither reflexive (missing $(2,2)$) nor irreflexive (it contains $(1,1)$). **Correct**: the five properties are independent; check each against its definition.
5. **Mistake**: treating maximal and greatest as synonyms. **Why it is wrong**: Example 2 shows a poset may have two maximal elements and no greatest element. **Correct**: a greatest element is unique (if it exists) and exceeds everything; maximal elements only need nothing above them.
6. **Mistake**: believing any subset is an equivalence class of some equivalence relation. **Why it is wrong**: an equivalence class must satisfy "related within, unrelated without", which a general subset does not—take $\{1, 2\}$ in $\mathbb{Z}$; 1 and 2 are not congruent mod 3 and so are not related. **Correct**: equivalence classes are determined solely by the relation; pick any element and its class is fixed.

## 7. Summary and Mnemonic

Key points:
- A set is determined by its elements; $\in$ and $\subseteq$ are two different levels of language and must not be mixed.
- Check the five properties of a relation one at a time against the definitions; an equivalence relation is reflexive + symmetric + transitive and corresponds one-to-one with a partition.
- A partial order has three properties: reflexive, antisymmetric, transitive; the Hasse diagram turns an abstract order into a picture.
- A function is a single-valued relation; injective + surjective = bijective, and only then is there an inverse; composition is associative but not commutative.

**Mnemonic: membership and inclusion are two different skies, three laws link equivalence to partitions; antisymmetry governs the two-way road, and only bijections have inverses.**

`,
    keyPoints: [
      'A set is determined by its elements (extensionality); the power set has size 2^n',
      'The five properties of a relation: reflexive/irreflexive/symmetric/antisymmetric/transitive, each checked against its definition',
      'Equivalence relation ⟺ reflexive + symmetric + transitive; equivalence classes give a partition',
      'Partial order = reflexive + antisymmetric + transitive; maximal ≠ greatest',
      'A function is a single-valued relation; only a bijection has an inverse; composition is not commutative',
    ],
  },
  'graphs': {
    chapter: 'Chapter 4 Foundations of Graph Theory',
    title: 'Graph Theory Basics and Trees',
    summary:
      'The discrete structure of vertices and edges: the handshake lemma, Euler circuits, Hamiltonian cycles and trees—from the seven bridges to counting spanning trees.',
    content: String.raw`

In 1736 Euler received a casual question from a citizen of Königsberg: the city has a river and two islands, with seven bridges linking the islands to the banks. Can one design a walking route that crosses every bridge exactly once and returns to the start? The citizens had tried for years without success, and Euler settled it with a startling abstraction: shrink the two banks and the two islands to four points, and the seven bridges to seven lines—**the length, straightness and position of the bridges are all irrelevant; only "who connects to whom" matters**. The question becomes: can this graph be drawn in one stroke? Euler gave a crisp criterion, and graph theory was born.

Two centuries later the same model rules the digital world: hyperlinks are graphs, social follows are graphs, delivery routes are graphs, molecular structures are graphs. The motivating question of this chapter: **what decides whether a graph can be "drawn in one stroke" (each edge once) and whether it can "tour all points once" (each vertex once)? Why is the former easy and the latter extremely hard?** By the end you will see that the former has a clean necessary and sufficient condition while the latter still has none—this asymmetry is itself the charm of graph theory.

Graph theory's appetite goes further. "Six degrees of separation" in social networks, internet routing protocols, de Bruijn graphs for genome assembly, control-flow graphs in compilers—all speak the same language. Learning to abstract a problem into "points and edges" is the most important weapon discrete mathematics offers.

## 2. Rigorous Definitions

**Graph**: $G = (V, E)$, where $V$ is the vertex set and $E$ the edge set, each edge joining two vertices. An edge whose endpoints coincide is a **loop**; several edges joining the same pair of vertices are **multiple edges**; a graph with no loops and no multiple edges is **simple**; a graph whose edges have directions is **directed**.

**Degree**: $d(v)$ is the number of edges incident with $v$, and **a loop counts twice**. In a directed graph one distinguishes the in-degree $d^-(v)$ and out-degree $d^+(v)$.

**The path family**: a sequence of successively adjacent vertices. A **trail**: a path with no repeated edges; a **path**: one with no repeated vertices (stronger); a closed walk whose start and end coincide is a **closed walk/cycle**; a closed walk with no repeated vertices except the endpoints is a **cycle**.

**Connected**: there is a path between any two vertices. A maximal connected subgraph is a **connected component**.

**Tree**: a connected acyclic undirected graph. A **spanning tree**: a spanning subgraph of $G$ that is itself a tree.

**Euler circuit / Euler trail**: a closed / non-closed path passing through every edge exactly once. A **Hamiltonian cycle**: a cycle passing through every vertex exactly once.

**Bipartite graph**: the vertices split into two parts with every edge crossing between them (equivalently, no odd cycles).

**The subgraph family**: a subgraph is obtained by deleting vertices and edges; a spanning subgraph deletes only edges, not vertices; an induced subgraph deletes vertices and takes with them all edges touching the deleted vertices. These terms recur when discussing spanning trees, independent sets and planar graphs, so note when reading a definition "what is deleted and what is kept".

## 3. Why Define It This Way

**Why does a loop count twice toward the degree**: the handshake lemma $\sum_{v \in V} d(v) = 2|E|$ is derived on the convention that "each edge contributes 1 to each of its two endpoints". A loop has only one endpoint, so counting it once would not balance the books; counting it twice matches "every edge is counted twice in total". Another view: a loop leaves the vertex and returns to it, occupying two "ports".

**Why does a "path" require distinct vertices while a "trail" requires only distinct edges**: distinct vertices automatically give distinct edges, so a path is the stricter notion. Shortest-path problems care about paths (a repeated vertex means a detour and cannot be shortest); one-stroke drawing cares about trails (an Euler circuit is a closed trail covering all edges). Two kinds of object for two kinds of problem, each with its own name.

**Why does a tree have four or five equivalent characterizations**: because the combinatorial condition "connected and acyclic" is equivalent to a counting condition such as "exactly one fewer edge than vertices", and also to a structural condition such as "the path between any two vertices is unique". Each is necessary and sufficient for the others, so in an exercise take whichever is handiest. Proving "a tree has at least two leaves", for instance, uses the longest-path argument (see Example 3), whereas "adding one edge creates exactly one cycle" is easiest via uniqueness of paths.

**Why is there no Euler-style criterion for Hamiltonian problems**: the Euler criterion looks only at local degrees, whereas a Hamiltonian cycle depends on the global shape of the graph; the problem is NP-complete, and at present there are only necessary conditions (used to refute) and a few sufficient ones (Dirac, Ore). **Local is easy, global is hard**—a general phenomenon in graph theory and combinatorics at large.

**Why does the Euler criterion carry a "connected" hypothesis**: "every vertex has even degree" is sufficient only under connectivity. If a graph splits into two connected components each of even degree, each has its own Euler circuit, but the whole graph has no closed path through all edges—there is no edge between the components, so finishing one block leaves you unable to reach the other. **A local condition plus a connectivity hypothesis** is the full criterion; never lose the hypothesis when reading a theorem.

## 4. Intuition and Pictures

**Two immediate corollaries of the handshake lemma**:
1. The number of odd-degree vertices in any graph is even—the total degree is even, and the odd part cannot add up to an even number unless it comes in pairs;
2. At any party, the number of people who shook hands an odd number of times is even. There is no party with exactly one person who shook hands an odd number of times.

**Euler versus Hamiltonian**:

| | Euler circuit | Hamiltonian cycle |
|---|---|---|
| Object of interest | Edges (each once) | Vertices (each once) |
| Difficulty of decision | Necessary and sufficient: all degrees even | No criterion; NP-complete |
| Typical applications | Postal routes, one-stroke drawing, DNA assembly | Travelling salesman, scheduling, wiring |

**The complete answer to one-stroke drawing**: if a connected graph has $2k$ odd-degree vertices, all its edges can be decomposed into $k$ edge-disjoint trails—that is, $k$ strokes suffice and no fewer. The graph abstracted from the seven bridges has 4 odd-degree vertices ($k = 2$), so at least two strokes are needed and no route crosses all seven bridges in one—exactly how Euler disposed of the citizens' hope.

**Four equivalent characterizations of a tree** (take any as the definition; the rest follow):
1. Connected with $n - 1$ edges;
2. Acyclic with $n - 1$ edges;
3. Connected, and deleting any edge disconnects it;
4. Acyclic, and adding any edge creates exactly one cycle.

**The stance of a tree**: a tree is the "most economical in edges" connected structure, hence the skeleton of network design, data compression (Huffman trees), parsing and union-find. Conversely, a "redundant edge" in a graph is a cycle—**more than $n - 1$ edges forces a cycle, fewer than $n - 1$ cannot connect**, which is how a tree balances "connected" and "acyclic" exactly.

**Degree sequences**: listing the degrees in decreasing order gives the degree sequence. The handshake lemma gives the first constraint (even total degree, an even number of odd-degree vertices), but satisfying it does not guarantee graphicality. The rigorous test is the Havel–Hakimi algorithm: repeatedly take the largest degree $d$, subtract 1 from each of the next $d$ degrees, and if this can be carried through to all zeros the sequence is graphical. It is the standard computational test for "can a graph be drawn with these degrees", and a training ground for counterexample thinking.

## 5. Worked Examples

### Example 1 (Basic: the handshake lemma)

Problem: prove that the number of odd-degree vertices in any graph is even.

Analysis: sum the degrees separately over the odd-degree and even-degree vertices, and finish with "a sum of an odd number of odd numbers is odd".

Solution: let $O$ be the set of odd-degree vertices and $E$ the set of even-degree ones. The handshake lemma gives

$$\sum_{v \in O} d(v) + \sum_{v \in E} d(v) = 2|E|$$

The right side $2|E|$ is even, and the second term on the left is a sum of even numbers, hence even. So $\sum_{v \in O} d(v)$ must be even. But every $d(v)$ in $O$ is odd, and a sum of odd numbers is even if and only if their count is even, so $|O|$ is even. QED.

A playful application: in any graph the number of vertices of degree 3 cannot be 1, 3 or 5—it can only occur in pairs.

### Example 2 (Intermediate: deciding one-stroke drawing)

Problem: four vertices form a diamond with edges $A$–$B$, $B$–$C$, $C$–$D$, $D$–$A$, plus one diagonal $A$–$C$. Can it be drawn in one stroke (pen never leaving the paper, each edge drawn exactly once)? What restrictions are there on the start and end points?

Analysis: count the degree of each vertex and apply the Euler criterion.

Solution: $d(A) = 3$ (adjacent to $B, D, C$), $d(C) = 3$ (adjacent to $B, D, A$), and $d(B) = d(D) = 2$. There are exactly two odd-degree vertices, $A$ and $C$. By the criterion the graph **has an Euler trail but no Euler circuit**: it can be drawn in one stroke, but the start and end must be $A$ and $C$ in some order, and the pen cannot return to the start.

A concrete route: $A \to B \to C \to D \to A \to C$, each of the five edges once, starting at $A$ and ending at $C$—verified.

If another diagonal $B$–$D$ is added, all four vertices have degree 3, so there are 4 odd-degree vertices ($k = 2$ in $2k$): at least two strokes are needed, and two suffice.

### Example 3 (Advanced: properties of trees and Cayley's formula)

Problem: prove that a tree on $n$ vertices ($n \ge 2$) has at least two leaves (vertices of degree 1). Then check that the number of spanning trees of $K_3$ agrees with Cayley's formula $n^{n - 2}$.

Analysis: prove existence of leaves with a "longest path" argument; for $n = 3$ Cayley's formula can be verified by hand.

Solution: let $T$ be a tree; since it is connected, take a longest path $P = v_0 v_1 \cdots v_k$ in the whole graph. Claim that $v_0$ is a leaf: if $d(v_0) \ge 2$ then $v_0$ has another neighbour $u$. Now $u$ cannot be a vertex of $P$, for then $P$ would contain a cycle (a tree is acyclic, a contradiction), so $u v_0 v_1 \cdots v_k$ is a longer path, contradicting the maximality of $P$. Hence $d(v_0) = 1$. Similarly $v_k$ is a leaf. So there are at least two leaves. QED.

For $n = 3$, Cayley's formula gives $3^{3 - 2} = 3$. $K_3$ is a triangle, and a spanning tree needs $n - 1 = 2$ edges, connected and acyclic: deleting any one of the three edges leaves a spanning tree, giving 3 in total—$\{A B, B C\}$, $\{A B, A C\}$, $\{A C, B C\}$—in agreement.

Remark: if the graph is not complete, Cayley's formula does not apply; use the matrix-tree theorem (Kirchhoff): the number of spanning trees equals any cofactor of the Laplacian matrix.

## 6. Common Mistakes and Pitfalls

1. **Mistake**: using a necessary condition for a Hamiltonian cycle as if it were sufficient. **Why it is wrong**: a graph satisfying the necessary condition (deleting any $k$ vertices leaves at most $k$ components) need not have a Hamiltonian cycle. **Correct**: necessary conditions can only refute; to assert existence use sufficient conditions such as Dirac ($n \ge 3$ and minimum degree $\ge \frac{n}{2}$) or Ore (the degrees of any non-adjacent pair sum to $\ge n$).
2. **Mistake**: missing loops or multiple edges when counting degrees. **Why it is wrong**: a loop counts twice and $k$ multiple edges contribute $k$ to the degree. **Correct**: accumulate edge by edge from the definition, and keep all edges when drawing.
3. **Mistake**: thinking "edges = $n - 1$ plus every vertex of degree at least 1" implies a tree. **Why it is wrong**: counterexample—4 vertices forming a triangle (3 edges) plus an isolated vertex satisfies the edge count but is disconnected, so it is not a tree. **Correct**: a tree's characterization must be satisfied in full; connected and acyclic are both required.
4. **Mistake**: applying Cayley's formula to a non-complete graph or to unlabelled graphs. **Why it is wrong**: $n^{n - 2}$ counts spanning trees of the **labelled** complete graph $K_n$, where vertices have names and trees are distinguished. **Correct**: for a general graph use the matrix-tree theorem; unlabelled graphs need further division by automorphisms.
5. **Mistake**: forgetting the start/end restriction in one-stroke problems. **Why it is wrong**: an Euler trail requires exactly two odd-degree vertices, and they must be the start and end; only all-even degrees give an Euler circuit. **Correct**: first count the odd-degree vertices $2k$, then fix the number of strokes and the endpoints.
6. **Mistake**: thinking a tree can only be recognized from the definition, without using the edge count to rule things out quickly. **Why it is wrong**: to test whether a graph with $n$ vertices and $m$ edges is a tree, $m \neq n - 1$ immediately refutes it, saving a great deal of checking. **Correct**: filter by edge count first (connected and acyclic forces $n - 1$ edges), then verify either connectivity or acyclicity.

## 7. Summary and Mnemonic

Key points:
- A graph = vertices + edges; only the connections matter, making it the common language of discrete structures.
- Handshake lemma: the sum of degrees = $2|E|$, so odd-degree vertices come in pairs.
- An Euler circuit exists exactly when all degrees are even; exactly two odd-degree vertices give an Euler trail; $2k$ odd-degree vertices need at least $k$ strokes.
- There is no necessary and sufficient test for a Hamiltonian cycle (NP-complete); necessary conditions refute, Dirac/Ore assert.
- Tree ⟺ connected with $n - 1$ edges (several equivalent characterizations); $K_n$ has $n^{n - 2}$ labelled spanning trees.

These points interlock: the handshake lemma explains parity, parity explains strokes, strokes return to connectivity, and connectivity supports trees. The secret of learning graph theory is "memorize the definitions first, then let the theorems lean on one another".

**Mnemonic: degree sums to twice the edges, odd points come in pairs; all even returns in one stroke, two odd opens one; Hamiltonian has no crown, a tree is one beam short.**

`,
    keyPoints: [
      'Handshake lemma: the sum of degrees = 2|E|; odd-degree vertices come in pairs',
      'Euler circuit ⟺ all degrees even; 2k odd-degree vertices ⟺ k strokes',
      'No necessary and sufficient condition for a Hamiltonian cycle; Dirac / Ore are common sufficient conditions',
      'Tree ⟺ connected with n−1 edges; Cayley: K_n has n^(n−2) spanning trees',
    ],
  },
  'graph-algorithms': {
    chapter: 'Chapter 5 Graph Algorithms',
    title: 'Graph Traversal and Shortest Paths',
    summary:
      'Breadth-first search spreads like a ripple, depth-first search burrows like a maze walker; Dijkstra greedily finds shortest paths with positive weights, while negative weights force Bellman-Ford.',
    content: String.raw`

You open a navigation app, type home and office, and a second later three routes pop up: fastest 28 minutes, shortest 12 kilometres, fewest traffic lights. How does the app know which is fastest? It faces a graph of millions of junctions and tens of millions of roads. Trying routes one by one by hand would take forever. This chapter is about the two brushes computers use on such graphs—**traversal** (seeing the whole graph once) and **shortest paths** (finding the cheapest way from a source to every point).

Motivating question: given a metro map, what is the route from station A to station B with the fewest transfers? And what if each segment also carries a "crowdedness" weight? You will find that unweighted graphs are solved by "ripple spreading" (breadth-first search), while weighted ones need the cleverer Dijkstra algorithm—and Dijkstra has a fatal precondition, **violating which it silently returns a wrong answer without any error**, the trap Example 3 digs up.

Graph algorithms are the chapter of discrete mathematics "closest to the computer": almost all run in linear or near-linear time, compressing what brute-force enumeration would take exponential time into seconds. This drama of "ingenuity bought with time" is the most captivating part of an algorithms course, and the feel for it is what this chapter conveys.

## 2. Rigorous Definitions

**Storing a graph**: adjacency matrix ($A_{ij} = 1$ means an edge $i \to j$, space $O(n^2)$, fast edge queries); adjacency list (each vertex keeps a list of neighbours, space $O(n + m)$, fast traversal). Large sparse graphs almost always use adjacency lists.

Neither storage is absolutely better: the matrix suits dense graphs and frequent queries of the form "is there an edge between these two" (as in Floyd), the list suits sparse graphs dominated by traversal (BFS, DFS, Dijkstra). Choose the wrong one and the complexity can differ by a factor of $O(n)$.

**Breadth-first search (BFS)**: starting from $s$, spread by "layers"—first the vertices at distance 1 from $s$, then those at distance 2, and so on. Implemented with a **queue**. Each vertex records a layer number $d(v)$, the minimum number of edges from $s$ to $v$.

**Depth-first search (DFS)**: go all the way down one road, and when stuck turn back and try another. Implemented with a **stack or recursion**. On a directed graph it produces a DFS forest whose edges are classified as tree, back, cross and forward edges, and **a back edge exists ⟺ there is a directed cycle**.

**The shortest-path problem**: for a weighted graph $G = (V, E, w)$, the weight of a path is the sum of its edge weights; find paths of minimum weight from the source $s$ to every vertex.

**Dijkstra's algorithm**: maintain a settled set $S$ and tentative distances $d[v]$. Each round, take the vertex $u$ outside $S$ with the smallest $d$, add it to $S$, then **relax** all its outgoing edges (if $d[u] + w(u, v) < d[v]$, update $d[v]$ and the predecessor). **Precondition: all edge weights are nonnegative.** Complexity $O(n^2)$, or $O(m \log n)$ with a heap.

**Bellman–Ford**: relax all edges for $n - 1$ rounds, allowing negative weights; if a relaxation is still possible in round $n$, a negative cycle exists. Complexity $O(nm)$.

**Floyd–Warshall**: dynamic programming for all-pairs shortest paths. Let $d_{ij}^{(k)}$ be the shortest distance using only the first $k$ vertices as intermediates:

$$d_{ij}^{(k)} = \min\left(d_{ij}^{(k - 1)},\ d_{ik}^{(k - 1)} + d_{kj}^{(k - 1)}\right)$$

Complexity $O(n^3)$, and a predecessor matrix reconstructs the paths.

The relation among the three is worth memorizing: BFS is Dijkstra specialized to unit weights (an ordinary queue replacing the priority queue); Bellman–Ford is a "non-picky" Dijkstra that trades several rounds of relaxation for dropping the nonnegativity restriction; Floyd changes dimension—it computes all pairs at once, trading acceptable space for "all settled in one go".

## 3. Why Define It This Way

**Why does a queue guarantee layer order in BFS**: the queue always holds "vertices at distance $k$ ahead of vertices at distance $k + 1$". Replace it by a stack (last in, first out) and the search degenerates to depth-first, the layer order breaks, and the property "first visit is shortest" is lost. **BFS correctness = the FIFO property of the queue + first arrival already shortest** (a detour is necessarily longer and can only arrive later).

**Why does Dijkstra pick the currently nearest unsettled vertex each round**: this is greedy. For the chosen $u$, $d[u]$ can no longer decrease—any other route to $u$ must pass through some unsettled $v$ with $d[v] \ge d[u]$, and with nonnegative weights going further can only be longer. **The precondition is nonnegative weights**; once a negative edge appears the argument "going further is longer" collapses and a settled distance may be overturned (see Example 3).

**Why does Bellman–Ford need $n - 1$ rounds**: without a positive cycle the shortest path uses at most $n - 1$ edges; after round $k$, all shortest distances using at most $k$ edges are settled. One extra round doubles as a negative-cycle detector.

**Why must Floyd's loop variable $k$ be outermost**: $d_{ij}^{(k)}$ is defined as "using only the first $k$ vertices as intermediates". With $k$ not outermost, the computation may use distances that are not yet ready and that involve larger intermediate vertices, scrambling the overlapping subproblems—dynamic programming correctness relies on "subproblems depend only on smaller stages".

**Why does relaxation always terminate**: each successful relaxation decreases some $d[v]$; the distances take only finitely many values (a shortest path does not loop), so each vertex is updated finitely often and the algorithm must stop.

**Why is naive Dijkstra $O(n^2)$, and where does the heap optimization come from**: the naive version scans all unsettled vertices each round to find the smallest $d$, over $n$ rounds giving $n^2$; relaxations total a few per edge across $m$ edges. Replacing "find the minimum" by a priority queue (binary heap) costs $O(\log n)$ per operation, lowering the total to $O(m \log n)$. **Complexity is always governed by the slowest step**—the basic viewpoint for reading algorithm complexities.

## 4. Intuition and Pictures

**BFS is a spreading ripple**: drop a stone into calm water and the wavefront expands layer by layer; the places reached first have the fewest ripples—the BFS layer number is the shortest distance. **DFS is walking a maze**: keep your right hand on the wall and go, backing up at walls; it easily dives into dead ends, but is very handy for finding cycles and doing topological sort.

**Complexity comparison**:

| Algorithm | Problem solved | Weight requirement | Complexity |
|---|---|---|---|
| BFS | Shortest paths in unweighted graphs, connectivity | Unweighted (or equal weights) | $O(n + m)$ |
| DFS | Connectivity, cycle detection, topological sort | Unweighted | $O(n + m)$ |
| Dijkstra | Single-source shortest paths | Nonnegative | $O(n^2)$ or $O(m \log n)$ |
| Bellman–Ford | Single-source shortest paths, negative-cycle detection | Arbitrary | $O(nm)$ |
| Floyd | All-pairs shortest paths | No negative cycle | $O(n^3)$ |

**The intuition of relaxation**: $d[u] + w(u, v) < d[v]$ is like discovering that "going round through $u$ is actually closer", so you take the shortcut. Shortest-path algorithms are essentially **systematically taking every shortcut once**.

**A picture of "first visit is shortest"**: in BFS, the edges taken by first arrivals form a tree rooted at $s$ (the BFS tree), and the tree path from the root to any vertex is one of the shortest paths. This is also the basis for "record predecessors and backtrack the path".

**The division of labour between "visited flags" and "predecessors"**: the visited flag answers "have I been here", preventing repetition; the predecessor answers "where did I come from", reconstructing the route. The two arrays have distinct jobs and are standard equipment in shortest-path code. Forget the predecessors and you get distances but no route—and what a navigation app wants is exactly the route.

## 5. Worked Examples

### Example 1 (Basic: BFS for shortest paths in an unweighted graph)

Problem: an undirected graph with vertices $1$ to $6$ and edges $\{1, 2\}$, $\{1, 3\}$, $\{2, 4\}$, $\{3, 4\}$, $\{4, 5\}$, $\{5, 6\}$, $\{2, 6\}$. Run BFS from 1 and write down each vertex's layer number (shortest edge count) and one shortest path.

Analysis: BFS spreads by layers and the first visit is shortest. The graph is small, so the queue state of every round can be written out in full—practice in hand-simulating an algorithm, the surest way to understand it, better than memorizing pseudocode.

Solution: initialize the queue to $[1]$ with $d(1) = 0$.

Dequeue 1; neighbours 2 and 3 unvisited: $d(2) = 1$, $d(3) = 1$, queue becomes $[2, 3]$.

Dequeue 2; neighbours 4 and 6 unvisited: $d(4) = 2$, $d(6) = 2$, queue becomes $[3, 4, 6]$.

Dequeue 3; neighbour 4 already visited. Dequeue 4; neighbour 5 unvisited: $d(5) = 3$.

Dequeue 6 and 5; no new vertices; done.

Layer numbers: $d(1) = 0$, $d(2) = d(3) = 1$, $d(4) = d(6) = 2$, $d(5) = 3$. Shortest path to 6: $1 \to 2 \to 6$ (2 edges); shortest path to 5: $1 \to 2 \to 4 \to 5$ (3 edges). Is there another 2-edge path from 1 to 6? Enumerate: the neighbours of $1$ are only 2 and 3; the neighbours of $2$ include 6 (distance 2), and the only neighbour of $3$ is 4. So $1 \to 2 \to 6$ is the unique shortest path.

### Example 2 (Intermediate: Dijkstra by hand)

Problem: a weighted graph with vertices $S, A, B, C, D, T$ and weights $S$–$A$ 4, $S$–$B$ 2, $B$–$A$ 1, $B$–$C$ 5, $A$–$C$ 2, $A$–$D$ 3, $C$–$T$ 1, $D$–$T$ 2. Find the shortest paths from $S$ to every vertex.

Analysis: each round pick the unsettled vertex with the smallest tentative distance, relax its outgoing edges, and record predecessors for backtracking.

Solution: initially $d(S) = 0$ and all others $\infty$.

Round 1: pick $S$ (distance 0). Relaxing gives $d(A) = 4$ (predecessor $S$) and $d(B) = 2$ (predecessor $S$).

Round 2: pick $B$ (distance 2). Relax $B$–$A$: $2 + 1 = 3 < 4$, so $d(A) = 3$ (predecessor $B$); $B$–$C$: $d(C) = 2 + 5 = 7$ (predecessor $B$).

Round 3: pick $A$ (distance 3). Relax $A$–$C$: $3 + 2 = 5 < 7$, so $d(C) = 5$ (predecessor $A$); $A$–$D$: $d(D) = 3 + 3 = 6$ (predecessor $A$).

Round 4: pick $C$ (distance 5). Relax $C$–$T$: $d(T) = 5 + 1 = 6$ (predecessor $C$).

Round 5: $D$ and $T$ both have distance 6; pick $D$ first: relax $D$–$T$: $6 + 2 = 8 > 6$, no update.

Round 6: pick $T$ (distance 6); done.

Result: $d(S) = 0, d(B) = 2, d(A) = 3, d(C) = 5, d(D) = 6, d(T) = 6$.

Backtracking the predecessor chain: $T \leftarrow C \leftarrow A \leftarrow B \leftarrow S$, i.e. $S \to B \to A \to C \to T$, total weight $2 + 1 + 2 + 1 = 6$. Check: to reach $A$ there are only the direct $S \to A$ (weight 4) and the detour through $B$ (weight 3), and the detour wins; for $C$ the candidate $S \to B \to A \to C$ (weight 5) beats $S \to B \to C$ (weight 7) and any route through $D$. The answer is self-consistent.

### Example 3 (Advanced: Dijkstra falls on negative weights)

Problem: vertices $S, A, B$ with weights $S \to A$ 2, $S \to B$ 3, $B \to A$ $-4$ (negative weights allowed). Find the shortest paths from $S$.

Analysis: first give the correct answer, then show why Dijkstra errs, and finally correct it with Bellman–Ford.

Solution: enumerate the true shortest paths: $S \to A$ directly, weight 2; and $S \to B \to A$, weight $3 + (-4) = -1$. So the correct answer is $d(A) = -1$ along $S \to B \to A$.

Dijkstra's execution: pick $S$ (0), relaxing gives $d(A) = 2$ and $d(B) = 3$. Next pick the smallest tentative distance, $A$ (distance 2), and $A$ becomes **permanently settled**. Then pick $B$ (distance 3) and relax $B \to A$: $3 + (-4) = -1 < 2$, but $A$ has already been closed and Dijkstra never looks back. The final output is $d(A) = 2$—**wrong**.

Where is the trap: Dijkstra's greedy step relies on "distances of unsettled vertices can only grow", and a negative edge makes "can only shrink" possible, overturning a settled vertex. Bellman–Ford does not pick the nearest vertex but honestly relaxes all edges for $n - 1 = 2$ rounds: after round 1, $d(A) = \min(2, 3 + (-4)) = -1$, and round 2 changes nothing, so it outputs $d(A) = -1$, correctly.

**Conclusion: on seeing a negative edge, switch to Bellman–Ford; Dijkstra never reports an error, it just quietly hands you a wrong answer.**

## 6. Common Mistakes and Pitfalls

1. **Mistake**: using BFS for shortest paths in a weighted graph. **Why it is wrong**: BFS layers by edge count, and "fewer edges" is not "smaller weight" (one direct edge of weight 100 may beat three detour edges of weight 1). **Correct**: use Dijkstra (nonnegative) or Bellman–Ford (negative allowed) for weighted graphs.
2. **Mistake**: running Dijkstra on a graph with negative weights. **Why it is wrong**: see Example 3—a settled distance may be overturned by a negative edge and the algorithm fails silently. **Correct**: use Bellman–Ford for negative weights and detect negative cycles.
3. **Mistake**: marking vertices visited at the wrong moment during traversal. **Why it is wrong**: without marking on enqueue, a vertex may enter the queue several times, inflating it and scrambling layer numbers. **Correct**: in BFS mark on enqueue; in DFS mark on pop (or on push)—choose one and stick to it.
4. **Mistake**: initializing the Floyd diagonal to $\infty$. **Why it is wrong**: $d_{ii} = 0$ means "staying put"; setting it to $\infty$ forces every path to "pass through itself once" first, inflating the results. **Correct**: $d_{ii}^{(0)} = 0$; unless the question asks for shortest cycles, which is a different matter.
5. **Mistake**: assuming "the algorithm stops" means "the answer is right". **Why it is wrong**: convergence only says the iteration ended; what it converged to need not be optimal (the lesson of Dijkstra with negative weights). **Correct**: correctness depends on the preconditions—check them one by one before use.
6. **Mistake**: concluding "the graph is disconnected" because traversal from $s$ misses some vertex. **Why it is wrong**: missing that vertex only says it is disconnected from $s$; the graph may have other components. **Correct**: to test connectivity of the whole graph, count whether the number of visited vertices equals $n$; to find all components, run a traversal from each unvisited vertex.

## 7. Summary and Mnemonic

Key points:
- BFS uses a queue to preserve layer order, so the first visit gives the shortest path (unweighted graphs only); DFS uses recursion or a stack and suits cycle detection and topological sort.
- Dijkstra greedily picks the nearest, under the precondition of **nonnegative weights**; negative weights force Bellman–Ford.
- Floyd is a triple loop whose intermediate variable $k$ must be outermost; the diagonal is initialized to 0.
- Complexity: BFS/DFS $O(n + m)$, Dijkstra $O(n^2)$ or $O(m \log n)$, Bellman–Ford $O(nm)$, Floyd $O(n^3)$.

**Mnemonic: breadth-first queues layer by layer, depth-first recurses without a care; positive weights go greedy with Dijkstra, negative weights need BF to bear.**

`,
    keyPoints: [
      'BFS with a queue preserves layer order: the first visit is the unweighted shortest path',
      'DFS via recursion or a stack: the tool for cycle detection and topological sort',
      'Dijkstra greedily picks the nearest, under the precondition of nonnegative weights',
      'Negative weights need Bellman–Ford; in Floyd the intermediate loop k must be outermost',
      'Relaxation means "discovering a closer detour"; distances are finite, so the algorithm must stop',
    ],
  },
  'counting-basics': {
    chapter: 'Chapter 6 Introduction to Combinatorial Counting',
    title: 'Basic Counting Principles',
    summary:
      'Classify with addition, sequence with multiplication; permutations care about order, combinations do not—these two sentences are the whole engine of combinatorial counting.',
    content: String.raw`

A phone passcode is 6 digits—how many possibilities? What is the chance of winning the top prize in a lottery? How many different orders can a deck of cards be shuffled into? What these share is "counting"—but counting in the mathematical sense is not 1, 2, 3; it uses the **multiplication principle** and the **addition principle** to break a large count into products or sums of smaller ones. The essence of combinatorial counting in one sentence: **classify first, then sequence; use addition for classes and multiplication for steps.**

Motivating question: from 5 boys and 4 girls, choose 3 people for a competition with at least 1 girl—how many ways? Counting directly, split into three classes "1 girl 2 boys", "2 girls 1 boy", "3 girls", but there is a cleverer route (the complement). Example 3 in the fifth section shows where the seemingly clever method "pick one girl first" goes wrong—the classic overcounting trap of combinatorial counting.

In probability theory, counting is the basic skill of "computing the denominator"; in information theory, counting estimates the size of a code space; in algorithms, counting answers "how many inputs are there in the worst case". A striking sense of scale: a deck of 52 cards can be ordered in about $8 \times 10^{67}$ ways, far more than the number of atoms on Earth—almost every shuffle you perform creates an order never before seen in history. Counting makes "astronomical numbers" speakable.

## 2. Rigorous Definitions

**Addition principle**: if a task can be done in $k$ **mutually exclusive** classes of ways with $m_i$ ways in the $i$-th class, the total number of ways is $m_1 + m_2 + \cdots + m_k$. Keywords: classification; classes mutually exclusive and jointly exhaustive.

**Multiplication principle**: if a task is carried out in $k$ **steps** with $n_i$ choices at the $i$-th step, the total number of ways is $n_1 n_2 \cdots n_k$. Keywords: sequencing; steps chained, choices independent.

Both principles have "preconditions", and failing to check them is the invisible killer in counting. The addition principle requires the classes to be **mutually exclusive** (no single way counted into two classes) and **exhaustive** (no way missed); the multiplication principle requires the choices at each step to be **independent** (the number of options at a later step does not depend on the particular choice earlier, or any dependence has been accounted for). Writing these two preconditions on your scratch paper before starting rules out half the errors.

**Permutation**: choosing $r$ of $n$ distinct elements and arranging them **in order**:

$$P(n, r) = \frac{n!}{(n - r)!} = n(n - 1)\cdots(n - r + 1)$$

The full permutation is $P(n, n) = n!$.

**Combination**: choosing $r$ of $n$ distinct elements **without regard to order**:

$$\binom{n}{r} = \frac{n!}{r!(n - r)!}$$

Symmetry gives $\binom{n}{r} = \binom{n}{n - r}$ and $\binom{n}{0} = \binom{n}{n} = 1$.

**Circular permutation**: $n$ elements arranged in a circle with rotations identified give $(n - 1)!$ arrangements.

**Permutations of a multiset**: among $n$ objects, the $i$-th class has $m_i$ identical items; the number of arrangements is $\dfrac{n!}{m_1!\, m_2! \cdots m_k!}$. For example, rearranging the 6 letters of "banana" with 3 $a$'s and 2 $n$'s gives $\dfrac{6!}{3!\, 2!} = 60$. This agrees exactly with "permute everything, then divide by the internal permutations of each class", another use of the division principle.

**Combinations with repetition**: choosing $r$ items from $n$ classes with repetition allowed gives $\binom{n + r - 1}{r}$ (the "stars and bars" model).

**Binomial theorem**: $(a + b)^n = \sum_{k = 0}^{n} \binom{n}{k} a^{n - k} b^{k}$.

**Three combinatorial readings of a binomial coefficient**: $\binom{n}{k}$ is at once "the number of ways to choose $k$ people", "the coefficient of $x^k$ in $(1 + x)^n$", and "the number of lattice paths from $(0,0)$ to $(k, n - k)$". Translating among the three is the starting point of combinatorial proof (double counting), used repeatedly later.

## 3. Why Define It This Way

**Why addition for classes and multiplication for steps**: classification is "either this way or that way", so the totals add; sequencing is "first this, then that", so the totals multiply. The test: ask yourself whether the choices are related by "or" or by "and then". Confusing the two is the number-one counting error.

**Why a permutation has an extra $r!$ over a combination**: a combination only cares "which $r$ are chosen"; a permutation also seats those $r$, and $r$ elements have $r!$ seatings, so

$$P(n, r) = \binom{n}{r} \cdot r!$$

"Combine first, order later" is the universal dimension-reduction trick for permutation problems: split the awkward ordering issue into two steps.

**Why a circular permutation divides by $n$**: each circular arrangement is counted $n$ times by its $n$ rotations, so dividing by $n$ removes the repetition and gives $(n - 1)!$. This is the **division principle**: if everything has been counted $k$ times, divide by $k$.

**Why combinations with repetition are $\binom{n + r - 1}{r}$**: distribute $r$ identical votes (stars) among $n$ classes, separating the classes with $n - 1$ bars; there are $n + r - 1$ positions in total and we choose $r$ of them for stars. Buying 3 cups of milk tea from 5 flavours, for instance, means choosing 3 of 7 positions for stars.

**Why Pascal's identity holds**: $\binom{n}{r} = \binom{n - 1}{r - 1} + \binom{n - 1}{r}$. Fix one particular element: either it is chosen (then choose $r - 1$ from the remaining $n - 1$), or it is not (then choose $r$ from the remaining $n - 1$); the two classes are mutually exclusive and exhaustive, so add. This is exactly where "each entry is the sum of the two above it" in Pascal's triangle comes from.

**Why "choose then arrange" is always safe**: the combination solves the hard part "which ones are chosen" on its own, and the permutation then supplies "how they are arranged" by the mechanical factor $r!$. Each step is simple, and together they solve a complex problem—this "split the dimensions" habit is the heart of combinatorial thinking: peel order away from selection, one layer at a time.

## 4. Intuition and Pictures

**Decision trees**: a multi-step choice drawn as a tree has as many paths as the product of the branch counts at each level (multiplication principle); classes are several trees side by side and the totals add (addition principle). The tree diagram makes both principles obvious.

**The "choosing people" versus "queueing" metaphor**: a combination is **selecting a delegation**—once selected, they may stand however they like; a permutation is a **podium**—gold, silver and bronze are distinct. For the same "choose 3 people", asking "how many selections" uses combinations and asking "how many orders on stage" uses permutations.

**Pascal's triangle**: arranging $\binom{n}{r}$ in a triangle gives each entry as the sum of the two above it (Pascal's identity in pictures) and left-right symmetry (the symmetry of binomial coefficients in pictures). Finding coefficients and deriving identities can all be done on the diagram.

**Right-versus-wrong table**:

| Question | Tool |
|---|---|
| "Choose 3 people, how many selections" | Combination $\binom{n}{3}$ |
| "Choose 3 people and line them up" | Permutation $P(n, 3)$ |
| "5 people around a round table, how many seatings" | Circular permutation $4!$ |
| "3 cups from 5 flavours, repetition allowed" | Combinations with repetition $\binom{7}{3}$ |
| "at least 1 girl" | Complement: total minus "all boys" |

**The "stars and bars" picture**: translate "choosing with repetition" into "arranging stars and bars"; the $n$ classes are the $n$ slots cut out by $n - 1$ bars, and the number of stars in a slot is how many of that class were chosen. An abstract repetition count becomes a concrete queueing problem.

**The picture of complement counting**: draw the whole set as a big square and the "none at all" outcomes as a small corner; carve out the corner and what remains is "at least one". The picture reminds you that complement counting works only because, besides "none" and "at least one", there is no third possibility—mutually exclusive and exhaustive, both indispensable.

## 5. Worked Examples

### Example 1 (Basic: applying the two principles directly)

Problem: a class has 5 boys and 4 girls. (1) Choose 1 class monitor—how many ways? (2) Choose one male and one female monitor—how many ways? (3) Choose 3 of the 9 as a delegation (no offices)—how many ways?

Analysis: (1) classification (either a boy or a girl); (2) sequencing (fix the male monitor, then the female one); (3) order is irrelevant, so use a combination.

Solution: (1) addition principle: 5 boys and 4 girls, mutually exclusive classes, $5 + 4 = 9$ ways.

(2) multiplication principle: 5 choices for the male monitor, and once fixed there are 4 choices for the female monitor, so $5 \times 4 = 20$ ways. Note the difference from (1): (1) needs only 1 person, (2) needs 2 distinct people, the two choices chained, hence multiplication. Boys and girls are disjoint sets, so "distinct people" is automatic; if the question were "choose a monitor and a deputy from the 9", the second step would have 8 choices, giving $9 \times 8 = 72$—exactly the permutation $P(9, 2)$.

(3) combination:

$$\binom{9}{3} = \frac{9 \times 8 \times 7}{3 \times 2 \times 1} = 84$$

A delegation has no offices, so $\frac{9 \times 8 \times 7}{3!}$ divides out the internal seating of the 3 people.

### Example 2 (Intermediate: permutations and the binomial theorem)

Problem: using the ten digits 0–9 without repetition, how many four-digit numbers can be formed? Also find the coefficient of $x^3$ in the expansion of $(2x - 1)^6$.

Analysis: a four-digit number cannot start with 0, so give priority to the special position; for the binomial expansion, find the $x^3$ term term by term.

Solution: four-digit numbers: the thousands digit is chosen from 1–9, 9 ways; the remaining three digits are arranged from the other 9 digits (including 0), $P(9, 3) = 9 \times 8 \times 7 = 504$ ways.

$$9 \times 504 = 4536$$

Another route (complement): all 4-digit arrangements $P(10, 4) = 5040$, minus those with leading 0, $P(9, 3) = 504$, gives $5040 - 504 = 4536$—the two methods check each other. **Giving priority to special elements and thinking in complements are the two keys to permutation problems.**

Binomial expansion:

$$(2x - 1)^6 = \sum_{k = 0}^{6} \binom{6}{k}(2x)^{6 - k}(-1)^k$$

For the $x^3$ term we need $6 - k = 3$, i.e. $k = 3$:

$$\binom{6}{3}(2x)^3(-1)^3 = 20 \times 8x^3 \times (-1) = -160\,x^3$$

The coefficient of $x^3$ is $-160$. Trap: do not forget to fold both the $(-1)^k$ and the factor 2 inside $(2x)^{6-k}$ into the coefficient; answering $\binom{6}{3} = 20$ is the commonest wrong solution.

### Example 3 (Advanced: complement counting and "at least one")

Problem: from 5 boys and 4 girls choose 3 people with at least 1 girl—how many ways?

Analysis: count directly in three classes, or count the complement. The two methods cross-check each other.

Solution: **counting directly** (classify by the number of girls, addition principle):

- 1 girl, 2 boys: $\binom{4}{1}\binom{5}{2} = 4 \times 10 = 40$
- 2 girls, 1 boy: $\binom{4}{2}\binom{5}{1} = 6 \times 5 = 30$
- 3 girls, 0 boys: $\binom{4}{3}\binom{5}{0} = 4 \times 1 = 4$

Total $40 + 30 + 4 = 74$.

**Counting the complement**: total selections $\binom{9}{3} = 84$; all-boy selections $\binom{5}{3} = 10$; hence $84 - 10 = 74$ with at least one girl. The two agree.

**Warning about the trap**: if "at least one girl" is mis-solved as "pick 1 girl first, then 2 of the remaining 8", you get $\binom{4}{1}\binom{8}{2} = 4 \times 28 = 112$—**wrong**. The error: the same triple (girl A, girl B, boy C) is counted twice—once when the "picked girl" is A and once when it is B. The classes **overlap**. Why is the complement method immune? Because "all boys" and "at least one girl" are mutually exclusive and exhaustive, with no gap in between. **When classes overlap, the complement or inclusion–exclusion is the right tool.**

## 6. Common Mistakes and Pitfalls

1. **Mistake**: treating sequencing as classification. **Why it is wrong**: rephrasing the same problem changes the principle (parts (1) and (2) of Example 1). **Correct**: before starting, ask whether it is "or" or "and then".
2. **Mistake**: choosing the wrong tool between permutation and combination. **Why it is wrong**: using permutations for "choose committee members" counts different seatings of the same group repeatedly. **Correct**: ask whether order affects the result; if not, use combinations, if so, permutations.
3. **Mistake**: brute-forcing "at least one" with multiplication. **Why it is wrong**: see Example 3—picking one first and then the rest causes overcounting. **Correct**: use the complement (total minus "none at all") or non-overlapping classes.
4. **Mistake**: forgetting to divide when splitting into equal groups. **Why it is wrong**: splitting 6 people into 3 groups of 2, the product $\binom{6}{2}\binom{4}{2}\binom{2}{2}$ also counts the labelling of groups, while groups are indistinguishable. **Correct**: divide by $3!$, the factorial of the number of groups; no division is needed when group sizes differ.
5. **Mistake**: forgetting to divide by $n$ in circular permutations, or dividing the wrong thing. **Why it is wrong**: writing $n!$ for $n$ people around a table treats rotations as different seatings, overcounting $n$ times. **Correct**: circular permutations are $(n - 1)!$; if mirror images also count as the same (a bracelet, say), divide by 2 as well.
6. **Mistake**: losing signs in a binomial expansion. **Why it is wrong**: in $(a - b)^n$ the minus sign alternates as $(-1)^k$, positive for even terms and negative for odd. **Correct**: after splitting the base into "coefficient × variable + constant", mark the sign of the constant term term by term via $(-1)^k$ instead of patching it up at the end.

## 7. Summary and Mnemonic

Key points:
- Addition governs classification (mutually exclusive and exhaustive), multiplication governs sequencing (chained steps): the engine of combinatorial counting.
- Permutations care about order: $P(n, r) = \frac{n!}{(n - r)!}$; combinations do not: $\binom{n}{r} = \frac{n!}{r!(n - r)!}$; they are related by $P(n, r) = \binom{n}{r} \cdot r!$.
- Circular permutations $(n - 1)!$; combinations with repetition $\binom{n + r - 1}{r}$; the binomial theorem links algebra and counting.
- "At least one" favours the complement; when classes overlap, beware overcounting and correct with inclusion–exclusion.

A final reminder: before starting any counting problem ask three questions—does order matter? may elements repeat? are the classes mutually exclusive and the steps independent? Once these are answered, the right tool (permutation, combination, circular permutation, stars and bars, complement) surfaces by itself.

**Mnemonic: classes add and steps multiply, order decides permutation or combination; for "at least one" think complement, and never forget to divide out repetition.**

`,
    keyPoints: [
      'The addition principle governs classification (mutually exclusive and exhaustive); the multiplication principle governs sequencing (chained steps)',
      'Permutation P(n,r)=n!/(n−r)!; combination C(n,r)=n!/(r!(n−r)!)',
      'Combine then order: P(n,r) = C(n,r)·r!',
      'Circular permutation (n−1)!; combinations with repetition C(n+r−1, r) (stars and bars)',
      '"At least one" uses the complement; overlapping classes cause overcounting',
    ],
  },
};

export default map;
