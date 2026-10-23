<script lang="ts">
	let { children } = $props();
</script>

<ul class="w-full pt-2">{@render children?.()}</ul>
