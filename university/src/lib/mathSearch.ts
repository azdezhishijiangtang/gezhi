/**
 * 数学搜索引擎：让自然语言对应到数学语言。
 * - 查询归一化（全角→半角、去标点、去口语停用词）
 * - 同义词典：口语/别名 → 数学规范词（点乘→数量积/内积，抽屉原理→鸽巢原理…）
 * - 多字段加权评分：标题 > 章节/要点 > 摘要/小节标题 > 正文
 * - CJK 二元组兜底：部分匹配也能召回
 */
import { topics, getTopic } from '@/data/topics';
import { problems } from '@/data/problems';
import { courses, subjectCourses } from '@/data/courses';
import { formulaGroups } from '@/data/formulas';
import type { Topic, Problem, FormulaEntry, Subject } from '@/types';
import { subjectOf } from '@/types';

/** 口语/别名 → 规范数学词（键出现在查询里即触发展开） */
const SYNONYMS: Record<string, string[]> = {
  // 极限与连续
  趋于: ['极限'], 趋向: ['极限'], 无穷小: ['极限'], 邻域: ['极限'], 去心: ['极限'],
  夹逼: ['夹逼', '极限'], 间断: ['连续'], 连续性: ['连续'],
  洛必达: ['洛必达', '极限'], 罗必塔: ['洛必达', '极限'],
  // 导数与微分
  求导: ['导数'], 导函数: ['导数'], 可导: ['导数'], 可微: ['微分'], 微分: ['导数', '微分'],
  切线: ['导数'], 变化率: ['导数'], 单调性: ['单调'], 增减性: ['单调'], 极值点: ['极值'],
  最大值: ['极值'], 最小值: ['极值'], 最值: ['极值'], 拐点: ['极值'],
  罗尔: ['中值定理'], 拉格朗日中值: ['中值定理'], 中值定理: ['中值定理'],
  麦克劳林: ['泰勒'], 泰勒展开: ['泰勒'], 泰勒公式: ['泰勒'],
  // 积分
  不定积分: ['不定积分', '积分'], 定积分: ['定积分', '积分'], 积分: ['积分'],
  原函数: ['不定积分'], 换元: ['积分'], 分部积分: ['积分'], 弧长: ['弧长', '定积分的应用'],
  旋转体: ['定积分的应用'], 面积: ['定积分的应用'], 体积: ['定积分的应用'],
  曲线积分: ['曲线积分'], 曲面积分: ['曲面积分'], 格林公式: ['曲线积分'],
  高斯公式: ['曲面积分'], 散度: ['曲面积分'], 旋度: ['曲线积分'], 通量: ['曲面积分'],
  重积分: ['二重积分'], 三重积分: ['二重积分'], 二重积分: ['二重积分'],
  // 级数
  级数: ['级数'], 收敛: ['收敛'], 发散: ['收敛', '级数'], 幂级数: ['幂级数', '级数'],
  通项: ['级数'], 傅立叶: ['傅里叶'], 傅里叶级数: ['傅里叶'],
  // 线性代数
  矩阵乘法: ['矩阵运算'], 转置: ['矩阵运算'], 初等变换: ['初等变换', '矩阵'],
  求逆: ['逆矩阵'], 矩阵的逆: ['逆矩阵'], 可逆: ['逆矩阵'],
  克莱姆: ['线性方程组'], 克拉默: ['线性方程组'], 增广矩阵: ['线性方程组'],
  线性相关: ['向量空间'], 线性无关: ['向量空间'], 极大无关组: ['向量空间'],
  基底: ['向量空间'], 维数: ['向量空间'], 基: ['向量空间'],
  矩阵的秩: ['线性方程组'], 秩: ['线性方程组', '向量空间'],
  特征根: ['特征值'], 特征向量: ['特征值'], 相似: ['相似标准形'], 若尔当: ['若尔当'],
  对角化: ['正交对角化', '特征值'], 正交: ['正交对角化'], 内积: ['内积空间', '数量积'],
  点乘: ['数量积', '点积'], 点积: ['数量积'], 数量积: ['数量积'],
  叉乘: ['向量积'], 叉积: ['向量积'], 向量积: ['向量积'], 外积: ['向量积'],
  夹角: ['数量积'], 行列式: ['行列式'], 二次型: ['二次型'], 正定: ['二次型'],
  线性变换: ['线性变换'], 线性方程组: ['线性方程组'], 解方程组: ['线性方程组'],
  // 解析几何
  向量: ['向量'], 共线: ['向量'], 垂直: ['向量'], 法向量: ['平面'],
  圆锥曲线: ['二次曲线'], 椭圆: ['二次曲线'], 双曲线: ['二次曲线'], 抛物线: ['二次曲线'],
  柱面: ['二次曲面'], 锥面: ['二次曲面'], 旋转曲面: ['二次曲面'],
  // 概率统计
  几率: ['概率'], 可能性: ['概率'], 期望: ['数学期望'], 均值: ['数学期望'],
  平均值: ['数学期望'], 标准差: ['方差'], 方差: ['方差'], 波动: ['方差'],
  正态: ['正态分布'], 高斯分布: ['正态分布'], 钟形曲线: ['正态分布'],
  二项分布: ['常见分布'], 泊松分布: ['常见分布'], 指数分布: ['常见分布'],
  全概率: ['贝叶斯'], 逆概率: ['贝叶斯'], 贝叶斯: ['贝叶斯'], 先验: ['贝叶斯'], 后验: ['贝叶斯'],
  独立性: ['独立'], 大数定律: ['大数定律'], 中心极限定理: ['中心极限'],
  置信区间: ['参数估计'], 点估计: ['参数估计'], 区间估计: ['参数估计'],
  最大似然: ['参数估计'], 极大似然: ['参数估计'], 假设检验: ['假设检验'],
  p值: ['假设检验'], 显著性: ['假设检验'], 协方差: ['协方差'], 相关系数: ['协方差'],
  // 随机过程
  无后效性: ['马尔可夫'], 马氏链: ['马尔可夫'], 随机游走: ['布朗运动', '马尔可夫'],
  泊松过程: ['泊松'], 等待时间: ['泊松'], 排队: ['泊松'], 更新: ['更新过程'],
  平稳: ['平稳过程'], 遍历: ['遍历性'], 伊藤: ['伊藤'], 期权: ['伊藤'], 金融: ['伊藤'],
  // 方程
  微分方程: ['微分方程'], 通解: ['微分方程'], 特解: ['微分方程'], 齐次: ['微分方程'],
  特征方程: ['特征方程'], 振动: ['波动方程'], 弦振动: ['波动方程'], 达朗贝尔: ['波动方程'],
  热传导: ['热传导'], 扩散: ['热传导'], 稳态温度: ['调和方程'], 调和: ['调和方程'],
  拉普拉斯方程: ['拉普拉斯方程', '调和方程'], 拉普拉斯: ['拉普拉斯方程', '调和方程'],
  分离变量法: ['分离变量'], 格林函数: ['格林函数'], 特征线: ['特征线'],
  // 复变
  解析函数: ['解析'], 柯西: ['柯西'], 留数: ['留数'], 残数: ['留数'], 围道积分: ['留数'],
  共形映射: ['共形'], 保角变换: ['共形'], 黎曼面: ['黎曼面'], 幂级数展开: ['幂级数'],
  // 实变泛函
  勒贝格: ['勒贝格'], 测度: ['测度'], 可测: ['可测'], 黎曼积分: ['黎曼积分'],
  几乎处处: ['测度'], 控制收敛: ['控制收敛'], 富比尼: ['富比尼'], lp空间: ['lp'],
  巴拿赫: ['巴拿赫'], 希尔伯特空间: ['希尔伯特'], 范数: ['巴拿赫'], 算子: ['算子'],
  谱: ['谱理论'], 紧算子: ['紧算子'], 泛函: ['泛函'], 对偶空间: ['对偶空间'],
  // 拓扑几何
  橡皮几何: ['拓扑'], 连续变形: ['同胚'], 同胚: ['同胚'], 开集: ['开集'],
  紧致: ['紧致'], 紧: ['紧致'], 连通: ['连通'], 基本群: ['基本群'], 同伦: ['基本群'],
  亏格: ['基本群'], 覆叠: ['覆叠空间'], 单纯形: ['同调'], 同调: ['同调'],
  曲率: ['曲率'], 挠率: ['挠率'], 测地线: ['测地线'], 高斯曲率: ['曲率'],
  切空间: ['切空间'], 弯曲: ['曲率'], 绝妙定理: ['内蕴几何'],
  // 抽象代数
  对称: ['群论'], 群: ['群论'], 循环群: ['群论'], 陪集: ['群论'], 西罗: ['群作用'],
  同态: ['群论'], 同构: ['群论'], 环: ['环'], 域: ['域'], 伽罗瓦: ['伽罗瓦'],
  尺规作图: ['伽罗瓦'], 五次方程: ['伽罗瓦'], 唯一分解: ['唯一分解'], 模: ['模'],
  // 离散与逻辑
  抽屉原理: ['鸽巢'], 鸽笼原理: ['鸽巢'], 鸽巢原理: ['鸽巢'],
  排列: ['计数'], 组合数: ['计数'], 排列组合: ['计数'], 计数: ['计数'],
  容斥: ['容斥'], 隔板法: ['计数'], 生成函数: ['生成函数'], 母函数: ['生成函数'],
  最短路: ['最短路'], 欧拉图: ['欧拉'], 一笔画: ['欧拉'], 哈密顿: ['哈密顿'],
  树: ['树'], 图论: ['图论'], 着色: ['图论'], 四色: ['图论'],
  命题: ['命题逻辑'], 谓词: ['谓词逻辑'], 量词: ['谓词逻辑'], 真值表: ['命题逻辑'],
  哥德尔: ['哥德尔'], 不完备: ['不完备'], 图灵: ['图灵'], 停机: ['停机问题'],
  可计算: ['可计算性'], 集合论: ['集合论'], 无穷: ['集合论'], 连续统: ['连续统'],
  // 数值
  数值解: ['数值'], 插值: ['插值'], 拟合: ['最小二乘'], 最小二乘: ['最小二乘'],
  牛顿迭代: ['非线性方程'], 二分法: ['非线性方程'], 迭代法: ['迭代法'],
  龙贝格: ['数值积分'], 梯形公式: ['数值积分'], 龙格库塔: ['常微分方程数值解'],
  误差: ['误差'], 舍入: ['误差'], 条件数: ['条件数'], 高斯消元: ['高斯消去'],
  // 优化
  最优: ['最优化'], 最小化: ['最优化'], 最大化: ['最优化'], 凸函数: ['凸'],
  凸优化: ['凸'], 单纯形法: ['单纯形'], 对偶理论: ['对偶'], kkt: ['kkt'],
  梯度下降: ['牛顿法', '最优性条件'], 牛顿法: ['牛顿法'], 线性规划: ['线性规划'],
  // 密码与数据科学
  加密: ['密码'], 解密: ['密码'], 密钥: ['密码'], rsa: ['rsa'], 非对称: ['rsa'],
  哈希: ['哈希'], 散列: ['哈希'], 签名: ['数字签名'], 素数: ['素数'],
  质数: ['素数'], 同余: ['同余'], 最大公约数: ['最大公约数'], 辗转相除: ['欧几里得算法'],
  中国剩余定理: ['中国剩余定理'], 费马小定理: ['二次剩余'], 不定方程: ['不定方程'],
  勾股数: ['不定方程'], 降维: ['主成分分析'], 主成分: ['主成分分析'],
  奇异值: ['svd'], svd: ['svd'], 低秩: ['svd'], 机器学习: ['经验风险'],
  训练模型: ['经验风险'], 过拟合: ['正则化'], 正则化: ['正则化'],
  支持向量机: ['核方法'], svm: ['核方法'], 核技巧: ['核方法'],
  采样: ['mcmc'], 马尔可夫链蒙特卡洛: ['mcmc'], 信息量: ['熵'], 熵: ['熵'],
  互信息: ['互信息'], 编码: ['编码'],
};

