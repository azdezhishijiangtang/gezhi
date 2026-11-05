import type { Problem } from '@/types';
import { calculusProblems } from './problems/calculus';
import { linear_algebraProblems } from './problems/linear-algebra';
import { probabilityProblems } from './problems/probability';
import { discrete_mathProblems } from './problems/discrete-math';
import { mathematical_analysisProblems } from './problems/mathematical-analysis';
import { analytic_geometryProblems } from './problems/analytic-geometry';
import { odeProblems } from './problems/ode';
import { pdeProblems } from './problems/pde';
import { complex_analysisProblems } from './problems/complex-analysis';
import { real_analysisProblems } from './problems/real-analysis';
import { functional_analysisProblems } from './problems/functional-analysis';
import { abstract_algebraProblems } from './problems/abstract-algebra';
import { topologyProblems } from './problems/topology';
import { differential_geometryProblems } from './problems/differential-geometry';
import { numerical_analysisProblems } from './problems/numerical-analysis';
import { stochastic_processesProblems } from './problems/stochastic-processes';
import { combinatoricsProblems } from './problems/combinatorics';
import { mathematical_logicProblems } from './problems/mathematical-logic';
// ── 物理区 ──
import { mechanicsProblems } from './problems/mechanics';
import { thermal_physicsProblems } from './problems/thermal-physics';
import { electromagnetismProblems } from './problems/electromagnetism';
import { opticsProblems } from './problems/optics';
import { atomic_physicsProblems } from './problems/atomic-physics';
import { analytical_mechanicsProblems } from './problems/analytical-mechanics';
import { electrodynamicsProblems } from './problems/electrodynamics';
import { quantum_mechanicsProblems } from './problems/quantum-mechanics';
import { statistical_physicsProblems } from './problems/statistical-physics';
import { solid_state_physicsProblems } from './problems/solid-state-physics';
import { mathematical_physicsProblems } from './problems/mathematical-physics';
import { relativityProblems } from './problems/relativity';
import { computational_physicsProblems } from './problems/computational-physics';
import { astrophysicsProblems } from './problems/astrophysics';
import { nuclear_particle_physicsProblems } from './problems/nuclear-particle-physics';

/** 全站例题库（按课程培养顺序排列） */
export const problems: Problem[] = [
  ...calculusProblems,
  ...linear_algebraProblems,
  ...mathematical_analysisProblems,
  ...analytic_geometryProblems,
  ...probabilityProblems,
  ...discrete_mathProblems,
  ...odeProblems,
  ...pdeProblems,
  ...complex_analysisProblems,
  ...real_analysisProblems,
  ...functional_analysisProblems,
  ...abstract_algebraProblems,
  ...topologyProblems,
  ...differential_geometryProblems,
  ...numerical_analysisProblems,
  ...stochastic_processesProblems,
  ...combinatoricsProblems,
  ...mathematical_logicProblems,
  // 物理区
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
