/**
 * 语言上下文：在 React 树中提供 lang / setLang / t。
 * 切换语言时上下文值变化，所有 useLocale()/useT() 消费者自动重渲染，
 * 从而让 UI 文案与（通过 hooks 访问的）知识库数据同步切换。
 */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { type Lang, currentLang, setLangValue } from './lang';
import { translate, tpl } from './translate';

interface LocaleValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** 翻译可见字符串 */
  t: (value: string) => string;
  /** 带占位符的模板翻译 */
  tpl: (template: string, vars: Record<string, string | number>) => string;
  /** 当前是否英文模式 */
  isEn: boolean;
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
    }),
    [lang, setLang],
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
  };
}

/** 便捷钩子：返回翻译函数 t（订阅语言变化） */
export function useT(): (value: string) => string {
  return useLocale().t;
}
