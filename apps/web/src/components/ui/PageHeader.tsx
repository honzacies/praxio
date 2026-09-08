import { Separator, Typography } from "@heroui/react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  /** Druhá část nadpisu, kterou vypíšeme barvou značky. */
  highlight?: string;
  description?: string;
  /** Tlačítka vpravo (např. "Export do CSV"). */
  actions?: ReactNode;
  /** Řada drobných údajů pod nadpisem, viz komponenta MetaBox. */
  meta?: ReactNode;
}

/** Nadpis stránky s popiskem, doplňkovými údaji a akčními tlačítky. */
export function PageHeader({
  title,
  highlight,
  description,
  actions,
  meta,
}: PageHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Typography.Heading level={1}>
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="text-accent">{highlight}</span>
              </>
            ) : null}
          </Typography.Heading>

          {description ? (
            <Typography.Paragraph className="mt-2" color="muted" size="sm">
              {description}
            </Typography.Paragraph>
          ) : null}
        </div>

        {actions ? <div className="flex gap-2">{actions}</div> : null}
      </div>

      {meta ? (
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {meta}
        </div>
      ) : null}

      <Separator className="mt-6" />
    </header>
  );
}
