<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<h1 class={['font-display font-bold text-display', className]} {...rest}>{@render children?.()}</h1>
