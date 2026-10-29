<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<li class={['list-inside list-[circle] pb-2', className]} {...rest}>{@render children?.()}</li>
