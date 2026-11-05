import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-ca-1': {
    title: "Deciding analyticity with the C–R equations",
    question:
      "Discuss the analyticity of $f(z) = e^{z^2}$, and find $f'(z)$.",
    hints: [
      "Split $f$ into real and imaginary parts and verify the C–R equations.",
      "Or argue directly: a composite of analytic functions is analytic, and both $e^w$ and $z^2$ are analytic.",
    ],
    solution: [
      {
        title: "Composition argument",
        detail:
          "$g(z) = z^2$ is a polynomial analytic on the whole plane, and $h(w) = e^w$ is an entire function analytic on the whole plane. The composite $h(g(z))$ is analytic on $\\mathbb{C}$.",
      },
      {
        title: "Differentiation",
        detail:
          "The chain rule holds for complex analytic functions as well: $f'(z) = e^{z^2} \\cdot 2z = 2z\\,e^{z^2}$.",
      },
      {
        title: "Verification (optional)",
        detail:
          "Write $z = x+iy$, $z^2 = (x^2-y^2) + 2ixy$, so that $u = e^{x^2-y^2}\\cos 2xy$ and $v = e^{x^2-y^2}\\sin 2xy$. Computing the four partial derivatives directly confirms $u_x = v_y$ and $u_y = -v_x$, in agreement with the chain-rule result.",
      },
    ],
    answer: "$f(z) = e^{z^2}$ is analytic on $\\mathbb{C}$, and $f'(z) = 2z e^{z^2}$.",
    tags: ["C-R equations", "composite functions", "entire functions"],
  },
  'p-ca-2': {
    title: "Contour integral from the Cauchy integral formula",
    question:
      "Evaluate $\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z-1}\\,dz$.",
    hints: [
      "Where inside the circle does the integrand fail to be analytic? Where is the singularity?",
      "Treat the numerator as the analytic function $f(z) = e^z$ and apply the Cauchy integral formula directly.",
    ],
    solution: [
      {
        title: "Locate the singularity",
        detail:
          "The denominator vanishes at $z = 1$, which lies inside the circle $|z| = 2$; the numerator $e^z$ is analytic everywhere.",
      },
      {
        title: "Apply the formula",
        detail:
          "Cauchy integral formula: $\\displaystyle\\oint_C \\frac{f(z)}{z - z_0}\\,dz = 2\\pi i\\, f(z_0)$. Here $f(z) = e^z$ and $z_0 = 1$.",
      },
      {
        title: "Obtain the result",
        detail: "$\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z-1}\\,dz = 2\\pi i\\, e^{1} = 2\\pi e\\,i$.",
      },
    ],
    answer: "$2\\pi e\\,i$.",
    tags: ["Cauchy formula", "contour integral", "singularity"],
  },
  'p-ca-3': {
    title: "Real integral via the residue theorem",
    question:
      "Evaluate $\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{dx}{(x^2+1)^2}$.",
    hints: [
      "View the real integral as part of a large semicircular contour integral and look for the poles in the upper half-plane.",
      "The denominator factors as $(z^2+1)^2 = (z-i)^2(z+i)^2$; the upper half-plane contains only $z = i$, which is a pole of order two.",
      "For a pole of order two use the multiply-then-differentiate-once residue formula.",
    ],
    solution: [
      {
        title: "Contour and poles",
        detail:
          "Take the contour to be the real segment $[-R,R]$ plus the upper semicircle $C_R$. As $R \\to \\infty$ the integral over the arc tends to 0 (the integrand decays like $R^{-4}$). The only interior pole is $z = i$, of order 2.",
      },
      {
        title: "Compute the residue",
        detail:
          "$$\\operatorname{Res}(f, i) = \\lim_{z \\to i} \\frac{d}{dz}\\left[(z-i)^2 \\frac{1}{(z-i)^2(z+i)^2}\\right] = \\lim_{z \\to i} \\frac{d}{dz}(z+i)^{-2} = -2(z+i)^{-3}\\Big|_{z=i} = \\frac{1}{4i}$$",
      },
      {
        title: "Residue theorem",
        detail:
          "The integral equals $2\\pi i \\cdot \\operatorname{Res}(f, i) = 2\\pi i \\cdot \\dfrac{1}{4i} = \\dfrac{\\pi}{2}$.",
      },
    ],
    answer: "$\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{dx}{(x^2+1)^2} = \\frac{\\pi}{2}$.",
    tags: ["residue", "pole of order two", "real integral"],
  },
};

export default map;
