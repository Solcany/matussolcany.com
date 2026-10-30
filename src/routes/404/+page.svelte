<script lang="ts">
	import { H1, Main, MissingUrl } from '#lib';
	import NotFound from '../../content/404.svx';

	let { data } = $props();
</script>

<Main class="mt-8 w-full px-4 xl:px-20 pt-4 pb-8">
	<div class="lg:w-1/2">
		<H1 class="mb-4">{data.title}<MissingUrl /></H1>
		<NotFound />
	</div>
</Main>
