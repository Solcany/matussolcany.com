<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { EmailLink, FooterItem, Lightbox, Nav, NavLink, SiteFooter, SiteHeader, SiteTitle } from '#lib';
	import { errorTitle } from '#lib/errors.ts';
	import { nav, site } from '#lib/site.ts';

	let { children } = $props();

	const year = new Date().getFullYear();
	const heading = $derived(page.error ? errorTitle(page.status, page.error.message) : page.data.title);
	const title = $derived(heading ? `${heading} – ${site.title}` : site.title);
	const description = $derived(page.data.description ?? site.description);
	const canonical = $derived(
		page.error || page.route.id === '/404' ? null : `${site.url}${page.url.pathname}`
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={site.author} />
	{#if canonical}
		<link rel="canonical" href={canonical} />
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={description} />
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

<Lightbox />
