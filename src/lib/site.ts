import { resolve } from '$app/paths';

export const site = {
	title: 'Matúš Solčány',
	author: 'Matúš Solčány',
	description: 'The portfolio of digital designer and creative coder Matúš Solčány',
	url: 'https://matussolcany.com',
	email: 'matus.solcany@protonmail.com'
};

export const nav = [
	{ name: 'Projects', href: resolve('/'), routes: ['/', '/projects/[slug]'] },
	{ name: 'About', href: resolve('about/'), routes: ['/about'] },
	{ name: 'Contact', href: resolve('contact/'), routes: ['/contact'] }
];
