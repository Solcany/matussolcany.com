<script lang="ts">
	import { page } from '$app/state';
	import { H1, Main } from '#lib';
	import { errorTitle } from '#lib/errors.ts';
</script>

<Main class="mt-8 w-full px-4 xl:px-20 pt-4 pb-8">
	<H1>{errorTitle(page.status, page.error?.message)}</H1>
</Main>
