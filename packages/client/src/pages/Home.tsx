import {
  HomeCapabilitiesSection,
  HomeCtaSection,
  HomeFaqSection,
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
        <div className="absolute inset-0 bg-[var(--home-backdrop-base)]" />
        <div className="absolute -left-18 top-12 h-88 w-88 rounded-full bg-[var(--home-backdrop-glow-left)] blur-3xl" />
        <div className="absolute -right-12 top-0 h-96 w-96 rounded-full bg-[var(--home-backdrop-glow-right)] blur-3xl motion-reduce:animate-none animate-[home-drift_18s_ease-in-out_infinite]" />
        <div className="absolute left-1/2 top-82 h-132 w-272 -translate-x-1/2 rounded-full bg-[var(--home-backdrop-glow-center)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--home-backdrop-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--home-backdrop-grid)_1px,transparent_1px)] bg-size-[80px_80px] opacity-28" />
      </div>

      <main>
        <HomeHero hasAuthSession={hasAuthSession} />
        <HomeProofSection />
        <HomeWorkflowSection />
        <HomeCapabilitiesSection hasAuthSession={hasAuthSession} />
        <HomeFaqSection />
        <HomeCtaSection hasAuthSession={hasAuthSession} />
      </main>

      <HomeFooter hasAuthSession={hasAuthSession} />
    </div>
  );
};

export default HomePage;
