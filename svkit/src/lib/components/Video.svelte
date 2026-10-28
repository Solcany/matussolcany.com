<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video class={['block w-full outline outline-frame js:opacity-0 loaded:opacity-100 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-in', className]} controls preload="metadata" {...rest}>
	{@render children?.()}
	Your device does not support video
</video>
