<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { EmailLink, FooterItem, Nav, NavLink, SiteFooter, SiteHeader, SiteTitle } from '#lib';
	import { nav, site } from '#lib/site.ts';

	let { children } = $props();

	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<meta name="author" content={site.author} />
	<meta property="og:title" content={site.title} />
	<meta property="og:url" content={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={site.description} />
	<meta property="og:image" content="{site.url}/images/ogimage.jpg" />
</svelte:head>

<SiteHeader>
	<SiteTitle href={nav[0].href}>{site.title}</SiteTitle>
	<Nav>
		{#each nav as item (item.href)}
			<NavLink href={item.href} active={item.routes.includes(page.route.id ?? '')}>{item.name}</NavLink>
		{/each}
	</Nav>
</SiteHeader>

{@render children()}

<SiteFooter>
	<FooterItem><EmailLink address={site.email} /></FooterItem>
	<FooterItem end>{site.author} © {year}</FooterItem>
</SiteFooter>
