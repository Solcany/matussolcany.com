<script lang="ts">
	let { children } = $props();
</script>

<nav class="w-full pb-2 l:w-auto l:pb-0">
	<ul class="flex w-full flex-wrap gap-x-4 text-center ns:text-right l:justify-between l:gap-x-8">
		{@render children?.()}
	</ul>
</nav>
