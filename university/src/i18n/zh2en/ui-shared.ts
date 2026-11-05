/**
 * 跨页面共享的短文案词典：学科名、课程分类名、难度标签。
 * 这些中文串来自 SUBJECT_META / courseCategories / difficultyLabel，
 * 在显示处以 t(...) 包裹后查此表。
 */
const dict: Record<string, string> = {
  // 学科（SUBJECT_META）
  数学区: 'Mathematics',
  数学: 'Math',
  物理区: 'Physics',
  物理: 'Physics',
  大学数学本科知识解答: 'Undergraduate mathematics, explained',
  大学物理本科知识解答: 'Undergraduate physics, explained',

  // 课程分类（courseCategories）
  分析: 'Analysis',
  代数与几何: 'Algebra & Geometry',
  概率统计: 'Probability & Statistics',
  方程与计算: 'Equations & Computation',
  离散与逻辑: 'Discrete Math & Logic',
  应用前沿: 'Applied Frontiers',
  经典物理: 'Classical Physics',
  理论物理: 'Theoretical Physics',
  凝聚态与材料: 'Condensed Matter & Materials',
  方法与计算: 'Methods & Computation',
  天体与粒子: 'Astrophysics & Particles',

  // 课程分类描述（courseCategories）
  '极限、测度与无穷维空间': 'Limits, measure, and infinite-dimensional spaces',
  '结构、变换与空间形状': 'Structure, transformations, and the shape of space',
  '随机性的数学语言': 'The mathematical language of randomness',
  '演化方程与数值方法': 'Evolution equations and numerical methods',
  '计数、图论与数学基础': 'Counting, graph theory, and mathematical foundations',
  '数论、优化、密码与数据': 'Number theory, optimization, cryptography, and data',
  '力学、热学、电磁、光学与原子': 'Mechanics, thermodynamics, electromagnetism, optics, and atoms',
  '从作用量到量子与统计': 'From action to quantum and statistical physics',
  '晶体、能带与固体中的电子': 'Crystals, band structure, and electrons in solids',
  '数学物理方法与计算模拟': 'Mathematical physics methods and computational simulation',
  '恒星、宇宙与基本粒子': 'Stars, the cosmos, and fundamental particles',

  // AI 服务商名称
  通义千问: 'Tongyi Qianwen (Alibaba)',
  '智谱 AI': 'Zhipu AI',
  // 难度标签（difficultyLabel）
  基础: 'Basic',
  中等: 'Intermediate',
  较难: 'Advanced',
};

export default dict;
