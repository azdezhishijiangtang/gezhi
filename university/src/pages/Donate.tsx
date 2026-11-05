import { Link } from 'react-router-dom';
import { HandCoins, Heart, Coffee, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/MotionPrimitives';
import { useT } from '@/i18n/LocaleContext';

const Donate = () => {
  const t = useT();
  return (
    <div className="container py-10 lg:py-14 max-w-3xl">
      {/* 页头 */}
      <FadeIn>
        <p className="text-sm font-semibold text-info tracking-wide mb-2">SUPPORT THE CREATOR</p>
        <h1 className="font-serif text-3xl font-semibold">{t('打赏开发者')}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
          {t('创作不易。如果 Principia 对你真的有帮助，可以根据自身情况打赏感谢哦——每一笔心意都会变成更用心更新的动力。')}
        </p>
      </FadeIn>

      {/* 打赏码卡片 */}
      <FadeIn delay={0.05}>
        <div className="mt-8 border border-border bg-card p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-5">
            <HandCoins className="h-5 w-5 text-warning" />
            <h2 className="font-serif text-xl font-semibold">{t('扫码打赏')}</h2>
          </div>
          <div className="flex justify-center">
            <div className="border border-border bg-background p-3 max-w-sm w-full">
              <img
                src={`${import.meta.env.BASE_URL}images/donate-code.png`}
                alt={t('开发者赞赏码')}
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          </div>
          <p className="mt-5 text-center text-sm text-muted-foreground italic">
            {t('"创作不易，如果感到对你有帮助，可以根据自身情况打赏感谢哦"')}
          </p>
        </div>
      </FadeIn>

      {/* 三条说明 */}
      <FadeIn delay={0.1}>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="border border-border bg-card p-5">
            <Coffee className="h-5 w-5 text-warning mb-2" />
            <h3 className="font-semibold text-sm">{t('完全自愿')}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              {t('打赏与否、金额多少完全由你决定，请根据自身情况量力而行。')}
            </p>
          </div>
          <div className="border border-border bg-card p-5">
            <ShieldCheck className="h-5 w-5 text-success mb-2" />
            <h3 className="font-semibold text-sm">{t('白嫖也没关系')}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              {t('如果你喜欢白嫖，开发者也完全不介意——免费使用本站的一切内容就好。')}
            </p>
          </div>
          <div className="border border-border bg-card p-5">
            <Heart className="h-5 w-5 text-destructive mb-2" />
            <h3 className="font-semibold text-sm">{t('关注也是一种支持')}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              {t('去 B 站关注「阿z的知识讲堂」，免费的关注同样是最大的鼓励。')}
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline">
            <Link to="/about">{t('了解开发者')}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/custom">{t('功能定制与需求共建')}</Link>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
};

export default Donate;
