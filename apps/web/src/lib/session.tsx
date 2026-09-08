"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@praxio/shared";

import { DEFAULT_USERS, findUser } from "@/data/users";

/**
 * Náhrada za skutečné přihlášení (NextAuth). Zatím si jen pamatujeme,
 * který ukázkový uživatel je "přihlášený", a ukládáme to do localStorage.
 */
interface SessionValue {
  user: User | null;
  /** true, dokud si z localStorage nenačteme uloženého uživatele. */
  isLoading: boolean;
  signIn: (userId: string) => void;
  signOut: () => void;
}

const STORAGE_KEY = "praxio-user-id";

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Po načtení stránky zkusíme obnovit posledního přihlášeného uživatele.
  useEffect(() => {
    const savedId = localStorage.getItem(STORAGE_KEY);
    setUser(savedId ? (findUser(DEFAULT_USERS, savedId) ?? null) : null);
    setIsLoading(false);
  }, []);

  function signIn(userId: string) {
    localStorage.setItem(STORAGE_KEY, userId);
    setUser(findUser(DEFAULT_USERS, userId) ?? null);
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <SessionContext value={{ user, isLoading, signIn, signOut }}>
      {children}
    </SessionContext>
  );
}

/** Vrátí informace o přihlášeném uživateli. Funguje jen uvnitř SessionProvideru. */
export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error("useSession musí být použit uvnitř <SessionProvider>.");
  }
  return value;
}
