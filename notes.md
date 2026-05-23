## Steps to reproduce

1. Install dependencies with `corepack enable`, `corepack prepare pnpm@10.4.0 --activate`, and `pnpm install` from the repository root.
2. Add a compatibility check in `packages/svelte/tests/types/snippet.ts` that assigns an externally-declared `ExternalSnippet` to `Snippet`.
3. Run `pnpm --dir packages/svelte check` to execute runtime type checks, package type checks, and `packages/svelte/tests/types` type tests.

## Observed

TypeScript reports `TS2322` in `packages/svelte/tests/types/snippet.ts` for `const j: Snippet = external_snippet;`. The error explains that the return type branded with `unique symbol` from the external snippet is not assignable to Svelte’s `SnippetReturn` `unique symbol`, even though both snippets are structurally equivalent for usage.

## Expected

Snippets coming from separately-emitted declaration contexts (like an npm library and a consuming app) should still be assignable to `Snippet` when their callable signatures match. A value typed as external `Snippet` should satisfy `string | Snippet` method overloads without symbol-brand incompatibility errors.
