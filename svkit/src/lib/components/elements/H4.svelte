<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<h4 class={['font-gangster text-f6 text-black', className]} {...rest}>{@render children?.()}</h4>
