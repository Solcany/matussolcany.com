<script lang="ts">
	let { children, href, active = false } = $props();
</script>

<li class="text-left lg:text-right">
	<a
		{href}
		aria-current={active ? 'page' : undefined}
		class={['inline-block font-body text-body text-ink hover:text-accent focus-visible:text-accent', active && 'underline']}
	>
		{@render children?.()}
	</a>
</li>
