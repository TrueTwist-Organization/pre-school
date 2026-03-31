import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BadgeInfo, CheckCircle2, Sparkles, ShieldCheck, Trees, Users, X } from 'lucide-react';

import { Button } from '@/components/ui';
import { facilities } from '@/lib/content';

export type FacilityTitle = (typeof facilities)[number]['title'];
export type FacilityId = (typeof facilities)[number]['id'];

const routeMap: Record<FacilityId, string> = {
  classroom: 'safe-classrooms',
  toys: 'learning-toys',
  cctv: 'cctv-security',
  playground: 'playground'
};

const details: Record<FacilityId, {
  subtitle: string;
  overview: string;
  points: string[];
  color: string;
  accent: string;
  icon: string;
}> = {
  classroom: {
    subtitle: 'Safe, cozy and Montessori-inspired classrooms',
    overview:
      'Bright classroom spaces are designed to make children feel calm, curious and confident. Cozy corners, tactile tools and age-appropriate furniture create a balanced learning environment.',
    points: [
      'Soft flooring and rounded furniture for child safety',
      'Reading corners that invite early literacy',
      'Montessori-style materials for hands-on learning',
      'Clean, airy rooms with natural light and fresh routines'
    ],
    color: '#FF9F1C',
    accent: '#FFF0D9',
    icon: '🏫'
  },
  toys: {
    subtitle: 'Age-appropriate toys that make learning exciting',
    overview:
      'Our learning toys are selected to support fine motor skills, problem-solving and creativity. Children learn through play, sharing, and building confidence with every activity.',
    points: [
      'Puzzles, blocks and manipulatives for brain development',
      'Fine motor toys for hand strength and coordination',
      'Colorful toys that spark imagination and discussion',
      'Shared play experiences that improve social skills'
    ],
    color: '#6BCB77',
    accent: '#EAF8EE',
    icon: '🧸'
  },
  cctv: {
    subtitle: 'Trusted monitoring and secure access systems',
    overview:
      'Security is designed for peace of mind. With CCTV coverage, secure access and careful staff supervision, families feel informed and children feel safe throughout the day.',
    points: [
      'CCTV monitoring in classrooms and common areas',
      'Secure entry and exit procedures for parents and staff',
      'High-trust systems that support family confidence',
      'Clear supervision and emergency-ready protocols'
    ],
    color: '#4D96FF',
    accent: '#EAF2FF',
    icon: '📷'
  },
  playground: {
    subtitle: 'Safe outdoor movement and joyful play',
    overview:
      'The playground gives children a place to move, climb, explore and interact. Designed with safe surfaces and playful equipment, it supports healthy physical development.',
    points: [
      'Safe play surfaces and child-friendly equipment',
      'Mini rides and movement activities for active learning',
      'Open-air spaces that boost confidence and coordination',
      'Social play that builds teamwork and joyful energy'
    ],
    color: '#FF6B9D',
    accent: '#FFE0EC',
    icon: '🌳'
  }
};

const gallery: Record<FacilityId, string[]> = {
  classroom: ['/classroom-gallery-1.png', '/classroom-gallery-2.png', '/classroom-gallery-3.png'],
  toys: ['/toys-gallery-1.png', '/toys-gallery-2.png', '/toys-gallery-3.png'],
  cctv: ['/cctv-gallery-1.png', '/cctv-gallery-2.png', '/cctv-gallery-3.png'],
  playground: ['/playground-gallery-1.png', '/playground-gallery-2.png', '/playground-gallery-3.png']
};

export function getFacilityPath(id: FacilityId) {
  return `/facilities/${routeMap[id]}`;
}

export function getFacilityTitleFromPath(pathname: string) {
  const slug = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (slug[0] !== 'facilities' || !slug[1]) return null;
  const found = (Object.entries(routeMap) as [FacilityId, string][]).find(([, value]) => value === slug[1]);
  return found?.[0] ?? null;
}

export function FacilityDetailPage({
  facilityId,
  onBack,
  onEnrollNow
}: {
  facilityId: FacilityId;
  onBack: () => void;
  onEnrollNow: () => void;
}) {
  const facility = facilities.find((item) => item.id === facilityId)!;
  const data = details[facilityId]!;
  const images = gallery[facilityId]!;
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 md:px-6 md:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img src={facility.photo.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,28,0.78)_0%,rgba(12,8,28,0.58)_36%,rgba(12,8,28,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_24%)]" />
      </div>

      <div className="sticky top-3 z-30 mx-auto flex w-full max-w-7xl items-start justify-between gap-4 rounded-[2rem] border border-white/15 bg-white/10 px-4 py-4 text-white backdrop-blur-xl md:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-white/65">Facility Page</p>
          <h1 className="mt-1 font-heading text-2xl font-black sm:text-4xl">{facility.title}</h1>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#1A1A2E] shadow-lg transition hover:scale-105 hover:bg-[#F4C430]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </button>
      </div>

      <div className="relative mx-auto mt-6 grid max-w-7xl items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="lg:sticky lg:top-6 rounded-[2rem] border border-white/15 bg-white/10 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black" style={{ background: data.color, color: '#1A1A2E' }}>
            <span>{data.icon}</span>
            {facility.title}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-5 font-heading text-4xl font-black leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)] sm:text-5xl"
          >
            {facility.title}
          </motion.h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{data.subtitle}</p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/78 sm:text-base">{data.overview}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {data.points.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-[1.25rem] border border-white/12 bg-black/20 p-4 text-sm text-white/86">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67C97C]" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="button" onClick={onEnrollNow} className="bg-[#F4C430] text-[#1A1A2E] hover:bg-[#FFD93D]">
              <Sparkles className="h-4 w-4" />
              Enquiry Now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/18"
            >
              <BadgeInfo className="h-4 w-4" />
              Back to Home
            </button>
          </div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-6">
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="relative aspect-[4/3]">
              <img src={facility.photo.image} alt={facility.photo.title} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {images.map((src, index) => (
              <motion.div
                key={`${src}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.08 * index }}
                onClick={() => setZoomedImage(src)}
                className="aspect-square cursor-pointer overflow-hidden rounded-[1.25rem] border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-transform hover:scale-[1.03]"
              >
                <img src={src} alt={`${facility.title} preview ${index + 1}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
              </motion.div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-[#F4C430]">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-heading text-xl font-black text-white">Why this matters</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/82">
              This space is built to support safe, joyful, and confident early learning while keeping parents fully reassured.
            </p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">Child-first comfort and supervision</div>
              <div className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">Premium visuals with practical functionality</div>
              <div className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">Trusted by parents for daily peace of mind</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-[#6BCB77]">
              <Users className="h-5 w-5" />
              <h3 className="font-heading text-xl font-black text-white">Gallery notes</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/82">
              The preview images repeat the core facility visual so parents can quickly recognize the environment from different angles and contexts.
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">
              <Trees className="h-4 w-4 text-[#67C97C]" />
              Safe, clean and child-friendly atmosphere
            </div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/90 p-4 py-20 backdrop-blur-xl sm:items-center sm:p-8"
          >
            <button
              type="button"
              className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
              onClick={() => setZoomedImage(null)}
            >
              Close
              <X className="h-4 w-4" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={zoomedImage}
              alt="Zoomed facility"
              className="max-h-[calc(100svh-8rem)] max-w-[90vw] rounded-[2rem] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:hidden">
        <button
          type="button"
          onClick={onBack}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#1A1A2E] px-5 py-3 text-sm font-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </button>
      </div>
    </main>
  );
}

