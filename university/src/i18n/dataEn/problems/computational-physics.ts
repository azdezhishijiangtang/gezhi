import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'computational-physics-p1': {
    title: "Condition number of a logarithm and the loss of significant digits",
    question:
      "Compute $f(x)=\\ln x$ at $x=1.0001$ in double precision. If the input $x$ itself carries a relative error of $10^{-6}$ (for instance from an earlier measurement), estimate an upper bound on the relative error of the output, and judge how many significant digits the result loses.",
    hints: [
      "The relative condition number is $\\kappa=\\left|\\dfrac{xf^\\prime(x)}{f(x)}\\right|$; compute $\\kappa$ first, then multiply by the input relative error.",
      "$\\ln(1+t)\\approx t-\\dfrac{t^2}{2}$; use it to estimate the size of $\\ln(1.0001)$.",
      "The relation between significant digits and the relative error bound: $\\varepsilon_r\\approx\\dfrac{1}{2a_1}10^{1-n}$, and the number of lost digits is about $\\log_{10}\\kappa$.",
    ],
    solution: [
      {
        title: "Find the condition number",
        detail:
          "For $f(x)=\\ln x$ we have $f^\\prime(x)=\\dfrac1x$, so the relative condition number is $$\\kappa=\\left|\\frac{x\\cdot(1/x)}{\\ln x}\\right|=\\frac{1}{|\\ln x|}$$ a function that blows up as $x\\to1$ — precisely the danger here.",
      },
      {
        title: "Insert the numbers",
        detail:
          "From $\\ln(1+t)\\approx t-\\dfrac{t^2}{2}$ with $t=10^{-4}$ we get $$\\ln(1.0001)\\approx10^{-4}-\\tfrac12\\times10^{-8}=9.9995\\times10^{-5}$$ hence $$\\kappa\\approx\\frac{1}{9.9995\\times10^{-5}}\\approx1.0000\\times10^{4}$$",
      },
      {
        title: "Amplify the input error",
        detail:
          "The forward error is roughly the condition number times the backward error: $$\\varepsilon_r^{\\text{out}}\\lesssim\\kappa\\cdot\\varepsilon_r^{\\text{in}}\\approx10^{4}\\times10^{-6}=10^{-2}$$ that is, the relative error of the output is amplified ten-thousandfold, reaching the one-percent level.",
      },
      {
        title: "Lost digits and a remedy",
        detail:
          "The relative error degrades from $10^{-6}$ (about 6 significant digits) to $10^{-2}$ (about 2), a loss of about $\\log_{10}\\kappa=\\log_{10}10^{4}=4$ digits. Note that **the problem itself is ill-conditioned**; no change of algorithm can rescue it. But the formulation can be rewritten: if what is really wanted is $\\ln(1+t)$ for small $t$, call the function $\\mathrm{log1p}(t)$ directly — it uses a dedicated series expansion for small $t$, avoiding the low-order digits lost when forming $1+t$ and then taking the logarithm.",
      },
    ],
    answer:
      "$\\kappa\\approx10^{4}$; the relative error of the output is bounded by about $10^{-2}$, i.e. about 4 significant digits are lost (about 2 remain).",
    tags: ["condition number", "error amplification", "significant digits", "ill-conditioned problem"],
  },
  'computational-physics-p2': {
    title: "Two Newton steps for the root of a cubic",
    question:
      "Use Newton method to find the real root of $x^{3}-2x-5=0$ in $[2,3]$, taking the initial value $x_{0}=2$ and performing two iterations (6 decimal places), and check the magnitude of the second-step error with the error formula for quadratic convergence.",
    hints: [
      "The Newton iteration is $x_{k+1}=x_k-\\dfrac{f(x_k)}{f^\\prime(x_k)}$, where $f^\\prime(x)=3x^2-2$.",
      "The true value is about $x^{*}=2.094551$, which can be used to estimate the actual errors $e_1,e_2$ of the two steps.",
      "Quadratic convergence $e_{k+1}\\approx Ce_k^2$, with $C=\\left|\\dfrac{f^{\\prime\\prime}(x^{*})}{2f^\\prime(x^{*})}\\right|$.",
    ],
    solution: [
      {
        title: "First step",
        detail:
          "$f(2)=8-4-5=-1$, $f^\\prime(2)=3\\times4-2=10$, so $$x_1=2-\\frac{-1}{10}=2.1$$ compared with the true value $x^{*}=2.094551$, the error is $e_1\\approx5.449\\times10^{-3}$.",
      },
      {
        title: "Second step",
        detail:
          "At $x_1=2.1$: $f(2.1)=9.261-4.2-5=0.061$, $f^\\prime(2.1)=3\\times4.41-2=11.23$, so $$x_2=2.1-\\frac{0.061}{11.23}=2.1-5.432\\times10^{-3}=2.094568$$ with error $e_2\\approx1.7\\times10^{-5}$ — one step reduced the error by about 300 times.",
      },
      {
        title: "Check with the quadratic-convergence formula",
        detail:
          "$f^{\\prime\\prime}(x)=6x$; taking $x^{*}\\approx2.0946$ and $f^\\prime(x^{*})\\approx11.16$ gives $$C=\\left|\\frac{f^{\\prime\\prime}(x^{*})}{2f^\\prime(x^{*})}\\right|=\\frac{6\\times2.0946}{2\\times11.16}\\approx0.563$$ which predicts $e_2\\approx Ce_1^2=0.563\\times(5.449\\times10^{-3})^2\\approx1.67\\times10^{-5}$, matching the actual error $1.7\\times10^{-5}$ and confirming quadratic convergence $e_{k+1}\\approx Ce_k^2$.",
      },
      {
        title: "On the stopping criterion",
        detail:
          "A practical program should monitor both $\\dfrac{|x_{k+1}-x_k|}{\\max(|x_{k+1}|,1)}$ and $|f(x_k)|$. Here a third step already pushes the error down to the $10^{-10}$ level; once the error approaches $|f|\\approx u\\cdot|f^\\prime|\\cdot|x|\\sim10^{-15}$ one should stop, since iterating further only amplifies rounding noise.",
      },
    ],
    answer:
      "$x_1=2.1$, $x_2\\approx2.094568$; the true value is $x^{*}=2.094551$, and the error drops from $5.4\\times10^{-3}$ to $1.7\\times10^{-5}$, consistent with quadratic convergence $e_2\\approx Ce_1^2$ ($C\\approx0.56$).",
    tags: ["Newton method", "iterative method", "order of convergence", "error estimate"],
  },
  'computational-physics-p3': {
    title: "Sine integral with the trapezoidal and Simpson rules",
    question:
      "Use the composite trapezoidal rule ($n=2$ subintervals) and the composite Simpson rule to compute $I=\\displaystyle\\int_0^{\\pi/2}\\sin x\\,dx$ (true value 1) and compare their errors; then halve the grid ($n=4$) and check whether the errors decrease at the theoretical order.",
    hints: [
      "Take $h=\\dfrac{\\pi}{4}\\approx0.785398$; the three nodal values are $\\sin0=0$, $\\sin\\dfrac{\\pi}{4}=0.707107$, $\\sin\\dfrac{\\pi}{2}=1$.",
      "Composite trapezoid $T=\\dfrac h2(f_0+2f_1+f_2)$; composite Simpson $S=\\dfrac h3(f_0+4f_1+f_2)$.",
      "Trapezoid error $O(h^2)$, Simpson error $O(h^4)$: after halving the grid the errors should shrink by about 4 and 16 times respectively.",
    ],
    solution: [
      {
        title: "Composite trapezoid ($n=2$)",
        detail:
          "$$T_2=\\frac{0.785398}{2}\\left[0+2\\times0.707107+1\\right]=0.392699\\times2.414214=0.948059$$ error $E_T=0.948059-1=-5.194\\times10^{-2}$. Straight lines approximating a curved sine leave a sizeable error.",
      },
      {
        title: "Composite Simpson ($n=2$)",
        detail:
          "$$S_2=\\frac{0.785398}{3}\\left[0+4\\times0.707107+1\\right]=0.261799\\times3.828427=1.002280$$ error $E_S=+2.280\\times10^{-3}$. Using the same three function values, the error is about $\\dfrac{5.194\\times10^{-2}}{2.280\\times10^{-3}}\\approx22.8$ times smaller — the power of parabolic approximation.",
      },
      {
        title: "Halve the grid and check the order",
        detail:
          "With $h=\\dfrac{\\pi}{8}$, $n=4$, the nodal values are $0,\\;0.382683,\\;0.707107,\\;0.923880,\\;1$. Composite trapezoid $$T_4=\\frac{0.392699}{2}\\left[0+2(0.382683+0.707107+0.923880)+1\\right]=0.987116$$ error $-1.288\\times10^{-2}$, whose ratio to the $T_2$ error is $\\dfrac{5.194}{1.288}\\approx4.03\\approx2^2$, confirming that the trapezoidal rule is second order. Composite Simpson $$S_4=\\frac{0.392699}{3}\\left[0+4(0.382683+0.923880)+2\\times0.707107+1\\right]=1.000135$$ error $+1.35\\times10^{-4}$, whose ratio to the $S_2$ error is $\\dfrac{2.280\\times10^{-3}}{1.35\\times10^{-4}}\\approx16.9\\approx2^4$, confirming that Simpson is fourth order.",
      },
      {
        title: "Richardson extrapolation",
        detail:
          "Combining the two trapezoidal results: $$\\frac{4T_4-T_2}{3}=\\frac{4\\times0.987116-0.948059}{3}=\\frac{3.000405}{3}=1.000135$$ which coincides exactly with the directly computed $S_4$. This shows that composite Simpson is just one Richardson extrapolation of the composite trapezoid, the basic step of Romberg integration.",
      },
    ],
    answer:
      "$T_2\\approx0.948059$ (error $-5.19\\times10^{-2}$); $S_2\\approx1.002280$ (error $+2.28\\times10^{-3}$). After halving the grid the trapezoid error falls to about 1/4 and the Simpson error to about 1/16, confirming $O(h^2)$ and $O(h^4)$ respectively; the extrapolation $\\dfrac{4T_4-T_2}{3}=1.000135$ equals $S_4$.",
    tags: ["composite trapezoid", "Simpson rule", "order of error", "Richardson extrapolation"],
  },
  'computational-physics-p4': {
    title: "RK4 for a damped oscillator and the stable step size",
    question:
      "A damped oscillator satisfies $\\ddot x+0.2\\dot x+4x=0$ with $x(0)=1$, $\\dot x(0)=0$. (1) Write it as a first-order system, take one step of the fourth-order Runge–Kutta method with $h=0.1$, and compare with the analytic solution; (2) find the upper bound on the stable step size of explicit Euler with these parameters, and say whether Euler can be used at $h=0.1$.",
    hints: [
      "Set $v=\\dot x$; the state vector $(x,v)$ satisfies $\\dot x=v$, $\\dot v=-0.2v-4x$, and the four slopes $k_i$ are two-dimensional vectors.",
      "For the analytic solution use $\\gamma=0.1$ and $\\omega_d=\\sqrt{\\omega_0^2-\\gamma^2}=\\sqrt{3.99}=1.997498$, i.e. $x(t)=e^{-\\gamma t}\\left[\\cos\\omega_dt+\\dfrac{\\gamma}{\\omega_d}\\sin\\omega_dt\\right]$.",
      "The explicit Euler stability condition $|1+h\\lambda|\\le1$ with $\\lambda=-\\gamma\\pm i\\omega_d$; expand it and solve for the upper bound on $h$.",
    ],
    solution: [
      {
        title: "Reduce to a system",
        detail:
          "$$\\frac{d}{dt}\\begin{pmatrix}x\\\\v\\end{pmatrix}=\\begin{pmatrix}v\\\\-0.2v-4x\\end{pmatrix}$$ The eigenvalues of the coefficient matrix are $\\lambda_{\\pm}=-\\gamma\\pm i\\omega_d$ with $\\gamma=\\dfrac{0.2}{2}=0.1$, $\\omega_0=2$, $\\omega_d=\\sqrt{4-0.01}=1.997498$.",
      },
      {
        title: "One RK4 step ($h=0.1$)",
        detail:
          "The four slopes (each written as $(k^{(x)},k^{(v)})$): $$k_1=(0,\\ -4),\\quad k_2=(-0.2,\\ -3.96),\\quad k_3=(-0.198,\\ -3.9204),\\quad k_4=(-0.39204,\\ -3.842392)$$ Combined with weights $1:2:2:1$: $$x_1=1+\\frac{0.1}{6}\\left[0+2(-0.2)+2(-0.198)-0.39204\\right]=0.980199$$ $$v_1=0+\\frac{0.1}{6}\\left[-4+2(-3.96)+2(-3.9204)-3.842392\\right]=-0.393387$$",
      },
      {
        title: "Compare with the analytic solution",
        detail:
          "$$x(t)=e^{-0.1t}\\left[\\cos(1.997498\\,t)+0.050063\\sin(1.997498\\,t)\\right]$$ At $t=0.1$: $e^{-0.01}=0.990050$, $\\cos0.199750=0.980116$, $\\sin0.199750=0.198424$, the bracket equals $0.990051$, so $x(0.1)=0.980200$ and hence $v(0.1)=-0.393392$. The RK4 errors are about $2\\times10^{-7}$ and $5\\times10^{-6}$, of the same order as the theoretical estimate $\\sim\\dfrac{(h\\omega_d)^5}{120}\\approx2.7\\times10^{-6}$.",
      },
      {
        title: "Stable step size of explicit Euler",
        detail:
          "The amplification condition $|1+h\\lambda|\\le1$ expands to $$(1-\\gamma h)^2+(\\omega_dh)^2\\le1\\ \\Longrightarrow\\ (\\gamma^2+\\omega_d^2)h^2-2\\gamma h\\le0$$ that is $$h\\le\\frac{2\\gamma}{\\gamma^2+\\omega_d^2}=\\frac{2\\gamma}{\\omega_0^2}=\\frac{0.2}{4}=0.05$$ Here $h=0.1>0.05$, so **explicit Euler necessarily diverges**; the stability boundary of RK4 is about $h|\\lambda|\\le2.785$, and here $h|\\lambda|\\approx0.2$, far inside the safe region. Euler is limited by stability, RK4 only by accuracy.",
      },
    ],
    answer:
      "(1) $x(0.1)\\approx0.980199$, $\\dot x(0.1)\\approx-0.393387$, about $10^{-6}$ away from the analytic values $0.980200$ and $-0.393392$; (2) the explicit Euler stability limit is $h\\le\\dfrac{2\\gamma}{\\omega_0^2}=0.05$, so at $h=0.1$ Euler diverges and one must switch to RK4 or an implicit scheme.",
    tags: ["RK4", "damped oscillation", "stability", "state vector"],
  },
  'computational-physics-p5': {
    title: "CFL stability of the explicit scheme for the heat equation",
    question:
      "Use the explicit FTCS scheme to solve the one-dimensional heat equation $u_t=\\alpha u_{xx}$ with $\\alpha=1$ and $\\Delta x=0.05$. (1) Find the largest time step that guarantees stability; (2) if $\\Delta t=2\\times10^{-3}$, determine whether the scheme is stable and find the amplification factor of the highest-frequency (sawtooth) mode; (3) justify the same conclusion from the spectral radius of the amplification matrix.",
    hints: [
      "The FTCS recurrence is $u_j^{n+1}=u_j^{n}+r(u_{j+1}^{n}-2u_j^{n}+u_{j-1}^{n})$, where $r=\\dfrac{\\alpha\\Delta t}{\\Delta x^2}$.",
      "von Neumann analysis gives $\\xi=1-4r\\sin^2\\dfrac{k\\Delta x}{2}$; the most dangerous case is the sawtooth mode with $\\sin^2=1$.",
      "Writing $u^{n+1}=Gu^n$ gives $G=I+rT$ ($T$ being the tridiagonal second-difference matrix), and stability means the spectral radius $\\rho(G)\\le1$.",
    ],
    solution: [
      {
        title: "Write the scheme and the dimensionless parameter",
        detail:
          "Forward in time, centered in space: $$\\frac{u_j^{n+1}-u_j^n}{\\Delta t}=\\alpha\\frac{u_{j+1}^n-2u_j^n+u_{j-1}^n}{\\Delta x^2}$$ that is $u_j^{n+1}=u_j^n+r(u_{j+1}^n-2u_j^n+u_{j-1}^n)$ with $r=\\dfrac{\\alpha\\Delta t}{\\Delta x^2}=\\dfrac{\\Delta t}{0.0025}=400\\,\\Delta t$. The truncation error is $O(\\Delta t)+O(\\Delta x^2)$, so the scheme is consistent with the equation.",
      },
      {
        title: "von Neumann stability analysis",
        detail:
          "Substituting $\\varepsilon_j^n=\\xi^ne^{ikj\\Delta x}$: $$\\xi=1+r\\left(e^{ik\\Delta x}-2+e^{-ik\\Delta x}\\right)=1-4r\\sin^2\\frac{k\\Delta x}{2}$$ Stability requires $|\\xi|\\le1$ for every $k$. The most dangerous case is $\\sin^2=1$ (the sawtooth mode of wavelength $2\\Delta x$), where $\\xi=1-4r$, hence $$-1\\le1-4r\\le1\\ \\Longrightarrow\\ r\\le\\frac12$$",
      },
      {
        title: "Test the two step sizes of this problem",
        detail:
          "From $r=400\\Delta t\\le\\dfrac12$ we get $$\\Delta t_{\\max}=\\frac{\\Delta x^2}{2\\alpha}=\\frac{0.0025}{2}=1.25\\times10^{-3}$$ With $\\Delta t=2\\times10^{-3}$ we have $r=400\\times2\\times10^{-3}=0.8>0.5$, and the sawtooth amplification factor is $$\\xi=1-4\\times0.8=-2.2$$ with $|\\xi|=2.2>1$: this mode is amplified by 2.2 per step with alternating sign; after 20 steps the amplification is $2.2^{20}\\approx2.7\\times10^{6}$, and the numerical solution is immediately swallowed by sawtooth oscillation.",
      },
      {
        title: "Spectral-radius viewpoint (link to matrix eigenvalues)",
        detail:
          "Write the scheme as $u^{n+1}=Gu^n$ with $G=I+rT$, where $T$ is the tridiagonal matrix with $-2$ on the diagonal and $1$ on the off-diagonals. The eigenvalues of $T$ are $-4\\sin^2\\dfrac{k\\Delta x}{2}$, so those of $G$ are exactly the $\\xi(k)$ above, and $$\\rho(G)=\\max_k|\\xi(k)|=\\max\\{1,\\,|1-4r|\\}$$ For $r=0.8$, $\\rho(G)=2.2>1$, consistent with the mode-by-mode analysis. **The stability of a difference scheme is a matrix eigenvalue (spectral radius) problem**, which also explains why the power method can be used to estimate $\\rho(G)$ numerically and test complicated schemes. If $\\Delta t=2\\times10^{-3}$ is required, switch to an implicit scheme (BTCS or Crank–Nicolson), whose amplification factor satisfies $|\\xi|\\le1$ for any $r>0$.",
      },
    ],
    answer:
      "(1) The stability condition is $r=\\dfrac{\\alpha\\Delta t}{\\Delta x^2}\\le\\dfrac12$, hence $\\Delta t_{\\max}=1.25\\times10^{-3}$; (2) $\\Delta t=2\\times10^{-3}$ corresponds to $r=0.8$, the sawtooth amplification factor is $\\xi=-2.2$ with $|\\xi|=2.2>1$, so the scheme is unstable; (3) the spectral radius of the amplification matrix is $\\rho(G)=2.2>1$, again predicting divergence, so an implicit scheme should be used.",
    tags: ["FTCS", "CFL condition", "von Neumann stability", "spectral radius"],
  },
  'computational-physics-p6': {
    title: "Estimating pi by the Monte Carlo hit-or-miss method",
    question:
      "Draw $N$ points uniformly at random in the square $[-1,1]\\times[-1,1]$ and estimate $\\pi$ from the fraction lying inside the unit disk $x^2+y^2\\le1$. (1) Write down the estimator and prove that it is unbiased; (2) derive the expression for the standard error of the estimate as a function of $N$; (3) what is the standard error for $N=10^{4}$, and roughly how many samples are needed for the standard error to fall below $10^{-3}$?",
    hints: [
      "The square has area 4 and the unit disk area $\\pi$, so the hit probability is $p=\\dfrac{\\pi}{4}$ and $\\hat\\pi=4\\hat p$.",
      "Each point is a Bernoulli trial; the indicator has variance $p(1-p)$ and the sample mean has variance $\\dfrac{p(1-p)}{N}$.",
      "The standard error falls like $N^{-1/2}$: one more significant digit costs a hundredfold increase in sample size.",
    ],
    solution: [
      {
        title: "Set up the estimator",
        detail:
          "Let the indicator of the $i$-th point be $X_i=1$ (inside the disk) or $0$ (outside). Then $X_i$ follows a Bernoulli distribution with parameter $p=\\dfrac{\\pi}{4}$, so $\\mathbb{E}[X_i]=p$ and $\\mathrm{Var}(X_i)=p(1-p)$. Take $$\\hat\\pi_N=4\\cdot\\frac{1}{N}\\sum_{i=1}^{N}X_i=4\\hat p$$",
      },
      {
        title: "Unbiasedness",
        detail:
          "By linearity of expectation: $$\\mathbb{E}[\\hat\\pi_N]=4\\cdot\\frac1N\\sum_{i=1}^N\\mathbb{E}[X_i]=4p=\\pi$$ so the estimator is unbiased — on average it gives the right value, but a single realization deviates, which is why the variance matters.",
      },
      {
        title: "Variance and standard error",
        detail:
          "$$\\mathrm{Var}(\\hat\\pi_N)=16\\cdot\\frac{p(1-p)}{N},\\qquad \\sigma_{\\hat\\pi}=\\frac{4\\sqrt{p(1-p)}}{\\sqrt N}$$ Substituting $p=\\dfrac{\\pi}{4}\\approx0.785398$: $p(1-p)\\approx0.16853$ and $\\sqrt{p(1-p)}\\approx0.41052$, so $$\\sigma_{\\hat\\pi}\\approx\\frac{1.642}{\\sqrt N}$$ In practice $\\hat p$ replaces $p$ in the standard error, and one quotes the 95% confidence interval $\\hat\\pi\\pm1.96\\,\\sigma_{\\hat\\pi}$.",
      },
      {
        title: "Numerical result and its cost",
        detail:
          "For $N=10^{4}$: $\\sigma_{\\hat\\pi}\\approx\\dfrac{1.642}{100}=1.64\\times10^{-2}$, that is only about two significant digits. To make $\\sigma_{\\hat\\pi}<10^{-3}$ one needs $$\\sqrt N>\\frac{1.642}{10^{-3}}=1642\\ \\Longrightarrow\\ N>2.70\\times10^{6}$$ about 2.7 million samples. This is the price of $N^{-1/2}$ convergence: each extra significant digit (error reduced tenfold) costs a hundredfold more samples. Hence in practice Monte Carlo is paired with variance-reduction techniques such as importance sampling and stratified sampling rather than simply adding samples.",
      },
    ],
    answer:
      "$\\hat\\pi_N=4\\cdot\\dfrac{1}{N}\\sum X_i$, unbiased; $\\sigma_{\\hat\\pi}=\\dfrac{4\\sqrt{p(1-p)}}{\\sqrt N}\\approx\\dfrac{1.642}{\\sqrt N}$; for $N=10^{4}$ the standard error is about $1.64\\times10^{-2}$, and a standard error below $10^{-3}$ requires about $N\\approx2.7\\times10^{6}$ samples.",
    tags: ["Monte Carlo", "hit-or-miss method", "standard error", "variance analysis"],
  },
};

export default map;
