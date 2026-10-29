<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<ul class={['pt-2 text-body', className]} {...rest}>{@render children?.()}</ul>
