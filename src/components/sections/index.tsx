import { type ComponentType, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  BookOpenText,
  Brain,
  Brush,
  CheckCircle2,
  ClipboardPenLine,
  MapPin,
  Music4,
  Phone,
  ShieldCheck,
  Stars,
  Mail,
  X
} from 'lucide-react';
import { Button, Input, Textarea, InteractiveVideo } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  facilities,
  features,
  mapEmbedUrl,
  programs,
  site,
  testimonials,
  steps
} from '@/lib/content';

type SectionsProps = { onEnrollNow: () => void; onOpenProgram: (title: (typeof programs)[number]['title']) => void; onOpenFacility: (id: (typeof facilities)[number]['id']) => void; onOpenAdmission: (step: (typeof steps)[number]) => void };

export default function Sections({ onEnrollNow, onOpenProgram, onOpenFacility, onOpenAdmission }: SectionsProps) {
  return (
    <>
      <AboutSection />
      <ProgramsSection onOpenProgram={onOpenProgram} />
      <ActivitiesSection />
      <FacilitiesSection onOpenFacility={onOpenFacility} />
      <ParentsMeetingSection />
      <TestimonialsSection />
      <AdmissionSection onOpenAdmission={onOpenAdmission} />
      <ContactSection onEnrollNow={onEnrollNow} />
    </>
  );
}

/* ─────────── SHARED ─────────── */

function AnimatedWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = text.split(' ');

  return (
    <span ref={ref} className={cn('inline', className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-[0.25em] inline-block"
          initial={{ opacity: 0, y: 24, rotate: -4 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function FloatSymbol({
  symbol,
  className,
  delay = 0
}: {
  symbol: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={cn('pointer-events-none absolute select-none font-black leading-none', className)}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 240, damping: 16 }}
      animate={{ y: [0, -8, 0] }}
    >
      {symbol}
    </motion.span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
  light = false
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl text-center">
      <FloatSymbol symbol="+" className={cn('left-1 top-3 hidden text-4xl sm:block', light ? 'text-white/35' : 'text-[#F4C430]/55')} delay={0.1} />
      <FloatSymbol symbol="×" className={cn('right-2 top-0 hidden text-3xl sm:block', light ? 'text-white/30' : 'text-[#E8602C]/50')} delay={0.2} />
      <FloatSymbol symbol="○" className={cn('left-6 bottom-0 hidden text-2xl sm:block', light ? 'text-white/28' : 'text-[#1565C0]/45')} delay={0.16} />
      <FloatSymbol symbol="◆" className={cn('right-6 bottom-0 hidden text-xl sm:block', light ? 'text-[#F4C430]/55' : 'text-[#2E7D32]/45')} delay={0.26} />

      <motion.span
        initial={{ opacity: 0, scale: 0.75, y: 10 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.5, type: 'spring', stiffness: 220 }}
        className={cn(
          'mb-4 inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-xs font-black uppercase tracking-[0.28em]',
          light ? 'bg-[#F4C430] text-[#1A1A2E]' : 'bg-[#F4C430] text-[#1A1A2E]'
        )}
      >
        <span className="h-2 w-2 rounded-full bg-current opacity-70" />
        {eyebrow}
        <span className="h-2 w-2 rounded-full bg-current opacity-70" />
      </motion.span>

      <div className="relative">
        <h2
          className={cn('font-heading text-4xl font-black leading-tight sm:text-5xl lg:text-6xl', light ? 'text-white' : 'text-[#1A1A2E]')}
          style={{
            textShadow: light
              ? '0 10px 36px rgba(24, 6, 64, 0.42), 0 0 22px rgba(255,255,255,0.12)'
              : '0 5px 18px rgba(10,4,40,0.18), 0 1px 2px rgba(10,4,40,0.10)'
          }}
        >
          <AnimatedWords text={title} />
        </h2>
        <motion.span
          className={cn('mx-auto mt-3 block h-[5px] rounded-full', light ? 'bg-[#F4C430]' : 'bg-[#F4C430]')}
          initial={{ width: 0 }}
          animate={inView ? { width: '64px' } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        />
      </div>

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25 }}
          className={cn(
            'mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-lg sm:leading-8',
            light ? 'text-white/82' : 'text-[#1A1A2E]/92'
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}

/* ─────────── ABOUT ─────────── */

const featureDetails: Record<string, { emoji: string; color: string; tagline: string; points: string[]; video: string }> = {
  'Safety First': {
    emoji: '🛡️',
    color: '#E8602C',
    tagline: 'Your child\'s safety is our highest priority — always.',
    video: '/safety-first-bg.mp4',
    points: [
      '🚪 Secure entry & exit gates with ID verification',
      '📹 CCTV monitoring across all classrooms & corridors',
      '🧸 Child-safe rounded furniture and foam flooring',
      '🩺 First-aid trained staff on campus at all times',
      '🔥 Fire safety equipment and regular safety drills',
      '🌡️ Hygienic, sanitized environment maintained daily',
      '👮 Trained security personnel at all entry points',
      '📱 Parents notified instantly for any concern'
    ]
  },
  'Play-based Learning': {
    emoji: '🎨',
    color: '#F4C430',
    tagline: 'Learning that feels like play — because the best learning does.',
    video: '/play-based-learning-bg.mp4',
    points: [
      '🧩 Montessori-inspired hands-on activities daily',
      '🎭 Role play, storytelling & dramatic play sessions',
      '🖌️ Creative arts, crafts & sensory exploration',
      '🌳 Outdoor discovery & nature learning experiences',
      '🎵 Music, movement & rhythm activities every week',
      '📚 Early literacy & numeracy through fun games',
      '🤝 Collaborative group projects & teamwork skills',
      '💡 Problem-solving puzzles & brain-development toys'
    ]
  },
  'CCTV & Security': {
    emoji: '📷',
    color: '#1565C0',
    tagline: 'Complete visibility, complete peace of mind for parents.',
    video: '/cctv-security-bg.mp4',
    points: [
      '📹 HD cameras installed in every classroom & corridor',
      '🔐 Biometric / ID-based entry & exit for all visitors',
      '📲 Parents can request live camera footage anytime',
      '🚨 Emergency alert system for rapid response',
      '👁️ 24/7 monitored security with no blind spots',
      '🛂 Only authorized pickup persons allowed',
      '🔒 Encrypted, private footage — never shared publicly',
      '🧑‍✈️ Dedicated security staff present throughout the day'
    ]
  },
  'Nutritious Meals': {
    emoji: '🥗',
    color: '#2E7D32',
    tagline: 'Healthy, tasty meals that fuel growing minds & bodies.',
    video: '/nutritious-meals-bg.mp4',
    points: [
      '🥦 Freshly cooked balanced meals prepared daily on-site',
      '🧑‍⚕️ Menu designed by certified child nutritionist',
      '🚫 Strictly no junk food, artificial colors or preservatives',
      '🥛 Morning snack, nutritious lunch & evening snack served',
      '🌾 Seasonal, locally-sourced fresh ingredients used',
      '⚠️ Allergy-aware cooking — special dietary needs handled',
      '🍱 Hygienic kitchen with regular health inspections',
      '💧 Purified drinking water available throughout the day'
    ]
  }
};

function AboutSection() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const detail = selectedFeature ? featureDetails[selectedFeature] : null;

  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden px-4 py-12 md:px-6 lg:py-16"
      style={{ background: 'rgba(255,247,238,0.16)' }}
    >
      <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[#F4C430]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#E8602C]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="About Us"
          title="A joyful beginning for every little learner"
          description="NanhiDuniya Preschool is designed to feel vibrant, safe, playful, and professional so parents feel confident and children feel excited every day."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {features.slice(0, 4).map((feature, index) => {
              const palette = ['#E8602C', '#F4C430', '#2E7D32', '#1565C0'];
              const icons = [ShieldCheck, Brush, Stars, CheckCircle2];
              const Icon = icons[index]!;
              const bg = palette[index]!;

              const isSafety = feature.title === 'Safety First';
              const isPlayBased = feature.title === 'Play-based Learning';
              const isSecurity = feature.title === 'CCTV & Security';
              const isMeals = feature.title === 'Nutritious Meals';
              const hasMediaCard = isSafety || isPlayBased || isSecurity || isMeals;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  onClick={() => setSelectedFeature(feature.title)}
                  className="cursor-pointer"
                >
                  <div
                    className={`relative flex h-full min-h-[14rem] flex-col items-center justify-center gap-4 overflow-hidden rounded-[2rem] border border-white/15 p-6 text-center shadow-[0_20px_60px_rgba(28,8,80,0.16)] ${
                      hasMediaCard ? 'sm:min-h-[16.5rem]' : ''
                    }`}
                    style={
                    hasMediaCard
                      ? {
                          boxShadow: '0 24px 70px rgba(8, 4, 28, 0.28), inset 0 1px 0 rgba(255,255,255,0.2)'
                        }
                      : { background: bg }
                    }
                  >
                    {isSafety && (
                      <>
                        <InteractiveVideo
                          src="/safety-first-bg.mp4"
                          autoPlay
                          loop
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.14),transparent_35%),linear-gradient(180deg,rgba(20,8,42,0.08)_0%,rgba(20,8,42,0.46)_100%)]" />
                      </>
                    )}
                    {isSecurity && (
                      <>
                        <InteractiveVideo
                          src="/cctv-security-bg.mp4"
                          autoPlay
                          loop
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.16),transparent_35%),linear-gradient(180deg,rgba(18,10,45,0.10)_0%,rgba(18,10,45,0.48)_100%)]" />
                      </>
                    )}
                    {isPlayBased && (
                      <>
                        <InteractiveVideo
                          src="/play-based-learning-bg.mp4"
                          autoPlay
                          loop
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_36%),linear-gradient(180deg,rgba(18,10,45,0.18)_0%,rgba(18,10,45,0.50)_100%)]" />
                      </>
                    )}
                    {isMeals && (
                      <>
                        <InteractiveVideo
                          src="/nutritious-meals-bg.mp4"
                          autoPlay
                          loop
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.16),transparent_36%),linear-gradient(180deg,rgba(18,10,45,0.12)_0%,rgba(18,10,45,0.48)_100%)]" />
                      </>
                    )}
                    {!hasMediaCard ? (
                      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/18 backdrop-blur-md">
                        <Icon className="h-6 w-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]" />
                      </div>
                    ) : null}
                    {!hasMediaCard ? (
                      <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        className="relative z-10 max-w-[11rem] font-heading text-[1.1rem] leading-tight text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)] sm:text-2xl"
                      >
                        {feature.title}
                      </motion.p>
                    ) : (
                      <div className="relative z-10 mt-auto w-full rounded-[1.25rem] border border-white/18 bg-black/28 px-4 py-3 backdrop-blur-md">
                        <motion.p
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: 0.45, delay: 0.08 }}
                          className="font-heading text-lg leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:text-xl"
                        >
                          {feature.title}
                        </motion.p>
                        <p className="mt-1 text-xs text-white/70">Tap to know more →</p>
                      </div>
                    )}
                  </div>
                </motion.div>
            );
            })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedFeature && detail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/75 p-4 py-6 backdrop-blur-sm sm:items-center"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 40 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-lg max-h-[92svh] flex-col overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
            >
              {/* Video Background */}
              <div className="relative h-44 shrink-0 overflow-hidden sm:h-64">
                <video
                  src={detail.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
                {/* Close button */}
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
                >
                  <X className="h-5 w-5" />
                </button>
                {/* Title overlay */}
                <div className="absolute bottom-5 left-6">
                  <span className="text-4xl">{detail.emoji}</span>
                  <h2 className="font-heading text-2xl font-black text-white drop-shadow-lg sm:text-3xl">
                    {selectedFeature}
                  </h2>
                  <p className="mt-1 text-sm text-white/85">{detail.tagline}</p>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto bg-white px-6 py-6 sm:px-8 sm:py-7">
                <ul className="space-y-3">
                  {detail.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 text-sm leading-6 text-[#1A1A2E] sm:text-base"
                    >
                      <span className="mt-0.5 text-lg leading-none">{point.slice(0, 2)}</span>
                      <span>{point.slice(2)}</span>
                    </motion.li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="mt-6 w-full rounded-full py-3 text-sm font-black text-white shadow-lg transition hover:opacity-90"
                  style={{ background: detail.color }}
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────── PROGRAMS ─────────── */

function ProgramsSection({ onOpenProgram }: { onOpenProgram: (title: (typeof programs)[number]['title']) => void }) {
  const accents = [
    { color: '#FF9F1C', light: '#FFF0D9', border: '#FFB13B', icon: '🎨' },
    { color: '#F4C430', light: '#FFF7CC', border: '#FFD84D', icon: '🧸' },
    { color: '#67C97C', light: '#EAF8EE', border: '#7FD88F', icon: '🧩' },
    { color: '#5C9DFF', light: '#EAF2FF', border: '#73AEFF', icon: '🎓' }
  ] as const;

  return (
    <section
      id="programs"
      className="relative scroll-mt-20 overflow-hidden px-4 py-12 md:px-6 lg:py-16"
      style={{
        background: 'rgba(255,247,238,0.16)'
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-45">
        <FloatSymbol symbol="+" className="left-[10%] top-[15%] text-4xl text-[#FF9F1C]" delay={0.1} />
        <FloatSymbol symbol="○" className="right-[15%] top-[20%] text-3xl text-[#4ECDC4]" delay={0.4} />
        <FloatSymbol symbol="×" className="bottom-[20%] left-[20%] text-4xl text-[#FFD93D]" delay={0.2} />
        <FloatSymbol symbol="◆" className="bottom-[15%] right-[10%] text-2xl text-[#9B5DE5]" delay={0.5} />
        <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-[#FFD93D]/10 blur-3xl" />
        <div className="absolute -right-32 bottom-32 h-96 w-96 rounded-full bg-[#4D96FF]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Our Programs"
          title="Playgroup to Senior KG"
          description="Age-appropriate, colorful, and joyful classrooms with structured growth for every stage of your child's early years."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program, index) => {
            const accent = accents[index % accents.length]!;
            const isPlaygroup = program.title === 'Playgroup';
            const isNursery = program.title === 'Nursery';
            const isJuniorKg = program.title === 'Junior KG';
            const isSeniorKg = program.title === 'Senior KG';

            return (
              <motion.button
                type="button"
                key={program.title}
                initial={{ opacity: 0, scale: 0.85, y: 26 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                whileHover={{ y: -12, scale: 1.02 }}
                onClick={() => onOpenProgram(program.title)}
                className="will-change-transform cursor-pointer border-0 bg-transparent p-0 text-left"
              >
                <div className="relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[2.5rem] shadow-[0_24px_70px_rgba(31,41,55,0.18)]">
                  {/* Video full background */}
                  {isPlaygroup && (
                    <InteractiveVideo
                      src="/playgroup-bg.mp4"
                      autoPlay loop playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  {isNursery && (
                    <InteractiveVideo
                      src="/nursery-bg.mp4"
                      autoPlay loop playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  {isJuniorKg && (
                    <InteractiveVideo
                      src="/junior-kg-bg.mp4"
                      autoPlay loop playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  {isSeniorKg && (
                    <InteractiveVideo
                      src="/senior-kg-bg.mp4"
                      autoPlay loop playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}

                  {/* Gradient overlay — transparent at top, dark at bottom */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.72) 100%)' }}
                  />

                  {/* Top: colored accent bar + age badge */}
                  <div className="relative z-10 flex items-center justify-between px-5 pt-4">
                    <div
                      className="rounded-full px-4 py-1.5 text-sm font-black shadow-md"
                      style={{ background: program.accent, color: '#1A1A2E' }}
                    >
                      Ages {program.age}
                    </div>
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl text-2xl shadow-md"
                      style={{ background: accent.light }}
                    >
                      {accent.icon}
                    </div>
                  </div>

                  {/* Bottom: title, description, chips */}
                  <div className="relative z-10 mt-auto px-5 pb-6 pt-4">
                    <h3 className="font-heading text-2xl font-black tracking-wide text-white drop-shadow-md sm:text-3xl">
                      {program.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {program.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full px-3 py-1 text-[0.73rem] font-bold shadow-sm"
                          style={{ background: accent.light, color: '#1A1A2E' }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ─────────── ACTIVITIES ─────────── */

function ActivitiesSection() {
  const activities = [
    { title: 'Art & Craft', icon: Brush, bg: '#E8602C' },
    { title: 'Music & Dance', icon: Music4, bg: '#F4C430' },
    { title: 'Storytelling', icon: BookOpenText, bg: '#2E7D32' },
    { title: 'Brain Games', icon: Brain, bg: '#6A1BC0' }
  ];
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const artCraftMedia = [
    { type: 'image', src: '/art-craft/Whisk_0fc7f58666a730fb0614ad9b99ddb00ddr.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_1c24bd95292e05c90674f3f73724e65adr.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_5bd14c24b645eedb5b844b152efcecdfdr.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_7c3e354a151a63cada943e7fded58c36dr.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_7e3d09d7a783849882549cb99831ec1ddr.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_8f910f91d621197898f4cc59be0ac4dddr.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_ctyhddo0emywimyh1iyifwytgty3qtlhzmmi1in.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_cznivmnhzwnirtmh1sowmdotiwywqtlyqjnz0co.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_d4e581666f0a77781ad4d19a147501cfdr.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_edzmrgnijwy0cdzy0cz4edotqjzjrtlygdnh1co.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_idmlvtowcdmldtm00iz0igotqwm5qtlmfwo10in.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_imzjjjmzewoyijm20iy4ytotqdohrtl2gdz50cm.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_izmxmjyymwzknwzi1inlnwytkdo3qtljdjzm1sy.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_kdnmrdz1itnjjmz30szyqmytuzn0qtlihtol1cz.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_mjywewo1mznjrmnz0inkvjytedz1qtl2qmn30yy.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_mmzlvtnwktolvtzl1sy0atotejy5qtlwadm50cm.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_mtmmjtowiznkfgn00yyjvtotkdmjrtlhrgz40sz.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_qgzzqgnhvmz3u2nl1so1mmytkjz2qtljngoi1cm.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_qjzhrgzirzm0y2mx0ynkrgotqwz2qtlhbdmz0sy.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_ydm5gtyldjmxqwmy0cz3kdotuzy2qtl2cdz00iz.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_ydn4atomv2n0mzn10cz3ytytizy1qtlhbdny0cm.jpeg' },
    { type: 'image', src: '/art-craft/Whisk_ywyycjy4ewz1qdm30iz4ydotytmzqtl2ygmx0sy.jpeg' }
  ];

  const musicDanceMedia = [
    { src: '/music-dance/Whisk_0383ad0d4f7ded8be064361647b6abc4dr.jpeg' },
    { src: '/music-dance/Whisk_0c4aa41dbd2141cba594397d70fbf0a1dr.jpeg' },
    { src: '/music-dance/Whisk_2a6080e2f3e9135b67d44a48b1bc2f2adr.jpeg' },
    { src: '/music-dance/Whisk_35a7862858f6768afdd4c246cf489813dr.jpeg' },
    { src: '/music-dance/Whisk_3d6eeb3aac01e2089234f7ba4e57d97bdr.jpeg' },
    { src: '/music-dance/Whisk_94a5ba871faaab8bb4e4e0472a7c2044dr.jpeg' },
    { src: '/music-dance/Whisk_a7e72d4ac1c47499cfd4796c714acb19dr.jpeg' },
    { src: '/music-dance/Whisk_c4ecaa83ded0fa6929f44095971c890ddr.jpeg' },
    { src: '/music-dance/Whisk_ca265df88e2799fb0b64cb6313010cf5dr.jpeg' },
    { src: '/music-dance/Whisk_d16552d46564d4ea2d7432fb1ebfe233dr.jpeg' },
    { src: '/music-dance/Whisk_d69a25ca9cc120084bf4f3b585a7b644dr.jpeg' },
    { src: '/music-dance/Whisk_e32d2e723730d4298344c24fea726ddcdr.jpeg' },
    { src: '/music-dance/Whisk_e4b71d79f67c1f3b26a45be25e9e85eadr.jpeg' },
    { src: '/music-dance/Whisk_ecd18456c3b7842b9f643b1d9459422edr.jpeg' },
    { src: '/music-dance/Whisk_f83a6c314c4b5c9933943e11b294541edr.jpeg' },
    { src: '/music-dance/Whisk_f9e7642c3acfe41b5e14fb23377c868edr.jpeg' },
    { src: '/music-dance/Whisk_fdccf14eaa77172b9444583e30bfc170dr.jpeg' }
  ];

  const storytellingMedia = [
    { src: '/storytelling/Whisk_1ec7f91be2f32b2b7544ef709dd3c87adr.jpeg' },
    { src: '/storytelling/Whisk_3b756d287f095919710457de73c2faccdr.jpeg' },
    { src: '/storytelling/Whisk_437c95d99d8f75493a6418706065e49cdr.jpeg' },
    { src: '/storytelling/Whisk_5f178e7968cadcd88444260775bcae34dr.jpeg' },
    { src: '/storytelling/Whisk_6cf17b395f9a4fd835b448defcef4953dr.jpeg' },
    { src: '/storytelling/Whisk_751c142cbcd31f8a58f48be4b40bff08dr.jpeg' },
    { src: '/storytelling/Whisk_90275ec16e1def0bcb44cd505dfe667cdr.jpeg' },
    { src: '/storytelling/Whisk_975709d305e252cbdb449891d1440fd4dr.jpeg' },
    { src: '/storytelling/Whisk_dde818eb381111cbc1446bc93f192acadr.jpeg' }
  ];

  const brainGamesMedia = [
    { src: '/brain-games/Whisk_139a8068b2cc065ae9849c657e3187b8dr.jpeg' },
    { src: '/brain-games/Whisk_1e04a1215cb31a2b8d04f5582425b955dr.jpeg' },
    { src: '/brain-games/Whisk_27d3708e944ce5eb1a544a13871d72f1dr.jpeg' },
    { src: '/brain-games/Whisk_5633c12c2e53dc1a2764b50add1f3868dr.jpeg' },
    { src: '/brain-games/Whisk_61b37d2cb2121a9bd9d46b9b74d97f57dr.jpeg' },
    { src: '/brain-games/Whisk_7220375e9283f57938c4af129d0a493bdr.jpeg' },
    { src: '/brain-games/Whisk_8491011e5af6fc180524eb15db8d92abdr.jpeg' },
    { src: '/brain-games/Whisk_8ea5d080eb6cd8f971747fc6a33686e6dr.jpeg' },
    { src: '/brain-games/Whisk_97c5125b0c1027bbd794d727e285764ddr.jpeg' },
    { src: '/brain-games/Whisk_d3fc14205712733aa544c55a2227f4dcdr.jpeg' },
    { src: '/brain-games/Whisk_d6f0f16d3b95a189c294740cd67dc0d1dr.jpeg' }
  ];

  return (
    <section
      id="activities"
      className="relative scroll-mt-20 overflow-hidden px-4 py-12 md:px-6 lg:py-16"
      style={{ background: 'rgba(255,247,238,0.16)' }}
    >
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#F4C430]/22 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Activities & Learning"
          title="Hands-on learning through joyful activities"
          description="Every activity is designed to build expression, confidence, creativity, and social development."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => {
                if (activity.title === 'Art & Craft') {
                  setSelectedActivity('Art & Craft');
                }
                if (activity.title === 'Music & Dance') {
                  setSelectedActivity('Music & Dance');
                }
                if (activity.title === 'Storytelling') {
                  setSelectedActivity('Storytelling');
                }
                if (activity.title === 'Brain Games') {
                  setSelectedActivity('Brain Games');
                }
              }}
              className="cursor-pointer"
            >
              {activity.title === 'Music & Dance' || activity.title === 'Storytelling' || activity.title === 'Brain Games' ? (
                <div className="relative flex h-full min-h-[14rem] flex-col overflow-hidden rounded-[2rem] p-6 text-center shadow-lift sm:min-h-[16rem] sm:p-8 bg-transparent">
                  {activity.title === 'Brain Games' ? (
                    <>
                      <img
                        src="/brain-games-bg.png"
                        alt="Brain games classroom"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,45,0.12)_0%,rgba(18,10,45,0.50)_100%)]" />
                    </>
                  ) : (
                    <>
                      <img
                        src={activity.title === 'Music & Dance' ? '/music-dance-bg.png' : '/storytelling-bg.png'}
                        alt={activity.title === 'Music & Dance' ? 'Music and dance classroom' : 'Storytelling classroom'}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,45,0.10)_0%,rgba(18,10,45,0.44)_100%)]" />
                    </>
                  )}

                  <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                    <activity.icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="relative z-10 mt-auto rounded-[1.25rem] border border-white/20 bg-black/24 px-4 py-3 backdrop-blur-md">
                    <h3 className="font-heading text-xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:text-2xl">
                      {activity.title}
                    </h3>
                  </div>
                </div>
              ) : (
              <div
                className={`relative flex h-full min-h-[14rem] flex-col overflow-hidden rounded-[2rem] p-6 text-center shadow-lift sm:min-h-[16rem] sm:p-8 ${
                  index === 0 ? 'bg-transparent' : ''
                }`}
                style={index === 0 ? undefined : { background: activity.bg }}
              >
                {index === 0 && (
                  <>
                    <img
                      src="/art-craft-bg.png"
                      alt="Art and craft classroom"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,45,0.14)_0%,rgba(18,10,45,0.40)_100%)]" />
                  </>
                )}

                <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <activity.icon className="h-6 w-6 text-white" />
                </div>

                <div className="relative z-10 mt-auto rounded-[1.25rem] border border-white/20 bg-black/24 px-4 py-3 backdrop-blur-md">
                  <h3 className="font-heading text-xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:text-2xl">
                    {activity.title}
                  </h3>
                </div>
              </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedActivity === 'Art & Craft' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-black/90"
          >
            {/* Top bar with back button */}
            <div className="flex shrink-0 items-center gap-4 border-b border-white/10 px-4 py-4 sm:px-8">
              <button
                onClick={() => setSelectedActivity(null)}
                className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back
              </button>
              <h3 className="font-heading text-xl font-black text-white sm:text-2xl">Art & Craft Gallery</h3>
            </div>

            {/* Scrollable images grid */}
            <div className="flex-1 overflow-y-auto p-4 pb-24 sm:p-8 sm:pb-28">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {artCraftMedia.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (i % 10) * 0.05 }}
                    className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl shadow-soft hover:scale-105 transition-transform"
                    onClick={() => setZoomedImage(item.src)}
                  >
                    <img src={item.src} alt={`Art & Craft ${i + 1}`} className="h-full w-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fixed floating close button */}
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[220] flex justify-center pb-6">
              <button
                onClick={() => setSelectedActivity(null)}
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#1A1A2E] shadow-2xl transition hover:bg-[#F4C430] hover:scale-105"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music & Dance Gallery Modal */}
      <AnimatePresence>
        {selectedActivity === 'Music & Dance' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-black/90"
          >
            <div className="flex shrink-0 items-center gap-4 border-b border-white/10 px-4 py-4 sm:px-8">
              <button
                onClick={() => setSelectedActivity(null)}
                className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back
              </button>
              <h3 className="font-heading text-xl font-black text-white sm:text-2xl">Music & Dance Gallery</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24 sm:p-8 sm:pb-28">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {musicDanceMedia.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (i % 10) * 0.05 }}
                    className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl shadow-soft hover:scale-105 transition-transform"
                    onClick={() => setZoomedImage(item.src)}
                  >
                    <img src={item.src} alt={`Music & Dance ${i + 1}`} className="h-full w-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[220] flex justify-center pb-6">
              <button
                onClick={() => setSelectedActivity(null)}
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#1A1A2E] shadow-2xl transition hover:bg-[#F4C430] hover:scale-105"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Storytelling Gallery Modal */}
      <AnimatePresence>
        {selectedActivity === 'Storytelling' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-black/90"
          >
            <div className="flex shrink-0 items-center gap-4 border-b border-white/10 px-4 py-4 sm:px-8">
              <button
                onClick={() => setSelectedActivity(null)}
                className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back
              </button>
              <h3 className="font-heading text-xl font-black text-white sm:text-2xl">Storytelling Gallery</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24 sm:p-8 sm:pb-28">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {storytellingMedia.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (i % 10) * 0.05 }}
                    className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl shadow-soft hover:scale-105 transition-transform"
                    onClick={() => setZoomedImage(item.src)}
                  >
                    <img src={item.src} alt={`Storytelling ${i + 1}`} className="h-full w-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[220] flex justify-center pb-6">
              <button
                onClick={() => setSelectedActivity(null)}
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#1A1A2E] shadow-2xl transition hover:bg-[#F4C430] hover:scale-105"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brain Games Gallery Modal */}
      <AnimatePresence>
        {selectedActivity === 'Brain Games' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-black/90"
          >
            <div className="flex shrink-0 items-center gap-4 border-b border-white/10 px-4 py-4 sm:px-8">
              <button
                onClick={() => setSelectedActivity(null)}
                className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back
              </button>
              <h3 className="font-heading text-xl font-black text-white sm:text-2xl">Brain Games Gallery</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24 sm:p-8 sm:pb-28">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {brainGamesMedia.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (i % 10) * 0.05 }}
                    className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl shadow-soft hover:scale-105 transition-transform"
                    onClick={() => setZoomedImage(item.src)}
                  >
                    <img src={item.src} alt={`Brain Games ${i + 1}`} className="h-full w-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[220] flex justify-center pb-6">
              <button
                onClick={() => setSelectedActivity(null)}
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#1A1A2E] shadow-2xl transition hover:bg-[#F4C430] hover:scale-105"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            onClick={() => setZoomedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
              className="absolute right-4 top-4 z-[310] flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40 sm:right-8 sm:top-8"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={zoomedImage}
              alt="Zoomed Art & Craft"
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────── FACILITIES ─────────── */

function FacilitiesSection({ onOpenFacility }: { onOpenFacility: (id: (typeof facilities)[number]['id']) => void }) {
  const cardAccents = [
    { border: '#FF9F1C', bg: 'linear-gradient(135deg,#FFF8EE,#FFF0D9)', badge: '#FF9F1C', badgeText: '#fff' },
    { border: '#6BCB77', bg: 'linear-gradient(135deg,#F0FBF2,#E0F5E4)', badge: '#6BCB77', badgeText: '#fff' },
    { border: '#4D96FF', bg: 'linear-gradient(135deg,#EEF5FF,#DDEEFF)', badge: '#4D96FF', badgeText: '#fff' },
    { border: '#FF6B9D', bg: 'linear-gradient(135deg,#FFF0F5,#FFE0EC)', badge: '#FF6B9D', badgeText: '#fff' }
  ];

  return (
    <section
      id="facilities"
      className="relative scroll-mt-20 overflow-hidden px-4 py-12 md:px-6 lg:py-16"
      style={{ background: 'rgba(255,247,238,0.16)' }}
    >
      <div className="pointer-events-none absolute -left-20 -top-10 h-72 w-72 rounded-full bg-[#4A0E8F]/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[#1565C0]/12 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Facilities"
          title="Safe, clean, colorful spaces for joyful learning"
          description="Modern facilities designed to make preschool secure, fun, and engaging."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((item, index) => {
            const accent = cardAccents[index % cardAccents.length]!;
            return (
              <motion.button
                type="button"
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenFacility(item.id)}
                className="cursor-pointer border-0 bg-transparent p-0 text-left"
                aria-label={`Open ${item.title} details`}
              >
                <div
                  className="overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                  style={{ border: `3px solid ${accent.border}` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.photo.image} alt={item.photo.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                    <span
                      className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-black shadow-md"
                      style={{ background: accent.badge, color: accent.badgeText }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div className="p-5" style={{ background: accent.bg }}>
                    <p className="font-heading text-xl font-black text-[#1A1A2E]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#1A1A2E]/75">{item.description}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── GALLERY ─────────── */

/* ─────────── TESTIMONIALS ─────────── */

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, []);

  const trackX = useMemo(() => `-${active * 100}%`, [active]);

  const cardAccents = [
    { gradient: 'linear-gradient(135deg,#FFF3E0,#FFE0B2)', border: '#FF9F1C', ring: '#FF9F1C', star: '#FF9F1C', badge: '#FF9F1C' },
    { gradient: 'linear-gradient(135deg,#E8F5E9,#C8E6C9)', border: '#6BCB77', ring: '#6BCB77', star: '#6BCB77', badge: '#6BCB77' },
    { gradient: 'linear-gradient(135deg,#EDE7F6,#D1C4E9)', border: '#9C6FDE', ring: '#9C6FDE', star: '#9C6FDE', badge: '#9C6FDE' }
  ];

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-20 overflow-hidden px-4 py-12 md:px-6 lg:py-16"
    >
      {/* Colorful background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#FF9F1C]/20 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-[#6BCB77]/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#9C6FDE]/18 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#4D96FF]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Testimonials"
          title="Loved by parents, adored by children"
          description="Real words from families who chose NanhiDuniya for joyful, trusted early learning."
        />

        {/* Slider wrapper */}
        <div className="relative mt-12 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: trackX }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {testimonials.map((testimonial, index) => {
              const accent = cardAccents[index % cardAccents.length]!;
              return (
                <div key={testimonial.name} className="w-full shrink-0 px-1 sm:px-2">
                  <div
                    className="relative overflow-hidden rounded-[2.5rem] p-6 shadow-[0_24px_72px_rgba(0,0,0,0.13)] sm:p-10"
                    style={{ background: accent.gradient, border: `2.5px solid ${accent.border}40` }}
                  >
                    {/* Big decorative quote mark */}
                    <span
                      className="pointer-events-none absolute -top-2 left-6 select-none font-heading text-[9rem] leading-none opacity-10"
                      style={{ color: accent.badge }}
                    >
                      "
                    </span>

                    {/* Stars */}
                    <div className="relative z-10 mb-4 flex gap-1">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className="text-xl" style={{ color: accent.star }}>★</span>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="relative z-10 text-base leading-8 text-[#1A1A2E]/80 sm:text-lg sm:leading-9">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="relative z-10 mt-6 flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full object-cover shadow-md sm:h-16 sm:w-16"
                        style={{ outline: `3px solid ${accent.ring}`, outlineOffset: '2px' }}
                      />
                      <div>
                        <p className="font-heading text-xl font-black text-[#1A1A2E] sm:text-2xl">{testimonial.name}</p>
                        <span
                          className="mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-bold text-white"
                          style={{ background: accent.badge }}
                        >
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {testimonials.map((testimonial, index) => {
            const accent = cardAccents[index % cardAccents.length]!;
            return (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setActive(index)}
                className="h-3.5 w-3.5 rounded-full transition-all duration-300"
                style={{
                  background: index === active ? accent.badge : '#D1D5DB',
                  transform: index === active ? 'scale(1.4)' : 'scale(1)'
                }}
                aria-label={`Show testimonial from ${testimonial.name}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── ADMISSION ─────────── */

function AdmissionSection({ onOpenAdmission }: { onOpenAdmission: (step: (typeof steps)[number]) => void }) {
  const stepAccents = [
    {
      color: '#FF9F1C',
      light: '#FFF3DC',
      bg: 'linear-gradient(145deg,#FFF8EE 0%,#FFE8B0 100%)',
      icon: '📋',
      desc: 'Call or WhatsApp us to learn more about admissions'
    },
    {
      color: '#4D96FF',
      light: '#DDEEFF',
      bg: 'linear-gradient(145deg,#EEF5FF 0%,#C2DEFF 100%)',
      icon: '🏫',
      desc: 'Schedule a free campus tour for you and your child'
    },
    {
      color: '#6BCB77',
      light: '#E0F5E4',
      bg: 'linear-gradient(145deg,#F0FBF2 0%,#BDEFC5 100%)',
      icon: '📝',
      desc: 'Fill the form and submit required documents'
    },
    {
      color: '#FF6B9D',
      light: '#FFE0EC',
      bg: 'linear-gradient(145deg,#FFF0F5 0%,#FFBBD5 100%)',
      icon: '🎒',
      desc: 'Your child joins our joyful learning family!'
    }
  ];

  return (
    <section
      id="admission"
      className="relative scroll-mt-20 overflow-hidden px-4 py-12 md:px-6 lg:py-16"
    >
      {/* Colorful blurred blobs background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#FF9F1C]/25 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#4D96FF]/22 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#6BCB77]/20 blur-3xl" />
        <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-[#FF6B9D]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Admission Process"
          title="Simple, transparent, parent-friendly enrollment"
          description="From first call to first day, we keep the process smooth and welcoming."
          light
        />

        <div className="relative mt-14">
          {/* Rainbow connector line */}
          <div className="absolute left-0 right-0 top-12 hidden h-2 rounded-full md:block"
            style={{ background: 'linear-gradient(90deg,#FF9F1C,#4D96FF,#6BCB77,#FF6B9D)' }} />

          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => {
              const accent = stepAccents[index]!
              const isInquiry = index === 0
              const isVisit = index === 1
              const isRegistration = index === 2
              const isStartLearning = index === 3
              const handleClick = () => {
                onOpenAdmission(step)
              }

              return (
                <motion.button
                  key={step}
                  type="button"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClick}
                  className="cursor-pointer border-0 bg-transparent p-0 text-left"
                  aria-label={`${step} step`}
                >
                  <div
                    className="relative flex flex-col items-center gap-4 rounded-[2rem] p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.13)]"
                    style={
                      isInquiry || isVisit || isRegistration || isStartLearning
                        ? {
                            background: 'linear-gradient(180deg, rgba(18,10,45,0.10) 0%, rgba(18,10,45,0.24) 100%)',
                            border: `2.5px solid ${accent.color}55`
                          }
                        : { background: accent.bg, border: `2.5px solid ${accent.color}40` }
                    }
                  >
                    {isInquiry || isVisit || isRegistration ? (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-[2rem]"
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                          style={{
                            backgroundImage:
                              `linear-gradient(180deg, rgba(18,10,45,0.18) 0%, rgba(18,10,45,0.62) 100%), url('${isInquiry ? '/inquiry-bg.png' : isVisit ? '/visit-bg.png' : '/registration-bg.png'}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),transparent_34%)]" />
                      </>
                    ) : isStartLearning ? (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-[2rem]"
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                          style={{
                            backgroundImage:
                              "linear-gradient(180deg, rgba(18,10,45,0.18) 0%, rgba(18,10,45,0.62) 100%), url('/start-learning-bg.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),transparent_34%)]" />
                      </>
                    ) : null}
                    <motion.div
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-lg"
                      style={{ background: accent.color }}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: index * 0.12 }}
                    >
                      <span className="text-2xl">{accent.icon}</span>
                    </motion.div>
                    <span
                      className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-white shadow-md"
                      style={{ background: accent.color }}
                    >
                      {index + 1}
                    </span>
                    <motion.p
                      initial={{ opacity: 0, y: 18, scale: 0.94 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.5, delay: 0.08, type: 'spring', stiffness: 180 }}
                      className={`relative z-10 font-heading text-2xl font-black ${isInquiry || isVisit || isRegistration || isStartLearning ? 'text-white' : 'text-[#1A1A2E]'}`}
                    >
                      {step}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.5, delay: 0.16 }}
                      className={`relative z-10 text-sm leading-5 ${isInquiry || isVisit || isRegistration || isStartLearning ? 'text-white/90' : 'text-[#1A1A2E]/65'}`}
                    >
                      {accent.desc}
                    </motion.p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CONTACT ─────────── */

function ContactSection({ onEnrollNow }: { onEnrollNow: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden px-3 py-14 md:scroll-mt-20 md:px-6 md:py-20 lg:py-28"
      style={{ background: 'rgba(10,5,25,0.42)' }}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#F4C430]/18 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#E8602C]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Enrollment & Contact"
          title="Visit us or send an inquiry"
          description="Address, phone, email, map, and a quick inquiry form for parents."
          light
        />

        <div className="mt-8 grid gap-4 sm:mt-14 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }}>
            <div className="rounded-[1.35rem] border border-white/20 bg-white/10 p-3 backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
              <form
                className="space-y-3 sm:space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                  onEnrollNow();
                  window.setTimeout(() => setSubmitted(false), 2800);
                }}
              >
                <Input label="Parent Name" placeholder="Enter your name" required />
                <Input label="Phone Number" placeholder="+91" required />
                <Input label="Email" placeholder="you@example.com" type="email" required />
                <Textarea label="Message" placeholder="Tell us about your child" required />

                <Button
                  type="submit"
                  fullWidth
                  className="min-h-10 px-3.5 py-2 text-[13px] sm:min-h-12 sm:px-6 sm:py-3 sm:text-base"
                >
                  Send Inquiry
                  <ClipboardPenLine className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>

                {submitted ? <p className="text-sm font-semibold text-[#A5D6A7]">Inquiry submitted. We will contact you soon.</p> : null}
              </form>
            </div>
          </motion.div>

          <div className="grid gap-3.5 sm:gap-6">
            <div className="overflow-hidden rounded-[1.35rem] border border-white/20 sm:rounded-[2rem]">
              <div className="aspect-[4/3] min-h-[190px] sm:min-h-0">
                <iframe
                  title="NanhiDuniya Preschool map"
                  src={mapEmbedUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="rounded-[1.35rem] border border-white/20 bg-white/10 p-3 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4C430] sm:text-left sm:text-sm sm:tracking-[0.3em]">
                Visit us
              </p>
              <div className="mt-3.5 grid gap-2.5 sm:mt-5 sm:gap-4">
                <InfoRow icon={MapPin} title="Address" text={site.address} />
                <InfoRow icon={Phone} title="Phone" text={site.phone} />
                <InfoRow icon={Mail} title="Email" text={site.email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  title,
  text
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-[1.15rem] border border-white/15 bg-white/10 px-3 py-3 sm:gap-4 sm:rounded-[1.5rem] sm:px-4 sm:py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[1rem] bg-[#F4C430] sm:h-11 sm:w-11 sm:rounded-2xl">
        <Icon className="h-4 w-4 text-[#1A1A2E] sm:h-5 sm:w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-[12px] leading-5 text-white/72 sm:text-sm sm:leading-6">{text}</p>
      </div>
    </div>
  );
}

/* ─────────── PARENTS MEETING SECTION ─────────── */

function ParentsMeetingSection() {
  return (
    <section className="relative px-4 py-16 sm:py-24 md:px-6 lg:py-32">
      <SectionTitle
        title="Parent Partnership"
        subtitle="Because the best learning happens when parents and teachers work together."
      />

      <div className="relative mx-auto mt-12 grid max-w-7xl items-start gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative grid gap-4 sm:grid-cols-2"
        >
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[2rem] border border-[#1A1A2E]/8 bg-white p-2 shadow-xl shadow-black/5">
              <img src="/ptm-1.png" alt="Parent and teacher discussing" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
            </div>
            <div className="rounded-[2rem] border border-[#1A1A2E]/5 bg-[#FFF0D9] p-6 shadow-lg shadow-[#FF9F1C]/10 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF9F1C] text-2xl">
                🤝
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-[#1A1A2E]">Working Together</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1A1A2E]/75">
                We believe in keeping parents closely involved in their child's daily progress and joy.
              </p>
            </div>
          </div>
          <div className="space-y-4 sm:pt-12">
            <div className="overflow-hidden rounded-[2rem] border border-[#1A1A2E]/8 bg-white p-2 shadow-xl shadow-black/5">
              <img src="/ptm-2.png" alt="Parents meeting" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover sm:aspect-[3/4]" />
            </div>
            <div className="rounded-[2rem] border border-[#4D96FF]/10 bg-gradient-to-r from-[#EEF5FF] to-white p-5 shadow-lg shadow-[#4D96FF]/10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#4D96FF]/15 text-[#4D96FF]">
                  <span className="text-xl">📘</span>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-black text-[#1A1A2E]">Shared Progress</h4>
                  <p className="text-sm text-[#1A1A2E]/70">Parents and teachers stay connected through regular updates.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] border border-white/25 bg-white/15 p-5 shadow-[0_24px_60px_rgba(20,30,56,0.10)] backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B9D]/15 bg-[#FF6B9D]/10 px-4 py-2 text-sm font-bold text-[#1A1A2E] shadow-sm backdrop-blur-md">
                <span>🗣️</span>
                Open Communication
              </div>
              <h3 className="mt-6 font-heading text-3xl font-black leading-tight text-[#1A1A2E] sm:text-4xl">
                Building a strong <span className="text-[#4D96FF]">foundation</span>{' '}
                <span className="text-[#FF6B9D]">together</span>
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#1A1A2E]/92">
                Regular Parent-Teacher Meetings are an essential part of our curriculum. It gives us a beautiful opportunity to connect, share milestones, and ensure your little one is growing happily and confidently.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Regular Progress Updates', text: 'Monthly catch-ups to discuss your child’s development, strengths, and areas of growth.' },
                { title: 'Guided Learning at Home', text: 'Tips and strategies for parents to continue the fun and learning in the home environment.' },
                { title: 'A Listening Ear', text: 'We are always here to listen to your suggestions, feedback, and any concerns you might have.' }
              ].map((item, index) => (
                <div key={item.title} className="flex gap-4 rounded-[1.5rem] border border-[#1A1A2E]/8 bg-gradient-to-r from-white to-[#FFF7CC] p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4C430]/20 text-[#FF9F1C]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A2E]">{item.title}</h4>
                    <p className="mt-1 text-sm text-[#1A1A2E]/80">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}







