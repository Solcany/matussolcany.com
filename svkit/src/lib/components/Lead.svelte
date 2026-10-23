<script lang="ts">
	let { children } = $props();
</script>

<div class="[&_h1]:py-1 [&_h1]:font-body [&_h1]:font-normal [&_h1]:text-body [&_p]:py-1">{@render children?.()}</div>
