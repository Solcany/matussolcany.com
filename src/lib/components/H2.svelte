<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<h2 class={['font-display font-bold text-display text-ink', className]} {...rest}>{@render children?.()}</h2>
