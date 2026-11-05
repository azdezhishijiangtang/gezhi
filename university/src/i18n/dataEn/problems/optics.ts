import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'optics-p1': {
    title: 'Image Position and Magnification of a Thin Convex Lens',
    question: 'A thin convex lens has focal length $f = 10\\ \\text{cm}$. An object of height $h = 2\\ \\text{cm}$ is placed perpendicular to the principal axis at a distance $s = 15\\ \\text{cm}$ in front of the lens. Find: (1) the image distance $s^{\\prime}$; (2) the transverse magnification $m$ and image height $h^{\\prime}$; (3) whether the image is real or virtual, erect or inverted.',
    hints: [
      'Use the thin lens equation $\\dfrac{1}{s} + \\dfrac{1}{s^{\\prime}} = \\dfrac{1}{f}$, with object distance $s>0$ and focal length $f>0$.',
      'The transverse magnification is $m = -\\dfrac{s^{\\prime}}{s}$; the minus sign means inverted.',
      'A positive image distance means a real image (which can be caught on a screen); negative means virtual.',
    ],
    solution: [
      {
        title: 'Image distance from the lens equation',
        detail: 'From $\\dfrac{1}{s^{\\prime}} = \\dfrac{1}{f} - \\dfrac{1}{s} = \\dfrac{1}{10} - \\dfrac{1}{15} = \\dfrac{3-2}{30} = \\dfrac{1}{30}$ we get $s^{\\prime} = 30\\ \\text{cm}$. The image distance is positive, so the image is real.',
      },
      {
        title: 'Magnification and image height',
        detail: '$m = -\\dfrac{s^{\\prime}}{s} = -\\dfrac{30}{15} = -2$. Hence the image height is $h^{\\prime} = m h = -2 \\times 2 = -4\\ \\text{cm}$. Its magnitude exceeds the object height, so the image is enlarged.',
      },
      {
        title: 'Nature of the image',
        detail: '$s^{\\prime}>0$ means the image lies on the opposite side of the lens from the object, so it is real; $m<0$ means it is inverted relative to the object. Conclusion: an inverted, enlarged real image located $30\\ \\text{cm}$ on the other side of the lens.',
      },
    ],
    answer: '$s^{\\prime} = 30\\ \\text{cm}$; magnification $m = -2$, image height $h^{\\prime} = -4\\ \\text{cm}$; an inverted, enlarged real image.',
    tags: ['Thin lens', 'Lens equation', 'Transverse magnification'],
  },
  'optics-p2': {
    title: 'Refraction Angle from Air into Water via Huygens Principle',
    question: 'A plane wave travels from air into water at an angle of incidence $\\theta_1 = 30^{\\circ}$. The wave speed in air is $v_1 = 3.0\\times10^8\\ \\text{m/s}$ and in water $v_2 = 2.25\\times10^8\\ \\text{m/s}$, with the frequency unchanged. Derive the refraction angle $\\theta_2$ and the law of refraction using (1) the Huygens wavelet construction and (2) the wave-speed relation.',
    hints: [
      'The frequency $f$ does not change across the interface, so the change in wave speed changes the wavelength: $\\lambda = v/f$.',
      'Huygens principle: every point on the interface acts as a wavelet source, and after the same time $\\Delta t$ the envelope of the wavelets is the new wavefront.',
      'The geometric relation $v_1\\Delta t /\\sin\\theta_1 = v_2\\Delta t /\\sin\\theta_2$ gives $\\sin\\theta_1/\\sin\\theta_2 = v_1/v_2 = n_2/n_1$.',
    ],
    solution: [
      {
        title: 'Wavelength relation',
        detail: 'The frequency is unchanged, so $\\lambda_1 = v_1/f$ and $\\lambda_2 = v_2/f$, hence $\\lambda_2/\\lambda_1 = v_2/v_1 = 2.25/3.0 = 0.75$. The wavelength shortens on entering water.',
      },
      {
        title: 'Geometry of the Huygens construction',
        detail: 'Let $\\Delta t$ be the time for the wavefront to cross the interface. In air it covers the hypotenuse $v_1\\Delta t$, so the incidence angle satisfies $\\sin\\theta_1 = v_1\\Delta t / AB$; in water $\\sin\\theta_2 = v_2\\Delta t / AB$. Dividing the two gives $\\dfrac{\\sin\\theta_1}{\\sin\\theta_2} = \\dfrac{v_1}{v_2}$.',
      },
      {
        title: 'Numerical substitution and the law of refraction',
        detail: '$\\dfrac{\\sin\\theta_2}{\\sin\\theta_1} = \\dfrac{v_2}{v_1} = 0.75$, so $\\sin\\theta_2 = 0.75\\sin30^{\\circ} = 0.375$ and $\\theta_2 \\approx 22.0^{\\circ}$. Since $n = c/v$, the relation above is exactly $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$, Snell law of refraction.',
      },
    ],
    answer: 'Refraction angle $\\theta_2 \\approx 22.0^{\\circ}$, and Huygens principle yields $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$.',
    tags: ['Huygens principle', 'Law of refraction', 'Wave speed and wavelength'],
  },
  'optics-p3': {
    title: 'Fringe Positions and Spacing in Young Double-Slit Experiment',
    question: 'In a Young double-slit experiment the slit separation is $d = 0.20\\ \\text{mm}$, the distance from the slits to the screen is $D = 1.0\\ \\text{m}$, and the wavelength is $\\lambda = 589\\ \\text{nm}$ (sodium yellow light). Find: (1) the distance $x_3$ from the third-order bright fringe to the central bright fringe; (2) the spacing $\\Delta x$ between adjacent bright fringes.',
    hints: [
      'In the paraxial approximation the fringe position is $x_k \\approx k\\lambda D/d$ (bright-fringe condition $d\\sin\\theta = k\\lambda$).',
      'The spacing between adjacent bright fringes is independent of the order $k$: $\\Delta x = \\lambda D/d$.',
      'Watch the units: $1\\ \\text{mm} = 10^{-3}\\ \\text{m}$, $1\\ \\text{nm} = 10^{-9}\\ \\text{m}$.',
    ],
    solution: [
      {
        title: 'Position of the third-order bright fringe',
        detail: 'The bright-fringe condition is $x_k = k\\lambda D/d$. Substituting $k=3$: $\\lambda D/d = 589\\times10^{-9}\\times1.0 / (0.20\\times10^{-3}) = 2.945\\times10^{-3}\\ \\text{m}$. Hence $x_3 = 3 \\times 2.945\\ \\text{mm} \\approx 8.84\\ \\text{mm}$.',
      },
      {
        title: 'Fringe spacing',
        detail: 'The spacing between adjacent bright fringes is $\\Delta x = \\lambda D/d = 2.945\\times10^{-3}\\ \\text{m} \\approx 2.95\\ \\text{mm}$, independent of the order; the fringes are equally spaced.',
      },
      {
        title: 'Physical meaning',
        detail: 'The spacing is proportional to $\\lambda$ and $D$ and inversely proportional to $d$. With white light the central fringe is white and coloured spectra appear on either side because $\\Delta x$ varies with $\\lambda$ — the basis of interference spectroscopy.',
      },
    ],
    answer: '$x_3 \\approx 8.84\\ \\text{mm}$; adjacent bright fringes are spaced $\\Delta x \\approx 2.95\\ \\text{mm}$ apart.',
    tags: ['Young double slit', 'Optical path difference', 'Interference fringes'],
  },
  'optics-p4': {
    title: 'Visible Diffraction Orders and First-Order Angle of a Grating',
    question: 'A plane transmission grating has $500$ lines per millimetre. Monochromatic parallel light of wavelength $\\lambda = 589.3\\ \\text{nm}$ falls normally on it. Find: (1) the grating constant $d$; (2) the highest diffraction order $k_{\\max}$ that can in principle be observed; (3) the diffraction angle $\\theta_1$ of the first-order principal maximum.',
    hints: [
      'The grating constant is $d = 1/(500\\ \\text{lines/mm}) = 2.0\\ \\mu\\text{m}$.',
      'The grating equation $d\\sin\\theta = k\\lambda$ requires $|\\sin\\theta|\\le 1$, hence $|k| \\le d/\\lambda$.',
      'The first-order angle is $\\theta_1 = \\arcsin(\\lambda/d)$.',
    ],
    solution: [
      {
        title: 'Grating constant',
        detail: 'With $500$ lines per millimetre, $d = 1/(500\\ \\text{mm}^{-1}) = 2.0\\times10^{-3}\\ \\text{mm} = 2.0\\ \\mu\\text{m} = 2.0\\times10^{-6}\\ \\text{m}$.',
      },
      {
        title: 'Highest visible order',
        detail: 'From $|k| \\le d/\\lambda = 2.0\\times10^{-6} / (589.3\\times10^{-9}) \\approx 3.39$. Since $k$ is an integer, the largest $|k| = 3$. Counting both sides and the centre, $2\\times3 + 1 = 7$ principal maxima are visible (orders $0,\\pm1,\\pm2,\\pm3$).',
      },
      {
        title: 'First-order diffraction angle',
        detail: '$\\sin\\theta_1 = \\lambda/d = 589.3\\times10^{-9}/(2.0\\times10^{-6}) = 0.29465$, hence $\\theta_1 = \\arcsin(0.29465) \\approx 17.1^{\\circ}$.',
      },
    ],
    answer: '$d = 2.0\\ \\mu\\text{m}$; highest visible order $k_{\\max}=3$ (7 principal maxima in total); $\\theta_1 \\approx 17.1^{\\circ}$.',
    tags: ['Grating equation', 'Diffraction order', 'Dispersion'],
  },
  'optics-p5': {
    title: 'Malus Law and the Brewster Angle',
    question: 'Unpolarised light of intensity $I_0$ passes through two ideal polarisers $P_1$ and $P_2$ whose transmission axes make an angle $\\theta = 60^{\\circ}$. (1) Find the final transmitted intensity. (2) If light travels from air into glass ($n = 1.50$), find the Brewster angle $\\theta_B$ and describe the polarisation of the reflected light.',
    hints: [
      'After the first polariser the intensity of natural light is halved: $I_1 = I_0/2$, and the light becomes linearly polarised.',
      'Malus law: $I_2 = I_1\\cos^2\\theta$.',
      'The Brewster angle satisfies $\\tan\\theta_B = n_2/n_1$; at this angle the reflected light is completely linearly polarised (vibrating perpendicular to the plane of incidence).',
    ],
    solution: [
      {
        title: 'Transmitted intensity from Malus law',
        detail: 'After $P_1$: $I_1 = I_0/2$. After $P_2$: $I_2 = I_1\\cos^2 60^{\\circ} = (I_0/2)\\times(1/2)^2 = I_0/8 = 0.125\\,I_0$.',
      },
      {
        title: 'Brewster angle',
        detail: '$\\tan\\theta_B = n = 1.50$, giving $\\theta_B = \\arctan 1.50 \\approx 56.3^{\\circ}$.',
      },
      {
        title: 'Polarisation of the reflected light',
        detail: 'At the Brewster angle the reflected light is completely linearly polarised, its electric vector vibrating perpendicular to the plane of incidence (that is, parallel to the interface); the refracted light is partially polarised. The reflected and refracted rays are mutually perpendicular.',
      },
    ],
    answer: 'Transmitted intensity $I_2 = I_0/8$; Brewster angle $\\theta_B \\approx 56.3^{\\circ}$, and the reflected light is completely linearly polarised perpendicular to the plane of incidence.',
    tags: ['Malus law', 'Brewster angle', 'Linear polarisation'],
  },
  'optics-p6': {
    title: 'Coherence Length Limited by the Monochromaticity of a Source',
    question: 'A source has central wavelength $\\lambda_0 = 600\\ \\text{nm}$ and a spectral width $\\Delta\\lambda = 0.06\\ \\text{nm}$ (full width at half maximum). Find: (1) the coherence length $L_c$ and coherence time $\\tau_c$; (2) with this source, what is the largest arm path difference in a Michelson interferometer for which clear fringes can still be seen?',
    hints: [
      'The coherence length is approximately $L_c \\approx \\lambda_0^2/\\Delta\\lambda$, and the coherence time is $\\tau_c = L_c/c$.',
      'The two beams interfere well only when their path difference is smaller than the coherence length.',
      'Note $\\Delta\\lambda \\ll \\lambda_0$, so the differential approximation $\\Delta\\nu/\\nu \\approx \\Delta\\lambda/\\lambda$ is valid.',
    ],
    solution: [
      {
        title: 'Coherence length',
        detail: '$L_c = \\lambda_0^2/\\Delta\\lambda = (600\\times10^{-9})^2 / (0.06\\times10^{-9}) = 3.6\\times10^{-13} / 6\\times10^{-11} = 6.0\\times10^{-3}\\ \\text{m} = 6.0\\ \\text{mm}$.',
      },
      {
        title: 'Coherence time',
        detail: '$\\tau_c = L_c/c = 6.0\\times10^{-3} / (3.0\\times10^8) = 2.0\\times10^{-11}\\ \\text{s} = 20\\ \\text{ps}$. This can also be checked from $\\tau_c \\approx 1/\\Delta\\nu$: $\\Delta\\nu = c\\,\\Delta\\lambda/\\lambda_0^2$ gives the same result.',
      },
      {
        title: 'Largest observable path difference',
        detail: 'Interference is visible only when the arm path difference satisfies $\\Delta L \\lesssim L_c$, so the maximum path difference is about $6.0\\ \\text{mm}$. Beyond this the fringes of different wavelengths shift apart, the contrast falls to zero and the interference disappears.',
      },
    ],
    answer: 'Coherence length $L_c = 6.0\\ \\text{mm}$, coherence time $\\tau_c = 20\\ \\text{ps}$; the largest observable path difference is about $6.0\\ \\text{mm}$.',
    tags: ['Coherence length', 'Temporal coherence', 'Monochromaticity'],
  },
};

export default map;
