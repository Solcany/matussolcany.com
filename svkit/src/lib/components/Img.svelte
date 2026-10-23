<script lang="ts">
	let { alt = '', class: className = '', ...rest } = $props();
</script>

<img
	{alt}
	sizes="(min-width: 60em) 70vw, 100vw"
	loading="lazy"
	class={['block h-auto w-full max-w-none js:opacity-0 loaded:opacity-100 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-in', className]}
	{...rest}
/>
