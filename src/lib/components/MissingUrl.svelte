<script lang="ts">
	import script from '../missing-url.ts?worker&url';
</script>

<svelte:head>
	<script type="module" src={script}></script>
</svelte:head>

<span data-missing-url></span>
