<script lang="ts">
	let { id, image, alt = '', sizes = '(min-width: 60em) 50vw, 100vw', loading = 'lazy' } = $props();
</script>

<span
	class="relative block after:pointer-events-none after:absolute after:inset-0 after:bg-radial after:from-accent/0 after:to-accent/50 after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100 group-focus-visible:after:opacity-100"
>
	<img {id} {...image} {alt} {sizes} {loading} class="block h-auto w-full outline outline-frame js:opacity-0 loaded:opacity-100 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-in" />
</span>
