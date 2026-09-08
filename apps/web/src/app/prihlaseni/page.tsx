import { SignInCard } from "@/components/auth/SignInCard";

/** Přihlašovací stránka. Obsah je vycentrovaný, patička drží dole. */
export default function SignInPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <SignInCard />
      </main>

      <footer className="px-5 pb-8 text-center text-xs text-muted">
        Maturitní práce · SOŠ a SOU podnikání a služeb Jablunkov
      </footer>
    </div>
  );
}
