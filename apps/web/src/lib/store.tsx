"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AttendanceRecord, Role, User, Workplace } from "@praxio/shared";

import { createSeedRecords } from "@/data/records";
import { DEFAULT_USERS } from "@/data/users";
import { DEFAULT_WORKPLACES } from "@/data/workplaces";

import * as storage from "./storage";

/** Data celé aplikace na jednom místě. Zastupuje databázi a API. */
interface StoreValue {
  users: User[];
  workplaces: Workplace[];
  records: AttendanceRecord[];
  /** false, dokud si z prohlížeče nenačteme uložená data. */
  isReady: boolean;
  addWorkplace: (workplace: Workplace) => void;
  updateWorkplace: (workplace: Workplace) => void;
  removeWorkplace: (id: string) => void;
  addRecord: (record: AttendanceRecord) => void;
  updateUserRole: (userId: string, role: Role) => void;
  resetToSampleData: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

/** Nejnovější záznam patří na začátek seznamu. */
function newestFirst(records: AttendanceRecord[]): AttendanceRecord[] {
  return [...records].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [workplaces, setWorkplaces] = useState<Workplace[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isReady, setIsReady] = useState(false);

  // localStorage na serveru neexistuje, načteme až v prohlížeči.
  useEffect(() => {
    setUsers(storage.loadUsers() ?? DEFAULT_USERS);
    setWorkplaces(storage.loadWorkplaces() ?? DEFAULT_WORKPLACES);
    setRecords(newestFirst(storage.loadRecords() ?? createSeedRecords()));
    setIsReady(true);
  }, []);

  /** Zapíše seznam pracovišť do stavu i do prohlížeče. */
  function commitWorkplaces(next: Workplace[]) {
    setWorkplaces(next);
    storage.saveWorkplaces(next);
  }

  function addRecord(record: AttendanceRecord) {
    const next = newestFirst([record, ...records]);
    setRecords(next);
    storage.saveRecords(next);
  }

  /** Změní roli uživatele. Tuhle akci smí vyvolat jen administrátor. */
  function updateUserRole(userId: string, role: Role) {
    const next = users.map((u) => (u.id === userId ? { ...u, role } : u));
    setUsers(next);
    storage.saveUsers(next);
  }

  /** Vrátí aplikaci do výchozího stavu, hodí se před předváděním. */
  function resetToSampleData() {
    storage.clearStoredData();
    setUsers(DEFAULT_USERS);
    setWorkplaces(DEFAULT_WORKPLACES);
    setRecords(newestFirst(createSeedRecords()));
  }

  const value = {
    users,
    workplaces,
    records,
    isReady,
    addRecord,
    updateUserRole,
    resetToSampleData,
    addWorkplace: (w: Workplace) => commitWorkplaces([...workplaces, w]),
    updateWorkplace: (w: Workplace) =>
      commitWorkplaces(workplaces.map((i) => (i.id === w.id ? w : i))),
    removeWorkplace: (id: string) =>
      commitWorkplaces(workplaces.filter((i) => i.id !== id)),
  };

  return <StoreContext value={value}>{children}</StoreContext>;
}

/** Zpřístupní data aplikace. Funguje jen uvnitř <StoreProvider>. */
export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value)
    throw new Error("useStore musí být použit uvnitř <StoreProvider>.");
  return value;
}
