<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<h4 class={['font-body text-body text-ink', className]} {...rest}>{@render children?.()}</h4>
