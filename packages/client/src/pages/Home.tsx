import {
  HomeFooter,
  HomePrinciplesSection,
  HomeReleaseSection,
  HomeShowcaseSection,
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
        <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_18%_10%,rgba(182,143,77,0.16),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(255,255,255,0.72),transparent_18%),linear-gradient(180deg,#f5f0e6_0%,#f3eee4_62%,#f3eee4_100%)] dark:bg-[radial-gradient(circle_at_18%_10%,rgba(215,178,106,0.12),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(180deg,#100d09_0%,#0f0d0a_62%,#0f0d0a_100%)]" />
        <div className="absolute inset-x-6 top-28 h-px bg-[linear-gradient(90deg,transparent,rgba(23,21,18,0.16),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,244,230,0.14),transparent)]" />
        <div className="absolute left-[-6rem] top-[26rem] h-64 w-64 rounded-full bg-[rgba(182,143,77,0.12)] blur-3xl dark:bg-[rgba(215,178,106,0.08)]" />
        <div className="absolute right-[-8rem] top-[48rem] h-72 w-72 rounded-full bg-[rgba(255,255,255,0.4)] blur-3xl dark:bg-[rgba(255,255,255,0.06)]" />
      </div>

      <main>
        <HomeHero hasAuthSession={hasAuthSession} />
        <HomeShowcaseSection />
        <HomeReleaseSection hasAuthSession={hasAuthSession} />
        <HomePrinciplesSection hasAuthSession={hasAuthSession} />
      </main>

      <HomeFooter hasAuthSession={hasAuthSession} />
    </div>
  );
};

export default HomePage;
