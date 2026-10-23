<script lang="ts">
	let { children } = $props();
</script>

<div class="[&_h1]:py-1 [&_h1]:font-gangster [&_p]:py-1">{@render children?.()}</div>
