import { Link } from 'react-router-dom';
import {
  MessageCircle,
  ClipboardCheck,
  Wrench,
  Rocket,
  Users,
  Info,
  QrCode,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import { useT } from '@/i18n/LocaleContext';

const steps = [
  {
    icon: MessageCircle,
    title: '第一步 · 提出需求',
    desc: '你有想加的功能或想法，扫描下方二维码添加我的微信，把需求描述给我。',
  },
  {
    icon: ClipboardCheck,
    title: '第二步 · 评估可行性',
    desc: '我会认真评估需求的技术可行性、与网站的契合度以及开发工作量。',
  },
  {
    icon: Wrench,
    title: '第三步 · 定制开发',
    desc: '达成一致后，我按需求进行定制开发，过程中与你保持沟通确认效果。',
  },
  {
    icon: Rocket,
    title: '第四步 · 上架共建',
    desc: '功能开发完成后上架到本站，作为共建内容供所有用户使用，你的名字也会被记住。',
  },
];

const Custom = () => {
  const t = useT();
  return (
    <div className="container py-10 lg:py-14 max-w-4xl">
      {/* 页头 */}
      <FadeIn>
        <p className="text-sm font-semibold text-info tracking-wide mb-2">CO-BUILD &amp; CUSTOM</p>
        <h1 className="font-serif text-3xl font-semibold">{t('功能定制与需求共建')}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
          {t('你希望这个网站有什么新功能？提出你的想法，我们一起把它变成现实——定制开发完成后会作为')}
          <span className="text-foreground font-medium">{t('共建内容')}</span>
          {t('上架到本站，供所有用户免费使用。')}
        </p>
      </FadeIn>

      {/* 流程 */}
      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.08}>
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <HoverLift key={title}>
            <div className="h-full border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center bg-info/10 text-info shrink-0">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{t(title)}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
              {i === 0 && (
                <p className="mt-2 text-xs text-info font-medium">{t('↓ 微信二维码见下方')}</p>
              )}
            </div>
          </HoverLift>
        ))}
      </Stagger>

      {/* 微信二维码 */}
      <FadeIn delay={0.1}>
        <div className="mt-8 border border-border bg-card p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-5">
            <QrCode className="h-5 w-5 text-success" />
            <h2 className="font-serif text-xl font-semibold">{t('添加开发者微信')}</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="border border-border bg-background p-3 max-w-xs w-full shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}images/wechat-qr.png`}
                alt={t('开发者微信二维码')}
                className="w-full h-auto"
                loading="eager"
              />
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              <p className="text-foreground font-medium mb-2">{t('扫一扫上面的二维码，添加我为朋友。')}</p>
              <p>
                {t('添加时请备注「')}
                <span className="text-foreground">{t('功能定制')}</span>
                {t('」，并简单描述你想加的功能，')}
                {t('例如：新的计算工具、可视化演示、学习小模块……只要是合理可行的想法，都可以聊。')}
              </p>
              <p className="mt-3">
                {t('你的需求被采纳并开发完成后，将以「共建功能」的形式上线本站，')}
                <span className="text-foreground font-medium">{t('供全体用户免费使用')}</span>
                {t('——你的一个点子，会让所有人都受益。')}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 说明 */}
      <FadeIn delay={0.15}>
        <div className="mt-6 border border-warning/30 bg-warning/5 p-5 flex gap-3">
          <Info className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <p className="font-medium text-foreground">{t('关于费用')}</p>
            <p className="mt-1 text-muted-foreground">
              {t('功能定制属于')}
              <span className="text-foreground font-medium">{t('个人技术服务')}</span>
              {t('，费用根据需求复杂度与开发工作量')}
              <span className="text-foreground font-medium">{t('单独沟通')}</span>
              {t('，评估阶段不收取任何费用。简单的小想法也许很快就能实现，欢迎随时来聊。')}
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline">
            <Link to="/about" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {t('了解开发者')}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/donate">{t('打赏开发者')}</Link>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
};

export default Custom;
