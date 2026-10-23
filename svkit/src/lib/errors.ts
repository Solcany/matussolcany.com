import { metadata } from '../content/404.svx';

export function errorTitle(status: number, message = 'Something went wrong') {
	return status === 404 ? metadata.title : message;
}
