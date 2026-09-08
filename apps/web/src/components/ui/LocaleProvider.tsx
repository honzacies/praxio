"use client";

import { I18nProvider } from "@react-aria/i18n";
import type { ReactNode } from "react";

/**
 * Nastaví češtinu pro komponenty postavené na React Aria.
 * Bez toho by se kalendář řídil jazykem prohlížeče – anglicky pojmenované
 * měsíce a týden začínající nedělí místo pondělí.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  return <I18nProvider locale="cs-CZ">{children}</I18nProvider>;
}
