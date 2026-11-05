/**
 * 物理区数据完整性校验：
 * - 课程/专题/例题/公式的 id 唯一性
 * - courseId、topicId、relatedProblemIds 外键有效性（无悬空）
 * - 专题正文长度、小节数
 * - 每个专题是否至少有一道 topicId 匹配的例题
 */
import { courses } from '../src/data/courses.ts';
import { mechanicsTopics } from '../src/data/topics/mechanics.ts';
import { thermal_physicsTopics } from '../src/data/topics/thermal-physics.ts';
import { electromagnetismTopics } from '../src/data/topics/electromagnetism.ts';
import { opticsTopics } from '../src/data/topics/optics.ts';
import { atomic_physicsTopics } from '../src/data/topics/atomic-physics.ts';
import { analytical_mechanicsTopics } from '../src/data/topics/analytical-mechanics.ts';
import { electrodynamicsTopics } from '../src/data/topics/electrodynamics.ts';
import { quantum_mechanicsTopics } from '../src/data/topics/quantum-mechanics.ts';
import { statistical_physicsTopics } from '../src/data/topics/statistical-physics.ts';
import { solid_state_physicsTopics } from '../src/data/topics/solid-state-physics.ts';
import { mathematical_physicsTopics } from '../src/data/topics/mathematical-physics.ts';
import { relativityTopics } from '../src/data/topics/relativity.ts';
import { computational_physicsTopics } from '../src/data/topics/computational-physics.ts';
import { astrophysicsTopics } from '../src/data/topics/astrophysics.ts';
import { nuclear_particle_physicsTopics } from '../src/data/topics/nuclear-particle-physics.ts';
import { mechanicsProblems } from '../src/data/problems/mechanics.ts';
import { thermal_physicsProblems } from '../src/data/problems/thermal-physics.ts';
import { electromagnetismProblems } from '../src/data/problems/electromagnetism.ts';
import { opticsProblems } from '../src/data/problems/optics.ts';
import { atomic_physicsProblems } from '../src/data/problems/atomic-physics.ts';
import { analytical_mechanicsProblems } from '../src/data/problems/analytical-mechanics.ts';
import { electrodynamicsProblems } from '../src/data/problems/electrodynamics.ts';
import { quantum_mechanicsProblems } from '../src/data/problems/quantum-mechanics.ts';
import { statistical_physicsProblems } from '../src/data/problems/statistical-physics.ts';
import { solid_state_physicsProblems } from '../src/data/problems/solid-state-physics.ts';
import { mathematical_physicsProblems } from '../src/data/problems/mathematical-physics.ts';
import { relativityProblems } from '../src/data/problems/relativity.ts';
import { computational_physicsProblems } from '../src/data/problems/computational-physics.ts';
import { astrophysicsProblems } from '../src/data/problems/astrophysics.ts';
import { nuclear_particle_physicsProblems } from '../src/data/problems/nuclear-particle-physics.ts';
import { mechanicsFormulaGroups } from '../src/data/formulas/mechanics.ts';
import { thermal_physicsFormulaGroups } from '../src/data/formulas/thermal-physics.ts';
import { electromagnetismFormulaGroups } from '../src/data/formulas/electromagnetism.ts';
import { opticsFormulaGroups } from '../src/data/formulas/optics.ts';
import { atomic_physicsFormulaGroups } from '../src/data/formulas/atomic-physics.ts';
import { analytical_mechanicsFormulaGroups } from '../src/data/formulas/analytical-mechanics.ts';
import { electrodynamicsFormulaGroups } from '../src/data/formulas/electrodynamics.ts';
import { quantum_mechanicsFormulaGroups } from '../src/data/formulas/quantum-mechanics.ts';
import { statistical_physicsFormulaGroups } from '../src/data/formulas/statistical-physics.ts';
import { solid_state_physicsFormulaGroups } from '../src/data/formulas/solid-state-physics.ts';
import { mathematical_physicsFormulaGroups } from '../src/data/formulas/mathematical-physics.ts';
import { relativityFormulaGroups } from '../src/data/formulas/relativity.ts';
import { computational_physicsFormulaGroups } from '../src/data/formulas/computational-physics.ts';
import { astrophysicsFormulaGroups } from '../src/data/formulas/astrophysics.ts';
import { nuclear_particle_physicsFormulaGroups } from '../src/data/formulas/nuclear-particle-physics.ts';

