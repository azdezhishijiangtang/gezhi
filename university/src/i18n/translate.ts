/**
 * UI 文案国际化：以「中文字面量 → 英文」查表实现。
 * 用法：组件内 `const t = useT();` 后，把可见中文串包成 `t('导出 Word')`。
 * 英文模式下命中词典即返回英文；未翻译的串原样返回（不会白屏）。
 *
 * 词典按文件拆分到 ./zh2en/*.ts（每个 UI 文件对应一个词典片段），
 * 用 Vite import.meta.glob 自动聚合，便于并行翻译且不互相冲突。
 */
import { isEn } from './lang';

type Dict = Record<string, string>;

const modules = import.meta.glob<{ default?: Dict }>('./zh2en/*.ts', {
  eager: true,
});

const dict: Dict = {};
for (const mod of Object.values(modules)) {
  if (mod.default) Object.assign(dict, mod.default);
}

/** 翻译可见字符串；非英文模式或未命中词典时原样返回 */
export function translate(value: string): string {
  if (isEn() && value && dict[value] != null) return dict[value];
  return value;
}

/** 带占位符的模板翻译：tpl('已导出 {n} 条', { n: 3 }) */
export function tpl(template: string, vars: Record<string, string | number>): string {
  let out = translate(template);
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{${k}}`).join(String(v));
  }
  return out;
}
