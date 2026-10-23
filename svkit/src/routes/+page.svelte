<script lang="ts">
	import {
		CardText,
		CardTitle,
		H2,
		LinkList,
		LinkListItem,
		Main,
		ProjectCard,
		ShowcaseGrid,
		ShowcaseItem,
		Thumbnail
	} from '#lib';
	import Intro from '../content/home.svx';

	let { data } = $props();
</script>

<Main>
	<section class="w-full px-4 xl:px-20 py-4 text-black">
		<Intro />
	</section>
	<section class="mb-8 w-full px-4 xl:px-20">
		<ShowcaseGrid>
			{#each data.showcase as project (project.slug)}
				<ShowcaseItem column={project.showcase_column}>
					<ProjectCard href={project.href} id={project.slug}>
						<Thumbnail id="{project.slug}-image" src={project.thumbnail} alt={project.thumbnail_alt} />
						<CardTitle id="{project.slug}-title">{project.title}</CardTitle>
						<CardText id="{project.slug}-text">{project.description}</CardText>
					</ProjectCard>
				</ShowcaseItem>
			{/each}
		</ShowcaseGrid>
		<H2 class="mb-4">More projects</H2>
		<LinkList>
			{#each data.rest as project (project.slug)}
				<LinkListItem href={project.href}>{project.title}</LinkListItem>
			{/each}
		</LinkList>
	</section>
</Main>
