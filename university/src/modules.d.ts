/** 无自带类型声明的第三方模块（用于导出 Word 时的 LaTeX→OMML 转换） */
declare module 'temml' {
  export function renderToString(tex: string, options?: Record<string, unknown>): string;
}

declare module 'mathml2omml' {
  export function mml2omml(mathml: string): string;
}