const topics = [
  ...mechanicsTopics,
  ...thermal_physicsTopics,
  ...electromagnetismTopics,
  ...opticsTopics,
  ...atomic_physicsTopics,
  ...analytical_mechanicsTopics,
  ...electrodynamicsTopics,
  ...quantum_mechanicsTopics,
  ...statistical_physicsTopics,
  ...solid_state_physicsTopics,
  ...mathematical_physicsTopics,
  ...relativityTopics,
  ...computational_physicsTopics,
  ...astrophysicsTopics,
  ...nuclear_particle_physicsTopics,
];
const problems = [
  ...mechanicsProblems,
  ...thermal_physicsProblems,
  ...electromagnetismProblems,
  ...opticsProblems,
  ...atomic_physicsProblems,
  ...analytical_mechanicsProblems,
  ...electrodynamicsProblems,
  ...quantum_mechanicsProblems,
  ...statistical_physicsProblems,
  ...solid_state_physicsProblems,
  ...mathematical_physicsProblems,
  ...relativityProblems,
  ...computational_physicsProblems,
  ...astrophysicsProblems,
  ...nuclear_particle_physicsProblems,
];
const formulaGroups = [
  ...mechanicsFormulaGroups,
  ...thermal_physicsFormulaGroups,
  ...electromagnetismFormulaGroups,
  ...opticsFormulaGroups,
  ...atomic_physicsFormulaGroups,
  ...analytical_mechanicsFormulaGroups,
  ...electrodynamicsFormulaGroups,
  ...quantum_mechanicsFormulaGroups,
  ...statistical_physicsFormulaGroups,
  ...solid_state_physicsFormulaGroups,
  ...mathematical_physicsFormulaGroups,
  ...relativityFormulaGroups,
  ...computational_physicsFormulaGroups,
  ...astrophysicsFormulaGroups,
  ...nuclear_particle_physicsFormulaGroups,
];

const errors: string[] = [];
const courseIds = new Set(courses.map((c) => c.id));
const physicsCourseIds = new Set(courses.filter((c) => c.subject === 'physics').map((c) => c.id));

// 1. 物理课程数
if (physicsCourseIds.size !== 15) errors.push(`物理课程数应为 15，实为 ${physicsCourseIds.size}`);

// 2. id 唯一性
const dup = (ids: string[], label: string) => {
  const seen = new Set<string>();
  const d = new Set<string>();
  for (const id of ids) (seen.has(id) ? d : seen).add(id);
  if (d.size) errors.push(`${label} 重复 id: ${[...d].join(', ')}`);
};
dup(topics.map((t) => t.id), '专题');
dup(problems.map((p) => p.id), '例题');
dup(formulaGroups.map((g) => g.id), '公式组');
dup(formulaGroups.flatMap((g) => g.formulas.map((f) => f.id)), '公式条目');

// 3. 外键有效性
for (const t of topics) {
  if (!courseIds.has(t.courseId)) errors.push(`专题 ${t.id} 的 courseId 无效: ${t.courseId}`);
  for (const pid of t.relatedProblemIds ?? []) {
    if (!problems.some((p) => p.id === pid)) errors.push(`专题 ${t.id} 悬空 relatedProblemId: ${pid}`);
  }
}
for (const p of problems) {
  if (!courseIds.has(p.courseId)) errors.push(`例题 ${p.id} 的 courseId 无效: ${p.courseId}`);
  if (!topics.some((t) => t.id === p.topicId)) errors.push(`例题 ${p.id} 悬空 topicId: ${p.topicId}`);
}
for (const g of formulaGroups) {
  if (!courseIds.has(g.courseId)) errors.push(`公式组 ${g.id} 的 courseId 无效: ${g.courseId}`);
  if (g.formulas.length === 0) errors.push(`公式组 ${g.id} 为空`);
}

// 4. 内容质量：正文长度与小节数
const short: string[] = [];
const fewSections: string[] = [];
for (const t of topics) {
  const len = (t.content.match(/[一-龥]/g) ?? []).length;
  if (len < 2500) short.push(`${t.id}(${len})`);
  const sections = (t.content.match(/^## /gm) ?? []).length;
  if (sections < 5) fewSections.push(`${t.id}(${sections})`);
}
if (short.length) errors.push(`正文不足 2500 字: ${short.join(', ')}`);
if (fewSections.length) errors.push(`小节不足 5 个: ${fewSections.join(', ')}`);

// 5. 每门物理课的覆盖情况 + 无配套例题的专题
const noProblem: string[] = [];
console.log('== 物理区各课程统计 ==');
for (const cid of physicsCourseIds) {
  const ts = topics.filter((t) => t.courseId === cid);
  const ps = problems.filter((p) => p.courseId === cid);
  const fg = formulaGroups.filter((g) => g.courseId === cid);
  const fc = fg.reduce((s, g) => s + g.formulas.length, 0);
  const name = courses.find((c) => c.id === cid)?.name ?? cid;
  console.log(`${name.padEnd(12)} 专题 ${String(ts.length).padStart(2)} · 例题 ${String(ps.length).padStart(2)} · 公式组 ${fg.length}(${fc} 条)`);
  if (ts.length !== 7) errors.push(`${cid} 专题数应为 7，实为 ${ts.length}`);
  if (ps.length < 6) errors.push(`${cid} 例题数不足 6`);
  for (const t of ts) {
    if (!ps.some((p) => p.topicId === t.id)) noProblem.push(`${cid}/${t.id}`);
  }
}
if (noProblem.length) console.log(`\n提示：以下专题没有 topicId 匹配的例题（页面例题区会为空）：\n  ${noProblem.join('\n  ')}`);

console.log(`\n合计：${topics.length} 专题 · ${problems.length} 例题 · ${formulaGroups.length} 公式组（${formulaGroups.reduce((s, g) => s + g.formulas.length, 0)} 条）`);
if (errors.length) {
  console.log(`\n✗ 发现 ${errors.length} 个问题：`);
  errors.forEach((e) => console.log('  - ' + e));
  process.exit(1);
} else {
  console.log('\n✓ 物理区数据完整性校验全部通过');
}
