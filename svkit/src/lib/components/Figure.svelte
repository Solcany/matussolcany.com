<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<figure class={className} {...rest}>{@render children?.()}</figure>
