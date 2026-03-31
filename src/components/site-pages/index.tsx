import { ArrowLeft, ShieldCheck, FileText, Info } from 'lucide-react';

import { Button } from '@/components/ui';
import { site } from '@/lib/content';

export type StaticPage = 'about-us' | 'privacy-policy' | 'disclaimer';

const staticRoutes: Record<StaticPage, string> = {
  'about-us': '/about-us',
  'privacy-policy': '/privacy-policy',
  disclaimer: '/disclaimer'
};

export function getStaticPath(page: StaticPage) {
  return staticRoutes[page];
}

export function getStaticPageFromPath(pathname: string): StaticPage | null {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const found = (Object.entries(staticRoutes) as [StaticPage, string][])
    .find(([, value]) => value === normalized);
  return found?.[0] ?? null;
}

export function StaticPageView({ page, onBack }: { page: StaticPage; onBack: () => void }) {
  const content = {
    'about-us': {
      icon: <Info className="h-5 w-5" />,
      title: 'About Us',
      subtitle: `Welcome to ${site.name}`,
      body: [
        `${site.name} is a joyful, child-first preschool built for early learning through play, creativity, and care.`,
        'Our educators focus on emotional safety, foundational learning, and confidence building in every child.',
        'We partner with families closely so children feel secure, happy, and excited to learn every day.'
      ]
    },
    'privacy-policy': {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: 'Privacy Policy',
      subtitle: 'How we use your information',
      body: [
        'We collect only basic information shared through enquiry forms, such as name, phone number, and email.',
        'Your information is used only for admission support, communication, and parent assistance.',
        'We do not sell personal data. Access is restricted to authorized staff only.'
      ]
    },
    disclaimer: {
      icon: <FileText className="h-5 w-5" />,
      title: 'Disclaimer',
      subtitle: 'General information notice',
      body: [
        'All website content is provided for general preschool information and parent guidance.',
        'Program details, media, facilities, and schedules may be updated from time to time.',
        'For final admission decisions and official communication, please contact the school directly.'
      ]
    }
  }[page];

  return (
    <main className="relative min-h-screen px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto flex w-full max-w-5xl items-start justify-between gap-4 rounded-[2rem] border border-white/15 bg-white/10 px-4 py-4 text-white backdrop-blur-xl md:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-white/65">Footer Page</p>
          <h1 className="mt-1 font-heading text-2xl font-black sm:text-4xl">{content.title}</h1>
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

      <section className="mx-auto mt-6 max-w-5xl rounded-[2rem] border border-white/20 bg-white/15 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F4C430] px-4 py-2 text-sm font-black text-[#1A1A2E]">
          {content.icon}
          {content.subtitle}
        </div>

        <div className="mt-6 space-y-4">
          {content.body.map((paragraph) => (
            <p key={paragraph} className="rounded-[1.25rem] border border-white/12 bg-black/20 px-4 py-3 text-sm leading-7 text-white/90 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-7">
          <Button onClick={onBack} className="bg-[#F4C430] text-[#1A1A2E] hover:bg-[#FFD93D]">
            Back to Home
          </Button>
        </div>
      </section>
    </main>
  );
}
