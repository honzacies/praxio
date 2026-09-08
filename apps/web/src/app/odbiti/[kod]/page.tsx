import { CheckInScreen } from "@/components/checkin/CheckInScreen";
import { LogoWithName } from "@/components/ui/Logo";

/**
 * Stránka, na kterou žáka pošle QR kód.
 * V adrese je kód pracoviště, například /odbiti/PRX-7QK2-M4XA.
 * Samotné vyhledání pracoviště probíhá až v prohlížeči, protože tam
 * jsou uložená data aplikace.
 */
export default async function CheckInPage({
  params,
}: {
  params: Promise<{ kod: string }>;
}) {
  const { kod } = await params;

  return (
    <div className="min-h-dvh bg-background">
      <header className="flex justify-center border-b border-border py-4">
        <LogoWithName size={26} />
      </header>

      <main className="mx-auto w-full max-w-md px-4 py-8">
        <CheckInScreen qrCode={kod} />
      </main>
    </div>
  );
}
