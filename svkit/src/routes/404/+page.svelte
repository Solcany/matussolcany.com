<script lang="ts">
	import { resolve } from '$app/paths';
	import { A, H1, Main, P } from '#lib';
</script>

<Main class="mt-8 w-full px-4 pt-4 pb-8 l:w-1/2 l:px-20">
	<H1 class="mb-4">Page Not Found</H1>
	<P>Sorry, this page doesn't exist.</P>
	<P><A href={resolve('/')}>Go back to homepage</A></P>
</Main>
