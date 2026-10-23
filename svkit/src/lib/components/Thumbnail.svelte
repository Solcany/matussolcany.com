<script lang="ts">
	let { src, alt = '' } = $props();
</script>

<img {src} {alt} class="reveal relative block w-full group-hover:opacity-75" />
