/** 搜索质量测试：自然语言 ↔ 数学语言的对应能力 */
import { searchAll } from '@/lib/mathSearch';

interface Case {
  query: string;
  /** 期望出现在结果前 5 的专题 id（任一命中即通过） */
  expectAny: string[];
}

const CASES: Case[] = [
  { query: '怎么求两个向量的点乘', expectAny: ['vector-algebra'] },
  { query: '洛必达法则怎么用', expectAny: ['limits', 'derivatives'] },
  { query: '矩阵怎么求逆', expectAny: ['matrix-operations'] },
  { query: '抽屉原理是什么', expectAny: ['counting-basics', 'inclusion-exclusion', 'graphs'] },
  { query: '钟形曲线是什么分布', expectAny: ['distributions', 'random-vectors'] },
  { query: '什么是特征根', expectAny: ['eigen', 'similar-jordan'] },
  { query: '如何判断级数收敛', expectAny: ['infinite-series'] },
  { query: '泰勒公式是干嘛的', expectAny: ['taylor'] },
  { query: '贝叶斯公式怎么理解', expectAny: ['bayes'] },
  { query: '一阶微分方程怎么解', expectAny: ['first-order-ode'] },
  { query: '傅立叶级数', expectAny: ['fourier-series-ma', 'fourier-separation'] },
  { query: '怎么判断级数发散', expectAny: ['infinite-series'] },
  { query: '叉乘和点乘的区别', expectAny: ['vector-algebra'] },
  { query: 'RSA加密的数学原理', expectAny: ['rsa'] },
  { query: '机器学习里的主成分分析', expectAny: ['pca'] },
  { query: '拉普拉斯方程怎么解', expectAny: ['laplace-equation'] },
  { query: '梯度下降和牛顿法', expectAny: ['unconstrained', 'ml-optimization'] },
  { query: '最短路算法', expectAny: ['graph-algorithms', 'graphs'] },
  { query: '哥德尔不完备定理讲什么', expectAny: ['incompleteness'] },
  { query: '求曲线的弧长', expectAny: ['integral-applications', 'integrals', 'integral-apps-ma'] },
  { query: '大数定律和中心极限定理', expectAny: ['limit-theorems'] },
  { query: '勒贝格积分和黎曼积分的区别', expectAny: ['lebesgue-integral', 'integrals-ma'] },
  { query: '测地线是什么', expectAny: ['geodesics'] },
  { query: '怎样理解同胚', expectAny: ['continuous-maps', 'topological-spaces'] },
];

const main = () => {
  let pass = 0;
  const fails: string[] = [];
  for (const c of CASES) {
    const r = searchAll(c.query, 12);
    const top5 = r.topics.slice(0, 5).map((h) => h.topic.id);
    const hit = c.expectAny.some((id) => top5.includes(id));
    if (hit) {
      pass++;
      console.log(`✓ "${c.query}" → ${top5.slice(0, 3).join(', ')}`);
    } else {
      fails.push(c.query);
      console.log(`✗ "${c.query}" → 前5: [${top5.join(', ')}] 期望含 [${c.expectAny.join(', ')}]`);
    }
  }
  // 空查询与乱码不崩溃
  searchAll('');
  searchAll('zzzzzz不存在的词xyz');
  console.log(`\n通过 ${pass}/${CASES.length}${fails.length === 0 ? ' —— 全部通过' : ''}`);
  process.exit(fails.length === 0 ? 0 : 1);
};

main();
