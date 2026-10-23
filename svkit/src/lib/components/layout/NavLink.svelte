<script lang="ts">
	let { children, href, active = false } = $props();
</script>

<li class="text-left l:text-right">
	<a
		{href}
		aria-current={active ? 'page' : undefined}
		class={['inline-block font-gangster text-f6 text-black hover:text-theblue', active && 'underline']}
	>
		{@render children?.()}
	</a>
</li>
