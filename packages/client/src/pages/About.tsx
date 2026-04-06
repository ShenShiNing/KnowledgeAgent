import { Link } from '@tanstack/react-router';
import { ArrowRight, Database, FileSearch, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HomeNavbar } from '@/components/home/HomeNavbar';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores';

const principles = [
  {
    titleKey: 'about.principle.trusted.title',
    descriptionKey: 'about.principle.trusted.description',
    icon: ShieldCheck,
  },
  {
    titleKey: 'about.principle.knowledge.title',
    descriptionKey: 'about.principle.knowledge.description',
    icon: Database,
  },
  {
    titleKey: 'about.principle.semantic.title',
    descriptionKey: 'about.principle.semantic.description',
    icon: FileSearch,
  },
] as const;

export default function AboutPage() {
  const { t } = useTranslation(['home', 'common']);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasAuthSession = isAuthenticated || !!accessToken;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <HomeNavbar hasAuthSession={hasAuthSession} mode="home" />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-176 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <main className="container pt-20 pb-16 md:pt-24 md:pb-24">
        <section className="mx-auto max-w-5xl">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t('about.hero.title')}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {t('about.hero.description')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button className="cursor-pointer" asChild>
              <Link to={hasAuthSession ? '/dashboard' : '/auth/signup'}>
                {hasAuthSession ? t('about.action.dashboard') : t('about.action.signup')}
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button variant="outline" className="cursor-pointer" asChild>
              <Link to="/knowledge-bases">{t('about.action.viewKnowledgeBases')}</Link>
            </Button>
          </div>
        </section>

        <section className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3">
          {principles.map(({ titleKey, descriptionKey, icon: Icon }) => (
            <article key={titleKey} className="rounded-2xl border bg-card/80 p-6">
              <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <h2 className="text-base font-semibold">{t(titleKey)}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(descriptionKey)}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
