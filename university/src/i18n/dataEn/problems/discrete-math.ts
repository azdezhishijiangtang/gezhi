import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-logic-1': {
    title: "Proving an argument valid with the laws of inference",
    question:
      "Symbolize the following everyday argument and prove it valid: “If it rains, the match is cancelled; the match was not cancelled; therefore it did not rain.” State the law of inference used, and verify the argument with a tautology.",
    hints: [
      "Let $p$: it rains, $q$: the match is cancelled. The two premises are $p \\to q$ and $\\neg q$, and the conclusion is $\\neg p$.",
      "The premise $p \\to q$ is equivalent to its contrapositive $\\neg q \\to \\neg p$.",
      "Apply modus ponens to $\\neg q \\to \\neg p$ and $\\neg q$ to obtain the conclusion.",
    ],
    solution: [
      {
        title: "Symbolization",
        detail: "$p$: it rains, $q$: the match is cancelled. The argument has the form $$p \\to q,\\ \\neg q \\ \\vdash\\ \\neg p$$",
      },
      {
        title: "Rewrite in contrapositive form",
        detail: "By the implication equivalence $p \\to q = \\neg p \\vee q$, while $\\neg q \\to \\neg p = \\neg\\neg q \\vee \\neg p = q \\vee \\neg p$; the two are the same, hence $$p \\to q \\iff \\neg q \\to \\neg p$$",
      },
      {
        title: "Modus ponens gives the conclusion",
        detail: "The premise $\\neg q$ together with $\\neg q \\to \\neg p$ forms modus ponens ($(a \\to b) \\wedge a \\Rightarrow b$ with $a=\\neg q$, $b=\\neg p$): $$(\\neg q \\to \\neg p) \\wedge \\neg q \\Rightarrow \\neg p$$ This is exactly **modus tollens**.",
      },
      {
        title: "Tautology check",
        detail: "The argument is valid $\\iff$ the implication from the conjunction of the premises to the conclusion is a tautology: $$\\big((p \\to q) \\wedge \\neg q\\big) \\to \\neg p$$ Expanding $p \\to q = \\neg p \\vee q$, the premise part becomes $(\\neg p \\vee q) \\wedge \\neg q = (\\neg p \\wedge \\neg q) \\vee (q \\wedge \\neg q) = \\neg p \\wedge \\neg q$, so $$(\\neg p \\wedge \\neg q) \\to \\neg p = \\neg(\\neg p \\wedge \\neg q) \\vee \\neg p = (p \\vee \\neg q) \\vee \\neg p \\equiv \\top$$ and the argument is valid.",
      },
    ],
    answer: "The argument is valid, by modus tollens; the corresponding tautology is $\\big((p \\to q) \\wedge \\neg q\\big) \\to \\neg p$",
    tags: ["propositional logic", "laws of inference", "modus tollens"],
  },
  'p-logic-2': {
    title: "Principal disjunctive normal form and the number of satisfying assignments",
    question:
      "Find the principal disjunctive normal form of the formula $(p \\to q) \\wedge (q \\to r)$ and state how many satisfying assignments it has.",
    hints: [
      "First eliminate the arrows with the implication equivalence: $p \\to q = \\neg p \\vee q$, $q \\to r = \\neg q \\vee r$.",
      "Expand the conjunction of the two disjunctions by the distributive law and delete contradictory conjuncts.",
      "Complete each conjunct into a minterm with $x \\vee \\neg x$ for the missing variable, then merge repeated terms.",
    ],
    solution: [
      {
        title: "Eliminate the implications",
        detail: "$$(p \\to q) \\wedge (q \\to r) = (\\neg p \\vee q) \\wedge (\\neg q \\vee r)$$",
      },
      {
        title: "Expand by distributivity",
        detail: "$$(\\neg p \\vee q) \\wedge (\\neg q \\vee r) = (\\neg p \\wedge \\neg q) \\vee (\\neg p \\wedge r) \\vee (q \\wedge \\neg q) \\vee (q \\wedge r)$$ where $q \\wedge \\neg q$ is a contradiction and is deleted: $$= (\\neg p \\wedge \\neg q) \\vee (\\neg p \\wedge r) \\vee (q \\wedge r)$$",
      },
      {
        title: "Complete the minterms",
        detail: "Add $x \\vee \\neg x$ for the variable missing from each conjunct: $$\\begin{aligned}&\\neg p \\wedge \\neg q = (\\neg p \\wedge \\neg q \\wedge r) \\vee (\\neg p \\wedge \\neg q \\wedge \\neg r)\\\\&\\neg p \\wedge r = (\\neg p \\wedge q \\wedge r) \\vee (\\neg p \\wedge \\neg q \\wedge r)\\\\&q \\wedge r = (p \\wedge q \\wedge r) \\vee (\\neg p \\wedge q \\wedge r)\\end{aligned}$$",
      },
      {
        title: "Merge like terms",
        detail: "Delete the repeated minterm $\\neg p \\wedge \\neg q \\wedge r$ to obtain the PDNF: $$(\\neg p \\wedge \\neg q \\wedge \\neg r) \\vee (\\neg p \\wedge \\neg q \\wedge r) \\vee (\\neg p \\wedge q \\wedge r) \\vee (p \\wedge q \\wedge r)$$ with $4$ minterms in total.",
      },
      {
        title: "Reading the result",
        detail: "The formula $(p \\to q) \\wedge (q \\to r)$ expresses the transitivity $p \\Rightarrow q \\Rightarrow r$. Ordering truth values as $1 > 0$, the satisfying assignments are $(0,0,0),(0,0,1),(0,1,1),(1,1,1)$, exactly $4$; one can also count directly: $r$ is free, $q \\le r$ and $p \\le q$, giving $4$ cases.",
      },
    ],
    answer: "The PDNF contains 4 minterms; there are 4 satisfying assignments in total",
    tags: ["principal disjunctive normal form", "equivalence transformations", "truth table"],
  },
  'p-graphs-1': {
    title: "The handshake lemma and the “how many strokes” problem",
    question:
      "Prove: (1) in any graph the number of odd-degree vertices is necessarily even; (2) if a connected graph has exactly $2k$ odd-degree vertices, then all of its edges can be decomposed into $k$ edge-disjoint trails — that is, every edge can be drawn in at least $k$ strokes.",
    hints: [
      "For (1) use the handshake lemma $\\sum_v d(v) = 2|E|$ and group the vertices by the parity of their degree.",
      "For (2) first add $k$ new edges between the odd-degree vertices so that every vertex has even degree.",
      "The new graph is a connected Eulerian graph and therefore has an Euler circuit; after deleting the $k$ added edges the circuit is cut into at most $k$ segments.",
    ],
    solution: [
      {
        title: "(1) Handshake lemma",
        detail: "$$\\sum_{v} d(v) = 2|E|$$ The right-hand side is even. Group all vertices by the parity of their degree: $$\\sum_{\\text{even}} d(v) + \\sum_{\\text{odd}} d(v) = \\text{even}$$ The degree sum over even-degree vertices is clearly even, so the degree sum over odd-degree vertices must also be even. An odd number of odd numbers sums to an odd number, and only an even number of odd numbers sums to an even one, hence **there are necessarily an even number of odd-degree vertices**.",
      },
      {
        title: "(2) Build an Eulerian graph",
        detail: "Let $G$ be connected with odd-degree vertices $u_1, u_2, \\dots, u_{2k}$. Pair them up and **add one new edge** between each pair (multiple edges allowed), obtaining $G'$. Each odd-degree vertex gains $1$ in degree and becomes even, even-degree vertices stay unchanged, so all vertices of $G'$ have even degree.",
      },
      {
        title: "Euler circuit",
        detail: "$G'$ is still connected with all degrees even, so by the Euler theorem it has an Euler circuit $C$ — a closed walk that traverses every edge exactly once.",
      },
      {
        title: "Delete the new edges, split into k segments",
        detail: "Remove the $k$ added edges from $C$: each deletion either breaks the circuit into two segments or turns the closed walk into an open one, adding at most one segment. Therefore the remaining edges of $G$ in $C$ are split into **at most $k$** edge-disjoint trails. So $k$ strokes suffice.",
      },
      {
        title: "Minimality",
        detail: "Conversely, one stroke (one trail) can “absorb” at most two odd-degree endpoints (interior points are entered and left in pairs and have even degree), so $2k$ odd-degree vertices require at least $\\frac{2k}{2} = k$ strokes. All in all, the minimum number of strokes is exactly $k$.",
      },
    ],
    answer: "(1) The number of odd-degree vertices is even; (2) exactly $k$ strokes are needed, i.e. the minimum number of strokes = the number of odd-degree vertices $\\div$ 2",
    tags: ["handshake lemma", "Euler circuit", "graph theory"],
  },
};

export default map;
