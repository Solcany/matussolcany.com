<script lang="ts">
	import { H1, Main } from '#lib';
	import About from '../../content/about.svx';

	let { data } = $props();
</script>

<Main class="mt-8 w-full px-4 pt-4 pb-8 lg:w-1/2">
	<H1 class="mb-4">{data.title}</H1>
	<About />
</Main>
