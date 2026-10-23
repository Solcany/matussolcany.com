<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<h3 class={['font-display font-bold text-display-sm text-black', className]} {...rest}>{@render children?.()}</h3>
