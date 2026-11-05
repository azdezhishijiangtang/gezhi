import type { FormulaGroup } from '@/types';

const map: Record<string, Partial<FormulaGroup>> = {
  'optics-fg1': {
    name: 'Geometric Optics and Imaging',
    formulas: [
      { id: 'optics-f1', group: 'Basic Laws', name: 'Law of Reflection', latex: '\\theta_i = \\theta_r' },
      { id: 'optics-f2', group: 'Basic Laws', name: 'Law of Refraction (Snell’s Law)', latex: 'n_1\\sin\\theta_1 = n_2\\sin\\theta_2' },
      { id: 'optics-f3', group: 'Fermat’s Principle', name: 'Stationary Optical Path Length', latex: '\\delta\\int_{A}^{B} n\\,ds = 0' },
      { id: 'optics-f4', group: 'Spherical Refraction', name: 'Paraxial Imaging at a Single Spherical Surface', latex: '\\frac{n_1}{s} + \\frac{n_2}{s^{\\prime}} = \\frac{n_2 - n_1}{R}' },
      { id: 'optics-f5', group: 'Thin Lenses', name: 'Thin-Lens Equation', latex: '\\frac{1}{s} + \\frac{1}{s^{\\prime}} = \\frac{1}{f}' },
      { id: 'optics-f6', group: 'Thin Lenses', name: 'Lens Maker’s Equation', latex: '\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)' },
    ],
  },
  'optics-fg2': {
    name: 'Interference and Diffraction',
    formulas: [
      { id: 'optics-f7', group: 'Optical Path', name: 'Optical Path and Phase Difference', latex: '\\Delta = n\\,d,\\quad \\delta = \\frac{2\\pi}{\\lambda}\\,\\Delta' },
      { id: 'optics-f8', group: 'Two-Beam Interference', name: 'Bright-Fringe Positions in Young’s Double Slit', latex: 'x_k = k\\,\\frac{\\lambda D}{d}\\quad (k = 0,\\pm1,\\pm2,\\ldots)' },
      { id: 'optics-f9', group: 'Thin-Film Interference', name: 'Optical Path Difference at Normal Incidence', latex: '\\Delta = 2 n e + \\frac{\\lambda}{2}' },
      { id: 'optics-f10', group: 'Equal-Thickness Interference', name: 'Newton’s Ring Radii', latex: 'r_k = \\sqrt{k\\lambda R}\\quad (k = 0,1,2,\\ldots)' },
      { id: 'optics-f11', group: 'Fraunhofer Diffraction', name: 'Dark Fringes in Single-Slit Diffraction', latex: 'a\\sin\\theta = k\\lambda\\quad (k = \\pm1,\\pm2,\\ldots)' },
      { id: 'optics-f12', group: 'Diffraction Grating', name: 'Grating Equation', latex: 'd\\sin\\theta = k\\lambda\\quad (k = 0,\\pm1,\\pm2,\\ldots)' },
    ],
  },
  'optics-fg3': {
    name: 'Polarization, Coherence and Modern Optics',
    formulas: [
      { id: 'optics-f13', group: 'Polarization', name: 'Malus’s Law', latex: 'I = I_0\\cos^2\\theta' },
      { id: 'optics-f14', group: 'Polarization', name: 'Brewster Angle', latex: '\\tan\\theta_B = \\frac{n_2}{n_1}' },
      { id: 'optics-f15', group: 'Birefringence', name: 'Birefringence Difference', latex: '\\Delta n = n_e - n_o' },
      { id: 'optics-f16', group: 'Coherence', name: 'Coherence Length', latex: 'L_c = c\\,\\tau_c = \\frac{\\lambda^2}{\\Delta\\lambda}' },
      { id: 'optics-f17', group: 'Coherence', name: 'Coherence Time', latex: '\\tau_c \\approx \\frac{1}{\\Delta\\nu}' },
      { id: 'optics-f18', group: 'Lasers', name: 'Longitudinal Modes of a Resonator', latex: '\\nu_q = q\\,\\frac{c}{2L}' },
    ],
  },
};

export default map;
