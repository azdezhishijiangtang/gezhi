/**
 * 课程英文覆盖映射：键为课程 id，值为要覆盖的中文字段（英文）。
 * 由翻译流程按字段填充；未提供的字段保持中文。
 *
 * 注意：Course.difficulty 在源类型中为中文字面量联合，但英文模式需展示
 * Basic / Intermediate / Advanced，故此处用 CourseOverride 表达覆盖值，
 * 再以 as 桥接为 Record<string, Partial<Course>>，保证类型检查通过且运行期正确。
 */
import type { Course } from '@/types';

type CourseOverride = Omit<Partial<Course>, 'difficulty'> & {
  difficulty?: 'Basic' | 'Intermediate' | 'Advanced';
};

const courseEnData: Record<string, CourseOverride> = {
  // ─────────────────────── 大一：基础课 ───────────────────────
  calculus: {
    name: 'Advanced Mathematics',
    description:
      'Centered on calculus, this course covers limits and continuity, single- and multivariable differential and integral calculus, infinite series, and ordinary differential equations—the most important mathematical foundation for science and engineering disciplines.',
    difficulty: 'Basic',
    tags: ['Calculus', 'Limits', 'Series', 'Math I (Grad Entrance Exam)'],
    semester: 'Y1 Fall / Y1 Spring',
  },
  'linear-algebra': {
    name: 'Linear Algebra',
    description:
      'The study of vectors, matrices, and linear transformations, covering determinants, matrix operations, systems of linear equations, vector spaces, eigenvalues, and quadratic forms—the language of data science and machine learning.',
    difficulty: 'Basic',
    tags: ['Matrices', 'Eigenvalues', 'Vector Spaces', 'Quadratic Forms'],
    semester: 'Y1 Spring / Y2 Fall',
  },
  'mathematical-analysis': {
    name: 'Mathematical Analysis',
    description:
      'The first "real" mathematics course for math majors: rebuilding calculus with the ε–δ language. Real-number completeness, uniform convergence, and integrals with parameters cultivate rigorous limit-thinking.',
    difficulty: 'Intermediate',
    tags: ['Real Number Theory', 'Uniform Convergence', 'Gamma Function', 'Analysis'],
    semester: 'Y1 Fall / Y1 Spring',
  },
  'analytic-geometry': {
    name: 'Analytic Geometry',
    description:
      'Studying geometry through algebraic methods: vector operations, planes and lines, quadric surfaces, and coordinate transformations—the first step from constant mathematics to variable mathematics.',
    difficulty: 'Basic',
    tags: ['Vectors', 'Quadric Surfaces', 'Trace Method', 'Coordinate Transformations'],
    semester: 'Y1 Fall',
  },

  // ─────────────────────── 大二：核心课 ───────────────────────
  probability: {
    name: 'Probability and Statistics',
    description:
      'Building probabilistic models from random events, this course studies random variables and their distributions, numerical characteristics, the law of large numbers, and the central limit theorem, then introduces parameter estimation and hypothesis testing.',
    difficulty: 'Intermediate',
    tags: ['Random Variables', 'Bayesian', 'Normal Distribution', 'Hypothesis Testing'],
    semester: 'Y2 Fall / Y2 Spring',
  },
  'discrete-math': {
    name: 'Discrete Mathematics',
    description:
      'The mathematical foundation of computer science, covering propositional and predicate logic, sets and relations, combinatorial counting, graph theory, and trees, fostering rigorous abstraction and reasoning.',
    difficulty: 'Intermediate',
    tags: ['Logic', 'Graph Theory', 'Combinatorial Counting', 'Predicates'],
    semester: 'Y2 Fall',
  },
  ode: {
    name: 'Ordinary Differential Equations',
    description:
      'The study of equations involving derivatives of unknown functions: solution methods for first-order equations, higher-order linear theory, systems of equations, and qualitative phase-plane analysis—the language describing evolutionary processes.',
    difficulty: 'Intermediate',
    tags: ['Characteristic Equation', 'Variation of Parameters', 'Phase Plane', 'Stability'],
    semester: 'Y2 Fall',
  },
  pde: {
    name: 'Partial Differential Equations',
    description:
      'The three canonical equations of waves, heat conduction, and harmonic functions; Fourier series with separation of variables, and Green’s function method—the classical core of mathematical physics and the mathematical language of physics.',
    difficulty: 'Advanced',
    tags: ['Separation of Variables', 'Fourier Series', "Green’s Function", 'Boundary Value Problems'],
    semester: 'Y3 Fall',
  },
  'complex-analysis': {
    name: 'Complex Analysis',
    description:
      'Extending calculus to the complex plane: analytic functions, Cauchy’s integral theorem, and the residue theorem. The rigidity of complex differentiability yields powerful tools unavailable in real analysis.',
    difficulty: 'Intermediate',
    tags: ["Cauchy’s Theorem", 'Residues', 'Analytic Functions', 'Conformal Mapping'],
    semester: 'Y2 Spring',
  },
  'abstract-algebra': {
    name: 'Abstract Algebra',
    description:
      'The three great structures of groups, rings, and fields—from the symmetric group to Galois theory. Recasting "solving equations" and "straightedge-and-compass construction" through an algebraic lens, the unifying language of modern mathematics.',
    difficulty: 'Advanced',
    tags: ['Group Theory', 'Rings and Fields', 'Galois', 'Unique Factorization'],
    semester: 'Y3 Fall',
  },
  combinatorics: {
    name: 'Combinatorics',
    description:
      'The art of counting: generating functions, the inclusion–exclusion principle, the pigeonhole principle and Ramsey theory, and Pólya enumeration—the mathematical kitchen behind algorithm analysis and cryptography.',
    difficulty: 'Intermediate',
    tags: ['Generating Functions', 'Inclusion–Exclusion', "Burnside’s Lemma", 'Design Theory'],
    semester: 'Y3 Fall',
  },

  // ─────────────────────── 大三：进阶课 ───────────────────────
  'real-analysis': {
    name: 'Real Analysis',
    description:
      'Lebesgue measure and integration theory: dominated convergence, Fubini’s theorem, and Lp spaces—liberating integration from "the small circle of continuous functions" to "almost everywhere."',
    difficulty: 'Advanced',
    tags: ['Lebesgue Integral', 'Lp Spaces', 'Dominated Convergence', 'Measure Theory'],
    semester: 'Y3 Fall',
  },
  'functional-analysis': {
    name: 'Functional Analysis',
    description:
      'Calculus on infinite-dimensional spaces: Banach and Hilbert spaces, bounded linear operators, and spectral theory—the mathematical framework underlying quantum mechanics and optimization theory.',
    difficulty: 'Advanced',
    tags: ['Banach Spaces', 'Spectral Theory', 'Dual Spaces', 'Contraction Mapping'],
    semester: 'Y3 Spring',
  },
  topology: {
    name: 'Topology',
    description:
      'Rubber-sheet geometry: open sets, continuity, compactness, connectedness, up to the fundamental group. It never measures length, only asks "can this be continuously deformed into that?"',
    difficulty: 'Advanced',
    tags: ['Compactness', 'Fundamental Group', 'Homeomorphism', 'van Kampen'],
    semester: 'Y3 Fall',
  },
  'differential-geometry': {
    name: 'Differential Geometry',
    description:
      'The calculus of curves and surfaces: the two fundamental forms, Gaussian curvature, geodesics, and the Gauss–Bonnet theorem—from the Theorema Egregium all the way to general relativity.',
    difficulty: 'Advanced',
    tags: ['Curvature', 'Geodesics', 'Gauss–Bonnet', 'Intrinsic Geometry'],
    semester: 'Y3 Spring',
  },
  'stochastic-processes': {
    name: 'Stochastic Processes',
    description:
      'Random phenomena evolving over time: Markov chains, Poisson processes, Brownian motion, and martingales—the mathematical foundation of financial engineering and queueing theory.',
    difficulty: 'Advanced',
    tags: ['Markov Chains', 'Brownian Motion', 'Martingales', 'Poisson Processes'],
    semester: 'Y3 Spring',
  },
  'numerical-analysis': {
    name: 'Numerical Analysis',
    description:
      'Making computers do mathematics: interpolation and approximation, numerical integration, numerical solutions of linear systems, and eigenvalue computation—the balancing act between approximation error and round-off error.',
    difficulty: 'Intermediate',
    tags: ['Interpolation', 'Gaussian Quadrature', 'Condition Number', 'QR Algorithm'],
    semester: 'Y3 Spring',
  },
  'mathematical-logic': {
    name: 'Mathematical Logic',
    description:
      'The mathematics of mathematics: soundness and completeness of first-order logic, Gödel’s incompleteness theorems, Turing machines, and computability—the theoretical source of computer science.',
    difficulty: 'Advanced',
    tags: ['Gödel', 'Turing Machine', 'Halting Problem', 'First-Order Logic'],
    semester: 'Y4 Fall',
  },

  // ─────────────────────── 选修与前沿：应用数学方向 ───────────────────────
  'elementary-number-theory': {
    name: 'Elementary Number Theory',
    description:
      'The study of integers: divisibility and primes, congruences and residue classes, primitive roots and the law of quadratic reciprocity, and Diophantine equations. Simple-looking questions hide the deepest number-theoretic structures, and also form the bedrock of modern cryptography.',
    difficulty: 'Intermediate',
    tags: ['Congruences', 'Chinese Remainder Theorem', 'Quadratic Reciprocity', 'Diophantine Equations'],
    semester: 'Y2 Spring',
  },
  optimization: {
    name: 'Optimization Methods',
    description:
      'Finding optima under constraints: convex analysis, linear programming and the simplex method, duality theory, and the KKT conditions for unconstrained and constrained optimization—a shared tool of operations research, engineering, and machine learning.',
    difficulty: 'Intermediate',
    tags: ['Convex Optimization', 'Simplex Method', 'Duality', 'KKT Conditions'],
    semester: 'Y3 Spring',
  },
  cryptography: {
    name: 'Foundations of Cryptography',
    description:
      'Safeguarding information with mathematics: classical ciphers and frequency analysis, block ciphers and hash functions, RSA and elliptic curves, digital signatures, and key exchange—the most successful engineering application of number theory and algebra.',
    difficulty: 'Intermediate',
    tags: ['RSA', 'Elliptic Curves', 'Hash', 'Digital Signatures'],
    semester: 'Y3 Spring',
  },
  'data-science-math': {
    name: 'Mathematics of Data Science',
    description:
      'The mathematics behind data: SVD and low-rank approximation, principal component analysis, statistical inference, empirical risk minimization, kernel methods and SVMs, MCMC sampling, and information theory—the mathematical core of machine learning.',
    difficulty: 'Intermediate',
    tags: ['SVD', 'PCA', 'Kernel Methods', 'MCMC', 'Information Theory'],
    semester: 'Y4 Fall',
  },

  // ─────────────────────── 物理（本科物理系） ───────────────────────
  mechanics: {
    name: 'Mechanics',
    description:
      'The cornerstone of classical mechanics: from point-particle kinematics and Newton’s laws to momentum, energy, angular momentum, and rigid-body rotation, introducing vibration and waves, and cultivating the ability to describe motion with vectors and calculus.',
    difficulty: 'Basic',
    tags: ["Newton’s Laws", 'Momentum', 'Energy', 'Angular Momentum', 'Rigid Body', 'Vibration'],
    semester: 'Y1 Fall',
  },
  'thermal-physics': {
    name: 'Thermal Physics',
    description:
      'From the macroscopic definition of temperature to the microscopic picture of the kinetic theory of gases, establishing the kinetic theory of molecules, then thoroughly developing the first and second laws of thermodynamics and entropy, to understand energy transformation and its directionality.',
    difficulty: 'Basic',
    tags: ['Temperature', 'Kinetic Theory', 'Laws of Thermodynamics', 'Entropy', 'Carnot Cycle'],
    semester: 'Y1 Spring',
  },
  electromagnetism: {
    name: 'Electromagnetism',
    description:
      'The unity of electricity and magnetism: electrostatic fields, steady currents, steady magnetic fields, and electromagnetic induction, ultimately leading to Maxwell’s equations and explaining why light is an electromagnetic wave.',
    difficulty: 'Intermediate',
    tags: ['Electric Field', 'Magnetic Field', "Gauss’s Law", "Ampère’s Circuital Law", 'Electromagnetic Induction'],
    semester: 'Y2 Fall',
  },
  optics: {
    name: 'Optics',
    description:
      'From paraxial imaging in geometrical optics to interference, diffraction, and polarization in wave optics, revealing the first half of light’s wave–particle duality—the prologue to modern physics.',
    difficulty: 'Intermediate',
    tags: ['Geometrical Optics', 'Interference', 'Diffraction', 'Polarization', 'Holography'],
    semester: 'Y2 Spring',
  },
  'atomic-physics': {
    name: 'Atomic Physics',
    description:
      'From the discovery of the electron to the Bohr atomic model, systematically covering atomic structure, quantization conditions, X-rays, and the basic facts of atomic nuclei and radioactivity—laying the experimental groundwork for quantum mechanics.',
    difficulty: 'Intermediate',
    tags: ['Bohr Model', 'Atomic Structure', 'Spectral Lines', 'Atomic Nucleus', 'Radioactivity'],
    semester: 'Y2 Spring',
  },
  'analytical-mechanics': {
    name: 'Analytical Mechanics',
    description:
      'Recasting mechanics with Lagrange’s equations and Hamilton’s principle: virtual work, generalized coordinates, least action, canonical equations, and small oscillations—the standard language of analytical mechanics.',
    difficulty: 'Advanced',
    tags: ['Lagrange', 'Hamilton', 'Least Action', 'Canonical Equations', 'Small Oscillations'],
    semester: 'Y3 Fall',
  },
  electrodynamics: {
    name: 'Electrodynamics',
    description:
      'Organized around Maxwell’s equations, studying electrostatic, steady, and quasi-stationary electromagnetic fields, the radiation and propagation of electromagnetic waves, and connecting to the covariant form under special relativity.',
    difficulty: 'Advanced',
    tags: ["Maxwell’s Equations", 'Electromagnetic Waves', 'Radiation', 'Relativistic Electrodynamics', 'Boundary Value Problems'],
    semester: 'Y3 Fall',
  },
  'quantum-mechanics': {
    name: 'Quantum Mechanics',
    description:
      'The theory describing the microscopic world: wavefunctions and the Schrödinger equation, operators and commutation relations, one-dimensional stationary states, angular momentum and spin, perturbation theory—reshaping our understanding of "measurement" and "probability."',
    difficulty: 'Advanced',
    tags: ['Schrödinger Equation', 'Operators', 'Angular Momentum', 'Spin', 'Perturbation Theory'],
    semester: 'Y3 Fall',
  },
  'statistical-physics': {
    name: 'Thermodynamics and Statistical Physics',
    description:
      'Deriving macroscopic thermodynamics from microscopic probability: statistics of nearly independent particles, ensemble theory, the partition function, the Boltzmann distribution, and phase transitions—unifying the statistical essence of cold and heat.',
    difficulty: 'Advanced',
    tags: ['Ensembles', 'Partition Function', 'Boltzmann Distribution', 'Phase Transition', 'Fluctuations'],
    semester: 'Y3 Spring',
  },
  'solid-state-physics': {
    name: 'Solid-State Physics',
    description:
      'From crystal structure to lattice vibrations and electronic band structure, explaining why metals conduct, insulators do not, and semiconductors are controllable—the foundation of materials and device physics.',
    difficulty: 'Advanced',
    tags: ['Crystal Structure', 'Lattice Vibrations', 'Energy Bands', 'Semiconductors', 'Fermi Surface'],
    semester: 'Y3 Spring',
  },
  'mathematical-physics': {
    name: 'Methods of Mathematical Physics',
    description:
      'The physicist’s toolbox: complex analysis, special functions (Legendre, Bessel, spherical harmonics), partial differential equations, and integral transforms—powerful instruments for solving real physical problems.',
    difficulty: 'Intermediate',
    tags: ['Complex Analysis', 'Special Functions', 'Separation of Variables', 'Integral Transforms', "Green’s Function"],
    semester: 'Y2 Spring',
  },
  relativity: {
    name: 'Special Relativity',
    description:
      'Redefining simultaneity: Lorentz transformations, spacetime diagrams, the mass–energy relation, and four-vectors—revealing the fundamental divergence between the high-speed world and our everyday intuition.',
    difficulty: 'Advanced',
    tags: ['Lorentz Transformation', 'Simultaneity', 'Mass–Energy Relation', 'Four-Vectors', 'Relativistic Effects'],
    semester: 'Y3 Fall',
  },
  'computational-physics': {
    name: 'Computational Physics',
    description:
      'Solving physics through numerical experiments: numerical differentiation and integration, numerical solutions of ODEs, Monte Carlo simulation, and data fitting—bringing theory to life on computational power.',
    difficulty: 'Intermediate',
    tags: ['Numerical Methods', 'Monte Carlo', 'Differential Equations', 'Data Fitting', 'Visualization'],
    semester: 'Y3 Spring',
  },
  astrophysics: {
    name: 'Introduction to Astrophysics',
    description:
      'Applying the laws of physics to the universe: stellar structure and evolution, black holes, cosmic expansion, and the microwave background—from Newtonian gravity to the cosmological view of general relativity.',
    difficulty: 'Intermediate',
    tags: ['Stellar Evolution', 'Black Holes', 'Cosmology', 'Gravitational Waves', 'Microwave Background'],
    semester: 'Y4 Fall',
  },
  'nuclear-particle-physics': {
    name: 'Nuclear and Particle Physics',
    description:
      'Delving into matter’s most central scale: nuclear structure, radioactive decay, nuclear reactions and fission–fusion, then onward to elementary particles and the Standard Model, answering "what is the world made of?"',
    difficulty: 'Advanced',
    tags: ['Nuclear Structure', 'Radioactive Decay', 'Fission and Fusion', 'Standard Model', 'Quarks'],
    semester: 'Y4 Fall',
  },
};

export const courseEn = courseEnData as unknown as Record<string, Partial<Course>>;
export default courseEn;
