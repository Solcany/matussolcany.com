<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<ul class={['pt-2 text-f6', className]} {...rest}>{@render children?.()}</ul>
