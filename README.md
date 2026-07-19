# Flash Sale Reservation Engine — Frontend

Frontend for a flash sale seat reservation system. Users reserve a seat for 5 minutes and must complete payment before the timer expires.

See [docs/srs.md](docs/srs.md) for the full spec (tech stack, folder structure, flows, API contracts).

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Zustand (state)
- TanStack Query + Axios (data fetching)
- Better Auth + JWT (auth, incl. guest sessions)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm lint` | Run ESLint |

## Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # UI components (ui, shared, reservation, payment, seat, auth, layout)
├── features/     # Feature modules (auth, reservation, payment, seat, guest)
├── hooks/        # Reusable React hooks
├── services/     # API service calls
├── store/        # Zustand stores
├── providers/    # App-level context/providers
├── lib/          # Shared library code (e.g. axios instance)
├── types/        # TypeScript types
├── constants/    # App-wide constants
├── utils/        # Utility functions
└── proxy.ts
```
