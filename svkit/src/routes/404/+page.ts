import { metadata } from '../../content/404.svx';

export const trailingSlash = 'never';

export function load() {
	return { title: metadata.title };
}
