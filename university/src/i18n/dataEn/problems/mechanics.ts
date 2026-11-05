import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  // ─────────────────────── Kinematics of a Particle ───────────────────────
  'mechanics-p1': {
    title: 'Range and Maximum Height of Projectile Motion',
    question: 'A ball is thrown upward at an angle $\\theta = 30^\\circ$ to the horizontal with initial speed $v_0 = 20\\ \\text{m/s}$. Neglect air resistance and take $g = 10\\ \\text{m/s}^2$. Find: (1) the time of flight $T$; (2) the horizontal range $R$; (3) the maximum height $H$.',
    hints: [
      'Decompose the motion into a uniform horizontal component and a uniformly accelerated vertical component, coupled through the common time $t$.',
      'The vertical component of the initial velocity is $v_0\\sin\\theta$; setting $y=0$ at landing determines the flight time $T$.',
      'The horizontal range is $R = v_0\\cos\\theta \\cdot T$; the maximum height is reached when the vertical velocity vanishes.',
    ],
    solution: [
      {
        title: 'Decomposing the initial velocity',
        detail: 'Horizontal component $v_{0x} = v_0\\cos30^\\circ = 20 \\cdot \\frac{\\sqrt{3}}{2} = 10\\sqrt{3}\\ \\text{m/s}$; vertical component $v_{0y} = v_0\\sin30^\\circ = 20 \\cdot \\frac12 = 10\\ \\text{m/s}$.',
      },
      {
        title: 'Time of flight',
        detail: 'The vertical displacement is $y = v_{0y}T - \\frac12 g T^2 = 0$; since $T>0$, $T = \\dfrac{2v_{0y}}{g} = \\dfrac{2 \\times 10}{10} = 2\\ \\text{s}$.',
      },
      {
        title: 'Horizontal range',
        detail: '$R = v_{0x} T = 10\\sqrt{3} \\times 2 = 20\\sqrt{3} \\approx 34.6\\ \\text{m}$.',
      },
      {
        title: 'Maximum height',
        detail: 'At the highest point the vertical velocity is zero, so $H = \\dfrac{v_{0y}^2}{2g} = \\dfrac{10^2}{2 \\times 10} = 5\\ \\text{m}$.',
      },
    ],
    answer: '$T = 2\\ \\text{s},\\quad R = 20\\sqrt{3}\\ \\text{m}\\ (\\approx 34.6\\ \\text{m}),\\quad H = 5\\ \\text{m}$',
    tags: ['Projectile motion', 'Decomposition of motion', 'Kinematics'],
  },

  // ─────────────────────── Newton's Laws of Motion ───────────────────────
  'mechanics-p2': {
    title: 'Block Sliding Down and Decelerating Up an Incline',
    question: 'A block of mass $m = 2\\ \\text{kg}$ rests on an incline of angle $\\alpha = 30^\\circ$; the coefficient of kinetic friction is $\\mu = 0.2$ and $g = 10\\ \\text{m/s}^2$. Find: (1) the acceleration $a$ of the block sliding down the incline; (2) the maximum distance $s$ it can slide up if given an initial velocity $v_0 = 5\\ \\text{m/s}$ directed up the incline.',
    hints: [
      'Resolve gravity along and perpendicular to the incline; the normal force is $N = mg\\cos\\alpha$.',
      'Sliding down, friction points up the incline and the net force is $mg\\sin\\alpha - f$, where $f = \\mu N$.',
      'Sliding up, friction reverses (points down) and together with the gravity component opposes the motion; use $v^2 = 2as$ to find the distance.',
    ],
    solution: [
      {
        title: 'Resolving the forces',
        detail: 'Normal direction: $N = mg\\cos30^\\circ = 2 \\times 10 \\times \\frac{\\sqrt{3}}{2} = 10\\sqrt{3}\\ \\text{N}$; kinetic friction $f = \\mu N = 0.2 \\times 10\\sqrt{3} = 2\\sqrt{3}\\ \\text{N}$.',
      },
      {
        title: 'Acceleration down the incline',
        detail: 'Taking down the incline as positive, the net force is $F = mg\\sin30^\\circ - f = 2\\times10\\times\\frac12 - 2\\sqrt{3} = 10 - 2\\sqrt{3}$. Hence $a = \\dfrac{F}{m} = \\dfrac{10 - 2\\sqrt{3}}{2} = 5 - \\sqrt{3} \\approx 3.27\\ \\text{m/s}^2$.',
      },
      {
        title: 'Deceleration while sliding up',
        detail: 'Sliding up, friction points down the incline, in the same direction as the gravity component, so the deceleration is $a^{\\prime} = \\dfrac{mg\\sin30^\\circ + f}{m} = \\dfrac{10 + 2\\sqrt{3}}{2} = 5 + \\sqrt{3} \\approx 6.73\\ \\text{m/s}^2$.',
      },
      {
        title: 'Maximum sliding distance',
        detail: 'The final velocity is zero, so $s = \\dfrac{v_0^2}{2a^{\\prime}} = \\dfrac{25}{2(5 + \\sqrt{3})} \\approx \\dfrac{25}{12.928} \\approx 1.93\\ \\text{m}$.',
      },
    ],
    answer: 'Acceleration down the incline $a = 5 - \\sqrt{3}\\ \\text{m/s}^2\\ (\\approx 3.27)$; maximum sliding distance $s = \\dfrac{25}{2(5+\\sqrt{3})}\\ \\text{m}\\ (\\approx 1.93)$',
    tags: ['Newton\'s second law', 'Inclined plane', 'Friction'],
  },

  // ─────────────────────── Momentum and Impulse ───────────────────────
  'mechanics-p3': {
    title: 'Perfectly Inelastic Collision of a Bullet Embedding in a Block',
    question: 'A bullet of mass $m = 0.01\\ \\text{kg}$ travelling horizontally at $v = 400\\ \\text{m/s}$ strikes a block of mass $M = 1.99\\ \\text{kg}$ at rest on a smooth horizontal surface; the bullet remains embedded in the block (perfectly inelastic collision). Find: (1) the common velocity $V$ after the collision; (2) the mechanical energy $\\Delta E$ lost in the collision.',
    hints: [
      'There is no external force in the horizontal direction, so the momentum of the system is conserved.',
      'After the collision the common velocity is $V = \\dfrac{mv}{m+M}$.',
      'The lost kinetic energy is the kinetic energy before minus that after the collision; almost all of it becomes internal energy.',
    ],
    solution: [
      {
        title: 'Common velocity from momentum conservation',
        detail: 'Total momentum before the collision $p = mv = 0.01 \\times 400 = 4\\ \\text{kg}\\cdot\\text{ m/s}$; total mass after $m+M = 2.00\\ \\text{kg}$. From $mv = (m+M)V$ we get $V = \\dfrac{4}{2.00} = 2\\ \\text{m/s}$.',
      },
      {
        title: 'Kinetic energy before the collision',
        detail: '$E_{k1} = \\dfrac12 m v^2 = \\dfrac12 \\times 0.01 \\times 400^2 = 800\\ \\text{J}$.',
      },
      {
        title: 'Kinetic energy after the collision',
        detail: '$E_{k2} = \\dfrac12 (m+M)V^2 = \\dfrac12 \\times 2.00 \\times 2^2 = 4\\ \\text{J}$.',
      },
      {
        title: 'Mechanical energy loss',
        detail: '$\\Delta E = E_{k1} - E_{k2} = 800 - 4 = 796\\ \\text{J}$. Clearly the vast majority of the mechanical energy is converted into internal energy.',
      },
    ],
    answer: '$V = 2\\ \\text{m/s}$; lost mechanical energy $\\Delta E = 796\\ \\text{J}$',
    tags: ['Momentum conservation', 'Perfectly inelastic collision', 'Energy loss'],
  },

  // ─────────────────────── Work and Energy ───────────────────────
  'mechanics-p4': {
    title: 'Sliding Down a Circular Arc, Crossing a Rough Horizontal Section, Compressing a Spring',
    question: 'A small block of mass $m = 1\\ \\text{kg}$ slides from rest down a smooth quarter-circle track of radius $R = 0.8\\ \\text{m}$ and enters a horizontal section; the horizontal section is rough (coefficient of kinetic friction $\\mu = 0.2$) and ends in a light spring of stiffness $k = 100\\ \\text{N/m}$. The block finally comes to rest instantaneously at the point of maximum spring compression. Find the maximum compression $x$ ($g = 10\\ \\text{m/s}^2$).',
    hints: [
      'The circular arc is smooth, so use conservation of mechanical energy to find the speed or kinetic energy at the bottom.',
      'On the horizontal section both friction and the spring force do work.',
      'Apply the work-energy theorem from "the bottom" to "maximum compression": initial kinetic energy = energy dissipated by friction + elastic potential energy of the spring, giving a quadratic equation in $x$.',
    ],
    solution: [
      {
        title: 'Kinetic energy at the bottom of the arc',
        detail: 'Mechanical energy is conserved on the smooth arc: $mgR = \\dfrac12 m v^2$, so $v^2 = 2gR = 2\\times10\\times0.8 = 16$ and the initial kinetic energy is $E_k = \\dfrac12 m v^2 = \\dfrac12 \\times 1 \\times 16 = 8\\ \\text{J}$.',
      },
      {
        title: 'Forces on the horizontal section',
        detail: 'Friction $f = \\mu mg = 0.2 \\times 1 \\times 10 = 2\\ \\text{N}$; over the displacement $x$ from the bottom to maximum compression, the work done by friction is $W_f = -f x = -2x$. The elastic potential energy of the spring is $E_p = \\dfrac12 k x^2 = 50 x^2$.',
      },
      {
        title: 'Setting up the work-energy equation',
        detail: 'The final kinetic energy is zero, so from the bottom to maximum compression: $E_k + W_f = E_p$, i.e. $8 - 2x = 50 x^2$. Rearranging gives $50x^2 + 2x - 8 = 0$.',
      },
      {
        title: 'Solving the quadratic equation',
        detail: '$x = \\dfrac{-2 + \\sqrt{2^2 + 4\\times50\\times8}}{2\\times50} = \\dfrac{-2 + \\sqrt{1604}}{100} \\approx \\dfrac{-2 + 40.05}{100} \\approx 0.3805\\ \\text{m}$. The negative root is discarded.',
      },
    ],
    answer: '$x = \\dfrac{-2 + \\sqrt{1604}}{100}\\ \\text{m} \\approx 0.38\\ \\text{m}$',
    tags: ['Work-energy theorem', 'Mechanical energy conservation', 'Spring', 'Work done by friction'],
  },

  // ─────────────────────── Angular Momentum ───────────────────────
  'mechanics-p5': {
    title: 'Conservation of Angular Momentum When Pulling the Arms In',
    question: 'A person stands on a turntable that can rotate freely without friction, arms initially spread; the moment of inertia of the system is $I_1 = 3\\ \\text{kg}\\cdot\\text{ m}^2$ and the angular velocity is $\\omega_1 = 2\\ \\text{rad/s}$. After pulling the arms in, the moment of inertia becomes $I_2 = 1\\ \\text{kg}\\cdot\\text{ m}^2$. Find: (1) the angular velocity $\\omega_2$ after pulling the arms in; (2) the change in the rotational kinetic energy of the system.',
    hints: [
      'The axis of rotation is vertical and no external torque acts on the system, so angular momentum is conserved: $I_1\\omega_1 = I_2\\omega_2$.',
      'Rotational kinetic energy is $E_k = \\dfrac12 I\\omega^2$; substitute the $\\omega_2$ obtained from conservation.',
      'The increase in kinetic energy comes from the work done by the person\'s muscles while pulling the arms in.',
    ],
    solution: [
      {
        title: 'Angular momentum conservation',
        detail: 'The net external torque about the vertical axis is zero, so $I_1\\omega_1 = I_2\\omega_2$, giving $\\omega_2 = \\dfrac{I_1}{I_2}\\omega_1 = \\dfrac{3}{1} \\times 2 = 6\\ \\text{rad/s}$.',
      },
      {
        title: 'Initial rotational kinetic energy',
        detail: '$E_{k1} = \\dfrac12 I_1 \\omega_1^2 = \\dfrac12 \\times 3 \\times 2^2 = 6\\ \\text{J}$.',
      },
      {
        title: 'Final rotational kinetic energy',
        detail: '$E_{k2} = \\dfrac12 I_2 \\omega_2^2 = \\dfrac12 \\times 1 \\times 6^2 = 18\\ \\text{J}$.',
      },
      {
        title: 'Change in kinetic energy',
        detail: '$\\Delta E_k = E_{k2} - E_{k1} = 18 - 6 = 12\\ \\text{J}$ (supplied by the work the person does in pulling the arms in, with total energy conserved).',
      },
    ],
    answer: '$\\omega_2 = 6\\ \\text{rad/s}$; the rotational kinetic energy increases by $12\\ \\text{J}$',
    tags: ['Angular momentum conservation', 'Moment of inertia', 'Rotational kinetic energy'],
  },

  // ─────────────────────── Simple Harmonic Motion ───────────────────────
  'mechanics-p6': {
    title: 'Period and State of Motion of a Spring Oscillator',
    question: 'A spring oscillator has mass $m = 0.1\\ \\text{kg}$ and stiffness $k = 40\\ \\text{N/m}$. The oscillator is displaced $x_0 = 0.05\\ \\text{m}$ from equilibrium and released from rest. Find: (1) the angular frequency $\\omega$ and period $T$; (2) the amplitude $A$ and initial phase $\\varphi$ (in cosine form); (3) the displacement and velocity at $t = \\pi/40\\ \\text{s}$; (4) the maximum speed $v_{\\max}$.',
    hints: [
      'Angular frequency $\\omega = \\sqrt{k/m}$, period $T = 2\\pi/\\omega$.',
      'Released from rest at the maximum displacement, so the amplitude equals $x_0$ and the initial phase is $\\varphi = 0$ (cosine form).',
      'Displacement $x = A\\cos(\\omega t)$, velocity $v = -A\\omega\\sin(\\omega t)$.',
    ],
    solution: [
      {
        title: 'Angular frequency and period',
        detail: '$\\omega = \\sqrt{\\dfrac{k}{m}} = \\sqrt{\\dfrac{40}{0.1}} = \\sqrt{400} = 20\\ \\text{rad/s}$; $T = \\dfrac{2\\pi}{\\omega} = \\dfrac{2\\pi}{20} = \\dfrac{\\pi}{10} \\approx 0.314\\ \\text{s}$.',
      },
      {
        title: 'Amplitude and initial phase',
        detail: 'Released from rest at $x_0 = 0.05\\ \\text{m}$, so the amplitude is $A = 0.05\\ \\text{m}$, the initial phase is $\\varphi = 0$, and the equation of motion is $x = 0.05\\cos(20t)$.',
      },
      {
        title: 'State at the given instant',
        detail: 'At $t = \\pi/40$, $\\omega t = 20 \\times \\dfrac{\\pi}{40} = \\dfrac{\\pi}{2}$. Displacement $x = 0.05\\cos(\\pi/2) = 0$; velocity $v = -0.05 \\times 20 \\times \\sin(\\pi/2) = -1\\ \\text{m/s}$.',
      },
      {
        title: 'Maximum speed',
        detail: '$v_{\\max} = A\\omega = 0.05 \\times 20 = 1\\ \\text{m/s}$ (attained at the equilibrium position).',
      },
    ],
    answer: '$\\omega = 20\\ \\text{rad/s},\\ T = \\pi/10\\ \\text{s},\\ A = 0.05\\ \\text{m},\\ \\varphi = 0$; displacement $0$, velocity $-1\\ \\text{m/s}$; $v_{\\max} = 1\\ \\text{m/s}$',
    tags: ['Simple harmonic motion', 'Spring oscillator', 'Rotating vector'],
  },
};

export default map;
