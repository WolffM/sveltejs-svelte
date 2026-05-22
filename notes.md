## Steps to reproduce
1. Install dependencies with `corepack pnpm install`.
2. Add a cross-instance snippet compatibility case in `packages/svelte/tests/types/snippet.ts` that models a snippet created from another Svelte type instance (`OtherSnippetReturn: unique symbol`).
3. Run `corepack pnpm --dir packages/svelte check`.
4. Observe the failing assignment where `OtherSnippet` cannot be assigned to `Snippet`.

## Observed
TypeScript reported `TS2322` in `packages/svelte/tests/types/snippet.ts` on `const j: Snippet = from_other_svelte_instance;`. The error specifically showed that the return type intersection with `typeof OtherSnippetReturn` was not assignable to the local `typeof SnippetReturn` unique symbol brand. This demonstrates why snippets from separately-resolved Svelte type instances appear incompatible in consuming library/app setups.

## Expected
A snippet value that is structurally a valid Svelte snippet should be assignable to `Snippet`, even when it originates from another package boundary or another resolved copy of Svelte types. The branded diagnostic property should continue enforcing snippet-only rendering intent, but compatibility should not depend on per-module `unique symbol` identity that breaks library consumer type interoperability.
