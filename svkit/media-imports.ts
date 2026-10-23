import type { PreprocessorGroup } from 'svelte/compiler';

const MEDIA_ATTRIBUTE = /\s(src|poster)="(\.\.?\/[^"]+)"/g;
const INSTANCE_SCRIPT = /<script(?![^>]*\bcontext=)(?![^>]*\bmodule\b)[^>]*>/;

export function mediaImports(): PreprocessorGroup {
	return {
		name: 'media-imports',
		markup({ content, filename }) {
			if (!filename?.endsWith('.svx')) return;

			const imports: string[] = [];
			const code = content.replace(MEDIA_ATTRIBUTE, (_, attribute, path) => {
				const name = `__media${imports.length}`;
				imports.push(`import ${name} from ${JSON.stringify(path)};`);
				return ` ${attribute}={${name}}`;
			});
			if (!imports.length) return;

			const statements = imports.join('\n');
			return {
				code: INSTANCE_SCRIPT.test(code)
					? code.replace(INSTANCE_SCRIPT, (tag) => `${tag}\n${statements}`)
					: `<script>\n${statements}\n</script>\n${code}`
			};
		}
	};
}
