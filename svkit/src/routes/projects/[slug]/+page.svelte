<script lang="ts">
	import { resolve } from '$app/paths';
	import { A, CardText, CardTitle, H1, H2, Main, ProjectBody, ProjectCard, Thumbnail } from '#lib';

	let { data } = $props();
</script>

<Main class="mt-8 w-full px-4 l:w-7/10 l:px-20 l:pb-8">
	<H1 class="mt-4 mb-2 l:mt-8">{data.project.title}</H1>
	{#if data.project.description}
		<span class="mb-1 block pb-4 font-gangster text-f6">{data.project.description}</span>
	{/if}
	<ProjectBody>
		<data.project.content />
	</ProjectBody>
</Main>

<section class="w-full px-4 pb-4 l:px-20">
	<H2 class="mt-4 mb-4 l:mt-8">Next project</H2>
	{#if data.next}
		<div class="w-full l:w-1/2">
			<ProjectCard href={data.next.href}>
				<Thumbnail src={data.next.thumbnail} alt={data.next.thumbnail_alt} />
				<CardTitle>{data.next.title}</CardTitle>
				<CardText>{data.next.description}</CardText>
			</ProjectCard>
		</div>
	{/if}
	<A href={resolve('/')} class="my-8 block">Return to projects</A>
</section>
