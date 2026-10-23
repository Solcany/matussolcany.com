<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<h2 class={['font-gothic text-f6 text-black', className]} {...rest}>{@render children?.()}</h2>
