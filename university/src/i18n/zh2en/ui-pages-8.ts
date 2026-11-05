/** Problems（例题广场）与 NotFound（404）页面可见文案英文映射 */
const dict: Record<string, string> = {
  // ── Problems 页头 ──
  '每道例题配备分步提示与完整解答。建议先看提示独立思考，再展开解答核对每一步的推理依据。':
    'Each problem comes with step-by-step hints and a full solution. Try thinking it through from the hints first, then expand the solution to check the reasoning behind every step.',

  // ── Problems 筛选器 ──
  '全部难度': 'All Levels',
  '基础': 'Basic',
  '中等': 'Intermediate',
  '较难': 'Advanced',

  // ── Problems 列表与空态 ──
  '知识点': 'Topic',
  '当前筛选条件下暂无例题': 'No problems match the current filters',
  '清除筛选条件': 'Clear filters',

  // ── NotFound ──
  '你访问的页面不存在——就像函数在该点没有定义一样。':
    'The page you requested does not exist — just as a function is undefined at that point.',
};

export default dict;
