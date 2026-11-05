import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-dg-1': {
    title: "Curvature and torsion of a circular helix",
    question:
      "Compute the curvature and torsion of the helix $\\vec{r}(t) = (a\\cos t,\\ a\\sin t,\\ bt)$ ($a, b > 0$).",
    hints: [
      "First reparametrize by arc length, or use the general-parameter formulas $\\kappa = \\frac{|\\vec{r}' \\times \\vec{r}''|}{|\\vec{r}'|^3}$.",
      "For the torsion, $\\tau = \\frac{(\\vec{r}',\\vec{r}'',\\vec{r}''')}{|\\vec{r}' \\times \\vec{r}''|^2}$.",
    ],
    solution: [
      {
        title: "Velocity and acceleration",
        detail:
          "$\\vec{r}' = (-a\\sin t,\\ a\\cos t,\\ b)$, $|\\vec{r}'| = \\sqrt{a^2+b^2}$ (constant, so the speed is uniform!). $\\vec{r}'' = (-a\\cos t,\\ -a\\sin t,\\ 0)$.",
      },
      {
        title: "Curvature",
        detail:
          "$\\vec{r}' \\times \\vec{r}'' = (ab\\sin t,\\ -ab\\cos t,\\ a^2)$, with modulus $a\\sqrt{a^2+b^2}$. $$\\kappa = \\frac{a\\sqrt{a^2+b^2}}{(a^2+b^2)^{3/2}} = \\frac{a}{a^2+b^2}$$",
      },
      {
        title: "Torsion",
        detail:
          "$\\vec{r}''' = (a\\sin t,\\ -a\\cos t,\\ 0)$. The mixed product is $(\\vec{r}',\\vec{r}'',\\vec{r}''') = ab^2$. $$\\tau = \\frac{ab^2}{a^2(a^2+b^2)} = \\frac{b}{a^2+b^2}$$",
      },
    ],
    answer: "$\\kappa = \\dfrac{a}{a^2+b^2}$, $\\tau = \\dfrac{b}{a^2+b^2}$ — both constant; curves of constant curvature and constant torsion are precisely helices.",
    tags: ["curvature", "torsion", "helix"],
  },
  'p-dg-2': {
    title: "The two fundamental forms of a sphere",
    question:
      "For the sphere $\\vec{r}(\\theta, \\varphi) = (R\\sin\\theta\\cos\\varphi,\\ R\\sin\\theta\\sin\\varphi,\\ R\\cos\\theta)$, compute the first and second fundamental forms and the Gaussian curvature.",
    hints: [
      "First compute $\\vec{r}_\\theta, \\vec{r}_\\varphi$ and the unit normal vector.",
      "The normal of a sphere is the radial unit vector, so dot products of second derivatives with the normal are easy to compute.",
    ],
    solution: [
      {
        title: "First fundamental form",
        detail:
          "$\\vec{r}_\\theta = (R\\cos\\theta\\cos\\varphi,\\ R\\cos\\theta\\sin\\varphi,\\ -R\\sin\\theta)$, $|\\vec{r}_\\theta| = R$; $\\vec{r}_\\varphi = (-R\\sin\\theta\\sin\\varphi,\\ R\\sin\\theta\\cos\\varphi,\\ 0)$, $|\\vec{r}_\\varphi| = R\\sin\\theta$; and $\\vec{r}_\\theta \\cdot \\vec{r}_\\varphi = 0$. Hence $$\\mathrm{I} = R^2\\,d\\theta^2 + R^2\\sin^2\\theta\\,d\\varphi^2$$",
      },
      {
        title: "Second fundamental form",
        detail:
          "The normal is $\\vec{n} = \\vec{r}/R$ (radial). Since $\\vec{r}_{\\theta\\theta} = -\\vec{r}$, we get $L = \\vec{r}_{\\theta\\theta}\\cdot\\vec{n} = -R$; $M = 0$; $N = \\vec{r}_{\\varphi\\varphi}\\cdot\\vec{n} = -R\\sin^2\\theta$. $$\\mathrm{II} = -R\\,d\\theta^2 - R\\sin^2\\theta\\,d\\varphi^2$$",
      },
      {
        title: "Gaussian curvature",
        detail:
          "$$K = \\frac{LN - M^2}{EG - F^2} = \\frac{R^2\\sin^2\\theta}{R^4\\sin^2\\theta} = \\frac{1}{R^2}$$ A sphere of radius $R$ has Gaussian curvature identically $\\frac{1}{R^2}$ — it bends isotropically, the same at every point.",
      },
    ],
    answer: "$\\mathrm{I} = R^2 d\\theta^2 + R^2\\sin^2\\theta\\,d\\varphi^2$; $\\mathrm{II} = -R\\,d\\theta^2 - R\\sin^2\\theta\\,d\\varphi^2$; $K = \\frac{1}{R^2}$.",
    tags: ["first fundamental form", "second fundamental form", "Gaussian curvature"],
  },
  'p-dg-3': {
    title: "The Gauss–Bonnet theorem on the sphere",
    question:
      "Use the Gauss–Bonnet theorem to explain what determines the difference between $\\pi$ and the angle sum of a “great-circle triangle” on the sphere (all three sides are great-circle arcs).",
    hints: [
      "The Gaussian curvature of the sphere is $K = 1/R^2$.",
      "Local Gauss–Bonnet: $\\iint K\\,dA = (\\alpha+\\beta+\\gamma) - \\pi$, where the left-hand side is just the area times $K$.",
    ],
    solution: [
      {
        title: "Apply the theorem",
        detail:
          "On the sphere $K = \\frac{1}{R^2}$ is constant, so $\\displaystyle\\iint_D K\\,dA = \\frac{\\text{area}(D)}{R^2}$. Hence $$\\frac{\\text{area}(D)}{R^2} = \\alpha + \\beta + \\gamma - \\pi$$",
      },
      {
        title: "Interpretation",
        detail:
          "The amount by which the angle sum exceeds $\\pi$ (called the **spherical excess**) is proportional to the area of the triangle: $\\alpha+\\beta+\\gamma-\\pi = \\dfrac{\\text{area}}{R^2}$. A triangle cut out by three meridians on a northern latitude circle (the equator plus two meridians) can reach an angle sum of $\\frac{3\\pi}{2}$.",
      },
      {
        title: "Global check",
        detail:
          "Tile the whole sphere with 4 “one-eighth-of-a-sphere triangles” (angle sum $\\frac{3\\pi}{2}$): the total excess is $= 4 \\times \\frac{\\pi}{2} = 2\\pi$; while $\\iint K\\,dA = \\frac{4\\pi R^2}{R^2} = 4\\pi = 2\\pi\\,\\chi(S^2) = 2\\pi \\cdot 2$. Perfect agreement.",
      },
    ],
    answer: "Angle sum $- \\pi = \\dfrac{\\text{area of the triangle}}{R^2}$; globally $\\iint K\\,dA = 4\\pi = 2\\pi\\chi(S^2)$.",
    tags: ["Gauss-Bonnet", "spherical geometry", "intrinsic curvature"],
  },
};

export default map;
