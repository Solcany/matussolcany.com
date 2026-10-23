<script lang="ts">
	let { children, href } = $props();
</script>

<a
	{href}
	class="inline-block pb-4 text-center font-gothic text-f6 text-black hover:text-theblue l:pb-0 l:text-left"
>
	{@render children?.()}
</a>
