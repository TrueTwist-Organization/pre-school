import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sparkles, X, ArrowRight, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { Button, InteractiveVideo } from '@/components/ui';
import { navLinks, site } from '@/lib/content';
import { type StaticPage } from '@/components/site-pages';
import { cn, scrollToId } from '@/lib/utils';

const LoadingLogo = lazy(() => import('@/components/3d/LoadingLogo'));

export function triggerConfetti() {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B5DE5'];
  confetti({
    particleCount: 180,
    spread: 82,
    startVelocity: 34,
    origin: { y: 0.68 },
    colors,
    scalar: 1.1,
    ticks: 220
  });
}

export function LoadingScreen({
  active,
  onDone
}: {
  active: boolean;
  onDone: () => void;
}) {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    if (!active) return;

    setProgress(12);
    const start = window.setInterval(() => {
      setProgress((current) => {
        const next = current + (current < 55 ? 7 : current < 88 ? 4 : 1);
        if (next >= 100) {
          window.clearInterval(start);
          window.setTimeout(onDone, 220);
          return 100;
        }
        return next;
      });
    }, 90);

    return () => window.clearInterval(start);
  }, [active, onDone]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[180] flex items-center justify-center bg-skywash px-4"
        >
          <div className="w-full max-w-md text-center">
            <Suspense
              fallback={
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/70 shadow-soft">
                  <Sparkles className="h-10 w-10 animate-pulse text-purple" />
                </div>
              }
            >
              <LoadingLogo />
            </Suspense>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.35em] text-purple/75">Loading magic</p>
            <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/65 shadow-soft">
              <motion.div
                className="h-full rounded-full bg-rainbow"
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 140, damping: 22 }}
              />
            </div>
            <p className="mt-3 font-heading text-2xl text-ink">{progress}%</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Navbar({
  onEnrollNow
}: {
  onEnrollNow: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-[140] px-2 py-2 transition-all duration-300 sm:px-4 sm:py-3 md:px-6 md:py-4',
        scrolled ? 'bg-white/18 backdrop-blur-2xl' : 'bg-white/10 backdrop-blur-xl'
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between rounded-[1.25rem] border px-2 py-1.5 shadow-soft sm:px-4 sm:py-2.5 md:rounded-[2rem] md:px-5 md:py-3',
          scrolled ? 'border-white/35 bg-[#6a2cb5]/55' : 'border-white/40 bg-[#6a2cb5]/38'
        )}
      >
        <button
          type="button"
          onClick={() => scrollToId('home')}
          className="flex min-w-0 items-center gap-1.5 sm:gap-3"
          aria-label="NanhiDuniya Preschool home"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.85rem] bg-white/80 shadow-soft sm:h-12 sm:w-12 sm:rounded-[1.2rem]">
            <div className="relative h-6 w-6 sm:h-8 sm:w-8">
              <div className="absolute left-1 top-0 h-2.5 w-2.5 rounded-full bg-blush shadow-[0_8px_18px_rgba(212,165,165,0.45)] sm:h-3 sm:w-3" />
              <div className="absolute right-1 top-0 h-2.5 w-2.5 rounded-full bg-blush shadow-[0_8px_18px_rgba(212,165,165,0.45)] sm:h-3 sm:w-3" />
              <div className="absolute inset-1 rounded-full bg-rainbow shadow-soft" />
              <div className="absolute left-2 top-2.5 h-1.5 w-1.5 rounded-full bg-white sm:left-2.5 sm:top-3" />
              <div className="absolute right-2 top-2.5 h-1.5 w-1.5 rounded-full bg-white sm:right-2.5 sm:top-3" />
              <div className="absolute bottom-1.5 left-1/2 h-1.5 w-3.5 -translate-x-1/2 rounded-full bg-white/90 sm:bottom-2 sm:h-2 sm:w-4" />
            </div>
          </div>
          <div className="min-w-0 text-left">
            <p className="truncate font-heading text-[13px] leading-none text-white sm:text-lg">NanhiDuniya</p>
            <p className="truncate text-[8px] font-medium uppercase tracking-[0.08em] text-[#F4C430] sm:text-xs sm:tracking-[0.24em]">Preschool</p>
          </div>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollToId(link.href.slice(1))}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 hover:text-[#F4C430]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="secondary" onClick={() => scrollToId('contact')}>
            <Phone className="h-4 w-4" />
            Contact
          </Button>
          <Button onClick={onEnrollNow}>
            Enroll Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border shadow-soft sm:h-11 sm:w-11 lg:hidden',
            'border-white/30 bg-white/15 text-white'
          )}
        >
          {menuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="mx-auto mt-3 max-w-7xl rounded-[1.6rem] border border-white/70 bg-white/90 p-3 shadow-soft backdrop-blur-2xl sm:p-4 lg:hidden"
          >
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    scrollToId(link.href.slice(1));
                    setMenuOpen(false);
                  }}
                  className="rounded-2xl px-4 py-3 text-left font-semibold text-ink transition hover:bg-paper"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => {
                  scrollToId('contact');
                  setMenuOpen(false);
                }}
              >
                <Phone className="h-4 w-4" />
                Contact
              </Button>
              <Button
                fullWidth
                onClick={() => {
                  onEnrollNow();
                  setMenuOpen(false);
                }}
              >
                Enroll Now
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function HeroSection({
  onEnrollNow: _onEnrollNow
}: {
  onEnrollNow: () => void;
}) {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <InteractiveVideo
          className="h-full w-full object-cover"
          autoPlay
          loop
          playsInline
          src="/new-hero-video.mp4"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),transparent_34%)]" />
      </div>

      {/* Hero Text Content */}
      <div className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F4C430]/90 px-5 py-2 text-sm font-black text-[#1A1A2E] shadow-lg backdrop-blur-sm"
        >
          <span className="animate-bounce text-base">🌟</span>
          Admissions Open 2026–27
          <span className="animate-bounce text-base">🌟</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-heading text-4xl font-black leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Welcome to{' '}
          <span className="text-white">
            NanhiDuniya
          </span>
          <br />
          Preschool
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={_onEnrollNow}
            className="rounded-full bg-[#F4C430] px-8 py-3.5 text-base font-black text-[#1A1A2E] shadow-[0_8px_30px_rgba(244,196,48,0.55)] transition hover:bg-[#FFD93D]"
          >
            🎒 Admission Enquiry
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export function FloatingTourButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-5 right-5 z-[130] shadow-lift"
      aria-label="Book a school tour"
    >
      <Sparkles className="h-4 w-4" />
      Book a School Tour
    </Button>
  );
}

