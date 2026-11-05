/** 学科 */
export type Subject = 'math' | 'physics';

export const SUBJECT_META: Record<Subject, { name: string; short: string; blurb: string }> = {
  math: { name: '数学区', short: '数学', blurb: '大学数学本科知识解答' },
  physics: { name: '物理区', short: '物理', blurb: '大学物理本科知识解答' },
};

/** 课程 */
export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  /** lucide 图标名 */
  icon: string;
  difficulty: '基础' | '进阶' | '高阶';
  tags: string[];
  semester: string;
  /** 所属学科（缺省按数学处理，便于兼容历史课程数据） */
  subject?: Subject;
}

/** 读取课程所属学科，缺省数学 */
export const subjectOf = (c: Course): Subject => c.subject ?? 'math';

/** 知识点 */
export interface Topic {
  id: string;
  courseId: string;
  chapter: string;
  title: string;
  summary: string;
  /** Markdown + LaTeX 混合正文（$...$ 行内公式，$$...$$ 独立公式） */
  content: string;
  keyPoints: string[];
  relatedProblemIds: string[];
}

/** 解答步骤 */
export interface SolutionStep {
  title: string;
  detail: string;
}

/** 例题 */
export interface Problem {
  id: string;
  courseId: string;
  topicId: string;
  title: string;
  difficulty: 1 | 2 | 3;
  question: string;
  hints: string[];
  solution: SolutionStep[];
  answer: string;
  tags: string[];
}

/** 公式速查条目 */
export interface FormulaEntry {
  id: string;
  group: string;
  name: string;
  latex: string;
  note?: string;
}

export interface FormulaGroup {
  id: string;
  name: string;
  courseId: string;
  formulas: FormulaEntry[];
}
