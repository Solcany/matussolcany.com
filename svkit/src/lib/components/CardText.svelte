<script lang="ts">
	let { children, id } = $props();
</script>

<span {id} class="block font-body text-body text-muted group-hover:text-accent group-focus-visible:text-accent">{@render children?.()}</span>
