<script lang="ts">
	import script from '../lightbox.ts?worker&url';
</script>

<svelte:head>
	<script type="module" src={script}></script>
</svelte:head>

<dialog
	data-lightbox
	closedby="any"
	tabindex="-1"
	aria-label="Full size image"
	class="m-auto max-h-none max-w-none overflow-visible border-0 outline-none bg-transparent p-0 backdrop:bg-backdrop/70"
>
	<figure>
		<img alt="" class="block h-auto w-full outline outline-frame" />
		<figcaption class="py-1 font-body text-body text-ink empty:hidden"></figcaption>
	</figure>
	<form method="dialog">
		<button
			aria-label="Close"
			class="fixed top-4 right-4 flex size-14 cursor-pointer items-center justify-center text-[#fff] dark:text-ink hover:text-accent focus-visible:text-accent"
		>
			<span class="block size-10 bg-current mask-[url(/x.svg)] mask-contain mask-center mask-no-repeat"></span>
		</button>
	</form>
</dialog>
