import type { FormulaEntry, FormulaGroup } from '@/types';

type FormulaPatch = Partial<FormulaEntry> & { id: string };
type GroupPatch = Omit<Partial<FormulaGroup>, 'formulas'> & { formulas?: FormulaPatch[] };

const map: Record<string, GroupPatch> = {
  'mechanics-fg1': {
    name: 'Kinematics of a Particle',
    formulas: [
      { id: 'mechanics-f1', group: 'Kinematics', name: 'Position Vector' },
      { id: 'mechanics-f2', group: 'Kinematics', name: 'Velocity' },
      { id: 'mechanics-f3', group: 'Kinematics', name: 'Acceleration' },
      { id: 'mechanics-f4', group: 'Curvilinear Motion', name: 'Projectile Motion' },
      { id: 'mechanics-f5', group: 'Curvilinear Motion', name: 'Tangential and Normal Acceleration' },
      { id: 'mechanics-f6', group: 'Relative Motion', name: 'Galilean Velocity Transformation' },
    ],
  },
  'mechanics-fg2': {
    name: 'Dynamics: Momentum and Energy',
    formulas: [
      { id: 'mechanics-f7', group: "Newton's Laws", name: "Newton's Second Law" },
      { id: 'mechanics-f8', group: 'Common Forces', name: "Hooke's Law" },
      { id: 'mechanics-f9', group: 'Momentum', name: 'Impulse' },
      { id: 'mechanics-f10', group: 'Momentum', name: 'Impulse–Momentum Theorem' },
      { id: 'mechanics-f11', group: 'Momentum', name: 'Conservation of Momentum' },
      { id: 'mechanics-f12', group: 'Energy', name: 'Work–Energy Theorem' },
    ],
  },
  'mechanics-fg3': {
    name: 'Rotation and Oscillation',
    formulas: [
      { id: 'mechanics-f13', group: 'Rotation', name: 'Torque' },
      { id: 'mechanics-f14', group: 'Rotation', name: 'Angular Momentum' },
      { id: 'mechanics-f15', group: 'Rotation', name: 'Angular Momentum Theorem' },
      { id: 'mechanics-f16', group: 'Rotation', name: 'Rotational Law' },
      { id: 'mechanics-f17', group: 'Rotation', name: 'Parallel-Axis Theorem' },
      { id: 'mechanics-f18', group: 'Oscillation', name: 'Simple Harmonic Motion Equation' },
    ],
  },
};

export default map;
