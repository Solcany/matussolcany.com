<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<!-- svelte-ignore a11y_figcaption_parent -->
<figcaption class={['pt-1 font-gangster text-f6', className]} {...rest}>{@render children?.()}</figcaption>
