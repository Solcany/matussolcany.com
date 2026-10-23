<script lang="ts">
	import { H1, Main } from '#lib';

	let { data } = $props();
</script>

<Main class="mt-8 w-full px-4 pt-4 pb-8">
	<H1>{data.title}</H1>
</Main>
