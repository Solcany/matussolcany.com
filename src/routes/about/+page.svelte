<script lang="ts">
	import { Grid, H1, Main } from '#lib';
	import About from '../../content/about.svx';

	let { data } = $props();
</script>

<Main class="mt-8 w-full px-4 xl:px-20 pt-4 pb-8">
	<div class="lg:w-1/2">
		<H1 class="mb-4">{data.title}</H1>
		<Grid class="aspect-4/3 w-full" />
		<About />
	</div>
</Main>
