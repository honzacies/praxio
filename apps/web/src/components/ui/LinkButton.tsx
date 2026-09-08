import { buttonVariants } from "@heroui/react";
import type { ButtonVariants } from "@heroui/react";
import Link from "next/link";
import type { ReactNode } from "react";

interface LinkButtonProps extends ButtonVariants {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Odkaz, který vypadá jako tlačítko HeroUI.
 * Funkce buttonVariants nám vrátí stejné třídy, jaké používá <Button>,
 * takže odkaz i tlačítko vypadají úplně stejně.
 */
export function LinkButton({
  href,
  children,
  className,
  ...variants
}: LinkButtonProps) {
  return (
    <Link className={buttonVariants({ ...variants, className })} href={href}>
      {children}
    </Link>
  );
}
