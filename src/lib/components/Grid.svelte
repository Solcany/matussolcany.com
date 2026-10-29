<script lang="ts">
	import script from '../grid/main.ts?worker&url';

	let { class: className = '' } = $props();
</script>

<svelte:head>
	<script type="module" src={script}></script>
</svelte:head>

<div data-grid aria-hidden="true" class={['relative noscript:hidden', className]}></div>
