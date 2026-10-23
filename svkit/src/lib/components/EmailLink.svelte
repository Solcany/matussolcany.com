<script lang="ts">
	let { address } = $props();

	const encode = (text: string) => [...text].map((char) => `&#${char.codePointAt(0)};`).join('');
</script>

{@html `<a href="${encode(`mailto:${address}`)}" class="inline-block font-gangster text-f6 text-black underline hover:text-theblue">${encode(address)}</a>`}
