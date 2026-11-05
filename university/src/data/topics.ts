import type { Topic } from '@/types';
import { applyTopicOverrides } from '@/lib/contentOverrides';
import { calculusTopics } from './topics/calculus';
import { linear_algebraTopics } from './topics/linear-algebra';
import { probabilityTopics } from './topics/probability';
import { discrete_mathTopics } from './topics/discrete-math';
import { mathematical_analysisTopics } from './topics/mathematical-analysis';
import { analytic_geometryTopics } from './topics/analytic-geometry';
import { odeTopics } from './topics/ode';
import { pdeTopics } from './topics/pde';
import { complex_analysisTopics } from './topics/complex-analysis';
import { real_analysisTopics } from './topics/real-analysis';
import { functional_analysisTopics } from './topics/functional-analysis';
import { abstract_algebraTopics } from './topics/abstract-algebra';
import { topologyTopics } from './topics/topology';
import { differential_geometryTopics } from './topics/differential-geometry';
import { numerical_analysisTopics } from './topics/numerical-analysis';
import { stochastic_processesTopics } from './topics/stochastic-processes';
import { combinatoricsTopics } from './topics/combinatorics';
import { mathematical_logicTopics } from './topics/mathematical-logic';
import { elementary_number_theoryTopics } from './topics/elementary-number-theory';
import { optimizationTopics } from './topics/optimization';
import { cryptographyTopics } from './topics/cryptography';
import { data_science_mathTopics } from './topics/data-science-math';
// ── 物理区 ──
import { mechanicsTopics } from './topics/mechanics';
import { thermal_physicsTopics } from './topics/thermal-physics';
import { electromagnetismTopics } from './topics/electromagnetism';
import { opticsTopics } from './topics/optics';
import { atomic_physicsTopics } from './topics/atomic-physics';
import { analytical_mechanicsTopics } from './topics/analytical-mechanics';
import { electrodynamicsTopics } from './topics/electrodynamics';
import { quantum_mechanicsTopics } from './topics/quantum-mechanics';
import { statistical_physicsTopics } from './topics/statistical-physics';
import { solid_state_physicsTopics } from './topics/solid-state-physics';
import { mathematical_physicsTopics } from './topics/mathematical-physics';
import { relativityTopics } from './topics/relativity';
import { computational_physicsTopics } from './topics/computational-physics';
import { astrophysicsTopics } from './topics/astrophysics';
import { nuclear_particle_physicsTopics } from './topics/nuclear-particle-physics';

/** 全站知识专题（按课程培养顺序排列） */
export const topics: Topic[] = [
  ...calculusTopics,
  ...linear_algebraTopics,
  ...mathematical_analysisTopics,
  ...analytic_geometryTopics,
  ...probabilityTopics,
  ...discrete_mathTopics,
  ...odeTopics,
  ...pdeTopics,
  ...complex_analysisTopics,
  ...real_analysisTopics,
  ...functional_analysisTopics,
  ...abstract_algebraTopics,
  ...topologyTopics,
  ...differential_geometryTopics,
  ...numerical_analysisTopics,
  ...stochastic_processesTopics,
  ...combinatoricsTopics,
  ...mathematical_logicTopics,
  ...elementary_number_theoryTopics,
  ...optimizationTopics,
  ...cryptographyTopics,
  ...data_science_mathTopics,
  // 物理区
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

// 合并开发者模式保存的本地内容覆盖（无覆盖时为空操作）
applyTopicOverrides(topics);

export const getTopic = (id: string): Topic | undefined =>
  topics.find((t) => t.id === id);

export const topicsByCourse = (courseId: string): Topic[] =>
  topics.filter((t) => t.courseId === courseId);
