<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<h1 class={['font-gothic text-f6', className]} {...rest}>{@render children?.()}</h1>
