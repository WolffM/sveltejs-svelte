type Snippet<Parameters extends unknown[] = []> = import('svelte').Snippet<Parameters>;

const return_type: ReturnType<Snippet> = null as any;

// @ts-expect-error
const a: Snippet<{ text: string }> = () => {};
// @ts-expect-error
const b: Snippet<boolean> = (a, b) => {
	return return_type;
};
// @ts-expect-error
const c: Snippet<boolean> = (a: string) => {
	return return_type;
};
// @ts-expect-error
const d: Snippet<boolean> = (a: string, b: number) => {
	return return_type;
};
// @ts-expect-error
const e: Snippet = (a: string) => {
	return return_type;
};
// @ts-expect-error
const f: Snippet = (a) => {
	a?.x;
	return return_type;
};
const g: Snippet<[boolean]> = (a) => {
	// @ts-expect-error
	a === '';
	a === true;
	return return_type;
};
const h: Snippet<[{ a: true }]> = (a) => {
	a.a === true;
	return return_type;
};
const i: Snippet = () => {
	return return_type;
};

declare module 'svelte-nested-copy' {
	export interface Snippet<Parameters extends unknown[] = []> {
		(
			this: void,
			...args: number extends Parameters['length'] ? never : Parameters
		): {
			'{@render ...} must be called with a Snippet': "import type { Snippet } from 'svelte'";
		};
	}
}

declare module 'snippet-library' {
	export function show(content: string | import('svelte-nested-copy').Snippet): void;
}

declare const nested_snippet: import('svelte-nested-copy').Snippet;

const j: Snippet = nested_snippet;
declare const show: typeof import('snippet-library').show;

show(i);
