"use client";

import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

import { useSession } from "@/lib/session";

import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";

/**
 * Společný obal pro všechny stránky za přihlášením.
 * Na počítači je navigace v postranním panelu vlevo, na mobilu se přesune
 * do lišty nahoře. Kdo přihlášený není, jde na přihlašovací stránku.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { user, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/prihlaseni");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh md:flex">
      <Sidebar user={user} />
      <MobileHeader user={user} />

      <div className="flex-1 bg-surface md:min-w-0">
        <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-10 md:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
