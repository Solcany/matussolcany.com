<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<p class={['my-[1em] font-gangster text-f6 max-ns:leading-[21px]', className]} {...rest}>{@render children?.()}</p>
