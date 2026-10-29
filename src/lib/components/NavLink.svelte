<script lang="ts">
	let { children, href, active = false } = $props();
</script>

<li class="text-left lg:text-right">
	<a
		{href}
		aria-current={active ? 'page' : undefined}
		class={['inline-block font-body text-body text-ink hover:text-accent hover:underline focus-visible:text-accent focus-visible:underline', active && 'underline']}
	>
		{@render children?.()}
	</a>
</li>
