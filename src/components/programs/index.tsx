import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Brain, CheckCircle2, HeartHandshake, LayoutGrid, Music4, Sparkles, Star } from 'lucide-react';

import { Button, InteractiveVideo } from '@/components/ui';
import { programs } from '@/lib/content';

export type ProgramTitle = (typeof programs)[number]['title'];

const routeMap: Record<ProgramTitle, string> = {
  Playgroup: 'playgroup',
  Nursery: 'nursery',
  'Junior KG': 'junior-kg',
  'Senior KG': 'senior-kg'
};

const details: Record<ProgramTitle, {
  subtitle: string;
  overview: string;
  focus: string[];
  benefits: string[];
  curriculum: string[];
  rhythm: string[];
  accent: string;
  secondary: string;
  icon: string;
}> = {
  Playgroup: {
    subtitle: 'Discovery through Sensory Play',
    overview:
      'A gentle first-school experience with sensory play, music, movement, and happy separation support so children feel safe, loved, and excited to learn.',
    focus: ['Sensory exploration', 'Language growth', 'Social comfort', 'Motor development'],
    benefits: [
      'Builds confidence in a warm, welcoming classroom',
      'Introduces early sharing, turn-taking, and friendship skills',
      'Develops hand-eye coordination through playful activities',
      'Supports speech, listening, and expression naturally'
    ],
    curriculum: [
      'Sand, water, clay, and texture play',
      'Rhymes, songs, and movement games',
      'Story time with puppets and picture books',
      'Building blocks, sorting, and matching',
      'Simple circle-time routines and name recognition'
    ],
    rhythm: ['Arrival + warm welcome', 'Free play + sensory stations', 'Story + music time', 'Snack + calm-down', 'Outdoor movement', 'Goodbye circle'],
    accent: '#FF9F1C',
    secondary: '#FFF0D9',
    icon: '🧸'
  },
  Nursery: {
    subtitle: 'Building Foundations with Joyful Learning',
    overview:
      'A joyful bridge into structured learning with phonics, numbers, art, and playful social growth that prepares children for the next stage.',
    focus: ['Phonics start', 'Number sense', 'Creative art', 'Social play'],
    benefits: [
      'Introduces letters, sounds, and early word awareness',
      'Strengthens curiosity through guided discovery and games',
      'Improves self-help habits and classroom independence',
      'Encourages speaking in groups with confidence'
    ],
    curriculum: [
      'Alphabet recognition and phonics games',
      'Counting, sorting, and number sense',
      'Creative art, coloring, and tracing',
      'Nature study and simple science exploration',
      'Show-and-tell, circle time, and group interaction'
    ],
    rhythm: ['Warm-up song', 'Phonics and numbers', 'Art + worksheet time', 'Snack break', 'Group play', 'Reflection circle'],
    accent: '#F4C430',
    secondary: '#FFF7CC',
    icon: '🎨'
  },
  'Junior KG': {
    subtitle: 'Igniting Passion for Lifelong Learning',
    overview:
      'A lively year focused on writing readiness, early reading, math play, and confident classroom habits that make learning exciting.',
    focus: ['Reading readiness', 'Number sense', 'Confidence building', 'Communication'],
    benefits: [
      'Builds early reading fluency and word recognition',
      'Creates strong writing posture and pencil control',
      'Improves problem-solving with friendly math play',
      'Encourages leadership in group tasks and sharing'
    ],
    curriculum: [
      'Phonics revision and sight words',
      'Sentence building and handwriting readiness',
      'Addition, subtraction, and number games',
      'Show-and-tell, storytelling, and role play',
      'General knowledge and project-based learning'
    ],
    rhythm: ['Morning routine', 'Phonics + handwriting', 'Math circle', 'Break + snack', 'Project work', 'Sharing time'],
    accent: '#67C97C',
    secondary: '#EAF8EE',
    icon: '✏️'
  },
  'Senior KG': {
    subtitle: 'Preparing for School & Beyond with Confidence',
    overview:
      'A polished school-readiness program that prepares children for a smooth, joyful move to Grade 1 with independence and confidence.',
    focus: ['School prep', 'Writing practice', 'Public speaking', 'Problem solving'],
    benefits: [
      'Prepares children for formal school routines with ease',
      'Builds advanced writing and reading confidence',
      'Strengthens attention span and classroom discipline',
      'Grows presentation skills and leadership traits'
    ],
    curriculum: [
      'School readiness and routine management',
      'Reading comprehension and sentence writing',
      'Math concepts, patterns, and reasoning',
      'Public speaking, presentations, and discussions',
      'Science, environment, and project-based learning'
    ],
    rhythm: ['Check-in + plan', 'Reading + writing', 'Math challenge', 'Snack break', 'Presentation time', 'Reflection + goodbye'],
    accent: '#5C9DFF',
    secondary: '#EAF2FF',
    icon: '🎓'
  }
};

