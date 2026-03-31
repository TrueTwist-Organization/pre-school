import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BadgeInfo, CheckCircle2, MapPin, Phone, School, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui';
import { steps, site } from '@/lib/content';

export type AdmissionStep = (typeof steps)[number];

const routeMap: Record<AdmissionStep, string> = {
  Inquiry: 'inquiry',
  Visit: 'visit',
  Registration: 'registration',
  'Start Learning': 'start-learning'
};

const details: Record<AdmissionStep, {
  subtitle: string;
  overview: string;
  points: string[];
  color: string;
  accent: string;
  image: string;
  icon: string;
}> = {
  Inquiry: {
    subtitle: 'A friendly first conversation for parents',
    overview:
      'Start with a quick call or message. Our team listens to your needs, explains the curriculum and helps you understand the best fit for your child.',
    points: [
      'We answer all admission-related questions clearly',
      'You can connect through call, WhatsApp or visit in person',
      'We explain age groups, timings and daily routines',
      'Our team guides you with the next steps calmly'
    ],
    color: '#FF9F1C',
    accent: '#FFF0D9',
    image: '/inquiry-bg.png',
    icon: '📞'
  },
  Visit: {
    subtitle: 'See the campus and feel the atmosphere',
    overview:
      'Book a visit to experience classrooms, play zones and the caring environment firsthand. Parents often say this visit helps them make the decision confidently.',
    points: [
      'Campus tour with a friendly staff member',
      'Explore classrooms, play spaces and child-safe areas',
      'Meet teachers and understand the learning culture',
      'Ask any follow-up questions during the visit'
    ],
    color: '#4D96FF',
    accent: '#DDEEFF',
    image: '/visit-bg.png',
    icon: '🏫'
  },
  Registration: {
    subtitle: 'Simple, guided and parent-friendly paperwork',
    overview:
      'Once you are ready, we help you complete registration smoothly. The process is kept easy and transparent so families feel supported at every step.',
    points: [
      'Fill out the registration form carefully with our help',
      'Submit the required documents in a guided way',
      'Receive confirmation and fee details transparently',
      'We help you complete the final formalities smoothly'
    ],
    color: '#6BCB77',
    accent: '#E0F5E4',
    image: '/registration-bg.png',
    icon: '📄'
  },
  'Start Learning': {
    subtitle: 'Your child joins a joyful learning family',
    overview:
      'After registration, your child steps into a joyful, caring learning journey. We focus on confidence, routine, growth and happy first-school memories.',
    points: [
      'A warm welcome on the first day of school',
      'Gentle settling-in support for children and parents',
      'Daily routines that build confidence and independence',
      'A joyful beginning filled with learning and play'
    ],
    color: '#FF6B9D',
    accent: '#FFE0EC',
    image: '/start-learning-bg.png',
    icon: '🎒'
  }
};

const quickInfo: Record<AdmissionStep, string[]> = {
  Inquiry: ['Admission enquiry', 'Phone support', 'Friendly guidance'],
  Visit: ['Campus tour', 'Meet teachers', 'See classrooms'],
  Registration: ['Form submission', 'Document check', 'Confirmation'],
  'Start Learning': ['First day ready', 'Confidence building', 'Joyful routine']
};

export function getAdmissionPath(step: AdmissionStep) {
  return `/admission/${routeMap[step]}`;
}

export function getAdmissionStepFromPath(pathname: string) {
  const slug = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (slug[0] !== 'admission' || !slug[1]) return null;
  const found = (Object.entries(routeMap) as [AdmissionStep, string][]).find(([, value]) => value === slug[1]);
  return found?.[0] ?? null;
}

export function AdmissionDetailPage({
  step,
  onBack,
  onEnrollNow
}: {
  step: AdmissionStep;
  onBack: () => void;
  onEnrollNow: () => void;
}) {
  const data = details[step]!;

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 md:px-6 md:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img src={data.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,28,0.78)_0%,rgba(12,8,28,0.58)_36%,rgba(12,8,28,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_24%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-4 rounded-[2rem] border border-white/15 bg-white/10 px-4 py-4 text-white backdrop-blur-xl md:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-white/65">Admission Page</p>
          <h1 className="mt-1 font-heading text-2xl font-black sm:text-4xl">{step}</h1>
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
            Admission Step
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-5 font-heading text-4xl font-black leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)] sm:text-5xl"
          >
            {step}
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
              <img src={data.image} alt={step} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {quickInfo[step].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.08 * index }}
                className="aspect-square overflow-hidden rounded-[1.25rem] border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <div className="flex h-full w-full flex-col items-center justify-center bg-white/12 p-3 text-center text-white backdrop-blur-md">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: data.accent, color: '#1A1A2E' }}>
                    {index + 1}
                  </div>
                  <p className="text-xs font-bold leading-5">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-[#F4C430]">
              <School className="h-5 w-5" />
              <h3 className="font-heading text-xl font-black text-white">Why this step matters</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/82">
              This step helps parents move forward with clarity and confidence while keeping the experience warm and simple.
            </p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">Clear guidance</div>
              <div className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">Friendly support</div>
              <div className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">Simple next step</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-[#6BCB77]">
              <Phone className="h-5 w-5" />
              <h3 className="font-heading text-xl font-black text-white">Need help now?</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/82">Call us or send an inquiry using the contact section. We are happy to guide you.</p>
            <div className="mt-5 flex items-center gap-2 rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/84">
              <MapPin className="h-4 w-4 text-[#67C97C]" />
              {site.address}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

