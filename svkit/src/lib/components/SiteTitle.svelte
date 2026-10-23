<script lang="ts">
	let { children, href } = $props();
</script>

<a
	{href}
	class="inline-block pb-4 text-center font-display font-bold text-display text-black hover:text-accent focus-visible:text-accent lg:pb-0 lg:text-left"
>
	{@render children?.()}
</a>
