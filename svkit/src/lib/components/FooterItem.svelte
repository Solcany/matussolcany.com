<script lang="ts">
	let { children, end = false } = $props();
</script>

<li
	class={[
		'block w-full lg:inline-block lg:w-3/10',
		end && 'self-center py-2 text-left font-body text-body text-black lg:py-0 lg:text-right'
	]}
>
	{@render children?.()}
</li>