/** 口语停用词（归一化后作为整词剔除，用于分词与展示） */
const STOPWORDS = [
  '请问', '帮我', '什么叫', '什么是', '是什么', '怎么求', '怎么算', '怎么理解', '怎么证',
  '怎么', '怎样', '如何', '为什么', '为啥', '求', '计算', '证明', '讲解', '讲讲', '介绍',
  '学习', '学会', '理解', '意思', '方法', '技巧', '一下', '有关', '关于', '以及', '还有',
  '的', '吗', '呢', '了', '是', '啊', '吧', '和', '与', '在', '中', '里', '个', '这', '那',
];

/** 归一化：全角→半角、小写、去标点与多余空白 */
export const normalizeQuery = (raw: string): string =>
  raw
    .toLowerCase()
    .replace(/[\uff01-\uff5e]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[\s\u3000]+/g, '')
    .replace(/[，。、；：？！“”‘’（）《》【】,.!?;:'"()[\]<>{}|\\/-]/g, '');

/** 提取查询词：整个查询 + 同义词展开 + 去停用词后的口语核心 */
export const expandQuery = (raw: string): { terms: { text: string; weight: number }[]; core: string } => {
  const q = normalizeQuery(raw);
  if (!q) return { terms: [], core: '' };
  const terms = new Map<string, number>();
  const add = (t: string, w: number) => {
    if (t && t.length >= 1) terms.set(t, Math.max(terms.get(t) ?? 0, w));
  };
  add(q, 1); // 完整查询原样参与
  for (const [key, vals] of Object.entries(SYNONYMS)) {
    if (q.includes(key)) for (const v of vals) add(normalizeQuery(v), 0.95);
  }
  // 去停用词后的“口语核心”，如“怎么求矩阵的逆”→“矩阵的逆”
  let core = q;
  const sortedStops = [...STOPWORDS].sort((a, b) => b.length - a.length);
  for (const w of sortedStops) core = core.split(w).join('|');
  const coreParts = core.split('|').filter((p) => p.length >= 2);
  for (const p of coreParts) add(p, 0.7);
  // CJK 二元组兜底（针对长查询的部分匹配）
  const cjk = q.replace(/[^一-\u9fff]/g, '');
  if (cjk.length >= 4) {
    for (let i = 0; i + 2 <= cjk.length; i += 1) add(cjk.slice(i, i + 2), 0.3);
  }
  return { terms: [...terms].map(([text, weight]) => ({ text, weight })), core: coreParts.join(' ') };
};

interface IndexedDoc {
  title: string;
  extra: { text: string; weight: number }[];
}

const sectionHeadings = (content: string): string[] =>
  content.split('\n').filter((l) => l.startsWith('## ')).map((l) => l.slice(3));

/** 单文档评分：terms 在各字段中的命中加权和 */
const scoreDoc = (doc: IndexedDoc, terms: { text: string; weight: number }[]): number => {
  let score = 0;
  const title = doc.title.toLowerCase();
  for (const { text, weight } of terms) {
    const t = text.toLowerCase();
    if (!t) continue;
    if (title.includes(t)) score += 10 * weight;
    for (const { text: f, weight: fw } of doc.extra) {
      if (f.toLowerCase().includes(t)) score += fw * weight;
    }
  }
  return score;
};

export interface TopicHit {
  topic: Topic;
  score: number;
  excerpt: string;
}

export interface SearchAllResult {
  topics: TopicHit[];
  problems: { problem: Problem; score: number }[];
  formulas: { formula: FormulaEntry; courseId: string; score: number }[];
}

/** 截取正文中首次命中任一查询词的片段 */
const bestExcerpt = (topic: Topic, terms: { text: string; weight: number }[]): string => {
  const content = topic.content.replace(/\n+/g, ' ');
  let best: { idx: number; w: number; len: number } | null = null;
  for (const { text, weight } of terms) {
    if (text.length < 2) continue;
    const idx = content.toLowerCase().indexOf(text.toLowerCase());
    if (idx !== -1 && (!best || weight > best.w)) best = { idx, w: weight, len: text.length };
  }
  if (!best) return topic.summary;
  const radius = 55;
  const start = Math.max(0, best.idx - radius);
  const end = Math.min(content.length, best.idx + best.len + radius);
  return `${start > 0 ? '…' : ''}${content.slice(start, end)}${end < content.length ? '…' : ''}`;
};

/** 主题索引（模块加载时构建一次） */
const topicDocs = new Map<string, IndexedDoc>();
for (const t of topics) {
  const course = courses.find((c) => c.id === t.courseId);
  const extra: { text: string; weight: number }[] = [
    { text: t.chapter, weight: 5 },
    { text: t.summary, weight: 3 },
    ...t.keyPoints.map((k) => ({ text: k, weight: 2.5 })),
    ...sectionHeadings(t.content).map((h) => ({ text: h, weight: 2.5 })),
    { text: t.content.slice(0, 3000), weight: 1 },
    { text: course?.name ?? '', weight: 2 },
    { text: course?.tags.join(' ') ?? '', weight: 1.5 },
  ];
  topicDocs.set(t.id, { title: t.title, extra });
}

const problemDocs = new Map<string, IndexedDoc>();
for (const p of problems) {
  const topic = getTopic(p.topicId);
  problemDocs.set(p.id, {
    title: p.title,
    extra: [
      { text: p.tags.join(' '), weight: 4 },
      { text: p.question.slice(0, 800), weight: 1 },
      { text: topic?.title ?? '', weight: 3 },
    ],
  });
}

const formulaDocs = new Map<string, IndexedDoc>();
for (const g of formulaGroups) {
  for (const f of g.formulas) {
    formulaDocs.set(f.id, {
      title: f.name,
      extra: [
        { text: f.note ?? '', weight: 2 },
        { text: g.name, weight: 2 },
        { text: g.courseId, weight: 1 },
      ],
    });
  }
}

/** 全库搜索：自然语言 → 知识专题 / 例题 / 公式 */
export const searchAll = (raw: string, limit = 12, subject?: Subject): SearchAllResult => {
  const { terms } = expandQuery(raw);
  if (terms.length === 0) return { topics: [], problems: [], formulas: [] };

  const allowed = subject ? new Set(subjectCourses(subject).map((c) => c.id)) : null;

  const topicHits: TopicHit[] = [];
  for (const t of topics) {
    if (allowed && !allowed.has(t.courseId)) continue;
    const score = scoreDoc(topicDocs.get(t.id)!, terms);
    if (score > 0) topicHits.push({ topic: t, score, excerpt: bestExcerpt(t, terms) });
  }
  topicHits.sort((a, b) => b.score - a.score);

  const problemHits = problems
    .filter((p) => !allowed || allowed.has(p.courseId))
    .map((p) => ({ problem: p, score: scoreDoc(problemDocs.get(p.id)!, terms) }))
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const formulaHits = [...formulaDocs.entries()]
    .map(([id]) => {
      const g = formulaGroups.find((gg) => gg.formulas.some((f) => f.id === id))!;
      const formula = g.formulas.find((f) => f.id === id)!;
      return { formula, courseId: g.courseId, score: scoreDoc(formulaDocs.get(id)!, terms) };
    })
    .filter((h) => h.formula && h.score > 0 && (!allowed || allowed.has(h.courseId)))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return { topics: topicHits.slice(0, limit), problems: problemHits, formulas: formulaHits };
};

/** 课程搜索（名称/标签/代码/同义词展开） */
export const searchCourses = (raw: string, subject?: Subject) => {
  const { terms } = expandQuery(raw);
  if (terms.length === 0) return [];
  return courses
    .filter((c) => !subject || subjectOf(c) === subject)
    .map((c) => {
      const doc: IndexedDoc = {
        title: c.name,
        extra: [
          { text: c.tags.join(' '), weight: 3 },
          { text: c.code, weight: 2 },
          { text: c.description, weight: 1 },
        ],
      };
      return { course: c, score: scoreDoc(doc, terms) };
    })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((h) => h.course);
};
