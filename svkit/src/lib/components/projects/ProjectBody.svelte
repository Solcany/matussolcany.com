<script lang="ts">
	let { children } = $props();
</script>

<div class="[&>:is(figure,div):not(:first-child,:last-child)]:pb-16">{@render children?.()}</div>
