import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-comb-1': {
    title: 'Closed Form for Fibonacci Numbers via Generating Functions',
    question:
      'The Fibonacci numbers satisfy $F_0 = 0,\\ F_1 = 1,\\ F_n = F_{n-1}+F_{n-2}$. Use generating functions to derive an explicit formula for $F_n$.',
    hints: [
      'Set $F(x) = \\sum F_n x^n$ and use the recurrence to write down an equation.',
      'After solving for the rational function, apply partial fractions: the denominator has the linear factors $(1-\\varphi x)$ and $(1-\\hat\\varphi x)$.',
    ],
    solution: [
      {
        title: 'Set up the equation',
        detail:
          '$$F(x) = \\sum_{n \\ge 0} F_n x^n = x + \\sum_{n \\ge 2}(F_{n-1}+F_{n-2})x^n = x + xF(x) + x^2F(x)$$ Hence $F(x) = \\dfrac{x}{1 - x - x^2}$.',
      },
      {
        title: 'Partial fractions',
        detail:
          '$1 - x - x^2 = -(x - \\varphi)(x - \\hat{\\varphi})$, where $\\varphi = \\frac{1+\\sqrt5}{2}$ and $\\hat\\varphi = \\frac{1-\\sqrt5}{2} = -1/\\varphi$. Therefore $$F(x) = \\frac{1}{\\sqrt5}\\left(\\frac{1}{1-\\varphi x} - \\frac{1}{1-\\hat\\varphi x}\\right)$$',
      },
      {
        title: 'Read off the coefficients',
        detail:
          'Since $\\frac{1}{1-ax} = \\sum a^n x^n$, we obtain $$F_n = \\frac{\\varphi^n - \\hat\\varphi^n}{\\sqrt{5}}$$ which is Binet\'s formula.',
      },
    ],
    answer:
      '$F_n = \\dfrac{\\varphi^n - \\hat{\\varphi}^n}{\\sqrt{5}}$ (with $\\varphi = \\frac{1+\\sqrt5}{2}$, $\\hat\\varphi = \\frac{1-\\sqrt5}{2}$).',
    tags: ['generating function', 'Fibonacci', 'Binet formula'],
  },
  'p-comb-2': {
    title: 'Counting Derangements by Inclusion-Exclusion',
    question:
      'Five letters are put into five envelopes. How many arrangements leave every letter in a wrong envelope?',
    hints: [
      'Start from the whole set $5!$ and subtract the cases where "at least one letter is correct" — exactly the setting for inclusion-exclusion.',
      '$A_i$ = letter $i$ is in its correct envelope; when $k$ specified letters are correct the rest are arbitrary: $(5-k)!$.',
    ],
    solution: [
      {
        title: 'Write the inclusion-exclusion sum',
        detail:
          '$$D_5 = 5! - \\binom{5}{1}4! + \\binom{5}{2}3! - \\binom{5}{3}2! + \\binom{5}{4}1! - \\binom{5}{5}0!$$',
      },
      {
        title: 'Compute',
        detail:
          '$D_5 = 120 - 5 \\times 24 + 10 \\times 6 - 10 \\times 2 + 5 \\times 1 - 1 = 120 - 120 + 60 - 20 + 5 - 1 = 44$.',
      },
      {
        title: 'A probabilistic view',
        detail:
          'The probability that all are wrong is $D_5/5! = \\frac{44}{120} \\approx 0.367$, close to $1/e \\approx 0.368$ — as $n$ grows it converges to $1/e$.',
      },
    ],
    answer: '$D_5 = 44$ arrangements (probability about $0.367$).',
    tags: ['inclusion-exclusion', 'derangement', 'combinatorial counting'],
  },
  'p-comb-3': {
    title: 'Counting Necklaces with Burnside\'s Lemma',
    question:
      'Three red and three blue beads are strung into a necklace (rotations are identified, but a reflected necklace counts as different). How many essentially different necklaces are there?',
    hints: [
      'The rotation group $C_6$ acts on the 6 bead positions; Burnside: number of orbits = average number of fixed colourings.',
      'Count separately the colourings fixed by the identity and by rotations through 1 to 5 positions (remember that the colour count must still be 3 red and 3 blue).',
    ],
    solution: [
      {
        title: 'Classify and count the fixed colourings',
        detail:
          'A rotation by $k$ positions splits the 6 bead positions into $\\gcd(6,k)$ cycles, and a colouring is fixed only if it is constant on each cycle:\\n\\n- $k = 0$ (identity): $\\binom{6}{3} = 20$;\\n- $k = 1, 5$: a single 6-cycle, all beads would have to share one colour — impossible, 0;\\n- $k = 2, 4$: two 3-cycles, one all red and one all blue, 2 each;\\n- $k = 3$: three 2-cycles, each pair identical ⇒ the number of red beads must be even — impossible, 0.',
      },
      {
        title: 'Burnside\'s lemma',
        detail:
          'Number of orbits (essentially different necklaces) $= \\dfrac{1}{|C_6|}\\sum_{g} |\\operatorname{Fix}(g)| = \\dfrac{20 + 0 + 2 + 0 + 2 + 0}{6} = \\dfrac{24}{6} = 4$.',
      },
      {
        title: 'Result',
        detail:
          'Four in total: RRRBBB, RRBRBB, RRBBRB and RBRBRB (up to rotation).',
      },
    ],
    answer: 'There are $4$ essentially different necklaces (Burnside\'s lemma).',
    tags: ['Burnside', 'group action', 'necklace counting'],
  },
};

export default map;
