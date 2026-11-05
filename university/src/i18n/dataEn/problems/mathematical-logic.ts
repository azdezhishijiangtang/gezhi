import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-log-1': {
    title: 'Verifying Soundness in First-Order Logic',
    question:
      'Verify that the rule of modus ponens "$\\varphi \\to \\psi,\\ \\varphi \\ \\vdash\\ \\psi$" is sound (truth-preserving): that is, if the premises are true in a structure $\\mathcal{M}$, then the conclusion must also be true.',
    hints: [
      'Soundness = every inference rule yields only true conclusions from true premises.',
      'Use the semantic definition to check the truth table of the implication directly.',
    ],
    solution: [
      {
        title: 'Semantic assumptions',
        detail:
          'Suppose that in the structure $\\mathcal{M}$ (with its assignment) we have $\\mathcal{M} \\vDash \\varphi \\to \\psi$ and $\\mathcal{M} \\vDash \\varphi$.',
      },
      {
        title: 'Truth of the implication',
        detail:
          '$\\varphi \\to \\psi$ is true and $\\varphi$ is true ⇒ by the semantics of implication (false only when the antecedent is true and the consequent false), $\\psi$ must be true.',
      },
      {
        title: 'Conclusion',
        detail:
          'True premises ⇒ true conclusion, so the rule is truth-preserving. Verifying each axiom as a valid formula and each rule as truth-preserving, then applying induction, yields the **soundness theorem**: $\\Gamma \\vdash \\varphi \\Rightarrow \\Gamma \\vDash \\varphi$.',
      },
    ],
    answer: 'Modus ponens is truth-preserving; checking the axioms and rules one by one yields the soundness theorem for first-order logic.',
    tags: ['Soundness', 'Modus ponens', 'Semantics'],
  },
  'p-log-2': {
    title: 'Understanding the Self-Referential Structure of the Gödel Sentence',
    question:
      'Explain why the Gödel sentence $G$, which asserts "$G$ is not provable in this system", is neither provable nor refutable within the system (assume the system is consistent).',
    hints: [
      'Split into two cases: the system proves $G$, and the system proves $\\neg G$; derive a contradiction in each.',
      'The key chain: $\\vdash G \\Rightarrow$ (by soundness) $G$ is true, but $G$ asserts its own unprovability.',
    ],
    solution: [
      {
        title: 'Case one: the system proves G',
        detail:
          'If $T \\vdash G$, then by soundness (only truths are provable) $G$ is true. But the content of $G$ is "$G$ is not provable" — a contradiction (unless $T$ is inconsistent). Hence $T \\nvdash G$.',
      },
      {
        title: 'Case two: the system proves ¬G',
        detail:
          'If $T \\vdash \\neg G$, then $T$ proves "$G$ is provable". But by case one $T \\nvdash G$, so "$G$ is provable" is a false statement — a consistent system cannot prove falsehoods (again by soundness), a contradiction. Hence $T \\nvdash \\neg G$.',
      },
      {
        title: 'Conclusion',
        detail:
          '$G$ is undecidable in $T$. Yet from outside the system, $G$ **is true** — there exist true but unprovable propositions. The first incompleteness theorem holds.',
      },
    ],
    answer: '$G$ is neither provable nor refutable in the consistent system $T$ (the first incompleteness theorem).',
    tags: ['Gödel sentence', 'Incompleteness', 'Self-reference'],
  },
  'p-log-3': {
    title: 'Proving a Problem Undecidable by Reduction',
    question:
      'The halting problem is known to be undecidable. Prove that "does program $P$ output 0 on the empty input" is also undecidable.',
    hints: [
      'Argue by contradiction: assume the problem is decidable and use it to construct a decider for the halting problem.',
      'Transform any $(P, x)$ into a new program $Q$: $Q$ first simulates $P$ on $x$ and, if it halts, outputs 0.',
    ],
    solution: [
      {
        title: 'Assumption for contradiction',
        detail:
          'Suppose there is a decider $Z$ that, given a program $Q$, decides whether $Q$ outputs 0 on the empty input.',
      },
      {
        title: 'Constructing the reduction',
        detail:
          'For any $(P, x)$, construct $Q_{P,x}$: ignore its own input and first simulate $P(x)$; if $P$ halts, output 0 (otherwise nothing is output). Then $P$ halts on $x$ $\\iff$ $Q_{P,x}$ outputs 0.',
      },
      {
        title: 'Completing the reduction',
        detail:
          'Therefore "does $P$ halt on $x$" can be answered by $Z(Q_{P,x})$ — the halting problem would be decidable, a contradiction. Hence the problem is undecidable.',
      },
    ],
    answer: 'The problem is undecidable (obtained by a Turing reduction from the halting problem).',
    tags: ['Halting problem', 'Reduction', 'Undecidability'],
  },
};

export default map;
