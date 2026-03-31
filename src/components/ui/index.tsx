import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
  type VideoHTMLAttributes,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, X, Volume2, VolumeX } from 'lucide-react';
import { cn, formatCompact } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
};

export function Button({
  className,
  variant = 'primary',
  fullWidth,
  icon,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-[#F4C430] text-[#1A1A2E] shadow-lift hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#e6b820] hover:shadow-[0_28px_72px_rgba(244,196,48,0.45)] border-transparent',
    secondary:
      'bg-white text-[#4A0E8F] border border-[#4A0E8F]/25 shadow-soft hover:-translate-y-1 hover:bg-[#F4C430] hover:text-[#1A1A2E]',
    ghost: 'bg-transparent text-white hover:bg-white/18 border border-transparent',
    outline: 'bg-white text-[#4A0E8F] border border-[#4A0E8F]/30 shadow-soft hover:-translate-y-1'
  };

  return (
    <button
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-base font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/45 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        fullWidth && 'w-full',
        className
      )}
      type={type}
      {...props}
    >
      {icon ? <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span> : null}
      {children}
    </button>
  );
}

export function GlassCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[2rem] border border-white/50 bg-white/62 p-6 shadow-[0_24px_72px_rgba(20,30,56,0.2)] backdrop-blur-2xl transition-transform duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function InteractiveVideo({ muted: mutedProp, className, ...props }: VideoHTMLAttributes<HTMLVideoElement>) {
  const [isMuted, setIsMuted] = useState(Boolean(mutedProp ?? true));
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      videoRef.current.defaultMuted = nextMuted;
      setIsMuted(nextMuted);

      if (!nextMuted) {
        void videoRef.current.play().catch(() => undefined);
      }
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        muted={isMuted}
        {...props}
      />
      <button
        onClick={toggleMute}
        className="pointer-events-auto absolute bottom-4 right-4 z-[200] flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/65 shadow-xl"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.32em] text-purple/80">{eyebrow}</p>
      <h2 className="font-heading text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-ink/75 sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function StatCounter({
  value,
  suffix = '',
  duration = 1800,
  className
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [duration, value]);

  return (
    <span className={cn('font-heading text-4xl font-semibold text-ink sm:text-5xl', className)}>
      {formatCompact(count)}
      {suffix}
    </span>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-ink shadow-soft', className)}>
      {children}
    </span>
  );
}

export function CheckPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-medium text-ink shadow-soft">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-white">
        <Check className="h-3.5 w-3.5" />
      </span>
      {children}
    </span>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }
>(function Input({ className, label, error, ...props }, ref) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold text-ink sm:mb-2 sm:text-sm">{label}</span>
      <input
        ref={ref}
        className={cn(
          'min-h-10 w-full rounded-[1.15rem] border border-white/70 bg-white/75 px-3 py-2 text-[13px] text-ink shadow-soft outline-none transition focus:border-purple/45 focus:ring-4 focus:ring-purple/10 sm:min-h-12 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base',
          error && 'border-coral/60 focus:border-coral/60 focus:ring-coral/10',
          className
        )}
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-coral">{error}</span> : null}
    </label>
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }
>(function Textarea({ className, label, error, ...props }, ref) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold text-ink sm:mb-2 sm:text-sm">{label}</span>
      <textarea
        ref={ref}
        className={cn(
          'min-h-20 w-full rounded-[1.2rem] border border-white/70 bg-white/75 px-3 py-2 text-[13px] text-ink shadow-soft outline-none transition focus:border-purple/45 focus:ring-4 focus:ring-purple/10 sm:min-h-32 sm:rounded-3xl sm:px-4 sm:py-3 sm:text-base',
          error && 'border-coral/60 focus:border-coral/60 focus:ring-coral/10',
          className
        )}
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-coral">{error}</span> : null}
    </label>
  );
});

export function StepDots({ steps, active }: { steps: readonly string[]; active: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step, index) => {
        const isActive = index === active;
        const isCompleted = index < active;
        return (
          <div
            key={step}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all',
              isActive && 'bg-purple text-white shadow-lift',
              isCompleted && !isActive && 'bg-mint text-ink',
              !isActive && !isCompleted && 'bg-white/70 text-ink/70'
            )}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/35 text-xs">
              {index + 1}
            </span>
            {step}
          </div>
        );
      })}
    </div>
  );
}

export function CarouselControls({
  onPrev,
  onNext
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-ink shadow-soft transition hover:-translate-y-0.5"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-ink shadow-soft transition hover:-translate-y-0.5"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export function Modal({
  open,
  title,
  description,
  onClose,
  children
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
    };
  }, [onClose, open]);

  const portalRoot = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return document.body;
  }, []);

  if (!portalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/35 px-4 py-6 backdrop-blur-xl"
          onMouseDown={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ y: 40, scale: 0.94, rotateX: 8 }}
            animate={{ y: 0, scale: 1, rotateX: 0 }}
            exit={{ y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_40px_120px_rgba(44,44,44,0.22)]"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink/5 px-6 py-5">
              <div>
                <h3 id="modal-title" className="font-heading text-2xl text-ink">
                  {title}
                </h3>
                {description ? <p className="mt-1 text-sm text-ink/70">{description}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-soft transition hover:-translate-y-0.5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto px-6 py-6">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalRoot
  );
}
