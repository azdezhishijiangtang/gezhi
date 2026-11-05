import { useEffect, useRef, useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { KeyRound, Check, Eye, EyeOff, AlertCircle, Save, Trash2, Zap, Sparkles, RefreshCw, ListTree, CloudDownload, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  AI_PRESETS,
  AI_PROFILE_COUNT,
  AI_PROFILE_LABELS,
  readAiProfiles,
  saveAiProfile,
  clearAiProfile,
  getActiveProfile,
  setActiveProfile,
  thinkingModePref,
  THINKING_LEVELS,
  THINKING_LABELS,
  readAutoModel,
  writeAutoModel,
  readSelfCheck,
  writeSelfCheck,
  readFallback,
  writeFallback,
  readMultiPath,
  writeMultiPath,
  readMultiPathCount,
  writeMultiPathCount,
  readCrossCheck,
  writeCrossCheck,
  readLink,
  writeLink,
  readRagBoost,
  writeRagBoost,
  type ThinkingMode,
} from '@/lib/ai';
import {
  getCatalog,
  describeCatalogAge,
  retiredModelHint,
  type CatalogEntry,
} from '@/lib/modelCatalog';
import type { AiProfile } from '@/lib/ai';

interface AiSettingsCardProps {
  /** 配置保存成功后的回调 */
  onSaved?: () => void;
  /** 紧凑模式（用于弹窗/侧栏） */
  compact?: boolean;
}

const emptyForm = (): AiProfile => ({
  name: '',
  baseUrl: AI_PRESETS[0].baseUrl,
  apiKey: '',
  model: AI_PRESETS[0].model,
  reasoningEffort: 'off',
});

/**
 * AI 服务配置卡片：三套独立存档（接口地址 / 模型 / 思考模式 / 密钥），
 * 可随时切换当前生效的存档。API Key 只写入浏览器 localStorage。
 */
const AiSettingsCard = ({ onSaved, compact = false }: AiSettingsCardProps) => {
  const t = useT();
  const [profiles, setProfiles] = useState<(AiProfile | null)[]>(() => readAiProfiles());
  const [active, setActive] = useState<number>(() => getActiveProfile());
  const [slot, setSlot] = useState<number>(() => getActiveProfile());
  const [form, setForm] = useState<AiProfile>(() => readAiProfiles()[getActiveProfile()] ?? emptyForm());
  const [showKey, setShowKey] = useState(false);
  // 「已保存」提示改为快照比较：保存成功后记下当时表单的序列化值，
  // 之后用户一改动表单，快照就不相等，提示自动消失——不需要用 effect 监听 form。
  const [savedSnapshot, setSavedSnapshot] = useState<string | null>(null);
  const saved = savedSnapshot === JSON.stringify(form);
  const [catalog, setCatalog] = useState<CatalogEntry>({ models: [], source: 'builtin', fetchedAt: 0 });
  const [loadingModels, setLoadingModels] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [manualModel, setManualModel] = useState(false);
  /** 是否处于「其他」自定义服务商模式（用户自己填 Base URL） */
  const [customActive, setCustomActive] = useState<boolean>(false);
  /** 接口地址输入框引用，点击「其他」时聚焦引导用户填写 */
  const baseUrlRef = useRef<HTMLInputElement>(null);
  /** 智能选模型开关（全局，不随存档保存） */
  const [autoModel, setAutoModel] = useState<boolean>(() => readAutoModel());
  /** 智能自检开关（全局，默认开启）：回答后自动复核纠错 */
  const [selfCheck, setSelfCheck] = useState<boolean>(() => readSelfCheck());
  /** 智能容错开关（全局，默认开启）：失败时自动切换其他模型重试 */
  const [fallback, setFallback] = useState<boolean>(() => readFallback());
  /** 多路径自洽开关（全局，默认关闭）：中高强度/难题时并发生成多条思路再仲裁 */
  const [multiPath, setMultiPath] = useState<boolean>(() => readMultiPath());
  /** 多路径并发求解路数（2/3/4，默认 3） */
  const [multiPathCount, setMultiPathCount] = useState<number>(() => readMultiPathCount());
  /** 极致模式·双模型交叉验证开关（全局，默认关闭）：用第二个模型独立重做并比对 */
  const [crossCheck, setCrossCheck] = useState<boolean>(() => readCrossCheck());
  /** 多路径+交叉验证联动开关（全局，默认关闭）：多路径生成后由第二模型仲裁 */
  const [link, setLink] = useState<boolean>(() => readLink());
  /** RAG 检索增强·难题专精开关（全局，默认关闭）：难题时加强检索并强制引用资料 */
  const [ragBoost, setRagBoost] = useState<boolean>(() => readRagBoost());
  /** 当前生效的思考偏好（兼容旧存档里只存了 reasoningEffort 的情况） */
  const mode = thinkingModePref(form);
  /** 思考强度帮助文案（按语言） */
  const THINKING_HELP: Record<ThinkingMode, string> = {
    off: t('不启用额外推理，直接给出结论和关键步骤。'),
    low: t('少量推理，适合概念理解与简单练习。'),
    medium: t('平衡推理深度与响应速度，适合日常解题。'),
    high: t('分配更多推理预算，适合复杂计算、证明与综合题。'),
  };


  /**
   * 拉取模型目录（随服务商自动更新）。
   * 走 modelCatalog：缓存新鲜直接用，过期后台刷新，失败回退内置目录。
   * silent 模式下失败不打扰用户。
   */
  const loadModels = async (baseUrl: string, apiKey: string, opts: { force?: boolean; silent?: boolean } = {}) => {
    const { force = false, silent = false } = opts;
    if (!baseUrl.trim() || !apiKey.trim()) return;
    setLoadingModels(true);
    setModelError(null);
    try {
      const entry = await getCatalog(baseUrl, apiKey, { force });
      setCatalog(entry);
      // 只有「完全没有可用列表」时才需要手动输入
      setManualModel(entry.models.length === 0);
    } catch (err) {
      if (!silent) setModelError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingModels(false);
    }
  };

  // 挂载即自动拉取一次（缓存新鲜则秒回，过期则后台静默刷新）
  useEffect(() => {
    if (form.baseUrl.trim() && form.apiKey.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 挂载后拉取模型目录属于与外部服务同步，loading 标志需同步置位
      void loadModels(form.baseUrl, form.apiKey, { silent: true });
    }
    // 仅在挂载时执行一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Key / 接口地址填写变化后，防抖 800ms 自动拉取该服务商的最新模型目录
  useEffect(() => {
    if (!form.baseUrl.trim() || !form.apiKey.trim()) return;
    const timer = setTimeout(() => {
      void loadModels(form.baseUrl, form.apiKey, { silent: true });
    }, 800);
    return () => clearTimeout(timer);
  }, [form.baseUrl, form.apiKey]);

  /** 切换正在编辑的存档 */
  const switchSlot = (i: number) => {
    setSlot(i);
    const p = profiles[i];
    setForm(p ?? emptyForm());
    setSavedSnapshot(null);
    setCatalog({ models: [], source: 'builtin', fetchedAt: 0 });
    setModelError(null);
    setManualModel(false);
    // 该存档的 Base URL 匹配不到任何预设 → 视为「其他」自定义服务商
    const presetMatch = p ? AI_PRESETS.some((pr) => pr.baseUrl === p.baseUrl) : false;
    setCustomActive(Boolean(p?.baseUrl) && !presetMatch);
    // 已配置过的存档静默尝试拉取模型列表
    if (p?.apiKey && p?.baseUrl) void loadModels(p.baseUrl, p.apiKey, { silent: true });
  };

  const applyPreset = (idx: number) => {
    const p = AI_PRESETS[idx];
    setForm((f) => ({ ...f, baseUrl: p.baseUrl, model: p.model }));
    setCustomActive(false);
    // 已填 Key 时，应用预设后自动拉取该服务商的最新模型目录
    if (form.apiKey.trim()) void loadModels(p.baseUrl, form.apiKey);
  };

  /** 选择「其他」：进入自定义服务商模式，清空接口地址与模型，引导用户自己填写 */
  const applyCustom = () => {
    setCustomActive(true);
    setForm((f) => ({ ...f, baseUrl: '', model: '' }));
    setCatalog({ models: [], source: 'builtin', fetchedAt: 0 });
    setModelError(null);
    setManualModel(false);
    // 聚焦到接口地址输入框，方便用户直接粘贴自己的 Base URL
    requestAnimationFrame(() => baseUrlRef.current?.focus());
  };

  const handleSave = () => {
    if (!form.apiKey.trim() || !form.baseUrl.trim() || !form.model.trim()) return;
    const next: AiProfile = {
      name: form.name?.trim() || '',
      baseUrl: form.baseUrl.trim(),
      apiKey: form.apiKey.trim(),
      model: form.model.trim(),
      reasoningEffort: thinkingModePref(form),
    };
    saveAiProfile(slot, next);
    setProfiles(readAiProfiles());
    setActive(slot);
    setSavedSnapshot(JSON.stringify(form));
    onSaved?.();
  };

  const handleUse = (i: number) => {
    setActiveProfile(i);
    setActive(i);
    setProfiles(readAiProfiles());
  };

  const handleClear = (i: number) => {
    clearAiProfile(i);
    const list = readAiProfiles();
    setProfiles(list);
    setActive(getActiveProfile());
    setForm(list[i] ?? emptyForm());
  };

  return (
    <div className={compact ? 'space-y-4' : 'border border-border bg-card p-6 space-y-5'}>
      <div className="flex items-center gap-2">
        <KeyRound className="h-4 w-4 text-info" />
        <h3 className="font-serif text-base font-semibold">{t('API 密钥设置')}</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {t('三套存档 · 当前生效：')}
          <span className="text-success font-medium">{t(AI_PROFILE_LABELS[active])}</span>
        </span>
      </div>

      {/* 三个存档切换 */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">{t('接口存档（三套独立配置，互不覆盖）')}</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: AI_PROFILE_COUNT }, (_, i) => {
            const p = profiles[i];
            const isEditing = slot === i;
            const isActive = active === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => switchSlot(i)}
                className={`flex flex-col items-start gap-0.5 px-2.5 py-2 border text-left transition-colors duration-[var(--duration-fast)] ${
                  isEditing
                    ? 'border-info bg-info/10'
                    : 'border-border hover:border-info/50 hover:bg-secondary/60'
                }`}
              >
                <span className="flex items-center gap-1 text-xs font-medium">
                  {t(AI_PROFILE_LABELS[i])}
                  {isActive && (
                    <span className="text-[10px] px-1 bg-success/15 text-success border border-success/30">
                      {t('使用中')}
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-muted-foreground truncate w-full">
                  {p ? t(p.name || p.model) : t('未配置')}
                </span>
              </button>
            );
          })}
        </div>
        {slot !== active && profiles[slot] && (
          <Button variant="outline" size="sm" onClick={() => handleUse(slot)} className="gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            {t('启用') + t(AI_PROFILE_LABELS[slot])}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ai-name">{t('存档备注名（选填）')}</Label>
        <Input
          id="ai-name"
          value={form.name ?? ''}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder={t('例如：DeepSeek 主力 / 备用 Key')}
          className="text-sm"
        />
      </div>

      {/* 服务商预设 */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">{t('快速选择服务商')}</Label>
        <div className="flex flex-wrap gap-1.5">
          {AI_PRESETS.map((p, i) => (
            <button
              key={t(p.name)}
              type="button"
              onClick={() => applyPreset(i)}
              title={p.hint}
              className={`text-xs px-2.5 py-1.5 border transition-colors duration-[var(--duration-fast)] ${
                form.baseUrl === p.baseUrl && form.model === p.model
                  ? 'border-info bg-info/10 text-info'
                  : 'border-border text-muted-foreground hover:border-info/50 hover:text-foreground'
              }`}
            >
              {t(p.name)}
            </button>
          ))}
          {/* 其他：自定义任意 OpenAI 兼容接口地址 */}
          <button
            key="__custom__"
            type="button"
            onClick={applyCustom}
            className={`text-xs px-2.5 py-1.5 border border-dashed transition-colors duration-[var(--duration-fast)] ${
              customActive
                ? 'border-info bg-info/10 text-info'
                : 'border-border text-muted-foreground hover:border-info/50 hover:text-foreground'
            }`}
          >
            {t('＋ 其他')}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ai-baseurl">{t('接口地址（Base URL）')}</Label>
        <Input
          id="ai-baseurl"
          ref={baseUrlRef}
          value={form.baseUrl}
          onChange={(e) => setForm((f) => ({ ...f, baseUrl: e.target.value }))}
          placeholder="https://api.deepseek.com/v1"
          className="font-mono text-sm"
        />
        {form.baseUrl.trim() === '' && (
          <p className="text-[11px] leading-relaxed text-info">
            {t('填入你的 OpenAI 兼容接口地址（如 OpenRouter、Ollama 本地、或任意第三方兼容网关），保存 API Key 后会')}<b>{t('自动检测可用模型')}</b>{t('；若服务商不支持自动检测，可手动填写模型名。')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="ai-model">{t('模型名称')}</Label>
          <button
            type="button"
            onClick={() => void loadModels(form.baseUrl, form.apiKey, { force: true })}
            disabled={!form.apiKey.trim() || !form.baseUrl.trim() || loadingModels}
            className="flex items-center gap-1 text-xs text-info hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingModels ? 'animate-spin' : ''}`} />
            {loadingModels ? t('正在获取…') : t('刷新模型列表')}
          </button>
        </div>

        {catalog.models.length > 0 && !manualModel ? (
          <select
            id="ai-model"
            value={form.model}
            onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
            className="h-9 w-full border border-input bg-background px-2 text-sm font-mono"
          >
            {/* 列表不含当前值时兜底保留，避免已保存配置被清空 */}
            {form.model && !catalog.models.includes(form.model) && (
              <option value={form.model}>{form.model}{t('（当前）')}</option>
            )}
            {catalog.models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        ) : (
          <Input
            id="ai-model"
            value={form.model}
            onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
            placeholder={'deepseek-flash' + t('（点击上方按钮可自动列出可用模型）')}
            className="font-mono text-sm"
          />
        )}

        {/* 目录来源与更新时间 */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {modelError ? (
            <span className="text-destructive flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {modelError}
            </span>
          ) : catalog.models.length > 0 ? (
            <span className="flex items-center gap-1 text-muted-foreground">
              {catalog.source === 'remote' ? (
                <>
                  <CloudDownload className="h-3.5 w-3.5 shrink-0 text-success" />
                  {t('服务商实时列表 · ')}{catalog.models.length}{t(' 个模型 · 更新于 ')}{describeCatalogAge(catalog.fetchedAt)}
                  {catalog.stale && t('（已过期，建议刷新）')}
                </>
              ) : (
                <>
                  <Database className="h-3.5 w-3.5 shrink-0 text-warning" />
                  {t('内置参考列表 · ')}{catalog.models.length}{t(' 个模型（实时拉取失败，可手动输入）')}
                </>
              )}
            </span>
          ) : (
            <span className="text-muted-foreground flex items-center gap-1">
              <ListTree className="h-3.5 w-3.5 shrink-0" />
              {loadingModels
                ? t('正在从服务商获取最新模型列表…')
                : t('填入 Key 后自动列出该服务商的最新模型（随服务商更新）')}
            </span>
          )}
          {catalog.models.length > 0 && !manualModel && (
            <button type="button" onClick={() => setManualModel(true)} className="text-muted-foreground hover:text-foreground underline">
              {t('手动输入')}
            </button>
          )}
          {catalog.models.length > 0 && manualModel && (
            <button type="button" onClick={() => setManualModel(false)} className="text-muted-foreground hover:text-foreground underline">
              {t('返回列表选择')}
            </button>
          )}
        </div>

        {/* 已保存/正在填写的模型若已退役，给出迁移提示 */}
        {retiredModelHint(form.model) && (
          <p className="flex items-start gap-1.5 text-xs text-warning leading-relaxed">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>
              {t('模型 ')}<span className="font-mono">{form.model}</span>{t(' 已被服务商退役或更名，建议更换为 ')}
              <span className="font-mono">{retiredModelHint(form.model)}</span>{t('。')}
            </span>
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="thinking-intensity">{t('思考强度')}</Label>
          <span className="text-xs font-medium text-info">{t(THINKING_LABELS[mode])}</span>
        </div>
        <div className="border border-input bg-muted/20 px-3 py-3 space-y-2">
          <input
            id="thinking-intensity"
            type="range"
            min={0}
            max={3}
            step={1}
            value={THINKING_LEVELS.indexOf(mode)}
            aria-valuetext={t(THINKING_LABELS[mode])}
            aria-describedby="thinking-intensity-help"
            onChange={(e) => setForm((f) => ({ ...f, reasoningEffort: THINKING_LEVELS[Number(e.target.value)] }))}
            className="w-full cursor-pointer accent-[var(--info)]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            {THINKING_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                aria-pressed={mode === level}
                onClick={() => setForm((f) => ({ ...f, reasoningEffort: level }))}
                className={`min-h-8 min-w-8 rounded px-1 focus-visible:outline-2 focus-visible:outline-ring ${mode === level ? 'font-semibold text-info' : 'hover:text-foreground'}`}
              >
                {t(THINKING_LABELS[level])}
              </button>
            ))}
          </div>
          <p id="thinking-intensity-help" className="text-[11px] leading-relaxed text-muted-foreground">
            {THINKING_HELP[mode]}
          </p>
        </div>
        <p className="text-[11px] text-muted-foreground">
          {t('保存后生效，系统不会自动改变档位。强度越高通常耗时、用量越多；实际支持程度取决于模型，仅支持开关的接口会将低/中/高均映射为开启。')}
        </p>
      </div>

      <div className="space-y-2">
        <Label>{t('模型选择')}</Label>
        <button
          type="button"
          onClick={() => {
            const next = !autoModel;
            setAutoModel(next);
            writeAutoModel(next);
          }}
          aria-pressed={autoModel}
          className={`flex w-full items-start justify-between gap-3 border px-3 py-2 text-left transition-colors duration-[var(--duration-fast)] ${
            autoModel ? 'border-info bg-info/10' : 'border-input hover:border-info/50'
          }`}
        >
          <span>
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              {t('智能选模型（自动）')}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {t('按题目难度在已配置存档中自动路由：简单题用便宜快的模型，难题用旗舰推理模型。')}
            </span>
          </span>
          <span
            className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
              autoModel ? 'bg-info text-info-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {autoModel ? t('已开启') : t('手动')}
          </span>
        </button>
        {autoModel && (
          <p className="text-[11px] text-muted-foreground">
            {t('需至少配置 2 个模型存档才会真正路由；当前仅 1 个或 0 个时仍使用当前激活存档。手动选择存档依然可用。')}
          </p>
        )}
      </div>

      <div className="space-y-3 border-t border-border pt-4">
        <Label className="text-xs text-muted-foreground">{t('智能增强（榨干算力）')}</Label>

        <button
          type="button"
          onClick={() => {
            const next = !selfCheck;
            setSelfCheck(next);
            writeSelfCheck(next);
          }}
          aria-pressed={selfCheck}
          className={`flex w-full items-start justify-between gap-3 border px-3 py-2 text-left transition-colors duration-[var(--duration-fast)] ${
            selfCheck ? 'border-info bg-info/10' : 'border-input hover:border-info/50'
          }`}
        >
          <span>
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              {t('智能自检（自动复核）')}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {t('回答生成后自动再让模型复核一遍：揪出计算/逻辑错误、跳步或更优解，把额外算力花在「纠错题」上。')}
            </span>
          </span>
          <span
            className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
              selfCheck ? 'bg-info text-info-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {selfCheck ? t('已开启') : t('已关闭')}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            const next = !fallback;
            setFallback(next);
            writeFallback(next);
          }}
          aria-pressed={fallback}
          className={`flex w-full items-start justify-between gap-3 border px-3 py-2 text-left transition-colors duration-[var(--duration-fast)] ${
            fallback ? 'border-info bg-info/10' : 'border-input hover:border-info/50'
          }`}
        >
          <span>
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              {t('智能容错（失败自动切换）')}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {t('当前模型彻底失败时，自动用下一个已配置存档的模型重试，最大化「一定能拿到答案」的概率。')}
            </span>
          </span>
          <span
            className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
              fallback ? 'bg-info text-info-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {fallback ? t('已开启') : t('已关闭')}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            const next = !multiPath;
            setMultiPath(next);
            writeMultiPath(next);
          }}
          aria-pressed={multiPath}
          className={`flex w-full items-start justify-between gap-3 border px-3 py-2 text-left transition-colors duration-[var(--duration-fast)] ${
            multiPath ? 'border-info bg-info/10' : 'border-input hover:border-info/50'
          }`}
        >
          <span>
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              {t('多路径自洽（Self-Consistency）')}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {t('中高强度思考或难题时，并发生成多条独立思路，再由模型仲裁取最可靠答案——数学题正确率提升最明显。')}
            </span>
          </span>
          <span
            className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
              multiPath ? 'bg-info text-info-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {multiPath ? t('已开启') : t('已关闭')}
          </span>
        </button>

        {multiPath && (
          <div className="ml-1 flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground">{t('并发路数')}</span>
            <div className="flex gap-1">
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setMultiPathCount(n);
                    writeMultiPathCount(n);
                  }}
                  aria-pressed={multiPathCount === n}
                  className={`px-2.5 py-1 text-xs border transition-colors duration-[var(--duration-fast)] ${
                    multiPathCount === n
                      ? 'border-info bg-info/10 text-info'
                      : 'border-input text-muted-foreground hover:border-info/50'
                  }`}
                >
                  {n}{t(' 路')}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-warning">{t('约 ')}{multiPathCount}{t('× 算力')}</span>
          </div>
        )}
        {multiPath && (
          <p className="text-[11px] text-muted-foreground">
            {t('仅在中高强度思考或识别为难题（证明/计算/推导等）时生效；关闭或低强度且为简单题时自动跳过，不额外消耗算力。')}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            const next = !crossCheck;
            setCrossCheck(next);
            writeCrossCheck(next);
          }}
          aria-pressed={crossCheck}
          className={`flex w-full items-start justify-between gap-3 border px-3 py-2 text-left transition-colors duration-[var(--duration-fast)] ${
            crossCheck ? 'border-info bg-info/10' : 'border-input hover:border-info/50'
          }`}
        >
          <span>
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              {t('极致模式 · 双模型交叉验证')}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {t('用第二个已配置模型独立重做同一题，再交叉比对、标注分歧，把「单一模型唯一答案」的偶然错误风险降到最低。')}
            </span>
          </span>
          <span
            className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
              crossCheck ? 'bg-info text-info-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {crossCheck ? t('已开启') : t('已关闭')}
          </span>
        </button>
        {crossCheck && (
          <p className="text-[11px] text-muted-foreground">
            {t('需至少配置 2 个模型存档才会真正启用；否则自动跳过。开启后单题算力约 2–3 倍。')}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            const next = !link;
            setLink(next);
            writeLink(next);
          }}
          aria-pressed={link}
          className={`flex w-full items-start justify-between gap-3 border px-3 py-2 text-left transition-colors duration-[var(--duration-fast)] ${
            link ? 'border-info bg-info/10' : 'border-input hover:border-info/50'
          }`}
        >
          <span>
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              {t('多路径 + 交叉验证联动')}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {t('多路径生成的多份解答，改由【第二个已配置模型】独立仲裁（而非主模型自己合成）：兼得多路采样的多样性与第三方公正性。')}
            </span>
          </span>
          <span
            className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
              link ? 'bg-info text-info-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {link ? t('已开启') : t('已关闭')}
          </span>
        </button>
        {link && (
          <p className="text-[11px] text-muted-foreground">
            {t('需同时开启「多路径自洽」且至少 2 个已配置存档才会真正生效；否则自动回退为普通多路径合成。')}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            const next = !ragBoost;
            setRagBoost(next);
            writeRagBoost(next);
          }}
          aria-pressed={ragBoost}
          className={`flex w-full items-start justify-between gap-3 border px-3 py-2 text-left transition-colors duration-[var(--duration-fast)] ${
            ragBoost ? 'border-info bg-info/10' : 'border-input hover:border-info/50'
          }`}
        >
          <span>
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              {t('RAG 检索增强 · 难题专精')}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {t('中高强度思考或难题时，额外加强文档检索（召回更多相关段落）并强制依据资料作答、逐条注明出处，把权威资料用足。')}
            </span>
          </span>
          <span
            className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
              ragBoost ? 'bg-info text-info-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {ragBoost ? t('已开启') : t('已关闭')}
          </span>
        </button>
        {ragBoost && (
          <p className="text-[11px] text-muted-foreground">
            {t('仅在中高强度思考或识别为难题时生效（检索召回 4 → 8 段）；关闭或低强度且为简单题时自动跳过，不额外消耗 token。')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ai-key">API Key</Label>
        <div className="relative">
          <Input
            id="ai-key"
            type={showKey ? 'text' : 'password'}
            value={form.apiKey}
            onChange={(e) => setForm((f) => ({ ...f, apiKey: e.target.value }))}
            placeholder="sk-..."
            className="font-mono text-sm pr-10"
          />
          <button
            type="button"
            onClick={() => setShowKey((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showKey ? t('隐藏密钥') : t('显示密钥')}
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/60 px-3 py-2.5 leading-relaxed">
        <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-warning" />
        <span>
          {t('三个存档各自独立保存（含接口地址、模型、思考模式与密钥），只存在你自己的浏览器 localStorage，不会上传到服务器；请求由浏览器直连你所选服务商。')}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleSave}
          disabled={!form.apiKey.trim() || !form.baseUrl.trim() || !form.model.trim()}
          className="bg-info text-info-foreground hover:bg-info/90 gap-1.5"
        >
          <Save className="h-4 w-4" />
          {t('保存到') + t(AI_PROFILE_LABELS[slot]) + t('并启用')}
        </Button>
        {profiles[slot] && (
          <Button variant="outline" onClick={() => handleClear(slot)} className="gap-1.5">
            <Trash2 className="h-4 w-4" />
            {t('清除该存档')}
          </Button>
        )}
        {saved && (
          <span className="self-center text-xs text-success flex items-center gap-1">
            <Check className="h-3.5 w-3.5" />
            {t('已保存，可以开始提问了')}
          </span>
        )}
      </div>
    </div>
  );
};

export default AiSettingsCard;
