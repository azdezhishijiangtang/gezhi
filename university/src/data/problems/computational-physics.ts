import type { Problem } from '@/types';

export const computational_physicsProblems: Problem[] = [
  {
    id: 'computational-physics-p1',
    courseId: 'computational-physics',
    topicId: 'errors-fp',
    title: '对数求值的条件数与有效数字损失',
    difficulty: 2,
    question:
      '用双精度计算 $f(x)=\\ln x$ 在 $x=1.0001$ 处的值。若输入 $x$ 本身带有 $10^{-6}$ 的相对误差（例如来自前一步测量），估计输出值相对误差的上界，并判断结果大约损失几位有效数字。',
    hints: [
      '相对条件数公式 $\\kappa=\\left|\\dfrac{xf^\\prime(x)}{f(x)}\\right|$，先算出 $\\kappa$ 再乘以输入的相对误差。',
      '$\\ln(1+t)\\approx t-\\dfrac{t^2}{2}$，用它估算 $\\ln(1.0001)$ 的量级。',
      '有效数字位数与相对误差限的关系：$\\varepsilon_r\\approx\\dfrac{1}{2a_1}10^{1-n}$，位数损失约为 $\\log_{10}\\kappa$。',
    ],
    solution: [
      {
        title: '求条件数',
        detail:
          '对 $f(x)=\\ln x$ 有 $f^\\prime(x)=\\dfrac1x$，故相对条件数 $$\\kappa=\\left|\\frac{x\\cdot(1/x)}{\\ln x}\\right|=\\frac{1}{|\\ln x|}$$ 它是 $x\\to1$ 时发散的函数，这正是危险所在。',
      },
      {
        title: '代入数值',
        detail:
          '由 $\\ln(1+t)\\approx t-\\dfrac{t^2}{2}$，取 $t=10^{-4}$ 得 $$\\ln(1.0001)\\approx10^{-4}-\\tfrac12\\times10^{-8}=9.9995\\times10^{-5}$$ 于是 $$\\kappa\\approx\\frac{1}{9.9995\\times10^{-5}}\\approx1.0000\\times10^{4}$$',
      },
      {
        title: '放大输入误差',
        detail:
          '前向误差约等于条件数乘后向误差： $$\\varepsilon_r^{\\text{out}}\\lesssim\\kappa\\cdot\\varepsilon_r^{\\text{in}}\\approx10^{4}\\times10^{-6}=10^{-2}$$ 即输出的相对误差被放大了一万倍，达到百分之一量级。',
      },
      {
        title: '有效数字损失与改进',
        detail:
          '相对误差从 $10^{-6}$（约 6 位有效数字）恶化到 $10^{-2}$（约 2 位），损失位数约为 $\\log_{10}\\kappa=\\log_{10}10^{4}=4$ 位。注意这是**问题本身病态**，换算法无法挽救；但可以改写问题的提法：若真正需要的是 $\\ln(1+t)$（$t$ 很小），应直接调用 $\\mathrm{log1p}(t)$ 函数，它对小 $t$ 用专门的级数展开，避免了先算 $1+t$ 再取对数时丢失的低位数字。',
      },
    ],
    answer:
      '$\\kappa\\approx10^{4}$，输出相对误差上界约 $10^{-2}$，即损失约 4 位有效数字（剩约 2 位）。',
    tags: ['条件数', '误差放大', '有效数字', '病态问题'],
  },
  {
    id: 'computational-physics-p2',
    courseId: 'computational-physics',
    topicId: 'cp-root-finding',
    title: '牛顿法两步求三次方程的根',
    difficulty: 2,
    question:
      '用牛顿法求方程 $x^{3}-2x-5=0$ 在 $[2,3]$ 内的实根，取初值 $x_{0}=2$，迭代两步（结果保留 6 位小数），并用二次收敛的误差公式检验第二步的误差量级。',
    hints: [
      '牛顿迭代式 $x_{k+1}=x_k-\\dfrac{f(x_k)}{f^\\prime(x_k)}$，其中 $f^\\prime(x)=3x^2-2$。',
      '真值约为 $x^{*}=2.094551$，可用来估计两步的实际误差 $e_1,e_2$。',
      '二次收敛关系 $e_{k+1}\\approx Ce_k^2$，其中 $C=\\left|\\dfrac{f^{\\prime\\prime}(x^{*})}{2f^\\prime(x^{*})}\\right|$。',
    ],
    solution: [
      {
        title: '第一步',
        detail:
          '$f(2)=8-4-5=-1$，$f^\\prime(2)=3\\times4-2=10$，故 $$x_1=2-\\frac{-1}{10}=2.1$$ 与真值 $x^{*}=2.094551$ 相比，误差 $e_1\\approx5.449\\times10^{-3}$。',
      },
      {
        title: '第二步',
        detail:
          '在 $x_1=2.1$ 处：$f(2.1)=9.261-4.2-5=0.061$，$f^\\prime(2.1)=3\\times4.41-2=11.23$，故 $$x_2=2.1-\\frac{0.061}{11.23}=2.1-5.432\\times10^{-3}=2.094568$$ 误差 $e_2\\approx1.7\\times10^{-5}$——一步之内误差缩小了约 300 倍。',
      },
      {
        title: '用二次收敛公式检验',
        detail:
          '$f^{\\prime\\prime}(x)=6x$，取 $x^{*}\\approx2.0946$、$f^\\prime(x^{*})\\approx11.16$，则 $$C=\\left|\\frac{f^{\\prime\\prime}(x^{*})}{2f^\\prime(x^{*})}\\right|=\\frac{6\\times2.0946}{2\\times11.16}\\approx0.563$$ 预测 $e_2\\approx Ce_1^2=0.563\\times(5.449\\times10^{-3})^2\\approx1.67\\times10^{-5}$，与实际误差 $1.7\\times10^{-5}$ 吻合，验证了二次收敛 $e_{k+1}\\approx Ce_k^2$。',
      },
      {
        title: '收敛判据说明',
        detail:
          '实际程序中应同时监控 $\\dfrac{|x_{k+1}-x_k|}{\\max(|x_{k+1}|,1)}$ 与 $|f(x_k)|$。此处第三步即可把误差压到 $10^{-10}$ 量级；若继续迭代到误差接近 $|f|\\approx u\\cdot|f^\\prime|\\cdot|x|\\sim10^{-15}$ 就应该停机，再往下只是在放大舍入噪声。',
      },
    ],
    answer:
      '$x_1=2.1$，$x_2\\approx2.094568$；真值 $x^{*}=2.094551$，误差由 $5.4\\times10^{-3}$ 降到 $1.7\\times10^{-5}$，符合二次收敛 $e_2\\approx Ce_1^2$（$C\\approx0.56$）。',
    tags: ['牛顿法', '迭代法', '收敛阶', '误差估计'],
  },
  {
    id: 'computational-physics-p3',
    courseId: 'computational-physics',
    topicId: 'num-integration',
    title: '梯形与辛普森公式计算正弦积分',
    difficulty: 2,
    question:
      '用复合梯形公式（$n=2$ 个子区间）与复合辛普森公式计算 $I=\\displaystyle\\int_0^{\\pi/2}\\sin x\\,dx$（真值为 1），比较二者的误差；再把网格减半（$n=4$），验证误差是否按理论阶下降。',
    hints: [
      '取 $h=\\dfrac{\\pi}{4}\\approx0.785398$，三个节点的函数值为 $\\sin0=0$、$\\sin\\dfrac{\\pi}{4}=0.707107$、$\\sin\\dfrac{\\pi}{2}=1$。',
      '复合梯形 $T=\\dfrac h2(f_0+2f_1+f_2)$，复合辛普森 $S=\\dfrac h3(f_0+4f_1+f_2)$。',
      '梯形误差 $O(h^2)$、辛普森误差 $O(h^4)$：网格减半后误差应分别缩小约 4 倍与 16 倍。',
    ],
    solution: [
      {
        title: '复合梯形（$n=2$）',
        detail:
          '$$T_2=\\frac{0.785398}{2}\\left[0+2\\times0.707107+1\\right]=0.392699\\times2.414214=0.948059$$ 误差 $E_T=0.948059-1=-5.194\\times10^{-2}$。直线逼近弯曲的正弦，误差不小。',
      },
      {
        title: '复合辛普森（$n=2$）',
        detail:
          '$$S_2=\\frac{0.785398}{3}\\left[0+4\\times0.707107+1\\right]=0.261799\\times3.828427=1.002280$$ 误差 $E_S=+2.280\\times10^{-3}$。同样只用三个函数值，误差比梯形小了约 $\\dfrac{5.194\\times10^{-2}}{2.280\\times10^{-3}}\\approx22.8$ 倍——抛物线逼近的威力。',
      },
      {
        title: '网格减半验证阶数',
        detail:
          '取 $h=\\dfrac{\\pi}{8}$，$n=4$，节点值为 $0,\\;0.382683,\\;0.707107,\\;0.923880,\\;1$。复合梯形 $$T_4=\\frac{0.392699}{2}\\left[0+2(0.382683+0.707107+0.923880)+1\\right]=0.987116$$ 误差 $-1.288\\times10^{-2}$，与 $T_2$ 的误差之比为 $\\dfrac{5.194}{1.288}\\approx4.03\\approx2^2$，验证了梯形是二阶。复合辛普森 $$S_4=\\frac{0.392699}{3}\\left[0+4(0.382683+0.923880)+2\\times0.707107+1\\right]=1.000135$$ 误差 $+1.35\\times10^{-4}$，与 $S_2$ 的误差之比 $\\dfrac{2.280\\times10^{-3}}{1.35\\times10^{-4}}\\approx16.9\\approx2^4$，验证了辛普森是四阶。',
      },
      {
        title: '理查森外推',
        detail:
          '把两次梯形结果组合： $$\\frac{4T_4-T_2}{3}=\\frac{4\\times0.987116-0.948059}{3}=\\frac{3.000405}{3}=1.000135$$ 与直接算出的 $S_4$ 完全一致。这说明复合辛普森就是复合梯形的一次理查森外推，也是龙贝格算法的基本步骤。',
      },
    ],
    answer:
      '$T_2\\approx0.948059$（误差 $-5.19\\times10^{-2}$）；$S_2\\approx1.002280$（误差 $+2.28\\times10^{-3}$）。网格减半后梯形误差降为约 1/4、辛普森降为约 1/16，分别验证 $O(h^2)$ 与 $O(h^4)$；外推 $\\dfrac{4T_4-T_2}{3}=1.000135$ 与 $S_4$ 相同。',
    tags: ['复合梯形', '辛普森公式', '误差阶', '理查森外推'],
  },
  {
    id: 'computational-physics-p4',
    courseId: 'computational-physics',
    topicId: 'ode-numerics',
    title: 'RK4 求解阻尼振动并判断稳定步长',
    difficulty: 3,
    question:
      '阻尼振子满足 $\\ddot x+0.2\\dot x+4x=0$，$x(0)=1$，$\\dot x(0)=0$。（1）把它化为一阶系统，用四阶龙格–库塔法以 $h=0.1$ 走一步，并与解析解比较；（2）求显式欧拉法在此参数下的稳定步长上限，说明 $h=0.1$ 时欧拉法能否使用。',
    hints: [
      '令 $v=\\dot x$，状态向量 $(x,v)$ 满足 $\\dot x=v$，$\\dot v=-0.2v-4x$；四个斜率 $k_i$ 都是二维向量。',
      '解析解用 $\\gamma=0.1$、$\\omega_d=\\sqrt{\\omega_0^2-\\gamma^2}=\\sqrt{3.99}=1.997498$，即 $x(t)=e^{-\\gamma t}\\left[\\cos\\omega_dt+\\dfrac{\\gamma}{\\omega_d}\\sin\\omega_dt\\right]$。',
      '显式欧拉的稳定条件 $|1+h\\lambda|\\le1$，其中 $\\lambda=-\\gamma\\pm i\\omega_d$，展开后解出 $h$ 的上界。',
    ],
    solution: [
      {
        title: '降阶为系统',
        detail:
          '$$\\frac{d}{dt}\\begin{pmatrix}x\\\\v\\end{pmatrix}=\\begin{pmatrix}v\\\\-0.2v-4x\\end{pmatrix}$$ 系数矩阵的本征值为 $\\lambda_{\\pm}=-\\gamma\\pm i\\omega_d$，$\\gamma=\\dfrac{0.2}{2}=0.1$，$\\omega_0=2$，$\\omega_d=\\sqrt{4-0.01}=1.997498$。',
      },
      {
        title: 'RK4 一步（$h=0.1$）',
        detail:
          '四个斜率（每个为 $(k^{(x)},k^{(v)})$）：$$k_1=(0,\\ -4),\\quad k_2=(-0.2,\\ -3.96),\\quad k_3=(-0.198,\\ -3.9204),\\quad k_4=(-0.39204,\\ -3.842392)$$ 按权重 $1:2:2:1$ 组合：$$x_1=1+\\frac{0.1}{6}\\left[0+2(-0.2)+2(-0.198)-0.39204\\right]=0.980199$$ $$v_1=0+\\frac{0.1}{6}\\left[-4+2(-3.96)+2(-3.9204)-3.842392\\right]=-0.393387$$',
      },
      {
        title: '与解析解比较',
        detail:
          '$$x(t)=e^{-0.1t}\\left[\\cos(1.997498\\,t)+0.050063\\sin(1.997498\\,t)\\right]$$ 代入 $t=0.1$：$e^{-0.01}=0.990050$，$\\cos0.199750=0.980116$，$\\sin0.199750=0.198424$，括号内为 $0.990051$，故 $x(0.1)=0.980200$，进一步得 $v(0.1)=-0.393392$。RK4 的误差分别为约 $2\\times10^{-7}$ 与 $5\\times10^{-6}$，与理论预期 $\\sim\\dfrac{(h\\omega_d)^5}{120}\\approx2.7\\times10^{-6}$ 同量级。',
      },
      {
        title: '显式欧拉的稳定步长',
        detail:
          '放大因子条件 $|1+h\\lambda|\\le1$ 展开为 $$(1-\\gamma h)^2+(\\omega_dh)^2\\le1\\ \\Longrightarrow\\ (\\gamma^2+\\omega_d^2)h^2-2\\gamma h\\le0$$ 即 $$h\\le\\frac{2\\gamma}{\\gamma^2+\\omega_d^2}=\\frac{2\\gamma}{\\omega_0^2}=\\frac{0.2}{4}=0.05$$ 本题取 $h=0.1>0.05$，**显式欧拉必然发散**；而 RK4 的稳定边界约为 $h|\\lambda|\\le2.785$，此处 $h|\\lambda|\\approx0.2$，远远安全。可见限制欧拉法的是稳定性，限制 RK4 的只是精度。',
      },
    ],
    answer:
      '（1）$x(0.1)\\approx0.980199$，$\\dot x(0.1)\\approx-0.393387$，与解析值 $0.980200$、$-0.393392$ 相差约 $10^{-6}$ 量级；（2）显式欧拉稳定上限 $h\\le\\dfrac{2\\gamma}{\\omega_0^2}=0.05$，故 $h=0.1$ 时欧拉法发散，必须改用 RK4 或隐式格式。',
    tags: ['RK4', '阻尼振动', '稳定性', '状态向量'],
  },
  {
    id: 'computational-physics-p5',
    courseId: 'computational-physics',
    topicId: 'pde-numerics',
    title: '热方程显式差分格式的 CFL 稳定性判别',
    difficulty: 3,
    question:
      '用 FTCS 显式差分格式求解一维热方程 $u_t=\\alpha u_{xx}$，取 $\\alpha=1$、$\\Delta x=0.05$。（1）求保证稳定所允许的最大时间步长；（2）若取 $\\Delta t=2\\times10^{-3}$，判断是否稳定，并求最高频（锯齿）模态的放大因子；（3）从放大矩阵谱半径的角度说明同一结论。',
    hints: [
      'FTCS 递推式 $u_j^{n+1}=u_j^{n}+r(u_{j+1}^{n}-2u_j^{n}+u_{j-1}^{n})$，其中 $r=\\dfrac{\\alpha\\Delta t}{\\Delta x^2}$。',
      'von Neumann 分析给出 $\\xi=1-4r\\sin^2\\dfrac{k\\Delta x}{2}$，最危险的是 $\\sin^2=1$ 的锯齿模态。',
      '写成 $u^{n+1}=Gu^n$ 后，$G=I+rT$（$T$ 为三对角二阶差分矩阵），稳定性即谱半径 $\\rho(G)\\le1$。',
    ],
    solution: [
      {
        title: '写出格式与无量纲参数',
        detail:
          '时间向前、空间中心： $$\\frac{u_j^{n+1}-u_j^n}{\\Delta t}=\\alpha\\frac{u_{j+1}^n-2u_j^n+u_{j-1}^n}{\\Delta x^2}$$ 即 $u_j^{n+1}=u_j^n+r(u_{j+1}^n-2u_j^n+u_{j-1}^n)$，其中 $r=\\dfrac{\\alpha\\Delta t}{\\Delta x^2}=\\dfrac{\\Delta t}{0.0025}=400\\,\\Delta t$。截断误差为 $O(\\Delta t)+O(\\Delta x^2)$，格式与方程相容。',
      },
      {
        title: 'von Neumann 稳定性分析',
        detail:
          '代入 $\\varepsilon_j^n=\\xi^ne^{ikj\\Delta x}$： $$\\xi=1+r\\left(e^{ik\\Delta x}-2+e^{-ik\\Delta x}\\right)=1-4r\\sin^2\\frac{k\\Delta x}{2}$$ 稳定要求 $|\\xi|\\le1$ 对一切 $k$ 成立。最危险的是 $\\sin^2=1$（波长 $2\\Delta x$ 的锯齿模态），此时 $\\xi=1-4r$，故 $$-1\\le1-4r\\le1\\ \\Longrightarrow\\ r\\le\\frac12$$',
      },
      {
        title: '判断本题的两个步长',
        detail:
          '由 $r=400\\Delta t\\le\\dfrac12$ 得 $$\\Delta t_{\\max}=\\frac{\\Delta x^2}{2\\alpha}=\\frac{0.0025}{2}=1.25\\times10^{-3}$$ 若取 $\\Delta t=2\\times10^{-3}$，则 $r=400\\times2\\times10^{-3}=0.8>0.5$，锯齿模态的放大因子为 $$\\xi=1-4\\times0.8=-2.2$$ $|\\xi|=2.2>1$，该模态每一步被放大 2.2 倍且符号交替；20 步后放大 $2.2^{20}\\approx2.7\\times10^{6}$ 倍，数值解会立刻被锯齿振荡吞没。',
      },
      {
        title: '谱半径视角（与矩阵本征值的联系）',
        detail:
          '把格式写成 $u^{n+1}=Gu^n$，$G=I+rT$，$T$ 是主对角线为 $-2$、次对角线为 $1$ 的三对角矩阵。$T$ 的本征值为 $-4\\sin^2\\dfrac{k\\Delta x}{2}$，故 $G$ 的本征值恰为上面的 $\\xi(k)$，于是 $$\\rho(G)=\\max_k|\\xi(k)|=\\max\\{1,\\,|1-4r|\\}$$ 当 $r=0.8$ 时 $\\rho(G)=2.2>1$，与逐模态分析一致。**差分格式的稳定性就是一个矩阵本征值（谱半径）问题**，这也解释了为什么可以用幂法数值估计 $\\rho(G)$ 来检验复杂格式的稳定性。若要取 $\\Delta t=2\\times10^{-3}$，应改用隐式格式（BTCS 或 Crank–Nicolson），它们的放大因子对任意 $r>0$ 都满足 $|\\xi|\\le1$。',
      },
    ],
    answer:
      '（1）稳定条件 $r=\\dfrac{\\alpha\\Delta t}{\\Delta x^2}\\le\\dfrac12$，故 $\\Delta t_{\\max}=1.25\\times10^{-3}$；（2）$\\Delta t=2\\times10^{-3}$ 对应 $r=0.8$，锯齿模态放大因子 $\\xi=-2.2$，$|\\xi|=2.2>1$，不稳定；（3）放大矩阵谱半径 $\\rho(G)=2.2>1$，同样判定发散，应改用隐式格式。',
    tags: ['FTCS', 'CFL条件', 'von Neumann稳定性', '谱半径'],
  },
  {
    id: 'computational-physics-p6',
    courseId: 'computational-physics',
    topicId: 'monte-carlo',
    title: '蒙特卡罗投点法估算圆周率',
    difficulty: 1,
    question:
      '在正方形 $[-1,1]\\times[-1,1]$ 内均匀随机取 $N$ 个点，用落在单位圆 $x^2+y^2\\le1$ 内的比例估计 $\\pi$。（1）写出估计量并证明它无偏；（2）求出估计值的标准误关于 $N$ 的表达式；（3）取 $N=10^{4}$ 时标准误是多少？若要标准误小于 $10^{-3}$，大约需要多少样本？',
    hints: [
      '正方形面积为 4，单位圆面积为 $\\pi$，命中概率 $p=\\dfrac{\\pi}{4}$，故 $\\hat\\pi=4\\hat p$。',
      '每次投点是伯努利试验，指示变量的方差为 $p(1-p)$，样本均值方差为 $\\dfrac{p(1-p)}{N}$。',
      '标准误按 $N^{-1/2}$ 下降：精度提高一位需要样本量增加 100 倍。',
    ],
    solution: [
      {
        title: '建立估计量',
        detail:
          '设第 $i$ 个点的指示变量 $X_i=1$（落在圆内）或 $0$（落在圆外），则 $X_i$ 服从参数为 $p=\\dfrac{\\pi}{4}$ 的伯努利分布，$\\mathbb{E}[X_i]=p$，$\\mathrm{Var}(X_i)=p(1-p)$。估计量取 $$\\hat\\pi_N=4\\cdot\\frac{1}{N}\\sum_{i=1}^{N}X_i=4\\hat p$$',
      },
      {
        title: '无偏性',
        detail:
          '由期望的线性性： $$\\mathbb{E}[\\hat\\pi_N]=4\\cdot\\frac1N\\sum_{i=1}^N\\mathbb{E}[X_i]=4p=\\pi$$ 故估计量无偏——平均意义上它给出正确的值，但单次实现会有偏差，需要看方差。',
      },
      {
        title: '方差与标准误',
        detail:
          '$$\\mathrm{Var}(\\hat\\pi_N)=16\\cdot\\frac{p(1-p)}{N},\\qquad \\sigma_{\\hat\\pi}=\\frac{4\\sqrt{p(1-p)}}{\\sqrt N}$$ 代入 $p=\\dfrac{\\pi}{4}\\approx0.785398$：$p(1-p)\\approx0.16853$，$\\sqrt{p(1-p)}\\approx0.41052$，故 $$\\sigma_{\\hat\\pi}\\approx\\frac{1.642}{\\sqrt N}$$ 实践中用 $\\hat p$ 代替 $p$ 估计标准误，并给出 $\\hat\\pi\\pm1.96\\,\\sigma_{\\hat\\pi}$ 的 95% 置信区间。',
      },
      {
        title: '数值结果与代价',
        detail:
          '$N=10^{4}$：$\\sigma_{\\hat\\pi}\\approx\\dfrac{1.642}{100}=1.64\\times10^{-2}$，即大约只有两位有效数字。要使 $\\sigma_{\\hat\\pi}<10^{-3}$，需 $$\\sqrt N>\\frac{1.642}{10^{-3}}=1642\\ \\Longrightarrow\\ N>2.70\\times10^{6}$$ 约需 270 万个样本。这正是 $N^{-1/2}$ 收敛的代价：精度每提高一位（误差降为 1/10），样本量要增加 100 倍。因此工程上要配合重要抽样、分层抽样等减方差技巧，而不是一味地增加样本。',
      },
    ],
    answer:
      '$\\hat\\pi_N=4\\cdot\\dfrac{1}{N}\\sum X_i$，无偏；$\\sigma_{\\hat\\pi}=\\dfrac{4\\sqrt{p(1-p)}}{\\sqrt N}\\approx\\dfrac{1.642}{\\sqrt N}$；$N=10^{4}$ 时标准误约 $1.64\\times10^{-2}$，要求标准误小于 $10^{-3}$ 约需 $N\\approx2.7\\times10^{6}$ 个样本。',
    tags: ['蒙特卡罗', '投点法', '标准误', '方差分析'],
  },
];
