<script lang="ts">
	let { address } = $props();

	const encode = (text: string) => [...text].map((char) => `&#${char.codePointAt(0)};`).join('');
</script>

{@html `<a href="${encode(`mailto:${address}`)}" class="inline-block text-body text-ink underline hover:text-accent focus-visible:text-accent">${encode(address)}</a>`}
