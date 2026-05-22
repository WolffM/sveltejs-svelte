declare module 'svelte-copy' {
	interface SnippetReturn {
		'{@render ...} must be called with a Snippet': "import type { Snippet } from 'svelte'";
	}

	export interface Snippet<Parameters extends unknown[] = []> {
		(this: void, ...args: number extends Parameters['length'] ? never : Parameters): SnippetReturn;
	}
}
