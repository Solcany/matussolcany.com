<script lang="ts">
	let { alt = '', class: className = '', ...rest } = $props();
</script>

<img
	{alt}
	data-lightbox
	sizes="(min-width: 60em) 70vw, 100vw"
	loading="lazy"
	class={['block js:cursor-zoom-in h-auto w-full max-w-none outline outline-frame js:opacity-0 loaded:opacity-100 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-in', className]}
	{...rest}
/>
