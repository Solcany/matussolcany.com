<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<p class={['my-4.5 font-body text-body', className]} {...rest}>{@render children?.()}</p>
