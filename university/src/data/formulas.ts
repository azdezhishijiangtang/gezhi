import type { FormulaGroup } from '@/types';
// ── 物理区公式组 ──
import { mechanicsFormulaGroups } from './formulas/mechanics';
import { thermal_physicsFormulaGroups } from './formulas/thermal-physics';
import { electromagnetismFormulaGroups } from './formulas/electromagnetism';
import { opticsFormulaGroups } from './formulas/optics';
import { atomic_physicsFormulaGroups } from './formulas/atomic-physics';
import { analytical_mechanicsFormulaGroups } from './formulas/analytical-mechanics';
import { electrodynamicsFormulaGroups } from './formulas/electrodynamics';
import { quantum_mechanicsFormulaGroups } from './formulas/quantum-mechanics';
import { statistical_physicsFormulaGroups } from './formulas/statistical-physics';
import { solid_state_physicsFormulaGroups } from './formulas/solid-state-physics';
import { mathematical_physicsFormulaGroups } from './formulas/mathematical-physics';
import { relativityFormulaGroups } from './formulas/relativity';
import { computational_physicsFormulaGroups } from './formulas/computational-physics';
import { astrophysicsFormulaGroups } from './formulas/astrophysics';
import { nuclear_particle_physicsFormulaGroups } from './formulas/nuclear-particle-physics';

/** 物理区全部公式组（数学区公式在下方内联） */
const physicsFormulaGroups: FormulaGroup[] = [
  ...mechanicsFormulaGroups,
  ...thermal_physicsFormulaGroups,
  ...electromagnetismFormulaGroups,
  ...opticsFormulaGroups,
  ...atomic_physicsFormulaGroups,
  ...analytical_mechanicsFormulaGroups,
  ...electrodynamicsFormulaGroups,
  ...quantum_mechanicsFormulaGroups,
  ...statistical_physicsFormulaGroups,
  ...solid_state_physicsFormulaGroups,
  ...mathematical_physicsFormulaGroups,
  ...relativityFormulaGroups,
  ...computational_physicsFormulaGroups,
  ...astrophysicsFormulaGroups,
  ...nuclear_particle_physicsFormulaGroups,
];

