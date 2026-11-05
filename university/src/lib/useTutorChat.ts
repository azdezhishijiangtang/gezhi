/**
 * 答疑对话核心：流式对话 + 知识点上下文 + 文档知识库检索（RAG）+ 记忆沉淀。
 * Tutor 答疑台与全局悬浮"问 AI"组件共用本 hook，保证行为一致。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  readAiConfig,
  readAiProfiles,
  readProfileConfig,
  readAutoModel,
  readSelfCheck,
  readFallback,
  readMultiPath,
  readMultiPathCount,
  readCrossCheck,
  readLink,
  readRagBoost,
  pickAutoProfile,
  streamChat,
  chatOnce,
  classifyDifficulty,
  type ChatMeta,
  describeAiError,
  MATH_TUTOR_SYSTEM_PROMPT,
  getModeGuidance,
  resolveThinkingMode,
  SELF_CHECK_PROMPT,
  MULTI_PATH_SOLVE_PROMPT,
  MULTI_PATH_SYNTH_PROMPT,
  CROSS_CHECK_SOLVE_PROMPT,
  CROSS_CHECK_VERIFY_PROMPT,
  LINK_SYNTH_PROMPT,
  RAG_BOOST_PROMPT,
  RAG_BOOST_TOPK,
  type ChatMessage,
  type AiConfig,
  type AiProfile,
  type ThinkingMode,
} from '@/lib/ai';
import { addQaEntry, type QaSource } from '@/lib/qaHistory';
import { retrieveChunks } from '@/lib/docLibrary';
import { getTopic } from '@/data/topics';
import { getCourse } from '@/data/courses';
import { localizeTopic, localizeCourse } from '@/i18n/data';
import { useLocale } from '@/i18n/LocaleContext';
import type { Topic } from '@/types';

export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
  /** 模型的思考过程（assistant 消息，来自 reasoning_content） */
  reasoning?: string;
  /** 思考开始时间戳（epoch ms，用于思考面板实时计时） */
  reasoningStartedAt?: number;
  /** 思考耗时（ms，生成结束后写入；思考与作答交错时取首尾区间） */
  reasoningMs?: number;
  /** 回答引用的文档段落（assistant 消息） */
  sources?: QaSource[];
  /** 接入的模型名（assistant 消息） */
  model?: string;
  /** 本次回答实际采用的思考强度，由用户手动选择 */
  mode?: ThinkingMode;
  /** 本次是否由「智能选模型」自动挑了模型（仅模型层面，思考模式始终手动） */
  auto?: boolean;
  /** 智能自检的复核结果（assistant 消息） */
  selfCheck?: string;
  /** 多路径自洽：本次并发求解的路数（>=2 表示真正启用），仅深度/难题时生效 */
  multiPath?: number;
  /** 多路径自洽：各路独立解答原文（用于折叠展开查看） */
  paths?: string[];
  /** 极致模式·双模型交叉验证：第二模型独立做出的解答原文 */
  crossCheck?: string;
  /** 极致模式·双模型交叉验证：第二模型的名称 */
  crossModel?: string;
  /** 多路径+交叉验证联动：本次是否由独立第二模型仲裁多路径（而非主模型合成） */
  link?: boolean;
  /** 多路径+交叉验证联动：执行仲裁的第二模型名称 */
  linkModel?: string;
  /** token 用量（assistant 消息） */
  usage?: { prompt: number; completion: number; total: number };
  /** 用户消息附带的图片（data URL） */
  images?: string[];
}

/** 待发送的图片附件 */
export interface ChatImage {
  id: string;
  name: string;
  dataUrl: string;
}

export type TutorStatus = 'idle' | 'searching' | 'generating';

