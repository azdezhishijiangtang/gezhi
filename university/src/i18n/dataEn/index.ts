/**
 * 知识库数据的英文覆盖映射聚合层。
 *
 * 设计原则：中文源数据文件（src/data/**）一字不改；
 * 英文翻译以「按 id 的覆盖映射」形式放在本目录，与源文件一一对应：
 *   dataEn/topics/<源文件名>.ts      →  Record<topicId, Partial<Topic>>
 *   dataEn/problems/<源文件名>.ts     →  Record<problemId, Partial<Problem>>
 *   dataEn/formulas/<源文件名>.ts     →  Record<groupId, Partial<FormulaGroup>>
 *   dataEn/courses.ts                →  Record<courseId, Partial<Course>>
 *
 * 用 Vite import.meta.glob 自动收集并合并。未提供英文的条目自动回退中文。
 * 这样并行翻译不同文件时互不冲突，且绝不会出现白屏。
 */
import type { Course, FormulaGroup, Problem, Topic } from '@/types';

type Map<T> = Record<string, Partial<T>>;

const topicMods = import.meta.glob<Map<Topic>>('./topics/*.ts', { eager: true });
const problemMods = import.meta.glob<Map<Problem>>('./problems/*.ts', { eager: true });
const formulaMods = import.meta.glob<Map<FormulaGroup>>('./formulas/*.ts', { eager: true });

function merge<T>(mods: Record<string, { default?: Map<T> }>): Map<T> {
  const out: Map<T> = {};
  for (const mod of Object.values(mods)) {
    if (mod.default) Object.assign(out, mod.default);
  }
  return out;
}

export const topicEn: Map<Topic> = merge(topicMods);
export const problemEn: Map<Problem> = merge(problemMods);
export const formulaGroupEn: Map<FormulaGroup> = merge(formulaMods);

// 课程为单文件，直接导入覆盖映射
import { courseEn as courseEnMap } from './courses';
export const courseEn: Map<Course> = courseEnMap;
