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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6f0e6_0%,#f3ede3_28%,#f7f2ea_60%,#efe6d8_100%)]" />
        <div className="absolute -left-18 top-12 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92),transparent_72%)] blur-3xl" />
        <div className="absolute -right-12 top-0 h-108 w-108 rounded-full bg-[radial-gradient(circle,rgba(225,200,163,0.5),transparent_72%)] blur-3xl motion-reduce:animate-none animate-[home-drift_18s_ease-in-out_infinite]" />
        <div className="absolute left-1/2 top-82 h-144 w-6xl -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,157,98,0.18),transparent_74%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(93,68,39,0.032)_1px,transparent_1px),linear-gradient(to_bottom,rgba(93,68,39,0.032)_1px,transparent_1px)] bg-size-[72px_72px] opacity-35" />
        <div className="absolute inset-y-0 left-[max(1rem,calc(50%-580px))] w-px bg-[linear-gradient(180deg,transparent,rgba(93,68,39,0.1),transparent)] opacity-65" />
        <div className="absolute inset-y-0 right-[max(1rem,calc(50%-580px))] w-px bg-[linear-gradient(180deg,transparent,rgba(93,68,39,0.1),transparent)] opacity-65" />
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
