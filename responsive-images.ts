import sharp from 'sharp';
import type { Plugin } from 'vite';

const QUERY = '?responsive';
const STEPS = [480, 768, 1080, 1366, 1600];

export function responsiveImages(): Plugin {
	return {
		name: 'responsive-images',
		enforce: 'pre',
		async resolveId(id, importer) {
			if (!id.endsWith(QUERY)) return;
			const resolved = await this.resolve(id.slice(0, -QUERY.length), importer, { skipSelf: true });
			return resolved && resolved.id + QUERY;
		},
		async load(id) {
			if (!id.endsWith(QUERY)) return;
			const file = id.slice(0, -QUERY.length);
			const { width, height } = await sharp(file).metadata();
			const steps = STEPS.filter((step) => step < width);
			return [
				`import src from ${JSON.stringify(file)};`,
				steps.length
					? `import smaller from ${JSON.stringify(`${file}?w=${steps.join(';')}&format=webp&as=srcset`)};`
					: `const smaller = '';`,
				`const srcset = [smaller, src + ' ${width}w'].filter(Boolean).join(', ');`,
				`export default { src, srcset, width: ${width}, height: ${height} };`
			].join('\n');
		}
	};
}
