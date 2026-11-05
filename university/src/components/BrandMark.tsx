/**
 * Principia 品牌标：深空渐变盾牌 + 轨道天体（致敬《自然哲学的数学原理》的天体轨道）。
 * 纯 SVG、无主题依赖，浅色/深色下均保持高级感。
 */
import { useId } from 'react';

interface BrandMarkProps {
  className?: string;
}

const BrandMark = ({ className = 'h-9 w-9' }: BrandMarkProps) => {
  // 用 useId 生成唯一前缀，避免同一页面多次渲染 BrandMark 时
  // 多个 <svg> 的渐变 id（pia-bg / pia-glass / pia-sun）互相冲突
  const uid = useId().replace(/[:]/g, '');
  const bg = `pia-bg-${uid}`;
  const glass = `pia-glass-${uid}`;
  const sun = `pia-sun-${uid}`;

  return (
    <svg
      viewBox="0 0 36 36"
      className={className}
      role="img"
      aria-label="Principia"
    >
      <defs>
        {/* 盾牌：三段深空渐变 */}
        <linearGradient id={bg} x1="0" y1="0" x2="0.65" y2="1">
          <stop offset="0%" stopColor="#4a5a80" />
          <stop offset="45%" stopColor="#27314e" />
          <stop offset="100%" stopColor="#0d1524" />
        </linearGradient>
        {/* 左上玻璃高光 */}
        <radialGradient id={glass} cx="0.22" cy="0.14" r="0.95">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        {/* 中心恒星 */}
        <radialGradient id={sun} cx="0.38" cy="0.34" r="0.9">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="42%" stopColor="#f7bd3d" />
          <stop offset="100%" stopColor="#cf7f0b" />
        </radialGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill={`url(#${bg})`} />
      <rect width="36" height="36" rx="9" fill={`url(#${glass})`} />
      <rect
        x="0.5"
        y="0.5"
        width="35"
        height="35"
        rx="8.5"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.14"
        strokeWidth="1"
      />
      <g transform="rotate(-24 18 18.5)">
        {/* 轨道环 */}
        <ellipse
          cx="18"
          cy="18.5"
          rx="10.6"
          ry="6.8"
          fill="none"
          stroke="#e8edf6"
          strokeOpacity="0.8"
          strokeWidth="1.15"
        />
        {/* 行星轨迹的金色弧段 */}
        <ellipse
          cx="18"
          cy="18.5"
          rx="10.6"
          ry="6.8"
          pathLength="100"
          fill="none"
          stroke="#f2b53a"
          strokeWidth="1.7"
          strokeDasharray="12 88"
          strokeDashoffset="-6.5"
        />
        {/* 中心恒星（含柔光） */}
        <circle cx="18" cy="18.5" r="5.5" fill="#f7bd3d" fillOpacity="0.11" />
        <circle cx="18" cy="17.9" r="4.2" fill={`url(#${sun})`} />
        <circle cx="16.6" cy="16.4" r="1.2" fill="#fffdf2" fillOpacity="0.95" />
        {/* 行星 */}
        <circle cx="26.1" cy="22.9" r="2" fill="#f8fafc" />
      </g>
    </svg>
  );
};

export default BrandMark;
