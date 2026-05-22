## Steps to reproduce
1. Install dependencies with `corepack pnpm install` at the repository root.
2. Add a compatibility check in `packages/svelte/tests/types/snippet.ts` that simulates a library-exported `Snippet` type in a second declaration space (`from_library`) and assigns a local `Snippet` to it.
3. Run `corepack pnpm --dir packages/svelte check`.
4. Observe TypeScript diagnostics in `packages/svelte/tests/types/snippet.ts` for the assignment from local snippet to library snippet.

## Observed
TypeScript reports `TS2322` that `import(.../src/index).Snippet` is not assignable to `from_library.Snippet`. The error points to the branded return type using `typeof SnippetReturn` with `unique symbol`, making two otherwise identical `Snippet` signatures incompatible when they come from different declaration origins. This reproduces the real package-consumer scenario where snippet values fail to satisfy `string | Snippet` overloads across package boundaries.

## Expected
A snippet created in a consuming Svelte app should be assignable to `Snippet` in a library API signature imported from the built package, as long as both describe the same callable snippet shape. In other words, `show(content: string | Snippet)` should accept snippet blocks without requiring exact declaration identity of an internal unique symbol brand.
