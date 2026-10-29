<script lang="ts">
	let { children } = $props();
</script>

<nav class="w-full pb-2 lg:w-auto lg:pb-0">
	<ul class="flex w-full flex-wrap gap-x-4 text-center sm:text-right lg:justify-between lg:gap-x-8">
		{@render children?.()}
	</ul>
</nav>
