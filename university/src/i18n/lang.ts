/**
 * 全局语言状态（模块级单例 + localStorage 持久化）。
 * 中文为默认；切换为英文时，UI 文案与知识库数据均按英文呈现。
 * 模块级变量让非 React 上下文（AI 提示词、Word 导出等）也能读取当前语言。
 */

export type Lang = 'zh' | 'en';

const KEY = 'principia-lang';

function read(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'en' || v === 'zh') return v;
  } catch {
    /* 忽略隐私模式等异常 */
  }
  return 'zh';
}

let lang: Lang = read();

/** 读取当前语言（任意上下文可用） */
export const currentLang = (): Lang => lang;

/** 是否为英文模式 */
export const isEn = (): boolean => lang === 'en';

/** 设置语言并持久化 */
export const setLangValue = (next: Lang): void => {
  lang = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* 忽略 */
  }
};
