<script lang="ts">
	let { children, column = 0 } = $props();

	const columns = ['lg:col-start-1', 'lg:col-start-2'];
</script>

<li class={['pb-8', columns[column]]}>{@render children?.()}</li>
