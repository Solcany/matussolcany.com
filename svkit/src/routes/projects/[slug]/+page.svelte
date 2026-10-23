<script lang="ts">
	import { resolve } from '$app/paths';
	import { A, CardText, CardTitle, H1, H2, Main, ProjectBody, ProjectCard, Thumbnail } from '#lib';

	let { data } = $props();
</script>

<Main class="mt-8 w-full px-4 xl:px-20 lg:w-7/10 lg:pb-8">
	<H1 class="mt-4 mb-2 lg:mt-8">{data.project.title}</H1>
	{#if data.project.description}
		<span class="mb-1 block pb-4 font-body text-body">{data.project.description}</span>
	{/if}
	<ProjectBody>
		<data.project.content />
	</ProjectBody>
</Main>

<section class="w-full px-4 xl:px-20 pb-4 lg:w-7/10">
	<H2 class="mt-4 mb-4 lg:mt-8">Next</H2>
	{#if data.next}
		<ProjectCard href={data.next.href} id={data.next.slug}>
			<Thumbnail
				id="{data.next.slug}-image"
				image={data.next.thumbnail}
				alt={data.next.thumbnail_alt}
				sizes="(min-width: 60em) 70vw, 100vw"
			/>
			<CardTitle id="{data.next.slug}-title">{data.next.title}</CardTitle>
			<CardText id="{data.next.slug}-text">{data.next.description}</CardText>
		</ProjectCard>
	{/if}
	<A href={resolve('/')} class="my-8 block">Return to projects</A>
</section>
