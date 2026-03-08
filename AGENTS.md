# AGENTS.md

## Cursor Cloud specific instructions

This is a **static Next.js research website** (single-page, no backend/database/API). All data lives in `src/data/*.ts`.

### Running the app

- **Dev server**: `npm run dev` (port 3000)
- **Lint**: `npm run lint`
- **Build**: `npm run build`

See `README.md` for full documentation.

### Notes

- There are no automated tests (no test framework configured). Validation is done via lint and build.
- The site uses static export; no server-side runtime dependencies are needed.
- Unsplash remote images are configured in `next.config.ts` but are not required for the site to load.
