# moar-mui

A curated set of custom React components built on top of [Material UI](https://mui.com/). Strict-typed, tree-shakable, ESM-first.

## Stack

- **React 19** + **Material UI 9** (peer-dep, BYO) + **Emotion 11**
- **TypeScript 6** with the strictest tier of type-checking
- **tsup** (ESM, per-component bundles, source maps, declaration files)
- **Vitest 4** + **@testing-library/react** + **jest-dom**
- **Storybook 10** (react-vite) with a11y, themes, and Vitest test runner addons
- **ESLint 10** flat config: `typescript-eslint` strict-type-checked + `stylistic-type-checked`, plus `react`, `react-hooks`, `jsx-a11y/strict`, `import`, `unicorn`, and `perfectionist`
- **pnpm 10**

## Install

```bash
pnpm add moar-mui @mui/material @emotion/react @emotion/styled
```

## Usage

The library has two import surfaces — both tree-shake equivalently:

```tsx
// barrel — convenient
import { MoarButton, createMoarTheme } from 'moar-mui';

// per-component subpath — explicit, smallest possible graph
import { MoarButton } from 'moar-mui/MoarButton';
import { createMoarTheme } from 'moar-mui/theme';
```

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createMoarTheme, MoarButton } from 'moar-mui';

export const App = () => (
  <ThemeProvider theme={createMoarTheme()}>
    <CssBaseline />
    <MoarButton pill variant="contained">Hello</MoarButton>
  </ThemeProvider>
);
```

## Adding a new component

Each component lives in `src/components/<ComponentName>/` with five files:

```
src/components/MoarThing/
  MoarThing.tsx          // the component (forwardRef + styled)
  MoarThing.types.ts     // public Props interface
  MoarThing.test.tsx     // Vitest + RTL + jest-dom
  MoarThing.stories.tsx  // Storybook (CSF 3 + autodocs)
  index.ts               // re-exports
```

Then add the component's barrel re-export to `src/components/index.ts`:

```ts
export * from './MoarThing';
```

`tsup` discovers the new directory automatically and builds `dist/components/MoarThing/index.js` plus a matching `.d.ts`. The `exports` field in `package.json` already routes `moar-mui/MoarThing` to it via the `./*` subpath pattern — no manual wiring needed.

Use `MoarButton` as the canonical template.

## Scripts

```bash
pnpm dev               # tsup --watch
pnpm build             # production build (ESM + DTS)
pnpm typecheck         # tsc --noEmit
pnpm lint              # eslint
pnpm lint:fix          # eslint --fix
pnpm format            # prettier --write
pnpm test              # vitest run
pnpm test:watch        # vitest
pnpm test:coverage     # vitest run --coverage (80% thresholds)
pnpm storybook         # storybook dev (port 6006)
pnpm build-storybook   # storybook build → storybook-static/
pnpm validate          # typecheck + lint + test + build
```

## Tree-shaking notes

- `"type": "module"` + `"sideEffects": false` → bundlers can drop unused exports.
- `tsup` runs with `splitting: true` so shared internals are extracted into chunks; barrel imports cost the same as direct subpath imports after bundling.
- React, ReactDOM, MUI, and Emotion are declared as peer dependencies and marked `external` in `tsup.config.ts` so the consumer's bundle stays single-instance.
- The `exports` map exposes only `dist/`, types are co-located, and there's no CJS fallback (modern bundlers + Node ≥ 20.19 only).

## License

MIT — see [LICENSE](./LICENSE).
