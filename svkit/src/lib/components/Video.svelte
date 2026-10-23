<script lang="ts">
	let { children, class: className = '', ...rest } = $props();
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video class={['block w-full', className]} controls preload="metadata" {...rest}>
	{@render children?.()}
	Your device does not support video
</video>
