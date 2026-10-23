<script lang="ts">
	import { H1, Main } from '#lib';
	import Contact from '../../content/contact.svx';

	let { data } = $props();
</script>

<Main class="mt-8 w-full px-4 pt-4 pb-8">
	<H1 class="mb-4">{data.title}</H1>
	<Contact />
</Main>
