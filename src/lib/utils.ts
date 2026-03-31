import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToId(id: string, offset = 92) {
  const element = document.getElementById(id);
  if (!element) return;

  const top = window.scrollY + element.getBoundingClientRect().top - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 0
  }).format(value);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
