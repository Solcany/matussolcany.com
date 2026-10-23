<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<a class={['text-body text-black underline hover:text-accent focus-visible:text-accent', className]} {...rest}>{@render children?.()}</a>