export const formulaGroups: FormulaGroup[] = [
  {
    id: 'calc-limits',
    name: '极限与等价无穷小',
    courseId: 'calculus',
    formulas: [
      { id: 'f-1', group: '极限', name: '第一重要极限', latex: '\\lim_{x \\to 0}\\frac{\\sin x}{x} = 1' },
      { id: 'f-2', group: '极限', name: '第二重要极限', latex: '\\lim_{x \\to \\infty}\\left(1+\\frac{1}{x}\\right)^x = e' },
      { id: 'f-3', group: '等价无穷小', name: 'x → 0 常用等价', latex: '\\sin x \\sim x,\\ \\tan x \\sim x,\\ \\arcsin x \\sim x,\\ \\arctan x \\sim x' },
      { id: 'f-4', group: '等价无穷小', name: '余弦与指数', latex: '1-\\cos x \\sim \\tfrac{1}{2}x^2,\\quad e^x - 1 \\sim x,\\quad \\ln(1+x) \\sim x' },
      { id: 'f-5', group: '等价无穷小', name: '幂函数型', latex: '(1+x)^\\alpha - 1 \\sim \\alpha x' },
    ],
  },
  {
    id: 'calc-derivative',
    name: '导数与微分',
    courseId: 'calculus',
    formulas: [
      { id: 'f-6', group: '导数定义', name: '导数定义', latex: "f'(x_0) = \\lim_{x \\to x_0}\\frac{f(x)-f(x_0)}{x-x_0} = \\lim_{h \\to 0}\\frac{f(x_0+h)-f(x_0)}{h}" },
      { id: 'f-7', group: '法则', name: '莱布尼茨公式', latex: "(uv)' = u'v + uv'" },
      { id: 'f-8', group: '中值定理', name: '拉格朗日中值定理', latex: "f(b)-f(a) = f'(\\xi)(b-a),\\quad \\xi \\in (a,b)" },
      { id: 'f-9', group: '中值定理', name: '泰勒公式（佩亚诺余项）', latex: 'f(x) = \\sum_{k=0}^{n}\\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k + o\\big((x-x_0)^n\\big)' },
    ],
  },
  {
    id: 'calc-integral',
    name: '积分学',
    courseId: 'calculus',
    formulas: [
      { id: 'f-10', group: '基本公式', name: '牛顿–莱布尼茨公式', latex: '\\int_a^b f(x)\\,dx = F(b) - F(a),\\quad F\' = f' },
      { id: 'f-11', group: '换元积分', name: '换元公式', latex: '\\int_a^b f(x)\\,dx = \\int_{\\alpha}^{\\beta} f(\\varphi(t))\\varphi\'(t)\\,dt' },
      { id: 'f-12', group: '分部积分', name: '分部积分', latex: '\\int_a^b u\\,dv = \\big[uv\\big]_a^b - \\int_a^b v\\,du' },
      { id: 'f-13', group: '对称性', name: '奇偶函数', latex: 'f\\ \\text{奇} \\Rightarrow \\int_{-a}^{a} f = 0;\\quad f\\ \\text{偶} \\Rightarrow \\int_{-a}^{a} f = 2\\int_0^a f' },
    ],
  },
  {
    id: 'la-basics',
    name: '线性代数核心公式',
    courseId: 'linear-algebra',
    formulas: [
      { id: 'f-14', group: '行列式', name: '按行展开', latex: '\\det A = \\sum_{j=1}^{n} a_{ij}(-1)^{i+j}M_{ij}' },
      { id: 'f-15', group: '行列式', name: '乘法公式', latex: '\\det(AB) = \\det A \\cdot \\det B' },
      { id: 'f-16', group: '矩阵', name: '逆矩阵公式', latex: 'A^{-1} = \\frac{1}{\\det A}A^{*},\\quad (A^{*})_{ij} = A_{ji}' },
      { id: 'f-17', group: '特征值', name: '特征方程', latex: '|\\lambda E - A| = 0,\\quad \\sum \\lambda_i = \\operatorname{tr}(A),\\ \\prod \\lambda_i = \\det A' },
      { id: 'f-18', group: '特征值', name: '对角化', latex: 'P^{-1}AP = \\Lambda = \\operatorname{diag}(\\lambda_1,\\dots,\\lambda_n)' },
    ],
  },
  {
    id: 'prob-core',
    name: '概率论核心公式',
    courseId: 'probability',
    formulas: [
      { id: 'f-19', group: '条件概率', name: '条件概率', latex: 'P(A \\mid B) = \\frac{P(AB)}{P(B)},\\quad P(B) > 0' },
      { id: 'f-20', group: '条件概率', name: '乘法公式', latex: 'P(AB) = P(B)\\,P(A \\mid B)' },
      { id: 'f-21', group: '全概率', name: '全概率公式', latex: 'P(A) = \\sum_{i=1}^{n}P(B_i)P(A \\mid B_i)' },
      { id: 'f-22', group: '贝叶斯', name: '贝叶斯公式', latex: 'P(B_i \\mid A) = \\frac{P(B_i)P(A \\mid B_i)}{\\sum_{j}P(B_j)P(A \\mid B_j)}' },
      { id: 'f-23', group: '数字特征', name: '期望与方差', latex: 'E(X) = \\sum x_k p_k,\\quad D(X) = E(X^2) - [E(X)]^2' },
      { id: 'f-24', group: '数字特征', name: '方差性质', latex: 'D(aX+b) = a^2D(X),\\quad D(X \\pm Y) = D(X) + D(Y)\\ (X,Y\\ \\text{独立})' },
      { id: 'f-25', group: '常见分布', name: '正态分布', latex: 'X \\sim N(\\mu,\\sigma^2),\\quad Z = \\frac{X-\\mu}{\\sigma} \\sim N(0,1)' },
    ],
  },
{
    id: 'ma-core',
    name: '数学分析核心',
    courseId: 'mathematical-analysis',
    formulas: [
      { id: 'f-26', group: '实数理论', name: '柯西收敛准则', latex: '\\{x_n\\}\\ \\text{收敛} \\iff \\forall \\varepsilon>0,\\ \\exists N,\\ m,n>N \\Rightarrow |x_n-x_m|<\\varepsilon' },
      { id: 'f-27', group: '一致收敛', name: '一致收敛判别', latex: 'f_n \\rightrightarrows f \\iff \\sup_{x\\in D}|f_n(x)-f(x)| \\to 0' },
      { id: 'f-28', group: '含参积分', name: '积分号下求导', latex: "I'(t) = \\int_a^b \\frac{\\partial f}{\\partial t}(x,t)\\,dx" },
      { id: 'f-29', group: '特殊函数', name: 'Γ 函数递推', latex: '\\Gamma(s+1) = s\\,\\Gamma(s),\\quad \\Gamma(n+1)=n!,\\ \\Gamma\\!\\left(\\tfrac{1}{2}\\right)=\\sqrt{\\pi}' },
      { id: 'f-30', group: '特殊函数', name: 'B 与 Γ 关系', latex: 'B(p,q) = \\frac{\\Gamma(p)\\,\\Gamma(q)}{\\Gamma(p+q)}' },
    ],
  },
  {
    id: 'ag-core',
    name: '解析几何核心',
    courseId: 'analytic-geometry',
    formulas: [
      { id: 'f-31', group: '向量运算', name: '数量积', latex: '\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta = a_1b_1+a_2b_2+a_3b_3' },
      { id: 'f-32', group: '向量运算', name: '混合积', latex: '(\\vec{a},\\vec{b},\\vec{c}) = (\\vec{a}\\times\\vec{b})\\cdot\\vec{c} = V_{\\text{六面体}}' },
      { id: 'f-33', group: '平面直线', name: '点到平面距离', latex: 'd = \\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}' },
      { id: 'f-34', group: '曲面', name: '椭球面', latex: '\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2} = 1' },
      { id: 'f-35', group: '曲面', name: '单叶双曲面', latex: '\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2} = 1' },
    ],
  },
  {
    id: 'ode-core',
    name: '常微分方程核心',
    courseId: 'ode',
    formulas: [
      { id: 'f-36', group: '一阶方程', name: '一阶线性通解', latex: "y = e^{-\\int P\\,dx}\\left(\\int Q\\,e^{\\int P\\,dx}\\,dx + C\\right)" },
      { id: 'f-37', group: '高阶方程', name: '特征方程', latex: '\\lambda^n + a_{n-1}\\lambda^{n-1}+\\cdots+a_0 = 0' },
      { id: 'f-38', group: '高阶方程', name: '重根与复根配解', latex: 'k\\,\\text{重根}\\ \\lambda:\\ e^{\\lambda x},xe^{\\lambda x},\\dots,x^{k-1}e^{\\lambda x};\\quad \\alpha\\pm i\\beta:\\ e^{\\alpha x}\\cos\\beta x, e^{\\alpha x}\\sin\\beta x' },
      { id: 'f-39', group: '方程组', name: '矩阵指数解', latex: '\\vec{y}\' = A\\vec{y},\\quad \\vec{y}(x) = e^{xA}\\vec{y}(0)' },
    ],
  },
  {
    id: 'pde-core',
    name: '偏微分方程核心',
    courseId: 'pde',
    formulas: [
      { id: 'f-40', group: '典型方程', name: '三大方程', latex: 'u_{tt}=a^2u_{xx}\\ \\text{(波动)};\\quad u_t=a^2u_{xx}\\ \\text{(热)};\\quad \\Delta u=0\\ \\text{(调和)}' },
      { id: 'f-41', group: '傅里叶', name: '傅里叶级数', latex: 'f(x) = \\frac{a_0}{2}+\\sum_{n=1}^{\\infty}\\left(a_n\\cos\\frac{n\\pi x}{L}+b_n\\sin\\frac{n\\pi x}{L}\\right)' },
      { id: 'f-42', group: '傅里叶', name: '系数公式', latex: 'a_n=\\frac{1}{L}\\int_{-L}^{L}f(x)\\cos\\frac{n\\pi x}{L}\\,dx,\\quad b_n=\\frac{1}{L}\\int_{-L}^{L}f(x)\\sin\\frac{n\\pi x}{L}\\,dx' },
      { id: 'f-43', group: '格林函数', name: '三维基本解', latex: '\\Phi = \\frac{1}{4\\pi r},\\quad r=\\sqrt{(x-\\xi)^2+(y-\\eta)^2+(z-\\zeta)^2}' },
    ],
  },
  {
    id: 'ca-core',
    name: '复变函数核心',
    courseId: 'complex-analysis',
    formulas: [
      { id: 'f-44', group: '解析', name: 'C–R 方程', latex: '\\frac{\\partial u}{\\partial x}=\\frac{\\partial v}{\\partial y},\\quad \\frac{\\partial u}{\\partial y}=-\\frac{\\partial v}{\\partial x}' },
      { id: 'f-45', group: '柯西理论', name: '柯西积分公式', latex: 'f(z_0) = \\frac{1}{2\\pi i}\\oint_C \\frac{f(z)}{z-z_0}\\,dz' },
      { id: 'f-46', group: '柯西理论', name: '高阶导数公式', latex: "f^{(n)}(z_0) = \\frac{n!}{2\\pi i}\\oint_C \\frac{f(z)}{(z-z_0)^{n+1}}\\,dz" },
      { id: 'f-47', group: '留数', name: '留数定理', latex: '\\oint_C f(z)\\,dz = 2\\pi i\\sum_k \\operatorname{Res}(f,z_k)' },
      { id: 'f-48', group: '留数', name: '极点留数公式', latex: 'm\\,\\text{阶极点}:\\ \\operatorname{Res}=\\frac{1}{(m-1)!}\\lim_{z\\to z_0}\\frac{d^{m-1}}{dz^{m-1}}\\big[(z-z_0)^m f(z)\\big]' },
    ],
  },
  {
    id: 'ra-core',
    name: '实变函数核心',
    courseId: 'real-analysis',
    formulas: [
      { id: 'f-49', group: '测度', name: '勒贝格外测度', latex: 'm^*(E) = \\inf\\left\\{\\sum_k |I_k| : E \\subset \\bigcup_k I_k\\right\\}' },
      { id: 'f-50', group: '积分', name: '控制收敛定理', latex: 'f_n\\to f,\\ |f_n|\\le g\\ (g\\ \\text{可积}) \\ \\Rightarrow\\ \\int f_n \\to \\int f' },
      { id: 'f-51', group: 'Lp 空间', name: '赫尔德不等式', latex: '\\int|fg| \\le \\|f\\|_p\\,\\|g\\|_q,\\quad \\frac{1}{p}+\\frac{1}{q}=1' },
      { id: 'f-52', group: 'Lp 空间', name: '帕塞瓦尔恒等式', latex: '\\sum_n |\\langle f,e_n\\rangle|^2 = \\|f\\|_2^2\\ \\text{(完备正交系)}' },
    ],
  },
  {
    id: 'fa-core',
    name: '泛函分析核心',
    courseId: 'functional-analysis',
    formulas: [
      { id: 'f-53', group: '压缩映射', name: '巴拿赫不动点定理', latex: 'd(Tx,Ty)\\le q\\,d(x,y)\\ (0\\le q<1) \\ \\Rightarrow\\ \\exists!\\ x^*=Tx^*,\\ d(x_n,x^*)\\le\\frac{q^n}{1-q}d(x_1,x_0)' },
      { id: 'f-54', group: '希尔伯特空间', name: '柯西–施瓦茨', latex: '|\\langle x,y\\rangle| \\le \\|x\\|\\,\\|y\\|' },
      { id: 'f-55', group: '希尔伯特空间', name: '里斯表示定理', latex: 'f(x)=\\langle x,z\\rangle\\ \\ (\\forall x),\\quad H^*\\cong H' },
      { id: 'f-56', group: '算子', name: '预解式', latex: '\\sigma(T)=\\{\\lambda : \\lambda I - T\\ \\text{不可逆}\\},\\quad R(\\lambda,T)=(\\lambda I-T)^{-1}' },
    ],
  },
  {
    id: 'aa-core',
    name: '抽象代数核心',
    courseId: 'abstract-algebra',
    formulas: [
      { id: 'f-57', group: '群论', name: '拉格朗日定理', latex: '|G| = [G:H]\\,|H|,\\quad H\\le G\\ \\text{有限}' },
      { id: 'f-58', group: '群论', name: '同态基本定理', latex: 'G/\\ker\\varphi \\cong \\operatorname{im}\\varphi' },
      { id: 'f-59', group: '群论', name: '轨道–稳定子', latex: '|G| = |\\operatorname{Orb}(x)|\\,|\\operatorname{Stab}(x)|' },
      { id: 'f-60', group: '域论', name: '伽罗瓦对应', latex: '\\text{中间域}\\ E\\ \\longleftrightarrow\\ \\operatorname{Gal}(L/E)\\le \\operatorname{Gal}(L/K)' },
    ],
  },
  {
    id: 'top-core',
    name: '拓扑学核心',
    courseId: 'topology',
    formulas: [
      { id: 'f-61', group: '紧致性', name: '海涅–博雷尔', latex: '\\mathbb{R}^n\\ \\text{中子集紧致} \\iff \\text{有界闭集}' },
      { id: 'f-62', group: '基本群', name: '圆周基本群', latex: '\\pi_1(S^1) \\cong \\mathbb{Z}' },
      { id: 'f-63', group: '基本群', name: 'van Kampen', latex: '\\pi_1(X) \\cong \\pi_1(U) *_{\\pi_1(U\\cap V)} \\pi_1(V)' },
      { id: 'f-64', group: '不变量', name: '欧拉示性数', latex: '\\chi = V-E+F,\\quad \\chi(S^2)=2,\\ \\chi(T^2)=0,\\ \\chi(K)=0' },
    ],
  },
  {
    id: 'dg-core',
    name: '微分几何核心',
    courseId: 'differential-geometry',
    formulas: [
      { id: 'f-65', group: '曲线论', name: '曲率与挠率', latex: '\\kappa=\\frac{|\\vec{r}\'\\times\\vec{r}\'\'|}{|\\vec{r}\'|^3},\\quad \\tau=\\frac{(\\vec{r}\',\\vec{r}\'\',\\vec{r}\'\'\')}{|\\vec{r}\'\\times\\vec{r}\'\'|^2}' },
      { id: 'f-66', group: '曲面论', name: '两个基本形式', latex: '\\mathrm{I}=E\\,du^2+2F\\,du\\,dv+G\\,dv^2,\\quad \\mathrm{II}=L\\,du^2+2M\\,du\\,dv+N\\,dv^2' },
      { id: 'f-67', group: '曲面论', name: '高斯曲率', latex: 'K=\\kappa_1\\kappa_2=\\frac{LN-M^2}{EG-F^2}' },
      { id: 'f-68', group: '整体几何', name: '高斯–博内定理', latex: '\\iint_M K\\,dA = 2\\pi\\,\\chi(M) = 2\\pi(2-2g)' },
    ],
  },
  {
    id: 'na-core',
    name: '数值分析核心',
    courseId: 'numerical-analysis',
    formulas: [
      { id: 'f-69', group: '插值', name: '拉格朗日插值', latex: 'L_n(x)=\\sum_{k=0}^n y_k\\,\\ell_k(x),\\quad \\ell_k(x)=\\prod_{j\\ne k}\\frac{x-x_j}{x_k-x_j}' },
      { id: 'f-70', group: '数值积分', name: '辛普森公式', latex: '\\int_a^b f \\approx \\frac{b-a}{6}\\left[f(a)+4f\\!\\left(\\frac{a+b}{2}\\right)+f(b)\\right]' },
      { id: 'f-71', group: '数值积分', name: '龙贝格外推', latex: 'R_k = \\frac{4^k T(h/2^k)-T(h/2^{k-1})}{4^k-1}' },
      { id: 'f-72', group: '线性代数', name: '条件数', latex: '\\kappa(A)=\\|A\\|\\,\\|A^{-1}\\|,\\quad \\frac{\\|\\delta x\\|}{\\|x\\|}\\le\\kappa(A)\\frac{\\|\\delta b\\|}{\\|b\\|}' },
    ],
  },
  {
    id: 'sp-core',
    name: '随机过程核心',
    courseId: 'stochastic-processes',
    formulas: [
      { id: 'f-73', group: '马尔可夫链', name: 'C–K 方程', latex: 'p_{ij}^{(n+m)}=\\sum_k p_{ik}^{(n)}p_{kj}^{(m)},\\quad P^{(n)}=P^n' },
      { id: 'f-74', group: '马尔可夫链', name: '平稳分布', latex: '\\pi P=\\pi,\\quad \\lim_{n\\to\\infty}p_{ij}^{(n)}=\\pi_j\\ \\text{(遍历链)}' },
      { id: 'f-75', group: '泊松过程', name: '泊松计数', latex: 'N(t)\\sim P(\\lambda t),\\quad P(N(t)=k)=\\frac{(\\lambda t)^k e^{-\\lambda t}}{k!}' },
      { id: 'f-76', group: '鞅论', name: '鞅定义', latex: 'E[M_t\\mid\\mathcal{F}_s]=M_s\\ (s\\le t);\\quad E[B_t]=0,\\ E[B_t^2]=t' },
    ],
  },
  {
    id: 'comb-core',
    name: '组合数学核心',
    courseId: 'combinatorics',
    formulas: [
      { id: 'f-77', group: '生成函数', name: '几何级数', latex: '\\sum_{n\\ge0}x^n=\\frac{1}{1-x},\\quad \\sum_{n\\ge0}\\binom{n+k}{k}x^n=\\frac{1}{(1-x)^{k+1}}' },
      { id: 'f-78', group: '生成函数', name: '卡特兰数', latex: 'C_n=\\frac{1}{n+1}\\binom{2n}{n},\\quad C(x)=\\frac{1-\\sqrt{1-4x}}{2x}' },
      { id: 'f-79', group: '容斥', name: '容斥公式', latex: '\\left|\\bigcup_{i=1}^n A_i\\right|=\\sum_{\\varnothing\\ne S\\subseteq[n]}(-1)^{|S|+1}\\left|\\bigcap_{i\\in S}A_i\\right|' },
      { id: 'f-80', group: '群作用', name: 'Burnside 引理', latex: '\\text{轨道数}=\\frac{1}{|G|}\\sum_{g\\in G}|\\operatorname{Fix}(g)|' },
    ],
  },
  {
    id: 'log-core',
    name: '数理逻辑核心',
    courseId: 'mathematical-logic',
    formulas: [
      { id: 'f-81', group: '元定理', name: '可靠性与完备性', latex: '\\Gamma\\vdash\\varphi \\iff \\Gamma\\vDash\\varphi\\ \\text{(一阶逻辑)}' },
      { id: 'f-82', group: '元定理', name: '紧致性定理', latex: '\\text{每个有限子集可满足} \\Rightarrow \\text{整体可满足}' },
      { id: 'f-83', group: '哥德尔', name: '第一不完备性', latex: 'T\\ \\text{相容且足够强} \\Rightarrow \\exists G:\\ T\\nvdash G,\\ T\\nvdash\\neg G' },
      { id: 'f-84', group: '可计算性', name: '对角线法', latex: 'D(P)=\\begin{cases}\\text{死循环} & H(P,P)\\text{判定停机}\\\\text{停机} & \\text{否则}\\end{cases}\\Rightarrow H\\text{不存在}' },
    ],
  },
  // 物理区
  ...physicsFormulaGroups,
];
