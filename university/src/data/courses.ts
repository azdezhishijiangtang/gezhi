import type { Course, Subject } from '@/types';

/**
 * 数学系本科课程体系。
 * 顺序参照典型培养方案：大一基础 → 大二核心 → 大三进阶 → 选修前沿。
 */
export const courses: Course[] = [
  // ─────────────────────── 大一：基础课 ───────────────────────
  {
    id: 'calculus',
    name: '高等数学',
    code: 'MATH 101',
    description:
      '以微积分为主线，覆盖极限与连续、一元与多元微分学、积分学、无穷级数与常微分方程，是理工科最重要的数学基础课。',
    icon: 'trending-up',
    difficulty: '基础',
    tags: ['微积分', '极限', '级数', '考研数学一'],
    semester: '大一上 / 大一下',
  },
  {
    id: 'linear-algebra',
    name: '线性代数',
    code: 'MATH 201',
    description:
      '研究向量、矩阵与线性变换，涵盖行列式、矩阵运算、线性方程组、向量空间、特征值与二次型，是数据科学与机器学习的语言。',
    icon: 'grid-3x3',
    difficulty: '基础',
    tags: ['矩阵', '特征值', '向量空间', '二次型'],
    semester: '大一下 / 大二上',
  },
  {
    id: 'mathematical-analysis',
    name: '数学分析',
    code: 'MATH 111',
    description:
      '数学系第一门"真"数学课：用 ε-δ 语言重建微积分。实数完备性、一致收敛、含参变量积分——培养严格的极限思维。',
    icon: 'sigma',
    difficulty: '进阶',
    tags: ['实数理论', '一致收敛', 'Γ 函数', '数分'],
    semester: '大一上 / 大一下',
  },
  {
    id: 'analytic-geometry',
    name: '解析几何',
    code: 'MATH 121',
    description:
      '用代数方法研究几何：向量运算、平面与直线、二次曲面与坐标变换，是从常量数学迈向变量数学的第一课。',
    icon: 'compass',
    difficulty: '基础',
    tags: ['向量', '二次曲面', '截痕法', '坐标变换'],
    semester: '大一上',
  },

  // ─────────────────────── 大二：核心课 ───────────────────────
  {
    id: 'probability',
    name: '概率论与数理统计',
    code: 'MATH 301',
    description:
      '从随机事件出发建立概率模型，研究随机变量及其分布、数字特征、大数定律与中心极限定理，并介绍参数估计与假设检验。',
    icon: 'dice-5',
    difficulty: '进阶',
    tags: ['随机变量', '贝叶斯', '正态分布', '假设检验'],
    semester: '大二上 / 大二下',
  },
  {
    id: 'discrete-math',
    name: '离散数学',
    code: 'CS 202',
    description:
      '计算机科学的数学基础，包含命题与谓词逻辑、集合与关系、组合计数、图论与树，培养严格的抽象与推理能力。',
    icon: 'share-2',
    difficulty: '进阶',
    tags: ['逻辑', '图论', '组合计数', '谓词'],
    semester: '大二上',
  },
  {
    id: 'ode',
    name: '常微分方程',
    code: 'MATH 211',
    description:
      '研究含未知函数导数的方程：一阶方程的解法体系、高阶线性理论、方程组与相平面定性分析，是刻画演化过程的语言。',
    icon: 'waves',
    difficulty: '进阶',
    tags: ['特征方程', '常数变易', '相平面', '稳定性'],
    semester: '大二上',
  },
  {
    id: 'pde',
    name: '偏微分方程',
    code: 'MATH 331',
    description:
      '波动、热传导、调和三大典型方程；傅里叶级数与分离变量法、格林函数法——数理方程的古典核心，物理学的数学语言。',
    icon: 'activity',
    difficulty: '高阶',
    tags: ['分离变量', '傅里叶级数', '格林函数', '定解问题'],
    semester: '大三上',
  },
  {
    id: 'complex-analysis',
    name: '复变函数',
    code: 'MATH 221',
    description:
      '把微积分搬到复平面：解析函数、柯西积分定理、留数定理。复可导的刚性带来实分析无法企美的强大工具。',
    icon: 'orbit',
    difficulty: '进阶',
    tags: ['柯西定理', '留数', '解析函数', '共形映射'],
    semester: '大二下',
  },
  {
    id: 'abstract-algebra',
    name: '抽象代数',
    code: 'MATH 311',
    description:
      '群、环、域三大结构，从对称群到伽罗瓦理论。用代数眼光重看"解方程"与"尺规作图"，是现代数学的统一语言。',
    icon: 'braces',
    difficulty: '高阶',
    tags: ['群论', '环与域', '伽罗瓦', '唯一分解'],
    semester: '大三上',
  },
  {
    id: 'combinatorics',
    name: '组合数学',
    code: 'CS 301',
    description:
      '计数的艺术：生成函数、容斥原理、鸽巢与拉姆齐、波利亚计数。算法分析与密码学的数学后厨。',
    icon: 'blocks',
    difficulty: '进阶',
    tags: ['生成函数', '容斥', 'Burnside', '设计理论'],
    semester: '大三上',
  },

  // ─────────────────────── 大三：进阶课 ───────────────────────
  {
    id: 'real-analysis',
    name: '实变函数',
    code: 'MATH 341',
    description:
      '勒贝格测度与积分论：控制收敛、富比尼定理、Lp 空间。把积分理论从"连续函数的小圈子"解放到"几乎处处"。',
    icon: 'layers',
    difficulty: '高阶',
    tags: ['勒贝格积分', 'Lp 空间', '控制收敛', '测度论'],
    semester: '大三上',
  },
  {
    id: 'functional-analysis',
    name: '泛函分析',
    code: 'MATH 351',
    description:
      '无穷维空间上的微积分：巴拿赫与希尔伯特空间、有界线性算子、谱理论。量子力学与最优化理论的数学母体。',
    icon: 'scale',
    difficulty: '高阶',
    tags: ['巴拿赫空间', '谱理论', '对偶空间', '压缩映射'],
    semester: '大三下',
  },
  {
    id: 'topology',
    name: '拓扑学',
    code: 'MATH 321',
    description:
      '橡皮几何学：开集、连续、紧致、连通，直到基本群。不测量长度，只问"能不能连续变形过去"。',
    icon: 'circle-dot',
    difficulty: '高阶',
    tags: ['紧致性', '基本群', '同胚', 'van Kampen'],
    semester: '大三上',
  },
  {
    id: 'differential-geometry',
    name: '微分几何',
    code: 'MATH 361',
    description:
      '曲线与曲面的微积分：两个基本形式、高斯曲率、测地线、高斯–博内定理。从绝妙定理一路通向广义相对论。',
    icon: 'ruler',
    difficulty: '高阶',
    tags: ['曲率', '测地线', '高斯-博内', '内蕴几何'],
    semester: '大三下',
  },
  {
    id: 'stochastic-processes',
    name: '随机过程',
    code: 'MATH 302',
    description:
      '随时间演化的随机现象：马尔可夫链、泊松过程、布朗运动与鞅。金融工程与排队论的数学基础。',
    icon: 'shuffle',
    difficulty: '高阶',
    tags: ['马尔可夫链', '布朗运动', '鞅', '泊松过程'],
    semester: '大三下',
  },
  {
    id: 'numerical-analysis',
    name: '数值分析',
    code: 'MATH 371',
    description:
      '让计算机做数学：插值与逼近、数值积分、线性方程组数值解、特征值计算。逼近误差与舍入误差的平衡艺术。',
    icon: 'chart-line',
    difficulty: '进阶',
    tags: ['插值', '高斯求积', '条件数', 'QR 算法'],
    semester: '大三下',
  },
  {
    id: 'mathematical-logic',
    name: '数理逻辑',
    code: 'MATH 381',
    description:
      '数学的数学：一阶逻辑的可靠性与完备性、哥德尔不完备定理、图灵机与可计算性。计算科学的理论源头。',
    icon: 'git-branch',
    difficulty: '高阶',
    tags: ['哥德尔', '图灵机', '停机问题', '一阶逻辑'],
    semester: '大四上',
  },

  // ─────────────────────── 选修与前沿：应用数学方向 ───────────────────────
  {
    id: 'elementary-number-theory',
    name: '初等数论',
    code: 'MATH 231',
    description:
      '整数的学问：整除与素数、同余与剩余类、原根与二次互反律、不定方程。看似简单的问题背后藏着最深的数论结构，也是现代密码学的基石。',
    icon: 'hash',
    difficulty: '进阶',
    tags: ['同余', '中国剩余定理', '二次互反律', '不定方程'],
    semester: '大二下',
  },
  {
    id: 'optimization',
    name: '最优化方法',
    code: 'MATH 372',
    description:
      '在约束中寻找最优：凸分析、线性规划与单纯形法、对偶理论、无约束与约束优化的 KKT 条件。运筹、工程与机器学习的共同工具。',
    icon: 'target',
    difficulty: '进阶',
    tags: ['凸优化', '单纯形法', '对偶理论', 'KKT 条件'],
    semester: '大三下',
  },
  {
    id: 'cryptography',
    name: '密码学基础',
    code: 'CS 302',
    description:
      '用数学守护信息：古典密码与频率分析、分组密码与哈希、RSA 与椭圆曲线、数字签名与密钥交换。数论与代数最成功的工程应用。',
    icon: 'lock',
    difficulty: '进阶',
    tags: ['RSA', '椭圆曲线', '哈希', '数字签名'],
    semester: '大三下',
  },
  {
    id: 'data-science-math',
    name: '数据科学数学',
    code: 'DS 301',
    description:
      '数据背后的数学：SVD 与低秩逼近、主成分分析、统计推断、经验风险最小化、核方法与 SVM、MCMC 采样、信息论。机器学习的数学内核。',
    icon: 'database',
    difficulty: '进阶',
    tags: ['SVD', 'PCA', '核方法', 'MCMC', '信息论'],
    semester: '大四上',
  },

  // ─────────────────────── 物理（本科物理系） ───────────────────────
  {
    id: 'mechanics',
    name: '力学',
    code: 'PHYS 101',
    description:
      '经典力学的基石：从质点的运动学到牛顿定律，再到动量、能量、角动量与刚体转动，并引入振动与波动，培养用矢量与微积分描述运动的能力。',
    icon: 'gauge',
    difficulty: '基础',
    tags: ['牛顿定律', '动量', '能量', '角动量', '刚体', '振动'],
    semester: '大一上',
    subject: 'physics',
  },
  {
    id: 'thermal-physics',
    name: '热学',
    code: 'PHYS 201',
    description:
      '从温度的宏观定义到气体动理论的微观图像，建立分子运动论，进而讲透热力学第一、第二定律与熵，理解能量转化与方向性。',
    icon: 'flame',
    difficulty: '基础',
    tags: ['温度', '分子动理论', '热力学定律', '熵', '卡诺循环'],
    semester: '大一下',
    subject: 'physics',
  },
  {
    id: 'electromagnetism',
    name: '电磁学',
    code: 'PHYS 202',
    description:
      '研究电与磁的统一：静电场、稳恒电流、恒定磁场与电磁感应，最终通向麦克斯韦方程组，解释光为何是一种电磁波。',
    icon: 'zap',
    difficulty: '进阶',
    tags: ['电场', '磁场', '高斯定理', '安培环路', '电磁感应'],
    semester: '大二上',
    subject: 'physics',
  },
  {
    id: 'optics',
    name: '光学',
    code: 'PHYS 203',
    description:
      '从几何光学近轴成像到波动光学的干涉、衍射与偏振，揭示光的波粒二象性的前半程，是近代物理的序章。',
    icon: 'waves',
    difficulty: '进阶',
    tags: ['几何光学', '干涉', '衍射', '偏振', '全息'],
    semester: '大二下',
    subject: 'physics',
  },
  {
    id: 'atomic-physics',
    name: '原子物理学',
    code: 'PHYS 204',
    description:
      '从电子发现到玻尔原子模型，系统讲原子结构、量子化条件、X 射线、原子核与放射性的基本事实，铺陈量子力学的实验地基。',
    icon: 'atom',
    difficulty: '进阶',
    tags: ['玻尔模型', '原子结构', '谱线', '原子核', '放射性'],
    semester: '大二下',
    subject: 'physics',
  },
  {
    id: 'analytical-mechanics',
    name: '理论力学',
    code: 'PHYS 301',
    description:
      '用拉格朗日方程与哈密顿原理重述力学：虚功、广义坐标、最小作用量、正则方程与小振动，是分析力学的标准语言。',
    icon: 'scale',
    difficulty: '高阶',
    tags: ['拉格朗日', '哈密顿', '最小作用量', '正则方程', '小振动'],
    semester: '大三上',
    subject: 'physics',
  },
  {
    id: 'electrodynamics',
    name: '电动力学',
    code: 'PHYS 302',
    description:
      '以麦克斯韦方程组为纲，研究静电、稳恒与似稳电磁场、电磁波的辐射与传播，并衔接狭义相对论下的协变形式。',
    icon: 'radiation',
    difficulty: '高阶',
    tags: ['麦克斯韦方程组', '电磁波', '辐射', '相对论电动力学', '边值问题'],
    semester: '大三上',
    subject: 'physics',
  },
  {
    id: 'quantum-mechanics',
    name: '量子力学',
    code: 'PHYS 303',
    description:
      '描述微观世界的理论：波函数与薛定谔方程、算符与对易关系、一维定态、角动量与自旋、微扰论，重塑对"测量"与"概率"的理解。',
    icon: 'binary',
    difficulty: '高阶',
    tags: ['薛定谔方程', '算符', '角动量', '自旋', '微扰论'],
    semester: '大三上',
    subject: 'physics',
  },
  {
    id: 'statistical-physics',
    name: '热力学与统计物理',
    code: 'PHYS 304',
    description:
      '从微观概率导出宏观热力学：近独立粒子统计、系综理论、配分函数、玻尔兹曼分布与相变，统一冷与热的统计本质。',
    icon: 'layers',
    difficulty: '高阶',
    tags: ['系综', '配分函数', '玻尔兹曼分布', '相变', '涨落'],
    semester: '大三下',
    subject: 'physics',
  },
  {
    id: 'solid-state-physics',
    name: '固体物理',
    code: 'PHYS 305',
    description:
      '从晶体结构到晶格振动与电子能带，解释为何金属导电、绝缘体不导电、半导体可控，是材料与器件物理的地基。',
    icon: 'box',
    difficulty: '高阶',
    tags: ['晶体结构', '晶格振动', '能带', '半导体', '费米面'],
    semester: '大三下',
    subject: 'physics',
  },
  {
    id: 'mathematical-physics',
    name: '数学物理方法',
    code: 'PHYS 306',
    description:
      '物理学家手边的数学工具箱：复变函数、特殊函数（勒让德、贝塞尔、球谐）、偏微分方程与积分变换，求解真实物理问题的利器。',
    icon: 'function-square',
    difficulty: '进阶',
    tags: ['复变', '特殊函数', '分离变量', '积分变换', '格林函数'],
    semester: '大二下',
    subject: 'physics',
  },
  {
    id: 'relativity',
    name: '狭义相对论',
    code: 'PHYS 307',
    description:
      '重新定义同时性：洛伦兹变换、时空图、质能关系与四维矢量，揭示高速世界与我们日常直觉的根本分歧。',
    icon: 'orbit',
    difficulty: '高阶',
    tags: ['洛伦兹变换', '同时性', '质能关系', '四维矢量', '相对论效应'],
    semester: '大三上',
    subject: 'physics',
  },
  {
    id: 'computational-physics',
    name: '计算物理',
    code: 'PHYS 308',
    description:
      '用数值实验求解物理：数值微分积分、常微分方程的数值解、蒙特卡洛模拟与数据拟合，让理论在算力上落地。',
    icon: 'database',
    difficulty: '进阶',
    tags: ['数值方法', '蒙特卡洛', '微分方程', '数据拟合', '可视化'],
    semester: '大三下',
    subject: 'physics',
  },
  {
    id: 'astrophysics',
    name: '天体物理导论',
    code: 'PHYS 309',
    description:
      '把物理定律用于宇宙：恒星结构与演化、黑洞、宇宙膨胀与微波背景，从牛顿引力走到广义相对论的宇宙学视野。',
    icon: 'telescope',
    difficulty: '进阶',
    tags: ['恒星演化', '黑洞', '宇宙学', '引力波', '微波背景'],
    semester: '大四上',
    subject: 'physics',
  },
  {
    id: 'nuclear-particle-physics',
    name: '核与粒子物理',
    code: 'PHYS 310',
    description:
      '深入物质最核心的尺度：核结构、放射性衰变、核反应与裂变聚变，再到基本粒子与标准模型，回答"世界由什么构成"。',
    icon: 'radiation',
    difficulty: '高阶',
    tags: ['核结构', '放射性衰变', '裂变聚变', '标准模型', '夸克'],
    semester: '大四上',
    subject: 'physics',
  },
];

