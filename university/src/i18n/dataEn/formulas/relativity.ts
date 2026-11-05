import type { FormulaGroup } from '@/types';

const map: Record<string, Partial<FormulaGroup>> = {
  'relativity-fg1': {
    name: 'Lorentz Transformations and Relativistic Kinematics',
    formulas: [
      {
        id: 'relativity-f1',
        group: 'Lorentz Transformation',
        name: 'Lorentz Transformation (along x)',
        latex: "x^{\\prime} = \\gamma(x - vt),\\quad t^{\\prime} = \\gamma\\left(t - \\frac{vx}{c^2}\\right),\\quad \\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}",
      },
      {
        id: 'relativity-f2',
        group: 'Velocity Transformation',
        name: 'Relativistic Velocity Addition',
        latex: "u_x^{\\prime} = \\frac{u_x - v}{1 - u_x v/c^2},\\qquad u_y^{\\prime} = \\frac{u_y}{\\gamma\\left(1 - u_x v/c^2\\right)}",
      },
      {
        id: 'relativity-f3',
        group: 'Time Dilation',
        name: 'Moving Clocks Run Slow',
        latex: '\\Delta t = \\gamma\\,\\Delta\\tau',
        note: '$\\Delta\\tau$ is the proper time recorded by a clock at rest relative to the moving object',
      },
      {
        id: 'relativity-f4',
        group: 'Length Contraction',
        name: 'Moving Rulers Contract',
        latex: 'L = \\frac{L_0}{\\gamma}',
        note: 'Contraction occurs along the direction of motion while transverse lengths are unchanged; $L_0$ is the proper length',
      },
      {
        id: 'relativity-f5',
        group: 'Doppler Effect',
        name: 'Relativistic Doppler Shift (receding)',
        latex: '\\nu = \\nu_0\\sqrt{\\frac{1 - \\beta}{1 + \\beta}},\\qquad \\beta = \\frac{v}{c}',
      },
      {
        id: 'relativity-f6',
        group: 'Simultaneity',
        name: 'Relativity of Simultaneity at Separate Locations',
        latex: '\\Delta t^{\\prime} = \\gamma\\left(\\Delta t - \\frac{v\\,\\Delta x}{c^2}\\right)',
        note: 'For $\\Delta t = 0$ with $\\Delta x \\neq 0$ one finds $\\Delta t^{\\prime} \\neq 0$',
      },
    ],
  },
  'relativity-fg2': {
    name: 'Spacetime Geometry and Relativistic Dynamics',
    formulas: [
      {
        id: 'relativity-f7',
        group: 'Spacetime Interval',
        name: 'Interval Invariant',
        latex: '\\Delta s^2 = c^2\\Delta t^2 - \\Delta x^2 - \\Delta y^2 - \\Delta z^2',
        note: 'Identical in all inertial frames; positive for timelike, zero for lightlike and negative for spacelike separation',
      },
      {
        id: 'relativity-f8',
        group: 'Dynamics',
        name: 'Relativistic Momentum and Mass–Velocity Relation',
        latex: '\\mathbf{p} = \\gamma m_0\\,\\mathbf{v} = m\\,\\mathbf{v},\\qquad m = \\gamma m_0',
      },
      {
        id: 'relativity-f9',
        group: 'Dynamics',
        name: 'Mass–Energy Relation',
        latex: 'E = \\gamma m_0 c^2 = mc^2,\\qquad E_0 = m_0 c^2',
      },
      {
        id: 'relativity-f10',
        group: 'Dynamics',
        name: 'Relativistic Kinetic Energy',
        latex: 'E_k = (\\gamma - 1)m_0 c^2',
        note: 'Reduces to $\\frac{1}{2}m_0 v^2$ in the low-speed limit',
      },
      {
        id: 'relativity-f11',
        group: 'Dynamics',
        name: 'Energy–Momentum Relation',
        latex: 'E^2 = p^2 c^2 + m_0^2 c^4',
        note: 'For a photon ($m_0 = 0$) it gives $E = pc$',
      },
      {
        id: 'relativity-f12',
        group: 'Dynamics',
        name: 'Mass Defect and Reaction Energy',
        latex: 'Q = \\Delta m\\,c^2,\\qquad 1\\ \\text{u}\\,c^2 = 931.5\\ \\text{MeV}',
      },
    ],
  },
  'relativity-fg3': {
    name: 'Four-Vector Formalism and Electromagnetic Fields',
    formulas: [
      {
        id: 'relativity-f13',
        group: 'Four-Vectors',
        name: 'Four-Position and Metric',
        latex: "X^{\\mu} = (ct,\\, x,\\, y,\\, z),\\qquad \\eta_{\\mu\\nu} = \\mathrm{diag}(1,\\,-1,\\,-1,\\,-1)",
      },
      {
        id: 'relativity-f14',
        group: 'Four-Vectors',
        name: 'Matrix Form of the Lorentz Transformation',
        latex: "X^{\\prime\\mu} = \\Lambda^{\\mu}_{\\ \\nu}X^{\\nu},\\quad \\Lambda^{\\mu}_{\\ \\nu} = \\begin{pmatrix}\\gamma & -\\beta\\gamma\\\\ -\\beta\\gamma & \\gamma\\end{pmatrix}",
        note: 'Satisfies $\\Lambda^{\\mathrm{T}}\\eta\\Lambda = \\eta$, which guarantees that the interval is invariant',
      },
      {
        id: 'relativity-f15',
        group: 'Four-Vectors',
        name: 'Four-Velocity and Four-Acceleration',
        latex: "U^{\\mu} = \\gamma(c,\\,\\mathbf{v}),\\qquad U^{\\mu}U_{\\mu} = c^2,\\qquad A^{\\mu} = \\frac{\\mathrm{d}U^{\\mu}}{\\mathrm{d}\\tau},\\quad U^{\\mu}A_{\\mu} = 0",
      },
      {
        id: 'relativity-f16',
        group: 'Four-Vectors',
        name: 'Four-Momentum',
        latex: "P^{\\mu} = \\left(\\frac{E}{c},\\,\\mathbf{p}\\right) = m_0 U^{\\mu},\\qquad P^{\\mu}P_{\\mu} = m_0^2 c^2",
      },
      {
        id: 'relativity-f17',
        group: 'Electromagnetic Field',
        name: 'Electromagnetic Field Transformation',
        latex: "\\mathbf{E}^{\\prime}_{\\parallel} = \\mathbf{E}_{\\parallel},\\quad \\mathbf{E}^{\\prime}_{\\perp} = \\gamma(\\mathbf{E}_{\\perp} + \\mathbf{v}\\times\\mathbf{B});\\qquad \\mathbf{B}^{\\prime}_{\\perp} = \\gamma\\left(\\mathbf{B}_{\\perp} - \\frac{\\mathbf{v}\\times\\mathbf{E}}{c^2}\\right)",
      },
      {
        id: 'relativity-f18',
        group: 'Electromagnetic Field',
        name: 'Four-Potential and Covariant Maxwell Equations',
        latex: "A^{\\mu} = \\left(\\frac{\\phi}{c},\\,\\mathbf{A}\\right),\\quad F^{\\mu\\nu} = \\partial^{\\mu}A^{\\nu} - \\partial^{\\nu}A^{\\mu},\\quad \\partial_{\\mu}F^{\\mu\\nu} = \\mu_0 J^{\\nu}",
      },
    ],
  },
};

export default map;
