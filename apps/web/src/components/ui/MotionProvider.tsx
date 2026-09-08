"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Nastavení animací pro celou aplikaci.
 *
 * `LazyMotion` je doporučený postup knihovny Motion (dřívější Framer Motion)
 * pro malý výsledný balík: komponenty `m` samy o sobě neumí nic a schopnosti
 * se k nim dodají zvlášť. Sada `domAnimation` obsahuje jen animace a přechody,
 * ne rozpoznávání gest ani rozvržení – to nikde nepotřebujeme.
 *
 * `reducedMotion="user"` respektuje nastavení systému. Kdo má v operačním
 * systému omezené animace, uvidí obsah rovnou bez pohybu.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
