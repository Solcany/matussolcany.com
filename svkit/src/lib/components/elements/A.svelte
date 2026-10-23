<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<a class={['font-gangster text-f6 text-black underline hover:text-theblue', className]} {...rest}>{@render children?.()}</a>
