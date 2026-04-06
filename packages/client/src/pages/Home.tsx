import {
  HomeCapabilitiesSection,
  HomeCtaSection,
  HomeFooter,
  HomeProofSection,
  HomeWorkflowSection,
} from '@/components/home/HomeSections';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeNavbar } from '@/components/home/HomeNavbar';
import { useAuthStore } from '@/stores';

const HomePage = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasAuthSession = isAuthenticated || !!accessToken;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-(--home-app-bg) text-(--home-text-strong)">
      <HomeNavbar hasAuthSession={hasAuthSession} />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#09090b_0%,#111113_48%,#09090b_100%)]" />
        <div className="absolute -left-28 top-20 h-112 w-md rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_72%)] blur-3xl" />
        <div className="absolute -right-28 -top-16 h-120 w-120 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_72%)] blur-3xl" />
        <div className="absolute left-1/2 top-104 h-144 w-5xl -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_76%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[72px_72px] opacity-[0.05]" />
        <div className="absolute inset-y-0 left-[max(1rem,calc(50%-580px))] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-80" />
        <div className="absolute inset-y-0 right-[max(1rem,calc(50%-580px))] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-80" />
        <div className="absolute inset-x-0 top-152 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-70" />
      </div>

      <main>
        <HomeHero hasAuthSession={hasAuthSession} />
        <HomeProofSection />
        <HomeWorkflowSection />
        <HomeCapabilitiesSection hasAuthSession={hasAuthSession} />
        <HomeCtaSection hasAuthSession={hasAuthSession} />
      </main>

      <HomeFooter hasAuthSession={hasAuthSession} />
    </div>
  );
};

export default HomePage;
