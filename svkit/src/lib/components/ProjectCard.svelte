<script lang="ts">
	let { children, href, id } = $props();
</script>

<a {href} aria-labelledby="{id}-title {id}-text {id}-image" class="group block">{@render children?.()}</a>
