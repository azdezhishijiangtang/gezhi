import { Link } from 'react-router-dom';
import { Heart, HandCoins, Video, Sigma, Atom, Bot, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import { useT } from '@/i18n/LocaleContext';

const interests = [
  {
    icon: Sigma,
    title: '热爱数学',
    desc: '从高等数学到抽象代数，相信每一个公式背后都有值得讲述的故事，也把它讲得人人能懂。',
  },
  {
    icon: Atom,
    title: '热爱物理',
    desc: '从牛顿力学到量子世界，痴迷于用最简洁的原理描述最复杂的自然现象。',
  },
  {
    icon: Bot,
    title: '热爱 AI',
    desc: '探索人工智能与教育的结合，用 AI 让答疑更即时、让学习更个性化。',
  },
];

const About = () => {
  const t = useT();
  return (
    <div className="container py-10 lg:py-14 max-w-4xl">
      {/* 页头 */}
      <FadeIn>
        <p className="text-sm font-semibold text-info tracking-wide mb-2">ABOUT THE DEVELOPER</p>
        <h1 className="font-serif text-3xl font-semibold">{t('关于开发者')}</h1>
      </FadeIn>

      {/* 开发者名片 */}
      <FadeIn delay={0.05}>
        <div className="mt-8 border border-border bg-card p-6 lg:p-8">
          <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-center">
            <span className="flex h-16 w-16 items-center justify-center bg-info/10 text-info shrink-0">
              <Video className="h-8 w-8" />
            </span>
            <div>
              <h2 className="font-serif text-2xl font-semibold">{t('阿z的知识讲堂')}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t('B 站 UP 主 · 数学物理知识科普与讲解创作者')}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t('大家好，我是 B 站 UP 主')}
                <span className="text-foreground font-medium mx-1">{t('「阿z的知识讲堂」')}</span>
                {t('，一名热爱数学、物理与 AI 的创作者。Principia（数学物理讲堂）就是我把课堂讲解沉淀下来的成果——希望每一位来到这里的同学，都能用更低的门槛理解那些曾经"高不可攀"的概念。')}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 三个热爱 */}
      <Stagger className="mt-6 grid gap-4 sm:grid-cols-3" stagger={0.08}>
        {interests.map(({ icon: Icon, title, desc }) => (
          <HoverLift key={title}>
            <div className="h-full border border-border bg-card p-5">
              <span className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary mb-3">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">{t(title)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
            </div>
          </HoverLift>
        ))}
      </Stagger>

      {/* 心愿 */}
      <FadeIn delay={0.1}>
        <div className="mt-6 border border-border bg-card p-6 lg:p-8">
          <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-info" />
            {t('我的心愿：免费的关注就是最大的鼓励')}
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {t('做内容不易，但我最大的心愿其实很简单——')}
            <span className="text-foreground font-medium">{t('希望得到大家免费的关注')}</span>
            {t('。如果你还没有关注我的 B 站账号「阿z的知识讲堂」，欢迎去点个关注，你的每一次关注都是我持续更新课程视频与网站内容的动力。')}
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {t('如果这个网站对你真的很有帮助，也可以选择给我打赏，请根据自身情况量力而行——')}
            <span className="text-foreground font-medium">{t('如果你喜欢白嫖，开发者也完全不介意哦')}</span>
            {t('。知识本就应该自由流动，能帮到你，我就很开心了。')}
          </p>
        </div>
      </FadeIn>

      {/* 行动按钮 */}
      <FadeIn delay={0.15}>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/donate" className="flex items-center gap-2">
              <HandCoins className="h-5 w-5" />
              {t('打赏开发者')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/custom" className="flex items-center gap-2">
              {t('功能定制与需求共建')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
          <Heart className="h-3.5 w-3.5 text-destructive" />
          {t('每一份支持，无论大小，都会变成这里更多更好的课程内容。')}
        </p>
      </FadeIn>
    </div>
  );
};

export default About;
