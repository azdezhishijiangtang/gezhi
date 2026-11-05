import {
  TrendingUp,
  Grid3x3,
  Dice5,
  Share2,
  Sigma,
  Compass,
  Waves,
  Activity,
  Orbit,
  Layers,
  Scale,
  Braces,
  CircleDot,
  Ruler,
  ChartLine,
  Shuffle,
  Blocks,
  GitBranch,
  Hash,
  Target,
  Lock,
  Database,
  BookOpen,
  Atom,
  Zap,
  Flame,
  Telescope,
  Microscope,
  Binary,
  Box,
  FunctionSquare,
  Radiation,
  Gauge,
  type LucideIcon,
} from 'lucide-react';

/** 课程图标注册表（图标名 → lucide 组件） */
const iconRegistry: Record<string, LucideIcon> = {
  'trending-up': TrendingUp,
  'grid-3x3': Grid3x3,
  'dice-5': Dice5,
  'share-2': Share2,
  sigma: Sigma,
  compass: Compass,
  waves: Waves,
  activity: Activity,
  orbit: Orbit,
  layers: Layers,
  scale: Scale,
  braces: Braces,
  'circle-dot': CircleDot,
  ruler: Ruler,
  'chart-line': ChartLine,
  shuffle: Shuffle,
  blocks: Blocks,
  'git-branch': GitBranch,
  hash: Hash,
  target: Target,
  lock: Lock,
  database: Database,
  atom: Atom,
  zap: Zap,
  flame: Flame,
  telescope: Telescope,
  microscope: Microscope,
  binary: Binary,
  box: Box,
  'function-square': FunctionSquare,
  radiation: Radiation,
  gauge: Gauge,
};

interface CourseIconProps {
  /** 图标名（见 iconRegistry） */
  name: string;
  className?: string;
}

/** 课程图标：未注册的名称回退为默认书籍图标（纯装饰性图标，对辅助技术隐藏） */
const CourseIcon = ({ name, className = 'h-5 w-5' }: CourseIconProps) => {
  const Icon = iconRegistry[name] ?? BookOpen;
  return <Icon className={className} strokeWidth={2} aria-hidden="true" />;
};

export default CourseIcon;
