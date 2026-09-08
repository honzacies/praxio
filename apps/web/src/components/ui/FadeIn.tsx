"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  /**
   * O kolik se zpozdí start animace v sekundách. Když jde za sebou několik
   * prvků, postupně rostoucí zpoždění je rozjede jeden po druhém.
   */
  delay?: number;
  className?: string;
}

/**
 * Obsah se při zobrazení jemně vynoří a posune nahoru.
 *
 * Používáme komponentu `m.div` místo `motion.div`, protože `m` je odlehčená
 * varianta – schopnosti jí dodává <MotionProvider> až za běhu, takže se do
 * výsledného balíku nedostane celá knihovna.
 */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
