<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<!-- svelte-ignore a11y_figcaption_parent -->
<figcaption class={['pt-1 font-body text-body', className]} {...rest}>{@render children?.()}</figcaption>
