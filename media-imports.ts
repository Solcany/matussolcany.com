import type { PreprocessorGroup } from 'svelte/compiler';

const MEDIA_ATTRIBUTE = /\s(src|poster)="(\.\.?\/[^"]+)"/g;
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
const INSTANCE_SCRIPT = /<script(?![^>]*\bcontext=)(?![^>]*\bmodule\b)[^>]*>/;

export function mediaImports(): PreprocessorGroup {
	return {
		name: 'media-imports',
		markup({ content, filename }) {
			if (!filename?.endsWith('.svx')) return;

			const imports: string[] = [];
			const code = content.replace(MEDIA_ATTRIBUTE, (_, attribute, path) => {
				const name = `__media${imports.length}`;
				const responsive = attribute === 'src' && IMAGE.test(path);
				imports.push(`import ${name} from ${JSON.stringify(responsive ? `${path}?responsive` : path)};`);
				return responsive ? ` {...${name}}` : ` ${attribute}={${name}}`;
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
