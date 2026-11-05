import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'electrodynamics-p1': {
    title: "Method of images for a point charge outside a grounded conducting sphere",
    question:
      "A grounded conducting sphere of radius $a = 0.10\\ \\text{m}$ has a point charge $q = 3.0\\times10^{-8}\\ \\text{C}$ outside it at a distance $d = 0.30\\ \\text{m}$ from the center. Find: (1) the charge and position of the image charge; (2) the potential at $r = 0.20\\ \\text{m}$ from the center on the line joining the sphere and the charge (between the surface and the charge); (3) the magnitude of the force exerted by the conducting sphere on the point charge. Take $\\dfrac{1}{4\\pi\\varepsilon_0} = 8.99\\times10^9\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$.",
    hints: [
      "The boundary condition on a grounded conducting sphere is $\\varphi = 0$ everywhere on the surface, so the image charge must be placed inside the sphere.",
      "Spherical image formulas: $q' = -\\dfrac{a}{d}q$, with the image charge at $b = \\dfrac{a^2}{d}$ from the center.",
      "The potential in the region is the superposition of the Coulomb potentials of the real and image charges; the force can be computed as the Coulomb force of the image charge on $q$.",
    ],
    solution: [
      {
        title: "Determine the image charge",
        detail: "By the spherical image formulas, $q' = -\\dfrac{a}{d}q = -\\dfrac{0.10}{0.30}\\times3.0\\times10^{-8} = -1.0\\times10^{-8}\\ \\text{C}$; its position is $b = \\dfrac{a^2}{d} = \\dfrac{0.01}{0.30} \\approx 0.0333\\ \\text{m}$ from the center, on the line joining the center and $q$, inside the sphere. Check: for any point of the surface the distances to $q$ and $q'$ are in the constant ratio $d/a = 3$, so on the surface $\\dfrac{q}{R} + \\dfrac{q'}{R/3} = 0$, i.e. $\\varphi = 0$, and the boundary condition is satisfied. The total induced charge on the sphere equals the image charge $-1.0\\times10^{-8}\\ \\text{C}$.",
      },
      {
        title: "Superposition for the potential",
        detail: "The field point is at distance $d - r = 0.10\\ \\text{m}$ from the real charge and $r - b = 0.20 - 0.0333 \\approx 0.1667\\ \\text{m}$ from the image charge. Superposing: $\\varphi = \\dfrac{1}{4\\pi\\varepsilon_0}\\left(\\dfrac{q}{d-r} + \\dfrac{q'}{r-b}\\right) = 8.99\\times10^9\\times\\left(\\dfrac{3.0\\times10^{-8}}{0.10} - \\dfrac{1.0\\times10^{-8}}{0.1667}\\right) = 8.99\\times10^9\\times(3.00\\times10^{-7} - 6.00\\times10^{-8})\\ \\text{V}$, that is $\\varphi \\approx 2.16\\times10^3\\ \\text{V}$.",
      },
      {
        title: "Force from the image charge",
        detail: "The uniqueness theorem in the region guarantees that the Coulomb force of the image charge on $q$ is the true force exerted by the induced charge of the sphere on $q$. $F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{|q q'|}{(d-b)^2} = 8.99\\times10^9\\times\\dfrac{3.0\\times10^{-16}}{(0.30 - 0.0333)^2} = \\dfrac{8.99\\times10^9\\times3.0\\times10^{-16}}{0.0711} \\approx 3.8\\times10^{-5}\\ \\text{N}$, directed toward the center (attractive).",
      },
    ],
    answer: "Image charge $q' = -1.0\\times10^{-8}\\ \\text{C}$ at $0.033\\ \\text{m}$ from the center; potential at $r = 0.20\\ \\text{m}$ about $2.16\\times10^3\\ \\text{V}$; force on the point charge about $3.8\\times10^{-5}\\ \\text{N}$, directed toward the center.",
    tags: ["method of images", "uniqueness theorem", "electrostatic boundary-value problem"],
  },
  'electrodynamics-p2': {
    title: "Cutoff frequencies and guide wavelength of a rectangular waveguide",
    question: "A rectangular waveguide has cross-section width $a = 7.2\\ \\text{cm}$ and height $b = 3.4\\ \\text{cm}$, with vacuum inside. (1) Find the cutoff frequencies of the TE$_{10}$, TE$_{20}$ and TE$_{01}$ modes; (2) if the operating frequency is $f = 3.0\\ \\text{GHz}$, which modes can propagate? (3) For the TE$_{10}$ mode, find the guide wavelength $\\lambda_g$. Take $c = 3.0\\times10^8\\ \\text{m/s}$.",
    hints: [
      "Cutoff frequency of a rectangular waveguide: $f_{c,mn} = \\dfrac{c}{2}\\sqrt{\\left(\\dfrac{m}{a}\\right)^2 + \\left(\\dfrac{n}{b}\\right)^2}$.",
      "Only modes with $f > f_{c,mn}$ can propagate; below cutoff the field decays exponentially along the axis.",
      "Guide wavelength $\\lambda_g = \\dfrac{\\lambda_0}{\\sqrt{1 - (\\lambda_0/\\lambda_c)^2}}$, where $\\lambda_0 = c/f$ and $\\lambda_c = c/f_c$.",
    ],
    solution: [
      {
        title: "Compute the cutoff frequency of each mode",
        detail: "TE$_{10}$: $f_c = \\dfrac{c}{2a} = \\dfrac{3.0\\times10^8}{2\\times0.072} \\approx 2.08\\ \\text{GHz}$. TE$_{20}$: $f_c = \\dfrac{c}{a} \\approx 4.17\\ \\text{GHz}$. TE$_{01}$: $f_c = \\dfrac{c}{2b} = \\dfrac{3.0\\times10^8}{0.068} \\approx 4.41\\ \\text{GHz}$.",
      },
      {
        title: "Decide which modes propagate",
        detail: "Operating frequency $f = 3.0\\ \\text{GHz}$. Comparing: $3.0 > 2.08$ (TE$_{10}$ propagates); $3.0 < 4.17$ (TE$_{20}$ cutoff); $3.0 < 4.41$ (TE$_{01}$ cutoff). So only the dominant TE$_{10}$ mode propagates and the guide works single-mode — exactly why the dimensions are chosen so that the band falls between the TE$_{10}$ cutoff and the cutoff of the next higher mode.",
      },
      {
        title: "Compute the guide wavelength",
        detail: "Free-space wavelength $\\lambda_0 = c/f = \\dfrac{3.0\\times10^8}{3.0\\times10^9} = 0.10\\ \\text{m} = 10\\ \\text{cm}$; the TE$_{10}$ cutoff wavelength is $\\lambda_c = 2a = 14.4\\ \\text{cm}$. $\\lambda_g = \\dfrac{10}{\\sqrt{1 - (10/14.4)^2}} = \\dfrac{10}{\\sqrt{1 - 0.482}} = \\dfrac{10}{0.720} \\approx 13.9\\ \\text{cm}$. The phase velocity in the guide is $v_p = f\\lambda_g \\approx 4.2\\times10^8\\ \\text{m/s} > c$ and the group velocity $v_g = c^2/v_p \\approx 2.2\\times10^8\\ \\text{m/s} < c$, and their product is $c^2$.",
      },
    ],
    answer: "Cutoff frequencies: TE$_{10}$ about $2.08\\ \\text{GHz}$, TE$_{20}$ about $4.17\\ \\text{GHz}$, TE$_{01}$ about $4.41\\ \\text{GHz}$; at $f = 3.0\\ \\text{GHz}$ only TE$_{10}$ propagates; the TE$_{10}$ guide wavelength is $\\lambda_g \\approx 13.9\\ \\text{cm}$.",
    tags: ["waveguide", "cutoff frequency", "dispersion"],
  },
  'electrodynamics-p3': {
    title: "Reflection of a plane wave at a dielectric interface and the Brewster angle",
    question: "A beam of natural light travels from air ($n_1 = 1.0$) into glass ($n_2 = 1.5$) at an incidence angle $\\theta_i = 45^\\circ$. (1) Use the Fresnel formulas to find the amplitude reflection coefficients and the energy reflectances of the $s$ and $p$ components; (2) estimate the total energy reflectance of natural light; (3) find the Brewster angle $\\theta_B$ and describe the polarization state of the reflected light there.",
    hints: [
      "First use Snell law $n_1\\sin\\theta_i = n_2\\sin\\theta_t$ to find the refraction angle.",
      "Fresnel formulas: $r_s = \\dfrac{n_1\\cos\\theta_i - n_2\\cos\\theta_t}{n_1\\cos\\theta_i + n_2\\cos\\theta_t}$, $r_p = \\dfrac{n_2\\cos\\theta_i - n_1\\cos\\theta_t}{n_2\\cos\\theta_i + n_1\\cos\\theta_t}$; the energy reflectance is $R = |r|^2$.",
      "The Brewster angle satisfies $\\tan\\theta_B = n_2/n_1$, and there the $p$ component has zero reflection.",
    ],
    solution: [
      {
        title: "Find the refraction angle",
        detail: "$\\sin\\theta_t = \\dfrac{n_1}{n_2}\\sin\\theta_i = \\dfrac{\\sin 45^\\circ}{1.5} = \\dfrac{0.7071}{1.5} = 0.4714$, so $\\theta_t \\approx 28.1^\\circ$, $\\cos\\theta_t \\approx 0.882$ and $\\cos\\theta_i \\approx 0.707$.",
      },
      {
        title: "Insert into the Fresnel formulas",
        detail: "$s$ component: $r_s = \\dfrac{1.0\\times0.707 - 1.5\\times0.882}{1.0\\times0.707 + 1.5\\times0.882} = \\dfrac{0.707 - 1.323}{0.707 + 1.323} = \\dfrac{-0.616}{2.030} \\approx -0.303$; the minus sign means the electric field is reversed on reflection (half-wave loss), and $R_s = |r_s|^2 \\approx 0.092$. $p$ component: $r_p = \\dfrac{1.5\\times0.707 - 1.0\\times0.882}{1.5\\times0.707 + 1.0\\times0.882} = \\dfrac{1.061 - 0.882}{1.061 + 0.882} = \\dfrac{0.179}{1.943} \\approx 0.092$, $R_p \\approx 0.0085$.",
      },
      {
        title: "Total reflectance of natural light and the Brewster angle",
        detail: "The two orthogonal components of natural light carry equal energy, so $R = \\dfrac{R_s + R_p}{2} = \\dfrac{0.092 + 0.0085}{2} \\approx 0.050$, i.e. about $5\\%$ of the energy is reflected. Brewster angle: $\\tan\\theta_B = \\dfrac{n_2}{n_1} = 1.5$, $\\theta_B = \\arctan 1.5 \\approx 56.3^\\circ$. There the reflected and refracted rays are mutually perpendicular ($\\theta_B + \\theta_t = 90^\\circ$), $r_p = 0$, and the reflected light is purely $s$-polarized linear polarization (electric field perpendicular to the plane of incidence).",
      },
    ],
    answer: "$r_s \\approx -0.303$ ($R_s \\approx 9.2\\%$), $r_p \\approx 0.092$ ($R_p \\approx 0.85\\%$); the total reflectance of natural light is about $5\\%$; the Brewster angle is $\\theta_B \\approx 56.3^\\circ$, where the reflected light is purely $s$-polarized linear polarization.",
    tags: ["Fresnel formulas", "Brewster angle", "polarization", "reflection and refraction"],
  },
  'electrodynamics-p4': {
    title: "Radiated power and radiation resistance of a short antenna",
    question: "A short antenna can be modelled as an electric dipole: length $l = 1.0\\ \\text{m}$, feed current $I(t) = I_0\\cos\\omega t$ with $I_0 = 10\\ \\text{A}$ and frequency $f = 1.0\\ \\text{MHz}$. Find: (1) the amplitude $p_0$ of the equivalent electric dipole moment of the antenna; (2) the average radiated power $P$; (3) the radiation resistance $R_r = 2P/I_0^2$, and compare it with the formula $R_r = 80\\pi^2(l/\\lambda)^2$. Take $c = 3.0\\times10^8\\ \\text{m/s}$, $\\varepsilon_0 = 8.85\\times10^{-12}\\ \\text{F/m}$.",
    hints: [
      "Current is flowing charge, so the equivalent dipole moment satisfies $I_0 l = \\omega p_0$, i.e. $p_0 = I_0 l/\\omega$.",
      "Average dipole radiated power $P = \\dfrac{\\omega^4 p_0^2}{12\\pi\\varepsilon_0 c^3}$.",
      "The radiation resistance converts radiated power into an equivalent resistance, $R_r = 2P/I_0^2$; $\\lambda = c/f$.",
    ],
    solution: [
      {
        title: "Find the equivalent dipole moment",
        detail: "Angular frequency $\\omega = 2\\pi f = 2\\pi\\times10^6 \\approx 6.28\\times10^6\\ \\text{rad/s}$. From $I_0 l = \\omega p_0$ we get $p_0 = \\dfrac{I_0 l}{\\omega} = \\dfrac{10\\times1.0}{6.28\\times10^6} \\approx 1.59\\times10^{-6}\\ \\text{C}\\cdot\\text{m}$.",
      },
      {
        title: "Compute the radiated power",
        detail: "$P = \\dfrac{\\omega^4 p_0^2}{12\\pi\\varepsilon_0 c^3}$. $\\omega^4 = (6.28\\times10^6)^4 \\approx 1.55\\times10^{27}\\ \\text{s}^{-4}$; $p_0^2 = 2.54\\times10^{-12}$; $\\varepsilon_0 c^3 = 8.85\\times10^{-12}\\times2.7\\times10^{25} \\approx 2.39\\times10^{14}$. $P = \\dfrac{1.55\\times10^{27}\\times2.54\\times10^{-12}}{12\\pi\\times2.39\\times10^{14}} = \\dfrac{3.95\\times10^{15}}{9.0\\times10^{15}} \\approx 0.44\\ \\text{W}$.",
      },
      {
        title: "Radiation resistance and cross-check",
        detail: "$R_r = \\dfrac{2P}{I_0^2} = \\dfrac{2\\times0.44}{100} \\approx 8.8\\times10^{-3}\\ \\Omega$. Checking with the engineering formula: $\\lambda = c/f = 300\\ \\text{m}$, $R_r = 80\\pi^2(l/\\lambda)^2 = 80\\times9.87\\times(1/300)^2 \\approx 789.6/9.0\\times10^4 \\approx 8.8\\times10^{-3}\\ \\Omega$, in agreement with the other method. The extremely small radiation resistance shows that a short antenna ($l\\ll\\lambda$) radiates very inefficiently.",
      },
    ],
    answer: "Equivalent dipole moment $p_0 \\approx 1.6\\times10^{-6}\\ \\text{C}\\cdot\\text{m}$; average radiated power $P \\approx 0.44\\ \\text{W}$; radiation resistance $R_r \\approx 8.8\\times10^{-3}\\ \\Omega$, consistent with the $80\\pi^2(l/\\lambda)^2$ formula.",
    tags: ["dipole radiation", "radiated power", "antenna"],
  },
  'electrodynamics-p5': {
    title: "Electric and magnetic fields under a boost from a purely magnetic frame",
    question: "In the laboratory frame $S$ there is a uniform magnetic field $\\vec B = B_0\\hat z$ ($B_0 = 0.10\\ \\text{T}$) and $\\vec E = 0$. Another inertial frame $S'$ moves with velocity $\\vec v = 0.6c\\,\\hat x$ relative to $S$. (1) Find the electric field $\\vec E'$ and magnetic field $\\vec B'$ in $S'$; (2) verify the covariance of the result with the Lorentz invariants; (3) describe how a charged particle at rest in $S'$ will move.",
    hints: [
      "Field transformation: components parallel to $\\vec v$ are unchanged; the perpendicular components are $\\vec E'_\\perp = \\gamma(\\vec E_\\perp + \\vec v\\times\\vec B)$ and $\\vec B'_\\perp = \\gamma(\\vec B_\\perp - \\vec v\\times\\vec E/c^2)$.",
      "Note that $\\vec v\\times\\vec B = v\\hat x\\times B_0\\hat z = -vB_0\\hat y$.",
      "The invariants $\\vec E\\cdot\\vec B$ and $E^2 - c^2B^2$ must be equal in the two frames.",
    ],
    solution: [
      {
        title: "Compute the field transformation",
        detail: "$\\gamma = \\dfrac{1}{\\sqrt{1 - 0.6^2}} = 1.25$. The original fields are entirely perpendicular to $\\vec v$ ($\\vec B$ along $z$, perpendicular to $\\hat x$; $\\vec E = 0$). The parallel components vanish; for the perpendicular ones: $\\vec E' = \\gamma(0 + \\vec v\\times\\vec B) = 1.25\\times(0.6c\\,\\hat x\\times0.10\\hat z) = -1.25\\times0.6\\times3.0\\times10^8\\times0.10\\,\\hat y$, i.e. $\\vec E' = -2.25\\times10^7\\ \\text{V/m}\\ \\hat y$; $\\vec B' = \\gamma(\\vec B - \\vec v\\times\\vec E/c^2) = 1.25\\times0.10\\hat z = 0.125\\ \\text{T}\\ \\hat z$.",
      },
      {
        title: "Verify with the invariants",
        detail: "Frame $S$: $\\vec E\\cdot\\vec B = 0$ and $E^2 - c^2B^2 = 0 - (3.0\\times10^8)^2\\times0.01 = -9.0\\times10^{14}\\ \\text{V}^2/\\text{m}^2$. Frame $S'$: $\\vec E'\\cdot\\vec B' = 0$ ($\\hat y$ is orthogonal to $\\hat z$); $E'^2 - c^2B'^2 = (2.25\\times10^7)^2 - (3.0\\times10^8)^2\\times0.125^2 = 5.06\\times10^{14} - 1.41\\times10^{15} = -9.0\\times10^{14}$. Both invariants agree frame by frame, so the transformation is self-consistent.",
      },
      {
        title: "Motion of the particle",
        detail: "A charged particle at rest in $S'$ feels only the electric force $\\vec F' = q\\vec E'$ and accelerates uniformly along $-\\hat y$ (for a positive charge). Viewed from $S$, the same motion is described by the magnetic Lorentz force: the particle starts from rest, so the magnetic force is initially zero, but once it acquires velocity the term $q\\vec v\\times\\vec B$ sets in — the two descriptions are fully equivalent through the Lorentz transformation, which is precisely the physical meaning of unifying the electromagnetic field into the tensor $F^{\\mu\\nu}$.",
      },
    ],
    answer: "$\\vec E' = -2.25\\times10^7\\ \\text{V/m}\\ \\hat y$, $\\vec B' = 0.125\\ \\text{T}\\ \\hat z$; the invariants $\\vec E\\cdot\\vec B = 0$ and $E^2 - c^2B^2 = -9.0\\times10^{14}\\ \\text{V}^2/\\text{m}^2$ agree in both frames; a positive charge at rest in $S'$ is accelerated along $-\\hat y$ by the electric field.",
    tags: ["electromagnetic field tensor", "field transformation", "Lorentz invariants", "relativity"],
  },
  'electrodynamics-p6': {
    title: "Displacement current and magnetic field between the plates of a charging capacitor",
    question: "In vacuum, a parallel-plate capacitor has circular plates of radius $R = 5.0\\ \\text{cm}$ and is charged with a constant current $I = 1.0\\ \\text{A}$ (the charge is distributed uniformly over the plates). Find: (1) the magnitude of the displacement current density between the plates; (2) the time rate of change of the electric field $\\partial E/\\partial t$ between the plates; (3) the magnetic flux density at $r = 2.5\\ \\text{cm}$ and $r = 7.5\\ \\text{cm}$ from the axis (normal to the plates). Take $\\mu_0 = 4\\pi\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$, $\\varepsilon_0 = 8.85\\times10^{-12}\\ \\text{F/m}$.",
    hints: [
      "The displacement current density is $j_D = \\partial D/\\partial t$; the electric displacement between the plates $D = \\sigma = It/(\\pi R^2)$ is uniform.",
      "Apply the Ampere circuital theorem to the total current (conduction plus displacement), $\\oint\\vec H\\cdot d\\vec l = I_{\\text{total}}$.",
      "Between the plates the radius $r = R$ is the dividing line: the displacement current is distributed uniformly over the circular cross-section of radius $R$, exactly analogous to the magnetic field of a uniform cylindrical current.",
    ],
    solution: [
      {
        title: "Displacement current density and field rate",
        detail: "The plate charge is $Q = It$, the surface charge density $\\sigma = \\dfrac{It}{\\pi R^2}$, and $D = \\sigma$. The displacement current density is $j_D = \\dfrac{\\partial D}{\\partial t} = \\dfrac{I}{\\pi R^2} = \\dfrac{1.0}{\\pi\\times0.05^2} \\approx 1.27\\times10^2\\ \\text{A/m}^2$, whose total surface integral $j_D\\pi R^2 = I$ equals the conduction current in the lead — the total current is continuous. With $D = \\varepsilon_0 E$, $\\dfrac{\\partial E}{\\partial t} = \\dfrac{j_D}{\\varepsilon_0} = \\dfrac{127}{8.85\\times10^{-12}} \\approx 1.4\\times10^{13}\\ \\text{V/(m}\\cdot\\text{s)}$.",
      },
      {
        title: "Field inside the plates (r < R)",
        detail: "Take a concentric circular loop of radius $r = 0.025\\ \\text{m}$; the enclosed displacement current is $I' = j_D\\pi r^2 = I\\dfrac{r^2}{R^2} = 1.0\\times\\dfrac{0.025^2}{0.05^2} = 0.25\\ \\text{A}$. By symmetry $B\\cdot2\\pi r = \\mu_0 I'$, giving $B = \\dfrac{\\mu_0 I r}{2\\pi R^2} = 2\\times10^{-7}\\times\\dfrac{1.0\\times0.025}{0.0025} = 2.0\\times10^{-6}\\ \\text{T}$.",
      },
      {
        title: "Field outside the plates (r > R)",
        detail: "Take a loop of radius $r = 0.075\\ \\text{m}$; it encloses the whole displacement current $I$, so $B = \\dfrac{\\mu_0 I}{2\\pi r} = \\dfrac{2\\times10^{-7}\\times1.0}{0.075} \\approx 2.7\\times10^{-6}\\ \\text{T}$. The lines of magnetic induction are concentric circles about the axis of symmetry and join smoothly with the field around the lead — it is the displacement current that continues the “broken” conduction current into a closed total current.",
      },
    ],
    answer: "$j_D \\approx 1.27\\times10^2\\ \\text{A/m}^2$; $\\partial E/\\partial t \\approx 1.4\\times10^{13}\\ \\text{V/(m}\\cdot\\text{s)}$; at $r = 2.5\\ \\text{cm}$ $B = 2.0\\times10^{-6}\\ \\text{T}$, at $r = 7.5\\ \\text{cm}$ $B \\approx 2.7\\times10^{-6}\\ \\text{T}$, both directed along concentric circles about the axis.",
    tags: ["displacement current", "Ampere-Maxwell law", "Maxwell equations"],
  },
};

export default map;
