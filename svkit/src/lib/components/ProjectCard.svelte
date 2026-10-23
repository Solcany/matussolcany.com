<script lang="ts">
	let { children, href } = $props();
</script>

<a {href} class="group block">{@render children?.()}</a>
