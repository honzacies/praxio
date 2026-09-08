"use client";

import { Button, Card, Separator, Typography } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SCHOOL_DOMAIN } from "@praxio/shared";

import { FadeIn } from "@/components/ui/FadeIn";
import { Logo } from "@/components/ui/Logo";
import { useSession } from "@/lib/session";

import { DemoAccountList } from "./DemoAccountList";
import { GoogleIcon } from "./GoogleIcon";

/** Přihlašovací karta. Zatím jen vybírá ukázkový účet místo Google účtu. */
export function SignInCard() {
  const { signIn } = useSession();
  const router = useRouter();
  const [showAccounts, setShowAccounts] = useState(false);

  function handleSelect(userId: string) {
    signIn(userId);
    router.push("/");
  }

  return (
    <FadeIn className="w-full max-w-sm">
      <div className="bg-surface-secondary px-2 py-10 rounded-[20px]">
        <div className="flex gap-0 flex-col items-center">
          <Logo size={80} />
          <div className="flex flex-col items-center justify-center">
            <Typography
              className="mt-2 mb-2 text-accent"
              type="h3"
              weight="semibold"
            >
              Praxio
            </Typography>
            <Typography
              className="leading-5.5 text-center"
              color="muted"
              type="body-sm"
            >
              Evidence příchodů a odchodů žáků na pracovišti pomocí{" "}
              <span className="font-medium text-accent">QR kódu</span> a ověření
              polohy.
            </Typography>
          </div>
        </div>

        <div className="p-5 bg-transparent border-0!">
          {showAccounts ? (
            <FadeIn>
              <Separator className="mb-4" />
              <Typography
                className="mb-2 font-semibold tracking-wider text-accent uppercase"
                type="body-xs"
              >
                Ukázkové účty
              </Typography>
              <DemoAccountList onSelect={handleSelect} />
            </FadeIn>
          ) : (
            <Button
              fullWidth
              onPress={() => setShowAccounts(true)}
              variant="outline"
            >
              <GoogleIcon className="size-4" />
              Přihlásit se školním účtem
            </Button>
          )}
        </div>

        <Typography
          className="mt-4 w-full text-center"
          color="muted"
          type="body-xs"
        >
          Přihlásit se mohou pouze účty z domény{" "}
          <span className="font-medium text-accent">@{SCHOOL_DOMAIN}</span>. Ve
          finální verzi je výběr účtu nahradí přihlášení přes Google.
        </Typography>
      </div>
    </FadeIn>
  );
}
