<script lang="ts">
	let { class: className = '', ...rest } = $props();
</script>

<img class={['reveal block w-full max-w-none', className]} loading="lazy" {...rest} />
