import { useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export function useIsDesktop() {
  return useMediaQuery('(pointer: fine) and (min-width: 1024px)');
}

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      wheelMultiplier: 0.9
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [enabled]);
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return position;
}

export function useParallax(maxOffset = 24) {
  const position = useMousePosition();

  return useMemo(() => {
    if (typeof window === 'undefined') {
      return { x: 0, y: 0 };
    }

    return {
      x: (position.x / window.innerWidth - 0.5) * maxOffset,
      y: (position.y / window.innerHeight - 0.5) * maxOffset
    };
  }, [maxOffset, position.x, position.y]);
}

export function useIntersectionOnce<T extends Element>(threshold = 0.2) {
  const [ref, setRef] = useState<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [isVisible, ref, threshold]);

  return { ref, setRef, isVisible };
}
