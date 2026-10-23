<script lang="ts">
	let { id, src, alt = '' } = $props();
</script>

<span
	class="relative block after:pointer-events-none after:absolute after:inset-0 after:bg-radial after:from-accent/0 after:to-accent/50 after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100 group-focus-visible:after:opacity-100"
>
	<img {id} {src} {alt} class="block w-full" />
</span>
