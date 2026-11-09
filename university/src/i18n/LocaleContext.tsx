/**
 * 语言上下文：在 React 树中提供 lang / setLang / t。
 * 切换语言时上下文值变化，所有 useLocale()/useT() 消费者自动重渲染，
 * 从而让 UI 文案与（通过 hooks 访问的）知识库数据同步切换。
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { type Lang, currentLang, setLangValue } from './lang';
import { translate, tpl } from './translate';
import { loadEnData } from './dataEn';

interface LocaleValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** 翻译可见字符串 */
  t: (value: string) => string;
  /** 带占位符的模板翻译 */
  tpl: (template: string, vars: Record<string, string | number>) => string;
  /** 当前是否英文模式 */
  isEn: boolean;
  /** 英文知识库数据的加载版本；加载完成后自增，驱动 useMemo 重算本地化数据 */
  enVersion: number;
}

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // 初始语言：优先取链接里的 ?lang=en / ?lang=zh（方便直接分享英文版链接），
  // 否则用上次保存的语言。放在 useState 惰性初始化里而不是 effect 中，
  // 避免首帧先按旧语言渲染再级联重渲染。
  const [lang, setLangState] = useState<Lang>(() => {
    const param = new URLSearchParams(window.location.search).get('lang');
    if ((param === 'en' || param === 'zh') && param !== currentLang()) {
      setLangValue(param);
      document.documentElement.lang = param === 'en' ? 'en' : 'zh-CN';
      return param;
    }
    return currentLang();
  });

  const [enVersion, setEnVersion] = useState(0);

  // 同步 <html lang>。原实现只在「首次初始化且 ?lang 与已存语言不同」时设置，
  // 导致：已保存英文的用户直接打开英文版，或用 ?lang=en 分享链接时，
  // <html lang> 仍停在 index.html 写死的 zh-CN，屏幕阅读器会用中文发音读英文。
  // 改为订阅 lang 变化（含首帧）统一同步，覆盖所有进入路径。
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  }, [lang]);

  // 英文知识库数据约 4.6 MB，只在真正切到英文时才下载。
  // 中文用户首屏不发起任何英文数据请求；英文数据填充到可变映射后，
  // 通过 enVersion 自增触发一次重渲染，让所有 useMemo 重新做本地化合并。
  // 加载失败时保持中文回退，不白屏、不阻塞界面。
  useEffect(() => {
    if (lang !== 'en') return;
    let cancelled = false;
    void loadEnData()
      .then(() => { if (!cancelled) setEnVersion((v) => v + 1); })
      .catch(() => { /* 英文数据缺失时回退中文，界面仍可用 */ });
    return () => { cancelled = true; };
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangValue(next);
    setLangState(next);
    // 同步 <html lang> 属性，利于无障碍与 SEO
    document.documentElement.lang = next === 'en' ? 'en' : 'zh-CN';
  }, []);

  const value = useMemo<LocaleValue>(
    () => ({
      lang,
      setLang,
      t: translate,
      tpl,
      isEn: lang === 'en',
      enVersion,
    }),
    [lang, setLang, enVersion],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** 读取语言上下文；未包裹 Provider 时退化为直接读模块级语言 */
export function useLocale(): LocaleValue {
  const ctx = useContext(LocaleContext);
  if (ctx) return ctx;
  const lang = currentLang();
  return {
    lang,
    setLang: setLangValue,
    t: translate,
    tpl,
    isEn: lang === 'en',
    enVersion: 0,
  };
}

/** 便捷钩子：返回翻译函数 t（订阅语言变化） */
export function useT(): (value: string) => string {
  return useLocale().t;
}
