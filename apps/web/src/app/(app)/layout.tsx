import { AppShell } from "@/components/layout/AppShell";

/**
 * Rozvržení pro stránky za přihlášením.
 * Složka v závorkách slouží jen k seskupení, do adresy se nepromítne.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
