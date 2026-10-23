<script lang="ts">
	let { children } = $props();
</script>

<span class="block text-f6 text-thedarkgray group-hover:text-theblue">{@render children?.()}</span>
