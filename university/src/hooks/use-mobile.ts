import * as React from "react"

const MOBILE_BREAKPOINT = 768

/** 订阅视口宽度变化；使用 matchMedia 而非 window resize，回调更少且语义更准 */
function subscribe(onChange: () => void) {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

function getSnapshot() {
  return window.innerWidth < MOBILE_BREAKPOINT
}

/**
 * 是否移动端视口。
 *
 * 用 useSyncExternalStore 直接读取外部系统（视口宽度），而不是「effect 里
 * setState 同步一遍」——后者会在挂载时多触发一次级联渲染，首帧还会闪成
 * 桌面布局。
 */
export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false)
}
