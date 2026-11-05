import type { FormulaEntry, FormulaGroup } from '@/types';

type FormulaPatch = Partial<FormulaEntry> & { id: string };
type GroupPatch = Omit<Partial<FormulaGroup>, 'formulas'> & { formulas?: FormulaPatch[] };

const map: Record<string, GroupPatch> = {
  'astrophysics-fg1': {
    name: 'Celestial Mechanics and Orbits',
    formulas: [
      {
        id: 'astrophysics-f1',
        group: 'Universal Gravitation',
        name: 'Law of Universal Gravitation',
        note: 'An inverse-square central force; the minus sign denotes attraction',
      },
      {
        id: 'astrophysics-f2',
        group: 'Two-Body Problem',
        name: 'Reduced Mass',
        note: 'The two-body problem reduces to a single particle of mass $\\mu$ moving in the gravitational parameter $GM$',
      },
      {
        id: 'astrophysics-f3',
        group: "Kepler's Laws",
        name: "Kepler's Third Law (Newtonian Form)",
        note: 'The coefficient is inversely proportional to the sum of the two masses, which makes this a universal way to weigh celestial bodies',
      },
      {
        id: 'astrophysics-f4',
        group: "Kepler's Laws",
        name: "Kepler's Second Law (Areal Velocity)",
        note: 'The geometric statement of angular momentum conservation; the body moves faster near perihelion',
      },
      {
        id: 'astrophysics-f5',
        group: 'Orbital Energy',
        name: 'Total Energy of an Elliptical Orbit',
        note: 'The energy is fixed by the semi-major axis alone: $E<0$ ellipse, $E=0$ parabola, $E>0$ hyperbola',
      },
      {
        id: 'astrophysics-f6',
        group: 'Orbital Energy',
        name: 'Circular Orbit Speed and Escape Velocity',
        note: 'About 11.2 km/s at the Earth surface and about 618 km/s at the solar surface',
      },
    ],
  },
  'astrophysics-fg2': {
    name: 'Stellar Observation and Structure',
    formulas: [
      {
        id: 'astrophysics-f7',
        group: 'Magnitudes and Photometry',
        name: 'Magnitude Difference and Flux Ratio',
        note: 'A difference of 5 magnitudes corresponds to a brightness ratio of 100, i.e. about 2.512 per magnitude',
      },
      {
        id: 'astrophysics-f8',
        group: 'Magnitudes and Photometry',
        name: 'Distance Modulus',
        note: '$M$ is the absolute magnitude (the apparent magnitude at 10 pc); $M_{V,\\odot} \\approx 4.83$',
      },
      {
        id: 'astrophysics-f9',
        group: 'Stellar Parameters',
        name: 'Luminosity, Radius and Effective Temperature',
        note: 'The stellar radius follows from $L$ and $T_{\\text{eff}}$',
      },
      {
        id: 'astrophysics-f10',
        group: 'Stellar Structure',
        name: 'Hydrostatic Equilibrium',
        note: 'The pressure gradient balances self-gravity everywhere; to order of magnitude $P_c \\sim GM^2/R^4$',
      },
      {
        id: 'astrophysics-f11',
        group: 'Stellar Structure',
        name: 'Virial Theorem',
        note: 'For a self-gravitating bound system a star has negative heat capacity; $\\Omega \\approx -GM^2/R$',
      },
      {
        id: 'astrophysics-f12',
        group: 'Stellar Evolution',
        name: 'Main-Sequence Mass–Luminosity Relation and Lifetime',
        note: 'Obtained by combining $t_{MS} \\approx 0.007\\times 0.1\\,Mc^2/L$ with the mass–luminosity relation',
      },
    ],
  },
  'astrophysics-fg3': {
    name: 'Compact Objects and Cosmology',
    formulas: [
      {
        id: 'astrophysics-f13',
        group: 'Compact Objects',
        name: 'Chandrasekhar Limit',
        note: 'Critical mass obtained by balancing extreme-relativistic electron degeneracy pressure $P \\propto n_e^{4/3}$ against hydrostatic equilibrium',
      },
      {
        id: 'astrophysics-f14',
        group: 'Compact Objects',
        name: 'Schwarzschild Radius',
        note: 'Obtained by setting the escape velocity equal to the speed of light; about 8.9 mm for an Earth-mass black hole',
      },
      {
        id: 'astrophysics-f15',
        group: 'Star Formation',
        name: 'Jeans Criterion',
        note: 'Isothermal sound speed $c_s = \\sqrt{kT/(\\mu m_H)}$; $M_J \\propto \\rho^{-1/2}$ is what drives hierarchical fragmentation',
      },
      {
        id: 'astrophysics-f16',
        group: 'Cosmology',
        name: "Hubble's Law",
        note: 'Hubble time $1/H_0 \\approx 1.4\\times 10^{10}\\ \\text{yr}$',
      },
      {
        id: 'astrophysics-f17',
        group: 'Cosmology',
        name: 'Friedmann Equations',
        note: 'Matter $\\rho_m\\propto a^{-3}$, radiation $\\rho_r\\propto a^{-4}$, vacuum energy $\\rho_\\Lambda$ constant',
      },
      {
        id: 'astrophysics-f18',
        group: 'Cosmology',
        name: 'Critical Density and Cosmic Composition',
        note: '$\\Omega_{\\text{tot}} \\approx 1$ means flat space; the age of the universe is about $13.8\\times 10^{9}\\ \\text{yr}$',
      },
    ],
  },
};

export default map;