export interface UseTutorChatOptions {
  /** 归属用户 id（或 'guest'） */
  userId: string;
  /** 知识点上下文 id（可选） */
  topicId?: string | null;
  /** 正在阅读的小节标题（可选，来自 TopicDetail 的"问 AI 这一节"） */
  section?: string | null;
  /** 是否启用文档检索，默认 true */
  useDocs?: boolean;
  /** 发送前回调（如聚焦输入框） */
  onBeforeSend?: () => void;
}

/** 快捷追问指令（UI 层展示用） */
export const QUICK_FOLLOWUPS = [
  { label: '用更简单的话解释', prompt: '上面的内容我没太看懂，请用更简单直白的话（配合生活例子）重新解释一遍。' },
  { label: '举个具体例子', prompt: '请针对上面的内容举一个具体的数值例子，完整演算一遍。' },
  { label: '分步骤教我', prompt: '请把这个问题的思路拆成有序的步骤，每一步说明为什么这么做，带我完整推一遍。' },
  { label: '我算错了吗', prompt: '这是我的演算过程，请帮我检查哪里出错了，并说明正确的做法。' },
  { label: '总结成要点', prompt: '请把上面的讲解总结成便于复习的要点清单（含关键公式）。' },
];

export const useTutorChat = (options: UseTutorChatOptions) => {
  const { userId, topicId = null, section = null, useDocs = true } = options;

  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [status, setStatus] = useState<TutorStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  // ── 图片附件 / 会话用量 / 模型名 ──
  const [images, setImages] = useState<ChatImage[]>([]);
  const [sessionUsage, setSessionUsage] = useState({ prompt: 0, completion: 0, total: 0 });
  const [lastModel, setLastModel] = useState<string | undefined>(undefined);
  const addImages = useCallback((files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    setImages((prev) => {
      const room = 4 - prev.length;
      return [
        ...prev,
        ...list.slice(0, Math.max(0, room)).map((f) => ({
          id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: f.name,
          dataUrl: URL.createObjectURL(f),
        })),
      ];
    });
  }, []);
  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((im) => im.id !== id));
  }, []);
  const abortRef = useRef<AbortController | null>(null);

  const { lang } = useLocale();
  const topic: Topic | undefined = useMemo(
    () => (topicId ? localizeTopic(getTopic(topicId)!) : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 本地化模型名/提示词依赖语言，lang 变了必须重算
    [topicId, lang],
  );
  const course = useMemo(
    () => (topic ? localizeCourse(getCourse(topic.courseId)!) : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 本地化模型名/提示词依赖语言，lang 变了必须重算
    [topic, lang],
  );

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;
      const cfg = readAiConfig();
      if (!cfg) {
        setError('请先配置 API Key：打开答疑台或设置面板填写任一 OpenAI 兼容服务商的密钥。');
        return;
      }

      options.onBeforeSend?.();

      // ── 智能选模型（在手动之上加智能，不替换手动）──
      // 开启「智能选模型」时，按题目难度在已配置存档中自动路由：
      // 简单题用便宜快的模型，困难题用旗舰推理模型，把算力用在刀刃上。
      const autoModelOn = readAutoModel();
      let effectiveCfg = cfg;
      if (autoModelOn) {
        const idx = pickAutoProfile(trimmed, readAiProfiles());
        const picked = idx >= 0 ? readProfileConfig(idx) : null;
        if (picked) effectiveCfg = { ...picked, reasoningEffort: resolveThinkingMode(cfg) };
      }

      // 思考强度由用户手动选择；自动路由只更换模型，不改变用户档位。
      const effMode = resolveThinkingMode(effectiveCfg);
      const intensive = effMode === 'medium' || effMode === 'high';
      const autoUsed = autoModelOn; // auto 仅表示本次由「智能选模型」自动挑了模型
      const modeGuidance = getModeGuidance(effMode);
      const systemPrompt = `${MATH_TUTOR_SYSTEM_PROMPT()}\n\n${modeGuidance}`;
      const history: ChatMessage[] = [
        { role: 'system', content: systemPrompt },
      ];
      if (topic) {
        history.push({
          role: 'system',
          content: `学生正在学习知识点「${topic.title}」（${course?.name ?? ''} · ${topic.chapter}）。本知识点提要：${topic.summary}\n讲解要点：${topic.keyPoints.join('；')}`,
        });
      }
      if (section) {
        history.push({
          role: 'system',
          content: `学生正在重点阅读「${topic?.title ?? '本知识点'}」中的「${section}」一节。如果问题涉及该节内容，请优先结合这一节展开讲解，并可提示学生回到该节复习。`,
        });
      }

      // ── 文档知识库检索 ──
      let sources: QaSource[] = [];
      if (useDocs) {
        setStatus('searching');
        try {
          // RAG 难题专精：深度思考/难题时召回更多段落，把权威资料用足（topK 4 → 8）
          const ragBoostOn = readRagBoost();
          const hardQ = intensive || classifyDifficulty(trimmed) === 'hard';
          const topK = ragBoostOn && hardQ ? RAG_BOOST_TOPK : 4;
          const hits = await retrieveChunks(userId, trimmed, topK);
          if (hits.length > 0) {
            sources = hits.map((h) => ({
              docId: h.chunk.docId,
              docName: h.chunk.docName,
              snippet: h.chunk.text.slice(0, 140),
            }));
            const docContext = hits
              .map(
                (h, i) =>
                  `【资料 ${i + 1}】摘自学生上传的《${h.chunk.docName}》：\n${h.chunk.text}`,
              )
              .join('\n\n');
            const baseReq = `学生上传了学习资料。以下是与问题最相关的段落：\n\n${docContext}\n\n回答要求：优先依据上述资料作答并注明出处（如"根据《XX》…"）；资料未覆盖的内容用你的知识补充，并明确区分哪些来自资料、哪些是你的补充。若资料与问题无关，忽略资料直接回答。`;
            const boostReq = ragBoostOn && hardQ
              ? `\n\n${RAG_BOOST_PROMPT()}`
              : '';
            history.push({
              role: 'system',
              content: baseReq + boostReq,
            });
          }
        } catch {
          /* 检索失败不阻塞答疑 */
        }
      }

      history.push(...messages.map((m) => ({ role: m.role, content: m.content })));
      if (images.length > 0) {
        history.push({
          role: 'user',
          content: [
            { type: 'text', text: trimmed || '请看这些图片' },
            ...images.map((im) => ({ type: 'image_url', image_url: { url: im.dataUrl } })),
          ] as unknown as string,
        });
      } else {
        history.push({ role: 'user', content: trimmed });
      }

      setMessages((prev) => [
        ...prev,
        { role: 'user', content: trimmed, images: images.length > 0 ? images.map((im) => im.dataUrl) : undefined },
        { role: 'assistant', content: '', mode: effMode, auto: autoUsed },
      ]);
      setImages([]);
      setInput('');
      setError(null);
      setStreaming(true);
      setStatus('generating');

      const controller = new AbortController();
      abortRef.current = controller;
      let acc = '';
      let reasoningAcc = '';
      /** 思考过程的时间区间：首个 reasoning 增量开始，首个正文增量结束 */
      let reasoningStart = 0;
      let reasoningEnd = 0;
      let modelName: string | undefined;
      let lastUsage: { prompt: number; completion: number; total: number } | undefined;
      let usedCfg = effectiveCfg;
      /** 多路径自洽：本次路数与各路原始解答 */
      let multiCount = 0;
      let paths: string[] = [];
      /** 极致模式·双模型交叉验证：第二模型的解答与名称 */
      let crossCheck: string | undefined;
      let crossModel: string | undefined;

      const isAborted = (e: unknown): boolean => e instanceof DOMException && e.name === 'AbortError';

      // ── 智能容错：候选模型列表（当前/自动选定的模型优先，其余已配置模型按序兜底）──
      const allValid = readAiProfiles().filter(
        (p): p is AiProfile => Boolean(p && p.baseUrl && p.apiKey && p.model),
      );
      const candidates: AiConfig[] = [effectiveCfg];
      for (const p of allValid) {
        const c: AiConfig = { baseUrl: p.baseUrl, apiKey: p.apiKey, model: p.model, reasoningEffort: effMode };
        if (c.baseUrl !== effectiveCfg.baseUrl || c.model !== effectiveCfg.model) candidates.push(c);
      }

      /** 把当前 acc / reasoning / usage 反映到占位消息（避免重复写大对象） */
      const paint = (extra: Partial<TutorMessage> = {}) =>
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            {
              ...last,
              content: acc,
              reasoning: reasoningAcc,
              sources,
              mode: effMode,
              auto: autoUsed,
              ...(lastUsage ? { usage: lastUsage } : {}),
              ...extra,
            },
          ];
        });

      /** 流式生成并把增量写回 UI（用于正式回答 / 合成 / 验证等任何阶段的产出） */
      const streamInto = async (cfg: AiConfig, msgs: ChatMessage[]): Promise<void> => {
        for await (const chunk of streamChat(
          cfg,
          msgs,
          controller.signal,
          (meta: ChatMeta) => {
            if (meta.model) {
              modelName = meta.model;
              setLastModel(meta.model);
            }
            if (meta.usage) {
              lastUsage = meta.usage;
              setSessionUsage((u) => ({
                prompt: u.prompt + meta.usage!.prompt,
                completion: u.completion + meta.usage!.completion,
                total: u.total + meta.usage!.total,
              }));
            }
          },
          (r: string) => {
            // 实时把思考增量写回 UI：推理模型常常先只输出 reasoning_content，
            // 若等到正文出现再刷新，思考过程就无法「同步显示」。
            if (!reasoningStart) reasoningStart = Date.now();
            reasoningAcc += r;
            paint({ reasoningStartedAt: reasoningStart });
          },
        )) {
          // 正文开始输出，视为思考阶段结束（交错输出时以首个正文为准）
          if (reasoningStart && !reasoningEnd) reasoningEnd = Date.now();
          acc += chunk;
          paint();
        }
      };

      // ══ 第一步：主回答 ══
      // 多路径自洽（仅深度思考 / 难题时）：并发 K 路独立求解 → 仲裁合成
      const multiPathOn = readMultiPath();
      const linkOn = readLink();
      const doMulti = multiPathOn && (intensive || classifyDifficulty(trimmed) === 'hard');
      let didMulti = false;
      /** 多路径+交叉验证联动：本次是否由独立第二模型仲裁（兼得多路多样性与第三方公正性） */
      let linkUsed = false;
      let linkModelName: string | undefined;
      if (doMulti) {
        const K = readMultiPathCount();
        try {
          const solveSystem = `${MATH_TUTOR_SYSTEM_PROMPT()}\n\n${modeGuidance}\n\n${MULTI_PATH_SOLVE_PROMPT()}`;
          const solveHistory: ChatMessage[] = [{ role: 'system', content: solveSystem }, ...history.slice(1)];
          const solves = await Promise.all(
            Array.from({ length: K }, async () => {
              try {
                return await chatOnce(effectiveCfg, solveHistory, controller.signal, { temperature: 0.75 });
              } catch (e) {
                if (isAborted(e)) throw e;
                return null;
              }
            }),
          );
          const got = solves.filter((s): s is string => typeof s === 'string' && s.trim().length > 0);
          if (got.length >= 2) {
            paths = got;
            multiCount = got.length;
            // 联动：用第二个已配置模型对多份解答做独立仲裁；否则主模型合成
            let synthCfg = effectiveCfg;
            const second = allValid.find((p) => p.baseUrl !== effectiveCfg.baseUrl || p.model !== effectiveCfg.model);
            if (linkOn && second) {
              synthCfg = { baseUrl: second.baseUrl, apiKey: second.apiKey, model: second.model, reasoningEffort: effMode };
              linkUsed = true;
              linkModelName = second.model;
            }
            const synthPrompt = linkUsed ? LINK_SYNTH_PROMPT() : MULTI_PATH_SYNTH_PROMPT();
            const synthHistory: ChatMessage[] = [
              { role: 'system', content: `${MATH_TUTOR_SYSTEM_PROMPT()}\n\n${modeGuidance}\n\n${synthPrompt}` },
              {
                role: 'user',
                content: `原始问题：\n${trimmed}\n\n以下是 ${got.length} 份独立解答：\n\n${got
                  .map((p, i) => `【解答 ${i + 1}】\n${p}`)
                  .join('\n\n---\n\n')}`,
              },
            ];
            acc = '';
            reasoningAcc = '';
            reasoningStart = 0;
            reasoningEnd = 0;
            await streamInto(synthCfg, synthHistory);
            if (acc.trim()) {
              usedCfg = synthCfg;
              didMulti = true;
              modelName = modelName ?? linkModelName ?? effectiveCfg.model;
              paint({
                multiPath: multiCount,
                paths,
                ...(linkUsed ? { link: true, linkModel: linkModelName } : {}),
              });
            }
          }
        } catch (e) {
          if (isAborted(e)) {
            setStreaming(false);
            setStatus('idle');
            abortRef.current = null;
            return;
          }
          /* 多路径异常则回退到常规单路生成 */
        }
      }

      // 未走多路径（关闭 / 简单题 / 多路径不足 2 路）：常规单路流式 + 智能容错
      if (!didMulti) {
        let lastErr: unknown = null;
        let succeeded = false;
        for (let ci = 0; ci < candidates.length; ci++) {
          const cfg = candidates[ci];
          try {
            acc = '';
            reasoningAcc = '';
            reasoningStart = 0;
            reasoningEnd = 0;
            lastUsage = undefined;
            await streamInto(cfg, history);
            usedCfg = cfg;
            succeeded = true;
            break;
          } catch (err) {
            lastErr = err;
            const aborted = isAborted(err);
            if (acc || reasoningAcc || aborted) break;
            if (ci < candidates.length - 1 && readFallback()) {
              setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content: '', mode: effMode, auto: autoUsed }]);
              continue;
            }
            break;
          }
        }
        if (!succeeded) {
          if (!acc && !reasoningAcc) setMessages((prev) => prev.slice(0, -1));
          setError(describeAiError(lastErr));
          setStreaming(false);
          setStatus('idle');
          abortRef.current = null;
          return;
        }
        paint();
      }

      // ══ 第二步：极致模式 · 双模型交叉验证 ══
      // 用第二个已配置模型独立重做同一题，再交叉比对、标注分歧（需至少 2 个存档）
      const crossOn = readCrossCheck();
      if (crossOn && acc.trim()) {
        const second = allValid.find((p) => p.baseUrl !== usedCfg.baseUrl || p.model !== usedCfg.model);
        if (second) {
          const secondCfg: AiConfig = { baseUrl: second.baseUrl, apiKey: second.apiKey, model: second.model, reasoningEffort: effMode };
          try {
            const secondSystem = `${MATH_TUTOR_SYSTEM_PROMPT()}\n\n${modeGuidance}\n\n${CROSS_CHECK_SOLVE_PROMPT()}`;
            const secondHistory: ChatMessage[] = [{ role: 'system', content: secondSystem }, ...history.slice(1)];
            const secondSolve = await chatOnce(secondCfg, secondHistory, controller.signal);
            if (secondSolve.trim()) {
              crossModel = second.model;
              crossCheck = secondSolve;
              const verifyHistory: ChatMessage[] = [
                { role: 'system', content: `${MATH_TUTOR_SYSTEM_PROMPT()}\n\n${modeGuidance}\n\n${CROSS_CHECK_VERIFY_PROMPT()}` },
                {
                  role: 'user',
                  content: `原始问题：\n${trimmed}\n\n【模型A 解答】\n${acc}\n\n【模型B（${second.model}）解答】\n${secondSolve}`,
                },
              ];
              // 用主模型把两份答案比对、仲裁，输出最终权威解答，并保留第二模型原文供查看
              const prevAcc = acc;
              acc = '';
              try {
                await streamInto(usedCfg, verifyHistory);
                if (!acc.trim()) acc = prevAcc;
              } catch (e) {
                if (isAborted(e)) {
                  setStreaming(false);
                  setStatus('idle');
                  abortRef.current = null;
                  return;
                }
                // 验证失败：回退到主回答（仍保留第二模型解答供查看）
                acc = prevAcc;
              }
              paint({ crossCheck, crossModel });
            }
          } catch (e) {
            if (isAborted(e)) {
              setStreaming(false);
              setStatus('idle');
              abortRef.current = null;
              return;
            }
            /* 第二模型失败：不影响主回答 */
          }
        }
      }

      // 收尾：确保思考过程与正文完整保留，且不覆盖已有的 usage / 模型信息
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return [
          ...prev.slice(0, -1),
          {
            role: 'assistant',
            content: acc,
            reasoning: reasoningAcc,
            ...(reasoningStart
              ? {
                  reasoningStartedAt: reasoningStart,
                  reasoningMs: (reasoningEnd || Date.now()) - reasoningStart,
                }
              : {}),
            sources,
            model: last?.model ?? modelName,
            usage: last?.usage ?? lastUsage,
            mode: effMode,
            auto: autoUsed,
            ...(multiCount ? { multiPath: multiCount, paths } : {}),
            ...(crossModel ? { crossCheck, crossModel } : {}),
          },
        ];
      });

      // ── 智能自检：回答生成后自动复核（榨干算力的纠错关键）──
      if (readSelfCheck() && acc.trim()) {
        try {
          const checkHistory: ChatMessage[] = [
            { role: 'system', content: `${MATH_TUTOR_SYSTEM_PROMPT()}\n\n${modeGuidance}` },
            { role: 'user', content: trimmed },
            { role: 'assistant', content: acc },
            { role: 'user', content: SELF_CHECK_PROMPT() },
          ];
          let checkAcc = '';
          for await (const c of streamChat(usedCfg, checkHistory, controller.signal)) {
            checkAcc += c;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              return [...prev.slice(0, -1), { ...last, selfCheck: checkAcc }];
            });
          }
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            return [...prev.slice(0, -1), { ...last, selfCheck: checkAcc }];
          });
        } catch {
          /* 自检失败不影响主回答 */
        }
      }

      addQaEntry({
        userId,
        question: trimmed,
        answer: acc,
        courseId: topic?.courseId,
        topicId: topic?.id,
        topicTitle: topic?.title,
        sources: sources.length > 0 ? sources : undefined,
        model: modelName ?? lastModel,
        // 学习档案留存：token 消耗量与思考过程
        usage: lastUsage,
        ...(reasoningAcc.trim() ? { thinking: reasoningAcc } : {}),
      });
      setStreaming(false);
      setStatus('idle');
      abortRef.current = null;
    },
    [streaming, messages, topic, course, userId, useDocs, options, images, lastModel, section],
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const clear = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  /** 重新生成最后一轮回答 */
  const regenerate = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser || streaming) return;
    setMessages((prev) => prev.slice(0, -2));
    send(lastUser.content);
  }, [messages, streaming, send]);

  return {
    messages,
    input,
    setInput,
    streaming,
    status,
    error,
    setError,
    send,
    stop,
    clear,
    regenerate,
    topic,
    course,
    images,
    addImages,
    removeImage,
    sessionUsage,
    lastModel,
  };
};
