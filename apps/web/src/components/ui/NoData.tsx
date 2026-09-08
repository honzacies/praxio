import { EmptyState, Typography } from "@heroui/react";
import { Inbox } from "lucide-react";

/** Hláška, která se zobrazí, když v seznamu nic není. */
export function NoData({ message }: { message: string }) {
  return (
    <EmptyState className="items-center rounded-lg border border-dashed border-border py-12 text-center">
      <Inbox className="mb-3 size-6 text-muted" />
      <Typography color="muted" type="body-sm">
        {message}
      </Typography>
    </EmptyState>
  );
}