const visuals: Record<ProgramTitle, { label: string; className: string }[]> = {
  Playgroup: [
    { label: 'Sensory play', className: 'from-[#FF9F1C] to-[#FFCF91]' },
    { label: 'Music time', className: 'from-[#F4C430] to-[#FFE78A]' },
    { label: 'First friends', className: 'from-[#67C97C] to-[#BDEFC5]' },
    { label: 'Gentle routines', className: 'from-[#5C9DFF] to-[#CFE2FF]' }
  ],
  Nursery: [
    { label: 'Phonics fun', className: 'from-[#F4C430] to-[#FFE88B]' },
    { label: 'Number games', className: 'from-[#67C97C] to-[#BDEFC5]' },
    { label: 'Creative art', className: 'from-[#FF9F1C] to-[#FFD7A5]' },
    { label: 'Circle time', className: 'from-[#5C9DFF] to-[#D7E6FF]' }
  ],
  'Junior KG': [
    { label: 'Reading readiness', className: 'from-[#67C97C] to-[#CDEFD3]' },
    { label: 'Writing practice', className: 'from-[#5C9DFF] to-[#D7E6FF]' },
    { label: 'Math play', className: 'from-[#F4C430] to-[#FFEFA3]' },
    { label: 'Confidence build', className: 'from-[#FF9F1C] to-[#FFD6A5]' }
  ],
  'Senior KG': [
    { label: 'School prep', className: 'from-[#5C9DFF] to-[#D7E6FF]' },
    { label: 'Public speaking', className: 'from-[#FF9F1C] to-[#FFD6A5]' },
    { label: 'Writing focus', className: 'from-[#67C97C] to-[#CDEFD3]' },
    { label: 'Leadership', className: 'from-[#F4C430] to-[#FFEFA3]' }
  ]
};

const programMedia: Record<ProgramTitle, string> = {
  Playgroup: '/playgroup-bg.mp4',
  Nursery: '/nursery-bg.mp4',
  'Junior KG': '/junior-kg-bg.mp4',
  'Senior KG': '/senior-kg-bg.mp4'
};

function getProgramImage(title: ProgramTitle) {
  return programMedia[title];
}


export function getProgramPath(title: ProgramTitle) {
  return `/programs/${routeMap[title]}`;
}

export function getProgramTitleFromPath(pathname: string) {
  const slug = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (slug[0] !== 'programs' || !slug[1]) return null;
  const found = (Object.entries(routeMap) as [ProgramTitle, string][]).find(([, value]) => value === slug[1]);
  return found?.[0] ?? null;
}

export function ProgramDetailPage({
  programTitle,
  onEnrollNow,
  onBack
}: {
  programTitle: ProgramTitle;
  onEnrollNow: () => void;
  onBack: () => void;
}) {
  const data = details[programTitle]!;
  const videoSrc = getProgramImage(programTitle);
  const accent = data.accent;
  const secondary = data.secondary;
  const programAge = programs.find((program) => program.title === programTitle)?.age ?? '';

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 md:px-6 md:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveVideo className="h-full w-full object-cover" autoPlay loop playsInline src={videoSrc} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,28,0.78)_0%,rgba(12,8,28,0.56)_36%,rgba(12,8,28,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_24%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-4 rounded-[2rem] border border-white/15 bg-white/10 px-4 py-4 text-white backdrop-blur-xl md:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-white/65">Program Page</p>
          <h1 className="mt-1 font-heading text-2xl font-black sm:text-4xl">{programTitle}</h1>
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

      <div className="relative mx-auto mt-6 grid max-w-7xl items-start gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="lg:sticky lg:top-6 rounded-[2rem] border border-white/15 bg-white/10 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black" style={{ background: accent, color: '#1A1A2E' }}>
            <span>{data.icon}</span>
            {programAge}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-5 font-heading text-4xl font-black leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)] sm:text-5xl"
          >
            {programTitle}
          </motion.h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{data.subtitle}</p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/78 sm:text-base">{data.overview}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {programs.find((program) => program.title === programTitle)?.highlights.map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-white/90 backdrop-blur-md">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/15 bg-black/20 p-5">
              <div className="flex items-center gap-2 text-[#F4C430]">
                <HeartHandshake className="h-5 w-5" />
                <h3 className="font-heading text-xl font-black text-white">Why parents love it</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/85">
                {data.benefits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67C97C]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-white/15 bg-black/20 p-5">
              <div className="flex items-center gap-2 text-[#67C97C]">
                <BookOpen className="h-5 w-5" />
                <h3 className="font-heading text-xl font-black text-white">Curriculum highlights</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/85">
                {data.curriculum.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#F4C430]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/15 bg-black/20 p-5">
            <div className="flex items-center gap-2 text-[#5C9DFF]">
              <Music4 className="h-5 w-5" />
              <h3 className="font-heading text-xl font-black text-white">Daily rhythm</h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.rhythm.map((item, index) => (
                <div key={item} className="rounded-[1.1rem] border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/85">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full" style={{ background: secondary, color: '#1A1A2E' }}>
                    {index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={onEnrollNow}
              className="bg-[#F4C430] text-[#1A1A2E] hover:bg-[#FFD93D]"
            >
              <Sparkles className="h-4 w-4" />
              Admission Enquiry
              <ArrowRight className="h-4 w-4" />
            </Button>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/18"
            >
              <LayoutGrid className="h-4 w-4" />
              See All Programs
            </button>
          </div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
          >
            <div className="relative aspect-[4/3]">
              <InteractiveVideo src={videoSrc} autoPlay loop muted playsInline className="h-full w-full object-cover" />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {visuals[programTitle]!.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.08 * index }}
                className={`min-h-[8.5rem] rounded-[1.5rem] bg-gradient-to-br ${item.className} p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)]`}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.1rem] border border-white/25 bg-white/14 p-4 text-white backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <Star className="h-4 w-4" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">{programTitle}</span>
                  </div>
                  <p className="text-lg font-black leading-tight drop-shadow-sm">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-[#F4C430]">
              <Brain className="h-5 w-5" />
              <h3 className="font-heading text-xl font-black text-white">Learning outcomes</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/82">
              This stage focuses on confidence, communication, curiosity, and independence so your child grows step by step in a joyful way.
            </p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">Confidence in classroom routines</div>
              <div className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">Age-appropriate academic readiness</div>
              <div className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">Better social, emotional, and motor skills</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}





