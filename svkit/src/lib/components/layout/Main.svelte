<script lang="ts">
	let { children, class: className = '' } = $props();
</script>

<main class={['flex-1', className]}>{@render children?.()}</main>
