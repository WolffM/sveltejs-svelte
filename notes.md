## Steps to reproduce

1. From `/home/runner/work/sveltejs-svelte/sveltejs-svelte`, install dependencies with `corepack pnpm install --frozen-lockfile`.
2. Add a focused type repro in `packages/svelte/tests/types/snippet.ts` that assigns a `Snippet` from `svelte` to an equivalent `Snippet` imported from a second declaration source (`svelte-copy`), modeling a library package consumed by another Svelte app.
3. Run `pnpm --dir packages/svelte check`.

## Observed

TypeScript rejected the assignment even though both snippet signatures had the same public shape. The failing trace was `TS2322: Type 'import(\".../src/index\").Snippet<[]>' is not assignable to type 'import(\"svelte-copy\").Snippet<[]>'.` The error narrowed the incompatibility to the branded return type using `unique symbol`, which became nominally different across two copies of the declarations.

## Expected

Two `Snippet` types with the same public API should remain assignable when they come from separately resolved copies of Svelte types, such as a built library package and the consuming app. A consumer-created `{#snippet ...}` value should satisfy a library API parameter typed as `Snippet` without requiring unsafe casts or exact declaration identity.
