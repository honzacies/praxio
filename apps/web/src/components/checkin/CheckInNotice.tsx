import { Card, Typography } from "@heroui/react";
import { TriangleAlert } from "lucide-react";

import { LinkButton } from "@/components/ui/LinkButton";

interface CheckInNoticeProps {
  title: string;
  description: string;
  /** Nepovinné tlačítko, které uživateli poradí, co dál. */
  action?: { href: string; label: string };
}

/** Karta s vysvětlením, proč odbití zrovna teď nejde. */
export function CheckInNotice({
  title,
  description,
  action,
}: CheckInNoticeProps) {
  return (
    <Card className="items-center p-8 text-center">
      <TriangleAlert className="size-7 text-warning" />

      <Card.Header className="mt-2 items-center">
        <Card.Title>{title}</Card.Title>
        <Typography className="mt-1" color="muted" type="body-sm">
          {description}
        </Typography>
      </Card.Header>

      {action ? (
        <Card.Footer className="mt-4 w-full">
          <LinkButton className="w-full" href={action.href} variant="primary">
            {action.label}
          </LinkButton>
        </Card.Footer>
      ) : null}
    </Card>
  );
}
