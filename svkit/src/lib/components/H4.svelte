<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<h4 class={['font-body text-body text-black', className]} {...rest}>{@render children?.()}</h4>
