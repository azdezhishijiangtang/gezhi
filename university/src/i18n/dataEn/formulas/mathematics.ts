import type { FormulaEntry, FormulaGroup } from '@/types';

type FormulaPatch = Partial<FormulaEntry> & { id: string };
type GroupPatch = Omit<Partial<FormulaGroup>, 'formulas'> & { formulas?: FormulaPatch[] };

/**
 * 数学区公式组英文覆盖（对应 src/data/formulas.ts 中内联的 formulaGroups）。
 * 只覆盖文本字段；latex 与源数据逐字一致，便于核对。
 */
const map: Record<string, GroupPatch> = {
  'calc-limits': {
    name: 'Limits and Equivalent Infinitesimals',
    formulas: [
      { id: 'f-1', group: 'Limits', name: 'The First Fundamental Limit', latex: '\\lim_{x \\to 0}\\frac{\\sin x}{x} = 1' },
      { id: 'f-2', group: 'Limits', name: 'The Second Fundamental Limit', latex: '\\lim_{x \\to \\infty}\\left(1+\\frac{1}{x}\\right)^x = e' },
      { id: 'f-3', group: 'Equivalent Infinitesimals', name: 'Common Equivalences as x → 0', latex: '\\sin x \\sim x,\\ \\tan x \\sim x,\\ \\arcsin x \\sim x,\\ \\arctan x \\sim x' },
      { id: 'f-4', group: 'Equivalent Infinitesimals', name: 'Cosine and Exponential', latex: '1-\\cos x \\sim \\tfrac{1}{2}x^2,\\quad e^x - 1 \\sim x,\\quad \\ln(1+x) \\sim x' },
      { id: 'f-5', group: 'Equivalent Infinitesimals', name: 'Power-Function Type', latex: '(1+x)^\\alpha - 1 \\sim \\alpha x' },
    ],
  },
  'calc-derivative': {
    name: 'Derivatives and Differentials',
    formulas: [
      { id: 'f-6', group: 'Definition of Derivative', name: 'Definition of the Derivative', latex: "f'(x_0) = \\lim_{x \\to x_0}\\frac{f(x)-f(x_0)}{x-x_0} = \\lim_{h \\to 0}\\frac{f(x_0+h)-f(x_0)}{h}" },
      { id: 'f-7', group: 'Rules', name: 'Leibniz Rule (Product Rule)', latex: "(uv)' = u'v + uv'" },
      { id: 'f-8', group: 'Mean Value Theorems', name: "Lagrange's Mean Value Theorem", latex: "f(b)-f(a) = f'(\\xi)(b-a),\\quad \\xi \\in (a,b)" },
      { id: 'f-9', group: 'Mean Value Theorems', name: "Taylor's Formula (Peano Remainder)", latex: 'f(x) = \\sum_{k=0}^{n}\\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k + o\\big((x-x_0)^n\\big)' },
    ],
  },
  'calc-integral': {
    name: 'Integral Calculus',
    formulas: [
      { id: 'f-10', group: 'Basic Formulas', name: 'Newton–Leibniz Formula', latex: '\\int_a^b f(x)\\,dx = F(b) - F(a),\\quad F\' = f' },
      { id: 'f-11', group: 'Integration by Substitution', name: 'Substitution Formula', latex: '\\int_a^b f(x)\\,dx = \\int_{\\alpha}^{\\beta} f(\\varphi(t))\\varphi\'(t)\\,dt' },
      { id: 'f-12', group: 'Integration by Parts', name: 'Integration by Parts', latex: '\\int_a^b u\\,dv = \\big[uv\\big]_a^b - \\int_a^b v\\,du' },
      { id: 'f-13', group: 'Symmetry', name: 'Odd and Even Functions', latex: 'f\\ \\text{odd} \\Rightarrow \\int_{-a}^{a} f = 0;\\quad f\\ \\text{even} \\Rightarrow \\int_{-a}^{a} f = 2\\int_0^a f' },
    ],
  },
  'la-basics': {
    name: 'Core Formulas of Linear Algebra',
    formulas: [
      { id: 'f-14', group: 'Determinants', name: 'Cofactor Expansion along a Row', latex: '\\det A = \\sum_{j=1}^{n} a_{ij}(-1)^{i+j}M_{ij}' },
      { id: 'f-15', group: 'Determinants', name: 'Product Formula', latex: '\\det(AB) = \\det A \\cdot \\det B' },
      { id: 'f-16', group: 'Matrices', name: 'Inverse Matrix Formula', latex: 'A^{-1} = \\frac{1}{\\det A}A^{*},\\quad (A^{*})_{ij} = A_{ji}' },
      { id: 'f-17', group: 'Eigenvalues', name: 'Characteristic Equation', latex: '|\\lambda E - A| = 0,\\quad \\sum \\lambda_i = \\operatorname{tr}(A),\\ \\prod \\lambda_i = \\det A' },
      { id: 'f-18', group: 'Eigenvalues', name: 'Diagonalization', latex: 'P^{-1}AP = \\Lambda = \\operatorname{diag}(\\lambda_1,\\dots,\\lambda_n)' },
    ],
  },
  'prob-core': {
    name: 'Core Formulas of Probability Theory',
    formulas: [
      { id: 'f-19', group: 'Conditional Probability', name: 'Conditional Probability', latex: 'P(A \\mid B) = \\frac{P(AB)}{P(B)},\\quad P(B) > 0' },
      { id: 'f-20', group: 'Conditional Probability', name: 'Multiplication Rule', latex: 'P(AB) = P(B)\\,P(A \\mid B)' },
      { id: 'f-21', group: 'Total Probability', name: 'Law of Total Probability', latex: 'P(A) = \\sum_{i=1}^{n}P(B_i)P(A \\mid B_i)' },
      { id: 'f-22', group: "Bayes' Theorem", name: "Bayes' Formula", latex: 'P(B_i \\mid A) = \\frac{P(B_i)P(A \\mid B_i)}{\\sum_{j}P(B_j)P(A \\mid B_j)}' },
      { id: 'f-23', group: 'Numerical Characteristics', name: 'Expectation and Variance', latex: 'E(X) = \\sum x_k p_k,\\quad D(X) = E(X^2) - [E(X)]^2' },
      { id: 'f-24', group: 'Numerical Characteristics', name: 'Properties of Variance', latex: 'D(aX+b) = a^2D(X),\\quad D(X \\pm Y) = D(X) + D(Y)\\ (X,Y\\ \\text{独立})' },
      { id: 'f-25', group: 'Common Distributions', name: 'Normal Distribution', latex: 'X \\sim N(\\mu,\\sigma^2),\\quad Z = \\frac{X-\\mu}{\\sigma} \\sim N(0,1)' },
    ],
  },
  'ma-core': {
    name: 'Core of Mathematical Analysis',
    formulas: [
      { id: 'f-26', group: 'Theory of Real Numbers', name: 'Cauchy Convergence Criterion', latex: '\\{x_n\\}\\ \\text{收敛} \\iff \\forall \\varepsilon>0,\\ \\exists N,\\ m,n>N \\Rightarrow |x_n-x_m|<\\varepsilon' },
      { id: 'f-27', group: 'Uniform Convergence', name: 'Test for Uniform Convergence', latex: 'f_n \\rightrightarrows f \\iff \\sup_{x\\in D}|f_n(x)-f(x)| \\to 0' },
      { id: 'f-28', group: 'Integrals with Parameters', name: 'Differentiation under the Integral Sign', latex: "I'(t) = \\int_a^b \\frac{\\partial f}{\\partial t}(x,t)\\,dx" },
      { id: 'f-29', group: 'Special Functions', name: 'Recurrence of the Gamma Function', latex: '\\Gamma(s+1) = s\\,\\Gamma(s),\\quad \\Gamma(n+1)=n!,\\ \\Gamma\\!\\left(\\tfrac{1}{2}\\right)=\\sqrt{\\pi}' },
      { id: 'f-30', group: 'Special Functions', name: 'Relation between Beta and Gamma Functions', latex: 'B(p,q) = \\frac{\\Gamma(p)\\,\\Gamma(q)}{\\Gamma(p+q)}' },
    ],
  },
  'ag-core': {
    name: 'Core of Analytic Geometry',
    formulas: [
      { id: 'f-31', group: 'Vector Operations', name: 'Dot Product', latex: '\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta = a_1b_1+a_2b_2+a_3b_3' },
      { id: 'f-32', group: 'Vector Operations', name: 'Scalar Triple Product', latex: '(\\vec{a},\\vec{b},\\vec{c}) = (\\vec{a}\\times\\vec{b})\\cdot\\vec{c} = V_{\\text{六面体}}' },
      { id: 'f-33', group: 'Planes and Lines', name: 'Distance from a Point to a Plane', latex: 'd = \\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}' },
      { id: 'f-34', group: 'Surfaces', name: 'Ellipsoid', latex: '\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2} = 1' },
      { id: 'f-35', group: 'Surfaces', name: 'Hyperboloid of One Sheet', latex: '\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2} = 1' },
    ],
  },
  'ode-core': {
    name: 'Core of Ordinary Differential Equations',
    formulas: [
      { id: 'f-36', group: 'First-Order Equations', name: 'General Solution of a First-Order Linear ODE', latex: "y = e^{-\\int P\\,dx}\\left(\\int Q\\,e^{\\int P\\,dx}\\,dx + C\\right)" },
      { id: 'f-37', group: 'Higher-Order Equations', name: 'Characteristic Equation', latex: '\\lambda^n + a_{n-1}\\lambda^{n-1}+\\cdots+a_0 = 0' },
      { id: 'f-38', group: 'Higher-Order Equations', name: 'Repeated and Complex Roots', latex: 'k\\,\\text{重根}\\ \\lambda:\\ e^{\\lambda x},xe^{\\lambda x},\\dots,x^{k-1}e^{\\lambda x};\\quad \\alpha\\pm i\\beta:\\ e^{\\alpha x}\\cos\\beta x, e^{\\alpha x}\\sin\\beta x' },
      { id: 'f-39', group: 'Systems of Equations', name: 'Matrix Exponential Solution', latex: '\\vec{y}\' = A\\vec{y},\\quad \\vec{y}(x) = e^{xA}\\vec{y}(0)' },
    ],
  },
  'pde-core': {
    name: 'Core of Partial Differential Equations',
    formulas: [
      { id: 'f-40', group: 'Canonical Equations', name: 'The Three Classical Equations', latex: 'u_{tt}=a^2u_{xx}\\ \\text{(波动)};\\quad u_t=a^2u_{xx}\\ \\text{(热)};\\quad \\Delta u=0\\ \\text{(调和)}' },
      { id: 'f-41', group: 'Fourier Series', name: 'Fourier Series', latex: 'f(x) = \\frac{a_0}{2}+\\sum_{n=1}^{\\infty}\\left(a_n\\cos\\frac{n\\pi x}{L}+b_n\\sin\\frac{n\\pi x}{L}\\right)' },
      { id: 'f-42', group: 'Fourier Series', name: 'Coefficient Formulas', latex: 'a_n=\\frac{1}{L}\\int_{-L}^{L}f(x)\\cos\\frac{n\\pi x}{L}\\,dx,\\quad b_n=\\frac{1}{L}\\int_{-L}^{L}f(x)\\sin\\frac{n\\pi x}{L}\\,dx' },
      { id: 'f-43', group: 'Green Functions', name: 'Fundamental Solution in 3D', latex: '\\Phi = \\frac{1}{4\\pi r},\\quad r=\\sqrt{(x-\\xi)^2+(y-\\eta)^2+(z-\\zeta)^2}' },
    ],
  },
  'ca-core': {
    name: 'Core of Complex Analysis',
    formulas: [
      { id: 'f-44', group: 'Analyticity', name: 'Cauchy–Riemann Equations', latex: '\\frac{\\partial u}{\\partial x}=\\frac{\\partial v}{\\partial y},\\quad \\frac{\\partial u}{\\partial y}=-\\frac{\\partial v}{\\partial x}' },
      { id: 'f-45', group: 'Cauchy Theory', name: 'Cauchy Integral Formula', latex: 'f(z_0) = \\frac{1}{2\\pi i}\\oint_C \\frac{f(z)}{z-z_0}\\,dz' },
      { id: 'f-46', group: 'Cauchy Theory', name: 'Formula for Higher Derivatives', latex: "f^{(n)}(z_0) = \\frac{n!}{2\\pi i}\\oint_C \\frac{f(z)}{(z-z_0)^{n+1}}\\,dz" },
      { id: 'f-47', group: 'Residues', name: 'Residue Theorem', latex: '\\oint_C f(z)\\,dz = 2\\pi i\\sum_k \\operatorname{Res}(f,z_k)' },
      { id: 'f-48', group: 'Residues', name: 'Residue at a Pole of Order m', latex: 'm\\,\\text{阶极点}:\\ \\operatorname{Res}=\\frac{1}{(m-1)!}\\lim_{z\\to z_0}\\frac{d^{m-1}}{dz^{m-1}}\\big[(z-z_0)^m f(z)\\big]' },
    ],
  },
  'ra-core': {
    name: 'Core of Real Analysis',
    formulas: [
      { id: 'f-49', group: 'Measure', name: 'Lebesgue Outer Measure', latex: 'm^*(E) = \\inf\\left\\{\\sum_k |I_k| : E \\subset \\bigcup_k I_k\\right\\}' },
      { id: 'f-50', group: 'Integration', name: 'Dominated Convergence Theorem', latex: 'f_n\\to f,\\ |f_n|\\le g\\ (g\\ \\text{可积}) \\ \\Rightarrow\\ \\int f_n \\to \\int f' },
      { id: 'f-51', group: 'Lp Spaces', name: "Hölder's Inequality", latex: '\\int|fg| \\le \\|f\\|_p\\,\\|g\\|_q,\\quad \\frac{1}{p}+\\frac{1}{q}=1' },
      { id: 'f-52', group: 'Lp Spaces', name: "Parseval's Identity", latex: '\\sum_n |\\langle f,e_n\\rangle|^2 = \\|f\\|_2^2\\ \\text{(完备正交系)}' },
    ],
  },
  'fa-core': {
    name: 'Core of Functional Analysis',
    formulas: [
      { id: 'f-53', group: 'Contraction Mapping', name: 'Banach Fixed-Point Theorem', latex: 'd(Tx,Ty)\\le q\\,d(x,y)\\ (0\\le q<1) \\ \\Rightarrow\\ \\exists!\\ x^*=Tx^*,\\ d(x_n,x^*)\\le\\frac{q^n}{1-q}d(x_1,x_0)' },
      { id: 'f-54', group: 'Hilbert Spaces', name: 'Cauchy–Schwarz Inequality', latex: '|\\langle x,y\\rangle| \\le \\|x\\|\\,\\|y\\|' },
      { id: 'f-55', group: 'Hilbert Spaces', name: 'Riesz Representation Theorem', latex: 'f(x)=\\langle x,z\\rangle\\ \\ (\\forall x),\\quad H^*\\cong H' },
      { id: 'f-56', group: 'Operators', name: 'Resolvent', latex: '\\sigma(T)=\\{\\lambda : \\lambda I - T\\ \\text{不可逆}\\},\\quad R(\\lambda,T)=(\\lambda I-T)^{-1}' },
    ],
  },
  'aa-core': {
    name: 'Core of Abstract Algebra',
    formulas: [
      { id: 'f-57', group: 'Group Theory', name: "Lagrange's Theorem", latex: '|G| = [G:H]\\,|H|,\\quad H\\le G\\ \\text{有限}' },
      { id: 'f-58', group: 'Group Theory', name: 'First Isomorphism Theorem', latex: 'G/\\ker\\varphi \\cong \\operatorname{im}\\varphi' },
      { id: 'f-59', group: 'Group Theory', name: 'Orbit–Stabilizer Theorem', latex: '|G| = |\\operatorname{Orb}(x)|\\,|\\operatorname{Stab}(x)|' },
      { id: 'f-60', group: 'Field Theory', name: 'Galois Correspondence', latex: '\\text{中间域}\\ E\\ \\longleftrightarrow\\ \\operatorname{Gal}(L/E)\\le \\operatorname{Gal}(L/K)' },
    ],
  },
  'top-core': {
    name: 'Core of Topology',
    formulas: [
      { id: 'f-61', group: 'Compactness', name: 'Heine–Borel Theorem', latex: '\\mathbb{R}^n\\ \\text{中子集紧致} \\iff \\text{有界闭集}' },
      { id: 'f-62', group: 'Fundamental Group', name: 'Fundamental Group of the Circle', latex: '\\pi_1(S^1) \\cong \\mathbb{Z}' },
      { id: 'f-63', group: 'Fundamental Group', name: 'van Kampen Theorem', latex: '\\pi_1(X) \\cong \\pi_1(U) *_{\\pi_1(U\\cap V)} \\pi_1(V)' },
      { id: 'f-64', group: 'Invariants', name: 'Euler Characteristic', latex: '\\chi = V-E+F,\\quad \\chi(S^2)=2,\\ \\chi(T^2)=0,\\ \\chi(K)=0' },
    ],
  },
  'dg-core': {
    name: 'Core of Differential Geometry',
    formulas: [
      { id: 'f-65', group: 'Curve Theory', name: 'Curvature and Torsion', latex: '\\kappa=\\frac{|\\vec{r}\'\\times\\vec{r}\'\'|}{|\\vec{r}\'|^3},\\quad \\tau=\\frac{(\\vec{r}\',\\vec{r}\'\',\\vec{r}\'\'\')}{|\\vec{r}\'\\times\\vec{r}\'\'|^2}' },
      { id: 'f-66', group: 'Surface Theory', name: 'The Two Fundamental Forms', latex: '\\mathrm{I}=E\\,du^2+2F\\,du\\,dv+G\\,dv^2,\\quad \\mathrm{II}=L\\,du^2+2M\\,du\\,dv+N\\,dv^2' },
      { id: 'f-67', group: 'Surface Theory', name: 'Gaussian Curvature', latex: 'K=\\kappa_1\\kappa_2=\\frac{LN-M^2}{EG-F^2}' },
      { id: 'f-68', group: 'Global Geometry', name: 'Gauss–Bonnet Theorem', latex: '\\iint_M K\\,dA = 2\\pi\\,\\chi(M) = 2\\pi(2-2g)' },
    ],
  },
  'na-core': {
    name: 'Core of Numerical Analysis',
    formulas: [
      { id: 'f-69', group: 'Interpolation', name: 'Lagrange Interpolation', latex: 'L_n(x)=\\sum_{k=0}^n y_k\\,\\ell_k(x),\\quad \\ell_k(x)=\\prod_{j\\ne k}\\frac{x-x_j}{x_k-x_j}' },
      { id: 'f-70', group: 'Numerical Integration', name: "Simpson's Rule", latex: '\\int_a^b f \\approx \\frac{b-a}{6}\\left[f(a)+4f\\!\\left(\\frac{a+b}{2}\\right)+f(b)\\right]' },
      { id: 'f-71', group: 'Numerical Integration', name: 'Romberg Extrapolation', latex: 'R_k = \\frac{4^k T(h/2^k)-T(h/2^{k-1})}{4^k-1}' },
      { id: 'f-72', group: 'Linear Algebra', name: 'Condition Number', latex: '\\kappa(A)=\\|A\\|\\,\\|A^{-1}\\|,\\quad \\frac{\\|\\delta x\\|}{\\|x\\|}\\le\\kappa(A)\\frac{\\|\\delta b\\|}{\\|b\\|}' },
    ],
  },
  'sp-core': {
    name: 'Core of Stochastic Processes',
    formulas: [
      { id: 'f-73', group: 'Markov Chains', name: 'Chapman–Kolmogorov Equations', latex: 'p_{ij}^{(n+m)}=\\sum_k p_{ik}^{(n)}p_{kj}^{(m)},\\quad P^{(n)}=P^n' },
      { id: 'f-74', group: 'Markov Chains', name: 'Stationary Distribution', latex: '\\pi P=\\pi,\\quad \\lim_{n\\to\\infty}p_{ij}^{(n)}=\\pi_j\\ \\text{(遍历链)}' },
      { id: 'f-75', group: 'Poisson Process', name: 'Poisson Counting', latex: 'N(t)\\sim P(\\lambda t),\\quad P(N(t)=k)=\\frac{(\\lambda t)^k e^{-\\lambda t}}{k!}' },
      { id: 'f-76', group: 'Martingale Theory', name: 'Definition of a Martingale', latex: 'E[M_t\\mid\\mathcal{F}_s]=M_s\\ (s\\le t);\\quad E[B_t]=0,\\ E[B_t^2]=t' },
    ],
  },
  'comb-core': {
    name: 'Core of Combinatorics',
    formulas: [
      { id: 'f-77', group: 'Generating Functions', name: 'Geometric Series', latex: '\\sum_{n\\ge0}x^n=\\frac{1}{1-x},\\quad \\sum_{n\\ge0}\\binom{n+k}{k}x^n=\\frac{1}{(1-x)^{k+1}}' },
      { id: 'f-78', group: 'Generating Functions', name: 'Catalan Numbers', latex: 'C_n=\\frac{1}{n+1}\\binom{2n}{n},\\quad C(x)=\\frac{1-\\sqrt{1-4x}}{2x}' },
      { id: 'f-79', group: 'Inclusion–Exclusion', name: 'Inclusion–Exclusion Formula', latex: '\\left|\\bigcup_{i=1}^n A_i\\right|=\\sum_{\\varnothing\\ne S\\subseteq[n]}(-1)^{|S|+1}\\left|\\bigcap_{i\\in S}A_i\\right|' },
      { id: 'f-80', group: 'Group Actions', name: "Burnside's Lemma", latex: '\\text{轨道数}=\\frac{1}{|G|}\\sum_{g\\in G}|\\operatorname{Fix}(g)|' },
    ],
  },
  'log-core': {
    name: 'Core of Mathematical Logic',
    formulas: [
      { id: 'f-81', group: 'Metatheorems', name: 'Soundness and Completeness', latex: '\\Gamma\\vdash\\varphi \\iff \\Gamma\\vDash\\varphi\\ \\text{(一阶逻辑)}' },
      { id: 'f-82', group: 'Metatheorems', name: 'Compactness Theorem', latex: '\\text{每个有限子集可满足} \\Rightarrow \\text{整体可满足}' },
      { id: 'f-83', group: 'Gödel', name: 'First Incompleteness Theorem', latex: 'T\\ \\text{相容且足够强} \\Rightarrow \\exists G:\\ T\\nvdash G,\\ T\\nvdash\\neg G' },
      { id: 'f-84', group: 'Computability', name: 'Diagonal Method', latex: 'D(P)=\\begin{cases}\\text{死循环} & H(P,P)\\text{判定停机}\\\\text{停机} & \\text{否则}\\end{cases}\\Rightarrow H\\text{不存在}' },
    ],
  },
};

export default map;
