<script lang="ts">
	let { children } = $props();
</script>

<header
	class="flex w-full flex-col items-start border-b border-line px-4 xl:px-20 pt-4 lg:flex-row lg:justify-between lg:border-b-0 lg:pb-4"
>
	{@render children?.()}
</header>
