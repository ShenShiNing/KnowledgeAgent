import {
  HomeCapabilitiesSection,
  HomeCtaSection,
  HomeFooter,
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#050605_0%,#050605_100%)]" />
        <div className="absolute left-1/2 top-[-16rem] h-[34rem] w-[58rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,255,22,0.14),transparent_64%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.04]" />
        <div className="absolute inset-x-0 top-[34rem] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-70" />
      </div>

      <main>
        <HomeHero hasAuthSession={hasAuthSession} />
        <HomeWorkflowSection />
        <HomeCapabilitiesSection hasAuthSession={hasAuthSession} />
        <HomeCtaSection hasAuthSession={hasAuthSession} />
      </main>

      <HomeFooter hasAuthSession={hasAuthSession} />
    </div>
  );
};

export default HomePage;