export const getCourse = (id: string): Course | undefined =>
  courses.find((c) => c.id === id);

/** 学科方向（用于课程总览分组与首页学科版图） */
export interface CourseCategory {
  id: string;
  name: string;
  description: string;
  courseIds: string[];
  /** 所属学科 */
  subject: Subject;
}

/** 课程按学科方向归类，覆盖本科数学与物理完整版图 */
export const courseCategories: CourseCategory[] = [
  {
    id: 'analysis',
    name: '分析',
    description: '极限、测度与无穷维空间',
    courseIds: ['mathematical-analysis', 'real-analysis', 'complex-analysis', 'functional-analysis'],
    subject: 'math',
  },
  {
    id: 'algebra-geometry',
    name: '代数与几何',
    description: '结构、变换与空间形状',
    courseIds: ['linear-algebra', 'abstract-algebra', 'analytic-geometry', 'differential-geometry', 'topology'],
    subject: 'math',
  },
  {
    id: 'probability',
    name: '概率统计',
    description: '随机性的数学语言',
    courseIds: ['probability', 'stochastic-processes'],
    subject: 'math',
  },
  {
    id: 'equations-computing',
    name: '方程与计算',
    description: '演化方程与数值方法',
    courseIds: ['calculus', 'ode', 'pde', 'numerical-analysis'],
    subject: 'math',
  },
  {
    id: 'discrete-logic',
    name: '离散与逻辑',
    description: '计数、图论与数学基础',
    courseIds: ['discrete-math', 'combinatorics', 'mathematical-logic'],
    subject: 'math',
  },
  {
    id: 'applied',
    name: '应用前沿',
    description: '数论、优化、密码与数据',
    courseIds: ['elementary-number-theory', 'optimization', 'cryptography', 'data-science-math'],
    subject: 'math',
  },
  {
    id: 'phys-classics',
    name: '经典物理',
    description: '力学、热学、电磁、光学与原子',
    courseIds: ['mechanics', 'thermal-physics', 'electromagnetism', 'optics', 'atomic-physics'],
    subject: 'physics',
  },
  {
    id: 'phys-theory',
    name: '理论物理',
    description: '从作用量到量子与统计',
    courseIds: ['analytical-mechanics', 'electrodynamics', 'quantum-mechanics', 'statistical-physics', 'relativity'],
    subject: 'physics',
  },
  {
    id: 'phys-condensed',
    name: '凝聚态与材料',
    description: '晶体、能带与固体中的电子',
    courseIds: ['solid-state-physics'],
    subject: 'physics',
  },
  {
    id: 'phys-methods',
    name: '方法与计算',
    description: '数学物理方法与计算模拟',
    courseIds: ['mathematical-physics', 'computational-physics'],
    subject: 'physics',
  },
  {
    id: 'phys-frontier',
    name: '天体与粒子',
    description: '恒星、宇宙与基本粒子',
    courseIds: ['astrophysics', 'nuclear-particle-physics'],
    subject: 'physics',
  },
];

/** 方向下的课程对象 */
export const coursesByCategory = (categoryId: string): Course[] => {
  const cat = courseCategories.find((c) => c.id === categoryId);
  if (!cat) return [];
  return cat.courseIds
    .map((id) => courses.find((c) => c.id === id))
    .filter((c): c is Course => Boolean(c));
};

/** 某学科下的全部课程 */
export const subjectCourses = (subject: Subject): Course[] =>
  courses.filter((c) => (c.subject ?? 'math') === subject);

/** 某学科下的全部方向 */
export const subjectCategories = (subject: Subject): CourseCategory[] =>
  courseCategories.filter((c) => c.subject === subject);