export function Footer({ onOpenStaticPage }: { onOpenStaticPage: (page: StaticPage) => void }) {
  const phoneDigits = site.phone.replace(/\D/g, '');
  const socialLinks = [
    {
      icon: FaInstagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/'
    },
    {
      icon: FaFacebookF,
      label: 'Facebook',
      href: 'https://www.facebook.com/'
    },
    {
      icon: FaYoutube,
      label: 'YouTube',
      href: 'https://www.youtube.com/'
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: `https://wa.me/${phoneDigits}?text=${encodeURIComponent(`Hi ${site.name}, I would like to know more about admissions.`)}`
    }
  ];

  return (
    <footer className="relative mt-8 py-10" style={{ background: 'rgba(255,247,238,0.18)' }}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center md:grid-cols-[1fr_auto_auto] md:items-center md:px-6 md:text-left">
        <div>
          <p className="font-heading text-xl text-white sm:text-2xl">{site.name}</p>
          <p className="mt-1 text-sm text-[#F4C430]">
            {site.city} • {site.motto}
          </p>
        </div>
        <div className="text-sm text-white/75">
          <p>{site.address}</p>
          <p>{site.phone}</p>
        </div>
        <div className="flex items-center justify-center gap-3 md:justify-end">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-soft transition hover:-translate-y-1 hover:bg-[#F4C430] hover:text-[#1A1A2E]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 md:justify-end md:px-6">
        <button
          type="button"
          onClick={() => onOpenStaticPage('about-us')}
          className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/20"
        >
          About Us
        </button>
        <button
          type="button"
          onClick={() => onOpenStaticPage('privacy-policy')}
          className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/20"
        >
          Privacy Policy
        </button>
        <button
          type="button"
          onClick={() => onOpenStaticPage('disclaimer')}
          className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/20"
        >
          Disclaimer
        </button>
      </div>
    </footer>
  );
}
