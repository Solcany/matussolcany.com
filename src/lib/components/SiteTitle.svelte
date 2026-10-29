<script lang="ts">
	let { children, href } = $props();
</script>

<a
	{href}
	class="inline-block pb-4 text-center font-display font-bold text-display text-ink hover:text-accent hover:underline focus-visible:text-accent focus-visible:underline lg:pb-0 lg:text-left"
>
	{@render children?.()}
</a>
