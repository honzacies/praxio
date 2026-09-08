# Praxio

Webová aplikace pro evidenci příchodů a odchodů žáků na pracovišti pomocí QR
kódu a ověření GPS polohy. Maturitní práce, SOŠ a SOU podnikání a služeb
Jablunkov.

> **Stav projektu:** hotový je **frontend**. Všechny funkce ze zadání jsou
> plně funkční – data se ukládají do prohlížeče (localStorage), takže
> přežijí obnovení stránky. Backend, databáze a skutečné přihlášení
> školním Google účtem přijdou v další fázi.

## Jak to funguje

1. Učitel nebo admin založí pracoviště a zadá jeho GPS souřadnice a povolený okruh.
2. Aplikace k pracovišti vygeneruje QR kód, který se vytiskne a vyvěsí na místě.
3. Žák naskenuje QR kód mobilem a otevře se mu stránka pro odbití.
4. Aplikace si vyžádá jeho polohu a spočítá vzdálenost od pracoviště.
5. Pokud je žák v povoleném okruhu, může uložit **příchod** nebo **odchod**.
6. Učitel si záznamy prohlédne v administraci a může je exportovat do CSV.

## Použité technologie

| Vrstva | Technologie |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19 |
| Jazyk | TypeScript |
| Styly | Tailwind CSS v4 |
| Komponenty | HeroUI v3 |
| Ikony | lucide-react |
| QR kódy | qrcode.react |
| Písmo | Inter (přes `next/font`) |
| Animace | Motion (Framer Motion) přes `LazyMotion` |
| Monorepo | pnpm workspaces + Turborepo |

## Struktura projektu

```
maturitni prace/
├── apps/
│   └── web/                # frontend aplikace (Next.js)
├── packages/
│   └── shared/             # sdílené typy, konstanty a výpočet vzdálenosti
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

Balíček `packages/shared` je oddělený schválně: typy jako `User` nebo
`AttendanceRecord` a funkce `distanceInMeters` bude později používat i backend,
takže nebudou existovat ve dvou verzích.

### Rozdělení frontendu

```
apps/web/src/
├── app/                    # stránky (App Router)
│   ├── (app)/              # stránky za přihlášením, mají společnou hlavičku
│   ├── odbiti/[kod]/       # stránka, na kterou vede QR kód
│   └── prihlaseni/         # přihlašovací stránka
├── components/
│   ├── admin/              # tabulka uživatelů, souhrnná čísla
│   ├── attendance/         # tabulka záznamů, filtry, detail
│   ├── auth/               # přihlašovací karta
│   ├── checkin/            # formulář pro odbití a ověření polohy
│   ├── dashboard/          # karty na hlavní stránce žáka
│   ├── layout/             # hlavička, navigace, kontrola role
│   ├── ui/                 # malé opakující se prvky (tlačítka, karty, pole)
│   └── workplace/          # správa pracovišť a QR kód
├── data/                   # výchozí ukázková data
├── hooks/                  # useGeolocation, useToday
└── lib/                    # store, úložiště, formátování, CSV, filtry
```

Data aplikace drží `lib/store.tsx` a ukládá je přes `lib/storage.ts` do
localStorage. Až bude hotové API, vymění se vnitřek těchto dvou souborů
za volání endpointů a stránky zůstanou beze změny.

## Stránky

| Adresa | Popis |
| --- | --- |
| `/prihlaseni` | Výběr školního účtu |
| `/` | Hlavní stránka žáka – dnešní docházka a poslední záznamy |
| `/moje-zaznamy` | Kompletní historie záznamů žáka |
| `/odbiti/[kod]` | Formulář pro odbití po naskenování QR kódu |
| `/admin` | Souhrn docházky pro učitele a admina |
| `/admin/zaznamy` | Všechny záznamy s filtry, přepínáním dne a exportem do CSV |
| `/admin/pracoviste` | Správa pracovišť – tabulka s hledáním, řazením a filtry |
| `/admin/pracoviste/[id]` | Detail pracoviště a jeho QR kód |
| `/admin/uzivatele` | Seznam uživatelů a přidělování rolí (jen admin) |

## Role uživatelů

| Role | Co smí |
| --- | --- |
| `STUDENT` | Odbít si příchod a odchod, vidět jen své vlastní záznamy |
| `TEACHER` | Navíc vidí administraci, záznamy žáků a zakládá pracoviště. Upravit a smazat může jen ta, která sám založil. |
| `ADMIN` | Dohlíží na vše – smí upravit i cizí pracoviště a přiděluje uživatelům role |

Nový účet vzniká vždy v roli žáka. Učitele z něj udělá administrátor
změnou role na stránce `/admin/uzivatele`.

## Spuštění

Potřebujete Node.js 20+ a pnpm.

Instalace pnpm:
```bash
npm install -g pnpm@12.3.4
```

Pak:

```bash
pnpm install
pnpm dev
```

Aplikace poběží na <http://localhost:3000>.

Další příkazy:

```bash
pnpm build      # produkční build
pnpm typecheck  # kontrola typů
```

## Ukázkový režim

Aplikace zatím nemá backend, proto data místo databáze žijí v prohlížeči.
Všechno ostatní funguje tak, jak bude fungovat i v ostré verzi:

- **Přihlášení** místo Google účtu nabízí seznam ukázkových uživatelů. Vybraný
  uživatel se ukládá do `localStorage`.
- **Simulace polohy** na stránce pro odbití umožňuje nastavit polohu ručně,
  takže jde vyzkoušet i situaci „žák je moc daleko“ bez cestování na pracoviště.
  Vedle toho funguje i skutečné `navigator.geolocation`.
- **Pracoviště i záznamy** se ukládají do localStorage. Nové pracoviště, jeho
  úprava i odbití tedy zůstanou i po obnovení stránky.
- **Ukázkové záznamy** se skládají vždy k aktuálnímu datu (víkendy se
  přeskakují), aby přehled dnešní docházky nebyl prázdný.
- **Obnovit ukázková data** v administraci vrátí aplikaci do výchozího stavu –
  hodí se před předváděním.

## Co bude následovat

- API server ve Fastify, databáze PostgreSQL a Prisma
- Skutečné přihlášení školním Google účtem (NextAuth) s omezením na doménu
  `@sosjablunkov.cz`
- Ověřování polohy na straně serveru, aby ho nešlo obejít v prohlížeči
- Tabulka `audit_logs` pro záznam důležitých akcí
