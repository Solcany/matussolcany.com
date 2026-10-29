<script lang="ts">
	import { page } from '$app/state';
	import { H1, Main } from '#lib';
	import { errorTitle } from '#lib/errors.ts';
	import NotFound from '../content/404.svx';
</script>

<Main class="mt-8 w-full px-4 xl:px-20 pt-4 pb-8">
	<div class="lg:w-1/2">
		<H1 class="mb-4">{errorTitle(page.status, page.error?.message)}</H1>
		{#if page.status === 404}
			<NotFound />
		{/if}
	</div>
</Main>
