import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Footer, HeroSection, Navbar, triggerConfetti } from '@/components/layout';
import { Button, GlassCard, InteractiveVideo } from '@/components/ui';
import { ProgramDetailPage, getProgramPath, getProgramTitleFromPath, type ProgramTitle } from '@/components/programs';
import { FacilityDetailPage, getFacilityPath, getFacilityTitleFromPath, type FacilityId } from '@/components/facilities';
import { AdmissionDetailPage, getAdmissionPath, getAdmissionStepFromPath, type AdmissionStep } from '@/components/admission';
import { StaticPageView, getStaticPageFromPath, getStaticPath, type StaticPage } from '@/components/site-pages';
import { facilities } from '@/lib/content';
import { scrollToId } from '@/lib/utils';
import { useLenis } from '@/hooks';

const Sections = lazy(() => import('@/components/sections'));

const HOME_TITLE = 'NanhiDuniya Preschool | Ahmedabad, Gujarat';

export default function App() {
  useLenis(true);

  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const syncPath = () => {
      setPathname(window.location.pathname);
    };

    syncPath();
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const programTitle = useMemo(() => getProgramTitleFromPath(pathname), [pathname]);
  const facilityId = useMemo(() => getFacilityTitleFromPath(pathname), [pathname]);
  const admissionStep = useMemo(() => getAdmissionStepFromPath(pathname), [pathname]);
  const staticPage = useMemo(() => getStaticPageFromPath(pathname), [pathname]);
  const facilityName = useMemo(() => facilities.find((facility) => facility.id === facilityId)?.title, [facilityId]);
  const isProgramPage = Boolean(programTitle);
  const isFacilityPage = Boolean(facilityId);
  const isAdmissionPage = Boolean(admissionStep);
  const isStaticPage = Boolean(staticPage);

  useEffect(() => {
    document.title = isProgramPage
      ? `${programTitle} | NanhiDuniya Preschool`
      : isFacilityPage && facilityName
        ? `${facilityName} | NanhiDuniya Preschool`
        : isAdmissionPage && admissionStep
          ? `${admissionStep} | NanhiDuniya Preschool`
          : isStaticPage && staticPage
            ? `${staticPage.replace('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())} | NanhiDuniya Preschool`
          : HOME_TITLE;
  }, [admissionStep, facilityName, isAdmissionPage, isFacilityPage, isProgramPage, isStaticPage, programTitle, staticPage]);

  const handleEnrollNow = useCallback(() => {
    triggerConfetti();

    if (isProgramPage || isFacilityPage || isAdmissionPage) {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.setTimeout(() => {
        scrollToId('contact');
      }, 60);
      return;
    }

    scrollToId('contact');
  }, [isAdmissionPage, isFacilityPage, isProgramPage]);

  const handleOpenProgram = useCallback((title: ProgramTitle) => {
    window.history.pushState({}, '', getProgramPath(title));
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenFacility = useCallback((id: FacilityId) => {
    window.history.pushState({}, '', getFacilityPath(id));
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenAdmission = useCallback((step: AdmissionStep) => {
    window.history.pushState({}, '', getAdmissionPath(step));
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenStaticPage = useCallback((page: StaticPage) => {
    window.history.pushState({}, '', getStaticPath(page));
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackHome = useCallback(() => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-ink">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <InteractiveVideo
          className="h-full w-full object-cover"
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster="/site-bg.png"
          src="/new-global-bg.mp4"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,238,0.16)_0%,rgba(255,247,238,0.08)_38%,rgba(255,247,238,0.22)_100%)]" />
      </div>

      <div className="relative z-10">
        {isProgramPage && programTitle ? (
          <ProgramDetailPage
            programTitle={programTitle}
            onEnrollNow={handleEnrollNow}
            onBack={handleBackHome}
          />
        ) : isFacilityPage && facilityId ? (
          <FacilityDetailPage
            facilityId={facilityId}
            onEnrollNow={handleEnrollNow}
            onBack={handleBackHome}
          />
        ) : isAdmissionPage && admissionStep ? (
          <AdmissionDetailPage
            step={admissionStep}
            onEnrollNow={handleEnrollNow}
            onBack={handleBackHome}
          />
        ) : isStaticPage && staticPage ? (
          <StaticPageView page={staticPage} onBack={handleBackHome} />
        ) : (
          <>
            <Navbar onEnrollNow={handleEnrollNow} />

            <main className="relative z-10">
              <HeroSection onEnrollNow={handleEnrollNow} />

              <Suspense fallback={<SectionsSkeleton />}>
                <Sections onEnrollNow={handleEnrollNow} onOpenProgram={handleOpenProgram} onOpenFacility={handleOpenFacility} onOpenAdmission={handleOpenAdmission} />
              </Suspense>
            </main>

            <div className="relative z-10">
              <Footer onOpenStaticPage={handleOpenStaticPage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SectionsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: index * 0.15 }}
          >
            <GlassCard className="h-64 overflow-hidden">
              <div className="h-full rounded-[1.6rem] bg-white/60 p-5">
                <div className="h-4 w-28 rounded-full bg-white/85" />
                <div className="mt-5 h-8 w-48 rounded-full bg-white/75" />
                <div className="mt-4 h-3 w-4/5 rounded-full bg-white/70" />
                <div className="mt-3 h-3 w-3/4 rounded-full bg-white/70" />
                <div className="mt-8 h-28 rounded-[1.5rem] bg-gradient-to-r from-white/70 via-white/85 to-white/70 bg-[length:200%_100%] animate-shimmer" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="secondary">
          <Sparkles className="h-4 w-4" />
          Loading sections
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
