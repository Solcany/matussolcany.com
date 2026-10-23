<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<figure class={className || null} {...rest}>{@render children?.()}</figure>
