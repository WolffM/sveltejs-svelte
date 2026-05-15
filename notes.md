## Steps to reproduce

1. Enabled the workspace package manager with `corepack enable` and `corepack prepare pnpm@10.4.0 --activate`.
2. Installed dependencies from `/home/runner/work/sveltejs-svelte/sveltejs-svelte` with `pnpm install`.
3. Created a temporary TypeScript reproduction in `/tmp/svelte-snippet-repro` with one top-level `svelte` type package and one nested `nested-lib/node_modules/svelte` type package, each exposing the current `Snippet` definition.
4. Ran `/home/runner/work/sveltejs-svelte/sveltejs-svelte/node_modules/.bin/tsc -p /tmp/svelte-snippet-repro/tsconfig.json`.

## Observed

TypeScript rejected `show(snippet)` even though both sides were spelled as `Snippet`. The failure pointed at the hidden `SnippetReturn: unique symbol` branding and reported that `import("/tmp/.../node_modules/svelte/index").Snippet` was not assignable to `import("/tmp/.../node_modules/nested-lib/node_modules/svelte/index").Snippet`. In other words, two package copies of the same public `Snippet` API became incompatible.

## Expected

A snippet value created in one package graph should remain assignable to a library API typed as `Snippet`, even when the library resolves `svelte` from its own nested dependency location. The public `Snippet` contract should describe callable snippet behavior without creating a package-instance-specific nominal barrier that breaks downstream library consumption.
