<script lang="ts">
	let { children } = $props();
</script>

<header
	class="flex w-full flex-col items-start border-b border-thegray px-4 pt-4 l:flex-row l:justify-between l:border-b-0 l:px-20 l:pb-4"
>
	{@render children?.()}
</header>
