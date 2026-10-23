<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<h3 class={['font-gothic text-f7 text-black', className]} {...rest}>{@render children?.()}</h3>
