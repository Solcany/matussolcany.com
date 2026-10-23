<script lang="ts">
	let { children, end = false } = $props();
</script>

<li
	class={[
		'block w-full l:inline-block l:w-3/10',
		end && 'self-center py-2 text-left font-gangster text-f6 text-black l:py-0 l:text-right'
	]}
>
	{@render children?.()}
</li>
